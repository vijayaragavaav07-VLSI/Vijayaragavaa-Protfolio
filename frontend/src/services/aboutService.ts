import { supabase } from '../lib/supabase';
import type { AboutContent } from '../types/database';

export async function getAboutContent(): Promise<AboutContent | null> {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('visible', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[aboutService] Error fetching about content:', error.message);
    return null;
  }
  return data;
}
