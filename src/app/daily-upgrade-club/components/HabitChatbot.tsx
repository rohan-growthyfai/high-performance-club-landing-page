"use client";
import { useState, useRef, useEffect, useCallback } from "react";

type Message = { role: "user" | "assistant"; content: string; id: string };

const STARTER_QUESTIONS = [
  "What is Daily Upgrade Club?",
  "How does the ₹1 trial work?",
  "What habits will I get?",
  "How is this different from apps?",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  id: "welcome",
  content:
    "Namaste! 🌱 I'm your Habit Assistant for **Daily Upgrade Club**.\n\nI'm here to help you understand how DUC works, what you get inside, and whether it's the right fit for your health journey.\n\nWhat would you like to know? 😊",
};

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
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
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
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Habit Assistant"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #16a34a 0%, #25d366 100%)",
          boxShadow: "0 8px 32px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.18)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {open ? (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <path
              d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4l4 4 4-4h4a2 2 0 002-2V4a2 2 0 00-2-2z"
              fill="#fff"
              fillOpacity="0.95"
            />
            <circle cx="8" cy="10" r="1.2" fill="#25d366" />
            <circle cx="12" cy="10" r="1.2" fill="#25d366" />
            <circle cx="16" cy="10" r="1.2" fill="#25d366" />
          </svg>
        )}
        {/* Ping animation when closed */}
        {!open && (
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#f97316",
              border: "2px solid #fff",
              animation: "duc-ping 1.8s ease-in-out infinite",
            }}
          />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            zIndex: 9998,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(580px, calc(100vh - 120px))",
            borderRadius: 20,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
            animation: "duc-slidein 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0f4c2a 0%, #16a34a 60%, #25d366 100%)",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                border: "2px solid rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              🌱
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0, lineHeight: 1.2 }}>
                Habit Assistant
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, margin: 0, marginTop: 2 }}>
                Daily Upgrade Club · Always here
              </p>
            </div>
            {/* Online dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 0 2px rgba(74,222,128,0.3)",
                }}
              />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Online</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 8,
                width: 28,
                height: 28,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                marginLeft: 4,
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              background: "#f8fdf9",
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
                  gap: 8,
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#16a34a,#25d366)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
                    }}
                  >
                    🌱
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius:
                      m.role === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg,#16a34a,#25d366)"
                        : "#fff",
                    color: m.role === "user" ? "#fff" : "#18181b",
                    fontSize: 14,
                    lineHeight: 1.65,
                    boxShadow:
                      m.role === "user"
                        ? "0 4px 14px rgba(37,211,102,0.35)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                    border: m.role === "assistant" ? "1px solid #e8f5e9" : "none",
                  }}
                >
                  <MarkdownText text={m.content} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#16a34a,#25d366)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  🌱
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "#fff",
                    border: "1px solid #e8f5e9",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                        background: "#25d366",
                        animation: `duc-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
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
                padding: "8px 12px",
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
                    border: "1.5px solid #25d366",
                    color: "#16a34a",
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
              padding: "10px 12px",
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
                (e.target as HTMLInputElement).style.borderColor = "#25d366";
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
                    ? "linear-gradient(135deg,#16a34a,#25d366)"
                    : "#e5e7eb",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s, transform 0.15s",
                boxShadow:
                  input.trim() && !loading ? "0 4px 14px rgba(37,211,102,0.35)" : "none",
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
          <div
            style={{
              padding: "6px 14px 10px",
              background: "#fff",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 10.5, color: "#9ca3af", margin: 0 }}>
              Conversations are stored to improve your experience
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes duc-ping {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes duc-slidein {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes duc-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
