"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Check, X, Plus, Minus } from "lucide-react"

interface DeliveryFormProps {
  bookPrice: number
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function DeliveryForm({ bookPrice, onSubmit, isLoading }: DeliveryFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryMethod: "paxi",
    paxiStore: "",
    address: "",
    city: "",
    postalCode: "",
    promoCode: "",
    quantity: 1,
  })

  const [promoValidation, setPromoValidation] = useState<{
    isValid: boolean | null
    discount: number
    message: string
    isValidating: boolean
  }>({
    isValid: null,
    discount: 0,
    message: "",
    isValidating: false,
  })

  const [paxiValidation, setPaxiValidation] = useState<{
    isValid: boolean | null
    message: string
  }>({
    isValid: null,
    message: "",
  })

  const deliveryFees = {
    paxi: 6000, // R60
    door: 15000, // R150
  }

  const validatePaxiCode = (code: string) => {
    const paxiRegex = /^P\d{4,5}$/
    if (!code.trim()) {
      setPaxiValidation({
        isValid: false,
        message: "Please enter a PAXI store code",
      })
      return false
    }

    if (paxiRegex.test(code.toUpperCase())) {
      setPaxiValidation({
        isValid: true,
        message: "Valid PAXI store code",
      })
      return true
    } else {
      setPaxiValidation({
        isValid: false,
        message: "PAXI code must start with P followed by 4-5 digits (e.g., P23456)",
      })
      return false
    }
  }

  const validatePromoCode = async () => {
    if (!formData.promoCode.trim()) {
      setPromoValidation({
        isValid: false,
        discount: 0,
        message: "Please enter a promo code",
        isValidating: false,
      })
      return
    }

    setPromoValidation((prev) => ({ ...prev, isValidating: true }))

    try {
      const response = await fetch("/api/validate-promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: formData.promoCode }),
      })

      const data = await response.json()

      console.log("Promo validation response:", data)

      if (response.ok && data.valid) {
        setPromoValidation({
          isValid: true,
          discount: data.discountAmount || data.discount,
          message: `Great! You saved R${((data.discountAmount || data.discount) / 100).toFixed(2)}`,
          isValidating: false,
        })
      } else {
        setPromoValidation({
          isValid: false,
          discount: 0,
          message: data.message || "Invalid promo code",
          isValidating: false,
        })
      }
    } catch (error) {
      console.error("Promo validation error:", error)
      setPromoValidation({
        isValid: false,
        discount: 0,
        message: "Error validating promo code. Please try again.",
        isValidating: false,
      })
    }
  }

  const clearPromoCode = () => {
    setFormData((prev) => ({ ...prev, promoCode: "" }))
    setPromoValidation({
      isValid: null,
      discount: 0,
      message: "",
      isValidating: false,
    })
  }

  const updateQuantity = (change: number) => {
    const newQuantity = Math.max(1, Math.min(10, formData.quantity + change))
    setFormData((prev) => ({ ...prev, quantity: newQuantity }))
  }

  const deliveryFee = deliveryFees[formData.deliveryMethod as keyof typeof deliveryFees]
  const discount = promoValidation.isValid ? promoValidation.discount : 0
  const subtotal = bookPrice * formData.quantity + deliveryFee
  const total = subtotal - discount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate PAXI code if PAXI delivery is selected
    if (formData.deliveryMethod === "paxi") {
      const isPaxiValid = validatePaxiCode(formData.paxiStore)
      if (!isPaxiValid) {
        return
      }
    }

    const orderData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryMethod: formData.deliveryMethod,
      paxiCode: formData.deliveryMethod === "paxi" ? formData.paxiStore.toUpperCase() : undefined,
      deliveryAddress:
        formData.deliveryMethod === "door"
          ? `${formData.address}, ${formData.city}, ${formData.postalCode}`
          : undefined,
      deliveryFee,
      discountAmount: discount,
      promoCode: promoValidation.isValid ? formData.promoCode : undefined,
      quantity: formData.quantity,
      amount: total,
      finalPrice: total,
      bookPrice: bookPrice * formData.quantity,
    }

    console.log("Submitting order data:", orderData)
    onSubmit(orderData)
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    (formData.deliveryMethod === "paxi"
      ? formData.paxiStore && paxiValidation.isValid
      : formData.address && formData.city && formData.postalCode)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Please provide your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+27 12 345 6789"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Quantity Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Quantity</CardTitle>
          <CardDescription>How many copies would you like?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(-1)}
              disabled={formData.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-2xl font-bold w-16 text-center">{formData.quantity}</div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(1)}
              disabled={formData.quantity >= 10}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">Maximum 10 copies per order</p>
        </CardContent>
      </Card>

      {/* Delivery Method */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Method</CardTitle>
          <CardDescription>
            Choose how you'd like to receive your book{formData.quantity > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.deliveryMethod}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, deliveryMethod: value }))}
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="paxi" id="paxi" />
              <Label htmlFor="paxi" className="flex-1">
                <div className="font-medium">PAXI Collection (R60)</div>
                <div className="text-sm text-gray-600">Collect from your nearest PEP store</div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="door" id="door" />
              <Label htmlFor="door" className="flex-1">
                <div className="font-medium">Door-to-Door Delivery (R150)</div>
                <div className="text-sm text-gray-600">Delivered directly to your address</div>
              </Label>
            </div>
          </RadioGroup>

          {formData.deliveryMethod === "paxi" && (
            <div className="mt-4">
              <Label htmlFor="paxiStore">PAXI Store Code *</Label>
              <Input
                id="paxiStore"
                placeholder="Enter PAXI code (e.g., P23456)"
                value={formData.paxiStore}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase()
                  setFormData((prev) => ({ ...prev, paxiStore: value }))
                  if (value) validatePaxiCode(value)
                }}
                onBlur={() => formData.paxiStore && validatePaxiCode(formData.paxiStore)}
                required
                className={
                  paxiValidation.isValid === true
                    ? "border-green-500"
                    : paxiValidation.isValid === false
                      ? "border-red-500"
                      : ""
                }
              />
              {paxiValidation.message && (
                <div
                  className={`flex items-center gap-2 mt-2 text-sm ${
                    paxiValidation.isValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {paxiValidation.isValid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {paxiValidation.message}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Find your nearest PEP store at paxi.co.za</p>
            </div>
          )}

          {formData.deliveryMethod === "door" && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Promo Code */}
      <Card>
        <CardHeader>
          <CardTitle>Promo Code</CardTitle>
          <CardDescription>Have a discount code? Enter it here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={formData.promoCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, promoCode: e.target.value.toUpperCase() }))}
              disabled={promoValidation.isValid}
            />
            {!promoValidation.isValid ? (
              <Button
                type="button"
                variant="outline"
                onClick={validatePromoCode}
                disabled={promoValidation.isValidating || !formData.promoCode.trim()}
              >
                {promoValidation.isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Validate"}
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={clearPromoCode}>
                Remove
              </Button>
            )}
          </div>

          {promoValidation.message && (
            <div
              className={`flex items-center gap-2 mt-2 text-sm ${
                promoValidation.isValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {promoValidation.isValid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              {promoValidation.message}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>
              Book{formData.quantity > 1 ? "s" : ""}: "Conquering Your Years in Tertiary Education" ×{" "}
              {formData.quantity}
            </span>
            <span>R{((bookPrice * formData.quantity) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery ({formData.deliveryMethod === "paxi" ? "PAXI" : "Door-to-Door"})</span>
            <span>R{(deliveryFee / 100).toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({formData.promoCode})</span>
              <span>-R{(discount / 100).toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>R{(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Proceed to Payment - R${(total / 100).toFixed(2)}`
        )}
      </Button>
    </form>
  )
}
