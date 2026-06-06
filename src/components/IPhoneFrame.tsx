import { ReactNode } from "react";

/**
 * IPhoneFrame — reusable iPhone shell.
 * Wraps any content (typically a WhatsApp chat area) inside a realistic iPhone visual.
 * Used in ScreenshotWall and WhatsAppPreview.
 */

interface IPhoneFrameProps {
  contactName?: string;
  contactStatus?: string;
  children: ReactNode;
  width?: number;
}

export default function IPhoneFrame({
  contactName = "High Performance Club",
  contactStatus = "online",
  children,
  width = 270,
}: IPhoneFrameProps) {
  return (
    <div style={{ width, position: "relative", userSelect: "none" }}>
      {/* iPhone shell */}
      <div style={{
        background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)",
        borderRadius: 44,
        padding: "10px 8px",
        boxShadow: [
          "0 0 0 1px #3a3a3a",
          "0 0 0 2px #111",
          "0 32px 64px -12px rgba(0,0,0,0.55)",
          "0 12px 32px -8px rgba(0,0,0,0.4)",
          "inset 0 1px 0 rgba(255,255,255,0.08)",
        ].join(", "),
      }}>
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 198, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
          {/* Dynamic Island */}
          <div style={{
            position: "relative",
            background: "#1da851",
            paddingTop: 12,
            display: "flex",
            justifyContent: "center",
          }}>
            <div style={{
              width: 120,
              height: 34,
              background: "#000",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2a2a2a" }} />
              </div>
              <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
            </div>
          </div>

          {/* Status bar */}
          <div style={{
            background: "#1da851",
            padding: "8px 16px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11,
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
          }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="rgba(255,255,255,0.85)">
                <rect x="0" y="4" width="3" height="8" rx="1"/>
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/>
                <rect x="9" y="1" width="3" height="11" rx="1"/>
                <rect x="13.5" y="0" width="2.5" height="12" rx="1" fillOpacity="0.3"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="rgba(255,255,255,0.85)">
                <path d="M8 2C5.2 2 2.7 3.2 1 5.2L2.5 6.7C3.8 5.1 5.8 4 8 4s4.2 1.1 5.5 2.7L15 5.2C13.3 3.2 10.8 2 8 2z"/>
                <path d="M8 5.5C6.3 5.5 4.8 6.2 3.7 7.3L5.2 8.8C6 8 6.9 7.5 8 7.5s2 0.5 2.8 1.3L12.3 7.3C11.2 6.2 9.7 5.5 8 5.5z"/>
                <circle cx="8" cy="10.5" r="1.5"/>
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
            </div>
          </div>

          {/* WhatsApp nav bar */}
          <div style={{
            background: "#1da851",
            padding: "8px 12px 10px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "none",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg, #1da851, #1ea84f)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "#fff",
              fontFamily: "var(--font-sans)", flexShrink: 0,
            }}>H</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 4 }}>
                {contactName}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#4fc3f7"/>
                  <path d="M6.5 12.5l3.5 3.5 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "var(--font-sans)", marginTop: 2 }}>
                {contactStatus}
              </p>
            </div>
          </div>

          {/* Chat content — passed as children */}
          {children}

          {/* Home bar */}
          <div style={{
            background: "#efeae2",
            padding: "8px 0 12px",
            display: "flex",
            justifyContent: "center",
          }}>
            <div style={{ width: 120, height: 5, background: "rgba(0,0,0,0.15)", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
