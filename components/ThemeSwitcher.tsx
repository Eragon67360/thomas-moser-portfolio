// app/components/ThemeSwitcher.tsx
"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            <Switch size="sm" onValueChange={theme === "dark" ? () => setTheme('light') : () => setTheme('dark')} />
        </div>
    )
};