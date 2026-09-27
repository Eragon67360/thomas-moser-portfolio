# AGENTS.md

Guidance for AI agents and contributors working on this repository.

## Stack

| Concern   | Choice                                                                     |
| --------- | -------------------------------------------------------------------------- |
| Runtime   | Node.js 24 (`.nvmrc`), npm                                                 |
| Framework | Next.js 16 App Router, React 19, `proxy.ts` (formerly middleware)          |
| Language  | **TypeScript 7** (native compiler, `tsc` binary only — no JS compiler API) |
| UI        | **HeroUI v3** (React Aria based, compound components) + Tailwind CSS v4    |
| Content   | MDX in `content/articles`, compiled server-side with `@mdx-js/mdx`         |
| Data      | Upstash Redis (view counters, analytics), Deezer API, Steam Web API        |
| Lint      | **oxlint** + `oxlint-tsgolint` (type-aware). Not ESLint — see _Gotchas_    |
| Format    | **oxfmt** (`printWidth` 120)                                               |
| Dead code | knip                                                                       |

## Commands

```bash
npm run dev          # local dev server
npm run build        # production build (+ next-sitemap postbuild)
npm run check        # typecheck + lint + format check + knip — run before every commit
npm run format       # apply formatting
```

`npm run typecheck` runs `next typegen` first: route types such as `PageProps<"/blog/[slug]">` live in `.next/types`.

## Architecture

Dependencies point downward only: `app → components → hooks → lib/types`, and `app/api → services → lib/config/types`.

```
app/            Routes only. Pages compose components; no data shaping, no fetch logic.
  api/          Thin route handlers: call one service, return JSON via `jsonRoute` (lib/api.ts).
components/     UI grouped by feature (blog, deezer, steam, contact, layout, ui, ...).
                Server Components by default; "use client" only on interactive leaves.
config/         env.ts (server-only, lazy env access) and site.ts (site metadata, navigation).
content/        Articles (MDX), profile.json, projects.ts, about.ts. Not publicly served.
hooks/          Client hooks (useApi = typed SWR polling, useActiveHeading).
lib/            Framework-level helpers: http boundary, redis client, mdx compiler, request info.
services/       Server-only data access. Owns upstream API shapes; exposes DTOs from types/.
types/          DTOs shared by services, API routes and client components.
proxy.ts        Next.js 16 proxy: records home page views (non-blocking via waitUntil).
```

### Rules

- **Server-only code** (`services/`, `config/env.ts`, `lib/redis.ts`, `lib/mdx.ts`, `lib/api.ts`) starts with `import "server-only"`. Never import it from a `"use client"` file.
- **Upstream shapes stay in services.** Raw Deezer/Steam JSON types are private to their service; everything else consumes `types/*` DTOs.
- **One JSON trust boundary:** parse HTTP JSON through `lib/http.ts` (`fetchJson` / `readJson`). Don't sprinkle `as T` casts on `response.json()`.
- **Secrets never use `NEXT_PUBLIC_`.** Only genuinely public values (AdSense client id, Giscus ids) may. Read secrets through `env.*()` in `config/env.ts`.
- **API routes are internal**: they back client widgets that poll via `useApi`. Keep them thin; logic belongs in services.
- **Client components** fetch only through `useApi(path)`; show a skeleton while loading and a message on error.
- Named exports for components; default exports only where Next.js requires them (pages, layouts, route config).
- Keep `npm run check` green. Don't disable lint rules globally; a targeted `oxlint-disable-next-line` needs a `--` reason.

## Content accuracy (projects and about)

- `content/projects.ts` and `content/about.ts` describe a real person's work and career. Every fact must trace to his own answers, his CV, or his repositories; never add employers, dates, titles or claims from inference.
- Project screenshots are 1440x900 captures uploaded to Cloudinary under `images/upload/thomasmoserdev.com/projects/v2/`; the `screenshot` field is the id relative to `projects/`. Omit it when no honest screenshot exists: the card renders a placeholder.
- `config/site.ts` is bundled into client code, so `profile` lists only public fields.

## HeroUI v3 cheatsheet

v3 is not v2 (NextUI). There is **no** `HeroUIProvider`, `Navbar`, `Image`, `Divider`, `useDisclosure`, `color=` or `radius=` prop.

- Compound components: `Card` → `Card.Header / Card.Title / Card.Content / Card.Footer`; `Modal` → `Modal.Backdrop > Modal.Container > Modal.Dialog > Modal.Header/Body/Footer`; `Dropdown` → `Button` trigger + `Dropdown.Popover > Dropdown.Menu > Dropdown.Item` (use `id` + `textValue`, children `Label`/`Description`).
- Controlled overlays: `useOverlayState()`; pass `isOpen/onOpenChange` to `Modal.Backdrop`.
- Buttons: `variant="primary" | "secondary" | "tertiary" | "ghost" | "outline" | "danger"`, `onPress` (not `onClick`).
- Forms: `Form` + `TextField` (with `Label`, `Input`/`TextArea`, `FieldError`) + `RadioGroup`/`Radio.Content/Control/Indicator`.
- Separators: `Separator`. Images: `next/image` (allowlist hosts in `next.config.ts`).
- Colors are semantic tokens: `accent` (site amber `#ffbf00`), `muted`, `surface`, `default`, `field`, `danger`… No numbered scales (`primary-500`) and no `primary`/`secondary`. Theme overrides live in `app/globals.css`.
- Docs for agents: `https://heroui.com/llms.txt`; each page is available as raw markdown by appending `.mdx` (e.g. `/en/docs/react/migration/modal.mdx`).

## Gotchas

- **ESLint cannot run on TypeScript 7.** `typescript-eslint` (and therefore `eslint-config-next`) needs the TS JS API, which TS 7 does not ship. oxlint covers the Next.js, React, React Hooks, jsx-a11y and import rules natively, and its type-aware mode runs on tsgolint (TS 7). Do not reintroduce ESLint until typescript-eslint supports TS 7.
- **Next.js type-checks via the `tsc` CLI** with TS 7. Next may rewrite `tsconfig.json` (e.g. `esModuleInterop`); that is expected.
- **Upstash Redis must use `cache: "default"`** (see `lib/redis.ts`). Its default `no-store` forces any page that reads a counter into dynamic rendering and breaks ISR.
- **`NextRequest.ip` / `.geo` no longer exist.** Use `lib/request.ts` (Vercel headers).
- **Route params are async** in Next.js 16: `const { slug } = await params`.
- Don't wrap service calls that may run during prerendering in a catch-all that hides Next's dynamic-rendering signal; prefer making the call static-safe.
- `config/env.ts` still falls back to the legacy `NEXT_PUBLIC_UPSTASH_REDIS_*` names. Once the deployment defines `NEXT_UPSTASH_REDIS_URL/TOKEN`, delete that fallback and the legacy variables.
- `config/site.ts` is bundled into client components: add only fields that are safe to publish.
- **Deezer reports errors as HTTP 200** with an `error` object in the body; `services/deezer.service.ts` checks both and retries quota errors (code 4) with backoff. It has no "currently playing" endpoint — the footer shows the last played track instead.
- `react-animated-cursor` declares a React 18 peer; `package.json` `overrides` pins it to our React.

## Environment

Copy `.env.example` to `.env.local`. Missing variables only break the feature that needs them (env is read lazily).

## Verifying changes

1. `npm run check`
2. `npm run build`
3. `npm start` and load `/`, `/about`, `/projects`, `/blog`, a post, `/activities`. Widgets backed by Deezer/Steam show an error message (not an endless skeleton) when credentials are invalid.
