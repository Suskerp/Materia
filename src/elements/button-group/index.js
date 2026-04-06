import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles, PRESETS, SIZES } from "./styles.js";
import "./editor.js";

class MateriaButtonGroup extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
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

  static styles = [unavailableStyles, styles];

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
    if (this.config.color_active && this.config.color_on_active) {
      return { active: this.config.color_active, onActive: this.config.color_on_active };
    }
    if (this.config.preset && PRESETS[this.config.preset]) {
      return PRESETS[this.config.preset];
    }
    return PRESETS.primary;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.config.entity ? this.hass.states[this.config.entity] : undefined;
    const unavailable = this.config.entity ? this._isUnavailable(stateObj) : false;

    const sizeKey = this.config.size || "m";
    const { height, innerCorner } = SIZES[sizeKey] || SIZES.m;
    const outerR = height / 2;
    const activeValue = this._activeValue;
    const colors = this._getActiveColors();
    const options = this.config.options;
    const variant = this.config.variant || "filled";

    return html`
      <ha-card>
        <div class="group ${unavailable ? 'unavailable' : ''}" style="height: ${height}px;">
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
    if (opt.tap_action) {
      this._handleAction(opt.tap_action);
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
  preview: true,
});
