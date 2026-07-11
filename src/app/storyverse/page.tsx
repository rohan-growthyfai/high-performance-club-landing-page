"use client";
import { useState } from "react";

/**
 * StoryVerse landing page — "One magical bedtime story every night. Your child
 * is the hero." Collects child name / gender / age + parent WhatsApp, starts a
 * 3-day free trial via /api/sv-signup, which pings the WhatsApp engine to send
 * tonight's first story.
 */

const THEMES = [
  { emoji: "🦁", title: "Courage", desc: "Being brave, finding their voice" },
  { emoji: "💛", title: "Kindness", desc: "Sharing, empathy, helping others" },
  { emoji: "🔭", title: "Curiosity", desc: "Asking why, loving to learn" },
  { emoji: "⚔️", title: "Little Warriors", desc: "Real heroes like young Shivaji" },
  { emoji: "🎨", title: "Imagination", desc: "Creativity, inventing, dreaming big" },
  { emoji: "🌙", title: "Calm & Gratitude", desc: "Thankfulness, peace, wonder" },
];

const STEPS = [
  { n: "1", emoji: "🌙", title: "Every night at bedtime", body: "You get a WhatsApp message with tonight's magical story — no searching, no apps to open." },
  { n: "2", emoji: "📖", title: "A personalized magazine", body: "A beautifully illustrated PDF where YOUR child is the hero, name woven right into the adventure." },
  { n: "3", emoji: "💬", title: "One bedtime question", body: "Each story ends with a question to ask your child — turning screen time into a warm ritual." },
];

