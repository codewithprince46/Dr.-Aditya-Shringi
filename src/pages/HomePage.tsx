import React from 'react';
import { 
  Heart, 
  Calendar, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Star, 
  ChevronRight, 
  ArrowRight,
  Activity, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Stethoscope, 
  Baby, 
  Smile, 
  Building2, 
  Users,
  MapPin
} from 'lucide-react';
import { 
  CLINIC_INFO, 
  CLINIC_HOURS, 
  DOCTORS, 
  SERVICES, 
  TESTIMONIALS, 
  CLINIC_STATS, 
  WHY_CHOOSE_US 
} from '../data/clinicData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectDoctor?: (doctorName: string, department: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectDoctor }) => {
  // Map icon strings to Lucide components
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

  const getWhyIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-600" />;
      case 'GraduationCap': return <Award className="w-6 h-6 text-tealbrand-600" />;
      case 'Clock': return <Clock className="w-6 h-6 text-amber-600" />;
      case 'Smartphone': return <MessageSquare className="w-6 h-6 text-indigo-600" />;
      default: return <ShieldCheck className="w-6 h-6 text-brand-600" />;
    }
  };

  const handleBookDoctor = (docName: string, dept: string) => {
    if (onSelectDoctor) {
      onSelectDoctor(docName, dept);
    }
    onNavigate('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 sm:space-y-28 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 medical-gradient border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Accepting New Patients Today</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-normal">Same-Day Slots Available</span>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-[1.12]">
                  Your Health, <br />
                  <span className="bg-gradient-to-r from-brand-600 via-tealbrand-600 to-tealbrand-500 bg-clip-text text-transparent">
                    Our Priority.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  Welcome to MediCare Clinic. Experience healthcare elevated by world-class specialists, non-invasive precision diagnostics, and personalized consultations in an oasis of comfort.
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  onClick={() => onNavigate('appointments')}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white brand-gradient hover:brand-gradient-hover shadow-lg shadow-brand-500/25 active:scale-95 transition-all flex items-center gap-2 group"
                >
                  <Calendar className="w-5 h-5 text-white/90" />
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I would like to book an appointment.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-tealbrand-900 bg-tealbrand-50 hover:bg-tealbrand-100 border border-tealbrand-200 shadow-xs active:scale-95 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-tealbrand-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Key Trust Checkmarks */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-600 font-medium border-t border-brand-200/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                  <span>Board Certified MDs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                  <span>Zero Wait Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                  <span>Digital Health Records</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Background decorative blob */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-300/40 via-tealbrand-200/40 to-transparent rounded-3xl blur-2xl -z-10"></div>

                {/* Main Image Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5] object-cover bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=900"
                    alt="Doctor smiling in modern clinic"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Doctor Caption inside image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-wider text-tealbrand-300 font-semibold">Chief Medical Officer</p>
                    <h3 className="text-lg font-bold">Dr. David Rodriguez, MD</h3>
                    <p className="text-xs text-slate-200">14+ Years in Internal & Preventive Medicine</p>
                  </div>
                </div>

                {/* Floating Patient Review Badge */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-premium border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                    <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-slate-900 font-bold text-sm">
                      <span>4.9 / 5.0</span>
                      <span className="text-xs text-slate-400 font-normal">(850+ reviews)</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Top Rated Clinical Care</p>
                  </div>
                </div>

                {/* Floating Emergency Badge */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-premium border border-slate-100 flex items-center gap-3 max-w-xs">
                  <div className="w-9 h-9 rounded-xl bg-tealbrand-50 border border-tealbrand-200 flex items-center justify-center text-tealbrand-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Open Today Until 8 PM</span>
                    <span className="text-[11px] text-tealbrand-700 font-semibold">Walk-ins & Appointments</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CLINIC STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-card border border-slate-100 p-6 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {CLINIC_STATS.map((stat, idx) => (
            <div key={idx} className={`pt-4 lg:pt-0 ${idx !== 0 ? 'lg:pl-8' : ''} space-y-1`}>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-brand-600">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR MEDICAL SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-tealbrand-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>Multi-Disciplinary Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900">
              Popular Medical Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Equipped with hospital-grade equipment and specialized consultation chambers for every health discipline.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-sm group"
          >
            <span>View All Specialties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-xs">
                  {service.duration}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-tealbrand-600 uppercase tracking-wider">
                      {service.department}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {getServiceIcon(service.iconName)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Led by: <strong className="text-slate-800">{service.doctorInCharge}</strong>
                  </span>
                  <button
                    onClick={() => handleBookDoctor(service.doctorInCharge, service.department)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1 group-hover:underline"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DOCTOR PROFILE PREVIEWS */}
      <section className="bg-slate-50/70 py-16 sm:py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-brand-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Our Medical Specialists</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900">
                Meet Our Renowned Physicians
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                Board-certified specialists committed to compassionate bedside manner and clinical precision.
              </p>
            </div>

            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-sm group"
            >
              <span>View Full Credentials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Doctors Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTORS.slice(0, 3).map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-full">
                    {doctor.experience}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-tealbrand-600 uppercase tracking-wider">
                      {doctor.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                      {doctor.qualifications}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 line-clamp-2">
                      {doctor.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Days: <strong className="text-slate-800">{doctor.availableDays}</strong>
                    </span>
                    <button
                      onClick={() => handleBookDoctor(doctor.name, doctor.department)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white brand-gradient hover:brand-gradient-hover shadow-xs active:scale-95 transition-all"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE MEDICARE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-tealbrand-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>The MediCare Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 leading-snug">
              Why Discerning Patients Choose MediCare Clinic
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We merge clinical precision with patient-first hospitality. From easy online scheduling to follow-up consultations, your journey is meticulously managed.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-50/60 border border-brand-100">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="font-semibold text-slate-900 block">Immediate WhatsApp Support</strong>
                  Connect directly with reception for appointment alterations or test query updates.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-tealbrand-50/60 border border-tealbrand-100">
                <CheckCircle2 className="w-5 h-5 text-tealbrand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="font-semibold text-slate-900 block">Encrypted Digital Health Records</strong>
                  Access your prescriptions and diagnostics through our HIPAA-compliant records system.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-soft hover:shadow-card transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {getWhyIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PATIENT TESTIMONIALS */}
      <section className="bg-brand-900 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-tealbrand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
            <span className="text-tealbrand-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Real Patient Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Trusted by Over 24,000 Individuals
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Read authentic feedback from families and professionals who count on MediCare Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                  {test.image && (
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover border border-tealbrand-400/50"
                    />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.name}</h4>
                    <p className="text-xs text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLINIC HOURS & QUICK CONTACT OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-premium overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Hours & Info */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="space-y-2">
              <span className="text-brand-600 text-xs font-bold uppercase tracking-wider">
                Consultation Schedules
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                Clinic Opening Hours & Location
              </h2>
              <p className="text-slate-600 text-sm">
                We accommodate both scheduled appointments and walk-in priority triage.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {CLINIC_HOURS.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                >
                  <span className="font-semibold text-slate-800">{h.day}</span>
                  <span className="text-tealbrand-700 font-bold">{h.hours}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>{CLINIC_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-700 via-brand-800 to-tealbrand-900 p-8 sm:p-12 text-white flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-tealbrand-300 text-xs font-semibold backdrop-blur-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Zero Wait Guarantee</span>
              </div>
              <h3 className="text-2xl font-bold font-display">
                Ready to Consult With a Specialist?
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Schedule your consultation online in under 60 seconds. Receive instant confirmation and WhatsApp alerts.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('appointments')}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Book Instant Appointment</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I want to book an appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-white/15 hover:bg-white/20 border border-white/20 text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-tealbrand-300" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
