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
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text:
      "I assumed it'd be another generic self-help thing. By Day 3 my afternoons felt completely different. The 90-min coffee tip alone was worth signing up for. 🙌",
    attachedImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    attachedCaption: "My morning chai now happens AFTER 90 mins ☕",
    habit: "Day 1: Phone Parking",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Karan Mehta", // [PLACEHOLDER]
    city: "Bengaluru",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text:
      "Honestly joined for the certificate (free + an actual prize?). Stayed because Day 5 broke me out of a 6-month productivity slump. Working on one tab at a time has changed my entire workday.",
    habit: "Day 5: One-Tab Start",
    daysAgo: "3 weeks ago",
    verified: true,
  },
  {
    name: "Anjali Reddy", // [PLACEHOLDER]
    city: "Hyderabad",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text:
      "Did all 7 days. Phone Parking changed how I work. My team noticed I was more focused in meetings. Got my certificate framed on my desk now. 🏆",
    attachedImage:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop",
    attachedCaption: "Certificate on my desk!",
    habit: "Day 1: Phone Parking",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Vikram Iyer", // [PLACEHOLDER]
    city: "Pune",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 5,
    text:
      "The brain dump habit on Day 7 — I've been doing it every night for 3 weeks now. Sleeping deeper than I have in years. My wife thinks I'm a different person at breakfast 😄",
    attachedImage:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop",
    attachedCaption: "Brain dump journal — Day 21 streak 📔",
    habit: "Day 7: Brain Dump",
    daysAgo: "1 month ago",
    verified: true,
  },
  {
    name: "Neha Kapoor", // [PLACEHOLDER]
    city: "Delhi",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    text:
      "Light, fun, doable. Felt like a friend texting me, not a coach lecturing. The 'High five 🙌' messages made me actually smile.",
    daysAgo: "5 days ago",
    verified: true,
  },
  {
    name: "Rohit Patel", // [PLACEHOLDER]
    city: "Ahmedabad",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 5,
    text:
      "Joined Sunday night. Felt the shift by Wednesday. Closed Instagram on Day 5 and just… breathed. The Eye Vacation habit became my hourly ritual.",
    habit: "Day 3: Eye Vacation",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Meera Krishnan", // [PLACEHOLDER]
    city: "Chennai",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5,
    text:
      "Eye Vacation sounds silly. It's not. I do it every hour now. Way less headaches. Wish my office gave us this instead of another wellness webinar 😅",
    attachedImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
    attachedCaption: "20-20-20 view from my office window",
    habit: "Day 3: Eye Vacation",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Aditya Singh", // [PLACEHOLDER]
    city: "Gurgaon",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text:
      "Best ₹0 I've ever spent. The posture switch on Day 2 actually works — felt like a different person in a client meeting. 🙏",
    habit: "Day 2: Posture Switch",
    daysAgo: "4 days ago",
    verified: true,
  },
  {
    name: "Sneha Iyer", // [PLACEHOLDER]
    city: "Kolkata",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 5,
    text:
      "I'm a mom of 2 — zero time for anything. This was perfect. 5-minute habits while making dinner. Honestly the only challenge I've finished in years.",
    attachedImage:
      "https://images.unsplash.com/photo-1607000975492-3c8689e4a7ec?w=600&h=400&fit=crop",
    attachedCaption: "Hung my certificate next to the kids' drawings ❤️",
    daysAgo: "3 weeks ago",
    verified: true,
  },
  {
    name: "Saurabh Joshi", // [PLACEHOLDER]
    city: "Jaipur",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 5,
    text:
      "Skeptical at first. The Day 4 breathing thing actually works — used it before a tough team review and stayed calm the whole time. Wild.",
    habit: "Day 4: The Double Breath",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Kavya Nair", // [PLACEHOLDER]
    city: "Kochi",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    rating: 5,
    text:
      "Sent this to my husband and sister. We're all doing it together now — comparing notes on WhatsApp. The 'High five 🙌' messages are addictive.",
    attachedImage:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop",
    attachedCaption: "Got the whole family in! 👨‍👩‍👧",
    daysAgo: "6 days ago",
    verified: true,
  },
  {
    name: "Arjun Verma", // [PLACEHOLDER]
    city: "Lucknow",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    rating: 5,
    text:
      "The Brain Dump is genuinely the best sleep hack I've ever tried. I was the 'I'll just remember it' guy. Now I sleep like a baby. Wife noticed first.",
    habit: "Day 7: Brain Dump",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Ishita Bose", // [PLACEHOLDER]
    city: "Bengaluru",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 5,
    text:
      "Marketing job, 60+ hour weeks. This was the only thing I actually finished in 2026 so far. Says a lot about how easy it is to stick with.",
    attachedImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    attachedCaption: "My workspace after Day 5 ✨",
    daysAgo: "3 days ago",
    verified: true,
  },
  {
    name: "Rahul Joshi", // [PLACEHOLDER]
    city: "Indore",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    text:
      "Tried the One-Tab Start on a busy Monday morning. Got more done in 7 minutes than I usually do in an hour. Sold for life. 🎯",
    habit: "Day 5: One-Tab Start",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Tanvi Desai", // [PLACEHOLDER]
    city: "Surat",
    avatar: "https://randomuser.me/api/portraits/women/91.jpg",
    rating: 5,
    text:
      "I've started so many things and quit. This one felt like a friend texting, not a coach lecturing. Finished all 7 days for the first time ever. 🥹",
    attachedImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
    attachedCaption: "My Day 7 brain dump page 📔",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Devansh Khanna", // [PLACEHOLDER]
    city: "Chandigarh",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    rating: 5,
    text:
      "Subscribed without expecting much. By Day 3, my evenings felt calmer. By Day 7, my mom asked what changed. That was the moment I knew.",
    daysAgo: "10 days ago",
    verified: true,
  },
  {
    name: "Pooja Bansal", // [PLACEHOLDER]
    city: "Noida",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 5,
    text:
      "Posture Switch on Day 2 sounds silly. It's not. Did it before a presentation — felt instantly more confident. Now my go-to before any meeting.",
    habit: "Day 2: Posture Switch",
    daysAgo: "4 days ago",
    verified: true,
  },
  {
    name: "Ritesh Gupta", // [PLACEHOLDER]
    city: "Nagpur",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    rating: 5,
    text:
      "I was very sceptical at first. But the first habit itself — just putting my phone in another room — changed my entire work morning. Did more in 40 minutes than I do in 3 hours normally.",
    habit: "Day 1: Phone Parking",
    daysAgo: "5 days ago",
    verified: true,
  },
  {
    name: "Simran Kaur", // [PLACEHOLDER]
    city: "Amritsar",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    rating: 5,
    text:
      "Honestly just joined for the certificate to show my husband I finished something for once. Ended up actually loving it. The Brain Dump habit is something I now do every single night.",
    attachedImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
    attachedCaption: "My brain dump journal — 3 weeks strong 📓",
    habit: "Day 7: Brain Dump",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Nikhil Sharma", // [PLACEHOLDER]
    city: "Bhopal",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    text:
      "I have tried Headspace, Calm, three productivity apps, and two fitness programs. None lasted. This is the first thing I've actually completed. The WhatsApp format is a big reason — it meets me where I already am.",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Divya Menon", // [PLACEHOLDER]
    city: "Thiruvananthapuram",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    rating: 5,
    text:
      "The breathing habit on Day 4 saved me during a fight with my sister. I literally stopped, did three breaths, and was able to speak calmly. My sister noticed. Asked me what changed. 😂",
    habit: "Day 4: The Double Breath",
    daysAgo: "1 week ago",
    verified: true,
  },
  {
    name: "Abhishek Tiwari", // [PLACEHOLDER]
    city: "Kanpur",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    rating: 5,
    text:
      "Day 5 hit different. I had been telling myself I'd do deep work for months. 7 minutes with one tab open and I finally believed I could. Small habits, big results — not just a saying.",
    attachedImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    attachedCaption: "My clean desk after Day 5 ✨",
    habit: "Day 5: One-Tab Start",
    daysAgo: "9 days ago",
    verified: true,
  },
  {
    name: "Ruchika Jain", // [PLACEHOLDER]
    city: "Jodhpur",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    rating: 5,
    text:
      "A school teacher here. Thought this was for corporate people. But every habit worked beautifully for me too. The Eye Vacation habit especially — I teach 6 hours a day and the screen fatigue was real.",
    habit: "Day 3: Eye Vacation",
    daysAgo: "3 weeks ago",
    verified: true,
  },
  {
    name: "Varun Malhotra", // [PLACEHOLDER]
    city: "Ludhiana",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    rating: 5,
    text:
      "I've sent this to 7 people. My wife, my brother, two colleagues, and three friends. Everyone I've sent it to has thanked me after completing it. This is genuinely one of the most useful free things I've found.",
    daysAgo: "5 days ago",
    verified: true,
  },
  {
    name: "Preeti Saxena", // [PLACEHOLDER]
    city: "Agra",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    rating: 5,
    text:
      "I cried a little when the certificate arrived. That sounds dramatic but I genuinely haven't finished anything I started in the last two years. This felt different because it was so small. Tiny habits, real change.",
    attachedImage:
      "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&h=400&fit=crop",
    attachedCaption: "My certificate — finally! 🏆",
    daysAgo: "2 weeks ago",
    verified: true,
  },
  {
    name: "Manish Dubey", // [PLACEHOLDER]
    city: "Varanasi",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 5,
    text:
      "I run a small business and have zero time. These habits were made for someone like me. Under 10 minutes every day. Real results. Finished all 7 days without missing one. First time ever.",
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
            People who tried it.
            <br />
            <span className="italic font-light gradient-text">In their own words.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
          </p>

          {/* Aggregate trust */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base text-foreground-muted">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="font-bold text-foreground">4.9</span>
              <span>average rating</span>
            </div>
          </div>
        </div>

        {/* Masonry-style wall */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
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
      <p className="text-foreground text-lg leading-[1.55] mb-4">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Habit tag */}
      {t.habit && (
        <p className="inline-block text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
          {t.habit}
        </p>
      )}

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
