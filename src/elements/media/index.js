import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

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
      // C-morph: a typographic beat when a NEW track lands, then settle.
      const track = this._stateObj?.attributes?.media_title;
      if (track && this._lastTrack && track !== this._lastTrack) {
        this._beat = true;
        this.requestUpdate();
        clearTimeout(this._beatTimer);
        this._beatTimer = setTimeout(() => {
          this._beat = false;
          this.requestUpdate();
        }, 900);
      }
      this._lastTrack = track;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._beatTimer);
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

  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this._stateObj;
    const unavailable = this._isUnavailable(stateObj);
    const image = this._image;
    const title = this._title;
    const subtitle = this._subtitle;
    // Primary art over the fallback as TWO background layers, not one. A CSS
    // background has no error event, so this is the only hook available — and
    // it is the right one: layers paint in order and a layer that fails to
    // decode just reveals the next. Until now fallback_image was consulted
    // only when the URL was EMPTY, so a URL that resolved but served garbage
    // (an amp streaming its album art as a malformed octet-stream, a device
    // that went offline, a stale CDN logo) left a blank square.
    const fb = this.config.fallback_image;
    const layers = [image, fb && fb !== image ? fb : null]
      .filter(Boolean)
      .map((u) => `url('${u}')`)
      .join(", ");
    const artStyle = `${this.config.art_size ? `--mm-art:${this.config.art_size}px;` : ""}${layers ? `background-image:${layers};` : ""}`;

    // Editorial typography only when a real track is showing — a device name
    // (off/idle) is not a headline.
    const editorial = !unavailable && !!stateObj?.attributes?.media_title && !["off", "idle", "standby"].includes(stateObj.state);
    const paused = editorial && stateObj.state === "paused";
    return html`
      <ha-card>
        <div class="wrap ${unavailable ? "unavailable" : ""} ${editorial ? "editorial" : ""} ${this._beat ? "beat" : ""} ${paused ? "paused" : ""}" @click=${this._tap}>
          ${this.config.show_art === false
            ? nothing
            : html`<div class="art" style=${artStyle}></div>`}
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
