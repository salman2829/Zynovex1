-- Run in Supabase SQL Editor if referrals table is not created yet.

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  referrer_name text not null,
  referrer_email text not null,
  referrer_phone text not null,
  referrer_upi text,
  client_name text not null,
  client_company text,
  client_email text,
  client_phone text not null,
  service_interest text,
  estimated_budget text,
  notes text not null default '',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'won', 'paid', 'rejected')),
  project_value numeric,
  commission_amount numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists referrals_created_at_idx
  on public.referrals (created_at desc);

create index if not exists referrals_status_idx
  on public.referrals (status);

create index if not exists referrals_user_id_idx
  on public.referrals (user_id);

alter table public.referrals enable row level security;

drop policy if exists "Anyone can submit a referral" on public.referrals;
drop policy if exists "Users can view own referrals" on public.referrals;
drop policy if exists "Admins can update referrals" on public.referrals;

create policy "Anyone can submit a referral"
  on public.referrals for insert
  to anon, authenticated
  with check (true);

create policy "Users can view own referrals"
  on public.referrals for select
  to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins can update referrals"
  on public.referrals for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant insert on table public.referrals to anon, authenticated;
grant select, update on table public.referrals to authenticated;
grant all on table public.referrals to service_role;
