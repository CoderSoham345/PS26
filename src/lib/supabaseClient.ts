import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ncsarlqvlgecvwxbplrt.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_BbHNIEncnwqfKxhQ3RZD9g_5FGAzqJq';

let client: ReturnType<typeof createClient> | null = null;

try {
  if (supabaseUrl && supabasePublishableKey) {
    client = createClient(supabaseUrl, supabasePublishableKey);
  }
} catch (error) {
  console.warn('[DisasterGuard] Supabase initialization failed, falling back to local dataset:', error);
}

export const supabase = client;

