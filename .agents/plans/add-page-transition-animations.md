# Feature: Page Transition Animations

The following plan should be complete, but validate documentation, codebase patterns, and task sanity before you start implementing.

Pay special attention to naming of existing utils, types, and models. Import from the right files.

## Feature Description

Add a subtle fade/dissolve animation when navigating between pages. Currently page switches are instantaneous — this adds a short crossfade (~200ms) on the main content area while the sidebar and bottom tab bar remain stable. The result should feel elegant without adding noticeable delay.

## User Story

As a visitor
I want smooth visual transitions when clicking between pages
So that the site feels polished and continuous rather than jarring

## Problem Statement

Page navigation currently causes a hard cut — the entire DOM is replaced instantly. This feels abrupt, especially on a dark-themed portfolio site where the eye is sensitive to sudden luminance changes.

## Solution Statement

Enable Astro's `ClientRouter` (built-in View Transitions router) with a default `fade` animation. The sidebar nav and bottom tab bar persist across navigations so only the main content area dissolves. Inline scripts that query the DOM at the top level are wrapped in `astro:page-load` event listeners so they re-initialize after client-side navigations.

## Feature Metadata

**Feature Type**: Enhancement
**Estimated Complexity**: Low
**Primary Systems Affected**: `BaseLayout.astro`, `global.css`, `art.astro` (lightbox script)
**Dependencies**: None (Astro ^6.0.2 includes `astro:transitions` natively)

---

## CONTEXT REFERENCES

### Relevant Codebase Files — READ THESE BEFORE IMPLEMENTING

- `src/layouts/BaseLayout.astro` (full file, 63 lines) — The single layout shell; `<head>`, nav, `<slot />`, footer, and the `.reveal` IntersectionObserver script. **This is the primary file to modify.**
- `src/layouts/PostLayout.astro` (full file, 157 lines) — Blog post layout; wraps `BaseLayout`. No changes needed (inherits transitions from BaseLayout).
- `src/styles/global.css` (full file, 89 lines) — Design tokens, `.reveal` animation, `.main-content` layout. May need a small addition for reduced-motion.
- `src/components/SidebarNav.astro` — Desktop nav (plain `<a>` links). Needs `transition:persist` to avoid flicker.
- `src/components/BottomTabBar.astro` — Mobile nav (plain `<a>` links). Needs `transition:persist` to avoid flicker.
- `src/pages/art.astro` (lines 218+) — Lightbox script that queries DOM at top level; must re-init on `astro:page-load`.
- `src/config/nav.ts` — Nav item definitions. No changes needed.
- `astro.config.mjs` — Astro config. No changes needed (ClientRouter is added in layout, not config).

### New Files to Create

None.

### Relevant Documentation — READ THESE BEFORE IMPLEMENTING

