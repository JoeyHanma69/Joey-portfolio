# Cyberpunk animation spec

A build prompt for the eight Cyberpunk 2077-inspired animations, written
against this codebase as it actually stands. Hand the whole file to a
coding agent, or work through it section by section.

---

## 0. Context the implementer needs

**Stack:** React 19 + Vite 8, plain CSS, no animation library. `react-icons`
is the only UI dependency. Do not add GSAP, Framer Motion, Three.js or
`ogl` — `ogl` was already removed once from this project for being a
58 kB dependency serving one effect.

**Fonts** (only three are loaded; do not add more):

| Variable | Family | Used for |
| --- | --- | --- |
| — | `Rajdhani` 300–700 | Display and body. This is the typeface Cyberpunk 2077's own UI uses. |
| `var(--hud)` | `Share Tech Mono` | HUD labels, telemetry, eyebrows, chips |
| `var(--mono)` | `JetBrains Mono` | Code-ish data strings |

**Palette** — defined once in `src/index.css` `:root`. Never hardcode a
hex that already has a variable.

| Variable | Value | Role |
| --- | --- | --- |
| `--cp-red` | `#ff2d4a` | Structure: frames, hairlines, primary button, rules |
| `--cp-red-dim` | `#8f1a28` | Recessed red |
| `--cp-blue` | `#5ad8e6` | Data: readouts, chips, icons, fills |
| `--cp-cyan` | `#7fe9f2` | Active/hover state of blue |
| `--bg` / `--bg2` / `--bg3` | `#120709` / `#1a0b0e` / `#241114` | Oxblood grounds |
| `--text` / `--text-dim` | `#f0e4e6` / `#a1787e` | Copy |
| `--notch` | `10px` | Chamfer size |
| `--chamfer-br` | polygon | Bottom-right chamfer — the signature shape |
| `--chamfer-both` | polygon | Top-left + bottom-right chamfer |

Red is the chassis. Blue is what is being read off it. Keep that split —
it is the reason the current palette reads as a system rather than as two
colours sharing a page.

**Existing components** in `src/Components/`:

`CircuitBackground` (fixed canvas, circuit traces + pulses) · `HudFrame`
(bracketed viewport border + binary telemetry) · `HudWidgets` (margin
readouts: alert plate, data log, loading bar, barcode) · `Splash` ·
`Hero` · `Navbar` · `About` · `Projects` · `Skills` · `Certifications` ·
`Music` · `Contact` · `MusicButton` · `Particles` · `CursorTrail` ·
`ClickShockwave` · `SlashReveal`

**Existing hooks** in `src/`:

| Hook | Contract |
| --- | --- |
| `useScrollReveal` | Reveals `[data-reveal]` on scroll. Stagger with inline `style={{ '--reveal-delay': '120ms' }}`. Re-scans on DOM mutation. |
| `useMagnetic` | `[data-magnetic]` elements drift toward the cursor. |
| `useScramble` | `[data-scramble]` elements decrypt on hover. Time-based, not tick-based. |

**Current z-index map** — respect it, do not invent new top layers:

```
0      CircuitBackground
1      sections, .hud-widgets, .hero-overlay, .hero-scan
2      .hero-content
50     SlashReveal
100    .navbar
200    .music-btn
9995   .hud-frame
9997   ClickShockwave
9998   body::before  (scanlines)
9999   body::after   (CRT sweep), Splash
10000  cert modal
```

---

## 1. House rules — every animation must satisfy these

These are not style preferences. Each one exists because it was gotten
wrong at least once in this project.

1. **Readability wins.** No animation may sit behind body copy at full
   strength. The pattern that works is *spatial separation or masking*,
   not stacking dark scrims on top. `CircuitBackground` uses a radial
   `mask-image` that holds the centre at 25% and the margins at 100%;
   copy out of the way beats dimming the effect until it is mud.
2. **Respect `prefers-reduced-motion: reduce`.** Either render a static
   final state or do not mount. Never just slow it down.
3. **Pause when the tab is hidden.** Any `requestAnimationFrame` loop
   starts with `if (document.hidden) return;`.
4. **Drive timing from elapsed time, not frame counts.** Browsers clamp
   timers in unfocused windows — `setInterval(28ms)` was observed running
   at ~1000ms. Compute progress as `(now - begun) / DURATION`.
5. **Gate expensive work on viewport width** with `matchMedia`, and
   *do not mount* rather than `display: none`. A hidden canvas still
   burns a GPU frame every tick.
