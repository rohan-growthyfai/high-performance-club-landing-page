/* eslint-disable @next/next/no-img-element */
import { Star, Award } from "lucide-react";
import HeroPhone from "./HeroPhone";

const reviews = [
  {
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    name: "Arjun S.",
    city: "Bengaluru",
    review: "Something shifted on Day 1. I am on Day 19 now.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    name: "Preethi R.",
    city: "Chennai",
    review: "Did the habit before I even fully woke up.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    name: "Divya M.",
    city: "Mumbai",
    review: "Day 3 genuinely surprised me.",
  },
];

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative pt-6 pb-0 lg:pt-10 lg:pb-0 overflow-hidden mesh-bg">
      <span className="emoji-deco float-1 top-10 left-6 text-3xl hidden lg:block" aria-hidden="true">✨</span>
      <span className="emoji-deco float-2 top-16 right-10 text-3xl hidden lg:block" aria-hidden="true">🎯</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT — copy */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-balance text-foreground animate-fade-up">
              Reclaim Your{" "}
              <span className="gradient-text">Energy</span>,{" "}
              <span className="gradient-text">Focus</span> &{" "}
              <span className="gradient-text">Momentum</span>{" "}
              <span className="text-foreground-muted font-medium">in Just</span>{" "}
              <span className="italic font-normal text-emphasis-yellow">7 Days</span>.
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-lg sm:text-xl text-foreground-muted italic leading-relaxed animate-fade-up delay-100">
              No 5 AM wake-ups. No complicated routine.
            </p>

            {/* Body */}
            <p className="mt-3 text-base sm:text-lg text-foreground font-medium leading-relaxed animate-fade-up delay-200">
              1 tiny habit delivered on your WhatsApp.{" "}
              <span className="text-emphasis-mint">Just 5 minutes to do.</span>{" "}
              That&apos;s it. 🙌
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start animate-fade-up delay-300">
              <a
                href="#signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base sm:text-lg group"
              >
                Join for{" "}
                <span className="line-through opacity-70 mx-1">₹1999</span>
                <span className="font-extrabold">FREE</span>
                <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
              </a>
              <a
                href="#certificate"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground transition-all text-base font-medium"
              >
                <Award className="w-4 h-4 text-accent" />
                See the prize
              </a>
            </div>

            {/* Trust microcopy */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm text-foreground-subtle animate-fade-up delay-400 justify-center lg:justify-start">
              <span className="font-medium">No app. No login. Just 30 seconds to join.</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-foreground-subtle/40" />
              <div className="flex items-center gap-1 justify-center lg:justify-start">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                <span className="ml-1 font-bold text-foreground">4.9</span>
                <span>· 2,400+ members</span>
              </div>
            </div>

            {/* Reviews — inline inside hero */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle border border-border-subtle rounded-2xl bg-white/60 backdrop-blur-sm animate-fade-up delay-500">
              {reviews.map((r, i) => (
                <div key={r.name} className={`flex flex-col gap-2 p-4 ${i === 0 ? "rounded-l-2xl" : ""} ${i === reviews.length - 1 ? "rounded-r-2xl" : ""}`}>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(j => <StarIcon key={j} />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">
                    &ldquo;{r.review}&rdquo;
                  </p>
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
          <div className="lg:col-span-5 flex justify-center animate-fade-up delay-300">
            <div className="relative">
              {/* "This is what lands in your phone" — to the RIGHT of the iPhone */}
              <div className="absolute -right-4 lg:-right-44 top-1/3 z-20 sticky-note p-2.5 rounded-md tilt-right w-36 hidden lg:block">
                <p className="font-serif italic text-xs text-amber-900 leading-snug">
                  This is what lands in your phone! 📱
                </p>
              </div>
              <div className="absolute -bottom-2 -right-2 lg:-right-6 z-10 animate-wiggle">
                <div className="bg-accent text-white rounded-full px-3 py-1.5 shadow-xl tilt-right">
                  <p className="text-[10px] font-bold uppercase">🏆 Win cert!</p>
                </div>
              </div>
              <HeroPhone />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
