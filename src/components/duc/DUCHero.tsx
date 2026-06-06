/* eslint-disable @next/next/no-img-element */
import DUCPhone from "./DUCPhone";

const reviews = [
  { avatar: "/avatars/men/man-1.jpg", name: "Karan M.", city: "Pune", review: "Finally a habit system that actually fits into real life. No app, no hassle." },
  { avatar: "/avatars/women/woman-3.avif", name: "Sneha R.", city: "Mumbai", review: "The DONE tracking keeps me accountable every single day." },
  { avatar: "/avatars/women/woman-1.jpg", name: "Priya T.", city: "Bengaluru", review: "Best ₹99 I've spent. My energy has noticeably improved." },
];

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function DUCHero() {
  return (
    <section className="relative overflow-hidden mesh-bg py-12 lg:py-16">

      {/* Glow spots */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #b8853a 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16">

          {/* LEFT — all copy */}
          <div className="flex-1 min-w-0">

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#1da851] border border-[#25d366]/30 bg-[#25d366]/8 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
                WhatsApp Habit Subscription
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display" style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: "#18181b" }}>
              One habit.<br />
              <span style={{ color: "#1da851" }}>Every day.</span><br />
              <span style={{ color: "#71717a", fontWeight: 400, fontStyle: "italic", fontSize: "0.82em" }}>On WhatsApp.</span>
            </h1>

            {/* Green divider */}
            <div className="mt-6 mb-6 h-1 w-14 rounded-full bg-[#25d366]" />

            {/* Subheadline — updated */}
            <p className="text-foreground-muted text-lg leading-relaxed max-w-xl">
              Get 1 tiny habit every morning on WhatsApp to help you feel more energetic, focused, and consistent — with complete progress tracking built in.
            </p>

            {/* Trust bullets */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
              {["Cancel anytime", "No app needed", "Daily on WhatsApp", "Under 5 minutes/day"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-foreground-muted">
                  <span className="text-[#1da851] font-bold">✓</span> {t}
                </span>
              ))}
            </div>

            {/* CTA — bigger */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#duc-join"
                className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold group"
              >
                <span className="relative z-10">Start for ₹99/month</span>
                <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <p className="text-foreground-subtle text-sm">Cancel anytime · No lock-in</p>
            </div>

            {/* Reviews — replacing stats */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle">
              {reviews.map((r) => (
                <div key={r.name} className="flex flex-col items-start gap-2 px-0 sm:px-4 py-3 sm:py-2 first:sm:pl-0 last:sm:pr-0">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(j => <StarIcon key={j} />)}</div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{r.review}&rdquo;</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={r.avatar} alt={r.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">{r.name}</p>
                      <p className="text-[11px] text-foreground-subtle mt-0.5">{r.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — iPhone */}
          <div className="hidden lg:flex flex-shrink-0 justify-center items-start relative mt-4" style={{ width: 300 }}>
            <div className="absolute inset-0 blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <DUCPhone />
            </div>
            <div className="absolute -left-16 top-1/3 z-20">
              <div className="bg-white border border-border-subtle rounded-xl px-3 py-2 shadow-lg">
                <p className="text-[#1da851] font-bold text-sm">DONE ✅</p>
                <p className="text-foreground-subtle text-xs mt-0.5">streak: 7 days 🔥</p>
              </div>
            </div>
            <div className="absolute -right-8 bottom-1/3 z-20 sticky-note px-3 py-2 rounded-lg tilt-right">
              <p className="font-serif italic text-amber-900 text-sm">₹99/month 📱</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
