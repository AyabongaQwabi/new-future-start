import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, Award, Clock, Brain, Lightbulb } from "lucide-react"

export default function BookFeatures() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mt-8">
      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-3xl">
          <BookOpen className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">Complete Guide</CardTitle>
            <CardDescription className="text-green-50">A full roadmap for tertiary education</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            A structured, practical roadmap from first year to graduation — so you always know what to focus on next.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-t-3xl">
          <Award className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">Academic Excellence</CardTitle>
            <CardDescription className="text-teal-50">Strategies to graduate with distinction</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Proven strategies for achieving strong grades and standing out academically among your peers.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-3xl">
          <Clock className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">Time Management</CardTitle>
            <CardDescription className="text-emerald-50">
              Balance studies, work, and personal growth
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Practical techniques to manage your time effectively — without sacrificing results or wellbeing.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-3xl">
          <Brain className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">Study Techniques</CardTitle>
            <CardDescription className="text-green-50">Optimize your learning approach</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">Study methods that actually work, so you can learn more in less time.</p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-t-3xl">
          <Lightbulb className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">Avoiding Pitfalls</CardTitle>
            <CardDescription className="text-teal-50">Navigate common challenges successfully</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">Learn from common mistakes so you can avoid them on your own journey.</p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-lg border-0 hover:shadow-xl transform hover:scale-105 transition-all">
        <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-green-700 to-teal-700 text-white rounded-t-3xl">
          <GraduationCap className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg font-bold">Career Preparation</CardTitle>
            <CardDescription className="text-green-50">Set yourself up for post-graduation success</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Insider guidance on internships and job hunting to prepare you for the world of work.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
