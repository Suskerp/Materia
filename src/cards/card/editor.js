import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase, isTemplate } from "../../utils/smart-editor.js";
import { localize, t } from "../../utils/i18n.js";

const DOMAINS_WITH_SUB_BUTTONS = new Set(["cover"]);

/** Apply implicit defaults so the form reflects runtime behavior. */
export function applyCardFormDefaults(config) {
  if (!config?.entity) return { ...config };
  const domain = config.entity.split(".")[0];
  const defaults = { show_sub_buttons: false, show_stop: true, show_state: true, subtitle_inline: true };
  if (DOMAINS_WITH_SUB_BUTTONS.has(domain)) defaults.show_sub_buttons = true;
  // Mirror the runtime's auto-slider (dimmable light / cover) so the toggle
  // reflects what actually renders.
  if (domain === "light" || domain === "cover") defaults.show_slider = true;
  return { ...defaults, ...config };
}

export class MateriaCardEditor extends SmartEditorBase {
  static properties = {
    _expandedButton: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 4px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        cursor: pointer;
      }
      .button-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
      }
      .button-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `,
  ];

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("light.")) || "light.example";
    return { entity };
  }

  setConfig(config) {
    super.setConfig(config);
    this._expandedButton ??= null;
  }

  _formData() {
    return applyCardFormDefaults(this._config);
  }

  _sectionsSignature() {
    return this._config?.entity?.split(".")[0] || "";
  }

  get _sections() {
    const domain = this._config?.entity?.split(".")[0];
    const isCover = domain === "cover";
    const isLight = domain === "light";
    const hasSlider = isLight || isCover;

    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", selector: { entity: {} } },
          { name: "name", template: true, selector: { text: {} } },
          { name: "subtitle", template: true, selector: { text: {} } },
          {
            name: "icon",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
          { name: "image", label: "e_image_replac_icon", template: true, selector: { text: {} } },
          { name: "fallback_image", label: "e_fallba_image_shown", selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_active_backgr", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_active_text_icon", color: true, template: true, selector: { text: {} } },
          { name: "show_state", template: true, selector: { boolean: {} } },
          { name: "show_last_changed", label: "e_show_last_change", selector: { boolean: {} } },
          { name: "subtitle_inline", label: "e_subtit_inline_with", selector: { boolean: {} } },
          ...(hasSlider ? [{ name: "show_slider", selector: { boolean: {} } }] : []),
          ...(isLight ? [{ name: "slider_turn_off", label: "e_slider_can_turn", selector: { boolean: {} } }] : []),
          { name: "show_sub_buttons", selector: { boolean: {} } },
          ...(isCover ? [{ name: "show_stop", label: "e_show_stop", selector: { boolean: {} } }] : []),
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
        ],
      },
    ];
  }

  /* ---- Sub-buttons manager (appended after sections) ------------ */

  _subButtonSchema(btn) {
    const iconIsTemplate = isTemplate(btn?.icon);
    return [
      iconIsTemplate
        ? { name: "icon", required: true, selector: { template: {} } }
        : { name: "icon", required: true, selector: { icon: {} } },
      { name: "name", label: "e_label_option", selector: { text: {} } },
      { name: "tap_action", label: "sched_action", selector: { ui_action: {} } },
    ];
  }

  _renderExtra() {
    const subButtons = Array.isArray(this._config.sub_buttons) ? this._config.sub_buttons : [];
    return html`
      <div class="section-header">
        <span>${t("e_custom_subbuttons", this.hass)}</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${subButtons.map(
        (btn, i) => html`
          <div class="button-card">
            <div class="button-header" @click=${() => this._toggleButton(i)}>
              <span>${btn.name || (btn.icon && !isTemplate(btn.icon) ? btn.icon : t("e_button_n", this.hass, { n: i + 1 }))}</span>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._toggleButton(i); }}>
                <ha-icon icon=${this._expandedButton === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._removeButton(i); }}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton === i
              ? html`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${btn}
                      .schema=${localize(this._subButtonSchema(btn), this.hass)}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._subButtonChanged(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}
    `;
  }

  _toggleButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _addButton() {
    const buttons = [...(this._config.sub_buttons || []), { icon: "mdi:star" }];
    this._commit({ ...this._config, sub_buttons: buttons });
    this._expandedButton = buttons.length - 1;
  }

  _removeButton(i) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    const next = { ...this._config };
    if (buttons.length === 0) delete next.sub_buttons;
    else next.sub_buttons = buttons;
    this._commit(next);
  }

  _subButtonChanged(i, value) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons[i] = { ...buttons[i], ...value };
    this._commit({ ...this._config, sub_buttons: buttons });
  }
}

customElements.define("materia-card-editor", MateriaCardEditor);
