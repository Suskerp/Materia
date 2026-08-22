import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin, disabledConditionStyles } from "../../utils/conditions.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Disclosure container (materia-expander): a materia-switch row that opens.
 *
 * Design 18a — an automation row shows its ONE important control inline (the
 * M3 switch: is this automation on?) and puts everything else behind a door:
 * preset chips, a read-only summary, a link to the detail page. A column of
 * these reads as a list of automations, not a wall of settings, and the header
 * is metrically identical to materia-switch (same stylesheet) so the two mix
 * in one column without a single pixel of drift.
 *
 * `entity` is OPTIONAL — with one, the header wears a switch and its state
 * drives the row's tone; without one it is a plain titled drawer (a section
 * header that folds). name, icon, secondary, color, color_on, switch_color and
 * switch_color_on behave exactly as materia-switch's, secondary and the colors
 * templatable. flat: true drops the chrome for nesting.
 *
 * Tapping the header toggles the door; tapping the switch toggles the entity
 * and stops there (a thumb aiming at the switch must never also open the row).
 *
 * Children are built ONCE and kept as element references, so folding the row
 * shut and open again neither rebuilds a card nor loses its internal state,
 * and hass keeps flowing to them while they are out of the DOM.
 */
class MateriaExpander extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
    _cards: { state: true },
    _resolvedName: { state: true },
    _resolvedSecondary: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedSwitchColor: { state: true },
    _resolvedSwitchColorOn: { state: true },
  };

  static styles = [styles, disabledConditionStyles];

  static getConfigElement() {
    return document.createElement("materia-expander-editor");
  }

  static getStubConfig(hass) {
    const entity =
      Object.keys(hass?.states || {}).find(
        (e) => e.startsWith("automation.") || e.startsWith("switch.") || e.startsWith("input_boolean.")
      ) || "";
    return entity ? { entity, cards: [] } : { name: "Details", cards: [] };
  }

  setConfig(config) {
    if (!config.entity && !config.name) {
      throw new Error("Materia Expander: name is required when there is no entity");
    }
    this.config = config;
    // Initial state is config, not a reset: HA re-runs setConfig on every
    // editor keystroke, and slamming the door on each one would be unusable.
    this._open ??= config.expanded === true;
    const sig = JSON.stringify(config.cards || []);
    if (this.__cardsSig !== sig) {
      this.__cardsSig = sig;
      this._cards = null;
      this._buildCards();
    }
  }

  _cardConfigs() {
    return Array.isArray(this.config?.cards) ? this.config.cards : [];
  }

  async _buildCards() {
    const configs = this._cardConfigs();
    if (!configs.length) return;
    const sig = this.__cardsSig;
    const helpers = await loadCardHelpers();
    const els = await Promise.all(
      configs.map(async (c) => {
        const el = await helpers.createCardElement(c);
        if (this.hass) el.hass = this.hass;
        return el;
      })
    );
    // A later setConfig may have won the race while we awaited.
    if (this.__cardsSig === sig) this._cards = els;
  }

  updated(changed) {
    super.updated?.(changed);
    if (changed.has("hass") && this.hass) {
      // name went through raw while secondary was resolved, so a templated
      // name printed literal Jinja on the dashboard. The inconsistency was the
      // bug, not the template.
      this._resolveField("name", "_resolvedName");
      this._resolveField("secondary", "_resolvedSecondary");
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("switch_color", "_resolvedSwitchColor");
      this._resolveField("switch_color_on", "_resolvedSwitchColorOn");
      // Children are fed even while collapsed, so opening the row never
      // reveals a card showing yesterday's state for a frame.
      if (this._cards) for (const el of this._cards) el.hass = this.hass;
    }
  }

  get _stateObj() {
    return this.config?.entity ? this.hass?.states[this.config.entity] : null;
  }

  get _on() {
    return this._stateObj?.state === "on";
  }

  _toggleOpen() {
    if (!this._cardConfigs().length) return;
    this._open = !this._open;
    this._fireHaptic("light");
  }

  _toggleEntity(ev) {
    // The switch is its own target: toggling must not also work the door.
    ev.stopPropagation();
    this._handleAction(this.config.tap_action || { action: "toggle", entity: this.config.entity });
    this._fireHaptic("light");
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const hasEntity = !!this.config.entity;
    const st = this._stateObj;
    if (hasEntity && !st) {
      return html`<ha-card class="row exp off">
        <div class="head">
          <div class="r-text">
            <span class="r-name">${t("entity_not_found_with_id", this.hass, { entity: this.config.entity })}</span>
          </div>
        </div>
      </ha-card>`;
    }

    const on = hasEntity && this._on;
    // No entity means no off state — a plain drawer stays at full presence
    // instead of borrowing the switch row's dimmed "off" tone.
    const tone = hasEntity ? (on ? "on" : "off") : "on";
    const unavailable = hasEntity && this._isUnavailable(st);
    const name =
      (this._isTemplate(this.config.name) ? this._resolvedName : this.config.name) ||
      st?.attributes.friendly_name ||
      this.config.entity;
    const icon =
      this.config.icon ||
      st?.attributes.icon ||
      (hasEntity ? (on ? "mdi:toggle-switch" : "mdi:toggle-switch-off-outline") : "m3o:tune");
    const secondary = this.config.secondary
      ? this._isTemplate(this.config.secondary)
        ? this._resolvedSecondary
        : this.config.secondary
      : st
        ? (this.hass.formatEntityState?.(st) ?? st.state)
        : "";
    const bg = this._isTemplate(this.config.color) ? (this._resolvedColor || "").trim() : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? (this._resolvedColorOn || "").trim() : this.config.color_on;
    const track = this._isTemplate(this.config.switch_color)
      ? (this._resolvedSwitchColor || "").trim()
      : this.config.switch_color;
    const thumb = this._isTemplate(this.config.switch_color_on)
      ? (this._resolvedSwitchColorOn || "").trim()
      : this.config.switch_color_on;

    const showSwitch = hasEntity && this.config.show_switch !== false;
    const hasBody = this._cardConfigs().length > 0;
    const open = hasBody && this._open;

    return html`
      <ha-card
        class="row exp ${tone} ${open ? "open" : ""} ${bg ? "colored" : ""} ${this.config.flat ? "flat" : ""} ${unavailable ? "unavailable" : ""}"
        style="${bg ? `background:${bg};` : ""}${fg ? `color:${fg};` : ""}"
      >
        <div
          class="head"
          role=${hasBody ? "button" : nothing}
          aria-expanded=${hasBody ? (open ? "true" : "false") : nothing}
          aria-label=${hasBody ? t(open ? "expander_collapse" : "expander_expand", this.hass) : nothing}
          @click=${this._toggleOpen}
        >
          <ha-icon class="r-icon" .icon=${icon}></ha-icon>
          <div class="r-text">
            <span class="r-name">${name}</span>
            ${secondary ? html`<span class="r-sub">${secondary}</span>` : ""}
          </div>
          ${hasBody ? html`<ha-icon class="chev" .icon=${"m3o:expand-more"}></ha-icon>` : nothing}
          ${showSwitch
            ? html`<div
                class="m3-switch ${on ? "on" : ""}"
                style="${track ? `--ms-track:${track};` : ""}${thumb ? `--ms-thumb:${thumb};` : ""}"
                @click=${this._toggleEntity}
              ><i></i></div>`
            : nothing}
        </div>
        ${open && this._cards
          ? html`<div class="body">
              <div class="sep"></div>
              ${this._cards}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return this._open && this._cards ? 1 + this._cards.length : 1;
  }
}

customElements.define("materia-expander", MateriaExpander);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-expander",
  name: "Materia Expander",
  description: "Switch row that opens — the one control that matters stays inline, everything else lives behind the chevron.",
  preview: true,
});
