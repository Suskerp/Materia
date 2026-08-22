# Materia — developer handover

Materia is a **Material 3 Expressive card library for Home Assistant**, running in
production on a family home. This document is the operating manual: what it is, how to
ship it, what Material 3 actually requires, and the traps that cost hours because they
fail silently.

| | |
|---|---|
| Stack | Lit 3 + Rollup → one bundle, `dist/materia.js` |
| Distribution | HACS, from the GitHub repo `Suskerp/Materia` |
| Size | 31 cards · 10 elements · 3 primitives · 14 utils · 92 registered elements |
| Strings | 249 i18n keys (EN + Flemish `nl`) |
| Written at | v0.64.0 |

**Contents**

1. [What Materia is](#1-what-materia-is)
2. [Repo anatomy](#2-repo-anatomy)
3. [The release loop](#3-the-release-loop)
4. [Material 3 and Expressive](#4-material-3-and-expressive)
5. [Card contracts](#5-card-contracts)
6. [Templates, i18n and copy](#6-templates-i18n-and-copy)
7. [The traps](#7-the-traps)
8. [Verification](#8-verification)
9. [The Home Assistant surface](#9-the-home-assistant-surface)
10. [This install](#10-this-install)
11. [Working from design concepts](#11-working-from-design-concepts)
12. [Open threads](#12-open-threads)

---

## 1. What Materia is

A single-bundle collection of custom Lovelace cards, built with Lit 3 and bundled by
Rollup into `dist/materia.js`, distributed through HACS.

Its purpose is a coherent Material Design 3 Expressive dashboard. Before it, the
dashboard was an accretion of third-party cards — `button-card`, `bubble-card`,
`template-entity-row` — each with its own visual language, glued together with
`card-mod` CSS. Materia replaces that with cards sharing one token system, one type
scale, one shape language and one motion vocabulary.

### The governing principles

These are not style preferences. Each was learned by getting it wrong first, and each
shapes what a correct contribution looks like.

- **Generic primitives, not bespoke cards.** One composable card that takes config,
  never a card per use case. `materia-switch` serves every toggle; `materia-glance-tile`
  serves every read-only sensor through a `variant`. When you want to add a card, first
  ask which existing card is one option short.
- **Reuse over new.** An option on an existing card beats a new card; a new card beats a
  fork. `materia-icon-row` exists only to forward to `materia-button-group` so old
  configs keep working — that is the standard for deprecation.
- **Spec first.** Consult the M3 spec or the androidx tokens before any design decision.
  Never improvise a value. If a number has no token behind it, say so and give the
  geometric reason.
- **Designs are concepts.** A design document supplies the *grammar*; the skin comes from
  Materia's tokens. Its hexes, weights and pixel sizes are illustrative.
- **Prose belongs to the install.** The library ships state words and short labels.
  Sentences live in dashboard YAML, in the family's own language.
- **Behaviour is a property, not a component.** A hold-to-confirm gesture was built as its
  own card and read as a slab because it *was* one. It became `confirm: hold` on
  `materia-button` and the problem evaporated.

---

## 2. Repo anatomy

```
src/
  materia.js          entry point: imports every card, injects fonts, logs VERSION
  cards/<name>/       index.js (the element) · styles.js (css``) · editor.js (GUI editor)
  elements/<name>/    smaller building blocks: button, badge, pill, media, clock, menu…
  primitives/         slider.js · drag-confirm.js · calendar.js  (not cards; used by cards)
  utils/              14 shared modules — see below
  styles/             shared.js (font injection) · card-styles.js (shared fragments)
dist/materia.js       the built bundle. THIS is what HACS ships.
docs/                 this document
```

### The utils worth knowing before you write anything

| Module | Owns | Why it matters |
|---|---|---|
| `i18n.js` | The `STRINGS` table and `t(key, hass, vars)` | A missing key renders as the key name. See §6. |
| `action-handler.js` | `ActionMixin`, tap/hold dispatch, `HOLD_MS` | Interactive cards mix this in rather than wiring pointer events. |
| `commit-gesture.js` | The hardened pointer state machine for commit gestures | Shared by `drag-confirm` and `materia-button`. One implementation only. |
| `active-state.js` | `isActiveState()` + `DOMAIN_ACTIVE_STATE` | Answers "is this entity doing something" for the whole library. |
| `history.js` | Recorder fetch, `resample`, `segments`, `bucketDays`, `withLiveSample` | All sparkline/bucket data. Returns empty rather than throwing. |
| `optimism-bus.js`, `optimistic.js` | Optimistic state pins | A card may claim a state before the panel confirms. Transitional states must never overwrite a pin. |
| `palette.js` | Colour role resolution, `cust()` | Where custom (non-spec) roles are read, always with a fallback. |
| `shapes.js` | `roundedPolygonPath()` | M3 Expressive shape geometry, drawn rather than imported as icons. |
| `motion.js` | Motion tokens | Durations and easings; do not hand-write `cubic-bezier`. |
| `editor-helpers.js`, `smart-editor.js` | `ha-form` schema helpers | How editors are assembled, and where defaults get seeded. See trap 12. |
| `conditions.js` | Visibility condition evaluation | Used by `disabled_when` and friends. |

> **The bundle is the product.** HACS serves `dist/materia.js` from the repo. Source
> changes that are not built and committed do not exist to the user. Conversely, anything
> sitting in your working tree *will* be built into the bundle whether you meant it or
> not — see trap 14.

---

## 3. The release loop

There is no CI. Releasing is a sequence you perform, and every step has failed at least
once.

```bash
# 1. bump BOTH. The console banner reads src/materia.js; HACS reads package.json.
sed -i '' 's/const VERSION = "0.63.1"/const VERSION = "0.64.0"/' src/materia.js
sed -i '' 's/"version": "0.63.1"/"version": "0.64.0"/'          package.json

# 2. verify BEFORE building — a syntax error here is cheap, in the bundle it is not
node --check src/cards/<touched>/index.js
python3 scratchpad/csscheck.py src/cards/<touched>/styles.js

# 3. build. Never pipe it; read the exit code.
npm run build ; echo "BUILD EXIT: $?"

# 4. grep the bundle for the thing you just added. If it is not there, stop.
grep -c "my_new_config_key" dist/materia.js

# 5. commit with EXPLICIT PATHS. Never `git add -A` while an agent holds files.
git add src/cards/<touched>/*.js src/utils/i18n.js src/materia.js package.json dist/materia.js
git status --porcelain          # confirm nothing unexpected is staged
git commit -F - <<'MSG' … MSG
git tag -f v0.64.0 -m "v0.64.0"
git push origin main && git push -f origin v0.64.0

# 6. make HACS fetch it. update_information FIRST, then download.
ha_manage_hacs(action="update_information", repository_id="Suskerp/Materia")
ha_manage_hacs(action="download",           repository_id="Suskerp/Materia")

# 7. verify what is actually SERVED, with gzip disabled
curl -s -H 'Accept-Encoding: identity' http://<ha>/hacsfiles/Materia/materia.js | grep -o '0\.64\.0'
```

Two files carry the version and they must agree. A tag was once pushed with the version
un-bumped because an `&&` chain aborted at a failed syntax check before the `sed` ran.
Check step 1 landed before you tag.

### Trap 01 — HACS serves a build behind, and insists it is current

- **Symptom** — your change is on GitHub, HACS reports success, the served file is the
  previous build.
- **Cause** — HACS tracks this repo **by commit SHA**. It had recorded
  `installed == latest` at your commit but written an older artifact, a CDN race between
  the push and the fetch. Deleting the file and re-downloading just re-copies from its
  own cache.
- **Tell** — `update.materia_update` shows `installed_version == latest_version` while
  the served file lags.
- **Fix** — call `update_information` *before* `download`. If it still lags, ship a patch
  version: a new commit gives HACS a new latest to chase. HA also writes a
  `materia.js.gz` and serves it preferentially, so verify with
  `Accept-Encoding: identity`.

---

## 4. Material 3 and Expressive

Material Design 3 is Google's design system; **M3 Expressive** is its 2025 evolution,
adding shape morphing, springier motion and a stronger emphasis on tonal containers.
Materia targets Expressive. You need not memorise it, but you must know where the answers
live and which four token families govern almost every decision.

### 1 · Colour roles — the one to internalise

M3 does not have colours, it has **roles**. A role is a job; the theme supplies the value.
The critical distinction, which causes more bugs here than anything else:

| Kind | Roles | Use for |
|---|---|---|
| Accent | `primary`, `secondary`, `tertiary`, `error` | Ink, strokes, fills with **no text on them** — a progress bar, a slider track, a chart bar. |
| Container pair | `*-container` + `on-*-container` | Any **filled surface with text on it**. The pair carries a contrast guarantee. |
| Surface ladder | `surface-container-{lowest…highest}` | Elevation *inside* a card. Not for "is this a card against the view". |
| State layer | `currentColor` at 5–12% alpha | Hover/press washes over an existing surface. |

#### Trap 02 — an accent role at partial alpha used as a filled surface

- **Symptom** — a chip renders as a flat grey blob with barely-legible text on a
  harmonised theme.
- **Cause** — `background: color-mix(in srgb, var(--md-sys-color-tertiary) 14%, transparent)`
  with `color: var(--md-sys-color-tertiary)`. A hand-mixed alpha carries **no contrast
  guarantee**; the surface beneath decides legibility. This is a state-layer pattern, not
  a container pattern.
- **Fix** — use the pair: `background: var(--md-sys-color-tertiary-container)`,
  `color: var(--md-sys-color-on-tertiary-container)`.
- **The precise rule** — the violation is *the background and the text drawn on it coming
  from the same accent role*. An accent wash under the surface's own `on-surface` text is
  fine — the surface governs contrast. A track with no text on it is fine too.

#### Trap 03 — using an M3 surface rung as a card background

- **Symptom** — a card is invisible against the dashboard behind it.
- **Cause** — the container ladder is an elevation system for surfaces *inside* a card.
  Which rung reads as "a card against this view" is a decision only the theme can make.
- **Fix** — `var(--ha-card-background, var(--md-sys-color-surface-container-low, var(--card-background-color)))`.
  HA publishes the theme's own answer, and a theme must keep it distinct from the view or
  every stock card would vanish too.

**Deprecated roles**, still in old code and to be replaced on sight: `background`,
`on-background`, `surface-variant`. Keeping `surface-variant` as a *middle* fallback in a
`var()` chain is acceptable for older themes.

#### Custom (non-spec) roles

Materia defines its own for things M3 has no word for:
`--md-sys-cust-color-{light,device,warning,error}` and their containers, the climate
family, and a harmonised scale `--md-sys-cust-color-scale-{green,yellow,orange,red,purple,maroon}`.

#### Trap 04 — a custom role without a hex fallback paints nothing

- **Symptom** — an area chart fills solid black; a bar disappears.
- **Cause** — no theme file on this install defines the `scale-*` roles; they come from a
  JS harmonisation module that may not emit them. `var(--undefined)` resolves to nothing
  and the declaration is invalid.
- **Fix** — always write them the way the library's own code does:
  `var(--md-sys-cust-color-scale-green, #5E9E50)`. This applies in dashboard YAML too.
- **Rule** — a Materia custom role must never pre-empt a spec role. A slider handle is
  `primary` per `SliderTokens`; defaulting it to the device tint rendered every slider
  teal beside a correctly-lavender switch.

### 2 · Type scale

Five roles × three sizes: `display`, `headline`, `title`, `body`, `label`, each
`-large/-medium/-small`. Every text element should sit on a step. Common numbers:
`title-small` 14sp/500/20sp · `title-medium` 16sp/500/24sp · `label-medium`
12sp/500/16sp/+0.5px · `body-medium` 14sp/20sp.

18px and 22px are **not** on the scale. When a design document specifies them, keep the
scale and say why. Use `font-variant-numeric: tabular-nums` wherever digits change in
place.

### 3 · Shape

Corner tokens: `extra-small` 4dp · `small` 8 · `medium` 12 · `large` 16 ·
`extra-large` 28 · `full` 999. **30px is not a token** — a concept drawing 30px means
`extra-large`. Stadium shapes are a rule, not a token:
`border-radius: calc(height / 2)`.

From the Backgrounds spec (§5.5, *overlapping curves*): when any side is over-subscribed
by its corner radii, **all four** corners scale by a single factor `f = min` over sides.
Corners do not shrink independently.

### 4 · Motion

Duration tokens top out at `extra-long-4` = **1000 ms**. A 2-second animation is off the
scale entirely. Easing comes in `emphasized` / `standard` families with accelerate and
decelerate variants; Expressive adds spring specs (`MotionScheme.expressive()`).

> **Determinate versus indeterminate — the spec has a test.** From
> material-components-android: *"Use progress indicators, if the processes can transition
> from indeterminate to determinate,"* and the Expressive loading indicator is *"designed
> to show progress that loads in under five seconds."*
>
> So a 90-second alarm exit delay that resolves to a known state is a **determinate
> progress** case — not a pulse, and not a shape-morph loading indicator. Getting this
> right replaced a "make the breathing stronger" request with a sweep anchored to the
> entity's `last_changed`, which resumes rather than restarting when a dashboard is
> opened mid-delay.

### Where to look things up

- **m3.material.io** — component guidance and the spec proper.
- **androidx `*Tokens.kt`** — the authoritative numbers. `SliderTokens`: handle and active
  track are `Primary`, 16dp track, 4×44dp handle, pressed handle 2dp, stop indicator 4dp.
  `ProgressIndicatorTokens`: track `SecondaryContainer`, active `Primary`.
- **material-components-android `docs/components/`** — the usage prose that settles
  "which component is this".

---

## 5. Card contracts

A Materia card is a Lit element registered with `customElements.define` and announced to
HA via `window.customCards`.

```js
class MateriaThing extends ActionMixin(LitElement) {
  static properties = { hass:{attribute:false}, config:{state:true},
                        _resolvedLabel:{state:true} };   // one per templated field
  static styles = [unavailableStyles, styles];

  static getConfigElement() { return document.createElement("materia-thing-editor"); }
  static getStubConfig(hass) { /* what the picker drops in — be careful, see trap 12 */ }

  setConfig(config) { if (!config.entity) throw new Error("…"); this.config = {...defaults, ...config}; }
  getGridOptions() { return { columns:4, rows:"auto", min_columns:3 }; }
  getCardSize()    { return 3; }
  render() { … }
}
```

### Templated fields

Any author-facing string that might be computed goes through the literal-or-Jinja path.
This is a **two-sided** contract and both sides get forgotten:

```js
// 1. a reactive prop per field
static properties = { _resolvedLabel: { state:true } };

// 2. subscribe in updated() / a _templatesReady hook
this._resolveField("label", "_resolvedLabel");

// 3. read through the resolver at render time
const label = this._isTemplate(this.config.label) ? this._resolvedLabel : this.config.label;

// 4. AND the editor must offer the toggle
{ name:"label", label:"Label", template:true, selector:{ text:{} } }
```

#### Trap 05 — a text field not in `_resolveField` prints literal Jinja

- **Symptom** — the dashboard shows `{{ states('input_select.x') }}` as text.
- **Cause** — the field is interpolated straight from config. Found **three times**:
  `materia-expander`'s `name`, and `materia-list`'s `title`, `icon` and two row keys.
- **Fix** — add it to the resolver set *and* give the editor `template: true`. A card that
  resolves a template while its editor offers no way to enter one is the same bug from
  the other side.
- **Audit** — a survey of all 28 cards found six more candidates: `heading.icon`,
  `bar-select.label`, `select-hero.name`, `weather-metric.icon/name`,
  `forecast-hourly.name`, `schedule.name`. The check only sees top-level keys; per-item
  keys in list-shaped configs need a second pass. An unresolved key is only a *bug* if the
  editor or docs imply it is templatable.

#### Trap 06 — `disabled` is a reserved key on every Lovelace card

- **Symptom** — a card vanishes in view mode but appears in the editor.
- **Cause** — a truthy `disabled` in any card config makes `hui-card` hide it.
- **Fix** — Materia uses `disabled_when`. Never introduce a config key called `disabled`.

#### Trap 07 — HA's `visibility:` never runs on children a custom card instantiates

- **Symptom** — three volume sliders show at once inside an expander, though each has a
  `visibility` block.
- **Cause** — `visibility` is applied by the view/section machinery. A card that builds
  its own children (`materia-expander`, `materia-tabs`) bypasses it entirely, silently.
- **Fix** — wrap each child in a native `type: conditional` card, which evaluates its own
  conditions. The generic fix is still open.

---

## 6. Templates, i18n and copy

Materia ships English and Flemish Dutch from one table in `src/utils/i18n.js`, read as
`t(key, hass, vars)` using `hass.locale.language`.

> **The boundary, in the owner's words:** *"i18n is only for states and such. Text content
> Home Assistant is not that great in."*
>
> So: **state words and short labels** a card must produce when nothing is configured —
> "Actief", "Bezig…", "Geen meting", aria strings. **Not** prose: captions, warnings,
> explanations, anything a sentence long. Prose lives in dashboard YAML through a
> templatable config field, so the install writes its own language.
>
> The test before adding a key: *would this string differ between two installs?* If yes,
> it is config, not i18n.

Corollaries: a card must never be the only place a sentence exists; and a card's default
caption should be language-free where possible. `materia-glance-tile`'s `_caption()`
defaults to the bare top of the scale ("425 km") — a number and a unit, not a sentence in
anybody's language. Editor field labels stay English by convention, as does
`window.customCards` metadata.

#### Trap 08 — a missing key renders as its own name, and greps miss the computed ones

- **Symptom** — the UI shows `al_mode_home`, or a screen reader says "expander_collapse".
- **Cause** — `t()` returns the key when absent. And `grep 't("key"'` only finds *literal*
  first arguments. It misses ternaries — `t(open ? "a" : "b")` — and template literals —
  ``t(`al_mode_${mode.key}`)``, which expands to one key per row of the table feeding it.
  On one card that gap was 41 found versus 55 real.
- **Fix** — extract identifiers by pattern anywhere in the source
  (`grep -ohE 'al_[a-z0-9_]*'`), expand template-literal prefixes against their table,
  and assert every needed key exists. Keep this in the release checklist:

```bash
grep -rnE 't\([^)]*(\?|`|\+)' src --include=*.js | grep -v i18n.js
```

#### Trap 09 — a duplicate key silently keeps the LAST definition

- **Symptom** — a tile renders "min" with the number dropped.
- **Cause** — two `unit_min` entries in the object literal; the winner had no `{n}`
  placeholder. JS object literals do not warn.
- **Fix** — every release:

```bash
grep -oE '^  [a-z][a-zA-Z0-9_]*:' src/utils/i18n.js | tr -d ' :' | sort | uniq -d
```

#### Trap 10 — English states on a Dutch system

- **Symptom** — a vacuum shows "Cleaning"; a sensor shows "Connected".
- **Cause** — `hass.formatEntityState()` uses the user's **profile** language, not the
  system language. This install's system is `nl` while the profile is English, so HA hands
  back English and no card config can override it.
- **Fix** — for domains with a known state vocabulary, translate in Materia and fall back
  to `formatEntityState` for anything unknown — exactly what state-word i18n is for.
  Otherwise it is a profile setting, and worth saying so rather than hacking a state map.

---

## 7. The traps

The ones above are grouped with their subject. These are the rest — failures that produce
no error and cost the most time.

### Trap 11 — a backtick inside a `` css`` `` template silently guts the stylesheet

- **Symptom** — a card renders completely unstyled. Rollup exits **0**. `node --check`
  passes.
- **Cause** — an *odd* number of stray backticks is a loud syntax error. An **even**
  number parses fine: the parser closes the template early and treats the rest as
  expressions, so the CSS after the first stray backtick is discarded.
- **Fix** — never write a backtick inside a `css` body, including in comments. Quoted
  identifiers, `` `margin: 0 auto` `` and `` `white-space: nowrap` `` have each caused
  this. Run `csscheck.py`, which extracts each `css` body and counts strays *inside* it.
  Has happened three times.

### Trap 12 — seeding an editor default that means "derive it"

- **Symptom** — opening and saving the editor freezes an automatic scale, or silently
  reverts a fix.
- **Cause** — two opposite rules that look like one. **Seed a fixed default** at the
  card's own fallback value: an editor seeding `pending_timeout_ms: 10000` against a card
  default of 20000 would have re-broken a 90-second exit delay on first save. **Never
  seed a derived one** — `max`, `precision`, `min` mean "work it out", and seeding freezes
  today's value.
- **Test** — what does *absence* mean? "The default value" gets seeded. "Work it out" must
  not. Assert that a seed equals the card's own fallback.

### Trap 13 — an imperatively-set style survives a skipped attribute write

- **Symptom** — a swept gesture fill sticks part-way across, permanently, after release.
- **Cause** — Lit only rewrites an attribute when the interpolated string *changes*. A
  value set outside Lit's knowledge via `style.setProperty` survives a skipped write,
  frozen at its last frame.
- **Fix** — clear it explicitly on the element:
  `this._holdEl?.style.removeProperty("--ma-p")`. Anywhere you set a custom property
  imperatively, you own removing it.

### Trap 14 — explicit git paths protect the commit, not the build

- **Symptom** — half-written code from someone else's in-progress work ships in the
  bundle, though the commit staged only your files.
- **Cause** — `npm run build` reads the **whole working tree**. Happened four times; once
  verified by rebuilding from the committed tree in a worktree and byte-comparing.
- **Fix** — when anyone else may hold files, build in an isolated worktree containing only
  your changes:

```bash
git worktree add --detach /tmp/wt HEAD
cp src/cards/mine/*.js /tmp/wt/src/cards/mine/
cd /tmp/wt && ln -s /path/to/node_modules . && npm run build
cp /tmp/wt/dist/materia.js ./dist/materia.js
git worktree remove --force /tmp/wt
```

A pre-flight "is the tree clean" check is *not* a substitute: a snapshot of a tree
someone else is writing tells you nothing a moment later.

### Trap 15 — an attribute sampled in one state is not a distribution

- **Symptom** — an attribute looks like a useless constant, so a feature is built without
  it, and the feature is broken.
- **Cause** — the alarm panel's `can_bypass` read `true` on all 40 zones, twice, and was
  declared a dead end. It is in fact *the* bypass indicator: it flips to `false` on a
  bypassed zone. Both samples were taken with nothing bypassed. The interesting value only
  exists in the state you did not sample.
- **Fix** — before declaring an attribute constant, ask what state would make it vary and
  sample *that*. Record ruled-out signals somewhere durable: code documents what it uses,
  never what was rejected, so the reasoning is otherwise lost and re-proposed.
- **Still suspect** — `priority` reads 5×38 / 4×2. That may be the boring half of a real
  signal.

### Trap 16 — a fixed dimension in a spec is often an invariant wearing a number's clothes

- **Symptom** — three bars share one scale but cannot be compared by eye.
- **Cause** — a concept specified `label { width: 74px; flex: none }`. Read as an arbitrary
  pixel value, it was replaced with a content-sized column, so every row's track started
  at a different x. A shared scale with unshared origins is not a comparison, it only
  looks like one.
- **Fix** — when a spec fixes a dimension where a flexible one seems natural, ask what it
  is holding constant. Then put a **standing assertion on the stylesheet itself**
  (`flex: none` present, `max-width` absent) — behavioural tests cannot see a layout
  invariant.
- **Related** — a value column must be fixed-width or the track's right edge moves as the
  number's width changes while you drag. Reserving it in `ch` failed too, by 2.3px: it
  guesses at digit advances, and the display face has proportional figures. The fix
  measures — render the widest possible string invisibly and lay the live value over it.

### Trap 17 — dead code that looks like it works

- **Symptom** — nothing. It runs, returns, and can never affect the output.
- **Cause** — a history helper fell back to `now` when a timestamp was missing. But the
  resampler reads bucket *midpoints*, so a sample stamped `now` lands past the last
  midpoint and changes nothing, while looking like it did something.
- **Fix** — this is a mechanism question, not a surface one; no boundary test would catch
  it. If a fallback cannot be shown to change an output, decline to act rather than
  acting uselessly.

### Trap 18 — zero and unknown are different facts

- **Symptom** — "no surplus" and "no measurement yet" render identically.
- **Cause** — an empty bar *asserts* the value is nought. A concept even drew a measured
  zero as a 2% stub, which makes a real zero look like a small non-zero.
- **Fix** — keep them strictly apart end to end: unknown gets a distinct track treatment
  and an em dash, never a zero-length fill; zero gets a genuinely invisible fill. Test all
  the spellings a template can emit — `null`, `"None"`, `unknown`, `unavailable`, `""`,
  `NaN`, `"-"` — against the ones that must survive as numbers: `0`, `"0"`, `-1.5`.
- **Draw unknown in `outline-variant`**, never the warning role. Absent news is not bad
  news, and spending amber there leaves nothing louder for a real problem.

### Trap 19 — a browser circle is not 2πr, and `transform` does not affect layout

- **Symptom** — every progress ring reads slightly high. A rotated shape overlaps the text
  beneath it despite an apparently adequate gap.
- **Cause** — an SVG `<circle>` renders as four cubic Béziers whose length is *not* 2πr:
  measured 118.611 against 119.381, so a naive dasharray errs by up to 0.65pp,
  engine-dependently. Separately, a 45° pose swings a rounded square's corners outside its
  box while the box stays put — for a 30% corner that is 0.083s per side.
- **Fix** — rings: set `pathLength="100"` and express the dash in percent, which is exact
  and engine-independent. Also do not render the arc below half a percent: a zero-length
  dash with `stroke-linecap: round` paints a dot at twelve o'clock. Rotations: compute the
  overhang, do not eyeball the gap.

---

## 8. Verification

There is no test runner wired into the build. Verification is deliberate, and these are
the habits that have actually caught bugs.

- **Parse every file** you touch: `node --check`. Cheap, and catches the loud half of the
  backtick trap.
- **Run `csscheck.py`** on any file with a `css` template. The only thing that catches the
  silent half.
- **Grep the built bundle** for what you added. Rollup renames module-local identifiers,
  so search for *string literals*, not function names, or you get a false negative.
- **Measure geometry, do not assume it.** A headless-Chrome harness loading the real
  `src/` modules through an import map and asserting from `getBoundingClientRect` found a
  2.46px clearance that "looked inside", the ring error above, and a track that moved
  while dragging.
- **Render at two column widths** (≈236px and ≈484px). Cards must not assume they own a
  row.
- **Assertions over a controllable clock**, never sleeps. Inject `now`. This is how
  flapping, hysteresis, polling intervals and sweep progress are tested without waiting.
- **Characterisation tests before a refactor.** The only reason a shared gesture machine
  could be extracted from a primitive on a live front-door lock was that a 31-assertion
  suite for it already existed and passed unchanged afterwards.
- **Standing assertions on stylesheets** where a layout invariant carries meaning — see
  trap 16.
- **Make fixtures at least as awkward as reality.** Twice a bug hid because the rig was
  cleaner than production: gauges tested only against one device's entities, and a fixture
  missing `last_changed` that every real state object carries.

---

## 9. The Home Assistant surface

Most work happens over the WebSocket API rather than by editing files. The file tools are
sandboxed to `www`, `themes`, `custom_templates`, `dashboards`, `blueprints`, `packages` —
notably **not** `includes/`, where this install keeps its template sensors.

| Task | Call | Notes |
|---|---|---|
| Read a dashboard | `lovelace/config` + `url_path` | Omit `url_path` for the default one. |
| Write a dashboard | `lovelace/config/save` | **Not** `lovelace/save_config`, which returns `unknown_command`. YAML-mode dashboards reject it outright. |
| List / delete dashboards | `lovelace/dashboards/list`, `…/delete` | Delete takes `dashboard_id`, not `url_path`. |
| Rename an entity | `config/entity_registry/update` | `new_entity_id`. Repoint every reference yourself — dashboards, schedules, scripts. |
| History | `history/history_during_period` | Works; the MCP history tool returned empty. Windows past recorder retention come back as **zero series**, not truncated. |
| Render a template | REST `/api/template` or an eval tool | The WS `render_template` is a *subscription* — the value arrives as a later event, not as the command result. |
| Create a helper | helper config flow | Some flows need a menu step: a template sensor requires `next_step_id: "sensor"`. |

### Jinja and automation quirks seen here

- `map('is_state','on')` does not evaluate on this HA; `select('is_state','on')` and
  `map('states')` do. A script using the former silently did nothing.
- A `delay` cannot be negative. To make an offset configurable in *both* directions around
  a sun event, trigger at a fixed early offset and delay `base + n`. Sun-trigger `offset`
  itself is not templatable.
- Automation tools take `identifier` (the numeric id from the entity's `id` attribute),
  not `automation_id`. A wrong parameter name can return an empty object that reads like
  "no data" rather than an error — check `success` before believing a result.

---

## 10. This install

Facts about the target system that are not derivable from the code, and that changed
decisions.

### Alarm — UltraSync, 47 zones

- Zone entities are `sensor.*`, so they carry **no `device_class`**. Classification
  derives from the per-zone `icon` instead: 12 `mdi:motion-sensor` (the PIRs), 12
  `mdi:fire` (smoke/heat), 12 contacts, 10 without an icon.
- The state vocabulary is only `Ready` / `Not Ready` / `unavailable`. It **never** says
  `Bypassed` — bypass is signalled by `can_bypass: false` (see trap 15).
- An **unavailable entity carries no attributes at all**, so a detector that drops offline
  loses the icon identifying it. Verdicts earned from a real attribute must be remembered.
- Measured exit delay: **90 seconds**. PIR zones flap Ready/Not-Ready every 2–5 seconds.

### Devices with awkward truths

- **Arcam receiver** — capability bitmask `200588` contains no PAUSE, PLAY, SEEK, NEXT or
  PREV, and no VOLUME_MUTE. Transport controls and a mute button are physically
  impossible; a progress bar has no position to read. Album art arrives via a template
  sensor's `icon` attribute, and TuneIn URLs need `logoq`→`logoo` and
  `fmt=jpeg`→`fmt=png`.
- **Volvo** — the car sleeps, so entities go `unavailable` for long stretches. A 48-hour
  battery window legitimately contains a 40-hour gap. Sparse history is the honest
  picture, not a bug.
- **Energy** — `sensor.net_power_usage` is `kWh` with `device_class: energy` despite the
  name, so it cannot share a watt scale. Solar and DSMR import/export are power-classed.
  House load and surplus did not exist and were created as template sensors:
  `huisverbruik = solar + import − export`, `overschot = export`.
- **Pool** — one Scheduler entity, `switch.schedule_*`, whose `timeslots` read as a flat
  `"15:00:00 - 20:30:00"` string but whose `scheduler.edit` service wants
  `[{start, stop, actions}]`. The two shapes differ; the `actions` array must survive a
  round trip or a pump schedule becomes a no-op.

### Third-party cards deliberately kept

Not everything should become Materia. The reference dashboards keep `mod-card`,
`navbar-card`, `simple-swipe-card`, `mini-graph-card`, `power-flow-card-plus`,
`advanced-camera-card` and `layout-card`. Counting those as "legacy" makes a finished
dashboard look unmigrated. `power-flow-card-plus` in particular computes house load from
solar, grid and per-device draw internally — a bar card cannot compute, so it is the
honest tool for a flow.

---

## 11. Working from design concepts

Features often start as a Claude Design document — an HTML page with several labelled
variants (19a, 20b, 22a) and a written argument for each. The workflow that works:

1. **Read the actual file, do not paraphrase it.** Pasting verbatim geometry to an
   implementer caught a layout bug that no amount of their own testing would have found
   (trap 16). Paraphrase loses exactly the load-bearing constants.
2. **Take the grammar, not the skin.** Its hexes become token roles; its 30px becomes
   `extra-large`; its 18px type becomes the nearest scale step. Say which numbers you kept
   and why.
3. **Layout is the dashboard's job.** A concept's "span 2, then 2-up" is
   `grid_options.columns` in HA sections. Never build a multi-tile container card to
   reproduce a concept's page.
4. **The concept's data is a smooth fiction.** Real history is irregular, gapped, and
   sometimes past retention. Decide explicitly what a gap draws — a break in the line, not
   an interpolation across an outage.
5. **Some of it will not survive contact.** A concept drew a measured zero as a visible
   stub; another put a reference label where it collided with a bound label at real card
   widths. Copying those faithfully would import the bug.

Harness markup — `sc-for`, `sc-if`, `hint-placeholder-count` — belongs to the design tool.
Ignore it.

---

## 12. Open threads

| Thread | State |
|---|---|
| Pool window scheduling | Shipped in v0.64.0 and on the dashboard, but the parse/write logic was asserted **in isolation** (14 assertions, including the real window round-tripping byte-for-byte and a midnight wrap). Not yet exercised against a live `scheduler.edit`. Verify the first real edit takes. |
| Pool thermostat behaviour | Heating turns *off* at target; nothing turns it back on when the water drops. A hysteresis band is the natural next step, and the offset helper is where to hang it. |
| Templated-field audit | Six candidates across five cards (trap 05). Mechanical, but each wants a look rather than a batch edit. |
| Cards that instantiate children | `materia-expander` and probably `materia-tabs` ignore HA's `visibility` (trap 07). Worked around with `conditional` wrappers. |
| Two type systems in glance-tile | Newer variants use M3 steps with a cqi clamp; the seven older ones share `.big`/`.sub`. Migrating changes shipped variants and wants its own release. |
| `materia-level` inline/flat | Built, then reverted when the page needing it was parked. The patch is preserved in the scratchpad. |
| Weather view | Cannot be built: there is no `weather` domain entity on the install. Needs KMI and weather.com configured first. The reference pattern is a hero plus hourly and daily forecasts plus nine metric tiles, drawing humidity and visibility from a *secondary* provider. |
| Third copy of active-state | `src/cards/card/index.js`'s `DOMAIN_CONFIG.activeState`, plus `room`, `hero` and `elements/button` answering the same question their own way. One shared util plus a known list of callers beats a half-finished migration. |

---

*Materia · Lit 3 + Rollup · distributed via HACS from `Suskerp/Materia`. Written at
v0.64.0.*
