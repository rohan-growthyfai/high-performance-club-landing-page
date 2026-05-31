import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5-Minute Habits That Work for Busy People — High Performance Club",
  description: "If you have 5 minutes between meetings, you have enough time to build a life-changing habit.",
};

export default function Post() {
  return (
    <BlogLayout
      emoji="⚡"
      category="Productivity"
      readTime="6 min read"
      date="May 2026"
      title="5-Minute Habits That Actually Work for Busy People"
      accent="#10b981"
      bg="#ecfdf5"
    >
      <p>
        The most common reason people give for not building better habits is time. &ldquo;I am too busy.&rdquo; &ldquo;My schedule is packed.&rdquo; &ldquo;I barely have time for lunch.&rdquo;
      </p>
      <p>
        These are real constraints. But they are also based on a false assumption — that building a meaningful habit requires a meaningful amount of time.
      </p>
      <p>
        It does not.
      </p>

      <h2>The 5-minute window is enough</h2>
      <p>
        Research from BJ Fogg at Stanford consistently shows that the duration of a habit matters far less than its consistency. A five-second habit done every single day for a year produces more lasting change than a two-hour habit done occasionally. The brain does not care how long you spend. It cares how regularly you show up.
      </p>
      <p>
        This is genuinely good news for busy people. You do not need to block out time. You need to find the five-minute windows that already exist in your day — between calls, before lunch, after you sit down at your desk — and attach tiny habits to them.
      </p>

      <h2>5 habits that return the most value per minute</h2>

      <h3>1. The Double Breath (30 seconds)</h3>
      <p>
        Before any stressful moment — a tough email, a difficult call, an important meeting — take three double breaths. Inhale through your nose, take a second short inhale to top up your lungs, then exhale slowly through your mouth. This technique, called the physiological sigh, drops your heart rate faster than any meditation technique. It takes 30 seconds and works every single time.
      </p>

      <h3>2. Phone Parking (10 minutes)</h3>
      <p>
        Put your phone in another room for the first 10 minutes of focused work. Just 10 minutes. Your phone distracts you even when you are not touching it — the mere presence of a smartphone on your desk reduces cognitive capacity by up to 20%, according to a University of Texas study. Removing it costs nothing and returns your full brain to the task at hand.
      </p>

      <h3>3. One-Tab Focus (7 minutes)</h3>
      <p>
        Close every browser tab. Open exactly one. Work on exactly one thing for seven minutes. No switching, no checking, no second tab. Seven minutes of real single-tasking produces more output than 30 minutes of multitasking. This is not an opinion — it is what context-switching research consistently shows.
      </p>

      <h3>4. Eye Vacation (20 seconds, every hour)</h3>
      <p>
        Look away from your screen and fix your gaze on something at least 20 feet away. Hold for 20 seconds. This resets your eye muscles, reduces strain, and prevents the 3 PM headache that plagues desk workers worldwide. Set a recurring alarm on your phone. It takes no time because you are not stopping work — you are just looking in a different direction.
      </p>

      <h3>5. The Name the Noise Habit (1 minute)</h3>
      <p>
        Once a day, when you feel stressed, scattered, or off — write one sentence: &ldquo;I feel _____ because _____.&rdquo; Do not analyse it. Do not fix it. Just name it. Neuroimaging research from UCLA shows that labelling a negative emotion reduces its intensity by engaging the prefrontal cortex. One sentence. One minute. Measurable mental clarity.
      </p>

      <h2>The real secret: anchor to existing moments</h2>
      <p>
        The reason most people fail at new habits is not that they forget. It is that they are trying to add a new behaviour at a random time. The brain is not designed to remember random cues — it is designed to follow patterns.
      </p>
      <p>
        Attach every new habit to something you already do. After I make tea → one double breath. When I sit at my desk → phone goes in the drawer. After lunch → close all tabs, open one. This is called habit stacking, and it is the most reliable way to make a new behaviour automatic without relying on memory or motivation.
      </p>

      <div className="callout">
        <p>
          <strong>Try these habits for free.</strong> The 7-Day High Performance Lifestyle Challenge delivers one of these habits to your WhatsApp every morning. You just do it and reply ✅. No apps. No complicated tracking. Just a message and a habit.
        </p>
        <Link href="/#signup">Join free — takes 30 seconds →</Link>
      </div>
    </BlogLayout>
  );
}

function BlogLayout({ children, emoji, category, readTime, date, title, accent, bg }: {
  children: React.ReactNode;
  emoji: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  accent: string;
  bg: string;
}) {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      <style>{`
        article p { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 20px; }
        article h2 { font-size: 22px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin: 40px 0 16px; line-height: 1.3; }
        article h3 { font-size: 18px; font-weight: 700; color: #18181b; margin: 28px 0 12px; }
        article strong { color: #18181b; font-weight: 700; }
        article ul, article ol { padding-left: 24px; margin-bottom: 20px; }
        article li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 8px; }
        .callout { background: #f0fdf4; border: 2px solid #86efac; border-radius: 16px; padding: 24px 28px; margin: 40px 0; }
        .callout p { margin-bottom: 12px; }
        .callout a { color: #059669; font-weight: 700; text-decoration: none; }
        .callout a:hover { text-decoration: underline; }
      `}</style>
      <header style={{ background: "rgba(250,248,243,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2dfd6", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #b8853a, #8a6428)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.01em" }}>High Performance Club</span>
        </Link>
        <Link href="/#signup" style={{ background: "linear-gradient(180deg, #b8853a 0%, #8a6428 100%)", color: "#fff", padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Join Free →</Link>
      </header>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 100px" }}>
        <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#9ca3af", textDecoration: "none", marginBottom: 40, fontWeight: 600 }}>← All articles</Link>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent, background: bg, padding: "4px 12px", borderRadius: 999 }}>{category}</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{readTime}</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>· {date}</span>
          </div>
          <div style={{ fontSize: 52, marginBottom: 20 }}>{emoji}</div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#18181b", letterSpacing: "-0.03em", lineHeight: 1.15 }}>{title}</h1>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #e2dfd6, transparent)", marginBottom: 48 }} />
        <article>{children}</article>
      </main>
      <footer style={{ borderTop: "1px solid #e2dfd6", background: "#f3f0e8", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 High Performance Club · <Link href="/" style={{ color: "#b8853a", textDecoration: "none" }}>Back to home</Link> · <Link href="/blogs" style={{ color: "#b8853a", textDecoration: "none" }}>All articles</Link></p>
      </footer>
    </div>
  );
}
