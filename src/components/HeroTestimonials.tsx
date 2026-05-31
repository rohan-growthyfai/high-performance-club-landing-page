/* eslint-disable @next/next/no-img-element */

type Review = {
  avatar: string;
  name: string;
  city: string;
  review: string;
  color: string;
  border: string;
  tag: string;
  tagBg: string;
  tagColor: string;
};

const reviews: Review[] = [
  {
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    name: "Arjun S.",
    city: "Bengaluru",
    tag: "⏱️ No time",
    tagBg: "#fef3c7",
    tagColor: "#92400e",
    review:
      "I barely have time for lunch — 2 kids, a startup, back-to-back meetings. I thought 5 minutes could not do much. Did it between calls on Day 1. Something actually shifted. I am on Day 19 now.",
    color: "#fef9ec",
    border: "#f5d78e",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    name: "Preethi R.",
    city: "Chennai",
    tag: "😒 Tried everything",
    tagBg: "#dcfce7",
    tagColor: "#166534",
    review:
      "I have tried every app, every program — all failed within a week. This was different. WhatsApp showed up at 6 AM and I did the habit before I even fully woke up. No willpower. Just a message.",
    color: "#f0fdf4",
    border: "#86efac",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    name: "Divya M.",
    city: "Mumbai",
    tag: "🤔 Is this even real?",
    tagBg: "#ede9fe",
    tagColor: "#5b21b6",
    review:
      "Zero expectations from a free challenge. Assumed it would be generic advice I have heard a hundred times. Day 3 genuinely surprised me. Still using that habit every single day.",
    color: "#faf5ff",
    border: "#d8b4fe",
  },
];

export default function HeroTestimonials() {
  return (
    <section className="py-8 lg:py-10 bg-section-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <p className="text-center text-xs uppercase tracking-[0.2em] text-foreground-subtle font-semibold mb-6">
          What people said before they tried it — and after 👇
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="relative rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: r.color,
                border: `1.5px solid ${r.border}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Objection tag */}
              <div
                className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: r.tagBg, color: r.tagColor }}
              >
                {r.tag}
              </div>

              {/* Review */}
              <p className="text-base text-foreground leading-relaxed flex-1">
                &ldquo;{r.review}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-2.5 pt-3 border-t" style={{ borderColor: r.border }}>
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">{r.name}</p>
                  <p className="text-xs text-foreground-subtle mt-0.5">{r.city}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
