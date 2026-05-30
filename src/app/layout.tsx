import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

/**
 * Font stack matching the world's top coaches' landing pages:
 *
 * - INTER (body + display) — Used by Hormozi (acquisition.com), Justin Welsh,
 *   Sahil Bloom, Mel Robbins, Ankur Warikoo, Linear, Stripe-adjacent.
 *   The industry premium standard for high-converting LPs.
 *
 * - FRAUNCES (italic accents only) — Sahil Bloom's signature serif pairing.
 *   Used sparingly for italic display moments to add editorial premium feel.
 *   Variable serif with multiple optical sizes.
 */

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://highperformanceclub.in"),
  title: "7 Tiny High Performance Habits in 7 Days | Free WhatsApp Challenge",
  description:
    "Free 7-day WhatsApp challenge. One science-backed habit per day, 5 minutes each. Built for Indians 25–45 who keep starting and quitting habits.",
  keywords: [
    "high performance lifestyle",
    "free 7 day challenge",
    "whatsapp habit challenge",
    "energy habits India",
    "lifestyle habits",
    "daily habits",
    "morning routine",
  ],
  openGraph: {
    title: "7 Tiny High Performance Habits | Free 7-Day Challenge",
    description:
      "One small habit per day. 5 minutes each. Delivered on WhatsApp. Free.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "7 Tiny High Performance Habits | Free 7-Day Challenge",
    description: "One habit a day. 5 minutes each. WhatsApp. Free.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
