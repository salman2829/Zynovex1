import { createAdminClient } from "@/lib/supabase/admin";

/** Returns true if an Auth user already has this email. */
export async function authEmailExists(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;

  const admin = createAdminClient();
  const perPage = 200;
  let page = 1;

  // Agency-scale user list — paginate until found or exhausted
  while (page <= 25) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    const users = data.users ?? [];
    if (users.some((u) => u.email?.toLowerCase() === normalized)) {
      return true;
    }

    if (users.length < perPage) return false;
    page += 1;
  }

  return false;
}
