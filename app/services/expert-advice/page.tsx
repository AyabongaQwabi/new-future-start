import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, BookOpen, Brain, Target, Award } from "lucide-react"
import ServiceHeader from "@/components/service-header"
import ServiceCTA from "@/components/service-cta"

export default function ExpertAdvicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceHeader
        title="Expert Advice"
        description="Personalized mentoring and coaching for academic excellence"
        currentPage="expert-advice"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-green-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Guidance That Feels Like <span className="text-green-600">Chatting With a Friend</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our specialized mentoring and coaching programs provide personalized guidance tailored to each
                  student's needs, helping them thrive both academically and personally.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                      Book a Session
                    </a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Programs
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Mentoring session"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mentoring Approach</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Inspired by the principles outlined in "Conquering Your Years in Tertiary Education"
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <Card className="flex flex-col items-center text-center p-6">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Personalized</h3>
                <p className="text-sm text-gray-500">
                  Tailored guidance based on your unique strengths, challenges, and academic goals.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Research-Backed</h3>
                <p className="text-sm text-gray-500">
                  Strategies and techniques proven to enhance academic performance and personal growth.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <Brain className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Holistic</h3>
                <p className="text-sm text-gray-500">
                  Addressing both academic excellence and personal well-being for balanced success.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Goal-Oriented</h3>
                <p className="text-sm text-gray-500">
                  Focused on achieving specific, measurable outcomes in your academic journey.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Mentoring Programs */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mentoring Programs</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the program that best fits your needs and goals
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Academic Excellence</CardTitle>
                  <CardDescription>Master your studies and achieve top grades</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Effective study techniques tailored to your learning style</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Exam preparation strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Time management and productivity optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Subject-specific tutoring and guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Career Preparation</CardTitle>
                  <CardDescription>Build a strong foundation for your future career</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>CV and cover letter development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Interview preparation and practice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Internship and job search strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Professional networking guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Personal Development</CardTitle>
                  <CardDescription>Grow as a person while excelling academically</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Stress management and mental wellness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Leadership and communication skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Goal setting and achievement strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Work-life balance and self-care practices</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Meet Our Mentors */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Mentors</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experienced professionals and academic achievers dedicated to your success
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Mentor"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle className="mt-4">Dr. Sarah Nkosi</CardTitle>
                  <CardDescription>Academic Excellence Specialist</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    PhD in Education with 10+ years of experience helping students achieve academic excellence and
                    graduate with honors.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Mentor"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle className="mt-4">Prof. James Mokoena</CardTitle>
                  <CardDescription>Career Development Coach</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Former university career services director with extensive experience in helping students transition
                    from academics to successful careers.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Mentor"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle className="mt-4">Ms. Thandi Dlamini</CardTitle>
                  <CardDescription>Personal Development Specialist</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Certified life coach specializing in student wellness, stress management, and holistic personal
                    development during tertiary education.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                  Meet All Mentors
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Success Stories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real results from students who benefited from our mentoring programs
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Award className="h-8 w-8 text-green-600" />
                    <div>
                      <CardTitle>From Struggling to Distinction</CardTitle>
                      <CardDescription>Sipho's Journey</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "I was on the verge of dropping out after failing multiple modules in my first year. The Academic
                    Excellence program helped me identify my learning style, develop effective study techniques, and
                    manage my time better. Within one semester, I went from failing to achieving distinctions in most of
                    my subjects."
                  </p>
                  <p className="text-sm font-medium">Sipho M. - Computer Science Student</p>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Award className="h-8 w-8 text-green-600" />
                    <div>
                      <CardTitle>Landing My Dream Internship</CardTitle>
                      <CardDescription>Nomsa's Achievement</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "The Career Preparation program transformed my approach to job hunting. My mentor helped me revamp
                    my CV, prepare for interviews, and develop a strategic approach to networking. As a result, I
                    secured a highly competitive internship at a top company in my field, which later turned into a job
                    offer."
                  </p>
                  <p className="text-sm font-medium">Nomsa K. - Business Administration Student</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <ServiceCTA
          title="Ready to Excel in Your Academic Journey?"
          description="Book a session with one of our expert mentors today and take the first step toward academic and personal success."
          buttonText="Register for Mentorship"
          formUrl="https://forms.gle/gzUZerF5dnetQGkK7"
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
