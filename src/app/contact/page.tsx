import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — High Performance Club",
  description: "Get in touch with the High Performance Club team. We are here to help.",
};

export default function Contact() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans)", color: "#18181b" }}>
      <header style={{ background: "rgba(250,248,243,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e2dfd6", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#b8853a,#8a6428)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.02em" }}>High Performance Club</span>
        </Link>
        <Link href="/" style={{ background: "linear-gradient(135deg,#b8853a,#8a6428)", color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Join Free →</Link>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 32px 100px" }}>
        <Link href="/" style={{ display: "inline-block", fontSize: 13, color: "#9ca3af", textDecoration: "none", marginBottom: 40, fontWeight: 600 }}>← Back to Home</Link>

        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, color: "#18181b" }}>Contact Us</h1>
        <p style={{ fontSize: 18, color: "#6b7280", marginBottom: 56, lineHeight: 1.7 }}>We would love to hear from you. Reach out for any questions, support, or feedback.</p>

        <div style={{ display: "grid", gap: 24, marginBottom: 56 }}>
          {/* Email */}
          <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "32px 36px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#b8853a", marginBottom: 12 }}>Email Support</p>
            <a href="mailto:contact@highperformanceclub.com" style={{ fontSize: 22, fontWeight: 800, color: "#18181b", textDecoration: "none", letterSpacing: "-0.02em" }}>
              contact@highperformanceclub.com
            </a>
            <p style={{ fontSize: 15, color: "#9ca3af", marginTop: 10 }}>We respond within 24 hours, Mon–Sat.</p>
          </div>

          {/* Response time */}
          <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "32px 36px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#b8853a", marginBottom: 12 }}>Support Hours</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#18181b" }}>Monday – Saturday</p>
            <p style={{ fontSize: 16, color: "#6b7280", marginTop: 6 }}>10:00 AM – 6:00 PM IST</p>
          </div>

          {/* Company */}
          <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "32px 36px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#b8853a", marginBottom: 12 }}>Company</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#18181b" }}>Growthyfai Technologies Private Limited</p>
            <p style={{ fontSize: 15, color: "#9ca3af", marginTop: 6 }}>High Performance Club is a product of Growthyfai Technologies Private Limited, proudly built in India.</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg,#fef9ec,#fff7ed)", border: "2px solid #f5d78e", borderRadius: 20, padding: "40px 36px", textAlign: "center" as const }}>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#b8853a", fontWeight: 700, marginBottom: 12 }}>Not yet in the challenge?</p>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#18181b", letterSpacing: "-0.025em", marginBottom: 12 }}>Join the free 7-day High Performance Club challenge.</h3>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28 }}>One tiny habit on WhatsApp every morning. Free. No app needed.</p>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#b8853a,#8a6428)", color: "#fff", padding: "14px 32px", borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(184,133,58,0.35)" }}>
            Join for Free →
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid #e2dfd6", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club · Growthyfai Technologies Private Limited</p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms-and-conditions" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Terms</Link>
          <Link href="/contact" style={{ fontSize: 13, color: "#b8853a", textDecoration: "none" }}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
