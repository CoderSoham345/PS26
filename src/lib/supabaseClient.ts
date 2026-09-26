import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

let client: ReturnType<typeof createClient> | null = null;

try {
  if (supabaseUrl && supabasePublishableKey) {
    client = createClient(supabaseUrl, supabasePublishableKey);
  }
} catch (error) {
  console.warn('[DisasterGuard] Supabase initialization failed, falling back to local dataset:', error);
}

export const supabase = client;

