"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  budgetMarks,
  formatBudget,
  timelineOptions,
  websiteTypeOptions,
} from "@/lib/contact";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-steel focus:border-accent";

export default function LeadQuoteForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceInterest, setServiceInterest] = useState<string>(websiteTypeOptions[0]);
  const [budgetIndex, setBudgetIndex] = useState(2);
  const [timeline, setTimeline] = useState<string>(timelineOptions[2]);
  const [notes, setNotes] = useState("");
  const [serious, setSerious] = useState(false);
  const [captchaA] = useState(() => 2 + Math.floor(Math.random() * 5));
  const [captchaB] = useState(() => 1 + Math.floor(Math.random() * 4));
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const budget = budgetMarks[budgetIndex];
  const captchaSum = captchaA + captchaB;

  const message = useMemo(() => {
    const parts = [
      `Lead quote request`,
      `Phone: +91 ${phone.trim()}`,
      `Service: ${serviceInterest}`,
      `Budget: ${formatBudget(budget)}`,
      `Timeline: ${timeline}`,
    ];
    if (notes.trim()) parts.push(`Notes: ${notes.trim()}`);
    return parts.join("\n");
  }, [phone, serviceInterest, budget, timeline, notes]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback("");

    if (!serious) {
      setStatus("error");
      setFeedback("Please confirm you’re serious about getting a project built.");
      return;
    }

    if (Number(captchaAnswer) !== captchaSum) {
      setStatus("error");
      setFeedback("Quick check answer is incorrect — try again.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setStatus("error");
      setFeedback("Enter a valid 10-digit phone / WhatsApp number.");
      return;
    }

    setStatus("loading");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("contact_inquiries").insert({
        user_id: user?.id ?? null,
        full_name: fullName.trim(),
        email: email.trim() ? email.trim().toLowerCase() : null,
        phone: `+91${cleanPhone.slice(-10)}`,
        company: null,
        service_interest: serviceInterest,
        budget: formatBudget(budget),
        timeline,
        message,
        status: "new",
      });

      if (error) throw error;

      setStatus("done");
      setFeedback("Got it — we’ll reply shortly on WhatsApp or phone.");
      setFullName("");
      setPhone("");
      setEmail("");
      setServiceInterest(websiteTypeOptions[0]);
      setBudgetIndex(2);
      setTimeline(timelineOptions[2]);
      setNotes("");
      setSerious(false);
      setCaptchaAnswer("");
    } catch {
      setStatus("error");
      setFeedback("Could not send. Check Supabase setup or try WhatsApp instead.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-navy md:text-2xl">
          Get your free project quote
        </h2>
        <p className="mt-1.5 text-sm text-steel">
          Tell us what you need — founders reply fast. No spam.
        </p>
      </div>

      <label className="block text-sm font-medium text-navy/80">
        Your name
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={fieldClass}
          placeholder="Full name"
        />
      </label>

      <label className="block text-sm font-medium text-navy/80">
        Phone / WhatsApp number
        <div className="mt-1.5 flex overflow-hidden rounded-lg border border-navy/15 bg-white focus-within:border-accent">
          <span className="flex items-center border-r border-navy/10 px-3 text-sm text-steel">
            +91
          </span>
          <input
            required
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, ""))}
            className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-steel"
            placeholder="10-digit mobile"
          />
        </div>
      </label>

      <label className="block text-sm font-medium text-navy/80">
        Email <span className="text-steel">(optional)</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          placeholder="you@company.com"
        />
      </label>

      <label className="block text-sm font-medium text-navy/80">
        What do you want to build?
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

      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-navy/80">Your budget</span>
          <span className="font-semibold text-accent">{formatBudget(budget)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={budgetMarks.length - 1}
          step={1}
          value={budgetIndex}
          onChange={(e) => setBudgetIndex(Number(e.target.value))}
          className="mt-3 w-full accent-accent"
        />
        <div className="mt-1 flex justify-between text-[11px] text-steel">
          <span>₹10k</span>
          <span>₹2L+</span>
        </div>
      </div>

      <label className="block text-sm font-medium text-navy/80">
        When do you want to start? <span className="text-steel">(optional)</span>
        <select
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className={fieldClass}
        >
          {timelineOptions.map((option) => (
            <option key={option} value={option} className="bg-white text-foreground">
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-navy/80">
        Anything else? <span className="text-steel">(optional)</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder="Goals, links, deadlines…"
        />
      </label>

      <label className="block text-sm font-medium text-navy/80">
        Quick check: {captchaA} + {captchaB} = ?
        <input
          required
          inputMode="numeric"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          className={`${fieldClass} max-w-[8rem]`}
        />
      </label>

      <label className="flex items-start gap-2.5 text-sm text-navy/75">
        <input
          type="checkbox"
          checked={serious}
          onChange={(e) => setSerious(e.target.checked)}
          className="mt-1 accent-accent"
        />
        <span>Yes, I’m serious about getting a project built.</span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send me my free quote →"}
      </button>

      <p className="text-center text-xs text-steel">
        We reply quickly. No spam, ever. Founder-led delivery.
      </p>

      {feedback && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-accent"}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}
