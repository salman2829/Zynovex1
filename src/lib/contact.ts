/** Founder contact details + lead form helpers */

export const foundersContact = [
  {
    name: "Mohammad Salman",
    phone: "7416922398",
    phoneDisplay: "+91 74169 22398",
    whatsapp: "917416922398",
    role: "Co-founder",
  },
  {
    name: "Korlapally Jashwanth",
    phone: "9392801138",
    phoneDisplay: "+91 93928 01138",
    whatsapp: "919392801138",
    role: "Co-founder",
  },
] as const;

export const primaryWhatsApp = foundersContact[0];
export const agencyEmail = "hello@zynovex.tech";

export function whatsappLink(waNumber: string, text?: string) {
  const base = `https://wa.me/${waNumber}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g, "").replace(/^91/, "")}`;
}

export const budgetMarks = [
  10_000, 25_000, 50_000, 75_000, 100_000, 150_000, 200_000,
] as const;

export function formatBudget(value: number) {
  if (value >= 200_000) return "₹2,00,000+";
  return `₹${value.toLocaleString("en-IN")}`;
}

export const timelineOptions = [
  "ASAP / this week",
  "Within 2 weeks",
  "Within a month",
  "1–3 months",
  "Just exploring",
] as const;

export const websiteTypeOptions = [
  "Business / company website",
  "E-commerce store",
  "Booking / appointment platform",
  "Dashboard / web app",
  "AI automation project",
  "UI/UX design only",
  "Not sure — need advice",
] as const;
