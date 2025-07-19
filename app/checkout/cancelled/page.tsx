import { XCircle, ArrowLeft, Phone, Mail, RefreshCw, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Navbar from "@/components/navbar"

async function updateCancelledOrder(orderId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/checkout/cancelled`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
        cache: "no-store",
      },
    )

    if (!response.ok) {
      console.error("Failed to update order status")
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating cancelled order:", error)
    return null
  }
}

export default async function CheckoutCancelledPage({
  searchParams,
}: {
  searchParams: { order_id?: string }
}) {
  const orderId = searchParams.order_id

  // Update order status to cancelled
  if (orderId) {
    await updateCancelledOrder(orderId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Cancelled Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-lg text-gray-600">
              No worries! Your payment was cancelled and no charges were made to your account.
            </p>
          </div>

          {/* Reassurance Card */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                We Understand! 💙
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Sometimes you need a moment to think it over, and that's totally okay! Your future success is worth
                taking the time to make the right decision.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Why students love our book:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Written by a top academic achiever</li>
                  <li>✅ Proven strategies that actually work</li>
                  <li>✅ Covers everything from applications to graduation</li>
                  <li>✅ Thousands of successful students can't be wrong!</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* What You're Missing */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What You're Missing Out On 📚</CardTitle>
              <CardDescription>Here's what other students are saying about their transformation:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm text-green-800 italic">
                    "I went from struggling with time management to graduating cum laude. This book literally changed my
                    entire university experience!" - Sarah M.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800 italic">
                    "The application strategies alone saved me months of stress. I got into my dream university on the
                    first try!" - Michael K.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm text-purple-800 italic">
                    "Best investment I made for my education. The accommodation tips helped me find the perfect place
                    near campus!" - Thandi L.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 flex-1" asChild>
              <Link href="/">
                <RefreshCw className="mr-2 h-4 w-4" />
                I'm Ready Now - Get the Book!
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="flex-1 bg-transparent" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Special Offer */}
          <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">🎯 Still Thinking? Let's Chat!</CardTitle>
              <CardDescription className="text-orange-700">
                We'd love to answer any questions you might have about the book or our services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 mb-4">
                Sometimes a quick conversation is all you need to feel confident about your decision. Our team is here
                to help you understand exactly how this book can transform your university journey.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                  asChild
                >
                  <a href="https://wa.me/27720419723" target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp Chat
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                  asChild
                >
                  <a href="mailto:majork.n07@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Questions
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Final Encouragement */}
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Your Success Story is Waiting! 🌟</h3>
            <p className="text-gray-600 mb-4">
              Every successful student started with a single decision to invest in their future. Don't let this moment
              pass you by - your future self will thank you!
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/">🚀 Let's Start Your Success Journey!</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
