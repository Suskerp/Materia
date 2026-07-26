/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(o,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),s=t.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,k=w.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+A,M=`<${E}>`,T=document,F=()=>T.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,P="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,q=/>/g,B=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,R=/"/g,L=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),I=j(1),H=j(2),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,X=T.createTreeWalker(T,129);function Y(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===U?"!--"===l[1]?a=D:void 0!==l[1]?a=q:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=B):void 0!==l[3]&&(a=B):a===B?">"===l[0]?(a=s??U,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?B:'"'===l[3]?R:N):a===R||a===N?a=B:a===D||a===q?a=U:(a=B,s=void 0);const h=a===B&&t[e+1].startsWith("/>")?" ":"";n+=a===U?i+M:c>=0?(o.push(r),i.slice(0,c)+S+i.slice(c)+A+h):i+A+(-2===c?e:h)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const a=t.length-1,r=this.parts,[l,c]=K(t,e);if(this.el=Z.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=X.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=c[n++],i=o.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?ot:"@"===a[1]?st:et}),o.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],F()),X.nextNode(),r.push({type:2,index:++s});o.append(t[e],F())}}}else if(8===o.nodeType)if(o.data===E)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)r.push({type:7,index:s}),t+=A.length-1}s++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===W)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=z(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??T).importNode(e,!0);X.currentNode=o;let s=X.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new tt(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new nt(s,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(s=X.nextNode(),n++)}return X.currentNode=T,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),z(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new J(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new tt(this.O(F()),this.O(F()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const o=t;let a,r;for(t=s[0],a=0;a<s.length-1;a++)r=Q(this,o[i+a],e,a),r===W&&(r=this._$AH[a]),n||=!z(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+s[a+1]),this._$AH[a]=r}n&&!o&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends et{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===W)return;const i=this._$AH,o=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==V&&(i===V||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Z,tt),(w.litHtmlVersions??=[]).push("3.3.2");const rt=(t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new tt(e.insertBefore(F(),t),t,void 0,i??{})}return s._$AI(t),s
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},lt=globalThis;let ct=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;let ht;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2"),n`
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
`;class pt extends ct{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"}};static styles=n`
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
    `}_onInput(t){const e=parseFloat(t.target.value);this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(e)},100))}_onChange(t){clearTimeout(this._debounceTimer);const e=parseFloat(t.target.value);this._fireValueChanged(e)}_fireValueChanged(t){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",pt);const ut=t=>class extends t{_fireHaptic(t="light"){this.dispatchEvent(new CustomEvent("haptic",{detail:t,bubbles:!0,composed:!0}))}_handleAction(t){if(t&&"none"!==t.action)switch(this._fireHaptic("light"),t.action){case"toggle":{const e=t.entity||this.config?.entity;if(!e)break;const i=e.split(".")[0],o=String(this.hass?.states[e]?.state??"");switch(i){case"lock":this._callService("lock","locked"===o?"unlock":"lock",{entity_id:e});break;case"cover":this._callService("cover",["closed","closing"].includes(o)?"open_cover":"close_cover",{entity_id:e});break;case"valve":this._callService("valve",["closed","closing"].includes(o)?"open_valve":"close_valve",{entity_id:e});break;case"scene":this._callService("scene","turn_on",{entity_id:e});break;case"button":case"input_button":this._callService(i,"press",{entity_id:e});break;case"vacuum":this._callService("vacuum",["docked","idle","paused"].includes(o)?"start":"return_to_base",{entity_id:e});break;default:this._callService("homeassistant","toggle",{entity_id:e})}break}case"perform-action":case"call-service":{const e=t.perform_action||t.service||"",[i,o]=e.split(".",2);i&&o&&this._callService(i,o,{...t.service_data,...t.data},t.target);break}case"navigate":{if(!t.navigation_path)break;const e=!!t.navigation_replace;history[e?"replaceState":"pushState"](null,"",t.navigation_path);const i=new Event("location-changed",{bubbles:!0,composed:!0});i.detail={replace:e},this.dispatchEvent(i);break}case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config?.entity}}));break;case"fire-dom-event":{const e=new Event("ll-custom",{bubbles:!0,composed:!0,cancelable:!1});e.detail=t,this.dispatchEvent(e);break}}}_callService(t,e,i,o){return this.hass.callService(t,e,i,o).catch(i=>{const o=new Event("hass-notification",{bubbles:!0,composed:!0});o.detail={message:i?.message||`Failed: ${t}.${e}`},this.dispatchEvent(o)})}_capitalize(t){return t&&"string"==typeof t?t.charAt(0).toUpperCase()+t.slice(1):t}_isTemplate(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}_resolveField(t,e){const i=this.config?.[t];this._tplSubs??={};const o=this._tplSubs[e];if(!this._isTemplate(i))return void(o&&(this._tplSubs[e]=null,o.unsub?.then(t=>t&&t()).catch(()=>{}),this[e]=void 0));if(o&&o.template===i)return;o&&o.unsub?.then(t=>t&&t()).catch(()=>{});const s=this.hass?.connection;if(!s)return;const n={template:i,unsub:null};this._tplSubs[e]=n,n.unsub=s.subscribeMessage(t=>{if(this._tplSubs?.[e]!==n)return;const i=t?.result,o="string"==typeof i?i.trim():i;o!==this[e]&&(this[e]=o)},{type:"render_template",template:i,report_errors:!1}).catch(()=>(this._tplSubs?.[e]===n&&void 0===this[e]&&(this[e]=i),null))}_unsubscribeTemplates(){if(this._tplSubs){for(const t of Object.keys(this._tplSubs))this._tplSubs[t]?.unsub?.then(t=>t&&t()).catch(()=>{});this._tplSubs={}}}disconnectedCallback(){super.disconnectedCallback?.(),this._unsubscribeTemplates()}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_isUnavailable(t){return!t||"unavailable"===t.state}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}},mt=n`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`,gt=n`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(80%);
  }
`,ft=n`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
  }
`,_t=n`
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
`,vt=n`
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
`;const bt=n`
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
`,yt=t=>t.label??t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase()),xt=(t,e)=>I`
  <ha-sortable
    handle-selector=".drag-handle"
    @item-moved=${e=>{e.stopPropagation();const{oldIndex:i,newIndex:o}=e.detail;i!==o&&t(i,o)}}
  >
    <div>${e}</div>
  </ha-sortable>
