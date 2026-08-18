"use client";

import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import InteractiveCard from "@/components/ui/InteractiveCard";

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

export default function Process() {
  return (
    <section id="process" className="section-panel relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Engagement
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-white">
            Discover. Design.{" "}
            <span className="text-signal">Deliver.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel">
            A simple process built for momentum — not endless workshops.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <StaggerItem key={step.label} index={index % 3} variant="jump">
              <InteractiveCard className="min-h-[280px]">
                <div className="p-7 md:p-8">
                  <p className="font-display text-5xl font-bold text-white/10 transition group-hover:text-signal/30">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-signal">
                    {step.label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{step.body}</p>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
