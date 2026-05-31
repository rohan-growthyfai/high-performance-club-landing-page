"use client";
// metadata is in layout.tsx
import Link from "next/link";

const posts = [
  {
    slug: "why-tiny-habits-work",
    title: "Why Tiny Habits Work — And Why Big Goals Usually Don't",
    excerpt:
      "Most people try to change too much at once. Science shows the opposite approach — starting absurdly small — is what actually sticks.",
    category: "Habit Science",
    readTime: "5 min read",
    date: "May 2026",
    emoji: "🧠",
    accent: "#f97316",
    accentLight: "#fff7ed",
    featured: true,
    number: "01",
  },
  {
    slug: "5-minute-habits-for-busy-people",
    title: "5-Minute Habits That Actually Work for Busy People",
    excerpt:
      "If you have 5 minutes between meetings, you have enough time to build a life-changing habit. These deliver the highest return on the smallest time investment.",
    category: "Productivity",
    readTime: "6 min read",
    date: "May 2026",
    emoji: "⚡",
    accent: "#10b981",
    accentLight: "#ecfdf5",
    featured: false,
    number: "02",
  },
  {
    slug: "science-behind-habit-stacking",
    title: "The Science Behind Habit Stacking — And How to Use It",
    excerpt:
      "Habit stacking is the most underrated productivity technique most people have never heard of. It piggybacks new behaviours onto existing ones, making them automatic.",
    category: "Neuroscience",
    readTime: "7 min read",
    date: "May 2026",
    emoji: "🔬",
    accent: "#6366f1",
    accentLight: "#eef2ff",
    featured: false,
    number: "03",
  },
  {
    slug: "morning-habits-that-change-your-day",
    title: "3 Morning Habits That Change How Your Entire Day Feels",
    excerpt:
      "You do not need an hour-long morning routine. These three habits — each under 5 minutes — set the tone for your energy, focus, and calmness.",
    category: "Morning Routine",
    readTime: "5 min read",
    date: "May 2026",
    emoji: "🌅",
    accent: "#b8853a",
    accentLight: "#fef9ec",
    featured: false,
    number: "04",
  },
];

