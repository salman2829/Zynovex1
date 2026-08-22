import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    absolute: "Digital Solutions & Technology Services | Zynovex Technologies",
  },
  description:
    "Explore Zynovex Technologies services including website development, AI automation, UI/UX design, dashboards, booking platforms, digital marketing, and custom software.",
  alternates: {
    canonical: "https://www.zynovextechnologies.in/services",
  },
};

/** Services live on the homepage — keep this route for old links. */
export default function ServicesPage() {
  redirect("/#services");
}
