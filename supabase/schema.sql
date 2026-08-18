-- Zynovex Technologies — Supabase schema
-- Paste the FULL script into the SQL Editor and click Run.
-- Safe to re-run.

-- ---------------------------------------------------------------------------
-- Profiles (extends auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  role text default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;

create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Admin helper (used by RLS)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Contact / lead inquiries
-- ---------------------------------------------------------------------------
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  company text,
  service_interest text,
  budget text,
  timeline text,
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

-- Additive columns for existing projects
alter table public.contact_inquiries add column if not exists phone text;
alter table public.contact_inquiries add column if not exists budget text;
alter table public.contact_inquiries add column if not exists timeline text;

do $$
begin
  alter table public.contact_inquiries alter column email drop not null;
exception when others then
  null;
end $$;

do $$
begin
  alter table public.contact_inquiries alter column message set default '';
exception when others then
  null;
end $$;

create index if not exists contact_inquiries_user_id_idx
  on public.contact_inquiries (user_id);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

create index if not exists contact_inquiries_status_idx
  on public.contact_inquiries (status);

alter table public.contact_inquiries enable row level security;

drop policy if exists "Anyone can submit an inquiry" on public.contact_inquiries;
drop policy if exists "Users can view own inquiries" on public.contact_inquiries;
drop policy if exists "Admins can view all inquiries" on public.contact_inquiries;
drop policy if exists "Admins can update inquiries" on public.contact_inquiries;

create policy "Anyone can submit an inquiry"
  on public.contact_inquiries for insert
  to anon, authenticated
  with check (true);

create policy "Users can view own inquiries"
  on public.contact_inquiries for select
  to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins can update inquiries"
  on public.contact_inquiries for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Waitlist
-- ---------------------------------------------------------------------------
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "Anyone can join waitlist" on public.waitlist;

create policy "Anyone can join waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
grant usage on schema public to postgres, anon, authenticated, service_role;

grant select, insert, update on table public.profiles to authenticated;
grant all on table public.profiles to service_role;

grant insert on table public.contact_inquiries to anon, authenticated;
grant select, update on table public.contact_inquiries to authenticated;
grant all on table public.contact_inquiries to service_role;

grant insert on table public.waitlist to anon, authenticated;
grant all on table public.waitlist to service_role;

-- ---------------------------------------------------------------------------
-- Promote founders to admin (run AFTER or AFTER they sign up)
-- Replace emails with the accounts you create in Authentication → Users
-- ---------------------------------------------------------------------------
-- update public.profiles
-- set role = 'admin'
-- where id in (
--   select id from auth.users
--   where email in ('salman@yourdomain.com', 'jashwanth@yourdomain.com')
-- );
