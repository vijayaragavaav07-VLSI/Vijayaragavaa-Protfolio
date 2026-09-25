import { supabase } from '../lib/supabase';
import type { SiteSettings } from '../types/database';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[siteSettingsService] Error fetching site settings:', error.message);
    return null;
  }
  return data;
}
