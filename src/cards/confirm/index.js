import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { t } from "../../utils/i18n.js";
import { OptimismBus } from "../../utils/optimism-bus.js";
import { styles } from "./styles.js";
import "../../primitives/drag-confirm.js";
import "./editor.js";

/** States that read as active for the common switch-ish domains. Same
 *  vocabulary materia-doorbell uses for its own truthiness, so two cards
 *  pointed at one helper can never disagree about whether it is on. */
const ON_STATES = new Set(["on", "true", "open", "opening", "unlocked", "unlocking", "home", "active"]);

/**
 * Commit control (materia-confirm) — a deliberate gesture in place of a modal.
 *
 * WHAT THIS IS FOR. Some actions are cheap to fire and expensive to undo:
 * overriding a scheduler, forcing a heater, releasing a door. The usual answer
 * is a tap plus a confirmation dialog, which is two bad trades in one — the tap
 * is available to a mis-scroll, and the dialog puts the warning AFTER the
 * decision, where it gets dismissed by reflex. This card has no tap path at
 * all: committing takes a sustained hold (or a drag), and the warning sits in
 * plain view above it the whole time.
 *
 * IT OWNS NO GESTURE CODE. The pointer state machine, the fill, the keyboard
 * path and the busy treatment all belong to materia-drag-confirm, which
 * already survived iOS and the HA companion app. This card is the entity
 * wiring and the copy around it — wired the same way materia-lock wires the
 * same primitive, so there is one pattern for this and not two.
 *
 * ASYMMETRY IS THE POINT. The gesture guards the direction that is expensive,
 * and by default that is only turning something ON. Switching an override OFF
 * returns the system to its normal behaviour, costs nothing, and is recoverable
 * by doing it again — making that take a two-second hold would teach the reader
 * that the hold is a formality, which is exactly how a safety gesture stops
 * working. So the active face is an ordinary button. This card has a precedent
 * in the repo: materia-lock's OPEN button is a plain tap while lock/unlock is
 * the gesture. Where OFF is the dangerous direction (a control that disables a
 * protection rather than enabling a cost), `require_gesture: both` puts the
 * gesture on both.
 *
 * OPTIMISTIC. A commit pins the requested state and publishes it on the
 * OptimismBus, so this card and any sibling watching the same entity both flip
 * the instant the gesture lands rather than after the round-trip. The pin
 * expires, because a helper that never answers must stop being claimed.
 *
 * SELF-CONTAINED with no entity: the card still fires its action, it just has
 * no state to reflect, so it stays on the gesture face.
 */
