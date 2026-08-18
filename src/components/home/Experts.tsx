"use client";

import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import InteractiveCard from "@/components/ui/InteractiveCard";
import { founders } from "@/lib/content";

export default function Experts() {
  return (
    <section className="section-dark relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Founders
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-white">
            Built by people who{" "}
            <span className="text-signal">ship</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">
            Work directly with the founders — fast decisions, clear ownership.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {founders.map((person, index) => (
            <StaggerItem key={person.name} index={index % 2} variant="jump">
              <InteractiveCard className="min-h-[240px]">
                <div className="p-8 md:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 font-display text-lg font-bold text-signal">
                    {person.initials}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-signal">
                    {person.role}
                  </p>
                  {"phoneDisplay" in person && person.phoneDisplay ? (
                    <a
                      href={`tel:+91${person.phone}`}
                      className="mt-2 inline-block text-sm font-medium text-white/70 transition hover:text-signal"
                    >
                      {person.phoneDisplay}
                    </a>
                  ) : null}
                  <p className="mt-4 text-base leading-relaxed text-steel">{person.focus}</p>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
