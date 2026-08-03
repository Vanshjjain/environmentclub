-- ==========================================================
-- SUPABASE SCHEMA FOR ENVIRONMENT CLUB
-- Copy and paste this into the Supabase SQL Editor to run it.
-- ==========================================================

-- 1. PROFILES TABLE (Stores user info and role)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure profiles table has the required columns if it already exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. EVENTS TABLE (Stores timeline/timings of club events)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    year INTEGER NOT NULL,
    kind TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    upcoming BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. GALLERY TABLE (Stores uploaded photo URLs and captions)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    src TEXT NOT NULL, -- Storage URL or Base64 fallback
    caption TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TEAM TABLE (Stores club coordinators, presidents, team roster)
CREATE TABLE IF NOT EXISTS public.team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 6. HELPER FUNCTIONS
-- ==========================================
-- Check if user is admin safely to prevent infinite recursion in RLS policies.
-- Declared SECURITY DEFINER to bypass RLS checks for queries inside it.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
    OR auth.jwt()->>'email' = 'vanshjain50355@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- 7. SECURITY POLICIES (RLS POLICIES)
-- ==========================================

-- Clean up pre-existing policies to allow replacement
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can do everything on profiles" ON public.profiles;

DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
DROP POLICY IF EXISTS "Admins can do everything on events" ON public.events;

DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON public.gallery;
DROP POLICY IF EXISTS "Admins can do everything on gallery" ON public.gallery;

DROP POLICY IF EXISTS "Team is viewable by everyone" ON public.team;
DROP POLICY IF EXISTS "Admins can do everything on team" ON public.team;

-- profiles: viewable by anyone, writeable by own user or admin
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can do everything on profiles" ON public.profiles
    FOR ALL USING (public.is_admin());

-- events: viewable by anyone, writeable by admin
CREATE POLICY "Events are viewable by everyone" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on events" ON public.events
    FOR ALL USING (public.is_admin());

-- gallery: viewable by anyone, writeable by admin
CREATE POLICY "Gallery is viewable by everyone" ON public.gallery
    FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on gallery" ON public.gallery
    FOR ALL USING (public.is_admin());

-- team: viewable by anyone, writeable by admin
CREATE POLICY "Team is viewable by everyone" ON public.team
    FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on team" ON public.team
    FOR ALL USING (public.is_admin());

-- ==========================================
-- 7. AUTOMATIC USER PROFILE TRIGGER
-- ==========================================
-- Automatically creates a profile when a new user signs up.
-- Also auto-assigns 'admin' role to vanshjain50355@gmail.com.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    CASE WHEN new.email = 'vanshjain50355@gmail.com' THEN 'admin' ELSE 'user' END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. GRANT PRIVILEGES TO ROLES (Ensures API can query these tables)
GRANT ALL ON public.profiles TO anon, authenticated, service_role;
GRANT ALL ON public.events TO anon, authenticated, service_role;
GRANT ALL ON public.gallery TO anon, authenticated, service_role;
GRANT ALL ON public.team TO anon, authenticated, service_role;
