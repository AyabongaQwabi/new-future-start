import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mt-8">
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Let's Apply For You</CardTitle>
          <CardDescription>We handle the entire application process</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            Applying for acceptance to university or college is often overwhelming and stressful. We eliminate this
            stress by managing the entire application process on your behalf, from researching universities to
            submitting applications.
          </p>
          <Button variant="outline" className="w-full mt-auto" asChild>
            <Link href="/services/apply-for-you">Learn More</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Expert Advice</CardTitle>
          <CardDescription>Personalized mentoring and coaching</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            We provide specialized mentoring and coaching programs tailored to each student's needs, helping them thrive
            both academically and personally. Our guidance is inspired by the principles outlined in "Conquering Your
            Years in Tertiary Education."
          </p>
          <Button variant="outline" className="w-full mt-auto" asChild>
            <Link href="/services/expert-advice">Learn More</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Home className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Accommodation Services</CardTitle>
          <CardDescription>Find suitable student housing</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            We connect students with safe, comfortable, and affordable accommodation options, making their transition to
            university seamless and stress-free. Our dedicated team ensures students are never stranded or forced into
            inadequate housing.
          </p>
          <Button variant="outline" className="w-full mt-auto" asChild>
            <Link href="/services/accommodation">Learn More</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
