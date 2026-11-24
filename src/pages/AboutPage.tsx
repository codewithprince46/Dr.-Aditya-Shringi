import React from 'react';
import { 
  Heart, 
  Award, 
  ShieldCheck, 
  Target, 
  Eye, 
  Users, 
  Star, 
  CheckCircle, 
  Stethoscope, 
  Calendar,
  Building,
  Microscope,
  Compass
} from 'lucide-react';
import { CLINIC_INFO, DOCTORS } from '../data/clinicData';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onSelectDoctor?: (doctorName: string, department: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onSelectDoctor }) => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Header / Intro Banner */}
      <section className="medical-gradient py-16 sm:py-20 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-tealbrand-700 text-xs font-semibold shadow-xs">
            <Heart className="w-3.5 h-3.5 text-tealbrand-600" />
            <span>Caring Beyond The Prescription</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            About MediCare Clinic
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to redefine urban ambulatory care, MediCare Clinic unites leading medical practitioners, cutting-edge diagnostic laboratories, and patient-centered hospitality under one modern roof.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-soft relative overflow-hidden group hover:border-brand-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-3">
              Our Mission
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To deliver uncompromising, evidence-based medical healthcare that is accessible, empathetic, and transparent. We empower patients through preventive health education, prompt diagnostics, and clinical treatment protocols designed for lasting vitality.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                <span>Patient safety and dignity prioritized in every interaction</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                <span>Continuous modernization of non-invasive diagnostics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                <span>Transparent consultation fees and clear patient communication</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-soft relative overflow-hidden group hover:border-tealbrand-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-tealbrand-50 border border-tealbrand-100 flex items-center justify-center text-tealbrand-600 mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-3">
              Our Vision
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To be the benchmark for international ambulatory and multi-specialty clinical excellence. We envision a healthcare ecosystem where technology seamlessly connects patients with trusted specialists, eliminating wait times and fragmented care.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Pioneering digital-first clinical scheduling & follow-ups</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Zero-stress healthcare in a comforting boutique environment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Preventive wellness strategies reducing emergency hospitalizations</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Core Clinical Facilities */}
      <section className="bg-slate-50/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-brand-600 text-xs font-bold uppercase tracking-wider">
              Clinical Infrastructure
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900">
              Modern Medical Facilities
            </h2>
            <p className="text-slate-600 text-sm">
              Our purpose-built clinical center features specialized treatment units engineered for patient comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Digital Pathology & Diagnostics",
                desc: "Rapid turnaround on diagnostic blood chemistry, hormone panels, and cardiac markers.",
                icon: Microscope
              },
              {
                title: "Cardiovascular Suite",
                desc: "High-definition Doppler echocardiography, digital ECG, and supervised cardiac stress testing.",
                icon: Heart
              },
              {
                title: "Pediatric Play Lounge",
                desc: "Dedicated child-safe environment designed to ease examination anxiety for infants and kids.",
                icon: Users
              },
              {
                title: "Advanced Minor Op Theater",
                desc: "Hospital-grade HEPA laminar airflow theater for dermatology excisions and dental surgeries.",
                icon: Building
              }
            ].map((facility, idx) => {
              const Icon = facility.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-soft space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Complete Doctor Profiles & Qualifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-tealbrand-700 uppercase tracking-wider">
            <Award className="w-4 h-4 text-tealbrand-600" />
            <span>Distinguished Faculty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900">
            Doctor Qualifications & Specializations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every physician at MediCare Clinic is board certified, with fellowship training and substantial clinical experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{doctor.rating} ({doctor.reviewsCount})</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-full">
                    {doctor.experience}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-tealbrand-600 uppercase tracking-wider">
                      {doctor.department}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-brand-700 font-semibold mt-0.5">
                      {doctor.role}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-900">Qualifications:</div>
                    <div>{doctor.qualifications}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-800">Specializations:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.specializations.map((spec, i) => (
                        <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 border border-brand-100">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Available: </span>
                  <strong className="text-slate-800">{doctor.availableDays}</strong>
                </div>
                <button
                  onClick={() => {
                    if (onSelectDoctor) onSelectDoctor(doctor.name, doctor.department);
                    onNavigate('appointments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white brand-gradient hover:brand-gradient-hover shadow-xs active:scale-95 transition-all"
                >
                  Book Consultation
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. Appointment Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl brand-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Consult with Our Specialists
            </h3>
            <p className="text-brand-100 text-sm max-w-xl">
              Take the first step toward personalized medical care. Book an appointment with your preferred doctor today.
            </p>
          </div>
          <button
            onClick={() => onNavigate('appointments')}
            className="px-8 py-4 rounded-xl text-sm font-bold text-brand-900 bg-white hover:bg-slate-100 shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-brand-600" />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </section>

    </div>
  );
};
