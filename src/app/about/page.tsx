import type { Metadata } from "next";
import Link from "next/link";
import { founders } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "About Zynovex Technologies | Digital Solutions & Technology",
  },
  description:
    "Learn about Zynovex Technologies and our approach to building modern websites, software, AI automations, dashboards, and digital solutions for businesses.",
  alternates: {
    canonical: "https://www.zynovextechnologies.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="page-grade">
      <section className="atmosphere px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">
            About Zynovex
          </p>
          <h1 className="mt-5 font-display section-title font-extrabold text-navy">
            A digital agency
            <br />
            built to <span className="text-signal">ship.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steel">
            Founded by Mohammad Salman and Korlapally Jashwanth, Zynovex helps
            businesses turn real problems into working digital products — websites,
            AI systems, platforms, and growth tooling.
          </p>
        </div>
      </section>

      <section className="section-dark px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Clarity first",
                body: "Scope, goals, and success metrics before the build starts.",
              },
              {
                title: "Speed with craft",
                body: "Ship fast without cutting corners on UX or reliability.",
              },
              {
                title: "Stay after launch",
                body: "Maintenance and iteration so products keep performing.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="glass rounded-2xl p-6 md:p-7"
              >
                <h2 className="font-display text-2xl font-extrabold text-navy">
                  {item.title}
                </h2>
                <p className="mt-3 text-steel">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {founders.map((person) => (
              <article
                key={person.name}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 font-display text-lg font-extrabold text-signal">
                  {person.initials}
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-navy">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-signal">
                  {person.role}
                </p>
                <p className="mt-3 text-steel">{person.focus}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-semibold"
            >
              Work with us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
