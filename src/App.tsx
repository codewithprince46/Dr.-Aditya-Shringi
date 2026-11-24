import React, { useState, useEffect } from 'react';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { MessageSquare, ArrowUp, Phone } from 'lucide-react';
import { CLINIC_INFO } from './data/clinicData';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctor = (docName: string, dept: string) => {
    setSelectedDoctor(docName);
    setSelectedDepartment(dept);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      
      {/* Top Banner: Emergency & Working Hours */}
      <EmergencyBanner />

      {/* Sticky Main Navigation */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onSelectDoctor={handleSelectDoctor} 
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate} 
            onSelectDoctor={handleSelectDoctor} 
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={handleNavigate} 
            onSelectDoctor={handleSelectDoctor} 
          />
        )}

        {currentPage === 'appointments' && (
          <AppointmentPage 
            initialDoctor={selectedDoctor} 
            initialDepartment={selectedDepartment}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Modern Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Sticky Actions (WhatsApp & Back-to-Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Scroll To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto p-3 rounded-full bg-white text-slate-700 shadow-xl border border-slate-200/80 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll to top"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Action Pill */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent("Hello MediCare Clinic, I would like to consult or book an appointment.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 font-semibold text-xs sm:text-sm group"
          title="Direct WhatsApp Chat"
        >
          <MessageSquare className="w-5 h-5 fill-white/20 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">WhatsApp Care</span>
        </a>

      </div>

    </div>
  );
}

export default App;
