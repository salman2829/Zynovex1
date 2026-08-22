"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import MotionPress from "@/components/motion/MotionPress";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.85, 1.05, 0.95],
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduce ? [0.25, 0.25, 0.25] : [0.12, 0.4, 0.18],
  );

  return (
    <section
      ref={sectionRef}
      className="atmosphere relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35),transparent_60%)] will-change-transform"
        style={{ scale: glowScale, opacity: glowOpacity }}
      />

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
            <MotionPress>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Start a project →
              </Link>
            </MotionPress>
            <MotionPress>
              <Link
                href="/auth/login"
                className="btn-ghost inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Client login
              </Link>
            </MotionPress>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
