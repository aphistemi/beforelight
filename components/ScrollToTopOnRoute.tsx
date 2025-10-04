"use client";

import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Resets scroll to top whenever the current route changes.
 * Also disables the browser's native scroll restoration for SPA routing.
 */
export default function ScrollToTopOnRoute() {
  const [loc] = useLocation();

  // Turn off browser scroll restoration for SPAs
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    return () => {
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    // Use 'auto' to avoid jarring smooth scroll between pages
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [loc]);

  return null;
}
