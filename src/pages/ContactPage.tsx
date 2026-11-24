import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { CLINIC_INFO, CLINIC_HOURS } from '../data/clinicData';
import { createContactEnquiry } from '../lib/supabase';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!subject.trim()) {
      errs.subject = 'Please provide a subject.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please enter your message (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await createContactEnquiry({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (res.data) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Could not send enquiry. Please try again or WhatsApp us.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="medical-gradient py-16 sm:py-20 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-tealbrand-700 text-xs font-semibold shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-tealbrand-600" />
            <span>Here to Help You</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            Contact & Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions regarding insurance coverage, doctor availability, or medical reports? Reach out to our dedicated care coordinator.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Info Cards */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft space-y-6">
              <h2 className="text-xl font-bold font-display text-slate-900 border-b border-slate-100 pb-4">
                Clinic Information
              </h2>

              <div className="space-y-5 text-sm">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Address</strong>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      {CLINIC_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-tealbrand-50 border border-tealbrand-100 flex items-center justify-center text-tealbrand-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Phone Lines</strong>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                      Main Reception: <a href={`tel:${CLINIC_INFO.phone}`} className="text-brand-600 font-medium hover:underline">{CLINIC_INFO.phone}</a>
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      24/7 Emergency: <a href={`tel:${CLINIC_INFO.emergencyPhone}`} className="text-red-600 font-semibold hover:underline">{CLINIC_INFO.emergencyPhone}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Instant WhatsApp Desk</strong>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                      Average response time: &lt; 5 minutes
                    </p>
                    <a
                      href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I have a general enquiry.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-1"
                    >
                      <span>Start Chat</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Email Enquiries</strong>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                      {CLINIC_INFO.email}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-tealbrand-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Operating Timings</span>
              </div>
              <h3 className="text-xl font-bold font-display">
                Visiting & Triage Hours
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                {CLINIC_HOURS.map((h, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-slate-800 last:border-0">
                    <span>{h.day}</span>
                    <span className="text-tealbrand-300 font-semibold">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-card">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Message Dispatched!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for contacting MediCare Clinic. Your message has been saved to our inbox, and our patient coordinator will respond within 2-4 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold font-display text-slate-900">
                    Send Us an Enquiry
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and our medical administration will get back to you promptly.
                  </p>
                </div>

                {errors.form && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rachel Green"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Insurance Coverage Inquiry / Executive Screening"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your questions or notes here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-white brand-gradient hover:brand-gradient-hover shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry to Reception</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card p-2 sm:p-3">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-tealbrand-600 uppercase tracking-wider">Interactive Map</span>
              <h3 className="text-lg font-bold font-display text-slate-900">Find MediCare Clinic in Boston Medical District</h3>
              <p className="text-xs text-slate-500">Accessible by subway, commuter rail, with dedicated patient valet parking.</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors w-fit"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
            <iframe
              title="MediCare Clinic Location Map"
              src={CLINIC_INFO.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};
