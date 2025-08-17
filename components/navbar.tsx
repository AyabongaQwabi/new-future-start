"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import BookPurchaseButton from "./book-purchase-button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2020.11.24-aiRSvS4nTzPtzOlvrrO8NPFtkZKU0Y.jpeg"
              alt="Future Start Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/#home"
            className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
          >
            🏠 Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform flex items-center gap-1">
              ✨ Services
              <ChevronDown className="h-3 w-3" />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <Link
                  href="/services/apply-for-you"
                  className="block px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  📝 Let's Apply For You
                </Link>
                <Link
                  href="/services/expert-advice"
                  className="block px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  🧠 Expert Advice
                </Link>
                <Link
                  href="/services/accommodation"
                  className="block px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  🏠 Accommodation Services
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/#testimonials"
            className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
          >
            💬 Reviews
          </Link>
          <Link
            href="/#book"
            className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
          >
            📚 The Book
          </Link>
          <Link
            href="/track-order"
            className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
          >
            📦 Track Order
          </Link>
          <Link
            href="/promo-codes"
            className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
          >
            🎫 Promo Codes
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
          >
            📞 Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <BookPurchaseButton
            amount={45000} // R450 in cents
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            🛒 Get the Book - R450
          </BookPurchaseButton>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container py-4 space-y-4">
            <Link
              href="/#home"
              className="block text-sm font-bold transition-colors hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              🏠 Home
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-bold text-gray-600">✨ Services</p>
              <div className="pl-4 space-y-2">
                <Link
                  href="/services/apply-for-you"
                  className="block text-sm hover:text-purple-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  📝 Let's Apply For You
                </Link>
                <Link
                  href="/services/expert-advice"
                  className="block text-sm hover:text-purple-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  🧠 Expert Advice
                </Link>
                <Link
                  href="/services/accommodation"
                  className="block text-sm hover:text-purple-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  🏠 Accommodation Services
                </Link>
              </div>
            </div>
            <Link
              href="/#testimonials"
              className="block text-sm font-bold transition-colors hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              💬 Reviews
            </Link>
            <Link
              href="/#book"
              className="block text-sm font-bold transition-colors hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              📚 The Book
            </Link>
            <Link
              href="/track-order"
              className="block text-sm font-bold transition-colors hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              📦 Track Order
            </Link>
            <Link
              href="/promo-codes"
              className="block text-sm font-bold transition-colors hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              🎫 Promo Codes
            </Link>
            <Link
              href="/#contact"
              className="block text-sm font-bold transition-colors hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              📞 Contact
            </Link>
            <div className="pt-4">
              <BookPurchaseButton
                amount={45000} // R450 in cents
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full shadow-lg"
              >
                🛒 Get the Book - R450
              </BookPurchaseButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

// Also export as default for compatibility
export default Navbar
