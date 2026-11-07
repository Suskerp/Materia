import { LitElement, html, css, nothing } from "lit";
import { computeLabel, sortableList } from "./editor-helpers.js";
import {
  compactBlock,
  zoneEntities,
  zonesForEntities,
  setZoneName,
  DEFAULT_TOOLBAR,
  toolbarList,
  toolbarType,
  toggleToolbarBuiltin,
  setToolbarVolumeStyle,
  toolbarCustoms,
  setToolbarCustoms,
  stationFormData,
  stationFromForm,
} from "./media-editor-model.js";

/**
 * Editor controls of the expressive media family. None of them shows YAML:
 * they edit the same config shapes the cards read (zones lists, toolbar
 * `buttons`, stations), through HA selectors. Keys they do not know are kept.
 */

const fire = (el, value) =>
  el.dispatchEvent(new CustomEvent("value-changed", { detail: { value }, bubbles: true, composed: true }));

const shared = css`
  :host {
    display: block;
  }
  .stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .caption {
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  ha-selector {
    display: block;
  }
`;

/* ------------------------------------------------------------------ */
/*  Volume: zones (multi-entity + optional names), link, style         */
/* ------------------------------------------------------------------ */

export const VOLUME_STYLE_SELECTOR = {
  select: {
    mode: "box",
    options: [
      { value: "knob", label: "Draaiknop" },
      { value: "arc", label: "Boog" },
      { value: "tap", label: "Tikken" },
    ],
  },
};
const ZONES_SELECTOR = { entity: { domain: "media_player", multiple: true } };
const LINK_SELECTOR = { entity: { domain: ["switch", "input_boolean"] } };
const TEXT_SELECTOR = { text: {} };

class MateriaVolumeEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    /** The volume block: { zones, link_entity, style, … }. */
    value: { attribute: false },
    /** Zone shown while no zones are set (the card's own entity): display only. */
    defaultEntity: { attribute: false },
  };

  static styles = shared;

  get _block() {
    return this.value ?? {};
  }

  _emit(patch) {
    fire(this, compactBlock({ ...this._block, ...patch }));
  }

  _zones() {
    const zones = this._block.zones;
    if (Array.isArray(zones) && zones.length) return zones;
    return this.defaultEntity ? [{ entity: this.defaultEntity }] : [];
  }

  render() {
    if (!this.hass) return nothing;
    const zones = this._zones();
    const b = this._block;
    return html`<div class="stack">
      <ha-selector
        .hass=${this.hass}
        .selector=${ZONES_SELECTOR}
        .value=${zoneEntities(zones)}
        .label=${"Zones"}
        @value-changed=${(e) => {
          e.stopPropagation();
          this._emit({ zones: zonesForEntities(zones, e.detail.value ?? []) });
        }}
      ></ha-selector>
      ${zones.length > 1
        ? zones.map(
            (z) => html`<ha-selector
              .hass=${this.hass}
              .selector=${TEXT_SELECTOR}
              .value=${z.name ?? ""}
              .label=${`Naam: ${this.hass.states[z.entity]?.attributes?.friendly_name ?? z.entity}`}
              @value-changed=${(e) => {
                e.stopPropagation();
                this._emit({ zones: setZoneName(zones, z.entity, e.detail.value) });
              }}
            ></ha-selector>`
          )
        : nothing}
      <ha-selector
        .hass=${this.hass}
        .selector=${LINK_SELECTOR}
        .value=${b.link_entity ?? ""}
        .label=${"Zones koppelen (schakelaar)"}
        @value-changed=${(e) => {
          e.stopPropagation();
          this._emit({ link_entity: e.detail.value });
        }}
      ></ha-selector>
      <div class="caption">Stijl</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${VOLUME_STYLE_SELECTOR}
        .value=${b.style ?? "knob"}
        @value-changed=${(e) => {
          e.stopPropagation();
          // knob is the default: choosing it again removes the key.
          this._emit({ style: e.detail.value === "knob" && !b.style ? undefined : e.detail.value });
        }}
      ></ha-selector>
    </div>`;
  }
}

customElements.define("materia-volume-editor", MateriaVolumeEditor);

