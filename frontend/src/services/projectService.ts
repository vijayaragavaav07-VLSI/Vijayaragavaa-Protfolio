import { supabase } from '../lib/supabase';
import type { Project } from '../types/database';

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[projectService] Error fetching projects:', error.message);
    return [];
  }
  return data ?? [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('[projectService] Error fetching project:', error.message);
    return null;
  }
  return data;
}
