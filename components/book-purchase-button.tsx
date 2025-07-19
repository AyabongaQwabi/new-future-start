"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DeliveryForm } from "./delivery-form"
import { ShoppingCart } from "lucide-react"

const BOOK_PRICE = 45000 // R450 in cents

export default function BookPurchaseButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (orderData: any) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting order:", orderData)

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          bookPrice: BOOK_PRICE,
        }),
      })

      const data = await response.json()
      console.log("Checkout response:", data)

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to create checkout")
      }

      if (data.success && data.redirectUrl) {
        // Redirect to Yoco payment page
        window.location.href = data.redirectUrl
      } else {
        throw new Error("Invalid response from payment service")
      }
    } catch (error) {
      console.error("Purchase error:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Get your copy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Purchase "Conquering Your Years in Tertiary Education"</DialogTitle>
          <DialogDescription>
            Complete your order details below. You'll be redirected to our secure payment processor to complete your
            purchase.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        <DeliveryForm bookPrice={BOOK_PRICE} onSubmit={handlePurchase} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  )
}
