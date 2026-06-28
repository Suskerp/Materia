import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import "../button/index.js";
import { styles } from "./styles.js";
import "./editor.js";

/** Container heights / inner-corner / trailing-icon per size — matched to materia-button. */
const HEIGHTS = { xs: 32, s: 40, m: 56, l: 96, xl: 136, default: 48, large: 56 };
const INNER = { xs: 12, s: 12, m: 16, l: 28, xl: 28, default: 14, large: 16 };
const TICON = { xs: 20, s: 20, m: 24, l: 32, xl: 40, default: 24, large: 24 };

class MateriaSplitButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
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
    this.toggleAttribute("wide", !!config.wide);
  }

  updated(changed) {
    // icon-row sets `.config` directly (bypassing setConfig), so reflect `wide`
    // on every config change too.
    if (changed.has("config")) this.toggleAttribute("wide", !!this.config?.wide);
    if (changed.has("_open") && this._open) {
      requestAnimationFrame(() => this._clampMenu());
    }
  }

  /** Flip the menu's horizontal anchor if it would spill off the viewport. */
  _clampMenu() {
    const menu = this.shadowRoot?.querySelector(".menu");
    if (!menu || !this._open) return;
    menu.classList.remove("clamp-left", "clamp-right");
    const rect = menu.getBoundingClientRect();
    const m = 8;
    if (rect.left < m) menu.classList.add("clamp-left");
    else if (rect.right > window.innerWidth - m) menu.classList.add("clamp-right");
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
    const variant = this.config.variant || "tonal";
    const size = this.config.size || "s";
    const h = HEIGHTS[size] || 40;
    const inner = INNER[size] ?? 12;
    const ticon = TICON[size] ?? 20;
    const options = this.config.options || [];

    // The leading button is a full materia-button — it inherits ALL button
    // behaviour (templated icon/label, tap_action_map, active_state,
    // morph_on_active, disabled, …). `connected` squares its inner edge.
    const { options: _o, type: _t, ...leading } = this.config;
    const leadingConfig = { ...leading, connected: "leading" };

    const vars =
      `--sb-h:${h}px;--sb-inner:${inner}px;--sb-ticon:${ticon}px;` +
      `${this.config.color ? `--sb-bg:${this.config.color};` : ""}` +
      `${this.config.color_on ? `--sb-fg:${this.config.color_on};` : ""}`;

    return html`
      <div class="wrap" style=${vars}>
        <div class="split ${variant}">
          <materia-button class="leading" .hass=${this.hass} .config=${leadingConfig}></materia-button>
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

        <div class="menu dir-${this.config.menu_position || "bottom-right"} ${this._open ? "open" : ""}" role="menu">
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
