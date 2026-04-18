/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(o,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",_=u.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),s=t.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=new Map,x[f("finalized")]=new Map,_?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,C=w.trustedTypes,k=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,T=`<${S}>`,U=document,z=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,F="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,R=/>/g,N=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),H=new WeakMap,W=U.createTreeWalker(U,129);function X(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",a=P;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===P?"!--"===c[1]?a=D:void 0!==c[1]?a=R:void 0!==c[2]?(I.test(c[2])&&(s=RegExp("</"+c[2],"g")),a=N):void 0!==c[3]&&(a=N):a===N?">"===c[0]?(a=s??P,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?N:'"'===c[3]?B:j):a===B||a===j?a=N:a===D||a===R?a=P:(a=N,s=void 0);const h=a===N&&t[e+1].startsWith("/>")?" ":"";n+=a===P?i+T:l>=0?(o.push(r),i.slice(0,l)+A+i.slice(l)+E+h):i+E+(-2===l?e:h)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const a=t.length-1,r=this.parts,[c,l]=G(t,e);if(this.el=J.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(A)){const e=l[n++],i=o.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),o.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:s}),o.removeAttribute(t));if(I.test(o.tagName)){const t=o.textContent.split(E),e=t.length-1;if(e>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],z()),W.nextNode(),r.push({type:2,index:++s});o.append(t[e],z())}}}else if(8===o.nodeType)if(o.data===S)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(E,t+1));)r.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,o){if(e===q)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,o)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??U).importNode(e,!0);W.currentNode=o;let s=W.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new Z(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new ot(s,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(s=W.nextNode(),n++)}return W.currentNode=U,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new K(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=H.get(t.strings);return void 0===e&&H.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new Z(this.O(z()),this.O(z()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=Y(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const o=t;let a,r;for(t=s[0],a=0;a<s.length-1;a++)r=Y(this,o[i+a],e,a),r===q&&(r=this._$AH[a]),n||=!O(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+s[a+1]),this._$AH[a]=r}n&&!o&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Q{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??V)===q)return;const i=this._$AH,o=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==V&&(i===V||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(J,Z),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new Z(e.insertBefore(z(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const rt=nt.litElementPolyfillSupport;let ct;rt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2"),n`
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
`;class lt extends at{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"}};static styles=n`
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
  `;constructor(){super(),this.min=0,this.max=100,this.value=0,this.step=1,this.color="",this.trackColor="",this.disabled=!1,this.liveUpdate=!1,this._debounceTimer=null}get _fillColor(){return this.color||"var(--slider-color)"}get _trackColor(){return this.trackColor||"var(--slider-track-color)"}get _percentage(){const t=this.max-this.min;return 0===t?0:(this.value-this.min)/t*100}render(){const t=this._percentage,e=`linear-gradient(to right, ${this._fillColor} ${t}%, ${this._trackColor} ${t}%)`;return L`
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
    `}_onInput(t){const e=parseFloat(t.target.value);this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(e)},100))}_onChange(t){clearTimeout(this._debounceTimer);const e=parseFloat(t.target.value);this._fireValueChanged(e)}_fireValueChanged(t){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",lt);const dt=t=>class extends t{_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config?.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"perform-action":case"call-service":{const e=t.perform_action||t.service||"",[i,o]=e.split(".",2);i&&o&&this.hass.callService(i,o,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config?.entity}}))}}_capitalize(t){return t&&"string"==typeof t?t.charAt(0).toUpperCase()+t.slice(1):t}_isTemplate(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}_resolveField(t,e){const i=this.config?.[t];this._isTemplate(i)&&this._renderTemplate(i).then(t=>{if(!this.isConnected)return;const i="string"==typeof t?t.trim():t;i!==this[e]&&(this[e]=i)})}async _renderTemplate(t){if(!t||"string"!=typeof t)return t;if(!t.includes("{{")&&!t.includes("{%"))return t;try{const e=await this.hass.callApi("POST","template",{template:t});return"string"==typeof e?e.trim():String(e).trim()}catch{return t}}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_isUnavailable(t){return!t||"unavailable"===t.state}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}},ht=n`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`,pt=n`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(80%);
  }
`,ut=n`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
  }
`,mt=n`
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
    font-size: 11px;
    font-weight: 500;
    opacity: 0.6;
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
`,gt=n`
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
`;const _t=n`
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
    gap: 4px;
    margin-right: 8px;
    position: relative;
    z-index: 3;
  }

  .sub-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .sub-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .sub-btn:active {
    opacity: 0.7;
  }
