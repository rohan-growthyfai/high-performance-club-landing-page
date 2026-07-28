import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Class: From Desk Body to Strong Body | The Desk Health System™",
  description:
    "A free online class for desk professionals. Reverse the hidden damage of desk work — neck pain, back pain, belly fat, low energy — without leaving your desk. Learn the Desk Health System™: tiny daily upgrades that fit inside your workday.",
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
    title: "From Desk Body to Strong Body — Free Online Class",
    description:
      "Reverse the hidden damage of desk work without leaving your desk. Free live class on the Desk Health System™.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/desk-health-system",
    siteName: "High Performance Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "From Desk Body to Strong Body — Free Online Class",
    description:
      "Reverse the hidden damage of desk work without leaving your desk. Free live class on the Desk Health System™.",
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
