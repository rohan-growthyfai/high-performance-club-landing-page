"use client";

import { useState } from "react";

/**
 * Kundali Match — free Ashtakoota (Guna Milan) compatibility matcher.
 *
 * Enter two people's name + date of birth → instant 36-point compatibility
 * report computed from the real sidereal Moon position, with every koota
 * traced to a classical Jyotish text. DOB-only (no birth time) MVP.
 *
 * NOTE: "Kundali Match" is a working placeholder name — search-and-replace
 * BRAND below once the final product name is chosen.
 */

const BRAND = "Kundali Match";

// ---- Types mirroring the API report shape (src/lib/kundali/report.ts) ----
interface Source { text: string; reference: string; }
interface Koota {
  key: string; name: string; score: number; max: number;
  boy: string; girl: string; explanation: string; source: Source; isDosha?: boolean;
}
interface Profile {
  name: string; dob: string; nakshatra: string; pada: number;
  rashi: string; rashiEnglish: string;
}
interface Report {
  boy: Profile; girl: Profile;
  ashtakoota: { kootas: Koota[]; totalScore: number; maxScore: number };
  verdict: { band: string; label: string; summary: string; percentage: number };
  doshas: { nadiDosha: boolean; bhakootDosha: boolean; notes: string[] };
  dataQuality: { hasUncertainty: boolean; warnings: string[] };
  sources: Source[];
  disclaimer: string;
}

const BAND_COLORS: Record<string, { ring: string; text: string; bg: string }> = {
  excellent: { ring: "#16a34a", text: "#15803d", bg: "#f0fdf4" },
  good: { ring: "#22c55e", text: "#16a34a", bg: "#f0fdf4" },
  acceptable: { ring: "#d97706", text: "#b45309", bg: "#fffbeb" },
  caution: { ring: "#ea580c", text: "#c2410c", bg: "#fff7ed" },
  not_advised: { ring: "#dc2626", text: "#b91c1c", bg: "#fef2f2" },
};

