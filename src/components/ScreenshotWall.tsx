import { MessageCircle } from "lucide-react";
import IPhoneFrame from "./IPhoneFrame";

type Message = {
  side: "in" | "out";
  text: string;
  time: string;
};

type Conversation = {
  member: string;
  city: string;
  day: string;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    member: "Priya",
    city: "Mumbai",
    day: "Day 3",
    messages: [
      { side: "in", text: "👀 Day 3: Eye Vacation\n\nEvery hour, look at something 20 feet away for 20 seconds. That's it.", time: "7:30 AM" },
      { side: "out", text: "Did it 4 times today. My eyes feel SO different. 🤯", time: "5:42 PM" },
      { side: "in", text: "Your body calms down in seconds when you do this 💪", time: "5:43 PM" },
    ],
  },
  {
    member: "Karan",
    city: "Bengaluru",
    day: "Day 5",
    messages: [
      { side: "in", text: "🎯 Day 5: One-Tab Start\n\nOpen 1 tab. Work on 1 task. For 7 minutes.", time: "7:30 AM" },
      { side: "out", text: "Honestly thought 7 min was too short", time: "9:12 AM" },
      { side: "out", text: "Just finished. Got more done than my whole morning yesterday 😳", time: "9:13 AM" },
      { side: "in", text: "Welcome to the club 🤝", time: "9:14 AM" },
    ],
  },
  {
    member: "Anjali",
    city: "Hyderabad",
    day: "Day 7",
    messages: [
      { side: "in", text: "🏆 Day 7 complete! Your certificate is on its way 🎉", time: "9:00 PM" },
      { side: "out", text: "I actually finished a challenge for the first time in my life", time: "9:02 PM" },
      { side: "out", text: "Crying a little ngl 🥹", time: "9:02 PM" },
      { side: "in", text: "PROUD of you Anjali. This is just the start.", time: "9:04 PM" },
    ],
  },
  {
    member: "Vikram",
    city: "Pune",
    day: "Day 2",
    messages: [
      { side: "in", text: "🧍 Day 2: Posture Switch\n\nFor 60 seconds, sit like the confident version of you.", time: "7:30 AM" },
      { side: "out", text: "Did this before a client call. Felt completely different.", time: "11:15 AM" },
      { side: "out", text: "60 seconds. Wild.", time: "11:15 AM" },
    ],
  },
  {
    member: "Neha",
    city: "Delhi",
    day: "Day 4",
    messages: [
      { side: "in", text: "🫁 Day 4: The Breathing Trick\n\nBefore anything stressful — 3 double breaths. 30 sec total.", time: "7:30 AM" },
      { side: "out", text: "Used it before opening a hard email", time: "2:30 PM" },
      { side: "out", text: "Went from panic to calm in literally 30 seconds 🧘", time: "2:30 PM" },
      { side: "in", text: "Your body calms down in seconds when you do this 💪", time: "2:32 PM" },
    ],
  },
  {
    member: "Rohit",
    city: "Ahmedabad",
    day: "Day 6",
    messages: [
      { side: "in", text: "🧠 Day 6: Name the Noise\n\nWrite ONE sentence: 'I feel ___ because ___.'", time: "7:30 AM" },
      { side: "out", text: "I wrote: 'I feel overwhelmed because I have 47 tabs open'", time: "10:15 AM" },
      { side: "out", text: "...I closed the tabs 🙃", time: "10:16 AM" },
      { side: "in", text: "Mental clarity in real-time 😄", time: "10:18 AM" },
    ],
  },
];

export default function ScreenshotWall() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <span className="emoji-deco float-1 top-16 right-10 text-4xl hidden lg:block" aria-hidden="true">💬</span>
      <span className="emoji-deco float-2 bottom-32 left-12 text-4xl hidden lg:block" aria-hidden="true">📸</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="text-base font-bold text-accent uppercase tracking-wider">
              Real conversations 💬
            </span>
          </div>
          <h2 className="font-display text-section-title text-balance text-foreground mb-6">
            What it actually looks like
            <br />
            <span className="italic font-medium gradient-text">in your WhatsApp.</span>
          </h2>
        </div>

        {/* Uniform grid — all phones identical size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {conversations.map((conv, i) => (
            <ConversationPhone key={i} conv={conv} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isIn = msg.side === "in";
  return (
    <div style={{
      display: "flex",
      justifyContent: isIn ? "flex-start" : "flex-end",
      marginBottom: 6,
      paddingLeft: isIn ? 8 : 0,
      paddingRight: isIn ? 0 : 8,
    }}>
      <div style={{
        background: isIn ? "#fff" : "#d9fdd3",
        borderRadius: isIn ? "8px 8px 8px 0" : "8px 8px 0 8px",
        padding: "7px 10px",
        maxWidth: "83%",
        position: "relative",
      }}>
        {isIn && (
          <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
        )}
        {!isIn && (
          <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
        )}
        <p style={{ margin: 0, color: "#111b21", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.5, whiteSpace: "pre-line" }}>
          {msg.text}
        </p>
        <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 9.5, fontFamily: "var(--font-sans)", textAlign: "right" }}>
          {msg.time}{!isIn && " ✓✓"}
        </p>
      </div>
    </div>
  );
}

// Fixed chat area height so all phones are exactly the same size
const CHAT_HEIGHT = 340;

function ConversationPhone({ conv }: { conv: Conversation }) {
  return (
    <div className="flex justify-center">
      <IPhoneFrame
        contactName="High Performance Club"
        contactStatus={`online · ${conv.member} from ${conv.city}`}
        width={260}
      >
        <div style={{
          background: "#efeae2",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000000' fill-opacity='0.03' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")",
          padding: "12px 0 8px",
          height: CHAT_HEIGHT,
          overflow: "hidden",
          boxSizing: "border-box",
        }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>
              {conv.day}
            </span>
          </div>
          {conv.messages.map((msg, i) => (
            <Bubble key={i} msg={msg} />
          ))}
        </div>
      </IPhoneFrame>
    </div>
  );
}
