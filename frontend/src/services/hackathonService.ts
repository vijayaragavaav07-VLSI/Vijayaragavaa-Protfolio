import { supabase } from '../lib/supabase';
import type { Hackathon } from '../types/database';

export async function getHackathons(): Promise<Hackathon[]> {
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[hackathonService] Error fetching hackathons:', error.message);
    return [];
  }
  return data ?? [];
}
