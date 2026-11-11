import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { resolveLanguage, t } from "../../utils/i18n.js";
import "../../utils/media-editors.js";
import {
  actionItemForm,
  actionItemFromForm,
  presetForm,
  presetFromForm,
  schedulePurpose,
  stepForm,
  stepFromForm,
  targetActionForm,
  targetActionFromForm,
  targetForm,
  targetFromForm,
  triggerForm,
  triggerFromForm,
  withPurpose,
} from "./editor-model.js";

/* Every list here is a materia-item-list-editor over HA selectors: no field
   asks for YAML. Schemas are module constants (or memoised) so ha-form keeps
   its controls, and open pickers, across renders. */

const ACTION = { ui_action: { actions: ["perform-action"], default_action: "perform-action" } };

const STEP_WHEN = { select: { mode: "dropdown", options: [
  { value: "at", label: "e_step_at" },
  { value: "before", label: "e_step_before" },
  { value: "after", label: "e_step_after" },
] } };

const STEP_SCHEMA_AT = [
  { name: "action", label: "sched_action", selector: ACTION },
  { name: "when", label: "e_step_when", selector: STEP_WHEN },
  { name: "name", label: "e_step_name", selector: { text: {} } },
];
const STEP_SCHEMA_OFFSET = [
  STEP_SCHEMA_AT[0],
  STEP_SCHEMA_AT[1],
  { name: "offset", label: "e_step_offset", selector: { duration: {} } },
  STEP_SCHEMA_AT[2],
];

const TRIGGER_SCHEMA = [
  { name: "label", label: "e_label", selector: { text: {} } },
  { name: "secondary", label: "e_trigger_sub", selector: { text: {} } },
  { name: "icon", label: "e_icon", selector: { icon: {} } },
  { name: "tap_action", label: "e_trigger_action", selector: { ui_action: {} } },
];

const TARGET_SCHEMA = [
  { name: "entity", label: "e_entity", selector: { entity: {} } },
  { name: "name", label: "e_name", selector: { text: {} } },
  { name: "icon", label: "e_icon", selector: { icon: {} } },
];

const TARGET_ACTION_SCHEMA = [
  { name: "action", label: "sched_action", selector: ACTION },
  { name: "label", label: "e_label", selector: { text: {} } },
  { name: "icon", label: "e_icon", selector: { icon: {} } },
];

const PLAN_SCHEMA = [
  { name: "name", label: "e_name", selector: { text: {} } },
  { name: "icon", label: "e_icon", selector: { icon: {} } },
];

const ACTION_ITEM_SCHEMA = [{ name: "action", label: "sched_action", selector: ACTION }];

const presetSchemas = {};
/** Per kind, language and (rare) "in N days" value; `own` adds the per-pick
 *  action that only the classic picker runs. */
const presetSchema = (hass, item, own) => {
  const form = presetForm(item);
  const lang = resolveLanguage(hass);
  const extraDay = /^d\d+$/.test(form.day || "") ? form.day : "";
  const key = `${lang}|${form.kind}|${extraDay}|${own}`;
  if (presetSchemas[key]) return presetSchemas[key];
  const weekday = new Intl.DateTimeFormat(lang, { weekday: "long" });
  const days = [
    { value: "next", label: t("e_preset_next", hass) },
    { value: "tomorrow", label: t("sched_preset_tomorrow", hass) },
    // ISO 1 = Monday; 2024-01-01 was a Monday.
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: `w${n}`, label: weekday.format(new Date(2024, 0, n)) })),
    ...(extraDay ? [{ value: extraDay, label: t("e_preset_in_days", hass, { n: extraDay.slice(1) }) }] : []),
  ];
  return (presetSchemas[key] = [
    { name: "label", label: "e_label", selector: { text: {} } },
    { name: "kind", label: "e_preset_kind", selector: { select: { mode: "dropdown", options: [
      { value: "in", label: "e_preset_in" },
      { value: "at", label: "e_preset_at" },
    ] } } },
    ...(form.kind === "in"
      ? [{ name: "in", label: "e_preset_in_value", selector: { duration: { enable_day: true } } }]
      : [
          { name: "at", label: "e_preset_at_value", selector: { time: {} } },
          { name: "day", label: "e_preset_day", selector: { select: { mode: "dropdown", options: days } } },
        ]),
    ...(own ? [{ name: "tap_action", label: "e_preset_action", selector: { ui_action: {} } }] : []),
  ]);
};

