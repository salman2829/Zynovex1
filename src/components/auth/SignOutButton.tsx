"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent-deep"
    >
      Sign out
    </button>
  );
}
