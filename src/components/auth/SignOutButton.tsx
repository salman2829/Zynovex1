"use client";

import { createClient } from "@/lib/supabase/client";

type Props = {
  redirectTo?: string;
};

export default function SignOutButton({ redirectTo = "/" }: Props) {
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign(redirectTo);
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent/15"
    >
      Sign out
    </button>
  );
}
