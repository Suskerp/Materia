import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import "./editor.js";

/* DEFAULT BAR COLOURS, one per row, cycling.
   A single role for every row was a real defect and not a cosmetic one: this
   card exists so three readings can be compared at a glance, and three bars in
   the same colour defeat exactly that. The concept gives each row its own hue.

   The first three are the theme's own accent families, which is what M3 defines
   primary / secondary / tertiary FOR — three harmonised, deliberately distinct
   accents. Tertiary comes second because it is the spec's designated
   *contrasting* accent, so the most-used pair (two rows) is the most
   distinguishable pair; secondary is often a desaturated cousin of primary and
   makes a poor neighbour to it.

   Beyond three, the harmonised scale roles carry the cycle. Those are NOT
   defined by any theme file on this install — the library always writes them
   with a hex fallback, and a bare var() on them paints nothing at all. So every
   one here carries its light-mode default from dist/custom_colors.json.

   A bar is a filled surface with NO TEXT ON IT — the reading sits outside the
   track — so an accent role is correct here. The container-pair rule applies to
   surfaces behind text, which is the card background below, not these. */
const BAR_COLORS = [
  "var(--md-sys-color-primary)",
  "var(--md-sys-color-tertiary)",
  "var(--md-sys-color-secondary)",
  "var(--md-sys-cust-color-scale-purple, #8A4DA3)",
  "var(--md-sys-cust-color-scale-orange, #D9713C)",
  "var(--md-sys-cust-color-scale-green, #5E9E50)",
  "var(--md-sys-cust-color-scale-maroon, #7A4040)",
  "var(--md-sys-cust-color-scale-yellow, #C7A128)",
];

/** Everything a numeric reading can be when it is not a number. `None` is in
 *  here as a literal string because that is what a Python-side attribute
 *  serialises to when a template exposes it, and on this install it is the
 *  NORMAL value for a meter that has not reported yet — not an error. */
const UNKNOWN = new Set(["", "none", "null", "unknown", "unavailable", "nan", "undefined", "-"]);

/**
 * Comparable bars (materia-bars) — N labelled readings on one shared scale,
 * with a sentence underneath.
 *
 * WHAT IT IS FOR. A page that explains its state in a paragraph makes you read
 * to find out something you could have seen. Put the same numbers on one scale
 * and the comparison becomes the picture: which is bigger, by how much, and
 * whether the claim in the sentence is consistent with them. The sentence stays
 * — it is the thing you opened the page for — but it stops being the only way
 * to learn the answer.
 *
 * THE SHARED SCALE IS THE POINT. Bars are only worth drawing if they are
 * comparable, so every row is measured against ONE maximum: `max` from config
 * when the domain has a real ceiling, otherwise the largest value present.
 * Per-row scales would make three bars that cannot be read against each other,
 * which is a chart that lies by construction.
 *
 * UNKNOWN IS NOT ZERO. A row with no reading draws a hatched track and an em
 * dash, never an empty bar. An empty bar asserts that the value is nought, and
 * the difference between "nothing left over" and "we cannot tell yet" is
 * exactly the distinction this card exists to preserve. It is drawn neutrally,
 * because absent news is not bad news.
 *
 * IT KNOWS NOTHING ABOUT ITS SUBJECT. Rows, colours, labels, the sentence and
 * the footnote are all config; the card supplies no vocabulary of its own and
 * no assumption about how many rows there are. Three rows is one install's
 * usage, not this card's contract.
 */
