# Safety: secrets, data and production

A personal portfolio has little data, but it is **public**, about a real person, and its secrets sit in a public repository's deployment. Most harm here comes from leaks and from writes landing in production.

## The repository is public

- Anything committed is published, history included. Never commit secrets, `.env*` files, private notes about the owner, or screenshots that show dashboards, tokens or emails.
- If a secret is committed or printed: tell the owner at once (what, where, since when, which key to rotate where). A history rewrite doesn't un-publish it; rotation does.
- Write issues and PRs as public documents. For a vulnerability, describe impact and fix; keep exploit steps out until it's fixed and deployed.

## Secrets

- Never print, echo, paste or quote a secret. Read only what you need **inside** a process (`node --env-file=.env.local -e '…'`) and print harmless facts (a hostname, a length, a boolean).
- Never `source .env.local` or `set -a`: values with `&` or spaces break the shell and end up printed.
- Vercel variables: list **names and targets only** (`vercel env ls` or the API without decrypting). Values are the owner's to set; give him exact steps.
- `NEXT_PUBLIC_*` ships to every browser: only genuinely public values (the Giscus ids) may use it. Secrets go through `env.*()` in `config/env.ts`.
- Tokens, links or passwords the owner pastes while testing are **not** test data.

## What writes where

| Action                                                              | Writes to                                                                  | Rule                                                                                                                                                                                        |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running the site locally or on a preview, with the shared variables | **production Upstash Redis**: post views, view-dedupe keys, home analytics | Fine for normal browsing; never load-test, script visits or delete keys. Anything that writes or deletes keys on purpose needs the owner's OK and a dry run (count the matching keys first) |
| Deezer and Steam API calls                                          | nothing (read-only), but they consume quota                                | Don't hammer them in loops or tests; respect the retry/backoff in the services                                                                                                              |
| Giscus comments                                                     | GitHub Discussions of the configured repo                                  | Never post test comments on the live site                                                                                                                                                   |
| `public/pdf`, `public/videos`, Cloudinary                           | published assets                                                           | Regenerate from `resources/` sources; never upload or delete on Cloudinary without the owner                                                                                                |

## Third-party settings (Vercel, Upstash, Cloudinary, Google, GitHub)

- Reading settings through an API to verify something is fine; changing them needs the owner's explicit OK for that change. Paid features are always his decision.
- **Order matters**: deploy the code that handles a setting before the setting goes live. Write the order in the PR, then verify each step as he completes it.
- Settings changes leave no diff: record them in the issue or PR they belong to.

## Security review checklist

- **API routes** (`app/api/*`): thin, inputs validated (`/api/views` only counts existing slugs, keep it that way), upstream errors handled, responses cacheable where public, no secret or upstream raw payload leaked to the client.
- **Server-only boundary**: `import "server-only"` on services, `config/env.ts`, `lib/redis.ts`, `lib/mdx.ts`, `lib/api.ts`; never imported from a client file.
- **MDX**: posts are trusted (written by the owner); still, no remote MDX, and components exposed to MDX stay a short allowlist.
- **Third-party scripts** (Giscus, Analytics, Spline): loaded with the right strategy, and only with the consent the law requires ([audit playbook](audit-playbook.md#5-privacy-legal-and-content)).
- **Headers** live in `next.config.ts` (#22): a CSP listing only the origins the site uses (self, plus the Giscus frame; the Vercel Toolbar only on previews), `nosniff`, `X-Frame-Options: DENY` and `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`, no `X-Powered-By`; Vercel adds HSTS. A new third party (script, frame, fetch, image host) needs a CSP entry **and** a line in the privacy policy; verify a change with the browser console on a preview (one harmless `script-src` report per page comes from Spline's `Function()` fallback).
- **Images**: remote hosts stay limited to the patterns in `next.config.ts`.
