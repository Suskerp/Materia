import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { t } from "../../utils/i18n.js";
import {
  adjustedHumidity,
  humidifierAction,
  humidifierModes,
  humidifierRange,
  humidifierTarget,
} from "./model.js";
import { styles } from "./styles.js";
import "./editor.js";

const KNOWN_MODE_KEYS = new Set(["auto", "away", "baby", "boost", "comfort", "eco", "home", "laundry", "normal", "sleep"]);

class MateriaHumidifier extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _optimisticHumidity: { state: true },
    _optimisticMode: { state: true },
    _optimisticPower: { state: true },
    _resolvedName: { state: true },
  };

  static styles = [hostStyles, unavailableStyles, motionTokens, styles];

  static getConfigElement() {
    return document.createElement("materia-humidifier-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((id) => id.startsWith("humidifier.")) || "humidifier.example";
    return { entity, show_modes: true };
  }

  setConfig(config) {
    if (!config?.entity) throw new Error("entity is required");
    this.config = { show_modes: true, ...config };
  }

  getCardSize() {
    return this._visibleModes.length > 1 ? 4 : 3;
  }

  get _entity() {
    return this.hass?.states?.[this.config.entity];
  }

  get _unavailable() {
    return !this._entity || ["unavailable", "unknown"].includes(this._entity.state);
  }

  get _isOn() {
    if (this._optimisticPower != null) return this._optimisticPower;
    return !!this._entity && this._entity.state !== "off" && !this._unavailable;
  }

  get _target() {
    return this._optimisticHumidity ?? humidifierTarget(this._entity?.attributes);
  }

  get _current() {
    const externalState = this.config.humidity_entity
      ? this.hass?.states?.[this.config.humidity_entity]?.state
      : undefined;
    const external = externalState == null || externalState === "" ? undefined : Number(externalState);
    if (Number.isFinite(external)) return external;
    const currentValue = this._entity?.attributes?.current_humidity;
    const current = currentValue == null || currentValue === "" ? undefined : Number(currentValue);
    return Number.isFinite(current) ? current : undefined;
  }

  get _range() {
    return humidifierRange(this._entity?.attributes, this.config.step);
  }

  get _mode() {
    return this._optimisticMode ?? this._entity?.attributes?.mode;
  }

  get _visibleModes() {
    return this.config.show_modes === false ? [] : humidifierModes(this._entity?.attributes);
  }

  get _action() {
    return humidifierAction(this._entity);
  }

  get _name() {
    if (this._isTemplate(this.config.name)) return this._resolvedName || t("humidifier_name", this.hass);
    return this.config.name || this._entity?.attributes?.friendly_name || t("humidifier_name", this.hass);
  }

  _icon() {
    if (this._entity?.attributes?.device_class === "dehumidifier" || this._action === "drying") return "mdi:water-minus";
    if (this._action === "humidifying") return "mdi:air-humidifier";
    return "mdi:water-percent";
  }

  _theme() {
    if (this._action === "drying") {
      return {
        background: "var(--md-sys-cust-color-climate-cool-container)",
        foreground: "var(--md-sys-cust-color-on-climate-cool)",
        control: "var(--md-sys-cust-color-climate-cool)",
      };
    }
    if (this._isOn) {
      return {
        background: "var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",
        foreground: "var(--md-sys-cust-color-on-climate-cool, #205f82)",
        control: "var(--md-sys-cust-color-climate-cool-accent, #205f82)",
      };
    }
    return {
      background: "var(--md-sys-color-surface-container-highest, var(--ha-card-background))",
      foreground: "var(--md-sys-color-on-surface)",
      control: "var(--md-sys-color-secondary-container)",
    };
  }

  _modeLabel(mode) {
    const normalized = String(mode).trim().toLowerCase().replaceAll(" ", "_");
    if (KNOWN_MODE_KEYS.has(normalized)) return t(`humidifier_mode_${normalized}`, this.hass);
    return String(mode).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  _actionLabel() {
    const key = `humidifier_action_${this._action}`;
    const translated = t(key, this.hass);
    return translated === key ? this._modeLabel(this._action) : translated;
  }

  _statusText() {
    const parts = [];
    if (this._current != null) parts.push(t("humidifier_current_value", this.hass, { value: Math.round(this._current) }));
    parts.push(this._actionLabel());
    if (this._mode) parts.push(this._modeLabel(this._mode));
    return parts.join(" · ");
  }

  async _adjust(delta) {
    const next = adjustedHumidity(this._target, delta, this._range);
    if (next == null || next === this._target) return;
    const previous = this._optimisticHumidity;
    this._optimisticHumidity = next;
    const result = await this._callService("humidifier", "set_humidity", {
      entity_id: this.config.entity,
      humidity: next,
    });
    if (!result.ok) this._optimisticHumidity = previous ?? null;
    this._armOptimisticTimer("humidity");
  }

  async _togglePower() {
    if (this._unavailable) return;
    const previous = this._optimisticPower;
    const next = !this._isOn;
    this._optimisticPower = next;
    const result = await this._callService("humidifier", next ? "turn_on" : "turn_off", {
      entity_id: this.config.entity,
    });
    if (!result.ok) this._optimisticPower = previous ?? null;
    this._armOptimisticTimer("power");
  }

  async _setMode(mode) {
    if (!this._isOn || this._unavailable || mode === this._mode) return;
    const previous = this._optimisticMode;
    this._optimisticMode = mode;
    const result = await this._callService("humidifier", "set_mode", {
      entity_id: this.config.entity,
      mode,
    });
    if (!result.ok) this._optimisticMode = previous ?? null;
    this._armOptimisticTimer("mode");
  }

  _armOptimisticTimer(kind) {
    const property = kind === "humidity" ? "_optimisticHumidity" : kind === "mode" ? "_optimisticMode" : "_optimisticPower";
    const timer = `_${kind}Timer`;
    clearTimeout(this[timer]);
    this[timer] = setTimeout(() => { this[property] = null; }, 10000);
  }

  updated(changed) {
    if (changed.has("hass") && this._isTemplate(this.config?.name)) this._resolveField("name", "_resolvedName");
    if (!changed.has("hass") || !this._entity) return;

    const actualTarget = humidifierTarget(this._entity.attributes);
    if (this._optimisticHumidity != null && actualTarget === this._optimisticHumidity) {
      this._optimisticHumidity = null;
      clearTimeout(this._humidityTimer);
    }
    if (this._optimisticMode != null && this._entity.attributes?.mode === this._optimisticMode) {
      this._optimisticMode = null;
      clearTimeout(this._modeTimer);
    }
    if (this._optimisticPower != null) {
      const actualOn = this._entity.state !== "off" && !this._unavailable;
      if (actualOn === this._optimisticPower) {
        this._optimisticPower = null;
        clearTimeout(this._powerTimer);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._humidityTimer);
    clearTimeout(this._modeTimer);
    clearTimeout(this._powerTimer);
  }

  _stop(event) {
    event.stopPropagation();
  }

  render() {
    if (!this.hass || !this.config) return nothing;
    const theme = this._theme();
    const unavailable = this._unavailable;
    const target = unavailable
      ? t("unavailable", this.hass)
      : this._target != null
        ? html`${this._target}<span class="unit">%</span>`
        : "—";
    const powerLabel = this._isOn ? t("humidifier_turn_off", this.hass) : t("humidifier_turn_on", this.hass);

    return html`
      <ha-card
        class=${unavailable ? "unavailable" : ""}
        style="
          background:${theme.background}; color:${theme.foreground};
          --control-color:${theme.control}; --control-on-color:${theme.foreground};
        "
        @click=${() => this._handleAction(this.config.tap_action ?? { action: "more-info" })}
      >
        <div class="header">
          <ha-icon .icon=${this._icon()}></ha-icon>
          <span class="name">${this._name}</span>
          <button class="power ${this._isOn ? "on" : ""}" aria-label=${powerLabel} aria-pressed=${String(this._isOn)} @click=${(event) => { this._stop(event); this._togglePower(); }}>
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <div class="setpoint">
          <button class="adjust" ?disabled=${!this._isOn || unavailable || this._target == null} aria-label=${t("humidifier_decrease", this.hass)} @click=${(event) => { this._stop(event); this._adjust(-this._range.step); }}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target ${typeof target === "string" && target !== "—" ? "word" : ""}">${target}</div>
          <button class="adjust" ?disabled=${!this._isOn || unavailable || this._target == null} aria-label=${t("humidifier_increase", this.hass)} @click=${(event) => { this._stop(event); this._adjust(this._range.step); }}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <div class="status">${unavailable ? t("unavailable", this.hass) : this._statusText()}</div>

        ${this._visibleModes.length > 1 ? html`
          <div class="modes" role="group" aria-label=${t("humidifier_modes", this.hass)} @click=${this._stop}>
            ${this._visibleModes.map((mode) => html`
              <button
                class="mode"
                aria-pressed=${String(mode === this._mode)}
                ?disabled=${!this._isOn || unavailable}
                @click=${() => this._setMode(mode)}
              >${this._modeLabel(mode)}</button>
            `)}
          </div>
        ` : nothing}
      </ha-card>
    `;
  }
}

customElements.define("materia-humidifier", MateriaHumidifier);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-humidifier",
  name: "Materia Humidifier",
  description: "Humidifier and dehumidifier control with target humidity, power, and device modes.",
  preview: true,
});
