import { html, nothing } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { loadCardHelpers } from "../../styles/shared.js";

const ROW =
  "display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;" +
  "background:var(--md-sys-color-secondary-container, rgba(120,120,128,.14));" +
  "color:var(--md-sys-color-on-secondary-container, inherit);margin-bottom:6px;cursor:pointer;";
const ICON_BTN =
  "border:none;background:transparent;color:inherit;cursor:pointer;padding:4px;" +
  "display:grid;place-items:center;border-radius:50%;--mdc-icon-size:18px;";
const ADD_BTN =
  "border:1.5px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.2));background:transparent;" +
  "color:inherit;font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;" +
  "border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;";

class MateriaClimatePanelEditor extends SmartEditorBase {
  static properties = {
    _secIdx: { state: true },
    _cardIdx: { state: true },
    _huiReady: { state: true },
  };

  connectedCallback() {
    super.connectedCallback();
    this._loadHui();
  }

  /** Force-load HA's stack editor deps so hui-card-picker and
   *  hui-card-element-editor are defined. */
  async _loadHui() {
    if (customElements.get("hui-card-picker") && customElements.get("hui-card-element-editor")) {
      this._huiReady = true;
      return;
    }
    try {
      const helpers = await loadCardHelpers();
      const stack = await helpers.createCardElement({ type: "vertical-stack", cards: [] });
      await stack?.constructor?.getConfigElement?.();
    } catch {
      /* picker unavailable — the YAML fallback below still works */
    }
    this._huiReady = !!customElements.get("hui-card-picker");
  }

  _formData() {
    return { steppers: "side", wave: "auto", ...this._config };
  }

  /* ---- sections plumbing --------------------------------------------------- */

  get _secs() {
    return this._config?.sections || [];
  }

  _setSecs(secs) {
    const next = { ...this._config };
    if (secs.length) next.sections = secs;
    else delete next.sections;
    this._commit(next);
  }

  _patchSec(i, patch) {
    const secs = [...this._secs];
    const sec = { ...secs[i], ...patch };
    for (const k of Object.keys(patch)) {
      if (patch[k] === undefined || patch[k] === "" || patch[k] === null) delete sec[k];
    }
    secs[i] = sec;
    this._setSecs(secs);
  }

  _moveSec(i, d) {
    const secs = [...this._secs];
    const j = i + d;
    if (j < 0 || j >= secs.length) return;
    [secs[i], secs[j]] = [secs[j], secs[i]];
    this._setSecs(secs);
  }

  _addSec() {
    const idx = this._secs.length;
    this._setSecs([...this._secs, { title: "New section", style: "section", cards: [] }]);
    this._secIdx = idx;
  }

  _patchCards(i, cards) {
    this._patchSec(i, { cards });
  }

  /* ---- views ---------------------------------------------------------------- */

  render() {
    if (!this.hass || !this._config) return html``;
    if (this._secIdx != null && this._cardIdx != null) return this._renderCardView();
    if (this._secIdx != null) return this._renderSectionView();
    return super.render();
  }

  _back(label, onClick) {
    return html`
      <div style="display:flex;align-items:center;gap:8px;margin:4px 0 14px;">
        <button style=${ICON_BTN} @click=${onClick}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <span style="font-weight:600;font-size:15px;">${label}</span>
      </div>
    `;
  }

  _sel(label, selector, value, onChange) {
    return html`
      <div style="margin-bottom:12px;" @value-changed=${(e) => { e.stopPropagation(); onChange(e.detail.value); }}>
        <ha-selector .hass=${this.hass} .selector=${selector} .value=${value} .label=${label}></ha-selector>
      </div>
    `;
  }

