"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -48, y: 24 },
    visible: { opacity: 1, x: 0, y: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48, y: 24 },
    visible: { opacity: 1, x: 0, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 32, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  card: {
    hidden: { opacity: 0, y: 72, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  jump: {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

/** Each card must cross this band before it animates (scroll-driven, one-by-one). */
const cardViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

const revealViewport = {
  once: true,
  amount: 0.4,
  margin: "0px 0px -8% 0px",
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "li";
  variant?: keyof typeof variants;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "up",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ duration: 0.65, delay, ease }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </Comp>
  );
}

/** Coordinates the sequential stagger entry of all StaggerItem children when scrolled into view. */
export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Coordinated child component of Stagger.
 * Inherits parent visible state and animates sequentially.
 */
export function StaggerItem({
  children,
  className,
  variant = "jump",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  index?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{
        duration: 0.8,
        ease,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
