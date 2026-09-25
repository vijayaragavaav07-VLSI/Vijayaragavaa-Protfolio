import { supabase } from '../lib/supabase';
import type { Skill } from '../types/database';

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[skillsService] Error fetching skills:', error.message);
    return [];
  }
  return data ?? [];
}
