# Design guardrails

**The design system does not change; it gets better.** The site's look is part of the owner's personal brand: a dark, warm page lit by amber, clean HeroUI cards, a playful custom cursor and 3D touch, hover-video project cards. Make it more consistent, more accessible and more polished; never replace it.

There is no separate design document: this page records the system as it is (2026-10-01). Keep it true when you add or change a token or primitive.

## The system as it is

| Part            | Where                                                                                                                     | What                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme           | `app/layout.tsx`                                                                                                          | Always dark (`<html class="dark">`); no light theme                                                                                                   |
| Accent          | `app/globals.css`                                                                                                         | HeroUI's `accent` token = amber `#ffbf00`, `accent-foreground` `#16181d`; links use `--link` = accent                                                 |
| Background      | `app/globals.css`                                                                                                         | Fixed radial gradient `#322e15` → `#16181d`                                                                                                           |
| Semantic colors | HeroUI v3                                                                                                                 | `accent`, `muted`, `surface`, `default`, `field`, `danger`… No numbered scales, no `primary`/`secondary` (AGENTS.md "HeroUI v3 cheatsheet")           |
| Fonts           | `next/font` in `app/layout.tsx`                                                                                           | Inter (`font-inter`, body) and JetBrains Mono (`font-jet`, code)                                                                                      |
| Long-form text  | `.article-prose` in `globals.css`                                                                                         | Tailwind Typography, inverted, amber links, heading scale h1 `text-3xl` → h6 `text-sm`                                                                |
| Code blocks     | `prismjs/themes/prism-okaidia.css`                                                                                        | Okaidia theme                                                                                                                                         |
| Headings        | `components/ui/Typography.tsx`                                                                                            | `PageTitle`, `SectionTitle` (`as` prop), `SectionHeader`                                                                                              |
| Links out       | `components/ui/ExternalLink.tsx`                                                                                          | Always use it for external links                                                                                                                      |
| Components      | `@heroui/react`                                                                                                           | Compound `Card`, `Modal`, `Dropdown`, `Button` (`onPress`), `Avatar`, `Separator`, forms                                                              |
| Motion          | `components/layout/PageTransition.tsx`, `components/projects/HoverVideo.tsx`, `CustomCursor.tsx`, `ScrollToTopButton.tsx` | Fade-in page transitions; hover videos only on hover-capable devices without reduced motion; desktop animated cursor; a lazily loaded Spline 3D scene |

## Invariants: never change without the owner's explicit approval

- The dark-only theme, the amber accent and the gradient background.
- Inter and JetBrains Mono.
- HeroUI v3 as the component system, and the card-based layout of projects, posts and activities.
- The signature touches: custom cursor, Spline scene, hover-video project cards, page transitions (they can be made accessible and lighter, not removed).
- The navigation structure and page set (`/`, `/about`, `/projects`, `/blog`, `/activities`).

Changing any of these is a **breaking change**: describe it with before/after screenshots and wait for a decision.

## Improvements you can make without asking

- **Accessibility**: contrast fixes within the palette (measure amber on every background it's used on), visible focus, target sizes (WCAG 2.2 §2.5.8, at least 24×24 px), accessible names, heading order, and **reduced-motion guards** where they're missing (the custom cursor and page transitions have none today; `HoverVideo` shows the pattern).
- **Consistency**: use `Typography` and `ExternalLink` everywhere they fit; replace raw hex values and arbitrary sizes with tokens; one card pattern per content type.
- **States**: skeletons that match the final layout, clear error messages in widgets (AGENTS.md requires both).
- **Performance without visual change**: image `sizes`, LCP priority, keeping heavy things (Spline, Giscus) off the critical path.

A new token or primitive is allowed when it **names something already repeated** in the code; add it, migrate the call sites in the same PR, and update the table above.

## Verifying a visual change

1. Screenshot the affected pages at **390×844** and **1280×800** before touching code (Playwright via `npx`, or the browser's device mode).
2. Take the same shots after; list every intended difference in the PR ("focus ring now visible on project cards; nothing else changed at rest").
3. Check keyboard (Tab order, focus visible, Escape closes modals and dropdowns) and reduced motion (`prefers-reduced-motion: reduce`) for anything interactive or animated.
4. Check contrast with numbers for any text or state you touched.
5. Put the screenshots in the PR; send the owner the before/after of anything he'll notice.

## Anti-patterns to refuse

- HeroUI v2/NextUI APIs (`color=`, `radius=`, `HeroUIProvider`, `Navbar`) or another component library.
- A light theme, new accent colors or gradients, new fonts, as a side effect of another change.
- Client components for things that could be server-rendered (AGENTS.md: AI crawlers mostly don't run JavaScript).
- Removing the custom cursor or the 3D scene to "fix" accessibility or performance: guard and lighten them instead, and ask if that isn't enough.
