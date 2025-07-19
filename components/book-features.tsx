import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, Award, Clock, Brain, Lightbulb } from "lucide-react"

export default function BookFeatures() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mt-8">
      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-3xl">
          <BookOpen className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">📖 Complete Guide</CardTitle>
            <CardDescription className="text-purple-100">Everything you need to know about uni life</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Your complete roadmap from day one to graduation day! No more guessing - we've got you covered! 🗺️✨
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-3xl">
          <Award className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">🏆 Academic Excellence</CardTitle>
            <CardDescription className="text-blue-100">Strategies to graduate with Cum Laude</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Learn the secrets to crushing your grades and standing out from the crowd! 💪📚
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-3xl">
          <Clock className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">⏰ Time Management</CardTitle>
            <CardDescription className="text-green-100">
              Balance studies, social life, and personal growth
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Master the art of having it all - great grades AND an amazing social life! 🎉📅
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-3xl">
          <Brain className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">🧠 Study Techniques</CardTitle>
            <CardDescription className="text-orange-100">Optimize your learning approach</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">Discover study hacks that actually work - no more all-nighters! 🌙➡️☀️</p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-3xl">
          <Lightbulb className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">💡 Avoiding Pitfalls</CardTitle>
            <CardDescription className="text-pink-100">Navigate common challenges successfully</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">Learn from others' mistakes so you don't have to make them yourself! 🚫❌</p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-3xl">
          <GraduationCap className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">🎓 Career Prep</CardTitle>
            <CardDescription className="text-teal-100">Set yourself up for post-graduation success</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Get ready for the real world with insider tips on internships and job hunting! 💼🚀
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
