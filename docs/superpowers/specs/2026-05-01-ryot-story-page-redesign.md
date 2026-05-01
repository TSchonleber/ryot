# $RYOT — Redesign: Less Scroll on Landing + Longform `/story` Page

**Date:** 2026-05-01
**Author:** Terrence (with Claude Code)
**Status:** Pending review
**Supersedes (partial):** `2026-05-01-ryot-charity-site-design.md` Sections 4.2 and 4.3 (Story + Stakes sections moved off the landing).

---

## 1. What's changing

The landing page is currently a 7-section single scroll. Story + Stakes were teaser content that worked, but the spec always said the story would feel cramped on landing. With the cause-centered voice locked in, the right shape is:

- **Landing (`/`)**: tighter, conversion-shaped — Hero, Coin (with anime portrait), Tracker, NHS, FAQ, Footer. ~5 sections instead of 7. Cut Story and Stakes sections entirely from main.
- **`/story`**: longform first-person narrative (~1,950 words across 6 sections + closing) — cause-centered but personal, drafted in the brainstorming session that produced this spec.

The two pages cross-link: landing's hero subhead and a CTA below the coin section both point to `/story`. Story page closes with three CTAs back to the landing's tracker, the pump.fun buy, and Northshore's site.

This is not a copy-down: the story page does not repeat the 3-beat teaser. The teaser is gone, the longform replaces it.

---

## 2. Landing page changes

### 2.1 Remove from `app/page.tsx`
- `<Story />` and `<Stakes />` imports and renders.

### 2.2 Delete files
- `components/sections/story.tsx`
- `components/sections/stakes.tsx`

