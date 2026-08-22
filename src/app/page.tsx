import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Mindset from "@/components/home/Mindset";
import Process from "@/components/home/Process";
import Services from "@/components/home/Services";
import Experts from "@/components/home/Experts";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Zynovex Technologies | Digital Products That Grow Your Business",
  },
  description:
    "Zynovex Technologies builds websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX experiences, and custom digital solutions for businesses.",
  alternates: {
    canonical: "https://www.zynovextechnologies.in/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zynovextechnologies.in/#organization",
      "name": "Zynovex Technologies",
      "url": "https://www.zynovextechnologies.in/",
      "logo": "https://www.zynovextechnologies.in/logo-badge.png",
      "email": "hello@zynovex.tech",
      "description":
        "Zynovex Technologies builds websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX experiences, and custom digital solutions for businesses.",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-74169-22398",
          "contactType": "customer service",
          "availableLanguage": "English",
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-93928-01138",
          "contactType": "customer service",
          "availableLanguage": "English",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zynovextechnologies.in/#website",
      "url": "https://www.zynovextechnologies.in/",
      "name": "Zynovex Technologies",
      "publisher": {
        "@id": "https://www.zynovextechnologies.in/#organization",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Marquee />
      <Mindset />
      <Process />
      <Services />
      <Experts />
      <FAQ />
      <FinalCTA />
    </>
  );
}

