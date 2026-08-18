import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteBackground from "@/components/layout/SiteBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zynovex Technologies | Digital products that grow your business",
    template: "%s | Zynovex Technologies",
  },
  description:
    "Zynovex Technologies builds websites, AI automations, digital marketing systems, dashboards, booking platforms, UI/UX design, and ongoing maintenance — led by Mohammad Salman and Korlapally Jashwanth.",
  keywords: [
    "Zynovex Technologies",
    "web development",
    "AI automation",
    "digital marketing",
    "dashboard systems",
    "booking platforms",
    "UI/UX design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-ink font-sans text-foreground antialiased">
        <SiteBackground />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
