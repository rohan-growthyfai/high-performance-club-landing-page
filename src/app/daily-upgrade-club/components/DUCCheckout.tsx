"use client";
import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    fbq?: (...args: unknown[]) => void;
  }
}

interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open(): void;
  close(): void;
}

const ENGINE_URL = "https://hpc-whatsapp-engine-production.up.railway.app";

function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff" />
    </svg>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ctaLabel?: string;
}

export default function DUCCheckout({ isOpen, onClose, ctaLabel }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load Razorpay script once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("rzp-script")) return;
    const script = document.createElement("script");
    script.id = "rzp-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedPhone = phone.replace(/\D/g, "");
    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (trimmedPhone.length < 10) { setError("Please enter a valid 10-digit WhatsApp number."); return; }

    setLoading(true);
    try {
      // Step 1: Create subscription on our server
      const resp = await fetch(`${ENGINE_URL}/duc/create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: trimmedPhone, email: email.trim() }),
      });
      const data = await resp.json();
      if (!data.ok || !data.subscription_id) {
        throw new Error(data.error || "Could not initiate payment. Please try again.");
      }

      // Subscription checkout — shows ₹1 now + ₹99/month mandate setup in one screen
      const rzp = new window.Razorpay({
        key: data.key_id,
        subscription_id: data.subscription_id,
        name: "Daily Upgrade Club",
        description: "₹1 for 7 days · then ₹99/month",
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: { color: "#1da851" },
        handler: () => {
          setSuccess(true);
          window.fbq?.("track", "Purchase", { value: 1, currency: "INR" });
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });
      rzp.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
      setLoading(false);
    }
  }, [name, phone, email]);

  if (!isOpen) return null;

  if (success) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md rounded-3xl p-8 text-center"
          style={{ background: "#fff" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">You&apos;re in!</h2>
          <p className="text-gray-600 mb-1">Payment successful. Check WhatsApp on <strong>+91 {phone}</strong> — your first message is on its way!</p>
          <p className="text-sm text-gray-400 mt-4">You&apos;ll receive a WhatsApp message within 60 seconds.</p>
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-full font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}
          >
            Got it ✓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#fff" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Green header */}
        <div className="px-6 pt-6 pb-5" style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white"
            style={{ background: "rgba(255,255,255,0.2)" }}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-1">
            <WAIcon />
            <span className="font-black text-white text-lg">Daily Upgrade Club</span>
          </div>
          <p className="text-white text-sm opacity-90">7-day trial for ₹1 · Then ₹99/month · Cancel anytime</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <p className="text-sm text-gray-500" style={{ marginTop: -4 }}>
            🔒 Your details are encrypted. We never spam — promise.
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Priya Sharma"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-green-500"
              style={{ background: "#fafafa" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">WhatsApp Number</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700" style={{ background: "#fafafa", whiteSpace: "nowrap" }}>
                🇮🇳 +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="9876543210"
                required
                maxLength={10}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-green-500"
                style={{ background: "#fafafa" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Email <span className="text-gray-400 font-normal">(for receipts)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="priya@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-green-500"
              style={{ background: "#fafafa" }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-base"
            style={{
              background: loading ? "#9ca3af" : "linear-gradient(135deg,#1da851,#25d366)",
              boxShadow: loading ? "none" : "0 6px 20px rgba(37,211,102,0.4)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block" style={{ animation: "spin 1s linear infinite" }}>⏳</span> Opening secure checkout...
              </>
            ) : (
              <>
                <WAIcon />
                {ctaLabel || "Join Daily Upgrade Club → ₹1"}
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Join <strong className="text-gray-600">1,800+ members</strong> · Cancel anytime
          </p>
        </form>
      </div>
    </div>
  );
}
