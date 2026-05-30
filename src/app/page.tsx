import UrgencyBar from "@/components/UrgencyBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LiveStatsBar from "@/components/LiveStatsBar";
import InlineSignup from "@/components/InlineSignup";
import HowChallengeWorks from "@/components/HowChallengeWorks";
import CuriosityBullets from "@/components/CuriosityBullets";
import Testimonials from "@/components/Testimonials";
import CertificateReveal from "@/components/CertificateReveal";
import Hook from "@/components/Hook";
import BrandLine from "@/components/BrandLine";
import JourneyTimeline from "@/components/JourneyTimeline";
import HabitStories from "@/components/HabitStories";
import ScreenshotWall from "@/components/ScreenshotWall";
import HabitTeasers from "@/components/HabitTeasers";
import HowItWorks from "@/components/HowItWorks";
import FounderStory from "@/components/FounderStory";
import Comparison from "@/components/Comparison";
import WhoItsFor from "@/components/WhoItsFor";
import Credibility from "@/components/Credibility";
import BonusStack from "@/components/BonusStack";
import ValueStack from "@/components/ValueStack";
import Guarantee from "@/components/Guarantee";
import SignupSection from "@/components/SignupSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import PostScript from "@/components/PostScript";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <UrgencyBar />
      <Header />
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Live stats */}
        <LiveStatsBar />

        {/* 3. FORM #1 */}
        <InlineSignup id="signup-1" />

        {/* 4. How this challenge works — Simple Tiny Powerful */}
        <HowChallengeWorks />

        {/* 5. Your Journey — road map animation */}
        <CuriosityBullets />

        {/* 6. Wall of Love — Testimonials */}
        <Testimonials />

        {/* 7. Journey Timeline */}
        <JourneyTimeline />

        {/* 8. Hook */}
        <Hook />

        {/* 9. Brand promise */}
        <BrandLine />

        {/* 10. Certificate reveal */}
        <div id="certificate">
          <CertificateReveal />
        </div>

        {/* 11. Habit stories */}
        <HabitStories />

        {/* 12. Real Conversations — screenshot wall */}
        <ScreenshotWall />

        {/* 13. FORM #2 — after Real Conversations */}
        <InlineSignup id="signup-2" />

        {/* 14. Habit teasers */}
        <HabitTeasers />

        {/* 15. How it works — 3 steps */}
        <HowItWorks />

        {/* 16. Founder origin story */}
        <FounderStory />

        {/* 17. Comparison */}
        <Comparison />

        {/* 18. Who it's for */}
        <WhoItsFor />

        {/* 19. Credibility */}
        <Credibility />

        {/* 20. What's included */}
        <BonusStack />

        {/* 21. Value stack */}
        <ValueStack />

        {/* 22. Guarantee */}
        <Guarantee />

        {/* 23. FORM #3 — Final Step */}
        <SignupSection />

        {/* 24. FAQ */}
        <FAQ />

        {/* 25. Final CTA */}
        <FinalCTA />

        {/* 26. PostScript */}
        <PostScript />
      </main>
      <Footer />
      <StickyMobileCTA />
      <BackToTop />
    </>
  );
}