  /* Sections manager appended to the normal editor. */
  _renderExtra() {
    return html`
      <ha-expansion-panel outlined .header=${"Sections"} .secondary=${"Wallet sections and menus below the mode group"} .expanded=${true}>
        <ha-icon slot="leading-icon" icon="mdi:wallet-outline"></ha-icon>
        <div style="padding:12px;">
          ${this._secs.map((s, i) => html`
            <div style=${ROW} @click=${() => { this._secIdx = i; }}>
              <span style="opacity:.6;font-weight:600;">${i + 1}</span>
              <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${s.title || (s.style === "menu" ? "Menu" : "Section")}
              </span>
              <span style="opacity:.6;font-size:12px;">${s.style === "menu" ? "menu" : `${(s.cards || []).length} cards`}</span>
              <button style=${ICON_BTN} title="Move up" @click=${(e) => { e.stopPropagation(); this._moveSec(i, -1); }}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button style=${ICON_BTN} title="Move down" @click=${(e) => { e.stopPropagation(); this._moveSec(i, 1); }}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button style=${ICON_BTN} title="Edit" @click=${(e) => { e.stopPropagation(); this._secIdx = i; }}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button style=${ICON_BTN} title="Delete" @click=${(e) => { e.stopPropagation(); this._setSecs(this._secs.filter((_, j) => j !== i)); }}><ha-icon icon="mdi:delete"></ha-icon></button>
            </div>
          `)}
          <button style=${ADD_BTN} @click=${() => this._addSec()}>
            <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add section
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSectionView() {
    const i = this._secIdx;
    const s = this._secs[i];
    if (!s) {
      this._secIdx = null;
      return html``;
    }
    const style = s.style === "menu" ? "menu" : "section";
    return html`
      ${this._back(s.title || `Section ${i + 1}`, () => { this._secIdx = null; })}
      ${this._sel("Title", { text: {} }, s.title, (v) => this._patchSec(i, { title: v }))}
      ${this._sel("Icon", { icon: {} }, s.icon, (v) => this._patchSec(i, { icon: v }))}
      ${this._sel("Style", { select: { mode: "dropdown", options: [
        { value: "section", label: "Wallet section (nested cards)" },
        { value: "menu", label: "Menu (tap opens options)" },
      ] } }, style, (v) => this._patchSec(i, { style: v }))}
      ${style === "menu" ? this._renderMenuFields(i, s) : this._renderSectionCards(i, s)}
    `;
  }

  /* Menu style: entity options come free; manual options: label/value/icon. */
  _renderMenuFields(i, s) {
    const opts = s.options || [];
    const patchOpt = (oi, patch) => {
      const next = opts.map((o, j) => (j === oi ? { ...o, ...patch } : o));
      for (const k of Object.keys(patch)) {
        if (patch[k] === "" || patch[k] == null) delete next[oi][k];
      }
      this._patchSec(i, { options: next });
    };
    return html`
      ${this._sel("Entity (select / input_select / water_heater)", { entity: {} }, s.entity, (v) => this._patchSec(i, { entity: v }))}
      ${this._sel("Substate (secondary line — supports templates)", { template: {} }, s.substate, (v) => this._patchSec(i, { substate: v }))}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Manual options (override the entity's)</div>
      ${opts.map((o, oi) => html`
        <div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:8px;">
          <div style="flex:1;" @value-changed=${(e) => { e.stopPropagation(); patchOpt(oi, { label: e.detail.value }); }}>
            <ha-selector .hass=${this.hass} .selector=${{ text: {} }} .value=${o.label} .label=${"Label"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${(e) => { e.stopPropagation(); patchOpt(oi, { value: e.detail.value }); }}>
            <ha-selector .hass=${this.hass} .selector=${{ text: {} }} .value=${o.value} .label=${"Value"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${(e) => { e.stopPropagation(); patchOpt(oi, { icon: e.detail.value }); }}>
            <ha-selector .hass=${this.hass} .selector=${{ icon: {} }} .value=${o.icon} .label=${"Icon"}></ha-selector>
          </div>
          <button style="${ICON_BTN}margin-top:12px;" title="Remove option"
            @click=${() => this._patchSec(i, { options: opts.filter((_, j) => j !== oi) })}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>
      `)}
      <button style=${ADD_BTN} @click=${() => this._patchSec(i, { options: [...opts, { label: "", value: "" }] })}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add option
      </button>
    `;
  }

  /* Open-bar action chips — a managed list, not a YAML box. */
  _renderActions(i, s) {
    const acts = s.actions || [];
    const patchAct = (ai, patch) => {
      const next = acts.map((a, j) => (j === ai ? { ...a, ...patch } : a));
      for (const k of Object.keys(patch)) {
        if (patch[k] === "" || patch[k] == null) delete next[ai][k];
      }
      this._patchSec(i, { actions: next });
    };
    return html`
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Bar actions (chips in the open bar)</div>
      ${acts.map((a, ai) => html`
        <div style="border:1px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.15));border-radius:12px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:flex-start;">
            <div style="flex:1;" @value-changed=${(e) => { e.stopPropagation(); patchAct(ai, { label: e.detail.value }); }}>
              <ha-selector .hass=${this.hass} .selector=${{ text: {} }} .value=${a.label} .label=${"Label"}></ha-selector>
            </div>
            <div style="flex:1;" @value-changed=${(e) => { e.stopPropagation(); patchAct(ai, { icon: e.detail.value }); }}>
              <ha-selector .hass=${this.hass} .selector=${{ icon: {} }} .value=${a.icon} .label=${"Icon"}></ha-selector>
            </div>
            <button style="${ICON_BTN}margin-top:12px;" title="Remove action"
              @click=${() => this._patchSec(i, { actions: acts.filter((_, j) => j !== ai) })}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </button>
          </div>
          <div style="margin-top:8px;" @value-changed=${(e) => { e.stopPropagation(); patchAct(ai, { tap_action: e.detail.value }); }}>
            <ha-selector .hass=${this.hass} .selector=${{ ui_action: {} }} .value=${a.tap_action} .label=${"Action"}></ha-selector>
          </div>
        </div>
      `)}
      <button style="${ADD_BTN}margin-bottom:12px;" @click=${() => this._patchSec(i, { actions: [...acts, { label: "" }] })}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add action
      </button>
    `;
  }

  /* Section style: cards list + HA's own picker to add. */
  _renderSectionCards(i, s) {
    const cards = s.cards || [];
    const move = (ci, d) => {
      const j = ci + d;
      if (j < 0 || j >= cards.length) return;
      const next = [...cards];
      [next[ci], next[j]] = [next[j], next[ci]];
      this._patchCards(i, next);
    };
    return html`
      ${this._sel("Info (closed-bar text — supports templates)", { template: {} }, s.info, (v) => this._patchSec(i, { info: v }))}
      ${this._sel("…or info from an entity's state", { entity: {} }, s.info_entity, (v) => this._patchSec(i, { info_entity: v }))}
      ${this._renderActions(i, s)}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Cards</div>
      ${cards.map((c, ci) => html`
        <div style=${ROW} @click=${() => { this._cardIdx = ci; }}>
          <span style="opacity:.6;font-weight:600;">${ci + 1}</span>
          <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.type || "card"}</span>
          <button style=${ICON_BTN} title="Move up" @click=${(e) => { e.stopPropagation(); move(ci, -1); }}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button style=${ICON_BTN} title="Move down" @click=${(e) => { e.stopPropagation(); move(ci, 1); }}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
          <button style=${ICON_BTN} title="Edit" @click=${(e) => { e.stopPropagation(); this._cardIdx = ci; }}><ha-icon icon="mdi:pencil"></ha-icon></button>
          <button style=${ICON_BTN} title="Delete" @click=${(e) => { e.stopPropagation(); this._patchCards(i, cards.filter((_, j) => j !== ci)); }}><ha-icon icon="mdi:delete"></ha-icon></button>
        </div>
      `)}
      ${this._huiReady
        ? html`<hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${(e) => { e.stopPropagation(); this._patchCards(i, [...cards, e.detail.config]); }}
          ></hui-card-picker>`
        : html`<div style="opacity:.7;font-size:12px;margin-top:8px;">Card picker unavailable — add cards via the YAML editor.</div>`}
    `;
  }

  _renderCardView() {
    const i = this._secIdx;
    const ci = this._cardIdx;
    const card = this._secs[i]?.cards?.[ci];
    if (!card) {
      this._cardIdx = null;
      return html``;
    }
    return html`
      ${this._back(card.type || "Card", () => { this._cardIdx = null; })}
      ${customElements.get("hui-card-element-editor")
        ? html`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            .value=${card}
            @config-changed=${(e) => {
              e.stopPropagation();
              const cards = [...(this._secs[i].cards || [])];
              cards[ci] = e.detail.config;
              this._patchCards(i, cards);
            }}
          ></hui-card-element-editor>`
        : nothing}
    `;
  }

  /* ---- the regular field groups --------------------------------------------- */

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "reserve_height", label: "Keep the height of the tallest section (no reflow when cycling)", selector: { boolean: {} } },
        ],
      },
      {
        title: "Dial",
        icon: "mdi:thermostat",
        fields: [
          { name: "temperature_entity", label: "Current-temp sensor (marker on the dial)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "step", label: "Step", helper: "Default: the entity's target_temp_step, else 0.5.", selector: { number: { min: 0.1, max: 2, step: 0.1, mode: "box" } } },
          { name: "min_temp", label: "Dial min (default: entity)", selector: { number: { min: -30, max: 40, step: 0.5, mode: "box" } } },
          { name: "max_temp", label: "Dial max (default: entity)", selector: { number: { min: 0, max: 60, step: 0.5, mode: "box" } } },
          { name: "steppers", label: "Stepper placement", selector: { select: { mode: "dropdown", options: [
            { value: "side", label: "Vertical, beside the dial" },
            { value: "below", label: "Below the dial" },
          ] } } },
          { name: "wave", label: "Wave animation", selector: { select: { mode: "dropdown", options: [
            { value: "auto", label: "Auto (hvac_action, or inferred from temps)" },
            { value: "always", label: "Always (whenever the mode is on)" },
            { value: "never", label: "Never" },
          ] } } },
        ],
      },
    ];
  }
}

customElements.define("materia-climate-panel-editor", MateriaClimatePanelEditor);
