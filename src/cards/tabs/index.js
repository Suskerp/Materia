import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Vertical tab rail (materia-tabs): the M3 navigation-rail grammar as one
 * composable card. A column of tabs switches a shared slot — pair it with
 * conditional cards reading the same entity, and a map can live behind the
 * rooms grid instead of below it (design 13a: "tabs, not a taller column").
 *
 * Spec anchors (androidx NavigationRailTokens): active indicator is
 * secondary-container with on-secondary-container ink, inactive ink is
 * on-surface-variant, icons 24dp, labels label-medium, active shape
 * CornerFull — which is why the selected tab morphs to a stadium while it
 * grows. Growth itself is the design's move, not the rail spec's: the
 * selected tab doubles as the "you are here" indicator.
 *
 * Selection contract is materia-chips'/carousel's: the tracked entity's
 * state picks the active tab, tapping writes it back (select_option /
 * set_value), and a per-item tap_action overrides the write entirely.
 */
class MateriaTabs extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-tabs-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      items: [
        { label: "Rooms", value: "rooms", icon: "m3o:grid-view" },
        { label: "Map", value: "map", icon: "m3o:map" },
      ],
    };
  }

  setConfig(config) {
    if (!config.items?.length) throw new Error("Materia Tabs: at least one item is required");
    if (!config.entity) throw new Error("Materia Tabs: entity is required (it holds the selected tab)");
    this.config = { ...config };
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  get _current() {
    const st = this._stateObj;
    if (!st) return null;
    const cur = this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
    return cur == null ? null : String(cur);
  }

  _items() {
    return (this.config.items || []).map((i) => (typeof i === "string" ? { label: i, value: i } : i));
  }

  _tap(item) {
    this._fireHaptic?.("selection");
    if (item.tap_action) {
      this._handleAction(item.tap_action);
      return;
    }
    const st = this._stateObj;
    const domain = st?.entity_id?.split(".")[0];
    const value = String(item.value ?? item.label);
    if (domain === "select" || domain === "input_select") {
      this._callService(domain, "select_option", { entity_id: st.entity_id, option: value });
    } else if (domain === "input_text") {
      this._callService(domain, "set_value", { entity_id: st.entity_id, value });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const current = this._current;
    return html`
      <ha-card>
        <div class="rail" role="tablist" aria-orientation="vertical">
          ${this._items().map((item) => {
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
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 2, rows: "auto" };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-tabs", MateriaTabs);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-tabs",
  name: "Materia Tabs",
  description: "Vertical tab rail — the selected tab grows into the nav-rail indicator. Pair with conditional cards to switch one slot between views.",
  preview: true,
});
