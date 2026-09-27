# thomasmoserdev.com

Personal website and portfolio of Thomas Moser: projects, a bilingual MDX blog with view counters and comments, and live Spotify/Steam activity.

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

| Script           | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `npm run dev`    | Development server                                         |
| `npm run build`  | Production build, then sitemap generation (`next-sitemap`) |
| `npm start`      | Serve the production build                                 |
| `npm run check`  | Type-check, lint, format check and dead-code check         |
| `npm run format` | Format the codebase with oxfmt                             |

## Writing a post

Add an `.mdx` file to `content/articles` with frontmatter:

```yaml
---
title: My post
description: One-line summary
slug: my-post
date: Apr 29, 2024
tags: ["nextjs"]
---
```

Set `published: false` to hide a draft. Articles can use `<AdBanner />`.

## Project structure

See [AGENTS.md](AGENTS.md) for the architecture, conventions and known gotchas.

## License

Code is licensed under the MIT License — see [LICENSE.md](LICENSE.md). Content is licensed under CC BY-NC-SA 4.0.
