"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BrandLogo, { BrandWordmark } from "@/components/brand/BrandLogo";
import HeroScene from "@/components/three/HeroScene";

export default function Hero() {
  return (
    <section className="atmosphere relative isolate min-h-[100svh] overflow-hidden">
      {/* Full-viewport 3D stage */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Readability overlays — keep animation visible */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_65%_45%,transparent_0%,rgba(6,10,31,0.35)_55%,rgba(6,10,31,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#060a1f]/88 via-[#060a1f]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-[#060a1f] to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-8 flex items-center gap-4 sm:gap-5"
          >
            <BrandLogo
              variant="mark"
              priority
              className="h-14 w-auto drop-shadow-[0_0_28px_rgba(77,138,255,0.45)] sm:h-16 md:h-[4.75rem]"
            />
            <BrandWordmark />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl font-semibold leading-[1.15] text-white text-balance sm:text-4xl md:text-5xl"
          >
            Digital products engineered for growth.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
          >
            Websites, AI automations, dashboards, booking platforms, marketing,
            and UI/UX — designed, built, and supported by a focused founding team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-signal hover:bg-white/10"
            >
              View services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