- [Astro View Transitions Guide](https://docs.astro.build/en/guides/view-transitions/)
  - Sections: Adding View Transitions, Built-in Animation Directives, transition:persist, Lifecycle Events
  - Why: Authoritative API reference for `ClientRouter`, `fade()`, `transition:persist`, and `astro:page-load`
- [View Transitions Router API Reference](https://docs.astro.build/en/reference/modules/astro-transitions/)
  - Why: Exact import paths and function signatures for `ClientRouter`, `fade`, `slide`, `none`

### Patterns to Follow

**Animation conventions (from global.css):**
- Existing transitions use `ease` timing and 150–400ms durations.
- `prefers-reduced-motion` is already handled for `.reveal`; the View Transitions API handles it automatically for page transitions.

**Script pattern (BaseLayout line 48–61):**
- Inline `<script>` block queries DOM at module scope. With ClientRouter, this runs once on initial load but NOT on subsequent client-side navigations. Wrap in `astro:page-load`.

---

## IMPLEMENTATION PLAN

### Phase 1: Enable ClientRouter

Add the `ClientRouter` component to `BaseLayout.astro` `<head>`. This opts the entire site into client-side routing with default fade animation.

### Phase 2: Persist Navigation

Add `transition:persist` to the sidebar and bottom tab bar so they don't flash/re-render during page transitions. Optionally scope the fade animation to only the `.main-content` area.

### Phase 3: Fix Script Re-initialization

Wrap DOM-querying scripts in `astro:page-load` event listeners so they re-run after each client-side navigation.

### Phase 4: Fine-tune Animation

Apply a custom `fade` duration to the main content area (200ms) for a quick, elegant dissolve. Ensure the sidebar active state updates correctly after navigation.

### Phase 5: Verify

Build, lint, and visually QA in the browser.

---

## STEP-BY-STEP TASKS

Execute every task in order, top to bottom. Each task is atomic and independently testable.

### 1. UPDATE `src/layouts/BaseLayout.astro` — Add ClientRouter import and component

- **IMPLEMENT**: Add `import { ClientRouter } from "astro:transitions";` to the frontmatter imports (after existing imports, before the `interface Props` block).
- **IMPLEMENT**: Add `<ClientRouter />` inside `<head>`, after the `<title>` tag (line 39).
- **PATTERN**: Follow Astro docs — `ClientRouter` must be inside `<head>`, one per page.
- **VALIDATE**: `npx astro check && npx astro build`

### 2. UPDATE `src/layouts/BaseLayout.astro` — Add transition:animate to main content

- **IMPLEMENT**: Add `transition:animate="fade"` to the `<div class="main-content">` element (line 43). This scopes the fade to the content area only.
- **GOTCHA**: The `fade` string value uses the default 200ms duration, which matches the desired "quick dissolve" feel. If a custom duration is wanted later, import `fade` from `astro:transitions` and use `transition:animate={fade({ duration: '0.2s' })}`.
- **VALIDATE**: `npx astro build`

### 3. UPDATE `src/components/SidebarNav.astro` — Add transition:persist

- **IMPLEMENT**: Add `transition:persist` to the outermost `<nav>` element of the sidebar. This tells the ClientRouter to keep the sidebar DOM node across navigations rather than re-rendering it.
- **GOTCHA**: The sidebar shows active state via `aria-current="page"`. With `transition:persist`, the sidebar DOM won't be replaced, so the active state won't update automatically. Two options:
  - **Option A (recommended)**: Do NOT persist the sidebar. The default fade only applies to the `::view-transition-old/new(root)` pseudo-elements, and the nav will re-render with correct active state. The fade animation on `.main-content` is scoped, so nav won't visually flash if it has its own `transition:animate="none"`.
  - **Option B**: Persist the sidebar and add a small `astro:after-swap` script to update `aria-current` manually.
- **DECISION**: Go with **Option A** — add `transition:animate="none"` to the sidebar `<nav>` and the `<nav>` in BottomTabBar. This prevents the nav from fading during transition but still re-renders it with the correct active state.
- **VALIDATE**: `npx astro build`

### 4. UPDATE `src/components/BottomTabBar.astro` — Add transition:animate="none"

- **IMPLEMENT**: Add `transition:animate="none"` to the outermost `<nav>` element.
- **PATTERN**: Same as sidebar — prevents the mobile nav from fading during transitions while still updating active state.
- **VALIDATE**: `npx astro build`

### 5. UPDATE `src/layouts/BaseLayout.astro` — Fix .reveal IntersectionObserver script

- **IMPLEMENT**: Wrap the IntersectionObserver script (lines 48–61) in `document.addEventListener("astro:page-load", () => { ... })` so it re-runs after each client-side navigation. The `astro:page-load` event fires on initial load AND after every subsequent navigation.
- **GOTCHA**: Do NOT use `astro:after-swap` here — the DOM isn't fully settled yet at that point. `astro:page-load` is the correct event.
- **GOTCHA**: Remove the direct `document.querySelectorAll(".reveal").forEach(...)` call at the top level since it will now run inside the event listener. The event fires on initial load too, so no double-init concern.
- **VALIDATE**: `npx astro build`

### 6. UPDATE `src/pages/art.astro` — Fix lightbox script re-initialization

- **IMPLEMENT**: The lightbox `<script>` block (line 218+) queries the DOM at module scope. With `ClientRouter`, bundled `<script>` tags run once and are de-duped on subsequent navigations. Wrap the entire script body in `document.addEventListener("astro:page-load", () => { ... })`.
- **GOTCHA**: Variables declared inside the listener are scoped per invocation. If the art page is navigated to multiple times, the listener fires each time — but since the old DOM is swapped out, the old references are garbage collected. No cleanup needed.
- **GOTCHA**: If event listeners on `document` or `window` are added inside the script (keyboard handlers, resize, etc.), they should be cleaned up or guarded to avoid stacking. Check for `document.addEventListener` and `window.addEventListener` calls in the script and add corresponding cleanup in an `astro:before-swap` listener, or use `{ once: true }` patterns where applicable.
- **VALIDATE**: `npx astro build`, then manually test navigating to /art/ and back, verifying lightbox still works.

### 7. VERIFY global.css — No changes needed

- **CONFIRM**: The `prefers-reduced-motion` media query in `global.css` (lines 63–69) handles `.reveal` animations. The View Transitions API automatically respects `prefers-reduced-motion` by using `animation-duration: 0s`, so no CSS changes are needed for accessibility.
- **VALIDATE**: `npx astro check && npx astro build`

---

## TESTING STRATEGY

### Manual Testing (Primary)

This feature is best validated visually. No unit tests needed — it's a CSS/browser animation feature.

1. Navigate between all pages (Home → Projects → Art → Blog → Home)
2. Use browser back/forward buttons
3. Verify sidebar active state updates correctly on each navigation
4. Verify bottom tab bar active state updates correctly (resize to mobile width)
5. Verify `.reveal` scroll animations still work on every page after client-side navigation
6. Verify art page lightbox still opens/closes/navigates after client-side navigation to `/art/`
7. Test with `prefers-reduced-motion: reduce` in DevTools — transitions should be instant
8. Test with browser that doesn't support View Transitions API (Firefox as of early 2026) — should fall back gracefully with no visual bugs

### Edge Cases

- Rapid clicking between nav links — should not cause visual artifacts
- Opening a direct URL (not via navigation) — should load normally without transition
- Blog post pages via PostLayout — should transition correctly since PostLayout wraps BaseLayout

---

## VALIDATION COMMANDS

### Level 1: Syntax & Style

```bash
npx prettier --check "src/**/*.{astro,css,ts}"
npx eslint src/
```

### Level 2: Type Checking

```bash
npx astro check
```

### Level 3: Build

```bash
npx astro build
```

### Level 4: Dev Server Smoke Test

```bash
npx astro dev
# Open http://localhost:4321 and click through all pages
```

---

## ACCEPTANCE CRITERIA

- [ ] Page transitions use a smooth fade/dissolve (~200ms)
- [ ] Sidebar and bottom tab bar do NOT fade during transitions
- [ ] Sidebar and bottom tab bar active states update correctly after navigation
- [ ] `.reveal` scroll animations work on every page after client-side navigation
- [ ] Art page lightbox functions correctly after client-side navigation
- [ ] Browser back/forward navigation works with transitions
- [ ] `prefers-reduced-motion` disables transition animations
- [ ] Build passes with zero errors
- [ ] No regressions in existing functionality

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] `npx astro check` passes
- [ ] `npx astro build` passes
- [ ] `npx prettier --check` passes
- [ ] `npx eslint` passes
- [ ] Visual QA in dev server confirms smooth transitions
- [ ] Lightbox on /art/ tested after navigation
- [ ] Back/forward browser navigation tested

---

## NOTES

**Why ClientRouter over `@view-transition { navigation: auto }`**: The CSS-only approach (`@view-transition`) only works in Chromium browsers (Chrome 126+, Edge 126+). `ClientRouter` provides cross-browser support with graceful fallback (instant swap in unsupported browsers). Since this is a portfolio site that should feel polished everywhere, ClientRouter is the better choice.

**Why `transition:animate="none"` on nav instead of `transition:persist`**: Using `transition:persist` would keep the exact same DOM node, which means the active link highlighting wouldn't update without extra JavaScript. Using `transition:animate="none"` allows the nav to re-render with correct active state while visually appearing stable (no animation).

**Performance**: ClientRouter adds minimal JavaScript (~3KB gzipped). It prefetches pages on hover by default, making navigations feel near-instant. The fade animation is CSS-only via the View Transitions API.

**Confidence Score**: 9/10 — straightforward Astro feature with clear documentation. The main risk is the art.astro lightbox script needing careful wrapping, but the pattern is well-documented.