6. **Cap `devicePixelRatio` at 1.5** for any full-screen canvas.
7. **Clean up in the effect return.** Cancel rAF, remove listeners,
   disconnect observers.
8. **Rewriting `textContent` re-fires `mouseover`** because it replaces
   the text node under the pointer. Any hover effect that rewrites text
   needs a re-entry guard or it restarts forever. See `useScramble`.
9. **Do not add a new colour.** If an effect seems to need one, it is
   using red or blue in the wrong role.

---

## 2. The animations

Ordered as recommended. Each lists files, behaviour and acceptance
criteria.

### 2.1 — Breach Protocol boot `[MEDIUM] [DO FIRST]`

**Source:** the hacking minigame. A matrix of hex pairs; you select a
path to upload a daemon sequence.

**Replaces:** `src/Components/Splash.jsx`, which is currently a name, a
subtitle and a bar on a 3200 ms timer.

**Files:** rewrite `Splash.jsx` + `Splash.css`.

**Behaviour**

- A 5×5 or 6×6 grid of hex pairs drawn from `1C 55 BD E9 FF 7A E9 1C`.
- Header line in `var(--hud)`: `BREACH PROTOCOL // LOADING PORTFOLIO`.
- A `BUFFER` row of empty chamfered slots above the grid.
- A highlight sweeps the grid row-then-column, alternating axis like the
  real minigame. Each "selection" flies a hex pair into the next buffer
  slot.
- Buffer fills over ~2.4 s, then `SEQUENCE UPLOADED` flashes in
  `--cp-blue` and the whole overlay wipes away via `clip-path`.
- A countdown timer bar in `--cp-red` runs the full duration.

**Constraints**

- Total duration **must not exceed 3200 ms** — `App.jsx` holds content at
  `opacity: 0` until `onDone()` fires. A slow loader is a bounce.
- Under reduced motion: render the completed state and call `onDone()`
  after 400 ms.
- Keep `z-index: 9999`.

**Acceptance:** `onDone()` always fires exactly once, even if the
animation is interrupted. No layout shift when it unmounts.

---

### 2.2 — Kiroshi scan brackets `[LOW]`

**Source:** the optics scanner — corner brackets snap onto a target and a
data readout types in beside it.

**Applies to:** `.project-card` and `.cert-card`.

**Files:** `src/index.css` (shared card kit), optionally a
`useTypeOut` hook if the readout should type character by character.

**Behaviour**

- On hover, four corner brackets (red, 2 px, ~18 px arms) animate inward
  from ~12 px outside the card to flush with its corners, over 260 ms.
- Simultaneously a small `var(--hud)` readout appears top-right in
  `--cp-blue`: `SCAN // OK`, or the project's stack count.
- Cards already have a `::before` scan bar and a `::after` is free on
  some — you will likely need one wrapper element rather than fighting
  for pseudo-element slots. Check before writing.

**Constraints**

- Pointer-fine only. On touch there is no hover; do not leave brackets
  stuck visible.
- Must not shift layout — brackets are absolutely positioned.

**Acceptance:** hovering a card never changes its box size. Brackets
retract cleanly on mouseleave.

---

### 2.3 — Quickhack upload bar `[LOW]`

**Source:** the quickhack menu — a vertical list with RAM cost and an
upload bar that fills before the hack lands.

**Applies to:** `.btn-primary` / `.btn-secondary`, and card action links.

**Files:** `src/index.css`.

**Behaviour**

- On hover, a 2 px bar sweeps left-to-right across the bottom edge of the
  button in `--cp-blue` over ~420 ms.
- On completion the label briefly swaps to `UPLOADED`, then back.
- A small RAM-cost style glyph sits at the left: `[3]`.

**Constraints**

- The label swap must compose with `useScramble`, which already rewrites
  `textContent` on these elements. **Do not add a second hover handler
  that also writes `textContent`** — extend `useScramble` or drive the
  swap purely in CSS with a `::after`. Two writers will fight.

**Acceptance:** hovering a CTA repeatedly never leaves it stuck on
`UPLOADED` or on scrambled glyphs.

---

### 2.4 — Perk tree skills `[MEDIUM]`

**Source:** the skill trees — hex nodes joined by lines that light as
they unlock.

**Applies to:** `src/Components/Skills.jsx` / `Skills.css`. Currently a
grid of chamfered panels, each a category with chips.

**Behaviour**

- Each category panel becomes a node cluster: the category is a filled
  hex, each skill a small hex on a short connector.
