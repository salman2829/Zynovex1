import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import ReferralStatusButtons from "@/components/admin/ReferralStatusButtons";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { isAdminRole, type Profile, type Referral } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin · Referrals",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminReferralsPage() {
  if (!hasSupabaseEnv()) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!isAdminRole((profile as Profile | null)?.role)) {
    redirect("/dashboard");
  }

  const { data: rows } = await supabase
    .from("referrals")
    .select("*")
    .order("created_at", { ascending: false });

  const referrals = (rows ?? []) as Referral[];
  const newCount = referrals.filter((r) => r.status === "new").length;

  return (
    <div className="page-grade px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">
              Founder admin
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              Referrals
            </h1>
            <p className="mt-2 text-steel">
              {newCount} new · {referrals.length} total
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-signal hover:text-white"
            >
              Leads
            </Link>
            <SignOutButton redirectTo="/admin/login" />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {referrals.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-steel">
              No referrals yet. Submissions from the referral page will appear
              here.
            </div>
          ) : (
            referrals.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold text-white">
                      {item.client_name}
                      {item.client_company ? ` · ${item.client_company}` : ""}
                    </h2>
                    <p className="mt-1 text-sm text-steel">
                      {item.service_interest || "General"} ·{" "}
                      {item.estimated_budget || "Budget TBD"} ·{" "}
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                  <ReferralStatusButtons
                    referralId={item.id}
                    current={item.status}
                  />
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">
                      Referrer
                    </dt>
                    <dd className="mt-1 font-medium text-white">
                      {item.referrer_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">
                      Referrer contact
                    </dt>
                    <dd className="mt-1 font-medium text-white">
                      {item.referrer_phone}
                      <br />
                      <span className="text-steel">{item.referrer_email}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">
                      Client phone
                    </dt>
                    <dd className="mt-1 font-medium text-white">
                      {item.client_phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">
                      UPI
                    </dt>
                    <dd className="mt-1 font-medium text-signal">
                      {item.referrer_upi || "—"}
                    </dd>
                  </div>
                </dl>

                {item.notes && (
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                    {item.notes}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
