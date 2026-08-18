import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminAuthForm from "@/components/auth/AdminAuthForm";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.role === "admin") {
        redirect("/admin");
      }
    }
  }

  return (
    <div className="page-grade flex min-h-[70vh] items-center px-5 py-28 md:px-8">
      <div className="mx-auto w-full max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">
          Restricted
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
          Admin portal
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-steel">
          For Zynovex founders only. Client accounts cannot enter this portal.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8">
          {!hasSupabaseEnv() ? (
            <p className="text-sm text-steel">
              Add Supabase keys in <code className="text-signal">.env.local</code>{" "}
              first.
            </p>
          ) : (
            <AdminAuthForm />
          )}
        </div>

        <p className="mt-6 text-center text-sm text-steel">
          Looking for the client area?{" "}
          <Link href="/auth/login" className="font-semibold text-signal hover:text-white">
            Client login
          </Link>
        </p>
      </div>
    </div>
  );
}
