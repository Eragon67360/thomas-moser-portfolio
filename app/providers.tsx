// app/providers.tsx
"use client";
import React, { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Analytics } from "@vercel/analytics/react";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
          <ProgressBar
            height="4px"
            color="#FFBF00"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Analytics />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
