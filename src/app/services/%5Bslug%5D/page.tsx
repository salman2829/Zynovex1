import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";

// Define the custom detail map containing unique content for each service slug
type ServiceDetail = {
  seoTitle: string;
  seoDescription: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
};

const serviceDetailsMap: Record<string, ServiceDetail> = {
  websites: {
    seoTitle: "Custom Website Development & SEO | Zynovex Technologies",
    seoDescription:
      "Zynovex Technologies builds fast, responsive, and SEO-optimized marketing and corporate websites engineered to convert visitors into customers.",
    benefits: [
      "SEO Engineered: Clean semantic HTML structure and micro-schemas so search engines index your pages correctly.",
      "Lightning Performance: Built on Next.js with optimized assets for near-instant page loads.",
      "Responsive Craft: Pixel-perfect, custom layouts that represent your brand consistently across mobile and desktop.",
    ],
    faqs: [
      {
        q: "How long does website development take?",
        a: "A standard corporate or marketing website typically takes 2–4 weeks from initial scoping to live deployment.",
      },
      {
        q: "Do you offer custom SEO configurations?",
        a: "Yes. Every website we build includes meta tag customization, canonical links, automated XML sitemaps, robots.txt routing, and JSON-LD structured data.",
      },
      {
        q: "Can I manage the content myself?",
        a: "Yes. We can integrate headless Content Management Systems (CMS) like Sanity or Strapi so your team can publish pages and edit text easily.",
      },
    ],
  },
  "ai-automations": {
    seoTitle: "AI Automation & Operations Integration | Zynovex Technologies",
    seoDescription:
      "Automate repetitive business processes and integrate AI agents into your workflows with Zynovex Technologies.",
    benefits: [
      "Error Reduction: Eliminate human input errors by automating repetitive data syncs and workflow tasks.",
      "Operational Speed: Execute tasks, captures, and notifications instantly without manual intervention.",
      "Connected Tooling: Seamlessly bridge your CRM, email client, database, and marketing channels.",
    ],
    faqs: [
      {
        q: "What processes can be automated?",
        a: "We automate lead capture, follow-up notifications, customer onboarding, reporting pipelines, data synchronizations between CRMs, and email scheduling.",
      },
      {
        q: "Can you integrate OpenAI or custom LLMs?",
        a: "Yes. We build custom API bridges, intelligent bots, and AI assistant layers that plug directly into your business databases.",
      },
      {
        q: "Will automation replace my current software?",
        a: "No, our integrations connect the tools you already use (Slack, HubSpot, Gmail, databases, etc.) to streamline their operations.",
      },
    ],
  },
  "digital-marketing": {
    seoTitle: "Digital Marketing & Growth Funnels | Zynovex Technologies",
    seoDescription:
      "Acquire leads and scale inquiries with custom digital marketing funnel strategy and campaign execution.",
    benefits: [
      "Data-Driven Decisions: We set up advanced tracking and analytics so you know exactly which channels convert.",
      "Conversion-Focused UI: Polished, ultra-fast landing pages designed specifically for high visual conversion rates.",
      "Strategic Positioning: Tailored messaging that resonates with your primary target audience.",
    ],
    faqs: [
      {
        q: "Do you manage paid advertising campaigns?",
        a: "We specialize in digital strategy, landing page optimization, tracking funnels, and marketing automation bridges rather than daily ad spend bidding.",
      },
      {
        q: "How do you track conversions?",
        a: "We integrate clean client/server-side tracking, Google Analytics 4, and custom database event logging.",
      },
      {
        q: "Do you design landing pages?",
        a: "Yes. We build responsive, lightning-fast landing pages engineered to maximize lead signups.",
      },
    ],
  },
  "dashboard-systems": {
    seoTitle: "Custom Analytics & Dashboard Systems | Zynovex Technologies",
    seoDescription:
      "Monitor metrics and track business operations with secure, custom dashboard platforms built by Zynovex Technologies.",
    benefits: [
      "Live Data Vis: Spot trends, track metrics, and make informed choices with live business operational dashboards.",
      "Granular Access Control: Secure role-based user management protecting sensitive databases.",
      "Seamless Integration: Aggregate data from disparate APIs and local databases into one unified screen.",
    ],
    faqs: [
      {
        q: "Is my business data secure?",
        a: "Yes. We implement robust JWT tokens, SSL encryption, and strict row-level security policies (RLS) in databases.",
      },
      {
        q: "Can I export analytics?",
        a: "Yes, we support structured data exports to PDF, CSV, Excel, and other clean reporting formats.",
      },
      {
        q: "Can dashboards sync with my existing databases?",
        a: "Yes. We connect to PostgreSQL, MySQL, MongoDB, Firebase, Supabase, and various SaaS REST/GraphQL APIs.",
      },
    ],
  },
  "booking-platforms": {
    seoTitle: "Appointment & Booking Platforms | Zynovex Technologies",
    seoDescription:
      "Zynovex Technologies builds custom booking and scheduling platforms that handle appointments and payments.",
    benefits: [
      "Frictionless Scheduling: Intuitive user interfaces that allow customers to schedule appointments in under 30 seconds.",
      "Automated Reminders: Integrated SMS and Email updates to reduce no-show rates.",
      "Integrated Checkout: Secure processing for deposits, full payments, and subscription options.",
    ],
    faqs: [
      {
        q: "Can it sync with Google Calendar?",
        a: "Yes, we integrate two-way Google Calendar, Outlook, and Apple Calendar synchronizations.",
      },
      {
        q: "Does it support multiple staff members?",
        a: "Yes. The platform supports multiple staff directories, custom availability calendars, and role configurations.",
      },
      {
        q: "Which payment gateways do you support?",
        a: "We support integrations with Stripe, Razorpay, PayPal, and other popular transaction platforms.",
      },
    ],
  },
  "ui-ux-design": {
    seoTitle: "Research-Backed UI/UX Product Design | Zynovex Technologies",
    seoDescription:
      "Zynovex Technologies creates conversion-focused user flows, interactive prototypes, and modern UI designs.",
    benefits: [
      "User-Centric Research: Interfaces designed around how your actual customers browse and search.",
      "Interactive Prototypes: Clickable wireframes to test layout experiences before starting the code build.",
      "Scalable Component Systems: Clean design tokens and component libraries for easy engineering handoffs.",
    ],
    faqs: [
      {
        q: "What design tools do you use?",
        a: "We work primarily in Figma, ensuring you have full access to interactive component libraries.",
      },
      {
        q: "How many revisions do you allow?",
        a: "We work in iterative sprints with collaborative check-ins, allowing continuous adjustments during design.",
      },
      {
        q: "Do you design for both mobile and desktop?",
        a: "Yes, we prioritize responsive UI layouts, utilizing a mobile-first design system.",
      },
    ],
  },
  "maintenance-support": {
    seoTitle: "Digital Product Upkeep & Support | Zynovex Technologies",
    seoDescription:
      "Ensure your websites and applications stay fast, secure, and up-to-date with Zynovex Technologies retainers.",
    benefits: [
      "Active Monitoring: Continuous uptime and performance checks to fix bugs before users notice them.",
      "Security Updates: Regular dependency audits, backups, and security patches to safeguard systems.",
      "Priority Iterations: Dedicated monthly developer hours for copy tweaks, design updates, and new features.",
    ],
    faqs: [
      {
        q: "What is included in the monthly package?",
        a: "Includes database backups, security scans, software dependency upgrades, bug fixes, and minor adjustments.",
      },
      {
        q: "How quickly do you respond to critical bugs?",
        a: "For clients on our premium support package, we guarantee response and patch resolution paths within 4–12 hours.",
      },
      {
        q: "Is there a minimum contract duration?",
        a: "We work on flexible month-to-month retainers, requiring a simple 30-day notice to pause support.",
      },
    ],
  },
};

