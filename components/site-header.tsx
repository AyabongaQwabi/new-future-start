"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const REGISTER_URL = "https://forms.cloud.microsoft/r/ZSsDf4MLM5"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/mentoring-coaching", label: "Mentoring & Coaching" },
  { href: "/book", label: "The Book" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-green-100 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/newlogo.png" alt="Future Start Logo" width={150} height={50} className="h-10 w-auto" priority />
        </Link>

        <nav className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform ${
                pathname === link.href ? "text-green-600" : "text-slate-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Register Now
            </a>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-bold transition-colors hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-full shadow-lg"
            >
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default SiteHeader
