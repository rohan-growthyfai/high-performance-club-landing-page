"use client";

import { useEffect } from "react";

interface MetaPixelEventsProps {
  event: "ViewContent" | "Search" | "Lead" | "CompleteRegistration";
  params?: Record<string, string | number>;
}

export default function MetaPixelEvents({ event, params = {} }: MetaPixelEventsProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", event, params);
    }
  }, [event, params]);

  return null;
}
