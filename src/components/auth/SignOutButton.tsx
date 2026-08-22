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
      className="btn-ghost rounded-full px-4 py-2 text-sm font-semibold"
    >
      Sign out
    </button>
  );
}