const friendly = (hass, entity) => hass?.states?.[entity]?.attributes?.friendly_name || entity;

/** "Kitchen light · light.turn_on" style header for an action-only item. */
const actionLabel = (hass, action) => {
  const service = action?.perform_action ?? action?.service;
  const entity = [action?.target?.entity_id ?? action?.entity_id].flat()[0];
  return [entity && friendly(hass, entity), service].filter(Boolean).join(" · ");
};

/** A list control that stops its value-changed at its own boundary, so a list
 *  nested in a list item never reaches the outer list's handler. */
const listEditor = (hass, { items, schema, itemLabel, toForm, fromForm, newItem, addLabel, itemExtra, write }) => html`
  <materia-item-list-editor
    .hass=${hass}
    .items=${Array.isArray(items) ? items : []}
    .schema=${schema}
    .itemLabel=${itemLabel}
    .toForm=${toForm}
    .fromForm=${fromForm}
    .newItem=${newItem}
    .itemExtra=${itemExtra}
    addLabel=${addLabel}
    @value-changed=${(e) => {
      e.stopPropagation();
      write(e.detail.value?.length ? e.detail.value : undefined);
    }}
  ></materia-item-list-editor>
`;

/** Steps of a moment or a plan: what runs, and how long before or after. */
const stepsEditor = (hass, items, write, addLabel) => listEditor(hass, {
  items,
  schema: (item) => (stepForm(item).when === "at" ? STEP_SCHEMA_AT : STEP_SCHEMA_OFFSET),
  itemLabel: (step) => step?.name || step?.label || actionLabel(hass, step?.action ?? step?.actions?.[0]),
  toForm: stepForm,
  // Choosing before/after with no duration yet starts at one hour, so the
  // choice sticks instead of collapsing back to "at the moment".
  fromForm: (old, form) => stepFromForm(old, form.when !== "at" && !form.offset ? { ...form, offset: { hours: 1 } } : form),
  newItem: () => ({ offset_minutes: 0 }),
  addLabel,
  write,
});

const randomId = () => Math.random().toString(36).slice(2, 8);

class MateriaScheduleEditor extends SmartEditorBase {
  /* Mirror runtime defaults without persisting them merely by opening the
     editor. The purpose is derived from the same keys the card reads. */
  _formData() {
    return {
      editor_presentation: "inline",
      schedule_types: ["window"],
      show_triggers: true,
      ...this._config,
      presentation: schedulePurpose(this._config),
    };
  }

  _sectionsSignature() {
    const c = this._config || {};
    return `${schedulePurpose(c)}|${[c.schedule_types ?? "window"].flat().includes("plan")}`;
  }

  _fieldChanged(name, ev) {
    if (name !== "presentation") return super._fieldChanged(name, ev);
    ev.stopPropagation();
    const value = ev.detail?.value;
    if (!value || value === schedulePurpose(this._config)) return;
    this._commit(withPurpose(this._config, value, () => `materia_moment_${randomId()}`));
  }

  _list(key, render) {
    return { name: key, render: (value) => render(value, (next) => this._setField(key, next)) };
  }

