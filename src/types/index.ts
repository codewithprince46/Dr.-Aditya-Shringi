export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type EnquiryStatus = 'new' | 'in_progress' | 'resolved';

export interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  email: string;
  doctor_name: string;
  department: string;
  appointment_date: string;
  appointment_time: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  patient_message?: string;
  status: AppointmentStatus;
  booking_status?: AppointmentStatus;
  created_at: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}

// Retain alias for backward compatibility
export type ContactEnquiry = ContactMessage;

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  qualifications: string;
  experience: string;
  bio: string;
  specializations: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  availableDays: string;
}

export interface MedicalService {
  id: string;
  title: string;
  department: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  commonTreatments: string[];
  keyBenefits: string[];
  duration: string;
  doctorInCharge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  image?: string;
}

export interface ClinicHours {
  day: string;
  hours: string;
  isClosed?: boolean;
}
