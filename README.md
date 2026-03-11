# alexhagemeister.dev

Portfolio site built with Astro.

## Stack

- Runtime: Node `>=22.12.0`
- Package manager: Bun
- Framework: Astro `^6`
- Language: TypeScript (Astro strict config)
- Output: static-first site

## Commands

| Command                   | Purpose                           |
| ------------------------- | --------------------------------- |
| `bun install`             | Install dependencies              |
| `bun run dev`             | Start local dev server            |
| `bun run build`           | Build static production output    |
| `bun run preview`         | Preview production build locally  |
| `bun run astro -- --help` | Astro CLI help                    |
| `bun run check`           | Typecheck + lint checks           |
| `bun run lint`            | ESLint checks                     |
| `bun run format`          | Format code with Prettier         |
| `bun run format:check`    | Verify formatting without writing |

## Architecture

- `src/pages/`: route files (`/`, `/projects/`, `/art/`, `/blog/`, `/blog/:slug/`)
- `src/layouts/`: shared page shells (`BaseLayout`, `PostLayout`)
- `src/components/`: reusable UI sections (`SiteNav`, `SiteFooter`)
- `src/content/blog/`: markdown blog posts
- `src/content.config.ts`: blog collection schema
- `public/images/`: static art and profile images
- `astro.config.mjs`: canonical site URL, trailing slash policy, redirects

## Deployment (Vercel)

- Astro static deployment works with zero adapter config.
- Every branch push produces a preview deployment.
- Pushes to `main` produce production deployments.
- Site URL is configured as `https://alexhagemeister.dev` in `astro.config.mjs`.
- Trailing slash canonical URLs are enforced (`trailingSlash: 'always'`).

## Quality Gates

- Required local baseline before merge:
  - `bun run format:check`
  - `bun run lint`
  - `bun run check`
  - `bun run build`
- CI runs the same checks on pull requests and pushes to `main`.
