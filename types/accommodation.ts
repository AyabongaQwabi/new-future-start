export interface AccommodationBooking {
  // Personal Information
  name: string
  surname: string
  gender: "Male" | "Female"
  idNumber: string
  phoneNumber1: string
  phoneNumber2?: string
  whatsappPhoneNumber: string
  emailAddress1: string
  emailAddress2?: string

  // Location Information
  residenceProvince: string
  studyProvince: string
  universityCollege: string
  intendedCourse: string
  levelOfStudy: string

  // Communication & Funding
  preferredCommunication: "WhatsApp" | "Call" | "Email"
  funding: "NSFAS" | "Bursary" | "Self-Funded"

  // Special Needs
  hasSpecialNeeds: boolean
  specialNeedsDescription?: string

  // Additional Information
  additionalComments?: string
}

export const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
] as const

export const UNIVERSITIES = [
  "Cape Peninsula University of Technology (CPUT)",
  "Central University of Technology (CUT)",
  "Durban University of Technology (DUT)",
  "Mangosuthu University of Technology (MUT)",
  "Nelson Mandela University (NMU)",
  "North-West University (NWU)",
  "Rhodes University (RU)",
  "Sol Plaatje University (SPU)",
  "Tshwane University of Technology (TUT)",
  "University of Cape Town (UCT)",
  "University of Fort Hare (UFH)",
  "University of Johannesburg (UJ)",
  "University of KwaZulu-Natal (UKZN)",
  "University of Limpopo (UL)",
  "University of Mpumalanga (UMP)",
  "University of Pretoria (UP)",
  "University of South Africa (UNISA)",
  "University of Stellenbosch (SU)",
  "University of the Free State (UFS)",
  "University of the Western Cape (UWC)",
  "University of the Witwatersrand (Wits)",
  "University of Venda (UNIVEN)",
  "University of Zululand (UNIZULU)",
  "Vaal University of Technology (VUT)",
  "Walter Sisulu University (WSU)",
] as const

export const STUDY_LEVELS = ["Grade 12", "First Year", "Second Year", "Third Year", "Fourth Year"] as const
