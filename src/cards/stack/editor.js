import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";
import "../../utils/card-list-editor.js";

/** `grow` is a 0-based card index; the editor shows card numbers from 1. */
class MateriaStackEditor extends SmartEditorBase {
  _formData() {
    const c = { direction: "column", gap: 16, ...this._config };
    if (Number.isInteger(c.grow)) c.grow += 1;
    return c;
  }

  _sectionsSignature() {
    return `${this._config?.direction === "row"}|${this.hass?.locale?.language ?? ""}`;
  }

  _setField(name, value) {
    if (name === "grow" && typeof value === "number") value = Math.max(0, Math.round(value) - 1);
    super._setField(name, value);
  }

  get _sections() {
    const h = this.hass;
    return [
      {
        title: t("ed_layout", h),
        icon: "mdi:view-split-horizontal",
        fields: [
          {
            name: "direction",
            label: t("ed_stack_direction", h),
            selector: { select: { mode: "dropdown", options: [
              { value: "column", label: t("ed_stack_column", h) },
              { value: "row", label: t("ed_stack_row", h) },
            ] } },
          },
          { name: "gap", label: t("ed_gap", h), selector: { number: { min: 0, max: 64, mode: "box" } } },
          ...(this._config?.direction === "row"
            ? []
            : [{ name: "grow", label: t("ed_stack_grow", h), selector: { number: { min: 1, max: 20, mode: "box" } } }]),
        ],
      },
    ];
  }

  _renderExtra() {
    return html`<materia-card-list-editor
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cards=${Array.isArray(this._config.cards) ? this._config.cards : []}
      .label=${t("ed_cards", this.hass)}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._commit({ ...this._config, cards: e.detail.value });
      }}
    ></materia-card-list-editor>`;
  }
}

customElements.define("materia-stack-editor", MateriaStackEditor);
