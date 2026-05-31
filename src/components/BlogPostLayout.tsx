import Link from "next/link";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  emoji: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  accent: string;
  bg: string;
  faqQuestion?: string;
  faqAnswer?: string;
  keywords?: string[];
}

export default function BlogPostLayout({
  children, emoji, category, readTime, date, title, accent,
}: BlogPostLayoutProps) {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans)", color: "#18181b" }}>
      <style>{`
        .blog-content p {
          font-size: 17px; line-height: 1.85; color: #4b5563;
          margin-bottom: 24px; font-weight: 400;
        }
        .blog-content h2 {
          font-size: 24px; font-weight: 800; color: #18181b;
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
        .blog-content a { color: #b8853a; }
        .callout {
          background: #fef9ec;
          border: 1px solid #f5d78e;
          border-radius: 16px; padding: 28px 32px; margin: 48px 0;
        }
        .callout p { color: #6b7280 !important; margin-bottom: 16px; }
        .callout a {
          color: #b8853a !important; font-weight: 700;
          text-decoration: none; font-size: 15px;
        }
        .callout a:hover { text-decoration: underline; }
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
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #b8853a, #8a6428)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.02em" }}>High Performance Club</span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/blogs" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
          <Link href="/#signup" style={{ background: "linear-gradient(135deg, #b8853a, #8a6428)", color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(184,133,58,0.35)" }}>Join Free →</Link>
        </div>
      </header>

      <main style={{ maxWidth: 740, margin: "0 auto", padding: "64px 32px 120px" }}>
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

          {/* Emoji hero block */}
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: `${accent}18`, border: `1px solid ${accent}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, marginBottom: 28,
          }}>
            {emoji}
          </div>

          <h1 style={{
            fontSize: "clamp(1.85rem, 4.5vw, 2.75rem)",
            fontWeight: 800, color: "#18181b",
            letterSpacing: "-0.035em", lineHeight: 1.12,
          }}>
            {title}
          </h1>
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
          <Link href="/#signup" style={{ background: "linear-gradient(135deg, #b8853a, #8a6428)", color: "#fff", padding: "10px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(184,133,58,0.3)" }}>Join free challenge →</Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e2dfd6", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club</p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Home</Link>
          <Link href="/blogs" style={{ fontSize: 13, color: "#b8853a", textDecoration: "none" }}>Blog</Link>
        </div>
      </footer>
    </div>
  );
}
