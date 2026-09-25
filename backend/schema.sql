-- ==============================================================================
-- Portfolio Architecture: Supabase Database Schema (Phase 2)
-- Owner: VIJAYARAGAVAA V (RTL Design & Verification Engineer)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Projects Table
create table if not exists public.projects (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    category text not null,
    period text not null,
    summary text not null,
    description text not null,
    tech_stack text[] not null default '{}',
    architecture_overview text,
    verilog_snippet text,
    metrics jsonb default '{}'::jsonb,
    github_url text,
    live_demo_url text,
    image_url text,
    featured boolean default false,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Skills Table
create table if not exists public.skills (
    id uuid primary key default uuid_generate_v4(),
    category text not null,
    accent_color text not null default '#00d9ff',
    items jsonb not null default '[]'::jsonb,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Hackathons Table
create table if not exists public.hackathons (
    id uuid primary key default uuid_generate_v4(),
    event_name text not null,
    organizer text not null,
    project_title text not null,
    award text not null,
    date text not null,
    summary text not null,
    metrics jsonb default '{}'::jsonb,
    image_url text,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Achievements Table
create table if not exists public.achievements (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    category text not null,
    organization text not null,
    year text not null,
    description text not null,
    badge_label text,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Certifications Table
create table if not exists public.certifications (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    issuer text not null,
    issue_date text not null,
    credential_id text,
    credential_url text,
    skills_covered text[] not null default '{}',
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Gallery Items Table
create table if not exists public.gallery_items (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    category text not null,
    image_url text not null,
    caption text not null,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Contact Messages Table (Submissions from public website)
create table if not exists public.contact_messages (
    id uuid primary key default uuid_generate_v4(),
    sender_name text not null,
    sender_email text not null,
    subject text not null,
    message text not null,
    read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- Public: Read-only access to published portfolio data & insert access to messages
-- Authenticated Admin: Full access (select, insert, update, delete)
-- ==============================================================================

alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.hackathons enable row level security;
alter table public.achievements enable row level security;
alter table public.certifications enable row level security;
alter table public.gallery_items enable row level security;
alter table public.contact_messages enable row level security;

-- Public read policies
create policy "Allow public read on projects" on public.projects for select using (true);
create policy "Allow public read on skills" on public.skills for select using (true);
create policy "Allow public read on hackathons" on public.hackathons for select using (true);
create policy "Allow public read on achievements" on public.achievements for select using (true);
create policy "Allow public read on certifications" on public.certifications for select using (true);
create policy "Allow public read on gallery_items" on public.gallery_items for select using (true);

-- Public insert policy for contact messages
create policy "Allow public insert on contact_messages" on public.contact_messages for insert with check (true);

-- Admin CRUD policies
create policy "Allow authenticated admin all on projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin all on skills" on public.skills for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin all on hackathons" on public.hackathons for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin all on achievements" on public.achievements for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin all on certifications" on public.certifications for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin all on gallery_items" on public.gallery_items for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin all on contact_messages" on public.contact_messages for all using (auth.role() = 'authenticated');
