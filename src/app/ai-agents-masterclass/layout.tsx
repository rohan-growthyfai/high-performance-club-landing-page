import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agents Masterclass — Clone Yourself & Automate Your Work (Free Live · 23 Aug 2026)",
  description:
    "A free 90-minute live masterclass on 23 August 2026, 11 AM. Learn to build AI agents that work like a clone of you — handling your daily, repetitive work so you get your time back. No coding required.",
  keywords: [
    "AI agents masterclass",
    "AI automation",
    "clone yourself with AI",
    "AI agents for beginners",
    "automate my work with AI",
    "no code AI agents",
    "AI masterclass India",
    "free AI webinar",
  ],
  openGraph: {
    title: "AI Agents Masterclass — Clone Yourself & Automate Your Work",
    description:
      "Free 90-min live masterclass · 23 Aug 2026, 11 AM. Build AI agents that do your daily work like a clone of you. No coding required.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/ai-agents-masterclass",
    siteName: "High Performance Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents Masterclass — Clone Yourself & Automate Your Work",
    description:
      "Free 90-min live masterclass · 23 Aug 2026, 11 AM. Build AI agents that do your daily work like a clone of you.",
  },
  alternates: {
    canonical: "https://highperformanceclub.co/ai-agents-masterclass",
  },
};

export default function AiAgentsMasterclassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
