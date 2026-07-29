/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,k=w.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+E,M=`<${A}>`,T=document,F=()=>T.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,D="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,q=/>/g,R=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,L=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),I=B(1),H=B(2),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),X=new WeakMap,G=T.createTreeWalker(T,129);function Y(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=P;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===P?"!--"===l[1]?a=U:void 0!==l[1]?a=q:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=o??P,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?R:'"'===l[3]?N:j):a===N||a===j?a=R:a===U||a===q?a=P:(a=R,o=void 0);const h=a===R&&t[e+1].startsWith("/>")?" ":"";n+=a===P?i+M:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,c]=K(t,e);if(this.el=Z.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[n++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],F()),G.nextNode(),r.push({type:2,index:++o});s.append(t[e],F())}}}else if(8===s.nodeType)if(s.data===A)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=z(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new tt(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new nt(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=G.nextNode(),n++)}return G.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),z(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new Z(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new tt(this.O(F()),this.O(F()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Q(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Q(this,s[i+a],e,a),r===W&&(r=this._$AH[a]),n||=!z(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===W)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Z,tt),(w.litHtmlVersions??=[]).push("3.3.2");const rt=(t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(F(),t),t,void 0,i??{})}return o._$AI(t),o
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},lt=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;let ht;async function pt(){return ht||(ht=await window.loadCardHelpers(),ht)}dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2"),n`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    --materia-border-radius: 18px;
    --materia-card-height: 107px;
  }

  ha-card {
    border-radius: var(--materia-border-radius);
    overflow: hidden;
    font-family: inherit;
  }
`;class ut extends ct{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"}};static styles=n`
    :host {
      display: block;
      width: 100%;
      --slider-color: var(--md-sys-color-primary);
      --slider-track-color: var(--md-sys-color-surface-variant);
      --slider-height: 4px;
      --slider-thumb-size: 20px;
    }

    .slider-container {
      position: relative;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: var(--slider-height);
      border-radius: 999px;
      outline: none;
      cursor: pointer;
      margin: 0;
      background: transparent;
    }

    input[type="range"]:disabled {
      cursor: not-allowed;
      opacity: 0.38;
    }

    /* Track */
    input[type="range"]::-webkit-slider-runnable-track {
      height: var(--slider-height);
      border-radius: 999px;
    }

    input[type="range"]::-moz-range-track {
      height: var(--slider-height);
      border-radius: 999px;
      background: var(--_track-color);
    }

    /* Thumb */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: var(--slider-thumb-size);
      height: var(--slider-thumb-size);
      border-radius: 50%;
      background: var(--_fill-color);
      border: none;
      margin-top: calc((var(--slider-height) - var(--slider-thumb-size)) / 2);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.1s ease;
    }

    input[type="range"]::-moz-range-thumb {
      width: var(--slider-thumb-size);
      height: var(--slider-thumb-size);
      border-radius: 50%;
      background: var(--_fill-color);
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    input[type="range"]:active::-webkit-slider-thumb {
      transform: scale(1.2);
    }

    input[type="range"]:active::-moz-range-thumb {
      transform: scale(1.2);
    }
  `;constructor(){super(),this.min=0,this.max=100,this.value=0,this.step=1,this.color="",this.trackColor="",this.disabled=!1,this.liveUpdate=!1,this._debounceTimer=null}get _fillColor(){return this.color||"var(--slider-color)"}get _trackColor(){return this.trackColor||"var(--slider-track-color)"}get _percentage(){const t=this.max-this.min;return 0===t?0:(this.value-this.min)/t*100}render(){const t=this._percentage,e=`linear-gradient(to right, ${this._fillColor} ${t}%, ${this._trackColor} ${t}%)`;return I`
      <div class="slider-container">
        <input
          type="range"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .value=${String(this.value)}
          .step=${String(this.step)}
          ?disabled=${this.disabled}
          style="
            --_fill-color: ${this._fillColor};
            --_track-color: ${this._trackColor};
            background: ${e};
          "
          @input=${this._onInput}
          @change=${this._onChange}
        />
      </div>
    `}_onInput(t){const e=parseFloat(t.target.value);this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(e)},100))}_onChange(t){clearTimeout(this._debounceTimer);const e=parseFloat(t.target.value);this._fireValueChanged(e)}_fireValueChanged(t){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",ut);const mt={ms:342,easing:"linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1)"},gt=n`
  :host {
    --md-sys-motion-expressive-fast-spatial: 342ms linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1);
    --md-sys-motion-expressive-fast-spatial-duration: 342ms;
    --md-sys-motion-expressive-fast-spatial-easing: linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1);
    --md-sys-motion-expressive-default-spatial: 533ms linear(0, 0.0339, 0.121, 0.2417, 0.3793, 0.5204, 0.6552, 0.7764, 0.88, 0.9639, 1.028, 1.0733, 1.1019, 1.1163, 1.1195, 1.1141, 1.1028, 1.0879, 1.0712, 1.0544, 1.0385, 1.0244, 1.0124, 1.0028, 0.9955, 0.9905, 0.9874, 0.9859, 0.9858, 0.9866, 0.988, 0.9898, 0.9918, 0.9938, 0.9957, 0.9974, 0.9987, 0.9998, 1.0007, 1.0012, 1.0016, 1.0017, 1.0017, 1.0016, 1.0014, 1.0012, 1);
    --md-sys-motion-expressive-default-spatial-duration: 533ms;
    --md-sys-motion-expressive-default-spatial-easing: linear(0, 0.0339, 0.121, 0.2417, 0.3793, 0.5204, 0.6552, 0.7764, 0.88, 0.9639, 1.028, 1.0733, 1.1019, 1.1163, 1.1195, 1.1141, 1.1028, 1.0879, 1.0712, 1.0544, 1.0385, 1.0244, 1.0124, 1.0028, 0.9955, 0.9905, 0.9874, 0.9859, 0.9858, 0.9866, 0.988, 0.9898, 0.9918, 0.9938, 0.9957, 0.9974, 0.9987, 0.9998, 1.0007, 1.0012, 1.0016, 1.0017, 1.0017, 1.0016, 1.0014, 1.0012, 1);
    --md-sys-motion-expressive-slow-spatial: 637ms linear(0, 0.0227, 0.0824, 0.1675, 0.2681, 0.3762, 0.4852, 0.5902, 0.6876, 0.775, 0.851, 0.9151, 0.9673, 1.0084, 1.0391, 1.0607, 1.0744, 1.0816, 1.0835, 1.0813, 1.0761, 1.0689, 1.0604, 1.0514, 1.0423, 1.0335, 1.0255, 1.0182, 1.012, 1.0067, 1.0024, 0.9991, 0.9966, 0.9948, 0.9937, 0.9932, 0.993, 0.9932, 0.9937, 0.9943, 0.995, 0.9958, 0.9965, 0.9973, 0.9979, 0.9985, 1);
    --md-sys-motion-expressive-slow-spatial-duration: 637ms;
    --md-sys-motion-expressive-slow-spatial-easing: linear(0, 0.0227, 0.0824, 0.1675, 0.2681, 0.3762, 0.4852, 0.5902, 0.6876, 0.775, 0.851, 0.9151, 0.9673, 1.0084, 1.0391, 1.0607, 1.0744, 1.0816, 1.0835, 1.0813, 1.0761, 1.0689, 1.0604, 1.0514, 1.0423, 1.0335, 1.0255, 1.0182, 1.012, 1.0067, 1.0024, 0.9991, 0.9966, 0.9948, 0.9937, 0.9932, 0.993, 0.9932, 0.9937, 0.9943, 0.995, 0.9958, 0.9965, 0.9973, 0.9979, 0.9985, 1);
    --md-sys-motion-standard-fast-spatial: 250ms linear(0, 0.0634, 0.196, 0.3446, 0.4837, 0.603, 0.7002, 0.7768, 0.8357, 0.8801, 0.9132, 0.9376, 0.9553, 0.9682, 0.9775, 0.9841, 0.9888, 0.9921, 0.9945, 0.9962, 0.9973, 0.9981, 0.9987, 1);
    --md-sys-motion-standard-fast-spatial-duration: 250ms;
    --md-sys-motion-standard-fast-spatial-easing: linear(0, 0.0634, 0.196, 0.3446, 0.4837, 0.603, 0.7002, 0.7768, 0.8357, 0.8801, 0.9132, 0.9376, 0.9553, 0.9682, 0.9775, 0.9841, 0.9888, 0.9921, 0.9945, 0.9962, 0.9973, 0.9981, 0.9987, 1);
    --md-sys-motion-standard-default-spatial: 392ms linear(0, 0.0294, 0.0993, 0.1892, 0.286, 0.3817, 0.4715, 0.553, 0.6251, 0.6879, 0.7418, 0.7875, 0.8259, 0.8579, 0.8845, 0.9064, 0.9243, 0.939, 0.9509, 0.9606, 0.9685, 0.9748, 0.9799, 0.9839, 0.9872, 0.9898, 0.9919, 0.9936, 0.9949, 0.996, 0.9968, 0.9975, 0.998, 0.9984, 0.9988, 1);
    --md-sys-motion-standard-default-spatial-duration: 392ms;
    --md-sys-motion-standard-default-spatial-easing: linear(0, 0.0294, 0.0993, 0.1892, 0.286, 0.3817, 0.4715, 0.553, 0.6251, 0.6879, 0.7418, 0.7875, 0.8259, 0.8579, 0.8845, 0.9064, 0.9243, 0.939, 0.9509, 0.9606, 0.9685, 0.9748, 0.9799, 0.9839, 0.9872, 0.9898, 0.9919, 0.9936, 0.9949, 0.996, 0.9968, 0.9975, 0.998, 0.9984, 0.9988, 1);
    --md-sys-motion-standard-slow-spatial: 575ms linear(0, 0.0178, 0.0624, 0.1234, 0.1934, 0.2671, 0.3407, 0.4119, 0.4791, 0.5413, 0.5982, 0.6496, 0.6956, 0.7365, 0.7726, 0.8043, 0.832, 0.8561, 0.877, 0.8951, 0.9107, 0.9241, 0.9355, 0.9453, 0.9537, 0.9609, 0.9669, 0.9721, 0.9765, 0.9802, 0.9833, 0.986, 0.9882, 0.9901, 0.9917, 0.993, 0.9942, 0.9951, 0.9959, 0.9966, 0.9971, 0.9976, 0.998, 0.9983, 0.9986, 0.9988, 1);
    --md-sys-motion-standard-slow-spatial-duration: 575ms;
    --md-sys-motion-standard-slow-spatial-easing: linear(0, 0.0178, 0.0624, 0.1234, 0.1934, 0.2671, 0.3407, 0.4119, 0.4791, 0.5413, 0.5982, 0.6496, 0.6956, 0.7365, 0.7726, 0.8043, 0.832, 0.8561, 0.877, 0.8951, 0.9107, 0.9241, 0.9355, 0.9453, 0.9537, 0.9609, 0.9669, 0.9721, 0.9765, 0.9802, 0.9833, 0.986, 0.9882, 0.9901, 0.9917, 0.993, 0.9942, 0.9951, 0.9959, 0.9966, 0.9971, 0.9976, 0.998, 0.9983, 0.9986, 0.9988, 1);
    --md-sys-motion-fast-effects: 150ms linear(0, 0.1422, 0.3806, 0.5889, 0.7406, 0.8417, 0.9057, 0.9448, 0.9681, 0.9818, 0.9897, 0.9942, 0.9968, 0.9982, 1);
    --md-sys-motion-fast-effects-duration: 150ms;
    --md-sys-motion-fast-effects-easing: linear(0, 0.1422, 0.3806, 0.5889, 0.7406, 0.8417, 0.9057, 0.9448, 0.9681, 0.9818, 0.9897, 0.9942, 0.9968, 0.9982, 1);
    --md-sys-motion-default-effects: 233ms linear(0, 0.0739, 0.2235, 0.3849, 0.5305, 0.6508, 0.7452, 0.8168, 0.8699, 0.9084, 0.9361, 0.9557, 0.9694, 0.979, 0.9857, 0.9902, 0.9934, 0.9955, 0.997, 0.998, 0.9986, 1);
    --md-sys-motion-default-effects-duration: 233ms;
    --md-sys-motion-default-effects-easing: linear(0, 0.0739, 0.2235, 0.3849, 0.5305, 0.6508, 0.7452, 0.8168, 0.8699, 0.9084, 0.9361, 0.9557, 0.9694, 0.979, 0.9857, 0.9902, 0.9934, 0.9955, 0.997, 0.998, 0.9986, 1);
    --md-sys-motion-slow-effects: 329ms linear(0, 0.0393, 0.1288, 0.2389, 0.3523, 0.4593, 0.5554, 0.6386, 0.7091, 0.7677, 0.8158, 0.8547, 0.886, 0.9109, 0.9307, 0.9462, 0.9584, 0.9679, 0.9753, 0.981, 0.9855, 0.9889, 0.9915, 0.9935, 0.9951, 0.9963, 0.9972, 0.9978, 0.9984, 0.9988, 1);
    --md-sys-motion-slow-effects-duration: 329ms;
    --md-sys-motion-slow-effects-easing: linear(0, 0.0393, 0.1288, 0.2389, 0.3523, 0.4593, 0.5554, 0.6386, 0.7091, 0.7677, 0.8158, 0.8547, 0.886, 0.9109, 0.9307, 0.9462, 0.9584, 0.9679, 0.9753, 0.981, 0.9855, 0.9889, 0.9915, 0.9935, 0.9951, 0.9963, 0.9972, 0.9978, 0.9984, 0.9988, 1);
  }
  @media (prefers-reduced-motion: reduce) {
    :host {
      --md-sys-motion-expressive-fast-spatial: 1ms linear;
      --md-sys-motion-expressive-default-spatial: 1ms linear;
      --md-sys-motion-expressive-slow-spatial: 1ms linear;
      --md-sys-motion-standard-fast-spatial: 1ms linear;
      --md-sys-motion-standard-default-spatial: 1ms linear;
      --md-sys-motion-standard-slow-spatial: 1ms linear;
      --md-sys-motion-fast-effects: 1ms linear;
      --md-sys-motion-default-effects: 1ms linear;
      --md-sys-motion-slow-effects: 1ms linear;
    }
  }
`,ft=H`<path
  d="M4 12h13M11 6l6 6-6 6"
  fill="none"
  stroke="currentColor"
  stroke-width="2.4"
  stroke-linecap="round"
  stroke-linejoin="round"
/>`;class _t extends ct{static properties={gesture:{type:String,reflect:!0},label:{type:String},icon:{type:String},direction:{type:String},threshold:{type:Number},holdMs:{type:Number,attribute:"hold-ms"},disabled:{type:Boolean,reflect:!0},_p:{state:!0},_armed:{state:!0}};static styles=[gt,n`
      :host {
        display: block;
        /* Track height and icon size are the M3 Expressive LARGE button rung
           (96px / 32px), as already codified for this project in
           src/elements/button/styles.js .size-l. The design doc drew 104px,
           which is not on the ladder — 96 is the nearest real step, and using
           the rung keeps the track the same height as a large button placed
           beside it. */
        --mdc-h: 96px;
        --mdc-icon: 32px;
        /* The .size-l square-shape corner from the same ladder. */
        --mdc-r: 28px;
        --mdc-inset: 8px;
        --mdc-track: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.12));
        --mdc-ink: var(--md-sys-color-on-surface, #fff);
        --mdc-handle: var(--md-sys-color-primary);
        --mdc-handle-ink: var(--md-sys-color-on-primary);
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }

      .track {
        position: relative;
        height: var(--mdc-h);
        border-radius: var(--mdc-r);
        background: var(--mdc-track);
        overflow: hidden;
        box-sizing: border-box;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        /* Vertical panning stays with the dashboard until we decide the gesture
           is ours; see .track.armed. */
        touch-action: pan-y;
        transition: background-color var(--md-sys-motion-default-effects);
      }

      .track:focus-visible {
        outline: 3px solid var(--md-sys-color-primary);
        outline-offset: 2px;
      }

      .track.armed {
        cursor: grabbing;
        touch-action: none;
      }

      /* Hold progress. scaleX rather than width so it composites instead of
         relayouting every frame. */
      .fill {
        position: absolute;
        inset: 0;
        background: color-mix(in srgb, var(--mdc-handle) 34%, transparent);
        transform-origin: left center;
        transform: scaleX(var(--mdc-p, 0));
      }

      :host([gesture="hold"]) .fill.backward {
        transform-origin: right center;
      }

      .fill.settling {
        transition: transform var(--md-sys-motion-standard-fast-spatial);
      }

      .label {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        /* Keep the hint centred in the track's free space rather than in the
           track, so it does not sit half-hidden under the handle. */
        padding: 0 calc(var(--mdc-h) - var(--mdc-inset));
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--mdc-ink);
        opacity: 0.72;
        text-align: center;
        pointer-events: none;
      }

      /* In hold mode there is no travelling handle, so the label owns the whole
         track and needs no clearance. It carries NO icon: whatever the gesture
         acts on is already depicted above it, and repeating that glyph inside
         the track just adds a second thing to read. */
      :host([gesture="hold"]) .label {
        padding: 0 16px;
        opacity: 1;
      }

      .handle {
        position: absolute;
        top: var(--mdc-inset);
        bottom: var(--mdc-inset);
        width: calc(var(--mdc-h) - 2 * var(--mdc-inset));
        /* M3 nested-shape rule: an inner corner is the outer corner minus the
           padding between them, which is what keeps the two curves concentric. */
        border-radius: calc(var(--mdc-r) - var(--mdc-inset));
        background: var(--mdc-handle);
        color: var(--mdc-handle-ink);
        display: grid;
        place-items: center;
        /* Position resolves entirely in CSS, with no measured pixel anywhere:
           left percentages resolve against the track, and the handle is exactly
           one track-height minus two insets wide, so the full travel is
           100% - var(--mdc-h), and pos 0 / 1 land flush against either inset.
           This is also why the handle anchors LEFT in both directions. The
           obvious alternative — anchoring right when travelling right-to-left —
           swaps the anchor in the very frame the state flips, and CSS cannot
           interpolate a left offset into a right one, so the handle teleports to
           the far end instead of animating there. */
        left: calc(var(--mdc-inset) + var(--mdc-pos, 0) * (100% - var(--mdc-h)));
      }

      .handle.settling {
        transition: left var(--md-sys-motion-standard-fast-spatial);
      }

      .handle ha-icon {
        --mdc-icon-size: var(--mdc-icon);
      }

      .handle .arrow {
        width: var(--mdc-icon);
        height: var(--mdc-icon);
        display: block;
      }

      /* Backward travel reuses the same path, mirrored — one geometry, both
         directions, so the two arrows can never drift apart. */
      .handle .arrow.flip {
        transform: scaleX(-1);
      }
    `];constructor(){super(),this.gesture="slide",this.label="",this.icon="",this.direction="forward",this.threshold=.55,this.holdMs=800,this.disabled=!1,this._p=0,this._armed=!1,this._settling=!1,this._travel=0}disconnectedCallback(){super.disconnectedCallback(),this._cleanup()}willUpdate(t){t.has("direction")&&void 0!==t.get("direction")&&(this._p=0,this._settling=!1)}_measure(){const t=this._rect();this._travel=t?Math.max(0,t.width-t.height):0}_rect(){const t=this._frameId||0;return this._rectCache&&this._rectCacheFrame===t||(this._rectCache=this.shadowRoot?.querySelector(".track")?.getBoundingClientRect(),this._rectCacheFrame=t,this._frameRaf||(this._frameRaf=requestAnimationFrame(()=>{this._frameId=(this._frameId||0)+1,this._frameRaf=null}))),this._rectCache}_eventX(t){return void 0!==t.clientX&&0!==t.clientX?t.clientX:t.changedTouches?.[0]?t.changedTouches[0].clientX:t.touches?.[0]?t.touches[0].clientX:t.clientX||0}_haptic(t){this.dispatchEvent(new CustomEvent("haptic",{detail:t,bubbles:!0,composed:!0}))}_onPointerDown(t){this.disabled||t.button&&0!==t.button||t.isPrimary&&("touch"===t.pointerType&&t.clientX<=30||(this._startX=t.clientX,this._startY=t.clientY,this._pointerId=t.pointerId,this._rectCache=null,this._scrollIntent=!1,this._measure(),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef),this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),"hold"===this.gesture&&this._engage(t)))}_onEarlyMove(t){if(this._scrollIntent)return;const e=Math.abs(t.clientX-this._startX),i=Math.abs(t.clientY-this._startY);if(i>10&&i>e+4)return this._scrollIntent=!0,"hold"===this.gesture&&this._release(!1),void this._dropEarlyMove();"hold"!==this.gesture&&e>6&&e>=i&&(this._dropEarlyMove(),this._engage(t))}_dropEarlyMove(){this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_engage(t){if(this._armed)return;this._armed=!0,this._settling=!1,this._engagedAt=Date.now(),this._grabX=this._eventX(t),this._grabP=this._p;const e=this.shadowRoot?.querySelector(".track");try{e?.setPointerCapture(this._pointerId)}catch(t){}document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),e?.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._release(!1)},document.addEventListener("visibilitychange",this._onVisibilityRef),"hold"===this.gesture?(this._tick=this._tick.bind(this),this._raf=requestAnimationFrame(this._tick)):(this._onMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onMoveRef))}_preventTouch(t){t.preventDefault()}_tick(){if(!this._armed)return;const t=Math.min(1,(Date.now()-this._engagedAt)/Math.max(1,this.holdMs));this._p=t,t>=1?this._commit():this._raf=requestAnimationFrame(this._tick)}_onDragMove(t){if(!this._armed)return;"touch"===t.pointerType&&t.preventDefault();if(!this._rect()||this._travel<=0)return;const e=this._eventX(t)-this._grabX,i="backward"===this.direction?-e:e;this._p=Math.max(0,Math.min(1,this._grabP+i/this._travel))}_onPointerUp(t){if("pointercancel"===t.type&&this._engagedAt&&Date.now()-this._engagedAt<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._release(!1),400));clearTimeout(this._graceTimer),this._release(this._armed&&"slide"===this.gesture&&this._p>=this.threshold)}_release(t){(this._armed||null!=this._startX)&&(t?this._commit():(this._settling=!0,this._p=0,this._cleanup()))}_commit(){this._settling=!0,this._p=1,this._cleanup(),this._haptic("success"),this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0}))}_cleanup(){this._armed=!1,this._startX=null,this._scrollIntent=!1,this._engagedAt=null,this._rectCache=null,clearTimeout(this._graceTimer),this._raf&&(cancelAnimationFrame(this._raf),this._raf=null),this._dropEarlyMove();const t=this.shadowRoot?.querySelector(".track");document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),t?.removeEventListener("touchmove",this._preventTouch);try{t?.releasePointerCapture(this._pointerId)}catch(t){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onMoveRef&&(window.removeEventListener("pointermove",this._onMoveRef),this._onMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_onKeyDown(t){this.disabled||"Enter"!==t.key&&" "!==t.key&&"Spacebar"!==t.key||(t.preventDefault(),this._commit())}render(){const t="hold"===this.gesture,e="backward"===this.direction,i=e?1-this._p:this._p,s=this._settling&&!this._armed?"settling":"";return I`
      <div
        class="track ${this._armed?"armed":""}"
        role="button"
        tabindex=${this.disabled?-1:0}
        aria-label=${this.label||"Confirm"}
        aria-disabled=${this.disabled?"true":"false"}
        style="--mdc-p:${t?this._p:0};--mdc-pos:${i};"
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        ${t?I`<div class="fill ${e?"backward":""} ${s}"></div>`:V}
        <div class="label"><span>${this.label}</span></div>
        ${t?V:I`<div class="handle ${s}">
              ${this.icon?I`<ha-icon .icon=${this.icon}></ha-icon>`:I`<svg
                    class="arrow ${e?"flip":""}"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >${ft}</svg>`}
            </div>`}
      </div>
    `}}customElements.define("materia-drag-confirm",_t);class bt extends ct{static properties={year:{type:Number},month:{type:Number},selected:{type:Number},firstDay:{type:Number,attribute:"first-day"},noPast:{type:Boolean,attribute:"no-past"},locale:{type:String}};static styles=[gt,n`
      :host {
        display: block;
        /* DatePickerModalTokens.DateContainerHeight / DateContainerWidth. */
        --mc-cell: 40px;
      }

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 0 4px 10px;
      }

      .month {
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--md-sys-color-on-surface);
      }

      .nav {
        display: flex;
        gap: 3px;
      }

      /* Connected pair: round on the outside, small where they meet — the M3
         connected-group treatment, so the two arrows read as one control. */
      .nav button {
        width: 44px;
        height: 40px;
        border: none;
        background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
        color: var(--md-sys-color-on-surface);
        display: grid;
        place-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transition: background-color var(--md-sys-motion-fast-effects);
      }

      .nav button:first-child {
        border-radius: 20px 6px 6px 20px;
      }

      .nav button:last-child {
        border-radius: 6px 20px 20px 6px;
      }

      .nav button:hover {
        background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.14));
      }

      .nav svg {
        width: 20px;
        height: 20px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        justify-items: center;
      }

      /* WeekdaysLabelTextFont is BodyLarge; scaled down here because seven of
         them share a 7-column grid that must not wrap. */
      .dow {
        height: 26px;
        display: grid;
        place-items: center;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--md-sys-color-on-surface-variant, rgba(0, 0, 0, 0.6));
      }

      .day {
        width: var(--mc-cell);
        height: var(--mc-cell);
        display: grid;
        place-items: center;
        border: none;
        padding: 0;
        font: inherit;
        font-size: 15px;
        background: transparent;
        color: var(--md-sys-color-on-surface);
        border-radius: 50%;
        cursor: pointer;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        transition: background-color var(--md-sys-motion-fast-effects),
          color var(--md-sys-motion-fast-effects),
          border-radius var(--md-sys-motion-expressive-fast-spatial);
      }

      .day.blank {
        visibility: hidden;
        cursor: default;
      }

      .day:not(.sel):not(.dead):hover {
        background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
      }

      /* DateTodayContainerOutlineWidth = 1dp. An outline, not a fill, so it
         cannot be mistaken for the selection. */
      .day.today {
        outline: 1px solid var(--md-sys-color-primary);
        outline-offset: -1px;
        font-weight: 700;
      }

      .day.sel {
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        font-weight: 700;
        /* Corner Medium — see the note on the deviation from CornerFull. */
        border-radius: 12px;
        outline: none;
      }

      .day.dead {
        color: var(--md-sys-color-on-surface-variant, rgba(0, 0, 0, 0.5));
        opacity: 0.45;
        cursor: default;
      }
    `];constructor(){super();const t=new Date;this.year=t.getFullYear(),this.month=t.getMonth(),this.selected=null,this.firstDay=1,this.noPast=!1,this.locale=""}get _locale(){return this.locale||void 0}get _dayNames(){const t=new Intl.DateTimeFormat(this._locale,{weekday:"narrow"});return Array.from({length:7},(e,i)=>t.format(new Date(2024,0,1+(i+(0===this.firstDay?6:0))%7)))}get _monthLabel(){return new Intl.DateTimeFormat(this._locale,{month:"long",year:"numeric"}).format(new Date(this.year,this.month,1))}_shift(t){let e=this.month+t,i=this.year;e<0?(e=11,i-=1):e>11&&(e=0,i+=1),this.dispatchEvent(new CustomEvent("month-changed",{detail:{year:i,month:e},bubbles:!0,composed:!0}))}_pick(t){this.dispatchEvent(new CustomEvent("date-selected",{detail:{date:new Date(this.year,this.month,t),day:t},bubbles:!0,composed:!0}))}render(){const t=(new Date(this.year,this.month,1).getDay()-this.firstDay+7)%7,e=new Date(this.year,this.month+1,0).getDate(),i=new Date,s=i.getFullYear()===this.year&&i.getMonth()===this.month,o=i.getDate(),n=[...Array.from({length:t},()=>null),...Array.from({length:e},(t,e)=>e+1)];return I`
      <div class="head">
        <span class="month">${this._monthLabel}</span>
        <div class="nav">
          <button type="button" aria-label="Previous month" @click=${()=>this._shift(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Next month" @click=${()=>this._shift(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div class="grid" role="grid">
        ${this._dayNames.map(t=>I`<div class="dow" aria-hidden="true">${t}</div>`)}
        ${n.map(t=>{if(null===t)return I`<div class="day blank"></div>`;const e=s&&t===o,i=this.noPast&&s&&t<o,n=this.selected===t;return I`<button
            type="button"
            class="day ${n?"sel":""} ${e?"today":""} ${i?"dead":""}"
            ?disabled=${i}
            aria-selected=${n?"true":"false"}
            @click=${i?void 0:()=>this._pick(t)}
          >${t}</button>`})}
      </div>
    `}}customElements.define("materia-calendar",bt);let vt=0;const yt=new Set(["toggle","perform-action","call-service"]),xt=t=>class extends t{_fireHaptic(t="light"){const e=Date.now();e-vt<120||(vt=e,this.dispatchEvent(new CustomEvent("haptic",{detail:t,bubbles:!0,composed:!0})))}_handleAction(t){if(t&&"none"!==t.action)switch(yt.has(t.action)&&this._fireHaptic("light"),t.action){case"toggle":{const e=t.entity||this.config?.entity;if(!e)break;const i=e.split(".")[0],s=String(this.hass?.states[e]?.state??"");switch(i){case"lock":this._callService("lock","locked"===s?"unlock":"lock",{entity_id:e});break;case"cover":this._callService("cover",["closed","closing"].includes(s)?"open_cover":"close_cover",{entity_id:e});break;case"valve":this._callService("valve",["closed","closing"].includes(s)?"open_valve":"close_valve",{entity_id:e});break;case"scene":this._callService("scene","turn_on",{entity_id:e});break;case"button":case"input_button":this._callService(i,"press",{entity_id:e});break;case"vacuum":this._callService("vacuum",["docked","idle","paused"].includes(s)?"start":"return_to_base",{entity_id:e});break;default:this._callService("homeassistant","toggle",{entity_id:e})}break}case"perform-action":case"call-service":{const e=t.perform_action||t.service||"",[i,s]=e.split(".",2);i&&s&&this._callService(i,s,{...t.service_data,...t.data},t.target);break}case"navigate":{if(!t.navigation_path)break;const e=!!t.navigation_replace;history[e?"replaceState":"pushState"](null,"",t.navigation_path);const i=new Event("location-changed",{bubbles:!0,composed:!0});i.detail={replace:e},this.dispatchEvent(i);break}case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config?.entity}}));break;case"fire-dom-event":{const e=new Event("ll-custom",{bubbles:!0,composed:!0,cancelable:!1});e.detail=t,this.dispatchEvent(e);break}}}_callService(t,e,i,s){return this.hass.callService(t,e,i,s).catch(i=>{vt=0,this._fireHaptic("failure");const s=new Event("hass-notification",{bubbles:!0,composed:!0});s.detail={message:i?.message||`Failed: ${t}.${e}`},this.dispatchEvent(s)})}_capitalize(t){return t&&"string"==typeof t?t.charAt(0).toUpperCase()+t.slice(1):t}_isTemplate(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}_resolveTemplateValue(t,e){this._tplSubs??={},this._tplResults??={};const i=this._tplSubs[t];if(!this._isTemplate(e))return void(i&&(this._tplSubs[t]=null,i.unsub?.then(t=>t&&t()).catch(()=>{}),delete this._tplResults[t]));if(i&&i.template===e)return;i&&i.unsub?.then(t=>t&&t()).catch(()=>{});const s=this.hass?.connection;if(!s)return;const o={template:e,unsub:null};this._tplSubs[t]=o,o.unsub=s.subscribeMessage(e=>{if(this._tplSubs?.[t]!==o)return;const i=e?.result,s="string"==typeof i?i.trim():i;this._tplResults[t]!==s&&(this._tplResults[t]=s,this.requestUpdate())},{type:"render_template",template:e,report_errors:!1}),o.unsub.catch(()=>{})}_resolveField(t,e){const i=this.config?.[t];this._tplSubs??={};const s=this._tplSubs[e];if(!this._isTemplate(i))return void(s&&(this._tplSubs[e]=null,s.unsub?.then(t=>t&&t()).catch(()=>{}),this[e]=void 0));if(s&&s.template===i)return;s&&s.unsub?.then(t=>t&&t()).catch(()=>{});const o=this.hass?.connection;if(!o)return;const n={template:i,unsub:null};this._tplSubs[e]=n,n.unsub=o.subscribeMessage(t=>{if(this._tplSubs?.[e]!==n)return;const i=t?.result,s="string"==typeof i?i.trim():i;s!==this[e]&&(this[e]=s)},{type:"render_template",template:i,report_errors:!1}).catch(()=>(this._tplSubs?.[e]===n&&void 0===this[e]&&(this[e]=i),null))}_unsubscribeTemplates(){if(this._tplSubs){for(const t of Object.keys(this._tplSubs))this._tplSubs[t]?.unsub?.then(t=>t&&t()).catch(()=>{});this._tplSubs={}}}disconnectedCallback(){super.disconnectedCallback?.(),this._unsubscribeTemplates()}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_isUnavailable(t){return!t||"unavailable"===t.state}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}},wt=n`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`,$t=n`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(80%);
  }
`,kt=n`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    /* The DISPLAY voice — hero numerals & titles only, one shout per card. */
    --materia-font-display: "Outfit", "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    --materia-font-accent: "Fraunces", "Georgia", serif;
  }
`,Ct=n`
  .container {
    position: relative;
    width: 100%;
    min-height: 88px;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px;
    margin-left: 8px;
    border-radius: 50%;
    background-color: transparent;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .name-container {
    display: flex;
    line-height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin: 0 16px 0 4px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .state {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.7;
    white-space: nowrap;
  }

  .chevron {
    --mdc-icon-size: 20px;
    opacity: 0.5;
    margin-right: 12px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
`,St=n`
  .fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: width 0.3s ease;
    z-index: 0;
    border-radius: 28px 0 0 28px;
  }
`;n`
  .container {
    position: relative;
    width: 100%;
    min-height: 50px;
    background: transparent;
    border-radius: 28px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px;
    margin-left: 8px;
    border-radius: 50%;
    background-color: var(--ha-card-background, var(--card-background-color));
    flex-shrink: 0;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .name-container {
    display: flex;
    line-height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin: 0 16px 0 4px;
    overflow: hidden;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .state {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.7;
    white-space: nowrap;
  }
`,n`
  button {
    position: relative;
    overflow: hidden;
  }

  button::before {
    content: "";
    position: absolute;
    inset: 0;
    background: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  button:hover::before {
    opacity: 0.08;
  }

  button:active::before {
    opacity: 0.12;
  }
`;const Et=n`
  .container.slider-active {
    touch-action: pan-y pinch-zoom;
    overscroll-behavior: contain;
    -webkit-user-select: none;
    user-select: none;
  }

  .container.is-dragging {
    touch-action: none;
  }

  .container.is-dragging .fill {
    transition: none !important;
  }

  .sub-buttons {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-right: 8px;
    position: relative;
    z-index: 3;
  }

  .sub-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background-color 0.15s ease;
  }

  .sub-btn ha-icon {
    --mdc-icon-size: 20px;
    display: flex;
  }

  .sub-btn:hover {
    background: color-mix(in srgb, currentColor 8%, transparent);
  }

  .sub-btn:active {
    background: color-mix(in srgb, currentColor 14%, transparent);
  }
`,At=t=>t.label??t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase()),Mt=(t,e)=>I`
  <ha-sortable
    handle-selector=".drag-handle"
    @item-moved=${e=>{e.stopPropagation();const{oldIndex:i,newIndex:s}=e.detail;i!==s&&t(i,s)}}
  >
    <div>${e}</div>
  </ha-sortable>
`,Tt=(t,e,i)=>({value:`var(--md-sys-cust-color-${t})`,swatch:`var(--md-sys-cust-color-${t}, ${i})`,label:e}),Ft=(t,e)=>({value:`var(--md-sys-color-${t})`,swatch:`var(--md-sys-color-${t})`,label:e}),zt=[{title:"Light",options:[Tt("light","Light","#FEE082"),Tt("light-container","Light container","#FEEFCA"),Tt("on-light","On light","#745D00")]},{title:"Device",options:[Tt("device","Device","#D9E2FE"),Tt("device-container","Device container","#EDF0FF"),Tt("on-device","On device","#0156CF")]},{title:"Climate · Heat",options:[Tt("climate-heat","Heat","#FFDFD4"),Tt("climate-heat-container","Heat container","#FFEEE9"),Tt("on-climate-heat","On heat","#A14614"),Tt("climate-heat-accent","Heat accent","#A14614")]},{title:"Climate · Cool",options:[Tt("climate-cool","Cool","#D3E8FF"),Tt("climate-cool-container","Cool container","#EAF3FF"),Tt("on-climate-cool","On cool","#327EA7"),Tt("climate-cool-accent","Cool accent","#327EA7")]},{title:"Climate · Auto",options:[Tt("climate-auto","Auto","#D4EBDD"),Tt("climate-auto-container","Auto container","#EAF6EE"),Tt("on-climate-auto","On auto","#2E5E44"),Tt("climate-auto-accent","Auto accent","#2E5E44")]},{title:"Water · Eco",options:[Tt("water-eco","Eco","#C8E6C9"),Tt("water-eco-container","Eco container","#E6F4EA"),Tt("on-water-eco","On eco","#256029")]},{title:"Water · Performance",options:[Tt("water-performance","Performance","#FFD1B0"),Tt("water-performance-container","Performance container","#FFEDE0"),Tt("on-water-performance","On performance","#9C3A00")]},{title:"Warning",options:[Tt("warning","Warning","#D9A000"),Tt("warning-container","Warning container","#FEEFCA"),Tt("on-warning","On warning","#FFFFFF"),Tt("on-warning-container","On warning container","#745D00")]},{title:"Error",options:[Tt("error","Error","#B3261E"),Tt("error-container","Error container","#F9DEDC"),Tt("on-error","On error","#FFFFFF"),Tt("on-error-container","On error container","#410E0B")]},{title:"Weather",options:[Tt("weather-sun","Sun","#F2B500"),Tt("weather-cloud","Cloud","#9FA9B7"),Tt("weather-cloud-dark","Cloud (dark)","#6F7A8A"),Tt("weather-rain","Rain","#2E86E0"),Tt("weather-snow","Snow","#AEB8C4"),Tt("weather-moon","Moon","#5961C2")]},{title:"Severity scale",options:[Tt("scale-green","Scale green","#5E9E50"),Tt("scale-yellow","Scale yellow","#C7A128"),Tt("scale-orange","Scale orange","#D9713C"),Tt("scale-red","Scale red","#C94D42"),Tt("scale-purple","Scale purple","#8A4DA3"),Tt("scale-maroon","Scale maroon","#7A4040")]},{title:"System (theme)",options:[Ft("primary","Primary"),Ft("primary-container","Primary container"),Ft("secondary","Secondary"),Ft("secondary-container","Secondary container"),Ft("tertiary","Tertiary"),Ft("tertiary-container","Tertiary container"),Ft("error","Error"),Ft("error-container","Error container"),Ft("surface-container","Surface container")]}],Ot=new Set(zt.flatMap(t=>t.options.map(t=>t.value)));function Dt(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}const Pt={template:{}};class Ut extends ct{static properties={label:{},value:{},_open:{state:!0},_customOpen:{state:!0}};static styles=n`
    :host { display: block; }

    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 0 0 4px 4px;
    }

    .trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 11px 12px;
      border: none;
      border-bottom: 1px solid var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42));
      border-radius: 4px 4px 0 0;
      background: var(--mdc-text-field-fill-color, rgba(0, 0, 0, 0.06));
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
      cursor: pointer;
      text-align: left;
    }
    .trigger.open {
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 10px;
    }
    .trigger .value { flex: 1; min-width: 0; }
    .chev { color: var(--secondary-text-color); }

    .panel {
      margin-top: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 10px;
      max-height: 320px;
      overflow-y: auto;
      background: var(--card-background-color, var(--ha-card-background, #1c1c1c));
      padding: 4px 0;
    }

    .grp {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      padding: 12px 12px 4px;
    }

    .opt {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      padding: 9px 12px;
      border: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
    }
    .opt:hover { background: var(--secondary-background-color, rgba(0, 0, 0, 0.06)); }
    .opt.sel { background: rgba(var(--rgb-primary-color, 98, 0, 238), 0.14); font-weight: 600; }
    .opt-label { flex: 1; min-width: 0; }

    .swatch {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      flex-shrink: 0;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.25));
    }
    .swatch.none {
      border-style: dashed;
      background: transparent;
    }

    .check { color: var(--primary-color); --mdc-icon-size: 18px; }
    .cust-ic { color: var(--secondary-text-color); --mdc-icon-size: 18px; width: 18px; }

    ha-textfield { display: block; width: 100%; margin-top: 8px; }
  `;get _isCustom(){return!!this.value&&!Ot.has(this.value)}_option(t){for(const e of zt){const i=e.options.find(e=>e.value===t);if(i)return i}return null}get _currentLabel(){if(!this.value)return"Default";const t=this._option(this.value);return t?t.label:"Custom"}get _currentHex(){if(!this.value)return null;const t=this._option(this.value);return t?t.swatch:this.value}disconnectedCallback(){super.disconnectedCallback(),this._removeOutside()}render(){const t=this._currentHex,e=I`<ha-icon class="check" icon="mdi:check"></ha-icon>`;return I`
      ${this.label?I`<div class="label">${this.label}</div>`:""}
      <button type="button" class="trigger ${this._open?"open":""}" @click=${this._toggle}>
        <span class="swatch ${t?"":"none"}" style=${t?`background:${t}`:""}></span>
        <span class="value">${this._currentLabel}</span>
        <ha-icon class="chev" icon=${this._open?"mdi:menu-up":"mdi:menu-down"}></ha-icon>
      </button>

      ${this._open?I`
            <div class="panel">
              <button type="button" class="opt ${this.value?"":"sel"}" @click=${()=>this._pick("")}>
                <span class="swatch none"></span>
                <span class="opt-label">Default (automatic)</span>
                ${this.value?"":e}
              </button>
              ${zt.map(t=>I`
                  <div class="grp">${t.title}</div>
                  ${t.options.map(t=>I`
                      <button type="button" class="opt ${this.value===t.value?"sel":""}" @click=${()=>this._pick(t.value)}>
                        <span class="swatch" style="background:${t.swatch};"></span>
                        <span class="opt-label">${t.label}</span>
                        ${this.value===t.value?e:""}
                      </button>
                    `)}
                `)}
              <button type="button" class="opt ${this._isCustom?"sel":""}" @click=${this._chooseCustom}>
                <ha-icon class="cust-ic" icon="mdi:eyedropper-variant"></ha-icon>
                <span class="opt-label">Custom…</span>
                ${this._isCustom?e:""}
              </button>
            </div>
          `:""}

      ${this._isCustom||this._customOpen?I`
            <ha-textfield
              label="Custom CSS color"
              placeholder="#ff8800 · rgb(…) · var(--…)"
              .value=${this._isCustom?this.value:""}
              @input=${this._onCustomInput}
            ></ha-textfield>
          `:""}
    `}_toggle(){this._open=!this._open,this._open?(this._outside=t=>{t.composedPath().includes(this)||(this._open=!1,this._removeOutside())},document.addEventListener("click",this._outside,!0)):this._removeOutside()}_removeOutside(){this._outside&&(document.removeEventListener("click",this._outside,!0),this._outside=null)}_pick(t){this._open=!1,this._customOpen=!1,this._removeOutside(),this._emit(t)}_chooseCustom(){this._open=!1,this._customOpen=!0,this._removeOutside()}_onCustomInput(t){this._emit(t.target.value)}_emit(t){t!==this.value&&(this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0})))}}customElements.define("materia-color-picker",Ut);class qt extends ct{static properties={hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_modes:{state:!0}};static styles=n`
    :host { display: block; }

    /* Drag handle for sortable list rows (see editor-helpers sortableList). */
    .drag-handle {
      cursor: grab;
      opacity: 0.5;
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }
    .drag-handle:active { cursor: grabbing; }

    ha-expansion-panel {
      display: block;
      margin-bottom: 12px;
      border-radius: 12px;
      --expansion-panel-content-padding: 0;
    }

    .section-body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 16px 16px;
    }

    .field {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-control {
      flex: 1;
      min-width: 0;
    }

    .tpl-toggle {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      --mdc-icon-button-size: 40px;
      --mdc-icon-size: 20px;
    }
    .tpl-toggle.active {
      color: var(--primary-color);
    }
  `;setConfig(t){this._config=t,this._modes??={}}_formData(){return this._config||{}}get _sections(){return[]}_sectionsSignature(){return""}get _sectionsMemo(){const t=this._sectionsSignature();return this.__secSig===t&&this.__secVal||(this.__secSig=t,this.__secVal=this._sections),this.__secVal}_stableContext(t,e,i){const s={};for(const[t,o]of Object.entries(e))s[t]=i[o];this.__ctx??={};const o=this.__ctx[t];return o&&Object.keys(s).every(t=>o[t]===s[t])?o:(this.__ctx[t]=s,s)}_modeFor(t,e){const i=this._modes?.[t];return i||(Dt(e)?"template":"simple")}_toggleMode(t){const e=this._formData()[t],i=this._modeFor(t,e);this._modes={...this._modes||{},[t]:"template"===i?"simple":"template"}}render(){if(!this.hass||!this._config)return I``;const t=this._formData();return I`
      ${this._sectionsMemo.map(e=>this._renderSection(e,t))}
      ${this._renderExtra?this._renderExtra(t):""}
    `}_renderSection(t,e){return I`
      <ha-expansion-panel
        outlined
        .header=${t.title}
        .secondary=${t.secondary||""}
        .expanded=${t.expanded??!0}
      >
        ${t.icon?I`<ha-icon slot="leading-icon" .icon=${t.icon}></ha-icon>`:""}
        <div class="section-body">
          ${(t.fields||[]).map(t=>this._renderField(t,e))}
        </div>
      </ha-expansion-panel>
    `}_renderField(t,e){const i=e[t.name],s=t.label??At(t),o=!!t.template,n=o?this._modeFor(t.name,i):"simple",a=t.context?this._stableContext(t.name,t.context,e):void 0;let r;return r=o&&"template"===n?I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${Pt}
          .value=${i}
          .label=${s}
          .required=${!!t.required}
        ></ha-selector>
      `:t.color?I`
        <materia-color-picker
          class="field-control"
          .label=${s}
          .value=${i||""}
        ></materia-color-picker>
      `:I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${t.selector}
          .value=${i}
          .label=${s}
          .helper=${t.helper}
          .context=${a}
          .required=${!!t.required}
        ></ha-selector>
      `,I`
      <div class="field" @value-changed=${e=>this._fieldChanged(t.name,e)}>
        ${r}
        ${o?I`
              <ha-icon-button
                class="tpl-toggle ${"template"===n?"active":""}"
                .label=${"template"===n?"Use simple input":"Use a template"}
                @click=${()=>this._toggleMode(t.name)}
              >
                <ha-icon icon="mdi:code-braces"></ha-icon>
              </ha-icon-button>
            `:""}
      </div>
    `}_fieldChanged(t,e){e.stopPropagation(),this._setField(t,e.detail?.value)}_setField(t,e){const i={...this._config};""===e||null==e?delete i[t]:i[t]=e,this._commit(i)}_commit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}const Rt=new Set(["cover"]);function jt(t){if(!t?.entity)return{...t};const e=t.entity.split(".")[0],i={show_sub_buttons:!1,show_stop:!0,show_state:!0,subtitle_inline:!0};return Rt.has(e)&&(i.show_sub_buttons=!0),"light"!==e&&"cover"!==e||(i.show_slider=!0),{...i,...t}}class Nt extends qt{static properties={_expandedButton:{state:!0}};static styles=[qt.styles,n`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 4px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        cursor: pointer;
      }
      .button-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
      }
      .button-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `];static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e}}setConfig(t){super.setConfig(t),this._expandedButton??=null}_formData(){return jt(this._config)}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const t=this._config?.entity?.split(".")[0],e="cover"===t,i="light"===t;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",template:!0,selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||e?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...e?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(t){return[Dt(t?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${t.map((t,e)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(e)}>
              <span>${t.name||(t.icon&&!Dt(t.icon)?t.icon:`Button ${e+1}`)}</span>
              <ha-icon-button @click=${t=>{t.stopPropagation(),this._toggleButton(e)}}>
                <ha-icon icon=${this._expandedButton===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${t=>{t.stopPropagation(),this._removeButton(e)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===e?I`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._subButtonSchema(t)}
                      .computeLabel=${At}
                      @value-changed=${t=>this._subButtonChanged(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}_toggleButton(t){this._expandedButton=this._expandedButton===t?null:t}_addButton(){const t=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:t}),this._expandedButton=t.length-1}_removeButton(t){const e=[...this._config.sub_buttons||[]];e.splice(t,1),this._expandedButton===t&&(this._expandedButton=null);const i={...this._config};0===e.length?delete i.sub_buttons:i.sub_buttons=e,this._commit(i)}_subButtonChanged(t,e){const i=[...this._config.sub_buttons||[]];i[t]={...i[t],...e},this._commit({...this._config,sub_buttons:i})}}customElements.define("materia-card-editor",Nt);const Lt={light:{showSlider:!0,activeState:"on",colorActive:"var(--md-sys-cust-color-light-container)",colorOn:"var(--md-sys-cust-color-on-light)",sliderColor:"var(--md-sys-cust-color-light)"},cover:{showSlider:!0,showSubButtons:!0,activeState:"open",colorActive:"var(--md-sys-cust-color-device-container)",colorOn:"var(--md-sys-cust-color-on-device)",sliderColor:"var(--md-sys-cust-color-device)"},switch:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},fan:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},lock:{activeState:["locked","locking"],colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},vacuum:{activeState:"cleaning",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},climate:{activeState:"heat",colorActive:"var(--md-sys-cust-color-climate-heat-container)",colorOn:"var(--md-sys-cust-color-on-climate-heat)"},media_player:{activeState:"playing",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},scene:{variant:"tonal",activeState:"__never__"},input_boolean:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},alarm_control_panel:{activeState:"armed_away",colorActive:"var(--md-sys-color-error-container)",colorOn:"var(--md-sys-color-on-error-container)"}},Bt={activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"};class It extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedShowState:{state:!0}};static getConfigElement(){return document.createElement("materia-card-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e}}setConfig(t){const e=t.entity?t.entity.split(".")[0]:"",i=Lt[e]||Bt,s=t.entity?{tap_action:{action:"toggle"}}:{};t.entity&&i.showSubButtons&&(s.show_sub_buttons=!0,s.show_stop=!0),this.config={...s,...t}}get _domain(){return this.config.entity?.split(".")[0]||""}get _domainConfig(){return Lt[this._domain]||Bt}get _stateObj(){return this.hass?.states?.[this.config.entity]}get _isActive(){const t=this._stateObj?.state,e=this.config.active_state||this._domainConfig.activeState;return"__never__"!==e&&(Array.isArray(e)?e.includes(t):t===e)}get _variant(){return this._domainConfig.variant||"filled"}get _isTonal(){return"tonal"===this._variant}get _isDimmable(){if("light"!==this._domain)return!1;const t=this._stateObj?.attributes;if(!t)return!1;return!!(t.supported_color_modes||[]).some(t=>"onoff"!==t)||void 0!==t.brightness}get _showSlider(){return!this._isTonal&&(void 0!==this.config.show_slider?this.config.show_slider:"light"===this._domain?this._isDimmable:"cover"===this._domain||(this._domainConfig.showSlider||!1))}get _subButtons(){const t=this.config.sub_buttons;if(Array.isArray(t))return t;if(!(void 0!==this.config.show_sub_buttons?this.config.show_sub_buttons:this._domainConfig.showSubButtons||!1))return[];if("cover"===this._domain){const t=this.config.entity,e=[{icon:"mdi:arrow-up",tap_action:{action:"perform-action",perform_action:"cover.open_cover",target:{entity_id:t}}}];return!1!==this.config.show_stop&&e.push({icon:"mdi:stop",tap_action:{action:"perform-action",perform_action:"cover.stop_cover",target:{entity_id:t}}}),e.push({icon:"mdi:arrow-down",tap_action:{action:"perform-action",perform_action:"cover.close_cover",target:{entity_id:t}}}),e}return[]}get _fillPercent(){const t=this._stateObj;if(!t)return 0;if("light"===this._domain){const e=t.attributes?.brightness??0;return Math.round(e/255*100)}return"cover"===this._domain?t.attributes?.current_position??0:0}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:this._stateObj?.attributes?.friendly_name||this.config.entity}get _icon(){return this.config.icon?this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon:"lock"===this._domain?this._isActive?"m3o:lock":"m3o:lock-open-right":void 0}get _subtitle(){const t=this.config.subtitle;return t?this._isTemplate(t)?this._resolvedSubtitle:t:""}_relativeLastChanged(){const t=this._stateObj;if(!t?.last_changed)return"";const e=(Date.now()-new Date(t.last_changed))/1e3;if(e<60)return"just now";const i=Math.floor(e/60);if(i<60)return`${i} minute${1===i?"":"s"} ago`;const s=Math.floor(e/3600);if(s<24)return`${s} hour${1===s?"":"s"} ago`;const o=Math.floor(e/86400);return`${o} day${1===o?"":"s"} ago`}_baseStateDisplay(){const t=this._stateObj;if(!t)return"";const e=this._domain;if("scene"===e)return"";if("light"===e){if("on"!==t.state)return this._capitalize("Off");if(this._isDimmable){return`${Math.round((t.attributes?.brightness??0)/255*100)}%`}return this._capitalize("On")}if("cover"===e){const e=t.attributes?.current_position;return 0===e||"closed"===t.state?this._capitalize("Closed"):100===e?this._capitalize("Open"):null!=e?`${this._capitalize("Open")} · ${e}%`:this._capitalize(t.state)}if("lock"===e){return{locked:"Locked",unlocked:"Unlocked",locking:"Locking",unlocking:"Unlocking",jammed:"Jammed"}[t.state]||this._capitalize(t.state)}const i=t.state,s=Number(i);if(""!==i&&null!=i&&!Number.isNaN(s)){const e=Math.round(100*s)/100,i=t.attributes?.unit_of_measurement;return i?"%"===i?`${e}%`:`${e} ${i}`:`${e}`}return this.hass.formatEntityState?this.hass.formatEntityState(t):this._capitalize(String(i).replace(/[_-]/g," "))}get _showState(){const t=this.config.show_state;if(!1===t)return!1;if(this._isTemplate(t)){if(void 0===this._resolvedShowState)return!0;const t=String(this._resolvedShowState).trim().toLowerCase();return!["false","off","none","no","0","hide",""].includes(t)}return!0}get _stateDisplay(){let t=this._showState?this._baseStateDisplay():"";if(this.config.show_last_changed){const e=this._relativeLastChanged();e&&(t=t?`${t} · ${e}`:e)}return t}_getContainerBg(){if(this._isTonal)return"var(--md-sys-color-secondary-container)";const t=this._resolvedColor||this.config.color;return this._isActive?t||("light"!==this._domain||this._isDimmable?this._domainConfig.colorActive:this._domainConfig.sliderColor||this._domainConfig.colorActive):"var(--ha-card-background, var(--card-background-color))"}_getTextColor(){if(this._isTonal)return"var(--md-sys-color-on-secondary-container)";const t=this._resolvedColorOn||this.config.color_on;return this._isActive?t||this._domainConfig.colorOn:"var(--primary-text-color)"}get _templatesReady(){const t=this.config;return(!this._isTemplate(t?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t?.name)||void 0!==this._resolvedName)))}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("show_state","_resolvedShowState"))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSlider()}_getContainer(){return this.shadowRoot?.querySelector(".container")}_getEventX(t){return void 0!==t.clientX&&0!==t.clientX?t.clientX:t.changedTouches?.[0]?t.changedTouches[0].clientX:t.touches?.[0]?t.touches[0].clientX:t.clientX||0}_getSliderRect(){const t=this._sliderFrameId||0;if(this._sliderRectCache&&this._sliderRectCacheFrame===t)return this._sliderRectCache;const e=this._getContainer()?.getBoundingClientRect();return this._sliderRectCache=e,this._sliderRectCacheFrame=t,this._sliderFrameRaf||(this._sliderFrameRaf=requestAnimationFrame(()=>{this._sliderFrameId=(this._sliderFrameId||0)+1,this._sliderFrameRaf=null})),e}_pctFromPointer(t){const e=this._getSliderRect();if(!e)return 0;const i=this._getEventX(t);return Math.max(0,Math.min(100,(i-e.left)/e.width*100))}_updateFillVisual(t){const e=this.shadowRoot?.querySelector(".fill");e&&(e.style.width=`${t}%`)}_onPointerDown(t){t.button&&0!==t.button||t.isPrimary&&(t.target.closest("button, .sub-btn")||"touch"===t.pointerType&&t.clientX<=30||(this._startX=t.clientX,this._startY=t.clientY,this._dragging=!1,this._scrollIntent=!1,this._pointerId=t.pointerId,this._sliderRectCache=null,this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),this._longPressTimer=setTimeout(()=>{this._longPressTimer=null,this._scrollIntent||this._startDrag(t)},200),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)))}_onEarlyMove(t){if(this._dragging||this._scrollIntent)return;const e=Math.abs(t.clientX-this._startX),i=Math.abs(t.clientY-this._startY);if(i>10&&i>e+4)return this._scrollIntent=!0,void this._abortSlider();e>6&&e>=i&&(clearTimeout(this._longPressTimer),this._longPressTimer=null,this._startDrag(t))}_startDrag(t){if(this._dragging)return;this._dragging=!0,this._dragStartTime=Date.now(),this._sliderRectCache=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null);const e=this._getContainer();try{e?.setPointerCapture(this._pointerId)}catch(t){}e?.classList.add("is-dragging"),document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),this._onDragMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onDragMoveRef),e&&e.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._cleanupSlider()},document.addEventListener("visibilitychange",this._onVisibilityRef);const i=this._pctFromPointer(t);this._updateFillVisual(i),this._throttledSetValue(i)}_preventTouch(t){t.preventDefault()}_onDragMove(t){"touch"===t.pointerType&&t.preventDefault();const e=this._pctFromPointer(t);this._updateFillVisual(e),this._throttledSetValue(e)}_onPointerUp(t){if(null!=this._startX){if("pointercancel"===t.type&&this._dragStartTime&&Date.now()-this._dragStartTime<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._cleanupSlider(),400));if(clearTimeout(this._graceTimer),this._dragging){const e=this._pctFromPointer(t);this._updateFillVisual(e),this._setSliderValue(e),this._fireHaptic("light")}else this._scrollIntent||this._handleTap();this._cleanupSlider()}}_abortSlider(){clearTimeout(this._longPressTimer),this._longPressTimer=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_cleanupSlider(){clearTimeout(this._graceTimer),this._abortSlider(),this._startX=null,this._dragging=!1,this._scrollIntent=!1,this._dragStartTime=null,this._sliderRectCache=null,this._throttleTimeout&&(clearTimeout(this._throttleTimeout),this._throttleTimeout=null);const t=this._getContainer();t?.classList.remove("is-dragging"),document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),t&&t.removeEventListener("touchmove",this._preventTouch);try{t?.releasePointerCapture(this._pointerId)}catch(t){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onDragMoveRef&&(window.removeEventListener("pointermove",this._onDragMoveRef),this._onDragMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_throttledSetValue(t){const e=Date.now();if(this._lastSliderArgs=t,this._throttleTimeout)return;e-(this._lastSliderCall||0)>=200?(this._lastSliderCall=e,this._setSliderValue(t)):this._throttleTimeout=setTimeout(()=>{this._throttleTimeout=null,this._lastSliderCall=Date.now(),this._setSliderValue(this._lastSliderArgs)},200)}_setSliderValue(t){if(!this.hass)return;const e=this.config.entity;if("light"===this._domain){let i=t;!this.config.slider_turn_off&&i<1&&(i=1);const s=Math.round(i/100*255);return void(s<=3&&this.config.slider_turn_off?this._callService("light","turn_off",{entity_id:e}):this._callService("light","turn_on",{entity_id:e,brightness:Math.max(s,1)}))}"cover"!==this._domain||this._callService("cover","set_cover_position",{entity_id:e,position:Math.max(0,Math.min(100,Math.round(t)))})}_handleSubButton(t,e){e.stopPropagation(),this._handleAction(t.tap_action)}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.config.entity&&this._callService("homeassistant","toggle",{entity_id:this.config.entity})}render(){if(!this.config||!this.hass)return I``;const t=this._stateObj,e=!!this.config.entity&&this._isUnavailable(t);!e&&this._isActive,this._isTonal;const i=!e&&this._showSlider,s=e?[]:this._subButtons,o=this._getContainerBg(),n=this._getTextColor(),a=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=e?"Unavailable":this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c;return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${o}; color: ${n};"
          @pointerdown=${i?this._onPointerDown:void 0}
          @click=${i?void 0:()=>this._handleTap()}
        >
          ${i?I`
                <div
                  class="fill"
                  style="width: ${a}%; background-color: ${r}; opacity: 1;"
                ></div>
              `:""}

          <div class="icon-container">
            ${l?I`<ha-icon .icon=${l} style="color: ${n};"></ha-icon>`:I`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                  style="color: ${n};"
                ></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${!h&&d?I`<div class="subtitle">${d}</div>`:""}
            ${p?I`<div class="state">${p}</div>`:""}
          </div>

          ${this._hasNavigateAction?I`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}

          ${s.length?I`
                <div class="sub-buttons">
                  ${s.map(t=>I`
                      <button
                        class="sub-btn"
                        title=${t.name||""}
                        @click=${e=>this._handleSubButton(t,e)}
                      >
                        <ha-icon .icon=${t.icon}></ha-icon>
                      </button>
                    `)}
                </div>
              `:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[kt,wt,Ct,St,$t,Et]}customElements.define("materia-card",It),window.customCards=window.customCards||[],window.customCards.push({type:"materia-card",name:"Materia Card",description:"Universal entity card. Auto-detects lights, covers, devices, locks, and scenes.",preview:!0});const Ht=n`
  .collapsible {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
    overflow: hidden;
  }

  .collapsible.expanded {
    grid-template-rows: 1fr;
  }

  .collapsible-inner {
    overflow: hidden;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--room-columns, 2), 1fr);
    gap: 8px;
    padding: 8px 4px 4px;
  }

  .grid-item {
    min-width: 0;
  }
`;class Wt extends qt{static properties={_selectedCard:{state:!0},_expandedButton:{state:!0}};static styles=[qt.styles,n`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 4px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        cursor: pointer;
      }
      .button-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
      }
      .button-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        overflow-x: auto;
      }
      .tabs {
        display: flex;
        gap: 4px;
        flex: 1;
        overflow-x: auto;
      }
      .tab {
        padding: 6px 14px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 999px;
        font-size: 13px;
        cursor: pointer;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        flex-shrink: 0;
      }
      .tab.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color);
      }
      .card-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
        justify-content: flex-end;
      }
      #editor {
        margin-top: 12px;
      }
    `];setConfig(t){super.setConfig(t),this._selectedCard??=-1,this._expandedButton??=null}_formData(){return{columns:2,...jt(this._config)}}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const t=this._config?.entity?.split(".")[0],e="cover"===t,i="light"===t;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"columns",selector:{number:{min:1,max:6,mode:"slider"}}},{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||e?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...e?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(t){return[Dt(t?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=this._config.cards||[],e=t.length,i=this._selectedCard,s=i===e,o=i>=0&&i<e,n=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${n.map((t,e)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleSubButton(e)}>
              <span>${t.name||(t.icon&&!Dt(t.icon)?t.icon:`Button ${e+1}`)}</span>
              <ha-icon-button @click=${t=>{t.stopPropagation(),this._toggleSubButton(e)}}>
                <ha-icon icon=${this._expandedButton===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${t=>{t.stopPropagation(),this._removeSubButton(e)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===e?I`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._subButtonSchema(t)}
                      .computeLabel=${At}
                      @value-changed=${t=>this._subButtonChanged(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}

      <div class="section-header"><span>Cards</span></div>

      <div class="toolbar">
        <div class="tabs">
          ${t.map((t,e)=>I`
              <div
                class="tab ${i===e?"selected":""}"
                @click=${()=>this._selectedCard=e}
              >${e+1}</div>
            `)}
        </div>
        <ha-icon-button
          class="${s?"selected":""}"
          @click=${()=>this._selectedCard=e}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      <div id="editor">
        ${s?I`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `:o?I`
              <div class="card-actions">
                <ha-icon-button ?disabled=${0===i} @click=${()=>this._moveCard(-1)}>
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </ha-icon-button>
                <ha-icon-button ?disabled=${i===e-1} @click=${()=>this._moveCard(1)}>
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${this._removeCard}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${t[i]}
                @config-changed=${this._handleChildChanged}
              ></hui-card-element-editor>
            `:""}
      </div>
    `}_toggleSubButton(t){this._expandedButton=this._expandedButton===t?null:t}_addSubButton(){const t=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:t}),this._expandedButton=t.length-1}_removeSubButton(t){const e=[...this._config.sub_buttons||[]];e.splice(t,1),this._expandedButton===t&&(this._expandedButton=null);const i={...this._config};0===e.length?delete i.sub_buttons:i.sub_buttons=e,this._commit(i)}_subButtonChanged(t,e){const i=[...this._config.sub_buttons||[]];i[t]={...i[t],...e},this._commit({...this._config,sub_buttons:i})}_handleCardPicked(t){t.stopPropagation();const e=[...this._config.cards||[],t.detail.config];this._selectedCard=e.length-1,this._commit({...this._config,cards:e})}_handleChildChanged(t){if(t.stopPropagation(),t.detail.error)return;const e=[...this._config.cards||[]];e[this._selectedCard]=t.detail.config,this._commit({...this._config,cards:e})}_moveCard(t){const e=[...this._config.cards||[]],i=this._selectedCard,s=i+t;if(s<0||s>=e.length)return;const[o]=e.splice(i,1);e.splice(s,0,o),this._selectedCard=s,this._commit({...this._config,cards:e})}_removeCard(){const t=[...this._config.cards||[]];t.splice(this._selectedCard,1),this._selectedCard=Math.max(0,Math.min(this._selectedCard,t.length-1)),0===t.length&&(this._selectedCard=-1),this._commit({...this._config,cards:t})}}customElements.define("materia-room-editor",Wt);class Vt extends It{static properties={...It.properties,_expanded:{state:!0},_childCards:{state:!0}};static styles=[kt,wt,Ct,St,$t,Et,Ht];static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e,columns:2,cards:[]}}constructor(){super(),this._expanded=!1,this._childCards=null}setConfig(t){if(!t.entity)throw new Error("entity is required");const e=this.config?.cards;this.config={columns:2,...t};const i=this.config.cards;JSON.stringify(e)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}firstUpdated(){this._createChildCards()}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&this._childCards&&this._childCards.forEach(t=>t.hass=this.hass)}async _createChildCards(){const t=this.config?.cards;if(!t||0===t.length)return void(this._childCards=[]);const e=await pt();this._childCards=await Promise.all(t.map(async t=>{const i=await e.createCardElement(t);return this.hass&&(i.hass=this.hass),i})),this.requestUpdate()}_toggleExpand(t){t?.stopPropagation?.(),this._expanded=!this._expanded,this._fireHaptic("selection")}render(){if(!this.config||!this.hass)return I``;const t=this._stateObj,e=this._isUnavailable(t);!e&&this._isActive;const i=!e&&this._showSlider,s=e?[]:this._subButtons,o=this._getContainerBg(),n=this._getTextColor(),a=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=e?"Unavailable":this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c,u=this.config.columns||2;return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${o}; color: ${n};"
          @pointerdown=${i?this._onPointerDown:void 0}
          @click=${i?void 0:()=>this._handleTap()}
        >
          ${i?I`<div class="fill" style="width: ${a}%; background-color: ${r}; opacity: 1;"></div>`:V}

          <div class="icon-container">
            ${l?I`<ha-icon .icon=${l} style="color: ${n};"></ha-icon>`:I`<ha-state-icon .hass=${this.hass} .stateObj=${t} style="color: ${n};"></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${!h&&d?I`<div class="subtitle">${d}</div>`:V}
            ${p?I`<div class="state">${p}</div>`:V}
          </div>

          <div class="sub-buttons">
            ${s.map(t=>I`
                <button
                  class="sub-btn"
                  title=${t.name||""}
                  @click=${e=>this._handleSubButton(t,e)}
                >
                  <ha-icon .icon=${t.icon}></ha-icon>
                </button>
              `)}
            <button class="sub-btn room-expand" @click=${this._toggleExpand}>
              <ha-icon icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>

      <div class="collapsible ${this._expanded?"expanded":""}">
        <div class="collapsible-inner">
          <div class="grid" style="--room-columns: ${u}">
            ${this._childCards?.map(t=>I`<div class="grid-item">${t}</div>`)}
          </div>
        </div>
      </div>
    `}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}getGridOptions(){return{columns:12,rows:"auto"}}}customElements.define("materia-room",Vt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"Materia card with expandable child-card grid.",preview:!0});const Xt=n`
  ha-card {
    border-radius: 30px;
    padding: 16px 20px 20px;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 205px;
    -webkit-tap-highlight-color: transparent;
    transition: none;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 28px;
  }

  .header ha-icon {
    flex-shrink: 0;
  }

  .name {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chevron {
    --mdc-icon-size: 20px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .center {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 4px;
  }

  .center-side {
    width: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .temp {
    flex: 1;
    font-size: 72px;
    font-weight: 450;
    line-height: 1;
    text-align: center;
    user-select: none;
  }

  .temp.off {
    opacity: 0.7;
  }

  @media (max-width: 420px) {
    ha-card {
      height: 193px;
    }
    .temp {
      font-size: 64px;
    }
    .btn {
      width: 65px !important;
      height: 45px !important;
    }
  }

  .btn {
    width: 80px;
    height: 55px;
    border: none;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
    outline: none;
  }

  .btn:active {
    opacity: 0.8;
  }

  .btn ha-icon {
    display: flex;
  }

  .status {
    font-size: 15px;
    padding-top: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 100%;
  }
`;customElements.define("materia-climate-editor",class extends qt{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,template:!0,selector:{text:{}}}]},{title:"Sensors",icon:"mdi:thermometer",fields:[{name:"temperature_entity",label:"Temperature sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",label:"Outdoor temperature sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}]}});class Gt extends(xt(ct)){static get properties(){return{hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_resolvedName:{state:!0}}}static styles=[kt,$t,Xt];static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("climate."))||"climate.example";return{entity:e,name:"Climate",step:.5}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this.config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this.config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return null!=this._optimisticTemp?this._optimisticTemp:this._entity?.attributes?.temperature}get _currentTemp(){return this.config.temperature_entity?this.hass?.states[this.config.temperature_entity]?.state:this._entity?.attributes?.current_temperature}get _humidity(){if(this.config.humidity_entity)return this.hass?.states[this.config.humidity_entity]?.state}get _outdoorTemp(){if(this.config.outdoor_temp_entity)return this.hass?.states[this.config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--primary-text-color)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant))"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-on-surface)"}}_statusText(){const t=this._currentTemp,e=this._humidity,i=this._outdoorTemp,s=[];return null!=t&&s.push(`${t}°`),null!=e&&s.push(`${e}%`),null!=i&&s.push(`${i}°`),s.join(" · ")||""}_adjustTemp(t){const e=this._targetTemp;if(null==e)return;const i=this.config.step??.5,s=Number(this._entity?.attributes?.min_temp??7),o=Number(this._entity?.attributes?.max_temp??35),n=Math.min(o,Math.max(s,Math.round((Number(e)+t)/i)*i));this._optimisticTemp=n,this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:n}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4)}updated(t){if(t.has("hass")&&this.hass&&this._resolveField("name","_resolvedName"),t.has("hass")&&null!=this._optimisticTemp){const t=Number(this._entity?.attributes?.temperature);Number.isFinite(t)&&Math.abs(t-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer)}_handleTap(t){t.target.closest(".btn")||this._handleAction(this.config.tap_action??{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const t=this._entity,e=this._isUnavailable(t),i="off"===this._mode||e,s=e?"Unavailable":i?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return I`
      <ha-card
        class="${e?"unavailable":""}"
        @click=${this._handleTap}
        style="
          background-color: ${this._modeBg()};
          color: ${this._modeColor()};
        "
      >
        <div class="header">
          <ha-icon
            .icon=${this._modeIcon()}
            style="color: ${this._modeColor()}; --mdc-icon-size: 20px;"
          ></ha-icon>
          <span class="name" style="color: ${this._modeColor()};">
            ${this._isTemplate(this.config.name)?this._resolvedName:this.config.name}
          </span>
          ${this._hasNavigateAction?I`<ha-icon
                class="chevron"
                icon="mdi:chevron-right"
                style="color: ${this._modeColor()};"
              ></ha-icon>`:V}
        </div>

        <div class="center">
          <div class="center-side">
            ${i?V:I`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${t=>{t.stopPropagation(),this._adjustTemp(-this.config.step)}}
                  >
                    <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>

          <span class="temp ${i?"off":""}">${s}</span>

          <div class="center-side">
            ${i?V:I`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${t=>{t.stopPropagation(),this._adjustTemp(this.config.step)}}
                  >
                    <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>
        </div>

        <div class="status" style="color: ${this._modeColor()};">
          ${this._statusText()}
        </div>
      </ha-card>
    `}}customElements.define("materia-climate",Gt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"Climate thermostat with mode-based theming and temperature controls.",preview:!0});const Yt=[kt,wt,$t,n`
  .container {
    position: relative;
    width: 100%;
    min-height: 50px;
    background: transparent;
    border-radius: 28px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px;
    margin-left: 8px;
    border-radius: 50%;
    background-color: var(--ha-card-background, var(--card-background-color));
    flex-shrink: 0;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .name-container {
    display: flex;
    line-height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin: 0 16px 0 4px;
    overflow: hidden;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .state {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.7;
    white-space: nowrap;
  }
`];customElements.define("materia-weather-editor",class extends qt{_formData(){return{show_temperature:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Sensors",icon:"mdi:water-percent",fields:[{name:"show_temperature",label:"Show temperature",selector:{boolean:{}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const Kt={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"},Zt={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Qt extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}static styles=Yt;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",s=!1!==this.config.show_temperature;let o=t?.attributes?.temperature,n=t?.attributes?.temperature_unit||"°";if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&(o=t.state,n=t.attributes?.unit_of_measurement||n)}const a=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||Kt[i]||"mdi:weather-partly-cloudy";let r=null;if(this.config.humidity_entity){const t=this.hass.states[this.config.humidity_entity];t&&(r=t.state)}null==r&&null!=t?.attributes?.humidity&&(r=t.attributes.humidity);const l=Zt[i]||this._capitalize(i.replace(/-|_/g," ")),c=this._isTemplate(this.config.name)?this._resolvedName:this.config.name,d=s&&null!=o?`${o}${n}`:null;let h;h=e?"Unavailable":c||(d||(l||"—"));const p=[];e||(d&&h!==d&&p.push(d),h!==l&&p.push(l),null!=r&&p.push(`${r}%`));const u=p.join(" · ");return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""}"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${a}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${h}</div>
            <div class="state">${u}</div>
          </div>
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}function Jt(t,e,i,s=12){return te(t,e,i,{vertices:s,innerRadius:.8,rounding:.5,rotate:-Math.PI/2})}function te(t,e,i,{vertices:s,innerRadius:o=null,rounding:n=.2,rotate:a=0}={}){const r=[],l=null!=o?2*s:s;for(let s=0;s<l;s++){const c=null!=o&&s%2==1?i*o:i,d=a+s/l*Math.PI*2;r.push({x:t+c*Math.cos(d),y:e+c*Math.sin(d),r:n*i})}return function(t){return ie(ee(t))}(r)}function ee(t){const e=t.length,i=[];for(let s=0;s<e;s++){const o=t[(s-1+e)%e],n=t[s],a=t[(s+1)%e],r=[o.x-n.x,o.y-n.y],l=[a.x-n.x,a.y-n.y],c=Math.hypot(...r),d=Math.hypot(...l);r[0]/=c,r[1]/=c,l[0]/=d,l[1]/=d;const h=r[0]*l[0]+r[1]*l[1],p=Math.acos(Math.min(1,Math.max(-1,h)))/2;let u=n.r/Math.tan(p);u=Math.min(u,.5*c,.5*d);const m=u*Math.tan(p),g=[n.x+r[0]*u,n.y+r[1]*u],f=[n.x+l[0]*u,n.y+l[1]*u],_=r[0]+l[0],b=r[1]+l[1],v=Math.hypot(_,b)||1,y=m/Math.sin(p),x=[n.x+_/v*y,n.y+b/v*y],w=r[0]*l[1]-r[1]*l[0];i.push({T1:g,T2:f,C:x,rEff:m,sweep:w>0?0:1})}return i}function ie(t){const e=t.length;let i=`M${t[0].T1[0].toFixed(2)} ${t[0].T1[1].toFixed(2)} `;for(let s=0;s<e;s++){const o=t[s],n=t[(s+1)%e];i+=`A${o.rEff.toFixed(2)} ${o.rEff.toFixed(2)} 0 0 ${o.sweep} ${o.T2[0].toFixed(2)} ${o.T2[1].toFixed(2)} `,i+=`L${n.T1[0].toFixed(2)} ${n.T1[1].toFixed(2)} `}return i+"Z"}function se(t,e,i,s=0){return ne(t,e,i,s,[{x:.457,y:.296,r:.007},{x:.5,y:-.051,r:.007}],15)}function oe(t,e,i,s=0){return ne(t,e,i,s,[{x:.193,y:.277,r:.053},{x:.176,y:.055,r:.053}],10)}function ne(t,e,i,s,o,n){const a=[];for(let t=0;t<n;t++){const e=s+t/n*Math.PI*2,i=Math.cos(e),r=Math.sin(e);for(const t of o){const e=t.x-.5,s=t.y-.5;a.push({x:.5+e*i-s*r,y:.5+e*r+s*i,r:t.r})}}const r=ee(a),l=[];for(const t of r){const e=Math.atan2(t.T1[1]-t.C[1],t.T1[0]-t.C[0]);let i=Math.atan2(t.T2[1]-t.C[1],t.T2[0]-t.C[0])-e;if(1===t.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=8;s++){const o=e+i*s/8;l.push([t.C[0]+t.rEff*Math.cos(o),t.C[1]+t.rEff*Math.sin(o)])}}const c=Math.max(...l.map(([t,e])=>Math.hypot(t-.5,e-.5))),d=i/c,h=i=>[t+(i[0]-.5)*d,e+(i[1]-.5)*d];return ie(r.map(t=>({T1:h(t.T1),T2:h(t.T2),C:h(t.C),rEff:t.rEff*d,sweep:t.sweep})))}function ae(t,e,i,{points:s,reps:o=1,mirroring:n=!1,rotate:a=0}){const r=function(t,e,i,s=.5,o=.5){const n=[];if(!i){const i=t.length;for(let a=0;a<i*e;a++){const r=t[a%i],l=360*Math.floor(a/i)/e*(Math.PI/180),c=r.x-s,d=r.y-o;n.push({x:s+c*Math.cos(l)-d*Math.sin(l),y:o+c*Math.sin(l)+d*Math.cos(l),r:r.r})}return n}const a=t.map(t=>180*Math.atan2(t.y-o,t.x-s)/Math.PI),r=t.map(t=>Math.hypot(t.x-s,t.y-o)),l=2*e,c=360/l;for(let e=0;e<l;e++){const i=e%2==0;for(let l=0;l<t.length;l++){const d=i?l:t.length-1-l;if(!(d>0||i))continue;const h=(c*e+(i?a[d]:c-a[d]+2*a[0]))*(Math.PI/180);n.push({x:s+Math.cos(h)*r[d],y:o+Math.sin(h)*r[d],r:t[d].r})}}return n}(s,o,n),l=Math.cos(a),c=Math.sin(a),d=r.map(t=>{const e=t.x-.5,i=t.y-.5;return{x:.5+e*l-i*c,y:.5+e*c+i*l,r:t.r}}),h=ee(d),p=function(t){let e=1/0,i=1/0,s=-1/0,o=-1/0;const n=(t,n)=>{t<e&&(e=t),t>s&&(s=t),n<i&&(i=n),n>o&&(o=n)};for(const e of t){const t=Math.atan2(e.T1[1]-e.C[1],e.T1[0]-e.C[0]);let i=Math.atan2(e.T2[1]-e.C[1],e.T2[0]-e.C[0])-t;if(1===e.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=16;s++){const o=t+i*s/16;n(e.C[0]+e.rEff*Math.cos(o),e.C[1]+e.rEff*Math.sin(o))}}return{minX:e,minY:i,maxX:s,maxY:o}}(h),u=p.maxX-p.minX,m=p.maxY-p.minY,g=i/Math.max(u,m),f=(p.minX+p.maxX)/2,_=(p.minY+p.maxY)/2,b=i=>[t+(i[0]-f)*g,e+(i[1]-_)*g];return ie(h.map(t=>({T1:b(t.T1),T2:b(t.T2),C:b(t.C),rEff:t.rEff*g,sweep:t.sweep})))}function re(t,e,i,s,o){const n=s=>{const o=(s-90)*Math.PI/180;return[t+i*Math.cos(o),e+i*Math.sin(o)]},[a,r]=n(s),[l,c]=n(o),d=Math.abs(o-s)>180?1:0;return`M${a.toFixed(2)} ${r.toFixed(2)} A${i} ${i} 0 ${d} 1 ${l.toFixed(2)} ${c.toFixed(2)}`}function le(t,e,i,s){const o=Math.cos(2*Math.PI*s);if(s<.02||s>.98)return"";const n=Math.max(.01,Math.abs(o)*i).toFixed(2),a=`${t} ${e-i}`,r=`${t} ${e+i}`;return s<=.5?`M${a} A${i} ${i} 0 0 1 ${r} A${n} ${i} 0 0 ${o>0?0:1} ${a} Z`:`M${a} A${i} ${i} 0 0 0 ${r} A${n} ${i} 0 0 ${o>0?1:0} ${a} Z`}function ce(t,e){const i={new_moon:0,waxing_crescent:.125,first_quarter:.25,waxing_gibbous:.375,full_moon:.5,waning_gibbous:.625,last_quarter:.75,waning_crescent:.875},s=e?t?.states?.[e]:t?.states?.["sensor.moon_phase"]??t?.states?.["sensor.moon"];return s&&s.state in i?i[s.state]:null}customElements.define("materia-weather",Qt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather condition card with automatic icon mapping.",preview:!0});const de="var(--md-sys-cust-color-weather-sun, #FFC83D)",he="var(--md-sys-cust-color-weather-cloud, #E6EAF0)",pe="var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)",ue="var(--md-sys-cust-color-weather-rain, #5FA8F5)",me="var(--md-sys-cust-color-weather-sun, #FFC83D)",ge="var(--md-sys-cust-color-weather-moon, #DCE3F7)";let fe=0;function _e(t,e,i,s){const o=.1*i,n=72,a=[];for(let s=0;s<n;s++){const r=s/n*Math.PI*2,l=i+o*Math.cos(9*r);a.push([t+l*Math.cos(r),e+l*Math.sin(r)])}let r=`M${a[0][0].toFixed(2)} ${a[0][1].toFixed(2)} `;for(let t=0;t<n;t++){const e=a[(t-1+n)%n],i=a[t],s=a[(t+1)%n],o=a[(t+2)%n],l=i[0]+(s[0]-e[0])/6,c=i[1]+(s[1]-e[1])/6,d=s[0]-(o[0]-i[0])/6,h=s[1]-(o[1]-i[1])/6;r+=`C${l.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} `}return H`<path d=${r+"Z"} fill=${s} />`}function be(t,e,i,s){return H`
    <g fill=${s} transform=${`translate(${t} ${e}) scale(${i})`}>
      <circle cx="-4" cy="1" r="4" />
      <circle cx="1" cy="-1.5" r="5" />
      <circle cx="5" cy="1.5" r="3.6" />
      <rect x="-6.2" y="1.2" width="13.4" height="5" rx="2.6" />
    </g>`}function ve(t,e,i){return H`<g stroke=${t} stroke-width="1.8" stroke-linecap="round">
    ${e.map(t=>H`<line x1=${t} y1=${i} x2=${t-1.5} y2=${i+3.5} />`)}
  </g>`}function ye(t,e){return H`<g fill=${"var(--md-sys-cust-color-weather-snow, #FFFFFF)"}>
    ${t.map(t=>H`<circle cx=${t} cy=${e} r="1.2" />`)}
  </g>`}const xe={sunny:t=>_e(12,12,7.5,t.sun),clear:t=>_e(12,12,7.5,t.sun),"clear-night":(t,e)=>{if(null==e)return H`<path d="M17 14.5 A7 7 0 1 1 10.5 5 A5.5 5.5 0 0 0 17 14.5 Z" fill=${t.moon} />`;const i=le(12,12,7.2,e);return H`
      <circle cx="12" cy="12" r="7.2" fill="color-mix(in srgb, ${ge} 22%, transparent)" />
      ${i?H`<path d=${i} fill=${t.moon} />`:""}`},partlycloudy:t=>H`${_e(12,8,5.2,t.sun)}${be(10,15,.85,t.cloud)}`,partly_cloudy:t=>H`${_e(12,8,5.2,t.sun)}${be(10,15,.85,t.cloud)}`,cloudy:t=>be(12,12,1.1,t.cloudDk),rainy:t=>H`${be(12,10,1,t.cloudDk)}${ve(ue,[8,12,16],17)}`,pouring:t=>H`${be(12,9.5,1,t.cloudDk)}${ve(ue,[7,10,13,16],16.5)}`,snowy:t=>H`${be(12,10,1,t.cloud)}${ye([8,12,16],18)}`,"snowy-rainy":t=>H`${be(12,10,1,t.cloud)}${ve(ue,[9,15],17)}${ye([12],18)}`,fog:t=>H`${be(12,9,.95,t.cloudDk)}<g stroke=${"var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)"} stroke-width="1.8" stroke-linecap="round">
      <line x1="6" y1="17" x2="18" y2="17" /><line x1="7.5" y1="20" x2="16.5" y2="20" /></g>`,hail:t=>H`${be(12,10,1,t.cloudDk)}${ye([8,12,16],18)}`,lightning:t=>H`${be(12,10,1,t.cloudDk)}<path d="M12 14 l-2.5 5 h2 l-1 4 4.5-6.5 h-2.2 l1.5-2.5 z" fill=${me} />`,"lightning-rainy":t=>H`${be(12,9.5,1,t.cloudDk)}${ve(ue,[8,16],17)}<path d="M12 14 l-2 4 h1.8 l-0.8 3.5 4-5.5 h-2 l1.3-2 z" fill=${me} />`,windy:()=>H`<g stroke=${pe} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,"windy-variant":()=>H`<g stroke=${pe} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,exceptional:t=>be(12,12,1.1,t.cloudDk)};function we(t,e=null){const i=xe[t]||xe.cloudy,s=++fe;return H`${function(t){return H`<defs>
    <radialGradient id="wxSunG-${t}" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${de} 55%, #FFF4CF)" />
      <stop offset="55%" stop-color=${de} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${de} 72%, #B85C00)" />
    </radialGradient>
    <linearGradient id="wxCloudG-${t}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${he} 30%, #FFFFFF)" />
      <stop offset="70%" stop-color=${he} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${he} 78%, #8B94A5)" />
    </linearGradient>
    <linearGradient id="wxCloudDkG-${t}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${pe} 45%, #FFFFFF)" />
      <stop offset="70%" stop-color=${pe} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${pe} 72%, #5A6474)" />
    </linearGradient>
    <radialGradient id="wxMoonG-${t}" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${ge} 45%, #FFFFFF)" />
      <stop offset="60%" stop-color=${ge} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${ge} 62%, #4A5AB8)" />
    </radialGradient>
  </defs>`}(s)}${i(function(t){return{sun:`url(#wxSunG-${t})`,cloud:`url(#wxCloudG-${t})`,cloudDk:`url(#wxCloudDkG-${t})`,moon:`url(#wxMoonG-${t})`}}(s),e)}`}const $e=[kt,wt,n`
  ha-card {
    background: none;
    border: none;
    box-shadow: none;
    height: 100%;
    /* Let the tilted pill extend past the card box. */
    overflow: visible;
  }

  .blob {
    position: relative;
    width: var(--wt-width, 100%);
    max-width: var(--wt-size, none);
    margin: 0 auto;
    aspect-ratio: 1 / var(--wt-ratio, 0.64);
    box-sizing: border-box;
    container-type: inline-size;
    overflow: hidden;
    cursor: pointer;
    /* Defaults to the SAME surface as the clock face so the two read as a set. */
    background: var(--wt-bg, var(--md-sys-color-surface-container-high, var(--card-background-color)));
    color: var(--wt-fg, var(--md-sys-color-primary, var(--primary-text-color)));
    /* M3 pill shape: stadium (flat top/bottom, fully rounded ends) — not an
       ellipse. The large radius clamps to half the shorter (height) side. */
    border-radius: 9999px;
    /* Tilt the whole pill diagonally (Pixel-widget style). --wt-tilt is set
       per-config; scale keeps the rotated stadium inside its cell. */
    transform: rotate(var(--wt-tilt, -26deg)) scale(0.8);
  }

  /* Content counter-rotates so the temperature / icon stay upright. */
  .readout {
    position: absolute;
    top: var(--wt-temp-y, 17%);
    right: var(--wt-temp-x, 16%);
    z-index: 0; /* icon draws in front of the temperature */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5cqi;
    transform: rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .temp {
    font-size: var(--wt-temp-size, 24cqi);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .minmax {
    display: flex;
    gap: 3.5cqi;
    font-size: 5.5cqi;
    font-weight: 600;
    color: var(--wt-minmax, currentColor);
    opacity: var(--wt-minmax-opacity, 0.75);
  }

  .wx {
    position: absolute;
    left: var(--wt-icon-x, 16%);
    bottom: var(--wt-icon-y, 20%);
    z-index: 1;
    width: var(--wt-icon-size, 27cqi);
    height: var(--wt-icon-size, 27cqi);
    transform: rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .wx-mono {
    position: absolute;
    left: var(--wt-icon-x, 16%);
    bottom: var(--wt-icon-y, 20%);
    z-index: 1;
    --mdc-icon-size: var(--wt-icon-size, 27cqi);
    display: flex;
    transform: rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  /* Positive tilt (top-left → bottom-right): mirror the layout so the
     temperature and icon follow the opposite diagonal. */
  .blob.flip .readout {
    right: auto;
    left: var(--wt-temp-x, 16%);
    align-items: flex-start;
  }

  .blob.flip .wx,
  .blob.flip .wx-mono {
    left: auto;
    right: var(--wt-icon-x, 16%);
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];customElements.define("materia-weather-tile-editor",class extends qt{_formData(){return{show_minmax:!0,mirror:!1,size:10,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"icon",label:"Custom icon (overrides the colored glyph)",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Min / Max",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show min / max",selector:{boolean:{}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}},{name:"mirror",label:"Mirror (temperature left, icon right)",selector:{boolean:{}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / temperature",color:!0,template:!0,selector:{text:{}}},{name:"minmax_color",label:"Min / max color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class ke extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedMinmaxColor:{state:!0},_forecast:{state:!0}};static styles=$e;static getConfigElement(){return document.createElement("materia-weather-tile-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e,show_minmax:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("minmax_color","_resolvedMinmaxColor"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"";let s=t?.attributes?.temperature;if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&(s=t.state)}const o=null!=this._num(s)?`${this._num(s)}°`:"—",n=t=>{const e=t?this.hass.states[t]:null;return e&&!this._isUnavailable(e)?e.state:null};let a=n(this.config.low_entity),r=n(this.config.high_entity);const l=this._forecast?.[0]||t?.attributes?.forecast?.[0];null==a&&null!=l?.templow&&(a=l.templow),null==r&&null!=l?.temperature&&(r=l.temperature);const c=this.config.show_minmax&&(null!=this._num(a)||null!=this._num(r)),d=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,h=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,p=this._isTemplate(this.config.minmax_color)?this._resolvedMinmaxColor:this.config.minmax_color;let u="number"==typeof this.config.tilt?this.config.tilt:{right:-45,left:45,none:0}[this.config.tilt]??-45;this.config.mirror&&(u=-u);const m=this.config.icon_size??53,g=this.config.text_size??30,f=this.config.width??115,_=(this.config.height??85)/100,b=this.config.icon_x??5,v=this.config.icon_y??10,y=this.config.temp_x??10,x=this.config.temp_y??15,w=`--wt-size:${["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][Math.min(10,Math.max(1,this.config.size??10))-1]};--wt-tilt:${u}deg;--wt-icon-size:${m}cqi;--wt-temp-size:${g}cqi;--wt-width:${f}%;--wt-ratio:${_};--wt-icon-x:${b}%;--wt-icon-y:${v}%;--wt-temp-x:${y}%;--wt-temp-y:${x}%;${d?`--wt-bg:${d};`:""}${h?`--wt-fg:${h};`:""}`+(p?`--wt-minmax:${p};--wt-minmax-opacity:1;`:""),$=this.config.icon;return I`
      <ha-card>
        <div
          class="blob ${e?"unavailable":""} ${this.config.mirror?"flip":""}"
          style=${w}
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <div class="readout">
            ${c?I`<div class="minmax">
                  <span>↑${null!=this._num(r)?`${this._num(r)}°`:"—"}</span>
                  <span>↓${null!=this._num(a)?`${this._num(a)}°`:"—"}</span>
                </div>`:""}
            <div class="temp">${e?"—":o}</div>
          </div>
          ${$?I`<ha-icon class="wx-mono" .icon=${$}></ha-icon>`:H`<svg class="wx" viewBox="0 0 24 24">${we(i,ce(this.hass,this.config.moon_entity))}</svg>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 3}}customElements.define("materia-weather-tile",ke),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-tile",name:"Materia Weather Tile",description:"Large blobby weather widget with a big temperature and colored condition icon.",preview:!0});const Ce=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .hero {
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      color: var(--wh-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
      padding: 8px 0 10px;
      -webkit-tap-highlight-color: transparent;
    }

    .condition {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: clamp(18px, 7cqi, 26px);
      font-weight: 500;
      opacity: 0.95;
    }

    .cond-glyph {
      width: clamp(22px, 8cqi, 30px);
      height: clamp(22px, 8cqi, 30px);
    }

    /* Pixel-style numerals: big but LIGHT — the heavy 700 weight and tight
       tracking read as "off" next to the reference. */
    .temp {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      line-height: 0.95;
      margin: 4px 0 6px;
    }

    .temp-value,
    .temp-deg {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(72px, 38cqi, 150px);
      font-weight: 300; /* display voice: big-but-LIGHT */
      letter-spacing: normal;
      font-variant-numeric: tabular-nums;
    }

    .temp-deg {
      opacity: 0.95;
    }

    .feels {
      font-size: clamp(16px, 6cqi, 22px);
      font-weight: 500;
      opacity: 0.92;
    }

    .minmax {
      display: flex;
      gap: 7px;
      margin-top: 4px;
      font-size: clamp(14px, 5cqi, 18px);
      font-weight: 600;
    }

    .minmax .sep {
      opacity: 0.6;
      font-weight: 400;
    }
  `];customElements.define("materia-weather-hero-editor",class extends qt{_formData(){return{show_condition:!0,show_icon:!0,show_feels_like:!0,show_minmax:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"feels_like_entity",label:"Feels-like sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"show_condition",label:"Show condition text",selector:{boolean:{}}},{name:"show_icon",label:"Show condition glyph",selector:{boolean:{}}},{name:"show_feels_like",label:"Show feels-like",selector:{boolean:{}}}]},{title:"Night / Day",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show night / day range",selector:{boolean:{}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"night_label",label:"Night label",selector:{text:{}}},{name:"day_label",label:"Day label",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const Se={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Ee extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColorOn:{state:!0}};static styles=Ce;static getConfigElement(){return document.createElement("materia-weather-hero-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color_on","_resolvedColorOn"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",s=Se[i]||this._capitalize(String(i).replace(/-|_/g," "));let o=t?.attributes?.temperature;if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&!this._isUnavailable(t)&&(o=t.state)}const n=this._num(o);let a=t?.attributes?.apparent_temperature;if(this.config.feels_like_entity){const t=this.hass.states[this.config.feels_like_entity];t&&!this._isUnavailable(t)&&(a=t.state)}const r=this._num(a),l=t=>{const e=t?this.hass.states[t]:null;return e&&!this._isUnavailable(e)?e.state:null};let c=l(this.config.low_entity),d=l(this.config.high_entity);const h=this._forecast?.[0]||t?.attributes?.forecast?.[0];null==c&&null!=h?.templow&&(c=h.templow),null==d&&null!=h?.temperature&&(d=h.temperature);const p=this._num(c),u=this._num(d),m=this.config.night_label??"Night",g=this.config.day_label??"Day",f=this.config.separator??"•",_=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on;return I`
      <ha-card>
        <div
          class="hero ${e?"unavailable":""}"
          style="${_?`--wh-fg:${_};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          ${!1!==this.config.show_condition?I`<div class="condition">
                ${!1===this.config.show_icon||e?"":H`<svg class="cond-glyph" viewBox="0 0 24 24">${we(i,ce(this.hass,this.config.moon_entity))}</svg>`}
                <span>${e?"—":s}</span>
              </div>`:""}
          <div class="temp">
            <span class="temp-value">${e||null==n?"—":n}</span><span class="temp-deg">°</span>
          </div>
          ${!1===this.config.show_feels_like||null==r||e?"":I`<div class="feels">${this.config.feels_like_label??"Feels like"} ${r}°</div>`}
          ${!1===this.config.show_minmax||null==p&&null==u||e?"":I`<div class="minmax">
                <span>${m}: ${null!=p?`${p}°`:"—"}</span>
                <span class="sep">${f}</span>
                <span>${g}: ${null!=u?`${u}°`:"—"}</span>
              </div>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}function Ae(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}function Me(t,{locale:e="en",showPrecip:i=!0,minPrecip:s=10,moonPhase:o=null}={}){return t.map(t=>{const n=Ae(t.temperature),a=Ae(t.precipitation_probability),r=new Date(t.datetime),l=Number.isNaN(r.getTime())?"":r.toLocaleTimeString(e,{hour:"numeric"});return I`
      <div class="hour">
        <span class="h-temp">${null!=n?`${n}°`:"—"}</span>
        <svg class="h-glyph" viewBox="0 0 24 24">${we(t.condition,o)}</svg>
        ${i&&null!=a&&a>=s?I`<span class="h-precip">${a}%</span>`:I`<span class="h-precip empty"></span>`}
        <span class="h-time">${l}</span>
      </div>
    `})}customElements.define("materia-weather-hero",Ee),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-hero",name:"Materia Weather Hero",description:"Current-conditions hero: condition, huge temperature, feels-like and night/day range.",preview:!0});const Te=n`
  .hours {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;
  }

  .hours::-webkit-scrollbar {
    display: none;
  }

  .hours:active {
    cursor: grabbing;
  }

  .hour {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 52px;
    padding: 8px 4px;
  }

  .h-temp {
    font-size: 14px;
    font-weight: 600;
  }

  .h-glyph {
    width: 26px;
    height: 26px;
  }

  .h-precip {
    font-size: 11px;
    font-weight: 600;
    color: var(--md-sys-cust-color-weather-rain, #5fa8f5);
    min-height: 14px;
  }

  .h-precip.empty {
    visibility: hidden;
  }

  .h-time {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.75;
  }
`,Fe=[kt,wt,$t,gt,Te,n`
    ha-card {
      border-radius: 24px;
      padding: 12px 14px;
      /* haCardReset clears the background — restore the surface so the strip
         reads as a card like its neighbors, not floating glyphs. */
      background: var(--ha-card-background, var(--card-background-color));
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 2px 4px 6px;
      opacity: 0.9;
    }

    .header ha-icon {
      --mdc-icon-size: 18px;
    }
  `],ze=[kt,wt,$t,gt,Te,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .row {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 2px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      cursor: grab;
      user-select: none;
    }

    .row:active {
      cursor: grabbing;
    }

    .row::-webkit-scrollbar {
      display: none;
    }

    .pill {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 64px;
      padding: 14px 10px 12px;
      border: none;
      border-radius: 999px;
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .pill:active {
      transform: scale(0.96);
    }

    .pill.static {
      cursor: default;
    }

    .pill.static:active {
      transform: none;
    }

    .pill.selected {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .hi {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;
    }

    .lo {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.6;
      line-height: 1.2;
    }

    .glyph {
      width: 34px;
      height: 34px;
      margin: 6px 0 0;
    }

    .precip {
      font-size: 12px;
      font-weight: 600;
      color: var(--md-sys-cust-color-weather-rain, #5fa8f5);
      line-height: 1.3;
      min-height: 16px;
    }

    .pill.selected .precip {
      color: inherit;
      opacity: 0.85;
    }

    .precip.empty {
      visibility: hidden;
    }

    .day {
      font-size: 13px;
      font-weight: 500;
      margin-top: 2px;
      opacity: 0.85;
    }

    /* Expanding hourly detail — the 0fr→1fr grid-row trick animates height
       without measuring; the expressive spatial spring gives it the M3 bounce. */
    .detail {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--md-sys-motion-expressive-default-spatial);
    }

    .detail.open {
      grid-template-rows: 1fr;
    }

    .detail-inner {
      overflow: hidden;
      min-height: 0;
    }

    .detail-inner .hours {
      margin-top: 8px;
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      padding: 8px 10px;
    }
  `];customElements.define("materia-forecast-daily-editor",class extends qt{_formData(){return{days:10,show_hourly:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"days",label:"Days shown",selector:{number:{min:3,max:15,step:1,mode:"slider"}}},{name:"show_hourly",label:"Tap a day to expand its hourly detail",selector:{boolean:{}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}},{name:"today_label",label:"Label for today",selector:{text:{}}}]}]}});class Oe extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_hourly:{state:!0},_selected:{state:!0},_expanded:{state:!0}};static styles=ze;static getConfigElement(){return document.createElement("materia-forecast-daily-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0,this._selected=0,this._expanded=!1}updated(t){t.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._subscribeForecast()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=null,this._hourly=[],this._hourlyByDay=new Map;const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});if(e.catch(()=>{}),this._fcUnsubs=[e],!1!==this.config.show_hourly){const e=this.hass.connection.subscribeMessage(t=>{this._hourly=t?.forecast||[];const e=new Map;for(const t of this._hourly){const i=this._dayKey(t.datetime);if(!i)continue;const s=e.get(i)||[];s.length<24&&s.push(t),e.set(i,s)}this._hourlyByDay=e},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:t});e.catch(()=>{}),this._fcUnsubs.push(e)}}_unsubForecast(){for(const t of this._fcUnsubs||[])t.then(t=>t&&t()).catch(()=>{});this._fcUnsubs=null,this._fcEntity=void 0}_dayKey(t){const e=this.hass?.config?.time_zone;if(!this._dayFmt||this._dayFmtTz!==e){this._dayFmtTz=e;try{this._dayFmt=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"})}catch{this._dayFmt=new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"2-digit",day:"2-digit"})}}const i=new Date(t);return Number.isNaN(i.getTime())?"":this._dayFmt.format(i)}_hoursFor(t){return t?.datetime&&this._hourlyByDay?.size&&this._hourlyByDay.get(this._dayKey(t.datetime))||[]}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}_dayLabel(t,e){const i=new Date(t);if(Number.isNaN(i.getTime()))return"";const s=new Date;if(0===e&&this._dayKey(t)===this._dayKey(s))return this.config.today_label??"Today";const o=this.hass?.locale?.language||navigator.language||"en";return i.toLocaleDateString(o,{weekday:"short"})}_onPointerDown(t){if("mouse"!==t.pointerType)return;const e=t.currentTarget;this._dragStartX=t.clientX,this._dragStartScroll=e.scrollLeft,this._didDrag=!1,this._dragPointerId=t.pointerId}_onPointerMove(t){if(null==this._dragStartX)return;const e=t.clientX-this._dragStartX;!this._didDrag&&Math.abs(e)>4&&(this._didDrag=!0,t.currentTarget.setPointerCapture(this._dragPointerId)),this._didDrag&&(t.currentTarget.scrollLeft=this._dragStartScroll-e)}_onPointerUp(t){null!=this._dragStartX&&(t.currentTarget.releasePointerCapture?.(t.pointerId),this._dragStartX=null,setTimeout(()=>{this._didDrag=!1},0))}_select(t,e){this._didDrag||(this._expanded=t!==this._selected||!this._expanded,this._selected=t,this.dispatchEvent(new CustomEvent("materia-forecast-day-selected",{detail:{index:t,day:e},bubbles:!0,composed:!0})))}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=(this._forecast?.length?this._forecast:t?.attributes?.forecast||[]).slice(0,this.config.days??10);if(!i.length)return I``;const s=!1!==this.config.show_precipitation,o=this.config.min_precipitation??10,n=i[this._selected],a=!1!==this.config.show_hourly&&this._expanded&&n?this._hoursFor(n):[],r=this._expanded&&a.length>0,l=this.hass?.locale?.language||navigator.language||"en";return I`
      <ha-card>
        <div
          class="row ${e?"unavailable":""}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${i.map((t,e)=>{const i=this._num(t.temperature),n=this._num(t.templow),a=this._num(t.precipitation_probability),r=e===this._selected,l=!1!==this.config.show_hourly&&this._hoursFor(t).length>0;return I`
              <button
                class="pill ${r?"selected":""} ${l?"":"static"}"
                @click=${l?()=>this._select(e,t):void 0}
              >
                <span class="hi">${null!=i?`${i}°`:"—"}</span>
                <span class="lo">${null!=n?`${n}°`:"—"}</span>
                <svg class="glyph" viewBox="0 0 24 24">${we(t.condition,ce(this.hass,this.config.moon_entity))}</svg>
                ${s&&null!=a&&a>=o?I`<span class="precip">${a}%</span>`:I`<span class="precip empty"></span>`}
                <span class="day">${this._dayLabel(t.datetime,e)}</span>
              </button>
            `})}
        </div>
        <div class="detail ${r?"open":""}">
          <div class="detail-inner">
            <div
              class="hours"
              @pointerdown=${this._onPointerDown}
              @pointermove=${this._onPointerMove}
              @pointerup=${this._onPointerUp}
              @pointercancel=${this._onPointerUp}
            >
              ${r?Me(a,{locale:l,showPrecip:s,minPrecip:o,moonPhase:ce(this.hass,this.config.moon_entity)}):""}
            </div>
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-daily",Oe),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-daily",name:"Materia Forecast Daily",description:"Pixel-style daily forecast pill row with colored glyphs and precipitation chance.",preview:!0});customElements.define("materia-forecast-hourly-editor",class extends qt{_formData(){return{hours:24,show_header:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"name",label:"Header title",selector:{text:{}}},{name:"show_header",label:"Show header",selector:{boolean:{}}},{name:"hours",label:"Hours shown",selector:{number:{min:6,max:48,step:1,mode:"slider"}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}}]}]}});class De extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0}};static styles=Fe;static getConfigElement(){return document.createElement("materia-forecast-hourly-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_onPointerDown(t){if("mouse"!==t.pointerType)return;const e=t.currentTarget;this._dragStartX=t.clientX,this._dragStartScroll=e.scrollLeft,this._captured=!1,this._dragPointerId=t.pointerId}_onPointerMove(t){if(null==this._dragStartX)return;const e=t.clientX-this._dragStartX;!this._captured&&Math.abs(e)>4&&(this._captured=!0,t.currentTarget.setPointerCapture(this._dragPointerId)),this._captured&&(t.currentTarget.scrollLeft=this._dragStartScroll-e)}_onPointerUp(t){null!=this._dragStartX&&(t.currentTarget.releasePointerCapture?.(t.pointerId),this._dragStartX=null)}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=(this._forecast||[]).slice(0,this.config.hours??24);if(!i.length)return I``;const s=this.hass?.locale?.language||navigator.language||"en";return I`
      <ha-card class="${e?"unavailable":""}">
        ${!1!==this.config.show_header?I`<div class="header">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
              <span>${this.config.name??"Hourly forecast"}</span>
            </div>`:""}
        <div
          class="hours"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${Me(i,{locale:s,showPrecip:!1!==this.config.show_precipitation,minPrecip:this.config.min_precipitation??10,moonPhase:ce(this.hass,this.config.moon_entity)})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-hourly",De),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-hourly",name:"Materia Forecast Hourly",description:"Pixel-style hourly forecast strip with colored glyphs and precipitation chance.",preview:!0});const Pe=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Anchor for the tiles' own container-relative sizing (border-radius,
         padding) — without it those cqi units resolve unpredictably. */
      container-type: inline-size;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: clamp(12px, 6cqi, 15px);
      font-weight: 600;
      opacity: 0.92;
    }

    .header ha-icon {
      --mdc-icon-size: clamp(14px, 7cqi, 18px);
    }

    /* ---- Shape tiles (uv / visibility / pressure) ---- */
    .shape-tile {
      container-type: inline-size;
      position: relative;
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      max-width: var(--wm-size, 200px);
      margin-inline: auto;
      width: 100%;
    }

    .shape {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .shape-fill,
    .shape-fill-c {
      fill: var(--wm-color, var(--ha-card-background, var(--card-background-color)));
    }

    /* Visibility: unlike UV/pressure (whose dots/gauge carry the color), this
       tile has no other colored element, so it needs an inner fill of its
       own by default rather than reading flat/matching the background. Same
       theme-safe wash the wind blob uses (on-surface mixed into a container
       tone — guaranteed contrast step in both light and dark). */
    .visibility-fill {
      fill: var(--wm-color, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 12%, var(--md-sys-color-secondary-container, var(--ha-card-background))));
    }

    .overlay {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1cqi;
      color: var(--wm-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      text-align: center;
    }

    .big {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(28px, 24cqi, 52px);
      font-weight: 700;
      /* 1.05 clipped the tops of tall digits (e.g. "6") on this bold display
         font — the line box computed from font-size × line-height came in
         shorter than the glyph's actual ink extent. Padding is the belt to
         line-height's suspenders: it guarantees headroom regardless of how
         the browser computes this variable font's line box. */
      line-height: 1.3;
      padding-top: 0.08em;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }

    .big.small-big {
      font-size: clamp(22px, 15cqi, 38px);
    }

    .big .unit {
      font-size: 0.42em;
      font-weight: 600;
      opacity: 0.85;
    }

    .sub {
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
      opacity: 0.85;
    }

    .gauge-track {
      fill: none;
      stroke: color-mix(in srgb, currentColor 14%, transparent);
      stroke-width: 7;
      stroke-linecap: round;
      color: var(--wm-color-on, var(--md-sys-color-on-surface));
    }

    .gauge-fill {
      fill: none;
      stroke: var(--wm-accent, var(--md-sys-color-primary));
      stroke-width: 7;
      stroke-linecap: round;
      transition: d var(--md-sys-motion-default-effects);
    }

    /* Pressure ring: thinner and inset from the circle edge (Pixel style). */
    .gauge-track.thin,
    .gauge-fill.thin {
      stroke-width: 4.5;
    }

    .gauge-fill.green {
      stroke: var(--wm-accent, #7bc96a);
    }

    /* ---- Rect tiles (wind / aqi / precipitation / humidity / sun / pollen) ---- */
    .rect-tile {
      container-type: inline-size;
      position: relative;
      background: var(--wm-color, var(--ha-card-background, var(--card-background-color)));
      border-radius: 28px;
      padding: clamp(12px, 7cqi, 20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(6px, 4cqi, 14px);
      color: var(--wm-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      aspect-ratio: 1;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      max-width: var(--wm-size, 200px);
      margin-inline: auto;
      width: 100%;
    }

    .rect-tile.clip {
      overflow: hidden;
    }

    .rect-tile.pollen {
      aspect-ratio: auto;
      /* Rounded stadium, CAPPED — a full pill's corner circle swallowed the
         outer gauges on narrow cards no matter the padding. 36–64px keeps the
         soft look with corners that never reach the content. */
      border-radius: clamp(36px, 9cqi, 64px);
      padding: clamp(14px, 4cqi, 20px) clamp(22px, 7cqi, 40px) clamp(22px, 6cqi, 30px);
      max-width: calc(var(--wm-size, 200px) * 2 + 16px);
      gap: clamp(4px, 2cqi, 10px);
    }

    .sub.hint {
      opacity: 0.6;
      max-width: 85%;
      line-height: 1.4;
    }

    /* Generic left-aligned tile (AQI, humidity) — visually differentiates
       from the centered shape tiles (UV, pressure, visibility). */
    .rect-tile.left {
      align-items: flex-start;
      text-align: left;
      justify-content: space-between;
    }

    .rect-tile.left .header {
      justify-content: flex-start;
    }

    /* Precipitation: left-aligned value/subtitle, rainy glyph bottom-right. */
    .rect-tile.precip {
      align-items: flex-start;
      text-align: left;
      justify-content: space-between;
    }

    .rect-tile.precip .header {
      justify-content: flex-start;
    }

    .precip-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .precip-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .precip-glyph {
      width: clamp(38px, 16cqi, 54px);
      height: clamp(38px, 16cqi, 54px);
      flex-shrink: 0;
    }

    /* Wind: a ROUND card with the expressive triangle blob tinted inside. */
    .rect-tile.wind {
      border-radius: 50%;
    }

    .blob-bg {
      position: absolute;
      inset: 7%;
      width: 86%;
      height: 86%;
    }

    .blob-fill {
      /* on-surface is near-black in light themes and near-white in dark ones,
         so mixing 15% of it into the container is a guaranteed lightness step
         in BOTH modes — no dependence on optional roles or light-dark()
         support. Override per-card with shape_color. */
      fill: var(--wm-shape, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 15%, var(--md-sys-color-secondary-container, var(--ha-card-background, #e8e8f0))));
    }

    .rect-tile.wind .overlay {
      color: var(--wm-color-on, var(--md-sys-color-on-secondary-container, var(--md-sys-color-on-surface)));
    }

    .rect-tile .overlay {
      position: relative;
    }

    /* AQI bar — full width now that the tile is left-aligned (matches the
       reference layout: value left, bar spans edge to edge below it). */
    .aqi-bar {
      position: relative;
      display: flex;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      overflow: visible;
      gap: 1px;
    }

    .aqi-bar span {
      flex: 1;
      height: 100%;
    }

    .aqi-bar span:first-child {
      border-radius: 3px 0 0 3px;
    }

    .aqi-bar span:last-child {
      border-radius: 0 3px 3px 0;
    }

    .aqi-dot {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--wm-color, var(--ha-card-background));
      border: 3px solid;
      box-sizing: border-box;
    }

    /* Humidity wave — the SVG is two tile-widths of repeating wave; drifting
       it left by exactly half its width (a whole number of periods) loops
       seamlessly. Slow and linear so it reads as water, not a marquee. */
    .wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      animation: wave-drift 14s linear infinite;
    }

    @keyframes wave-drift {
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .wave {
        animation: none;
      }
    }

    .wave-fill {
      fill: color-mix(in srgb, var(--md-sys-cust-color-weather-rain, #5fa8f5) 28%, transparent);
    }

    .dew {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
    }

    /* Guaranteed-contrast pair (same trick as the wind blob): the chip's own
       background/text no longer depend on the ambient --wm-color-on, which
       was reading too close to the wave-fill behind it in some themes. */
    .dew-chip {
      display: inline-grid;
      place-items: center;
      min-width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--md-sys-color-secondary-container, #5fa8f5);
      color: var(--md-sys-color-on-secondary-container, #000);
      font-weight: 700;
      font-size: 13px;
    }

    /* Sun arc — an in-flow band between header and times, so the fill stays
       behind the hump only and the times sit on the plain card background. */
    .rect-tile.sun {
      justify-content: center;
      gap: clamp(6px, 3cqi, 10px);
    }

    .sun-arc {
      /* Wide and FLAT (viewBox 100×38) — fills the card without pushing the
         square tile taller. overflow visible: near sunrise/sunset the sun
         cookie's radius extends past the viewBox edge and would clip. */
      width: 94%;
      height: auto;
      display: block;
      overflow: visible;
    }

    .arc-fill {
      fill: color-mix(in srgb, var(--md-sys-cust-color-weather-sun, #ffc83d) 26%, transparent);
    }

    .horizon {
      stroke: color-mix(in srgb, currentColor 25%, transparent);
      stroke-width: 0.8;
    }

    /* Night troughs + the phased moon marker. */
    .arc-night {
      fill: color-mix(in srgb, var(--md-sys-cust-color-weather-rain, #5fa8f5) 18%, transparent);
    }

    .moon-dark {
      fill: color-mix(in srgb, currentColor 22%, transparent);
    }

    .moon-lit {
      fill: color-mix(in srgb, currentColor 85%, transparent);
    }

    .moon-row ha-icon {
      opacity: 0.8;
    }

    .sun-times {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      font-size: clamp(12px, 5cqi, 15px);
      font-weight: 600;
    }

    .sun-times div {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .sun-times ha-icon {
      --mdc-icon-size: 17px;
    }

    /* Pollen gauges — always a single row; the card sorts by severity and
       shows only the top max_shown species. */
    .gauges {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      width: 100%;
      gap: 8px;
      min-width: 0;
    }

    .gauge {
      position: relative;
      width: clamp(72px, 26cqi, 110px);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* viewBox is 100×86 — the 270° arc leaves the bottom band empty, so the
       svg is trimmed to keep the level label snug under the gauge. */
    .gauge svg {
      width: 100%;
      aspect-ratio: 100 / 86;
    }

    /* Pixel layout: ONLY the icon lives inside the ring; species + level sit
       below the gauge. Text never shares space with the ring, so nothing can
       clip or collide at any card width. */
    .gauge-center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      aspect-ratio: 100 / 86;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gauge-center ha-icon {
      --mdc-icon-size: clamp(20px, 9cqi, 28px);
    }

    .gauge-sub {
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: clamp(11px, 4.2cqi, 13px);
      font-weight: 500;
      opacity: 0.85;
      text-align: center;
      line-height: 1.35;
      margin-top: 4px;
      padding-bottom: 2px;
    }

    .gauge-name {
      font-weight: 600;
      font-size: clamp(12px, 4.6cqi, 14px);
      opacity: 1;
    }

    /* Pollen small variant: left-aligned dot + species + level list. */
    .rect-tile.pollen-small {
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      gap: clamp(10px, 6cqi, 18px);
    }

    .rect-tile.pollen-small .header {
      justify-content: flex-start;
    }

    .pollen-rows {
      display: flex;
      flex-direction: column;
      gap: clamp(8px, 4cqi, 14px);
    }

    .pollen-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pollen-dot {
      width: clamp(18px, 9cqi, 26px);
      height: clamp(18px, 9cqi, 26px);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .pollen-text {
      display: flex;
      flex-direction: column;
      line-height: 1.25;
    }

    .pollen-name {
      font-size: clamp(14px, 6.5cqi, 18px);
      font-weight: 600;
    }

    .pollen-level {
      font-size: clamp(12px, 5.5cqi, 15px);
      opacity: 0.7;
    }
  `],Ue=[{value:"wind",label:"Wind"},{value:"uv",label:"UV index"},{value:"aqi",label:"Air quality"},{value:"pollen",label:"Pollen"},{value:"precipitation",label:"Precipitation"},{value:"sun",label:"Sunrise & sunset"},{value:"visibility",label:"Visibility"},{value:"humidity",label:"Humidity"},{value:"pressure",label:"Pressure"}];customElements.define("materia-weather-metric-editor",class extends qt{_formData(){return{metric:"wind",...this._config}}_sectionsSignature(){return this._config?.metric||""}get _sections(){const t=this._config?.metric,e={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"metric",required:!0,selector:{select:{mode:"dropdown",options:Ue}}},..."sun"!==t&&"pollen"!==t?[{name:"entity",label:"Weather entity",selector:{entity:{domain:"weather"}}},{name:"sensor",label:"Sensor override (optional)",selector:{entity:{domain:"sensor"}}}]:[],{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon (overrides default)",selector:{icon:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"wind"===t&&i.fields.push({name:"unit",label:"Unit (converts from the source)",selector:{select:{mode:"dropdown",options:[{value:"km/h",label:"km/h"},{value:"m/s",label:"m/s"},{value:"mph",label:"mph"},{value:"kn",label:"knots"},{value:"bft",label:"Beaufort"}]}}},{name:"bearing_entity",label:"Bearing sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"from_label",label:'"From" label',selector:{text:{}}}),"humidity"===t&&i.fields.push({name:"dew_entity",label:"Dew point sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"dew_label",label:"Dew point label",selector:{text:{}}}),"pressure"===t&&i.fields.push({name:"min",label:"Gauge min",selector:{number:{mode:"box"}}},{name:"max",label:"Gauge max",selector:{number:{mode:"box"}}}),"precipitation"===t&&i.fields.push({name:"total_label",label:"Subtitle when raining",selector:{text:{}}},{name:"none_label",label:'"None expected" label',selector:{text:{}}}),"sun"===t&&i.fields.push({name:"sun_entity",label:"Sun entity",selector:{entity:{domain:"sun"}}},{name:"moon_entity",label:"Moon phase sensor (built-in Moon integration)",selector:{entity:{domain:"sensor"}}}),"pollen"===t&&i.fields.push({name:"entities",label:"Pollen sensors",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"variant",label:"Variant",selector:{select:{mode:"dropdown",options:[{value:"gauges",label:"Gauges (wide)"},{value:"small",label:"Small (dot list)"}]}}},{name:"max_shown",label:"Max species shown (worst first)",selector:{number:{min:1,max:6,step:1,mode:"slider"}}},{name:"hide_inactive",label:"Hide species at 'none'",selector:{boolean:{}}},{name:"max",label:"Scale max for numeric sensors (default 4)",selector:{number:{min:1,max:10,mode:"box"}}});const s={title:"Appearance",icon:"mdi:palette-outline",fields:[..."wind"===t?[{name:"shape_color",label:"Shape color",color:!0,template:!0,selector:{text:{}}}]:[],{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},o={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[e,i,s,o]:[e,s,o]}});const qe="var(--md-sys-cust-color-scale-green, #5E9E50)",Re="var(--md-sys-cust-color-scale-yellow, #C7A128)",je="var(--md-sys-cust-color-scale-orange, #D9713C)",Ne="var(--md-sys-cust-color-scale-red, #C94D42)",Le="var(--md-sys-cust-color-scale-purple, #8A4DA3)",Be=[{max:2,label:"Low",color:qe},{max:5,label:"Moderate",color:Re},{max:7,label:"High",color:je},{max:10,label:"Very high",color:Ne},{max:1/0,label:"Extreme",color:Le}],Ie=[{max:50,label:"Good air quality",color:qe},{max:100,label:"Moderate air quality",color:Re},{max:150,label:"Unhealthy for sensitive groups",color:je},{max:200,label:"Unhealthy air quality",color:Ne},{max:300,label:"Very unhealthy air quality",color:Le},{max:1/0,label:"Hazardous air quality",color:"var(--md-sys-cust-color-scale-maroon, #7A4040)"}],He=["None","Low","Moderate","High","Very high"];class We extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=Pe;static getConfigElement(){return document.createElement("materia-weather-metric-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e,metric:"wind"}}setConfig(t){if(!t.metric)throw new Error("metric is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),"precipitation"!==this.config.metric||this.config.sensor?this._unsubForecast():this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){"precipitation"!==this.config?.metric||this.config.sensor||this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_numRaw(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}_value(t){if(this.config.sensor){const t=this.hass.states[this.config.sensor];return t&&!this._isUnavailable(t)?this._numRaw(t.state):null}const e=this.hass.states[this.config.entity];return this._numRaw(e?.attributes?.[t])}_weatherAttr(t){return this.hass.states[this.config.entity]?.attributes?.[t]}_scallopWave(t){const e=200/12;let i=`M0 ${t+3.2} `;for(let s=0;s<200;s+=e)i+=`Q ${s+e/2} ${t-3.2} ${s+e} ${t+3.2} `;return i+"V100 H0 Z"}render(){if(!this.hass||!this.config)return I``;const t={wind:()=>this._wind(),uv:()=>this._uv(),aqi:()=>this._aqi(),pollen:()=>this._pollen(),precipitation:()=>this._precipitation(),sun:()=>this._sun(),visibility:()=>this._visibility(),humidity:()=>this._humidity(),pressure:()=>this._pressure()}[this.config.metric];if(!t)return I``;const e=t();if(e===V)return I``;const i=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,s=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,o=null!=this.config.size?Math.min(10,Math.max(1,this.config.size)):null;return I`
      <ha-card
        style="--wm-size:${null!=o?["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][o-1]:"200px"};${i?`--wm-color:${i};`:""}${s?`--wm-color-on:${s};`:""}${this.config.shape_color?`--wm-shape:${this.config.shape_color};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||(this.config.sensor||this.config.entity?{action:"more-info",entity:this.config.sensor||this.config.entity}:void 0))}
      >
        ${e}
      </ha-card>
    `}_header(t,e){return I`<div class="header"><ha-icon icon=${this.config.icon||t}></ha-icon><span>${e}</span></div>`}_hint(t,e,i){return I`
      <div class="rect-tile">
        ${this._header(t,e)}
        <div class="sub hint">${i}</div>
      </div>
    `}_convertWind(t,e,i){const s={"km/h":1,"m/s":3.6,mph:1.609344,kn:1.852,knots:1.852,"ft/s":1.09728};if(!i||i===e)return{v:t,u:e};const o=t*(s[e]??1);if("bft"===i){let t=[1,5,11,19,28,38,49,61,74,88,102,117].findIndex(t=>o<t);return-1===t&&(t=12),{v:t,u:"Bft"}}return{v:o/(s[i]??1),u:i}}_wind(){const t=this._value("wind_speed");if(null==t)return V;const e=this.config.sensor?this.hass.states[this.config.sensor]?.attributes?.unit_of_measurement??"km/h":this._weatherAttr("wind_speed_unit")??"km/h",{v:i,u:s}=this._convertWind(t,e,this.config.unit);let o=this.config.bearing_entity?this._numRaw(this.hass.states[this.config.bearing_entity]?.state):this._numRaw(this._weatherAttr("wind_bearing"));const n=null!=o?`${this.config.from_label??"From"} ${a=o,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((a%360+360)%360/22.5)%16]}`:"";var a;const r=(null!=o?(o+180)%360:0)*Math.PI/180;return I`
      <div class="rect-tile clip wind">
        <svg class="blob-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${function(t,e,i,s=0){const o=Math.cos(s),n=Math.sin(s),a=ee([{x:.5,y:.892,r:.313},{x:-.216,y:1.05,r:.207},{x:.499,y:-.16,r:.215},{x:1.225,y:1.06,r:.211}].map(t=>({x:t.x*o-t.y*n,y:t.x*n+t.y*o,r:t.r}))),r=[];for(const t of a){const e=Math.atan2(t.T1[1]-t.C[1],t.T1[0]-t.C[0]);let i=Math.atan2(t.T2[1]-t.C[1],t.T2[0]-t.C[0])-e;if(1===t.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=16;s++){const o=e+i*s/16;r.push([t.C[0]+t.rEff*Math.cos(o),t.C[1]+t.rEff*Math.sin(o)])}}let l=0,c=0,d=0;for(let t=0;t<r.length;t++){const[e,i]=r[t],[s,o]=r[(t+1)%r.length],n=e*o-s*i;l+=n,c+=(e+s)*n,d+=(i+o)*n}l/=2,c/=6*l,d/=6*l;const h=Math.max(...r.map(([t,e])=>Math.hypot(t-c,e-d))),p=i/h,u=i=>[t+(i[0]-c)*p,e+(i[1]-d)*p];return ie(a.map(t=>({T1:u(t.T1),T2:u(t.T2),C:u(t.C),rEff:t.rEff*p,sweep:t.sweep})))}(50,50,36,r)} class="blob-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:weather-windy",this.config.name??"Wind")}
          <div class="big">${Math.round(i)}<span class="unit"> ${s}</span></div>
          ${n?I`<div class="sub">${n}</div>`:""}
        </div>
      </div>
    `}_uv(){const t=this._value("uv_index");if(null==t)return V;const e=Be.find(e=>t<=e.max),i=Be.map((t,i)=>{const s=(160-35*i)*Math.PI/180,o=50+33*Math.cos(s),n=52+33*Math.sin(s),a=t===e;return H`<circle cx=${o} cy=${n} r=${a?4.5:2.6}
        fill=${t.color} opacity=${a?1:.3} />`});return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${Jt(50,52,45,12)} class="shape-fill" />
          ${i}
        </svg>
        <div class="overlay">
          ${this._header("mdi:white-balance-sunny",this.config.name??"UV index")}
          <div class="big">${Math.round(t)}</div>
          <div class="sub">${e.label}</div>
        </div>
      </div>
    `}_visibility(){const t=this._value("visibility");if(null==t)return this.config.sensor?V:this._hint("mdi:eye-outline",this.config.name??"Visibility","Weather entity has no visibility — add a sensor");const e=this.config.unit??this._weatherAttr("visibility_unit")??"km";return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${Jt(50,52,32,12)} class="shape-fill visibility-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:eye-outline",this.config.name??"Visibility")}
          <div class="big">${t}<span class="unit"> ${e}</span></div>
        </div>
      </div>
    `}_pressure(){const t=this._value("pressure");if(null==t)return V;const e=this.config.unit??this._weatherAttr("pressure_unit")??"hPa",i=this.config.min??("hPa"===e?950:28),s=this.config.max??("hPa"===e?1050:31),o=Math.min(1,Math.max(0,(t-i)/(s-i))),n=270*o-135,a=this.hass?.locale?.language||navigator.language||"en",r="hPa"===e?Math.round(t).toLocaleString(a):t;return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${re(50,52,37.5,-135,135)} class="gauge-track thin" />
          ${o>.01?H`<path d=${re(50,52,37.5,-135,n)} class="gauge-fill thin" />`:""}
        </svg>
        <div class="overlay">
          ${this._header("mdi:gauge",this.config.name??"Pressure")}
          <div class="big small-big">${r}</div>
          <div class="sub">${e}</div>
        </div>
      </div>
    `}_aqi(){const t=this._value("air_quality_index");if(null==t)return this.config.sensor?V:this._hint("mdi:waves",this.config.name??"Air quality","Point this tile at an AQI sensor");const e=Ie.find(e=>t<=e.max),i=Math.min(.96,Math.max(.04,t/300));return I`
      <div class="rect-tile left">
        ${this._header("mdi:waves",this.config.name??"Air quality")}
        <div class="big">${Math.round(t)}</div>
        <div class="aqi-bar">
          ${Ie.slice(0,5).map(t=>I`<span style="background:${t.color}"></span>`)}
          <span style="background:${Ie[5].color}"></span>
          <i class="aqi-dot" style="left:${(100*i).toFixed(1)}%; border-color:${e.color}"></i>
        </div>
        <div class="sub">${e.label}</div>
      </div>
    `}_precipitation(){let t=null;if(this.config.sensor)t=this._value();else{const e=this._forecast?.[0];t=this._numRaw(e?.precipitation)}if(null==t)return V;const e=this.config.unit??this._weatherAttr("precipitation_unit")??"mm",i=this.config.none_label??"No precipitation expected",s=t>0?this.config.total_label??"Total rain for the day":i;return I`
      <div class="rect-tile precip">
        ${this._header("m3o:rainy",this.config.name??"Precipitation")}
        <div class="big">${t}<span class="unit"> ${e}</span></div>
        <div class="precip-bottom">
          <div class="sub">${s}</div>
          ${t>0?H`<svg class="precip-glyph" viewBox="0 0 24 24">${we("rainy")}</svg>`:""}
        </div>
      </div>
    `}_humidity(){const t=this._value("humidity");if(null==t)return this.config.sensor?V:this._hint("mdi:water-percent",this.config.name??"Humidity","Weather entity has no humidity — add a sensor");const e=this.config.dew_entity?this._numRaw(this.hass.states[this.config.dew_entity]?.state):this._numRaw(this._weatherAttr("dew_point")),i=100-78*Math.min(1,Math.max(0,t/100)),s=this._scallopWave(i);return I`
      <div class="rect-tile left clip">
        <svg class="wave" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d=${s} class="wave-fill" />
        </svg>
        ${this._header("mdi:water-percent",this.config.name??"Humidity")}
        <div class="big">${Math.round(t)}<span class="unit">%</span></div>
        ${null!=e?I`<div class="dew"><span class="dew-chip">${Math.round(e)}°</span> ${this.config.dew_label??"Dew point"}</div>`:""}
      </div>
    `}_sun(){const t=this.hass.states[this.config.sun_entity??"sun.sun"];if(!t)return V;const e=t.attributes?.next_rising,i=t.attributes?.next_setting;if(!e||!i)return V;const s=this.hass?.locale?.language||navigator.language||"en",o=t=>new Date(t).toLocaleTimeString(s,{hour:"numeric",minute:"2-digit"}),n=t=>t.getHours()+t.getMinutes()/60,a=n(new Date(e)),r=n(new Date(i)),l=n(new Date),c=(r-a+24)%24||12,d=24-c,h=24,p=t=>t/24*100,u=t=>{const e=(t-a+24)%24;return e<=c?h-17*Math.sin(Math.PI*e/c):h+9*Math.sin(Math.PI*(e-c)/d)},m=(t,e)=>{const i=[];for(let s=t;s<e;s+=.25)i.push(`${p(s).toFixed(2)} ${u(s).toFixed(2)}`);return i.push(`${p(e).toFixed(2)} ${u(e).toFixed(2)}`),i.join(" L")},g=`M${p(a).toFixed(2)} 24 L${m(a,r)} Z`,f=a>.01?`M0 24 L${m(0,a)} Z`:"",_=r<23.99?`M${p(r).toFixed(2)} 24 L${m(r,24)} L100 24 Z`:"",b=(l-a+24)%24<=c,v=p(l),y=u(l),x=this.config.moon_entity??(this.hass.states["sensor.moon_phase"]?"sensor.moon_phase":"sensor.moon"),w=this.hass.states[x],$=ce(this.hass,this.config.moon_entity),k=$??.5;return I`
      <div class="rect-tile sun">
        ${this._header("mdi:weather-sunset",this.config.name??"Sunrise & sunset")}
        <svg class="sun-arc cycle" viewBox="0 0 100 40">
          <path d=${g} class="arc-fill" />
          ${f?H`<path d=${f} class="arc-night" />`:""}
          ${_?H`<path d=${_} class="arc-night" />`:""}
          <line x1="0" y1=${h} x2="100" y2=${h} class="horizon" />
          ${b?H`<path d=${function(t,e,i,s=12,o=.1*i,n=0){const a=Math.max(8*s,48),r=[];for(let l=0;l<a;l++){const c=l/a*Math.PI*2,d=i+o*Math.cos(s*c+n);r.push([t+d*Math.cos(c),e+d*Math.sin(c)])}let l=`M${r[0][0].toFixed(2)} ${r[0][1].toFixed(2)} `;for(let t=0;t<a;t++){const e=r[(t-1+a)%a],i=r[t],s=r[(t+1)%a],o=r[(t+2)%a],n=i[0]+(s[0]-e[0])/6,c=i[1]+(s[1]-e[1])/6,d=s[0]-(o[0]-i[0])/6,h=s[1]-(o[1]-i[1])/6;l+=`C${n.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} `}return l+"Z"}(v,y,5.5,9,.6)} fill="var(--md-sys-cust-color-weather-sun, #FFC83D)" />`:H`
                <circle cx=${v.toFixed(2)} cy=${y.toFixed(2)} r="4.6" class="moon-dark" />
                ${le(v,y,4.6,k)?H`<path d=${le(v,y,4.6,k)} class="moon-lit" />`:""}
              `}
        </svg>
        <div class="sun-times">
          <div><ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${o(e)}</div>
          <div><ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${o(i)}</div>
          ${w&&null!=$?I`<div class="moon-row"><ha-icon icon=${w.attributes?.icon||`mdi:moon-${String(w.state).replace(/_/g,"-").replace("-moon","")}`}></ha-icon> ${this.hass.formatEntityState?.(w)??w.state}</div>`:""}
        </div>
      </div>
    `}_pollen(){const t={none:{v:0,label:"None",color:"var(--md-sys-color-outline, #9E9E9E)"},active:{v:1,label:"Active",color:qe},green:{v:1,label:"Low",color:qe},yellow:{v:2,label:"Moderate",color:Re},orange:{v:3,label:"High",color:je},red:{v:4,label:"Very high",color:Ne},purple:{v:5,label:"Extreme",color:Le}},e=this.config.max??4;let i=this.config.entities;i?.length||(i=[this.config.grass_entity&&{entity:this.config.grass_entity,label:this.config.grass_label??"Grass",icon:"mdi:grass"},this.config.tree_entity&&{entity:this.config.tree_entity,label:this.config.tree_label??"Tree",icon:"mdi:tree-outline"},this.config.weed_entity&&{entity:this.config.weed_entity,label:this.config.weed_label??"Weed",icon:"mdi:sprout-outline"}].filter(Boolean));const s=(i||[]).map(i=>{const s="string"==typeof i?{entity:i}:i,o=this.hass.states[s.entity];if(!o||this._isUnavailable(o))return null;const n=String(o.state).toLowerCase();let a,r,l;if(n in t){const e=t[n];a=e.v/5,r=e.label,l=e.color}else{const t=this._numRaw(n);if(null==t)return null;a=Math.min(1,Math.max(0,t/e)),r=`${t}/${e} ${He[Math.min(He.length-1,Math.round(a*(He.length-1)))]}`,l=null}let c=s.label;if(!c){const t=o.attributes.friendly_name||s.entity,e=t.replace(/pollen/i,"").trim().split(/\s+/);c=e[e.length-1]||t}return{label:c,icon:s.icon||o.attributes.icon||"m3of:allergy",frac:a,levelLabel:r,color:l}}).filter(Boolean).filter(t=>!this.config.hide_inactive||t.frac>0).sort((t,e)=>e.frac-t.frac).slice(0,this.config.max_shown??4);if(!s.length){return this.config.entities?.length||this.config.grass_entity||this.config.tree_entity||this.config.weed_entity?V:this._hint("m3of:allergy",this.config.name??"Pollen","Add pollen sensors")}return"small"===this.config.variant?I`
        <div class="rect-tile pollen-small">
          ${this._header("m3of:allergy",this.config.name??"Pollen")}
          <div class="pollen-rows">
            ${s.map(t=>I`
              <div class="pollen-row">
                <span class="pollen-dot" style="background:${t.color||"var(--wm-accent, #7bc96a)"}"></span>
                <div class="pollen-text">
                  <span class="pollen-name">${t.label}</span>
                  <span class="pollen-level">${t.levelLabel}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      `:I`
      <div class="rect-tile pollen">
        ${this._header("m3of:allergy",this.config.name??"Pollen")}
        <div class="gauges">
          ${s.map(t=>I`
              <div class="gauge">
                <svg viewBox="0 0 100 86">
                  <path d=${re(50,50,40,-135,135)} class="gauge-track" />
                  ${t.frac>.01?H`<path d=${re(50,50,40,-135,270*t.frac-135)} class="gauge-fill" style="stroke:${t.color||"var(--wm-accent, #7bc96a)"}" />`:""}
                </svg>
                <div class="gauge-center">
                  <ha-icon icon=${t.icon}></ha-icon>
                </div>
                <div class="gauge-sub">
                  <span class="gauge-name">${t.label}</span>
                  <span>${t.levelLabel}</span>
                </div>
              </div>
            `)}
        </div>
      </div>
    `}getGridOptions(){const t="pollen"===this.config?.metric&&"small"!==this.config?.variant;return{columns:t?8:4,rows:"auto",min_columns:t?6:3}}getCardSize(){return 3}}customElements.define("materia-weather-metric",We),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-metric",name:"Materia Weather Metric",description:"Expressive weather metric tiles: wind, UV, AQI, pollen, precipitation, sun, visibility, humidity, pressure.",preview:!0});const Ve=[kt,wt,$t,gt,n`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      display: block;
      height: 100%;
    }

    .glance {
      container-type: inline-size;
      width: 100%;
      height: 100%;
      min-height: 88px; /* same height as the materia-card family */
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: clamp(12px, 3.5cqi, 16px);
      background: var(--wg-bg, var(--ha-card-background, var(--card-background-color)));
      color: var(--wg-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
      border-radius: 28px; /* match the materia-card family, not a full pill */
      padding: clamp(12px, 3.5cqi, 15px) clamp(16px, 5cqi, 22px);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-default-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .glance:active {
      transform: scale(0.985);
    }

    .glyph {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }

    .mid {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .line1 {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .line1 ha-icon {
      --mdc-icon-size: 16px;
      flex-shrink: 0;
    }

    .line2 {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
      overflow: hidden;
    }

    .m {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .m ha-icon {
      --mdc-icon-size: 14px;
      opacity: 0.85;
    }

    .dot {
      opacity: 0.55;
    }

    /* Quieter numerals — the pill should sit at the same visual volume as
       the materia-card rows around it. */
    /* Big-but-medium: the numeral earns presence through SIZE alone — bold
       at this scale wins on too many contrast axes at once and shouts. */
    .now {
      font-family: var(--materia-font-display, inherit);
      font-size: 26px;
      font-weight: 500;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    /* Match the materia-card chevron exactly. */
    .chev {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      flex-shrink: 0;
      margin: 0 -4px 0 0;
    }
  `],Xe=[{value:"minmax",label:"High / low"},{value:"wind",label:"Wind"},{value:"humidity",label:"Humidity"},{value:"uv",label:"UV index"},{value:"precipitation",label:"Precipitation"},{value:"pressure",label:"Pressure"},{value:"pollen",label:"Pollen (worst species)"},{value:"aqi",label:"Air quality"}];class Ge extends qt{_formData(){return{metrics:["minmax"],...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"metrics",label:"Subtitle metrics (condition always owns the top line)",selector:{select:{multiple:!0,mode:"list",options:Xe}}},{name:"sort_by_severity",label:"Sort metrics worst-first",selector:{boolean:{}}},{name:"max_metrics",label:"Max metrics on the subtitle line",selector:{number:{min:1,max:8,step:1,mode:"box"}}},{name:"show_metric_icons",label:"Show metric icons",selector:{boolean:{}}},{name:"pollen_entities",label:"Pollen sensors (for the pollen metric)",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"aqi_entity",label:"AQI sensor (for the air-quality metric)",selector:{entity:{domain:"sensor"}}},{name:"alert",label:"Alert text / template (takes over top line)",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"navigate"}}}]}]}get _priority(){return this._config?.priority??["precipitation","pollen","aqi"]}_movePrio(t,e){const i=[...this._priority],[s]=i.splice(t,1);i.splice(e,0,s),this._commit({...this._config,priority:i})}_removePrio(t){const e=[...this._priority];e.splice(t,1),this._commit({...this._config,priority:e})}_renderExtra(){const t=this._priority,e=Xe.filter(e=>!t.includes(e.value));return I`
      <div class="prio-header">Tie-break priority (most important first)</div>
      ${Mt((t,e)=>this._movePrio(t,e),t.map((t,e)=>I`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${Xe.find(e=>e.value===t)?.label??t}</span>
            <ha-icon-button @click=${()=>this._removePrio(e)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `))}
      ${e.length?I`<ha-form
            .hass=${this.hass}
            .data=${{}}
            .schema=${[{name:"add",label:"Add metric to priority",selector:{select:{mode:"dropdown",options:e}}}]}
            .computeLabel=${At}
            @value-changed=${e=>{const i=e.detail.value?.add;i&&this._commit({...this._config,priority:[...t,i]})}}
          ></ha-form>`:""}
    `}}Ge.styles=[qt.styles,n`
    .prio-header {
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .prio-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 4px 2px 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 10px;
      margin-top: 6px;
      font-size: 13px;
    }
    .prio-row span {
      flex: 1;
    }
    .prio-row .drag-handle {
      cursor: grab;
      opacity: 0.6;
    }
  `],customElements.define("materia-weather-glance-editor",Ge);const Ye={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Ke extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedAlert:{state:!0}};static styles=Ve;static getConfigElement(){return document.createElement("materia-weather-glance-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e,metrics:["minmax"]}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={metrics:["minmax"],...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("alert","_resolvedAlert"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}_metricData(t,e){const i=e?.attributes||{},s=this._forecast?.[0]||i.forecast?.[0];let o=null,n=0;switch(t.type){case"condition":{const t=e?.state??"";o=Ye[t]||this._capitalize(String(t).replace(/-|_/g," ")),/lightning/.test(t)?n=3:/pouring|snowy|hail/.test(t)?n=2:/rainy|fog|windy/.test(t)&&(n=1);break}case"minmax":{const t=this._num(s?.temperature),e=this._num(s?.templow);if(null==t&&null==e)return null;o=`${null!=t?`${t}°`:"—"} ${null!=e?`${e}°`:"—"}`;break}case"wind":{const t=this._num(i.wind_speed);if(null==t)return null;const e=this._num(i.wind_bearing);o=`${t} ${i.wind_speed_unit??"km/h"}${null!=e?` ${a=e,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((a%360+360)%360/22.5)%16]}`:""}`,n=t>=88?4:t>=62?3:t>=39?2:t>=20?1:0;break}case"humidity":{const t=this._num(i.humidity);if(null==t)return null;o=`${t}%`,n=t>=85||t<=20?2:t>=70||t<=30?1:0;break}case"uv":{const t=this._num(i.uv_index);if(null==t)return null;o=`UV ${t}`,n=t>=11?4:t>=8?3:t>=6?2:t>=3?1:0;break}case"precipitation":{const e=s?.precipitation,a=null==e?null:Number(e);if(null==a||!Number.isFinite(a))return null;o=`${t.label??"Rain"} ${a} ${i.precipitation_unit??"mm"}`,n=a>=10?3:a>=2?2:a>0?1:0;break}case"pressure":{const t=this._num(i.pressure);if(null==t)return null;o=`${t} ${i.pressure_unit??"hPa"}`,n=Math.abs(t-1013)>=25?2:Math.abs(t-1013)>=15?1:0;break}case"pollen":{const e={none:0,active:1,green:1,yellow:2,orange:3,red:4,purple:5},i=["None","Low","Low","Moderate","High","Very high","Extreme"],s=t.entities||this.config.pollen_entities||[];let a=null;for(const t of s){const i=this.hass.states[t];if(!i||this._isUnavailable(i))continue;const s=e[String(i.state).toLowerCase()]??this._num(i.state)??0;if(!a||s>a.v){const e=i.attributes.friendly_name||t,o=e.replace(/pollen/i,"").trim().split(/\s+/);a={v:s,label:o[o.length-1]||e}}}if(!a)return null;const r=t.label??this.config.pollen_label??"Pollen";o=0===a.v?this.config.no_pollen_label??`${r} none`:`${r} ${a.label} ${i[a.v+1]??a.v}`,n=a.v;break}case"aqi":{const e=t.entity??this.config.aqi_entity,i=e?this.hass.states[e]:null;if(!i||this._isUnavailable(i))return null;const s=this._num(i.state);if(null==s)return null;o=`AQI ${s}`,n=s>200?4:s>150?3:s>100?2:s>50?1:0;break}case"sensor":{const e=t.entity?this.hass.states[t.entity]:null;if(!e||this._isUnavailable(e))return null;const i=t.unit??e.attributes.unit_of_measurement??"";o=`${t.label?`${t.label} `:""}${e.state}${i?` ${i}`:""}`;break}default:return null}var a;null!=t.severity&&(n=Number(t.severity)||0);return{text:o,sev:n,icon:t.icon??(this.config.show_metric_icons?{minmax:"mdi:thermometer",wind:"mdi:weather-windy",humidity:"mdi:water-percent",uv:"mdi:white-balance-sunny",precipitation:"m3o:rainy",pressure:"mdi:gauge",pollen:"m3of:allergy",aqi:"mdi:waves",sensor:"mdi:information-outline"}[t.type]:null),type:t.type}}_metricItems(t){const e=this.config.priority??["precipitation","pollen","aqi"],i=t=>{const i=e.indexOf(t);return-1===i?0:(e.length-i)/(e.length+1)},s=(this.config.metrics||[]).map(t=>"string"==typeof t?{type:t}:t).filter(t=>"condition"!==t.type),o=s.map(e=>this._metricData(e,t)).filter(Boolean);return this.config.sort_by_severity&&o.sort((t,e)=>e.sev+i(e.type)-(t.sev+i(t.type))),o}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"";let s=t?.attributes?.temperature;if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&!this._isUnavailable(t)&&(s=t.state)}const o=this._num(s),n=this._isTemplate(this.config.alert)?this._resolvedAlert:this.config.alert,a=n?null:this._metricData({type:"condition"},t),r=this.config.max_metrics??1/0,l=this._metricItems(t).slice(0,r),c=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,d=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,h=this.config.show_chevron??"navigate"===this.config.tap_action?.action,p=t=>I`<span class="m">
      ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}${t.text}
    </span>`;return I`
      <ha-card>
        <div
          class="glance ${e?"unavailable":""}"
          style="${c?`--wg-bg:${c};`:""}${d?`--wg-fg:${d};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <svg class="glyph" viewBox="0 0 24 24">${we(i,ce(this.hass,this.config.moon_entity))}</svg>
          <div class="mid">
            ${n||a?I`<div class="line1">
                  ${n?I`<ha-icon icon="mdi:alert-outline"></ha-icon>`:""}
                  ${n?I`<span>${n}</span>`:p(a)}
                </div>`:""}
            ${l.length?I`<div class="line2">
                  ${l.map((t,e)=>I`${e?I`<span class="dot">·</span>`:""}${p(t)}`)}
                </div>`:""}
          </div>
          <div class="now">${e||null==o?"—":`${o}°`}</div>
          ${h?I`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-weather-glance",Ke),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-glance",name:"Materia Weather Glance",description:"Weather pill for the home screen: glyph, configurable metric lines or an alert, big temperature.",preview:!0});const Ze=[kt,wt,$t,gt,n`
    ha-card {
      border-radius: 24px;
      padding: 16px 20px;
      /* haCardReset clears the background — restore the surface (obvious on
         dark themes, where the rows otherwise float on the view). */
      background: var(--ha-card-background, var(--card-background-color));
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 600;
      padding-bottom: 8px;
    }

    .header ha-icon {
      --mdc-icon-size: 18px;
    }

    .rows {
      display: flex;
      flex-direction: column;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 0;
      font-size: 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: 10px;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .row:hover {
      background: color-mix(in srgb, currentColor 5%, transparent);
    }

    .row-icon {
      --mdc-icon-size: 17px;
      opacity: 0.8;
      flex-shrink: 0;
    }

    .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      font-weight: 500;
      opacity: 0.85;
      flex-shrink: 0;
    }

    .row.unavailable .state {
      opacity: 0.45;
    }
  `];customElements.define("materia-list-editor",class extends qt{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"title",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon",selector:{icon:{}}},{name:"entities",label:"Entities (rows)",selector:{entity:{multiple:!0}}}]}]}});class Qe extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=Ze;static getConfigElement(){return document.createElement("materia-list-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("sensor."))||"";return{entities:e?[e]:[]}}setConfig(t){if(!t.entities?.length)throw new Error("Materia List: add at least one entity");this.config={...t}}_rowState(t,e){if(!e)return"—";if(t.attribute){const i=e.attributes?.[t.attribute];return null==i?"—":`${i}${t.unit?` ${t.unit}`:""}`}if(this._isUnavailable(e))return this.hass.formatEntityState?.(e)??e.state;if(t.unit){const i=Number(e.state);return Number.isFinite(i)?`${i} ${t.unit}`:e.state}return this.hass.formatEntityState?.(e)??e.state}render(){if(!this.hass||!this.config)return I``;const t=(this.config.entities||[]).map(t=>"string"==typeof t?{entity:t}:t);return I`
      <ha-card>
        ${this.config.title?I`<div class="header">
              ${this.config.icon?I`<ha-icon icon=${this.config.icon}></ha-icon>`:""}
              <span>${this.config.title}</span>
            </div>`:""}
        <div class="rows">
          ${t.map(t=>{const e=this.hass.states[t.entity],i=t.name||e?.attributes?.friendly_name||t.entity;return I`
              <div
                class="row ${e&&this._isUnavailable(e)?"unavailable":""}"
                @click=${()=>this._handleAction(t.tap_action||{action:"more-info",entity:t.entity})}
              >
                ${t.icon?I`<ha-icon class="row-icon" icon=${t.icon}></ha-icon>`:""}
                <span class="name">${i}</span>
                <span class="state">${this._rowState(t,e)}</span>
              </div>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 1+(this.config?.entities?.length||0)}}customElements.define("materia-list",Qe),window.customCards=window.customCards||[],window.customCards.push({type:"materia-list",name:"Materia List",description:"Entity rows with localized states — name left, value right, optional header.",preview:!0});const Je=[kt,wt,$t,gt,n`
    /* Expressive M3: state is a container TONE, no strokes. */
    ha-card.row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        opacity var(--md-sys-motion-fast-effects);
    }

    ha-card.row.on {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, var(--ha-card-background, var(--card-background-color)));
    }

    ha-card.row.off {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 3%, var(--ha-card-background, var(--card-background-color)));
      opacity: 0.75;
    }

    /* A colored row (template escalation, e.g. calling for heat) pops its
       radius a notch, like the ladder's calling state did. */
    ha-card.row.colored {
      border-radius: 20px;
      opacity: 1;
    }

    /* Nested inside another card: transparent tones instead of card-on-card. */
    ha-card.row.flat {
      box-shadow: none;
      border: none;
    }

    ha-card.row.flat.on {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, transparent);
    }

    ha-card.row.flat.off {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 3%, transparent);
    }

    ha-card.row.colored[style*="background"] {
      background: none; /* inline style wins; keep the class from fighting it */
    }

    .r-icon {
      --mdc-icon-size: 22px;
      flex-shrink: 0;
    }

    .r-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }

    .r-name {
      font-size: 14px;
      font-weight: 600;
    }

    .r-sub {
      font-size: 12px;
      opacity: 0.75;
    }

    /* M3 switch, per SwitchTokens.kt (scaled from the 52×32 spec track). */
    .m3-switch {
      width: 44px;
      height: 26px;
      border-radius: 999px;
      background: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.15)));
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      position: relative;
      flex-shrink: 0;
      box-sizing: border-box;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .m3-switch i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
      width: 13px; /* spec 16/32 of track height */
      height: 13px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transition:
        left var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    /* Selected = the spec pair (SwitchTokens: Primary/OnPrimary) by default;
       switch_color / switch_color_on override track / thumb (templatable). */
    .m3-switch.on {
      background: var(--ms-track, var(--md-sys-color-primary));
      border-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .m3-switch.on i {
      left: 19px;
      width: 20px; /* spec 24/32 — the thumb GROWS when selected */
      height: 20px;
      background: var(--ms-thumb, var(--md-sys-color-on-primary, #fff));
    }

    /* Pressed: thumb swells toward the spec's 28/32 pressed size. */
    ha-card.row:active .m3-switch i {
      width: 22px;
      height: 22px;
    }

    ha-card.row:active .m3-switch:not(.on) i {
      left: 2px;
    }

    ha-card.row:active .m3-switch.on i {
      left: 16px;
    }
  `];customElements.define("materia-switch-editor",class extends qt{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"Name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"secondary",label:"Secondary text / template",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Row color (e.g. escalate from state)",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color",label:"Switch track color when on",color:!0,template:!0,selector:{text:{}}},{name:"switch_color_on",label:"Switch thumb color when on",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}});class ti extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedSwitchColor:{state:!0},_resolvedSwitchColorOn:{state:!0}};static styles=Je;static getConfigElement(){return document.createElement("materia-switch-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("switch.")||t.startsWith("input_boolean."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("Materia Switch: entity is required");this.config=t}updated(t){t.has("hass")&&this.hass&&(this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("switch_color","_resolvedSwitchColor"),this._resolveField("switch_color_on","_resolvedSwitchColorOn"))}get _stateObj(){return this.hass?.states[this.config.entity]}get _on(){return"on"===this._stateObj?.state}_tap(){this._handleAction(this.config.tap_action||{action:"toggle",entity:this.config.entity}),this._fireHaptic("light")}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj;if(!t)return I`<ha-card class="row off">Unknown entity: ${this.config.entity}</ha-card>`;const e=this._on,i=this._isUnavailable(t),s=this.config.name||t.attributes.friendly_name||this.config.entity,o=this.config.icon||t.attributes.icon||(e?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"),n=this.config.secondary?this._isTemplate(this.config.secondary)?this._resolvedSecondary:this.config.secondary:this.hass.formatEntityState?.(t)??t.state,a=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,r=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on,l=this._isTemplate(this.config.switch_color)?(this._resolvedSwitchColor||"").trim():this.config.switch_color,c=this._isTemplate(this.config.switch_color_on)?(this._resolvedSwitchColorOn||"").trim():this.config.switch_color_on;return I`
      <ha-card
        class="row ${e?"on":"off"} ${a?"colored":""} ${this.config.flat?"flat":""} ${i?"unavailable":""}"
        style="${a?`background:${a};`:""}${r?`color:${r};`:""}"
        @click=${this._tap}
      >
        <ha-icon class="r-icon" icon=${o}></ha-icon>
        <div class="r-text">
          <span class="r-name">${s}</span>
          ${n?I`<span class="r-sub">${n}</span>`:""}
        </div>
        <div class="m3-switch ${e?"on":""}"
          style="${l?`--ms-track:${l};`:""}${c?`--ms-thumb:${c};`:""}"><i></i></div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1}}getCardSize(){return 1}}customElements.define("materia-switch",ti),window.customCards=window.customCards||[],window.customCards.push({type:"materia-switch",name:"Materia Switch",description:"Toggle row with a spec M3 switch — templatable secondary text and state-driven colors.",preview:!0});const ei=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      container-type: inline-size;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: clamp(12px, 6cqi, 15px);
      font-weight: 600;
      opacity: 0.92;
      max-width: 100%;
    }

    .header span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header ha-icon {
      --mdc-icon-size: clamp(14px, 7cqi, 18px);
      flex-shrink: 0;
      transition: color var(--md-sys-motion-default-effects);
    }

    /* Always a translucent wash — the level should tint the card, not bury it. */
    .level-fill {
      fill: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 30%, transparent);
      transition: d var(--md-sys-motion-default-effects);
    }

    /* Ambient "working" rotation — the small corner glyph carries a livelier
       pace than the old full-size star did (one lobe-step ≈ 5.6s). */
    .spin {
      transform-box: fill-box;
      transform-origin: center;
      animation: ms-spin 45s linear infinite;
    }

    @keyframes ms-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Liquid drift: slide by exactly one wave period (50 units) to loop.
       Slow enough to read as water settling, not a marquee. */
    .level-fill.drift {
      animation: ms-drift 7s linear infinite;
    }

    @keyframes ms-drift {
      to {
        transform: translateX(50px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spin,
      .level-fill.drift {
        animation: none;
      }
    }

    .overlay {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1cqi;
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      text-align: center;
      max-width: 78%;
    }

    /* Binary: state word + a corner star glyph (precip-glyph pattern) —
       muted at rest, colored and slowly turning while active. */
    .binary-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .binary-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .binary-star {
      width: clamp(36px, 17cqi, 52px);
      height: clamp(36px, 17cqi, 52px);
      flex-shrink: 0;
    }

    .binary-star path {
      fill: color-mix(in srgb, currentColor 14%, transparent);
      transition: fill var(--md-sys-motion-default-effects);
    }

    .rect-tile.binary.active .binary-star path {
      fill: color-mix(in srgb, var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4))) 55%, transparent);
    }

    /* Active: the whole tile takes a translucent wash of the accent (same
       convention as the percent tile's fill), not just the corner glyph.
       Defaults to the "device" custom color — the same family materia-card
       already uses for switch/fan/input_boolean/vacuum active states —
       falling back to primary if custom colors aren't configured. */
    .rect-tile.binary.active {
      background: color-mix(in srgb, var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4))) 30%, var(--ms-color, var(--ha-card-background, var(--card-background-color))));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .big {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(28px, 24cqi, 52px);
      font-weight: 700;
      /* 1.05 clipped the tops of tall digits on this bold display font — the
         line box computed from font-size × line-height came in shorter than
         the glyph's actual ink extent. Padding is the belt to line-height's
         suspenders: guarantees headroom regardless of how the browser
         computes this variable font's line box. */
      line-height: 1.3;
      padding-top: 0.08em;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }

    .big.small-big {
      font-size: clamp(18px, 11cqi, 30px);
      line-height: 1.2;
    }

    .big .unit {
      font-size: 0.42em;
      font-weight: 600;
      opacity: 0.85;
    }

    .sub {
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
      opacity: 0.85;
    }

    .sub.hint {
      opacity: 0.6;
      max-width: 85%;
      line-height: 1.4;
    }

    /* ---- rect tiles (temperature / power / energy / plain) ---- */
    .rect-tile {
      container-type: inline-size;
      position: relative;
      background: var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      border-radius: 28px;
      padding: clamp(12px, 7cqi, 20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(6px, 4cqi, 14px);
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      aspect-ratio: 1;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      max-width: var(--ms-size, 200px);
      margin-inline: auto;
      width: 100%;
    }

    .rect-tile.clip {
      overflow: hidden;
    }

    .fill-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .rect-tile .overlay {
      max-width: 100%;
    }

    .rect-tile.left {
      align-items: flex-start;
      text-align: left;
      justify-content: space-between;
    }

    /* Vacuum: name (header) top, state right below it (same position as the
       binary variant's state word), room at the bottom, battery bar on the
       right. Same square canvas as every other variant. */
    .rect-tile.vacuum {
      align-items: flex-start;
      text-align: left;
    }

    .rect-tile.vacuum .header {
      justify-content: flex-start;
    }

    /* Defaults to the "device" custom color — vacuums get device colors
       while cleaning in materia-card too — falling back to primary. */
    .rect-tile.vacuum.active {
      background: color-mix(in srgb, var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4))) 22%, var(--ms-color, var(--ha-card-background, var(--card-background-color))));
    }

    .rect-tile.vacuum.active .header ha-icon {
      color: var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4)));
    }

    .vacuum-row {
      flex: 1;
      display: flex;
      gap: 10px;
      min-height: 0;
      width: 100%;
    }

    .vacuum-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Sits at its natural flow position right after the header — same
       vertical position as the binary variant's state word — not centered
       in the remaining space. */
    .vacuum-state {
      min-height: 0;
    }

    .rect-tile.left .header {
      justify-content: flex-start;
    }

    .split-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 10px;
      flex: 1;
      min-height: 0;
    }

    .split-main {
      display: flex;
      flex-direction: column;
      gap: 4px;
      justify-content: flex-end;
    }

    /* Thermometer: a quiet vertical pill track; the fill height and color ARE
       the reading. */
    .thermo {
      position: relative;
      width: clamp(12px, 7cqi, 18px);
      height: 82%;
      min-height: 46px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      overflow: hidden;
      flex-shrink: 0;
      align-self: center;
    }

    .thermo i {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 999px;
      transition: height var(--md-sys-motion-expressive-default-spatial), background-color var(--md-sys-motion-default-effects);
    }

    /* Power: ascending equalizer bars, lit count = load. */
    .bars {
      display: flex;
      align-items: flex-end;
      gap: clamp(3px, 1.6cqi, 5px);
      height: clamp(38px, 20cqi, 58px);
      flex-shrink: 0;
    }

    .bars i {
      width: clamp(7px, 3.6cqi, 11px);
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .bars i.lit {
      background: var(--ms-accent, var(--md-sys-color-primary, #6750a4));
    }

    .energy-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .energy-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .energy-bottom .glyph {
      --mdc-icon-size: clamp(30px, 14cqi, 44px);
      color: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 45%, transparent);
    }
  `],ii=[{value:"percent",label:"Percent (filling cookie)"},{value:"battery",label:"Battery (vertical bar)"},{value:"temperature",label:"Temperature (thermometer)"},{value:"power",label:"Power (load bars)"},{value:"energy",label:"Energy"},{value:"binary",label:"On/off (spinning star)"},{value:"plain",label:"Plain value"},{value:"vacuum",label:"Robot vacuum (state + room + battery bar)"}];customElements.define("materia-glance-tile-editor",class extends qt{_formData(){return{variant:"percent",...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){const t=this._config?.variant,e={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"variant",label:"Category",required:!0,selector:{select:{mode:"dropdown",options:ii}}},{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Icon (overrides entity icon)",selector:{icon:{}}},{name:"label",label:"Subtitle",selector:{text:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"temperature"===t&&i.fields.push({name:"min",label:"Scale min (default 10°)",selector:{number:{mode:"box"}}},{name:"max",label:"Scale max (default 30°)",selector:{number:{mode:"box"}}}),"power"===t&&i.fields.push({name:"max",label:"Full-load watts (default 3000)",selector:{number:{mode:"box"}}}),"plain"===t&&i.fields.push({name:"battery_entity",label:"Paired battery sensor (adds the vertical bar)",selector:{entity:{domain:"sensor"}}}),"vacuum"===t&&i.fields.push({name:"status_entity",label:"Detailed status sensor (shown as the state)",selector:{entity:{domain:"sensor"}}},{name:"room_entity",label:"Current room sensor (shown while cleaning)",selector:{entity:{domain:"sensor"}}},{name:"battery_entity",label:"Battery sensor (adds the vertical bar)",selector:{entity:{domain:"sensor"}}}),"percent"===t&&i.fields.push({name:"critical_dry",label:"Critical dry, ≤% (default 10 — red)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_below",label:"Water soon, ≤% (default 20 — orange)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"soggy_above",label:"Overwatered, >% (default 60 — blue)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_label",label:'"Needs water now" label',selector:{text:{}}},{name:"soon_label",label:'"Water soon" label',selector:{text:{}}},{name:"optimal_label",label:'"Optimal" label',selector:{text:{}}},{name:"wet_label",label:'"Overwatered" label',selector:{text:{}}});const s={title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"Accent color (fill / bars / star)",color:!0,selector:{text:{}}},{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},o={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[e,i,s,o]:[e,s,o]}});const si="var(--md-sys-cust-color-weather-rain, #5fa8f5)",oi="var(--md-sys-cust-color-scale-green, #5E9E50)",ni="var(--md-sys-cust-color-scale-orange, #D9713C)",ai="var(--md-sys-cust-color-scale-red, #C94D42)",ri=["on","open","running","playing","heat","heating","home","true","active"];class li extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedLabel:{state:!0}};static styles=ei;static getConfigElement(){return document.createElement("materia-glance-tile-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("sensor."))||"";return{entity:e,variant:"percent"}}setConfig(t){if(!t.entity)throw new Error("Materia Glance Tile: entity is required");if(!t.variant)throw new Error("Materia Glance Tile: variant is required — pick the value category");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("label","_resolvedLabel"))}get _label(){return this._isTemplate(this.config.label)?this._resolvedLabel:this.config.label}get _stateObj(){return this.hass?.states[this.config.entity]}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}get _unit(){return this.config.unit??this._stateObj?.attributes?.unit_of_measurement??""}get _name(){return this.config.name??this._stateObj?.attributes?.friendly_name??this.config.entity}_icon(t){return this.config.icon||this._stateObj?.attributes?.icon||t}get _variant(){return this.config.variant}_fmtState(){const t=this._stateObj;return this.hass.formatEntityState?.(t)??t.state}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj;if(!t||this._isUnavailable(t))return I`<ha-card><div class="rect-tile unavailable">
        <div class="header"><ha-icon icon=${this._icon("mdi:help-circle-outline")}></ha-icon><span>${this._name}</span></div>
        <div class="sub hint">${t?this._fmtState():"Entity not found"}</div>
      </div></ha-card>`;const e={percent:()=>this._percent(),battery:()=>this._battery(),temperature:()=>this._temperature(),power:()=>this._power(),energy:()=>this._energy(),binary:()=>this._binary(),plain:()=>this._plain(),vacuum:()=>this._vacuum()}[this._variant](),i=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,s=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,o=null!=this.config.size?Math.min(10,Math.max(1,this.config.size)):null;return I`
      <ha-card
        style="--ms-size:${null!=o?["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][o-1]:"200px"};${i?`--ms-color:${i};`:""}${s?`--ms-color-on:${s};`:""}${this.config.accent?`--ms-accent:${this.config.accent};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
      >
        ${e}
      </ha-card>
    `}_header(t){return I`<div class="header"><ha-icon icon=${this._icon(t)}></ha-icon><span>${this._name}</span></div>`}_moistureZone(t){const e=this.config.critical_dry??10,i=this.config.dry_below??20,s=this.config.soggy_above??60;return t<=e?{fill:ai,status:this.config.dry_label??"Needs water now"}:t<=i?{fill:ni,status:this.config.soon_label??"Water soon"}:t<=s?{fill:oi,status:this.config.optimal_label??"Optimal"}:{fill:si,status:this.config.wet_label??"Overwatered"}}_percent(){const t=this._num(this._stateObj.state);if(null==t)return this._plain();const e=Math.min(1,Math.max(0,t/100)),i=this._stateObj.attributes.device_class,s="moisture"===i;let o=null,n=null;if("battery"===i)o=e>.4?oi:e>.15?ni:ai;else if(s){const e=this._moistureZone(t);o=e.fill,n=e.status}else"humidity"===i&&(o=si);o&&(o=`color-mix(in srgb, ${o} 30%, transparent)`);const a=100-100*e,r="humidity"===i||s;let l;if(r){let t=`M-100 ${a.toFixed(1)}`;for(let e=-100;e<100;e+=25){t+=` Q ${e+12.5} ${(a+(e/25%2==0?-1.6:1.6)).toFixed(1)} ${e+25} ${a.toFixed(1)}`}l=t+" V102 H-100 Z"}else l=`M-2 ${a+2.5} Q 50 ${a-2.5} 102 ${a+2.5} V102 H-2 Z`;const c="battery"===i?"mdi:battery":s?"mdi:sprout":"mdi:water-percent";return I`
      <div class="rect-tile clip">
        <svg class="fill-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${e>.005?H`<path d=${l}
                class="level-fill ${r?"drift":""}" style=${o?`fill:${o}`:""} />`:""}
        </svg>
        <div class="overlay">
          ${this._header(c)}
          <div class="big">${Math.round(t)}<span class="unit">%</span></div>
          ${this._label??n?I`<div class="sub">${this._label??n}</div>`:""}
        </div>
      </div>
    `}_tempColor(t,e){const i="°F"===e?5*(t-32)/9:t;return i<16?si:i<23?oi:i<27?ni:ai}_temperature(){const t=this._num(this._stateObj.state);if(null==t)return this._plain();const e=this._unit||"°C",i=this.config.min??("°F"===e?50:10),s=this.config.max??("°F"===e?86:30),o=Math.min(1,Math.max(0,(t-i)/(s-i))),n=this._tempColor(t,e);return I`
      <div class="rect-tile left">
        ${this._header("mdi:thermometer")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(10*t)/10}<span class="unit">${e}</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8,100*o)}%;background:${n}"></i>
          </div>
        </div>
      </div>
    `}_batteryColor(t){return t>.4?oi:t>.15?ni:ai}_battery(){const t=this._num(this._stateObj.state);if(null==t)return this._plain();const e=Math.min(1,Math.max(0,t/100)),i=this._batteryColor(e);return I`
      <div class="rect-tile left">
        ${this._header("mdi:battery")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(t)}<span class="unit">%</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8,100*e)}%;background:${i}"></i>
          </div>
        </div>
      </div>
    `}_power(){const t=this._num(this._stateObj.state);if(null==t)return this._plain();const e="kW"===(this._stateObj.attributes.unit_of_measurement||"W")?1e3*t:t,i=this.config.max??3e3,s=Math.min(1,Math.max(0,e/i)),o=Math.ceil(5*s),n=e>=1e3?""+Math.round(e/100)/10:`${Math.round(e)}`,a=e>=1e3?"kW":"W";return I`
      <div class="rect-tile left">
        ${this._header("mdi:flash")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${n}<span class="unit"> ${a}</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="bars">
            ${[32,48,64,82,100].map((t,e)=>I`<i class=${e<o?"lit":""} style="height:${t}%"></i>`)}
          </div>
        </div>
      </div>
    `}_energy(){const t=this._num(this._stateObj.state);if(null==t)return this._plain();const e=this.hass?.locale?.language||navigator.language||"en",i=(Math.round(10*t)/10).toLocaleString(e);return I`
      <div class="rect-tile left">
        ${this._header("mdi:lightning-bolt")}
        <div class="big">${i}<span class="unit"> ${this._unit}</span></div>
        <div class="energy-bottom">
          ${this._label?I`<div class="sub">${this._label}</div>`:I`<span></span>`}
          <ha-icon class="glyph" icon="mdi:lightning-bolt"></ha-icon>
        </div>
      </div>
    `}_binary(){const t=ri.includes(this._stateObj.state),e=te(50,50,46,{vertices:8,innerRadius:.8,rounding:.15,rotate:-Math.PI/2});return I`
      <div class="rect-tile left binary ${t?"active":""}">
        ${this._header("mdi:power")}
        <div class="big small-big">${this._fmtState()}</div>
        <div class="binary-bottom">
          ${this._label?I`<div class="sub">${this._label}</div>`:I`<span></span>`}
          <svg class="binary-star" viewBox="0 0 100 100">
            <g class=${t?"spin":""}><path d=${e} /></g>
          </svg>
        </div>
      </div>
    `}_plain(){const t=this._stateObj,e=this._num(t.state),i=null!=e?I`<div class="big">${Math.round(10*e)/10}<span class="unit"> ${this._unit}</span></div>`:I`<div class="big small-big">${this._fmtState()}</div>`,s=this.config.battery_entity?this.hass.states[this.config.battery_entity]:null,o=s?this._num(s.state):null;if(null!=o){const t=Math.min(1,Math.max(0,o/100)),e=this._batteryColor(t);return I`
        <div class="rect-tile left">
          ${this._header("mdi:eye-outline")}
          <div class="split-row">
            <div class="split-main">
              ${i}
              ${this._label?I`<div class="sub">${this._label}</div>`:""}
            </div>
            <div class="thermo">
              <i style="height:${Math.max(8,100*t)}%;background:${e}"></i>
            </div>
          </div>
        </div>
      `}return I`
      <div class="rect-tile">
        ${this._header("mdi:eye-outline")}
        ${i}
        ${this._label?I`<div class="sub">${this._label}</div>`:""}
      </div>
    `}_fmtObj(t){return this.hass.formatEntityState?.(t)??t.state}_vacuum(){const t="cleaning"===this._stateObj.state,e=this.config.status_entity?this.hass.states[this.config.status_entity]:null,i=e?this._fmtObj(e):this._fmtState(),s=this.config.room_entity?this.hass.states[this.config.room_entity]:null,o=t&&s?this._fmtObj(s):"",n=this.config.battery_entity?this.hass.states[this.config.battery_entity]:null,a=n?this._num(n.state):null,r=null!=a?Math.min(1,Math.max(0,a/100)):null,l=null!=r?this._batteryColor(r):null;return I`
      <div class="rect-tile vacuum ${t?"active":""}">
        ${this._header(this._icon("mdi:robot-vacuum"))}
        <div class="vacuum-row">
          <div class="vacuum-main">
            <div class="vacuum-state"><div class="big small-big">${i}</div></div>
            <div class="sub">${o}</div>
          </div>
          ${null!=r?I`<div class="thermo"><i style="height:${Math.max(8,100*r)}%;background:${l}"></i></div>`:""}
        </div>
      </div>
    `}getGridOptions(){return{columns:4,rows:"auto",min_columns:3}}getCardSize(){return 3}}customElements.define("materia-glance-tile",li),window.customCards=window.customCards||[],window.customCards.push({type:"materia-glance-tile",name:"Materia Glance Tile",description:"Expressive view-only sensor tile — percent fill, thermometer, power bars, spinning pump star, and a graceful fallback.",preview:!0});const ci=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Everything below scales off the card's own width. */
      container-type: inline-size;
    }

    /* Connected group: a 2dp seam, and the members' facing corners tighten so
       the hero and its alert strip read as ONE object. */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Asymmetric expressive container — three big corners and one small,
       which is what stops it reading as a plain rounded rectangle. */
    .hero {
      position: relative;
      overflow: hidden;
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--mh-bg);
      color: var(--mh-fg);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* Bottom corners tighten only while something is attached below. */
    .hero.attached {
      border-radius: 32px 32px 8px 8px;
    }

    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px clamp(16px, 4.5cqi, 22px);
      /* Mirror of the hero: small where they meet, large on the outside, and
         the one tight corner kept at bottom-right so the silhouette still has
         the family's asymmetry. */
      border-radius: 8px 8px 14px 32px;
      background: var(--mh-alert-bg);
      color: var(--mh-alert-fg);
      cursor: pointer;
      box-sizing: border-box;
      font-size: clamp(13px, 3.7cqi, 15px);
      font-weight: 600;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .alert ha-icon {
      --mdc-icon-size: clamp(18px, 5cqi, 22px);
      flex-shrink: 0;
    }

    .alert span {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Inline "I've done it" affordance. Inherits the strip's own foreground so
       it reads at the right severity without a second colour decision. */
    .alert-action {
      flex: none;
      width: 32px;
      height: 32px;
      margin: -4px -6px -4px 0;
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;
      color: inherit;
      background: color-mix(in srgb, currentColor 12%, transparent);
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .alert-action ha-icon {
      --mdc-icon-size: 18px;
    }

    .alert-action:hover {
      background: color-mix(in srgb, currentColor 22%, transparent);
    }

    .burst {
      position: absolute;
      right: -8cqi;
      top: -8cqi;
      width: 36cqi;
      height: 36cqi;
      /* Sits in the container tint, never competing with the text. */
      fill: color-mix(in srgb, currentColor 9%, transparent);
      pointer-events: none;
    }

    /* Static at rest. Motion means the robot is doing something, so a docked
       machine gets a still shape — nothing moving for no reason. */
    .burst {
      transform-box: fill-box;
      transform-origin: center;
    }

    .burst.working {
      animation: mh-spin 9s linear infinite;
    }

    .burst.alarm {
      animation: mh-spin 45s linear infinite;
    }

    /* Alert is the one exception to "only when running": a fault should keep
       drawing the eye. Ominously slow rather than urgent — 45s per revolution
       on a 15-point star repeats only every ~3s of symmetry. Rotation and
       scale can't share one transform, so the swell rides a nested group. */
    .loom {
      transform-box: fill-box;
      transform-origin: center;
      animation: mh-loom 7s ease-in-out infinite alternate;
    }

    /* Calm counterpart to .loom — and, like the rotation, only while working. */
    .drift {
      transform-box: fill-box;
      transform-origin: center;
    }

    .burst.working .drift {
      animation: mh-drift 13s ease-in-out infinite alternate;
    }

    @keyframes mh-drift {
      to {
        transform: scale(1.03);
      }
    }

    @keyframes mh-loom {
      to {
        transform: scale(1.05);
      }
    }

    @keyframes mh-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .burst,
      .loom,
      .drift {
        animation: none;
      }
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
      min-width: 0;
    }

    .eyebrow span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .eyebrow ha-icon {
      --mdc-icon-size: clamp(15px, 4.4cqi, 18px);
      flex-shrink: 0;
    }

    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(21px, 7.6cqi, 32px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-top: 6px;
    }

    .figure {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      margin-top: 2px;
      min-width: 0;
    }

    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(40px, 17cqi, 70px);
      font-weight: 700;
      letter-spacing: -0.06em;
      /* Generous enough that the display face's tall digits never clip. */
      line-height: 1.12;
      font-variant-numeric: tabular-nums;
    }

    .unit {
      font-size: clamp(14px, 4.6cqi, 20px);
      font-weight: 600;
      padding-bottom: clamp(6px, 2.8cqi, 11px);
    }

    .caption {
      font-size: clamp(12px, 3.4cqi, 14px);
      padding-bottom: clamp(8px, 3.6cqi, 15px);
      opacity: 0.62;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .secondary {
      font-size: clamp(13px, 3.7cqi, 15px);
      opacity: 0.62;
      margin-top: 6px;
    }
  `];customElements.define("materia-hero-editor",class extends qt{_formData(){return{burst:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"Eyebrow text",selector:{text:{}}},{name:"icon",label:"Eyebrow icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"title",label:"Big title (defaults to the state)",template:!0,selector:{text:{}}},{name:"value",label:"Headline number (defaults to the state)",template:!0,selector:{text:{}}},{name:"unit",label:"Unit after the number",selector:{text:{}}},{name:"caption",label:"Caption beside the number",template:!0,selector:{text:{}}},{name:"secondary",label:"Sub-line",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"active_state",label:"State(s) that count as active",selector:{text:{}}},{name:"burst",label:"Show the turning burst",selector:{boolean:{}}},{name:"active_color",label:"Background while active",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"Text while active",color:!0,template:!0,selector:{text:{}}},{name:"color",label:"Background at rest",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text at rest",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const di={vacuum:"cleaning",light:"on",switch:"on",fan:"on",input_boolean:"on",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing",binary_sensor:"on"};class hi extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedTitle:{state:!0},_resolvedValue:{state:!0},_resolvedCaption:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedActiveColor:{state:!0},_resolvedActiveColorOn:{state:!0}};static styles=ci;static getConfigElement(){return document.createElement("materia-hero-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("sensor."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("Materia Hero: entity is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("title","_resolvedTitle"),this._resolveField("value","_resolvedValue"),this._resolveField("caption","_resolvedCaption"),this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("active_color","_resolvedActiveColor"),this._resolveField("active_color_on","_resolvedActiveColorOn"),this._alertList().forEach((t,e)=>{null!=t.text&&this._resolveTemplateValue(`alertText${e}`,t.text)}))}_alertList(){return Array.isArray(this.config.alerts)?this.config.alerts:this.config.alert?[this.config.alert]:[]}_idle(t){return["off","idle","unknown","unavailable","false","0","none","","ok","docked"].includes(String(t??"").toLowerCase())}_alertText(t,e){if(null==e.text)return"";const i=this._isTemplate(e.text)?this._tplResults?.[`alertText${t}`]:e.text;return null==i?"":String(i).trim()}get _activeAlert(){const t=this._alertList();for(let e=0;e<t.length;e++){const i=t[e],s=this._alertText(e,i);if(i.entity){const t=this.hass?.states[i.entity];if(!t)continue;const e=String(t.state);if(null!=i.state){if(!(Array.isArray(i.state)?i.state.map(String):[String(i.state)]).includes(e))continue}else if(this._idle(e))continue;return{...i,text:s||(this.hass.formatEntityState?.(t)??e)}}if(s)return{...i,text:s}}return null}_field(t,e){const i=this.config[t];if(null==i)return null;const s=this._isTemplate(i)?this[e]:i;return null==s||""===s?null:s}get _stateObj(){return this.hass?.states[this.config.entity]}_isActive(t){if(!t)return!1;const e=t.entity_id.split(".")[0],i=this.config.active_state??di[e]??"on";return(Array.isArray(i)?i:[i]).some(e=>String(e)===t.state)}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj,e=this._isUnavailable(t),i=!e&&this._isActive(t),s=this.config.name??t?.attributes?.friendly_name??this.config.entity,o=this.config.icon??t?.attributes?.icon,n=this._field("title","_resolvedTitle")??(t?this.hass.formatEntityState?.(t)??t.state:"—");let a=this._field("value","_resolvedValue");if(null==a&&t){const e=this._num(t.state);null!=e&&(a=String(Math.round(e)))}const r=this.config.unit??(null!=a?t?.attributes?.unit_of_measurement:null),l=this._field("caption","_resolvedCaption"),c=this._field("secondary","_resolvedSecondary"),d=this._activeAlert,h=d?.color||"var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))",p=d?.color_on||"var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))",u=d&&!1!==this.config.alert_tints_hero,m=u?h:i?this._field("active_color","_resolvedActiveColor")??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))":this._field("color","_resolvedColor")??"var(--md-sys-color-secondary-container)",g=u?p:i?this._field("active_color_on","_resolvedActiveColorOn")??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))":this._field("color_on","_resolvedColorOn")??"var(--md-sys-color-on-secondary-container)",f=oe(90,90,86),_=se(90,90,88);return I`
      <ha-card style="--mh-bg:${m};--mh-fg:${g};--mh-alert-bg:${h};--mh-alert-fg:${p};">
        <div class="stack">
        <div
          class="hero ${e?"unavailable":""} ${d?"attached":""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
        >
          ${!1===this.config.burst?V:I`<svg class="burst ${d?"alarm":i?"working":""}" viewBox="0 0 180 180" aria-hidden="true">
                ${d?H`<g class="loom"><path d=${_} /></g>`:H`<g class="drift"><path d=${f} /></g>`}
              </svg>`}
          <div class="content">
            <div class="eyebrow">
              ${o?I`<ha-icon .icon=${o}></ha-icon>`:V}
              <span>${s}</span>
            </div>
            <div class="title">${e?"Unavailable":n}</div>
            ${null!=a?I`<div class="figure">
                  <span class="value">${a}</span>
                  ${r?I`<span class="unit">${r}</span>`:V}
                  ${l?I`<span class="caption">${l}</span>`:V}
                </div>`:V}
            ${c?I`<div class="secondary">${c}</div>`:V}
          </div>
        </div>
        ${d?I`<div
              class="alert"
              role="status"
              @click=${()=>this._handleAction(d.tap_action||{action:"more-info",entity:d.entity||this.config.entity})}
            >
              <ha-icon .icon=${d.icon??"mdi:alert-circle-outline"}></ha-icon>
              <span>${d.text}</span>
            </div>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}customElements.define("materia-hero",hi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-hero",name:"Materia Hero",description:"Expressive headline block — big state title, one enormous numeral, and an accent swap while active.",preview:!0});const pi={status:["_status","_work_mode","_state","_activity"],progress:["_cleaning_progress","_progress"],battery:["_battery","_batterij","_batterie"],room:["_current_room","_room","_active_map"],cleaning_time:["_cleaning_time","_cleaning_duration"],cleaning_area:["_cleaning_area","_area_cleaned"],error:["_vacuum_error","_error"],dock_error:["_dock_error"],water_shortage:["_water_shortage"],clean_water:["_dock_clean_water_box","_clean_water"],dirty_water:["_dock_dirty_water_box","_dirty_water"],mop_drying:["_mop_drying","_drying"],last_clean:["_last_clean_end","_last_job","_last_clean"]},ui=["_time_left","_lifespan","_consumable"],mi=["docked","charging","charging_complete","fully_charged","idle","sleeping","paused","standby","off","unavailable","unknown","error","device_offline","charger_disconnected","locked","shutting_down","updating","air_drying_stopping"],gi={roborock:{idle_states:mi},ecovacs:{idle_states:[...mi,"cleaning_paused","returning"]},generic:{idle_states:mi}};const fi=[{match:["sensor_time_left","sensor_lifespan"],en:"Clean the sensors",nl:"Maak de sensoren schoon"},{match:["main_brush"],en:"Replace the main brush",nl:"Vervang de hoofdborstel"},{match:["side_brush"],en:"Replace the side brush",nl:"Vervang de zijborstel"},{match:["filter"],en:"Replace the filter",nl:"Vervang het filter"},{match:["strainer"],en:"Clean the dock strainer",nl:"Reinig de dockzeef"},{match:["maintenance_brush"],en:"Clean the dock brush",nl:"Maak de dockborstel schoon"},{match:["mop_life","mop_time"],en:"Replace the mop pad",nl:"Vervang de dweil"}],_i=[{match:["dustbin_full","bin_full","dust_bin_full"],en:"Empty the dustbin",nl:"Leeg de stofbak"},{match:["water_box_empty","low_water","no_water"],en:"Refill the water tank",nl:"Vul het waterreservoir bij"},{match:["waste_water_tank_full","dirty_water_full"],en:"Empty the dirty water tank",nl:"Leeg het vuilwaterreservoir"},{match:["main_brush_stuck","main_brush_jammed"],en:"Free the main brush",nl:"Maak de hoofdborstel vrij"},{match:["side_brush_stuck","side_brush_jammed"],en:"Free the side brush",nl:"Maak de zijborstel vrij"},{match:["wheel_stuck","wheels_stuck","stuck"],en:"The wheels are stuck - move it clear",nl:"De wielen zitten vast — haal het obstakel weg"},{match:["cliff_sensor","cliff"],en:"Clean the cliff sensors",nl:"Maak de valsensoren schoon"},{match:["filter_blocked","filter_dirty"],en:"Clean or replace the filter",nl:"Reinig of vervang het filter"},{match:["bumper_stuck","bumper"],en:"Free the bumper",nl:"Maak de bumper vrij"},{match:["dock","charger"],en:"Check the dock connection",nl:"Controleer de verbinding met het dock"},{match:["low_battery","battery_low"],en:"Battery too low - let it charge",nl:"Accu te laag - laat hem opladen"},{match:["trapped","cannot_move","stuck_in_place"],en:"It is trapped - move it clear",nl:"De robot zit vast — haal hem los"},{match:["mop_missing","no_mop"],en:"Attach the mop pad",nl:"Bevestig de dweil"},{match:["full","container_full"],en:"Empty the container",nl:"Leeg het reservoir"}];function bi(t,e,i){const s=String(e||"").toLowerCase();if(!s)return null;const o=t.find(t=>t.match.some(t=>s.includes(t)));return o?function(t,e){return t[String(e||"en").toLowerCase().split("-")[0]]||t.en}(o,i):null}customElements.define("materia-vacuum-hero-editor",class extends qt{_formData(){return{brand:"roborock",burst:!0,alert_tints_hero:!0,...this._config}}_sectionsSignature(){return this._config?.brand||""}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}},{name:"brand",label:"Brand profile",selector:{select:{mode:"dropdown",options:[{value:"roborock",label:"Roborock"},{value:"ecovacs",label:"Ecovacs"},{value:"generic",label:"Generic / other"}]}}},{name:"name",label:"Name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{title:"Entity overrides",icon:"mdi:link-variant",fields:[{name:"status_entity",label:"Status / work mode",selector:{entity:{}}},{name:"progress_entity",label:"Cleaning progress (%)",selector:{entity:{}}},{name:"battery_entity",label:"Battery",selector:{entity:{}}},{name:"room_entity",label:"Current room",selector:{entity:{}}},{name:"cleaning_time_entity",label:"Elapsed cleaning time",selector:{entity:{}}},{name:"error_entity",label:"Vacuum error",selector:{entity:{}}},{name:"dock_error_entity",label:"Dock error",selector:{entity:{}}},{name:"mop_drying_entity",label:"Mop drying",selector:{entity:{}}},{name:"last_clean_entity",label:"Last clean finished",selector:{entity:{}}}]},{title:"Behaviour",icon:"mdi:cog-outline",fields:[{name:"consumable_hours",label:"Warn when a consumable has this many hours left (default 1)",selector:{number:{min:0,max:200,mode:"box"}}},{name:"consumable_percent",label:"Warn when a % lifespan drops to (default 5)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"docked_label",label:'Label at a full battery (default "Docked")',selector:{text:{}}},{name:"drying_label",label:'Drying sub-line (default "Drying the mop")',selector:{text:{}}},{name:"alert_tints_hero",label:"An ERROR colours the whole hero (warnings never do)",selector:{boolean:{}}},{name:"burst",label:"Show the decorative shape",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"working_color",label:"Background while working",color:!0,selector:{text:{}}},{name:"working_color_on",label:"Text while working",color:!0,selector:{text:{}}},{name:"color",label:"Background at rest",color:!0,selector:{text:{}}},{name:"color_on",label:"Text at rest",color:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class vi extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=ci;static getConfigElement(){return document.createElement("materia-vacuum-hero-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("vacuum."))||"";return{entity:e,brand:"roborock"}}setConfig(t){if(!t.entity)throw new Error("Materia Vacuum Hero: entity is required");this.config={brand:"roborock",...t},this._discovered=null}updated(t){t.has("config")&&(this._discovered=null)}get _profile(){return t=this.config.brand,gi[t]||gi.generic;var t}get _stateObj(){return this.hass?.states[this.config.entity]}_siblings(){const t=this.hass?.entities?.[this.config.entity],e=t?.device_id;return e?Object.values(this.hass.entities).filter(t=>t.device_id===e&&!t.disabled_by&&!t.hidden_by).map(t=>t.entity_id):[]}get _caps(){if(this._discovered)return this._discovered;const t=this._siblings(),e=(e,i)=>{for(const s of e){const e=t.find(t=>!(i&&!i.includes(t.split(".")[0]))&&(t.split(".")[1].endsWith(s)||t.split(".")[1].includes(s)));if(e)return e}return null},i={};for(const[t,s]of Object.entries(pi))i[t]=this.config[`${t}_entity`]??e(s,["sensor","binary_sensor"]);return i.consumables=this.config.consumable_entities??t.filter(t=>t.startsWith("sensor.")&&ui.some(e=>t.includes(e))),this._discovered=i,i}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}_stateOf(t){if(!t)return null;const e=this.hass?.states[t];return e&&!this._isUnavailable(e)?e.state:null}_numOf(t){return this._num(this._stateOf(t))}get _idleStates(){return(this.config.idle_states??this._profile.idle_states).map(t=>String(t).toLowerCase())}get _working(){const t=this._stateObj;if(!t||this._isUnavailable(t))return!1;const e=String(this._stateOf(this._caps.status)??t.state).toLowerCase();return!this._idleStates.includes(e)}get _drying(){return"on"===this._stateOf(this._caps.mop_drying)}get _minutesLeft(){const t=this._numOf(this._caps.progress);if(null==t||t<=0||t>=100)return null;const e=this._numOf(this._caps.cleaning_time);if(null==e||e<=0)return null;const i=e>600?e/60:e;return Math.max(1,Math.round(i*(100-t)/t))}_pretty(t){if(null==t)return null;const e=String(t).replace(/[_-]+/g," ").trim();return e.charAt(0).toUpperCase()+e.slice(1)}_resetButtonFor(t){const e=["main_brush","side_brush","maintenance_brush","strainer","filter","sensor","mop"].find(e=>t.includes(e));return e?this._siblings().find(t=>t.startsWith("button.")&&t.includes("reset")&&t.includes(e))??null:null}_lowConsumables(){const t=this.config.consumable_hours??1,e=this.config.consumable_percent??5,i={s:1/3600,sec:1/3600,seconds:1/3600,min:1/60,minutes:1/60,h:1,hours:1,d:24};return(this._caps.consumables||[]).filter(s=>{const o=this._numOf(s);if(null==o)return!1;const n=String(this.hass.states[s]?.attributes?.unit_of_measurement??"").toLowerCase();if("%"===n)return o<=e;return o*(i[n]??1)<=t})}get _alerts(){const t=this._caps,e=(t,e,i)=>{const s=this._stateOf(t);if(null==s||["none","ok","off","no_error","0"].includes(String(s).toLowerCase()))return null;const o=(n=s,a=this.hass.locale?.language,bi(_i,n,a));var n,a;return{icon:e,text:o?`${i}: ${o}`:`${i}: ${this._pretty(s)}`,severity:"error",entity:t}},i=(t,e,i,s)=>"on"===this._stateOf(t)?{icon:e,text:i,severity:s,entity:t}:null;return[e(t.error,"mdi:robot-vacuum-alert",this.config.error_label??"Vacuum error"),e(t.dock_error,"mdi:home-alert-outline",this.config.dock_error_label??"Dock error"),i(t.water_shortage,"mdi:water-alert-outline","Water shortage - cannot mop","error"),i(t.clean_water,"mdi:water-outline","Clean water tank needs refilling","warning"),i(t.dirty_water,"mdi:water-off-outline","Dirty water tank needs emptying","warning"),...this._lowConsumables().map(t=>{return{icon:"mdi:wrench-outline",text:(e=t,i=this.hass.locale?.language,bi(fi,e,i)??`${this.hass.states[t]?.attributes?.friendly_name??t} needs attention`),severity:"warning",entity:t,reset:this._resetButtonFor(t)};var e,i}),...this.config.alerts||[]].filter(Boolean)}_severityPair(t){return"warning"===t?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--md-sys-cust-color-error, var(--md-sys-color-error))","var(--md-sys-cust-color-on-error, var(--md-sys-color-on-error))"]}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj;if(!t)return I`<ha-card><div class="stack"><div class="hero">
        <div class="content"><div class="title">Entity not found</div></div>
      </div></div></ha-card>`;const e=this._isUnavailable(t),i=this._caps,s=this._working,o=this._alerts[0]||null,n=this._numOf(i.battery),a=this._numOf(i.progress),r=this._stateOf(i.status)??t.state;let l=this._pretty(r);!s&&null!=n&&n>=100&&(l=this.config.docked_label??"Docked"),e&&(l="Unavailable");const c=s&&null!=a,d=c?Math.round(a):n,h=c?this.config.progress_caption??"done":this.config.battery_caption??"battery";let p=null;if(s){const t=this._stateOf(i.room),e=this._minutesLeft,s=[];t&&!["unknown","unavailable"].includes(t)&&s.push(this._pretty(t)),null!=e&&s.push(`about ${e} min left`),p=s.join(" - ")||null}else if(this._drying)p=this.config.drying_label??"Drying the mop";else{const t=this._stateOf(i.last_clean);if(t){const e=new Date(t);if(!Number.isNaN(e.getTime())){const t=Math.round((Date.now()-e.getTime())/6e4);p=`Last cleaned ${t<60?`${Math.max(1,t)} min`:t<1440?`${Math.round(t/60)} h`:`${Math.round(t/1440)} d`} ago`}}}let u=this.config.color??"var(--md-sys-color-secondary-container)",m=this.config.color_on??"var(--md-sys-color-on-secondary-container)";s&&(u=this.config.working_color??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",m=this.config.working_color_on??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))");const g=null!=o&&"warning"!==o.severity;let f=null,_=null;if(o){const[t,e]=this._severityPair(o.severity);f=o.color??t,_=o.color_on??e,g&&!1!==this.config.alert_tints_hero&&(u=f,m=_)}const b=oe(90,90,86),v=se(90,90,88),y=this.config.name??t.attributes?.friendly_name??this.config.entity,x=this.config.icon??"mdi:robot-vacuum";return I`
      <ha-card style="--mh-bg:${u};--mh-fg:${m};--mh-alert-bg:${f??u};--mh-alert-fg:${_??m};">
        <div class="stack">
          <div
            class="hero ${e?"unavailable":""} ${o?"attached":""}"
            @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
          >
            ${!1===this.config.burst?V:I`<svg class="burst ${g?"alarm":s?"working":""}" viewBox="0 0 180 180" aria-hidden="true">
                  ${g?H`<g class="loom"><path d=${v} /></g>`:H`<g class="drift"><path d=${b} /></g>`}
                </svg>`}
            <div class="content">
              <div class="eyebrow">
                <ha-icon .icon=${x}></ha-icon><span>${y}</span>
              </div>
              <div class="title">${l}</div>
              ${null!=d?I`<div class="figure">
                    <span class="value">${d}</span><span class="unit">%</span>
                    <span class="caption">${h}</span>
                  </div>`:V}
              ${p?I`<div class="secondary">${p}</div>`:V}
            </div>
          </div>
          ${o?I`<div
                class="alert"
                role="status"
                @click=${()=>this._handleAction(o.tap_action||{action:"more-info",entity:o.entity||this.config.entity})}
              >
                <ha-icon .icon=${o.icon??"mdi:alert-circle-outline"}></ha-icon>
                <span>${o.text}</span>
                ${o.reset?I`<button
                      class="alert-action"
                      title="Reset"
                      @click=${t=>{t.stopPropagation(),this._fireHaptic?.("light"),this._callService("button","press",{},{entity_id:o.reset})}}
                    >
                      <ha-icon icon="mdi:restart"></ha-icon>
                    </button>`:V}
              </div>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}customElements.define("materia-vacuum-hero",vi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-vacuum-hero",name:"Materia Vacuum Hero",description:"Robot-vacuum headline — derived ETA, negated working states, and mop/consumable warnings. Roborock and Ecovacs.",preview:!0});const yi=[kt,wt,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      display: flex;
      align-items: center;
      gap: 8px;
      /* ON THE LADDER. 44px was on no scale at all: M3's FilterChipTokens is
         ContainerHeight 32dp with ContainerShape CornerSmall (8dp), and the M3
         Expressive button ladder is 32/40/56/96/136 — 44 is neither. These
         behave like M3E selected-toggle buttons rather than filter chips (they
         morph shape on selection, which a filter chip does not), so they take the
         button ladder's SMALL rung: 40px tall, 16px padding, 8px gap, 14px label
         — all four straight from .size-s in elements/button/styles.js. */
      height: 40px;
      padding: 0 16px;
      box-sizing: border-box;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      /* Unselected is a quiet filled surface with NO outline — an outlined
         chip next to filled neighbours read as disabled rather than
         unselected, and it matches the tonal button groups elsewhere. */
      background: var(--md-sys-color-surface-container-high, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      border: none;
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
      /* EXACTLY half the height, not 999px. Both look like a pill at rest, but
         999px is unanimatable: on a 40px chip every value above 20px renders
         identically, so interpolating 999 -> 12 sits visually still for ~97% of
         the duration and then snaps at the end. Starting at the real half-height
         makes the morph perceptually linear. */
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* All on ONE duration so the chip reads as a single motion. Mixing
         durations made it grow in two stages: the colour landed on the fast
         curve while the width (driven by the check expanding) was still
         running on the slower one. Non-overshooting curve throughout — on the
         springy spatial one the radius sailed past its target and
         overflow:hidden flashed square corners. */
      transition: border-radius var(--md-sys-motion-fast-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .chip.on {
      background: var(--mc-bg);
      color: var(--mc-fg);
      /* .size-s's square-shape corner, so the morph lands on a real token
         instead of a number picked to look right. */
      border-radius: 12px;
      font-weight: 600;
    }

    /* Check collapses to zero width when unselected — the chip closes up
       around the label instead of holding an empty slot. Width only, so
       nothing can overshoot the chip's own bounds. */
    .check {
      /* FilterChipTokens.IconSize. */
      --mdc-icon-size: 18px;
      width: 0;
      opacity: 0;
      overflow: hidden;
      flex-shrink: 0;
      transition: width var(--md-sys-motion-fast-effects),
        opacity var(--md-sys-motion-fast-effects);
    }

    .chip.on .check {
      width: 17px;
      opacity: 1;
    }

    .lead {
      /* FilterChipTokens.IconSize. */
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    .text {
      white-space: nowrap;
    }

    /* M3 state layer */
    .chip::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .chip:hover::before {
      opacity: 0.08;
    }

    .chip:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .chip,
      .check {
        transition: none;
      }
    }
  `];customElements.define("materia-chips-editor",class extends qt{_formData(){return{show_check:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"Entity holding the selection",selector:{entity:{}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"multi_select",label:"Multi-select (state is a comma-separated list)",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_check",label:"Show the check on selected chips",selector:{boolean:{}}},{name:"color",label:"Selected chip color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Selected chip text",color:!0,template:!0,selector:{text:{}}}]}]}});class xi extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=yi;static getConfigElement(){return document.createElement("materia-chips-editor")}static getStubConfig(){return{chips:[{label:"Chip 1",value:"one"},{label:"Chip 2",value:"two"}]}}setConfig(t){if(!t.chips?.length)throw new Error("Materia Chips: at least one chip is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"))}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){const t=this._stateObj;return t?this.config.attribute?t.attributes?.[this.config.attribute]:t.state:null}get _selected(){const t=this._current;return null==t||"unknown"===t||"unavailable"===t?[]:Array.isArray(t)?t.map(t=>String(t).trim()):this.config.multi_select?String(t).split(",").map(t=>t.trim()).filter(Boolean):[String(t)]}_chips(){return(this.config.chips||[]).map(t=>"string"==typeof t?{label:t,value:t}:t)}_tap(t){if(this._fireHaptic?.("selection"),t.tap_action)return void this._handleAction(t.tap_action);const e=this._stateObj,i=e?.entity_id?.split(".")[0],s=t.value??t.label;"select"!==i&&"input_select"!==i||null==s||this._callService(i,"select_option",{entity_id:e.entity_id,option:String(s)})}render(){if(!this.hass||!this.config)return I``;const t=this._selected,e=(this._isTemplate(this.config.color)?this._resolvedColor:this.config.color)||"var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))",i=(this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on)||"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))",s=!1!==this.config.show_check;return I`
      <ha-card style="--mc-bg:${e};--mc-fg:${i};">
        <div class="chips">
          ${this._chips().map(e=>{const i=e.value??e.label,o=t.some(t=>t===String(i));return I`
              <button class="chip ${o?"on":""}" @click=${()=>this._tap(e)} aria-pressed=${o?"true":"false"}>
                ${s?I`<ha-icon class="check" icon="m3of:check"></ha-icon>`:e.icon?I`<ha-icon class="lead" .icon=${e.icon}></ha-icon>`:V}
                <span class="text">${e.label??i}</span>
              </button>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-chips",xi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-chips",name:"Materia Chips",description:"M3 filter chips — wrapping, single or multi-select, with a check that slides in when chosen.",preview:!0});const wi=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .tile {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      padding: 14px 16px;
      display: flex;
      align-items: flex-end;
      gap: 13px;
      box-sizing: border-box;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: clamp(66px, 23cqi, 86px);
      flex-shrink: 0;
    }

    .label {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.65;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(16px, 5.6cqi, 20px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.25;
    }

    /* The "off" choice — a round button, because off isn't a rung. */
    .off {
      width: 46px;
      height: 46px;
      flex: none;
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-family: inherit;
      color: inherit;
      background: color-mix(in srgb, currentColor 10%, transparent);
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .off ha-icon {
      --mdc-icon-size: 21px;
      opacity: 0.55;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .off.on {
      background: var(--bs-accent);
      color: var(--bs-accent-on);
    }

    .off.on ha-icon {
      opacity: 1;
    }

    .bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: clamp(40px, 15cqi, 54px);
      min-width: 0;
    }

    .bar {
      flex: 1;
      min-width: 0;
      border: none;
      padding: 0;
      border-radius: 9px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      background: color-mix(in srgb, currentColor 12%, transparent);
      /* Lit bars stand fully up; unlit sit a hair lower. The scale rides the
         springy EXPRESSIVE spatial curve, so it overshoots slightly on the way
         up — that overshoot is the pop. Colour stays on the non-overshooting
         effects curve, per the spatial-vs-effects split. */
      transform-origin: bottom;
      transform: scaleY(0.94);
      transition: background-color var(--md-sys-motion-fast-effects),
        height var(--md-sys-motion-expressive-default-spatial);
    }

    .bar.lit {
      background: var(--bs-accent);
      transform: scaleY(1);
    }

    /* M3 state layer on both control types */
    .off::before,
    .bar::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .bar {
      position: relative;
      overflow: hidden;
    }

    .off:hover::before,
    .bar:hover::before {
      opacity: 0.08;
    }

    .off:active::before,
    .bar:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .bar,
      .off {
        transition: none;
      }
      /* No staggered choreography either — the inline delay would otherwise
         still hold each bar back. */
      .bar {
        transition-delay: 0ms !important;
        transform: scaleY(1);
      }
    }
  `];customElements.define("materia-bar-select-editor",class extends qt{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"label",label:"Label",selector:{text:{}}},{name:"attribute",label:"Attribute (e.g. fan_speed) instead of the state",selector:{text:{}}},{name:"off_option",label:'Option shown as its own round button (e.g. "off")',selector:{text:{}}},{name:"off_icon",label:"Icon for that button",selector:{icon:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"Lit bar color",color:!0,template:!0,selector:{text:{}}},{name:"accent_on",label:"Glyph color on the accent fill",color:!0,template:!0,selector:{text:{}}}]},{title:"Advanced",icon:"mdi:tune",fields:[{name:"service",label:"Override service (domain.service)",selector:{text:{}}},{name:"service_key",label:"Override service data key",selector:{text:{}}}]}]}});class $i extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedAccent:{state:!0},_resolvedAccentOn:{state:!0}};static styles=wi;static getConfigElement(){return document.createElement("materia-bar-select-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("select."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("Materia Bar Select: entity is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("accent","_resolvedAccent"),this._resolveField("accent_on","_resolvedAccentOn"));const e=this._index;null!=this._prevIndex&&e!==this._prevIndex&&this._choreograph(this._prevIndex,e),this._prevIndex=e}get _stateObj(){return this.hass?.states[this.config.entity]}get _rungs(){const t=null!=this.config.off_option?String(this.config.off_option):null;return this._options.filter(e=>null==t||e!==t)}get _index(){return this._rungs.indexOf(String(this._current))}get _current(){const t=this._stateObj;if(!t)return null;const e=this.config.attribute?t.attributes?.[this.config.attribute]:t.state;return null==e?null:String(e)}get _options(){if(this.config.options?.length)return this.config.options.map(String);const t=this._stateObj;if(!t)return[];if(this.config.attribute){const e=t.attributes?.[`${this.config.attribute}_list`];return Array.isArray(e)?e.map(String):[]}const e=t.attributes?.options;return Array.isArray(e)?e.map(String):[]}_fmt(t){const e=this._stateObj;if(!this.config.attribute&&e&&String(e.state)===String(t)){const t=this.hass.formatEntityState?.(e);if(t)return t}const i=String(t).replace(/[_-]+/g," ");return i.charAt(0).toUpperCase()+i.slice(1)}_set(t){const e=this._stateObj;if(!e)return;const i=e.entity_id.split(".")[0];if(this._fireHaptic?.("selection"),this.config.service){const[i,s]=String(this.config.service).split("."),o=this.config.service_key||this.config.attribute||"option";return void this._callService(i,s,{entity_id:e.entity_id,[o]:t})}if(this.config.attribute){const s=this.config.attribute;return void this._callService(i,`set_${s}`,{entity_id:e.entity_id,[s]:t})}"select"!==i&&"input_select"!==i||this._callService(i,"select_option",{entity_id:e.entity_id,option:t})}_choreograph(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=Array.from(this.shadowRoot?.querySelectorAll(".bar")||[]);if(!i.length)return;const s=e>t,o=[];for(let s=Math.min(t,e)+1;s<=Math.max(t,e);s++)i[s]&&o.push(i[s]);const n=s?o:o.reverse(),a=s?[{transform:"scaleY(0.94)"},{transform:"scaleY(1.07)",offset:.5},{transform:"scaleY(1)"}]:[{transform:"scaleY(1)"},{transform:"scaleY(0.84)",offset:.5},{transform:"scaleY(0.94)"}];n.forEach((t,e)=>{t.animate(a,{duration:300,delay:45*e,easing:s?"cubic-bezier(.2,1.5,.3,1)":"cubic-bezier(.3,0,.2,1)",fill:"none"})})}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj;if(!t||this._isUnavailable(t))return I`<ha-card><div class="tile unavailable">
        <div class="meta"><span class="label">${this.config.label??this.config.entity}</span>
        <span class="value">—</span></div>
      </div></ha-card>`;const e=(this._isTemplate(this.config.accent)?this._resolvedAccent:this.config.accent)||"var(--md-sys-cust-color-device, var(--md-sys-color-primary))",i=(this._isTemplate(this.config.accent_on)?this._resolvedAccentOn:this.config.accent_on)||"var(--md-sys-color-on-primary, #fff)",s=this._current,o=null!=this.config.off_option?String(this.config.off_option):null,n=null!=o&&s===o,a=this._rungs,r=this._index,l=a.length,c=null==this._prevIndex?r:this._prevIndex,d=r>c?1:r<c?-1:0,h=this.config.label??t.attributes?.friendly_name??this.config.entity;return I`
      <ha-card style="--bs-accent:${e};--bs-accent-on:${i};">
        <div class="tile">
          <div class="meta">
            <span class="label">${h}</span>
            <span class="value">${null==s?"—":this._fmt(s)}</span>
          </div>

          ${null!=o?I`<button
                class="off ${n?"on":""}"
                @click=${()=>this._set(o)}
                aria-pressed=${n?"true":"false"}
                title=${this._fmt(o)}
              >
                <ha-icon .icon=${this.config.off_icon??"mdi:water-off"}></ha-icon>
              </button>`:V}

          <div class="bars">
            ${a.map((t,e)=>I`<button
                class="bar ${r>=e?"lit":""}"
                style="height:${l>1?34+66*e/(l-1):100}%;transition-delay:${(t=>d>0?t>c&&t<=r?45*(t-c-1):0:d<0&&t>r&&t<=c?45*(c-t):0)(e)}ms"
                @click=${()=>this._set(t)}
                aria-pressed=${r===e?"true":"false"}
                title=${this._fmt(t)}
              ></button>`)}
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-bar-select",$i),window.customCards=window.customCards||[],window.customCards.push({type:"materia-bar-select",name:"Materia Bar Select",description:"Tap-a-bar level picker — climbing bars for fan speeds, mop levels, any ordered select.",preview:!0});const ki=[kt,wt,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .rail {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      /* No scroll-snap: proximity snapping caught fast flicks and settled them
         on the nearest tile, which killed the native fling. A room rail is a
         free scroll, not a pager. */
      /* Bleed to the card edge so tiles scroll out under the padding rather
         than stopping short of it. */
      padding: 5px 14px 5px 0;
      margin-right: -14px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      /* Drag affordance for pointer users; without user-select the drag would
         start selecting the tile labels instead of scrolling. */
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }

    .rail:active {
      cursor: grabbing;
    }

    .rail::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .tile {
      flex: none;
      width: 112px;
      height: 132px;
      padding: 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      border: none;
      font-family: inherit;
      text-align: left;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* Quiet filled surface when unselected — same treatment as the chips, so
         an unselected tile never reads as disabled. */
      background: var(--md-sys-color-surface-container-high, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
      border-radius: 28px;
      /* One duration for everything, matching the chips. The radius was on the
         slower default curve while the colours were on the fast one, so the
         tile visibly lagged the rest of the page. Non-overshooting throughout:
         a spring overshoots the radius and, with overflow:hidden, flashes
         square corners mid-transition. */
      transition: border-radius var(--md-sys-motion-fast-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .tile.on {
      background: var(--mcar-bg);
      color: var(--mcar-fg);
      border-radius: 16px;
    }

    .top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .glyph {
      --mdc-icon-size: 24px;
      opacity: 0.85;
    }

    .check {
      --mdc-icon-size: 18px;
      opacity: 0;
      flex-shrink: 0;
      /* Scales in with the corner morph instead of only fading, so the tile
         reads as one gesture. Springy curve on the transform (it moves),
         flat curve on the opacity. */
      transform: scale(0.6);
      transition: opacity var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .tile.on .check {
      opacity: 1;
      transform: scale(1);
    }

    .bottom {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .name {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.2;
      /* Two lines max — "Master bedroom" shouldn't force a wider tile. */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .sub {
      font-size: 12px;
      opacity: 0.65;
      margin-top: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 state layer */
    .tile::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .tile:hover::before {
      opacity: 0.08;
    }

    .tile:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .tile,
      .check {
        transition: none;
      }
    }
  `];customElements.define("materia-carousel-editor",class extends qt{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"Entity holding the selection",selector:{entity:{}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"multi_select",label:"Multi-select (state is a comma-separated list)",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Selected tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Selected tile text",color:!0,template:!0,selector:{text:{}}}]}]}});class Ci extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=ki;static getConfigElement(){return document.createElement("materia-carousel-editor")}static getStubConfig(){return{items:[{label:"Item 1",value:"one"},{label:"Item 2",value:"two"}]}}setConfig(t){if(!t.items?.length)throw new Error("Materia Carousel: at least one item is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"))}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){const t=this._stateObj;return t?this.config.attribute?t.attributes?.[this.config.attribute]:t.state:null}get _selected(){const t=this._current;return null==t||"unknown"===t||"unavailable"===t?[]:Array.isArray(t)?t.map(t=>String(t).trim()):this.config.multi_select?String(t).split(",").map(t=>t.trim()).filter(Boolean):[String(t)]}_items(){return(this.config.items||[]).map(t=>"string"==typeof t?{label:t,value:t}:t)}updated(t){super.updated?.(t);const e=new Set(this._selected.map(String));if(this._prevSel){const t=[...new Set([...e,...this._prevSel])].filter(t=>e.has(t)!==this._prevSel.has(t));t.length&&this._ripple(t,e)}this._prevSel=e}_ripple(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=Array.from(this.shadowRoot?.querySelectorAll(".tile")||[]);if(!i.length)return;const s=this._items(),o=t.map(t=>s.findIndex(e=>String(e.value??e.label)===t)).filter(t=>t>=0);o.length&&i.forEach((t,e)=>{const i=Math.min(...o.map(t=>Math.abs(t-e)));if(i>2)return;const s=0===i?1.04:1===i?.985:.995,n=mt;t.animate([{transform:"scale(1)"},{transform:`scale(${s})`},{transform:"scale(1)"}],{duration:n.ms,delay:30*i,easing:n.easing,fill:"none"})})}_onPointerDown(t){this._stopMomentum(),"mouse"===t.pointerType&&(this._dragStartX=t.clientX,this._dragStartScroll=t.currentTarget.scrollLeft,this._captured=!1,this._didDrag=!1,this._dragPointerId=t.pointerId,this._lastX=t.clientX,this._lastT=performance.now(),this._velocity=0)}_onPointerMove(t){if(null==this._dragStartX)return;const e=t.clientX-this._dragStartX;if(!this._captured&&Math.abs(e)>4&&(this._captured=!0,this._didDrag=!0,t.currentTarget.setPointerCapture(this._dragPointerId)),!this._captured)return;t.currentTarget.scrollLeft=this._dragStartScroll-e;const i=performance.now(),s=i-this._lastT;if(s>0){const e=(this._lastX-t.clientX)/s;this._velocity=.7*this._velocity+.3*e,this._lastX=t.clientX,this._lastT=i}}_onPointerUp(t){if(null==this._dragStartX)return;const e=t.currentTarget;e.releasePointerCapture?.(t.pointerId),this._dragStartX=null,this._captured=!1,Math.abs(this._velocity)>.05&&this._startMomentum(e)}_startMomentum(t){let e=this._velocity,i=performance.now();const s=()=>{const o=performance.now(),n=Math.min(32,o-i);i=o;const a=t.scrollLeft;t.scrollLeft+=e*n,t.scrollLeft!==a?(e*=Math.pow(.95,n/16),this._raf=Math.abs(e)>.02?requestAnimationFrame(s):null):this._raf=null};this._raf=requestAnimationFrame(s)}_stopMomentum(){this._raf&&(cancelAnimationFrame(this._raf),this._raf=null)}disconnectedCallback(){super.disconnectedCallback(),this._stopMomentum()}_tap(t){if(this._didDrag)return void(this._didDrag=!1);if(this._fireHaptic?.("selection"),t.tap_action)return void this._handleAction(t.tap_action);const e=this._stateObj,i=e?.entity_id?.split(".")[0],s=t.value??t.label;"select"!==i&&"input_select"!==i||null==s||this._callService(i,"select_option",{entity_id:e.entity_id,option:String(s)})}render(){if(!this.hass||!this.config)return I``;const t=this._selected,e=(this._isTemplate(this.config.color)?this._resolvedColor:this.config.color)||"var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))",i=(this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on)||"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))";return I`
      <ha-card style="--mcar-bg:${e};--mcar-fg:${i};">
        <div
          class="rail"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${this._items().map(e=>{const i=e.value??e.label,s=t.some(t=>t===String(i));return I`
              <button class="tile ${s?"on":""}" @click=${()=>this._tap(e)} aria-pressed=${s?"true":"false"}>
                <div class="top">
                  ${e.icon?I`<ha-icon class="glyph" .icon=${e.icon}></ha-icon>`:I`<span></span>`}
                  <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
                </div>
                <div class="bottom">
                  <span class="name">${e.label??i}</span>
                  ${e.secondary?I`<span class="sub">${e.secondary}</span>`:V}
                </div>
              </button>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-carousel",Ci),window.customCards=window.customCards||[],window.customCards.push({type:"materia-carousel",name:"Materia Carousel",description:"Scroll-snapping row of selectable tiles — the richer alternative to a chip row.",preview:!0});const Si=[kt,wt,$t,gt,n`
    ha-card.panel {
      display: flex;
      flex-direction: column;
      gap: 4px; /* hero sits close to its stack — one tight menu-style gap */
    }

    /* ---- connected stack: 2px seams, 8px inner corners, 24px outers ------- */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stack > .seg {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 8px;
      padding: 10px 14px;
      box-sizing: border-box;
    }

    .stack > .seg:first-child {
      border-radius: 24px 24px 8px 8px;
    }

    .stack > .seg:last-child {
      border-radius: 8px 8px 24px 24px;
    }

    .stack > .seg:only-child {
      border-radius: 24px;
    }

    .seg materia-button-group {
      display: block;
    }

    materia-climate-dial {
      display: block;
      /* Trim the embedded dial's padding — halved top edge, the panel's own
         gap is the hero/stack separation; stacking both read as a hole. */
      --th-padding: clamp(4px, 2cqi, 9px) clamp(12px, 5cqi, 24px) 2px;
    }

    /* Menu-style section: the seg provides the group silhouette, the embedded
       materia-menu goes transparent inside it. NO extra padding — the
       trigger's own 18px inset already matches the accordion bars. */
    .stack > .seg.menu-seg {
      padding: 0;
    }

    .seg.menu-seg materia-menu {
      --ha-card-background: transparent;
      display: block;
    }

    /* reserve_height: the stack gets a JS-measured min-height (tallest
       section); the open section absorbs the reserved space. */
    .stack.reserve > .seg.acc-sec.open {
      flex: 1 0 auto;
    }

    /* ---- wallet accordion INSIDE the connected stack ------------------------
       The sections keep the group silhouette (2px seams, positional 8/24px
       corners from the .seg first/last rules). Wallet cues: closed bars are
       compact and slightly muted; the open one grows tall on the expressive
       spring and carries the full card tone. */
    .stack > .seg.acc-sec {
      padding: 0;
      overflow: hidden;
      background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 78%, var(--md-sys-color-surface, var(--ha-card-background)));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .stack > .seg.acc-sec.open {
      background: var(--ha-card-background, var(--card-background-color));
    }

    .acc-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* Open: the bar hands its bottom padding to the body so header and
       content sit on the group's seam rhythm, not a double gap. */
    .acc-sec.open .acc-bar {
      padding-bottom: 8px;
    }

    .acc-icon {
      --mdc-icon-size: 20px;
      opacity: 0.9;
      flex-shrink: 0;
    }

    .acc-title {
      font-family: var(--materia-font-display, inherit);
      font-size: 14px;
      font-weight: 600;
      flex: 1;
      /* C-morph: weight rides the open spring with the size. */
      transition:
        font-size var(--md-sys-motion-expressive-default-spatial),
        font-weight var(--md-sys-motion-expressive-default-spatial);
    }

    .acc-sec.open .acc-title {
      font-size: 16px;
      font-weight: 700;
    }

    .acc-info {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.7;
      white-space: nowrap;
    }

    .acc-chev {
      --mdc-icon-size: 22px;
      opacity: 0.55;
      flex-shrink: 0;
    }

    .acc-body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--md-sys-motion-expressive-default-spatial);
    }

    .acc-sec.open .acc-body {
      grid-template-rows: 1fr;
    }

    .acc-inner {
      overflow: hidden;
      min-height: 0;
    }

    /* All off/on — right side of the OPEN bar, no orphan band. */
    .acc-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    .mini {
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .mini:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .acc-cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 12px 8px; /* halved bottom edge of the open section */
    }
  `],Ei="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:var(--md-sys-color-secondary-container, rgba(120,120,128,.14));color:var(--md-sys-color-on-secondary-container, inherit);margin-bottom:6px;cursor:pointer;",Ai="border:none;background:transparent;color:inherit;cursor:pointer;padding:4px;display:grid;place-items:center;border-radius:50%;--mdc-icon-size:18px;",Mi="border:1.5px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.2));background:transparent;color:inherit;font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;";customElements.define("materia-climate-panel-editor",class extends qt{static properties={_secIdx:{state:!0},_cardIdx:{state:!0},_huiReady:{state:!0}};connectedCallback(){super.connectedCallback(),this._loadHui()}async _loadHui(){if(customElements.get("hui-card-picker")&&customElements.get("hui-card-element-editor"))this._huiReady=!0;else{try{const t=await pt(),e=await t.createCardElement({type:"vertical-stack",cards:[]});await(e?.constructor?.getConfigElement?.())}catch{}this._huiReady=!!customElements.get("hui-card-picker")}}_formData(){return{...this._config}}get _secs(){return this._config?.sections||[]}_setSecs(t){const e={...this._config};t.length?e.sections=t:delete e.sections,this._commit(e)}_patchSec(t,e){const i=[...this._secs],s={...i[t],...e};for(const t of Object.keys(e))void 0!==e[t]&&""!==e[t]&&null!==e[t]||delete s[t];i[t]=s,this._setSecs(i)}_moveSec(t,e){const i=[...this._secs],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._setSecs(i))}_addSec(){const t=this._secs.length;this._setSecs([...this._secs,{title:"New section",style:"section",cards:[]}]),this._secIdx=t}_patchCards(t,e){this._patchSec(t,{cards:e})}render(){return this.hass&&this._config?null!=this._secIdx&&null!=this._cardIdx?this._renderCardView():null!=this._secIdx?this._renderSectionView():super.render():I``}_back(t,e){return I`
      <div style="display:flex;align-items:center;gap:8px;margin:4px 0 14px;">
        <button style=${Ai} @click=${e}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <span style="font-weight:600;font-size:15px;">${t}</span>
      </div>
    `}_sel(t,e,i,s){return I`
      <div style="margin-bottom:12px;" @value-changed=${t=>{t.stopPropagation(),s(t.detail.value)}}>
        <ha-selector .hass=${this.hass} .selector=${e} .value=${i} .label=${t}></ha-selector>
      </div>
    `}_renderExtra(){return I`
      <ha-expansion-panel outlined .header=${"Sections"} .secondary=${"Wallet sections and menus below the mode group"} .expanded=${!0}>
        <ha-icon slot="leading-icon" icon="mdi:wallet-outline"></ha-icon>
        <div style="padding:12px;">
          ${this._secs.map((t,e)=>I`
            <div style=${Ei} @click=${()=>{this._secIdx=e}}>
              <span style="opacity:.6;font-weight:600;">${e+1}</span>
              <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${t.title||("menu"===t.style?"Menu":"Section")}
              </span>
              <span style="opacity:.6;font-size:12px;">${"menu"===t.style?"menu":`${(t.cards||[]).length} cards`}</span>
              <button style=${Ai} title="Move up" @click=${t=>{t.stopPropagation(),this._moveSec(e,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button style=${Ai} title="Move down" @click=${t=>{t.stopPropagation(),this._moveSec(e,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button style=${Ai} title="Edit" @click=${t=>{t.stopPropagation(),this._secIdx=e}}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button style=${Ai} title="Delete" @click=${t=>{t.stopPropagation(),this._setSecs(this._secs.filter((t,i)=>i!==e))}}><ha-icon icon="mdi:delete"></ha-icon></button>
            </div>
          `)}
          <button style=${Mi} @click=${()=>this._addSec()}>
            <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add section
          </button>
        </div>
      </ha-expansion-panel>
    `}_renderSectionView(){const t=this._secIdx,e=this._secs[t];if(!e)return this._secIdx=null,I``;const i="menu"===e.style?"menu":"section";return I`
      ${this._back(e.title||`Section ${t+1}`,()=>{this._secIdx=null})}
      ${this._sel("Title",{text:{}},e.title,e=>this._patchSec(t,{title:e}))}
      ${this._sel("Icon",{icon:{}},e.icon,e=>this._patchSec(t,{icon:e}))}
      ${this._sel("Style",{select:{mode:"dropdown",options:[{value:"section",label:"Wallet section (nested cards)"},{value:"menu",label:"Menu (tap opens options)"}]}},i,e=>this._patchSec(t,{style:e}))}
      ${"menu"===i?this._renderMenuFields(t,e):this._renderSectionCards(t,e)}
    `}_renderMenuFields(t,e){const i=e.options||[],s=(e,s)=>{const o=i.map((t,i)=>i===e?{...t,...s}:t);for(const t of Object.keys(s))""!==s[t]&&null!=s[t]||delete o[e][t];this._patchSec(t,{options:o})};return I`
      ${this._sel("Entity (select / input_select / water_heater)",{entity:{}},e.entity,e=>this._patchSec(t,{entity:e}))}
      ${this._sel("Substate (secondary line — supports templates)",{template:{}},e.substate,e=>this._patchSec(t,{substate:e}))}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Manual options (override the entity's)</div>
      ${i.map((e,o)=>I`
        <div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:8px;">
          <div style="flex:1;" @value-changed=${t=>{t.stopPropagation(),s(o,{label:t.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${e.label} .label=${"Label"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${t=>{t.stopPropagation(),s(o,{value:t.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${e.value} .label=${"Value"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${t=>{t.stopPropagation(),s(o,{icon:t.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${e.icon} .label=${"Icon"}></ha-selector>
          </div>
          <button style="${Ai}margin-top:12px;" title="Remove option"
            @click=${()=>this._patchSec(t,{options:i.filter((t,e)=>e!==o)})}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>
      `)}
      <button style=${Mi} @click=${()=>this._patchSec(t,{options:[...i,{label:"",value:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add option
      </button>
    `}_renderActions(t,e){const i=e.actions||[],s=(e,s)=>{const o=i.map((t,i)=>i===e?{...t,...s}:t);for(const t of Object.keys(s))""!==s[t]&&null!=s[t]||delete o[e][t];this._patchSec(t,{actions:o})};return I`
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Bar actions (chips in the open bar)</div>
      ${i.map((e,o)=>I`
        <div style="border:1px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.15));border-radius:12px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:flex-start;">
            <div style="flex:1;" @value-changed=${t=>{t.stopPropagation(),s(o,{label:t.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${e.label} .label=${"Label"}></ha-selector>
            </div>
            <div style="flex:1;" @value-changed=${t=>{t.stopPropagation(),s(o,{icon:t.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${e.icon} .label=${"Icon"}></ha-selector>
            </div>
            <button style="${Ai}margin-top:12px;" title="Remove action"
              @click=${()=>this._patchSec(t,{actions:i.filter((t,e)=>e!==o)})}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </button>
          </div>
          <div style="margin-top:8px;" @value-changed=${t=>{t.stopPropagation(),s(o,{tap_action:t.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{ui_action:{}}} .value=${e.tap_action} .label=${"Action"}></ha-selector>
          </div>
        </div>
      `)}
      <button style="${Mi}margin-bottom:12px;" @click=${()=>this._patchSec(t,{actions:[...i,{label:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add action
      </button>
    `}_renderSectionCards(t,e){const i=e.cards||[],s=(e,s)=>{const o=e+s;if(o<0||o>=i.length)return;const n=[...i];[n[e],n[o]]=[n[o],n[e]],this._patchCards(t,n)};return I`
      ${this._sel("Info (closed-bar text — supports templates)",{template:{}},e.info,e=>this._patchSec(t,{info:e}))}
      ${this._sel("…or info from an entity's state",{entity:{}},e.info_entity,e=>this._patchSec(t,{info_entity:e}))}
      ${this._renderActions(t,e)}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Cards</div>
      ${i.map((e,o)=>I`
        <div style=${Ei} @click=${()=>{this._cardIdx=o}}>
          <span style="opacity:.6;font-weight:600;">${o+1}</span>
          <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.type||"card"}</span>
          <button style=${Ai} title="Move up" @click=${t=>{t.stopPropagation(),s(o,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button style=${Ai} title="Move down" @click=${t=>{t.stopPropagation(),s(o,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
          <button style=${Ai} title="Edit" @click=${t=>{t.stopPropagation(),this._cardIdx=o}}><ha-icon icon="mdi:pencil"></ha-icon></button>
          <button style=${Ai} title="Delete" @click=${e=>{e.stopPropagation(),this._patchCards(t,i.filter((t,e)=>e!==o))}}><ha-icon icon="mdi:delete"></ha-icon></button>
        </div>
      `)}
      ${this._huiReady?I`<hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${e=>{e.stopPropagation(),this._patchCards(t,[...i,e.detail.config])}}
          ></hui-card-picker>`:I`<div style="opacity:.7;font-size:12px;margin-top:8px;">Card picker unavailable — add cards via the YAML editor.</div>`}
    `}_renderCardView(){const t=this._secIdx,e=this._cardIdx,i=this._secs[t]?.cards?.[e];return i?I`
      ${this._back(i.type||"Card",()=>{this._cardIdx=null})}
      ${customElements.get("hui-card-element-editor")?I`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            .value=${i}
            @config-changed=${i=>{i.stopPropagation();const s=[...this._secs[t].cards||[]];s[e]=i.detail.config,this._patchCards(t,s)}}
          ></hui-card-element-editor>`:V}
    `:(this._cardIdx=null,I``)}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"reserve_height",label:"Keep the height of the tallest section (no reflow when cycling)",selector:{boolean:{}}}]},{title:"Dial",icon:"mdi:thermostat",fields:[{name:"temperature_entity",label:"Current-temp sensor (marker on the dial)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"step",label:"Step",selector:{number:{min:.1,max:2,step:.1,mode:"box"}}},{name:"min_temp",label:"Dial min (default: entity)",selector:{number:{min:-30,max:40,step:.5,mode:"box"}}},{name:"max_temp",label:"Dial max (default: entity)",selector:{number:{min:0,max:60,step:.5,mode:"box"}}},{name:"steppers",label:"Stepper placement",selector:{select:{mode:"dropdown",options:[{value:"side",label:"Vertical, beside the dial"},{value:"below",label:"Below the dial"}]}}},{name:"wave",label:"Wave animation",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (hvac_action, or inferred from temps)"},{value:"always",label:"Always (whenever the mode is on)"},{value:"never",label:"Never"}]}}}]}]}});const Ti=[kt,wt,$t,gt,n`
    ha-card {
      container-type: inline-size;
      border-radius: 28px;
      /* Overridable when embedded (climate panel tightens the bottom). */
      padding: var(--th-padding, clamp(12px, 5cqi, 24px));
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(4px, 2cqi, 12px);
    }

    .dial-wrap {
      position: relative;
      width: min(100%, 340px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
    }

    .dial {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      /* The svg itself is inert — only the hit-ring interacts, so swipes and
         scrolls starting over the card body pass through (swipe-card etc). */
      pointer-events: none;
    }

    .hit-ring {
      fill: none;
      stroke: transparent;
      stroke-width: 16;
      stroke-linecap: round;
      pointer-events: stroke;
      touch-action: none;
      cursor: pointer;
    }

    .track {
      fill: none;
      stroke: var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.08));
      stroke-width: 5;
      stroke-linecap: round;
    }

    .sweep {
      fill: none;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .current-dot {
      fill: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
    }

    .current-knob {
      stroke: var(--md-sys-color-surface, #fff);
      stroke-width: 1.4;
    }

    /* Handle: a SOLID accent circle with the cookie as negative space inside
       (two layers — not a ring around a disc around a cookie). */
    .thumb {
      stroke: none;
    }

    .thumb-cookie {
      fill: var(--md-sys-color-surface, #fff);
    }

    /* Off: setpoint still visible, just quiet. */
    .thumb.muted {
      fill: var(--md-sys-color-on-surface-variant, #888);
      opacity: 0.8;
    }

    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .mode-label {
      font-size: clamp(14px, 6cqi, 18px);
      font-weight: 500;
      opacity: 0.85;
    }

    .target {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(44px, 22cqi, 72px);
      font-weight: 600; /* Outfit carries scale without the 700 shout */
      line-height: 1;
      letter-spacing: -0.02em;
      display: flex;
      align-items: flex-start;
      font-variant-numeric: tabular-nums;
      transition: font-weight var(--md-sys-motion-fast-effects);
    }

    /* C-morph: live adjustment thickens the numeral on the variable axis. */
    .target.adjusting {
      font-weight: 680;
    }

    @media (prefers-reduced-motion: reduce) {
      .target {
        transition: none;
      }

      .target.adjusting {
        font-weight: 600;
      }
    }

    .target .deg {
      font-size: 0.38em;
      font-weight: 600;
      margin-top: 0.18em;
      opacity: 0.9;
    }

    .current-label {
      font-size: clamp(12px, 5cqi, 15px);
      font-weight: 500;
      opacity: 0.7;
    }

    .nudge {
      display: flex;
      gap: 2px; /* connected-group spec seam */
      margin-top: calc(-1 * clamp(8px, 4cqi, 20px));
    }

    /* Side layout: dial and a LARGE vertical +/- column side by side. */
    .dial-row {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .dial-row.side {
      gap: clamp(10px, 4cqi, 22px);
    }

    .dial-row.side .dial-wrap {
      width: min(72%, 300px);
    }

    /* M3 Expressive connected pair: outer corners pill, inner corners small
       (the connected-group silhouette). Pressing a segment EXPANDS it while
       its neighbor compresses (animated flex-grow) and its shape morphs to a
       full pill — the signature expressive button-group interaction. Colors
       follow the active mode's climate palette. */
    .nudge {
      width: min(72%, 280px);
    }

    /* Matches materia-button-group "tonal" segments exactly — the steppers
       and the mode row below read as one component family. */
    .nudge .seg {
      flex: 1 1 0;
      height: clamp(48px, 16cqi, 58px);
      border: none;
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Effects easing (NO overshoot): a springy radius overshoots past the
         target on release, pokes through the container's pill clip and reads
         as bounce+flicker under repeated taps. */
      transition:
        border-radius var(--md-sys-motion-fast-effects),
        background-color var(--md-sys-motion-fast-effects);
    }

    .nudge .seg.minus {
      border-radius: 999px 10px 10px 999px;
    }

    .nudge .seg.plus {
      border-radius: 10px 999px 999px 10px;
    }

    .nudge .seg ha-icon {
      --mdc-icon-size: clamp(22px, 8cqi, 26px);
    }

    .nudge .seg:active {
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, var(--md-sys-color-secondary-container));
    }

    /* Vertical column (steppers: side) — MUST come after the generic .nudge
       rules: equal specificity means source order decides the cascade. */
    /* EXACTLY materia-button-group's construction, rotated: a pill container
       whose overflow clips the outer corners, buttons with one uniform
       size-scaled inner radius, a 2px seam, currentColor state layer, and the
       expressive flex-grow press morph. */
    .nudge.vertical {
      flex-direction: column;
      margin: 0;
      gap: 2px;
      width: clamp(56px, 18cqi, 74px);
      height: clamp(154px, 54cqi, 222px);
      border-radius: 999px;
      overflow: hidden;
    }

    .nudge.vertical .seg {
      flex: 1 1 0;
      width: 100%;
      height: auto;
      /* group innerCorner ratio (16 @ 48px l, 20 @ 56px xl) scaled to width */
      border-radius: clamp(18px, 6cqi, 26px);
      position: relative;
      overflow: hidden;
    }

    .nudge.vertical .seg::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .nudge.vertical .seg:hover::before {
      opacity: 0.08;
    }

    .nudge.vertical .seg:active::before {
      opacity: 0.12;
    }

    .nudge.vertical .seg ha-icon {
      --mdc-icon-size: clamp(24px, 8cqi, 28px);
    }

    /* Press = icon-button feedback (shape morph + state layer), NOT the
       group's flex-grow selection morph — steppers get mashed repeatedly and
       a layout reflow inside the clipping pill container both clips on
       release and looks frantic under rapid taps. */
    .nudge.vertical .seg:active {
      border-radius: 999px;
    }

    materia-button-group {
      width: 100%;
      margin-top: clamp(4px, 2cqi, 10px);
    }
  `],Fi=-135,zi=270,Oi="var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))",Di="var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))",Pi={auto:{icon:"mdi:thermostat-auto",color:Oi,on:Di,container:Di,onContainer:Oi},heat_cool:{icon:"mdi:thermostat-auto",color:Oi,on:Di,container:Di,onContainer:Oi},heat:{icon:"m3o:mode-heat",color:"var(--md-sys-cust-color-climate-heat-accent, #a14614)",on:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",container:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",onContainer:"var(--md-sys-cust-color-climate-heat-accent, #a14614)"},cool:{icon:"mdi:snowflake",color:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)",on:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",container:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",onContainer:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)"},dry:{icon:"mdi:water-percent",color:Oi,on:Di,container:Di,onContainer:Oi},fan_only:{icon:"mdi:fan",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"},off:{icon:"m3o:power-settings-new",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"}};class Ui extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_adjusting:{state:!0}};static styles=Ti;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}connectedCallback(){super.connectedCallback(),this._phase=0,this._amp=0,this._startLoop()}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),clearTimeout(this._optimisticTimer),clearTimeout(this._sendTimer)}get _entity(){return this.hass?.states[this.config.entity]}get _action(){return this._entity?.attributes?.hvac_action??""}get _waveAction(){const t=this._mode;if("off"===t||"never"===this.config.wave)return"";if("always"===this.config.wave)return"cool"===t?"cooling":"heating";const e="auto"===t||"heat_cool"===t,i=e?"holding":"",s=this._action;if("heating"===s||"cooling"===s)return s;if(s&&"idle"!==s)return"";const o=this._current,n=this._target;return null==n||"idle"===s?i:null==o?"cool"===t?"cooling":"heat"===t?"heating":i:("heat"===t||e)&&o<n-.2?"heating":("cool"===t||e)&&o>n+.2?"cooling":i}get _mode(){return this._entity?.state??"off"}get _target(){return null!=this._optimisticTemp?this._optimisticTemp:this._numRaw(this._entity?.attributes?.temperature)}get _current(){if(this.config.temperature_entity){const t=this.hass?.states[this.config.temperature_entity];if(t)return this._numRaw(t.state)}return this._numRaw(this._entity?.attributes?.current_temperature)}_numRaw(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}get _step(){return this.config.step??this._numRaw(this._entity?.attributes?.target_temp_step)??.5}get _scale(){return{min:this.config.min_temp??this._numRaw(this._entity?.attributes?.min_temp)??7,max:this.config.max_temp??this._numRaw(this._entity?.attributes?.max_temp)??35}}_startLoop(){if(this._raf)return;const t=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,e=()=>{const i=this._waveAction,s="heating"===i||"cooling"===i,o=t?0:s?1:"holding"===i?.35:0,n=this._amp+.06*(o-this._amp),a=Math.abs(n-o)<.01;if(this._amp=a?o:n,this._amp>.005||o>0){this._phase+="cooling"===i?.012:s?-.012:-.008;const t=this._waveGeom;if(t){const e=this.renderRoot?.querySelector("path.wave-seg");e&&e.setAttribute("d",this._wavePath(t.start,t.end,t.r))}this._raf=requestAnimationFrame(e)}else this._raf=null};this._raf=requestAnimationFrame(e)}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}updated(t){if(this._waveAction&&!this._raf&&this._startLoop(),t.has("hass")&&null!=this._optimisticTemp){const t=this._numRaw(this._entity?.attributes?.temperature);null!=t&&Math.abs(t-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}_modeGroupConfig(t,e,i){const s=`${this.config.entity}|${t.join()}|${e}|${i}|${this.config.mode_size??"m"}`;return this._mgKey!==s&&(this._mgKey=s,this._mgConfig={entity:this.config.entity,size:this.config.mode_size??"m",variant:"tonal",active_shape:"square",color_active:e,color_on_active:i,options:t.map(t=>({icon:Pi[t].icon,value:t,tap_action:{action:"perform-action",perform_action:"climate.set_hvac_mode",data:{hvac_mode:t},target:{entity_id:this.config.entity}}}))}),this._mgConfig}_angleFor(t,e,i){const s=Math.min(1,Math.max(0,(t-e)/(i-e)));return Fi+zi*s}_pointAt(t,e,i=0){const s=(t-90)*Math.PI/180,o=e+i;return[50+o*Math.cos(s),50+o*Math.sin(s)]}_wavePath(t,e,i){const s=e-t,o=1+.55*Math.max(0,Math.min(1,(90-s)/70)),n=Math.min(20,Math.max(6,s/3)),a=3.2*o*this._amp,r=[];for(let s=t;s<=e;s+=2){const o=s-t,l=a*Math.min(1,o/n)*Math.min(1,(e-s)/n)*Math.sin(o/7+this._phase);r.push(this._pointAt(s,i,l))}return r.push(this._pointAt(e,i,0)),"M"+r.map(([t,e])=>`${t.toFixed(2)} ${e.toFixed(2)}`).join(" L")}_arcPath(t,e,i){const[s,o]=this._pointAt(t,i),[n,a]=this._pointAt(e,i),r=e-t>180?1:0;return`M${s.toFixed(2)} ${o.toFixed(2)} A${i} ${i} 0 ${r} 1 ${n.toFixed(2)} ${a.toFixed(2)}`}_setTarget(t){const{min:e,max:i}=this._scale,s=this._step,o=Math.round(100*Math.min(i,Math.max(e,Math.round(t/s)*s)))/100;this._optimisticTemp=o,this._adjusting=!0,clearTimeout(this._adjustTimer),this._adjustTimer=setTimeout(()=>{this._adjusting=!1},650),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4),clearTimeout(this._sendTimer),this._sendTimer=setTimeout(()=>{this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:o})},350)}_nudge(t){const e=this._target;null!=e&&this._setTarget(e+t)}_dialPointer(t){if(!this._dialDragging&&"pointerdown"!==t.type)return;const e=this.renderRoot.querySelector(".dial").getBoundingClientRect(),i=(t.clientX-e.left)/e.width*100-50,s=(t.clientY-e.top)/e.height*100-50;let o=180*Math.atan2(s,i)/Math.PI+90;if(o>180&&(o-=360),o<-143||o>143)return;const n=Math.min(1,Math.max(0,(o-Fi)/zi)),{min:a,max:r}=this._scale;"pointerdown"===t.type&&(this._dialDragging=!0,t.currentTarget.setPointerCapture(t.pointerId)),this._setTarget(a+n*(r-a))}_endDialDrag(t){this._dialDragging=!1,t.currentTarget.releasePointerCapture?.(t.pointerId)}render(){if(!this.hass||!this.config)return I``;const t=this._entity;if(!t)return I``;const e=this._isUnavailable(t),{min:i,max:s}=this._scale,o=this._target,n=this._current,a=this._mode,r=this._waveAction,l=Pi[a]||Pi.off,c="off"!==a&&null!=o,d=42,h=c?this._angleFor(o,i,s):Fi,p=null!=o?this._angleFor(o,i,s):null,[u,m]=this._pointAt(c?h:p??h,d),g=null!=n?this._angleFor(n,i,s):null;let f=null,_=null,b=null;c&&"holding"===r?(_=Fi,b=null!=g?Math.max(g,h):h):c&&null!=g?(f=Math.min(g,h),_=f,b=Math.max(g,h)):c&&(_=Fi,b=h);const v="heating"===r?Pi.heat:"cooling"===r?Pi.cool:l,y=v.color,x=v.on,w=this.hass.formatEntityState?.(t)??a,$=this.hass.config?.unit_system?.temperature??"°C",k=(this.config.hvac_modes??t.attributes.hvac_modes??[]).filter(t=>Pi[t]);return this._waveGeom=c&&null!=b&&b>_+.5?{start:_,end:b,r:d}:null,I`
      <ha-card
        class="${e?"unavailable":""}"
        style="--th-container:${v.container};--th-on-container:${v.onContainer};"
      >
        <div class="dial-row ${"side"===this.config.steppers?"side":""}">
        <div class="dial-wrap">
          <svg class="dial" viewBox="0 0 100 100">
            <!-- Invisible wide stroke along the track: the ONLY interactive
                 zone. Swipes/scrolls starting elsewhere on the card pass
                 through untouched (e.g. to a surrounding swipe-card). -->
            <path
              d=${this._arcPath(Fi,135,d)}
              class="hit-ring"
              @pointerdown=${this._dialPointer}
              @pointermove=${this._dialPointer}
              @pointerup=${this._endDialDrag}
              @pointercancel=${this._endDialDrag}
            />
            ${(()=>{const t=c?Math.max(h,g??h):Fi,e=c?Math.min(t+8,135):Fi;return e<134.5?H`<path d=${this._arcPath(e,135,d)} class="track" />`:""})()}
            ${c||null==g?"":H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="1.6" class="current-dot" />`}
            ${c&&null!=f&&f>-134.5?H`<path d=${this._arcPath(Fi,f,d)} class="sweep" style="stroke:${y}" />`:""}
            ${c&&null!=b&&b>_+.5?H`<path d=${this._wavePath(_,b,d)} class="sweep wave-seg" style="stroke:${y}" />`:""}
            ${c&&null!=g?H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="3.4" class="current-knob" style="fill:${y}" />`:""}
            ${c?H`<g>
                  <circle cx=${u} cy=${m} r="5.5" class="thumb" style="fill:${y}" />
                  <path d=${Jt(u,m,3.7,12)} class="thumb-cookie" />
                </g>`:null!=p?H`<g>
                    <circle cx=${u} cy=${m} r="5.5" class="thumb muted" />
                    <path d=${Jt(u,m,3.7,12)} class="thumb-cookie" />
                  </g>`:""}
          </svg>
          <div class="center" @click=${()=>this._fireMoreInfo(this.config.entity)}>
            <div class="mode-label">${w}</div>
            <div class="target ${this._adjusting?"adjusting":""}">
              ${null!=o?Math.round(10*o)/10:null!=n?Math.round(10*n)/10:"—"}<span class="deg">${$}</span>
            </div>
            ${null!=n&&!1!==this.config.show_current?I`<div class="current-label">${this.config.current_label??"Currently"} ${Math.round(10*n)/10}°</div>`:""}
          </div>
        </div>
        ${"side"===this.config.steppers?I`<div class="nudge vertical">
              <button class="seg plus" @click=${()=>this._nudge(this._step)}>
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
              <button class="seg minus" @click=${()=>this._nudge(-this._step)}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
            </div>`:""}
        </div>

        ${"side"===this.config.steppers?"":I`<div class="nudge">
              <button class="seg minus" @click=${()=>this._nudge(-this._step)}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="seg plus" @click=${()=>this._nudge(this._step)}>
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>`}

        ${!1!==this.config.show_modes&&k.length?I`<materia-button-group
              .hass=${this.hass}
              .config=${this._modeGroupConfig(k,y,x)}
            ></materia-button-group>`:""}
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 5}}customElements.define("materia-climate-dial",Ui),window.customCards=window.customCards||[];const qi={heat:["var(--md-sys-cust-color-climate-heat-accent, #a14614)","var(--md-sys-cust-color-climate-heat-container, #ffeee9)"],cool:["var(--md-sys-cust-color-climate-cool-accent, #327ea7)","var(--md-sys-cust-color-climate-cool-container, #eaf3ff)"],auto:["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))","var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],heat_cool:["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))","var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],off:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"]};class Ri extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_openSection:{state:!0}};static styles=Si;static getConfigElement(){return document.createElement("materia-climate-panel-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("climate."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("Materia Climate Panel: entity is required");this.config={...t},this._extraEls=null,this.isConnected&&this._createExtraCards()}firstUpdated(){this._createExtraCards()}updated(t){if(t.has("hass")&&this._extraEls){const t=this._openSection??0;this._extraEls[t]?.forEach(t=>{t.hass=this.hass})}this._reserveHeight()}get _entity(){return this.hass?.states[this.config.entity]}_modeGroup(){const t=(this._entity?.attributes?.hvac_modes||[]).filter(t=>["heat","auto","off","cool","heat_cool"].includes(t));if(!t.length)return V;const[e,i]=qi[this._entity?.state]??qi.off;return I`
      <materia-button-group
        .hass=${this.hass}
        .config=${{entity:this.config.entity,size:"m",variant:"tonal",active_shape:"square",color_active:e,color_on_active:i,options:t.map(t=>({icon:{heat:"m3o:mode-heat",cool:"mdi:snowflake",auto:"mdi:thermostat-auto",heat_cool:"mdi:thermostat-auto",off:"m3o:power-settings-new"}[t],value:t,tap_action:{action:"perform-action",perform_action:"climate.set_hvac_mode",data:{hvac_mode:t},target:{entity_id:this.config.entity}}}))}}
      ></materia-button-group>
    `}get _sectionConfigs(){return(this.config.sections||[]).map(t=>({style:"section",...t}))}_menuCardConfig(t){const e={type:"custom:materia-menu",entity:t.entity,icon:t.icon,name:t.title,menu_variant:"expressive"};return t.options?.length&&(e.options=t.options),null!=t.substate&&(e.substate=t.substate),t.state_colors&&(e.state_colors=t.state_colors),e}async _createExtraCards(){const t=this._extraGen=(this._extraGen||0)+1,e=this._sectionConfigs;if(!e.length)return void(this._extraEls=[]);const i=await pt(),s=await Promise.all(e.map(async t=>{if("menu"===t.style)return[];const e=t.cards??(t.entity?[this._menuCardConfig(t)]:[]);return(await Promise.all(e.map(async t=>{try{const e=await i.createCardElement(t);return e.hass=this.hass,e}catch{return null}}))).filter(Boolean)}));t===this._extraGen&&(this._extraEls=s,this.requestUpdate())}_accordionSections(){return this._sectionConfigs.map((t,e)=>{let i="";if(null!=t.info)this._isTemplate(t.info)?(this._resolveTemplateValue(`secInfo${e}`,t.info),i=this._tplResults?.[`secInfo${e}`]??""):i=t.info;else if(t.info_entity){const e=this.hass.states[t.info_entity];i=e?this.hass.formatEntityState?.(e)??e.state:""}const s=t.actions?.length?I`
          <div class="acc-actions">
            ${t.actions.map(t=>I`
              <button class="mini" @click=${e=>{e.stopPropagation(),this._handleAction(t.tap_action)}}>
                ${t.icon?I`<ha-icon icon=${t.icon} style="--mdc-icon-size:15px;"></ha-icon>`:""}${t.label??""}
              </button>
            `)}
          </div>
        `:null;return{style:t.style,menuConfig:"menu"===t.style?this._menuCardConfig(t):null,title:t.title??`Section ${e+1}`,icon:t.icon,info:i,actions:s,body:this._extraEls?.[e]?.length?I`<div class="acc-cards">${this._extraEls[e]}</div>`:V}})}_openAcc(t){this._openSection!==t&&(this._openSection=t,this._fireHaptic("light"),this._extraEls?.[t]?.forEach(t=>{t.hass=this.hass}))}_reserveHeight(){const t=this.renderRoot?.querySelector(".stack");t&&(this.config.reserve_height?requestAnimationFrame(()=>{const e=[...t.querySelectorAll(".acc-inner")];if(!e.length)return;const i=t.querySelector(".acc-sec.open .acc-inner");t.style.minHeight="";const s=t.offsetHeight-(i?.offsetHeight||0),o=Math.max(...e.map(t=>t.scrollHeight));t.style.minHeight=`${s+o}px`}):t.style.minHeight="")}render(){if(!this.hass||!this.config)return I``;if(!this._entity)return I`<ha-card class="panel">Unknown entity: ${this.config.entity}</ha-card>`;const t=this._accordionSections(),e=t.findIndex(t=>"menu"!==t.style),i=this._openSection??e,s=this._entity.state,o="off"!==s&&qi[s],[n,a]=qi[s]??qi.off;return I`
      <ha-card class="panel" style=${o?`--ms-track:${n};--ms-thumb:${a};`:""}>
        <materia-climate-dial
          .hass=${this.hass}
          .config=${{entity:this.config.entity,show_modes:!1,wave:this.config.wave??"auto",steppers:this.config.steppers??"side",...null!=this.config.step?{step:this.config.step}:{},...null!=this.config.min_temp?{min_temp:this.config.min_temp}:{},...null!=this.config.max_temp?{max_temp:this.config.max_temp}:{},...this.config.temperature_entity?{temperature_entity:this.config.temperature_entity}:{}}}
        ></materia-climate-dial>
        <div class="stack ${this.config.reserve_height?"reserve":""}">
          <div class="seg">${this._modeGroup()}</div>
          ${t.map((t,e)=>"menu"===t.style?I`
              <div class="seg menu-seg">
                <materia-menu .hass=${this.hass} .config=${t.menuConfig}></materia-menu>
              </div>`:I`
              <div class="seg acc-sec ${i===e?"open":""}">
                <div class="acc-bar" @click=${()=>this._openAcc(e)}>
                  ${t.icon?I`<ha-icon class="acc-icon" icon=${t.icon}></ha-icon>`:""}
                  <span class="acc-title">${t.title}</span>
                  ${i===e?t.actions??V:I`<span class="acc-info">${t.info}</span><ha-icon class="acc-chev" icon="mdi:chevron-down"></ha-icon>`}
                </div>
                <div class="acc-body"><div class="acc-inner">${t.body}</div></div>
              </div>`)}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 6}}customElements.define("materia-climate-panel",Ri),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate-panel",name:"Materia Climate Panel",description:"Climate panel: thermostat dial hero, mode group, and wallet sections you compose with any cards or menus.",preview:!0});const ji={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},tertiary:{active:"var(--md-sys-color-tertiary)",onActive:"var(--md-sys-color-on-tertiary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat-container)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool-container)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto-container)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device)",onActive:"var(--md-sys-cust-color-on-device)"}},Ni={xs:{height:32,innerCorner:4},s:{height:40,innerCorner:8},m:{height:56,innerCorner:8},l:{height:96,innerCorner:16},xl:{height:136,innerCorner:20}},Li=[kt,wt,gt,n`
    .group {
      display: flex;
      gap: 2px;
      width: 100%;
      border-radius: 999px;
      overflow: hidden;
      background: transparent;
      box-sizing: border-box;
    }

    button {
      /* Content-sized, then grows to share leftover width — and never shrinks.
         A zero flex-basis divided the row equally regardless of label length,
         so the longest label was hard-clipped. M3 sizes connected buttons to
         their content. */
      flex: 1 0 auto;
      min-width: 0;
      border: none;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
      font-family: inherit;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    /* Safety net if the row is genuinely too cramped: ellipsis beats a cut. */
    button > span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    button::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    button:hover::before {
      opacity: 0.08;
    }

    button:active::before {
      opacity: 0.12;
    }

    button.inactive.filled {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
    }

    button.inactive.tonal {
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    /* Standard group: a spaced row of independent buttons. */
    .row {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .group.multi {
      flex-wrap: wrap;
      gap: 4px;
      height: auto !important;
      border-radius: 0;
    }

    .group.multi button {
      flex: 1 0 calc(100% / var(--btn-columns, 4) - 4px);
      height: var(--btn-height);
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* M3 Expressive connected group: the SELECTED button grows while its
       neighbors compress — the shape+size morph, not just a color swap. */
    .group:not(.multi) button.active {
      flex-grow: 1.4;
    }

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `],Bi=[kt,n`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* "wide" buttons grow to fill the row (and stretch when standalone) */
    :host([wide]) {
      flex: 1;
    }
    :host([wide]) .btn {
      width: 100%;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--mb-gap, 8px);
      height: var(--mb-h, 56px);
      min-width: var(--mb-h, 56px);
      padding: 0 var(--mb-px, 24px);
      border: none;
      box-sizing: border-box;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      font-size: var(--mb-font, 16px);
      color: inherit;
      background: transparent;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius 0.25s ease, background-color 0.25s ease,
        color 0.25s ease, box-shadow 0.25s ease;
    }

    /* icon-only → square footprint (width tracks height) */
    .btn.icon-only {
      padding: 0;
    }

    .btn ha-icon {
      --mdc-icon-size: var(--mb-icon, 24px);
      display: flex;
    }

    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.2;
      min-width: 0;
    }

    /* Stacked: icon above the text block, everything centered — the tall
       "Clean / Vac + mop" shape. Text stays centered as a column. */
    .btn.stacked {
      flex-direction: column;
      gap: 2px;
    }

    .btn.stacked .text {
      align-items: center;
    }

    .label {
      white-space: nowrap;
    }

    /* Substate line: the selected preset on a split button, the mode on a
       tall action button. Deliberately quieter than the label. */
    .sub {
      white-space: nowrap;
      font-size: 0.72em;
      font-weight: 500;
      opacity: 0.75;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    /* ---- sizes (M3 expressive) ---- */
    .size-xs { --mb-h: 32px;  --mb-icon: 20px; --mb-font: 14px; --mb-px: 12px; --mb-rsq: 12px; --mb-gap: 6px; }
    .size-s  { --mb-h: 40px;  --mb-icon: 20px; --mb-font: 14px; --mb-px: 16px; --mb-rsq: 12px; --mb-gap: 8px; }
    .size-m  { --mb-h: 56px;  --mb-icon: 24px; --mb-font: 16px; --mb-px: 24px; --mb-rsq: 16px; --mb-gap: 8px; }
    .size-l  { --mb-h: 96px;  --mb-icon: 32px; --mb-font: 24px; --mb-px: 48px; --mb-rsq: 28px; --mb-gap: 12px; }
    .size-xl { --mb-h: 136px; --mb-icon: 40px; --mb-font: 32px; --mb-px: 64px; --mb-rsq: 28px; --mb-gap: 16px; }
    /* legacy sizes (materia-icon-button compatibility) */
    .size-default { --mb-h: 48px; --mb-icon: 24px; --mb-font: 14px; --mb-px: 16px; --mb-rsq: 14px; --mb-gap: 8px; }
    .size-large   { --mb-h: 56px; --mb-icon: 24px; --mb-font: 16px; --mb-px: 20px; --mb-rsq: 16px; --mb-gap: 8px; }

    /* ---- shapes ---- */
    .shape-round  { border-radius: calc(var(--mb-h) / 2); }
    .shape-square { border-radius: var(--mb-rsq, 16px); }

    /* ---- connected (split-button): round outer edge, small inner edge ---- */
    .connected-leading {
      border-radius: calc(var(--mb-h) / 2) var(--mb-rsq, 16px) var(--mb-rsq, 16px) calc(var(--mb-h) / 2);
    }
    .connected-trailing {
      border-radius: var(--mb-rsq, 16px) calc(var(--mb-h) / 2) calc(var(--mb-h) / 2) var(--mb-rsq, 16px);
    }

    /* ---- variants ---- */
    .variant-filled {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }
    .variant-tonal {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }
    .variant-outlined {
      background: transparent;
      border: 1px solid var(--md-sys-color-outline);
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }
    .variant-text {
      background: transparent;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }
    .variant-elevated {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--md-sys-color-primary);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    /* ---- state layer ---- */
    .btn::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .btn:hover::before { opacity: 0.08; }
    .btn:active::before { opacity: 0.12; }

    .btn.disabled,
    .btn.unavailable {
      opacity: 0.38;
      pointer-events: none;
    }
  `];class Ii extends qt{static properties={_expanded:{state:!0},_actionRows:{state:!0}};static styles=[qt.styles,n`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .mapping-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .mapping-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .mapping-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mapping-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .mapping-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(t){super.setConfig(t),this._expanded??=null,this._actionRows??=Object.entries(t.tap_action_map||{}).map(([t,e])=>({state:t,tap_action:e}))}get _sections(){return[{title:"Button",icon:"mdi:gesture-tap-button",fields:[{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"label",template:!0,selector:{text:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"elevated",label:"Elevated"},{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"outlined",label:"Outlined"},{value:"text",label:"Text"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32)"},{value:"s",label:"S (40)"},{value:"m",label:"M (56)"},{value:"l",label:"L (96)"},{value:"xl",label:"XL (136)"}]}}},{name:"shape",selector:{select:{mode:"dropdown",options:[{value:"round",label:"Round (pill)"},{value:"square",label:"Square"}]}}},{name:"wide",selector:{boolean:{}}},{name:"entity",selector:{entity:{}}},{name:"disabled",helper:"Template returning true / false",selector:{template:{}}}]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"active_state",label:"Active state",helper:"State(s) considered active (defaults by domain)",selector:{text:{}}},{name:"morph_on_active",label:"Morph shape when active",selector:{boolean:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Default action",selector:{ui_action:{}}}]}]}_renderExtra(){const t=this._actionRows||[];return I`
      <div class="section-header">
        <span>Action mappings</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${t.map((t,e)=>I`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${t.state||`Mapping ${e+1}`}</span>
              <ha-icon-button @click=${()=>this._toggleExpand(e)}>
                <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeMapping(e)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded===e?I`
                  <div class="mapping-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._mappingSchema}
                      .computeLabel=${At}
                      @value-changed=${t=>this._updateMapping(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}get _mappingSchema(){return[{name:"state",required:!0,helper:"Use 'default' for the fallback",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_toggleExpand(t){this._expanded=this._expanded===t?null:t}_addMapping(){this._actionRows=[...this._actionRows||[],{state:""}],this._expanded=this._actionRows.length-1}_updateMapping(t,e){this._actionRows=(this._actionRows||[]).map((i,s)=>s===t?{...i,...e}:i),this._commitActionRows()}_removeMapping(t){this._actionRows=(this._actionRows||[]).filter((e,i)=>i!==t),this._expanded===t&&(this._expanded=null),this._commitActionRows()}_commitActionRows(){const t={};for(const e of this._actionRows||[])e.state&&e.tap_action&&(t[e.state]=e.tap_action);const{tap_action_map:e,...i}=this._config;this._commit(Object.keys(t).length?{...i,tap_action_map:t}:i)}}customElements.define("materia-button-editor",Ii);const Hi={"filled-tonal":"tonal",standard:"text"},Wi={light:"on",switch:"on",fan:"on",input_boolean:"on",vacuum:"cleaning",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing"};class Vi extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedLabel:{state:!0},_resolvedSubtitle:{state:!0},_resolvedDisabled:{state:!0}};static styles=Bi;static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"m",shape:"round"}}setConfig(t){if(!t.icon&&!t.label)throw new Error("icon or label is required");this.config={variant:"filled",size:"m",shape:"round",...t},this.toggleAttribute("wide",!!t.wide)}get _disabled(){const t=this.config?.disabled;if(null==t)return!1;if("boolean"==typeof t)return t;if(this._isTemplate(t)){const t=this._resolvedDisabled;return"True"===t||"true"===t||"1"===t}return"true"===t||"True"===t}updated(t){t.has("config")&&(this.toggleAttribute("wide",!!this.config?.wide),null!=this.config?.flex&&(this.style.flex=String(this.config.flex))),t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("label","_resolvedLabel"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("disabled","_resolvedDisabled"))}_isActive(t){if(!t)return!1;const e=t.entity_id.split(".")[0],i=this.config.active_state??Wi[e]??"on";return Array.isArray(i)?i.includes(t.state):t.state===String(i)}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const t=this.hass?.states[this.config.entity]?.state,e=this.config.tap_action_map[t]??this.config.tap_action_map.default;if(e)return e}return this.config.tap_action||this._defaultTapAction()}_handleTap(){this._disabled||this._handleAction(this._resolveTapAction())}render(){if(!this.config)return I``;const t=this.config.entity?this.hass?.states?.[this.config.entity]:void 0,e=!!this.config.entity&&this._isUnavailable(t),i=this._disabled,s=Hi[this.config.variant]||this.config.variant||"filled",o=this.config.size??"m";let n="",a="";if("number"==typeof o||/^\d+$/.test(String(o))){const t=Number(o);a=`--mb-h:${t}px;--mb-icon:${Math.round(.43*t)}px;--mb-font:16px;--mb-px:${Math.round(.42*t)}px;--mb-rsq:${Math.round(.28*t)}px;--mb-gap:8px;`}else n=`size-${o}`;const r="square"===this.config.shape?"square":"round",l=this._isActive(t),c=this.config.morph_on_active&&l?"square":r,d=this._isTemplate(this.config.icon)?this._resolvedIcon||"":this.config.icon,h=this._isTemplate(this.config.label)?this._resolvedLabel||"":this.config.label,p=this._isTemplate(this.config.subtitle)?this._resolvedSubtitle||"":this.config.subtitle,u="stacked"===this.config.layout,m=!h&&!p;return I`
      <button
        class="btn variant-${s} ${n} shape-${c} ${this.config.connected?`connected-${this.config.connected}`:""} ${m?"icon-only":""} ${u?"stacked":""} ${i?"disabled":""} ${e?"unavailable":""}"
        style=${a}
        @click=${this._handleTap}
      >
        ${d?I`<ha-icon .icon=${d}></ha-icon>`:V}
        ${h||p?I`<span class="text">
              ${h?I`<span class="label">${h}</span>`:V}
              ${p?I`<span class="sub">${p}</span>`:V}
            </span>`:V}
      </button>
    `}getCardSize(){return 1}}customElements.define("materia-button",Vi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"M3 button — icon and/or label, variants, sizes, shapes, and shape-morph on state.",preview:!0});const Xi=[kt,n`
    /* Match materia-button's host layout (flex, not inline-block) so the split
       button aligns vertically with regular buttons in a row. */
    :host {
      display: inline-flex;
      align-items: center;
    }

    /* "wide" grows the split button to fill the row; the leading button (also
       passed wide) flexes while the trailing stays a fixed icon-button width. */
    :host([wide]) {
      flex: 1;
    }
    :host([wide]) .wrap,
    :host([wide]) .split {
      width: 100%;
    }

    .wrap {
      position: relative;
      display: inline-flex;
    }

    .split {
      display: inline-flex;
      align-items: stretch;
      gap: 2px; /* M3: the inner space is always 2dp */
      height: var(--sb-h, 40px);
    }

    /* The leading materia-button colors and sizes itself from its own config. */
    .leading {
      display: flex;
    }

    .trailing {
      border: none;
      cursor: pointer;
      width: var(--sb-h, 40px); /* square → a circle when open (radius = h/2) */
      height: var(--sb-h, 40px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius 0.25s ease, background-color 0.2s ease;
      /* Inner corner small, outer corner fully round (mirrors connected-trailing) */
      border-radius: var(--sb-inner, 8px) calc(var(--sb-h) / 2) calc(var(--sb-h) / 2) var(--sb-inner, 8px);
    }
    /* Selected: trailing inner corners morph fully round (M3 selected = 50%) */
    .trailing.open {
      border-radius: calc(var(--sb-h) / 2);
    }

    /* M3 state layer */
    .trailing::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    .trailing:hover::before { opacity: 0.08; }
    .trailing:active::before { opacity: 0.12; }
    .trailing:focus-visible { outline: 2px solid var(--md-sys-color-primary, #6750a4); outline-offset: 2px; }

    .trailing ha-icon {
      --mdc-icon-size: var(--sb-ticon, 20px);
      display: flex;
    }

    /* The menu icon rotates 180° inwards when open (standard motion scheme) */
    .chev {
      transition: transform 0.25s ease;
    }
    .trailing.open .chev {
      transform: rotate(180deg);
    }

    /* ---- Trailing color per variant (matches the leading button) ---- */
    .filled .trailing {
      background: var(--sb-bg, var(--md-sys-color-primary));
      color: var(--sb-fg, var(--md-sys-color-on-primary));
    }
    .tonal .trailing,
    .filled-tonal .trailing {
      background: var(--sb-bg, var(--md-sys-color-secondary-container, var(--ha-card-background)));
      color: var(--sb-fg, var(--md-sys-color-on-secondary-container, var(--primary-text-color)));
    }
    .elevated .trailing {
      background: var(--sb-bg, var(--md-sys-color-surface-container-low, var(--card-background-color)));
      color: var(--sb-fg, var(--md-sys-color-primary, var(--primary-text-color)));
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
    }
    .outlined .trailing,
    .text .trailing {
      background: var(--sb-bg, transparent);
      color: var(--sb-fg, var(--md-sys-color-primary, var(--primary-text-color)));
      box-shadow: inset 0 0 0 1px var(--md-sys-color-outline, rgba(127, 127, 127, 0.4));
    }

    /* ---- Menu ---- */
    .menu {
      position: absolute;
      min-width: max(180px, 100%);
      box-sizing: border-box;
      padding: 8px;
      border-radius: 16px;
      z-index: 20;
      color: var(--primary-text-color);
      /* Opaque even when the theme's surface token carries alpha (stack the
         same color over itself). */
      --_surf: var(--md-sys-color-surface-container-high, var(--card-background-color, var(--ha-card-background, #1c1c1c)));
      background:
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        var(--_surf);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.16s ease, transform 0.16s ease;
    }
    .menu.open {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }

    /* Menu alignment: opens below or above, anchored to the left or right edge
       (M3 split-button menu placement). */
    .menu.dir-bottom-right {
      top: calc(100% + 4px);
      right: 0;
      transform-origin: top right;
      transform: scaleY(0.9);
    }
    .menu.dir-bottom-left {
      top: calc(100% + 4px);
      left: 0;
      transform-origin: top left;
      transform: scaleY(0.9);
    }
    .menu.dir-top-right {
      bottom: calc(100% + 4px);
      right: 0;
      transform-origin: bottom right;
      transform: scaleY(0.9);
    }
    .menu.dir-top-left {
      bottom: calc(100% + 4px);
      left: 0;
      transform-origin: bottom left;
      transform: scaleY(0.9);
    }

    /* Auto-clamp: flip the horizontal anchor when the menu would overflow the
       viewport (keeps it on-screen near an edge). */
    .menu.clamp-left {
      left: 0;
      right: auto;
    }
    .menu.clamp-right {
      right: 0;
      left: auto;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 48px;
      padding: 0 16px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 14px;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
    }
    .menu-item ha-icon {
      --mdc-icon-size: 22px;
      flex-shrink: 0;
    }
    .menu-item::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .menu-item:hover::before { opacity: 0.08; }
    .menu-item:active::before { opacity: 0.12; }

    /* Selected preset: M3 uses a container fill for the selected menu item,
       plus a trailing check. The text block pushes the check to the edge. */
    .menu-item .item-text { flex: 1; }

    .menu-item.selected {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      font-weight: 600;
    }

    .menu-item .item-check {
      --mdc-icon-size: 20px;
      opacity: 0.9;
    }
  `];class Gi extends qt{static properties={_expanded:{state:!0}};static styles=[qt.styles,n`
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .opt-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(t){super.setConfig(t),this._expanded??=null}_formData(){return{variant:"tonal",size:"s",menu_position:"bottom-right",...this._config}}get _sections(){return[{title:"Leading button",icon:"mdi:card-text-outline",fields:[{name:"icon",template:!0,selector:{icon:{}}},{name:"label",template:!0,selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"more-info"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"elevated",label:"Elevated"},{value:"outlined",label:"Outlined"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"Extra small"},{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"},{value:"xl",label:"Extra large"}]}}},{name:"menu_position",label:"Menu alignment",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"Below · right-aligned"},{value:"bottom-left",label:"Below · left-aligned"},{value:"top-right",label:"Above · right-aligned"},{value:"top-left",label:"Above · left-aligned"}]}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]}]}_optionSchema(t){return[Dt(t?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Menu options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Mt((t,e)=>this._moveOption(t,e),t.map((t,e)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${t.label||(t.icon&&!Dt(t.icon)?t.icon:`Option ${e+1}`)}</span>
                <ha-icon-button @click=${()=>this._toggleOption(e)}>
                  <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(e)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===e?I`
                    <div class="opt-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${t}
                        .schema=${this._optionSchema(t)}
                        .computeLabel=${At}
                        @value-changed=${t=>this._optionChanged(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const t=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[s]=i.splice(t,1);i.splice(e,0,s),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_optionChanged(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleOption(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-split-button-editor",Gi);const Yi={xs:32,s:40,m:56,l:96,xl:136,default:48,large:56},Ki={xs:12,s:12,m:16,l:28,xl:28,default:14,large:16},Zi={xs:20,s:20,m:24,l:32,xl:40,default:24,large:24};class Qi extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0}};static styles=Xi;static getConfigElement(){return document.createElement("materia-split-button-editor")}static getStubConfig(){return{label:"Action",icon:"mdi:play",variant:"tonal",size:"s",options:[{label:"Option 1",icon:"mdi:numeric-1-circle-outline"},{label:"Option 2",icon:"mdi:numeric-2-circle-outline"}]}}setConfig(t){this.config={variant:"tonal",size:"s",...t},this._open=!1,this.toggleAttribute("wide",!!t.wide)}updated(t){t.has("config")&&(this.toggleAttribute("wide",!!this.config?.wide),null!=this.config?.flex&&(this.style.flex=String(this.config.flex))),t.has("_open")&&this._open&&requestAnimationFrame(()=>this._clampMenu())}_clampMenu(){const t=this.shadowRoot?.querySelector(".menu");if(!t||!this._open)return;t.classList.remove("clamp-left","clamp-right");const e=t.getBoundingClientRect();e.left<8?t.classList.add("clamp-left"):e.right>window.innerWidth-8&&t.classList.add("clamp-right")}connectedCallback(){super.connectedCallback(),this._outsideClick=t=>{this._open&&((t.composedPath?.()||[]).includes(this)||(this._open=!1))},document.addEventListener("click",this._outsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClick)}_toggle(t){t.stopPropagation(),this._open=!this._open}_selectOption(t,e){e.stopPropagation(),this._open=!1,t.tap_action&&this._handleAction(t.tap_action)}_isSelected(t){if(null!=t.selected)return!!t.selected;const e=this.config.preset_entity||this.config.entity;if(null==t.value||!e)return!1;const i=this.hass?.states?.[e];if(!i)return!1;const s=this.config.preset_attribute||(this.config.preset_entity?null:this.config.attribute),o=s?i.attributes?.[s]:i.state;return(Array.isArray(t.value)?t.value:[t.value]).some(t=>String(t)===String(o))}render(){if(!this.config)return I``;const t=this.config.variant||"tonal",e=this.config.size||"s",i="number"==typeof e||/^\d+$/.test(String(e)),s=i?Number(e):Yi[e]||40,o=i?Math.round(.28*s):Ki[e]??12,n=i?Math.round(.32*s):Zi[e]??20,a=this.config.options||[],{options:r,type:l,...c}=this.config,d={...c,connected:"leading"},h=`--sb-h:${s}px;--sb-inner:${o}px;--sb-ticon:${n}px;`+(this.config.color?`--sb-bg:${this.config.color};`:"")+(this.config.color_on?`--sb-fg:${this.config.color_on};`:"");return I`
      <div class="wrap" style=${h}>
        <div class="split ${t}">
          <materia-button class="leading" .hass=${this.hass} .config=${d}></materia-button>
          <button
            class="trailing ${this._open?"open":""}"
            @click=${this._toggle}
            aria-haspopup="menu"
            aria-expanded=${this._open?"true":"false"}
            aria-label="more actions"
          >
            <ha-icon class="chev" icon="m3of:arrow-drop-down"></ha-icon>
          </button>
        </div>

        <div class="menu dir-${this.config.menu_position||"bottom-right"} ${this._open?"open":""}" role="menu">
          ${a.map(t=>{const e=this._isSelected(t);return I`
              <div class="menu-item ${e?"selected":""}" role="menuitem" aria-checked=${e?"true":"false"} @click=${e=>this._selectOption(t,e)}>
                ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                <span class="item-text">${t.label||""}</span>
                ${e?I`<ha-icon class="item-check" icon="m3of:check"></ha-icon>`:""}
              </div>
            `})}
        </div>
      </div>
    `}getCardSize(){return 1}}customElements.define("materia-split-button",Qi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-split-button",name:"Materia Split Button",description:"M3 Expressive split button — a main action plus a menu of related actions.",preview:!0});class Ji extends qt{static properties={_expanded:{state:!0}};static styles=[qt.styles,n`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(t){super.setConfig(t),this._expanded??=null}_sectionsSignature(){return`${this._config?.group||""}|${this._config?.preset||""}|${this._config?.multi_select?1:0}`}get _sections(){const t="standard"===this._config?.group,e=[...Object.keys(ji).map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1).replace(/-/g," ")})),{value:"custom",label:"Custom"}],i=[{title:"Setup",icon:"mdi:tune",fields:[{name:"group",label:"Configuration",selector:{select:{mode:"dropdown",options:[{value:"connected",label:"Connected (segmented, entity-driven)"},{value:"standard",label:"Standard (spaced row of buttons)"}]}}},...t?[]:[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",label:"Color preset",selector:{select:{mode:"dropdown",options:e}}}],{name:"size",label:"Size (applies to the whole group)",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (40dp)"},{value:"m",label:"M (56dp)"},{value:"l",label:"L (96dp)"},{value:"xl",label:"XL (136dp)"}]}}},{name:"variant",label:"Style",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"}]}}},...t?[{name:"gap",label:"Gap between buttons (px)",selector:{number:{min:0,max:32,mode:"box"}}},{name:"padding",label:"Vertical padding (px)",selector:{number:{min:0,max:32,mode:"box"}}}]:[],...t?[]:[{name:"multi_select",label:"Multi-select",selector:{boolean:{}}}],...!t&&this._config?.multi_select?[{name:"columns",label:"Max columns",selector:{number:{min:1,max:8,mode:"box"}}}]:[]]}];return"custom"===this._config?.preset&&i.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_active",label:"Active color",color:!0,template:!0,selector:{text:{}}},{name:"color_on_active",label:"Active text color",color:!0,template:!0,selector:{text:{}}}]}),i}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"entity",label:"Entity (optional — this button's own state)",selector:{entity:{}}},{name:"value",label:"Value (state that = active; blank = on/truthy)",selector:{text:{}}},{name:"active",label:"Active template (overrides everything, e.g. attribute logic)",template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Mt((t,e)=>this._moveOption(t,e),(this._config.options||[]).map((t,e)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${t.label||t.value||`Option ${e+1}`}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(e)}>
                  <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(e)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===e?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${t}
                        .schema=${this._optionSchema}
                        .computeLabel=${At}
                        @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[s]=i.splice(t,1);i.splice(e,0,s),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleExpand(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-button-group-editor",Ji);const ts=new Set(["split","split-button","materia-split-button"]);class es extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},value:{type:String},_localValue:{state:!0},_optimisticValue:{state:!0},_optimisticEntities:{state:!0},_resolvedColorActive:{state:!0},_resolvedColorOnActive:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_select.")||t.startsWith("select."))||"";return{entity:e,size:"m",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}]}}static styles=[$t,Li];setConfig(t){this.config={size:"m",...t}}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const t=this.hass?.states[this.config.entity],e=this.config.entity?.split(".")[0];return"input_select"!==e&&"select"!==e||!t?.attributes?.options?[]:t.attributes.options.map(t=>({label:this._capitalize(t),value:t,tap_action:{action:"perform-action",perform_action:`${e}.select_option`,data:{option:t},target:{entity_id:this.config.entity}}}))}get _activeValue(){if(!this.config?.entity)return this._localValue??String(this.value??"");if(null!=this._optimisticValue)return this._optimisticValue;const t=this.hass?.states[this.config.entity];return this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):t?.state??""}_truthy(t){const e=String(t??"").toLowerCase();return""!==e&&!["off","closed","idle","standby","unavailable","unknown","not_home","false","0","none","auto_off"].includes(e)}_entityOptionActive(t){const e=t.entity,i=this._optimisticEntities?.[e],s=this.hass?.states[e]?.state;if(null!=t.value&&""!==t.value){const e=String(t.value).toLowerCase();return i&&null!=i.value?i.value===e:String(s??"").toLowerCase()===e}return i&&null!=i.active?i.active:this._truthy(s)}_tplTruthy(t){if("boolean"==typeof t)return t;const e=String(t??"").trim().toLowerCase();return["true","on","yes","1","open","home","active"].includes(e)}_isOptionActive(t,e){if(null!=t.active)return this._isTemplate(t.active)?this._tplTruthy(this._tplResults?.[`optActive${e}`]):this._tplTruthy(t.active);if(t.entity)return this._entityOptionActive(t);if(this.config.multi_select){const e=this._activeValue.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);return e.includes(String(t.value).toLowerCase())}return String(t.value)===this._activeValue}_getActiveColors(){const t=this._resolvedColorActive||this.config.color_active,e=this._resolvedColorOnActive||this.config.color_on_active;return t&&e?{active:t,onActive:e}:this.config.preset&&ji[this.config.preset]?ji[this.config.preset]:ji.secondary}_renderStandard(){const t=this.config.gap??8,e=this.config.padding??4,i=this.config.size||"m";return I`
      <ha-card>
        <div class="row" style="gap: ${t}px; padding: ${e}px 0;">
          ${(this.config.buttons||[]).map(t=>{const e=ts.has(t.type)||Array.isArray(t.options)&&t.options.length>0,{size:s,type:o,...n}=t,a={variant:"filled",...n,size:i};return e?I`<materia-split-button .hass=${this.hass} .config=${a}></materia-split-button>`:I`<materia-button .hass=${this.hass} .config=${a}></materia-button>`})}
        </div>
      </ha-card>
    `}render(){if(!this.hass||!this.config)return I``;if("standard"===this.config.group)return this._renderStandard();const t=this.config.entity?this.hass.states[this.config.entity]:void 0,e=!!t&&this._isUnavailable(t),i=this.config.size||"m",{height:s,innerCorner:o}=Ni[i]||Ni.m,n=s/2;this._activeValue;const a=this._getActiveColors(),r=this._resolvedOptions,l=this.config.variant||"tonal";if(!r.length)return I``;const c=this.config.multi_select,d=this.config.columns||0;return I`
      <ha-card>
        <div class="group ${e?"unavailable":""} ${c?"multi":""}"
          style="${c?`--btn-height: ${s}px;`:`height: ${s}px;`} ${d?`--btn-columns: ${d};`:""}">
          ${r.map((t,e)=>{const i=this._isOptionActive(t,e),h=0===e,p=e===r.length-1,u="square"===this.config.active_shape,m=u?Math.min(o,Math.max(6,Math.round(.18*s))):n;let g;if(c)if(i)g=`${m}px`;else{const t=d||r.length,i=Math.floor(e/t),s=e%t,a=0===i,l=i===Math.ceil(r.length/t)-1,c=0===s,h=s===t-1||e===r.length-1;g=`${a&&c?n:o}px ${a&&h?n:o}px ${l&&h?n:o}px ${l&&c?n:o}px`}else{const t=i?`${m}px`:`${o}px`,e=i&&u?`${m}px`:`${n}px`;g=1===r.length?e:h?`${e} ${t} ${t} ${e}`:p?`${t} ${e} ${e} ${t}`:t}const f=i?a.active:void 0,_=i?a.onActive:void 0;return I`
              <button
                class="${i?"active":"inactive"} ${l}"
                style="border-radius: ${g};${i?` background: ${f}; color: ${_};`:""}"
                @click=${()=>this._handleOptionTap(t)}
              >
                ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                ${t.label?I`<span>${t.label}</span>`:""}
              </button>
            `})}
        </div>
      </ha-card>
    `}_handleOptionTap(t){if(!this.config.entity&&!t.entity&&!t.tap_action){const e=String(t.value);if(this.config.multi_select){const t=this._activeValue.split(",").map(t=>t.trim()).filter(Boolean),i=t.findIndex(t=>t.toLowerCase()===e.toLowerCase());i>=0?t.splice(i,1):t.push(e),this._localValue=t.join(",")}else this._localValue=e;return this._fireHaptic("selection"),void this.dispatchEvent(new CustomEvent("option-selected",{detail:{value:this._localValue,option:t},bubbles:!0,composed:!0}))}if(this._fireHaptic("selection"),t.entity){const e=t.entity,i=String(this.hass?.states[e]?.state??""),s=null!=t.value&&""!==t.value?{baseline:i,value:String(t.value).toLowerCase()}:{baseline:i,active:!this._truthy(i)};this._optimisticEntities={...this._optimisticEntities,[e]:s},this._optEntityTimers=this._optEntityTimers||{},clearTimeout(this._optEntityTimers[e]),this._optEntityTimers[e]=setTimeout(()=>{const{[e]:t,...i}=this._optimisticEntities||{};this._optimisticEntities=i},1e4)}else if(!this.config.multi_select){const e=this.hass?.states[this.config.entity];this._optimisticBaseline=this.config.attribute?String(e?.attributes?.[this.config.attribute]??""):String(e?.state??""),this._optimisticValue=String(t.value),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}t.tap_action?this._handleAction(t.entity?{entity:t.entity,...t.tap_action}:t.tap_action):t.entity?this._fireMoreInfo(t.entity):this.config.entity&&this._fireMoreInfo(this.config.entity)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer);for(const t of Object.values(this._optEntityTimers||{}))clearTimeout(t)}updated(t){if(t.has("hass")&&this.hass&&(this._resolveField("color_active","_resolvedColorActive"),this._resolveField("color_on_active","_resolvedColorOnActive"),this._resolvedOptions.forEach((t,e)=>{null!=t.active&&this._resolveTemplateValue(`optActive${e}`,t.active)})),t.has("hass")&&null!=this._optimisticValue){const t=this.hass?.states[this.config.entity],e=this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):String(t?.state??"");(e.toLowerCase()===this._optimisticValue.toLowerCase()||null!=this._optimisticBaseline&&e!==this._optimisticBaseline)&&(this._optimisticValue=null,this._optimisticBaseline=null,clearTimeout(this._optimisticTimer))}if(t.has("hass")&&this._optimisticEntities){let t=!1;const e={...this._optimisticEntities};for(const[i,s]of Object.entries(e)){const o=String(this.hass?.states[i]?.state??"");(null!=s.baseline&&o!==s.baseline||(null!=s.value?o.toLowerCase()===s.value:this._truthy(o)===s.active))&&(delete e[i],clearTimeout(this._optEntityTimers?.[i]),t=!0)}t&&(this._optimisticEntities=e)}}getCardSize(){return 1}}customElements.define("materia-button-group",es),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 button group — connected (segmented, entity-driven) or standard (a spaced row of buttons).",preview:!0});customElements.define("materia-icon-row",class extends es{setConfig(t){super.setConfig({...t,group:"standard"})}});const is=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      /* Everything below scales off the card's own width, so the card works at
         4 columns and at 12 without a breakpoint. */
      container-type: inline-size;
    }

    /* The card IS the state. The design doc floods the whole page with primary
       when the door is open and drops it to near-black when locked; a custom
       card cannot repaint the dashboard, so the card surface carries it — which
       is what the same doc's home-card variant does anyway. */
    .body {
      position: relative;
      overflow: hidden;
      /* Same asymmetric expressive silhouette as materia-hero, so a hero
         stacked above this reads as the same family. */
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--ml-bg);
      color: var(--ml-fg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(16px, 5cqi, 26px);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* ---- the morphing shape ---- */

    .shape-wrap {
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* 236px of a 412px frame in the design = 57cqi, clamped so it stays a
       recognisable shape in a narrow column and never dwarfs a wide one. */
    .shape {
      width: clamp(132px, 57cqi, 236px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      background: var(--ml-shape-bg);
      color: var(--ml-shape-fg);
      /* LOCKED: 30%. Two independent sources agree on that ratio — this repo's
         own M3 Expressive large-button square corner (28px on a 96px rung =
         29.2%, src/elements/button/styles.js) and the design doc's 72px on 236px
         = 30.5%. UNLOCKED: 50%, a circle.
         Expressed as a percentage, not px, so the morph tracks the container.
         The percentage also matters for correctness: a px radius at or above
         half the box renders identically to any larger value, so a px morph
         that overshoots its endpoint would sit visually still for most of its
         duration and then snap. */
      border-radius: 30%;
      /* The turn is what makes the change legible. A circle rotating is
         invisible; a cornered shape rotating is unmistakable, so the rotation
         and the corner change reveal each other. The angle is not a magic 45 —
         it is HALF each shape's rotational-symmetry period (see --ml-rot in
         index.js), which is the largest turn that still reads as movement
         before the silhouette repeats itself. */
      transform: rotate(0deg);
      transition: border-radius var(--md-sys-motion-expressive-default-spatial),
        transform var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .shape.unlocked {
      border-radius: 50%;
      transform: rotate(var(--ml-rot, 45deg));
    }

    /* A MaterialShapes silhouette replaces the CSS box: the container goes
       transparent and an SVG path carries the fill, so the shape can be one of
       the real catalogue entries rather than whatever border-radius can
       describe. */
    .shape.vector {
      background: none;
      border-radius: 0;
      position: relative;
    }

    .shape .silhouette {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      fill: var(--ml-shape-bg);
      transition: fill var(--md-sys-motion-default-effects);
      pointer-events: none;
    }

    /* The glyph sits above the silhouette and, unlike the CSS box, does NOT
       need counter-rotating — the vector container itself never turns, only the
       path inside it does. */
    .shape .silhouette path {
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(0deg);
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .shape.unlocked .silhouette path {
      transform: rotate(var(--ml-rot, 45deg));
    }

    .shape.vector ha-icon {
      position: relative;
    }

    /* In vector mode the PATH turns, so the container must not — otherwise the
       rotation is applied twice and the glyph's counter-rotation cancels the
       wrong one. */
    .shape.vector.unlocked {
      transform: none;
    }

    .shape.vector.unlocked ha-icon {
      transform: none;
    }

    /* Counter-rotation keeps the glyph upright while its container turns. */
    .shape ha-icon {
      --mdc-icon-size: clamp(56px, 23cqi, 96px);
      transform: rotate(0deg);
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .shape.unlocked ha-icon {
      transform: rotate(-45deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .shape,
      .shape ha-icon {
        transition: background-color var(--md-sys-motion-default-effects),
          color var(--md-sys-motion-default-effects);
      }
    }

    /* ---- the gesture ---- */

    materia-drag-confirm {
      width: 100%;
      /* A tonal well in the surface's own ink, so the track stays legible in
         both states without a second colour decision. Named explicitly rather
         than via currentColor — see the note in index.js on why that resolves
         wrong inside the primitive's shadow DOM. */
      --mdc-track: color-mix(in srgb, var(--ml-fg) 14%, transparent);
      --mdc-ink: var(--ml-fg);
      --mdc-handle: var(--ml-handle-bg);
      --mdc-handle-ink: var(--ml-handle-fg);
    }

    .pending {
      font-size: clamp(12px, 3.4cqi, 14px);
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.72;
    }

    .demo-note {
      font-size: clamp(11px, 3.2cqi, 12px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.55;
    }
  `];customElements.define("materia-lock-editor",class extends qt{_formData(){return{gesture:"slide",shape:!0,shape_style:"cookie9",initial_locked:!0,...this._config}}_sectionsSignature(){return`${this._config?.gesture||"slide"}|${this._config?.entity?"e":""}`}get _sections(){const t="hold"===this._config?.gesture,e=!!this._config?.entity;return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",label:"Lock (optional)",helper:"Leave empty to run self-contained — the card keeps its own state, with nothing to control.",selector:{entity:{domain:["lock","switch","input_boolean"]}}},{name:"gesture",label:"Commit gesture",selector:{select:{mode:"dropdown",options:[{value:"slide",label:"Slide the handle across"},{value:"hold",label:"Press and hold"}]}}},{name:"shape",label:"Show the morphing lock shape",selector:{boolean:{}}},{name:"shape_style",label:"Silhouette",helper:"Squircle morphs its outline continuously; the MaterialShapes silhouettes change state by turning instead, since CSS cannot interpolate an SVG path.",selector:{select:{mode:"dropdown",options:[{value:"cookie9",label:"Cookie, 9-sided (default)"},{value:"squircle",label:"Squircle — the only one that morphs its outline"},{value:"pill",label:"Pill (square-aspect, not a capsule)"},{value:"gem",label:"Gem"}]}}}]},{title:"Behaviour",icon:"mdi:cog-outline",fields:[...t?[{name:"hold_ms",label:"Hold for (ms, default 800)",helper:"Keep this above 500ms — the platform long-press timeout — or an ordinary long-press commits by accident.",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}}]:[{name:"threshold",label:"Commit past this fraction of the track (default 0.55)",selector:{number:{min:.3,max:1,step:.05,mode:"slider"}}}],...e?[{name:"locked_state",label:"State that means locked",helper:'Defaults to "locked" for a lock and "off" for a switch — a relay strike is energised to release the door.',selector:{text:{}}},{name:"pending_timeout_ms",label:"Give up waiting for the lock after (ms, default 10000)",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}}]:[{name:"initial_locked",label:"Start out locked",selector:{boolean:{}}}]]},{title:"Labels",icon:"mdi:text-short",fields:[...t?[{name:"unlock_hold_hint",label:'While locked (default "Hold to unlock")',selector:{text:{}}},{name:"lock_hold_hint",label:'While unlocked (default "Hold to lock")',selector:{text:{}}}]:[{name:"unlock_hint",label:'While locked (default "Slide to unlock")',selector:{text:{}}},{name:"lock_hint",label:'While unlocked (default "Slide to lock")',selector:{text:{}}}],...e?[{name:"locking_label",label:'While locking (default "Locking…")',selector:{text:{}}},{name:"unlocking_label",label:'While unlocking (default "Unlocking…")',selector:{text:{}}},{name:"jammed_label",label:'When jammed (default "Jammed — check the door")',selector:{text:{}}}]:[{name:"demo_label",label:'Self-contained note (default "Demo · no entity")',selector:{text:{}}}]]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"unlocked_color",label:"Background while unlocked",color:!0,selector:{text:{}}},{name:"unlocked_color_on",label:"Text while unlocked",color:!0,selector:{text:{}}},{name:"locked_color",label:"Background while locked",color:!0,selector:{text:{}}},{name:"locked_color_on",label:"Text while locked",color:!0,selector:{text:{}}},{name:"accent",label:"Accent (locked glyph and handle)",color:!0,selector:{text:{}}},{name:"accent_on",label:"Ink on the accent",color:!0,selector:{text:{}}},{name:"locked_icon",label:"Icon while locked",selector:{icon:{}}},{name:"unlocked_icon",label:"Icon while unlocked",selector:{icon:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Tapping the shape",selector:{ui_action:{default_action:"more-info"}}}]}]}});const ss={squircle:{vector:!1,rot:45},cookie9:{vector:!0,rot:20,path:()=>Jt(90,90,86,9)},pill:{vector:!0,rot:45,path:()=>function(t,e,i,s=0){return ae(t,e,i,{points:[{x:.961,y:.039,r:.426},{x:1.001,y:.428,r:0},{x:1,y:.609,r:1}],reps:2,mirroring:!0,rotate:s})}(90,90,172)},gem:{vector:!0,rot:90,path:()=>function(t,e,i,s=0){return ae(t,e,i,{points:[{x:.499,y:1.023,r:.241},{x:-.005,y:.792,r:.208},{x:.073,y:.258,r:.228},{x:.433,y:-0,r:.491}],reps:1,mirroring:!0,rotate:s})}(90,90,172)}};class os extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_pending:{state:!0},_local:{state:!0}};static styles=is;static getConfigElement(){return document.createElement("materia-lock-editor")}static getStubConfig(){return{gesture:"slide"}}setConfig(t){this.config={gesture:"slide",...t}}constructor(){super(),this._pending=null,this._local=null}get _stateObj(){return this.config?.entity?this.hass?.states[this.config.entity]:null}get _selfContained(){return!this.config?.entity}get _lockedState(){if(this.config.locked_state)return String(this.config.locked_state);const t=this.config.entity?.split(".")[0];return"switch"===t||"input_boolean"===t?"off":"locked"}get _entityLocked(){const t=this._stateObj;return!t||this._isUnavailable(t)?null:String(t.state)===this._lockedState}get _locked(){if(null!=this._pending)return this._pending;if(this._selfContained)return this._local??!1!==this.config.initial_locked;return this._entityLocked??this._local??!0}get _transitioning(){const t=String(this._stateObj?.state??"");return"locking"===t||"unlocking"===t||"jammed"===t?t:null!=this._pending?this._pending?"locking":"unlocking":null}updated(t){t.has("hass")&&null!=this._pending&&this._entityLocked===this._pending&&(this._pending=null,clearTimeout(this._pendingTimer))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._pendingTimer)}_confirm(){const t=!this._locked;if(this._selfContained)return void(this._local=t);this._pending=t,clearTimeout(this._pendingTimer),this._pendingTimer=setTimeout(()=>{this._pending=null},this.config.pending_timeout_ms??1e4);const e=this.config.entity,i=e.split(".")[0];if("lock"===i)this._callService("lock",t?"lock":"unlock",{entity_id:e});else{const s="off"===this._lockedState,o=t?!s:s;this._callService(i,o?"turn_on":"turn_off",{entity_id:e})}}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj;if(this.config.entity&&!t)return I`<ha-card><div class="body">
        <div class="pending">Entity not found: ${this.config.entity}</div>
      </div></ha-card>`;const e=!!t&&this._isUnavailable(t),i=this._locked,s=this._transitioning,o=i?this.config.locked_color??"var(--md-sys-color-surface-container-low, var(--card-background-color))":this.config.unlocked_color??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",n=i?this.config.locked_color_on??"var(--md-sys-color-on-surface)":this.config.unlocked_color_on??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))",a=this.config.accent??"var(--md-sys-color-primary)",r=this.config.accent_on??"var(--md-sys-color-on-primary)",l=i?`color-mix(in srgb, ${n} 12%, transparent)`:n,c=i?a:o,d=i?a:n,h=i?r:o,p=i?this.config.locked_icon??"m3o:lock":this.config.unlocked_icon??"m3o:lock-open-right",u=ss[this.config.shape_style]??ss.cookie9,m=i?this.config.unlock_hint??"Slide to unlock":this.config.lock_hint??"Slide to lock",g=i?this.config.unlock_hold_hint??"Hold to unlock":this.config.lock_hold_hint??"Hold to lock",f="hold"===this.config.gesture;return I`
      <ha-card
        class=${e?"unavailable":""}
        style="--ml-bg:${o};--ml-fg:${n};--ml-shape-bg:${l};--ml-shape-fg:${c};--ml-handle-bg:${d};--ml-handle-fg:${h};"
      >
        <div class="body">
          ${!1===this.config.shape?V:I`<div
                class="shape-wrap"
                @click=${()=>this._handleAction(this.config.tap_action||(this.config.entity?{action:"more-info",entity:this.config.entity}:{action:"none"}))}
              >
                <div
                  class="shape ${i?"":"unlocked"} ${u.vector?"vector":""}"
                  style="--ml-rot:${u.rot}deg"
                >
                  ${u.vector?I`<svg class="silhouette" viewBox="0 0 180 180" aria-hidden="true">
                        ${H`<path d=${u.path()} />`}
                      </svg>`:V}
                  <ha-icon .icon=${p}></ha-icon>
                </div>
              </div>`}

          <materia-drag-confirm
            .gesture=${f?"hold":"slide"}
            .label=${f?g:m}
            .direction=${i?"forward":"backward"}
            .threshold=${this.config.threshold??.55}
            .holdMs=${this.config.hold_ms??800}
            ?disabled=${e}
            @confirm=${this._confirm}
          ></materia-drag-confirm>

          ${s?I`<div class="pending">
                ${"jammed"===s?this.config.jammed_label??"Jammed — check the door":"locking"===s?this.config.locking_label??"Locking…":this.config.unlocking_label??"Unlocking…"}
              </div>`:this._selfContained?I`<div class="demo-note">
                ${this.config.demo_label??"Demo · no entity"}
              </div>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 5}}customElements.define("materia-lock",os),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"Lock shape that morphs square→circle, with a drag-to-confirm or hold-to-confirm gesture. Works with no entity.",preview:!0});const ns=[kt,wt,$t,gt,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .sheet {
      border-radius: 32px 32px 14px 32px;
      background: var(--md-sys-color-surface-container-low, var(--card-background-color));
      color: var(--md-sys-color-on-surface);
      padding: clamp(14px, 4cqi, 20px);
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3.6cqi, 18px);
      overflow: hidden;
    }

    /* ---- collapsed strip (design 7b) ---- */

    .strip {
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* Armed gets a FILLED tonal treatment, not quiet grey text: a timer that is
       going to fire must never be able to hide. */
    .strip .glyph {
      width: 56px;
      height: 56px;
      flex: none;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    /* A repeating schedule is a different KIND of thing from a one-off, so the
       silhouette says so as well as the text. */
    .strip.repeating .glyph {
      border-radius: 16px;
    }

    .strip .glyph ha-icon {
      --mdc-icon-size: 26px;
    }

    .strip .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .strip .head {
      font-size: clamp(16px, 4.6cqi, 18px);
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .strip .sub {
      font-size: clamp(12px, 3.4cqi, 13px);
      opacity: 0.68;
    }

    /* Inline cancel on the armed strip. Tonal against the filled glyph, so it
       reads as secondary to the schedule itself rather than competing with it. */
    .strip-cancel {
      flex: none;
      height: 44px;
      padding: 0 18px;
      border-radius: 22px;
      font-size: 14px;
      font-weight: 600;
      background: color-mix(in srgb, var(--md-sys-color-on-surface) 10%, transparent);
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .strip-cancel:hover {
      background: color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent);
    }

    /* ---- header echo (design 7a) ---- */

    .echo {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .echo .eyebrow {
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.62;
    }

    /* The chosen moment is echoed large so it can be confirmed without
       re-reading the chips. */
    .echo .headline {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(30px, 10.5cqi, 44px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.08;
      color: var(--md-sys-color-primary);
    }

    .echo .subline {
      font-size: clamp(12px, 3.6cqi, 14px);
      opacity: 0.62;
    }

    /* ---- rows of choices ---- */


    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    button {
      font: inherit;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      color: inherit;
    }


    /* Two-line selectable cells, NOT M3 chips — verified: FilterChipTokens is
       ContainerHeight 32dp with ContainerShape CornerSmall (8dp) and a LabelLarge
       label, which cannot hold a name plus a resolved time. So these are sized
       off the M3 button ladder instead: 56px is the medium rung, 28px is half of
       it (the pill), and 16px is that rung's square corner, giving a morph whose
       every value traces to something. The previous 60px/30px/18px was on no
       scale at all.

       28px rather than 999px matters: above half the height every radius renders
       identically, so a 999 -> 16 morph would sit visually still for most of its
       duration and then snap. */
    .quick {
      height: 56px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .quick.on {
      border-radius: 16px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .quick .n {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    .quick .t {
      font-size: 12px;
      opacity: 0.66;
      white-space: nowrap;
    }

    /* Trigger list (the "When..." tab). */
    .trigger {
      width: 100%;
      box-sizing: border-box;
      height: 78px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-align: left;
      border-radius: 34px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .trigger.on {
      border-radius: 20px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .trigger ha-icon {
      --mdc-icon-size: 26px;
      flex: none;
    }

    .trigger .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .trigger .n {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .trigger .s {
      font-size: 12px;
      opacity: 0.66;
    }

    .trigger .check {
      opacity: 0;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .trigger.on .check {
      opacity: 1;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* ---- the unfolding custom picker ---- */

    .custom {
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      overflow: hidden;
    }

    .custom-head {
      width: 100%;
      box-sizing: border-box;
      height: 66px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      background: none;
      text-align: left;
    }

    .custom-head .lbl {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }

    .custom-head .chev {
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .custom.open .custom-head .chev {
      transform: rotate(180deg);
    }

    .custom-head svg {
      width: 24px;
      height: 24px;
      flex: none;
    }

    /* Height is animated from a MEASURED pixel value, because CSS cannot
       interpolate to auto. See updated() in index.js. */
    .custom-body {
      overflow: hidden;
      height: 0;
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    .custom-inner {
      padding: 2px 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sep {
      height: 1px;
      background: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
      margin: 2px 6px;
    }

    .timerow {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 0 6px;
      min-width: 0;
    }

    .clock {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(38px, 13cqi, 52px);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      color: var(--md-sys-color-primary);
      flex: none;
      font-variant-numeric: tabular-nums;
    }

    .spacer {
      flex: 1;
    }

    .mins {
      display: flex;
      gap: 3px;
      flex: none;
    }





    /* 24 hours on a drag-free scroll rail — a 24-wide grid would crush each
       cell below the 40px minimum touch target. */
    .hours {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      padding: 2px 6px 6px;
      scrollbar-width: none;
    }

    .hours::-webkit-scrollbar {
      display: none;
    }

    .hour {
      flex: none;
      width: 56px;
      height: 56px;
      display: grid;
      place-items: center;
      font-size: 15px;
      font-weight: 500;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border-radius: 28px;
      font-variant-numeric: tabular-nums;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .hour.on {
      border-radius: 16px;
      font-weight: 700;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    /* ---- repeat ---- */

    .repeat {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 2px 6px;
    }

    .repeat .text {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .repeat .n {
      font-size: 15px;
      font-weight: 600;
    }

    .repeat .s {
      font-size: 12px;
      opacity: 0.66;
    }

    /* M3 switch, per SwitchTokens (52x32 track, 24 thumb selected). */
    .sw {
      width: 52px;
      height: 32px;
      flex: none;
      border-radius: 16px;
      padding: 3px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.2));
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .sw.on {
      justify-content: flex-end;
      background: var(--md-sys-color-primary);
    }

    .sw i {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .sw.on i {
      background: var(--md-sys-color-on-primary);
    }




    /* ---- actions ---- */

    .actions {
      display: flex;
      gap: 4px;
      height: 72px;
      margin-top: 2px;
    }

    .cancel {
      flex: 1;
      border-radius: 34px 12px 12px 34px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
      display: grid;
      place-items: center;
      font-size: 16px;
      font-weight: 600;
    }

    .confirm {
      flex: 2;
      border-radius: 12px 34px 34px 12px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
    }

    .confirm ha-icon {
      --mdc-icon-size: 24px;
    }

    /* Composed button groups. They bring their own ha-card, so the wrapper is
       flattened to sit in this sheet rather than reading as a card-in-a-card. */
    materia-button-group {
      display: block;
    }

    materia-button-group.mins {
      flex: none;
    }

    /* STAGGERED ENTER. The gap the picker had was not missing transitions on
       selection — those were there — it was that whole GROUPS appeared with no
       motion at all: switching tab swapped one block for another instantly, and
       the weekday row popped into existence. Each item now rises with a 45ms
       step, the same cadence materia-bar-select uses, so a set reads as arriving
       rather than being replaced.

       This is an ANIMATION, not a transition, because the elements are created
       and destroyed by the mode switch — there is no previous value to
       interpolate from. */
    @keyframes ms-rise {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    .rise {
      animation: ms-rise var(--md-sys-motion-expressive-default-spatial) both;
    }

    /* Respect the user's setting: the stagger is decorative, and a vestibular
       trigger is not worth a flourish. */
    @media (prefers-reduced-motion: reduce) {
      .rise {
        animation: none;
      }
    }

    /* SHEET MODE IS FLUSH. Hosted in a popup, the dialog already supplies the
       surface, the radius and the elevation — drawing them again here is what
       produced the card-in-a-card look. The card keeps only its padding, and even
       that is trimmed because the dialog contributes its own. */
    :host([sheet]) .sheet {
      background: none;
      border-radius: 0;
      padding: 0;
    }

    .mock {
      font-size: clamp(11px, 3.2cqi, 12px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.5;
      padding: 0 6px;
    }
  `];customElements.define("materia-schedule-editor",class extends qt{_formData(){return{name:"Schedule",empty_label:"Not scheduled",empty_sub:"Tap to pick a time or a trigger",presentation:"inline",...this._config}}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"name",label:"Eyebrow above the chosen moment",helper:'What is being scheduled — e.g. "Start cleaning".',selector:{text:{}}},{name:"presentation",label:"Presentation",helper:"Sheet drops the collapsed strip and renders the picker directly — for putting the card inside a browser_mod popup.",selector:{select:{mode:"dropdown",options:[{value:"inline",label:"Inline — collapsed strip that expands"},{value:"sheet",label:"Sheet — always open, for a modal"}]}}},{name:"empty_label",label:"Strip title when nothing is set",selector:{text:{}}},{name:"empty_sub",label:"Strip sub-line when nothing is set",selector:{text:{}}}]},{title:"Wiring",icon:"mdi:transit-connection-variant",fields:[{name:"confirm_action",label:"On confirm",helper:"Use $datetime, $date, $time, $duration, $weekdays, $repeat, $trigger, $label in the data.",selector:{ui_action:{default_action:"none"}}},{name:"trigger_action",label:"On confirm, trigger tab",helper:"Falls back to the confirm action when unset.",selector:{ui_action:{default_action:"none"}}},{name:"close_action",label:"How to dismiss the modal",helper:"Sheet presentation only. Defaults to browser_mod.close_popup.",selector:{ui_action:{default_action:"none"}}}]},{title:"Shortcuts",icon:"mdi:clock-fast",fields:[{name:"presets",label:'The "At a time" shortcuts',helper:'List of { label, offset: 90m|2h|1d } or { label, at: "09:00", days: 1 } or { label, at, weekday: 6 }. Each may carry its own tap_action. Empty for the built-in six.',selector:{object:{}}},{name:"minutes",label:"Minute options (default 0, 15, 30, 45)",selector:{object:{}}}]},{title:"Triggers",icon:"mdi:sensors",fields:[{name:"triggers",label:"Non-clock triggers",helper:"List of { key, name, sub, icon }. Leave empty for the built-in four.",selector:{object:{}}}]}]}});class as extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_armed:{state:!0},_mode:{state:!0},_pick:{state:!0},_event:{state:!0},_customOpen:{state:!0},_viewY:{state:!0},_viewM:{state:!0},_date:{state:!0},_hour:{state:!0},_minute:{state:!0},_repeating:{state:!0},_days:{state:!0}};static styles=ns;static getConfigElement(){return document.createElement("materia-schedule-editor")}static getStubConfig(){return{name:"Start cleaning"}}setConfig(t){this.config={presentation:"inline",...t}}get _isSheet(){return"sheet"===this.config.presentation}updated(t){super.updated?.(t),this.toggleAttribute("sheet",this._isSheet),this._syncFoldHeight()}constructor(){super();const t=new Date;this._open=!1,this._armed=null,this._mode="clock",this._pick=null,this._event=null,this._customOpen=!1,this._viewY=t.getFullYear(),this._viewM=t.getMonth(),this._date=t.getDate(),this._hour=9,this._minute=0,this._repeating=!1,this._days=[!0,!0,!0,!0,!0,!1,!1]}get _pickKey(){return this._pick??this._quick[0]?.key??null}get _isWired(){return!!(this.config.confirm_action||this.config.trigger_action||(this.config.presets??[]).some(t=>t.tap_action)||(this.config.triggers??[]).some(t=>t.tap_action))}get _lang(){return this.hass?.locale?.language||void 0}_pad(t){return String(t).padStart(2,"0")}_hhmm(t){return`${this._pad(t.getHours())}:${this._pad(t.getMinutes())}`}_dayTime(t){return`${new Intl.DateTimeFormat(this._lang,{weekday:"short"}).format(t)} ${this._hhmm(t)}`}static DEFAULT_PRESETS=[{label:"In 1 hour",offset:"1h"},{label:"In 4 hours",offset:"4h"},{label:"Tonight",at:"23:00"},{label:"Tomorrow",at:"09:00",days:1,grow:1.4},{label:"Noon",at:"12:00"},{label:"Saturday",at:"10:00",weekday:6,grow:1.4}];_resolvePreset(t,e){if(t.offset){const i=/^(\d+(?:\.\d+)?)\s*(m|h|d)$/i.exec(String(t.offset).trim());if(!i)return null;const s={m:6e4,h:36e5,d:864e5}[i[2].toLowerCase()];return new Date(e.getTime()+parseFloat(i[1])*s)}const i=/^(\d{1,2}):(\d{2})$/.exec(String(t.at??"").trim());if(!i)return null;const[s,o]=[Number(i[1]),Number(i[2])],n=new Date(e);if(n.setSeconds(0,0),n.setHours(s,o),null!=t.weekday){let i=(Number(t.weekday)%7-e.getDay()+7)%7;return 0===i&&n<=e&&(i=7),n.setDate(n.getDate()+i),n}return null!=t.days?(n.setDate(n.getDate()+Number(t.days)),n):(n<=e&&n.setDate(n.getDate()+1),n)}get _quick(){const t=new Date;return(this.config.presets??as.DEFAULT_PRESETS).map((e,i)=>{const s=this._resolvePreset(e,t);if(!s)return null;const o=s.toDateString()===t.toDateString();return{key:e.key??`p${i}`,name:e.label??"—",at:o?this._hhmm(s):this._dayTime(s),grow:e.grow??1,when:s,tap_action:e.tap_action}}).filter(Boolean)}static DEFAULT_TRIGGERS=[{key:"leave",label:"When I leave",secondary:"My phone leaves home",icon:"m3o:directions-walk"},{key:"empty",label:"When everyone's out",secondary:"All trackers away for 10 min",icon:"m3o:person-off"},{key:"night",label:"When the house sleeps",secondary:"All lights off after 22:00",icon:"m3o:bedtime"},{key:"sunset",label:"At sunset",secondary:"Around 21:48 today",icon:"m3o:wb-twilight"}];get _events(){return(this.config.triggers??as.DEFAULT_TRIGGERS).map((t,e)=>({key:t.key??`t${e}`,name:t.label??t.name??"—",sub:t.secondary??t.sub??"",icon:t.icon??"m3o:sensors",tap_action:t.tap_action}))}get _describe(){if("event"===this._mode){const t=this._events.find(t=>t.key===this._event);return t?{head:t.name,sub:`${t.sub} · trigger`}:{head:"Pick a trigger",sub:"Runs whenever it happens"}}if("custom"===this._pick){const t=new Intl.DateTimeFormat(this._lang,{day:"numeric",month:"long"}).format(new Date(this._viewY,this._viewM,this._date));return{head:`${this._pad(this._hour)}:${this._pad(this._minute)}`,sub:t}}const t=this._quick.find(t=>t.key===this._pickKey);return t?{head:t.name,sub:`Starts at ${t.at}`}:{head:"When?",sub:"Pick a moment"}}get _dayNames(){const t=new Intl.DateTimeFormat(this._lang,{weekday:"narrow"});return Array.from({length:7},(e,i)=>t.format(new Date(2024,0,1+i)))}get _tabConfig(){return{size:"m",preset:"primary",options:[{label:this.config.time_tab_label??"At a time",value:"clock",icon:"m3o:schedule"},{label:this.config.trigger_tab_label??"When…",value:"event",icon:"m3o:sensors"}]}}get _minuteConfig(){return{size:"s",preset:"primary",options:(this.config.minutes??[0,15,30,45]).map(t=>({label:this._pad(t),value:String(t)}))}}get _weekdayConfig(){return{size:"s",preset:"primary",multi_select:!0,active_shape:"square",options:this._dayNames.map((t,e)=>({label:t,value:String(e)}))}}get _resolvedWhen(){return"event"===this._mode?null:"custom"===this._pickKey?new Date(this._viewY,this._viewM,this._date,this._hour,this._minute,0,0):this._quick.find(t=>t.key===this._pickKey)?.when??null}_actionContext(){const t=this._resolvedWhen,e=t=>String(t).padStart(2,"0");let i="",s="",o="",n="";if(t){s=`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`,o=`${e(t.getHours())}:${e(t.getMinutes())}`,i=`${s} ${o}:00`;const a=Math.max(0,Math.round((t.getTime()-Date.now())/1e3));n=`${e(Math.floor(a/3600))}:${e(Math.floor(a%3600/60))}:${e(a%60)}`}return{datetime:i,date:s,time:o,duration:n,weekdays:this._repeating?["mon","tue","wed","thu","fri","sat","sun"].filter((t,e)=>this._days[e]):[],repeat:!!this._repeating,trigger:this._event??"",label:this._describe.head}}_fill(t,e){if("string"==typeof t){const i=/^\$(\w+)$/.exec(t.trim());return i&&i[1]in e?e[i[1]]:t.replace(/\$(\w+)/g,(t,i)=>i in e?String(e[i]):t)}return Array.isArray(t)?t.map(t=>this._fill(t,e)):t&&"object"==typeof t?Object.fromEntries(Object.entries(t).map(([t,i])=>[t,this._fill(i,e)])):t}_syncFoldHeight(){const t=this.shadowRoot?.querySelector(".custom-body");if(!t)return;const e=this.shadowRoot.querySelector(".custom-inner");t.style.height=this._customOpen&&e?`${e.scrollHeight}px`:"0px"}_seedCustom(){const t=this._quick.find(t=>t.key===this._pickKey)?.when??new Date(Date.now()+36e5);this._viewY=t.getFullYear(),this._viewM=t.getMonth(),this._date=t.getDate();const e=[...this.config.minutes??[0,15,30,45]].sort((t,e)=>t-e),i=t.getMinutes(),s=e.find(t=>t>=i);this._minute=s??e[0],this._hour=null==s?(t.getHours()+1)%24:t.getHours()}_dismiss(){if(this._open=!1,!this._isSheet)return;const t=this.config.close_action??{action:"fire-dom-event",browser_mod:{service:"browser_mod.close_popup",data:{}}};this._handleAction(t)}_commit(){this._armed={...this._describe,repeating:this._repeating,mode:this._mode},this._open=!1;const t="event"===this._mode?this._events.find(t=>t.key===this._event):this._quick.find(t=>t.key===this._pickKey),e=t?.tap_action??("event"===this._mode?this.config.trigger_action:null)??this.config.confirm_action;e?this._handleAction(this._fill(e,this._actionContext())):this._fireHaptic("success"),this._isSheet&&this._dismiss()}_renderStrip(){const t=this._armed,e=t?t.head:this.config.empty_label??"Not scheduled",i=t?t.sub:this.config.empty_sub??"Tap to pick a time or a trigger",s=t?"event"===t.mode?"m3o:sensors":"m3o:alarm":"m3o:add";return I`
      <div
        class="strip ${t?.repeating?"repeating":""}"
        role="button"
        tabindex="0"
        @click=${()=>{this._open=!0}}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._open=!0)}}
      >
        <div class="glyph"><ha-icon .icon=${s}></ha-icon></div>
        <div class="text">
          <span class="head">${e}</span>
          <span class="sub">${i}</span>
        </div>
        ${t?I`<button
              class="strip-cancel"
              @click=${t=>{t.stopPropagation(),this._armed=null,this._fireHaptic("light")}}
            >Cancel</button>`:V}
      </div>
    `}render(){if(!this.config)return I``;if(!this._open&&!this._isSheet)return I`<ha-card><div class="sheet">${this._renderStrip()}</div></ha-card>`;const t=this._describe,e="clock"===this._mode;return I`
      <ha-card>
        <div class="sheet">
          <div class="echo">
            <span class="eyebrow">${this.config.name??"Schedule"}</span>
            <span class="headline">${t.head}</span>
            <span class="subline">${t.sub}</span>
          </div>

          <materia-button-group
            .hass=${this.hass}
            .value=${this._mode}
            .config=${this._tabConfig}
            @option-selected=${t=>{this._mode=t.detail.value}}
          ></materia-button-group>

          ${e?this._renderClock():this._renderTriggers()}

          <div class="repeat">
            <div
              class="sw ${this._repeating?"on":""}"
              role="switch"
              tabindex="0"
              aria-checked=${this._repeating?"true":"false"}
              @click=${()=>{this._repeating=!this._repeating}}
            ><i></i></div>
            <div class="text">
              <span class="n">${this._repeating?"Repeats weekly":"Just once"}</span>
              <span class="s">${this._repeating?"Same time every selected day":"One run, then back to normal"}</span>
            </div>
          </div>

          ${this._repeating?I`<materia-button-group
                class="days rise"
                .hass=${this.hass}
                .value=${this._days.map((t,e)=>t?String(e):null).filter(Boolean).join(",")}
                .config=${this._weekdayConfig}
                @option-selected=${t=>{const e=new Set(String(t.detail.value).split(",").filter(t=>""!==t));this._days=this._days.map((t,i)=>e.has(String(i)))}}
              ></materia-button-group>`:V}

          <div class="actions">
            <button class="cancel" @click=${this._dismiss}>Cancel</button>
            <button class="confirm" @click=${this._commit}>
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._repeating?"Save schedule":"Set timer"}</span>
            </button>
          </div>

          ${this._isWired?V:I`<div class="mock">Mocked · nothing is scheduled</div>`}
        </div>
      </ha-card>
    `}_renderClock(){return I`
      <div class="chips">
        ${this._quick.map((t,e)=>I`<button
            class="quick ${this._pick===t.key?"on":""}"
            style="flex-grow:${t.grow}"
            @click=${()=>{this._pick=t.key,this._customOpen=!1}}
          >
            <span class="n">${t.name}</span><span class="t">${t.at}</span>
          </button>`)}
      </div>

      <div class="custom ${this._customOpen?"open":""}">
        <button
          class="custom-head"
          @click=${()=>{this._customOpen=!this._customOpen,this._customOpen&&(this._seedCustom(),this._pick="custom")}}
        >
          <ha-icon icon="m3o:event"></ha-icon>
          <span class="lbl">Pick a date &amp; time</span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class="custom-body">
          <div class="custom-inner">
            <materia-calendar
              .year=${this._viewY}
              .month=${this._viewM}
              .selected=${this._date}
              no-past
              .locale=${this._lang??""}
              @month-changed=${t=>{this._viewY=t.detail.year,this._viewM=t.detail.month}}
              @date-selected=${t=>{this._date=t.detail.day,this._pick="custom"}}
            ></materia-calendar>

            <div class="sep"></div>

            <div class="timerow">
              <span class="clock">${this._pad(this._hour)}:${this._pad(this._minute)}</span>
              <span class="spacer"></span>
              <materia-button-group
                class="mins"
                .hass=${this.hass}
                .value=${String(this._minute)}
                .config=${this._minuteConfig}
                @option-selected=${t=>{this._minute=Number(t.detail.value),this._pick="custom"}}
              ></materia-button-group>
            </div>

            <div class="hours">
              ${Array.from({length:24},(t,e)=>I`<button
                class="hour ${this._hour===e?"on":""}"
                @click=${()=>{this._hour=e,this._pick="custom"}}
              >${this._pad(e)}</button>`)}
            </div>
          </div>
        </div>
      </div>
    `}_renderTriggers(){return I`
      <div class="list">
        ${this._events.map((t,e)=>I`<button
            class="trigger rise ${this._event===t.key?"on":""}"
            style="animation-delay:${45*e}ms"
            @click=${()=>{this._event=t.key}}
          >
            <ha-icon .icon=${t.icon}></ha-icon>
            <div class="text">
              <span class="n">${t.name}</span><span class="s">${t.sub}</span>
            </div>
            <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
          </button>`)}
      </div>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return this._open||this._isSheet?10:2}}customElements.define("materia-schedule",as),window.customCards=window.customCards||[],window.customCards.push({type:"materia-schedule",name:"Materia Schedule",description:"Shortcuts-first schedule picker — quick chips, non-clock triggers, and a calendar that stays folded until asked for. Mocked, no backend.",preview:!0});const rs={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-on-secondary-container)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-state":["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],"secondary-state":["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],"tertiary-state":["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],"error-state":["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],"device-state":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]},ls=[kt,n`
    :host {
      display: inline-block;
    }

    .badge {
      box-sizing: border-box;
      height: 107px;
      width: 110px;
      border-radius: var(--ha-card-border-radius, 18px);
      overflow: hidden;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    .badge.no-state {
      grid-template-areas: "i" "n";
      grid-template-rows: 1fr min-content;
    }

    .badge.with-state {
      grid-template-areas: "i" "n" "s";
      grid-template-rows: 1fr min-content min-content;
    }

    .icon-cell {
      grid-area: i;
      align-self: start;
      display: flex;
      justify-content: start;
      align-items: start;
      height: 24px;
      padding: 14px 0 0 16px;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
    }

    .name {
      grid-area: n;
      justify-self: start;
      padding-left: 10px;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }

    .badge.no-state .name {
      margin: 0px 10px 30px 6px;
      align-self: end;
    }

    .badge.with-state .name {
      margin: 10px 10px 0 6px;
    }

    .state {
      grid-area: s;
      justify-self: start;
      margin: 0 0 10px 16px;
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      line-height: 18px;
    }

    .badge.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }

    .badge.unavailable {
      opacity: 0.4;
      pointer-events: none;
      filter: grayscale(80%);
    }
  `],cs=[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"primary-state",label:"Primary State"},{value:"secondary-state",label:"Secondary State"},{value:"tertiary-state",label:"Tertiary State"},{value:"error-state",label:"Error State"},{value:"device-state",label:"Device State"},{value:"battery",label:"Battery"}];customElements.define("materia-badge-editor",class extends qt{_sectionsSignature(){return this._config?.entity?"entity":"none"}get _sections(){const t=!!this._config?.entity,e=[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,template:!0,selector:{text:{}}},{name:"icon",required:!0,template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"variant",selector:{select:{mode:"dropdown",options:cs}}}]}];return t&&e.push({title:"State",icon:"mdi:state-machine",fields:[{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",template:!0,selector:{text:{}}}]}),e.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}),e}});const ds={cover:"open",lock:["locked","locking"],vacuum:"cleaning",media_player:"playing",climate:"heat",alarm_control_panel:"armed_away"};class hs extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-badge-editor")}static getStubConfig(t){const e=(t?Object.keys(t.states):[]).find(t=>t.startsWith("light.")||t.startsWith("switch."))||"";return{name:"Badge",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on",entity:e}}static styles=[$t,ls];setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("state_display","_resolvedStateDisplay"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state;if(null!=i)return Array.isArray(i)?i.includes(e):e===String(i);const s=t.entity_id.split(".")[0],o=ds[s]||"on";return Array.isArray(o)?o.includes(e):e===o}_getBatteryColors(t){const e=parseFloat(t?.state);return Number.isNaN(e)?["var(--ha-card-background)","var(--primary-text-color)"]:e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container, #ffecb3)","var(--md-sys-cust-color-on-warning-container, #6d4c00)"]:["var(--ha-card-background)","var(--primary-text-color)"]}get _templatesReady(){const t=this.config;return(!this._isTemplate(t.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t.state_display)||void 0!==this._resolvedStateDisplay)&&((!this._isTemplate(t.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t.name)||void 0!==this._resolvedName))))}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=!!t&&this._isUnavailable(e),s=!i&&this._isActive(e),o=this.config.variant||"secondary",n=this.config.show_state;let a=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,r=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on;const l=["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"];if(!a)if("battery"===o){const[t,i]=this._getBatteryColors(e);a=t,r=i}else if(l.includes(o)){const t=rs[o]||rs.secondary;a=t[0],r=r||t[1]}else if(s&&t){const t=rs[o]||rs.secondary;a=t[0],r=r||t[1]}else a="var(--ha-card-background)",r=r||"var(--primary-text-color)";r=r||"var(--primary-text-color)";const c=n?"with-state":"no-state",d=s?"active":"inactive";let h="";if(n&&i)h="Unavailable";else if(n&&e){const t=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));if(this._resolvedStateDisplay&&t)h=this._resolvedStateDisplay;else if(this.config.state_display&&!t)h=this.config.state_display;else{const t=e.state,i=Number(t);if(""===t||null==t||Number.isNaN(i))h=t;else{const t=e.attributes?.unit_of_measurement,s=Math.round(100*i)/100;h=t?"%"===t?`${s}%`:`${s} ${t}`:`${s}`}}h=this._capitalize(h)}return I`
      <div
        class="badge ${c} ${d} ${i?"unavailable":""}"
        style="background-color: ${a}; color: ${r};"
        @click=${this._handleTap}
        @dblclick=${this._handleDoubleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon} style="color: ${r};"></ha-icon>
        </div>
        <div class="name">${this._isTemplate(this.config.name)?this._resolvedName:this.config.name}</div>
        ${n?I`<div class="state">${h}</div>`:""}
      </div>
    `}_handleTap(){if(this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action){if(this._dblClickTimer)return;this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this.config.tap_action||{action:"toggle"})},250)}else this._handleAction(this.config.tap_action||{action:"toggle"})}_handleDoubleTap(){this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action&&(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,this._handleAction(this.config.double_tap_action))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._dblClickTimer),this._dblClickTimer=null}getCardSize(){return 2}}customElements.define("materia-badge",hs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-badge",name:"Materia Badge",description:"Square badge for dashboard headers.",preview:!0});const ps=[kt,n`
    ha-card {
      box-sizing: border-box;
      height: 44px;
      padding: 0 12px;
      display: grid;
      grid-template-areas: "n i";
      grid-template-columns: 1fr 20px;
      column-gap: 8px;
      align-items: center;
      cursor: pointer;
      font-family: inherit;
      border-radius: 0;
      overflow: hidden;
      background: none;
      box-shadow: none;
      border: none;
      -webkit-tap-highlight-color: transparent;
    }

    .name {
      grid-area: n;
      justify-self: start;
      text-align: left;
      align-self: center;
      font-size: var(--ha-font-size-m, 14px);
    }

    .icon-cell {
      grid-area: i;
      height: 20px;
      align-self: center;
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 26px;
      width: 34px;
      height: 34px;
      color: var(--md-sys-color-primary);
    }
  `];customElements.define("materia-checkbox-editor",class extends qt{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"tap_action_checked",label:"Action (checked)",selector:{ui_action:{}}},{name:"tap_action_unchecked",label:"Action (unchecked)",selector:{ui_action:{}}}]}]}});class us extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_boolean."))||"";return{entity:e,name:"Checkbox"}}static styles=[$t,ps];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(this.config.checked_entity){const t=this.hass?.states[this.config.checked_entity];if(!t)return!1;const e=String(t.state??"").split(",").map(t=>t.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(t=>e.includes(t)):!!this.config.checked_value&&e.includes(this.config.checked_value)}if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}updated(t){t.has("hass")&&this.hass&&this._resolveField("name","_resolvedName")}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=!e&&this._isChecked(t),s=this._isTemplate(this.config.name)?this._resolvedName:this.config.name??t?.attributes?.friendly_name??this.config.entity,o=i?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return I`
      <ha-card class="${e?"unavailable":""}" @click=${this._handleTap}>
        <div class="name">${s}</div>
        <div class="icon-cell">
          <ha-icon .icon=${o}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.hass?.states[this.config.entity],e=this._isChecked(t);let i;i=e&&this.config.tap_action_checked?this.config.tap_action_checked:!e&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",us),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Checkbox with custom checked state logic.",preview:!0});const ms=[kt,wt,n`
    .container {
      position: relative;
      width: 100%;
      min-height: 50px;
      background-color: var(--ha-card-background, var(--card-background-color));
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: background-color 0.3s ease, color 0.3s ease;
      cursor: pointer;
    }

    .container.no-bg {
      background: transparent !important;
    }

    .container.no-bg .icon-container {
      background-color: var(--ha-card-background, var(--card-background-color));
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      min-height: 42px;
      margin: 6px;
      margin-left: 8px;
      border-radius: 50%;
      background-color: transparent;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
    }

    .name-container {
      display: flex;
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      margin: 0 16px 0 4px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }

    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
    }

    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
  `];customElements.define("materia-pill-editor",class extends qt{_formData(){return{background:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"state_display",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"background",selector:{boolean:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{}}}]}]}});class gs extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedStateDisplay:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(t){const e=(t?Object.keys(t.states):[]).find(t=>t.startsWith("sensor."))||"";return{entity:e,name:"",icon:"mdi:information-outline"}}static styles=[$t,ms];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...t}}_classify(t){const e=this.config.ranges||[];if(!e.length)return{label:"",color:""};const i=parseFloat(t);if(Number.isNaN(i))return{label:"",color:""};for(const t of e)if(null==t.max||i<=t.max)return{label:t.label,color:t.color};return{label:"",color:""}}get _templatesReady(){const t=this.config;return(!this._isTemplate(t?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t?.name)||void 0!==this._resolvedName)))}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("state_display","_resolvedStateDisplay"))}render(){if(!this.hass||!this.config)return I``;if(!this._templatesReady)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||t?.attributes?.friendly_name||this.config.entity,s=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||t?.attributes?.icon||"",o=t?.attributes?.unit_of_measurement||"",n=t?.state??"",a=this.config.ranges||[],r=this._classify(n);let l;l=e?"Unavailable":this.config.state_display?this._isTemplate(this.config.state_display)?this._resolvedStateDisplay??"":this.config.state_display:a.length?o?`${n} · ${r.label||i}`:n:o?`${this._capitalize(n)} ${o}`:this._capitalize(n);const c=a.length?e?i:o||(r.label||i):"",d=this._resolvedColor||this.config.color||"var(--ha-card-background, var(--card-background-color))",h=this._resolvedColorOn||this.config.color_on||"var(--primary-text-color)",p=!1===this.config.background||"none"===this.config.background;return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${p?"no-bg":""}"
          style="background-color: ${p?"transparent":d}; color: ${h};"
          @click=${this._handleTap}
        >
          ${s?I`
            <div class="icon-container">
              <ha-icon .icon=${s} style="color: ${h};"></ha-icon>
            </div>
          `:""}
          <div class="name-container">
            <div class="name">${a.length?l:i}</div>
            <div class="state">${a.length?c:l}</div>
          </div>
          ${this._hasNavigateAction?I`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",gs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill for sensors, weather, and status indicators.",preview:!0});const fs=[kt,wt,$t,n`
  :host {
    position: relative;
    z-index: 1;
  }

  ha-card {
    overflow: visible !important;
    height: auto;
  }

  .trigger {
    position: relative;
    width: 100%;
    min-height: 56px;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    z-index: 1;
    transition: border-radius 0.2s ease;
  }

  .trigger.open-below {
    border-radius: 16px 16px 8px 8px;
  }

  .trigger.open-above {
    border-radius: 8px 8px 16px 16px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px 4px 6px 8px;
    border-radius: 50%;
    background-color: transparent;
    flex-shrink: 0;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    line-height: 18px;
    margin: 0 16px 0 4px;
    overflow: hidden;
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value {
    font-size: 12px;
    opacity: 0.7;
    white-space: nowrap;
    display: flex;
    align-items: baseline;
    gap: 5px;
    overflow: hidden;
  }

  .value-main {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value-sep {
    opacity: 0.55;
    flex-shrink: 0;
  }

  .value-sub {
    opacity: 0.9;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chevron-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-right: 4px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 50%;
  }

  .chevron {
    --mdc-icon-size: 20px;
    pointer-events: none;
  }

  /* The dropdown is rendered into a body-level portal so it escapes any
     ancestor stacking/overflow context. The panel animates in/out; positioning
     (left/top/width) is set imperatively on the portal host. */
  .portal-panel {
    max-height: min(600px, 70vh);
    overflow-y: auto;
    transform-origin: top center;
    animation: menu-pop-in 0.16s ease both;
  }

  .portal-panel.above {
    transform-origin: bottom center;
  }

  .portal-panel.closing {
    animation: menu-pop-out 0.14s ease both;
  }

  @keyframes menu-pop-in {
    from { opacity: 0; transform: scaleY(0.9); }
    to { opacity: 1; transform: scaleY(1); }
  }

  @keyframes menu-pop-out {
    from { opacity: 1; }
    to { opacity: 0; transform: scaleY(0.96); }
  }

  .dropdown {
    /* Opaque menu surface. Some themes define the surface token with alpha
       (glassy look); stacking the SAME color over itself composites its alpha
       up to fully opaque while keeping the exact hue — and needs no
       relative-color syntax (some webviews drop it). Without this, when the open
       dropdown overlaps a card below it, that card's text bleeds through. */
    --_surf: var(--md-sys-color-surface-container-high, var(--card-background-color, var(--ha-card-background, #1c1c1c)));
    background:
      linear-gradient(var(--_surf), var(--_surf)),
      linear-gradient(var(--_surf), var(--_surf)),
      linear-gradient(var(--_surf), var(--_surf)),
      linear-gradient(var(--_surf), var(--_surf)),
      linear-gradient(var(--_surf), var(--_surf)),
      linear-gradient(var(--_surf), var(--_surf)),
      linear-gradient(var(--_surf), var(--_surf)),
      var(--_surf);
    color: var(--primary-text-color);
    padding: 8px;
  }

  .below .dropdown {
    border-radius: 8px 8px 16px 16px;
  }

  .above .dropdown {
    border-radius: 16px 16px 8px 8px;
  }

  /* M3 expressive menu: container-toned panel, 28px corners all around,
     roomy medium-weight rows with trailing icons. Colors override via
     menu_color / menu_color_on. */
  /* Vibrant mapping per the M3E menu spec: tertiary-container panel,
     on-tertiary-container items, selected = solid tertiary/on-tertiary. */
  .dropdown.expressive {
    --_surf: var(--md-sys-color-tertiary-container, #ffd8e4);
    color: var(--md-sys-color-on-tertiary-container, var(--primary-text-color));
    --menu-selected-bg: var(--md-sys-color-tertiary, #7d5260);
    --menu-selected-fg: var(--md-sys-color-on-tertiary, #fff);
    padding: 10px 8px;
    min-width: 200px;
  }

  /* Elevation lives on the PANEL, not the dropdown — the panel is the scroll
     container (overflow-y: auto) and would clip a child's shadow to a rect. */
  .portal-panel.exp {
    border-radius: 28px;
    box-shadow:
      0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .below .dropdown.expressive,
  .above .dropdown.expressive {
    border-radius: 28px;
  }

  .dropdown.expressive .menu-item {
    min-height: 60px;
    padding: 0 20px;
    font-size: 15px;
    font-weight: 500;
    gap: 16px;
  }

  .dropdown.expressive .menu-item ha-icon {
    --mdc-icon-size: 22px;
    opacity: 0.9;
  }

  .dropdown.expressive .menu-item.selected {
    border-radius: 20px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 0 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: inherit;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
  }

  .menu-item::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .menu-item:hover::before {
    opacity: 0.08;
  }

  .menu-item:active::before {
    opacity: 0.12;
  }

  .menu-item.selected {
    background: var(--menu-selected-bg, var(--md-sys-color-tertiary, var(--md-sys-color-secondary)));
    color: var(--menu-selected-fg, var(--md-sys-color-on-tertiary, var(--md-sys-color-on-secondary)));
    font-weight: 500;
    border-radius: 12px;
  }

  .menu-item ha-icon {
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  .menu-item .item-text {
    flex: 1;
  }

  .divider {
    height: 1px;
    background: var(--md-sys-color-outline-variant, var(--divider-color, rgba(0, 0, 0, 0.08)));
    margin: 8px 16px;
  }
`];class _s extends qt{static properties={_expanded:{state:!0}};static styles=[qt.styles,n`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(t){super.setConfig(t),this._expanded??=null}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"position",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (flips to fit the viewport)"},{value:"below",label:"Below"},{value:"above",label:"Above"}]}}}]},{title:"Substate",icon:"mdi:format-text-variant-outline",fields:[{name:"substate",label:"Substate text / template",template:!0,selector:{text:{}}},{name:"substate_entity",label:"…or from entity",selector:{entity:{}}},{name:"substate_attribute",label:"Entity attribute (optional)",selector:{text:{}}},{name:"substate_separator",label:"Separator",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"•",label:"Dot •"},{value:"–",label:"Dash –"},{value:"/",label:"Slash /"}]}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"menu_variant",label:"Menu style",selector:{select:{mode:"dropdown",options:[{value:"surface",label:"Surface (classic)"},{value:"expressive",label:"Expressive (container tone, trailing icons)"}]}}},{name:"menu_color",label:"Menu panel color (expressive)",color:!0,selector:{text:{}}},{name:"menu_color_on",label:"Menu text color (expressive)",color:!0,selector:{text:{}}}]}]}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Mt((t,e)=>this._moveOption(t,e),(this._config.options||[]).map((t,e)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${t.label||t.value||`Option ${e+1}`}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(e)}>
                  <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(e)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===e?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${t}
                        .schema=${this._optionSchema}
                        .computeLabel=${At}
                        @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
      ${this._renderStateColors()}
    `}_renderStateColors(){const t=Array.isArray(this._config.state_colors)?this._config.state_colors:[];return I`
      <div class="options-header">
        <span>State colors</span>
        <ha-icon-button @click=${this._addStateColor}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      ${t.map((t,e)=>I`
          <div class="option-card">
            <div class="option-header">
              <span>${this._stateLabel(t.state)||`State ${e+1}`}</span>
              <ha-icon-button @click=${()=>this._removeStateColor(e)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="option-body">
              <ha-textfield
                label="State (comma-separated for multiple)"
                .value=${this._stateLabel(t.state)}
                @change=${t=>this._updateStateColor(e,"state",this._parseStateInput(t.target.value))}
              ></ha-textfield>
              <materia-color-picker
                label="Background"
                .value=${t.color||""}
                @value-changed=${t=>{t.stopPropagation(),this._updateStateColor(e,"color",t.detail.value)}}
              ></materia-color-picker>
              <materia-color-picker
                label="Text / icon"
                .value=${t.color_on||""}
                @value-changed=${t=>{t.stopPropagation(),this._updateStateColor(e,"color_on",t.detail.value)}}
              ></materia-color-picker>
            </div>
          </div>
        `)}
    `}_stateLabel(t){return Array.isArray(t)?t.join(", "):t||""}_parseStateInput(t){const e=(t||"").trim();return e.includes(",")?e.split(",").map(t=>t.trim()).filter(Boolean):e}_addStateColor(){const t=[...this._config.state_colors||[],{}];this._commit({...this._config,state_colors:t})}_removeStateColor(t){const e=[...this._config.state_colors||[]];e.splice(t,1);const i={...this._config};e.length?i.state_colors=e:delete i.state_colors,this._commit(i)}_updateStateColor(t,e,i){const s=(this._config.state_colors||[]).map(t=>({...t}));s[t]&&(""===i||null==i?delete s[t][e]:s[t][e]=i,this._commit({...this._config,state_colors:s}))}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[s]=i.splice(t,1);i.splice(e,0,s),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleExpand(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-menu-editor",_s);class bs extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_optimisticValue:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubstate:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=fs;static getConfigElement(){return document.createElement("materia-menu-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_select.")||t.startsWith("select."))||"";return{entity:e}}setConfig(t){this.config={position:"auto",...t},this._open=!1}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const t=this.hass?.states[this.config.entity],e=this.config.entity?.split(".")[0];if(("input_select"===e||"select"===e)&&t?.attributes?.options)return t.attributes.options.map(t=>({label:this._capitalize(t),value:t}));if("water_heater"===e&&t?.attributes?.operation_list){const e={eco:"mdi:leaf",performance:"mdi:speedometer",electric:"mdi:lightning-bolt",gas:"mdi:fire",heat_pump:"mdi:heat-pump-outline",high_demand:"mdi:water-plus",off:"mdi:power"};return t.attributes.operation_list.map(t=>({label:this._capitalize(t),value:t,icon:e[t]}))}return[]}get _pos(){return"above"===this.config.position||"below"===this.config.position?this.config.position:this._effPos??"below"}_computeEffPos(){const t=this.shadowRoot?.querySelector(".trigger");if(!t)return"below";const e=t.getBoundingClientRect(),i=Math.min(56*this._resolvedOptions.length+20,Math.min(600,.7*window.innerHeight)),s=window.innerHeight-e.bottom;return s>=i+8||s>=e.top?"below":"above"}get _currentValue(){return null!=this._optimisticValue?this._optimisticValue:this.hass?.states[this.config.entity]?.state??""}get _substate(){const t=this.config;if(null!=t.substate&&""!==t.substate)return this._isTemplate(t.substate)?this._resolvedSubstate??"":t.substate;if(t.substate_entity){const e=this.hass?.states[t.substate_entity];if(!e)return"";const i=t.substate_attribute?e.attributes?.[t.substate_attribute]:e.state;return null==i?"":String(i)}return""}_toggle(){this._open||(this._effPos=this._computeEffPos()),this._open=!this._open}_selectOption(t){const e=t.value;this._optimisticValue=e,this._open=!1;const i=this.config.entity?.split(".")[0];"input_select"===i||"select"===i?this._callService(i,"select_option",{entity_id:this.config.entity,option:e}):"water_heater"===i&&this._callService("water_heater","set_operation_mode",{entity_id:this.config.entity,operation_mode:e}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=t=>{if(!this._open)return;const e=t.composedPath?.()||[];e.includes(this)||this._portal&&e.includes(this._portal)||(this._open=!1)},document.addEventListener("click",this._outsideClickHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler),clearTimeout(this._optimisticTimer),clearTimeout(this._portalTimer),this._detachReposition(),this._removePortal()}updated(t){if(t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("substate","_resolvedSubstate"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn")),t.has("hass")&&null!=this._optimisticValue){const t=this.hass?.states[this.config.entity]?.state;t===this._optimisticValue&&(this._optimisticValue=null,clearTimeout(this._optimisticTimer))}t.has("_open")?this._open?this._openPortal():this._closePortal():this._open&&this._portalRoot&&!this._closing&&(this._renderPortal(),this._positionPortal())}_matchStateColor(t){const e=this.config.state_colors,i=Array.isArray(e)?e:Object.entries(e).map(([t,e])=>"string"==typeof e?{state:t,color:e}:{state:t,...e});return i.find(e=>Array.isArray(e.state)?e.state.map(String).includes(String(t)):String(e.state)===String(t))}_colors(){const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._currentValue;let s=this._resolvedColor||this.config.color,o=this._resolvedColorOn||this.config.color_on;const n=this.config.state_colors?this._matchStateColor(i):null;n&&(n.color&&(s=n.color),n.color_on&&(o=n.color_on));const a=!e&&(s||o),r=a?`${s?`background-color:${s};`:""}${o?`color:${o};`:""}`:"";return{stateObj:t,unavailable:e,currentValue:i,colored:a,triggerStyle:r,panelStyle:""+(s?`--_surf:${s};`:"")+(a&&o?`${r}--menu-selected-bg:color-mix(in srgb, ${o} 22%, transparent);--menu-selected-fg:${o};`:r)}}_ensurePortal(){if(this._portal)return;const t=document.createElement("div");t.className="materia-menu-portal",t.style.cssText="position:fixed; z-index:1000; pointer-events:auto;";const e=t.attachShadow({mode:"open"}),i=Array.isArray(fs)?fs:[fs];if("adoptedStyleSheets"in e&&i.every(t=>t.styleSheet))e.adoptedStyleSheets=i.map(t=>t.styleSheet);else{const t=document.createElement("style");t.textContent=i.map(t=>t.cssText).join("\n"),e.appendChild(t)}document.body.appendChild(t),this._portal=t,this._portalRoot=e}_removePortal(){this._portal&&(this._portal.remove(),this._portal=null,this._portalRoot=null)}static PORTAL_VARS=["--card-background-color","--divider-color","--ha-card-background","--md-sys-color-on-secondary","--md-sys-color-on-tertiary","--md-sys-color-on-tertiary-container","--md-sys-color-outline-variant","--md-sys-color-secondary","--md-sys-color-surface-container-high","--md-sys-color-tertiary","--md-sys-color-tertiary-container","--primary-text-color"];_syncThemeVars(){if(!this._portal)return;const t=getComputedStyle(this);for(const e of bs.PORTAL_VARS){const i=t.getPropertyValue(e);i?this._portal.style.setProperty(e,i):this._portal.style.removeProperty(e)}}_positionPortal(){if(!this._portal)return;const t=this.shadowRoot?.querySelector(".trigger");if(!t)return;const e=t.getBoundingClientRect(),i=this._portal;"expressive"===this.config.menu_variant?(i.style.left="auto",i.style.right=`${Math.max(8,window.innerWidth-e.right)}px`,i.style.width="auto",i.style.maxWidth="min(320px, calc(100vw - 24px))"):(i.style.right="auto",i.style.maxWidth="",i.style.left=`${e.left}px`,i.style.width=`${e.width}px`),"above"===this._pos?(i.style.top="auto",i.style.bottom=window.innerHeight-e.top+2+"px"):(i.style.bottom="auto",i.style.top=`${e.bottom+2}px`)}_attachReposition(){this._repositionRef||(this._repositionRef=()=>this._positionPortal(),window.addEventListener("scroll",this._repositionRef,!0),window.addEventListener("resize",this._repositionRef))}_detachReposition(){this._repositionRef&&(window.removeEventListener("scroll",this._repositionRef,!0),window.removeEventListener("resize",this._repositionRef),this._repositionRef=null)}_openPortal(){this._closing=!1,clearTimeout(this._portalTimer),this._ensurePortal(),this._portal.style.display="",this._syncThemeVars(),this._positionPortal(),this._renderPortal(),this._attachReposition()}_closePortal(){this._portalRoot&&(this._closing=!0,this._renderPortal(),this._detachReposition(),clearTimeout(this._portalTimer),this._portalTimer=setTimeout(()=>{this._portal&&(this._portal.style.display="none"),this._closing=!1},170))}_renderPortal(){this._portalRoot&&rt(this._dropdownTemplate(),this._portalRoot)}_dropdownTemplate(){if(!this.hass||!this.config)return I``;const{panelStyle:t,currentValue:e}=this._colors(),i=this._resolvedOptions,s=this._pos,o="expressive"===this.config.menu_variant,n=o?`${this.config.menu_color?`--_surf:${this.config.menu_color};`:""}${this.config.menu_color_on?`color:${this.config.menu_color_on};`:""}`:"";return I`
      <div class="portal-panel ${s} ${o?"exp":""} ${this._closing?"closing":""}">
        <div class="dropdown ${o?"expressive":""}" style=${t+n}>
          ${i.map(t=>I`
            <div
              class="menu-item ${t.value===e?"selected":""}"
              @click=${e=>{e.stopPropagation(),this._selectOption(t)}}
            >
              ${o?I`<span class="item-text">${t.label||t.value}</span>${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}`:I`${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}<span class="item-text">${t.label||t.value}</span>`}
            </div>
          `)}
        </div>
      </div>
    `}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._currentValue,s=this._resolvedOptions,o=s.find(t=>t.value===i)?.label||this._capitalize(i),n=this._substate,a=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||t?.attributes?.friendly_name||"",{triggerStyle:r}=this._colors();return I`
      <ha-card>
        <div class="trigger ${e?"unavailable":""} ${this._open?"above"===this._pos?"open-above":"open-below":""}" style=${r} @click=${this._toggle}>
          ${(()=>{const e=(this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon)||t?.attributes?.icon||{water_heater:"mdi:water-boiler",input_select:"mdi:format-list-bulleted",select:"mdi:format-list-bulleted"}[this.config.entity?.split(".")[0]];return e?I`
              <div class="icon-container">
                <ha-icon .icon=${e}></ha-icon>
              </div>
            `:""})()}
          <div class="text-container">
            ${a?I`<div class="label">${a}</div>`:""}
            <div class="value">
              <span class="value-main">${o}</span>
              ${n?I`<span class="value-sep">${this.config.substate_separator||"•"}</span><span class="value-sub">${n}</span>`:""}
            </div>
          </div>
          <div class="chevron-btn" @click=${t=>{t.stopPropagation(),this._toggle()}}>
            <ha-icon class="chevron" icon=${this._open?"m3of:arrow-drop-up":"m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-menu",bs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-menu",name:"Materia Menu",description:"M3 vertical dropdown menu for select entities.",preview:!0});const vs=n`
  :host {
    display: block;
  }

  ha-card {
    background: none;
    border: none;
    box-shadow: none;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .stack {
    display: flex;
    flex-direction: column;
    width: 140px;
    border-radius: 999px;
    overflow: hidden;
    background: var(--ha-card-background, var(--card-background-color));
    --_active: var(--materia-active-bg, var(--md-sys-cust-color-device-container, var(--md-sys-color-secondary-container)));
  }

  .segment {
    height: 130px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0;
    transition: background-color 0.2s ease, color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .segment:not(:last-child) {
    border-bottom: 1px solid var(--md-sys-color-outline-variant, var(--divider-color, rgba(0, 0, 0, 0.12)));
  }

  /* The divider touching an active segment takes the active color rather than
     staying gray — both the active segment's own bottom edge and the edge of
     the segment directly above it. */
  .segment.active:not(:last-child),
  .segment:not(:last-child):has(+ .segment.active) {
    border-bottom-color: var(--_active);
  }

  .segment ha-icon {
    --mdc-icon-size: 28px;
  }

  .segment .seg-label {
    font-size: 13px;
    font-weight: 500;
  }

  .segment.active {
    background: var(--_active);
    color: var(--materia-active-fg, var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container)));
  }

  .segment:hover {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }

  .segment.active:hover {
    filter: brightness(0.97);
  }

  .state {
    font-size: 16px;
    color: var(--secondary-text-color);
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;class ys extends qt{static properties={_expanded:{state:!0}};static styles=[qt.styles,n`
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .opt-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(t){super.setConfig(t),this._expanded??=null}_formData(){return{show_state:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"attribute",helper:"Match option values against this attribute instead of state",selector:{text:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"active_color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}}]}]}_optionSchema(t){return[Dt(t?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"value",label:"Active when state equals (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Mt((t,e)=>this._moveOption(t,e),t.map((t,e)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${t.label||(t.icon&&!Dt(t.icon)?t.icon:`Option ${e+1}`)}</span>
                <ha-icon-button @click=${()=>this._toggleOption(e)}>
                  <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(e)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===e?I`
                    <div class="opt-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${t}
                        .schema=${this._optionSchema(t)}
                        .computeLabel=${At}
                        @value-changed=${t=>this._optionChanged(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const t=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[s]=i.splice(t,1);i.splice(e,0,s),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_optionChanged(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleOption(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-button-stack-editor",ys);class xs extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedActiveColor:{state:!0},_resolvedActiveColorOn:{state:!0}};static styles=vs;static getConfigElement(){return document.createElement("materia-button-stack-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("lock."))||"";return{entity:e,options:[{icon:"m3o:lock-open",value:"unlocked",tap_action:{action:"perform-action",perform_action:"lock.unlock",target:{entity_id:e}}},{icon:"m3o:lock",value:"locked",tap_action:{action:"perform-action",perform_action:"lock.lock",target:{entity_id:e}}}]}}setConfig(t){if(!Array.isArray(t.options)||0===t.options.length)throw new Error("at least one option is required");this.config=t}updated(t){t.has("hass")&&this.hass&&(this._resolveField("name","_resolvedName"),this._resolveField("active_color","_resolvedActiveColor"),this._resolveField("active_color_on","_resolvedActiveColorOn"))}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:""}_isActive(t,e){const i=t.value;if(null==i)return!1;const s=this.config.attribute?e?.attributes?.[this.config.attribute]:e?.state;return Array.isArray(i)?i.map(String).includes(String(s)):String(i)===String(s)}_onOption(t){t.tap_action&&this._handleAction(t.tap_action)}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=!!t&&this._isUnavailable(e),s=this.config.options||[],o=!1!==this.config.show_state&&!!t,n=this._resolvedActiveColor||this.config.active_color,a=this._resolvedActiveColorOn||this.config.active_color_on,r=`${n?`--materia-active-bg:${n};`:""}${a?`--materia-active-fg:${a};`:""}`,l=i?"Unavailable":e?this._capitalize(e.state):"";return I`
      <ha-card>
        <div class="wrap ${i?"unavailable":""}">
          ${this._name?I`<div class="name">${this._name}</div>`:""}
          <div class="stack" style=${r}>
            ${s.map(t=>I`
                <button
                  class="segment ${!i&&this._isActive(t,e)?"active":""}"
                  title=${t.label||""}
                  @click=${()=>this._onOption(t)}
                >
                  ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:V}
                  ${t.label?I`<span class="seg-label">${t.label}</span>`:V}
                </button>
              `)}
          </div>
          ${o?I`<div class="state">${l}</div>`:V}
        </div>
      </ha-card>
    `}getCardSize(){return Math.max(2,2*(this.config?.options?.length||2))}}customElements.define("materia-button-stack",xs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-stack",name:"Materia Button Stack",description:"Vertical segmented button — stacked options with optional active-state highlighting.",preview:!0});const ws=n`
  :host {
    display: block;
  }

  ha-card {
    background: none;
    border: none;
    box-shadow: none;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 4px;
  }

  .bar {
    position: relative;
    width: 100%;
    height: 28px;
    cursor: pointer;
    touch-action: none;
  }

  .times {
    display: flex;
    justify-content: space-between;
    padding: 0 4px;
  }

  .time {
    font-size: 13px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  .track {
    stroke: var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.3));
    stroke-width: 4;
    stroke-linecap: round;
    fill: none;
  }

  .wave {
    stroke: var(--mp-color, var(--md-sys-color-primary));
    stroke-width: 4;
    stroke-linecap: round;
    fill: none;
    /* Animation is always defined; pausing freezes it in place (no snap-back). */
    animation: mp-flow 0.9s linear infinite;
    animation-play-state: paused;
    /* Hint the compositor to give the wave its own layer so the flow animation
       isn't disturbed by repaints elsewhere in the card. */
    will-change: transform;
  }

  .wave.playing {
    animation-play-state: running;
  }

  @keyframes mp-flow {
    to {
      transform: translateX(32px);
    }
  }

  .thumb {
    fill: var(--mp-color, var(--md-sys-color-primary));
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;customElements.define("materia-media-progress-editor",class extends qt{_formData(){return{show_times:!0,seekable:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"show_times",selector:{boolean:{}}},{name:"seekable",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Wave color",color:!0,template:!0,selector:{text:{}}}]}]}});let $s=0;class ks extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_w:{state:!0},_resolvedColor:{state:!0}};static styles=ws;static getConfigElement(){return document.createElement("materia-media-progress-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("media_player."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config=t,this._cid??="mp-clip-"+ ++$s}_position(){const t=this.hass?.states[this.config.entity];if(!t)return{pos:0,dur:0,playing:!1,live:!1};const e=Number(t.attributes.media_duration)||0;let i=Number(t.attributes.media_position)||0;const s="playing"===t.state,o=t.attributes.media_position_updated_at;s&&o&&(i+=(Date.now()-new Date(o).getTime())/1e3);const n=`${this.config.entity}|${t.attributes.media_content_id??t.attributes.media_title??""}`;return n!==this._latchKey&&(this._latchKey=n,this._live=!1),s?e>0&&i>=e-.25&&(this._live=!0):this._live=!1,e&&(i=Math.min(i,e)),{pos:Math.max(0,i),dur:e,playing:s,live:this._live}}_fmt(t){t=Math.max(0,Math.round(t));const e=Math.floor(t/3600),i=Math.floor(t%3600/60),s=t%60,o=t=>String(t).padStart(2,"0");return e>0?`${e}:${o(i)}:${o(s)}`:`${i}:${o(s)}`}_wavePath(t,e){let i="";for(let s=t;s<=e;s+=2){const t=14-2*Math.sin(2*Math.PI*s/32);i+=`${i?" L":"M"} ${s.toFixed(1)} ${t.toFixed(1)}`}return i||"M 0 14"}firstUpdated(){const t=this.shadowRoot?.querySelector(".bar");t&&(this._w=t.clientWidth,this._ro=new ResizeObserver(t=>{this._w=t[0].contentRect.width}),this._ro.observe(t))}updated(){const t=this.shadowRoot;this._clipRect=t?.querySelector("clipPath rect"),this._thumbEl=t?.querySelector(".thumb"),this._trackEl=t?.querySelector(".track"),this._posEl=t?.querySelector(".time");"playing"===this.hass?.states[this.config.entity]?.state&&!this._live?this._startLoop():this._stopLoop(),this.hass&&this._resolveField("color","_resolvedColor")}_startLoop(){if(this._raf)return;const t=()=>{this._raf=requestAnimationFrame(t),this._tickDom()};this._raf=requestAnimationFrame(t)}_tickDom(){const{pos:t,dur:e,live:i}=this._position(),s=this._w||300,o=(i?1:e>0?Math.min(1,t/e):0)*s;this._clipRect&&this._clipRect.setAttribute("width",Math.max(0,o)),this._thumbEl&&this._thumbEl.setAttribute("x",o-2),this._trackEl&&this._trackEl.setAttribute("x1",o),this._posEl&&(this._posEl.textContent=this._fmt(t)),i&&this._stopLoop()}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_fullWave(t){return this._waveW!==t&&(this._waveW=t,this._wavePathCache=this._wavePath(-32,t+32)),this._wavePathCache}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),this._ro?.disconnect()}_seek(t){if(!1===this.config.seekable)return;const{dur:e}=this._position();if(!e)return;const i=t.currentTarget.getBoundingClientRect(),s=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width));this._callService("media_player","media_seek",{entity_id:this.config.entity,seek_position:s*e})}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),{pos:i,dur:s,playing:o,live:n}=this._position(),a=this._w||300,r=(n?1:s>0?Math.min(1,i/s):0)*a,l=!1!==this.config.show_times,c=this._resolvedColor||this.config.color;return I`
      <ha-card>
        <div class="wrap ${e?"unavailable":""}" style=${c?`--mp-color:${c};`:""}>
          <div class="bar" @pointerdown=${this._seek}>
            <svg width="100%" height=${28}>
              <defs>
                <clipPath id=${this._cid}>
                  <rect x="0" y="0" width=${Math.max(0,r)} height=${28}></rect>
                </clipPath>
              </defs>
              <line class="track" x1=${r} y1=${14} x2=${a} y2=${14}></line>
              <g clip-path="url(#${this._cid})">
                <path class="wave ${o?"playing":""}" d=${this._fullWave(a)}></path>
              </g>
              <rect class="thumb" x=${r-2} y=${4} width="4" height="20" rx="2"></rect>
            </svg>
          </div>
          ${l?I`
                <div class="times">
                  <span class="time">${this._fmt(i)}</span>
                  <span class="time">${this._fmt(s)}</span>
                </div>
              `:V}
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-media-progress",ks),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media-progress",name:"Materia Media Progress",description:"Wavy (M3 expressive) media seek bar with elapsed/duration and tap-to-seek.",preview:!0});const Cs=n`
  :host {
    display: block;
  }

  ha-card {
    background: none;
    border: none;
    box-shadow: none;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;
  }

  .art {
    width: 100%;
    max-width: var(--mm-art, 240px);
    aspect-ratio: 1;
    border-radius: 18px;
    background-color: var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.2));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .title {
    font-family: var(--materia-font-display, inherit);
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: var(--primary-text-color);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subtitle {
    font-size: 14px;
    text-align: center;
    color: var(--secondary-text-color);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Editorial treatment — ONLY while actual media plays (off/idle shows the
     device name, which stays quiet). Track = headline (display face, big,
     tight, wraps to two lines); artist = letter-spaced kicker byline. */
  .wrap.editorial .title {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.18;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    transition: font-weight 0.4s ease;
  }

  /* C-morph: a typographic BEAT as a new track starts, then settle. */
  .wrap.editorial.beat .title {
    font-weight: 800;
  }

  /* Paused music relaxes its voice. */
  .wrap.editorial.paused .title {
    font-weight: 550;
  }

  @media (prefers-reduced-motion: reduce) {
    .wrap.editorial .title {
      transition: none;
    }
  }

  .wrap.editorial .subtitle {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    margin-top: 2px;
    opacity: 0.8;
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;customElements.define("materia-media-editor",class extends qt{_formData(){return{show_art:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"name",label:"Title",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"image",helper:"Defaults to the entity's album art",template:!0,selector:{text:{}}},{name:"fallback_image",helper:"Shown when there's no art",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_art",selector:{boolean:{}}},{name:"art_size",label:"Art size (px)",selector:{number:{min:80,max:480,mode:"box"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class Ss extends(xt(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedImage:{state:!0}};static styles=Cs;static getConfigElement(){return document.createElement("materia-media-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("media_player."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config=t}updated(t){if(t.has("hass")&&this.hass){this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("image","_resolvedImage");const t=this._stateObj?.attributes?.media_title;t&&this._lastTrack&&t!==this._lastTrack&&(this._beat=!0,this.requestUpdate(),clearTimeout(this._beatTimer),this._beatTimer=setTimeout(()=>{this._beat=!1,this.requestUpdate()},900)),this._lastTrack=t}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._beatTimer)}get _stateObj(){return this.hass?.states[this.config.entity]}get _title(){if(this.config.name)return this._isTemplate(this.config.name)?this._resolvedName:this.config.name;const t=this._stateObj?.attributes;return t?.media_title||t?.friendly_name||""}get _subtitle(){if(this.config.subtitle)return this._isTemplate(this.config.subtitle)?this._resolvedSubtitle:this.config.subtitle;const t=this._stateObj?.attributes;return t?.media_artist||t?.media_album_name||""}get _image(){if(this.config.image){const t=this._isTemplate(this.config.image)?this._resolvedImage:this.config.image;if(t)return t}return this._stateObj?.attributes?.entity_picture||this.config.fallback_image||""}_tap(){this._handleAction(this.config.tap_action||{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj,e=this._isUnavailable(t),i=this._image,s=this._title,o=this._subtitle,n=`${this.config.art_size?`--mm-art:${this.config.art_size}px;`:""}${i?`background-image:url('${i}');`:""}`,a=!e&&!!t?.attributes?.media_title&&!["off","idle","standby"].includes(t.state),r=a&&"paused"===t.state;return I`
      <ha-card>
        <div class="wrap ${e?"unavailable":""} ${a?"editorial":""} ${this._beat?"beat":""} ${r?"paused":""}" @click=${this._tap}>
          ${!1===this.config.show_art?V:I`<div class="art" style=${n}></div>`}
          ${s?I`<div class="title">${s}</div>`:V}
          ${o?I`<div class="subtitle">${o}</div>`:V}
        </div>
      </ha-card>
    `}getCardSize(){return 4}}customElements.define("materia-media",Ss),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media",name:"Materia Media",description:"Now-playing card — album art, title and subtitle (all templatable).",preview:!0});const Es=n`
  :host {
    display: block;
  }

  ha-card {
    background: none;
    border: none;
    box-shadow: none;
  }

  svg {
    width: 100%;
    max-width: var(--clock-size, 100%);
    aspect-ratio: 1;
    display: block;
    margin: 0 auto;
    font-family: inherit;
  }

  .face {
    fill: var(--clock-face, var(--md-sys-color-surface-container-high, var(--card-background-color, #eee)));
  }

  .num {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    font-family: var(--materia-font-display, inherit);
    font-weight: 700;
  }

  .dot {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
  }

  .digital {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 26%, transparent));
    font-family: var(--materia-font-display, inherit);
    font-weight: 800;
    letter-spacing: -1px;
    font-variant-numeric: tabular-nums;
    /* C-morph glide between the per-second breathe steps. */
    transition: font-weight 1s linear;
  }

  /* The ONE accent-face moment in the system (Fraunces italic). */
  .date {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    font-family: var(--materia-font-accent, var(--materia-font-display, inherit));
    font-style: italic;
    font-weight: 500;
  }

  .second-dot {
    fill: var(--clock-second, var(--md-sys-color-error, #d33));
  }

  .hand {
    stroke-linecap: round;
  }

  .hour {
    stroke: var(--clock-hand, var(--md-sys-color-primary, #222));
    stroke-width: var(--clock-hour-w, 5);
  }

  .minute {
    stroke: var(--clock-hand, var(--md-sys-color-primary, #222));
    stroke-width: var(--clock-minute-w, 3.5);
  }

  .second {
    stroke: var(--clock-second, var(--md-sys-color-error, #d33));
    stroke-width: var(--clock-second-w, 1.4);
  }

  .pin {
    fill: var(--clock-hand, var(--md-sys-color-primary, #222));
  }
`;customElements.define("materia-clock-editor",class extends qt{_formData(){return{hand_width:5,size:10,show_seconds:!0,...this._config}}get _sections(){return[{title:"Clock",icon:"mdi:clock-outline",fields:[{name:"numbers",selector:{select:{mode:"dropdown",options:[{value:"cardinal",label:"Cardinal (12 · 3 · 6 · 9)"},{value:"all",label:"All (1–12)"},{value:"dots",label:"Hour dots"},{value:"none",label:"None"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"second_dot",label:"Second hand as rim dot",selector:{boolean:{}}},{name:"smooth",label:"Smooth second hand",selector:{boolean:{}}},{name:"cookie",label:"Cookie face (12-sided)",selector:{boolean:{}}},{name:"digital",label:"Digital readout (HH/MM behind hands)",selector:{boolean:{}}},{name:"date",label:"Show date",selector:{boolean:{}}},{name:"hand_width",label:"Hand thickness",selector:{number:{min:1,max:12,step:.5,mode:"slider"}}},{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"face_color",label:"Face",color:!0,template:!0,selector:{text:{}}},{name:"number_color",label:"Numbers",color:!0,template:!0,selector:{text:{}}},{name:"hand_color",label:"Hands",color:!0,template:!0,selector:{text:{}}},{name:"second_color",label:"Second hand",color:!0,template:!0,selector:{text:{}}}]}]}});customElements.define("materia-clock",class extends ct{static properties={hass:{attribute:!1},config:{state:!0},_t:{state:!0}};static styles=Es;static getConfigElement(){return document.createElement("materia-clock-editor")}static getStubConfig(){return{numbers:"cardinal",show_seconds:!0}}setConfig(t){this.config=t||{}}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._stop()}updated(t){t.has("config")&&(this._facePath=null,this._stop(),this._start())}_scallop(){let t="";for(let e=0;e<=240;e++){const i=e/240*Math.PI*2,s=48+1*Math.cos(12*i);t+=`${0===e?"M":"L"}${(50+s*Math.cos(i)).toFixed(2)} ${(50+s*Math.sin(i)).toFixed(2)} `}return t+"Z"}_start(){if(!this._raf&&!this._tick)if(this.config?.smooth){const t=()=>{this._raf=requestAnimationFrame(t),this._t=performance.now()};this._raf=requestAnimationFrame(t)}else this._tick=setInterval(()=>this._t=Date.now(),1e3)}_stop(){this._raf&&cancelAnimationFrame(this._raf),this._tick&&clearInterval(this._tick),this._raf=null,this._tick=null}render(){if(!this.config)return I``;const t=new Date,e=!!this.config.smooth,i=t.getSeconds()+(e?t.getMilliseconds()/1e3:0),s=t.getMinutes()+i/60,o=30*(t.getHours()%12+s/60),n=6*s,a=6*i,r=!1!==this.config.show_seconds,l=!!(this.config.cookie??this.config.squiggle);l&&(this._facePath??=this._scallop());const c=this.config.numbers||"cardinal",d="all"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:"cardinal"===c?[12,3,6,9]:[],h="all"===c?40:34,p="all"===c?9:18,u="dots"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:[],m=!!this.config.digital,g=String(t.getHours()%12||12).padStart(2,"0"),f=String(t.getMinutes()).padStart(2,"0"),_=!!this.config.date,b=`${t.toLocaleDateString(void 0,{weekday:"short"})} ${t.getDate()}`,v=(o%360+360)%360,y=(n%360+360)%360,x=Math.min(v,y),w=Math.max(v,y),$=w-x;let k=$>=360-$?x+$/2:w+(360-$)/2;k=30*Math.round((k-15)/30)+15,k=(k%360+360)%360;const C=k*Math.PI/180,S=u.length?41:d.length?h:40,E=(50+S*Math.sin(C)).toFixed(2),A=(50-S*Math.cos(C)).toFixed(2);let M=k;M>90&&M<270&&(M-=180);const T=4.4*b.length/2/S*(180/Math.PI)+(u.length?4:8),F=t=>{if(!_)return!1;const e=(t%12*30%360+360)%360;let i=Math.abs(e-k)%360;return i>180&&(i=360-i),i<T},z=d.filter(t=>!F(t)),O=u.filter(t=>!F(t)),D=!!this.config.second_dot,P=a*Math.PI/180,U=(50+44*Math.sin(P)).toFixed(2),q=(50-44*Math.cos(P)).toFixed(2),R=this.config.hand_width,j=`--clock-size:${["98px","136px","174px","212px","250px","300px","360px","440px","560px","100%"][Math.min(10,Math.max(1,this.config.size??10))-1]};`+(this.config.face_color?`--clock-face:${this.config.face_color};`:"")+(this.config.number_color?`--clock-number:${this.config.number_color};`:"")+(this.config.hand_color?`--clock-hand:${this.config.hand_color};`:"")+(this.config.second_color?`--clock-second:${this.config.second_color};`:"")+(R?`--clock-hour-w:${R};--clock-minute-w:${(.7*R).toFixed(2)};--clock-second-w:${(.3*R).toFixed(2)};`:"");return I`
      <ha-card style=${j}>
        <svg viewBox="0 0 100 100">
          ${l?H`<path class="face" d=${this._facePath}></path>`:H`<circle class="face" cx="50" cy="50" r="49"></circle>`}
          ${z.map(t=>{const e=t%12*30*Math.PI/180,i=50+h*Math.sin(e),s=50-h*Math.cos(e);return H`<text class="num" x=${i.toFixed(1)} y=${s.toFixed(1)} font-size=${p} text-anchor="middle" dominant-baseline="central">${t}</text>`})}
          ${O.map(t=>{const e=t%12*30*Math.PI/180,i=50+41*Math.sin(e),s=50-41*Math.cos(e);return H`<circle class="dot" cx=${i.toFixed(1)} cy=${s.toFixed(1)} r="1.3"></circle>`})}
          ${m?(()=>{const e=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,i=(t.getSeconds()+(t.getMilliseconds?.()??0)/1e3)/60,s=e?800:Math.round(780+20*(1-Math.cos(2*Math.PI*i)));return H`
                <text class="digital" style="font-weight:${s}" x="50" y="40" font-size="30" text-anchor="middle" dominant-baseline="central">${g}</text>
                <text class="digital" style="font-weight:${s}" x="50" y="64" font-size="30" text-anchor="middle" dominant-baseline="central">${f}</text>
              `})():""}
          ${_?H`<text class="date" x=${E} y=${A} font-size="8" text-anchor="middle" dominant-baseline="central" transform="rotate(${M.toFixed(1)} ${E} ${A})">${b}</text>`:""}
          <line class="hand hour" x1="50" y1="50" x2="50" y2="28" transform="rotate(${o.toFixed(2)} 50 50)"></line>
          <line class="hand minute" x1="50" y1="50" x2="50" y2="16" transform="rotate(${n.toFixed(2)} 50 50)"></line>
          ${r?D?H`<circle class="second-dot" cx=${U} cy=${q} r="3.2"></circle>`:H`<line class="hand second" x1="50" y1="56" x2="50" y2="13" transform="rotate(${a.toFixed(2)} 50 50)"></line>`:""}
          <circle class="pin" cx="50" cy="50" r="2.4"></circle>
        </svg>
      </ha-card>
    `}getCardSize(){return 4}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-clock",name:"Materia Clock",description:"Material You analog clock — cardinal numbers, sweeping hands.",preview:!0}),function(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* Display voice: Outfit VARIABLE (true wght 100-900 axis) — hero\n       numerals & titles via --materia-font-display; the weight axis\n       interpolates smoothly, which flavor C's morphs animate. */\n    @font-face {\n      font-family: 'Outfit';\n      font-style: normal;\n      font-weight: 100 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJuktqUYLkn8BJ.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    @font-face {\n      font-family: 'Outfit';\n      font-style: normal;\n      font-weight: 100 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtqUYLknw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* Accent voice: Fraunces italic — ONE personality moment (clock date). */\n    @font-face {\n      font-family: 'Fraunces';\n      font-style: italic;\n      font-weight: 500;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7frU9kMz3lR27gVA.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    @font-face {\n      font-family: 'Fraunces';\n      font-style: italic;\n      font-weight: 500;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7RrU9kMz3lR24.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}();console.info("%c MATERIA %c v0.13.1 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
