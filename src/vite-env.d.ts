/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_CLINIC_PHONE: string;
  readonly VITE_CLINIC_WHATSAPP: string;
  readonly VITE_CLINIC_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
