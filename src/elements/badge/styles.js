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
        border-radius var(--md-sys-motion-expressive-slow-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
      /* The slow expressive spring makes the corner morph a MIGRATION —
         the radii travel, overshoot, and settle back, rather than swap. */
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

    /* Going active mirrors the asymmetry — the corner morph IS the state
       change, riding the same expressive spring as the rest of the shape.
       .fired is the same morph as a receipt: entity-less verbs (scenes)
       have no lasting state, so firing flashes the flip for a moment. */
    .badge.action.active,
    .badge.action.fired {
      border-radius: 16px 42px 16px 42px;
    }

    .badge.action.leaf-flip {
      border-radius: 16px 42px 16px 42px;
    }

    .badge.action.leaf-flip.active,
    .badge.action.leaf-flip.fired {
      border-radius: 42px 16px 42px 16px;
    }

    /* The value's column animates 0fr -> 1fr, so the badge visibly GROWS to
       admit the state info — real animated width, whatever the text length. */
    .badge.action .value-wrap {
      display: grid;
      grid-template-columns: 0fr;
      transition: grid-template-columns var(--md-sys-motion-expressive-default-spatial);
    }

    .badge.action.open .value-wrap {
      grid-template-columns: 1fr;
    }

    .badge.action .value-wrap .value {
      overflow: hidden;
      min-width: 0;
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