class MateriaConfirm extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    /** Optimistic active/inactive, until the entity agrees. */
    _pending: { state: true },
    _resolvedLabel: { state: true },
    _resolvedActiveLabel: { state: true },
    _resolvedCaption: { state: true },
    _resolvedActiveCaption: { state: true },
    _resolvedEyebrow: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-confirm-editor");
  }

  static getStubConfig() {
    // No entity by default: the card is a generic commit control and is
    // demonstrable before it is pointed at anything.
    return { gesture: "hold" };
  }

  setConfig(config) {
    this.config = { gesture: "hold", ...config };
  }

  constructor() {
    super();
    this._pending = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsub = OptimismBus.subscribe((entity) => {
      if (entity === this.config?.entity) this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsub?.();
    this._unsub = null;
    clearTimeout(this._pinTimer);
  }

  updated(changed) {
    if (!changed.has("hass") || !this.hass) return;
    // Author strings are templatable so the install supplies its own sentence
    // in its own language — this card hardcodes no prose.
    this._resolveField("label", "_resolvedLabel");
    this._resolveField("active_label", "_resolvedActiveLabel");
    this._resolveField("caption", "_resolvedCaption");
    this._resolveField("active_caption", "_resolvedActiveCaption");
    this._resolveField("eyebrow", "_resolvedEyebrow");

    if (this._pending == null) return;
    // The entity agreed — drop the optimistic hold and let reality drive.
    if (this._entityActive === this._pending) {
      this._pending = null;
      clearTimeout(this._pinTimer);
    }
  }

  _field(configKey, propKey) {
    const raw = this.config?.[configKey];
    const resolved = this._isTemplate(raw) ? this[propKey] : raw;
    return typeof resolved === "string" ? resolved.trim() : resolved;
  }

  get _stateObj() {
    return this.config?.entity ? this.hass?.states[this.config.entity] : null;
  }

  /** What the real entity reports, or null when there is nothing to read. */
  get _entityActive() {
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) return null;
    const raw = String(st.state).toLowerCase();
    // An explicit active_state wins, for a control whose "on" is spelled
    // something else entirely.
    if (this.config.active_state) return raw === String(this.config.active_state).toLowerCase();
    return ON_STATES.has(raw);
  }

  /** What the card SHOWS: the pin first, then reality. */
  get _active() {
    if (this._pending != null) return this._pending;
    return this._entityActive === true;
  }

  /** True while we are waiting for the entity to catch up with a commit. */
  get _busy() {
    return this._pending != null && this._entityActive !== this._pending;
  }

  /** Which direction the gesture guards. Only ON by default — see the class
   *  comment for why making the cheap direction ceremonial is a net loss. */
  get _gestureBoth() {
    return this.config.require_gesture === "both";
  }

  /** The gesture face is shown when inactive, or always if both directions
   *  are guarded. With no entity there is no active state to show. */
  get _showGesture() {
    return !this._active || this._gestureBoth;
  }

  _commit() {
    const next = !this._active;
    const eid = this.config.entity;

    if (eid) {
      this._pending = next;
      clearTimeout(this._pinTimer);
      this._pinTimer = setTimeout(() => {
        this._pending = null;
      }, Number(this.config.pending_timeout_ms ?? 10000));
      OptimismBus.publish(eid, next ? "on" : "off", this._stateObj?.state);
    }

    const explicit = next ? this.config.action : this.config.deactivate_action;
    if (explicit) {
      this._handleAction(explicit);
      return;
    }
    if (!eid) return; // nothing configured and nothing to toggle
    // Zero-config path: with an entity and no actions, the card just drives it.
    // homeassistant.turn_on/off rather than a domain table, so an
    // input_boolean, a switch or a script-backed helper all work.
    this._fireHaptic("success");
    this._callService("homeassistant", next ? "turn_on" : "turn_off", { entity_id: eid });
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const st = this._stateObj;
    if (this.config.entity && !st) {
      return html`<ha-card><div class="body">
        <div class="note">${t("entity_not_found_with_id", this.hass, { entity: this.config.entity })}</div>
      </div></ha-card>`;
    }

    const unavailable = !!st && this._isUnavailable(st);
    const active = this._active;
    const showGesture = this._showGesture;

    /* Inactive: the quiet track the primitive already defaults to. Active: the
       tertiary container pair — a contrasting accent for something running
       against the normal behaviour, not the error pair, because an override
       switched on deliberately is not a fault. */
    const activeBg = this.config.active_color ?? "var(--md-sys-color-tertiary-container)";
    const activeFg = this.config.active_color_on ?? "var(--md-sys-color-on-tertiary-container)";
    const handle = this.config.handle_color ?? "var(--md-sys-color-primary)";
    const handleInk = this.config.handle_color_on ?? "var(--md-sys-color-on-primary)";

    const eyebrow = this._field("eyebrow", "_resolvedEyebrow");
    const caption = active
      ? (this._field("active_caption", "_resolvedActiveCaption") ?? this._field("caption", "_resolvedCaption"))
      : this._field("caption", "_resolvedCaption");

    const label = this._field("label", "_resolvedLabel") ?? t("cf_hold_to_confirm", this.hass);

    /* The active label falls back to the GESTURE label before the generic
       word. With the copy pared back to a single name — the signed-off config
       here is nothing but `label: Noodladen` — a control called Noodladen
       should still be called Noodladen once it is running, and requiring two
       config fields to say one word is the apparatus this card was asked to
       shed. An author who writes an instruction rather than a name in `label`
       ("Hold to start") will see it on the active face and can set
       `active_label` in one line; that failure is visible and cheap, whereas
       needing to know about a second field to avoid a generic word is neither. */
    const activeLabel = this._field("active_label", "_resolvedActiveLabel")
      ?? label
      ?? t("cf_active", this.hass);

    return html`
      <ha-card class=${unavailable ? "unavailable" : ""}>
        <div
          class="body"
          style="--mc-track:${this.config.track_color ?? "var(--md-sys-color-surface-container-high)"};--mc-ink:${this.config.track_color_on ?? "var(--md-sys-color-on-surface)"};--mc-handle:${handle};--mc-handle-ink:${handleInk};--mc-active-bg:${activeBg};--mc-active-fg:${activeFg};"
        >
          ${eyebrow ? html`<div class="eyebrow">${eyebrow}</div>` : nothing}

          ${showGesture
            ? html`
                <materia-drag-confirm
                  .gesture=${this.config.gesture === "slide" ? "slide" : "hold"}
                  .label=${this._busy ? (this.config.busy_label ?? t("cf_working", this.hass)) : (active ? activeLabel : label)}
                  .icon=${this.config.gesture_icon ?? ""}
                  .pending=${this._busy}
                  .direction=${active ? "backward" : "forward"}
                  .threshold=${Number(this.config.threshold ?? 0.55)}
                  .holdMs=${Number(this.config.hold_ms ?? 800)}
                  ?disabled=${unavailable}
                  @confirm=${this._commit}
                ></materia-drag-confirm>
              `
            : html`
                <button
                  class="active-face"
                  aria-label=${this.config.deactivate_aria ?? t("cf_tap_to_stop_aria", this.hass, { what: activeLabel })}
                  ?disabled=${unavailable}
                  @click=${this._commit}
                >
                  <ha-icon .icon=${this.config.active_icon ?? "m3o:check-circle"}></ha-icon>
                  <div class="face-text">
                    <span class="face-label">${activeLabel}</span>
                    <span class="face-hint">
                      ${this._busy
                        ? (this.config.busy_label ?? t("cf_working", this.hass))
                        : (this.config.deactivate_hint ?? t("cf_tap_to_stop", this.hass))}
                    </span>
                  </div>
                  <div class="layer"></div>
                </button>
              `}

          ${caption
            ? html`<div class="caption ${this.config.caption_warn === false ? "" : active ? "" : "warn"}">${caption}</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-confirm", MateriaConfirm);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-confirm",
  name: "Materia Confirm",
  description: "Press-and-hold to commit a consequential action, with the warning in plain view instead of in a dialog. No tap path.",
  preview: true,
});
