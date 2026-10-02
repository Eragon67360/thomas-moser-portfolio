# Project facts

What an agent must know before touching thomasmoserdev.com, beyond the architecture and conventions in [AGENTS.md](../../AGENTS.md). Facts below were checked on 2026-10-01; re-verify anything you rely on for a production decision.

## Hosting

| Item    | Value                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Vercel  | scope `eragon67360s-projects`, project `thomas-moser-portfolio` (`prj_wehMEpFcwNlYE4flvP7aRWjNeaQA`)                    |
| Domains | `www.thomasmoserdev.com` (canonical), `thomasmoserdev.com` → www (308), `thomas-moser-portfolio.vercel.app` → www (301) |
| GitHub  | `Eragon67360/thomas-moser-portfolio`, **public**, default branch `main`, work branch `dev`                              |
| Deploys | Vercel deploys `main` to production and every pushed branch as a preview                                                |
| Runtime | Node 24 (`.nvmrc`), npm                                                                                                 |

## External services

| Service                                                 | Used for                                                                                                                                 | Writes?                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Upstash Redis (`NEXT_UPSTASH_REDIS_*`)                  | post view counters (`pageviews:posts:*`), view deduplication (hashed IP, 24 h), home-page analytics per country (`analytics::*`, 7 days) | yes, from every environment                    |
| Deezer API (`DEEZER_TOKEN`)                             | recently played, top tracks and artists on `/activities` and the footer                                                                  | read-only, rate-limited (quota errors retried) |
| Steam Web API (`NEXT_STEAM_API_KEY`, `NEXT_STEAM_ID`)   | player and games on `/activities`                                                                                                        | read-only                                      |
| Cloudinary (`res.cloudinary.com/dluezegi8`)             | project screenshots                                                                                                                      | read-only from the site                        |
| Giscus (`NEXT_PUBLIC_COMMENT_REPOID`, `..._CATEGORYID`) | blog comments, stored as GitHub Discussions                                                                                              | by visitors, on GitHub                         |
| Vercel Analytics                                        | page views                                                                                                                               | third-party                                    |

## Environments and variables (names only)

- Every variable in Vercel targets Development, Preview **and** Production with the same value, except `NEXT_STEAM_API_KEY` (a Sensitive value for Preview/Production, a separate Development value). So **local and preview runs read and write the production Redis**: visiting a preview's home page or a post counts in production analytics.
- Used by the code: `NEXT_UPSTASH_REDIS_URL`, `NEXT_UPSTASH_REDIS_TOKEN`, `DEEZER_TOKEN`, `NEXT_STEAM_API_KEY`, `NEXT_STEAM_ID`, `NEXT_PUBLIC_COMMENT_REPOID`, `NEXT_PUBLIC_COMMENT_CATEGORYID` (see `.env.example`, `config/env.ts`).
- **Legacy names still defined in Vercel** and not read by the code any more (measured: grep finds no reference): `NEXT_SPOTIFY_*`, `NEXT_GITHUB_TOKEN`, `NEXT_REDIS_TOKEN`, `STEAM_TOKEN`, `STEAM_ID`, `DEEZER_ID`, `NEXT_STEAM_API_KEY_TEST`, `AD_SLOT`, `SITE_URL`, `NEXT_REDIRECT_TARGET`, and `NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID` since AdSense was removed (#17). Vercel flags several of them, and the live Redis token, as "readable secret" (stored as plain encrypted, not Sensitive).
- `NEXT_PUBLIC_UPSTASH_REDIS_URL` / `_TOKEN` are still defined, and `config/env.ts` falls back to them. The server-only names exist in every environment now, so AGENTS.md's condition for deleting the fallback is met. Removing the fallback is a code change; deleting the variables is the owner's.

## Content

- `content/articles/*.mdx`: blog posts (frontmatter in README; `lang` `en`/`fr`, `translation` pairs them).
- `content/projects.ts`: project cards (`slug`, `title`, `summary`, `stack`, `credits`, `period`, `links.live`/`links.repo`, `screenshot` on Cloudinary, `video` in `public/videos/projects/`, `featured`).
- `content/about.ts`: current role, location, intro, career timeline. `content/profile.json`: public contact links (published on purpose; don't add anything private).
- `public/spline/scroll-to-top.splinecode`: the 3D scroll-to-top scene, a copy of its Spline export (served from the site for privacy; re-download it after editing the scene, see `components/layout/ScrollToTopButton.tsx`).
- `resources/`: sources for generated assets: CV (`public/pdf/CV_Thomas_Moser_{EN,FR,DE}.pdf`), LinkedIn banner, and the **hover-video kit** with the sources of other projects' hover videos (`resources/hover-videos/projects/<slug>/`; captures and renders are git-ignored).
- The content accuracy rule in AGENTS.md applies to all of it.

## Known quirks

- **TypeScript 7**: no ESLint (oxlint instead), `tsc` CLI only, `next typegen` before typechecking. See AGENTS.md "Gotchas".
- **CI and tests**: `.github/workflows/ci.yml` (check name `CI`) runs `npm run check`, `npm run build` and the Playwright smoke suite (`tests/e2e/`) on pull requests and pushes to `dev`, with no credentials. Dependabot (`.github/dependabot.yml`) opens monthly grouped update PRs against `dev`. Unit tests: none.
- **Branch rules**: the "Protect main and dev" ruleset requires a PR and the `CI` check, and blocks force-pushes and deletion on `main` and `dev`; Dependabot alerts and security updates, secret scanning and push protection are on (2026-10-02).
- **oxfmt ignores** `content/**`, `public/**`, `resources/**` and the lockfile: format content by hand.
- **Always dark**: `<html class="dark">` is hard-coded; there is no light theme.
- **Language**: the site and code are English (posts can be French); commit messages are English Conventional Commits.
