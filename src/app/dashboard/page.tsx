import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { ContactInquiry, Profile } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    redirect("/auth/login?next=/dashboard");
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

  return (
    <div className="bg-mist px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
              Dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
              Welcome{typedProfile?.full_name ? `, ${typedProfile.full_name}` : ""}
            </h1>
            <p className="mt-2 text-steel">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="border border-line bg-paper p-5 md:col-span-1">
            <h2 className="font-display text-lg font-semibold text-ink">Profile</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-steel">Company</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  {typedProfile?.company || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-steel">Role</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  {typedProfile?.role || "client"}
                </dd>
              </div>
            </dl>
            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-accent-deep hover:underline"
            >
              Start a new inquiry →
            </Link>
          </div>

          <div className="border border-line bg-paper p-5 md:col-span-2">
            <h2 className="font-display text-lg font-semibold text-ink">
              Your inquiries
            </h2>
            {typedInquiries.length === 0 ? (
              <p className="mt-4 text-sm text-steel">
                No inquiries yet.{" "}
                <Link href="/contact" className="font-semibold text-accent-deep hover:underline">
                  Send us a brief
                </Link>{" "}
                while signed in to track it here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {typedInquiries.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-ink">
                        {item.service_interest || "General inquiry"}
                      </p>
                      <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-steel">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-steel">{item.message}</p>
                    <p className="mt-2 text-xs text-steel/80">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
