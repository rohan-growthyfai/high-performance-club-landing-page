import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No 'output: export' — server mode enables API routes (/api/signup)
  async headers() {
    return [
      {
        // Always serve fresh HTML for the AI Agents Masterclass funnel so
        // copy edits appear immediately (no stale CDN/browser cache).
        source: "/ai-agents-masterclass/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
        ],
      },
      {
        source: "/ai-agents-masterclass",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
        ],
      },
      {
        source: "/ai-career-masterclass/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
        ],
      },
      {
        source: "/ai-career-masterclass",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
