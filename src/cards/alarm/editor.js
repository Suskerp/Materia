import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

/** Every arm mode the card knows how to offer, for the mode-order picker.
 *  The CARD derives what a panel actually supports from supported_features;
 *  this list only exists so a config can narrow or reorder that. */
const MODE_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "away", label: "Away" },
  { value: "night", label: "Night" },
  { value: "vacation", label: "Vacation" },
  { value: "custom", label: "Custom bypass" },
];

class MateriaAlarmEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .options-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expanded ??= null;
  }

  /* EVERY boolean and number is seeded with the card's own default.
     An option absent from config arrives as `undefined`, which ha-form draws
     as OFF or 0 — so the toggle claims a feature is disabled when it is
     actually on, and merely opening this editor and saving would write that
     wrong value for real. Config still wins, so an explicit false survives. */
  _formData() {
    return {
      hero: true,
      footnote: true,
      direct_switch: false,
      zones_start_expanded: false,
      show_unavailable: true,
      hold_ms: 800,
      hint_ms: 2000,
      // 20000, matching _armPinExpiry. This said 10000 while the card had
      // already moved to 20000, which is exactly the seeding bug this whole
      // method exists to prevent: opening the editor and saving wrote the old
      // value back and re-broke the 90-second exit delay.
      pending_timeout_ms: 20000,
      zone_settle_ms: 8000,
      zone_flap_detect: true,
      zone_flap_count: 6,
      zone_flap_window_ms: 60000,
      allow_safety_bypass: false,
      bypass_from_can_bypass: true,
      /* arming_duration_ms and pending_duration_ms are deliberately NOT seeded.
         Absent means "nobody has told us how long this takes", which selects
         the indeterminate breathe — seeding a number here would invent a
         duration and make the card claim progress it cannot know. Same
         reasoning as materia-bars' max and precision. */
      ...this._config,
    };
  }

  /* Fields appear and disappear with whether the panel wants a code and
     whether any zone is configured, so the memoized sections have to be
     invalidated on both. */
  _sectionsSignature() {
    const st = this.hass?.states[this._config?.entity];
    return [
      this._config?.entity || "",
      st?.attributes?.code_arm_required ? "c" : "",
      (this._config?.zones || []).length,
      (this._config?.modes || []).join(","),
      this._config?.zone_filter ? "f" : "",
      this._config?.bypass_action ? "b" : "",
      this._config?.zone_flap_detect === false ? "nf" : "",
      this._config?.arming_duration_ms ? "ad" : "",
    ].join("|");
  }

  get _sections() {
    const st = this.hass?.states[this._config?.entity];
    const codeWanted = !!st?.attributes?.code_arm_required || !!st?.attributes?.code_format;

    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "entity",
            label: "Alarm panel",
            selector: { entity: { domain: ["alarm_control_panel"] } },
            required: true,
          },
          {
            name: "modes",
            label: "Modes to offer (optional)",
            helper:
              "Leave empty to offer exactly what the panel reports it supports. Set this only to narrow the row or to change its order.",
            selector: { select: { multiple: true, mode: "list", options: MODE_OPTIONS } },
          },
          ...(codeWanted
            ? [{
                name: "code",
                label: "Code",
                helper:
                  "This panel asks for a code. Without one the hold is refused rather than firing a call the panel will reject. Note it is stored in plain text in the dashboard config.",
                selector: { text: { type: "password" } },
              }]
            : []),
        ],
      },
      {
        title: "Gesture",
        icon: "mdi:gesture-tap-hold",
        fields: [
          {
            name: "hold_ms",
            label: "Hold for (ms, default 800)",
            helper:
              "Keep this above 500ms — the platform long-press timeout — or an ordinary long-press on the dashboard commits by accident.",
            selector: { number: { min: 300, max: 5000, step: 50, mode: "box" } },
          },
          {
            name: "direct_switch",
            label: "Allow switching between armed modes",
            helper:
              "Off by default: while armed, the other modes are inert and must be disarmed through first. Leaving a house armed in the wrong shape is the mistake that gating prevents.",
            selector: { boolean: {} },
          },
          {
            name: "arming_duration_ms",
            label: "Exit delay (ms)",
            helper:
              "How long this panel takes to arm. Set it and the shape fills across the delay, showing how far through you are. Leave EMPTY and it breathes instead — the honest answer for a wait of unknown length, and better than a progress bar that finishes at the wrong moment. This is not the timeout below: that one is about silence, this one is about how the panel is programmed.",
            selector: { number: { min: 1000, max: 600000, step: 1000, mode: "box" } },
          },
          {
            name: "pending_duration_ms",
            label: "Entry delay (ms)",
            helper: "Same, for the countdown after someone comes in. Leave empty to breathe.",
            selector: { number: { min: 1000, max: 600000, step: 1000, mode: "box" } },
          },
          {
            name: "pending_timeout_ms",
            label: "Give up waiting for the panel after (ms, default 20000)",
            helper:
              "How long the card keeps showing the state you asked for before admitting the panel never answered. Counts SILENCE only — every arming or entry-delay read restarts it, so a long exit delay does not need a long timeout here.",
            selector: { number: { min: 1000, max: 60000, step: 500, mode: "box" } },
          },
          {
            name: "hint_ms",
            label: "How long a refusal hint stays up (ms, default 2000)",
            selector: { number: { min: 500, max: 8000, step: 100, mode: "box" } },
          },
        ],
      },
      {
        title: "Zones",
        icon: "mdi:door-closed-lock",
        expanded: false,
        fields: [
          {
            name: "zone_filter",
            label: "Find zones automatically",
            helper:
              "An entity_id prefix (sensor.ultrasync_zone) or a regex. Leave empty and add zones by hand below instead. A hand-written list always wins over this.",
            selector: { text: {} },
          },
          {
            name: "zone_pattern",
            label: "Zone number pattern (default zone(\\d+)state$)",
            helper:
              "How to read the panel's zone NUMBER out of an entity_id — the bypass services take a number, not an entity. A zone this does not match offers no Bypass button rather than firing a call with no zone.",
            selector: { text: {} },
          },
          {
            name: "zone_settle_ms",
            label: "Settle before a zone counts as ready again (ms, default 8000)",
            helper:
              "Going NOT ready is always immediate — that is the warning, and it must never be late. This only delays a zone leaving the not-ready list, so a door being closed does not make the card jump while a contact bounces.",
            selector: { number: { min: 0, max: 60000, step: 500, mode: "box" } },
          },
          {
            name: "zone_flap_detect",
            label: "Treat zones that flap as movement detectors",
            helper:
              "Last-resort fallback, for zones with nothing else to go on. A zone that changes repeatedly is behaving like a PIR, not a door: it keeps its place in the list and just recolours, instead of joining the not-ready group and turning the arm gesture amber. Zones are classified from device_class first, then from the integration's own icon, and a per-zone override always wins. Smoke, heat, gas and water zones are never reached by this.",
            selector: { boolean: {} },
          },
          {
            name: "zone_flap_count",
            label: "Changes before a zone counts as flapping (default 6)",
            selector: { number: { min: 2, max: 50, step: 1, mode: "box" } },
          },
          {
            name: "zone_flap_window_ms",
            label: "Window those changes are counted over (ms, default 60000)",
            selector: { number: { min: 1000, max: 600000, step: 1000, mode: "box" } },
          },
          {
            name: "bypass_from_can_bypass",
            label: "Read can_bypass as the bypass indicator",
            helper:
              "On by default. Some panels never mark a zone's state as bypassed and instead stop allowing further bypass on it, so a can_bypass of false on an otherwise-ready zone means it is already skipped. Turn this off if your panel uses can_bypass to mean a zone can never be bypassed at all, or every such zone will be reported as skipped.",
            selector: { boolean: {} },
          },
          {
            name: "allow_safety_bypass",
            label: "Allow bypassing smoke and heat detectors",
            helper:
              "Off by default. The panel permits it, but skipping a 24-hour zone arms the house with fire detection deliberately excluded, and it does not fix the fault it hides. Turn this on only if you mean it.",
            selector: { boolean: {} },
          },
          {
            name: "bypass_action",
            label: "Bypass action",
            helper:
              'Fired by the Bypass button. Write {zone} anywhere in the data and the zone number is substituted in — e.g. ultrasync.bypass with data zone: {zone}. Leave empty to hide the button everywhere.',
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "unbypass_action",
            label: "Un-bypass action",
            helper: "Fired by tapping a bypassed chip. Same {zone} substitution.",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      {
        title: "Layout",
        icon: "mdi:view-agenda-outline",
        fields: [
          { name: "hero", label: "Show the shape, state and sub-line", selector: { boolean: {} } },
          { name: "footnote", label: "Show the explanation line under the buttons", selector: { boolean: {} } },
          {
            name: "zones_start_expanded",
            label: "Start with the ready zones expanded",
            selector: { boolean: {} },
          },
          {
            name: "show_unavailable",
            label: "List zones the panel cannot see",
            selector: { boolean: {} },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "armed_color",
            label: "Accent while armed (default primary)",
            helper: "Worn by the shape and by the active mode button, so the two read as one object.",
            color: true,
            selector: { text: {} },
          },
          { name: "armed_color_on", label: "Ink on that accent", color: true, selector: { text: {} } },
          { name: "background", label: "Card background", color: true, selector: { text: {} } },
          { name: "background_on", label: "Card text", color: true, selector: { text: {} } },
          {
            name: "disarmed_icon",
            label: 'Shape glyph while disarmed (default "shield")',
            selector: { icon: {} },
          },
          {
            name: "triggered_icon",
            label: 'Shape glyph while triggered (default "crisis-alert")',
            selector: { icon: {} },
          },
        ],
      },
      {
        title: "Mode labels and icons",
        icon: "mdi:text-short",
        expanded: false,
        fields: MODE_OPTIONS.flatMap((m) => [
          { name: `label_${m.value}`, label: `${m.label} — label`, selector: { text: {} } },
          { name: `icon_${m.value}`, label: `${m.label} — icon`, selector: { icon: {} } },
        ]),
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        // Only the SHAPE takes a tap. The mode buttons deliberately have no tap
        // path at all — an alarm that can be armed by a stray tap while
        // scrolling defeats the whole control.
        fields: [
          {
            name: "tap_action",
            label: "Tapping the shape",
            selector: { ui_action: { default_action: "more-info" } },
          },
        ],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }

  /* ---- zones: a repeatable list, same pattern as materia-carousel ------- */

  get _zoneSchema() {
    return [
      {
        name: "entity",
        label: "Zone sensor",
        helper:
          'A door, window or contact. Not ready means on / open / unlocked, or the panel\'s own "Not Ready"; a state starting with "Bypass" counts as bypassed. Whether a Bypass button appears is the panel\'s call, via its can_bypass attribute.',
        selector: { entity: { domain: ["binary_sensor", "sensor", "lock", "cover", "input_boolean", "switch"] } },
      },
      { name: "name", label: "Name (optional — defaults to the entity name)", selector: { text: {} } },
      { name: "icon", label: "Icon (optional)", selector: { icon: {} } },
      {
        name: "safety",
        label: "24-hour zone (smoke, heat, gas, water)",
        helper:
          "Normally detected from device_class or the integration's icon, and remembered if the zone goes offline. Pin it here for a zone that is already unavailable when the dashboard loads, since there is nothing to read then. A 24-hour zone always blocks arming, never counts as a movement detector, and is not offered a Bypass button.",
        selector: { boolean: {} },
      },
      {
        name: "transient",
        label: "Movement detector",
        helper:
          "Overrides the automatic guess. On: this zone never blocks arming and never turns the gesture amber — it keeps its row and recolours. Off: it always blocks. Leave unset to classify from device_class, falling back to whether it flaps.",
        selector: { boolean: {} },
      },
    ];
  }

  _zones() {
    return Array.isArray(this._config?.zones) ? this._config.zones : [];
  }

  _commitZones(zones) {
    const next = { ...this._config };
    if (zones.length) next.zones = zones;
    else delete next.zones;
    this._commit(next);
  }

  _addZone() {
    const zones = [...this._zones(), { entity: "" }];
    this._expanded = zones.length - 1;
    this._commitZones(zones);
  }

  _removeZone(index) {
    const zones = [...this._zones()];
    zones.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._commitZones(zones);
  }

  _moveZone(from, to) {
    const zones = [...this._zones()];
    const [m] = zones.splice(from, 1);
    zones.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._commitZones(zones);
  }

  _updateZone(index, value) {
    const zones = [...this._zones()];
    // Spread preserves keys the form does not manage.
    zones[index] = { ...zones[index], ...value };
    this._commitZones(zones);
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }

  _zoneTitle(zone, i) {
    if (zone.name) return zone.name;
    const st = zone.entity ? this.hass?.states[zone.entity] : null;
    return st?.attributes?.friendly_name || zone.entity || `Zone ${i + 1}`;
  }

  _renderExtra() {
    const zones = this._zones();
    return html`
      <div class="options-header">
        <span>Zones</span>
        <ha-icon-button @click=${this._addZone}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">
        Only needed when you are NOT using "Find zones automatically" above, or
        when you want a curated subset. The card sorts these itself — whatever
        needs a decision floats to the top, unavailable zones next, and
        anything bypassed drops to the bottom — so this order only matters as a
        tie-break inside a group.
      </div>

      ${sortableList(
        (from, to) => this._moveZone(from, to),
        zones.map(
          (zone, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${this._zoneTitle(zone, i)}</span>
                <ha-icon-button @click=${() => this._toggleExpand(i)}>
                  <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeZone(i)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded === i
                ? html`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${zone}
                        .schema=${this._zoneSchema}
                        .computeLabel=${computeLabel}
                        @value-changed=${(e) => this._updateZone(i, e.detail.value)}
                      ></ha-form>
                    </div>
                  `
                : ""}
            </div>
          `
        )
      )}
    `;
  }
}

customElements.define("materia-alarm-editor", MateriaAlarmEditor);
