import {
  Bot,
  CalendarCheck,
  Headset,
  LayoutDashboard,
  Megaphone,
  Palette,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  body: string;
  points: string[];
  icon: LucideIcon;
};

export const services: ServiceItem[] = [
  {
    slug: "websites",
    title: "Websites",
    short: "High-performing marketing and product sites",
    body: "Custom, fast, and conversion-focused websites that represent your brand with clarity across desktop and mobile.",
    points: [
      "Business, portfolio, and product websites",
      "SEO-ready structure and clean performance",
      "CMS or fully custom builds as needed",
    ],
    icon: Globe,
  },
  {
    slug: "ai-automations",
    title: "AI Automations",
    short: "Workflows that save hours every week",
    body: "Intelligent automations that connect your tools, reduce manual work, and keep operations moving without constant oversight.",
    points: [
      "Lead capture, follow-ups, and reporting bots",
      "Internal process automation",
      "Integrations with the tools you already use",
    ],
    icon: Bot,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Campaigns that attract and convert",
    body: "Strategy and execution across channels so your brand reaches the right audience and turns attention into inquiries.",
    points: [
      "Campaign planning and funnel design",
      "Content, ads, and landing page support",
      "Tracking, reporting, and iteration",
    ],
    icon: Megaphone,
  },
  {
    slug: "dashboard-systems",
    title: "Dashboard Systems",
    short: "Clarity for decisions that matter",
    body: "Custom dashboards that surface the metrics your team needs — clear, secure, and built around how you actually work.",
    points: [
      "Admin and analytics dashboards",
      "Role-based access and clean UX",
      "Live data from your existing systems",
    ],
    icon: LayoutDashboard,
  },
  {
    slug: "booking-platforms",
    title: "Booking Platforms",
    short: "Reservations without the friction",
    body: "End-to-end booking experiences for appointments, services, and events — with availability, payments, and notifications handled cleanly.",
    points: [
      "Scheduling and availability management",
      "Customer and staff portals",
      "Reminders, payments, and confirmations",
    ],
    icon: CalendarCheck,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    short: "Reliable upkeep after launch",
    body: "Ongoing care for your digital products — updates, monitoring, fixes, and improvements so systems stay fast and secure.",
    points: [
      "Updates, backups, and security patches",
      "Bug fixes and performance tuning",
      "Priority support when issues arise",
    ],
    icon: Headset,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short: "Interfaces people want to use",
    body: "Research-backed design for websites and products — from wireframes to polished UI that feels intentional and easy to navigate.",
    points: [
      "User flows, wireframes, and prototypes",
      "Visual systems and component libraries",
      "Usability-focused product design",
    ],
    icon: Palette,
  },
];

export const founders = [
  {
    name: "Mohammad Salman",
    initials: "MS",
    role: "Co-founder",
    focus: "Engineering, platforms, and scalable technical architecture",
    phone: "7416922398",
    phoneDisplay: "+91 74169 22398",
  },
  {
    name: "Korlapally Jashwanth",
    initials: "KJ",
    role: "Co-founder",
    focus: "Product strategy, client delivery, and digital growth systems",
    phone: "9392801138",
    phoneDisplay: "+91 93928 01138",
  },
];

export const contactServiceOptions = [
  ...services.map((s) => s.title),
  "Other",
];
