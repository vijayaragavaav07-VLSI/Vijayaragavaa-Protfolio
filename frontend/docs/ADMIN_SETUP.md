# Admin Setup and Security Guide

This document explains how the Admin Authentication, Authorization, and CMS access are configured for the portfolio.

## 1. How to Create the First Admin

There is no public registration page for administrators to prevent unauthorized access. The first admin account must be created manually using Supabase.

1. **Create the User in Supabase Auth:**
   - Go to your Supabase Dashboard -> **Authentication** -> **Users**.
   - Click **Add User** -> **Create New User**.
   - Enter an email and a strong password.

2. **Copy the User UUID:**
   - Once the user is created, copy the generated `User UID`.

3. **Insert into `admin_profiles` Table:**
   - Go to the **SQL Editor** in Supabase and run the following query, replacing the UUID and email with your copied values:
   ```sql
   INSERT INTO public.admin_profiles (id, email, role, is_active)
   VALUES ('YOUR-USER-UUID', 'admin@example.com', 'admin', true);
   ```

4. **Login:**
   - Navigate to `/admin/login` on your portfolio site and log in with the email and password you created in step 1.

## 2. How Admin Authentication Works

- **Supabase Auth:** The portfolio uses Supabase's built-in authentication (`supabase.auth.signInWithPassword`).
- **Context:** A React context (`AuthContext.tsx`) manages the session state, listening to auth changes via `onAuthStateChange`.
- **Protected Routes:** The `<ProtectedAdminRoute />` component wraps the admin dashboard. It verifies both authentication (session exists) and authorization (user is an active admin).

## 3. How Admin Authorization Works

Authentication alone is not enough. The system enforces authorization using the `admin_profiles` table.

- **Frontend Check:** `AuthContext.tsx` queries the `admin_profiles` table for the authenticated user's ID where `is_active = true`. If this query fails or returns empty, the user is denied access to the admin UI.
- **Database Enforcement (RLS):** A secure PostgreSQL function `public.is_admin()` checks if `auth.uid()` exists in `admin_profiles` and is active. This function runs with `SECURITY DEFINER` to bypass RLS on the `admin_profiles` table itself.

## 4. How RLS Protects Admin Operations

Row Level Security (RLS) is enabled on all portfolio content tables (`projects`, `skills`, `home_content`, etc.).

- **Public Users (Anon/Authenticated Non-Admins):** Can only `SELECT` published/visible content. They cannot `INSERT`, `UPDATE`, or `DELETE`.
- **Admins:** The RLS policies use the `public.is_admin()` function. If it returns true, the user is granted `INSERT`, `UPDATE`, and `DELETE` privileges.

*Security Warning:* Never create a policy like `FOR ALL USING (auth.role() = 'authenticated')` because it would allow any user who signs up to modify your portfolio.

## 5. Security Warnings

- **Never use the `SERVICE_ROLE_KEY`:** This key bypasses all RLS policies. It should NEVER be exposed in the frontend `.env` file or code. Only use the `anon` (publishable) key.
- **Do not trust LocalStorage:** The frontend does not rely on a simple `localStorage.getItem('admin') == 'true'` check. It verifies the session cryptographically with Supabase and enforces authorization at the database level.
- **Keep `admin_profiles` secure:** The `admin_profiles` table RLS only allows users to view their own profile, preventing non-admins from listing the admins.

## 6. How to Test

1. **Test Login:** Navigate to `/admin/login` and log in with the admin credentials. You should be redirected to `/admin`.
2. **Test Unauthorized Access:** Try navigating directly to `/admin` without logging in. You should be redirected back to the login page.
3. **Test Non-Admin Access:** Create a normal user in Supabase (but do not add them to `admin_profiles`). Log in with this user. You should see an "ACCESS DENIED" screen.
4. **Test CRUD:** When fully implemented, verify that you can add, edit, and delete items from the CMS, and that these changes are reflected on the public portfolio.
