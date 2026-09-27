"use client";
import { useEffect } from "react";

/** Records one view of the post per mount; renders nothing. */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    void fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
  }, [slug]);

  return null;
}
