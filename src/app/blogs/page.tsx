"use client";
// SEO metadata in layout.tsx
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = ["All", "Health Habits", "Productivity Habits", "Focus Habits", "Relationships", "Habit Science"];

const CATEGORY_META = {
  "All": { color: "#b8853a", bg: "#fef9ec" },
  "Health Habits": { color: "#10b981", bg: "#ecfdf5" },
  "Productivity Habits": { color: "#f97316", bg: "#fff7ed" },
  "Focus Habits": { color: "#6366f1", bg: "#eef2ff" },
  "Relationships": { color: "#f59e0b", bg: "#fffbeb" },
  "Habit Science": { color: "#8b5cf6", bg: "#f5f3ff" },
};

const posts = [
  { slug:"habit-stacking-technique-productivity-india", title:"Habit Stacking: The Technique Busy Indians Are Using to Build 5 Habits at Once", excerpt:"Discover practical, science-backed habits for habit stacking technique productivity india. Built for busy Indians who want real results without complicated routines.", category:"Habit Science", readTime:"6 min read", date:"June 2026", emoji:"🔗", accent:"#10b981", image:"/blog-images/habit-stacking-technique-productivity-india.png", featured:false },
  { slug:"evening-routine-habits-better-sleep-recovery", title:"Evening Routine Habits for Better Sleep, Faster Recovery, and Calmer Nights", excerpt:"Discover practical, science-backed habits for evening routine habits for better sleep and recovery. Built for busy Indians who want real results without complicated routines.", category:"Health Habits", readTime:"6 min read", date:"June 2026", emoji:"🌙", accent:"#6366f1", image:"/blog-images/evening-routine-habits-better-sleep-recovery.png", featured:false },
  { slug:"phone-addiction-digital-detox-habits-2026", title:"Phone Addiction in 2026: The Digital Detox Habits That Actually Break the Cycle", excerpt:"Discover practical, science-backed habits for phone addiction digital detox habits 2026. Built for busy Indians who want real results without complicated routines.", category:"Focus Habits", readTime:"6 min read", date:"June 2026", emoji:"📵", accent:"#ec4899", image:"/blog-images/phone-addiction-digital-detox-habits-2026.png", featured:false },
  { slug:"top-habits-for-success-in-life", title:"What Are the Top Habits for Success? 10 That Changed Real Lives", excerpt:"Discover practical, science-backed habits for what are the top habits for success in life. Built for busy Indians who want real results without complicated routines.", category:"Habit Science", readTime:"6 min read", date:"June 2026", emoji:"🔬", accent:"#8b5cf6", image:"/blog-images/top-habits-for-success-in-life.png", featured:false },
  { slug:"top-habits-highly-efficient-people-india-2026", title:"Top Habits of Highly Efficient People in India (2026 Edition)", excerpt:"Discover practical, science-backed habits for top habits of highly efficient people india 2026. Built for busy Indians who want real results without complicated routines.", category:"Productivity Habits", readTime:"6 min read", date:"June 2026", emoji:"🏆", accent:"#0ea5e9", image:"/blog-images/top-habits-highly-efficient-people-india-2026.png", featured:false },
  { slug:"how-to-build-better-relationships-daily-habits", title:"How to Build Better Relationships: 6 Daily Habits That Transform Your Connections", excerpt:"Discover practical, science-backed habits for how to build better relationships daily habits. Built for busy Indians who want real results without complicated routines.", category:"Relationships", readTime:"6 min read", date:"June 2026", emoji:"🤝", accent:"#f59e0b", image:"/blog-images/how-to-build-better-relationships-daily-habits.png", featured:false },
  { slug:"morning-routine-habits-high-performance", title:"Morning Routine Habits for High Performance: What Actually Works", excerpt:"Discover practical, science-backed habits for morning routine habits for high performance. Built for busy Indians who want real results without complicated routines.", category:"Health Habits", readTime:"6 min read", date:"June 2026", emoji:"🌅", accent:"#b8853a", image:"/blog-images/morning-routine-habits-high-performance.png", featured:false },
  { slug:"best-habits-for-mental-focus-concentration", title:"Best Habits for Mental Focus and Concentration (Tested in 2026)", excerpt:"Discover practical, science-backed habits for best habits for mental focus and concentration. Built for busy Indians who want real results without complicated routines.", category:"Focus Habits", readTime:"6 min read", date:"June 2026", emoji:"🧠", accent:"#6366f1", image:"/blog-images/best-habits-for-mental-focus-concentration.png", featured:false },
  { slug:"how-to-stop-procrastinating-get-things-done", title:"How to Stop Procrastinating: The Only Guide You Need in 2026", excerpt:"Discover practical, science-backed habits for how to stop procrastinating and get things done. Built for busy Indians who want real results without complicated routines.", category:"Productivity Habits", readTime:"6 min read", date:"June 2026", emoji:"🎯", accent:"#ef4444", image:"/blog-images/how-to-stop-procrastinating-get-things-done.png", featured:false },
  { slug:"how-to-sleep-better-at-night-naturally", title:"How to Sleep Better at Night: 7 Science-Backed Habits That Actually Work", excerpt:"Discover practical, science-backed habits for how to sleep better at night naturally. Built for busy Indians who want real results without complicated routines.", category:"Health Habits", readTime:"6 min read", date:"June 2026", emoji:"😴", accent:"#8b5cf6", image:"/blog-images/how-to-sleep-better-at-night-naturally.png", featured:false },
  { slug:"how-to-be-more-productive-at-work-india", title:"How to Be More Productive at Work: 8 Habits Indian Professionals Use Daily", excerpt:"Discover practical, science-backed habits for how to be more productive at work india. Built for busy Indians who want real results without complicated routines.", category:"Productivity Habits", readTime:"6 min read", date:"June 2026", emoji:"📈", accent:"#f97316", image:"/blog-images/how-to-be-more-productive-at-work-india.png", featured:false },
  { slug:"how-to-increase-energy-levels-naturally", title:"How to Increase Energy Levels Naturally (Without Coffee or Supplements)", excerpt:"Discover practical, science-backed habits for how to increase energy levels naturally. Built for busy Indians who want real results without complicated routines.", category:"Health Habits", readTime:"6 min read", date:"June 2026", emoji:"⚡", accent:"#10b981", image:"/blog-images/how-to-increase-energy-levels-naturally.png", featured:false },
  { slug:"morning-health-habits-busy-indians", title:"Morning Health Habits That Actually Work for Busy Indians", excerpt:"You don't need an hour-long morning routine. These proven health habits take under 5 minutes and are designed for busy Indian professionals.", category:"Health Habits", readTime:"5 min read", date:"May 2026", emoji:"🌅", accent:"#10b981", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&q=80", featured:true },
  { slug:"sleep-habits-better-energy", title:"Best Sleep Habits That Transform Your Energy Levels", excerpt:"Poor sleep is silently draining your energy, focus, and mood. These sleep habits help you wake up genuinely rested.", category:"Health Habits", readTime:"5 min read", date:"May 2026", emoji:"😴", accent:"#8b5cf6", image:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"healthy-habits-without-gym", title:"How to Build Healthy Habits Without Going to the Gym", excerpt:"No gym membership needed. These at-home health habits are practical, sustainable, and proven to improve your wellbeing daily.", category:"Health Habits", readTime:"5 min read", date:"May 2026", emoji:"💪", accent:"#06b6d4", image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"morning-habits-that-change-your-day", title:"3 Morning Habits That Change How Your Entire Day Feels", excerpt:"No 5 AM alarm required. These three morning habits — each under 5 minutes — set the tone for your energy, focus, and calm.", category:"Health Habits", readTime:"5 min read", date:"May 2026", emoji:"☀️", accent:"#b8853a", image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"productivity-habits-indian-professionals", title:"Daily Productivity Habits of Highly Successful Indian Professionals", excerpt:"What separates high-achieving Indian professionals? A handful of daily productivity habits done consistently.", category:"Productivity Habits", readTime:"6 min read", date:"May 2026", emoji:"📈", accent:"#f97316", image:"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"stop-procrastinating-tiny-habits", title:"How to Stop Procrastinating: 7 Tiny Habits That Actually Help", excerpt:"Procrastination is not a personality flaw — it's a design problem. These 7 tiny habits fix the root cause and make starting easy.", category:"Productivity Habits", readTime:"6 min read", date:"May 2026", emoji:"🎯", accent:"#ef4444", image:"https://images.unsplash.com/photo-1501290741922-b56c0d0884af?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"work-from-home-productivity-habits", title:"Work From Home Productivity Habits That Remote Workers Swear By", excerpt:"Working from home in India comes with unique challenges. These WFH habits help you stay focused and motivated.", category:"Productivity Habits", readTime:"6 min read", date:"May 2026", emoji:"🏠", accent:"#0ea5e9", image:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"improve-concentration-focus-5-minutes", title:"How to Improve Concentration and Focus in 5 Minutes a Day", excerpt:"These 5-minute focus habits work immediately and build into lasting concentration — no meditation hour required.", category:"Focus Habits", readTime:"5 min read", date:"May 2026", emoji:"🧠", accent:"#6366f1", image:"https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"digital-detox-habits-phone-addiction", title:"Digital Detox Habits: How to Break Free from Phone Addiction", excerpt:"The average Indian spends 4.7 hours on their phone daily. These digital detox habits reduce screen time without willpower.", category:"Focus Habits", readTime:"6 min read", date:"May 2026", emoji:"📵", accent:"#ec4899", image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"self-improvement-habits-personal-growth", title:"Self Improvement Habits That Change How You See Yourself", excerpt:"Self-confidence is built through consistent daily habits, not motivation. Here's where to start your personal growth journey.", category:"Relationships", readTime:"6 min read", date:"May 2026", emoji:"✨", accent:"#f59e0b", image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"habits-improve-relationships-family", title:"Daily Habits That Improve Your Relationships with Family and Friends", excerpt:"Good relationships don't happen by accident. These small daily habits build the trust and connection that matter most.", category:"Relationships", readTime:"5 min read", date:"May 2026", emoji:"🤝", accent:"#84cc16", image:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"why-tiny-habits-work", title:"Why Tiny Habits Work — And Why Big Goals Usually Don't", excerpt:"Science shows starting absurdly small — not big — is what actually sticks. Here's the research and what it means for you.", category:"Habit Science", readTime:"5 min read", date:"May 2026", emoji:"🔬", accent:"#8b5cf6", image:"https://images.unsplash.com/photo-1434030216411-0b793f4b6f25?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"5-minute-habits-for-busy-people", title:"5-Minute Habits That Actually Work for Busy People", excerpt:"If you have 5 minutes between meetings, you have enough time to build a life-changing habit. These deliver the highest return per minute.", category:"Habit Science", readTime:"6 min read", date:"May 2026", emoji:"⚡", accent:"#10b981", image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop&q=80", featured:false },
  { slug:"science-behind-habit-stacking", title:"The Science Behind Habit Stacking — And How to Use It", excerpt:"Habit stacking is the most underrated productivity technique most people have never heard of. Here's exactly how to use it.", category:"Habit Science", readTime:"7 min read", date:"May 2026", emoji:"🔗", accent:"#6366f1", image:"https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800&h=450&fit=crop&q=80", featured:false },
];

/* eslint-disable @next/next/no-img-element */
export default function BlogsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter(p => p.category === active);
  const featured = posts.find(p => p.featured) || posts[0];
  const cm = (cat: string) => (CATEGORY_META as Record<string,{color:string,bg:string}>)[cat] || CATEGORY_META["All"];

  return (
    <div style={{ background:"#faf8f3", minHeight:"100vh", fontFamily:"var(--font-sans)", color:"#18181b" }}>
      <header style={{ background:"rgba(250,248,243,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e2dfd6", padding:"0 32px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", overflow:"hidden", flexShrink:0 }}><img src="/hpc-logo.png" alt="High Performance Club" style={{ width:"100%", height:"100%", objectFit:"cover" }} /></div>
          <span style={{ fontWeight:700, fontSize:16, color:"#18181b", letterSpacing:"-0.02em" }}>High Performance Club</span>
        </Link>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <Link href="/blogs" style={{ fontSize:14, color:"#b8853a", textDecoration:"none", fontWeight:600 }}>Blog</Link>
          <Link href="/#signup" style={{ background:"linear-gradient(135deg,#b8853a,#8a6428)", color:"#fff", padding:"9px 22px", borderRadius:999, fontSize:14, fontWeight:600, textDecoration:"none", boxShadow:"0 4px 16px rgba(184,133,58,0.3)" }}>Join Free →</Link>
        </div>
      </header>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"64px 32px 100px" }}>
        {/* Hero */}
        <div style={{ marginBottom:52 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(184,133,58,0.1)", border:"1px solid rgba(184,133,58,0.2)", borderRadius:999, padding:"5px 14px", marginBottom:20 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#b8853a", display:"inline-block" }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#b8853a" }}>High Performance Blog</span>
          </div>
          <h1 style={{ fontSize:"clamp(2.2rem,5.5vw,4rem)", fontWeight:800, letterSpacing:"-0.04em", lineHeight:1.05, marginBottom:16, color:"#18181b" }}>
            Tiny habits.{" "}
            <span style={{ background:"linear-gradient(135deg,#18181b 0%,#b8853a 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Real results.</span>
          </h1>
          <p style={{ fontSize:18, color:"#6b7280", maxWidth:520, lineHeight:1.65 }}>
            Science-backed articles on building tiny daily habits for busy Indians who want something that actually works.
          </p>
        </div>

        {/* Featured */}
        <Link href={`/blogs/${featured.slug}`} style={{ textDecoration:"none", display:"block", marginBottom:32 }}>
          <div style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:20, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr", transition:"all 0.3s" }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow="0 12px 40px rgba(184,133,58,0.12)"; (e.currentTarget as HTMLElement).style.borderColor="#f5d78e"; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.borderColor="#e5e7eb"; }}>
            <div style={{ overflow:"hidden", maxHeight:320 }}>
              <img src={featured.image} alt={featured.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s" }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="scale(1.04)"}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform="scale(1)"} />
            </div>
            <div style={{ padding:"36px 40px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                <span style={{ background:"#fef9ec", border:"1px solid #f5d78e", color:"#b8853a", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:999, letterSpacing:"0.08em", textTransform:"uppercase" }}>Featured</span>
                <span style={{ background:cm(featured.category).bg, color:cm(featured.category).color, fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:999, textTransform:"uppercase", letterSpacing:"0.08em" }}>{featured.category}</span>
              </div>
              <h2 style={{ fontSize:22, fontWeight:800, color:"#18181b", letterSpacing:"-0.025em", lineHeight:1.25, marginBottom:12 }}>{featured.title}</h2>
              <p style={{ fontSize:15, color:"#6b7280", lineHeight:1.65, marginBottom:20 }}>{featured.excerpt}</p>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <span style={{ color:"#b8853a", fontSize:14, fontWeight:700 }}>Read article →</span>
                <span style={{ color:"#9ca3af", fontSize:13 }}>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Category filter */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
          {CATEGORIES.map(cat => {
            const isActive = active === cat;
            const m = cm(cat);
            return (
              <button key={cat} onClick={()=>setActive(cat)}
                style={{ padding:"7px 16px", borderRadius:999, border:`1.5px solid ${isActive ? m.color : "#e5e7eb"}`, background:isActive ? m.bg : "#fff", color:isActive ? m.color : "#6b7280", fontSize:13, fontWeight:isActive?700:500, cursor:"pointer", transition:"all 0.2s" }}>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {filtered.filter(p => !(p.slug === featured.slug && active === "All")).map(post => {
            const m = cm(post.category);
            return (
              <Link key={post.slug} href={`/blogs/${post.slug}`} style={{ textDecoration:"none" }}>
                <article style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, overflow:"hidden", transition:"all 0.25s", cursor:"pointer", display:"flex", flexDirection:"column", height:"100%" }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow="0 8px 28px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLElement).style.borderColor=m.color+"55"; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor="#e5e7eb"; }}>
                  <div style={{ overflow:"hidden", height:180, flexShrink:0 }}>
                    <img src={post.image} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.4s" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="scale(1.06)"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform="scale(1)"} />
                  </div>
                  <div style={{ padding:"18px 20px 20px", display:"flex", flexDirection:"column", flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <span style={{ background:m.bg, color:m.color, fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:999, textTransform:"uppercase", letterSpacing:"0.07em" }}>{post.category}</span>
                      <span style={{ fontSize:12, color:"#9ca3af" }}>{post.readTime}</span>
                    </div>
                    <h2 style={{ fontSize:15.5, fontWeight:800, color:"#18181b", letterSpacing:"-0.02em", lineHeight:1.3, marginBottom:8, flex:1 }}>{post.title}</h2>
                    <p style={{ fontSize:13, color:"#9ca3af", lineHeight:1.55, marginBottom:14 }}>{post.excerpt.slice(0,110)}...</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"1px solid #f3f4f6" }}>
                      <span style={{ fontSize:12, color:"#9ca3af" }}>{post.date}</span>
                      <span style={{ fontSize:13, color:m.color, fontWeight:700 }}>Read →</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#9ca3af" }}>
            <p style={{ fontSize:18 }}>No articles in this category yet. More coming soon!</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop:72, background:"linear-gradient(135deg,#fef9ec,#fff7ed)", border:"2px solid #f5d78e", borderRadius:20, padding:"44px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:32 }}>
          <div>
            <p style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"#b8853a", fontWeight:700, marginBottom:8 }}>Want to live it, not just read it?</p>
            <h3 style={{ fontSize:24, fontWeight:800, color:"#18181b", letterSpacing:"-0.025em", marginBottom:8 }}>Join the free 7-day challenge.</h3>
            <p style={{ fontSize:15, color:"#6b7280", maxWidth:380 }}>One tiny habit delivered to your WhatsApp every morning. Free. 7 days. No app required.</p>
          </div>
          <Link href="/#signup" style={{ background:"linear-gradient(135deg,#b8853a,#8a6428)", color:"#fff", padding:"15px 32px", borderRadius:999, fontSize:16, fontWeight:700, textDecoration:"none", boxShadow:"0 8px 24px rgba(184,133,58,0.35)", whiteSpace:"nowrap" }}>
            Join for ₹1999 FREE →
          </Link>
        </div>
      </main>

      <footer style={{ borderTop:"1px solid #e2dfd6", background:"#f3f0e8", padding:"28px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontSize:13, color:"#9ca3af" }}>© 2026 High Performance Club</p>
        <div style={{ display:"flex", gap:24 }}>
          <Link href="/" style={{ fontSize:13, color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/blogs" style={{ fontSize:13, color:"#b8853a", textDecoration:"none" }}>Blog</Link>
        </div>
      </footer>
    </div>
  );
}
