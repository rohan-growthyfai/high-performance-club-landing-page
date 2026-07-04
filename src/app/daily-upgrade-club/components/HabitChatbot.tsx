"use client";
import { useState, useRef, useEffect, useCallback } from "react";

type Message = { role: "user" | "assistant"; content: string; id: string };

const STARTER_QUESTIONS = [
  "What is Daily Upgrade Club?",
  "How does it work?",
  "I struggle with consistency",
  "Tell me about the ₹1 trial",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  id: "welcome",
  content:
    "Namaste! 🌱 Welcome to **Daily Upgrade Club**.\n\nBefore I dive in — I'd love to know who I'm talking to. What's your name?",
};

// Friendly animated mascot avatar — a welcoming character with a face + waving hand.
// Self-contained inline SVG (no external image, CSP-safe). Blinks and waves gently.
function AssistantMascot({ size = 64 }: { size?: number }) {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(140deg,#d1fae5 0%,#a7f3d0 55%,#6ee7b7 100%)" }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ display: "block" }} aria-hidden="true">
        <defs>
          <linearGradient id="mascotBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34d399" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        {/* little leaf sprout on top — ties to the wellness/growth theme */}
        <path d="M32 12 C31 7 27 5 24 5 C25 9 28 12 32 13 Z" fill="#22c55e" />
        <path d="M32 12 C33 7 37 5 40 5 C39 9 36 12 32 13 Z" fill="#4ade80" />
        {/* head/body — friendly round character */}
        <circle cx="32" cy="35" r="20" fill="url(#mascotBody)" />
        {/* face highlight */}
        <ellipse cx="32" cy="30" rx="15" ry="12" fill="#ffffff" opacity="0.14" />
        {/* eyes — blink via scaleY */}
        <g className="mascot-eyes" style={{ transformOrigin: "32px 33px" }}>
          <circle cx="25.5" cy="33" r="3.2" fill="#0f2f1c" />
          <circle cx="38.5" cy="33" r="3.2" fill="#0f2f1c" />
          {/* eye sparkles */}
          <circle cx="26.7" cy="31.8" r="1" fill="#fff" />
          <circle cx="39.7" cy="31.8" r="1" fill="#fff" />
        </g>
        {/* rosy cheeks */}
        <circle cx="22" cy="39" r="3" fill="#fb7185" opacity="0.5" />
        <circle cx="42" cy="39" r="3" fill="#fb7185" opacity="0.5" />
        {/* warm smile */}
        <path d="M25 41 Q32 47 39 41" stroke="#0f2f1c" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        {/* waving hand */}
        <g className="mascot-hand" style={{ transformOrigin: "50px 40px" }}>
          <circle cx="52" cy="34" r="4.5" fill="#facc15" stroke="#0f2f1c" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function MarkdownText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return (
          <span key={i}>
            {part.split("\n").map((line, j, arr) => (
              <span key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

export default function HabitChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTooltipDismissed(true);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open, messages]);

  const send = useCallback(
    async (text?: string) => {
      const msg = (text ?? input).trim();
      if (!msg || loading) return;
      setInput("");

      const userMsg: Message = { role: "user", content: msg, id: Date.now().toString() };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setLoading(true);

      try {
        const res = await fetch("/api/duc-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages
              .filter(m => m.id !== "welcome")
              .map(m => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await res.json();
        const reply = data.reply ?? "Sorry, I couldn't fetch a response. Please try again!";
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: reply, id: (Date.now() + 1).toString() },
        ]);
      } catch {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Oops! Something went wrong. Please try again in a moment 🙏",
            id: (Date.now() + 1).toString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  return (
    <>
      {/* Tooltip bubble — dismisses on open */}
      {!open && !tooltipDismissed && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            zIndex: 9997,
            animation: "duc-tooltip-in 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 14px 10px 12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
              border: "1.5px solid #d1fae5",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              maxWidth: 230,
            }}
            onClick={() => setOpen(true)}
          >
            {/* Mini avatar */}
            <div style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #25d366",
              flexShrink: 0,
            }}>
              <AssistantMascot size={34} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", margin: 0, lineHeight: 1.2 }}>
                Habit Assistant
              </p>
              <p style={{ fontSize: 12, color: "#3f3f46", margin: 0, marginTop: 2, lineHeight: 1.4 }}>
                Hi! I can help you if you have any questions 👋
              </p>
            </div>
            {/* Dismiss */}
            <button
              onClick={e => { e.stopPropagation(); setTooltipDismissed(true); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 2,
                color: "#9ca3af",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {/* Tail */}
          <div style={{
            width: 0, height: 0,
            borderLeft: "8px solid transparent",
            borderTop: "8px solid #d1fae5",
            position: "absolute",
            bottom: -9,
            right: 28,
          }} />
          <div style={{
            width: 0, height: 0,
            borderLeft: "7px solid transparent",
            borderTop: "7px solid #fff",
            position: "absolute",
            bottom: -7,
            right: 29,
          }} />
        </div>
      )}

      {/* Floating launcher — always shows chat icon, never X */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close Habit Assistant" : "Open Habit Assistant"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {/* Circular avatar image */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid #25d366",
          boxShadow: "0 8px 28px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.18)",
          background: "linear-gradient(135deg,#16a34a,#25d366)",
          position: "relative",
        }}>
          <AssistantMascot size={64} />
          {/* Online green ring pulse */}
          <div style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#22c55e",
            border: "2.5px solid #fff",
            animation: open ? "none" : "duc-ping 2s ease-in-out infinite",
          }} />
        </div>
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            zIndex: 9998,
            width: "min(390px, calc(100vw - 32px))",
            height: "min(590px, calc(100vh - 120px))",
            borderRadius: 20,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
            animation: "duc-slidein 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0a3320 0%, #14532d 40%, #16a34a 80%, #22c55e 100%)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 11,
              flexShrink: 0,
            }}
          >
            {/* Avatar image */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2.5px solid rgba(255,255,255,0.5)",
                flexShrink: 0,
                boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              <AssistantMascot size={46} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0, lineHeight: 1.2 }}>
                Habit Assistant
              </p>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, margin: 0, marginTop: 3 }}>
                Daily Upgrade Club · Always here
              </p>
            </div>
            {/* Online indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 0 2.5px rgba(74,222,128,0.35)",
                  animation: "duc-ping-sm 2s ease-in-out infinite",
                }}
              />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500 }}>Online</span>
            </div>
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                width: 30,
                height: 30,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 13px",
              background: "#f5fdf7",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: 7,
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid #d1fae5",
                      flexShrink: 0,
                      boxShadow: "0 2px 6px rgba(37,211,102,0.2)",
                    }}
                  >
                    <AssistantMascot size={30} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius:
                      m.role === "user"
                        ? "18px 18px 4px 18px"
                        : "4px 18px 18px 18px",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg,#15803d,#22c55e)"
                        : "#fff",
                    color: m.role === "user" ? "#fff" : "#18181b",
                    fontSize: 14,
                    lineHeight: 1.65,
                    boxShadow:
                      m.role === "user"
                        ? "0 4px 14px rgba(37,211,102,0.32)"
                        : "0 2px 10px rgba(0,0,0,0.07)",
                    border: m.role === "assistant" ? "1px solid #dcfce7" : "none",
                  }}
                >
                  <MarkdownText text={m.content} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", overflow: "hidden", border: "1.5px solid #d1fae5", flexShrink: 0 }}>
                  <AssistantMascot size={30} />
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "4px 18px 18px 18px",
                    background: "#fff",
                    border: "1px solid #dcfce7",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                        animation: `duc-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Starter questions — show only at start */}
          {messages.length === 1 && !loading && (
            <div
              style={{
                padding: "8px 10px",
                background: "#f0fdf4",
                borderTop: "1px solid #d1fae5",
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {STARTER_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{
                    padding: "5px 11px",
                    borderRadius: 20,
                    background: "#fff",
                    border: "1.5px solid #22c55e",
                    color: "#15803d",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#f0fdf4";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            style={{
              padding: "10px 11px",
              background: "#fff",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask anything about Daily Upgrade Club…"
              disabled={loading}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 24,
                border: "1.5px solid #e5e7eb",
                outline: "none",
                fontSize: 14,
                color: "#18181b",
                background: "#f9fafb",
                transition: "border-color 0.15s",
              }}
              onFocus={e => {
                (e.target as HTMLInputElement).style.borderColor = "#22c55e";
                (e.target as HTMLInputElement).style.background = "#fff";
              }}
              onBlur={e => {
                (e.target as HTMLInputElement).style.borderColor = "#e5e7eb";
                (e.target as HTMLInputElement).style.background = "#f9fafb";
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background:
                  input.trim() && !loading
                    ? "linear-gradient(135deg,#15803d,#22c55e)"
                    : "#e5e7eb",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s, transform 0.15s",
                boxShadow: input.trim() && !loading ? "0 4px 14px rgba(34,197,94,0.38)" : "none",
              }}
              onMouseEnter={e => {
                if (input.trim() && !loading)
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke={input.trim() && !loading ? "#fff" : "#9ca3af"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: "5px 14px 9px", background: "#fff", textAlign: "center" }}>
            <p style={{ fontSize: 10.5, color: "#a1a1aa", margin: 0 }}>
              Conversations are stored to improve your experience
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes duc-ping {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes duc-ping-sm {
          0%, 100% { box-shadow: 0 0 0 2.5px rgba(74,222,128,0.35); }
          50% { box-shadow: 0 0 0 4px rgba(74,222,128,0.15); }
        }
        @keyframes duc-slidein {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes duc-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        @keyframes duc-tooltip-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes duc-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        @keyframes duc-wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          70% { transform: rotate(-22deg); }
          80% { transform: rotate(12deg); }
          90% { transform: rotate(-12deg); }
        }
        .mascot-eyes { animation: duc-blink 4s ease-in-out infinite; }
        .mascot-hand { animation: duc-wave 3.2s ease-in-out infinite; }
      `}</style>
    </>
  );
}
