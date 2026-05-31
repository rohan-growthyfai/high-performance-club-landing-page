"use client";
import Link from "next/link";
// metadata is in layout.tsx


const posts = [
  {
    slug: "why-tiny-habits-work",
    title: "Why Tiny Habits Work — And Why Big Goals Usually Don't",
    excerpt:
      "Most people try to change too much at once. Science shows the opposite approach — starting absurdly small — is what actually sticks. Here is why, and what it means for your daily routine.",
    category: "Habit Science",
    readTime: "5 min read",
    date: "May 2026",
    emoji: "🧠",
    accent: "#f97316",
    bg: "#fff7ed",
  },
  {
    slug: "5-minute-habits-for-busy-people",
    title: "5-Minute Habits That Actually Work for Busy People",
    excerpt:
      "If you have 5 minutes between meetings, you have enough time to build a life-changing habit. These are the habits that deliver the highest return on the smallest time investment.",
    category: "Productivity",
    readTime: "6 min read",
    date: "May 2026",
    emoji: "⚡",
    accent: "#10b981",
    bg: "#ecfdf5",
  },
  {
    slug: "science-behind-habit-stacking",
    title: "The Science Behind Habit Stacking — And How to Use It",
    excerpt:
      "Habit stacking is the most underrated productivity technique most people have never heard of. It piggybacks new behaviours onto existing ones, making them almost automatic.",
    category: "Neuroscience",
    readTime: "7 min read",
    date: "May 2026",
    emoji: "🔬",
    accent: "#6366f1",
    bg: "#eef2ff",
  },
  {
    slug: "morning-habits-that-change-your-day",
    title: "3 Morning Habits That Change How Your Entire Day Feels",
    excerpt:
      "You do not need an hour-long morning routine. These three habits — each under 5 minutes — set the tone for your energy, focus, and calmness for the rest of the day.",
    category: "Morning Routine",
    readTime: "5 min read",
    date: "May 2026",
    emoji: "🌅",
    accent: "#b8853a",
    bg: "#fef9ec",
  },
];

export default function BlogsPage() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <header style={{
        background: "rgba(250,248,243,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2dfd6",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #b8853a, #8a6428)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 15,
          }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.01em" }}>
            High Performance Club
          </span>
        </Link>
        <Link href="/#signup" style={{
          background: "linear-gradient(180deg, #b8853a 0%, #8a6428 100%)",
          color: "#fff", padding: "8px 20px", borderRadius: 999,
          fontSize: 14, fontWeight: 600, textDecoration: "none",
        }}>
          Join Free →
        </Link>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 100px" }}>
        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{
            fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#b8853a", fontWeight: 700, marginBottom: 12,
          }}>
            High Performance Blog
          </p>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
            color: "#18181b", letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Tiny habits.
            <br />
            <span style={{
              background: "linear-gradient(135deg, #18181b 0%, #b8853a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Real results.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Practical articles on building tiny daily habits that actually stick — written for busy people who have already tried the complicated approach.
          </p>
        </div>

        {/* Post grid */}
        <div style={{ display: "grid", gap: 24 }}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #e2dfd6",
                  borderRadius: 20,
                  padding: "28px 32px",
                  display: "grid",
                  gridTemplateColumns: i === 0 ? "1fr" : "auto 1fr",
                  gap: 24,
                  alignItems: "center",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(184,133,58,0.15)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#b8853a";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e2dfd6";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Emoji block — not shown for first (featured) post */}
                {i !== 0 && (
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: post.bg,
                    border: `1.5px solid ${post.accent}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, flexShrink: 0,
                  }}>
                    {post.emoji}
                  </div>
                )}

                <div>
                  {/* Featured badge */}
                  {i === 0 && (
                    <div style={{ marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{
                        background: "#b8853a", color: "#fff",
                        fontSize: 10, fontWeight: 700, padding: "3px 10px",
                        borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase",
                      }}>Featured</span>
                      <span style={{ fontSize: 40 }}>{post.emoji}</span>
                    </div>
                  )}

                  {/* Category + meta */}
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.08em", color: post.accent,
                      background: post.bg, padding: "3px 10px", borderRadius: 999,
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>{post.readTime}</span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>· {post.date}</span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: i === 0 ? 24 : 19, fontWeight: 800,
                    color: "#18181b", letterSpacing: "-0.02em",
                    lineHeight: 1.25, marginBottom: 10,
                  }}>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, marginBottom: 16 }}>
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: "#b8853a",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    Read article →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA banner */}
        <div style={{
          marginTop: 72,
          background: "linear-gradient(135deg, #fef9ec 0%, #fff7ed 100%)",
          border: "2px solid #f5d78e",
          borderRadius: 24,
          padding: "40px 36px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#b8853a", fontWeight: 700, marginBottom: 12 }}>
            Ready to try it yourself?
          </p>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: "#18181b", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Join the free 7-day challenge.
          </h3>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
            One tiny habit per day. Delivered free on WhatsApp. No gym. No diet. Just 5 minutes.
          </p>
          <Link href="/#signup" style={{
            background: "linear-gradient(180deg, #b8853a 0%, #8a6428 100%)",
            color: "#fff", padding: "14px 36px", borderRadius: 999,
            fontSize: 16, fontWeight: 700, textDecoration: "none", display: "inline-block",
          }}>
            Join for ₹997 FREE →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #e2dfd6", background: "#f3f0e8",
        padding: "32px 24px", textAlign: "center",
      }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          © 2026 High Performance Club · <Link href="/" style={{ color: "#b8853a", textDecoration: "none" }}>Back to home</Link>
        </p>
      </footer>
    </div>
  );
}
