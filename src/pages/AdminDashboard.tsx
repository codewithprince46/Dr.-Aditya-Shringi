import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  UserCheck, 
  LogOut, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  RefreshCw, 
  Database, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  AlertCircle,
  FileText,
  ChevronDown,
  TrendingUp,
  Inbox,
  ExternalLink,
  Eye,
  X,
  ShieldCheck
} from 'lucide-react';
import { 
  Appointment, 
  ContactMessage, 
  AppointmentStatus,
  AdminUser
} from '../types';
import { 
  getAppointments, 
  updateAppointmentStatus, 
  deleteAppointment, 
  getContactMessages, 
  deleteContactMessage,
  adminLogin,
  adminLogout,
  checkAdminSession,
  isSupabaseConfigured,
  CLINIC_WHATSAPP_TARGET
} from '../lib/supabase';
import { CLINIC_INFO } from '../data/clinicData';

export const AdminDashboard: React.FC = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [emailInput, setEmailInput] = useState('admin@medicareclinic.com');
  const [passwordInput, setPasswordInput] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab: 'appointments' | 'enquiries'
  const [activeTab, setActiveTab] = useState<'appointments' | 'enquiries'>('appointments');

  // Data state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [enquiries, setEnquiries] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncSource, setSyncSource] = useState<'supabase' | 'demo'>('supabase');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all'); // 'all' | 'today' | 'tomorrow' | custom YYYY-MM-DD

  // Patient Details Modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Notification / Alert
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    checkAdminSession().then(result => {
      if (result.isLoggedIn) {
        setIsAuthenticated(true);
        if (result.user) {
          setAdminUser(result.user);
        }
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');

    try {
      const res = await adminLogin(emailInput, passwordInput);
      if (res.success) {
        setIsAuthenticated(true);
        setAdminUser(res.user);
      } else {
        setAuthError(res.error || 'Invalid admin credentials. Please use admin@medicareclinic.com and admin123');
      }
    } catch (err: any) {
      setAuthError('Authentication error occurred.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    const email = adminUser?.email || 'admin@medicareclinic.com';
    try {
      const [aptRes, enqRes] = await Promise.all([
        getAppointments(email),
        getContactMessages(email),
      ]);

      if (aptRes.data) {
        setAppointments(aptRes.data);
        setSyncSource(aptRes.source);
      }
      if (enqRes.data) {
        setEnquiries(enqRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, adminUser]);

  // Handle status update
  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    // Optimistic UI update
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus, booking_status: newStatus } : a));
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment(prev => prev ? { ...prev, status: newStatus, booking_status: newStatus } : null);
    }
    
    const res = await updateAppointmentStatus(id, newStatus, adminUser?.email);
    if (res.success) {
      setAlertMessage(`Appointment status updated to "${newStatus}".`);
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  // Handle delete appointment
  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) return;
    
    setAppointments(prev => prev.filter(a => a.id !== id));
    if (selectedAppointment?.id === id) {
      setSelectedAppointment(null);
    }
    await deleteAppointment(id, adminUser?.email);
    setAlertMessage('Appointment removed from database.');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Handle delete enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Delete this contact message?')) return;
    setEnquiries(prev => prev.filter(e => e.id !== id));
    await deleteContactMessage(id, adminUser?.email);
    setAlertMessage('Message removed from inbox.');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Calculate Date Filters
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const aptDate = apt.appointment_date || apt.preferred_date || '';

    const matchesSearch = 
      apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDept = deptFilter === 'all' || apt.department === deptFilter;

    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = aptDate === todayStr;
    } else if (dateFilter === 'tomorrow') {
      matchesDate = aptDate === tomorrowStr;
    } else if (dateFilter !== 'all') {
      matchesDate = aptDate === dateFilter;
    }

    return matchesSearch && matchesStatus && matchesDept && matchesDate;
  });

  // Calculate statistics
  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const totalEnquiries = enquiries.length;

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"><Clock className="w-3 h-3" /> Pending</span>;
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 medical-gradient">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 sm:p-10 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-900">
              Staff & Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Sign in with your verified Supabase admin credentials.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@medicareclinic.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white brand-gradient hover:brand-gradient-hover shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <span>Authenticating with Supabase...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Supabase Admin Credentials:</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Email: admin@medicareclinic.com | Pass: admin123
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Bar: Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">MediCare Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1">
            Clinic Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Storage indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Database: <strong>{syncSource === 'supabase' ? 'Supabase Postgres (Cloud)' : 'Local Fallback'}</strong></span>
          </div>

          <button
            onClick={fetchData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors"
            title="Refresh database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-brand-600' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Alert toast notification */}
      {alertMessage && (
        <div className="p-3.5 rounded-2xl bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-800 text-xs font-medium flex items-center justify-between animate-fadeIn">
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage(null)} className="text-tealbrand-600 font-bold">&times;</button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <div className="text-xs text-slate-500 font-medium">Total Bookings</div>
          <div className="text-2xl font-bold font-display text-slate-900 mt-1">{totalAppointments}</div>
          <div className="text-[11px] text-brand-600 mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>All-time visits</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-soft">
          <div className="text-xs text-amber-700 font-medium">Pending Review</div>
          <div className="text-2xl font-bold font-display text-amber-700 mt-1">{pendingCount}</div>
          <div className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Needs confirmation</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-brand-200/80 shadow-soft">
          <div className="text-xs text-brand-700 font-medium">Confirmed</div>
          <div className="text-2xl font-bold font-display text-brand-700 mt-1">{confirmedCount}</div>
          <div className="text-[11px] text-brand-600 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Scheduled slots</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-soft">
          <div className="text-xs text-emerald-700 font-medium">Completed</div>
          <div className="text-2xl font-bold font-display text-emerald-700 mt-1">{completedCount}</div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Consulted</span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <div className="text-xs text-slate-500 font-medium">Contact Messages</div>
          <div className="text-2xl font-bold font-display text-slate-900 mt-1">{totalEnquiries}</div>
          <div className="text-[11px] text-tealbrand-600 mt-1 flex items-center gap-1">
            <Inbox className="w-3 h-3" />
            <span>Patient messages</span>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'enquiries'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Patient Contact Messages ({enquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: APPOINTMENTS TABLE */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          
          {/* Search & Filter Bar with Date Filtering */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search patient, doctor, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Date Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date:</span>
              </div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-medium"
              >
                <option value="all">All Dates</option>
                <option value="today">Today ({todayStr})</option>
                <option value="tomorrow">Tomorrow ({tomorrowStr})</option>
              </select>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Department Filter */}
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-medium"
              >
                <option value="all">All Departments</option>
                <option value="General Consultation">General Consultation</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dental Care">Dental Care</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Patient Details</th>
                    <th className="py-3.5 px-4">Doctor & Department</th>
                    <th className="py-3.5 px-4">Date & Slot</th>
                    <th className="py-3.5 px-4">Reason / Notes</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No appointments found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Patient info */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{apt.patient_name}</span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{apt.phone}</span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{apt.email}</span>
                          </div>
                          <div className="font-mono text-[10px] text-brand-600 mt-1">
                            #{apt.id.slice(0, 8).toUpperCase()}
                          </div>
                        </td>

                        {/* Doctor & Department */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{apt.doctor_name}</div>
                          <span className="text-[11px] font-medium text-tealbrand-700 bg-tealbrand-50 px-2 py-0.5 rounded-md border border-tealbrand-200 mt-1 inline-block">
                            {apt.department}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{apt.appointment_date || apt.preferred_date}</div>
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-brand-600" />
                            <span>{apt.appointment_time || apt.preferred_time}</span>
                          </div>
                        </td>

                        {/* Notes */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-xs text-slate-600 line-clamp-2 italic">
                            {apt.patient_message || apt.message || 'No additional notes.'}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="space-y-1.5">
                            {getStatusBadge(apt.status)}
                            <div>
                              <select
                                value={apt.status}
                                onChange={(e) => handleStatusChange(apt.id, e.target.value as AppointmentStatus)}
                                className="text-[11px] py-1 px-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
                              >
                                <option value="pending">Set Pending</option>
                                <option value="confirmed">Set Confirmed</option>
                                <option value="completed">Set Completed</option>
                                <option value="cancelled">Set Cancelled</option>
                              </select>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* View Full Patient Details Modal Button */}
                            <button
                              onClick={() => setSelectedAppointment(apt)}
                              className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50 border border-brand-200 transition-colors"
                              title="View complete patient details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* WhatsApp Direct Link to Patient */}
                            <a
                              href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${apt.patient_name}, this is MediCare Clinic regarding your appointment with ${apt.doctor_name} on ${apt.appointment_date || apt.preferred_date} at ${apt.appointment_time || apt.preferred_time}. (Ref: #${apt.id.slice(0, 8)})`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                              title="Message patient on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteAppointment(apt.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                              title="Delete appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CONTACT MESSAGES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Patient Contact Submissions ({enquiries.length})
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  No contact messages in inbox.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{enq.full_name}</span>
                        <span className="text-xs text-slate-400">&bull;</span>
                        <span className="text-xs text-slate-500">{enq.email}</span>
                        {enq.phone && (
                          <>
                            <span className="text-xs text-slate-400">&bull;</span>
                            <span className="text-xs text-slate-500">{enq.phone}</span>
                          </>
                        )}
                        <span className="text-[11px] text-slate-400 ml-auto">
                          {new Date(enq.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="font-semibold text-slate-800 text-sm">
                        Subject: {enq.subject}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {enq.message}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center gap-2">
                      <a
                        href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject)}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </a>

                      <button
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* COMPLETE PATIENT DETAILS MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[11px] font-bold text-tealbrand-700 uppercase tracking-wider block">
                  Complete Patient Record
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedAppointment.patient_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 text-xs block">Appointment ID</span>
                  <span className="font-mono font-bold text-brand-700">{selectedAppointment.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Created Timestamp</span>
                  <span className="font-medium text-slate-700">{new Date(selectedAppointment.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-xs block">Phone Number</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <strong className="text-slate-900 font-semibold">{selectedAppointment.phone}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Email Address</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <strong className="text-slate-900 font-semibold truncate">{selectedAppointment.email}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Doctor Assigned</span>
                  <strong className="text-slate-900 font-semibold">{selectedAppointment.doctor_name}</strong>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Clinical Department</span>
                  <strong className="text-tealbrand-700 font-semibold">{selectedAppointment.department}</strong>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Appointment Date</span>
                  <strong className="text-slate-900 font-semibold">{selectedAppointment.appointment_date || selectedAppointment.preferred_date}</strong>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Time Slot</span>
                  <strong className="text-slate-900 font-semibold">{selectedAppointment.appointment_time || selectedAppointment.preferred_time}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-xs block mb-1">Patient Symptoms / Message</span>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed italic">
                  {selectedAppointment.patient_message || selectedAppointment.message || 'No additional symptoms or patient message recorded.'}
                </p>
              </div>

              {/* Status Update Control */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs block mb-1">Update Status:</span>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedAppointment.status)}
                    <select
                      value={selectedAppointment.status}
                      onChange={(e) => handleStatusChange(selectedAppointment.id, e.target.value as AppointmentStatus)}
                      className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 bg-white font-medium"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedAppointment.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedAppointment.patient_name}, MediCare Clinic reception is contacting you regarding your appointment (ID: #${selectedAppointment.id.slice(0, 8)}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Supabase Infrastructure Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
        <div className="flex items-center gap-2 text-tealbrand-400 text-xs font-bold uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>Supabase Cloud Integration Active</span>
        </div>
        <h3 className="text-lg font-bold font-display">
          Backend Architecture & Database Status
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          MediCare Clinic database tables (`appointments`, `contact_messages`, `admin_users`) are active on Supabase Postgres. Row Level Security guarantees that public patients can only insert their own appointments without seeing others, while authenticated administrators have complete read/write access.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-slate-400 block">Database Tables</span>
            <span className="text-emerald-400 font-mono text-[11px] block">
              appointments &bull; contact_messages &bull; admin_users
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-slate-400 block">Row Level Security</span>
            <span className="text-emerald-400 font-semibold">Strict (Admin-Only Select)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-slate-400 block">WhatsApp Notification Target</span>
            <span className="text-tealbrand-300 font-semibold">+91 9772674133</span>
          </div>
        </div>
      </div>

    </div>
  );
};
