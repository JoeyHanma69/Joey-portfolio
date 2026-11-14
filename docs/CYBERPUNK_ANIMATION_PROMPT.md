Everything below this line is the prompt. Copy it whole into a coding
agent, or paste one numbered task at a time.

---

You are implementing a set of Cyberpunk 2077-inspired animations in an
existing React portfolio. Read this entire brief before writing code.

## The codebase

React 19 + Vite 8, plain CSS, no animation library. `react-icons` is the
only UI dependency.

Do not add GSAP, Framer Motion, Three.js or `ogl`. `ogl` was already
removed from this project once for being a 58 kB dependency serving a
single effect. If you believe an effect needs a library, build it with
canvas or CSS instead, or tell me why it is impossible.

Three fonts are loaded. Do not add more.

- `Rajdhani` 300–700 — display and body. This is the typeface Cyberpunk
  2077's own UI uses.
- `var(--hud)` = `Share Tech Mono` — HUD labels, telemetry, eyebrows, chips
- `var(--mono)` = `JetBrains Mono` — code-ish data strings

The palette lives in `src/index.css` `:root`. Never hardcode a hex that
already has a variable.

- `--cp-red` `#ff2d4a` — structure: frames, hairlines, primary button, rules
- `--cp-red-dim` `#8f1a28` — recessed red
- `--cp-blue` `#5ad8e6` — data: readouts, chips, icons, fills
- `--cp-cyan` `#7fe9f2` — active/hover state of blue
- `--bg` `#120709`, `--bg2` `#1a0b0e`, `--bg3` `#241114` — oxblood grounds
- `--text` `#f0e4e6`, `--text-dim` `#a1787e`
- `--notch` `10px`, `--chamfer-br`, `--chamfer-both` — the chamfer polygons

Red is the chassis. Blue is what is being read off it. Hold that split.
It is the reason the palette reads as a system rather than as two colours
sharing a page. Do not introduce a third colour — if an effect seems to
need one, it is using red or blue in the wrong role.

Components in `src/Components/`: `CircuitBackground` (fixed canvas,
circuit traces and pulses), `HudFrame` (bracketed viewport border and
binary telemetry), `HudWidgets` (margin readouts), `Splash`, `Hero`,
`Navbar`, `About`, `Projects`, `Skills`, `Certifications`, `Music`,
`Contact`, `MusicButton`, `Particles`, `CursorTrail`, `ClickShockwave`,
`SlashReveal`.

Hooks in `src/`, with their contracts:

- `useScrollReveal` — reveals `[data-reveal]` on scroll. Stagger with
  inline `style={{ '--reveal-delay': '120ms' }}`. Re-scans on DOM mutation.
- `useMagnetic` — `[data-magnetic]` drifts toward the cursor.
- `useScramble` — `[data-scramble]` decrypts on hover. Time-based.

Reuse these rather than writing new observers or hover handlers.

Current z-index map. Respect it; do not invent new top layers.

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

## Rules you must follow

These are not preferences. Each one is here because it was gotten wrong
in this project already.

1. Readability wins. No animation sits behind body copy at full strength.
   Fix it by moving the effect or masking it, never by stacking dark
   scrims on top. `CircuitBackground` uses a radial `mask-image` holding
   the centre at 25% and the margins at 100% — copy that approach.
   Scrims were tried and they made the effect muddy while the text still
   lost.
2. Honour `prefers-reduced-motion: reduce`. Render a static final state
   or do not mount. Never merely slow it down.
3. Any `requestAnimationFrame` loop begins with
   `if (document.hidden) return;`.
4. Drive timing from elapsed time, never from a frame or tick count.
   Browsers clamp timers in unfocused windows — a `setInterval(28)` in
   this project was measured running at about 1000 ms. Compute progress
   as `(now - begun) / DURATION`.
5. Gate expensive work on viewport width with `matchMedia`, and do not
   mount rather than `display: none`. A hidden canvas still burns a GPU
   frame every tick.
6. Cap `devicePixelRatio` at 1.5 for any full-screen canvas.
7. Clean up in the effect return: cancel rAF, remove listeners,
   disconnect observers.
8. Rewriting `textContent` replaces the text node under the pointer,
   which makes the browser fire `mouseover` again. Any hover effect that
   rewrites text needs a re-entry guard or it restarts every frame and
   never resolves. `useScramble` has one — read it before writing
   another text effect.
9. Do not add a dependency.

## Tasks

Work in this order. Stop after each task and report before continuing.

### Task 1 — Breach Protocol boot `[MEDIUM]`

Replace `src/Components/Splash.jsx` and `Splash.css`. The current splash
is a name, a subtitle and a bar on a 3200 ms timer.

Build the hacking minigame's loading screen:

- A 5×5 or 6×6 grid of hex pairs drawn from `1C 55 BD E9 FF 7A`.
- Header in `var(--hud)`: `BREACH PROTOCOL // LOADING PORTFOLIO`.
- A `BUFFER` row of empty chamfered slots above the grid.
- A highlight sweeps the grid row-then-column, alternating axis like the
  real minigame. Each selection flies a hex pair into the next buffer slot.
- Buffer fills over about 2.4 s, then `SEQUENCE UPLOADED` flashes in
  `--cp-blue` and the overlay wipes away via `clip-path`.
- A countdown bar in `--cp-red` runs the full duration.

