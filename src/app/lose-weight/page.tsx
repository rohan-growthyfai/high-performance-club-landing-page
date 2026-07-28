"use client";
import { useEffect, useState } from "react";

const PAYMENT_LINK = "https://rzp.io/rzp/2fsOU9dz";

const TRACKS = [
  {
    month: 1,
    icon: "🥗",
    title: "Eating Habits",
    subtitle: "Transform HOW and WHEN you eat — without a diet",
    color: "#1ea84f",
    colorLight: "rgba(30,168,79,0.08)",
    colorBorder: "rgba(30,168,79,0.2)",
    days: "Days 1–30",
    habits: [
      "Drink 500ml water before checking your phone",
      "Eat protein before touching rice or roti",
      "One screen-free meal per day",
      "Pre-meal water 15 min before lunch",
      "Replace 3 PM chai with green tea",
      "Kitchen curfew 90 min before sleep",
    ],
    outcome: "Better blood sugar, fewer cravings, automatic portion control",
  },
  {
    month: 2,
    icon: "🏃",
    title: "Movement & Activity",
    subtitle: "Add real calorie burn — without a gym membership",
    color: "#f97316",
    colorLight: "rgba(249,115,22,0.08)",
    colorBorder: "rgba(249,115,22,0.2)",
    days: "Days 31–60",
    habits: [
      "Stand up for 60 seconds every hour",
      "Take the stairs for one floor daily",
      "2-minute walk after every meal",
      "Walk during every phone call",
      "10 desk squats before each meeting",
      "Park one lane farther every time",
    ],
    outcome: "300–500 extra calories burned daily through NEAT — no gym needed",
  },
  {
    month: 3,
    icon: "🌙",
    title: "Sleep & Recovery",
    subtitle: "Fix your sleep, fix your hunger hormones",
    color: "#6366f1",
    colorLight: "rgba(99,102,241,0.08)",
    colorBorder: "rgba(99,102,241,0.2)",
    days: "Days 61–90",
    habits: [
      "Screens off 30 minutes before sleep",
      "Consistent sleep and wake time daily",
      "5-minute pre-sleep breathing ritual",
      "Morning sunlight within 10 min of waking",
      "Coffee only after 9:30 AM",
      "Cold water face wash on waking",
    ],
    outcome: "Lower cortisol, balanced hunger hormones, faster fat burn overnight",
  },
];

const SAMPLE_HABITS = [
  {
    area: "🥗 Healthy Eating",
    color: "#1ea84f",
    colorLight: "rgba(30,168,79,0.08)",
    colorBorder: "rgba(30,168,79,0.25)",
    emoji: "🍽️",
    habits: [
      {
        day: "Day 1",
        title: "The 500ml Morning Reset",
        desc: "Keep a 500ml bottle on your bedside. Before you check your phone — drink it. Takes 90 seconds.",
        why: "Dehydration causes false hunger. 500ml before your phone gives 45 min of real appetite clarity.",
        image: "🚰",
      },
      {
        day: "Day 5",
        title: "Protein-First Plate Rule",
        desc: "Eat your protein — dal, paneer, chicken, curd — before touching rice or roti. Every meal.",
        why: "Reduces post-meal glucose spikes by 29% and insulin spikes by 37%. Same meal, better outcome.",
        image: "🥚",
      },
      {
        day: "Day 12",
        title: "Kitchen Curfew",
        desc: "Stop eating 90 minutes before sleep. Brush your teeth as the signal. Non-negotiable.",
        why: "Late eating elevates cortisol and insulin during sleep — both actively block fat burning overnight.",
        image: "🌙",
      },
    ],
  },
  {
    area: "🏃 Movement",
    color: "#f97316",
    colorLight: "rgba(249,115,22,0.08)",
    colorBorder: "rgba(249,115,22,0.25)",
    emoji: "⚡",
    habits: [
      {
        day: "Day 31",
        title: "The Hourly 60-Second Stand",
        desc: "Set an alarm every 60 minutes. When it fires — stand, walk to the window, come back. Done.",
        why: "Sitting 60+ min drops fat-burning enzyme LPL by 90%. Standing briefly reactivates it all day.",
        image: "🪑",
      },
      {
        day: "Day 35",
        title: "2-Minute Post-Meal Walk",
        desc: "The moment you finish eating — stand up and walk slowly for 2 minutes. Anywhere.",
        why: "Activates GLUT4 in muscles, reducing blood glucose spikes by up to 30% with zero insulin needed.",
        image: "🚶",
      },
      {
        day: "Day 42",
        title: "Walking Phone Calls",
        desc: "Any call over 3 minutes — take it standing or walking. Put a sticky note on your monitor.",
        why: "Adds 500–1500 steps daily to NEAT without any 'workout' — burns an extra 50–100 kcal/day passively.",
        image: "📱",
      },
    ],
  },
  {
    area: "🌙 Sleep",
    color: "#6366f1",
    colorLight: "rgba(99,102,241,0.08)",
    colorBorder: "rgba(99,102,241,0.25)",
    emoji: "😴",
    habits: [
      {
        day: "Day 61",
        title: "The Screen-Off Ritual",
        desc: "Set a phone reminder 30 minutes before your target sleep time. When it fires — screens off.",
        why: "Blue light suppresses melatonin. Poor sleep raises ghrelin by 24%, adding 300+ extra calories next day.",
        image: "📵",
      },
      {
        day: "Day 65",
        title: "Morning Light Anchor",
        desc: "Within 10 minutes of waking — step outside or stand by a window for 2 minutes of natural light.",
        why: "Sets your circadian clock, peaks cortisol at the right time, and improves melatonin production that night.",
        image: "☀️",
      },
      {
        day: "Day 70",
        title: "Coffee After 9:30 AM",
        desc: "Hold your first coffee until 90 minutes after waking. Water or chai first, coffee second.",
        why: "Cortisol is naturally highest in the first 90 min after waking — caffeine on top spikes anxiety and crashes energy.",
        image: "☕",
      },
    ],
  },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Marketing Manager, Pune", avatar: "PS", result: "−4 kg in 6 weeks", text: "I've tried keto, gym memberships, dieticians. Nothing stuck. These 5-minute habits were the first thing I actually did consistently. Lost 4 kg in 6 weeks." },
  { name: "Rahul M.", role: "Software Engineer, Bangalore", avatar: "RM", result: "No more midnight cravings", text: "I work 10-hour days. Zero time for fitness. But 5 minutes? I could do that. By Week 3 my energy was noticeably higher and I stopped craving junk at midnight." },
  { name: "Deepika K.", role: "CA, Mumbai", avatar: "DK", result: "Consistent even while travelling", text: "Travelling 3 weeks a month for work. This guide is the only fitness thing that actually travels with me. No excuses possible when the habit takes 5 minutes." },
  { name: "Arjun T.", role: "Startup Founder, Delhi", avatar: "AT", result: "−6 kg in 8 weeks", text: "Bought this on a whim for ₹199. Best ₹199 I've spent this year. The science explanations helped me understand WHY I was gaining weight. Game changer." },
  { name: "Meera R.", role: "Product Manager, Hyderabad", avatar: "MR", result: "−3 kg, better sleep", text: "Month 3 (the sleep habits) was the real surprise. I didn't expect sleep changes to affect my weight but I dropped 3 more kg in Month 3 without changing anything else." },
  { name: "Karan V.", role: "Sales Director, Chennai", avatar: "KV", result: "Lost 8 kg in 3 months", text: "The structure is what made it click. One area per month, one habit per day — I always knew what I was doing. Finished all 90 days and lost 8 kg. Still going." },
];

