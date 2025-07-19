"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Package } from "lucide-react"
import Link from "next/link"

export default function CheckoutStatus() {
  const searchParams = useSearchParams()
  const [orderStatus, setOrderStatus] = useState<"success" | "failed" | "cancelled" | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkout = searchParams.get("checkout")
    const orderIdParam = searchParams.get("order_id")

    if (checkout && orderIdParam) {
      setOrderId(orderIdParam)

      if (checkout === "success") {
        setOrderStatus("success")
        // Fetch order details to get tracking number
        fetchOrderDetails(orderIdParam)
      } else if (checkout === "failed") {
        setOrderStatus("failed")
      } else if (checkout === "cancelled") {
        setOrderStatus("cancelled")
      }
    }

    setLoading(false)
  }, [searchParams])

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.order?.tracking_number) {
          setTrackingNumber(data.order.tracking_number)
        }
      }
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  if (loading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    )
  }

  if (!orderStatus) {
    return null
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {orderStatus === "success" && <CheckCircle className="h-16 w-16 text-green-500" />}
          {orderStatus === "failed" && <XCircle className="h-16 w-16 text-red-500" />}
          {orderStatus === "cancelled" && <Clock className="h-16 w-16 text-yellow-500" />}
        </div>
        <CardTitle>
          {orderStatus === "success" && "Payment Successful!"}
          {orderStatus === "failed" && "Payment Failed"}
          {orderStatus === "cancelled" && "Payment Cancelled"}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {orderStatus === "success" && (
          <>
            <p className="text-gray-600">
              Thank you for your purchase! Your order has been confirmed and you will receive an email confirmation
              shortly.
            </p>
            {trackingNumber && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Your tracking number:</p>
                <p className="font-mono text-lg font-bold text-blue-600">{trackingNumber}</p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {trackingNumber && (
                <Button asChild>
                  <Link href={`/track?tracking=${trackingNumber}`}>
                    <Package className="h-4 w-4 mr-2" />
                    Track Your Order
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </>
        )}

        {orderStatus === "failed" && (
          <>
            <p className="text-gray-600">
              Your payment could not be processed. Please try again or contact support if the problem persists.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/#purchase">Try Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </>
        )}

        {orderStatus === "cancelled" && (
          <>
            <p className="text-gray-600">Your payment was cancelled. You can try again whenever you're ready.</p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/#purchase">Try Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </>
        )}

        {orderId && <p className="text-xs text-gray-500">Order ID: {orderId}</p>}
      </CardContent>
    </Card>
  )
}
