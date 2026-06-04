"use client";

import { useState, useRef, useEffect } from "react";

const COUNTRIES = [
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "+1",   flag: "🇨🇦", name: "Canada" },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
];

interface PhoneInputProps {
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export default function PhoneInput({ id, name = "whatsapp", required, className = "", placeholder = "WhatsApp Number" }: PhoneInputProps) {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [number, setNumber] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex gap-2 relative" ref={dropdownRef}>
      {/* Hidden input with full number for form submission */}
      <input type="hidden" name={name} value={`${selected.code}${number}`} />

      {/* Country selector */}
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(""); }}
        className="input-premium flex items-center gap-1.5 px-3 py-3 rounded-xl text-foreground text-base whitespace-nowrap flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-lg leading-none">{selected.flag}</span>
        <span className="font-medium">{selected.code}</span>
        <svg className={`w-3 h-3 text-foreground-subtle transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:border-accent"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((c, i) => (
              <button
                key={`${c.code}-${c.name}-${i}`}
                type="button"
                onClick={() => { setSelected(c); setOpen(false); setSearch(""); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-background-elevated text-left transition-colors ${selected.code === c.code && selected.name === c.name ? "bg-accent/5 font-semibold" : ""}`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1 text-foreground">{c.name}</span>
                <span className="text-foreground-subtle">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Phone number input */}
      <input
        id={id}
        type="tel"
        required={required}
        placeholder={placeholder}
        value={number}
        onChange={e => setNumber(e.target.value.replace(/\D/g, ""))}
        className={`input-premium w-full px-4 py-3 rounded-xl text-foreground placeholder:text-foreground-subtle text-base ${className}`}
      />
    </div>
  );
}
