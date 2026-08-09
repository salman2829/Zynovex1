"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    try {
      if (!hasSupabaseEnv()) {
        throw new Error(
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
        );
      }

      const supabase = createClient();

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) throw signUpError;

        if (data.session) {
          router.push("/dashboard");
          router.refresh();
          return;
        }

        setInfo("Check your email to confirm your account, then sign in.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) throw signInError;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {info && <p className="text-sm text-accent-deep">{info}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
      >
        {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-sm text-steel">
        {mode === "login" ? (
          <>
            New to Zynovex?{" "}
            <Link href="/auth/signup" className="font-semibold text-accent-deep hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-accent-deep hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
