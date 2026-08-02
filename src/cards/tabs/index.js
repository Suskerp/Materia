import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Tab rail (materia-tabs): the M3 navigation-rail grammar as one
 * composable card, vertical (default) or horizontal (vertical: false).
 * The tabs switch a shared slot — pages EMBEDDED in the card (each item
 * holds its own `cards:` list, like a small vertical-stack per tab) or
 * external conditional cards (design 13a: "tabs, not a taller column").
 *
 * Spec anchors (androidx NavigationRailTokens): active indicator is
 * secondary-container with on-secondary-container ink, inactive ink is
 * on-surface-variant, icons 24dp, labels label-medium, active shape
 * CornerFull — which is why the selected tab morphs to a stadium while it
 * grows. Growth itself is the design's move, not the rail spec's: the
 * selected tab doubles as the "you are here" indicator.
 *
 * Selection state: CLIENT-SIDE by default — tabs are a viewing choice, so
 * each device keeps its own (the phone flipping to Map must not flip the
 * wall tablet). Set `entity` (input_select/select/input_text) only when
 * the selection must be shared or drive things elsewhere; the contract is
 * then materia-chips': state picks the tab, tapping writes it back.
 *
 * Embedded pages all stay MOUNTED, stacked in one grid cell and hidden
 * with visibility — so the card never resizes when switching, and a map's
 * zoom/pan survives a round-trip through another tab.
 */
class MateriaTabs extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _sel: { state: true },
    _panes: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-tabs-editor");
  }

  static getStubConfig() {
    return {
      items: [
        { label: "Rooms", value: "rooms", icon: "m3o:grid-view" },
        { label: "Map", value: "map", icon: "m3o:map" },
      ],
    };
  }

  setConfig(config) {
    if (!config.items?.length) throw new Error("Materia Tabs: at least one item is required");
    this.config = { ...config };
    // vertical rail by default; vertical: false lays the tabs out as a
    // horizontal bar (above the pages, when pages are embedded).
    this.toggleAttribute("horizontal", config.vertical === false);
    this._panes = null;
    this._buildPanes();
  }

  _items() {
    return (this.config.items || []).map((i) => (typeof i === "string" ? { label: i, value: i } : i));
  }

  /** Each tab's page is a LIST of cards (`cards:`, with `card:` accepted
   *  as one-card sugar) — a pane is a small vertical stack of its own. */
  _paneConfigs(item) {
    if (Array.isArray(item.cards) && item.cards.length) return item.cards;
    if (item.card) return [item.card];
    return null;
  }

  async _buildPanes() {
    const items = this._items();
    if (!items.some((i) => this._paneConfigs(i))) return;
    const helpers = await loadCardHelpers();
    this._panes = await Promise.all(
      items.map(async (i) => {
        const configs = this._paneConfigs(i);
        if (!configs) return null;
        return Promise.all(
          configs.map(async (c) => {
            const el = await helpers.createCardElement(c);
            if (this.hass) el.hass = this.hass;
            return el;
          })
        );
      })
    );
  }

  updated(changed) {
    super.updated?.(changed);
    if (changed.has("hass") && this._panes) {
      for (const pane of this._panes) {
        if (pane) for (const el of pane) el.hass = this.hass;
      }
    }
  }

  get _stateObj() {
    return this.config.entity ? this.hass?.states[this.config.entity] : null;
  }

  /** Selected value: the entity's state when one is configured, otherwise
   *  this device's own choice (first item until tapped). */
  get _current() {
    if (this.config.entity) {
      const st = this._stateObj;
      if (!st) return null;
      const cur = this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
      return cur == null ? null : String(cur);
    }
    const first = this._items()[0];
    return this._sel ?? String(first?.value ?? first?.label ?? "");
  }

  _tap(item) {
    this._fireHaptic?.("selection");
    if (item.tap_action) {
      this._handleAction(item.tap_action);
      return;
    }
    const value = String(item.value ?? item.label);
    if (!this.config.entity) {
      this._sel = value;
      return;
    }
    const st = this._stateObj;
    const domain = st?.entity_id?.split(".")[0];
    if (domain === "select" || domain === "input_select") {
      this._callService(domain, "select_option", { entity_id: st.entity_id, option: value });
    } else if (domain === "input_text") {
      this._callService(domain, "set_value", { entity_id: st.entity_id, value });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const items = this._items();
    const current = this._current;
    const rail = html`
      <div class="rail" role="tablist" aria-orientation=${this.config.vertical === false ? "horizontal" : "vertical"}>
        ${items.map((item) => {
          const value = String(item.value ?? item.label);
          const on = current === value;
          return html`
            <button
              class="tab ${on ? "on" : ""}"
              role="tab"
              aria-selected=${on ? "true" : "false"}
              @click=${() => this._tap(item)}
            >
              ${item.icon ? html`<ha-icon class="glyph" .icon=${item.icon}></ha-icon>` : nothing}
              <span class="label">${item.label ?? value}</span>
            </button>
          `;
        })}
      </div>
    `;

    if (!this._panes) return html`<ha-card>${rail}</ha-card>`;

    // Embedded pages: every pane stays in the DOM, stacked in one grid
    // cell — the stage is always as tall as the tallest pane, so switching
    // never reflows the dashboard, and pane state (map zoom) survives.
    return html`
      <ha-card>
        <div class="wrap">
          <div class="stage">
            ${items.map((item, i) => {
              const value = String(item.value ?? item.label);
              return this._panes[i]
                ? html`<div class="pane ${current === value ? "on" : ""}" role="tabpanel">
                    ${this._panes[i].map((el) => html`<div class="pane-card">${el}</div>`)}
                  </div>`
                : nothing;
            })}
          </div>
          ${rail}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return this._panes ? { columns: 12, rows: "auto" } : { columns: 2, rows: "auto" };
  }

  getCardSize() {
    return this._panes ? 6 : 3;
  }
}

customElements.define("materia-tabs", MateriaTabs);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-tabs",
  name: "Materia Tabs",
  description: "Vertical tab rail — the selected tab grows into the nav-rail indicator. Embed cards per tab, or pair with conditional cards.",
  preview: true,
});