/* ------------------------------------------------------------------ */
/*  Sortable list of items, each edited with an ha-form schema          */
/* ------------------------------------------------------------------ */

class MateriaItemListEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    items: { attribute: false },
    schema: { attribute: false },
    /** item -> header text */
    itemLabel: { attribute: false },
    /** item -> form data / (item, formValue) -> item: for legacy shapes */
    toForm: { attribute: false },
    fromForm: { attribute: false },
    newItem: { attribute: false },
    addLabel: { type: String },
    _expanded: { state: true },
  };

  static styles = [
    shared,
    css`
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        font-size: 14px;
      }
      .item {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .item-head {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .item-head span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-body {
        padding: 8px 12px 12px;
      }
      .drag-handle {
        cursor: grab;
        opacity: 0.5;
        --mdc-icon-size: 20px;
      }
    `,
  ];

  get _items() {
    return Array.isArray(this.items) ? this.items : [];
  }

  _write(items) {
    fire(this, items);
  }

  _add() {
    const items = [...this._items, this.newItem ? this.newItem() : {}];
    this._expanded = items.length - 1;
    this._write(items);
  }

  _remove(i) {
    const items = [...this._items];
    items.splice(i, 1);
    if (this._expanded === i) this._expanded = null;
    this._write(items);
  }

  _move(from, to) {
    const items = [...this._items];
    const [m] = items.splice(from, 1);
    items.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._write(items);
  }

  _update(i, value) {
    const items = [...this._items];
    const old = items[i];
    items[i] = this.fromForm ? this.fromForm(old, value) : { ...old, ...value };
    this._write(items);
  }

  render() {
    if (!this.hass) return nothing;
    const items = this._items;
    return html`
      <div class="head">
        <span>${this.addLabel ?? ""}</span>
        <ha-icon-button .label=${"Toevoegen"} @click=${this._add}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
      </div>
      ${sortableList(
        (from, to) => this._move(from, to),
        items.map(
          (item, i) => html`<div class="item">
            <div class="item-head">
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${(this.itemLabel ? this.itemLabel(item) : "") || `${i + 1}`}</span>
              <ha-icon-button @click=${() => (this._expanded = this._expanded === i ? null : i)}>
                <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._remove(i)}><ha-icon icon="mdi:delete"></ha-icon></ha-icon-button>
            </div>
            ${this._expanded === i
              ? html`<div class="item-body">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this.toForm ? this.toForm(item) : item}
                    .schema=${this.schema}
                    .computeLabel=${computeLabel}
                    @value-changed=${(e) => {
                      e.stopPropagation();
                      this._update(i, e.detail.value);
                    }}
                  ></ha-form>
                </div>`
              : nothing}
          </div>`
        )
      )}
    `;
  }
}

customElements.define("materia-item-list-editor", MateriaItemListEditor);

/* ------------------------------------------------------------------ */
/*  Stations                                                            */
/* ------------------------------------------------------------------ */

const STATION_SCHEMA = [
  { name: "name", label: "Naam", selector: { text: {} } },
  { name: "image", label: "Logo (URL, bv. /local/radio/klara.png)", selector: { text: {} } },
  { name: "tap_action", label: "Actie", selector: { ui_action: { default_action: "perform-action" } } },
];

/** Stations list control for a SmartEditor `render` field. */
export function stationsField(editor, value) {
  return html`<materia-item-list-editor
    .hass=${editor.hass}
    .items=${value ?? []}
    .schema=${STATION_SCHEMA}
    .itemLabel=${(st) => st?.name}
    .toForm=${stationFormData}
    .fromForm=${stationFromForm}
    .newItem=${() => ({ name: "" })}
    addLabel="Zenders"
    @value-changed=${(e) => {
      e.stopPropagation();
      editor._setField("stations", e.detail.value?.length ? e.detail.value : undefined);
    }}
  ></materia-item-list-editor>`;
}

/* ------------------------------------------------------------------ */
/*  Toolbar buttons: built-in chips + custom list                       */
/* ------------------------------------------------------------------ */