`,wt=(t,e,i)=>({value:`var(--md-sys-cust-color-${t})`,swatch:`var(--md-sys-cust-color-${t}, ${i})`,label:e}),$t=(t,e)=>({value:`var(--md-sys-color-${t})`,swatch:`var(--md-sys-color-${t})`,label:e}),kt=[{title:"Light",options:[wt("light","Light","#FEE082"),wt("light-container","Light container","#FEEFCA"),wt("on-light","On light","#745D00")]},{title:"Device",options:[wt("device","Device","#D9E2FE"),wt("device-container","Device container","#EDF0FF"),wt("on-device","On device","#0156CF")]},{title:"Climate · Heat",options:[wt("climate-heat","Heat","#FFDFD4"),wt("climate-heat-container","Heat container","#FFEEE9"),wt("on-climate-heat","On heat","#A14614")]},{title:"Climate · Cool",options:[wt("climate-cool","Cool","#D3E8FF"),wt("climate-cool-container","Cool container","#EAF3FF"),wt("on-climate-cool","On cool","#327EA7")]},{title:"Climate · Auto",options:[wt("climate-auto","Auto","#D4EBDD"),wt("climate-auto-container","Auto container","#EAF6EE"),wt("on-climate-auto","On auto","#2E5E44")]},{title:"Water · Eco",options:[wt("water-eco","Eco","#C8E6C9"),wt("water-eco-container","Eco container","#E6F4EA"),wt("on-water-eco","On eco","#256029")]},{title:"Water · Performance",options:[wt("water-performance","Performance","#FFD1B0"),wt("water-performance-container","Performance container","#FFEDE0"),wt("on-water-performance","On performance","#9C3A00")]},{title:"Warning",options:[wt("warning","Warning","#D9A000"),wt("warning-container","Warning container","#FEEFCA"),wt("on-warning","On warning","#FFFFFF")]},{title:"Severity scale",options:[wt("scale-green","Scale green","#5E9E50"),wt("scale-yellow","Scale yellow","#C7A128"),wt("scale-orange","Scale orange","#D9713C"),wt("scale-red","Scale red","#C94D42"),wt("scale-purple","Scale purple","#8A4DA3"),wt("scale-maroon","Scale maroon","#7A4040")]},{title:"System (theme)",options:[$t("primary","Primary"),$t("primary-container","Primary container"),$t("secondary","Secondary"),$t("secondary-container","Secondary container"),$t("tertiary","Tertiary"),$t("tertiary-container","Tertiary container"),$t("error","Error"),$t("error-container","Error container"),$t("surface-container","Surface container")]}],Ct=new Set(kt.flatMap(t=>t.options.map(t=>t.value)));function St(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}const At={template:{}};class Et extends ct{static properties={label:{},value:{},_open:{state:!0},_customOpen:{state:!0}};static styles=n`
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
  `;get _isCustom(){return!!this.value&&!Ct.has(this.value)}_option(t){for(const e of kt){const i=e.options.find(e=>e.value===t);if(i)return i}return null}get _currentLabel(){if(!this.value)return"Default";const t=this._option(this.value);return t?t.label:"Custom"}get _currentHex(){if(!this.value)return null;const t=this._option(this.value);return t?t.swatch:this.value}disconnectedCallback(){super.disconnectedCallback(),this._removeOutside()}render(){const t=this._currentHex,e=I`<ha-icon class="check" icon="mdi:check"></ha-icon>`;return I`
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
              ${kt.map(t=>I`
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
    `}_toggle(){this._open=!this._open,this._open?(this._outside=t=>{t.composedPath().includes(this)||(this._open=!1,this._removeOutside())},document.addEventListener("click",this._outside,!0)):this._removeOutside()}_removeOutside(){this._outside&&(document.removeEventListener("click",this._outside,!0),this._outside=null)}_pick(t){this._open=!1,this._customOpen=!1,this._removeOutside(),this._emit(t)}_chooseCustom(){this._open=!1,this._customOpen=!0,this._removeOutside()}_onCustomInput(t){this._emit(t.target.value)}_emit(t){t!==this.value&&(this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0})))}}customElements.define("materia-color-picker",Et);class Mt extends ct{static properties={hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_modes:{state:!0}};static styles=n`
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
  `;setConfig(t){this._config=t,this._modes??={}}_formData(){return this._config||{}}get _sections(){return[]}_sectionsSignature(){return""}get _sectionsMemo(){const t=this._sectionsSignature();return this.__secSig===t&&this.__secVal||(this.__secSig=t,this.__secVal=this._sections),this.__secVal}_stableContext(t,e,i){const o={};for(const[t,s]of Object.entries(e))o[t]=i[s];this.__ctx??={};const s=this.__ctx[t];return s&&Object.keys(o).every(t=>s[t]===o[t])?s:(this.__ctx[t]=o,o)}_modeFor(t,e){const i=this._modes?.[t];return i||(St(e)?"template":"simple")}_toggleMode(t){const e=this._formData()[t],i=this._modeFor(t,e);this._modes={...this._modes||{},[t]:"template"===i?"simple":"template"}}render(){if(!this.hass||!this._config)return I``;const t=this._formData();return I`
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
    `}_renderField(t,e){const i=e[t.name],o=t.label??yt(t),s=!!t.template,n=s?this._modeFor(t.name,i):"simple",a=t.context?this._stableContext(t.name,t.context,e):void 0;let r;return r=s&&"template"===n?I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${At}
          .value=${i}
          .label=${o}
          .required=${!!t.required}
        ></ha-selector>
      `:t.color?I`
        <materia-color-picker
          class="field-control"
          .label=${o}
          .value=${i||""}
        ></materia-color-picker>
      `:I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${t.selector}
          .value=${i}
          .label=${o}
          .helper=${t.helper}
          .context=${a}
          .required=${!!t.required}
        ></ha-selector>
      `,I`
      <div class="field" @value-changed=${e=>this._fieldChanged(t.name,e)}>
        ${r}
        ${s?I`
              <ha-icon-button
                class="tpl-toggle ${"template"===n?"active":""}"
                .label=${"template"===n?"Use simple input":"Use a template"}
                @click=${()=>this._toggleMode(t.name)}
              >
                <ha-icon icon="mdi:code-braces"></ha-icon>
              </ha-icon-button>
            `:""}
      </div>
    `}_fieldChanged(t,e){e.stopPropagation(),this._setField(t,e.detail?.value)}_setField(t,e){const i={...this._config};""===e||null==e?delete i[t]:i[t]=e,this._commit(i)}_commit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}const Tt=new Set(["cover"]);function Ft(t){if(!t?.entity)return{...t};const e=t.entity.split(".")[0],i={show_sub_buttons:!1,show_stop:!0,show_state:!0,subtitle_inline:!0};return Tt.has(e)&&(i.show_sub_buttons=!0),{...i,...t}}class zt extends Mt{static properties={_expandedButton:{state:!0}};static styles=[Mt.styles,n`
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
    `];static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e}}setConfig(t){super.setConfig(t),this._expandedButton??=null}_formData(){return Ft(this._config)}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const t=this._config?.entity?.split(".")[0],e="cover"===t,i="light"===t;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",template:!0,selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||e?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...e?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(t){return[St(t?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${t.map((t,e)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(e)}>
              <span>${t.name||(t.icon&&!St(t.icon)?t.icon:`Button ${e+1}`)}</span>
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
                      .computeLabel=${yt}
                      @value-changed=${t=>this._subButtonChanged(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}_toggleButton(t){this._expandedButton=this._expandedButton===t?null:t}_addButton(){const t=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:t}),this._expandedButton=t.length-1}_removeButton(t){const e=[...this._config.sub_buttons||[]];e.splice(t,1),this._expandedButton===t&&(this._expandedButton=null);const i={...this._config};0===e.length?delete i.sub_buttons:i.sub_buttons=e,this._commit(i)}_subButtonChanged(t,e){const i=[...this._config.sub_buttons||[]];i[t]={...i[t],...e},this._commit({...this._config,sub_buttons:i})}}customElements.define("materia-card-editor",zt);const Ot={light:{showSlider:!0,activeState:"on",colorActive:"var(--md-sys-cust-color-light-container)",colorOn:"var(--md-sys-cust-color-on-light)",sliderColor:"var(--md-sys-cust-color-light)"},cover:{showSlider:!0,showSubButtons:!0,activeState:"open",colorActive:"var(--md-sys-cust-color-device-container)",colorOn:"var(--md-sys-cust-color-on-device)",sliderColor:"var(--md-sys-cust-color-device)"},switch:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},fan:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},lock:{activeState:["locked","locking"],colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},vacuum:{activeState:"cleaning",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},climate:{activeState:"heat",colorActive:"var(--md-sys-cust-color-climate-heat-container)",colorOn:"var(--md-sys-cust-color-on-climate-heat)"},media_player:{activeState:"playing",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},scene:{variant:"tonal",activeState:"__never__"},input_boolean:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},alarm_control_panel:{activeState:"armed_away",colorActive:"var(--md-sys-color-error-container)",colorOn:"var(--md-sys-color-on-error-container)"}},Pt={activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"};class Ut extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedShowState:{state:!0}};static getConfigElement(){return document.createElement("materia-card-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e}}setConfig(t){const e=t.entity?t.entity.split(".")[0]:"",i=Ot[e]||Pt,o=t.entity?{tap_action:{action:"toggle"}}:{};t.entity&&i.showSubButtons&&(o.show_sub_buttons=!0,o.show_stop=!0),this.config={...o,...t}}get _domain(){return this.config.entity?.split(".")[0]||""}get _domainConfig(){return Ot[this._domain]||Pt}get _stateObj(){return this.hass?.states?.[this.config.entity]}get _isActive(){const t=this._stateObj?.state,e=this.config.active_state||this._domainConfig.activeState;return"__never__"!==e&&(Array.isArray(e)?e.includes(t):t===e)}get _variant(){return this._domainConfig.variant||"filled"}get _isTonal(){return"tonal"===this._variant}get _isDimmable(){if("light"!==this._domain)return!1;const t=this._stateObj?.attributes;if(!t)return!1;return!!(t.supported_color_modes||[]).some(t=>"onoff"!==t)||void 0!==t.brightness}get _showSlider(){return!this._isTonal&&(void 0!==this.config.show_slider?this.config.show_slider:"light"===this._domain?this._isDimmable:"cover"===this._domain||(this._domainConfig.showSlider||!1))}get _subButtons(){const t=this.config.sub_buttons;if(Array.isArray(t))return t;if(!(void 0!==this.config.show_sub_buttons?this.config.show_sub_buttons:this._domainConfig.showSubButtons||!1))return[];if("cover"===this._domain){const t=this.config.entity,e=[{icon:"mdi:arrow-up",tap_action:{action:"perform-action",perform_action:"cover.open_cover",target:{entity_id:t}}}];return!1!==this.config.show_stop&&e.push({icon:"mdi:stop",tap_action:{action:"perform-action",perform_action:"cover.stop_cover",target:{entity_id:t}}}),e.push({icon:"mdi:arrow-down",tap_action:{action:"perform-action",perform_action:"cover.close_cover",target:{entity_id:t}}}),e}return[]}get _fillPercent(){const t=this._stateObj;if(!t)return 0;if("light"===this._domain){const e=t.attributes?.brightness??0;return Math.round(e/255*100)}return"cover"===this._domain?t.attributes?.current_position??0:0}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:this._stateObj?.attributes?.friendly_name||this.config.entity}get _icon(){return this.config.icon?this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon:"lock"===this._domain?this._isActive?"m3o:lock":"m3o:lock-open-right":void 0}get _subtitle(){const t=this.config.subtitle;return t?this._isTemplate(t)?this._resolvedSubtitle:t:""}_relativeLastChanged(){const t=this._stateObj;if(!t?.last_changed)return"";const e=(Date.now()-new Date(t.last_changed))/1e3;if(e<60)return"just now";const i=Math.floor(e/60);if(i<60)return`${i} minute${1===i?"":"s"} ago`;const o=Math.floor(e/3600);if(o<24)return`${o} hour${1===o?"":"s"} ago`;const s=Math.floor(e/86400);return`${s} day${1===s?"":"s"} ago`}_baseStateDisplay(){const t=this._stateObj;if(!t)return"";const e=this._domain;if("scene"===e)return"";if("light"===e){if("on"!==t.state)return this._capitalize("Off");if(this._isDimmable){return`${Math.round((t.attributes?.brightness??0)/255*100)}%`}return this._capitalize("On")}if("cover"===e){const e=t.attributes?.current_position;return 0===e||"closed"===t.state?this._capitalize("Closed"):100===e?this._capitalize("Open"):null!=e?`${this._capitalize("Open")} · ${e}%`:this._capitalize(t.state)}if("lock"===e){return{locked:"Locked",unlocked:"Unlocked",locking:"Locking",unlocking:"Unlocking",jammed:"Jammed"}[t.state]||this._capitalize(t.state)}const i=t.state,o=Number(i);if(""!==i&&null!=i&&!Number.isNaN(o)){const e=Math.round(100*o)/100,i=t.attributes?.unit_of_measurement;return i?"%"===i?`${e}%`:`${e} ${i}`:`${e}`}return this.hass.formatEntityState?this.hass.formatEntityState(t):this._capitalize(String(i).replace(/[_-]/g," "))}get _showState(){const t=this.config.show_state;if(!1===t)return!1;if(this._isTemplate(t)){if(void 0===this._resolvedShowState)return!0;const t=String(this._resolvedShowState).trim().toLowerCase();return!["false","off","none","no","0","hide",""].includes(t)}return!0}get _stateDisplay(){let t=this._showState?this._baseStateDisplay():"";if(this.config.show_last_changed){const e=this._relativeLastChanged();e&&(t=t?`${t} · ${e}`:e)}return t}_getContainerBg(){if(this._isTonal)return"var(--md-sys-color-secondary-container)";const t=this._resolvedColor||this.config.color;return this._isActive?t||("light"!==this._domain||this._isDimmable?this._domainConfig.colorActive:this._domainConfig.sliderColor||this._domainConfig.colorActive):"var(--ha-card-background, var(--card-background-color))"}_getTextColor(){if(this._isTonal)return"var(--md-sys-color-on-secondary-container)";const t=this._resolvedColorOn||this.config.color_on;return this._isActive?t||this._domainConfig.colorOn:"var(--primary-text-color)"}get _templatesReady(){const t=this.config;return(!this._isTemplate(t?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t?.name)||void 0!==this._resolvedName)))}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("show_state","_resolvedShowState"))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSlider()}_getContainer(){return this.shadowRoot?.querySelector(".container")}_getEventX(t){return void 0!==t.clientX&&0!==t.clientX?t.clientX:t.changedTouches?.[0]?t.changedTouches[0].clientX:t.touches?.[0]?t.touches[0].clientX:t.clientX||0}_getSliderRect(){const t=this._sliderFrameId||0;if(this._sliderRectCache&&this._sliderRectCacheFrame===t)return this._sliderRectCache;const e=this._getContainer()?.getBoundingClientRect();return this._sliderRectCache=e,this._sliderRectCacheFrame=t,this._sliderFrameRaf||(this._sliderFrameRaf=requestAnimationFrame(()=>{this._sliderFrameId=(this._sliderFrameId||0)+1,this._sliderFrameRaf=null})),e}_pctFromPointer(t){const e=this._getSliderRect();if(!e)return 0;const i=this._getEventX(t);return Math.max(0,Math.min(100,(i-e.left)/e.width*100))}_updateFillVisual(t){const e=this.shadowRoot?.querySelector(".fill");e&&(e.style.width=`${t}%`)}_onPointerDown(t){t.button&&0!==t.button||t.isPrimary&&(t.target.closest("button, .sub-btn")||"touch"===t.pointerType&&t.clientX<=30||(this._startX=t.clientX,this._startY=t.clientY,this._dragging=!1,this._scrollIntent=!1,this._pointerId=t.pointerId,this._sliderRectCache=null,this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),this._longPressTimer=setTimeout(()=>{this._longPressTimer=null,this._scrollIntent||this._startDrag(t)},200),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)))}_onEarlyMove(t){if(this._dragging||this._scrollIntent)return;const e=Math.abs(t.clientX-this._startX),i=Math.abs(t.clientY-this._startY);if(i>10&&i>e+4)return this._scrollIntent=!0,void this._abortSlider();e>6&&e>=i&&(clearTimeout(this._longPressTimer),this._longPressTimer=null,this._startDrag(t))}_startDrag(t){if(this._dragging)return;this._dragging=!0,this._dragStartTime=Date.now(),this._sliderRectCache=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null);const e=this._getContainer();try{e?.setPointerCapture(this._pointerId)}catch(t){}e?.classList.add("is-dragging"),document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),this._onDragMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onDragMoveRef),e&&e.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._cleanupSlider()},document.addEventListener("visibilitychange",this._onVisibilityRef);const i=this._pctFromPointer(t);this._updateFillVisual(i),this._throttledSetValue(i)}_preventTouch(t){t.preventDefault()}_onDragMove(t){"touch"===t.pointerType&&t.preventDefault();const e=this._pctFromPointer(t);this._updateFillVisual(e),this._throttledSetValue(e)}_onPointerUp(t){if(null!=this._startX){if("pointercancel"===t.type&&this._dragStartTime&&Date.now()-this._dragStartTime<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._cleanupSlider(),400));if(clearTimeout(this._graceTimer),this._dragging){const e=this._pctFromPointer(t);this._updateFillVisual(e),this._setSliderValue(e),this._fireHaptic("light")}else this._scrollIntent||this._handleTap();this._cleanupSlider()}}_abortSlider(){clearTimeout(this._longPressTimer),this._longPressTimer=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_cleanupSlider(){clearTimeout(this._graceTimer),this._abortSlider(),this._startX=null,this._dragging=!1,this._scrollIntent=!1,this._dragStartTime=null,this._sliderRectCache=null,this._throttleTimeout&&(clearTimeout(this._throttleTimeout),this._throttleTimeout=null);const t=this._getContainer();t?.classList.remove("is-dragging"),document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),t&&t.removeEventListener("touchmove",this._preventTouch);try{t?.releasePointerCapture(this._pointerId)}catch(t){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onDragMoveRef&&(window.removeEventListener("pointermove",this._onDragMoveRef),this._onDragMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_throttledSetValue(t){const e=Date.now();if(this._lastSliderArgs=t,this._throttleTimeout)return;e-(this._lastSliderCall||0)>=200?(this._lastSliderCall=e,this._setSliderValue(t)):this._throttleTimeout=setTimeout(()=>{this._throttleTimeout=null,this._lastSliderCall=Date.now(),this._setSliderValue(this._lastSliderArgs)},200)}_setSliderValue(t){if(!this.hass)return;const e=this.config.entity;if("light"===this._domain){let i=t;!this.config.slider_turn_off&&i<1&&(i=1);const o=Math.round(i/100*255);return void(o<=3&&this.config.slider_turn_off?this._callService("light","turn_off",{entity_id:e}):this._callService("light","turn_on",{entity_id:e,brightness:Math.max(o,1)}))}"cover"!==this._domain||this._callService("cover","set_cover_position",{entity_id:e,position:Math.max(0,Math.min(100,Math.round(t)))})}_handleSubButton(t,e){e.stopPropagation(),this._handleAction(t.tap_action)}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.config.entity&&this._callService("homeassistant","toggle",{entity_id:this.config.entity})}render(){if(!this.config||!this.hass)return I``;const t=this._stateObj,e=!!this.config.entity&&this._isUnavailable(t);!e&&this._isActive,this._isTonal;const i=!e&&this._showSlider,o=e?[]:this._subButtons,s=this._getContainerBg(),n=this._getTextColor(),a=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=e?"Unavailable":this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c;return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${s}; color: ${n};"
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

          ${o.length?I`
                <div class="sub-buttons">
                  ${o.map(t=>I`
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
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[ft,mt,_t,vt,gt,bt]}customElements.define("materia-card",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-card",name:"Materia Card",description:"Universal entity card. Auto-detects lights, covers, devices, locks, and scenes.",preview:!0});const Dt=n`
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
`;class qt extends Mt{static properties={_selectedCard:{state:!0},_expandedButton:{state:!0}};static styles=[Mt.styles,n`
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
    `];setConfig(t){super.setConfig(t),this._selectedCard??=-1,this._expandedButton??=null}_formData(){return{columns:2,...Ft(this._config)}}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const t=this._config?.entity?.split(".")[0],e="cover"===t,i="light"===t;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"columns",selector:{number:{min:1,max:6,mode:"slider"}}},{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||e?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...e?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(t){return[St(t?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=this._config.cards||[],e=t.length,i=this._selectedCard,o=i===e,s=i>=0&&i<e,n=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${n.map((t,e)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleSubButton(e)}>
              <span>${t.name||(t.icon&&!St(t.icon)?t.icon:`Button ${e+1}`)}</span>
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
                      .computeLabel=${yt}
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
          class="${o?"selected":""}"
          @click=${()=>this._selectedCard=e}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      <div id="editor">
        ${o?I`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `:s?I`
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
    `}_toggleSubButton(t){this._expandedButton=this._expandedButton===t?null:t}_addSubButton(){const t=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:t}),this._expandedButton=t.length-1}_removeSubButton(t){const e=[...this._config.sub_buttons||[]];e.splice(t,1),this._expandedButton===t&&(this._expandedButton=null);const i={...this._config};0===e.length?delete i.sub_buttons:i.sub_buttons=e,this._commit(i)}_subButtonChanged(t,e){const i=[...this._config.sub_buttons||[]];i[t]={...i[t],...e},this._commit({...this._config,sub_buttons:i})}_handleCardPicked(t){t.stopPropagation();const e=[...this._config.cards||[],t.detail.config];this._selectedCard=e.length-1,this._commit({...this._config,cards:e})}_handleChildChanged(t){if(t.stopPropagation(),t.detail.error)return;const e=[...this._config.cards||[]];e[this._selectedCard]=t.detail.config,this._commit({...this._config,cards:e})}_moveCard(t){const e=[...this._config.cards||[]],i=this._selectedCard,o=i+t;if(o<0||o>=e.length)return;const[s]=e.splice(i,1);e.splice(o,0,s),this._selectedCard=o,this._commit({...this._config,cards:e})}_removeCard(){const t=[...this._config.cards||[]];t.splice(this._selectedCard,1),this._selectedCard=Math.max(0,Math.min(this._selectedCard,t.length-1)),0===t.length&&(this._selectedCard=-1),this._commit({...this._config,cards:t})}}customElements.define("materia-room-editor",qt);class Bt extends Ut{static properties={...Ut.properties,_expanded:{state:!0},_childCards:{state:!0}};static styles=[ft,mt,_t,vt,gt,bt,Dt];static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e,columns:2,cards:[]}}constructor(){super(),this._expanded=!1,this._childCards=null}setConfig(t){if(!t.entity)throw new Error("entity is required");const e=this.config?.cards;this.config={columns:2,...t};const i=this.config.cards;JSON.stringify(e)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}firstUpdated(){this._createChildCards()}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&this._childCards&&this._childCards.forEach(t=>t.hass=this.hass)}async _createChildCards(){const t=this.config?.cards;if(!t||0===t.length)return void(this._childCards=[]);const e=await async function(){return ht||(ht=await window.loadCardHelpers(),ht)}();this._childCards=await Promise.all(t.map(async t=>{const i=await e.createCardElement(t);return this.hass&&(i.hass=this.hass),i})),this.requestUpdate()}_toggleExpand(t){t?.stopPropagation?.(),this._expanded=!this._expanded,this._fireHaptic("selection")}render(){if(!this.config||!this.hass)return I``;const t=this._stateObj,e=this._isUnavailable(t);!e&&this._isActive;const i=!e&&this._showSlider,o=e?[]:this._subButtons,s=this._getContainerBg(),n=this._getTextColor(),a=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=e?"Unavailable":this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c,u=this.config.columns||2;return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${s}; color: ${n};"
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
            ${o.map(t=>I`
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
    `}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}getGridOptions(){return{columns:12,rows:"auto"}}}customElements.define("materia-room",Bt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"Materia card with expandable child-card grid.",preview:!0});const Nt=n`
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
`;customElements.define("materia-climate-editor",class extends Mt{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,template:!0,selector:{text:{}}}]},{title:"Sensors",icon:"mdi:thermometer",fields:[{name:"temperature_entity",label:"Temperature sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",label:"Outdoor temperature sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}]}});class Rt extends(ut(ct)){static get properties(){return{hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_resolvedName:{state:!0}}}static styles=[ft,gt,Nt];static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("climate."))||"climate.example";return{entity:e,name:"Climate",step:.5}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this.config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this.config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return null!=this._optimisticTemp?this._optimisticTemp:this._entity?.attributes?.temperature}get _currentTemp(){return this.config.temperature_entity?this.hass?.states[this.config.temperature_entity]?.state:this._entity?.attributes?.current_temperature}get _humidity(){if(this.config.humidity_entity)return this.hass?.states[this.config.humidity_entity]?.state}get _outdoorTemp(){if(this.config.outdoor_temp_entity)return this.hass?.states[this.config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--primary-text-color)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"rgba(68,68,68,0.7)"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-surface-variant-light, #45464f)"}}_statusText(){const t=this._currentTemp,e=this._humidity,i=this._outdoorTemp,o=[];return null!=t&&o.push(`${t}°`),null!=e&&o.push(`${e}%`),null!=i&&o.push(`${i}°`),o.join(" · ")||""}_adjustTemp(t){const e=this._targetTemp;if(null==e)return;const i=this.config.step??.5,o=Number(this._entity?.attributes?.min_temp??7),s=Number(this._entity?.attributes?.max_temp??35),n=Math.min(s,Math.max(o,Math.round((Number(e)+t)/i)*i));this._optimisticTemp=n,this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:n}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4)}updated(t){if(t.has("hass")&&this.hass&&this._resolveField("name","_resolvedName"),t.has("hass")&&null!=this._optimisticTemp){const t=Number(this._entity?.attributes?.temperature);Number.isFinite(t)&&Math.abs(t-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer)}_handleTap(t){t.target.closest(".btn")||this._handleAction(this.config.tap_action??{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const t=this._entity,e=this._isUnavailable(t),i="off"===this._mode||e,o=e?"Unavailable":i?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return I`
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

          <span class="temp ${i?"off":""}">${o}</span>

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
    `}}customElements.define("materia-climate",Rt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"Climate thermostat with mode-based theming and temperature controls.",preview:!0});const Lt=[ft,mt,gt,n`
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
`];customElements.define("materia-weather-editor",class extends Mt{_formData(){return{show_temperature:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Sensors",icon:"mdi:water-percent",fields:[{name:"show_temperature",label:"Show temperature",selector:{boolean:{}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const jt={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"},It={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Ht extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}static styles=Lt;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",o=!1!==this.config.show_temperature;let s=t?.attributes?.temperature,n=t?.attributes?.temperature_unit||"°";if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&(s=t.state,n=t.attributes?.unit_of_measurement||n)}const a=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||jt[i]||"mdi:weather-partly-cloudy";let r=null;if(this.config.humidity_entity){const t=this.hass.states[this.config.humidity_entity];t&&(r=t.state)}null==r&&null!=t?.attributes?.humidity&&(r=t.attributes.humidity);const l=It[i]||this._capitalize(i.replace(/-|_/g," ")),c=this._isTemplate(this.config.name)?this._resolvedName:this.config.name,d=o&&null!=s?`${s}${n}`:null;let h;h=e?"Unavailable":c||(d||(l||"—"));const p=[];e||(d&&h!==d&&p.push(d),h!==l&&p.push(l),null!=r&&p.push(`${r}%`));const u=p.join(" · ");return I`
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
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-weather",Ht),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather condition card with automatic icon mapping.",preview:!0});const Wt="var(--md-sys-cust-color-weather-sun, #FFC83D)",Vt="var(--md-sys-cust-color-weather-cloud, #E6EAF0)",Gt="var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)",Xt="var(--md-sys-cust-color-weather-rain, #5FA8F5)",Yt="var(--md-sys-cust-color-weather-sun, #FFC83D)",Kt="var(--md-sys-cust-color-weather-moon, #DCE3F7)";let Zt=0;function Qt(t,e,i,o){const s=.1*i,n=72,a=[];for(let o=0;o<n;o++){const r=o/n*Math.PI*2,l=i+s*Math.cos(9*r);a.push([t+l*Math.cos(r),e+l*Math.sin(r)])}let r=`M${a[0][0].toFixed(2)} ${a[0][1].toFixed(2)} `;for(let t=0;t<n;t++){const e=a[(t-1+n)%n],i=a[t],o=a[(t+1)%n],s=a[(t+2)%n],l=i[0]+(o[0]-e[0])/6,c=i[1]+(o[1]-e[1])/6,d=o[0]-(s[0]-i[0])/6,h=o[1]-(s[1]-i[1])/6;r+=`C${l.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${o[0].toFixed(2)} ${o[1].toFixed(2)} `}return H`<path d=${r+"Z"} fill=${o} />`}function Jt(t,e,i,o){return H`
    <g fill=${o} transform=${`translate(${t} ${e}) scale(${i})`}>
      <circle cx="-4" cy="1" r="4" />
      <circle cx="1" cy="-1.5" r="5" />
      <circle cx="5" cy="1.5" r="3.6" />
      <rect x="-6.2" y="1.2" width="13.4" height="5" rx="2.6" />
    </g>`}function te(t,e,i){return H`<g stroke=${t} stroke-width="1.8" stroke-linecap="round">
    ${e.map(t=>H`<line x1=${t} y1=${i} x2=${t-1.5} y2=${i+3.5} />`)}
  </g>`}function ee(t,e){return H`<g fill=${"var(--md-sys-cust-color-weather-snow, #FFFFFF)"}>
    ${t.map(t=>H`<circle cx=${t} cy=${e} r="1.2" />`)}
  </g>`}const ie={sunny:t=>Qt(12,12,7.5,t.sun),clear:t=>Qt(12,12,7.5,t.sun),"clear-night":t=>H`<path d="M17 14.5 A7 7 0 1 1 10.5 5 A5.5 5.5 0 0 0 17 14.5 Z" fill=${t.moon} />`,partlycloudy:t=>H`${Qt(12,8,5.2,t.sun)}${Jt(10,15,.85,t.cloud)}`,partly_cloudy:t=>H`${Qt(12,8,5.2,t.sun)}${Jt(10,15,.85,t.cloud)}`,cloudy:t=>Jt(12,12,1.1,t.cloudDk),rainy:t=>H`${Jt(12,10,1,t.cloudDk)}${te(Xt,[8,12,16],17)}`,pouring:t=>H`${Jt(12,9.5,1,t.cloudDk)}${te(Xt,[7,10,13,16],16.5)}`,snowy:t=>H`${Jt(12,10,1,t.cloud)}${ee([8,12,16],18)}`,"snowy-rainy":t=>H`${Jt(12,10,1,t.cloud)}${te(Xt,[9,15],17)}${ee([12],18)}`,fog:t=>H`${Jt(12,9,.95,t.cloudDk)}<g stroke=${"var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)"} stroke-width="1.8" stroke-linecap="round">
      <line x1="6" y1="17" x2="18" y2="17" /><line x1="7.5" y1="20" x2="16.5" y2="20" /></g>`,hail:t=>H`${Jt(12,10,1,t.cloudDk)}${ee([8,12,16],18)}`,lightning:t=>H`${Jt(12,10,1,t.cloudDk)}<path d="M12 14 l-2.5 5 h2 l-1 4 4.5-6.5 h-2.2 l1.5-2.5 z" fill=${Yt} />`,"lightning-rainy":t=>H`${Jt(12,9.5,1,t.cloudDk)}${te(Xt,[8,16],17)}<path d="M12 14 l-2 4 h1.8 l-0.8 3.5 4-5.5 h-2 l1.3-2 z" fill=${Yt} />`,windy:()=>H`<g stroke=${Gt} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,"windy-variant":()=>H`<g stroke=${Gt} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,exceptional:t=>Jt(12,12,1.1,t.cloudDk)};function oe(t){const e=ie[t]||ie.cloudy,i=++Zt;return H`${function(t){return H`<defs>
    <radialGradient id="wxSunG-${t}" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${Wt} 55%, #FFF4CF)" />
      <stop offset="55%" stop-color=${Wt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${Wt} 72%, #B85C00)" />
    </radialGradient>
    <linearGradient id="wxCloudG-${t}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${Vt} 30%, #FFFFFF)" />
      <stop offset="70%" stop-color=${Vt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${Vt} 78%, #8B94A5)" />
    </linearGradient>
    <linearGradient id="wxCloudDkG-${t}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${Gt} 45%, #FFFFFF)" />
      <stop offset="70%" stop-color=${Gt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${Gt} 72%, #5A6474)" />
    </linearGradient>
    <radialGradient id="wxMoonG-${t}" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${Kt} 45%, #FFFFFF)" />
      <stop offset="60%" stop-color=${Kt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${Kt} 62%, #4A5AB8)" />
    </radialGradient>
  </defs>`}(i)}${e(function(t){return{sun:`url(#wxSunG-${t})`,cloud:`url(#wxCloudG-${t})`,cloudDk:`url(#wxCloudDkG-${t})`,moon:`url(#wxMoonG-${t})`}}(i))}`}const se=[ft,mt,n`
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
`];customElements.define("materia-weather-tile-editor",class extends Mt{_formData(){return{show_minmax:!0,mirror:!1,size:10,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"icon",label:"Custom icon (overrides the colored glyph)",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Min / Max",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show min / max",selector:{boolean:{}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}},{name:"mirror",label:"Mirror (temperature left, icon right)",selector:{boolean:{}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / temperature",color:!0,template:!0,selector:{text:{}}},{name:"minmax_color",label:"Min / max color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class ne extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedMinmaxColor:{state:!0},_forecast:{state:!0}};static styles=se;static getConfigElement(){return document.createElement("materia-weather-tile-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e,show_minmax:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("minmax_color","_resolvedMinmaxColor"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"";let o=t?.attributes?.temperature;if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&(o=t.state)}const s=null!=this._num(o)?`${this._num(o)}°`:"—",n=t=>{const e=t?this.hass.states[t]:null;return e&&!this._isUnavailable(e)?e.state:null};let a=n(this.config.low_entity),r=n(this.config.high_entity);const l=this._forecast?.[0]||t?.attributes?.forecast?.[0];null==a&&null!=l?.templow&&(a=l.templow),null==r&&null!=l?.temperature&&(r=l.temperature);const c=this.config.show_minmax&&(null!=this._num(a)||null!=this._num(r)),d=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,h=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,p=this._isTemplate(this.config.minmax_color)?this._resolvedMinmaxColor:this.config.minmax_color;let u="number"==typeof this.config.tilt?this.config.tilt:{right:-45,left:45,none:0}[this.config.tilt]??-45;this.config.mirror&&(u=-u);const m=this.config.icon_size??53,g=this.config.text_size??30,f=this.config.width??115,_=(this.config.height??85)/100,v=this.config.icon_x??5,b=this.config.icon_y??10,y=this.config.temp_x??10,x=this.config.temp_y??15,w=`--wt-size:${["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][Math.min(10,Math.max(1,this.config.size??10))-1]};--wt-tilt:${u}deg;--wt-icon-size:${m}cqi;--wt-temp-size:${g}cqi;--wt-width:${f}%;--wt-ratio:${_};--wt-icon-x:${v}%;--wt-icon-y:${b}%;--wt-temp-x:${y}%;--wt-temp-y:${x}%;${d?`--wt-bg:${d};`:""}${h?`--wt-fg:${h};`:""}`+(p?`--wt-minmax:${p};--wt-minmax-opacity:1;`:""),$=this.config.icon;return I`
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
            <div class="temp">${e?"—":s}</div>
          </div>
          ${$?I`<ha-icon class="wx-mono" .icon=${$}></ha-icon>`:H`<svg class="wx" viewBox="0 0 24 24">${oe(i)}</svg>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 3}}customElements.define("materia-weather-tile",ne),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-tile",name:"Materia Weather Tile",description:"Large blobby weather widget with a big temperature and colored condition icon.",preview:!0});const ae=n`
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
`,re=[ft,mt,gt,ae,n`
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
      font-size: clamp(72px, 38cqi, 150px);
      font-weight: 400;
      letter-spacing: normal;
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
  `];customElements.define("materia-weather-hero-editor",class extends Mt{_formData(){return{show_condition:!0,show_feels_like:!0,show_minmax:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"feels_like_entity",label:"Feels-like sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"show_condition",label:"Show condition text",selector:{boolean:{}}},{name:"show_icon",label:"Show condition glyph",selector:{boolean:{}}},{name:"show_feels_like",label:"Show feels-like",selector:{boolean:{}}}]},{title:"Night / Day",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show night / day range",selector:{boolean:{}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"night_label",label:"Night label",selector:{text:{}}},{name:"day_label",label:"Day label",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const le={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class ce extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColorOn:{state:!0}};static styles=re;static getConfigElement(){return document.createElement("materia-weather-hero-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color_on","_resolvedColorOn"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",o=le[i]||this._capitalize(String(i).replace(/-|_/g," "));let s=t?.attributes?.temperature;if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&!this._isUnavailable(t)&&(s=t.state)}const n=this._num(s);let a=t?.attributes?.apparent_temperature;if(this.config.feels_like_entity){const t=this.hass.states[this.config.feels_like_entity];t&&!this._isUnavailable(t)&&(a=t.state)}const r=this._num(a),l=t=>{const e=t?this.hass.states[t]:null;return e&&!this._isUnavailable(e)?e.state:null};let c=l(this.config.low_entity),d=l(this.config.high_entity);const h=this._forecast?.[0]||t?.attributes?.forecast?.[0];null==c&&null!=h?.templow&&(c=h.templow),null==d&&null!=h?.temperature&&(d=h.temperature);const p=this._num(c),u=this._num(d),m=this.config.night_label??"Night",g=this.config.day_label??"Day",f=this.config.separator??"•",_=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on;return I`
      <ha-card>
        <div
          class="hero ${e?"unavailable":""}"
          style="${_?`--wh-fg:${_};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          ${!1!==this.config.show_condition?I`<div class="condition">
                ${!1===this.config.show_icon||e?"":H`<svg class="cond-glyph" viewBox="0 0 24 24">${oe(i)}</svg>`}
                <span>${e?"—":o}</span>
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
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}function de(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}function he(t,{locale:e="en",showPrecip:i=!0,minPrecip:o=10}={}){return t.map(t=>{const s=de(t.temperature),n=de(t.precipitation_probability),a=new Date(t.datetime),r=Number.isNaN(a.getTime())?"":a.toLocaleTimeString(e,{hour:"numeric"});return I`
      <div class="hour">
        <span class="h-temp">${null!=s?`${s}°`:"—"}</span>
        <svg class="h-glyph" viewBox="0 0 24 24">${oe(t.condition)}</svg>
        ${i&&null!=n&&n>=o?I`<span class="h-precip">${n}%</span>`:I`<span class="h-precip empty"></span>`}
        <span class="h-time">${r}</span>
      </div>
    `})}customElements.define("materia-weather-hero",ce),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-hero",name:"Materia Weather Hero",description:"Current-conditions hero: condition, huge temperature, feels-like and night/day range.",preview:!0});const pe=n`
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
`,ue=[ft,mt,gt,ae,pe,n`
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
  `],me=[ft,mt,gt,ae,pe,n`
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
  `];customElements.define("materia-forecast-daily-editor",class extends Mt{_formData(){return{days:10,show_hourly:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"days",label:"Days shown",selector:{number:{min:3,max:15,step:1,mode:"slider"}}},{name:"show_hourly",label:"Tap a day to expand its hourly detail",selector:{boolean:{}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}},{name:"today_label",label:"Label for today",selector:{text:{}}}]}]}});class ge extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_hourly:{state:!0},_selected:{state:!0},_expanded:{state:!0}};static styles=me;static getConfigElement(){return document.createElement("materia-forecast-daily-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0,this._selected=0,this._expanded=!1}updated(t){t.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._subscribeForecast()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=null,this._hourly=[],this._hourlyByDay=new Map;const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});if(e.catch(()=>{}),this._fcUnsubs=[e],!1!==this.config.show_hourly){const e=this.hass.connection.subscribeMessage(t=>{this._hourly=t?.forecast||[];const e=new Map;for(const t of this._hourly){const i=this._dayKey(t.datetime);if(!i)continue;const o=e.get(i)||[];o.length<24&&o.push(t),e.set(i,o)}this._hourlyByDay=e},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:t});e.catch(()=>{}),this._fcUnsubs.push(e)}}_unsubForecast(){for(const t of this._fcUnsubs||[])t.then(t=>t&&t()).catch(()=>{});this._fcUnsubs=null,this._fcEntity=void 0}_dayKey(t){const e=this.hass?.config?.time_zone;if(!this._dayFmt||this._dayFmtTz!==e){this._dayFmtTz=e;try{this._dayFmt=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"})}catch{this._dayFmt=new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"2-digit",day:"2-digit"})}}const i=new Date(t);return Number.isNaN(i.getTime())?"":this._dayFmt.format(i)}_hoursFor(t){return t?.datetime&&this._hourlyByDay?.size&&this._hourlyByDay.get(this._dayKey(t.datetime))||[]}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}_dayLabel(t,e){const i=new Date(t);if(Number.isNaN(i.getTime()))return"";const o=new Date;if(0===e&&this._dayKey(t)===this._dayKey(o))return this.config.today_label??"Today";const s=this.hass?.locale?.language||navigator.language||"en";return i.toLocaleDateString(s,{weekday:"short"})}_onPointerDown(t){if("mouse"!==t.pointerType)return;const e=t.currentTarget;this._dragStartX=t.clientX,this._dragStartScroll=e.scrollLeft,this._didDrag=!1,this._dragPointerId=t.pointerId}_onPointerMove(t){if(null==this._dragStartX)return;const e=t.clientX-this._dragStartX;!this._didDrag&&Math.abs(e)>4&&(this._didDrag=!0,t.currentTarget.setPointerCapture(this._dragPointerId)),this._didDrag&&(t.currentTarget.scrollLeft=this._dragStartScroll-e)}_onPointerUp(t){null!=this._dragStartX&&(t.currentTarget.releasePointerCapture?.(t.pointerId),this._dragStartX=null,setTimeout(()=>{this._didDrag=!1},0))}_select(t,e){this._didDrag||(this._expanded=t!==this._selected||!this._expanded,this._selected=t,this.dispatchEvent(new CustomEvent("materia-forecast-day-selected",{detail:{index:t,day:e},bubbles:!0,composed:!0})))}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=(this._forecast?.length?this._forecast:t?.attributes?.forecast||[]).slice(0,this.config.days??10);if(!i.length)return I``;const o=!1!==this.config.show_precipitation,s=this.config.min_precipitation??10,n=i[this._selected],a=!1!==this.config.show_hourly&&this._expanded&&n?this._hoursFor(n):[],r=this._expanded&&a.length>0,l=this.hass?.locale?.language||navigator.language||"en";return I`
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
                <svg class="glyph" viewBox="0 0 24 24">${oe(t.condition)}</svg>
                ${o&&null!=a&&a>=s?I`<span class="precip">${a}%</span>`:I`<span class="precip empty"></span>`}
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
              ${r?he(a,{locale:l,showPrecip:o,minPrecip:s}):""}
            </div>
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-daily",ge),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-daily",name:"Materia Forecast Daily",description:"Pixel-style daily forecast pill row with colored glyphs and precipitation chance.",preview:!0});customElements.define("materia-forecast-hourly-editor",class extends Mt{_formData(){return{hours:24,show_header:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",label:"Header title",selector:{text:{}}},{name:"show_header",label:"Show header",selector:{boolean:{}}},{name:"hours",label:"Hours shown",selector:{number:{min:6,max:48,step:1,mode:"slider"}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}}]}]}});class fe extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0}};static styles=ue;static getConfigElement(){return document.createElement("materia-forecast-hourly-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_onPointerDown(t){if("mouse"!==t.pointerType)return;const e=t.currentTarget;this._dragStartX=t.clientX,this._dragStartScroll=e.scrollLeft,this._captured=!1,this._dragPointerId=t.pointerId}_onPointerMove(t){if(null==this._dragStartX)return;const e=t.clientX-this._dragStartX;!this._captured&&Math.abs(e)>4&&(this._captured=!0,t.currentTarget.setPointerCapture(this._dragPointerId)),this._captured&&(t.currentTarget.scrollLeft=this._dragStartScroll-e)}_onPointerUp(t){null!=this._dragStartX&&(t.currentTarget.releasePointerCapture?.(t.pointerId),this._dragStartX=null)}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=(this._forecast||[]).slice(0,this.config.hours??24);if(!i.length)return I``;const o=this.hass?.locale?.language||navigator.language||"en";return I`
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
          ${he(i,{locale:o,showPrecip:!1!==this.config.show_precipitation,minPrecip:this.config.min_precipitation??10})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}function _e(t,e,i,o=12){return ve(t,e,i,{vertices:o,innerRadius:.8,rounding:.5,rotate:-Math.PI/2})}function ve(t,e,i,{vertices:o,innerRadius:s=null,rounding:n=.2,rotate:a=0}={}){const r=[],l=null!=s?2*o:o;for(let o=0;o<l;o++){const n=null!=s&&o%2==1?i*s:i,c=a+o/l*Math.PI*2;r.push([t+n*Math.cos(c),e+n*Math.sin(c)])}const c=n*i,d=[];for(let t=0;t<l;t++){const e=r[(t-1+l)%l],i=r[t],o=r[(t+1)%l],s=[e[0]-i[0],e[1]-i[1]],n=[o[0]-i[0],o[1]-i[1]],a=Math.hypot(...s),h=Math.hypot(...n);s[0]/=a,s[1]/=a,n[0]/=h,n[1]/=h;const p=s[0]*n[0]+s[1]*n[1],u=Math.acos(Math.min(1,Math.max(-1,p)))/2;let m=c/Math.tan(u);m=Math.min(m,.5*a,.5*h);const g=m*Math.tan(u),f=[i[0]+s[0]*m,i[1]+s[1]*m],_=[i[0]+n[0]*m,i[1]+n[1]*m],v=s[0]*n[1]-s[1]*n[0];d.push({T1:f,T2:_,rEff:g,sweep:v>0?0:1})}let h=`M${d[0].T1[0].toFixed(2)} ${d[0].T1[1].toFixed(2)} `;for(let t=0;t<l;t++){const e=d[t],i=d[(t+1)%l];h+=`A${e.rEff.toFixed(2)} ${e.rEff.toFixed(2)} 0 0 ${e.sweep} ${e.T2[0].toFixed(2)} ${e.T2[1].toFixed(2)} `,h+=`L${i.T1[0].toFixed(2)} ${i.T1[1].toFixed(2)} `}return h+"Z"}function be(t,e,i,o,s){const n=o=>{const s=(o-90)*Math.PI/180;return[t+i*Math.cos(s),e+i*Math.sin(s)]},[a,r]=n(o),[l,c]=n(s),d=Math.abs(s-o)>180?1:0;return`M${a.toFixed(2)} ${r.toFixed(2)} A${i} ${i} 0 ${d} 1 ${l.toFixed(2)} ${c.toFixed(2)}`}customElements.define("materia-forecast-hourly",fe),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-hourly",name:"Materia Forecast Hourly",description:"Pixel-style hourly forecast strip with colored glyphs and precipitation chance.",preview:!0});const ye=[ft,mt,gt,ae,n`
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
      max-width: var(--wm-size, 225px);
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
      font-size: clamp(28px, 24cqi, 52px);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.02em;
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
      max-width: var(--wm-size, 225px);
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
      max-width: calc(var(--wm-size, 225px) * 2 + 16px);
      gap: clamp(4px, 2cqi, 10px);
    }

    .sub.hint {
      opacity: 0.6;
      max-width: 85%;
      line-height: 1.4;
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

    /* AQI bar */
    .aqi-bar {
      position: relative;
      display: flex;
      width: 82%;
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

    .dew-chip {
      display: inline-grid;
      place-items: center;
      min-width: 34px;
      height: 34px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--md-sys-cust-color-weather-rain, #5fa8f5) 35%, var(--ha-card-background));
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
         square tile taller. */
      width: 94%;
      height: auto;
      display: block;
    }

    .arc-fill {
      fill: color-mix(in srgb, var(--md-sys-cust-color-weather-sun, #ffc83d) 26%, transparent);
    }

    .horizon {
      stroke: color-mix(in srgb, currentColor 25%, transparent);
      stroke-width: 0.8;
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

    .gauge-center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      aspect-ratio: 100 / 86;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }

    .gauge-center ha-icon {
      --mdc-icon-size: clamp(18px, 8cqi, 24px);
    }

    .gauge-label {
      font-size: clamp(11px, 4.5cqi, 14px);
      font-weight: 600;
      max-width: 92%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .gauge-sub {
      font-size: clamp(11px, 4.2cqi, 13px);
      font-weight: 500;
      opacity: 0.8;
      text-align: center;
      line-height: 1.35;
      margin-top: 6px;
      padding-bottom: 2px;
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
  `],xe=[{value:"wind",label:"Wind"},{value:"uv",label:"UV index"},{value:"aqi",label:"Air quality"},{value:"pollen",label:"Pollen"},{value:"precipitation",label:"Precipitation"},{value:"sun",label:"Sunrise & sunset"},{value:"visibility",label:"Visibility"},{value:"humidity",label:"Humidity"},{value:"pressure",label:"Pressure"}];customElements.define("materia-weather-metric-editor",class extends Mt{_formData(){return{metric:"wind",...this._config}}_sectionsSignature(){return this._config?.metric||""}get _sections(){const t=this._config?.metric,e={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"metric",required:!0,selector:{select:{mode:"dropdown",options:xe}}},..."sun"!==t&&"pollen"!==t?[{name:"entity",label:"Weather entity",selector:{entity:{domain:"weather"}}},{name:"sensor",label:"Sensor override (optional)",selector:{entity:{domain:"sensor"}}}]:[],{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon (overrides default)",selector:{icon:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"wind"===t&&i.fields.push({name:"unit",label:"Unit (converts from the source)",selector:{select:{mode:"dropdown",options:[{value:"km/h",label:"km/h"},{value:"m/s",label:"m/s"},{value:"mph",label:"mph"},{value:"kn",label:"knots"},{value:"bft",label:"Beaufort"}]}}},{name:"bearing_entity",label:"Bearing sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"from_label",label:'"From" label',selector:{text:{}}}),"humidity"===t&&i.fields.push({name:"dew_entity",label:"Dew point sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"dew_label",label:"Dew point label",selector:{text:{}}}),"pressure"===t&&i.fields.push({name:"min",label:"Gauge min",selector:{number:{mode:"box"}}},{name:"max",label:"Gauge max",selector:{number:{mode:"box"}}}),"precipitation"===t&&i.fields.push({name:"total_label",label:"Subtitle when raining",selector:{text:{}}},{name:"none_label",label:'"None expected" label',selector:{text:{}}}),"sun"===t&&i.fields.push({name:"sun_entity",label:"Sun entity",selector:{entity:{domain:"sun"}}}),"pollen"===t&&i.fields.push({name:"entities",label:"Pollen sensors",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"variant",label:"Variant",selector:{select:{mode:"dropdown",options:[{value:"gauges",label:"Gauges (wide)"},{value:"small",label:"Small (dot list)"}]}}},{name:"max_shown",label:"Max species shown (worst first)",selector:{number:{min:1,max:6,step:1,mode:"slider"}}},{name:"hide_inactive",label:"Hide species at 'none'",selector:{boolean:{}}},{name:"max",label:"Scale max for numeric sensors (default 4)",selector:{number:{min:1,max:10,mode:"box"}}});const o={title:"Appearance",icon:"mdi:palette-outline",fields:[..."wind"===t?[{name:"shape_color",label:"Shape color",color:!0,template:!0,selector:{text:{}}}]:[],{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},s={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[e,i,o,s]:[e,o,s]}});const we="var(--md-sys-cust-color-scale-green, #5E9E50)",$e="var(--md-sys-cust-color-scale-yellow, #C7A128)",ke="var(--md-sys-cust-color-scale-orange, #D9713C)",Ce="var(--md-sys-cust-color-scale-red, #C94D42)",Se="var(--md-sys-cust-color-scale-purple, #8A4DA3)",Ae=[{max:2,label:"Low",color:we},{max:5,label:"Moderate",color:$e},{max:7,label:"High",color:ke},{max:10,label:"Very high",color:Ce},{max:1/0,label:"Extreme",color:Se}],Ee=[{max:50,label:"Good air quality",color:we},{max:100,label:"Moderate air quality",color:$e},{max:150,label:"Unhealthy for sensitive groups",color:ke},{max:200,label:"Unhealthy air quality",color:Ce},{max:300,label:"Very unhealthy air quality",color:Se},{max:1/0,label:"Hazardous air quality",color:"var(--md-sys-cust-color-scale-maroon, #7A4040)"}],Me=["None","Low","Moderate","High","Very high"];class Te extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=ye;static getConfigElement(){return document.createElement("materia-weather-metric-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e,metric:"wind"}}setConfig(t){if(!t.metric)throw new Error("metric is required");this.config={...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),"precipitation"!==this.config.metric||this.config.sensor?this._unsubForecast():this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){"precipitation"!==this.config?.metric||this.config.sensor||this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_numRaw(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}_value(t){if(this.config.sensor){const t=this.hass.states[this.config.sensor];return t&&!this._isUnavailable(t)?this._numRaw(t.state):null}const e=this.hass.states[this.config.entity];return this._numRaw(e?.attributes?.[t])}_weatherAttr(t){return this.hass.states[this.config.entity]?.attributes?.[t]}_scallopWave(t){const e=200/12;let i=`M0 ${t+3.2} `;for(let o=0;o<200;o+=e)i+=`Q ${o+e/2} ${t-3.2} ${o+e} ${t+3.2} `;return i+"V100 H0 Z"}render(){if(!this.hass||!this.config)return I``;const t={wind:()=>this._wind(),uv:()=>this._uv(),aqi:()=>this._aqi(),pollen:()=>this._pollen(),precipitation:()=>this._precipitation(),sun:()=>this._sun(),visibility:()=>this._visibility(),humidity:()=>this._humidity(),pressure:()=>this._pressure()}[this.config.metric];if(!t)return I``;const e=t();if(e===V)return I``;const i=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,o=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,s=Math.min(10,Math.max(1,this.config.size??10));return I`
      <ha-card
        style="--wm-size:${["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][s-1]};${i?`--wm-color:${i};`:""}${o?`--wm-color-on:${o};`:""}${this.config.shape_color?`--wm-shape:${this.config.shape_color};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||(this.config.sensor||this.config.entity?{action:"more-info",entity:this.config.sensor||this.config.entity}:void 0))}
      >
        ${e}
      </ha-card>
    `}_header(t,e){return I`<div class="header"><ha-icon icon=${this.config.icon||t}></ha-icon><span>${e}</span></div>`}_hint(t,e,i){return I`
      <div class="rect-tile">
        ${this._header(t,e)}
        <div class="sub hint">${i}</div>
      </div>
    `}_convertWind(t,e,i){const o={"km/h":1,"m/s":3.6,mph:1.609344,kn:1.852,knots:1.852,"ft/s":1.09728};if(!i||i===e)return{v:t,u:e};const s=t*(o[e]??1);if("bft"===i){let t=[1,5,11,19,28,38,49,61,74,88,102,117].findIndex(t=>s<t);return-1===t&&(t=12),{v:t,u:"Bft"}}return{v:s/(o[i]??1),u:i}}_wind(){const t=this._value("wind_speed");if(null==t)return V;const e=this.config.sensor?this.hass.states[this.config.sensor]?.attributes?.unit_of_measurement??"km/h":this._weatherAttr("wind_speed_unit")??"km/h",{v:i,u:o}=this._convertWind(t,e,this.config.unit);let s=this.config.bearing_entity?this._numRaw(this.hass.states[this.config.bearing_entity]?.state):this._numRaw(this._weatherAttr("wind_bearing"));const n=null!=s?`${this.config.from_label??"From"} ${a=s,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((a%360+360)%360/22.5)%16]}`:"";var a;const r=((null!=s?(s+180)%360:180)-90)*Math.PI/180,l=this._convertWind(t,e,"km/h").v,c=Math.max(.2,.42-Math.min(l,60)/60*.2);return I`
      <div class="rect-tile clip wind">
        <svg class="blob-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${function(t,e,i,o=Math.PI/2,s=.3){return ve(t,e,1.12*i,{vertices:3,rounding:s,rotate:o})}(50,50,46,r,c)} class="blob-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:weather-windy",this.config.name??"Wind")}
          <div class="big">${Math.round(i)}<span class="unit"> ${o}</span></div>
          ${n?I`<div class="sub">${n}</div>`:""}
        </div>
      </div>
    `}_uv(){const t=this._value("uv_index");if(null==t)return V;const e=Ae.find(e=>t<=e.max),i=Ae.map((t,i)=>{const o=(160-35*i)*Math.PI/180,s=50+33*Math.cos(o),n=52+33*Math.sin(o),a=t===e;return H`<circle cx=${s} cy=${n} r=${a?4.5:2.6}
        fill=${t.color} opacity=${a?1:.3} />`});return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${_e(50,52,45,12)} class="shape-fill" />
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
          <path d=${_e(50,52,44,12)} class="shape-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:eye-outline",this.config.name??"Visibility")}
          <div class="big">${t}<span class="unit"> ${e}</span></div>
        </div>
      </div>
    `}_pressure(){const t=this._value("pressure");if(null==t)return V;const e=this.config.unit??this._weatherAttr("pressure_unit")??"hPa",i=this.config.min??("hPa"===e?950:28),o=this.config.max??("hPa"===e?1050:31),s=Math.min(1,Math.max(0,(t-i)/(o-i))),n=270*s-135,a=this.hass?.locale?.language||navigator.language||"en",r="hPa"===e?Math.round(t).toLocaleString(a):t;return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${be(50,52,37.5,-135,135)} class="gauge-track thin" />
          ${s>.01?H`<path d=${be(50,52,37.5,-135,n)} class="gauge-fill thin" />`:""}
        </svg>
        <div class="overlay">
          ${this._header("mdi:gauge",this.config.name??"Pressure")}
          <div class="big small-big">${r}</div>
          <div class="sub">${e}</div>
        </div>
      </div>
    `}_aqi(){const t=this._value("air_quality_index");if(null==t)return this.config.sensor?V:this._hint("mdi:waves",this.config.name??"Air quality","Point this tile at an AQI sensor");const e=Ee.find(e=>t<=e.max),i=Math.min(.96,Math.max(.04,t/300));return I`
      <div class="rect-tile">
        ${this._header("mdi:waves",this.config.name??"Air quality")}
        <div class="big">${Math.round(t)}</div>
        <div class="aqi-bar">
          ${Ee.slice(0,5).map(t=>I`<span style="background:${t.color}"></span>`)}
          <span style="background:${Ee[5].color}"></span>
          <i class="aqi-dot" style="left:${(100*i).toFixed(1)}%; border-color:${e.color}"></i>
        </div>
        <div class="sub">${e.label}</div>
      </div>
    `}_precipitation(){let t=null;if(this.config.sensor)t=this._value();else{const e=this._forecast?.[0];t=this._numRaw(e?.precipitation)}if(null==t)return V;const e=this.config.unit??this._weatherAttr("precipitation_unit")??"mm",i=this.config.none_label??"No precipitation expected",o=t>0?this.config.total_label??"Total rain for the day":i;return I`
      <div class="rect-tile precip">
        ${this._header("m3o:rainy",this.config.name??"Precipitation")}
        <div class="big">${t}<span class="unit"> ${e}</span></div>
        <div class="precip-bottom">
          <div class="sub">${o}</div>
          ${t>0?H`<svg class="precip-glyph" viewBox="0 0 24 24">${oe("rainy")}</svg>`:""}
        </div>
      </div>
    `}_humidity(){const t=this._value("humidity");if(null==t)return this.config.sensor?V:this._hint("mdi:water-percent",this.config.name??"Humidity","Weather entity has no humidity — add a sensor");const e=this.config.dew_entity?this._numRaw(this.hass.states[this.config.dew_entity]?.state):this._numRaw(this._weatherAttr("dew_point")),i=100-78*Math.min(1,Math.max(0,t/100)),o=this._scallopWave(i);return I`
      <div class="rect-tile clip">
        <svg class="wave" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d=${o} class="wave-fill" />
        </svg>
        ${this._header("mdi:water-percent",this.config.name??"Humidity")}
        <div class="big">${Math.round(t)}<span class="unit">%</span></div>
        ${null!=e?I`<div class="dew"><span class="dew-chip">${Math.round(e)}°</span> ${this.config.dew_label??"Dew point"}</div>`:""}
      </div>
    `}_sun(){const t=this.hass.states[this.config.sun_entity??"sun.sun"];if(!t)return V;const e=t.attributes?.next_rising,i=t.attributes?.next_setting;if(!e||!i)return V;const o=this.hass?.locale?.language||navigator.language||"en",s=t=>new Date(t).toLocaleTimeString(o,{hour:"numeric",minute:"2-digit"}),n=new Date(e).getTime(),a=new Date(i).getTime(),r=Date.now();let l=.5;if(a<n){const t=864e5-(n-a);l=Math.min(1,Math.max(0,1-(a-r)/t))}else l=r<n?0:1;const c=(1-l)*(1-l)*2+2*l*(1-l)*50+l*l*98,d=(1-l)*(1-l)*32+2*l*(1-l)*-4+l*l*32;return I`
      <div class="rect-tile sun">
        ${this._header("mdi:weather-sunset",this.config.name??"Sunrise & sunset")}
        <svg class="sun-arc" viewBox="0 0 100 38">
          <path d="M2 32 Q 50 -4 98 32 Z" class="arc-fill" />
          <line x1="0" y1="32" x2="100" y2="32" class="horizon" />
          ${l>0&&l<1?H`<path d=${function(t,e,i,o=12,s=.1*i,n=0){const a=Math.max(8*o,48),r=[];for(let l=0;l<a;l++){const c=l/a*Math.PI*2,d=i+s*Math.cos(o*c+n);r.push([t+d*Math.cos(c),e+d*Math.sin(c)])}let l=`M${r[0][0].toFixed(2)} ${r[0][1].toFixed(2)} `;for(let t=0;t<a;t++){const e=r[(t-1+a)%a],i=r[t],o=r[(t+1)%a],s=r[(t+2)%a],n=i[0]+(o[0]-e[0])/6,c=i[1]+(o[1]-e[1])/6,d=o[0]-(s[0]-i[0])/6,h=o[1]-(s[1]-i[1])/6;l+=`C${n.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${o[0].toFixed(2)} ${o[1].toFixed(2)} `}return l+"Z"}(c,d,5.5,9,.6)} fill="var(--md-sys-cust-color-weather-sun, #FFC83D)" />`:""}
        </svg>
        <div class="sun-times">
          <div><ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${s(e)}</div>
          <div><ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${s(i)}</div>
        </div>
      </div>
    `}_pollen(){const t={none:{v:0,label:"None",color:"var(--md-sys-color-outline, #9E9E9E)"},active:{v:1,label:"Active",color:we},green:{v:1,label:"Low",color:we},yellow:{v:2,label:"Moderate",color:$e},orange:{v:3,label:"High",color:ke},red:{v:4,label:"Very high",color:Ce},purple:{v:5,label:"Extreme",color:Se}},e=this.config.max??4;let i=this.config.entities;i?.length||(i=[this.config.grass_entity&&{entity:this.config.grass_entity,label:this.config.grass_label??"Grass",icon:"mdi:grass"},this.config.tree_entity&&{entity:this.config.tree_entity,label:this.config.tree_label??"Tree",icon:"mdi:tree-outline"},this.config.weed_entity&&{entity:this.config.weed_entity,label:this.config.weed_label??"Weed",icon:"mdi:sprout-outline"}].filter(Boolean));const o=(i||[]).map(i=>{const o="string"==typeof i?{entity:i}:i,s=this.hass.states[o.entity];if(!s||this._isUnavailable(s))return null;const n=String(s.state).toLowerCase();let a,r,l;if(n in t){const e=t[n];a=e.v/5,r=e.label,l=e.color}else{const t=this._numRaw(n);if(null==t)return null;a=Math.min(1,Math.max(0,t/e)),r=`${t}/${e} ${Me[Math.min(Me.length-1,Math.round(a*(Me.length-1)))]}`,l=null}let c=o.label;if(!c){const t=s.attributes.friendly_name||o.entity,e=t.replace(/pollen/i,"").trim().split(/\s+/);c=e[e.length-1]||t}return{label:c,icon:o.icon||s.attributes.icon||"m3of:allergy",frac:a,levelLabel:r,color:l}}).filter(Boolean).filter(t=>!this.config.hide_inactive||t.frac>0).sort((t,e)=>e.frac-t.frac).slice(0,this.config.max_shown??4);if(!o.length){return this.config.entities?.length||this.config.grass_entity||this.config.tree_entity||this.config.weed_entity?V:this._hint("m3of:allergy",this.config.name??"Pollen","Add pollen sensors")}return"small"===this.config.variant?I`
        <div class="rect-tile pollen-small">
          ${this._header("m3of:allergy",this.config.name??"Pollen")}
          <div class="pollen-rows">
            ${o.map(t=>I`
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
          ${o.map(t=>I`
              <div class="gauge">
                <svg viewBox="0 0 100 86">
                  <path d=${be(50,50,40,-135,135)} class="gauge-track" />
                  ${t.frac>.01?H`<path d=${be(50,50,40,-135,270*t.frac-135)} class="gauge-fill" style="stroke:${t.color||"var(--wm-accent, #7bc96a)"}" />`:""}
                </svg>
                <div class="gauge-center">
                  <ha-icon icon=${t.icon}></ha-icon>
                  <span class="gauge-label">${t.label}</span>
                </div>
                <div class="gauge-sub">${t.levelLabel}</div>
              </div>
            `)}
        </div>
      </div>
    `}getGridOptions(){const t="pollen"===this.config?.metric&&"small"!==this.config?.variant;return{columns:t?8:4,rows:"auto",min_columns:t?6:3}}getCardSize(){return 3}}customElements.define("materia-weather-metric",Te),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-metric",name:"Materia Weather Metric",description:"Expressive weather metric tiles: wind, UV, AQI, pollen, precipitation, sun, visibility, humidity, pressure.",preview:!0});const Fe=[ft,mt,gt,ae,n`
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
    .now {
      font-size: 24px;
      font-weight: 400;
      flex-shrink: 0;
    }

    /* Match the materia-card chevron exactly. */
    .chev {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      flex-shrink: 0;
      margin: 0 -4px 0 0;
    }
  `],ze=[{value:"condition",label:"Condition"},{value:"minmax",label:"High / low"},{value:"wind",label:"Wind"},{value:"humidity",label:"Humidity"},{value:"uv",label:"UV index"},{value:"precipitation",label:"Precipitation"},{value:"pressure",label:"Pressure"},{value:"pollen",label:"Pollen (worst species)"},{value:"aqi",label:"Air quality"}];class Oe extends Mt{_formData(){return{metrics:["condition","minmax"],...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"metrics",label:"Metric lines (first = top line)",selector:{select:{multiple:!0,mode:"list",options:ze}}},{name:"sort_by_severity",label:"Sort metrics worst-first",selector:{boolean:{}}},{name:"show_metric_icons",label:"Show metric icons",selector:{boolean:{}}},{name:"pollen_entities",label:"Pollen sensors (for the pollen metric)",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"aqi_entity",label:"AQI sensor (for the air-quality metric)",selector:{entity:{domain:"sensor"}}},{name:"alert",label:"Alert text / template (takes over top line)",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"navigate"}}}]}]}get _priority(){return this._config?.priority??["precipitation","pollen","aqi"]}_movePrio(t,e){const i=[...this._priority],[o]=i.splice(t,1);i.splice(e,0,o),this._commit({...this._config,priority:i})}_removePrio(t){const e=[...this._priority];e.splice(t,1),this._commit({...this._config,priority:e})}_renderExtra(){const t=this._priority,e=ze.filter(e=>!t.includes(e.value));return I`
      <div class="prio-header">Tie-break priority (most important first)</div>
      ${xt((t,e)=>this._movePrio(t,e),t.map((t,e)=>I`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${ze.find(e=>e.value===t)?.label??t}</span>
            <ha-icon-button @click=${()=>this._removePrio(e)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `))}
      ${e.length?I`<ha-form
            .hass=${this.hass}
            .data=${{}}
            .schema=${[{name:"add",label:"Add metric to priority",selector:{select:{mode:"dropdown",options:e}}}]}
            .computeLabel=${yt}
            @value-changed=${e=>{const i=e.detail.value?.add;i&&this._commit({...this._config,priority:[...t,i]})}}
          ></ha-form>`:""}
    `}}Oe.styles=[Mt.styles,n`
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
  `],customElements.define("materia-weather-glance-editor",Oe);const Pe={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Ue extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedAlert:{state:!0}};static styles=Fe;static getConfigElement(){return document.createElement("materia-weather-glance-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e,metrics:["condition","minmax"]}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={metrics:["condition","minmax"],...t},this._fcEntity=void 0}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("alert","_resolvedAlert"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const t=this.config?.entity;if(!this.hass||!t||this._fcEntity===t)return;this._unsubForecast(),this._fcEntity=t,this._forecast=[];const e=this.hass.connection.subscribeMessage(t=>{this._forecast=t?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});this._fcUnsub=e,e.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(t=>t&&t()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?Math.round(e):null}_metricData(t,e){const i=e?.attributes||{},o=this._forecast?.[0]||i.forecast?.[0];let s=null,n=0;switch(t.type){case"condition":{const t=e?.state??"";s=Pe[t]||this._capitalize(String(t).replace(/-|_/g," ")),/lightning/.test(t)?n=3:/pouring|snowy|hail/.test(t)?n=2:/rainy|fog|windy/.test(t)&&(n=1);break}case"minmax":{const t=this._num(o?.temperature),e=this._num(o?.templow);if(null==t&&null==e)return null;s=`${null!=t?`${t}°`:"—"} ${null!=e?`${e}°`:"—"}`;break}case"wind":{const t=this._num(i.wind_speed);if(null==t)return null;const e=this._num(i.wind_bearing);s=`${t} ${i.wind_speed_unit??"km/h"}${null!=e?` ${a=e,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((a%360+360)%360/22.5)%16]}`:""}`,n=t>=88?4:t>=62?3:t>=39?2:t>=20?1:0;break}case"humidity":{const t=this._num(i.humidity);if(null==t)return null;s=`${t}%`,n=t>=85||t<=20?2:t>=70||t<=30?1:0;break}case"uv":{const t=this._num(i.uv_index);if(null==t)return null;s=`UV ${t}`,n=t>=11?4:t>=8?3:t>=6?2:t>=3?1:0;break}case"precipitation":{const t=o?.precipitation,e=null==t?null:Number(t);if(null==e||!Number.isFinite(e))return null;s=`${e} ${i.precipitation_unit??"mm"}`,n=e>=10?3:e>=2?2:e>0?1:0;break}case"pressure":{const t=this._num(i.pressure);if(null==t)return null;s=`${t} ${i.pressure_unit??"hPa"}`,n=Math.abs(t-1013)>=25?2:Math.abs(t-1013)>=15?1:0;break}case"pollen":{const e={none:0,active:1,green:1,yellow:2,orange:3,red:4,purple:5},i=["None","Low","Low","Moderate","High","Very high","Extreme"],o=t.entities||this.config.pollen_entities||[];let a=null;for(const t of o){const i=this.hass.states[t];if(!i||this._isUnavailable(i))continue;const o=e[String(i.state).toLowerCase()]??this._num(i.state)??0;if(!a||o>a.v){const e=i.attributes.friendly_name||t,s=e.replace(/pollen/i,"").trim().split(/\s+/);a={v:o,label:s[s.length-1]||e}}}if(!a)return null;const r=t.label??this.config.pollen_label??"Pollen";s=0===a.v?this.config.no_pollen_label??`${r} none`:`${r} ${a.label} ${i[a.v+1]??a.v}`,n=a.v;break}case"aqi":{const e=t.entity??this.config.aqi_entity,i=e?this.hass.states[e]:null;if(!i||this._isUnavailable(i))return null;const o=this._num(i.state);if(null==o)return null;s=`AQI ${o}`,n=o>200?4:o>150?3:o>100?2:o>50?1:0;break}case"sensor":{const e=t.entity?this.hass.states[t.entity]:null;if(!e||this._isUnavailable(e))return null;const i=t.unit??e.attributes.unit_of_measurement??"";s=`${t.label?`${t.label} `:""}${e.state}${i?` ${i}`:""}`;break}default:return null}var a;null!=t.severity&&(n=Number(t.severity)||0);return{text:s,sev:n,icon:t.icon??(this.config.show_metric_icons?{minmax:"mdi:thermometer",wind:"mdi:weather-windy",humidity:"mdi:water-percent",uv:"mdi:white-balance-sunny",precipitation:"m3o:rainy",pressure:"mdi:gauge",pollen:"m3of:allergy",aqi:"mdi:waves",sensor:"mdi:information-outline"}[t.type]:null),type:t.type}}_metricItems(t){const e=this.config.priority??["precipitation","pollen","aqi"],i=t=>{const i=e.indexOf(t);return-1===i?0:(e.length-i)/(e.length+1)},o=(this.config.metrics||[]).map(t=>"string"==typeof t?{type:t}:t),s=o.map(e=>this._metricData(e,t)).filter(Boolean);if(this.config.sort_by_severity&&s.length>2){const[t,...e]=s;return e.sort((t,e)=>e.sev+i(e.type)-(t.sev+i(t.type))),[t,...e]}return s}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"";let o=t?.attributes?.temperature;if(this.config.temperature_entity){const t=this.hass.states[this.config.temperature_entity];t&&!this._isUnavailable(t)&&(o=t.state)}const s=this._num(o),n=this._isTemplate(this.config.alert)?this._resolvedAlert:this.config.alert,a=this._metricItems(t),r=n?null:a[0],l=n?a:a.slice(1),c=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,d=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,h=this.config.show_chevron??"navigate"===this.config.tap_action?.action,p=t=>I`<span class="m">
      ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}${t.text}
    </span>`;return I`
      <ha-card>
        <div
          class="glance ${e?"unavailable":""}"
          style="${c?`--wg-bg:${c};`:""}${d?`--wg-fg:${d};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <svg class="glyph" viewBox="0 0 24 24">${oe(i)}</svg>
          <div class="mid">
            ${n||r?I`<div class="line1">
                  ${n?I`<ha-icon icon="mdi:alert-outline"></ha-icon>`:""}
                  ${n?I`<span>${n}</span>`:p(r)}
                </div>`:""}
            ${l.length?I`<div class="line2">
                  ${l.map((t,e)=>I`${e?I`<span class="dot">·</span>`:""}${p(t)}`)}
                </div>`:""}
          </div>
          <div class="now">${e||null==s?"—":`${s}°`}</div>
          ${h?I`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-weather-glance",Ue),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-glance",name:"Materia Weather Glance",description:"Weather pill for the home screen: glyph, configurable metric lines or an alert, big temperature.",preview:!0});const De=[ft,mt,gt,ae,n`
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
  `];customElements.define("materia-list-editor",class extends Mt{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"title",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon",selector:{icon:{}}},{name:"entities",label:"Entities (rows)",selector:{entity:{multiple:!0}}}]}]}});class qe extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=De;static getConfigElement(){return document.createElement("materia-list-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("sensor."))||"";return{entities:e?[e]:[]}}setConfig(t){if(!t.entities?.length)throw new Error("Materia List: add at least one entity");this.config={...t}}_rowState(t,e){if(!e)return"—";if(t.attribute){const i=e.attributes?.[t.attribute];return null==i?"—":`${i}${t.unit?` ${t.unit}`:""}`}if(this._isUnavailable(e))return this.hass.formatEntityState?.(e)??e.state;if(t.unit){const i=Number(e.state);return Number.isFinite(i)?`${i} ${t.unit}`:e.state}return this.hass.formatEntityState?.(e)??e.state}render(){if(!this.hass||!this.config)return I``;const t=(this.config.entities||[]).map(t=>"string"==typeof t?{entity:t}:t);return I`
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
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 1+(this.config?.entities?.length||0)}}customElements.define("materia-list",qe),window.customCards=window.customCards||[],window.customCards.push({type:"materia-list",name:"Materia List",description:"Entity rows with localized states — name left, value right, optional header.",preview:!0});const Be=[ft,mt,gt,ae,n`
    ha-card {
      container-type: inline-size;
      border-radius: 28px;
      padding: clamp(12px, 5cqi, 24px);
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
      font-size: clamp(44px, 22cqi, 72px);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.02em;
      display: flex;
      align-items: flex-start;
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
      gap: 3px;
      margin-top: calc(-1 * clamp(8px, 4cqi, 20px));
    }

    /* M3 Expressive connected pair: outer corners pill, inner corners small
       (the connected-group silhouette). Pressing a segment EXPANDS it while
       its neighbor compresses (animated flex-grow) and its shape morphs to a
       full pill — the signature expressive button-group interaction. Colors
       follow the active mode's climate palette. */
    .nudge {
      width: min(72%, 280px);
    }

    .nudge .seg {
      flex: 1 1 0;
      height: clamp(48px, 16cqi, 58px);
      border: none;
      background: var(--th-container, var(--md-sys-color-secondary-container, rgba(0, 0, 0, 0.06)));
      color: var(--th-on-container, var(--md-sys-color-on-secondary-container, var(--primary-text-color)));
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
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
      flex-grow: 1.5;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, var(--th-container, var(--md-sys-color-secondary-container)));
    }

    materia-button-group {
      width: 100%;
      margin-top: clamp(4px, 2cqi, 10px);
    }
  `];customElements.define("materia-thermostat-editor",class extends Mt{_formData(){return{step:.5,show_modes:!0,show_current:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"temperature_entity",label:"Current-temp sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"step",label:"Step",selector:{number:{min:.1,max:2,step:.1,mode:"box"}}},{name:"min_temp",label:"Dial min (default: entity)",selector:{number:{min:-30,max:40,step:.5,mode:"box"}}},{name:"max_temp",label:"Dial max (default: entity)",selector:{number:{min:0,max:60,step:.5,mode:"box"}}},{name:"show_current",label:"Show current temperature",selector:{boolean:{}}},{name:"current_label",label:'"Currently" label',selector:{text:{}}},{name:"wave",label:"Wave animation",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (hvac_action, or inferred from temps)"},{value:"always",label:"Always (whenever the mode is on)"},{value:"never",label:"Never"}]}}}]},{title:"Modes",icon:"mdi:sun-snowflake-variant",fields:[{name:"show_modes",label:"Show mode buttons",selector:{boolean:{}}},{name:"mode_size",label:"Mode button size",selector:{select:{mode:"dropdown",options:[{value:"s",label:"S"},{value:"m",label:"M"},{value:"l",label:"L"},{value:"xl",label:"XL"}]}}}]}]}});const Ne=-135,Re=270,Le="var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))",je="var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))",Ie={auto:{icon:"mdi:thermostat-auto",color:Le,on:je,container:je,onContainer:Le},heat_cool:{icon:"mdi:thermostat-auto",color:Le,on:je,container:je,onContainer:Le},heat:{icon:"m3o:mode-heat",color:"var(--md-sys-cust-color-climate-heat-accent, #a14614)",on:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",container:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",onContainer:"var(--md-sys-cust-color-climate-heat-accent, #a14614)"},cool:{icon:"mdi:snowflake",color:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)",on:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",container:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",onContainer:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)"},dry:{icon:"mdi:water-percent",color:Le,on:je,container:je,onContainer:Le},fan_only:{icon:"mdi:fan",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"},off:{icon:"m3o:power-settings-new",color:"var(--md-sys-color-surface-variant)",on:"var(--md-sys-color-on-surface-variant)",container:"var(--md-sys-color-surface-variant)",onContainer:"var(--md-sys-color-on-surface-variant)"}};class He extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0}};static styles=Be;static getConfigElement(){return document.createElement("materia-thermostat-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("climate."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={step:.5,...t}}connectedCallback(){super.connectedCallback(),this._phase=0,this._amp=0,this._startLoop()}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),clearTimeout(this._optimisticTimer),clearTimeout(this._sendTimer)}get _entity(){return this.hass?.states[this.config.entity]}get _action(){return this._entity?.attributes?.hvac_action??""}get _waveAction(){const t=this._mode;if("off"===t||"never"===this.config.wave)return"";if("always"===this.config.wave)return"cool"===t?"cooling":"heating";const e="auto"===t||"heat_cool"===t,i=e?"holding":"",o=this._action;if("heating"===o||"cooling"===o)return o;if(o&&"idle"!==o)return"";const s=this._current,n=this._target;return null==n||"idle"===o?i:null==s?"cool"===t?"cooling":"heat"===t?"heating":i:("heat"===t||e)&&s<n-.2?"heating":("cool"===t||e)&&s>n+.2?"cooling":i}get _mode(){return this._entity?.state??"off"}get _target(){return null!=this._optimisticTemp?this._optimisticTemp:this._numRaw(this._entity?.attributes?.temperature)}get _current(){if(this.config.temperature_entity){const t=this.hass?.states[this.config.temperature_entity];if(t)return this._numRaw(t.state)}return this._numRaw(this._entity?.attributes?.current_temperature)}_numRaw(t){if(null==t||""===t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isFinite(e)?e:null}get _scale(){return{min:this.config.min_temp??this._numRaw(this._entity?.attributes?.min_temp)??7,max:this.config.max_temp??this._numRaw(this._entity?.attributes?.max_temp)??35}}_startLoop(){if(this._raf)return;const t=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,e=()=>{const i=this._waveAction,o="heating"===i||"cooling"===i,s=t?0:o?1:"holding"===i?.35:0,n=this._amp+.06*(s-this._amp),a=Math.abs(n-s)<.01;if(this._amp=a?s:n,this._amp>.005||s>0){this._phase+="cooling"===i?.028:o?-.028:-.008;const t=this._waveGeom;if(t){const e=this.renderRoot?.querySelector("path.wave-seg");e&&e.setAttribute("d",this._wavePath(t.start,t.end,t.r))}this._raf=requestAnimationFrame(e)}else this._raf=null};this._raf=requestAnimationFrame(e)}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}updated(t){if(this._waveAction&&!this._raf&&this._startLoop(),t.has("hass")&&null!=this._optimisticTemp){const t=this._numRaw(this._entity?.attributes?.temperature);null!=t&&Math.abs(t-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}_modeGroupConfig(t,e,i){const o=`${this.config.entity}|${t.join()}|${e}|${i}|${this.config.mode_size??"l"}`;return this._mgKey!==o&&(this._mgKey=o,this._mgConfig={entity:this.config.entity,size:this.config.mode_size??"l",variant:"tonal",active_shape:"square",color_active:e,color_on_active:i,options:t.map(t=>({icon:Ie[t].icon,value:t,tap_action:{action:"perform-action",perform_action:"climate.set_hvac_mode",data:{hvac_mode:t},target:{entity_id:this.config.entity}}}))}),this._mgConfig}_angleFor(t,e,i){const o=Math.min(1,Math.max(0,(t-e)/(i-e)));return Ne+Re*o}_pointAt(t,e,i=0){const o=(t-90)*Math.PI/180,s=e+i;return[50+s*Math.cos(o),50+s*Math.sin(o)]}_wavePath(t,e,i){const o=3.2*this._amp,s=[];for(let n=t;n<=e;n+=2){const a=n-t,r=o*Math.min(1,a/20)*Math.min(1,(e-n)/20)*Math.sin(a/7+this._phase);s.push(this._pointAt(n,i,r))}return s.push(this._pointAt(e,i,0)),"M"+s.map(([t,e])=>`${t.toFixed(2)} ${e.toFixed(2)}`).join(" L")}_arcPath(t,e,i){const[o,s]=this._pointAt(t,i),[n,a]=this._pointAt(e,i),r=e-t>180?1:0;return`M${o.toFixed(2)} ${s.toFixed(2)} A${i} ${i} 0 ${r} 1 ${n.toFixed(2)} ${a.toFixed(2)}`}_setTarget(t){const{min:e,max:i}=this._scale,o=this.config.step??.5,s=Math.min(i,Math.max(e,Math.round(t/o)*o));this._optimisticTemp=s,clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4),clearTimeout(this._sendTimer),this._sendTimer=setTimeout(()=>{this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:s})},350)}_nudge(t){const e=this._target;null!=e&&this._setTarget(e+t)}_dialPointer(t){if(!this._dialDragging&&"pointerdown"!==t.type)return;const e=this.renderRoot.querySelector(".dial").getBoundingClientRect(),i=(t.clientX-e.left)/e.width*100-50,o=(t.clientY-e.top)/e.height*100-50;let s=180*Math.atan2(o,i)/Math.PI+90;if(s>180&&(s-=360),s<-143||s>143)return;const n=Math.min(1,Math.max(0,(s-Ne)/Re)),{min:a,max:r}=this._scale;"pointerdown"===t.type&&(this._dialDragging=!0,t.currentTarget.setPointerCapture(t.pointerId)),this._setTarget(a+n*(r-a))}_endDialDrag(t){this._dialDragging=!1,t.currentTarget.releasePointerCapture?.(t.pointerId)}render(){if(!this.hass||!this.config)return I``;const t=this._entity;if(!t)return I``;const e=this._isUnavailable(t),{min:i,max:o}=this._scale,s=this._target,n=this._current,a=this._mode,r=this._waveAction,l=Ie[a]||Ie.off,c="off"!==a&&null!=s,d=42,h=c?this._angleFor(s,i,o):Ne,p=null!=s?this._angleFor(s,i,o):null,[u,m]=this._pointAt(c?h:p??h,d),g=null!=n?this._angleFor(n,i,o):null;let f=null,_=null,v=null;c&&"holding"===r?(_=Ne,v=null!=g?Math.max(g,h):h):c&&null!=g?(f=Math.min(g,h),_=f,v=Math.max(g,h)):c&&(_=Ne,v=h);const b="heating"===r?Ie.heat:"cooling"===r?Ie.cool:l,y=b.color,x=b.on,w=this.hass.formatEntityState?.(t)??a,$=this.hass.config?.unit_system?.temperature??"°C",k=(this.config.hvac_modes??t.attributes.hvac_modes??[]).filter(t=>Ie[t]);return this._waveGeom=c&&null!=v&&v>_+.5?{start:_,end:v,r:d}:null,I`
      <ha-card
        class="${e?"unavailable":""}"
        style="--th-container:${b.container};--th-on-container:${b.onContainer};"
      >
        <div class="dial-wrap">
          <svg
            class="dial"
            viewBox="0 0 100 100"
            @pointerdown=${this._dialPointer}
            @pointermove=${this._dialPointer}
            @pointerup=${this._endDialDrag}
            @pointercancel=${this._endDialDrag}
          >
            ${(()=>{const t=c?Math.max(h,g??h):Ne,e=c?Math.min(t+8,135):Ne;return e<134.5?H`<path d=${this._arcPath(e,135,d)} class="track" />`:""})()}
            ${c||null==g?"":H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="1.6" class="current-dot" />`}
            ${c&&null!=f&&f>-134.5?H`<path d=${this._arcPath(Ne,f,d)} class="sweep" style="stroke:${y}" />`:""}
            ${c&&null!=v&&v>_+.5?H`<path d=${this._wavePath(_,v,d)} class="sweep wave-seg" style="stroke:${y}" />`:""}
            ${c&&null!=g?H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="3.4" class="current-knob" style="fill:${y}" />`:""}
            ${c?H`<g>
                  <circle cx=${u} cy=${m} r="5.5" class="thumb" style="fill:${y}" />
                  <path d=${_e(u,m,3.7,12)} class="thumb-cookie" />
                </g>`:null!=p?H`<g>
                    <circle cx=${u} cy=${m} r="5.5" class="thumb muted" />
                    <path d=${_e(u,m,3.7,12)} class="thumb-cookie" />
                  </g>`:""}
          </svg>
          <div class="center" @click=${()=>this._fireMoreInfo(this.config.entity)}>
            <div class="mode-label">${w}</div>
            <div class="target">
              ${null!=s?s:null!=n?n:"—"}<span class="deg">${$}</span>
            </div>
            ${null!=n&&!1!==this.config.show_current?I`<div class="current-label">${this.config.current_label??"Currently"} ${n}°</div>`:""}
          </div>
        </div>

        <div class="nudge">
          <button class="seg minus" @click=${()=>this._nudge(-(this.config.step??.5))}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button class="seg plus" @click=${()=>this._nudge(this.config.step??.5)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        ${!1!==this.config.show_modes&&k.length?I`<materia-button-group
              .hass=${this.hass}
              .config=${this._modeGroupConfig(k,y,x)}
            ></materia-button-group>`:""}
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 5}}customElements.define("materia-thermostat",He),window.customCards=window.customCards||[],window.customCards.push({type:"materia-thermostat",name:"Materia Thermostat",description:"Expressive thermostat dial — the active sweep is a living wavy line that moves with heating/cooling.",preview:!0});const We=[ft,n`
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

    .label {
      white-space: nowrap;
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
      color: var(--primary-text-color);
    }
    .variant-text {
      background: transparent;
      color: var(--primary-text-color);
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
  `];class Ve extends Mt{static properties={_expanded:{state:!0},_actionRows:{state:!0}};static styles=[Mt.styles,n`
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
                      .computeLabel=${yt}
                      @value-changed=${t=>this._updateMapping(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}get _mappingSchema(){return[{name:"state",required:!0,helper:"Use 'default' for the fallback",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_toggleExpand(t){this._expanded=this._expanded===t?null:t}_addMapping(){this._actionRows=[...this._actionRows||[],{state:""}],this._expanded=this._actionRows.length-1}_updateMapping(t,e){this._actionRows=(this._actionRows||[]).map((i,o)=>o===t?{...i,...e}:i),this._commitActionRows()}_removeMapping(t){this._actionRows=(this._actionRows||[]).filter((e,i)=>i!==t),this._expanded===t&&(this._expanded=null),this._commitActionRows()}_commitActionRows(){const t={};for(const e of this._actionRows||[])e.state&&e.tap_action&&(t[e.state]=e.tap_action);const{tap_action_map:e,...i}=this._config;this._commit(Object.keys(t).length?{...i,tap_action_map:t}:i)}}customElements.define("materia-button-editor",Ve);const Ge={"filled-tonal":"tonal",standard:"text"},Xe={light:"on",switch:"on",fan:"on",input_boolean:"on",vacuum:"cleaning",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing"};class Ye extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedLabel:{state:!0},_resolvedDisabled:{state:!0}};static styles=We;static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"m",shape:"round"}}setConfig(t){if(!t.icon&&!t.label)throw new Error("icon or label is required");this.config={variant:"filled",size:"m",shape:"round",...t},this.toggleAttribute("wide",!!t.wide)}get _disabled(){const t=this.config?.disabled;if(null==t)return!1;if("boolean"==typeof t)return t;if(this._isTemplate(t)){const t=this._resolvedDisabled;return"True"===t||"true"===t||"1"===t}return"true"===t||"True"===t}updated(t){t.has("config")&&this.toggleAttribute("wide",!!this.config?.wide),t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("label","_resolvedLabel"),this._resolveField("disabled","_resolvedDisabled"))}_isActive(t){if(!t)return!1;const e=t.entity_id.split(".")[0],i=this.config.active_state??Xe[e]??"on";return Array.isArray(i)?i.includes(t.state):t.state===String(i)}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const t=this.hass?.states[this.config.entity]?.state,e=this.config.tap_action_map[t]??this.config.tap_action_map.default;if(e)return e}return this.config.tap_action||this._defaultTapAction()}_handleTap(){this._disabled||this._handleAction(this._resolveTapAction())}render(){if(!this.config)return I``;const t=this.config.entity?this.hass?.states?.[this.config.entity]:void 0,e=!!this.config.entity&&this._isUnavailable(t),i=this._disabled,o=Ge[this.config.variant]||this.config.variant||"filled",s=this.config.size??"m";let n="",a="";if("number"==typeof s||/^\d+$/.test(String(s))){const t=Number(s);a=`--mb-h:${t}px;--mb-icon:${Math.round(.43*t)}px;--mb-font:16px;--mb-px:${Math.round(.42*t)}px;--mb-rsq:${Math.round(.28*t)}px;--mb-gap:8px;`}else n=`size-${s}`;const r="square"===this.config.shape?"square":"round",l=this._isActive(t),c=this.config.morph_on_active&&l?"square":r,d=this._isTemplate(this.config.icon)?this._resolvedIcon||"":this.config.icon,h=this._isTemplate(this.config.label)?this._resolvedLabel||"":this.config.label,p=!h;return I`
      <button
        class="btn variant-${o} ${n} shape-${c} ${this.config.connected?`connected-${this.config.connected}`:""} ${p?"icon-only":""} ${i?"disabled":""} ${e?"unavailable":""}"
        style=${a}
        @click=${this._handleTap}
      >
        ${d?I`<ha-icon .icon=${d}></ha-icon>`:V}
        ${h?I`<span class="label">${h}</span>`:V}
      </button>
    `}getCardSize(){return 1}}customElements.define("materia-button",Ye),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"M3 button — icon and/or label, variants, sizes, shapes, and shape-morph on state.",preview:!0});const Ke=[ft,n`
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
  `];class Ze extends Mt{static properties={_expanded:{state:!0}};static styles=[Mt.styles,n`
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
    `];setConfig(t){super.setConfig(t),this._expanded??=null}_formData(){return{variant:"tonal",size:"s",menu_position:"bottom-right",...this._config}}get _sections(){return[{title:"Leading button",icon:"mdi:card-text-outline",fields:[{name:"icon",template:!0,selector:{icon:{}}},{name:"label",template:!0,selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"more-info"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"elevated",label:"Elevated"},{value:"outlined",label:"Outlined"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"Extra small"},{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"},{value:"xl",label:"Extra large"}]}}},{name:"menu_position",label:"Menu alignment",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"Below · right-aligned"},{value:"bottom-left",label:"Below · left-aligned"},{value:"top-right",label:"Above · right-aligned"},{value:"top-left",label:"Above · left-aligned"}]}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]}]}_optionSchema(t){return[St(t?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Menu options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${xt((t,e)=>this._moveOption(t,e),t.map((t,e)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${t.label||(t.icon&&!St(t.icon)?t.icon:`Option ${e+1}`)}</span>
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
                        .computeLabel=${yt}
                        @value-changed=${t=>this._optionChanged(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const t=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[o]=i.splice(t,1);i.splice(e,0,o),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_optionChanged(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleOption(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-split-button-editor",Ze);const Qe={xs:32,s:40,m:56,l:96,xl:136,default:48,large:56},Je={xs:12,s:12,m:16,l:28,xl:28,default:14,large:16},ti={xs:20,s:20,m:24,l:32,xl:40,default:24,large:24};class ei extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0}};static styles=Ke;static getConfigElement(){return document.createElement("materia-split-button-editor")}static getStubConfig(){return{label:"Action",icon:"mdi:play",variant:"tonal",size:"s",options:[{label:"Option 1",icon:"mdi:numeric-1-circle-outline"},{label:"Option 2",icon:"mdi:numeric-2-circle-outline"}]}}setConfig(t){this.config={variant:"tonal",size:"s",...t},this._open=!1,this.toggleAttribute("wide",!!t.wide)}updated(t){t.has("config")&&this.toggleAttribute("wide",!!this.config?.wide),t.has("_open")&&this._open&&requestAnimationFrame(()=>this._clampMenu())}_clampMenu(){const t=this.shadowRoot?.querySelector(".menu");if(!t||!this._open)return;t.classList.remove("clamp-left","clamp-right");const e=t.getBoundingClientRect();e.left<8?t.classList.add("clamp-left"):e.right>window.innerWidth-8&&t.classList.add("clamp-right")}connectedCallback(){super.connectedCallback(),this._outsideClick=t=>{this._open&&((t.composedPath?.()||[]).includes(this)||(this._open=!1))},document.addEventListener("click",this._outsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClick)}_toggle(t){t.stopPropagation(),this._open=!this._open}_selectOption(t,e){e.stopPropagation(),this._open=!1,t.tap_action&&this._handleAction(t.tap_action)}render(){if(!this.config)return I``;const t=this.config.variant||"tonal",e=this.config.size||"s",i=Qe[e]||40,o=Je[e]??12,s=ti[e]??20,n=this.config.options||[],{options:a,type:r,...l}=this.config,c={...l,connected:"leading"},d=`--sb-h:${i}px;--sb-inner:${o}px;--sb-ticon:${s}px;`+(this.config.color?`--sb-bg:${this.config.color};`:"")+(this.config.color_on?`--sb-fg:${this.config.color_on};`:"");return I`
      <div class="wrap" style=${d}>
        <div class="split ${t}">
          <materia-button class="leading" .hass=${this.hass} .config=${c}></materia-button>
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
          ${n.map(t=>I`
              <div class="menu-item" role="menuitem" @click=${e=>this._selectOption(t,e)}>
                ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                <span class="item-text">${t.label||""}</span>
              </div>
            `)}
        </div>
      </div>
    `}getCardSize(){return 1}}customElements.define("materia-split-button",ei),window.customCards=window.customCards||[],window.customCards.push({type:"materia-split-button",name:"Materia Split Button",description:"M3 Expressive split button — a main action plus a menu of related actions.",preview:!0});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oi{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),si(t,e);return!0},ni=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},ai=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),ci(e)}};function ri(t){void 0!==this._$AN?(ni(this),this._$AM=t,ai(this)):this._$AM=t}function li(t,e=!1,i=0){const o=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(o))for(let t=i;t<o.length;t++)si(o[t],!1),ni(o[t]);else null!=o&&(si(o,!1),ni(o));else si(this,t)}const ci=t=>{t.type==ii&&(t._$AP??=li,t._$AQ??=ri)};class di extends oi{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),ai(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(si(this,t),ni(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const hi=new WeakMap,pi=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends di{render(t){return V}update(t,[e]){const i=e!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),V}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let i=hi.get(e);void 0===i&&(i=new WeakMap,hi.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?hi.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class ui extends Mt{static properties={_expandedButton:{state:!0},_expandedOption:{state:!0}};static styles=[Mt.styles,n`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 8px;
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
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        font-weight: 600;
        font-size: 13px;
      }
      .opt-header .hint {
        font-weight: 400;
        font-size: 11px;
        opacity: 0.7;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        margin-top: 6px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 2px 2px 2px 10px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 10px 10px;
      }
    `];setConfig(t){super.setConfig(t),this._expandedButton??=null}_formData(){return{gap:8,padding:4,...this._config}}get _sections(){return[{title:"Layout",icon:"mdi:tune",fields:[{name:"gap",label:"Gap between buttons",selector:{number:{min:0,max:64,step:4,unit_of_measurement:"px",mode:"slider"}}},{name:"padding",label:"Vertical padding",selector:{number:{min:0,max:48,step:4,unit_of_measurement:"px",mode:"slider"}}}]}]}_renderExtra(){const t=this._config.buttons||[];return I`
      <div class="section-header">
        <span>Buttons</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${xt((t,e)=>this._moveButton(t,e),t.map((t,e)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(e)}>
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${t.icon&&!St(t.icon)?t.icon:`Button ${e+1}`}${t.options?.length?" · split":""}</span>
              <ha-icon-button @click=${t=>{t.stopPropagation(),this._toggleButton(e)}}>
                <ha-icon icon=${this._expandedButton===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${t=>{t.stopPropagation(),this._removeButton(e)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===e?I`
                  <div class="button-body">
                    <materia-button-editor
                      .hass=${this.hass}
                      ${pi(i=>{i&&i.__materiaIdx!==e&&(i.__materiaIdx=e,i.setConfig(t))})}
                      @config-changed=${t=>{t.stopPropagation(),this._buttonChanged(e,t.detail.config)}}
                    ></materia-button-editor>

                    <div class="opt-header">
                      <span>Menu options <span class="hint">(adding one makes a split button)</span></span>
                      <ha-icon-button @click=${t=>{t.stopPropagation(),this._addOption(e)}}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                      </ha-icon-button>
                    </div>
                    ${t.options?.length?I`<ha-form
                          .hass=${this.hass}
                          .data=${{menu_position:t.menu_position||"bottom-right"}}
                          .schema=${[{name:"menu_position",label:"Menu alignment",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"Below · right-aligned"},{value:"bottom-left",label:"Below · left-aligned"},{value:"top-right",label:"Above · right-aligned"},{value:"top-left",label:"Above · left-aligned"}]}}}]}
                          .computeLabel=${yt}
                          @value-changed=${i=>this._buttonChanged(e,{...t,menu_position:i.detail.value.menu_position})}
                        ></ha-form>`:""}
                    ${xt((t,i)=>this._moveOption(e,t,i),(t.options||[]).map((t,i)=>I`
                          <div class="opt-card">
                            <div class="opt-row">
                              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                              <span>${t.label||(t.icon&&!St(t.icon)?t.icon:`Option ${i+1}`)}</span>
                              <ha-icon-button @click=${()=>this._toggleOption(i)}>
                                <ha-icon icon=${this._expandedOption===i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                              </ha-icon-button>
                              <ha-icon-button @click=${()=>this._removeOption(e,i)}>
                                <ha-icon icon="mdi:delete"></ha-icon>
                              </ha-icon-button>
                            </div>
                            ${this._expandedOption===i?I`
                                  <div class="opt-body">
                                    <ha-form
                                      .hass=${this.hass}
                                      .data=${t}
                                      .schema=${this._optionSchema(t)}
                                      .computeLabel=${yt}
                                      @value-changed=${t=>this._optionChanged(e,i,t.detail.value)}
                                    ></ha-form>
                                  </div>
                                `:""}
                          </div>
                        `))}
                  </div>
                `:""}
          </div>
        `))}
    `}_moveButton(t,e){const i=[...this._config.buttons||[]],[o]=i.splice(t,1);i.splice(e,0,o),this._expandedButton=null,this._commit({...this._config,buttons:i})}_toggleButton(t){this._expandedButton=this._expandedButton===t?null:t}_addButton(){const t=[...this._config.buttons||[],{icon:"mdi:star",variant:"filled",size:"default"}];this._expandedButton=t.length-1,this._commit({...this._config,buttons:t})}_removeButton(t){const e=[...this._config.buttons||[]];e.splice(t,1),this._expandedButton===t&&(this._expandedButton=null),this._commit({...this._config,buttons:e})}_buttonChanged(t,e){const i=[...this._config.buttons||[]],o=i[t]?.options;i[t]=o&&!e.options?{...e,options:o}:e,this._commit({...this._config,buttons:i})}_optionSchema(t){return[St(t?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_withButtonOptions(t,e){const i=[...this._config.buttons||[]],o={...i[t]},s=[...o.options||[]];e(s),s.length?o.options=s:delete o.options,i[t]=o,this._commit({...this._config,buttons:i})}_addOption(t){this._withButtonOptions(t,t=>{t.push({icon:"mdi:circle-outline"}),this._expandedOption=t.length-1})}_removeOption(t,e){this._expandedOption===e&&(this._expandedOption=null),this._withButtonOptions(t,t=>t.splice(e,1))}_moveOption(t,e,i){this._withButtonOptions(t,t=>{const[o]=t.splice(e,1);t.splice(i,0,o)}),this._expandedOption===e&&(this._expandedOption=i)}_optionChanged(t,e,i){this._withButtonOptions(t,t=>{t[e]={...t[e],...i}})}_toggleOption(t){this._expandedOption=this._expandedOption===t?null:t}}customElements.define("materia-icon-row-editor",ui);const mi=new Set(["split","split-button","materia-split-button"]);class gi extends ct{static properties={hass:{attribute:!1},config:{state:!0}};static styles=[ft,n`
      .row {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `];static getConfigElement(){return document.createElement("materia-icon-row-editor")}static getStubConfig(){return{buttons:[{icon:"mdi:arrow-left",variant:"filled-tonal",size:"default"},{icon:"mdi:play",variant:"filled",size:"large"},{icon:"mdi:stop",variant:"filled",size:"large"},{icon:"mdi:arrow-right",variant:"filled-tonal",size:"default"}],gap:8,padding:4}}setConfig(t){if(!Array.isArray(t.buttons)||0===t.buttons.length)throw new Error("buttons array is required");this.config={gap:8,padding:4,...t}}getCardSize(){return 1}render(){if(!this.hass||!this.config)return I``;const t=this.config.gap??8,e=this.config.padding??4;return I`
      <div class="row" style="gap: ${t}px; padding: ${e}px 0;">
        ${this.config.buttons.map(t=>mi.has(t.type)||Array.isArray(t.options)&&t.options.length>0?I`<materia-split-button
                .hass=${this.hass}
                .config=${{variant:"filled",size:"default",...t}}
              ></materia-split-button>`:I`<materia-button
                .hass=${this.hass}
                .config=${{variant:"filled",size:"default",...t}}
              ></materia-button>`)}
      </div>
    `}}customElements.define("materia-icon-row",gi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-icon-row",name:"Materia Icon Row",description:"A centered row of icon buttons with configurable spacing.",preview:!0});const fi={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-secondary)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-error)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-state":["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],"secondary-state":["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],"tertiary-state":["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],"error-state":["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],"device-state":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]},_i=[ft,n`
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
  `],vi=[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"primary-state",label:"Primary State"},{value:"secondary-state",label:"Secondary State"},{value:"tertiary-state",label:"Tertiary State"},{value:"error-state",label:"Error State"},{value:"device-state",label:"Device State"},{value:"battery",label:"Battery"}];customElements.define("materia-badge-editor",class extends Mt{_sectionsSignature(){return this._config?.entity?"entity":"none"}get _sections(){const t=!!this._config?.entity,e=[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,template:!0,selector:{text:{}}},{name:"icon",required:!0,template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"variant",selector:{select:{mode:"dropdown",options:vi}}}]}];return t&&e.push({title:"State",icon:"mdi:state-machine",fields:[{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",template:!0,selector:{text:{}}}]}),e.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}),e}});const bi={cover:"open",lock:["locked","locking"],vacuum:"cleaning",media_player:"playing",climate:"heat",alarm_control_panel:"armed_away"};class yi extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-badge-editor")}static getStubConfig(t){const e=(t?Object.keys(t.states):[]).find(t=>t.startsWith("light.")||t.startsWith("switch."))||"";return{name:"Badge",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on",entity:e}}static styles=[gt,_i];setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("state_display","_resolvedStateDisplay"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state;if(null!=i)return Array.isArray(i)?i.includes(e):e===String(i);const o=t.entity_id.split(".")[0],s=bi[o]||"on";return Array.isArray(s)?s.includes(e):e===s}_getBatteryColors(t){const e=parseFloat(t?.state);return Number.isNaN(e)?["var(--ha-card-background)","var(--primary-text-color)"]:e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container, #ffecb3)","var(--md-sys-cust-color-on-warning-container, #6d4c00)"]:["var(--ha-card-background)","var(--primary-text-color)"]}get _templatesReady(){const t=this.config;return(!this._isTemplate(t.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t.state_display)||void 0!==this._resolvedStateDisplay)&&((!this._isTemplate(t.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t.name)||void 0!==this._resolvedName))))}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=!!t&&this._isUnavailable(e),o=!i&&this._isActive(e),s=this.config.variant||"secondary",n=this.config.show_state;let a=this._resolvedColor||this.config.color,r=this._resolvedColorOn||this.config.color_on;const l=["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"];if(!a)if("battery"===s){const[t,i]=this._getBatteryColors(e);a=t,r=i}else if(l.includes(s)){const t=fi[s]||fi.secondary;a=t[0],r=r||t[1]}else if(o&&t){const t=fi[s]||fi.secondary;a=t[0],r=r||t[1]}else a="var(--ha-card-background)",r=r||"var(--primary-text-color)";r=r||"var(--primary-text-color)";const c=n?"with-state":"no-state",d=o?"active":"inactive";let h="";if(n&&i)h="Unavailable";else if(n&&e){const t=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));if(this._resolvedStateDisplay&&t)h=this._resolvedStateDisplay;else if(this.config.state_display&&!t)h=this.config.state_display;else{const t=e.state,i=Number(t);if(""===t||null==t||Number.isNaN(i))h=t;else{const t=e.attributes?.unit_of_measurement,o=Math.round(100*i)/100;h=t?"%"===t?`${o}%`:`${o} ${t}`:`${o}`}}h=this._capitalize(h)}return I`
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
    `}_handleTap(){if(this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action){if(this._dblClickTimer)return;this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this.config.tap_action||{action:"toggle"})},250)}else this._handleAction(this.config.tap_action||{action:"toggle"})}_handleDoubleTap(){this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action&&(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,this._handleAction(this.config.double_tap_action))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._dblClickTimer),this._dblClickTimer=null}getCardSize(){return 2}}customElements.define("materia-badge",yi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-badge",name:"Materia Badge",description:"Square badge for dashboard headers.",preview:!0});const xi={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},tertiary:{active:"var(--md-sys-color-tertiary)",onActive:"var(--md-sys-color-on-tertiary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat-container)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool-container)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto-container)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device)",onActive:"var(--md-sys-cust-color-on-device)"}},wi={xs:{height:32,innerCorner:4},s:{height:36,innerCorner:8},m:{height:40,innerCorner:8},l:{height:48,innerCorner:16},xl:{height:56,innerCorner:20}},$i=[ft,mt,ae,n`
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
      flex: 1;
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
  `];class ki extends Mt{static properties={_expanded:{state:!0}};static styles=[Mt.styles,n`
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
    `];setConfig(t){super.setConfig(t),this._expanded??=null}_sectionsSignature(){return`${this._config?.preset||""}|${this._config?.multi_select?1:0}`}get _sections(){const t=[...Object.keys(xi).map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1).replace(/-/g," ")})),{value:"custom",label:"Custom"}],e=[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",label:"Color preset",selector:{select:{mode:"dropdown",options:t}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (36dp)"},{value:"m",label:"M (40dp)"},{value:"l",label:"L (48dp)"},{value:"xl",label:"XL (56dp)"}]}}},{name:"variant",label:"Style",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"}]}}},{name:"multi_select",label:"Multi-select",selector:{boolean:{}}},...this._config?.multi_select?[{name:"columns",label:"Max columns",selector:{number:{min:1,max:8,mode:"box"}}}]:[]]}];return"custom"===this._config?.preset&&e.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_active",label:"Active color",color:!0,template:!0,selector:{text:{}}},{name:"color_on_active",label:"Active text color",color:!0,template:!0,selector:{text:{}}}]}),e}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"entity",label:"Entity (optional — this button's own state)",selector:{entity:{}}},{name:"value",label:"Value (state that = active; blank = on/truthy)",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${xt((t,e)=>this._moveOption(t,e),(this._config.options||[]).map((t,e)=>I`
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
                        .computeLabel=${yt}
                        @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[o]=i.splice(t,1);i.splice(e,0,o),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleExpand(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-button-group-editor",ki);class Ci extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_optimisticValue:{state:!0},_optimisticEntities:{state:!0},_resolvedColorActive:{state:!0},_resolvedColorOnActive:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_select.")||t.startsWith("select."))||"";return{entity:e,size:"m",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}]}}static styles=[gt,$i];setConfig(t){this.config={size:"m",...t}}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const t=this.hass?.states[this.config.entity],e=this.config.entity?.split(".")[0];return"input_select"!==e&&"select"!==e||!t?.attributes?.options?[]:t.attributes.options.map(t=>({label:this._capitalize(t),value:t,tap_action:{action:"perform-action",perform_action:`${e}.select_option`,data:{option:t},target:{entity_id:this.config.entity}}}))}get _activeValue(){if(null!=this._optimisticValue)return this._optimisticValue;const t=this.hass?.states[this.config.entity];return this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):t?.state??""}_truthy(t){const e=String(t??"").toLowerCase();return""!==e&&!["off","closed","idle","standby","unavailable","unknown","not_home","false","0","none","auto_off"].includes(e)}_entityOptionActive(t){const e=t.entity,i=this._optimisticEntities?.[e],o=this.hass?.states[e]?.state;if(null!=t.value&&""!==t.value){const e=String(t.value).toLowerCase();return i&&null!=i.value?i.value===e:String(o??"").toLowerCase()===e}return i&&null!=i.active?i.active:this._truthy(o)}_isOptionActive(t){if(t.entity)return this._entityOptionActive(t);if(this.config.multi_select){const e=this._activeValue.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);return e.includes(String(t.value).toLowerCase())}return String(t.value)===this._activeValue}_getActiveColors(){const t=this._resolvedColorActive||this.config.color_active,e=this._resolvedColorOnActive||this.config.color_on_active;return t&&e?{active:t,onActive:e}:this.config.preset&&xi[this.config.preset]?xi[this.config.preset]:xi.primary}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity?this.hass.states[this.config.entity]:void 0,e=!!t&&this._isUnavailable(t),i=this.config.size||"m",{height:o,innerCorner:s}=wi[i]||wi.m,n=o/2;this._activeValue;const a=this._getActiveColors(),r=this._resolvedOptions,l=this.config.variant||"filled";if(!r.length)return I``;const c=this.config.multi_select,d=this.config.columns||0;return I`
      <ha-card>
        <div class="group ${e?"unavailable":""} ${c?"multi":""}"
          style="${c?`--btn-height: ${o}px;`:`height: ${o}px;`} ${d?`--btn-columns: ${d};`:""}">
          ${r.map((t,e)=>{const i=this._isOptionActive(t),h=0===e,p=e===r.length-1,u="square"===this.config.active_shape,m=u?Math.min(s,Math.max(6,Math.round(.18*o))):n;let g;if(c)if(i)g=`${m}px`;else{const t=d||r.length,i=Math.floor(e/t),o=e%t,a=0===i,l=i===Math.ceil(r.length/t)-1,c=0===o,h=o===t-1||e===r.length-1;g=`${a&&c?n:s}px ${a&&h?n:s}px ${l&&h?n:s}px ${l&&c?n:s}px`}else{const t=i?`${m}px`:`${s}px`,e=i&&u?`${m}px`:`${n}px`;g=1===r.length?e:h?`${e} ${t} ${t} ${e}`:p?`${t} ${e} ${e} ${t}`:t}const f=i?a.active:void 0,_=i?a.onActive:void 0;return I`
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
    `}_handleOptionTap(t){if(t.entity){const e=t.entity,i=String(this.hass?.states[e]?.state??""),o=null!=t.value&&""!==t.value?{baseline:i,value:String(t.value).toLowerCase()}:{baseline:i,active:!this._truthy(i)};this._optimisticEntities={...this._optimisticEntities,[e]:o},this._optEntityTimers=this._optEntityTimers||{},clearTimeout(this._optEntityTimers[e]),this._optEntityTimers[e]=setTimeout(()=>{const{[e]:t,...i}=this._optimisticEntities||{};this._optimisticEntities=i},1e4)}else if(!this.config.multi_select){const e=this.hass?.states[this.config.entity];this._optimisticBaseline=this.config.attribute?String(e?.attributes?.[this.config.attribute]??""):String(e?.state??""),this._optimisticValue=String(t.value),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}t.tap_action?this._handleAction(t.entity?{entity:t.entity,...t.tap_action}:t.tap_action):t.entity?this._fireMoreInfo(t.entity):this.config.entity&&this._fireMoreInfo(this.config.entity)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer);for(const t of Object.values(this._optEntityTimers||{}))clearTimeout(t)}updated(t){if(t.has("hass")&&this.hass&&(this._resolveField("color_active","_resolvedColorActive"),this._resolveField("color_on_active","_resolvedColorOnActive")),t.has("hass")&&null!=this._optimisticValue){const t=this.hass?.states[this.config.entity],e=this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):String(t?.state??"");(e.toLowerCase()===this._optimisticValue.toLowerCase()||null!=this._optimisticBaseline&&e!==this._optimisticBaseline)&&(this._optimisticValue=null,this._optimisticBaseline=null,clearTimeout(this._optimisticTimer))}if(t.has("hass")&&this._optimisticEntities){let t=!1;const e={...this._optimisticEntities};for(const[i,o]of Object.entries(e)){const s=String(this.hass?.states[i]?.state??"");(null!=o.baseline&&s!==o.baseline||(null!=o.value?s.toLowerCase()===o.value:this._truthy(s)===o.active))&&(delete e[i],clearTimeout(this._optEntityTimers?.[i]),t=!0)}t&&(this._optimisticEntities=e)}}getCardSize(){return 1}}customElements.define("materia-button-group",Ci),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 connected button group with presets and sizes.",preview:!0});const Si=[ft,n`
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
  `];customElements.define("materia-checkbox-editor",class extends Mt{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"tap_action_checked",label:"Action (checked)",selector:{ui_action:{}}},{name:"tap_action_unchecked",label:"Action (unchecked)",selector:{ui_action:{}}}]}]}});class Ai extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_boolean."))||"";return{entity:e,name:"Checkbox"}}static styles=[gt,Si];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(this.config.checked_entity){const t=this.hass?.states[this.config.checked_entity];if(!t)return!1;const e=String(t.state??"").split(",").map(t=>t.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(t=>e.includes(t)):!!this.config.checked_value&&e.includes(this.config.checked_value)}if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}updated(t){t.has("hass")&&this.hass&&this._resolveField("name","_resolvedName")}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=!e&&this._isChecked(t),o=this._isTemplate(this.config.name)?this._resolvedName:this.config.name??t?.attributes?.friendly_name??this.config.entity,s=i?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return I`
      <ha-card class="${e?"unavailable":""}" @click=${this._handleTap}>
        <div class="name">${o}</div>
        <div class="icon-cell">
          <ha-icon .icon=${s}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.hass?.states[this.config.entity],e=this._isChecked(t);let i;i=e&&this.config.tap_action_checked?this.config.tap_action_checked:!e&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",Ai),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Checkbox with custom checked state logic.",preview:!0});const Ei=[ft,mt,n`
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
  `];customElements.define("materia-pill-editor",class extends Mt{_formData(){return{background:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"state_display",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"background",selector:{boolean:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{}}}]}]}});class Mi extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedStateDisplay:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(t){const e=(t?Object.keys(t.states):[]).find(t=>t.startsWith("sensor."))||"";return{entity:e,name:"",icon:"mdi:information-outline"}}static styles=[gt,Ei];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...t}}_classify(t){const e=this.config.ranges||[];if(!e.length)return{label:"",color:""};const i=parseFloat(t);if(Number.isNaN(i))return{label:"",color:""};for(const t of e)if(null==t.max||i<=t.max)return{label:t.label,color:t.color};return{label:"",color:""}}get _templatesReady(){const t=this.config;return(!this._isTemplate(t?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t?.name)||void 0!==this._resolvedName)))}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("state_display","_resolvedStateDisplay"))}render(){if(!this.hass||!this.config)return I``;if(!this._templatesReady)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||t?.attributes?.friendly_name||this.config.entity,o=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||t?.attributes?.icon||"",s=t?.attributes?.unit_of_measurement||"",n=t?.state??"",a=this.config.ranges||[],r=this._classify(n);let l;l=e?"Unavailable":this.config.state_display?this._isTemplate(this.config.state_display)?this._resolvedStateDisplay??"":this.config.state_display:a.length?s?`${n} · ${r.label||i}`:n:s?`${this._capitalize(n)} ${s}`:this._capitalize(n);const c=a.length?e?i:s||(r.label||i):"",d=this._resolvedColor||this.config.color||"var(--ha-card-background, var(--card-background-color))",h=this._resolvedColorOn||this.config.color_on||"var(--primary-text-color)",p=!1===this.config.background||"none"===this.config.background;return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${p?"no-bg":""}"
          style="background-color: ${p?"transparent":d}; color: ${h};"
          @click=${this._handleTap}
        >
          ${o?I`
            <div class="icon-container">
              <ha-icon .icon=${o} style="color: ${h};"></ha-icon>
            </div>
          `:""}
          <div class="name-container">
            <div class="name">${a.length?l:i}</div>
            <div class="state">${a.length?c:l}</div>
          </div>
          ${this._hasNavigateAction?I`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",Mi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill for sensors, weather, and status indicators.",preview:!0});const Ti=[ft,mt,gt,n`
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
`];class Fi extends Mt{static properties={_expanded:{state:!0}};static styles=[Mt.styles,n`
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
    `];setConfig(t){super.setConfig(t),this._expanded??=null}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"position",selector:{select:{mode:"dropdown",options:[{value:"below",label:"Below"},{value:"above",label:"Above"}]}}}]},{title:"Substate",icon:"mdi:format-text-variant-outline",fields:[{name:"substate",label:"Substate text / template",template:!0,selector:{text:{}}},{name:"substate_entity",label:"…or from entity",selector:{entity:{}}},{name:"substate_attribute",label:"Entity attribute (optional)",selector:{text:{}}},{name:"substate_separator",label:"Separator",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"•",label:"Dot •"},{value:"–",label:"Dash –"},{value:"/",label:"Slash /"}]}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]}]}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${xt((t,e)=>this._moveOption(t,e),(this._config.options||[]).map((t,e)=>I`
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
                        .computeLabel=${yt}
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
    `}_stateLabel(t){return Array.isArray(t)?t.join(", "):t||""}_parseStateInput(t){const e=(t||"").trim();return e.includes(",")?e.split(",").map(t=>t.trim()).filter(Boolean):e}_addStateColor(){const t=[...this._config.state_colors||[],{}];this._commit({...this._config,state_colors:t})}_removeStateColor(t){const e=[...this._config.state_colors||[]];e.splice(t,1);const i={...this._config};e.length?i.state_colors=e:delete i.state_colors,this._commit(i)}_updateStateColor(t,e,i){const o=(this._config.state_colors||[]).map(t=>({...t}));o[t]&&(""===i||null==i?delete o[t][e]:o[t][e]=i,this._commit({...this._config,state_colors:o}))}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[o]=i.splice(t,1);i.splice(e,0,o),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleExpand(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-menu-editor",Fi);class zi extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_optimisticValue:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubstate:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=Ti;static getConfigElement(){return document.createElement("materia-menu-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_select.")||t.startsWith("select."))||"";return{entity:e}}setConfig(t){this.config={position:"below",...t},this._open=!1}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const t=this.hass?.states[this.config.entity],e=this.config.entity?.split(".")[0];return"input_select"!==e&&"select"!==e||!t?.attributes?.options?[]:t.attributes.options.map(t=>({label:this._capitalize(t),value:t}))}get _currentValue(){return null!=this._optimisticValue?this._optimisticValue:this.hass?.states[this.config.entity]?.state??""}get _substate(){const t=this.config;if(null!=t.substate&&""!==t.substate)return this._isTemplate(t.substate)?this._resolvedSubstate??"":t.substate;if(t.substate_entity){const e=this.hass?.states[t.substate_entity];if(!e)return"";const i=t.substate_attribute?e.attributes?.[t.substate_attribute]:e.state;return null==i?"":String(i)}return""}_toggle(){this._open=!this._open}_selectOption(t){const e=t.value;this._optimisticValue=e,this._open=!1;const i=this.config.entity?.split(".")[0];"input_select"!==i&&"select"!==i||this._callService(i,"select_option",{entity_id:this.config.entity,option:e}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=t=>{if(!this._open)return;const e=t.composedPath?.()||[];e.includes(this)||this._portal&&e.includes(this._portal)||(this._open=!1)},document.addEventListener("click",this._outsideClickHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler),clearTimeout(this._optimisticTimer),clearTimeout(this._portalTimer),this._detachReposition(),this._removePortal()}updated(t){if(t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("substate","_resolvedSubstate"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn")),t.has("hass")&&null!=this._optimisticValue){const t=this.hass?.states[this.config.entity]?.state;t===this._optimisticValue&&(this._optimisticValue=null,clearTimeout(this._optimisticTimer))}t.has("_open")?this._open?this._openPortal():this._closePortal():this._open&&this._portalRoot&&!this._closing&&(this._renderPortal(),this._positionPortal())}_matchStateColor(t){const e=this.config.state_colors,i=Array.isArray(e)?e:Object.entries(e).map(([t,e])=>"string"==typeof e?{state:t,color:e}:{state:t,...e});return i.find(e=>Array.isArray(e.state)?e.state.map(String).includes(String(t)):String(e.state)===String(t))}_colors(){const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._currentValue;let o=this._resolvedColor||this.config.color,s=this._resolvedColorOn||this.config.color_on;const n=this.config.state_colors?this._matchStateColor(i):null;n&&(n.color&&(o=n.color),n.color_on&&(s=n.color_on));const a=!e&&(o||s),r=a?`${o?`background-color:${o};`:""}${s?`color:${s};`:""}`:"";return{stateObj:t,unavailable:e,currentValue:i,colored:a,triggerStyle:r,panelStyle:""+(o?`--_surf:${o};`:"")+(a&&s?`${r}--menu-selected-bg:color-mix(in srgb, ${s} 22%, transparent);--menu-selected-fg:${s};`:r)}}_ensurePortal(){if(this._portal)return;const t=document.createElement("div");t.className="materia-menu-portal",t.style.cssText="position:fixed; z-index:1000; pointer-events:auto;";const e=t.attachShadow({mode:"open"}),i=Array.isArray(Ti)?Ti:[Ti];if("adoptedStyleSheets"in e&&i.every(t=>t.styleSheet))e.adoptedStyleSheets=i.map(t=>t.styleSheet);else{const t=document.createElement("style");t.textContent=i.map(t=>t.cssText).join("\n"),e.appendChild(t)}document.body.appendChild(t),this._portal=t,this._portalRoot=e}_removePortal(){this._portal&&(this._portal.remove(),this._portal=null,this._portalRoot=null)}_syncThemeVars(){if(!this._portal)return;const t=getComputedStyle(this);for(let e=0;e<t.length;e++){const i=t[e];45===i.charCodeAt(0)&&45===i.charCodeAt(1)&&this._portal.style.setProperty(i,t.getPropertyValue(i))}}_positionPortal(){if(!this._portal)return;const t=this.shadowRoot?.querySelector(".trigger");if(!t)return;const e=t.getBoundingClientRect(),i=this._portal;i.style.left=`${e.left}px`,i.style.width=`${e.width}px`,"above"===this.config.position?(i.style.top="auto",i.style.bottom=window.innerHeight-e.top+2+"px"):(i.style.bottom="auto",i.style.top=`${e.bottom+2}px`)}_attachReposition(){this._repositionRef||(this._repositionRef=()=>this._positionPortal(),window.addEventListener("scroll",this._repositionRef,!0),window.addEventListener("resize",this._repositionRef))}_detachReposition(){this._repositionRef&&(window.removeEventListener("scroll",this._repositionRef,!0),window.removeEventListener("resize",this._repositionRef),this._repositionRef=null)}_openPortal(){this._closing=!1,clearTimeout(this._portalTimer),this._ensurePortal(),this._syncThemeVars(),this._positionPortal(),this._renderPortal(),this._attachReposition()}_closePortal(){this._portalRoot&&(this._closing=!0,this._renderPortal(),this._detachReposition(),clearTimeout(this._portalTimer),this._portalTimer=setTimeout(()=>{this._removePortal(),this._closing=!1},170))}_renderPortal(){this._portalRoot&&rt(this._dropdownTemplate(),this._portalRoot)}_dropdownTemplate(){if(!this.hass||!this.config)return I``;const{panelStyle:t,currentValue:e}=this._colors(),i=this._resolvedOptions,o="above"===this.config.position?"above":"below";return I`
      <div class="portal-panel ${o} ${this._closing?"closing":""}">
        <div class="dropdown" style=${t}>
          ${i.map(t=>I`
            <div
              class="menu-item ${t.value===e?"selected":""}"
              @click=${e=>{e.stopPropagation(),this._selectOption(t)}}
            >
              ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}
              <span class="item-text">${t.label||t.value}</span>
            </div>
          `)}
        </div>
      </div>
    `}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._currentValue,o=this._resolvedOptions,s=o.find(t=>t.value===i)?.label||this._capitalize(i),n=this._substate,a=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||t?.attributes?.friendly_name||"",{triggerStyle:r}=this._colors();return I`
      <ha-card>
        <div class="trigger ${e?"unavailable":""} ${this._open?"above"===this.config.position?"open-above":"open-below":""}" style=${r} @click=${this._toggle}>
          ${this.config.icon?I`
            <div class="icon-container">
              <ha-icon .icon=${this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon}></ha-icon>
            </div>
          `:""}
          <div class="text-container">
            ${a?I`<div class="label">${a}</div>`:""}
            <div class="value">
              <span class="value-main">${s}</span>
              ${n?I`<span class="value-sep">${this.config.substate_separator||"•"}</span><span class="value-sub">${n}</span>`:""}
            </div>
          </div>
          <div class="chevron-btn" @click=${t=>{t.stopPropagation(),this._toggle()}}>
            <ha-icon class="chevron" icon=${this._open?"m3of:arrow-drop-up":"m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-menu",zi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-menu",name:"Materia Menu",description:"M3 vertical dropdown menu for select entities.",preview:!0});const Oi=n`
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
`;class Pi extends Mt{static properties={_expanded:{state:!0}};static styles=[Mt.styles,n`
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
    `];setConfig(t){super.setConfig(t),this._expanded??=null}_formData(){return{show_state:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"attribute",helper:"Match option values against this attribute instead of state",selector:{text:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"active_color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}}]}]}_optionSchema(t){return[St(t?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"value",label:"Active when state equals (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const t=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${xt((t,e)=>this._moveOption(t,e),t.map((t,e)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${t.label||(t.icon&&!St(t.icon)?t.icon:`Option ${e+1}`)}</span>
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
                        .computeLabel=${yt}
                        @value-changed=${t=>this._optionChanged(e,t.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const t=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=t.length-1,this._commit({...this._config,options:t})}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1),this._expanded===t&&(this._expanded=null),this._commit({...this._config,options:e})}_moveOption(t,e){const i=[...this._config.options||[]],[o]=i.splice(t,1);i.splice(e,0,o),this._expanded===t&&(this._expanded=e),this._commit({...this._config,options:i})}_optionChanged(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e},this._commit({...this._config,options:i})}_toggleOption(t){this._expanded=this._expanded===t?null:t}}customElements.define("materia-button-stack-editor",Pi);class Ui extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedActiveColor:{state:!0},_resolvedActiveColorOn:{state:!0}};static styles=Oi;static getConfigElement(){return document.createElement("materia-button-stack-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("lock."))||"";return{entity:e,options:[{icon:"m3o:lock-open",value:"unlocked",tap_action:{action:"perform-action",perform_action:"lock.unlock",target:{entity_id:e}}},{icon:"m3o:lock",value:"locked",tap_action:{action:"perform-action",perform_action:"lock.lock",target:{entity_id:e}}}]}}setConfig(t){if(!Array.isArray(t.options)||0===t.options.length)throw new Error("at least one option is required");this.config=t}updated(t){t.has("hass")&&this.hass&&(this._resolveField("name","_resolvedName"),this._resolveField("active_color","_resolvedActiveColor"),this._resolveField("active_color_on","_resolvedActiveColorOn"))}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:""}_isActive(t,e){const i=t.value;if(null==i)return!1;const o=this.config.attribute?e?.attributes?.[this.config.attribute]:e?.state;return Array.isArray(i)?i.map(String).includes(String(o)):String(i)===String(o)}_onOption(t){t.tap_action&&this._handleAction(t.tap_action)}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=!!t&&this._isUnavailable(e),o=this.config.options||[],s=!1!==this.config.show_state&&!!t,n=this._resolvedActiveColor||this.config.active_color,a=this._resolvedActiveColorOn||this.config.active_color_on,r=`${n?`--materia-active-bg:${n};`:""}${a?`--materia-active-fg:${a};`:""}`,l=i?"Unavailable":e?this._capitalize(e.state):"";return I`
      <ha-card>
        <div class="wrap ${i?"unavailable":""}">
          ${this._name?I`<div class="name">${this._name}</div>`:""}
          <div class="stack" style=${r}>
            ${o.map(t=>I`
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
          ${s?I`<div class="state">${l}</div>`:V}
        </div>
      </ha-card>
    `}getCardSize(){return Math.max(2,2*(this.config?.options?.length||2))}}customElements.define("materia-button-stack",Ui),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-stack",name:"Materia Button Stack",description:"Vertical segmented button — stacked options with optional active-state highlighting.",preview:!0});const Di=n`
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
`;customElements.define("materia-media-progress-editor",class extends Mt{_formData(){return{show_times:!0,seekable:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"show_times",selector:{boolean:{}}},{name:"seekable",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Wave color",color:!0,template:!0,selector:{text:{}}}]}]}});let qi=0;class Bi extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_w:{state:!0},_resolvedColor:{state:!0}};static styles=Di;static getConfigElement(){return document.createElement("materia-media-progress-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("media_player."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config=t,this._cid??="mp-clip-"+ ++qi}_position(){const t=this.hass?.states[this.config.entity];if(!t)return{pos:0,dur:0,playing:!1,live:!1};const e=Number(t.attributes.media_duration)||0;let i=Number(t.attributes.media_position)||0;const o="playing"===t.state,s=t.attributes.media_position_updated_at;o&&s&&(i+=(Date.now()-new Date(s).getTime())/1e3);const n=`${this.config.entity}|${t.attributes.media_content_id??t.attributes.media_title??""}`;return n!==this._latchKey&&(this._latchKey=n,this._live=!1),o?e>0&&i>=e-.25&&(this._live=!0):this._live=!1,e&&(i=Math.min(i,e)),{pos:Math.max(0,i),dur:e,playing:o,live:this._live}}_fmt(t){t=Math.max(0,Math.round(t));const e=Math.floor(t/3600),i=Math.floor(t%3600/60),o=t%60,s=t=>String(t).padStart(2,"0");return e>0?`${e}:${s(i)}:${s(o)}`:`${i}:${s(o)}`}_wavePath(t,e){let i="";for(let o=t;o<=e;o+=2){const t=14-2*Math.sin(2*Math.PI*o/32);i+=`${i?" L":"M"} ${o.toFixed(1)} ${t.toFixed(1)}`}return i||"M 0 14"}firstUpdated(){const t=this.shadowRoot?.querySelector(".bar");t&&(this._w=t.clientWidth,this._ro=new ResizeObserver(t=>{this._w=t[0].contentRect.width}),this._ro.observe(t))}updated(){const t=this.shadowRoot;this._clipRect=t?.querySelector("clipPath rect"),this._thumbEl=t?.querySelector(".thumb"),this._trackEl=t?.querySelector(".track"),this._posEl=t?.querySelector(".time");"playing"===this.hass?.states[this.config.entity]?.state&&!this._live?this._startLoop():this._stopLoop(),this.hass&&this._resolveField("color","_resolvedColor")}_startLoop(){if(this._raf)return;const t=()=>{this._raf=requestAnimationFrame(t),this._tickDom()};this._raf=requestAnimationFrame(t)}_tickDom(){const{pos:t,dur:e,live:i}=this._position(),o=this._w||300,s=(i?1:e>0?Math.min(1,t/e):0)*o;this._clipRect&&this._clipRect.setAttribute("width",Math.max(0,s)),this._thumbEl&&this._thumbEl.setAttribute("x",s-2),this._trackEl&&this._trackEl.setAttribute("x1",s),this._posEl&&(this._posEl.textContent=this._fmt(t)),i&&this._stopLoop()}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_fullWave(t){return this._waveW!==t&&(this._waveW=t,this._wavePathCache=this._wavePath(-32,t+32)),this._wavePathCache}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),this._ro?.disconnect()}_seek(t){if(!1===this.config.seekable)return;const{dur:e}=this._position();if(!e)return;const i=t.currentTarget.getBoundingClientRect(),o=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width));this._callService("media_player","media_seek",{entity_id:this.config.entity,seek_position:o*e})}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),{pos:i,dur:o,playing:s,live:n}=this._position(),a=this._w||300,r=(n?1:o>0?Math.min(1,i/o):0)*a,l=!1!==this.config.show_times,c=this._resolvedColor||this.config.color;return I`
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
                <path class="wave ${s?"playing":""}" d=${this._fullWave(a)}></path>
              </g>
              <rect class="thumb" x=${r-2} y=${4} width="4" height="20" rx="2"></rect>
            </svg>
          </div>
          ${l?I`
                <div class="times">
                  <span class="time">${this._fmt(i)}</span>
                  <span class="time">${this._fmt(o)}</span>
                </div>
              `:V}
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-media-progress",Bi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media-progress",name:"Materia Media Progress",description:"Wavy (M3 expressive) media seek bar with elapsed/duration and tap-to-seek.",preview:!0});const Ni=n`
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

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;customElements.define("materia-media-editor",class extends Mt{_formData(){return{show_art:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"name",label:"Title",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"image",helper:"Defaults to the entity's album art",template:!0,selector:{text:{}}},{name:"fallback_image",helper:"Shown when there's no art",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_art",selector:{boolean:{}}},{name:"art_size",label:"Art size (px)",selector:{number:{min:80,max:480,mode:"box"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class Ri extends(ut(ct)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedImage:{state:!0}};static styles=Ni;static getConfigElement(){return document.createElement("materia-media-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("media_player."))||"";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config=t}updated(t){t.has("hass")&&this.hass&&(this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("image","_resolvedImage"))}get _stateObj(){return this.hass?.states[this.config.entity]}get _title(){if(this.config.name)return this._isTemplate(this.config.name)?this._resolvedName:this.config.name;const t=this._stateObj?.attributes;return t?.media_title||t?.friendly_name||""}get _subtitle(){if(this.config.subtitle)return this._isTemplate(this.config.subtitle)?this._resolvedSubtitle:this.config.subtitle;const t=this._stateObj?.attributes;return t?.media_artist||t?.media_album_name||""}get _image(){if(this.config.image){const t=this._isTemplate(this.config.image)?this._resolvedImage:this.config.image;if(t)return t}return this._stateObj?.attributes?.entity_picture||this.config.fallback_image||""}_tap(){this._handleAction(this.config.tap_action||{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const t=this._stateObj,e=this._isUnavailable(t),i=this._image,o=this._title,s=this._subtitle,n=`${this.config.art_size?`--mm-art:${this.config.art_size}px;`:""}${i?`background-image:url('${i}');`:""}`;return I`
      <ha-card>
        <div class="wrap ${e?"unavailable":""}" @click=${this._tap}>
          ${!1===this.config.show_art?V:I`<div class="art" style=${n}></div>`}
          ${o?I`<div class="title">${o}</div>`:V}
          ${s?I`<div class="subtitle">${s}</div>`:V}
        </div>
      </ha-card>
    `}getCardSize(){return 4}}customElements.define("materia-media",Ri),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media",name:"Materia Media",description:"Now-playing card — album art, title and subtitle (all templatable).",preview:!0});const Li=n`
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
    font-weight: 700;
  }

  .dot {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
  }

  .digital {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 26%, transparent));
    font-weight: 800;
    letter-spacing: -1px;
  }

  .date {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    font-weight: 700;
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
`;customElements.define("materia-clock-editor",class extends Mt{_formData(){return{hand_width:5,size:10,...this._config}}get _sections(){return[{title:"Clock",icon:"mdi:clock-outline",fields:[{name:"numbers",selector:{select:{mode:"dropdown",options:[{value:"cardinal",label:"Cardinal (12 · 3 · 6 · 9)"},{value:"all",label:"All (1–12)"},{value:"dots",label:"Hour dots"},{value:"none",label:"None"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"second_dot",label:"Second hand as rim dot",selector:{boolean:{}}},{name:"smooth",label:"Smooth second hand",selector:{boolean:{}}},{name:"cookie",label:"Cookie face (12-sided)",selector:{boolean:{}}},{name:"digital",label:"Digital readout (HH/MM behind hands)",selector:{boolean:{}}},{name:"date",label:"Show date",selector:{boolean:{}}},{name:"hand_width",label:"Hand thickness",selector:{number:{min:1,max:12,step:.5,mode:"slider"}}},{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"face_color",label:"Face",color:!0,template:!0,selector:{text:{}}},{name:"number_color",label:"Numbers",color:!0,template:!0,selector:{text:{}}},{name:"hand_color",label:"Hands",color:!0,template:!0,selector:{text:{}}},{name:"second_color",label:"Second hand",color:!0,template:!0,selector:{text:{}}}]}]}});customElements.define("materia-clock",class extends ct{static properties={hass:{attribute:!1},config:{state:!0},_t:{state:!0}};static styles=Li;static getConfigElement(){return document.createElement("materia-clock-editor")}static getStubConfig(){return{numbers:"cardinal",show_seconds:!0}}setConfig(t){this.config=t||{}}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._stop()}updated(t){t.has("config")&&(this._facePath=null,this._stop(),this._start())}_scallop(){let t="";for(let e=0;e<=240;e++){const i=e/240*Math.PI*2,o=48+1*Math.cos(12*i);t+=`${0===e?"M":"L"}${(50+o*Math.cos(i)).toFixed(2)} ${(50+o*Math.sin(i)).toFixed(2)} `}return t+"Z"}_start(){if(!this._raf&&!this._tick)if(this.config?.smooth){const t=()=>{this._raf=requestAnimationFrame(t),this._t=performance.now()};this._raf=requestAnimationFrame(t)}else this._tick=setInterval(()=>this._t=Date.now(),1e3)}_stop(){this._raf&&cancelAnimationFrame(this._raf),this._tick&&clearInterval(this._tick),this._raf=null,this._tick=null}render(){if(!this.config)return I``;const t=new Date,e=!!this.config.smooth,i=t.getSeconds()+(e?t.getMilliseconds()/1e3:0),o=t.getMinutes()+i/60,s=30*(t.getHours()%12+o/60),n=6*o,a=6*i,r=!1!==this.config.show_seconds,l=!!(this.config.cookie??this.config.squiggle);l&&(this._facePath??=this._scallop());const c=this.config.numbers||"cardinal",d="all"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:"cardinal"===c?[12,3,6,9]:[],h="all"===c?40:34,p="all"===c?9:18,u="dots"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:[],m=!!this.config.digital,g=String(t.getHours()%12||12).padStart(2,"0"),f=String(t.getMinutes()).padStart(2,"0"),_=!!this.config.date,v=`${t.toLocaleDateString(void 0,{weekday:"short"})} ${t.getDate()}`,b=(s%360+360)%360,y=(n%360+360)%360,x=Math.min(b,y),w=Math.max(b,y),$=w-x;let k=$>=360-$?x+$/2:w+(360-$)/2;k=30*Math.round((k-15)/30)+15,k=(k%360+360)%360;const C=k*Math.PI/180,S=u.length?41:d.length?h:40,A=(50+S*Math.sin(C)).toFixed(2),E=(50-S*Math.cos(C)).toFixed(2);let M=k;M>90&&M<270&&(M-=180);const T=4.4*v.length/2/S*(180/Math.PI)+(u.length?4:8),F=t=>{if(!_)return!1;const e=(t%12*30%360+360)%360;let i=Math.abs(e-k)%360;return i>180&&(i=360-i),i<T},z=d.filter(t=>!F(t)),O=u.filter(t=>!F(t)),P=!!this.config.second_dot,U=a*Math.PI/180,D=(50+44*Math.sin(U)).toFixed(2),q=(50-44*Math.cos(U)).toFixed(2),B=this.config.hand_width,N=`--clock-size:${["98px","136px","174px","212px","250px","300px","360px","440px","560px","100%"][Math.min(10,Math.max(1,this.config.size??10))-1]};`+(this.config.face_color?`--clock-face:${this.config.face_color};`:"")+(this.config.number_color?`--clock-number:${this.config.number_color};`:"")+(this.config.hand_color?`--clock-hand:${this.config.hand_color};`:"")+(this.config.second_color?`--clock-second:${this.config.second_color};`:"")+(B?`--clock-hour-w:${B};--clock-minute-w:${(.7*B).toFixed(2)};--clock-second-w:${(.3*B).toFixed(2)};`:"");return I`
      <ha-card style=${N}>
        <svg viewBox="0 0 100 100">
          ${l?H`<path class="face" d=${this._facePath}></path>`:H`<circle class="face" cx="50" cy="50" r="49"></circle>`}
          ${z.map(t=>{const e=t%12*30*Math.PI/180,i=50+h*Math.sin(e),o=50-h*Math.cos(e);return H`<text class="num" x=${i.toFixed(1)} y=${o.toFixed(1)} font-size=${p} text-anchor="middle" dominant-baseline="central">${t}</text>`})}
          ${O.map(t=>{const e=t%12*30*Math.PI/180,i=50+41*Math.sin(e),o=50-41*Math.cos(e);return H`<circle class="dot" cx=${i.toFixed(1)} cy=${o.toFixed(1)} r="1.3"></circle>`})}
          ${m?H`
                <text class="digital" x="50" y="40" font-size="30" text-anchor="middle" dominant-baseline="central">${g}</text>
                <text class="digital" x="50" y="64" font-size="30" text-anchor="middle" dominant-baseline="central">${f}</text>
              `:""}
          ${_?H`<text class="date" x=${A} y=${E} font-size="8" text-anchor="middle" dominant-baseline="central" transform="rotate(${M.toFixed(1)} ${A} ${E})">${v}</text>`:""}
          <line class="hand hour" x1="50" y1="50" x2="50" y2="28" transform="rotate(${s.toFixed(2)} 50 50)"></line>
          <line class="hand minute" x1="50" y1="50" x2="50" y2="16" transform="rotate(${n.toFixed(2)} 50 50)"></line>
          ${r?P?H`<circle class="second-dot" cx=${D} cy=${q} r="3.2"></circle>`:H`<line class="hand second" x1="50" y1="56" x2="50" y2="13" transform="rotate(${a.toFixed(2)} 50 50)"></line>`:""}
          <circle class="pin" cx="50" cy="50" r="2.4"></circle>
        </svg>
      </ha-card>
    `}getCardSize(){return 4}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-clock",name:"Materia Clock",description:"Material You analog clock — cardinal numbers, sweeping hands.",preview:!0}),function(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}();console.info("%c MATERIA %c v0.5.74 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
