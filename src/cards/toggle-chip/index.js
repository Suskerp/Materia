import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { chipVariant, chipIsOn, chipLabel } from "./model.js";
import { styles } from "./styles.js";
import { loadEditors } from "../../utils/load-editors.js";

/**
 * materia-toggle-chip — an on/off entity as a small header control: the
 * outlined chip (icon + state text, rounding to a pill when on), or with
 * `variant: switch` a label and an M3 switch. Tap toggles the entity.
 *
 * Both looks are the volume panel's zone-link controls made generic: same
 * DOM, classes and styles. Nothing renders while the entity is missing.
 */
class MateriaToggleChip extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

  static async getConfigElement() {
    await loadEditors();
    return document.createElement("materia-toggle-chip-editor");
  }

  static getStubConfig(hass) {
    const entity =
      Object.keys(hass?.states || {}).find((e) => e.startsWith("input_boolean.") || e.startsWith("switch.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Toggle Chip: entity is required");
    this.config = { ...config };
  }

  willUpdate(changed) {
    super.willUpdate?.(changed);
    if (!this.config || !this.hass) return;
    for (const key of ["label_on", "label_off", "name"]) this._resolveTemplateValue(key, this.config[key]);
  }

  _toggle() {
    this._handleAction({ action: "toggle", entity: this.config.entity });
  }

  get _name() {
    const v = this.config.name;
    if (this._isTemplate(v)) return this._tplResults?.name ?? "";
    return v ?? this.hass?.states[this.config.entity]?.attributes?.friendly_name ?? this.config.entity;
  }

  render() {
    const st = this.hass?.states[this.config?.entity];
    if (!st) return nothing;
    const on = chipIsOn(st);
    const name = this._name;
    const icon = this.config.icon ?? st.attributes?.icon;
    if (chipVariant(this.config) === "switch") {
      return html`<button class="linklabel" @click=${this._toggle}>${name}</button>
        <button
          class="switch ${on ? "on" : ""}"
          role="switch"
          aria-checked=${on ? "true" : "false"}
          aria-label=${name}
          @click=${this._toggle}
        ><i><ha-icon icon=${icon || "mdi:check"}></ha-icon></i></button>`;
    }
    return html`<button
      class="linkchip ${on ? "on" : ""}"
      role="switch"
      aria-checked=${on ? "true" : "false"}
      aria-label=${name}
      @click=${this._toggle}
    >${icon ? html`<ha-icon icon=${icon}></ha-icon>` : nothing}<span>${chipLabel(this.config, on, this._tplResults, name)}</span></button>`;
  }

  getGridOptions() {
    return { columns: 3, rows: 1, min_columns: 2 };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-toggle-chip", MateriaToggleChip);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-toggle-chip",
  name: "Materia Toggle Chip",
  description: "An on/off entity as a chip (icon + state text) or a labelled switch; tap toggles it.",
  preview: true,
});
