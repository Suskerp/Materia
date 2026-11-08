import { html, css } from "lit";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import "../../utils/card-list-editor.js";

export class MateriaExpanderEditor extends SmartEditorBase {
  static styles = [
    SmartEditorBase.styles,
    css`
      materia-card-list-editor {
        margin-top: 8px;
      }
    `,
  ];

  /** Every boolean the card defaults to TRUE has to be seeded, or an absent
   *  key arrives undefined, ha-form draws the switch off, and merely opening
   *  and saving the editor would silently write show_switch: false. */
  _formData() {
    return { expanded: false, show_switch: true, flat: false, ...this._config };
  }

  /** The name field is only required while there is no entity to borrow a
   *  friendly name from — which makes the schema config-dependent. */
  _sectionsSignature() {
    return this._config?.entity ? "entity" : "no-entity";
  }

  get _sections() {
    const hasEntity = !!this._config?.entity;
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "Entity (optional)",
            helper: "With an entity the header wears an M3 switch and its state tones the row. Leave empty for a plain drawer.",
            selector: { entity: {} },
          },
          {
            name: "name",
            label: hasEntity ? "Name / template (defaults to the friendly name)" : "Name / template",
            required: !hasEntity,
            // The other half of the same inconsistency: the card resolved
            // secondary and not name, and the editor offered template mode for
            // secondary and not name. Both now match.
            template: true,
            selector: { text: {} },
          },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "secondary", label: "Secondary text / template", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Behaviour",
        icon: "mdi:arrow-expand-vertical",
        fields: [
          { name: "expanded", label: "Open by default", selector: { boolean: {} } },
          {
            name: "show_switch",
            label: "Show the switch in the header",
            helper: "Only applies when an entity is set.",
            selector: { boolean: {} },
          },
          { name: "flat", label: "Flat (no card chrome — for nesting)", selector: { boolean: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Row color (e.g. escalate from state)", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / icon color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color", label: "Switch track color when on", color: true, template: true, selector: { text: {} } },
          { name: "switch_color_on", label: "Switch thumb color when on", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          {
            name: "tap_action",
            label: "Switch action (overrides toggling the entity)",
            selector: { ui_action: { default_action: "toggle" } },
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

  _cards() {
    return Array.isArray(this._config?.cards) ? this._config.cards : [];
  }

  /** Heading and hint above the card list; container editors that reuse this list override them. */
  get _cardsTitle() {
    return "Behind the chevron";
  }

  get _cardsHint() {
    return "These cards appear when the row is opened. The chevron only shows once there is at least one.";
  }

  _renderExtra() {
    return html`<materia-card-list-editor
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cards=${this._cards()}
      .label=${this._cardsTitle}
      .hint=${this._cardsHint}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._commit({ ...this._config, cards: e.detail.value });
      }}
    ></materia-card-list-editor>`;
  }
}

customElements.define("materia-expander-editor", MateriaExpanderEditor);
