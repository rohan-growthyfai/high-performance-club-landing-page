/* eslint-disable @next/next/no-img-element */
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    avatar: "/avatars/ai/priya-sharma.png",
    text: "I've tried habit apps before and always quit within a week. Daily Upgrade Club is different — the WhatsApp message arrives and I just do it. No friction at all.",
    daysAgo: "3 days ago",
    habit: "Energy Reset — Week 2",
  },
  {
    name: "Karan Mehta",
    city: "Bengaluru",
    avatar: "/avatars/ai/karan-mehta.png",
    text: "The weekly scorecard is what keeps me hooked. Seeing 6/7 habits completed feels so satisfying. I've never been this consistent with anything in my life.",
    daysAgo: "1 week ago",
    habit: "Focus Reset — Day 18",
  },
  {
    name: "Anjali Desai",
    city: "Pune",
    avatar: "/avatars/women/woman-3.avif",
    text: "₹99 is genuinely the best money I've spent. The habits are tiny but the cumulative effect after 30 days is real. My energy levels are noticeably better.",
    daysAgo: "2 weeks ago",
    habit: "Health Reset — completed",
  },
  {
    name: "Vikram Iyer",
    city: "Hyderabad",
    avatar: "/avatars/ai/vikram-iyer.png",
    text: "The accountability group is surprisingly active. Everyone just shares their DONE streak and moves on. No spam, no noise. Just momentum.",
    daysAgo: "1 week ago",
    habit: "Discipline Reset — Day 12",
  },
  {
    name: "Sneha Kulkarni",
    city: "Chennai",
    avatar: "/avatars/women/woman-1.jpg",
    text: "I was skeptical about a WhatsApp subscription but it works exactly because it's on WhatsApp. I open it every morning without thinking about it.",
    daysAgo: "5 days ago",
    habit: "Calmness Reset — Week 3",
  },
  {
    name: "Rohit Patil",
    city: "Ahmedabad",
    avatar: "/avatars/men/man-1.jpg",
    text: "The monthly PDF guide alone is worth it. I now have 3 months of habits saved and I revisit them. It's building a personal library of what works for me.",
    daysAgo: "3 weeks ago",
    habit: "Sleep Reset — completed",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function DUCTestimonials() {
  return (
    <section className="py-20 lg:py-28 bg-section-cream border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1da851] mb-3">Members love it</p>
          <h2 className="font-display text-section-title text-foreground text-balance">
            What members are saying
          </h2>
          <p className="text-foreground-muted text-lg mt-3 max-w-xl mx-auto">Real members. Real habits. Real consistency.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-border-subtle rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
              {/* Stars */}
              <Stars n={5} />

              {/* Quote */}
              <p className="text-foreground-muted text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              {/* Habit tag */}
              {t.habit && (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1da851] bg-green-50 border border-green-100 rounded-full px-3 py-1 w-fit">
                  ✅ {t.habit}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-foreground text-sm leading-none">{t.name}</p>
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  </div>
                  <p className="text-foreground-subtle text-xs mt-0.5">{t.city} · {t.daysAgo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#duc-join" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #1da851, #16a341)", boxShadow: "0 4px 20px rgba(29,168,81,0.3)" }}>
            Join Daily Upgrade Club →
          </a>
        </div>

      </div>
    </section>
  );
}
