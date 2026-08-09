import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Zynovex Technologies for websites, AI automations, marketing, dashboards, booking platforms, design, and support.",
};

export default function ContactPage() {
  return (
    <div className="section-grid bg-paper px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Contact
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-5xl text-balance">
            Let&apos;s talk about your next build
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
            Share a short brief — website, automation, dashboard, booking platform,
            marketing, or design. Mohammad Salman and Korlapally Jashwanth will review
            and reply with a clear next step.
          </p>
          <div className="mt-8 space-y-2 text-sm text-steel">
            <p>
              <span className="font-semibold text-ink">Email:</span> hello@zynovex.tech
            </p>
            <p>
              <span className="font-semibold text-ink">Response time:</span> within 1
              business day
            </p>
          </div>
        </div>

        <div className="border border-line bg-white/70 p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
