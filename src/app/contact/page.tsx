import type { Metadata } from "next";
import ContactApproach from "@/components/contact/ContactApproach";
import LeadQuoteForm from "@/components/contact/LeadQuoteForm";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Zynovex Technologies | Start Your Digital Project",
  },
  description:
    "Contact Zynovex Technologies to discuss your website, software, AI automation, dashboard, booking platform, or digital product project.",
  alternates: {
    canonical: "https://www.zynovextechnologies.in/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="page-grade px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div>
          <p className="inline-flex rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
            Founder-led · Fast replies
          </p>
          <h1 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-navy">
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

        <div className="rounded-[1.75rem] border border-navy/10 bg-white p-6 shadow-[0_16px_50px_rgba(7,20,38,0.06)] md:p-8">
          <LeadQuoteForm />
        </div>
      </div>
    </div>
  );
}
