-- =========================================================
-- MediCare Clinic Database Schema & RLS Policies
-- =========================================================

-- 1. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    doctor_name TEXT NOT NULL,
    department TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Contact Enquiries Table
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Appointments
CREATE POLICY "Public can insert appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public read appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public update appointments"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete appointments"
ON public.appointments
FOR DELETE
TO anon, authenticated
USING (true);

-- 5. RLS Policies for Contact Enquiries
CREATE POLICY "Public can insert enquiries"
ON public.contact_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public read enquiries"
ON public.contact_enquiries
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public update enquiries"
ON public.contact_enquiries
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete enquiries"
ON public.contact_enquiries
FOR DELETE
TO anon, authenticated
USING (true);

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments (preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments (status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries (status);
