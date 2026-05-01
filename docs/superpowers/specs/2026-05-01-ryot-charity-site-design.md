  # $RYOT Charity Site — Design Spec

**Date:** 2026-05-01
**Author:** Terrence (with Claude Code)
**Status:** Pending review
**Target deploy:** `ryot.vercel.app`

---

## 1. Project context

$RYOT is a memecoin launched on pump.fun. 90% of fees go to the **Northshore Humane Society** (Northshore, Louisiana — one of the state's largest no-kill animal rescues). 10% is retained for operational costs only: per-donation Solana transaction fees, coin maintenance, paid boosts, and DEX listings.

The site is a single landing page that explains the cause, hosts the buy CTA, and shows a live tracker of donations to NHS. The coin is brand new at the time this spec is written, so the tracker must work gracefully with zero donations and be ready to swap in donate.gg data the moment it's live.

**Coin facts:**
- Ticker: `$RYOT`
- Contract: `G4P6eVitre7JjcnfWDH5dcNcA86Wzn7XsFiCVaaSpump`
- pump.fun URL: `https://pump.fun/coin/G4P6eVitre7JjcnfWDH5dcNcA86Wzn7XsFiCVaaSpump`

**Repository:** new private GitHub repo, deployed to a new Vercel project. Domain `ryot.vercel.app`. Push directly to `main` per project workflow preferences.

---

## 2. Narrative framing (load-bearing)

**Rule:** the site is *cause-centered*, not *founder-centered*.

Ryot the husky was rescued at four months old from a breeder who would have euthanized him after two prior families rejected him. He's now four years old. **He is the example, not the hero.** The site never frames Terrence as the rescuer. It frames Ryot as an animal who got the second chance every animal deserves, and uses that to point at the many who don't.

Every piece of copy on the site has to pass this test:
> "Does this read like 'look what *I* did' or like 'look what's possible — and look what's still happening to the ones who didn't get this'?"

If it reads like the first, rewrite it.

**Tone:** warm, plainspoken, specific. Not somber, not cute. Acknowledges weight without performing it. Memecoin energy is allowed in the coin and tracker sections; it stays out of the hero and story.

---

## 3. Visual direction — "Soft Gritty"

A documentary-feeling palette and type system that can carry the story without flinching, with warmth threaded through.

**Palette (CSS custom properties in `globals.css`):**

| Token              | Hex       | Use                                  |
|--------------------|-----------|--------------------------------------|
| `--bg-base`        | `#1a1612` | page background                      |
| `--bg-raised`      | `#2a2520` | cards, elevated surfaces             |
| `--bg-warm`        | `#3d2f24` | warm panels, story backgrounds       |
| `--text-primary`   | `#f5e9d4` | headlines, body text                 |
| `--text-secondary` | `rgba(245,233,212,0.65)` | captions, meta        |
| `--text-muted`     | `rgba(245,233,212,0.4)`  | hints, hairlines       |
| `--accent`         | `#c97a3f` | ember orange, single accent          |
| `--accent-muted`   | `rgba(201,122,63,0.15)` | accent washes          |
| `--hairline`       | `rgba(245,233,212,0.08)` | borders, dividers     |

Tailwind defaults (indigo, gray, blue) are explicitly **not used.** The palette is exposed through CSS vars and surfaced in Tailwind via `tailwind.config.ts` theme extension.

**Typography:**
- Display: a high-contrast editorial serif (e.g. Fraunces, Instrument Serif, or Crimson Pro — final pick during implementation). Used for hero headline, section titles, and the large story beats.
- Body: a workhorse sans (Inter, Geist Sans, or Söhne if licensed). Comfortable reading at 16–18px.
- Mono: a single mono face (Geist Mono or JetBrains Mono) used *only* for the contract address.

Loaded via `next/font/google` for performance and zero CLS.

**Photo treatment:** the existing pond photo of Ryot is the hero image. Treated with a slight darken / cinematic curve so the background recedes and Ryot reads as the subject. No filters that scream "Instagram." Real photo, real grain.

---

## 4. Page architecture

A single page, top-to-bottom scroll, no nav links inside the document (the only navigation is anchor links in the footer if needed).

| # | Section          | Purpose                                                                 |
|---|------------------|-------------------------------------------------------------------------|
| 1 | Hero             | Photo, one-line headline, scroll cue. **No buy CTA.**                   |
| 2 | Story            | Three short scroll-revealed beats — Ryot's story as the example         |
| 3 | Stakes           | One quiet stat block on no-kill rescue / euthanasia. Two lines, not a wall. |
| 4 | The Coin — $RYOT | What the coin is, the 90/10 split, contract address, pump.fun link, ticker. Memecoin energy lives here. |
| 5 | Live Tracker     | Total raised → NHS, with empty state. Designed to swap to donate.gg.    |
| 6 | NHS              | Who Northshore Humane Society is, no-kill mission, link out             |
| 7 | FAQ + Footer     | 5 questions, contract, socials, links                                   |

### Section 1 — Hero
- Full-bleed Ryot pond photo, dark cinematic treatment
- Headline (display serif, large): **"He made it. Most don't."**
- Sub (sans, smaller): "Meet Ryot. $RYOT exists so more animals get the chance he got."
- Quiet scroll indicator at the bottom (animated chevron or a thin vertical line)
- Subtle water-ripple animation on the pond surface (canvas, ~3% intensity)
- No buy button here. Lead with the why.

### Section 2 — Story
Three beats, each on its own scroll-reveal moment:
1. *"Four months old. Two families had said no. The breeder's clock was running out."*
2. *"He got out. He's four now."*
3. *"Tens of thousands of animals don't."*

Cause-centered language throughout. No first person.

### Section 3 — Stakes
One block. Two lines. A specific stat (e.g., approximate animals euthanized in U.S. shelters per year — to be sourced from a reputable origin during implementation, not invented). Followed by a single sentence connecting it to NHS's no-kill model.

### Section 4 — The Coin — $RYOT
- Heading + brief explanation of what $RYOT is and how it funds NHS
- 90/10 split visualized simply (not a pie chart — a labeled bar, hairline width, charcoal/ember). Includes a one-line transparency note: *"The 10% covers the Solana transaction cost of every donation, plus boosts and DEX listings. Not founder profit."*
- Contract address in mono, with click-to-copy and a small confirmation pulse
- Buy CTA: ember-accent button linking to `https://pump.fun/coin/G4P6eVitre7JjcnfWDH5dcNcA86Wzn7XsFiCVaaSpump`
- Memecoin energy is allowed here: subtle accent glow on hover, ticker entrance animation

### Section 5 — Live Tracker
- Big number: total raised, USD
- **Empty state for launch:** *"Just launched — 0 raised. You're early."* (turns the empty state into a feature)
- Below: recent contributors list (also empty-state-ready)
- A timestamp for "last updated"
- Server-rendered with `cacheLife({ revalidate: 60 })`. Wrapped in `<Suspense>` with a skeleton fallback.
- Powered by `lib/donations.ts:getDonationStats()` — the **only** place in the codebase that knows where donation data comes from. Today: returns zeros. Tomorrow: swap implementation when donate.gg is live, no UI changes.

### Section 6 — NHS
- Short paragraph on Northshore Humane Society (no-kill, Louisiana, scope of operations)
- One link out to their official site
- Optional: NHS logo (if available and usable; otherwise text only)

### Section 7 — FAQ + Footer
**FAQ (accordion, 5 entries):**
1. Is this real / who runs $RYOT?
2. **Where do the fees go?** — explains the 90/10 split, transparent about the operational use of the 10%
3. How does Northshore Humane Society actually receive the money?
4. Is donate.gg live yet?
5. How do I help if I don't buy the coin?

**Footer:** contract address (mono, copyable), pump.fun link, NHS link, social handles (to be filled in), copyright line.

---

## 5. Tech & data architecture

**Stack**
- Next.js 16, App Router, Server Components by default
- TypeScript strict mode
- Tailwind v4
- Framer Motion for animations
- shadcn/ui for primitives (button, accordion) — only what's used
- Hosted on Vercel; deploy on push to `main`

**Repo & deploy**
- Private GitHub repo (name TBD: `ryot`, `ryot-site`, or `ryot-coin` — Terrence's call)
- Linked to a new Vercel project; production domain `ryot.vercel.app`
- `.env.local` for any future secrets; `.env.example` checked in

**External data boundaries (3, each isolated):**

```
lib/token.ts        →  CONTRACT, PUMPFUN_URL constants. Optional future price fetch.
lib/donations.ts    →  getDonationStats(): single async function returning
                       { totalUsd, lastUpdated, recentContributors: [] }.
                       Today: returns the empty/zero state.
                       Tomorrow: swap function body for donate.gg integration.
                       Components import the typed result, not the source.
lib/charity.ts      →  NHS constants (name, mission line, URL).
```

**Rendering strategy**
- Page is mostly static (Server Components) for speed and SEO.
- Tracker section is dynamic, server-fetched, cached on the edge for 60s via `cacheLife`.
- Falls back gracefully if `getDonationStats()` throws — empty-state UI is shown instead of an error.

---

## 6. Animation plan

**Philosophy:** animation carries the emotional arc. Slow and quiet at the top, more energetic at the bottom. Story section is intentionally restrained — over-animation undercuts the message.

**Hero**
- Word-by-word fade-in of the headline (~80ms stagger)
- Subtle water-ripple on the pond surface (canvas, ~3% intensity, GPU-cheap, off on `prefers-reduced-motion`)
- Vignette tightens slightly on first scroll (camera-pulling-in feel)

**Story**
- Each beat scroll-revealed: `y: 20 → 0`, opacity `0 → 1`, ~600ms ease-out
- A single hairline ember-orange line draws across as the second beat hits ("He got out.")
- The third beat enters slightly slower — deliberate weight

**Stakes**
- Numbers count up from zero on first view (~1.2s ease-out)

**Coin**
- Ticker `$RYOT` entrance pop on first reveal
- Buy button hover: scale 1.02, soft shadow lift, accent glow
- Contract address copy: small success pulse + micro-bounce

**Tracker**
- Total raised: count-up animation when value changes
- Empty state: a slow pulsing dot ("waiting for first donation")
- Recent contributors: new entries slide in from top with a soft highlight that fades over 2s

**FAQ**
- Standard accordion expand/collapse (~200ms)

**Cross-cutting**
- All animations respect `prefers-reduced-motion` (instant fade-in or no motion)
- Mobile: ripple disabled, count-ups preserved, micro-interactions kept
- No scroll-jacking. Browser back/forward works normally.

---

## 7. Component / file structure

```
ryot/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── opengraph-image.tsx
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── story.tsx
│   │   ├── stakes.tsx
│   │   ├── coin.tsx
│   │   ├── tracker.tsx
│   │   ├── nhs.tsx
│   │   └── faq.tsx
│   ├── tracker/
│   │   ├── donation-counter.tsx
│   │   ├── empty-state.tsx
│   │   └── recent-contributors.tsx
│   ├── ui/                          # shadcn primitives
│   ├── water-ripple.tsx
│   ├── copy-button.tsx
│   └── reveal.tsx
├── lib/
│   ├── token.ts
│   ├── donations.ts
│   ├── charity.ts
│   └── utils.ts
├── public/
│   ├── ryot/
│   │   └── pond.jpg
│   └── nhs-logo.svg
├── docs/superpowers/specs/
│   └── 2026-05-01-ryot-charity-site-design.md
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

**Boundaries**
- `lib/donations.ts` is the single integration point for donation data. Sections import the typed result and never reach into the source.
- `components/sections/*` each own their own copy and layout. No cross-section coupling.
- `components/reveal.tsx` is the one scroll-reveal primitive — sections don't reimplement Framer Motion glue.
- `components/water-ripple.tsx` is self-contained, accepts an image source, respects reduced-motion.

---

## 8. Anti-slop acceptance criteria

The site must not look or read like AI-generated slop. The following are **hard rules**, not preferences:

1. No three-card feature grid with lucide icons in a row anywhere on the page
2. No sparkle, rocket, or other decorative emojis in copy
3. No em-dash-heavy sentence cadence in body copy (the LLM tell). Spec docs allowed; site copy is not.
4. No default Tailwind palette (indigo-500, gray-900, blue-600). Use the Soft Gritty palette via CSS vars.
5. Real photos only. No AI-generated images of dogs, no abstract SVG hero illustrations.
6. Asymmetric / off-grid layouts where it serves the content. Don't center-justify everything.
7. Specific numbers, names, and dates over vague claims. If a stat is in the spec, it has a real source.
8. Restrained accent color use. Restraint reads intentional.
9. No glass-morphism stacked on glass-morphism.
10. **Explicit AI-slop pass before declaring done:** open the deployed site as a stranger would, read the copy out loud, and ask: *does this read human, or does this read like Claude shat it out?* If the answer is the second, rewrite.

This is a Definition of Done item, not a nice-to-have.

---

## 9. Acceptance criteria (Definition of Done)

The site is "done" when all of the following are true:

- [ ] Private GitHub repo created and linked to a new Vercel project at `ryot.vercel.app`
- [ ] Site deploys cleanly from `main` on push, no build warnings
- [ ] All seven sections present, in order, populated with real (not lorem) copy
- [ ] Cause-centered framing test passes for every section's copy
- [ ] Tracker handles the zero-donations empty state gracefully and is wired to `lib/donations.ts:getDonationStats()`; swapping that function's body to point at donate.gg requires no UI changes
- [ ] Contract address is copyable with confirmation feedback
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Mobile layout works at 375px width with no horizontal scroll
- [ ] Lighthouse on the deployed site: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] OG image renders Ryot + the headline correctly when the URL is shared
- [ ] Anti-slop acceptance criteria (Section 8) pass on a deliberate review pass
- [ ] Spec doc is committed at `docs/superpowers/specs/2026-05-01-ryot-charity-site-design.md`

---

## 10. Out of scope (explicitly)

- User accounts, login, dashboards
- A multi-page site or any blog/news section
- Connecting a wallet on-site to donate (donations happen via pump.fun and donate.gg, not on this site)
- Internationalization
- Analytics beyond Vercel's built-in (can be added later if needed)
- Email signup / newsletter
- AI-generated images, illustrations, or copy

---

## 11. Open items

- **Repo name:** Terrence to confirm — `ryot`, `ryot-site`, or `ryot-coin`. Default to `ryot` if no preference.
- **Stat source for Section 3 (Stakes):** find a reputable, citable source for U.S. shelter euthanasia or no-kill data during implementation. Do not invent.
- **Social handles:** to be supplied before final FAQ/footer content is written.
- **NHS logo asset:** confirm permission to use the official logo, or use text-only treatment.
- **Final font picks:** display serif (Fraunces vs Instrument Serif vs Crimson Pro) and sans (Inter vs Geist) chosen during implementation based on render quality on the actual photo and palette.

These do not block plan-writing. They get resolved during implementation.
