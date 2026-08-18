import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import InquiryStatusButtons from "@/components/admin/InquiryStatusButtons";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { isAdminRole, type ContactInquiry, type Profile } from "@/lib/types";
import { MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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

  const typedProfile = profile as Profile | null;
  if (!isAdminRole(typedProfile?.role)) {
    redirect("/dashboard");
  }

  const { data: inquiries } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (inquiries ?? []) as ContactInquiry[];
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="page-grade px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">
              Founder admin
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              Client leads
            </h1>
            <p className="mt-2 text-steel">
              {newCount} new · {leads.length} total · signed in as {user.email}
            </p>
          </div>
          <SignOutButton redirectTo="/admin/login" />
        </div>

        <div className="mt-10 space-y-4">
          {leads.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-steel">
              No leads yet. New quote requests from the contact page will appear
              here.
            </div>
          ) : (
            leads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold text-white">
                      {lead.full_name}
                    </h2>
                    <p className="mt-1 text-sm text-steel">
                      {lead.service_interest || "General"} ·{" "}
                      {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>
                  <InquiryStatusButtons inquiryId={lead.id} current={lead.status} />
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">Phone</dt>
                    <dd className="mt-1 font-medium text-white">
                      {lead.phone || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">Email</dt>
                    <dd className="mt-1 font-medium text-white">
                      {lead.email || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">Budget</dt>
                    <dd className="mt-1 font-medium text-signal">
                      {lead.budget || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-steel">Timeline</dt>
                    <dd className="mt-1 font-medium text-white">
                      {lead.timeline || "—"}
                    </dd>
                  </div>
                </dl>

                {lead.message && (
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                    {lead.message}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {lead.phone && (
                    <>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1.5 text-xs font-semibold text-signal"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80"
                      >
                        <Phone size={14} />
                        Call
                      </a>
                    </>
                  )}
                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80"
                    >
                      Email
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
