import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ServiceHeaderProps {
  title: string
  description: string
  currentPage: string
}

export default function ServiceHeader({ title, description, currentPage }: ServiceHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
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
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/services/apply-for-you"
            className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === "apply-for-you" ? "text-primary font-semibold" : ""}`}
          >
            Let's Apply For You
          </Link>
          <Link
            href="/services/expert-advice"
            className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === "expert-advice" ? "text-primary font-semibold" : ""}`}
          >
            Expert Advice
          </Link>
          <Link
            href="/services/accommodation"
            className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === "accommodation" ? "text-primary font-semibold" : ""}`}
          >
            Accommodation
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div>
          <Button asChild>
            <a
              href="https://wa.me/27720419723?text=I'm%20interested%20in%20buying%20the%20book%20'Conquering%20Your%20Years%20in%20Tertiary%20Education'"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy The Book
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
