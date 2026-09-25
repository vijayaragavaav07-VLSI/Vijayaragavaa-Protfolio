# Supabase Setup Guide
**Portfolio: VIJAYARAGAVAA V — RTL / VLSI Engineer**

This guide walks through creating a Supabase project, configuring environment variables, running the database migration, and verifying the connection.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**.
3. Fill in:
   - **Name:** `vijayaragavaa-portfolio` (or any name you prefer)
   - **Database Password:** Choose a strong password and **save it securely** — you will need it for direct Postgres access.
   - **Region:** Choose the region closest to India (e.g., `ap-south-1` — Mumbai or Singapore)
4. Click **Create new project**. Wait 1–2 minutes for provisioning.

---

## 2. Locate Your Project URL

1. In your Supabase dashboard, go to **Project Settings** (gear icon, bottom-left).
2. Click the **API** tab.
3. Copy the **Project URL** — it looks like:
   ```
   https://xxxxxxxxxxxxxxxx.supabase.co
   ```

---

## 3. Locate Your Publishable (anon) Key

On the same **API** settings page:

- Under **Project API keys**, copy the key labelled **`anon`** / **`public`**.
- This key is safe to include in frontend code — it is **not** a secret.
- **⚠ NEVER copy or use the `service_role` key in the frontend.** That key bypasses RLS and must stay server-side only.

---

## 4. Configure Your Local .env

From inside the `frontend/` directory:

```bash
# Copy the template
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠ **Never commit `.env` to Git.** It is already excluded by `.gitignore`.

---

## 5. Run the SQL Migration

### Option A — Supabase SQL Editor (Recommended for beginners)

1. In your Supabase dashboard, click **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open `supabase/migrations/001_initial_schema.sql` in your code editor.
4. Copy the entire file contents and paste into the SQL Editor.
5. Click **Run** (or press `Ctrl+Enter`).
6. You should see: `Success. No rows returned.`
7. Repeat for `supabase/migrations/002_seed_portfolio.sql` to insert initial content.

### Option B — Supabase CLI (Advanced)

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login
supabase login

# Link to your project (get project-ref from dashboard URL)
supabase link --project-ref xxxxxxxxxxxxxxxx

# Push migrations
supabase db push
```

---

## 6. Verify Tables Exist

1. In Supabase dashboard, go to **Table Editor** (left sidebar).
2. You should see all 14 tables listed:
   - `profiles`, `site_settings`, `home_content`, `about_content`
   - `skills`, `projects`, `hackathons`, `achievements`
   - `certifications`, `education`, `experience`, `gallery`
   - `contact_settings`, `resume`

---

## 7. Verify RLS is Enabled

1. Go to **Authentication → Policies** in your Supabase dashboard.
2. Confirm each table shows RLS = **enabled**.
3. Confirm each table has a `public_read_*` SELECT policy for the `anon` role.

---

## 8. Test the Connection

Start the development server:

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Expected behaviour:**
- If `.env` is not yet configured: a yellow warning badge appears in the bottom-right corner (dev mode only): `⚠ Supabase not configured — using static data.`
- If `.env` is configured correctly: the badge disappears and the site fetches live content from Supabase.
- Check the browser console — there should be no errors if credentials are correct.

---

## 9. Upload Storage Assets (Optional)

1. In Supabase dashboard, go to **Storage**.
2. Click **New bucket** → name it `portfolio-media`.
3. Set it to **Public**.
4. Upload:
   - Your resume PDF
   - Profile photo
   - Gallery images
   - Hackathon prototype photos
5. Copy the public URLs and update the corresponding rows in your database tables (e.g., `resume.file_url`, `home_content.profile_image_url`).

---

## Security Checklist

- [x] `.env` is in `.gitignore`
- [x] Only `anon` public key is used in frontend
- [x] `service_role` key is never in any frontend file
- [x] RLS is enabled on all 14 tables
- [x] Public users can only SELECT published/visible rows
- [x] No credentials are hardcoded anywhere in source code
