import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Testing Yoco API Configuration ===")

    // Check environment variables
    const apiKey = process.env.YOCO_SECRET_KEY
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    console.log("Environment check:", {
      hasApiKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPrefix: apiKey?.substring(0, 10) || "none",
      baseUrl: baseUrl || "not set",
    })

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "YOCO_SECRET_KEY not configured",
          details: "Please set the YOCO_SECRET_KEY environment variable",
        },
        { status: 500 },
      )
    }

    // Test a simple API call to Yoco
    console.log("Testing Yoco API connectivity...")

    const testPayload = {
      amount: 100, // R1.00 for testing
      currency: "ZAR",
      cancelUrl: `${baseUrl || "http://localhost:3000"}/test-cancel`,
      successUrl: `${baseUrl || "http://localhost:3000"}/test-success`,
      failureUrl: `${baseUrl || "http://localhost:3000"}/test-failure`,
      metadata: {
        test: true,
        timestamp: new Date().toISOString(),
      },
      lineItems: [
        {
          displayName: "Test Item",
          quantity: 1,
          pricingDetails: {
            price: 100,
          },
        },
      ],
      subtotalAmount: 100,
      totalTaxAmount: 0,
      totalDiscount: 0,
    }

    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Idempotency-Key": `test-${Date.now()}`,
      },
      body: JSON.stringify(testPayload),
    })

    console.log("Yoco test response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log("Yoco error response:", errorText)

      return NextResponse.json(
        {
          error: "Yoco API test failed",
          status: response.status,
          statusText: response.statusText,
          response: errorText,
          suggestion: response.status === 401 ? "Check your API key" : "Check Yoco API documentation",
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    console.log("Yoco test successful:", data.id)

    return NextResponse.json({
      success: true,
      message: "Yoco API is working correctly",
      testCheckoutId: data.id,
      apiKeyValid: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Test API error:", error)
    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : String(error),
        type: error?.constructor?.name || "Unknown",
      },
      { status: 500 },
    )
  }
}
