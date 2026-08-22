import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Web, AI & Digital Services | Zynovex Technologies",
  },
  description:
    "Discover professional technology services by Zynovex Technologies, including custom website development, AI automations, digital marketing, analytics dashboards, booking platforms, and UI/UX design.",
  alternates: {
    canonical: "https://www.zynovextechnologies.in/services",
  },
};

export default function ServicesHubPage() {
  return (
    <div className="page-grade text-white">
      {/* Hero Header Section */}
      <section className="atmosphere px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">
            Zynovex Services
          </p>
          <h1 className="mt-5 font-display section-title font-extrabold">
            Web, AI & Digital Solutions
            <br />
            built to <span className="text-signal">scale.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steel">
            Zynovex Technologies partners with companies to automate processes,
            optimize operations, and craft high-converting digital products.
            Explore our specialized capabilities below.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-dark px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.slug}
                  className="glass flex flex-col justify-between rounded-2xl p-6 md:p-8"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-signal">
                      <Icon size={24} />
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-extrabold text-white">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm text-signal font-semibold uppercase tracking-wider">
                      {service.short}
                    </p>
                    <p className="mt-3 text-sm text-steel leading-relaxed">
                      {service.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {service.points.slice(0, 3).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-steel">
                          <span className="text-signal select-none">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:underline"
                    >
                      Learn more about {service.title}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quick FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center text-white mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-display text-lg font-bold text-white">
                  How do we get started?
                </h3>
                <p className="mt-2 text-sm text-steel leading-relaxed">
                  Start by filling out our project questionnaire on the contact page or message us directly on WhatsApp. We will schedule a scoping call to review requirements, set parameters, and estimate budget/timeline.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-display text-lg font-bold text-white">
                  Do you provide ongoing support after delivery?
                </h3>
                <p className="mt-2 text-sm text-steel leading-relaxed">
                  Yes, we offer monthly maintenance and support retainers to handle updates, security monitoring, feature iterations, and bug fixes so your tools remain fast and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Call To Action Block */}
          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-extrabold text-white">
              Have a digital project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-steel leading-relaxed">
              Tell us about your requirements, timeline, and goals. We’ll compile a custom scoped proposal for your review.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary rounded-full px-6 py-3 text-sm font-semibold"
              >
                Get a free quote →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
