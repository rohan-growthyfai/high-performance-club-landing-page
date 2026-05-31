import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Tiny Habits Work — High Performance Club Blog",
  description: "Most people try to change too much at once. Science shows the opposite approach — starting absurdly small — is what actually sticks.",
};

export default function Post() {
  return (
    <BlogLayout
      emoji="🧠"
      category="Habit Science"
      readTime="5 min read"
      date="May 2026"
      title="Why Tiny Habits Work — And Why Big Goals Usually Don't"
      accent="#f97316"
      bg="#fff7ed"
    >
      <p>
        Every January, millions of people decide to transform their lives. They commit to waking up at 5 AM, hitting the gym, cutting sugar, meditating for 20 minutes, reading a book a week, and drinking three litres of water a day.
      </p>
      <p>
        By February, almost all of them have quit.
      </p>
      <p>
        This is not a willpower problem. This is a design problem.
      </p>

      <h2>The brain does not like big change</h2>
      <p>
        Your brain is fundamentally a prediction machine. It is wired to resist uncertainty and preserve energy. When you try to introduce a massive new behaviour — like waking up two hours earlier or exercising for an hour every day — your brain treats it as a threat. It activates resistance. It makes you feel tired, reluctant, and overwhelmed. This is not weakness. This is biology.
      </p>
      <p>
        But here is what most people do not know: the brain has a very different response to small changes. When a behaviour is small enough to feel easy, the brain does not resist it. It does not flag it as a threat. It just allows it.
      </p>
      <p>
        This is the core insight behind tiny habits — and it is backed by decades of research from Stanford University&apos;s Behavior Design Lab, led by Dr BJ Fogg.
      </p>

      <h2>The two-minute rule</h2>
      <p>
        Dr Fogg&apos;s research shows that the best predictor of a habit sticking is not motivation — it is ease. The easier a behaviour is to do, the more likely it is to become automatic. And once a behaviour becomes automatic, you can gradually expand it.
      </p>
      <p>
        James Clear, author of Atomic Habits, calls this the two-minute rule: every new habit should take less than two minutes to do. Not because two minutes is the goal — but because starting is the hardest part. Once you start, continuing is easy.
      </p>
      <p>
        The person who wants to run every day does not start by running five kilometres. They start by putting on their running shoes. The person who wants to meditate does not start with 20 minutes. They start with one breath.
      </p>

      <h2>Why tiny habits compound</h2>
      <p>
        The real power of tiny habits is not what they do in a day. It is what they do over time.
      </p>
      <p>
        A one percent improvement every day does not feel like much. But compounded over a year, a one percent daily improvement results in a 37x improvement. The maths are extraordinary — and they apply directly to habits.
      </p>
      <p>
        Every tiny habit you do consistently is building identity. Every time you drink water before coffee, you are reinforcing the identity of someone who takes care of their body. Every time you take three deep breaths before a stressful meeting, you are reinforcing the identity of someone who is calm under pressure. The habit is not just the behaviour — it is the vote you are casting for the person you are becoming.
      </p>

      <h2>The practical implication</h2>
      <p>
        If you want to change your life, do not start big. Start embarrassingly small. So small that you cannot say no. So small that skipping it feels more effortful than doing it.
      </p>
      <p>
        Drink one glass of water before your morning tea. That is it. Do not add anything else. Just that one thing, every day, until it feels automatic. Then add the next tiny thing.
      </p>
      <p>
        This is not a slow path to change. This is the fast path — because it is the only path that actually works.
      </p>

      <div className="callout">
        <p>
          <strong>Want to try this?</strong> The free 7-Day High Performance Lifestyle Challenge delivers one tiny, science-backed habit to your WhatsApp every morning. Each one takes under 5 minutes. No willpower required.
        </p>
        <Link href="/#signup">Join the free challenge →</Link>
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
        .callout { background: #fef9ec; border: 2px solid #f5d78e; border-radius: 16px; padding: 24px 28px; margin: 40px 0; }
        .callout p { margin-bottom: 12px; }
        .callout a { color: #b8853a; font-weight: 700; text-decoration: none; }
        .callout a:hover { text-decoration: underline; }
      `}</style>

      {/* Header */}
      <header style={{
        background: "rgba(250,248,243,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2dfd6", padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #b8853a, #8a6428)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#18181b", letterSpacing: "-0.01em" }}>High Performance Club</span>
        </Link>
        <Link href="/#signup" style={{ background: "linear-gradient(180deg, #b8853a 0%, #8a6428 100%)", color: "#fff", padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          Join Free →
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 100px" }}>
        {/* Back */}
        <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#9ca3af", textDecoration: "none", marginBottom: 40, fontWeight: 600 }}>
          ← All articles
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent, background: bg, padding: "4px 12px", borderRadius: 999 }}>{category}</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{readTime}</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>· {date}</span>
          </div>
          <div style={{ fontSize: 52, marginBottom: 20 }}>{emoji}</div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#18181b", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 0 }}>
            {title}
          </h1>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #e2dfd6, transparent)", marginBottom: 48 }} />

        {/* Content */}
        <article>{children}</article>
      </main>

      <footer style={{ borderTop: "1px solid #e2dfd6", background: "#f3f0e8", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          © 2026 High Performance Club · <Link href="/" style={{ color: "#b8853a", textDecoration: "none" }}>Back to home</Link> · <Link href="/blogs" style={{ color: "#b8853a", textDecoration: "none" }}>All articles</Link>
        </p>
      </footer>
    </div>
  );
}
