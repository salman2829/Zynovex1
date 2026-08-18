"use client";

import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import InteractiveCard from "@/components/ui/InteractiveCard";

const principles = [
  {
    title: "Solve something real",
    body: "If it doesn’t move revenue, save time, or win customers — we don’t build it.",
  },
  {
    title: "Ship beats slides",
    body: "Working systems in days and weeks. Not decks that sit unused.",
  },
  {
    title: "AI as leverage",
    body: "Automations and smart workflows that multiply what a small team can do.",
  },
  {
    title: "Own the outcome",
    body: "Founders stay close. Clear scope. Honest timelines. Support after launch.",
  },
];

export default function Mindset() {
  return (
    <section className="section-dark relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            How we work
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-white">
            The Zynovex{" "}
            <span className="text-signal">mindset</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">
            Four principles that keep every build focused, fast, and worth the
            investment.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8">
          {principles.map((item, index) => (
            <StaggerItem key={item.title} index={index % 2} variant="jump">
              <InteractiveCard className="min-h-[220px]">
                <div className="p-7 md:p-8">
                  <p className="font-display text-xs font-bold tracking-[0.24em] text-signal">
                    {`0${index + 1}`}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-bold text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel md:text-base">
                    {item.body}
                  </p>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
