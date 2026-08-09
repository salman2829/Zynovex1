"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CaseStudy() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
              How we work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl text-balance">
              A process built for clarity and speed
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-4xl font-bold text-ink">01</p>
                <p className="mt-1 text-sm text-steel">Discover & define scope</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-ink">02</p>
                <p className="mt-1 text-sm text-steel">Design, build & launch</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border-l-2 border-accent pl-6 md:pl-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
              Delivery model
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
              From brief to production — with support after go-live
            </h3>
            <p className="mt-4 text-base leading-relaxed text-steel">
              Whether you need a new website, an AI workflow, a booking platform, or
              a full dashboard system, we keep communication clear, timelines realistic,
              and quality non-negotiable.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-accent-deep hover:underline"
            >
              Tell us about your project →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