  get _presetsField() {
    const own = schedulePurpose(this._config) !== "moment";
    return this._list("presets", (value, write) => listEditor(this.hass, {
      items: value,
      schema: (item) => presetSchema(this.hass, item, own),
      itemLabel: (p) => p?.label,
      toForm: presetForm,
      fromForm: (old, form) => presetFromForm(old, form.kind === "in" && !form.in && !old.offset ? { ...form, in: { hours: 1 } } : form),
      newItem: () => ({ offset: "1h" }),
      addLabel: "e_presets",
      write,
    }));
  }

  get _triggersField() {
    return this._list("triggers", (value, write) => listEditor(this.hass, {
      items: value,
      schema: TRIGGER_SCHEMA,
      itemLabel: (trigger) => trigger?.label || trigger?.name,
      toForm: triggerForm,
      fromForm: triggerFromForm,
      newItem: () => ({ key: `t_${randomId()}`, icon: "m3o:sensors" }),
      addLabel: "e_non_clock_trigge",
      write,
    }));
  }

  _actionsField(key, addLabel) {
    return this._list(key, (value, write) => listEditor(this.hass, {
      items: value,
      schema: ACTION_ITEM_SCHEMA,
      itemLabel: (action) => actionLabel(this.hass, action),
      toForm: actionItemForm,
      fromForm: actionItemFromForm,
      newItem: () => ({}),
      addLabel,
      write,
    }));
  }

  get _targetsField() {
    const h = this.hass;
    return this._list("targets", (value, write) => listEditor(h, {
      items: value,
      schema: TARGET_SCHEMA,
      itemLabel: (target) => {
        const form = targetForm(target);
        return form.name || friendly(h, form.entity);
      },
      toForm: targetForm,
      fromForm: targetFromForm,
      newItem: () => ({}),
      addLabel: "e_device_friend_action",
      itemExtra: (target, update) => listEditor(h, {
        items: targetForm(target).actions,
        schema: TARGET_ACTION_SCHEMA,
        itemLabel: (action) => (typeof action === "string" ? action : action?.label || action?.service),
        toForm: targetActionForm,
        fromForm: targetActionFromForm,
        newItem: () => ({}),
        addLabel: "e_target_actions",
        write: (actions) => {
          const next = targetForm(target);
          if (actions) next.actions = actions;
          else delete next.actions;
          update(next);
        },
      }),
      write,
    }));
  }

  get _plansField() {
    const h = this.hass;
    return this._list("plans", (value, write) => listEditor(h, {
      items: value,
      schema: PLAN_SCHEMA,
      itemLabel: (plan) => plan?.name || plan?.label,
      newItem: () => ({ key: `plan_${randomId()}`, phases: [] }),
      addLabel: "e_multi_step_plans",
      itemExtra: (plan, update) => stepsEditor(h, plan?.phases, (phases) => update({ ...plan, phases: phases || [] }), "e_plan_steps"),
      write,
    }));
  }

