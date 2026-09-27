import type { AnchorHTMLAttributes } from "react";

/** Anchor that opens in a new tab without leaking the opener. */
export function ExternalLink({ children, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
