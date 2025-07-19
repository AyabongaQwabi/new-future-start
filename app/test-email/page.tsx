"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Mail, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

interface TestResult {
  success: boolean
  message: string
  messageId?: string
  errorType?: string
  timestamp?: string
  rawError?: string
  httpStatus?: number
}

export default function TestEmailPage() {
  const [formData, setFormData] = useState({
    customerName: "John Doe",
    customerEmail: "test@example.com",
    trackingNumber: `FS${Date.now().toString().slice(-6)}`,
    quantity: 1,
    deliveryMethod: "paxi",
    paxiCode: "P12345",
    deliveryAddress: "",
    promoCode: "",
    discountAmount: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>("")

  const bookPrice = 450 // R450
  const deliveryFee = formData.deliveryMethod === "paxi" ? 60 : 150 // R60 or R150
  const subtotal = bookPrice * formData.quantity + deliveryFee
  const discount = formData.discountAmount || 0
  const totalAmount = subtotal - discount

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSendTestEmail = async () => {
    setIsLoading(true)
    setResult(null)
    setDebugInfo("")

    const startTime = Date.now()

    try {
      const orderDetails = {
        ...formData,
        totalAmount: totalAmount * 100, // Convert to cents
        discountAmount: discount * 100, // Convert to cents
      }

      setDebugInfo(
        `🔄 Starting email test at ${new Date().toLocaleTimeString()}\n📤 Sending request to /api/send-thank-you-email...`,
      )

      const response = await fetch("/api/send-thank-you-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      })

      const duration = Date.now() - startTime
      setDebugInfo(
        (prev) =>
          `${prev}\n⏱️ Request completed in ${duration}ms\n📊 HTTP Status: ${response.status} ${response.statusText}`,
      )

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      setDebugInfo((prev) => `${prev}\n📋 Content-Type: ${contentType}`)

      if (!contentType || !contentType.includes("application/json")) {
        // Try to get the raw response text
        const rawText = await response.text()
        setDebugInfo(
          (prev) =>
            `${prev}\n❌ Non-JSON response received\n📄 Raw response: ${rawText.substring(0, 500)}${rawText.length > 500 ? "..." : ""}`,
        )

        setResult({
          success: false,
          message: "Server returned non-JSON response",
          errorType: "RESPONSE_FORMAT_ERROR",
          rawError: rawText,
          httpStatus: response.status,
        })
        return
      }

      let data
      try {
        data = await response.json()
        setDebugInfo((prev) => `${prev}\n✅ JSON parsed successfully`)
      } catch (jsonError) {
        const rawText = await response.text()
        setDebugInfo(
          (prev) =>
            `${prev}\n❌ JSON parsing failed: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}\n📄 Raw response: ${rawText}`,
        )

        setResult({
          success: false,
          message: "Failed to parse server response as JSON",
          errorType: "JSON_PARSE_ERROR",
          rawError: rawText,
          httpStatus: response.status,
        })
        return
      }

      setDebugInfo((prev) => `${prev}\n📨 Response data: ${JSON.stringify(data, null, 2)}`)

      if (data.success) {
        setResult({
          success: true,
          message: "Test email sent successfully!",
          messageId: data.messageId,
          timestamp: data.timestamp,
        })
        setDebugInfo((prev) => `${prev}\n✅ Email sent successfully!`)
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to send email",
          errorType: data.errorType,
          httpStatus: response.status,
        })
        setDebugInfo((prev) => `${prev}\n❌ Email sending failed: ${data.error}`)
      }
    } catch (networkError) {
      const duration = Date.now() - startTime
      setDebugInfo(
        (prev) =>
          `${prev}\n💥 Network error after ${duration}ms: ${networkError instanceof Error ? networkError.message : String(networkError)}`,
      )

      setResult({
        success: false,
        message: `Network error: ${networkError instanceof Error ? networkError.message : "Unknown network error"}`,
        errorType: "NETWORK_ERROR",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getErrorIcon = (errorType?: string) => {
    switch (errorType) {
      case "SMTP_CONNECTION_ERROR":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "VALIDATION_ERROR":
        return <Info className="h-5 w-5 text-blue-600" />
      case "EMAIL_SEND_ERROR":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "NETWORK_ERROR":
        return <AlertTriangle className="h-5 w-5 text-purple-600" />
      default:
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getErrorColor = (errorType?: string) => {
    switch (errorType) {
      case "SMTP_CONNECTION_ERROR":
        return "border-orange-200 bg-orange-50"
      case "VALIDATION_ERROR":
        return "border-blue-200 bg-blue-50"
      case "EMAIL_SEND_ERROR":
        return "border-red-200 bg-red-50"
      case "NETWORK_ERROR":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-red-200 bg-red-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Email Testing & Debugging</h1>
          <p className="text-gray-600">
            Test the automated thank you email functionality with detailed error reporting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure the test email parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Customer Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Customer Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                      placeholder="Enter customer email"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Order Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="trackingNumber">Tracking Number</Label>
                    <Input
                      id="trackingNumber"
                      value={formData.trackingNumber}
                      onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                      placeholder="Tracking number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Select
                      value={formData.quantity.toString()}
                      onValueChange={(value) => handleInputChange("quantity", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} book{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delivery Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Delivery Information</h3>
                <div>
                  <Label>Delivery Method</Label>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => handleInputChange("deliveryMethod", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paxi" id="paxi" />
                      <Label htmlFor="paxi">PAXI Collection (R60)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="door-to-door" id="door-to-door" />
                      <Label htmlFor="door-to-door">Door-to-Door Delivery (R150)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.deliveryMethod === "paxi" && (
                  <div>
                    <Label htmlFor="paxiCode">PAXI Store Code</Label>
                    <Input
                      id="paxiCode"
                      value={formData.paxiCode}
                      onChange={(e) => handleInputChange("paxiCode", e.target.value)}
                      placeholder="e.g., P12345"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: P followed by 4-5 digits</p>
                  </div>
                )}

                {formData.deliveryMethod === "door-to-door" && (
                  <div>
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                      placeholder="Enter full delivery address"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* Promo Code */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Promo Code (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="promoCode">Promo Code</Label>
                    <Input
                      id="promoCode"
                      value={formData.promoCode}
                      onChange={(e) => handleInputChange("promoCode", e.target.value)}
                      placeholder="e.g., STUDENT10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discountAmount">Discount Amount (R)</Label>
                    <Input
                      id="discountAmount"
                      type="number"
                      value={formData.discountAmount}
                      onChange={(e) => handleInputChange("discountAmount", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <Button onClick={handleSendTestEmail} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing Email...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>📦 Order Preview</CardTitle>
              <CardDescription>Preview of the order details that will be emailed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    Book{formData.quantity > 1 ? "s" : ""} × {formData.quantity}
                  </span>
                  <span>R{(bookPrice * formData.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({formData.deliveryMethod === "paxi" ? "PAXI" : "Door-to-Door"})</span>
                  <span>R{deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({formData.promoCode})</span>
                    <span>-R{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div>
                  <span className="font-medium">Method:</span>{" "}
                  <Badge variant="outline">
                    {formData.deliveryMethod === "paxi" ? "PAXI Collection" : "Door-to-Door Delivery"}
                  </Badge>
                </div>
                {formData.deliveryMethod === "paxi" && formData.paxiCode && (
                  <div>
                    <span className="font-medium">PEP Store Code:</span> {formData.paxiCode}
                  </div>
                )}
                {formData.deliveryMethod === "door-to-door" && formData.deliveryAddress && (
                  <div>
                    <span className="font-medium">Address:</span>
                    <p className="text-sm text-gray-600 mt-1">{formData.deliveryAddress}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">SMTP:</span> mail.futurestart.co.za:465 (SSL)
                </div>
                <div>
                  <span className="font-medium">From:</span> info@futurestart.co.za
                </div>
                <div>
                  <span className="font-medium">To:</span> {formData.customerEmail}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results & Debug Section */}
          <div className="space-y-6">
            {/* Test Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      getErrorIcon(result.errorType)
                    )}
                    {result.success ? "Success!" : "Test Failed"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className={result.success ? "border-green-200 bg-green-50" : getErrorColor(result.errorType)}>
                    <AlertTitle className="flex items-center gap-2">
                      {result.success ? "Email Sent Successfully" : `Error: ${result.errorType || "Unknown"}`}
                      {result.httpStatus && (
                        <Badge variant="outline" className="ml-auto">
                          HTTP {result.httpStatus}
                        </Badge>
                      )}
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      <p>{result.message}</p>
                      {result.messageId && (
                        <p className="text-xs mt-2 font-mono bg-white/50 p-2 rounded">Message ID: {result.messageId}</p>
                      )}
                      {result.timestamp && (
                        <p className="text-xs mt-1 text-gray-600">
                          Sent at: {new Date(result.timestamp).toLocaleString()}
                        </p>
                      )}
                      {result.rawError && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium">Raw Error Details</summary>
                          <pre className="text-xs mt-2 bg-white/50 p-2 rounded overflow-auto max-h-32">
                            {result.rawError}
                          </pre>
                        </details>
                      )}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Debug Information */}
            {debugInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Debug Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto max-h-64 whitespace-pre-wrap">
                    {debugInfo}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Error Type Explanations */}
            <Card>
              <CardHeader>
                <CardTitle>🔍 Error Types Explained</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <Badge variant="outline" className="mr-2">
                    SMTP_CONNECTION_ERROR
                  </Badge>
                  <span>Cannot connect to mail server</span>
                </div>
                <div>
                  <Badge variant="outline" className="mr-2">
                    EMAIL_SEND_ERROR
                  </Badge>
                  <span>Connected but failed to send email</span>
                </div>
                <div>
                  <Badge variant="outline" className="mr-2">
                    VALIDATION_ERROR
                  </Badge>
                  <span>Invalid input data (email format, PAXI code, etc.)</span>
                </div>
                <div>
                  <Badge variant="outline" className="mr-2">
                    NETWORK_ERROR
                  </Badge>
                  <span>Network connectivity issues</span>
                </div>
                <div>
                  <Badge variant="outline" className="mr-2">
                    JSON_PARSE_ERROR
                  </Badge>
                  <span>Server returned invalid JSON response</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
