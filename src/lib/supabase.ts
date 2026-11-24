import { createClient } from '@supabase/supabase-js';
import { Appointment, ContactMessage, AppointmentStatus, EnquiryStatus, AdminUser } from '../types';

// Supabase credentials from environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://twkoxlasbndttvsfokal.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'medicare_admin_session',
      }
    })
  : null;

// Clinic WhatsApp Destination (+91 9772674133)
export const CLINIC_WHATSAPP_TARGET = "919772674133";

export interface WhatsAppNotificationResult {
  mode: 'cloud_api' | 'fallback_required' | 'cloud_api_error';
  success: boolean;
  message?: string;
  reason?: string;
  targetNumber: string;
  prefilledUrl: string;
  prefilledText: string;
}

// Generate pre-filled WhatsApp click-to-chat URL with all 8 required fields
export function generateWhatsAppClickToChatUrl(apt: {
  id: string;
  patient_name: string;
  phone: string;
  doctor_name: string;
  department: string;
  appointment_date: string;
  appointment_time: string;
  message?: string;
}): { url: string; text: string } {
  const text = `🩺 *NEW APPOINTMENT BOOKING - MediCare Clinic*
━━━━━━━━━━━━━━━━━━━━
🆔 *Appointment ID:* #${apt.id.slice(0, 8).toUpperCase()}
👤 *Patient Name:* ${apt.patient_name}
📞 *Phone Number:* ${apt.phone}
👨‍⚕️ *Doctor:* ${apt.doctor_name}
🏥 *Department:* ${apt.department}
📅 *Date:* ${apt.appointment_date}
⏰ *Time:* ${apt.appointment_time}
📝 *Patient Message:* ${apt.message || "None provided"}
━━━━━━━━━━━━━━━━━━━━
Please confirm this appointment with the patient.`;

  const url = `https://wa.me/${CLINIC_WHATSAPP_TARGET}?text=${encodeURIComponent(text)}`;
  return { url, text };
}

// Local Storage Fallback Keys
const LOCAL_APPOINTMENTS_KEY = 'medicare_local_appointments';
const LOCAL_MESSAGES_KEY = 'medicare_local_messages';

const INITIAL_MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'e9eb6472-6d94-4417-a927-390bf5ba8e5d',
    patient_name: 'Eleanor Vance',
    phone: '+1 (555) 234-5678',
    email: 'eleanor.vance@example.com',
    doctor_name: 'Dr. Sarah Jenkins, MD',
    department: 'Cardiology',
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointment_time: '10:00 AM',
    patient_message: 'Routine cardiovascular health checkup.',
    status: 'confirmed',
    booking_status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'dab1c163-5f25-4220-bc27-b605f2408f15',
    patient_name: 'Michael Chang',
    phone: '+1 (555) 876-5432',
    email: 'michael.chang@example.com',
    doctor_name: 'Dr. David Rodriguez, MD',
    department: 'General Consultation',
    appointment_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    appointment_time: '02:30 PM',
    patient_message: 'Experiencing mild recurring headaches.',
    status: 'pending',
    booking_status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

const INITIAL_MOCK_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    full_name: 'Rachel Green',
    email: 'rachel.g@example.com',
    phone: '+1 (555) 112-3344',
    subject: 'Insurance Coverage Inquiry',
    message: 'Hello, do you accept Blue Cross Blue Shield international coverage plans?',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  }
];

const getLocalData = <T>(key: string, initial: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(item);
  } catch (e) {
    return initial;
  }
};

const setLocalData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

// ==========================================
// 1. APPOINTMENT BOOKING WITH SUPABASE & WHATSAPP
// ==========================================

