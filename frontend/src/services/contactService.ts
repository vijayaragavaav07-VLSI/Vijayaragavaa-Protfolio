import { supabase } from '../lib/supabase';
import type { ContactSettings } from '../types/database';

export async function getContactSettings(): Promise<ContactSettings | null> {
  const { data, error } = await supabase
    .from('contact_settings')
    .select('*')
    .eq('contact_enabled', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[contactService] Error fetching contact settings:', error.message);
    return null;
  }
  return data;
}
