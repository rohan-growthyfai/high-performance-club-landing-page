"use client";

import { useEffect, useState } from "react";
import { T, BRAND } from "../theme";

/**
 * Interactive Marriage Intelligence Report.
 * Consumes /api/marriage/report. Guided-reveal: verdict -> alignment map ->
 * expandable dimension narratives with twin A/B bars -> blind spots ->
 * friction forecast -> discussion topics -> optional astrology section.
 * Polls status if the report isn't ready (partner hasn't finished).
 */

const LEVEL_META: Record<string, { label: string; c: string; bg: string }> = {
  very_strong: { label: "Very strong", c: T.strong, bg: T.strongBg },
  strong: { label: "Strong", c: T.strong, bg: T.strongBg },
  moderate: { label: "Moderate", c: T.medium, bg: T.mediumBg },
  complementary: { label: "Complementary", c: T.medium, bg: T.mediumBg },
  needs_discussion: { label: "Needs discussion", c: T.discuss, bg: T.discussBg },
  potential_conflict: { label: "Potential conflict", c: T.discuss, bg: T.discussBg },
};

interface Comparison { trait: string; a: number; b: number; kind: string; }
interface Alignment { dimension: string; level: string; score: number; confidence: string; comparisons: Comparison[]; }
interface DimNarr { dimension: string; name: string; level: string; score: number; confidence: string; body: string; tip?: string; }
interface Report {
  names: { a: string; b: string };
  analysis: { alignments: Record<string, Alignment>; overall: { strengths: string[]; growthAreas: string[]; dealBreakerFlags: string[]; confidence: string } };
  narrative: {
    headline: string; summary: string; dimensions: DimNarr[];
    strengths: string[]; blindSpots: { title: string; body: string }[];
    frictionForecast: string; discussionTopics: { category: string; question: string; prompts: string[] }[];
    generatedBy: string;
  };
  astrology: Record<string, unknown> | null;
  astrologyAvailable: boolean;
}

