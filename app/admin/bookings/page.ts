"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Loader2, Search, Eye, Trash2, Download, Home, Users } from "lucide-react"
import type { AccommodationBooking } from "@/types/accommodation"
import * as XLSX from "xlsx"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AccommodationBooking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<AccommodationBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<AccommodationBooking | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    needsAccommodation: 0,
    hasAccommodation: 0,
  })

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    filterBookings()
  }, [bookings, searchTerm])

  const loadBookings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/bookings")
      const data = await response.json()

      if (data.bookings) {
        setBookings(data.bookings)
        calculateStats(data.bookings)
      }
    } catch (err) {
      console.error("Error loading bookings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (bookingsData: AccommodationBooking[]) => {
    const stats = bookingsData.reduce(
      (acc, booking) => {
        acc.total++
        if (booking.needsAccommodation === "yes") {
          acc.needsAccommodation++
        } else {
          acc.hasAccommodation++
        }
        return acc
      },
      {
        total: 0,
        needsAccommodation: 0,
        hasAccommodation: 0,
      },
    )

    setStats(stats)
  }

  const filterBookings = () => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredBookings(filtered)
  }

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/bookings?id=${bookingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete booking")
      }

      await loadBookings()
      setSelectedBooking(null)
    } catch (err) {
      console.error("Error deleting booking:", err)
      alert("Failed to delete booking")
    } finally {
      setIsDeleting(false)
    }
  }

  const downloadExcel = () => {
    // Prepare data for Excel
    const excelData = bookings.map((booking) => ({
      "Booking Reference": booking.bookingReference,
      "First Name": booking.firstName,
      "Last Name": booking.lastName,
      Email: booking.email,
      Phone: booking.phone,
      "ID Number": booking.idNumber,
      Gender: booking.gender,
      "Date of Birth": booking.dateOfBirth,
      Nationality: booking.nationality,
      "Home Address": booking.homeAddress,
      City: booking.city,
      Province: booking.province,
      "Postal Code": booking.postalCode,
      University: booking.university,
      "Student Number": booking.studentNumber,
      "Year of Study": booking.yearOfStudy,
      "Course/Program": booking.courseProgram,
      "Needs Accommodation": booking.needsAccommodation,
      "Preferred Location": booking.preferredLocation || "N/A",
      "Move-in Date": booking.moveInDate || "N/A",
      "Accommodation Type": booking.accommodationType || "N/A",
      Budget: booking.budget || "N/A",
      "Emergency Contact Name": booking.emergencyContactName,
      "Emergency Contact Phone": booking.emergencyContactPhone,
      "Emergency Contact Relationship": booking.emergencyContactRelationship,
      "Preferred Contact Method": booking.preferredContactMethod,
      "Funding Source": booking.fundingSource,
      "NSFAS Approved": booking.nsfasApproved || "N/A",
      "Special Needs": booking.specialNeeds || "None",
      "Created At": new Date(booking.created_at).toLocaleString(),
    }))

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Accommodation Bookings")

    // Generate filename with current date
    const filename = `accommodation-bookings-${new Date().toISOString().split("T")[0]}.xlsx`

    // Download file
    XLSX.writeFile(wb, filename)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accommodation Bookings</h1>
            <p className="text-gray-600">Manage student accommodation requests</p>
          </div>
          <Button onClick={downloadExcel} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Download Excel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Needs Accommodation</p>
                  <p className="text-2xl font-bold">{stats.needsAccommodation}</p>
                </div>
                <Home className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Has Accommodation</p>
                  <p className="text-2xl font-bold">{stats.hasAccommodation}</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, or booking reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Reference</th>
                    <th className="text-left p-4">Student</th>
                    <th className="text-left p-4">University</th>
                    <th className="text-left p-4">Needs Accommodation</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-mono text-sm">{booking.bookingReference}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">
                            {booking.firstName} {booking.lastName}
                          </p>
                          <p className="text-sm text-gray-600">{booking.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{booking.university}</span>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={
                            booking.needsAccommodation === "yes"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {booking.needsAccommodation === "yes" ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{formatDate(booking.created_at)}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-6">
                                  {/* Personal Information */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Personal Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Booking Reference</Label>
                                        <p className="font-mono">{selectedBooking.bookingReference}</p>
                                      </div>
                                      <div>
                                        <Label>Full Name</Label>
                                        <p>
                                          {selectedBooking.firstName} {selectedBooking.lastName}
                                        </p>
                                      </div>
                                      <div>
                                        <Label>Email</Label>
                                        <p>{selectedBooking.email}</p>
                                      </div>
                                      <div>
                                        <Label>Phone</Label>
                                        <p>{selectedBooking.phone}</p>
                                      </div>
                                      <div>
                                        <Label>ID Number</Label>
                                        <p>{selectedBooking.idNumber}</p>
                                      </div>
                                      <div>
                                        <Label>Gender</Label>
                                        <p className="capitalize">{selectedBooking.gender}</p>
                                      </div>
                                      <div>
                                        <Label>Date of Birth</Label>
                                        <p>{selectedBooking.dateOfBirth}</p>
                                      </div>
                                      <div>
                                        <Label>Nationality</Label>
                                        <p>{selectedBooking.nationality}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Address */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Address</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="col-span-2">
                                        <Label>Home Address</Label>
                                        <p>{selectedBooking.homeAddress}</p>
                                      </div>
                                      <div>
                                        <Label>City</Label>
                                        <p>{selectedBooking.city}</p>
                                      </div>
                                      <div>
                                        <Label>Province</Label>
                                        <p>{selectedBooking.province}</p>
                                      </div>
                                      <div>
                                        <Label>Postal Code</Label>
                                        <p>{selectedBooking.postalCode}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Study Information */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Study Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>University</Label>
                                        <p>{selectedBooking.university}</p>
                                      </div>
                                      <div>
                                        <Label>Student Number</Label>
                                        <p>{selectedBooking.studentNumber}</p>
                                      </div>
                                      <div>
                                        <Label>Year of Study</Label>
                                        <p>{selectedBooking.yearOfStudy}</p>
                                      </div>
                                      <div>
                                        <Label>Course/Program</Label>
                                        <p>{selectedBooking.courseProgram}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Accommodation Details */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Accommodation Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Needs Accommodation</Label>
                                        <Badge
                                          className={
                                            selectedBooking.needsAccommodation === "yes"
                                              ? "bg-orange-100 text-orange-800"
                                              : "bg-green-100 text-green-800"
                                          }
                                        >
                                          {selectedBooking.needsAccommodation === "yes" ? "Yes" : "No"}
                                        </Badge>
                                      </div>
                                      {selectedBooking.needsAccommodation === "yes" && (
                                        <>
                                          <div>
                                            <Label>Preferred Location</Label>
                                            <p>{selectedBooking.preferredLocation || "N/A"}</p>
                                          </div>
                                          <div>
                                            <Label>Move-in Date</Label>
                                            <p>{selectedBooking.moveInDate || "N/A"}</p>
                                          </div>
                                          <div>
                                            <Label>Accommodation Type</Label>
                                            <p className="capitalize">{selectedBooking.accommodationType || "N/A"}</p>
                                          </div>
                                          <div>
                                            <Label>Budget</Label>
                                            <p>{selectedBooking.budget || "N/A"}</p>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  {/* Emergency Contact */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Emergency Contact</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Name</Label>
                                        <p>{selectedBooking.emergencyContactName}</p>
                                      </div>
                                      <div>
                                        <Label>Phone</Label>
                                        <p>{selectedBooking.emergencyContactPhone}</p>
                                      </div>
                                      <div>
                                        <Label>Relationship</Label>
                                        <p className="capitalize">{selectedBooking.emergencyContactRelationship}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Additional Information */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Additional Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Preferred Contact Method</Label>
                                        <p className="capitalize">{selectedBooking.preferredContactMethod}</p>
                                      </div>
                                      <div>
                                        <Label>Funding Source</Label>
                                        <p className="capitalize">{selectedBooking.fundingSource}</p>
                                      </div>
                                      {selectedBooking.fundingSource === "nsfas" && (
                                        <div>
                                          <Label>NSFAS Approved</Label>
                                          <p className="capitalize">{selectedBooking.nsfasApproved || "N/A"}</p>
                                        </div>
                                      )}
                                      <div className="col-span-2">
                                        <Label>Special Needs</Label>
                                        <p>{selectedBooking.specialNeeds || "None"}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-2 pt-4 border-t">
                                    <Button
                                      variant="destructive"
                                      onClick={() => deleteBooking(selectedBooking.id)}
                                      disabled={isDeleting}
                                    >
                                      {isDeleting ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Deleting...
                                        </>
                                      ) : (
                                        <>
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete Booking
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No bookings found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
