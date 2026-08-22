"use client";

import { FormEvent, useMemo, useState } from "react";
import { websiteTypeOptions } from "@/lib/contact";
import {
  estimateReferralReward,
  referralBudgetOptions,
} from "@/lib/referral";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-steel focus:border-accent";

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

    if (!referrerName.trim() || !referrerEmail.trim() || !referrerPhone.trim()) {
      setStatus("error");
      setFeedback("Please fill your name, email, and phone in Your details.");
      return;
    }

    if (!clientName.trim() || !clientPhone.trim()) {
      setStatus("error");
      setFeedback("Please fill the client name and phone.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrerName: referrerName.trim(),
          referrerEmail: referrerEmail.trim(),
          referrerPhone: referrerPhone.trim(),
          referrerUpi: referrerUpi.trim(),
          clientName: clientName.trim(),
          clientCompany: clientCompany.trim(),
          clientEmail: clientEmail.trim(),
          clientPhone: clientPhone.trim(),
          serviceInterest,
          estimatedBudget,
          notes: notes.trim(),
        }),
      });

      const payload = (await res.json()) as {
        error?: string;
        message?: string;
        ok?: boolean;
      };

      if (!res.ok) {
        throw new Error(payload.error || "Could not submit referral.");
      }

      setStatus("done");
      setFeedback(
        payload.message ||
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
        <h3 className="font-display text-lg font-bold text-navy">Your details</h3>
        <p className="mt-1 text-sm text-steel">
          We’ll use this to pay you when the project closes.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-navy/80 sm:col-span-2">
            Full name
            <input
              required
              value={referrerName}
              onChange={(e) => setReferrerName(e.target.value)}
              className={fieldClass}
              placeholder="Your name"
            />
          </label>
          <label className="block text-sm font-medium text-navy/80">
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
          <label className="block text-sm font-medium text-navy/80">
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
          <label className="block text-sm font-medium text-navy/80 sm:col-span-2">
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
        <h3 className="font-display text-lg font-bold text-navy">
          Client you’re referring
        </h3>
        <p className="mt-1 text-sm text-steel">
          Share enough detail for us to qualify the opportunity.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-navy/80">
            Client name
            <input
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={fieldClass}
              placeholder="Decision maker / owner"
            />
          </label>
          <label className="block text-sm font-medium text-navy/80">
            Company <span className="text-steel">(optional)</span>
            <input
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              className={fieldClass}
              placeholder="Business name"
            />
          </label>
          <label className="block text-sm font-medium text-navy/80">
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
          <label className="block text-sm font-medium text-navy/80">
            Client email <span className="text-steel">(optional)</span>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className={fieldClass}
              placeholder="client@company.com"
            />
          </label>
          <label className="block text-sm font-medium text-navy/80">
            Service needed
            <select
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              className={fieldClass}
            >
              {websiteTypeOptions.map((option) => (
                <option key={option} value={option} className="bg-white text-foreground">
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-navy/80">
            Estimated budget
            <select
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              className={fieldClass}
            >
              {referralBudgetOptions.map((option) => (
                <option key={option} value={option} className="bg-white text-foreground">
                  {option}
                </option>
              ))}
            </select>
            <span className="mt-1.5 block text-xs text-accent">
              Estimated reward: {estimatedReward}
            </span>
          </label>
          <label className="block text-sm font-medium text-navy/80 sm:col-span-2">
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

      <label className="flex items-start gap-3 text-sm text-navy/70">
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
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-red-400/30 bg-red-500/10 text-red-600"
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
