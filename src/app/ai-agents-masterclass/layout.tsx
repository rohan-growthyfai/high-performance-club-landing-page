import type { Metadata } from "next";

// Revalidate this funnel frequently so copy edits go live quickly
// (avoids the CDN serving a long-cached static copy after each deploy).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "AI Agents Masterclass — Build Your Own AI Clone That Works 24/7 (Free Live · 23 Aug 2026)",
  description:
    "A free live AI Agents Masterclass on 23 August 2026, 11 AM. Learn to build your own AI Clone — AI Agents that do your repetitive work for you 24/7, even while you sleep. No coding required.",
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
    title: "Build Your Own AI Clone That Works 24/7 — Free AI Agents Masterclass",
    description:
      "Free live masterclass · 23 Aug 2026, 11 AM. Build AI Agents that do your repetitive work for you 24/7 — even while you sleep. No coding required.",
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
