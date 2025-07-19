import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Order tracking service is temporarily unavailable" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const trackingNumber = searchParams.get("tracking")

    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number is required" }, { status: 400 })
    }

    console.log("Tracking order:", trackingNumber)

    // Find the order by tracking number
    const { data: order, error: orderError } = await supabase!
      .from("orders")
      .select("*")
      .eq("tracking_number", trackingNumber.toUpperCase().trim())
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found with the provided tracking number" }, { status: 404 })
    }

    // Get order tracking history
    const { data: trackingHistory, error: trackingError } = await supabase!
      .from("order_tracking")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true })

    if (trackingError) {
      console.error("Error fetching tracking history:", trackingError)
      // Don't fail the request, just return order without history
    }

    // Add tracking history to order object
    const orderWithTracking = {
      ...order,
      tracking_history: trackingHistory || [],
    }

    console.log("Order found:", order.id, "Status:", order.status)

    return NextResponse.json({
      success: true,
      order: orderWithTracking,
    })
  } catch (error) {
    console.error("Track order API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
