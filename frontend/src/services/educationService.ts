import { supabase } from '../lib/supabase';
import type { Education } from '../types/database';

export async function getEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[educationService] Error fetching education:', error.message);
    return [];
  }
  return data ?? [];
}
