# thomasmoserdev.com: domain vocabulary

The words the site and its code use. Use them in issues, code names and copy; extend this file when a new term settles.

## Portfolio

- **Project**: one piece of work shown on `/projects` (`content/projects.ts`, type `Project`): title, summary, context, stack, credits (designed by / developed by), period, links (`live`, `repo`), screenshot, hover video, `featured`.
- **Featured project**: a project flagged `featured`; its card spans two columns with a larger screenshot (`ProjectCard`).
- **Screenshot**: a 1440×900 capture on Cloudinary under `thomasmoserdev.com/projects/v2/`, referenced by id. Omitted when no honest capture exists (the card shows a placeholder).
- **Hover video**: a silent 8-second loop (`public/videos/projects/<slug>.mp4`) played when a project card is hovered, on hover-capable devices without reduced motion.
- **Hover-video kit**: the capture/compose/render tooling in `resources/hover-videos/kit/`; each project's sources in `resources/hover-videos/projects/<slug>/` (or in the project's own repo).
- **Project request**: the contact modal that pre-fills an email (`mailto:`) to ask the owner for a project.

## About

- **Profile**: public contact links (`content/profile.json`); only public fields, since `config/site.ts` reaches client code.
- **Current role**, **location**, **intro**: the about page's header data (`content/about.ts`).
- **Career timeline**: `TimelineEntry` items (title, organization, place, period).
- **CV**: the one-page PDF in English, French and German, generated from `resources/cv/cv.html`.

## Blog

- **Post** (article): an MDX file in `content/articles/` with frontmatter (`title`, `description`, `slug`, `date`, `updated`, `lang`, `translation`, `tags`, `published`).
- **Translation pair**: two posts in `en` and `fr` pointing at each other through `translation`; drives hreflang and the "read in" link.
- **Views**: a post's view counter in Redis, counted once per visitor (hashed IP) per 24 h.
- **Comments**: Giscus, stored as GitHub Discussions.

## Activities

- **Activities** (`/activities`): live widgets from Deezer (recently played, top tracks, top artists) and Steam (player, games), polled through internal API routes with `useApi`.
- **Last played track**: the footer's Deezer track (Deezer has no "currently playing" endpoint).

## Site

- **Canonical host**: `https://www.thomasmoserdev.com`; every absolute URL goes through `absoluteUrl()`.
- **Social card**: the generated Open Graph image (`lib/seo/og-image.tsx`).
