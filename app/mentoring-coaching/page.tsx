import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, Compass, Target, Users } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const REGISTER_URL = "https://forms.cloud.microsoft/r/ZSsDf4MLM5"

export const metadata: Metadata = {
  title: "Mentoring & Coaching",
  description:
    "Personalized mentoring and coaching from Future Start — guiding learners to smarter study, career, and leadership decisions.",
}

export default function MentoringCoachingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-teal-50 to-green-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                MENTORING &amp; COACHING
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                Guidance to Lead With Excellence
              </h1>
              <p className="text-xl text-gray-600">
                Personalized mentoring and coaching that transforms potential into performance, and performance into
                leadership.
              </p>
              <div className="pt-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-bold text-lg rounded-full px-10 py-6 shadow-xl transform hover:scale-105 transition-all"
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

        {/* What we offer */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                Mentoring and Coaching, Side by Side
              </h2>
              <p className="text-lg text-gray-600">
                We prepare our learners through two complementary forms of personalized support.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-teal-50 rounded-3xl p-8 border-l-4 border-teal-500">
                <Compass className="h-10 w-10 text-teal-600 mb-4" />
                <h3 className="font-bold text-2xl mb-3 text-slate-900">Mentoring</h3>
                <p className="text-gray-700 text-lg">
                  Guiding individuals to make smarter study, career, and leadership decisions — drawing on real
                  experience to help you avoid common pitfalls and move forward with clarity.
                </p>
              </div>
              <div className="bg-green-50 rounded-3xl p-8 border-l-4 border-green-500">
                <Target className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="font-bold text-2xl mb-3 text-slate-900">Coaching</h3>
                <p className="text-gray-700 text-lg">
                  Empowering learners with personalized support to transform potential into performance, and
                  performance into leadership — with practical accountability every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-600 to-teal-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Trusted, Proven Guidance</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 flex items-start gap-4">
                <Award className="h-8 w-8 flex-shrink-0" />
                <p className="text-white/90">
                  Led by Mr. N. Mthethwa, an award-winning author, Career Mentor &amp; Coach, certified professional,
                  and recognized facilitator and tutor in Operations &amp; Project Management.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 flex items-start gap-4">
                <Users className="h-8 w-8 flex-shrink-0" />
                <p className="text-white/90">
                  He has successfully tutored students who are now professionals and leaders in banks, SANDF, Eskom,
                  Heineken, BMW, Discovery, National Skills Fund, and many other institutions.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 flex items-start gap-4">
                <CheckCircle className="h-8 w-8 flex-shrink-0" />
                <p className="text-white/90">
                  Over 300 graduates have been mentored into successful careers through Future Start's guidance.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 flex items-start gap-4">
                <Target className="h-8 w-8 flex-shrink-0" />
                <p className="text-white/90">
                  We connect motivated graduates with business schools and recruitment companies, bridging talent
                  with bursaries, advanced qualifications, and career opportunities.
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