const FAQS = [
  { q: "Why 90 days? Why not 30?", a: "Because lasting weight loss requires changing 3 separate systems: what you eat, how much you move, and how well you sleep. Trying to fix all 3 at once is overwhelming and leads to failure. We give each area a full dedicated month — so you build one system completely before adding the next. By Day 90, all 3 systems are running simultaneously, and the results compound." },
  { q: "I'm extremely busy. Will I really have time for this?", a: "Every habit in this guide takes under 5 minutes — many take 2 minutes. We've specifically designed these for people with back-to-back meetings, late nights, and no time for a gym. If you can find 5 minutes, you can do this." },
  { q: "I've tried many diets and failed. How is this different?", a: "This is not a diet. There's no food restriction, no calorie counting, no meal plan. These are tiny behavioural shifts that change how your body processes food and burns fat — without asking you to overhaul your life. The structure (3 areas × 30 habits) means you know exactly what you're working on each day, and why." },
  { q: "What format is the ebook? How do I access it?", a: "After payment, you'll be taken to a download page immediately where you can download the PDF. You'll also receive a confirmation email with the download link so you can access it anytime." },
  { q: "Will this work if I eat out a lot or travel for work?", a: "Yes — this guide was built specifically for people who eat out, travel, and can't control their food environment. The habits work in any setting: hotel rooms, airport lounges, client dinners." },
  { q: "Is there a refund policy?", a: "Yes. If you go through the first 7 days of habits and feel this isn't for you, email us at admin@growthyfai.com for a full refund. No questions asked." },
];

function CheckIcon({ green }: { green?: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
      background: green ? "rgba(30,168,79,0.12)" : "rgba(239,68,68,0.1)",
      color: green ? "#1ea84f" : "#dc2626", fontSize: 11, fontWeight: 900,
    }}>
      {green ? "✓" : "✗"}
    </span>
  );
}

