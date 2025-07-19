import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-white text-purple-600 font-bold">TS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Thabo S. 🎓</p>
              <p className="text-purple-100 text-sm">Engineering Student</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            "Yo, Future Start literally saved my life! 😅 They handled all my applications while I was stressing about
            finals. Got into my dream uni AND they helped me find the perfect place to stay! 🏠✨"
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-white text-blue-600 font-bold">LM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Lerato M. 💼</p>
              <p className="text-blue-100 text-sm">Business Student</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            "That book is FIRE! 🔥 Went from barely passing to getting distinctions in one semester! The strategies
            actually work and aren't just boring theory. My parents couldn't believe it! 📚🏆"
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-white text-green-600 font-bold">NK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Nomsa K. 🩺</p>
              <p className="text-green-100 text-sm">Medical Student</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            "Finding accommodation was my biggest stress! 😰 These guys found me the perfect place - safe, affordable,
            and my flatmates are amazing! Plus the mentoring is like having a wise older sibling! 🤗💕"
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-white text-orange-600 font-bold">JN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">John N. 💻</p>
              <p className="text-orange-100 text-sm">Computer Science Student</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            "Bro, the mentoring sessions are next level! 🚀 My mentor helped me navigate first year like a pro. Now I'm
            on track for cum laude and actually enjoying uni life! Best investment ever! 💯"
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-white text-pink-600 font-bold">ZM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Zanele M. ⚖️</p>
              <p className="text-pink-100 text-sm">Law Student</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            "These people are legends! 🙌 Saved me so much time and stress with applications. Their advice on course
            selection was spot on. Living my best uni life thanks to them! ✨🎓"
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarFallback className="bg-white text-teal-600 font-bold">BT</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Blessing T. 📚</p>
              <p className="text-teal-100 text-sm">Education Student</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            "The accommodation service is incredible! 🏡 Got a beautiful place within budget and the book is my uni
            bible! 📖 Can't recommend Future Start enough - they're the real MVPs! 👑"
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
