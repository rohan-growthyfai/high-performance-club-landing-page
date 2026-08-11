import type { Metadata } from "next";

// Route-level metadata — the page itself is a client component, so the browser
// tab title + link previews (WhatsApp/FB/ads) are defined here. Without this,
// the page inherited the sitewide "7 Tiny Habits Challenge" metadata.
export const metadata: Metadata = {
  title: "Daily Upgrade Club — 1 Quick 5-Minute Healthy Habit Every Morning | Just ₹99/month",
  description:
    "Daily Upgrade Club sends you 1 quick, science-backed healthy habit every morning on WhatsApp for the next 30 days — just ₹99 per month, less than your daily cup of chai. Streaks, accountability & weekly scorecards included.",
  openGraph: {
    title: "Daily Upgrade Club — Just ₹99/month for Daily 5-Minute Habits",
    description:
      "1 quick healthy habit every morning on WhatsApp for 30 days. Just ₹99 per month — less than your daily cup of chai.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Upgrade Club — Just ₹99/month for Daily 5-Minute Habits",
    description:
      "1 quick healthy habit every morning on WhatsApp for 30 days. Just ₹99 per month.",
  },
};

export default function DUCLayout({ children }: { children: React.ReactNode }) {
  return children;
}
