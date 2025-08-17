import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase not configured for promo validation")
      return NextResponse.json({ valid: false, message: "Promo code service temporarily unavailable" }, { status: 503 })
    }

    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ valid: false, message: "Promo code is required" }, { status: 400 })
    }

    console.log("Validating promo code:", code)

    // Find the promo code using the actual database structure
    const { data: promoCode, error: promoError } = await supabase!
      .from("promo_codes")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("is_active", "true") // Note: is_active is stored as string "true"/"false"
      .single()

    if (promoError) {
      console.log("Promo code query error:", promoError)
      if (promoError.code === "PGRST116") {
        // No rows returned
        return NextResponse.json({ valid: false, message: "Invalid promo code" }, { status: 400 })
      }
      return NextResponse.json({ valid: false, message: "Error checking promo code" }, { status: 500 })
    }

    if (!promoCode) {
      console.log("Promo code not found:", code)
      return NextResponse.json({ valid: false, message: "Invalid promo code" }, { status: 400 })
    }

    console.log("Found promo code:", promoCode)

    // Check if promo code has expired
    if (promoCode.expires_at) {
      const expiryDate = new Date(promoCode.expires_at)
      const currentDate = new Date()

      console.log("Checking expiry:", {
        expiryDate: expiryDate.toISOString(),
        currentDate: currentDate.toISOString(),
        expired: expiryDate < currentDate,
      })

      if (expiryDate < currentDate) {
        return NextResponse.json(
          {
            valid: false,
            message: `This promo code expired on ${expiryDate.toLocaleDateString()}`,
          },
          { status: 400 },
        )
      }
    }

    // Check usage limits - usage_limit and times_used are stored as strings
    const usageLimit = Number.parseInt(promoCode.usage_limit || "0")
    const timesUsed = Number.parseInt(promoCode.times_used || "0")

    if (usageLimit > 0 && timesUsed >= usageLimit) {
      return NextResponse.json(
        { valid: false, message: "This promo code has reached its usage limit" },
        { status: 400 },
      )
    }

    // discount_amount is stored as a number (in cents)
    const discountAmount = Number.parseInt(promoCode.discount_amount || "0")

    console.log("Promo code is valid:", {
      code: promoCode.code,
      discount: discountAmount,
      usageLimit,
      timesUsed,
    })

    return NextResponse.json({
      valid: true,
      code: promoCode.code,
      discount: discountAmount,
      discountAmount: discountAmount,
      description: `Save R${(discountAmount / 100).toFixed(2)} on your order`,
      // Additional details
      usage_limit: usageLimit,
      times_used: timesUsed,
      expires_at: promoCode.expires_at,
      created_at: promoCode.created_at,
      is_active: promoCode.is_active === "true" || promoCode.is_active === true,
    })
  } catch (error) {
    console.error("Error validating promo code:", error)
    return NextResponse.json({ valid: false, message: "Error validating promo code" }, { status: 500 })
  }
}
