"use client";

import { useEffect } from "react";

/**
 * ScrollToTop — forces the page to scroll to the top on every load/reload.
 * Overrides browser's default scroll restoration which remembers scroll position.
 */
export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
