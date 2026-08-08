import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users } from "lucide-react"
import CheckoutStatus from "@/components/checkout-status"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const REGISTER_URL = "https://forms.cloud.microsoft/r/ZSsDf4MLM5"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Suspense fallback={null}>
        <CheckoutStatus />
      </Suspense>

      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden bg-[url('/marble-bg.jpg')] bg-cover bg-center bg-gray-100">
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute top-10 right-10 text-5xl animate-pulse">✨</div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-full font-bold text-lg md:text-2xl mb-6 shadow-lg">
                🌟 FUTURE START EXCELLENCE ACADEMY
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
                FutureReady Short Courses for Unemployed Youth and Graduates, Entrepreneurs &amp; Professionals
              </h1>
              <p className="text-base md:text-lg text-gray-800 font-medium mb-8 leading-relaxed text-justify">
                Learn practical skills in management, operations, and productivity and AI productivity fundamentals,
                taught live online by a trusted facilitator, preparing you for employment, excellence in your current
                position, and advanced study at universities and business schools. At Future Start, we are all about
                Excellence, preparing everyone to lead with excellence in their careers, businesses, and communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg rounded-full px-10 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
                  asChild
                >
                  <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Register Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Future Start */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                ABOUT FUTURE START
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                Excellence in Learning, Leadership &amp; Opportunity
              </h2>
              <p className="text-xl text-gray-600">Transforming Potential into Leadership Excellence</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Future Start prepares unemployed youth, graduates, professionals, entrepreneurs, and business owners
                with future-ready skills in management, operations, and productivity, integrating AI productivity
                fundamentals to boost employability, efficiency, leadership effectiveness, and Excellence.
              </p>

              <div className="grid gap-6 md:grid-cols-3 py-4">
                <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-500">
                  <h3 className="font-bold text-lg mb-2 text-slate-900">Short Courses</h3>
                  <p className="text-gray-600 text-base">
                    Practical, live online programs in project management, operations, cost management,
                    entrepreneurship, and more.
                  </p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-6 border-l-4 border-teal-500">
                  <h3 className="font-bold text-lg mb-2 text-slate-900">Mentoring</h3>
                  <p className="text-gray-600 text-base">
                    Guiding individuals to make smarter study, career, and leadership decisions.
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                  <h3 className="font-bold text-lg mb-2 text-slate-900">Coaching</h3>
                  <p className="text-gray-600 text-base">
                    Empowering learners with personalized support to transform potential into performance and
                    performance into leadership.
                  </p>
                </div>
              </div>

              <p>
                Founded by Ntokozo Mthethwa, an award-winning author, mentor, and entrepreneur, Future Start is built
                on discipline, academic excellence, and a belief that education should lead to opportunity. With over
                300 graduates mentored into successful careers, our mission is clear: to transform potential into
                performance, and performance into leadership, empowering learners to thrive globally with excellence.
              </p>

              <p className="text-xl font-bold text-green-700 text-center pt-2">Enrol today and lead with excellence!</p>
            </div>
          </div>
        </section>

        {/* Courses Teaser */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                  OUR COURSES
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                  Short Courses Built for Career-Ready Skills
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Standalone and combined flagship online courses for learners across South Africa, covering
                  operations, project management, cost management, entrepreneurship, statistics, supply chain, and
                  business management — with AI productivity fundamentals covered in every course.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-full px-8 py-6 shadow-xl transform hover:scale-105 transition-all"
                  asChild
                >
                  <Link href="/courses">
                    View All Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  "Standalone courses from R3,250",
                  "Combined flagship courses from R5,500",
                  "Live online classes with a trusted facilitator",
                  "Pathway to advanced study at universities and business schools",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-md">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mentoring & Coaching Teaser */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 space-y-4">
                {[
                  "Personalized guidance for study, career, and leadership decisions",
                  "One-on-one coaching to transform potential into performance",
                  "Led by an award-winning mentor and certified professional",
                  "Trusted by professionals now leading in banks, SANDF, Eskom, BMW, and more",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-teal-50 rounded-2xl p-4 shadow-md">
                    <Users className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                  MENTORING &amp; COACHING
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                  Guidance That Grows Your Career
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Beyond the classroom, Future Start offers dedicated mentoring and coaching — helping you make
                  smarter study, career, and leadership decisions, and turning potential into performance.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-bold rounded-full px-8 py-6 shadow-xl transform hover:scale-105 transition-all"
                  asChild
                >
                  <Link href="/mentoring-coaching">
                    Explore Mentoring &amp; Coaching <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Book Teaser */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                <BookOpen className="h-4 w-4" /> THE BOOK
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                Conquering Your Years in Tertiary Education
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A practical guide to academic excellence, written by an award-winning author — packed with strategies
                for study, leadership, and career success.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-full px-8 py-6 shadow-xl transform hover:scale-105 transition-all"
                asChild
              >
                <Link href="/book">
                  <GraduationCap className="mr-2 h-5 w-5" /> Get the Book
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-600 to-teal-700 text-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur px-6 py-2 rounded-full font-bold text-sm mb-4">
                VALUE PROPOSITION
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Why Choose Future Start Short Courses?</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">Excellence First</h3>
                <p className="text-white/90">
                  At Future Start, we are committed to Excellence, preparing every learner to lead with excellence in
                  their career and community.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">Trusted Expertise</h3>
                <p className="text-white/90">
                  Led by Mr. N. Mthethwa, an award-winning author, Career Mentor &amp; Coach, certified professional,
                  recognized facilitator and tutor in Operations &amp; Project Management.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">Premium Learning Experience</h3>
                <p className="text-white/90">
                  Live online classes with interactive discussions, case studies, and structured study material.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">FutureReady Skills</h3>
                <p className="text-white/90">
                  Courses integrate AI productivity fundamentals into management principles, preparing learners for
                  modern workplaces.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">Pathway to Higher Learning</h3>
                <p className="text-white/90">
                  Our short courses are designed to prepare students for advanced study at universities and business
                  schools, bridging the gap between graduate knowledge and professional programs.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">Professional Credibility</h3>
                <p className="text-white/90">
                  While currently non-accredited, our courses are aligned with Quality Council for Trades and
                  Occupations (QCTO) standards, ensuring relevance and credibility.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg rounded-full px-10 py-6 shadow-2xl transform hover:scale-105 transition-all"
                asChild
              >
                <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
