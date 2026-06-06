"use client";
import Link from "next/link";
import ExitIntentPopup from "./ExitIntentPopup";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  emoji: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  accent: string;
  bg: string;
  heroImage?: string;
  faqQuestion?: string;
  faqAnswer?: string;
  keywords?: string[];
}

export default function BlogPostLayout({
  children, emoji, category, readTime, date, title, accent, heroImage,
}: BlogPostLayoutProps) {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans)", color: "#18181b" }}>
      <style>{`
        .blog-content p {
          font-size: clamp(14px, 3.5vw, 17px); line-height: 1.85; color: #4b5563;
          margin-bottom: 24px; font-weight: 400;
        }
        .blog-content h2 {
          font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #18181b;
          letter-spacing: -0.03em; margin: 52px 0 18px; line-height: 1.25;
        }
        .blog-content h3 {
          font-size: 18px; font-weight: 700; color: #18181b;
          letter-spacing: -0.02em; margin: 36px 0 14px;
        }
        .blog-content strong { color: #18181b; font-weight: 700; }
        .blog-content ul, .blog-content ol {
          padding-left: 24px; margin-bottom: 24px;
        }
        .blog-content li {
          font-size: 17px; line-height: 1.8; color: #4b5563;
          margin-bottom: 10px;
        }
        .blog-content a { color: #4caf6e; }
        .callout {
          background: #fef9ec;
          border: 1px solid #f5d78e;
          border-radius: 16px; padding: 28px 32px; margin: 48px 0;
        }
        .callout p { color: #6b7280 !important; margin-bottom: 16px; }
        .callout a {
          color: #4caf6e !important; font-weight: 700;
          text-decoration: none; font-size: 15px;
        }
        .callout a:hover { text-decoration: underline; }
        .blog-content .inline-cta {
          margin: 4px 0 32px !important;
        }
        .blog-content .inline-cta a {
          display: inline-block;
          color: #4caf6e !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          text-decoration: underline !important;
          text-underline-offset: 3px;
          line-height: 1.6;
        }
        .blog-content .inline-cta a:hover {
          color: #3d9b5a !important;
        }
        .blog-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2dfd6, transparent);
          margin: 52px 0;
        }
      `}</style>

      {/* Header */}
      <header style={{
        background: "rgba(250,248,243,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #e2dfd6",
        padding: "0 32px", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}><img src="/hpc-logo.png" alt="High Performance Club" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.02em" }}>High Performance Club</span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/blogs" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
          <Link href="/" style={{ background: "linear-gradient(135deg, #4caf6e, #3d9b5a)", color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(76, 175, 110,0.35)" }}>Join Free →</Link>
        </div>
      </header>

      <main style={{ maxWidth: 740, margin: "0 auto", padding: "clamp(24px,5vw,64px) clamp(16px,4vw,32px) clamp(60px,8vw,120px)" }}>
        {/* Back link */}
        <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#9ca3af", textDecoration: "none", marginBottom: 52, fontWeight: 600, letterSpacing: "0.02em", transition: "color 0.2s" }}>
          ← All articles
        </Link>

        {/* Article hero */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: accent, background: `${accent}18`, border: `1px solid ${accent}30`, padding: "4px 12px", borderRadius: 999 }}>{category}</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{readTime}</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>· {date}</span>
          </div>

          {/* Hero image (AI-generated) + emoji badge */}
          <div style={{ position: "relative", marginBottom: 32 }}>
            {heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt={title}
                style={{
                  width: "100%", height: "clamp(180px,45vw,340px)", objectFit: "cover",
                  borderRadius: 20, display: "block",
                  border: "1px solid #e5e7eb",
                }}
              />
            )}
            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: heroImage ? "rgba(250,248,243,0.95)" : `${accent}18`,
              border: `1px solid ${accent}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 34,
              position: heroImage ? "absolute" : "relative",
              bottom: heroImage ? -20 : undefined,
              left: heroImage ? 24 : undefined,
              marginBottom: heroImage ? 0 : 28,
              boxShadow: heroImage ? "0 4px 16px rgba(0,0,0,0.12)" : "none",
            }}>
              {emoji}
            </div>
          </div>

          <h1 style={{
            fontSize: "clamp(1.4rem, 4.5vw, 2.75rem)",
            fontWeight: 800, color: "#18181b",
            letterSpacing: "-0.035em", lineHeight: 1.12,
            marginBottom: 28,
          }}>
            {title}
          </h1>

          {/* Author / publisher strip */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 18px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
          }}>
            {/* Logo + name — links to homepage */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hpc-logo.png"
                alt="High Performance Club"
                style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#18181b", margin: 0, lineHeight: 1.3 }}>
                  High Performance Club
                </p>
                <p style={{ fontSize: 13, color: "#9ca3af", margin: 0, marginTop: 2 }}>
                  {date} · {readTime}
                </p>
              </div>
            </Link>

            {/* Social icons */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61590376203039"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="High Performance Club on Facebook"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: "#1877f2", color: "#fff", flexShrink: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/join.highperformanceclub/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="High Performance Club on Instagram"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "#fff", flexShrink: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="blog-divider" />

        {/* Article body */}
        <article className="blog-content">
          {children}
        </article>

        {/* Bottom nav */}
        <div style={{ marginTop: 72, paddingTop: 32, borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Link href="/blogs" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none", fontWeight: 600 }}>← All articles</Link>
          <Link href="/" style={{ background: "linear-gradient(135deg, #4caf6e, #3d9b5a)", color: "#fff", padding: "10px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(76, 175, 110,0.3)" }}>Join free challenge →</Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e2dfd6", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club</p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Home</Link>
          <Link href="/blogs" style={{ fontSize: 13, color: "#4caf6e", textDecoration: "none" }}>Blog</Link>
        </div>
      </footer>
      <ExitIntentPopup />
    </div>
  );
}
