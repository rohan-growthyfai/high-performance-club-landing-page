/* eslint-disable @next/next/no-img-element */
import HeroPhone from "./HeroPhone";

const reviews = [
  {
    avatar: "/avatars/men/man-1.jpg",
    name: "Arjun S.",
    city: "Bengaluru",
    review: "Something shifted on Day 1. I am on Day 19 now.",
  },
  {
    avatar: "/avatars/women/woman-3.avif",
    name: "Preethi R.",
    city: "Chennai",
    review: "Did the habit before I even fully woke up.",
  },
  {
    avatar: "/avatars/women/woman-1.jpg",
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
    <section className="relative pt-6 pb-8 lg:pt-10 lg:pb-0 overflow-hidden mesh-bg min-h-[calc(100vh-68px)] flex flex-col justify-center">
      <span className="emoji-deco float-1 top-10 left-6 text-3xl hidden lg:block" aria-hidden="true">✨</span>
      <span className="emoji-deco float-2 top-16 right-10 text-3xl hidden lg:block" aria-hidden="true">🎯</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT — copy */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-5 animate-fade-up">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              <span className="text-sm font-bold text-green-700 tracking-wide">FREE 7-Day WhatsApp Challenge</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-balance text-foreground animate-fade-up">
              Feel More{" "}
              <span className="gradient-text">Energetic</span>,{" "}
              <span className="gradient-text">Healthy</span> &{" "}
              <span className="gradient-text">Focused</span>{" "}
              <span className="text-foreground-muted font-medium">in Just</span>{" "}
              <span className="italic font-normal text-emphasis-yellow">7 Days</span>
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-lg sm:text-xl text-foreground-muted italic leading-relaxed animate-fade-up delay-100">
              No 5 AM wake-ups. No complicated routine.
            </p>

            {/* Body */}
            <p className="mt-3 text-base sm:text-lg text-foreground font-medium leading-relaxed animate-fade-up delay-200">
              Get 1 tiny habit delivered on WhatsApp every day.{" "}
              <span className="text-emphasis-mint">Takes 5 minutes to do.</span>{" "}
              That&apos;s it. 🙌
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col items-center lg:items-start gap-2 animate-fade-up delay-300">
              <a
                href="#signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-12 py-6 rounded-full text-xl sm:text-2xl font-bold group"
              >
                Join FREE on WhatsApp
                <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
              </a>
              <p className="text-sm text-foreground-subtle font-medium">
                Already joined by <span className="text-foreground font-semibold">2,400+ members</span>
              </p>
            </div>

            {/* 3 Testimonials */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle animate-fade-up delay-500">
              {reviews.map((r) => (
                <div key={r.name} className="flex flex-col gap-2 px-4 py-2 first:pl-0 last:pr-0">
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
          <div className="lg:col-span-5 flex justify-center items-start animate-fade-up delay-300 lg:-mt-10">
            <div className="relative">
              {/* "This is what lands in your phone" — to the RIGHT of the iPhone */}
              <div className="absolute -right-4 lg:-right-56 top-1/3 z-20 sticky-note p-5 rounded-md tilt-right w-60 hidden lg:block">
                <p className="font-serif italic text-amber-900 leading-snug">
                  <span className="text-xl font-bold not-italic block">FREE</span>
                  <span className="text-base block">7-Day WhatsApp Challenge 📱</span>
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
