"use client";
import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const HOVER_CAPABLE = "(hover: hover) and (pointer: fine)";

/**
 * Silent looping preview laid over the card screenshot. Nothing loads until the card is
 * hovered or focused; the video fades in once it is actually playing, so the screenshot
 * stays visible while it buffers. Skipped for reduced motion and touch devices. Decorative: the
 * screenshot underneath already describes the project, so assistive tech skips the video.
 */
export function HoverVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const card = videoRef.current?.closest<HTMLElement>("[data-project-card]");
    if (!card || matchMedia(REDUCED_MOTION).matches || !matchMedia(HOVER_CAPABLE).matches) return undefined;

    const start = () => {
      const video = videoRef.current;
      if (!video) return;
      // Attach the source on first hover, synchronously, so play() has something to load.
      if (!video.getAttribute("src")) video.src = src;
      video.currentTime = 0;
      void video.play().catch(() => {});
    };
    const stop = () => {
      setVisible(false);
      videoRef.current?.pause();
    };

    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);
    card.addEventListener("focusin", start);
    card.addEventListener("focusout", stop);
    return () => {
      card.removeEventListener("pointerenter", start);
      card.removeEventListener("pointerleave", stop);
      card.removeEventListener("focusin", start);
      card.removeEventListener("focusout", stop);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      onPlaying={() => setVisible(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full rounded-lg object-cover transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
