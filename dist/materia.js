/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!r(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=n;const o=s.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const o=this.constructor;if(!1===n&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,C=w.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+A,U=`<${S}>`,z=document,T=()=>z.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,P="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,N=/>/g,q=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,B=/"/g,H=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),V=new WeakMap,X=z.createTreeWalker(z,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":3===e?"<math>":"",a=F;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===F?"!--"===c[1]?a=D:void 0!==c[1]?a=N:void 0!==c[2]?(H.test(c[2])&&(s=RegExp("</"+c[2],"g")),a=q):void 0!==c[3]&&(a=q):a===q?">"===c[0]?(a=s??F,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?q:'"'===c[3]?B:R):a===B||a===R?a=q:a===D||a===N?a=F:(a=q,s=void 0);const d=a===q&&t[e+1].startsWith("/>")?" ":"";o+=a===F?i+U:l>=0?(n.push(r),i.slice(0,l)+k+i.slice(l)+A+d):i+A+(-2===l?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class G{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const a=t.length-1,r=this.parts,[c,l]=W(t,e);if(this.el=G.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=X.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(k)){const e=l[o++],i=n.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),n.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:s}),n.removeAttribute(t));if(H.test(n.tagName)){const t=n.textContent.split(A),e=t.length-1;if(e>0){n.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],T()),X.nextNode(),r.push({type:2,index:++s});n.append(t[e],T())}}}else if(8===n.nodeType)if(n.data===S)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(A,t+1));)r.push({type:7,index:s}),t+=A.length-1}s++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,n){if(e===j)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,n)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??z).importNode(e,!0);X.currentNode=n;let s=X.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Z(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new nt(s,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(s=X.nextNode(),o++)}return X.currentNode=z,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new K(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new Z(this.O(T()),this.O(T()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=Y(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const n=t;let a,r;for(t=s[0],a=0;a<s.length-1;a++)r=Y(this,n[i+a],e,a),r===j&&(r=this._$AH[a]),o||=!O(r)||r!==this._$AH[a],r===L?t=L:t!==L&&(t+=(r??"")+s[a+1]),this._$AH[a]=r}o&&!n&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class it extends Q{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??L)===j)return;const i=this._$AH,n=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==L&&(i===L||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(G,Z),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new Z(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const rt=ot.litElementPolyfillSupport;let ct;rt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2"),o`
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
`;class lt extends at{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"}};static styles=o`
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
    `}_onInput(t){const e=parseFloat(t.target.value);this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(e)},100))}_onChange(t){clearTimeout(this._debounceTimer);const e=parseFloat(t.target.value);this._fireValueChanged(e)}_fireValueChanged(t){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",lt);const ht=t=>class extends t{_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config?.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"perform-action":case"call-service":{const e=t.perform_action||t.service||"",[i,n]=e.split(".",2);i&&n&&this.hass.callService(i,n,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config?.entity}}))}}_capitalize(t){return t&&"string"==typeof t?t.charAt(0).toUpperCase()+t.slice(1):t}async _renderTemplate(t){if(!t||"string"!=typeof t)return t;if(!t.includes("{{")&&!t.includes("{%"))return t;try{const e=await this.hass.callApi("POST","template",{template:t});return"string"==typeof e?e.trim():String(e).trim()}catch{return t}}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_isUnavailable(t){return!t||("unavailable"===t.state||"unknown"===t.state)}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}},dt=o`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`,pt=o`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(80%);
  }
`,ut=o`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
  }
`,mt=o`
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
`,gt=o`
  .fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: width 0.3s ease;
    z-index: 0;
    border-radius: 28px 0 0 28px;
  }
`,ft=o`
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
`;o`
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
`;const vt=o`
  .container {
    touch-action: none;
  }
