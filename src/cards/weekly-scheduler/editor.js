import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";

/*
 * The weekly scheduler's visual editor. Every option is a form field:
 * schedule groups, the devices in each group, each group's presets and the
 * whole-home plans are sortable lists (drag, open, delete), so nothing ever
 * needs YAML. Labels are ed_ws_* keys, translated by the item-list editor.
 */
const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const memo = new Map();
/* One schema object per shape, so ha-form keeps its controls across renders. */
const once = (key, make) => (memo.has(key) ? memo.get(key) : memo.set(key, make()).get(key));

/* A group is a schedule helper and its devices, whatever they are. A RoomMind
   thermostat is recognised by the card itself, so nothing here asks about it. */
const groupSchema = () => once("g", () => [
  { name: "name", label: "ed_ws_group_name", selector: { text: {} } },
  { name: "icon", label: "ed_ws_icon", selector: { icon: {} } },
  { name: "schedule", label: "ed_ws_schedule", helper: "ed_ws_schedule_help", required: true, selector: { entity: { domain: "schedule" } } },
  { name: "mode", label: "ed_ws_colour", helper: "ed_ws_colour_help", selector: { select: { mode: "dropdown", options: [
    { value: "", label: "ed_ws_colour_auto" },
    { value: "heat", label: "ed_ws_colour_heat" },
    { value: "cool", label: "ed_ws_colour_cool" },
    { value: "auto", label: "ed_ws_colour_green" },
    { value: "light", label: "ed_ws_colour_light" },
    { value: "neutral", label: "ed_ws_colour_neutral" },
  ] } } },
]);

const memberSchema = (climate, unit) => once(`m${climate}${unit}`, () => [
  { name: "entity", label: "ed_ws_entity", required: true, selector: { entity: {} } },
  { name: "name", label: "ed_ws_member_name", selector: { text: {} } },
  { name: "icon", label: "ed_ws_icon", selector: { icon: {} } },
  ...(climate
    ? [{ name: "default_temperature", label: "ed_ws_default_temp", helper: "ed_ws_default_temp_help", selector: { number: { min: 5, max: 35, step: 0.5, mode: "box", unit_of_measurement: unit } } }]
    : []),
]);

const presetSchema = [
  { name: "name", label: "ed_ws_preset_name", selector: { text: {} } },
  { name: "schedule", label: "ed_ws_preset_schedule", helper: "ed_ws_preset_schedule_help", required: true, selector: { entity: { domain: "schedule" } } },
  { name: "source_day", label: "ed_ws_source_day", helper: "ed_ws_source_day_help", selector: { select: { mode: "dropdown", options: [
    { value: "", label: "ed_ws_source_day_auto" },
    ...DAY_KEYS.map((value) => ({ value, label: `ed_ws_day_${value}` })),
  ] } } },
];

const clean = (obj) => {
  const next = { ...obj };
  for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
  return next;
};

class MateriaWeeklySchedulerEditor extends SmartEditorBase {
  get _sections() {
    return [{ title: "e_content", icon: "mdi:calendar-clock", fields: [
      { name: "title", label: "ed_ws_title", helper: "ed_ws_title_help", selector: { text: {} } },
    ] }];
  }

  get _groups() { return this._config.groups || this._config.rooms || []; }
  _setGroups(groups) {
    const { rooms, ...rest } = this._config;
    this._commit({ ...rest, groups });
  }

  _name(entity) { return this.hass?.states?.[entity]?.attributes?.friendly_name || entity || ""; }

  _members(group, index, update) {
    const unit = this.hass?.config?.unit_system?.temperature || "°C";
    const members = group.members || (group.climate ? [{ entity: group.climate }] : []);
    return html`<materia-item-list-editor
      .hass=${this.hass}
      .items=${members}
      .schema=${(m) => memberSchema(String(m?.entity || "").startsWith("climate."), unit)}
      .itemLabel=${(m) => m?.name || this._name(m?.entity) || t("ed_ws_entity", this.hass)}
      .toForm=${(m) => ({ ...m, default_temperature: m?.defaults?.temperature })}
      .fromForm=${(m, v) => {
        const { default_temperature, ...rest } = v;
        const next = clean({ ...m, ...rest });
        const defaults = { ...(m?.defaults || {}) };
        if (default_temperature == null || default_temperature === "") delete defaults.temperature;
        else defaults.temperature = default_temperature;
        if (Object.keys(defaults).length) next.defaults = defaults;
        else delete next.defaults;
        return next;
      }}
      .newItem=${() => ({})}
      addLabel="ed_ws_devices"
      @value-changed=${(e) => {
        e.stopPropagation();
        const { climate, ...rest } = group;
        update({ ...rest, members: e.detail.value || [] });
      }}
    ></materia-item-list-editor>`;
  }

