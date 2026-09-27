"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/site";

/** Hides on scroll down, reappears on scroll up. */
function useHideOnScroll(threshold = 64) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > threshold);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}

export function Navigation() {
  const hidden = useHideOnScroll();

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/30 font-jet backdrop-blur-lg transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-center gap-4 px-6 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12">
        {mainNav.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-xs text-foreground transition-colors hover:text-accent sm:text-sm md:text-base lg:text-lg xl:text-xl"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
