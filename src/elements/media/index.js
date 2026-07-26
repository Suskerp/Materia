import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { materialCookiePath, roundedPolygonPath } from "../../utils/shapes.js";
import { styles } from "./styles.js";
import "./editor.js";

/* Canonical MaterialShapes cutouts for the album art, generated once at
   module load (100-unit space, scaled to objectBoundingBox in the clipPath). */
const ART_CLIPS = {
  // Official MaterialShapes only, canonical params (star, inner .8):
  // cookies use rounding .5, sunny uses .15 (androidx MaterialShapes.kt).
  cookie12: materialCookiePath(50, 50, 49, 12),
  cookie9: materialCookiePath(50, 50, 49, 9),
  cookie7: materialCookiePath(50, 50, 49, 7),
  sunny: roundedPolygonPath(50, 50, 49, { vertices: 8, innerRadius: 0.8, rounding: 0.15, rotate: -Math.PI / 2 }),
};

class MateriaMedia extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedName: { state: true },
    _resolvedSubtitle: { state: true },
    _resolvedImage: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-media-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = config;
  }

  updated(changed) {
    if (changed.has("hass") && this.hass) {
      this._resolveField("name", "_resolvedName");
      this._resolveField("subtitle", "_resolvedSubtitle");
      this._resolveField("image", "_resolvedImage");
    }
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  get _title() {
    if (this.config.name) {
      return this._isTemplate(this.config.name) ? this._resolvedName : this.config.name;
    }
    const a = this._stateObj?.attributes;
    return a?.media_title || a?.friendly_name || "";
  }

  get _subtitle() {
    if (this.config.subtitle) {
      return this._isTemplate(this.config.subtitle) ? this._resolvedSubtitle : this.config.subtitle;
    }
    const a = this._stateObj?.attributes;
    return a?.media_artist || a?.media_album_name || "";
  }

  get _image() {
    if (this.config.image) {
      const img = this._isTemplate(this.config.image) ? this._resolvedImage : this.config.image;
      if (img) return img;
    }
    return this._stateObj?.attributes?.entity_picture || this.config.fallback_image || "";
  }

  _tap() {
    this._handleAction(this.config.tap_action || { action: "more-info" });
  }

  /** M3 expressive art cutouts. Deterministic per TRACK: the same song keeps
   *  its shape across reloads, and the shape rotates as the music changes.
   *  Set `art_shape` to pin one, or `art_shape: square` for the classic. */
  static ART_SHAPES = ["cookie12", "cookie9", "cookie7", "sunny"];

  _artShape(stateObj, title) {
    const cfg = this.config.art_shape;
    if (cfg === "square") return null;
    if (cfg && MateriaMedia.ART_SHAPES.includes(cfg)) return cfg;
    // Hash the track identity → stable index (not per page load).
    const key = String(stateObj?.attributes?.media_content_id || title || this.config.entity || "");
    let h = 0;
    for (let i = 0; i < key.length; i++) h = ((h << 5) - h + key.charCodeAt(i)) | 0;
    return MateriaMedia.ART_SHAPES[Math.abs(h) % MateriaMedia.ART_SHAPES.length];
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this._stateObj;
    const unavailable = this._isUnavailable(stateObj);
    const image = this._image;
    const title = this._title;
    const subtitle = this._subtitle;
    const artStyle = `${this.config.art_size ? `--mm-art:${this.config.art_size}px;` : ""}${image ? `background-image:url('${image}');` : ""}`;
    const shape = this.config.show_art === false ? null : this._artShape(stateObj, title);

    return html`
      <ha-card>
        <div class="wrap ${unavailable ? "unavailable" : ""}" @click=${this._tap}>
          ${shape
            ? svg`<svg width="0" height="0" style="position:absolute" aria-hidden="true">
                <defs>
                  <clipPath id="artclip-${shape}" clipPathUnits="objectBoundingBox">
                    <path transform="scale(0.01)" d=${ART_CLIPS[shape]} />
                  </clipPath>
                </defs>
              </svg>`
            : nothing}
          ${this.config.show_art === false
            ? nothing
            : html`<div class="art ${shape ? `shape-${shape}` : ""}" style=${shape ? `${artStyle}clip-path:url(#artclip-${shape});` : artStyle}></div>`}
          ${title ? html`<div class="title">${title}</div>` : nothing}
          ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : nothing}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("materia-media", MateriaMedia);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-media",
  name: "Materia Media",
  description: "Now-playing card — album art, title and subtitle (all templatable).",
  preview: true,
});
