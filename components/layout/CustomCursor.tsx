"use client";
import AnimatedCursor from "react-animated-cursor";

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

/** Desktop-only animated cursor. */
export function CustomCursor() {
  return (
    <div className="hidden sm:block">
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="128,128,128"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={CLICKABLES}
      />
    </div>
  );
}