export default function KundaliMatchPage() {
  const [boyName, setBoyName] = useState("");
  const [boyDob, setBoyDob] = useState("");
  const [girlName, setGirlName] = useState("");
  const [girlDob, setGirlDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setReport(null);
    if (!boyName || !girlName || !boyDob || !girlDob) {
      setError("Please fill in both names and both dates of birth.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/kundali-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boyName, boyDob, girlName, girlDob }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Something went wrong.");
      setReport(data.report as Report);
      setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate the report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: "var(--font-sans, Inter, system-ui, sans-serif)", color: "#1c1917", background: "#fdfcfb", minHeight: "100vh" }}>
      {/* ---------- HERO ---------- */}
      <section style={{ background: "linear-gradient(160deg, #2a1a4a 0%, #3d1d5e 45%, #6d28d9 100%)", color: "#fff", padding: "64px 20px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,.08) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, marginBottom: 16, border: "1px solid rgba(255,255,255,.25)", borderRadius: 999, padding: "5px 14px" }}>
            ✦ Ancient Vedic Wisdom · Free
          </div>
          <h1 style={{ fontFamily: "var(--font-serif-accent, Fraunces, serif)", fontSize: "clamp(30px, 6vw, 48px)", fontWeight: 500, lineHeight: 1.12, margin: "0 0 16px" }}>
            Is this the right match<br />for a lifetime together?
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.4vw, 18px)", opacity: 0.9, lineHeight: 1.6, maxWidth: 560, margin: "0 auto 8px" }}>
            The same <strong>Kundali matching (Guna Milan)</strong> Indian families have trusted for generations — now instant, and with the <strong>exact ancient text</strong> behind every point. No guesswork. No made-up predictions.
          </p>
          <p style={{ fontSize: 14, opacity: 0.7, marginTop: 18 }}>
            Enter two names and dates of birth below ↓
          </p>
        </div>
      </section>

      {/* ---------- FORM ---------- */}
      <section style={{ maxWidth: 720, margin: "-32px auto 0", padding: "0 20px 40px", position: "relative", zIndex: 2 }}>
        <form onSubmit={onSubmit} style={{ background: "#fff", borderRadius: 20, boxShadow: "0 18px 50px rgba(45,20,80,.14)", padding: "28px 24px", border: "1px solid #f0ebf7" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <PersonFields label="Groom / Person 1" emoji="🤵" name={boyName} setName={setBoyName} dob={boyDob} setDob={setBoyDob} accent="#6d28d9" />
            <PersonFields label="Bride / Person 2" emoji="👰" name={girlName} setName={setGirlName} dob={girlDob} setDob={setGirlDob} accent="#db2777" />
          </div>

          {error && (
            <div style={{ marginTop: 16, background: "#fef2f2", color: "#b91c1c", padding: "10px 14px", borderRadius: 10, fontSize: 14 }}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={{ marginTop: 20, width: "100%", background: loading ? "#a78bda" : "linear-gradient(90deg,#6d28d9,#9333ea)", color: "#fff", border: "none", borderRadius: 12, padding: "15px 20px", fontSize: 17, fontWeight: 700, cursor: loading ? "default" : "pointer", boxShadow: "0 8px 22px rgba(109,40,217,.35)", transition: "transform .1s" }}>
            {loading ? "Reading the stars…" : "✨ Reveal the Compatibility Report — Free"}
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "#78716c", marginTop: 12 }}>
            Based on date of birth only. 100% free. No sign-up needed.
          </p>
        </form>
      </section>

      {/* ---------- REPORT ---------- */}
      {report && <ReportView report={report} />}

      {/* ---------- HOW IT WORKS (only before a report) ---------- */}
      {!report && (
        <section style={{ maxWidth: 760, margin: "8px auto 0", padding: "20px 20px 60px" }}>
          <h2 style={{ fontFamily: "var(--font-serif-accent, Fraunces, serif)", fontWeight: 500, fontSize: 26, textAlign: "center", marginBottom: 8 }}>Why families trust this</h2>
          <p style={{ textAlign: "center", color: "#57534e", maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Most astrology apps invent vague, generic text. We do the opposite.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            <InfoCard icon="🔭" title="Real astronomy" body="We compute the exact position of the Moon at your date of birth using a precise ephemeris — the same math professional Jyotish software uses." />
            <InfoCard icon="📜" title="Cited from ancient texts" body="Every single point traces to Brihat Parashara Hora Shastra & Muhurta Chintamani. We show you the source — we never make it up." />
            <InfoCard icon="⚖️" title="Honest, not flattering" body="If there's a Nadi or Bhakoot Dosha, we tell you plainly — and note when it can be cancelled. Truth over comfort." />
          </div>
        </section>
      )}

      <footer style={{ borderTop: "1px solid #eee", padding: "28px 20px", textAlign: "center", fontSize: 12, color: "#a8a29e" }}>
        {BRAND} · Traditional Vedic Guna Milan · For cultural & educational purposes
      </footer>
    </main>
  );
}

// ---------- sub-components ----------
function PersonFields({ label, emoji, name, setName, dob, setDob, accent }: {
  label: string; emoji: string; name: string; setName: (v: string) => void;
  dob: string; setDob: (v: string) => void; accent: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: accent, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span> {label}
      </div>
      <label style={labelStyle}>Full name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul" style={inputStyle} />
      <label style={{ ...labelStyle, marginTop: 12 }}>Date of birth</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} min="1900-01-01" max="2100-12-31" style={inputStyle} />
    </div>
  );
}

function InfoCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #f0ebf7", borderRadius: 14, padding: "18px 16px" }}>
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13.5, color: "#57534e", lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

function ReportView({ report }: { report: Report }) {
  const c = BAND_COLORS[report.verdict.band] || BAND_COLORS.acceptable;
  const pct = report.verdict.percentage;
  return (
    <section id="report" style={{ maxWidth: 800, margin: "12px auto 0", padding: "24px 20px 60px" }}>
      {/* verdict card */}
      <div style={{ background: c.bg, border: `1.5px solid ${c.ring}33`, borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: c.text, fontWeight: 700, marginBottom: 14 }}>
          {report.boy.name} &nbsp;✕&nbsp; {report.girl.name}
        </div>
        <ScoreRing score={report.ashtakoota.totalScore} pct={pct} color={c.ring} />
        <div style={{ fontFamily: "var(--font-serif-accent, Fraunces, serif)", fontSize: 26, fontWeight: 500, color: c.text, margin: "16px 0 8px" }}>
          {report.verdict.label}
        </div>
        <p style={{ color: "#44403c", fontSize: 15, lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>{report.verdict.summary}</p>
      </div>

      {/* birth details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
        <BirthCard p={report.boy} accent="#6d28d9" />
        <BirthCard p={report.girl} accent="#db2777" />
      </div>

      {/* data quality warnings */}
      {report.dataQuality.hasUncertainty && (
        <div style={{ marginTop: 16, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#92400e", marginBottom: 6 }}>⚠ A note on precision (birth time)</div>
          {report.dataQuality.warnings.map((w, i) => (
            <p key={i} style={{ fontSize: 13, color: "#78350f", lineHeight: 1.55, margin: "4px 0" }}>{w}</p>
          ))}
        </div>
      )}

      {/* dosha strip */}
      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <DoshaChip label="Nadi Dosha" active={report.doshas.nadiDosha} />
        <DoshaChip label="Bhakoot Dosha" active={report.doshas.bhakootDosha} />
      </div>

      {/* koota breakdown */}
      <h3 style={{ fontFamily: "var(--font-serif-accent, Fraunces, serif)", fontWeight: 500, fontSize: 22, margin: "30px 0 6px" }}>
        The 8 Kootas — point by point
      </h3>
      <p style={{ fontSize: 13.5, color: "#78716c", marginBottom: 16 }}>
        Each factor below is computed from the Moon positions and cited to its classical source.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {report.ashtakoota.kootas.map((k) => <KootaCard key={k.key} k={k} />)}
      </div>

      {/* sources */}
      <h3 style={{ fontFamily: "var(--font-serif-accent, Fraunces, serif)", fontWeight: 500, fontSize: 20, margin: "30px 0 10px" }}>
        📜 Classical sources used
      </h3>
      <ul style={{ paddingLeft: 18, color: "#44403c", fontSize: 14, lineHeight: 1.7 }}>
        {report.sources.map((s, i) => (
          <li key={i}><strong>{s.text}</strong> — {s.reference}</li>
        ))}
      </ul>

      {/* disclaimer */}
      <div style={{ marginTop: 26, background: "#f5f5f4", borderRadius: 12, padding: "16px 18px", fontSize: 12.5, color: "#57534e", lineHeight: 1.6 }}>
        {report.disclaimer}
      </div>
    </section>
  );
}

function ScoreRing({ score, pct, color }: { score: number; pct: number; color: string }) {
  const r = 54, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto" }}>
      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e7e5e4" strokeWidth="11" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 34, fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 13, color: "#78716c", marginTop: 2 }}>of 36</div>
      </div>
    </div>
  );
}

function BirthCard({ p, accent }: { p: Profile; accent: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "16px 16px" }}>
      <div style={{ fontWeight: 700, color: accent, fontSize: 15, marginBottom: 8 }}>{p.name}</div>
      <Row label="Moon sign (Rashi)" value={`${p.rashi} · ${p.rashiEnglish}`} />
      <Row label="Birth star (Nakshatra)" value={`${p.nakshatra} (pada ${p.pada})`} />
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13.5, padding: "3px 0" }}>
      <span style={{ color: "#78716c" }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function DoshaChip({ label, active }: { label: string; active: boolean }) {
  return (
    <div style={{ flex: "1 1 140px", textAlign: "center", borderRadius: 10, padding: "10px 12px", fontSize: 13.5, fontWeight: 700, background: active ? "#fef2f2" : "#f0fdf4", color: active ? "#b91c1c" : "#15803d", border: `1px solid ${active ? "#fecaca" : "#bbf7d0"}` }}>
      {active ? "⚠" : "✓"} {label}: {active ? "Present" : "Not present"}
    </div>
  );
}

function KootaCard({ k }: { k: Koota }) {
  const pctFull = k.score >= k.max * 0.75;
  const barColor = k.isDosha && k.score === 0 ? "#dc2626" : pctFull ? "#16a34a" : k.score === 0 ? "#dc2626" : "#d97706";
  return (
    <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{k.name} {k.isDosha && k.score === 0 && <span style={{ color: "#b91c1c", fontSize: 12, fontWeight: 700 }}>· Dosha</span>}</div>
        <div style={{ fontWeight: 800, fontSize: 15, color: barColor }}>{k.score} / {k.max}</div>
      </div>
      <div style={{ height: 6, background: "#f5f5f4", borderRadius: 4, margin: "8px 0 10px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(k.score / k.max) * 100}%`, background: barColor, borderRadius: 4 }} />
      </div>
      <div style={{ fontSize: 12.5, color: "#78716c", marginBottom: 6 }}>
        {k.name === "Bhakoot" || k.name === "Tara (Dina)" ? k.boy + " ↔ " + k.girl : <><strong>{k.boy}</strong> ↔ <strong>{k.girl}</strong></>}
      </div>
      <p style={{ fontSize: 13.5, color: "#44403c", lineHeight: 1.55, margin: "0 0 8px" }}>{k.explanation}</p>
      <div style={{ fontSize: 11.5, color: "#a8a29e", borderTop: "1px dashed #eee", paddingTop: 6 }}>
        📖 Source: <em>{k.source.text}</em> — {k.source.reference}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: 12.5, color: "#78716c", fontWeight: 600, marginBottom: 5 };
const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid #e7e5e4", borderRadius: 10, padding: "11px 12px", fontSize: 15, outline: "none", background: "#fafaf9" };
