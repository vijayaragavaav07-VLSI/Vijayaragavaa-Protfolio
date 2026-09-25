import { supabase } from '../lib/supabase';
import type { Resume } from '../types/database';

export async function getActiveResume(): Promise<Resume | null> {
  const { data, error } = await supabase
    .from('resume')
    .select('*')
    .eq('is_active', true)
    .order('uploaded_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[resumeService] Error fetching active resume:', error.message);
    return null;
  }
  return data;
}
