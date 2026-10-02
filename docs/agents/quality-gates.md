# Quality gates

Nothing is "done" until these pass and your report says exactly which ran and what they returned. CI runs the first three gates on every PR, but it only tells you after you push: run them yourself first. If you skip a gate, say which and why.

## Before every PR

| Gate          | Command                                                                                                           | Pass means                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static checks | `npm run check`                                                                                                   | typecheck (after `next typegen`), oxlint type-aware, oxfmt check and knip all clean                                                                                                                              |
| Build         | `npm run build`                                                                                                   | succeeds, no new warnings; note route changes (static vs dynamic) in the build output                                                                                                                            |
| Smoke         | `npm run test:e2e` (Playwright, Chromium, against the build; starts `next start -p 3220` or reuses a running one) | every page renders with one `h1`, canonical on `www`, valid JSON-LD, no unexpected third-party origin, no horizontal scroll at 390px; machine routes answer; widgets end in an error message without credentials |

The suite starts the site with the Redis, Deezer and Steam variables forced empty (`webServer.env` in `playwright.config.ts`), so a local `.env.local` can't make a test run write production counters or burn quota. Pick another port with `PORT=32NN npm run test:e2e`. A failing test caused by a site bug gets `test.fixme(true, "reason")`, never a fix in unrelated code. Load the pages yourself too when you change something the suite doesn't cover.

## CI

`.github/workflows/ci.yml` runs one job, **`CI`** (the required status check), on pull requests to `dev`/`main` and pushes to `dev`: Node from `.nvmrc`, `npm ci`, `npm run check`, `npm run build`, Chromium, `npm run test:e2e`; the Playwright report is uploaded on failure. It runs without secrets on purpose and fails if a credential or an env file shows up.

Add the checks that fit the change:

- **Visible change**: before/after screenshots at **390px** and **1280px** (the site is always dark), plus keyboard and reduced-motion behaviour for anything interactive or animated ([design guardrails](design-guardrails.md#verifying-a-visual-change)).
- **SEO/GEO-relevant change** (metadata, JSON-LD, sitemap, feed, `llms.txt`, redirects): check the rendered `<head>` with `curl` (title, description, canonical on `www`, JSON-LD parses), status codes, and the rules in AGENTS.md "SEO and GEO".
- **Content change** (`content/*`): every fact traceable to the owner, his CV or his repositories; screenshots honest (or omitted); `translation` set on both posts of a pair.
- **API route or service change**: the route still answers with the documented shape, errors go through `lib/http.ts`, upstream errors (Deezer returns errors as HTTP 200) are handled, nothing secret reaches a client bundle.
- **Performance-relevant change**: measure before and after (`curl -w '%{time_starttransfer}'`, `x-vercel-cache`, the build's route table, bundle size). Numbers, not adjectives.

## Tests worth adding

The smoke suite lives in `tests/e2e/` (`pages`, `activities`, `machine-routes`, shared fixtures). Extend it with the change you make; an axe check (`@axe-core/playwright`) joins once the open accessibility findings are fixed, so it doesn't start red.

- Test what visitors and crawlers see (roles, text, status codes, headers), not implementation details.
- Never real data in fixtures: no real emails, tokens, links or personal data, even from the owner's own messages. Use made-up values.
- Flaky means a race: await the response or the settled animation, don't add retries.

## Accessibility bar

WCAG 2.2 AA: keyboard reachable, visible focus, contrast ≥ 4.5:1 for text and 3:1 for UI states (check the amber `#ffbf00` against its backgrounds with numbers), `prefers-reduced-motion` honoured (page transitions, custom cursor, hover videos, Spline), nothing conveyed by color alone, usable at 390px with no horizontal scroll, the custom cursor never hiding the system cursor's affordances on touch or keyboard use.

## The report

End every piece of work with: what changed, the exact commands run and their results, anything failed or skipped, anything risky to review, and owner steps in order.
