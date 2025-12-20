# GitHub Copilot / AI Agent Instructions

Purpose: Short, actionable guidance to make AI coding agents productive in this repo.

- **Project type:** Next.js (app router) TypeScript app under `src/app` using React 19 and Server/Client components.
- **Primary integration:** GitHub API via `@octokit/rest` in [src/lib/github.ts](../src/lib/github.ts). `getTrending()` and `getRepo()` are the canonical helpers used across the UI.
- **Key UI entry points:** dynamic repo page at [src/app/[owner]/[repo].tsx](../src/app/[owner]/[repo].tsx) and the main page at [src/app/page.tsx](../src/app/page.tsx).

Architecture / data flow (short):

- UI components (in `src/components`) call client-side fetchers that ultimately invoke helpers in `src/lib/github.ts`.
- Caching: the repo page uses `useSWRImmutable` (see [src/app/[owner]/[repo].tsx](../src/app/[owner]/[repo].tsx)) — prefer immutable fetch patterns for read-only GitHub data.
- Pagination & releases: `getRepo()` uses `octokit.paginate` to return all releases; downstream code aggregates downloads in `src/app/[owner]/[repo].tsx`.

Developer commands (use exactly):

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` / `npm run lint:fix` — ESLint (project uses `eslint-config-next`)
- `npm run format` — Prettier formatting
- `npm run typecheck` — TypeScript check
- `npm run check` — lint + typecheck (use before commits)

Patterns & conventions to follow (repo-specific):

- File layout: `src/app` (routes), `src/components` (UI), `src/lib` (API helpers), `src/constants` (shared values). Example: `constants/colors.ts` centralizes palette values.
- Prefer the existing helper functions in `src/lib/github.ts` rather than introducing new direct `octokit` usages; they encapsulate query params like `TRENDING_PER_PAGE`.
- Many components use inline styles rather than CSS modules — maintain style consistency unless adding a global stylesheet is intentional.
- Avoid adding server-only Node APIs in client components; this project uses `@octokit/rest` in a way that works with the client codepaths (see current usage) — when in doubt, check whether a file is rendered server- or client-side.

Integration notes / risk areas:

- Octokit is used directly (no intermediate API route). Changes to GitHub auth or rate-limiting should consider where Octokit is invoked (client vs server).
- `getRepo()` returns a tuple [repo, releases]; callers expect that shape (see fetcher in `src/app/[owner]/[repo].tsx`).

Where to make common changes:

- Add UI elements / tiles: `src/components/*` (e.g., `ReleaseList.tsx`, `ReleaseTile.tsx`, `RepoCard.tsx`).
- Change GitHub queries or add fields: `src/lib/github.ts`.
- Update dynamic routing or page layout: `src/app/[owner]/[repo].tsx` and `src/app/layout.tsx`.

Tests / CI: none detected in repository. Before pushing, run `npm run check` and `npm run format` locally.

When editing files, run these quick checks locally:

```bash
npm run format
npm run lint
npm run typecheck
```

If anything in this file looks unclear or missing, reply with what you attempted and I will refine these instructions.
