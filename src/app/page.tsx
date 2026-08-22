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
    absolute: "Zynovex Technologies | AI, Web & Digital Solutions",
  },
  description:
    "Zynovex Technologies builds websites, custom software, AI automation systems, dashboards, and digital products that solve problems and help businesses grow.",
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
      "alternateName": "Zynovex",
      "url": "https://www.zynovextechnologies.in/",
      "logo": "https://www.zynovextechnologies.in/logo-badge.png",
      "email": "hello@zynovex.tech",
      "description":
        "Zynovex Technologies builds websites, custom software, AI automation systems, dashboards, and digital products that solve problems and help businesses grow.",
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
      "sameAs": [
        "https://www.linkedin.com/company/zynovex-technologies"
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zynovextechnologies.in/#website",
      "url": "https://www.zynovextechnologies.in/",
      "name": "Zynovex Technologies",
      "alternateName": "Zynovex",
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

