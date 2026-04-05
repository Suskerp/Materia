import { LitElement, html, css, nothing } from "lit";
import { injectFonts } from "../styles/shared.js";
import { computeLabel } from "../utils/editor-helpers.js";

/* ───────────────────────────────────────────────────────
 *  materia-segmented-button
 *  M3 segmented button group with presets.
 *  Replaces pill-toggle, select-chip, and inline chips.
 * ─────────────────────────────────────────────────────── */

const PRESETS = {
  "primary":       { active: "var(--md-sys-color-primary)",               onActive: "var(--md-sys-color-on-primary)" },
  "secondary":     { active: "var(--md-sys-color-secondary)",             onActive: "var(--md-sys-color-on-secondary)" },
  "climate-heat":  { active: "var(--md-sys-cust-color-climate-heat)",     onActive: "var(--md-sys-cust-color-on-climate-heat)" },
  "climate-cool":  { active: "var(--md-sys-cust-color-climate-cool)",     onActive: "var(--md-sys-cust-color-on-climate-cool)" },
  "climate-auto":  { active: "var(--md-sys-cust-color-climate-auto)",     onActive: "var(--md-sys-cust-color-on-climate-auto)" },
  "light":         { active: "var(--md-sys-cust-color-light)",            onActive: "var(--md-sys-cust-color-on-light)" },
  "device":        { active: "var(--md-sys-cust-color-device)",           onActive: "var(--md-sys-cust-color-on-device)" },
};

const HEIGHTS = { compact: "40px", default: "48px", large: "56px" };

/* ── Visual Config Editor ── */

class MateriaSegmentedButtonEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
    .option-card {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
    }
    .option-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 14px;
    }
    .remove-btn {
      color: var(--error-color, #b00020);
      cursor: pointer;
      background: none;
      border: none;
      font-size: 13px;
      font-weight: 600;
    }
    .add-btn {
      margin-top: 8px;
      cursor: pointer;
      background: var(--primary-color, #6200ee);
      color: var(--text-primary-color, #fff);
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
    }
    .service-data-label {
      font-size: 13px;
      font-weight: 500;
      margin: 4px 0;
      color: var(--secondary-text-color);
    }
    textarea {
      width: 100%;
      min-height: 60px;
      box-sizing: border-box;
      font-family: monospace;
      font-size: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 6px;
      resize: vertical;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
    }
  `;

  setConfig(config) {
    this._config = config;
  }

  get _topSchema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "attribute", selector: { text: {} } },
      {
        name: "preset",
        selector: {
          select: {
            options: [
              { value: "", label: "None" },
              ...Object.keys(PRESETS).map((k) => ({ value: k, label: k })),
            ],
          },
        },
      },
      {
        name: "height",
        selector: {
          select: {
            options: [
              { value: "compact", label: "Compact (40px)" },
              { value: "default", label: "Default (48px)" },
              { value: "large", label: "Large (56px)" },
            ],
          },
        },
      },
      { name: "color_active", selector: { text: {} } },
      { name: "color_on_active", selector: { text: {} } },
    ];
  }

  _optionSchema() {
    return [
      { name: "label", required: true, selector: { text: {} } },
      { name: "value", required: true, selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "service", selector: { text: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const options = this._config.options || [];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._topSchema}
        .computeLabel=${computeLabel}
        @value-changed=${this._topChanged}
      ></ha-form>

      <h3 style="margin: 16px 0 8px;">Options</h3>

      ${options.map(
        (opt, idx) => html`
          <div class="option-card">
            <div class="option-header">
              <span>Option ${idx + 1}</span>
              <button class="remove-btn" @click=${() => this._removeOption(idx)}>
                Remove
              </button>
            </div>
            <ha-form
              .hass=${this.hass}
              .data=${opt}
              .schema=${this._optionSchema()}
              .computeLabel=${computeLabel}
              @value-changed=${(ev) => this._optionChanged(ev, idx)}
            ></ha-form>
            <div class="service-data-label">Service data (YAML/JSON)</div>
            <textarea
              .value=${opt.service_data ? JSON.stringify(opt.service_data, null, 2) : ""}
              @change=${(ev) => this._serviceDataChanged(ev, idx)}
            ></textarea>
          </div>
        `
      )}

      <button class="add-btn" @click=${this._addOption}>Add option</button>
    `;
  }

  _topChanged(ev) {
    const updated = { ...this._config, ...ev.detail.value, options: this._config.options };
    this._fireConfig(updated);
  }

  _optionChanged(ev, idx) {
    const options = [...(this._config.options || [])];
    options[idx] = { ...options[idx], ...ev.detail.value };
    this._fireConfig({ ...this._config, options });
  }

  _serviceDataChanged(ev, idx) {
    const raw = ev.target.value.trim();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const options = [...(this._config.options || [])];
      options[idx] = { ...options[idx], service_data: parsed };
      this._fireConfig({ ...this._config, options });
    } catch (_) {
      /* ignore parse errors while typing */
    }
  }

  _addOption() {
    const options = [...(this._config.options || []), { label: "", value: "", service: "" }];
    this._fireConfig({ ...this._config, options });
  }

  _removeOption(idx) {
    const options = [...(this._config.options || [])];
    options.splice(idx, 1);
    this._fireConfig({ ...this._config, options });
  }

  _fireConfig(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-segmented-button-editor", MateriaSegmentedButtonEditor);

/* ── Card ── */

class MateriaSegmentedButton extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-segmented-button-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      height: "default",
      options: [
        { label: "Option 1", value: "1", service: "" },
        { label: "Option 2", value: "2", service: "" },
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
      border-radius: 0;
      padding: 0;
      margin: 0;
      overflow: visible;
    }

    .segments {
      display: flex;
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--md-sys-color-outline, var(--divider-color, rgba(0,0,0,0.12)));
    }

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: none;
      border-right: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: 0 16px;
      box-sizing: border-box;
      transition: background-color 0.25s ease, color 0.25s ease;
      -webkit-tap-highlight-color: transparent;
      position: relative;
      overflow: hidden;
    }

    button.divider {
      border-right: 1px solid var(--md-sys-color-outline-variant, var(--divider-color, rgba(0,0,0,0.12)));
    }

    /* M3 state layer */
    button::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    button:hover::before { opacity: 0.08; }
    button:active::before { opacity: 0.12; }

    ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.options || config.options.length < 1)
      throw new Error("at least one option is required");
    this.config = { height: "default", ...config };
  }

  get _activeValue() {
    const entity = this.hass?.states[this.config.entity];
    if (this.config.attribute) {
      return String(entity?.attributes?.[this.config.attribute] ?? "");
    }
    return entity?.state ?? "";
  }

  _colors() {
    const preset = this.config.preset && PRESETS[this.config.preset];
    const active = this.config.color_active || preset?.active || "var(--md-sys-color-secondary-container)";
    const onActive = this.config.color_on_active || preset?.onActive || "var(--md-sys-color-on-secondary-container)";
    return { active, onActive };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const options = this.config.options;
    const activeVal = this._activeValue;
    const h = HEIGHTS[this.config.height] || HEIGHTS.default;
    const { active: colorActive, onActive: colorOnActive } = this._colors();

    return html`
      <ha-card>
        <div class="segments">
          ${options.map((opt, idx) => {
            const isActive = String(opt.value) === activeVal;
            const nextActive = idx < options.length - 1 && String(options[idx + 1].value) === activeVal;
            const showDivider = !isActive && !nextActive && idx < options.length - 1;
            const bg = isActive ? colorActive : "var(--md-sys-color-surface, var(--ha-card-background, var(--card-background-color)))";
            const fg = isActive ? colorOnActive : "var(--md-sys-color-on-surface, var(--primary-text-color))";

            return html`
              <button
                class="${showDivider ? "divider" : ""}"
                style="height:${h}; background:${bg}; color:${fg};"
                @click=${() => this._segmentTap(opt)}
              >
                ${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : nothing}
                ${opt.label}
              </button>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  _segmentTap(option) {
    if (!option.service) return;
    const [domain, action] = option.service.split(".", 2);
    if (domain && action) {
      this.hass.callService(domain, action, option.service_data || {});
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-segmented-button", MateriaSegmentedButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-segmented-button",
  name: "Materia Segmented Button",
  description: "M3 segmented button group with presets",
});
