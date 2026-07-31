import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin, disabledConditionStyles } from "../../utils/conditions.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles, PRESETS, SIZES } from "./styles.js";
import "../button/index.js";
import "../split-button/index.js";
import "./editor.js";

/** A button entry that should render as a split button rather than a plain one. */
const SPLIT_TYPES = new Set(["split", "split-button", "materia-split-button"]);

/**
 * M3 button group. The spec describes ONE component with two configurations,
 * so both live here behind `group`:
 *
 *   connected (default) — buttons joined with 2dp seams into a segmented
 *                control, driven by an entity's state/attribute. Configured
 *                with `options`.
 *   standard  — buttons spaced in a row, each with its own action and variant;
 *                entries with `options` render as split buttons. Configured
 *                with `buttons`.
 *
 * `group` defaults to `connected` so every existing config keeps working, and
 * the old `materia-icon-row` type forwards here as `group: standard`.
 *
 * Note `variant` is the SURFACE style (filled/tonal) — it predates this merge,
 * which is why the configuration axis is `group` and not `variant`.
 */
export class MateriaButtonGroup extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    /** UNCONTROLLED mode. With no `entity` in config the group has nothing to
     *  read, so it keeps its own selection and reports it as `option-selected`
     *  instead. That is what lets a card compose a real M3 button group for
     *  state it owns itself — a picker's tabs, a mocked control — rather than
     *  hand-rolling a lookalike row that then drifts from this element's
     *  shape, sizes and motion. `value` seeds it; the group owns it after. */
    value: { type: String },
    _localValue: { state: true },
    _optimisticValue: { state: true },
    _optimisticEntities: { state: true },
    _resolvedColorActive: { state: true },
    _resolvedColorOnActive: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-button-group-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(e => e.startsWith("input_select.") || e.startsWith("select.")) || "";
    return {
      entity,
      size: "m",
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ],
    };
  }

  static styles = [unavailableStyles, styles, disabledConditionStyles];

  setConfig(config) {
    this.config = {
      size: "m",
      ...config,
    };
  }

  get _resolvedOptions() {
    if (this.config.options?.length) return this.config.options;
    const stateObj = this.hass?.states[this.config.entity];
    const domain = this.config.entity?.split(".")[0];
    if ((domain === "input_select" || domain === "select") && stateObj?.attributes?.options) {
      return stateObj.attributes.options.map(opt => ({
        label: this._capitalize(opt),
        value: opt,
        tap_action: {
          action: "perform-action",
          perform_action: `${domain}.select_option`,
          data: { option: opt },
          target: { entity_id: this.config.entity },
        },
      }));
    }
    return [];
  }

  get _activeValue() {
    // Uncontrolled: no entity to read, so the local selection IS the value.
    if (!this.config?.entity) return this._localValue ?? String(this.value ?? "");
    if (this._optimisticValue != null) return this._optimisticValue;
    const entity = this.hass?.states[this.config.entity];
    if (this.config.attribute) return String(entity?.attributes?.[this.config.attribute] ?? "");
    return entity?.state ?? "";
  }

  /** States that read as "off"/inactive for a truthy per-button toggle. */
  _truthy(state) {
    const s = String(state ?? "").toLowerCase();
    return s !== "" && !["off", "closed", "idle", "standby", "unavailable",
      "unknown", "not_home", "false", "0", "none", "auto_off"].includes(s);
  }

  /** Active state of an option that carries its OWN entity. */
  _entityOptionActive(opt) {
    const eid = opt.entity;
    const optim = this._optimisticEntities?.[eid];
    const st = this.hass?.states[eid]?.state;
    // Empty-string value (editor leftover) means "no expected value".
    if (opt.value != null && opt.value !== "") {
      const target = String(opt.value).toLowerCase();
      if (optim && optim.value != null) return optim.value === target;
      return String(st ?? "").toLowerCase() === target;
    }
    if (optim && optim.active != null) return optim.active;
    return this._truthy(st);
  }

  /** Truthy interpretation of a rendered template result. */
  _tplTruthy(v) {
    if (typeof v === "boolean") return v;
    const s = String(v ?? "").trim().toLowerCase();
    return ["true", "on", "yes", "1", "open", "home", "active"].includes(s);
  }

  _isOptionActive(opt, i) {
    // Highest precedence: an explicit per-option `active` — a template
    // (attribute-based logic etc.) or a literal boolean.
    if (opt.active != null) {
      if (this._isTemplate(opt.active)) {
        return this._tplTruthy(this._tplResults?.[`optActive${i}`]);
      }
      return this._tplTruthy(opt.active);
    }
    // Per-button entity wins over the group entity, so related controls with
    // their own state can be combined in one group.
    if (opt.entity) return this._entityOptionActive(opt);
    if (this.config.multi_select) {
      const stateStr = this._activeValue;
      const values = stateStr.split(",").map(v => v.trim().toLowerCase()).filter(Boolean);
      return values.includes(String(opt.value).toLowerCase());
    }
    return String(opt.value) === this._activeValue;
  }

  _getActiveColors() {
    const colorActive = this._resolvedColorActive || this.config.color_active;
    const colorOnActive = this._resolvedColorOnActive || this.config.color_on_active;
    if (colorActive && colorOnActive) {
      return { active: colorActive, onActive: colorOnActive };
    }
    if (this.config.preset && PRESETS[this.config.preset]) {
      return PRESETS[this.config.preset];
    }
    // M3 guardrail: unstyled groups default to the SECONDARY selected-toggle
    // family, not solid primary — one primary element per surface.
    return PRESETS.secondary;
  }

  /** Standard group: a spaced row of independent buttons.
   *
   *  Size is the GROUP's, not each button's — M3 sizes a button group as one
   *  unit, so a per-button `size` is deliberately dropped here. Everything
   *  else (variant, icon, disabled, tap_action_map, …) stays per-button. */
  _renderStandard() {
    const gap = this.config.gap ?? 8;
    const padding = this.config.padding ?? 4;
    const size = this.config.size || "m";

    return html`
      <ha-card>
        <div class="row" style="gap: ${gap}px; padding: ${padding}px 0;">
          ${(this.config.buttons || []).map((btn) => {
            const isSplit =
              SPLIT_TYPES.has(btn.type) || (Array.isArray(btn.options) && btn.options.length > 0);
            const { size: _perButtonSize, type: _t, ...rest } = btn;
            const cfg = { variant: "filled", ...rest, size };
            return isSplit
              ? html`<materia-split-button .hass=${this.hass} .config=${cfg}></materia-split-button>`
              : html`<materia-button .hass=${this.hass} .config=${cfg}></materia-button>`;
          })}
        </div>
      </ha-card>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    if (this.config.group === "standard") return this._renderStandard();

    const stateObj = this.config.entity ? this.hass.states[this.config.entity] : undefined;
    const unavailable = stateObj ? this._isUnavailable(stateObj) : false;

    const sizeKey = this.config.size || "m";
    const { height, innerCorner } = SIZES[sizeKey] || SIZES.m;
    const outerR = height / 2;
    const activeValue = this._activeValue;
    const colors = this._getActiveColors();
    const options = this._resolvedOptions;
    const variant = this.config.variant || "tonal";
    if (!options.length) return html``;

    const multiSelect = this.config.multi_select;
    const columns = this.config.columns || 0;

    return html`
      <ha-card>
        <div class="group ${unavailable ? 'unavailable' : ''} ${multiSelect ? 'multi' : ''}"
          style="${!multiSelect ? `height: ${height}px;` : `--btn-height: ${height}px;`} ${columns ? `--btn-columns: ${columns};` : ''}">
          ${options.map((opt, i) => {
            const isActive = this._isOptionActive(opt, i);
            const isFirst = i === 0;
            const isLast = i === options.length - 1;

            // M3 Expressive icon-toggle morph: selected buttons go SQUARE
            // (rounded-square) instead of pill when active_shape: square.
            // Must be visibly SQUARER than the inactive inner corners, or the
            // morph is invisible at large sizes.
            const squareActive = this.config.active_shape === "square";
            const activeR = squareActive
              ? Math.min(innerCorner, Math.max(6, Math.round(height * 0.18)))
              : outerR;
            let radius;
            if (multiSelect) {
              if (isActive) {
                radius = `${activeR}px`;
              } else {
                const cols = columns || options.length;
                const row = Math.floor(i / cols);
                const col = i % cols;
                const totalRows = Math.ceil(options.length / cols);
                const isTopRow = row === 0;
                const isBottomRow = row === totalRows - 1;
                const isFirstCol = col === 0;
                const isLastCol = col === cols - 1 || i === options.length - 1;
                const tl = (isTopRow && isFirstCol) ? outerR : innerCorner;
                const tr = (isTopRow && isLastCol) ? outerR : innerCorner;
                const br = (isBottomRow && isLastCol) ? outerR : innerCorner;
                const bl = (isBottomRow && isFirstCol) ? outerR : innerCorner;
                radius = `${tl}px ${tr}px ${br}px ${bl}px`;
              }
            } else {
              const ir = isActive ? `${activeR}px` : `${innerCorner}px`;
              const or = isActive && squareActive ? `${activeR}px` : `${outerR}px`;
              if (options.length === 1) {
                radius = or;
              } else if (isFirst) {
                radius = `${or} ${ir} ${ir} ${or}`;
              } else if (isLast) {
                radius = `${ir} ${or} ${or} ${ir}`;
              } else {
                radius = ir;
              }
            }

            const bg = isActive ? colors.active : undefined;
            const fg = isActive ? colors.onActive : undefined;
            return html`
              <button
                class="${isActive ? "active" : "inactive"} ${variant}"
                style="border-radius: ${radius};${isActive ? ` background: ${bg}; color: ${fg};` : ""}"
                @click=${() => this._handleOptionTap(opt)}
              >
                ${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : ""}
                ${opt.label ? html`<span>${opt.label}</span>` : ""}
              </button>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  _handleOptionTap(opt) {
    // Uncontrolled: own the selection and announce it. Returns early, because
    // there is no entity to be optimistic about and no service to call.
    if (!this.config.entity && !opt.entity && !opt.tap_action) {
      const v = String(opt.value);
      if (this.config.multi_select) {
        const cur = this._activeValue.split(",").map((x) => x.trim()).filter(Boolean);
        const i = cur.findIndex((x) => x.toLowerCase() === v.toLowerCase());
        if (i >= 0) cur.splice(i, 1);
        else cur.push(v);
        this._localValue = cur.join(",");
      } else {
        this._localValue = v;
      }
      this._fireHaptic("selection");
      this.dispatchEvent(new CustomEvent("option-selected", {
        detail: { value: this._localValue, option: opt },
        bubbles: true,
        composed: true,
      }));
      return;
    }

    // A connected group IS a picker, so choosing in it is a SELECTION change
    // rather than an impact — the subtle effect, per Google's "frequent
    // interactions should be very subtle". _handleAction's own `light` is
    // swallowed by the de-dupe, so this replaces it rather than adding to it.
    this._fireHaptic("selection");

    if (opt.entity) {
      // Optimistically flip just this button's own entity. `baseline` is the
      // state at tap time: the moment the REAL state moves at all, the pin is
      // dropped — linked entities/automations may land somewhere else than
      // predicted, and reality must win over the prediction.
      const eid = opt.entity;
      const st = String(this.hass?.states[eid]?.state ?? "");
      const next = opt.value != null && opt.value !== ""
        ? { baseline: st, value: String(opt.value).toLowerCase() }
        : { baseline: st, active: !this._truthy(st) };
      this._optimisticEntities = { ...this._optimisticEntities, [eid]: next };
      this._optEntityTimers = this._optEntityTimers || {};
      clearTimeout(this._optEntityTimers[eid]);
      this._optEntityTimers[eid] = setTimeout(() => {
        const { [eid]: _, ...rest } = this._optimisticEntities || {};
        this._optimisticEntities = rest;
      }, 10000);
    } else if (!this.config.multi_select) {
      const entity = this.hass?.states[this.config.entity];
      this._optimisticBaseline = this.config.attribute
        ? String(entity?.attributes?.[this.config.attribute] ?? "")
        : String(entity?.state ?? "");
      this._optimisticValue = String(opt.value);
      clearTimeout(this._optimisticTimer);
      this._optimisticTimer = setTimeout(() => { this._optimisticValue = null; }, 10000);
    }

    if (opt.tap_action) {
      // Per-option entity rides along so `action: toggle` (and more-info)
      // target THIS button's entity, not the group's.
      this._handleAction(opt.entity ? { entity: opt.entity, ...opt.tap_action } : opt.tap_action);
    } else if (opt.entity) {
      this._fireMoreInfo(opt.entity);
    } else if (this.config.entity) {
      this._fireMoreInfo(this.config.entity);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._optimisticTimer);
    for (const t of Object.values(this._optEntityTimers || {})) clearTimeout(t);
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color_active", "_resolvedColorActive");
      this._resolveField("color_on_active", "_resolvedColorOnActive");
      // Per-option active templates (attribute-based active states).
      this._resolvedOptions.forEach((opt, i) => {
        if (opt.active != null) this._resolveTemplateValue(`optActive${i}`, opt.active);
      });
    }
    if (changedProps.has("hass") && this._optimisticValue != null) {
      const entity = this.hass?.states[this.config.entity];
      const actual = this.config.attribute
        ? String(entity?.attributes?.[this.config.attribute] ?? "")
        : String(entity?.state ?? "");
      // Release the pin when the real state matches the prediction OR when it
      // moved AT ALL from the tap-time baseline — the entity updated, and the
      // real state must win (predictions can land wrong: case differences,
      // rejected calls, automations picking a different option).
      if (
        actual.toLowerCase() === this._optimisticValue.toLowerCase() ||
        (this._optimisticBaseline != null && actual !== this._optimisticBaseline)
      ) {
        this._optimisticValue = null;
        this._optimisticBaseline = null;
        clearTimeout(this._optimisticTimer);
      }
    }
    // Clear per-entity optimism once HA reflects ANY real movement (linked
    // entities/automations may flip siblings or land differently than the
    // predicted toggle — reality wins as soon as it arrives).
    if (changedProps.has("hass") && this._optimisticEntities) {
      let changed = false;
      const next = { ...this._optimisticEntities };
      for (const [eid, optim] of Object.entries(next)) {
        const st = String(this.hass?.states[eid]?.state ?? "");
        const settled = (optim.baseline != null && st !== optim.baseline)
          || (optim.value != null
            ? st.toLowerCase() === optim.value
            : this._truthy(st) === optim.active);
        if (settled) {
          delete next[eid];
          clearTimeout(this._optEntityTimers?.[eid]);
          changed = true;
        }
      }
      if (changed) this._optimisticEntities = next;
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-button-group", MateriaButtonGroup);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-button-group",
  name: "Materia Button Group",
  description: "M3 button group — connected (segmented, entity-driven) or standard (a spaced row of buttons).",
  preview: true,
});
