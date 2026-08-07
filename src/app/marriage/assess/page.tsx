"use client";

import { useEffect, useMemo, useState } from "react";
import { T, BRAND } from "../theme";

/**
 * Questionnaire — one dimension (section) per screen, progress bar, answers
 * autosaved to localStorage so a long assessment survives refreshes. On
 * finish, submits to /api/marriage/submit and routes to the waiting/report
 * screen.
 */
interface Opt { label: string; value: number; }
interface Q { id: string; text: string; type: string; options: Opt[]; }
interface Group { dimension: string; name: string; blurb: string; part: string; questions: Q[]; }

export default function AssessPage() {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0); // 0 = intro, 1..N = dimension, N+1 = birth details, then submit
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<null | { code: string; bothComplete: boolean }>(null);
  const [alreadyDone, setAlreadyDone] = useState<null | { code: string }>(null);

  const storageKey = token ? `mip:${token}` : "";

  // load token + questions + status + saved answers
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
        if (qData.ok) setGroups(qData.groups);
        if (sData.ok) {
          if (sData.yourName) setName(sData.yourName);
          if (sData.youSubmitted) { setAlreadyDone({ code: sData.code }); }
        }
        const saved = localStorage.getItem(`mip:${t}`);
        if (saved) { try { const p = JSON.parse(saved); setAnswers(p.answers || {}); if (p.name) setName(p.name); if (p.dob) setDob(p.dob); } catch {} }
      } catch { setError("Could not load the assessment. Please refresh."); }
      finally { setLoading(false); }
    })();
  }, []);

  // autosave
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify({ answers, name, dob }));
  }, [answers, name, dob, storageKey]);

  const totalQ = useMemo(() => groups.reduce((s, g) => s + g.questions.length, 0), [groups]);
  const answeredQ = Object.keys(answers).length;
  const pct = totalQ ? Math.round((answeredQ / totalQ) * 100) : 0;

  const BIRTH_STEP = groups.length + 1;
  const isIntro = step === 0;
  const isBirth = step === BIRTH_STEP;
  const currentGroup = step >= 1 && step <= groups.length ? groups[step - 1] : null;

  function setAnswer(qid: string, val: number) {
    setAnswers((a) => ({ ...a, [qid]: val }));
  }

  function next() {
    setError("");
    if (currentGroup) {
      const unanswered = currentGroup.questions.filter((q) => answers[q.id] === undefined);
      if (unanswered.length > 0) {
        // soft gate: allow skipping but scroll to first unanswered
        const first = document.getElementById(`q-${unanswered[0].id}`);
        if (first) { first.scrollIntoView({ behavior: "smooth", block: "center" }); }
      }
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function prev() { setError(""); setStep((s) => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function submit() {
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (answeredQ < Math.floor(totalQ * 0.6)) { setError(`Please answer more questions first (${answeredQ}/${totalQ}).`); return; }
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

  // ----- render states -----
  if (loading) return <Center><p style={{ color: T.inkSoft, fontFamily: T.sans }}>Loading your assessment…</p></Center>;
  if (error && !groups.length) return <Center><p style={{ color: T.discuss, fontFamily: T.sans }}>{error}</p></Center>;

  if (alreadyDone && !done) return (
    <Center>
      <Card>
        <Big>✓</Big>
        <h2 style={h2}>You've already completed your part</h2>
        <p style={pMuted}>Your answers are saved. When your partner finishes, your report will be ready.</p>
        <a href={`/marriage/report?code=${alreadyDone.code}`} style={cta}>View report status →</a>
      </Card>
    </Center>
  );

  if (done) return (
    <Center>
      <Card>
        <Big>{done.bothComplete ? "🎉" : "✓"}</Big>
        <h2 style={h2}>{done.bothComplete ? "Both of you are done!" : "Your answers are saved"}</h2>
        <p style={pMuted}>
          {done.bothComplete
            ? "Your Marriage Intelligence Report is ready to view."
            : "When the other person finishes their questions, your report will unlock automatically."}
        </p>
        <a href={`/marriage/report?code=${done.code}`} style={cta}>{done.bothComplete ? "Open our report →" : "Go to report page →"}</a>
        <p style={{ ...pMuted, fontSize: 12.5, marginTop: 14 }}>Your code: <strong>{done.code}</strong></p>
      </Card>
    </Center>
  );

  return (
    <main style={{ fontFamily: T.serif, color: T.ink, background: T.paper, minHeight: "100vh" }}>
      {/* sticky progress */}
      <div style={{ position: "sticky", top: 0, zIndex: 5, background: "rgba(246,242,234,.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${T.rule}`, padding: "12px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 12, color: T.inkFaint, marginBottom: 6 }}>
            <span>{BRAND}</span><span>{answeredQ} / {totalQ} answered</span>
          </div>
          <div style={{ height: 6, background: T.paper2, borderRadius: 999 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: T.accent, borderRadius: 999, transition: "width .3s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 100px" }}>
        {isIntro && (
          <Section>
            <Eyebrow>Welcome</Eyebrow>
            <h1 style={{ fontSize: "clamp(26px,4.5vw,36px)", fontWeight: 500, lineHeight: 1.15, margin: "6px 0 14px" }}>Answer honestly — this is for you.</h1>
            <p style={pBody}>There are no right answers. Answer as you truly are, not as you think you should be — the whole value comes from two honest, independent perspectives. It takes about 30 minutes. Your progress saves automatically.</p>
            <label style={lbl}>Your name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav" style={inp} />
            <button onClick={next} style={cta}>Begin the questions →</button>
          </Section>
        )}

        {currentGroup && (
          <Section>
            <Eyebrow>Section {step} of {groups.length} · {currentGroup.part === "portrait" ? "About you" : "What you want"}</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 500, margin: "6px 0 6px" }}>{currentGroup.name}</h2>
            <p style={{ ...pBody, marginBottom: 22 }}>{currentGroup.blurb}</p>
            <div style={{ display: "grid", gap: 18 }}>
              {currentGroup.questions.map((q, i) => (
                <QuestionCard key={q.id} q={q} index={i + 1} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
              ))}
            </div>
            {error && <div style={errBox}>{error}</div>}
            <NavRow onPrev={prev} onNext={next} nextLabel={step === groups.length ? "Continue →" : "Next section →"} />
          </Section>
        )}

        {isBirth && (
          <Section>
            <Eyebrow>Optional · Traditional astrology add-on</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 500, margin: "6px 0 10px" }}>Want the traditional astrological perspective too?</h2>
            <p style={pBody}>Entirely optional and kept separate from your compatibility report. If you'd like a classical Kundali-matching section (shown only if both of you add a date of birth), enter your date of birth. Otherwise, skip it.</p>
            <label style={lbl}>Your date of birth (optional)</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} min="1900-01-01" max="2100-12-31" style={inp} />
            {error && <div style={errBox}>{error}</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={prev} style={btnBack}>← Back</button>
              <button onClick={submit} disabled={submitting} style={{ ...cta, marginTop: 0, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Submitting…" : "Finish & submit →"}
              </button>
            </div>
          </Section>
        )}
      </div>
    </main>
  );
}

function QuestionCard({ q, index, value, onChange }: { q: Q; index: number; value?: number; onChange: (v: number) => void }) {
  const isScale = q.type === "likert5" || q.type === "portrait";
  return (
    <div id={`q-${q.id}`} style={{ background: T.card, border: `1px solid ${value !== undefined ? T.accent + "55" : T.rule}`, borderRadius: 14, padding: "18px 18px", boxShadow: T.shadow }}>
      <div style={{ fontSize: 16.5, fontWeight: 500, lineHeight: 1.4, marginBottom: 14 }}>
        <span style={{ color: T.inkFaint, fontFamily: T.sans, fontSize: 13, marginRight: 8 }}>{index}.</span>{q.text}
      </div>
      {isScale ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {q.options.map((o) => (
            <button key={o.value} onClick={() => onChange(o.value)} style={scaleBtn(value === o.value)}>{o.label}</button>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {q.options.map((o) => (
            <button key={o.value + o.label} onClick={() => onChange(o.value)} style={choiceBtn(value === o.value)}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${value === o.value ? T.accent : T.rule}`, background: value === o.value ? T.accent : "transparent", flex: "none" }} />
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- small layout helpers ----
function Center({ children }: { children: React.ReactNode }) {
  return <main style={{ fontFamily: T.serif, background: T.paper, minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 }}>{children}</main>;
}
function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 18, boxShadow: T.shadow, padding: "34px 28px", maxWidth: 460, textAlign: "center" }}>{children}</div>;
}
function Section({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 11.5, color: T.accent, fontWeight: 700 }}>{children}</div>;
}
function Big({ children }: { children: React.ReactNode }) { return <div style={{ fontSize: 40, marginBottom: 8 }}>{children}</div>; }
function NavRow({ onPrev, onNext, nextLabel }: { onPrev: () => void; onNext: () => void; nextLabel: string }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
      <button onClick={onPrev} style={btnBack}>← Back</button>
      <button onClick={onNext} style={{ ...cta, marginTop: 0 }}>{nextLabel}</button>
    </div>
  );
}

const lbl: React.CSSProperties = { display: "block", fontFamily: T.sans, fontSize: 12.5, color: T.inkSoft, fontWeight: 600, margin: "16px 0 6px" };
const inp: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: `1px solid ${T.rule}`, borderRadius: 10, padding: "12px 13px", fontSize: 16, outline: "none", background: "#fafaf9", fontFamily: T.sans };
const cta: React.CSSProperties = { marginTop: 20, width: "100%", display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box", background: `linear-gradient(90deg,${T.accentDeep},${T.accent})`, color: "#fff", border: "none", borderRadius: 12, padding: "14px 20px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: T.sans, boxShadow: "0 8px 22px rgba(31,111,92,.3)" };
const btnBack: React.CSSProperties = { flex: "none", background: "#fff", color: T.inkSoft, border: `1.5px solid ${T.rule}`, borderRadius: 12, padding: "14px 18px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: T.sans };
const h2: React.CSSProperties = { fontSize: 22, fontWeight: 500, margin: "0 0 8px" };
const pMuted: React.CSSProperties = { color: T.inkSoft, fontSize: 15, lineHeight: 1.6, margin: 0 };
const pBody: React.CSSProperties = { color: T.inkSoft, fontSize: 16, lineHeight: 1.65, margin: "0 0 8px" };
const errBox: React.CSSProperties = { marginTop: 16, background: T.discussBg, color: T.discuss, padding: "10px 13px", borderRadius: 10, fontSize: 14, fontFamily: T.sans };

function scaleBtn(active: boolean): React.CSSProperties {
  return { flex: "1 1 auto", minWidth: 84, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, padding: "10px 8px", borderRadius: 9, cursor: "pointer", border: `1.5px solid ${active ? T.accent : T.rule}`, background: active ? T.accent : "#fff", color: active ? "#fff" : T.inkSoft, transition: "all .12s" };
}
function choiceBtn(active: boolean): React.CSSProperties {
  return { display: "flex", alignItems: "center", gap: 11, textAlign: "left", fontFamily: T.sans, fontSize: 14.5, padding: "12px 14px", borderRadius: 10, cursor: "pointer", border: `1.5px solid ${active ? T.accent : T.rule}`, background: active ? T.accentSoft : "#fff", color: T.ink, lineHeight: 1.4 };
}
