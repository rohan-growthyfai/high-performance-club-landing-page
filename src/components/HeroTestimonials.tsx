/* eslint-disable @next/next/no-img-element */

const reviews = [
  {
    avatar: "/avatars/men/man-3.jpg",
    name: "Arjun S.",
    city: "Bengaluru",
    review:
      "I barely have time for lunch — 2 kids, a startup, back-to-back meetings. I thought 5 minutes could not do much. Did it between calls on Day 1. Something actually shifted. I am on Day 19 now.",
  },
  {
    avatar: "/avatars/men/man-4.jpg",
    name: "Preethi R.",
    city: "Chennai",
    review:
      "I have tried every app, every program — all failed within a week. This was different. WhatsApp showed up at 6 AM and I did the habit before I even fully woke up. No willpower. Just a message.",
  },
  {
    avatar: "/avatars/women/woman-2.jpeg",
    name: "Divya M.",
    city: "Mumbai",
    review:
      "Zero expectations from a free challenge. Assumed it would be generic advice I have heard a hundred times. Day 3 genuinely surprised me. Still using that habit every single day.",
  },
];

const Star = () => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function HeroTestimonials() {
  return (
    <section className="py-10 lg:py-12 border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle">
          {reviews.map((r) => (
            <div key={r.name} className="flex flex-col gap-3 px-6 py-4 sm:py-0 first:pl-0 last:pr-0">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} />)}
              </div>

              {/* Quote */}
              <p className="text-base text-foreground leading-relaxed flex-1">
                &ldquo;{r.review}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-2.5 mt-1">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">{r.name}</p>
                  <p className="text-xs text-foreground-subtle mt-0.5">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
