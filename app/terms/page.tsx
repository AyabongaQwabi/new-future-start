import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              Future Start
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Terms and Conditions</h1>

          <div className="prose prose-green max-w-none">
            <p>Last updated: March 7, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to Future Start ("we," "our," or "us"). These Terms and Conditions govern your use of our website,
              products, and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2>2. Services</h2>
            <p>
              Future Start provides educational support services including university application assistance, mentoring
              and coaching, and student accommodation services. Our services are intended to support students in their
              tertiary education journey.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are
              responsible for maintaining the confidentiality of your account credentials and for all activities that
              occur under your account.
            </p>

            <h2>4. Payment Terms</h2>
            <p>
              Payment for our services must be made according to the pricing and payment terms specified at the time of
              purchase. All payments are non-refundable unless otherwise specified in our refund policy.
            </p>

            <h2>5. Book Purchases</h2>
            <p>
              When purchasing "Conquering Your Years in Tertiary Education," you are buying a physical or digital copy
              of the book for personal use. Redistribution, reproduction, or commercial use of the book's content is
              prohibited without explicit permission.
            </p>

            <h2>6. Application Services</h2>
            <p>
              Our application services are designed to assist students with university and college applications. While
              we strive to provide the best possible service, we cannot guarantee acceptance to any institution. The
              final decision rests with the institution.
            </p>

            <h2>7. Mentoring Services</h2>
            <p>
              Our mentoring and coaching services are provided by qualified professionals. However, results may vary
              based on individual circumstances, effort, and other factors beyond our control.
            </p>

            <h2>8. Accommodation Services</h2>
            <p>
              We act as an intermediary between students and accommodation providers. We are not responsible for any
              disputes that may arise between students and accommodation providers after a placement has been made.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and images, is the property of Future Start
              and is protected by copyright and other intellectual property laws. You may not use, reproduce, or
              distribute our content without our permission.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Future Start shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
              or indirectly.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
              posting the updated Terms on our website. Your continued use of our services after such changes
              constitutes your acceptance of the new Terms.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard
              to its conflict of law provisions.
            </p>

            <h2>13. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at info@futurestart.com.</p>
          </div>

          <div className="mt-8">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Future Start. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
