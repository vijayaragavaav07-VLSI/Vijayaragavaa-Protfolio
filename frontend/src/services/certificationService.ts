import { supabase } from '../lib/supabase';
import type { Certification } from '../types/database';

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[certificationService] Error fetching certifications:', error.message);
    return [];
  }
  return data ?? [];
}
