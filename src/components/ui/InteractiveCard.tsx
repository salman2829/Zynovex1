"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "glass" | "light";
};

const idleTransform =
  "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)";

/** Glass card with soft desktop tilt toward the cursor. */
export default function InteractiveCard({
  children,
  className = "",
  tone = "glass",
}: InteractiveCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [transform, setTransform] = useState(idleTransform);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const sync = () => setCanTilt(mq.matches && !reduce);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!canTilt || !ref.current) return;

      const el = ref.current;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 9;
        const rotateX = (0.5 - py) * 7;
        setTransform(
          `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px) scale3d(1.015, 1.015, 1.015)`,
        );
      });
    },
    [canTilt],
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setTransform(idleTransform);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const toneClass =
    tone === "ink"
      ? "border-line bg-ink-soft text-foreground"
      : "border-line bg-paper text-foreground";

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={`hover-flash group relative h-full overflow-hidden rounded-[1.5rem] border transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(18,100,232,0.18)] ${toneClass} ${className}`}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: canTilt
          ? "transform 120ms ease-out, border-color 200ms, box-shadow 200ms"
          : "transform 200ms ease, border-color 200ms, box-shadow 200ms",
        willChange: canTilt ? "transform" : undefined,
      }}
    >
      <div className="relative z-10 h-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
}
