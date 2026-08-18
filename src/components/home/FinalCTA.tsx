"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function FinalCTA() {
  return (
    <section className="atmosphere relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgba(37,99,235,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Next step
          </p>
          <h2 className="mt-5 font-display section-title font-bold text-white">
            Ready to build something
            <br />
            that <span className="text-signal">works?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-steel md:text-lg">
            Tell us the problem. We’ll come back with a clear plan — and ship it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Start a project →
            </Link>
            <Link
              href="/auth/login"
              className="btn-ghost inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Client login
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
