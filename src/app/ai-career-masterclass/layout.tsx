import type { Metadata } from "next";

// Revalidate this funnel frequently so copy edits go live quickly.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "AI Career Growth Masterclass — Grow In Your Career With AI (Free Live, For Working Professionals)",
  description:
    "A free live masterclass for working professionals. Learn how to use AI — plus the human skills AI can't replace — to grow in your career instead of being left behind by it. Not for beginners chasing random AI tools.",
  keywords: [
    "AI career growth masterclass",
    "AI for working professionals",
    "AI career coach",
    "future proof career AI",
    "AI skills for promotion",
    "AI upskilling India",
    "grow in career with AI",
    "AI and soft skills",
  ],
  openGraph: {
    title: "In the AI Era, You're Either Replaced — or Irreplaceable.",
    description:
      "Free live AI Career Growth Masterclass for working professionals. Use AI + the human skills AI can't replace to grow in your career, not get left behind.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/ai-career-masterclass",
    siteName: "High Performance Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "In the AI Era, You're Either Replaced — or Irreplaceable.",
    description:
      "Free live AI Career Growth Masterclass for working professionals. Grow in your career with AI, don't get left behind.",
  },
  alternates: {
    canonical: "https://highperformanceclub.co/ai-career-masterclass",
  },
};

export default function AiCareerMasterclassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
