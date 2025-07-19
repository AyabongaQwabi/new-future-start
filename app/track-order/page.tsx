"use client"
import { Suspense } from "react"
import TrackOrderContent from "./track-order-content"

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">Loading...</div>}
    >
      <TrackOrderContent />
    </Suspense>
  )
}
