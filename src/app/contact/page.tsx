import type { Metadata } from "next";
import ContactApproach from "@/components/contact/ContactApproach";
import LeadQuoteForm from "@/components/contact/LeadQuoteForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free project quote from Zynovex Technologies. WhatsApp, call, or send a brief — founder-led delivery.",
};

export default function ContactPage() {
  return (
    <div className="page-grade px-5 pb-20 pt-28 text-white md:px-8 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div>
          <p className="inline-flex rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
            Founder-led · Fast replies
          </p>
          <h1 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
            Professional digital products{" "}
            <span className="text-signal">that bring you customers.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
            Share a short brief or message us directly. Mohammad Salman and
            Korlapally Jashwanth will come back with a clear next step.
          </p>

          <div className="mt-8">
            <ContactApproach />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-ink-mid/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-8">
          <LeadQuoteForm />
        </div>
      </div>
    </div>
  );
}
