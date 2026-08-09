import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className={`${syne.variable} ${figtree.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
