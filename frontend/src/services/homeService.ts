import { supabase } from '../lib/supabase';
import type { HomeContent } from '../types/database';

export async function getHomeContent(): Promise<HomeContent | null> {
  const { data, error } = await supabase
    .from('home_content')
    .select('*')
    .eq('visible', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[homeService] Error fetching home content:', error.message);
    return null;
  }
  return data;
}