export async function createAppointment(data: {
  patient_name: string;
  phone: string;
  email: string;
  doctor_name: string;
  department: string;
  appointment_date: string;
  appointment_time: string;
  patient_message?: string;
}): Promise<{
  data: Appointment | null;
  error: Error | null;
  whatsapp: WhatsAppNotificationResult;
  source: 'supabase' | 'demo';
}> {
  // Step 1: Generate unique appointment ID
  const appointmentId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'apt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

  const newAppointment: Appointment = {
    id: appointmentId,
    patient_name: data.patient_name,
    phone: data.phone,
    email: data.email,
    doctor_name: data.doctor_name,
    department: data.department,
    appointment_date: data.appointment_date,
    appointment_time: data.appointment_time,
    preferred_date: data.appointment_date,
    preferred_time: data.appointment_time,
    patient_message: data.patient_message || '',
    message: data.patient_message || '',
    status: 'pending',
    booking_status: 'pending',
    created_at: new Date().toISOString(),
  };

  const { url: fallbackUrl, text: fallbackText } = generateWhatsAppClickToChatUrl({
    id: appointmentId,
    patient_name: data.patient_name,
    phone: data.phone,
    doctor_name: data.doctor_name,
    department: data.department,
    appointment_date: data.appointment_date,
    appointment_time: data.appointment_time,
    message: data.patient_message,
  });

  let whatsappResult: WhatsAppNotificationResult = {
    mode: 'fallback_required',
    success: false,
    reason: 'WhatsApp Cloud API credentials not configured; using click-to-chat fallback.',
    targetNumber: CLINIC_WHATSAPP_TARGET,
    prefilledUrl: fallbackUrl,
    prefilledText: fallbackText,
  };

  let savedInSupabase = false;

  // Step 2: Save patient information to Supabase
  if (supabase) {
    try {
      const { error: insertError } = await supabase
        .from('appointments')
        .insert([
          {
            id: appointmentId,
            patient_name: data.patient_name,
            phone: data.phone,
            email: data.email,
            doctor_name: data.doctor_name,
            department: data.department,
            appointment_date: data.appointment_date,
            appointment_time: data.appointment_time,
            preferred_date: data.appointment_date,
            preferred_time: data.appointment_time,
            patient_message: data.patient_message || '',
            message: data.patient_message || '',
            status: 'pending',
            booking_status: 'pending',
          }
        ]);

      if (!insertError) {
        savedInSupabase = true;

        // Step 3: Trigger WhatsApp Cloud API via Supabase Edge Function
        try {
          const edgeRes = await fetch(`${supabaseUrl}/functions/v1/send-whatsapp-notification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseAnonKey,
            },
            body: JSON.stringify({
              appointment_id: appointmentId,
              patient_name: data.patient_name,
              patient_phone: data.phone,
              doctor_name: data.doctor_name,
              department: data.department,
              appointment_date: data.appointment_date,
              appointment_time: data.appointment_time,
              patient_message: data.patient_message || '',
              target_whatsapp_number: CLINIC_WHATSAPP_TARGET,
            }),
          });

          if (edgeRes.ok) {
            const edgeData = await edgeRes.json();
            if (edgeData.mode === 'cloud_api' && edgeData.success) {
              whatsappResult = {
                mode: 'cloud_api',
                success: true,
                message: edgeData.message || 'Automatic WhatsApp notification delivered.',
                targetNumber: CLINIC_WHATSAPP_TARGET,
                prefilledUrl: fallbackUrl,
                prefilledText: fallbackText,
              };
            } else if (edgeData.mode === 'fallback_required') {
              whatsappResult = {
                mode: 'fallback_required',
                success: false,
                reason: edgeData.reason || 'Cloud API credentials pending; ready for click-to-chat.',
                targetNumber: CLINIC_WHATSAPP_TARGET,
                prefilledUrl: fallbackUrl,
                prefilledText: fallbackText,
              };
            }
          }
        } catch (edgeErr) {
          console.warn('Edge function notification check completed:', edgeErr);
        }

        return {
          data: newAppointment,
          error: null,
          whatsapp: whatsappResult,
          source: 'supabase',
        };
      } else {
        console.error('Supabase appointment insert error:', insertError);
        return {
          data: null,
          error: new Error(insertError.message),
          whatsapp: whatsappResult,
          source: 'supabase',
        };
      }
    } catch (err: any) {
      console.error('Supabase exception:', err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
        whatsapp: whatsappResult,
        source: 'supabase',
      };
    }
  }

  // Demo fallback only if Supabase client is completely not configured
  const current = getLocalData<Appointment[]>(LOCAL_APPOINTMENTS_KEY, INITIAL_MOCK_APPOINTMENTS);
  setLocalData(LOCAL_APPOINTMENTS_KEY, [newAppointment, ...current]);
  return {
    data: newAppointment,
    error: null,
    whatsapp: whatsappResult,
    source: 'demo',
  };
}

// ==========================================
// 2. CONTACT MESSAGES (SUPABASE INTEGRATION)
// ==========================================

export async function createContactMessage(data: {
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ data: ContactMessage | null; error: Error | null; source: 'supabase' | 'demo' }> {
  const messageId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'msg-' + Date.now();

  const newMessage: ContactMessage = {
    id: messageId,
    full_name: data.full_name,
    email: data.email,
    phone: data.phone || '',
    subject: data.subject,
    message: data.message,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            id: messageId,
            full_name: data.full_name,
            email: data.email,
            phone: data.phone || null,
            subject: data.subject,
            message: data.message,
            status: 'new',
          }
        ]);

      if (!error) {
        return { data: newMessage, error: null, source: 'supabase' };
      } else {
        console.error('Failed to insert into contact_messages:', error);
        return { data: null, error: new Error(error.message), source: 'supabase' };
      }
    } catch (err: any) {
      console.error('Supabase contact message exception:', err);
      return { data: null, error: err, source: 'supabase' };
    }
  }

  const current = getLocalData<ContactMessage[]>(LOCAL_MESSAGES_KEY, INITIAL_MOCK_MESSAGES);
  setLocalData(LOCAL_MESSAGES_KEY, [newMessage, ...current]);
  return { data: newMessage, error: null, source: 'demo' };
}

// Backward-compatible alias
export const createContactEnquiry = createContactMessage;

export async function getContactMessages(adminEmail?: string): Promise<{ data: ContactMessage[]; error: Error | null; source: 'supabase' | 'demo' }> {
  if (supabase && adminEmail) {
    try {
      // Use SECURITY DEFINER RPC — bypasses RLS restrictions for admin
      const { data, error } = await supabase.rpc('admin_get_messages', {
        p_email: adminEmail,
      });

      if (!error && data) {
        return { data: data as ContactMessage[], error: null, source: 'supabase' };
      } else if (error) {
        console.warn('admin_get_messages RPC failed:', error.message);
      }
    } catch (err) {}
  }

  const list = getLocalData<ContactMessage[]>(LOCAL_MESSAGES_KEY, INITIAL_MOCK_MESSAGES);
  return { data: list, error: null, source: 'demo' };
}

export const getContactEnquiries = getContactMessages;

export async function deleteContactMessage(id: string, adminEmail?: string): Promise<{ success: boolean }> {
  if (supabase && adminEmail) {
    try {
      // Try admin_delete_message RPC first
      const { error: rpcError } = await supabase.rpc('admin_delete_message', {
        p_id: id,
        p_email: adminEmail,
      });
      if (!rpcError) return { success: true };
      // Fallback: direct delete
      await supabase.from('contact_messages').delete().eq('id', id);
      return { success: true };
    } catch (err) {}
  }
  const current = getLocalData<ContactMessage[]>(LOCAL_MESSAGES_KEY, INITIAL_MOCK_MESSAGES);
  setLocalData(LOCAL_MESSAGES_KEY, current.filter(item => item.id !== id));
  return { success: true };
}

export const deleteContactEnquiry = deleteContactMessage;

// ==========================================
// 3. ADMIN AUTHENTICATION
// ==========================================

export async function adminLogin(email: string, password: string): Promise<{
  success: boolean;
  user: AdminUser | null;
  error: string | null;
}> {
  // Demo fallback when Supabase not configured
  if (!supabase) {
    if (email === 'admin@medicareclinic.com' && password === 'admin123') {
      const demoUser: AdminUser = {
        id: 'demo-admin-id',
        email,
        full_name: 'Clinic Administrator',
        role: 'admin',
        created_at: new Date().toISOString(),
      };
      sessionStorage.setItem('medicare_admin_session_auth', 'true');
      sessionStorage.setItem('medicare_admin_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser, error: null };
    }
    return { success: false, user: null, error: 'Invalid admin credentials' };
  }

  try {
    // Use SECURITY DEFINER RPC that bypasses broken Supabase Auth schema
    const { data, error } = await supabase.rpc('verify_admin_credentials', {
      p_email: email.trim(),
      p_password: password.trim(),
    });

    if (error) {
      console.error('verify_admin_credentials RPC error:', error.message);
      return { success: false, user: null, error: error.message };
    }

    if (data && data.success) {
      const adminUser: AdminUser = {
        id: data.user?.id || 'admin-id',
        email: data.user?.email || email,
        full_name: data.user?.full_name || 'Clinic Administrator',
        role: data.user?.role || 'admin',
        created_at: data.user?.created_at || new Date().toISOString(),
      };
      sessionStorage.setItem('medicare_admin_session_auth', 'true');
      sessionStorage.setItem('medicare_admin_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser, error: null };
    }

    return { success: false, user: null, error: data?.error || 'Invalid credentials. Use admin@medicareclinic.com / admin123' };
  } catch (err: any) {
    return { success: false, user: null, error: err.message || 'Login failed' };
  }
}

export async function adminLogout(): Promise<void> {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
  }
  sessionStorage.removeItem('medicare_admin_session_auth');
  sessionStorage.removeItem('medicare_admin_user');
}

export async function checkAdminSession(): Promise<{ isLoggedIn: boolean; user: AdminUser | null }> {
  const isLoggedIn = sessionStorage.getItem('medicare_admin_session_auth') === 'true';
  if (!isLoggedIn) return { isLoggedIn: false, user: null };
  
  try {
    const userStr = sessionStorage.getItem('medicare_admin_user');
    const user = userStr ? JSON.parse(userStr) as AdminUser : null;
    return { isLoggedIn: true, user };
  } catch {
    return { isLoggedIn: true, user: null };
  }
}

// ==========================================
// 4. APPOINTMENTS MANAGEMENT (ADMIN)
// ==========================================

export async function getAppointments(adminEmail?: string, filters?: {
  status?: string;
  department?: string;
  date?: string;
  search?: string;
}): Promise<{ data: Appointment[]; error: Error | null; source: 'supabase' | 'demo' }> {
  if (supabase && adminEmail) {
    try {
      // Use SECURITY DEFINER RPC — bypasses RLS restrictions for admin
      const { data, error } = await supabase.rpc('admin_get_appointments', {
        p_email: adminEmail,
      });

      if (!error && data) {
        let normalized = (data as any[]).map((item: any) => ({
          ...item,
          appointment_date: item.appointment_date || item.preferred_date,
          appointment_time: item.appointment_time || item.preferred_time,
          patient_message: item.patient_message || item.message,
          booking_status: item.booking_status || item.status,
        })) as Appointment[];

        // Apply client-side filters since RPC returns all
        if (filters?.status && filters.status !== 'all') {
          normalized = normalized.filter(a => a.status === filters.status);
        }
        if (filters?.department && filters.department !== 'all') {
          normalized = normalized.filter(a => a.department === filters.department);
        }
        if (filters?.date) {
          normalized = normalized.filter(a =>
            (a.appointment_date || a.preferred_date) === filters.date
          );
        }

        return { data: normalized, error: null, source: 'supabase' };
      } else if (error) {
        console.warn('admin_get_appointments RPC failed:', error.message);
      }
    } catch (err: any) {
      console.warn('Supabase fetch exception:', err);
    }
  }

  const list = getLocalData<Appointment[]>(LOCAL_APPOINTMENTS_KEY, INITIAL_MOCK_APPOINTMENTS);
  return { data: list, error: null, source: 'demo' };
}

export async function updateAppointmentStatus(
  id: string, 
  status: AppointmentStatus,
  adminEmail?: string
): Promise<{ success: boolean; error: Error | null }> {
  if (supabase && adminEmail) {
    try {
      // Use SECURITY DEFINER RPC for admin updates
      const { data, error } = await supabase.rpc('admin_update_appointment', {
        p_id: id,
        p_status: status,
        p_email: adminEmail,
      });

      if (!error) {
        return { success: true, error: null };
      } else {
        console.error('admin_update_appointment RPC error:', error.message);
      }
    } catch (err: any) {
      console.warn('Supabase update exception:', err);
    }
  }

  const current = getLocalData<Appointment[]>(LOCAL_APPOINTMENTS_KEY, INITIAL_MOCK_APPOINTMENTS);
  const updated = current.map(item => item.id === id ? { ...item, status, booking_status: status, updated_at: new Date().toISOString() } : item);
  setLocalData(LOCAL_APPOINTMENTS_KEY, updated);

  return { success: true, error: null };
}

export async function deleteAppointment(id: string, adminEmail?: string): Promise<{ success: boolean; error: Error | null }> {
  if (supabase && adminEmail) {
    try {
      // Try admin_delete_appointment RPC first
      const { error: rpcError } = await supabase.rpc('admin_delete_appointment', {
        p_id: id,
        p_email: adminEmail,
      });
      if (!rpcError) {
        return { success: true, error: null };
      }
      // Fallback: direct delete (works because GRANT ALL is applied)
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (!error) return { success: true, error: null };
    } catch (err: any) {
      console.warn('Supabase delete exception:', err);
    }
  }

  const current = getLocalData<Appointment[]>(LOCAL_APPOINTMENTS_KEY, INITIAL_MOCK_APPOINTMENTS);
  setLocalData(LOCAL_APPOINTMENTS_KEY, current.filter(item => item.id !== id));
  return { success: true, error: null };
}
