-- Zynovex Technologies — Supabase schema
-- Run this in the Supabase SQL Editor

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  role text default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Contact / lead inquiries
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  email text not null,
  company text,
  service_interest text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiries_user_id_idx
  on public.contact_inquiries (user_id);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

alter table public.contact_inquiries enable row level security;

create policy "Anyone can submit an inquiry"
  on public.contact_inquiries for insert
  with check (true);

create policy "Users can view own inquiries"
  on public.contact_inquiries for select
  using (auth.uid() = user_id);

-- Newsletter / community waitlist
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);
