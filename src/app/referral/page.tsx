import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import ReferralForm from "@/components/referral/ReferralForm";
import {
  referralCommissionTiers,
  referralSteps,
} from "@/lib/referral";

export const metadata: Metadata = {
  title: {
    absolute: "Referral Program | Zynovex Technologies",
  },
  description:
    "Refer businesses to Zynovex Technologies for websites, AI automation, dashboards, booking platforms, and custom digital solutions.",
  alternates: {
    canonical: "https://www.zynovextechnologies.in/referral",
  },
};

export default function ReferralPage() {
  return (
    <div className="page-grade">
      <section className="relative z-10 px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">
              Refer & earn
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Bring us a client.
              <span className="block text-signal">Earn when we close.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-steel md:text-lg">
              Know a business that needs a website, AI automation, dashboard, or
              booking platform? Refer them to Zynovex and get paid based on the
              closed project value.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#submit-referral"
                className="btn-primary inline-flex rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Submit a referral
              </a>
              <Link
                href="/contact"
                className="btn-ghost inline-flex rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Prefer a direct quote?
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-panel relative z-10 px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
              How it works
            </p>
            <h2 className="mt-3 font-display section-title font-bold text-white">
              Simple. Transparent. Paid on close.
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {referralSteps.map((step, index) => (
              <StaggerItem key={step.title} index={index} variant="jump">
                <div className="hover-flash h-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
                  <p className="font-display text-4xl font-bold text-white/10">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-dark relative z-10 px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
              Rewards
            </p>
            <h2 className="mt-3 font-display section-title font-bold text-white">
              Commission by project value
            </h2>
            <p className="mt-4 text-steel">
              Final payout is calculated from the signed project value after the
              client pays Zynovex.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {referralCommissionTiers.map((tier, index) => (
              <StaggerItem key={tier.label} index={index % 2} variant="jump">
                <article className="hover-flash h-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
                    {tier.label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">
                    {tier.range}
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-signal">
                    {tier.reward}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {tier.detail}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        id="submit-referral"
        className="section-light relative z-10 scroll-mt-28 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
              Submit
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              Refer a client
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel">
              Fill this once. Our team reviews every referral and follows up
              with the client. You’ll be notified when status moves to won or
              paid.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>• One referral per client opportunity</li>
              <li>• Reward paid after project payment is received</li>
              <li>• Self-referrals and duplicate leads are not eligible</li>
            </ul>
          </Reveal>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <ReferralForm />
          </div>
        </div>
      </section>
    </div>
  );
}