export default function BlogsPage() {
  return (
    <div style={{
      background: "#faf8f3",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      color: "#18181b",
    }}>

      {/* Header */}
      <header style={{
        background: "rgba(250,248,243,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #e2dfd6",
        padding: "0 32px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, #b8853a, #8a6428)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em",
          }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.02em" }}>
            High Performance Club
          </span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/blogs" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>
            Blog
          </Link>
          <Link href="/#signup" style={{
            background: "linear-gradient(135deg, #b8853a, #8a6428)",
            color: "#fff", padding: "9px 22px", borderRadius: 999,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 4px 16px rgba(184,133,58,0.35)",
          }}>
            Join Free →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px 120px" }}>

        {/* Page hero */}
        <div style={{ marginBottom: 80 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(184,133,58,0.12)", border: "1px solid rgba(184,133,58,0.25)",
            borderRadius: 999, padding: "6px 16px", marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b8853a", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b8853a" }}>
              High Performance Blog
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            marginBottom: 20,
            color: "#18181b",
          }}>
            Tiny habits.
            <br />
            <span style={{
              background: "linear-gradient(135deg, #18181b 0%, #b8853a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Real results.
            </span>
          </h1>

          <p style={{
            fontSize: 18, color: "#6b7280", maxWidth: 480,
            lineHeight: 1.65, fontWeight: 400,
          }}>
            Practical writing on building tiny daily habits that stick — for busy people who have already tried the complicated approach.
          </p>
        </div>

        {/* Featured post — full width */}
        <Link href={`/blogs/${posts[0].slug}`} style={{ textDecoration: "none", display: "block", marginBottom: 20 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f3f0e8 100%)",
              border: "1px solid #e5e7eb",
              borderRadius: 24,
              padding: "48px 52px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 48,
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.border = "1px solid rgba(184,133,58,0.4)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(184,133,58,0.08), 0 20px 60px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Background accent */}
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 240, height: 240,
              background: `radial-gradient(circle, ${posts[0].accent}15 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative" }}>
              {/* Featured badge */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                <span style={{
                  background: "#f3f4f6", border: "1px solid #e5e7eb",
                  color: "#6b7280", fontSize: 10, fontWeight: 700,
                  padding: "4px 12px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase",
                }}>Featured</span>
                <span style={{
                  background: `${posts[0].accent}22`, border: `1px solid ${posts[0].accent}44`,
                  color: posts[0].accent, fontSize: 10, fontWeight: 700,
                  padding: "4px 12px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase",
                }}>{posts[0].category}</span>
              </div>

              <h2 style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 800, color: "#18181b",
                letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16,
              }}>
                {posts[0].title}
              </h2>

              <p style={{
                fontSize: 16, color: "#6b7280",
                lineHeight: 1.7, marginBottom: 28, maxWidth: 520,
              }}>
                {posts[0].excerpt}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  color: posts[0].accent, fontSize: 14, fontWeight: 700,
                }}>
                  Read article
                  <span style={{ fontSize: 18 }}>→</span>
                </span>
                <span style={{ color: "#9ca3af", fontSize: 13 }}>
                  {posts[0].readTime} · {posts[0].date}
                </span>
              </div>
            </div>

            {/* Right — big emoji */}
            <div style={{
              width: 120, height: 120,
              background: `radial-gradient(circle, ${posts[0].accent}25 0%, ${posts[0].accent}08 100%)`,
              border: `1px solid ${posts[0].accent}30`,
              borderRadius: 28,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 56,
              flexShrink: 0,
            }}>
              {posts[0].emoji}
            </div>
          </div>
        </Link>

        {/* 3 smaller posts grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {posts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  padding: "32px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${post.accent}50`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${post.accent}10`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 140, height: 140,
                  background: `radial-gradient(circle, ${post.accent}12 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Post number */}
                <span style={{
                  fontSize: 11, fontWeight: 700, color: "#d1d5db",
                  letterSpacing: "0.15em", marginBottom: 20, display: "block",
                }}>{post.number}</span>

                {/* Emoji */}
                <div style={{
                  width: 52, height: 52,
                  background: `${post.accent}18`,
                  border: `1px solid ${post.accent}28`,
                  borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 20,
                }}>
                  {post.emoji}
                </div>

                {/* Category */}
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: post.accent,
                  background: `${post.accent}18`, border: `1px solid ${post.accent}30`,
                  padding: "3px 10px", borderRadius: 999,
                  marginBottom: 14, display: "inline-block", alignSelf: "flex-start",
                }}>{post.category}</span>

                {/* Title */}
                <h2 style={{
                  fontSize: 17, fontWeight: 800, color: "#18181b",
                  letterSpacing: "-0.02em", lineHeight: 1.3,
                  marginBottom: 12, flexGrow: 1,
                }}>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p style={{
                  fontSize: 13.5, color: "#9ca3af",
                  lineHeight: 1.65, marginBottom: 24,
                }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: 16,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 13, color: "#9ca3af" }}>
                    {post.readTime}
                  </span>
                  <span style={{
                    fontSize: 13, fontWeight: 700, color: post.accent,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA section */}
        <div style={{
          marginTop: 80,
          background: "linear-gradient(135deg, #ffffff 0%, #f3f0e8 100%)",
          border: "1px solid rgba(184,133,58,0.2)",
          borderRadius: 24,
          padding: "52px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, left: -80,
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(184,133,58,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <p style={{
              fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#b8853a", fontWeight: 700, marginBottom: 12,
            }}>
              Ready to start?
            </p>
            <h3 style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800, color: "#18181b",
              letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12,
            }}>
              Stop reading about habits.
              <br />Start building them.
            </h3>
            <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 420 }}>
              One tiny high-performance habit delivered to your WhatsApp every morning. Free. 7 days. No app required.
            </p>
          </div>

          <Link href="/#signup" style={{
            background: "linear-gradient(135deg, #b8853a 0%, #8a6428 100%)",
            color: "#fff", padding: "16px 36px",
            borderRadius: 999, fontSize: 16, fontWeight: 700,
            textDecoration: "none", whiteSpace: "nowrap",
            boxShadow: "0 8px 32px rgba(184,133,58,0.4)",
            display: "inline-block", flexShrink: 0,
          }}>
            Join for ₹997 FREE →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #e5e7eb",
        padding: "32px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          © 2026 High Performance Club
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Home</Link>
          <Link href="/blogs" style={{ fontSize: 13, color: "#b8853a", textDecoration: "none" }}>Blog</Link>
        </div>
      </footer>
    </div>
  );
}
