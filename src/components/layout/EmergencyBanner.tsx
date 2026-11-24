import React from 'react';
import { Phone, Clock, MessageSquare, Database, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO, CLINIC_HOURS } from '../../data/clinicData';
import { isSupabaseConfigured } from '../../lib/supabase';

export const EmergencyBanner: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-tealbrand-400" />
            <span>Mon - Fri: 8:00 AM - 8:00 PM | Sat: 9:00 AM - 5:00 PM</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-400" />
            <span>Emergency 24/7: <strong className="text-white font-semibold">{CLINIC_INFO.emergencyPhone}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Supabase Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-[11px] font-medium border border-slate-700/60">
            <Database className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-300">
              Supabase: <span className="text-emerald-400 font-semibold">{isSupabaseConfigured ? 'Connected' : 'Demo Storage'}</span>
            </span>
          </div>

          {/* Quick WhatsApp Pill */}
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I would like to enquire about doctor availability and booking.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-tealbrand-400 hover:text-tealbrand-300 transition-colors font-medium hover:underline"
            title="Chat directly with our care coordinator"
          >
            <MessageSquare className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp Care</span>
          </a>
        </div>
      </div>
    </div>
  );
};
