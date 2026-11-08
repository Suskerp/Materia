import { html, css } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";

class MateriaLockEditor extends SmartEditorBase {
  static styles = [
    SmartEditorBase.styles,
    css`
      .remap-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
      }
      .remap-row ha-textfield {
        flex: 1;
        min-width: 0;
      }
      .remap-arrow {
        flex: none;
        opacity: 0.5;
        --mdc-icon-size: 18px;
      }
      .remap-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
      }
    `,
  ];

  /* Switches must be seeded with the card's own defaults. An option that
     defaults to TRUE but is absent from config arrives as `undefined`, which
     ha-form draws as OFF — so the toggle claims the feature is disabled when it
     is actually on, and merely opening the editor and saving would turn it off
     for real. Config still wins, so an explicit false survives. */
  _formData() {
    return { gesture: "slide", shape: true, shape_style: "cookie9", initial_locked: true, unlock_service: "unlock", ...this._config };
  }

  /* Fields appear and disappear with the gesture and with whether an entity is
     set, so the memoized sections have to be invalidated on both. */
  _sectionsSignature() {
    return `${this._config?.gesture || "slide"}|${this._config?.entity?.split(".")[0] || ""}|${this._config?.open_action ? "o" : ""}`;
  }

  get _sections() {
    const hold = this._config?.gesture === "hold";
    const hasEntity = !!this._config?.entity;
    const isLock = !!this._config?.entity?.startsWith("lock.");
    const hasOpenButton = !!this._config?.open_action;

    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "entity",
            label: "e_lock_option",
            helper: "e_leave_empty_run",
            selector: { entity: { domain: ["lock", "switch", "input_boolean"] } },
          },
          ...(isLock
            ? [{
                name: "unlock_service",
                label: "e_unlatc_servic",
                helper: "e_open_for_strike",
                selector: { select: { mode: "dropdown", options: [
                  { value: "unlock", label: "e_unlock_lock_unlock" },
                  { value: "open", label: "e_open_lock_open" },
                ] } },
              }]
            : []),
          {
            name: "gesture",
            label: "e_commit_gestur",
            selector: { select: { mode: "dropdown", options: [
              { value: "slide", label: "e_slide_handle_across" },
              { value: "hold", label: "e_press_hold" },
            ] } },
          },
          { name: "shape", label: "e_show_morphi_lock", selector: { boolean: {} } },
          /* No silhouette picker for now: the cookie is the ONE shape whose
             symmetry period lets the in-flight spin land gracefully, so it is
             the shape the card ships with. shape_style stays supported in YAML
             (squircle/pill/gem still render) — the choice is just no longer
             advertised until another silhouette earns its place. */
        ],
      },
      {
        title: "e_open_button",
        icon: "mdi:door-open",
        expanded: hasOpenButton,
        fields: [
          {
            name: "open_action",
            label: "e_open_action",
            helper: "e_separa_extra_action",
            selector: { ui_action: { default_action: "none" } },
          },
          ...(hasOpenButton
            ? [
                { name: "open_button_icon", label: "e_icon_defaul_door", selector: { icon: {} } },
                { name: "open_button_label", label: "e_label_defaul_open", selector: { text: {} } },
              ]
            : []),
        ],
      },
      {
        title: "e_behaviour",
        icon: "mdi:cog-outline",
        fields: [
          ...(hold
            ? [{
                name: "hold_ms",
                label: "e_hold_for_ms",
                helper: "e_keep_above_500ms",
                selector: { number: { min: 300, max: 5000, step: 50, mode: "box" } },
              }]
            : []),
          ...(hasEntity
            ? [
                {
                  name: "locked_state",
                  label: "e_state_means_locked",
                  helper: "e_defaul_locked_for",
                  selector: { text: {} },
                },
                {
                  name: "pending_timeout_ms",
                  label: "e_give_up_waitin3",
                  selector: { number: { min: 1000, max: 60000, step: 500, mode: "box" } },
                },
              ]
            : [{
                name: "initial_locked",
                label: "e_start_out_locked",
                selector: { boolean: {} },
              }]),
        ],
      },
      {
        title: "e_labels",
        icon: "mdi:text-short",
        fields: [
          ...(hold
            ? [
                { name: "unlock_hold_hint", label: "e_while_locked_defaul", selector: { text: {} } },
                { name: "lock_hold_hint", label: "e_while_unlock_defaul", selector: { text: {} } },
              ]
            : [
                { name: "unlock_hint", label: "e_while_locked_defaul2", selector: { text: {} } },
                { name: "lock_hint", label: "e_while_unlock_defaul2", selector: { text: {} } },
              ]),
          ...(hasEntity
            ? [
                { name: "locking_label", label: "e_while_lockin_defaul", selector: { text: {} } },
                { name: "unlocking_label", label: "e_while_unlock_defaul3", selector: { text: {} } },
                { name: "jammed_label", label: "e_when_jammed_defaul", selector: { text: {} } },
              ]
            : [{ name: "demo_label", label: "e_self_contai_note", selector: { text: {} } }]),
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "unlocked_color", label: "e_backgr_while_unlock", color: true, selector: { text: {} } },
          { name: "unlocked_color_on", label: "e_text_while_unlock", color: true, selector: { text: {} } },
          { name: "locked_color", label: "e_backgr_while_locked", color: true, selector: { text: {} } },
          { name: "locked_color_on", label: "e_text_while_locked", color: true, selector: { text: {} } },
          { name: "accent", label: "e_accent_locked_glyph", color: true, selector: { text: {} } },
          { name: "accent_on", label: "e_ink_on_accent2", color: true, selector: { text: {} } },
          { name: "locked_icon", label: "e_icon_while_locked", selector: { icon: {} } },
          { name: "unlocked_icon", label: "e_icon_while_unlock", selector: { icon: {} } },
          ...(hasEntity
            ? [
                {
                  name: "open_icon",
                  label: "e_icon_while_litera",
                  helper: "e_rides_on_top",
                  selector: { icon: {} },
                },
                { name: "jammed_color", label: "e_backgr_while_jammed", color: true, selector: { text: {} } },
                { name: "jammed_color_on", label: "e_text_while_jammed", color: true, selector: { text: {} } },
                { name: "jammed_icon", label: "e_icon_while_jammed", selector: { icon: {} } },
              ]
            : []),
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        // Only the SHAPE takes a tap. The gesture track deliberately has none —
        // a lock that can be thrown by a stray tap defeats the whole control.
        fields: [{ name: "tap_action", label: "e_tappin_shape", selector: { ui_action: { default_action: "more-info" } } }],
      },
    ];
  }

  /** Only rendered when there's an entity — the list itself, in `_renderExtra`
   *  below the standard sections, since a from->to map isn't a `selector`
   *  the shared field renderer knows how to draw. */
  get _showRemapList() {
    return !!this._config?.entity;
  }

  _remapEntries() {
    const map = this._config?.state_remap || {};
    return Object.entries(map).map(([from, to]) => ({ from, to }));
  }

  _commitRemap(entries) {
    const map = {};
    for (const e of entries) if (e.from) map[e.from] = e.to ?? "";
    this._commit({ ...this._config, state_remap: map });
  }

  _addRemap() {
    this._commitRemap([...this._remapEntries(), { from: "", to: "" }]);
  }

  _removeRemap(i) {
    const entries = [...this._remapEntries()];
    entries.splice(i, 1);
    this._commitRemap(entries);
  }

  _updateRemapFrom(i, value) {
    const entries = [...this._remapEntries()];
    entries[i] = { ...entries[i], from: value };
    this._commitRemap(entries);
  }

  _updateRemapTo(i, value) {
    const entries = [...this._remapEntries()];
    entries[i] = { ...entries[i], to: value };
    this._commitRemap(entries);
  }

  _renderExtra() {
    if (!this._showRemapList) return "";
    const entries = this._remapEntries();
    return html`
      <div class="options-header" style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-weight:600;font-size:14px;">
        <span>${t("e_state_skips", this.hass)}</span>
        <ha-icon-button @click=${this._addRemap}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="remap-note">${t("e_state_skips_note", this.hass)}</div>
      ${entries.map(
        (e, i) => html`
          <div class="remap-row">
            <ha-textfield
              .label=${t("e_from_raw", this.hass)}
              .value=${e.from}
              @change=${(ev) => this._updateRemapFrom(i, ev.target.value)}
            ></ha-textfield>
            <ha-icon class="remap-arrow" icon="mdi:arrow-right"></ha-icon>
            <ha-textfield
              .label=${t("e_to", this.hass)}
              .value=${e.to}
              @change=${(ev) => this._updateRemapTo(i, ev.target.value)}
            ></ha-textfield>
            <ha-icon-button @click=${() => this._removeRemap(i)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `
      )}
    `;
  }
}

customElements.define("materia-lock-editor", MateriaLockEditor);
