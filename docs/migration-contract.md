# Migration Contract

## Canonical Routes

- `/`
- `/projects/`
- `/art/`
- `/blog/`
- `/blog/:slug/`

## URL Policy

- Canonical blog post URLs use `/blog/:slug/`.
- Legacy dated URLs from the prototype are redirected to the canonical slug URL.
- Trailing slash canonical form is used for internal links.

## Content Ownership

- Home, projects, and art pages are Astro route files under `src/pages/`.
- Blog post content is authored in `src/content/blog/`.
- Shared shell/navigation/footer live in `src/layouts/` and `src/components/`.
- Static migration images remain under `public/images/` for path stability.
