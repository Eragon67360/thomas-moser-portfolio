"use client";
import { useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import { HOVER_CAPABLE, REDUCED_MOTION, useMediaQuery } from "@/hooks/useMediaQuery";

const CLICKABLES = [
  "a",
  "button",
  "input[type='text']",
  "input[type='email']",
  "input[type='number']",
  "input[type='submit']",
  "label[for]",
  "select",
  "textarea",
  "[role='button']",
  "[role='menuitem']",
];

/**
 * Animated cursor for mouse and trackpad users who haven't asked for reduced motion. It hides
 * the system cursor, so it mounts only while `(hover: hover) and (pointer: fine)` matches:
 * touch devices, narrow windows and keyboard-only visitors keep the system cursor.
 */
export function CustomCursor() {
  const hoverCapable = useMediaQuery(HOVER_CAPABLE);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const enabled = hoverCapable && !reducedMotion;

  // react-animated-cursor sets `cursor: none` inline on body and clickables but never undoes
  // it; restore the system cursor when the pointer or motion preference changes.
  useEffect(() => {
    if (!enabled) return undefined;
    return () => {
      document.body.style.cursor = "";
      for (const el of document.querySelectorAll<HTMLElement>(CLICKABLES.join(","))) el.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={8}
      color="128,128,128"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={CLICKABLES}
    />
  );
}
