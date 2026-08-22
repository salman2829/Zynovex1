"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import InteractiveCard from "@/components/ui/InteractiveCard";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    label: "Discover",
    title: "Find the real bottleneck",
    body: "We dig into your ops, customers, and tools — then pick the one problem worth fixing first.",
  },
  {
    label: "Design",
    title: "Shape a sharp solution",
    body: "Clear UX, clean architecture, and a build plan that fits your budget and timeline.",
  },
  {
    label: "Deliver",
    title: "Ship. Prove value. Support.",
    body: "Launch fast, measure impact, and stay on for maintenance so the product keeps performing.",
  },
];

/** Discover → Design → Deliver with a short desktop pin + progress rail. */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const railProgress = useTransform(scrollYProgress, [0.2, 0.65], [0, 1]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    reduce ? [0.12, 0.12, 0.12, 0.12] : [0.05, 0.22, 0.16, 0.04],
  );

  useEffect(() => {
    if (reduce) return;

    ensureGsap();
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!desktop.matches || !pinRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top+=80",
      end: "+=42%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    const onChange = () => {
      if (!desktop.matches) trigger.disable(false);
      else trigger.enable();
      ScrollTrigger.refresh();
    };
    desktop.addEventListener("change", onChange);

    return () => {
      desktop.removeEventListener("change", onChange);
      trigger.kill();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-panel relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[40vmax] w-[40vmax] rounded-full bg-accent/25 blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      <div ref={pinRef} className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center" variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Engagement
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-navy">
            Discover. Design.{" "}
            <span className="text-signal">Deliver.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel">
            A simple process built for momentum — not endless workshops.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-10 hidden h-1 max-w-xl overflow-hidden rounded-full bg-white/10 lg:block">
          <motion.div
            className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-accent to-signal"
            style={{ scaleX: railProgress }}
          />
        </div>

        <Stagger className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <StaggerItem key={step.label} index={index} variant="jump">
              <InteractiveCard className="min-h-[280px]">
                <div className="p-7 md:p-8">
                  <p className="font-display text-5xl font-bold text-navy/10 transition group-hover:text-signal/30">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-signal">
                    {step.label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {step.body}
                  </p>
                  {index < steps.length - 1 ? (
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-navy/25 lg:hidden">
                      Next → {steps[index + 1].label}
                    </p>
                  ) : null}
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
