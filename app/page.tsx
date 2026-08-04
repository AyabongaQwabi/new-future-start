import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Send, Users, ArrowRight, CheckCircle, Star } from "lucide-react"
import CheckoutStatus from "@/components/checkout-status"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Suspense fallback={null}>
        <CheckoutStatus />
      </Suspense>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/newlogo.png"
              alt="Future Start Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#home"
              className="text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform"
            >
              About
            </a>
            <a
              href="#courses"
              className="text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform"
            >
              Courses
            </a>
            <a
              href="#who-should-attend"
              className="text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform"
            >
              Who Should Attend
            </a>
            <a
              href="#value"
              className="text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform"
            >
              Why Us
            </a>
            <a
              href="#contact"
              className="text-sm font-bold transition-colors hover:text-green-600 hover:scale-105 transform"
            >
              Contact
            </a>
          </nav>
          <div className="flex gap-2">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <a href="#courses">Get Started</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden bg-[url('/marble-bg.jpg')] bg-cover bg-center bg-gray-100"
        >
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute top-10 right-10 text-5xl animate-pulse">✨</div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-full font-bold text-sm md:text-base mb-6 shadow-lg">
                🌟 FUTURE START EXCELLENCE ACADEMY
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
                FutureReady Short Courses for Unemployed Youth and Graduates, Entrepreneurs &amp; Professionals
              </h1>
              <p className="text-lg md:text-xl text-gray-800 font-medium mb-8 leading-relaxed">
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
                  <a href="#courses">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Future Start */}
        <section id="about" className="w-full py-16 md:py-24 bg-white">
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
                on discipline, academic excellence, and a belief that education should lead to opportunity. Our
                service offerings include short courses in operations, project management, cost management,
                entrepreneurship, statistics, supply chain, and business management, as well as combined flagship
                programs for deeper learning. Beyond training, we connect motivated graduates with business schools
                and recruitment companies, bridging talent with bursaries, advanced qualifications, and career
                opportunities. With over 300 graduates mentored into successful careers, our mission is clear: to
                transform potential into performance, and performance into leadership, empowering learners to thrive
                globally with excellence.
              </p>

              <p>
                Learn practical skills in management, operations, and productivity taught live online by a trusted
                facilitator, preparing you for advanced study at universities and business schools. At Future Start,
                we are all about Excellence — preparing everyone to lead with excellence in their careers,
                businesses, and communities. Designed for graduates, unemployed youth, employees, aspiring project
                managers, professionals, and entrepreneurs who want market-ready skills to boost employability,
                workplace productivity, and leadership effectiveness.
              </p>

              <p className="text-xl font-bold text-green-700 text-center pt-2">Enrol today and lead with excellence!</p>
            </div>
          </div>
        </section>

        {/* Courses Offered */}
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                OUR COURSES
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">About the Courses</h2>
              <p className="text-lg text-gray-600">
                Our short courses provide structured theory, practical insights, and AI productivity fundamentals in
                live online classes. They are ideal for:
              </p>
              <ul className="text-gray-600 text-lg mt-4 space-y-1">
                <li>Graduates seeking career-ready knowledge</li>
                <li>Professionals wanting to upskill quickly</li>
                <li>Businesses investing in staff development</li>
              </ul>
              <p className="text-sm text-gray-500 italic mt-4">
                Note: Courses are currently non-accredited while alignment with the Quality Council for Trades and
                Occupations (QCTO) is in progress.
              </p>
              <p className="text-base font-semibold text-green-700 mt-4">
                AI productivity fundamentals are covered in every course.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Standalone Courses</h3>
                <p className="text-green-700 font-bold mb-6">R3,250 each</p>
                <ul className="space-y-4">
                  {[
                    "Introduction to Operations Management",
                    "Introduction to Project Management",
                    "Cost Management for Operations & Projects",
                    "Fundamentals of Entrepreneurship & Productivity in the Age of Artificial Intelligence (AI)",
                    "Statistics for Operations & Project Management",
                    "Introduction to Supply Chain Management",
                    "Introduction to Business Management",
                  ].map((course) => (
                    <li key={course} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-md">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Combined Flagship Courses</h3>
                <p className="text-green-700 font-bold mb-6">R5,500 each</p>
                <ul className="space-y-4">
                  {[
                    "Operations & Project Management Essentials",
                    "Cost Accounting & Statistics for Management",
                    "Supply Chain & Business Management Essentials",
                  ].map((course) => (
                    <li key={course} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-md border-2 border-green-200">
                      <Star className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{course}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-lg rounded-full px-10 py-6 shadow-xl transform hover:scale-105 transition-all"
                    asChild
                  >
                    <a href="#contact">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Attend */}
        <section id="who-should-attend" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                IS THIS FOR YOU?
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Who Should Attend?</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {[
                "Unemployed youth & graduates who want market-ready operations and project skills to strengthen their CVs and improve employability.",
                "Employees in any sector who want to become more productive and effective by applying operations management techniques and basic AI tools in the workplace.",
                "Aspiring project managers who need a solid foundation in project concepts, cost management, and basic statistics for better decision-making.",
                "Engineering, IT, and business graduates entering project-based environments and needing practical tools for planning, budgeting, reporting, and automation.",
                "Operations, admin, and coordination professionals who work with projects, processes, and performance metrics and want to optimise their workflows.",
                "Entrepreneurs and team leaders who manage projects and teams and want to use operations thinking and AI to improve efficiency and control costs.",
                "Individuals planning advanced diplomas in Project Management or Operations Management, using this as a practical bridging course.",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3 bg-gray-50 rounded-2xl p-5 shadow-sm">
                  <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section id="value" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-600 to-teal-700 text-white relative overflow-hidden">
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
                  Led by Mr. N. Mthethwa, an award-winning author, Career Mentor & Coach, certified professional,
                  recognized facilitator and tutor in Operations & Project Management. He has successfully tutored
                  students who are now professionals and leaders in banks, SANDF, Eskom, Heineken, BMW, Discovery,
                  National Skills Fund, and many other public and private institutions.
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
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                LET'S TALK
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                Ready to Lead with Excellence?
              </h2>
              <p className="text-xl text-gray-600">
                Enrol today, or reach out with any questions about our courses, mentoring, and coaching programs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Send className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">Email Us</p>
                    <p className="text-gray-600">majork.n07@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-teal-500">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-bold">Follow Us</p>
                    <p className="text-gray-600">@officialfuturesta</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-8 space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                asChild
              >
                <a href="mailto:majork.n07@gmail.com">
                  <Send className="mr-2 h-6 w-6" /> Email Us Now
                </a>
              </Button>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                asChild
              >
                <a href="https://wa.me/27720419723" target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z" />
                  </svg>
                  WhatsApp: +27 72 041 9723
                </a>
              </Button>

              <div className="grid gap-4 sm:grid-cols-3 pt-4">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-full py-6 shadow-lg"
                  asChild
                >
                  <a
                    href="https://whatsapp.com/channel/0029VbBVlOr9WtCC1ab9Bv11"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Channel
                  </a>
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold rounded-full py-6 shadow-lg"
                  asChild
                >
                  <a
                    href="https://www.tiktok.com/@officialfuturesta?_t=ZM-8xpeEQLgsvV&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-bold rounded-full py-6 shadow-lg"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/official_futurestart1/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </Button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-3xl shadow-xl text-center">
              <h4 className="font-bold text-lg mb-2">Ready to Start Your Journey?</h4>
              <p className="text-green-50 text-sm">
                Join over 300 graduates who have already been mentored into successful careers. Enrol today and lead
                with excellence!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Minimal and Modern */}
      <footer className="w-full bg-gray-900 text-white py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            © 2026 Future Start Excellence Academy. Transforming potential into leadership excellence.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm font-medium transition-colors hover:text-green-400">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-green-400">
              Privacy
            </Link>
            <Link href="/about-developer" className="text-sm font-medium transition-colors hover:text-green-400">
              <small style={{ color: "#3c4557" }}>About the developer</small>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
