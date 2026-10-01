# Workflow

How work moves from an idea to production, and how to work with the owner.

## The flow

```
issue (GitHub) ──► branch from origin/dev ──► PR into dev ──► gates pass ──► merge into dev
                                                                                  │
            owner says "merge it" ◄── release PR dev → main (summary of what ships)┘
                     │
                     └──► merge ──► Vercel deploys main ──► production checks
```

1. **Issue first** for anything bigger than a typo ([issue format](audit-playbook.md#issue-format)). The repo is public: write issues as public documents (no secrets, no private details about the owner).
2. **Branch** from a fresh `origin/dev` in a worktree: `git fetch origin && git worktree add ../portfolio-<topic> -b <type>/<topic> origin/dev`. Branch names: `feat/…`, `fix/…`, `perf/…`, `refactor/…`, `docs/…`, `chore/…`, `ci/…`.
3. **Commits**: English Conventional Commits, as in the history (`fix(projects): Taylor's Secret Garden links to its live address`). Subject says _what_, body says _why_; `Closes #12` / `Refs #12`. End each message with the attribution lines your harness provides.
4. **PR into `dev`**: what changed, why, how it was verified (exact commands, results, screenshots for visible changes), owner steps if any. Run the [quality gates](quality-gates.md) yourself; no CI runs on PRs.
5. **Merge into `dev`** once the gates pass. Recent feature PRs were squash-merged (`… (#14)`), older ones merged with merge commits; either is fine for a feature branch. Never squash a PR whose commit hashes are referenced elsewhere.
6. **Release** `dev` → `main` with a merge commit, only after the owner's explicit go: see [release.md](release.md).

Never delete `dev` or `main`; never pass `--delete-branch` on a release PR (its head is `dev`).

## Working with the owner

The site is about him, so he decides content and anything visible; you run the rest.

- **Recommend, don't survey.** Numbered questions, each with your recommended answer, batched in one message. He often answers "go with your recommendations"; if an answer is ambiguous, state your interpretation and proceed.
- **Facts are your job**: code, APIs, docs, the live site. Ask only for real decisions (content, taste, breaking changes, money, legal identity) and for things only he can do (dashboards, secrets, DNS).
- **Content about him** (projects, career, skills, dates) comes from him, his CV or his repositories. When something is missing, ask him; never fill the gap with a plausible guess.
- **Don't block on non-breaking calls.** Pick, proceed, report. Discuss breaking changes first.
- **Owner-only steps**: exact click-paths or commands, in order, with why; then verify the result yourself (`curl`, an API read).
- **Keep him posted** with short status lines while work runs; lead with what needs him. Report failures and mistakes plainly: what happened, the impact, the fix.
- **Ask before outward or hard-to-reverse actions** not covered here: production settings, Vercel variables, deleting anything, paid features. A refused permission is a "no": hand the step to him instead of working around it.
