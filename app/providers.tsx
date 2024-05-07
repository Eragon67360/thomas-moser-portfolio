// app/providers.tsx
'use client'
import React, { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { LanguageProvider } from '@/components/blog/LanguageContext';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <LanguageProvider>
                    {children}
                    <ProgressBar
                        height="4px"
                        color="#FFBF00"
                        options={{ showSpinner: false }}
                        shallowRouting
                    />
                </LanguageProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}