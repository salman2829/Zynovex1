"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import MotionPress from "@/components/motion/MotionPress";

const pillars = [
  { label: "Websites", hint: "Convert" },
  { label: "AI systems", hint: "Automate" },
  { label: "Platforms", hint: "Scale" },
];

/** Hero with light parallax — globe drifts slower than foreground copy. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "32%"],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "14%"],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    reduce ? [1, 1, 1] : [1, 0.7, 0],
  );
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0.45, 0.45] : [0.35, 0.82],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 scale-110">
          <HeroScene />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/50 via-ink/30 to-ink"
        style={{ opacity: veilOpacity }}
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center will-change-transform md:px-8 md:pb-24 md:pt-36"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <p className="font-display text-sm font-bold tracking-[0.34em] text-white">
          ZYNOVEX
        </p>

        <h1 className="mt-5 w-full text-center font-display hero-title font-bold text-white">
          <span className="block">Future-ready</span>
          <span className="block bg-gradient-to-r from-signal to-accent bg-clip-text text-transparent">
            digital products,
          </span>
          <span className="block">engineered to grow.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-steel md:text-lg">
          Websites, AI automations, dashboards, booking platforms, and design —
          founder-led delivery with clear scope and measurable outcomes.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MotionPress>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Get a free quote
              <span aria-hidden>→</span>
            </Link>
          </MotionPress>
          <MotionPress>
            <a
              href="https://wa.me/917416922398?text=Hi%20Zynovex%20%E2%80%94%20I%E2%80%99d%20like%20a%20free%20project%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              WhatsApp us
            </a>
          </MotionPress>
        </div>

        <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-3">
          {pillars.map((item) => (
            <div
              key={item.label}
              className="hover-flash glass rounded-2xl px-3 py-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-signal/40 md:px-4"
            >
              <p className="font-display text-sm font-bold text-white md:text-base">
                {item.label}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-signal">
                {item.hint}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
