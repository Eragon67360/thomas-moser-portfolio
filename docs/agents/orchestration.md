# Orchestration: running agents in parallel

This site is small, so most work fits one agent. Use parallel agents for a full audit (one auditor per dimension, read-only), or when a batch of fixes splits cleanly into packages that touch different files. The owner has called such a crew "The Swifties" on another project; any name will do.

## The lead's job

1. **Package** the work by files, not only by theme. Hot spots get a single owner per batch: `app/layout.tsx`, `app/globals.css`, `next.config.ts`, `config/*`, `lib/seo/*`, `content/*`.
2. **Brief** each implementer with the rules below, its issues, its branch and its port.
3. **Review** each branch's diff where it matters (content accuracy, anything published, headers, third-party scripts) and rerun the gates you doubt. Reports are claims.
4. **Open and merge the PRs** yourself, one at a time, and tell the remaining agents what merged and how to rebase.
5. **Keep the owner posted**; route owner-only steps to him.

## Sharing one machine

- Each agent works in its own worktree branched from `origin/dev`; nobody touches the owner's checkout.
- One build at a time: `flock /tmp/portfolio-build.lock npm run build`.
- One port per agent: `npx next start -p 32NN`.
- Production Redis is shared by every environment: no scripted visits, no key writes or deletes.

## Implementer rules (give each implementer this, adapted)

```markdown
# Crew rules

You fix GitHub issues of thomasmoserdev.com. Read CLAUDE.md, AGENTS.md and the docs/agents pages for your area,
then your issues (`gh issue view <n>`). If a proposed fix is wrong, do the better one and say why.

- Setup: `git fetch -q origin && git switch -c <branch> origin/dev` in your worktree; `npm ci`.
- Never push to main, merge, open PRs, change settings, touch the owner's checkout or print secrets.
  Push your branch when done: `git push -u origin <branch>`.
- Builds through `flock /tmp/portfolio-build.lock`; your server on port <32NN>.
- Content about the owner only from his words, CV or repos. Stay inside docs/agents/design-guardrails.md;
  before/after screenshots for visible changes.
- Before pushing: `npm run check`, `npm run build`, the smoke pages. Report exactly what ran.
- Commit as you go: English Conventional Commits, `Closes #n` / `Refs #n`, attribution lines at the end.

Final report (under 300 words): branch and commits; per issue fixed / partly / not done; commands and results;
shared files touched; risks; owner steps.
```
