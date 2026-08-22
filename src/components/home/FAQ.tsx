"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "What does Zynovex build?",
    a: "Websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX design, and ongoing maintenance & support.",
  },
  {
    q: "How do projects start?",
    a: "A short discovery call, then a clear proposal with scope, timeline, and milestones. No fluff — just what we’ll ship and when.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Maintenance and support is a core service: updates, monitoring, fixes, and improvements after go-live.",
  },
  {
    q: "Who will I work with?",
    a: "You’ll work directly with founders Mohammad Salman and Korlapally Jashwanth — fast decisions, clear accountability.",
  },
  {
    q: "How fast can you ship?",
    a: "Depends on scope, but we optimize for momentum — prototypes and MVPs in days/weeks, full products with a realistic roadmap.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-panel relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center" variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            FAQ
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-navy">
            Answers up front
          </h2>
        </Reveal>

        <Stagger
          className="mt-12 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 md:px-7"
          stagger={0.08}
        >
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <StaggerItem key={item.q} variant="up" index={index}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold text-navy md:text-lg">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus className="shrink-0 text-signal" size={18} />
                  ) : (
                    <Plus className="shrink-0 text-steel" size={18} />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-steel md:pb-6 md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
