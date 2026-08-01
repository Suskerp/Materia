import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const VARIANT_COLORS = {
  primary:               ["var(--md-sys-color-primary)",                "var(--md-sys-color-on-primary)"],
  secondary:             ["var(--md-sys-color-secondary)",              "var(--md-sys-color-on-secondary)"],
  tertiary:              ["var(--md-sys-color-tertiary)",               "var(--md-sys-color-on-tertiary)"],
  error:                 ["var(--md-sys-color-error)",                  "var(--md-sys-color-on-error)"],
  device:                ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
  "primary-container":   ["var(--md-sys-color-primary-container)",      "var(--md-sys-color-on-primary-container)"],
  "secondary-container": ["var(--md-sys-color-secondary-container)",    "var(--md-sys-color-on-secondary-container)"],
  "tertiary-container":  ["var(--md-sys-color-tertiary-container)",     "var(--md-sys-color-on-tertiary-container)"],
  "error-container":     ["var(--md-sys-color-error-container)",        "var(--md-sys-color-on-error-container)"],
  "device-container":    ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
  // State-driven: colored only when entity is active, default bg when inactive.
  "primary-state":       ["var(--md-sys-color-primary)",                "var(--md-sys-color-on-primary)"],
  "secondary-state":     ["var(--md-sys-color-secondary)",              "var(--md-sys-color-on-secondary)"],
  "tertiary-state":      ["var(--md-sys-color-tertiary)",               "var(--md-sys-color-on-tertiary)"],
  "error-state":         ["var(--md-sys-color-error)",                  "var(--md-sys-color-on-error)"],
  "device-state":        ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
};

/* Header badge anatomy per design 18c ("Same grammar, accessible floor"):
   nothing ever drops below a full 100x132 tile, so every target stays a
   generous size, lit or not. News changes COLOUR, PAYLOAD and WIDTH instead
   of existence: quiet keeps icon + name + a muted state word; open (news)
   reveals the big typed value top-right and swells to 190px; alarm goes
   squarer and widest. Widths ride the expressive spatial spring; colour and
   opacity ride the effects curve. The design doc's hex palette is
   illustrative — colours here stay on the M3 variant tokens. */
