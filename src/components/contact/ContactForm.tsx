"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { contactServiceOptions } from "@/lib/content";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceInterest, setServiceInterest] = useState(contactServiceOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      if (!hasSupabaseEnv()) {
        throw new Error("Supabase is not configured yet.");
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("contact_inquiries").insert({
        user_id: user?.id ?? null,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim() || null,
        service_interest: serviceInterest,
        message: message.trim(),
      });

      if (error) throw error;

      setStatus("done");
      setFeedback("Thanks — we'll respond within one business day.");
      setFullName("");
      setEmail("");
      setCompany("");
      setServiceInterest(contactServiceOptions[0]);
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Could not send your message. Check Supabase setup or try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="text-sm font-medium text-ink">
            Company
          </label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-medium text-ink">
            Service interest
          </label>
          <select
            id="service"
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
          >
            {contactServiceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          How can we help?
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      {feedback && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-accent-deep"}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}
