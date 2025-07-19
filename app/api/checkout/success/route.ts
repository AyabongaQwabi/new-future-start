import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Update order status to completed
    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "completed",
        order_status: "processing",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating order:", updateError)
      return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Success API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
