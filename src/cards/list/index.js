import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Row list: an optional header (icon + title) and one row per entry.
 *
 * TWO KINDS OF ROW, which is what makes this more than a sensor readout:
 *   ENTITY — name left, state right. States render via hass.formatEntityState
 *     so they are localized and honour display precision.
 *   TEXT   — icon left, a line of author text filling the width, no state
 *     column. For explaining something in scannable lines rather than in a
 *     paragraph: three of them side by side is a comparison, three sentences
 *     of prose is homework.
 *
 * The two mix freely in one list, which is the general case and the reason
 * this is an extension rather than a second card — a panel that explains a
 * mode in three lines and then shows two live readings underneath is one list,
 * not two stacked ones.
 *
 * THE TEXT IS NEVER THE CARD'S. Row text is a templatable author string, so
 * the install writes its own sentences in its own language. Nothing prose-like
 * ships in the translation table: a card cannot know what a mode means on
 * somebody else's system, and three sentences about charging are exactly the
 * content that has to live in the dashboard.
 *
 * `variant: tonal` swaps the default card surface for a filled tonal
 * container. That is a CONTAINER PAIR, never an accent role at partial alpha —
 * a hand-mixed alpha carries no contrast guarantee against whatever is behind
 * it, while a container pair is guaranteed legible by the theme.
 */
