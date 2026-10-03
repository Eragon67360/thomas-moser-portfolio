"use client";
import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { HOVER_CAPABLE, REDUCED_MOTION, useMediaQuery } from "@/hooks/useMediaQuery";

// The 3D scene is heavy and browser-only: load it lazily, never on the server.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// Served from the site so visitors' browsers don't contact Spline. After editing the scene in Spline,
// re-download its export (https://prod.spline.design/iAkJ9isUIS3gwwqc/scene.splinecode) to this path.
const SCENE_URL = "/spline/scroll-to-top.splinecode";

// The scene is worth its weight only where the button is shown (`md:`), a mouse can play with it,
// and the visitor hasn't asked for less motion.
const SCENE_WORTHWHILE = `(min-width: 768px) and ${HOVER_CAPABLE}`;

/** A failed scene load (network, WebGL) must not take the page down: fall back to the plain button. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch() {
    this.props.onError();
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Scroll-to-top button, bottom right from `md:` up. Hidden until the page has scrolled; then a
 * plain amber arrow, replaced by the Spline 3D scene on hover-capable desktops without reduced
 * motion. The scene mounts only once the button has first become visible, pauses while hidden
 * and gives way to the plain button if it fails to load.
 */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const appRef = useRef<Application | null>(null);
  const sceneWorthwhile = useMediaQuery(SCENE_WORTHWHILE);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const showScene = sceneWorthwhile && !reducedMotion && hasBeenVisible && !sceneFailed;

  useEffect(() => {
    const onScroll = () => {
      const visible = window.scrollY > 100;
      setIsVisible(visible);
      if (visible) setHasBeenVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't burn CPU rendering an invisible scene.
  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    if (isVisible) app.play();
    else app.stop();
  }, [isVisible]);

  const onSceneLoad = (app: Application) => {
    appRef.current = app;
    if (!isVisible) app.stop();
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      inert={!isVisible}
      // `behavior` defaults to the root's CSS `scroll-behavior`: smooth, or instant under reduced motion.
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed right-5 bottom-5 z-20 hidden cursor-pointer items-center justify-center motion-safe:transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      } ${
        showScene
          ? "h-32 w-32 scale-75 lg:scale-80 xl:scale-100 hover:scale-80 lg:hover:scale-85 xl:hover:scale-110"
          : "h-12 w-12 rounded-full border border-accent/40 bg-surface text-accent shadow-lg hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {showScene ? (
        <SceneBoundary onError={() => setSceneFailed(true)}>
          <Spline className="h-full w-full" scene={SCENE_URL} onLoad={onSceneLoad} />
        </SceneBoundary>
      ) : (
        <FaArrowUp size={20} aria-hidden />
      )}
    </button>
  );
}
