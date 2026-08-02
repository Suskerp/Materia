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

  /** Active-ish, not literally "on": buzz_entity is often a LOCK — the
   *  street-door relay whose 3s "unlocked" IS the buzz — so unlocked/open
   *  and their transitions count. A strict === "on" meant the buzzing face
   *  (spin, waves, Buzzed linger) never ran against a lock. */
  _on(id) {
    const st = id ? this.hass?.states[id] : undefined;
    if (!st) return false;
    return ["on", "true", "open", "opening", "unlocked", "unlocking", "running", "active", "home"]
      .includes(String(st.state).toLowerCase());
  }

  /** How long a ring RINGS — the length of the chime sound, not the popup's
   *  lifetime. The doorbell entity is often a 1–2s pulse, so "ringing" is
   *  judged from the ring window, not the entity alone: the phase holds for
   *  the whole chime and lapses when it ends, even while the popup (timeout)
   *  lives on. Defaults to timeout so configs without it behave as before. */
  get _ringSeconds() {
    return this.config.ring_seconds ?? this.config.timeout;
  }

  /** Ringing is the ring WINDOW, not the entity: some doorbells pulse for a
   *  second, others hold `on` until answered — the chime clock treats both
   *  the same. A 29s-long `on` still lapses when the chime ends. */
  get _ringing() {
    return this._ringT0 != null && (Date.now() - this._ringT0) / 1000 < this._ringSeconds;
  }

  get _buzzing() {
    return this._on(this.config.buzz_entity);
  }

  get _lockState() {
    const id = this.config.lock;
    return id ? String(this.hass?.states[id]?.state ?? "") : "";
  }

  /** The lock's LIVE state — drives the open panel, which is the lock
   *  control and floods whenever the door is really open. */
  get _unlockedNow() {
    return ["unlocked", "unlocking"].includes(this._lockState);
  }

  /** The HEADER's "opened" is an event, not a state: someone answered THIS
   *  ring. With an open_action the ONLY thing that counts is the card's own
   *  let-them-in having run — the interior lock being open doesn't mean the
   *  visitor at the street door was buzzed in, so entity state can't stand
   *  in for it. Without one, the lock is the whole story, but the unlock
   *  still has to be recent (within the ring timeout): a door that has sat
   *  unlocked for hours must not dress the card as an answered doorbell. */
  get _opened() {
    if (this.config.open_action) {
      return this._openedVia != null && (Date.now() - this._openedVia) / 1000 <= (this.config.timeout || 0);
    }
    if (!this._unlockedNow) return false;
    const st = this.hass?.states[this.config.lock];
    const t0 = st ? Date.parse(st.last_changed) : NaN;
    if (Number.isNaN(t0)) return false;
    return (Date.now() - t0) / 1000 <= (this.config.timeout || 0);
  }

  get _unlocking() {
    return ["unlocking", "locking"].includes(this._lockState);
  }

  /** Seconds left before the ring lapses — the chime's own clock, from the
   *  ring window's start. No client clock to drift, and a replay (turn the
   *  doorbell back on) re-arms the window and resets it. */
  get _left() {
    if (!this._ringT0) return 0;
    return Math.max(0, Math.ceil(this._ringSeconds - (Date.now() - this._ringT0) / 1000));
  }

  get _phase() {
    // demo: force a face for design checks — the live phases only exist
    // during a real ring, which makes them impossible to evaluate at rest.
    if (this.config.demo) return this.config.demo;
    if (this._buzzing) return "buzzing";
    if (this._buzzedUntil && Date.now() < this._buzzedUntil) return "buzzed";
    if (this._opened) return "opened";
    if (this._ringing) return "ringing";
    return "lapsed";
  }

  /* ---- clockwork ---- */

  /* The ring WINDOW outlives the ring itself: the popup that opened on the
     ring closes `timeout` seconds after it started, whatever was buzzed or
     opened in between — the top bar drains on this clock. Armed from the
     doorbell's last state change, NOT only while `on`: a pulse doorbell is
     off again before the popup finishes rendering. Armed in willUpdate so
     the FIRST render already knows the window — arming in updated() flashed
     one lapsed frame before the ringing face. */
  willUpdate(changed) {
    if (changed.has("hass") || changed.has("config")) {
      // demo=ringing runs a SYNTHETIC window on loop, so the bar visibly
      // drains during design checks instead of freezing at one width.
      if (this.config?.demo === "ringing") {
        if (!this._ringT0 || (Date.now() - this._ringT0) / 1000 > (this.config.timeout || 0)) {
          this._ringT0 = Date.now();
        }
        return;
      }
      if (!this._ringT0) {
        const st = this.hass?.states[this.config?.entity];
        const t0 = st ? Date.parse(st.last_changed) : NaN;
        if (!Number.isNaN(t0) && (Date.now() - t0) / 1000 <= (this.config.timeout || 0)) {
          this._ringT0 = t0;
        }
      }
      if (this._ringT0 && (Date.now() - this._ringT0) / 1000 > (this.config.timeout || 0)) {
        this._ringT0 = null;
      }
    }
  }

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

  /** Seconds until the ring window — and the popup riding it — closes. */
  get _windowLeft() {
    if (!this._ringT0) return 0;
    return Math.max(0, Math.ceil((this.config.timeout || 0) - (Date.now() - this._ringT0) / 1000));
  }

  _syncTicker() {
    const need = this._ringing || this._windowLeft > 0;
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
    // open_action replaces the plain unlock with the let-them-in sequence
    // (buzz + delayed unlock). It stays available even while the inside
    // door is already open — the visitor still needs buzzing in — so this
    // control never flips into lock mode; locking lives on the lock card.
    if (this.config.open_action) {
      // Header truth: with open_action, "opened" exists only when THIS ran.
      this._openedVia = Date.now();
      this._handleAction(this.config.open_action);
      this.requestUpdate();
      return;
    }
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
        // Settled phases KEEP the count column (the design does), but its copy
        // must never repeat the subtitle — the #172 "double info" bug was the
        // cap echoing the sub word for word, not the column existing.
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
    // What the open PANEL floods on: its own action having run (open_action
    // mode — an ambient interior unlock is NOT the visitor buzzed in), or
    // the live lock state when the panel IS the lock control.
    const doorOpen = this.config.open_action ? opened : this._unlockedNow;
    // The bar is the popup-close indicator: it drains from the moment the
    // ring started, through buzzing and opening alike. With no window (the
    // card at rest) it sits FULL in the phase's quiet tone — the design's
    // strip is a permanent element, and an invisible empty track read as
    // "the bar is missing".
    const pct = this.config.timeout > 0 && this._ringT0
      ? Math.round((this._windowLeft / this.config.timeout) * 100)
      : 100;

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
        <div class="countbar ${phase}">
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
            ${c.num != null
              ? html`
                  <div class="count">
                    <span class="num ${c.numAccent ? "accent" : ""}">${c.num}</span>
                    <span class="cap">${c.cap}</span>
                  </div>
                `
              : nothing}
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
                  <div class="panel open ${doorOpen ? "done" : ""}">
                    <div class="open-head">
                      <div class="open-glyph">
                        <ha-icon .icon=${doorOpen ? "m3o:lock-open-right" : "m3o:door-front"}></ha-icon>
                      </div>
                      <div class="open-copy">
                        <span class="big">${this.config.open_title ?? t("db_open_title", this.hass)}</span>
                        <span class="small">${this.config.open_sub ?? t("db_open_sub", this.hass)}</span>
                      </div>
                    </div>
                    <div class="open-spacer"></div>
                    <materia-drag-confirm
                      gesture=${this.config.open_gesture === "hold" ? "hold" : "slide"}
                      .label=${this._lockState === "unlocking"
                        ? t("lock_unlocking", this.hass)
                        : this._lockState === "locking"
                        ? t("lock_locking", this.hass)
                        : opened && !this.config.open_action
                        ? (this.config.open_gesture === "hold"
                            ? t("lock_hold_to_lock", this.hass)
                            : t("lock_slide_to_lock", this.hass))
                        : (this.config.open_gesture === "hold"
                            ? t("db_hold_hint", this.hass)
                            : t("db_slide_hint", this.hass))}
                      .pending=${this._unlocking}
                      .direction=${opened && !this.config.open_action ? "backward" : "forward"}
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
