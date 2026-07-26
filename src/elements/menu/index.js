import { LitElement, html, render } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaMenu extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
    _optimisticValue: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
    _resolvedSubstate: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-menu-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(
      (e) => e.startsWith("input_select.") || e.startsWith("select.")
    ) || "";
    return { entity };
  }

  setConfig(config) {
    this.config = { position: "auto", ...config };
    this._open = false;
  }

  get _resolvedOptions() {
    if (this.config.options?.length) return this.config.options;
    const stateObj = this.hass?.states[this.config.entity];
    const domain = this.config.entity?.split(".")[0];
    if ((domain === "input_select" || domain === "select") && stateObj?.attributes?.options) {
      return stateObj.attributes.options.map((opt) => ({
        label: this._capitalize(opt),
        value: opt,
      }));
    }
    if (domain === "water_heater" && stateObj?.attributes?.operation_list) {
      const ICONS = {
        eco: "mdi:leaf",
        performance: "mdi:speedometer",
        electric: "mdi:lightning-bolt",
        gas: "mdi:fire",
        heat_pump: "mdi:heat-pump-outline",
        high_demand: "mdi:water-plus",
        off: "mdi:power",
      };
      return stateObj.attributes.operation_list.map((opt) => ({
        label: this._capitalize(opt),
        value: opt,
        icon: ICONS[opt],
      }));
    }
    return [];
  }

  /** Effective open direction. position: "auto" (default) measures the
   *  viewport at open time — below if the menu fits (or below has more room),
   *  above otherwise. Explicit "below"/"above" always win. */
  get _pos() {
    if (this.config.position === "above" || this.config.position === "below") {
      return this.config.position;
    }
    return this._effPos ?? "below";
  }

  _computeEffPos() {
    const trigger = this.shadowRoot?.querySelector(".trigger");
    if (!trigger) return "below";
    const r = trigger.getBoundingClientRect();
    const est = Math.min(this._resolvedOptions.length * 56 + 20, Math.min(600, window.innerHeight * 0.7));
    const spaceBelow = window.innerHeight - r.bottom;
    return spaceBelow >= est + 8 || spaceBelow >= r.top ? "below" : "above";
  }

  get _currentValue() {
    if (this._optimisticValue != null) return this._optimisticValue;
    return this.hass?.states[this.config.entity]?.state ?? "";
  }

  /** Optional secondary text shown after the state, e.g. "Playing • Spotify".
   *  Source order: substate (literal/template) → substate_entity(+attribute). */
  get _substate() {
    const cfg = this.config;
    if (cfg.substate != null && cfg.substate !== "") {
      return this._isTemplate(cfg.substate) ? (this._resolvedSubstate ?? "") : cfg.substate;
    }
    if (cfg.substate_entity) {
      const so = this.hass?.states[cfg.substate_entity];
      if (!so) return "";
      const raw = cfg.substate_attribute ? so.attributes?.[cfg.substate_attribute] : so.state;
      return raw == null ? "" : String(raw);
    }
    return "";
  }

  _toggle() {
    if (!this._open) this._effPos = this._computeEffPos();
    this._open = !this._open;
  }

  _selectOption(opt) {
    const value = opt.value;
    this._optimisticValue = value;
    this._open = false;

    const domain = this.config.entity?.split(".")[0];
    if (domain === "input_select" || domain === "select") {
      this._callService(domain, "select_option", {
        entity_id: this.config.entity,
        option: value,
      });
    } else if (domain === "water_heater") {
      this._callService("water_heater", "set_operation_mode", {
        entity_id: this.config.entity,
        operation_mode: value,
      });
    }

    clearTimeout(this._optimisticTimer);
    this._optimisticTimer = setTimeout(() => {
      this._optimisticValue = null;
    }, 10000);
  }

  connectedCallback() {
    super.connectedCallback();
    // Close when clicking anywhere outside the trigger AND outside the portal.
    this._outsideClickHandler = (e) => {
      if (!this._open) return;
      const path = e.composedPath?.() || [];
      if (path.includes(this) || (this._portal && path.includes(this._portal))) return;
      this._open = false;
    };
    document.addEventListener("click", this._outsideClickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._outsideClickHandler);
    clearTimeout(this._optimisticTimer);
    clearTimeout(this._portalTimer);
    this._detachReposition();
    this._removePortal();
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("name", "_resolvedName");
      this._resolveField("substate", "_resolvedSubstate");
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
    }
    if (changedProps.has("hass") && this._optimisticValue != null) {
      const actual = this.hass?.states[this.config.entity]?.state;
      if (actual === this._optimisticValue) {
        this._optimisticValue = null;
        clearTimeout(this._optimisticTimer);
      }
    }

    if (changedProps.has("_open")) {
      if (this._open) this._openPortal();
      else this._closePortal();
    } else if (this._open && this._portalRoot && !this._closing) {
      // Keep the open panel's selection / colors fresh on state updates.
      this._renderPortal();
      this._positionPortal();
    }
  }

  /** Find the state_colors entry matching the current state (string or list). */
  _matchStateColor(state) {
    const sc = this.config.state_colors;
    const list = Array.isArray(sc)
      ? sc
      : Object.entries(sc).map(([s, v]) =>
          typeof v === "string" ? { state: s, color: v } : { state: s, ...v }
        );
    return list.find((e) =>
      Array.isArray(e.state)
        ? e.state.map(String).includes(String(state))
        : String(e.state) === String(state)
    );
  }

  /** Resolve trigger/panel colors from config + state_colors. */
  _colors() {
    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const currentValue = this._currentValue;
    let bg = this._resolvedColor || this.config.color;
    let fg = this._resolvedColorOn || this.config.color_on;
    const sc = this.config.state_colors ? this._matchStateColor(currentValue) : null;
    if (sc) {
      if (sc.color) bg = sc.color;
      if (sc.color_on) fg = sc.color_on;
    }
    const colored = !unavailable && (bg || fg);
    const triggerStyle = colored
      ? `${bg ? `background-color:${bg};` : ""}${fg ? `color:${fg};` : ""}`
      : "";
    // Feed the panel color into --_surf so the opaque-stacking backdrop builds
    // from THIS color (not the default surface).
    const panelStyle =
      `${bg ? `--_surf:${bg};` : ""}` +
      (colored && fg
        ? `${triggerStyle}--menu-selected-bg:color-mix(in srgb, ${fg} 22%, transparent);--menu-selected-fg:${fg};`
        : triggerStyle);
    return { stateObj, unavailable, currentValue, colored, triggerStyle, panelStyle };
  }

  /* ---- Top-layer portal ----------------------------------------- */
  /* The dropdown is rendered into a body-level element so it escapes any
     ancestor stacking context (e.g. a swipe/carousel card's pagination, or an
     overflow container). It carries its own shadow root with the same adopted
     styles, and we copy the live theme custom properties onto it because a
     body-level node won't otherwise inherit them. */

  _ensurePortal() {
    if (this._portal) return;
    const host = document.createElement("div");
    host.className = "materia-menu-portal";
    host.style.cssText = "position:fixed; z-index:1000; pointer-events:auto;";
    const root = host.attachShadow({ mode: "open" });
    const sheets = Array.isArray(styles) ? styles : [styles];
    if ("adoptedStyleSheets" in root && sheets.every((s) => s.styleSheet)) {
      root.adoptedStyleSheets = sheets.map((s) => s.styleSheet);
    } else {
      const styleEl = document.createElement("style");
      styleEl.textContent = sheets.map((s) => s.cssText).join("\n");
      root.appendChild(styleEl);
    }
    document.body.appendChild(host);
    this._portal = host;
    this._portalRoot = root;
  }

  _removePortal() {
    if (this._portal) {
      this._portal.remove();
      this._portal = null;
      this._portalRoot = null;
    }
  }

  /** Copy the menu's resolved CSS custom properties onto the body-level host. */
  _syncThemeVars() {
    if (!this._portal) return;
    const cs = getComputedStyle(this);
    for (let i = 0; i < cs.length; i++) {
      const prop = cs[i];
      if (prop.charCodeAt(0) === 45 && prop.charCodeAt(1) === 45) {
        this._portal.style.setProperty(prop, cs.getPropertyValue(prop));
      }
    }
  }

  _positionPortal() {
    if (!this._portal) return;
    const trigger = this.shadowRoot?.querySelector(".trigger");
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const host = this._portal;
    if (this.config.menu_variant === "expressive") {
      // Spec menus size to their content and anchor to the trigger's end edge
      // (like the ⋮ overflow menu) — not a full-width dropdown.
      host.style.left = "auto";
      host.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
      host.style.width = "auto";
      host.style.maxWidth = "min(320px, calc(100vw - 24px))";
    } else {
      host.style.right = "auto";
      host.style.maxWidth = "";
      host.style.left = `${r.left}px`;
      host.style.width = `${r.width}px`;
    }
    if (this._pos === "above") {
      host.style.top = "auto";
      host.style.bottom = `${window.innerHeight - r.top + 2}px`;
    } else {
      host.style.bottom = "auto";
      host.style.top = `${r.bottom + 2}px`;
    }
  }

  _attachReposition() {
    if (this._repositionRef) return;
    this._repositionRef = () => this._positionPortal();
    window.addEventListener("scroll", this._repositionRef, true);
    window.addEventListener("resize", this._repositionRef);
  }

  _detachReposition() {
    if (!this._repositionRef) return;
    window.removeEventListener("scroll", this._repositionRef, true);
    window.removeEventListener("resize", this._repositionRef);
    this._repositionRef = null;
  }

  _openPortal() {
    this._closing = false;
    clearTimeout(this._portalTimer);
    this._ensurePortal();
    this._syncThemeVars();
    this._positionPortal();
    this._renderPortal();
    this._attachReposition();
  }

  _closePortal() {
    if (!this._portalRoot) return;
    this._closing = true;
    this._renderPortal(); // play the close animation
    this._detachReposition();
    clearTimeout(this._portalTimer);
    this._portalTimer = setTimeout(() => {
      this._removePortal();
      this._closing = false;
    }, 170);
  }

  _renderPortal() {
    if (!this._portalRoot) return;
    render(this._dropdownTemplate(), this._portalRoot);
  }

  _dropdownTemplate() {
    if (!this.hass || !this.config) return html``;
    const { panelStyle, currentValue } = this._colors();
    const options = this._resolvedOptions;
    const pos = this._pos;
    // Expressive variant (M3 expressive menu): container-toned panel, 28px
    // corners, roomy rows, label first with a TRAILING icon.
    const expressive = this.config.menu_variant === "expressive";
    const customPanel = expressive
      ? `${this.config.menu_color ? `--_surf:${this.config.menu_color};` : ""}${this.config.menu_color_on ? `color:${this.config.menu_color_on};` : ""}`
      : "";
    return html`
      <div class="portal-panel ${pos} ${this._closing ? "closing" : ""}">
        <div class="dropdown ${expressive ? "expressive" : ""}" style=${panelStyle + customPanel}>
          ${options.map((opt) => html`
            <div
              class="menu-item ${opt.value === currentValue ? "selected" : ""}"
              @click=${(e) => { e.stopPropagation(); this._selectOption(opt); }}
            >
              ${expressive
                ? html`<span class="item-text">${opt.label || opt.value}</span>${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : ""}`
                : html`${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : ""}<span class="item-text">${opt.label || opt.value}</span>`}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const currentValue = this._currentValue;
    const options = this._resolvedOptions;
    const currentLabel = options.find((o) => o.value === currentValue)?.label || this._capitalize(currentValue);
    const substate = this._substate;
    const name = this._isTemplate(this.config.name)
      ? this._resolvedName
      : (this.config.name || stateObj?.attributes?.friendly_name || "");

    const { triggerStyle } = this._colors();

    return html`
      <ha-card>
        <div class="trigger ${unavailable ? "unavailable" : ""} ${this._open ? (this._pos === "above" ? "open-above" : "open-below") : ""}" style=${triggerStyle} @click=${this._toggle}>
          ${this.config.icon ? html`
            <div class="icon-container">
              <ha-icon .icon=${this._isTemplate(this.config.icon) ? this._resolvedIcon : this.config.icon}></ha-icon>
            </div>
          ` : ""}
          <div class="text-container">
            ${name ? html`<div class="label">${name}</div>` : ""}
            <div class="value">
              <span class="value-main">${currentLabel}</span>
              ${substate
                ? html`<span class="value-sep">${this.config.substate_separator || "•"}</span><span class="value-sub">${substate}</span>`
                : ""}
            </div>
          </div>
          <div class="chevron-btn" @click=${(e) => { e.stopPropagation(); this._toggle(); }}>
            <ha-icon class="chevron" icon=${this._open ? "m3of:arrow-drop-up" : "m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-menu", MateriaMenu);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-menu",
  name: "Materia Menu",
  description: "M3 vertical dropdown menu for select entities.",
  preview: true,
});
