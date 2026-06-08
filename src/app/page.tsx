import Header from "@/components/Header";
import MetaPixelEvents from "@/components/MetaPixelEvents";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Hero from "@/components/Hero";
import LiveStatsBar from "@/components/LiveStatsBar";
import PainPoint from "@/components/PainPoint";
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
import ValueStack from "@/components/ValueStack";
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

        {/* 2b. Largest pain point */}
        <PainPoint />

        {/* 2b-ii. The Power of Tiny Gains — 1% better compounding (James Clear style) */}
        <TinyGains />

        {/* 2c. Value props — zigzag big benefits */}
        <ValueProps />

        {/* 3. Form #1 */}
        <InlineSignup id="signup-1" />

        {/* 3b. What is this challenge */}
        <WhatIsChallenge />

        {/* 4. How this challenge works */}
        <HowChallengeWorks />

        {/* 4b. Here is how your 7 days will look */}
        <CuriosityBullets />

        {/* 6. Everything You Get In This Challenge */}
        <ValueStack />

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
