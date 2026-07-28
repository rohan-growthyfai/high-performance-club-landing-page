import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Masterclass: Get Healthy While You Work | The Desk Fit Formula",
  description:
    "Your desk job is slowly damaging your health — poor posture, low energy, eye strain, stiffness, stress. Join this FREE live masterclass and learn how to improve your health naturally while you work, with tiny daily habits. No gym, no diet, no extra hours. The Desk Fit Formula — for anyone who works 6+ hours a day at a desk.",
  keywords: [
    "desk health",
    "desk health system",
    "posture at work",
    "neck pain desk job",
    "back pain sitting",
    "office wellness masterclass",
    "desk exercises",
    "workplace wellness India",
    "1% better habits",
  ],
  openGraph: {
    title: "Get Healthy While You Work — Free Live Masterclass",
    description:
      "Improve your health naturally while you work — better posture, energy and focus — with tiny daily desk habits. No gym, no diet, no extra hours. Free live masterclass on the Desk Fit Formula.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/desk-health-system",
    siteName: "High Performance Club",
    images: [{ url: "/desk/gem/hero-shock.jpg", width: 1024, height: 1024, alt: "Get healthy while you work — Desk Fit Formula masterclass" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Healthy While You Work — Free Live Masterclass",
    description:
      "Improve your health naturally while you work — better posture, energy and focus — with tiny daily desk habits. No gym, no diet, no extra hours. Free live masterclass on the Desk Fit Formula.",
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
