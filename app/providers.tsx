"use client";
import { ProgressProvider } from "@bprogress/next/app";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider height="4px" color="#ffbf00" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
}
