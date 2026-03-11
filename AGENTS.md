# AGENTS.md

## Project Overview

- Build and evolve a personal website using Astro.
- Treat this repository as a frontend-first Astro app with static output by default.
- Prefer simple, incremental changes over early abstraction.

## Tech Stack

- Runtime: Node.js `>=22.12.0` (`package.json` engines)
- Package manager: Bun (`bun.lock` present)
- Framework: Astro `^6.0.2`
- Language: TypeScript (Astro strict preset via `tsconfig.json`)
- Module system: ESM (`"type": "module"`)
- Styling: Component-scoped CSS inside `.astro` files
- CI: No workflow configured in `.github/workflows/`
- Testing: No runner configured yet
- Linting/formatting: No ESLint/Prettier config yet

## Commands

- Install deps: `bun install`
- Start dev server: `bun run dev`
- Build production site: `bun run build`
- Preview production build: `bun run preview`
- Run Astro CLI directly: `bun run astro -- --help`
- Run Astro type checks: `bunx astro check`
- Validate baseline before PR: `bun run build`

## Project Structure

- `src/pages/` — File-based routes. Each `.astro` file maps to a route.
- `src/layouts/` — Shared page shells and document wrappers.
- `src/components/` — Reusable UI components.
- `src/assets/` — Imported local assets referenced from `.astro` modules.
- `public/` — Static files served as-is from root URL paths.
- `.cursor/hooks/state/` — Local agent state. Keep ignored.
- `astro.config.mjs` — Astro runtime/build configuration.
- `tsconfig.json` — Strict TypeScript defaults for Astro.
- `package.json` — Scripts, engines, and dependencies.

## Conventions

- Keep route files in `src/pages/` lowercase and path-oriented.
- Keep reusable UI in `src/components/` with PascalCase filenames.
- Keep shared wrappers in `src/layouts/` with PascalCase filenames.
- Use relative imports in `.astro` files unless path aliases are explicitly added.
- Keep frontmatter imports minimal and local to each component.
- Use scoped `<style>` blocks in `.astro` components for local styling.
- Keep markup semantic and accessible. Always provide meaningful `alt` text for content images.
- Leave decorative image `alt` empty only when the image is purely presentational.
- Preserve existing tab/indent style within touched files.
- Keep configuration files minimal. Add options only when required by a concrete feature.

## Testing

- Treat `bun run build` as the current required validation step.
- Run `bunx astro check` when changing types, props, or route data flow.
- Do not claim tests passed unless you ran them in this repo.
- Do not add test commands to docs without adding matching scripts/config.
- If introducing tests, add tooling in this order:
- Add unit tests first (Vitest) for non-trivial logic.
- Add E2E tests (Playwright) for user-critical paths.
- Add `test` scripts in `package.json` with copy-pasteable commands.

## Key Files

- `package.json` — Canonical script list and runtime/dependency constraints.
- `astro.config.mjs` — Astro config source of truth.
- `tsconfig.json` — Strict TS policy (`astro/tsconfigs/strict`).
- `src/pages/index.astro` — Current root route entrypoint.
- `src/layouts/Layout.astro` — Current base HTML layout.
- `src/components/Welcome.astro` — Starter hero UI and local asset import pattern.
- `public/favicon.svg` — Public static favicon.
- `README.md` — Starter-level project notes; keep aligned with real project state.

## Architecture

- Use Astro file-based routing as the primary composition model.
- Compose routes from layout + components instead of large page-only files.
- Keep business logic out of markup-heavy files when complexity grows.
- Move repeated data transforms into small utility modules under `src/` when repetition appears.
- Keep components focused on one responsibility.

## Component Patterns

- Prefer small presentational components over monolithic templates.
- Pass explicit props instead of relying on implicit globals.
- Keep inline SVG only when it materially improves control or styling.
- Import static assets from `src/assets/` when bundling benefits are needed.
- Put always-public static files in `public/` and reference by absolute path.

## Deployment

- Assume static output unless an adapter is explicitly configured.
- Validate static build compatibility before adding server-only features.
- Add deployment-specific config only when a target platform is chosen.
- Keep environment-specific assumptions out of components.

## Anti-Patterns

- Do not invent scripts that are not present in `package.json`.
- Do not add framework integrations without adding and documenting dependencies.
- Do not duplicate layout boilerplate across pages; extend `src/layouts/Layout.astro`.
- Do not hardcode production-only URLs in components.
- Do not commit local editor or agent state files under `.cursor/`.
- Do not replace simple Astro patterns with unnecessary abstractions.
