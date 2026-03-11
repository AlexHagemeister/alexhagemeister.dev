# Frontend Design Audit Checklist

Scope: layout and navigation polish across desktop/mobile. Prioritized by impact.

## Audit Baseline

- [ ] **Reference pages:** `/`, `/projects/`, `/art/`, `/blog/`, `/blog/narrative-as-cognitive-technology/`
- [ ] **Reference viewports:** desktop `1280x800`, mobile `375x812`
- [ ] **Core files for this audit:** `src/components/SiteNav.astro`, `src/layouts/BaseLayout.astro`, `src/layouts/PostLayout.astro`, `src/pages/index.astro`, `src/pages/projects.astro`, `src/pages/art.astro`, `src/styles/global.css`

## Execution Contract For Next Agent

- [ ] **Implement by block order:** P0 -> P1 -> P2 -> P3
- [ ] **After each block:** run technical verification (`bun run format:check`, `bun run lint`, `bun run check`, `bun run build`)
- [ ] **After each block:** run visual verification in integrated browser at both baseline viewports
- [ ] **After each block:** pause and request user approval before starting next block
- [ ] **Do not continue on assumptions:** if behavior is uncertain, validate directly in browser before asking for approval

## P0 - Critical (Nav and layout fundamentals)

**Why this block matters**

- First-impression clarity is currently weak: users do not immediately understand where they are, who the site belongs to, or how to orient across pages.
- Navigation semantics and page structure create trust friction in the first 5-10 seconds, which is where portfolio visitors decide whether to continue.
- This block fixes wayfinding and structural coherence before visual polish, because no amount of styling compensates for confusing IA.

- [x] **Add site identity to nav.**
  - Problem: Nav has four bare links and no site identity anchor on inner pages.
  - Change target: `src/components/SiteNav.astro`.
  - Expected outcome: Brand/name appears in nav and links to `/`; identity is visible on all pages using nav.
  - Success signal: A first-time visitor can identify site ownership from any page without scrolling.
- [x] **Fix home nav label.**
  - Problem: Current `Work` label implies a separate portfolio route, but points to homepage.
  - Change target: `src/components/SiteNav.astro` (+ routes only if restructuring).
  - Expected outcome: Label semantics match destination (`Home`) or nav/route structure is made explicit.
  - Success signal: Nav labels match user expectation for destination content with no ambiguity.
- [x] **Show footer on inner pages.**
  - Problem: Contact footer is inconsistent and missing on key inner pages.
  - Change target: `src/layouts/BaseLayout.astro` and any page-level overrides.
  - Expected outcome: Footer presence is intentional and consistent across `/projects/`, `/art/`, `/blog/`, and blog detail.
  - Success signal: Contact/footer section is consistently discoverable at the bottom of inner pages.
- [x] **Unify hero/about flow on home.**
  - Problem: Home intro and About read as one narrative but are visually split with heavy separators.
  - Change target: `src/pages/index.astro` (structure + spacing/borders).
  - Expected outcome: Above-the-fold to About transition feels continuous and deliberate.
  - Success signal: Home page reads as a coherent narrative from hero into about content.
- [x] **Verify P0 implementation.** Run checks and manual QA to confirm no errors and intended behavior/visual output.
- [x] **Review P0 in integrated browser.** Open and inspect updated pages in Cursor Browser.
- [x] **Approval gate for P0.** Stop and get user approval before starting P1.

## P1 - High (Hierarchy, spacing, responsive behavior)

**Why this block matters**

- After orientation is fixed, the next biggest quality signal is reading comfort and visual rhythm.
- Current spacing, line-length, and interaction cues make the site feel less intentional, even when content quality is high.
- This block improves legibility and perceived craftsmanship without changing core content.

- [x] **Tighten section rhythm on home.**
  - Problem: Section spacing reads loose and increases scroll cost.
  - Change target: `src/pages/index.astro` (section padding + separator strategy).
  - Expected outcome: Denser vertical rhythm without crowding.
  - Success signal: Scroll through home feels intentional and compact, not sparse.
- [x] **Constrain blog prose measure.**
  - Problem: Post line-length is long for comfortable reading.
  - Change target: `src/layouts/PostLayout.astro` (`.content` width constraints).
  - Expected outcome: Body text sits in readable measure while preserving responsive behavior.
  - Success signal: Long-form reading feels easier; line length stays comfortable on desktop.
- [x] **Strengthen active nav affordance.**
  - Problem: Active state relies on color only.
  - Change target: `src/components/SiteNav.astro`.
  - Expected outcome: Active item has at least one non-color cue (underline/weight/background).
  - Success signal: Active page is obvious even in grayscale or low-color-contrast conditions.
- [x] **Add subtle interaction transitions.**
  - Problem: Link state changes are abrupt.
  - Change target: shared styles in `src/styles/global.css` and/or local nav/link styles.
  - Expected outcome: Fast, restrained transitions that improve polish without motion excess.
  - Success signal: Hover/focus interactions feel smooth and modern without feeling animated-heavy.
- [x] **Adjust hero breakpoint.**
  - Problem: Mid-width hero layout feels cramped before stacking.
  - Change target: `src/pages/index.astro` media rules.
  - Expected outcome: Hero stacks at a breakpoint that avoids compressed text columns.
  - Success signal: No cramped hero text column at tablet-ish widths.
