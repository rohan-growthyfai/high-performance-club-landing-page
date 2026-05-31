import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3 Morning Habits That Change How Your Day Feels — High Performance Club",
  description: "You do not need an hour-long morning routine. These three habits set the tone for energy, focus, and calmness for the rest of the day.",
};

export default function Post() {
  return (
    <BlogLayout
      emoji="🌅"
      category="Morning Routine"
      readTime="5 min read"
      date="May 2026"
      title="3 Morning Habits That Change How Your Entire Day Feels"
      accent="#b8853a"
      bg="#fef9ec"
    >
      <p>
        There is a version of morning routine advice that involves waking up at 5 AM, journaling for 20 minutes, cold showers, meditation, exercise, and a green smoothie — all before 7 AM.
      </p>
      <p>
        This advice works for exactly the kind of person who was already disciplined enough not to need it.
      </p>
      <p>
        For everyone else — the people with early meetings, young children, long commutes, or simply the desire to sleep until a reasonable hour — this version of the morning routine is not just impractical. It is actively discouraging, because it makes people feel like they are already failing before their day has started.
      </p>
      <p>
        Here is the alternative: three habits, each under five minutes, that have a measurable impact on how your entire day feels. No 5 AM alarm required.
      </p>

      <h2>Habit 1: Morning sunlight (5 minutes)</h2>
      <p>
        Within 30 minutes of waking up, step outside — or sit near a bright window — and let natural light reach your eyes. No sunglasses. Five minutes is enough on a bright day; ten minutes works better on an overcast one.
      </p>
      <p>
        This is not about vitamin D. It is about your circadian clock.
      </p>
      <p>
        Your circadian rhythm — the internal system that regulates sleep, energy, mood, and metabolism — is primarily set by light. Morning light triggers a surge of cortisol (the alerting hormone) that sets the tempo for your entire day. Get it in the first 30 minutes, and your energy peaks earlier, your afternoon slump is smaller, and you fall asleep more easily at night.
      </p>
      <p>
        Miss it, and your clock runs late. You feel groggy longer in the morning, wired later at night, and your 3 PM slump is more severe.
      </p>
      <p>
        Dr Andrew Huberman at Stanford has made this one of his most consistent public health recommendations — and the evidence behind it is robust. Five minutes of morning light is one of the highest-leverage health behaviours available to anyone with a balcony or a door.
      </p>

      <h2>Habit 2: The 90-minute caffeine delay</h2>
      <p>
        Most people reach for tea or coffee within minutes of waking up. This feels logical — caffeine gives you energy, and you want energy in the morning. But the timing is working against you.
      </p>
      <p>
        Here is what is actually happening: when you wake up, your body is still clearing a chemical called adenosine — the molecule that accumulates during waking hours and makes you sleepy. If you add caffeine immediately, you block the adenosine receptors before the adenosine has been cleared. The caffeine masks the sluggishness rather than resolving it.
      </p>
      <p>
        The result is a temporary energy boost followed by a bigger crash — usually around 2 or 3 PM — as the adenosine that was masked floods back in.
      </p>
      <p>
        Waiting 90 minutes allows your body to clear the adenosine naturally. Then, when you add caffeine, it is amplifying genuine alertness rather than masking residual sleepiness. The effect is stronger, more sustained, and does not result in the same afternoon crash.
      </p>
      <p>
        You do not have to go cold turkey. Just push your first cup 90 minutes after waking. Drink water and get your morning light in that window instead.
      </p>

      <h2>Habit 3: One priority, written down (2 minutes)</h2>
      <p>
        Before you open your email, before you check Slack, before you look at your phone — write down the one thing that would make today a good day if you completed it. Just one thing. On paper or in a notes app. The physical or digital act of writing is what makes it stick.
      </p>
      <p>
        This habit sounds deceptively simple because it is. But the impact is significant, for one reason: most people never consciously decide what their day is for. They react to whatever arrives in their inbox and feel busy without feeling productive.
      </p>
      <p>
        Identifying your one priority takes two minutes and functions like a compass. Every time you feel lost or pulled in multiple directions, you have a clear answer to &ldquo;what should I be doing right now?&rdquo;
      </p>
      <p>
        It also changes the psychology of the day. When you complete your one priority — even if nothing else goes well — you end the day with a sense of accomplishment rather than a vague sense of having been busy.
      </p>

      <h2>The real point</h2>
      <p>
        None of these habits require significant time or willpower. They do not require waking up earlier. They do not require equipment or subscriptions or special conditions.
      </p>
      <p>
        They require only the decision to do them — and then the simple act of doing them, consistently, until they become the background music of your morning rather than a conscious effort.
      </p>
      <p>
        Start with one. Just one. The one that feels most feasible given where you are right now. Do it every day for seven days. Notice what changes. Then add the next one.
      </p>

      <div className="callout">
        <p>
          <strong>These are exactly the kinds of habits we deliver in the 7-Day High Performance Lifestyle Challenge.</strong> One tiny, science-backed habit every morning on WhatsApp. Free. No app required.
        </p>
        <Link href="/#signup">Join the free challenge →</Link>
      </div>
    </BlogLayout>
  );
}

function BlogLayout({ children, emoji, category, readTime, date, title, accent, bg }: {
  children: React.ReactNode; emoji: string; category: string; readTime: string; date: string; title: string; accent: string; bg: string;
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
        .callout { background: #fef9ec; border: 2px solid #f5d78e; border-radius: 16px; padding: 24px 28px; margin: 40px 0; }
        .callout p { margin-bottom: 12px; }
        .callout a { color: #b8853a; font-weight: 700; text-decoration: none; }
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
