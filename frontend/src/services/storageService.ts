import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'portfolio-media';

export type AllowedFolder = 'profile' | 'projects' | 'certifications' | 'gallery' | 'resume' | 'other';

export const storageService = {
  /**
   * Upload a file to a specific folder in the portfolio-media bucket
   */
  async uploadFile(file: File, folder: AllowedFolder, prefix: string = ''): Promise<{ url: string | null; error: string | null }> {
    try {
      // Sanitize file name
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const uniqueFileName = `${Date.now()}_${sanitizedName}`;
      
      const filePath = prefix ? `${folder}/${prefix}/${uniqueFileName}` : `${folder}/${uniqueFileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        return { url: null, error: uploadError.message };
      }

      const url = this.getPublicUrl(filePath);
      return { url, error: null };
    } catch (err: any) {
      return { url: null, error: err.message || 'An unexpected error occurred during upload.' };
    }
  },

  /**
   * Get the public URL for a given path
   */
  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);
      
    return data.publicUrl;
  },

  /**
   * Delete a file by its URL or Path
   */
  async deleteFile(urlOrPath: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Extract the path if it's a full URL
      let path = urlOrPath;
      if (urlOrPath.includes(BUCKET_NAME)) {
        const urlParts = urlOrPath.split(`${BUCKET_NAME}/`);
        if (urlParts.length > 1) {
          path = urlParts[1];
        }
      }

      if (!path) return { success: false, error: 'Invalid path' };

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred during deletion.' };
    }
  }
};
