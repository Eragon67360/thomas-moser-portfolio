# thomasmoserdev.com

Personal website and portfolio of Thomas Moser: projects, a bilingual MDX blog with view counters and comments, and live Deezer/Steam activity.

Built with Next.js 16, React 19, TypeScript 7, HeroUI v3 and Tailwind CSS v4.

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # fill in the values you need
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script             | Purpose                                                                       |
| ------------------ | ----------------------------------------------------------------------------- |
| `npm run dev`      | Development server                                                            |
| `npm run build`    | Production build                                                              |
| `npm start`        | Serve the production build                                                    |
| `npm run check`    | Type-check, lint, format check and dead-code check                            |
| `npm run format`   | Format the codebase with oxfmt                                                |
| `npm run test:e2e` | Playwright smoke suite against a production build (run `npm run build` first) |

## Writing a post

Add an `.mdx` file to `content/articles` with frontmatter:

```yaml
---
title: My post
description: One-line summary
slug: my-post
date: 2024-04-29 # ISO; add `updated: YYYY-MM-DD` after a substantial revision
lang: en # or fr
type: tutorial # tutorial, build-log, quick-lesson or story (the slot in the weekly rotation)
translation: fr-my-post # optional: slug of the same post in the other language
tags: ["nextjs"]
---
```

Set `published: false` to hide a draft.

**Scheduling**: a post dated in the future is already visible on previews and locally, but production lists it only from its `date` on (Paris time). Merge it ahead of time; on the day, `.github/workflows/publish-scheduled-posts.yml` redeploys production through a Vercel deploy hook (repository secret `VERCEL_DEPLOY_HOOK_URL`, a hook on `main`) so it appears that morning. Run that workflow by hand to publish at once.

## Project structure

See [AGENTS.md](AGENTS.md) for the architecture, conventions and known gotchas.

## License

Code is licensed under the MIT License — see [LICENSE.md](LICENSE.md). Content is licensed under CC BY-NC-SA 4.0.
