-- ============================================================
-- Migration 007: Extended CMS fields + contact_messages table
-- ============================================================

-- HOME CONTENT extended fields
ALTER TABLE public.home_content
  ADD COLUMN IF NOT EXISTS tags               TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS eda_tools         TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS domain_discipline  TEXT NOT NULL DEFAULT 'RTL Design',
  ADD COLUMN IF NOT EXISTS hdl_syntax         TEXT NOT NULL DEFAULT 'Verilog / SystemVerilog',
  ADD COLUMN IF NOT EXISTS verification_method TEXT NOT NULL DEFAULT 'UVM / Testbench',
  ADD COLUMN IF NOT EXISTS ieee_ref           TEXT NOT NULL DEFAULT 'IEEE 1364',
  ADD COLUMN IF NOT EXISTS die_specimen_url   TEXT,
  ADD COLUMN IF NOT EXISTS status_cap         TEXT NOT NULL DEFAULT 'SYNTHESIS READY';

-- ABOUT CONTENT extended fields
ALTER TABLE public.about_content
  ADD COLUMN IF NOT EXISTS profile_icon_url   TEXT,
  ADD COLUMN IF NOT EXISTS philosophy_title   TEXT NOT NULL DEFAULT 'SILICON ENGINEERING PHILOSOPHY',
  ADD COLUMN IF NOT EXISTS principle_1_num    TEXT NOT NULL DEFAULT '01',
  ADD COLUMN IF NOT EXISTS principle_1_title  TEXT NOT NULL DEFAULT 'DETERMINISM',
  ADD COLUMN IF NOT EXISTS principle_1_desc   TEXT NOT NULL DEFAULT 'Synchronous state machine design with clean hazard-free transitions.',
  ADD COLUMN IF NOT EXISTS principle_2_num    TEXT NOT NULL DEFAULT '02',
  ADD COLUMN IF NOT EXISTS principle_2_title  TEXT NOT NULL DEFAULT 'ROBUST CO-VERIFICATION',
  ADD COLUMN IF NOT EXISTS principle_2_desc   TEXT NOT NULL DEFAULT 'Self-checking directed testbenches with corner-case assertion coverage.',
  ADD COLUMN IF NOT EXISTS principle_3_num    TEXT NOT NULL DEFAULT '03',
  ADD COLUMN IF NOT EXISTS principle_3_title  TEXT NOT NULL DEFAULT 'PHYSICAL REALITY',
  ADD COLUMN IF NOT EXISTS principle_3_desc   TEXT NOT NULL DEFAULT 'Designing RTL with clear awareness of LUT utilization, wire delays & setup times.';

-- HACKATHONS extended fields
ALTER TABLE public.hackathons
  ADD COLUMN IF NOT EXISTS prototype_label TEXT NOT NULL DEFAULT 'LIVE PROTOTYPE BENCH',
  ADD COLUMN IF NOT EXISTS sprint_label    TEXT NOT NULL DEFAULT 'PITCH: 36 HRS SPRINT';

-- CONTACT MESSAGES new table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  subject     TEXT,
  message     TEXT        NOT NULL,
  is_read     BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact messages"
  ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read contact messages" ON public.contact_messages;
CREATE POLICY "Admins can read contact messages"
  ON public.contact_messages FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
CREATE POLICY "Admins can update contact messages"
  ON public.contact_messages FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;
CREATE POLICY "Admins can delete contact messages"
  ON public.contact_messages FOR DELETE TO authenticated USING (public.is_admin());