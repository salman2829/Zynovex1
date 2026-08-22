import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteBackground from "@/components/layout/SiteBackground";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-google",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body-google",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zynovextechnologies.in"),
  title: {
    default: "Zynovex Technologies | Digital Products That Grow Your Business",
    template: "%s | Zynovex Technologies",
  },
  description:
    "Zynovex Technologies builds websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX experiences, and custom digital solutions for businesses.",
  keywords: [
    "Zynovex Technologies",
    "web development",
    "AI automation",
    "digital marketing",
    "dashboard systems",
    "booking platforms",
    "UI/UX design",
    "software solutions",
    "digital products",
  ],
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zynovex Technologies | Digital Products That Grow Your Business",
    description:
      "Zynovex Technologies builds websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX experiences, and custom digital solutions for businesses.",
    url: "https://www.zynovextechnologies.in/",
    siteName: "Zynovex Technologies",
    images: [
      {
        url: "/logo-badge.png",
        width: 1200,
        height: 630,
        alt: "Zynovex Technologies - Digital Products That Grow Your Business",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zynovex Technologies | Digital Products That Grow Your Business",
    description:
      "Zynovex Technologies builds websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX experiences, and custom digital solutions for businesses.",
    images: ["/logo-badge.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-ink font-sans text-foreground antialiased">
        <SmoothScroll>
          <SiteBackground />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

