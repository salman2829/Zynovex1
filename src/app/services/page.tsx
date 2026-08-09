import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, AI automations, digital marketing, dashboards, booking platforms, UI/UX design, and maintenance from Zynovex Technologies.",
};

export default function ServicesPage() {
  return (
    <div className="section-grid bg-paper px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
          Services
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl text-balance">
          Professional digital services for modern businesses
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-steel">
          Everything you need to launch, grow, and maintain digital products —
          delivered with clear process and accountable founding-team ownership.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.slug}
                id={item.slug}
                className="border-t border-ink/15 pt-6"
              >
                <div className="mb-3 inline-flex rounded-md bg-mist p-2.5 text-accent-deep">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel md:text-base">
                  {item.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="text-sm text-steel">
                      <span className="mr-2 text-accent-deep">–</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="mt-14 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
        >
          Discuss your project
        </Link>
      </div>
    </div>
  );
}
