import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";

const METRIC_OPTIONS = [
  { value: "minmax", label: "High / low" },
  { value: "wind", label: "Wind" },
  { value: "humidity", label: "Humidity" },
  { value: "uv", label: "UV index" },
  { value: "precipitation", label: "Precipitation" },
  { value: "pressure", label: "Pressure" },
  { value: "pollen", label: "Pollen (worst species)" },
  { value: "aqi", label: "Air quality" },
];

class MateriaWeatherGlanceEditor extends SmartEditorBase {
  _formData() {
    return { metrics: ["minmax"], ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "moon_entity", label: "Moon phase sensor (default: sensor.moon)", selector: { entity: { domain: "sensor" } } },
          { name: "temperature_entity", label: "Real temperature sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "metrics", label: "Subtitle metrics (condition always owns the top line)", selector: { select: { multiple: true, mode: "list", options: METRIC_OPTIONS } } },
          { name: "sort_by_severity", label: "Sort metrics worst-first", selector: { boolean: {} } },
          { name: "max_metrics", label: "Max metrics on the subtitle line", selector: { number: { min: 1, max: 8, step: 1, mode: "box" } } },
          { name: "show_metric_icons", label: "Show metric icons", selector: { boolean: {} } },
          { name: "pollen_entities", label: "Pollen sensors (for the pollen metric)", selector: { entity: { domain: "sensor", multiple: true } } },
          { name: "aqi_entity", label: "AQI sensor (for the air-quality metric)", selector: { entity: { domain: "sensor" } } },
          { name: "alert", label: "Alert text / template (takes over top line)", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
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
      <div class="prio-header">Tie-break priority (most important first)</div>
      ${sortableList(
        (from, to) => this._movePrio(from, to),
        prio.map((p, i) => html`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${METRIC_OPTIONS.find((o) => o.value === p)?.label ?? p}</span>
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
            .schema=${[{ name: "add", label: "Add metric to priority", selector: { select: { mode: "dropdown", options: remaining } } }]}
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
