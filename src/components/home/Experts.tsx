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
import { founders } from "@/lib/content";

export default function Experts() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    reduce ? [0.1, 0.1, 0.1, 0.1] : [0.05, 0.24, 0.16, 0.05],
  );

  return (
    <section
      ref={sectionRef}
      className="section-dark relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/4 h-[46vmax] w-[46vmax] rounded-full bg-accent/20 blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center" variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Founders
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-white">
            Built by people who <span className="text-signal">ship</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">
            Work directly with the founders — fast decisions, clear ownership.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {founders.map((person, index) => (
            <StaggerItem key={person.name} index={index} variant="jump">
              <InteractiveCard className="min-h-[240px]">
                <div className="p-8 md:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 font-display text-lg font-bold text-signal transition duration-300 group-hover:scale-105 group-hover:bg-accent/25 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.25)]">
                    {person.initials}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-signal">
                    {person.role}
                  </p>
                  {"phoneDisplay" in person && person.phoneDisplay ? (
                    <a
                      href={`tel:+91${person.phone}`}
                      className="mt-2 inline-block text-sm font-medium text-white/70 transition hover:text-signal"
                    >
                      {person.phoneDisplay}
                    </a>
                  ) : null}
                  <p className="mt-4 text-base leading-relaxed text-steel">
                    {person.focus}
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
