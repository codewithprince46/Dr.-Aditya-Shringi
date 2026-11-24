import React from 'react';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ShieldAlert, 
  ArrowRight,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { CLINIC_INFO, CLINIC_HOURS, SERVICES } from '../../data/clinicData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Clinic Bio & Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-tealbrand-400 flex items-center justify-center text-white shadow-lg">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                MediCare <span className="text-tealbrand-400">Clinic</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              MediCare Clinic is committed to delivering state-of-the-art medical diagnostics, multi-specialty clinical care, and compassionate patient support with modern international standards.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Care Desk</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.emergencyPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>24/7 Emergency Line</span>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Doctors & Clinic' },
                { id: 'services', label: 'Medical Specialties' },
                { id: 'appointments', label: 'Book Appointment' },
                { id: 'contact', label: 'Contact & Directions' },
                { id: 'admin', label: 'Staff Admin Portal' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-tealbrand-400 text-slate-400 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Medical Specialties */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase font-display">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES.map((s) => (
                <li key={s.id} className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('services')}>
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Clinic Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase font-display">
              Visiting Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              {CLINIC_HOURS.map((h, idx) => (
                <div key={idx} className="pb-1 border-b border-slate-800">
                  <div className="font-medium text-slate-300">{h.day}</div>
                  <div className="text-tealbrand-400">{h.hours}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Fictional Medical Disclaimer Notice (Mandatory Prompt Requirement) */}
        <div className="my-8 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-300 font-semibold uppercase tracking-wider block">
              Demonstration & Placeholder Notice
            </strong>
            <p className="leading-relaxed">
              MediCare Clinic is a fictional portfolio and demonstration web application showcasing modern digital healthcare architecture. Doctor names, clinical credentials, medical qualifications, patient testimonials, and contact phone numbers are simulated demo placeholders that must be customized with verified medical credentials and licensing prior to public production deployment.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} MediCare Clinic Inc. All rights reserved. Built with React, TypeScript & Supabase.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => onNavigate('about')}>Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => onNavigate('about')}>Patient Rights</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => onNavigate('admin')}>Staff Login</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
