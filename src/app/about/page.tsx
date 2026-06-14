import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — High Performance Club",
  description: "Learn about High Performance Club and GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED — building tiny daily habits for busy Indians.",
};

export default function About() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans)", color: "#18181b" }}>
      <header style={{ background: "rgba(250,248,243,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e2dfd6", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}><img src="/hpc-logo.png" alt="High Performance Club" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.02em" }}>High Performance Club</span>
        </Link>
        <Link href="/" style={{ background: "linear-gradient(135deg,#b8853a,#8a6428)", color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Join Free →</Link>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 32px 100px" }}>
        <Link href="/" style={{ display: "inline-block", fontSize: 13, color: "#9ca3af", textDecoration: "none", marginBottom: 40, fontWeight: 600 }}>← Back to Home</Link>

        {/* Hero */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.15em", color: "#b8853a", marginBottom: 16 }}>About Us</p>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 24, color: "#18181b" }}>
            Built for Indians who keep starting — and stopping.
          </h1>
          <p style={{ fontSize: 19, color: "#6b7280", lineHeight: 1.75 }}>
            High Performance Club exists because most habit advice was designed for someone with a lot of time, a lot of motivation, and very little real life. That is not most Indians.
          </p>
        </div>

        {/* Story */}
        <div style={{ fontSize: 17, lineHeight: 1.85, color: "#4b5563", marginBottom: 56 }}>
          <p>We are a team of builders, coaches, and habit researchers who noticed the same pattern everywhere: busy Indian professionals — engineers, marketers, founders, managers — knew exactly what they should be doing. They had read the books. They had downloaded the apps. They had started and stopped more times than they could count.</p>

          <p>The problem was never knowledge. It was delivery. Every habit system put the burden on the user: open the app, log the habit, maintain the streak, re-engage after missing a day. Real life does not work that way.</p>

          <p>So we built something different. We deliver the habit to you — directly on WhatsApp, every morning at 6 AM. One tiny habit. Five minutes. Science-backed. No app to open. No streak to maintain. Just a message that meets you where you already are.</p>

          <p>The 7-Day High Performance Club Challenge is our starting point. One week. Seven habits. Each one small enough that the hardest part is not doing it — it is deciding to begin. We make that decision easy.</p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#18181b", letterSpacing: "-0.03em", marginBottom: 32 }}>What we believe</h2>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              { title: "Tiny beats big", body: "A 2-minute habit done daily beats a 1-hour habit done occasionally. We build for consistency, not intensity." },
              { title: "Delivery is design", body: "If the habit requires effort to access, most people won’t. WhatsApp has 500M+ active users in India. We meet people where they are." },
              { title: "Science, not trends", body: "Every habit in our challenge is backed by peer-reviewed research. No fads. No hacks. Just things that reliably work." },
              { title: "Built for India", body: "The challenges busy Indians face — long commutes, joint families, irregular schedules, heat, festivals — are specific. Our advice reflects that reality." },
            ].map(({ title, body }) => (
              <div key={title} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "28px 32px" }}>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", marginBottom: 8 }}>{title}</p>
                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company */}
        <div style={{ background: "linear-gradient(135deg,#fef9ec,#fff7ed)", border: "2px solid #f5d78e", borderRadius: 20, padding: "40px 36px", marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.15em", color: "#b8853a", marginBottom: 16 }}>The company behind it</p>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>High Performance Club is a wellness and personal growth initiative owned and operated by GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED.</p>
          <p style={{ fontSize: 14, color: "#9ca3af", fontWeight: 600, marginBottom: 4 }}>Operated by:</p>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", marginBottom: 8 }}>GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED</p>
          <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#b8853a", marginBottom: 6 }}>Registered Office</p>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>
            6th Floor, Office No 603,<br />
            Global Business Hub,<br />
            Survey No 1/1A &amp; 1/2/A,<br />
            Opposite EON IT Park,<br />
            Kharadi,<br />
            Pune, Maharashtra 411014, India
          </p>
          <p style={{ fontSize: 15, color: "#9ca3af" }}>Email: <a href="mailto:contact@highperformanceclub.co" style={{ color: "#b8853a" }}>contact@highperformanceclub.co</a></p>
          <p style={{ fontSize: 15, color: "#9ca3af", marginTop: 4 }}>Website: <a href="https://www.highperformanceclub.co" style={{ color: "#b8853a" }}>www.highperformanceclub.co</a></p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" as const }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#18181b", letterSpacing: "-0.025em", marginBottom: 12 }}>Ready to start your first tiny habit?</p>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28 }}>Join 2,000+ Indians in the free 7-day WhatsApp challenge.</p>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#b8853a,#8a6428)", color: "#fff", padding: "16px 36px", borderRadius: 999, fontSize: 17, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(184,133,58,0.35)" }}>
            Join for Free →
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid #e2dfd6", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club.</p>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Owned and operated by GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED.</p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms-and-conditions" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Terms</Link>
          <Link href="/contact" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
