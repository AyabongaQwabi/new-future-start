import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase not configured - missing environment variables")
      return NextResponse.json(
        {
          error: "Service temporarily unavailable",
          details: "Database connection not available. Please contact support.",
        },
        { status: 503 },
      )
    }

    const body = await request.json()
    console.log("Received accommodation booking request")

    const {
      // Personal Information
      name,
      surname,
      gender,
      idNumber,
      phoneNumber1,
      phoneNumber2,
      whatsappPhoneNumber,
      emailAddress1,
      emailAddress2,

      // Location Information
      residenceProvince,
      studyProvince,
      universityCollege,
      customUniversity,
      intendedCourse,
      levelOfStudy,

      // Communication & Funding
      preferredCommunication,
      funding,

      // Special Needs
      hasSpecialNeeds,
      specialNeedsDescription,

      // Additional Information
      additionalComments,
    } = body

    // Validate required fields
    if (!name || !surname || !emailAddress1 || !phoneNumber1) {
      return NextResponse.json(
        { error: "Missing required information", details: "Name, surname, email, and phone are required" },
        { status: 400 },
      )
    }

    if (!idNumber || !whatsappPhoneNumber) {
      return NextResponse.json(
        { error: "Missing required information", details: "ID number and WhatsApp phone number are required" },
        { status: 400 },
      )
    }

    if (!universityCollege || !intendedCourse || !levelOfStudy) {
      return NextResponse.json(
        {
          error: "Missing study information",
          details: "University/college, intended course, and level of study are required",
        },
        { status: 400 },
      )
    }

    if (universityCollege === "Other" && !customUniversity?.trim()) {
      return NextResponse.json(
        { error: "Missing university information", details: "Please specify your university/college name" },
        { status: 400 },
      )
    }

    if (!residenceProvince || !studyProvince) {
      return NextResponse.json(
        { error: "Missing location information", details: "Residence and study provinces are required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailAddress1)) {
      return NextResponse.json(
        { error: "Invalid email", details: "Please provide a valid email address" },
        { status: 400 },
      )
    }

    // Generate booking reference number
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const randomSuffix = Math.random().toString(36).substr(2, 6).toUpperCase()
    const bookingReference = `ACC${year}${month}${day}-${randomSuffix}`

    const finalUniversity = universityCollege === "Other" ? customUniversity : universityCollege

    // Create booking in database
    const bookingData = {
      booking_reference: bookingReference,
      // Personal Information
      name: name,
      surname: surname,
      gender: gender,
      id_number: idNumber,
      phone_number_1: phoneNumber1,
      phone_number_2: phoneNumber2 || null,
      whatsapp_phone_number: whatsappPhoneNumber,
      email_address_1: emailAddress1.toLowerCase(),
      email_address_2: emailAddress2 ? emailAddress2.toLowerCase() : null,

      // Location Information
      residence_province: residenceProvince,
      study_province: studyProvince,
      university_college: finalUniversity,
      intended_course: intendedCourse,
      level_of_study: levelOfStudy,

      // Communication & Funding
      preferred_communication: preferredCommunication,
      funding: funding,

      // Special Needs
      has_special_needs: hasSpecialNeeds || false,
      special_needs_description: specialNeedsDescription || null,

      // Additional Information
      additional_comments: additionalComments || null,

      // Status
      status: "pending",
    }

    console.log("Creating accommodation booking with reference:", bookingReference)

    const { data: booking, error: bookingError } = await supabase!
      .from("accommodation_bookings")
      .insert(bookingData)
      .select()
      .single()

    if (bookingError) {
      console.error("Error creating accommodation booking:", bookingError)
      return NextResponse.json({ error: "Failed to create booking", details: bookingError.message }, { status: 500 })
    }

    console.log("Accommodation booking created successfully:", booking.id, "Reference:", bookingReference)

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      bookingReference: bookingReference,
      message: "Your accommodation booking request has been submitted successfully. We will contact you shortly.",
    })
  } catch (error) {
    console.error("Accommodation booking API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