// Next.js App Router static parameters generation
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Next.js App Router dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const details = serviceDetailsMap[slug];

  if (!service || !details) {
    return {};
  }

  return {
    title: {
      absolute: details.seoTitle,
    },
    description: details.seoDescription,
    alternates: {
      canonical: `https://www.zynovextechnologies.in/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const details = serviceDetailsMap[slug];

  if (!service || !details) {
    notFound();
  }

  const Icon = service.icon;

  // Structured Data (Breadcrumbs)
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.zynovextechnologies.in/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.zynovextechnologies.in/services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.zynovextechnologies.in/services/${slug}`,
      },
    ],
  };

  // Structured Data (FAQPage)
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": details.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="page-grade text-white">
      {/* Dynamic JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      {/* Hero Header Section */}
      <section className="atmosphere px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-4xl">
          {/* Visual Breadcrumb Links */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-steel uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="text-signal">{service.title}</span>
          </nav>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-signal">
              <Icon size={28} />
            </div>
            <h1 className="mt-6 font-display section-title font-extrabold text-white">
              {service.title} <span className="text-signal">Solutions</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steel">
              {service.body}
            </p>
          </div>
        </div>
      </section>

      {/* Main Core Features & Content */}
      <section className="section-dark px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          
          {/* Key Benefits Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {details.benefits.map((benefit, idx) => {
              const [title, desc] = benefit.split(": ");
              return (
                <div key={idx} className="glass rounded-2xl p-6 md:p-8">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Process Workflow Section */}
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-white mb-10 text-center uppercase tracking-wider">
              Our Implementation Process
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { step: "01", label: "Scope & Plan", body: "Detailed scoping to align on goals, success metrics, and budget." },
                { step: "02", label: "Design", body: "Craft wireframes and responsive layouts for interactive previews." },
                { step: "03", label: "Engineering", body: "Deploy clean, speed-optimized code matching strict standards." },
                { step: "04", label: "Iterate", body: "Active monitoring, fixes, and updates to keep products performing." }
              ].map((pStep) => (
                <div key={pStep.step} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
                  <div className="font-display text-sm font-bold text-signal select-none">{pStep.step}</div>
                  <h4 className="mt-3 font-display text-lg font-bold text-white">{pStep.label}</h4>
                  <p className="mt-2 text-xs text-steel leading-relaxed">{pStep.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center text-white mb-10">
              {service.title} FAQs
            </h2>
            <div className="space-y-6">
              {details.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-display text-lg font-bold text-white">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm text-steel leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Block */}
          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-extrabold text-white">
              Ready to start your {service.title} project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-steel leading-relaxed">
              Contact Zynovex Technologies to discuss custom scope, timelines, and budget marks. We’ll deliver a detailed project plan.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="btn-primary rounded-full px-6 py-3 text-sm font-semibold"
              >
                Discuss a Project →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
