## Learned User Preferences

- When updating AGENTS memory, only add non-obvious, durable guidance that is good to remember across sessions.
- Prefer GitHub CLI for GitHub operations over the web UI when possible.
- Discuss approach and get explicit approval before writing code for non-trivial changes.
- After completing a block of changes, verify work (build, lint, visual QA in browser) and pause for user approval before proceeding to the next block.
- Implementation plans (`.cursor/plans/` and `.agents/plans/`) are read-only specs during execution — do not edit the plan file itself.

## Learned Workspace Facts

- This project uses Vercel Git integration: branch pushes create preview deployments and `main` pushes create production deployments.
- Canonical URL policy uses trailing slashes and keeps permanent redirects in `astro.config.mjs`.
- Baseline quality gate in CI/local is formatting check, lint, Astro check, and build.
- Site design system uses two fonts: Playfair Display (page h1s) and JetBrains Mono (body text and all structural/navigational elements).
- Two-accent color system: gold `--accent: #c4a35a` for editorial warmth, cyan `--accent-cyan: #88c0d0` for interactive/structural elements.
- Homepage uses terminal-inspired motifs: `//` section prefixes, `>` project title prefixes, blinking cursor, window chrome dots on cards, scroll reveal animations.
- Navigation is a fixed left sidebar (`SidebarNav.astro`, 240px) on desktop (>= 860px) with brand block, nav links, and external links; mobile (< 860px) uses a bottom tab bar (`BottomTabBar.astro`) with icon + label tabs. Layout offset via `.main-content` margin-left.
- Page visibility in navigation is controlled by the `visible` flag in `src/config/nav.ts`.
