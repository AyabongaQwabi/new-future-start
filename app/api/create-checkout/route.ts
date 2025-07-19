import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase not configured - missing environment variables")
      return NextResponse.json(
        {
          error: "Service temporarily unavailable",
          details: "Database connection not available. Please contact support.",
        },
        { status: 503 },
      )
    }

    const body = await request.json()
    console.log("Received checkout request:", body)

    const {
      bookPrice = 45000, // R450 in cents per book
      customerName,
      customerEmail,
      customerPhone,
      deliveryMethod,
      paxiCode,
      deliveryAddress,
      deliveryFee,
      promoCode,
      discountAmount = 0,
      quantity = 1,
      amount,
      finalPrice,
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required customer information", details: "Name, email, and phone are required" },
        { status: 400 },
      )
    }

    if (!deliveryMethod) {
      return NextResponse.json(
        { error: "Missing delivery method", details: "Please select a delivery method" },
        { status: 400 },
      )
    }

    if (deliveryMethod === "paxi" && !paxiCode) {
      return NextResponse.json(
        { error: "Missing PAXI code", details: "PAXI code is required for PEP store delivery" },
        { status: 400 },
      )
    }

    // Validate PAXI code format
    if (deliveryMethod === "paxi" && paxiCode) {
      const paxiRegex = /^P\d{4,5}$/
      if (!paxiRegex.test(paxiCode.toUpperCase())) {
        return NextResponse.json(
          { error: "Invalid PAXI code", details: "PAXI code must start with P followed by 4-5 digits (e.g., P23456)" },
          { status: 400 },
        )
      }
    }

    if (deliveryMethod === "door" && !deliveryAddress) {
      return NextResponse.json(
        { error: "Missing delivery address", details: "Delivery address is required for door-to-door delivery" },
        { status: 400 },
      )
    }

    // Validate quantity
    if (!quantity || quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { error: "Invalid quantity", details: "Quantity must be between 1 and 10" },
        { status: 400 },
      )
    }

    // Generate human-readable tracking number
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase()
    const trackingNumber = `FS${year}${month}${day}-${randomSuffix}`

    // Calculate total book price
    const totalBookPrice = (bookPrice / quantity) * quantity // Ensure we use the per-book price correctly

    // Create order in database first (without checkout_id)
    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail.toLowerCase(),
      customer_phone: customerPhone,
      product_name: "Conquering Your Years in Tertiary Education",
      quantity: quantity,
      amount: totalBookPrice,
      status: "pending",
      payment_status: "pending",
      tracking_number: trackingNumber,
      delivery_method: deliveryMethod,
      paxi_code: paxiCode ? paxiCode.toUpperCase() : null,
      delivery_address: deliveryAddress || null,
      delivery_fee: deliveryFee || 0,
      promo_code: promoCode || null,
      discount_amount: discountAmount || 0,
      final_price: finalPrice || amount,
      // checkout_id will be added after Yoco checkout creation
    }

    console.log("Creating order with data:", orderData)

    const { data: order, error: orderError } = await supabase!.from("orders").insert(orderData).select().single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order", details: orderError.message }, { status: 500 })
    }

    console.log("Order created successfully:", order.id, "Tracking:", trackingNumber)

    // Add initial tracking entry
    await supabase!.from("order_tracking").insert({
      order_id: order.id,
      status: "pending",
      notes: "Order created and awaiting payment",
      created_by: "system",
    })

    // Update promo code usage if applicable
    if (promoCode) {
      try {
        // Get current usage count
        const { data: currentPromo } = await supabase!
          .from("promo_codes")
          .select("times_used")
          .eq("code", promoCode.toUpperCase())
          .single()

        if (currentPromo) {
          const newUsageCount = Number.parseInt(currentPromo.times_used || "0") + 1

          const { error: promoError } = await supabase!
            .from("promo_codes")
            .update({ times_used: newUsageCount.toString() })
            .eq("code", promoCode.toUpperCase())

          if (promoError) {
            console.error("Error updating promo code usage:", promoError)
            // Don't fail the order creation for this
          }
        }
      } catch (promoUpdateError) {
        console.error("Error updating promo usage:", promoUpdateError)
        // Don't fail the order creation for this
      }
    }

    // Create Yoco checkout with updated URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://futurestart.co.za"

    const yocoPayload = {
      amount: finalPrice || amount,
      currency: "ZAR",
      cancelUrl: `${baseUrl}/checkout/cancelled?order_id=${order.id}`,
      successUrl: `${baseUrl}/checkout/success?order_id=${order.id}`,
      failureUrl: `${baseUrl}/checkout/failed?order_id=${order.id}`,
      metadata: {
        orderId: order.id,
        customerEmail: customerEmail,
        trackingNumber: trackingNumber,
        quantity: quantity.toString(),
      },
      lineItems: [
        {
          displayName: `Conquering Your Years in Tertiary Education ${quantity > 1 ? `(${quantity} copies)` : ""}`,
          quantity: quantity,
          pricingDetails: {
            price: bookPrice / quantity, // Price per unit
          },
        },
      ],
      subtotalAmount: totalBookPrice,
      totalTaxAmount: 0,
      totalDiscount: discountAmount || 0,
    }

    // Add delivery fee as separate line item if applicable
    if (deliveryFee && deliveryFee > 0) {
      const deliveryDescription = deliveryMethod === "paxi" ? "PAXI Store Delivery" : "Door-to-Door Delivery"

      yocoPayload.lineItems.push({
        displayName: deliveryDescription,
        quantity: 1,
        pricingDetails: {
          price: deliveryFee,
        },
      })
      yocoPayload.subtotalAmount += deliveryFee
    }

    console.log("Creating Yoco checkout with payload:", yocoPayload)

    const yocoResponse = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `order-${order.id}-${Date.now()}`,
      },
      body: JSON.stringify(yocoPayload),
    })

    console.log("Yoco response status:", yocoResponse.status)

    if (!yocoResponse.ok) {
      const yocoError = await yocoResponse.text()
      console.error("Yoco API error:", yocoError)

      // Update order status to failed
      await supabase!
        .from("orders")
        .update({
          status: "cancelled",
          notes: "Payment setup failed",
        })
        .eq("id", order.id)

      return NextResponse.json(
        {
          error: "Payment setup failed",
          details: "Unable to create payment session. Please try again.",
          yocoError: yocoError,
        },
        { status: 500 },
      )
    }

    const yocoData = await yocoResponse.json()
    console.log("Yoco checkout created:", { id: yocoData.id, redirectUrl: yocoData.redirectUrl })

    // Update order with checkout ID
    const { error: updateError } = await supabase!
      .from("orders")
      .update({ checkout_id: yocoData.id })
      .eq("id", order.id)

    if (updateError) {
      console.error("Error updating order with checkout_id:", updateError)
      // Don't fail the request for this, but log it
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      checkoutId: yocoData.id,
      redirectUrl: yocoData.redirectUrl,
      trackingNumber: trackingNumber,
    })
  } catch (error) {
    console.error("Checkout API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
