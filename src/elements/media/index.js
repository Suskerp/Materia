import "../shape-morph/index.js";
import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import {
  isLive,
  isMediaOff,
  nowPlayingText,
  sameText as same,
  fitArtSize,
  ART_MAX,
  ART_FIT_MARGIN,
} from "../../utils/media.js";
import { volumeContext } from "../../primitives/sheet.js";
import { t } from "../../utils/i18n.js";
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
    this._watchArt();
    this._blurOnNewCover();
  }

  /** New cover: blur the old one until the new image has loaded, then sharpen into it. */
  _blurOnNewCover() {
    const image = this._image;
    const art = this.renderRoot?.querySelector(".art.pl-art");
    if (!art || image === this._shownImage) return;
    const previous = this._shownImage;
    this._shownImage = image;
    if (!previous || !image) return;
    art.classList.add("swapping");
    const done = () => art.classList.remove("swapping");
    const img = new Image();
    img.onload = img.onerror = () => setTimeout(done, 120);
    img.src = image;
    clearTimeout(this._swapTimer);
    this._swapTimer = setTimeout(done, 2500); // never stay blurred
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._beatTimer);
    clearTimeout(this._fitHold);
    clearTimeout(this._swapTimer);
    this._artRo?.disconnect();
    this._artWatched = null;
    window.removeEventListener("resize", this._onArtResize);
  }

  /* ---- art_size: auto — size the cover by the space really available ---- */

  /** Observe the auto-sized cover; refit on its width changing and on window resize. */
  _watchArt() {
    const art = this.renderRoot?.querySelector(".art.art-auto") ?? null;
    if (art === this._artWatched) return;
    this._artWatched = art;
    this._onArtResize ??= () => this._scheduleFit();
    this._artRo ??= new ResizeObserver(() => this._scheduleFit());
    this._artRo.disconnect();
    window.removeEventListener("resize", this._onArtResize);
    if (!art) {
      this.style.removeProperty("--mm-auto-size");
      return;
    }
    this._artRo.observe(this);
    window.addEventListener("resize", this._onArtResize);
    this._scheduleFit();
  }

  _scheduleFit() {
    cancelAnimationFrame(this._fitRaf);
    this._fitRaf = requestAnimationFrame(() => this._fitArt());
  }

  /**
   * The unit that must fit is the enclosing materia-art-scope (header, art,
   * progress, transport and toolbar together) or this card on its own. Its
   * height is bounded by the nearest ancestor that clips vertically (a swipe
   * card's slide, a scrolling view), else by the viewport — but the viewport
   * only when the unit starts in the upper half of it, i.e. when it is the
   * main content and not a card further down a long column.
   */
  _fitArt(settled = false) {
    const art = this._artWatched;
    if (!art || !this.isConnected) return;
    const width = art.parentElement?.clientWidth ?? 0;
    if (!width) return; // a hidden slide: measure when it is shown
    // art_max, or --materia-art-max from a theme / card-mod, else ART_MAX.
    const cssMax = parseFloat(getComputedStyle(art).getPropertyValue("--materia-art-max"));
    const max = Math.min(width, cssMax > 0 ? cssMax : ART_MAX);
    const unit = volumeContext(this).scope ?? this;
    const current = art.getBoundingClientRect().height;
    const spare = this._spareBelow(unit);
    const size = fitArtSize({ current, max, spare: spare == null ? null : spare - ART_FIT_MARGIN });
    if (size === this._artPx) {
      clearTimeout(this._fitHold);
      this._fitHold = null;
      return;
    }
    const apply = () => {
      this._artPx = size;
      this.style.setProperty("--mm-auto-size", `${size}px`);
    };
    // First fit at once. After that a new size must hold for a moment: a track
    // change briefly empties the titles and controls, and the cover would
    // otherwise jump twice.
    if (this._artPx == null || settled) return apply();
    if (!this._fitHold) this._fitHold = setTimeout(() => {
      this._fitHold = null;
      this._fitArt(true);
    }, 1200);
  }

  /** Room below `unit` in what bounds it (negative = overflow), or null when unbounded. */
  _spareBelow(unit) {
    const rect = unit.getBoundingClientRect();
    for (let node = unit.parentNode || unit.host; node; node = node.parentNode || node.host) {
      if (!(node instanceof Element) || node === document.body || node === document.documentElement) continue;
      const oy = getComputedStyle(node).overflowY;
      if (oy === "visible") continue;
      const box = node.getBoundingClientRect();
      // Content-sized (nothing clipped, no room either): it follows the card,
      // so it bounds nothing. Shrinking against it would never stop.
      if (node.scrollHeight <= node.clientHeight + 1 && box.bottom - rect.bottom < 1) continue;
      const top = rect.top - box.top + node.scrollTop;
      if (top > node.clientHeight / 2) return null;
      return node.clientHeight - (top + rect.height);
    }
    const top = rect.top + window.scrollY;
    if (top > window.innerHeight / 2) return null;
    return window.innerHeight - (top + rect.height);
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
    // The player variant is a control surface: its cover does nothing on tap
    // unless a tap_action asks for it. The plain card keeps more-info.
    const fallback = this.config.variant === "player" ? { action: "none" } : { action: "more-info" };
    this._handleAction(this.config.tap_action || fallback);
  }

  /**
   * Art size: a number is a px cap (the original behaviour); "auto" shrinks
   * with the viewport height so a phone keeps the header and both button
   * rows on screen; "fill" takes the full width (kiosk cover column).
   */
  _artSize() {
    const size = this.config.art_size ?? (this.config.variant === "player" ? "auto" : null);
    const max = Number(this.config.art_max) > 0 ? `--materia-art-max:${Number(this.config.art_max)}px;` : "";
    if (size === "auto" || size === "fill") return { cls: `art-${size}`, style: max };
    const px = Number(size);
    return { cls: "", style: Number.isFinite(px) && px > 0 ? `--mm-art:${px}px;` : "" };
  }

  /** variant: player — the M3 Expressive now-playing block (art, title row, app chip). */
  _renderPlayer() {
    const s = this._stateObj;
    const a = s?.attributes ?? {};
    const off = isMediaOff(s);
    const image = this._image;
    const size = this._artSize();
    // Live radio sends a station LOGO: white ground, contained, never cropped.
    const logo = this.config.live_logo !== false && isLive(s);
    // Each distinct value once: a TV app that reports no title arrives as
    // title = app name, and must not be repeated as the app chip.
    const np = nowPlayingText({
      source: a.source,
      app: a.app_name,
      title: a.media_title,
      artist: a.media_artist,
      album: a.media_album_name,
    });
    const title = this.config.name ? this._title : off ? t("state_off", this.hass) : np.title;
    const subtitle = this.config.subtitle ? this._subtitle : off ? "" : np.subtitle;
    const app = this.config.show_app !== false && !off && !same(np.appChip, title) ? np.appChip : null;
    return html`
      <ha-card>
        <div class="player ${off ? "off" : ""}">
          ${this.config.show_art === false
            ? nothing
            : html`<div
                class="art pl-art ${size.cls} ${logo ? "logo" : ""} ${off && this.config.off_animation !== false ? "resting" : ""}"
                style="${size.style}${image && !(off && this.config.off_animation !== false) ? `background-image:url('${image}');` : ""}"
                @click=${this._tap}
              >${off && this.config.off_animation !== false ? html`<materia-shape-morph></materia-shape-morph>` : nothing}</div>`}
          ${this.config.show_titles === false
            ? nothing
            : html`<div class="titlerow">
                <div class="titles">
                  <div class="pl-title">${title}</div>
                  ${subtitle ? html`<div class="pl-sub">${subtitle}</div>` : nothing}
                </div>
                ${app ? html`<div class="chip">${app}</div>` : nothing}
              </div>`}
        </div>
      </ha-card>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    if (this.config.variant === "player") return this._renderPlayer();
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
    const size = this._artSize();
    const artStyle = `${size.style}${layers ? `background-image:${layers};` : ""}`;

    // Editorial typography only when a real track is showing — a device name
    // (off/idle) is not a headline.
    const editorial = !unavailable && !!stateObj?.attributes?.media_title && !["off", "idle", "standby"].includes(stateObj.state);
    const paused = editorial && stateObj.state === "paused";
    return html`
      <ha-card>
        <div class="wrap ${unavailable ? "unavailable" : ""} ${editorial ? "editorial" : ""} ${this._beat ? "beat" : ""} ${paused ? "paused" : ""}" @click=${this._tap}>
          ${this.config.show_art === false
            ? nothing
            : html`<div class="art ${size.cls}" style=${artStyle}></div>`}
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
  description: "Now-playing card — album art, title and subtitle (all templatable); variant player for the expressive player.",
  preview: true,
});
