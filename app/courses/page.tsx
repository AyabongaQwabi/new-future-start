import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Star } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const REGISTER_URL = "https://forms.cloud.microsoft/r/ZSsDf4MLM5"

export const metadata: Metadata = {
  title: "Courses",
  description:
    "FutureReady short courses in operations, project management, cost management, entrepreneurship, statistics, supply chain, and business management.",
}

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Courses Offered */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                OUR COURSES
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">About the Courses</h1>
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
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Standalone Courses</h2>
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
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Combined Flagship Courses</h2>
                <p className="text-green-700 font-bold mb-6">R5,500 each</p>
                <ul className="space-y-4">
                  {[
                    "Operations & Project Management Essentials",
                    "Cost Accounting & Statistics for Management",
                    "Supply Chain & Business Management Essentials",
                  ].map((course) => (
                    <li
                      key={course}
                      className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-md border-2 border-green-200"
                    >
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
                    <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                      Register Now <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Attend */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
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

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-lg rounded-full px-10 py-6 shadow-xl transform hover:scale-105 transition-all"
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
