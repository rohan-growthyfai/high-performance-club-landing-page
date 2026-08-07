"use client";

import { useState } from "react";
import { T, BRAND } from "./theme";

/**
 * Marriage Intelligence Platform — landing / start page.
 * Person A enters their name, gets a shareable link for their partner, and
 * begins their own assessment. The value prop leads (know who you're
 * marrying), astrology is not the hero.
 */
export default function MarriageLanding() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<{ code: string; selfToken: string; partnerToken: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const partnerLink = created ? `${origin}/marriage/assess?token=${created.partnerToken}` : "";

  async function start(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Please enter your name to begin."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/marriage/create", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setCreated({ code: data.code, selfToken: data.selfToken, partnerToken: data.partnerToken });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start. Try again.");
    } finally { setLoading(false); }
  }

  function copyLink() {
    navigator.clipboard.writeText(partnerLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main style={{ fontFamily: T.serif, color: T.ink, background: T.paper, minHeight: "100vh" }}>
      {/* hero */}
      <section style={{ background: "linear-gradient(165deg,#173d33 0%,#1f6f5c 60%,#2f8f77 100%)", color: "#fff", padding: "64px 20px 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "radial-gradient(circle at 25% 30%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 60%, #fff 1px, transparent 1px)", backgroundSize: "44px 44px, 64px 64px" }} />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="1.5" style={{ marginBottom: 18, opacity: 0.95 }}>
            <circle cx="18" cy="24" r="11" /><circle cx="30" cy="24" r="11" />
          </svg>
          <div style={{ fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 12, opacity: 0.85, marginBottom: 14 }}>Marriage Intelligence · {BRAND}</div>
          <h1 style={{ fontSize: "clamp(30px,5.6vw,48px)", fontWeight: 500, lineHeight: 1.1, margin: "0 0 16px" }}>
            Know who you're marrying<br />before you marry them.
          </h1>
          <p style={{ fontSize: "clamp(15px,2.4vw,18px)", opacity: 0.92, lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            You both answer a deep set of questions — <strong>independently</strong> — about values, money, family, conflict, children and more. Then you each get an honest, research-based report on how you truly fit. So your only job left is to <em>meet and talk about what matters.</em>
          </p>
        </div>
      </section>

      {/* start card */}
      <section style={{ maxWidth: 620, margin: "-40px auto 0", padding: "0 20px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ background: T.card, borderRadius: 20, boxShadow: T.shadow, border: `1px solid ${T.rule}`, padding: "30px 26px" }}>
          {!created ? (
            <form onSubmit={start}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 6px" }}>Start your assessment</h2>
              <p style={{ color: T.inkSoft, fontSize: 15, margin: "0 0 20px" }}>Enter your name. You'll get a private link to share with the other person — you each answer on your own.</p>
              <label style={lbl}>Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav" style={inp} />
              {error && <div style={errBox}>{error}</div>}
              <button type="submit" disabled={loading} style={{ ...btn, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Creating your assessment…" : "Begin →"}
              </button>
              <p style={{ textAlign: "center", fontSize: 12.5, color: T.inkFaint, marginTop: 14 }}>Free · ~30 minutes · No account needed</p>
            </form>
          ) : (
            <div>
              <div style={{ fontSize: 34, textAlign: "center", marginBottom: 6 }}>✓</div>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 6px", textAlign: "center" }}>Your assessment is ready</h2>
              <p style={{ color: T.inkSoft, fontSize: 15, textAlign: "center", margin: "0 0 20px" }}>
                Share this private link with the other person. They answer independently — the report unlocks when you both finish.
              </p>
              <div style={{ background: T.accentSoft, border: `1px solid ${T.accent}33`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accentDeep, marginBottom: 6 }}>Partner's link</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, wordBreak: "break-all", color: T.inkSoft }}>{partnerLink}</div>
              </div>
              <button onClick={copyLink} style={{ ...btnGhost, marginBottom: 16 }}>{copied ? "✓ Copied!" : "Copy partner link"}</button>
              <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.inkFaint, textAlign: "center", marginBottom: 18 }}>
                Assessment code: <strong style={{ color: T.ink, letterSpacing: "0.08em" }}>{created.code}</strong> — keep this to view your report later.
              </div>
              <a href={`/marriage/assess?token=${created.selfToken}`} style={{ ...btn, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
                Start my questions →
              </a>
            </div>
          )}
        </div>

        {/* trust row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginTop: 22 }}>
          {[
            ["📚", "Grounded in real psychology", "Big Five, attachment theory, Gottman & Schwartz values research — not made-up quizzes."],
            ["🪞", "Honest, not flattering", "We surface blind spots and hard conversations, not a feel-good score."],
            ["🇮🇳", "Built for Indian families", "Family, in-laws, community and tradition are woven throughout."],
          ].map(([i, t, b]) => (
            <div key={t} style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 12, padding: "14px 14px" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{i}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t}</div>
              <div style={{ fontSize: 12.5, color: T.inkSoft, lineHeight: 1.5 }}>{b}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${T.rule}`, padding: "24px 20px", textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.inkFaint }}>
        {BRAND} · Decision support, not a verdict · Your answers are private to your match.
      </footer>
    </main>
  );
}

const lbl: React.CSSProperties = { display: "block", fontFamily: T.sans, fontSize: 12.5, color: T.inkSoft, fontWeight: 600, marginBottom: 6 };
const inp: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: `1px solid ${T.rule}`, borderRadius: 10, padding: "12px 13px", fontSize: 16, outline: "none", background: "#fafaf9", fontFamily: T.sans };
const btn: React.CSSProperties = { marginTop: 18, width: "100%", background: `linear-gradient(90deg,${T.accentDeep},${T.accent})`, color: "#fff", border: "none", borderRadius: 12, padding: "15px 20px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: T.sans, boxShadow: "0 8px 22px rgba(31,111,92,.3)" };
const btnGhost: React.CSSProperties = { width: "100%", background: "#fff", color: T.accentDeep, border: `1.5px solid ${T.accent}`, borderRadius: 12, padding: "12px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: T.sans };
const errBox: React.CSSProperties = { marginTop: 14, background: T.discussBg, color: T.discuss, padding: "10px 13px", borderRadius: 10, fontSize: 14, fontFamily: T.sans };
