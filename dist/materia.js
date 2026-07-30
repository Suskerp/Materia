/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(s,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!r(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??v)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=e=>e,$=w.trustedTypes,C=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+E,z=`<${A}>`,M=document,T=()=>M.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,q="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,R=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,L=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),I=L(1),H=L(2),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,X=M.createTreeWalker(M,129);function Y(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",a=D;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===D?"!--"===l[1]?a=P:void 0!==l[1]?a=U:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=o??D,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?R:'"'===l[3]?j:N):a===j||a===N?a=R:a===P||a===U?a=D:(a=R,o=void 0);const h=a===R&&e[t+1].startsWith("/>")?" ":"";n+=a===D?i+z:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,r=this.parts,[l,c]=K(e,t);if(this.el=Z.createElement(l,i),X.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=X.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(S)){const t=c[n++],i=s.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?se:"@"===a[1]?oe:te}),s.removeAttribute(e)}else e.startsWith(E)&&(r.push({type:6,index:o}),s.removeAttribute(e));if(B.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],T()),X.nextNode(),r.push({type:2,index:++o});s.append(e[t],T())}}}else if(8===s.nodeType)if(s.data===A)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)r.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,s){if(t===V)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=F(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Q(e,o._$AS(e,t.values),o,s)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??M).importNode(t,!0);X.currentNode=s;let o=X.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new ee(o,o.nextSibling,this,e):1===r.type?t=new r.ctor(o,r.name,r.strings,this,e):6===r.type&&(t=new ne(o,this,e)),this._$AV.push(t),r=i[++a]}n!==r?.index&&(o=X.nextNode(),n++)}return X.currentNode=M,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),F(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new J(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Z(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new ee(this.O(T()),this.O(T()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=Q(this,e,t,0),n=!F(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const s=e;let a,r;for(e=o[0],a=0;a<o.length-1;a++)r=Q(this,s[i+a],t,a),r===V&&(r=this._$AH[a]),n||=!F(r)||r!==this._$AH[a],r===W?e=W:e!==W&&(e+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class oe extends te{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===V)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=w.litHtmlPolyfillSupport;ae?.(Z,ee),(w.litHtmlVersions??=[]).push("3.3.2");const re=(e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new ee(t.insertBefore(T(),e),e,void 0,i??{})}return o._$AI(e),o
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},le=globalThis;let ce=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;let he;async function pe(){return he||(he=await window.loadCardHelpers(),he)}de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2"),n`
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
`;class ue extends ce{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"}};static styles=n`
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
  `;constructor(){super(),this.min=0,this.max=100,this.value=0,this.step=1,this.color="",this.trackColor="",this.disabled=!1,this.liveUpdate=!1,this._debounceTimer=null}get _fillColor(){return this.color||"var(--slider-color)"}get _trackColor(){return this.trackColor||"var(--slider-track-color)"}get _percentage(){const e=this.max-this.min;return 0===e?0:(this.value-this.min)/e*100}render(){const e=this._percentage,t=`linear-gradient(to right, ${this._fillColor} ${e}%, ${this._trackColor} ${e}%)`;return I`
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
            background: ${t};
          "
          @input=${this._onInput}
          @change=${this._onChange}
        />
      </div>
    `}_onInput(e){const t=parseFloat(e.target.value);this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(t)},100))}_onChange(e){clearTimeout(this._debounceTimer);const t=parseFloat(e.target.value);this._fireValueChanged(t)}_fireValueChanged(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",ue);const me={ms:342,easing:"linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1)"},ge=n`
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
`,fe=H`<path
  d="M4 12h13M11 6l6 6-6 6"
  fill="none"
  stroke="currentColor"
  stroke-width="2.4"
  stroke-linecap="round"
  stroke-linejoin="round"
/>`;class _e extends ce{static properties={gesture:{type:String,reflect:!0},label:{type:String},icon:{type:String},direction:{type:String},pending:{type:Boolean,reflect:!0},threshold:{type:Number},holdMs:{type:Number,attribute:"hold-ms"},disabled:{type:Boolean,reflect:!0},_p:{state:!0},_armed:{state:!0}};static styles=[ge,n`
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

      /* BUSY, per the spec's vocabulary. M3's interaction states define no
         "busy": a control that cannot accept input takes the DISABLED treatment
         — content at the 38% disabled-content opacity — so the track and its
         status line dim to exactly that, and the cursor stops advertising a
         grab. What disabled alone would get wrong is that the machine IS
         working, and the progress-indicator guidance says an indeterminate wait
         shows live activity — so the HANDLE is exempt from the dim and breathes
         at full strength. Disabled surface + live handle reads as intended:
         you cannot act, because it is acting. */
      :host([pending]) .track {
        cursor: default;
      }

      :host([pending]) .label {
        opacity: 0.38;
      }

      :host([pending]) .handle {
        animation: mdc-breathe 2s ease-in-out infinite alternate;
      }

      /* Hold mode has no handle, so the in-flight label carries the pulse. */
      :host([pending][gesture="hold"]) .label {
        animation: mdc-label-breathe 2s ease-in-out infinite alternate;
      }

      @keyframes mdc-breathe {
        to {
          scale: 1.05;
        }
      }

      @keyframes mdc-label-breathe {
        from {
          opacity: 0.6;
        }
        to {
          opacity: 1;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([pending]) .handle,
        :host([pending][gesture="hold"]) .label {
          animation: none;
        }
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
    `];constructor(){super(),this.gesture="slide",this.label="",this.icon="",this.direction="forward",this.threshold=.55,this.holdMs=800,this.disabled=!1,this.pending=!1,this._p=0,this._armed=!1,this._settling=!1,this._travel=0}disconnectedCallback(){super.disconnectedCallback(),this._cleanup()}willUpdate(e){e.has("pending")&&void 0!==e.get("pending")&&(this.pending?(this._p=1,this._settling=!0):e.has("direction")||(this._p=0,this._settling=!0)),e.has("direction")&&void 0!==e.get("direction")&&(this._p=0,this._settling=!1)}_measure(){const e=this._rect();this._travel=e?Math.max(0,e.width-e.height):0}_rect(){const e=this._frameId||0;return this._rectCache&&this._rectCacheFrame===e||(this._rectCache=this.shadowRoot?.querySelector(".track")?.getBoundingClientRect(),this._rectCacheFrame=e,this._frameRaf||(this._frameRaf=requestAnimationFrame(()=>{this._frameId=(this._frameId||0)+1,this._frameRaf=null}))),this._rectCache}_eventX(e){return void 0!==e.clientX&&0!==e.clientX?e.clientX:e.changedTouches?.[0]?e.changedTouches[0].clientX:e.touches?.[0]?e.touches[0].clientX:e.clientX||0}_haptic(e){this.dispatchEvent(new CustomEvent("haptic",{detail:e,bubbles:!0,composed:!0}))}_onPointerDown(e){this.disabled||this.pending||e.button&&0!==e.button||e.isPrimary&&("touch"===e.pointerType&&e.clientX<=30||(this._startX=e.clientX,this._startY=e.clientY,this._pointerId=e.pointerId,this._rectCache=null,this._scrollIntent=!1,this._measure(),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef),this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),"hold"===this.gesture&&this._engage(e)))}_onEarlyMove(e){if(this._scrollIntent)return;const t=Math.abs(e.clientX-this._startX),i=Math.abs(e.clientY-this._startY);if(i>10&&i>t+4)return this._scrollIntent=!0,"hold"===this.gesture&&this._release(!1),void this._dropEarlyMove();"hold"!==this.gesture&&t>6&&t>=i&&(this._dropEarlyMove(),this._engage(e))}_dropEarlyMove(){this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_engage(e){if(this._armed)return;this._armed=!0,this._settling=!1,this._engagedAt=Date.now(),this._grabX=this._eventX(e),this._grabP=this._p;const t=this.shadowRoot?.querySelector(".track");try{t?.setPointerCapture(this._pointerId)}catch(e){}document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),t?.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._release(!1)},document.addEventListener("visibilitychange",this._onVisibilityRef),"hold"===this.gesture?(this._tick=this._tick.bind(this),this._raf=requestAnimationFrame(this._tick)):(this._onMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onMoveRef))}_preventTouch(e){e.preventDefault()}_tick(){if(!this._armed)return;const e=Math.min(1,(Date.now()-this._engagedAt)/Math.max(1,this.holdMs));this._p=e,e>=1?this._commit():this._raf=requestAnimationFrame(this._tick)}_onDragMove(e){if(!this._armed)return;"touch"===e.pointerType&&e.preventDefault();if(!this._rect()||this._travel<=0)return;const t=this._eventX(e)-this._grabX,i="backward"===this.direction?-t:t;this._p=Math.max(0,Math.min(1,this._grabP+i/this._travel))}_onPointerUp(e){if("pointercancel"===e.type&&this._engagedAt&&Date.now()-this._engagedAt<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._release(!1),400));clearTimeout(this._graceTimer),this._release(this._armed&&"slide"===this.gesture&&this._p>=this.threshold)}_release(e){(this._armed||null!=this._startX)&&(e?this._commit():(this._settling=!0,this._p=0,this._cleanup()))}_commit(){this._settling=!0,this._p=1,this._cleanup(),this._haptic("success"),this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0}))}_cleanup(){this._armed=!1,this._startX=null,this._scrollIntent=!1,this._engagedAt=null,this._rectCache=null,clearTimeout(this._graceTimer),this._raf&&(cancelAnimationFrame(this._raf),this._raf=null),this._dropEarlyMove();const e=this.shadowRoot?.querySelector(".track");document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),e?.removeEventListener("touchmove",this._preventTouch);try{e?.releasePointerCapture(this._pointerId)}catch(e){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onMoveRef&&(window.removeEventListener("pointermove",this._onMoveRef),this._onMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_onKeyDown(e){this.disabled||this.pending||"Enter"!==e.key&&" "!==e.key&&"Spacebar"!==e.key||(e.preventDefault(),this._commit())}render(){const e="hold"===this.gesture,t="backward"===this.direction,i=t?1-this._p:this._p,s=this._settling&&!this._armed?"settling":"";return I`
      <div
        class="track ${this._armed?"armed":""}"
        role="button"
        tabindex=${this.disabled?-1:0}
        aria-label=${this.label||"Confirm"}
        aria-disabled=${this.disabled?"true":"false"}
        style="--mdc-p:${e?this._p:0};--mdc-pos:${i};"
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        ${e?I`<div class="fill ${t?"backward":""} ${s}"></div>`:W}
        <div class="label"><span>${this.label}</span></div>
        ${e?W:I`<div class="handle ${s}">
              ${this.icon?I`<ha-icon .icon=${this.icon}></ha-icon>`:I`<svg
                    class="arrow ${t?"flip":""}"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >${fe}</svg>`}
            </div>`}
      </div>
    `}}customElements.define("materia-drag-confirm",_e);class be extends ce{static properties={year:{type:Number},month:{type:Number},selected:{type:Number},firstDay:{type:Number,attribute:"first-day"},noPast:{type:Boolean,attribute:"no-past"},locale:{type:String}};static styles=[ge,n`
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
    `];constructor(){super();const e=new Date;this.year=e.getFullYear(),this.month=e.getMonth(),this.selected=null,this.firstDay=1,this.noPast=!1,this.locale=""}get _locale(){return this.locale||void 0}get _dayNames(){const e=new Intl.DateTimeFormat(this._locale,{weekday:"narrow"});return Array.from({length:7},(t,i)=>e.format(new Date(2024,0,1+(i+(0===this.firstDay?6:0))%7)))}get _monthLabel(){return new Intl.DateTimeFormat(this._locale,{month:"long",year:"numeric"}).format(new Date(this.year,this.month,1))}_shift(e){let t=this.month+e,i=this.year;t<0?(t=11,i-=1):t>11&&(t=0,i+=1),this.dispatchEvent(new CustomEvent("month-changed",{detail:{year:i,month:t},bubbles:!0,composed:!0}))}_pick(e){this.dispatchEvent(new CustomEvent("date-selected",{detail:{date:new Date(this.year,this.month,e),day:e},bubbles:!0,composed:!0}))}render(){const e=(new Date(this.year,this.month,1).getDay()-this.firstDay+7)%7,t=new Date(this.year,this.month+1,0).getDate(),i=new Date,s=i.getFullYear()===this.year&&i.getMonth()===this.month,o=i.getDate(),n=[...Array.from({length:e},()=>null),...Array.from({length:t},(e,t)=>t+1)];return I`
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
        ${this._dayNames.map(e=>I`<div class="dow" aria-hidden="true">${e}</div>`)}
        ${n.map(e=>{if(null===e)return I`<div class="day blank"></div>`;const t=s&&e===o,i=this.noPast&&s&&e<o,n=this.selected===e;return I`<button
            type="button"
            class="day ${n?"sel":""} ${t?"today":""} ${i?"dead":""}"
            ?disabled=${i}
            aria-selected=${n?"true":"false"}
            @click=${i?void 0:()=>this._pick(e)}
          >${e}</button>`})}
      </div>
    `}}customElements.define("materia-calendar",be);let ve=0;const ye=new Set(["toggle","perform-action","call-service"]),xe=e=>class extends e{_fireHaptic(e="light"){const t=Date.now();t-ve<120||(ve=t,this.dispatchEvent(new CustomEvent("haptic",{detail:e,bubbles:!0,composed:!0})))}_handleAction(e){if(e&&"none"!==e.action)switch(ye.has(e.action)&&this._fireHaptic("light"),e.action){case"toggle":{const t=e.entity||this.config?.entity;if(!t)break;const i=t.split(".")[0],s=String(this.hass?.states[t]?.state??"");switch(i){case"lock":this._callService("lock","locked"===s?"unlock":"lock",{entity_id:t});break;case"cover":this._callService("cover",["closed","closing"].includes(s)?"open_cover":"close_cover",{entity_id:t});break;case"valve":this._callService("valve",["closed","closing"].includes(s)?"open_valve":"close_valve",{entity_id:t});break;case"scene":this._callService("scene","turn_on",{entity_id:t});break;case"button":case"input_button":this._callService(i,"press",{entity_id:t});break;case"vacuum":this._callService("vacuum",["docked","idle","paused"].includes(s)?"start":"return_to_base",{entity_id:t});break;default:this._callService("homeassistant","toggle",{entity_id:t})}break}case"perform-action":case"call-service":{const t=e.perform_action||e.service||"",[i,s]=t.split(".",2);i&&s&&this._callService(i,s,{...e.service_data,...e.data},e.target);break}case"navigate":{if(!e.navigation_path)break;const t=!!e.navigation_replace;history[t?"replaceState":"pushState"](null,"",e.navigation_path);const i=new Event("location-changed",{bubbles:!0,composed:!0});i.detail={replace:t},this.dispatchEvent(i);break}case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e.entity||this.config?.entity}}));break;case"fire-dom-event":{const t=new Event("ll-custom",{bubbles:!0,composed:!0,cancelable:!1});t.detail=e,this.dispatchEvent(t);break}}}_callService(e,t,i,s){return this.hass.callService(e,t,i,s).catch(i=>{ve=0,this._fireHaptic("failure");const s=new Event("hass-notification",{bubbles:!0,composed:!0});s.detail={message:i?.message||`Failed: ${e}.${t}`},this.dispatchEvent(s)})}_capitalize(e){return e&&"string"==typeof e?e.charAt(0).toUpperCase()+e.slice(1):e}_isTemplate(e){return e&&"string"==typeof e&&(e.includes("{{")||e.includes("{%"))}_resolveTemplateValue(e,t){this._tplSubs??={},this._tplResults??={};const i=this._tplSubs[e];if(!this._isTemplate(t))return void(i&&(this._tplSubs[e]=null,i.unsub?.then(e=>e&&e()).catch(()=>{}),delete this._tplResults[e]));if(i&&i.template===t)return;i&&i.unsub?.then(e=>e&&e()).catch(()=>{});const s=this.hass?.connection;if(!s)return;const o={template:t,unsub:null};this._tplSubs[e]=o,o.unsub=s.subscribeMessage(t=>{if(this._tplSubs?.[e]!==o)return;const i=t?.result,s="string"==typeof i?i.trim():i;this._tplResults[e]!==s&&(this._tplResults[e]=s,this.requestUpdate())},{type:"render_template",template:t,report_errors:!1}),o.unsub.catch(()=>{})}_resolveField(e,t){const i=this.config?.[e];this._tplSubs??={};const s=this._tplSubs[t];if(!this._isTemplate(i))return void(s&&(this._tplSubs[t]=null,s.unsub?.then(e=>e&&e()).catch(()=>{}),this[t]=void 0));if(s&&s.template===i)return;s&&s.unsub?.then(e=>e&&e()).catch(()=>{});const o=this.hass?.connection;if(!o)return;const n={template:i,unsub:null};this._tplSubs[t]=n,n.unsub=o.subscribeMessage(e=>{if(this._tplSubs?.[t]!==n)return;const i=e?.result,s="string"==typeof i?i.trim():i;s!==this[t]&&(this[t]=s)},{type:"render_template",template:i,report_errors:!1}).catch(()=>(this._tplSubs?.[t]===n&&void 0===this[t]&&(this[t]=i),null))}_unsubscribeTemplates(){if(this._tplSubs){for(const e of Object.keys(this._tplSubs))this._tplSubs[e]?.unsub?.then(e=>e&&e()).catch(()=>{});this._tplSubs={}}}disconnectedCallback(){super.disconnectedCallback?.(),this._unsubscribeTemplates()}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_isUnavailable(e){return!e||"unavailable"===e.state}_fireMoreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}},we=n`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`,ke=n`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(80%);
  }
`,$e=n`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    /* The DISPLAY voice — hero numerals & titles only, one shout per card. */
    --materia-font-display: "Outfit", "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    --materia-font-accent: "Fraunces", "Georgia", serif;
  }
`,Ce=n`
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
`,Se=n`
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
`;const Ee={unavailable:{en:"Unavailable",nl:"Niet beschikbaar"},cancel:{en:"Cancel",nl:"Annuleren"},confirm:{en:"Confirm",nl:"Bevestigen"},reset:{en:"Reset",nl:"Resetten"},entity_not_found:{en:"Entity not found",nl:"Entiteit niet gevonden"},entity_not_found_with_id:{en:"Entity not found: {entity}",nl:"Entiteit niet gevonden: {entity}"},state_on:{en:"On",nl:"Aan"},state_off:{en:"Off",nl:"Uit"},state_open:{en:"Open",nl:"Open"},state_closed:{en:"Closed",nl:"Dicht"},state_locked:{en:"Locked",nl:"Op slot"},state_unlocked:{en:"Unlocked",nl:"Open"},state_locking:{en:"Locking",nl:"Gaat op slot"},state_unlocking:{en:"Unlocking",nl:"Gaat open"},state_jammed:{en:"Jammed",nl:"Vastgelopen"},lock_slide_to_unlock:{en:"Slide to unlock",nl:"Schuif om te openen"},lock_slide_to_lock:{en:"Slide to lock",nl:"Schuif om op slot te doen"},lock_hold_to_unlock:{en:"Hold to unlock",nl:"Houd ingedrukt om te openen"},lock_hold_to_lock:{en:"Hold to lock",nl:"Houd ingedrukt om op slot te doen"},lock_jammed_hint:{en:"Jammed — check the door",nl:"Vastgelopen — controleer de deur"},lock_locking:{en:"Locking…",nl:"Gaat op slot…"},lock_unlocking:{en:"Unlocking…",nl:"Gaat open…"},lock_demo_note:{en:"Demo · no entity",nl:"Demo · geen entiteit"},cp_currently:{en:"Currently",nl:"Nu"},cp_section_default:{en:"Section {n}",nl:"Sectie {n}"},sched_at_a_time:{en:"At a time",nl:"Op een tijdstip"},sched_when_ellipsis:{en:"When…",nl:"Wanneer…"},sched_not_scheduled:{en:"Not scheduled",nl:"Niet ingepland"},sched_tap_to_pick:{en:"Tap to pick a time or a trigger",nl:"Tik om een uur of trigger te kiezen"},sched_name_default:{en:"Schedule",nl:"Planning"},sched_repeat_weekly:{en:"Repeat weekly",nl:"Wekelijks herhalen"},sched_repeat_sub_on:{en:"Runs on the days below",nl:"Loopt op de dagen hieronder"},sched_repeat_sub_off:{en:"One run only",nl:"Eén keer, niet herhalen"},sched_save_schedule:{en:"Save schedule",nl:"Planning opslaan"},sched_set_timer:{en:"Set timer",nl:"Timer instellen"},sched_pick_date_time:{en:"Pick a date & time",nl:"Kies een datum en tijdstip"},sched_mocked_note:{en:"Mocked · nothing is scheduled",nl:"Demo · er is niets ingepland"},sched_pick_trigger:{en:"Pick a trigger",nl:"Kies een trigger"},sched_runs_whenever:{en:"Runs whenever it happens",nl:"Start zodra het gebeurt"},sched_when_question:{en:"When?",nl:"Wanneer?"},sched_pick_moment:{en:"Pick a moment",nl:"Kies een moment"},sched_starts_at:{en:"Starts at {time}",nl:"Begint om {time}"},sched_preset_1h:{en:"In 1 hour",nl:"Over 1 uur"},sched_preset_4h:{en:"In 4 hours",nl:"Over 4 uur"},sched_preset_tonight:{en:"Tonight",nl:"Vanavond"},sched_preset_tomorrow:{en:"Tomorrow",nl:"Morgen"},sched_preset_noon:{en:"Noon",nl:"12 uur"},sched_preset_saturday:{en:"Saturday",nl:"Zaterdag"},sched_trigger_leave:{en:"When I leave",nl:"Als ik vertrek"},sched_trigger_leave_sub:{en:"My phone leaves home",nl:"Mijn telefoon verlaat het huis"},sched_trigger_empty:{en:"When everyone's out",nl:"Als iedereen weg is"},sched_trigger_empty_sub:{en:"All trackers away for 10 min",nl:"Alle trackers al 10 min weg van huis"},sched_trigger_night:{en:"When the house sleeps",nl:"Als het huis slaapt"},sched_trigger_night_sub:{en:"All lights off after 22:00",nl:"Alle lichten uit na 22:00"},sched_trigger_sunset:{en:"At sunset",nl:"Bij zonsondergang"},sched_trigger_sunset_sub:{en:"Around 21:48 today",nl:"Rond 21:48 vandaag"},sched_close:{en:"Close",nl:"Sluiten"},sched_clear:{en:"Clear",nl:"Wissen"},sched_scheduled:{en:"Scheduled",nl:"Ingepland"},sched_pending_sub:{en:"Pick again to move it, or clear it.",nl:"Kies opnieuw om het te verplaatsen, of wis het."},sched_skip:{en:"Skip",nl:"Overslaan"},sched_add:{en:"Add a schedule",nl:"Een planning toevoegen"},db_eyebrow:{en:"Doorbell",nl:"Deurbel"},db_eyebrow_street:{en:"Street door",nl:"Benedendeur"},db_eyebrow_front:{en:"Front door",nl:"Voordeur"},db_title_ringing:{en:"Someone's at the door",nl:"Er staat iemand aan de deur"},db_title_buzzing:{en:"Buzzing them in",nl:"Ze worden binnengelaten"},db_title_buzzed:{en:"Buzzed in",nl:"Binnengelaten"},db_title_opened:{en:"Door open",nl:"Deur open"},db_title_lapsed:{en:"No answer",nl:"Geen antwoord"},db_sub_ringing:{en:"{place} · just now",nl:"{place} · daarnet"},db_sub_buzzing:{en:"Street door released",nl:"Benedendeur geopend"},db_sub_buzzed:{en:"Front door still locked",nl:"Voordeur nog op slot"},db_sub_opened:{en:"Front door unlocked",nl:"Voordeur van het slot"},db_sub_lapsed:{en:"Ring lapsed · nothing was opened",nl:"Bel verlopen · er ging niets open"},db_count_before_lapse:{en:"before it lapses",nl:"voor de bel verloopt"},db_count_buzzing:{en:"buzzing",nl:"aan het zoemen"},db_count_buzzed:{en:"street door released",nl:"benedendeur open"},db_count_opened:{en:"front door unlocked",nl:"voordeur open"},db_count_lapsed:{en:"missed ring",nl:"gemiste bel"},db_count_done:{en:"Done",nl:"Klaar"},db_count_open:{en:"Open",nl:"Open"},db_buzz_title:{en:"Buzz in",nl:"Binnenlaten"},db_buzz_sub:{en:"Street door only",nl:"Enkel de benedendeur"},db_buzz_cta:{en:"Tap to buzz",nl:"Tik om te zoemen"},db_buzz_busy:{en:"Buzzing",nl:"Zoemt…"},db_buzz_done:{en:"Buzzed",nl:"Gezoemd"},db_open_title:{en:"Open the front door",nl:"Doe de voordeur open"},db_open_sub:{en:"Unlocks the front door for your visitor.",nl:"Haalt de voordeur van het slot voor je bezoek."},db_slide_hint:{en:"Slide to open",nl:"Schuif om te openen"},db_slide_done:{en:"Door open",nl:"Deur open"},db_ignore:{en:"Ignore",nl:"Negeer"},db_replay:{en:"Replay ring",nl:"Bel opnieuw"},db_mute:{en:"Silence",nl:"Stil"},db_muted:{en:"Muted",nl:"Gedempt"},cond_clear_night:{en:"Clear night",nl:"Heldere nacht"},cond_partly_cloudy:{en:"Partly cloudy",nl:"Half bewolkt"},cond_thunderstorm:{en:"Thunderstorm",nl:"Onweer"},cond_sleet:{en:"Sleet",nl:"Natte sneeuw"},cond_exceptional:{en:"Exceptional",nl:"Uitzonderlijk"},level_none:{en:"None",nl:"Geen"},level_low:{en:"Low",nl:"Laag"},level_moderate:{en:"Moderate",nl:"Matig"},level_high:{en:"High",nl:"Hoog"},level_very_high:{en:"Very high",nl:"Zeer hoog"},level_extreme:{en:"Extreme",nl:"Extreem"},level_active:{en:"Active",nl:"Actief"},aqi_good:{en:"Good air quality",nl:"Goede luchtkwaliteit"},aqi_moderate:{en:"Moderate air quality",nl:"Matige luchtkwaliteit"},aqi_unhealthy_sensitive:{en:"Unhealthy for sensitive groups",nl:"Ongezond voor gevoelige groepen"},aqi_unhealthy:{en:"Unhealthy air quality",nl:"Ongezonde luchtkwaliteit"},aqi_very_unhealthy:{en:"Very unhealthy air quality",nl:"Zeer ongezonde luchtkwaliteit"},aqi_hazardous:{en:"Hazardous air quality",nl:"Gevaarlijke luchtkwaliteit"},wm_wind_from:{en:"From",nl:"Uit"},wm_wind:{en:"Wind",nl:"Wind"},wm_uv_index:{en:"UV index",nl:"UV-index"},wm_visibility:{en:"Visibility",nl:"Zicht"},wm_visibility_hint:{en:"Weather entity has no visibility — add a sensor",nl:"Weerentiteit heeft geen zicht — voeg een sensor toe"},wm_pressure:{en:"Pressure",nl:"Luchtdruk"},wm_air_quality:{en:"Air quality",nl:"Luchtkwaliteit"},wm_aqi_hint:{en:"Point this tile at an AQI sensor",nl:"Wijs deze tegel naar een luchtkwaliteitssensor"},wm_precipitation:{en:"Precipitation",nl:"Neerslag"},wm_no_precip:{en:"No precipitation expected",nl:"Geen neerslag verwacht"},wm_total_rain:{en:"Total rain for the day",nl:"Totale regen vandaag"},wm_humidity:{en:"Humidity",nl:"Vochtigheid"},wm_humidity_hint:{en:"Weather entity has no humidity — add a sensor",nl:"Weerentiteit heeft geen vochtigheid — voeg een sensor toe"},wm_dew_point:{en:"Dew point",nl:"Dauwpunt"},wm_sunrise_sunset:{en:"Sunrise & sunset",nl:"Zonsopgang & zonsondergang"},wm_grass:{en:"Grass",nl:"Gras"},wm_tree:{en:"Tree",nl:"Boom"},wm_weed:{en:"Weed",nl:"Onkruid"},wm_pollen:{en:"Pollen",nl:"Pollen"},wm_pollen_hint:{en:"Add pollen sensors",nl:"Voeg pollensensoren toe"},wg_rain:{en:"Rain",nl:"Regen"},wg_pollen_none:{en:"none",nl:"geen"},wh_night:{en:"Night",nl:"Nacht"},wh_day:{en:"Day",nl:"Dag"},wh_feels_like:{en:"Feels like",nl:"Voelt als"},fc_hourly_forecast:{en:"Hourly forecast",nl:"Uurverwachting"},fc_today:{en:"Today",nl:"Vandaag"},gt_needs_water_now:{en:"Needs water now",nl:"Nu water nodig"},gt_water_soon:{en:"Water soon",nl:"Binnenkort water geven"},gt_optimal:{en:"Optimal",nl:"Optimaal"},gt_overwatered:{en:"Overwatered",nl:"Te veel water"},vh_vacuum_error:{en:"Vacuum error",nl:"Fout met de stofzuiger"},vh_dock_error:{en:"Dock error",nl:"Fout met het dock"},vh_water_shortage:{en:"Water shortage - cannot mop",nl:"Te weinig water - kan niet dweilen"},vh_clean_water_refill:{en:"Clean water tank needs refilling",nl:"Schoonwatertank moet bijgevuld worden"},vh_dirty_water_empty:{en:"Dirty water tank needs emptying",nl:"Vuilwatertank moet geleegd worden"},vh_docked:{en:"Docked",nl:"In het dock"},vh_drying_mop:{en:"Drying the mop",nl:"Dweil wordt gedroogd"},vh_done_caption:{en:"done",nl:"klaar"},vh_battery_caption:{en:"battery",nl:"batterij"},vh_about_min_left:{en:"about {mins} min left",nl:"nog {mins} min"},vh_last_cleaned_ago:{en:"Last cleaned {rel} ago",nl:"Laatst gestofzuigd {rel} geleden"},vh_needs_attention:{en:"{name} needs attention",nl:"{name} heeft aandacht nodig"},unit_min:{en:"min",nl:"min"},unit_hour:{en:"h",nl:"u"},unit_day:{en:"d",nl:"d"},cal_prev_month:{en:"Previous month",nl:"Vorige maand"},cal_next_month:{en:"Next month",nl:"Volgende maand"},sb_more_actions:{en:"more actions",nl:"meer acties"}};function Ae(e){return String(e||"en").trim().toLowerCase().split("-")[0]||"en"}function ze(e,t){if(!e)return"";const i=function(e){return Ae("string"==typeof e?e:e?.locale?.language)}(t);return e[i]||e.en||""}function Me(e,t,i){const s=Ee[e];return s?function(e,t){return t?Object.entries(t).reduce((e,[t,i])=>e.replaceAll(`{${t}}`,String(i)),e):e}(ze(s,t),i):e}const Te=n`
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
`,Fe=e=>e.label??e.name.replace(/_/g," ").replace(/^\w/,e=>e.toUpperCase()),Oe=(e,t)=>I`
  <ha-sortable
    handle-selector=".drag-handle"
    @item-moved=${t=>{t.stopPropagation();const{oldIndex:i,newIndex:s}=t.detail;i!==s&&e(i,s)}}
  >
    <div>${t}</div>
  </ha-sortable>
`,qe=(e,t,i)=>({value:`var(--md-sys-cust-color-${e})`,swatch:`var(--md-sys-cust-color-${e}, ${i})`,label:t}),De=(e,t)=>({value:`var(--md-sys-color-${e})`,swatch:`var(--md-sys-color-${e})`,label:t}),Pe=[{title:"Light",options:[qe("light","Light","#FEE082"),qe("light-container","Light container","#FEEFCA"),qe("on-light","On light","#745D00")]},{title:"Device",options:[qe("device","Device","#D9E2FE"),qe("device-container","Device container","#EDF0FF"),qe("on-device","On device","#0156CF")]},{title:"Climate · Heat",options:[qe("climate-heat","Heat","#FFDFD4"),qe("climate-heat-container","Heat container","#FFEEE9"),qe("on-climate-heat","On heat","#A14614"),qe("climate-heat-accent","Heat accent","#A14614")]},{title:"Climate · Cool",options:[qe("climate-cool","Cool","#D3E8FF"),qe("climate-cool-container","Cool container","#EAF3FF"),qe("on-climate-cool","On cool","#327EA7"),qe("climate-cool-accent","Cool accent","#327EA7")]},{title:"Climate · Auto",options:[qe("climate-auto","Auto","#D4EBDD"),qe("climate-auto-container","Auto container","#EAF6EE"),qe("on-climate-auto","On auto","#2E5E44"),qe("climate-auto-accent","Auto accent","#2E5E44")]},{title:"Water · Eco",options:[qe("water-eco","Eco","#C8E6C9"),qe("water-eco-container","Eco container","#E6F4EA"),qe("on-water-eco","On eco","#256029")]},{title:"Water · Performance",options:[qe("water-performance","Performance","#FFD1B0"),qe("water-performance-container","Performance container","#FFEDE0"),qe("on-water-performance","On performance","#9C3A00")]},{title:"Warning",options:[qe("warning","Warning","#D9A000"),qe("warning-container","Warning container","#FEEFCA"),qe("on-warning","On warning","#FFFFFF"),qe("on-warning-container","On warning container","#745D00")]},{title:"Error",options:[qe("error","Error","#B3261E"),qe("error-container","Error container","#F9DEDC"),qe("on-error","On error","#FFFFFF"),qe("on-error-container","On error container","#410E0B")]},{title:"Weather",options:[qe("weather-sun","Sun","#F2B500"),qe("weather-cloud","Cloud","#9FA9B7"),qe("weather-cloud-dark","Cloud (dark)","#6F7A8A"),qe("weather-rain","Rain","#2E86E0"),qe("weather-snow","Snow","#AEB8C4"),qe("weather-moon","Moon","#5961C2")]},{title:"Severity scale",options:[qe("scale-green","Scale green","#5E9E50"),qe("scale-yellow","Scale yellow","#C7A128"),qe("scale-orange","Scale orange","#D9713C"),qe("scale-red","Scale red","#C94D42"),qe("scale-purple","Scale purple","#8A4DA3"),qe("scale-maroon","Scale maroon","#7A4040")]},{title:"System (theme)",options:[De("primary","Primary"),De("primary-container","Primary container"),De("secondary","Secondary"),De("secondary-container","Secondary container"),De("tertiary","Tertiary"),De("tertiary-container","Tertiary container"),De("error","Error"),De("error-container","Error container"),De("surface-container","Surface container")]}],Ue=new Set(Pe.flatMap(e=>e.options.map(e=>e.value)));function Re(e){return e&&"string"==typeof e&&(e.includes("{{")||e.includes("{%"))}const Ne={template:{}};class je extends ce{static properties={label:{},value:{},_open:{state:!0},_customOpen:{state:!0}};static styles=n`
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
  `;get _isCustom(){return!!this.value&&!Ue.has(this.value)}_option(e){for(const t of Pe){const i=t.options.find(t=>t.value===e);if(i)return i}return null}get _currentLabel(){if(!this.value)return"Default";const e=this._option(this.value);return e?e.label:"Custom"}get _currentHex(){if(!this.value)return null;const e=this._option(this.value);return e?e.swatch:this.value}disconnectedCallback(){super.disconnectedCallback(),this._removeOutside()}render(){const e=this._currentHex,t=I`<ha-icon class="check" icon="mdi:check"></ha-icon>`;return I`
      ${this.label?I`<div class="label">${this.label}</div>`:""}
      <button type="button" class="trigger ${this._open?"open":""}" @click=${this._toggle}>
        <span class="swatch ${e?"":"none"}" style=${e?`background:${e}`:""}></span>
        <span class="value">${this._currentLabel}</span>
        <ha-icon class="chev" icon=${this._open?"mdi:menu-up":"mdi:menu-down"}></ha-icon>
      </button>

      ${this._open?I`
            <div class="panel">
              <button type="button" class="opt ${this.value?"":"sel"}" @click=${()=>this._pick("")}>
                <span class="swatch none"></span>
                <span class="opt-label">Default (automatic)</span>
                ${this.value?"":t}
              </button>
              ${Pe.map(e=>I`
                  <div class="grp">${e.title}</div>
                  ${e.options.map(e=>I`
                      <button type="button" class="opt ${this.value===e.value?"sel":""}" @click=${()=>this._pick(e.value)}>
                        <span class="swatch" style="background:${e.swatch};"></span>
                        <span class="opt-label">${e.label}</span>
                        ${this.value===e.value?t:""}
                      </button>
                    `)}
                `)}
              <button type="button" class="opt ${this._isCustom?"sel":""}" @click=${this._chooseCustom}>
                <ha-icon class="cust-ic" icon="mdi:eyedropper-variant"></ha-icon>
                <span class="opt-label">Custom…</span>
                ${this._isCustom?t:""}
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
    `}_toggle(){this._open=!this._open,this._open?(this._outside=e=>{e.composedPath().includes(this)||(this._open=!1,this._removeOutside())},document.addEventListener("click",this._outside,!0)):this._removeOutside()}_removeOutside(){this._outside&&(document.removeEventListener("click",this._outside,!0),this._outside=null)}_pick(e){this._open=!1,this._customOpen=!1,this._removeOutside(),this._emit(e)}_chooseCustom(){this._open=!1,this._customOpen=!0,this._removeOutside()}_onCustomInput(e){this._emit(e.target.value)}_emit(e){e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0})))}}customElements.define("materia-color-picker",je);class Be extends ce{static properties={hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_modes:{state:!0}};static styles=n`
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
  `;setConfig(e){this._config=e,this._modes??={}}_formData(){return this._config||{}}get _sections(){return[]}_sectionsSignature(){return""}get _sectionsMemo(){const e=this._sectionsSignature();return this.__secSig===e&&this.__secVal||(this.__secSig=e,this.__secVal=this._sections),this.__secVal}_stableContext(e,t,i){const s={};for(const[e,o]of Object.entries(t))s[e]=i[o];this.__ctx??={};const o=this.__ctx[e];return o&&Object.keys(s).every(e=>o[e]===s[e])?o:(this.__ctx[e]=s,s)}_modeFor(e,t){const i=this._modes?.[e];return i||(Re(t)?"template":"simple")}_toggleMode(e){const t=this._formData()[e],i=this._modeFor(e,t);this._modes={...this._modes||{},[e]:"template"===i?"simple":"template"}}render(){if(!this.hass||!this._config)return I``;const e=this._formData();return I`
      ${this._sectionsMemo.map(t=>this._renderSection(t,e))}
      ${this._renderExtra?this._renderExtra(e):""}
    `}_renderSection(e,t){return I`
      <ha-expansion-panel
        outlined
        .header=${e.title}
        .secondary=${e.secondary||""}
        .expanded=${e.expanded??!0}
      >
        ${e.icon?I`<ha-icon slot="leading-icon" .icon=${e.icon}></ha-icon>`:""}
        <div class="section-body">
          ${(e.fields||[]).map(e=>this._renderField(e,t))}
        </div>
      </ha-expansion-panel>
    `}_renderField(e,t){const i=t[e.name],s=e.label??Fe(e),o=!!e.template,n=o?this._modeFor(e.name,i):"simple",a=e.context?this._stableContext(e.name,e.context,t):void 0;let r;return r=o&&"template"===n?I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${Ne}
          .value=${i}
          .label=${s}
          .required=${!!e.required}
        ></ha-selector>
      `:e.color?I`
        <materia-color-picker
          class="field-control"
          .label=${s}
          .value=${i||""}
        ></materia-color-picker>
      `:I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${e.selector}
          .value=${i}
          .label=${s}
          .helper=${e.helper}
          .context=${a}
          .required=${!!e.required}
        ></ha-selector>
      `,I`
      <div class="field" @value-changed=${t=>this._fieldChanged(e.name,t)}>
        ${r}
        ${o?I`
              <ha-icon-button
                class="tpl-toggle ${"template"===n?"active":""}"
                .label=${"template"===n?"Use simple input":"Use a template"}
                @click=${()=>this._toggleMode(e.name)}
              >
                <ha-icon icon="mdi:code-braces"></ha-icon>
              </ha-icon-button>
            `:""}
      </div>
    `}_fieldChanged(e,t){t.stopPropagation(),this._setField(e,t.detail?.value)}_setField(e,t){const i={...this._config};""===t||null==t?delete i[e]:i[e]=t,this._commit(i)}_commit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}const Le=new Set(["cover"]);function Ie(e){if(!e?.entity)return{...e};const t=e.entity.split(".")[0],i={show_sub_buttons:!1,show_stop:!0,show_state:!0,subtitle_inline:!0};return Le.has(t)&&(i.show_sub_buttons=!0),"light"!==t&&"cover"!==t||(i.show_slider=!0),{...i,...e}}class He extends Be{static properties={_expandedButton:{state:!0}};static styles=[Be.styles,n`
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
    `];static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t}}setConfig(e){super.setConfig(e),this._expandedButton??=null}_formData(){return Ie(this._config)}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const e=this._config?.entity?.split(".")[0],t="cover"===e,i="light"===e;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",template:!0,selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||t?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...t?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(e){return[Re(e?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${e.map((e,t)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(t)}>
              <span>${e.name||(e.icon&&!Re(e.icon)?e.icon:`Button ${t+1}`)}</span>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._toggleButton(t)}}>
                <ha-icon icon=${this._expandedButton===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._removeButton(t)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===t?I`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${this._subButtonSchema(e)}
                      .computeLabel=${Fe}
                      @value-changed=${e=>this._subButtonChanged(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}_toggleButton(e){this._expandedButton=this._expandedButton===e?null:e}_addButton(){const e=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:e}),this._expandedButton=e.length-1}_removeButton(e){const t=[...this._config.sub_buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null);const i={...this._config};0===t.length?delete i.sub_buttons:i.sub_buttons=t,this._commit(i)}_subButtonChanged(e,t){const i=[...this._config.sub_buttons||[]];i[e]={...i[e],...t},this._commit({...this._config,sub_buttons:i})}}customElements.define("materia-card-editor",He);const Ve={light:{showSlider:!0,activeState:"on",colorActive:"var(--md-sys-cust-color-light-container)",colorOn:"var(--md-sys-cust-color-on-light)",sliderColor:"var(--md-sys-cust-color-light)"},cover:{showSlider:!0,showSubButtons:!0,activeState:"open",colorActive:"var(--md-sys-cust-color-device-container)",colorOn:"var(--md-sys-cust-color-on-device)",sliderColor:"var(--md-sys-cust-color-device)"},switch:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},fan:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},lock:{activeState:["locked","locking"],colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},vacuum:{activeState:"cleaning",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},climate:{activeState:"heat",colorActive:"var(--md-sys-cust-color-climate-heat-container)",colorOn:"var(--md-sys-cust-color-on-climate-heat)"},media_player:{activeState:"playing",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},scene:{variant:"tonal",activeState:"__never__"},input_boolean:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},alarm_control_panel:{activeState:"armed_away",colorActive:"var(--md-sys-color-error-container)",colorOn:"var(--md-sys-color-on-error-container)"}},We={activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"};class Ge extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedShowState:{state:!0}};static getConfigElement(){return document.createElement("materia-card-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t}}setConfig(e){const t=e.entity?e.entity.split(".")[0]:"",i=Ve[t]||We,s=e.entity?{tap_action:{action:"toggle"}}:{};e.entity&&i.showSubButtons&&(s.show_sub_buttons=!0,s.show_stop=!0),this.config={...s,...e}}get _domain(){return this.config.entity?.split(".")[0]||""}get _domainConfig(){return Ve[this._domain]||We}get _stateObj(){return this.hass?.states?.[this.config.entity]}get _isActive(){const e=this._stateObj?.state,t=this.config.active_state||this._domainConfig.activeState;return"__never__"!==t&&(Array.isArray(t)?t.includes(e):e===t)}get _variant(){return this._domainConfig.variant||"filled"}get _isTonal(){return"tonal"===this._variant}get _isDimmable(){if("light"!==this._domain)return!1;const e=this._stateObj?.attributes;if(!e)return!1;return!!(e.supported_color_modes||[]).some(e=>"onoff"!==e)||void 0!==e.brightness}get _showSlider(){return!this._isTonal&&(void 0!==this.config.show_slider?this.config.show_slider:"light"===this._domain?this._isDimmable:"cover"===this._domain||(this._domainConfig.showSlider||!1))}get _subButtons(){const e=this.config.sub_buttons;if(Array.isArray(e))return e;if(!(void 0!==this.config.show_sub_buttons?this.config.show_sub_buttons:this._domainConfig.showSubButtons||!1))return[];if("cover"===this._domain){const e=this.config.entity,t=[{icon:"mdi:arrow-up",tap_action:{action:"perform-action",perform_action:"cover.open_cover",target:{entity_id:e}}}];return!1!==this.config.show_stop&&t.push({icon:"mdi:stop",tap_action:{action:"perform-action",perform_action:"cover.stop_cover",target:{entity_id:e}}}),t.push({icon:"mdi:arrow-down",tap_action:{action:"perform-action",perform_action:"cover.close_cover",target:{entity_id:e}}}),t}return[]}get _fillPercent(){const e=this._stateObj;if(!e)return 0;if("light"===this._domain){const t=e.attributes?.brightness??0;return Math.round(t/255*100)}return"cover"===this._domain?e.attributes?.current_position??0:0}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:this._stateObj?.attributes?.friendly_name||this.config.entity}get _icon(){return this.config.icon?this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon:"lock"===this._domain?this._isActive?"m3o:lock":"m3o:lock-open-right":void 0}get _subtitle(){const e=this.config.subtitle;return e?this._isTemplate(e)?this._resolvedSubtitle:e:""}_relativeLastChanged(){const e=this._stateObj;if(!e?.last_changed)return"";const t=(Date.now()-new Date(e.last_changed))/1e3;if(t<60)return"just now";const i=Math.floor(t/60);if(i<60)return`${i} minute${1===i?"":"s"} ago`;const s=Math.floor(t/3600);if(s<24)return`${s} hour${1===s?"":"s"} ago`;const o=Math.floor(t/86400);return`${o} day${1===o?"":"s"} ago`}_baseStateDisplay(){const e=this._stateObj;if(!e)return"";const t=this._domain;if("scene"===t)return"";if("light"===t){if("on"!==e.state)return Me("state_off",this.hass);if(this._isDimmable){return`${Math.round((e.attributes?.brightness??0)/255*100)}%`}return Me("state_on",this.hass)}if("cover"===t){const t=e.attributes?.current_position;return 0===t||"closed"===e.state?Me("state_closed",this.hass):100===t?Me("state_open",this.hass):null!=t?`${Me("state_open",this.hass)} · ${t}%`:this._capitalize(e.state)}if("lock"===t){return{locked:Me("state_locked",this.hass),unlocked:Me("state_unlocked",this.hass),locking:Me("state_locking",this.hass),unlocking:Me("state_unlocking",this.hass),jammed:Me("state_jammed",this.hass)}[e.state]||this._capitalize(e.state)}const i=e.state,s=Number(i);if(""!==i&&null!=i&&!Number.isNaN(s)){const t=Math.round(100*s)/100,i=e.attributes?.unit_of_measurement;return i?"%"===i?`${t}%`:`${t} ${i}`:`${t}`}return this.hass.formatEntityState?this.hass.formatEntityState(e):this._capitalize(String(i).replace(/[_-]/g," "))}get _showState(){const e=this.config.show_state;if(!1===e)return!1;if(this._isTemplate(e)){if(void 0===this._resolvedShowState)return!0;const e=String(this._resolvedShowState).trim().toLowerCase();return!["false","off","none","no","0","hide",""].includes(e)}return!0}get _stateDisplay(){let e=this._showState?this._baseStateDisplay():"";if(this.config.show_last_changed){const t=this._relativeLastChanged();t&&(e=e?`${e} · ${t}`:t)}return e}_getContainerBg(){if(this._isTonal)return"var(--md-sys-color-secondary-container)";const e=this._resolvedColor||this.config.color;return this._isActive?e||("light"!==this._domain||this._isDimmable?this._domainConfig.colorActive:this._domainConfig.sliderColor||this._domainConfig.colorActive):"var(--ha-card-background, var(--card-background-color))"}_getTextColor(){if(this._isTonal)return"var(--md-sys-color-on-secondary-container)";const e=this._resolvedColorOn||this.config.color_on;return this._isActive?e||this._domainConfig.colorOn:"var(--primary-text-color)"}get _templatesReady(){const e=this.config;return(!this._isTemplate(e?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(e?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(e?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(e?.name)||void 0!==this._resolvedName)))}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("show_state","_resolvedShowState"))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSlider()}_getContainer(){return this.shadowRoot?.querySelector(".container")}_getEventX(e){return void 0!==e.clientX&&0!==e.clientX?e.clientX:e.changedTouches?.[0]?e.changedTouches[0].clientX:e.touches?.[0]?e.touches[0].clientX:e.clientX||0}_getSliderRect(){const e=this._sliderFrameId||0;if(this._sliderRectCache&&this._sliderRectCacheFrame===e)return this._sliderRectCache;const t=this._getContainer()?.getBoundingClientRect();return this._sliderRectCache=t,this._sliderRectCacheFrame=e,this._sliderFrameRaf||(this._sliderFrameRaf=requestAnimationFrame(()=>{this._sliderFrameId=(this._sliderFrameId||0)+1,this._sliderFrameRaf=null})),t}_pctFromPointer(e){const t=this._getSliderRect();if(!t)return 0;const i=this._getEventX(e);return Math.max(0,Math.min(100,(i-t.left)/t.width*100))}_updateFillVisual(e){const t=this.shadowRoot?.querySelector(".fill");t&&(t.style.width=`${e}%`)}_onPointerDown(e){e.button&&0!==e.button||e.isPrimary&&(e.target.closest("button, .sub-btn")||"touch"===e.pointerType&&e.clientX<=30||(this._startX=e.clientX,this._startY=e.clientY,this._dragging=!1,this._scrollIntent=!1,this._pointerId=e.pointerId,this._sliderRectCache=null,this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),this._longPressTimer=setTimeout(()=>{this._longPressTimer=null,this._scrollIntent||this._startDrag(e)},200),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)))}_onEarlyMove(e){if(this._dragging||this._scrollIntent)return;const t=Math.abs(e.clientX-this._startX),i=Math.abs(e.clientY-this._startY);if(i>10&&i>t+4)return this._scrollIntent=!0,void this._abortSlider();t>6&&t>=i&&(clearTimeout(this._longPressTimer),this._longPressTimer=null,this._startDrag(e))}_startDrag(e){if(this._dragging)return;this._dragging=!0,this._dragStartTime=Date.now(),this._sliderRectCache=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null);const t=this._getContainer();try{t?.setPointerCapture(this._pointerId)}catch(e){}t?.classList.add("is-dragging"),document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),this._onDragMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onDragMoveRef),t&&t.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._cleanupSlider()},document.addEventListener("visibilitychange",this._onVisibilityRef);const i=this._pctFromPointer(e);this._updateFillVisual(i),this._throttledSetValue(i)}_preventTouch(e){e.preventDefault()}_onDragMove(e){"touch"===e.pointerType&&e.preventDefault();const t=this._pctFromPointer(e);this._updateFillVisual(t),this._throttledSetValue(t)}_onPointerUp(e){if(null!=this._startX){if("pointercancel"===e.type&&this._dragStartTime&&Date.now()-this._dragStartTime<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._cleanupSlider(),400));if(clearTimeout(this._graceTimer),this._dragging){const t=this._pctFromPointer(e);this._updateFillVisual(t),this._setSliderValue(t),this._fireHaptic("light")}else this._scrollIntent||this._handleTap();this._cleanupSlider()}}_abortSlider(){clearTimeout(this._longPressTimer),this._longPressTimer=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_cleanupSlider(){clearTimeout(this._graceTimer),this._abortSlider(),this._startX=null,this._dragging=!1,this._scrollIntent=!1,this._dragStartTime=null,this._sliderRectCache=null,this._throttleTimeout&&(clearTimeout(this._throttleTimeout),this._throttleTimeout=null);const e=this._getContainer();e?.classList.remove("is-dragging"),document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),e&&e.removeEventListener("touchmove",this._preventTouch);try{e?.releasePointerCapture(this._pointerId)}catch(e){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onDragMoveRef&&(window.removeEventListener("pointermove",this._onDragMoveRef),this._onDragMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_throttledSetValue(e){const t=Date.now();if(this._lastSliderArgs=e,this._throttleTimeout)return;t-(this._lastSliderCall||0)>=200?(this._lastSliderCall=t,this._setSliderValue(e)):this._throttleTimeout=setTimeout(()=>{this._throttleTimeout=null,this._lastSliderCall=Date.now(),this._setSliderValue(this._lastSliderArgs)},200)}_setSliderValue(e){if(!this.hass)return;const t=this.config.entity;if("light"===this._domain){let i=e;!this.config.slider_turn_off&&i<1&&(i=1);const s=Math.round(i/100*255);return void(s<=3&&this.config.slider_turn_off?this._callService("light","turn_off",{entity_id:t}):this._callService("light","turn_on",{entity_id:t,brightness:Math.max(s,1)}))}"cover"!==this._domain||this._callService("cover","set_cover_position",{entity_id:t,position:Math.max(0,Math.min(100,Math.round(e)))})}_handleSubButton(e,t){t.stopPropagation(),this._handleAction(e.tap_action)}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.config.entity&&this._callService("homeassistant","toggle",{entity_id:this.config.entity})}render(){if(!this.config||!this.hass)return I``;const e=this._stateObj,t=!!this.config.entity&&this._isUnavailable(e);!t&&this._isActive,this._isTonal;const i=!t&&this._showSlider,s=t?[]:this._subButtons,o=this._getContainerBg(),n=this._getTextColor(),a=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=t?Me("unavailable",this.hass):this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c;return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""} ${i?"slider-active":""}"
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
                  .stateObj=${e}
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
                  ${s.map(e=>I`
                      <button
                        class="sub-btn"
                        title=${e.name||""}
                        @click=${t=>this._handleSubButton(e,t)}
                      >
                        <ha-icon .icon=${e.icon}></ha-icon>
                      </button>
                    `)}
                </div>
              `:W}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[$e,we,Ce,Se,ke,Te]}customElements.define("materia-card",Ge),window.customCards=window.customCards||[],window.customCards.push({type:"materia-card",name:"Materia Card",description:"Universal entity card. Auto-detects lights, covers, devices, locks, and scenes.",preview:!0});const Xe=n`
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
`;class Ye extends Be{static properties={_selectedCard:{state:!0},_expandedButton:{state:!0}};static styles=[Be.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._selectedCard??=-1,this._expandedButton??=null}_formData(){return{columns:2,...Ie(this._config)}}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const e=this._config?.entity?.split(".")[0],t="cover"===e,i="light"===e;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"columns",selector:{number:{min:1,max:6,mode:"slider"}}},{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||t?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...t?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(e){return[Re(e?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=this._config.cards||[],t=e.length,i=this._selectedCard,s=i===t,o=i>=0&&i<t,n=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${n.map((e,t)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleSubButton(t)}>
              <span>${e.name||(e.icon&&!Re(e.icon)?e.icon:`Button ${t+1}`)}</span>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._toggleSubButton(t)}}>
                <ha-icon icon=${this._expandedButton===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._removeSubButton(t)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===t?I`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${this._subButtonSchema(e)}
                      .computeLabel=${Fe}
                      @value-changed=${e=>this._subButtonChanged(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}

      <div class="section-header"><span>Cards</span></div>

      <div class="toolbar">
        <div class="tabs">
          ${e.map((e,t)=>I`
              <div
                class="tab ${i===t?"selected":""}"
                @click=${()=>this._selectedCard=t}
              >${t+1}</div>
            `)}
        </div>
        <ha-icon-button
          class="${s?"selected":""}"
          @click=${()=>this._selectedCard=t}
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
                <ha-icon-button ?disabled=${i===t-1} @click=${()=>this._moveCard(1)}>
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${this._removeCard}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${e[i]}
                @config-changed=${this._handleChildChanged}
              ></hui-card-element-editor>
            `:""}
      </div>
    `}_toggleSubButton(e){this._expandedButton=this._expandedButton===e?null:e}_addSubButton(){const e=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:e}),this._expandedButton=e.length-1}_removeSubButton(e){const t=[...this._config.sub_buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null);const i={...this._config};0===t.length?delete i.sub_buttons:i.sub_buttons=t,this._commit(i)}_subButtonChanged(e,t){const i=[...this._config.sub_buttons||[]];i[e]={...i[e],...t},this._commit({...this._config,sub_buttons:i})}_handleCardPicked(e){e.stopPropagation();const t=[...this._config.cards||[],e.detail.config];this._selectedCard=t.length-1,this._commit({...this._config,cards:t})}_handleChildChanged(e){if(e.stopPropagation(),e.detail.error)return;const t=[...this._config.cards||[]];t[this._selectedCard]=e.detail.config,this._commit({...this._config,cards:t})}_moveCard(e){const t=[...this._config.cards||[]],i=this._selectedCard,s=i+e;if(s<0||s>=t.length)return;const[o]=t.splice(i,1);t.splice(s,0,o),this._selectedCard=s,this._commit({...this._config,cards:t})}_removeCard(){const e=[...this._config.cards||[]];e.splice(this._selectedCard,1),this._selectedCard=Math.max(0,Math.min(this._selectedCard,e.length-1)),0===e.length&&(this._selectedCard=-1),this._commit({...this._config,cards:e})}}customElements.define("materia-room-editor",Ye);class Ke extends Ge{static properties={...Ge.properties,_expanded:{state:!0},_childCards:{state:!0}};static styles=[$e,we,Ce,Se,ke,Te,Xe];static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t,columns:2,cards:[]}}constructor(){super(),this._expanded=!1,this._childCards=null}setConfig(e){if(!e.entity)throw new Error("entity is required");const t=this.config?.cards;this.config={columns:2,...e};const i=this.config.cards;JSON.stringify(t)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}firstUpdated(){this._createChildCards()}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&this._childCards&&this._childCards.forEach(e=>e.hass=this.hass)}async _createChildCards(){const e=this.config?.cards;if(!e||0===e.length)return void(this._childCards=[]);const t=await pe();this._childCards=await Promise.all(e.map(async e=>{const i=await t.createCardElement(e);return this.hass&&(i.hass=this.hass),i})),this.requestUpdate()}_toggleExpand(e){e?.stopPropagation?.(),this._expanded=!this._expanded,this._fireHaptic("selection")}render(){if(!this.config||!this.hass)return I``;const e=this._stateObj,t=this._isUnavailable(e);!t&&this._isActive;const i=!t&&this._showSlider,s=t?[]:this._subButtons,o=this._getContainerBg(),n=this._getTextColor(),a=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=t?Me("unavailable",this.hass):this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c,u=this.config.columns||2;return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${o}; color: ${n};"
          @pointerdown=${i?this._onPointerDown:void 0}
          @click=${i?void 0:()=>this._handleTap()}
        >
          ${i?I`<div class="fill" style="width: ${a}%; background-color: ${r}; opacity: 1;"></div>`:W}

          <div class="icon-container">
            ${l?I`<ha-icon .icon=${l} style="color: ${n};"></ha-icon>`:I`<ha-state-icon .hass=${this.hass} .stateObj=${e} style="color: ${n};"></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${!h&&d?I`<div class="subtitle">${d}</div>`:W}
            ${p?I`<div class="state">${p}</div>`:W}
          </div>

          <div class="sub-buttons">
            ${s.map(e=>I`
                <button
                  class="sub-btn"
                  title=${e.name||""}
                  @click=${t=>this._handleSubButton(e,t)}
                >
                  <ha-icon .icon=${e.icon}></ha-icon>
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
            ${this._childCards?.map(e=>I`<div class="grid-item">${e}</div>`)}
          </div>
        </div>
      </div>
    `}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}getGridOptions(){return{columns:12,rows:"auto"}}}customElements.define("materia-room",Ke),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"Materia card with expandable child-card grid.",preview:!0});const Ze=n`
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
`;customElements.define("materia-climate-editor",class extends Be{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,template:!0,selector:{text:{}}}]},{title:"Sensors",icon:"mdi:thermometer",fields:[{name:"temperature_entity",label:"Temperature sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",label:"Outdoor temperature sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}]}});class Qe extends(xe(ce)){static get properties(){return{hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_resolvedName:{state:!0}}}static styles=[$e,ke,Ze];static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("climate."))||"climate.example";return{entity:t,name:"Climate",step:.5}}setConfig(e){if(!e.entity)throw new Error("entity is required");if(!e.name)throw new Error("name is required");this.config={step:.5,...e}}getCardSize(){return 3}get _entity(){return this.hass?.states[this.config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return null!=this._optimisticTemp?this._optimisticTemp:this._entity?.attributes?.temperature}get _currentTemp(){return this.config.temperature_entity?this.hass?.states[this.config.temperature_entity]?.state:this._entity?.attributes?.current_temperature}get _humidity(){if(this.config.humidity_entity)return this.hass?.states[this.config.humidity_entity]?.state}get _outdoorTemp(){if(this.config.outdoor_temp_entity)return this.hass?.states[this.config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--primary-text-color)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant))"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-on-surface)"}}_statusText(){const e=this._currentTemp,t=this._humidity,i=this._outdoorTemp,s=[];return null!=e&&s.push(`${e}°`),null!=t&&s.push(`${t}%`),null!=i&&s.push(`${i}°`),s.join(" · ")||""}_adjustTemp(e){const t=this._targetTemp;if(null==t)return;const i=this.config.step??.5,s=Number(this._entity?.attributes?.min_temp??7),o=Number(this._entity?.attributes?.max_temp??35),n=Math.min(o,Math.max(s,Math.round((Number(t)+e)/i)*i));this._optimisticTemp=n,this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:n}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4)}updated(e){if(e.has("hass")&&this.hass&&this._resolveField("name","_resolvedName"),e.has("hass")&&null!=this._optimisticTemp){const e=Number(this._entity?.attributes?.temperature);Number.isFinite(e)&&Math.abs(e-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer)}_handleTap(e){e.target.closest(".btn")||this._handleAction(this.config.tap_action??{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const e=this._entity,t=this._isUnavailable(e),i="off"===this._mode||t,s=t?"Unavailable":i?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return I`
      <ha-card
        class="${t?"unavailable":""}"
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
              ></ha-icon>`:W}
        </div>

        <div class="center">
          <div class="center-side">
            ${i?W:I`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${e=>{e.stopPropagation(),this._adjustTemp(-this.config.step)}}
                  >
                    <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>

          <span class="temp ${i?"off":""}">${s}</span>

          <div class="center-side">
            ${i?W:I`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${e=>{e.stopPropagation(),this._adjustTemp(this.config.step)}}
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
    `}}customElements.define("materia-climate",Qe),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"Climate thermostat with mode-based theming and temperature controls.",preview:!0});const Je=[$e,we,ke,n`
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
`];customElements.define("materia-weather-editor",class extends Be{_formData(){return{show_temperature:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Sensors",icon:"mdi:water-percent",fields:[{name:"show_temperature",label:"Show temperature",selector:{boolean:{}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const et={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"},tt={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class it extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}static styles=Je;setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"",s=!1!==this.config.show_temperature;let o=e?.attributes?.temperature,n=e?.attributes?.temperature_unit||"°";if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&(o=e.state,n=e.attributes?.unit_of_measurement||n)}const a=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||et[i]||"mdi:weather-partly-cloudy";let r=null;if(this.config.humidity_entity){const e=this.hass.states[this.config.humidity_entity];e&&(r=e.state)}null==r&&null!=e?.attributes?.humidity&&(r=e.attributes.humidity);const l=tt[i]||this._capitalize(i.replace(/-|_/g," ")),c=this._isTemplate(this.config.name)?this._resolvedName:this.config.name,d=s&&null!=o?`${o}${n}`:null;let h;h=t?"Unavailable":c||(d||(l||"—"));const p=[];t||(d&&h!==d&&p.push(d),h!==l&&p.push(l),null!=r&&p.push(`${r}%`));const u=p.join(" · ");return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""}"
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
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}function st(e,t,i,s=12){return ot(e,t,i,{vertices:s,innerRadius:.8,rounding:.5,rotate:-Math.PI/2})}function ot(e,t,i,{vertices:s,innerRadius:o=null,rounding:n=.2,rotate:a=0}={}){const r=[],l=null!=o?2*s:s;for(let s=0;s<l;s++){const c=null!=o&&s%2==1?i*o:i,d=a+s/l*Math.PI*2;r.push({x:e+c*Math.cos(d),y:t+c*Math.sin(d),r:n*i})}return function(e){return at(nt(e))}(r)}function nt(e){const t=e.length,i=[];for(let s=0;s<t;s++){const o=e[(s-1+t)%t],n=e[s],a=e[(s+1)%t],r=[o.x-n.x,o.y-n.y],l=[a.x-n.x,a.y-n.y],c=Math.hypot(...r),d=Math.hypot(...l);r[0]/=c,r[1]/=c,l[0]/=d,l[1]/=d;const h=r[0]*l[0]+r[1]*l[1],p=Math.acos(Math.min(1,Math.max(-1,h)))/2;let u=n.r/Math.tan(p);u=Math.min(u,.5*c,.5*d);const m=u*Math.tan(p),g=[n.x+r[0]*u,n.y+r[1]*u],f=[n.x+l[0]*u,n.y+l[1]*u],_=r[0]+l[0],b=r[1]+l[1],v=Math.hypot(_,b)||1,y=m/Math.sin(p),x=[n.x+_/v*y,n.y+b/v*y],w=r[0]*l[1]-r[1]*l[0];i.push({T1:g,T2:f,C:x,rEff:m,sweep:w>0?0:1})}return i}function at(e){const t=e.length;let i=`M${e[0].T1[0].toFixed(2)} ${e[0].T1[1].toFixed(2)} `;for(let s=0;s<t;s++){const o=e[s],n=e[(s+1)%t];i+=`A${o.rEff.toFixed(2)} ${o.rEff.toFixed(2)} 0 0 ${o.sweep} ${o.T2[0].toFixed(2)} ${o.T2[1].toFixed(2)} `,i+=`L${n.T1[0].toFixed(2)} ${n.T1[1].toFixed(2)} `}return i+"Z"}function rt(e,t,i,s=0){return ct(e,t,i,s,[{x:.457,y:.296,r:.007},{x:.5,y:-.051,r:.007}],15)}function lt(e,t,i,s=0){return ct(e,t,i,s,[{x:.193,y:.277,r:.053},{x:.176,y:.055,r:.053}],10)}function ct(e,t,i,s,o,n){const a=[];for(let e=0;e<n;e++){const t=s+e/n*Math.PI*2,i=Math.cos(t),r=Math.sin(t);for(const e of o){const t=e.x-.5,s=e.y-.5;a.push({x:.5+t*i-s*r,y:.5+t*r+s*i,r:e.r})}}const r=nt(a),l=[];for(const e of r){const t=Math.atan2(e.T1[1]-e.C[1],e.T1[0]-e.C[0]);let i=Math.atan2(e.T2[1]-e.C[1],e.T2[0]-e.C[0])-t;if(1===e.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=8;s++){const o=t+i*s/8;l.push([e.C[0]+e.rEff*Math.cos(o),e.C[1]+e.rEff*Math.sin(o)])}}const c=Math.max(...l.map(([e,t])=>Math.hypot(e-.5,t-.5))),d=i/c,h=i=>[e+(i[0]-.5)*d,t+(i[1]-.5)*d];return at(r.map(e=>({T1:h(e.T1),T2:h(e.T2),C:h(e.C),rEff:e.rEff*d,sweep:e.sweep})))}function dt(e,t,i,{points:s,reps:o=1,mirroring:n=!1,rotate:a=0}){const r=function(e,t,i,s=.5,o=.5){const n=[];if(!i){const i=e.length;for(let a=0;a<i*t;a++){const r=e[a%i],l=360*Math.floor(a/i)/t*(Math.PI/180),c=r.x-s,d=r.y-o;n.push({x:s+c*Math.cos(l)-d*Math.sin(l),y:o+c*Math.sin(l)+d*Math.cos(l),r:r.r})}return n}const a=e.map(e=>180*Math.atan2(e.y-o,e.x-s)/Math.PI),r=e.map(e=>Math.hypot(e.x-s,e.y-o)),l=2*t,c=360/l;for(let t=0;t<l;t++){const i=t%2==0;for(let l=0;l<e.length;l++){const d=i?l:e.length-1-l;if(!(d>0||i))continue;const h=(c*t+(i?a[d]:c-a[d]+2*a[0]))*(Math.PI/180);n.push({x:s+Math.cos(h)*r[d],y:o+Math.sin(h)*r[d],r:e[d].r})}}return n}(s,o,n),l=Math.cos(a),c=Math.sin(a),d=r.map(e=>{const t=e.x-.5,i=e.y-.5;return{x:.5+t*l-i*c,y:.5+t*c+i*l,r:e.r}}),h=nt(d),p=function(e){let t=1/0,i=1/0,s=-1/0,o=-1/0;const n=(e,n)=>{e<t&&(t=e),e>s&&(s=e),n<i&&(i=n),n>o&&(o=n)};for(const t of e){const e=Math.atan2(t.T1[1]-t.C[1],t.T1[0]-t.C[0]);let i=Math.atan2(t.T2[1]-t.C[1],t.T2[0]-t.C[0])-e;if(1===t.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=16;s++){const o=e+i*s/16;n(t.C[0]+t.rEff*Math.cos(o),t.C[1]+t.rEff*Math.sin(o))}}return{minX:t,minY:i,maxX:s,maxY:o}}(h),u=p.maxX-p.minX,m=p.maxY-p.minY,g=i/Math.max(u,m),f=(p.minX+p.maxX)/2,_=(p.minY+p.maxY)/2,b=i=>[e+(i[0]-f)*g,t+(i[1]-_)*g];return at(h.map(e=>({T1:b(e.T1),T2:b(e.T2),C:b(e.C),rEff:e.rEff*g,sweep:e.sweep})))}function ht(e,t,i,s,o){const n=s=>{const o=(s-90)*Math.PI/180;return[e+i*Math.cos(o),t+i*Math.sin(o)]},[a,r]=n(s),[l,c]=n(o),d=Math.abs(o-s)>180?1:0;return`M${a.toFixed(2)} ${r.toFixed(2)} A${i} ${i} 0 ${d} 1 ${l.toFixed(2)} ${c.toFixed(2)}`}function pt(e,t,i,s){const o=Math.cos(2*Math.PI*s);if(s<.02||s>.98)return"";const n=Math.max(.01,Math.abs(o)*i).toFixed(2),a=`${e} ${t-i}`,r=`${e} ${t+i}`;return s<=.5?`M${a} A${i} ${i} 0 0 1 ${r} A${n} ${i} 0 0 ${o>0?0:1} ${a} Z`:`M${a} A${i} ${i} 0 0 0 ${r} A${n} ${i} 0 0 ${o>0?1:0} ${a} Z`}function ut(e,t){const i={new_moon:0,waxing_crescent:.125,first_quarter:.25,waxing_gibbous:.375,full_moon:.5,waning_gibbous:.625,last_quarter:.75,waning_crescent:.875},s=t?e?.states?.[t]:e?.states?.["sensor.moon_phase"]??e?.states?.["sensor.moon"];return s&&s.state in i?i[s.state]:null}customElements.define("materia-weather",it),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather condition card with automatic icon mapping.",preview:!0});const mt="var(--md-sys-cust-color-weather-sun, #FFC83D)",gt="var(--md-sys-cust-color-weather-cloud, #E6EAF0)",ft="var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)",_t="var(--md-sys-cust-color-weather-rain, #5FA8F5)",bt="var(--md-sys-cust-color-weather-sun, #FFC83D)",vt="var(--md-sys-cust-color-weather-moon, #DCE3F7)";let yt=0;function xt(e,t,i,s){const o=.1*i,n=72,a=[];for(let s=0;s<n;s++){const r=s/n*Math.PI*2,l=i+o*Math.cos(9*r);a.push([e+l*Math.cos(r),t+l*Math.sin(r)])}let r=`M${a[0][0].toFixed(2)} ${a[0][1].toFixed(2)} `;for(let e=0;e<n;e++){const t=a[(e-1+n)%n],i=a[e],s=a[(e+1)%n],o=a[(e+2)%n],l=i[0]+(s[0]-t[0])/6,c=i[1]+(s[1]-t[1])/6,d=s[0]-(o[0]-i[0])/6,h=s[1]-(o[1]-i[1])/6;r+=`C${l.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} `}return H`<path d=${r+"Z"} fill=${s} />`}function wt(e,t,i,s){return H`
    <g fill=${s} transform=${`translate(${e} ${t}) scale(${i})`}>
      <circle cx="-4" cy="1" r="4" />
      <circle cx="1" cy="-1.5" r="5" />
      <circle cx="5" cy="1.5" r="3.6" />
      <rect x="-6.2" y="1.2" width="13.4" height="5" rx="2.6" />
    </g>`}function kt(e,t,i){return H`<g stroke=${e} stroke-width="1.8" stroke-linecap="round">
    ${t.map(e=>H`<line x1=${e} y1=${i} x2=${e-1.5} y2=${i+3.5} />`)}
  </g>`}function $t(e,t){return H`<g fill=${"var(--md-sys-cust-color-weather-snow, #FFFFFF)"}>
    ${e.map(e=>H`<circle cx=${e} cy=${t} r="1.2" />`)}
  </g>`}const Ct={sunny:e=>xt(12,12,7.5,e.sun),clear:e=>xt(12,12,7.5,e.sun),"clear-night":(e,t)=>{if(null==t)return H`<path d="M17 14.5 A7 7 0 1 1 10.5 5 A5.5 5.5 0 0 0 17 14.5 Z" fill=${e.moon} />`;const i=pt(12,12,7.2,t);return H`
      <circle cx="12" cy="12" r="7.2" fill="color-mix(in srgb, ${vt} 22%, transparent)" />
      ${i?H`<path d=${i} fill=${e.moon} />`:""}`},partlycloudy:e=>H`${xt(12,8,5.2,e.sun)}${wt(10,15,.85,e.cloud)}`,partly_cloudy:e=>H`${xt(12,8,5.2,e.sun)}${wt(10,15,.85,e.cloud)}`,cloudy:e=>wt(12,12,1.1,e.cloudDk),rainy:e=>H`${wt(12,10,1,e.cloudDk)}${kt(_t,[8,12,16],17)}`,pouring:e=>H`${wt(12,9.5,1,e.cloudDk)}${kt(_t,[7,10,13,16],16.5)}`,snowy:e=>H`${wt(12,10,1,e.cloud)}${$t([8,12,16],18)}`,"snowy-rainy":e=>H`${wt(12,10,1,e.cloud)}${kt(_t,[9,15],17)}${$t([12],18)}`,fog:e=>H`${wt(12,9,.95,e.cloudDk)}<g stroke=${"var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)"} stroke-width="1.8" stroke-linecap="round">
      <line x1="6" y1="17" x2="18" y2="17" /><line x1="7.5" y1="20" x2="16.5" y2="20" /></g>`,hail:e=>H`${wt(12,10,1,e.cloudDk)}${$t([8,12,16],18)}`,lightning:e=>H`${wt(12,10,1,e.cloudDk)}<path d="M12 14 l-2.5 5 h2 l-1 4 4.5-6.5 h-2.2 l1.5-2.5 z" fill=${bt} />`,"lightning-rainy":e=>H`${wt(12,9.5,1,e.cloudDk)}${kt(_t,[8,16],17)}<path d="M12 14 l-2 4 h1.8 l-0.8 3.5 4-5.5 h-2 l1.3-2 z" fill=${bt} />`,windy:()=>H`<g stroke=${ft} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,"windy-variant":()=>H`<g stroke=${ft} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,exceptional:e=>wt(12,12,1.1,e.cloudDk)};function St(e,t=null){const i=Ct[e]||Ct.cloudy,s=++yt;return H`${function(e){return H`<defs>
    <radialGradient id="wxSunG-${e}" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${mt} 55%, #FFF4CF)" />
      <stop offset="55%" stop-color=${mt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${mt} 72%, #B85C00)" />
    </radialGradient>
    <linearGradient id="wxCloudG-${e}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${gt} 30%, #FFFFFF)" />
      <stop offset="70%" stop-color=${gt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${gt} 78%, #8B94A5)" />
    </linearGradient>
    <linearGradient id="wxCloudDkG-${e}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${ft} 45%, #FFFFFF)" />
      <stop offset="70%" stop-color=${ft} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${ft} 72%, #5A6474)" />
    </linearGradient>
    <radialGradient id="wxMoonG-${e}" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${vt} 45%, #FFFFFF)" />
      <stop offset="60%" stop-color=${vt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${vt} 62%, #4A5AB8)" />
    </radialGradient>
  </defs>`}(s)}${i(function(e){return{sun:`url(#wxSunG-${e})`,cloud:`url(#wxCloudG-${e})`,cloudDk:`url(#wxCloudDkG-${e})`,moon:`url(#wxMoonG-${e})`}}(s),t)}`}const Et=[$e,we,n`
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
`];customElements.define("materia-weather-tile-editor",class extends Be{_formData(){return{show_minmax:!0,mirror:!1,size:10,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"icon",label:"Custom icon (overrides the colored glyph)",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Min / Max",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show min / max",selector:{boolean:{}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}},{name:"mirror",label:"Mirror (temperature left, icon right)",selector:{boolean:{}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / temperature",color:!0,template:!0,selector:{text:{}}},{name:"minmax_color",label:"Min / max color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class At extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedMinmaxColor:{state:!0},_forecast:{state:!0}};static styles=Et;static getConfigElement(){return document.createElement("materia-weather-tile-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t,show_minmax:!0}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("minmax_color","_resolvedMinmaxColor"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"";let s=e?.attributes?.temperature;if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&(s=e.state)}const o=null!=this._num(s)?`${this._num(s)}°`:"—",n=e=>{const t=e?this.hass.states[e]:null;return t&&!this._isUnavailable(t)?t.state:null};let a=n(this.config.low_entity),r=n(this.config.high_entity);const l=this._forecast?.[0]||e?.attributes?.forecast?.[0];null==a&&null!=l?.templow&&(a=l.templow),null==r&&null!=l?.temperature&&(r=l.temperature);const c=this.config.show_minmax&&(null!=this._num(a)||null!=this._num(r)),d=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,h=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,p=this._isTemplate(this.config.minmax_color)?this._resolvedMinmaxColor:this.config.minmax_color;let u="number"==typeof this.config.tilt?this.config.tilt:{right:-45,left:45,none:0}[this.config.tilt]??-45;this.config.mirror&&(u=-u);const m=this.config.icon_size??53,g=this.config.text_size??30,f=this.config.width??115,_=(this.config.height??85)/100,b=this.config.icon_x??5,v=this.config.icon_y??10,y=this.config.temp_x??10,x=this.config.temp_y??15,w=`--wt-size:${["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][Math.min(10,Math.max(1,this.config.size??10))-1]};--wt-tilt:${u}deg;--wt-icon-size:${m}cqi;--wt-temp-size:${g}cqi;--wt-width:${f}%;--wt-ratio:${_};--wt-icon-x:${b}%;--wt-icon-y:${v}%;--wt-temp-x:${y}%;--wt-temp-y:${x}%;${d?`--wt-bg:${d};`:""}${h?`--wt-fg:${h};`:""}`+(p?`--wt-minmax:${p};--wt-minmax-opacity:1;`:""),k=this.config.icon;return I`
      <ha-card>
        <div
          class="blob ${t?"unavailable":""} ${this.config.mirror?"flip":""}"
          style=${w}
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <div class="readout">
            ${c?I`<div class="minmax">
                  <span>↑${null!=this._num(r)?`${this._num(r)}°`:"—"}</span>
                  <span>↓${null!=this._num(a)?`${this._num(a)}°`:"—"}</span>
                </div>`:""}
            <div class="temp">${t?"—":o}</div>
          </div>
          ${k?I`<ha-icon class="wx-mono" .icon=${k}></ha-icon>`:H`<svg class="wx" viewBox="0 0 24 24">${St(i,ut(this.hass,this.config.moon_entity))}</svg>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 3}}customElements.define("materia-weather-tile",At),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-tile",name:"Materia Weather Tile",description:"Large blobby weather widget with a big temperature and colored condition icon.",preview:!0});const zt=[$e,we,ke,ge,n`
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
  `];customElements.define("materia-weather-hero-editor",class extends Be{_formData(){return{show_condition:!0,show_icon:!0,show_feels_like:!0,show_minmax:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"feels_like_entity",label:"Feels-like sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"show_condition",label:"Show condition text",selector:{boolean:{}}},{name:"show_icon",label:"Show condition glyph",selector:{boolean:{}}},{name:"show_feels_like",label:"Show feels-like",selector:{boolean:{}}}]},{title:"Night / Day",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show night / day range",selector:{boolean:{}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"night_label",label:"Night label",selector:{text:{}}},{name:"day_label",label:"Day label",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const Mt={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Tt extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColorOn:{state:!0}};static styles=zt;static getConfigElement(){return document.createElement("materia-weather-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color_on","_resolvedColorOn"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"",s=Mt[i]||this._capitalize(String(i).replace(/-|_/g," "));let o=e?.attributes?.temperature;if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&!this._isUnavailable(e)&&(o=e.state)}const n=this._num(o);let a=e?.attributes?.apparent_temperature;if(this.config.feels_like_entity){const e=this.hass.states[this.config.feels_like_entity];e&&!this._isUnavailable(e)&&(a=e.state)}const r=this._num(a),l=e=>{const t=e?this.hass.states[e]:null;return t&&!this._isUnavailable(t)?t.state:null};let c=l(this.config.low_entity),d=l(this.config.high_entity);const h=this._forecast?.[0]||e?.attributes?.forecast?.[0];null==c&&null!=h?.templow&&(c=h.templow),null==d&&null!=h?.temperature&&(d=h.temperature);const p=this._num(c),u=this._num(d),m=this.config.night_label??"Night",g=this.config.day_label??"Day",f=this.config.separator??"•",_=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on;return I`
      <ha-card>
        <div
          class="hero ${t?"unavailable":""}"
          style="${_?`--wh-fg:${_};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          ${!1!==this.config.show_condition?I`<div class="condition">
                ${!1===this.config.show_icon||t?"":H`<svg class="cond-glyph" viewBox="0 0 24 24">${St(i,ut(this.hass,this.config.moon_entity))}</svg>`}
                <span>${t?"—":s}</span>
              </div>`:""}
          <div class="temp">
            <span class="temp-value">${t||null==n?"—":n}</span><span class="temp-deg">°</span>
          </div>
          ${!1===this.config.show_feels_like||null==r||t?"":I`<div class="feels">${this.config.feels_like_label??"Feels like"} ${r}°</div>`}
          ${!1===this.config.show_minmax||null==p&&null==u||t?"":I`<div class="minmax">
                <span>${m}: ${null!=p?`${p}°`:"—"}</span>
                <span class="sep">${f}</span>
                <span>${g}: ${null!=u?`${u}°`:"—"}</span>
              </div>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}function Ft(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}function Ot(e,{locale:t="en",showPrecip:i=!0,minPrecip:s=10,moonPhase:o=null}={}){return e.map(e=>{const n=Ft(e.temperature),a=Ft(e.precipitation_probability),r=new Date(e.datetime),l=Number.isNaN(r.getTime())?"":r.toLocaleTimeString(t,{hour:"numeric"});return I`
      <div class="hour">
        <span class="h-temp">${null!=n?`${n}°`:"—"}</span>
        <svg class="h-glyph" viewBox="0 0 24 24">${St(e.condition,o)}</svg>
        ${i&&null!=a&&a>=s?I`<span class="h-precip">${a}%</span>`:I`<span class="h-precip empty"></span>`}
        <span class="h-time">${l}</span>
      </div>
    `})}customElements.define("materia-weather-hero",Tt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-hero",name:"Materia Weather Hero",description:"Current-conditions hero: condition, huge temperature, feels-like and night/day range.",preview:!0});const qt=n`
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
`,Dt=[$e,we,ke,ge,qt,n`
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
  `],Pt=[$e,we,ke,ge,qt,n`
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
  `];customElements.define("materia-forecast-daily-editor",class extends Be{_formData(){return{days:10,show_hourly:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"days",label:"Days shown",selector:{number:{min:3,max:15,step:1,mode:"slider"}}},{name:"show_hourly",label:"Tap a day to expand its hourly detail",selector:{boolean:{}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}},{name:"today_label",label:"Label for today",selector:{text:{}}}]}]}});class Ut extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_hourly:{state:!0},_selected:{state:!0},_expanded:{state:!0}};static styles=Pt;static getConfigElement(){return document.createElement("materia-forecast-daily-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0,this._selected=0,this._expanded=!1}updated(e){e.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._subscribeForecast()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=null,this._hourly=[],this._hourlyByDay=new Map;const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(t.catch(()=>{}),this._fcUnsubs=[t],!1!==this.config.show_hourly){const t=this.hass.connection.subscribeMessage(e=>{this._hourly=e?.forecast||[];const t=new Map;for(const e of this._hourly){const i=this._dayKey(e.datetime);if(!i)continue;const s=t.get(i)||[];s.length<24&&s.push(e),t.set(i,s)}this._hourlyByDay=t},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});t.catch(()=>{}),this._fcUnsubs.push(t)}}_unsubForecast(){for(const e of this._fcUnsubs||[])e.then(e=>e&&e()).catch(()=>{});this._fcUnsubs=null,this._fcEntity=void 0}_dayKey(e){const t=this.hass?.config?.time_zone;if(!this._dayFmt||this._dayFmtTz!==t){this._dayFmtTz=t;try{this._dayFmt=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"})}catch{this._dayFmt=new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"2-digit",day:"2-digit"})}}const i=new Date(e);return Number.isNaN(i.getTime())?"":this._dayFmt.format(i)}_hoursFor(e){return e?.datetime&&this._hourlyByDay?.size&&this._hourlyByDay.get(this._dayKey(e.datetime))||[]}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}_dayLabel(e,t){const i=new Date(e);if(Number.isNaN(i.getTime()))return"";const s=new Date;if(0===t&&this._dayKey(e)===this._dayKey(s))return this.config.today_label??"Today";const o=this.hass?.locale?.language||navigator.language||"en";return i.toLocaleDateString(o,{weekday:"short"})}_onPointerDown(e){if("mouse"!==e.pointerType)return;const t=e.currentTarget;this._dragStartX=e.clientX,this._dragStartScroll=t.scrollLeft,this._didDrag=!1,this._dragPointerId=e.pointerId}_onPointerMove(e){if(null==this._dragStartX)return;const t=e.clientX-this._dragStartX;!this._didDrag&&Math.abs(t)>4&&(this._didDrag=!0,e.currentTarget.setPointerCapture(this._dragPointerId)),this._didDrag&&(e.currentTarget.scrollLeft=this._dragStartScroll-t)}_onPointerUp(e){null!=this._dragStartX&&(e.currentTarget.releasePointerCapture?.(e.pointerId),this._dragStartX=null,setTimeout(()=>{this._didDrag=!1},0))}_select(e,t){this._didDrag||(this._expanded=e!==this._selected||!this._expanded,this._selected=e,this.dispatchEvent(new CustomEvent("materia-forecast-day-selected",{detail:{index:e,day:t},bubbles:!0,composed:!0})))}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=(this._forecast?.length?this._forecast:e?.attributes?.forecast||[]).slice(0,this.config.days??10);if(!i.length)return I``;const s=!1!==this.config.show_precipitation,o=this.config.min_precipitation??10,n=i[this._selected],a=!1!==this.config.show_hourly&&this._expanded&&n?this._hoursFor(n):[],r=this._expanded&&a.length>0,l=this.hass?.locale?.language||navigator.language||"en";return I`
      <ha-card>
        <div
          class="row ${t?"unavailable":""}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${i.map((e,t)=>{const i=this._num(e.temperature),n=this._num(e.templow),a=this._num(e.precipitation_probability),r=t===this._selected,l=!1!==this.config.show_hourly&&this._hoursFor(e).length>0;return I`
              <button
                class="pill ${r?"selected":""} ${l?"":"static"}"
                @click=${l?()=>this._select(t,e):void 0}
              >
                <span class="hi">${null!=i?`${i}°`:"—"}</span>
                <span class="lo">${null!=n?`${n}°`:"—"}</span>
                <svg class="glyph" viewBox="0 0 24 24">${St(e.condition,ut(this.hass,this.config.moon_entity))}</svg>
                ${s&&null!=a&&a>=o?I`<span class="precip">${a}%</span>`:I`<span class="precip empty"></span>`}
                <span class="day">${this._dayLabel(e.datetime,t)}</span>
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
              ${r?Ot(a,{locale:l,showPrecip:s,minPrecip:o,moonPhase:ut(this.hass,this.config.moon_entity)}):""}
            </div>
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-daily",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-daily",name:"Materia Forecast Daily",description:"Pixel-style daily forecast pill row with colored glyphs and precipitation chance.",preview:!0});customElements.define("materia-forecast-hourly-editor",class extends Be{_formData(){return{hours:24,show_header:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"name",label:"Header title",selector:{text:{}}},{name:"show_header",label:"Show header",selector:{boolean:{}}},{name:"hours",label:"Hours shown",selector:{number:{min:6,max:48,step:1,mode:"slider"}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}}]}]}});class Rt extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0}};static styles=Dt;static getConfigElement(){return document.createElement("materia-forecast-hourly-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_onPointerDown(e){if("mouse"!==e.pointerType)return;const t=e.currentTarget;this._dragStartX=e.clientX,this._dragStartScroll=t.scrollLeft,this._captured=!1,this._dragPointerId=e.pointerId}_onPointerMove(e){if(null==this._dragStartX)return;const t=e.clientX-this._dragStartX;!this._captured&&Math.abs(t)>4&&(this._captured=!0,e.currentTarget.setPointerCapture(this._dragPointerId)),this._captured&&(e.currentTarget.scrollLeft=this._dragStartScroll-t)}_onPointerUp(e){null!=this._dragStartX&&(e.currentTarget.releasePointerCapture?.(e.pointerId),this._dragStartX=null)}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=(this._forecast||[]).slice(0,this.config.hours??24);if(!i.length)return I``;const s=this.hass?.locale?.language||navigator.language||"en";return I`
      <ha-card class="${t?"unavailable":""}">
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
          ${Ot(i,{locale:s,showPrecip:!1!==this.config.show_precipitation,minPrecip:this.config.min_precipitation??10,moonPhase:ut(this.hass,this.config.moon_entity)})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-hourly",Rt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-hourly",name:"Materia Forecast Hourly",description:"Pixel-style hourly forecast strip with colored glyphs and precipitation chance.",preview:!0});const Nt=[$e,we,ke,ge,n`
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
  `],jt=[{value:"wind",label:"Wind"},{value:"uv",label:"UV index"},{value:"aqi",label:"Air quality"},{value:"pollen",label:"Pollen"},{value:"precipitation",label:"Precipitation"},{value:"sun",label:"Sunrise & sunset"},{value:"visibility",label:"Visibility"},{value:"humidity",label:"Humidity"},{value:"pressure",label:"Pressure"}];customElements.define("materia-weather-metric-editor",class extends Be{_formData(){return{metric:"wind",...this._config}}_sectionsSignature(){return this._config?.metric||""}get _sections(){const e=this._config?.metric,t={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"metric",required:!0,selector:{select:{mode:"dropdown",options:jt}}},..."sun"!==e&&"pollen"!==e?[{name:"entity",label:"Weather entity",selector:{entity:{domain:"weather"}}},{name:"sensor",label:"Sensor override (optional)",selector:{entity:{domain:"sensor"}}}]:[],{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon (overrides default)",selector:{icon:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"wind"===e&&i.fields.push({name:"unit",label:"Unit (converts from the source)",selector:{select:{mode:"dropdown",options:[{value:"km/h",label:"km/h"},{value:"m/s",label:"m/s"},{value:"mph",label:"mph"},{value:"kn",label:"knots"},{value:"bft",label:"Beaufort"}]}}},{name:"bearing_entity",label:"Bearing sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"from_label",label:'"From" label',selector:{text:{}}}),"humidity"===e&&i.fields.push({name:"dew_entity",label:"Dew point sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"dew_label",label:"Dew point label",selector:{text:{}}}),"pressure"===e&&i.fields.push({name:"min",label:"Gauge min",selector:{number:{mode:"box"}}},{name:"max",label:"Gauge max",selector:{number:{mode:"box"}}}),"precipitation"===e&&i.fields.push({name:"total_label",label:"Subtitle when raining",selector:{text:{}}},{name:"none_label",label:'"None expected" label',selector:{text:{}}}),"sun"===e&&i.fields.push({name:"sun_entity",label:"Sun entity",selector:{entity:{domain:"sun"}}},{name:"moon_entity",label:"Moon phase sensor (built-in Moon integration)",selector:{entity:{domain:"sensor"}}}),"pollen"===e&&i.fields.push({name:"entities",label:"Pollen sensors",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"variant",label:"Variant",selector:{select:{mode:"dropdown",options:[{value:"gauges",label:"Gauges (wide)"},{value:"small",label:"Small (dot list)"}]}}},{name:"max_shown",label:"Max species shown (worst first)",selector:{number:{min:1,max:6,step:1,mode:"slider"}}},{name:"hide_inactive",label:"Hide species at 'none'",selector:{boolean:{}}},{name:"max",label:"Scale max for numeric sensors (default 4)",selector:{number:{min:1,max:10,mode:"box"}}});const s={title:"Appearance",icon:"mdi:palette-outline",fields:[..."wind"===e?[{name:"shape_color",label:"Shape color",color:!0,template:!0,selector:{text:{}}}]:[],{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},o={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[t,i,s,o]:[t,s,o]}});const Bt="var(--md-sys-cust-color-scale-green, #5E9E50)",Lt="var(--md-sys-cust-color-scale-yellow, #C7A128)",It="var(--md-sys-cust-color-scale-orange, #D9713C)",Ht="var(--md-sys-cust-color-scale-red, #C94D42)",Vt="var(--md-sys-cust-color-scale-purple, #8A4DA3)",Wt=[{max:2,label:"Low",color:Bt},{max:5,label:"Moderate",color:Lt},{max:7,label:"High",color:It},{max:10,label:"Very high",color:Ht},{max:1/0,label:"Extreme",color:Vt}],Gt=[{max:50,label:"Good air quality",color:Bt},{max:100,label:"Moderate air quality",color:Lt},{max:150,label:"Unhealthy for sensitive groups",color:It},{max:200,label:"Unhealthy air quality",color:Ht},{max:300,label:"Very unhealthy air quality",color:Vt},{max:1/0,label:"Hazardous air quality",color:"var(--md-sys-cust-color-scale-maroon, #7A4040)"}],Xt=["None","Low","Moderate","High","Very high"];class Yt extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=Nt;static getConfigElement(){return document.createElement("materia-weather-metric-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t,metric:"wind"}}setConfig(e){if(!e.metric)throw new Error("metric is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),"precipitation"!==this.config.metric||this.config.sensor?this._unsubForecast():this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){"precipitation"!==this.config?.metric||this.config.sensor||this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_numRaw(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}_value(e){if(this.config.sensor){const e=this.hass.states[this.config.sensor];return e&&!this._isUnavailable(e)?this._numRaw(e.state):null}const t=this.hass.states[this.config.entity];return this._numRaw(t?.attributes?.[e])}_weatherAttr(e){return this.hass.states[this.config.entity]?.attributes?.[e]}_scallopWave(e){const t=200/12;let i=`M0 ${e+3.2} `;for(let s=0;s<200;s+=t)i+=`Q ${s+t/2} ${e-3.2} ${s+t} ${e+3.2} `;return i+"V100 H0 Z"}render(){if(!this.hass||!this.config)return I``;const e={wind:()=>this._wind(),uv:()=>this._uv(),aqi:()=>this._aqi(),pollen:()=>this._pollen(),precipitation:()=>this._precipitation(),sun:()=>this._sun(),visibility:()=>this._visibility(),humidity:()=>this._humidity(),pressure:()=>this._pressure()}[this.config.metric];if(!e)return I``;const t=e();if(t===W)return I``;const i=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,s=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,o=null!=this.config.size?Math.min(10,Math.max(1,this.config.size)):null;return I`
      <ha-card
        style="--wm-size:${null!=o?["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][o-1]:"200px"};${i?`--wm-color:${i};`:""}${s?`--wm-color-on:${s};`:""}${this.config.shape_color?`--wm-shape:${this.config.shape_color};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||(this.config.sensor||this.config.entity?{action:"more-info",entity:this.config.sensor||this.config.entity}:void 0))}
      >
        ${t}
      </ha-card>
    `}_header(e,t){return I`<div class="header"><ha-icon icon=${this.config.icon||e}></ha-icon><span>${t}</span></div>`}_hint(e,t,i){return I`
      <div class="rect-tile">
        ${this._header(e,t)}
        <div class="sub hint">${i}</div>
      </div>
    `}_convertWind(e,t,i){const s={"km/h":1,"m/s":3.6,mph:1.609344,kn:1.852,knots:1.852,"ft/s":1.09728};if(!i||i===t)return{v:e,u:t};const o=e*(s[t]??1);if("bft"===i){let e=[1,5,11,19,28,38,49,61,74,88,102,117].findIndex(e=>o<e);return-1===e&&(e=12),{v:e,u:"Bft"}}return{v:o/(s[i]??1),u:i}}_wind(){const e=this._value("wind_speed");if(null==e)return W;const t=this.config.sensor?this.hass.states[this.config.sensor]?.attributes?.unit_of_measurement??"km/h":this._weatherAttr("wind_speed_unit")??"km/h",{v:i,u:s}=this._convertWind(e,t,this.config.unit);let o=this.config.bearing_entity?this._numRaw(this.hass.states[this.config.bearing_entity]?.state):this._numRaw(this._weatherAttr("wind_bearing"));const n=null!=o?`${this.config.from_label??"From"} ${a=o,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((a%360+360)%360/22.5)%16]}`:"";var a;const r=(null!=o?(o+180)%360:0)*Math.PI/180;return I`
      <div class="rect-tile clip wind">
        <svg class="blob-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${function(e,t,i,s=0){const o=Math.cos(s),n=Math.sin(s),a=nt([{x:.5,y:.892,r:.313},{x:-.216,y:1.05,r:.207},{x:.499,y:-.16,r:.215},{x:1.225,y:1.06,r:.211}].map(e=>({x:e.x*o-e.y*n,y:e.x*n+e.y*o,r:e.r}))),r=[];for(const e of a){const t=Math.atan2(e.T1[1]-e.C[1],e.T1[0]-e.C[0]);let i=Math.atan2(e.T2[1]-e.C[1],e.T2[0]-e.C[0])-t;if(1===e.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=16;s++){const o=t+i*s/16;r.push([e.C[0]+e.rEff*Math.cos(o),e.C[1]+e.rEff*Math.sin(o)])}}let l=0,c=0,d=0;for(let e=0;e<r.length;e++){const[t,i]=r[e],[s,o]=r[(e+1)%r.length],n=t*o-s*i;l+=n,c+=(t+s)*n,d+=(i+o)*n}l/=2,c/=6*l,d/=6*l;const h=Math.max(...r.map(([e,t])=>Math.hypot(e-c,t-d))),p=i/h,u=i=>[e+(i[0]-c)*p,t+(i[1]-d)*p];return at(a.map(e=>({T1:u(e.T1),T2:u(e.T2),C:u(e.C),rEff:e.rEff*p,sweep:e.sweep})))}(50,50,36,r)} class="blob-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:weather-windy",this.config.name??"Wind")}
          <div class="big">${Math.round(i)}<span class="unit"> ${s}</span></div>
          ${n?I`<div class="sub">${n}</div>`:""}
        </div>
      </div>
    `}_uv(){const e=this._value("uv_index");if(null==e)return W;const t=Wt.find(t=>e<=t.max),i=Wt.map((e,i)=>{const s=(160-35*i)*Math.PI/180,o=50+33*Math.cos(s),n=52+33*Math.sin(s),a=e===t;return H`<circle cx=${o} cy=${n} r=${a?4.5:2.6}
        fill=${e.color} opacity=${a?1:.3} />`});return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${st(50,52,45,12)} class="shape-fill" />
          ${i}
        </svg>
        <div class="overlay">
          ${this._header("mdi:white-balance-sunny",this.config.name??"UV index")}
          <div class="big">${Math.round(e)}</div>
          <div class="sub">${t.label}</div>
        </div>
      </div>
    `}_visibility(){const e=this._value("visibility");if(null==e)return this.config.sensor?W:this._hint("mdi:eye-outline",this.config.name??"Visibility","Weather entity has no visibility — add a sensor");const t=this.config.unit??this._weatherAttr("visibility_unit")??"km";return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${st(50,52,32,12)} class="shape-fill visibility-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:eye-outline",this.config.name??"Visibility")}
          <div class="big">${e}<span class="unit"> ${t}</span></div>
        </div>
      </div>
    `}_pressure(){const e=this._value("pressure");if(null==e)return W;const t=this.config.unit??this._weatherAttr("pressure_unit")??"hPa",i=this.config.min??("hPa"===t?950:28),s=this.config.max??("hPa"===t?1050:31),o=Math.min(1,Math.max(0,(e-i)/(s-i))),n=270*o-135,a=this.hass?.locale?.language||navigator.language||"en",r="hPa"===t?Math.round(e).toLocaleString(a):e;return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${ht(50,52,37.5,-135,135)} class="gauge-track thin" />
          ${o>.01?H`<path d=${ht(50,52,37.5,-135,n)} class="gauge-fill thin" />`:""}
        </svg>
        <div class="overlay">
          ${this._header("mdi:gauge",this.config.name??"Pressure")}
          <div class="big small-big">${r}</div>
          <div class="sub">${t}</div>
        </div>
      </div>
    `}_aqi(){const e=this._value("air_quality_index");if(null==e)return this.config.sensor?W:this._hint("mdi:waves",this.config.name??"Air quality","Point this tile at an AQI sensor");const t=Gt.find(t=>e<=t.max),i=Math.min(.96,Math.max(.04,e/300));return I`
      <div class="rect-tile left">
        ${this._header("mdi:waves",this.config.name??"Air quality")}
        <div class="big">${Math.round(e)}</div>
        <div class="aqi-bar">
          ${Gt.slice(0,5).map(e=>I`<span style="background:${e.color}"></span>`)}
          <span style="background:${Gt[5].color}"></span>
          <i class="aqi-dot" style="left:${(100*i).toFixed(1)}%; border-color:${t.color}"></i>
        </div>
        <div class="sub">${t.label}</div>
      </div>
    `}_precipitation(){let e=null;if(this.config.sensor)e=this._value();else{const t=this._forecast?.[0];e=this._numRaw(t?.precipitation)}if(null==e)return W;const t=this.config.unit??this._weatherAttr("precipitation_unit")??"mm",i=this.config.none_label??"No precipitation expected",s=e>0?this.config.total_label??"Total rain for the day":i;return I`
      <div class="rect-tile precip">
        ${this._header("m3o:rainy",this.config.name??"Precipitation")}
        <div class="big">${e}<span class="unit"> ${t}</span></div>
        <div class="precip-bottom">
          <div class="sub">${s}</div>
          ${e>0?H`<svg class="precip-glyph" viewBox="0 0 24 24">${St("rainy")}</svg>`:""}
        </div>
      </div>
    `}_humidity(){const e=this._value("humidity");if(null==e)return this.config.sensor?W:this._hint("mdi:water-percent",this.config.name??"Humidity","Weather entity has no humidity — add a sensor");const t=this.config.dew_entity?this._numRaw(this.hass.states[this.config.dew_entity]?.state):this._numRaw(this._weatherAttr("dew_point")),i=100-78*Math.min(1,Math.max(0,e/100)),s=this._scallopWave(i);return I`
      <div class="rect-tile left clip">
        <svg class="wave" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d=${s} class="wave-fill" />
        </svg>
        ${this._header("mdi:water-percent",this.config.name??"Humidity")}
        <div class="big">${Math.round(e)}<span class="unit">%</span></div>
        ${null!=t?I`<div class="dew"><span class="dew-chip">${Math.round(t)}°</span> ${this.config.dew_label??"Dew point"}</div>`:""}
      </div>
    `}_sun(){const e=this.hass.states[this.config.sun_entity??"sun.sun"];if(!e)return W;const t=e.attributes?.next_rising,i=e.attributes?.next_setting;if(!t||!i)return W;const s=this.hass?.locale?.language||navigator.language||"en",o=e=>new Date(e).toLocaleTimeString(s,{hour:"numeric",minute:"2-digit"}),n=e=>e.getHours()+e.getMinutes()/60,a=n(new Date(t)),r=n(new Date(i)),l=n(new Date),c=(r-a+24)%24||12,d=24-c,h=24,p=e=>e/24*100,u=e=>{const t=(e-a+24)%24;return t<=c?h-17*Math.sin(Math.PI*t/c):h+9*Math.sin(Math.PI*(t-c)/d)},m=(e,t)=>{const i=[];for(let s=e;s<t;s+=.25)i.push(`${p(s).toFixed(2)} ${u(s).toFixed(2)}`);return i.push(`${p(t).toFixed(2)} ${u(t).toFixed(2)}`),i.join(" L")},g=`M${p(a).toFixed(2)} 24 L${m(a,r)} Z`,f=a>.01?`M0 24 L${m(0,a)} Z`:"",_=r<23.99?`M${p(r).toFixed(2)} 24 L${m(r,24)} L100 24 Z`:"",b=(l-a+24)%24<=c,v=p(l),y=u(l),x=this.config.moon_entity??(this.hass.states["sensor.moon_phase"]?"sensor.moon_phase":"sensor.moon"),w=this.hass.states[x],k=ut(this.hass,this.config.moon_entity),$=k??.5;return I`
      <div class="rect-tile sun">
        ${this._header("mdi:weather-sunset",this.config.name??"Sunrise & sunset")}
        <svg class="sun-arc cycle" viewBox="0 0 100 40">
          <path d=${g} class="arc-fill" />
          ${f?H`<path d=${f} class="arc-night" />`:""}
          ${_?H`<path d=${_} class="arc-night" />`:""}
          <line x1="0" y1=${h} x2="100" y2=${h} class="horizon" />
          ${b?H`<path d=${function(e,t,i,s=12,o=.1*i,n=0){const a=Math.max(8*s,48),r=[];for(let l=0;l<a;l++){const c=l/a*Math.PI*2,d=i+o*Math.cos(s*c+n);r.push([e+d*Math.cos(c),t+d*Math.sin(c)])}let l=`M${r[0][0].toFixed(2)} ${r[0][1].toFixed(2)} `;for(let e=0;e<a;e++){const t=r[(e-1+a)%a],i=r[e],s=r[(e+1)%a],o=r[(e+2)%a],n=i[0]+(s[0]-t[0])/6,c=i[1]+(s[1]-t[1])/6,d=s[0]-(o[0]-i[0])/6,h=s[1]-(o[1]-i[1])/6;l+=`C${n.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} `}return l+"Z"}(v,y,5.5,9,.6)} fill="var(--md-sys-cust-color-weather-sun, #FFC83D)" />`:H`
                <circle cx=${v.toFixed(2)} cy=${y.toFixed(2)} r="4.6" class="moon-dark" />
                ${pt(v,y,4.6,$)?H`<path d=${pt(v,y,4.6,$)} class="moon-lit" />`:""}
              `}
        </svg>
        <div class="sun-times">
          <div><ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${o(t)}</div>
          <div><ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${o(i)}</div>
          ${w&&null!=k?I`<div class="moon-row"><ha-icon icon=${w.attributes?.icon||`mdi:moon-${String(w.state).replace(/_/g,"-").replace("-moon","")}`}></ha-icon> ${this.hass.formatEntityState?.(w)??w.state}</div>`:""}
        </div>
      </div>
    `}_pollen(){const e={none:{v:0,label:"None",color:"var(--md-sys-color-outline, #9E9E9E)"},active:{v:1,label:"Active",color:Bt},green:{v:1,label:"Low",color:Bt},yellow:{v:2,label:"Moderate",color:Lt},orange:{v:3,label:"High",color:It},red:{v:4,label:"Very high",color:Ht},purple:{v:5,label:"Extreme",color:Vt}},t=this.config.max??4;let i=this.config.entities;i?.length||(i=[this.config.grass_entity&&{entity:this.config.grass_entity,label:this.config.grass_label??"Grass",icon:"mdi:grass"},this.config.tree_entity&&{entity:this.config.tree_entity,label:this.config.tree_label??"Tree",icon:"mdi:tree-outline"},this.config.weed_entity&&{entity:this.config.weed_entity,label:this.config.weed_label??"Weed",icon:"mdi:sprout-outline"}].filter(Boolean));const s=(i||[]).map(i=>{const s="string"==typeof i?{entity:i}:i,o=this.hass.states[s.entity];if(!o||this._isUnavailable(o))return null;const n=String(o.state).toLowerCase();let a,r,l;if(n in e){const t=e[n];a=t.v/5,r=t.label,l=t.color}else{const e=this._numRaw(n);if(null==e)return null;a=Math.min(1,Math.max(0,e/t)),r=`${e}/${t} ${Xt[Math.min(Xt.length-1,Math.round(a*(Xt.length-1)))]}`,l=null}let c=s.label;if(!c){const e=o.attributes.friendly_name||s.entity,t=e.replace(/pollen/i,"").trim().split(/\s+/);c=t[t.length-1]||e}return{label:c,icon:s.icon||o.attributes.icon||"m3of:allergy",frac:a,levelLabel:r,color:l}}).filter(Boolean).filter(e=>!this.config.hide_inactive||e.frac>0).sort((e,t)=>t.frac-e.frac).slice(0,this.config.max_shown??4);if(!s.length){return this.config.entities?.length||this.config.grass_entity||this.config.tree_entity||this.config.weed_entity?W:this._hint("m3of:allergy",this.config.name??"Pollen","Add pollen sensors")}return"small"===this.config.variant?I`
        <div class="rect-tile pollen-small">
          ${this._header("m3of:allergy",this.config.name??"Pollen")}
          <div class="pollen-rows">
            ${s.map(e=>I`
              <div class="pollen-row">
                <span class="pollen-dot" style="background:${e.color||"var(--wm-accent, #7bc96a)"}"></span>
                <div class="pollen-text">
                  <span class="pollen-name">${e.label}</span>
                  <span class="pollen-level">${e.levelLabel}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      `:I`
      <div class="rect-tile pollen">
        ${this._header("m3of:allergy",this.config.name??"Pollen")}
        <div class="gauges">
          ${s.map(e=>I`
              <div class="gauge">
                <svg viewBox="0 0 100 86">
                  <path d=${ht(50,50,40,-135,135)} class="gauge-track" />
                  ${e.frac>.01?H`<path d=${ht(50,50,40,-135,270*e.frac-135)} class="gauge-fill" style="stroke:${e.color||"var(--wm-accent, #7bc96a)"}" />`:""}
                </svg>
                <div class="gauge-center">
                  <ha-icon icon=${e.icon}></ha-icon>
                </div>
                <div class="gauge-sub">
                  <span class="gauge-name">${e.label}</span>
                  <span>${e.levelLabel}</span>
                </div>
              </div>
            `)}
        </div>
      </div>
    `}getGridOptions(){const e="pollen"===this.config?.metric&&"small"!==this.config?.variant;return{columns:e?8:4,rows:"auto",min_columns:e?6:3}}getCardSize(){return 3}}customElements.define("materia-weather-metric",Yt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-metric",name:"Materia Weather Metric",description:"Expressive weather metric tiles: wind, UV, AQI, pollen, precipitation, sun, visibility, humidity, pressure.",preview:!0});const Kt=[$e,we,ke,ge,n`
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
  `],Zt=[{value:"minmax",label:"High / low"},{value:"wind",label:"Wind"},{value:"humidity",label:"Humidity"},{value:"uv",label:"UV index"},{value:"precipitation",label:"Precipitation"},{value:"pressure",label:"Pressure"},{value:"pollen",label:"Pollen (worst species)"},{value:"aqi",label:"Air quality"}];class Qt extends Be{_formData(){return{metrics:["minmax"],...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"metrics",label:"Subtitle metrics (condition always owns the top line)",selector:{select:{multiple:!0,mode:"list",options:Zt}}},{name:"sort_by_severity",label:"Sort metrics worst-first",selector:{boolean:{}}},{name:"max_metrics",label:"Max metrics on the subtitle line",selector:{number:{min:1,max:8,step:1,mode:"box"}}},{name:"show_metric_icons",label:"Show metric icons",selector:{boolean:{}}},{name:"pollen_entities",label:"Pollen sensors (for the pollen metric)",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"aqi_entity",label:"AQI sensor (for the air-quality metric)",selector:{entity:{domain:"sensor"}}},{name:"alert",label:"Alert text / template (takes over top line)",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"navigate"}}}]}]}get _priority(){return this._config?.priority??["precipitation","pollen","aqi"]}_movePrio(e,t){const i=[...this._priority],[s]=i.splice(e,1);i.splice(t,0,s),this._commit({...this._config,priority:i})}_removePrio(e){const t=[...this._priority];t.splice(e,1),this._commit({...this._config,priority:t})}_renderExtra(){const e=this._priority,t=Zt.filter(t=>!e.includes(t.value));return I`
      <div class="prio-header">Tie-break priority (most important first)</div>
      ${Oe((e,t)=>this._movePrio(e,t),e.map((e,t)=>I`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${Zt.find(t=>t.value===e)?.label??e}</span>
            <ha-icon-button @click=${()=>this._removePrio(t)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `))}
      ${t.length?I`<ha-form
            .hass=${this.hass}
            .data=${{}}
            .schema=${[{name:"add",label:"Add metric to priority",selector:{select:{mode:"dropdown",options:t}}}]}
            .computeLabel=${Fe}
            @value-changed=${t=>{const i=t.detail.value?.add;i&&this._commit({...this._config,priority:[...e,i]})}}
          ></ha-form>`:""}
    `}}Qt.styles=[Be.styles,n`
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
  `],customElements.define("materia-weather-glance-editor",Qt);const Jt={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class ei extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedAlert:{state:!0}};static styles=Kt;static getConfigElement(){return document.createElement("materia-weather-glance-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t,metrics:["minmax"]}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={metrics:["minmax"],...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("alert","_resolvedAlert"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}_metricData(e,t){const i=t?.attributes||{},s=this._forecast?.[0]||i.forecast?.[0];let o=null,n=0;switch(e.type){case"condition":{const e=t?.state??"";o=Jt[e]||this._capitalize(String(e).replace(/-|_/g," ")),/lightning/.test(e)?n=3:/pouring|snowy|hail/.test(e)?n=2:/rainy|fog|windy/.test(e)&&(n=1);break}case"minmax":{const e=this._num(s?.temperature),t=this._num(s?.templow);if(null==e&&null==t)return null;o=`${null!=e?`${e}°`:"—"} ${null!=t?`${t}°`:"—"}`;break}case"wind":{const e=this._num(i.wind_speed);if(null==e)return null;const t=this._num(i.wind_bearing);o=`${e} ${i.wind_speed_unit??"km/h"}${null!=t?` ${a=t,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((a%360+360)%360/22.5)%16]}`:""}`,n=e>=88?4:e>=62?3:e>=39?2:e>=20?1:0;break}case"humidity":{const e=this._num(i.humidity);if(null==e)return null;o=`${e}%`,n=e>=85||e<=20?2:e>=70||e<=30?1:0;break}case"uv":{const e=this._num(i.uv_index);if(null==e)return null;o=`UV ${e}`,n=e>=11?4:e>=8?3:e>=6?2:e>=3?1:0;break}case"precipitation":{const t=s?.precipitation,a=null==t?null:Number(t);if(null==a||!Number.isFinite(a))return null;o=`${e.label??"Rain"} ${a} ${i.precipitation_unit??"mm"}`,n=a>=10?3:a>=2?2:a>0?1:0;break}case"pressure":{const e=this._num(i.pressure);if(null==e)return null;o=`${e} ${i.pressure_unit??"hPa"}`,n=Math.abs(e-1013)>=25?2:Math.abs(e-1013)>=15?1:0;break}case"pollen":{const t={none:0,active:1,green:1,yellow:2,orange:3,red:4,purple:5},i=["None","Low","Low","Moderate","High","Very high","Extreme"],s=e.entities||this.config.pollen_entities||[];let a=null;for(const e of s){const i=this.hass.states[e];if(!i||this._isUnavailable(i))continue;const s=t[String(i.state).toLowerCase()]??this._num(i.state)??0;if(!a||s>a.v){const t=i.attributes.friendly_name||e,o=t.replace(/pollen/i,"").trim().split(/\s+/);a={v:s,label:o[o.length-1]||t}}}if(!a)return null;const r=e.label??this.config.pollen_label??"Pollen";o=0===a.v?this.config.no_pollen_label??`${r} none`:`${r} ${a.label} ${i[a.v+1]??a.v}`,n=a.v;break}case"aqi":{const t=e.entity??this.config.aqi_entity,i=t?this.hass.states[t]:null;if(!i||this._isUnavailable(i))return null;const s=this._num(i.state);if(null==s)return null;o=`AQI ${s}`,n=s>200?4:s>150?3:s>100?2:s>50?1:0;break}case"sensor":{const t=e.entity?this.hass.states[e.entity]:null;if(!t||this._isUnavailable(t))return null;const i=e.unit??t.attributes.unit_of_measurement??"";o=`${e.label?`${e.label} `:""}${t.state}${i?` ${i}`:""}`;break}default:return null}var a;null!=e.severity&&(n=Number(e.severity)||0);return{text:o,sev:n,icon:e.icon??(this.config.show_metric_icons?{minmax:"mdi:thermometer",wind:"mdi:weather-windy",humidity:"mdi:water-percent",uv:"mdi:white-balance-sunny",precipitation:"m3o:rainy",pressure:"mdi:gauge",pollen:"m3of:allergy",aqi:"mdi:waves",sensor:"mdi:information-outline"}[e.type]:null),type:e.type}}_metricItems(e){const t=this.config.priority??["precipitation","pollen","aqi"],i=e=>{const i=t.indexOf(e);return-1===i?0:(t.length-i)/(t.length+1)},s=(this.config.metrics||[]).map(e=>"string"==typeof e?{type:e}:e).filter(e=>"condition"!==e.type),o=s.map(t=>this._metricData(t,e)).filter(Boolean);return this.config.sort_by_severity&&o.sort((e,t)=>t.sev+i(t.type)-(e.sev+i(e.type))),o}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"";let s=e?.attributes?.temperature;if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&!this._isUnavailable(e)&&(s=e.state)}const o=this._num(s),n=this._isTemplate(this.config.alert)?this._resolvedAlert:this.config.alert,a=n?null:this._metricData({type:"condition"},e),r=this.config.max_metrics??1/0,l=this._metricItems(e).slice(0,r),c=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,d=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,h=this.config.show_chevron??"navigate"===this.config.tap_action?.action,p=e=>I`<span class="m">
      ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}${e.text}
    </span>`;return I`
      <ha-card>
        <div
          class="glance ${t?"unavailable":""}"
          style="${c?`--wg-bg:${c};`:""}${d?`--wg-fg:${d};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <svg class="glyph" viewBox="0 0 24 24">${St(i,ut(this.hass,this.config.moon_entity))}</svg>
          <div class="mid">
            ${n||a?I`<div class="line1">
                  ${n?I`<ha-icon icon="mdi:alert-outline"></ha-icon>`:""}
                  ${n?I`<span>${n}</span>`:p(a)}
                </div>`:""}
            ${l.length?I`<div class="line2">
                  ${l.map((e,t)=>I`${t?I`<span class="dot">·</span>`:""}${p(e)}`)}
                </div>`:""}
          </div>
          <div class="now">${t||null==o?"—":`${o}°`}</div>
          ${h?I`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-weather-glance",ei),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-glance",name:"Materia Weather Glance",description:"Weather pill for the home screen: glyph, configurable metric lines or an alert, big temperature.",preview:!0});const ti=[$e,we,ke,ge,n`
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
  `];customElements.define("materia-list-editor",class extends Be{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"title",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon",selector:{icon:{}}},{name:"entities",label:"Entities (rows)",selector:{entity:{multiple:!0}}}]}]}});class ii extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=ti;static getConfigElement(){return document.createElement("materia-list-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("sensor."))||"";return{entities:t?[t]:[]}}setConfig(e){if(!e.entities?.length)throw new Error("Materia List: add at least one entity");this.config={...e}}_rowState(e,t){if(!t)return"—";if(e.attribute){const i=t.attributes?.[e.attribute];return null==i?"—":`${i}${e.unit?` ${e.unit}`:""}`}if(this._isUnavailable(t))return this.hass.formatEntityState?.(t)??t.state;if(e.unit){const i=Number(t.state);return Number.isFinite(i)?`${i} ${e.unit}`:t.state}return this.hass.formatEntityState?.(t)??t.state}render(){if(!this.hass||!this.config)return I``;const e=(this.config.entities||[]).map(e=>"string"==typeof e?{entity:e}:e);return I`
      <ha-card>
        ${this.config.title?I`<div class="header">
              ${this.config.icon?I`<ha-icon icon=${this.config.icon}></ha-icon>`:""}
              <span>${this.config.title}</span>
            </div>`:""}
        <div class="rows">
          ${e.map(e=>{const t=this.hass.states[e.entity],i=e.name||t?.attributes?.friendly_name||e.entity;return I`
              <div
                class="row ${t&&this._isUnavailable(t)?"unavailable":""}"
                @click=${()=>this._handleAction(e.tap_action||{action:"more-info",entity:e.entity})}
              >
                ${e.icon?I`<ha-icon class="row-icon" icon=${e.icon}></ha-icon>`:""}
                <span class="name">${i}</span>
                <span class="state">${this._rowState(e,t)}</span>
              </div>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 1+(this.config?.entities?.length||0)}}customElements.define("materia-list",ii),window.customCards=window.customCards||[],window.customCards.push({type:"materia-list",name:"Materia List",description:"Entity rows with localized states — name left, value right, optional header.",preview:!0});const si=[$e,we,ke,ge,n`
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
  `];customElements.define("materia-switch-editor",class extends Be{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"Name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"secondary",label:"Secondary text / template",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Row color (e.g. escalate from state)",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color",label:"Switch track color when on",color:!0,template:!0,selector:{text:{}}},{name:"switch_color_on",label:"Switch thumb color when on",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}});class oi extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedSwitchColor:{state:!0},_resolvedSwitchColorOn:{state:!0}};static styles=si;static getConfigElement(){return document.createElement("materia-switch-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("switch.")||e.startsWith("input_boolean."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Switch: entity is required");this.config=e}updated(e){e.has("hass")&&this.hass&&(this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("switch_color","_resolvedSwitchColor"),this._resolveField("switch_color_on","_resolvedSwitchColorOn"))}get _stateObj(){return this.hass?.states[this.config.entity]}get _on(){return"on"===this._stateObj?.state}_tap(){this._handleAction(this.config.tap_action||{action:"toggle",entity:this.config.entity}),this._fireHaptic("light")}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e)return I`<ha-card class="row off">Unknown entity: ${this.config.entity}</ha-card>`;const t=this._on,i=this._isUnavailable(e),s=this.config.name||e.attributes.friendly_name||this.config.entity,o=this.config.icon||e.attributes.icon||(t?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"),n=this.config.secondary?this._isTemplate(this.config.secondary)?this._resolvedSecondary:this.config.secondary:this.hass.formatEntityState?.(e)??e.state,a=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,r=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on,l=this._isTemplate(this.config.switch_color)?(this._resolvedSwitchColor||"").trim():this.config.switch_color,c=this._isTemplate(this.config.switch_color_on)?(this._resolvedSwitchColorOn||"").trim():this.config.switch_color_on;return I`
      <ha-card
        class="row ${t?"on":"off"} ${a?"colored":""} ${this.config.flat?"flat":""} ${i?"unavailable":""}"
        style="${a?`background:${a};`:""}${r?`color:${r};`:""}"
        @click=${this._tap}
      >
        <ha-icon class="r-icon" icon=${o}></ha-icon>
        <div class="r-text">
          <span class="r-name">${s}</span>
          ${n?I`<span class="r-sub">${n}</span>`:""}
        </div>
        <div class="m3-switch ${t?"on":""}"
          style="${l?`--ms-track:${l};`:""}${c?`--ms-thumb:${c};`:""}"><i></i></div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1}}getCardSize(){return 1}}customElements.define("materia-switch",oi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-switch",name:"Materia Switch",description:"Toggle row with a spec M3 switch — templatable secondary text and state-driven colors.",preview:!0});const ni=[$e,we,ke,ge,n`
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
  `],ai=[{value:"percent",label:"Percent (filling cookie)"},{value:"battery",label:"Battery (vertical bar)"},{value:"temperature",label:"Temperature (thermometer)"},{value:"power",label:"Power (load bars)"},{value:"energy",label:"Energy"},{value:"binary",label:"On/off (spinning star)"},{value:"plain",label:"Plain value"},{value:"vacuum",label:"Robot vacuum (state + room + battery bar)"}];customElements.define("materia-glance-tile-editor",class extends Be{_formData(){return{variant:"percent",...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){const e=this._config?.variant,t={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"variant",label:"Category",required:!0,selector:{select:{mode:"dropdown",options:ai}}},{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Icon (overrides entity icon)",selector:{icon:{}}},{name:"label",label:"Subtitle",selector:{text:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"temperature"===e&&i.fields.push({name:"min",label:"Scale min (default 10°)",selector:{number:{mode:"box"}}},{name:"max",label:"Scale max (default 30°)",selector:{number:{mode:"box"}}}),"power"===e&&i.fields.push({name:"max",label:"Full-load watts (default 3000)",selector:{number:{mode:"box"}}}),"plain"===e&&i.fields.push({name:"battery_entity",label:"Paired battery sensor (adds the vertical bar)",selector:{entity:{domain:"sensor"}}}),"vacuum"===e&&i.fields.push({name:"status_entity",label:"Detailed status sensor (shown as the state)",selector:{entity:{domain:"sensor"}}},{name:"room_entity",label:"Current room sensor (shown while cleaning)",selector:{entity:{domain:"sensor"}}},{name:"battery_entity",label:"Battery sensor (adds the vertical bar)",selector:{entity:{domain:"sensor"}}}),"percent"===e&&i.fields.push({name:"critical_dry",label:"Critical dry, ≤% (default 10 — red)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_below",label:"Water soon, ≤% (default 20 — orange)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"soggy_above",label:"Overwatered, >% (default 60 — blue)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_label",label:'"Needs water now" label',selector:{text:{}}},{name:"soon_label",label:'"Water soon" label',selector:{text:{}}},{name:"optimal_label",label:'"Optimal" label',selector:{text:{}}},{name:"wet_label",label:'"Overwatered" label',selector:{text:{}}});const s={title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"Accent color (fill / bars / star)",color:!0,selector:{text:{}}},{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},o={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[t,i,s,o]:[t,s,o]}});const ri="var(--md-sys-cust-color-weather-rain, #5fa8f5)",li="var(--md-sys-cust-color-scale-green, #5E9E50)",ci="var(--md-sys-cust-color-scale-orange, #D9713C)",di="var(--md-sys-cust-color-scale-red, #C94D42)",hi=["on","open","running","playing","heat","heating","home","true","active"];class pi extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedLabel:{state:!0}};static styles=ni;static getConfigElement(){return document.createElement("materia-glance-tile-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("sensor."))||"";return{entity:t,variant:"percent"}}setConfig(e){if(!e.entity)throw new Error("Materia Glance Tile: entity is required");if(!e.variant)throw new Error("Materia Glance Tile: variant is required — pick the value category");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("label","_resolvedLabel"))}get _label(){return this._isTemplate(this.config.label)?this._resolvedLabel:this.config.label}get _stateObj(){return this.hass?.states[this.config.entity]}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}get _unit(){return this.config.unit??this._stateObj?.attributes?.unit_of_measurement??""}get _name(){return this.config.name??this._stateObj?.attributes?.friendly_name??this.config.entity}_icon(e){return this.config.icon||this._stateObj?.attributes?.icon||e}get _variant(){return this.config.variant}_fmtState(){const e=this._stateObj;return this.hass.formatEntityState?.(e)??e.state}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e||this._isUnavailable(e))return I`<ha-card><div class="rect-tile unavailable">
        <div class="header"><ha-icon icon=${this._icon("mdi:help-circle-outline")}></ha-icon><span>${this._name}</span></div>
        <div class="sub hint">${e?this._fmtState():"Entity not found"}</div>
      </div></ha-card>`;const t={percent:()=>this._percent(),battery:()=>this._battery(),temperature:()=>this._temperature(),power:()=>this._power(),energy:()=>this._energy(),binary:()=>this._binary(),plain:()=>this._plain(),vacuum:()=>this._vacuum()}[this._variant](),i=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,s=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,o=null!=this.config.size?Math.min(10,Math.max(1,this.config.size)):null;return I`
      <ha-card
        style="--ms-size:${null!=o?["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][o-1]:"200px"};${i?`--ms-color:${i};`:""}${s?`--ms-color-on:${s};`:""}${this.config.accent?`--ms-accent:${this.config.accent};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
      >
        ${t}
      </ha-card>
    `}_header(e){return I`<div class="header"><ha-icon icon=${this._icon(e)}></ha-icon><span>${this._name}</span></div>`}_moistureZone(e){const t=this.config.critical_dry??10,i=this.config.dry_below??20,s=this.config.soggy_above??60;return e<=t?{fill:di,status:this.config.dry_label??"Needs water now"}:e<=i?{fill:ci,status:this.config.soon_label??"Water soon"}:e<=s?{fill:li,status:this.config.optimal_label??"Optimal"}:{fill:ri,status:this.config.wet_label??"Overwatered"}}_percent(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=Math.min(1,Math.max(0,e/100)),i=this._stateObj.attributes.device_class,s="moisture"===i;let o=null,n=null;if("battery"===i)o=t>.4?li:t>.15?ci:di;else if(s){const t=this._moistureZone(e);o=t.fill,n=t.status}else"humidity"===i&&(o=ri);o&&(o=`color-mix(in srgb, ${o} 30%, transparent)`);const a=100-100*t,r="humidity"===i||s;let l;if(r){let e=`M-100 ${a.toFixed(1)}`;for(let t=-100;t<100;t+=25){e+=` Q ${t+12.5} ${(a+(t/25%2==0?-1.6:1.6)).toFixed(1)} ${t+25} ${a.toFixed(1)}`}l=e+" V102 H-100 Z"}else l=`M-2 ${a+2.5} Q 50 ${a-2.5} 102 ${a+2.5} V102 H-2 Z`;const c="battery"===i?"mdi:battery":s?"mdi:sprout":"mdi:water-percent";return I`
      <div class="rect-tile clip">
        <svg class="fill-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${t>.005?H`<path d=${l}
                class="level-fill ${r?"drift":""}" style=${o?`fill:${o}`:""} />`:""}
        </svg>
        <div class="overlay">
          ${this._header(c)}
          <div class="big">${Math.round(e)}<span class="unit">%</span></div>
          ${this._label??n?I`<div class="sub">${this._label??n}</div>`:""}
        </div>
      </div>
    `}_tempColor(e,t){const i="°F"===t?5*(e-32)/9:e;return i<16?ri:i<23?li:i<27?ci:di}_temperature(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=this._unit||"°C",i=this.config.min??("°F"===t?50:10),s=this.config.max??("°F"===t?86:30),o=Math.min(1,Math.max(0,(e-i)/(s-i))),n=this._tempColor(e,t);return I`
      <div class="rect-tile left">
        ${this._header("mdi:thermometer")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(10*e)/10}<span class="unit">${t}</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8,100*o)}%;background:${n}"></i>
          </div>
        </div>
      </div>
    `}_batteryColor(e){return e>.4?li:e>.15?ci:di}_battery(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=Math.min(1,Math.max(0,e/100)),i=this._batteryColor(t);return I`
      <div class="rect-tile left">
        ${this._header("mdi:battery")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(e)}<span class="unit">%</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8,100*t)}%;background:${i}"></i>
          </div>
        </div>
      </div>
    `}_power(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t="kW"===(this._stateObj.attributes.unit_of_measurement||"W")?1e3*e:e,i=this.config.max??3e3,s=Math.min(1,Math.max(0,t/i)),o=Math.ceil(5*s),n=t>=1e3?""+Math.round(t/100)/10:`${Math.round(t)}`,a=t>=1e3?"kW":"W";return I`
      <div class="rect-tile left">
        ${this._header("mdi:flash")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${n}<span class="unit"> ${a}</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="bars">
            ${[32,48,64,82,100].map((e,t)=>I`<i class=${t<o?"lit":""} style="height:${e}%"></i>`)}
          </div>
        </div>
      </div>
    `}_energy(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=this.hass?.locale?.language||navigator.language||"en",i=(Math.round(10*e)/10).toLocaleString(t);return I`
      <div class="rect-tile left">
        ${this._header("mdi:lightning-bolt")}
        <div class="big">${i}<span class="unit"> ${this._unit}</span></div>
        <div class="energy-bottom">
          ${this._label?I`<div class="sub">${this._label}</div>`:I`<span></span>`}
          <ha-icon class="glyph" icon="mdi:lightning-bolt"></ha-icon>
        </div>
      </div>
    `}_binary(){const e=hi.includes(this._stateObj.state),t=ot(50,50,46,{vertices:8,innerRadius:.8,rounding:.15,rotate:-Math.PI/2});return I`
      <div class="rect-tile left binary ${e?"active":""}">
        ${this._header("mdi:power")}
        <div class="big small-big">${this._fmtState()}</div>
        <div class="binary-bottom">
          ${this._label?I`<div class="sub">${this._label}</div>`:I`<span></span>`}
          <svg class="binary-star" viewBox="0 0 100 100">
            <g class=${e?"spin":""}><path d=${t} /></g>
          </svg>
        </div>
      </div>
    `}_plain(){const e=this._stateObj,t=this._num(e.state),i=null!=t?I`<div class="big">${Math.round(10*t)/10}<span class="unit"> ${this._unit}</span></div>`:I`<div class="big small-big">${this._fmtState()}</div>`,s=this.config.battery_entity?this.hass.states[this.config.battery_entity]:null,o=s?this._num(s.state):null;if(null!=o){const e=Math.min(1,Math.max(0,o/100)),t=this._batteryColor(e);return I`
        <div class="rect-tile left">
          ${this._header("mdi:eye-outline")}
          <div class="split-row">
            <div class="split-main">
              ${i}
              ${this._label?I`<div class="sub">${this._label}</div>`:""}
            </div>
            <div class="thermo">
              <i style="height:${Math.max(8,100*e)}%;background:${t}"></i>
            </div>
          </div>
        </div>
      `}return I`
      <div class="rect-tile">
        ${this._header("mdi:eye-outline")}
        ${i}
        ${this._label?I`<div class="sub">${this._label}</div>`:""}
      </div>
    `}_fmtObj(e){return this.hass.formatEntityState?.(e)??e.state}_vacuum(){const e="cleaning"===this._stateObj.state,t=this.config.status_entity?this.hass.states[this.config.status_entity]:null,i=t?this._fmtObj(t):this._fmtState(),s=this.config.room_entity?this.hass.states[this.config.room_entity]:null,o=e&&s?this._fmtObj(s):"",n=this.config.battery_entity?this.hass.states[this.config.battery_entity]:null,a=n?this._num(n.state):null,r=null!=a?Math.min(1,Math.max(0,a/100)):null,l=null!=r?this._batteryColor(r):null;return I`
      <div class="rect-tile vacuum ${e?"active":""}">
        ${this._header(this._icon("mdi:robot-vacuum"))}
        <div class="vacuum-row">
          <div class="vacuum-main">
            <div class="vacuum-state"><div class="big small-big">${i}</div></div>
            <div class="sub">${o}</div>
          </div>
          ${null!=r?I`<div class="thermo"><i style="height:${Math.max(8,100*r)}%;background:${l}"></i></div>`:""}
        </div>
      </div>
    `}getGridOptions(){return{columns:4,rows:"auto",min_columns:3}}getCardSize(){return 3}}customElements.define("materia-glance-tile",pi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-glance-tile",name:"Materia Glance Tile",description:"Expressive view-only sensor tile — percent fill, thermometer, power bars, spinning pump star, and a graceful fallback.",preview:!0});const ui=[$e,we,ke,ge,n`
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
  `];customElements.define("materia-hero-editor",class extends Be{_formData(){return{burst:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"Eyebrow text",selector:{text:{}}},{name:"icon",label:"Eyebrow icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"title",label:"Big title (defaults to the state)",template:!0,selector:{text:{}}},{name:"value",label:"Headline number (defaults to the state)",template:!0,selector:{text:{}}},{name:"unit",label:"Unit after the number",selector:{text:{}}},{name:"caption",label:"Caption beside the number",template:!0,selector:{text:{}}},{name:"secondary",label:"Sub-line",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"active_state",label:"State(s) that count as active",selector:{text:{}}},{name:"burst",label:"Show the turning burst",selector:{boolean:{}}},{name:"active_color",label:"Background while active",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"Text while active",color:!0,template:!0,selector:{text:{}}},{name:"color",label:"Background at rest",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text at rest",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const mi={vacuum:"cleaning",light:"on",switch:"on",fan:"on",input_boolean:"on",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing",binary_sensor:"on"};class gi extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedTitle:{state:!0},_resolvedValue:{state:!0},_resolvedCaption:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedActiveColor:{state:!0},_resolvedActiveColorOn:{state:!0}};static styles=ui;static getConfigElement(){return document.createElement("materia-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("sensor."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Hero: entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("title","_resolvedTitle"),this._resolveField("value","_resolvedValue"),this._resolveField("caption","_resolvedCaption"),this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("active_color","_resolvedActiveColor"),this._resolveField("active_color_on","_resolvedActiveColorOn"),this._alertList().forEach((e,t)=>{null!=e.text&&this._resolveTemplateValue(`alertText${t}`,e.text)}))}_alertList(){return Array.isArray(this.config.alerts)?this.config.alerts:this.config.alert?[this.config.alert]:[]}_idle(e){return["off","idle","unknown","unavailable","false","0","none","","ok","docked"].includes(String(e??"").toLowerCase())}_alertText(e,t){if(null==t.text)return"";const i=this._isTemplate(t.text)?this._tplResults?.[`alertText${e}`]:t.text;return null==i?"":String(i).trim()}get _activeAlert(){const e=this._alertList();for(let t=0;t<e.length;t++){const i=e[t],s=this._alertText(t,i);if(i.entity){const e=this.hass?.states[i.entity];if(!e)continue;const t=String(e.state);if(null!=i.state){if(!(Array.isArray(i.state)?i.state.map(String):[String(i.state)]).includes(t))continue}else if(this._idle(t))continue;return{...i,text:s||(this.hass.formatEntityState?.(e)??t)}}if(s)return{...i,text:s}}return null}_field(e,t){const i=this.config[e];if(null==i)return null;const s=this._isTemplate(i)?this[t]:i;return null==s||""===s?null:s}get _stateObj(){return this.hass?.states[this.config.entity]}_isActive(e){if(!e)return!1;const t=e.entity_id.split(".")[0],i=this.config.active_state??mi[t]??"on";return(Array.isArray(i)?i:[i]).some(t=>String(t)===e.state)}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._isUnavailable(e),i=!t&&this._isActive(e),s=this.config.name??e?.attributes?.friendly_name??this.config.entity,o=this.config.icon??e?.attributes?.icon,n=this._field("title","_resolvedTitle")??(e?this.hass.formatEntityState?.(e)??e.state:"—");let a=this._field("value","_resolvedValue");if(null==a&&e){const t=this._num(e.state);null!=t&&(a=String(Math.round(t)))}const r=this.config.unit??(null!=a?e?.attributes?.unit_of_measurement:null),l=this._field("caption","_resolvedCaption"),c=this._field("secondary","_resolvedSecondary"),d=this._activeAlert,h=d?.color||"var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))",p=d?.color_on||"var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))",u=d&&!1!==this.config.alert_tints_hero,m=u?h:i?this._field("active_color","_resolvedActiveColor")??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))":this._field("color","_resolvedColor")??"var(--md-sys-color-secondary-container)",g=u?p:i?this._field("active_color_on","_resolvedActiveColorOn")??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))":this._field("color_on","_resolvedColorOn")??"var(--md-sys-color-on-secondary-container)",f=lt(90,90,86),_=rt(90,90,88);return I`
      <ha-card style="--mh-bg:${m};--mh-fg:${g};--mh-alert-bg:${h};--mh-alert-fg:${p};">
        <div class="stack">
        <div
          class="hero ${t?"unavailable":""} ${d?"attached":""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
        >
          ${!1===this.config.burst?W:I`<svg class="burst ${d?"alarm":i?"working":""}" viewBox="0 0 180 180" aria-hidden="true">
                ${d?H`<g class="loom"><path d=${_} /></g>`:H`<g class="drift"><path d=${f} /></g>`}
              </svg>`}
          <div class="content">
            <div class="eyebrow">
              ${o?I`<ha-icon .icon=${o}></ha-icon>`:W}
              <span>${s}</span>
            </div>
            <div class="title">${t?"Unavailable":n}</div>
            ${null!=a?I`<div class="figure">
                  <span class="value">${a}</span>
                  ${r?I`<span class="unit">${r}</span>`:W}
                  ${l?I`<span class="caption">${l}</span>`:W}
                </div>`:W}
            ${c?I`<div class="secondary">${c}</div>`:W}
          </div>
        </div>
        ${d?I`<div
              class="alert"
              role="status"
              @click=${()=>this._handleAction(d.tap_action||{action:"more-info",entity:d.entity||this.config.entity})}
            >
              <ha-icon .icon=${d.icon??"mdi:alert-circle-outline"}></ha-icon>
              <span>${d.text}</span>
            </div>`:W}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}customElements.define("materia-hero",gi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-hero",name:"Materia Hero",description:"Expressive headline block — big state title, one enormous numeral, and an accent swap while active.",preview:!0});const fi={status:["_status","_work_mode","_state","_activity"],progress:["_cleaning_progress","_progress"],battery:["_battery","_batterij","_batterie"],room:["_current_room","_room","_active_map"],cleaning_time:["_cleaning_time","_cleaning_duration"],cleaning_area:["_cleaning_area","_area_cleaned"],error:["_vacuum_error","_error"],dock_error:["_dock_error"],water_shortage:["_water_shortage"],clean_water:["_dock_clean_water_box","_clean_water"],dirty_water:["_dock_dirty_water_box","_dirty_water"],mop_drying:["_mop_drying","_drying"],last_clean:["_last_clean_end","_last_job","_last_clean"]},_i=["_time_left","_lifespan","_consumable"],bi=["docked","charging","charging_complete","fully_charged","idle","sleeping","paused","standby","off","unavailable","unknown","error","device_offline","charger_disconnected","locked","shutting_down","updating","air_drying_stopping"],vi={roborock:{idle_states:bi},ecovacs:{idle_states:[...bi,"cleaning_paused","returning"]},generic:{idle_states:bi}};const yi=[{match:["sensor_time_left","sensor_lifespan"],en:"Clean the sensors",nl:"Maak de sensoren schoon"},{match:["main_brush"],en:"Replace the main brush",nl:"Vervang de hoofdborstel"},{match:["side_brush"],en:"Replace the side brush",nl:"Vervang de zijborstel"},{match:["filter"],en:"Replace the filter",nl:"Vervang het filter"},{match:["strainer"],en:"Clean the dock strainer",nl:"Reinig de dockzeef"},{match:["maintenance_brush"],en:"Clean the dock brush",nl:"Maak de dockborstel schoon"},{match:["mop_life","mop_time"],en:"Replace the mop pad",nl:"Vervang de dweil"}],xi=[{match:["dustbin_full","bin_full","dust_bin_full"],en:"Empty the dustbin",nl:"Leeg de stofbak"},{match:["water_box_empty","low_water","no_water"],en:"Refill the water tank",nl:"Vul het waterreservoir bij"},{match:["waste_water_tank_full","dirty_water_full"],en:"Empty the dirty water tank",nl:"Leeg het vuilwaterreservoir"},{match:["main_brush_stuck","main_brush_jammed"],en:"Free the main brush",nl:"Maak de hoofdborstel vrij"},{match:["side_brush_stuck","side_brush_jammed"],en:"Free the side brush",nl:"Maak de zijborstel vrij"},{match:["wheel_stuck","wheels_stuck","stuck"],en:"The wheels are stuck - move it clear",nl:"De wielen zitten vast — haal het obstakel weg"},{match:["cliff_sensor","cliff"],en:"Clean the cliff sensors",nl:"Maak de valsensoren schoon"},{match:["filter_blocked","filter_dirty"],en:"Clean or replace the filter",nl:"Reinig of vervang het filter"},{match:["bumper_stuck","bumper"],en:"Free the bumper",nl:"Maak de bumper vrij"},{match:["dock","charger"],en:"Check the dock connection",nl:"Controleer de verbinding met het dock"},{match:["low_battery","battery_low"],en:"Battery too low - let it charge",nl:"Accu te laag - laat hem opladen"},{match:["trapped","cannot_move","stuck_in_place"],en:"It is trapped - move it clear",nl:"De robot zit vast — haal hem los"},{match:["mop_missing","no_mop"],en:"Attach the mop pad",nl:"Bevestig de dweil"},{match:["full","container_full"],en:"Empty the container",nl:"Leeg het reservoir"}];function wi(e,t,i){const s=String(t||"").toLowerCase();if(!s)return null;const o=e.find(e=>e.match.some(e=>s.includes(e)));return o?ze(o,i):null}customElements.define("materia-vacuum-hero-editor",class extends Be{_formData(){return{brand:"roborock",burst:!0,alert_tints_hero:!0,...this._config}}_sectionsSignature(){return this._config?.brand||""}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}},{name:"brand",label:"Brand profile",selector:{select:{mode:"dropdown",options:[{value:"roborock",label:"Roborock"},{value:"ecovacs",label:"Ecovacs"},{value:"generic",label:"Generic / other"}]}}},{name:"name",label:"Name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{title:"Entity overrides",icon:"mdi:link-variant",fields:[{name:"status_entity",label:"Status / work mode",selector:{entity:{}}},{name:"progress_entity",label:"Cleaning progress (%)",selector:{entity:{}}},{name:"battery_entity",label:"Battery",selector:{entity:{}}},{name:"room_entity",label:"Current room",selector:{entity:{}}},{name:"cleaning_time_entity",label:"Elapsed cleaning time",selector:{entity:{}}},{name:"error_entity",label:"Vacuum error",selector:{entity:{}}},{name:"dock_error_entity",label:"Dock error",selector:{entity:{}}},{name:"mop_drying_entity",label:"Mop drying",selector:{entity:{}}},{name:"last_clean_entity",label:"Last clean finished",selector:{entity:{}}}]},{title:"Behaviour",icon:"mdi:cog-outline",fields:[{name:"consumable_hours",label:"Warn when a consumable has this many hours left (default 1)",selector:{number:{min:0,max:200,mode:"box"}}},{name:"consumable_percent",label:"Warn when a % lifespan drops to (default 5)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"docked_label",label:'Label at a full battery (default "Docked")',selector:{text:{}}},{name:"drying_label",label:'Drying sub-line (default "Drying the mop")',selector:{text:{}}},{name:"alert_tints_hero",label:"An ERROR colours the whole hero (warnings never do)",selector:{boolean:{}}},{name:"burst",label:"Show the decorative shape",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"working_color",label:"Background while working",color:!0,selector:{text:{}}},{name:"working_color_on",label:"Text while working",color:!0,selector:{text:{}}},{name:"color",label:"Background at rest",color:!0,selector:{text:{}}},{name:"color_on",label:"Text at rest",color:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class ki extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=[ui,n`
      .burst .drift path {
        d: var(--mh-calm-d);
        transition: d var(--md-sys-motion-expressive-default-spatial);
      }

      .burst.working .drift path {
        d: var(--mh-live-d);
      }

      @media (prefers-reduced-motion: reduce) {
        .burst .drift path {
          transition: none;
        }
      }
    `];static getConfigElement(){return document.createElement("materia-vacuum-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("vacuum."))||"";return{entity:t,brand:"roborock"}}setConfig(e){if(!e.entity)throw new Error("Materia Vacuum Hero: entity is required");this.config={brand:"roborock",...e},this._discovered=null}updated(e){e.has("config")&&(this._discovered=null),e.has("hass")&&this.hass&&(this.config.alerts||[]).forEach((e,t)=>{null!=e.text&&this._resolveTemplateValue("alertText"+t,e.text)})}get _profile(){return e=this.config.brand,vi[e]||vi.generic;var e}get _stateObj(){return this.hass?.states[this.config.entity]}_siblings(){const e=this.hass?.entities?.[this.config.entity],t=e?.device_id;return t?Object.values(this.hass.entities).filter(e=>e.device_id===t&&!e.disabled_by&&!e.hidden_by).map(e=>e.entity_id):[]}get _caps(){if(this._discovered)return this._discovered;const e=this._siblings(),t=(t,i)=>{for(const s of t){const t=e.find(e=>!(i&&!i.includes(e.split(".")[0]))&&(e.split(".")[1].endsWith(s)||e.split(".")[1].includes(s)));if(t)return t}return null},i={};for(const[e,s]of Object.entries(fi))i[e]=this.config[`${e}_entity`]??t(s,["sensor","binary_sensor"]);return i.consumables=this.config.consumable_entities??e.filter(e=>e.startsWith("sensor.")&&_i.some(t=>e.includes(t))),this._discovered=i,i}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}_stateOf(e){if(!e)return null;const t=this.hass?.states[e];return t&&!this._isUnavailable(t)?t.state:null}_numOf(e){return this._num(this._stateOf(e))}get _idleStates(){return(this.config.idle_states??this._profile.idle_states).map(e=>String(e).toLowerCase())}get _working(){const e=this._stateObj;if(!e||this._isUnavailable(e))return!1;const t=String(this._stateOf(this._caps.status)??e.state).toLowerCase();return!this._idleStates.includes(t)}get _drying(){return"on"===this._stateOf(this._caps.mop_drying)}get _hasProgress(){const e=String(this._stateOf(this._caps.status)??this._stateObj?.state??"").toLowerCase();return!(this.config.no_progress_states??["return","empty","wash","dry","charg","dock","locat","seek","idle"]).some(t=>e.includes(t))}get _minutesLeft(){const e=this._numOf(this._caps.progress);if(null==e||e<=0||e>=100)return null;const t=this._caps.cleaning_time,i=this._numOf(t);if(null==i||i<=0)return null;const s=i*({s:1/60,sec:1/60,secs:1/60,seconds:1/60,min:1,mins:1,minutes:1,h:60,hr:60,hours:60}[String(this.hass?.states[t]?.attributes?.unit_of_measurement??"").toLowerCase()]??1/60),o=Math.round(s*(100-e)/e);return e<(this.config.eta_min_progress??5)?null:Math.max(1,o)}_pretty(e){if(null==e)return null;const t=String(e).replace(/[_-]+/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}_resetButtonFor(e){const t=["main_brush","side_brush","maintenance_brush","strainer","filter","sensor","mop"].find(t=>e.includes(t));return t?this._siblings().find(e=>e.startsWith("button.")&&e.includes("reset")&&e.includes(t))??null:null}_lowConsumables(){const e=this.config.consumable_hours??1,t=this.config.consumable_percent??5,i={s:1/3600,sec:1/3600,seconds:1/3600,min:1/60,minutes:1/60,h:1,hours:1,d:24};return(this._caps.consumables||[]).filter(s=>{const o=this._numOf(s);if(null==o)return!1;const n=String(this.hass.states[s]?.attributes?.unit_of_measurement??"").toLowerCase();if("%"===n)return o<=t;return o*(i[n]??1)<=e})}get _alerts(){const e=this._caps,t=(e,t,i)=>{const s=this._stateOf(e);if(null==s||["none","ok","off","no_error","0"].includes(String(s).toLowerCase()))return null;const o=(n=s,a=this.hass.locale?.language,wi(xi,n,a));var n,a;return{icon:t,text:o?`${i}: ${o}`:`${i}: ${this._pretty(s)}`,severity:"error",entity:e}},i=(e,t,i,s)=>"on"===this._stateOf(e)?{icon:t,text:i,severity:s,entity:e}:null,s=[t(e.error,"mdi:robot-vacuum-alert",this.config.error_label??"Vacuum error"),t(e.dock_error,"mdi:home-alert-outline",this.config.dock_error_label??"Dock error"),i(e.water_shortage,"mdi:water-alert-outline","Water shortage - cannot mop","error"),i(e.clean_water,"mdi:water-outline","Clean water tank needs refilling","warning"),i(e.dirty_water,"mdi:water-off-outline","Dirty water tank needs emptying","warning"),...this._lowConsumables().map(e=>{return{icon:"mdi:wrench-outline",text:(t=e,i=this.hass.locale?.language,wi(yi,t,i)??`${this.hass.states[e]?.attributes?.friendly_name??e} needs attention`),severity:"warning",entity:e,reset:this._resetButtonFor(e)};var t,i}),...(this.config.alerts||[]).map((e,t)=>{const i=null!=e.text&&this._isTemplate(e.text)?this._tplResults?.["alertText"+t]:e.text,s=null==i?"":String(i).trim();return null!=e.text&&0===s.length?null:{...e,text:s}})].filter(Boolean);return s}_severityPair(e){return"warning"===e?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--md-sys-cust-color-error, var(--md-sys-color-error))","var(--md-sys-cust-color-on-error, var(--md-sys-color-on-error))"]}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e){if(this._lastGood){const e=this._lastGood;return I`
          <ha-card class="unavailable" style="--mh-bg:${e.bg};--mh-fg:${e.fg};">
            <div class="stack"><div class="hero">
              <div class="content">
                <div class="eyebrow"><ha-icon .icon=${e.icon}></ha-icon><span>${e.name}</span></div>
                <div class="title">${e.title}</div>
                ${null!=e.value?I`<div class="figure">
                      <span class="value">${e.value}</span><span class="unit">%</span>
                      <span class="caption">${e.caption}</span>
                    </div>`:W}
                ${e.secondary?I`<div class="secondary">${e.secondary}</div>`:W}
              </div>
            </div></div>
          </ha-card>`}return I`<ha-card><div class="stack"><div class="hero">
        <div class="content"><div class="title">Entity not found</div></div>
      </div></div></ha-card>`}const t=this._isUnavailable(e),i=this._caps,s=this._working,o=this._alerts[0]||null,n=this._numOf(i.battery),a=this._numOf(i.progress),r=this._stateOf(i.status)??e.state;let l=this._pretty(r);const c=String(r??"").toLowerCase(),d=c.includes("charg")||c.includes("dock");!s&&d&&null!=n&&n>=100&&(l=this.config.docked_label??"Docked"),t&&(l="Unavailable");const h=s&&null!=a&&this._hasProgress,p=h?Math.round(a):n,u=h?this.config.progress_caption??"done":this.config.battery_caption??"battery";let m=null;if(s){const e=this._stateOf(i.room),t=this._minutesLeft,s=[];e&&!["unknown","unavailable"].includes(e)&&s.push(this._pretty(e)),null!=t&&s.push(`about ${t} min left`),m=s.join(" - ")||null}else if(this._drying)m=this.config.drying_label??"Drying the mop";else{const e=this._stateOf(i.last_clean);if(e){const t=new Date(e);if(!Number.isNaN(t.getTime())){const e=Math.round((Date.now()-t.getTime())/6e4);m=`Last cleaned ${e<60?`${Math.max(1,e)} min`:e<1440?`${Math.round(e/60)} h`:`${Math.round(e/1440)} d`} ago`}}}let g=this.config.color??"var(--md-sys-color-secondary-container)",f=this.config.color_on??"var(--md-sys-color-on-secondary-container)";s&&(g=this.config.working_color??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",f=this.config.working_color_on??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))");const _=null!=o&&(null==o.severity||"error"===o.severity);let b=null,v=null;if(o){const[e,t]="info"===o.severity?[g,f]:this._severityPair(o.severity);b=o.color??e,v=o.color_on??t,_&&!1!==this.config.alert_tints_hero&&(g=b,f=v)}const y=lt(90,90,86),x=function(e,t,i,s=0){return ct(e,t,i,s,[{x:.248,y:.317,r:.053},{x:.176,y:.055,r:.053}],10)}(90,90,86),w=rt(90,90,88),k=this.config.name??e.attributes?.friendly_name??this.config.entity,$=this.config.icon??"mdi:robot-vacuum";return this._lastGood={title:l,value:p,caption:u,secondary:m,name:k,icon:$,bg:g,fg:f},I`
      <ha-card style="--mh-bg:${g};--mh-fg:${f};--mh-alert-bg:${b??g};--mh-alert-fg:${v??f};--mh-calm-d:path('${y}');--mh-live-d:path('${x}');">
        <div class="stack">
          <div
            class="hero ${t?"unavailable":""} ${o?"attached":""}"
            @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
          >
            ${!1===this.config.burst?W:I`<svg class="burst ${_?"alarm":s?"working":""}" viewBox="0 0 180 180" aria-hidden="true">
                  ${_?H`<g class="loom"><path d=${w} /></g>`:H`<g class="drift"><path d=${y} /></g>`}
                </svg>`}
            <div class="content">
              <div class="eyebrow">
                <ha-icon .icon=${$}></ha-icon><span>${k}</span>
              </div>
              <div class="title">${l}</div>
              ${null!=p?I`<div class="figure">
                    <span class="value">${p}</span><span class="unit">%</span>
                    <span class="caption">${u}</span>
                  </div>`:W}
              ${m?I`<div class="secondary">${m}</div>`:W}
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
                      @click=${e=>{e.stopPropagation(),this._fireHaptic?.("light"),this._callService("button","press",{},{entity_id:o.reset})}}
                    >
                      <ha-icon icon="mdi:restart"></ha-icon>
                    </button>`:W}
              </div>`:W}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}customElements.define("materia-vacuum-hero",ki),window.customCards=window.customCards||[],window.customCards.push({type:"materia-vacuum-hero",name:"Materia Vacuum Hero",description:"Robot-vacuum headline — derived ETA, negated working states, and mop/consumable warnings. Roborock and Ecovacs.",preview:!0});const $i=[$e,we,ge,n`
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
  `];customElements.define("materia-chips-editor",class extends Be{_formData(){return{show_check:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"Entity holding the selection",selector:{entity:{}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"multi_select",label:"Multi-select (state is a comma-separated list)",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_check",label:"Show the check on selected chips",selector:{boolean:{}}},{name:"color",label:"Selected chip color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Selected chip text",color:!0,template:!0,selector:{text:{}}}]}]}});class Ci extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=$i;static getConfigElement(){return document.createElement("materia-chips-editor")}static getStubConfig(){return{chips:[{label:"Chip 1",value:"one"},{label:"Chip 2",value:"two"}]}}setConfig(e){if(!e.chips?.length)throw new Error("Materia Chips: at least one chip is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"))}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){const e=this._stateObj;return e?this.config.attribute?e.attributes?.[this.config.attribute]:e.state:null}get _selected(){const e=this._current;return null==e||"unknown"===e||"unavailable"===e?[]:Array.isArray(e)?e.map(e=>String(e).trim()):this.config.multi_select?String(e).split(",").map(e=>e.trim()).filter(Boolean):[String(e)]}_chips(){return(this.config.chips||[]).map(e=>"string"==typeof e?{label:e,value:e}:e)}_tap(e){if(this._fireHaptic?.("selection"),e.tap_action)return void this._handleAction(e.tap_action);const t=this._stateObj,i=t?.entity_id?.split(".")[0],s=e.value??e.label;"select"!==i&&"input_select"!==i||null==s||this._callService(i,"select_option",{entity_id:t.entity_id,option:String(s)})}render(){if(!this.hass||!this.config)return I``;const e=this._selected,t=(this._isTemplate(this.config.color)?this._resolvedColor:this.config.color)||"var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))",i=(this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on)||"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))",s=!1!==this.config.show_check;return I`
      <ha-card style="--mc-bg:${t};--mc-fg:${i};">
        <div class="chips">
          ${this._chips().map(t=>{const i=t.value??t.label,o=e.some(e=>e===String(i));return I`
              <button class="chip ${o?"on":""}" @click=${()=>this._tap(t)} aria-pressed=${o?"true":"false"}>
                ${s?I`<ha-icon class="check" icon="m3of:check"></ha-icon>`:t.icon?I`<ha-icon class="lead" .icon=${t.icon}></ha-icon>`:W}
                <span class="text">${t.label??i}</span>
              </button>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-chips",Ci),window.customCards=window.customCards||[],window.customCards.push({type:"materia-chips",name:"Materia Chips",description:"M3 filter chips — wrapping, single or multi-select, with a check that slides in when chosen.",preview:!0});const Si=[$e,we,ke,ge,n`
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
  `];customElements.define("materia-bar-select-editor",class extends Be{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"label",label:"Label",selector:{text:{}}},{name:"attribute",label:"Attribute (e.g. fan_speed) instead of the state",selector:{text:{}}},{name:"off_option",label:'Option shown as its own round button (e.g. "off")',selector:{text:{}}},{name:"off_icon",label:"Icon for that button",selector:{icon:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"Lit bar color",color:!0,template:!0,selector:{text:{}}},{name:"accent_on",label:"Glyph color on the accent fill",color:!0,template:!0,selector:{text:{}}}]},{title:"Advanced",icon:"mdi:tune",fields:[{name:"service",label:"Override service (domain.service)",selector:{text:{}}},{name:"service_key",label:"Override service data key",selector:{text:{}}}]}]}});class Ei extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedAccent:{state:!0},_resolvedAccentOn:{state:!0}};static styles=Si;static getConfigElement(){return document.createElement("materia-bar-select-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("select."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Bar Select: entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("accent","_resolvedAccent"),this._resolveField("accent_on","_resolvedAccentOn"));const t=this._index;null!=this._prevIndex&&t!==this._prevIndex&&this._choreograph(this._prevIndex,t),this._prevIndex=t}get _stateObj(){return this.hass?.states[this.config.entity]}get _rungs(){const e=null!=this.config.off_option?String(this.config.off_option):null;return this._options.filter(t=>null==e||t!==e)}get _index(){return this._rungs.indexOf(String(this._current))}get _current(){const e=this._stateObj;if(!e)return null;const t=this.config.attribute?e.attributes?.[this.config.attribute]:e.state;return null==t?null:String(t)}get _options(){if(this.config.options?.length)return this.config.options.map(String);const e=this._stateObj;if(!e)return[];if(this.config.attribute){const t=e.attributes?.[`${this.config.attribute}_list`];return Array.isArray(t)?t.map(String):[]}const t=e.attributes?.options;return Array.isArray(t)?t.map(String):[]}_fmt(e){const t=this._stateObj;if(!this.config.attribute&&t&&String(t.state)===String(e)){const e=this.hass.formatEntityState?.(t);if(e)return e}const i=String(e).replace(/[_-]+/g," ");return i.charAt(0).toUpperCase()+i.slice(1)}_set(e){const t=this._stateObj;if(!t)return;const i=t.entity_id.split(".")[0];if(this._fireHaptic?.("selection"),this.config.service){const[i,s]=String(this.config.service).split("."),o=this.config.service_key||this.config.attribute||"option";return void this._callService(i,s,{entity_id:t.entity_id,[o]:e})}if(this.config.attribute){const s=this.config.attribute;return void this._callService(i,`set_${s}`,{entity_id:t.entity_id,[s]:e})}"select"!==i&&"input_select"!==i||this._callService(i,"select_option",{entity_id:t.entity_id,option:e})}_choreograph(e,t){if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=Array.from(this.shadowRoot?.querySelectorAll(".bar")||[]);if(!i.length)return;const s=t>e,o=[];for(let s=Math.min(e,t)+1;s<=Math.max(e,t);s++)i[s]&&o.push(i[s]);const n=s?o:o.reverse(),a=s?[{transform:"scaleY(0.94)"},{transform:"scaleY(1.07)",offset:.5},{transform:"scaleY(1)"}]:[{transform:"scaleY(1)"},{transform:"scaleY(0.84)",offset:.5},{transform:"scaleY(0.94)"}];n.forEach((e,t)=>{e.animate(a,{duration:300,delay:45*t,easing:s?"cubic-bezier(.2,1.5,.3,1)":"cubic-bezier(.3,0,.2,1)",fill:"none"})})}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e||this._isUnavailable(e))return I`<ha-card><div class="tile unavailable">
        <div class="meta"><span class="label">${this.config.label??this.config.entity}</span>
        <span class="value">—</span></div>
      </div></ha-card>`;const t=(this._isTemplate(this.config.accent)?this._resolvedAccent:this.config.accent)||"var(--md-sys-cust-color-device, var(--md-sys-color-primary))",i=(this._isTemplate(this.config.accent_on)?this._resolvedAccentOn:this.config.accent_on)||"var(--md-sys-color-on-primary, #fff)",s=this._current,o=null!=this.config.off_option?String(this.config.off_option):null,n=null!=o&&s===o,a=this._rungs,r=this._index,l=a.length,c=null==this._prevIndex?r:this._prevIndex,d=r>c?1:r<c?-1:0,h=this.config.label??e.attributes?.friendly_name??this.config.entity;return I`
      <ha-card style="--bs-accent:${t};--bs-accent-on:${i};">
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
              </button>`:W}

          <div class="bars">
            ${a.map((e,t)=>I`<button
                class="bar ${r>=t?"lit":""}"
                style="height:${l>1?34+66*t/(l-1):100}%;transition-delay:${(e=>d>0?e>c&&e<=r?45*(e-c-1):0:d<0&&e>r&&e<=c?45*(c-e):0)(t)}ms"
                @click=${()=>this._set(e)}
                aria-pressed=${r===t?"true":"false"}
                title=${this._fmt(e)}
              ></button>`)}
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-bar-select",Ei),window.customCards=window.customCards||[],window.customCards.push({type:"materia-bar-select",name:"Materia Bar Select",description:"Tap-a-bar level picker — climbing bars for fan speeds, mop levels, any ordered select.",preview:!0});const Ai=[$e,we,ge,n`
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
  `];customElements.define("materia-carousel-editor",class extends Be{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"Entity holding the selection",selector:{entity:{}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"multi_select",label:"Multi-select (state is a comma-separated list)",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Selected tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Selected tile text",color:!0,template:!0,selector:{text:{}}}]}]}});class zi extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=Ai;static getConfigElement(){return document.createElement("materia-carousel-editor")}static getStubConfig(){return{items:[{label:"Item 1",value:"one"},{label:"Item 2",value:"two"}]}}setConfig(e){if(!e.items?.length)throw new Error("Materia Carousel: at least one item is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"))}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){const e=this._stateObj;return e?this.config.attribute?e.attributes?.[this.config.attribute]:e.state:null}get _selected(){const e=this._current;return null==e||"unknown"===e||"unavailable"===e?[]:Array.isArray(e)?e.map(e=>String(e).trim()):this.config.multi_select?String(e).split(",").map(e=>e.trim()).filter(Boolean):[String(e)]}_items(){return(this.config.items||[]).map(e=>"string"==typeof e?{label:e,value:e}:e)}updated(e){super.updated?.(e);const t=new Set(this._selected.map(String));if(this._prevSel){const e=[...new Set([...t,...this._prevSel])].filter(e=>t.has(e)!==this._prevSel.has(e));e.length&&this._ripple(e,t)}this._prevSel=t}_ripple(e,t){if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=Array.from(this.shadowRoot?.querySelectorAll(".tile")||[]);if(!i.length)return;const s=this._items(),o=e.map(e=>s.findIndex(t=>String(t.value??t.label)===e)).filter(e=>e>=0);o.length&&i.forEach((e,t)=>{const i=Math.min(...o.map(e=>Math.abs(e-t)));if(i>2)return;const s=0===i?1.04:1===i?.985:.995,n=me;e.animate([{transform:"scale(1)"},{transform:`scale(${s})`},{transform:"scale(1)"}],{duration:n.ms,delay:30*i,easing:n.easing,fill:"none"})})}_onPointerDown(e){this._stopMomentum(),"mouse"===e.pointerType&&(this._dragStartX=e.clientX,this._dragStartScroll=e.currentTarget.scrollLeft,this._captured=!1,this._didDrag=!1,this._dragPointerId=e.pointerId,this._lastX=e.clientX,this._lastT=performance.now(),this._velocity=0)}_onPointerMove(e){if(null==this._dragStartX)return;const t=e.clientX-this._dragStartX;if(!this._captured&&Math.abs(t)>4&&(this._captured=!0,this._didDrag=!0,e.currentTarget.setPointerCapture(this._dragPointerId)),!this._captured)return;e.currentTarget.scrollLeft=this._dragStartScroll-t;const i=performance.now(),s=i-this._lastT;if(s>0){const t=(this._lastX-e.clientX)/s;this._velocity=.7*this._velocity+.3*t,this._lastX=e.clientX,this._lastT=i}}_onPointerUp(e){if(null==this._dragStartX)return;const t=e.currentTarget;t.releasePointerCapture?.(e.pointerId),this._dragStartX=null,this._captured=!1,Math.abs(this._velocity)>.05&&this._startMomentum(t)}_startMomentum(e){let t=this._velocity,i=performance.now();const s=()=>{const o=performance.now(),n=Math.min(32,o-i);i=o;const a=e.scrollLeft;e.scrollLeft+=t*n,e.scrollLeft!==a?(t*=Math.pow(.95,n/16),this._raf=Math.abs(t)>.02?requestAnimationFrame(s):null):this._raf=null};this._raf=requestAnimationFrame(s)}_stopMomentum(){this._raf&&(cancelAnimationFrame(this._raf),this._raf=null)}disconnectedCallback(){super.disconnectedCallback(),this._stopMomentum()}_tap(e){if(this._didDrag)return void(this._didDrag=!1);if(this._fireHaptic?.("selection"),e.tap_action)return void this._handleAction(e.tap_action);const t=this._stateObj,i=t?.entity_id?.split(".")[0],s=e.value??e.label;"select"!==i&&"input_select"!==i||null==s||this._callService(i,"select_option",{entity_id:t.entity_id,option:String(s)})}render(){if(!this.hass||!this.config)return I``;const e=this._selected,t=(this._isTemplate(this.config.color)?this._resolvedColor:this.config.color)||"var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))",i=(this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on)||"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))";return I`
      <ha-card style="--mcar-bg:${t};--mcar-fg:${i};">
        <div
          class="rail"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${this._items().map(t=>{const i=t.value??t.label,s=e.some(e=>e===String(i));return I`
              <button class="tile ${s?"on":""}" @click=${()=>this._tap(t)} aria-pressed=${s?"true":"false"}>
                <div class="top">
                  ${t.icon?I`<ha-icon class="glyph" .icon=${t.icon}></ha-icon>`:I`<span></span>`}
                  <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
                </div>
                <div class="bottom">
                  <span class="name">${t.label??i}</span>
                  ${t.secondary?I`<span class="sub">${t.secondary}</span>`:W}
                </div>
              </button>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-carousel",zi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-carousel",name:"Materia Carousel",description:"Scroll-snapping row of selectable tiles — the richer alternative to a chip row.",preview:!0});const Mi=[$e,we,ke,ge,n`
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
  `],Ti="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:var(--md-sys-color-secondary-container, rgba(120,120,128,.14));color:var(--md-sys-color-on-secondary-container, inherit);margin-bottom:6px;cursor:pointer;",Fi="border:none;background:transparent;color:inherit;cursor:pointer;padding:4px;display:grid;place-items:center;border-radius:50%;--mdc-icon-size:18px;",Oi="border:1.5px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.2));background:transparent;color:inherit;font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;";customElements.define("materia-climate-panel-editor",class extends Be{static properties={_secIdx:{state:!0},_cardIdx:{state:!0},_huiReady:{state:!0}};connectedCallback(){super.connectedCallback(),this._loadHui()}async _loadHui(){if(customElements.get("hui-card-picker")&&customElements.get("hui-card-element-editor"))this._huiReady=!0;else{try{const e=await pe(),t=await e.createCardElement({type:"vertical-stack",cards:[]});await(t?.constructor?.getConfigElement?.())}catch{}this._huiReady=!!customElements.get("hui-card-picker")}}_formData(){return{...this._config}}get _secs(){return this._config?.sections||[]}_setSecs(e){const t={...this._config};e.length?t.sections=e:delete t.sections,this._commit(t)}_patchSec(e,t){const i=[...this._secs],s={...i[e],...t};for(const e of Object.keys(t))void 0!==t[e]&&""!==t[e]&&null!==t[e]||delete s[e];i[e]=s,this._setSecs(i)}_moveSec(e,t){const i=[...this._secs],s=e+t;s<0||s>=i.length||([i[e],i[s]]=[i[s],i[e]],this._setSecs(i))}_addSec(){const e=this._secs.length;this._setSecs([...this._secs,{title:"New section",style:"section",cards:[]}]),this._secIdx=e}_patchCards(e,t){this._patchSec(e,{cards:t})}render(){return this.hass&&this._config?null!=this._secIdx&&null!=this._cardIdx?this._renderCardView():null!=this._secIdx?this._renderSectionView():super.render():I``}_back(e,t){return I`
      <div style="display:flex;align-items:center;gap:8px;margin:4px 0 14px;">
        <button style=${Fi} @click=${t}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <span style="font-weight:600;font-size:15px;">${e}</span>
      </div>
    `}_sel(e,t,i,s){return I`
      <div style="margin-bottom:12px;" @value-changed=${e=>{e.stopPropagation(),s(e.detail.value)}}>
        <ha-selector .hass=${this.hass} .selector=${t} .value=${i} .label=${e}></ha-selector>
      </div>
    `}_renderExtra(){return I`
      <ha-expansion-panel outlined .header=${"Sections"} .secondary=${"Wallet sections and menus below the mode group"} .expanded=${!0}>
        <ha-icon slot="leading-icon" icon="mdi:wallet-outline"></ha-icon>
        <div style="padding:12px;">
          ${this._secs.map((e,t)=>I`
            <div style=${Ti} @click=${()=>{this._secIdx=t}}>
              <span style="opacity:.6;font-weight:600;">${t+1}</span>
              <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${e.title||("menu"===e.style?"Menu":"Section")}
              </span>
              <span style="opacity:.6;font-size:12px;">${"menu"===e.style?"menu":`${(e.cards||[]).length} cards`}</span>
              <button style=${Fi} title="Move up" @click=${e=>{e.stopPropagation(),this._moveSec(t,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button style=${Fi} title="Move down" @click=${e=>{e.stopPropagation(),this._moveSec(t,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button style=${Fi} title="Edit" @click=${e=>{e.stopPropagation(),this._secIdx=t}}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button style=${Fi} title="Delete" @click=${e=>{e.stopPropagation(),this._setSecs(this._secs.filter((e,i)=>i!==t))}}><ha-icon icon="mdi:delete"></ha-icon></button>
            </div>
          `)}
          <button style=${Oi} @click=${()=>this._addSec()}>
            <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add section
          </button>
        </div>
      </ha-expansion-panel>
    `}_renderSectionView(){const e=this._secIdx,t=this._secs[e];if(!t)return this._secIdx=null,I``;const i="menu"===t.style?"menu":"section";return I`
      ${this._back(t.title||`Section ${e+1}`,()=>{this._secIdx=null})}
      ${this._sel("Title",{text:{}},t.title,t=>this._patchSec(e,{title:t}))}
      ${this._sel("Icon",{icon:{}},t.icon,t=>this._patchSec(e,{icon:t}))}
      ${this._sel("Style",{select:{mode:"dropdown",options:[{value:"section",label:"Wallet section (nested cards)"},{value:"menu",label:"Menu (tap opens options)"}]}},i,t=>this._patchSec(e,{style:t}))}
      ${"menu"===i?this._renderMenuFields(e,t):this._renderSectionCards(e,t)}
    `}_renderMenuFields(e,t){const i=t.options||[],s=(t,s)=>{const o=i.map((e,i)=>i===t?{...e,...s}:e);for(const e of Object.keys(s))""!==s[e]&&null!=s[e]||delete o[t][e];this._patchSec(e,{options:o})};return I`
      ${this._sel("Entity (select / input_select / water_heater)",{entity:{}},t.entity,t=>this._patchSec(e,{entity:t}))}
      ${this._sel("Substate (secondary line — supports templates)",{template:{}},t.substate,t=>this._patchSec(e,{substate:t}))}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Manual options (override the entity's)</div>
      ${i.map((t,o)=>I`
        <div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:8px;">
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(o,{label:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.label} .label=${"Label"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(o,{value:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.value} .label=${"Value"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(o,{icon:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${t.icon} .label=${"Icon"}></ha-selector>
          </div>
          <button style="${Fi}margin-top:12px;" title="Remove option"
            @click=${()=>this._patchSec(e,{options:i.filter((e,t)=>t!==o)})}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>
      `)}
      <button style=${Oi} @click=${()=>this._patchSec(e,{options:[...i,{label:"",value:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add option
      </button>
    `}_renderActions(e,t){const i=t.actions||[],s=(t,s)=>{const o=i.map((e,i)=>i===t?{...e,...s}:e);for(const e of Object.keys(s))""!==s[e]&&null!=s[e]||delete o[t][e];this._patchSec(e,{actions:o})};return I`
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Bar actions (chips in the open bar)</div>
      ${i.map((t,o)=>I`
        <div style="border:1px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.15));border-radius:12px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:flex-start;">
            <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(o,{label:e.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.label} .label=${"Label"}></ha-selector>
            </div>
            <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(o,{icon:e.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${t.icon} .label=${"Icon"}></ha-selector>
            </div>
            <button style="${Fi}margin-top:12px;" title="Remove action"
              @click=${()=>this._patchSec(e,{actions:i.filter((e,t)=>t!==o)})}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </button>
          </div>
          <div style="margin-top:8px;" @value-changed=${e=>{e.stopPropagation(),s(o,{tap_action:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{ui_action:{}}} .value=${t.tap_action} .label=${"Action"}></ha-selector>
          </div>
        </div>
      `)}
      <button style="${Oi}margin-bottom:12px;" @click=${()=>this._patchSec(e,{actions:[...i,{label:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add action
      </button>
    `}_renderSectionCards(e,t){const i=t.cards||[],s=(t,s)=>{const o=t+s;if(o<0||o>=i.length)return;const n=[...i];[n[t],n[o]]=[n[o],n[t]],this._patchCards(e,n)};return I`
      ${this._sel("Info (closed-bar text — supports templates)",{template:{}},t.info,t=>this._patchSec(e,{info:t}))}
      ${this._sel("…or info from an entity's state",{entity:{}},t.info_entity,t=>this._patchSec(e,{info_entity:t}))}
      ${this._renderActions(e,t)}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Cards</div>
      ${i.map((t,o)=>I`
        <div style=${Ti} @click=${()=>{this._cardIdx=o}}>
          <span style="opacity:.6;font-weight:600;">${o+1}</span>
          <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t.type||"card"}</span>
          <button style=${Fi} title="Move up" @click=${e=>{e.stopPropagation(),s(o,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button style=${Fi} title="Move down" @click=${e=>{e.stopPropagation(),s(o,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
          <button style=${Fi} title="Edit" @click=${e=>{e.stopPropagation(),this._cardIdx=o}}><ha-icon icon="mdi:pencil"></ha-icon></button>
          <button style=${Fi} title="Delete" @click=${t=>{t.stopPropagation(),this._patchCards(e,i.filter((e,t)=>t!==o))}}><ha-icon icon="mdi:delete"></ha-icon></button>
        </div>
      `)}
      ${this._huiReady?I`<hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${t=>{t.stopPropagation(),this._patchCards(e,[...i,t.detail.config])}}
          ></hui-card-picker>`:I`<div style="opacity:.7;font-size:12px;margin-top:8px;">Card picker unavailable — add cards via the YAML editor.</div>`}
    `}_renderCardView(){const e=this._secIdx,t=this._cardIdx,i=this._secs[e]?.cards?.[t];return i?I`
      ${this._back(i.type||"Card",()=>{this._cardIdx=null})}
      ${customElements.get("hui-card-element-editor")?I`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            .value=${i}
            @config-changed=${i=>{i.stopPropagation();const s=[...this._secs[e].cards||[]];s[t]=i.detail.config,this._patchCards(e,s)}}
          ></hui-card-element-editor>`:W}
    `:(this._cardIdx=null,I``)}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"reserve_height",label:"Keep the height of the tallest section (no reflow when cycling)",selector:{boolean:{}}}]},{title:"Dial",icon:"mdi:thermostat",fields:[{name:"temperature_entity",label:"Current-temp sensor (marker on the dial)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"step",label:"Step",selector:{number:{min:.1,max:2,step:.1,mode:"box"}}},{name:"min_temp",label:"Dial min (default: entity)",selector:{number:{min:-30,max:40,step:.5,mode:"box"}}},{name:"max_temp",label:"Dial max (default: entity)",selector:{number:{min:0,max:60,step:.5,mode:"box"}}},{name:"steppers",label:"Stepper placement",selector:{select:{mode:"dropdown",options:[{value:"side",label:"Vertical, beside the dial"},{value:"below",label:"Below the dial"}]}}},{name:"wave",label:"Wave animation",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (hvac_action, or inferred from temps)"},{value:"always",label:"Always (whenever the mode is on)"},{value:"never",label:"Never"}]}}}]}]}});const qi=[$e,we,ke,ge,n`
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
  `],Di=-135,Pi=270,Ui="var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))",Ri="var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))",Ni={auto:{icon:"mdi:thermostat-auto",color:Ui,on:Ri,container:Ri,onContainer:Ui},heat_cool:{icon:"mdi:thermostat-auto",color:Ui,on:Ri,container:Ri,onContainer:Ui},heat:{icon:"m3o:mode-heat",color:"var(--md-sys-cust-color-climate-heat-accent, #a14614)",on:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",container:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",onContainer:"var(--md-sys-cust-color-climate-heat-accent, #a14614)"},cool:{icon:"mdi:snowflake",color:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)",on:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",container:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",onContainer:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)"},dry:{icon:"mdi:water-percent",color:Ui,on:Ri,container:Ri,onContainer:Ui},fan_only:{icon:"mdi:fan",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"},off:{icon:"m3o:power-settings-new",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"}};class ji extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_adjusting:{state:!0}};static styles=qi;setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e}}connectedCallback(){super.connectedCallback(),this._phase=0,this._amp=0,this._startLoop()}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),clearTimeout(this._optimisticTimer),clearTimeout(this._sendTimer)}get _entity(){return this.hass?.states[this.config.entity]}get _action(){return this._entity?.attributes?.hvac_action??""}get _waveAction(){const e=this._mode;if("off"===e||"never"===this.config.wave)return"";if("always"===this.config.wave)return"cool"===e?"cooling":"heating";const t="auto"===e||"heat_cool"===e,i=t?"holding":"",s=this._action;if("heating"===s||"cooling"===s)return s;if(s&&"idle"!==s)return"";const o=this._current,n=this._target;return null==n||"idle"===s?i:null==o?"cool"===e?"cooling":"heat"===e?"heating":i:("heat"===e||t)&&o<n-.2?"heating":("cool"===e||t)&&o>n+.2?"cooling":i}get _mode(){return this._entity?.state??"off"}get _target(){return null!=this._optimisticTemp?this._optimisticTemp:this._numRaw(this._entity?.attributes?.temperature)}get _current(){if(this.config.temperature_entity){const e=this.hass?.states[this.config.temperature_entity];if(e)return this._numRaw(e.state)}return this._numRaw(this._entity?.attributes?.current_temperature)}_numRaw(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}get _step(){return this.config.step??this._numRaw(this._entity?.attributes?.target_temp_step)??.5}get _scale(){return{min:this.config.min_temp??this._numRaw(this._entity?.attributes?.min_temp)??7,max:this.config.max_temp??this._numRaw(this._entity?.attributes?.max_temp)??35}}_startLoop(){if(this._raf)return;const e=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,t=()=>{const i=this._waveAction,s="heating"===i||"cooling"===i,o=e?0:s?1:"holding"===i?.35:0,n=this._amp+.06*(o-this._amp),a=Math.abs(n-o)<.01;if(this._amp=a?o:n,this._amp>.005||o>0){this._phase+="cooling"===i?.012:s?-.012:-.008;const e=this._waveGeom;if(e){const t=this.renderRoot?.querySelector("path.wave-seg");t&&t.setAttribute("d",this._wavePath(e.start,e.end,e.r))}this._raf=requestAnimationFrame(t)}else this._raf=null};this._raf=requestAnimationFrame(t)}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}updated(e){if(this._waveAction&&!this._raf&&this._startLoop(),e.has("hass")&&null!=this._optimisticTemp){const e=this._numRaw(this._entity?.attributes?.temperature);null!=e&&Math.abs(e-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}_modeGroupConfig(e,t,i){const s=`${this.config.entity}|${e.join()}|${t}|${i}|${this.config.mode_size??"m"}`;return this._mgKey!==s&&(this._mgKey=s,this._mgConfig={entity:this.config.entity,size:this.config.mode_size??"m",variant:"tonal",active_shape:"square",color_active:t,color_on_active:i,options:e.map(e=>({icon:Ni[e].icon,value:e,tap_action:{action:"perform-action",perform_action:"climate.set_hvac_mode",data:{hvac_mode:e},target:{entity_id:this.config.entity}}}))}),this._mgConfig}_angleFor(e,t,i){const s=Math.min(1,Math.max(0,(e-t)/(i-t)));return Di+Pi*s}_pointAt(e,t,i=0){const s=(e-90)*Math.PI/180,o=t+i;return[50+o*Math.cos(s),50+o*Math.sin(s)]}_wavePath(e,t,i){const s=t-e,o=1+.55*Math.max(0,Math.min(1,(90-s)/70)),n=Math.min(20,Math.max(6,s/3)),a=3.2*o*this._amp,r=[];for(let s=e;s<=t;s+=2){const o=s-e,l=a*Math.min(1,o/n)*Math.min(1,(t-s)/n)*Math.sin(o/7+this._phase);r.push(this._pointAt(s,i,l))}return r.push(this._pointAt(t,i,0)),"M"+r.map(([e,t])=>`${e.toFixed(2)} ${t.toFixed(2)}`).join(" L")}_arcPath(e,t,i){const[s,o]=this._pointAt(e,i),[n,a]=this._pointAt(t,i),r=t-e>180?1:0;return`M${s.toFixed(2)} ${o.toFixed(2)} A${i} ${i} 0 ${r} 1 ${n.toFixed(2)} ${a.toFixed(2)}`}_setTarget(e){const{min:t,max:i}=this._scale,s=this._step,o=Math.round(100*Math.min(i,Math.max(t,Math.round(e/s)*s)))/100;this._optimisticTemp=o,this._adjusting=!0,clearTimeout(this._adjustTimer),this._adjustTimer=setTimeout(()=>{this._adjusting=!1},650),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4),clearTimeout(this._sendTimer),this._sendTimer=setTimeout(()=>{this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:o})},350)}_nudge(e){const t=this._target;null!=t&&this._setTarget(t+e)}_dialPointer(e){if(!this._dialDragging&&"pointerdown"!==e.type)return;const t=this.renderRoot.querySelector(".dial").getBoundingClientRect(),i=(e.clientX-t.left)/t.width*100-50,s=(e.clientY-t.top)/t.height*100-50;let o=180*Math.atan2(s,i)/Math.PI+90;if(o>180&&(o-=360),o<-143||o>143)return;const n=Math.min(1,Math.max(0,(o-Di)/Pi)),{min:a,max:r}=this._scale;"pointerdown"===e.type&&(this._dialDragging=!0,e.currentTarget.setPointerCapture(e.pointerId)),this._setTarget(a+n*(r-a))}_endDialDrag(e){this._dialDragging=!1,e.currentTarget.releasePointerCapture?.(e.pointerId)}render(){if(!this.hass||!this.config)return I``;const e=this._entity;if(!e)return I``;const t=this._isUnavailable(e),{min:i,max:s}=this._scale,o=this._target,n=this._current,a=this._mode,r=this._waveAction,l=Ni[a]||Ni.off,c="off"!==a&&null!=o,d=42,h=c?this._angleFor(o,i,s):Di,p=null!=o?this._angleFor(o,i,s):null,[u,m]=this._pointAt(c?h:p??h,d),g=null!=n?this._angleFor(n,i,s):null;let f=null,_=null,b=null;c&&"holding"===r?(_=Di,b=null!=g?Math.max(g,h):h):c&&null!=g?(f=Math.min(g,h),_=f,b=Math.max(g,h)):c&&(_=Di,b=h);const v="heating"===r?Ni.heat:"cooling"===r?Ni.cool:l,y=v.color,x=v.on,w=this.hass.formatEntityState?.(e)??a,k=this.hass.config?.unit_system?.temperature??"°C",$=(this.config.hvac_modes??e.attributes.hvac_modes??[]).filter(e=>Ni[e]);return this._waveGeom=c&&null!=b&&b>_+.5?{start:_,end:b,r:d}:null,I`
      <ha-card
        class="${t?"unavailable":""}"
        style="--th-container:${v.container};--th-on-container:${v.onContainer};"
      >
        <div class="dial-row ${"side"===this.config.steppers?"side":""}">
        <div class="dial-wrap">
          <svg class="dial" viewBox="0 0 100 100">
            <!-- Invisible wide stroke along the track: the ONLY interactive
                 zone. Swipes/scrolls starting elsewhere on the card pass
                 through untouched (e.g. to a surrounding swipe-card). -->
            <path
              d=${this._arcPath(Di,135,d)}
              class="hit-ring"
              @pointerdown=${this._dialPointer}
              @pointermove=${this._dialPointer}
              @pointerup=${this._endDialDrag}
              @pointercancel=${this._endDialDrag}
            />
            ${(()=>{const e=c?Math.max(h,g??h):Di,t=c?Math.min(e+8,135):Di;return t<134.5?H`<path d=${this._arcPath(t,135,d)} class="track" />`:""})()}
            ${c||null==g?"":H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="1.6" class="current-dot" />`}
            ${c&&null!=f&&f>-134.5?H`<path d=${this._arcPath(Di,f,d)} class="sweep" style="stroke:${y}" />`:""}
            ${c&&null!=b&&b>_+.5?H`<path d=${this._wavePath(_,b,d)} class="sweep wave-seg" style="stroke:${y}" />`:""}
            ${c&&null!=g?H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="3.4" class="current-knob" style="fill:${y}" />`:""}
            ${c?H`<g>
                  <circle cx=${u} cy=${m} r="5.5" class="thumb" style="fill:${y}" />
                  <path d=${st(u,m,3.7,12)} class="thumb-cookie" />
                </g>`:null!=p?H`<g>
                    <circle cx=${u} cy=${m} r="5.5" class="thumb muted" />
                    <path d=${st(u,m,3.7,12)} class="thumb-cookie" />
                  </g>`:""}
          </svg>
          <div class="center" @click=${()=>this._fireMoreInfo(this.config.entity)}>
            <div class="mode-label">${w}</div>
            <div class="target ${this._adjusting?"adjusting":""}">
              ${null!=o?Math.round(10*o)/10:null!=n?Math.round(10*n)/10:"—"}<span class="deg">${k}</span>
            </div>
            ${null!=n&&!1!==this.config.show_current?I`<div class="current-label">${this.config.current_label??Me("cp_currently",this.hass)} ${Math.round(10*n)/10}°</div>`:""}
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

        ${!1!==this.config.show_modes&&$.length?I`<materia-button-group
              .hass=${this.hass}
              .config=${this._modeGroupConfig($,y,x)}
            ></materia-button-group>`:""}
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 5}}customElements.define("materia-climate-dial",ji),window.customCards=window.customCards||[];const Bi={heat:["var(--md-sys-cust-color-climate-heat-accent, #a14614)","var(--md-sys-cust-color-climate-heat-container, #ffeee9)"],cool:["var(--md-sys-cust-color-climate-cool-accent, #327ea7)","var(--md-sys-cust-color-climate-cool-container, #eaf3ff)"],auto:["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))","var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],heat_cool:["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))","var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],off:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"]};class Li extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_openSection:{state:!0}};static styles=Mi;static getConfigElement(){return document.createElement("materia-climate-panel-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("climate."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Climate Panel: entity is required");this.config={...e},this._extraEls=null,this.isConnected&&this._createExtraCards()}firstUpdated(){this._createExtraCards()}updated(e){if(e.has("hass")&&this._extraEls){const e=this._openSection??0;this._extraEls[e]?.forEach(e=>{e.hass=this.hass})}this._reserveHeight()}get _entity(){return this.hass?.states[this.config.entity]}_modeGroup(){const e=(this._entity?.attributes?.hvac_modes||[]).filter(e=>["heat","auto","off","cool","heat_cool"].includes(e));if(!e.length)return W;const[t,i]=Bi[this._entity?.state]??Bi.off;return I`
      <materia-button-group
        .hass=${this.hass}
        .config=${{entity:this.config.entity,size:"m",variant:"tonal",active_shape:"square",color_active:t,color_on_active:i,options:e.map(e=>({icon:{heat:"m3o:mode-heat",cool:"mdi:snowflake",auto:"mdi:thermostat-auto",heat_cool:"mdi:thermostat-auto",off:"m3o:power-settings-new"}[e],value:e,tap_action:{action:"perform-action",perform_action:"climate.set_hvac_mode",data:{hvac_mode:e},target:{entity_id:this.config.entity}}}))}}
      ></materia-button-group>
    `}get _sectionConfigs(){return(this.config.sections||[]).map(e=>({style:"section",...e}))}_menuCardConfig(e){const t={type:"custom:materia-menu",entity:e.entity,icon:e.icon,name:e.title,menu_variant:"expressive"};return e.options?.length&&(t.options=e.options),null!=e.substate&&(t.substate=e.substate),e.state_colors&&(t.state_colors=e.state_colors),t}async _createExtraCards(){const e=this._extraGen=(this._extraGen||0)+1,t=this._sectionConfigs;if(!t.length)return void(this._extraEls=[]);const i=await pe(),s=await Promise.all(t.map(async e=>{if("menu"===e.style)return[];const t=e.cards??(e.entity?[this._menuCardConfig(e)]:[]);return(await Promise.all(t.map(async e=>{try{const t=await i.createCardElement(e);return t.hass=this.hass,t}catch{return null}}))).filter(Boolean)}));e===this._extraGen&&(this._extraEls=s,this.requestUpdate())}_accordionSections(){return this._sectionConfigs.map((e,t)=>{let i="";if(null!=e.info)this._isTemplate(e.info)?(this._resolveTemplateValue(`secInfo${t}`,e.info),i=this._tplResults?.[`secInfo${t}`]??""):i=e.info;else if(e.info_entity){const t=this.hass.states[e.info_entity];i=t?this.hass.formatEntityState?.(t)??t.state:""}const s=e.actions?.length?I`
          <div class="acc-actions">
            ${e.actions.map(e=>I`
              <button class="mini" @click=${t=>{t.stopPropagation(),this._handleAction(e.tap_action)}}>
                ${e.icon?I`<ha-icon icon=${e.icon} style="--mdc-icon-size:15px;"></ha-icon>`:""}${e.label??""}
              </button>
            `)}
          </div>
        `:null;return{style:e.style,menuConfig:"menu"===e.style?this._menuCardConfig(e):null,title:e.title??Me("cp_section_default",this.hass,{n:t+1}),icon:e.icon,info:i,actions:s,body:this._extraEls?.[t]?.length?I`<div class="acc-cards">${this._extraEls[t]}</div>`:W}})}_openAcc(e){this._openSection!==e&&(this._openSection=e,this._fireHaptic("light"),this._extraEls?.[e]?.forEach(e=>{e.hass=this.hass}))}_reserveHeight(){const e=this.renderRoot?.querySelector(".stack");e&&(this.config.reserve_height?requestAnimationFrame(()=>{const t=[...e.querySelectorAll(".acc-inner")];if(!t.length)return;const i=e.querySelector(".acc-sec.open .acc-inner");e.style.minHeight="";const s=e.offsetHeight-(i?.offsetHeight||0),o=Math.max(...t.map(e=>e.scrollHeight));e.style.minHeight=`${s+o}px`}):e.style.minHeight="")}render(){if(!this.hass||!this.config)return I``;if(!this._entity)return I`<ha-card class="panel">Unknown entity: ${this.config.entity}</ha-card>`;const e=this._accordionSections(),t=e.findIndex(e=>"menu"!==e.style),i=this._openSection??t,s=this._entity.state,o="off"!==s&&Bi[s],[n,a]=Bi[s]??Bi.off;return I`
      <ha-card class="panel" style=${o?`--ms-track:${n};--ms-thumb:${a};`:""}>
        <materia-climate-dial
          .hass=${this.hass}
          .config=${{entity:this.config.entity,show_modes:!1,wave:this.config.wave??"auto",steppers:this.config.steppers??"side",...null!=this.config.step?{step:this.config.step}:{},...null!=this.config.min_temp?{min_temp:this.config.min_temp}:{},...null!=this.config.max_temp?{max_temp:this.config.max_temp}:{},...this.config.temperature_entity?{temperature_entity:this.config.temperature_entity}:{}}}
        ></materia-climate-dial>
        <div class="stack ${this.config.reserve_height?"reserve":""}">
          <div class="seg">${this._modeGroup()}</div>
          ${e.map((e,t)=>"menu"===e.style?I`
              <div class="seg menu-seg">
                <materia-menu .hass=${this.hass} .config=${e.menuConfig}></materia-menu>
              </div>`:I`
              <div class="seg acc-sec ${i===t?"open":""}">
                <div class="acc-bar" @click=${()=>this._openAcc(t)}>
                  ${e.icon?I`<ha-icon class="acc-icon" icon=${e.icon}></ha-icon>`:""}
                  <span class="acc-title">${e.title}</span>
                  ${i===t?e.actions??W:I`<span class="acc-info">${e.info}</span><ha-icon class="acc-chev" icon="mdi:chevron-down"></ha-icon>`}
                </div>
                <div class="acc-body"><div class="acc-inner">${e.body}</div></div>
              </div>`)}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 6}}customElements.define("materia-climate-panel",Li),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate-panel",name:"Materia Climate Panel",description:"Climate panel: thermostat dial hero, mode group, and wallet sections you compose with any cards or menus.",preview:!0});const Ii={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},tertiary:{active:"var(--md-sys-color-tertiary)",onActive:"var(--md-sys-color-on-tertiary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat-container)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool-container)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto-container)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device)",onActive:"var(--md-sys-cust-color-on-device)"}},Hi={xs:{height:32,innerCorner:4},s:{height:40,innerCorner:8},m:{height:56,innerCorner:8},l:{height:96,innerCorner:16},xl:{height:136,innerCorner:20}},Vi=[$e,we,ge,n`
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
  `],Wi=[$e,n`
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

    /* ---- color roles × variants ----
       Variant (emphasis) and color role (meaning) are independent axes, per the
       M3 expressive button spec. The base declarations below ARE the spec's
       per-variant defaults, straight from the androidx tokens (FilledButton /
       FilledTonalButton / OutlinedButton / TextButton / ElevatedButtonTokens):
       filled reads the ACCENT pair (primary), tonal the CONTAINER pair
       (secondary-container — note the spec's default families deliberately
       differ per variant), outlined/text a NEUTRAL label (on-surface-variant),
       elevated an accent label on surface-container-low. A role-* class then
       repoints all three channels at one family, so role: tertiary or
       role: error colors any variant coherently. */
    .btn {
      --mb-accent: var(--md-sys-color-primary);
      --mb-on-accent: var(--md-sys-color-on-primary);
      --mb-container: var(--md-sys-color-secondary-container);
      --mb-on-container: var(--md-sys-color-on-secondary-container);
      --mb-label: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
    }
    .role-primary {
      --mb-container: var(--md-sys-color-primary-container);
      --mb-on-container: var(--md-sys-color-on-primary-container);
      --mb-label: var(--md-sys-color-primary);
    }
    .role-secondary {
      --mb-accent: var(--md-sys-color-secondary);
      --mb-on-accent: var(--md-sys-color-on-secondary);
      --mb-label: var(--md-sys-color-secondary);
    }
    .role-tertiary {
      --mb-accent: var(--md-sys-color-tertiary);
      --mb-on-accent: var(--md-sys-color-on-tertiary);
      --mb-container: var(--md-sys-color-tertiary-container);
      --mb-on-container: var(--md-sys-color-on-tertiary-container);
      --mb-label: var(--md-sys-color-tertiary);
    }
    .role-error {
      --mb-accent: var(--md-sys-color-error);
      --mb-on-accent: var(--md-sys-color-on-error);
      --mb-container: var(--md-sys-color-error-container);
      --mb-on-container: var(--md-sys-color-on-error-container);
      --mb-label: var(--md-sys-color-error);
    }

    /* ---- variants ---- */
    .variant-filled {
      background: var(--mb-accent);
      color: var(--mb-on-accent);
    }
    .variant-tonal {
      background: var(--mb-container);
      color: var(--mb-on-container);
    }
    .variant-outlined {
      background: transparent;
      /* Expressive spec: outline-variant, not outline — the border is a shape
         cue, not a second ink. */
      border: 1px solid var(--md-sys-color-outline-variant, var(--md-sys-color-outline));
      color: var(--mb-label);
    }
    .variant-text {
      background: transparent;
      color: var(--mb-label);
    }
    .variant-elevated {
      background: var(--md-sys-color-surface-container-low, var(--ha-card-background, var(--card-background-color)));
      /* ElevatedButtonTokens.LabelTextColor = Primary — the accent channel. */
      color: var(--mb-accent);
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
  `];class Gi extends Be{static properties={_expanded:{state:!0},_actionRows:{state:!0}};static styles=[Be.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null,this._actionRows??=Object.entries(e.tap_action_map||{}).map(([e,t])=>({state:e,tap_action:t}))}get _sections(){return[{title:"Button",icon:"mdi:gesture-tap-button",fields:[{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"label",template:!0,selector:{text:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"elevated",label:"Elevated"},{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"outlined",label:"Outlined"},{value:"text",label:"Text"}]}}},{name:"role",label:"Color role",helper:"Unset = each variant's spec default (filled → primary, tonal → secondary).",selector:{select:{mode:"dropdown",options:[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32)"},{value:"s",label:"S (40)"},{value:"m",label:"M (56)"},{value:"l",label:"L (96)"},{value:"xl",label:"XL (136)"}]}}},{name:"shape",selector:{select:{mode:"dropdown",options:[{value:"round",label:"Round (pill)"},{value:"square",label:"Square"}]}}},{name:"wide",selector:{boolean:{}}},{name:"entity",selector:{entity:{}}},{name:"disabled",helper:"Template returning true / false",selector:{template:{}}}]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"active_state",label:"Active state",helper:"State(s) considered active (defaults by domain)",selector:{text:{}}},{name:"morph_on_active",label:"Morph shape when active",selector:{boolean:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Default action",selector:{ui_action:{}}}]}]}_renderExtra(){const e=this._actionRows||[];return I`
      <div class="section-header">
        <span>Action mappings</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${e.map((e,t)=>I`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${e.state||`Mapping ${t+1}`}</span>
              <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeMapping(t)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded===t?I`
                  <div class="mapping-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${this._mappingSchema}
                      .computeLabel=${Fe}
                      @value-changed=${e=>this._updateMapping(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}get _mappingSchema(){return[{name:"state",required:!0,helper:"Use 'default' for the fallback",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_addMapping(){this._actionRows=[...this._actionRows||[],{state:""}],this._expanded=this._actionRows.length-1}_updateMapping(e,t){this._actionRows=(this._actionRows||[]).map((i,s)=>s===e?{...i,...t}:i),this._commitActionRows()}_removeMapping(e){this._actionRows=(this._actionRows||[]).filter((t,i)=>i!==e),this._expanded===e&&(this._expanded=null),this._commitActionRows()}_commitActionRows(){const e={};for(const t of this._actionRows||[])t.state&&t.tap_action&&(e[t.state]=t.tap_action);const{tap_action_map:t,...i}=this._config;this._commit(Object.keys(e).length?{...i,tap_action_map:e}:i)}}customElements.define("materia-button-editor",Gi);const Xi={"filled-tonal":"tonal",standard:"text"},Yi={light:"on",switch:"on",fan:"on",input_boolean:"on",vacuum:"cleaning",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing"};class Ki extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedLabel:{state:!0},_resolvedSubtitle:{state:!0},_resolvedDisabled:{state:!0}};static styles=Wi;static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"m",shape:"round"}}setConfig(e){if(!e.icon&&!e.label)throw new Error("icon or label is required");this.config={variant:"filled",size:"m",shape:"round",...e},this.toggleAttribute("wide",!!e.wide)}get _disabled(){const e=this.config?.disabled;if(null==e)return!1;if("boolean"==typeof e)return e;if(this._isTemplate(e)){const e=this._resolvedDisabled;return"True"===e||"true"===e||"1"===e}return"true"===e||"True"===e}updated(e){e.has("config")&&(this.toggleAttribute("wide",!!this.config?.wide),null!=this.config?.flex&&(this.style.flex=String(this.config.flex))),e.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("label","_resolvedLabel"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("disabled","_resolvedDisabled"))}_isActive(e){if(!e)return!1;const t=e.entity_id.split(".")[0],i=this.config.active_state??Yi[t]??"on";return Array.isArray(i)?i.includes(e.state):e.state===String(i)}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const e=this.hass?.states[this.config.entity]?.state,t=this.config.tap_action_map[e]??this.config.tap_action_map.default;if(t)return t}return this.config.tap_action||this._defaultTapAction()}_handleTap(){this._disabled||this._handleAction(this._resolveTapAction())}render(){if(!this.config)return I``;const e=this.config.entity?this.hass?.states?.[this.config.entity]:void 0,t=!!this.config.entity&&this._isUnavailable(e),i=this._disabled,s=Xi[this.config.variant]||this.config.variant||"filled",o=["primary","secondary","tertiary","error"].includes(this.config.role)?this.config.role:"",n=this.config.size??"m";let a="",r="";if("number"==typeof n||/^\d+$/.test(String(n))){const e=Number(n);r=`--mb-h:${e}px;--mb-icon:${Math.round(.43*e)}px;--mb-font:16px;--mb-px:${Math.round(.42*e)}px;--mb-rsq:${Math.round(.28*e)}px;--mb-gap:8px;`}else a=`size-${n}`;const l="square"===this.config.shape?"square":"round",c=this._isActive(e),d=this.config.morph_on_active&&c?"square":l,h=this._isTemplate(this.config.icon)?this._resolvedIcon||"":this.config.icon,p=this._isTemplate(this.config.label)?this._resolvedLabel||"":this.config.label,u=this._isTemplate(this.config.subtitle)?this._resolvedSubtitle||"":this.config.subtitle,m="stacked"===this.config.layout,g=!p&&!u;return I`
      <button
        class="btn variant-${s} ${o?`role-${o}`:""} ${a} shape-${d} ${this.config.connected?`connected-${this.config.connected}`:""} ${g?"icon-only":""} ${m?"stacked":""} ${i?"disabled":""} ${t?"unavailable":""}"
        style=${r}
        @click=${this._handleTap}
      >
        ${h?I`<ha-icon .icon=${h}></ha-icon>`:W}
        ${p||u?I`<span class="text">
              ${p?I`<span class="label">${p}</span>`:W}
              ${u?I`<span class="sub">${u}</span>`:W}
            </span>`:W}
      </button>
    `}getCardSize(){return 1}}customElements.define("materia-button",Ki),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"M3 button — icon and/or label, variants, sizes, shapes, and shape-morph on state.",preview:!0});const Zi=[$e,n`
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
      /* Expressive OutlinedButton/TextButtonTokens: neutral on-surface-variant
         label with an outline-variant border — not primary/outline. */
      color: var(--sb-fg, var(--md-sys-color-on-surface-variant, var(--primary-text-color)));
      box-shadow: inset 0 0 0 1px var(--md-sys-color-outline-variant, var(--md-sys-color-outline, rgba(127, 127, 127, 0.4)));
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
  `];class Qi extends Be{static properties={_expanded:{state:!0}};static styles=[Be.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{variant:"tonal",size:"s",menu_position:"bottom-right",...this._config}}get _sections(){return[{title:"Leading button",icon:"mdi:card-text-outline",fields:[{name:"icon",template:!0,selector:{icon:{}}},{name:"label",template:!0,selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"more-info"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"elevated",label:"Elevated"},{value:"outlined",label:"Outlined"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"Extra small"},{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"},{value:"xl",label:"Extra large"}]}}},{name:"menu_position",label:"Menu alignment",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"Below · right-aligned"},{value:"bottom-left",label:"Below · left-aligned"},{value:"top-right",label:"Above · right-aligned"},{value:"top-left",label:"Above · left-aligned"}]}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]}]}_optionSchema(e){return[Re(e?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Menu options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Oe((e,t)=>this._moveOption(e,t),e.map((e,t)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||(e.icon&&!Re(e.icon)?e.icon:`Option ${t+1}`)}</span>
                <ha-icon-button @click=${()=>this._toggleOption(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="opt-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._optionSchema(e)}
                        .computeLabel=${Fe}
                        @value-changed=${e=>this._optionChanged(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_optionChanged(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}_toggleOption(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-split-button-editor",Qi);const Ji={xs:32,s:40,m:56,l:96,xl:136,default:48,large:56},es={xs:12,s:12,m:16,l:28,xl:28,default:14,large:16},ts={xs:20,s:20,m:24,l:32,xl:40,default:24,large:24};class is extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0}};static styles=Zi;static getConfigElement(){return document.createElement("materia-split-button-editor")}static getStubConfig(){return{label:"Action",icon:"mdi:play",variant:"tonal",size:"s",options:[{label:"Option 1",icon:"mdi:numeric-1-circle-outline"},{label:"Option 2",icon:"mdi:numeric-2-circle-outline"}]}}setConfig(e){this.config={variant:"tonal",size:"s",...e},this._open=!1,this.toggleAttribute("wide",!!e.wide)}updated(e){e.has("config")&&(this.toggleAttribute("wide",!!this.config?.wide),null!=this.config?.flex&&(this.style.flex=String(this.config.flex))),e.has("_open")&&this._open&&requestAnimationFrame(()=>this._clampMenu())}_clampMenu(){const e=this.shadowRoot?.querySelector(".menu");if(!e||!this._open)return;e.classList.remove("clamp-left","clamp-right");const t=e.getBoundingClientRect();t.left<8?e.classList.add("clamp-left"):t.right>window.innerWidth-8&&e.classList.add("clamp-right")}connectedCallback(){super.connectedCallback(),this._outsideClick=e=>{this._open&&((e.composedPath?.()||[]).includes(this)||(this._open=!1))},document.addEventListener("click",this._outsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClick)}_toggle(e){e.stopPropagation(),this._open=!this._open}_selectOption(e,t){t.stopPropagation(),this._open=!1,e.tap_action&&this._handleAction(e.tap_action)}_isSelected(e){if(null!=e.selected)return!!e.selected;const t=this.config.preset_entity||this.config.entity;if(null==e.value||!t)return!1;const i=this.hass?.states?.[t];if(!i)return!1;const s=this.config.preset_attribute||(this.config.preset_entity?null:this.config.attribute),o=s?i.attributes?.[s]:i.state;return(Array.isArray(e.value)?e.value:[e.value]).some(e=>String(e)===String(o))}render(){if(!this.config)return I``;const e=this.config.variant||"tonal",t=this.config.size||"s",i="number"==typeof t||/^\d+$/.test(String(t)),s=i?Number(t):Ji[t]||40,o=i?Math.round(.28*s):es[t]??12,n=i?Math.round(.32*s):ts[t]??20,a=this.config.options||[],{options:r,type:l,...c}=this.config,d={...c,connected:"leading"},h=`--sb-h:${s}px;--sb-inner:${o}px;--sb-ticon:${n}px;`+(this.config.color?`--sb-bg:${this.config.color};`:"")+(this.config.color_on?`--sb-fg:${this.config.color_on};`:"");return I`
      <div class="wrap" style=${h}>
        <div class="split ${e}">
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
          ${a.map(e=>{const t=this._isSelected(e);return I`
              <div class="menu-item ${t?"selected":""}" role="menuitem" aria-checked=${t?"true":"false"} @click=${t=>this._selectOption(e,t)}>
                ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}
                <span class="item-text">${e.label||""}</span>
                ${t?I`<ha-icon class="item-check" icon="m3of:check"></ha-icon>`:""}
              </div>
            `})}
        </div>
      </div>
    `}getCardSize(){return 1}}customElements.define("materia-split-button",is),window.customCards=window.customCards||[],window.customCards.push({type:"materia-split-button",name:"Materia Split Button",description:"M3 Expressive split button — a main action plus a menu of related actions.",preview:!0});class ss extends Be{static properties={_expanded:{state:!0}};static styles=[Be.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_sectionsSignature(){return`${this._config?.group||""}|${this._config?.preset||""}|${this._config?.multi_select?1:0}`}get _sections(){const e="standard"===this._config?.group,t=[...Object.keys(Ii).map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1).replace(/-/g," ")})),{value:"custom",label:"Custom"}],i=[{title:"Setup",icon:"mdi:tune",fields:[{name:"group",label:"Configuration",selector:{select:{mode:"dropdown",options:[{value:"connected",label:"Connected (segmented, entity-driven)"},{value:"standard",label:"Standard (spaced row of buttons)"}]}}},...e?[]:[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",label:"Color preset",selector:{select:{mode:"dropdown",options:t}}}],{name:"size",label:"Size (applies to the whole group)",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (40dp)"},{value:"m",label:"M (56dp)"},{value:"l",label:"L (96dp)"},{value:"xl",label:"XL (136dp)"}]}}},{name:"variant",label:"Style",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"}]}}},...e?[{name:"gap",label:"Gap between buttons (px)",selector:{number:{min:0,max:32,mode:"box"}}},{name:"padding",label:"Vertical padding (px)",selector:{number:{min:0,max:32,mode:"box"}}}]:[],...e?[]:[{name:"multi_select",label:"Multi-select",selector:{boolean:{}}}],...!e&&this._config?.multi_select?[{name:"columns",label:"Max columns",selector:{number:{min:1,max:8,mode:"box"}}}]:[]]}];return"custom"===this._config?.preset&&i.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_active",label:"Active color",color:!0,template:!0,selector:{text:{}}},{name:"color_on_active",label:"Active text color",color:!0,template:!0,selector:{text:{}}}]}),i}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"entity",label:"Entity (optional — this button's own state)",selector:{entity:{}}},{name:"value",label:"Value (state that = active; blank = on/truthy)",selector:{text:{}}},{name:"active",label:"Active template (overrides everything, e.g. attribute logic)",template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Oe((e,t)=>this._moveOption(e,t),(this._config.options||[]).map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||`Option ${t+1}`}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._optionSchema}
                        .computeLabel=${Fe}
                        @value-changed=${e=>this._updateOptionForm(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_updateOptionForm(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-button-group-editor",ss);const os=new Set(["split","split-button","materia-split-button"]);class ns extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},value:{type:String},_localValue:{state:!0},_optimisticValue:{state:!0},_optimisticEntities:{state:!0},_resolvedColorActive:{state:!0},_resolvedColorOnActive:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("input_select.")||e.startsWith("select."))||"";return{entity:t,size:"m",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}]}}static styles=[ke,Vi];setConfig(e){this.config={size:"m",...e}}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const e=this.hass?.states[this.config.entity],t=this.config.entity?.split(".")[0];return"input_select"!==t&&"select"!==t||!e?.attributes?.options?[]:e.attributes.options.map(e=>({label:this._capitalize(e),value:e,tap_action:{action:"perform-action",perform_action:`${t}.select_option`,data:{option:e},target:{entity_id:this.config.entity}}}))}get _activeValue(){if(!this.config?.entity)return this._localValue??String(this.value??"");if(null!=this._optimisticValue)return this._optimisticValue;const e=this.hass?.states[this.config.entity];return this.config.attribute?String(e?.attributes?.[this.config.attribute]??""):e?.state??""}_truthy(e){const t=String(e??"").toLowerCase();return""!==t&&!["off","closed","idle","standby","unavailable","unknown","not_home","false","0","none","auto_off"].includes(t)}_entityOptionActive(e){const t=e.entity,i=this._optimisticEntities?.[t],s=this.hass?.states[t]?.state;if(null!=e.value&&""!==e.value){const t=String(e.value).toLowerCase();return i&&null!=i.value?i.value===t:String(s??"").toLowerCase()===t}return i&&null!=i.active?i.active:this._truthy(s)}_tplTruthy(e){if("boolean"==typeof e)return e;const t=String(e??"").trim().toLowerCase();return["true","on","yes","1","open","home","active"].includes(t)}_isOptionActive(e,t){if(null!=e.active)return this._isTemplate(e.active)?this._tplTruthy(this._tplResults?.[`optActive${t}`]):this._tplTruthy(e.active);if(e.entity)return this._entityOptionActive(e);if(this.config.multi_select){const t=this._activeValue.split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);return t.includes(String(e.value).toLowerCase())}return String(e.value)===this._activeValue}_getActiveColors(){const e=this._resolvedColorActive||this.config.color_active,t=this._resolvedColorOnActive||this.config.color_on_active;return e&&t?{active:e,onActive:t}:this.config.preset&&Ii[this.config.preset]?Ii[this.config.preset]:Ii.secondary}_renderStandard(){const e=this.config.gap??8,t=this.config.padding??4,i=this.config.size||"m";return I`
      <ha-card>
        <div class="row" style="gap: ${e}px; padding: ${t}px 0;">
          ${(this.config.buttons||[]).map(e=>{const t=os.has(e.type)||Array.isArray(e.options)&&e.options.length>0,{size:s,type:o,...n}=e,a={variant:"filled",...n,size:i};return t?I`<materia-split-button .hass=${this.hass} .config=${a}></materia-split-button>`:I`<materia-button .hass=${this.hass} .config=${a}></materia-button>`})}
        </div>
      </ha-card>
    `}render(){if(!this.hass||!this.config)return I``;if("standard"===this.config.group)return this._renderStandard();const e=this.config.entity?this.hass.states[this.config.entity]:void 0,t=!!e&&this._isUnavailable(e),i=this.config.size||"m",{height:s,innerCorner:o}=Hi[i]||Hi.m,n=s/2;this._activeValue;const a=this._getActiveColors(),r=this._resolvedOptions,l=this.config.variant||"tonal";if(!r.length)return I``;const c=this.config.multi_select,d=this.config.columns||0;return I`
      <ha-card>
        <div class="group ${t?"unavailable":""} ${c?"multi":""}"
          style="${c?`--btn-height: ${s}px;`:`height: ${s}px;`} ${d?`--btn-columns: ${d};`:""}">
          ${r.map((e,t)=>{const i=this._isOptionActive(e,t),h=0===t,p=t===r.length-1,u="square"===this.config.active_shape,m=u?Math.min(o,Math.max(6,Math.round(.18*s))):n;let g;if(c)if(i)g=`${m}px`;else{const e=d||r.length,i=Math.floor(t/e),s=t%e,a=0===i,l=i===Math.ceil(r.length/e)-1,c=0===s,h=s===e-1||t===r.length-1;g=`${a&&c?n:o}px ${a&&h?n:o}px ${l&&h?n:o}px ${l&&c?n:o}px`}else{const e=i?`${m}px`:`${o}px`,t=i&&u?`${m}px`:`${n}px`;g=1===r.length?t:h?`${t} ${e} ${e} ${t}`:p?`${e} ${t} ${t} ${e}`:e}const f=i?a.active:void 0,_=i?a.onActive:void 0;return I`
              <button
                class="${i?"active":"inactive"} ${l}"
                style="border-radius: ${g};${i?` background: ${f}; color: ${_};`:""}"
                @click=${()=>this._handleOptionTap(e)}
              >
                ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}
                ${e.label?I`<span>${e.label}</span>`:""}
              </button>
            `})}
        </div>
      </ha-card>
    `}_handleOptionTap(e){if(!this.config.entity&&!e.entity&&!e.tap_action){const t=String(e.value);if(this.config.multi_select){const e=this._activeValue.split(",").map(e=>e.trim()).filter(Boolean),i=e.findIndex(e=>e.toLowerCase()===t.toLowerCase());i>=0?e.splice(i,1):e.push(t),this._localValue=e.join(",")}else this._localValue=t;return this._fireHaptic("selection"),void this.dispatchEvent(new CustomEvent("option-selected",{detail:{value:this._localValue,option:e},bubbles:!0,composed:!0}))}if(this._fireHaptic("selection"),e.entity){const t=e.entity,i=String(this.hass?.states[t]?.state??""),s=null!=e.value&&""!==e.value?{baseline:i,value:String(e.value).toLowerCase()}:{baseline:i,active:!this._truthy(i)};this._optimisticEntities={...this._optimisticEntities,[t]:s},this._optEntityTimers=this._optEntityTimers||{},clearTimeout(this._optEntityTimers[t]),this._optEntityTimers[t]=setTimeout(()=>{const{[t]:e,...i}=this._optimisticEntities||{};this._optimisticEntities=i},1e4)}else if(!this.config.multi_select){const t=this.hass?.states[this.config.entity];this._optimisticBaseline=this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):String(t?.state??""),this._optimisticValue=String(e.value),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}e.tap_action?this._handleAction(e.entity?{entity:e.entity,...e.tap_action}:e.tap_action):e.entity?this._fireMoreInfo(e.entity):this.config.entity&&this._fireMoreInfo(this.config.entity)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer);for(const e of Object.values(this._optEntityTimers||{}))clearTimeout(e)}updated(e){if(e.has("hass")&&this.hass&&(this._resolveField("color_active","_resolvedColorActive"),this._resolveField("color_on_active","_resolvedColorOnActive"),this._resolvedOptions.forEach((e,t)=>{null!=e.active&&this._resolveTemplateValue(`optActive${t}`,e.active)})),e.has("hass")&&null!=this._optimisticValue){const e=this.hass?.states[this.config.entity],t=this.config.attribute?String(e?.attributes?.[this.config.attribute]??""):String(e?.state??"");(t.toLowerCase()===this._optimisticValue.toLowerCase()||null!=this._optimisticBaseline&&t!==this._optimisticBaseline)&&(this._optimisticValue=null,this._optimisticBaseline=null,clearTimeout(this._optimisticTimer))}if(e.has("hass")&&this._optimisticEntities){let e=!1;const t={...this._optimisticEntities};for(const[i,s]of Object.entries(t)){const o=String(this.hass?.states[i]?.state??"");(null!=s.baseline&&o!==s.baseline||(null!=s.value?o.toLowerCase()===s.value:this._truthy(o)===s.active))&&(delete t[i],clearTimeout(this._optEntityTimers?.[i]),e=!0)}e&&(this._optimisticEntities=t)}}getCardSize(){return 1}}customElements.define("materia-button-group",ns),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 button group — connected (segmented, entity-driven) or standard (a spaced row of buttons).",preview:!0});customElements.define("materia-icon-row",class extends ns{setConfig(e){super.setConfig({...e,group:"standard"})}});const as=[$e,we,ke,ge,n`
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
      /* In-flight spin, driven per-frame from index.js. The standalone rotate
         property, so it composes with the path's own state rotation without
         touching it — and the GLYPH never spins, because only the silhouette
         carries this. Deliberately no transition here: the JS owns every frame,
         including the graceful stop. */
      rotate: var(--ml-spin, 0deg);
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

    /* While the spin owns the rotation, the path's own state turn stands down:
       two rotation systems landing in the same moment read as a sudden
       speed-up right as the bolt lands. The pose snaps instead — on a spinning
       9-lobe star an instant 20-degree change is imperceptible, because the
       pose carries no absolute reference. The transition comes back the moment
       the wind-down ends, so ordinary instant toggles keep their turn. */
    .shape.spinning .silhouette path {
      transition: none;
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

    /* THE MACHINE IS WORKING. vacuum-hero's rule — motion means the machine is
       doing something — applies here too: a frozen card during a 3-second bolt
       drive reads as hung. Shapes with a SHORT symmetry period (the cookie, 40
       degrees) SPIN while in flight — see the spinner in index.js, which also
       owns the graceful stop. Shapes that repeat only every 90 or 180 degrees
       cannot land from a slow spin in reasonable time, so they breathe instead:
       this class is only applied to them. The standalone scale property, NOT
       transform: the squircle carries its state rotation in transform. */
    .shape.working {
      animation: ml-breathe 2s ease-in-out infinite alternate;
    }

    @keyframes ml-breathe {
      to {
        scale: 1.035;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .shape.working {
        animation: none;
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
  `];customElements.define("materia-lock-editor",class extends Be{_formData(){return{gesture:"slide",shape:!0,shape_style:"cookie9",initial_locked:!0,...this._config}}_sectionsSignature(){return`${this._config?.gesture||"slide"}|${this._config?.entity?"e":""}`}get _sections(){const e="hold"===this._config?.gesture,t=!!this._config?.entity;return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",label:"Lock (optional)",helper:"Leave empty to run self-contained — the card keeps its own state, with nothing to control.",selector:{entity:{domain:["lock","switch","input_boolean"]}}},{name:"gesture",label:"Commit gesture",selector:{select:{mode:"dropdown",options:[{value:"slide",label:"Slide the handle across"},{value:"hold",label:"Press and hold"}]}}},{name:"shape",label:"Show the morphing lock shape",selector:{boolean:{}}},{name:"shape_style",label:"Silhouette",helper:"Squircle morphs its outline continuously; the MaterialShapes silhouettes change state by turning instead, since CSS cannot interpolate an SVG path.",selector:{select:{mode:"dropdown",options:[{value:"cookie9",label:"Cookie, 9-sided (default)"},{value:"squircle",label:"Squircle — the only one that morphs its outline"},{value:"pill",label:"Pill (square-aspect, not a capsule)"},{value:"gem",label:"Gem"}]}}}]},{title:"Behaviour",icon:"mdi:cog-outline",fields:[...e?[{name:"hold_ms",label:"Hold for (ms, default 800)",helper:"Keep this above 500ms — the platform long-press timeout — or an ordinary long-press commits by accident.",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}}]:[{name:"threshold",label:"Commit past this fraction of the track (default 0.55)",selector:{number:{min:.3,max:1,step:.05,mode:"slider"}}}],...t?[{name:"locked_state",label:"State that means locked",helper:'Defaults to "locked" for a lock and "off" for a switch — a relay strike is energised to release the door.',selector:{text:{}}},{name:"pending_timeout_ms",label:"Give up waiting for the lock after (ms, default 10000)",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}}]:[{name:"initial_locked",label:"Start out locked",selector:{boolean:{}}}]]},{title:"Labels",icon:"mdi:text-short",fields:[...e?[{name:"unlock_hold_hint",label:'While locked (default "Hold to unlock")',selector:{text:{}}},{name:"lock_hold_hint",label:'While unlocked (default "Hold to lock")',selector:{text:{}}}]:[{name:"unlock_hint",label:'While locked (default "Slide to unlock")',selector:{text:{}}},{name:"lock_hint",label:'While unlocked (default "Slide to lock")',selector:{text:{}}}],...t?[{name:"locking_label",label:'While locking (default "Locking…")',selector:{text:{}}},{name:"unlocking_label",label:'While unlocking (default "Unlocking…")',selector:{text:{}}},{name:"jammed_label",label:'When jammed (default "Jammed — check the door")',selector:{text:{}}}]:[{name:"demo_label",label:'Self-contained note (default "Demo · no entity")',selector:{text:{}}}]]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"unlocked_color",label:"Background while unlocked",color:!0,selector:{text:{}}},{name:"unlocked_color_on",label:"Text while unlocked",color:!0,selector:{text:{}}},{name:"locked_color",label:"Background while locked",color:!0,selector:{text:{}}},{name:"locked_color_on",label:"Text while locked",color:!0,selector:{text:{}}},{name:"accent",label:"Accent (locked glyph and handle)",color:!0,selector:{text:{}}},{name:"accent_on",label:"Ink on the accent",color:!0,selector:{text:{}}},{name:"locked_icon",label:"Icon while locked",selector:{icon:{}}},{name:"unlocked_icon",label:"Icon while unlocked",selector:{icon:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Tapping the shape",selector:{ui_action:{default_action:"more-info"}}}]}]}});const rs={squircle:{vector:!1,rot:45},cookie9:{vector:!0,rot:20,path:()=>st(90,90,86,9)},pill:{vector:!0,rot:45,path:()=>function(e,t,i,s=0){return dt(e,t,i,{points:[{x:.961,y:.039,r:.426},{x:1.001,y:.428,r:0},{x:1,y:.609,r:1}],reps:2,mirroring:!0,rotate:s})}(90,90,172)},gem:{vector:!0,rot:90,path:()=>function(e,t,i,s=0){return dt(e,t,i,{points:[{x:.499,y:1.023,r:.241},{x:-.005,y:.792,r:.208},{x:.073,y:.258,r:.228},{x:.433,y:-0,r:.491}],reps:1,mirroring:!0,rotate:s})}(90,90,172)}};class ls extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_pending:{state:!0},_local:{state:!0},_spinning:{state:!0}};static styles=as;static getConfigElement(){return document.createElement("materia-lock-editor")}static getStubConfig(){return{gesture:"slide"}}setConfig(e){this.config={gesture:"slide",...e}}constructor(){super(),this._pending=null,this._local=null}get _stateObj(){return this.config?.entity?this.hass?.states[this.config.entity]:null}get _selfContained(){return!this.config?.entity}get _lockedState(){if(this.config.locked_state)return String(this.config.locked_state);const e=this.config.entity?.split(".")[0];return"switch"===e||"input_boolean"===e?"off":"locked"}get _entityLocked(){const e=this._stateObj;return!e||this._isUnavailable(e)?null:String(e.state)===this._lockedState}get _locked(){if(this._selfContained)return this._local??!1!==this.config.initial_locked;if("unlocking"===String(this._stateObj?.state??""))return!0;return this._entityLocked??this._local??!0}get _transitioning(){const e=String(this._stateObj?.state??"");return"locking"===e||"unlocking"===e||"jammed"===e?e:null!=this._pending?this._pending?"locking":"unlocking":null}updated(e){e.has("hass")&&null!=this._pending&&this._entityLocked===this._pending&&(this._pending=null,clearTimeout(this._pendingTimer)),this._syncSpin()}get _shapeStyle(){return rs[this.config.shape_style]??rs.cookie9}get _spins(){const e=this._shapeStyle;return e.vector&&2*e.rot<=45&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches}get _inFlight(){const e=this._transitioning;return"locking"===e||"unlocking"===e}_syncSpin(){this._inFlight&&this._spins?this._spinUp():this._spinDown()}_spinUp(){if("ramp"===this._spinMode||"cruise"===this._spinMode)return;const e="stop"===this._spinMode;if(this._spinMode="ramp",this._spinning=!0,this._spinDeg=this._spinDeg??0,this._spinVel=e?0:this._spinVel??0,this._spinRaf)return;let t=performance.now();const i=e=>{const s=Math.min(.05,(e-t)/1e3);if(t=e,"ramp"===this._spinMode)this._spinVel=Math.min(40,this._spinVel+80*s),this._spinVel>=40&&(this._spinMode="cruise"),this._spinDeg+=this._spinVel*s;else if("cruise"===this._spinMode)this._spinDeg+=40*s;else{if("stop"!==this._spinMode)return void(this._spinRaf=null);{const t=Math.min(1,(e-this._stopT0)/this._stopDur),i=1-(1-t)*(1-t);if(this._spinDeg=this._stopFrom+(this._stopTo-this._stopFrom)*i,t>=1)return this._spinDeg=this._stopTo%360,this._applySpin(),this._spinMode=null,this._spinVel=0,this._spinning=!1,void(this._spinRaf=null)}}this._applySpin(),this._spinRaf=requestAnimationFrame(i)};this._spinRaf=requestAnimationFrame(i)}_spinDown(){if("ramp"!==this._spinMode&&"cruise"!==this._spinMode)return;const e=this._spinDeg??0,t=Math.max(this._spinVel??40,8);this._stopFrom=e,this._stopTo=e+.55*t/2,this._stopDur=550,this._stopT0=performance.now(),this._spinMode="stop"}_applySpin(){const e=this.shadowRoot?.querySelector(".shape");e?.style.setProperty("--ml-spin",(this._spinDeg%360).toFixed(2)+"deg")}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._pendingTimer),this._spinRaf&&cancelAnimationFrame(this._spinRaf),this._spinRaf=null,this._spinMode=null}_confirm(){const e=!this._locked;if(this._selfContained)return void(this._local=e);this._pending=e,clearTimeout(this._pendingTimer),this._pendingTimer=setTimeout(()=>{this._pending=null},this.config.pending_timeout_ms??1e4);const t=this.config.entity,i=t.split(".")[0];if("lock"===i)this._callService("lock",e?"lock":"unlock",{entity_id:t});else{const s="off"===this._lockedState,o=e?!s:s;this._callService(i,o?"turn_on":"turn_off",{entity_id:t})}}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(this.config.entity&&!e)return I`<ha-card><div class="body">
        <div class="pending">${Me("entity_not_found_with_id",this.hass,{entity:this.config.entity})}</div>
      </div></ha-card>`;const t=!!e&&this._isUnavailable(e),i=this._locked,s=this._transitioning,o="locking"===s||"unlocking"===s,n=i?this.config.locked_color??"var(--md-sys-color-surface-container-low, var(--card-background-color))":this.config.unlocked_color??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",a=i?this.config.locked_color_on??"var(--md-sys-color-on-surface)":this.config.unlocked_color_on??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))",r=this.config.accent??"var(--md-sys-color-primary)",l=this.config.accent_on??"var(--md-sys-color-on-primary)",c=i?`color-mix(in srgb, ${a} 12%, transparent)`:a,d=i?r:n,h=i?r:a,p=i?l:n,u=i?this.config.locked_icon??"m3o:lock":this.config.unlocked_icon??"m3o:lock-open-right",m=this._shapeStyle,g=i?this.config.unlock_hint??Me("lock_slide_to_unlock",this.hass):this.config.lock_hint??Me("lock_slide_to_lock",this.hass),f=i?this.config.unlock_hold_hint??Me("lock_hold_to_unlock",this.hass):this.config.lock_hold_hint??Me("lock_hold_to_lock",this.hass),_="hold"===this.config.gesture;return I`
      <ha-card
        class=${t?"unavailable":""}
        style="--ml-bg:${n};--ml-fg:${a};--ml-shape-bg:${c};--ml-shape-fg:${d};--ml-handle-bg:${h};--ml-handle-fg:${p};"
      >
        <div class="body">
          ${!1===this.config.shape?W:I`<div
                class="shape-wrap"
                @click=${()=>this._handleAction(this.config.tap_action||(this.config.entity?{action:"more-info",entity:this.config.entity}:{action:"none"}))}
              >
                <div
                  class="shape ${i?"":"unlocked"} ${m.vector?"vector":""} ${o&&!this._spins?"working":""} ${this._spinning?"spinning":""}"
                  style="--ml-rot:${m.rot}deg"
                >
                  ${m.vector?I`<svg class="silhouette" viewBox="0 0 180 180" aria-hidden="true">
                        ${H`<path d=${m.path()} />`}
                      </svg>`:W}
                  <ha-icon .icon=${u}></ha-icon>
                </div>
              </div>`}

          <materia-drag-confirm
            .gesture=${_?"hold":"slide"}
            .label=${o?"locking"===s?this.config.locking_label??Me("lock_locking",this.hass):this.config.unlocking_label??Me("lock_unlocking",this.hass):_?f:g}
            .pending=${o}
            .direction=${i?"forward":"backward"}
            .threshold=${this.config.threshold??.55}
            .holdMs=${this.config.hold_ms??800}
            ?disabled=${t}
            @confirm=${this._confirm}
          ></materia-drag-confirm>

          ${"jammed"===s?I`<div class="pending">
                ${this.config.jammed_label??Me("lock_jammed_hint",this.hass)}
              </div>`:this._selfContained?I`<div class="demo-note">
                ${this.config.demo_label??Me("lock_demo_note",this.hass)}
              </div>`:W}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 5}}customElements.define("materia-lock",ls),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"Lock shape that morphs square→circle, with a drag-to-confirm or hold-to-confirm gesture. Works with no entity.",preview:!0});let cs=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ds={},hs=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends cs{constructor(){super(...arguments),this.key=W}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(((e,t=ds)=>{e._$AH=t;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(e),this.key=t),i}}),ps=[$e,we,ke,ge,n`
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

    /* The armed strip when something is already scheduled. Filled tonal, because
       a pending run must not be able to read as quiet grey text — and it sits
       ABOVE the picker rather than replacing it, so the run can be moved by
       picking again or cleared outright, both without leaving the sheet. */
    .pending-strip {
      cursor: default;
      padding: 10px 12px;
      border-radius: 24px;
      background: color-mix(in srgb, var(--md-sys-color-primary) 14%, transparent);
    }

    /* ---- design 7b: the page summary ---- */

    .summary {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* A pending run is FILLED, not quiet grey text. An armed timer that reads as
       decoration is the one thing this strip exists to prevent. */
    .strip.armed {
      padding: 14px 16px;
      border-radius: 28px;
      background: var(--md-sys-cust-color-device, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
      cursor: default;
    }

    /* Connected group: round on the outside, small where they meet, so the
       schedules and the add button read as one object rather than three tiles. */
    .rows {
      display: flex;
      gap: 4px;
      height: 66px;
    }

    .row-item {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 10px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .row-item:first-child {
      border-radius: 28px 10px 10px 28px;
    }

    .row-item ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
    }

    .row-item span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .row-add {
      flex: none;
      width: 66px;
      display: grid;
      place-items: center;
      border-radius: 10px 28px 28px 10px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      color: var(--md-sys-color-on-surface-variant, inherit);
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    /* Sole child: it owns both outer edges. */
    .row-add:first-child {
      border-radius: 28px;
    }

    .row-add svg {
      width: 22px;
      height: 22px;
    }

    .row-item:hover,
    .row-add:hover {
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.12));
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

    /* The headline and sub-line SWAP rather than cut. Everything else in the sheet
       eases, so an instant text change on the largest element read as a glitch.
       Paired with keyed() in index.js, which replaces the element so the animation
       actually replays — restarting one on a text change is otherwise impossible
       without touching animation-name. */
    @keyframes ms-swap {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    .echo .swap {
      animation: ms-swap var(--md-sys-motion-expressive-default-spatial) both;
    }

    @media (prefers-reduced-motion: reduce) {
      .echo .swap {
        animation: none;
      }
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

    /* M3 switch, per SwitchTokens. The previous version READ AS INVERTED and
       deserved to: the unselected handle was the same 26px as the selected one and
       the track had no outline, so "off" was a big dark knob on a plain light pill
       — which is exactly what "on" looks like.

       The spec carries the whole unselected/selected distinction in the handle
       GROWING (16dp -> 24dp inside a 32dp track) plus the 2px outline that only
       the unselected track has. cards/switch/styles.js already had this right;
       these are its values at the spec's full 52x32 track. */
    .sw {
      position: relative;
      width: 52px;
      height: 32px;
      flex: none;
      box-sizing: border-box;
      border-radius: 16px;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .sw i {
      position: absolute;
      top: 50%;
      left: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transform: translateY(-50%);
      transition: left var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .sw.on {
      background: var(--md-sys-color-primary);
      border-color: transparent;
    }

    /* Selected: the handle grows to the spec's 24/32 and sits 4px from the edge. */
    .sw.on i {
      left: 24px;
      width: 24px;
      height: 24px;
      background: var(--md-sys-color-on-primary);
    }

    /* Pressed swells toward the spec's 28/32. */
    .sw:active i {
      width: 26px;
      height: 26px;
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

    /* Nothing chosen yet, so there is nothing to confirm. Disabled at 38% per the
       M3 disabled-content opacity. */
    .confirm[disabled] {
      opacity: 0.38;
      cursor: default;
      pointer-events: none;
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

    /* SHEET MODE: lose the ROUNDED EDGE, keep the surface.
       The card-in-a-card look came from the inner radius reading as a second
       card outline inside the dialog's own, so only that goes — the card then
       fills the dialog edge to edge and becomes its surface.

       Background and padding deliberately STAY. Dropping the background made the
       chips disappear: they are surface-container-high, which is what the dialog
       itself is, so they had nothing to contrast against. And the dialog supplies
       no padding of its own, so removing the card's left the content flush
       against the edges. */
    :host([sheet]) .sheet {
      border-radius: 0;
    }

    .mock {
      font-size: clamp(11px, 3.2cqi, 12px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.5;
      padding: 0 6px;
    }
  `];customElements.define("materia-schedule-editor",class extends Be{_formData(){return{name:"Schedule",empty_label:"Not scheduled",empty_sub:"Tap to pick a time or a trigger",presentation:"inline",...this._config}}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"name",label:"Eyebrow above the chosen moment",helper:'What is being scheduled — e.g. "Start cleaning".',selector:{text:{}}},{name:"presentation",label:"Presentation",helper:"Sheet drops the collapsed strip and renders the picker directly — for putting the card inside a browser_mod popup.",selector:{select:{mode:"dropdown",options:[{value:"inline",label:"Inline — collapsed strip that expands"},{value:"sheet",label:"Sheet — always open, for a modal"}]}}},{name:"empty_label",label:"Strip title when nothing is set",selector:{text:{}}},{name:"empty_sub",label:"Strip sub-line when nothing is set",selector:{text:{}}}]},{title:"Wiring",icon:"mdi:transit-connection-variant",fields:[{name:"confirm_action",label:"On confirm",helper:"Use $datetime, $date, $time, $duration, $weekdays, $repeat, $trigger, $label in the data.",selector:{ui_action:{default_action:"none"}}},{name:"trigger_action",label:"On confirm, trigger tab",helper:"Falls back to the confirm action when unset.",selector:{ui_action:{default_action:"none"}}},{name:"close_action",label:"How to dismiss the modal",helper:"Sheet presentation only. Defaults to browser_mod.close_popup.",selector:{ui_action:{default_action:"none"}}}]},{title:"Shortcuts",icon:"mdi:clock-fast",fields:[{name:"presets",label:'The "At a time" shortcuts',helper:'List of { label, offset: 90m|2h|1d } or { label, at: "09:00", days: 1 } or { label, at, weekday: 6 }. Each may carry its own tap_action. Empty for the built-in six.',selector:{object:{}}},{name:"minutes",label:"Minute options (default 0, 15, 30, 45)",selector:{object:{}}}]},{title:"Triggers",icon:"mdi:sensors",fields:[{name:"triggers",label:"Non-clock triggers",helper:"List of { key, name, sub, icon }. Leave empty for the built-in four.",selector:{object:{}}}]}]}});class us extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_armed:{state:!0},_mode:{state:!0},_pick:{state:!0},_event:{state:!0},_customOpen:{state:!0},_viewY:{state:!0},_viewM:{state:!0},_date:{state:!0},_hour:{state:!0},_minute:{state:!0},_repeating:{state:!0},_days:{state:!0},_resolvedPending:{state:!0},_resolvedNextLabel:{state:!0},_resolvedNextSub:{state:!0}};static styles=ps;static getConfigElement(){return document.createElement("materia-schedule-editor")}static getStubConfig(){return{name:"Start cleaning"}}setConfig(e){this.config={presentation:"inline",default_mode:"clock",...e},this._modeTouched||(this._mode=this._modes[0])}get _isSheet(){return"sheet"===this.config.presentation}get _isSummary(){return"summary"===this.config.presentation}_tpl(e,t){const i=this.config[e];if(null==i)return null;const s=this._isTemplate(i)?this[t]:i,o=null==s?"":String(s).trim();return o.length?o:null}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("pending","_resolvedPending"),this._resolveField("next_label","_resolvedNextLabel"),this._resolveField("next_sub","_resolvedNextSub"),(this.config.schedules||[]).forEach((e,t)=>{null!=e.label&&this._resolveTemplateValue(`schedLabel${t}`,e.label)})),this.toggleAttribute("sheet",this._isSheet),this._syncFoldHeight()}constructor(){super();const e=new Date;this._open=!1,this._armed=null,this._mode="clock",this._pick=null,this._event=null,this._customOpen=!1,this._viewY=e.getFullYear(),this._viewM=e.getMonth(),this._date=e.getDate(),this._hour=9,this._minute=0,this._repeating=!1,this._days=[!0,!0,!0,!0,!0,!1,!1]}get _pickKey(){return this._pick}get _hasSelection(){return"event"===this._mode?null!=this._event:null!=this._pick}get _isWired(){return!!(this.config.confirm_action||this.config.trigger_action||(this.config.presets??[]).some(e=>e.tap_action)||(this.config.triggers??[]).some(e=>e.tap_action))}get _pending(){const e=this.config.pending;if(!e)return null;const t=this._isTemplate(e)?this._resolvedPending:e,i=null==t?"":String(t).trim();return i.length?i:null}get _modes(){const e=[];return!1!==this.config.show_time&&e.push("clock"),!1!==this.config.show_triggers&&e.push("event"),e.length||e.push("clock"),"event"===this.config.default_mode&&e.includes("event")?["event",...e.filter(e=>"event"!==e)]:e}get _lang(){return this.hass?.locale?.language||void 0}_pad(e){return String(e).padStart(2,"0")}_hhmm(e){return`${this._pad(e.getHours())}:${this._pad(e.getMinutes())}`}_dayTime(e){return`${new Intl.DateTimeFormat(this._lang,{weekday:"short"}).format(e)} ${this._hhmm(e)}`}get _defaultPresets(){return[{label:Me("sched_preset_1h",this.hass),offset:"1h"},{label:Me("sched_preset_4h",this.hass),offset:"4h"},{label:Me("sched_preset_tonight",this.hass),at:"23:00"},{label:Me("sched_preset_tomorrow",this.hass),at:"09:00",days:1,grow:1.4},{label:Me("sched_preset_noon",this.hass),at:"12:00"},{label:Me("sched_preset_saturday",this.hass),at:"10:00",weekday:6,grow:1.4}]}_resolvePreset(e,t){if(e.offset){const i=/^(\d+(?:\.\d+)?)\s*(m|h|d)$/i.exec(String(e.offset).trim());if(!i)return null;const s={m:6e4,h:36e5,d:864e5}[i[2].toLowerCase()];return new Date(t.getTime()+parseFloat(i[1])*s)}const i=/^(\d{1,2}):(\d{2})$/.exec(String(e.at??"").trim());if(!i)return null;const[s,o]=[Number(i[1]),Number(i[2])],n=new Date(t);if(n.setSeconds(0,0),n.setHours(s,o),null!=e.weekday){let i=(Number(e.weekday)%7-t.getDay()+7)%7;return 0===i&&n<=t&&(i=7),n.setDate(n.getDate()+i),n}return null!=e.days?(n.setDate(n.getDate()+Number(e.days)),n):(n<=t&&n.setDate(n.getDate()+1),n)}get _quick(){const e=new Date;return(this.config.presets??this._defaultPresets).map((t,i)=>{const s=this._resolvePreset(t,e);if(!s)return null;const o=s.toDateString()===e.toDateString();return{key:t.key??`p${i}`,name:t.label??"—",at:o?this._hhmm(s):this._dayTime(s),grow:t.grow??1,when:s,tap_action:t.tap_action}}).filter(Boolean)}get _defaultTriggers(){return[{key:"leave",label:Me("sched_trigger_leave",this.hass),secondary:Me("sched_trigger_leave_sub",this.hass),icon:"m3o:directions-walk"},{key:"empty",label:Me("sched_trigger_empty",this.hass),secondary:Me("sched_trigger_empty_sub",this.hass),icon:"m3o:person-off"},{key:"night",label:Me("sched_trigger_night",this.hass),secondary:Me("sched_trigger_night_sub",this.hass),icon:"m3o:bedtime"},{key:"sunset",label:Me("sched_trigger_sunset",this.hass),secondary:Me("sched_trigger_sunset_sub",this.hass),icon:"m3o:wb-twilight"}]}get _events(){return(this.config.triggers??this._defaultTriggers).map((e,t)=>({key:e.key??`t${t}`,name:e.label??e.name??"—",sub:e.secondary??e.sub??"",icon:e.icon??"m3o:sensors",tap_action:e.tap_action}))}get _describe(){if("event"===this._mode){const e=this._events.find(e=>e.key===this._event);return e?{head:e.name,sub:`${e.sub} · trigger`}:{head:Me("sched_pick_trigger",this.hass),sub:Me("sched_runs_whenever",this.hass)}}if("custom"===this._pick){const e=new Intl.DateTimeFormat(this._lang,{day:"numeric",month:"long"}).format(new Date(this._viewY,this._viewM,this._date));return{head:`${this._pad(this._hour)}:${this._pad(this._minute)}`,sub:e}}const e=this._quick.find(e=>e.key===this._pickKey);return e?{head:e.name,sub:Me("sched_starts_at",this.hass,{time:e.at})}:{head:Me("sched_when_question",this.hass),sub:Me("sched_pick_moment",this.hass)}}get _dayNames(){const e=new Intl.DateTimeFormat(this._lang,{weekday:"narrow"});return Array.from({length:7},(t,i)=>e.format(new Date(2024,0,1+i)))}get _tabConfig(){const e={clock:{label:this.config.time_tab_label??Me("sched_at_a_time",this.hass),value:"clock",icon:"m3o:schedule"},event:{label:this.config.trigger_tab_label??Me("sched_when_ellipsis",this.hass),value:"event",icon:"m3o:sensors"}};return{size:"m",preset:"primary",options:this._modes.map(t=>e[t])}}get _minuteConfig(){return{size:"s",preset:"primary",options:(this.config.minutes??[0,15,30,45]).map(e=>({label:this._pad(e),value:String(e)}))}}get _weekdayConfig(){return{size:"s",preset:"primary",multi_select:!0,active_shape:"square",options:this._dayNames.map((e,t)=>({label:e,value:String(t)}))}}get _resolvedWhen(){return"event"===this._mode?null:"custom"===this._pickKey?new Date(this._viewY,this._viewM,this._date,this._hour,this._minute,0,0):this._quick.find(e=>e.key===this._pickKey)?.when??null}_actionContext(){const e=this._resolvedWhen,t=e=>String(e).padStart(2,"0");let i="",s="",o="",n="";if(e){s=`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`,o=`${t(e.getHours())}:${t(e.getMinutes())}`,i=`${s} ${o}:00`;const a=Math.max(0,Math.round((e.getTime()-Date.now())/1e3));n=`${t(Math.floor(a/3600))}:${t(Math.floor(a%3600/60))}:${t(a%60)}`}return{datetime:i,date:s,time:o,duration:n,weekdays:this._repeating?["mon","tue","wed","thu","fri","sat","sun"].filter((e,t)=>this._days[t]):[],repeat:!!this._repeating,trigger:this._event??"",label:this._describe.head}}_fill(e,t){if("string"==typeof e){const i=/^\$(\w+)$/.exec(e.trim());return i&&i[1]in t?t[i[1]]:e.replace(/\$(\w+)/g,(e,i)=>i in t?String(t[i]):e)}return Array.isArray(e)?e.map(e=>this._fill(e,t)):e&&"object"==typeof e?Object.fromEntries(Object.entries(e).map(([e,i])=>[e,this._fill(i,t)])):e}_syncFoldHeight(){const e=this.shadowRoot?.querySelector(".custom-body");if(!e)return;const t=this.shadowRoot.querySelector(".custom-inner");e.style.height=this._customOpen&&t?`${t.scrollHeight}px`:"0px"}_seedCustom(){const e=this._quick.find(e=>e.key===this._pickKey)?.when??new Date(Date.now()+36e5);this._viewY=e.getFullYear(),this._viewM=e.getMonth(),this._date=e.getDate();const t=[...this.config.minutes??[0,15,30,45]].sort((e,t)=>e-t),i=e.getMinutes(),s=t.find(e=>e>=i);this._minute=s??t[0],this._hour=null==s?(e.getHours()+1)%24:e.getHours()}_dismiss(){if(this._open=!1,!this._isSheet)return;const e=this.config.close_action??{action:"fire-dom-event",browser_mod:{service:"browser_mod.close_popup",data:{}}};this._handleAction(e)}_commit(){if(!this._hasSelection)return;this._armed={...this._describe,repeating:this._repeating,mode:this._mode},this._open=!1;const e="event"===this._mode?this._events.find(e=>e.key===this._event):this._quick.find(e=>e.key===this._pickKey),t=e?.tap_action??("event"===this._mode?this.config.trigger_action:null)??this.config.confirm_action;t?this._handleAction(this._fill(t,this._actionContext())):this._fireHaptic("success"),this._isSheet&&this._dismiss()}_renderStrip(){const e=this._armed,t=e?e.head:this.config.empty_label??Me("sched_not_scheduled",this.hass),i=e?e.sub:this.config.empty_sub??Me("sched_tap_to_pick",this.hass),s=e?"event"===e.mode?"m3o:sensors":"m3o:alarm":"m3o:add";return I`
      <div
        class="strip ${e?.repeating?"repeating":""}"
        role="button"
        tabindex="0"
        @click=${()=>{this._open=!0}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._open=!0)}}
      >
        <div class="glyph"><ha-icon .icon=${s}></ha-icon></div>
        <div class="text">
          <span class="head">${t}</span>
          <span class="sub">${i}</span>
        </div>
        ${e?I`<button
              class="strip-cancel"
              @click=${e=>{e.stopPropagation(),this._armed=null,this._fireHaptic("light")}}
            >${this.config.clear_label??Me("sched_clear",this.hass)}</button>`:W}
      </div>
    `}render(){if(!this.config)return I``;if(this._isSummary)return this._renderSummary();if(!this._open&&!this._isSheet)return I`<ha-card><div class="sheet">${this._renderStrip()}</div></ha-card>`;const e=this._pending,t=this._describe,i="clock"===this._mode;return I`
      <ha-card>
        <div class="sheet">
          <div class="echo">
            <span class="eyebrow">${this.config.name??Me("sched_name_default",this.hass)}</span>
            ${(()=>{const i=this._hasSelection?t.head:e??t.head,s=this._hasSelection?t.sub:e?this.config.pending_sub??Me("sched_pending_sub",this.hass):t.sub;return I`
                ${hs(i,I`<span class="headline swap">${i}</span>`)}
                ${hs(s,I`<span class="subline swap">${s}</span>`)}
              `})()}
          </div>

          ${this._modes.length>1?I`<materia-button-group
                .hass=${this.hass}
                .value=${this._mode}
                .config=${this._tabConfig}
                @option-selected=${e=>{this._modeTouched=!0,this._mode=e.detail.value}}
              ></materia-button-group>`:W}

          ${e?I`<div class="strip pending-strip">
                <div class="glyph"><ha-icon icon="m3o:alarm"></ha-icon></div>
                <div class="text">
                  <span class="head">${this.config.pending_label??Me("sched_scheduled",this.hass)}</span>
                  <span class="sub">
                    ${this.config.pending_sub??Me("sched_pending_sub",this.hass)}
                  </span>
                </div>
                <button
                  class="strip-cancel"
                  @click=${()=>{const e=this.config.clear_action;e?this._handleAction(e):this._fireHaptic("success"),this._dismiss()}}
                >${this.config.clear_label??Me("sched_clear",this.hass)}</button>
              </div>`:W}

          ${i?this._renderClock():this._renderTriggers()}

          <div class="repeat">
            <div
              class="sw ${this._repeating?"on":""}"
              role="switch"
              tabindex="0"
              aria-checked=${this._repeating?"true":"false"}
              @click=${()=>{this._repeating=!this._repeating}}
            ><i></i></div>
            <div class="text">
              <!-- A switch labels WHAT IT TURNS ON; its position shows the state.
                   The label used to flip with the state, so an off switch read
                   "Just once" — which parses as "just-once is disabled", the exact
                   opposite of the truth. The label is now constant and only the
                   sub-line describes the consequence. -->
              <span class="n">${this.config.repeat_label??Me("sched_repeat_weekly",this.hass)}</span>
              <!-- The off line says what HAPPENS, not what does not: "back to
                   normal" named a state that does not exist, so it explained
                   nothing. The on line points at the weekday chips that appear
                   directly below rather than describing them in the abstract,
                   which would just restate what is already on screen. -->
              <span class="s">${this._repeating?this.config.repeat_sub_on??Me("sched_repeat_sub_on",this.hass):this.config.repeat_sub_off??Me("sched_repeat_sub_off",this.hass)}</span>
            </div>
          </div>

          ${this._repeating?I`<materia-button-group
                class="days rise"
                .hass=${this.hass}
                .value=${this._days.map((e,t)=>e?String(t):null).filter(Boolean).join(",")}
                .config=${this._weekdayConfig}
                @option-selected=${e=>{const t=new Set(String(e.detail.value).split(",").filter(e=>""!==e));this._days=this._days.map((e,i)=>t.has(String(i)))}}
              ></materia-button-group>`:W}

          <div class="actions">
            <button class="cancel" @click=${this._dismiss}>
              ${this.config.close_label??Me("sched_close",this.hass)}
            </button>
            <button
              class="confirm"
              ?disabled=${!this._hasSelection}
              @click=${this._commit}
            >
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._repeating?Me("sched_save_schedule",this.hass):Me("sched_set_timer",this.hass)}</span>
            </button>
          </div>

          ${this._isWired?W:I`<div class="mock">${Me("sched_mocked_note",this.hass)}</div>`}
        </div>
      </ha-card>
    `}_renderSummary(){const e=this._tpl("next_label","_resolvedNextLabel"),t=this._tpl("next_sub","_resolvedNextSub"),i=(this.config.schedules||[]).filter((e,t)=>{if(null==e.label)return!0;const i=this._isTemplate(e.label)?this._tplResults?.[`schedLabel${t}`]:e.label;return String(i??"").trim().length>0});return I`
      <ha-card>
        <div class="summary">
          ${e?I`<div class="strip armed">
                <div class="glyph"><ha-icon icon=${this.config.next_icon??"m3o:alarm"}></ha-icon></div>
                <div class="text">
                  <span class="head">${e}</span>
                  ${t?I`<span class="sub">${t}</span>`:W}
                </div>
                ${this.config.skip_action?I`<button
                      class="strip-cancel"
                      @click=${()=>this._handleAction(this.config.skip_action)}
                    >${this.config.skip_label??Me("sched_skip",this.hass)}</button>`:W}
              </div>`:W}

          ${i.length||this.config.add_action?I`<div class="rows">
                ${i.map(e=>{const t=(this.config.schedules||[]).indexOf(e);return I`<button
                    class="row-item"
                    @click=${()=>e.tap_action&&this._handleAction(e.tap_action)}
                  >
                    <ha-icon .icon=${e.icon??"m3o:event-repeat"}></ha-icon>
                    <span>${this._isTemplate(e.label)?this._tplResults?.[`schedLabel${t}`]??"":e.label}</span>
                  </button>`})}
                ${this.config.add_action?I`<button
                      class="row-add"
                      aria-label=${this.config.add_label??Me("sched_add",this.hass)}
                      @click=${()=>this._handleAction(this.config.add_action)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor"
                          stroke-width="2.2" stroke-linecap="round" />
                      </svg>
                    </button>`:W}
              </div>`:W}
        </div>
      </ha-card>
    `}_renderClock(){return I`
      <div class="chips">
        ${this._quick.map((e,t)=>I`<button
            class="quick ${this._pick===e.key?"on":""}"
            style="flex-grow:${e.grow}"
            @click=${()=>{this._pick=e.key,this._customOpen=!1}}
          >
            <span class="n">${e.name}</span><span class="t">${e.at}</span>
          </button>`)}
      </div>

      <div class="custom ${this._customOpen?"open":""}">
        <button
          class="custom-head"
          @click=${()=>{this._customOpen=!this._customOpen,this._customOpen&&(this._seedCustom(),this._pick="custom")}}
        >
          <ha-icon icon="m3o:event"></ha-icon>
          <span class="lbl">${Me("sched_pick_date_time",this.hass)}</span>
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
              @month-changed=${e=>{this._viewY=e.detail.year,this._viewM=e.detail.month}}
              @date-selected=${e=>{this._date=e.detail.day,this._pick="custom"}}
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
                @option-selected=${e=>{this._minute=Number(e.detail.value),this._pick="custom"}}
              ></materia-button-group>
            </div>

            <div class="hours">
              ${Array.from({length:24},(e,t)=>I`<button
                class="hour ${this._hour===t?"on":""}"
                @click=${()=>{this._hour=t,this._pick="custom"}}
              >${this._pad(t)}</button>`)}
            </div>
          </div>
        </div>
      </div>
    `}_renderTriggers(){return I`
      <div class="list">
        ${this._events.map((e,t)=>I`<button
            class="trigger rise ${this._event===e.key?"on":""}"
            style="animation-delay:${45*t}ms"
            @click=${()=>{this._event=e.key}}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <div class="text">
              <span class="n">${e.name}</span><span class="s">${e.sub}</span>
            </div>
            <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
          </button>`)}
      </div>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return this._open||this._isSheet?10:2}}customElements.define("materia-schedule",us),window.customCards=window.customCards||[],window.customCards.push({type:"materia-schedule",name:"Materia Schedule",description:"Shortcuts-first schedule picker — quick chips, non-clock triggers, and a calendar that stays folded until asked for. Mocked, no backend.",preview:!0});const ms=[$e,we,ke,ge,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    /* One filled tonal block — the loudest thing on its panel, because the
       option it presents is the DECISION and everything under it is
       consequence. Same asymmetric silhouette as the rest of the family. */
    .block {
      border-radius: 34px 34px 14px 34px;
      padding: clamp(16px, 4.8cqi, 22px);
      background: var(--msh-bg);
      color: var(--msh-fg);
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3.6cqi, 16px);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* The sidekick tier: a peer of the level bars, not a second statement. The
       asymmetric corner is the hero family's mark, so the sidekick takes the
       bars' uniform radius, and every size steps down one rung. */
    .block.sidekick {
      border-radius: 26px;
      padding: clamp(14px, 4cqi, 18px);
      gap: clamp(10px, 3cqi, 14px);
    }

    .block.sidekick .title {
      font-size: clamp(18px, 5.5cqi, 22px);
    }

    .block.sidekick .route {
      width: clamp(38px, 11cqi, 46px);
      height: clamp(26px, 8cqi, 32px);
    }

    .block.sidekick .gicon {
      --mdc-icon-size: clamp(26px, 8cqi, 32px);
    }

    .block.sidekick .pills {
      height: 44px;
    }

    /* These pills ARE a single-select toggle set, so TonalButtonTokens'
       toggle pair applies: selected = SOLID secondary, unselected =
       secondary-container — the same family button-group encodes. The previous
       fix stopped at secondary-container for SELECTED, which on this light
       surface has LESS contrast than the neutral resting pills: the chosen
       option read as the faded one. Selection must be the emphatic step of the
       family, not the quiet one. (The hero variant keeps its ink-inverse pills
       because its block is a coloured container, not a neutral surface.) */
    .block.sidekick .pill {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .block.sidekick .pill.on {
      background: var(--md-sys-color-secondary);
      color: var(--md-sys-color-on-secondary);
    }

    .eyebrow {
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
    }

    .head {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    /* The route glyph: a per-option stroke path on the design's 48x34 grid,
       drawn in currentColor so it always sits on the block legibly. */
    .route {
      width: clamp(46px, 14cqi, 56px);
      height: clamp(32px, 10cqi, 40px);
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .gicon {
      --mdc-icon-size: clamp(32px, 10cqi, 40px);
      flex: none;
    }

    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(22px, 6.8cqi, 28px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .blurb {
      font-size: clamp(12px, 3.6cqi, 13px);
      line-height: 1.45;
      opacity: 0.72;
      text-wrap: pretty;
    }

    /* The option pills live INSIDE the block: choosing is part of the same
       object as the explanation. Selected inverts — ink-filled with the block's
       own surface as text — so the pair can never disagree with the theme. */
    .pills {
      display: flex;
      gap: 3px;
      height: 52px;
    }

    .pill {
      flex: 1;
      min-width: 0;
      display: grid;
      place-items: center;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      color: inherit;
      background: color-mix(in srgb, currentColor 14%, transparent);
      border-radius: 26px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .pill.on {
      background: var(--msh-fg);
      color: var(--msh-bg);
      border-radius: 14px;
    }
  `];customElements.define("materia-select-hero-editor",class extends Be{get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:["select","input_select"]}}},{name:"name",label:"Eyebrow above the option name",selector:{text:{}}},{name:"options",label:"Options",helper:"List of { value, label, short?, secondary?, glyph? (SVG path, 48x34 grid), icon?, tap_action? }. Empty uses the select's own options, plainly.",selector:{object:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"Emphasis",helper:"Hero is the filled statement block; sidekick is its quiet companion for pages that already have a hero.",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"Hero — filled, owns the panel"},{value:"sidekick",label:"Sidekick — quiet peer of the bars"}]}}},{name:"color",label:"Block background",color:!0,selector:{text:{}}},{name:"color_on",label:"Block text",color:!0,selector:{text:{}}}]}]}});class gs extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=ms;static getConfigElement(){return document.createElement("materia-select-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("select.")||e.startsWith("input_select."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Select Hero: entity is required");this.config={...e}}get _stateObj(){return this.hass?.states[this.config.entity]}get _options(){if(this.config.options?.length)return this.config.options;const e=this._stateObj;return(e?.attributes?.options||[]).map(e=>({value:e,label:this._capitalize(String(e).replace(/_/g," "))}))}_select(e){if(this._fireHaptic("selection"),e.tap_action)return void this._handleAction(e.tap_action);const t=this.config.entity.split(".")[0];"select"!==t&&"input_select"!==t||this._callService(t,"select_option",{entity_id:this.config.entity,option:String(e.value)})}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._isUnavailable(e),i=String(e?.state??""),s=this._options,o=s.find(e=>String(e.value)===i)||null,n="sidekick"===this.config.variant,a=this.config.color??(n?"var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06))":"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))"),r=this.config.color_on??(n?"var(--md-sys-color-on-surface)":"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))"),l=o?.label??(e?this.hass.formatEntityState?.(e)??this._capitalize(i):"—");return I`
      <ha-card class=${t?"unavailable":""} style="--msh-bg:${a};--msh-fg:${r};">
        <div class="block ${n?"sidekick":""}">
          ${this.config.name?I`<div class="eyebrow">${this.config.name}</div>`:W}
          <div class="head">
            ${o?.glyph?I`<svg class="route" viewBox="0 0 48 34" aria-hidden="true">
                  ${H`<path d=${o.glyph} />`}
                </svg>`:o?.icon?I`<ha-icon class="gicon" .icon=${o.icon}></ha-icon>`:W}
            <div class="text">
              <div class="title">${t?Me("unavailable",this.hass):l}</div>
              ${o?.secondary?I`<div class="blurb">${o.secondary}</div>`:W}
            </div>
          </div>
          <div class="pills" role="listbox" aria-label=${this.config.name??this.config.entity}>
            ${s.map(e=>{const t=String(e.value)===i;return I`<button
                class="pill ${t?"on":""}"
                role="option"
                aria-selected=${t?"true":"false"}
                @click=${()=>this._select(e)}
              >${e.short??e.label}</button>`})}
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-select-hero",gs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-select-hero",name:"Materia Select Hero",description:"A select whose current option owns the panel — glyph, name, one line of consequence, and the option pills in one filled block.",preview:!0});const fs=[$e,we,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      padding: 14px 6px 2px;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .row.subtitle {
      padding-top: 8px;
    }

    .row.tappable {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    ha-icon {
      --mdc-icon-size: 22px;
      align-self: center;
      flex: none;
      opacity: 0.9;
    }

    /* The display voice, at the scale the mocks draw section titles: 24-26px,
       bold, tight tracking. */
    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(20px, 6cqi, 26px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .row.subtitle .title {
      font-size: clamp(14px, 4.2cqi, 16px);
      font-weight: 600;
      letter-spacing: -0.01em;
      opacity: 0.85;
    }

    .row.subtitle ha-icon {
      --mdc-icon-size: 18px;
    }

    .spacer {
      flex: 1;
    }

    .secondary {
      font-size: clamp(12px, 3.6cqi, 14px);
      font-weight: 500;
      opacity: 0.62;
      white-space: nowrap;
    }
  `];customElements.define("materia-heading-editor",class extends Be{_formData(){return{heading_style:"title",...this._config}}get _sections(){return[{title:"Heading",icon:"mdi:format-title",fields:[{name:"heading",required:!0,selector:{text:{}}},{name:"heading_style",label:"Style",selector:{select:{mode:"dropdown",options:[{value:"title",label:"Title"},{value:"subtitle",label:"Subtitle"}]}}},{name:"icon",selector:{icon:{}}},{name:"secondary",label:"Right-aligned meta line",template:!0,selector:{text:{}}},{name:"tap_action",selector:{ui_action:{default_action:"none"}}}]}]}});class _s extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedSecondary:{state:!0}};static styles=fs;static getConfigElement(){return document.createElement("materia-heading-editor")}static getStubConfig(){return{heading:"Section"}}setConfig(e){this.config={...e}}updated(e){e.has("hass")&&this.hass&&this._resolveField("secondary","_resolvedSecondary")}get _secondary(){const e=this.config.secondary;if(null==e)return null;const t=this._isTemplate(e)?this._resolvedSecondary:e,i=null==t?"":String(t).trim();return i.length?i:null}render(){if(!this.config)return I``;const e="subtitle"===this.config.heading_style,t=this._secondary,i=!!this.config.tap_action;return I`
      <ha-card>
        <div
          class="row ${e?"subtitle":""} ${i?"tappable":""}"
          @click=${i?()=>this._handleAction(this.config.tap_action):void 0}
        >
          ${this.config.icon?I`<ha-icon .icon=${this.config.icon}></ha-icon>`:W}
          <span class="title">${this.config.heading??""}</span>
          <span class="spacer"></span>
          ${t?I`<span class="secondary">${t}</span>`:W}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-heading",_s),window.customCards=window.customCards||[],window.customCards.push({type:"materia-heading",name:"Materia Heading",description:"Section heading in the family's display voice, with a templatable right-aligned meta line.",preview:!0});const bs=[$e,we,ke,ge,n`
    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      overflow: hidden;
      container-type: inline-size;
    }

    /* ---- countdown bar ---- */

    /* The design's draining strip. Width is driven per-second from render; the
       1s linear transition is what turns the stepped updates into a glide. */
    .countbar {
      height: 8px;
      background: var(--md-sys-color-surface-container-high);
    }

    .countbar .fill {
      height: 100%;
      background: var(--md-sys-color-primary);
      transition: width 1s linear, background-color var(--md-sys-motion-default-effects);
    }

    .countbar.lapsed .fill {
      background: var(--md-sys-color-outline-variant);
    }

    .body {
      padding: clamp(18px, 4cqi, 30px) clamp(18px, 4.5cqi, 34px) clamp(20px, 4.5cqi, 32px);
      display: flex;
      flex-direction: column;
      gap: clamp(14px, 3cqi, 22px);
    }

    /* ---- header ---- */

    .head {
      display: flex;
      align-items: center;
      gap: clamp(12px, 3cqi, 20px);
    }

    /* The bell chip is a CIRCLE while ringing and settles square-ish at rest —
       the same active-morphs-toward-a-pole language as the toggle buttons and
       the lock. */
    .chip {
      width: clamp(56px, 15cqi, 84px);
      height: clamp(56px, 15cqi, 84px);
      flex: none;
      display: grid;
      place-items: center;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface-variant);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects),
        border-radius var(--md-sys-motion-expressive-default-spatial);
    }

    .chip ha-icon {
      --mdc-icon-size: clamp(28px, 8cqi, 42px);
    }

    .chip.live {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .chip.soft {
      background: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
    }

    .chip.ringing {
      border-radius: 50%;
    }

    .chip.ringing ha-icon {
      animation: mdb-bellshake 1.5s ease-in-out infinite;
    }

    @keyframes mdb-bellshake {
      0%, 54%, 100% { transform: rotate(0deg); }
      58% { transform: rotate(-12deg); }
      62% { transform: rotate(10deg); }
      66% { transform: rotate(-8deg); }
      70% { transform: rotate(6deg); }
      74% { transform: rotate(-4deg); }
      78% { transform: rotate(0deg); }
    }

    .headline {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .eyebrow {
      font-size: clamp(11px, 2.6cqi, 14px);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--md-sys-color-on-surface-variant);
    }

    .eyebrow.accent {
      color: var(--md-sys-color-primary);
    }

    .title {
      font-size: clamp(24px, 6.4cqi, 46px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.05;
      color: var(--md-sys-color-on-surface);
      text-wrap: balance;
    }

    .title.accent {
      color: var(--md-sys-color-primary);
    }

    .subtitle {
      font-size: clamp(13px, 3cqi, 16px);
      color: var(--md-sys-color-on-surface-variant);
    }

    .count {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      flex: none;
    }

    .count .num {
      font-size: clamp(26px, 6cqi, 42px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1;
      color: var(--md-sys-color-on-surface-variant);
      font-variant-numeric: tabular-nums;
    }

    .count .num.accent {
      color: var(--md-sys-color-primary);
    }

    .count .cap {
      font-size: clamp(11px, 2.6cqi, 13px);
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.8;
      text-align: right;
    }

    /* ---- the two panels ---- */

    /* Asymmetric connected-group radii, exactly the split-button grammar:
       big outer corners, small facing corners, one 6px seam. */
    .panels {
      display: flex;
      gap: 6px;
      align-items: stretch;
    }

    .panel {
      background: var(--md-sys-color-surface-container);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .panel.buzz {
      flex: none;
      width: 39%;
      border-radius: 44px 16px 16px 44px;
      padding: clamp(14px, 3cqi, 20px) clamp(12px, 2.6cqi, 18px) clamp(16px, 3.4cqi, 24px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .panel.buzz.busy {
      background: var(--md-sys-color-secondary-container);
    }

    .panel.open {
      flex: 1;
      min-width: 0;
      border-radius: 16px 44px 44px 16px;
      padding: clamp(16px, 3.6cqi, 24px) clamp(16px, 3.8cqi, 26px) clamp(18px, 3.8cqi, 26px);
      display: flex;
      flex-direction: column;
    }

    /* OPENED wears materia-lock's unlocked pair — the device token, the
       palette's "this device is in its active state" colour — so the popup
       and the lock card below it flood the same way when the door is open.
       Copy inverts to the pair's own ink, exactly like the lock's body. */
    .panel.open.done {
      background: var(--md-sys-cust-color-device, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
    }

    .panel.open.done .open-copy .big {
      color: inherit;
    }

    .panel.open.done .open-copy .small {
      color: inherit;
      opacity: 0.75;
    }

    /* And the slider inverts against it, like the lock's unlocked handle:
       the surface's ink becomes the handle, the surface becomes its glyph.
       Named explicitly, not currentColor — same shadow-DOM resolution trap
       materia-lock documents. */
    .panel.open.done materia-drag-confirm {
      --mdc-track: color-mix(in srgb, var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container)) 14%, transparent);
      --mdc-ink: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
      --mdc-handle: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
      --mdc-handle-ink: var(--md-sys-cust-color-device, var(--md-sys-color-primary-container));
    }

    /* Stacked when the card is narrow (the mobile bottom sheet): the buzz
       panel keeps the big top corners, the open panel the big bottom ones, so
       the pair still reads as one split object. */
    @container (max-width: 560px) {
      .panels {
        flex-direction: column;
      }
      .panel.buzz {
        width: auto;
        border-radius: 44px 44px 16px 16px;
      }
      .panel.open {
        border-radius: 16px 16px 44px 44px;
      }
    }

    /* ---- buzz cookie ---- */

    .cookie-stage {
      position: relative;
      width: clamp(150px, 42cqi, 238px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
    }

    .cookie-stage svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .wave path {
      fill: var(--md-sys-color-primary-container);
    }

    .wave {
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
    }

    .busy .wave.one {
      animation: mdb-wave 1.25s ease-out infinite;
    }

    .busy .wave.two {
      animation: mdb-wave 1.25s ease-out 0.62s infinite;
    }

    @keyframes mdb-wave {
      0% { transform: scale(0.78) rotate(0deg); opacity: 0.6; }
      100% { transform: scale(1.42) rotate(38deg); opacity: 0; }
    }

    /* The breathe NEVER stops and the spin rides a different element on a
       different property, so entering and leaving the buzz can't hitch: the
       design put breathe and spin on one transform, and swapping them
       restarted both from frame zero — a visible jump. Here .cookie only ever
       scales and its path only ever rotates. When the spin animation is
       removed the rotation snaps home, and on a 9-lobe cookie (40 degree
       symmetry) that snap is imperceptible — materia-lock's documented
       insight, reused. */
    .cookie {
      transform-box: fill-box;
      transform-origin: center;
      animation: mdb-breathe 5s ease-in-out infinite;
    }

    .cookie path {
      transform-box: fill-box;
      transform-origin: center;
    }

    .busy .cookie path {
      animation: mdb-spin 5s linear infinite;
    }

    /* Press acknowledgement on the stage, not the cookie — the cookie's scale
       belongs to the breathe. */
    .cookie-stage {
      transition: scale 0.3s var(--md-sys-motion-expressive-default-spatial-easing, cubic-bezier(0.2, 1.5, 0.3, 1));
    }

    .panel.buzz:active .cookie-stage {
      scale: 0.93;
    }

    @keyframes mdb-spin {
      to { rotate: 360deg; }
    }

    @keyframes mdb-breathe {
      0%, 100% { scale: 1; }
      50% { scale: 1.04; }
    }

    .cookie path {
      fill: var(--md-sys-color-primary-container);
      transition: fill var(--md-sys-motion-default-effects);
    }

    .busy .cookie path {
      fill: var(--md-sys-color-primary);
    }

    .cookie-face {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--md-sys-color-on-primary-container);
      transition: color var(--md-sys-motion-default-effects);
      pointer-events: none;
    }

    .busy .cookie-face {
      color: var(--md-sys-color-on-primary);
    }

    .cookie-face ha-icon {
      --mdc-icon-size: clamp(38px, 10cqi, 56px);
    }

    .cookie-face .word {
      font-size: clamp(13px, 3cqi, 15px);
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .buzz-caption {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-align: center;
    }

    .buzz-caption .big {
      font-size: clamp(17px, 3.8cqi, 20px);
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--md-sys-color-on-surface);
    }

    .buzz-caption .small {
      font-size: clamp(13px, 2.8cqi, 14px);
      line-height: 1.4;
      color: var(--md-sys-color-on-surface-variant);
      text-wrap: pretty;
    }

    /* ---- open panel ---- */

    .open-head {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .open-glyph {
      width: clamp(44px, 10cqi, 56px);
      height: clamp(44px, 10cqi, 56px);
      flex: none;
      border-radius: 20px;
      display: grid;
      place-items: center;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      transition: border-radius var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .open-glyph ha-icon {
      --mdc-icon-size: clamp(22px, 5cqi, 28px);
    }

    .done .open-glyph {
      border-radius: 50%;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .open-copy {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .open-copy .big {
      font-size: clamp(18px, 4.4cqi, 24px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      color: var(--md-sys-color-on-surface);
    }

    .open-copy .small {
      font-size: clamp(13px, 2.8cqi, 14px);
      line-height: 1.4;
      color: var(--md-sys-color-on-surface-variant);
      text-wrap: pretty;
    }

    .open-spacer {
      flex: 1;
      min-height: 18px;
    }

    materia-drag-confirm {
      width: 100%;
    }

    /* ---- bottom row ---- */

    .row {
      display: flex;
      gap: 6px;
      align-items: center;
      height: clamp(52px, 11cqi, 64px);
    }

    .row button {
      height: 100%;
      border: none;
      padding: 0 clamp(20px, 4.6cqi, 32px);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      font-family: inherit;
      font-size: clamp(14px, 3cqi, 15px);
      font-weight: 600;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface-variant);
      border-radius: 10px;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .row button ha-icon {
      --mdc-icon-size: 22px;
    }

    .row .lead {
      border-radius: 32px 10px 10px 32px;
    }

    .row .trail {
      border-radius: 10px 32px 32px 10px;
    }

    /* The active mute is the one INVERSE moment on the card — a held-down
       state, not a container tint. */
    .row .muted {
      background: var(--md-sys-color-inverse-surface);
      color: var(--md-sys-color-inverse-on-surface);
    }

    .row .gap {
      flex: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .chip.ringing ha-icon,
      .cookie,
      .busy .cookie path,
      .busy .wave.one,
      .busy .wave.two {
        animation: none;
      }
    }
  `];customElements.define("materia-doorbell-editor",class extends Be{_formData(){return{timeout:30,...this._config}}get _sections(){return[{title:"Doorbell",icon:"mdi:doorbell",fields:[{name:"entity",label:"Doorbell entity",helper:"on = ringing. The countdown runs from its last change.",selector:{entity:{domain:["input_boolean","binary_sensor","switch"]}}},{name:"timeout",label:"Ring timeout (seconds)",helper:"Match the popup timeout so the bar and the dialog agree.",selector:{number:{min:5,max:300,mode:"box"}}},{name:"name",label:"Eyebrow while ringing (default: Doorbell)",selector:{text:{}}},{name:"place",label:"Where the ring is from (default: Front door)",selector:{text:{}}}]},{title:"Buzz panel",icon:"mdi:bullhorn",fields:[{name:"buzz_action",label:"Tap-to-buzz action",helper:"The street-door buzzer. Leave empty to hide the panel.",selector:{ui_action:{default_action:"none"}}},{name:"buzz_entity",label:"Buzzing indicator",helper:"on = buzzing (usually the buzzer script itself).",selector:{entity:{}}},{name:"buzz_title",label:"Panel title (default: Buzz in)",selector:{text:{}}},{name:"buzz_sub",label:"Panel sub-line",selector:{text:{}}}]},{title:"Open panel",icon:"mdi:lock-open-variant-outline",fields:[{name:"lock",label:"Lock",helper:"Slide-to-open unlocks this. Leave empty to hide the panel.",selector:{entity:{domain:"lock"}}},{name:"open_title",label:"Panel title (default: Open the front door)",selector:{text:{}}},{name:"open_sub",label:"Panel sub-line",selector:{text:{}}}]},{title:"Bottom row",icon:"mdi:dots-horizontal",fields:[{name:"ignore_action",label:"Ignore",helper:"Empty hides the button. The whole row hides when nothing in it is configured.",selector:{ui_action:{default_action:"none"}}},{name:"replay_action",label:"Replay ring",helper:"Empty hides the button.",selector:{ui_action:{default_action:"none"}}},{name:"mute_entity",label:"Mute toggle entity",helper:"input_boolean silencing the chime. Empty hides the button.",selector:{entity:{domain:"input_boolean"}}}]}]}});const vs=st(90,90,86,9);class ys extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_now:{state:!0},_buzzedUntil:{state:!0}};static styles=bs;static getConfigElement(){return document.createElement("materia-doorbell-editor")}static getStubConfig(){return{entity:"",timeout:30}}setConfig(e){if(!e.entity)throw new Error("entity is required (on = ringing)");this.config={timeout:30,...e}}connectedCallback(){super.connectedCallback(),this._syncTicker()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tick),this._tick=null,clearTimeout(this._lingerTimer)}_on(e){const t=e?this.hass?.states[e]:void 0;return!!t&&"on"===t.state}get _ringing(){return this._on(this.config.entity)}get _buzzing(){return this._on(this.config.buzz_entity)}get _lockState(){const e=this.config.lock;return e?String(this.hass?.states[e]?.state??""):""}get _opened(){return["unlocked","unlocking"].includes(this._lockState)}get _unlocking(){return["unlocking","locking"].includes(this._lockState)}get _left(){if(!this._ringing)return 0;const e=this.hass?.states[this.config.entity],t=e?new Date(e.last_changed).getTime():NaN;return Number.isNaN(t)?this.config.timeout:Math.max(0,Math.ceil(this.config.timeout-(Date.now()-t)/1e3))}get _phase(){return this._buzzing?"buzzing":this._buzzedUntil&&Date.now()<this._buzzedUntil?"buzzed":this._opened?"opened":this._ringing?"ringing":"lapsed"}updated(e){if(e.has("hass")){const e=this._buzzing;this._wasBuzzing&&!e&&(this._buzzedUntil=Date.now()+6e3,clearTimeout(this._lingerTimer),this._lingerTimer=setTimeout(()=>this.requestUpdate(),6050)),this._wasBuzzing=e,this._syncTicker()}}_syncTicker(){const e=this._ringing;e&&!this._tick?this._tick=setInterval(()=>{this._now=Date.now()},1e3):!e&&this._tick&&(clearInterval(this._tick),this._tick=null)}_buzz(){this.config.buzz_action&&this._handleAction(this.config.buzz_action)}_slide(){if(!this.config.lock)return;const e=this._opened?"lock":"unlock";this.hass.callService("lock",e,{entity_id:this.config.lock})}_ignore(){this.config.ignore_action&&this._handleAction(this.config.ignore_action)}_replay(){this.config.replay_action&&this._handleAction(this.config.replay_action)}_toggleMute(){this.config.mute_entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.mute_entity})}_copy(e){const t=this.hass,i=this.config.place??Me("db_eyebrow_front",t),s=this._left;return{ringing:{eyebrow:this.config.name??Me("db_eyebrow",t),accent:!0,title:Me("db_title_ringing",t),sub:Me("db_sub_ringing",t,{place:i}),num:`${s}s`,numAccent:!0,cap:Me("db_count_before_lapse",t),icon:"m3of:notifications-active",chip:"live ringing"},buzzing:{eyebrow:Me("db_eyebrow_street",t),accent:!0,title:Me("db_title_buzzing",t),sub:Me("db_sub_buzzing",t),num:"···",numAccent:!1,cap:Me("db_count_buzzing",t),icon:"m3o:volume-up",chip:"live"},buzzed:{eyebrow:Me("db_eyebrow_street",t),accent:!1,title:Me("db_title_buzzed",t),sub:Me("db_sub_buzzed",t),num:Me("db_count_done",t),numAccent:!1,cap:Me("db_count_buzzed",t),icon:"m3o:volume-up",chip:"soft"},opened:{eyebrow:Me("db_eyebrow_front",t),accent:!1,title:Me("db_title_opened",t),titleAccent:!0,sub:Me("db_sub_opened",t),num:Me("db_count_open",t),numAccent:!0,cap:Me("db_count_opened",t),icon:"m3o:lock-open-right",chip:"live"},lapsed:{eyebrow:this.config.name??Me("db_eyebrow",t),accent:!1,title:Me("db_title_lapsed",t),sub:Me("db_sub_lapsed",t),num:"—",numAccent:!1,cap:Me("db_count_lapsed",t),icon:"m3o:notifications-off",chip:""}}[e]}render(){if(!this.config||!this.hass)return I``;const e=this._phase,t=this._copy(e),i="buzzing"===e,s="opened"===e,o="ringing"===e?Math.round(this._left/this.config.timeout*100):"lapsed"===e?0:100,n=Me(i?"db_buzz_busy":"buzzed"===e?"db_buzz_done":"db_buzz_cta",this.hass),a=i?"m3o:volume-up":"buzzed"===e?"m3o:check-circle":"m3o:campaign",r=this._on(this.config.mute_entity);return I`
      <ha-card>
        <div class="countbar ${"lapsed"===e?"lapsed":""}">
          <div class="fill" style="width:${o}%"></div>
        </div>
        <div class="body">
          <div class="head">
            <div class="chip ${t.chip}"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="headline">
              <span class="eyebrow ${t.accent?"accent":""}">${t.eyebrow}</span>
              <span class="title ${t.titleAccent?"accent":""}">${t.title}</span>
              <span class="subtitle">${t.sub}</span>
            </div>
            <div class="count">
              <span class="num ${t.numAccent?"accent":""}">${t.num}</span>
              <span class="cap">${t.cap}</span>
            </div>
          </div>

          <div class="panels">
            ${this.config.buzz_action?I`
                  <div class="panel buzz ${i?"busy":""}" @click=${this._buzz}>
                    <div class="cookie-stage">
                      <svg class="wave one" viewBox="0 0 180 180"><path d=${vs}></path></svg>
                      <svg class="wave two" viewBox="0 0 180 180"><path d=${vs}></path></svg>
                      <svg class="cookie" viewBox="0 0 180 180"><path d=${vs}></path></svg>
                      <div class="cookie-face">
                        <ha-icon .icon=${a}></ha-icon>
                        <span class="word">${n}</span>
                      </div>
                    </div>
                    <div class="buzz-caption">
                      <span class="big">${this.config.buzz_title??Me("db_buzz_title",this.hass)}</span>
                      <span class="small">${this.config.buzz_sub??Me("db_buzz_sub",this.hass)}</span>
                    </div>
                  </div>
                `:W}
            ${this.config.lock?I`
                  <div class="panel open ${s?"done":""}">
                    <div class="open-head">
                      <div class="open-glyph">
                        <ha-icon .icon=${s?"m3o:lock-open-right":"m3o:door-front"}></ha-icon>
                      </div>
                      <div class="open-copy">
                        <span class="big">${this.config.open_title??Me("db_open_title",this.hass)}</span>
                        <span class="small">${this.config.open_sub??Me("db_open_sub",this.hass)}</span>
                      </div>
                    </div>
                    <div class="open-spacer"></div>
                    <materia-drag-confirm
                      gesture="slide"
                      .label=${"unlocking"===this._lockState?Me("lock_unlocking",this.hass):"locking"===this._lockState?Me("lock_locking",this.hass):Me(s?"lock_slide_to_lock":"db_slide_hint",this.hass)}
                      .pending=${this._unlocking}
                      .direction=${s?"backward":"forward"}
                      @confirm=${this._slide}
                    ></materia-drag-confirm>
                  </div>
                `:W}
          </div>

          ${this.config.ignore_action||this.config.replay_action||this.config.mute_entity?I`
                <div class="row">
                  ${this.config.ignore_action?I`<button class="lead" @click=${this._ignore}>${Me("db_ignore",this.hass)}</button>`:W}
                  ${this.config.mute_entity?I`
                        <button class=${r?"muted":""} @click=${this._toggleMute}>
                          <ha-icon .icon=${r?"m3o:volume-off":"m3o:volume-up"}></ha-icon>
                          ${Me(r?"db_muted":"db_mute",this.hass)}
                        </button>
                      `:W}
                  <span class="gap"></span>
                  ${this.config.replay_action?I`<button class="trail" @click=${this._replay}>${Me("db_replay",this.hass)}</button>`:W}
                </div>
              `:W}
        </div>
      </ha-card>
    `}getCardSize(){return 5}}customElements.define("materia-doorbell",ys),window.customCards=window.customCards||[],window.customCards.push({type:"materia-doorbell",name:"Materia Doorbell",description:"Doorbell alert — countdown ring, tap-to-buzz, slide-to-unlock. Built for a browser_mod popup.",preview:!0});const xs={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-on-secondary-container)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-state":["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],"secondary-state":["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],"tertiary-state":["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],"error-state":["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],"device-state":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]},ws=[$e,n`
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
  `],ks=[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"primary-state",label:"Primary State"},{value:"secondary-state",label:"Secondary State"},{value:"tertiary-state",label:"Tertiary State"},{value:"error-state",label:"Error State"},{value:"device-state",label:"Device State"},{value:"battery",label:"Battery"}];customElements.define("materia-badge-editor",class extends Be{_sectionsSignature(){return this._config?.entity?"entity":"none"}get _sections(){const e=!!this._config?.entity,t=[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,template:!0,selector:{text:{}}},{name:"icon",required:!0,template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"variant",selector:{select:{mode:"dropdown",options:ks}}}]}];return e&&t.push({title:"State",icon:"mdi:state-machine",fields:[{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",template:!0,selector:{text:{}}}]}),t.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}),t}});const $s={cover:"open",lock:["locked","locking"],vacuum:"cleaning",media_player:"playing",climate:"heat",alarm_control_panel:"armed_away"};class Cs extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-badge-editor")}static getStubConfig(e){const t=(e?Object.keys(e.states):[]).find(e=>e.startsWith("light.")||e.startsWith("switch."))||"";return{name:"Badge",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on",entity:t}}static styles=[ke,ws];setConfig(e){if(!e.icon)throw new Error("icon is required");if(!e.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...e}}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("state_display","_resolvedStateDisplay"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}_isActive(e){if(!e)return!1;const t=e.state,i=this.config.active_state;if(null!=i)return Array.isArray(i)?i.includes(t):t===String(i);const s=e.entity_id.split(".")[0],o=$s[s]||"on";return Array.isArray(o)?o.includes(t):t===o}_getBatteryColors(e){const t=parseFloat(e?.state);return Number.isNaN(t)?["var(--ha-card-background)","var(--primary-text-color)"]:t<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:t<20?["var(--md-sys-cust-color-warning-container, #ffecb3)","var(--md-sys-cust-color-on-warning-container, #6d4c00)"]:["var(--ha-card-background)","var(--primary-text-color)"]}get _templatesReady(){const e=this.config;return(!this._isTemplate(e.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(e.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(e.state_display)||void 0!==this._resolvedStateDisplay)&&((!this._isTemplate(e.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(e.name)||void 0!==this._resolvedName))))}render(){if(!this.hass||!this.config)return I``;const e=this.config.entity,t=e?this.hass.states[e]:void 0,i=!!e&&this._isUnavailable(t),s=!i&&this._isActive(t),o=this.config.variant||"secondary",n=this.config.show_state;let a=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,r=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on;const l=["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"];if(!a)if("battery"===o){const[e,i]=this._getBatteryColors(t);a=e,r=i}else if(l.includes(o)){const e=xs[o]||xs.secondary;a=e[0],r=r||e[1]}else if(s&&e){const e=xs[o]||xs.secondary;a=e[0],r=r||e[1]}else a="var(--ha-card-background)",r=r||"var(--primary-text-color)";r=r||"var(--primary-text-color)";const c=n?"with-state":"no-state",d=s?"active":"inactive";let h="";if(n&&i)h="Unavailable";else if(n&&t){const e=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));if(this._resolvedStateDisplay&&e)h=this._resolvedStateDisplay;else if(this.config.state_display&&!e)h=this.config.state_display;else{const e=t.state,i=Number(e);if(""===e||null==e||Number.isNaN(i))h=e;else{const e=t.attributes?.unit_of_measurement,s=Math.round(100*i)/100;h=e?"%"===e?`${s}%`:`${s} ${e}`:`${s}`}}h=this._capitalize(h)}return I`
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
    `}_handleTap(){if(this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action){if(this._dblClickTimer)return;this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this.config.tap_action||{action:"toggle"})},250)}else this._handleAction(this.config.tap_action||{action:"toggle"})}_handleDoubleTap(){this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action&&(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,this._handleAction(this.config.double_tap_action))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._dblClickTimer),this._dblClickTimer=null}getCardSize(){return 2}}customElements.define("materia-badge",Cs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-badge",name:"Materia Badge",description:"Square badge for dashboard headers.",preview:!0});const Ss=[$e,n`
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
  `];customElements.define("materia-checkbox-editor",class extends Be{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"tap_action_checked",label:"Action (checked)",selector:{ui_action:{}}},{name:"tap_action_unchecked",label:"Action (unchecked)",selector:{ui_action:{}}}]}]}});class Es extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("input_boolean."))||"";return{entity:t,name:"Checkbox"}}static styles=[ke,Ss];setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...e}}_isChecked(e){if(this.config.checked_entity){const e=this.hass?.states[this.config.checked_entity];if(!e)return!1;const t=String(e.state??"").split(",").map(e=>e.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(e=>t.includes(e)):!!this.config.checked_value&&t.includes(this.config.checked_value)}if(!e)return!1;const t=String(e.state??"").toLowerCase(),i=Number(t);return"on"===t||"true"===t||"home"===t||!Number.isNaN(i)&&i>0}updated(e){e.has("hass")&&this.hass&&this._resolveField("name","_resolvedName")}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=!t&&this._isChecked(e),s=this._isTemplate(this.config.name)?this._resolvedName:this.config.name??e?.attributes?.friendly_name??this.config.entity,o=i?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return I`
      <ha-card class="${t?"unavailable":""}" @click=${this._handleTap}>
        <div class="name">${s}</div>
        <div class="icon-cell">
          <ha-icon .icon=${o}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const e=this.hass?.states[this.config.entity],t=this._isChecked(e);let i;i=t&&this.config.tap_action_checked?this.config.tap_action_checked:!t&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",Es),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Checkbox with custom checked state logic.",preview:!0});const As=[$e,we,n`
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
  `];customElements.define("materia-pill-editor",class extends Be{_formData(){return{background:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"state_display",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"background",selector:{boolean:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{}}}]}]}});class zs extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedStateDisplay:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(e){const t=(e?Object.keys(e.states):[]).find(e=>e.startsWith("sensor."))||"";return{entity:t,name:"",icon:"mdi:information-outline"}}static styles=[ke,As];setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...e}}_classify(e){const t=this.config.ranges||[];if(!t.length)return{label:"",color:""};const i=parseFloat(e);if(Number.isNaN(i))return{label:"",color:""};for(const e of t)if(null==e.max||i<=e.max)return{label:e.label,color:e.color};return{label:"",color:""}}get _templatesReady(){const e=this.config;return(!this._isTemplate(e?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(e?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(e?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(e?.name)||void 0!==this._resolvedName)))}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("state_display","_resolvedStateDisplay"))}render(){if(!this.hass||!this.config)return I``;if(!this._templatesReady)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||e?.attributes?.friendly_name||this.config.entity,s=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||e?.attributes?.icon||"",o=e?.attributes?.unit_of_measurement||"",n=e?.state??"",a=this.config.ranges||[],r=this._classify(n);let l;l=t?"Unavailable":this.config.state_display?this._isTemplate(this.config.state_display)?this._resolvedStateDisplay??"":this.config.state_display:a.length?o?`${n} · ${r.label||i}`:n:o?`${this._capitalize(n)} ${o}`:this._capitalize(n);const c=a.length?t?i:o||(r.label||i):"",d=this._resolvedColor||this.config.color||"var(--ha-card-background, var(--card-background-color))",h=this._resolvedColorOn||this.config.color_on||"var(--primary-text-color)",p=!1===this.config.background||"none"===this.config.background;return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""} ${p?"no-bg":""}"
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
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",zs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill for sensors, weather, and status indicators.",preview:!0});const Ms=[$e,we,ke,n`
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
`];class Ts extends Be{static properties={_expanded:{state:!0}};static styles=[Be.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"position",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (flips to fit the viewport)"},{value:"below",label:"Below"},{value:"above",label:"Above"}]}}}]},{title:"Substate",icon:"mdi:format-text-variant-outline",fields:[{name:"substate",label:"Substate text / template",template:!0,selector:{text:{}}},{name:"substate_entity",label:"…or from entity",selector:{entity:{}}},{name:"substate_attribute",label:"Entity attribute (optional)",selector:{text:{}}},{name:"substate_separator",label:"Separator",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"•",label:"Dot •"},{value:"–",label:"Dash –"},{value:"/",label:"Slash /"}]}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"menu_variant",label:"Menu style",selector:{select:{mode:"dropdown",options:[{value:"surface",label:"Surface (classic)"},{value:"expressive",label:"Expressive (container tone, trailing icons)"}]}}},{name:"menu_color",label:"Menu panel color (expressive)",color:!0,selector:{text:{}}},{name:"menu_color_on",label:"Menu text color (expressive)",color:!0,selector:{text:{}}}]}]}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Oe((e,t)=>this._moveOption(e,t),(this._config.options||[]).map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||`Option ${t+1}`}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._optionSchema}
                        .computeLabel=${Fe}
                        @value-changed=${e=>this._updateOptionForm(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
      ${this._renderStateColors()}
    `}_renderStateColors(){const e=Array.isArray(this._config.state_colors)?this._config.state_colors:[];return I`
      <div class="options-header">
        <span>State colors</span>
        <ha-icon-button @click=${this._addStateColor}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      ${e.map((e,t)=>I`
          <div class="option-card">
            <div class="option-header">
              <span>${this._stateLabel(e.state)||`State ${t+1}`}</span>
              <ha-icon-button @click=${()=>this._removeStateColor(t)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="option-body">
              <ha-textfield
                label="State (comma-separated for multiple)"
                .value=${this._stateLabel(e.state)}
                @change=${e=>this._updateStateColor(t,"state",this._parseStateInput(e.target.value))}
              ></ha-textfield>
              <materia-color-picker
                label="Background"
                .value=${e.color||""}
                @value-changed=${e=>{e.stopPropagation(),this._updateStateColor(t,"color",e.detail.value)}}
              ></materia-color-picker>
              <materia-color-picker
                label="Text / icon"
                .value=${e.color_on||""}
                @value-changed=${e=>{e.stopPropagation(),this._updateStateColor(t,"color_on",e.detail.value)}}
              ></materia-color-picker>
            </div>
          </div>
        `)}
    `}_stateLabel(e){return Array.isArray(e)?e.join(", "):e||""}_parseStateInput(e){const t=(e||"").trim();return t.includes(",")?t.split(",").map(e=>e.trim()).filter(Boolean):t}_addStateColor(){const e=[...this._config.state_colors||[],{}];this._commit({...this._config,state_colors:e})}_removeStateColor(e){const t=[...this._config.state_colors||[]];t.splice(e,1);const i={...this._config};t.length?i.state_colors=t:delete i.state_colors,this._commit(i)}_updateStateColor(e,t,i){const s=(this._config.state_colors||[]).map(e=>({...e}));s[e]&&(""===i||null==i?delete s[e][t]:s[e][t]=i,this._commit({...this._config,state_colors:s}))}_addOption(){const e=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_updateOptionForm(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-menu-editor",Ts);class Fs extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_optimisticValue:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubstate:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=Ms;static getConfigElement(){return document.createElement("materia-menu-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("input_select.")||e.startsWith("select."))||"";return{entity:t}}setConfig(e){this.config={position:"auto",...e},this._open=!1}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const e=this.hass?.states[this.config.entity],t=this.config.entity?.split(".")[0];if(("input_select"===t||"select"===t)&&e?.attributes?.options)return e.attributes.options.map(e=>({label:this._capitalize(e),value:e}));if("water_heater"===t&&e?.attributes?.operation_list){const t={eco:"mdi:leaf",performance:"mdi:speedometer",electric:"mdi:lightning-bolt",gas:"mdi:fire",heat_pump:"mdi:heat-pump-outline",high_demand:"mdi:water-plus",off:"mdi:power"};return e.attributes.operation_list.map(e=>({label:this._capitalize(e),value:e,icon:t[e]}))}return[]}get _pos(){return"above"===this.config.position||"below"===this.config.position?this.config.position:this._effPos??"below"}_computeEffPos(){const e=this.shadowRoot?.querySelector(".trigger");if(!e)return"below";const t=e.getBoundingClientRect(),i=Math.min(56*this._resolvedOptions.length+20,Math.min(600,.7*window.innerHeight)),s=window.innerHeight-t.bottom;return s>=i+8||s>=t.top?"below":"above"}get _currentValue(){return null!=this._optimisticValue?this._optimisticValue:this.hass?.states[this.config.entity]?.state??""}get _substate(){const e=this.config;if(null!=e.substate&&""!==e.substate)return this._isTemplate(e.substate)?this._resolvedSubstate??"":e.substate;if(e.substate_entity){const t=this.hass?.states[e.substate_entity];if(!t)return"";const i=e.substate_attribute?t.attributes?.[e.substate_attribute]:t.state;return null==i?"":String(i)}return""}_toggle(){this._open||(this._effPos=this._computeEffPos()),this._open=!this._open}_selectOption(e){const t=e.value;this._optimisticValue=t,this._open=!1;const i=this.config.entity?.split(".")[0];"input_select"===i||"select"===i?this._callService(i,"select_option",{entity_id:this.config.entity,option:t}):"water_heater"===i&&this._callService("water_heater","set_operation_mode",{entity_id:this.config.entity,operation_mode:t}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=e=>{if(!this._open)return;const t=e.composedPath?.()||[];t.includes(this)||this._portal&&t.includes(this._portal)||(this._open=!1)},document.addEventListener("click",this._outsideClickHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler),clearTimeout(this._optimisticTimer),clearTimeout(this._portalTimer),this._detachReposition(),this._removePortal()}updated(e){if(e.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("substate","_resolvedSubstate"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn")),e.has("hass")&&null!=this._optimisticValue){const e=this.hass?.states[this.config.entity]?.state;e===this._optimisticValue&&(this._optimisticValue=null,clearTimeout(this._optimisticTimer))}e.has("_open")?this._open?this._openPortal():this._closePortal():this._open&&this._portalRoot&&!this._closing&&(this._renderPortal(),this._positionPortal())}_matchStateColor(e){const t=this.config.state_colors,i=Array.isArray(t)?t:Object.entries(t).map(([e,t])=>"string"==typeof t?{state:e,color:t}:{state:e,...t});return i.find(t=>Array.isArray(t.state)?t.state.map(String).includes(String(e)):String(t.state)===String(e))}_colors(){const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=this._currentValue;let s=this._resolvedColor||this.config.color,o=this._resolvedColorOn||this.config.color_on;const n=this.config.state_colors?this._matchStateColor(i):null;n&&(n.color&&(s=n.color),n.color_on&&(o=n.color_on));const a=!t&&(s||o),r=a?`${s?`background-color:${s};`:""}${o?`color:${o};`:""}`:"";return{stateObj:e,unavailable:t,currentValue:i,colored:a,triggerStyle:r,panelStyle:""+(s?`--_surf:${s};`:"")+(a&&o?`${r}--menu-selected-bg:color-mix(in srgb, ${o} 22%, transparent);--menu-selected-fg:${o};`:r)}}_ensurePortal(){if(this._portal)return;const e=document.createElement("div");e.className="materia-menu-portal",e.style.cssText="position:fixed; z-index:1000; pointer-events:auto;";const t=e.attachShadow({mode:"open"}),i=Array.isArray(Ms)?Ms:[Ms];if("adoptedStyleSheets"in t&&i.every(e=>e.styleSheet))t.adoptedStyleSheets=i.map(e=>e.styleSheet);else{const e=document.createElement("style");e.textContent=i.map(e=>e.cssText).join("\n"),t.appendChild(e)}document.body.appendChild(e),this._portal=e,this._portalRoot=t}_removePortal(){this._portal&&(this._portal.remove(),this._portal=null,this._portalRoot=null)}static PORTAL_VARS=["--card-background-color","--divider-color","--ha-card-background","--md-sys-color-on-secondary","--md-sys-color-on-tertiary","--md-sys-color-on-tertiary-container","--md-sys-color-outline-variant","--md-sys-color-secondary","--md-sys-color-surface-container-high","--md-sys-color-tertiary","--md-sys-color-tertiary-container","--primary-text-color"];_syncThemeVars(){if(!this._portal)return;const e=getComputedStyle(this);for(const t of Fs.PORTAL_VARS){const i=e.getPropertyValue(t);i?this._portal.style.setProperty(t,i):this._portal.style.removeProperty(t)}}_positionPortal(){if(!this._portal)return;const e=this.shadowRoot?.querySelector(".trigger");if(!e)return;const t=e.getBoundingClientRect(),i=this._portal;"expressive"===this.config.menu_variant?(i.style.left="auto",i.style.right=`${Math.max(8,window.innerWidth-t.right)}px`,i.style.width="auto",i.style.maxWidth="min(320px, calc(100vw - 24px))"):(i.style.right="auto",i.style.maxWidth="",i.style.left=`${t.left}px`,i.style.width=`${t.width}px`),"above"===this._pos?(i.style.top="auto",i.style.bottom=window.innerHeight-t.top+2+"px"):(i.style.bottom="auto",i.style.top=`${t.bottom+2}px`)}_attachReposition(){this._repositionRef||(this._repositionRef=()=>this._positionPortal(),window.addEventListener("scroll",this._repositionRef,!0),window.addEventListener("resize",this._repositionRef))}_detachReposition(){this._repositionRef&&(window.removeEventListener("scroll",this._repositionRef,!0),window.removeEventListener("resize",this._repositionRef),this._repositionRef=null)}_openPortal(){this._closing=!1,clearTimeout(this._portalTimer),this._ensurePortal(),this._portal.style.display="",this._syncThemeVars(),this._positionPortal(),this._renderPortal(),this._attachReposition()}_closePortal(){this._portalRoot&&(this._closing=!0,this._renderPortal(),this._detachReposition(),clearTimeout(this._portalTimer),this._portalTimer=setTimeout(()=>{this._portal&&(this._portal.style.display="none"),this._closing=!1},170))}_renderPortal(){this._portalRoot&&re(this._dropdownTemplate(),this._portalRoot)}_dropdownTemplate(){if(!this.hass||!this.config)return I``;const{panelStyle:e,currentValue:t}=this._colors(),i=this._resolvedOptions,s=this._pos,o="expressive"===this.config.menu_variant,n=o?`${this.config.menu_color?`--_surf:${this.config.menu_color};`:""}${this.config.menu_color_on?`color:${this.config.menu_color_on};`:""}`:"";return I`
      <div class="portal-panel ${s} ${o?"exp":""} ${this._closing?"closing":""}">
        <div class="dropdown ${o?"expressive":""}" style=${e+n}>
          ${i.map(e=>I`
            <div
              class="menu-item ${e.value===t?"selected":""}"
              @click=${t=>{t.stopPropagation(),this._selectOption(e)}}
            >
              ${o?I`<span class="item-text">${e.label||e.value}</span>${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}`:I`${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}<span class="item-text">${e.label||e.value}</span>`}
            </div>
          `)}
        </div>
      </div>
    `}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=this._currentValue,s=this._resolvedOptions,o=s.find(e=>e.value===i)?.label||this._capitalize(i),n=this._substate,a=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||e?.attributes?.friendly_name||"",{triggerStyle:r}=this._colors();return I`
      <ha-card>
        <div class="trigger ${t?"unavailable":""} ${this._open?"above"===this._pos?"open-above":"open-below":""}" style=${r} @click=${this._toggle}>
          ${(()=>{const t=(this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon)||e?.attributes?.icon||{water_heater:"mdi:water-boiler",input_select:"mdi:format-list-bulleted",select:"mdi:format-list-bulleted"}[this.config.entity?.split(".")[0]];return t?I`
              <div class="icon-container">
                <ha-icon .icon=${t}></ha-icon>
              </div>
            `:""})()}
          <div class="text-container">
            ${a?I`<div class="label">${a}</div>`:""}
            <div class="value">
              <span class="value-main">${o}</span>
              ${n?I`<span class="value-sep">${this.config.substate_separator||"•"}</span><span class="value-sub">${n}</span>`:""}
            </div>
          </div>
          <div class="chevron-btn" @click=${e=>{e.stopPropagation(),this._toggle()}}>
            <ha-icon class="chevron" icon=${this._open?"m3of:arrow-drop-up":"m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-menu",Fs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-menu",name:"Materia Menu",description:"M3 vertical dropdown menu for select entities.",preview:!0});const Os=n`
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
`;class qs extends Be{static properties={_expanded:{state:!0}};static styles=[Be.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{show_state:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"attribute",helper:"Match option values against this attribute instead of state",selector:{text:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"active_color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}}]}]}_optionSchema(e){return[Re(e?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"value",label:"Active when state equals (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${Oe((e,t)=>this._moveOption(e,t),e.map((e,t)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||(e.icon&&!Re(e.icon)?e.icon:`Option ${t+1}`)}</span>
                <ha-icon-button @click=${()=>this._toggleOption(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="opt-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._optionSchema(e)}
                        .computeLabel=${Fe}
                        @value-changed=${e=>this._optionChanged(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_optionChanged(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}_toggleOption(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-button-stack-editor",qs);class Ds extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedActiveColor:{state:!0},_resolvedActiveColorOn:{state:!0}};static styles=Os;static getConfigElement(){return document.createElement("materia-button-stack-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("lock."))||"";return{entity:t,options:[{icon:"m3o:lock-open",value:"unlocked",tap_action:{action:"perform-action",perform_action:"lock.unlock",target:{entity_id:t}}},{icon:"m3o:lock",value:"locked",tap_action:{action:"perform-action",perform_action:"lock.lock",target:{entity_id:t}}}]}}setConfig(e){if(!Array.isArray(e.options)||0===e.options.length)throw new Error("at least one option is required");this.config=e}updated(e){e.has("hass")&&this.hass&&(this._resolveField("name","_resolvedName"),this._resolveField("active_color","_resolvedActiveColor"),this._resolveField("active_color_on","_resolvedActiveColorOn"))}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:""}_isActive(e,t){const i=e.value;if(null==i)return!1;const s=this.config.attribute?t?.attributes?.[this.config.attribute]:t?.state;return Array.isArray(i)?i.map(String).includes(String(s)):String(i)===String(s)}_onOption(e){e.tap_action&&this._handleAction(e.tap_action)}render(){if(!this.hass||!this.config)return I``;const e=this.config.entity,t=e?this.hass.states[e]:void 0,i=!!e&&this._isUnavailable(t),s=this.config.options||[],o=!1!==this.config.show_state&&!!e,n=this._resolvedActiveColor||this.config.active_color,a=this._resolvedActiveColorOn||this.config.active_color_on,r=`${n?`--materia-active-bg:${n};`:""}${a?`--materia-active-fg:${a};`:""}`,l=i?"Unavailable":t?this._capitalize(t.state):"";return I`
      <ha-card>
        <div class="wrap ${i?"unavailable":""}">
          ${this._name?I`<div class="name">${this._name}</div>`:""}
          <div class="stack" style=${r}>
            ${s.map(e=>I`
                <button
                  class="segment ${!i&&this._isActive(e,t)?"active":""}"
                  title=${e.label||""}
                  @click=${()=>this._onOption(e)}
                >
                  ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:W}
                  ${e.label?I`<span class="seg-label">${e.label}</span>`:W}
                </button>
              `)}
          </div>
          ${o?I`<div class="state">${l}</div>`:W}
        </div>
      </ha-card>
    `}getCardSize(){return Math.max(2,2*(this.config?.options?.length||2))}}customElements.define("materia-button-stack",Ds),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-stack",name:"Materia Button Stack",description:"Vertical segmented button — stacked options with optional active-state highlighting.",preview:!0});const Ps=n`
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
`;customElements.define("materia-media-progress-editor",class extends Be{_formData(){return{show_times:!0,seekable:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"show_times",selector:{boolean:{}}},{name:"seekable",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Wave color",color:!0,template:!0,selector:{text:{}}}]}]}});let Us=0;class Rs extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_w:{state:!0},_resolvedColor:{state:!0}};static styles=Ps;static getConfigElement(){return document.createElement("materia-media-progress-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("media_player."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config=e,this._cid??="mp-clip-"+ ++Us}_position(){const e=this.hass?.states[this.config.entity];if(!e)return{pos:0,dur:0,playing:!1,live:!1};const t=Number(e.attributes.media_duration)||0;let i=Number(e.attributes.media_position)||0;const s="playing"===e.state,o=e.attributes.media_position_updated_at;s&&o&&(i+=(Date.now()-new Date(o).getTime())/1e3);const n=`${this.config.entity}|${e.attributes.media_content_id??e.attributes.media_title??""}`;return n!==this._latchKey&&(this._latchKey=n,this._live=!1),s?t>0&&i>=t-.25&&(this._live=!0):this._live=!1,t&&(i=Math.min(i,t)),{pos:Math.max(0,i),dur:t,playing:s,live:this._live}}_fmt(e){e=Math.max(0,Math.round(e));const t=Math.floor(e/3600),i=Math.floor(e%3600/60),s=e%60,o=e=>String(e).padStart(2,"0");return t>0?`${t}:${o(i)}:${o(s)}`:`${i}:${o(s)}`}_wavePath(e,t){let i="";for(let s=e;s<=t;s+=2){const e=14-2*Math.sin(2*Math.PI*s/32);i+=`${i?" L":"M"} ${s.toFixed(1)} ${e.toFixed(1)}`}return i||"M 0 14"}firstUpdated(){const e=this.shadowRoot?.querySelector(".bar");e&&(this._w=e.clientWidth,this._ro=new ResizeObserver(e=>{this._w=e[0].contentRect.width}),this._ro.observe(e))}updated(){const e=this.shadowRoot;this._clipRect=e?.querySelector("clipPath rect"),this._thumbEl=e?.querySelector(".thumb"),this._trackEl=e?.querySelector(".track"),this._posEl=e?.querySelector(".time");"playing"===this.hass?.states[this.config.entity]?.state&&!this._live?this._startLoop():this._stopLoop(),this.hass&&this._resolveField("color","_resolvedColor")}_startLoop(){if(this._raf)return;const e=()=>{this._raf=requestAnimationFrame(e),this._tickDom()};this._raf=requestAnimationFrame(e)}_tickDom(){const{pos:e,dur:t,live:i}=this._position(),s=this._w||300,o=(i?1:t>0?Math.min(1,e/t):0)*s;this._clipRect&&this._clipRect.setAttribute("width",Math.max(0,o)),this._thumbEl&&this._thumbEl.setAttribute("x",o-2),this._trackEl&&this._trackEl.setAttribute("x1",o),this._posEl&&(this._posEl.textContent=this._fmt(e)),i&&this._stopLoop()}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_fullWave(e){return this._waveW!==e&&(this._waveW=e,this._wavePathCache=this._wavePath(-32,e+32)),this._wavePathCache}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),this._ro?.disconnect()}_seek(e){if(!1===this.config.seekable)return;const{dur:t}=this._position();if(!t)return;const i=e.currentTarget.getBoundingClientRect(),s=Math.max(0,Math.min(1,(e.clientX-i.left)/i.width));this._callService("media_player","media_seek",{entity_id:this.config.entity,seek_position:s*t})}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),{pos:i,dur:s,playing:o,live:n}=this._position(),a=this._w||300,r=(n?1:s>0?Math.min(1,i/s):0)*a,l=!1!==this.config.show_times,c=this._resolvedColor||this.config.color;return I`
      <ha-card>
        <div class="wrap ${t?"unavailable":""}" style=${c?`--mp-color:${c};`:""}>
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
              `:W}
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-media-progress",Rs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media-progress",name:"Materia Media Progress",description:"Wavy (M3 expressive) media seek bar with elapsed/duration and tap-to-seek.",preview:!0});const Ns=n`
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
`;customElements.define("materia-media-editor",class extends Be{_formData(){return{show_art:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"name",label:"Title",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"image",helper:"Defaults to the entity's album art",template:!0,selector:{text:{}}},{name:"fallback_image",helper:"Shown when there's no art",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_art",selector:{boolean:{}}},{name:"art_size",label:"Art size (px)",selector:{number:{min:80,max:480,mode:"box"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class js extends(xe(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedImage:{state:!0}};static styles=Ns;static getConfigElement(){return document.createElement("materia-media-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("media_player."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config=e}updated(e){if(e.has("hass")&&this.hass){this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("image","_resolvedImage");const e=this._stateObj?.attributes?.media_title;e&&this._lastTrack&&e!==this._lastTrack&&(this._beat=!0,this.requestUpdate(),clearTimeout(this._beatTimer),this._beatTimer=setTimeout(()=>{this._beat=!1,this.requestUpdate()},900)),this._lastTrack=e}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._beatTimer)}get _stateObj(){return this.hass?.states[this.config.entity]}get _title(){if(this.config.name)return this._isTemplate(this.config.name)?this._resolvedName:this.config.name;const e=this._stateObj?.attributes;return e?.media_title||e?.friendly_name||""}get _subtitle(){if(this.config.subtitle)return this._isTemplate(this.config.subtitle)?this._resolvedSubtitle:this.config.subtitle;const e=this._stateObj?.attributes;return e?.media_artist||e?.media_album_name||""}get _image(){if(this.config.image){const e=this._isTemplate(this.config.image)?this._resolvedImage:this.config.image;if(e)return e}return this._stateObj?.attributes?.entity_picture||this.config.fallback_image||""}_tap(){this._handleAction(this.config.tap_action||{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._isUnavailable(e),i=this._image,s=this._title,o=this._subtitle,n=`${this.config.art_size?`--mm-art:${this.config.art_size}px;`:""}${i?`background-image:url('${i}');`:""}`,a=!t&&!!e?.attributes?.media_title&&!["off","idle","standby"].includes(e.state),r=a&&"paused"===e.state;return I`
      <ha-card>
        <div class="wrap ${t?"unavailable":""} ${a?"editorial":""} ${this._beat?"beat":""} ${r?"paused":""}" @click=${this._tap}>
          ${!1===this.config.show_art?W:I`<div class="art" style=${n}></div>`}
          ${s?I`<div class="title">${s}</div>`:W}
          ${o?I`<div class="subtitle">${o}</div>`:W}
        </div>
      </ha-card>
    `}getCardSize(){return 4}}customElements.define("materia-media",js),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media",name:"Materia Media",description:"Now-playing card — album art, title and subtitle (all templatable).",preview:!0});const Bs=n`
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
`;customElements.define("materia-clock-editor",class extends Be{_formData(){return{hand_width:5,size:10,show_seconds:!0,...this._config}}get _sections(){return[{title:"Clock",icon:"mdi:clock-outline",fields:[{name:"numbers",selector:{select:{mode:"dropdown",options:[{value:"cardinal",label:"Cardinal (12 · 3 · 6 · 9)"},{value:"all",label:"All (1–12)"},{value:"dots",label:"Hour dots"},{value:"none",label:"None"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"second_dot",label:"Second hand as rim dot",selector:{boolean:{}}},{name:"smooth",label:"Smooth second hand",selector:{boolean:{}}},{name:"cookie",label:"Cookie face (12-sided)",selector:{boolean:{}}},{name:"digital",label:"Digital readout (HH/MM behind hands)",selector:{boolean:{}}},{name:"date",label:"Show date",selector:{boolean:{}}},{name:"hand_width",label:"Hand thickness",selector:{number:{min:1,max:12,step:.5,mode:"slider"}}},{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"face_color",label:"Face",color:!0,template:!0,selector:{text:{}}},{name:"number_color",label:"Numbers",color:!0,template:!0,selector:{text:{}}},{name:"hand_color",label:"Hands",color:!0,template:!0,selector:{text:{}}},{name:"second_color",label:"Second hand",color:!0,template:!0,selector:{text:{}}}]}]}});customElements.define("materia-clock",class extends ce{static properties={hass:{attribute:!1},config:{state:!0},_t:{state:!0}};static styles=Bs;static getConfigElement(){return document.createElement("materia-clock-editor")}static getStubConfig(){return{numbers:"cardinal",show_seconds:!0}}setConfig(e){this.config=e||{}}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._stop()}updated(e){e.has("config")&&(this._facePath=null,this._stop(),this._start())}_scallop(){let e="";for(let t=0;t<=240;t++){const i=t/240*Math.PI*2,s=48+1*Math.cos(12*i);e+=`${0===t?"M":"L"}${(50+s*Math.cos(i)).toFixed(2)} ${(50+s*Math.sin(i)).toFixed(2)} `}return e+"Z"}_start(){if(!this._raf&&!this._tick)if(this.config?.smooth){const e=()=>{this._raf=requestAnimationFrame(e),this._t=performance.now()};this._raf=requestAnimationFrame(e)}else this._tick=setInterval(()=>this._t=Date.now(),1e3)}_stop(){this._raf&&cancelAnimationFrame(this._raf),this._tick&&clearInterval(this._tick),this._raf=null,this._tick=null}render(){if(!this.config)return I``;const e=new Date,t=!!this.config.smooth,i=e.getSeconds()+(t?e.getMilliseconds()/1e3:0),s=e.getMinutes()+i/60,o=30*(e.getHours()%12+s/60),n=6*s,a=6*i,r=!1!==this.config.show_seconds,l=!!(this.config.cookie??this.config.squiggle);l&&(this._facePath??=this._scallop());const c=this.config.numbers||"cardinal",d="all"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:"cardinal"===c?[12,3,6,9]:[],h="all"===c?40:34,p="all"===c?9:18,u="dots"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:[],m=!!this.config.digital,g=String(e.getHours()%12||12).padStart(2,"0"),f=String(e.getMinutes()).padStart(2,"0"),_=!!this.config.date,b=`${e.toLocaleDateString(void 0,{weekday:"short"})} ${e.getDate()}`,v=(o%360+360)%360,y=(n%360+360)%360,x=Math.min(v,y),w=Math.max(v,y),k=w-x;let $=k>=360-k?x+k/2:w+(360-k)/2;$=30*Math.round(($-15)/30)+15,$=($%360+360)%360;const C=$*Math.PI/180,S=u.length?41:d.length?h:40,E=(50+S*Math.sin(C)).toFixed(2),A=(50-S*Math.cos(C)).toFixed(2);let z=$;z>90&&z<270&&(z-=180);const M=4.4*b.length/2/S*(180/Math.PI)+(u.length?4:8),T=e=>{if(!_)return!1;const t=(e%12*30%360+360)%360;let i=Math.abs(t-$)%360;return i>180&&(i=360-i),i<M},F=d.filter(e=>!T(e)),O=u.filter(e=>!T(e)),q=!!this.config.second_dot,D=a*Math.PI/180,P=(50+44*Math.sin(D)).toFixed(2),U=(50-44*Math.cos(D)).toFixed(2),R=this.config.hand_width,N=`--clock-size:${["98px","136px","174px","212px","250px","300px","360px","440px","560px","100%"][Math.min(10,Math.max(1,this.config.size??10))-1]};`+(this.config.face_color?`--clock-face:${this.config.face_color};`:"")+(this.config.number_color?`--clock-number:${this.config.number_color};`:"")+(this.config.hand_color?`--clock-hand:${this.config.hand_color};`:"")+(this.config.second_color?`--clock-second:${this.config.second_color};`:"")+(R?`--clock-hour-w:${R};--clock-minute-w:${(.7*R).toFixed(2)};--clock-second-w:${(.3*R).toFixed(2)};`:"");return I`
      <ha-card style=${N}>
        <svg viewBox="0 0 100 100">
          ${l?H`<path class="face" d=${this._facePath}></path>`:H`<circle class="face" cx="50" cy="50" r="49"></circle>`}
          ${F.map(e=>{const t=e%12*30*Math.PI/180,i=50+h*Math.sin(t),s=50-h*Math.cos(t);return H`<text class="num" x=${i.toFixed(1)} y=${s.toFixed(1)} font-size=${p} text-anchor="middle" dominant-baseline="central">${e}</text>`})}
          ${O.map(e=>{const t=e%12*30*Math.PI/180,i=50+41*Math.sin(t),s=50-41*Math.cos(t);return H`<circle class="dot" cx=${i.toFixed(1)} cy=${s.toFixed(1)} r="1.3"></circle>`})}
          ${m?(()=>{const t=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,i=(e.getSeconds()+(e.getMilliseconds?.()??0)/1e3)/60,s=t?800:Math.round(780+20*(1-Math.cos(2*Math.PI*i)));return H`
                <text class="digital" style="font-weight:${s}" x="50" y="40" font-size="30" text-anchor="middle" dominant-baseline="central">${g}</text>
                <text class="digital" style="font-weight:${s}" x="50" y="64" font-size="30" text-anchor="middle" dominant-baseline="central">${f}</text>
              `})():""}
          ${_?H`<text class="date" x=${E} y=${A} font-size="8" text-anchor="middle" dominant-baseline="central" transform="rotate(${z.toFixed(1)} ${E} ${A})">${b}</text>`:""}
          <line class="hand hour" x1="50" y1="50" x2="50" y2="28" transform="rotate(${o.toFixed(2)} 50 50)"></line>
          <line class="hand minute" x1="50" y1="50" x2="50" y2="16" transform="rotate(${n.toFixed(2)} 50 50)"></line>
          ${r?q?H`<circle class="second-dot" cx=${P} cy=${U} r="3.2"></circle>`:H`<line class="hand second" x1="50" y1="56" x2="50" y2="13" transform="rotate(${a.toFixed(2)} 50 50)"></line>`:""}
          <circle class="pin" cx="50" cy="50" r="2.4"></circle>
        </svg>
      </ha-card>
    `}getCardSize(){return 4}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-clock",name:"Materia Clock",description:"Material You analog clock — cardinal numbers, sweeping hands.",preview:!0}),function(){if(document.querySelector("#materia-fonts"))return;const e=document.createElement("style");e.id="materia-fonts",e.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* Display voice: Outfit VARIABLE (true wght 100-900 axis) — hero\n       numerals & titles via --materia-font-display; the weight axis\n       interpolates smoothly, which flavor C's morphs animate. */\n    @font-face {\n      font-family: 'Outfit';\n      font-style: normal;\n      font-weight: 100 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJuktqUYLkn8BJ.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    @font-face {\n      font-family: 'Outfit';\n      font-style: normal;\n      font-weight: 100 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtqUYLknw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* Accent voice: Fraunces italic — ONE personality moment (clock date). */\n    @font-face {\n      font-family: 'Fraunces';\n      font-style: italic;\n      font-weight: 500;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7frU9kMz3lR27gVA.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    @font-face {\n      font-family: 'Fraunces';\n      font-style: italic;\n      font-weight: 500;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7RrU9kMz3lR24.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(e)}();console.info("%c MATERIA %c v0.28.1 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
