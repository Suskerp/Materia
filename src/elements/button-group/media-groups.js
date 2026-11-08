import { html, css, nothing } from "lit";
import { t } from "../../utils/i18n.js";
import {
  mediaControls,
  isMediaOff,
  nextRepeat,
  toolbarLayout,
  heldValue,
  holdSkipButtons,
} from "../../utils/media.js";
import { attributeMapOf } from "../../utils/media-attributes.js";
import { SIZES } from "./styles.js";
import { toolbarList } from "../../utils/media-editor-model.js";

/**
 * The media configurations of materia-button-group:
 *
 *   group: transport — prev / play-pause / next as an M3 Expressive STANDARD
 *     (not connected) group. The pressed button widens and its neighbours
 *     shrink; play is the larger tertiary-container shape, rounder when
 *     paused and squarer when playing; prev/next are primary-container. A
 *     source without next/previous (radio) gets a solo play button.
 *
 *   group: toolbar — a CONNECTED group on its own surface container (the M3
 *     Expressive toolbar): shuffle, repeat (off -> all -> one), volume and
 *     custom buttons. Outer radii follow the VISIBLE buttons. When only the
 *     volume button shows, it reads "Volume NN" at the play button's width.
 *
 * Both read the media player's `controls` attribute, else supported_features.
 */

/** Height of the transport row when no `size` is configured (tuned prototype). */
export const TRANSPORT_HEIGHT = 88;
/** Width of a solo play button and of a solo toolbar button: the two line up. */
export const SOLO_WIDTH = 280;

export const MEDIA_GROUPS = new Set(["transport", "toolbar"]);

const TOOLBAR_TYPES = new Set(["shuffle", "repeat", "volume"]);

export function toolbarItems(config) {
  const raw = toolbarList(config.buttons);
  return raw.map((b) => (typeof b === "string" ? { type: b } : { ...b }));
}

export function renderTransport(el) {
  const { hass, config } = el;
  const s = hass.states[config.entity];
  const ctrl = mediaControls(s, el._attributeMap());
  if (isMediaOff(s) || !ctrl.includes("play_pause")) return html``;
  // Shown at once on tap; the player confirms a moment later.
  const playing = heldValue(el._pendingPlay, s.state === "playing");
  // Kept through the brief gap in controls while a track changes.
  const skip = holdSkipButtons(el._skipHold, { prev: ctrl.includes("previous"), next: ctrl.includes("next") });
  el._skipHold = skip.hold;
  const { prev, next } = skip;
  const height = SIZES[config.size]?.height ?? TRANSPORT_HEIGHT;
  const pressed = el._mediaPressed;
  const press = (key) => ({
    down: () => el._mediaPress(key),
    cls: pressed === key ? "pressed" : "",
  });
  const button = (key, cls, icon, label, service) => {
    const p = press(key);
    return html`<button
      type="button"
      class="${cls} ${p.cls}"
      aria-label=${label}
      @pointerdown=${p.down}
      @click=${() => {
        if (key === "play") el._setPending("_pendingPlay", !playing, 4000);
        el._mediaService(service);
      }}
    ><ha-icon .icon=${icon}></ha-icon></button>`;
  };
  return html`<ha-card>
    <div
      class="transport ${prev || next ? "" : "solo"} ${pressed ? "has-pressed" : ""}"
      style="--tp-h:${height}px;--tp-solo:${SOLO_WIDTH}px;"
      role="group"
    >
      ${prev ? button("prev", "side", "mdi:skip-previous", t("media_previous", hass), "media_previous_track") : nothing}
      ${button("play", `main ${playing ? "playing" : ""}`, playing ? "mdi:pause" : "mdi:play", t("media_play_pause", hass), "media_play_pause")}
      ${next ? button("next", "side", "mdi:skip-next", t("media_next", hass), "media_next_track") : nothing}
    </div>
  </ha-card>`;
}

