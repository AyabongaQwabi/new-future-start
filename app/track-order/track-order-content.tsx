"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

interface Order {
  id: string
  tracking_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  product_name: string
  quantity: number
  amount: number
  delivery_fee: number
  discount_amount: number
  final_price: number
  delivery_method: string
  paxi_code?: string
  delivery_address?: string
  promo_code?: string
  status: string
  payment_status: string
  created_at: string
}

interface OrderTracking {
  id: string
  status: string
  notes?: string
  created_at: string
  created_by: string
}

export function TrackOrderContent() {
  const searchParams = useSearchParams()
  const trackingFromUrl = searchParams.get("tracking")
  
  const [trackingNumber, setTrackingNumber] = useState(trackingFromUrl || "")
  const [order, setOrder] = useState<Order | null>(null)
  const [trackingHistory, setTrackingHistory] = useState<OrderTracking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-search if tracking number is in URL
  useEffect(() => {
    if (trackingFromUrl) {
      handleSearch()
    }
  }, [trackingFromUrl])

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setLoading(true)
    setError(null)
    setOrder(null)
    setTrackingHistory([])

    try {
      const response = await fetch(`/api/track-order?tracking=${encodeURIComponent(trackingNumber)}`)
      const data = await response.json()

      if (response.ok && data.success) {
        setOrder(data.order)
        setTrackingHistory(data.tracking || [])
      } else {
        setError(data.message || "Order not found")
      }
    } catch (err) {
      console.error("Error tracking order:", err)
      setError("Failed to track order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Pending Payment"
      case "paid":
        return "Payment Received"
      case "completed":
        return "Payment Completed"
      case "processing":
        return "Processing"
      case "shipped":
        return "Shipped"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  return (
    <div className="space-\
