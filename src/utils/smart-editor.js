import { LitElement, html, css } from "lit";
import { computeLabel } from "./editor-helpers.js";
import { COLOR_GROUPS, COLOR_VALUES } from "./palette.js";

/** Jinja2 template detection — mirrors the cards' own _isTemplate(). */
export function isTemplate(val) {
  return val && typeof val === "string" && (val.includes("{{") || val.includes("{%"));
}

/* ------------------------------------------------------------------ */
/*  Material You color picker                                          */
/*                                                                     */
/*  A field-styled trigger (swatch + friendly name) that expands an    */
/*  inline, scrollable, grouped list — theme palette first, then a     */
/*  "Custom…" escape hatch to a free CSS value. Inline (not a popup)   */
/*  so it never clips inside the editor's expansion panels.            */
/*  Emits value-changed { value }.                                     */
/* ------------------------------------------------------------------ */
export class MateriaColorPicker extends LitElement {
  static properties = {
    label: {},
    value: {},
    _open: { state: true },
    _customOpen: { state: true },
  };

  static styles = css`
    :host { display: block; }

    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 0 0 4px 4px;
    }

    .trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 11px 12px;
      border: none;
      border-bottom: 1px solid var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42));
      border-radius: 4px 4px 0 0;
      background: var(--mdc-text-field-fill-color, rgba(0, 0, 0, 0.06));
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
      cursor: pointer;
      text-align: left;
    }
    .trigger.open {
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 10px;
    }
    .trigger .value { flex: 1; min-width: 0; }
    .chev { color: var(--secondary-text-color); }

    .panel {
      margin-top: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 10px;
      max-height: 320px;
      overflow-y: auto;
      background: var(--card-background-color, var(--ha-card-background, #1c1c1c));
      padding: 4px 0;
    }

    .grp {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      padding: 12px 12px 4px;
    }

    .opt {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      padding: 9px 12px;
      border: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
    }
    .opt:hover { background: var(--secondary-background-color, rgba(0, 0, 0, 0.06)); }
    .opt.sel { background: rgba(var(--rgb-primary-color, 98, 0, 238), 0.14); font-weight: 600; }
    .opt-label { flex: 1; min-width: 0; }

    .swatch {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      flex-shrink: 0;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.25));
    }
    .swatch.none {
      border-style: dashed;
      background: transparent;
    }

    .check { color: var(--primary-color); --mdc-icon-size: 18px; }
    .cust-ic { color: var(--secondary-text-color); --mdc-icon-size: 18px; width: 18px; }

    ha-textfield { display: block; width: 100%; margin-top: 8px; }
  `;

  get _isCustom() {
    return !!this.value && !COLOR_VALUES.has(this.value);
  }

  _option(value) {
    for (const g of COLOR_GROUPS) {
      const found = g.options.find((o) => o.value === value);
      if (found) return found;
    }
    return null;
  }

  get _currentLabel() {
    if (!this.value) return "Default";
    const opt = this._option(this.value);
    return opt ? opt.label : "Custom";
  }

  get _currentHex() {
    if (!this.value) return null;
    const opt = this._option(this.value);
    return opt ? opt.swatch : this.value;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeOutside();
  }

  render() {
    const hex = this._currentHex;
    const check = html`<ha-icon class="check" icon="mdi:check"></ha-icon>`;
    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : ""}
      <button type="button" class="trigger ${this._open ? "open" : ""}" @click=${this._toggle}>
        <span class="swatch ${hex ? "" : "none"}" style=${hex ? `background:${hex}` : ""}></span>
        <span class="value">${this._currentLabel}</span>
        <ha-icon class="chev" icon=${this._open ? "mdi:menu-up" : "mdi:menu-down"}></ha-icon>
      </button>

      ${this._open
        ? html`
            <div class="panel">
              <button type="button" class="opt ${!this.value ? "sel" : ""}" @click=${() => this._pick("")}>
                <span class="swatch none"></span>
                <span class="opt-label">Default (automatic)</span>
                ${!this.value ? check : ""}
              </button>
              ${COLOR_GROUPS.map(
                (g) => html`
                  <div class="grp">${g.title}</div>
                  ${g.options.map(
                    (o) => html`
                      <button type="button" class="opt ${this.value === o.value ? "sel" : ""}" @click=${() => this._pick(o.value)}>
                        <span class="swatch" style="background:${o.swatch};"></span>
                        <span class="opt-label">${o.label}</span>
                        ${this.value === o.value ? check : ""}
                      </button>
                    `
                  )}
                `
              )}
              <button type="button" class="opt ${this._isCustom ? "sel" : ""}" @click=${this._chooseCustom}>
                <ha-icon class="cust-ic" icon="mdi:eyedropper-variant"></ha-icon>
                <span class="opt-label">Custom…</span>
                ${this._isCustom ? check : ""}
              </button>
            </div>
          `
        : ""}

