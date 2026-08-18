-- Promote founder accounts to admin.
-- Run in Supabase SQL Editor after the Auth users exist
-- (or after scripts/setup-founder-admins.mjs creates them).

update public.profiles
set role = 'admin'
where id in (
  select id from auth.users
  where email in (
    'salmanmdsalman2829@gmail.com',
    'jashwanthkorlapallyy@gmail.com'
  )
);

-- Verify:
-- select p.id, u.email, p.role
-- from public.profiles p
-- join auth.users u on u.id = p.id;
