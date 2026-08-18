"use client";

import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import InteractiveCard from "@/components/ui/InteractiveCard";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section-light relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
            Services
          </p>
          <h2 className="mt-4 font-display section-title font-bold text-white">
            What we <span className="text-signal">build</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">
            Full catalog on the homepage — websites, AI, marketing, dashboards,
            booking, design, and support.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.slug} index={index % 2} variant="jump">
                <article id={item.slug} className="scroll-mt-28 h-full">
                  <InteractiveCard className="min-h-[300px]">
                    <div className="flex h-full flex-col p-7 md:p-8">
                      <div className="mb-5 inline-flex w-fit rounded-2xl bg-accent/15 p-3 text-signal">
                        <Icon size={22} strokeWidth={1.75} aria-hidden />
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-signal">
                        {item.short}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-steel md:text-base">
                        {item.body}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2 text-sm text-white/70"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </InteractiveCard>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.05} className="mt-14 text-center">
          <Link
            href="/contact"
            className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-semibold"
          >
            Discuss your project →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
