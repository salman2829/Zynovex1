"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const trimmedEmail = email.trim().toLowerCase();

      const {
        data: { session: existing },
      } = await supabase.auth.getSession();

      // Only clear session if a different account is already signed in
      if (existing?.user?.email?.toLowerCase() !== trimmedEmail) {
        await supabase.auth.signOut();
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signInError) throw signInError;

      const userId = data.user?.id;
      if (!userId) throw new Error("Sign-in failed. Try again.");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        setError(
          "This portal is for Zynovex admins only. Client accounts must use the client login.",
        );
        setLoading(false);
        return;
      }

      window.location.assign("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-navy/70">
          Admin email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-navy/70">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {loading ? "Verifying…" : "Enter admin portal"}
      </button>
    </form>
  );
}
