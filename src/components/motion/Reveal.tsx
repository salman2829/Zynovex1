"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  card: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  /** Clear jump-in when card enters the viewport */
  jump: {
    hidden: { opacity: 0, y: 88, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

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
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.2,
    once: false,
    margin: "0px 0px -12% 0px",
  });
  const Comp = motion[as];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.45, delay, ease }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Card jumps in whenever it scrolls into view (replays on every visit).
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
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.2,
    once: false,
    margin: "0px 0px -10% 0px",
  });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const isJump = variant === "jump";

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={
        isJump
          ? {
              type: "spring",
              stiffness: 320,
              damping: 16,
              mass: 0.9,
              delay: inView ? Math.min(index * 0.1, 0.2) : 0,
            }
          : {
              duration: 0.45,
              delay: inView ? Math.min(index * 0.08, 0.16) : 0,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}