      ${this._isCustom || this._customOpen
        ? html`
            <ha-textfield
              label="Custom CSS color"
              placeholder="#ff8800 · rgb(…) · var(--…)"
              .value=${this._isCustom ? this.value : ""}
              @input=${this._onCustomInput}
            ></ha-textfield>
          `
        : ""}
    `;
  }

  _toggle() {
    this._open = !this._open;
    if (this._open) {
      this._outside = (e) => {
        if (!e.composedPath().includes(this)) {
          this._open = false;
          this._removeOutside();
        }
      };
      document.addEventListener("click", this._outside, true);
    } else {
      this._removeOutside();
    }
  }

  _removeOutside() {
    if (this._outside) {
      document.removeEventListener("click", this._outside, true);
      this._outside = null;
    }
  }

  _pick(value) {
    this._open = false;
    this._customOpen = false;
    this._removeOutside();
    this._emit(value);
  }

  _chooseCustom() {
    this._open = false;
    this._customOpen = true;
    this._removeOutside();
  }

  _onCustomInput(ev) {
    this._emit(ev.target.value);
  }

  _emit(value) {
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-color-picker", MateriaColorPicker);

/* ------------------------------------------------------------------ */
/*  SmartEditorBase                                                    */
/*                                                                     */
/*  Subclasses provide `get _sections()` returning:                    */
/*    [{ title, icon?, secondary?, expanded?, fields: [field] }]       */
/*  where each field is:                                               */
/*    { name, label?, helper?, required?,                              */
/*      selector,            // the friendly selector ({ icon:{} } …)   */
/*      template?: true,     // adds a </> toggle → {{ template }}      */
/*      color?: true,        // friendly mode uses materia-color-picker */
/*      context? }                                                     */
/*                                                                     */
/*  Optional hooks:                                                    */
/*    _formData()       → values used for display (apply defaults)     */
/*    _renderExtra(data)→ extra UI appended after the sections         */
/* ------------------------------------------------------------------ */
export class SmartEditorBase extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    _config: { state: true },
    _modes: { state: true },
  };

  static styles = css`
    :host { display: block; }

    ha-expansion-panel {
      display: block;
      margin-bottom: 12px;
      border-radius: 12px;
      --expansion-panel-content-padding: 0;
    }

    .section-body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 16px 16px;
    }

    .field {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-control {
      flex: 1;
      min-width: 0;
    }

    .tpl-toggle {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      --mdc-icon-button-size: 40px;
      --mdc-icon-size: 20px;
    }
    .tpl-toggle.active {
      color: var(--primary-color);
    }
  `;

  setConfig(config) {
    this._config = config;
    this._modes = {};
  }

  /** Values to render — subclasses may override to inject defaults. */
  _formData() {
    return this._config || {};
  }

  get _sections() {
    return [];
  }

  /* ---- mode (simple vs template) per field ---------------------- */

  _modeFor(name, value) {
    const m = this._modes?.[name];
    if (m) return m;
    return isTemplate(value) ? "template" : "simple";
  }

  _toggleMode(name) {
    const value = this._formData()[name];
    const cur = this._modeFor(name, value);
    this._modes = { ...(this._modes || {}), [name]: cur === "template" ? "simple" : "template" };
  }

  /* ---- rendering ------------------------------------------------ */

  render() {
    if (!this.hass || !this._config) return html``;
    const data = this._formData();
    return html`
      ${this._sections.map((s) => this._renderSection(s, data))}
      ${this._renderExtra ? this._renderExtra(data) : ""}
    `;
  }

  _renderSection(section, data) {
    return html`
      <ha-expansion-panel
        outlined
        .header=${section.title}
        .secondary=${section.secondary || ""}
        .expanded=${section.expanded ?? true}
      >
        ${section.icon
          ? html`<ha-icon slot="leading-icon" .icon=${section.icon}></ha-icon>`
          : ""}
        <div class="section-body">
          ${(section.fields || []).map((f) => this._renderField(f, data))}
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderField(field, data) {
    const value = data[field.name];
    const label = field.label ?? computeLabel(field);
    const templatable = !!field.template;
    const mode = templatable ? this._modeFor(field.name, value) : "simple";
    // Resolve context references to their live data values, like ha-form does
    // (e.g. { icon_entity: "entity" } → { icon_entity: "light.kitchen" }).
    const context = field.context
      ? Object.fromEntries(Object.entries(field.context).map(([k, v]) => [k, data[v]]))
      : undefined;

    let control;
    if (templatable && mode === "template") {
      control = html`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${{ template: {} }}
          .value=${value}
          .label=${label}
          .required=${!!field.required}
        ></ha-selector>
      `;
    } else if (field.color) {
      control = html`
        <materia-color-picker
          class="field-control"
          .label=${label}
          .value=${value || ""}
        ></materia-color-picker>
      `;
    } else {
      control = html`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${field.selector}
          .value=${value}
          .label=${label}
          .helper=${field.helper}
          .context=${context}
          .required=${!!field.required}
        ></ha-selector>
      `;
    }

    return html`
      <div class="field" @value-changed=${(e) => this._fieldChanged(field.name, e)}>
        ${control}
        ${templatable
          ? html`
              <ha-icon-button
                class="tpl-toggle ${mode === "template" ? "active" : ""}"
                .label=${mode === "template" ? "Use simple input" : "Use a template"}
                @click=${() => this._toggleMode(field.name)}
              >
                <ha-icon icon="mdi:code-braces"></ha-icon>
              </ha-icon-button>
            `
          : ""}
      </div>
    `;
  }

  /* ---- config plumbing ------------------------------------------ */

  _fieldChanged(name, ev) {
    ev.stopPropagation();
    this._setField(name, ev.detail?.value);
  }

  _setField(name, value) {
    const next = { ...this._config };
    if (value === "" || value === undefined || value === null) delete next[name];
    else next[name] = value;
    this._commit(next);
  }

  _commit(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
