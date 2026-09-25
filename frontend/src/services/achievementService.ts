import { supabase } from '../lib/supabase';
import type { Achievement } from '../types/database';

export async function getAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[achievementService] Error fetching achievements:', error.message);
    return [];
  }
  return data ?? [];
}
