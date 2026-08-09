"use client";

import { motion } from "framer-motion";
import { founders } from "@/lib/content";

export default function Experts() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Leadership
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Founded by builders who ship
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-steel">
            Zynovex Technologies is led by Mohammad Salman and Korlapally Jashwanth —
            partners focused on quality delivery and long-term client success.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {founders.map((expert, index) => (
            <motion.article
              key={expert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-5 border border-line bg-mist/40 p-6"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-accent">
                {expert.initials}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {expert.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-deep">{expert.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-steel">{expert.focus}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
