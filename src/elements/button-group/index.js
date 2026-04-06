import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles, PRESETS, SIZES } from "./styles.js";
import "./editor.js";

class MateriaButtonGroup extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _optimisticValue: { state: true },
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
    if (this._optimisticValue != null) return this._optimisticValue;
    const entity = this.hass?.states[this.config.entity];
    if (this.config.attribute) return String(entity?.attributes?.[this.config.attribute] ?? "");
    return entity?.state ?? "";
  }

  _isOptionActive(opt) {
    if (this.config.multi_select) {
      const stateStr = this._activeValue;
      const values = stateStr.split(",").map(v => v.trim()).filter(Boolean);
      return values.includes(String(opt.value));
    }
    return String(opt.value) === this._activeValue;
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
    const unavailable = stateObj ? (stateObj.state === "unavailable" || stateObj.state === "unknown") : false;

    const sizeKey = this.config.size || "m";
    const { height, innerCorner } = SIZES[sizeKey] || SIZES.m;
    const outerR = height / 2;
    const activeValue = this._activeValue;
    const colors = this._getActiveColors();
    const options = this._resolvedOptions;
    const variant = this.config.variant || "filled";
    if (!options.length) return html``;

    const multiSelect = this.config.multi_select;
    const columns = this.config.columns || 0;

    return html`
      <ha-card>
        <div class="group ${unavailable ? 'unavailable' : ''} ${multiSelect ? 'multi' : ''}"
          style="${!multiSelect ? `height: ${height}px;` : `--btn-height: ${height}px;`} ${columns ? `--btn-columns: ${columns};` : ''}">
          ${options.map((opt, i) => {
            const isActive = this._isOptionActive(opt);
            const isFirst = i === 0;
            const isLast = i === options.length - 1;

            let radius;
            if (multiSelect) {
              radius = isActive ? `${innerCorner}px` : `${outerR}px`;
            } else {
              const ir = isActive ? `${outerR}px` : `${innerCorner}px`;
              const or = `${outerR}px`;
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
    if (!this.config.multi_select) {
      this._optimisticValue = String(opt.value);
      clearTimeout(this._optimisticTimer);
      this._optimisticTimer = setTimeout(() => { this._optimisticValue = null; }, 10000);
    }

    if (opt.tap_action) {
      this._handleAction(opt.tap_action);
    } else if (this.config.entity) {
      this._fireMoreInfo(this.config.entity);
    }
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._optimisticValue != null) {
      const entity = this.hass?.states[this.config.entity];
      const actual = this.config.attribute
        ? String(entity?.attributes?.[this.config.attribute] ?? "")
        : entity?.state ?? "";
      if (actual === this._optimisticValue) {
        this._optimisticValue = null;
        clearTimeout(this._optimisticTimer);
      }
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