  _presets(group, update) {
    return html`<materia-item-list-editor
      .hass=${this.hass}
      .items=${group.presets || []}
      .schema=${presetSchema}
      .itemLabel=${(p) => p?.name || this._name(p?.schedule) || t("ed_ws_preset", this.hass)}
      .fromForm=${(p, v) => clean({ ...p, ...v })}
      .newItem=${() => ({})}
      addLabel="ed_ws_presets"
      @value-changed=${(e) => {
        e.stopPropagation();
        const list = e.detail.value || [];
        const next = { ...group, presets: list };
        if (!list.length) delete next.presets;
        update(next);
      }}
    ></materia-item-list-editor>`;
  }

  /** A plan picks, per group, which of that group's presets it applies. */
  _planSchema() {
    return [
      { name: "name", label: "ed_ws_plan_name", selector: { text: {} } },
      ...this._groups.map((group, i) => ({
        name: `g${i}`,
        label: group.name || this._name(group.schedule) || `${t("ed_ws_group", this.hass)} ${i + 1}`,
        selector: { select: { mode: "dropdown", options: [
          { value: "", label: t("ed_ws_plan_skip", this.hass) },
          ...(group.presets || []).filter((p) => p.schedule).map((p) => ({ value: p.schedule, label: p.name || this._name(p.schedule) })),
        ] } },
      })),
    ];
  }

  _planToForm(plan) {
    const form = { name: plan?.name || "" };
    this._groups.forEach((group, i) => {
      form[`g${i}`] = plan?.groups?.find((e) => e.schedule === group.schedule)?.source || "";
    });
    return form;
  }

  _planFromForm(plan, value) {
    const groups = [];
    this._groups.forEach((group, i) => {
      const source = value[`g${i}`];
      if (!source || !group.schedule) return;
      const preset = (group.presets || []).find((p) => p.schedule === source);
      groups.push(clean({ schedule: group.schedule, source, source_day: preset?.source_day }));
    });
    return clean({ ...plan, name: value.name, groups });
  }

  _renderExtra() {
    const groups = this._groups;
    const plans = this._config.plans || [];
    return html`
      <div class="ws-block">
        <materia-item-list-editor
          .hass=${this.hass}
          .items=${groups}
          .schema=${() => groupSchema()}
          .itemLabel=${(g) => g?.name || this._name(g?.schedule) || t("ed_ws_group", this.hass)}
          .toForm=${(g) => ({ mode: "", ...g })}
          .fromForm=${(g, v) => {
            // RoomMind is recognised from the device now; the old switches go.
            const { backend, roommind_area, ...next } = clean({ ...g, ...v });
            return next;
          }}
          .newItem=${() => ({ name: "", members: [] })}
          .itemExtra=${(group, update) => html`
            <div class="ws-nested">${this._members(group, 0, update)}</div>
            <div class="ws-nested">${this._presets(group, update)}</div>`}
          addLabel="ed_ws_groups"
          @value-changed=${(e) => {
            e.stopPropagation();
            this._setGroups(e.detail.value || []);
          }}
        ></materia-item-list-editor>
      </div>
      <div class="ws-block">
        <materia-item-list-editor
          .hass=${this.hass}
          .items=${plans}
          .schema=${() => this._planSchema()}
          .itemLabel=${(p) => p?.name || t("ed_ws_plan", this.hass)}
          .toForm=${(p) => this._planToForm(p)}
          .fromForm=${(p, v) => this._planFromForm(p, v)}
          .newItem=${() => ({ name: "", groups: [] })}
          addLabel="ed_ws_plans"
          @value-changed=${(e) => {
            e.stopPropagation();
            const list = e.detail.value || [];
            const next = { ...this._config, plans: list };
            if (!list.length) delete next.plans;
            this._commit(next);
          }}
        ></materia-item-list-editor>
        <p class="ws-help">${t("ed_ws_plans_help", this.hass)}</p>
      </div>
      <style>
        .ws-block { margin-top: 16px; }
        .ws-nested { margin-top: 16px; padding-top: 8px; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); }
        .ws-help { margin: 8px 4px 0; font-size: 12px; line-height: 16px; color: var(--secondary-text-color); }
      </style>`;
  }
}

for (const tag of ["materia-weekly-scheduler-editor", "materia-climate-scheduler-editor"]) {
  if (!customElements.get(tag)) customElements.define(tag, class extends MateriaWeeklySchedulerEditor {});
}
