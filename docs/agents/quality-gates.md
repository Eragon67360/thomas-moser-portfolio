# Quality gates

Nothing is "done" until these pass and your report says exactly which ran and what they returned. There is **no CI and no test suite**: you are both. If you skip a gate, say which and why.

## Before every PR

| Gate          | Command                                                                                                                 | Pass means                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Static checks | `npm run check`                                                                                                         | typecheck (after `next typegen`), oxlint type-aware, oxfmt check and knip all clean                                            |
| Build         | `npm run build`                                                                                                         | succeeds, no new warnings; note route changes (static vs dynamic) in the build output                                          |
| Smoke         | `npm start`, then load `/`, `/about`, `/projects`, `/blog`, one post in each language, `/activities`, `/privacy`, a 404 | each renders; Deezer/Steam widgets show data, or an error message rather than an endless skeleton when credentials are missing |

Add the checks that fit the change:

- **Visible change**: before/after screenshots at **390px** and **1280px** (the site is always dark), plus keyboard and reduced-motion behaviour for anything interactive or animated ([design guardrails](design-guardrails.md#verifying-a-visual-change)).
- **SEO/GEO-relevant change** (metadata, JSON-LD, sitemap, feed, `llms.txt`, redirects): check the rendered `<head>` with `curl` (title, description, canonical on `www`, JSON-LD parses), status codes, and the rules in AGENTS.md "SEO and GEO".
- **Content change** (`content/*`): every fact traceable to the owner, his CV or his repositories; screenshots honest (or omitted); `translation` set on both posts of a pair.
- **API route or service change**: the route still answers with the documented shape, errors go through `lib/http.ts`, upstream errors (Deezer returns errors as HTTP 200) are handled, nothing secret reaches a client bundle.
- **Performance-relevant change**: measure before and after (`curl -w '%{time_starttransfer}'`, `x-vercel-cache`, the build's route table, bundle size). Numbers, not adjectives.

## Tests worth adding

There are none yet. When you add some (a Playwright smoke suite with `@axe-core/playwright` is the obvious first step, and a good candidate for the first CI workflow):

- Test what visitors and crawlers see (roles, text, status codes, headers), not implementation details.
- Never real data in fixtures: no real emails, tokens, links or personal data, even from the owner's own messages. Use made-up values.
- Flaky means a race: await the response or the settled animation, don't add retries.

## Accessibility bar

WCAG 2.2 AA: keyboard reachable, visible focus, contrast ≥ 4.5:1 for text and 3:1 for UI states (check the amber `#ffbf00` against its backgrounds with numbers), `prefers-reduced-motion` honoured (page transitions, custom cursor, hover videos, Spline), nothing conveyed by color alone, usable at 390px with no horizontal scroll, the custom cursor never hiding the system cursor's affordances on touch or keyboard use.

## The report

End every piece of work with: what changed, the exact commands run and their results, anything failed or skipped, anything risky to review, and owner steps in order.
