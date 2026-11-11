import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";
import { WHEN, needsValue, readWhen, writeWhen } from "./when.js";
import { RULES } from "./index.js";

/* One schema per (language, kind, test), so ha-form keeps its controls across renders.
   A rule reads top to bottom as a sentence: watch this entity, show when it
   is …, how urgent, what it says, what the button does. */
const schemas = {};
const itemSchema = (hass, kind, when, entity = "") =>
  (schemas[`${hass?.locale?.language ?? ""}|${kind}|${when}|${needsValue(when) ? entity : ""}`] ??= [
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
          { name: "later", label: t("ed_att_later", hass), selector: { boolean: {} } },
          { name: "later_hours", label: t("ed_att_later_hours_item", hass), selector: { number: { min: 1, max: 48, step: 1, mode: "box" } } },
        ]
      : [
          { name: "entity", label: t("ed_att_entity", hass), selector: { entity: {} } },
          { name: "when", label: t("ed_att_when", hass), selector: { select: { mode: "dropdown", options: WHEN.map((w) => ({ value: w, label: t(`ed_att_when_${w}`, hass) })) } } },
          ...(needsValue(when)
            ? [{ name: "value", label: t("ed_att_value", hass), selector: when === "below" || when === "above" ? { number: { mode: "box", step: "any" } } : { state: { entity_id: entity } } }]
            : []),
          { name: "level", label: t("ed_att_level", hass), selector: { select: { mode: "dropdown", options: [
            { value: "urgent", label: t("ed_att_level_urgent", hass) },
            { value: "warning", label: t("ed_att_level_warning", hass) },
            { value: "info", label: t("ed_att_level_info", hass) },
          ] } } },
          { name: "name", label: t("ed_att_name", hass), selector: { text: {} } },
          { name: "secondary", label: t("ed_att_secondary", hass), selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
          { name: "action_label", label: t("ed_att_action_label", hass), selector: { text: {} } },
          { name: "action", label: t("ed_att_action", hass), selector: { ui_action: { default_action: "none" } } },
          { name: "later", label: t("ed_att_later", hass), selector: { boolean: {} } },
          { name: "later_hours", label: t("ed_att_later_hours_item", hass), selector: { number: { min: 1, max: 48, step: 1, mode: "box" } } },
        ]),
  ]);

const kindOf = (item) => (item?.type === "vacuum" ? "vacuum" : "rule");
const toForm = (item) => ({ level: "warning", brand: "roborock", ...item, type: kindOf(item), ...(kindOf(item) === "rule" ? readWhen(item) : {}) });
const fromForm = (item, value) => {
  const { when, value: v, ...rest } = value;
  const next = { ...item, ...rest };
  if (next.type !== "vacuum") {
    delete next.type;
    // A simple test is written as the conditions the card reads; "custom" keeps them as built.
    if (when && when !== "custom") {
      const conditions = writeWhen(next.entity, when, v);
      if (conditions) next.conditions = conditions;
      else delete next.conditions;
    }
  }
  for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
  if (next.action?.action === "none") delete next.action;
  return next;
};

class MateriaAttentionEditor extends SmartEditorBase {
  _formData() {
    return { mode: "now", ...this._config };
  }

  get _sections() {
    const later = this._config?.mode === "later";
    return [
      {
        title: "e_content",
        icon: "mdi:bell-badge-outline",
        fields: [
          { name: "mode", label: "ed_att_mode", selector: { select: { mode: "dropdown", options: [
            { value: "now", label: "ed_att_mode_now" },
            { value: "later", label: "ed_att_mode_later" },
          ] } } },
          ...(later
            ? [{ name: "rules_from", label: "ed_att_rules_from", helper: "ed_att_rules_from_help", selector: { select: { mode: "dropdown", custom_value: true, options: [...RULES.keys()] } } }]
            : [
                { name: "id", label: "ed_att_id", helper: "ed_att_id_help", selector: { text: {} } },
                { name: "later_hours", label: "ed_att_later_hours", selector: { number: { min: 1, max: 48, step: 1, mode: "box" } } },
              ]),
        ],
      },
      ...(later
        ? []
        : [{ title: "ed_att_items", icon: "mdi:format-list-checks", fields: [{ name: "items", render: (value) => this._itemsField(value) }] }]),
    ];
  }

  _itemsField(value) {
    const h = this.hass;
    return html`<materia-item-list-editor
      .hass=${h}
      .items=${Array.isArray(value) ? value : []}
      .schema=${(item) => itemSchema(h, kindOf(item), kindOf(item) === "rule" ? readWhen(item).when : "", item?.entity)}
      .itemLabel=${(item) =>
        kindOf(item) === "vacuum"
          ? h?.states?.[item.entity]?.attributes?.friendly_name || t("ed_att_kind_vacuum", h)
          : item?.name || h?.states?.[item?.entity]?.attributes?.friendly_name || t("ed_att_kind_rule", h)}
      .toForm=${toForm}
      .fromForm=${fromForm}
      .newItem=${() => ({ level: "warning" })}
      .itemExtra=${(item, update) =>
        kindOf(item) === "vacuum" || readWhen(item).when !== "custom"
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
