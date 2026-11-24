import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  MessageSquare, 
  ShieldAlert, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  openBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-100 py-3' 
        : 'bg-white/90 backdrop-blur-sm border-b border-slate-100/80 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          aria-label="MediCare Clinic Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-tealbrand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-5 h-5 fill-white stroke-white" />
          </div>
          <div>
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors flex items-center gap-1">
              MediCare <span className="text-tealbrand-600 font-semibold">Clinic</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 block -mt-1">
              Medical Excellence
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-brand-700 bg-brand-50 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Call Now, WhatsApp, Book Appointment, Admin Portal */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Call Now */}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-slate-100 border border-slate-200/80 transition-colors"
            title="Call Clinic Reception"
          >
            <Phone className="w-3.5 h-3.5 text-brand-600" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I want to book an appointment.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-tealbrand-800 bg-tealbrand-50 hover:bg-tealbrand-100 border border-tealbrand-200/60 transition-colors"
            title="Chat via WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-tealbrand-600" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={() => handleNavClick('appointments')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white brand-gradient hover:brand-gradient-hover shadow-md shadow-brand-500/25 active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          {/* Admin Dashboard Pill */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`p-2 rounded-lg text-xs font-medium transition-colors border ${
              currentPage === 'admin'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent'
            }`}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <UserCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('appointments')}
            className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-600"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(100%+1px)] bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn transition-all">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleNavClick('appointments')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white brand-gradient shadow-md shadow-brand-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I would like to book an appointment.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-tealbrand-800 bg-tealbrand-50 hover:bg-tealbrand-100 border border-tealbrand-200"
                >
                  <MessageSquare className="w-4 h-4 text-tealbrand-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full mt-2 py-2.5 px-3 rounded-xl text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-slate-500" />
                <span>Staff & Admin Dashboard</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
