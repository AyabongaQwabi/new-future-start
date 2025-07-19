import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase not configured for webhook")
      return NextResponse.json({ received: true })
    }

    const body = await request.json()

    // Log the webhook event for debugging
    console.log("Yoco Webhook Event:", JSON.stringify(body, null, 2))

    // Check if this is a successful payment
    if (body.type === "payment.succeeded") {
      const paymentData = body.data

      // Find the order by checkout_id or metadata
      let order = null
      let findError = null

      // First try to find by checkout_id
      if (paymentData.checkoutId) {
        const { data, error } = await supabase!
          .from("orders")
          .select("*")
          .eq("checkout_id", paymentData.checkoutId)
          .single()

        order = data
        findError = error
      }

      // If not found by checkout_id, try to find by order ID in metadata
      if (!order && paymentData.metadata?.orderId) {
        const { data, error } = await supabase!
          .from("orders")
          .select("*")
          .eq("id", paymentData.metadata.orderId)
          .single()

        order = data
        findError = error
      }

      if (findError || !order) {
        console.error("Order not found:", {
          checkoutId: paymentData.checkoutId,
          orderId: paymentData.metadata?.orderId,
          error: findError,
        })
        return NextResponse.json({ received: true })
      }

      console.log("Processing payment for order:", order.id)

      // Update order status to paid
      const updateData = {
        payment_id: paymentData.id,
        status: "paid",
        payment_status: "completed",
        updated_at: new Date().toISOString(),
      }

      // Also update checkout_id if it's missing
      if (!order.checkout_id && paymentData.checkoutId) {
        updateData.checkout_id = paymentData.checkoutId
      }

      const { error: updateError } = await supabase!.from("orders").update(updateData).eq("id", order.id)

      if (updateError) {
        console.error("Error updating order status:", updateError)
      } else {
        console.log("Order status updated to paid:", order.id)

        // Add tracking entry for payment confirmation
        await supabase!.from("order_tracking").insert({
          order_id: order.id,
          status: "paid",
          notes: "Payment confirmed successfully. Your order is now being processed.",
          created_by: "system",
        })

        // Add processing status after payment (with delay to show progression)
        setTimeout(async () => {
          try {
            await supabase!.from("orders").update({ status: "processing" }).eq("id", order.id)
            await supabase!.from("order_tracking").insert({
              order_id: order.id,
              status: "processing",
              notes: "Order is being prepared for shipment.",
              created_by: "system",
            })
            console.log("Order status updated to processing:", order.id)
          } catch (error) {
            console.error("Error updating to processing status:", error)
          }
        }, 2000)
      }

      console.log("Payment succeeded:", {
        paymentId: paymentData.id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        orderId: order.id,
      })
    }

    // Handle payment failed events
    if (body.type === "payment.failed") {
      const paymentData = body.data
      console.log("Payment failed:", paymentData)

      // Find and update order
      if (paymentData.checkoutId || paymentData.metadata?.orderId) {
        let order = null

        if (paymentData.checkoutId) {
          const { data } = await supabase!.from("orders").select("*").eq("checkout_id", paymentData.checkoutId).single()
          order = data
        }

        if (!order && paymentData.metadata?.orderId) {
          const { data } = await supabase!.from("orders").select("*").eq("id", paymentData.metadata.orderId).single()
          order = data
        }

        if (order) {
          await supabase!
            .from("orders")
            .update({
              status: "cancelled",
              payment_status: "failed",
              updated_at: new Date().toISOString(),
            })
            .eq("id", order.id)

          await supabase!.from("order_tracking").insert({
            order_id: order.id,
            status: "cancelled",
            notes: "Payment failed. Order has been cancelled.",
            created_by: "system",
          })

          console.log("Order marked as failed:", order.id)
        }
      }
    }

    // Always return 200 to acknowledge receipt of the webhook
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
