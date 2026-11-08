import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { switcherItems, clampIndex, storageKey, readIndex, writeIndex, tabClass } from "./model.js";
import { styles } from "./styles.js";
import "./editor.js";

const storage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

/**
 * materia-switcher — a segmented tab bar over one card slot. Each item is a
 * tab (name, and an optional value, a template, under it) and a card; only
 * the selected item's card is built and attached, and hass flows to it.
 *
 * `bar: connected` draws the bar as a connected button group instead (the
 * volume knob's zone picker). The default bar is the volume panel's zone tabs made generic: same DOM, classes
 * and styles. The selection belongs to this screen (component state);
 * `remember: true` with a `key` keeps it in localStorage across reloads.
 */
class MateriaSwitcher extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _sel: { state: true },
    _card: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-switcher-editor");
  }

  static getStubConfig() {
    return {
      items: [
        { name: "One", card: { type: "markdown", content: "One" } },
        { name: "Two", card: { type: "markdown", content: "Two" } },
      ],
    };
  }

  setConfig(config) {
    if (!switcherItems(config).length) throw new Error("Materia Switcher: at least one item is required");
    this.config = { ...config };
    this._cards = [];
    this._card = null;
    this._storageKey = storageKey(config);
    const stored = readIndex(storage(), this._storageKey);
    this._sel = clampIndex(stored ?? this._sel ?? 0, switcherItems(config).length);
    this._buildSelected();
  }

  get _items() {
    return switcherItems(this.config);
  }

  _pick(i) {
    if (i === this._sel) return;
    this._sel = i;
    writeIndex(storage(), this._storageKey, i);
    this._buildSelected();
  }

  /** Builds (once) and shows the selected item's card. */
  async _buildSelected() {
    const i = this._sel;
    const cards = this._cards;
    const conf = this._items[i]?.card;
    if (!conf) {
      this._card = null;
      return;
    }
    if (!cards[i]) {
      const helpers = await loadCardHelpers();
      const el = await helpers.createCardElement(conf);
      if (cards !== this._cards) return; // config replaced meanwhile
      if (cards[i]) return this._buildSelected(); // built by an earlier call meanwhile
      // An error card that recovers asks to be rebuilt.
      el.addEventListener("ll-rebuild", (ev) => {
        ev.stopPropagation();
        if (cards[i] !== el) return;
        cards[i] = null;
        if (this._sel === i) this._buildSelected();
      });
      cards[i] = el;
    }
    if (this._sel !== i || cards !== this._cards) return;
    if (this.hass) cards[i].hass = this.hass;
    this._card = cards[i];
  }

  willUpdate(changed) {
    super.willUpdate?.(changed);
    if (!this.config || !this.hass) return;
    this._items.forEach((item, i) => {
      this._resolveTemplateValue(`name${i}`, item.name);
      this._resolveTemplateValue(`value${i}`, item.value);
    });
  }

  updated(changed) {
    super.updated?.(changed);
    if (changed.has("hass") && this._card && this.hass) this._card.hass = this.hass;
  }

  /** A field's text: the rendered template, or the plain string. */
  _text(key, val) {
    if (val == null) return null;
    if (this._isTemplate(val)) return this._tplResults?.[key] ?? "";
    return String(val);
  }

  render() {
    if (!this.config) return html``;
    const items = this._items;
    const sel = clampIndex(this._sel, items.length);
    const label = this.config.aria_label ?? this.config.name ?? nothing;
    // bar: connected — the knob style's zone picker: a connected M3 button group.
    if (this.config.bar === "connected") {
      const group = {
        size: this.config.size ?? "s",
        aria_label: this.config.aria_label ?? this.config.name,
        options: items.map((item, i) => ({ label: this._text(`name${i}`, item.name) ?? "", value: String(i) })),
      };
      return html`
        ${items.length > 1
          ? html`<materia-button-group
              .hass=${this.hass}
              .config=${group}
              .value=${String(sel)}
              @option-selected=${(e) => {
                e.stopPropagation();
                this._pick(Number(e.detail.value) || 0);
              }}
            ></materia-button-group>`
          : nothing}
        ${this._card ? html`<div class="slot">${this._card}</div>` : nothing}
      `;
    }
    return html`
      ${items.length > 1
        ? html`<div class="ztabs" role="radiogroup" aria-label=${label}>
            ${items.map((item, i) => {
              const value = this._text(`value${i}`, item.value);
              return html`<button
                role="radio"
                aria-checked=${i === sel ? "true" : "false"}
                class=${tabClass(i, items.length, sel)}
                @click=${() => this._pick(i)}
              ><span class="zn">${this._text(`name${i}`, item.name) ?? ""}</span>${value != null
                ? html`<span class="zv">${value}</span>`
                : nothing}</button>`;
            })}
          </div>`
        : nothing}
      ${this._card ? html`<div class="slot">${this._card}</div>` : nothing}
    `;
  }

  getGridOptions() {
    return { columns: 6, rows: "auto", min_columns: 4 };
  }

  getCardSize() {
    return 1 + (this._card?.getCardSize?.() ?? 4);
  }
}

customElements.define("materia-switcher", MateriaSwitcher);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-switcher",
  name: "Materia Switcher",
  description: "Segmented tab bar over one card slot — each tab a name, a live value and a card; the selection stays on this screen.",
  preview: true,
});
