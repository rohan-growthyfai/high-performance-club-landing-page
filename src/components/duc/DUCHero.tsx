/* eslint-disable @next/next/no-img-element */
import DUCPhone from "./DUCPhone";

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const reviews = [
  { avatar: "/avatars/men/man-1.jpg", name: "Karan M.", city: "Pune", review: "Finally a habit system that doesn't need an app." },
  { avatar: "/avatars/women/woman-3.avif", name: "Sneha R.", city: "Mumbai", review: "The DONE tracking keeps me accountable every day." },
  { avatar: "/avatars/women/woman-1.jpg", name: "Priya T.", city: "Bengaluru", review: "Best ₹99 I've spent this year." },
];

export default function DUCHero() {
  return (
    <section className="relative pt-6 pb-8 lg:pt-10 lg:pb-0 overflow-hidden mesh-bg min-h-[calc(100vh-68px)] flex flex-col justify-center">
      <span className="emoji-deco float-1 top-10 left-6 text-3xl hidden lg:block" aria-hidden="true">⚡</span>
      <span className="emoji-deco float-2 top-16 right-10 text-3xl hidden lg:block" aria-hidden="true">🎯</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 mb-5 animate-fade-up">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
              <span className="text-sm font-bold text-orange-700 tracking-wide">🔥 Daily Habit System on WhatsApp</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[2.1rem] sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.15] tracking-tight text-balance text-foreground animate-fade-up">
              Build Better{" "}
              <span className="gradient-text">Habits Every Day</span>{" "}
              on WhatsApp
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-base sm:text-lg text-foreground leading-relaxed animate-fade-up delay-100">
              Join <strong>Daily Upgrade Club</strong> and get <strong>1 tiny habit daily</strong>, weekly progress tracking, monthly themes, habit guides, and a private accountability group — all for just <strong>₹99/month</strong>.
            </p>
            <p className="mt-2 text-base text-foreground-muted italic animate-fade-up delay-150">
              No app. No long videos. No complicated routine.
            </p>

            {/* CTA */}
            <div className="mt-6 animate-fade-up delay-300 inline-flex flex-col gap-2">
              <a href="#duc-join" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold group">
                Start for ₹99/month
                <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
              </a>
              <p className="text-sm text-foreground-subtle font-medium text-center">Your 30-day habit journey starts today.</p>
            </div>

            {/* Trust bullets */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 animate-fade-up delay-400">
              {["Cancel anytime","No app needed","Daily habits on WhatsApp","Less than 5 minutes/day"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-foreground-muted">
                  <span className="text-green-500 font-bold">✓</span> {t}
                </span>
              ))}
            </div>

            {/* Reviews */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle animate-fade-up delay-500 text-center sm:text-left">
              {reviews.map((r) => (
                <div key={r.name} className="flex flex-col items-center sm:items-start gap-2 px-0 sm:px-4 py-3 sm:py-2 first:sm:pl-0 last:sm:pr-0">
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
          <div className="lg:col-span-5 flex justify-center items-start animate-fade-up delay-300 lg:-mt-10 mt-6">
            <div className="relative">
              <div className="absolute -right-4 lg:-right-56 top-1/3 z-20 sticky-note p-5 rounded-md tilt-right w-60 hidden lg:block">
                <p className="font-serif italic text-amber-900 leading-snug">
                  <span className="text-xl font-bold not-italic block">₹99/month</span>
                  <span className="text-base block">Daily habits on WhatsApp 📱</span>
                </p>
              </div>
              <div className="absolute -bottom-2 -right-2 lg:-right-6 z-10 animate-wiggle">
                <div className="bg-accent text-white rounded-full px-3 py-1.5 shadow-xl tilt-right">
                  <p className="text-[10px] font-bold uppercase">🔥 Cancel anytime</p>
                </div>
              </div>
              <DUCPhone />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
