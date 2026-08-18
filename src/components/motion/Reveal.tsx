"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
  type UseInViewOptions,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 28, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  card: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  jump: {
    hidden: { opacity: 0, y: 96, scale: 0.88 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

/** Cards must enter this viewport band to count as visible — leaving resets them. */
const replayViewport: UseInViewOptions = {
  once: false,
  amount: 0.45,
  margin: "-12% 0px -18% 0px",
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
  const inView = useInView(ref, replayViewport);
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
      transition={
        inView
          ? { duration: 0.45, delay, ease }
          : { duration: 0.2, ease }
      }
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
 * Jumps in every time the card scrolls into view.
 * Resets when it leaves so the next scroll-in jumps again.
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
  const inView = useInView(ref, replayViewport);

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
        inView
          ? isJump
            ? {
                type: "spring",
                stiffness: 300,
                damping: 14,
                mass: 0.85,
                delay: Math.min(index * 0.1, 0.2),
              }
            : {
                duration: 0.45,
                delay: Math.min(index * 0.08, 0.16),
                ease,
              }
          : {
              // Fast reset when leaving viewport so next jump is ready
              duration: 0.15,
              ease: "easeIn",
            }
      }
    >
      {children}
    </motion.div>
  );
}
