/* eslint-disable @next/next/no-img-element */
import { Star, BadgeCheck } from "lucide-react";

/**
 * ⚠️ PLACEHOLDER TESTIMONIALS
 * Names + reviews are written copy. Avatars use randomuser.me (real photos).
 * Attached "proof" images use Unsplash CDN.
 *
 * REPLACE these with real testimonials + photos once you have soft-launch data.
 * Each entry is clearly marked — search for "[PLACEHOLDER]" to find them.
 */

type Testimonial = {
  name: string;
  city: string;
  avatar: string;
  rating: number;
  text: string;
  attachedImage?: string;
  attachedCaption?: string;
  habit?: string;
  daysAgo: string;
  verified?: boolean;
};

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma", // [PLACEHOLDER]
    city: "Mumbai",
    avatar: "/avatars/ai/priya-sharma.png",
    rating: 5,
    text:
      "I assumed it'd be another generic self-help thing. By Day 3 my afternoons felt completely different. I cannot explain what changed — it just did. 🙌",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Karan Mehta", // [PLACEHOLDER]
    city: "Bengaluru",
    avatar: "/avatars/ai/karan-mehta.png",
    rating: 5,
    text:
      "Honestly joined for the certificate. Stayed because Day 5 broke me out of a 6-month productivity slump. I did not expect a 7-minute habit to change my entire workday.",
    daysAgo: "3 weeks ago",
    verified: true,
  },
  {
    name: "Vikram Iyer", // [PLACEHOLDER]
    city: "Pune",
    avatar: "/avatars/ai/vikram-iyer.png",
    rating: 5,
    text:
      "I've been doing one of the Day 7 habits every night for 3 weeks now. Sleeping deeper than I have in years. My wife thinks I'm a different person at breakfast. 😄",
    attachedImage:
      "/avatars/men/man-6.webp",
    attachedCaption: "Journal — Day 21 streak 📔",
    daysAgo: "1 month ago",
    verified: true,
  },
  {
    name: "Divya Menon", // [PLACEHOLDER]
    city: "Thiruvananthapuram",
    avatar: "/avatars/ai/divya-menon.png",
    rating: 5,
    text:
      "The Day 4 habit saved me during a fight with my sister. I literally stopped, used it, and was able to speak calmly in 30 seconds. My sister asked what changed. 😂",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Sneha Iyer", // [PLACEHOLDER]
    city: "Kolkata",
    avatar: "/avatars/ai/sneha-iyer.png",
    rating: 5,
    text:
      "I'm a mom of 2 with zero time for anything. This was the only challenge I've finished in years. 5 minutes while making dinner. And I still can't believe it actually worked.",
    attachedImage:
      "/avatars/men/man-7.jpg",
    attachedCaption: "Certificate next to the kids' drawings ❤️",
    daysAgo: "3 weeks ago",
    verified: true,
  },
  {
    name: "Devansh Khanna", // [PLACEHOLDER]
    city: "Chandigarh",
    avatar: "/avatars/ai/devansh-khanna.png",
    rating: 5,
    text:
      "By Day 3, my evenings felt calmer. By Day 7, my mom asked what changed. That was the moment I knew something was actually different.",
    daysAgo: "10 days ago",
    verified: true,
  },
  {
    name: "Nikhil Sharma", // [PLACEHOLDER]
    city: "Bhopal",
    avatar: "/avatars/ai/nikhil-sharma.png",
    rating: 5,
    text:
      "I tried Headspace, Calm, three productivity apps, and two fitness programs. None lasted. This is the first thing I have actually completed. Something about the WhatsApp format just works.",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Preeti Saxena", // [PLACEHOLDER]
    city: "Agra",
    avatar: "/avatars/ai/preeti-saxena.png",
    rating: 5,
    text:
      "I cried a little when the certificate arrived. I genuinely have not finished anything I started in the last two years. It felt different because the habits were so small. Tiny action. Real change.",
    attachedImage:
      "/avatars/men/man-1.jpg",
    attachedCaption: "My certificate — finally! 🏆",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Pooja Bansal", // [PLACEHOLDER]
    city: "Noida",
    avatar: "/avatars/ai/pooja-bansal.png",
    rating: 5,
    text:
      "Day 2 habit sounds too simple to work. It does not. I did it before a presentation and felt instantly more confident. Now my go-to before any important meeting.",
    daysAgo: "4 days ago",
    verified: true,
  },
  {
    name: "Rahul Joshi", // [PLACEHOLDER]
    city: "Indore",
    avatar: "/avatars/ai/rahul-joshi.png",
    rating: 5,
    text:
      "Got more done in 7 minutes on Day 5 than I usually do in an hour. I literally sat there thinking — how is this possible? Completely sold. 🎯",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Saurabh Joshi", // [PLACEHOLDER]
    city: "Jaipur",
    avatar: "/avatars/ai/saurabh-joshi.png",
    rating: 5,
    text:
      "I was skeptical. The Day 4 habit took 30 seconds. I used it before a tough team review and stayed completely calm throughout. I do not know what that habit is scientifically — I just know it works.",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Varun Malhotra", // [PLACEHOLDER]
    city: "Ludhiana",
    avatar: "/avatars/ai/varun-malhotra.png",
    rating: 5,
    text:
      "I have sent this to 7 people. My wife, my brother, two colleagues, three friends. Everyone came back and thanked me. The most useful free thing I have found in years.",
    daysAgo: "5 days ago",
    verified: true,
  },
  {
    name: "Kavya Nair", // [PLACEHOLDER]
    city: "Kochi",
    avatar: "/avatars/ai/kavya-nair.png",
    rating: 5,
    text:
      "We are doing it as a family now — comparing notes on WhatsApp every evening. The check-in messages made it feel like a game, not a chore.",
    attachedImage:
      "/avatars/men/man-5.avif",
    attachedCaption: "Got the whole family in! 👨‍👩‍👧",
    daysAgo: "6 days ago",
    verified: true,
  },
  {
    name: "Ruchika Jain", // [PLACEHOLDER]
    city: "Jodhpur",
    avatar: "/avatars/ai/ruchika-jain.png",
    rating: 5,
    text:
      "I am a school teacher. Thought this was for corporate people. Every single habit worked for me too. The Day 3 habit especially — I teach 6 hours in front of a board and the difference was immediate.",
    daysAgo: "3 weeks ago",
    verified: true,
  },
  {
    name: "Manish Dubey", // [PLACEHOLDER]
    city: "Varanasi",
    avatar: "/avatars/ai/manish-dubey.png",
    rating: 5,
    text:
      "I run a small business. Zero time for anything. Under 5 minutes every day. Finished all 7 days without missing one. First time I have ever done that with anything.",
    daysAgo: "6 days ago",
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 relative bg-section-white">
      {/* Floating emojis */}
      <span className="emoji-deco float-1 top-20 right-12 text-4xl hidden lg:block" aria-hidden="true">💛</span>
      <span className="emoji-deco float-2 bottom-32 left-12 text-4xl hidden lg:block" aria-hidden="true">⭐</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Wall of love 💛
          </p>
          <h2 className="font-serif text-section-title text-balance text-foreground mb-6">
            What happened when
            <br />
            <span className="italic font-light gradient-text">they actually tried it.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
          </p>

        </div>

        {/* Masonry-style wall */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Join these people. Your transformation story starts today.</p>
          <a href="#signup" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5">
            Yes, I Want to Be Next
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="premium-card rounded-2xl p-6 break-inside-avoid hover-glow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-border-subtle"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-foreground text-base truncate">
              {t.name}
            </p>
            {t.verified && (
              <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-foreground-subtle">
            {t.city} · {t.daysAgo}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Review text */}
      <p className="text-foreground text-sm sm:text-lg leading-[1.55] mb-4">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Habit tag removed — keeps habits a mystery until signup */}

      {/* Attached "proof" image */}
      {t.attachedImage && (
        <div className="mt-3 rounded-xl overflow-hidden border border-border-subtle">
          <img
            src={t.attachedImage}
            alt={t.attachedCaption || "Attached image"}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {t.attachedCaption && (
            <p className="text-sm text-foreground-muted bg-background-elevated/60 px-4 py-2 italic">
              📷 {t.attachedCaption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
