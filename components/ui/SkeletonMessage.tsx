import type { ReactNode } from "react";

/**
 * A widget's message (error, empty) centred over the space its skeleton occupied, so the page
 * doesn't jump when the data fails to arrive. The skeleton is kept in the layout but hidden:
 * `visibility: hidden` takes it out of the accessibility tree and off the screen, yet it still
 * sizes the box exactly like the loading state did, at every viewport width. The hidden copy is laid
 * out like the panels lay out their items (a centred wrapping row), so tiles wrap the same way.
 */
export function SkeletonMessage({ skeleton, children }: { skeleton: ReactNode; children: ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="invisible flex flex-wrap justify-center gap-4" aria-hidden>
        {skeleton}
      </div>
      <p className="absolute inset-0 flex items-center justify-center p-4 text-center text-muted">{children}</p>
    </div>
  );
}
