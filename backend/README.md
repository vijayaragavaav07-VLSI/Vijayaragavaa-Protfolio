# Backend Architecture & Supabase Specification (Phase 2)

This directory houses the backend infrastructure, database migrations, security rules, and seed scripts for **VIJAYARAGAVAA V's Portfolio System**.

## 1. Planned Services
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase GoTrue Auth (Admin Email + Password / 2FA)
- **Object Storage:** Supabase Storage (`portfolio-media` bucket for resume PDFs and lab photos)
- **API Access:** PostgREST via Supabase JS Client (`@supabase/supabase-js`)

## 2. Directory Contents
- `schema.sql`: PostgreSQL DDL defining relational tables, foreign keys, and Row Level Security (RLS) policies.
- `seed.sql`: Initial seed data matching the portfolio content from Phase 1.
