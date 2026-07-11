"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PAYMENT_LINK = "https://rzp.io/rzp/2fsOU9dz";

function buy() {
  if (typeof window !== "undefined" && typeof window.fbq === "function")
    window.fbq("track", "InitiateCheckout", { value: 199, currency: "INR", content_name: "Slim & Strong Ebook" });
  window.open(PAYMENT_LINK, "_blank");
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill="#1da851" />
      <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Buy CTA button ───────────────────────────────────────────────────────────
function BuyCTA({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={buy}
        className="btn-primary inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-black text-white"
        style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(37,211,102,0.42)", letterSpacing: "-0.01em", border: "none" }}
      >
        {label}
      </button>
      {sub && <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── Green glow frame around inside-page images (PhoneGlow-like) ───────────────
function ImageGlow({ children, from, to, accent }: {
  children: React.ReactNode;
  from: string;
  to: string;
  accent: string;
}) {
  return (
    <div
      className="relative w-full flex justify-center px-5 pt-8 pb-6"
      style={{
        borderRadius: 32,
        background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        boxShadow: `0 24px 60px -18px ${accent}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "-20%", bottom: "-25%", width: "70%", height: "60%", background: `radial-gradient(circle, ${accent} 0%, rgba(255,255,255,0) 70%)`, filter: "blur(24px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-15%", top: "-10%", width: "55%", height: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <div className="relative w-full">{children}</div>
    </div>
  );
}

// ─── Meta Pixel ViewContent ───────────────────────────────────────────────────
function useMetaPixelViewContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "Slim & Strong Ebook",
        value: 199,
        currency: "INR",
      });
    }
  }, []);
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function EbookPage() {
  useMetaPixelViewContent();

  const features = [
    { icon: "📅", title: "90 Daily Habits", desc: "One tiny, science-backed fat-loss habit for every day — across nutrition, movement & mindset." },
    { icon: "🥗", title: "Weekly Meal Plans", desc: "Simple Indian-friendly meals & portions that keep you full while you lose weight." },
    { icon: "🏠", title: "No-Gym Fat-Loss Workouts", desc: "Bodyweight routines you can do at home in 15 minutes — zero equipment needed." },
    { icon: "📈", title: "90-Day Progress Tracker", desc: "A printable tracker to log habits, weight & wins so you actually stay consistent." },
    { icon: "🧠", title: "The Science, Simplified", desc: "Why the weight comes off — explained in plain language, no jargon, no confusion." },
    { icon: "🛒", title: "Bonus: Grocery & Snack Lists", desc: "Ready-made shopping lists and smart snacks so eating right is effortless." },
  ];

  const insidePages = [
    { src: "/ebook/page-meal-plan.png", caption: "Weekly meal plans — what to eat, every day", from: "#0f3d24", to: "#1da851", accent: "rgba(37,211,102,0.55)" },
    { src: "/ebook/page-workouts.png", caption: "No-gym fat-loss workouts you can do at home", from: "#0f3d24", to: "#25d366", accent: "rgba(37,211,102,0.5)" },
    { src: "/ebook/page-tracker.png", caption: "The 90-day tracker that keeps you consistent", from: "#0f3d24", to: "#1ea84f", accent: "rgba(37,211,102,0.55)" },
  ];

  const included = [
    "90 daily fat-loss habits (nutrition · movement · mindset)",
    "Weekly meal plans with portions & swaps",
    "No-gym, no-equipment workout routines",
    "Printable 90-day progress tracker",
    "The science of fat loss, simplified",
    "Bonus grocery & smart-snack lists",
    "Instant PDF download · lifetime access",
    "7-day, no-questions money-back guarantee",
  ];

  const testimonials = [
    { name: "Priya S.", city: "Pune", text: "Lost 6 kg in my first 8 weeks just by following the daily habits. The meal plans made it so simple — I never felt like I was on a diet." },
    { name: "Rahul M.", city: "Delhi", text: "No gym, no fancy equipment. The home workouts fit into my mornings and the tracker kept me honest. Down 9 kg and still going." },
    { name: "Anjali K.", city: "Bengaluru", text: "Best ₹199 I've spent on myself. Clear, practical and actually doable. My energy is up and my jeans finally fit again." },
  ];

  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 15, overflowX: "hidden" }}>
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes eb-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .duc-h1{font-size:clamp(2.1rem,5vw,3.2rem);font-weight:900;line-height:1.12;letter-spacing:-0.025em}
        .duc-h2{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;line-height:1.18;letter-spacing:-0.02em}
        .duc-body{font-size:clamp(1rem,1.8vw,1.0625rem);line-height:1.75;color:#52525b}
        .duc-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#25d366}
        .duc-card{background:#fff;border:1px solid #e2dfd6;border-radius:16px;padding:20px}
        .duc-section-title{background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .duc-glow-card{box-shadow:0 4px 24px rgba(37,211,102,0.08),0 1px 3px rgba(0,0,0,0.06);transition:box-shadow 0.2s,transform 0.2s}
        .duc-glow-card:hover{box-shadow:0 8px 32px rgba(37,211,102,0.14),0 2px 8px rgba(0,0,0,0.08);transform:translateY(-2px)}
        .eb-float{animation:eb-float 6s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.eb-float{animation:none}}
      `}</style>

      {/* ══ ANNOUNCEMENT BAR ═════════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#1da851 0%,#25d366 50%,#1da851 100%)", padding: "10px 16px" }}>
        <p className="text-center font-semibold text-white" style={{ fontSize: 13, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          ✦ Instant PDF · One-time ₹199 · 7-day money-back guarantee ✦
        </p>
      </div>

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-up accent-pill" style={{ fontSize: 13, fontWeight: 700 }}>
                <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#25d366" }} />
                Instant PDF · One-time ₹199 · 7-day money-back
              </div>

              <h1 className="duc-h1 animate-fade-up delay-100 mb-5" style={{ color: "#18181b" }}>
                Everything you need to lose weight —{" "}
                <span className="gradient-text">in one simple ₹199 guide.</span>
              </h1>

              <p className="animate-fade-up delay-150 mb-7 max-w-xl mx-auto lg:mx-0" style={{ fontSize: 16, lineHeight: 1.75, color: "#52525b" }}>
                <strong style={{ color: "#18181b" }}>Slim &amp; Strong</strong> is a 90-day, do-this-today weight-loss guide — 90 tiny daily habits, easy meal plans, no-gym workouts and a progress tracker. No confusion, no crash diets. Just a clear plan you can actually follow.
              </p>

              <div className="animate-fade-up delay-200 flex flex-col items-center lg:items-start gap-5">
                <BuyCTA label="Get the Guide — ₹199 →" sub="Instant PDF download · Lifetime access" />

                {/* Trust row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2" style={{ fontSize: 13, color: "#52525b" }}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-flex"><Star /><Star /><Star /><Star /><Star /></span>
                    <strong style={{ color: "#18181b" }}>Loved by 2,800+ readers</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5"><Check /> Instant download</span>
                  <span className="inline-flex items-center gap-1.5"><Check /> Works without a gym</span>
                </div>
              </div>
            </div>

            {/* RIGHT — floating 3D cover on green glow panel */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto" style={{ maxWidth: 420 }}>
                {/* Glow panel behind cover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 m-auto"
                  style={{
                    borderRadius: 36,
                    background: "radial-gradient(120% 90% at 50% 30%, rgba(37,211,102,0.35) 0%, rgba(37,211,102,0.10) 45%, rgba(37,211,102,0) 72%)",
                    filter: "blur(6px)",
                    transform: "scale(1.05)",
                  }}
                />
                <div
                  className="relative flex justify-center px-8 py-10"
                  style={{
                    borderRadius: 36,
                    background: "linear-gradient(160deg, rgba(37,211,102,0.14) 0%, rgba(29,168,81,0.06) 100%)",
                    boxShadow: "0 30px 70px -20px rgba(37,211,102,0.45), inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ebook/cover-3d.png"
                    alt="Slim & Strong — The 90-Day Weight Loss Guide ebook cover"
                    loading="eager"
                    className="eb-float relative"
                    style={{ width: "100%", height: "auto", maxWidth: 300, filter: "drop-shadow(0 26px 40px rgba(15,31,19,0.35))" }}
                  />
                </div>
                {/* Price tag */}
                <div
                  className="absolute -bottom-4 right-2 rounded-2xl px-5 py-3 text-center"
                  style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
                >
                  <p style={{ fontSize: 11, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>One-time</p>
                  <p style={{ fontSize: 26, fontWeight: 900, color: "#18181b", lineHeight: 1 }}>₹199</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 2. WHAT'S INSIDE ══════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="text-center mb-14">
            <p className="duc-label mb-3">What&apos;s inside</p>
            <h2 className="duc-h2 duc-section-title mb-4">Open the guide and here&apos;s what you get</h2>
            <p className="duc-body max-w-2xl mx-auto">
              A complete, follow-along fat-loss system — <strong style={{ color: "#18181b" }}>90 daily habits</strong> across nutrition, movement and mindset, plus the plans and tools to make it stick.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.map((f) => (
              <div key={f.title} className="duc-glow-card rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#fff", border: "1px solid #e2dfd6" }}>
                <span style={{ fontSize: 30, lineHeight: 1 }}>{f.icon}</span>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", lineHeight: 1.3 }}>{f.title}</p>
                <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Peek inside strip */}
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Peek inside</p>
            <h3 className="duc-h2 duc-section-title" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>Real pages from the guide</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {insidePages.map((p) => (
              <div key={p.src} className="flex flex-col items-center">
                <ImageGlow from={p.from} to={p.to} accent={p.accent}>
                  <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 18px 40px -12px rgba(15,31,19,0.45)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.caption}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                </ImageGlow>
                <p className="mt-4 text-center" style={{ fontSize: 14, fontWeight: 600, color: "#3f3f46", maxWidth: 260 }}>{p.caption}</p>
              </div>
            ))}
          </div>

          {/* Device bundle showcase */}
          <div className="rounded-3xl overflow-hidden mb-14" style={{ background: "linear-gradient(160deg,#0f3d24 0%,#0f1f13 100%)", boxShadow: "0 24px 60px -18px rgba(15,31,19,0.5)" }}>
            <div className="px-6 pt-10 pb-2 text-center">
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7ee2a8" }}>Read it anywhere</p>
              <h3 className="mt-2" style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>
                Read it on any device — phone, laptop, or print it out.
              </h3>
            </div>
            <div className="px-6 pb-8 pt-4 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ebook/device-bundle.png"
                alt="Slim & Strong ebook shown on a laptop and phone"
                loading="lazy"
                style={{ width: "100%", height: "auto", maxWidth: 760 }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <BuyCTA label="Get Instant Access — ₹199 →" sub="Instant PDF download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 3. VALUE + CLOSE ══════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">

          <div className="text-center mb-12">
            <p className="duc-label mb-3">Everything you get today</p>
            <h2 className="duc-h2 duc-section-title mb-4">One small payment. A complete plan.</h2>
            <p className="duc-body max-w-xl mx-auto">Here&apos;s everything packed into <strong style={{ color: "#18181b" }}>Slim &amp; Strong</strong> — yours instantly, forever.</p>
          </div>

          {/* Value stack — dark premium card */}
          <div className="rounded-3xl overflow-hidden mb-12" style={{ background: "linear-gradient(135deg,#0f1f13 0%,#18181b 60%,#0f1f13 100%)", boxShadow: "0 30px 70px -24px rgba(15,31,19,0.55)" }}>
            <div className="px-6 py-8 lg:px-10 lg:py-10">
              <div className="flex flex-col gap-3.5 mb-8">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check />
                    <span style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl px-6 py-6 text-center" style={{ background: "rgba(37,211,102,0.10)", border: "1px solid rgba(37,211,102,0.3)" }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                  Total worth{" "}
                  <span style={{ textDecoration: "line-through", textDecorationColor: "#f87171" }}>₹1,499</span>
                </p>
                <p className="mt-1" style={{ fontSize: 15, color: "#fff" }}>
                  Today just{" "}
                  <span style={{ fontSize: 34, fontWeight: 900, color: "#25d366", letterSpacing: "-0.02em" }}>₹199</span>
                </p>
                <div className="mt-5 flex justify-center">
                  <button
                    onClick={buy}
                    className="btn-primary inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-black text-white"
                    style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(37,211,102,0.42)", border: "none" }}
                  >
                    Get Instant Access — ₹199 →
                  </button>
                </div>
                <p className="mt-3" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>One-time payment · Instant PDF download · 7-day money-back guarantee</p>
              </div>
            </div>
          </div>

          {/* Guarantee badge */}
          <div className="duc-card duc-glow-card flex items-center gap-5 mb-12" style={{ background: "#fff" }}>
            <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 8px 20px rgba(37,211,102,0.35)" }}>
              <span style={{ fontSize: 28 }}>🛡️</span>
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: "#18181b" }}>7-Day Money-Back Guarantee</p>
              <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>Read it, try it, and if it&apos;s not for you, email us within 7 days for a full refund. No questions asked.</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="text-center mb-8">
            <p className="duc-label mb-3">Loved by readers</p>
            <h3 className="duc-h2 duc-section-title" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>Real results, real people</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {testimonials.map((t) => (
              <div key={t.name} className="duc-glow-card rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#fff", border: "1px solid #e2dfd6" }}>
                <span className="inline-flex"><Star /><Star /><Star /><Star /><Star /></span>
                <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.65 }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,45%)` }}>{t.name[0]}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>{t.name} <span style={{ fontWeight: 400, color: "#71717a" }}>· {t.city}</span></p>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <BuyCTA label="Get Instant Access — ₹199 →" sub="One-time payment · Instant PDF download · 7-day money-back guarantee" />
          </div>

          {/* Footer */}
          <p className="text-center mt-12" style={{ fontSize: 12, color: "#a1a1aa" }}>
            © {new Date().getFullYear()} Slim &amp; Strong · High Performance Lifestyle. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
