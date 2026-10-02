"use client";
import { ProgressProvider } from "@bprogress/next/app";
import type { ReactNode } from "react";
import { REDUCED_MOTION, useMediaQuery } from "@/hooks/useMediaQuery";

export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  // The route-change progress bar is decorative motion: skip it under reduced motion.
  if (reducedMotion) return children;

  return (
    <ProgressProvider height="4px" color="var(--accent)" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
}
