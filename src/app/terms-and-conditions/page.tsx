import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — High Performance Club",
  description: "Terms and Conditions for High Performance Club, operated by Growthyfai Technologies Private Limited.",
};

export default function TermsAndConditions() {
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

        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "#18181b" }}>Terms &amp; Conditions</h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Last updated: June 2026</p>

        <div style={{ fontSize: 17, lineHeight: 1.85, color: "#4b5563" }}>
          <p>These Terms &amp; Conditions govern your use of the <strong style={{ color: "#18181b" }}>High Performance Club</strong> website and services, owned and operated by <strong style={{ color: "#18181b" }}>Growthyfai Technologies Private Limited</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing our website or participating in any of our programmes, you agree to be bound by these Terms.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>1. About the Service</h2>
          <p>High Performance Club offers a free 7-day WhatsApp habit challenge designed to help busy Indian professionals build small daily habits for improved energy, focus, productivity, and overall well-being. Participation is voluntary and entirely free.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>2. Eligibility</h2>
          <p>By registering, you confirm that you are at least 18 years of age and have the legal capacity to enter into these Terms. The services are intended for residents of India, though participation from other countries is not restricted.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>3. WhatsApp Consent</h2>
          <p>By submitting the registration form and ticking the consent checkbox, you explicitly consent to receive WhatsApp messages from High Performance Club for the 7-day challenge period. You may withdraw this consent at any time by replying <strong style={{ color: "#18181b" }}>STOP</strong> to any message. We will process your opt-out within 24 hours.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>4. Not Medical Advice</h2>
          <p>The content provided through High Performance Club — including WhatsApp messages, website articles, and any other materials — is for general lifestyle and habit education purposes only. It is <strong style={{ color: "#18181b" }}>not</strong> medical advice, nutritional prescription, therapeutic treatment, or a substitute for professional healthcare. If you have a medical condition, please consult a qualified healthcare professional before making any changes to your lifestyle or routine.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>5. Intellectual Property</h2>
          <p>All content on the High Performance Club website and delivered via WhatsApp — including text, images, graphics, and logos — is the property of Growthyfai Technologies Private Limited and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content for commercial purposes without prior written consent.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>6. User Conduct</h2>
          <p>You agree not to:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}>Register with false information</li>
            <li style={{ marginBottom: 10 }}>Use the service for any unlawful purpose</li>
            <li style={{ marginBottom: 10 }}>Attempt to reverse-engineer or disrupt our systems</li>
            <li style={{ marginBottom: 10 }}>Resell or commercially exploit our free content without permission</li>
          </ul>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Growthyfai Technologies Private Limited shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use our services. Our total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding the claim (which, for the free challenge, is zero).</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>8. Modifications to Service</h2>
          <p>We reserve the right to modify, suspend, or discontinue the service at any time without notice. We may also update these Terms periodically. Continued use of the service after any changes constitutes your acceptance of the revised Terms.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>9. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>10. Contact</h2>
          <p>For any questions about these Terms, contact us at:</p>
          <p><strong style={{ color: "#18181b" }}>Growthyfai Technologies Private Limited</strong><br />Email: <a href="mailto:contact@highperformanceclub.com" style={{ color: "#b8853a" }}>contact@highperformanceclub.com</a></p>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid #e2dfd6", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club · Growthyfai Technologies Private Limited</p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms-and-conditions" style={{ fontSize: 13, color: "#b8853a", textDecoration: "none" }}>Terms</Link>
          <Link href="/contact" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
