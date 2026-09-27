"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The 3D scene is heavy and browser-only: load it lazily, never on the server.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const SCENE_URL = "https://prod.spline.design/iAkJ9isUIS3gwwqc/scene.splinecode";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-5 z-20 hidden h-32 w-32 scale-50 transition-all md:flex md:scale-75 lg:scale-80 xl:scale-100 ${
        isVisible
          ? "cursor-pointer opacity-100 hover:scale-55 md:hover:scale-80 lg:hover:scale-85 xl:hover:scale-110"
          : "pointer-events-none opacity-0"
      }`}
    >
      <Spline className="h-full w-full" scene={SCENE_URL} />
    </button>
  );
}
