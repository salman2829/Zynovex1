export function hasSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  if (url.includes("your-project") || url.includes("placeholder")) return false;
  if (key.includes("your-anon") || key.includes("placeholder")) return false;

  return true;
}

