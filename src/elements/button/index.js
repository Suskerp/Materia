import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { CommitGesture } from "../../utils/commit-gesture.js";
import { conditionsMet } from "../../utils/conditions.js";
import { styles } from "./styles.js";
import "./editor.js";

/** Legacy materia-icon-button variant names → M3 button variants. */
const VARIANT_ALIAS = {
  "filled-tonal": "tonal",
  standard: "text",
};

/** Default "active" state per domain (for shape morphing). */
const DOMAIN_ACTIVE = {
  light: "on",
  switch: "on",
  fan: "on",
  input_boolean: "on",
  vacuum: "cleaning",
  lock: ["locked", "locking"],
  cover: "open",
  climate: "heat",
  media_player: "playing",
};

class MateriaButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedIcon: { state: true },
    _resolvedLabel: { state: true },
    _resolvedSubtitle: { state: true },
    _resolvedDisabled: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-button-editor");
  }

  static getStubConfig() {
    return { icon: "mdi:play", variant: "filled", size: "m", shape: "round" };
  }

  setConfig(config) {
    if (!config.icon && !config.label) {
      throw new Error("icon or label is required");
    }
    this.config = { variant: "filled", size: "m", shape: "round", ...config };
    this.toggleAttribute("wide", !!config.wide);
  }

  get _disabled() {
    // disabled_when is the canonical key — hui-card hides any card whose
    // config carries a truthy `disabled`, so that name is HA's, not ours.
    // The old key is still read: booleans/templates predate the collision.
    const val = this.config?.disabled_when ?? this.config?.disabled;
    if (val === undefined || val === null) return false;
    if (typeof val === "boolean") return val;
    // HA condition list — the same schema as card visibility, evaluated live.
    if (Array.isArray(val)) return conditionsMet(val, this.hass);
    if (this._isTemplate(val)) {
      const r = this._resolvedDisabled;
      return r === "True" || r === "true" || r === "1";
    }
    return val === "true" || val === "True";
  }

  updated(changedProps) {
    // Reflect `wide` whenever config changes — not just in setConfig, since
    // icon-row sets the `.config` property directly (bypassing setConfig).
    if (changedProps.has("config")) {
      this.toggleAttribute("wide", !!this.config?.wide);
      // `flex` lets a row hand out uneven shares — the M3 connected-group idea
      // where the primary action is visibly wider than its neighbours. Set on
      // the host because that's the flex item inside materia-icon-row.
      if (this.config?.flex != null) this.style.flex = String(this.config.flex);
    }
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("label", "_resolvedLabel");
      this._resolveField("subtitle", "_resolvedSubtitle");
      this._resolveField(this.config?.disabled_when != null ? "disabled_when" : "disabled", "_resolvedDisabled");
    }
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const domain = stateObj.entity_id.split(".")[0];
    const active = this.config.active_state ?? DOMAIN_ACTIVE[domain] ?? "on";
    if (Array.isArray(active)) return active.includes(stateObj.state);
    return stateObj.state === String(active);
  }

  _defaultTapAction() {
    return this.config.entity ? { action: "toggle" } : { action: "none" };
  }

  _resolveTapAction() {
    if (this.config.tap_action_map && this.config.entity) {
      const state = this.hass?.states[this.config.entity]?.state;
      const mapped = this.config.tap_action_map[state] ?? this.config.tap_action_map.default;
      if (mapped) return mapped;
    }
    return this.config.tap_action || this._defaultTapAction();
  }

  _handleTap() {
    if (this._disabled) return;
    if (this._confirmMode) return; // a confirm button has no tap path at all
    this._handleAction(this._resolveTapAction());
  }

  /* ---- confirm gesture -------------------------------------------------
     `confirm: hold` (or `slide`) turns the button into a deliberate COMMIT
     rather than a tap. Everything about how the button LOOKS is untouched —
     variant, role, size, shape, connected, stacked, wide all still apply —
     because the gesture is a property of how it commits, not of what it is.

     THE BUTTON'S OWN SURFACE IS THE TRACK. A fill sweeps from the leading edge
     across the button and the geometry never changes: no nested control, no
     second element with its own height and radius to keep in step with the size
     ladder. That is the whole reason this is a button variant and not a card
     wrapping a gesture — the previous shape read as a slab because it WAS one.

     There is no tap path. That is the point, and it is why _handleTap bails
     above: a control whose whole job is to be hard to fire by accident must not
     also fire on a stray tap. */

  get _confirmMode() {
    const c = this.config?.confirm;
    const mode = c === "hold" || c === true ? "hold" : c === "slide" ? "slide" : null;
    if (!mode) return null;
    /* THE ASYMMETRY, and it belongs here rather than in a card wrapping this.
       A gesture exists to guard the direction that is expensive, and by default
       that is only turning something ON: switching an override off returns the
       system to normal, costs nothing, and is undone by doing it again. Making
       the cheap direction ceremonial teaches the reader the hold is a
       formality, which is exactly how a safety gesture stops working.

       So while the entity reads ACTIVE the button is an ordinary tap — using
       the same _isActive the shape morph already uses, so there is no second
       notion of "on" to keep in step. confirm_direction: both puts the gesture
       on the way out too, for a control that disables a protection rather than
       enabling a cost. */
    if (this.config?.confirm_direction === "both") return mode;
    const st = this.config?.entity ? this.hass?.states?.[this.config.entity] : undefined;
    return st && this._isActive(st) ? null : mode;
  }

  get _gesture() {
    this.__gesture ??= new CommitGesture({
      host: this,
      surface: () => this.shadowRoot?.querySelector(".btn"),
      onChange: () => this.requestUpdate(),
    });
    // The fill spans the whole button — there is no handle to leave room for.
    this.__gesture.travel = "full";
    return this.__gesture;
  }

  _syncGesture() {
    const g = this._gesture;
    g.gesture = this._confirmMode ?? "hold";
    g.threshold = Number(this.config?.confirm_threshold ?? 0.55);
    g.holdMs = Number(this.config?.confirm_hold_ms ?? 800);
    g.disabled = this._disabled;
    return g;
  }

  _onConfirmDown(ev) {
    if (!this._confirmMode) return;
    this._syncGesture().pointerDown(ev);
  }

  _onConfirmKey(ev) {
    if (!this._confirmMode) return;
    this._syncGesture().keyDown(ev);
  }

  _onConfirmed() {
    this._handleAction(this._resolveTapAction());
  }

  connectedCallback() {
    super.connectedCallback();
    /* The controller dispatches `confirm` on this host, so the button listens
       to itself rather than the parent having to wire anything up — a confirm
       button stays a drop-in for a plain one. */
    this.__onConfirm ??= () => this._onConfirmed();
    this.addEventListener("confirm", this.__onConfirm);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener("confirm", this.__onConfirm);
    this.__gesture?.destroy();
  }

  render() {
    if (!this.config) return html``;

    const stateObj = this.config.entity ? this.hass?.states?.[this.config.entity] : undefined;
    const unavailable = this.config.entity ? this._isUnavailable(stateObj) : false;
    const disabled = this._disabled;

    const baseVariant = VARIANT_ALIAS[this.config.variant] || this.config.variant || "filled";
    // Color role — independent of variant, per the M3 expressive spec. Unset
    // means each variant's own spec default (see styles.js), NOT primary.
    const role = ["primary", "secondary", "tertiary", "error"].includes(this.config.role)
      ? this.config.role
      : "";
    // size may be a named token (xs/s/m/l/xl) or a custom height in px
    // (e.g. 72) for an in-between size.
    const sizeVal = this.config.size ?? "m";
    const numeric = typeof sizeVal === "number" || /^\d+$/.test(String(sizeVal));
    let sizeClass = "";
    let sizeStyle = "";
    if (numeric) {
      const h = Number(sizeVal);
      sizeStyle =
        `--mb-h:${h}px;--mb-icon:${Math.round(h * 0.43)}px;--mb-font:16px;` +
        `--mb-px:${Math.round(h * 0.42)}px;--mb-rsq:${Math.round(h * 0.28)}px;--mb-gap:8px;`;
    } else {
      sizeClass = `size-${sizeVal}`;
    }
    const baseShape = this.config.shape === "square" ? "square" : "round";
    const active = this._isActive(stateObj);
    // Toggle buttons may use a different emphasis when checked. Keep color
    // and shape independent: a safety override can become filled/error while
    // remaining round, whereas an expressive preset can still morph shape.
    const configuredActiveVariant = this.config.active_variant;
    const variant = active && configuredActiveVariant
      ? (VARIANT_ALIAS[configuredActiveVariant] || configuredActiveVariant)
      : baseVariant;
    // M3 Expressive toggle rule: the selected resting shape is the inverse of
    // the configured unselected shape. Round becomes square; square becomes
    // round. Pressed geometry is shared by both (styles.js).
    const shape = this.config.morph_on_active && active
      ? (baseShape === "round" ? "square" : "round")
      : baseShape;

    const icon = this._isTemplate(this.config.icon)
      ? (this._resolvedIcon || "")
      : this.config.icon;
    const label = this._isTemplate(this.config.label)
      ? (this._resolvedLabel || "")
      : this.config.label;
    // Optional second line. M3 buttons are single-line, so this is an opt-in
    // extra rather than something to reach for by default. The icon stays IN
    // FRONT of the text either way — only an explicit `layout: stacked` puts
    // it above, since a subtitle alone is not a reason to restack the button.
    const subtitle = this._isTemplate(this.config.subtitle)
      ? (this._resolvedSubtitle || "")
      : this.config.subtitle;
    const stacked = this.config.layout === "stacked";
    const iconOnly = !label && !subtitle;
    const confirm = this._confirmMode;
    const g = confirm ? this._syncGesture() : null;

    return html`
      <button
        class="btn variant-${variant} ${role ? `role-${role}` : ""} ${sizeClass} shape-${shape} ${active ? "active" : "inactive"} ${this.config.connected ? `connected-${this.config.connected}` : ""} ${iconOnly ? "icon-only" : ""} ${stacked ? "stacked" : ""} ${disabled ? "disabled" : ""} ${unavailable ? "unavailable" : ""} ${confirm ? "confirming" : ""} ${g?.armed ? "armed" : ""} ${g && g.settling && !g.armed ? "settling" : ""}"
        style=${sizeStyle}${confirm ? `--mb-p:${g.p};` : ""}
        @click=${this._handleTap}
        @pointerdown=${confirm ? this._onConfirmDown : undefined}
        @keydown=${confirm ? this._onConfirmKey : undefined}
      >
        ${confirm ? html`<span class="commit-fill" aria-hidden="true"></span>` : nothing}
        ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
        ${label || subtitle
          ? html`<span class="text">
              ${label ? html`<span class="label">${label}</span>` : nothing}
              ${subtitle ? html`<span class="sub">${subtitle}</span>` : nothing}
            </span>`
          : nothing}
      </button>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-button", MateriaButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-button",
  name: "Materia Button",
  description: "M3 button — icon and/or label, variants, sizes, shapes, and shape-morph on state.",
  preview: true,
});
