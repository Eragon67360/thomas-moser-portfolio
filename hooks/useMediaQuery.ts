"use client";
import { useCallback, useSyncExternalStore } from "react";

/** The visitor asked the system for less motion: skip decorative animation. */
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** A mouse or trackpad is driving the page (not touch, not keyboard only). */
export const HOVER_CAPABLE = "(hover: hover) and (pointer: fine)";

/**
 * Whether a media query matches, kept in sync with the browser. `false` on the server and
 * during hydration, so a component gated on it renders nothing until the client knows.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}
