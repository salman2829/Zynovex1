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
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  card: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  jump: {
    hidden: { opacity: 0, y: 48, scale: 0.96 },
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
  const inView = useInView(ref, { amount: 0.2, once: true });
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
      transition={{ duration: 0.4, delay, ease }}
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
  const inView = useInView(ref, { amount: 0.18, once: true });

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
              stiffness: 420,
              damping: 26,
              mass: 0.7,
              delay: Math.min(index * 0.06, 0.12),
            }
          : {
              duration: 0.4,
              delay: Math.min(index * 0.06, 0.12),
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}
