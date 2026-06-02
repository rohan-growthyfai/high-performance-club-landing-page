import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LiveStatsBar from "@/components/LiveStatsBar";
import InlineSignup from "@/components/InlineSignup";
import HowChallengeWorks from "@/components/HowChallengeWorks";
import WhyTinyHabits from "@/components/WhyTinyHabits";
import CuriosityBullets from "@/components/CuriosityBullets";
import SevenDayResults from "@/components/SevenDayResults";
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
      <Header />
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Live stats */}
        <LiveStatsBar />

        {/* 3. Form #1 */}
        <InlineSignup id="signup-1" />

        {/* 4. How this challenge works */}
        <HowChallengeWorks />

        {/* 5. Why Tiny Habits */}
        <WhyTinyHabits />

        {/* 6. Your Journey — animated road map */}
        <CuriosityBullets />

        {/* 7. What You'll Actually Notice in 7 Days */}
        <SevenDayResults />

        {/* 6. Wall of Love — Testimonials */}
        <Testimonials />

        {/* 7. Certificate */}
        <div id="certificate">
          <CertificateReveal />
        </div>

        {/* 8. Real Talk — "you don't need another motivation video" */}
        <Hook />

        {/* 9. Why this is different */}
        <Comparison />

        {/* 11. Founder story */}
        <FounderStory />

        {/* 12. Value stack */}
        <ValueStack />

        {/* 13. Guarantee */}
        <Guarantee />

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
    </>
  );
}
