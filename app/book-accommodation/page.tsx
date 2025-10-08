"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { AccommodationBooking } from "@/types/accommodation"
import { PROVINCES, UNIVERSITIES, STUDY_LEVELS } from "@/types/accommodation"

export default function BookAccommodationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [bookingReference, setBookingReference] = useState<string>("")

  const [formData, setFormData] = useState<AccommodationBooking>({
    name: "",
    surname: "",
    gender: "Male",
    idNumber: "",
    phoneNumber1: "",
    phoneNumber2: "",
    whatsappPhoneNumber: "",
    emailAddress1: "",
    emailAddress2: "",
    residenceProvince: "",
    studyProvince: "",
    universityCollege: "",
    customUniversity: "",
    intendedCourse: "",
    levelOfStudy: "",
    preferredCommunication: "WhatsApp",
    funding: "NSFAS",
    hasSpecialNeeds: false,
    specialNeedsDescription: "",
    additionalComments: "",
  })

  const handleInputChange = (field: keyof AccommodationBooking, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.surname.trim()) {
      setError("Surname is required")
      return false
    }
    if (!formData.idNumber.trim()) {
      setError("ID Number is required")
      return false
    }
    if (!formData.phoneNumber1.trim()) {
      setError("Phone Number 1 is required")
      return false
    }
    if (!formData.whatsappPhoneNumber.trim()) {
      setError("WhatsApp Phone Number is required")
      return false
    }
    if (!formData.emailAddress1.trim()) {
      setError("Email Address 1 is required")
      return false
    }
    if (!formData.residenceProvince) {
      setError("Residence Province is required")
      return false
    }
    if (!formData.studyProvince) {
      setError("Study Province is required")
      return false
    }
    if (!formData.universityCollege) {
      setError("University/College is required")
      return false
    }
    if (formData.universityCollege === "Other" && !formData.customUniversity?.trim()) {
      setError("Please specify your university/college name")
      return false
    }
    if (!formData.intendedCourse.trim()) {
      setError("Intended Course is required")
      return false
    }
    if (!formData.levelOfStudy) {
      setError("Level of Study is required")
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.emailAddress1)) {
      setError("Please enter a valid email address")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/book-accommodation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSuccess(true)
        setBookingReference(result.bookingReference)
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setError(result.error || "Failed to submit booking")
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full p-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-3xl font-black">🎉 Booking Submitted Successfully!</CardTitle>
              <CardDescription className="text-white/90 text-lg">Thank you for choosing Future Start</CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-6">
              {bookingReference && (
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <p className="text-sm text-green-700 font-medium">Your Booking Reference</p>
                  <p className="text-2xl font-black text-green-800 mt-1">{bookingReference}</p>
                  <p className="text-xs text-green-600 mt-1">Please save this reference number for your records</p>
                </div>
              )}
              <p className="text-lg text-gray-700">
                We've received your accommodation booking request! Our team will review your information and contact you
                within 24-48 hours via your preferred communication method.
              </p>
              <div className="bg-blue-50 p-6 rounded-2xl">
                <p className="font-bold text-blue-800 mb-2">📧 What's Next?</p>
                <ul className="text-left text-blue-700 space-y-2">
                  <li>✅ Check your email for a confirmation message</li>
                  <li>✅ Our team will contact you to discuss accommodation options</li>
                  <li>✅ We'll help you find the perfect place near your campus</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-full"
                  asChild
                >
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" className="font-bold" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-black">🏠 Book Accommodation Services</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Let us help you find your perfect student home
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-green-500 pb-2">
                  📋 Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      value={formData.surname}
                      onChange={(e) => handleInputChange("surname", e.target.value)}
                      placeholder="Enter your surname"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    placeholder="Enter your ID number"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                  📞 Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber1">Phone Number 1 *</Label>
                    <Input
                      id="phoneNumber1"
                      type="tel"
                      value={formData.phoneNumber1}
                      onChange={(e) => handleInputChange("phoneNumber1", e.target.value)}
                      placeholder="+27 12 345 6789"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber2">Phone Number 2</Label>
                    <Input
                      id="phoneNumber2"
                      type="tel"
                      value={formData.phoneNumber2}
                      onChange={(e) => handleInputChange("phoneNumber2", e.target.value)}
                      placeholder="+27 12 345 6789"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="whatsappPhoneNumber">WhatsApp Phone Number *</Label>
                  <Input
                    id="whatsappPhoneNumber"
                    type="tel"
                    value={formData.whatsappPhoneNumber}
                    onChange={(e) => handleInputChange("whatsappPhoneNumber", e.target.value)}
                    placeholder="+27 12 345 6789"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emailAddress1">Email Address 1 *</Label>
                    <Input
                      id="emailAddress1"
                      type="email"
                      value={formData.emailAddress1}
                      onChange={(e) => handleInputChange("emailAddress1", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailAddress2">Email Address 2</Label>
                    <Input
                      id="emailAddress2"
                      type="email"
                      value={formData.emailAddress2}
                      onChange={(e) => handleInputChange("emailAddress2", e.target.value)}
                      placeholder="alternate@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Study Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-purple-500 pb-2">
                  🎓 Location & Study Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="residenceProvince">Residence Province *</Label>
                    <Select
                      value={formData.residenceProvince}
                      onValueChange={(value) => handleInputChange("residenceProvince", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="studyProvince">Study Province *</Label>
                    <Select
                      value={formData.studyProvince}
                      onValueChange={(value) => handleInputChange("studyProvince", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="universityCollege">University/College of Study *</Label>
                  <Select
                    value={formData.universityCollege}
                    onValueChange={(value) => handleInputChange("universityCollege", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select university/college" />
                    </SelectTrigger>
                    <SelectContent>
                      {UNIVERSITIES.map((uni) => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                      <SelectItem key="Other" value="Other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.universityCollege === "Other" && (
                  <div>
                    <Label htmlFor="customUniversity">Please specify your University/College *</Label>
                    <Input
                      id="customUniversity"
                      value={formData.customUniversity}
                      onChange={(e) => handleInputChange("customUniversity", e.target.value)}
                      placeholder="Enter your university/college name"
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="intendedCourse">Intended Course of Study or Studying *</Label>
                  <Input
                    id="intendedCourse"
                    value={formData.intendedCourse}
                    onChange={(e) => handleInputChange("intendedCourse", e.target.value)}
                    placeholder="e.g., Computer Science, Medicine, Engineering"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="levelOfStudy">Level of Study *</Label>
                  <Select
                    value={formData.levelOfStudy}
                    onValueChange={(value) => handleInputChange("levelOfStudy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {STUDY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Communication & Funding */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
                  💬 Communication & Funding
                </h3>

                <div>
                  <Label>Preferred Method of Communication *</Label>
                  <RadioGroup
                    value={formData.preferredCommunication}
                    onValueChange={(value) => handleInputChange("preferredCommunication", value)}
                    className="flex flex-col gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="WhatsApp" id="whatsapp" />
                      <Label htmlFor="whatsapp" className="cursor-pointer">
                        WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Call" id="call" />
                      <Label htmlFor="call" className="cursor-pointer">
                        Call
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Email" id="email" />
                      <Label htmlFor="email" className="cursor-pointer">
                        Email
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Funding *</Label>
                  <RadioGroup
                    value={formData.funding}
                    onValueChange={(value) => handleInputChange("funding", value)}
                    className="flex flex-col gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NSFAS" id="nsfas" />
                      <Label htmlFor="nsfas" className="cursor-pointer">
                        NSFAS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Bursary" id="bursary" />
                      <Label htmlFor="bursary" className="cursor-pointer">
                        Bursary
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Self-Funded" id="self-funded" />
                      <Label htmlFor="self-funded" className="cursor-pointer">
                        Self-Funded
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Special Needs */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-pink-500 pb-2">♿ Special Needs</h3>

                <div>
                  <Label>Special Needs (If Disabled) *</Label>
                  <RadioGroup
                    value={formData.hasSpecialNeeds ? "Yes" : "No"}
                    onValueChange={(value) => handleInputChange("hasSpecialNeeds", value === "Yes")}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="special-yes" />
                      <Label htmlFor="special-yes" className="cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="special-no" />
                      <Label htmlFor="special-no" className="cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasSpecialNeeds && (
                  <div>
                    <Label htmlFor="specialNeedsDescription">Special Needs (Describe)</Label>
                    <Textarea
                      id="specialNeedsDescription"
                      value={formData.specialNeedsDescription}
                      onChange={(e) => handleInputChange("specialNeedsDescription", e.target.value)}
                      placeholder="Please describe your special needs"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* Additional Comments */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-2">
                  💭 Additional Information
                </h3>

                <div>
                  <Label htmlFor="additionalComments">Any additional comments or requests?</Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                    placeholder="Share any additional information that might help us serve you better"
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg py-6 rounded-full shadow-lg"
                >
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Home className="mr-2 h-5 w-5" />
                      Submit Accommodation Booking
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-sm text-gray-600">* Required fields</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
