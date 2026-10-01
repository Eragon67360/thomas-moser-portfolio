# Release and production

`main` is production: Vercel deploys every merge into it to www.thomasmoserdev.com. A release is one PR `dev` → `main`, merged only with the owner's explicit go. There is no database migration step; Redis keys are created on demand.

## Preparing a release

1. Check what ships: `git log --oneline origin/main..origin/dev`.
2. Run the [quality gates](quality-gates.md) on the `dev` head: `npm run check`, `npm run build`, the smoke pages.
3. Open the release PR with a body the owner can approve from his phone:
   - a table of what ships (PR, one line, issues);
   - what visitors will notice (with screenshots for visible changes);
   - owner steps, numbered, in the order they must happen (settings that depend on the new code come **after** the deploy);
   - risks and how to roll back.
4. Wait for "merge it", then merge with a merge commit, as previous releases were: `gh pr merge <n> --merge`, no `--delete-branch`.

## After merging

1. Watch the deployment until it's ready (Vercel dashboard, or `vercel ls thomas-moser-portfolio --prod --scope eragon67360s-projects`).
2. Smoke-test production with `curl`, checking content and status, not only 200:
   - `/`, `/about`, `/projects`, `/blog`, a post in each language, `/activities`, `/privacy`;
   - `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/llms.txt`, an `opengraph-image`;
   - a known-bad URL (real 404), the apex and `vercel.app` redirects to `www`;
   - headers or JSON-LD that changed (parse it).
3. Check runtime errors for the new deployment in its first minutes.
4. Walk the owner through post-release steps, verifying each as he completes it.
5. Close the issues the release fixed (`Closes #n` closes them when the commits land on `main`; close any that didn't, with a note) and update the tracking issue.

## Rolling back

Vercel can instantly promote the previous production deployment; that's a production action, so ask the owner first. With no database migrations, a rollback is complete; anything written to Redis meanwhile stays.