export default function LoseWeightPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setToastVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const trackAndPay = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", { value: 199, currency: "INR", content_name: "Slim & Strong Ebook" });
    }
    window.open(PAYMENT_LINK, "_blank");
  };

  return (
    <>
      <style>{`
        :root {
          --lw-bg: #faf8f3; --lw-card: #fff; --lw-ink: #18181b; --lw-muted: #4a4a52;
          --lw-subtle: #71717a; --lw-border: #e2dfd6; --lw-green: #1ea84f;
          --lw-orange: #f97316; --lw-indigo: #6366f1; --lw-navy: #0f1923; --lw-gold: #e8a020;
        }
        .lw-sec { padding: clamp(3rem,8vw,5rem) clamp(1rem,5vw,2rem); }
        .lw-wrap { max-width: 1100px; margin: 0 auto; }
        .lw-wrap-sm { max-width: 720px; margin: 0 auto; }
        .lw-h1 { font-size: clamp(2rem,5.5vw,3.4rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; }
        .lw-h2 { font-size: clamp(1.6rem,3.8vw,2.5rem); font-weight: 800; line-height: 1.2; letter-spacing: -0.025em; }
        .lw-h3 { font-size: clamp(1rem,2.2vw,1.3rem); font-weight: 700; line-height: 1.3; }
        .lw-body { font-size: clamp(0.9375rem,1.7vw,1rem); line-height: 1.78; color: var(--lw-muted); }
        .lw-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; }
        .lw-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; background: var(--lw-green); color: #fff; font-size: clamp(1rem,2vw,1.125rem); font-weight: 800; padding: 1rem 2.5rem; border-radius: 9999px; border: none; cursor: pointer; box-shadow: 0 4px 24px rgba(30,168,79,0.35); transition: transform 0.15s, box-shadow 0.15s, background 0.15s; text-decoration: none; line-height: 1.3; }
        .lw-btn:hover { background: #25d366; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(30,168,79,0.45); }
        .lw-btn-lg { padding: 1.25rem 3rem; font-size: clamp(1.05rem,2.2vw,1.25rem); }
        .lw-card { background: var(--lw-card); border: 1px solid var(--lw-border); border-radius: 16px; padding: 1.5rem; transition: box-shadow 0.2s, transform 0.2s; }
        .lw-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .lw-price-box { background: linear-gradient(135deg, #0f1923 0%, #1a2e1f 100%); border-radius: 24px; padding: clamp(2rem,5vw,3.5rem); color: #fff; text-align: center; box-shadow: 0 24px 80px rgba(15,25,35,0.3); }
        .lw-faq-item { border-bottom: 1px solid var(--lw-border); }
        .lw-faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 1.25rem 0; font-size: 1rem; font-weight: 700; color: var(--lw-ink); display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .lw-faq-a { padding-bottom: 1.25rem; color: var(--lw-muted); line-height: 1.75; font-size: 0.9375rem; }
        .lw-sticky { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; background: var(--lw-navy); padding: 0.875rem 1rem; display: flex; align-items: center; justify-content: flex-end; gap: 1rem; box-shadow: 0 -4px 24px rgba(0,0,0,0.2); transition: transform 0.3s ease; }
        .lw-value-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .lw-check { color: var(--lw-green); font-size: 1rem; margin-top: 0.1rem; flex-shrink: 0; }
        .lw-avatar { width: 44px; height: 44px; border-radius: 9999px; background: linear-gradient(135deg, var(--lw-green), var(--lw-navy)); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 0.875rem; flex-shrink: 0; }
        .lw-star { color: #f59e0b; }
        .lw-track-tab { padding: 0.625rem 1.25rem; border-radius: 9999px; font-weight: 700; font-size: 0.875rem; border: 2px solid transparent; cursor: pointer; transition: all 0.2s; background: none; }
        .lw-snapshot-card { background: var(--lw-card); border-radius: 16px; border: 1px solid var(--lw-border); overflow: hidden; }
        .lw-snapshot-header { padding: 1rem 1.25rem; display: flex; align-items: flex-start; gap: 0.875rem; }
        .lw-snapshot-body { padding: 0 1.25rem 1.25rem; }
        .lw-why-box { background: #f9f9f6; border-radius: 10px; padding: 0.875rem 1rem; border-left: 3px solid; font-size: 0.85rem; color: var(--lw-muted); line-height: 1.7; margin-top: 0.75rem; }
        .hero-bg { background: var(--lw-navy); position: relative; overflow: hidden; }
        .hero-bg::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(30,168,79,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 80%, rgba(232,160,32,0.07) 0%, transparent 60%); pointer-events: none; }
        .book-mockup-img { position: relative; display: inline-block; filter: drop-shadow(0 32px 64px rgba(0,0,0,0.6)) drop-shadow(0 8px 24px rgba(0,0,0,0.4)); transition: transform 0.3s ease, filter 0.3s ease; }
        .book-mockup-img:hover { transform: translateY(-6px) scale(1.02); filter: drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 12px 32px rgba(0,0,0,0.5)); }
        .book-mockup-img img { display: block; max-width: 100%; }
        .track-pill { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.875rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.5rem; }
        .why-diff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 1.25rem; }
        .why-diff-card { background: var(--lw-card); border: 1px solid var(--lw-border); border-radius: 16px; overflow: hidden; }
        .why-diff-card-body { padding: 1.5rem; }
        .science-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 1.5rem; }
        .science-card { background: #fff; border: 1px solid var(--lw-border); border-radius: 16px; padding: 2rem; }
        .shift-split { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 640px) { .shift-split { grid-template-columns: 1fr; } .shift-arrow { display: none !important; } }
        .struct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        @media (max-width: 640px) { .struct-row { grid-template-columns: 1fr; } }
        .yt-chaos { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 1.5rem; }
        .ss-structured { background: linear-gradient(135deg, #0f2318 0%, #1a3a24 100%); border-radius: 16px; padding: 1.5rem; }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        .habit-col-card { background: #fff; border-radius: 12px; border: 1px solid var(--lw-border); padding: 1rem; margin-bottom: 0.75rem; }
        .habit-emoji-badge { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-bg lw-sec" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="lw-wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(2rem,6vw,5rem)", flexWrap: "wrap" }}>
            {/* Copy */}
            <div style={{ flex: "1 1 360px" }}>
              <div className="lw-label" style={{ color: "#e8a020", marginBottom: "1rem" }}>✦ 90-Day Structured System · For Busy Working Professionals</div>
              <h1 className="lw-h1" style={{ color: "#fff", marginBottom: "1.25rem" }}>
                Get Fit in{" "}
                <span style={{ color: "#25d366" }}>90 Days</span>
                <br />with Tiny{" "}
                <em style={{ fontFamily: "var(--font-serif-accent)", color: "#e8a020", fontStyle: "italic" }}>5-Minute</em>{" "}
                Habits
              </h1>
              <p className="lw-body" style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem,2vw,1.1rem)", marginBottom: "1.5rem", maxWidth: 500 }}>
                Get 90 research-backed tiny habits across 3 areas of your life — Healthy Eating, Movement, &amp; Sleep. Each under 5 minutes. Built for desk jobs, late nights, and zero free time.
              </p>

              {/* 3 area pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {[
                  { icon: "🥗", label: "Month 1: Eating", color: "#1ea84f" },
                  { icon: "🏃", label: "Month 2: Movement", color: "#f97316" },
                  { icon: "🌙", label: "Month 3: Sleep", color: "#6366f1" },
                ].map(({ icon, label, color }) => (
                  <span key={label} style={{ background: `${color}20`, border: `1px solid ${color}40`, color, fontSize: "0.8rem", fontWeight: 700, padding: "0.35rem 0.875rem", borderRadius: "9999px" }}>
                    {icon} {label}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <button className="lw-btn lw-btn-lg" onClick={trackAndPay}>Get the Ebook — ₹199 →</button>
                <div>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>₹999</span>{" "}
                    <span style={{ color: "#25d366" }}>₹199</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>One-time · Instant download</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.775rem" }}>🔒 Secure Razorpay · 7-day money-back guarantee</p>

              <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
                {[["90", "daily habits"], ["3", "areas of life"], ["5 min", "per habit"], ["₹199", "one-time"]].map(([n, l]) => (
                  <div key={l}><div style={{ color: "#fff", fontWeight: 900, fontSize: "1.25rem" }}>{n}</div><div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>{l}</div></div>
                ))}
              </div>
            </div>

            {/* Book cover image — bg_removed_fit.png has transparent bg, blends into dark hero */}
            <div style={{ flex: "0 1 320px", margin: "0 auto", display: "flex", justifyContent: "center" }}>
              <div className="book-mockup-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slim-strong-cover.png"
                  alt="Slim & Strong — 90-Day Habit System ebook cover"
                  width={320}
                  height={460}
                  style={{ width: "clamp(240px,30vw,320px)", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="lw-sec" style={{ background: "#fff" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Sound familiar?</div>
            <h2 className="lw-h2">This is why busy professionals struggle to lose weight</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1rem" }}>
            {[
              { icon: "😮‍💨", text: "You order food at 11 PM because dinner got cancelled for a client call — again." },
              { icon: "💳", text: "You've paid for gym memberships this year. You went twice, total." },
              { icon: "🍱", text: "You eat lunch at your desk while on a Zoom, barely tasting anything." },
              { icon: "🛏", text: "You sleep at 1 AM, wake at 7, skip breakfast, and wonder why you're exhausted." },
              { icon: "✈️", text: "You travel constantly. Hotel food, airport junk, zero routine." },
              { icon: "😞", text: "You've tried keto, IF, calorie counting. Nothing stuck past Week 2." },
            ].map(({ icon, text }) => (
              <div key={text} className="lw-card" style={{ display: "flex", gap: "1rem" }}>
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{icon}</span>
                <p style={{ color: "var(--lw-muted)", fontSize: "0.9375rem", lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p className="lw-h3">The problem isn&apos;t your willpower.<br /><span style={{ color: "var(--lw-green)" }}>It&apos;s the system you&apos;ve been given which is built for people with free time.</span></p>
          </div>
        </div>
      </section>

      {/* ── WHERE YOU ARE NOW → WHERE YOU'LL BE IN 90 DAYS ── */}
      <section className="lw-sec" style={{ background: "var(--lw-bg)" }}>
        <div className="lw-wrap-sm">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>The Shift</div>
            <h2 className="lw-h2">Where you are now <span style={{ color: "#25d366" }}>→</span> where you&apos;ll be in 90 days</h2>
            <p className="lw-body" style={{ marginTop: "0.75rem" }}>Same busy schedule. But a completely different version of yourself.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--lw-border)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 12px 40px -14px rgba(0,0,0,0.12)" }}>
            {/* Transformation visual */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/slim-strong-shift.png" alt="Before and after 90-day Slim & Strong transformation" style={{ display: "block", width: "100%", height: "auto" }} loading="lazy" />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "0.75rem 1rem", borderTop: "1px solid var(--lw-border)", background: "#fafaf9" }}>
              {[["🥗","Eating"], ["🏃","Movement"], ["🌙","Sleep"]].map(([icon, label]) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: 13, fontWeight: 700, color: "#3f3f46" }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>{label}
                </span>
              ))}
            </div>
            <div className="shift-split" style={{ position: "relative", borderTop: "1px solid var(--lw-border)" }}>
              {/* Arrow */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 48, height: 48, borderRadius: "50%",
                background: "#1ea84f",
                boxShadow: "0 6px 20px rgba(30,168,79,0.45), 0 0 0 5px #fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10, fontSize: "1.1rem", fontWeight: 900, color: "#fff",
              }} aria-hidden="true">→</div>

              {/* Day 0 — Today */}
              <div style={{ padding: "2rem", background: "#fafafa", borderRight: "1px solid var(--lw-border)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", padding: "0.25rem 0.875rem", borderRadius: "9999px", background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1.25rem" }}>Day 0 — Today</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    "No idea where to even start with fitness",
                    "Too many things to fix, too little time",
                    "Good intentions that die by Wednesday",
                    "Gym membership collecting dust",
                    "Eating whatever, whenever, out of habit",
                    "Poor sleep but can't seem to fix it",
                    "\"I'll start properly next month\"",
                  ].map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                      <CheckIcon />
                      <span style={{ fontSize: "0.875rem", color: "#52525b", lineHeight: 1.6 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After 90 Days */}
              <div style={{ padding: "2rem", background: "#f0fdf4", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-2rem", right: "-2rem", width: "8rem", height: "8rem", borderRadius: "50%", background: "rgba(30,168,79,0.07)" }} aria-hidden="true" />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", padding: "0.25rem 0.875rem", borderRadius: "9999px", background: "rgba(30,168,79,0.12)", color: "#166534", border: "1px solid rgba(30,168,79,0.3)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1.25rem" }}>After 90 Days</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {[
                      "A clear plan — one habit, one area, every day",
                      "Under 5 minutes a day — nothing more required",
                      "30 eating habits running automatically",
                      "Moving more without ever going to the gym",
                      "Better sleep fixing your hunger hormones",
                      "Lower weight, more energy, better focus",
                      "\"I've been consistent for 90 straight days\"",
                    ].map((a, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                        <CheckIcon green />
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="lw-btn" onClick={trackAndPay}>I Want This Version of Myself — ₹199 →</button>
          </div>
        </div>
      </section>

      {/* ── WHY THIS IS DIFFERENT ── */}
      <section className="lw-sec" style={{ background: "#fff" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Why Slim & Strong Works</div>
            <h2 className="lw-h2">This is different from every guide<br />you&apos;ve read on the internet</h2>
          </div>
          <div className="why-diff-grid">
            {[
              {
                imgSrc: "/why-diff/img1.png",
                imgAlt: "One area each month structured plan illustration",
                title: "One area at a time. Full focus.",
                body: "Most guides throw everything at you at once — change your diet, join a gym, fix your sleep, reduce stress — all in Week 1. This guide gives each area a full dedicated month. You master one system before adding the next.",
                color: "#1ea84f",
              },
              {
                imgSrc: "/why-diff/img2.png",
                imgAlt: "5 minute timer with tiny habits illustration",
                title: "Under 5 minutes. Not '20 minutes ideally'.",
                body: "Every habit in this guide genuinely takes under 5 minutes. Not '5 minutes if everything goes perfectly.' We stress-tested each habit against the reality of back-to-back meetings, travel days, and late-night work.",
                color: "#f97316",
              },
              {
                imgSrc: "/why-diff/img3.png",
                imgAlt: "Science research backed habits illustration",
                title: "The science is real and explained.",
                body: "This isn't 'drink lemon water in the morning.' Every habit comes with the actual biological mechanism behind why it works — in plain language. You understand what you're doing and why, so you stick with it.",
                color: "#6366f1",
              },
              {
                imgSrc: "/why-diff/img4.png",
                imgAlt: "Office and travel friendly habits illustration",
                title: "100% office and travel friendly.",
                body: "No equipment. No gym. No special food. Every habit was designed to work at a desk, in a hotel room, or at a client dinner. The guide assumes you have no control over your environment half the time.",
                color: "#e8a020",
              },
            ].map(({ imgSrc, imgAlt, title, body, color }) => (
              <div key={title} className="why-diff-card">
                {/* AI-generated image header */}
                <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f5f5f0" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={imgAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div className="why-diff-card-body">
                  <div className="lw-h3" style={{ marginBottom: "0.625rem", color: "var(--lw-ink)" }}>{title}</div>
                  <p className="lw-body" style={{ margin: 0 }}>{body}</p>
                  <div style={{ marginTop: "1rem", height: "3px", background: color, borderRadius: "2px", width: "40px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 AREAS ── */}
      <section className="lw-sec" style={{ background: "var(--lw-bg)" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="lw-h2">Focus On Just One Area Each Month</h2>
            <p className="lw-body" style={{ marginTop: "0.75rem", maxWidth: 560, margin: "0.75rem auto 0" }}>
              Weight loss requires fixing eating, movement, AND sleep. Most people try to fix all 3 at once and fail. We fix them one by one — a full month each.
            </p>
          </div>

          {/* Area tabs */}
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
            {TRACKS.map((t, i) => (
              <button key={i} className="lw-track-tab" onClick={() => setActiveTrack(i)}
                style={{ background: activeTrack === i ? t.color : "transparent", color: activeTrack === i ? "#fff" : t.color, borderColor: t.color }}>
                {t.icon} {t.title}
              </button>
            ))}
          </div>

          {/* Active area detail */}
          {TRACKS.map((t, i) => i === activeTrack && (
            <div key={i} style={{ background: t.colorLight, border: `1px solid ${t.colorBorder}`, borderRadius: "20px", padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "2.5rem" }}>{t.icon}</span>
                <div>
                  <div className="lw-label" style={{ color: t.color, marginBottom: "0.25rem" }}>{t.days}</div>
                  <div className="lw-h3" style={{ color: "var(--lw-ink)" }}>Month {t.month}: {t.title}</div>
                  <div style={{ color: "var(--lw-muted)", fontSize: "0.875rem" }}>{t.subtitle}</div>
                </div>
              </div>
              <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {t.habits.map((h, hi) => (
                  <div key={hi} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ color: t.color, fontWeight: 700, fontSize: "0.75rem", minWidth: 28 }}>D{(t.month - 1) * 30 + hi + 1}</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--lw-muted)" }}>{h}</span>
                  </div>
                ))}
                <div style={{ color: "var(--lw-subtle)", fontSize: "0.8rem", fontStyle: "italic", marginTop: "0.25rem" }}>+ 24 more habits inside the ebook...</div>
              </div>
              <div style={{ background: t.color, color: "#fff", borderRadius: "10px", padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 700 }}>
                Month {t.month} Result: {t.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SAMPLE HABITS — 3 vertical columns ── */}
      <section className="lw-sec" style={{ background: "#fff" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Sample Habits From Inside</div>
            <h2 className="lw-h2">See How Your Habit Will Look Like</h2>
            <p className="lw-body" style={{ marginTop: "0.75rem", maxWidth: 560, margin: "0.75rem auto 0" }}>
              Every habit comes with what to do, the science behind why it works, and the best moment to use it in your day.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1.5rem" }}>
            {SAMPLE_HABITS.map((area) => (
              <div key={area.area} style={{ border: `1.5px solid ${area.colorBorder}`, borderRadius: "18px", overflow: "hidden", background: "#fafaf9" }}>
                {/* Column header */}
                <div style={{ background: area.color, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>{area.emoji}</span>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>{area.area}</span>
                </div>

                {/* Habits */}
                <div style={{ padding: "1rem" }}>
                  {area.habits.map((h, hi) => (
                    <div key={hi} className="habit-col-card">
                      {/* Day badge + emoji */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
                        <div className="habit-emoji-badge" style={{ background: area.colorLight }}>
                          <span style={{ fontSize: "1.4rem" }}>{h.image}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: area.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{h.day}</div>
                          <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--lw-ink)", lineHeight: 1.3 }}>{h.title}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8125rem", color: "var(--lw-muted)", lineHeight: 1.65, margin: "0 0 0.5rem" }}>{h.desc}</p>
                      <div style={{ background: area.colorLight, borderLeft: `3px solid ${area.color}`, borderRadius: "0 6px 6px 0", padding: "0.5rem 0.625rem", fontSize: "0.75rem", color: "var(--lw-muted)", lineHeight: 1.6 }}>
                        <span style={{ fontWeight: 700, color: area.color, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Why it works: </span>
                        {h.why}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button className="lw-btn" onClick={trackAndPay}>Get All 90 Habits — ₹199 →</button>
          </div>
        </div>
      </section>

      {/* ── SCIENCE SECTION ── */}
      <section className="lw-sec" style={{ background: "var(--lw-bg)" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Research-Backed. No Guesswork.</div>
            <h2 className="lw-h2">Every habit is proven to work</h2>
            <p className="lw-body" style={{ marginTop: "0.75rem", maxWidth: 560, margin: "0.75rem auto 0" }}>
              None of these are opinions or wellness trends. Each habit comes from peer-reviewed research — so you can trust what you&apos;re doing, and know it will work.
            </p>
          </div>

          <div className="science-grid">
            {[
              {
                logo: "📖",
                name: "BJ Fogg, PhD — Stanford",
                title: "Tiny Habits: The Small Changes That Change Everything",
                quote: "The most effective behaviour change happens through small, specific actions anchored to existing routines — not through motivation or willpower.",
                color: "#1ea84f",
                tag: "Behaviour Science",
              },
              {
                logo: "🏛️",
                name: "Harvard Medical School",
                title: "Journal of Clinical Endocrinology",
                quote: "Short bouts of movement after meals significantly improve insulin sensitivity and reduce post-meal glucose levels — effects comparable to longer exercise sessions.",
                color: "#6366f1",
                tag: "Metabolic Research",
              },
              {
                logo: "🧬",
                name: "University of Chicago Sleep Lab",
                title: "Annals of Internal Medicine",
                quote: "Sleep-deprived subjects lost 55% less fat and 60% more muscle than well-rested subjects on the same calorie-restricted diet — sleep is non-negotiable for fat loss.",
                color: "#f97316",
                tag: "Sleep & Weight Research",
              },
            ].map(({ logo, name, title, quote, color, tag }) => (
              <div key={name} className="science-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "10px", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{logo}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--lw-ink)" }}>{name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--lw-subtle)", fontStyle: "italic", lineHeight: 1.4 }}>{title}</div>
                  </div>
                </div>
                <blockquote style={{ margin: 0, borderLeft: `3px solid ${color}`, paddingLeft: "0.875rem", color: "var(--lw-muted)", fontSize: "0.875rem", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{quote}&rdquo;</blockquote>
                <div style={{ marginTop: "0.875rem", display: "inline-flex", alignItems: "center", padding: "0.25rem 0.625rem", borderRadius: "6px", background: `${color}12`, color, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{tag}</div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", color: "var(--lw-subtle)", fontSize: "0.825rem", marginTop: "1.5rem" }}>
            All 90 habits draw from established peer-reviewed research. Sources cited inside the ebook.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lw-sec" style={{ background: "#fff" }}>
        <div className="lw-wrap-sm">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Simple by Design</div>
            <h2 className="lw-h2">How the 90-Day System Works</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {[
              { step: "01", color: "#1ea84f", title: "Month 1 — Fix Your Eating", desc: "30 habits focused entirely on HOW and WHEN you eat. No diet plan. No food restrictions. Just tiny shifts in food order, timing, and mindfulness that change your metabolism from the inside." },
              { step: "02", color: "#f97316", title: "Month 2 — Add Movement", desc: "With your eating habits now running on autopilot, you add 30 movement habits. Still no gym required. NEAT-based habits that burn 300–500 extra calories daily through stair sprints, desk squats, walking calls, and post-meal walks." },
              { step: "03", color: "#6366f1", title: "Month 3 — Optimise Sleep", desc: "Now you add 30 sleep habits. Better sleep lowers cortisol, balances hunger hormones, and unlocks overnight fat burning. This is when the compound results from all 3 areas hit simultaneously." },
              { step: "04", color: "#e8a020", title: "Day 90 — Your Personal System", desc: "By Day 90 you have 90 habits to choose from. The last habit in the guide asks you to write down the 5–7 that worked best. That's your permanent system — no app, no subscription, no renewal." },
            ].map(({ step, color, title, desc }) => (
              <div key={step} style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color, minWidth: "3rem", lineHeight: 1, flexShrink: 0 }}>{step}</div>
                <div>
                  <div className="lw-h3" style={{ marginBottom: "0.4rem", color: "var(--lw-ink)" }}>{title}</div>
                  <p className="lw-body" style={{ margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRUCTURED GUIDANCE ── */}
      <section className="lw-sec" style={{ background: "var(--lw-navy)" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "#e8a020", marginBottom: "0.75rem" }}>Not Random Advice</div>
            <h2 className="lw-h2" style={{ color: "#fff" }}>YouTube gives you 47 conflicting videos.<br /><span style={{ color: "#25d366" }}>This gives you one clear plan.</span></h2>
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "0.875rem", maxWidth: 560, margin: "0.875rem auto 0", lineHeight: 1.75, fontSize: "clamp(0.9375rem,1.7vw,1rem)" }}>
              The internet has infinite fitness content. What it doesn&apos;t have is a structured system that tells you exactly what to do today, tomorrow, and on Day 90 — built for someone with a 10-hour workday.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: 900, margin: "0 auto" }}>
            {/* Left — Chaos */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ fontSize: "1.1rem" }}>😵</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>YouTube / Instagram / Reels</span>
              </div>
              <div style={{ padding: "1.5rem" }}>
                {[
                  "\"Drink warm lemon water every morning\"",
                  "\"Actually, lemon water is a myth\" 🤦",
                  "\"You MUST do intermittent fasting\"",
                  "\"IF is bad for women\" (next video)",
                  "\"Hit the gym 5 days a week\"",
                  "\"Walk 10,000 steps, gym isn't needed\"",
                  "\"Sleep 8 hours no matter what\"",
                  "Next influencer disagrees completely",
                  "You open 12 tabs, confused, do nothing",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.15rem", flexShrink: 0 }}>✗</span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem", lineHeight: 1.55, fontStyle: item.startsWith('"') ? "italic" : "normal" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Structured */}
            <div style={{ background: "rgba(30,168,79,0.08)", border: "1px solid rgba(30,168,79,0.25)", borderRadius: "20px", overflow: "hidden" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(30,168,79,0.2)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ fontSize: "1.1rem" }}>📗</span>
                <span style={{ color: "#25d366", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Slim &amp; Strong — Day by Day</span>
              </div>
              <div style={{ padding: "1.5rem" }}>
                {[
                  { day: "Day 1", habit: "500ml water before your phone. 90 seconds.", done: true },
                  { day: "Day 2", habit: "Eat protein before rice or roti. Every meal.", done: true },
                  { day: "Day 7", habit: "One screen-free meal today.", done: true },
                  { day: "Day 31", habit: "Stand for 60 sec every hour.", done: true },
                  { day: "Day 35", habit: "2-min walk after every meal.", done: true },
                  { day: "Day 61", habit: "Screens off 30 min before sleep.", done: true },
                  { day: "Day 65", habit: "Morning sunlight within 10 min of waking.", done: true },
                  { day: "Day 90", habit: "You now have 90 habits. Pick your top 7.", done: true },
                  { day: "", habit: "You always know exactly what to do next.", done: true, highlight: true },
                ].map(({ day, habit, highlight }, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#25d366", fontSize: "0.8rem", marginTop: "0.15rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.8125rem", lineHeight: 1.55, color: highlight ? "#25d366" : "rgba(255,255,255,0.75)", fontWeight: highlight ? 800 : 400 }}>
                      {day && <span style={{ color: "#e8a020", fontWeight: 700, marginRight: "0.375rem" }}>{day}:</span>}
                      {habit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { n: "90", label: "Habits with exact instructions" },
              { n: "0", label: "Conflicting advice" },
              { n: "1", label: "Clear plan from Day 1 to Day 90" },
              { n: "5 min", label: "Maximum time per day" },
            ].map(({ n, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ color: "#25d366", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1 }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.25rem", maxWidth: 140 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button className="lw-btn lw-btn-lg" onClick={trackAndPay}>Get My 90-Day Plan — ₹199 →</button>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="lw-sec" style={{ background: "var(--lw-bg)" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Everything Inside</div>
            <h2 className="lw-h2">What you get for ₹199</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))", gap: "1.25rem" }}>
            {[
              { icon: "🥗", title: "30 Eating Habits (Days 1–30)", desc: "Every habit focused on what and how you eat — food order, timing, screen-free meals, hydration, snack swaps, restaurant strategies, and more." },
              { icon: "🏃", title: "30 Movement Habits (Days 31–60)", desc: "30 NEAT-based movement habits for desk workers — stair sprints, post-meal walks, desk squats, walking calls, hourly stands, and more. No gym." },
              { icon: "🌙", title: "30 Sleep Habits (Days 61–90)", desc: "30 sleep and recovery habits that balance your hunger hormones, lower cortisol, and unlock overnight fat burning." },
              { icon: "🔬", title: "Science Explanation for Every Habit", desc: "Each of the 90 habits includes the exact biological mechanism behind why it works — in plain language. GLUT4, LPL, cortisol, ghrelin, GLP-1, NEAT." },
              { icon: "🗓", title: "Best Timing for Each Habit", desc: "Every habit includes the exact moment in a working professional's day to use it — before a meeting, during a commute, after lunch, before sleep." },
              { icon: "💡", title: "90 Pro Tips", desc: "One practical shortcut or enhancement for each habit — so you get even better results with the same effort." },
              { icon: "📊", title: "Weekly Progress Tracker (Printable)", desc: "A clean one-page weekly habit tracker you can print or use digitally — designed for the 90-day journey with all 3 areas mapped out." },
              { icon: "🍽️", title: "Restaurant & Travel Cheat Sheet", desc: "A one-page guide for eating out, ordering at airports, and maintaining your eating habits even when you have zero control over your food environment." },
              { icon: "⚡", title: "Quick-Start Checklist (Day 0 Guide)", desc: "A 10-minute setup ritual for the night before Day 1 — everything you need to have in place so tomorrow morning you can start without friction." },
              { icon: "🏆", title: "90-Day Challenge Certificate", desc: "A printable completion certificate for finishing all 90 days. Small motivation — but finishing something worth celebrating." },
              { icon: "🔁", title: "Post-90 Maintenance Blueprint", desc: "A short guide on exactly which habits to keep, which to drop, and how to design your permanent daily routine once the 90 days are done." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="lw-card" style={{ display: "flex", gap: "1rem" }}>
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: "0.375rem" }}>{title}</div>
                  <p style={{ color: "var(--lw-muted)", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lw-sec" style={{ background: "#fff" }}>
        <div className="lw-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Real Results</div>
            <h2 className="lw-h2">Working professionals who made it work</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1.25rem" }}>
            {TESTIMONIALS.map(({ name, role, avatar, result, text }) => (
              <div key={name} className="lw-card">
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div className="lw-avatar">{avatar}</div>
                  <div><div style={{ fontWeight: 700 }}>{name}</div><div style={{ color: "var(--lw-subtle)", fontSize: "0.8rem" }}>{role}</div></div>
                </div>
                <div style={{ marginBottom: "0.75rem" }}>{[1,2,3,4,5].map(i => <span key={i} className="lw-star">★</span>)}</div>
                <p style={{ color: "var(--lw-muted)", fontSize: "0.875rem", lineHeight: 1.7, margin: "0 0 1rem 0" }}>&ldquo;{text}&rdquo;</p>
                <div style={{ background: "rgba(30,168,79,0.08)", border: "1px solid rgba(30,168,79,0.2)", borderRadius: "8px", padding: "0.5rem 0.875rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--lw-green)" }}>✓ {result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="lw-sec" style={{ background: "var(--lw-bg)" }}>
        <div className="lw-wrap-sm">
          <div className="lw-price-box">
            <div className="lw-label" style={{ color: "#e8a020", marginBottom: "0.75rem" }}>ONE-TIME OFFER</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem,4vw,2.25rem)", fontWeight: 900, marginBottom: "1rem" }}>Get Slim &amp; Strong Starting Today</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "2rem", maxWidth: 440, margin: "0 auto 2rem" }}>90 habits across 3 areas of your life. Under 5 minutes each. Structured by month so you always know exactly what you&apos;re working on. Forever.</p>

            <div style={{ maxWidth: 420, margin: "0 auto 2rem", textAlign: "left" }}>
              {[
                ["30 Eating Habits (Month 1)", "₹299"],
                ["30 Movement Habits (Month 2)", "₹299"],
                ["30 Sleep & Recovery Habits (Month 3)", "₹299"],
                ["Science Breakdown for All 90 Habits", "₹99"],
                ["Best-Time Guidance for Working Professionals", "₹3"],
              ].map(([item, val]) => (
                <div key={item} className="lw-value-row">
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>{item}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem", textDecoration: "line-through" }}>{val}</span>
                </div>
              ))}
              <div className="lw-value-row" style={{ borderBottom: "none", paddingTop: "1rem" }}>
                <span style={{ color: "#fff", fontWeight: 800 }}>Total Value</span>
                <span style={{ color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>₹999</span>
              </div>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.1rem", textDecoration: "line-through" }}>₹999</span>
              <span style={{ color: "#25d366", fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, margin: "0 0.5rem" }}>₹199</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: "2rem" }}>One-time · Instant PDF download · Lifetime access</div>

            <button className="lw-btn lw-btn-lg" onClick={trackAndPay} style={{ width: "100%", maxWidth: 380 }}>Get Instant Access — ₹199 →</button>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.25rem", marginTop: "1rem" }}>
              {["🔒 Secure Razorpay", "📱 UPI / Cards / NetBanking", "↩ 7-Day Money-Back"].map(t => (
                <span key={t} style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>{t}</span>
              ))}
            </div>

            <div style={{ textAlign: "left", marginTop: "2rem", maxWidth: 400, margin: "2rem auto 0" }}>
              {["90 daily habits across 3 areas of your life", "Healthy Eating · Movement · Sleep — 30 habits per area", "Science explanation for every single habit", "Exact timing guide for working professionals", "Pro tip for each of the 90 habits", "5 powerful bonuses included", "Instant PDF download + email copy", "Lifetime access — no expiry, no subscription"].map(item => (
                <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span className="lw-check">✓</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lw-sec" style={{ background: "#fff" }}>
        <div className="lw-wrap-sm">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Questions</div>
            <h2 className="lw-h2">Frequently Asked</h2>
          </div>
          <div>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="lw-faq-item">
                <button className="lw-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{q}</span>
                  <span style={{ fontSize: "1.25rem", color: "var(--lw-green)", flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="lw-faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="lw-sec" style={{ background: "var(--lw-bg)", textAlign: "center" }}>
        <div className="lw-wrap-sm">
          <div className="lw-label" style={{ color: "var(--lw-green)", marginBottom: "0.75rem" }}>Start Tonight</div>
          <h2 className="lw-h2" style={{ marginBottom: "1rem" }}>90 days from now, you&apos;ll wish<br /><span style={{ color: "var(--lw-green)" }}>you started today.</span></h2>
          <p className="lw-body" style={{ marginBottom: "2rem" }}>₹199. One time. 90 habits. 3 areas of your life. Instant download. Start Day 1 tonight.</p>
          <button className="lw-btn lw-btn-lg" onClick={trackAndPay}>Get Slim &amp; Strong — ₹199 →</button>
          <p style={{ color: "var(--lw-subtle)", fontSize: "0.8rem", marginTop: "1rem" }}>Secure payment · Instant download · 7-day money-back guarantee</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--lw-navy)", color: "rgba(255,255,255,0.35)", padding: "2rem 1rem", textAlign: "center", fontSize: "0.8rem" }}>
        <div>© 2026 High Performance Club · <a href="/privacy-policy" style={{ color: "inherit" }}>Privacy</a> · <a href="/terms-and-conditions" style={{ color: "inherit" }}>Terms</a> · admin@growthyfai.com</div>
      </footer>

      {/* ── STICKY CTA ── */}
      <div className="lw-sticky" style={{ transform: scrolled ? "translateY(0)" : "translateY(100%)" }}>
        <span className="hide-mobile" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Slim &amp; Strong — 90-Day Habit System</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", textDecoration: "line-through" }}>₹999</span>
          <button className="lw-btn" onClick={trackAndPay} style={{ padding: "0.75rem 1.75rem", fontSize: "0.9rem" }}>Get for ₹199 →</button>
        </div>
      </div>

      {/* ── LIVE TOAST ── */}
      {toastVisible && (
        <div style={{ position: "fixed", bottom: 80, left: "1rem", zIndex: 200, background: "#fff", border: "1px solid var(--lw-border)", borderRadius: "12px", padding: "0.875rem 1.125rem", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", maxWidth: 300, fontSize: "0.875rem", animation: "slideIn 0.4s ease" }}>
          <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Rahul from Bangalore just bought this 🎉</div>
              <div style={{ color: "var(--lw-subtle)", fontSize: "0.8rem" }}>3 minutes ago</div>
            </div>
            <button onClick={() => setToastVisible(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--lw-subtle)", fontSize: "1rem", paddingLeft: "0.5rem" }}>×</button>
          </div>
        </div>
      )}
    </>
  );
}