- [x] **Verify P1 implementation.** Run checks and manual QA to confirm no errors and intended behavior/visual output.
- [x] **Review P1 in integrated browser.** Open and inspect updated pages in Cursor Browser.
- [x] **Approval gate for P1.** Stop and get user approval before starting P2.

## P2 - Medium (Component polish and content gaps)

**Why this block matters**

- These issues are less likely to block comprehension, but they reduce depth, completeness, and interaction quality once users explore.
- The site currently has several “almost there” experiences (projects placeholder, limited lightbox flow, partial markdown styling) that can feel unfinished.
- This block upgrades completeness and consistency so deeper pages match the quality of top-level surfaces.

- [x] **Add left scroll affordance on art gallery.**
  - Problem: Gallery signals overflow in one direction more clearly than the other.
  - Change target: `src/pages/art.astro` (gallery scroll state + pseudo-elements).
  - Expected outcome: Left and right overflow cues are balanced and state-aware.
  - Success signal: Users can immediately infer bidirectional horizontal scrolling.
- [x] **Improve projects empty state.**
  - Problem: Current page is a dead-end with little direction.
  - Change target: `src/pages/projects.astro`.
  - Expected outcome: Placeholder provides context + clear next action (or remove nav destination intentionally).
  - Success signal: Projects page gives a clear user next step instead of ending interaction.
- [x] **Expand markdown element styling.**
  - Problem: Non-paragraph markdown elements can render with inconsistent defaults.
  - Change target: `src/layouts/PostLayout.astro`.
  - Expected outcome: `blockquote`, `code/pre`, lists, and `hr` are visually integrated with existing theme.
  - Success signal: Future posts with richer markdown look intentional without extra per-post CSS.
- [x] **Refine section heading voice.**
  - Problem: All-caps label style feels generic/template-like.
  - Change target: `src/pages/index.astro`.
  - Expected outcome: Heading treatment better matches site tone and typography system.
  - Success signal: Section headings feel distinctive to this brand, not like a starter template.
- [x] **Add lightbox prev/next navigation.**
  - Problem: Users must close/reopen to browse sequence.
  - Change target: `src/pages/art.astro` (lightbox state + controls + keyboard behavior).
  - Expected outcome: Sequential navigation works via UI controls and keyboard.
  - Success signal: Users can browse full gallery sequence without exiting modal.
- [x] **Verify P2 implementation.** Run checks and manual QA to confirm no errors and intended behavior/visual output.
- [x] **Review P2 in integrated browser.** Open and inspect updated pages in Cursor Browser.
- [ ] **Approval gate for P2.** Stop and get user approval before starting P3.

## P3 - Low (A11y and shareability)

**Why this block matters**

- These items improve accessibility and distribution quality rather than core layout comprehension.
- They are lower urgency for visual polish, but high leverage for inclusivity, performance hygiene, and external link presentation.
- This block should be done after major layout/nav work to avoid rework on metadata and motion/interaction rules.

- [ ] **Add skip link.**
  - Change target: `src/layouts/BaseLayout.astro`.
  - Expected outcome: Keyboard users can bypass nav and jump to main content immediately.
  - Success signal: First Tab reveals skip link and Enter moves focus to primary content.
- [ ] **Respect reduced-motion.**
  - Change target: transition declarations in shared/component styles.
  - Expected outcome: Motion is reduced/disabled when user prefers reduced motion.
  - Success signal: With reduced-motion enabled at OS/browser level, animations/transitions are minimized.
- [ ] **Lazy-load art gallery images.**
  - Change target: `src/pages/art.astro`.
  - Expected outcome: Below-the-fold gallery images defer loading for better initial page performance.
  - Success signal: Initial network payload decreases; below-fold gallery assets load on demand.
- [ ] **Add Open Graph/Twitter metadata.**
  - Change target: `src/layouts/BaseLayout.astro`.
  - Expected outcome: Link previews include title/description/image data on social platforms.
  - Success signal: Shared URLs produce rich preview cards with correct title/description/image.
- [ ] **Verify P3 implementation.** Run checks and manual QA to confirm no errors and intended behavior/visual output.
- [ ] **Review P3 in integrated browser.** Open and inspect updated pages in Cursor Browser.
- [ ] **Approval gate for P3.** Stop and get user approval before closing the audit implementation.

## Browser QA Checklist (Run At End Of Each Block)

- [ ] Confirm nav renders correctly on `/`, `/projects/`, `/art/`, `/blog/`, and blog detail.
- [ ] Confirm desktop and mobile layout quality (no overlap, clipping, or cramped typography).
- [ ] Confirm interactive states (hover/focus/active) are visible and coherent.
- [ ] Confirm no obvious regressions in art gallery/lightbox behavior.
- [ ] Confirm footer/contact visibility matches block goals.

## File Impact Map

| Priority | Primary files                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| P0       | `src/components/SiteNav.astro`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`                          |
| P1       | `src/styles/global.css`, `src/layouts/PostLayout.astro`, `src/components/SiteNav.astro`, `src/pages/index.astro` |
| P2       | `src/pages/art.astro`, `src/pages/projects.astro`, `src/layouts/PostLayout.astro`, `src/pages/index.astro`       |
| P3       | `src/layouts/BaseLayout.astro`, `src/pages/art.astro`                                                            |
