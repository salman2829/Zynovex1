"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/lib/content";

const pillars = [
  {
    title: "Clarity first",
    body: "We define goals, scope, and success metrics before a single pixel ships.",
  },
  {
    title: "Built to perform",
    body: "Clean engineering, thoughtful UX, and systems that stay maintainable.",
  },
  {
    title: "Growth oriented",
    body: "Every build is designed to attract, convert, or operate more efficiently.",
  },
  {
    title: "Supported long-term",
    body: "Launch is the start — we stay available for updates, fixes, and scale.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-grid bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
            What we do
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl text-balance">
            End-to-end digital services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel">
            From first concept to ongoing support, Zynovex helps businesses ship
            professional digital experiences that look sharp and work hard.
          </p>
        </motion.div>

        <div id="approach" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border-t border-ink/15 pt-4"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Our services
            </h3>
            <Link
              href="/services"
              className="text-sm font-semibold text-accent-deep hover:underline"
            >
              Full service details →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="group border-t border-ink/10 pt-5"
                >
                  <div className="mb-4 inline-flex rounded-md bg-mist p-2.5 text-accent-deep transition group-hover:bg-accent/20">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-ink">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{service.short}</p>
                  <ul className="mt-3 space-y-1.5">
                    {service.points.slice(0, 2).map((point) => (
                      <li key={point} className="text-sm leading-relaxed text-steel/90">
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
