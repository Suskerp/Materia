/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...l(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,x=t=>t,C=$.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,U="?"+k,S=`<${U}>`,z=document,T=()=>z.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,P="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,R=/>/g,H=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,B=/"/g,N=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),W=new WeakMap,V=z.createTreeWalker(z,129);function Y(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=q;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===q?"!--"===c[1]?n=D:void 0!==c[1]?n=R:void 0!==c[2]?(N.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=r??q,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?B:O):n===B||n===O?n=H:n===D||n===R?n=q:(n=H,r=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===q?i+S:d>=0?(s.push(a),i.slice(0,d)+E+i.slice(d)+k+h):i+k+(-2===d?e:h)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,d]=G(t,e);if(this.el=X.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=d[o++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(N.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),V.nextNode(),a.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===U)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===I)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);V.currentNode=s;let r=V.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=V.nextNode(),o++)}return V.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),M(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new X(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Z(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=J(this,s[i+n],e,n),a===I&&(a=this._$AH[n]),o||=!M(a)||a!==this._$AH[n],a===L?t=L:t!==L&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class it extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??L)===I)return;const i=this._$AH,s=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==L&&(i===L||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(X,Z),($.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;function ct(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const dt=o`
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
`;let lt;async function ht(t,e){const i=await async function(){return lt||(lt=await window.loadCardHelpers(),lt)}(),s=await i.createCardElement(t);return e&&(s.hass=e),s}customElements.define("materia-light-switch",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:track-light",...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await ht({type:"custom:bubble-card",card_type:"button",button_type:"switch",entity:t.entity,name:t.name,icon:t.icon,modules:["light_toggle"],grid_options:{columns:12,rows:1.5},show_state:!0,show_attribute:!0,tap_action:{action:"toggle"},sub_button:{main:[],bottom:[]}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light-switch",name:"Materia Light Switch",description:"A light toggle switch card (bubble-card wrapper)"});customElements.define("materia-light-dimmer",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:track-light",...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await ht({type:"custom:bubble-card",card_type:"button",button_type:"slider",entity:t.entity,name:t.name,icon:t.icon,modules:["light_dimmer"],grid_options:{columns:12,rows:1.5},show_state:!0,show_attribute:!0,attribute:"brightness",slider_live_update:!0,allow_light_slider_to_0:!0,tap_action:{action:"toggle"},sub_button:{main:[],bottom:[]}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light-dimmer",name:"Materia Light Dimmer",description:"A dimmable light slider card (bubble-card wrapper)"});customElements.define("materia-cover",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={show_stop:!0,...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}_buildSubButtons(){const t=this._config.entity,e=[{name:"Up",icon:"mdi:arrow-up",tap_action:{action:"call-service",service:"cover.open_cover",target:{entity_id:t}}}];return this._config.show_stop&&e.push({name:"Stop",icon:"mdi:stop",tap_action:{action:"call-service",service:"cover.stop_cover",target:{entity_id:t}}}),e.push({name:"Down",icon:"mdi:arrow-down",tap_action:{action:"call-service",service:"cover.close_cover",target:{entity_id:t}}}),e}async _createCard(){if(this._card)return;const t=this._config;this._card=await ht({type:"custom:bubble-card",card_type:"button",button_type:"slider",entity:t.entity,name:t.name,modules:["Shutter","default"],grid_options:{columns:12,rows:1.5},show_state:!0,show_attribute:!0,attribute:"current_position",sub_button:{main:this._buildSubButtons(),bottom:[]},tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"},button_action:{tap_action:{action:"none"}}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-cover",name:"Materia Cover",description:"A cover card with up/stop/down controls (bubble-card wrapper)"});customElements.define("materia-device",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:power-plug",button_type:"switch",active_state:"on",color_active:"var(--md-sys-cust-color-device)",color_on_active:"var(--md-sys-cust-color-on-device)",show_state:!0,...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config,e=t.active_state,i=t.color_active,s=t.color_on_active,r={type:"custom:bubble-card",card_type:"button",button_type:t.button_type,entity:t.entity,name:t.name,icon:t.icon,grid_options:{columns:12,rows:1.5},show_state:t.show_state,modules:["default"],sub_button:{main:[],bottom:[]},styles:`:host {\n  --bubble-main-background-color: \${ state === '${e}' ? '${i}' : '' } ;\n  --primary-text-color: \${ state === '${e}' ? '${s}' : '' } ;\n  --bubble-icon-color: \${ state === '${e}' ? '${s}' : '' } ;\n}`};t.tap_action&&(r.tap_action=t.tap_action),this._card=await ht(r,this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-device",name:"Materia Device",description:"A generic device/switch card with active-state colors (bubble-card wrapper)"});customElements.define("materia-lock",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await ht({type:"custom:bubble-card",card_type:"button",button_type:"switch",entity:t.entity,name:t.name,icon:"m3o:lock",modules:["device","default","conditional_icon"],conditional_icon:{icon_true:"m3o:lock",icon_false:"m3o:lock-open-right",conditions:[{condition:"state",entity_id:t.entity,state:"on"}]},sub_button:{main:[],bottom:[]},tap_action:{action:"none"}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"A lock card with conditional icons (bubble-card wrapper)"});customElements.define("materia-battery-low",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await ht({type:"custom:bubble-card",card_type:"button",button_type:"state",entity:t.entity,name:t.name,icon:"m3o:battery-android-alert",modules:["battery"],grid_options:{columns:6,rows:"auto"},sub_button:{main:[],bottom:[]}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 1}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-battery-low",name:"Materia Battery Low",description:"A low battery alert card (bubble-card wrapper)"});customElements.define("materia-room",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={columns:2,...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}_buildTitleCard(){const t=this._config;return{type:"custom:bubble-card",card_type:"button",button_type:"slider",entity:t.entity,name:t.name,icon:t.icon,sub_button:{main:t.sub_button||[]},grid_options:{columns:12,rows:1.5},button_action:{tap_action:{action:"toggle"}},card_layout:"large",show_attribute:!0,show_state:!0,slider_live_update:!0,allow_light_slider_to_0:!0,attribute:t.attribute,styles:".bubble-range-value {\n  right: 40px !important;\n}\n.bubble-buttons-container {\n  margin-right: 4em;\n}\n.bubble-sub-button:last-child {\n  margin-right: 4em !important;\n}",modules:["default","light_toggle","light_dimmer"]}}_buildGridCard(){const t=this._config;return{type:"custom:layout-card",layout_type:"custom:grid-layout",layout:{"grid-template-columns":`repeat(${t.columns}, 1fr)`,"grid-row-gap":"var(--ha-section-grid-row-gap, 0px)","grid-column-gap":"var(--ha-section-grid-column-gap, 8px)",margin:"5px 0",padding:"0"},cards:t.cards||[]}}_buildCardModStyle(){const t=this._config,e=t.entity_type||"light",i=t.color_on||"";return`\n.ico, .icoclose {\n  color: {% if ${"light"===e?`states('${t.entity}') == 'on'`:`states('${t.entity}') == 'open'`} %}\n      ${i}\n  {% else %}\n    var(--primary-text-color)\n  {% endif %} !important;\n}\nha-card {\n  box-shadow: none !important;\n}`}async _createCard(){if(this._card)return;const t={type:"custom:expander-card","child-margin-top":"0.6em",padding:0,clear:!1,animation:!1,"clear-children":!1,"expander-card-background":"transparent","expander-card-background-expanded":"transparent","title-card-button-overlay":!0,"title-card-clickable":!1,"overlay-margin":"21px 4px",card_mod:{style:this._buildCardModStyle()},"title-card":this._buildTitleCard(),cards:[this._buildGridCard()]};this._card=await ht(t,this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return j`<div id="card">${this._card}</div>`}getCardSize(){return 3}static get styles(){return o`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"An expandable room section with title and grid of child cards (expander-card wrapper)"});customElements.define("materia-climate",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this._config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this._config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return this._entity?.attributes?.temperature}get _currentTemp(){return this._entity?.attributes?.current_temperature}get _humidity(){if(this._config.humidity_entity)return this.hass?.states[this._config.humidity_entity]?.state}get _outdoorTemp(){if(this._config.outdoor_temp_entity)return this.hass?.states[this._config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--md-sys-color-on-surface-variant)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"rgba(68,68,68,0.7)"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-surface-variant-light, #45464f)"}}_statusText(){const t=this._mode,e=this._currentTemp,i=this._humidity,s=this._outdoorTemp,r=[];if("off"===t)return null!=s&&r.push(`Outdoor · ${s}°`),null!=i&&r.push(`Humidity · ${i}%`),r.join(" · ")||"";if(null!=e&&null!=i?r.push(`${e}° now · ${i}% humidity`):null!=e?r.push(`${e}° now`):null!=i&&r.push(`${i}% humidity`),null!=s){const e=t.charAt(0).toUpperCase()+t.slice(1);r.push(`${e} · Outdoor ${s}°`)}return r.join(" · ")||""}_adjustTemp(t){const e=this._targetTemp;null!=e&&this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:e+t})}_handleTap(t){if(t.target.closest(".btn"))return;if("more-info"===(this._config.tap_action??{action:"more-info"}).action){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});return t.detail={entityId:this._config.entity},void this.dispatchEvent(t)}const e=new Event("hass-action",{bubbles:!0,composed:!0});e.detail={config:this._config,action:"tap"},this.dispatchEvent(e)}connectedCallback(){super.connectedCallback(),ct()}render(){if(!this.hass||!this._config)return j``;if(!this._entity)return j`<ha-card>
        <div class="card-content">Entity not found: ${this._config.entity}</div>
      </ha-card>`;const t="off"===this._mode,e=t?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return j`
      <ha-card
        @click=${this._handleTap}
        style="
          background-color: ${this._modeBg()};
          color: ${this._modeColor()};
        "
      >
        <!-- Header -->
        <div class="header">
          <ha-icon
            .icon=${this._modeIcon()}
            style="color: ${this._modeColor()}; --mdc-icon-size: 20px;"
          ></ha-icon>
          <span class="name" style="color: ${this._modeColor()};">
            ${this._config.name}
          </span>
        </div>

        <!-- Center: temp +/- -->
        <div class="center">
          ${t?j`<div class="btn-placeholder"></div>`:j`
                <button
                  class="btn"
                  style="
                    background-color: ${this._buttonBg()};
                    color: ${this._buttonColor()};
                  "
                  @click=${t=>{t.stopPropagation(),this._adjustTemp(-this._config.step)}}
                >
                  <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                </button>
              `}

          <span class="temp ${t?"off":""}">
            ${e}
          </span>

          ${t?j`<div class="btn-placeholder"></div>`:j`
                <button
                  class="btn"
                  style="
                    background-color: ${this._buttonBg()};
                    color: ${this._buttonColor()};
                  "
                  @click=${t=>{t.stopPropagation(),this._adjustTemp(this._config.step)}}
                >
                  <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon>
                </button>
              `}
        </div>

        <!-- Status -->
        <div class="status" style="color: ${this._modeColor()};">
          ${this._statusText()}
        </div>
      </ha-card>
    `}static get styles(){return o`
      :host {
        display: block;
        font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
      }

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

      /* ── header ── */
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

      /* ── center row ── */
      .center {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px;
      }

      .temp {
        font-size: 72px;
        font-weight: 450;
        line-height: 1;
        text-align: center;
        flex: 1;
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

      /* ── +/- buttons ── */
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

      .btn-placeholder {
        width: 80px;
        height: 55px;
        flex-shrink: 0;
      }

      /* ── status ── */
      .status {
        font-size: 15px;
        padding-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"A native climate thermostat card with mode-based theming"});customElements.define("materia-pill-toggle",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.left_service)throw new Error("left_service is required");if(!t.left_service_data)throw new Error("left_service_data is required");if(!t.right_service)throw new Error("right_service is required");if(!t.right_service_data)throw new Error("right_service_data is required");this._config={left_name:"On",right_name:"Off",left_state:"on",right_state:"off",color_active:"var(--md-sys-color-primary)",color_on_active:"var(--md-sys-color-on-primary)",height:"88px",...t}}connectedCallback(){super.connectedCallback(),ct()}_callService(t,e){if(!this.hass||!t)return;const[i,s]=t.split(".");this.hass.callService(i,s,e)}_handleLeftTap(){const t=this._config;this._callService(t.left_service,t.left_service_data)}_handleRightTap(){const t=this._config;this._callService(t.right_service,t.right_service_data)}render(){if(!this.hass||!this._config)return j``;const t=this._config,e=this.hass.states[t.entity];if(!e)return j`<ha-card>Entity not found: ${t.entity}</ha-card>`;const i=e.state,s=i===t.left_state,r=i===t.right_state;return j`
      <ha-card>
        <div class="container" style="--pill-height: ${t.height}">
          <button
            class="pill left ${s?"active":""}"
            style="
              --bg: ${s?t.color_active:"var(--card-background-color)"};
              --fg: ${s?t.color_on_active:"var(--primary-text-color)"};
              --bdr: ${s?`2px solid ${t.color_on_active}`:"1px solid transparent"};
            "
            @click=${this._handleLeftTap}
          >
            ${t.left_name}
          </button>
          <button
            class="pill right ${r?"active":""}"
            style="
              --bg: ${r?t.color_active:"var(--card-background-color)"};
              --fg: ${r?t.color_on_active:"var(--primary-text-color)"};
              --bdr: ${r?`2px solid ${t.color_on_active}`:"1px solid transparent"};
            "
            @click=${this._handleRightTap}
          >
            ${t.right_name}
          </button>
        </div>
      </ha-card>
    `}getCardSize(){return 2}static get styles(){return[dt,o`
        ha-card {
          box-shadow: none;
          background: transparent;
          border: none;
        }

        .container {
          display: flex;
          gap: 0;
        }

        .pill {
          flex: 1;
          height: var(--pill-height, 88px);
          padding: 8px;
          cursor: pointer;
          background-color: var(--bg);
          color: var(--fg);
          border: var(--bdr);
          font-family: inherit;
          font-weight: bold;
          font-size: 14px;
          transition: background-color 0.2s ease, color 0.2s ease, border 0.2s ease;
          outline: none;
        }

        .pill.left {
          border-radius: 999px 0 0 999px;
        }

        .pill.right {
          border-radius: 0 999px 999px 0;
        }
      `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill-toggle",name:"Materia Pill Toggle",description:"A two-option pill toggle for any entity"});customElements.define("materia-sensor-row",class extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this._config={padding:"0px 20px",...t}}connectedCallback(){super.connectedCallback(),ct()}_handleTap(){if(!this.hass||!this._config.tap_action)return;const t=this._config.tap_action;switch(t.action){case"call-service":{const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{});break}case"more-info":{const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this._config.entity}});this.dispatchEvent(e);break}case"navigate":{history.pushState(null,"",t.navigation_path);const e=new CustomEvent("location-changed",{bubbles:!0,composed:!0});window.dispatchEvent(e);break}}}render(){if(!this.hass||!this._config)return j``;const t=this._config,e=this.hass.states[t.entity];if(!e)return j`<ha-card>Entity not found: ${t.entity}</ha-card>`;const i=e.state,s=e.attributes.unit_of_measurement||"",r=s?`${i} ${s}`:i,o=!!t.tap_action;return j`
      <ha-card
        class="${o?"clickable":""}"
        style="--row-padding: ${t.padding}"
        @click=${o?this._handleTap:void 0}
      >
        <div class="row">
          <span class="name">${t.name}</span>
          <span class="state">${r}</span>
        </div>
      </ha-card>
    `}getCardSize(){return 1}static get styles(){return[dt,o`
        ha-card {
          box-shadow: none;
          border-radius: 18px;
        }

        ha-card.clickable {
          cursor: pointer;
        }

        .row {
          display: grid;
          grid-template-areas: "n s";
          grid-template-columns: 1fr auto;
          align-items: center;
          padding: var(--row-padding, 0px 20px);
          font-size: 14px;
          font-weight: 400;
        }

        .name {
          grid-area: n;
          justify-self: start;
        }

        .state {
          grid-area: s;
          justify-self: end;
        }
      `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-sensor-row",name:"Materia Sensor Row",description:"A simple name/value row for displaying sensor data"});const pt={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-secondary)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-error)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]};class ut extends nt{static properties={hass:{attribute:!1},config:{state:!0}};static styles=o`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      height: 107px;
      width: 110px;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    /* ---- base layout: icon + name ---- */
    ha-card.no-state {
      grid-template-areas: "i" "n";
      grid-template-rows: 1fr min-content;
    }

    /* ---- with-state layout: icon + name + state ---- */
    ha-card.with-state {
      grid-template-areas: "i" "n" "s";
      grid-template-rows: 1fr min-content min-content;
    }

    .icon-cell {
      grid-area: i;
      align-self: start;
      text-align: start;
      display: flex;
      justify-content: start;
      align-items: start;
      height: 24px;
      margin: 10px;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
      margin: 0 15px;
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
      margin: 10px 10px 22px 6px;
    }

    ha-card.with-state .name {
      margin: 10px 10px 0 6px;
    }

    .state {
      grid-area: s;
      justify-self: start;
      margin: 0 0 4px 16px;
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      line-height: 18px;
    }

    /* ---- inactive (default) styling ---- */
    ha-card.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state||"on";return e===String(i)||"open"===e}_getBatteryColors(t){const e=parseFloat(t?.state)||0;return e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--ha-card-background)","var(--primary-text-color)"]}render(){if(!this.hass||!this.config)return j``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=this._isActive(e),s=this.config.variant||"secondary",r=this.config.show_state;let o,n;if("battery"===s){const[t,i]=this._getBatteryColors(e);o=t,n=i}else if(i&&t)if(this.config.color_on)o=this.config.color_on,n=this.config.color?this.config.color:"var(--primary-text-color)";else{const t=pt[s]||pt.secondary;o=t[0],n=t[1]}else o="var(--ha-card-background)",n="var(--primary-text-color)";if(!r&&!t&&["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"].includes(s)){const t=pt[s]||pt.secondary;o=t[0],n=t[1]}const a=r?"with-state":"no-state",c=i?"active":"inactive";let d="";if(r&&e)if(this.config.state_display)try{d=new Function("state","hass","entity",`return ${this.config.state_display}`)(e.state,this.hass,e)}catch(t){d=e.state}else d=e.state;return j`
      <ha-card
        class="${a} ${c}"
        style="background-color: ${o}; color: ${n};"
        @click=${this._handleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this.config.icon} style="color: ${n};"></ha-icon>
        </div>
        <div class="name">${this.config.name}</div>
        ${r?j`<div class="state">${d}</div>`:""}
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action||{action:"toggle"};this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 2}}customElements.define("materia-button",ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"Material You small button with variants, state display, and battery mode."});class mt extends nt{static properties={hass:{attribute:!1},config:{state:!0}};static styles=o`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      height: 46px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0px;
      cursor: pointer;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease, border-radius 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card.active {
      background-color: var(--md-sys-color-secondary);
      color: var(--md-sys-color-secondary-container);
      gap: 8px;
    }

    ha-card.inactive {
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      display: none;
    }

    ha-card.active ha-icon {
      display: inline-flex;
      color: var(--md-sys-color-secondary-container);
    }

    .label {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");if(void 0===t.option)throw new Error("option is required");if(!t.label)throw new Error("label is required");this.config=t}_isActive(){const t=this.hass?.states[this.config.entity];return t?.state===String(this.config.option)}_getBorderRadius(t){const e=this.config.position||"",i="left"===e,s="right"===e;return`${i||t?"30px":"8px"} ${s||t?"30px":"8px"} ${s||t?"30px":"8px"} ${i||t?"30px":"8px"}`}render(){if(!this.hass||!this.config)return j``;const t=this._isActive(),e=this._getBorderRadius(t);return j`
      <ha-card
        class="${t?"active":"inactive"}"
        style="border-radius: ${e};"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${"mdi:check"}></ha-icon>
        <span class="label">${this.config.label}</span>
      </ha-card>
    `}_handleTap(){this.hass.callService("select","select_option",{entity_id:this.config.entity,option:String(this.config.option)})}getCardSize(){return 1}}customElements.define("materia-select-chip",mt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-select-chip",name:"Materia Select Chip",description:"Material You select chip with active/inactive states and positional border-radius."});class gt extends nt{static properties={hass:{attribute:!1},config:{state:!0}};static styles=o`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

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
      border-radius: 18px;
      overflow: hidden;
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}render(){if(!this.hass||!this.config)return j``;const t=this.hass.states[this.config.entity],e=this._isChecked(t),i=this.config.name??t?.attributes?.friendly_name??this.config.entity,s=e?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return j`
      <ha-card @click=${this._handleTap}>
        <div class="name">${i}</div>
        <div class="icon-cell">
          <ha-icon .icon=${s}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action||{action:"toggle"};this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-checkbox",gt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Material You checkbox row with name and toggle icon."});class ft extends nt{static properties={hass:{attribute:!1},config:{state:!0}};static styles=o`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      padding: 0;
      border-radius: 100%;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      box-shadow: none;
      border: none;
      -webkit-tap-highlight-color: transparent;
    }

    /* ---- normal (66px) ---- */
    ha-card.size-normal {
      width: 66px;
      height: 66px;
      background-color: var(--md-sys-color-primary);
    }

    ha-card.size-normal ha-icon {
      color: var(--md-sys-color-on-primary);
    }

    /* ---- small (52px) ---- */
    ha-card.size-small {
      width: 52px;
      height: 52px;
      background-color: var(--ha-card-background);
    }

    ha-card.size-small ha-icon {
      color: var(--primary-text-color);
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");this.config={size:"normal",...t}}render(){if(!this.config)return j``;const t="small"===this.config.size?"small":"normal";return j`
      <ha-card class="size-${t}" @click=${this._handleTap}>
        <ha-icon .icon=${this.config.icon}></ha-icon>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action;t&&this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-circle-action",ft),window.customCards=window.customCards||[],window.customCards.push({type:"materia-circle-action",name:"Materia Circle Action",description:"Material You circular action button in normal (66px) or small (52px) sizes."});class _t extends nt{static properties={hass:{attribute:!1},config:{state:!0}};static styles=o`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      width: fit-content;
      padding: 0 12px;
      border-radius: 999px;
      border: none;
      box-shadow: none;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      transition: transform 0.15s ease;
    }

    ha-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--md-sys-color-on-secondary-container);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease;
    }

    ha-card:hover::before {
      opacity: 0.08;
    }

    ha-card:active::before {
      opacity: 0.12;
    }

    ha-card:active {
      transform: scale(0.98);
    }

    .grid {
      display: grid;
      grid-template-areas: "i n";
      grid-template-columns: 18px auto;
      column-gap: 8px;
      align-items: center;
      width: 100%;
    }

    .icon-cell {
      grid-area: i;
      margin: 0;
      padding: 0;
      width: 18px;
      min-width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--md-sys-color-on-secondary-container);
    }

    .name {
      grid-area: n;
      font-size: 13px;
      font-weight: 600;
      padding: 0;
      justify-self: start;
      color: var(--md-sys-color-on-secondary-container);
      white-space: nowrap;
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config=t}render(){return this.config?j`
      <ha-card @click=${this._handleTap}>
        <div class="grid">
          <div class="icon-cell">
            <ha-icon .icon=${this.config.icon}></ha-icon>
          </div>
          <div class="name">${this.config.name}</div>
        </div>
      </ha-card>
    `:j``}_handleTap(){const t=this.config.tap_action;t&&this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-tonal-button",_t),window.customCards=window.customCards||[],window.customCards.push({type:"materia-tonal-button",name:"Materia Tonal Button",description:"Material You tonal pill button with hover and active states."});class yt extends nt{static properties={hass:{attribute:!1},config:{state:!0}};static styles=o`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 36px;
      width: 130px;
      padding: 0 8px;
      border-radius: 6px;
      border: 1px solid var(--md-sys-color-on-secondary-container);
      box-shadow: none;
      cursor: pointer;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card.inactive {
      background-color: transparent;
      color: var(--primary-text-color);
    }

    ha-card.active {
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .grid {
      display: grid;
      grid-template-areas: "i n";
      grid-template-columns: 18px auto;
      column-gap: 8px;
      align-items: center;
      width: 100%;
    }

    .icon-cell {
      grid-area: i;
      margin: 0;
      padding: 0;
      width: 18px;
      min-width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
    }

    ha-card.active .icon-cell ha-icon {
      color: var(--md-sys-color-on-secondary-container);
    }

    .name {
      grid-area: n;
      font-size: 13px;
      font-weight: 600;
      padding: 0;
      justify-self: start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ha-card.active .name {
      color: var(--md-sys-color-on-secondary-container);
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={active_state:"on",...t}}_isActive(){const t=this.hass?.states[this.config.entity];return t?.state===String(this.config.active_state)}render(){if(!this.hass||!this.config)return j``;const t=this._isActive();return j`
      <ha-card
        class="${t?"active":"inactive"}"
        @click=${this._handleTap}
      >
        <div class="grid">
          <div class="icon-cell">
            <ha-icon .icon=${this.config.icon}></ha-icon>
          </div>
          <div class="name">${this.config.name}</div>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action;t?this._handleAction(t):this.config.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.config.entity}}))}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-pill-badge",yt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill-badge",name:"Materia Pill Badge",description:"Material You pill badge card with active state highlighting."}),ct();console.info("%c MATERIA %c v0.1.0 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
