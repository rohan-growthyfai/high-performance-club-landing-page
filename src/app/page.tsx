import Header from "@/components/Header";
import MetaPixelEvents from "@/components/MetaPixelEvents";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Hero from "@/components/Hero";
import LiveStatsBar from "@/components/LiveStatsBar";
import SoundsLikeYou from "@/components/SoundsLikeYou";
import BeforeAfter from "@/components/BeforeAfter";
import SystemAdapts from "@/components/SystemAdapts";
import ValueLadder from "@/components/ValueLadder";
import TinyGains from "@/components/TinyGains";
import ValueProps from "@/components/ValueProps";
import InlineSignup from "@/components/InlineSignup";
import WhatIsChallenge from "@/components/WhatIsChallenge";
import HowChallengeWorks from "@/components/HowChallengeWorks";
import WhyTinyHabits from "@/components/WhyTinyHabits";
import CuriosityBullets from "@/components/CuriosityBullets";
import Testimonials from "@/components/Testimonials";
import CertificateReveal from "@/components/CertificateReveal";
import Hook from "@/components/Hook";
import Comparison from "@/components/Comparison";
import FounderStory from "@/components/FounderStory";
import Guarantee from "@/components/Guarantee";
import SignupSection from "@/components/SignupSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import PostScript from "@/components/PostScript";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import BackToTop from "@/components/BackToTop";
import LiveEnrollmentPopup from "@/components/LiveEnrollmentPopup";

export default function Home() {
  return (
    <>
      {/* Meta Pixel — ViewContent fires when someone views the homepage */}
      <MetaPixelEvents event="ViewContent" params={{ content_name: "HPC Homepage", content_category: "Landing Page", content_type: "page" }} />
      <Header />
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Live stats */}
        <LiveStatsBar />

        {/* 2-new-1. Does this sound like you? (pain points) */}
        <SoundsLikeYou />

        {/* 2-new-2. Before/After — where you are now → where you'll be in 7 days */}
        <BeforeAfter />

        {/* 2-new-3. Whoever you are, the tiny habits challenge adapts to you */}
        <SystemAdapts />

        {/* 2-new-4. What exactly is this challenge? */}
        <WhatIsChallenge />

        {/* 2-new-5. How this challenge works */}
        <HowChallengeWorks />

        {/* 2-new-6. Here is how your 7 days will look */}
        <CuriosityBullets />

        {/* 2b-ii. The Power of Tiny Gains — 1% better compounding (James Clear style) */}
        <TinyGains />

        {/* 2c. Value props — zigzag big benefits */}
        <ValueProps />

        {/* 3. Form #1 */}
        <InlineSignup id="signup-1" />

        {/* 6. Everything you're getting today — value ladder (₹999 → FREE) */}
        <ValueLadder />

        {/* 7. Wall of Love — Testimonials */}
        <Testimonials />

        {/* 7. Why this is different */}
        <Comparison />

        {/* 8. Why Tiny Habits */}
        <WhyTinyHabits />

        {/* 10. Certificate */}
        <div id="certificate">
          <CertificateReveal />
        </div>


        {/* 11. Founder story */}
        <FounderStory />

        {/* 14. Form #2 — Final Step */}
        <SignupSection />

        {/* 15. FAQ */}
        <FAQ />

        {/* 16. Final CTA + PostScript */}
        <FinalCTA />
        <PostScript />
      </main>
      <Footer />
      <StickyMobileCTA />
      <BackToTop />
      <LiveEnrollmentPopup />
      <ExitIntentPopup />
    </>
  );
}
