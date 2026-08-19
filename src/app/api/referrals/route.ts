import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type ReferralBody = {
  referrerName?: string;
  referrerEmail?: string;
  referrerPhone?: string;
  referrerUpi?: string;
  clientName?: string;
  clientCompany?: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceInterest?: string;
  estimatedBudget?: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReferralBody;

    const referrerName = body.referrerName?.trim() ?? "";
    const referrerEmail = body.referrerEmail?.trim().toLowerCase() ?? "";
    const referrerPhone = body.referrerPhone?.trim() ?? "";
    const referrerUpi = body.referrerUpi?.trim() || null;
    const clientName = body.clientName?.trim() ?? "";
    const clientCompany = body.clientCompany?.trim() || null;
    const clientEmail = body.clientEmail?.trim().toLowerCase() || null;
    const clientPhone = body.clientPhone?.trim() ?? "";
    const serviceInterest = body.serviceInterest?.trim() || null;
    const estimatedBudget = body.estimatedBudget?.trim() || null;
    const notes = body.notes?.trim() ?? "";

    if (!referrerName || !referrerEmail || !referrerPhone) {
      return NextResponse.json(
        { error: "Your name, email, and phone are required." },
        { status: 400 },
      );
    }

    if (!clientName || !clientPhone) {
      return NextResponse.json(
        { error: "Client name and phone are required." },
        { status: 400 },
      );
    }

    let userId: string | null = null;
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    } catch {
      userId = null;
    }

    const admin = createAdminClient();
    const payload = {
      user_id: userId,
      referrer_name: referrerName,
      referrer_email: referrerEmail,
      referrer_phone: referrerPhone,
      referrer_upi: referrerUpi,
      client_name: clientName,
      client_company: clientCompany,
      client_email: clientEmail,
      client_phone: clientPhone,
      service_interest: serviceInterest,
      estimated_budget: estimatedBudget,
      notes,
      status: "new" as const,
    };

    const { data, error } = await admin
      .from("referrals")
      .insert(payload)
      .select("id")
      .maybeSingle();

    if (error) {
      const missingTable =
        error.code === "PGRST205" ||
        error.message.toLowerCase().includes("referrals") ||
        error.message.toLowerCase().includes("schema cache");

      if (missingTable) {
        // Temporary fallback so referrals are never lost before SQL is applied
        const { error: fallbackError } = await admin
          .from("contact_inquiries")
          .insert({
            user_id: userId,
            full_name: referrerName,
            email: referrerEmail,
            phone: referrerPhone,
            company: clientCompany,
            service_interest: `Referral · ${serviceInterest || "General"}`,
            budget: estimatedBudget,
            message: [
              "REFERRAL SUBMISSION",
              `Referrer: ${referrerName} | ${referrerPhone} | ${referrerEmail}`,
              `UPI: ${referrerUpi || "—"}`,
              `Client: ${clientName} | ${clientPhone} | ${clientEmail || "—"}`,
              `Company: ${clientCompany || "—"}`,
              `Service: ${serviceInterest || "—"}`,
              `Budget: ${estimatedBudget || "—"}`,
              notes ? `Notes: ${notes}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
            status: "new",
          });

        if (fallbackError) {
          return NextResponse.json(
            {
              error:
                "Referral storage is not set up yet. Run supabase/referrals.sql in the Supabase SQL Editor, then try again.",
              details: fallbackError.message,
            },
            { status: 503 },
          );
        }

        console.warn(
          "[referrals] public.referrals missing — saved to contact_inquiries. Run supabase/referrals.sql.",
        );

        return NextResponse.json({
          ok: true,
          fallback: true,
          message:
            "Referral submitted. We’ll review it and update you when the lead progresses.",
        });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      id: data?.id ?? null,
      message:
        "Referral submitted. We’ll review it and update you when the lead progresses.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not submit referral.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
