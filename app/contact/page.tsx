import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Send, MapPin, Clock, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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
            <Link href="/#services" className="text-sm font-medium transition-colors hover:text-primary">
              Our Services
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="/#book" className="text-sm font-medium transition-colors hover:text-primary">
              The Book
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary font-semibold text-green-600"
            >
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
                Buy Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-green-50 to-green-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Contact Us</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're here to help you on your academic journey. Reach out to us with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              {/* Contact Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-6">Get In Touch</h2>
                  <p className="text-gray-500 mb-8">
                    Have questions about our services or the book? We're here to help you navigate your academic
                    journey. Contact us through any of the methods below.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Email</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">majork.n07@gmail.com</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Phone</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">+27 72 041 9723</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 8am - 5pm</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Location</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">123 University Avenue</p>
                      <p className="text-sm text-gray-500">Johannesburg, South Africa</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Office Hours</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Monday - Friday: 8am - 5pm</p>
                      <p className="text-sm text-gray-500">Saturday: 9am - 1pm</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">Contact Us Directly</h3>
                    <p className="text-gray-500">We're here to help with any questions you might have</p>
                  </div>

                  <div className="space-y-6">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 h-16 text-xl w-full" asChild>
                      <a href="mailto:majork.n07@gmail.com">
                        <Send className="mr-2 h-6 w-6" /> Email Us
                      </a>
                    </Button>

                    <Button size="lg" className="bg-green-500 hover:bg-green-600 h-16 text-xl w-full" asChild>
                      <a href="https://wa.me/27720419723" target="_blank" rel="noopener noreferrer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-2 h-6 w-6"
                        >
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z" />
                        </svg>
                        WhatsApp Us: +27 72 041 9723
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Our Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Let's Apply For You</h4>
                        <p className="text-sm text-gray-500">We handle the entire university application process</p>
                        <Button variant="link" className="p-0 h-auto text-green-600" asChild>
                          <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                            Application Assistance Request Form →
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Expert Advice</h4>
                        <p className="text-sm text-gray-500">Personalized mentoring and coaching programs</p>
                        <Button variant="link" className="p-0 h-auto text-green-600" asChild>
                          <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                            Mentorship Registration →
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Accommodation Services</h4>
                        <p className="text-sm text-gray-500">Find safe and affordable student housing</p>
                        <Button variant="link" className="p-0 h-auto text-green-600" asChild>
                          <a href="https://forms.gle/v8ChPFiKzx1P9YrWA" target="_blank" rel="noopener noreferrer">
                            Accommodation Reservations →
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our services and book
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>How do I purchase the book?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    You can purchase "Conquering Your Years in Tertiary Education" directly from our website or through
                    major bookstores. We offer both physical and digital copies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What does the application service include?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our application service includes researching suitable institutions, preparing application documents,
                    writing personal statements, and submitting applications on your behalf.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How much does mentoring cost?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Mentoring costs vary based on the program you choose. We offer different packages to suit various
                    needs and budgets. Contact us for a personalized quote.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do you help with scholarship applications?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Yes, our premium application package includes assistance with scholarship applications to help you
                    secure financial support for your studies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What areas do you offer accommodation in?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We offer accommodation services near major universities and colleges across South Africa, with a
                    focus on safe, affordable options within reasonable distance to campus.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How soon should I contact you before applying?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We recommend contacting us at least 3-6 months before application deadlines to ensure we have
                    sufficient time to prepare the strongest possible applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Ready to Start Your Academic Journey?
                </h2>
                <p className="mt-4 text-green-50">Contact us today and take the first step toward academic success.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50" asChild>
                  <a href="mailto:majork.n07@gmail.com">
                    <Send className="mr-2 h-5 w-5" /> Email Us Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700" asChild>
                  <Link href="/#book">Get The Book</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
