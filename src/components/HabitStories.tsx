/* eslint-disable @next/next/no-img-element */
import { ArrowRight, Quote } from "lucide-react";

/**
 * ⚠️ PLACEHOLDER STORIES
 * Names + quotes are written copy. Avatars use randomuser.me (real photos, swap for actual member photos when available).
 * Each entry marked [PLACEHOLDER] — easy to find and replace.
 */

type Story = {
  habit: string;
  emoji: string;
  person: {
    name: string;
    age: number;
    city: string;
    photo: string;
  };
  before: string;
  after: string;
  quote: string;
};

const stories: Story[] = [
  {
    habit: "Day 1: Phone Parking",
    emoji: "📵",
    person: {
      name: "Priya", // [PLACEHOLDER]
      age: 28,
      city: "Mumbai",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    before: "Touched phone 87 times/day 📱",
    after: "Down to 23 by Day 7 ✨",
    quote: "I had no idea how often I was reaching for it.",
  },
  {
    habit: "Day 2: Posture Switch",
    emoji: "🧍",
    person: {
      name: "Karan", // [PLACEHOLDER]
      age: 35,
      city: "Bengaluru",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    before: "Energy crashed by 2 PM daily 😴",
    after: "Held energy till 6 PM, every day 💪",
    quote: "60 seconds. Changed how my meetings felt.",
  },
  {
    habit: "Day 3: Eye Vacation",
    emoji: "👀",
    person: {
      name: "Neha", // [PLACEHOLDER]
      age: 24,
      city: "Delhi",
      photo: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    before: "4 headaches/week from screen time 🤕",
    after: "0 headaches by Day 5 ☀️",
    quote: "I do it every hour now. Eyes thank me.",
  },
  {
    habit: "Day 4: The Double Breath",
    emoji: "🫁",
    person: {
      name: "Vikram", // [PLACEHOLDER]
      age: 41,
      city: "Hyderabad",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    before: "Heart rate 92 bpm before client calls 😰",
    after: "Drops to 68 bpm in 30 seconds 🧘",
    quote: "I use this before every difficult email now.",
  },
  {
    habit: "Day 5: One-Tab Start",
    emoji: "🎯",
    person: {
      name: "Anjali", // [PLACEHOLDER]
      age: 32,
      city: "Pune",
      photo: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    before: "47 tabs open · brain in 12 places 🥵",
    after: "1 tab · 7 min · 1 task done ✅",
    quote: "I finished more in 7 mins than my whole morning.",
  },
  {
    habit: "Day 6: Name the Noise",
    emoji: "🧠",
    person: {
      name: "Rohit", // [PLACEHOLDER]
      age: 29,
      city: "Gurgaon",
      photo: "https://randomuser.me/api/portraits/men/60.jpg",
    },
    before: "Vague anxiety from 9 AM to 11 PM 😶‍🌫️",
    after: "Cut to 1 specific thing in 60 seconds 💡",
    quote: "Mental chaos becomes one clear line. Magic.",
  },
  {
    habit: "Day 7: Brain Dump",
    emoji: "🗒️",
    person: {
      name: "Meera", // [PLACEHOLDER]
      age: 36,
      city: "Chennai",
      photo: "https://randomuser.me/api/portraits/women/40.jpg",
    },
    before: "Took 42 min to fall asleep 🌃",
    after: "Down to 11 min by Day 4 😴",
    quote: "I've kept this habit going for 3 weeks now.",
  },
];

export default function HabitStories() {
  return (
    <section className="py-24 lg:py-32 relative bg-section-white">
      {/* Floating emojis */}
      <span className="emoji-deco float-1 top-20 right-10 text-4xl hidden lg:block" aria-hidden="true">📸</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Real members · Real results 📸
          </p>
          <h2 className="font-serif text-section-title text-balance text-foreground mb-6">
            Before <span className="text-accent">→</span> After Changes
          </h2>
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
            Significant shifts people experienced.
            <br />
            <span className="text-lg text-foreground-subtle">Each card: before → after.</span>
          </p>
        </div>

        {/* Grid of stories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((s, i) => (
            <StoryCard key={s.habit} story={s} index={i} />
          ))}

          {/* CTA tile filling the empty slot */}
          <div className="rounded-2xl p-7 flex flex-col justify-between bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-2 border-dashed border-accent/40 hover-glow">
            <div>
              <p className="text-base uppercase tracking-[0.15em] text-accent mb-4 font-bold">
                🎬 Your story next?
              </p>
              <h3 className="font-serif text-2xl text-foreground mb-3 leading-tight font-medium">
                Join. Try all 7 high performance habits. See what shifts for you.
              </h3>
              <p className="text-foreground-muted text-base leading-relaxed">
                Free. 7 days. Your before/after.
              </p>
            </div>
            <a
              href="#signup"
              className="mt-5 btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl self-start"
            >
              Start now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story: s, index }: { story: Story; index: number }) {
  const tilt = "";
  return (
    <div className={`premium-card rounded-2xl p-6 hover-glow flex flex-col ${tilt}`}>
      {/* Person */}
      <div className="flex items-center gap-3 mb-5">
        <img
          src={s.person.photo}
          alt={s.person.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-accent/30"
          loading="lazy"
        />
        <div>
          <p className="font-bold text-foreground text-lg leading-tight">
            {s.person.name}
          </p>
          <p className="text-sm text-foreground-subtle">
            {s.person.age} · {s.person.city}
          </p>
        </div>
        <span className="ml-auto text-4xl" aria-hidden="true">
          {s.emoji}
        </span>
      </div>

      {/* Habit tag */}
      <p className="inline-block self-start text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-5">
        {s.habit}
      </p>

      {/* Before / After — bold red→green color coding */}
      <div className="space-y-3 mb-5">
        <div className="bg-red-50/60 border-l-4 border-red-300 rounded-r-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-before text-[10px] uppercase px-2 py-0.5 rounded">
              Before
            </span>
          </div>
          <p className="text-base text-pain font-semibold leading-snug">
            {s.before}
          </p>
        </div>
        <div className="flex items-center justify-center text-accent">
          <ArrowRight className="w-6 h-6 rotate-90" />
        </div>
        <div className="bg-green-50/60 border-l-4 border-green-400 rounded-r-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-after text-[10px] uppercase px-2 py-0.5 rounded">
              After
            </span>
          </div>
          <p className="text-base text-success font-bold leading-snug">
            {s.after}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-auto pt-4 border-t border-border-subtle relative">
        <Quote className="absolute -top-2 left-0 w-4 h-4 text-accent/40" />
        <p className="text-base italic text-foreground-muted leading-snug pl-5">
          {s.quote}
        </p>
      </div>
    </div>
  );
}
