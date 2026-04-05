/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,m=globalThis,p=m.trustedTypes,g=p?p.emptyScript:"",f=m.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!o(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const n=this.constructor;if(!1===s&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,f?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,C=t=>t,x=$.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,U="?"+S,k=`<${U}>`,q=document,z=()=>q.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,F="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,R=/>/g,O=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,L=/^(?:script|style|textarea|title)$/i,N=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),W=new WeakMap,V=q.createTreeWalker(q,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=P;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===P?"!--"===c[1]?r=D:void 0!==c[1]?r=R:void 0!==c[2]?(L.test(c[2])&&(a=RegExp("</"+c[2],"g")),r=O):void 0!==c[3]&&(r=O):r===O?">"===c[0]?(r=a??P,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,o=c[1],r=void 0===c[3]?O:'"'===c[3]?H:B):r===H||r===B?r=O:r===D||r===R?r=P:(r=O,a=void 0);const d=r===O&&t[e+1].startsWith("/>")?" ":"";n+=r===P?i+k:l>=0?(s.push(o),i.slice(0,l)+A+i.slice(l)+S+d):i+S+(-2===l?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[c,l]=G(t,e);if(this.el=X.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=l[n++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),V.nextNode(),o.push({type:2,index:++a});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===U)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:a}),t+=S.length-1}a++}}static createElement(t,e){const i=q.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===j)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=T(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??q).importNode(e,!0);V.currentNode=s;let a=V.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Z(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new st(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=V.nextNode(),n++)}return V.currentNode=q,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new X(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Z(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=J(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=J(this,s[i+r],e,r),o===j&&(o=this._$AH[r]),n||=!T(o)||o!==this._$AH[r],o===I?t=I:t!==I&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class it extends Q{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??I)===j)return;const i=this._$AH,s=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==I&&(i===I||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(X,Z),($.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Z(e.insertBefore(z(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const ot=nt.litElementPolyfillSupport;function ct(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}ot?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");const lt=n`
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
`;let ht;async function dt(t,e){const i=await async function(){return ht||(ht=await window.loadCardHelpers(),ht)}(),s=await i.createCardElement(t);return e&&(s.hass=e),s}customElements.define("materia-light-switch-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-light-switch",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-light-switch-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:track-light"}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:track-light",...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await dt({type:"custom:bubble-card",card_type:"button",button_type:"switch",entity:t.entity,name:t.name,icon:t.icon,modules:["light_toggle"],grid_options:{columns:12,rows:1.5},show_state:!0,show_attribute:!0,tap_action:{action:"toggle"},sub_button:{main:[],bottom:[]}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light-switch",name:"Materia Light Switch",description:"A light toggle switch card (bubble-card wrapper)"});customElements.define("materia-light-dimmer-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-light-dimmer",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-light-dimmer-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:track-light"}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:track-light",...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await dt({type:"custom:bubble-card",card_type:"button",button_type:"slider",entity:t.entity,name:t.name,icon:t.icon,modules:["light_dimmer"],grid_options:{columns:12,rows:1.5},show_state:!0,show_attribute:!0,attribute:"brightness",slider_live_update:!0,allow_light_slider_to_0:!0,tap_action:{action:"toggle"},sub_button:{main:[],bottom:[]}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light-dimmer",name:"Materia Light Dimmer",description:"A dimmable light slider card (bubble-card wrapper)"});customElements.define("materia-cover-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"cover"}}},{name:"name",selector:{text:{}}},{name:"show_stop",selector:{boolean:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-cover",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-cover-editor")}static getStubConfig(){return{entity:"",name:"",show_stop:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={show_stop:!0,...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}_buildSubButtons(){const t=this._config.entity,e=[{name:"Up",icon:"mdi:arrow-up",tap_action:{action:"call-service",service:"cover.open_cover",target:{entity_id:t}}}];return this._config.show_stop&&e.push({name:"Stop",icon:"mdi:stop",tap_action:{action:"call-service",service:"cover.stop_cover",target:{entity_id:t}}}),e.push({name:"Down",icon:"mdi:arrow-down",tap_action:{action:"call-service",service:"cover.close_cover",target:{entity_id:t}}}),e}async _createCard(){if(this._card)return;const t=this._config;this._card=await dt({type:"custom:bubble-card",card_type:"button",button_type:"slider",entity:t.entity,name:t.name,modules:["Shutter","default"],grid_options:{columns:12,rows:1.5},show_state:!0,show_attribute:!0,attribute:"current_position",sub_button:{main:this._buildSubButtons(),bottom:[]},tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"},button_action:{tap_action:{action:"none"}}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-cover",name:"Materia Cover",description:"A cover card with up/stop/down controls (bubble-card wrapper)"});customElements.define("materia-device-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"button_type",selector:{select:{options:["switch","state","name"]}}},{name:"active_state",selector:{text:{}}},{name:"show_state",selector:{boolean:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-device",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-device-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:power-plug",button_type:"switch",active_state:"on",show_state:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:power-plug",button_type:"switch",active_state:"on",color_active:"var(--md-sys-cust-color-device)",color_on_active:"var(--md-sys-cust-color-on-device)",show_state:!0,...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config,e=t.active_state,i=t.color_active,s=t.color_on_active,a={type:"custom:bubble-card",card_type:"button",button_type:t.button_type,entity:t.entity,name:t.name,icon:t.icon,grid_options:{columns:12,rows:1.5},show_state:t.show_state,modules:["default"],sub_button:{main:[],bottom:[]},styles:`:host {\n  --bubble-main-background-color: \${ state === '${e}' ? '${i}' : '' } ;\n  --primary-text-color: \${ state === '${e}' ? '${s}' : '' } ;\n  --bubble-icon-color: \${ state === '${e}' ? '${s}' : '' } ;\n}`};t.tap_action&&(a.tap_action=t.tap_action),this._card=await dt(a,this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-device",name:"Materia Device",description:"A generic device/switch card with active-state colors (bubble-card wrapper)"});customElements.define("materia-lock-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"lock"}}},{name:"name",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-lock",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-lock-editor")}static getStubConfig(){return{entity:"",name:""}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await dt({type:"custom:bubble-card",card_type:"button",button_type:"switch",entity:t.entity,name:t.name,icon:"m3o:lock",modules:["device","default","conditional_icon"],conditional_icon:{icon_true:"m3o:lock",icon_false:"m3o:lock-open-right",conditions:[{condition:"state",entity_id:t.entity,state:"on"}]},sub_button:{main:[],bottom:[]},tap_action:{action:"none"}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 2}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"A lock card with conditional icons (bubble-card wrapper)"});customElements.define("materia-battery-low-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-battery-low",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-battery-low-editor")}static getStubConfig(){return{entity:"",name:""}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}async _createCard(){if(this._card)return;const t=this._config;this._card=await dt({type:"custom:bubble-card",card_type:"button",button_type:"state",entity:t.entity,name:t.name,icon:"m3o:battery-android-alert",modules:["battery"],grid_options:{columns:6,rows:"auto"},sub_button:{main:[],bottom:[]}},this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 1}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-battery-low",name:"Materia Battery Low",description:"A low battery alert card (bubble-card wrapper)"});customElements.define("materia-room-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"entity_type",selector:{select:{options:["light","cover"]}}},{name:"columns",selector:{number:{min:1,max:6}}},{name:"color_on",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-room",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",entity_type:"light",columns:2}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={columns:2,...t},this._card=null}set hass(t){this._hass=t,this._card&&(this._card.hass=t)}_buildTitleCard(){const t=this._config;return{type:"custom:bubble-card",card_type:"button",button_type:"slider",entity:t.entity,name:t.name,icon:t.icon,sub_button:{main:t.sub_button||[]},grid_options:{columns:12,rows:1.5},button_action:{tap_action:{action:"toggle"}},card_layout:"large",show_attribute:!0,show_state:!0,slider_live_update:!0,allow_light_slider_to_0:!0,attribute:t.attribute,styles:".bubble-range-value {\n  right: 40px !important;\n}\n.bubble-buttons-container {\n  margin-right: 4em;\n}\n.bubble-sub-button:last-child {\n  margin-right: 4em !important;\n}",modules:["default","light_toggle","light_dimmer"]}}_buildGridCard(){const t=this._config;return{type:"custom:layout-card",layout_type:"custom:grid-layout",layout:{"grid-template-columns":`repeat(${t.columns}, 1fr)`,"grid-row-gap":"var(--ha-section-grid-row-gap, 0px)","grid-column-gap":"var(--ha-section-grid-column-gap, 8px)",margin:"5px 0",padding:"0"},cards:t.cards||[]}}_buildCardModStyle(){const t=this._config,e=t.entity_type||"light",i=t.color_on||"";return`\n.ico, .icoclose {\n  color: {% if ${"light"===e?`states('${t.entity}') == 'on'`:`states('${t.entity}') == 'open'`} %}\n      ${i}\n  {% else %}\n    var(--primary-text-color)\n  {% endif %} !important;\n}\nha-card {\n  box-shadow: none !important;\n}`}async _createCard(){if(this._card)return;const t={type:"custom:expander-card","child-margin-top":"0.6em",padding:0,clear:!1,animation:!1,"clear-children":!1,"expander-card-background":"transparent","expander-card-background-expanded":"transparent","title-card-button-overlay":!0,"title-card-clickable":!1,"overlay-margin":"21px 4px",card_mod:{style:this._buildCardModStyle()},"title-card":this._buildTitleCard(),cards:[this._buildGridCard()]};this._card=await dt(t,this._hass),this.requestUpdate()}firstUpdated(){this._createCard()}render(){return N`<div id="card">${this._card}</div>`}getCardSize(){return 3}static get styles(){return n`
      :host {
        display: block;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"An expandable room section with title and grid of child cards (expander-card wrapper)"});customElements.define("materia-climate-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,selector:{text:{}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",selector:{entity:{domain:"sensor"}}},{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-climate",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(){return{entity:"",name:"",step:.5}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this._config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this._config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return this._entity?.attributes?.temperature}get _currentTemp(){return this._entity?.attributes?.current_temperature}get _humidity(){if(this._config.humidity_entity)return this.hass?.states[this._config.humidity_entity]?.state}get _outdoorTemp(){if(this._config.outdoor_temp_entity)return this.hass?.states[this._config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--md-sys-color-on-surface-variant)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"rgba(68,68,68,0.7)"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-surface-variant-light, #45464f)"}}_statusText(){const t=this._mode,e=this._currentTemp,i=this._humidity,s=this._outdoorTemp,a=[];if("off"===t)return null!=s&&a.push(`Outdoor · ${s}°`),null!=i&&a.push(`Humidity · ${i}%`),a.join(" · ")||"";if(null!=e&&null!=i?a.push(`${e}° now · ${i}% humidity`):null!=e?a.push(`${e}° now`):null!=i&&a.push(`${i}% humidity`),null!=s){const e=t.charAt(0).toUpperCase()+t.slice(1);a.push(`${e} · Outdoor ${s}°`)}return a.join(" · ")||""}_adjustTemp(t){const e=this._targetTemp;null!=e&&this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:e+t})}_handleTap(t){if(t.target.closest(".btn"))return;if("more-info"===(this._config.tap_action??{action:"more-info"}).action){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});return t.detail={entityId:this._config.entity},void this.dispatchEvent(t)}const e=new Event("hass-action",{bubbles:!0,composed:!0});e.detail={config:this._config,action:"tap"},this.dispatchEvent(e)}connectedCallback(){super.connectedCallback(),ct()}render(){if(!this.hass||!this._config)return N``;if(!this._entity)return N`<ha-card>
        <div class="card-content">Entity not found: ${this._config.entity}</div>
      </ha-card>`;const t="off"===this._mode,e=t?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return N`
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
          ${t?N`<div class="btn-placeholder"></div>`:N`
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

          ${t?N`<div class="btn-placeholder"></div>`:N`
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
    `}static get styles(){return n`
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
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"A native climate thermostat card with mode-based theming"});customElements.define("materia-pill-toggle-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"left_name",selector:{text:{}}},{name:"right_name",selector:{text:{}}},{name:"left_state",selector:{text:{}}},{name:"right_state",selector:{text:{}}},{name:"left_service",required:!0,selector:{text:{}}},{name:"right_service",required:!0,selector:{text:{}}},{name:"height",selector:{text:{}}},{name:"color_active",selector:{text:{}}},{name:"color_on_active",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-pill-toggle",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-pill-toggle-editor")}static getStubConfig(){return{entity:"",left_name:"On",right_name:"Off",left_state:"on",right_state:"off",left_service:"",right_service:"",height:"88px"}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.left_service)throw new Error("left_service is required");if(!t.left_service_data)throw new Error("left_service_data is required");if(!t.right_service)throw new Error("right_service is required");if(!t.right_service_data)throw new Error("right_service_data is required");this._config={left_name:"On",right_name:"Off",left_state:"on",right_state:"off",color_active:"var(--md-sys-color-primary)",color_on_active:"var(--md-sys-color-on-primary)",height:"88px",...t}}connectedCallback(){super.connectedCallback(),ct()}_callService(t,e){if(!this.hass||!t)return;const[i,s]=t.split(".");this.hass.callService(i,s,e)}_handleLeftTap(){const t=this._config;this._callService(t.left_service,t.left_service_data)}_handleRightTap(){const t=this._config;this._callService(t.right_service,t.right_service_data)}render(){if(!this.hass||!this._config)return N``;const t=this._config,e=this.hass.states[t.entity];if(!e)return N`<ha-card>Entity not found: ${t.entity}</ha-card>`;const i=e.state,s=i===t.left_state,a=i===t.right_state;return N`
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
            class="pill right ${a?"active":""}"
            style="
              --bg: ${a?t.color_active:"var(--card-background-color)"};
              --fg: ${a?t.color_on_active:"var(--primary-text-color)"};
              --bdr: ${a?`2px solid ${t.color_on_active}`:"1px solid transparent"};
            "
            @click=${this._handleRightTap}
          >
            ${t.right_name}
          </button>
        </div>
      </ha-card>
    `}getCardSize(){return 2}static get styles(){return[lt,n`
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
      `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill-toggle",name:"Materia Pill Toggle",description:"A two-option pill toggle for any entity"});customElements.define("materia-sensor-row-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"sensor"}}},{name:"name",required:!0,selector:{text:{}}},{name:"padding",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-sensor-row",class extends rt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-sensor-row-editor")}static getStubConfig(){return{entity:"",name:"",padding:"0px 20px"}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this._config={padding:"0px 20px",...t}}connectedCallback(){super.connectedCallback(),ct()}_handleTap(){if(!this.hass||!this._config.tap_action)return;const t=this._config.tap_action;switch(t.action){case"call-service":{const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{});break}case"more-info":{const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this._config.entity}});this.dispatchEvent(e);break}case"navigate":{history.pushState(null,"",t.navigation_path);const e=new CustomEvent("location-changed",{bubbles:!0,composed:!0});window.dispatchEvent(e);break}}}render(){if(!this.hass||!this._config)return N``;const t=this._config,e=this.hass.states[t.entity];if(!e)return N`<ha-card>Entity not found: ${t.entity}</ha-card>`;const i=e.state,s=e.attributes.unit_of_measurement||"",a=s?`${i} ${s}`:i,n=!!t.tap_action;return N`
      <ha-card
        class="${n?"clickable":""}"
        style="--row-padding: ${t.padding}"
        @click=${n?this._handleTap:void 0}
      >
        <div class="row">
          <span class="name">${t.name}</span>
          <span class="state">${a}</span>
        </div>
      </ha-card>
    `}getCardSize(){return 1}static get styles(){return[lt,n`
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
      `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-sensor-row",name:"Materia Sensor Row",description:"A simple name/value row for displaying sensor data"});customElements.define("materia-button-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}},{name:"variant",selector:{select:{options:[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"battery",label:"Battery"}]}}},{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",selector:{text:{}}},{name:"color",selector:{text:{}}},{name:"color_on",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});const ut={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-secondary)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-error)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]};class mt extends rt{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{name:"",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on"}}static styles=n`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state||"on";return e===String(i)||"open"===e}_getBatteryColors(t){const e=parseFloat(t?.state)||0;return e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--ha-card-background)","var(--primary-text-color)"]}render(){if(!this.hass||!this.config)return N``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=this._isActive(e),s=this.config.variant||"secondary",a=this.config.show_state;let n,r;if("battery"===s){const[t,i]=this._getBatteryColors(e);n=t,r=i}else if(i&&t)if(this.config.color_on)n=this.config.color_on,r=this.config.color?this.config.color:"var(--primary-text-color)";else{const t=ut[s]||ut.secondary;n=t[0],r=t[1]}else n="var(--ha-card-background)",r="var(--primary-text-color)";if(!a&&!t&&["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"].includes(s)){const t=ut[s]||ut.secondary;n=t[0],r=t[1]}const o=a?"with-state":"no-state",c=i?"active":"inactive";let l="";if(a&&e)if(this.config.state_display)try{l=new Function("state","hass","entity",`return ${this.config.state_display}`)(e.state,this.hass,e)}catch(t){l=e.state}else l=e.state;return N`
      <ha-card
        class="${o} ${c}"
        style="background-color: ${n}; color: ${r};"
        @click=${this._handleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this.config.icon} style="color: ${r};"></ha-icon>
        </div>
        <div class="name">${this.config.name}</div>
        ${a?N`<div class="state">${l}</div>`:""}
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action||{action:"toggle"};this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 2}}customElements.define("materia-button",mt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"Material You small button with variants, state display, and battery mode."});customElements.define("materia-select-chip-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"option",required:!0,selector:{text:{}}},{name:"label",required:!0,selector:{text:{}}},{name:"position",selector:{select:{options:[{value:"left",label:"Left"},{value:"middle",label:"Middle"},{value:"right",label:"Right"}]}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class pt extends rt{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-select-chip-editor")}static getStubConfig(){return{entity:"",option:"",label:"",position:"middle"}}static styles=n`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");if(void 0===t.option)throw new Error("option is required");if(!t.label)throw new Error("label is required");this.config=t}_isActive(){const t=this.hass?.states[this.config.entity];return t?.state===String(this.config.option)}_getBorderRadius(t){const e=this.config.position||"",i="left"===e,s="right"===e;return`${i||t?"30px":"8px"} ${s||t?"30px":"8px"} ${s||t?"30px":"8px"} ${i||t?"30px":"8px"}`}render(){if(!this.hass||!this.config)return N``;const t=this._isActive(),e=this._getBorderRadius(t);return N`
      <ha-card
        class="${t?"active":"inactive"}"
        style="border-radius: ${e};"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${"mdi:check"}></ha-icon>
        <span class="label">${this.config.label}</span>
      </ha-card>
    `}_handleTap(){this.hass.callService("select","select_option",{entity_id:this.config.entity,option:String(this.config.option)})}getCardSize(){return 1}}customElements.define("materia-select-chip",pt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-select-chip",name:"Materia Select Chip",description:"Material You select chip with active/inactive states and positional border-radius."});customElements.define("materia-checkbox-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class gt extends rt{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(){return{entity:"",name:""}}static styles=n`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}render(){if(!this.hass||!this.config)return N``;const t=this.hass.states[this.config.entity],e=this._isChecked(t),i=this.config.name??t?.attributes?.friendly_name??this.config.entity,s=e?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return N`
      <ha-card @click=${this._handleTap}>
        <div class="name">${i}</div>
        <div class="icon-cell">
          <ha-icon .icon=${s}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action||{action:"toggle"};this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-checkbox",gt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Material You checkbox row with name and toggle icon."});customElements.define("materia-circle-action-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"icon",required:!0,selector:{icon:{}}},{name:"size",selector:{select:{options:[{value:"normal",label:"Normal"},{value:"small",label:"Small"}]}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class ft extends rt{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-circle-action-editor")}static getStubConfig(){return{icon:"mdi:play",size:"normal"}}static styles=n`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");this.config={size:"normal",...t}}render(){if(!this.config)return N``;const t="small"===this.config.size?"small":"normal";return N`
      <ha-card class="size-${t}" @click=${this._handleTap}>
        <ha-icon .icon=${this.config.icon}></ha-icon>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action;t&&this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-circle-action",ft),window.customCards=window.customCards||[],window.customCards.push({type:"materia-circle-action",name:"Materia Circle Action",description:"Material You circular action button in normal (66px) or small (52px) sizes."});customElements.define("materia-tonal-button-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class _t extends rt{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-tonal-button-editor")}static getStubConfig(){return{entity:"",name:"",icon:""}}static styles=n`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config=t}render(){return this.config?N`
      <ha-card @click=${this._handleTap}>
        <div class="grid">
          <div class="icon-cell">
            <ha-icon .icon=${this.config.icon}></ha-icon>
          </div>
          <div class="name">${this.config.name}</div>
        </div>
      </ha-card>
    `:N``}_handleTap(){const t=this.config.tap_action;t&&this._handleAction(t)}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"call-service":{const[e,i]=(t.service||"").split(".",2);e&&i&&this.hass.callService(e,i,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config.entity}}))}}getCardSize(){return 1}}customElements.define("materia-tonal-button",_t),window.customCards=window.customCards||[],window.customCards.push({type:"materia-tonal-button",name:"Materia Tonal Button",description:"Material You tonal pill button with hover and active states."});customElements.define("materia-pill-badge-editor",class extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}},{name:"active_state",selector:{text:{}}}]}render(){return this.hass&&this._config?N`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:N``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class yt extends rt{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-badge-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",active_state:"on"}}static styles=n`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={active_state:"on",...t}}_isActive(){const t=this.hass?.states[this.config.entity];return t?.state===String(this.config.active_state)}render(){if(!this.hass||!this.config)return N``;const t=this._isActive();return N`
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
