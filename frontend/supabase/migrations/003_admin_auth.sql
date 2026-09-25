-- ============================================================
-- 003_admin_auth.sql
-- Migration for Admin Authentication and Authorization
-- ============================================================

-- 1. Create admin_profiles table
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Only admins can see admin_profiles (using a simple check for safety to avoid recursion initially)
-- A user can see their own profile
CREATE POLICY "Admins can view their own profile" 
    ON public.admin_profiles 
    FOR SELECT 
    USING (auth.uid() = id);

-- 2. Create secure admin check function
-- Must be SECURITY DEFINER to bypass RLS when checking admin_profiles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_is_admin BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE id = auth.uid()
        AND is_active = true
    ) INTO v_is_admin;
    
    RETURN COALESCE(v_is_admin, false);
END;
$$;

-- 3. Update RLS policies for all portfolio tables to allow admin operations

-- profiles
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update profiles" ON public.profiles FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE USING (public.is_admin());

-- site_settings
CREATE POLICY "Admins can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update site_settings" ON public.site_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete site_settings" ON public.site_settings FOR DELETE USING (public.is_admin());

-- home_content
CREATE POLICY "Admins can insert home_content" ON public.home_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update home_content" ON public.home_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete home_content" ON public.home_content FOR DELETE USING (public.is_admin());

-- about_content
CREATE POLICY "Admins can insert about_content" ON public.about_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update about_content" ON public.about_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete about_content" ON public.about_content FOR DELETE USING (public.is_admin());

-- skills
CREATE POLICY "Admins can insert skills" ON public.skills FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update skills" ON public.skills FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete skills" ON public.skills FOR DELETE USING (public.is_admin());

-- projects
CREATE POLICY "Admins can insert projects" ON public.projects FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update projects" ON public.projects FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE USING (public.is_admin());

-- hackathons
CREATE POLICY "Admins can insert hackathons" ON public.hackathons FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update hackathons" ON public.hackathons FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete hackathons" ON public.hackathons FOR DELETE USING (public.is_admin());

-- achievements
CREATE POLICY "Admins can insert achievements" ON public.achievements FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update achievements" ON public.achievements FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete achievements" ON public.achievements FOR DELETE USING (public.is_admin());

-- certifications
CREATE POLICY "Admins can insert certifications" ON public.certifications FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update certifications" ON public.certifications FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete certifications" ON public.certifications FOR DELETE USING (public.is_admin());

-- education
CREATE POLICY "Admins can insert education" ON public.education FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update education" ON public.education FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete education" ON public.education FOR DELETE USING (public.is_admin());

-- experience
CREATE POLICY "Admins can insert experience" ON public.experience FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update experience" ON public.experience FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete experience" ON public.experience FOR DELETE USING (public.is_admin());

-- gallery
CREATE POLICY "Admins can insert gallery" ON public.gallery FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update gallery" ON public.gallery FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete gallery" ON public.gallery FOR DELETE USING (public.is_admin());

-- contact_settings
CREATE POLICY "Admins can insert contact_settings" ON public.contact_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update contact_settings" ON public.contact_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete contact_settings" ON public.contact_settings FOR DELETE USING (public.is_admin());

-- resume
CREATE POLICY "Admins can insert resume" ON public.resume FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update resume" ON public.resume FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete resume" ON public.resume FOR DELETE USING (public.is_admin());

-- The initial schema should already have public read policies in place, we are just adding admin write policies.
