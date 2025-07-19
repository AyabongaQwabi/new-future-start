"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Package, Truck, CheckCircle, Clock, Phone, Mail, MessageCircle } from "lucide-react"
import { type Order, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/types/order"

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setLoading(true)
    setError("")
    setOrder(null)

    try {
      const response = await fetch(`/api/track-order?tracking=${encodeURIComponent(trackingNumber.trim())}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to track order")
      }

      if (data.order) {
        setOrder(data.order)
      } else {
        setError("Order not found. Please check your tracking number and try again.")
      }
    } catch (err) {
      console.error("Tracking error:", err)
      setError(err instanceof Error ? err.message : "Failed to track order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getProgressPercentage = (status: string) => {
    const statusOrder = ["pending", "paid", "processing", "shipped", "delivered"]
    const currentIndex = statusOrder.indexOf(status)
    return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "paid":
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking number to see your order status</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter your tracking number (e.g., FS20241207-ABCD)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-lg py-3"
                    disabled={loading}
                  />
                </div>
                <Button type="submit" disabled={loading || !trackingNumber.trim()} className="px-8 py-3 text-lg">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Track Order
                    </>
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Status Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  Order Status: {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(order.status)}%` }}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center">
                    <Badge className={ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS]}>
                      {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-medium">{order.tracking_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{order.customer_email}</p>
                  </div>
                  {order.customer_phone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{order.customer_phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Product</p>
                    <p className="font-medium">{order.product_name}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Book Price:</span>
                    <span className="font-medium">R{(order.amount / 100).toFixed(2)}</span>
                  </div>
                  {order.delivery_fee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Delivery Fee:</span>
                      <span className="font-medium">R{(order.delivery_fee / 100).toFixed(2)}</span>
                    </div>
                  )}
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Discount ({order.promo_code}):</span>
                      <span className="font-medium">-R{(order.discount_amount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>R{(order.final_price / 100).toFixed(2)}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <Badge
                      className={
                        order.payment_status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.payment_status === "completed" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Delivery Method</p>
                  <p className="font-medium">
                    {order.delivery_method === "paxi" ? "PEP Store Collection" : "Door-to-Door Delivery"}
                  </p>
                </div>
                {order.delivery_speed && (
                  <div>
                    <p className="text-sm text-gray-600">Delivery Speed</p>
                    <p className="font-medium">
                      {order.delivery_speed === "pep_9_days" ? "9 Business Days" : "5 Business Days"}
                    </p>
                  </div>
                )}
                {order.paxi_code && (
                  <div>
                    <p className="text-sm text-gray-600">PAXI Collection Code</p>
                    <p className="font-medium text-lg">{order.paxi_code}</p>
                  </div>
                )}
                {order.delivery_address && (
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-medium">{order.delivery_address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about your order, feel free to contact us:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <a href="mailto:info@futurestart.co.za" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Us
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+27123456789" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={`https://wa.me/27123456789?text=Hi, I need help with my order ${order.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        {!order && !loading && (
          <Card>
            <CardHeader>
              <CardTitle>Need Help Finding Your Tracking Number?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your tracking number was sent to your email after completing your purchase. It looks like this:{" "}
                  <strong>FS20241207-ABCD</strong>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <a href="mailto:info@futurestart.co.za" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Support
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+27123456789" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Support
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://wa.me/27123456789?text=Hi, I need help tracking my order"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Support
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