(They're no longer composed anywhere. Leaving them as dead code is the wrong call — kill them.)

### 2.3 Add CTA into `components/sections/hero.tsx`
Below the existing subhead ("Meet Ryot. $RYOT exists so more animals get the chance he got."), add a small inline link:

> **Read his story →** *(`/story`)*

Style: secondary to the subhead. `text-text-primary` with `accent` underline decoration on hover. Same Framer Motion entrance as the subhead but slightly later delay so it lands after the headline + subhead settle.

### 2.4 Add CTA into `components/sections/coin.tsx`
After the buy button, add a quiet secondary line:

> *Want the longer version of why this exists? **Read Ryot's story →***

Same accent-underline treatment as hero CTA. Quiet, not competing with the buy.

---

## 3. New page: `/story`

### 3.1 Route
- File: `app/story/page.tsx` — Server Component (static, no client interactivity beyond `<Reveal>` on entrance)
- Static prerender, no revalidation needed
- Metadata: title `Ryot's Story — $RYOT`, OG image custom to story page (see 3.3)

### 3.2 Page structure (top → bottom)

| Section | Content | Component |
|---|---|---|
| Hero | Eyebrow `HIS STORY`, headline "Four months old. Two strikes. One last chance.", subhead "Ryot got out. This is what that means, and why most don't.", pond photo | `components/story-page/story-hero.tsx` |
| 1. Before the pond | Breeder operation, two prior families, the math | inline in `app/story/page.tsx` |
| 2. The day I met him | First-person account of the pickup, deliberately understated | inline |
| 3. Living with him | 110 lbs, ~$10K of destroyed tech, taming energy, best friend / trust / love closing | inline |
| 4. The economy of disposable dogs | Bigger picture — breed-and-cull pipeline, why no-kill matters | inline |
| 5. Why NHS, why Louisiana | NHS specifically, the Louisiana context | inline |
| 6. How $RYOT moves the math | Mechanics of the coin, the redirect bet | inline |
| Closing | "Ryot got the chance. Most don't. $RYOT exists so more do." + CTAs | `components/story-page/story-cta.tsx` |

Body sections share a common `<StorySection title prose>` wrapper for consistent typography.

### 3.3 Custom OG image for `/story`
File: `app/story/opengraph-image.tsx`
- Same edge runtime + 1200×630 size as the landing OG
- Same pond.jpg backdrop
- Different headline overlay: **"Four months old. Two strikes."** with eyebrow `HIS STORY · A LONG-FORM`
- Reuses the gradient + palette from the landing OG

### 3.4 Visual + typography
- Same Soft Gritty palette (CSS vars already wired)
- Same fonts (Fraunces display, Inter body, Geist Mono)
- Reading width: `max-w-2xl` (~640px) for body prose, generous line-height (`leading-relaxed`)
- Section headings: `font-display` at `text-3xl sm:text-4xl`, with `font-mono` eyebrow numbering above (`01.`, `02.`, etc.)
- Body: `font-body` at `text-base sm:text-lg`, paragraph spacing generous
- The three closing lines of Section 3 ("He's my best friend. I trust him more than anything in this world. He fills my heart with love.") render as a distinct visual block — `font-display` at `text-2xl sm:text-3xl`, with breathing room above and below. Earned moment of direct feeling after the observed prose.
- Pull-out emphasis lines (e.g., "What changed wasn't dramatic. What changed was that the clock stopped.") allowed in `font-display` set off by margin and color.
- One photo near the top (pond.jpg as page hero) and optionally the anime portrait somewhere in the middle as a visual break — to be decided during implementation based on rhythm.

### 3.5 Animation
- Section reveals via existing `<Reveal>` primitive. Stagger gentle.
- No scroll-jacking. No parallax that fights reading.
- Reduced motion respected (already handled by `<Reveal>`).

### 3.6 Closing CTAs
Three side-by-side links (stacked on mobile):
1. **See the live tracker →** to `/#tracker`
2. **Buy $RYOT on pump.fun** to `PUMPFUN_URL` (new tab)
3. **Visit Northshore Humane Society** to `CHARITY.url` (new tab)

Same ember-accent treatment as the buy button, but tertiary visual weight.

---

## 4. Component / file structure additions

```
ryot/
├── app/
│   ├── page.tsx                       # MODIFIED: remove <Story/>, <Stakes/>
│   └── story/
│       ├── page.tsx                   # NEW: longform narrative
│       └── opengraph-image.tsx        # NEW: story-page OG
├── components/
│   ├── sections/
│   │   ├── hero.tsx                   # MODIFIED: add "Read his story →" link
│   │   ├── coin.tsx                   # MODIFIED: add story link below buy
│   │   ├── story.tsx                  # DELETED
│   │   └── stakes.tsx                 # DELETED
│   └── story-page/
│       ├── story-hero.tsx             # NEW: page-level hero
│       ├── story-section.tsx          # NEW: shared <StorySection> wrapper
│       └── story-cta.tsx              # NEW: closing CTAs row
```

---

## 5. Anti-slop acceptance criteria (carried forward)

All hard rules from the original spec apply:

1. No three-card feature grid
2. No sparkle/rocket emojis
3. No em-dash-cadence body copy. The longform draft has been audited — em-dashes only used in proper grammatical roles (parenthetical breaks, summary-after-list), never as the AI "X — yet Y — Z" enumeration tell.
4. No default Tailwind palette
5. Real photos only
6. Specific numbers and names where they exist (110 lbs, ~$10K, four months, turns five in November)
7. Restrained accent use
8. AI-slop pass before declaring done

The story page passes a particularly important test: **does the prose read like a person, or does it read like Claude?** The drafted copy was written deliberately understated for the rescue moment ("There was no music. There was no slow-motion run across a field.") and saves direct emotion for the closing of Section 3 — which is structural, not stylistic, and is the opposite of how AI typically writes.

---

## 6. Acceptance criteria

- [ ] Landing page is shorter (5 sections vs 7); no `<Story />` or `<Stakes />` rendered
- [ ] `components/sections/story.tsx` and `stakes.tsx` are deleted
- [ ] `/story` route renders the full ~1,950-word narrative
- [ ] `/story` is statically prerendered (no `dynamic = 'force-dynamic'`, no `revalidate`)
- [ ] Custom OG image for `/story` renders correctly
- [ ] Hero subhead has "Read his story →" link to `/story`
- [ ] Coin section has secondary "Read Ryot's story →" link
- [ ] Story page closing has three CTAs (tracker / buy / NHS)
- [ ] Mobile 375px works on both pages — no horizontal scroll
- [ ] All existing acceptance criteria from the original spec still pass (touch targets, reduced motion, etc.)
- [ ] Production build clean, deployed to ryotcoin.vercel.app

---

## 7. Out of scope (explicitly)

- A separate "About" or "How it works" page (rejected approach B during brainstorming)
- A blog or ongoing-content surface
- Comments, reactions, or any social proof on the story page
- Photo galleries / lightboxes
- Audio narration (could be a future addition; not now)

---

## 8. Open items

- Whether to include the anime portrait somewhere in the middle of the story page (decided during implementation based on visual rhythm; will not block plan)
- The exact eyebrow numbering style (`01.` vs `i.` vs none) — design call during implementation