`,ft=t=>t.label??t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase());class vt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[]}render(){return this.hass&&this._config?L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${ft}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:L``}_valueChanged(t){this._config=t.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}}customElements.define("materia-card-editor",class extends vt{static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e}}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"subtitle",selector:{template:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"show_slider",selector:{boolean:{}}},{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}},{name:"show_sub_buttons",selector:{boolean:{}}},{name:"show_stop",selector:{boolean:{}}},{name:"color",selector:{template:{}}},{name:"color_on",selector:{template:{}}},{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}});const bt={light:{showSlider:!0,activeState:"on",colorActive:"var(--md-sys-cust-color-light-container)",colorOn:"var(--md-sys-cust-color-on-light)",sliderColor:"var(--md-sys-cust-color-light)"},cover:{showSlider:!0,showSubButtons:!0,activeState:"open",colorActive:"var(--md-sys-cust-color-device-container)",colorOn:"var(--md-sys-cust-color-on-device)",sliderColor:"var(--md-sys-cust-color-device)"},switch:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},fan:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},lock:{activeState:"locked",colorActive:"var(--md-sys-cust-color-device-container)",colorOn:"var(--md-sys-cust-color-on-device)"},vacuum:{activeState:"cleaning",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},climate:{activeState:"heat",colorActive:"var(--md-sys-cust-color-climate-heat-container)",colorOn:"var(--md-sys-cust-color-on-climate-heat)"},media_player:{activeState:"playing",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},scene:{variant:"tonal",activeState:"__never__"},input_boolean:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},alarm_control_panel:{activeState:"armed_away",colorActive:"var(--md-sys-color-error-container)",colorOn:"var(--md-sys-color-on-error-container)"}},yt={activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"};class xt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0}};static getConfigElement(){return document.createElement("materia-card-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}get _domain(){return this.config.entity?.split(".")[0]||""}get _domainConfig(){return bt[this._domain]||yt}get _stateObj(){return this.hass?.states?.[this.config.entity]}get _isActive(){const t=this._stateObj?.state,e=this.config.active_state||this._domainConfig.activeState;return"__never__"!==e&&t===e}get _variant(){return this._domainConfig.variant||"filled"}get _isTonal(){return"tonal"===this._variant}get _isDimmable(){if("light"!==this._domain)return!1;const t=this._stateObj?.attributes;if(!t)return!1;return!!(t.supported_color_modes||[]).some(t=>"onoff"!==t)||void 0!==t.brightness}get _showSlider(){return!this._isTonal&&(void 0!==this.config.show_slider?this.config.show_slider:"light"===this._domain?this._isDimmable:"cover"===this._domain||(this._domainConfig.showSlider||!1))}get _showSubButtons(){return void 0!==this.config.show_sub_buttons?this.config.show_sub_buttons:this._domainConfig.showSubButtons||!1}get _showStop(){return void 0===this.config.show_stop||this.config.show_stop}get _fillPercent(){const t=this._stateObj;if(!t)return 0;if("light"===this._domain){const e=t.attributes?.brightness??0;return Math.round(e/255*100)}return"cover"===this._domain?t.attributes?.current_position??0:0}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:this._stateObj?.attributes?.friendly_name||this.config.entity}get _icon(){return this.config.icon?this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon:"lock"===this._domain?this._isActive?"m3o:lock":"m3o:lock-open-right":void 0}get _subtitle(){const t=this.config.subtitle;return t?this._isTemplate(t)?this._resolvedSubtitle:t:""}get _stateDisplay(){const t=this._stateObj;if(!t)return"";const e=this._domain;if("scene"===e)return"";if("light"===e){if("on"!==t.state)return this._capitalize("Off");if(this._isDimmable){return`${Math.round((t.attributes?.brightness??0)/255*100)}%`}return this._capitalize("On")}if("cover"===e){const e=t.attributes?.current_position;return 0===e||"closed"===t.state?this._capitalize("Closed"):100===e?this._capitalize("Open"):null!=e?`${e}% ${this._capitalize("open")}`:this._capitalize(t.state)}return"lock"===e?"locked"===t.state?this._capitalize("Locked"):this._capitalize("Unlocked"):this._capitalize(t.state)}_getContainerBg(){if(this._isTonal)return"var(--md-sys-color-secondary-container)";const t=this._resolvedColor||this.config.color;return this._isActive?t||("light"!==this._domain||this._isDimmable?this._domainConfig.colorActive:this._domainConfig.sliderColor||this._domainConfig.colorActive):"var(--ha-card-background, var(--card-background-color))"}_getTextColor(){if(this._isTonal)return"var(--md-sys-color-on-secondary-container)";const t=this._resolvedColorOn||this.config.color_on;return this._isActive?t||this._domainConfig.colorOn:"var(--primary-text-color)"}get _templatesReady(){const t=this.config;return(!this._isTemplate(t?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t?.name)||void 0!==this._resolvedName)))}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSlider()}_getContainer(){return this.shadowRoot?.querySelector(".container")}_getEventX(t){return void 0!==t.clientX&&0!==t.clientX?t.clientX:t.changedTouches?.[0]?t.changedTouches[0].clientX:t.touches?.[0]?t.touches[0].clientX:t.clientX||0}_getSliderRect(){const t=this._sliderFrameId||0;if(this._sliderRectCache&&this._sliderRectCacheFrame===t)return this._sliderRectCache;const e=this._getContainer()?.getBoundingClientRect();return this._sliderRectCache=e,this._sliderRectCacheFrame=t,this._sliderFrameRaf||(this._sliderFrameRaf=requestAnimationFrame(()=>{this._sliderFrameId=(this._sliderFrameId||0)+1,this._sliderFrameRaf=null})),e}_pctFromPointer(t){const e=this._getSliderRect();if(!e)return 0;const i=this._getEventX(t);return Math.max(0,Math.min(100,(i-e.left)/e.width*100))}_updateFillVisual(t){const e=this.shadowRoot?.querySelector(".fill");e&&(e.style.width=`${t}%`)}_onPointerDown(t){t.button&&0!==t.button||t.isPrimary&&(t.target.closest("button, .sub-btn")||"touch"===t.pointerType&&t.clientX<=30||(this._startX=t.clientX,this._startY=t.clientY,this._dragging=!1,this._scrollIntent=!1,this._pointerId=t.pointerId,this._sliderRectCache=null,this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),this._longPressTimer=setTimeout(()=>{this._longPressTimer=null,this._scrollIntent||this._startDrag(t)},200),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)))}_onEarlyMove(t){if(this._dragging||this._scrollIntent)return;const e=Math.abs(t.clientX-this._startX),i=Math.abs(t.clientY-this._startY);if(i>10&&i>e+4)return this._scrollIntent=!0,void this._abortSlider();e>6&&e>=i&&(clearTimeout(this._longPressTimer),this._longPressTimer=null,this._startDrag(t))}_startDrag(t){if(this._dragging)return;this._dragging=!0,this._dragStartTime=Date.now(),this._sliderRectCache=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null);const e=this._getContainer();try{e?.setPointerCapture(this._pointerId)}catch(t){}e?.classList.add("is-dragging"),document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),this._onDragMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onDragMoveRef),e&&e.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._cleanupSlider()},document.addEventListener("visibilitychange",this._onVisibilityRef);const i=this._pctFromPointer(t);this._updateFillVisual(i),this._throttledSetValue(i)}_preventTouch(t){t.preventDefault()}_onDragMove(t){"touch"===t.pointerType&&t.preventDefault();const e=this._pctFromPointer(t);this._updateFillVisual(e),this._throttledSetValue(e)}_onPointerUp(t){if(null!=this._startX&&!("pointercancel"===t.type&&this._dragStartTime&&Date.now()-this._dragStartTime<150)){if(this._dragging){const e=this._pctFromPointer(t);this._updateFillVisual(e),this._setSliderValue(e)}else this._scrollIntent||this._handleTap();this._cleanupSlider()}}_abortSlider(){clearTimeout(this._longPressTimer),this._longPressTimer=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_cleanupSlider(){this._abortSlider(),this._startX=null,this._dragging=!1,this._scrollIntent=!1,this._dragStartTime=null,this._sliderRectCache=null,this._throttleTimeout&&(clearTimeout(this._throttleTimeout),this._throttleTimeout=null);const t=this._getContainer();t?.classList.remove("is-dragging"),document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),t&&t.removeEventListener("touchmove",this._preventTouch);try{t?.releasePointerCapture(this._pointerId)}catch(t){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onDragMoveRef&&(window.removeEventListener("pointermove",this._onDragMoveRef),this._onDragMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_throttledSetValue(t){const e=Date.now();if(this._lastSliderArgs=t,this._throttleTimeout)return;e-(this._lastSliderCall||0)>=200?(this._lastSliderCall=e,this._setSliderValue(t)):this._throttleTimeout=setTimeout(()=>{this._throttleTimeout=null,this._lastSliderCall=Date.now(),this._setSliderValue(this._lastSliderArgs)},200)}_setSliderValue(t){if(!this.hass)return;const e=this.config.entity;if("light"===this._domain){let i=t;!this.config.slider_turn_off&&i<1&&(i=1);const o=Math.round(i/100*255);return void(o<=3&&this.config.slider_turn_off?this.hass.callService("light","turn_off",{entity_id:e}):this.hass.callService("light","turn_on",{entity_id:e,brightness:Math.max(o,1)}))}"cover"!==this._domain||this.hass.callService("cover","set_cover_position",{entity_id:e,position:Math.max(0,Math.min(100,Math.round(t)))})}_openCover(t){t.stopPropagation(),this.hass.callService("cover","open_cover",{entity_id:this.config.entity})}_stopCover(t){t.stopPropagation(),this.hass.callService("cover","stop_cover",{entity_id:this.config.entity})}_closeCover(t){t.stopPropagation(),this.hass.callService("cover","close_cover",{entity_id:this.config.entity})}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity})}render(){if(!this.config||!this.hass)return L``;const t=this._stateObj,e=this._isUnavailable(t),i=!e&&this._isActive;this._isTonal;const o=!e&&this._showSlider,s=!e&&this._showSubButtons,n=this._showStop,a=this._getContainerBg(),r=this._getTextColor(),c=o&&i?this._fillPercent:0,l=this._domainConfig.sliderColor||this._domainConfig.colorActive,d=this._icon,h=e?"Unavailable":this._stateDisplay;return L`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${o?"slider-active":""}"
          style="background-color: ${a}; color: ${r};"
          @pointerdown=${o?this._onPointerDown:void 0}
          @click=${o?void 0:()=>this._handleTap()}
        >
          ${o?L`
                <div
                  class="fill"
                  style="width: ${c}%; background-color: ${l}; opacity: 1;"
                ></div>
              `:""}

          <div class="icon-container">
            ${d?L`<ha-icon .icon=${d} style="color: ${r};"></ha-icon>`:L`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                  style="color: ${r};"
                ></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${this._subtitle?L`<div class="subtitle">${this._subtitle}</div>`:""}
            ${h?L`<div class="state">${h}</div>`:""}
          </div>

          ${this._hasNavigateAction?L`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}

          ${s?L`
                <div class="sub-buttons">
                  <button class="sub-btn" @click=${this._openCover}>
                    <ha-icon icon="mdi:arrow-up"></ha-icon>
                  </button>
                  ${n?L`
                        <button class="sub-btn" @click=${this._stopCover}>
                          <ha-icon icon="mdi:stop"></ha-icon>
                        </button>
                      `:V}
                  <button class="sub-btn" @click=${this._closeCover}>
                    <ha-icon icon="mdi:arrow-down"></ha-icon>
                  </button>
                </div>
              `:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[ut,ht,mt,gt,pt,_t]}customElements.define("materia-card",xt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-card",name:"Materia Card",description:"Universal entity card. Auto-detects lights, covers, devices, locks, and scenes.",preview:!0});const wt=n`
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
`;class $t extends at{static properties={hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_selectedCard:{state:!0}};static styles=n`
    :host { display: block; }

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
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
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
  `;setConfig(t){this._config=t,this._selectedCard=-1}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"columns",selector:{number:{min:1,max:6}}},{name:"color_on",selector:{template:{}}}]}render(){if(!this.hass||!this._config)return L``;const t=this._config.cards||[],e=t.length,i=this._selectedCard,o=i===e,s=i>=0&&i<e;return L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${ft}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="toolbar">
        <div class="tabs">
          ${t.map((t,e)=>L`
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
        ${o?L`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `:s?L`
              <div class="card-actions">
                <ha-icon-button
                  ?disabled=${0===i}
                  @click=${()=>this._moveCard(-1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  ?disabled=${i===e-1}
                  @click=${()=>this._moveCard(1)}
                >
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
    `}_valueChanged(t){this._fireConfig({...this._config,...t.detail.value})}_handleCardPicked(t){t.stopPropagation();const e=[...this._config.cards||[],t.detail.config];this._selectedCard=e.length-1,this._fireConfig({...this._config,cards:e})}_handleChildChanged(t){if(t.stopPropagation(),t.detail.error)return;const e=[...this._config.cards||[]];e[this._selectedCard]=t.detail.config,this._fireConfig({...this._config,cards:e})}_moveCard(t){const e=[...this._config.cards||[]],i=this._selectedCard,o=i+t;if(o<0||o>=e.length)return;const[s]=e.splice(i,1);e.splice(o,0,s),this._selectedCard=o,this._fireConfig({...this._config,cards:e})}_removeCard(){const t=[...this._config.cards||[]];t.splice(this._selectedCard,1),this._selectedCard=Math.max(0,Math.min(this._selectedCard,t.length-1)),0===t.length&&(this._selectedCard=-1),this._fireConfig({...this._config,cards:t})}_fireConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-room-editor",$t);class Ct extends xt{static properties={...xt.properties,_expanded:{state:!0},_childCards:{state:!0}};static styles=[ut,ht,mt,gt,pt,_t,wt];static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("light."))||"light.example";return{entity:e,columns:2,cards:[]}}constructor(){super(),this._expanded=!1,this._childCards=null}setConfig(t){if(!t.entity)throw new Error("entity is required");const e=this.config?.cards;this.config={columns:2,...t};const i=this.config.cards;JSON.stringify(e)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}firstUpdated(){this._createChildCards()}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&this._childCards&&this._childCards.forEach(t=>t.hass=this.hass)}async _createChildCards(){const t=this.config?.cards;if(!t||0===t.length)return void(this._childCards=[]);const e=await async function(){return ct||(ct=await window.loadCardHelpers(),ct)}();this._childCards=await Promise.all(t.map(async t=>{const i=await e.createCardElement(t);return this.hass&&(i.hass=this.hass),i})),this.requestUpdate()}_toggleExpand(t){t?.stopPropagation?.(),this._expanded=!this._expanded}render(){if(!this.config||!this.hass)return L``;const t=this._stateObj,e=this._isUnavailable(t),i=!e&&this._isActive,o=!e&&this._showSlider,s=this._getContainerBg(),n=this._getTextColor(),a=o&&i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,c=this._icon,l=e?"Unavailable":this._stateDisplay,d=this.config.columns||2;return L`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${o?"slider-active":""}"
          style="background-color: ${s}; color: ${n};"
          @pointerdown=${o?this._onPointerDown:void 0}
          @click=${o?void 0:()=>this._handleTap()}
        >
          ${o?L`<div class="fill" style="width: ${a}%; background-color: ${r}; opacity: 1;"></div>`:V}

          <div class="icon-container">
            ${c?L`<ha-icon .icon=${c} style="color: ${n};"></ha-icon>`:L`<ha-state-icon .hass=${this.hass} .stateObj=${t} style="color: ${n};"></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${l?L`<div class="state">${l}</div>`:V}
          </div>

          <div class="sub-buttons">
            <button class="sub-btn" @click=${this._toggleExpand}>
              <ha-icon icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>

      <div class="collapsible ${this._expanded?"expanded":""}">
        <div class="collapsible-inner">
          <div class="grid" style="--room-columns: ${d}">
            ${this._childCards?.map(t=>L`<div class="grid-item">${t}</div>`)}
          </div>
        </div>
      </div>
    `}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}}customElements.define("materia-room",Ct),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"Materia card with expandable child-card grid.",preview:!0});const kt=n`
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
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
`;customElements.define("materia-climate-editor",class extends vt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,selector:{text:{}}},{name:"temperature_entity",label:"Temperature sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",label:"Outdoor temperature sensor",selector:{entity:{domain:"sensor"}}},{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}});class At extends(dt(at)){static get properties(){return{hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_resolvedName:{state:!0}}}static styles=[ut,pt,kt];static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("climate."))||"climate.example";return{entity:e,name:"Climate",step:.5}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this.config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this.config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return null!=this._optimisticTemp?this._optimisticTemp:this._entity?.attributes?.temperature}get _currentTemp(){return this.config.temperature_entity?this.hass?.states[this.config.temperature_entity]?.state:this._entity?.attributes?.current_temperature}get _humidity(){if(this.config.humidity_entity)return this.hass?.states[this.config.humidity_entity]?.state}get _outdoorTemp(){if(this.config.outdoor_temp_entity)return this.hass?.states[this.config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--md-sys-color-on-surface-variant)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"rgba(68,68,68,0.7)"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-surface-variant-light, #45464f)"}}_statusText(){const t=this._mode,e=this._currentTemp,i=this._humidity,o=this._outdoorTemp,s=[];return"off"===t?(null!=o&&s.push(`${o}°`),null!=i&&s.push(`${i}%`),s.join(" · ")||""):(null!=e&&s.push(`${e}°`),null!=i&&s.push(`${i}%`),null!=o&&s.push(`${o}°`),s.join(" · ")||"")}_adjustTemp(t){const e=this._targetTemp;if(null==e)return;const i=e+t;this._optimisticTemp=i,this.hass.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:i}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4)}updated(t){if(t.has("hass")&&this.hass&&this._resolveField("name","_resolvedName"),t.has("hass")&&null!=this._optimisticTemp){const t=this._entity?.attributes?.temperature;t===this._optimisticTemp&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer)}_handleTap(t){if(t.target.closest(".btn"))return;if("more-info"===(this.config.tap_action??{action:"more-info"}).action){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});return t.detail={entityId:this.config.entity},void this.dispatchEvent(t)}const e=new Event("hass-action",{bubbles:!0,composed:!0});e.detail={config:this.config,action:"tap"},this.dispatchEvent(e)}render(){if(!this.hass||!this.config)return L``;const t=this._entity,e=this._isUnavailable(t),i="off"===this._mode||e,o=e?"Unavailable":i?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return L`
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
        </div>

        <div class="center">
          <div class="center-side">
            ${i?V:L`
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
            ${i?V:L`
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
    `}}customElements.define("materia-climate",At),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"Climate thermostat with mode-based theming and temperature controls.",preview:!0});const Et=[ut,ht,pt,n`
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
`];customElements.define("materia-weather-editor",class extends vt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}},{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}});const St={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"};class Tt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("weather."))||"";return{entity:e}}static styles=Et;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}updated(t){t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}render(){if(!this.hass||!this.config)return L``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",o=t?.attributes?.temperature,s=t?.attributes?.temperature_unit||"°",n=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||St[i]||"mdi:weather-partly-cloudy";let a=null;if(this.config.humidity_entity){const t=this.hass.states[this.config.humidity_entity];t&&(a=t.state)}null==a&&null!=t?.attributes?.humidity&&(a=t.attributes.humidity);const r=i.replace(/-|_/g," "),c=e?"Unavailable":(this._isTemplate(this.config.name)?this._resolvedName:this.config.name)||(null!=o?`${o}${s}`:"—"),l=e?"":null!=a?`${this._capitalize(r)} · ${a}%`:this._capitalize(r);return L`
      <ha-card>
        <div
          class="container ${e?"unavailable":""}"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${c}</div>
            <div class="state">${l}</div>
          </div>
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-weather",Tt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather condition card with automatic icon mapping.",preview:!0});const Ut=[ut,ht,n`
    ha-card {
      padding: 0;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    ha-icon {
      --mdc-icon-size: 24px;
    }

    ha-card.size-default { width: 48px; height: 48px; }
    ha-card.size-large   { width: 56px; height: 56px; }

    ha-card.standard {
      background: transparent;
      box-shadow: none;
      border: none;
      color: var(--primary-text-color);
    }

    ha-card.outlined {
      background: transparent;
      box-shadow: none;
      border: 1px solid var(--md-sys-color-outline);
      color: var(--primary-text-color);
    }

    ha-card.filled {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      box-shadow: none;
      border: none;
    }

    ha-card.filled-tonal {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      box-shadow: none;
      border: none;
    }

    ha-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    ha-card:hover::before  { opacity: 0.08; }
    ha-card:active::before { opacity: 0.12; }

    ha-card.disabled {
      opacity: 0.38;
      pointer-events: none;
    }
  `];class zt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=n`
    :host { display: block; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .mapping-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .mapping-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
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
  `;setConfig(t){this._config=t}_isTemplate(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}get _schema(){return[this._isTemplate(this._config?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"variant",selector:{select:{options:[{value:"standard",label:"Standard"},{value:"outlined",label:"Outlined"},{value:"filled",label:"Filled"},{value:"filled-tonal",label:"Filled Tonal"}]}}},{name:"size",selector:{select:{options:[{value:"default",label:"Default (48px)"},{value:"large",label:"Large (56px)"}]}}},{name:"entity",selector:{entity:{}}},{name:"disabled",selector:{template:{}}},{name:"tap_action",label:"Default action",selector:{ui_action:{}}}]}get _mappingSchema(){return[{name:"state",required:!0,selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}get _stateMappings(){const t=this._config.tap_action_map||{};return Object.keys(t).map(e=>({state:e,tap_action:t[e]}))}_expanded=null;render(){if(!this.hass||!this._config)return L``;const t=this._stateMappings;return L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${ft}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-header">
        <span>Action mappings</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${t.map((t,e)=>L`
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
            ${this._expanded===e?L`
                  <div class="mapping-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._mappingSchema}
                      .computeLabel=${ft}
                      @value-changed=${t=>this._updateMapping(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}_toggleExpand(t){this._expanded=this._expanded===t?null:t,this.requestUpdate()}_valueChanged(t){const e={...this._config,...t.detail.value};this._fireConfig(e)}_addMapping(){const t=[...this._stateMappings,{state:""}];this._applyMappings(t),this._expanded=t.length-1}_removeMapping(t){const e=[...this._stateMappings];e.splice(t,1),this._applyMappings(e),this._expanded===t&&(this._expanded=null)}_updateMapping(t,e){const i=[...this._stateMappings];i[t]={...i[t],...e},this._applyMappings(i)}_applyMappings(t){const{tap_action_map:e,...i}=this._config,o={};for(const e of t)e.state&&e.tap_action&&(o[e.state]=e.tap_action);const s=Object.keys(o).length?{...i,tap_action_map:o}:i;this._fireConfig(s)}_fireConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-icon-button-editor",zt);class Ot extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedDisabled:{state:!0}};static getConfigElement(){return document.createElement("materia-icon-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"default"}}static styles=[pt,Ut];setConfig(t){if(!t.icon)throw new Error("icon is required");this.config={variant:"filled",size:"default",...t}}get _disabled(){const t=this.config?.disabled;if(null==t)return!1;if("boolean"==typeof t)return t;if(this._isTemplate(t)){const t=this._resolvedDisabled;return"True"===t||"true"===t||"1"===t}return"true"===t||"True"===t}updated(t){t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("disabled","_resolvedDisabled"))}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}render(){if(!this.config)return L``;const t=this.config.entity?this.hass?.states?.[this.config.entity]:void 0,e=!!this.config.entity&&this._isUnavailable(t),i=this._disabled,o=this.config.variant||"filled",s="large"===this.config.size?"large":"default",n=this._isTemplate(this.config.icon)?this._resolvedIcon||"mdi:circle-small":this.config.icon;return L`
      <ha-card
        class="${o} size-${s} ${e?"unavailable":""} ${i?"disabled":""}"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${n}></ha-icon>
      </ha-card>
    `}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const t=this.hass?.states[this.config.entity]?.state,e=this.config.tap_action_map[t]??this.config.tap_action_map.default;if(e)return e}return this.config.tap_action||this._defaultTapAction()}_handleTap(){this._disabled||this._handleAction(this._resolveTapAction())}getCardSize(){return 1}}customElements.define("materia-icon-button",Ot),window.customCards=window.customCards||[],window.customCards.push({type:"materia-icon-button",name:"Materia Icon Button",description:"M3 icon button with variants and state-based icons.",preview:!0});class Mt extends at{static properties={hass:{attribute:!1},_config:{state:!0},_expandedButton:{state:!0}};static styles=n`
    :host { display: block; }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0 8px;
      font-weight: 600;
      font-size: 14px;
    }

    .button-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }

    .button-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
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
  `;setConfig(t){this._config=t,this._expandedButton=null}_isTemplate(t){return t&&"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}get _rowSchema(){return[{name:"gap",label:"Gap between buttons",selector:{number:{min:0,max:64,step:4,unit_of_measurement:"px",mode:"slider"}}},{name:"padding",label:"Vertical padding",selector:{number:{min:0,max:48,step:4,unit_of_measurement:"px",mode:"slider"}}}]}_buttonSchema(t){return[this._isTemplate(t?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"variant",selector:{select:{options:[{value:"standard",label:"Standard"},{value:"outlined",label:"Outlined"},{value:"filled",label:"Filled"},{value:"filled-tonal",label:"Filled Tonal"}]}}},{name:"size",selector:{select:{options:[{value:"default",label:"Default (48px)"},{value:"large",label:"Large (56px)"}]}}},{name:"entity",selector:{entity:{}}},{name:"disabled",selector:{template:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}render(){if(!this.hass||!this._config)return L``;const t=this._config.buttons||[];return L`
      <ha-form
        .hass=${this.hass}
        .data=${{gap:8,padding:4,...this._config}}
        .schema=${this._rowSchema}
        .computeLabel=${ft}
        @value-changed=${this._rowChanged}
      ></ha-form>

      <div class="section-header">
        <span>Buttons</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${t.map((t,e)=>L`
        <div class="button-card">
          <div class="button-header" @click=${()=>this._toggleButton(e)}>
            <span>${t.icon&&!this._isTemplate(t.icon)?t.icon:`Button ${e+1}`}</span>
            <ha-icon-button @click=${t=>{t.stopPropagation(),this._toggleButton(e)}}>
              <ha-icon icon=${this._expandedButton===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${t=>{t.stopPropagation(),this._removeButton(e)}}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._expandedButton===e?L`
            <div class="button-body">
              <ha-form
                .hass=${this.hass}
                .data=${t}
                .schema=${this._buttonSchema(t)}
                .computeLabel=${ft}
                @value-changed=${t=>this._buttonChanged(e,t.detail.value)}
              ></ha-form>
            </div>
          `:""}
        </div>
      `)}
    `}_toggleButton(t){this._expandedButton=this._expandedButton===t?null:t}_rowChanged(t){const{buttons:e,...i}=this._config;this._fireConfig({...i,...t.detail.value,buttons:e})}_addButton(){const t=[...this._config.buttons||[],{icon:"mdi:star",variant:"filled",size:"default"}];this._fireConfig({...this._config,buttons:t}),this._expandedButton=t.length-1}_removeButton(t){const e=[...this._config.buttons||[]];e.splice(t,1),this._expandedButton===t&&(this._expandedButton=null),this._fireConfig({...this._config,buttons:e})}_buttonChanged(t,e){const i=[...this._config.buttons||[]];i[t]={...i[t],...e},this._fireConfig({...this._config,buttons:i})}_fireConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-icon-row-editor",Mt);class Ft extends at{static properties={hass:{attribute:!1},config:{state:!0}};static styles=[ut,n`
      .row {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `];static getConfigElement(){return document.createElement("materia-icon-row-editor")}static getStubConfig(){return{buttons:[{icon:"mdi:arrow-left",variant:"filled-tonal",size:"default"},{icon:"mdi:play",variant:"filled",size:"large"},{icon:"mdi:stop",variant:"filled",size:"large"},{icon:"mdi:arrow-right",variant:"filled-tonal",size:"default"}],gap:8,padding:4}}setConfig(t){if(!Array.isArray(t.buttons)||0===t.buttons.length)throw new Error("buttons array is required");this.config={gap:8,padding:4,...t}}getCardSize(){return 1}render(){if(!this.hass||!this.config)return L``;const t=this.config.gap??8,e=this.config.padding??4;return L`
      <div class="row" style="gap: ${t}px; padding: ${e}px 0;">
        ${this.config.buttons.map(t=>L`
          <materia-icon-button
            .hass=${this.hass}
            .config=${{variant:"filled",size:"default",...t}}
          ></materia-icon-button>
        `)}
      </div>
    `}}customElements.define("materia-icon-row",Ft),window.customCards=window.customCards||[],window.customCards.push({type:"materia-icon-row",name:"Materia Icon Row",description:"A centered row of icon buttons with configurable spacing.",preview:!0});const Pt={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-secondary)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-error)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]},Dt=[ut,n`
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
  `];class Rt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=n`
    :host { display: block; }
  `;setConfig(t){this._config=t}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"variant",selector:{select:{options:[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"battery",label:"Battery"}]}}},{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",selector:{template:{}}},{name:"color",selector:{template:{}}},{name:"color_on",selector:{template:{}}},{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}render(){return this.hass&&this._config?L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${ft}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:L``}_valueChanged(t){this._config={...this._config,...t.detail.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}}customElements.define("materia-badge-editor",Rt);class Nt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-badge-editor")}static getStubConfig(t){const e=(t?Object.keys(t.states):[]).find(t=>t.startsWith("light.")||t.startsWith("switch."))||"";return{name:"Badge",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on",entity:e}}static styles=[pt,Dt];setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("state_display","_resolvedStateDisplay"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state||"on";return e===String(i)||"open"===e}_getBatteryColors(t){const e=parseFloat(t?.state)||0;return e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--ha-card-background)","var(--primary-text-color)"]}get _templatesReady(){const t=this.config;return(!this._isTemplate(t.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t.state_display)||void 0!==this._resolvedStateDisplay)&&((!this._isTemplate(t.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t.name)||void 0!==this._resolvedName))))}render(){if(!this.hass||!this.config)return L``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=!!t&&this._isUnavailable(e),o=!i&&this._isActive(e),s=this.config.variant||"secondary",n=this.config.show_state;let a=this._resolvedColor||this.config.color,r=this._resolvedColorOn||this.config.color_on;const c=["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"];if(!a)if("battery"===s){const[t,i]=this._getBatteryColors(e);a=t,r=i}else if(c.includes(s)){const t=Pt[s]||Pt.secondary;a=t[0],r=r||t[1]}else if(o&&t){const t=Pt[s]||Pt.secondary;a=t[0],r=r||t[1]}else a="var(--ha-card-background)",r=r||"var(--primary-text-color)";r=r||"var(--primary-text-color)";const l=n?"with-state":"no-state",d=o?"active":"inactive";let h="";if(n&&i)h="Unavailable";else if(n&&e){const t=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));h=this._resolvedStateDisplay&&t?this._resolvedStateDisplay:this.config.state_display&&!t?this.config.state_display:e.state,h=this._capitalize(h)}return L`
      <div
        class="badge ${l} ${d} ${i?"unavailable":""}"
        style="background-color: ${a}; color: ${r};"
        @click=${this._handleTap}
        @dblclick=${this._handleDoubleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon} style="color: ${r};"></ha-icon>
        </div>
        <div class="name">${this._isTemplate(this.config.name)?this._resolvedName:this.config.name}</div>
        ${n?L`<div class="state">${h}</div>`:""}
      </div>
    `}_handleTap(){if(this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action){if(this._dblClickTimer)return;this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this.config.tap_action||{action:"toggle"})},250)}else this._handleAction(this.config.tap_action||{action:"toggle"})}_handleDoubleTap(){this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action&&(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,this._handleAction(this.config.double_tap_action))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._dblClickTimer),this._dblClickTimer=null}getCardSize(){return 2}}customElements.define("materia-badge",Nt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-badge",name:"Materia Badge",description:"Square badge for dashboard headers.",preview:!0});const jt={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},tertiary:{active:"var(--md-sys-color-tertiary)",onActive:"var(--md-sys-color-on-tertiary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat-container)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool-container)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto-container)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light-container)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device-container)",onActive:"var(--md-sys-cust-color-on-device)"}},Bt={xs:{height:32,innerCorner:4},s:{height:36,innerCorner:8},m:{height:40,innerCorner:8},l:{height:48,innerCorner:16},xl:{height:56,innerCorner:20}},It=[ut,ht,n`
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
      transition: background-color 0.2s ease, color 0.2s ease;
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
      transition: opacity 0.2s;
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
      transition: border-radius 0.2s ease, background-color 0.2s ease, color 0.2s ease;
    }

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `];class Lt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config={...t}}get _schema(){const t=[...Object.keys(jt).map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1).replace(/-/g," ")})),{value:"custom",label:"Custom"}],e=[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",label:"Color preset",selector:{select:{options:t,mode:"dropdown"}}},{name:"size",selector:{select:{options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (36dp)"},{value:"m",label:"M (40dp)"},{value:"l",label:"L (48dp)"},{value:"xl",label:"XL (56dp)"}],mode:"dropdown"}}},{name:"variant",label:"Style",selector:{select:{options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"}],mode:"dropdown"}}},{name:"multi_select",label:"Multi-select",selector:{boolean:{}}}];return this._config?.multi_select&&e.push({name:"columns",label:"Max columns",selector:{number:{min:1,max:8,mode:"box"}}}),"custom"===this._config?.preset&&e.push({name:"color_active",label:"Active color",selector:{template:{}}},{name:"color_on_active",label:"Active text color",selector:{template:{}}}),e}static styles=n`
    .options-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .option-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .option-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
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
  `;render(){return this.hass&&this._config?L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${ft}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options||[]).map((t,e)=>L`
          <div class="option-card">
            <div class="option-header">
              <span>${t.label||t.value||`Option ${e+1}`}</span>
              <ha-icon-button @click=${()=>this._moveOption(e,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._moveOption(e,1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._toggleExpand(e)}>
                <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeOption(e)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded===e?L`
                  <div class="option-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._optionSchema}
                      .computeLabel=${ft}
                      @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `:L``}_expanded=null;get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e};const o={...this._config,options:i};this._config=o,this._fireConfigChanged(o)}_toggleExpand(t){this._expanded=this._expanded===t?null:t,this.requestUpdate()}_valueChanged(t){const e={...this._config,...t.detail.value};this._config=e,this._fireConfigChanged(e)}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}],e={...this._config,options:t};this._config=e,this._expanded=t.length-1,this._fireConfigChanged(e)}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1);const i={...this._config,options:e};this._config=i,this._expanded===t&&(this._expanded=null),this._fireConfigChanged(i)}_moveOption(t,e){const i=[...this._config.options||[]],o=t+e;if(o<0||o>=i.length)return;[i[t],i[o]]=[i[o],i[t]];const s={...this._config,options:i};this._config=s,this._expanded===t&&(this._expanded=o),this._fireConfigChanged(s)}_updateOption(t,e,i){const o=[...this._config.options||[]];o[t]={...o[t],[e]:i};const s={...this._config,options:o};this._config=s,this._fireConfigChanged(s)}_fireConfigChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-button-group-editor",Lt);class qt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_optimisticValue:{state:!0},_resolvedColorActive:{state:!0},_resolvedColorOnActive:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_select.")||t.startsWith("select."))||"";return{entity:e,size:"m",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}]}}static styles=[pt,It];setConfig(t){this.config={size:"m",...t}}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const t=this.hass?.states[this.config.entity],e=this.config.entity?.split(".")[0];return"input_select"!==e&&"select"!==e||!t?.attributes?.options?[]:t.attributes.options.map(t=>({label:this._capitalize(t),value:t,tap_action:{action:"perform-action",perform_action:`${e}.select_option`,data:{option:t},target:{entity_id:this.config.entity}}}))}get _activeValue(){if(null!=this._optimisticValue)return this._optimisticValue;const t=this.hass?.states[this.config.entity];return this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):t?.state??""}_isOptionActive(t){if(this.config.multi_select){const e=this._activeValue.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);return e.includes(String(t.value).toLowerCase())}return String(t.value)===this._activeValue}_getActiveColors(){const t=this._resolvedColorActive||this.config.color_active,e=this._resolvedColorOnActive||this.config.color_on_active;return t&&e?{active:t,onActive:e}:this.config.preset&&jt[this.config.preset]?jt[this.config.preset]:jt.primary}render(){if(!this.hass||!this.config)return L``;const t=this.config.entity?this.hass.states[this.config.entity]:void 0,e=!!t&&this._isUnavailable(t),i=this.config.size||"m",{height:o,innerCorner:s}=Bt[i]||Bt.m,n=o/2;this._activeValue;const a=this._getActiveColors(),r=this._resolvedOptions,c=this.config.variant||"filled";if(!r.length)return L``;const l=this.config.multi_select,d=this.config.columns||0;return L`
      <ha-card>
        <div class="group ${e?"unavailable":""} ${l?"multi":""}"
          style="${l?`--btn-height: ${o}px;`:`height: ${o}px;`} ${d?`--btn-columns: ${d};`:""}">
          ${r.map((t,e)=>{const i=this._isOptionActive(t),o=0===e,h=e===r.length-1;let p;if(l)if(i)p=`${n}px`;else{const t=d||r.length,i=Math.floor(e/t),o=e%t,a=0===i,c=i===Math.ceil(r.length/t)-1,l=0===o,h=o===t-1||e===r.length-1;p=`${a&&l?n:s}px ${a&&h?n:s}px ${c&&h?n:s}px ${c&&l?n:s}px`}else{const t=i?`${n}px`:`${s}px`,e=`${n}px`;p=1===r.length?e:o?`${e} ${t} ${t} ${e}`:h?`${t} ${e} ${e} ${t}`:t}const u=i?a.active:void 0,m=i?a.onActive:void 0;return L`
              <button
                class="${i?"active":"inactive"} ${c}"
                style="border-radius: ${p};${i?` background: ${u}; color: ${m};`:""}"
                @click=${()=>this._handleOptionTap(t)}
              >
                ${t.icon?L`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                ${t.label?L`<span>${t.label}</span>`:""}
              </button>
            `})}
        </div>
      </ha-card>
    `}_handleOptionTap(t){this.config.multi_select||(this._optimisticValue=String(t.value),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)),t.tap_action?this._handleAction(t.tap_action):this.config.entity&&this._fireMoreInfo(this.config.entity)}updated(t){if(t.has("hass")&&this.hass&&(this._resolveField("color_active","_resolvedColorActive"),this._resolveField("color_on_active","_resolvedColorOnActive")),t.has("hass")&&null!=this._optimisticValue){const t=this.hass?.states[this.config.entity];(this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):t?.state??"")===this._optimisticValue&&(this._optimisticValue=null,clearTimeout(this._optimisticTimer))}}getCardSize(){return 1}}customElements.define("materia-button-group",qt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 connected button group with presets and sizes.",preview:!0});const Vt=[ut,n`
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
  `];customElements.define("materia-checkbox-editor",class extends vt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}},{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"tap_action_checked",label:"Action (checked)",selector:{ui_action:{}}},{name:"tap_action_unchecked",label:"Action (unchecked)",selector:{ui_action:{}}}]}});class Ht extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_boolean."))||"";return{entity:e,name:"Checkbox"}}static styles=[pt,Vt];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(this.config.checked_entity){const t=this.hass?.states[this.config.checked_entity];if(!t)return!1;const e=String(t.state??"").split(",").map(t=>t.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(t=>e.includes(t)):!!this.config.checked_value&&e.includes(this.config.checked_value)}if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}updated(t){t.has("hass")&&this.hass&&this._resolveField("name","_resolvedName")}render(){if(!this.hass||!this.config)return L``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=!e&&this._isChecked(t),o=this._isTemplate(this.config.name)?this._resolvedName:this.config.name??t?.attributes?.friendly_name??this.config.entity,s=i?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return L`
      <ha-card class="${e?"unavailable":""}" @click=${this._handleTap}>
        <div class="name">${o}</div>
        <div class="icon-cell">
          <ha-icon .icon=${s}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.hass?.states[this.config.entity],e=this._isChecked(t);let i;i=e&&this.config.tap_action_checked?this.config.tap_action_checked:!e&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",Ht),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Checkbox with custom checked state logic.",preview:!0});const Wt=[ut,ht,n`
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
  `];customElements.define("materia-pill-editor",class extends vt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"color",selector:{template:{}}},{name:"color_on",selector:{template:{}}},{name:"background",selector:{boolean:{}}},{name:"tap_action",selector:{ui_action:{}}}]}});class Xt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(t){const e=(t?Object.keys(t.states):[]).find(t=>t.startsWith("sensor."))||"";return{entity:e,name:"",icon:"mdi:information-outline"}}static styles=[pt,Wt];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...t}}_classify(t){const e=this.config.ranges||[];if(!e.length)return{label:"",color:""};const i=parseFloat(t);for(const t of e)if(null==t.max||i<=t.max)return{label:t.label,color:t.color};return{label:"",color:""}}get _templatesReady(){const t=this.config;return(!this._isTemplate(t?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(t?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(t?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(t?.name)||void 0!==this._resolvedName)))}updated(t){t.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}render(){if(!this.hass||!this.config)return L``;if(!this._templatesReady)return L``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||t?.attributes?.friendly_name||this.config.entity,o=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||t?.attributes?.icon||"",s=t?.attributes?.unit_of_measurement||"",n=t?.state??"",a=this.config.ranges||[],r=this._classify(n);let c;c=e?"Unavailable":a.length?s?`${n} · ${r.label||i}`:n:s?`${this._capitalize(n)} ${s}`:this._capitalize(n);const l=a.length?e?i:s||(r.label||i):"",d=n.toLowerCase(),h="on"===d||"true"===d||"home"===d||"open"===d||"cleaning"===d||"playing"===d||!isNaN(Number(d))&&Number(d)>0,p=this._resolvedColor||this.config.color,u=this._resolvedColorOn||this.config.color_on,m=h&&p?p:"var(--ha-card-background, var(--card-background-color))",g=h&&u?u:"var(--primary-text-color)",_=!1===this.config.background||"none"===this.config.background;return L`
      <ha-card>
        <div
          class="container ${e?"unavailable":""} ${_?"no-bg":""}"
          style="background-color: ${_?"transparent":m}; color: ${g};"
          @click=${this._handleTap}
        >
          ${o?L`
            <div class="icon-container">
              <ha-icon .icon=${o} style="color: ${g};"></ha-icon>
            </div>
          `:""}
          <div class="name-container">
            <div class="name">${a.length?c:i}</div>
            <div class="state">${a.length?l:c}</div>
          </div>
          ${this._hasNavigateAction?L`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",Xt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill for sensors, weather, and status indicators.",preview:!0});const Gt=[ut,ht,pt,n`
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

  .dropdown-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease;
    pointer-events: none;
  }

  .dropdown-wrapper.below {
    top: 100%;
  }

  .dropdown-wrapper.above {
    bottom: 100%;
  }

  .dropdown-wrapper.open {
    max-height: 600px;
    pointer-events: auto;
  }

  .dropdown {
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    padding: 8px;
    margin: 2px 0;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
                0px 2px 6px 2px rgba(0, 0, 0, 0.15);
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
    color: var(--primary-text-color);
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
    background: var(--md-sys-color-tertiary, var(--md-sys-color-secondary));
    color: var(--md-sys-color-on-tertiary, var(--md-sys-color-on-secondary));
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
`];class Jt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config={...t}}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"position",selector:{select:{options:[{value:"below",label:"Below"},{value:"above",label:"Above"}],mode:"dropdown"}}}]}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}static styles=n`
    .options-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .option-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .option-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
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
  `;_expanded=null;render(){return this.hass&&this._config?L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${ft}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options||[]).map((t,e)=>L`
          <div class="option-card">
            <div class="option-header">
              <span>${t.label||t.value||`Option ${e+1}`}</span>
              <ha-icon-button @click=${()=>this._moveOption(e,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._moveOption(e,1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._toggleExpand(e)}>
                <ha-icon icon=${this._expanded===e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeOption(e)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded===e?L`
                  <div class="option-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._optionSchema}
                      .computeLabel=${ft}
                      @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `:L``}_valueChanged(t){const e={...this._config,...t.detail.value};this._config=e,this._fireConfigChanged(e)}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}],e={...this._config,options:t};this._config=e,this._expanded=t.length-1,this._fireConfigChanged(e)}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1);const i={...this._config,options:e};this._config=i,this._expanded===t&&(this._expanded=null),this._fireConfigChanged(i)}_moveOption(t,e){const i=[...this._config.options||[]],o=t+e;if(o<0||o>=i.length)return;[i[t],i[o]]=[i[o],i[t]];const s={...this._config,options:i};this._config=s,this._expanded===t&&(this._expanded=o),this._fireConfigChanged(s)}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e};const o={...this._config,options:i};this._config=o,this._fireConfigChanged(o)}_toggleExpand(t){this._expanded=this._expanded===t?null:t,this.requestUpdate()}_fireConfigChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-menu-editor",Jt);class Yt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_optimisticValue:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static styles=Gt;static getConfigElement(){return document.createElement("materia-menu-editor")}static getStubConfig(t){const e=Object.keys(t?.states||{}).find(t=>t.startsWith("input_select.")||t.startsWith("select."))||"";return{entity:e}}setConfig(t){this.config={position:"below",...t},this._open=!1}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const t=this.hass?.states[this.config.entity],e=this.config.entity?.split(".")[0];return"input_select"!==e&&"select"!==e||!t?.attributes?.options?[]:t.attributes.options.map(t=>({label:this._capitalize(t),value:t}))}get _currentValue(){return null!=this._optimisticValue?this._optimisticValue:this.hass?.states[this.config.entity]?.state??""}_toggle(){this._open=!this._open}_selectOption(t){const e=t.value;this._optimisticValue=e,this._open=!1;const i=this.config.entity?.split(".")[0];"input_select"!==i&&"select"!==i||this.hass.callService(i,"select_option",{entity_id:this.config.entity,option:e}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=t=>{if(!this._open||!this.shadowRoot)return;const e=t.composedPath?.()?.[0];e&&!this.shadowRoot.contains(e)&&(this._open=!1)},document.addEventListener("click",this._outsideClickHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler),clearTimeout(this._optimisticTimer)}updated(t){if(t.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName")),t.has("hass")&&null!=this._optimisticValue){const t=this.hass?.states[this.config.entity]?.state;t===this._optimisticValue&&(this._optimisticValue=null,clearTimeout(this._optimisticTimer))}}render(){if(!this.hass||!this.config)return L``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this._resolvedOptions,o=this._currentValue,s=i.find(t=>t.value===o)?.label||this._capitalize(o),n=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||t?.attributes?.friendly_name||"";return L`
      <ha-card>
        <div class="trigger ${e?"unavailable":""} ${this._open?"above"===this.config.position?"open-above":"open-below":""}" @click=${this._toggle}>
          ${this.config.icon?L`
            <div class="icon-container">
              <ha-icon .icon=${this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon}></ha-icon>
            </div>
          `:""}
          <div class="text-container">
            ${n?L`<div class="label">${n}</div>`:""}
            <div class="value">${s}</div>
          </div>
          <div class="chevron-btn" @click=${t=>{t.stopPropagation(),this._toggle()}}>
            <ha-icon class="chevron" icon=${this._open?"m3of:arrow-drop-up":"m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
        <div class="dropdown-wrapper ${this._open?"open":""} ${"above"===this.config.position?"above":"below"}">
          <div class="dropdown">
            ${i.map(t=>L`
              <div
                class="menu-item ${t.value===o?"selected":""}"
                @click=${e=>{e.stopPropagation(),this._selectOption(t)}}
              >
                ${t.icon?L`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                <span class="item-text">${t.label||t.value}</span>
              </div>
            `)}
          </div>
        </div>
      </ha-card>
    `}getCardSize(){return this._open?3:1}}customElements.define("materia-menu",Yt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-menu",name:"Materia Menu",description:"M3 vertical dropdown menu for select entities.",preview:!0}),function(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}();console.info("%c MATERIA %c v0.4.0 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
