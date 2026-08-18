"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Full-page ambient motion — CSS/GPU orbs + light scroll parallax.
 * No heavy JS per frame beyond Framer transforms.
 */
export default function PageAtmosphere() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 0.85, 0.7]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ y: yA }}
        className="animate-orb absolute -left-[15%] top-[8%] h-[48vmin] w-[48vmin] rounded-full bg-accent/20 blur-[90px]"
      />
      <motion.div
        style={{ y: yB }}
        className="animate-orb absolute -right-[10%] top-[35%] h-[42vmin] w-[42vmin] rounded-full bg-signal/15 blur-[100px]"
      />
      <motion.div
        style={{ y: yA }}
        className="animate-orb absolute bottom-[5%] left-[30%] h-[36vmin] w-[36vmin] rounded-full bg-accent-deep/20 blur-[80px]"
      />
    </motion.div>
  );
}
