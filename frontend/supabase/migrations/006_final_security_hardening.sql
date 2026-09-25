-- ============================================================
-- 006_final_security_hardening.sql
-- Final RLS Security Hardening for Portfolio CMS
-- ============================================================
--
-- CONTEXT:
-- 001_initial_schema.sql created overly-broad "admin_all_*"
-- policies that grant full write access to ANY authenticated
-- Supabase user (using(true) / with check(true)).
-- This means any signed-in user - not just admins - could
-- insert, update, or delete portfolio CMS content.
--
-- 003_admin_auth.sql added the correct is_admin()-gated
-- INSERT/UPDATE/DELETE policies, but the broad policies from
-- 001 remain and override the intent.
--
-- THIS MIGRATION:
--   1. DROPs the 14 insecure "admin_all_*" policies from 001.
--   2. ADDs "Admins can select *" policies (using is_admin())
--      so the admin CMS can read ALL rows including unpublished.
--
-- IDEMPOTENT: Safe to re-run. Every CREATE POLICY is preceded
-- by DROP POLICY IF EXISTS so duplicate-policy errors cannot occur.
--
-- PRESERVED (not touched):
--   - All "public_read_*" policies (anon SELECT on published rows)
--   - All "Admins can insert/update/delete *" from 003_admin_auth.sql
--   - admin_profiles table and policies
--   - Storage bucket and policies
--   - All table columns and data
--
-- RESULT AFTER APPLYING:
--   - Public visitors: SELECT published/visible rows only (anon)
--   - Admin CMS: SELECT all rows + INSERT/UPDATE/DELETE
--     (requires public.is_admin() = true)
--   - Normal authenticated non-admin users: NO write access
--
-- DO NOT RUN supabase db reset or modify 001-005 migrations.
-- Apply this once in the Supabase SQL Editor.
-- ============================================================

-- ============================================================
-- STEP 1: Remove insecure broad "admin_all_*" policies from
-- 001_initial_schema.sql (granted to ALL authenticated users).
-- Already idempotent via DROP ... IF EXISTS.
-- ============================================================

DROP POLICY IF EXISTS "admin_all_profiles"         ON public.profiles;
DROP POLICY IF EXISTS "admin_all_site_settings"    ON public.site_settings;
DROP POLICY IF EXISTS "admin_all_home_content"     ON public.home_content;
DROP POLICY IF EXISTS "admin_all_about_content"    ON public.about_content;
DROP POLICY IF EXISTS "admin_all_skills"           ON public.skills;
DROP POLICY IF EXISTS "admin_all_projects"         ON public.projects;
DROP POLICY IF EXISTS "admin_all_hackathons"       ON public.hackathons;
DROP POLICY IF EXISTS "admin_all_achievements"     ON public.achievements;
DROP POLICY IF EXISTS "admin_all_certifications"   ON public.certifications;
DROP POLICY IF EXISTS "admin_all_education"        ON public.education;
DROP POLICY IF EXISTS "admin_all_experience"       ON public.experience;
DROP POLICY IF EXISTS "admin_all_gallery"          ON public.gallery;
DROP POLICY IF EXISTS "admin_all_contact_settings" ON public.contact_settings;
DROP POLICY IF EXISTS "admin_all_resume"           ON public.resume;

-- ============================================================
-- STEP 2: Add admin SELECT policies gated on public.is_admin().
-- These allow the Admin CMS to read ALL rows (including
-- unpublished ones) - needed so the admin can manage content
-- that the public cannot yet see.
--
-- Each policy is dropped first (IF EXISTS) so this block is
-- safe to re-run even if a previous partial run already created
-- some of these policies.
--
-- The INSERT/UPDATE/DELETE equivalents already exist from
-- 003_admin_auth.sql and are NOT duplicated here.
-- ============================================================

-- profiles
DROP POLICY IF EXISTS "Admins can select profiles" ON public.profiles;
CREATE POLICY "Admins can select profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- site_settings
DROP POLICY IF EXISTS "Admins can select site_settings" ON public.site_settings;
CREATE POLICY "Admins can select site_settings"
  ON public.site_settings FOR SELECT
  USING (public.is_admin());

-- home_content
DROP POLICY IF EXISTS "Admins can select home_content" ON public.home_content;
CREATE POLICY "Admins can select home_content"
  ON public.home_content FOR SELECT
  USING (public.is_admin());

-- about_content
DROP POLICY IF EXISTS "Admins can select about_content" ON public.about_content;
CREATE POLICY "Admins can select about_content"
  ON public.about_content FOR SELECT
  USING (public.is_admin());

-- skills
DROP POLICY IF EXISTS "Admins can select skills" ON public.skills;
CREATE POLICY "Admins can select skills"
  ON public.skills FOR SELECT
  USING (public.is_admin());

-- projects
DROP POLICY IF EXISTS "Admins can select projects" ON public.projects;
CREATE POLICY "Admins can select projects"
  ON public.projects FOR SELECT
  USING (public.is_admin());

-- hackathons
DROP POLICY IF EXISTS "Admins can select hackathons" ON public.hackathons;
CREATE POLICY "Admins can select hackathons"
  ON public.hackathons FOR SELECT
  USING (public.is_admin());

-- achievements
DROP POLICY IF EXISTS "Admins can select achievements" ON public.achievements;
CREATE POLICY "Admins can select achievements"
  ON public.achievements FOR SELECT
  USING (public.is_admin());

-- certifications
DROP POLICY IF EXISTS "Admins can select certifications" ON public.certifications;
CREATE POLICY "Admins can select certifications"
  ON public.certifications FOR SELECT
  USING (public.is_admin());

-- education
DROP POLICY IF EXISTS "Admins can select education" ON public.education;
CREATE POLICY "Admins can select education"
  ON public.education FOR SELECT
  USING (public.is_admin());

-- experience
DROP POLICY IF EXISTS "Admins can select experience" ON public.experience;
CREATE POLICY "Admins can select experience"
  ON public.experience FOR SELECT
  USING (public.is_admin());

-- gallery
DROP POLICY IF EXISTS "Admins can select gallery" ON public.gallery;
CREATE POLICY "Admins can select gallery"
  ON public.gallery FOR SELECT
  USING (public.is_admin());

-- contact_settings
DROP POLICY IF EXISTS "Admins can select contact_settings" ON public.contact_settings;
CREATE POLICY "Admins can select contact_settings"
  ON public.contact_settings FOR SELECT
  USING (public.is_admin());

-- resume
DROP POLICY IF EXISTS "Admins can select resume" ON public.resume;
CREATE POLICY "Admins can select resume"
  ON public.resume FOR SELECT
  USING (public.is_admin());

-- ============================================================
-- VERIFICATION SUMMARY (after applying this migration):
--
-- Table               | anon SELECT | authed non-admin | admin
-- --------------------|-------------|------------------|------
-- profiles            | published   | none             | all
-- site_settings       | all         | none             | all
-- home_content        | visible=t   | none             | all
-- about_content       | visible=t   | none             | all
-- skills              | visible=t   | none             | all
-- projects            | published=t | none             | all
-- hackathons          | published=t | none             | all
-- achievements        | published=t | none             | all
-- certifications      | published=t | none             | all
-- education           | published=t | none             | all
-- experience          | published=t | none             | all
-- gallery             | published=t | none             | all
-- contact_settings    | enabled=t   | none             | all
-- resume              | active=t    | none             | all
-- ============================================================
