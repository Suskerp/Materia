import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { injectFonts } from "../styles/shared.js";
import { computeLabel } from "../utils/editor-helpers.js";

/* ───────────────────────────────────────────────────────
 *  materia-icon-button
 *  M3 icon button with variants (standard, outlined,
 *  filled, filled-tonal) and optional state-based icon map.
 *  Replaces circle-action.
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */

class MateriaIconButtonEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
    .yaml-label {
      font-size: 13px;
      font-weight: 500;
      margin: 8px 0 4px;
      color: var(--secondary-text-color);
    }
    textarea {
      width: 100%;
      min-height: 80px;
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

  get _schema() {
    return [
      { name: "icon", required: true, selector: { icon: {} } },
      {
        name: "variant",
        selector: {
          select: {
            options: [
              { value: "standard", label: "Standard" },
              { value: "outlined", label: "Outlined" },
              { value: "filled", label: "Filled" },
              { value: "filled-tonal", label: "Filled Tonal" },
            ],
          },
        },
      },
      {
        name: "size",
        selector: {
          select: {
            options: [
              { value: "default", label: "Default (48px)" },
              { value: "large", label: "Large (56px)" },
            ],
          },
        },
      },
      { name: "entity", selector: { entity: {} } },
    ];
  }

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

      <div class="yaml-label">Icon map (JSON, state &rarr; icon)</div>
      <textarea
        .value=${this._config.icon_map ? JSON.stringify(this._config.icon_map, null, 2) : ""}
        @change=${this._iconMapChanged}
      ></textarea>

      <div class="yaml-label">Tap action (JSON)</div>
      <textarea
        .value=${this._config.tap_action ? JSON.stringify(this._config.tap_action, null, 2) : ""}
        @change=${this._tapActionChanged}
      ></textarea>
    `;
  }

  _valueChanged(ev) {
    const updated = {
      ...this._config,
      ...ev.detail.value,
      icon_map: this._config.icon_map,
      tap_action: this._config.tap_action,
    };
    this._fireConfig(updated);
  }

  _iconMapChanged(ev) {
    const raw = ev.target.value.trim();
    if (!raw) {
      const { icon_map: _, ...rest } = this._config;
      this._fireConfig(rest);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this._fireConfig({ ...this._config, icon_map: parsed });
    } catch (_) { /* ignore parse errors */ }
  }

  _tapActionChanged(ev) {
    const raw = ev.target.value.trim();
    if (!raw) {
      const { tap_action: _, ...rest } = this._config;
      this._fireConfig(rest);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this._fireConfig({ ...this._config, tap_action: parsed });
    } catch (_) { /* ignore parse errors */ }
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
customElements.define("materia-icon-button-editor", MateriaIconButtonEditor);

/* ── Card ── */

class MateriaIconButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-icon-button-editor");
  }

  static getStubConfig() {
    return { icon: "mdi:play", variant: "filled", size: "default" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      padding: 0;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    ha-icon {
      --mdc-icon-size: 24px;
    }

    /* ── Sizes ── */
    ha-card.size-default { width: 48px; height: 48px; }
    ha-card.size-large   { width: 56px; height: 56px; }

    /* ── Variants ── */
    ha-card.standard {
      background: transparent;
      box-shadow: none;
      border: none;
      color: var(--primary-text-color);
    }

    ha-card.outlined {
      background: transparent;
      box-shadow: none;
      border: 1px solid var(--md-sys-color-outline);
      color: var(--primary-text-color);
    }

    ha-card.filled {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      box-shadow: none;
      border: none;
    }

    ha-card.filled-tonal {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      box-shadow: none;
      border: none;
    }

    /* ── M3 state layer ── */
    ha-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    ha-card:hover::before  { opacity: 0.08; }
    ha-card:active::before { opacity: 0.12; }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.icon) throw new Error("icon is required");
    this.config = {
      variant: "filled",
      size: "default",
      ...config,
    };
  }

  _resolveIcon() {
    if (!this.config.icon_map || !this.config.entity) return this.config.icon;
    const state = this.hass?.states[this.config.entity]?.state;
    return this.config.icon_map[state] ?? this.config.icon_map.default ?? this.config.icon;
  }

  _defaultTapAction() {
    if (this.config.entity) {
      return { action: "toggle" };
    }
    return { action: "none" };
  }

  render() {
    if (!this.config) return html``;

    const variant = this.config.variant || "filled";
    const size = this.config.size === "large" ? "large" : "default";
    const icon = this._resolveIcon();

    return html`
      <ha-card
        class="${variant} size-${size}"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </ha-card>
    `;
  }

  _handleTap() {
    const action = this.config.tap_action || this._defaultTapAction();
    this._handleAction(action);
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-icon-button", MateriaIconButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-icon-button",
  name: "Materia Icon Button",
  description: "M3 icon button with variants",
});
