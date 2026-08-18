import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, AI automations, marketing, dashboards, booking platforms, UI/UX, and support from Zynovex.",
};

/** Services live on the homepage — keep this route for old links. */
export default function ServicesPage() {
  redirect("/#services");
}
