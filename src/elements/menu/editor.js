import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaMenuEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = { ...config };
  }

  get _schema() {
    return [
      { name: "entity", selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "position", selector: { select: { options: [
        { value: "below", label: "Below" },
        { value: "above", label: "Above" },
      ], mode: "dropdown" } } },
    ];
  }

  get _optionSchema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "value", required: true, selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ];
  }

  static styles = css`
    .options-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .option-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .option-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
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
  `;

  _expanded = null;

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options || []).map(
        (opt, i) => html`
          <div class="option-card">
            <div class="option-header">
              <span>${opt.label || opt.value || `Option ${i + 1}`}</span>
              <ha-icon-button @click=${() => this._moveOption(i, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._moveOption(i, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </ha-icon-button>
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
      )}
    `;
  }

  _valueChanged(ev) {
    const updated = { ...this._config, ...ev.detail.value };
    this._config = updated;
    this._fireConfigChanged(updated);
  }

  _addOption() {
    const options = [...(this._config.options || []), { label: "", value: "", icon: "" }];
    const updated = { ...this._config, options };
    this._config = updated;
    this._expanded = options.length - 1;
    this._fireConfigChanged(updated);
  }

  _removeOption(index) {
    const options = [...(this._config.options || [])];
    options.splice(index, 1);
    const updated = { ...this._config, options };
    this._config = updated;
    if (this._expanded === index) this._expanded = null;
    this._fireConfigChanged(updated);
  }

  _moveOption(index, direction) {
    const options = [...(this._config.options || [])];
    const target = index + direction;
    if (target < 0 || target >= options.length) return;
    [options[index], options[target]] = [options[target], options[index]];
    const updated = { ...this._config, options };
    this._config = updated;
    if (this._expanded === index) this._expanded = target;
    this._fireConfigChanged(updated);
  }

  _updateOptionForm(index, value) {
    const options = [...(this._config.options || [])];
    options[index] = { ...options[index], ...value };
    const updated = { ...this._config, options };
    this._config = updated;
    this._fireConfigChanged(updated);
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
    this.requestUpdate();
  }

  _fireConfigChanged(config) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("materia-menu-editor", MateriaMenuEditor);