  get _sections() {
    const purpose = schedulePurpose(this._config);
    const purposeField = {
      name: "presentation",
      label: "e_card_purpose",
      helper: "e_card_purpose_helper",
      selector: { select: { mode: "dropdown", options: [
        { value: "moment", label: "e_purpose_moment" },
        { value: "manager", label: "e_manage_list_add" },
        { value: "inline", label: "e_inline_collap_strip" },
        { value: "sheet", label: "e_sheet_always_open" },
      ] } },
    };
    const emptyLabels = [
      { name: "empty_label", label: "e_strip_title_when", selector: { text: {} } },
      { name: "empty_sub", label: "e_strip_sub_line", selector: { text: {} } },
    ];
    const triggersSection = (secondary, fields) => ({ title: "e_triggers", secondary, icon: "mdi:sensors", expanded: false, fields });

    if (purpose === "moment") {
      return [
        {
          title: "e_setup",
          icon: "mdi:tune",
          expanded: true,
          fields: [
            purposeField,
            { name: "name", label: "e_title", helper: "e_moment_name_helper", selector: { text: {} } },
            this._list("steps", (value, write) => stepsEditor(this.hass, value, write, "e_moment_steps")),
          ],
        },
        { title: "e_labels", icon: "mdi:label-outline", expanded: false, fields: emptyLabels },
        { title: "e_quick_picks", secondary: "e_optional", icon: "mdi:clock-fast", expanded: false, fields: [this._presetsField] },
        triggersSection("e_optional", [this._triggersField]),
        {
          title: "e_advanced",
          icon: "mdi:cog-outline",
          expanded: false,
          fields: [{ name: "manager_tag", label: "e_schedu_group", helper: "e_friend_intern_tag", selector: { text: {} } }],
        },
      ];
    }

    if (purpose === "manager") {
      const types = [this._config?.schedule_types ?? "window"].flat();
      return [
        {
          title: "e_setup",
          icon: "mdi:tune",
          expanded: true,
          fields: [
            purposeField,
            { name: "name", label: "e_title", selector: { text: {} } },
            {
              name: "schedule_types",
              label: "e_schedu_people_may",
              selector: { select: { multiple: true, options: [
                { value: "window", label: "e_recurr_start_end" },
                { value: "once", label: "e_one_time_action" },
                { value: "plan", label: "e_multi_step_plan" },
              ] } },
            },
            this._targetsField,
            ...(types.includes("plan") ? [this._plansField] : []),
          ],
        },
        {
          title: "e_advanced",
          icon: "mdi:cog-outline",
          expanded: false,
          fields: [
            {
              name: "editor_presentation",
              label: "e_open_schedu_editor",
              helper: "e_popup_keeps_dashbo",
              selector: { select: { mode: "dropdown", options: [
                { value: "popup", label: "e_popup" },
                { value: "inline", label: "e_expand_inline" },
              ] } },
            },
            {
              name: "schedule_entities",
              label: "e_additi_schedu_entiti",
              helper: "e_option_explic_switch",
              selector: { entity: { domain: "switch", multiple: true } },
            },
            { name: "manager_tag", label: "e_schedu_group", helper: "e_friend_intern_tag", selector: { text: {} } },
          ],
        },
      ];
    }

    // The classic picker (inline strip or always-open sheet): it hands the
    // chosen moment to an action of the dashboard's own.
    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        expanded: true,
        fields: [
          purposeField,
          { name: "name", label: "e_eyebro_above_chosen", helper: "e_what_being_schedu", selector: { text: {} } },
          ...emptyLabels,
          {
            name: "confirm_action",
            label: "e_on_confir",
            helper: "e_use_dateti_date",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      { title: "e_quick_picks", secondary: "e_presets_builtin", icon: "mdi:clock-fast", expanded: false, fields: [this._presetsField] },
      triggersSection("e_triggers_builtin", [
        { name: "show_triggers", label: "e_show_when_tab", helper: "e_disabl_for_straig", selector: { boolean: {} } },
        {
          name: "trigger_action",
          label: "e_on_confir_trigge",
          helper: "e_falls_back_confir",
          selector: { ui_action: { default_action: "none" } },
        },
        this._triggersField,
      ]),
      {
        title: "e_window",
        icon: "mdi:clock-start",
        expanded: false,
        fields: [
          {
            name: "schedule_entity",
            label: "e_schedu_entity",
            helper: "e_switch_schedu_entity",
            selector: { entity: { domain: "switch" } },
          },
          {
            name: "show_stop",
            label: "e_start_stop_window",
            helper: "e_for_drivin_custom",
            selector: { boolean: {} },
          },
          this._actionsField("actions", "e_start_action"),
          this._actionsField("end_actions", "e_end_action"),
        ],
      },
      {
        title: "e_advanced",
        icon: "mdi:cog-outline",
        expanded: false,
        fields: [
          {
            name: "close_action",
            label: "e_how_dismis_modal",
            helper: "e_sheet_presen_only",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-schedule-editor", MateriaScheduleEditor);
