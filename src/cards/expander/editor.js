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
    return { collapsible: true, expanded: false, show_switch: true, flat: false, ...this._config };
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
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "e_entity_option",
            helper: "e_with_entity_header",
            selector: { entity: {} },
          },
          {
            name: "name",
            label: hasEntity ? "e_name_tpl_default" : "e_name_tpl",
            required: !hasEntity,
            // The other half of the same inconsistency: the card resolved
            // secondary and not name, and the editor offered template mode for
            // secondary and not name. Both now match.
            template: true,
            selector: { text: {} },
          },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "secondary", label: "e_second_text_templa", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_behaviour",
        icon: "mdi:arrow-expand-vertical",
        fields: [
          { name: "expanded", label: "e_open_by_defaul", selector: { boolean: {} } },
          { name: "collapsible", label: "ed_expander_collapsible", selector: { boolean: {} } },
          {
            name: "show_switch",
            label: "e_show_switch_in",
            helper: "e_only_applie_when",
            selector: { boolean: {} },
          },
          { name: "flat", label: "e_flat_no_card", selector: { boolean: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_row_color_escala", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon_color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color", label: "e_switch_track_color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color_on", label: "e_switch_thumb_color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          {
            name: "tap_action",
            label: "e_switch_action_overri",
            selector: { ui_action: { default_action: "toggle" } },
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

  _cards() {
    return Array.isArray(this._config?.cards) ? this._config.cards : [];
  }

  /** Heading and hint above the card list; container editors that reuse this list override them. */
  get _cardsTitle() {
    return "e_behind_chevron";
  }

  get _cardsHint() {
    return "e_behind_chevron_hint";
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
