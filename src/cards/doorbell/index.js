import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { materialCookiePath } from "../../utils/shapes.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import "./editor.js";

/* NOT the design's literal 12-scallop blob: the buzz shape is Materia's own
 * 9-lobe cookie — the exact silhouette materia-lock wears — so the two door
 * controls read as one family. The waves are the SAME path scaled outward,
 * so they stay the cookie's own sound. */
const COOKIE = materialCookiePath(90, 90, 86, 9);

/** How long "Buzzed" lingers after the buzzer stops before settling back. */
const BUZZED_LINGER_MS = 6000;

/**
 * materia-doorbell — the Doorbell Alert design as one card.
 *
 * Every phase is DERIVED FROM ENTITIES, not client state: ringing is the
 * doorbell entity being on, buzzing is the buzzer script running, opened is
 * the lock, and the countdown is computed from the doorbell's last_changed —
 * so two phones showing the same ring always agree, and a replay is nothing
 * more than turning the doorbell back on. The only client-side residue is the
 * 6s "Buzzed" linger, which is a presentation beat, not a fact.
 */
class MateriaDoorbell extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _now: { state: true },
    _buzzedUntil: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-doorbell-editor");
  }

  static getStubConfig() {
    return { entity: "", timeout: 30 };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required (on = ringing)");
    this.config = { timeout: 30, ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncTicker();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._tick);
    this._tick = null;
    clearTimeout(this._lingerTimer);
  }

  /* ---- derived phases ---- */

  _on(id) {
    const st = id ? this.hass?.states[id] : undefined;
    return st ? st.state === "on" : false;
  }

  get _ringing() {
    return this._on(this.config.entity);
  }

  get _buzzing() {
    return this._on(this.config.buzz_entity);
  }

  get _lockState() {
    const id = this.config.lock;
    return id ? String(this.hass?.states[id]?.state ?? "") : "";
  }

  get _opened() {
    return ["unlocked", "unlocking"].includes(this._lockState);
  }

  get _unlocking() {
    return ["unlocking", "locking"].includes(this._lockState);
  }

  /** Seconds left on the ring, from the doorbell entity's own last_changed —
   *  no client clock to drift, and a replay (turn it on again) resets it. */
  get _left() {
    if (!this._ringing) return 0;
    const st = this.hass?.states[this.config.entity];
    const t0 = st ? new Date(st.last_changed).getTime() : NaN;
    if (Number.isNaN(t0)) return this.config.timeout;
    return Math.max(0, Math.ceil(this.config.timeout - (Date.now() - t0) / 1000));
  }

  get _phase() {
    if (this._buzzing) return "buzzing";
    if (this._buzzedUntil && Date.now() < this._buzzedUntil) return "buzzed";
    if (this._opened) return "opened";
    if (this._ringing) return "ringing";
    return "lapsed";
  }

  /* ---- clockwork ---- */

  updated(changed) {
    if (changed.has("hass")) {
      // on -> off on the buzzer starts the 6s "Buzzed" linger.
      const buzzing = this._buzzing;
      if (this._wasBuzzing && !buzzing) {
        this._buzzedUntil = Date.now() + BUZZED_LINGER_MS;
        clearTimeout(this._lingerTimer);
        this._lingerTimer = setTimeout(() => this.requestUpdate(), BUZZED_LINGER_MS + 50);
      }
      this._wasBuzzing = buzzing;
      this._syncTicker();
    }
  }

  _syncTicker() {
    const need = this._ringing;
    if (need && !this._tick) {
      this._tick = setInterval(() => {
        this._now = Date.now();
      }, 1000);
    } else if (!need && this._tick) {
      clearInterval(this._tick);
      this._tick = null;
    }
  }

  /* ---- actions ---- */

  _buzz() {
    if (!this.config.buzz_action) return;
    this._handleAction(this.config.buzz_action);
    // Without a buzz_entity there is no on->off transition to start the
    // "Buzzed" linger, so tapping Buzz gave NO feedback at all — the card sat
    // on the ringing face as if nothing happened (a momentary street-door
    // relay often has no lasting state to expose). Optimistic confirmation,
    // same contract as bar-select/select-hero: when the entity exists,
    // reality drives the linger and this branch never runs.
    if (!this.config.buzz_entity) {
      this._buzzedUntil = Date.now() + BUZZED_LINGER_MS;
      clearTimeout(this._lingerTimer);
      this._lingerTimer = setTimeout(() => this.requestUpdate(), BUZZED_LINGER_MS + 50);
    }
  }

  /** Slide is a TOGGLE, like materia-lock: unlocked slides back to lock.
   *  Decided from the RAW lock state, not _opened — _opened includes
   *  "unlocking" (the panel should flood the moment the bolt starts moving),
   *  so keying the service off it meant a slide DURING the unlock transition
   *  sent lock.lock and re-locked the door the user had just opened.
   *  _callService, not hass.callService: a refused unlock must surface the
   *  toast and failure haptic, not vanish as an unhandled rejection. */
  _slide() {
    if (!this.config.lock) return;
    const service = this._lockState === "unlocked" ? "lock" : "unlock";
    this._callService("lock", service, { entity_id: this.config.lock });
  }

  _ignore() {
    if (this.config.ignore_action) this._handleAction(this.config.ignore_action);
  }

  _replay() {
    if (this.config.replay_action) this._handleAction(this.config.replay_action);
  }

  _toggleMute() {
    if (!this.config.mute_entity) return;
    this._callService("homeassistant", "toggle", { entity_id: this.config.mute_entity });
  }

  /* ---- copy per phase ---- */

  _copy(phase) {
    const h = this.hass;
    const place = this.config.place ?? t("db_eyebrow_front", h);
    const left = this._left;
    const perPhase = {
      ringing: {
        eyebrow: this.config.name ?? t("db_eyebrow", h),
        accent: true,
        title: t("db_title_ringing", h),
        sub: t("db_sub_ringing", h, { place }),
        num: `${left}s`,
        numAccent: true,
        cap: t("db_count_before_lapse", h),
        icon: "m3of:notifications-active",
        chip: "live ringing",
      },
      buzzing: {
        eyebrow: t("db_eyebrow_street", h),
        accent: true,
        title: t("db_title_buzzing", h),
        sub: t("db_sub_buzzing", h),
        num: "···",
        numAccent: false,
        cap: t("db_count_buzzing", h),
        // graphic-eq is not in the installed Material Symbols subset — blank
        // glyphs, verified against the pack's file list. volume-up is.
        icon: "m3o:volume-up",
        chip: "live",
      },
      buzzed: {
        eyebrow: t("db_eyebrow_street", h),
        accent: false,
        title: t("db_title_buzzed", h),
        sub: t("db_sub_buzzed", h),
        num: t("db_count_done", h),
        numAccent: false,
        cap: t("db_count_buzzed", h),
        icon: "m3o:volume-up",
        chip: "soft",
      },
      opened: {
        eyebrow: t("db_eyebrow_front", h),
        accent: false,
        title: t("db_title_opened", h),
        titleAccent: true,
        sub: t("db_sub_opened", h),
        num: t("db_count_open", h),
        numAccent: true,
        cap: t("db_count_opened", h),
        icon: "m3o:lock-open-right",
        chip: "live",
      },
      lapsed: {
        eyebrow: this.config.name ?? t("db_eyebrow", h),
        accent: false,
        title: t("db_title_lapsed", h),
        sub: t("db_sub_lapsed", h),
        num: "—",
        numAccent: false,
        cap: t("db_count_lapsed", h),
        icon: "m3o:notifications-off",
        chip: "",
      },
    };
    return perPhase[phase];
  }

  render() {
    if (!this.config || !this.hass) return html``;
    const phase = this._phase;
    const c = this._copy(phase);
    const busy = phase === "buzzing";
    const opened = phase === "opened";
    const pct = phase === "ringing"
      ? (this.config.timeout > 0 ? Math.round((this._left / this.config.timeout) * 100) : 0)
      : phase === "lapsed" ? 0 : 100;

    const cookieWord = busy
      ? t("db_buzz_busy", this.hass)
      : phase === "buzzed"
      ? t("db_buzz_done", this.hass)
      : t("db_buzz_cta", this.hass);
    const cookieIcon = busy
      ? "m3o:volume-up"
      : phase === "buzzed"
      ? "m3o:check-circle"
      : "m3o:campaign";

    const muted = this._on(this.config.mute_entity);

    return html`
      <ha-card>
        <div class="countbar ${phase === "lapsed" ? "lapsed" : ""}">
          <div class="fill" style="width:${pct}%"></div>
        </div>
        <div class="body">
          <div class="head">
            <div class="chip ${c.chip}"><ha-icon .icon=${c.icon}></ha-icon></div>
            <div class="headline">
              <span class="eyebrow ${c.accent ? "accent" : ""}">${c.eyebrow}</span>
              <span class="title ${c.titleAccent ? "accent" : ""}">${c.title}</span>
              <span class="subtitle">${c.sub}</span>
            </div>
            <div class="count">
              <span class="num ${c.numAccent ? "accent" : ""}">${c.num}</span>
              <span class="cap">${c.cap}</span>
            </div>
          </div>

          <div class="panels">
            ${this.config.buzz_action
              ? html`
                  <div class="panel buzz ${busy ? "busy" : ""}" @click=${this._buzz}>
                    <div class="cookie-stage">
                      <svg class="wave one" viewBox="0 0 180 180"><path d=${COOKIE}></path></svg>
                      <svg class="wave two" viewBox="0 0 180 180"><path d=${COOKIE}></path></svg>
                      <svg class="cookie" viewBox="0 0 180 180"><path d=${COOKIE}></path></svg>
                      <div class="cookie-face">
                        <ha-icon .icon=${cookieIcon}></ha-icon>
                        <span class="word">${cookieWord}</span>
                      </div>
                    </div>
                    <div class="buzz-caption">
                      <span class="big">${this.config.buzz_title ?? t("db_buzz_title", this.hass)}</span>
                      <span class="small">${this.config.buzz_sub ?? t("db_buzz_sub", this.hass)}</span>
                    </div>
                  </div>
                `
              : nothing}
            ${this.config.lock
              ? html`
                  <div class="panel open ${opened ? "done" : ""}">
                    <div class="open-head">
                      <div class="open-glyph">
                        <ha-icon .icon=${opened ? "m3o:lock-open-right" : "m3o:door-front"}></ha-icon>
                      </div>
                      <div class="open-copy">
                        <span class="big">${this.config.open_title ?? t("db_open_title", this.hass)}</span>
                        <span class="small">${this.config.open_sub ?? t("db_open_sub", this.hass)}</span>
                      </div>
                    </div>
                    <div class="open-spacer"></div>
                    <materia-drag-confirm
                      gesture="slide"
                      .label=${this._lockState === "unlocking"
                        ? t("lock_unlocking", this.hass)
                        : this._lockState === "locking"
                        ? t("lock_locking", this.hass)
                        : opened
                        ? t("lock_slide_to_lock", this.hass)
                        : t("db_slide_hint", this.hass)}
                      .pending=${this._unlocking}
                      .direction=${opened ? "backward" : "forward"}
                      @confirm=${this._slide}
                    ></materia-drag-confirm>
                  </div>
                `
              : nothing}
          </div>

          ${this.config.ignore_action || this.config.replay_action || this.config.mute_entity
            ? html`
                <div class="row">
                  ${this.config.ignore_action
                    ? html`<button class="lead" @click=${this._ignore}>${t("db_ignore", this.hass)}</button>`
                    : nothing}
                  ${this.config.mute_entity
                    ? html`
                        <button class=${muted ? "muted" : ""} @click=${this._toggleMute}>
                          <ha-icon .icon=${muted ? "m3o:volume-off" : "m3o:volume-up"}></ha-icon>
                          ${muted ? t("db_muted", this.hass) : t("db_mute", this.hass)}
                        </button>
                      `
                    : nothing}
                  <span class="gap"></span>
                  ${this.config.replay_action
                    ? html`<button class="trail" @click=${this._replay}>${t("db_replay", this.hass)}</button>`
                    : nothing}
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 5;
  }
}

customElements.define("materia-doorbell", MateriaDoorbell);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-doorbell",
  name: "Materia Doorbell",
  description: "Doorbell alert — countdown ring, tap-to-buzz, slide-to-unlock. Built for a browser_mod popup.",
  preview: true,
});
