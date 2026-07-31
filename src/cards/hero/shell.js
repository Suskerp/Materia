import { html, svg, nothing, css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { boomPath, softBurstPath } from "../../utils/shapes.js";

/* Burst geometry is CONSTANT — the fillet solver costs real time (~25-45us a
 * call) and used to run twice per hero per render, every hass tick. Once, at
 * module load, forever. */
const BURST_CALM = softBurstPath(90, 90, 86);
const BURST_BOOM = boomPath(90, 90, 88);

/**
 * THE HERO SHELL — one anatomy, three cards.
 *
 * materia-hero, materia-vacuum-hero and materia-select-hero are not three
 * designs that happen to look alike; they are one object with three brains.
 * The shell owns everything they share — the asymmetric container, the eyebrow
 * / title / figure / secondary stack, the decorative burst, the connected alert
 * strip, and the two emphasis TIERS — and each card supplies only what it
 * alone knows: a generic entity read, a vacuum's derived ETA, or a select's
 * current option.
 *
 * Keeping this in one place is not tidiness. Every one of these parts was
 * fixed at least once (the burst's shape, the alert seam, the sidekick's
 * colour roles, the heading scale), and while the sheets were copies each fix
 * had to be found and re-applied per card — which is exactly how they drifted.
 */

/** Container colour pairs, per tier. The one place these tokens are decided.
 *
 *  `rest` is a quiet tonal surface; `active` is the palette's "this device is
 *  doing something" family (the same one materia-card gives a running vacuum);
 *  `sidekick` sits on the page's own neutral surface, because a sidekick must
 *  read as a peer of the rows around it rather than a second announcement. */
export const SHELL_PAIR = {
  rest: {
    bg: "var(--md-sys-color-secondary-container)",
    fg: "var(--md-sys-color-on-secondary-container)",
  },
  active: {
    bg: "var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",
    fg: "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))",
  },
  sidekick: {
    bg: "var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06))",
    fg: "var(--md-sys-color-on-surface)",
  },
};

export const heroShellStyles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Everything below scales off the card's own width. */
      container-type: inline-size;
    }

    /* Connected group: a 2dp seam, and the members' facing corners tighten so
       the hero and its alert strip read as ONE object. */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Asymmetric expressive container — three big corners and one small,
       which is what stops it reading as a plain rounded rectangle. */
    .hero {
      position: relative;
      overflow: hidden;
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--mh-bg);
      color: var(--mh-fg);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* Bottom corners tighten only while something is attached below. */
    .hero.attached {
      border-radius: 32px 32px 8px 8px;
    }

    /* ---- THE SIDEKICK TIER ------------------------------------------------
       One hero per surface — that is what makes it a hero. So every card in
       this family can also render as its own quiet companion: identical
       anatomy, one rung down on every scale, on the page's neutral surface
       instead of an accent. A page then reads as one statement plus its
       supporting cast rather than three cards shouting equally loudly.

       The asymmetric silhouette is the HERO's mark, so the sidekick gives it
       up for the uniform radius the level rows already use, which is what
       makes it read as their peer. */
    :host([variant="sidekick"]) .hero {
      border-radius: 26px;
      padding: clamp(14px, 4cqi, 18px);
    }

    :host([variant="sidekick"]) .hero.attached {
      border-radius: 26px 26px 8px 8px;
    }

    :host([variant="sidekick"]) .alert {
      border-radius: 8px 8px 26px 26px;
      padding: 10px clamp(14px, 4cqi, 18px);
    }

    :host([variant="sidekick"]) .title {
      font-size: clamp(18px, 5.5cqi, 22px);
      margin-top: 4px;
    }

    :host([variant="sidekick"]) .value {
      font-size: clamp(30px, 12cqi, 44px);
    }

    :host([variant="sidekick"]) .unit {
      font-size: clamp(12px, 3.6cqi, 15px);
      padding-bottom: clamp(4px, 2cqi, 7px);
    }

    :host([variant="sidekick"]) .caption {
      padding-bottom: clamp(5px, 2.4cqi, 9px);
    }

    :host([variant="sidekick"]) .secondary {
      margin-top: 4px;
    }

    /* NO decoration on the sidekick. The burst is the hero's statement mark,
       and a sidekick's entire job is to not make statements — shrunk versions
       still read as a second flourish on a page that already has one. */
    :host([variant="sidekick"]) .burst {
      display: none;
    }

    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px clamp(16px, 4.5cqi, 22px);
      /* Mirror of the hero: small where they meet, large on the outside, and
         the one tight corner kept at bottom-right so the silhouette still has
         the family's asymmetry. */
      border-radius: 8px 8px 14px 32px;
      background: var(--mh-alert-bg);
      color: var(--mh-alert-fg);
      cursor: pointer;
      box-sizing: border-box;
      font-size: clamp(13px, 3.7cqi, 15px);
      font-weight: 600;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .alert ha-icon {
      --mdc-icon-size: clamp(18px, 5cqi, 22px);
      flex-shrink: 0;
    }

    .alert span {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Inline "I've done it" affordance. Inherits the strip's own foreground so
       it reads at the right severity without a second colour decision. */
    .alert-action {
      flex: none;
      width: 32px;
      height: 32px;
      margin: -4px -6px -4px 0;
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;
      color: inherit;
      background: color-mix(in srgb, currentColor 12%, transparent);
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .alert-action ha-icon {
      --mdc-icon-size: 18px;
    }

    .alert-action:hover {
      background: color-mix(in srgb, currentColor 22%, transparent);
    }

    .burst {
      position: absolute;
      right: -8cqi;
      top: -8cqi;
      width: 36cqi;
      height: 36cqi;
      /* Sits in the container tint, never competing with the text. */
      fill: color-mix(in srgb, currentColor 9%, transparent);
      pointer-events: none;
      /* Static at rest. Motion means the machine is doing something, so an
         idle device gets a still shape — nothing moving for no reason. */
      transform-box: fill-box;
      transform-origin: center;
    }

    .burst.working {
      animation: mh-spin 9s linear infinite;
    }

    .burst.alarm {
      animation: mh-spin 45s linear infinite;
    }

    /* Alert is the one exception to "only when running": a fault should keep
       drawing the eye. Ominously slow rather than urgent — 45s per revolution
       on a 15-point star repeats only every ~3s of symmetry. Rotation and
       scale can't share one transform, so the swell rides a nested group. */
    .loom {
      transform-box: fill-box;
      transform-origin: center;
      animation: mh-loom 7s ease-in-out infinite alternate;
    }

    /* Calm counterpart to .loom — and, like the rotation, only while working. */
    .drift {
      transform-box: fill-box;
      transform-origin: center;
    }

    .burst.working .drift {
      animation: mh-drift 13s ease-in-out infinite alternate;
    }

    @keyframes mh-drift {
      to {
        transform: scale(1.03);
      }
    }

    @keyframes mh-loom {
      to {
        transform: scale(1.05);
      }
    }

    @keyframes mh-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .burst,
      .loom,
      .drift {
        animation: none;
      }
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
      min-width: 0;
    }

    .eyebrow span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .eyebrow ha-icon {
      --mdc-icon-size: clamp(15px, 4.4cqi, 18px);
      flex-shrink: 0;
    }

    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(21px, 7.6cqi, 32px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-top: 6px;
    }

    .figure {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      margin-top: 2px;
      min-width: 0;
    }

    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(40px, 17cqi, 70px);
      font-weight: 700;
      letter-spacing: -0.06em;
      /* Generous enough that the display face's tall digits never clip. */
      line-height: 1.12;
      font-variant-numeric: tabular-nums;
    }

    .unit {
      font-size: clamp(14px, 4.6cqi, 20px);
      font-weight: 600;
      padding-bottom: clamp(6px, 2.8cqi, 11px);
    }

    .caption {
      font-size: clamp(12px, 3.4cqi, 14px);
      padding-bottom: clamp(8px, 3.6cqi, 15px);
      opacity: 0.62;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .secondary {
      font-size: clamp(13px, 3.7cqi, 15px);
      opacity: 0.62;
      margin-top: 6px;
    }
  `,
];

/**
 * Behaviour every hero shares: the tier, the burst, and the generic alert
 * list. Cards with a richer alert story (vacuum-hero derives its own from
 * consumables and error codes) simply define their own members — a subclass
 * body wins over a mixin prototype, so they keep the tier for free.
 */
export const HeroShellMixin = (Base) =>
  class extends Base {
    /** Reflected so the whole shell can restyle from one attribute, including
     *  parts (the alert strip) that are not inside the container. */
    willUpdate(changed) {
      super.willUpdate?.(changed);
      const v = this.config?.variant === "sidekick" ? "sidekick" : null;
      if (v) this.setAttribute("variant", v);
      else this.removeAttribute("variant");
    }

    get _sidekick() {
      return this.config?.variant === "sidekick";
    }

    /** The container pair for a tier + state, before any card-specific
     *  override. A sidekick never takes the accent: its whole job is to not
     *  compete with the hero above it. */
    _shellPair(active) {
      if (this._sidekick) return SHELL_PAIR.sidekick;
      return active ? SHELL_PAIR.active : SHELL_PAIR.rest;
    }

    /** Normalised alert list; `alert:` (singular) is accepted as one entry. */
    _alertList() {
      if (Array.isArray(this.config.alerts)) return this.config.alerts;
      return this.config.alert ? [this.config.alert] : [];
    }

    /** States that mean "nothing to report". */
    _idle(state) {
      return ["off", "idle", "unknown", "unavailable", "false", "0", "none", "", "ok", "docked"]
        .includes(String(state ?? "").toLowerCase());
    }

    _alertText(i, a) {
      if (a.text == null) return "";
      const v = this._isTemplate(a.text) ? this._tplResults?.[`alertText${i}`] : a.text;
      return v == null ? "" : String(v).trim();
    }

    /** First active alert wins — the list's order is the declared precedence. */
    get _activeAlert() {
      const list = this._alertList();
      for (let i = 0; i < list.length; i++) {
        const a = list[i];
        const text = this._alertText(i, a);
        if (a.entity) {
          const st = this.hass?.states[a.entity];
          if (!st) continue;
          const cur = String(st.state);
          if (a.state != null) {
            const want = Array.isArray(a.state) ? a.state.map(String) : [String(a.state)];
            if (!want.includes(cur)) continue;
          } else if (this._idle(cur)) {
            continue;
          }
          // No text configured: fall back to the entity's own localized state.
          return { ...a, text: text || (this.hass.formatEntityState?.(st) ?? cur) };
        }
        // Template-only: an empty render means the condition isn't met.
        if (!text) continue;
        return { ...a, text };
      }
      return null;
    }

    /** Resolve every alert entry's text template — call from updated(). */
    _resolveAlertTemplates() {
      this._alertList().forEach((a, i) => {
        if (a.text != null) this._resolveTemplateValue(`alertText${i}`, a.text);
      });
    }

    /** SoftBurst at rest, BOOM while something is wrong — so the silhouette
     *  itself carries the fault rather than only the colour. */
    _renderBurst({ alarm = false, working = false } = {}) {
      if (this.config.burst === false) return nothing;
      return html`
        <svg
          class="burst ${alarm ? "alarm" : working ? "working" : ""}"
          viewBox="0 0 180 180"
          aria-hidden="true"
        >
          ${alarm
            ? svg`<g class="loom"><path d=${BURST_BOOM} /></g>`
            : svg`<g class="drift"><path d=${BURST_CALM} /></g>`}
        </svg>
      `;
    }

    /** The connected strip. Rendered as the second member of .stack. */
    _renderAlertStrip(alert, fallbackEntity) {
      if (!alert) return nothing;
      return html`
        <div
          class="alert"
          role="status"
          @click=${() =>
            this._handleAction(
              alert.tap_action || { action: "more-info", entity: alert.entity || fallbackEntity }
            )}
        >
          <ha-icon .icon=${alert.icon ?? "mdi:alert-circle-outline"}></ha-icon>
          <span>${alert.text}</span>
        </div>
      `;
    }
  };
