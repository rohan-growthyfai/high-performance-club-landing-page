import type { Metadata } from "next";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import DUCHero from "@/components/duc/DUCHero";
import DUCLiveStatsBar from "@/components/duc/DUCLiveStatsBar";
import DUCWhatIs from "@/components/duc/DUCWhatIs";
import DUCWhy from "@/components/duc/DUCWhy";
import DUCHowWorks from "@/components/duc/DUCHowWorks";
import DUCValueStack from "@/components/duc/DUCValueStack";
import DUCHowItWorks from "@/components/duc/DUCHowItWorks";
import DUCThemes from "@/components/duc/DUCThemes";
import DUCSampleMessage from "@/components/duc/DUCSampleMessage";
import DUCTracking from "@/components/duc/DUCTracking";
import DUCScorecard from "@/components/duc/DUCScorecard";
import DUCGroup from "@/components/duc/DUCGroup";
import DUCVault from "@/components/duc/DUCVault";
import DUCTestimonials from "@/components/duc/DUCTestimonials";
import DUCPrice from "@/components/duc/DUCPrice";
import DUCForWho from "@/components/duc/DUCForWho";
import DUCFounder from "@/components/duc/DUCFounder";
import DUCFAQ from "@/components/duc/DUCFAQ";
import DUCFinalCTA from "@/components/duc/DUCFinalCTA";
import DUCFooter from "@/components/duc/DUCFooter";
import DUCStickyBar from "@/components/duc/DUCStickyBar";
import DUCEnrollmentPopup from "@/components/duc/DUCEnrollmentPopup";
import DUCExitIntentPopup from "@/components/duc/DUCExitIntentPopup";

export const metadata: Metadata = {
  title: "Daily Upgrade Club — Build Better Habits Every Day on WhatsApp | ₹1 trial",
  description: "Join Daily Upgrade Club and get 1 tiny habit daily, weekly progress tracking, monthly themes, habit guides, and a private accountability group. Start with a 7-day trial for just ₹1, then ₹99/month. No app needed. Delivered on WhatsApp.",
  openGraph: {
    title: "Daily Upgrade Club — Build Better Habits Every Day on WhatsApp",
    description: "1 tiny habit daily. Weekly scorecards. Monthly themes. All on WhatsApp. ₹1 for 7 days, then ₹99/month.",
    url: "https://highperformanceclub.co/daily-upgrade-club",
  },
};

export default function DailyUpgradeClub() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <DUCHero />
        <DUCLiveStatsBar />
        <DUCWhatIs />
        <DUCWhy />
        <DUCHowWorks />
        <DUCValueStack />
        <DUCHowItWorks />
        <DUCThemes />
        <DUCSampleMessage />
        <DUCTracking />
        <DUCScorecard />
        <DUCGroup />
        <DUCVault />
        <DUCTestimonials />
        <DUCPrice />
        <DUCForWho />
        <DUCFounder />
        <DUCFAQ />
        <DUCFinalCTA />
      </main>
      <DUCFooter />
      <DUCStickyBar />
      <BackToTop />
      <DUCEnrollmentPopup />
      <DUCExitIntentPopup />
    </>
  );
}
