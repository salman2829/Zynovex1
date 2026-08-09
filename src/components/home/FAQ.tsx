"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does Zynovex Technologies build?",
    a: "We build websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX design, and provide ongoing maintenance and support.",
  },
  {
    q: "How do projects typically start?",
    a: "We begin with a discovery call to understand goals, timeline, and budget. From there we share a clear proposal covering scope, milestones, and deliverables.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Maintenance and support is a core service — updates, monitoring, fixes, and improvements so your product stays secure and reliable.",
  },
  {
    q: "Who will I work with?",
    a: "You'll work directly with the founding team — Mohammad Salman and Korlapally Jashwanth — so decisions stay fast and accountability stays clear.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-ink md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-steel transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
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
                      <p className="pb-5 text-sm leading-relaxed text-steel md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