export function renderToolbar(el) {
  const { hass, config } = el;
  const s = hass.states[config.entity];
  const a = s?.attributes ?? {};
  const ctrl = mediaControls(s, el._attributeMap());
  const items = toolbarItems(config);
  // Decided on the VISIBLE buttons (shuffle / repeat only where supported).
  const { visible, first, last, solo, mode } = toolbarLayout(items, ctrl);
  if (mode === "none") return html``;

  const button = (b, i) => {
    if (!visible[i]) return nothing;
    const edge = `${i === first ? "first" : ""} ${i === last ? "last" : ""}`;
    if (b.type === "shuffle") {
      // Shown at once; the streamer reports a play-mode change only with its next update.
      const on = heldValue(el._pendingMode?.shuffle, !!a.shuffle);
      return html`<button
        type="button"
        class="${edge} ${on ? "on" : ""}"
        aria-label=${t("media_shuffle", hass)}
        aria-pressed=${on ? "true" : "false"}
        @click=${() => el._setPlayMode("shuffle", !on, "shuffle_set", { shuffle: !on })}
      ><ha-icon .icon=${b.icon || "mdi:shuffle-variant"}></ha-icon></button>`;
    }
    if (b.type === "repeat") {
      const mode = heldValue(el._pendingMode?.repeat, a.repeat ?? "off");
      return html`<button
        type="button"
        class="${edge} ${mode !== "off" ? "on" : ""}"
        aria-label=${t("media_repeat", hass)}
        aria-pressed=${mode !== "off" ? "true" : "false"}
        @click=${() => el._setPlayMode("repeat", nextRepeat(mode), "repeat_set", { repeat: nextRepeat(mode) })}
      ><ha-icon .icon=${mode === "one" ? "mdi:repeat-once" : "mdi:repeat"}></ha-icon></button>`;
    }
    if (b.type === "volume") {
      // Alone it reads "Volume"; the level itself is shown in the panel.
      const label = solo ? t("media_volume", hass) : b.label;
      // Nothing to set while the player is off.
      const disabled = isMediaOff(s);
      return html`<button
        type="button"
        class="${edge} ${el._openPanel === "volume" ? "open" : ""}"
        ?disabled=${disabled}
        aria-label=${t("media_volume", hass)}
        aria-expanded=${el._openPanel === "volume" ? "true" : "false"}
        @click=${(e) => el._mediaOpenVolume(e)}
      >${html`<ha-icon .icon=${b.icon || "mdi:volume-high"}></ha-icon>`}${label
        ? html`<span>${label}</span>`
        : nothing}</button>`;
    }
    const on = b.entity ? el._truthy(hass.states[b.entity]?.state) : false;
    const open = b.panel && el._openPanel === b.panel;
    return html`<button
      type="button"
      class="${edge} ${on ? "on" : ""} ${open ? "open" : ""}"
      aria-label=${b.aria_label || b.label || b.icon || ""}
      @click=${(e) => el._mediaCustom(b, e)}
    >${b.icon ? html`<ha-icon .icon=${b.icon}></ha-icon>` : nothing}${b.label ? html`<span>${b.label}</span>` : nothing}</button>`;
  };

  return html`<ha-card class="toolbar-card ${config.align === "start" ? "start" : ""}">
    <div class="toolbar ${solo ? "solo" : ""}" role="toolbar" style="--tp-solo:${SOLO_WIDTH}px;">
      ${items.map(button)}
    </div>
  </ha-card>`;
}

/** Mixed into MateriaButtonGroup: the handlers the two renderers call. */
export const MediaGroupMixin = (superClass) =>
  class extends superClass {
    _attributeMap() {
      return attributeMapOf(this);
    }

    _mediaService(service, data = {}) {
      this._fireHaptic("light");
      this._callService("media_player", service, { entity_id: this.config.entity, ...data });
    }

    /** Shows a tapped value now and re-renders when its hold ends. */
    _setPending(prop, value, ms) {
      this[prop] = { value, until: Date.now() + ms };
      this.requestUpdate();
      clearTimeout(this[`${prop}Timer`]);
      this[`${prop}Timer`] = setTimeout(() => this.requestUpdate(), ms + 100);
    }

    /** Shuffle / repeat: show the new value now, hold it until the player reports it (6 s at most). */
    _setPlayMode(key, value, service, data) {
      this._pendingMode = { ...(this._pendingMode ?? {}), [key]: { value, until: Date.now() + 6000 } };
      this.requestUpdate();
      clearTimeout(this.__modeTimer);
      this.__modeTimer = setTimeout(() => this.requestUpdate(), 6100);
      this._mediaService(service, data);
    }

    /** Touch releases too fast for :active to be seen; hold the pressed shape briefly. */
    _mediaPress(key) {
      clearTimeout(this.__pressTimer);
      this._mediaPressed = key;
      this.requestUpdate();
      const release = () => {
        window.removeEventListener("pointerup", release);
        window.removeEventListener("pointercancel", release);
        this.__pressTimer = setTimeout(() => {
          this._mediaPressed = null;
          this.requestUpdate();
        }, 160);
      };
      window.addEventListener("pointerup", release);
      window.addEventListener("pointercancel", release);
    }

    _mediaOpenVolume(e) {
      this._fireHaptic("light");
      this._openVolumePanel(e.currentTarget);
    }

    /** A custom button with `card:` opens that card (in kiosk panel `panel:`, else a sheet). */
    _mediaCustom(b, e) {
      if (b.card) {
        this._fireHaptic("light");
        this._openSheet(e.currentTarget, b.card, b.label, b.panel ?? null);
      } else if (b.tap_action) this._handleAction(b.entity ? { entity: b.entity, ...b.tap_action } : b.tap_action);
      else if (b.entity) this._fireMoreInfo(b.entity);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      clearTimeout(this.__pressTimer);
    }
  };

