import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  ShieldCheck, 
  Database,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { DOCTORS, SERVICES, CLINIC_INFO } from '../data/clinicData';
import { createAppointment, isSupabaseConfigured, WhatsAppNotificationResult, generateWhatsAppClickToChatUrl, CLINIC_WHATSAPP_TARGET } from '../lib/supabase';
import { Appointment } from '../types';

interface AppointmentPageProps {
  initialDoctor?: string;
  initialDepartment?: string;
  onNavigate?: (page: string) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({ 
  initialDoctor = '', 
  initialDepartment = '',
  onNavigate
}) => {
  // Form State
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(initialDepartment || 'General Consultation');
  const [doctorName, setDoctorName] = useState(initialDoctor || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);
  const [submissionSource, setSubmissionSource] = useState<'supabase' | 'demo'>('supabase');
  const [whatsappResult, setWhatsappResult] = useState<WhatsAppNotificationResult | null>(null);

  // Available Doctors filtered by department
  const availableDoctors = department
    ? DOCTORS.filter(d => d.department === department)
    : DOCTORS;

  // Set default doctor when department changes if needed
  useEffect(() => {
    if (initialDoctor) {
      setDoctorName(initialDoctor);
    } else if (availableDoctors.length > 0 && !availableDoctors.some(d => d.name === doctorName)) {
      setDoctorName(availableDoctors[0].name);
    }
  }, [department, initialDoctor]);

  // Set minimum date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM',
    '11:30 AM', '01:30 PM', '02:15 PM', '03:00 PM',
    '03:45 PM', '04:30 PM', '05:15 PM', '06:00 PM'
  ];

  // Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!patientName.trim() || patientName.trim().length < 3) {
      errs.patientName = 'Please enter patient full name (minimum 3 characters).';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim())) {
      errs.phone = 'Please provide a valid phone number (e.g. +91 9772674133 or +1 555-0123).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address for appointment confirmation.';
    }

    if (!department) {
      errs.department = 'Please select a clinical department.';
    }

    if (!doctorName) {
      errs.doctorName = 'Please select a doctor.';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please choose an appointment date.';
    }

    if (!preferredTime) {
      errs.preferredTime = 'Please select an appointment time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await createAppointment({
        patient_name: patientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        doctor_name: doctorName,
        department,
        appointment_date: preferredDate,
        appointment_time: preferredTime,
        patient_message: message.trim(),
      });

      if (result.error) {
        setErrors({ form: `Booking failed: ${result.error.message}. Please check your connection and try again.` });
        return;
      }

      if (result.data) {
        setSubmittedAppointment(result.data);
        setSubmissionSource(result.source);
        setWhatsappResult(result.whatsapp);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrors({ form: 'An unexpected error occurred while saving appointment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedAppointment(null);
    setPatientName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setPreferredDate('');
    setPreferredTime('');
    setWhatsappResult(null);
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* SUCCESS CONFIRMATION MODAL / VIEW */}
      {submittedAppointment ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-tealbrand-200 shadow-2xl p-8 sm:p-12 space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-tealbrand-700 block">
              Appointment Confirmed in Database
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Thank You, {submittedAppointment.patient_name}!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Your appointment has been securely validated and recorded in our Supabase PostgreSQL database.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 space-y-4 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 text-xs">Unique Appointment ID</span>
              <span className="font-mono font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md text-xs border border-brand-200">
                #{submittedAppointment.id.slice(0, 13).toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <span className="text-xs text-slate-400 block">Patient Name</span>
                <strong className="text-slate-800 font-semibold">{submittedAppointment.patient_name}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Phone Number</span>
                <strong className="text-slate-800 font-semibold">{submittedAppointment.phone}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Doctor Assigned</span>
                <strong className="text-slate-800 font-semibold">{submittedAppointment.doctor_name}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Department</span>
                <strong className="text-slate-800 font-semibold">{submittedAppointment.department}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Appointment Date</span>
                <strong className="text-tealbrand-700 font-semibold">{submittedAppointment.appointment_date || submittedAppointment.preferred_date}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Appointment Time</span>
                <strong className="text-tealbrand-700 font-semibold">{submittedAppointment.appointment_time || submittedAppointment.preferred_time}</strong>
              </div>
            </div>

            {submittedAppointment.patient_message && (
              <div className="pt-2 text-xs border-t border-slate-200">
                <span className="text-slate-400 block mb-0.5">Patient Message:</span>
                <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200/60">
                  {submittedAppointment.patient_message}
                </p>
              </div>
            )}

            <div className="pt-2 text-xs text-slate-500 border-t border-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Database: <strong className="text-emerald-700">{submissionSource === 'supabase' ? 'Supabase Postgres (Cloud)' : 'Local Demo Storage'}</strong>
                </span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                Status: Pending Confirmation
              </span>
            </div>
          </div>

          {/* WhatsApp Notification Block */}
          <div className="space-y-3 pt-1">
            {whatsappResult?.mode === 'cloud_api' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-emerald-900 block">Automatic WhatsApp Notification Delivered!</strong>
                  <span>Notification was dispatched to clinic doctor at +91 9772674133 via WhatsApp Cloud API.</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>WhatsApp Cloud API Status: Using Click-to-Chat Fallback</span>
                </div>
                <p className="text-amber-700 leading-relaxed text-[11px]">
                  Automatic Cloud API tokens are not yet configured in Supabase Edge secrets. Click below to deliver your pre-filled booking details directly to clinic WhatsApp (<strong>+91 9772674133</strong>).
                </p>
              </div>
            )}

            {/* Click-to-Chat Button */}
            <a
              href={whatsappResult?.prefilledUrl || `https://wa.me/${CLINIC_WHATSAPP_TARGET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Booking Details to Clinic WhatsApp (+91 9772674133)</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>

            <p className="text-[11px] text-center text-slate-500">
              Target: +91 9772674133 &bull; Includes Appointment ID, Patient details, Doctor & Time
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleResetForm}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Book Another Appointment
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('admin')}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
              >
                View in Admin Portal
              </button>
            )}
          </div>

        </div>
      ) : (
        /* APPOINTMENT FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form info & Instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Online Registration</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                Schedule Your Consultation
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Book a confirmed consultation with our leading specialists in under a minute. Our coordinators ensure zero waiting times upon arrival.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
                <ShieldCheck className="w-5 h-5 text-tealbrand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 block font-semibold text-sm">Automated Clinic Reminders</strong>
                  Receive SMS & WhatsApp reminders prior to your visit.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
                <Clock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 block font-semibold text-sm">Flexible Rescheduling</strong>
                  Free cancellation or slot adjustment with 2 hours advance notice.
                </div>
              </div>
            </div>

            {/* Need Immediate Assistance Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3">
              <div className="text-xs uppercase tracking-wider text-tealbrand-400 font-bold">
                Direct WhatsApp Support (+91)
              </div>
              <p className="text-xs text-slate-300">
                You can also message our clinic desk directly on WhatsApp at +91 9772674133:
              </p>
              <a
                href={`https://wa.me/${CLINIC_WHATSAPP_TARGET}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-tealbrand-300 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>+91 9772674133 (WhatsApp Care)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-10 space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold font-display text-slate-900">
                Patient & Booking Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                All fields marked with an asterisk (*) are required for registration.
              </p>
            </div>

            {errors.form && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                      errors.patientName 
                        ? 'border-red-400 bg-red-50/30 focus:border-red-500' 
                        : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                    }`}
                  />
                </div>
                {errors.patientName && (
                  <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>
                )}
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9772674133"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.phone 
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500' 
                          : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.email 
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500' 
                          : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Department & Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Select Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none bg-white"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.department}>
                        {s.department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Select Doctor *
                  </label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                      errors.doctorName ? 'border-red-400' : 'border-slate-200 focus:border-brand-500'
                    }`}
                  >
                    {availableDoctors.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.role})
                      </option>
                    ))}
                  </select>
                  {errors.doctorName && (
                    <p className="text-red-500 text-xs mt-1">{errors.doctorName}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={minDateStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none bg-white ${
                        errors.preferredDate ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-500'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                      errors.preferredTime ? 'border-red-400' : 'border-slate-200 focus:border-brand-500'
                    }`}
                  >
                    <option value="">Select Time Slot...</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Symptoms or Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Patient Message / Symptoms (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current symptoms, relevant medical history, or specific questions for the physician..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white brand-gradient hover:brand-gradient-hover shadow-lg shadow-brand-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Saving to Supabase Database...</span>
                    </div>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4" />
                      <span>Confirm & Book Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};
