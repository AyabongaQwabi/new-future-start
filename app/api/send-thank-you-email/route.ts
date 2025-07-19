import { type NextRequest, NextResponse } from "next/server"
import { sendThankYouEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  console.log("=== Email API Route Called ===")

  try {
    // Parse request body
    let orderDetails
    try {
      orderDetails = await request.json()
      console.log("Request body parsed successfully:", {
        customerName: orderDetails.customerName,
        customerEmail: orderDetails.customerEmail,
        trackingNumber: orderDetails.trackingNumber,
        deliveryMethod: orderDetails.deliveryMethod,
      })
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
          errorType: "PARSE_ERROR",
        },
        { status: 400 },
      )
    }

    // Validate required fields
    const requiredFields = [
      "customerName",
      "customerEmail",
      "trackingNumber",
      "quantity",
      "totalAmount",
      "deliveryMethod",
    ]

    const missingFields = requiredFields.filter((field) => !orderDetails[field])
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
          errorType: "VALIDATION_ERROR",
          missingFields,
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(orderDetails.customerEmail)) {
      console.error("Invalid email format:", orderDetails.customerEmail)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
          errorType: "VALIDATION_ERROR",
        },
        { status: 400 },
      )
    }

    // Validate PAXI code if delivery method is paxi
    if (orderDetails.deliveryMethod === "paxi" && orderDetails.paxiCode) {
      const paxiCodeRegex = /^P\d{4,5}$/
      if (!paxiCodeRegex.test(orderDetails.paxiCode)) {
        console.error("Invalid PAXI code format:", orderDetails.paxiCode)
        return NextResponse.json(
          {
            success: false,
            error: "Invalid PAXI code format. Must start with P followed by 4-5 digits (e.g., P12345)",
            errorType: "VALIDATION_ERROR",
          },
          { status: 400 },
        )
      }
    }

    console.log("Validation passed, attempting to send email...")

    // Attempt to send email
    const result = await sendThankYouEmail(orderDetails)

    console.log("Email send result:", result)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Thank you email sent successfully",
        messageId: result.messageId,
        timestamp: new Date().toISOString(),
      })
    } else {
      console.error("Email sending failed:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to send email",
          errorType: "EMAIL_SEND_ERROR",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("=== Unexpected Error in Email API ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    // Always return valid JSON
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        errorType: "INTERNAL_ERROR",
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
