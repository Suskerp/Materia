/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let o=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!r(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=n;const s=o.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){const s=this.constructor;if(!1===n&&(o=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,C=w.trustedTypes,k=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+A,z=`<${S}>`,U=document,T=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,F="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,q=/>/g,N=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),V=new WeakMap,J=U.createTreeWalker(U,129);function X(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",a=P;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===P?"!--"===c[1]?a=R:void 0!==c[1]?a=q:void 0!==c[2]?(j.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=N):void 0!==c[3]&&(a=N):a===N?">"===c[0]?(a=o??P,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?N:'"'===c[3]?L:D):a===L||a===D?a=N:a===R||a===q?a=P:(a=N,o=void 0);const d=a===N&&t[e+1].startsWith("/>")?" ":"";s+=a===P?i+z:l>=0?(n.push(r),i.slice(0,l)+E+i.slice(l)+A+d):i+A+(-2===l?e:d)}return[X(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Y{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const a=t.length-1,r=this.parts,[c,l]=W(t,e);if(this.el=Y.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=J.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(E)){const e=l[s++],i=n.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),n.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:o}),n.removeAttribute(t));if(j.test(n.tagName)){const t=n.textContent.split(A),e=t.length-1;if(e>0){n.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],T()),J.nextNode(),r.push({type:2,index:++o});n.append(t[e],T())}}}else if(8===n.nodeType)if(n.data===S)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(A,t+1));)r.push({type:7,index:o}),t+=A.length-1}o++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,n){if(e===H)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=M(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,n)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??U).importNode(e,!0);J.currentNode=n;let o=J.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new Z(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new nt(o,this,t)),this._$AV.push(e),r=i[++a]}s!==r?.index&&(o=J.nextNode(),s++)}return J.currentNode=U,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new K(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new Z(this.O(T()),this.O(T()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=G(this,t,e,0),s=!M(t)||t!==this._$AH&&t!==H,s&&(this._$AH=t);else{const n=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=G(this,n[i+a],e,a),r===H&&(r=this._$AH[a]),s||=!M(r)||r!==this._$AH[a],r===I?t=I:t!==I&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}s&&!n&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class it extends Q{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??I)===H)return;const i=this._$AH,n=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==I&&(i===I||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Y,Z),(w.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new Z(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}at._$litElement$=!0,at.finalized=!0,st.litElementHydrateSupport?.({LitElement:at});const rt=st.litElementPolyfillSupport;function ct(){if(document.querySelector("#materia-fonts"))return;const t=document.createElement("style");t.id="materia-fonts",t.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(t)}let lt;rt?.({LitElement:at}),(st.litElementVersions??=[]).push("4.2.2"),s`
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
`;class ht extends at{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"}};static styles=s`
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
  `;constructor(){super(),this.min=0,this.max=100,this.value=0,this.step=1,this.color="",this.trackColor="",this.disabled=!1,this.liveUpdate=!1,this._debounceTimer=null}get _fillColor(){return this.color||"var(--slider-color)"}get _trackColor(){return this.trackColor||"var(--slider-track-color)"}get _percentage(){const t=this.max-this.min;return 0===t?0:(this.value-this.min)/t*100}render(){const t=this._percentage,e=`linear-gradient(to right, ${this._fillColor} ${t}%, ${this._trackColor} ${t}%)`;return B`
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
    `}_onInput(t){const e=parseFloat(t.target.value);this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(e)},100))}_onChange(t){clearTimeout(this._debounceTimer);const e=parseFloat(t.target.value);this._fireValueChanged(e)}_fireValueChanged(t){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",ht);const dt=t=>class extends t{_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"toggle":this.config?.entity&&this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity});break;case"perform-action":case"call-service":{const e=t.perform_action||t.service||"",[i,n]=e.split(".",2);i&&n&&this.hass.callService(i,n,{...t.service_data,...t.data},t.target);break}case"navigate":history.pushState(null,"",t.navigation_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}));break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity||this.config?.entity}}))}}_capitalize(t){return t&&"string"==typeof t?t.charAt(0).toUpperCase()+t.slice(1):t}async _renderTemplate(t){if(!t||"string"!=typeof t)return t;if(!t.includes("{{")&&!t.includes("{%"))return t;try{const e=await this.hass.callApi("POST","template",{template:t});return"string"==typeof e?e.trim():String(e).trim()}catch{return t}}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}},pt=t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase());customElements.define("materia-light-switch-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class ut extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-light-switch-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:track-light"}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
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
      transition: background-color 0.3s ease;
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
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
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
  `;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:track-light",...t}}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e="on"===t.state,i=this.config.name||t.attributes.friendly_name||this.config.entity,n=e?this._capitalize("On"):this._capitalize("Off"),o=e?"var(--md-sys-cust-color-on-light)":"var(--primary-text-color)";return B`
      <ha-card>
        <div
          class="container"
          style="background-color: ${e?"var(--md-sys-cust-color-light)":"var(--ha-card-background, var(--card-background-color))"}; color: ${o};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${this.config.icon} style="color: ${o};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${i}</div>
            <div class="state">${n}</div>
          </div>
          ${this._hasNavigateAction?B`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}_handleTap(){this.hass.callService("light","toggle",{entity_id:this.config.entity})}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-light-switch",ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light-switch",name:"Materia Light Switch",description:"A native Lit light toggle switch card."});customElements.define("materia-light-dimmer-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class gt extends(dt(at)){static properties={hass:{attribute:!1},_config:{state:!0}};static getConfigElement(){return document.createElement("materia-light-dimmer-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:track-light"}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:track-light",...t}}get _entity(){return this.hass?.states?.[this._config?.entity]}get _isOn(){return"on"===this._entity?.state}get _brightness(){return this._entity?.attributes?.brightness??0}get _brightnessPercent(){return Math.round(this._brightness/255*100)}get _name(){return this._config.name||this._entity?.attributes?.friendly_name||""}get _icon(){return this._config.icon||"mdi:track-light"}get _stateDisplay(){return this._isOn?`${this._brightnessPercent}%`:this._capitalize("Off")}_toggleLight(){this.hass.callService("light","toggle",{entity_id:this._config.entity})}_setBrightness(t){t<=3?this.hass.callService("light","turn_off",{entity_id:this._config.entity}):this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness:t})}_getContainer(){return this.shadowRoot?.querySelector(".container")}_pctFromEvent(t){const e=this._getContainer();if(!e)return 0;const i=e.getBoundingClientRect(),n=(t.touches?t.touches[0]:t).clientX;return Math.max(0,Math.min(100,(n-i.left)/i.width*100))}_updateFillVisual(t){const e=this.shadowRoot?.querySelector(".fill");e&&(e.style.width=`${t}%`)}_onPointerDown(t){if(!t.button||0===t.button){this._startX=t.clientX,this._startY=t.clientY,this._dragging=!1,this._scrollIntent=!1;try{t.currentTarget.setPointerCapture(t.pointerId)}catch(t){}this._onMoveRef=this._onPointerMove.bind(this),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointermove",this._onMoveRef),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)}}_onPointerMove(t){if(null==this._startX||this._scrollIntent)return;const e=Math.abs(t.clientX-this._startX),i=Math.abs(t.clientY-this._startY);if(!this._dragging&&i>10&&e<4)return this._scrollIntent=!0,void this._cleanup(t);if(!this._dragging&&e>4&&e>=i&&(this._dragging=!0),this._dragging){t.preventDefault();const e=this._pctFromEvent(t);this._updateFillVisual(e),this._throttleTimer||(this._throttleTimer=setTimeout(()=>{this._throttleTimer=null;const t=Math.round(e/100*255);this._setBrightness(t)},200))}}_onPointerUp(t){if(null!=this._startX){if(this._dragging||this._scrollIntent){if(this._dragging){const e=this._pctFromEvent(t),i=Math.round(e/100*255);this._setBrightness(i)}}else this._toggleLight();this._cleanup(t)}}_cleanup(t){this._startX=null,this._dragging=!1,this._scrollIntent=!1,clearTimeout(this._throttleTimer),this._throttleTimer=null;try{const e=this._getContainer();e&&null!=t?.pointerId&&e.releasePointerCapture(t.pointerId)}catch(t){}this._onMoveRef&&(window.removeEventListener("pointermove",this._onMoveRef),window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onMoveRef=null,this._onUpRef=null)}render(){if(!this._config||!this.hass)return B``;const t=this._isOn,e=this._brightnessPercent;return B`
      <ha-card>
        <div class="container"
          style="background-color: ${t?"var(--md-sys-cust-color-light-container)":"var(--ha-card-background, var(--card-background-color))"}; color: ${t?"var(--md-sys-cust-color-on-light)":"var(--primary-text-color)"};"
          @pointerdown=${this._onPointerDown}
        >
          <div
            class="fill"
            style="width: ${t?e:0}%; background-color: var(--md-sys-cust-color-light); opacity: 1;"
          ></div>
          <div class="icon-container">
            <ha-icon .icon=${this._icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${this._name}</div>
            <div class="state">${this._stateDisplay}</div>
          </div>
          ${this._hasNavigateAction?B`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}getCardSize(){return 2}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
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
      transition: background-color 0.3s ease;
      cursor: pointer;
      touch-action: none;
    }
    .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      transition: width 0.3s ease;
      z-index: 0;
      border-radius: 28px 0 0 28px;
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
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
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
  `}customElements.define("materia-light-dimmer",gt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-light-dimmer",name:"Materia Light Dimmer",description:"A dimmable light slider card"});customElements.define("materia-cover-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"cover"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"show_stop",selector:{boolean:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class mt extends(dt(at)){static properties={hass:{attribute:!1},_config:{state:!0}};static getConfigElement(){return document.createElement("materia-cover-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:window-shutter",show_stop:!0}}setConfig(t){if(!t.entity)throw new Error("entity is required");this._config={icon:"mdi:window-shutter",show_stop:!0,...t}}get _entity(){return this.hass?.states?.[this._config?.entity]}get _isOpen(){return"closed"!==this._entity?.state}get _position(){return this._entity?.attributes?.current_position??0}get _name(){return this._config.name||this._entity?.attributes?.friendly_name||""}get _icon(){return this._config.icon||"mdi:window-shutter"}get _stateDisplay(){const t=this._position;return 0===t?this._capitalize("Closed"):100===t?this._capitalize("Open"):`${t}% ${this._capitalize("open")}`}_onRangeInput(t){const e=parseInt(t.target.value,10);this.hass.callService("cover","set_cover_position",{entity_id:this._config.entity,position:e})}_openCover(t){t.stopPropagation(),this.hass.callService("cover","open_cover",{entity_id:this._config.entity})}_stopCover(t){t.stopPropagation(),this.hass.callService("cover","stop_cover",{entity_id:this._config.entity})}_closeCover(t){t.stopPropagation(),this.hass.callService("cover","close_cover",{entity_id:this._config.entity})}render(){if(!this._config||!this.hass)return B``;const t=this._isOpen,e=this._position;return B`
      <ha-card>
        <div class="container">
          <div
            class="fill"
            style="width: ${e}%; background-color: ${t?"var(--md-sys-cust-color-light)":"transparent"}; opacity: 0.5;"
          ></div>
          <div class="icon-container">
            <ha-icon .icon=${this._icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${this._name}</div>
            <div class="state">${this._stateDisplay}</div>
          </div>
          ${this._hasNavigateAction?B`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
          <div class="sub-buttons">
            <button class="sub-btn" @click=${this._openCover}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            ${this._config.show_stop?B`
                  <button class="sub-btn" @click=${this._stopCover}>
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>
                `:I}
            <button class="sub-btn" @click=${this._closeCover}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
          </div>
          <input
            type="range"
            class="range-input"
            min="0"
            max="100"
            .value=${String(e)}
            @change=${this._onRangeInput}
          />
        </div>
      </ha-card>
    `}getCardSize(){return 2}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
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
      transition: background-color 0.3s ease;
      cursor: pointer;
    }
    .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      transition: width 0.3s ease;
      z-index: 0;
      border-radius: 28px 0 0 28px;
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
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
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
  `}customElements.define("materia-cover",mt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-cover",name:"Materia Cover",description:"A cover card with position slider and up/stop/down controls"});customElements.define("materia-device-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"button_type",selector:{select:{options:["switch","state"]}}},{name:"active_state",selector:{text:{}}},{name:"color_active",selector:{text:{}}},{name:"color_on_active",selector:{text:{}}},{name:"show_state",selector:{boolean:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});const ft={light:"on",switch:"on",fan:"on",vacuum:"cleaning",lock:"locked",cover:"open",binary_sensor:"on",climate:"heat",media_player:"playing",input_boolean:"on"};class vt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-device-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:power-plug",button_type:"switch",active_state:"on",show_state:!0}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
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
      transition: background-color 0.3s ease;
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
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
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
  `;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:power-plug",button_type:"switch",color_active:"var(--md-sys-cust-color-device)",color_on_active:"var(--md-sys-cust-color-on-device)",show_state:!0,...t}}_getActiveState(){if(this.config.active_state)return String(this.config.active_state);const t=(this.config.entity||"").split(".")[0];return ft[t]||"on"}_isActive(t){if(!t)return!1;const e=this._getActiveState();return t.state===e}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e=this._isActive(t),i=this.config.name||t.attributes.friendly_name||this.config.entity,n=this.config.icon,o=this.config.color_active,s=this.config.color_on_active,a=e?s:"var(--primary-text-color)";return B`
      <ha-card>
        <div
          class="container"
          style="background-color: ${e?o:"var(--ha-card-background, var(--card-background-color))"}; color: ${a};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${n} style="color: ${a};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${i}</div>
            ${this.config.show_state?B`<div class="state">${this._capitalize(t.state)}</div>`:""}
          </div>
          ${this._hasNavigateAction?B`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity})}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-device",vt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-device",name:"Materia Device",description:"A native Lit generic device/switch card with active-state colors."});customElements.define("materia-lock-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"lock"}}},{name:"name",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class _t extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-lock-editor")}static getStubConfig(){return{entity:"",name:""}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
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
      transition: background-color 0.3s ease;
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
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
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
  `;setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e="locked"===t.state,i=this.config.name||t.attributes.friendly_name||this.config.entity,n=e?"m3o:lock":"m3o:lock-open-right",o=this._capitalize(t.state),s=e?"var(--md-sys-cust-color-on-device)":"var(--primary-text-color)";return B`
      <ha-card>
        <div
          class="container"
          style="background-color: ${e?"var(--md-sys-cust-color-device-container)":"var(--ha-card-background, var(--card-background-color))"}; color: ${s};"
        >
          <div class="icon-container">
            <ha-icon .icon=${n} style="color: ${s};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${i}</div>
            <div class="state">${o}</div>
          </div>
          ${this._hasNavigateAction?B`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-lock",_t),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"A native Lit lock display card with conditional icons."});customElements.define("materia-room-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"entity_type",selector:{select:{options:["light","cover"]}}},{name:"columns",selector:{number:{min:1,max:6}}},{name:"color_on",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class yt extends at{static properties={_config:{state:!0},_expanded:{state:!0},_childCards:{state:!0}};constructor(){super(),this._expanded=!1,this._childCards=null,this._hass=null}static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",entity_type:"light",columns:2}}setConfig(t){if(!t.entity)throw new Error("entity is required");const e=this._config?.cards;this._config={columns:2,...t};const i=this._config.cards;JSON.stringify(e)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}set hass(t){this._hass=t,this._childCards&&this._childCards.forEach(e=>e.hass=t),this.requestUpdate()}get hass(){return this._hass}firstUpdated(){this._createChildCards()}async _createChildCards(){const t=this._config?.cards;if(!t||0===t.length)return void(this._childCards=[]);const e=await async function(){return lt||(lt=await window.loadCardHelpers(),lt)}();this._childCards=await Promise.all(t.map(async t=>{const i=await e.createCardElement(t);return this._hass&&(i.hass=this._hass),i})),this.requestUpdate()}_toggleExpand(){this._expanded=!this._expanded}_toggleEntity(t){if(t.stopPropagation(),!this._hass||!this._config.entity)return;const e="cover"===(this._config.entity_type||"light")?"cover":"light";this._hass.callService(e,"toggle",{entity_id:this._config.entity})}get _isActive(){if(!this._hass||!this._config.entity)return!1;const t=this._hass.states[this._config.entity];if(!t)return!1;return"cover"===(this._config.entity_type||"light")?"open"===t.state:"on"===t.state}get _stateDisplay(){if(!this._hass||!this._config.entity)return"";const t=this._hass.states[this._config.entity];if(!t)return"unavailable";if(this._config.attribute){const e=t.attributes[this._config.attribute];return null==e?t.state:"brightness"===this._config.attribute?`${Math.round(e/255*100)}%`:String(e)}return this._hass.formatEntityState?this._hass.formatEntityState(t):t.state}render(){if(!this._config)return B``;const t=this._isActive,e=t&&this._config.color_on?this._config.color_on:t?"var(--md-sys-color-primary)":"var(--primary-text-color)",i=this._config.columns||2;return B`
      <ha-card>
        <div class="title-row" @click=${this._toggleExpand}>
          <div class="title-left">
            <ha-icon
              class="entity-icon"
              .icon=${this._config.icon||"mdi:home"}
              style="color: ${e}"
              @click=${this._toggleEntity}
            ></ha-icon>
            <div class="info">
              <div class="name">${this._config.name||""}</div>
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
            <div class="grid" style="--room-columns: ${i}">
              ${this._childCards?.map(t=>B`<div class="grid-item">${t}</div>`)}
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderSubButtons(){const t=this._config.sub_button;return t&&Array.isArray(t)&&0!==t.length?t.map(t=>B`
        <ha-icon
          class="sub-btn"
          .icon=${t.icon||"mdi:dots-vertical"}
          @click=${e=>{e.stopPropagation(),t.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity}}))}}
        ></ha-icon>
      `):B``}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 18px;
      overflow: hidden;
      padding: 0;
      box-shadow: none;
    }

    /* ── Title row ────────────────────────────────────────────── */

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

    /* ── Chevron ──────────────────────────────────────────────── */

    .chevron {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: transform 0.3s ease;
    }

    .chevron.rotated {
      transform: rotate(180deg);
    }

    /* ── Collapsible container (CSS-only animation) ───────────── */

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

    /* ── Child card grid ──────────────────────────────────────── */

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--room-columns, 2), 1fr);
      gap: 8px;
      padding: 4px 16px 16px;
    }

    .grid-item {
      min-width: 0;
    }
  `}customElements.define("materia-room",yt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"A native expandable room section with title and grid of child cards"});customElements.define("materia-climate-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,selector:{text:{}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",selector:{entity:{domain:"sensor"}}},{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.name.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});customElements.define("materia-climate",class extends at{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(){return{entity:"",name:"",step:.5}}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this._config={step:.5,...t}}getCardSize(){return 3}get _entity(){return this.hass?.states[this._config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return this._entity?.attributes?.temperature}get _currentTemp(){return this._entity?.attributes?.current_temperature}get _humidity(){if(this._config.humidity_entity)return this.hass?.states[this._config.humidity_entity]?.state}get _outdoorTemp(){if(this._config.outdoor_temp_entity)return this.hass?.states[this._config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-variant)"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--md-sys-color-on-surface-variant)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"rgba(68,68,68,0.7)"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-surface-variant-light, #45464f)"}}_statusText(){const t=this._mode,e=this._currentTemp,i=this._humidity,n=this._outdoorTemp,o=[];if("off"===t)return null!=n&&o.push(`Outdoor · ${n}°`),null!=i&&o.push(`Humidity · ${i}%`),o.join(" · ")||"";if(null!=e&&null!=i?o.push(`${e}° now · ${i}% humidity`):null!=e?o.push(`${e}° now`):null!=i&&o.push(`${i}% humidity`),null!=n){const e=t.charAt(0).toUpperCase()+t.slice(1);o.push(`${e} · Outdoor ${n}°`)}return o.join(" · ")||""}_adjustTemp(t){const e=this._targetTemp;null!=e&&this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:e+t})}_handleTap(t){if(t.target.closest(".btn"))return;if("more-info"===(this._config.tap_action??{action:"more-info"}).action){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});return t.detail={entityId:this._config.entity},void this.dispatchEvent(t)}const e=new Event("hass-action",{bubbles:!0,composed:!0});e.detail={config:this._config,action:"tap"},this.dispatchEvent(e)}connectedCallback(){super.connectedCallback(),ct()}render(){if(!this.hass||!this._config)return B``;if(!this._entity)return B`<ha-card>
        <div class="card-content">Entity not found: ${this._config.entity}</div>
      </ha-card>`;const t="off"===this._mode,e=t?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return B`
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
          <div class="center-side">
            ${t?I:B`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${t=>{t.stopPropagation(),this._adjustTemp(-this._config.step)}}
                  >
                    <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>

          <span class="temp ${t?"off":""}">${e}</span>

          <div class="center-side">
            ${t?I:B`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${t=>{t.stopPropagation(),this._adjustTemp(this._config.step)}}
                  >
                    <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>
        </div>

        <!-- Status -->
        <div class="status" style="color: ${this._modeColor()};">
          ${this._statusText()}
        </div>
      </ha-card>
    `}static get styles(){return s`
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

      /* ── status ── */
      .status {
        font-size: 15px;
        padding-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        width: 100%;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"A native climate thermostat card with mode-based theming"});customElements.define("materia-sensor-row-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"sensor"}}},{name:"name",required:!0,selector:{text:{}}},{name:"padding",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class bt extends(dt(at)){static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("materia-sensor-row-editor")}static getStubConfig(){return{entity:"",name:"",padding:"0px 20px"}}get config(){return this._config}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.name)throw new Error("name is required");this._config={padding:"0px 20px",...t}}connectedCallback(){super.connectedCallback(),ct()}_handleTap(){this.hass&&this._config.tap_action&&this._handleAction(this._config.tap_action)}render(){if(!this.hass||!this._config)return B``;const t=this._config,e=this.hass.states[t.entity];if(!e)return B`<ha-card>Entity not found: ${t.entity}</ha-card>`;const i=e.state,n=e.attributes.unit_of_measurement||"",o=n?`${this._capitalize(i)} ${n}`:this._capitalize(i),s=!!t.tap_action;return B`
      <ha-card
        class="${s?"clickable":""}"
        @click=${s?this._handleTap:void 0}
      >
        <div class="container" style="--row-padding: ${t.padding}">
          <span class="name">${t.name}</span>
          <span class="value">${o}</span>
          ${this._hasNavigateAction?B`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          `:""}
        </div>
      </ha-card>
    `}getCardSize(){return 1}static get styles(){return s`
      :host {
        display: block;
        font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
      }
      ha-card {
        background: none;
        box-shadow: none;
        border: none;
        overflow: visible;
      }
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
    `}}customElements.define("materia-sensor-row",bt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-sensor-row",name:"Materia Sensor Row",description:"A simple name/value row for displaying sensor data"});const xt={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"};customElements.define("materia-weather-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",selector:{text:{}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class wt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(){return{entity:""}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      padding: 8px 0;
      font-family: inherit;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    ha-icon {
      --mdc-icon-size: 32px;
      flex-shrink: 0;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .temp {
      font-size: 24px;
      font-weight: 500;
    }
    .condition {
      font-size: 13px;
      opacity: 0.7;
      text-transform: capitalize;
    }
    .details {
      font-size: 13px;
      opacity: 0.7;
      margin-left: auto;
      text-align: right;
      flex-shrink: 0;
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e=t.state,i=t.attributes.temperature,n=t.attributes.temperature_unit||"°",o=xt[e]||"mdi:weather-partly-cloudy";let s=null;if(this.config.humidity_entity){const t=this.hass.states[this.config.humidity_entity];t&&(s=t.state)}null==s&&null!=t.attributes.humidity&&(s=t.attributes.humidity);const a=e.replace(/-|_/g," ");return B`
      <ha-card @click=${this._handleTap}>
        <div class="row">
          <ha-icon .icon=${o}></ha-icon>
          <div class="info">
            <div class="temp">${null!=i?`${i}${n}`:"—"}</div>
            <div class="condition">${a}</div>
          </div>
          ${null!=s?B`<div class="details">${s}%<br />humidity</div>`:""}
        </div>
      </ha-card>
    `}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-weather",wt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather display card with condition icons and humidity."});customElements.define("materia-sensor-display-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"unit",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class $t extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-sensor-display-editor")}static getStubConfig(){return{entity:"",name:"",icon:""}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      padding: 8px 0;
      font-family: inherit;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 16px;
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
    .value {
      font-size: 20px;
      font-weight: 500;
    }
    .unit {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.7;
      margin-left: 4px;
    }
    .classification {
      font-size: 13px;
      font-weight: 500;
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}_classify(t){const e=this.config.ranges||[],i=parseFloat(t);for(const t of e)if(null==t.max||i<=t.max)return{label:t.label,color:t.color};return{label:"",color:""}}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e=t.state,i=this.config.name||t.attributes.friendly_name||this.config.entity,n=this.config.icon||t.attributes.icon||"",o=this.config.unit||t.attributes.unit_of_measurement||"",s=this._classify(e);return B`
      <ha-card @click=${this._handleTap}>
        <div class="row">
          ${n?B`<ha-icon .icon=${n}></ha-icon>`:""}
          <div class="info">
            <div class="value">
              ${e}${o?B`<span class="unit">${o}</span>`:""}
            </div>
            ${s.label?B`<div class="classification" style="color: ${s.color||"inherit"}">${s.label}</div>`:B`<div class="classification">${i}</div>`}
          </div>
        </div>
      </ha-card>
    `}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-sensor-display",$t),window.customCards=window.customCards||[],window.customCards.push({type:"materia-sensor-display",name:"Materia Sensor Display",description:"Sensor display with range-to-label classification (AQI, etc.)."});class Ct extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=s`
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
  `;setConfig(t){this._config=t}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}},{name:"variant",selector:{select:{options:[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"battery",label:"Battery"}]}}},{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",selector:{template:{}}},{name:"color",selector:{text:{}}},{name:"color_on",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="yaml-label">Color map (JSON, state &rarr; color)</div>
      <textarea
        .value=${this._config.color_map?JSON.stringify(this._config.color_map,null,2):""}
        @change=${this._colorMapChanged}
      ></textarea>

      <div class="yaml-label">Color on map (JSON, state &rarr; text color)</div>
      <textarea
        .value=${this._config.color_on_map?JSON.stringify(this._config.color_on_map,null,2):""}
        @change=${this._colorOnMapChanged}
      ></textarea>
    `:B``}_valueChanged(t){const e={...this._config,...t.detail.value,color_map:this._config.color_map,color_on_map:this._config.color_on_map};this._fireConfig(e)}_colorMapChanged(t){const e=t.target.value.trim();if(!e){const{color_map:t,...e}=this._config;return void this._fireConfig(e)}try{const t=JSON.parse(e);this._fireConfig({...this._config,color_map:t})}catch(t){}}_colorOnMapChanged(t){const e=t.target.value.trim();if(!e){const{color_on_map:t,...e}=this._config;return void this._fireConfig(e)}try{const t=JSON.parse(e);this._fireConfig({...this._config,color_on_map:t})}catch(t){}}_fireConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-button-editor",Ct);const kt={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-secondary)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-error)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]};class Et extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0}};static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{name:"",icon:"mdi:power-plug",variant:"primary",show_state:!1,active_state:"on"}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={show_state:!1,active_state:"on",variant:"secondary",tap_action:{action:"toggle"},...t}}updated(t){super.updated?.(t);const e=this.config?.state_display;t.has("hass")&&e&&(e.includes("{{")||e.includes("{%"))&&this._renderTemplate(this.config.state_display).then(t=>{t!==this._resolvedStateDisplay&&(this._resolvedStateDisplay=t)})}_isActive(t){if(!t)return!1;const e=t.state,i=this.config.active_state||"on";return e===String(i)||"open"===e}_getBatteryColors(t){const e=parseFloat(t?.state)||0;return e<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:e<20?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--ha-card-background)","var(--primary-text-color)"]}render(){if(!this.hass||!this.config)return B``;const t=this.config.entity,e=t?this.hass.states[t]:void 0,i=this._isActive(e),n=this.config.variant||"secondary",o=this.config.show_state;let s,a;const r=this._parseMap(this.config.color_map),c=this._parseMap(this.config.color_on_map);if(r&&e){const t=e.state,i=r[t]??r[String(t)]??r._default;if(void 0!==i){s=i;a=c?.[t]??c?.[String(t)]??c?._default??"var(--primary-text-color)"}}if(void 0===s&&"battery"===n){const[t,i]=this._getBatteryColors(e);s=t,a=i}else if(void 0===s&&i&&t)if(this.config.color_on)s=this.config.color_on,a=this.config.color?this.config.color:"var(--primary-text-color)";else{const t=kt[n]||kt.secondary;s=t[0],a=t[1]}else void 0===s&&(s="var(--ha-card-background)",a="var(--primary-text-color)");if(!o&&!t&&["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"].includes(n)){const t=kt[n]||kt.secondary;s=t[0],a=t[1]}const l=o?"with-state":"no-state",h=i?"active":"inactive";let d="";if(o&&e){const t=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));d=this._resolvedStateDisplay&&t?this._resolvedStateDisplay:this.config.state_display&&!t?this.config.state_display:e.state,d=this._capitalize(d)}return B`
      <ha-card
        class="${l} ${h}"
        style="background-color: ${s}; color: ${a};"
        @click=${this._handleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this.config.icon} style="color: ${a};"></ha-icon>
        </div>
        <div class="name">${this.config.name}</div>
        ${o?B`<div class="state">${d}</div>`:""}
      </ha-card>
    `}_parseMap(t){if(!t)return null;if("object"==typeof t)return t;try{return JSON.parse(t)}catch(t){return null}}_handleTap(){const t=this.config.tap_action||{action:"toggle"};this._handleAction(t)}getCardSize(){return 2}}customElements.define("materia-button",Et),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"Material You small button with variants, state display, and battery mode."});const At={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device)",onActive:"var(--md-sys-cust-color-on-device)"}},St={xs:{height:32,innerCorner:4},s:{height:40,innerCorner:8},m:{height:48,innerCorner:8},l:{height:56,innerCorner:16},xl:{height:64,innerCorner:20}};class zt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config={...t}}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",selector:{select:{options:[{value:"",label:"None"},...Object.keys(At).map(t=>({value:t,label:t}))],mode:"dropdown"}}},{name:"size",selector:{select:{options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (40dp)"},{value:"m",label:"M (48dp)"},{value:"l",label:"L (56dp)"},{value:"xl",label:"XL (64dp)"}],mode:"dropdown"}}},{name:"variant",selector:{select:{options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"outlined",label:"Outlined"},{value:"elevated",label:"Elevated"}],mode:"dropdown"}}},{name:"color_active",selector:{text:{}}},{name:"color_on_active",selector:{text:{}}}]}static styles=s`
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
  `;render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options||[]).map((t,e)=>B`
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
            ${this._expanded===e?B`
                  <div class="option-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${t}
                      .schema=${this._optionSchema}
                      .computeLabel=${pt}
                      @value-changed=${t=>this._updateOptionForm(e,t.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `:B``}_expanded=null;get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}_updateOptionForm(t,e){const i=[...this._config.options||[]];i[t]={...i[t],...e};const n={...this._config,options:i};this._config=n,this._fireConfigChanged(n)}_toggleExpand(t){this._expanded=this._expanded===t?null:t,this.requestUpdate()}_valueChanged(t){const e={...this._config,...t.detail.value};this._config=e,this._fireConfigChanged(e)}_addOption(){const t=[...this._config.options||[],{label:"",value:"",icon:""}],e={...this._config,options:t};this._config=e,this._expanded=t.length-1,this._fireConfigChanged(e)}_removeOption(t){const e=[...this._config.options||[]];e.splice(t,1);const i={...this._config,options:e};this._config=i,this._expanded===t&&(this._expanded=null),this._fireConfigChanged(i)}_moveOption(t,e){const i=[...this._config.options||[]],n=t+e;if(n<0||n>=i.length)return;[i[t],i[n]]=[i[n],i[t]];const o={...this._config,options:i};this._config=o,this._expanded===t&&(this._expanded=n),this._fireConfigChanged(o)}_updateOption(t,e,i){const n=[...this._config.options||[]];n[t]={...n[t],[e]:i};const o={...this._config,options:n};this._config=o,this._fireConfigChanged(o)}_fireConfigChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-button-group-editor",zt);class Ut extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(){return{entity:"",size:"m",options:[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      background: none;
      box-shadow: none;
      border: none;
    }

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
      transition: border-radius 0.2s ease, background-color 0.2s ease, color 0.2s ease;
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

    /* ── Variant: filled (default) ── */
    button.inactive.filled {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
    }

    /* ── Variant: tonal ── */
    button.inactive.tonal {
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    /* ── Variant: outlined ── */
    button.inactive.outlined {
      background: transparent;
      color: var(--primary-text-color);
      border: 1px solid var(--md-sys-color-outline, rgba(0,0,0,0.12));
    }

    /* ── Variant: elevated ── */
    button.inactive.elevated {
      background: var(--md-sys-color-surface, var(--ha-card-background));
      color: var(--primary-text-color);
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `;constructor(){super(),ct()}setConfig(t){if(!t.options||!Array.isArray(t.options)||0===t.options.length)throw new Error("At least one option is required");this.config={size:"m",...t}}get _activeValue(){const t=this.hass?.states[this.config.entity];return this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):t?.state??""}_getActiveColors(){return this.config.color_active&&this.config.color_on_active?{active:this.config.color_active,onActive:this.config.color_on_active}:this.config.preset&&At[this.config.preset]?At[this.config.preset]:At.primary}render(){if(!this.hass||!this.config)return B``;const t=this.config.size||"m",{height:e,innerCorner:i}=St[t]||St.m,n=e/2,o=this._activeValue,s=this._getActiveColors(),a=this.config.options,r=this.config.variant||"filled";return B`
      <ha-card>
        <div class="group" style="height: ${e}px;">
          ${a.map((t,e)=>{const c=String(t.value)===o,l=0===e,h=e===a.length-1,d=c?`${n}px`:`${i}px`,p=`${n}px`;let u;u=1===a.length?p:l?`${p} ${d} ${d} ${p}`:h?`${d} ${p} ${p} ${d}`:d;const g=c?s.active:void 0,m=c?s.onActive:void 0;return B`
              <button
                class="${c?"active":"inactive"} ${r}"
                style="border-radius: ${u};${c?` background: ${g}; color: ${m};`:""}"
                @click=${()=>this._handleOptionTap(t)}
              >
                ${t.icon?B`<ha-icon .icon=${t.icon}></ha-icon>`:""}
                ${t.label?B`<span>${t.label}</span>`:""}
              </button>
            `})}
        </div>
      </ha-card>
    `}_handleOptionTap(t){t.tap_action?this._handleAction(t.tap_action):this.config.entity&&this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-button-group",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 connected button group with presets and sizes."});class Tt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=s`
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
  `;setConfig(t){this._config=t}get _schema(){return[{name:"icon",required:!0,selector:{icon:{}}},{name:"variant",selector:{select:{options:[{value:"standard",label:"Standard"},{value:"outlined",label:"Outlined"},{value:"filled",label:"Filled"},{value:"filled-tonal",label:"Filled Tonal"}]}}},{name:"size",selector:{select:{options:[{value:"default",label:"Default (48px)"},{value:"large",label:"Large (56px)"}]}}},{name:"entity",selector:{entity:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
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
    `:B``}_valueChanged(t){const e={...this._config,...t.detail.value,icon_map:this._config.icon_map,tap_action:this._config.tap_action};this._fireConfig(e)}_iconMapChanged(t){const e=t.target.value.trim();if(!e){const{icon_map:t,...e}=this._config;return void this._fireConfig(e)}try{const t=JSON.parse(e);this._fireConfig({...this._config,icon_map:t})}catch(t){}}_tapActionChanged(t){const e=t.target.value.trim();if(!e){const{tap_action:t,...e}=this._config;return void this._fireConfig(e)}try{const t=JSON.parse(e);this._fireConfig({...this._config,tap_action:t})}catch(t){}}_fireConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}customElements.define("materia-icon-button-editor",Tt);class Mt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-icon-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"default"}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

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

    /* ── Sizes ── */
    ha-card.size-default { width: 48px; height: 48px; }
    ha-card.size-large   { width: 56px; height: 56px; }

    /* ── Variants ── */
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

    /* ── M3 state layer ── */
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");this.config={variant:"filled",size:"default",...t}}_resolveIcon(){if(!this.config.icon_map||!this.config.entity)return this.config.icon;const t=this.hass?.states[this.config.entity]?.state;return this.config.icon_map[t]??this.config.icon_map.default??this.config.icon}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}render(){if(!this.config)return B``;const t=this.config.variant||"filled",e="large"===this.config.size?"large":"default",i=this._resolveIcon();return B`
      <ha-card
        class="${t} size-${e}"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${i}></ha-icon>
      </ha-card>
    `}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const t=this.hass?.states[this.config.entity]?.state,e=this.config.tap_action_map[t]??this.config.tap_action_map.default;if(e)return e}return this.config.tap_action||this._defaultTapAction()}_handleTap(){this._handleAction(this._resolveTapAction())}getCardSize(){return 1}}customElements.define("materia-icon-button",Mt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-icon-button",name:"Materia Icon Button",description:"M3 icon button with variants"});customElements.define("materia-checkbox-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class Ot extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(){return{entity:"",name:""}}static styles=s`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...t}}_isChecked(t){if(this.config.checked_entity){const t=this.hass?.states[this.config.checked_entity];if(!t)return!1;const e=String(t.state??"").split(",").map(t=>t.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(t=>e.includes(t)):!!this.config.checked_value&&e.includes(this.config.checked_value)}if(!t)return!1;const e=String(t.state??"").toLowerCase(),i=Number(e);return"on"===e||"true"===e||"home"===e||!Number.isNaN(i)&&i>0}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity],e=this._isChecked(t),i=this.config.name??t?.attributes?.friendly_name??this.config.entity,n=e?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return B`
      <ha-card @click=${this._handleTap}>
        <div class="name">${i}</div>
        <div class="icon-cell">
          <ha-icon .icon=${n}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const t=this.hass?.states[this.config.entity],e=this._isChecked(t);let i;i=e&&this.config.tap_action_checked?this.config.tap_action_checked:!e&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",Ot),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Material You checkbox row with name and toggle icon."});customElements.define("materia-circle-action-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"icon",required:!0,selector:{icon:{}}},{name:"size",selector:{select:{options:[{value:"normal",label:"Normal"},{value:"small",label:"Small"}]}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class Ft extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-circle-action-editor")}static getStubConfig(){return{icon:"mdi:play",size:"normal"}}static styles=s`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");this.config={size:"normal",...t}}render(){if(!this.config)return B``;const t="small"===this.config.size?"small":"normal";return B`
      <ha-card class="size-${t}" @click=${this._handleTap}>
        <ha-icon .icon=${this.config.icon}></ha-icon>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action;t&&this._handleAction(t)}getCardSize(){return 1}}customElements.define("materia-circle-action",Ft),window.customCards=window.customCards||[],window.customCards.push({type:"materia-circle-action",name:"Materia Circle Action",description:"Material You circular action button in normal (66px) or small (52px) sizes."});customElements.define("materia-tonal-button-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class Pt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-tonal-button-editor")}static getStubConfig(){return{entity:"",name:"",icon:""}}static styles=s`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config=t}render(){return this.config?B`
      <ha-card @click=${this._handleTap}>
        <div class="grid">
          <div class="icon-cell">
            <ha-icon .icon=${this.config.icon}></ha-icon>
          </div>
          <div class="name">${this.config.name}</div>
        </div>
      </ha-card>
    `:B``}_handleTap(){const t=this.config.tap_action;t&&this._handleAction(t)}getCardSize(){return 1}}customElements.define("materia-tonal-button",Pt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-tonal-button",name:"Materia Tonal Button",description:"Material You tonal pill button with hover and active states."});customElements.define("materia-pill-badge-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",required:!0,selector:{text:{}}},{name:"icon",required:!0,selector:{icon:{}}},{name:"active_state",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class Rt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-badge-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",active_state:"on"}}static styles=s`
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");if(!t.icon)throw new Error("icon is required");if(!t.name)throw new Error("name is required");this.config={active_state:"on",...t}}_isActive(){const t=this.hass?.states[this.config.entity];return t?.state===String(this.config.active_state)}render(){if(!this.hass||!this.config)return B``;const t=this._isActive();return B`
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
    `}_handleTap(){const t=this.config.tap_action;t?this._handleAction(t):this.config.entity&&this._fireMoreInfo(this.config.entity)}getCardSize(){return 1}}customElements.define("materia-pill-badge",Rt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill-badge",name:"Materia Pill Badge",description:"Material You pill badge card with active state highlighting."});class qt extends at{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=s`
    :host { display: block; }
  `;setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"color",selector:{template:{}}},{name:"color_on",selector:{template:{}}},{name:"tap_action",type:"expandable",schema:[{name:"action",selector:{select:{options:[{value:"none",label:"None"},{value:"more-info",label:"More info"},{value:"navigate",label:"Navigate"},{value:"toggle",label:"Toggle"},{value:"call-service",label:"Call service"}]}}},{name:"navigation_path",selector:{text:{}}}]}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){this._config=t.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}}customElements.define("materia-pill-editor",qt);class Nt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(){return{entity:"",name:"",icon:"mdi:information-outline"}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...t}}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e=this.config.name||t.attributes.friendly_name||this.config.entity,i=this.config.icon,n=t.attributes.unit_of_measurement||"",o=n?`${this._capitalize(t.state)} ${n}`:this._capitalize(t.state),s=this.config.color||"var(--ha-card-background, var(--card-background-color))",a=this.config.color_on||"var(--primary-text-color)";return B`
      <ha-card>
        <div
          class="container"
          style="background-color: ${s}; color: ${a};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${i} style="color: ${a};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${e}</div>
            <div class="state">${o}</div>
          </div>
          ${this._hasNavigateAction?B` <ha-icon
                class="chevron"
                icon="mdi:chevron-right"
              ></ha-icon>`:""}
        </div>
      </ha-card>
    `}_handleTap(){const t=this.config.tap_action||{action:"more-info"};this._handleAction(t)}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",Nt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill card with configurable icon, name, state, and colors."});customElements.define("materia-separator-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"label",selector:{text:{}}},{name:"color",selector:{text:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class Dt extends at{static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-separator-editor")}static getStubConfig(){return{label:""}}static styles=s`
    :host {
      display: block;
      padding: 8px 0;
    }
    .separator {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .line {
      flex: 1;
      height: 1px;
      background: var(--separator-color, var(--md-sys-color-outline-variant));
    }
    .label {
      font-size: 12px;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      white-space: nowrap;
    }
  `;setConfig(t){this.config={...t}}render(){if(!this.config)return B``;const t=this.config.color||"",e=t?`--separator-color: ${t}`:"",i=this.config.label;return i?B`
      <div class="separator" style="${e}">
        <div class="line"></div>
        <span class="label">${i}</span>
        <div class="line"></div>
      </div>
    `:B`<div class="separator" style="${e}"><div class="line"></div></div>`}getCardSize(){return 1}}customElements.define("materia-separator",Dt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-separator",name:"Materia Separator",description:"Simple horizontal line divider with optional label."});customElements.define("materia-select-editor",class extends at{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config=t}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${pt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:B``}_valueChanged(t){const e=t.detail.value;this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}});class Lt extends(dt(at)){static properties={hass:{attribute:!1},config:{state:!0}};static getConfigElement(){return document.createElement("materia-select-editor")}static getStubConfig(){return{entity:""}}static styles=s`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
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
  `;constructor(){super(),ct()}setConfig(t){if(!t.entity)throw new Error("entity is required");this.config={...t}}render(){if(!this.hass||!this.config)return B``;const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;const e=this.config.name||t.attributes.friendly_name||this.config.entity,i=t.attributes.options||[],n=t.state;return B`
      <ha-card>
        <div class="row">
          ${this.config.icon?B`<ha-icon .icon=${this.config.icon}></ha-icon>`:""}
          <div class="info">
            <div class="name">${e}</div>
            <div class="current-option">${n}</div>
          </div>
          <select @change=${this._onSelect}>
            ${i.map(t=>B`<option value=${t} ?selected=${t===n}>${t}</option>`)}
          </select>
        </div>
      </ha-card>
    `}_onSelect(t){const e=t.target.value,i=this.config.entity,n=i.split(".")[0];this.hass.callService(n,"select_option",{entity_id:i,option:e})}getCardSize(){return 1}}customElements.define("materia-select",Lt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-select",name:"Materia Select",description:"Dropdown select for input_select / select entities."}),ct();console.info("%c MATERIA %c v0.3.0 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
