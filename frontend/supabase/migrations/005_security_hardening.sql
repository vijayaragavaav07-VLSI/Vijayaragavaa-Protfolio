-- ============================================================
-- 005_security_hardening.sql
-- Migration to harden RLS policies for CMS access
-- ============================================================

-- 1. DROP THE INSECURE BROUGHT-FORWARD POLICIES FROM 001
-- These policies incorrectly granted ALL operations to any authenticated user.

DROP POLICY IF EXISTS "admin_all_profiles" ON public.profiles;
DROP POLICY IF EXISTS "admin_all_site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "admin_all_home_content" ON public.home_content;
DROP POLICY IF EXISTS "admin_all_about_content" ON public.about_content;
DROP POLICY IF EXISTS "admin_all_skills" ON public.skills;
DROP POLICY IF EXISTS "admin_all_projects" ON public.projects;
DROP POLICY IF EXISTS "admin_all_hackathons" ON public.hackathons;
DROP POLICY IF EXISTS "admin_all_achievements" ON public.achievements;
DROP POLICY IF EXISTS "admin_all_certifications" ON public.certifications;
DROP POLICY IF EXISTS "admin_all_education" ON public.education;
DROP POLICY IF EXISTS "admin_all_experience" ON public.experience;
DROP POLICY IF EXISTS "admin_all_gallery" ON public.gallery;
DROP POLICY IF EXISTS "admin_all_contact_settings" ON public.contact_settings;
DROP POLICY IF EXISTS "admin_all_resume" ON public.resume;

-- 2. DROP THE PARTIAL POLICIES FROM 003
-- We will replace these with unified, hardened policies in a single block.

DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

DROP POLICY IF EXISTS "Admins can insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can delete site_settings" ON public.site_settings;

DROP POLICY IF EXISTS "Admins can insert home_content" ON public.home_content;
DROP POLICY IF EXISTS "Admins can update home_content" ON public.home_content;
DROP POLICY IF EXISTS "Admins can delete home_content" ON public.home_content;

DROP POLICY IF EXISTS "Admins can insert about_content" ON public.about_content;
DROP POLICY IF EXISTS "Admins can update about_content" ON public.about_content;
DROP POLICY IF EXISTS "Admins can delete about_content" ON public.about_content;

DROP POLICY IF EXISTS "Admins can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Admins can update skills" ON public.skills;
DROP POLICY IF EXISTS "Admins can delete skills" ON public.skills;

DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;

DROP POLICY IF EXISTS "Admins can insert hackathons" ON public.hackathons;
DROP POLICY IF EXISTS "Admins can update hackathons" ON public.hackathons;
DROP POLICY IF EXISTS "Admins can delete hackathons" ON public.hackathons;

DROP POLICY IF EXISTS "Admins can insert achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admins can update achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admins can delete achievements" ON public.achievements;

DROP POLICY IF EXISTS "Admins can insert certifications" ON public.certifications;
DROP POLICY IF EXISTS "Admins can update certifications" ON public.certifications;
DROP POLICY IF EXISTS "Admins can delete certifications" ON public.certifications;

DROP POLICY IF EXISTS "Admins can insert education" ON public.education;
DROP POLICY IF EXISTS "Admins can update education" ON public.education;
DROP POLICY IF EXISTS "Admins can delete education" ON public.education;

DROP POLICY IF EXISTS "Admins can insert experience" ON public.experience;
DROP POLICY IF EXISTS "Admins can update experience" ON public.experience;
DROP POLICY IF EXISTS "Admins can delete experience" ON public.experience;

DROP POLICY IF EXISTS "Admins can insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admins can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admins can delete gallery" ON public.gallery;

DROP POLICY IF EXISTS "Admins can insert contact_settings" ON public.contact_settings;
DROP POLICY IF EXISTS "Admins can update contact_settings" ON public.contact_settings;
DROP POLICY IF EXISTS "Admins can delete contact_settings" ON public.contact_settings;

DROP POLICY IF EXISTS "Admins can insert resume" ON public.resume;
DROP POLICY IF EXISTS "Admins can update resume" ON public.resume;
DROP POLICY IF EXISTS "Admins can delete resume" ON public.resume;

-- 3. CREATE SECURE UNIFIED ADMIN POLICIES
-- Admin users must be able to SELECT, INSERT, UPDATE, and DELETE using public.is_admin()

-- profiles
CREATE POLICY "Admins can select profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update profiles" ON public.profiles FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE USING (public.is_admin());

-- site_settings
CREATE POLICY "Admins can select site_settings" ON public.site_settings FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update site_settings" ON public.site_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete site_settings" ON public.site_settings FOR DELETE USING (public.is_admin());

-- home_content
CREATE POLICY "Admins can select home_content" ON public.home_content FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert home_content" ON public.home_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update home_content" ON public.home_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete home_content" ON public.home_content FOR DELETE USING (public.is_admin());

-- about_content
CREATE POLICY "Admins can select about_content" ON public.about_content FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert about_content" ON public.about_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update about_content" ON public.about_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete about_content" ON public.about_content FOR DELETE USING (public.is_admin());

-- skills
CREATE POLICY "Admins can select skills" ON public.skills FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert skills" ON public.skills FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update skills" ON public.skills FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete skills" ON public.skills FOR DELETE USING (public.is_admin());

-- projects
CREATE POLICY "Admins can select projects" ON public.projects FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert projects" ON public.projects FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update projects" ON public.projects FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE USING (public.is_admin());

-- hackathons
CREATE POLICY "Admins can select hackathons" ON public.hackathons FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert hackathons" ON public.hackathons FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update hackathons" ON public.hackathons FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete hackathons" ON public.hackathons FOR DELETE USING (public.is_admin());

-- achievements
CREATE POLICY "Admins can select achievements" ON public.achievements FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert achievements" ON public.achievements FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update achievements" ON public.achievements FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete achievements" ON public.achievements FOR DELETE USING (public.is_admin());

-- certifications
CREATE POLICY "Admins can select certifications" ON public.certifications FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert certifications" ON public.certifications FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update certifications" ON public.certifications FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete certifications" ON public.certifications FOR DELETE USING (public.is_admin());

-- education
CREATE POLICY "Admins can select education" ON public.education FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert education" ON public.education FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update education" ON public.education FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete education" ON public.education FOR DELETE USING (public.is_admin());

-- experience
CREATE POLICY "Admins can select experience" ON public.experience FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert experience" ON public.experience FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update experience" ON public.experience FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete experience" ON public.experience FOR DELETE USING (public.is_admin());

-- gallery
CREATE POLICY "Admins can select gallery" ON public.gallery FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert gallery" ON public.gallery FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update gallery" ON public.gallery FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete gallery" ON public.gallery FOR DELETE USING (public.is_admin());

-- contact_settings
CREATE POLICY "Admins can select contact_settings" ON public.contact_settings FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert contact_settings" ON public.contact_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update contact_settings" ON public.contact_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete contact_settings" ON public.contact_settings FOR DELETE USING (public.is_admin());

-- resume
CREATE POLICY "Admins can select resume" ON public.resume FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert resume" ON public.resume FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update resume" ON public.resume FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete resume" ON public.resume FOR DELETE USING (public.is_admin());

-- The initial schema public read policies for visible/published content are PRESERVED untouched.
-- Only public.is_admin() = true will satisfy the above policies for backend write access.
