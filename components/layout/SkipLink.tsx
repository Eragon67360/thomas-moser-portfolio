/**
 * First in the tab order: lets keyboard users jump past the navigation to `main#content`.
 * Visually hidden until focused, then an amber pill over the header.
 */
export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-jet focus:text-sm focus:font-semibold focus:text-accent-foreground focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    >
      Skip to content
    </a>
  );
}
