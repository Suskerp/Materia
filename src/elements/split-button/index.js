import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/** M3 size scale: container height, inner corner radius, font, icon, leading padding. */
const SIZES = {
  xs: { h: 32, inner: 4, font: 14, icon: 20, pad: 12 },
  s: { h: 40, inner: 8, font: 14, icon: 20, pad: 16 },
  m: { h: 56, inner: 8, font: 16, icon: 24, pad: 24 },
  l: { h: 96, inner: 16, font: 24, icon: 32, pad: 48 },
  xl: { h: 136, inner: 20, font: 32, icon: 40, pad: 64 },
};

class MateriaSplitButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
    _resolvedIcon: { state: true },
    _resolvedLabel: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-split-button-editor");
  }

  static getStubConfig() {
    return {
      label: "Action",
      icon: "mdi:play",
      variant: "tonal",
      size: "s",
      options: [
        { label: "Option 1", icon: "mdi:numeric-1-circle-outline" },
        { label: "Option 2", icon: "mdi:numeric-2-circle-outline" },
      ],
    };
  }

  setConfig(config) {
    this.config = { variant: "tonal", size: "s", ...config };
    this._open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._outsideClick = (e) => {
      if (!this._open) return;
      if ((e.composedPath?.() || []).includes(this)) return;
      this._open = false;
    };
    document.addEventListener("click", this._outsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._outsideClick);
  }

  updated(changed) {
    if (changed.has("hass") && this.hass) {
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("label", "_resolvedLabel");
    }
  }

  _leadingTap() {
    this._handleAction(this.config.tap_action || { action: "more-info" });
  }

  _toggle(e) {
    e.stopPropagation();
    this._open = !this._open;
  }

  _selectOption(opt, e) {
    e.stopPropagation();
    this._open = false;
    if (opt.tap_action) this._handleAction(opt.tap_action);
  }

  render() {
    if (!this.config) return html``;
    const sz = SIZES[this.config.size] || SIZES.s;
    const variant = this.config.variant || "tonal";
    const icon = this._isTemplate(this.config.icon) ? this._resolvedIcon : this.config.icon;
    const label = this._isTemplate(this.config.label) ? this._resolvedLabel : this.config.label;
    const options = this.config.options || [];

    const vars =
      `--sb-h:${sz.h}px;--sb-inner:${sz.inner}px;--sb-font:${sz.font}px;` +
      `--sb-icon:${sz.icon}px;--sb-pad:${sz.pad}px;` +
      `${this.config.color ? `--sb-bg:${this.config.color};` : ""}` +
      `${this.config.color_on ? `--sb-fg:${this.config.color_on};` : ""}`;

    return html`
      <div class="wrap" style=${vars}>
        <div class="split ${variant}">
          <button class="leading" @click=${this._leadingTap} aria-label=${label || "action"}>
            ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : ""}
            ${label ? html`<span class="label">${label}</span>` : ""}
          </button>
          <button
            class="trailing ${this._open ? "open" : ""}"
            @click=${this._toggle}
            aria-haspopup="menu"
            aria-expanded=${this._open ? "true" : "false"}
            aria-label="more actions"
          >
            <ha-icon class="chev" icon="m3of:arrow-drop-down"></ha-icon>
          </button>
        </div>

        <div class="menu ${this._open ? "open" : ""}" role="menu">
          ${options.map(
            (opt) => html`
              <div class="menu-item" role="menuitem" @click=${(e) => this._selectOption(opt, e)}>
                ${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : ""}
                <span class="item-text">${opt.label || ""}</span>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-split-button", MateriaSplitButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-split-button",
  name: "Materia Split Button",
  description: "M3 Expressive split button — a main action plus a menu of related actions.",
  preview: true,
});
