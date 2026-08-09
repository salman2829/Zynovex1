"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(26,86,232,0.25),transparent_60%)]" />
  ),
});

export default function HeroScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData;

    if (!reduceMotion && !saveData) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,86,232,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(26,86,232,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 h-full w-full">
      <HeroCanvas />
    </div>
  );
}