export default function ReportPage() {
  const [code, setCode] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("code");
    if (!c) { setError("No report code in the link."); setLoading(false); return; }
    setCode(c);
    load(c);
  }, []);

  async function load(c: string) {
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/marriage/report?code=${c}`);
      const data = await res.json();
      if (res.status === 409 || data.pending) { setPending(true); setLoading(false); return; }
      if (!data.ok) throw new Error(data.error);
      setReport(data as Report);
      setPending(false);
    } catch (err) { setError(err instanceof Error ? err.message : "Could not load the report."); }
    finally { setLoading(false); }
  }

  if (loading) return <Center><p style={muted}>Preparing your report…</p></Center>;
  if (pending) return (
    <Center>
      <Card>
        <div style={{ fontSize: 40, marginBottom: 8 }}>⏳</div>
        <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px" }}>Almost there</h2>
        <p style={muted}>One of you still has to finish the questions. Your report unlocks the moment both are done.</p>
        <button onClick={() => code && load(code)} style={cta}>Check again</button>
        <p style={{ ...muted, fontSize: 12.5, marginTop: 12 }}>Code: <strong>{code}</strong></p>
      </Card>
    </Center>
  );
  if (error || !report) return <Center><p style={{ ...muted, color: T.discuss }}>{error || "Report unavailable."}</p></Center>;

  const { names, analysis, narrative } = report;
  const dimNarr = new Map(narrative.dimensions.map((d) => [d.dimension, d]));

  return (
    <main style={{ fontFamily: T.serif, color: T.ink, background: T.paper, minHeight: "100vh", padding: "0 20px 80px" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        {/* masthead */}
        <header style={{ textAlign: "center", padding: "48px 0 26px", borderBottom: `1px solid ${T.rule}` }}>
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke={T.accent} strokeWidth="1.5" style={{ marginBottom: 14 }}>
            <circle cx="18" cy="24" r="11" /><circle cx="30" cy="24" r="11" />
          </svg>
          <div style={eyebrow}>Marriage Intelligence Report · {BRAND}</div>
          <h1 style={{ fontSize: "clamp(26px,5vw,40px)", fontWeight: 500, margin: "8px 0 8px" }}>{names.a} &amp; {names.b}</h1>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.inkFaint }}>Answered independently · {narrative.dimensions.length} dimensions</div>
        </header>

        {/* verdict */}
        <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 14, boxShadow: T.shadow, padding: "28px 28px", margin: "28px 0" }}>
          <p style={{ fontSize: "clamp(19px,3vw,25px)", lineHeight: 1.4, fontWeight: 500, margin: "0 0 12px" }}>{narrative.headline}</p>
          <p style={{ color: T.inkSoft, fontSize: 16, lineHeight: 1.6, margin: 0 }}>{narrative.summary}</p>
        </div>

        {/* alignment map */}
        <SecHead>Where you stand, dimension by dimension</SecHead>
        <div style={{ border: `1px solid ${T.rule}`, borderRadius: 12, overflow: "hidden", background: T.rule, display: "grid", gap: 1 }}>
          {narrative.dimensions.map((d) => {
            const m = LEVEL_META[d.level] || LEVEL_META.moderate;
            const isOpen = open === d.dimension;
            const al = analysis.alignments[d.dimension];
            return (
              <div key={d.dimension} style={{ background: T.card }}>
                <button onClick={() => setOpen(isOpen ? null : d.dimension)} style={rowBtn}>
                  <span style={{ fontSize: 16.5, fontWeight: 500 }}>{d.name}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ ...tag, color: m.c, background: m.bg }}>{m.label}</span>
                    <span style={{ color: T.inkFaint, fontFamily: T.sans, fontSize: 18, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .15s" }}>›</span>
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: "4px 18px 20px" }}>
                    {/* twin bars */}
                    {al && al.comparisons.slice(0, 6).map((c) => (
                      <TwinBar key={c.trait} trait={c.trait} a={c.a} b={c.b} nameA={names.a} nameB={names.b} />
                    ))}
                    <p style={{ fontSize: 15, color: T.inkSoft, lineHeight: 1.6, marginTop: 12 }}>{d.body}</p>
                    {d.tip && <div style={tipBox}>{d.tip}</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.inkFaint, marginTop: 10 }}>Tap any dimension to see how each of you scored and what it means.</p>

        {/* strengths */}
        {narrative.strengths.length > 0 && (
          <>
            <SecHead>Your natural strengths</SecHead>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {narrative.strengths.map((s, i) => (
                <span key={i} style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.strong, background: T.strongBg, borderRadius: 999, padding: "8px 15px" }}>✓ {s}</span>
              ))}
            </div>
          </>
        )}

        {/* blind spots */}
        {narrative.blindSpots.length > 0 && (
          <>
            <SecHead>Your blind spots</SecHead>
            <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 14, boxShadow: T.shadow, overflow: "hidden" }}>
              {narrative.blindSpots.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "16px 20px", borderBottom: i < narrative.blindSpots.length - 1 ? `1px solid ${T.rule}` : "none" }}>
                  <span style={{ flex: "none", width: 26, height: 26, borderRadius: 8, background: T.discussBg, color: T.discuss, display: "grid", placeItems: "center", fontFamily: T.sans, fontWeight: 700, fontSize: 13 }}>!</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{b.title}</div>
                    <div style={{ fontSize: 14.5, color: T.inkSoft, lineHeight: 1.55 }}>{b.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* friction forecast */}
        <SecHead>Friction forecast</SecHead>
        <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 14, boxShadow: T.shadow, padding: "20px 22px" }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: T.inkSoft }}>{narrative.frictionForecast}</p>
        </div>

        {/* discussion topics */}
        <SecHead>Questions to discuss before you decide</SecHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {narrative.discussionTopics.map((t, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 12, boxShadow: T.shadow, padding: "18px 18px" }}>
              <div style={eyebrow}>{t.category}</div>
              <p style={{ fontSize: 16.5, fontWeight: 500, margin: "8px 0 12px", lineHeight: 1.4 }}>{t.question}</p>
              <ul style={{ margin: 0, paddingLeft: 18, color: T.inkSoft, fontSize: 14.5, lineHeight: 1.6 }}>
                {t.prompts.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* optional astrology */}
        {report.astrologyAvailable && report.astrology && <AstrologySection astro={report.astrology} />}

        {/* footer note */}
        <div style={{ marginTop: 30, background: T.paper2, borderRadius: 12, padding: "16px 18px", fontFamily: T.sans, fontSize: 12.5, color: T.inkSoft, lineHeight: 1.6 }}>
          This report is generated from your independent answers, scored against established relationship psychology (Big Five, attachment theory, Gottman conflict research, Schwartz values). It is decision <em>support</em> — a mirror for good conversations, not a prediction or a judgment. The final choice is yours.
          {narrative.generatedBy === "fallback" && <span> (Narrative generated in offline mode.)</span>}
        </div>
      </div>
    </main>
  );
}

function TwinBar({ trait, a, b, nameA, nameB }: { trait: string; a: number; b: number; nameA: string; nameB: string }) {
  const label = trait.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.inkFaint, marginBottom: 5 }}>{label}</div>
      <div style={{ display: "grid", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.a, width: 64, flex: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nameA}</span>
          <div style={barTrack}><div style={{ ...barFill, width: `${a}%`, background: T.a }} /></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.b, width: 64, flex: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nameB}</span>
          <div style={barTrack}><div style={{ ...barFill, width: `${b}%`, background: T.b }} /></div>
        </div>
      </div>
    </div>
  );
}

function AstrologySection({ astro }: { astro: Record<string, unknown> }) {
  const verdict = (astro.verdict as { label?: string; summary?: string }) || {};
  const ashtakoota = (astro.ashtakoota as { totalScore?: number; maxScore?: number }) || {};
  const doshas = (astro.doshas as { nadiDosha?: boolean; bhakootDosha?: boolean }) || {};
  return (
    <div style={{ marginTop: 40, border: `1px dashed ${T.rule}`, borderRadius: 14, padding: "26px 24px", background: "repeating-linear-gradient(135deg, transparent 0 22px, rgba(31,111,92,.02) 22px 23px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ ...eyebrow }}>Optional · Traditional astrological perspective</span>
        <div style={{ height: 1, background: T.rule, flex: 1 }} />
      </div>
      <p style={{ color: T.inkSoft, fontSize: 14.5, margin: "0 0 14px", lineHeight: 1.6 }}>
        You both chose to include this. It's offered as a traditional cultural lens, kept entirely separate from the psychological report above — never as proof, and it does not change any conclusion drawn from your answers.
      </p>
      {ashtakoota.totalScore !== undefined && (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ fontFamily: T.serif }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: T.accent }}>{ashtakoota.totalScore}<span style={{ fontSize: 16, color: T.inkFaint }}> / {ashtakoota.maxScore ?? 36}</span></div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.inkFaint }}>Ashtakoota Guna Milan</div>
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.inkSoft }}>
            <div><strong>{verdict.label}</strong></div>
            <div>Nadi Dosha: {doshas.nadiDosha ? "present" : "not present"} · Bhakoot Dosha: {doshas.bhakootDosha ? "present" : "not present"}</div>
          </div>
        </div>
      )}
      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.inkFaint, marginTop: 14 }}>Computed from date of birth only. Manglik &amp; marriage timing need exact birth time and place.</p>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) { return <main style={{ fontFamily: T.serif, background: T.paper, minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 }}>{children}</main>; }
function Card({ children }: { children: React.ReactNode }) { return <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 18, boxShadow: T.shadow, padding: "34px 28px", maxWidth: 440, textAlign: "center" }}>{children}</div>; }
function SecHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "40px 0 16px" }}>
      <h2 style={{ fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 13, fontWeight: 700, margin: 0, whiteSpace: "nowrap" }}>{children}</h2>
      <div style={{ height: 1, background: T.rule, flex: 1 }} />
    </div>
  );
}

const eyebrow: React.CSSProperties = { fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 11.5, color: T.accent, fontWeight: 700 };
const muted: React.CSSProperties = { color: T.inkSoft, fontFamily: T.sans, fontSize: 15, lineHeight: 1.6, margin: 0 };
const cta: React.CSSProperties = { marginTop: 18, background: `linear-gradient(90deg,${T.accentDeep},${T.accent})`, color: "#fff", border: "none", borderRadius: 12, padding: "13px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: T.sans };
const rowBtn: React.CSSProperties = { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "16px 18px", textAlign: "left", color: T.ink };
const tag: React.CSSProperties = { fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 999, whiteSpace: "nowrap" };
const tipBox: React.CSSProperties = { marginTop: 12, padding: "10px 14px", borderLeft: `3px solid ${T.accent}`, background: T.accentSoft, borderRadius: "0 8px 8px 0", fontSize: 14.5, color: T.inkSoft, fontFamily: T.sans };
const barTrack: React.CSSProperties = { height: 8, background: T.paper2, borderRadius: 999, flex: 1, overflow: "hidden" };
const barFill: React.CSSProperties = { height: "100%", borderRadius: 999, transition: "width .5s" };
