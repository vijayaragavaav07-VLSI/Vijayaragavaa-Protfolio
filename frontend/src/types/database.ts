// ============================================================
// Database TypeScript Types
// Auto-synced to the Supabase SQL schema in:
//   supabase/migrations/001_initial_schema.sql
//
// Keep these types in sync with the database tables.
// Separate from UI types in portfolio.ts
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================================
// Row types — represent exact columns in the DB
// ============================================================

export interface Profile {
  id: string;
  full_name: string;
  role: string;
  institution: string;
  specialization: string;
  profile_image_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  logo_url: string | null;
  favicon_url: string | null;
  primary_email: string;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface HomeContent {
  id: string;
  badge_text: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  profile_image_url: string | null;
  email: string;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  resume_url: string | null;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  section_title: string;
  short_bio: string;
  engineering_philosophy: string;
  institution: string;
  specialization: string;
  primary_focus: string;
  target_hardware: string;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  description: string;
  technology: string | null;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  role: string;
  status: string;
  github_url: string | null;
  project_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Hackathon {
  id: string;
  title: string;
  award: string;
  level: string;
  description: string;
  role: string;
  team_size: string | null;
  outcome: string | null;
  image_url: string | null;
  architecture_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  description: string;
  achievement_date: string | null;
  verification_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  organization: string;
  title: string;
  certificate_id: string | null;
  description: string;
  issued_date: string;
  verification_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  department: string;
  specialization: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
  technologies: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image_url: string;
  category: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSettings {
  id: string;
  email: string;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  contact_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number | null;
  uploaded_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Database shape for Supabase typed client
// ============================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>;
      };
      home_content: {
        Row: HomeContent;
        Insert: Omit<HomeContent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<HomeContent, 'id' | 'created_at' | 'updated_at'>>;
      };
      about_content: {
        Row: AboutContent;
        Insert: Omit<AboutContent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<AboutContent, 'id' | 'created_at' | 'updated_at'>>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      hackathons: {
        Row: Hackathon;
        Insert: Omit<Hackathon, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Hackathon, 'id' | 'created_at' | 'updated_at'>>;
      };
      achievements: {
        Row: Achievement;
        Insert: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Achievement, 'id' | 'created_at' | 'updated_at'>>;
      };
      certifications: {
        Row: Certification;
        Insert: Omit<Certification, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Certification, 'id' | 'created_at' | 'updated_at'>>;
      };
      education: {
        Row: Education;
        Insert: Omit<Education, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Education, 'id' | 'created_at' | 'updated_at'>>;
      };
      experience: {
        Row: Experience;
        Insert: Omit<Experience, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Experience, 'id' | 'created_at' | 'updated_at'>>;
      };
      gallery: {
        Row: GalleryItem;
        Insert: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>>;
      };
      contact_settings: {
        Row: ContactSettings;
        Insert: Omit<ContactSettings, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ContactSettings, 'id' | 'created_at' | 'updated_at'>>;
      };
      resume: {
        Row: Resume;
        Insert: Omit<Resume, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Resume, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
