import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// ============================================================
// Supabase Client — Single Shared Instance
// ============================================================
// Uses only the PUBLIC anon key (safe for frontend).
// The service_role key must NEVER be used in frontend code.
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing environment variables. ' +
    'Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'
  );
}

export const supabase = createClient<Database>(
  supabaseUrl ?? '',
  supabaseAnonKey ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
