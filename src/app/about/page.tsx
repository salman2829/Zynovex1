import type { Metadata } from "next";
import Link from "next/link";
import { founders } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zynovex Technologies is a digital agency founded by Mohammad Salman and Korlapally Jashwanth — websites, AI, marketing, and product systems.",
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="atmosphere px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            About Zynovex
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl text-balance">
            A modern digital agency built on craft and accountability.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Zynovex Technologies was founded by Mohammad Salman and Korlapally
            Jashwanth to help businesses ship websites, automations, platforms, and
            growth systems that look professional and perform in the real world.
          </p>
        </div>
      </section>

      <section className="section-grid mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Design with purpose",
              body: "UI/UX that is clear, credible, and built around how customers actually behave.",
            },
            {
              title: "Engineering that lasts",
              body: "Clean builds for websites, dashboards, booking systems, and AI workflows.",
            },
            {
              title: "Partnership after launch",
              body: "Maintenance, marketing support, and iteration so your product keeps improving.",
            },
          ].map((item) => (
            <article key={item.title} className="border-t border-ink/15 pt-5">
              <h2 className="font-display text-xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-steel">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">Founders</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {founders.map((person) => (
              <article key={person.name} className="border border-line bg-white/60 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-base font-bold text-accent">
                  {person.initials}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-deep">{person.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-steel">{person.focus}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-ink">Our standard</h2>
          <p className="mt-4 text-base leading-relaxed text-steel">
            We keep scopes honest, interfaces polished, and delivery predictable.
            Clients work directly with the founders — not a revolving cast of
            freelancers — so quality and communication stay consistent.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
          >
            Work with us
          </Link>
        </div>
      </section>
    </div>
  );
}
