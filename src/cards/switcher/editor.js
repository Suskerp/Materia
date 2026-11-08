import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";
import "../../utils/media-editors.js";
import "../../utils/card-list-editor.js";

/** An item form result; empty name / value are dropped, the card and other keys kept. */
const itemFromForm = (old, value) => {
  const next = { ...old, ...value };
  for (const k of ["name", "value"]) if (next[k] === "" || next[k] == null) delete next[k];
  return next;
};

const schemas = {};
const itemSchema = (hass) =>
  (schemas[hass?.locale?.language ?? ""] ??= [
    { name: "name", label: t("ed_item_name", hass), selector: { text: {} } },
    { name: "value", label: t("ed_item_value", hass), selector: { text: {} } },
  ]);

class MateriaSwitcherEditor extends SmartEditorBase {
  _formData() {
    return { bar: "tabs", ...this._config };
  }

  _sectionsSignature() {
    return `${this._config?.bar === "connected"}|${this.hass?.locale?.language ?? ""}`;
  }

  get _sections() {
    const h = this.hass;
    return [
      {
        title: "e_switcher",
        icon: "mdi:tab",
        fields: [
          {
            name: "bar",
            label: t("ed_switcher_bar", h),
            selector: { select: { mode: "dropdown", options: [
              { value: "tabs", label: t("ed_switcher_tabs", h) },
              { value: "connected", label: t("ed_switcher_connected", h) },
            ] } },
          },
          ...(this._config?.bar === "connected"
            ? [{
                name: "size",
                label: t("ed_switcher_size", h),
                selector: { select: { mode: "dropdown", options: ["xs", "s", "m", "l", "xl"] } },
              }]
            : []),
          { name: "name", label: "e_accessible_name", selector: { text: {} } },
          { name: "remember", label: "e_remember_sel", selector: { boolean: {} } },
          { name: "key", label: "e_storage_key", selector: { text: {} } },
        ],
      },
    ];
  }

  _renderExtra() {
    const h = this.hass;
    return html`<materia-item-list-editor
      .hass=${h}
      .items=${Array.isArray(this._config.items) ? this._config.items : []}
      .schema=${itemSchema(h)}
      .itemLabel=${(item) => item?.name}
      .fromForm=${itemFromForm}
      .newItem=${() => ({ name: "" })}
      .itemExtra=${(item, update) => html`<materia-card-slot-editor
        .hass=${h}
        .lovelace=${this.lovelace}
        .card=${item?.card}
        @value-changed=${(e) => {
          e.stopPropagation();
          const next = { ...item };
          if (e.detail.value) next.card = e.detail.value;
          else delete next.card;
          update(next);
        }}
      ></materia-card-slot-editor>`}
      addLabel=${t("ed_items", h)}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._commit({ ...this._config, items: e.detail.value });
      }}
    ></materia-item-list-editor>`;
  }
}

customElements.define("materia-switcher-editor", MateriaSwitcherEditor);
