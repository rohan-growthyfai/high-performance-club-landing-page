import { MessageCircle } from "lucide-react";
import IPhoneFrame from "./IPhoneFrame";

type PhoneCardData = {
  day: string;
  time: string;
  title: string;
  messages: string[];
  tilt?: string;
};

const phones: PhoneCardData[] = [
  {
    day: "Day 2",
    time: "7:30 AM",
    title: "🧍 Posture Switch",
    messages: [
      "Today's tiny upgrade takes 60 seconds. Yes — only 60 seconds.",
      "Wherever you are right now, sit (or stand) like the higher-energy version of you would.",
      "Shoulders back. Chest open. Head tall. Hold it for one minute.",
      "Your body changes how your brain feels in seconds.",
    ],
    tilt: "tilt-left",
  },
  {
    day: "Day 4",
    time: "7:30 AM",
    title: "🫁 The Breathing Trick",
    messages: [
      "Before anything stressful today — a tough message, a meeting, a difficult call — do 3 double breaths.",
      "Inhale through nose. Then take a second short inhale (top-up). Now exhale slowly through mouth.",
      "Do it 3 times. Total: 30 seconds.",
      "You'll go from stressed to calm in under a minute. Try it.",
    ],
    tilt: "",
  },
  {
    day: "Day 7",
    time: "9:00 PM",
    title: "🗒️ The Brain Dump",
    messages: [
      "Just a reminder before you sleep tonight.",
      "5 minutes. Paper (not phone). Everything in your head.",
      "Don't think. Don't organise. Just dump.",
      "Sleep right after. Notice how different tonight feels.",
    ],
    tilt: "tilt-right",
  },
];

export default function WhatsAppPreview() {
  return (
    <section id="whatsapp-preview" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-6 inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            What lands in your WhatsApp
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-6">
            Real messages.
            <br />
            <span className="italic font-medium">From real days.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
            No app. No login. Just one message in the morning and one in the evening — for 7 days.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-10 max-w-5xl mx-auto">
          {phones.map((p) => (
            <PreviewPhone key={p.day} data={p} />
          ))}
        </div>

        <p className="text-center mt-12 text-lg text-foreground-subtle max-w-2xl mx-auto leading-relaxed">
          These are 3 of the 7 days. The rest are revealed as you go through the challenge.
        </p>
      </div>
    </section>
  );
}

function PreviewPhone({ data: p }: { data: PhoneCardData }) {
  return (
    <div className={`flex justify-center ${p.tilt}`}>
      <IPhoneFrame
        contactName="High Performance Club"
        contactStatus="online"
        width={270}
      >
        <div style={{
          background: "#0b141a",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23ffffff' fill-opacity='0.02' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")",
          padding: "12px 8px 8px",
          minHeight: 380,
        }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(31,44,52,0.8)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>
              {p.day}
            </span>
          </div>

          {/* Incoming message */}
          <div style={{ display: "flex", paddingLeft: 6, marginBottom: 6 }}>
            <div style={{ background: "#202c33", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "88%", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #202c33 transparent" }} />
              <p style={{ margin: 0, color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>
                {p.title}
              </p>
              {p.messages.map((msg, i) => (
                <p key={i} style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.88)", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>
                  {msg}
                </p>
              ))}
              <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "var(--font-sans)", textAlign: "right" }}>
                {p.time}
              </p>
            </div>
          </div>

          {/* User reply */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
            <div style={{ background: "#005c4b", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "55%", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #005c4b transparent" }} />
              <p style={{ margin: 0, color: "#fff", fontSize: 12, fontFamily: "var(--font-sans)" }}>✅ Done</p>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "var(--font-sans)", textAlign: "right" }}>
                ✓✓
              </p>
            </div>
          </div>
        </div>
      </IPhoneFrame>
    </div>
  );
}
