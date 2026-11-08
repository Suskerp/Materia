import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";
import "../../utils/card-list-editor.js";
import "../../utils/panels-editor.js";

class MateriaPanelHostEditor extends SmartEditorBase {
  _formData() {
    return { mode: "inline", timeout: 30, gap: 16, ...this._config };
  }

  /** Labels follow HA's language, so the language is part of the schema signature. */
  _sectionsSignature() {
    return this.hass?.locale?.language ?? "";
  }

  get _sections() {
    const h = this.hass;
    return [
      {
        title: t("ed_layout", h),
        icon: "mdi:dock-bottom",
        fields: [
          {
            name: "mode",
            label: t("ed_panel_mode", h),
            selector: { select: { mode: "dropdown", options: [
              { value: "inline", label: t("ed_panel_mode_inline", h) },
              { value: "sheet", label: t("ed_panel_mode_sheet", h) },
            ] } },
          },
          {
            name: "timeout",
            label: t("ed_panel_timeout", h),
            selector: { number: { min: 0, max: 300, step: 1, mode: "box", unit_of_measurement: "s" } },
          },
          { name: "gap", label: t("ed_gap", h), selector: { number: { min: 0, max: 64, mode: "box" } } },
        ],
      },
    ];
  }

  _renderExtra() {
    return html`
      <materia-card-list-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .cards=${Array.isArray(this._config.cards) ? this._config.cards : []}
        .label=${t("ed_cards", this.hass)}
        @value-changed=${(e) => {
          e.stopPropagation();
          this._commit({ ...this._config, cards: e.detail.value });
        }}
      ></materia-card-list-editor>
      <materia-panels-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .panels=${this._config.panels}
        @value-changed=${(e) => {
          e.stopPropagation();
          this._setField("panels", e.detail.value);
        }}
      ></materia-panels-editor>
    `;
  }
}

customElements.define("materia-panel-host-editor", MateriaPanelHostEditor);
