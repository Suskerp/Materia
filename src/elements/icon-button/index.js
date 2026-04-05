import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

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

  static styles = styles;

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
    if (this.config.entity) return { action: "toggle" };
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

  _resolveTapAction() {
    if (this.config.tap_action_map && this.config.entity) {
      const state = this.hass?.states[this.config.entity]?.state;
      const mapped = this.config.tap_action_map[state] ?? this.config.tap_action_map.default;
      if (mapped) return mapped;
    }
    return this.config.tap_action || this._defaultTapAction();
  }

  _handleTap() {
    this._handleAction(this._resolveTapAction());
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
