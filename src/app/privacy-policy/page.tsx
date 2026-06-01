import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — High Performance Club",
  description: "Privacy Policy for High Performance Club, operated by Growthyfai Technologies Private Limited.",
};

export default function PrivacyPolicy() {
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

        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "#18181b" }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Last updated: June 2026</p>

        <div style={{ fontSize: 17, lineHeight: 1.85, color: "#4b5563" }}>
          <p>This Privacy Policy describes how <strong style={{ color: "#18181b" }}>High Performance Club</strong>, owned and operated by <strong style={{ color: "#18181b" }}>Growthyfai Technologies Private Limited</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), collects, uses, and protects your personal information when you use our website at <strong style={{ color: "#18181b" }}>highperformanceclub.co</strong> and participate in our WhatsApp habit challenge.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>1. Information We Collect</h2>
          <p>When you register for the High Performance Club 7-Day Challenge, we collect:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}><strong style={{ color: "#18181b" }}>First name</strong> — to personalise your WhatsApp messages</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: "#18181b" }}>WhatsApp number</strong> — to deliver your daily habit messages</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: "#18181b" }}>Email address</strong> — for programme updates and support communication</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: "#18181b" }}>Self-reported struggle area</strong> — to personalise your experience</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: "#18181b" }}>Registration timestamp</strong> — for programme scheduling</li>
          </ul>
          <p>We also automatically collect standard website analytics data (pages visited, time on site, device type) via Google Analytics. This data is anonymised and aggregated.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>2. How We Use Your Information</h2>
          <p>We use your information solely to:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}>Deliver the 7-day WhatsApp habit challenge messages</li>
            <li style={{ marginBottom: 10 }}>Communicate support and programme updates</li>
            <li style={{ marginBottom: 10 }}>Improve our content and user experience</li>
            <li style={{ marginBottom: 10 }}>Send you information about related programmes (only with your consent)</li>
          </ul>
          <p>We do <strong style={{ color: "#18181b" }}>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>3. WhatsApp Communication</h2>
          <p>By registering and ticking the consent checkbox, you agree to receive WhatsApp messages from High Performance Club for the duration of the 7-day challenge. You can stop receiving messages at any time by replying <strong style={{ color: "#18181b" }}>STOP</strong> to any message. We use Pabbly Chatflow (a WhatsApp Business API provider) to deliver messages.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>4. Data Storage and Security</h2>
          <p>Your registration data is stored securely in Google Sheets, accessible only to authorised team members of Growthyfai Technologies Private Limited. We implement reasonable security measures to protect your data from unauthorised access. However, no internet transmission is 100% secure.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>5. Cookies</h2>
          <p>We use Google Analytics cookies to understand how visitors interact with our website. These are analytics-only cookies and do not track you across other websites. You can disable cookies in your browser settings.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}>Request access to the personal data we hold about you</li>
            <li style={{ marginBottom: 10 }}>Request correction or deletion of your data</li>
            <li style={{ marginBottom: 10 }}>Withdraw consent for WhatsApp messages at any time (reply STOP)</li>
            <li style={{ marginBottom: 10 }}>Lodge a complaint with the relevant data protection authority</li>
          </ul>
          <p>To exercise these rights, email us at <a href="mailto:contact@highperformanceclub.com" style={{ color: "#b8853a" }}>contact@highperformanceclub.com</a>.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>7. Third-Party Services</h2>
          <p>We use the following third-party services, each with their own privacy policies:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}>Google Analytics — website analytics</li>
            <li style={{ marginBottom: 10 }}>Pabbly Connect &amp; Pabbly Chatflow — WhatsApp message delivery</li>
            <li style={{ marginBottom: 10 }}>Vercel — website hosting</li>
            <li style={{ marginBottom: 10 }}>Google Sheets — participant data storage</li>
          </ul>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Continued use of our services after any changes constitutes your acceptance of the updated policy.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#18181b", marginTop: 48, marginBottom: 16 }}>9. Contact Us</h2>
          <p>For any privacy-related questions or requests, contact us at:</p>
          <p><strong style={{ color: "#18181b" }}>Growthyfai Technologies Private Limited</strong><br />Email: <a href="mailto:contact@highperformanceclub.com" style={{ color: "#b8853a" }}>contact@highperformanceclub.com</a></p>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid #e2dfd6", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club · Growthyfai Technologies Private Limited</p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: "#b8853a", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms-and-conditions" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Terms</Link>
          <Link href="/contact" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
