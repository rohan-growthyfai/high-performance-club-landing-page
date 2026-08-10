"use client";

import { useEffect, useMemo, useState } from "react";
import { T, BRAND } from "../theme";

/**
 * Questionnaire — ONE question per screen. The respondent must answer the
 * current question before they can advance (the Next button stays disabled
 * until an option is chosen). Progress is autosaved to localStorage so a
 * long assessment survives refreshes and resumes at the first unanswered
 * question. On finish, submits to /api/marriage/submit.
 */
interface Opt { label: string; value: number; }
// A question in presentation order, carrying its section + phase context.
interface FlatQ { id: string; text: string; type: string; options: Opt[]; dimension: string; sectionName: string; part: string; phase: string }

export default function AssessPage() {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [flat, setFlat] = useState<FlatQ[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  // phase: "intro" -> per-question (index 0..N-1) -> "birth" -> submit
  const [phase, setPhase] = useState<"intro" | "question" | "birth">("intro");
  const [qIndex, setQIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<null | { code: string; bothComplete: boolean }>(null);
  const [alreadyDone, setAlreadyDone] = useState<null | { code: string }>(null);

  const storageKey = token ? `mip:${token}` : "";

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    if (!t) { setError("This link is missing its assessment token."); setLoading(false); return; }
    setToken(t);
    (async () => {
      try {
        const [qRes, sRes] = await Promise.all([
          fetch("/api/marriage/questions"),
          fetch(`/api/marriage/status?token=${t}`),
        ]);
        const qData = await qRes.json();
        const sData = await sRes.json();
        if (qData.ok) setFlat(qData.questions as FlatQ[]);
        if (sData.ok) {
          if (sData.yourName) setName(sData.yourName);
          if (sData.youSubmitted) setAlreadyDone({ code: sData.code });
        }
        const saved = localStorage.getItem(`mip:${t}`);
        if (saved) { try { const p = JSON.parse(saved); if (p.answers) setAnswers(p.answers); if (p.name) setName(p.name); if (p.dob) setDob(p.dob); } catch {} }
      } catch { setError("Could not load the assessment. Please refresh."); }
      finally { setLoading(false); }
    })();
  }, []);

  // autosave
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify({ answers, name, dob }));
  }, [answers, name, dob, storageKey]);

  const total = flat.length;
  const answeredCount = Object.keys(answers).length;
  const pct = total ? Math.round((answeredCount / total) * 100) : 0;
  const current = phase === "question" ? flat[qIndex] : null;
  const currentAnswered = current ? answers[current.id] !== undefined : false;

  function beginQuestions() {
    // resume at the first unanswered question, else the start
    const firstUnanswered = flat.findIndex((q) => answers[q.id] === undefined);
    setQIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
    setPhase("question");
    scrollTop();
  }

  function choose(val: number) {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: val }));
  }

  function goNext() {
    setError("");
    if (!currentAnswered) return; // guard — button is disabled anyway
    if (qIndex < total - 1) { setQIndex((i) => i + 1); scrollTop(); }
    else { setPhase("birth"); scrollTop(); }
  }
  function goPrev() {
    setError("");
    if (qIndex > 0) { setQIndex((i) => i - 1); scrollTop(); }
    else { setPhase("intro"); scrollTop(); }
  }

  async function submit() {
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (answeredCount < total) { setError(`Please answer all questions first (${answeredCount}/${total}).`); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/marriage/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name: name.trim(), answers, dob: dob || undefined }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      localStorage.removeItem(storageKey);
      setDone({ code: data.code, bothComplete: data.bothComplete });
    } catch (err) { setError(err instanceof Error ? err.message : "Could not submit."); }
    finally { setSubmitting(false); }
  }

  // ---- render states ----
  if (loading) return <Center><p style={muted}>Loading your assessment…</p></Center>;
  if (error && !flat.length) return <Center><p style={{ ...muted, color: T.discuss }}>{error}</p></Center>;

  if (alreadyDone && !done) return (
    <Center><Card>
      <Big>✓</Big>
      <h2 style={h2}>You've already completed your part</h2>
      <p style={pMuted}>Your answers are saved. When your partner finishes, your report will be ready.</p>
      <a href={`/marriage/report?code=${alreadyDone.code}`} style={cta}>View report status →</a>
    </Card></Center>
  );

  if (done) return (
    <Center><Card>
      <Big>{done.bothComplete ? "🎉" : "✓"}</Big>
      <h2 style={h2}>{done.bothComplete ? "Both of you are done!" : "Your answers are saved"}</h2>
      <p style={pMuted}>{done.bothComplete ? "Your Marriage Intelligence Report is ready to view." : "When the other person finishes their questions, your report will unlock automatically."}</p>
      <a href={`/marriage/report?code=${done.code}`} style={cta}>{done.bothComplete ? "Open our report →" : "Go to report page →"}</a>
      <p style={{ ...pMuted, fontSize: 12.5, marginTop: 14 }}>Your code: <strong>{done.code}</strong></p>
    </Card></Center>
  );

  return (
    <main style={{ fontFamily: T.serif, color: T.ink, background: T.paper, minHeight: "100vh" }}>
      {/* sticky progress */}
      <div style={{ position: "sticky", top: 0, zIndex: 5, background: "rgba(246,242,234,.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${T.rule}`, padding: "12px 20px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 12, color: T.inkFaint, marginBottom: 6 }}>
            <span>{BRAND}</span>
            <span>{phase === "question" ? `Question ${qIndex + 1} of ${total}` : `${answeredCount} / ${total} answered`}</span>
          </div>
          <div style={{ height: 6, background: T.paper2, borderRadius: 999 }}>
            <div style={{ height: "100%", width: `${phase === "question" ? Math.round(((qIndex + (currentAnswered ? 1 : 0)) / total) * 100) : pct}%`, background: T.accent, borderRadius: 999, transition: "width .3s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px 60px", minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {phase === "intro" && (
          <div>
            <Eyebrow>Welcome</Eyebrow>
            <h1 style={{ fontSize: "clamp(26px,4.5vw,36px)", fontWeight: 500, lineHeight: 1.15, margin: "6px 0 14px" }}>Answer honestly — this is for you.</h1>
            <p style={pBody}>There are no right answers. You'll see <strong>one question at a time</strong> and choose an answer before moving on. It takes about 30 minutes, and your progress saves automatically — you can close this and come back to where you left off.</p>
            <label style={lbl}>Your name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav" style={inp} />
            <button onClick={() => { if (!name.trim()) { setError("Please enter your name."); return; } setError(""); beginQuestions(); }} style={cta}>
              {answeredCount > 0 && answeredCount < total ? `Resume (question ${flat.findIndex((q) => answers[q.id] === undefined) + 1}) →` : "Begin the questions →"}
            </button>
            {error && <div style={errBox}>{error}</div>}
          </div>
        )}

        {phase === "question" && current && (
          <div key={current.id} style={{ animation: "mipfade .25s ease" }}>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, fontWeight: 700, marginBottom: 4 }}>
              {current.phase}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.inkFaint, marginBottom: 20 }}>
              {current.sectionName} · Question {qIndex + 1} of {total}
            </div>

            <h2 style={{ fontSize: "clamp(21px,3.6vw,28px)", fontWeight: 500, lineHeight: 1.35, margin: "0 0 26px", textWrap: "balance" as const }}>
              {current.text}
            </h2>

            <div style={{ display: "grid", gap: 10 }}>
              {current.options.map((o) => {
                const active = answers[current.id] === o.value;
                return (
                  <button key={o.value + o.label} onClick={() => choose(o.value)} style={optBtn(active)}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${active ? T.accent : T.rule}`, background: active ? T.accent : "transparent", flex: "none", display: "grid", placeItems: "center" }}>
                      {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                    </span>
                    <span>{o.label}</span>
                  </button>
                );
              })}
            </div>

            {error && <div style={errBox}>{error}</div>}

            <div style={{ display: "flex", gap: 10, marginTop: 28, alignItems: "center" }}>
              <button onClick={goPrev} style={btnBack}>← Back</button>
              <button
                onClick={goNext}
                disabled={!currentAnswered}
                style={{ ...cta, marginTop: 0, opacity: currentAnswered ? 1 : 0.45, cursor: currentAnswered ? "pointer" : "not-allowed" }}
              >
                {qIndex === total - 1 ? "Continue →" : "Next →"}
              </button>
            </div>
            {!currentAnswered && (
              <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.inkFaint, textAlign: "center", marginTop: 12 }}>
                Choose an answer to continue
              </p>
            )}
          </div>
        )}

        {phase === "birth" && (
          <div>
            <Eyebrow>Optional · Traditional astrology add-on</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 500, margin: "6px 0 10px" }}>Want the traditional astrological perspective too?</h2>
            <p style={pBody}>Entirely optional and kept separate from your compatibility report. If you'd like a classical Kundali-matching section (shown only if both of you add a date of birth), enter your date of birth. Otherwise, skip it.</p>
            <label style={lbl}>Your date of birth (optional)</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} min="1900-01-01" max="2100-12-31" style={inp} />
            {error && <div style={errBox}>{error}</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={() => { setPhase("question"); setQIndex(total - 1); scrollTop(); }} style={btnBack}>← Back</button>
              <button onClick={submit} disabled={submitting} style={{ ...cta, marginTop: 0, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Submitting…" : "Finish & submit →"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes mipfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </main>
  );
}

function scrollTop() { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }

// ---- layout helpers ----
function Center({ children }: { children: React.ReactNode }) { return <main style={{ fontFamily: T.serif, background: T.paper, minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 }}>{children}</main>; }
function Card({ children }: { children: React.ReactNode }) { return <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 18, boxShadow: T.shadow, padding: "34px 28px", maxWidth: 460, textAlign: "center" }}>{children}</div>; }
function Eyebrow({ children }: { children: React.ReactNode }) { return <div style={{ fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 11.5, color: T.accent, fontWeight: 700 }}>{children}</div>; }
function Big({ children }: { children: React.ReactNode }) { return <div style={{ fontSize: 40, marginBottom: 8 }}>{children}</div>; }

const lbl: React.CSSProperties = { display: "block", fontFamily: T.sans, fontSize: 12.5, color: T.inkSoft, fontWeight: 600, margin: "16px 0 6px" };
const inp: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: `1px solid ${T.rule}`, borderRadius: 10, padding: "12px 13px", fontSize: 16, outline: "none", background: "#fafaf9", fontFamily: T.sans };
const cta: React.CSSProperties = { marginTop: 20, width: "100%", display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box", background: `linear-gradient(90deg,${T.accentDeep},${T.accent})`, color: "#fff", border: "none", borderRadius: 12, padding: "14px 20px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: T.sans, boxShadow: "0 8px 22px rgba(31,111,92,.3)" };
const btnBack: React.CSSProperties = { flex: "none", background: "#fff", color: T.inkSoft, border: `1.5px solid ${T.rule}`, borderRadius: 12, padding: "14px 18px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: T.sans };
const h2: React.CSSProperties = { fontSize: 22, fontWeight: 500, margin: "0 0 8px" };
const pMuted: React.CSSProperties = { color: T.inkSoft, fontSize: 15, lineHeight: 1.6, margin: 0 };
const pBody: React.CSSProperties = { color: T.inkSoft, fontSize: 16, lineHeight: 1.65, margin: "0 0 8px" };
const errBox: React.CSSProperties = { marginTop: 16, background: T.discussBg, color: T.discuss, padding: "10px 13px", borderRadius: 10, fontSize: 14, fontFamily: T.sans };
const muted: React.CSSProperties = { color: T.inkSoft, fontFamily: T.sans, fontSize: 15, lineHeight: 1.6, margin: 0 };

function optBtn(active: boolean): React.CSSProperties {
  return { display: "flex", alignItems: "center", gap: 13, textAlign: "left", fontFamily: T.sans, fontSize: 16, padding: "16px 18px", borderRadius: 12, cursor: "pointer", border: `1.5px solid ${active ? T.accent : T.rule}`, background: active ? T.accentSoft : "#fff", color: T.ink, lineHeight: 1.4, transition: "all .12s", boxShadow: active ? "0 2px 10px rgba(31,111,92,.12)" : "none" };
}
