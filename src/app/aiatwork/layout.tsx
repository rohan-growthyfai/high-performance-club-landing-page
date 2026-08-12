import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI at Work™ — Free 14-Day LIVE AI Series for Working Professionals",
  description:
    "Stop just learning AI. Start using it at work. Join the free 14-Day AI at Work™ LIVE Series — 15 minutes live every day, one real workplace problem, one practical AI skill. Emails, meetings, research, Excel, presentations, productivity and automation. Built for working professionals. No coding required.",
  keywords: [
    "AI at work",
    "AI for working professionals",
    "learn AI",
    "AI productivity",
    "AI for email",
    "AI for meetings",
    "AI for Excel",
    "AI automation",
    "AI agents",
    "practical AI skills",
    "AI live series India",
  ],
  openGraph: {
    title: "Stop Just Learning AI. Start Using It At Work.",
    description:
      "The free 14-Day AI at Work™ LIVE Series — 15 minutes live every day, one real work problem, one practical AI skill. Learn → Do → Apply. Built for working professionals. No coding required.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co/aiatwork",
    siteName: "High Performance Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Just Learning AI. Start Using It At Work.",
    description:
      "The free 14-Day AI at Work™ LIVE Series — one real work problem, one practical AI skill, every day. Learn → Do → Apply. No coding required.",
  },
  alternates: {
    canonical: "https://highperformanceclub.co/aiatwork",
  },
};

export default function AiAtWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