- As the section scrolls in, nodes light in sequence outward from the
  category hex — reuse `[data-reveal]` with increasing `--reveal-delay`
  rather than writing a new scroll observer.
- Unlit node: `--cp-red-dim` outline. Lit: `--cp-blue` fill, brief glow.

**Constraints**

- There are **8 categories and ~50 skills**. A literal tree will not fit
  a phone. Below 900 px fall back to the current chip layout.
- Hex shapes via `clip-path`, not images.

**Acceptance:** all skill text stays selectable and legible; no skill
name is clipped by its hex.

---

### 2.5 — Relic malfunction `[LOW]`

**Source:** Johnny Silverhand manifesting — red datamosh that builds,
peaks, and snaps back.

**Applies to:** `.hero-name`.

**Behaviour**

- Extend the existing `.glitch` `::before` / `::after` RGB-split.
- Every 8–14 s (randomised), run a 600 ms burst: horizontal slice offsets
  via `clip-path`, red channel pushed further than blue, slight
  `scaleY` jitter, then a hard snap back to clean.

**Constraints**

- Must be **occasional, not constant.** The existing glitch fires on a
  3.2 s loop at low opacity; this is the louder, rarer event. Do not run
  both at full strength.
- Nothing may move the text box — transforms only on the pseudo-elements.

**Acceptance:** at rest the name is perfectly crisp. Screenshotting at a
random moment usually catches it clean.

---

### 2.6 — Scan mode `[MEDIUM]`

**Source:** the scanner toggle — the world desaturates and scannable
objects gain outlines and data tags.

**Applies to:** site-wide, triggered by a HUD button or a key (`S`).

**Files:** new `src/Components/ScanMode.jsx`, plus a `body.scan-mode`
block in `index.css`.

**Behaviour**

- Toggling adds `body.scan-mode`: page desaturates to ~30%, a blue tint
  washes over, every `<section>` gains a red outline and a `var(--hud)`
  corner tag naming it (`SEC_03 // PROJECTS`).
- An entry sweep crosses the viewport once on activation.

**Constraints**

- Keyboard shortcut must not fire while an input or textarea has focus —
  the contact form would eat the key.
- Must be reversible with no residue; store nothing.

**Acceptance:** text contrast stays WCAG-legible in scan mode. Toggling
rapidly does not leave the page desaturated.

---

### 2.7 — Braindance scrub `[HIGH] — not recommended`

Layer tracks with a draggable playhead over the career timeline.

**Why it is listed but not recommended:** it is a large interaction
design for a control almost nobody will drag, and a timeline is something
recruiters skim rather than operate. Build 2.1–2.5 first and reassess.

---

### 2.8 — Cyberspace dive `[HIGH] — not recommended`

A grid-tunnel transition between sections.

**Why it is listed but not recommended:** it requires hijacking scroll.
That is the single fastest way to frustrate someone who just wants to
find your projects. If it is built anyway, it must degrade to native
scrolling on any `prefers-reduced-motion`, touch device, or keyboard
navigation.

---

## 3. Budget — what to cut

The site already runs: circuit field, scan bands, HUD frame, margin
widgets, glitch, scramble, magnetic buttons, scroll reveal, particles,
cursor trail and click shockwave.

**Adding three more effects without removing any will make it feel
cheap.** The weakest two, and the ones to delete first:

- `CursorTrail` — generic, not cyberpunk-specific, competes with the
  scramble and magnetic effects for the same attention.
- `ClickShockwave` — same, and it fires on every click including nav.

Removing both frees roughly the attention budget that 2.1 and 2.2 need.

---

## 4. Suggested order

1. **2.1 Breach Protocol boot** — biggest impact, runs once, cannot hurt
   readability because nothing else is on screen.
2. **Delete `CursorTrail` and `ClickShockwave`.**
3. **2.2 Kiroshi brackets** — cheap, and makes the project grid feel
   like a scanner.
4. **2.3 Quickhack bar** — cheap, pairs with 2.2.
5. **2.5 Relic malfunction** — cheap, high drama, zero layout risk.
6. **2.4 Perk tree** — the big structural one; do it when the rest is
   settled.
7. **2.6 Scan mode** — a reward for people who poke around.

---

## 5. Definition of done, per animation

- `npx vite build` clean.
- `npx eslint src --ext .js,.jsx` clean.
- No horizontal overflow at 375 px: `document.documentElement.scrollWidth
  === window.innerWidth`.
- Reduced-motion path verified, not assumed.
- No new console errors.
- Body copy contrast unchanged from before the effect was added.
