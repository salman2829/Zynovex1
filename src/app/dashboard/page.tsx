import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { ContactInquiry, Profile } from "@/lib/types";

export const metadata: Metadata = {
  title: "Client dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    redirect("/auth/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  const [{ data: profile }, { data: inquiries }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("contact_inquiries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const typedProfile = profile as Profile | null;
  const typedInquiries = (inquiries ?? []) as ContactInquiry[];
  const displayName =
    typedProfile?.full_name || user.user_metadata?.full_name || "there";

  return (
    <div className="page-grade px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">
              Client dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              Welcome, {displayName}
            </h1>
            <p className="mt-2 text-sm text-steel">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-7">
            <h2 className="font-display text-xl font-bold text-white">Your profile</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Company
                </dt>
                <dd className="mt-1.5 text-base text-white">
                  {typedProfile?.company || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Account type
                </dt>
                <dd className="mt-1.5 text-base capitalize text-white">
                  {typedProfile?.role || "client"}
                </dd>
              </div>
            </dl>
            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-signal transition hover:text-white"
            >
              Start a new inquiry →
            </Link>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-7">
            <h2 className="font-display text-xl font-bold text-white">Your inquiries</h2>
            <div className="mt-5 space-y-3">
              {typedInquiries.length === 0 ? (
                <p className="text-sm leading-relaxed text-steel">
                  No inquiries yet. Send a quote from the contact page and it will
                  show up here.
                </p>
              ) : (
                typedInquiries.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-black/25 px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">
                        {item.service_interest || "General inquiry"}
                      </p>
                      <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-signal">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">
                      {item.message}
                    </p>
                    <p className="mt-2 text-xs text-steel">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