`,_t=t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase());class yt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[]}render(){return this.hass&&this._config?I`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${_t}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:I``}_valueChanged(t){this._config=t.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}}customElements.define("materia-light-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}});class bt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-light-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:track-light"}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:track-light",...t}}get _entity(){return this.hass?.states?.[this.config?.entity]}get _isOn(){return"on"===this._entity?.state}get _isDimmable(){const t=this._entity?.attributes;if(!t)return!1;return!!(t.supported_color_modes||[]).some(t=>"onoff"!==t)||void 0!==t.brightness}get _brightness(){return this._entity?.attributes?.brightness??0}get _brightnessPercent(){return Math.round(this._brightness/255*100)}get _name(){return this.config.name||this._entity?.attributes?.friendly_name||""}get _icon(){return this.config.icon||"mdi:track-light"}get _stateDisplay(){return this._isOn?this._isDimmable?`${this._brightnessPercent}%`:this._capitalize("On"):this._capitalize("Off")}_toggleLight(){this.hass.callService("light","toggle",{entity_id:this.config.entity})}_setBrightness(t){t<=3?this.hass.callService("light","turn_off",{entity_id:this.config.entity}):this.hass.callService("light","turn_on",{entity_id:this.config.entity,brightness:t})}_getContainer(){return this.shadowRoot?.querySelector(".container")}_pctFromEvent(t){const e=this._getContainer();if(!e)return 0;const i=e.getBoundingClientRect(),n=(t.touches?t.touches[0]:t).clientX;return Math.max(0,Math.min(100,(n-i.left)/i.width*100))}_updateFillVisual(t){const e=this.shadowRoot?.querySelector(".fill");e&&(e.style.width=`${t}%`)}_onPointerDown(t){if(!t.button||0===t.button){this._startX=t.clientX,this._startY=t.clientY,this._dragging=!1,this._scrollIntent=!1;try{t.currentTarget.setPointerCapture(t.pointerId)}catch(t){}this._onMoveRef=this._onPointerMove.bind(this),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointermove",this._onMoveRef),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)}}_onPointerMove(t){if(null==this._startX||this._scrollIntent)return;const e=Math.abs(t.clientX-this._startX),i=Math.abs(t.clientY-this._startY);if(!this._dragging&&i>10&&e<4)return this._scrollIntent=!0,void this._cleanup(t);if(!this._dragging&&e>4&&e>=i&&(this._dragging=!0),this._dragging){t.preventDefault();const e=this._pctFromEvent(t);this._updateFillVisual(e),this._throttleTimer||(this._throttleTimer=setTimeout(()=>{this._throttleTimer=null;const t=Math.round(e/100*255);this._setBrightness(t)},200))}}_onPointerUp(t){if(null!=this._startX){if(this._dragging||this._scrollIntent){if(this._dragging){const e=this._pctFromEvent(t),i=Math.round(e/100*255);this._setBrightness(i)}}else this._toggleLight();this._cleanup(t)}}_cleanup(t){this._startX=null,this._dragging=!1,this._scrollIntent=!1,clearTimeout(this._throttleTimer),this._throttleTimer=null;try{const e=this._getContainer();e&&null!=t?.pointerId&&e.releasePointerCapture(t.pointerId)}catch(t){}this._onMoveRef&&(window.removeEventListener("pointermove",this._onMoveRef),window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onMoveRef=null,this._onUpRef=null)}render(){if(!this.config||!this.hass)return I``;const t=this._entity,e=this._isUnavailable(t),i=this._isOn,n=this._isDimmable,s=n?this._brightnessPercent:0;return I`
      <ha-card>
        <div class="container ${e?"unavailable":""}"
          style="background-color: ${i?n?"var(--md-sys-cust-color-light-container)":"var(--md-sys-cust-color-light)":"var(--ha-card-background, var(--card-background-color))"}; color: ${i?"var(--md-sys-cust-color-on-light)":"var(--primary-text-color)"};"
          @pointerdown=${n?this._onPointerDown:void 0}
          @click=${n?void 0:()=>this._toggleLight()}
        >
          ${n?I`
            <div
              class="fill"
              style="width: ${i?s:0}%; background-color: var(--md-sys-cust-color-light); opacity: 1;"
            ></div>
          `:""}
          <div class="icon-container">
            <ha-icon .icon=${this._icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${this._name}</div>
            <div class="state">${e?"Unavailable":this._stateDisplay}</div>
          </div>
          ${this._hasNavigateAction?I`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}getCardSize(){return 2}static styles=[ut,dt,mt,gt,pt,vt]}customElements.define("materia-light",bt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light",name:"Materia Light Dimmer",description:"Light card with automatic dimmer support. Tap to toggle, slide to dim."});const xt=o`
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

  .range-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: ew-resize;
    z-index: 2;
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }
`;customElements.define("materia-cover-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"cover"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"show_stop",selector:{boolean:{}}}]}});class wt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-cover-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:window-shutter",show_stop:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:window-shutter",show_stop:!0,...t}}get _entity(){return this.hass?.states?.[this.config?.entity]}get _isOpen(){return"closed"!==this._entity?.state}get _position(){return this._entity?.attributes?.current_position??0}get _name(){return this.config.name||this._entity?.attributes?.friendly_name||""}get _icon(){return this.config.icon||"mdi:window-shutter"}get _stateDisplay(){const t=this._position;return 0===t?this._capitalize("Closed"):100===t?this._capitalize("Open"):`${t}% ${this._capitalize("open")}`}_onRangeInput(t){const e=parseInt(t.target.value,10);this.hass.callService("cover","set_cover_position",{entity_id:this.config.entity,position:e})}_openCover(t){t.stopPropagation(),this.hass.callService("cover","open_cover",{entity_id:this.config.entity})}_stopCover(t){t.stopPropagation(),this.hass.callService("cover","stop_cover",{entity_id:this.config.entity})}_closeCover(t){t.stopPropagation(),this.hass.callService("cover","close_cover",{entity_id:this.config.entity})}render(){if(!this.config||!this.hass)return I``;const t=this._entity,e=this._isUnavailable(t),i=this._isOpen,n=this._position;return I`
      <ha-card>
        <div class="container ${e?"unavailable":""}"
          <div
            class="fill"
            style="width: ${n}%; background-color: ${i?"var(--md-sys-cust-color-light)":"transparent"}; opacity: 0.5;"
          ></div>
          <div class="icon-container">
            <ha-icon .icon=${this._icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${this._name}</div>
            <div class="state">${e?"Unavailable":this._stateDisplay}</div>
          </div>
          ${this._hasNavigateAction?I`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
          <div class="sub-buttons">
            <button class="sub-btn" @click=${this._openCover}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            ${this.config.show_stop?I`
                  <button class="sub-btn" @click=${this._stopCover}>
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>
                `:L}
            <button class="sub-btn" @click=${this._closeCover}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
          </div>
          <input
            type="range"
            class="range-input"
            min="0"
            max="100"
            .value=${String(n)}
            @change=${this._onRangeInput}
          />
        </div>
      </ha-card>
    `}getCardSize(){return 2}static styles=[ut,dt,mt,gt,pt,xt]}customElements.define("materia-cover",wt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-cover",name:"Materia Cover",description:"A cover card with position slider and up/stop/down controls"});const $t=o``;customElements.define("materia-device-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"button_type",selector:{select:{options:["switch","state"]}}},{name:"active_state",selector:{text:{}}},{name:"color_active",selector:{text:{}}},{name:"color_on_active",selector:{text:{}}},{name:"show_state",selector:{boolean:{}}}]}});const Ct={light:"on",switch:"on",fan:"on",vacuum:"cleaning",lock:"locked",cover:"open",binary_sensor:"on",climate:"heat",media_player:"playing",input_boolean:"on"};class Et extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-device-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:power-plug",button_type:"switch",active_state:"on",show_state:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:power-plug",button_type:"switch",color_active:"var(--md-sys-cust-color-device)",color_on_active:"var(--md-sys-cust-color-on-device)",show_state:!0,...t}}_getActiveState(){if(this.config.active_state)return String(this.config.active_state);const t=(this.config.entity||"").split(".")[0];return Ct[t]||"on"}_isActive(t){if(!t)return!1;const e=this._getActiveState();return t.state===e}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=!e&&this._isActive(t),n=this.config.name||t?.attributes?.friendly_name||this.config.entity,s=this.config.icon,o=this.config.color_active,a=this.config.color_on_active,r=i?a:"var(--primary-text-color)";return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""}"
          style="background-color: ${i?o:"var(--ha-card-background, var(--card-background-color))"}; color: ${r};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${s} style="color: ${r};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${n}</div>
            ${this.config.show_state?I`<div class="state">${e?"Unavailable":this._capitalize(t.state)}</div>`:""}
          </div>
          ${this._hasNavigateAction?I`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity})}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[ut,dt,mt,pt,$t]}customElements.define("materia-device",Et),window.customCards=window.customCards||[],window.customCards.push({type:"materia-device",name:"Materia Device",description:"A native Lit generic device/switch card with active-state colors."});const kt=o``;customElements.define("materia-lock-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"lock"}}},{name:"name",selector:{text:{}}}]}});class At extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-lock-editor")}static getStubConfig(){return{entity:"",name:""}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i="locked"===t?.state,n=this.config.name||t?.attributes?.friendly_name||this.config.entity,s=i?"m3o:lock":"m3o:lock-open-right",o=e?"Unavailable":this._capitalize(t.state),a=i?"var(--md-sys-cust-color-on-device)":"var(--primary-text-color)";return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""}"
          style="background-color: ${i?"var(--md-sys-cust-color-device-container)":"var(--ha-card-background, var(--card-background-color))"}; color: ${a};"
        >
          <div class="icon-container">
            <ha-icon .icon=${s} style="color: ${a};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${n}</div>
            <div class="state">${o}</div>
          </div>
          ${this._hasNavigateAction?I`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[ut,dt,mt,pt,kt]}customElements.define("materia-lock",At),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"A native Lit lock display card with conditional icons."});const St=o`
  ha-card {
    background: var(--ha-card-background, var(--card-background-color));
    border-radius: 18px;
    overflow: hidden;
    padding: 0;
    box-shadow: none;
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .title-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex: 1;
  }

  .entity-icon {
    --mdc-icon-size: 24px;
    flex-shrink: 0;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    font-weight: 600;
    font-size: 14px;
    line-height: 1.3;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .state {
    font-size: 12px;
    line-height: 1.3;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .sub-btn {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .sub-btn:hover {
    color: var(--primary-text-color);
  }

  .chevron {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    transition: transform 0.3s ease;
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }

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
    padding: 4px 16px 16px;
  }

  .grid-item {
    min-width: 0;
  }
`;customElements.define("materia-room-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"entity_type",selector:{select:{options:["light","cover"]}}},{name:"columns",selector:{number:{min:1,max:6}}},{name:"color_on",selector:{text:{}}}]}});class Ut extends(ht(at)){static properties={config:{state:!0},_expanded:{state:!0},_childCards:{state:!0}};static styles=[ut,pt,St];constructor(){super(),this._expanded=!1,this._childCards=null,this._hass=null}static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",entity_type:"light",columns:2}}setConfig(t){if(!t.entity)throw new Error("entity is required");const e=this.config?.cards;this.config={columns:2,...t};const i=this.config.cards;JSON.stringify(e)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}set hass(t){this._hass=t,this._childCards&&this._childCards.forEach(e=>e.hass=t),this.requestUpdate()}get hass(){return this._hass}firstUpdated(){this._createChildCards()}async _createChildCards(){const t=this.config?.cards;if(!t||0===t.length)return void(this._childCards=[]);const e=await async function(){return ct||(ct=await window.loadCardHelpers(),ct)}();this._childCards=await Promise.all(t.map(async t=>{const i=await e.createCardElement(t);return this._hass&&(i.hass=this._hass),i})),this.requestUpdate()}_toggleExpand(){this._expanded=!this._expanded}_toggleEntity(t){if(t.stopPropagation(),!this._hass||!this.config.entity)return;const e="cover"===(this.config.entity_type||"light")?"cover":"light";this._hass.callService(e,"toggle",{entity_id:this.config.entity})}get _isActive(){if(!this._hass||!this.config.entity)return!1;const t=this._hass.states[this.config.entity];if(!t)return!1;return"cover"===(this.config.entity_type||"light")?"open"===t.state:"on"===t.state}get _stateDisplay(){if(!this._hass||!this.config.entity)return"";const t=this._hass.states[this.config.entity];if(!t)return"unavailable";if(this.config.attribute){const e=t.attributes[this.config.attribute];return null==e?t.state:"brightness"===this.config.attribute?`${Math.round(e/255*100)}%`:String(e)}return this._hass.formatEntityState?this._hass.formatEntityState(t):t.state}render(){if(!this.config)return I``;const t=this._hass?.states?.[this.config.entity],e=this._isUnavailable(t),i=this._isActive,n=i&&this.config.color_on?this.config.color_on:i?"var(--md-sys-color-primary)":"var(--primary-text-color)",s=this.config.columns||2;return I`
      <ha-card>
        <div class="title-row ${e?"unavailable":""}" @click=${this._toggleExpand}>
          <div class="title-left">
            <ha-icon
              class="entity-icon"
              .icon=${this.config.icon||"mdi:home"}
              style="color: ${n}"
              @click=${this._toggleEntity}
            ></ha-icon>
            <div class="info">
              <div class="name">${this.config.name||""}</div>
              <div class="state">${this._stateDisplay}</div>
            </div>
          </div>
          <div class="title-right">
            ${this._renderSubButtons()}
            <ha-icon
              class="chevron ${this._expanded?"rotated":""}"
              .icon=${"mdi:chevron-down"}
            ></ha-icon>
          </div>
        </div>
        <div class="collapsible ${this._expanded?"expanded":""}">
          <div class="collapsible-inner">
            <div class="grid" style="--room-columns: ${s}">
              ${this._childCards?.map(t=>I`<div class="grid-item">${t}</div>`)}
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderSubButtons(){const t=this.config.sub_button;return t&&Array.isArray(t)&&0!==t.length?t.map(t=>I`
        <ha-icon
          class="sub-btn"
          .icon=${t.icon||"mdi:dots-vertical"}
          @click=${e=>{e.stopPropagation(),t.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity}}))}}
        ></ha-icon>
      `):I``}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}}customElements.define("materia-room",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"A native expandable room section with title and grid of child cards"});const zt=o`
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
    transition: background-color 0.3s ease;
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
`;customElements.define("materia-climate-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,selector:{text:{}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",selector:{entity:{domain:"sensor"}}},{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}});class Tt extends(ht(at)){static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static styles=[ut,pt,zt];static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(){return{entity:"",name:"",step:.5}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this.config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this.config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return this._entity?.attributes?.temperature}get _currentTemp(){return this._entity?.attributes?.current_temperature}get _humidity(){if(this.config.humidity_entity)return this.hass?.states[this.config.humidity_entity]?.state}get _outdoorTemp(){if(this.config.outdoor_temp_entity)return this.hass?.states[this.config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--md-sys-color-on-surface-variant)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"rgba(68,68,68,0.7)"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-surface-variant-light, #45464f)"}}_statusText(){const t=this._mode,e=this._currentTemp,i=this._humidity,n=this._outdoorTemp,s=[];if("off"===t)return null!=n&&s.push(`Outdoor · ${n}°`),null!=i&&s.push(`Humidity · ${i}%`),s.join(" · ")||"";if(null!=e&&null!=i?s.push(`${e}° now · ${i}% humidity`):null!=e?s.push(`${e}° now`):null!=i&&s.push(`${i}% humidity`),null!=n){const e=t.charAt(0).toUpperCase()+t.slice(1);s.push(`${e} · Outdoor ${n}°`)}return s.join(" · ")||""}_adjustTemp(t){const e=this._targetTemp;null!=e&&this.hass.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:e+t})}_handleTap(t){if(t.target.closest(".btn"))return;if("more-info"===(this.config.tap_action??{action:"more-info"}).action){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});return t.detail={entityId:this.config.entity},void this.dispatchEvent(t)}const e=new Event("hass-action",{bubbles:!0,composed:!0});e.detail={config:this.config,action:"tap"},this.dispatchEvent(e)}render(){if(!this.hass||!this.config)return I``;const t=this._entity,e=this._isUnavailable(t),i="off"===this._mode||e,n=e?"Unavailable":i?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return I`
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
            ${this.config.name}
          </span>
        </div>

        <div class="center">
          <div class="center-side">
            ${i?L:I`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${t=>{t.stopPropagation(),this._adjustTemp(-this.config.step)}}
                  >
                    <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>

          <span class="temp ${i?"off":""}">${n}</span>

          <div class="center-side">
            ${i?L:I`
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
    `}}customElements.define("materia-climate",Tt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"A native climate thermostat card with mode-based theming"});const Ot=o`
  ha-card.clickable {
    cursor: pointer;
  }

  .container {
    position: relative;
    width: 100%;
    min-height: 50px;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: var(--row-padding, 0px 20px);
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value {
    font-size: 13px;
    font-weight: 400;
    white-space: nowrap;
    flex-shrink: 0;
    margin-left: 16px;
  }

  .chevron {
    --mdc-icon-size: 20px;
    opacity: 0.5;
    margin-right: 12px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
`;customElements.define("materia-sensor-row-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"sensor"}}},{name:"name",required:!0,selector:{text:{}}},{name:"padding",selector:{text:{}}}]}});class Mt extends(ht(at)){static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static styles=[ut,dt,pt,Ot];static getConfigElement(){return document.createElement("materia-sensor-row-editor")}static getStubConfig(){return{entity:"",name:"",padding:"0px 20px"}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this.config={padding:"0px 20px",...t}}_handleTap(){this.hass&&this.config.tap_action&&this._handleAction(this.config.tap_action)}render(){if(!this.hass||!this.config)return I``;const t=this.config,e=this.hass.states[t.entity],i=this._isUnavailable(e),n=e?.state??"",s=e?.attributes?.unit_of_measurement||"",o=i?"Unavailable":s?`${this._capitalize(n)} ${s}`:this._capitalize(n),a=!!t.tap_action;return I`
      <ha-card
        class="${a?"clickable":""}"
        @click=${a?this._handleTap:void 0}
      >
        <div class="container ${i?"unavailable":""}" style="--row-padding: ${t.padding}">
          <span class="name">${t.name}</span>
          <span class="value">${o}</span>
          ${this._hasNavigateAction?I`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-sensor-row",Mt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-sensor-row",name:"Materia Sensor Row",description:"A simple name/value row for displaying sensor data"});customElements.define("materia-weather-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",selector:{text:{}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}}]}});const Pt={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"};class Ft extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=[ut,dt,ft,pt];static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(){return{entity:""}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",n=t?.attributes?.temperature,s=t?.attributes?.temperature_unit||"°",o=Pt[i]||"mdi:weather-partly-cloudy";let a=null;if(this.config.humidity_entity){const t=this.hass.states[this.config.humidity_entity];t&&(a=t.state)}null==a&&null!=t?.attributes?.humidity&&(a=t.attributes.humidity);const r=i.replace(/-|_/g," "),c=e?"Unavailable":null!=n?`${n}${s}`:"—",l=e?"":null!=a?`${this._capitalize(r)} · ${a}% humidity`:this._capitalize(r);return I`
      <ha-card @click=${this._handleTap}>
        <div class="container ${e?"unavailable":""}">
          <div class="icon-container">
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${c}</div>
            <div class="state">${l}</div>
          </div>
        </div>
      </ha-card>
    `}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-weather",Ft),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather display card with condition icons and humidity."});customElements.define("materia-sensor-display-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"unit",selector:{text:{}}}]}});class Dt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static styles=[ut,dt,ft,pt];static getConfigElement(){return document.createElement("materia-sensor-display-editor")}static getStubConfig(){return{entity:"",name:"",icon:""}}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}_classify(t){const e=this.config.ranges||[],i=parseFloat(t);for(const t of e)if(null==t.max||i<=t.max)return{label:t.label,color:t.color};return{label:"",color:""}}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=t?.state??"",n=this.config.name||t?.attributes?.friendly_name||this.config.entity,s=this.config.icon||t?.attributes?.icon||"",o=this.config.unit||t?.attributes?.unit_of_measurement||"",a=this._classify(i),r=e?"Unavailable":o?`${i} · ${a.label||n}`:`${i}`,c=e?n:o||(a.label||n);return I`
      <ha-card @click=${this._handleTap}>
        <div class="container ${e?"unavailable":""}">
          ${s?I`
            <div class="icon-container">
              <ha-icon .icon=${s}></ha-icon>
            </div>
          `:""}
          <div class="name-container">
            <div class="name">${r}</div>
            <div class="state">${c}</div>
          </div>
        </div>
      </ha-card>
    `}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-sensor-display",Dt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-sensor-display",name:"Materia Sensor Display",description:"Sensor display with range-to-label classification (AQI, etc.)."});const Nt={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-secondary)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-error)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]},qt=[ut,o`
    :host {
      display: inline-block;
      margin-bottom: 10px;
    }

    ha-card {
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

    ha-card.no-state {
      grid-template-areas: "i" "n";
      grid-template-rows: 1fr min-content;
    }

    ha-card.with-state {
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

    ha-card.no-state .name {
      margin: 10px 10px 14px 6px;
    }

    ha-card.with-state .name {
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

    ha-card.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }
  `];class Rt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=o`
    :host { display: block; }
  `;setConfig(t){this._config=t}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}},{name:"variant",selector:{select:{options:[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"battery",label:"Battery"}]}}},{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",selector:{template:{}}},{name:"color",selector:{template:{}}},{name:"color_on",selector:{template:{}}}]}render(){return this.hass&&this._config?I`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${_t}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:I``}_valueChanged(t){this._config={...this._config,...t.detail.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}}customElements.define("materia-button-editor",Rt);class Bt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{name:"",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on"}}static styles=[pt,qt];setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}updated(t){super.updated?.(t),t.has("hass")&&this.hass&&(this._resolveField("state_display","_resolvedStateDisplay"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"))}_resolveField(t,e){const i=this.config?.[t];i&&"string"==typeof i&&(i.includes("{{")||i.includes("{%"))&&this._renderTemplate(i).then(t=>{const i="string"==typeof t?t.trim():t;i!==this[e]&&(this[e]=i)})}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state||"on";return e===String(i)||"open"===e}_getBatteryColors(t){const e=parseFloat(t?.state)||0;return e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--ha-card-background)","var(--primary-text-color)"]}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=!!t&&this._isUnavailable(e),n=!i&&this._isActive(e),s=this.config.variant||"secondary",o=this.config.show_state;let a=this._resolvedColor||this.config.color,r=this._resolvedColorOn||this.config.color_on;if(!a)if("battery"===s){const[t,i]=this._getBatteryColors(e);a=t,r=i}else if(n&&t){const t=Nt[s]||Nt.secondary;a=t[0],r=r||t[1]}else a="var(--ha-card-background)",r=r||"var(--primary-text-color)";if(!t&&!this.config.color&&["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"].includes(s)){const t=Nt[s]||Nt.secondary;a=t[0],r=t[1]}r=r||"var(--primary-text-color)";const c=o?"with-state":"no-state",l=n?"active":"inactive";let h="";if(o&&i)h="Unavailable";else if(o&&e){const t=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));h=this._resolvedStateDisplay&&t?this._resolvedStateDisplay:this.config.state_display&&!t?this.config.state_display:e.state,h=this._capitalize(h)}return I`
      <ha-card
        class="${c} ${l} ${i?"unavailable":""}"
        style="background-color: ${a}; color: ${r};"
        @click=${this._handleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this.config.icon} style="color: ${r};"></ha-icon>
        </div>
        <div class="name">${this.config.name}</div>
        ${o?I`<div class="state">${h}</div>`:""}
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"toggle"})}getCardSize(){return 2}}customElements.define("materia-button",Bt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"Material You small button with variants, state display, and battery mode."});const Ht={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat-container)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool-container)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto-container)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light-container)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device-container)",onActive:"var(--md-sys-cust-color-on-device)"}},It={xs:{height:32,innerCorner:4},s:{height:40,innerCorner:8},m:{height:48,innerCorner:8},l:{height:56,innerCorner:16},xl:{height:64,innerCorner:20}},jt=[ut,dt,o`
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

    button.inactive.outlined {
      background: transparent;
      color: var(--primary-text-color);
      border: 1px solid var(--md-sys-color-outline, rgba(0,0,0,0.12));
    }

    button.inactive.elevated {
      background: var(--md-sys-color-surface, var(--ha-card-background));
      color: var(--primary-text-color);
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `];class Lt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config={...t}}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",selector:{select:{options:[{value:"",label:"None"},...Object.keys(Ht).map(t=>({value:t,label:t}))],mode:"dropdown"}}},{name:"size",selector:{select:{options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (40dp)"},{value:"m",label:"M (48dp)"},{value:"l",label:"L (56dp)"},{value:"xl",label:"XL (64dp)"}],mode:"dropdown"}}},{name:"variant",selector:{select:{options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"outlined",label:"Outlined"},{value:"elevated",label:"Elevated"}],mode:"dropdown"}}},{name:"color_active",selector:{text:{}}},{name:"color_on_active",selector:{text:{}}}]}static styles=o`
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
  `;render(){return this.hass&&this._config?I`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${_t}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options||[]).map((t,e)=>I`
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
            ${this._expanded===e?I`
                  <div class="option-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._optionSchema}
                      .computeLabel=${_t}
                      @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `:I``}_expanded=null;get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e};const n={...this._config,options:i};this._config=n,this._fireConfigChanged(n)}_toggleExpand(t){this._expanded=this._expanded===t?null:t,this.requestUpdate()}_valueChanged(t){const e={...this._config,...t.detail.value};this._config=e,this._fireConfigChanged(e)}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}],e={...this._config,options:t};this._config=e,this._expanded=t.length-1,this._fireConfigChanged(e)}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1);const i={...this._config,options:e};this._config=i,this._expanded===t&&(this._expanded=null),this._fireConfigChanged(i)}_moveOption(t,e){const i=[...this._config.options||[]],n=t+e;if(n<0||n>=i.length)return;[i[t],i[n]]=[i[n],i[t]];const s={...this._config,options:i};this._config=s,this._expanded===t&&(this._expanded=n),this._fireConfigChanged(s)}_updateOption(t,e,i){const n=[...this._config.options||[]];n[t]={...n[t],[e]:i};const s={...this._config,options:n};this._config=s,this._fireConfigChanged(s)}_fireConfigChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-button-group-editor",Lt);class Vt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(){return{entity:"",size:"m",options:[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]}}static styles=[pt,jt];setConfig(t){if(!t.options||!Array.isArray(t.options)||0===t.options.length)throw new Error("At least one option is required");this.config={size:"m",...t}}get _activeValue(){const t=this.hass?.states[this.config.entity];return this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):t?.state??""}_getActiveColors(){return this.config.color_active&&this.config.color_on_active?{active:this.config.color_active,onActive:this.config.color_on_active}:this.config.preset&&Ht[this.config.preset]?Ht[this.config.preset]:Ht.primary}render(){if(!this.hass||!this.config)return I``;const t=this.config.entity?this.hass.states[this.config.entity]:void 0,e=!!this.config.entity&&this._isUnavailable(t),i=this.config.size||"m",{height:n,innerCorner:s}=It[i]||It.m,o=n/2,a=this._activeValue,r=this._getActiveColors(),c=this.config.options,l=this.config.variant||"filled";return I`
      <ha-card>
        <div class="group ${e?"unavailable":""}" style="height: ${n}px;">
          ${c.map((t,e)=>{const i=String(t.value)===a,n=0===e,h=e===c.length-1,d=i?`${o}px`:`${s}px`,p=`${o}px`;let u;u=1===c.length?p:n?`${p} ${d} ${d} ${p}`:h?`${d} ${p} ${p} ${d}`:d;const m=i?r.active:void 0,g=i?r.onActive:void 0;return I`
              <button
                class="${i?"active":"inactive"} ${l}"
                style="border-radius: ${u};${i?` background: ${m}; color: ${g};`:""}"
                @click=${()=>this._handleOptionTap(t)}
              >
                ${t.icon?I`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                ${t.label?I`<span>${t.label}</span>`:""}
              </button>
            `})}
        </div>
      </ha-card>
    `}_handleOptionTap(t){t.tap_action?this._handleAction(t.tap_action):this.config.entity&&this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-button-group",Vt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 connected button group with presets and sizes."});const Xt=[ut,o`
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
  `];class Jt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=o`
    :host { display: block; }
    .yaml-label {
      font-size: 13px;
      font-weight: 500;
      margin: 8px 0 4px;
      color: var(--secondary-text-color);
    }
    textarea {
      width: 100%;
      min-height: 80px;
      box-sizing: border-box;
      font-family: monospace;
      font-size: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 6px;
      resize: vertical;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
    }
  `;setConfig(t){this._config=t}get _schema(){return[{name:"icon",required:!0,selector:{icon:{}}},{name:"variant",selector:{select:{options:[{value:"standard",label:"Standard"},{value:"outlined",label:"Outlined"},{value:"filled",label:"Filled"},{value:"filled-tonal",label:"Filled Tonal"}]}}},{name:"size",selector:{select:{options:[{value:"default",label:"Default (48px)"},{value:"large",label:"Large (56px)"}]}}},{name:"entity",selector:{entity:{}}}]}render(){return this.hass&&this._config?I`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${_t}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="yaml-label">Icon map (JSON, state &rarr; icon)</div>
      <textarea
        .value=${this._config.icon_map?JSON.stringify(this._config.icon_map,null,2):""}
        @change=${this._iconMapChanged}
      ></textarea>

      <div class="yaml-label">Tap action (JSON)</div>
      <textarea
        .value=${this._config.tap_action?JSON.stringify(this._config.tap_action,null,2):""}
        @change=${this._tapActionChanged}
      ></textarea>
    `:I``}_valueChanged(t){const e={...this._config,...t.detail.value,icon_map:this._config.icon_map,tap_action:this._config.tap_action};this._fireConfig(e)}_iconMapChanged(t){const e=t.target.value.trim();if(!e){const{icon_map:t,...e}=this._config;return void this._fireConfig(e)}try{const t=JSON.parse(e);this._fireConfig({...this._config,icon_map:t})}catch(t){}}_tapActionChanged(t){const e=t.target.value.trim();if(!e){const{tap_action:t,...e}=this._config;return void this._fireConfig(e)}try{const t=JSON.parse(e);this._fireConfig({...this._config,tap_action:t})}catch(t){}}_fireConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-icon-button-editor",Jt);class Wt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-icon-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"default"}}static styles=[pt,Xt];setConfig(t){if(!t.icon)throw new Error("icon is required");this.config={variant:"filled",size:"default",...t}}_resolveIcon(){if(!this.config.icon_map||!this.config.entity)return this.config.icon;const t=this.hass?.states[this.config.entity]?.state;return this.config.icon_map[t]??this.config.icon_map.default??this.config.icon}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}render(){if(!this.config)return I``;const t=this.config.entity?this.hass?.states?.[this.config.entity]:void 0,e=!!this.config.entity&&this._isUnavailable(t),i=this.config.variant||"filled",n="large"===this.config.size?"large":"default",s=this._resolveIcon();return I`
      <ha-card
        class="${i} size-${n} ${e?"unavailable":""}"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${s}></ha-icon>
      </ha-card>
    `}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const t=this.hass?.states[this.config.entity]?.state,e=this.config.tap_action_map[t]??this.config.tap_action_map.default;if(e)return e}return this.config.tap_action||this._defaultTapAction()}_handleTap(){this._handleAction(this._resolveTapAction())}getCardSize(){return 1}}customElements.define("materia-icon-button",Wt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-icon-button",name:"Materia Icon Button",description:"M3 icon button with variants"});const Gt=[ut,o`
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
  `];customElements.define("materia-checkbox-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]}});class Yt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(){return{entity:"",name:""}}static styles=[pt,Gt];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(this.config.checked_entity){const t=this.hass?.states[this.config.checked_entity];if(!t)return!1;const e=String(t.state??"").split(",").map(t=>t.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(t=>e.includes(t)):!!this.config.checked_value&&e.includes(this.config.checked_value)}if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=!e&&this._isChecked(t),n=this.config.name??t?.attributes?.friendly_name??this.config.entity,s=i?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return I`
      <ha-card class="${e?"unavailable":""}" @click=${this._handleTap}>
        <div class="name">${n}</div>
        <div class="icon-cell">
          <ha-icon .icon=${s}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.hass?.states[this.config.entity],e=this._isChecked(t);let i;i=e&&this.config.tap_action_checked?this.config.tap_action_checked:!e&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",Yt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Material You checkbox row with name and toggle icon."});const Kt=[ut,dt,o`
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
  `];customElements.define("materia-pill-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"color",selector:{template:{}}},{name:"color_on",selector:{template:{}}},{name:"tap_action",type:"expandable",schema:[{name:"action",selector:{select:{options:[{value:"none",label:"None"},{value:"more-info",label:"More info"},{value:"navigate",label:"Navigate"},{value:"toggle",label:"Toggle"},{value:"call-service",label:"Call service"}]}}},{name:"navigation_path",selector:{text:{}}}]}]}});class Zt extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:information-outline"}}static styles=[pt,Kt];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...t}}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this.config.name||t?.attributes?.friendly_name||this.config.entity,n=this.config.icon,s=t?.attributes?.unit_of_measurement||"",o=e?"Unavailable":s?`${this._capitalize(t.state)} ${s}`:this._capitalize(t.state),a=t?.state?.toLowerCase()??"",r="on"===a||"true"===a||"home"===a||"open"===a||"cleaning"===a||"playing"===a||!isNaN(Number(a))&&Number(a)>0,c=r&&this.config.color?this.config.color:"var(--ha-card-background, var(--card-background-color))",l=r&&this.config.color_on?this.config.color_on:"var(--primary-text-color)";return I`
      <ha-card>
        <div
          class="container ${e?"unavailable":""}"
          style="background-color: ${c}; color: ${l};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${n} style="color: ${l};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${i}</div>
            <div class="state">${o}</div>
          </div>
          ${this._hasNavigateAction?I`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",Zt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill card with configurable icon, name, state, and colors."});const Qt=[ut,o`
    ha-card {
      border-radius: var(--ha-card-border-radius, 18px);
      padding: 12px 16px;
      font-family: inherit;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    ha-icon {
      --mdc-icon-size: 24px;
      color: var(--md-sys-color-on-surface-variant);
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      min-width: 0;
    }

    .name {
      font-size: 14px;
      font-weight: 500;
    }

    .current-option {
      font-size: 12px;
      opacity: 0.7;
    }

    select {
      background: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
      border: 1px solid var(--md-sys-color-outline);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 14px;
      font-family: inherit;
      cursor: pointer;
      max-width: 50%;
    }

    select:focus {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: -1px;
    }
  `];customElements.define("materia-select-editor",class extends yt{get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}});class te extends(ht(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-select-editor")}static getStubConfig(){return{entity:""}}static styles=[pt,Qt];setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity],e=this._isUnavailable(t),i=this.config.name||t?.attributes?.friendly_name||this.config.entity,n=t?.attributes?.options||[],s=e?"Unavailable":t.state;return I`
      <ha-card class="${e?"unavailable":""}">
        <div class="row">
          ${this.config.icon?I`<ha-icon .icon=${this.config.icon}></ha-icon>`:""}
          <div class="info">
            <div class="name">${i}</div>
            <div class="current-option">${s}</div>
          </div>
          <select @change=${this._onSelect}>
            ${n.map(t=>I`<option value=${t} ?selected=${t===s}>${t}</option>`)}
          </select>
        </div>
      </ha-card>
    `}_onSelect(t){const e=t.target.value,i=this.config.entity,n=i.split(".")[0];this.hass.callService(n,"select_option",{entity_id:i,option:e})}getCardSize(){return 1}}customElements.define("materia-select",te),window.customCards=window.customCards||[],window.customCards.push({type:"materia-select",name:"Materia Select",description:"Dropdown select for input_select / select entities."}),function(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}();console.info("%c MATERIA %c v0.3.0 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
