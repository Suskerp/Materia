import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaSelectHeroEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
  };

  /* Same option-card chrome as the button-group editor — one editing idiom
     for "a list of options" everywhere, instead of a raw YAML blob that
     greeted users with SVG path strings. */
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
      .option-header .glyph-note {
        flex: none;
        font-size: 11px;
        opacity: 0.6;
      }
      .option-body {
        padding: 12px;
      }
      .drag-handle {
        cursor: grab;
        --mdc-icon-size: 18px;
        opacity: 0.5;
      }
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expanded ??= null;
  }

  /* Mirror the card's own defaults so the form shows what it is ACTUALLY
     doing. Absent-means-true options are the dangerous ones: ha-form draws
     `undefined` as OFF, so the toggle would claim a live feature is disabled
     and merely opening the editor and saving would turn it off for real.
     Config still wins, so an explicit false survives. */
  _formData() {
    return { variant: "hero", burst: true, alert_tints_hero: true, ...this._config };
  }

  _sectionsSignature() {
    // The burst toggle exists only on the hero tier — rebuild when it flips.
    return this._config?.variant || "";
  }

  get _sections() {
    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: ["select", "input_select"] } } },
          { name: "name", label: "Eyebrow above the option name", selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            label: "Emphasis",
            helper: "Hero is the filled statement block; sidekick is its quiet companion for pages that already have a hero.",
            selector: { select: { mode: "dropdown", options: [
              { value: "hero", label: "Hero — filled, owns the panel" },
              { value: "sidekick", label: "Sidekick — quiet peer of the bars" },
            ] } },
          },
          // The shell hides the burst on sidekicks unconditionally — the
          // decoration is the hero's statement mark — so on a sidekick this
          // toggle is a no-op and offering it just breaks trust in the form.
          ...(this._config?.variant === "sidekick"
            ? []
            : [{ name: "burst", label: "Show the decorative shape", selector: { boolean: {} } }]),
          { name: "color", label: "Block background", color: true, selector: { text: {} } },
          { name: "color_on", label: "Block text", color: true, selector: { text: {} } },
        ],
      },
      {
        // Inherited from the hero shell, so a mode card can carry the same
        // connected strip as its hero — e.g. "Mop pad still drying".
        title: "Alerts",
        icon: "mdi:alert-circle-outline",
        expanded: false,
        fields: [
          {
            name: "alerts",
            label: "Alert strip",
            helper: "List of { entity?, state?, text (template), icon?, color?, tap_action? }. First match wins. A template that renders empty means no alert.",
            selector: { object: {} },
          },
          { name: "alert_tints_hero", label: "An alert recolours the whole block", selector: { boolean: {} } },
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

  /* Icons in the form, on purpose. The design's route `glyph` (an SVG path on
     a 48x34 grid) stays a YAML-only power feature: a path string in a form
     field is authoring, not configuring. An option that has one keeps it —
     the form leaves unknown keys alone and the header shows a small note so
     nobody wonders where the drawing comes from. */
  get _optionSchema() {
    return [
      { name: "label", label: "Name (the big title when chosen)", selector: { text: {} } },
      { name: "short", label: "Pill label (defaults to the name)", selector: { text: {} } },
      { name: "value", label: "Select option value", selector: { text: {} } },
      { name: "secondary", label: "One line of consequence", selector: { text: {} } },
      { name: "icon", label: "Icon (shown when there is no route glyph)", selector: { icon: {} } },
      { name: "tap_action", label: "Action (overrides selecting the option)", selector: { ui_action: {} } },
    ];
  }

  _renderExtra() {
    return html`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveOption(from, to),
        (this._config.options || []).map(
          (opt, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${opt.label || opt.value || `Option ${i + 1}`}</span>
                ${opt.glyph ? html`<span class="glyph-note">route glyph (YAML)</span>` : ""}
                <ha-icon-button @click=${() => this._toggleExpand(i)}>
                  <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeOption(i)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded === i
                ? html`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${opt}
                        .schema=${this._optionSchema}
                        .computeLabel=${computeLabel}
                        @value-changed=${(e) => this._updateOptionForm(i, e.detail.value)}
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

  _toggleExpand(index) {
    this._expanded = this._expanded === index ? null : index;
  }

  _addOption() {
    const options = [...(this._config.options || []), { label: "", value: "" }];
    this._expanded = options.length - 1;
    this._commit({ ...this._config, options });
  }

  _removeOption(index) {
    const options = [...(this._config.options || [])];
    options.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._commit({ ...this._config, options });
  }

  _moveOption(from, to) {
    const options = [...(this._config.options || [])];
    const [m] = options.splice(from, 1);
    options.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._commit({ ...this._config, options });
  }

  _updateOptionForm(index, value) {
    const options = [...(this._config.options || [])];
    // Spread over the existing option so YAML-only keys (glyph) survive edits.
    options[index] = { ...options[index], ...value };
    this._commit({ ...this._config, options });
  }
}

customElements.define("materia-select-hero-editor", MateriaSelectHeroEditor);
