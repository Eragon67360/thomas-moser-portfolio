# Lessons

Mistakes and near-misses from working this way on the owner's projects (most from Taylor's Secret Garden, a sister project with the same owner and workflow). Each is a rule because it cost something once.

## Production and settings

- **Code first, settings after.** On the sister site, auth and email settings switched on before their code was deployed broke sign-in for everyone. Any PR that needs a dashboard change lists the steps in order, after the deploy.
- **Preview and local runs can write to production.** Here they share the production Redis ([safety](safety.md#what-writes-where)).
- **Verify settings through the API, but trust tested behaviour.** When a flag and a real test disagree, report the discrepancy; the test usually wins.
- **Don't promise what the site can't do.** Legal and help pages describe the product as it is, not as planned.

## Secrets and data

- **Never `source` an env file.** A value containing `&` split in the shell and printed a production password, which had to be rotated. Use `node --env-file`.
- **Never reuse what the owner pastes.** A real reset token from a chat ended up in a test fixture, in git. Fixtures are always made up, and here git is public.
- **Credits don't make media legal.** Provenance checks on the sister site found unlicensed photos. Use the owner's own screenshots and captures, or licensed media with credits.

## Git and the owner's machine

- **Never change the owner's checkout.** A branch created in his working copy for one task left it on that branch afterwards. Work in a worktree; read with `git show origin/dev:path`.
- **Merge commits for mass rewrites** (formatting passes), so their hashes stay valid for `.git-blame-ignore-revs`.
- **`Closes #n` only closes on the default branch**: issues fixed on `dev` stay open until the release reaches `main`.

## Content

- **Facts about the owner are never inferred.** Projects, roles, dates and skills come from him, his CV or his repositories (AGENTS.md "Content accuracy"). The career timeline already needed one correction (`fix(about): correct the career timeline`).
- **Other projects' sources live here.** The hover-video kit holds sources for other repos' previews (`resources/hover-videos/projects/`); update them here, render, and copy the MP4 to `public/videos/projects/`.

## Parallel agents and reviews

- **One build at a time, one port per agent, one owner per shared file.**
- **Agents' reports are claims.** Review the diff where it matters, rerun what you doubt.
- **Commit as you go.** A crashed session keeps worktrees but loses uncommitted work.

## Communication

- **Lead with what needs the owner**, in order, with exact steps.
- **When you get something wrong, say so plainly**: what happened, the impact, the fix.
- **Label uncertainty**: "measured" and "estimated" are different claims; "should work" is not "tested".
