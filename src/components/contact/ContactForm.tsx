"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { contactServiceOptions } from "@/lib/content";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-steel focus:border-accent";

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
        <label className="block text-sm font-medium text-white/80">
          Full name
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-white/80">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-white/80">
          Company
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-white/80">
          Service interest
          <select
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            className={fieldClass}
          >
            {contactServiceOptions.map((option) => (
              <option key={option} value={option} className="bg-ink text-white">
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-white/80">
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      {feedback && (
        <p className={`text-sm ${status === "error" ? "text-red-400" : "text-signal"}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}
