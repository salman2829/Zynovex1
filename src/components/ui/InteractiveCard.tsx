"use client";

import type { ReactNode } from "react";

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "glass" | "light";
};

/** Lightweight card — CSS hover flash only (no per-frame mouse work). */
export default function InteractiveCard({
  children,
  className = "",
  tone = "glass",
}: InteractiveCardProps) {
  const toneClass =
    tone === "ink"
      ? "border-white/10 bg-ink-mid text-white"
      : "border-white/10 bg-white/[0.05] text-white";

  return (
    <div
      className={`hover-flash group relative h-full overflow-hidden rounded-[1.5rem] border transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-signal/40 ${toneClass} ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
