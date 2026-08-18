import type { SupabaseClient } from "@supabase/supabase-js";

/** Ensure a profiles row exists for this auth user (idempotent). Never downgrades admin. */
export async function ensureClientProfile(
  supabase: SupabaseClient,
  userId: string,
  fullName?: string,
) {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", userId)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName?.trim() || "",
      role: "client",
    });
    if (error && error.code !== "23505") throw error;
    return "client" as const;
  }

  if (fullName?.trim() && !existing.full_name) {
    await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("id", userId);
  }

  return (existing.role === "admin" ? "admin" : "client") as "admin" | "client";
}

export function portalPath(role: "admin" | "client") {
  return role === "admin" ? "/admin" : "/dashboard";
}
