import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import ServiceHeader from "@/components/service-header"
import ServiceCTA from "@/components/service-cta"

export default function ApplyForYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceHeader
        title="Let's Apply For You"
        description="We handle the entire university application process on your behalf"
        currentPage="apply-for-you"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-green-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Focus on Your Studies, <span className="text-green-600">We'll Handle the Rest</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Applying for university or college is overwhelming and stressful. Let our experts manage the entire
                  process while you focus on what matters most - your education.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                      Get Started Today
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
                  alt="Students celebrating acceptance"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our streamlined process makes university applications simple and stress-free
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">1</span>
                  </div>
                  <CardTitle className="mt-4">Initial Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500">
                    We meet with you to understand your academic goals, interests, and preferences for your tertiary
                    education journey.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">2</span>
                  </div>
                  <CardTitle className="mt-4">Research & Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500">
                    Our experts research suitable institutions and programs that align with your goals and academic
                    profile.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl font-bold text-green-600">3</span>
                  </div>
                  <CardTitle className="mt-4">Complete Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500">
                    We handle all paperwork, write compelling personal statements, and submit applications on your
                    behalf before deadlines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose Our Application Service
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The benefits of letting Future Start handle your university applications
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[
                {
                  title: "Save Valuable Time",
                  description: "Focus on your studies while we handle the time-consuming application process.",
                },
                {
                  title: "Expert Guidance",
                  description: "Benefit from our deep knowledge of admission requirements and processes.",
                },
                {
                  title: "Increased Acceptance Rates",
                  description:
                    "Our strategic approach improves your chances of acceptance to your preferred institutions.",
                },
                {
                  title: "Stress Reduction",
                  description: "Eliminate the anxiety and pressure associated with university applications.",
                },
                {
                  title: "Personalized Strategy",
                  description: "We tailor applications to highlight your unique strengths and achievements.",
                },
                {
                  title: "Complete Documentation",
                  description: "We ensure all required documents are properly prepared and submitted on time.",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-gray-500">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                  Book Your Consultation
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Success Stories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from students who successfully secured their university placements with our help
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <p className="italic text-gray-500">
                      "Future Start handled my applications to three universities while I was focusing on my final
                      exams. They secured my place at my first-choice university with a partial scholarship. Their
                      service was worth every penny!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="font-medium text-gray-600">TM</span>
                      </div>
                      <div>
                        <p className="font-medium">Thabo M.</p>
                        <p className="text-sm text-gray-500">Engineering Student, University of Cape Town</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <p className="italic text-gray-500">
                      "As an international student, I was overwhelmed by the application requirements. Future Start
                      guided me through every step, helped with my personal statement, and ensured all my documents were
                      properly submitted. I'm now studying at my dream university!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="font-medium text-gray-600">LN</span>
                      </div>
                      <div>
                        <p className="font-medium">Lerato N.</p>
                        <p className="text-sm text-gray-500">Business Student, Wits University</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Affordable Packages</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the package that best suits your needs
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Basic Package</CardTitle>
                  <CardDescription>For students who need assistance with a single application</CardDescription>
                  <div className="mt-4 text-4xl font-bold">R1,500</div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Application to 1 institution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Personal statement review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Document preparation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Application submission</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col relative border-green-600">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Standard Package</CardTitle>
                  <CardDescription>For students applying to multiple institutions</CardDescription>
                  <div className="mt-4 text-4xl font-bold">R3,500</div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Applications to 3 institutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Custom personal statement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Document preparation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Application submission</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Follow-up with institutions</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Premium Package</CardTitle>
                  <CardDescription>Comprehensive application support</CardDescription>
                  <div className="mt-4 text-4xl font-bold">R5,500</div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Applications to 5 institutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Custom personal statement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Document preparation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Application submission</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Follow-up with institutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Scholarship application assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Interview preparation</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <ServiceCTA
          title="Ready to Start Your Application Journey?"
          description="Let us handle the stress of applications while you focus on your studies."
          buttonText="Fill Application Form"
          formUrl="https://forms.gle/H3ByufVPG5DrPFik7"
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
