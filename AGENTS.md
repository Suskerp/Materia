# Agent instructions: Materia

Materia is a Material 3 Expressive card library for Home Assistant, in daily
use on a family dashboard. Read [docs/HANDOVER.md](docs/HANDOVER.md) before any
change. It is the operating manual, and its traps fail silently.

## Stack

- Lit 3 web components, bundled by Rollup into one file, `dist/materia.js`.
- Distributed through HACS from `Suskerp/Materia`. The committed bundle is what
  users receive, so source that is not built and committed does not exist.
- Layout: `src/cards/<name>/` (index, styles, editor), `src/elements/`,
  `src/primitives/` (slider, drag-confirm, calendar), and `src/utils/`
  (motion, shapes, palette, i18n …).

## Before you commit

- Run `npm run check`. It runs a syntax check of every source file, the version
  agreement check, `node --test`, the build and the bundle-size budget. For
  docs-only changes, nothing needs to run.
- Releasing (version bump, build, tag, HACS fetch, served-file check) follows
  [HANDOVER §3](docs/HANDOVER.md#3-the-release-loop) step by step.
- Stage explicit paths. Never use `git add -A`.

## UI work

- **Read [docs/M3_EXPRESSIVE.md](docs/M3_EXPRESSIVE.md) before any UI change.**
  It covers colour roles, the type, shape and motion tokens, component specs
  and the review checklist. Look a value up there or in the spec. Never
  improvise one.
- **Composable cards.** Build small parts that share tokens: one button, one
  button group, one slider, reused everywhere. Add an option to an existing
  card before you add a card. A new card must use the same tokens as its
  neighbours, never its own.
- **No explanatory small text in production UI.** Ship labels, values and state
  words. Helper sentences, captions and hints do not belong in a card. Prose
  belongs in the user's dashboard YAML.
- **Calm, not bombastic.** Choose the smallest size that does the job. Use one
  emphasized element per card, and expressive motion only where the user's
  finger is. Large and XL sizes are for a single deliberate action.
- Use `--md-sys-motion-*` tokens (from `src/utils/motion.js`) for every
  transition, and respect `prefers-reduced-motion`.
- Never put a backtick inside a `css` template, including in comments
  (HANDOVER Trap 11).