const CUSTOM_BUTTON_SCHEMA = [
  { name: "icon", label: "Icoon", selector: { icon: {} } },
  { name: "label", label: "Label", selector: { text: {} } },
  { name: "tap_action", label: "Actie", selector: { ui_action: { default_action: "perform-action" } } },
];
const BUILTIN_LABELS = { shuffle: "Shuffle", repeat: "Herhalen", volume: "Volume" };
const VOLUME_LOOK_SELECTOR = {
  select: { mode: "box", options: [{ value: "ring", label: "Ring met getal" }, { value: "icon", label: "Icoon" }] },
};

class MateriaToolbarButtonsEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    /** The toolbar's `buttons` (undefined = the default shuffle, repeat, volume). */
    value: { attribute: false },
  };

  static styles = [
    shared,
    css`
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .chip {
        height: 32px;
        padding: 0 12px 0 8px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 14px;
        cursor: pointer;
      }
      .chip ha-icon {
        --mdc-icon-size: 18px;
        visibility: hidden;
      }
      .chip[aria-pressed="true"] {
        background: var(--md-sys-color-secondary-container, rgba(var(--rgb-primary-color, 3, 169, 244), 0.15));
        color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
        border-color: transparent;
      }
      .chip[aria-pressed="true"] ha-icon {
        visibility: visible;
      }
    `,
  ];

  /** The default list is written as no `buttons` key at all. */
  _emit(list) {
    fire(this, JSON.stringify(list) === JSON.stringify(DEFAULT_TOOLBAR) ? undefined : list);
  }

  render() {
    if (!this.hass) return nothing;
    const list = toolbarList(this.value);
    const has = (t) => list.some((b) => toolbarType(b) === t);
    const vol = list.find((b) => toolbarType(b) === "volume");
    const ring = typeof vol === "object" && vol?.style === "ring";
    return html`<div class="stack">
      <div class="chips" role="group" aria-label="Knoppen">
        ${Object.entries(BUILTIN_LABELS).map(
          ([type, label]) => html`<button
            class="chip"
            aria-pressed=${has(type) ? "true" : "false"}
            @click=${() => this._emit(toggleToolbarBuiltin(this.value, type, !has(type)))}
          ><ha-icon icon="mdi:check"></ha-icon>${label}</button>`
        )}
      </div>
      ${has("volume")
        ? html`<ha-selector
            .hass=${this.hass}
            .selector=${VOLUME_LOOK_SELECTOR}
            .value=${ring ? "ring" : "icon"}
            @value-changed=${(e) => {
              e.stopPropagation();
              this._emit(setToolbarVolumeStyle(this.value, e.detail.value === "ring"));
            }}
          ></ha-selector>`
        : nothing}
      <materia-item-list-editor
        .hass=${this.hass}
        .items=${toolbarCustoms(this.value)}
        .schema=${CUSTOM_BUTTON_SCHEMA}
        .itemLabel=${(b) => b?.label || b?.icon}
        .newItem=${() => ({ icon: "mdi:gesture-tap" })}
        addLabel="Eigen knoppen"
        @value-changed=${(e) => {
          e.stopPropagation();
          this._emit(setToolbarCustoms(this.value, e.detail.value));
        }}
      ></materia-item-list-editor>
    </div>`;
  }
}

customElements.define("materia-toolbar-buttons-editor", MateriaToolbarButtonsEditor);

/* ------------------------------------------------------------------ */
/*  Sections for SmartEditor-based editors                              */
/* ------------------------------------------------------------------ */

/**
 * A "Volume" section: edits the card's `volume:` block. Inside an art scope
 * the card inherits the scope's block, so this is an override.
 */
export function volumeOverrideSection(editor, { title = "Volume (eigen instellingen)", expanded = false } = {}) {
  return {
    title,
    icon: "mdi:volume-high",
    expanded,
    fields: [
      {
        name: "volume",
        render: (value, data) => html`<materia-volume-editor
          .hass=${editor.hass}
          .value=${value}
          .defaultEntity=${data.entity}
          @value-changed=${(e) => {
            e.stopPropagation();
            editor._setField("volume", e.detail.value);
          }}
        ></materia-volume-editor>`,
      },
    ],
  };
}
