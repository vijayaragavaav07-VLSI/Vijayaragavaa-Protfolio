import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[profileService] Error fetching profile:', error.message);
    return null;
  }
  return data;
}
