# Audit playbook

Use this when asked to "study the project", find loopholes or improvements, or audit one area. The output is a set of well-formed GitHub issues and a tracking issue; the fixes follow.

## Phases

1. **Audit, read-only.** One pass per dimension below (subagents in parallel for a full audit, or one after the other). Read code, run read-only commands, measure the live site with `curl`. Change nothing: no commits, no settings, no writes.
2. **Triage.** Merge duplicates, drop what's already fixed, separate agent work from owner decisions, order by severity.
3. **Ask the owner, once**: numbered questions with recommended answers ([workflow](workflow.md#working-with-the-owner)). Don't block agent-ready work on them.
4. **File issues** ([format](#issue-format)) and one tracking issue grouping them into work packages.
5. **Fix, release, close the loop** on the tracking issue.

## Evidence standards

- Every finding cites **where** (`path:line`, URL, setting) and **how you know**: **Measured** (a reproducible command or check, shown) or **Estimated** (an inference, with the reasoning).
- Severity: **P0** live harm now (leak, broken site, legal exposure); **P1** real damage or compounding risk (SEO, performance, accessibility failures, missing safety nets); **P2** quality and debt.
- Search before declaring something missing. Prefer root causes over symptoms.
- The repo is public: issues describe impact and fix, never exploit steps for unfixed problems.

## Dimensions and starting points

Facts flagged ⚑ were found on 2026-10-01: verify them first.

### 1. Security

- ⚑ No security headers beyond HSTS; `X-Powered-By: Next.js` sent (measured, `curl -sI https://www.thomasmoserdev.com/`).
- API routes (`app/api/*`): input validation, caching, upstream quota exposure (anyone can trigger Deezer/Steam calls through the proxies: are responses cached?), `/api/views` abuse (per-IP dedupe, existing slugs only).
- Env hygiene: ⚑ legacy and unused Vercel variables, Redis token stored as non-Sensitive, the `NEXT_PUBLIC_UPSTASH_*` fallback still in `config/env.ts` ([project](project.md#environments-and-variables-names-only)).
- Third-party scripts and their permissions; dependency alerts (⚑ Dependabot alerts are off).

### 2. SEO and GEO

- Already strong (AGENTS.md "SEO and GEO"): verify it holds in production rather than rebuild it. Canonicals on `www`, JSON-LD validity per page type, sitemap and feed freshness, `llms.txt`, hreflang pairs, OG images, 404 behaviour, internal linking between projects and posts.
- GEO: is the owner quotable on his own name and skills? Answer-first about/project copy in server-rendered HTML.

### 3. Design and accessibility

- Within [design guardrails](design-guardrails.md): WCAG 2.2 AA keyboard paths (navigation, the contact dropdown and modal), focus, contrast of amber text, reduced motion (⚑ the custom cursor and page transitions have no reduced-motion guard), 390px layout, alt text on project screenshots.
- No axe scan exists: run one ad hoc (`@axe-core/playwright` via `npx`) and propose adding it.

### 4. Performance

- No field data: Vercel Analytics is installed, Speed Insights isn't (adding it is the owner's call; it can be paid). Lab LCP/INP per page; the weight and loading strategy of Spline, the animated cursor and hover videos; ISR vs dynamic per route (AGENTS.md's Redis `cache: "default"` gotcha); image sizes from Cloudinary.

### 5. Privacy, legal and content

- The privacy policy (`app/privacy/page.tsx`) and legal notice (`app/legal/page.tsx`) describe the site as of 2026-10 (#18: AdSense removed, salted view dedupe, Giscus lazy-loaded, Spline scene self-hosted). Re-check them whenever a third party, a browser storage, a retention period or the owner's status (personal, non-professional site) changes: measure third-party requests with Playwright, not by reading the code alone.
- Content accuracy: every project and career fact traceable (AGENTS.md); screenshots honest; links alive (`links.live`, `links.repo`); hover videos current.

### 6. Engineering and delivery

- ⚑ No CI: propose a GitHub Actions workflow running `npm run check` and `npm run build` on PRs (and a smoke/axe suite once it exists).
- ⚑ "Protect main" ruleset disabled (public repos can enforce rulesets for free): propose enabling it with a required PR (and required checks once CI exists).
- Dependency updates (no Dependabot config), knip findings, stale docs.

## Issue format

```markdown
## Why

What is wrong or missing, and the impact on visitors, recruiters or the owner.

## Where

`path:line`, URL, setting, and the evidence (Measured: command + output / Estimated: reasoning).

## Proposed fix

What to change, and what not to change (design guardrails, URLs, content accuracy).

## Done when

Observable acceptance criteria, including how it's verified.
```

Labels: `audit-YYYY-MM`, an area label (`area:security`, `area:seo-geo`, `area:design-a11y`, `area:performance`, `area:privacy-legal`, `area:ci-devex`), and `ready-for-agent`, `ready-for-human` or `needs-info`. Create missing labels with `gh label create`.

## Auditor brief (template)

> You are auditing thomasmoserdev.com for **<dimension>**. Read `CLAUDE.md`, `AGENTS.md`, `docs/agents/project.md`, `safety.md` and `audit-playbook.md` first. Read-only: no commits, no writes, no settings, no secrets printed. Measure the live site with `curl` where useful. Return at most 12 findings, most severe first: title, P0/P1/P2, Measured/Estimated, where, evidence, proposed fix, done-when, owner decision needed or not. Under 1,000 words.
