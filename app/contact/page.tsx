import type { Metadata } from "next"
import { Send, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const REGISTER_URL = "https://forms.gle/Qv6cVnNNx3PFrGZD8"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Future Start Excellence Academy about courses, mentoring, and coaching programs.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                LET'S TALK
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                Ready to Get Started?
              </h1>
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
                    <p className="text-gray-600">programmes@futurestart.co.za</p>
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
                <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                asChild
              >
                <a href="mailto:programmes@futurestart.co.za">
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
              <h2 className="font-bold text-lg mb-2">Ready to Start Your Journey?</h2>
              <p className="text-green-50 text-sm">
                Join over 300 graduates who have already been mentored into successful careers. Enrol today and take
                the next step in your career.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
