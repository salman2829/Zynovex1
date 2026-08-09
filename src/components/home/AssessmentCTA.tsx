"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default function AssessmentCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      if (!hasSupabaseEnv()) {
        throw new Error("Supabase is not configured yet.");
      }

      const supabase = createClient();
      const { error } = await supabase.from("waitlist").insert({
        email: email.trim().toLowerCase(),
        source: "project-brief",
      });

      if (error) {
        if (error.code === "23505") {
          setStatus("done");
          setMessage("You're already on our list — we'll be in touch soon.");
          return;
        }
        throw error;
      }

      setStatus("done");
      setMessage("Thanks — we'll reach out with next steps.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again or contact us directly.");
    }
  }

  return (
    <section id="cta" className="atmosphere relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl text-balance">
              Ready to build something that works?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
              Share your email and we&apos;ll follow up with a short project brief.
              Prefer a full conversation? Book time through our contact page.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              Or send a detailed message →
            </Link>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            onSubmit={onSubmit}
            className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
          >
            <label htmlFor="waitlist-email" className="text-sm font-medium text-white">
              Work email
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-2 w-full rounded-md border border-white/20 bg-ink/40 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
            >
              {status === "loading" ? "Submitting…" : "Request a callback"}
            </button>
            {message && (
              <p
                className={`mt-3 text-sm ${
                  status === "error" ? "text-red-300" : "text-accent"
                }`}
              >
                {message}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
