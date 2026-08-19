"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

function CssFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[44%] h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.22),transparent_52%)]" />
    </div>
  );
}

/**
 * CSS first for instant paint. WebGL mounts only after idle + when in view,
 * and unmounts when scrolled away / tab hidden.
 */
export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [allow3d, setAllow3d] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || saveData || coarse) return;

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const enable = () => setAllow3d(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(enable, 1200);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0.15 },
    );
    io.observe(el);

    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const showCanvas = allow3d && inView && tabVisible;

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full">
      <CssFallback />
      {showCanvas ? (
        <div className="absolute inset-0 opacity-85">
          <HeroCanvas />
        </div>
      ) : null}
    </div>
  );
}