class MateriaList extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedTitle: { state: true },
    _resolvedIcon: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-list-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("sensor.")) || "";
    return { entities: entity ? [entity] : [] };
  }

  setConfig(config) {
    /* Rows OR entities — a list of text lines is a legitimate list and used to
       be rejected outright. `rows` is the canonical key and wins when both are
       present; `entities` keeps working untouched, because every existing card
       in the wild uses it. */
    const hasRows = Array.isArray(config?.rows) && config.rows.length > 0;
    const hasEntities = Array.isArray(config?.entities) && config.entities.length > 0;
    if (!hasRows && !hasEntities) {
      throw new Error("Materia List: add at least one row or entity");
    }
    this.config = { ...config };
  }

  /** Normalized rows, in render order. A row is a TEXT row when it carries
   *  `text`; an `entity` alongside it is then used only as the tap target, so
   *  an explanation line can still open the thing it is explaining rather than
   *  the entity being silently discarded. */
  get _rows() {
    const src = Array.isArray(this.config?.rows) && this.config.rows.length
      ? this.config.rows
      : (this.config?.entities || []);
    return src.map((e, i) => {
      const r = typeof e === "string" ? { entity: e } : { ...e };
      return { ...r, i, isText: r.text != null && r.text !== "" };
    });
  }

  updated(changed) {
    if (!changed.has("hass") || !this.hass) return;
    /* EVERY text-bearing key here is templatable, and that has to be all of
       them or none. A card that resolves some and prints raw Jinja for the rest
       is worse than one that resolves nothing, because the inconsistency is
       invisible until it appears on a dashboard — which is exactly how a
       templated title shipped as literal braces in a card header. */
    this._resolveField("title", "_resolvedTitle");
    this._resolveField("icon", "_resolvedIcon");
    /* Row keys live in a list rather than at a top-level config key, so they go
       through the keyed template variant — same machinery, same WS
       render_template subscription, torn down when a string stops being a
       template. */
    for (const r of this._rows) {
      if (r.isText) this._resolveTemplateValue(`row_text_${r.i}`, r.text);
      this._resolveTemplateValue(`row_icon_${r.i}`, r.icon);
      this._resolveTemplateValue(`row_name_${r.i}`, r.name);
    }
  }

  /** A top-level key, resolved if it is a template. */
  _field(configKey, propKey) {
    const raw = this.config?.[configKey];
    const resolved = this._isTemplate(raw) ? this[propKey] : raw;
    return typeof resolved === "string" ? resolved.trim() : resolved;
  }

  /** A per-row key, resolved if it is a template. */
  _rowField(row, key) {
    const raw = row?.[key];
    if (!this._isTemplate(raw)) return raw;
    const v = this._tplResults?.[`row_${key}_${row.i}`];
    return typeof v === "string" ? v.trim() : v;
  }

  _text(row) {
    return this._rowField(row, "text");
  }

  _rowState(cfg, stateObj) {
    if (!stateObj) return "—";
    if (cfg.attribute) {
      const v = stateObj.attributes?.[cfg.attribute];
      return v == null ? "—" : `${v}${cfg.unit ? ` ${cfg.unit}` : ""}`;
    }
    if (this._isUnavailable(stateObj)) {
      return this.hass.formatEntityState?.(stateObj) ?? stateObj.state;
    }
    if (cfg.unit) {
      const n = Number(stateObj.state);
      return Number.isFinite(n) ? `${n} ${cfg.unit}` : stateObj.state;
    }
    return this.hass.formatEntityState?.(stateObj) ?? stateObj.state;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const rows = this._rows;
    const title = this._field("title", "_resolvedTitle");
    const headerIcon = this._field("icon", "_resolvedIcon");
    const tonal = this.config.variant === "tonal";
    const bg = tonal
      ? (this.config.color ?? "var(--md-sys-color-primary-container)")
      : "var(--ha-card-background, var(--card-background-color))";
    const fg = tonal
      ? (this.config.color_on ?? "var(--md-sys-color-on-primary-container)")
      : "inherit";

    return html`
      <ha-card class=${tonal ? "tonal" : ""} style="--ml-bg:${bg};--ml-fg:${fg};">
        ${title
          ? html`<div class="header">
              ${headerIcon ? html`<ha-icon icon=${headerIcon}></ha-icon>` : ""}
              <span>${title}</span>
            </div>`
          : ""}
        <div class="rows">
          ${rows.map((r) => (r.isText ? this._renderText(r) : this._renderEntity(r)))}
        </div>
      </ha-card>
    `;
  }

  _renderEntity(r) {
    const stateObj = this.hass.states[r.entity];
    const name = this._rowField(r, "name") || stateObj?.attributes?.friendly_name || r.entity;
    const icon = this._rowField(r, "icon");
    return html`
      <div
        class="row ${stateObj && this._isUnavailable(stateObj) ? "unavailable" : ""}"
        @click=${() => this._handleAction(r.tap_action || { action: "more-info", entity: r.entity })}
      >
        ${icon ? html`<ha-icon class="row-icon" icon=${icon}></ha-icon>` : ""}
        <span class="name">${name}</span>
        <span class="state">${this._rowState(r, stateObj)}</span>
      </div>
    `;
  }

  _renderText(r) {
    /* A text row is only a control when there is something to open. With no
       tap_action and no entity it is prose, so it takes no pointer, no hover
       and no tab stop — a line that looks pressable and does nothing is worse
       than a line that plainly does not. */
    const action = r.tap_action || (r.entity ? { action: "more-info", entity: r.entity } : null);
    const live = !!action && action.action !== "none";
    const icon = this._rowField(r, "icon");
    return html`
      <div
        class="row text ${live ? "live" : ""}"
        @click=${live ? () => this._handleAction(action) : undefined}
      >
        ${icon ? html`<ha-icon class="row-icon" icon=${icon}></ha-icon>` : ""}
        <span class="line">${this._text(r)}</span>
      </div>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    // Rows, not entities — a list of text lines has a height too.
    const rows = Array.isArray(this.config?.rows) && this.config.rows.length
      ? this.config.rows.length
      : (this.config?.entities?.length || 0);
    return 1 + rows;
  }
}

customElements.define("materia-list", MateriaList);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-list",
  name: "Materia List",
  description: "Rows of entity readings and/or lines of text — name left, value right, or icon plus a full-width line. Optional tonal surface.",
  preview: true,
});