export const styles = [
  hostStyles,
  motionTokens,
  css`
    :host {
      display: inline-block;
    }

    /* The tile layout is a section card, not a header pill — it must take
       the cell the section grid gives it. */
    :host([tile]) {
      display: block;
      width: 100%;
    }

    .badge {
      box-sizing: border-box;
      position: relative;
      /* The doc's 100x132 floor, scaled to sit WITH the page's rows rather
         than over them — still a generous touch target, never a dot. */
      height: 84px;
      min-width: 116px;
      max-width: 116px;
      padding: 10px 16px;
      /* Blend with the page: the corner comes from the theme, like every
         other Materia surface. 28px is the 18c fallback. */
      border-radius: var(--ha-card-border-radius, 28px);
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      /* A hold must not start a text selection on desktop. */
      -webkit-user-select: none;
      user-select: none;
      transition:
        max-width var(--md-sys-motion-expressive-default-spatial),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .badge.open {
      max-width: 172px;
    }

    /* Alarm outgrows everything and squares off — the shape says danger
       before the colour does. */
    .badge.alarm {
      max-width: 196px;
      border-radius: 18px;
    }

    .row-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .icon-cell {
      display: flex;
      flex: none;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 22px;
      width: 22px;
      height: 22px;
    }

    /* The typed value — "3 on", "21°", a ticking 0:14. Always in the DOM so
       it can fade; the quiet tile is simply too narrow to show it.
       The design doc's 20px/700 is Outfit, which carries bold lightly —
       Figtree at that spec shouts, so the whole badge row runs a notch
       softer (600 weights, smaller value) at the same hierarchy. */
    .value {
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.01em;
      white-space: nowrap;
      opacity: 0;
      transition: opacity var(--md-sys-motion-default-effects) 100ms;
    }

    .badge.open .value {
      opacity: 1;
    }

    .text {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .name {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
    }

    .sub {
      font-size: 12px;
      opacity: 0.68;
      white-space: nowrap;
    }

    /* Hold progress — a fill sweeps across the badge over the arm window so
       the gesture visibly charges. Rendered only while arming; mounting the
       element starts the animation, unmounting resets it. Duration comes
       inline from HOLD_MS so the sweep completes exactly when the hold
       fires. currentColor at low alpha = the design's ink-tint fill. */
    .hold-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: currentColor;
      opacity: 0.14;
      pointer-events: none;
      animation: hold-fill linear forwards;
    }

    @keyframes hold-fill {
      from { width: 0; }
      to { width: 100%; }
    }

    /* Gesture tag — a quiet eyebrow in the bottom-right corner, clear of the
       value (top-right) and the name/sub column (bottom-left). */
    .tag {
      position: absolute;
      right: 14px;
      bottom: 10px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
      pointer-events: none;
    }

    /* Stage track — one equal bar per stage, lit while its condition holds. */
    .stages {
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: 7px;
      display: flex;
      gap: 3px;
      height: 4px;
    }

    .stage {
      flex: 1;
      border-radius: 4px;
      background: currentColor;
      opacity: 0.22;
      transition: opacity var(--md-sys-motion-default-effects);
    }

    .stage.lit {
      opacity: 0.6;
    }

    /* Lift the text and the tag off the track when one is shown. */
    .badge.has-stages {
      padding-bottom: 17px;
    }

    .badge.has-stages .tag {
      bottom: 17px;
    }

    /* ---- action layout: the button badge (design 20a) -----------------
       The silhouette is the role: navigation is a squircle, a verb wears
       M3's asymmetric shape-morph corners — nothing else may. Reads
       horizontally: icon | name + sub | value; the value is the live
       consequence (a ticking countdown, "Open") and fades with the open
       state exactly like the navigate badge's payload. leaf rises to the
       right, leaf-flip mirrors it — a facing pair. */
    .badge.action {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      min-width: 116px;
      max-width: none;
      padding: 0 22px 0 18px;
      border-radius: 42px 16px 42px 16px;
    }

    .badge.action.open {
      max-width: none;
    }

    .badge.action.leaf-flip {
      border-radius: 16px 42px 16px 42px;
    }

    .badge.action .icon-cell ha-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
    }

    .badge.action .text {
      line-height: 1.2;
    }

    /* Rising fill while a timer runs — the badge IS the countdown. The 1s
       linear transition matches the tick, so the climb reads continuous. */
    .run-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: currentColor;
      opacity: 0.12;
      pointer-events: none;
      transition: height 1s linear;
    }

    /* ---- tile layout: the badge grown into a section card ------------- */
    .badge.tile {
      width: 100%;
      height: auto;
      min-width: 0;
      max-width: none;
      aspect-ratio: 1;
      border-radius: 34px;
      padding: 20px;
    }

    .tile-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .badge.tile .icon-cell ha-icon {
      --mdc-icon-size: 34px;
      width: 34px;
      height: 34px;
    }

    .badge.tile .tag {
      position: static;
      font-size: 12px;
    }

    .tile-text {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .badge.tile .name {
      margin: 0;
      padding: 0;
      font-size: 32px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.05;
      white-space: normal;
    }

    .secondary {
      font-size: 14px;
      line-height: 1.35;
      opacity: 0.72;
      text-wrap: pretty;
    }

    .badge.tile .state {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      opacity: 0.85;
    }

    .badge.tile .stages {
      position: static;
      flex: none;
      gap: 4px;
      height: 8px;
      margin-top: 12px;
    }

    .badge.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }

    .badge.unavailable {
      opacity: 0.4;
      pointer-events: none;
      filter: grayscale(80%);
    }
  `,
];
