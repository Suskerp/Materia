import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { localize, t } from "../../utils/i18n.js";
import { hasLegacyAlarmCode, sanitizeAlarmConfig } from "./config-policy.js";

/** Every arm mode the card knows how to offer, for the mode-order picker.
 *  The CARD derives what a panel actually supports from supported_features;
 *  this list only exists so a config can narrow or reorder that. */
const MODE_OPTIONS = [
  { value: "home", label: "al_mode_home" },
  { value: "away", label: "al_mode_away" },
  { value: "night", label: "al_mode_night" },
  { value: "vacation", label: "al_mode_vacation" },
  { value: "custom", label: "e_custom_bypass" },
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
      .security-note {
        display: flex;
        gap: 12px;
        margin: 0 0 12px;
        padding: 14px 16px;
        border-radius: 16px;
        background: var(--warning-color, var(--md-sys-color-tertiary-container));
        color: var(--md-sys-color-on-tertiary-container, var(--primary-text-color));
        line-height: 1.4;
      }
      .security-note ha-icon { flex: 0 0 auto; margin-top: 2px; }
      .security-note strong { display: block; margin-bottom: 2px; }
    `,
  ];

  setConfig(config) {
    // `code` was accepted by older releases and stored as readable Lovelace
    // YAML. Never pass that secret into the editor model: the next deliberate
    // edit removes it, while opening an old dashboard alone remains non-mutating.
    this._legacyCodeConfigured = hasLegacyAlarmCode(config);
    super.setConfig(sanitizeAlarmConfig(config));
    this._expanded ??= null;
  }

  render() {
    const panel = this.hass?.states?.[this._config?.entity];
    const codeRequired = !!panel?.attributes?.code_arm_required;
    return html`
      ${this._legacyCodeConfigured || codeRequired ? html`
        <div class="security-note" role="note">
          <ha-icon icon="mdi:shield-lock-outline"></ha-icon>
          <div>
            <strong>${t("al_code_security_title", this.hass)}</strong>
            ${t(this._legacyCodeConfigured ? "al_code_legacy_notice" : "al_code_native_notice", this.hass)}
          </div>
        </div>
      ` : ""}
      ${super.render()}
    `;
  }

  _commit(config) {
    this._legacyCodeConfigured = false;
    super._commit(sanitizeAlarmConfig(config));
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
      bypass_from_can_bypass_when_not_ready: false,
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
    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "entity",
            label: "e_alarm_panel",
            selector: { entity: { domain: ["alarm_control_panel"] } },
            required: true,
          },
          {
            name: "modes",
            label: "e_modes_offer_option",
            helper:
              "e_leave_empty_offer",
            selector: { select: { multiple: true, mode: "list", options: MODE_OPTIONS } },
          },
        ],
      },
      {
        title: "e_gesture",
        icon: "mdi:gesture-tap-hold",
        fields: [
          {
            name: "hold_ms",
            label: "e_hold_for_ms",
            helper:
              "e_keep_above_500ms",
            selector: { number: { min: 300, max: 5000, step: 50, mode: "box" } },
          },
          {
            name: "direct_switch",
            label: "e_allow_switch_betwee",
            helper:
              "e_off_by_defaul",
            selector: { boolean: {} },
          },
          {
            name: "arming_duration_ms",
            label: "e_exit_delay_ms",
            helper:
              "e_how_long_panel",
            selector: { number: { min: 1000, max: 600000, step: 1000, mode: "box" } },
          },
          {
            name: "pending_duration_ms",
            label: "e_entry_delay_ms",
            helper: "e_same_for_countd",
            selector: { number: { min: 1000, max: 600000, step: 1000, mode: "box" } },
          },
          {
            name: "pending_timeout_ms",
            label: "e_give_up_waitin",
            helper:
              "e_how_long_card",
            selector: { number: { min: 1000, max: 60000, step: 500, mode: "box" } },
          },
          {
            name: "hint_ms",
            label: "e_how_long_refusa",
            selector: { number: { min: 500, max: 8000, step: 100, mode: "box" } },
          },
        ],
      },
      {
        title: "e_zones",
        icon: "mdi:door-closed-lock",
        expanded: false,
        fields: [
          {
            name: "zone_filter",
            label: "e_find_zones_automa",
            helper:
              "e_entity_id_prefix",
            selector: { text: {} },
          },
          {
            name: "zone_pattern",
            label: "e_zone_number_patter",
            helper:
              "e_how_read_panel",
            selector: { text: {} },
          },
          {
            name: "zone_settle_ms",
            label: "e_settle_before_zone",
            helper:
              "e_going_not_ready",
            selector: { number: { min: 0, max: 60000, step: 500, mode: "box" } },
          },
          {
            name: "zone_flap_detect",
            label: "e_treat_zones_flap",
            helper:
              "e_last_resort_fallba",
            selector: { boolean: {} },
          },
          {
            name: "zone_flap_count",
            label: "e_change_before_zone",
            selector: { number: { min: 2, max: 50, step: 1, mode: "box" } },
          },
          {
            name: "zone_flap_window_ms",
            label: "e_window_those_change",
            selector: { number: { min: 1000, max: 600000, step: 1000, mode: "box" } },
          },
          {
            name: "bypass_from_can_bypass",
            label: "e_read_can_bypass",
            helper:
              "e_on_by_defaul",
            selector: { boolean: {} },
          },
          {
            name: "bypass_from_can_bypass_when_not_ready",
            label: "e_trust_can_bypass",
            helper:
              "e_off_by_defaul2",
            selector: { boolean: {} },
          },
          {
            name: "allow_safety_bypass",
            label: "e_allow_bypass_smoke",
            helper:
              "e_off_by_defaul3",
            selector: { boolean: {} },
          },
          {
            name: "bypass_action",
            label: "e_bypass_action",
            helper:
              "e_fired_by_bypass",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "unbypass_action",
            label: "e_un_bypass_action",
            helper: "e_fired_by_tappin",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      {
        title: "e_layout",
        icon: "mdi:view-agenda-outline",
        fields: [
          { name: "hero", label: "e_show_shape_state", selector: { boolean: {} } },
          { name: "footnote", label: "e_show_explan_line", selector: { boolean: {} } },
          {
            name: "zones_start_expanded",
            label: "e_start_with_ready",
            selector: { boolean: {} },
          },
          {
            name: "show_unavailable",
            label: "e_list_zones_panel",
            selector: { boolean: {} },
          },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "armed_color",
            label: "e_accent_while_armed",
            helper: "e_worn_by_shape",
            color: true,
            selector: { text: {} },
          },
          { name: "armed_color_on", label: "e_ink_on_accent", color: true, selector: { text: {} } },
          { name: "background", label: "e_card_backgr", color: true, selector: { text: {} } },
          { name: "background_on", label: "e_card_text", color: true, selector: { text: {} } },
          {
            name: "disarmed_icon",
            label: "e_shape_glyph_while",
            selector: { icon: {} },
          },
          {
            name: "triggered_icon",
            label: "e_shape_glyph_while2",
            selector: { icon: {} },
          },
        ],
      },
      {
        title: "e_mode_labels_icons",
        icon: "mdi:text-short",
        expanded: false,
        fields: MODE_OPTIONS.flatMap((m) => [
          { name: `label_${m.value}`, label: `${t(m.label, this.hass)} — ${t("e_label", this.hass)}`, selector: { text: {} } },
          { name: `icon_${m.value}`, label: `${t(m.label, this.hass)} — ${t("e_icon", this.hass)}`, selector: { icon: {} } },
        ]),
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        // Only the SHAPE takes a tap. The mode buttons deliberately have no tap
        // path at all — an alarm that can be armed by a stray tap while
        // scrolling defeats the whole control.
        fields: [
          {
            name: "tap_action",
            label: "e_tappin_shape",
            selector: { ui_action: { default_action: "more-info" } },
          },
        ],
      },
      {
        title: "e_disabled",
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
        label: "e_zone_sensor",
        helper:
          "e_door_window_contac",
        selector: { entity: { domain: ["binary_sensor", "sensor", "lock", "cover", "input_boolean", "switch"] } },
      },
      { name: "name", label: "e_name_option_defaul", selector: { text: {} } },
      { name: "icon", label: "e_icon_option", selector: { icon: {} } },
      {
        name: "safety",
        label: "e_24_hour_zone",
        helper:
          "e_normal_detect_from",
        selector: { boolean: {} },
      },
      {
        name: "transient",
        label: "e_moveme_detect",
        helper:
          "e_overri_automa_guess",
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
    return st?.attributes?.friendly_name || zone.entity || t("e_zone_n", this.hass, { n: i + 1 });
  }

  _renderExtra() {
    const zones = this._zones();
    return html`
      <div class="options-header">
        <span>${t("e_zones", this.hass)}</span>
        <ha-icon-button @click=${this._addZone}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">${t("e_zones_note", this.hass)}</div>

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
                        .schema=${localize(this._zoneSchema, this.hass)}
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
