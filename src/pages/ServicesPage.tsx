import React, { useState } from 'react';
import { 
  Stethoscope, 
  Activity, 
  Sparkles, 
  Baby, 
  Smile, 
  Clock, 
  UserCheck, 
  CheckCircle, 
  ChevronRight, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';
import { MedicalService } from '../types';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onSelectDoctor?: (doctorName: string, department: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectDoctor }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'General Consultation', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Dental Care'];

  const filteredServices = selectedDept === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.department === selectedDept);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-brand-600" />;
      case 'HeartPulse': return <Activity className="w-6 h-6 text-rose-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Baby': return <Baby className="w-6 h-6 text-tealbrand-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-blue-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-emerald-600" />;
      default: return <Stethoscope className="w-6 h-6 text-brand-600" />;
    }
  };

  const handleBookService = (service: MedicalService) => {
    if (onSelectDoctor) {
      onSelectDoctor(service.doctorInCharge, service.department);
    }
    onNavigate('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="medical-gradient py-16 sm:py-20 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-700 text-xs font-semibold shadow-xs">
            <Stethoscope className="w-3.5 h-3.5 text-brand-600" />
            <span>Comprehensive Specialty Care</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            Our Medical Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From routine preventive checkups to complex non-invasive cardiovascular and dermatological procedures, our specialized clinics provide international standard treatments.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedDept === dept
                    ? 'bg-white text-brand-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/95 backdrop-blur-xs shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-xs">
                    <Clock className="w-3.5 h-3.5 text-tealbrand-400" />
                    <span>Avg. {service.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-tealbrand-600 uppercase tracking-wider">
                      {service.department}
                    </span>
                    <h3 className="text-xl font-bold font-display text-slate-900 mt-1 group-hover:text-brand-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Common Treatments */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-800 block">
                      Common Treatments & Procedures:
                    </span>
                    <div className="space-y-1.5">
                      {service.commonTreatments.map((treatment, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-tealbrand-600 flex-shrink-0" />
                          <span>{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Patient Benefits:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {service.keyBenefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Department Lead:</span>
                  <span className="text-xs font-bold text-slate-800">{service.doctorInCharge}</span>
                </div>
                <button
                  onClick={() => handleBookService(service)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient hover:brand-gradient-hover shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Specialty Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-display">
              Unsure Which Specialty You Require?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Our clinical triage desk assists patients in selecting the appropriate specialist based on your symptoms.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors"
            >
              Speak to Triage
            </a>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Ask an Enquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
