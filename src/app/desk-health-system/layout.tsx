import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Webinar: Get Healthy While You Work | The Desk Health System™",
  description:
    "Your desk job is slowly damaging your health — poor posture, low energy, eye strain, stiffness, stress. Join this FREE live webinar and learn how to improve your health naturally while you work, with tiny daily habits. No gym, no diet, no extra hours. The Desk Health System™ — for anyone who works 6+ hours a day at a desk.",
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
    title: "Get Healthy While You Work — Free Live Webinar",
    description:
      "Improve your health naturally while you work — better posture, energy and focus — with tiny daily desk habits. No gym, no diet, no extra hours. Free live webinar on the Desk Health System™.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/desk-health-system",
    siteName: "High Performance Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Healthy While You Work — Free Live Webinar",
    description:
      "Improve your health naturally while you work — better posture, energy and focus — with tiny daily desk habits. No gym, no diet, no extra hours. Free live webinar on the Desk Health System™.",
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
