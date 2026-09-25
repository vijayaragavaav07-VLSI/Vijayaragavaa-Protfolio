import { supabase } from '../lib/supabase';
import type { Experience } from '../types/database';

export async function getExperience(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[experienceService] Error fetching experience:', error.message);
    return [];
  }
  return data ?? [];
}
