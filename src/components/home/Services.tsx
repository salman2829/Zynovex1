"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import MotionPress from "@/components/motion/MotionPress";
import InteractiveCard from "@/components/ui/InteractiveCard";
import { services } from "@/lib/content";

/** Services catalog — staggered depth + soft scroll glow. */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? ["0%", "0%", "0%"] : ["12%", "0%", "-8%"],
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    reduce ? [0.2, 0.2, 0.2, 0.2] : [0.08, 0.28, 0.22, 0.06],
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-light relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[55vmax] w-[55vmax] -translate-x-1/2 rounded-full bg-signal/20 blur-3xl will-change-transform"
        style={{ y: glowY, opacity: glowOpacity }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center" variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Services
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-navy">
            What we <span className="text-signal">build</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">
            Full catalog on the homepage — websites, AI, marketing, dashboards,
            booking, design, and support.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((item, index) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.slug} index={index} variant="jump">
                <article id={item.slug} className="scroll-mt-28 h-full">
                  <InteractiveCard className="min-h-[300px]">
                    <div className="flex h-full flex-col p-7 md:p-8">
                      <div className="mb-5 flex items-start justify-between gap-3">
                        <div className="inline-flex w-fit rounded-2xl bg-accent/15 p-3 text-signal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-accent/25">
                          <Icon size={22} strokeWidth={1.75} aria-hidden />
                        </div>
                        <span className="font-display text-sm font-bold tracking-[0.18em] text-navy/15 transition group-hover:text-signal/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-navy md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-signal">
                        {item.short}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-steel md:text-base">
                        {item.body}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2 text-sm text-foreground/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </InteractiveCard>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.08} className="mt-14 text-center" variant="scale">
          <MotionPress>
            <Link
              href="/contact"
              className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-semibold"
            >
              Discuss your project →
            </Link>
          </MotionPress>
        </Reveal>
      </div>
    </section>
  );
}