export const mediaGroupStyles = [
  css`
    /* ---- transport: standard group with an expressive width/shape morph ---- */
    .transport {
      display: flex;
      gap: 10px;
      height: var(--tp-h);
    }

    .transport button {
      flex: 1 1 0;
      min-width: 0;
      display: grid;
      place-items: center;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: calc(var(--tp-h) / 2);
      transition:
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .transport .side {
      background: var(--md-sys-color-primary-container, rgba(127, 127, 127, 0.2));
      color: var(--md-sys-color-on-primary-container, var(--primary-text-color));
    }

    .transport .main {
      flex-grow: 1.45;
      background: var(--md-sys-color-tertiary-container, rgba(127, 127, 127, 0.25));
      color: var(--md-sys-color-on-tertiary-container, var(--primary-text-color));
    }

    /* Playing = squarer (28 of 88), paused = round. */
    .transport .main.playing {
      border-radius: calc(var(--tp-h) * 0.318);
    }

    .transport button:active,
    .transport button.pressed {
      flex-grow: 1.7;
      border-radius: calc(var(--tp-h) / 4);
    }

    .transport.has-pressed button:not(.pressed),
    .transport button:active ~ button,
    .transport button:has(~ button:active) {
      flex-grow: 0.85;
    }

    .transport ha-icon {
      --mdc-icon-size: 32px;
    }

    .transport.solo {
      justify-content: center;
    }

    .transport.solo .main,
    .transport.solo .main.pressed {
      flex: 0 1 var(--tp-solo);
    }

    /* ---- toolbar: a connected group on its own container ---- */
    ha-card.toolbar-card {
      display: flex;
      justify-content: center;
    }

    ha-card.toolbar-card.start {
      justify-content: flex-start;
    }

    /* Hugs its buttons: never stretched by the card, whatever the alignment. */
    .toolbar {
      flex: 0 0 auto;
      width: fit-content;
      max-width: 100%;
      display: flex;
      gap: 4px;
      padding: 6px;
      box-sizing: border-box;
      border-radius: 32px;
      background: var(--md-sys-color-surface-container-high, rgba(127, 127, 127, 0.12));
    }

    .toolbar button {
      height: 52px;
      min-width: 68px;
      padding: 0 18px;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
      border: none;
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      background: var(--md-sys-color-surface-container-highest, rgba(127, 127, 127, 0.2));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      border-radius: 8px;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .toolbar button.first {
      border-radius: 26px 8px 8px 26px;
    }

    .toolbar button.last {
      border-radius: 8px 26px 26px 8px;
    }

    .toolbar button.first.last,
    .toolbar button.on {
      border-radius: 26px;
    }

    .toolbar button.on {
      background: var(--md-sys-color-primary, var(--primary-color));
      color: var(--md-sys-color-on-primary, #fff);
    }

    .toolbar button:active {
      border-radius: 14px;
    }

    /* The button whose kiosk panel is open: secondary container, full round. */
    .toolbar button.open {
      border-radius: 26px;
      background: var(--md-sys-color-secondary-container, rgba(127, 127, 127, 0.3));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    .toolbar button:disabled {
      opacity: 0.38;
      cursor: default;
      pointer-events: none;
    }

    .toolbar.solo button {
      width: min(var(--tp-solo), calc(100vw - 96px));
    }

    @media (prefers-reduced-motion: reduce) {
      .transport button,
      .toolbar button {
        transition: none;
      }
    }
  `,
];
