"use client";

/** CSS marquee — no Framer scroll listeners. */
const items = [
  "Websites",
  "AI Automations",
  "Digital Marketing",
  "Dashboard Systems",
  "Booking Platforms",
  "UI/UX Design",
  "Maintenance & Support",
];

export default function Marquee() {
  const loop = [...items, ...items];

  return (
    <section className="relative z-10 border-y border-white/10 bg-ink-soft" aria-hidden>
      <div className="overflow-hidden py-4">
        <div className="animate-marquee flex min-w-max gap-10 px-5 will-change-transform">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-white/35"
            >
              {item}
              <span className="ml-10 text-signal/60">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
