import type { Metadata } from "next"
import Image from "next/image"
import BookFeatures from "@/components/book-features"
import BookPurchaseButton from "@/components/book-purchase-button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "The Book",
  description:
    "Conquering Your Years in Tertiary Education — a practical guide to academic excellence from Future Start.",
}

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                THE BOOK
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                Conquering Your Years in Tertiary Education
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A practical guide to academic excellence, written by an award-winning author with a track record of
                mentoring students into successful careers.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-30" />
                  <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-12%20at%2017.05.34%20%281%29-yBtNh1NUBvbSDKOqgO7gkxTrtle6uc.jpeg"
                      alt="Conquering Your Years in Tertiary Education Book"
                      width={400}
                      height={500}
                      className="rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
              <BookFeatures />
            </div>

            <div className="text-center mt-12">
              <BookPurchaseButton />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