export default function StoryVersePage() {
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("neutral");
  const [age, setAge] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [parentName, setParentName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!childName.trim() || whatsapp.replace(/\D/g, "").length < 10) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/sv-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          whatsapp,
          childName: childName.trim(),
          childGender: gender,
          childAge: age ? Number(age) : null,
        }),
      });
      if (res.ok) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="wrap">
      {/* HERO */}
      <section className="hero">
        <div className="brand">✦ STORYVERSE</div>
        <h1>
          One magical bedtime story<br />
          <em>every night.</em>
        </h1>
        <p className="tag">
          Your child becomes the <b>hero</b> of a brand-new illustrated story on WhatsApp — every single
          night. Secretly building <b>courage, kindness &amp; curiosity</b> while they wind down.
        </p>
        <div className="screen-note">
          📱 Kids will use the phone anyway. Make those minutes teach them something beautiful.
        </div>
        <a href="#start" className="cta-top">Start 3 nights free →</a>
        <div className="trust">₹99/month after · Cancel anytime · Made for ages 3–8</div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How the magic works</h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <div className="step-emoji">{s.emoji}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THEMES */}
      <section className="themes">
        <h2>A whole universe of learning 🌌</h2>
        <p className="sub">Every week has a theme — a gentle emotional arc your child grows through.</p>
        <div className="theme-grid">
          {THEMES.map((t) => (
            <div key={t.title} className="theme-card">
              <span className="t-emoji">{t.emoji}</span>
              <div>
                <div className="t-title">Week of {t.title}</div>
                <div className="t-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PARENTS LOVE IT */}
      <section className="why">
        <h2>Why parents love StoryVerse 💛</h2>
        <div className="why-grid">
          <div className="why-card"><b>🦸 Your child is the hero</b><span>Their name is woven into every story. Screenshot-worthy, every night.</span></div>
          <div className="why-card"><b>🏆 A growing collection</b><span>Each PDF builds their own personal story library they&apos;re proud of.</span></div>
          <div className="why-card"><b>🧠 Learning in disguise</b><span>Courage, empathy, curiosity &amp; real-hero values — never preachy.</span></div>
          <div className="why-card"><b>😴 A calmer bedtime</b><span>A warm ritual that replaces the tug-of-war over the phone.</span></div>
        </div>
      </section>

      {/* SIGNUP */}
      <section id="start" className="signup">
        {status === "done" ? (
          <div className="done">
            <div className="done-emoji">🌙✨</div>
            <h2>Tonight&apos;s first story is on its way!</h2>
            <p>
              Check <b>{childName || "your child"}&apos;s</b> first magical story on your WhatsApp in a moment.
              A new one arrives every night at bedtime. Sweet dreams! 💛
            </p>
          </div>
        ) : (
          <>
            <h2>Start 3 magical nights — free</h2>
            <p className="sub">Tell us about your little hero. First story arrives tonight on WhatsApp.</p>
            <form onSubmit={submit}>
              <label>Your child&apos;s name (the hero!)</label>
              <input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Aarav" required />

              <label>Your child is a…</label>
              <div className="gender-row">
                {[
                  { v: "boy", l: "👦 Boy" },
                  { v: "girl", l: "👧 Girl" },
                  { v: "neutral", l: "🌟 Prefer not to say" },
                ].map((g) => (
                  <button
                    type="button"
                    key={g.v}
                    className={`gender-btn ${gender === g.v ? "sel" : ""}`}
                    onClick={() => setGender(g.v)}
                  >
                    {g.l}
                  </button>
                ))}
              </div>

              <label>Child&apos;s age</label>
              <input type="number" min={2} max={12} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 5" />

              <label>Your name (parent)</label>
              <input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="e.g. Priya" />

              <label>Your WhatsApp number</label>
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="e.g. +91 98765 43210" required />

              {status === "error" && <div className="err">Please add your child&apos;s name and a valid WhatsApp number.</div>}

              <button type="submit" className="cta" disabled={status === "loading"}>
                {status === "loading" ? "Sending the magic… ✨" : "🌙 Send tonight's first story free"}
              </button>
              <div className="fineprint">3 nights free. Then ₹99/month. Cancel anytime by replying STOP.</div>
            </form>
          </>
        )}
      </section>

      <footer>✦ StoryVerse · One magical story every night · Made with 💛 for curious little minds</footer>

      <style jsx>{`
        .wrap { font-family: 'Quicksand', system-ui, sans-serif; color: #3a2f4a; background: #fff7ec; overflow-x: hidden; }
        section { max-width: 960px; margin: 0 auto; padding: 56px 22px; }
        h1 { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(34px, 7vw, 62px); line-height: 1.08; margin: 14px 0; }
        h1 em { font-style: normal; color: #e8a94b; }
        h2 { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(26px, 5vw, 40px); text-align: center; margin-bottom: 10px; }
        .hero { text-align: center; background:
          radial-gradient(900px 420px at 80% -10%, rgba(255,207,135,.6), transparent 60%),
          radial-gradient(700px 500px at -10% 110%, rgba(205,180,240,.5), transparent 60%),
          linear-gradient(160deg,#fff3e0,#f6e6ff); border-radius: 0 0 40px 40px; max-width: 100%; padding: 60px 22px 70px; }
        .brand { font-family: 'Baloo 2'; font-weight: 800; letter-spacing: .12em; color: #7c6b93; }
        .tag { max-width: 620px; margin: 0 auto; font-size: clamp(16px, 2.4vw, 20px); line-height: 1.6; color: #5c5068; }
        .tag b { color: #3a2f4a; }
        .screen-note { margin: 24px auto 0; max-width: 560px; background: #fff; border: 2px solid #ffcf87; border-radius: 16px; padding: 14px 18px; font-weight: 600; color: #7a5a1e; }
        .cta-top { display: inline-block; margin-top: 28px; background: linear-gradient(135deg,#7fd1c4,#5cb8ab); color: #fff; font-family: 'Baloo 2'; font-weight: 800; font-size: 20px; padding: 16px 34px; border-radius: 999px; text-decoration: none; box-shadow: 0 12px 30px rgba(92,184,171,.4); }
        .trust { margin-top: 14px; font-size: 14px; color: #8a7d97; font-weight: 600; }
        .how h2 { margin-bottom: 30px; }
        .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
        .step { background: #fff; border-radius: 22px; padding: 28px 24px; box-shadow: 0 10px 26px rgba(58,47,74,.08); text-align: center; }
        .step-emoji { font-size: 40px; }
        .step-title { font-family: 'Baloo 2'; font-weight: 800; font-size: 20px; margin: 10px 0 8px; }
        .step-body { color: #6b5f78; line-height: 1.6; font-size: 15.5px; }
        .themes .sub, .signup .sub { text-align: center; color: #6b5f78; margin-bottom: 26px; }
        .theme-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
        .theme-card { display: flex; gap: 14px; align-items: center; background: #fff; border-radius: 18px; padding: 18px 20px; box-shadow: 0 8px 20px rgba(58,47,74,.07); }
        .t-emoji { font-size: 34px; }
        .t-title { font-family: 'Baloo 2'; font-weight: 800; font-size: 18px; }
        .t-desc { color: #6b5f78; font-size: 14.5px; }
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 24px; }
        .why-card { background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 8px 20px rgba(58,47,74,.07); }
        .why-card b { font-family: 'Baloo 2'; font-size: 19px; display: block; margin-bottom: 8px; }
        .why-card span { color: #6b5f78; line-height: 1.6; }
        .signup { background: linear-gradient(160deg,#f7ecff,#fff3e0); border-radius: 34px; max-width: 620px; margin: 30px auto; box-shadow: 0 20px 50px rgba(58,47,74,.12); }
        form { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
        label { font-weight: 700; margin-top: 14px; font-size: 15px; }
        input { padding: 14px 16px; border-radius: 14px; border: 2px solid #e7dcf2; font-size: 16px; font-family: inherit; background: #fff; }
        input:focus { outline: none; border-color: #7fd1c4; }
        .gender-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .gender-btn { flex: 1; min-width: 100px; padding: 12px; border-radius: 14px; border: 2px solid #e7dcf2; background: #fff; font-family: inherit; font-weight: 600; cursor: pointer; font-size: 15px; }
        .gender-btn.sel { border-color: #7fd1c4; background: #eafaf7; color: #2f8a7d; }
        .cta { margin-top: 22px; background: linear-gradient(135deg,#e8a94b,#f4b860); color: #fff; font-family: 'Baloo 2'; font-weight: 800; font-size: 19px; padding: 17px; border: none; border-radius: 999px; cursor: pointer; box-shadow: 0 12px 30px rgba(232,169,75,.4); }
        .cta:disabled { opacity: .7; }
        .fineprint { text-align: center; font-size: 13px; color: #8a7d97; margin-top: 12px; }
        .err { color: #d9534f; font-size: 14px; margin-top: 10px; font-weight: 600; }
        .done { text-align: center; }
        .done-emoji { font-size: 56px; }
        .done p { color: #6b5f78; line-height: 1.7; max-width: 460px; margin: 12px auto 0; }
        footer { text-align: center; padding: 34px 20px 50px; color: #8a7d97; font-weight: 600; font-size: 14px; }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </main>
  );
}