Hard constraint: total duration must not exceed 3200 ms. `App.jsx` holds
all page content at `opacity: 0` until `onDone()` fires, so a slow loader
is a bounce. Under reduced motion, render the completed state and call
`onDone()` after 400 ms. Keep `z-index: 9999`.

Done when: `onDone()` fires exactly once even if interrupted, and there
is no layout shift on unmount.

### Task 2 — Delete two effects

Remove `CursorTrail` and `ClickShockwave` entirely — components, CSS, and
their usage in `App.jsx`.

The site already runs a circuit field, scan bands, a HUD frame, margin
widgets, glitch, scramble, magnetic buttons, scroll reveal and particles.
Adding more without removing any is what makes a site read cheap rather
than expensive. These two are the weakest: generic rather than
cyberpunk-specific, and competing with the scramble and magnetic effects
for the same attention.

### Task 3 — Kiroshi scan brackets `[LOW]`

Apply to `.project-card` and `.cert-card` in `src/index.css`.

On hover, four corner brackets in red, 2 px, roughly 18 px arms, animate
inward from about 12 px outside the card to flush with its corners over
260 ms. At the same time a small `var(--hud)` readout appears top-right
in `--cp-blue`: `SCAN // OK`, or the project's stack count.

Cards already use `::before` for a scan bar. Check which pseudo-element
slots are free before writing; you will probably need one wrapper element
rather than fighting for them.

Pointer-fine only — on touch there is no hover, so brackets must not get
stuck visible. Brackets are absolutely positioned and must not shift
layout.

Done when: hovering never changes a card's box size, and brackets retract
cleanly on mouseleave.

### Task 4 — Quickhack upload bar `[LOW]`

Apply to `.btn-primary`, `.btn-secondary` and card action links.

On hover a 2 px bar sweeps left to right across the button's bottom edge
in `--cp-blue` over about 420 ms. On completion the label briefly reads
`UPLOADED`, then returns. A RAM-cost glyph sits at the left: `[3]`.

Critical: `useScramble` already rewrites `textContent` on these elements
on hover. Do not add a second handler that also writes `textContent` —
two writers will fight. Either extend `useScramble` or drive the label
swap purely in CSS with a `::after`.

Done when: hovering a CTA repeatedly never leaves it stuck on `UPLOADED`
or on scrambled glyphs.

### Task 5 — Relic malfunction `[LOW]`

Apply to `.hero-name`, extending the existing `.glitch` `::before` and
`::after` RGB split.

Every 8–14 s, randomised, run a 600 ms burst: horizontal slice offsets
via `clip-path`, the red channel pushed further than the blue, slight
`scaleY` jitter, then a hard snap back to clean.

This must be occasional, not constant. The existing glitch already runs
on a 3.2 s loop at low opacity; this is the louder, rarer event, so do
not run both at full strength. Nothing may move the text box — transform
only the pseudo-elements.

Done when: at rest the name is perfectly crisp, and a screenshot at a
random moment usually catches it clean.

### Task 6 — Perk tree skills `[MEDIUM]`

Rework `src/Components/Skills.jsx` and `Skills.css`, currently a grid of
chamfered panels each holding a category and its chips.

Each category panel becomes a node cluster: the category is a filled hex,
each skill a small hex on a short connector. As the section scrolls in,
nodes light in sequence outward from the category hex — reuse
`[data-reveal]` with increasing `--reveal-delay` rather than writing a
new scroll observer. Unlit nodes carry a `--cp-red-dim` outline; lit
nodes fill `--cp-blue` with a brief glow.

There are 8 categories and about 50 skills, so a literal tree will not
fit a phone. Below 900 px, fall back to the current chip layout. Build
hexes with `clip-path`, not images.

Done when: all skill text stays selectable and legible, and no skill name
is clipped by its hex.

### Task 7 — Scan mode `[MEDIUM]`

Add `src/Components/ScanMode.jsx` and a `body.scan-mode` block in
`index.css`. Trigger from a HUD button and the `S` key.

Toggling desaturates the page to about 30%, washes it with a blue tint,
and gives every `<section>` a red outline and a `var(--hud)` corner tag
naming it, like `SEC_03 // PROJECTS`. An entry sweep crosses the viewport
once on activation.

The keyboard shortcut must not fire while an input or textarea has focus,
or the contact form will eat the key. The toggle must be fully reversible
and must store nothing.

Done when: text contrast stays legible in scan mode, and toggling rapidly
never leaves the page stuck desaturated.

## Not in scope

Two further ideas were considered and rejected. Do not build them unless
I ask.

- **Braindance scrub** — draggable layer tracks over the career timeline.
  Large interaction design for a control almost nobody will drag, over
  content recruiters skim rather than operate.
- **Cyberspace dive** — a grid-tunnel transition between sections. It
  requires hijacking scroll, which is the fastest way to frustrate
  someone trying to find my projects.

## Definition of done, for every task

- `npx vite build` runs clean.
- `npx eslint src --ext .js,.jsx` runs clean.
- No horizontal overflow at 375 px:
  `document.documentElement.scrollWidth === window.innerWidth`.
- The reduced-motion path is verified, not assumed.
- No new console errors.
- Body copy contrast is unchanged from before the effect was added.

Report what you changed, what you verified, and anything you could not
verify. If a task turns out to be a bad idea once you are inside the
code, say so rather than building it badly.
