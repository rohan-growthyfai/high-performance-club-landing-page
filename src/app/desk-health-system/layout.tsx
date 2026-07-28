import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Class: No Time to Get Fit? Get Healthy at Your Desk | Desk Health System™",
  description:
    "A free online class for busy desk professionals. No time for long workouts or fancy diets? Learn how to get healthy inside the 8 hours you already spend at your desk — with tiny daily habits. That's the Desk Health System™. No gym, no diet, no extra time.",
  keywords: [
    "desk health",
    "desk health system",
    "posture at work",
    "neck pain desk job",
    "back pain sitting",
    "office wellness webinar",
    "desk exercises",
    "workplace wellness India",
    "1% better habits",
  ],
  openGraph: {
    title: "No Time to Get Fit? Get Healthy at Your Desk — Free Class",
    description:
      "Bring health into the 8 hours you already spend at your desk. Tiny daily habits, no gym, no diet, no extra time. Free live class on the Desk Health System™.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/desk-health-system",
    siteName: "High Performance Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "No Time to Get Fit? Get Healthy at Your Desk — Free Class",
    description:
      "Bring health into the 8 hours you already spend at your desk. Tiny daily habits, no gym, no diet, no extra time. Free live class on the Desk Health System™.",
  },
  alternates: {
    canonical: "https://highperformanceclub.co/desk-health-system",
  },
};

export default function DeskHealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
