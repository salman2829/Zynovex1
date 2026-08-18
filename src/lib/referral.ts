/** Referral program — commission paid after referred project is closed & paid. */

export const referralCommissionTiers = [
  {
    label: "Starter projects",
    range: "Under ₹50,000",
    reward: "₹2,500 flat",
    detail: "Websites and small scope builds.",
  },
  {
    label: "Growth projects",
    range: "₹50,000 – ₹99,999",
    reward: "5% of project value",
    detail: "Booking systems, marketing sites, mid-size builds.",
  },
  {
    label: "Scale projects",
    range: "₹1,00,000 – ₹2,49,999",
    reward: "6% of project value",
    detail: "Dashboards, AI workflows, multi-page products.",
  },
  {
    label: "Enterprise projects",
    range: "₹2,50,000+",
    reward: "8% of project value",
    detail: "Complex platforms and long-term engagements.",
  },
] as const;

export const referralSteps = [
  {
    title: "Share a lead",
    body: "Introduce a business that needs a website, AI automation, dashboard, or digital product.",
  },
  {
    title: "We close the project",
    body: "Zynovex handles discovery, proposal, build, and delivery with the referred client.",
  },
  {
    title: "You get paid",
    body: "After the client pays for the closed project, we transfer your referral reward.",
  },
] as const;

export const referralBudgetOptions = [
  "Under ₹50,000",
  "₹50,000 – ₹99,999",
  "₹1,00,000 – ₹2,49,999",
  "₹2,50,000+",
  "Not sure yet",
] as const;

export function estimateReferralReward(budgetLabel: string): string {
  switch (budgetLabel) {
    case "Under ₹50,000":
      return "About ₹2,500";
    case "₹50,000 – ₹99,999":
      return "About ₹2,500 – ₹5,000";
    case "₹1,00,000 – ₹2,49,999":
      return "About ₹6,000 – ₹15,000";
    case "₹2,50,000+":
      return "₹20,000+ (8% of value)";
    default:
      return "Based on final project value";
  }
}
