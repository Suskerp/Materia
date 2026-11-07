# Material 3 Expressive for Materia

A working reference for agents who build or review Materia cards. It translates
Material 3 Expressive (M3E) from Jetpack Compose into what Materia ships: Lit 3
elements, CSS custom properties and Home Assistant cards.

Read [HANDOVER §4](HANDOVER.md#4-material-3-and-expressive) first. That section
covers the four token families and the colour traps (02–04), and this guide does
not repeat it. Where the two disagree, §12 of this guide says so and gives the
reason.

**Contents**

1. [How to read this guide](#1-how-to-read-this-guide)
2. [Principles: expressive or standard](#2-principles-expressive-or-standard)
3. [Colour](#3-colour)
4. [Typography](#4-typography)
5. [Shape](#5-shape)
6. [Motion](#6-motion)
7. [Interaction states, focus and targets](#7-interaction-states-focus-and-targets)
8. [Components](#8-components)
9. [Accessibility](#9-accessibility)
10. [Review checklist](#10-review-checklist)
11. [Materia mapping](#11-materia-mapping)
12. [Known divergences in Materia today](#12-known-divergences-in-materia-today)
13. [Sources](#13-sources)

---

## 1. How to read this guide

Every number is tagged with where it came from:

| Tag | Meaning |
|---|---|
| **[T]** | Read from a Google-published token source: the androidx `compose/material3/.../tokens/*.kt` files, the token and doc files in material-components-android (MCA), or `@material/web`. These files are generated from the same token set that m3.material.io documents. |
| **[G]** | Taken from the community guide (see §13) and not checked against a token file. |
| **[U]** | Not verified. Comes from general M3 knowledge or the spec images. Confirm it on m3.material.io before you build on it. |

m3.material.io is a JavaScript single-page app, so automated fetches return
only the page title. The spec pages could not be read directly. Verification
went through the generated token files instead.

**dp → CSS px.** Treat 1dp as 1 CSS px. Home Assistant runs at the device pixel
ratio, so the two line up in practice.

**The rule that outranks this guide:** *spec first, then calm.* Look up a value
before you invent one. If the spec offers a range, take the quieter end unless
the card has a reason to be loud (§2).

---

## 2. Principles: expressive or standard

M3 Expressive is not a different design system. It is M3 with more range: more
shapes, more sizes, spring motion, emphasized type and stronger use of tonal
containers. Google's research framing (design.google, §13) is that expression
should serve usability. A component becomes more prominent because it matters
more, not to decorate it.

On a dashboard, that means:

- **One hero per surface.** Use one expressive gesture per card, such as a
  shape morph, an emphasized numeral or a large button. If everything is
  emphasized, nothing reads as emphasized.
- **Expressive where the hand is.** Direct-manipulation feedback should feel
  physical: a press that squares a button, a selection that rounds it. Things
  that happen *to* the user, such as data refreshing or layout shifting, should
  stay quiet.
- **Size follows importance, not available space.** A 136px XL button is right
  for a single front-door action. It is wrong for a row of light toggles. When
  in doubt, take the next size down. (See AGENTS.md: calm, not bombastic.)
- **Prose is not decoration.** Expressive typography is for state and value.
  Explanatory small text in production UI is clutter.

### Choosing a motion scheme

M3 ships two motion schemes with identical token names, so you can switch
between them without renaming anything (§6).

| Use **expressive** spatial springs for | Use **standard** spatial springs for |
|---|---|
| Shape morphs on press and selection (buttons, button groups, toggles) | Layout changes such as expanding a row or revealing a section |
| A single hero moment per card (lock morph, alarm arm) | Anything that moves many elements at once |
| Small components under the finger | Repeated or ambient motion (refreshes, live values) |

**Never use a spatial (overshooting) spring for a value-bearing position.** A
slider handle, a progress head or a gauge needle that overshoots shows a value
the entity does not have. Use the effects springs there. Materia's slider
already does this (`src/primitives/slider.js`, `.slot`).

The source guide reports that Google recommends the expressive scheme "for most
situations" **[G]**. Materia is a dense, always-on household dashboard, so it
deliberately leans standard for anything ambient.

---

## 3. Colour

HANDOVER §4.1 is the canonical colour section: accent roles, container pairs,
the surface ladder and the state layer. What follows adds the roles M3E leans on
and the decisions agents most often get wrong.

### 3.1 Roles Materia may use

| Family | CSS variables | Job |
|---|---|---|
| Accent | `--md-sys-color-{primary,secondary,tertiary,error}` with `--md-sys-color-on-*` | Ink, strokes and fills with no text on them, or a filled button's container paired with its `on-*`. |
| Container | `--md-sys-color-*-container` with `--md-sys-color-on-*-container` | Any filled surface carrying text or icons. The pair carries a contrast guarantee. |
| Fixed **[U]** | `--md-sys-color-{primary,secondary,tertiary}-fixed`, `*-fixed-dim`, `on-*-fixed`, `on-*-fixed-variant` | Colours that keep the **same tone in light and dark** themes. |
| Surface ladder | `--md-sys-color-surface-container`, `-lowest`, `-low`, `-high`, `-highest` | Elevation *inside* a card. |
| Surface ends | `--md-sys-color-surface`, `surface-dim`, `surface-bright` **[U]** | Backgrounds. Rarely needed in a card. |
| Inverse | `--md-sys-color-inverse-surface`, `inverse-on-surface`, `inverse-primary` | Tooltips, the slider value indicator **[T]**, snackbars. |
| Outline | `--md-sys-color-outline`, `outline-variant` | Borders. Expressive outlined buttons use `outline-variant`. Draw unknown values in `outline-variant` (Trap 18). |

**Containers or fixed?** Use a container pair by default. It follows the
theme's light/dark tone mapping, so contrast with the surrounding surface holds
in both modes. Use a fixed role only when the colour has to *mean the same
thing* in both modes and sits on its own background, for example a
brand-coloured chip in a hero that also appears inside an always-dark media
card. Do not use fixed roles for anything that has to contrast with
`surface-*`, because in one of the two modes the tones will sit close together.
The theme Materia depends on (material-you-utilities-custom-harmonization) may
not emit fixed roles. Grep a real theme before you use one, and always give it a
fallback. Trap 04 applies:

```css
background: var(--md-sys-color-primary-fixed, var(--md-sys-color-primary-container));
color: var(--md-sys-color-on-primary-fixed, var(--md-sys-color-on-primary-container));
```

**Tonal surfaces.** M3E's "stronger tonal containers" means a selected, active
or important thing gets a *container fill*, not an outline or a shadow:

- Unselected toggle or button-group item: `surface-container` with
  `on-surface-variant`. This is FilledButtonTokens for the unselected toggle,
  and Materia's button group already uses it.
- Selected: `secondary-container` with `on-secondary-container` (calm), or
  `primary` with `on-primary` (the one primary thing per surface).
- Tonal emphasis inside a card: step **one** rung up the surface ladder. A card
  on `surface-container-low` with an inner well on `surface-container-high` is
  the normal pattern. Skipping rungs reads as a different component.

**Component colour defaults [T].** Use these before choosing your own:

| Component | Container / active | Content / track |
|---|---|---|
| Slider | handle + active track `primary` | inactive track `secondary-container` |
| Progress (linear / circular / wavy) | active `primary`, stop `primary` | track `secondary-container` |
| Loading indicator, uncontained | indicator `primary` | — |
| Loading indicator, contained | container `primary-container` | indicator `on-primary-container` |
| Floating toolbar, standard | `surface-container` | — |
| Floating toolbar, vibrant | `primary-container` | items `on-primary-container`; selected item `surface-container` / `on-surface` |
| FAB menu item | `primary-container` **[G]** | `on-primary-container` **[G]** |
| Slider value indicator | `inverse-surface` | `inverse-on-surface`, label-large |

### 3.2 Colour rules that recur in review

- Text and the fill beneath it never come from the same accent role at partial
  alpha (Trap 02).
- A card background is `var(--ha-card-background, …)`, never a bare surface rung
  (Trap 03).
- A Materia custom role (`--md-sys-cust-color-*`) never replaces a spec role
  when the spec names one. For example, the slider handle is `primary`, not the
  device tint (HANDOVER §4).
- Warning and error colours are for actual problems. Absence of data is
  `outline-variant`.

---

## 4. Typography

### 4.1 The baseline scale [T]

The scale has five roles and three sizes per role. Sizes and line heights are
in sp, which you should treat as px.

| Style | Size / line | Weight | Tracking |
|---|---|---|---|
| display-large / medium / small | 57/64 · 45/52 · 36/44 | 400 | −0.2 · 0 · 0 |
| headline-large / medium / small | 32/40 · 28/36 · 24/32 | 400 | 0 |
| title-large / medium / small | 22/28 · 16/24 · 14/20 | 400 · 500 · 500 | 0 · 0.2 · 0.1 |
| body-large / medium / small | 16/24 · 14/20 · 12/16 | 400 | 0.5 · 0.2 · 0.4 |
| label-large / medium / small | 14/20 · 12/16 · 11/16 | 500 | 0.1 · 0.5 · 0.5 |

title-large is 22px. HANDOVER says "22px is not on the scale". That holds for
*body* text, but title-large is 22. See §12.

Tracking is in px. The table follows the current androidx token file. Older
M3 material gives body-medium 0.25, display-large −0.25 and title-medium 0.15,
which is what HANDOVER and much of Materia use. The difference is sub-pixel, so
either set is acceptable. Do not invent a third value.

### 4.2 Emphasized styles (M3E) [T]

Every one of the 15 styles has an **emphasized** twin with the same size and
line height and a **heavier weight**. A few trackings also shift slightly:
body-large 0.15, body-medium 0.25, display-large 0, title-medium 0.15. In the
token file the weight step is 400 → 500 for display, headline, body and
title-large, and 500 → 700 for title-medium, title-small and all three label
styles.

On the web, emphasis is a weight change only:

```css
/* title-medium-emphasized */
font-size: 16px; line-height: 24px; letter-spacing: 0.15px; font-weight: 700;
```

Use emphasized styles for **the one thing a card is about**: the selected tab
label, a hero numeral, the current value next to a slider. Do not use them for
headings in general. Two emphasized styles in one card cancel each other out.

### 4.3 Materia specifics

- The body face is **Figtree** (`hostStyles`). The display voice is
  `--materia-font-display` (Outfit). The accent voice is `--materia-font-accent`
  (Fraunces). Use the display voice only for hero numerals and titles, once per
  card.
- Figtree is a variable font (300–900), so emphasized weights cost nothing.
  Weights outside the scale (600, 800) are not tokens.
- Add `font-variant-numeric: tabular-nums` anywhere digits change in place.
  Outfit has proportional figures, so reserve width by measuring (Trap 16).
- The spec's variable-font axes (width, roundness on Google Sans Flex) are not
  available in Figtree. Do not fake them with `transform: scaleX`.

---

## 5. Shape

### 5.1 Corner scale [T]

| Token | Radius | CSS |
|---|---|---|
| none | 0 | `0` |
| extra-small | 4 | `4px` |
| small | 8 | `8px` |
| medium | 12 | `12px` |
| large | 16 | `16px` |
| **large-increased** (M3E) | 20 | `20px` |
| extra-large | 28 | `28px` |
| **extra-large-increased** (M3E) | 32 | `32px` |
| **extra-extra-large** (M3E) | 48 | `48px` |
| full | 50% of the short side | `calc(height / 2)`, see below |

Materia has no `--md-sys-shape-*` variables. Radii are written as literals or
per-component custom properties. That is acceptable, but every literal must be
one of the values above, or derived from one with a stated reason.

**Full rounding on the web.** `border-radius: 999px` is only safe when all four
corners are equal. When some corners are full and others small (connected
buttons, slider track ends), the overlapping-curves rule in CSS Backgrounds
§5.5 scales **every** corner by one factor and the small corners disappear.
HANDOVER §4.3 covers this, and `slider.js` explains it in its comments. Write
the full radius as `calc(var(--h) / 2)` instead.

**Asymmetric shapes** such as a leading or trailing connected button, or a
split button's halves, use the four-value form
`border-radius: TL TR BR BL`. Mirror it for RTL using logical properties
(`border-start-start-radius` …) if a card can appear in an RTL locale.

### 5.2 Shape morphing

M3E components change shape with state. The consistent pattern **[T]** across
buttons is:

| State | Shape |
|---|---|
| Resting, round variant | full |
| Resting, square variant | per size: M → large 16, L/XL → extra-large 28, XS/S → medium 12 |
| **Pressed** | a *smaller* radius that is the same for round and square (XS/S 8, M 12, L/XL 16) |
| Selected (toggle) | round becomes square **[T]**; square becomes round **[U]** (spec prose; Compose's default checked shape is the square) |

On the web, a corner morph between rounded rectangles is just a
`border-radius` transition:

```css
.btn {
  border-radius: calc(var(--h) / 2);
  transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
              background-color var(--md-sys-motion-fast-effects);
}
.btn:active { border-radius: var(--r-pressed); }
.btn[aria-pressed="true"] { border-radius: var(--r-square); }
```

Pitfalls:

- `:active` lasts one frame on a touch release. Materia's button group replays
  the morph with WAAPI on click (`_playSelectionMotion`). Copy that pattern
  rather than relying on `:active` alone.
- `border-radius` does not interpolate cleanly between `999px` and `12px`,
  because the overlap scaling makes the curve snap. Transition between real
  values.
- Morph the **shape**, not the box. Use `transform: scale()` only for the
  brief press squash. Never use it to change layout size, because `transform`
  does not affect layout (Trap 19).

### 5.3 The 35-shape library

M3E adds 35 decorative shapes, `MaterialShapes` **[T]**: Circle, Square,
Slanted, Arch, Fan, Arrow, SemiCircle, Oval, Pill, Triangle, Diamond, ClamShell,
Pentagon, Gem, Sunny, VerySunny, Cookie4/6/7/9/12Sided, Ghostish, Clover4Leaf,
Clover8Leaf, Burst, SoftBurst, Boom, SoftBoom, Flower, Puffy, PuffyDiamond,
PixelCircle, PixelTriangle, Bun and Heart. Each is a `RoundedPolygon`, and any
two of them can be morphed with `Morph`.

**When to use them on the web:**

- **Yes:** avatar or icon containers, a hero glyph's backdrop, the loading
  indicator, a lock or alarm state shape. These are one-off, decorative and
  large enough to read.
- **No:** controls. Buttons, chips, sliders and cards stay rounded rectangles.
  A cookie-shaped button is a guessing game for the user.
- **No:** dense repetition. A grid of 12 clover tiles is noise.

**How Materia draws them.** `src/utils/shapes.js` ports the androidx
`RoundedPolygon` fillet geometry (`roundedPolygonPath`, `materialCookiePath`,
`softBurstPath`, `boomPath`, `gemPath`, `pillPath`, `arrowPath` …) to SVG path
strings. Draw shapes with those functions, not icon fonts or hand-drawn paths.
Use `segmentsBounds()` when you need the true outline, because tangent points
under-measure rounded corners.

**Morphing between two shapes on the web.** CSS can interpolate `clip-path:
path()` and the SVG `d` property only when both paths have **identical command
structure**. Two `MaterialShapes` with different vertex counts do not. You have
three options:

1. Resample both outlines to the same number of cubic segments in JS (what
   `androidx.graphics.shapes.Morph` does), then animate `d` frame by frame with
   `requestAnimationFrame` and `springAt()` from `motion.js`.
2. Crossfade two shapes and rotate them together. This is cheap, and the
   rotation hides the swap.
3. Choose shapes built by the same `roundedPolygonPath` call with the same
   `vertices`, which then share structure and transition in CSS directly.

Safari support for animating the CSS `d` property has historically lagged **[U]**.
Test on the HA iOS app, or use option 1.

---

## 6. Motion

### 6.1 Springs, not durations

M3E motion tokens are **springs** (stiffness and damping ratio) in two
families:

- **Spatial**: position, size, rotation, shape. The expressive variants
  overshoot.
- **Effects**: colour and opacity. These are critically damped and never
  overshoot.

Each family comes in fast, default and slow. Fast suits small components
(switches, buttons). Default suits partial-screen movement (sheets, rails).
Slow suits full-screen movement **[G]**. On a dashboard card, *fast* is almost
always correct and *slow* almost never is.

### 6.2 The official values [T]

| Token | Expressive (stiffness / damping) | Standard |
|---|---|---|
| fast spatial | 800 / 0.6 | 1400 / 0.9 |
| default spatial | 380 / 0.8 | 700 / 0.9 |
| slow spatial | 200 / 0.8 | 300 / 0.9 |
| fast effects | 3800 / 1.0 | same |
| default effects | 1600 / 1.0 | same |
| slow effects | 800 / 1.0 | same |

The effects springs are shared by both schemes. Only the spatial springs
differ.

### 6.3 Translating to CSS

CSS has no spring timing function. The faithful approximation is a
**`linear()` easing sampled from the spring**, paired with the spring's settle
time as the duration. With mass 1, settling to within 0.2% gives the following
(computed from the values in §6.2, rounded):

| Token | Settle | Peak overshoot |
|---|---|---|
| expressive fast spatial | ≈ 350 ms | 9.5 % |
| expressive default spatial | ≈ 410 ms | 1.5 % |
| expressive slow spatial | ≈ 570 ms | 1.5 % |
| standard fast / default / slow spatial | ≈ 155 / 220 / 335 ms | 0.15 % |
| fast / default / slow effects | ≈ 140 / 210 / 300 ms (0.5 % settle; motion.js uses 150 / 233 / 329 ms at a tighter threshold, keep those) | 0 |

Only **expressive fast spatial** visibly bounces. Default and slow expressive
settle with barely any overshoot. They feel softer, not springier.

**Use the tokens, never literals.** `src/utils/motion.js` exposes each token as
a shorthand (`<duration> <easing>`) and as separate `-duration` and `-easing`
properties:

```js
static styles = [motionTokens, css`
  .chip {
    transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
                background-color var(--md-sys-motion-fast-effects);
  }
`];
```

For WAAPI, import `MOTION` and use `{ duration: MOTION[k].ms, easing:
MOTION[k].easing }`. For canvas or SVG frame loops, use `springAt(t, k, zeta)`.

Rules:

- Never pair a spring's `-easing` with a duration you chose yourself. A
  `linear()` curve stretched to a different duration is a different spring.
- `linear()` needs Chrome 113, Firefox 112 or Safari 17.2. The HA companion apps
  on older iOS will ignore the whole declaration. A `cubic-bezier` fallback
  declaration placed before it only helps for literal values: a `var()`-based
  declaration always parses, wins the cascade and then drops to no easing. For
  tokens, put the fallback inside motion.js, e.g. under
  `@supports not (transition-timing-function: linear(0, 1))`.
- **Interruption.** A real spring retargets from its current velocity, but a CSS
  transition restarts from the current *value* with zero velocity. For drags,
  drive position directly from the pointer, and use the spring only for the
  release.
- Duration-based tokens still exist for non-spring work [T]: `short1–4` = 50–200
  ms, `medium1–4` = 250–400, `long1–4` = 450–600, `extra-long1–4` = 700–1000.
  Easings: standard `cubic-bezier(0.2, 0, 0, 1)`, standard-decelerate `(0, 0, 0,
  1)`, standard-accelerate `(0.3, 0, 1, 1)`, emphasized-decelerate `(0.05, 0.7,
  0.1, 1)`, emphasized-accelerate `(0.3, 0, 0.8, 0.15)`. Use these for keyframe
  loops such as the loading indicator's rotation, not for state changes.

> **Divergence:** Materia's current `motion.js` curves do not match §6.2. Its
> expressive spatial springs overshoot 15 %, 12 % and 8 %, and its standard
> spatial springs settle in 250, 392 and 575 ms. See §12. Do not hand-correct
> individual cards. Regenerate the table instead.

### 6.4 Reduced motion

`motionTokens` collapses every token to `1ms linear` under
`prefers-reduced-motion: reduce`, including the split `-duration` and `-easing`
properties. As a consequence:

- Anything that uses the tokens is handled automatically.
- Anything that does **not** use them (keyframe loops, WAAPI calls, rAF loops)
  must check `matchMedia("(prefers-reduced-motion: reduce)")` itself. Materia's
  button group does this.
- Reduced motion does not mean *no feedback*. Keep colour and state-layer
  changes so the user still sees that a press registered. Stop continuous
  motion: wavy progress becomes flat, and the loading indicator becomes a
  static shape or a slow opacity pulse.

---

## 7. Interaction states, focus and targets

### 7.1 State layers

A state layer is `currentColor` (the content colour) drawn over the container
at a fixed opacity:

| State | Opacity |
|---|---|
| Hover | 8 % [T] |
| Focus | 10 % [T] (12 % in `@material/web` 2.x) |
| Pressed | 10 % [T] (12 % in `@material/web` 2.x) |
| Dragged | 16 % [T] |

The current androidx tokens say 10 % for focus and press. Older M3 and
material-web say 12 %. Either is defensible, but pick one per component and do
not mix them inside a group. Materia's button uses 10 % and its button group
uses 12 %.

```css
.surface { position: relative; overflow: hidden; }
.surface::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: currentColor; opacity: 0; pointer-events: none;
  transition: opacity var(--md-sys-motion-fast-effects);
}
.surface:hover::before { opacity: .08; }
.surface:active::before { opacity: .10; }
@media (hover: none) { .surface:hover::before { opacity: 0; } }
```

The `hover: none` guard stops a sticky hover tint after a tap on touch screens.

Disabled content is `on-surface` at 38 %, and disabled containers are
`on-surface` at 12 % [T]. Materia also greys out unavailable entities
(`unavailableStyles`). That is a deliberate addition beyond the spec, and it is
documented in the code.

### 7.2 Focus ring [T]

| Property | Value |
|---|---|
| Width | 3px |
| Offset | 2px outward |
| Colour | `secondary` |
| Shape | follows the element's own radius |

```css
.target:focus-visible {
  outline: 3px solid var(--md-sys-color-secondary, currentColor);
  outline-offset: 2px;
}
```

Use `:focus-visible`, never `:focus`, so a pointer press does not draw the
ring. Several Materia elements use `primary` for the ring, and the button group
uses an inset ring. See §12.

### 7.3 Touch targets

- The **minimum interactive target is 48 × 48** [T], from MCA's slider "minimum
  touch target 48dp" and the M3 accessibility guidance. The *visual* size can be
  smaller. XS buttons are 32px tall, so the target extends invisibly around
  them. Materia's pattern is `min-height: max(48px, var(--h))` on the
  interactive wrapper, with the visual surface centred inside it.
- Adjacent targets must not overlap. In a connected group with 2px seams, each
  button's own box is the target, and the group's height is
  `max(48px, height)`.
- Drag targets (sliders) take the full row height, which for an XS slider is the
  44px handle height. Materia's slider lays a native `<input type="range">` over
  the whole row.

---

## 8. Components

Each entry gives the spec facts, then the web translation, then Materia's
status. The table in §11 summarises Materia's status for every component.

### 8.1 Buttons (the size ladder everything else reuses) [T]

| Size | Height | Icon | Icon–label gap | Side padding | Square radius | Pressed radius | Outline width | Label |
|---|---|---|---|---|---|---|---|---|
| XS | 32 | 20 | 8 | 16 | 12 | 8 | 1 | label-large |
| S | 40 | 20 | 8 | 16 | 12 | 8 | 1 | label-large |
| M | 56 | 24 | 8 | 24 | 16 | 12 | 1 | title-medium **[U]** |
| L | 96 | 32 | 12 | 48 | 28 | 16 | 2 | headline-small **[U]** |
| XL | 136 | 40 | 16 | 64 | 28 | 16 | 3 | headline-large **[U]** |

There are five colour styles: filled, tonal, outlined, elevated and text.
Toggle buttons swap the unselected and selected colours and morph shape (§5.2).
For calm sizing, S and M cover nearly every card. L and XL belong to a single,
deliberate, primary action.

### 8.2 Button groups

M3E has **one component with two configurations** [T, MCA]:

**Standard button group.** Independent buttons laid out in a row.

- Spacing between buttons is **12 dp at S** [T]. Other sizes **[U]**: XS 18,
  M/L/XL 8.
- **Width morph on press [T]:** the pressed button grows by
  `ExpandedRatio = 0.15` (15 % of its width), and its immediate neighbours give
  up that width, using the **fast spatial** spring. The total row width does
  not change.
- Every button in a group uses the same size. Shapes may be round or square,
  but the whole group uses one or the other.
- Overflow collapses into a trailing "more" icon button that opens a menu.

On the web, you can approximate the width morph with flex-grow, because flex
is animatable:

```css
.group { display: flex; gap: 12px; }
.group > * { flex: 1 1 0; transition: flex-grow var(--md-sys-motion-expressive-fast-spatial); }
.group > .pressed { flex-grow: 1.15; }
```

This is an approximation: with n equal items, `flex-grow: 1.15` widens the
pressed button by 0.15/(n+0.15) (≈ 9.5 % for three) and shrinks all siblings,
not only its neighbours, whereas Compose grows 15 % and takes the space from the
adjacent buttons. For content-sized buttons, measure the widths and animate them
with WAAPI. Neighbours shrinking slightly is part of the effect.

**Connected button group.** This replaces the deprecated segmented button.

- **2 dp** between buttons [T].
- Outer corners are full. **Inner corners are 8 dp at S** [T], **pressed inner
  corners are 4 dp** [T], and the **selected** button's inner corners go to
  **50 %**, so the selected button becomes a fully rounded pill inside the row
  [T].
- Other sizes **[U]**, as Materia uses them: inner corners XS 4, M 8, L 16, XL
  20.
- **No width morph.** Selection is shown by shape and colour only.
- ARIA: single-select groups use `role="radiogroup"` with `role="radio"`, or
  `aria-pressed` on buttons inside a `role="group"`. Multi-select groups use
  `aria-pressed`.

### 8.3 Split button [T]

A leading action and a trailing menu toggle, joined as a special case of a
connected group.

| Size | Height | Inner corner | Inner corner pressed/hovered | Trailing icon |
|---|---|---|---|---|
| XS | 32 | 4 | 8 | 22 |
| S | 40 | 4 | 12 | 22 |
| M | 56 | 4 | 12 | 26 |
| L | 96 | 8 | 20 | 38 |
| XL | 136 | 12 | 20 | 50 |

The gap is always 2 dp, and outer corners are full. When the menu is open, the
trailing half becomes a **circle** (inner corners 50 %) and its chevron rotates
180°. The colour styles are filled, tonal, elevated and outlined. Expose
`aria-expanded` and `aria-haspopup="menu"` on the trailing half.

### 8.4 FAB and FAB menu [T]

The FAB menu **replaces the speed dial and stacks of small FABs**. It opens
from any FAB size. When open, the FAB becomes a 56 dp circular close button
with a 20 dp icon. Menu items are pill-shaped, 56 dp tall, with 4 dp between
items, 24 dp side padding, a 24 dp icon and an 8 dp icon–label gap, at
elevation level 3.

On a dashboard, a FAB is rarely right because the page already has HA's own
chrome. A FAB menu fits only inside a full-screen popup (browser_mod) or a
large hero card that owns a context.

### 8.5 Toolbars [T]

- **Floating toolbar:** 64 dp tall, full radius, 16 dp from the edge, 8 dp
  leading and trailing space, 4 dp between items. The *standard* style uses
  `surface-container`. The *vibrant* style uses `primary-container`, with
  `on-primary-container` items and a `surface-container` selected item. It can
  be horizontal or vertical, and it can pair with a FAB.
- **Docked toolbar:** 64 dp tall, **square corners**, 16 dp leading and
  trailing space, 4–32 dp between items. It **replaces the bottom app bar**,
  which is deprecated but still available.

In Materia, a toolbar is a *pattern* (a row of icon buttons in a
`surface-container` pill), not a card. If one is needed, compose it from
`materia-button-group` with `group: standard` and icon-only buttons rather than
adding a card.

### 8.6 Loading indicator [T]

This is for waits **under about five seconds**. It replaces most indeterminate
circular spinners [T, MCA]. HANDOVER §4.4 has the determinate-versus-indeterminate
test.

- Container 48 × 48, full radius. Indicator 38 dp.
- Uncontained: `primary`. Contained: `on-primary-container` on
  `primary-container`.
- The indeterminate version morphs through **SoftBurst → Cookie9 → Pentagon →
  Pill → Sunny → Cookie4 → Oval**. It starts a new morph every **650 ms** with
  a spring (stiffness 200, damping 0.6), adds a quarter turn with each morph,
  and runs a continuous linear 360° rotation every **4666 ms**.
- The determinate version morphs Circle → SoftBurst and rotates −180° across
  0 → 100 %.

Web recipe: precompute the seven outlines with `shapes.js` at one vertex count,
then animate in a rAF loop. Under reduced motion, show a static SoftBurst. No
Materia element implements this yet.

### 8.7 Progress indicators [T]

| | Linear | Circular |
|---|---|---|
| Track / active thickness | 4 (thick: 8 [T, MCA]) | 4 |
| Active–track gap | 4 | 4 |
| Stop indicator (end dot) | 4 | — |
| Size | — | 40 (wavy: 48) |
| **Wave amplitude** | 3 | 1.6 |
| **Wavelength** | 40 determinate · 20 indeterminate | 15 |
| Wave container height | 10 | — |
| Colours | active `primary`, track `secondary-container` | same |

- In the determinate wavy version, **the amplitude is zero below 10 % and above
  95 %** progress, ramping in and out over `long2` (500 ms). The wave should
  never wiggle at the start or the end of a task.
- The wave travels continuously. Under reduced motion, stop it and draw a flat
  line.
- **Contained** progress (M3E) **[U]**: a thick track with a rounded active
  segment inset inside it, used for media and timers. It is the same tokens at
  the thick size.
- The stop indicator is required when the track has less than 3:1 contrast with
  its background [G].

Web translation: draw the wave as an SVG path, sampling `sin` across the
width, and clip it to the progress. Animate the phase with a CSS `translateX`
of one wavelength (as `materia-media-progress` does). For rings, use
`pathLength="100"` (Trap 19).

### 8.8 Sliders [T]

This is the most detailed M3E redesign, and the one Materia is closest to.
`src/primitives/slider.js` carries the token citations.

**Anatomy:** value indicator (optional), stop indicators (optional), active
track, handle, inactive track and inset icon (optional).

**Sizes** [T, from MCA `m3_comp_slider_*` tokens]:

| Size | Track height | Track outer corner | Handle height | Inset icon |
|---|---|---|---|---|
| XS (default) | 16 | 8 | 44 | — |
| S | 24 | 8 | 44 | — |
| M | 40 | 12 | 44 | 24 |
| L | 56 | 16 | 68 | 24 |
| XL | 96 | 28 | 108 | 32 |

**Shared geometry** [T]:

- Handle: **4 dp wide** at every size, full radius. Its width narrows to **2 dp
  when pressed or focused**. Hover leaves it at 4 dp.
- There is a **6 dp gap** between the handle and the track on both sides.
- **Inside corners** (the track ends facing the handle) are **2 dp**. Outer
  corners use the size's corner value above.
- Stop indicators are **4 dp** dots with 6 dp trailing space [T]. Their
  placement inside the cap at S and up is **[U]**. Materia centres them in the
  cap, which gives exactly 6 dp at XS but more at S and M.
- Value indicator: an `inverse-surface` pill with `inverse-on-surface`
  label-large text, **12 dp above** the handle [T]. It shows only while
  dragging or focused.
- Colours: active track and handle `primary`; inactive track
  `secondary-container`; disabled handle and active track `on-surface` 38 %,
  disabled inactive track `on-surface` 12 %.

**Configurations:**

- **Standard** (formerly "continuous") and **stops** (formerly "discrete"),
  which draws a stop indicator per step [T, MCA].
- **Centred:** the active track grows from the midpoint towards the handle in
  either direction, for signed values such as EQ, balance or a temperature
  offset [T, MCA]. Stop indicators sit at both ends.
- **Range:** two handles with the active track between them. Each handle keeps
  its own 6 dp gaps.
- **Vertical:** the same tokens rotated. Track "height" becomes width
  [T, MCA]. Usually bottom-to-top (`reverseDirection` in Compose).
- **Inset icon:** M, L and XL only, standard configuration only [T, MCA]. The
  icon sits inside the track at the leading end. When the active track becomes
  too short to hold it, it moves to the inactive side **[U]**. Use it for a
  glanceable meaning such as volume or brightness, not as a label substitute.

**Web translation:**

- Keep a transparent native `<input type="range">` over the drawn parts. It
  provides keyboard handling, `role="slider"`, `aria-valuenow` and touch input.
  Size its thumb to the handle width so pointer-to-value mapping matches the
  drawing. Materia does this.
- Handle travel is `0 … (width − 4px)`. The active track ends one gap before
  the handle, and the inactive track starts one gap after it.
- Write outer radii as numbers (`8px`, `12px` …), never `999px`, or the 2 dp
  inside corners collapse (§5.1).
- For vertical sliders, rotate a horizontal slider with
  `writing-mode: vertical-lr; direction: rtl` on the input. Do not use
  `transform: rotate`, which leaves layout untouched (Trap 19).
- Move the handle with an **effects** spring, never a spatial one (§2).
- Animate the pressed narrowing with **fast effects**.

### 8.9 Carousel [U]

M3 carousels show items at large, medium and small widths in one row, and items
change size as they scroll. The layouts are *multi-browse* (mixed sizes),
*uncontained* (same size, edge-cut), *hero* (one large item plus a small
preview) and *full-screen* (vertical). Items are clipped with an extra-large
(28) radius and keep their content centred while their mask narrows **[U]**.
On the web, use `scroll-snap-type: x mandatory` with mask widths driven by a
scroll-timeline or an IntersectionObserver. `materia-cards` with
`carousel: true` is a scrolling rail of equal tiles, which is closest to
*uncontained*.

### 8.10 Lists [U]

M3E lists add **segmented** styles, where each item is its own rounded tonal
surface separated by small gaps, and an **expanded** style for selected items
(`ExpandedListTokens` exists [T]). In a segmented list, the first and last
items carry the outer radius and the inner items carry small radii, which is
the same idea as a connected button group. Selection is shown by a container
fill, not a check alone. `materia-list` with its tonal surface is the
foundation for this.

### 8.11 Navigation [U except where marked]

- **Navigation bar:** shorter in M3E. Items can show the icon above the label
  (narrow screens) or beside it (medium screens). The active indicator is a
  pill behind the icon. ("Short navigation bar".)
- **Navigation rail:** collapsed and expanded states. The expanded rail
  replaces the navigation drawer in many layouts. The active item's indicator
  grows to hold the label. `materia-tabs` (vertical tab rail) follows this
  pattern.
- **Tabs:** primary tabs use an indicator under the content's width, and
  secondary tabs use a full-width underline. `ScrollableTabRow` is deprecated
  in favour of the primary and secondary scrollable variants [T, Compose].

Home Assistant owns page navigation. Materia only implements *in-card*
navigation (tabs, segmented choices). Do not rebuild HA's sidebar or header.

### 8.12 App bars [U]

M3E adds **flexible** medium and large top app bars, with a subtitle and
expressive collapse on scroll, and deprecates the bottom app bar in favour of
the docked toolbar (§8.5) [T, MCA]. In Materia, `materia-heading` (a section
heading) and the hero cards fill the visual role of a large app bar title.
Never pin a bar inside a card.

### 8.13 Deprecated or replaced in M3E

| Old | Use instead | Source |
|---|---|---|
| Segmented button | Connected button group | [T, MCA] |
| Bottom app bar | Docked toolbar | [T, MCA] |
| Speed dial / stacked small FABs | FAB menu | [T, MCA] |
| Indeterminate circular progress for short waits | Loading indicator | [T, MCA] |
| "Continuous" / "discrete" slider names | "Standard" / "stops" | [T, MCA] |
| 4 dp track + 20 dp round thumb slider | 16 dp+ track, 4 dp bar handle | [T] |
| Navigation drawer in many layouts | Expanded navigation rail | [U] |
| `ScrollableTabRow` | Primary/secondary scrollable tab rows | [T, Compose] |
| Colour roles `background`, `on-background`, `surface-variant` | `surface`, `on-surface`, `surface-container-*` | HANDOVER §4 |

---

## 9. Accessibility

- **Contrast:** text needs 4.5:1, or 3:1 at 18.66px bold / 24px regular and
  above. Non-text UI parts (track edges, focus rings, icons) need 3:1. Use
  container pairs to get this for free. `test/palette-contrast.test.js` guards
  Materia's own palette. Extend it when you add a custom role.
- **Never by colour alone:** a selected button group item changes shape as
  well as colour, and an unknown value gets an em dash as well as an
  `outline-variant` track.
- **Targets:** 48 × 48 minimum (§7.3).
- **Focus:** every interactive element shows a `:focus-visible` ring (§7.2).
  Composite widgets (button groups, tabs) need a keyboard model, using arrow
  keys and roving `tabindex`.
- **Names:** icon-only buttons need `aria-label`. Sliders need `label` (it
  passes through to the input's `aria-label`) and a human `aria-valuetext`
  such as "42 %" or "21.5 °C".
- **Motion:** respect `prefers-reduced-motion` (§6.4). Nothing should flash
  more than three times per second.
- **Text scaling:** sizes in px follow HA's zoom. Do not clip labels to fixed
  heights. Ellipsize, and let the row grow.

---

## 10. Review checklist

Use this when reviewing a card or element.

**Do**

- [ ] Every colour is a role, with a fallback chain for anything non-spec
      (Trap 04). Text on a fill comes from a container pair.
- [ ] Every radius is on the §5.1 scale, or derived from height with a comment.
- [ ] Every font size, line height and weight is a §4 style, or its emphasized
      twin.
- [ ] Every transition uses `--md-sys-motion-*`: spatial for shape and
      position, effects for colour and opacity.
- [ ] Value-bearing positions (handles, needles, progress heads) use effects
      springs.
- [ ] Hover 8 %, press 10–12 % state layers, with `@media (hover: none)`
      handled.
- [ ] `:focus-visible` ring, 3px, offset 2px, `secondary`.
- [ ] Interactive targets are at least 48 × 48 even when the visual is smaller.
- [ ] `prefers-reduced-motion` stops continuous animation, and JS-driven
      animation checks it.
- [ ] The card renders well at ≈236px and ≈484px column widths (HANDOVER §8).
- [ ] Unknown and zero values are drawn differently (Trap 18).
- [ ] Sizes are the smallest that do the job. One emphasized element per card.

**Don't**

- Add a new card where an option on an existing one would do (HANDOVER §1).
- Use explanatory small text, helper sentences or captions in production
      UI. Labels and state words only.
- Use `999px` on a shape with mixed corner sizes.
- Use literal `cubic-bezier(...)` or `ms` values for state changes, or pair
      a spring easing with your own duration.
- Use `transform: scale()` to change a component's layout size.
- Use a segmented button, bottom app bar or speed dial (§8.13).
- Use a shape from the 35-shape library as a control's container.
- Put a spinner on something that has a known end (HANDOVER §4.4).
- Add more than one wavy, morphing or looping animation visible per card.
- Put a backtick anywhere inside a `css` template (Trap 11).

---

## 11. Materia mapping

Status key: **✓** implements the M3E component · **≈** partial or adjacent ·
**—** missing.

| M3E component | Materia | Status | Notes |
|---|---|---|---|
| Button (XS–XL, round/square, toggle morph) | `materia-button` | ✓ | Sizes and radii match §8.1. Outlined width is fixed at 1px (spec: L 2, XL 3). |
| Icon button | `materia-button` (icon-only) | ✓ | Square footprint follows the height. |
| Standard button group | `materia-button-group` `group: standard` | ≈ | No 15 % width morph. Gap defaults to 8 (spec S: 12). |
| Connected button group | `materia-button-group` (default) | ≈ | 2px seams ✓, selected → pill ✓. No pressed inner-corner morph in single-select. S pressed corner is 8 (spec 4). |
| Segmented button (deprecated) | `materia-icon-row` → forwards to button group | ✓ | Legacy alias, as intended. |
| Split button | `materia-split-button` | ≈ | 2px gap ✓, chevron rotation ✓. Inner corners use the button's square radii (12/12/16/28/28; spec 4/4/4/8/12). Trailing icon 20–40 (spec 22–50). |
| FAB / FAB menu | — | — | Rarely right on a dashboard (§8.4). |
| Floating / docked toolbar | — | — | Compose from a standard button group if needed. |
| Loading indicator (plain / contained) | — | — | `shapes.js` already has SoftBurst and the cookies. |
| Linear progress, wavy | `materia-media-progress` | ≈ | Amplitude 2 / wavelength 32 (spec 3 / 40). Check the 10 %–95 % amplitude ramp. |
| Circular progress, wavy | `materia-climate-panel` dial | ≈ | Bespoke dial, not the component. |
| Determinate ring | glance-tile and select-hero rings, doorbell countdown | ≈ | glance-tile and select-hero use `pathLength="100"` (Trap 19). Check the doorbell ring before reusing it. |
| Slider XS / S / M | `materia-slider` (primitive), `materia-level` | ✓ | Tokens cited in source. |
| Slider L / XL | — | — | Handle height must grow to 68 / 108. |
| Slider inset icon | — | — | M/L/XL only. |
| Slider stops / value indicator | `materia-slider` `ticks`, `show-label` | ✓ | — |
| Centred slider | — | — | Needed for signed offsets. |
| Range slider | — | — | — |
| Vertical slider | — | — | — |
| Bar-style level picker | `materia-bar-select` | ≈ | Not an M3 component. A deliberate Materia pattern. |
| Switch | `materia-switch` | ✓ | — |
| Checkbox | `materia-checkbox` | ✓ | — |
| Filter chips | `materia-chips` | ✓ | — |
| Menu | `materia-menu`, split-button menu | ✓ | Verify against M3E vertical menu styling [U]. |
| Carousel | `materia-cards` / `materia-carousel` | ≈ | Equal-tile rail. No multi-browse masks. |
| List (segmented / expanded) | `materia-list` | ≈ | Tonal surface option. No segmented items. |
| Navigation rail / tabs | `materia-tabs` | ≈ | Vertical rail with a growing indicator. |
| Navigation bar | — | — | HA owns page navigation. |
| Top app bar (flexible) | `materia-heading`, hero cards | ≈ | Visual role only. |
| Expressive shapes library | `src/utils/shapes.js` | ≈ | Subset of the 35, drawn as SVG. No `Morph` port. |
| Date / time pickers | `materia-calendar` primitive, `materia-time-input` | ≈ | Time input uses the native platform picker. |
| Badge | `materia-badge` | ≈ | HA header badge, not the M3 notification badge. |
| Motion schemes | `src/utils/motion.js` | ≈ | Token names ✓. Values diverge (§12). |

---

## 12. Known divergences in Materia today

These are recorded so that the next agent fixes them deliberately rather than
copying them. None was changed as part of writing this guide.

**HANDOVER §4 versus the spec**

1. **§4.2 Type scale** says 22px is not on the scale. title-large *is* 22/28.
   The guidance still holds for body text. M3E emphasized styles are not
   mentioned there (see §4.2 here).
2. **§4.3 Shape** lists the baseline corners only. M3E adds large-increased
   20, extra-large-increased 32 and extra-extra-large 48. "30px means
   extra-large" is defensible, but 32 is now an equally near token. Choose by
   the component's spec, not by proximity.
3. **§4.1 State layer** says "5–12 %". The tokens are 8 % hover, 10 % focus
   and press (12 % in older material-web), and 16 % dragged. There is no 5 %
   step.
4. **§4.4 Motion** names `MotionScheme.expressive()` but not its values. The
   values are in §6.2 here.

**Code versus the spec**

5. **`motion.js` spatial springs.** The shipped expressive spatial curves peak
   at about 1.148, 1.12 and 1.08 (fast, default, slow). The tokens (800/0.6,
   380/0.8, 200/0.8) peak at about 1.095, 1.015 and 1.015. Default and slow
   are therefore visibly bouncier than spec. The standard spatial curves settle
   in 250, 392 and 575 ms, against roughly 155, 220 and 335 ms for 1400, 700
   and 300 at damping 0.9. The effects curves match. Fix: regenerate the table
   from §6.2 in one change, then re-check the humidifier, button group and lock
   by eye. `springAt()` defaults (560 / 0.56) are not a token either.
6. **Undefined motion tokens.** `src/cards/humidifier/styles.js` uses
   `--md-sys-motion-default-spatial` and `--md-sys-motion-fast-spatial`, which
   `motion.js` does not define. An undefined `var()` invalidates the whole
   `transition` declaration, so those buttons currently have **no**
   transitions, including the colour fade.
7. **Hand-written curves** in lock, alarm, bar-select, select-hero, doorbell
   and the button element's WAAPI call. HANDOVER says not to hand-write
   `cubic-bezier`. Doorbell also pairs a spring easing with a `0.3s` duration
   (§6.3).
8. **Connected button group.** The `SIZES.pressedCorner` for S is 8, but the
   spec pressed inner corner is 4 (extra-small) [T]. Pressed corners are only
   applied in multi-select mode, so single-select connected groups have no
   press morph. The selection feedback is a `scale(0.96)` squash, which is not
   in the spec. The spec uses a corner morph.
9. **Standard button group.** It has no 15 % width morph on press and
   defaults to an 8px gap (spec S: 12).
10. **Split button.** Its inner corners reuse button square radii instead of
    the split-button tokens (§8.3).
11. **Slider.** XS, S and M are correct. L and XL, the inset icon, centred,
    range and vertical configurations are missing. End stops are centred in the
    cap rather than placed at the 6 dp trailing space. These agree at XS and
    differ at S and M **[U]**.
12. **Focus rings.** Several elements use `primary`, and the button group uses
    a −3px inset ring. The spec ring is `secondary`, 3px, offset 2px outward.
    The inset ring is a reasonable choice for 2px-seamed groups, where an
    outward ring would overlap the neighbour. Keep it there and document it.
13. **Radii off the scale.** The `materia-level` tile and the data-state
    placeholder use 24px. The `materia-level` control's "on" shape uses 18px.
    Neither is a token (nearest: 20 or 28, and 16).
14. **Wavy media progress.** Amplitude 2 and wavelength 32 against the spec's
    3 and 40. The code comment says "kept low per M3 spec", but the tokens say
    3.

---

## 13. Sources

**Primary (Google)**

- m3.material.io: component specs and guidelines for buttons, button groups,
  split button, FAB menu, toolbars, loading indicator, progress indicators,
  sliders, carousel, lists, navigation, app bars, colour, typography, shape and
  motion. Also the blog posts **"Building with M3 Expressive"** and **"M3
  Expressive motion & theming"**.
- design.google: *Material 3 Expressive* (Design Notes podcast with Liam
  Spradlin) and *Expressive Material Design: Google Research*.
- androidx, `compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/`:
  `ExpressiveMotionTokens`, `StandardMotionTokens`, `MotionTokens`,
  `SliderTokens`, `ShapeTokens`, `TypeScaleTokens`, `ButtonXSmall…XLargeTokens`,
  `ButtonGroupSmallTokens`, `ConnectedButtonGroupSmallTokens`,
  `SplitButton*Tokens`, `LoadingIndicatorTokens`, `LinearProgressIndicatorTokens`,
  `CircularProgressIndicatorTokens`, `FabMenuBaselineTokens`,
  `FloatingToolbarTokens`, `DockedToolbarTokens` and `StateTokens`. Also
  `ButtonGroup.kt`, `LoadingIndicator.kt`, `WavyProgressIndicator.kt` and
  `MaterialShapes.kt`. Read in November 2026 from `androidx-main`.
- material-components-android: `docs/components/{Slider,ButtonGroup,SplitButton,FloatingToolbar,DockedToolbar,LoadingIndicator,ProgressIndicator,FloatingActionButtonMenu}.md`
  and `lib/.../slider/res/values/tokens.xml` (slider size tokens).
- `@material/web` 2.4.1 tokens: focus ring and state-layer opacities.

**Secondary**

- *Material 3 Expressive Guide for AI*, Ivorisnoob
  (github.com/Ivorisnoob/Material-3-Expressive-Guide-For-you-AI). A
  Compose-oriented compilation that cites the Google sources above. It was used
  for structure and orientation. Its text is not reproduced here, and every
  number in this guide was either checked against the token files or marked
  **[G]** or **[U]**.
