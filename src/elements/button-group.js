import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-button-group
 *  M3 connected button group with pill container,
 *  position-aware corner radii, and selection animation.
 * ─────────────────────────────────────────────────────── */

const PRESETS = {
  primary:      { active: "var(--md-sys-color-primary)",              onActive: "var(--md-sys-color-on-primary)" },
  secondary:    { active: "var(--md-sys-color-secondary)",            onActive: "var(--md-sys-color-on-secondary)" },
  "climate-heat": { active: "var(--md-sys-cust-color-climate-heat)",  onActive: "var(--md-sys-cust-color-on-climate-heat)" },
  "climate-cool": { active: "var(--md-sys-cust-color-climate-cool)",  onActive: "var(--md-sys-cust-color-on-climate-cool)" },
  "climate-auto": { active: "var(--md-sys-cust-color-climate-auto)",  onActive: "var(--md-sys-cust-color-on-climate-auto)" },
  light:        { active: "var(--md-sys-cust-color-light)",           onActive: "var(--md-sys-cust-color-on-light)" },
  device:       { active: "var(--md-sys-cust-color-device)",          onActive: "var(--md-sys-cust-color-on-device)" },
};

const SIZES = {
  xs: { height: 32, innerCorner: 4 },
  s:  { height: 40, innerCorner: 8 },
  m:  { height: 48, innerCorner: 8 },
  l:  { height: 56, innerCorner: 16 },
  xl: { height: 64, innerCorner: 20 },
};

/* ── Visual Config Editor ── */

class MateriaButtonGroupEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = { ...config };
  }

  get _schema() {
    return [
      { name: "entity", selector: { entity: {} } },
      { name: "attribute", selector: { text: {} } },
      {
        name: "preset",
        selector: {
          select: {
            options: [
              { value: "", label: "None" },
              ...Object.keys(PRESETS).map((k) => ({ value: k, label: k })),
            ],
            mode: "dropdown",
          },
        },
      },
      {
        name: "size",
        selector: {
          select: {
            options: [
              { value: "xs", label: "XS (32dp)" },
              { value: "s",  label: "S (40dp)" },
              { value: "m",  label: "M (48dp)" },
              { value: "l",  label: "L (56dp)" },
              { value: "xl", label: "XL (64dp)" },
            ],
            mode: "dropdown",
          },
        },
      },
      { name: "color_active", selector: { text: {} } },
      { name: "color_on_active", selector: { text: {} } },
    ];
  }

  static styles = css`
    .options-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .option-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .option-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
    }
    .option-header span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .option-body {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .option-body ha-textfield,
    .option-body ha-textarea {
      display: block;
      width: 100%;
    }
  `;

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options || []).map(
        (opt, i) => html`
          <div class="option-card">
            <div class="option-header">
              <span>${opt.label || opt.value || `Option ${i + 1}`}</span>
              <ha-icon-button @click=${() => this._moveOption(i, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._moveOption(i, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._toggleExpand(i)}>
                <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeOption(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded === i
              ? html`
                  <div class="option-body">
                    <ha-textfield
                      label="Label"
                      .value=${opt.label || ""}
                      @change=${(e) => this._updateOption(i, "label", e.target.value)}
                    ></ha-textfield>
                    <ha-textfield
                      label="Value"
                      .value=${opt.value || ""}
                      @change=${(e) => this._updateOption(i, "value", e.target.value)}
                    ></ha-textfield>
                    <ha-textfield
                      label="Icon"
                      .value=${opt.icon || ""}
                      @change=${(e) => this._updateOption(i, "icon", e.target.value)}
                    ></ha-textfield>
                    <ha-textfield
                      label="Service (e.g. climate.set_hvac_mode)"
                      .value=${opt.service || ""}
                      @change=${(e) => this._updateOption(i, "service", e.target.value)}
                    ></ha-textfield>
                    <ha-textarea
                      label="Service data (JSON)"
                      .value=${opt.service_data ? JSON.stringify(opt.service_data, null, 2) : ""}
                      @change=${(e) => this._updateServiceData(i, e.target.value)}
                    ></ha-textarea>
                  </div>
                `
              : ""}
          </div>
        `
      )}
    `;
  }

  _expanded = null;

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
    this.requestUpdate();
  }

  _valueChanged(ev) {
    const updated = { ...this._config, ...ev.detail.value };
    this._config = updated;
    this._fireConfigChanged(updated);
  }

  _addOption() {
    const options = [...(this._config.options || []), { label: "", value: "", icon: "" }];
    const updated = { ...this._config, options };
    this._config = updated;
    this._expanded = options.length - 1;
    this._fireConfigChanged(updated);
  }

  _removeOption(index) {
    const options = [...(this._config.options || [])];
    options.splice(index, 1);
    const updated = { ...this._config, options };
    this._config = updated;
    if (this._expanded === index) this._expanded = null;
    this._fireConfigChanged(updated);
  }

  _moveOption(index, direction) {
    const options = [...(this._config.options || [])];
    const target = index + direction;
    if (target < 0 || target >= options.length) return;
    [options[index], options[target]] = [options[target], options[index]];
    const updated = { ...this._config, options };
    this._config = updated;
    if (this._expanded === index) this._expanded = target;
    this._fireConfigChanged(updated);
  }

  _updateOption(index, key, value) {
    const options = [...(this._config.options || [])];
    options[index] = { ...options[index], [key]: value };
    const updated = { ...this._config, options };
    this._config = updated;
    this._fireConfigChanged(updated);
  }

  _updateServiceData(index, raw) {
    try {
      const parsed = JSON.parse(raw);
      this._updateOption(index, "service_data", parsed);
    } catch (_) {
      /* ignore invalid JSON while typing */
    }
  }

  _fireConfigChanged(config) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("materia-button-group-editor", MateriaButtonGroupEditor);

/* ── Card ── */

class MateriaButtonGroup extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-button-group-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      size: "m",
      options: [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
      ],
    };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      background: none;
      box-shadow: none;
      border: none;
    }

    .group {
      display: flex;
      gap: 2px;
      width: 100%;
      border-radius: 999px;
      overflow: hidden;
      background: var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.05));
      box-sizing: border-box;
    }

    button {
      flex: 1;
      border: none;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
      transition: border-radius 0.2s ease, background-color 0.2s ease, color 0.2s ease;
      font-family: inherit;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    button::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    button:hover::before {
      opacity: 0.08;
    }

    button:active::before {
      opacity: 0.12;
    }

    button.inactive {
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.options || !Array.isArray(config.options) || config.options.length === 0) {
      throw new Error("At least one option is required");
    }
    this.config = {
      size: "m",
      ...config,
    };
  }

  get _activeValue() {
    const entity = this.hass?.states[this.config.entity];
    if (this.config.attribute) return String(entity?.attributes?.[this.config.attribute] ?? "");
    return entity?.state ?? "";
  }

  _getActiveColors() {
    /* Explicit overrides first */
    if (this.config.color_active && this.config.color_on_active) {
      return { active: this.config.color_active, onActive: this.config.color_on_active };
    }
    /* Preset */
    if (this.config.preset && PRESETS[this.config.preset]) {
      return PRESETS[this.config.preset];
    }
    /* Default: primary */
    return PRESETS.primary;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const sizeKey = this.config.size || "m";
    const { height, innerCorner } = SIZES[sizeKey] || SIZES.m;
    const outerR = height / 2;
    const activeValue = this._activeValue;
    const colors = this._getActiveColors();
    const options = this.config.options;

    return html`
      <ha-card>
        <div class="group" style="height: ${height}px;">
          ${options.map((opt, i) => {
            const isActive = String(opt.value) === activeValue;
            const isFirst = i === 0;
            const isLast = i === options.length - 1;

            const ir = isActive ? `${outerR}px` : `${innerCorner}px`;
            const or = `${outerR}px`;

            let radius;
            if (options.length === 1) {
              radius = or;
            } else if (isFirst) {
              radius = `${or} ${ir} ${ir} ${or}`;
            } else if (isLast) {
              radius = `${ir} ${or} ${or} ${ir}`;
            } else {
              radius = ir;
            }

            const bg = isActive ? colors.active : undefined;
            const fg = isActive ? colors.onActive : undefined;

            return html`
              <button
                class=${isActive ? "active" : "inactive"}
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
    if (opt.service) {
      this._handleAction({
        action: "call-service",
        service: opt.service,
        service_data: opt.service_data || {},
      });
    } else if (this.config.entity) {
      this._fireMoreInfo(this.config.entity);
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
  description: "M3 connected button group with presets and sizes.",
});
