// app/providers.tsx
'use client'
import React, { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                {children}
                <ProgressBar
                    height="4px"
                    color="#FFBF00"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </NextThemesProvider>
        </NextUIProvider>
    )
}