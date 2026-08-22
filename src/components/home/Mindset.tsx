"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import InteractiveCard from "@/components/ui/InteractiveCard";

const principles = [
  {
    title: "Solve something real",
    body: "If it doesn’t move revenue, save time, or win customers — we don’t build it.",
  },
  {
    title: "Ship beats slides",
    body: "Working systems in days and weeks. Not decks that sit unused.",
  },
  {
    title: "AI as leverage",
    body: "Automations and smart workflows that multiply what a small team can do.",
  },
  {
    title: "Own the outcome",
    body: "Founders stay close. Clear scope. Honest timelines. Support after launch.",
  },
];

export default function Mindset() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.75, 1],
    reduce ? [0.1, 0.1, 0.1, 0.1] : [0.04, 0.2, 0.14, 0.04],
  );

  return (
    <section
      ref={sectionRef}
      className="section-dark relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-1/3 h-[42vmax] w-[42vmax] rounded-full bg-signal/15 blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center" variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            How we work
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-navy">
            The Zynovex <span className="text-signal">mindset</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">
            Four principles that keep every build focused, fast, and worth the
            investment.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8">
          {principles.map((item, index) => (
            <StaggerItem key={item.title} index={index} variant="jump">
              <InteractiveCard className="min-h-[220px]">
                <div className="p-7 md:p-8">
                  <p className="font-display text-xs font-bold tracking-[0.24em] text-signal transition group-hover:tracking-[0.3em]">
                    {`0${index + 1}`}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-bold text-navy md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel md:text-base">
                    {item.body}
                  </p>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
