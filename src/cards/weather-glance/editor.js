import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { localize, t, tr } from "../../utils/i18n.js";

const METRIC_OPTIONS = [
  { value: "minmax", label: "e_high_low" },
  { value: "wind", label: "wm_wind" },
  { value: "humidity", label: "wm_humidity" },
  { value: "uv", label: "wm_uv_index" },
  { value: "precipitation", label: "wm_precipitation" },
  { value: "pressure", label: "wm_pressure" },
  { value: "pollen", label: "e_pollen_worst_specie" },
  { value: "aqi", label: "wm_air_quality" },
];

class MateriaWeatherGlanceEditor extends SmartEditorBase {
  _formData() {
    return { metrics: ["minmax"], hide_quiet: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "moon_entity", label: "e_moon_phase_sensor", selector: { entity: { domain: "sensor" } } },
          { name: "temperature_entity", label: "e_real_temper_sensor", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "metrics", label: "e_subtit_metric_condit", selector: { select: { multiple: true, mode: "list", options: METRIC_OPTIONS } } },
          { name: "sort_by_severity", label: "e_sort_metric_worst", selector: { boolean: {} } },
          { name: "max_metrics", label: "e_max_metric_on", selector: { number: { min: 1, max: 8, step: 1, mode: "box" } } },
          { name: "show_metric_icons", label: "e_show_metric_icons", selector: { boolean: {} } },
          { name: "pollen_entities", label: "e_pollen_sensor_for", selector: { entity: { domain: "sensor", multiple: true } } },
          { name: "aqi_entity", label: "e_aqi_sensor_for", selector: { entity: { domain: "sensor" } } },
          { name: "hide_quiet", label: "ed_glance_hide_quiet", selector: { boolean: {} } },
          { name: "alerts_entity", label: "ed_glance_alerts_entity", selector: { entity: { domain: ["binary_sensor", "sensor"] } } },
          { name: "alert", label: "e_alert_text_templa", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "navigate" } } },
        ],
      },
    ];
  }

  /* ---- Tie-break priority: drag-to-sort list ---------------------------- */

  get _priority() {
    return this._config?.priority ?? ["precipitation", "pollen", "aqi"];
  }

  _movePrio(from, to) {
    const p = [...this._priority];
    const [m] = p.splice(from, 1);
    p.splice(to, 0, m);
    this._commit({ ...this._config, priority: p });
  }

  _removePrio(i) {
    const p = [...this._priority];
    p.splice(i, 1);
    this._commit({ ...this._config, priority: p });
  }

  _renderExtra() {
    const prio = this._priority;
    const remaining = METRIC_OPTIONS.filter((o) => !prio.includes(o.value));
    return html`
      <div class="prio-header">${t("e_tiebreak", this.hass)}</div>
      ${sortableList(
        (from, to) => this._movePrio(from, to),
        prio.map((p, i) => html`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${tr(METRIC_OPTIONS.find((o) => o.value === p)?.label, this.hass) ?? p}</span>
            <ha-icon-button @click=${() => this._removePrio(i)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `)
      )}
      ${remaining.length
        ? html`<ha-form
            .hass=${this.hass}
            .data=${{}}
            .schema=${localize([{ name: "add", label: "e_add_metric_priori", selector: { select: { mode: "dropdown", options: remaining } } }], this.hass)}
            .computeLabel=${computeLabel}
            @value-changed=${(e) => {
              const v = e.detail.value?.add;
              if (v) this._commit({ ...this._config, priority: [...prio, v] });
            }}
          ></ha-form>`
        : ""}
    `;
  }
}

MateriaWeatherGlanceEditor.styles = [
  SmartEditorBase.styles,
  css`
    .prio-header {
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .prio-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 4px 2px 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 10px;
      margin-top: 6px;
      font-size: 13px;
    }
    .prio-row span {
      flex: 1;
    }
    .prio-row .drag-handle {
      cursor: grab;
      opacity: 0.6;
    }
  `,
];

customElements.define("materia-weather-glance-editor", MateriaWeatherGlanceEditor);