class MateriaBars extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedEyebrow: { state: true },
    _resolvedMeta: { state: true },
    _resolvedStatus: { state: true },
    _resolvedStatusIcon: { state: true },
    _resolvedFootnote: { state: true },
    _resolvedStatusColor: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-bars-editor");
  }

  static getStubConfig(hass) {
    // Seed with a couple of real numeric sensors so the card draws something
    // the moment it is dropped in, rather than an empty frame.
    const ids = hass ? Object.keys(hass.states) : [];
    const numeric = ids
      .filter((id) => id.startsWith("sensor.") && Number.isFinite(Number(hass.states[id]?.state)))
      .slice(0, 2);
    return { rows: numeric.map((entity) => ({ entity })) };
  }

  setConfig(config) {
    this.config = { ...config };
  }

  updated(changed) {
    if (!changed.has("hass") || !this.hass) return;
    /* Author strings are templated so the install supplies its own sentence in
       its own language. The card hardcodes no prose — the only strings it owns
       are the two fallbacks for a missing reading and an empty config. */
    this._resolveField("eyebrow", "_resolvedEyebrow");
    this._resolveField("meta", "_resolvedMeta");
    this._resolveField("status", "_resolvedStatus");
    this._resolveField("status_icon", "_resolvedStatusIcon");
    this._resolveField("status_color", "_resolvedStatusColor");
    this._resolveField("footnote", "_resolvedFootnote");
    // Per-row labels are templatable too, and live in a list rather than at a
    // top-level key — hence the keyed variant.
    (this.config.rows || []).forEach((row, i) => {
      if (row?.label) this._resolveTemplateValue(`row_label_${i}`, row.label);
    });
  }

  _field(configKey, propKey) {
    const raw = this.config?.[configKey];
    const resolved = this._isTemplate(raw) ? this[propKey] : raw;
    return typeof resolved === "string" ? resolved.trim() : resolved;
  }

  _rowLabel(row, i) {
    const raw = row?.label;
    if (!this._isTemplate(raw)) return raw;
    const v = this._tplResults?.[`row_label_${i}`];
    return typeof v === "string" ? v.trim() : v;
  }

  /** The raw reading for a row: an attribute when asked for, else the state. */
  _raw(row) {
    const st = row?.entity ? this.hass?.states[row.entity] : undefined;
    if (!st) return undefined;
    if (row.attribute) return st.attributes?.[row.attribute];
    return st.state;
  }

  /** A row's value as a number, or null when there is no reading.
   *
   *  null and 0 are kept strictly apart all the way through — see the class
   *  comment. Anything non-numeric, and the whole UNKNOWN vocabulary, becomes
   *  null rather than being coerced to 0 by Number(). */
  _value(row) {
    const raw = this._raw(row);
    if (raw === null || raw === undefined) return null;
    if (typeof raw === "boolean") return raw ? 1 : 0;
    const s = String(raw).trim();
    if (UNKNOWN.has(s.toLowerCase())) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  /** Resolved rows, each carrying its own value, unit and colour. */
  get _rows() {
    return (this.config.rows || [])
      .filter((r) => r && r.entity)
      .map((row, i) => {
        const st = this.hass?.states[row.entity];
        const value = this._value(row);
        return {
          ...row,
          st,
          value,
          unknown: value === null,
          label: this._rowLabel(row, i)
            || st?.attributes?.friendly_name
            || row.entity,
          // An explicit unit wins; otherwise the entity's own, which is absent
          // for an attribute read and that is fine.
          unit: row.unit ?? (row.attribute ? "" : st?.attributes?.unit_of_measurement ?? ""),
          color: row.color || BAR_COLORS[i % BAR_COLORS.length],
        };
      });
  }

  /** THE SHARED SCALE. Config first, because a domain with a real ceiling
   *  (a 5 kW inverter) should not have its bars rescale every time the largest
   *  reading moves. Otherwise the largest value present, ignoring unknowns —
   *  and never zero, or every bar would be a divide-by-nothing. */
  _scale(rows) {
    const configured = Number(this.config.max);
    if (Number.isFinite(configured) && configured > 0) return configured;
    const values = rows.filter((r) => !r.unknown).map((r) => Math.abs(r.value));
    const largest = values.length ? Math.max(...values) : 0;
    return largest > 0 ? largest : null;
  }

  /** Bar length as a percentage string. A negative reading is drawn by its
   *  magnitude — a bar cannot be shorter than nothing, and the sign belongs to
   *  the number beside it, which shows it. */
  _pct(row, scale) {
    if (row.unknown || !scale) return "0%";
    const frac = Math.min(1, Math.abs(row.value) / scale);
    return `${(frac * 100).toFixed(2)}%`;
  }

  _format(row) {
    if (row.unknown) return null;
    const dp = Number(this.config.precision);
    const digits = Number.isFinite(dp) ? dp : this._autoPrecision(row.value);
    const locale = this.hass?.locale?.language || "en";
    return row.value.toLocaleString(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  /** With no configured precision, keep small numbers informative and large
   *  ones clean: a 0.4 kW surplus rounded to "0" would erase the reading. */
  _autoPrecision(v) {
    const a = Math.abs(v);
    if (a >= 100) return 0;
    if (a >= 10) return 1;
    return a === Math.trunc(a) ? 0 : 1;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const rows = this._rows;
    const scale = this._scale(rows);
    const eyebrow = this._field("eyebrow", "_resolvedEyebrow");
    const meta = this._field("meta", "_resolvedMeta");
    const status = this._field("status", "_resolvedStatus");
    const statusIcon = this._field("status_icon", "_resolvedStatusIcon");
    const statusColor = this._field("status_color", "_resolvedStatusColor");
    const footnote = this._field("footnote", "_resolvedFootnote");

    /* THE CARD SURFACE, and the old default was wrong on this theme.
       surface-container-low is a rung on M3's container ladder, which is an
       elevation system for surfaces INSIDE a card. Which rung reads as "a card
       against this view" is a decision only the theme can make, and Home
       Assistant already publishes that answer as --ha-card-background — a
       theme is obliged to keep it distinct from the view behind it, or every
       stock HA card would be invisible too. So lead with the theme's own
       answer and keep the M3 rung as the fallback. */
    const bg = this.config.background
      ?? "var(--ha-card-background, var(--md-sys-color-surface-container-low, var(--card-background-color)))";
    const fg = this.config.background_on ?? "var(--md-sys-color-on-surface)";

    return html`
      <ha-card>
        <div class="body" style="--mb-bg:${bg};--mb-fg:${fg};">
          ${eyebrow || meta
            ? html`
                <div class="header">
                  ${eyebrow ? html`<span class="eyebrow">${eyebrow}</span>` : nothing}
                  ${meta ? html`<span class="meta">${meta}</span>` : nothing}
                </div>
              `
            : nothing}

          ${rows.length
            ? html`<div class="rows">${rows.map((row) => this._renderRow(row, scale))}</div>`
            : html`<div class="note">${t("bars_no_rows", this.hass)}</div>`}

          ${status || footnote
            ? html`
                <hr class="divider" />
                ${status
                  ? html`
                      <div class="status" style="--mb-status-color:${statusColor || "var(--md-sys-color-tertiary)"}">
                        ${statusIcon ? html`<ha-icon .icon=${statusIcon}></ha-icon>` : nothing}
                        <span class="text">${status}</span>
                      </div>
                    `
                  : nothing}
                ${footnote ? html`<div class="footnote">${footnote}</div>` : nothing}
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  _renderRow(row, scale) {
    const formatted = this._format(row);
    /* The accessible name carries the whole row, because a bar is invisible to
       a screen reader and "0.4" on its own says nothing about what of. An
       unknown row says so in words rather than reading as a zero. */
    const aria = row.unknown
      ? t("bars_aria_unknown", this.hass, { label: row.label })
      : `${row.label}: ${formatted}${row.unit ? " " + row.unit : ""}`;

    return html`
      <div class="row" role="group" aria-label=${aria}>
        <span class="label">${row.label}</span>
        <div class="track ${row.unknown ? "unknown" : ""}" aria-hidden="true">
          <div class="indicator" style="--mb-p:${this._pct(row, scale)};--mb-row-color:${row.color};"></div>
        </div>
        <span class="reading">
          ${row.unknown
            ? html`<span class="value unknown" title=${t("bars_unknown_title", this.hass)}>—</span>`
            : html`
                <span class="value">${formatted}</span>
                ${row.unit ? html`<span class="unit">${row.unit}</span>` : nothing}
              `}
        </span>
      </div>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    const rows = (this.config?.rows || []).length;
    const header = this.config?.eyebrow || this.config?.meta ? 1 : 0;
    return header + Math.ceil(rows / 2) + (this.config?.status ? 1 : 0) + (this.config?.footnote ? 1 : 0) || 1;
  }
}

customElements.define("materia-bars", MateriaBars);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-bars",
  name: "Materia Bars",
  description: "Labelled readings as comparable bars on one shared scale, with a status sentence. A missing reading draws as unknown, never as zero.",
  preview: true,
});
