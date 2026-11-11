import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";

/* One schema per (language, kind), so ha-form keeps its controls across renders. */
const schemas = {};
const itemSchema = (hass, kind) =>
  (schemas[`${hass?.locale?.language ?? ""}|${kind}`] ??= [
    { name: "type", label: t("ed_att_kind", hass), selector: { select: { mode: "dropdown", options: [
      { value: "rule", label: t("ed_att_kind_rule", hass) },
      { value: "vacuum", label: t("ed_att_kind_vacuum", hass) },
    ] } } },
    ...(kind === "vacuum"
      ? [
          { name: "entity", label: t("ed_att_vacuum", hass), selector: { entity: { domain: "vacuum" } } },
          { name: "brand", label: t("ed_att_brand", hass), selector: { select: { mode: "dropdown", options: [
            { value: "roborock", label: "Roborock" },
            { value: "ecovacs", label: "Ecovacs" },
          ] } } },
        ]
      : [
          { name: "name", label: t("ed_att_name", hass), selector: { text: {} } },
          { name: "secondary", label: t("ed_att_secondary", hass), selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
          { name: "level", label: t("ed_att_level", hass), selector: { select: { mode: "dropdown", options: [
            { value: "urgent", label: t("ed_att_level_urgent", hass) },
            { value: "warning", label: t("ed_att_level_warning", hass) },
            { value: "info", label: t("ed_att_level_info", hass) },
          ] } } },
          { name: "entity", label: t("ed_att_entity", hass), selector: { entity: {} } },
          { name: "action_label", label: t("ed_att_action_label", hass), selector: { text: {} } },
          { name: "action", label: t("ed_att_action", hass), selector: { ui_action: { default_action: "none" } } },
        ]),
  ]);

const kindOf = (item) => (item?.type === "vacuum" ? "vacuum" : "rule");
const toForm = (item) => ({ level: "warning", brand: "roborock", ...item, type: kindOf(item) });
const fromForm = (item, value) => {
  const next = { ...item, ...value };
  if (next.type !== "vacuum") delete next.type;
  for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
  if (next.action?.action === "none") delete next.action;
  return next;
};

class MateriaAttentionEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:bell-badge-outline",
        fields: [
          { name: "title", label: "ed_att_title", selector: { text: {} } },
        ],
      },
      {
        title: "ed_att_items",
        icon: "mdi:format-list-checks",
        fields: [{ name: "items", render: (value) => this._itemsField(value) }],
      },
    ];
  }

  _itemsField(value) {
    const h = this.hass;
    return html`<materia-item-list-editor
      .hass=${h}
      .items=${Array.isArray(value) ? value : []}
      .schema=${(item) => itemSchema(h, kindOf(item))}
      .itemLabel=${(item) =>
        kindOf(item) === "vacuum"
          ? h?.states?.[item.entity]?.attributes?.friendly_name || t("ed_att_kind_vacuum", h)
          : item?.name || t("ed_att_kind_rule", h)}
      .toForm=${toForm}
      .fromForm=${fromForm}
      .newItem=${() => ({ level: "warning" })}
      .itemExtra=${(item, update) =>
        kindOf(item) === "vacuum"
          ? html``
          : html`<materia-conditions-field
              .hass=${h}
              .value=${item.conditions}
              .label=${t("ed_att_conditions", h)}
              .helper=${t("ed_att_conditions_help", h)}
              @value-changed=${(e) => {
                e.stopPropagation();
                const next = { ...item };
                if (e.detail.value) next.conditions = e.detail.value;
                else delete next.conditions;
                update(next);
              }}
            ></materia-conditions-field>`}
      addLabel=${t("ed_att_items", h)}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._setField("items", e.detail.value?.length ? e.detail.value : []);
      }}
    ></materia-item-list-editor>`;
  }
}

customElements.define("materia-attention-editor", MateriaAttentionEditor);
