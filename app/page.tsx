import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Send, Users, ArrowRight, CheckCircle, Star, Heart } from "lucide-react"
import Testimonials from "@/components/testimonials"
import BookFeatures from "@/components/book-features"
import BookPurchaseButton from "@/components/book-purchase-button"
import CheckoutStatus from "@/components/checkout-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Suspense fallback={null}>
        <CheckoutStatus />
      </Suspense>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2020.11.24-aiRSvS4nTzPtzOlvrrO8NPFtkZKU0Y.jpeg"
              alt="Future Start Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#home"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              🏠 Home
            </a>
            <a
              href="#services"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              ✨ Services
            </a>
            <a
              href="#testimonials"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              💬 Reviews
            </a>
            <a
              href="#book"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              📚 The Book
            </a>
            <Link
              href="/track"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              📦 Track Order
            </Link>
            <Link
              href="/promo-codes"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              🎫 Promo Codes
            </Link>
            <a
              href="#contact"
              className="text-sm font-bold transition-colors hover:text-purple-600 hover:scale-105 transform"
            >
              📞 Contact
            </a>
          </nav>
          <div className="flex gap-2">
            <BookPurchaseButton
              amount={29900} // R299.00 in cents
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🛒 Buy Book
            </BookPurchaseButton>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Green and White Theme */}
        <section
          id="home"
          className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-green-50 to-green-100 relative overflow-hidden"
        >
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎓</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-300">🚀</div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter"
                style={{
                  fontFamily: '"Cambria Math", "Angsana New", "Times New Roman", serif',
                }}
              >
                <span className="text-red-600">Future</span> <span className="text-green-600">Start</span>
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-600 font-bold mb-6"
                style={{
                  fontFamily: '"Cambria Math", "Angsana New", "Times New Roman", serif',
                }}
              >
                Let your Future start with us 🌟
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold text-lg rounded-full px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
                  asChild
                >
                  <Link href="/book-accommodation">🏠 Book Accommodation</Link>
                </Button>
                <BookPurchaseButton
                  amount={29900} // R299.00 in cents
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
                >
                  🎯 Get Your Copy
                </BookPurchaseButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-green-600 text-green-600 hover:bg-green-50 font-bold rounded-full px-8 py-4 bg-transparent"
                  asChild
                >
                  <Link href="#services">
                    🔥 Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Message with Image - Chat Style */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-1 rounded-2xl inline-block">
                  <div className="bg-white text-purple-600 px-4 py-2 rounded-xl font-bold">
                    👋 Hey there, future student!
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-purple-500">
                  <h2 className="text-3xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome to Future Start ✨
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p className="bg-purple-50 p-4 rounded-2xl border-l-4 border-purple-400">
                      <strong>🎯 Stressed about uni applications?</strong> We've got your back! We handle the entire
                      application process so you can focus on what matters most - your studies and having fun! 📚✨
                    </p>
                    <p className="bg-pink-50 p-4 rounded-2xl border-l-4 border-pink-400">
                      <strong>🚀 Want to absolutely crush it at uni?</strong> Our mentoring programs are like having a
                      super smart older sibling who's been there, done that, and got the cum laude to prove it! Based on
                      our bestselling book by a top academic achiever 📖🏆
                    </p>
                    <p className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-400">
                      <strong>🏠 Need a place to crash near campus?</strong> We'll hook you up with safe, affordable
                      accommodation that doesn't suck. No more living in your car or that sketchy place your cousin
                      found! 🛏️🔑
                    </p>
                  </div>
                  <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-2xl">
                    <p className="font-bold text-center text-gray-800">
                      🎉 Your success is literally our obsession! 🎉
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Happy diverse students celebrating success"
                    width={600}
                    height={600}
                    className="relative rounded-3xl shadow-2xl object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black p-2 rounded-full font-bold text-sm">
                    🔥 Vibes!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Benefits - Card Style */}
        <section className="w-full py-8 md:py-12 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">🎯 Expert Guidance</h3>
                    <p className="text-purple-100 text-sm">Written by someone who actually made it</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">✨ Proven Strategies</h3>
                    <p className="text-pink-100 text-sm">Techniques that actually work (not just theory)</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">🤝 Full Support</h3>
                    <p className="text-blue-100 text-sm">From application to graduation (we're with you!)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Modern Cards */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                🔥 OUR SERVICES
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                We've Got You Covered! 🎯
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to absolutely crush your uni journey - from getting in to graduating with honors! 🚀
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Student working on application"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-xl font-bold">📝 Let's Apply For You</CardTitle>
                  <CardDescription className="text-blue-100">We handle the entire application process</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">
                    Chill while we handle all the boring paperwork! ✨ From finding the perfect uni to submitting
                    everything on time - we've got this! 🎯
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-full"
                    asChild
                  >
                    <a href="https://forms.gle/H3ByufVPG5DrPFik7" target="_blank" rel="noopener noreferrer">
                      🚀 Let's Do This!
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Expert mentoring session"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                  <CardTitle className="text-xl font-bold">🧠 Expert Advice</CardTitle>
                  <CardDescription className="text-pink-100">Personalized mentoring and coaching</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">
                    Get that big sibling energy! 💪 Our mentors are like having a cheat code for uni success - they've
                    been there and crushed it! 🏆
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full"
                    asChild
                  >
                    <a href="https://forms.gle/gzUZerF5dnetQGkK7" target="_blank" rel="noopener noreferrer">
                      💡 Get Mentored!
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Modern student accommodation"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  <CardTitle className="text-xl font-bold">🏠 Accommodation Services</CardTitle>
                  <CardDescription className="text-green-100">Find your perfect student home</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">
                    No more sketchy places! 🙅‍♀️ We'll find you a safe, affordable spot that's actually cool to live in
                    near your campus! 🔑
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-full"
                    asChild
                  >
                    <Link href="/book-accommodation">🏡 Book Accommodation!</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SASEA Section - Student Excellence Awards */}
        <section id="sasea" className="w-full py-12 md:py-24 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                🌟 SOUTH AFRICAN STUDENT EXCELLENCE AWARDS
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent mb-4">
                Calling All Student Achievers!
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The South African Student Excellence Awards (SASEA) is your chance to be recognised nationally —
                whether in Academics, Leadership, Entrepreneurship, Sport, Arts, Music, Content Creation, Modelling,
                Broadcasting, or Innovation. Open to High Schools, Colleges/FETs/TVETs and Universities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-8"
                asChild
              >
                <a href="https://forms.gle/iB26NMnwpW6ntRED6" target="_blank" rel="noopener noreferrer">
                  👉 Nominate Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-green-600 text-green-700 hover:bg-green-50 font-bold rounded-full px-8"
                asChild
              >
                <Link href="/sasea">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mid-page CTA - Bold and Fun */}
        <section className="w-full py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-4 left-4 text-4xl animate-spin">⭐</div>
          <div className="absolute bottom-4 right-4 text-3xl animate-bounce">🎉</div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Don't Go Through Uni Alone! 🤝</h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Join thousands of students who are absolutely crushing it with our help! 🚀✨
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg rounded-full px-8 py-4 shadow-xl"
                  asChild
                >
                  <Link href="#contact">💬 Let's Chat!</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 font-bold text-lg rounded-full px-8 py-4 bg-transparent"
                  asChild
                >
                  <Link href="#services">🔥 See All Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Social Media Style */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                💬 STUDENT REVIEWS
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                The Receipts Are In! 📸
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real students, real results, real talk! 💯 Check out what your future classmates are saying about us! 🎓
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Successful graduates celebrating"
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl p-3">
                  <p className="font-bold text-sm">🎉 Graduation Day Vibes!</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Students studying together"
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl p-3">
                  <p className="font-bold text-sm">📚 Study Squad Goals!</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Students in modern campus"
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl p-3">
                  <p className="font-bold text-sm">🏫 Campus Life!</p>
                </div>
              </div>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Book Section - Instagram Story Style */}
        <section id="book" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                📚 THE BOOK
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
                Your Uni Survival Guide! 📖
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The ultimate cheat sheet for crushing uni life! Written by someone who actually did it and got the cum
                laude to prove it! 🏆✨
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-30 animate-pulse"></div>
                  <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-12%20at%2017.05.34%20%281%29-yBtNh1NUBvbSDKOqgO7gkxTrtle6uc.jpeg"
                      alt="Conquering Your Years in Tertiary Education Book"
                      width={400}
                      height={500}
                      className="rounded-2xl shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full text-sm font-bold animate-bounce">
                      🔥 HOT!
                    </div>
                  </div>
                </div>
              </div>
              <BookFeatures />
            </div>

            <div className="text-center mt-12">
              <BookPurchaseButton
                amount={29900} // R299.00 in cents
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-xl rounded-full px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              >
                🛒 Get Your Copy Now!
              </BookPurchaseButton>
            </div>
          </div>
        </section>

        {/* Contact Section - Chat App Style */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                    💬 LET'S CHAT
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    Slide Into Our DMs! 📱
                  </h2>
                  <p className="text-xl text-gray-600">
                    Got questions? Need help? Just want to chat about uni life? We're here for it! 💯
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Send className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold">📧 Email Us</p>
                        <p className="text-gray-600">majork.n07@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-blue-500">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold">📱 Follow Us</p>
                        <p className="text-gray-600">@conqueringtertiary</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Modern university campus"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl p-3">
                    <p className="font-bold text-sm">🏫 Your Future Campus!</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Ready to Connect? 🚀
                    </h3>
                    <p className="text-gray-600">Hit us up and let's make your uni dreams happen!</p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                      asChild
                    >
                      <a href="mailto:majork.n07@gmail.com">
                        <Send className="mr-2 h-6 w-6" /> 📧 Email Us Now!
                      </a>
                    </Button>

                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-full py-6 shadow-lg"
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
                        💬 WhatsApp: +27 72 041 9723
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-4 text-gray-800">Follow Us on Social Media! 📱</h4>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                    asChild
                  >
                    <a
                      href="https://whatsapp.com/channel/0029VbBVlOr9WtCC1ab9Bv11"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-2 h-6 w-6"
                      >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z" />
                      </svg>
                      📢 Join Our WhatsApp Channel
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                    asChild
                  >
                    <a
                      href="https://www.tiktok.com/@officialfuturesta?_t=ZM-8xpeEQLgsvV&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-2 h-6 w-6"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      🎵 Follow Us on TikTok
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-bold text-lg rounded-full py-6 shadow-lg"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/official_futurestart1/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-2 h-6 w-6"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-.645-1.439-1.44z" />
                      </svg>
                      📸 Follow Us on Instagram
                    </a>
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎉</div>
                    <h4 className="font-bold text-lg mb-2">Ready to Start Your Journey?</h4>
                    <p className="text-purple-100 text-sm">
                      Join thousands of students who are already winning at uni life! Your future self will thank you!
                      🙌
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Minimal and Modern */}
      <footer className="w-full bg-gray-900 text-white py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            © 2025 Future Start. Made with 💜 for students who want to win at life!
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm font-medium transition-colors hover:text-purple-400">
              📋 Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-purple-400">
              🔒 Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
