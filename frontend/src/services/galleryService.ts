import { supabase } from '../lib/supabase';
import type { GalleryItem } from '../types/database';

export async function getGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[galleryService] Error fetching gallery:', error.message);
    return [];
  }
  return data ?? [];
}
