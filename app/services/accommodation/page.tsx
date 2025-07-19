import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, MapPin, Shield, Wifi, Users } from "lucide-react"
import ServiceHeader from "@/components/service-header"
import ServiceCTA from "@/components/service-cta"

export default function AccommodationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceHeader
        title="Student Accommodation"
        description="Safe, comfortable, and affordable housing for students"
        currentPage="accommodation"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-green-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Find Your Perfect <span className="text-green-600">Student Home</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We connect students with safe, comfortable, and affordable accommodation options, making your
                  transition to university seamless and stress-free.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/v8ChPFiKzx1P9YrWA" target="_blank" rel="noopener noreferrer">
                      Find Accommodation
                    </a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Student accommodation"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose Our Accommodation Service
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We understand the challenges students face in finding appropriate accommodation
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card className="flex flex-col items-center text-center p-6">
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Safety First</h3>
                <p className="text-sm text-gray-500">
                  All our accommodations meet strict safety standards and are located in secure areas.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <MapPin className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Convenient Locations</h3>
                <p className="text-sm text-gray-500">
                  Properties close to campus or with good transport links to minimize commute time.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Student Community</h3>
                <p className="text-sm text-gray-500">
                  Live with like-minded peers in environments conducive to both studying and socializing.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Accommodation Types */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Accommodation Options</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a variety of housing options to suit different preferences and budgets
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=225&width=400"
                    alt="University Residence"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>University Residences</CardTitle>
                  <CardDescription>On-campus accommodation options</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Official university housing with meal plans, structured environments, and easy access to campus
                    facilities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Meal Plans
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      On Campus
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Furnished
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=225&width=400"
                    alt="Private Student Housing"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Private Student Housing</CardTitle>
                  <CardDescription>Purpose-built student accommodations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Modern facilities with private rooms, shared common areas, and amenities like gyms, study spaces,
                    and social areas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      En-suite Options
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Study Areas
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Social Spaces
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=225&width=400"
                    alt="Shared Houses"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Shared Houses</CardTitle>
                  <CardDescription>Private rentals for student groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Houses or apartments shared with other students, offering more independence and often lower costs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Cost-effective
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Independent Living
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Flexible Leases
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <a href="https://forms.gle/v8ChPFiKzx1P9YrWA" target="_blank" rel="noopener noreferrer">
                  Browse All Options
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Properties</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Some of our most popular student accommodations
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={`/property-placeholder.png?height=225&width=400&text=Property ${item}`}
                      alt={`Student Property ${item}`}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Student Haven {item}</CardTitle>
                      <span className="font-bold text-green-600">R{(3500 + item * 500).toLocaleString()}/mo</span>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item % 2 === 0 ? "Near University of Pretoria" : "Close to Wits University"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>{item % 3 === 0 ? "Single Room" : "Shared Room"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{(item % 3) + 1} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="h-4 w-4" />
                        <span>Free WiFi</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://forms.gle/v8ChPFiKzx1P9YrWA" target="_blank" rel="noopener noreferrer">
                        View Details
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <a href="https://forms.gle/v8ChPFiKzx1P9YrWA" target="_blank" rel="noopener noreferrer">
                  View All Properties
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Finding your perfect student accommodation is easy with Future Start
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4 mt-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">1</span>
                  </div>
                  <CardTitle className="mt-4">Tell Us Your Needs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Share your preferences, budget, and requirements through our simple form.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">2</span>
                  </div>
                  <CardTitle className="mt-4">Get Matched</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We'll match you with suitable properties based on your specific requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">3</span>
                  </div>
                  <CardTitle className="mt-4">Tour Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Schedule viewings of your shortlisted properties, either in person or virtually.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">4</span>
                  </div>
                  <CardTitle className="mt-4">Secure Your Home</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We'll help you with the application process and secure your new student home.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <ServiceCTA
          title="Ready to Find Your Perfect Student Accommodation?"
          description="Let us help you secure safe, comfortable, and affordable housing near your university."
          buttonText="Make a Reservation"
          formUrl="https://forms.gle/v8ChPFiKzx1P9YrWA"
        />
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
