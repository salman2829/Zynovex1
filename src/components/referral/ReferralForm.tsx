"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { websiteTypeOptions } from "@/lib/contact";
import {
  estimateReferralReward,
  referralBudgetOptions,
} from "@/lib/referral";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-signal";

export default function ReferralForm() {
  const [referrerName, setReferrerName] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [referrerPhone, setReferrerPhone] = useState("");
  const [referrerUpi, setReferrerUpi] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [serviceInterest, setServiceInterest] = useState<string>(
    websiteTypeOptions[0],
  );
  const [estimatedBudget, setEstimatedBudget] = useState<string>(
    referralBudgetOptions[1],
  );
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  const estimatedReward = useMemo(
    () => estimateReferralReward(estimatedBudget),
    [estimatedBudget],
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback("");

    if (!agreed) {
      setStatus("error");
      setFeedback("Please confirm the referral terms to continue.");
      return;
    }

    setStatus("loading");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("referrals").insert({
        user_id: user?.id ?? null,
        referrer_name: referrerName.trim(),
        referrer_email: referrerEmail.trim().toLowerCase(),
        referrer_phone: referrerPhone.trim(),
        referrer_upi: referrerUpi.trim() || null,
        client_name: clientName.trim(),
        client_company: clientCompany.trim() || null,
        client_email: clientEmail.trim().toLowerCase() || null,
        client_phone: clientPhone.trim(),
        service_interest: serviceInterest,
        estimated_budget: estimatedBudget,
        notes: notes.trim(),
        status: "new",
      });

      if (error) throw error;

      setStatus("done");
      setFeedback(
        "Referral submitted. We’ll review it and update you when the lead progresses.",
      );
      setReferrerName("");
      setReferrerEmail("");
      setReferrerPhone("");
      setReferrerUpi("");
      setClientName("");
      setClientCompany("");
      setClientEmail("");
      setClientPhone("");
      setNotes("");
      setAgreed(false);
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Could not submit referral. Try again or WhatsApp us.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <h3 className="font-display text-lg font-bold text-white">Your details</h3>
        <p className="mt-1 text-sm text-steel">
          We’ll use this to pay you when the project closes.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-white/80 sm:col-span-2">
            Full name
            <input
              required
              value={referrerName}
              onChange={(e) => setReferrerName(e.target.value)}
              className={fieldClass}
              placeholder="Your name"
            />
          </label>
          <label className="block text-sm font-medium text-white/80">
            Email
            <input
              type="email"
              required
              value={referrerEmail}
              onChange={(e) => setReferrerEmail(e.target.value)}
              className={fieldClass}
              placeholder="you@gmail.com"
            />
          </label>
          <label className="block text-sm font-medium text-white/80">
            Phone / WhatsApp
            <input
              required
              value={referrerPhone}
              onChange={(e) =>
                setReferrerPhone(e.target.value.replace(/[^\d\s+]/g, ""))
              }
              className={fieldClass}
              placeholder="10-digit mobile"
            />
          </label>
          <label className="block text-sm font-medium text-white/80 sm:col-span-2">
            UPI ID <span className="text-steel">(optional, for payout)</span>
            <input
              value={referrerUpi}
              onChange={(e) => setReferrerUpi(e.target.value)}
              className={fieldClass}
              placeholder="name@upi"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-white">
          Client you’re referring
        </h3>
        <p className="mt-1 text-sm text-steel">
          Share enough detail for us to qualify the opportunity.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-white/80">
            Client name
            <input
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={fieldClass}
              placeholder="Decision maker / owner"
            />
          </label>
          <label className="block text-sm font-medium text-white/80">
            Company <span className="text-steel">(optional)</span>
            <input
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              className={fieldClass}
              placeholder="Business name"
            />
          </label>
          <label className="block text-sm font-medium text-white/80">
            Client phone
            <input
              required
              value={clientPhone}
              onChange={(e) =>
                setClientPhone(e.target.value.replace(/[^\d\s+]/g, ""))
              }
              className={fieldClass}
              placeholder="Client mobile"
            />
          </label>
          <label className="block text-sm font-medium text-white/80">
            Client email <span className="text-steel">(optional)</span>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className={fieldClass}
              placeholder="client@company.com"
            />
          </label>
          <label className="block text-sm font-medium text-white/80">
            Service needed
            <select
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              className={fieldClass}
            >
              {websiteTypeOptions.map((option) => (
                <option key={option} value={option} className="bg-ink">
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-white/80">
            Estimated budget
            <select
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              className={fieldClass}
            >
              {referralBudgetOptions.map((option) => (
                <option key={option} value={option} className="bg-ink">
                  {option}
                </option>
              ))}
            </select>
            <span className="mt-1.5 block text-xs text-signal">
              Estimated reward: {estimatedReward}
            </span>
          </label>
          <label className="block text-sm font-medium text-white/80 sm:col-span-2">
            Context / notes <span className="text-steel">(optional)</span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${fieldClass} resize-y`}
              placeholder="How do you know them? What’s the opportunity?"
            />
          </label>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-accent"
        />
        <span>
          I confirm this is a genuine referral. Reward is paid only after the
          referred project is closed and payment is received by Zynovex.
        </span>
      </label>

      {feedback && (
        <p
          className={`rounded-xl border px-3 py-2 text-sm ${
            status === "done"
              ? "border-signal/30 bg-signal/10 text-signal"
              : "border-red-400/30 bg-red-500/10 text-red-200"
          }`}
        >
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full rounded-full px-5 py-3.5 text-sm font-semibold disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Submit referral"}
      </button>
    </form>
  );
}
