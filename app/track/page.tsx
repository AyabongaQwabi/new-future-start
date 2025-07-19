"use client"

import { Suspense } from "react"
import TrackOrderPage from "./track-order-page"

export default function TrackPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">Loading...</div>}
    >
      <TrackOrderPage />
    </Suspense>
  )
}
