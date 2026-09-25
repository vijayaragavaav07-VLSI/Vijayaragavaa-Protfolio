-- ============================================================
-- Migration: 001_initial_schema.sql
-- Portfolio: VIJAYARAGAVAA V — RTL / VLSI Engineer
-- Description: Full portfolio database schema with RLS policies
-- ============================================================

-- Enable the UUID extension
create extension if not exists "uuid-ossp";

-- Utility function: auto-update updated_at on any row change
create or replace function handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- TABLE: profiles
-- ============================================================
create table if not exists public.profiles (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text not null,
  role        text not null,
  institution text not null default '',
  specialization text not null default '',
  profile_image_url text,
  bio         text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: site_settings
-- ============================================================
create table if not exists public.site_settings (
  id               uuid primary key default uuid_generate_v4(),
  site_title       text not null default 'VIJAYARAGAVAA V — RTL / VLSI Portfolio',
  site_description text not null default '',
  logo_url         text,
  favicon_url      text,
  primary_email    text not null default '',
  linkedin_url     text,
  github_url       text,
  youtube_url      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: home_content
-- ============================================================
create table if not exists public.home_content (
  id                uuid primary key default uuid_generate_v4(),
  badge_text        text not null default '',
  hero_title        text not null default '',
  hero_highlight    text not null default '',
  hero_description  text not null default '',
  profile_image_url text,
  email             text not null default '',
  linkedin_url      text,
  github_url        text,
  youtube_url       text,
  resume_url        text,
  visible           boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create trigger trg_home_content_updated_at
  before update on public.home_content
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: about_content
-- ============================================================
create table if not exists public.about_content (
  id                    uuid primary key default uuid_generate_v4(),
  section_title         text not null default 'About',
  short_bio             text not null default '',
  engineering_philosophy text not null default '',
  institution           text not null default '',
  specialization        text not null default '',
  primary_focus         text not null default '',
  target_hardware       text not null default '',
  visible               boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create trigger trg_about_content_updated_at
  before update on public.about_content
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: skills
-- ============================================================
create table if not exists public.skills (
  id          uuid primary key default uuid_generate_v4(),
  category    text not null,
  name        text not null,
  description text not null default '',
  technology  text,
  sort_order  integer not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_skills_category on public.skills(category);
create index if not exists idx_skills_sort_order on public.skills(sort_order);
create trigger trg_skills_updated_at
  before update on public.skills
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: projects
-- ============================================================
create table if not exists public.projects (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  short_description text not null default '',
  description       text not null default '',
  image_url         text,
  technologies      text[] not null default '{}',
  role              text not null default '',
  status            text not null default 'Completed',
  github_url        text,
  project_url       text,
  sort_order        integer not null default 0,
  published         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_projects_published on public.projects(published);
create index if not exists idx_projects_sort_order on public.projects(sort_order);
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: hackathons
-- ============================================================
create table if not exists public.hackathons (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  award            text not null default '',
  level            text not null default '',
  description      text not null default '',
  role             text not null default '',
  team_size        text,
  outcome          text,
  image_url        text,
  architecture_url text,
  sort_order       integer not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists idx_hackathons_published on public.hackathons(published);
create trigger trg_hackathons_updated_at
  before update on public.hackathons
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: achievements
-- ============================================================
create table if not exists public.achievements (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  organization     text not null default '',
  description      text not null default '',
  achievement_date text,
  verification_url text,
  image_url        text,
  sort_order       integer not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists idx_achievements_published on public.achievements(published);
create trigger trg_achievements_updated_at
  before update on public.achievements
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: certifications
-- ============================================================
create table if not exists public.certifications (
  id               uuid primary key default uuid_generate_v4(),
  organization     text not null,
  title            text not null,
  certificate_id   text,
  description      text not null default '',
  issued_date      text not null default '',
  verification_url text,
  image_url        text,
  sort_order       integer not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists idx_certifications_published on public.certifications(published);
create trigger trg_certifications_updated_at
  before update on public.certifications
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: education
-- ============================================================
create table if not exists public.education (
  id             uuid primary key default uuid_generate_v4(),
  institution    text not null,
  degree         text not null,
  department     text not null default '',
  specialization text,
  start_date     text,
  end_date       text,
  description    text,
  sort_order     integer not null default 0,
  published      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_education_published on public.education(published);
create trigger trg_education_updated_at
  before update on public.education
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: experience
-- ============================================================
create table if not exists public.experience (
  id           uuid primary key default uuid_generate_v4(),
  organization text not null,
  position     text not null,
  description  text not null default '',
  start_date   text,
  end_date     text,
  technologies text[] not null default '{}',
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_experience_published on public.experience(published);
create trigger trg_experience_updated_at
  before update on public.experience
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: gallery
-- ============================================================
create table if not exists public.gallery (
  id         uuid primary key default uuid_generate_v4(),
  title      text not null default '',
  caption    text not null default '',
  image_url  text not null,
  category   text,
  sort_order integer not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_gallery_published on public.gallery(published);
create index if not exists idx_gallery_category on public.gallery(category);
create trigger trg_gallery_updated_at
  before update on public.gallery
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: contact_settings
-- ============================================================
create table if not exists public.contact_settings (
  id               uuid primary key default uuid_generate_v4(),
  email            text not null default '',
  linkedin_url     text,
  github_url       text,
  youtube_url      text,
  contact_enabled  boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create trigger trg_contact_settings_updated_at
  before update on public.contact_settings
  for each row execute procedure handle_updated_at();

-- ============================================================
-- TABLE: resume
-- ============================================================
create table if not exists public.resume (
  id          uuid primary key default uuid_generate_v4(),
  file_name   text not null,
  file_url    text not null,
  file_size   integer,
  uploaded_at timestamptz not null default now(),
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint one_active_resume check (true) -- enforce uniqueness at app layer
);
create index if not exists idx_resume_is_active on public.resume(is_active);
create trigger trg_resume_updated_at
  before update on public.resume
  for each row execute procedure handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Public: SELECT only on published/visible rows
-- Admin: Full access (roles managed via Supabase Auth — Phase 3)
-- ============================================================

alter table public.profiles          enable row level security;
alter table public.site_settings     enable row level security;
alter table public.home_content      enable row level security;
alter table public.about_content     enable row level security;
alter table public.skills            enable row level security;
alter table public.projects          enable row level security;
alter table public.hackathons        enable row level security;
alter table public.achievements      enable row level security;
alter table public.certifications    enable row level security;
alter table public.education         enable row level security;
alter table public.experience        enable row level security;
alter table public.gallery           enable row level security;
alter table public.contact_settings  enable row level security;
alter table public.resume            enable row level security;

-- Public READ policies (anon role, published/visible rows only)
create policy "public_read_profiles"
  on public.profiles for select to anon using (true);

create policy "public_read_site_settings"
  on public.site_settings for select to anon using (true);

create policy "public_read_home_content"
  on public.home_content for select to anon using (visible = true);

create policy "public_read_about_content"
  on public.about_content for select to anon using (visible = true);

create policy "public_read_skills"
  on public.skills for select to anon using (visible = true);

create policy "public_read_projects"
  on public.projects for select to anon using (published = true);

create policy "public_read_hackathons"
  on public.hackathons for select to anon using (published = true);

create policy "public_read_achievements"
  on public.achievements for select to anon using (published = true);

create policy "public_read_certifications"
  on public.certifications for select to anon using (published = true);

create policy "public_read_education"
  on public.education for select to anon using (published = true);

create policy "public_read_experience"
  on public.experience for select to anon using (published = true);

create policy "public_read_gallery"
  on public.gallery for select to anon using (published = true);

create policy "public_read_contact_settings"
  on public.contact_settings for select to anon using (contact_enabled = true);

create policy "public_read_resume"
  on public.resume for select to anon using (is_active = true);

-- Authenticated (admin) FULL ACCESS policies
-- (Admin Auth management will be set up in Phase 3 / Step 3)
create policy "admin_all_profiles"
  on public.profiles for all to authenticated using (true) with check (true);

create policy "admin_all_site_settings"
  on public.site_settings for all to authenticated using (true) with check (true);

create policy "admin_all_home_content"
  on public.home_content for all to authenticated using (true) with check (true);

create policy "admin_all_about_content"
  on public.about_content for all to authenticated using (true) with check (true);

create policy "admin_all_skills"
  on public.skills for all to authenticated using (true) with check (true);

create policy "admin_all_projects"
  on public.projects for all to authenticated using (true) with check (true);

create policy "admin_all_hackathons"
  on public.hackathons for all to authenticated using (true) with check (true);

create policy "admin_all_achievements"
  on public.achievements for all to authenticated using (true) with check (true);

create policy "admin_all_certifications"
  on public.certifications for all to authenticated using (true) with check (true);

create policy "admin_all_education"
  on public.education for all to authenticated using (true) with check (true);

create policy "admin_all_experience"
  on public.experience for all to authenticated using (true) with check (true);

create policy "admin_all_gallery"
  on public.gallery for all to authenticated using (true) with check (true);

create policy "admin_all_contact_settings"
  on public.contact_settings for all to authenticated using (true) with check (true);

create policy "admin_all_resume"
  on public.resume for all to authenticated using (true) with check (true);
