import { Sparkles, Star, Award } from "lucide-react";
import HeroPhone from "./HeroPhone";

export default function Hero() {
  return (
    <section className="relative pt-10 pb-10 lg:pt-16 lg:pb-16 overflow-hidden mesh-bg">
      <span className="emoji-deco float-1 top-10 left-6 text-3xl hidden lg:block" aria-hidden="true">✨</span>
      <span className="emoji-deco float-2 top-16 right-10 text-3xl hidden lg:block" aria-hidden="true">🎯</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT — copy */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Identity pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full accent-pill text-sm font-semibold animate-fade-up">
              <Sparkles className="w-4 h-4" />
              Join the FREE 7-Day High Performance Lifestyle Challenge
            </div>

            {/* Headline — more breathing room above */}
            <h1 className="mt-8 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-balance text-foreground animate-fade-up delay-100">
              Reclaim Your{" "}
              <span className="gradient-text">Energy</span>,{" "}
              <span className="gradient-text">Focus</span> &{" "}
              <span className="gradient-text">Momentum</span>{" "}
              <span className="text-foreground-muted font-medium">in Just</span>{" "}
              <span className="italic font-normal text-emphasis-yellow">7 Days</span>.
            </h1>

            {/* Subhead — more space below headline */}
            <p className="mt-6 text-lg sm:text-xl text-foreground-muted italic leading-relaxed animate-fade-up delay-200">
              No 5 AM wake-ups. No complicated routine.
            </p>

            {/* Body — clear gap from subhead */}
            <p className="mt-5 text-base sm:text-lg text-foreground font-medium leading-relaxed animate-fade-up delay-300">
              1 tiny habit delivered on your WhatsApp.{" "}
              <span className="text-emphasis-mint">Just 5 minutes to do.</span>{" "}
              That&apos;s it. 🙌
            </p>

            {/* CTAs — generous space above */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start animate-fade-up delay-400">
              <a
                href="#signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base sm:text-lg group"
              >
                Join for{" "}
                <span className="line-through opacity-70 mx-1">₹997</span>
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

            {/* Trust microcopy + stars — clear gap below CTA */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm text-foreground-subtle animate-fade-up delay-500 justify-center lg:justify-start">
              <span className="font-medium">No app. No login. Just 30 seconds to join.</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-foreground-subtle/40" />
              <div className="flex items-center gap-1 justify-center lg:justify-start">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
                <span className="ml-1 font-bold text-foreground">4.9</span>
                <span>· 2,400+ members</span>
              </div>
            </div>
          </div>

          {/* RIGHT — iPhone */}
          <div className="lg:col-span-5 flex justify-center animate-fade-up delay-300">
            <div className="relative">
              <div className="absolute -top-10 -left-4 lg:-left-12 z-20 sticky-note p-2.5 rounded-md tilt-left w-40 hidden lg:block">
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
