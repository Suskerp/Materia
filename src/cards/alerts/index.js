import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t, resolveLanguage } from "../../utils/i18n.js";
import { readAlerts, visibleAlerts } from "../../utils/weather-alerts.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * materia-alerts — weather warnings, read from an entity's `warnings`
 * attribute (the IRM KMI warning binary sensor): one tonal row per warning,
 * coloured by level (yellow / orange / red), with when it applies; a tap
 * opens the full text. Ended warnings drop off.
 *
 * With nothing to show the card hides itself (the dashboard closes the gap),
 * so it can sit on a home screen and only appear when it matters.
 *
 *   entity:   the warnings entity (e.g. binary_sensor.weather_warning_home)
 *   show:     all (active + upcoming, default) | active
 *   max:      at most this many rows
 *   expanded: show every warning's text without a tap
 */
class MateriaAlerts extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    preview: { type: Boolean },
    _open: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-alerts-editor");
  }

  static getStubConfig(hass) {
    const states = hass?.states || {};
    const entity = Object.keys(states).find((e) => Array.isArray(states[e]?.attributes?.warnings)) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config?.entity) throw new Error("entity is required");
    this.config = { show: "all", ...config };
    this._open = new Set();
  }

  get _alerts() {
    const max = Number(this.config.max) > 0 ? Number(this.config.max) : Infinity;
    return visibleAlerts(readAlerts(this.hass?.states[this.config.entity]), this.config.show, max);
  }

  /** Hidden while there's nothing to show (not in the card editor's preview). */
  updated(changed) {
    super.updated?.(changed);
    if (!this.hass || !this.config) return;
    const hide = !this.preview && this._alerts.length === 0;
    if (hide !== this.hidden) {
      this.hidden = hide;
      this.dispatchEvent(new Event("card-visibility-changed", { bubbles: true, composed: true }));
    }
  }

  _toggle(i) {
    if (this.config.expanded) return;
    this._fireHaptic("light");
    const open = new Set(this._open);
    open.has(i) ? open.delete(i) : open.add(i);
    this._open = open;
  }

  /** "Until 18:00", "From Thu 06:00", "Thu 06:00 – Fri 12:00" in the user's language. */
  _when(a) {
    const lang = this.hass?.locale?.language || resolveLanguage(this.hass);
    const today = new Date().toDateString();
    const fmt = (ms) => {
      const d = new Date(ms);
      const time = d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
      if (d.toDateString() === today) return time;
      return `${d.toLocaleDateString(lang, { weekday: "short" })} ${time}`;
    };
    if (a.active) return a.end != null ? t("alerts_until", this.hass, { time: fmt(a.end) }) : t("alerts_now", this.hass);
    if (a.end != null) return `${fmt(a.start)} – ${fmt(a.end)}`;
    return t("alerts_from", this.hass, { time: fmt(a.start) });
  }

  render() {
    if (!this.hass || !this.config) return nothing;
    const alerts = this._alerts;
    if (!alerts.length)
      return this.preview
        ? html`<ha-card><div class="empty"><ha-icon icon="mdi:shield-check-outline"></ha-icon>${t("alerts_none", this.hass)}</div></ha-card>`
        : nothing;
    return html`<ha-card>
      <div class="list">
        ${alerts.map((a, i) => {
          const open = this.config.expanded || this._open.has(i);
          return html`<button
            class="alert ${a.tone} ${a.active ? "active" : "upcoming"} ${open ? "open" : ""}"
            aria-expanded=${a.text ? (open ? "true" : "false") : nothing}
            @click=${() => this._toggle(i)}
          >
            <span class="badge"><ha-icon .icon=${a.icon}></ha-icon></span>
            <span class="body">
              <span class="eyebrow">${t(`alerts_level_${a.tone}`, this.hass)}${a.active ? "" : ` · ${t("alerts_upcoming", this.hass)}`}</span>
              <span class="title">${a.title}</span>
              <span class="when">${this._when(a)}</span>
              ${open && a.text ? html`<span class="text">${a.text}</span>` : nothing}
            </span>
            ${a.text && !this.config.expanded
              ? html`<ha-icon class="chev" icon=${open ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>`
              : nothing}
          </button>`;
        })}
      </div>
    </ha-card>`;
  }

  getCardSize() {
    return Math.max(1, this._alerts?.length ?? 1) * 2;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }
}

customElements.define("materia-alerts", MateriaAlerts);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-alerts",
  name: "Materia Alerts",
  description: "Weather warnings (e.g. IRM KMI), coloured by level; hides itself when there are none.",
  preview: true,
});
