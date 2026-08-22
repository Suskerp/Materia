/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new a(s,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!r(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);a?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=s;const n=a.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){const n=this.constructor;if(!1===s&&(a=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=e=>e,$=w.trustedTypes,C=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+T,A=`<${z}>`,E=document,M=()=>E.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,F=Array.isArray,D="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,P=/>/g,R=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,U=/"/g,j=/^(?:script|style|textarea|title)$/i,B=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),I=B(1),H=B(2),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,X=E.createTreeWalker(E,129);function Y(e,t){if(!F(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,s=[];let a,n=2===t?"<svg>":3===t?"<math>":"",o=q;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===q?"!--"===l[1]?o=N:void 0!==l[1]?o=P:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=a??q,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?R:'"'===l[3]?U:L):o===U||o===L?o=R:o===N||o===P?o=q:(o=R,a=void 0);const h=o===R&&e[t+1].startsWith("/>")?" ":"";n+=o===q?i+A:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+T+h):i+T+(-2===c?t:h)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,n=0;const o=e.length-1,r=this.parts,[l,c]=K(e,t);if(this.el=Z.createElement(l,i),X.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=X.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(S)){const t=c[n++],i=s.getAttribute(e).split(T),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?se:"@"===o[1]?ae:te}),s.removeAttribute(e)}else e.startsWith(T)&&(r.push({type:6,index:a}),s.removeAttribute(e));if(j.test(s.tagName)){const e=s.textContent.split(T),t=e.length-1;if(t>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],M()),X.nextNode(),r.push({type:2,index:++a});s.append(e[t],M())}}}else if(8===s.nodeType)if(s.data===z)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(T,e+1));)r.push({type:7,index:a}),e+=T.length-1}a++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===W)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=J(e,a._$AS(e,t.values),a,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??E).importNode(t,!0);X.currentNode=s;let a=X.nextNode(),n=0,o=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new ee(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new ne(a,this,e)),this._$AV.push(t),r=i[++o]}n!==r?.index&&(a=X.nextNode(),n++)}return X.currentNode=E,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),O(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>F(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Z(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new ee(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,s){const a=this.strings;let n=!1;if(void 0===a)e=J(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==W,n&&(this._$AH=e);else{const s=e;let o,r;for(e=a[0],o=0;o<a.length-1;o++)r=J(this,s[i+o],t,o),r===W&&(r=this._$AH[o]),n||=!O(r)||r!==this._$AH[o],r===V?e=V:e!==V&&(e+=(r??"")+a[o+1]),this._$AH[o]=r}n&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class ae extends te{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??V)===W)return;const i=this._$AH,s=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=w.litHtmlPolyfillSupport;oe?.(Z,ee),(w.litHtmlVersions??=[]).push("3.3.2");const re=(e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new ee(t.insertBefore(M(),e),e,void 0,i??{})}return a._$AI(e),a
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},le=globalThis;let ce=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;let he;async function pe(){return he||(he=await window.loadCardHelpers(),he)}de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2"),n`
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
`;const ue={ms:342,easing:"linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1)"},me={ms:533},ge=n`
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
`;class fe extends ce{static properties={min:{type:Number},max:{type:Number},value:{type:Number},step:{type:Number},color:{type:String},trackColor:{type:String},disabled:{type:Boolean},liveUpdate:{type:Boolean,attribute:"live-update"},stops:{type:Boolean},ticks:{type:Boolean},showLabel:{type:Boolean,attribute:"show-label",reflect:!0},valueLabel:{type:String,attribute:"value-label"},label:{type:String},size:{type:String,reflect:!0},_pressed:{state:!0},_focused:{state:!0}};static styles=[ge,n`
      :host {
        display: block;
        width: 100%;

        /* SliderTokens: 16dp track, 4x44dp handle, 2dp when pressed/focused.
           StopIndicatorSize 4dp. MCA: 6dp thumb-track gap, 2dp inside corner. */
        --slider-track-height: 16px;
        --slider-track-radius: 8px;
        --slider-handle-width: 4px;
        --slider-handle-height: 44px;
        --slider-handle-width-pressed: 2px;
        --slider-gap: 6px;
        --slider-inside-corner: 2px;
        --slider-stop-size: 4px;

        /* SliderTokens colors. surface-variant is only a fallback for themes
           that predate the secondary-container role. */
        --slider-color: var(--md-sys-color-primary, var(--primary-color));
        --slider-track-color: var(
          --md-sys-color-secondary-container,
          var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.24))
        );
      }

      /* M3 Expressive size tokens. The handle stays 4x44dp for XS/S/M;
         only the track height and its leading shape grow. */
      :host([size="s"]) {
        --slider-track-height: 24px;
        --slider-track-radius: 8px;
      }

      :host([size="m"]) {
        --slider-track-height: 40px;
        --slider-track-radius: 12px;
      }

      .slider {
        position: relative;
        width: 100%;
        /* The row is exactly one handle tall: HandleHeight 44dp. */
        height: var(--slider-handle-height);
        box-sizing: border-box;
      }

      /* ValueIndicatorActiveBottomSpace 12dp, above an indicator that is
         LabelLarge (20dp line) plus 6dp padding top and bottom = 32dp.
         The room is reserved whether or not the indicator is showing, so
         pressing the handle can never shove the card's layout around. */
      :host([show-label]) .slider {
        margin-top: 44px;
      }

      .track {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: var(--slider-track-height);

        /* The one piece of geometry everything else is derived from: the
           handle slides its own width inside the track, exactly as the native
           range thumb does, so its left edge travels 0 .. (width - 4dp).
           The active track stops one 6dp gap short of that edge, and the
           inactive track resumes one gap past it.

           material-web insets the TRACK instead, by
           calc(state-layer-size / 2 - tick-size), because its handle is a
           round nub centred ON the value and overhanging both track ends.
           The expressive handle lives INSIDE the 16dp track, so the same
           alignment job is done by shortening the handle's TRAVEL by its own
           width rather than by padding the track. Same intent, opposite side
           of the equation. */
        --_slot-x: calc(var(--_p) * (100% - var(--slider-handle-width)));
        --_active-w: max(0px, calc(var(--_slot-x) - var(--slider-gap)));
        --_inactive-x: calc(var(--_slot-x) + var(--slider-handle-width) + var(--slider-gap));

        /* CornerFull for a 16dp track, stated outright — see the radius note
           on .active for why this may NOT be written as 999px. */
        --_cap: var(--slider-track-radius);
      }

      .active,
      .inactive {
        position: absolute;
        top: 0;
        bottom: 0;
        transition: background-color var(--md-sys-motion-default-effects);
      }

      .active {
        left: 0;
        width: var(--_active-w);
        /* CornerFull on the outer end, trackInsideCornerSize 2dp on the end
           facing the handle.

           The outer radius is 8dp SPELLED OUT, not the usual 999px shorthand.
           CSS Backgrounds 5.5 (Overlapping Curves) scales every corner of a
           box by ONE factor when any side is over-subscribed, and with 999px
           that factor is 16/1998 = 0.008: the outer corners land on 8dp by
           luck, but the 2dp inside corners are scaled to 0.016px, i.e. square.
           At 8dp the left side (8 + 8) fits its 16dp height exactly and the
           top side (8 + 2) fits any track wider than 10dp, so nothing is
           scaled and the 2dp survives. */
        border-radius: var(--_cap) var(--slider-inside-corner) var(--slider-inside-corner) var(--_cap);
        background: var(--_fill);
      }

      .inactive {
        /* Over-constrained on purpose: past the end the width clamps to zero. */
        left: var(--_inactive-x);
        right: 0;
        border-radius: var(--slider-inside-corner) var(--_cap) var(--_cap) var(--slider-inside-corner);
        background: var(--_track);
      }

      /* Stop indicators, drawn as two layers of the same dots — the structure
         material-web uses for tick marks, where .tickmarks::before carries the
         inactive-coloured set and .tickmarks::after the active-coloured one.
         Each layer is CLIPPED TO ITS OWN FILL, which does three jobs at once:
         it picks the colour that reads against whatever is behind the dot, it
         hides dots the handle has reached, and — the reason both layers are
         clipped rather than just one — it stops a dot ever painting on the
         transparent 6dp gap beside the handle. An unclipped base layer left a
         stop indicator floating in that gap at value 0, next to a handle with
         no fill behind it, which is exactly the stray dot it looked like.

         Colour roles are inverted per layer: MCA paints inactive tick marks
         colorPrimary (so a dot ON the inactive track takes the ACTIVE colour),
         and SliderTokens puts StopIndicators on SecondaryContainer (so a dot
         ON the active fill takes the INACTIVE colour). */
      .dots {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .dots.on-inactive {
        clip-path: inset(0 0 0 var(--_inactive-x));
      }

      .dots.on-active {
        clip-path: inset(0 calc(100% - var(--_active-w)) 0 0);
      }

      .dot {
        position: absolute;
        top: 50%;
        width: var(--slider-stop-size);
        height: var(--slider-stop-size);
        margin-top: calc(var(--slider-stop-size) / -2);
        border-radius: 999px;
      }

      .dots.on-inactive .dot {
        background: var(--_fill);
      }

      .dots.on-active .dot {
        background: var(--_track);
      }

      /* The two end indicators sit centred in the track's round caps, half a
         track height in from each edge. Neither needs a visibility rule of
         its own: at value 0 the start dot falls in the gap and both clips
         reject it, and at maximum the end dot lands exactly on the active
         fill's outer edge and is clipped away there. */
      .dot.start {
        left: calc(var(--slider-track-height) / 2 - var(--slider-stop-size) / 2);
      }

      .dot.end {
        right: calc(var(--slider-track-height) / 2 - var(--slider-stop-size) / 2);
      }

      /* Per-step indicators ride the handle's own travel, so at either
         extreme the handle covers its indicator exactly. */
      .dot.tick {
        left: calc(var(--_t) * (100% - var(--slider-handle-width)));
      }

      /* A fixed-width slot the handle is centred in, so narrowing on press
         happens about the handle's own axis and the fills never shift. */
      .slot {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(var(--_p) * (100% - var(--slider-handle-width)));
        width: var(--slider-handle-width);
        display: grid;
        place-items: center;
        z-index: 1;
        pointer-events: none;
        /* Effects, not spatial: a spatial spring overshoots, and a slider
           handle that swings past the value is a handle showing a value the
           entity does not have. */
        transition: left var(--md-sys-motion-default-effects);
      }

      .handle {
        width: var(--slider-handle-width);
        height: var(--slider-handle-height);
        /* 999px is safe HERE, unlike on the track fills: all four corners are
           equal, so the uniform down-scaling leaves a pill at any width —
           including the 2dp pressed one. */
        border-radius: 999px;
        background: var(--_fill);
        transition: width var(--md-sys-motion-fast-effects),
          background-color var(--md-sys-motion-default-effects);
      }

      /* PressedHandleWidth / FocusHandleWidth: 2dp. */
      .slider.pressed .handle,
      .slider.focused .handle {
        width: var(--slider-handle-width-pressed);
      }

      /* While the finger is down the handle must track it 1:1 — an easing
         curve here would lag behind the drag. */
      .slider.pressed .slot {
        transition: none;
      }

      /* M3 focus indicator: 3dp outline, 2dp offset, in the secondary role. */
      .slider.focused .track {
        outline: 3px solid var(--md-sys-color-secondary, var(--primary-color));
        outline-offset: 2px;
        border-radius: 999px;
      }

      /* Value indicator. LabelLarge = 14sp / 500 / 20sp line, on an
         inverse-surface pill 12dp above the handle. */
      .indicator {
        position: absolute;
        bottom: calc(100% + 12px);
        left: calc(var(--_p) * (100% - var(--slider-handle-width)));
        transform: translateX(calc(-50% + var(--slider-handle-width) / 2));
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--md-sys-color-inverse-surface, #313033);
        color: var(--md-sys-color-inverse-on-surface, #f4eff4);
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.1px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--md-sys-motion-fast-effects),
          left var(--md-sys-motion-default-effects);
      }

      .slider.pressed .indicator,
      .slider.focused .indicator {
        opacity: 1;
      }

      .slider.pressed .indicator {
        transition: opacity var(--md-sys-motion-fast-effects);
      }

      /* Disabled: per-part opacities over on-surface, not one dimmed host.
         .38 handle and active track, .12 inactive track. */
      .slider.disabled .active,
      .slider.disabled .handle {
        background: color-mix(in srgb, var(--md-sys-color-on-surface, currentColor) 38%, transparent);
      }

      .slider.disabled .inactive {
        background: color-mix(in srgb, var(--md-sys-color-on-surface, currentColor) 12%, transparent);
      }

      .slider.disabled .dots {
        display: none;
      }

      /* The interactive layer: invisible, full-bleed, on top. */
      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
      }

      input[type="range"]:disabled {
        cursor: not-allowed;
      }

      input[type="range"]::-webkit-slider-runnable-track {
        height: 100%;
        background: transparent;
      }

      /* Sized to the drawn handle so the browser's pointer-to-value mapping
         and our own position maths agree to the pixel. */
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--slider-handle-width);
        height: var(--slider-handle-height);
        border: none;
        background: transparent;
      }

      input[type="range"]::-moz-range-track {
        height: 100%;
        background: transparent;
      }

      input[type="range"]::-moz-range-thumb {
        width: var(--slider-handle-width);
        height: var(--slider-handle-height);
        border: none;
        background: transparent;
      }
    `];constructor(){super(),this.min=0,this.max=100,this.value=0,this.step=1,this.color="",this.trackColor="",this.disabled=!1,this.liveUpdate=!1,this.stops=!0,this.ticks=!1,this.showLabel=!1,this.valueLabel="",this.label="",this.size="xs",this._pressed=!1,this._focused=!1,this._debounceTimer=null}get _fillColor(){return this.color||"var(--slider-color)"}get _trackColor(){return this.trackColor||"var(--slider-track-color)"}get _fraction(){const e=this.max-this.min;return e>0?Math.min(1,Math.max(0,(this.value-this.min)/e)):0}get _percentage(){return 100*this._fraction}get _stepCount(){const e=this.max-this.min;if(!(e>0&&this.step>0))return 0;const t=Math.round(e/this.step);return Number.isFinite(t)?t:0}_dots(){if(this.ticks){const e=this._stepCount;if(e<1||e>30)return[];const t=[];for(let i=0;i<=e;i++)t.push(I`<span class="dot tick" style="--_t:${i/e}"></span>`);return t}return this.stops?[I`<span class="dot start"></span>`,I`<span class="dot end"></span>`]:[]}get _indicatorText(){return this.valueLabel?this.valueLabel:String(Math.round(1e3*this.value)/1e3)}render(){const e=this._dots(),t=["slider",this._pressed?"pressed":"",this._focused?"focused":"",this.disabled?"disabled":""].filter(Boolean).join(" ");return I`
      <div
        class=${t}
        style="--_p:${this._fraction};--_fill:${this._fillColor};--_track:${this._trackColor};"
      >
        ${this.showLabel?I`<div class="indicator">${this._indicatorText}</div>`:V}

        <div class="track">
          <div class="active"></div>
          <div class="inactive"></div>
          ${e.length?I`<div class="dots on-inactive">${e}</div>
                <div class="dots on-active">${e}</div>`:V}
        </div>

        <div class="slot"><div class="handle"></div></div>

        <input
          type="range"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .value=${String(this.value)}
          .step=${String(this.step)}
          ?disabled=${this.disabled}
          aria-label=${this.label||V}
          @input=${this._onInput}
          @change=${this._onChange}
          @pointerdown=${this._onPressStart}
          @pointerup=${this._onPressEnd}
          @pointercancel=${this._onPressEnd}
          @focus=${this._onFocus}
          @blur=${this._onBlur}
        />
      </div>
    `}_onPressStart(){this.disabled||(this._pressed=!0)}_onPressEnd(){this._pressed=!1}_onFocus(e){this._focused=e.target?.matches?.(":focus-visible")??!0}_onBlur(){this._focused=!1}_onInput(e){const t=parseFloat(e.target.value);Number.isNaN(t)||(this.value=t,this.dispatchEvent(new CustomEvent("value-dragging",{detail:{value:t},bubbles:!0,composed:!0})),this.liveUpdate&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._fireValueChanged(t)},100)))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._debounceTimer)}_onChange(e){clearTimeout(this._debounceTimer);const t=parseFloat(e.target.value);Number.isNaN(t)||(this.value=t,this._fireValueChanged(t))}_fireValueChanged(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}}customElements.define("materia-slider",fe);class _e{constructor({host:e,surface:t,onChange:i}){this.host=e,this.surface=t,this.onChange=i||(()=>{}),this.gesture="slide",this.direction="forward",this.threshold=.55,this.holdMs=800,this.disabled=!1,this.pending=!1,this.travel="handle",this._p=0,this._armed=!1,this._settling=!1,this._travel=0}get p(){return this._p}set p(e){const t=Math.max(0,Math.min(1,e));t!==this._p&&(this._p=t,this.onChange())}get armed(){return this._armed}set armed(e){e!==this._armed&&(this._armed=e,this.onChange())}get settling(){return this._settling}set settling(e){e!==this._settling&&(this._settling=e,this.onChange())}destroy(){this._cleanup()}pointerDown(e){this._onPointerDown(e)}keyDown(e){this._onKeyDown(e)}setProgress(e,t=!0){this.settling=t,this.p=e}_measure(){const e=this._rect();this._travel=e?"full"===this.travel?Math.max(0,e.width):Math.max(0,e.width-e.height):0}_rect(){const e=this._frameId||0;return this._rectCache&&this._rectCacheFrame===e||(this._rectCache=this.surface()?.getBoundingClientRect(),this._rectCacheFrame=e,this._frameRaf||(this._frameRaf=requestAnimationFrame(()=>{this._frameId=(this._frameId||0)+1,this._frameRaf=null}))),this._rectCache}_eventX(e){return void 0!==e.clientX&&0!==e.clientX?e.clientX:e.changedTouches?.[0]?e.changedTouches[0].clientX:e.touches?.[0]?e.touches[0].clientX:e.clientX||0}_haptic(e){this.host.dispatchEvent(new CustomEvent("haptic",{detail:e,bubbles:!0,composed:!0}))}_onPointerDown(e){this.disabled||this.pending||e.button&&0!==e.button||e.isPrimary&&("touch"===e.pointerType&&e.clientX<=30||(this._startX=e.clientX,this._startY=e.clientY,this._pointerId=e.pointerId,this._rectCache=null,this._scrollIntent=!1,this._measure(),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef),this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),"hold"===this.gesture&&this._engage(e)))}_onEarlyMove(e){if(this._scrollIntent)return;const t=Math.abs(e.clientX-this._startX),i=Math.abs(e.clientY-this._startY);if(i>10&&i>t+4)return this._scrollIntent=!0,"hold"===this.gesture&&this._release(!1),void this._dropEarlyMove();if("hold"===this.gesture){const t=this._rect();if(t){const i=24;(e.clientX<t.left-i||e.clientX>t.right+i||e.clientY<t.top-i||e.clientY>t.bottom+i)&&this._release(!1)}return}t>6&&t>=i&&(this._dropEarlyMove(),this._engage(e))}_dropEarlyMove(){this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_engage(e){if(this.armed)return;this.armed=!0,this.settling=!1,this._engagedAt=Date.now(),this._grabX=this._eventX(e),this._grabP=this.p;const t=this.surface();try{t?.setPointerCapture(this._pointerId)}catch(e){}document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),t?.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._release(!1)},document.addEventListener("visibilitychange",this._onVisibilityRef),"hold"===this.gesture?(this._tick=this._tick.bind(this),this._raf=requestAnimationFrame(this._tick)):(this._onMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onMoveRef))}_preventTouch(e){e.preventDefault()}_tick(){if(!this.armed)return;const e=Math.min(1,(Date.now()-this._engagedAt)/Math.max(1,this.holdMs));this.p=e,e>=1?this._commit():this._raf=requestAnimationFrame(this._tick)}_onDragMove(e){if(!this.armed)return;"touch"===e.pointerType&&e.preventDefault();if(!this._rect()||this._travel<=0)return;const t=this._eventX(e)-this._grabX,i="backward"===this.direction?-t:t;this.p=Math.max(0,Math.min(1,this._grabP+i/this._travel))}_onPointerUp(e){if("pointercancel"===e.type&&this._engagedAt&&Date.now()-this._engagedAt<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._release(!1),400));clearTimeout(this._graceTimer),this._release(this.armed&&"slide"===this.gesture&&this._p>=this.threshold)}_release(e){(this.armed||null!=this._startX)&&(e?this._commit():(this.settling=!0,this.p=0,this._cleanup()))}_commit(){this.settling=!0,this.p=1,this._cleanup(),this._haptic("success"),this.host.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0}))}_cleanup(){this.armed=!1,this._startX=null,this._scrollIntent=!1,this._engagedAt=null,this._rectCache=null,clearTimeout(this._graceTimer),this._raf&&(cancelAnimationFrame(this._raf),this._raf=null),this._dropEarlyMove();const e=this.surface();document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),e?.removeEventListener("touchmove",this._preventTouch);try{e?.releasePointerCapture(this._pointerId)}catch(e){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onMoveRef&&(window.removeEventListener("pointermove",this._onMoveRef),this._onMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_onKeyDown(e){this.disabled||this.pending||"Enter"!==e.key&&" "!==e.key&&"Spacebar"!==e.key||(e.preventDefault(),this._commit())}}const be=H`<path
  d="M4 12h13M11 6l6 6-6 6"
  fill="none"
  stroke="currentColor"
  stroke-width="2.4"
  stroke-linecap="round"
  stroke-linejoin="round"
/>`;class ve extends ce{static properties={gesture:{type:String,reflect:!0},label:{type:String},icon:{type:String},direction:{type:String},pending:{type:Boolean,reflect:!0},threshold:{type:Number},holdMs:{type:Number,attribute:"hold-ms"},disabled:{type:Boolean,reflect:!0},_p:{state:!0},_armed:{state:!0}};static styles=[ge,n`
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
    `];constructor(){super(),this.gesture="slide",this.label="",this.icon="",this.direction="forward",this.threshold=.55,this.holdMs=800,this.disabled=!1,this.pending=!1}disconnectedCallback(){super.disconnectedCallback(),this._cleanup()}willUpdate(e){e.has("pending")&&void 0!==e.get("pending")&&(this.pending?this._gesture.setProgress(1,!0):e.has("direction")||this._gesture.setProgress(0,!0)),e.has("direction")&&void 0!==e.get("direction")&&this._gesture.setProgress(0,!1),this._syncGesture()}get _gesture(){return this.__gesture??=new _e({host:this,surface:()=>this.shadowRoot?.querySelector(".track"),onChange:()=>this.requestUpdate()}),this.__gesture}get _p(){return this._gesture.p}get _armed(){return this._gesture.armed}get _settling(){return this._gesture.settling}_syncGesture(){const e=this._gesture;e.gesture=this.gesture,e.direction=this.direction,e.threshold=this.threshold,e.holdMs=this.holdMs,e.disabled=this.disabled,e.pending=this.pending}_onPointerDown(e){this._syncGesture(),this._gesture.pointerDown(e)}_onKeyDown(e){this._syncGesture(),this._gesture.keyDown(e)}_cleanup(){this.__gesture?.destroy()}render(){const e="hold"===this.gesture,t="backward"===this.direction,i=t?1-this._p:this._p,s=this._settling&&!this._armed?"settling":"";return I`
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
        ${e?I`<div class="fill ${t?"backward":""} ${s}"></div>`:V}
        <div class="label"><span>${this.label}</span></div>
        ${e?V:I`<div class="handle ${s}">
              ${this.icon?I`<ha-icon .icon=${this.icon}></ha-icon>`:I`<svg
                    class="arrow ${t?"flip":""}"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >${be}</svg>`}
            </div>`}
      </div>
    `}}customElements.define("materia-drag-confirm",ve);class ye extends ce{static properties={year:{type:Number},month:{type:Number},selected:{type:Number},firstDay:{type:Number,attribute:"first-day"},noPast:{type:Boolean,attribute:"no-past"},locale:{type:String}};static styles=[ge,n`
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
    `];constructor(){super();const e=new Date;this.year=e.getFullYear(),this.month=e.getMonth(),this.selected=null,this.firstDay=1,this.noPast=!1,this.locale=""}get _locale(){return this.locale||void 0}get _dayNames(){const e=new Intl.DateTimeFormat(this._locale,{weekday:"narrow"});return Array.from({length:7},(t,i)=>e.format(new Date(2024,0,1+(i+(0===this.firstDay?6:0))%7)))}get _monthLabel(){return new Intl.DateTimeFormat(this._locale,{month:"long",year:"numeric"}).format(new Date(this.year,this.month,1))}_shift(e){let t=this.month+e,i=this.year;t<0?(t=11,i-=1):t>11&&(t=0,i+=1),this.dispatchEvent(new CustomEvent("month-changed",{detail:{year:i,month:t},bubbles:!0,composed:!0}))}_pick(e){this.dispatchEvent(new CustomEvent("date-selected",{detail:{date:new Date(this.year,this.month,e),day:e},bubbles:!0,composed:!0}))}render(){const e=(new Date(this.year,this.month,1).getDay()-this.firstDay+7)%7,t=new Date(this.year,this.month+1,0).getDate(),i=new Date,s=i.getFullYear()===this.year&&i.getMonth()===this.month,a=i.getDate(),n=[...Array.from({length:e},()=>null),...Array.from({length:t},(e,t)=>t+1)];return I`
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
        ${n.map(e=>{if(null===e)return I`<div class="day blank"></div>`;const t=s&&e===a,i=this.noPast&&s&&e<a,n=this.selected===e;return I`<button
            type="button"
            class="day ${n?"sel":""} ${t?"today":""} ${i?"dead":""}"
            ?disabled=${i}
            aria-selected=${n?"true":"false"}
            @click=${i?void 0:()=>this._pick(e)}
          >${e}</button>`})}
      </div>
    `}}customElements.define("materia-calendar",ye);const xe={unavailable:{en:"Unavailable",nl:"Niet beschikbaar"},cancel:{en:"Cancel",nl:"Annuleren"},confirm:{en:"Confirm",nl:"Bevestigen"},reset:{en:"Reset",nl:"Resetten"},entity_not_found:{en:"Entity not found",nl:"Entiteit niet gevonden"},entity_not_found_with_id:{en:"Entity not found: {entity}",nl:"Entiteit niet gevonden: {entity}"},state_on:{en:"On",nl:"Aan"},state_off:{en:"Off",nl:"Uit"},state_open:{en:"Open",nl:"Open"},state_closed:{en:"Closed",nl:"Dicht"},state_locked:{en:"Locked",nl:"Op slot"},state_unlocked:{en:"Unlocked",nl:"Open"},state_locking:{en:"Locking",nl:"Gaat op slot"},state_unlocking:{en:"Unlocking",nl:"Gaat open"},state_jammed:{en:"Jammed",nl:"Vastgelopen"},badge_hold_hint:{en:"hold, don't tap",nl:"even vasthouden"},vh_min_left:{en:"about {mins} min left",nl:"nog zo'n {mins} min"},vh_drying:{en:"Drying the mop",nl:"De mop droogt"},vh_last_cleaned:{en:"Last cleaned {rel} ago",nl:"Laatst gepoetst {rel} geleden"},vh_docked:{en:"Docked",nl:"In het dokstation"},unit_min:{en:"{n} min",nl:"{n} min"},unit_hours:{en:"{n} h",nl:"{n} u"},unit_days:{en:"{n} d",nl:"{n} d"},lock_slide_to_unlock:{en:"Slide to unlock",nl:"Schuif om te openen"},lock_slide_to_lock:{en:"Slide to lock",nl:"Schuif om op slot te doen"},lock_hold_to_unlock:{en:"Hold to unlock",nl:"Houd ingedrukt om te openen"},lock_hold_to_lock:{en:"Hold to lock",nl:"Houd ingedrukt om op slot te doen"},lock_jammed_hint:{en:"Jammed — check the door",nl:"Vastgelopen — controleer de deur"},lock_locking:{en:"Locking…",nl:"Gaat op slot…"},lock_unlocking:{en:"Unlocking…",nl:"Gaat open…"},lock_demo_note:{en:"Demo · no entity",nl:"Demo · geen entiteit"},lock_open_button:{en:"Open",nl:"Open"},cp_currently:{en:"Currently",nl:"Nu"},cp_section_default:{en:"Section {n}",nl:"Sectie {n}"},sched_window_start:{en:"Start",nl:"Begin"},sched_window_stop:{en:"Stop",nl:"Einde"},sched_window_overnight:{en:"Overnight",nl:"Nacht"},sched_window_daily:{en:"Daily",nl:"Dagelijks"},sched_window_pick_days:{en:"Pick at least one day",nl:"Kies minstens één dag"},sched_window_days:{en:"Repeat on",nl:"Herhaal op"},sched_multi_slots_head:{en:"Multiple blocks",nl:"Meerdere blokken"},sched_multi_slots_sub:{en:"Edit in Scheduler",nl:"Bewerk in Scheduler"},sched_at_a_time:{en:"At a time",nl:"Op een tijdstip"},sched_when_ellipsis:{en:"When…",nl:"Wanneer…"},sched_not_scheduled:{en:"Not scheduled",nl:"Niet ingepland"},sched_tap_to_pick:{en:"Tap to pick a time or a trigger",nl:"Tik om een uur of trigger te kiezen"},sched_name_default:{en:"Schedule",nl:"Planning"},sched_repeat_weekly:{en:"Repeat weekly",nl:"Wekelijks herhalen"},sched_repeat_sub_on:{en:"Runs on the days below",nl:"Loopt op de dagen hieronder"},sched_repeat_sub_off:{en:"One run only",nl:"Eén keer, niet herhalen"},sched_save_schedule:{en:"Save schedule",nl:"Planning opslaan"},sched_set_timer:{en:"Set timer",nl:"Timer instellen"},sched_pick_date_time:{en:"Pick a date & time",nl:"Kies een datum en tijdstip"},sched_mocked_note:{en:"Mocked · nothing is scheduled",nl:"Demo · er is niets ingepland"},sched_pick_trigger:{en:"Pick a trigger",nl:"Kies een trigger"},sched_runs_whenever:{en:"Runs whenever it happens",nl:"Start zodra het gebeurt"},sched_when_question:{en:"When?",nl:"Wanneer?"},sched_pick_moment:{en:"Pick a moment",nl:"Kies een moment"},sched_starts_at:{en:"Starts at {time}",nl:"Begint om {time}"},sched_preset_1h:{en:"In 1 hour",nl:"Over 1 uur"},sched_preset_4h:{en:"In 4 hours",nl:"Over 4 uur"},sched_preset_tonight:{en:"Tonight",nl:"Vanavond"},sched_preset_tomorrow:{en:"Tomorrow",nl:"Morgen"},sched_preset_noon:{en:"Noon",nl:"12 uur"},sched_preset_saturday:{en:"Saturday",nl:"Zaterdag"},sched_trigger_leave:{en:"When I leave",nl:"Als ik vertrek"},sched_trigger_leave_sub:{en:"My phone leaves home",nl:"Mijn telefoon verlaat het huis"},sched_trigger_empty:{en:"When everyone's out",nl:"Als iedereen weg is"},sched_trigger_empty_sub:{en:"All trackers away for 10 min",nl:"Alle trackers al 10 min weg van huis"},sched_trigger_night:{en:"When the house sleeps",nl:"Als het huis slaapt"},sched_trigger_night_sub:{en:"All lights off after 22:00",nl:"Alle lichten uit na 22:00"},sched_trigger_sunset:{en:"At sunset",nl:"Bij zonsondergang"},sched_trigger_sunset_sub:{en:"Around 21:48 today",nl:"Rond 21:48 vandaag"},sched_close:{en:"Close",nl:"Sluiten"},sched_clear:{en:"Clear",nl:"Wissen"},sched_scheduled:{en:"Scheduled",nl:"Ingepland"},sched_pending_sub:{en:"Pick again to move it, or clear it.",nl:"Kies opnieuw om het te verplaatsen, of wis het."},sched_skip:{en:"Skip",nl:"Overslaan"},sched_add:{en:"Add a schedule",nl:"Een planning toevoegen"},sched_add_short:{en:"Add",nl:"Toevoegen"},sched_manager_sub:{en:"Choose a schedule to change it",nl:"Kies een planning om ze aan te passen"},sched_choose_device:{en:"Choose a device",nl:"Kies een toestel"},sched_device:{en:"Device",nl:"Toestel"},sched_devices:{en:"Devices",nl:"Toestellen"},sched_add_device:{en:"Add device",nl:"Toestel toevoegen"},sched_remove_device:{en:"Remove",nl:"Verwijder"},sched_action:{en:"Action",nl:"Actie"},sched_new:{en:"New schedule",nl:"Nieuwe planning"},sched_edit:{en:"Change schedule",nl:"Planning aanpassen"},sched_enabled:{en:"Enabled",nl:"Actief"},sched_disabled:{en:"Disabled",nl:"Gepauzeerd"},sched_enable:{en:"Enable schedule",nl:"Planning activeren"},sched_disable:{en:"Pause schedule",nl:"Planning pauzeren"},sched_empty_head:{en:"No schedules yet",nl:"Nog geen planningen"},sched_empty_sub:{en:"Tap here to add the first one",nl:"Tik hier om de eerste toe te voegen"},sched_delete:{en:"Delete",nl:"Verwijderen"},sched_delete_confirm:{en:"Tap again",nl:"Tik nogmaals"},confirm_action:{en:"Are you sure?",nl:"Ben je zeker?"},db_eyebrow:{en:"Doorbell",nl:"Deurbel"},db_eyebrow_street:{en:"Street door",nl:"Benedendeur"},db_eyebrow_front:{en:"Front door",nl:"Voordeur"},db_title_ringing:{en:"Someone's at the door",nl:"Er staat iemand aan de deur"},db_title_buzzing:{en:"Buzzing them in",nl:"Ze worden binnengelaten"},db_title_buzzed:{en:"Buzzed in",nl:"Binnengelaten"},db_title_opened:{en:"Door open",nl:"Deur open"},db_title_lapsed:{en:"No answer",nl:"Geen antwoord"},db_sub_ringing:{en:"{place} · just now",nl:"{place} · daarnet"},db_sub_buzzing:{en:"Street door released",nl:"Benedendeur geopend"},db_sub_buzzed:{en:"Front door still locked",nl:"Voordeur nog op slot"},db_sub_opened:{en:"Front door unlocked",nl:"Voordeur van het slot"},db_sub_lapsed:{en:"Ring lapsed · nothing was opened",nl:"Bel verlopen · er ging niets open"},db_count_before_lapse:{en:"before it lapses",nl:"voor de bel verloopt"},db_buzz_title:{en:"Buzz in",nl:"Binnenlaten"},db_buzz_sub:{en:"Street door only",nl:"Enkel de benedendeur"},db_buzz_cta:{en:"Tap to buzz",nl:"Tik om te zoemen"},db_buzz_busy:{en:"Buzzing",nl:"Zoemt…"},db_buzz_done:{en:"Buzzed",nl:"Gezoemd"},db_open_title:{en:"Open the front door",nl:"Doe de voordeur open"},db_open_sub:{en:"Unlocks the front door for your visitor.",nl:"Haalt de voordeur van het slot voor je bezoek."},db_slide_hint:{en:"Slide to open",nl:"Schuif om te openen"},db_hold_hint:{en:"Hold to open",nl:"Houd ingedrukt om te openen"},db_slide_done:{en:"Door open",nl:"Deur open"},db_ignore:{en:"Ignore",nl:"Negeer"},db_replay:{en:"Replay ring",nl:"Bel opnieuw"},db_mute:{en:"Silence",nl:"Stil"},db_muted:{en:"Muted",nl:"Gedempt"},cond_clear_night:{en:"Clear night",nl:"Heldere nacht"},cond_partly_cloudy:{en:"Partly cloudy",nl:"Half bewolkt"},cond_thunderstorm:{en:"Thunderstorm",nl:"Onweer"},cond_sleet:{en:"Sleet",nl:"Natte sneeuw"},cond_exceptional:{en:"Exceptional",nl:"Uitzonderlijk"},level_none:{en:"None",nl:"Geen"},level_low:{en:"Low",nl:"Laag"},level_moderate:{en:"Moderate",nl:"Matig"},level_high:{en:"High",nl:"Hoog"},level_very_high:{en:"Very high",nl:"Zeer hoog"},level_extreme:{en:"Extreme",nl:"Extreem"},level_active:{en:"Active",nl:"Actief"},aqi_good:{en:"Good air quality",nl:"Goede luchtkwaliteit"},aqi_moderate:{en:"Moderate air quality",nl:"Matige luchtkwaliteit"},aqi_unhealthy_sensitive:{en:"Unhealthy for sensitive groups",nl:"Ongezond voor gevoelige groepen"},aqi_unhealthy:{en:"Unhealthy air quality",nl:"Ongezonde luchtkwaliteit"},aqi_very_unhealthy:{en:"Very unhealthy air quality",nl:"Zeer ongezonde luchtkwaliteit"},aqi_hazardous:{en:"Hazardous air quality",nl:"Gevaarlijke luchtkwaliteit"},wm_wind_from:{en:"From",nl:"Uit"},wm_wind:{en:"Wind",nl:"Wind"},wm_uv_index:{en:"UV index",nl:"UV-index"},wm_visibility:{en:"Visibility",nl:"Zicht"},wm_visibility_hint:{en:"Weather entity has no visibility — add a sensor",nl:"Weerentiteit heeft geen zicht — voeg een sensor toe"},wm_pressure:{en:"Pressure",nl:"Luchtdruk"},wm_air_quality:{en:"Air quality",nl:"Luchtkwaliteit"},wm_aqi_hint:{en:"Point this tile at an AQI sensor",nl:"Wijs deze tegel naar een luchtkwaliteitssensor"},wm_precipitation:{en:"Precipitation",nl:"Neerslag"},wm_no_precip:{en:"No precipitation expected",nl:"Geen neerslag verwacht"},wm_total_rain:{en:"Total rain for the day",nl:"Totale regen vandaag"},wm_humidity:{en:"Humidity",nl:"Vochtigheid"},wm_humidity_hint:{en:"Weather entity has no humidity — add a sensor",nl:"Weerentiteit heeft geen vochtigheid — voeg een sensor toe"},wm_dew_point:{en:"Dew point",nl:"Dauwpunt"},wm_sunrise_sunset:{en:"Sunrise & sunset",nl:"Zonsopgang & zonsondergang"},wm_grass:{en:"Grass",nl:"Gras"},wm_tree:{en:"Tree",nl:"Boom"},wm_weed:{en:"Weed",nl:"Onkruid"},wm_pollen:{en:"Pollen",nl:"Pollen"},wm_pollen_hint:{en:"Add pollen sensors",nl:"Voeg pollensensoren toe"},wg_rain:{en:"Rain",nl:"Regen"},wg_pollen_none:{en:"none",nl:"geen"},wh_night:{en:"Night",nl:"Nacht"},wh_day:{en:"Day",nl:"Dag"},wh_feels_like:{en:"Feels like",nl:"Voelt als"},fc_hourly_forecast:{en:"Hourly forecast",nl:"Uurverwachting"},fc_today:{en:"Today",nl:"Vandaag"},gt_state_cleaning:{en:"Cleaning",nl:"Aan het poetsen"},gt_state_docked:{en:"Docked",nl:"In het dokstation"},gt_state_paused:{en:"Paused",nl:"Gepauzeerd"},gt_state_idle:{en:"Idle",nl:"Inactief"},gt_state_returning:{en:"Returning to dock",nl:"Keert terug naar dokstation"},gt_state_error:{en:"Error",nl:"Fout"},gt_needs_water_now:{en:"Needs water now",nl:"Nu water nodig"},gt_water_soon:{en:"Water soon",nl:"Binnenkort water geven"},gt_optimal:{en:"Optimal",nl:"Optimaal"},gt_overwatered:{en:"Overwatered",nl:"Te veel water"},vh_vacuum_error:{en:"Vacuum error",nl:"Fout met de stofzuiger"},vh_dock_error:{en:"Dock error",nl:"Fout met het dock"},vh_water_shortage:{en:"Water shortage - cannot mop",nl:"Te weinig water - kan niet dweilen"},vh_clean_water_refill:{en:"Clean water tank needs refilling",nl:"Schoonwatertank moet bijgevuld worden"},vh_dirty_water_empty:{en:"Dirty water tank needs emptying",nl:"Vuilwatertank moet geleegd worden"},vh_drying_mop:{en:"Drying the mop",nl:"Dweil wordt gedroogd"},vh_done_caption:{en:"done",nl:"klaar"},vh_battery_caption:{en:"battery",nl:"batterij"},vh_about_min_left:{en:"about {mins} min left",nl:"nog {mins} min"},vh_last_cleaned_ago:{en:"Last cleaned {rel} ago",nl:"Laatst gestofzuigd {rel} geleden"},vh_needs_attention:{en:"{name} needs attention",nl:"{name} heeft aandacht nodig"},cf_hold_to_confirm:{en:"Hold to confirm",nl:"Houd vast om te bevestigen"},cf_active:{en:"Active",nl:"Actief"},cf_working:{en:"Working…",nl:"Bezig…"},cf_tap_to_stop:{en:"Tap to stop",nl:"Tik om te stoppen"},cf_tap_to_stop_aria:{en:"Stop {what}",nl:"{what} stoppen"},bars_no_rows:{en:"Add a bar in the card settings",nl:"Voeg een balk toe bij de kaartinstellingen"},bars_aria_unknown:{en:"{label}: no reading",nl:"{label}: geen meting"},bars_unknown_title:{en:"No reading available",nl:"Geen meting beschikbaar"},al_mode_home:{en:"Home",nl:"Aanwezig"},al_mode_away:{en:"Away",nl:"Afwezig"},al_mode_night:{en:"Night",nl:"Nacht"},al_mode_vacation:{en:"Vacation",nl:"Vakantie"},al_mode_custom:{en:"Custom",nl:"Aangepast"},al_state_armed_home:{en:"Home",nl:"Aanwezig"},al_state_armed_away:{en:"Away",nl:"Afwezig"},al_state_armed_night:{en:"Night",nl:"Nacht"},al_state_armed_vacation:{en:"Vacation",nl:"Vakantie"},al_state_armed_custom:{en:"Custom",nl:"Aangepast"},al_state_disarmed:{en:"Disarmed",nl:"Uitgeschakeld"},al_state_arming:{en:"Arming",nl:"Wordt ingeschakeld"},al_state_pending:{en:"Entry delay",nl:"Ingangsvertraging"},al_state_triggered:{en:"Alarm!",nl:"Alarm!"},al_state_unknown:{en:"Unknown",nl:"Onbekend"},al_sub_ready:{en:"Ready to arm",nl:"Klaar om in te schakelen"},al_sub_not_ready:{en:"{n} zones not ready",nl:"{n} zones niet gereed"},al_sub_not_ready_one:{en:"{n} zone not ready",nl:"{n} zone niet gereed"},al_sub_armed_since:{en:"Armed since {time}",nl:"Ingeschakeld sinds {time}"},al_sub_triggered:{en:"Triggered at {time}",nl:"Alarm afgegaan om {time}"},al_sub_pending:{en:"Entry delay running",nl:"Ingangsvertraging loopt"},al_sub_arming:{en:"Arming...",nl:"Wordt ingeschakeld..."},al_sub_disarming:{en:"Disarming...",nl:"Wordt uitgeschakeld..."},al_sub_unavailable:{en:"Panel unavailable",nl:"Paneel niet beschikbaar"},al_hint_hold_to_arm:{en:"Hold to arm",nl:"Houd vast om in te schakelen"},al_hint_hold_to_disarm:{en:"Hold to disarm",nl:"Houd vast om uit te schakelen"},al_hint_holding:{en:"Keep holding...",nl:"Blijf vasthouden..."},al_hint_disarm_first:{en:"Disarm first",nl:"Schakel eerst uit"},al_hint_code_required:{en:"Code required",nl:"Code vereist"},al_hint_arming:{en:"Arming...",nl:"Inschakelen..."},al_hint_disarming:{en:"Disarming...",nl:"Uitschakelen..."},al_foot_disarmed:{en:"Hold a mode to arm.",nl:"Houd een modus vast om in te schakelen."},al_foot_armed:{en:"Armed in {mode}.",nl:"Ingeschakeld in {mode}."},al_foot_locked_modes:{en:"Disarm before choosing another mode.",nl:"Schakel eerst uit voor je een andere modus kiest."},al_foot_pending:{en:"Entry delay - disarm now.",nl:"Ingangsvertraging - schakel nu uit."},al_foot_triggered:{en:"Alarm triggered while armed in {mode}.",nl:"Alarm afgegaan terwijl ingeschakeld in {mode}."},al_zones_not_ready:{en:"Not ready",nl:"Niet gereed"},al_zone_bypass:{en:"Bypass",nl:"Blokkeer"},al_zones_bypassed_count:{en:"{n} zones bypassed",nl:"{n} zones geblokkeerd"},al_zones_bypassed_one:{en:"{n} zone bypassed",nl:"{n} zone geblokkeerd"},al_zone_unbypass:{en:"Restore",nl:"Deblokkeer"},al_zones_safety_ok:{en:"{n} detectors OK",nl:"{n} detectoren in orde"},al_zones_safety_ok_one:{en:"{n} detector OK",nl:"{n} detector in orde"},al_zones_safety_fault:{en:"{n} detectors need attention",nl:"{n} detectoren vragen aandacht"},al_zones_safety_fault_one:{en:"{n} detector needs attention",nl:"{n} detector vraagt aandacht"},al_aria_safety_toggle:{en:"Show detectors",nl:"Toon detectoren"},al_zones_ready_count:{en:"{n} zones ready",nl:"{n} zones gereed"},al_zones_ready_one:{en:"{n} zone ready",nl:"{n} zone gereed"},al_zone_sensing:{en:"Movement",nl:"Beweging"},al_zones_ready_sensing:{en:"{n} ready · {m} sensing movement",nl:"{n} gereed · {m} met beweging"},al_aria_modes:{en:"Alarm modes",nl:"Alarmmodi"},al_aria_hold_arm:{en:"Hold to arm in {mode}",nl:"Houd vast om in te schakelen in {mode}"},al_aria_hold_disarm:{en:"Hold to disarm",nl:"Houd vast om uit te schakelen"},al_aria_inert:{en:"{mode} unavailable - disarm first",nl:"{mode} niet beschikbaar - schakel eerst uit"},al_aria_bypass:{en:"Bypass {name}",nl:"{name} blokkeren"},al_aria_unbypass:{en:"Stop bypassing {name}",nl:"{name} niet meer blokkeren"},al_aria_zones_toggle:{en:"Show ready zones",nl:"Toon zones die gereed zijn"},al_zones_unavailable:{en:"{n} zones unavailable",nl:"{n} zones niet beschikbaar"},al_zones_unavailable_one:{en:"{n} zone unavailable",nl:"{n} zone niet beschikbaar"},al_aria_unavail_toggle:{en:"Show unavailable zones",nl:"Toon zones die niet beschikbaar zijn"},al_needs_entity:{en:"Set an alarm_control_panel entity",nl:"Stel een alarm_control_panel-entiteit in"},al_no_modes:{en:"This panel offers no arm modes",nl:"Dit paneel biedt geen alarmmodi"},expander_expand:{en:"Expand",nl:"Uitvouwen"},expander_collapse:{en:"Collapse",nl:"Invouwen"},cal_prev_month:{en:"Previous month",nl:"Vorige maand"},cal_next_month:{en:"Next month",nl:"Volgende maand"},sb_more_actions:{en:"more actions",nl:"meer acties"}};function we(e){return String(e||"en").trim().toLowerCase().split("-")[0]||"en"}function ke(e,t){if(!e)return"";const i=function(e){return we("string"==typeof e?e:e?.locale?.language)}(t);return e[i]||e.en||""}function $e(e,t,i){const s=xe[e];return s?function(e,t){return t?Object.entries(t).reduce((e,[t,i])=>e.replaceAll(`{${t}}`,String(i)),e):e}(ke(s,t),i):e}let Ce=0;const Se=new Set(["toggle","perform-action","call-service"]),Te=e=>class extends e{_fireHaptic(e="light"){const t=Date.now();t-Ce<120||(Ce=t,this.dispatchEvent(new CustomEvent("haptic",{detail:e,bubbles:!0,composed:!0})))}_handleAction(e){if(!e||"none"===e.action)return;const t=e.confirmation;if(t){const e=!0===t?{}:t,i=Array.isArray(e.exemptions)&&e.exemptions.some(e=>e.user===this.hass?.user?.id);if(!i){const t=e.text||$e("confirm_action",this.hass);if(!window.confirm(t))return}}switch(Se.has(e.action)&&this._fireHaptic("light"),e.action){case"toggle":{const t=e.entity||this.config?.entity;if(!t)break;const i=t.split(".")[0],s=String(this.hass?.states[t]?.state??"");switch(i){case"lock":this._callService("lock","locked"===s?"unlock":"lock",{entity_id:t});break;case"cover":this._callService("cover",["closed","closing"].includes(s)?"open_cover":"close_cover",{entity_id:t});break;case"valve":this._callService("valve",["closed","closing"].includes(s)?"open_valve":"close_valve",{entity_id:t});break;case"scene":this._callService("scene","turn_on",{entity_id:t});break;case"button":case"input_button":this._callService(i,"press",{entity_id:t});break;case"vacuum":this._callService("vacuum",["docked","idle","paused"].includes(s)?"start":"return_to_base",{entity_id:t});break;default:this._callService("homeassistant","toggle",{entity_id:t})}break}case"perform-action":case"call-service":{const t=e.perform_action||e.service||"",[i,s]=t.split(".",2);i&&s&&this._callService(i,s,{...e.service_data,...e.data},e.target);break}case"url":{const t=String(e.url_path??"");(/^https?:\/\//.test(t)||t.startsWith("/"))&&window.open(t,"_blank","noopener");break}case"assist":console.warn("materia: the 'assist' action is not supported by Materia cards");break;case"navigate":{if(!e.navigation_path)break;const t=!!e.navigation_replace;history[t?"replaceState":"pushState"](null,"",e.navigation_path);const i=new Event("location-changed",{bubbles:!0,composed:!0});i.detail={replace:t},this.dispatchEvent(i);break}case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e.entity||this.config?.entity}}));break;case"fire-dom-event":{const t=new Event("ll-custom",{bubbles:!0,composed:!0,cancelable:!1});t.detail=e,this.dispatchEvent(t);break}}}_callService(e,t,i,s){return this.hass.callService(e,t,i,s).catch(i=>{Ce=0,this._fireHaptic("failure");const s=new Event("hass-notification",{bubbles:!0,composed:!0});s.detail={message:i?.message||`Failed: ${e}.${t}`},this.dispatchEvent(s)})}_capitalize(e){return e&&"string"==typeof e?e.charAt(0).toUpperCase()+e.slice(1):e}_isTemplate(e){return e&&"string"==typeof e&&(e.includes("{{")||e.includes("{%"))}_resolveTemplateValue(e,t){this._tplSubs??={},this._tplResults??={};const i=this._tplSubs[e];if(!this._isTemplate(t))return void(i&&(this._tplSubs[e]=null,i.unsub?.then(e=>e&&e()).catch(()=>{}),delete this._tplResults[e]));if(i&&i.template===t)return;i&&i.unsub?.then(e=>e&&e()).catch(()=>{});const s=this.hass?.connection;if(!s)return;const a={template:t,unsub:null};this._tplSubs[e]=a,a.unsub=s.subscribeMessage(t=>{if(this._tplSubs?.[e]!==a)return;const i=t?.result,s="string"==typeof i?i.trim():i;this._tplResults[e]!==s&&(this._tplResults[e]=s,this.requestUpdate())},{type:"render_template",template:t,report_errors:!1}),a.unsub.catch(()=>{})}_resolveField(e,t){const i=this.config?.[e];this._tplSubs??={};const s=this._tplSubs[t];if(!this._isTemplate(i))return void(s&&(this._tplSubs[t]=null,s.unsub?.then(e=>e&&e()).catch(()=>{}),this[t]=void 0));if(s&&s.template===i)return;s&&s.unsub?.then(e=>e&&e()).catch(()=>{});const a=this.hass?.connection;if(!a)return;const n={template:i,unsub:null};this._tplSubs[t]=n,n.unsub=a.subscribeMessage(e=>{if(this._tplSubs?.[t]!==n)return;const i=e?.result,s="string"==typeof i?i.trim():i;s!==this[t]&&(this[t]=s)},{type:"render_template",template:i,report_errors:!1}).catch(()=>(this._tplSubs?.[t]===n&&void 0===this[t]&&(this[t]=i),null))}_unsubscribeTemplates(){if(this._tplSubs){for(const e of Object.keys(this._tplSubs))this._tplSubs[e]?.unsub?.then(e=>e&&e()).catch(()=>{});this._tplSubs={}}}disconnectedCallback(){super.disconnectedCallback?.(),this._unsubscribeTemplates(),clearTimeout(this._haTimer),this._haTimer=null,this._haArming=!1}_holdDown(e){const t=this.config?.hold_action;t?.action&&"none"!==t.action&&(this._haX=e.clientX,this._haY=e.clientY,clearTimeout(this._haTimer),this._haArming=!0,this.requestUpdate(),this._haTimer=setTimeout(()=>{this._haFired=!0,this._haArming=!1,this.requestUpdate(),this._fireHaptic("medium"),this._handleAction(t)},500))}_holdMove(e){this._haTimer&&Math.hypot(e.clientX-this._haX,e.clientY-this._haY)>12&&this._holdCancel()}_holdUp(){this._holdCancel()}_holdCancel(){clearTimeout(this._haTimer),this._haTimer=null,this._haArming&&(this._haArming=!1,this.requestUpdate())}_consumeHold(){const e=!!this._haFired;return this._haFired=!1,e}get _hasNavigateAction(){return"navigate"===this.config?.tap_action?.action}_isUnavailable(e){return!e||"unavailable"===e.state}_fireMoreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}},ze=n`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`,Ae=n`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable,
  /* .tile was missing, so materia-bar-select's unavailable branch — which puts
     the class on a .tile div — matched NOTHING: no dimming, no grayscale, and
     no pointer-events:none, leaving an unavailable ladder fully interactive. */
  .tile.unavailable {
    /* 0.38 is the M3 disabled-content opacity the rest of the library uses;
       the grayscale is a DELIBERATE extra beyond M3 so unavailability never
       reads as just a dimmer state of the same colour. */
    opacity: 0.38;
    pointer-events: none;
    filter: grayscale(80%);
  }
`,Ee=n`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    /* The DISPLAY voice — hero numerals & titles only, one shout per card. */
    --materia-font-display: "Outfit", "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    --materia-font-accent: "Fraunces", "Georgia", serif;
  }
`,Me=n`
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
    transition: background-color var(--md-sys-motion-default-effects), color var(--md-sys-motion-default-effects);
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
`,Oe=n`
  .fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: width var(--md-sys-motion-default-effects);
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
`;const Fe=n`
  /* Artwork in the icon slot. Sized to fill .icon-container's own 42px
     footprint exactly (see rowCardStyles) so a row that switches between icon
     and thumbnail never changes height — it's a same-box swap, not a layout
     change. The surface-tint background-color is the same "nothing decoded
     yet" placeholder materia-media uses for its art tile. */
  .thumb {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.2)));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex-shrink: 0;
  }

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
`,De=e=>e.label??e.name.replace(/_/g," ").replace(/^\w/,e=>e.toUpperCase()),qe=(e,t)=>I`
  <ha-sortable
    handle-selector=".drag-handle"
    @item-moved=${t=>{t.stopPropagation();const{oldIndex:i,newIndex:s}=t.detail;i!==s&&e(i,s)}}
  >
    <div>${t}</div>
  </ha-sortable>
`,Ne=(e,t,i)=>({value:`var(--md-sys-cust-color-${e})`,swatch:`var(--md-sys-cust-color-${e}, ${i})`,label:t}),Pe=(e,t)=>({value:`var(--md-sys-color-${e})`,swatch:`var(--md-sys-color-${e})`,label:t}),Re=[{title:"Light",options:[Ne("light","Light","#FEE082"),Ne("light-container","Light container","#FEEFCA"),Ne("on-light","On light","#745D00")]},{title:"Device",options:[Ne("device","Device","#D9E2FE"),Ne("device-container","Device container","#EDF0FF"),Ne("on-device","On device","#0156CF")]},{title:"Climate · Heat",options:[Ne("climate-heat","Heat","#FFDFD4"),Ne("climate-heat-container","Heat container","#FFEEE9"),Ne("on-climate-heat","On heat","#A14614"),Ne("climate-heat-accent","Heat accent","#A14614")]},{title:"Climate · Cool",options:[Ne("climate-cool","Cool","#D3E8FF"),Ne("climate-cool-container","Cool container","#EAF3FF"),Ne("on-climate-cool","On cool","#327EA7"),Ne("climate-cool-accent","Cool accent","#327EA7")]},{title:"Climate · Auto",options:[Ne("climate-auto","Auto","#D4EBDD"),Ne("climate-auto-container","Auto container","#EAF6EE"),Ne("on-climate-auto","On auto","#2E5E44"),Ne("climate-auto-accent","Auto accent","#2E5E44")]},{title:"Water · Eco",options:[Ne("water-eco","Eco","#C8E6C9"),Ne("water-eco-container","Eco container","#E6F4EA"),Ne("on-water-eco","On eco","#256029")]},{title:"Water · Performance",options:[Ne("water-performance","Performance","#FFD1B0"),Ne("water-performance-container","Performance container","#FFEDE0"),Ne("on-water-performance","On performance","#9C3A00")]},{title:"Warning",options:[Ne("warning","Warning","#D9A000"),Ne("warning-container","Warning container","#FEEFCA"),Ne("on-warning","On warning","#FFFFFF"),Ne("on-warning-container","On warning container","#745D00")]},{title:"Error",options:[Ne("error","Error","#B3261E"),Ne("error-container","Error container","#F9DEDC"),Ne("on-error","On error","#FFFFFF"),Ne("on-error-container","On error container","#410E0B")]},{title:"Weather",options:[Ne("weather-sun","Sun","#F2B500"),Ne("weather-cloud","Cloud","#9FA9B7"),Ne("weather-cloud-dark","Cloud (dark)","#6F7A8A"),Ne("weather-rain","Rain","#2E86E0"),Ne("weather-snow","Snow","#AEB8C4"),Ne("weather-moon","Moon","#5961C2")]},{title:"Severity scale",options:[Ne("scale-green","Scale green","#5E9E50"),Ne("scale-yellow","Scale yellow","#C7A128"),Ne("scale-orange","Scale orange","#D9713C"),Ne("scale-red","Scale red","#C94D42"),Ne("scale-purple","Scale purple","#8A4DA3"),Ne("scale-maroon","Scale maroon","#7A4040")]},{title:"System (theme)",options:[Pe("primary","Primary"),Pe("primary-container","Primary container"),Pe("secondary","Secondary"),Pe("secondary-container","Secondary container"),Pe("tertiary","Tertiary"),Pe("tertiary-container","Tertiary container"),Pe("error","Error"),Pe("error-container","Error container"),Pe("surface-container","Surface container")]}],Le=new Set(Re.flatMap(e=>e.options.map(e=>e.value)));function Ue(e){return e&&"string"==typeof e&&(e.includes("{{")||e.includes("{%"))}const je={template:{}};class Be extends ce{static properties={label:{},value:{},_open:{state:!0},_customOpen:{state:!0}};static styles=n`
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
  `;get _isCustom(){return!!this.value&&!Le.has(this.value)}_option(e){for(const t of Re){const i=t.options.find(t=>t.value===e);if(i)return i}return null}get _currentLabel(){if(!this.value)return"Default";const e=this._option(this.value);return e?e.label:"Custom"}get _currentHex(){if(!this.value)return null;const e=this._option(this.value);return e?e.swatch:this.value}disconnectedCallback(){super.disconnectedCallback(),this._removeOutside()}render(){const e=this._currentHex,t=I`<ha-icon class="check" icon="mdi:check"></ha-icon>`;return I`
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
              ${Re.map(e=>I`
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
    `}_toggle(){this._open=!this._open,this._open?(this._outside=e=>{e.composedPath().includes(this)||(this._open=!1,this._removeOutside())},document.addEventListener("click",this._outside,!0)):this._removeOutside()}_removeOutside(){this._outside&&(document.removeEventListener("click",this._outside,!0),this._outside=null)}_pick(e){this._open=!1,this._customOpen=!1,this._removeOutside(),this._emit(e)}_chooseCustom(){this._open=!1,this._customOpen=!0,this._removeOutside()}_onCustomInput(e){this._emit(e.target.value)}_emit(e){e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0})))}}customElements.define("materia-color-picker",Be);class Ie extends ce{static properties={hass:{attribute:!1},value:{attribute:!1},label:{},helper:{},_ready:{state:!0}};static styles=n`
    :host { display: block; }
    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 0 0 4px 4px;
    }
    .helper {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 4px 4px 0;
    }
  `;connectedCallback(){super.connectedCallback(),this._summon()}async _summon(){if(customElements.get("ha-card-conditions-editor"))this._ready=!0;else{try{const e=await(window.loadCardHelpers?.());e?.createCardElement?.({type:"conditional",conditions:[],card:{type:"markdown",content:"x"}}),await customElements.whenDefined("hui-conditional-card"),await(customElements.get("hui-conditional-card")?.getConfigElement?.())}catch(e){}this._ready=!!customElements.get("ha-card-conditions-editor")}}render(){const e=Array.isArray(this.value)?this.value:[];return this._ready?I`
      ${this.label?I`<div class="label">${this.label}</div>`:""}
      <ha-card-conditions-editor
        .hass=${this.hass}
        .conditions=${e}
        @value-changed=${this._changed}
      ></ha-card-conditions-editor>
      ${this.helper?I`<div class="helper">${this.helper}</div>`:""}
    `:I`
        <ha-selector
          .hass=${this.hass}
          .selector=${{object:{}}}
          .value=${this.value}
          .label=${this.label}
          .helper=${this.helper}
        ></ha-selector>
      `}_changed(e){e.stopPropagation();const t=e.detail?.value;this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:Array.isArray(t)&&t.length?t:void 0},bubbles:!0,composed:!0}))}}customElements.define("materia-conditions-field",Ie);const He={name:"disabled_when",label:"Disabled when",helper:"Card stays visible but inert (38%) while ALL conditions match.",conditions:!0,template:!0};class We extends ce{static properties={hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_modes:{state:!0}};static styles=n`
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

    /* HA's ui_action selector ignores the label property, so action fields
       rendered nameless — this caption is ours, above the control. */
    .field-caption {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: -8px;
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
  `;setConfig(e){this._config=e,this._modes??={}}_formData(){return this._config||{}}get _sections(){return[]}_sectionsSignature(){return""}get _sectionsMemo(){const e=this._sectionsSignature();return this.__secSig===e&&this.__secVal||(this.__secSig=e,this.__secVal=this._sections),this.__secVal}_stableContext(e,t,i){const s={};for(const[e,a]of Object.entries(t))s[e]=i[a];this.__ctx??={};const a=this.__ctx[e];return a&&Object.keys(s).every(e=>a[e]===s[e])?a:(this.__ctx[e]=s,s)}_modeFor(e,t){const i=this._modes?.[e];return i||(Ue(t)?"template":"simple")}_toggleMode(e){const t=this._formData()[e],i=this._modeFor(e,t);this._modes={...this._modes||{},[e]:"template"===i?"simple":"template"}}render(){if(!this.hass||!this._config)return I``;const e=this._formData();return I`
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
    `}_renderField(e,t){const i=t[e.name],s=e.label??De(e),a=!!e.template,n=a?this._modeFor(e.name,i):"simple",o=e.context?this._stableContext(e.name,e.context,t):void 0;let r;return r=a&&"template"===n?I`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${je}
          .value=${i}
          .label=${s}
          .required=${!!e.required}
        ></ha-selector>
      `:e.conditions?I`
        <materia-conditions-field
          class="field-control"
          .hass=${this.hass}
          .value=${i}
          .label=${s}
          .helper=${e.helper}
        ></materia-conditions-field>
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
          .context=${o}
          .required=${!!e.required}
        ></ha-selector>
      `,I`
      ${e.selector?.ui_action?I`<div class="field-caption">${s}</div>`:""}
      <div class="field" @value-changed=${t=>this._fieldChanged(e.name,t)}>
        ${r}
        ${a?I`
              <ha-icon-button
                class="tpl-toggle ${"template"===n?"active":""}"
                .label=${"template"===n?"Use simple input":"Use a template"}
                @click=${()=>this._toggleMode(e.name)}
              >
                <ha-icon icon="mdi:code-braces"></ha-icon>
              </ha-icon-button>
            `:""}
      </div>
    `}_fieldChanged(e,t){t.stopPropagation(),this._setField(e,t.detail?.value)}_setField(e,t){const i={...this._config};""===t||null==t?delete i[e]:i[e]=t,this._commit(i)}_commit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}const Ve=new Set(["cover"]);function Ge(e){if(!e?.entity)return{...e};const t=e.entity.split(".")[0],i={show_sub_buttons:!1,show_stop:!0,show_state:!0,subtitle_inline:!0};return Ve.has(t)&&(i.show_sub_buttons=!0),"light"!==t&&"cover"!==t||(i.show_slider=!0),{...i,...e}}class Xe extends We{static properties={_expandedButton:{state:!0}};static styles=[We.styles,n`
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
    `];static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t}}setConfig(e){super.setConfig(e),this._expandedButton??=null}_formData(){return Ge(this._config)}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const e=this._config?.entity?.split(".")[0],t="cover"===e,i="light"===e;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"image",label:"Image (replaces icon)",template:!0,selector:{text:{}}},{name:"fallback_image",label:"Fallback image (shown instead of the icon when there's no image)",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",template:!0,selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||t?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...t?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(e){return[Ue(e?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${e.map((e,t)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(t)}>
              <span>${e.name||(e.icon&&!Ue(e.icon)?e.icon:`Button ${t+1}`)}</span>
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
                      .computeLabel=${De}
                      @value-changed=${e=>this._subButtonChanged(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}_toggleButton(e){this._expandedButton=this._expandedButton===e?null:e}_addButton(){const e=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:e}),this._expandedButton=e.length-1}_removeButton(e){const t=[...this._config.sub_buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null);const i={...this._config};0===t.length?delete i.sub_buttons:i.sub_buttons=t,this._commit(i)}_subButtonChanged(e,t){const i=[...this._config.sub_buttons||[]];i[e]={...i[e],...t},this._commit({...this._config,sub_buttons:i})}}customElements.define("materia-card-editor",Xe);const Ye={light:{showSlider:!0,activeState:"on",colorActive:"var(--md-sys-cust-color-light-container)",colorOn:"var(--md-sys-cust-color-on-light)",sliderColor:"var(--md-sys-cust-color-light)"},cover:{showSlider:!0,showSubButtons:!0,activeState:"open",colorActive:"var(--md-sys-cust-color-device-container)",colorOn:"var(--md-sys-cust-color-on-device)",sliderColor:"var(--md-sys-cust-color-device)"},switch:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},fan:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},lock:{activeState:["locked","locking"],colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},vacuum:{activeState:"cleaning",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},climate:{activeState:"heat",colorActive:"var(--md-sys-cust-color-climate-heat-container)",colorOn:"var(--md-sys-cust-color-on-climate-heat)"},media_player:{activeState:"playing",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},scene:{variant:"tonal",activeState:"__never__"},input_boolean:{activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"},alarm_control_panel:{activeState:"armed_away",colorActive:"var(--md-sys-color-error-container)",colorOn:"var(--md-sys-color-on-error-container)"}},Ke={activeState:"on",colorActive:"var(--md-sys-cust-color-device)",colorOn:"var(--md-sys-cust-color-on-device)"};class Ze extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedImage:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedShowState:{state:!0}};static getConfigElement(){return document.createElement("materia-card-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t}}setConfig(e){const t=e.entity?e.entity.split(".")[0]:"",i=Ye[t]||Ke,s=e.entity?{tap_action:{action:"toggle"}}:{};e.entity&&i.showSubButtons&&(s.show_sub_buttons=!0,s.show_stop=!0),this.config={...s,...e}}get _domain(){return this.config.entity?.split(".")[0]||""}get _domainConfig(){return Ye[this._domain]||Ke}get _stateObj(){return this.hass?.states?.[this.config.entity]}get _isActive(){const e=this._stateObj?.state,t=this.config.active_state||this._domainConfig.activeState;return"__never__"!==t&&(Array.isArray(t)?t.includes(e):e===t)}get _variant(){return this._domainConfig.variant||"filled"}get _isTonal(){return"tonal"===this._variant}get _isDimmable(){if("light"!==this._domain)return!1;const e=this._stateObj?.attributes;if(!e)return!1;return!!(e.supported_color_modes||[]).some(e=>"onoff"!==e)||void 0!==e.brightness}get _showSlider(){return!this._isTonal&&(void 0!==this.config.show_slider?this.config.show_slider:"light"===this._domain?this._isDimmable:"cover"===this._domain||(this._domainConfig.showSlider||!1))}get _subButtons(){const e=this.config.sub_buttons;if(Array.isArray(e))return e;if(!(void 0!==this.config.show_sub_buttons?this.config.show_sub_buttons:this._domainConfig.showSubButtons||!1))return[];if("cover"===this._domain){const e=this.config.entity,t=[{icon:"mdi:arrow-up",tap_action:{action:"perform-action",perform_action:"cover.open_cover",target:{entity_id:e}}}];return!1!==this.config.show_stop&&t.push({icon:"mdi:stop",tap_action:{action:"perform-action",perform_action:"cover.stop_cover",target:{entity_id:e}}}),t.push({icon:"mdi:arrow-down",tap_action:{action:"perform-action",perform_action:"cover.close_cover",target:{entity_id:e}}}),t}return[]}get _fillPercent(){const e=this._stateObj;if(!e)return 0;if("light"===this._domain){const t=e.attributes?.brightness??0;return Math.round(t/255*100)}return"cover"===this._domain?e.attributes?.current_position??0:0}get _name(){return this.config.name?this._isTemplate(this.config.name)?this._resolvedName:this.config.name:this._stateObj?.attributes?.friendly_name||this.config.entity}get _icon(){return this.config.icon?this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon:"lock"===this._domain?this._isActive?"m3o:lock":"m3o:lock-open-right":void 0}get _image(){return this.config.image?this._isTemplate(this.config.image)?this._resolvedImage||"":this.config.image:""}get _subtitle(){const e=this.config.subtitle;return e?this._isTemplate(e)?this._resolvedSubtitle:e:""}_relativeLastChanged(){const e=this._stateObj;if(!e?.last_changed)return"";const t=(Date.now()-new Date(e.last_changed))/1e3;if(t<60)return"just now";const i=Math.floor(t/60);if(i<60)return`${i} minute${1===i?"":"s"} ago`;const s=Math.floor(t/3600);if(s<24)return`${s} hour${1===s?"":"s"} ago`;const a=Math.floor(t/86400);return`${a} day${1===a?"":"s"} ago`}_baseStateDisplay(){const e=this._stateObj;if(!e)return"";const t=this._domain;if("scene"===t)return"";if("light"===t){if("on"!==e.state)return $e("state_off",this.hass);if(this._isDimmable){return`${Math.round((e.attributes?.brightness??0)/255*100)}%`}return $e("state_on",this.hass)}if("cover"===t){const t=e.attributes?.current_position;return 0===t||"closed"===e.state?$e("state_closed",this.hass):100===t?$e("state_open",this.hass):null!=t?`${$e("state_open",this.hass)} · ${t}%`:this._capitalize(e.state)}if("lock"===t){return{locked:$e("state_locked",this.hass),unlocked:$e("state_unlocked",this.hass),locking:$e("state_locking",this.hass),unlocking:$e("state_unlocking",this.hass),jammed:$e("state_jammed",this.hass)}[e.state]||this._capitalize(e.state)}const i=e.state,s=Number(i);if(""!==i&&null!=i&&!Number.isNaN(s)){const t=Math.round(100*s)/100,i=e.attributes?.unit_of_measurement;return i?"%"===i?`${t}%`:`${t} ${i}`:`${t}`}return this.hass.formatEntityState?this.hass.formatEntityState(e):this._capitalize(String(i).replace(/[_-]/g," "))}get _showState(){const e=this.config.show_state;if(!1===e)return!1;if(this._isTemplate(e)){if(void 0===this._resolvedShowState)return!0;const e=String(this._resolvedShowState).trim().toLowerCase();return!["false","off","none","no","0","hide",""].includes(e)}return!0}get _stateDisplay(){let e=this._showState?this._baseStateDisplay():"";if(this.config.show_last_changed){const t=this._relativeLastChanged();t&&(e=e?`${e} · ${t}`:t)}return e}_getContainerBg(){if(this._isTonal)return"var(--md-sys-color-secondary-container)";const e=this._resolvedColor||this.config.color;return this._isActive?e||("light"!==this._domain||this._isDimmable?this._domainConfig.colorActive:this._domainConfig.sliderColor||this._domainConfig.colorActive):"var(--ha-card-background, var(--card-background-color))"}_getTextColor(){if(this._isTonal)return"var(--md-sys-color-on-secondary-container)";const e=this._resolvedColorOn||this.config.color_on;return this._isActive?e||this._domainConfig.colorOn:"var(--primary-text-color)"}get _templatesReady(){const e=this.config;return(!this._isTemplate(e?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(e?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(e?.icon)||void 0!==this._resolvedIcon)&&((!this._isTemplate(e?.image)||void 0!==this._resolvedImage)&&(!this._isTemplate(e?.name)||void 0!==this._resolvedName))))}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("image","_resolvedImage"),this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("show_state","_resolvedShowState"))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSlider()}_getContainer(){return this.shadowRoot?.querySelector(".container")}_getEventX(e){return void 0!==e.clientX&&0!==e.clientX?e.clientX:e.changedTouches?.[0]?e.changedTouches[0].clientX:e.touches?.[0]?e.touches[0].clientX:e.clientX||0}_getSliderRect(){const e=this._sliderFrameId||0;if(this._sliderRectCache&&this._sliderRectCacheFrame===e)return this._sliderRectCache;const t=this._getContainer()?.getBoundingClientRect();return this._sliderRectCache=t,this._sliderRectCacheFrame=e,this._sliderFrameRaf||(this._sliderFrameRaf=requestAnimationFrame(()=>{this._sliderFrameId=(this._sliderFrameId||0)+1,this._sliderFrameRaf=null})),t}_pctFromPointer(e){const t=this._getSliderRect();if(!t)return 0;const i=this._getEventX(e);return Math.max(0,Math.min(100,(i-t.left)/t.width*100))}_updateFillVisual(e){const t=this.shadowRoot?.querySelector(".fill");t&&(t.style.width=`${e}%`)}_onPointerDown(e){e.button&&0!==e.button||e.isPrimary&&(e.target.closest("button, .sub-btn")||"touch"===e.pointerType&&e.clientX<=30||(this._startX=e.clientX,this._startY=e.clientY,this._dragging=!1,this._scrollIntent=!1,this._pointerId=e.pointerId,this._sliderRectCache=null,this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),this._longPressTimer=setTimeout(()=>{this._longPressTimer=null,this._scrollIntent||this._startDrag(e)},200),this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef)))}_onEarlyMove(e){if(this._dragging||this._scrollIntent)return;const t=Math.abs(e.clientX-this._startX),i=Math.abs(e.clientY-this._startY);if(i>10&&i>t+4)return this._scrollIntent=!0,void this._abortSlider();t>6&&t>=i&&(clearTimeout(this._longPressTimer),this._longPressTimer=null,this._startDrag(e))}_startDrag(e){if(this._dragging)return;this._dragging=!0,this._dragStartTime=Date.now(),this._sliderRectCache=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null);const t=this._getContainer();try{t?.setPointerCapture(this._pointerId)}catch(e){}t?.classList.add("is-dragging"),document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),this._onDragMoveRef=this._onDragMove.bind(this),window.addEventListener("pointermove",this._onDragMoveRef),t&&t.addEventListener("touchmove",this._preventTouch,{passive:!1}),this._onVisibilityRef=()=>{document.hidden&&this._cleanupSlider()},document.addEventListener("visibilitychange",this._onVisibilityRef);const i=this._pctFromPointer(e);this._updateFillVisual(i),this._throttledSetValue(i)}_preventTouch(e){e.preventDefault()}_onDragMove(e){"touch"===e.pointerType&&e.preventDefault();const t=this._pctFromPointer(e);this._updateFillVisual(t),this._throttledSetValue(t)}_onPointerUp(e){if(null!=this._startX){if("pointercancel"===e.type&&this._dragStartTime&&Date.now()-this._dragStartTime<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._cleanupSlider(),400));if(clearTimeout(this._graceTimer),this._dragging){const t=this._pctFromPointer(e);this._updateFillVisual(t),this._setSliderValue(t),this._fireHaptic("light")}else this._scrollIntent||this._handleTap();this._cleanupSlider()}}_abortSlider(){clearTimeout(this._longPressTimer),this._longPressTimer=null,this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null)}_cleanupSlider(){clearTimeout(this._graceTimer),this._abortSlider(),this._startX=null,this._dragging=!1,this._scrollIntent=!1,this._dragStartTime=null,this._sliderRectCache=null,this._throttleTimeout&&(clearTimeout(this._throttleTimeout),this._throttleTimeout=null);const e=this._getContainer();e?.classList.remove("is-dragging"),document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),e&&e.removeEventListener("touchmove",this._preventTouch);try{e?.releasePointerCapture(this._pointerId)}catch(e){}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onDragMoveRef&&(window.removeEventListener("pointermove",this._onDragMoveRef),this._onDragMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_throttledSetValue(e){const t=Date.now();if(this._lastSliderArgs=e,this._throttleTimeout)return;t-(this._lastSliderCall||0)>=200?(this._lastSliderCall=t,this._setSliderValue(e)):this._throttleTimeout=setTimeout(()=>{this._throttleTimeout=null,this._lastSliderCall=Date.now(),this._setSliderValue(this._lastSliderArgs)},200)}_setSliderValue(e){if(!this.hass)return;const t=this.config.entity;if("light"===this._domain){let i=e;!this.config.slider_turn_off&&i<1&&(i=1);const s=Math.round(i/100*255);return void(s<=3&&this.config.slider_turn_off?this._callService("light","turn_off",{entity_id:t}):this._callService("light","turn_on",{entity_id:t,brightness:Math.max(s,1)}))}"cover"!==this._domain||this._callService("cover","set_cover_position",{entity_id:t,position:Math.max(0,Math.min(100,Math.round(e)))})}_handleSubButton(e,t){t.stopPropagation(),this._handleAction(e.tap_action)}_handleTap(){this.config.tap_action?this._handleAction(this.config.tap_action):this.config.entity&&this._callService("homeassistant","toggle",{entity_id:this.config.entity})}render(){if(!this.config||!this.hass)return I``;const e=this._stateObj,t=!!this.config.entity&&this._isUnavailable(e);!t&&this._isActive,this._isTonal;const i=!t&&this._showSlider,s=t?[]:this._subButtons,a=this._getContainerBg(),n=this._getTextColor(),o=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=this._image,d=this.config.fallback_image,h=[c,d&&d!==c?d:null].filter(Boolean).map(e=>`url('${e}')`).join(", "),p=t?$e("unavailable",this.hass):this._stateDisplay,u=this._subtitle,m=!1!==this.config.subtitle_inline,g=m&&u?p?`${p} · ${u}`:u:p;return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${a}; color: ${n};"
          @pointerdown=${i?this._onPointerDown:void 0}
          @click=${i?void 0:()=>this._handleTap()}
        >
          ${i?I`
                <div
                  class="fill"
                  style="width: ${o}%; background-color: ${r}; opacity: 1;"
                ></div>
              `:""}

          <div class="icon-container">
            ${h?I`<div class="thumb" style="background-image: ${h};"></div>`:l?I`<ha-icon .icon=${l} style="color: ${n};"></ha-icon>`:I`<ha-state-icon
                    .hass=${this.hass}
                    .stateObj=${e}
                    style="color: ${n};"
                  ></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${!m&&u?I`<div class="subtitle">${u}</div>`:""}
            ${g?I`<div class="state">${g}</div>`:""}
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
              `:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}static styles=[Ee,ze,Me,Oe,Ae,Fe]}customElements.define("materia-card",Ze),window.customCards=window.customCards||[],window.customCards.push({type:"materia-card",name:"Materia Card",description:"Universal entity card. Auto-detects lights, covers, devices, locks, and scenes.",preview:!0});const Je=n`
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
`;class Qe extends We{static properties={_selectedCard:{state:!0},_expandedButton:{state:!0}};static styles=[We.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._selectedCard??=-1,this._expandedButton??=null}_formData(){return{columns:2,...Ge(this._config)}}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const e=this._config?.entity?.split(".")[0],t="cover"===e,i="light"===e;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"columns",selector:{number:{min:1,max:6,mode:"slider"}}},{name:"color",label:"Active background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Active text / icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_last_changed",label:"Show last changed",selector:{boolean:{}}},{name:"subtitle_inline",label:"Subtitle inline with state",selector:{boolean:{}}},...i||t?[{name:"show_slider",selector:{boolean:{}}}]:[],...i?[{name:"slider_turn_off",label:"Slider can turn off",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...t?[{name:"show_stop",label:"Show stop",selector:{boolean:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(e){return[Ue(e?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"Label (optional)",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=this._config.cards||[],t=e.length,i=this._selectedCard,s=i===t,a=i>=0&&i<t,n=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return I`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${n.map((e,t)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleSubButton(t)}>
              <span>${e.name||(e.icon&&!Ue(e.icon)?e.icon:`Button ${t+1}`)}</span>
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
                      .computeLabel=${De}
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
            `:a?I`
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
    `}_toggleSubButton(e){this._expandedButton=this._expandedButton===e?null:e}_addSubButton(){const e=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:e}),this._expandedButton=e.length-1}_removeSubButton(e){const t=[...this._config.sub_buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null);const i={...this._config};0===t.length?delete i.sub_buttons:i.sub_buttons=t,this._commit(i)}_subButtonChanged(e,t){const i=[...this._config.sub_buttons||[]];i[e]={...i[e],...t},this._commit({...this._config,sub_buttons:i})}_handleCardPicked(e){e.stopPropagation();const t=[...this._config.cards||[],e.detail.config];this._selectedCard=t.length-1,this._commit({...this._config,cards:t})}_handleChildChanged(e){if(e.stopPropagation(),e.detail.error)return;const t=[...this._config.cards||[]];t[this._selectedCard]=e.detail.config,this._commit({...this._config,cards:t})}_moveCard(e){const t=[...this._config.cards||[]],i=this._selectedCard,s=i+e;if(s<0||s>=t.length)return;const[a]=t.splice(i,1);t.splice(s,0,a),this._selectedCard=s,this._commit({...this._config,cards:t})}_removeCard(){const e=[...this._config.cards||[]];e.splice(this._selectedCard,1),this._selectedCard=Math.max(0,Math.min(this._selectedCard,e.length-1)),0===e.length&&(this._selectedCard=-1),this._commit({...this._config,cards:e})}}customElements.define("materia-room-editor",Qe);class et extends Ze{static properties={...Ze.properties,_expanded:{state:!0},_childCards:{state:!0}};static styles=[Ee,ze,Me,Oe,Ae,Fe,Je];static getConfigElement(){return document.createElement("materia-room-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t,columns:2,cards:[]}}constructor(){super(),this._expanded=!1,this._childCards=null}setConfig(e){if(!e.entity)throw new Error("entity is required");const t=this.config?.cards;this.config={columns:2,...e};const i=this.config.cards;JSON.stringify(t)!==JSON.stringify(i)&&(this._childCards=null,this.isConnected&&this._createChildCards())}firstUpdated(){this._createChildCards()}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&this._childCards&&this._childCards.forEach(e=>e.hass=this.hass)}async _createChildCards(){const e=this.config?.cards;if(!e||0===e.length)return void(this._childCards=[]);const t=await pe();this._childCards=await Promise.all(e.map(async e=>{const i=await t.createCardElement(e);return this.hass&&(i.hass=this.hass),i})),this.requestUpdate()}_toggleExpand(e){e?.stopPropagation?.(),this._expanded=!this._expanded,this._fireHaptic("selection")}render(){if(!this.config||!this.hass)return I``;const e=this._stateObj,t=this._isUnavailable(e);!t&&this._isActive;const i=!t&&this._showSlider,s=t?[]:this._subButtons,a=this._getContainerBg(),n=this._getTextColor(),o=i?this._fillPercent:0,r=this._domainConfig.sliderColor||this._domainConfig.colorActive,l=this._icon,c=t?$e("unavailable",this.hass):this._stateDisplay,d=this._subtitle,h=!1!==this.config.subtitle_inline,p=h&&d?c?`${c} · ${d}`:d:c,u=this.config.columns||2;return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""} ${i?"slider-active":""}"
          style="background-color: ${a}; color: ${n};"
          @pointerdown=${i?this._onPointerDown:void 0}
          @click=${i?void 0:()=>this._handleTap()}
        >
          ${i?I`<div class="fill" style="width: ${o}%; background-color: ${r}; opacity: 1;"></div>`:V}

          <div class="icon-container">
            ${l?I`<ha-icon .icon=${l} style="color: ${n};"></ha-icon>`:I`<ha-state-icon .hass=${this.hass} .stateObj=${e} style="color: ${n};"></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${!h&&d?I`<div class="subtitle">${d}</div>`:V}
            ${p?I`<div class="state">${p}</div>`:V}
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
    `}getCardSize(){return this._expanded?3+(this._childCards?.length||0):2}getGridOptions(){return{columns:12,rows:"auto"}}}customElements.define("materia-room",et),window.customCards=window.customCards||[],window.customCards.push({type:"materia-room",name:"Materia Room",description:"Materia card with expandable child-card grid.",preview:!0});const tt=n`
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
`;customElements.define("materia-climate-editor",class extends We{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,template:!0,selector:{text:{}}}]},{title:"Sensors",icon:"mdi:thermometer",fields:[{name:"temperature_entity",label:"Temperature sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",label:"Outdoor temperature sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}]}});class it extends(Te(ce)){static get properties(){return{hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_resolvedName:{state:!0}}}static styles=[Ee,Ae,tt];static getConfigElement(){return document.createElement("materia-climate-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("climate."))||"climate.example";return{entity:t,name:"Climate",step:.5}}setConfig(e){if(!e.entity)throw new Error("entity is required");if(!e.name)throw new Error("name is required");this.config={step:.5,...e}}getCardSize(){return 3}get _entity(){return this.hass?.states[this.config.entity]}get _mode(){return this._entity?.state??"off"}get _targetTemp(){return null!=this._optimisticTemp?this._optimisticTemp:this._entity?.attributes?.temperature}get _currentTemp(){return this.config.temperature_entity?this.hass?.states[this.config.temperature_entity]?.state:this._entity?.attributes?.current_temperature}get _humidity(){if(this.config.humidity_entity)return this.hass?.states[this.config.humidity_entity]?.state}get _outdoorTemp(){if(this.config.outdoor_temp_entity)return this.hass?.states[this.config.outdoor_temp_entity]?.state}_modeIcon(){switch(this._mode){case"heat":return"mdi:fire";case"cool":return"mdi:snowflake";case"auto":return"mdi:autorenew";default:return"mdi:power"}}_modeBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat-container)";case"cool":return"var(--md-sys-cust-color-climate-cool-container)";case"auto":return"var(--md-sys-cust-color-climate-auto-container)";default:return"var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant))"}}_modeColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool)";case"auto":return"var(--md-sys-cust-color-on-climate-auto)";default:return"var(--primary-text-color)"}}_buttonBg(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-climate-heat)";case"cool":return"var(--md-sys-cust-color-climate-cool)";case"auto":return"var(--md-sys-cust-color-climate-auto)";default:return"var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant))"}}_buttonColor(){switch(this._mode){case"heat":return"var(--md-sys-cust-color-on-climate-heat)";case"cool":return"var(--md-sys-cust-color-on-climate-cool, #fff)";case"auto":return"var(--md-sys-cust-color-on-climate-auto, #000)";default:return"var(--md-sys-color-on-surface)"}}_statusText(){const e=this._currentTemp,t=this._humidity,i=this._outdoorTemp,s=[];return null!=e&&s.push(`${e}°`),null!=t&&s.push(`${t}%`),null!=i&&s.push(`${i}°`),s.join(" · ")||""}_adjustTemp(e){const t=this._targetTemp;if(null==t)return;const i=this.config.step??.5,s=Number(this._entity?.attributes?.min_temp??7),a=Number(this._entity?.attributes?.max_temp??35),n=Math.min(a,Math.max(s,Math.round((Number(t)+e)/i)*i));this._optimisticTemp=n,this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:n}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4)}updated(e){if(e.has("hass")&&this.hass&&this._resolveField("name","_resolvedName"),e.has("hass")&&null!=this._optimisticTemp){const e=Number(this._entity?.attributes?.temperature);Number.isFinite(e)&&Math.abs(e-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer)}_handleTap(e){e.target.closest(".btn")||this._handleAction(this.config.tap_action??{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const e=this._entity,t=this._isUnavailable(e),i="off"===this._mode||t,s=t?"Unavailable":i?"Off":null!=this._targetTemp?Math.round(this._targetTemp):"—";return I`
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
              ></ha-icon>`:V}
        </div>

        <div class="center">
          <div class="center-side">
            ${i?V:I`
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
            ${i?V:I`
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
    `}}customElements.define("materia-climate",it),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate",name:"Materia Climate",description:"Climate thermostat with mode-based theming and temperature controls.",preview:!0});const st=[Ee,ze,Ae,n`
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
`];customElements.define("materia-weather-editor",class extends We{_formData(){return{show_temperature:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Sensors",icon:"mdi:water-percent",fields:[{name:"show_temperature",label:"Show temperature",selector:{boolean:{}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",label:"Humidity sensor",selector:{entity:{domain:"sensor"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const at={sunny:"m3o:sunny",clear:"m3o:sunny","clear-night":"mdi:weather-night",partlycloudy:"m3o:partly-cloudy-day",partly_cloudy:"m3o:partly-cloudy-day",cloudy:"m3o:cloud",rainy:"m3o:rainy",pouring:"m3o:rainy",snowy:"mdi:weather-snowy",fog:"m3o:foggy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",hail:"mdi:weather-hail",exceptional:"mdi:alert-circle-outline"},nt={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class ot extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-weather-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}static styles=st;setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"))}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"",s=!1!==this.config.show_temperature;let a=e?.attributes?.temperature,n=e?.attributes?.temperature_unit||"°";if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&(a=e.state,n=e.attributes?.unit_of_measurement||n)}const o=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||at[i]||"mdi:weather-partly-cloudy";let r=null;if(this.config.humidity_entity){const e=this.hass.states[this.config.humidity_entity];e&&(r=e.state)}null==r&&null!=e?.attributes?.humidity&&(r=e.attributes.humidity);const l=nt[i]||this._capitalize(i.replace(/-|_/g," ")),c=this._isTemplate(this.config.name)?this._resolvedName:this.config.name,d=s&&null!=a?`${a}${n}`:null;let h;h=t?"Unavailable":c||(d||(l||"—"));const p=[];t||(d&&h!==d&&p.push(d),h!==l&&p.push(l),null!=r&&p.push(`${r}%`));const u=p.join(" · ");return I`
      <ha-card>
        <div
          class="container ${t?"unavailable":""}"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${o}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${h}</div>
            <div class="state">${u}</div>
          </div>
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}function rt(e,t,i,s=12){return lt(e,t,i,{vertices:s,innerRadius:.8,rounding:.5,rotate:-Math.PI/2})}function lt(e,t,i,{vertices:s,innerRadius:a=null,rounding:n=.2,rotate:o=0}={}){const r=[],l=null!=a?2*s:s;for(let s=0;s<l;s++){const c=null!=a&&s%2==1?i*a:i,d=o+s/l*Math.PI*2;r.push({x:e+c*Math.cos(d),y:t+c*Math.sin(d),r:n*i})}return function(e){return dt(ct(e))}(r)}function ct(e){const t=e.length,i=[];for(let s=0;s<t;s++){const a=e[(s-1+t)%t],n=e[s],o=e[(s+1)%t],r=[a.x-n.x,a.y-n.y],l=[o.x-n.x,o.y-n.y],c=Math.hypot(...r),d=Math.hypot(...l);r[0]/=c,r[1]/=c,l[0]/=d,l[1]/=d;const h=r[0]*l[0]+r[1]*l[1],p=Math.acos(Math.min(1,Math.max(-1,h)))/2;let u=n.r/Math.tan(p);u=Math.min(u,.5*c,.5*d);const m=u*Math.tan(p),g=[n.x+r[0]*u,n.y+r[1]*u],f=[n.x+l[0]*u,n.y+l[1]*u],_=r[0]+l[0],b=r[1]+l[1],v=Math.hypot(_,b)||1,y=m/Math.sin(p),x=[n.x+_/v*y,n.y+b/v*y],w=r[0]*l[1]-r[1]*l[0];i.push({T1:g,T2:f,C:x,rEff:m,sweep:w>0?0:1})}return i}function dt(e){const t=e.length;let i=`M${e[0].T1[0].toFixed(2)} ${e[0].T1[1].toFixed(2)} `;for(let s=0;s<t;s++){const a=e[s],n=e[(s+1)%t];i+=`A${a.rEff.toFixed(2)} ${a.rEff.toFixed(2)} 0 0 ${a.sweep} ${a.T2[0].toFixed(2)} ${a.T2[1].toFixed(2)} `,i+=`L${n.T1[0].toFixed(2)} ${n.T1[1].toFixed(2)} `}return i+"Z"}function ht(e,t,i,s=0){return pt(e,t,i,s,[{x:.193,y:.277,r:.053},{x:.176,y:.055,r:.053}],10)}function pt(e,t,i,s,a,n){const o=[];for(let e=0;e<n;e++){const t=s+e/n*Math.PI*2,i=Math.cos(t),r=Math.sin(t);for(const e of a){const t=e.x-.5,s=e.y-.5;o.push({x:.5+t*i-s*r,y:.5+t*r+s*i,r:e.r})}}const r=ct(o),l=[];for(const e of r){const t=Math.atan2(e.T1[1]-e.C[1],e.T1[0]-e.C[0]);let i=Math.atan2(e.T2[1]-e.C[1],e.T2[0]-e.C[0])-t;if(1===e.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=8;s++){const a=t+i*s/8;l.push([e.C[0]+e.rEff*Math.cos(a),e.C[1]+e.rEff*Math.sin(a)])}}const c=Math.max(...l.map(([e,t])=>Math.hypot(e-.5,t-.5))),d=i/c,h=i=>[e+(i[0]-.5)*d,t+(i[1]-.5)*d];return dt(r.map(e=>({T1:h(e.T1),T2:h(e.T2),C:h(e.C),rEff:e.rEff*d,sweep:e.sweep})))}function ut(e,t,i,{points:s,reps:a=1,mirroring:n=!1,rotate:o=0}){const r=function(e,t,i,s=.5,a=.5){const n=[];if(!i){const i=e.length;for(let o=0;o<i*t;o++){const r=e[o%i],l=360*Math.floor(o/i)/t*(Math.PI/180),c=r.x-s,d=r.y-a;n.push({x:s+c*Math.cos(l)-d*Math.sin(l),y:a+c*Math.sin(l)+d*Math.cos(l),r:r.r})}return n}const o=e.map(e=>180*Math.atan2(e.y-a,e.x-s)/Math.PI),r=e.map(e=>Math.hypot(e.x-s,e.y-a)),l=2*t,c=360/l;for(let t=0;t<l;t++){const i=t%2==0;for(let l=0;l<e.length;l++){const d=i?l:e.length-1-l;if(!(d>0||i))continue;const h=(c*t+(i?o[d]:c-o[d]+2*o[0]))*(Math.PI/180);n.push({x:s+Math.cos(h)*r[d],y:a+Math.sin(h)*r[d],r:e[d].r})}}return n}(s,a,n),l=Math.cos(o),c=Math.sin(o),d=r.map(e=>{const t=e.x-.5,i=e.y-.5;return{x:.5+t*l-i*c,y:.5+t*c+i*l,r:e.r}}),h=ct(d),p=function(e){let t=1/0,i=1/0,s=-1/0,a=-1/0;const n=(e,n)=>{e<t&&(t=e),e>s&&(s=e),n<i&&(i=n),n>a&&(a=n)};for(const t of e){const e=Math.atan2(t.T1[1]-t.C[1],t.T1[0]-t.C[0]);let i=Math.atan2(t.T2[1]-t.C[1],t.T2[0]-t.C[0])-e;if(1===t.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=16;s++){const a=e+i*s/16;n(t.C[0]+t.rEff*Math.cos(a),t.C[1]+t.rEff*Math.sin(a))}}return{minX:t,minY:i,maxX:s,maxY:a}}(h),u=p.maxX-p.minX,m=p.maxY-p.minY,g=i/Math.max(u,m),f=(p.minX+p.maxX)/2,_=(p.minY+p.maxY)/2,b=i=>[e+(i[0]-f)*g,t+(i[1]-_)*g];return dt(h.map(e=>({T1:b(e.T1),T2:b(e.T2),C:b(e.C),rEff:e.rEff*g,sweep:e.sweep})))}function mt(e,t,i,s,a){const n=s=>{const a=(s-90)*Math.PI/180;return[e+i*Math.cos(a),t+i*Math.sin(a)]},[o,r]=n(s),[l,c]=n(a),d=Math.abs(a-s)>180?1:0;return`M${o.toFixed(2)} ${r.toFixed(2)} A${i} ${i} 0 ${d} 1 ${l.toFixed(2)} ${c.toFixed(2)}`}function gt(e,t,i,s){const a=Math.cos(2*Math.PI*s);if(s<.02||s>.98)return"";const n=Math.max(.01,Math.abs(a)*i).toFixed(2),o=`${e} ${t-i}`,r=`${e} ${t+i}`;return s<=.5?`M${o} A${i} ${i} 0 0 1 ${r} A${n} ${i} 0 0 ${a>0?0:1} ${o} Z`:`M${o} A${i} ${i} 0 0 0 ${r} A${n} ${i} 0 0 ${a>0?1:0} ${o} Z`}function ft(e,t){const i={new_moon:0,waxing_crescent:.125,first_quarter:.25,waxing_gibbous:.375,full_moon:.5,waning_gibbous:.625,last_quarter:.75,waning_crescent:.875},s=t?e?.states?.[t]:e?.states?.["sensor.moon_phase"]??e?.states?.["sensor.moon"];return s&&s.state in i?i[s.state]:null}customElements.define("materia-weather",ot),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather",name:"Materia Weather",description:"Weather condition card with automatic icon mapping.",preview:!0});const _t="var(--md-sys-cust-color-weather-sun, #FFC83D)",bt="var(--md-sys-cust-color-weather-cloud, #E6EAF0)",vt="var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)",yt="var(--md-sys-cust-color-weather-rain, #5FA8F5)",xt="var(--md-sys-cust-color-weather-sun, #FFC83D)",wt="var(--md-sys-cust-color-weather-moon, #DCE3F7)";let kt=0;function $t(e,t,i,s){const a=.1*i,n=72,o=[];for(let s=0;s<n;s++){const r=s/n*Math.PI*2,l=i+a*Math.cos(9*r);o.push([e+l*Math.cos(r),t+l*Math.sin(r)])}let r=`M${o[0][0].toFixed(2)} ${o[0][1].toFixed(2)} `;for(let e=0;e<n;e++){const t=o[(e-1+n)%n],i=o[e],s=o[(e+1)%n],a=o[(e+2)%n],l=i[0]+(s[0]-t[0])/6,c=i[1]+(s[1]-t[1])/6,d=s[0]-(a[0]-i[0])/6,h=s[1]-(a[1]-i[1])/6;r+=`C${l.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} `}return H`<path d=${r+"Z"} fill=${s} />`}function Ct(e,t,i,s){return H`
    <g fill=${s} transform=${`translate(${e} ${t}) scale(${i})`}>
      <circle cx="-4" cy="1" r="4" />
      <circle cx="1" cy="-1.5" r="5" />
      <circle cx="5" cy="1.5" r="3.6" />
      <rect x="-6.2" y="1.2" width="13.4" height="5" rx="2.6" />
    </g>`}function St(e,t,i){return H`<g stroke=${e} stroke-width="1.8" stroke-linecap="round">
    ${t.map(e=>H`<line x1=${e} y1=${i} x2=${e-1.5} y2=${i+3.5} />`)}
  </g>`}function Tt(e,t){return H`<g fill=${"var(--md-sys-cust-color-weather-snow, #FFFFFF)"}>
    ${e.map(e=>H`<circle cx=${e} cy=${t} r="1.2" />`)}
  </g>`}const zt={sunny:e=>$t(12,12,7.5,e.sun),clear:e=>$t(12,12,7.5,e.sun),"clear-night":(e,t)=>{if(null==t)return H`<path d="M17 14.5 A7 7 0 1 1 10.5 5 A5.5 5.5 0 0 0 17 14.5 Z" fill=${e.moon} />`;const i=gt(12,12,7.2,t);return H`
      <circle cx="12" cy="12" r="7.2" fill="color-mix(in srgb, ${wt} 22%, transparent)" />
      ${i?H`<path d=${i} fill=${e.moon} />`:""}`},partlycloudy:e=>H`${$t(12,8,5.2,e.sun)}${Ct(10,15,.85,e.cloud)}`,partly_cloudy:e=>H`${$t(12,8,5.2,e.sun)}${Ct(10,15,.85,e.cloud)}`,cloudy:e=>Ct(12,12,1.1,e.cloudDk),rainy:e=>H`${Ct(12,10,1,e.cloudDk)}${St(yt,[8,12,16],17)}`,pouring:e=>H`${Ct(12,9.5,1,e.cloudDk)}${St(yt,[7,10,13,16],16.5)}`,snowy:e=>H`${Ct(12,10,1,e.cloud)}${Tt([8,12,16],18)}`,"snowy-rainy":e=>H`${Ct(12,10,1,e.cloud)}${St(yt,[9,15],17)}${Tt([12],18)}`,fog:e=>H`${Ct(12,9,.95,e.cloudDk)}<g stroke=${"var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)"} stroke-width="1.8" stroke-linecap="round">
      <line x1="6" y1="17" x2="18" y2="17" /><line x1="7.5" y1="20" x2="16.5" y2="20" /></g>`,hail:e=>H`${Ct(12,10,1,e.cloudDk)}${Tt([8,12,16],18)}`,lightning:e=>H`${Ct(12,10,1,e.cloudDk)}<path d="M12 14 l-2.5 5 h2 l-1 4 4.5-6.5 h-2.2 l1.5-2.5 z" fill=${xt} />`,"lightning-rainy":e=>H`${Ct(12,9.5,1,e.cloudDk)}${St(yt,[8,16],17)}<path d="M12 14 l-2 4 h1.8 l-0.8 3.5 4-5.5 h-2 l1.3-2 z" fill=${xt} />`,windy:()=>H`<g stroke=${vt} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,"windy-variant":()=>H`<g stroke=${vt} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,exceptional:e=>Ct(12,12,1.1,e.cloudDk)};function At(e,t=null){const i=zt[e]||zt.cloudy,s=++kt;return H`${function(e){return H`<defs>
    <radialGradient id="wxSunG-${e}" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${_t} 55%, #FFF4CF)" />
      <stop offset="55%" stop-color=${_t} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${_t} 72%, #B85C00)" />
    </radialGradient>
    <linearGradient id="wxCloudG-${e}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${bt} 30%, #FFFFFF)" />
      <stop offset="70%" stop-color=${bt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${bt} 78%, #8B94A5)" />
    </linearGradient>
    <linearGradient id="wxCloudDkG-${e}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${vt} 45%, #FFFFFF)" />
      <stop offset="70%" stop-color=${vt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${vt} 72%, #5A6474)" />
    </linearGradient>
    <radialGradient id="wxMoonG-${e}" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${wt} 45%, #FFFFFF)" />
      <stop offset="60%" stop-color=${wt} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${wt} 62%, #4A5AB8)" />
    </radialGradient>
  </defs>`}(s)}${i(function(e){return{sun:`url(#wxSunG-${e})`,cloud:`url(#wxCloudG-${e})`,cloudDk:`url(#wxCloudDkG-${e})`,moon:`url(#wxMoonG-${e})`}}(s),t)}`}const Et=[Ee,ze,n`
  ha-card {
    background: none;
    border: none;
    box-shadow: none;
    height: 100%;
    /* Let the tilted pill extend past the card box. */
    overflow: visible;
  }

  /* THE TILT IS DECORATION, NOT LAYOUT — and everything else follows from it.

     Earlier versions rotated .blob itself, so the readout and glyph lived in
     a rotated space and each had to counter-rotate to stay upright. That
     made manual positioning nearly impossible to reason about: a
     counter-rotated box's BOUNDING box is far larger than its content (a
     50x37cqi readout turned 45deg occupies ~62cqi square) so it clipped
     against the pill's curve, and the anchors mixed % of HEIGHT with cqi
     sizes (% of WIDTH), which agree at exactly one aspect ratio.

     Now the pill is a ::before layer carrying the rotation alone, and the
     content is upright and unrotated. That is what makes the offsets below
     honest: they are plain screen-space nudges from the tile's centre, in
     one unit (cqi = 1% of tile width), so "move it 10 right" moves it 10
     right — no rotation to fight, no clipping, no aspect-ratio drift. */
  .blob {
    position: relative;
    width: var(--wt-width, 100%);
    max-width: var(--wt-size, none);
    /* Centred with left+translate rather than margin:0 auto, because auto
       margins FLOOR AT ZERO: the moment the box is wider than its parent they
       give up silently and the box goes flush-left, dumping every bit of
       overflow on the right edge. That is exactly what pushed the pill out of
       its card at the old 115% width — it was never centred at all, it just
       looked centred while it happened to fit. This construction stays
       centred at any width. */
    left: 50%;
    transform: translateX(-50%);
    aspect-ratio: 1 / var(--wt-ratio, 0.64);
    box-sizing: border-box;
    container-type: inline-size;
    cursor: pointer;
    color: var(--wt-fg, var(--md-sys-color-primary, var(--primary-text-color)));
    /* NO overflow:hidden — the pill deliberately spills past this box (it is
       rotated), and content is positioned by hand, so clipping here would
       silently eat whatever gets placed near an edge. */
  }

  /* The pill: an M3 stadium (flat sides, fully rounded ends — not an
     ellipse; the large radius clamps to half the shorter side), tilted
     diagonally Pixel-widget style. Defaults to the SAME surface as the clock
     face so the two read as a set. */
  .blob::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: var(--wt-bg, var(--md-sys-color-surface-container-high, var(--card-background-color)));
    transform: rotate(var(--wt-tilt, -26deg)) scale(var(--wt-pill-scale, 0.86));
    z-index: 0;
  }

  /* Both pieces are pinned to the tile's centre and then nudged by their own
     x/y. Centre-anchored rather than edge-anchored on purpose: an offset of 0
     means "dead centre" regardless of how big the piece is, so changing a
     font or icon size does not also move it. */
  .readout,
  .wx,
  .wx-mono {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
  }

  .readout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5cqi;
    transform: translate(-50%, -50%)
      translate(var(--wt-temp-x, 0cqi), var(--wt-temp-y, -18cqi));
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
    font-size: var(--wt-minmax-size, 5.5cqi);
    font-weight: 600;
    color: var(--wt-minmax, currentColor);
    opacity: var(--wt-minmax-opacity, 0.75);
  }

  .wx,
  .wx-mono {
    transform: translate(-50%, -50%)
      translate(var(--wt-icon-x, 0cqi), var(--wt-icon-y, 18cqi));
  }

  .wx {
    width: var(--wt-icon-size, 27cqi);
    height: var(--wt-icon-size, 27cqi);
  }

  .wx-mono {
    --mdc-icon-size: var(--wt-icon-size, 27cqi);
    display: flex;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];customElements.define("materia-weather-tile-editor",class extends We{_formData(){return{show_minmax:!1,size:10,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"icon",label:"Custom icon (overrides the colored glyph)",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"Min / Max",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show min / max",selector:{boolean:{}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / temperature",color:!0,template:!0,selector:{text:{}}},{name:"minmax_color",label:"Min / max color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class Mt extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedMinmaxColor:{state:!0},_forecast:{state:!0}};static styles=Et;static getConfigElement(){return document.createElement("materia-weather-tile-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t,show_minmax:!0}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("minmax_color","_resolvedMinmaxColor"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"";let s=e?.attributes?.temperature;if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&(s=e.state)}const a=null!=this._num(s)?`${this._num(s)}°`:"—",n=e=>{const t=e?this.hass.states[e]:null;return t&&!this._isUnavailable(t)?t.state:null};let o=n(this.config.low_entity),r=n(this.config.high_entity);const l=this._forecast?.[0]||e?.attributes?.forecast?.[0];null==o&&null!=l?.templow&&(o=l.templow),null==r&&null!=l?.temperature&&(r=l.temperature);const c=this.config.show_minmax&&(null!=this._num(o)||null!=this._num(r)),d=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,h=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,p=this._isTemplate(this.config.minmax_color)?this._resolvedMinmaxColor:this.config.minmax_color;let u="number"==typeof this.config.tilt?this.config.tilt:{right:-45,left:45,none:0}[this.config.tilt]??-45;this.config.mirror&&(u=-u);const m=this.config.icon_size??(c?34:36),g=this.config.text_size??(c?26:30),f=this.config.minmax_size??5.5,_=this.config.temp_x??5,b=this.config.temp_y??-18,v=this.config.icon_x??-5,y=this.config.icon_y??18,x=this.config.width??100,w=(this.config.height??85)/100,k=(this.config.pill_scale??88)/100,$=`--wt-size:${["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][Math.min(10,Math.max(1,this.config.size??10))-1]};--wt-tilt:${u}deg;--wt-pill-scale:${k};--wt-icon-size:${m}cqi;--wt-temp-size:${g}cqi;--wt-minmax-size:${f}cqi;--wt-width:${x}%;--wt-ratio:${w};--wt-temp-x:${_}cqi;--wt-temp-y:${b}cqi;--wt-icon-x:${v}cqi;--wt-icon-y:${y}cqi;${d?`--wt-bg:${d};`:""}${h?`--wt-fg:${h};`:""}`+(p?`--wt-minmax:${p};--wt-minmax-opacity:1;`:""),C=this.config.icon;return I`
      <ha-card>
        <div
          class="blob ${t?"unavailable":""}"
          style=${$}
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <div class="readout">
            ${c?I`<div class="minmax">
                  <span>↑${null!=this._num(r)?`${this._num(r)}°`:"—"}</span>
                  <span>↓${null!=this._num(o)?`${this._num(o)}°`:"—"}</span>
                </div>`:""}
            <div class="temp">${t?"—":a}</div>
          </div>
          ${C?I`<ha-icon class="wx-mono" .icon=${C}></ha-icon>`:H`<svg class="wx" viewBox="0 0 24 24">${At(i,ft(this.hass,this.config.moon_entity))}</svg>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 3}}customElements.define("materia-weather-tile",Mt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-tile",name:"Materia Weather Tile",description:"Large blobby weather widget with a big temperature and colored condition icon.",preview:!0});const Ot=[Ee,ze,Ae,ge,n`
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
  `];customElements.define("materia-weather-hero-editor",class extends We{_formData(){return{show_condition:!0,show_icon:!0,show_feels_like:!0,show_minmax:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"feels_like_entity",label:"Feels-like sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"show_condition",label:"Show condition text",selector:{boolean:{}}},{name:"show_icon",label:"Show condition glyph",selector:{boolean:{}}},{name:"show_feels_like",label:"Show feels-like",selector:{boolean:{}}}]},{title:"Night / Day",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"Show night / day range",selector:{boolean:{}}},{name:"low_entity",label:"Low sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"high_entity",label:"High sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"night_label",label:"Night label",selector:{text:{}}},{name:"day_label",label:"Day label",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const Ft={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class Dt extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColorOn:{state:!0}};static styles=Ot;static getConfigElement(){return document.createElement("materia-weather-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color_on","_resolvedColorOn"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"",s=Ft[i]||this._capitalize(String(i).replace(/-|_/g," "));let a=e?.attributes?.temperature;if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&!this._isUnavailable(e)&&(a=e.state)}const n=this._num(a);let o=e?.attributes?.apparent_temperature;if(this.config.feels_like_entity){const e=this.hass.states[this.config.feels_like_entity];e&&!this._isUnavailable(e)&&(o=e.state)}const r=this._num(o),l=e=>{const t=e?this.hass.states[e]:null;return t&&!this._isUnavailable(t)?t.state:null};let c=l(this.config.low_entity),d=l(this.config.high_entity);const h=this._forecast?.[0]||e?.attributes?.forecast?.[0];null==c&&null!=h?.templow&&(c=h.templow),null==d&&null!=h?.temperature&&(d=h.temperature);const p=this._num(c),u=this._num(d),m=this.config.night_label??$e("wh_night",this.hass),g=this.config.day_label??$e("wh_day",this.hass),f=this.config.separator??"•",_=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on;return I`
      <ha-card>
        <div
          class="hero ${t?"unavailable":""}"
          style="${_?`--wh-fg:${_};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          ${!1!==this.config.show_condition?I`<div class="condition">
                ${!1===this.config.show_icon||t?"":H`<svg class="cond-glyph" viewBox="0 0 24 24">${At(i,ft(this.hass,this.config.moon_entity))}</svg>`}
                <span>${t?"—":s}</span>
              </div>`:""}
          <div class="temp">
            <span class="temp-value">${t||null==n?"—":n}</span><span class="temp-deg">°</span>
          </div>
          ${!1===this.config.show_feels_like||null==r||t?"":I`<div class="feels">${this.config.feels_like_label??$e("wh_feels_like",this.hass)} ${r}°</div>`}
          ${!1===this.config.show_minmax||null==p&&null==u||t?"":I`<div class="minmax">
                <span>${m}: ${null!=p?`${p}°`:"—"}</span>
                <span class="sep">${f}</span>
                <span>${g}: ${null!=u?`${u}°`:"—"}</span>
              </div>`}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}function qt(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}function Nt(e,{locale:t="en",showPrecip:i=!0,minPrecip:s=10,moonPhase:a=null}={}){return e.map(e=>{const n=qt(e.temperature),o=qt(e.precipitation_probability),r=new Date(e.datetime),l=Number.isNaN(r.getTime())?"":r.toLocaleTimeString(t,{hour:"numeric"});return I`
      <div class="hour">
        <span class="h-temp">${null!=n?`${n}°`:"—"}</span>
        <svg class="h-glyph" viewBox="0 0 24 24">${At(e.condition,a)}</svg>
        ${i&&null!=o&&o>=s?I`<span class="h-precip">${o}%</span>`:I`<span class="h-precip empty"></span>`}
        <span class="h-time">${l}</span>
      </div>
    `})}customElements.define("materia-weather-hero",Dt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-hero",name:"Materia Weather Hero",description:"Current-conditions hero: condition, huge temperature, feels-like and night/day range.",preview:!0});const Pt=n`
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
`,Rt=[Ee,ze,Ae,ge,Pt,n`
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
  `],Lt=[Ee,ze,Ae,ge,Pt,n`
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
  `];customElements.define("materia-forecast-daily-editor",class extends We{_formData(){return{days:10,show_hourly:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"days",label:"Days shown",selector:{number:{min:3,max:15,step:1,mode:"slider"}}},{name:"show_hourly",label:"Tap a day to expand its hourly detail",selector:{boolean:{}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}},{name:"today_label",label:"Label for today",selector:{text:{}}}]}]}});class Ut extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_hourly:{state:!0},_selected:{state:!0},_expanded:{state:!0}};static styles=Lt;static getConfigElement(){return document.createElement("materia-forecast-daily-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0,this._selected=0,this._expanded=!1}updated(e){e.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._subscribeForecast()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=null,this._hourly=[],this._hourlyByDay=new Map;const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(t.catch(()=>{}),this._fcUnsubs=[t],!1!==this.config.show_hourly){const t=this.hass.connection.subscribeMessage(e=>{this._hourly=e?.forecast||[];const t=new Map;for(const e of this._hourly){const i=this._dayKey(e.datetime);if(!i)continue;const s=t.get(i)||[];s.length<24&&s.push(e),t.set(i,s)}this._hourlyByDay=t},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});t.catch(()=>{}),this._fcUnsubs.push(t)}}_unsubForecast(){for(const e of this._fcUnsubs||[])e.then(e=>e&&e()).catch(()=>{});this._fcUnsubs=null,this._fcEntity=void 0}_dayKey(e){const t=this.hass?.config?.time_zone;if(!this._dayFmt||this._dayFmtTz!==t){this._dayFmtTz=t;try{this._dayFmt=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"})}catch{this._dayFmt=new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"2-digit",day:"2-digit"})}}const i=new Date(e);return Number.isNaN(i.getTime())?"":this._dayFmt.format(i)}_hoursFor(e){return e?.datetime&&this._hourlyByDay?.size&&this._hourlyByDay.get(this._dayKey(e.datetime))||[]}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}_dayLabel(e,t){const i=new Date(e);if(Number.isNaN(i.getTime()))return"";const s=new Date;if(0===t&&this._dayKey(e)===this._dayKey(s))return this.config.today_label??$e("fc_today",this.hass);const a=this.hass?.locale?.language||navigator.language||"en";return i.toLocaleDateString(a,{weekday:"short"})}_onPointerDown(e){if("mouse"!==e.pointerType)return;const t=e.currentTarget;this._dragStartX=e.clientX,this._dragStartScroll=t.scrollLeft,this._didDrag=!1,this._dragPointerId=e.pointerId}_onPointerMove(e){if(null==this._dragStartX)return;const t=e.clientX-this._dragStartX;!this._didDrag&&Math.abs(t)>4&&(this._didDrag=!0,e.currentTarget.setPointerCapture(this._dragPointerId)),this._didDrag&&(e.currentTarget.scrollLeft=this._dragStartScroll-t)}_onPointerUp(e){null!=this._dragStartX&&(e.currentTarget.releasePointerCapture?.(e.pointerId),this._dragStartX=null,setTimeout(()=>{this._didDrag=!1},0))}_select(e,t){this._didDrag||(this._expanded=e!==this._selected||!this._expanded,this._selected=e,this.dispatchEvent(new CustomEvent("materia-forecast-day-selected",{detail:{index:e,day:t},bubbles:!0,composed:!0})))}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=(this._forecast?.length?this._forecast:e?.attributes?.forecast||[]).slice(0,this.config.days??10);if(!i.length)return I``;const s=!1!==this.config.show_precipitation,a=this.config.min_precipitation??10,n=i[this._selected],o=!1!==this.config.show_hourly&&this._expanded&&n?this._hoursFor(n):[],r=this._expanded&&o.length>0,l=this.hass?.locale?.language||navigator.language||"en";return I`
      <ha-card>
        <div
          class="row ${t?"unavailable":""}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${i.map((e,t)=>{const i=this._num(e.temperature),n=this._num(e.templow),o=this._num(e.precipitation_probability),r=t===this._selected,l=!1!==this.config.show_hourly&&this._hoursFor(e).length>0;return I`
              <button
                class="pill ${r?"selected":""} ${l?"":"static"}"
                @click=${l?()=>this._select(t,e):void 0}
              >
                <span class="hi">${null!=i?`${i}°`:"—"}</span>
                <span class="lo">${null!=n?`${n}°`:"—"}</span>
                <svg class="glyph" viewBox="0 0 24 24">${At(e.condition,ft(this.hass,this.config.moon_entity))}</svg>
                ${s&&null!=o&&o>=a?I`<span class="precip">${o}%</span>`:I`<span class="precip empty"></span>`}
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
              ${r?Nt(o,{locale:l,showPrecip:s,minPrecip:a,moonPhase:ft(this.hass,this.config.moon_entity)}):""}
            </div>
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-daily",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-daily",name:"Materia Forecast Daily",description:"Pixel-style daily forecast pill row with colored glyphs and precipitation chance.",preview:!0});customElements.define("materia-forecast-hourly-editor",class extends We{_formData(){return{hours:24,show_header:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"name",label:"Header title",selector:{text:{}}},{name:"show_header",label:"Show header",selector:{boolean:{}}},{name:"hours",label:"Hours shown",selector:{number:{min:6,max:48,step:1,mode:"slider"}}},{name:"show_precipitation",label:"Show precipitation chance",selector:{boolean:{}}},{name:"min_precipitation",label:"Hide below (%)",selector:{number:{min:0,max:100,step:5,mode:"box"}}}]}]}});class jt extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0}};static styles=Rt;static getConfigElement(){return document.createElement("materia-forecast-hourly-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&this._subscribeForecast()}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_onPointerDown(e){if("mouse"!==e.pointerType)return;const t=e.currentTarget;this._dragStartX=e.clientX,this._dragStartScroll=t.scrollLeft,this._captured=!1,this._dragPointerId=e.pointerId}_onPointerMove(e){if(null==this._dragStartX)return;const t=e.clientX-this._dragStartX;!this._captured&&Math.abs(t)>4&&(this._captured=!0,e.currentTarget.setPointerCapture(this._dragPointerId)),this._captured&&(e.currentTarget.scrollLeft=this._dragStartScroll-t)}_onPointerUp(e){null!=this._dragStartX&&(e.currentTarget.releasePointerCapture?.(e.pointerId),this._dragStartX=null)}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=(this._forecast||[]).slice(0,this.config.hours??24);if(!i.length)return I``;const s=this.hass?.locale?.language||navigator.language||"en";return I`
      <ha-card class="${t?"unavailable":""}">
        ${!1!==this.config.show_header?I`<div class="header">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
              <span>${this.config.name??$e("fc_hourly_forecast",this.hass)}</span>
            </div>`:""}
        <div
          class="hours"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${Nt(i,{locale:s,showPrecip:!1!==this.config.show_precipitation,minPrecip:this.config.min_precipitation??10,moonPhase:ft(this.hass,this.config.moon_entity)})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-forecast-hourly",jt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-forecast-hourly",name:"Materia Forecast Hourly",description:"Pixel-style hourly forecast strip with colored glyphs and precipitation chance.",preview:!0});const Bt=[Ee,ze,Ae,ge,n`
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
  `],It=[{value:"wind",label:"Wind"},{value:"uv",label:"UV index"},{value:"aqi",label:"Air quality"},{value:"pollen",label:"Pollen"},{value:"precipitation",label:"Precipitation"},{value:"sun",label:"Sunrise & sunset"},{value:"visibility",label:"Visibility"},{value:"humidity",label:"Humidity"},{value:"pressure",label:"Pressure"}],Ht={pollen:{variant:"gauges",max_shown:4}};customElements.define("materia-weather-metric-editor",class extends We{_formData(){return{metric:"wind",...Ht[this._config?.metric],...this._config}}_sectionsSignature(){return this._config?.metric||""}get _sections(){const e=this._config?.metric,t={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"metric",required:!0,selector:{select:{mode:"dropdown",options:It}}},..."sun"!==e&&"pollen"!==e?[{name:"entity",label:"Weather entity",selector:{entity:{domain:"weather"}}},{name:"sensor",label:"Sensor override (optional)",selector:{entity:{domain:"sensor"}}}]:[],{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Header icon (overrides default)",selector:{icon:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"wind"===e&&i.fields.push({name:"unit",label:"Unit (converts from the source)",selector:{select:{mode:"dropdown",options:[{value:"km/h",label:"km/h"},{value:"m/s",label:"m/s"},{value:"mph",label:"mph"},{value:"kn",label:"knots"},{value:"bft",label:"Beaufort"}]}}},{name:"bearing_entity",label:"Bearing sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"from_label",label:'"From" label',selector:{text:{}}}),"humidity"===e&&i.fields.push({name:"dew_entity",label:"Dew point sensor (optional)",selector:{entity:{domain:"sensor"}}},{name:"dew_label",label:"Dew point label",selector:{text:{}}}),"pressure"===e&&i.fields.push({name:"min",label:"Gauge min",selector:{number:{mode:"box"}}},{name:"max",label:"Gauge max",selector:{number:{mode:"box"}}}),"precipitation"===e&&i.fields.push({name:"total_label",label:"Subtitle when raining",selector:{text:{}}},{name:"none_label",label:'"None expected" label',selector:{text:{}}}),"sun"===e&&i.fields.push({name:"sun_entity",label:"Sun entity",selector:{entity:{domain:"sun"}}},{name:"moon_entity",label:"Moon phase sensor (built-in Moon integration)",selector:{entity:{domain:"sensor"}}}),"pollen"===e&&i.fields.push({name:"entities",label:"Pollen sensors",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"variant",label:"Variant",selector:{select:{mode:"dropdown",options:[{value:"gauges",label:"Gauges (wide)"},{value:"small",label:"Small (dot list)"}]}}},{name:"max_shown",label:"Max species shown (worst first)",selector:{number:{min:1,max:6,step:1,mode:"slider"}}},{name:"hide_inactive",label:"Hide species at 'none'",selector:{boolean:{}}},{name:"max",label:"Scale max for numeric sensors (default 4)",selector:{number:{min:1,max:10,mode:"box"}}});const s={title:"Appearance",icon:"mdi:palette-outline",fields:[..."wind"===e?[{name:"shape_color",label:"Shape color",color:!0,template:!0,selector:{text:{}}}]:[],{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},a={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[t,i,s,a]:[t,s,a]}});const Wt="var(--md-sys-cust-color-scale-green, #5E9E50)",Vt="var(--md-sys-cust-color-scale-yellow, #C7A128)",Gt="var(--md-sys-cust-color-scale-orange, #D9713C)",Xt="var(--md-sys-cust-color-scale-red, #C94D42)",Yt="var(--md-sys-cust-color-scale-purple, #8A4DA3)",Kt=[{max:2,label:"Low",color:Wt},{max:5,label:"Moderate",color:Vt},{max:7,label:"High",color:Gt},{max:10,label:"Very high",color:Xt},{max:1/0,label:"Extreme",color:Yt}],Zt=[{max:50,label:"Good air quality",color:Wt},{max:100,label:"Moderate air quality",color:Vt},{max:150,label:"Unhealthy for sensitive groups",color:Gt},{max:200,label:"Unhealthy air quality",color:Xt},{max:300,label:"Very unhealthy air quality",color:Yt},{max:1/0,label:"Hazardous air quality",color:"var(--md-sys-cust-color-scale-maroon, #7A4040)"}],Jt=["None","Low","Moderate","High","Very high"];class Qt extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=Bt;static getConfigElement(){return document.createElement("materia-weather-metric-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t,metric:"wind"}}setConfig(e){if(!e.metric)throw new Error("metric is required");this.config={...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),"precipitation"!==this.config.metric||this.config.sensor?this._unsubForecast():this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){"precipitation"!==this.config?.metric||this.config.sensor||this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_numRaw(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}_value(e){if(this.config.sensor){const e=this.hass.states[this.config.sensor];return e&&!this._isUnavailable(e)?this._numRaw(e.state):null}const t=this.hass.states[this.config.entity];return this._numRaw(t?.attributes?.[e])}_weatherAttr(e){return this.hass.states[this.config.entity]?.attributes?.[e]}_scallopWave(e){const t=200/12;let i=`M0 ${e+3.2} `;for(let s=0;s<200;s+=t)i+=`Q ${s+t/2} ${e-3.2} ${s+t} ${e+3.2} `;return i+"V100 H0 Z"}render(){if(!this.hass||!this.config)return I``;const e={wind:()=>this._wind(),uv:()=>this._uv(),aqi:()=>this._aqi(),pollen:()=>this._pollen(),precipitation:()=>this._precipitation(),sun:()=>this._sun(),visibility:()=>this._visibility(),humidity:()=>this._humidity(),pressure:()=>this._pressure()}[this.config.metric];if(!e)return I``;const t=e();if(t===V)return I``;const i=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,s=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,a=null!=this.config.size?Math.min(10,Math.max(1,this.config.size)):null;return I`
      <ha-card
        style="--wm-size:${null!=a?["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][a-1]:"200px"};${i?`--wm-color:${i};`:""}${s?`--wm-color-on:${s};`:""}${this.config.shape_color?`--wm-shape:${this.config.shape_color};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||(this.config.sensor||this.config.entity?{action:"more-info",entity:this.config.sensor||this.config.entity}:void 0))}
      >
        ${t}
      </ha-card>
    `}_header(e,t){return I`<div class="header"><ha-icon icon=${this.config.icon||e}></ha-icon><span>${t}</span></div>`}_hint(e,t,i){return I`
      <div class="rect-tile">
        ${this._header(e,t)}
        <div class="sub hint">${i}</div>
      </div>
    `}_convertWind(e,t,i){const s={"km/h":1,"m/s":3.6,mph:1.609344,kn:1.852,knots:1.852,"ft/s":1.09728};if(!i||i===t)return{v:e,u:t};const a=e*(s[t]??1);if("bft"===i){let e=[1,5,11,19,28,38,49,61,74,88,102,117].findIndex(e=>a<e);return-1===e&&(e=12),{v:e,u:"Bft"}}return{v:a/(s[i]??1),u:i}}_wind(){const e=this._value("wind_speed");if(null==e)return V;const t=this.config.sensor?this.hass.states[this.config.sensor]?.attributes?.unit_of_measurement??"km/h":this._weatherAttr("wind_speed_unit")??"km/h",{v:i,u:s}=this._convertWind(e,t,this.config.unit);let a=this.config.bearing_entity?this._numRaw(this.hass.states[this.config.bearing_entity]?.state):this._numRaw(this._weatherAttr("wind_bearing"));const n=null!=a?`${this.config.from_label??$e("wm_wind_from",this.hass)} ${o=a,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((o%360+360)%360/22.5)%16]}`:"";var o;const r=(null!=a?(a+180)%360:0)*Math.PI/180;return I`
      <div class="rect-tile clip wind">
        <svg class="blob-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${function(e,t,i,s=0){const a=Math.cos(s),n=Math.sin(s),o=ct([{x:.5,y:.892,r:.313},{x:-.216,y:1.05,r:.207},{x:.499,y:-.16,r:.215},{x:1.225,y:1.06,r:.211}].map(e=>({x:e.x*a-e.y*n,y:e.x*n+e.y*a,r:e.r}))),r=[];for(const e of o){const t=Math.atan2(e.T1[1]-e.C[1],e.T1[0]-e.C[0]);let i=Math.atan2(e.T2[1]-e.C[1],e.T2[0]-e.C[0])-t;if(1===e.sweep)for(;i<0;)i+=2*Math.PI;else for(;i>0;)i-=2*Math.PI;for(let s=0;s<=16;s++){const a=t+i*s/16;r.push([e.C[0]+e.rEff*Math.cos(a),e.C[1]+e.rEff*Math.sin(a)])}}let l=0,c=0,d=0;for(let e=0;e<r.length;e++){const[t,i]=r[e],[s,a]=r[(e+1)%r.length],n=t*a-s*i;l+=n,c+=(t+s)*n,d+=(i+a)*n}l/=2,c/=6*l,d/=6*l;const h=Math.max(...r.map(([e,t])=>Math.hypot(e-c,t-d))),p=i/h,u=i=>[e+(i[0]-c)*p,t+(i[1]-d)*p];return dt(o.map(e=>({T1:u(e.T1),T2:u(e.T2),C:u(e.C),rEff:e.rEff*p,sweep:e.sweep})))}(50,50,36,r)} class="blob-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:weather-windy",this.config.name??"Wind")}
          <div class="big">${Math.round(i)}<span class="unit"> ${s}</span></div>
          ${n?I`<div class="sub">${n}</div>`:""}
        </div>
      </div>
    `}_uv(){const e=this._value("uv_index");if(null==e)return V;const t=Kt.find(t=>e<=t.max),i=Kt.map((e,i)=>{const s=(160-35*i)*Math.PI/180,a=50+33*Math.cos(s),n=52+33*Math.sin(s),o=e===t;return H`<circle cx=${a} cy=${n} r=${o?4.5:2.6}
        fill=${e.color} opacity=${o?1:.3} />`});return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${rt(50,52,45,12)} class="shape-fill" />
          ${i}
        </svg>
        <div class="overlay">
          ${this._header("mdi:white-balance-sunny",this.config.name??"UV index")}
          <div class="big">${Math.round(e)}</div>
          <div class="sub">${t.label}</div>
        </div>
      </div>
    `}_visibility(){const e=this._value("visibility");if(null==e)return this.config.sensor?V:this._hint("mdi:eye-outline",this.config.name??"Visibility","Weather entity has no visibility — add a sensor");const t=this.config.unit??this._weatherAttr("visibility_unit")??"km";return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${rt(50,52,32,12)} class="shape-fill visibility-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:eye-outline",this.config.name??"Visibility")}
          <div class="big">${e}<span class="unit"> ${t}</span></div>
        </div>
      </div>
    `}_pressure(){const e=this._value("pressure");if(null==e)return V;const t=this.config.unit??this._weatherAttr("pressure_unit")??"hPa",i=this.config.min??("hPa"===t?950:28),s=this.config.max??("hPa"===t?1050:31),a=Math.min(1,Math.max(0,(e-i)/(s-i))),n=270*a-135,o=this.hass?.locale?.language||navigator.language||"en",r="hPa"===t?Math.round(e).toLocaleString(o):e;return I`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${mt(50,52,37.5,-135,135)} class="gauge-track thin" />
          ${a>.01?H`<path d=${mt(50,52,37.5,-135,n)} class="gauge-fill thin" />`:""}
        </svg>
        <div class="overlay">
          ${this._header("mdi:gauge",this.config.name??"Pressure")}
          <div class="big small-big">${r}</div>
          <div class="sub">${t}</div>
        </div>
      </div>
    `}_aqi(){const e=this._value("air_quality_index");if(null==e)return this.config.sensor?V:this._hint("mdi:waves",this.config.name??"Air quality","Point this tile at an AQI sensor");const t=Zt.find(t=>e<=t.max),i=Math.min(.96,Math.max(.04,e/300));return I`
      <div class="rect-tile left">
        ${this._header("mdi:waves",this.config.name??"Air quality")}
        <div class="big">${Math.round(e)}</div>
        <div class="aqi-bar">
          ${Zt.slice(0,5).map(e=>I`<span style="background:${e.color}"></span>`)}
          <span style="background:${Zt[5].color}"></span>
          <i class="aqi-dot" style="left:${(100*i).toFixed(1)}%; border-color:${t.color}"></i>
        </div>
        <div class="sub">${t.label}</div>
      </div>
    `}_precipitation(){let e=null;if(this.config.sensor)e=this._value();else{const t=this._forecast?.[0];e=this._numRaw(t?.precipitation)}if(null==e)return V;const t=this.config.unit??this._weatherAttr("precipitation_unit")??"mm",i=this.config.none_label??$e("wm_no_precip",this.hass),s=e>0?this.config.total_label??$e("wm_total_rain",this.hass):i;return I`
      <div class="rect-tile precip">
        ${this._header("m3o:rainy",this.config.name??"Precipitation")}
        <div class="big">${e}<span class="unit"> ${t}</span></div>
        <div class="precip-bottom">
          <div class="sub">${s}</div>
          ${e>0?H`<svg class="precip-glyph" viewBox="0 0 24 24">${At("rainy")}</svg>`:""}
        </div>
      </div>
    `}_humidity(){const e=this._value("humidity");if(null==e)return this.config.sensor?V:this._hint("mdi:water-percent",this.config.name??"Humidity","Weather entity has no humidity — add a sensor");const t=this.config.dew_entity?this._numRaw(this.hass.states[this.config.dew_entity]?.state):this._numRaw(this._weatherAttr("dew_point")),i=100-78*Math.min(1,Math.max(0,e/100)),s=this._scallopWave(i);return I`
      <div class="rect-tile left clip">
        <svg class="wave" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d=${s} class="wave-fill" />
        </svg>
        ${this._header("mdi:water-percent",this.config.name??"Humidity")}
        <div class="big">${Math.round(e)}<span class="unit">%</span></div>
        ${null!=t?I`<div class="dew"><span class="dew-chip">${Math.round(t)}°</span> ${this.config.dew_label??$e("wm_dew_point",this.hass)}</div>`:""}
      </div>
    `}_sun(){const e=this.hass.states[this.config.sun_entity??"sun.sun"];if(!e)return V;const t=e.attributes?.next_rising,i=e.attributes?.next_setting;if(!t||!i)return V;const s=this.hass?.locale?.language||navigator.language||"en",a=e=>new Date(e).toLocaleTimeString(s,{hour:"numeric",minute:"2-digit"}),n=e=>e.getHours()+e.getMinutes()/60,o=n(new Date(t)),r=n(new Date(i)),l=n(new Date),c=(r-o+24)%24||12,d=24-c,h=24,p=e=>e/24*100,u=e=>{const t=(e-o+24)%24;return t<=c?h-17*Math.sin(Math.PI*t/c):h+9*Math.sin(Math.PI*(t-c)/d)},m=(e,t)=>{const i=[];for(let s=e;s<t;s+=.25)i.push(`${p(s).toFixed(2)} ${u(s).toFixed(2)}`);return i.push(`${p(t).toFixed(2)} ${u(t).toFixed(2)}`),i.join(" L")},g=`M${p(o).toFixed(2)} 24 L${m(o,r)} Z`,f=o>.01?`M0 24 L${m(0,o)} Z`:"",_=r<23.99?`M${p(r).toFixed(2)} 24 L${m(r,24)} L100 24 Z`:"",b=(l-o+24)%24<=c,v=p(l),y=u(l),x=this.config.moon_entity??(this.hass.states["sensor.moon_phase"]?"sensor.moon_phase":"sensor.moon"),w=this.hass.states[x],k=ft(this.hass,this.config.moon_entity),$=k??.5;return I`
      <div class="rect-tile sun">
        ${this._header("mdi:weather-sunset",this.config.name??"Sunrise & sunset")}
        <svg class="sun-arc cycle" viewBox="0 0 100 40">
          <path d=${g} class="arc-fill" />
          ${f?H`<path d=${f} class="arc-night" />`:""}
          ${_?H`<path d=${_} class="arc-night" />`:""}
          <line x1="0" y1=${h} x2="100" y2=${h} class="horizon" />
          ${b?H`<path d=${function(e,t,i,s=12,a=.1*i,n=0){const o=Math.max(8*s,48),r=[];for(let l=0;l<o;l++){const c=l/o*Math.PI*2,d=i+a*Math.cos(s*c+n);r.push([e+d*Math.cos(c),t+d*Math.sin(c)])}let l=`M${r[0][0].toFixed(2)} ${r[0][1].toFixed(2)} `;for(let e=0;e<o;e++){const t=r[(e-1+o)%o],i=r[e],s=r[(e+1)%o],a=r[(e+2)%o],n=i[0]+(s[0]-t[0])/6,c=i[1]+(s[1]-t[1])/6,d=s[0]-(a[0]-i[0])/6,h=s[1]-(a[1]-i[1])/6;l+=`C${n.toFixed(2)} ${c.toFixed(2)} ${d.toFixed(2)} ${h.toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} `}return l+"Z"}(v,y,5.5,9,.6)} fill="var(--md-sys-cust-color-weather-sun, #FFC83D)" />`:H`
                <circle cx=${v.toFixed(2)} cy=${y.toFixed(2)} r="4.6" class="moon-dark" />
                ${gt(v,y,4.6,$)?H`<path d=${gt(v,y,4.6,$)} class="moon-lit" />`:""}
              `}
        </svg>
        <div class="sun-times">
          <div><ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${a(t)}</div>
          <div><ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${a(i)}</div>
          ${w&&null!=k?I`<div class="moon-row"><ha-icon icon=${w.attributes?.icon||`mdi:moon-${String(w.state).replace(/_/g,"-").replace("-moon","")}`}></ha-icon> ${this.hass.formatEntityState?.(w)??w.state}</div>`:""}
        </div>
      </div>
    `}_pollen(){const e={none:{v:0,label:"None",color:"var(--md-sys-color-outline, #9E9E9E)"},active:{v:1,label:"Active",color:Wt},green:{v:1,label:"Low",color:Wt},yellow:{v:2,label:"Moderate",color:Vt},orange:{v:3,label:"High",color:Gt},red:{v:4,label:"Very high",color:Xt},purple:{v:5,label:"Extreme",color:Yt}},t=this.config.max??4;let i=this.config.entities;i?.length||(i=[this.config.grass_entity&&{entity:this.config.grass_entity,label:this.config.grass_label??"Grass",icon:"mdi:grass"},this.config.tree_entity&&{entity:this.config.tree_entity,label:this.config.tree_label??"Tree",icon:"mdi:tree-outline"},this.config.weed_entity&&{entity:this.config.weed_entity,label:this.config.weed_label??"Weed",icon:"mdi:sprout-outline"}].filter(Boolean));const s=(i||[]).map(i=>{const s="string"==typeof i?{entity:i}:i,a=this.hass.states[s.entity];if(!a||this._isUnavailable(a))return null;const n=String(a.state).toLowerCase();let o,r,l;if(n in e){const t=e[n];o=t.v/5,r=t.label,l=t.color}else{const e=this._numRaw(n);if(null==e)return null;o=Math.min(1,Math.max(0,e/t)),r=`${e}/${t} ${Jt[Math.min(Jt.length-1,Math.round(o*(Jt.length-1)))]}`,l=null}let c=s.label;if(!c){const e=a.attributes.friendly_name||s.entity,t=e.replace(/pollen/i,"").trim().split(/\s+/);c=t[t.length-1]||e}return{label:c,icon:s.icon||a.attributes.icon||"m3of:allergy",frac:o,levelLabel:r,color:l}}).filter(Boolean).filter(e=>!this.config.hide_inactive||e.frac>0).sort((e,t)=>t.frac-e.frac).slice(0,this.config.max_shown??4);if(!s.length){return this.config.entities?.length||this.config.grass_entity||this.config.tree_entity||this.config.weed_entity?V:this._hint("m3of:allergy",this.config.name??"Pollen","Add pollen sensors")}return"small"===this.config.variant?I`
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
                  <path d=${mt(50,50,40,-135,135)} class="gauge-track" />
                  ${e.frac>.01?H`<path d=${mt(50,50,40,-135,270*e.frac-135)} class="gauge-fill" style="stroke:${e.color||"var(--wm-accent, #7bc96a)"}" />`:""}
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
    `}getGridOptions(){const e="pollen"===this.config?.metric&&"small"!==this.config?.variant;return{columns:e?8:4,rows:"auto",min_columns:e?6:3}}getCardSize(){return 3}}customElements.define("materia-weather-metric",Qt),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-metric",name:"Materia Weather Metric",description:"Expressive weather metric tiles: wind, UV, AQI, pollen, precipitation, sun, visibility, humidity, pressure.",preview:!0});const ei=[Ee,ze,Ae,ge,n`
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
  `],ti=[{value:"minmax",label:"High / low"},{value:"wind",label:"Wind"},{value:"humidity",label:"Humidity"},{value:"uv",label:"UV index"},{value:"precipitation",label:"Precipitation"},{value:"pressure",label:"Pressure"},{value:"pollen",label:"Pollen (worst species)"},{value:"aqi",label:"Air quality"}];class ii extends We{_formData(){return{metrics:["minmax"],...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"Moon phase sensor (default: sensor.moon)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Real temperature sensor (optional)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"metrics",label:"Subtitle metrics (condition always owns the top line)",selector:{select:{multiple:!0,mode:"list",options:ti}}},{name:"sort_by_severity",label:"Sort metrics worst-first",selector:{boolean:{}}},{name:"max_metrics",label:"Max metrics on the subtitle line",selector:{number:{min:1,max:8,step:1,mode:"box"}}},{name:"show_metric_icons",label:"Show metric icons",selector:{boolean:{}}},{name:"pollen_entities",label:"Pollen sensors (for the pollen metric)",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"aqi_entity",label:"AQI sensor (for the air-quality metric)",selector:{entity:{domain:"sensor"}}},{name:"alert",label:"Alert text / template (takes over top line)",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"navigate"}}}]}]}get _priority(){return this._config?.priority??["precipitation","pollen","aqi"]}_movePrio(e,t){const i=[...this._priority],[s]=i.splice(e,1);i.splice(t,0,s),this._commit({...this._config,priority:i})}_removePrio(e){const t=[...this._priority];t.splice(e,1),this._commit({...this._config,priority:t})}_renderExtra(){const e=this._priority,t=ti.filter(t=>!e.includes(t.value));return I`
      <div class="prio-header">Tie-break priority (most important first)</div>
      ${qe((e,t)=>this._movePrio(e,t),e.map((e,t)=>I`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${ti.find(t=>t.value===e)?.label??e}</span>
            <ha-icon-button @click=${()=>this._removePrio(t)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `))}
      ${t.length?I`<ha-form
            .hass=${this.hass}
            .data=${{}}
            .schema=${[{name:"add",label:"Add metric to priority",selector:{select:{mode:"dropdown",options:t}}}]}
            .computeLabel=${De}
            @value-changed=${t=>{const i=t.detail.value?.add;i&&this._commit({...this._config,priority:[...e,i]})}}
          ></ha-form>`:""}
    `}}ii.styles=[We.styles,n`
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
  `],customElements.define("materia-weather-glance-editor",ii);const si={"clear-night":"Clear night",partlycloudy:"Partly cloudy",partly_cloudy:"Partly cloudy","lightning-rainy":"Thunderstorm","snowy-rainy":"Sleet",exceptional:"Exceptional"};class ai extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedAlert:{state:!0}};static styles=ei;static getConfigElement(){return document.createElement("materia-weather-glance-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("weather."))||"";return{entity:t,metrics:["minmax"]}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={metrics:["minmax"],...e},this._fcEntity=void 0}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("alert","_resolvedAlert"),this._subscribeForecast())}connectedCallback(){super.connectedCallback(),this._resubOnConnect()}disconnectedCallback(){super.disconnectedCallback(),this._unsubForecast()}_resubOnConnect(){this._subscribeForecast()}_subscribeForecast(){const e=this.config?.entity;if(!this.hass||!e||this._fcEntity===e)return;this._unsubForecast(),this._fcEntity=e,this._forecast=[];const t=this.hass.connection.subscribeMessage(e=>{this._forecast=e?.forecast||[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});this._fcUnsub=t,t.catch(()=>{})}_unsubForecast(){this._fcUnsub&&(this._fcUnsub.then(e=>e&&e()).catch(()=>{}),this._fcUnsub=null),this._fcEntity=void 0}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?Math.round(t):null}_metricData(e,t){const i=t?.attributes||{},s=this._forecast?.[0]||i.forecast?.[0];let a=null,n=0;switch(e.type){case"condition":{const e=t?.state??"";a=si[e]||this._capitalize(String(e).replace(/-|_/g," ")),/lightning/.test(e)?n=3:/pouring|snowy|hail/.test(e)?n=2:/rainy|fog|windy/.test(e)&&(n=1);break}case"minmax":{const e=this._num(s?.temperature),t=this._num(s?.templow);if(null==e&&null==t)return null;a=`${null!=e?`${e}°`:"—"} ${null!=t?`${t}°`:"—"}`;break}case"wind":{const e=this._num(i.wind_speed);if(null==e)return null;const t=this._num(i.wind_bearing);a=`${e} ${i.wind_speed_unit??"km/h"}${null!=t?` ${o=t,["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round((o%360+360)%360/22.5)%16]}`:""}`,n=e>=88?4:e>=62?3:e>=39?2:e>=20?1:0;break}case"humidity":{const e=this._num(i.humidity);if(null==e)return null;a=`${e}%`,n=e>=85||e<=20?2:e>=70||e<=30?1:0;break}case"uv":{const e=this._num(i.uv_index);if(null==e)return null;a=`UV ${e}`,n=e>=11?4:e>=8?3:e>=6?2:e>=3?1:0;break}case"precipitation":{const t=s?.precipitation,o=null==t?null:Number(t);if(null==o||!Number.isFinite(o))return null;a=`${e.label??$e("wg_rain",this.hass)} ${o} ${i.precipitation_unit??"mm"}`,n=o>=10?3:o>=2?2:o>0?1:0;break}case"pressure":{const e=this._num(i.pressure);if(null==e)return null;a=`${e} ${i.pressure_unit??"hPa"}`,n=Math.abs(e-1013)>=25?2:Math.abs(e-1013)>=15?1:0;break}case"pollen":{const t={none:0,active:1,green:1,yellow:2,orange:3,red:4,purple:5},i=["None","Low","Low","Moderate","High","Very high","Extreme"],s=e.entities||this.config.pollen_entities||[];let o=null;for(const e of s){const i=this.hass.states[e];if(!i||this._isUnavailable(i))continue;const s=t[String(i.state).toLowerCase()]??this._num(i.state)??0;if(!o||s>o.v){const t=i.attributes.friendly_name||e,a=t.replace(/pollen/i,"").trim().split(/\s+/);o={v:s,label:a[a.length-1]||t}}}if(!o)return null;const r=e.label??this.config.pollen_label??$e("wm_pollen",this.hass);a=0===o.v?this.config.no_pollen_label??`${r} none`:`${r} ${o.label} ${i[o.v+1]??o.v}`,n=o.v;break}case"aqi":{const t=e.entity??this.config.aqi_entity,i=t?this.hass.states[t]:null;if(!i||this._isUnavailable(i))return null;const s=this._num(i.state);if(null==s)return null;a=`AQI ${s}`,n=s>200?4:s>150?3:s>100?2:s>50?1:0;break}case"sensor":{const t=e.entity?this.hass.states[e.entity]:null;if(!t||this._isUnavailable(t))return null;const i=e.unit??t.attributes.unit_of_measurement??"";a=`${e.label?`${e.label} `:""}${t.state}${i?` ${i}`:""}`;break}default:return null}var o;null!=e.severity&&(n=Number(e.severity)||0);return{text:a,sev:n,icon:e.icon??(this.config.show_metric_icons?{minmax:"mdi:thermometer",wind:"mdi:weather-windy",humidity:"mdi:water-percent",uv:"mdi:white-balance-sunny",precipitation:"m3o:rainy",pressure:"mdi:gauge",pollen:"m3of:allergy",aqi:"mdi:waves",sensor:"mdi:information-outline"}[e.type]:null),type:e.type}}_metricItems(e){const t=this.config.priority??["precipitation","pollen","aqi"],i=e=>{const i=t.indexOf(e);return-1===i?0:(t.length-i)/(t.length+1)},s=(this.config.metrics||[]).map(e=>"string"==typeof e?{type:e}:e).filter(e=>"condition"!==e.type),a=s.map(t=>this._metricData(t,e)).filter(Boolean);return this.config.sort_by_severity&&a.sort((e,t)=>t.sev+i(t.type)-(e.sev+i(e.type))),a}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=e?.state??"";let s=e?.attributes?.temperature;if(this.config.temperature_entity){const e=this.hass.states[this.config.temperature_entity];e&&!this._isUnavailable(e)&&(s=e.state)}const a=this._num(s),n=this._isTemplate(this.config.alert)?this._resolvedAlert:this.config.alert,o=n?null:this._metricData({type:"condition"},e),r=this.config.max_metrics??1/0,l=this._metricItems(e).slice(0,r),c=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,d=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,h=this.config.show_chevron??"navigate"===this.config.tap_action?.action,p=e=>I`<span class="m">
      ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}${e.text}
    </span>`;return I`
      <ha-card>
        <div
          class="glance ${t?"unavailable":""}"
          style="${c?`--wg-bg:${c};`:""}${d?`--wg-fg:${d};`:""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info"})}
        >
          <svg class="glyph" viewBox="0 0 24 24">${At(i,ft(this.hass,this.config.moon_entity))}</svg>
          <div class="mid">
            ${n||o?I`<div class="line1">
                  ${n?I`<ha-icon icon="mdi:alert-outline"></ha-icon>`:""}
                  ${n?I`<span>${n}</span>`:p(o)}
                </div>`:""}
            ${l.length?I`<div class="line2">
                  ${l.map((e,t)=>I`${t?I`<span class="dot">·</span>`:""}${p(e)}`)}
                </div>`:""}
          </div>
          <div class="now">${t||null==a?"—":`${a}°`}</div>
          ${h?I`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1.5}}getCardSize(){return 2}}customElements.define("materia-weather-glance",ai),window.customCards=window.customCards||[],window.customCards.push({type:"materia-weather-glance",name:"Materia Weather Glance",description:"Weather pill for the home screen: glyph, configurable metric lines or an alert, big temperature.",preview:!0});const ni=[Ee,ze,Ae,ge,n`
    ha-card {
      border-radius: 24px;
      padding: 16px 20px;
      /* haCardReset clears the background — restore the surface (obvious on
         dark themes, where the rows otherwise float on the view). The variable
         is what lets a tonal variant swap it for a container pair without a
         second rule fighting this one. */
      background: var(--ml-bg, var(--ha-card-background, var(--card-background-color)));
    }

    /* TONAL: a filled container pair, and specifically a PAIR. An accent role
       at partial alpha would look similar and guarantee nothing — its contrast
       depends on whatever happens to be behind the card — whereas
       primary-container carries on-primary-container with it and the theme
       promises the two are legible together in both light and dark. */
    ha-card.tonal {
      color: var(--ml-fg);
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

    /* A TEXT ROW is a line, not a name/value pair, so it drops the right-hand
       column and takes the whole width. Aligned to the top rather than centred
       because it WRAPS: on a narrow card an explanation runs to two or three
       lines, and a centred icon beside a three-line paragraph floats in the
       middle of it instead of marking where the line starts. */
    .row.text {
      align-items: flex-start;
      cursor: default;
    }

    .row.text:hover {
      background: transparent;
    }

    /* ...unless there is genuinely something to open. */
    .row.text.live {
      cursor: pointer;
    }

    .row.text.live:hover {
      background: color-mix(in srgb, currentColor 5%, transparent);
    }

    /* M3 body-medium: 14sp / 20sp line. The name column above deliberately
       clips to one line; an explanation must not, so this is the one row part
       that wraps. */
    .line {
      flex: 1;
      min-width: 0;
      line-height: 20px;
      overflow-wrap: anywhere;
    }

    /* Optical alignment: nudge the glyph onto the first line's centre rather
       than its cap height, now that the row aligns to the top. */
    .row.text .row-icon {
      margin-top: 1px;
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
  `];class oi extends We{static styles=[We.styles,n`
      .yaml-note {
        margin-top: 14px;
        padding: 10px 12px;
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        font-size: 12px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }
      .yaml-note code {
        font-family: var(--code-font-family, monospace);
        font-size: 11px;
      }
      .yaml-note pre {
        margin: 6px 0 0;
        white-space: pre-wrap;
        font-size: 11px;
      }
    `];_formData(){return{variant:"surface",...this._config}}_sectionsSignature(){return this._config?.variant||"surface"}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"title",label:"Title",template:!0,selector:{text:{}}},{name:"icon",label:"Header icon",template:!0,selector:{icon:{}}},{name:"entities",label:"Entities (rows)",helper:"For a list of readings. Mixed lists — text lines alongside entities — use the rows: key in YAML instead; see the note below.",selector:{entity:{multiple:!0}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"Surface",helper:"Tonal fills the card with a container pair, for a panel meant to read as one block rather than as part of the page.",selector:{select:{mode:"dropdown",options:[{value:"surface",label:"Card surface"},{value:"tonal",label:"Tonal container"}]}}},..."tonal"===this._config?.variant?[{name:"color",label:"Container (default primary container)",helper:"Pick a CONTAINER role, not an accent — a container carries its matching text colour, an accent does not.",color:!0,selector:{text:{}}},{name:"color_on",label:"Text on the container",color:!0,selector:{text:{}}}]:[]]}]}_renderExtra(){return I`
      <div class="yaml-note">
        <strong>Text lines and mixed lists are YAML-only.</strong>
        Use <code>rows:</code> instead of <code>entities:</code> — it takes both
        kinds and wins when both are present. A row with <code>text</code> is a
        line; a row with <code>entity</code> is a reading. <code>text</code>, <code>icon</code> and
        <code>name</code> all accept templates.
        <pre>
rows:
  - icon: mdi:leaf
    text: Charges only on surplus solar
  - icon: mdi:clock-outline
    text: "{{ states('sensor.laadstatus') }}"
  - entity: sensor.over_kw
    name: Over
    unit: kW</pre>
      </div>
    `}}customElements.define("materia-list-editor",oi);class ri extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedTitle:{state:!0},_resolvedIcon:{state:!0}};static styles=ni;static getConfigElement(){return document.createElement("materia-list-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("sensor."))||"";return{entities:t?[t]:[]}}setConfig(e){const t=Array.isArray(e?.rows)&&e.rows.length>0,i=Array.isArray(e?.entities)&&e.entities.length>0;if(!t&&!i)throw new Error("Materia List: add at least one row or entity");this.config={...e}}get _rows(){return(Array.isArray(this.config?.rows)&&this.config.rows.length?this.config.rows:this.config?.entities||[]).map((e,t)=>{const i="string"==typeof e?{entity:e}:{...e};return{...i,i:t,isText:null!=i.text&&""!==i.text}})}updated(e){if(e.has("hass")&&this.hass){this._resolveField("title","_resolvedTitle"),this._resolveField("icon","_resolvedIcon");for(const e of this._rows)e.isText&&this._resolveTemplateValue(`row_text_${e.i}`,e.text),this._resolveTemplateValue(`row_icon_${e.i}`,e.icon),this._resolveTemplateValue(`row_name_${e.i}`,e.name)}}_field(e,t){const i=this.config?.[e],s=this._isTemplate(i)?this[t]:i;return"string"==typeof s?s.trim():s}_rowField(e,t){const i=e?.[t];if(!this._isTemplate(i))return i;const s=this._tplResults?.[`row_${t}_${e.i}`];return"string"==typeof s?s.trim():s}_text(e){return this._rowField(e,"text")}_rowState(e,t){if(!t)return"—";if(e.attribute){const i=t.attributes?.[e.attribute];return null==i?"—":`${i}${e.unit?` ${e.unit}`:""}`}if(this._isUnavailable(t))return this.hass.formatEntityState?.(t)??t.state;if(e.unit){const i=Number(t.state);return Number.isFinite(i)?`${i} ${e.unit}`:t.state}return this.hass.formatEntityState?.(t)??t.state}render(){if(!this.hass||!this.config)return I``;const e=this._rows,t=this._field("title","_resolvedTitle"),i=this._field("icon","_resolvedIcon"),s="tonal"===this.config.variant,a=s?this.config.color??"var(--md-sys-color-primary-container)":"var(--ha-card-background, var(--card-background-color))",n=s?this.config.color_on??"var(--md-sys-color-on-primary-container)":"inherit";return I`
      <ha-card class=${s?"tonal":""} style="--ml-bg:${a};--ml-fg:${n};">
        ${t?I`<div class="header">
              ${i?I`<ha-icon icon=${i}></ha-icon>`:""}
              <span>${t}</span>
            </div>`:""}
        <div class="rows">
          ${e.map(e=>e.isText?this._renderText(e):this._renderEntity(e))}
        </div>
      </ha-card>
    `}_renderEntity(e){const t=this.hass.states[e.entity],i=this._rowField(e,"name")||t?.attributes?.friendly_name||e.entity,s=this._rowField(e,"icon");return I`
      <div
        class="row ${t&&this._isUnavailable(t)?"unavailable":""}"
        @click=${()=>this._handleAction(e.tap_action||{action:"more-info",entity:e.entity})}
      >
        ${s?I`<ha-icon class="row-icon" icon=${s}></ha-icon>`:""}
        <span class="name">${i}</span>
        <span class="state">${this._rowState(e,t)}</span>
      </div>
    `}_renderText(e){const t=e.tap_action||(e.entity?{action:"more-info",entity:e.entity}:null),i=!!t&&"none"!==t.action,s=this._rowField(e,"icon");return I`
      <div
        class="row text ${i?"live":""}"
        @click=${i?()=>this._handleAction(t):void 0}
      >
        ${s?I`<ha-icon class="row-icon" icon=${s}></ha-icon>`:""}
        <span class="line">${this._text(e)}</span>
      </div>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 1+(Array.isArray(this.config?.rows)&&this.config.rows.length?this.config.rows.length:this.config?.entities?.length||0)}}function li(e,t){return!(!Array.isArray(e)||0===e.length)&&e.every(e=>di(e,t))}function ci(e){return Array.isArray(e)?e:null==e?[]:[e]}function di(e,t){if(!e||"object"!=typeof e)return!1;switch(e.condition??"state"){case"state":{if(!e.entity)return!1;const i=t?.states?.[e.entity],s=e.attribute?i?.attributes?.[e.attribute]:i?.state,a=null==s?"":String(s);return null!=e.state?ci(e.state).map(String).includes(a):null!=e.state_not&&!ci(e.state_not).map(String).includes(a)}case"numeric_state":{if(!e.entity)return!1;const i=t?.states?.[e.entity],s=Number(e.attribute?i?.attributes?.[e.attribute]:i?.state);if(!Number.isFinite(s))return!1;const a=e=>Number("string"==typeof e&&t?.states?.[e]?t.states[e].state:e);return(null==e.above||s>a(e.above))&&((null==e.below||s<a(e.below))&&(null!=e.above||null!=e.below))}case"screen":return!!e.media_query&&window.matchMedia(e.media_query).matches;case"user":return ci(e.users).includes(t?.user?.id);case"and":return ci(e.conditions).every(e=>di(e,t));case"or":return ci(e.conditions).some(e=>di(e,t));case"not":return ci(e.conditions).length>0&&!ci(e.conditions).some(e=>di(e,t));default:return!1}}customElements.define("materia-list",ri),window.customCards=window.customCards||[],window.customCards.push({type:"materia-list",name:"Materia List",description:"Rows of entity readings and/or lines of text — name left, value right, or icon plus a full-width line. Optional tonal surface.",preview:!0});const hi=e=>class extends e{get _disabledByCondition(){const e=this.config?.disabled_when??this.config?.disabled;return Array.isArray(e)&&li(e,this.hass)}willUpdate(e){super.willUpdate?.(e),this.toggleAttribute("card-disabled",this._disabledByCondition)}},pi=n`
  :host([card-disabled]) {
    opacity: 0.38;
    pointer-events: none;
  }
`,ui=[Ee,ze,Ae,ge,n`
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
  `];customElements.define("materia-switch-editor",class extends We{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"Name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"secondary",label:"Secondary text / template",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Row color (e.g. escalate from state)",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color",label:"Switch track color when on",color:!0,template:!0,selector:{text:{}}},{name:"switch_color_on",label:"Switch thumb color when on",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}});class mi extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedSwitchColor:{state:!0},_resolvedSwitchColorOn:{state:!0}};static styles=[ui,pi];static getConfigElement(){return document.createElement("materia-switch-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("switch.")||e.startsWith("input_boolean."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Switch: entity is required");this.config=e}updated(e){e.has("hass")&&this.hass&&(this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("switch_color","_resolvedSwitchColor"),this._resolveField("switch_color_on","_resolvedSwitchColorOn"))}get _stateObj(){return this.hass?.states[this.config.entity]}get _on(){return"on"===this._stateObj?.state}_tap(){this._handleAction(this.config.tap_action||{action:"toggle",entity:this.config.entity}),this._fireHaptic("light")}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e)return I`<ha-card class="row off">Unknown entity: ${this.config.entity}</ha-card>`;const t=this._on,i=this._isUnavailable(e),s=this.config.name||e.attributes.friendly_name||this.config.entity,a=this.config.icon||e.attributes.icon||(t?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"),n=this.config.secondary?this._isTemplate(this.config.secondary)?this._resolvedSecondary:this.config.secondary:this.hass.formatEntityState?.(e)??e.state,o=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,r=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on,l=this._isTemplate(this.config.switch_color)?(this._resolvedSwitchColor||"").trim():this.config.switch_color,c=this._isTemplate(this.config.switch_color_on)?(this._resolvedSwitchColorOn||"").trim():this.config.switch_color_on;return I`
      <ha-card
        class="row ${t?"on":"off"} ${o?"colored":""} ${this.config.flat?"flat":""} ${i?"unavailable":""}"
        style="${o?`background:${o};`:""}${r?`color:${r};`:""}"
        @click=${this._tap}
      >
        <ha-icon class="r-icon" icon=${a}></ha-icon>
        <div class="r-text">
          <span class="r-name">${s}</span>
          ${n?I`<span class="r-sub">${n}</span>`:""}
        </div>
        <div class="m3-switch ${t?"on":""}"
          style="${l?`--ms-track:${l};`:""}${c?`--ms-thumb:${c};`:""}"><i></i></div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:1}}getCardSize(){return 1}}customElements.define("materia-switch",mi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-switch",name:"Materia Switch",description:"Toggle row with a spec M3 switch — templatable secondary text and state-driven colors.",preview:!0});const gi={cover:"open",lock:["locked","locking"],vacuum:"cleaning",media_player:"playing",climate:"heat",alarm_control_panel:"armed_away",timer:"active"},fi=new Set(["unavailable","unknown","none",""]);const _i=new Set(["unavailable","unknown","none",""]);function bi(e){const t=e?.lu??e?.last_updated??e?.last_changed;if(null==t)return null;if("number"==typeof t)return t<1e12?1e3*t:t;const i=Date.parse(t);return Number.isFinite(i)?i:null}function vi(e){const t=e?.s??e?.state;if(null==t||_i.has(String(t).toLowerCase()))return null;const i=Number(t);return Number.isFinite(i)?i:null}const yi={mean:e=>e.reduce((e,t)=>e+t,0)/e.length,sum:e=>e.reduce((e,t)=>e+t,0),min:e=>Math.min(...e),max:e=>Math.max(...e),delta:e=>e[e.length-1]-e[0],count:e=>e.length};function xi(e,{days:t=7,aggregate:i="delta",now:s=Date.now()}={}){const a=yi[i]||yi.delta,n=Math.max(1,Math.min(90,Math.round(t)));if(!e?.length)return[];const o=new Date(s);o.setHours(0,0,0,0);const r=864e5,l=o.getTime()-(n-1)*r,c=new Map;for(const t of e){if(null==t.v||t.t<l)continue;const e=Math.floor((t.t-l)/r);e<0||e>=n||(c.has(e)||c.set(e,[]),c.get(e).push(t.v))}const d=[];for(let e=0;e<n;e++){const t=c.get(e);if(!t||!t.length)continue;const i=a(t);d.push({t:l+e*r,v:Number.isFinite(i)?i:0,samples:t.length})}return d}function wi(e){const t=(e||[]).filter(e=>null!=e.v);if(t.length<2)return null;const i=t[0].v,s=t[t.length-1].v;return{from:i,to:s,abs:s-i,pct:0===i?null:(s-i)/Math.abs(i)*100}}const ki=[Ee,ze,Ae,ge,n`
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

    /* ================= the gauge family (19a) ==============================

       TYPOGRAPHY. Every size below is an M3 type-scale step used as the
       clamp's MAXIMUM, with a cqi term under it. The step is the design; the
       clamp is what lets one tile read at 6 grid columns and at 12 without
       two stylesheets. Steps used:
         display-small   36sp / 400 / 44sp
         headline-large  32sp / 400 / 40sp
         headline-medium 28sp / 400 / 36sp
         headline-small  24sp / 400 / 32sp
         title-small     14sp / 500 / 20sp / +0.1px
         label-medium    12sp / 500 / 16sp / +0.5px
         body-small      12sp / 400 / 16sp / +0.4px

       These deliberately do NOT touch .big / .sub, which the older variants
       share and which are tuned around that display font's ink extent.

       SHAPE. Radii are shape-scale tokens, not the concept's literal pixels:
       extra-large 28dp for tiles and the status row, full for tracks, bars,
       dots and the icon badge.

       COLOUR. Gauge accent is passed in as --g-accent (primary, or the
       battery ramp); every track is secondary-container. */

    .gauge-value {
      font-family: var(--materia-font-display, inherit);
      font-weight: 400;
      line-height: 1.22;
      letter-spacing: 0;
      font-variant-numeric: tabular-nums;
      /* Same headroom guard the .big rule documents: this display font's ink
         runs taller than its computed line box. */
      padding-top: 0.06em;
    }

    /* display-small 36sp */
    .gauge-value.v-display {
      font-size: clamp(24px, 19cqi, 36px);
    }

    /* headline-large 32sp */
    .gauge-value.v-headline {
      font-size: clamp(21px, 16cqi, 32px);
    }

    /* headline-medium 28sp */
    .gauge-value.v-headline-sm {
      font-size: clamp(18px, 13cqi, 28px);
    }

    /* label-medium 12sp, riding the value's baseline */
    .gauge-value .gauge-unit {
      font-size: clamp(10px, 5cqi, 12px);
      font-weight: 500;
      letter-spacing: 0.5px;
      opacity: 0.75;
      margin-left: 0.2em;
    }

    /* body-small 12sp */
    .gauge-caption {
      font-size: clamp(10px, 5cqi, 12px);
      font-weight: 400;
      line-height: 1.33;
      letter-spacing: 0.4px;
      opacity: 0.7;
    }

    .rect-tile.gauge {
      justify-content: space-between;
    }

    .gauge-main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: clamp(4px, 2.5cqi, 8px);
      width: 100%;
      min-width: 0;
    }

    /* ---- fill: the flood carries its own edge line ---------------------- */

    .flood {
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      /* The bright 3dp line IS the flood's trailing edge, so the boundary can
         never drift from the value by a rounding error in a second element. */
      box-shadow: inset -3px 0 0 0 var(--g-accent);
      background: color-mix(in srgb, var(--g-accent) 22%, transparent);
      transition: width var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects);
    }

    /* Sits above the flood so the number is never washed out by it. */
    .gauge-body {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
      width: 100%;
      gap: clamp(6px, 4cqi, 14px);
    }

    /* ---- bar: a 6dp track under the value ------------------------------- */

    .track {
      position: relative;
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
      overflow: hidden;
    }

    .track i {
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      border-radius: 999px;
      background: var(--g-accent);
      transition: width var(--md-sys-motion-expressive-default-spatial);
    }

    /* ---- ladder: N bars, ramping 32% -> 100% ---------------------------- */

    /* A band ACROSS the card, 52dp at full size, with the value line beneath
       it — see the note in _ladder. It was a 55%-wide right-hand column,
       which read as a cluster tucked bottom-right. */
    .ladder {
      display: flex;
      align-items: flex-end;
      /* space-between rather than a fixed gap: with the cap below, five bars
         would otherwise bunch at the left of a full-width row. The gap is the
         floor and this distributes whatever is left over. */
      justify-content: space-between;
      gap: clamp(1.5px, 1.6cqi, 5px);
      height: clamp(36px, 26cqi, 52px);
      width: 100%;
      flex-shrink: 0;
    }

    .ladder i {
      flex: 1 1 auto;
      min-width: 2px;
      /* Raised from 11px now that the row is full width: at five bars an 11px
         cap left them huddled in the first third. 24dp keeps sixteen bars at
         their natural ~11dp while letting five spread across the card. */
      max-width: 24px;
      border-radius: 999px;
      background: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .ladder i.lit {
      background: var(--g-accent);
    }

    /* ---- ring: progress beside the value, never behind it --------------- */

    .ring {
      width: clamp(40px, 22cqi, 60px);
      height: clamp(40px, 22cqi, 60px);
      flex-shrink: 0;
      align-self: center;
      /* Start the arc at twelve o'clock — a circle's path begins at 3. */
      transform: rotate(-90deg);
    }

    .ring circle {
      fill: none;
      stroke-width: 6;
    }

    .ring-track {
      stroke: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
    }

    .ring-arc {
      stroke: var(--g-accent);
      stroke-linecap: round;
      transition: stroke-dasharray var(--md-sys-motion-expressive-default-spatial);
    }

    /* ---- status: a tonal row ------------------------------------------- */

    .status-row {
      container-type: inline-size;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: clamp(10px, 3cqi, 16px);
      /* extra-large 28dp */
      border-radius: 28px;
      padding: clamp(12px, 3cqi, 18px) clamp(14px, 3.5cqi, 20px);
      background: var(--ms-color, var(--md-sys-color-surface-container-high, var(--ha-card-background, var(--card-background-color))));
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      max-width: var(--ms-size-row, none);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* Tonal while active — the concept's teal row, taken as a ROLE pair. */
    .status-row.active {
      background: var(--ms-color, var(--md-sys-color-primary-container, #d7e3ff));
      color: var(--ms-color-on, var(--md-sys-color-on-primary-container, #001b3f));
    }

    .status-badge {
      flex: none;
      width: clamp(38px, 9cqi, 48px);
      height: clamp(38px, 9cqi, 48px);
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, currentColor 12%, transparent);
    }

    .status-badge ha-icon {
      --mdc-icon-size: clamp(20px, 5cqi, 26px);
    }

    .status-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* headline-small 24sp */
    .status-state {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(17px, 4.4cqi, 24px);
      font-weight: 400;
      line-height: 1.33;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* body-small 12sp */
    .status-sub {
      font-size: clamp(11px, 2.6cqi, 12px);
      font-weight: 400;
      line-height: 1.33;
      letter-spacing: 0.4px;
      opacity: 0.72;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-dots {
      flex: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .status-dots i {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 20%, transparent);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .status-dots i.on {
      background: currentColor;
    }

    /* No number to show progress against: the dots travel instead, which is
       an activity indicator rather than a false reading. */
    .status-dots.pulse i {
      animation: ms-dots 1.4s ease-in-out infinite;
      animation-delay: calc(var(--i) * 0.16s);
    }

    @keyframes ms-dots {
      0%,
      100% {
        opacity: 0.35;
      }
      50% {
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .status-dots.pulse i {
        animation: none;
      }
    }

    /* ================= the history family (19b) ============================

       Geometry is the concept's, verbatim; colour is tokens. The alphas (14%
       area, 32% past bar, 18% idle stub) are GRAMMAR — a tonal wash of the
       accent — so they survive the swap from the doc's hexes to
       --md-sys-color-* intact.

       Card heights are NOT the concept's fixed 172 / 148 / 118px. A fixed
       height reserves room for a chart that an empty recorder never sends, and
       an empty reservation is exactly the hole the brief said to avoid. These
       are min-heights, so the tile is as tall as it has content for. */

    /* .rect-tile.left carries justify-content: space-between, which is two
       classes and therefore outranked a bare .spark-tile — the value and the
       delta pill were pushed to the bottom of the tile and landed ON TOP of
       the bled chart. Three classes to win it back: this stack reads
       header -> value -> caption from the top, with the chart underneath. */
    .rect-tile.left.spark-tile {
      /* The hero is a landscape card, not one of the squares. */
      aspect-ratio: auto;
      justify-content: flex-start;
      gap: clamp(4px, 2.5cqi, 10px);
    }

    /* The AREA hero fills its column, like the two other row-shaped
       presentations and unlike the squares — a 200px cap on a landscape card
       hinted at twelve columns just wastes the row. The square rule the rest
       of the card follows is untouched: the bare-line variant is one of the
       2-up tiles and stays capped. */
    .rect-tile.left.spark-tile.spark-bleed {
      max-width: var(--ms-size-row, none);
    }

    /* THE HEIGHTS ARE CONDITIONAL, and that is the point. The concept's 148 /
       172px assume a chart is there; applying them unconditionally left a
       no-history tile 172px tall with 76px of nothing in it — a reserved hole
       for a chart that is never coming, which is precisely what an empty
       recorder must not produce. So the room is only claimed once there is
       something to put in it. */
    .spark-tile.has-spark {
      min-height: 148px;
    }

    /* The area spark bleeds to the bottom edge, so the tile clips and the
       padding stops short there — the concept's 18px 20px 0. Also conditional:
       with no chart there is nothing to bleed and no reason to drop the
       tile's bottom padding. */
    .spark-tile.spark-bleed.has-spark {
      overflow: hidden;
      padding-bottom: 0;
      min-height: 172px;
    }

    /* Shared by every variant that leads with a number and may carry a pill.
       flex-end rather than baseline: the pill is a fixed-height box, and
       baseline-aligning it against a 36sp numeral hangs it off the digits'
       baseline instead of sitting it on their optical bottom. */
    .value-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-width: 0;
    }

    /* The history delta belongs to the heading, as in the 19b hero: title on
       the left, comparison window on the right. Keeping it out of the numeral
       row also means a short value and a long localized delta never fight for
       the same baseline. */
    .spark-head {
      position: relative;
      z-index: 1;
      width: 100%;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .spark-head .header {
      min-width: 0;
    }

    .spark {
      display: block;
      width: 100%;
      overflow: visible;
    }

    /* Absolutely placed and stretched, which is what lets a 340x60 viewBox
       meet the card's real width at any column count. */
    .spark-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 76px;
      pointer-events: none;
    }

    .spark-line {
      height: 26px;
    }

    .spark-fill {
      fill: color-mix(in srgb, var(--g-accent) 14%, transparent);
      stroke: none;
    }

    .spark-stroke {
      fill: none;
      stroke: var(--g-accent);
      stroke-linecap: round;
      stroke-linejoin: round;
      /* The viewBox is stretched non-uniformly, so a plain stroke-width would
         be stretched with it — this keeps 2.5dp meaning 2.5dp. */
      vector-effect: non-scaling-stroke;
      stroke-width: 2.5;
    }

    .spark-line .spark-stroke {
      stroke-width: 2;
    }

    /* ---- the delta pill ------------------------------------------------
       THE CONTAINER PAIR, not an accent role at partial alpha. M3 has two
       different mechanisms and they are not interchangeable: a *-container /
       on-*-container pair is a filled surface guaranteed to be a legible
       pair, while a percentage of an accent over whatever is behind it is a
       STATE LAYER. Using the second as the first is how this shipped as a
       flat grey pill with barely-legible text on a harmonised theme — the
       hand-mixed alpha has no contrast guarantee, and my reasoning that "the
       text and its wash are the same hue" only holds if the wash lands on a
       surface that happens to cooperate. Every other filled surface in this
       library (status-row.active, the lock, the alarm) uses the pair. */
    .delta-pill {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 30px;
      padding: 0 12px;
      /* Half of 30: the concept's 15px is corner-full for this height. */
      border-radius: 15px;
      background: var(--md-sys-color-tertiary-container, #ffd8e4);
      color: var(--md-sys-color-on-tertiary-container, #31111d);
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }

    .delta-pill ha-icon {
      --mdc-icon-size: 17px;
    }

    /* ---- scale: a ramp, the value on it, and reference marks ------------
       Geometry is the concept's. The marker OFFSETS are not: it centres each
       mark by subtracting half its own width in px (-2px on a 5px mark, -1px
       on a 2px one), which only stays centred while the widths never change.
       translateX(-50%) says the same thing about the mark rather than about
       one arithmetic result, so it survives a restyle — the same reason the
       level card's value column is measured rather than counted. */

    .ramp {
      position: relative;
      width: 100%;
      height: 12px;
      border-radius: 6px;
      /* The neutral track when the author has named no direction and no stops:
         position without judgement. */
      background: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
    }

    /* The value. Taller than the ramp and overhanging it top and bottom, so it
       reads as a position ON the scale rather than a segment of it. */
    .ramp .here {
      position: absolute;
      top: -5px;
      width: 5px;
      height: 22px;
      border-radius: 3px;
      transform: translateX(-50%);
      background: var(--md-sys-color-on-surface, var(--primary-text-color));
      box-shadow: 0 0 0 2px var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      transition: left var(--md-sys-motion-expressive-default-spatial);
    }

    /* A reference mark: quieter than the value, and translucent so a ramp
       colour still reads through it. */
    .ramp .ref {
      position: absolute;
      top: -3px;
      width: 2px;
      height: 18px;
      border-radius: 1px;
      transform: translateX(-50%);
      background: color-mix(
        in srgb,
        var(--ref-color, var(--md-sys-color-on-surface, currentColor)) 45%,
        transparent
      );
    }

    .scale-labels {
      position: relative;
      height: 16px;
      width: 100%;
      /* body-small territory; the concept's 11.5px is not a step, and
         label-small is 11sp. */
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.7;
    }

    .scale-labels .lo {
      position: absolute;
      left: 0;
    }

    .scale-labels .hi {
      position: absolute;
      right: 0;
    }

    /* Centred under its mark by the same mechanism, not by guessing at half a
       label's width. */
    .scale-labels .ref-label {
      position: absolute;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    .rect-tile.scale-tile {
      aspect-ratio: auto;
      justify-content: flex-start;
      /* The concept's 16px value-row-to-ramp and 8px ramp-to-labels. A single
         flex gap cannot be two values, so the ramp carries the difference. */
      gap: 8px;
    }

    .rect-tile.scale-tile .ramp {
      margin-top: 8px;
    }

    /* A landscape card, so it fills its column rather than sitting in the
       squares' 200px cap — the same escape the area spark uses. This is not
       cosmetic: at 200px the concept's OWN labels collide ("zuinig 13" runs
       into "gem. 15,6", because a reference at 29% of 180px lands at 52px and
       the left label is about 50px wide). At the width the concept draws it
       they clear each other comfortably. */
    .rect-tile.left.scale-tile {
      max-width: var(--ms-size-row, none);
    }

    /* Narrow enough and they collide anyway, so the reference labels drop to
       their own line rather than overprinting the bounds. Costs 16dp, and only
       where it is needed — the bounds define the scale and the references are
       the point of the variant, so neither can simply be dropped. */
    @container (max-width: 320px) {
      .scale-labels {
        height: 32px;
      }

      .scale-labels .ref-label {
        top: 16px;
      }
    }

    /* ---- week bars ------------------------------------------------------ */
    .weekbars {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 34px;
      width: 100%;
    }

    .weekbars i {
      flex: 1;
      min-width: 0;
      /* Capped so a short window does not turn seven ticks' worth of language
         into two slabs: at the concept's seven buckets these land near 40px
         anyway, and with two buckets they stay bars rather than blocks. */
      max-width: 48px;
      border-radius: 3px 3px 2px 2px;
      background: color-mix(in srgb, var(--g-accent) 32%, transparent);
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    .weekbars i.current {
      background: var(--g-accent);
    }

    /* ---- event ticks ---------------------------------------------------- */
    .ticks {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 32px;
      width: 100%;
    }

    .ticks i {
      flex: 1;
      min-width: 0;
      /* Same reason as the week bars, tighter because a tick is a tick: the
         concept's fourteen sit near 20px wide. */
      max-width: 20px;
      border-radius: 2px;
      background: var(--g-accent);
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    /* A day that happened and did nothing, as against a day with no data at
       all — which is not drawn. */
    .ticks i.stub {
      background: color-mix(in srgb, var(--g-accent) 18%, transparent);
    }

    /* A bucket row is bottom-aligned inside a fixed-height box, so a short bar
       leaves its air ABOVE it and none below: the flex gap is the only
       clearance, and a hard full-width edge lands straight on the caption.
       bar does not need this because its 6dp track fills its own box, so the
       space reads on both sides of it.

       The added value is .gauge-main's own gap again, doubling the clearance to
       the 16dp the concept puts between a value row and a chart — its number
       for "a chart needs room", as against the 8dp it uses for a chart's own
       labels. Adjacent-sibling, so an uncaptioned tile gains no dead space.

       WEEKBARS ONLY, and that is a measured decision rather than a guess. The
       four captioned charts sat at: bar 4px, weekbars 4px, sparkline 10px,
       events 10px. bar is the one that reads correctly at 4px because its
       track fills its box; weekbars at the same 4px is the one that reads
       cramped. The sparkline and the tonal event row were already at 10px —
       two and a half times bar's clearance — so neither needed touching, and
       widening them would have been fixing a number nobody was looking at. */
    .weekbars + .gauge-caption {
      margin-top: clamp(4px, 2.5cqi, 8px);
    }

    /* ---- detail summary ------------------------------------------------ */
    .detail-card,
    .progress-summary {
      container-type: inline-size;
      box-sizing: border-box;
      width: 100%;
      max-width: var(--ms-size-row, none);
      border-radius: 28px;
      padding: clamp(18px, 4cqi, 28px);
      background: var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      color: var(--ms-color-on, var(--primary-text-color));
    }

    .detail-top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
    }

    .detail-primary {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 12px;
    }

    .detail-bars {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      gap: clamp(4px, 1.4cqi, 8px);
      height: 52px;
      flex: 0 1 42%;
    }

    .detail-bars i {
      width: clamp(8px, 3.2cqi, 20px);
      max-width: 20px;
      border-radius: 6px 6px 3px 3px;
      background: color-mix(in srgb, var(--g-accent) 34%, transparent);
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    .detail-bars i.current {
      background: var(--g-accent);
    }

    .detail-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 8px;
      margin-top: 20px;
    }

    .detail-metric {
      min-width: 0;
      padding: 12px;
      border-radius: 16px;
      background: color-mix(in srgb, currentColor 6%, transparent);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .detail-metric span {
      font-size: 11px;
      line-height: 16px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 0.7;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .detail-metric strong {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(17px, 5cqi, 24px);
      line-height: 1.15;
      font-weight: 650;
      overflow-wrap: anywhere;
    }

    /* ---- progress summary --------------------------------------------- */
    .progress-summary-main {
      display: flex;
      align-items: center;
      gap: clamp(18px, 5cqi, 32px);
    }

    .progress-ring {
      width: clamp(82px, 25cqi, 120px);
      height: clamp(82px, 25cqi, 120px);
      flex: 0 0 auto;
    }

    .progress-summary-copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .progress-headline {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(26px, 8cqi, 42px);
      line-height: 1.08;
      font-weight: 650;
      overflow-wrap: anywhere;
    }

    .progress-caption,
    .progress-footer {
      font-size: clamp(12px, 3.8cqi, 16px);
      line-height: 1.35;
      opacity: 0.72;
    }

    .progress-footer {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      font-weight: 600;
    }

    .progress-footer ha-icon {
      --mdc-icon-size: 20px;
      flex: 0 0 auto;
    }

    @container (max-width: 300px) {
      .progress-summary-main {
        align-items: flex-start;
      }

      .progress-ring {
        width: 72px;
        height: 72px;
      }
    }

    /* ---- the tonal session row ------------------------------------------ */
    .event-row {
      container-type: inline-size;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 10px;
      /* extra-large 28dp */
      border-radius: 28px;
      padding: clamp(14px, 3.5cqi, 20px);
      background: var(--ms-color, var(--md-sys-color-primary-container, #d7e3ff));
      color: var(--ms-color-on, var(--md-sys-color-on-primary-container, #001b3f));
      max-width: var(--ms-size-row, none);
    }

    /* M3 title-small 14sp */
    .event-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],$i=[{value:"percent",label:"Percent (filling cookie)"},{value:"battery",label:"Battery (vertical bar)"},{value:"temperature",label:"Temperature (thermometer)"},{value:"power",label:"Power (load bars)"},{value:"energy",label:"Energy"},{value:"binary",label:"On/off (spinning star)"},{value:"plain",label:"Plain value"},{value:"vacuum",label:"Robot vacuum (state + room + battery bar)"},{value:"fill",label:"Gauge · tile floods to the value"},{value:"bar",label:"Gauge · value over a track"},{value:"ladder",label:"Gauge · ladder of bars"},{value:"ring",label:"Gauge · ring beside the value"},{value:"status",label:"Status row (tonal, icon badge + state)"},{value:"scale",label:"Gauge · position on a ramp, with reference marks"},{value:"spark",label:"History · area sparkline hero"},{value:"sparkline",label:"History · bare line"},{value:"weekbars",label:"History · a bar per day"},{value:"events",label:"History · event ticks (tonal row)"},{value:"detail",label:"Summary · value, history and supporting metrics"},{value:"progress_summary",label:"Summary · progress ring and authored copy"}],Ci=["spark","sparkline","weekbars","events"],Si=["weekbars","events"],Ti=["fill","bar","ladder","ring","scale","progress_summary"];customElements.define("materia-glance-tile-editor",class extends We{_formData(){const e=this._config?.variant;return{variant:"percent",..."percent"===e?{critical_dry:10,dry_below:20,soggy_above:60,dry_label:"Needs water now",soon_label:"Water soon",optimal_label:"Optimal",wet_label:"Overwatered"}:"power"===e?{max:3e3,bars:5}:"ladder"===e?{bars:5}:"status"===e?{dots:4}:"spark"===e||"sparkline"===e?{hours:24,points:48,history_refresh:5,show_delta:"spark"===e}:"weekbars"===e||"events"===e?{days:3,aggregate:"delta",history_refresh:5}:"detail"===e?{days:7,aggregate:"delta",history_refresh:5}:{},...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){const e=this._config?.variant,t={title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"variant",label:"Category",required:!0,selector:{select:{mode:"dropdown",options:$i}}},{name:"name",label:"Title",selector:{text:{}}},{name:"icon",label:"Icon (overrides entity icon)",selector:{icon:{}}},{name:"label",label:"Subtitle",selector:{text:{}}}]},i={title:"Options",icon:"mdi:tune",fields:[]};"temperature"===e&&i.fields.push({name:"min",label:"Scale min (default 10°)",selector:{number:{mode:"box"}}},{name:"max",label:"Scale max (default 30°)",selector:{number:{mode:"box"}}}),"power"===e&&i.fields.push({name:"max",label:"Full-load watts (default 3000)",selector:{number:{mode:"box"}}},{name:"bars",label:"Number of bars (default 5)",selector:{number:{min:2,max:40,mode:"box"}}}),Ti.includes(e)&&i.fields.push({name:"min",label:"Scale min (default: the entity's min attribute, else 0)",selector:{number:{mode:"box",step:"any"}}},{name:"max",label:"Scale max (default: the entity's max attribute, else 100 for a %)",helper:"Without a max the gauge cannot be calibrated and the tile falls back to a plain value.",selector:{number:{mode:"box",step:"any"}}},{name:"caption",label:"Caption under the gauge",helper:"Your sentence, in your language. Placeholders: {value} {min} {max} {unit} {percent}. Jinja templates work too. Empty shows the bare top of the scale.",template:!0,selector:{text:{}}},{name:"precision",label:"Decimal places (default: at most 1)",selector:{number:{min:0,max:6,mode:"box"}}}),"ladder"===e&&i.fields.push({name:"bars",label:"Number of bars (default 5)",selector:{number:{min:2,max:40,mode:"box"}}}),"scale"===e&&i.fields.push({name:"good",label:"Which end is good",helper:"Left empty the ramp is a neutral track and the card passes no judgement — the value's position and the reference marks still show. Set it and the ramp runs through the severity scale in that direction. Never inferred from the entity.",selector:{select:{mode:"dropdown",options:[{value:"low",label:"Low values are good (consumption, latency)"},{value:"high",label:"High values are good (efficiency, signal)"}]}}},{name:"min_label",label:"Label at the low end",helper:"Your words. Placeholders: {bound} {unit} {value} {min} {max}. Empty shows the bare bound.",template:!0,selector:{text:{}}},{name:"max_label",label:"Label at the high end",helper:"Same placeholders. Empty shows the bare bound.",template:!0,selector:{text:{}}},{name:"show_delta",label:"Show the change pill",helper:"Fetches history only when switched on, since a change needs a window to measure over.",selector:{boolean:{}}}),"status"===e&&i.fields.push({name:"active_state",label:"State(s) that count as active",helper:'Comma-separated. Left empty it is derived from the domain (cover open, vacuum cleaning, media_player playing…), falling back to "on" — so a sensor reading "Connected" needs it spelled out here.',selector:{text:{}}},{name:"dots",label:"Indicator dots (default 4)",helper:"Filled to the value when the entity has a scale; otherwise they pulse while it is active.",selector:{number:{min:2,max:12,mode:"box"}}}),"plain"===e&&i.fields.push({name:"battery_entity",label:"Paired battery sensor (adds the vertical bar)",selector:{entity:{domain:"sensor"}}}),"detail"===e&&i.fields.push({name:"days",label:"History bars (days)",selector:{number:{min:1,max:90,mode:"box"}}},{name:"aggregate",label:"What each history bar measures",selector:{select:{mode:"dropdown",options:[{value:"delta",label:"Change across the day"},{value:"mean",label:"Average"},{value:"min",label:"Minimum"},{value:"max",label:"Maximum"},{value:"sum",label:"Sum of samples"},{value:"count",label:"Number of samples"}]}}},{name:"metric_1_entity",label:"Supporting metric 1",selector:{entity:{}}},{name:"metric_1_label",label:"Metric 1 label",template:!0,selector:{text:{}}},{name:"metric_1_value",label:"Metric 1 display override",helper:"Optional Jinja or text. Placeholders: {value} {unit} {state} {history_changed} {history_date} {history_time}. History timestamps ignore same-value restores after unavailable.",template:!0,selector:{text:{}}},{name:"metric_2_entity",label:"Supporting metric 2",selector:{entity:{}}},{name:"metric_2_label",label:"Metric 2 label",template:!0,selector:{text:{}}},{name:"metric_2_value",label:"Metric 2 display override",template:!0,selector:{text:{}}},{name:"metric_3_entity",label:"Supporting metric 3",selector:{entity:{}}},{name:"metric_3_label",label:"Metric 3 label",template:!0,selector:{text:{}}},{name:"metric_3_value",label:"Metric 3 display override",template:!0,selector:{text:{}}},{name:"history_refresh",label:"Refresh history every N minutes",selector:{number:{min:1,max:180,mode:"box"}}}),"progress_summary"===e&&i.fields.push({name:"headline",label:"Headline",helper:"Optional Jinja or text. Empty uses the entity state. Placeholders: {value} {min} {max} {unit} {percent}.",template:!0,selector:{text:{}}},{name:"footer",label:"Footer",helper:"Optional Jinja or text. Uses the same placeholders as the headline.",template:!0,selector:{text:{}}},{name:"footer_icon",label:"Footer icon",selector:{icon:{}}}),"vacuum"===e&&i.fields.push({name:"status_entity",label:"Detailed status sensor (shown as the state)",selector:{entity:{domain:"sensor"}}},{name:"room_entity",label:"Current room sensor (shown while cleaning)",selector:{entity:{domain:"sensor"}}},{name:"battery_entity",label:"Battery sensor (adds the vertical bar)",selector:{entity:{domain:"sensor"}}}),"percent"===e&&i.fields.push({name:"critical_dry",label:"Critical dry, ≤% (default 10 — red)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_below",label:"Water soon, ≤% (default 20 — orange)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"soggy_above",label:"Overwatered, >% (default 60 — blue)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_label",label:'"Needs water now" label',selector:{text:{}}},{name:"soon_label",label:'"Water soon" label',selector:{text:{}}},{name:"optimal_label",label:'"Optimal" label',selector:{text:{}}},{name:"wet_label",label:'"Overwatered" label',selector:{text:{}}}),Ci.includes(e)&&(Si.includes(e)?i.fields.push({name:"days",label:"Days of history (default 3)",helper:"Kept short on purpose: a window longer than your recorder keeps returns nothing at all, not a shorter series. Days with no data are simply not drawn.",selector:{number:{min:1,max:90,mode:"box"}}},{name:"aggregate",label:"What each bar measures (default: change)",helper:"change = how much the value moved that day (counters). mean/min/max/sum/count for measurements.",selector:{select:{mode:"dropdown",options:[{value:"delta",label:"Change across the day"},{value:"mean",label:"Average"},{value:"min",label:"Minimum"},{value:"max",label:"Maximum"},{value:"sum",label:"Sum of samples"},{value:"count",label:"Number of samples"}]}}},{name:"summary_period",label:"Separate caption period",helper:"Keeps the visible bars compact while exposing a wider change to the caption. Current month adds {summary_delta}, {summary_delta_signed}, and {summary_delta_pct}.",selector:{select:{mode:"dropdown",options:[{value:"current_month",label:"Current calendar month"}]}}}):i.fields.push({name:"hours",label:"Hours of history (default 24)",helper:"A window longer than your recorder keeps returns nothing at all.",selector:{number:{min:1,max:2160,mode:"box"}}},{name:"points",label:"Points plotted (default 48)",selector:{number:{min:2,max:400,mode:"box"}}},{name:"show_delta",label:"Show the change pill",selector:{boolean:{}}},{name:"delta_label",label:"Change pill text",helper:"Placeholders: {delta} {delta_pct} {from} {to} {unit} {hours} {days}. Empty shows just the signed change.",template:!0,selector:{text:{}}}),i.fields.push({name:"caption",label:"Caption",helper:"Your words. Placeholders: {value} {unit} {hours} {days} {buckets} {summary_delta} {summary_delta_signed} {summary_delta_pct}. Jinja templates work too.",template:!0,selector:{text:{}}},{name:"history_refresh",label:"Refresh every N minutes (default 5)",helper:"History is polled on this interval, never on every state change.",selector:{number:{min:1,max:180,mode:"box"}}}));const s={title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"Accent color (fill / bars / star)",color:!0,selector:{text:{}}},{name:"color",label:"Tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text color",color:!0,template:!0,selector:{text:{}}}]},a={title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return i.fields.length?[t,i,s,a]:[t,s,a]}});const zi="var(--md-sys-cust-color-weather-rain, #5fa8f5)",Ai="var(--md-sys-cust-color-scale-green, #5E9E50)",Ei="var(--md-sys-cust-color-scale-yellow, #C7A128)",Mi="var(--md-sys-cust-color-scale-orange, #D9713C)",Oi="var(--md-sys-cust-color-scale-red, #C94D42)",Fi=["on","open","running","playing","heat","heating","home","true","active"],Di={cleaning:"gt_state_cleaning",docked:"gt_state_docked",paused:"gt_state_paused",idle:"gt_state_idle",returning:"gt_state_returning",error:"gt_state_error"},qi=new Set(["spark","sparkline","weekbars","events","detail"]);class Ni extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedLabel:{state:!0},_resolvedCaption:{state:!0},_resolvedDeltaLabel:{state:!0},_resolvedMinLabel:{state:!0},_resolvedMaxLabel:{state:!0},_resolvedHeadline:{state:!0},_resolvedFooter:{state:!0},_hist:{state:!0}};static styles=ki;static getConfigElement(){return document.createElement("materia-glance-tile-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("sensor."))||"";return{entity:t,variant:"percent"}}setConfig(e){if(!e.entity)throw new Error("Materia Glance Tile: entity is required");if(!e.variant)throw new Error("Materia Glance Tile: variant is required — pick the value category");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("label","_resolvedLabel"),this._resolveField("caption","_resolvedCaption"),this._resolveField("delta_label","_resolvedDeltaLabel"),this._resolveField("min_label","_resolvedMinLabel"),this._resolveField("max_label","_resolvedMaxLabel"),this._resolveField("headline","_resolvedHeadline"),this._resolveField("footer","_resolvedFooter"),(Array.isArray(this.config.markers)?this.config.markers:[]).forEach((e,t)=>this._resolveTemplateValue(`marker_${t}`,e?.label)),this._configuredMetrics().forEach((e,t)=>{this._resolveTemplateValue(`metric_label_${t}`,e?.label),this._resolveTemplateValue(`metric_value_${t}`,e?.value)}),this._loadHistory())}get _label(){return this._isTemplate(this.config.label)?this._resolvedLabel:this.config.label}get _stateObj(){return this.hass?.states[this.config.entity]}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}get _unit(){return this.config.unit??this._stateObj?.attributes?.unit_of_measurement??""}get _name(){return this.config.name??this._stateObj?.attributes?.friendly_name??this.config.entity}_icon(e){return this.config.icon||this._stateObj?.attributes?.icon||e}get _variant(){return this.config.variant}_fmtState(){const e=this._stateObj;return this.hass.formatEntityState?.(e)??e.state}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e||this._isUnavailable(e))return I`<ha-card><div class="rect-tile unavailable">
        <div class="header"><ha-icon icon=${this._icon("mdi:help-circle-outline")}></ha-icon><span>${this._name}</span></div>
        <div class="sub hint">${e?this._fmtState():"Entity not found"}</div>
      </div></ha-card>`;const t={percent:()=>this._percent(),battery:()=>this._battery(),temperature:()=>this._temperature(),power:()=>this._ladder({power:!0}),ladder:()=>this._ladder({}),fill:()=>this._fill(),bar:()=>this._bar(),ring:()=>this._ring(),status:()=>this._status(),scale:()=>this._scale(),spark:()=>this._spark({area:!0}),sparkline:()=>this._spark({area:!1}),weekbars:()=>this._bucketBars({events:!1}),events:()=>this._bucketBars({events:!0}),detail:()=>this._detail(),progress_summary:()=>this._progressSummary(),energy:()=>this._energy(),binary:()=>this._binary(),plain:()=>this._plain(),vacuum:()=>this._vacuum()},i=(t[this._variant]||t.plain)(),s=this._isTemplate(this.config.color)?this._resolvedColor:this.config.color,a=this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on,n=null!=this.config.size?Math.min(10,Math.max(1,this.config.size)):null,o=null!=n?["120px","150px","185px","225px","270px","320px","380px","460px","560px","none"][n-1]:"200px";return I`
      <ha-card
        style="--ms-size:${o};${null!=n?`--ms-size-row:${o};`:""}${s?`--ms-color:${s};`:""}${a?`--ms-color-on:${a};`:""}${this.config.accent?`--ms-accent:${this.config.accent};`:""}"
        @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
      >
        ${i}
      </ha-card>
    `}_header(e){return I`<div class="header"><ha-icon icon=${this._icon(e)}></ha-icon><span>${this._name}</span></div>`}_moistureZone(e){const t=this.config.critical_dry??10,i=this.config.dry_below??20,s=this.config.soggy_above??60;return e<=t?{fill:Oi,status:this.config.dry_label??$e("gt_needs_water_now",this.hass)}:e<=i?{fill:Mi,status:this.config.soon_label??$e("gt_water_soon",this.hass)}:e<=s?{fill:Ai,status:this.config.optimal_label??$e("gt_optimal",this.hass)}:{fill:zi,status:this.config.wet_label??$e("gt_overwatered",this.hass)}}_percent(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=Math.min(1,Math.max(0,e/100)),i=this._stateObj.attributes.device_class,s="moisture"===i;let a=null,n=null;if("battery"===i)a=t>.4?Ai:t>.15?Mi:Oi;else if(s){const t=this._moistureZone(e);a=t.fill,n=t.status}else"humidity"===i&&(a=zi);a&&(a=`color-mix(in srgb, ${a} 30%, transparent)`);const o=100-100*t,r="humidity"===i||s;let l;if(r){let e=`M-100 ${o.toFixed(1)}`;for(let t=-100;t<100;t+=25){e+=` Q ${t+12.5} ${(o+(t/25%2==0?-1.6:1.6)).toFixed(1)} ${t+25} ${o.toFixed(1)}`}l=e+" V102 H-100 Z"}else l=`M-2 ${o+2.5} Q 50 ${o-2.5} 102 ${o+2.5} V102 H-2 Z`;const c="battery"===i?"mdi:battery":s?"mdi:sprout":"mdi:water-percent";return I`
      <div class="rect-tile clip">
        <svg class="fill-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${t>.005?H`<path d=${l}
                class="level-fill ${r?"drift":""}" style=${a?`fill:${a}`:""} />`:""}
        </svg>
        <div class="overlay">
          ${this._header(c)}
          <div class="big">${Math.round(e)}<span class="unit">%</span></div>
          ${this._label??n?I`<div class="sub">${this._label??n}</div>`:""}
        </div>
      </div>
    `}_tempColor(e,t){const i="°F"===t?5*(e-32)/9:e;return i<16?zi:i<23?Ai:i<27?Mi:Oi}_temperature(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=this._unit||"°C",i=this.config.min??("°F"===t?50:10),s=this.config.max??("°F"===t?86:30),a=Math.min(1,Math.max(0,(e-i)/(s-i))),n=this._tempColor(e,t);return I`
      <div class="rect-tile left">
        ${this._header("mdi:thermometer")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(10*e)/10}<span class="unit">${t}</span></div>
            ${this._label?I`<div class="sub">${this._label}</div>`:""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8,100*a)}%;background:${n}"></i>
          </div>
        </div>
      </div>
    `}_batteryColor(e){return e>.4?Ai:e>.15?Mi:Oi}_battery(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=Math.min(1,Math.max(0,e/100)),i=this._batteryColor(t);return I`
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
    `}static _POWER_PRESET={adapt(e,t){const i="kW"===(t.attributes.unit_of_measurement||"W")?1e3*e:e;return{value:i,unit:i>=1e3?"kW":"W",maxDefault:3e3}},displayValue:e=>e>=1e3?Math.round(e/100)/10:Math.round(e)};_gauge(e=null){const t=this._stateObj,i=this._num(t?.state);if(null==i)return null;const s=e?.adapt?e.adapt(i,t):{},a=s.value??i,n=s.unit??this._unit,o=t.attributes||{},r=this._num(this.config.min)??this._num(o.min)??s.minDefault??0,l=this._num(this.config.max)??this._num(o.max)??s.maxDefault??("%"===n?100:null);if(null==l||!(l>r))return null;const c=Math.min(1,Math.max(0,(a-r)/(l-r))),d=e?.displayValue?e.displayValue(a):a,h={value:a,min:r,max:l,frac:c,unit:n,display:this._fmtNum(d),accent:this._gaugeAccent(c)};return h.caption=this._caption(h,"bar"===this._variant),h}_fmtNum(e){const t=this.hass?.locale?.language||"en",i=this._num(this.config.precision);if(null!=i){const s=Math.max(0,Math.min(6,Math.round(i)));return e.toLocaleString(t,{minimumFractionDigits:s,maximumFractionDigits:s})}return(Math.round(10*e)/10).toLocaleString(t)}_interpolate(e,t,i=null){let s=String(e);t&&(s=s.replaceAll("{value}",t.display).replaceAll("{min}",this._fmtNum(t.min)).replaceAll("{max}",this._fmtNum(t.max)).replaceAll("{unit}",t.unit??"").replaceAll("{percent}",String(Math.round(100*t.frac))));for(const[e,t]of Object.entries(i||{}))s=s.replaceAll(`{${e}}`,String(t));return s}_caption(e,t){const i=this.config.caption;if(null!=i&&""!==i){const t=this._isTemplate(i)?this._resolvedCaption:i;return null==t?"":this._interpolate(t,e)}return t?`${this._fmtNum(e.max)}${e.unit?` ${e.unit}`:""}`:""}_gaugeAccent(e){if(this.config.accent)return this.config.accent;const t=this.config.ramp;if(Array.isArray(t)&&t.length){const i=100*e;for(const e of t){const t=this._num(e?.below);if(null==t||i<=t)return e?.color||"var(--md-sys-color-primary, #6750a4)"}return t[t.length-1]?.color||"var(--md-sys-color-primary, #6750a4)"}return"battery"===this._stateObj?.attributes?.device_class?this._batteryColor(e):"var(--md-sys-color-primary, #6750a4)"}_valueSizeClass(e){const t=String(e).replace(/\s/g,"").length;return t<=3?"v-display":t<=5?"v-headline":"v-headline-sm"}_captionLine(e){const t=null!=this._label&&""!==this._label?this._label:e.caption;return t?I`<div class="gauge-caption">${t}</div>`:V}_gaugeValueLine(e){return I`<div class="gauge-value ${this._valueSizeClass(e.display)}">
      ${e.display}${e.unit?I`<span class="gauge-unit">${e.unit}</span>`:V}
    </div>`}_fill(){const e=this._gauge();return e?I`
      <div class="rect-tile left clip gauge">
        <div class="flood" style="width:${(100*e.frac).toFixed(3)}%;--g-accent:${e.accent}"></div>
        <div class="gauge-body">
          ${this._header("m3o:speed")}
          <div class="gauge-main">
            ${this._gaugeValueLine(e)}
            ${this._captionLine(e)}
          </div>
        </div>
      </div>
    `:this._plain()}_bar(){const e=this._gauge();return e?I`
      <div class="rect-tile left gauge">
        ${this._header("m3o:speed")}
        <div class="gauge-main">
          ${this._gaugeValueLine(e)}
          <div class="track" style="--g-accent:${e.accent}">
            <i style="width:${(100*e.frac).toFixed(3)}%"></i>
          </div>
          ${this._captionLine(e)}
        </div>
      </div>
    `:this._plain()}_ladder(e={}){const t=this._gauge(e.power?Ni._POWER_PRESET:null);if(!t)return this._plain();const i=Math.max(2,Math.min(40,Math.round(this._num(this.config.bars)??5))),s=Math.max(0,Math.min(i,Math.ceil(t.frac*i)));return I`
      <div class="rect-tile left gauge">
        ${this._header(e.power?"m3o:bolt":"m3o:bar-chart")}
        <!-- The ladder is a BAND across the card with the value beneath it,
             not a column beside the value. Tucked into a right-hand column it
             became a small cluster bottom-right, which throws away the one
             thing a climbing ramp is for: reading "how much" from the shape
             before you read the number. -->
        <div class="ladder" style="--g-accent:${t.accent}">
          ${Array.from({length:i},(e,t)=>I`<i class=${t<s?"lit":""} style="height:${(i>1?32+t/(i-1)*68:100).toFixed(2)}%"></i>`)}
        </div>
        <div class="gauge-main">
          ${this._gaugeValueLine(t)}
          ${this._captionLine(t)}
        </div>
      </div>
    `}_ring(){const e=this._gauge();if(!e)return this._plain();const t=100*e.frac;return I`
      <div class="rect-tile left gauge">
        ${this._header("m3o:donut-large")}
        <div class="split-row">
          <div class="split-main">
            ${this._gaugeValueLine(e)}
            ${this._captionLine(e)}
          </div>
          <svg class="ring" viewBox="0 0 44 44" style="--g-accent:${e.accent}">
            <circle class="ring-track" cx="22" cy="22" r=${19}></circle>
            ${t>.5?H`<circle class="ring-arc" cx="22" cy="22" r=${19} pathLength="100"
                  stroke-dasharray=${`${t.toFixed(3)} 100`}></circle>`:V}
          </svg>
        </div>
      </div>
    `}_valueRow(e,t=V){return I`<div class="value-row">${this._gaugeValueLine(e)}${t}</div>`}_rampGradient(e){const t=(e||[]).filter(e=>e&&e.color);if(!t.length)return null;const i=[];let s=0;return t.forEach((e,a)=>{const n=this._num(e.below),o=null==n?100:Math.max(s,Math.min(100,n)),r=(s+o)/2;0===a&&i.push(`${e.color} 0%`),i.push(`${e.color} ${r.toFixed(1)}%`),a===t.length-1&&i.push(`${e.color} 100%`),s=o}),`linear-gradient(90deg, ${i.join(", ")})`}_scaleRamp(){const e=this._rampGradient(this.config.ramp);if(e)return e;const t=String(this.config.good??"").toLowerCase();if("low"!==t&&"high"!==t)return null;const i="low"===t?[Ai,Ei,Oi]:[Oi,Ei,Ai];return`linear-gradient(90deg, ${i[0]} 0%, ${i[1]} 55%, ${i[2]} 100%)`}_scaleMarkers(e){const t=Array.isArray(this.config.markers)?this.config.markers:[],i=[];return t.forEach((t,s)=>{const a=t?.value;let n=this._num(a);if(null==n&&"string"==typeof a&&a.includes(".")&&(n=this._num(this.hass?.states?.[a]?.state)),null==n)return;const o=Math.min(1,Math.max(0,(n-e.min)/(e.max-e.min))),r={marker:this._fmtNum(n),unit:e.unit??""},l=t?.label;let c="";null!=l&&""!==l&&(c=this._isTemplate(l)?this._interpolate(this._tplResults?.[`marker_${s}`]??"",e,r):this._interpolate(l,e,r)),i.push({frac:o,label:c,color:t?.color})}),i}_endLabel(e,t,i,s){const a=this.config[e];if(null==a||""===a)return this._fmtNum(i);const n=this._isTemplate(a)?this[t]:a;return null==n?"":this._interpolate(n,s,{bound:this._fmtNum(i),unit:s.unit??""})}_scale(){const e=this._gauge();if(!e)return this._plain();const t=this._scaleRamp(),i=this._scaleMarkers(e),s=this.config.show_delta?this._deltaPill(this._histSeries):V,a=e=>`${(100*e).toFixed(3)}%`;return I`
      <div class="rect-tile left gauge scale-tile">
        ${this._header("m3o:straighten")}
        ${this._valueRow(e,s)}
        <div class="ramp" style=${t?`background:${t}`:V}>
          ${i.map(e=>I`<i
                class="ref"
                style="left:${a(e.frac)}${e.color?`;--ref-color:${e.color}`:""}"
              ></i>`)}
          <i class="here" style="left:${a(e.frac)}"></i>
        </div>
        <div class="scale-labels">
          <span class="lo">${this._endLabel("min_label","_resolvedMinLabel",e.min,e)}</span>
          ${i.map(e=>e.label?I`<span class="ref-label" style="left:${a(e.frac)}">${e.label}</span>`:V)}
          <span class="hi">${this._endLabel("max_label","_resolvedMaxLabel",e.max,e)}</span>
        </div>
      </div>
    `}_status(){const e=function(e,t){if(!e)return!1;const i=String(e.state);if(fi.has(i.toLowerCase()))return!1;const s=(e,t)=>String(e).toLowerCase()===String(t).toLowerCase();if(null!=t&&""!==t){const e=Array.isArray(t)?t:String(t).split(",").map(e=>e.trim()).filter(Boolean);return e.some(e=>s(e,i))}const a=String(e.entity_id||"").split(".")[0],n=gi[a]??"on";return(Array.isArray(n)?n:[n]).some(e=>s(e,i))}(this._stateObj,this.config.active_state),t=Math.max(2,Math.min(12,Math.round(this._num(this.config.dots)??4))),i=this._gauge(),s=i?Math.max(0,Math.min(t,Math.ceil(i.frac*t))):e?t:0;return I`
      <div class="status-row ${e?"active":""}">
        <div class="status-badge">
          <ha-icon icon=${this._icon(e?"m3o:check-circle":"m3o:info")}></ha-icon>
        </div>
        <div class="status-main">
          <div class="status-state">${this._fmtState()}</div>
          <div class="status-sub">${this._label??this._name}</div>
        </div>
        <div class="status-dots ${!i&&e?"pulse":""}">
          ${Array.from({length:t},(e,t)=>I`<i class=${t<s?"on":""} style="--i:${t}"></i>`)}
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
    `}_binary(){const e=Fi.includes(this._stateObj.state),t=lt(50,50,46,{vertices:8,innerRadius:.8,rounding:.15,rotate:-Math.PI/2});return I`
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
    `}_plain(){const e=this._stateObj,t=this._num(e.state),i=null!=t?I`<div class="big">${Math.round(10*t)/10}<span class="unit"> ${this._unit}</span></div>`:I`<div class="big small-big">${this._fmtState()}</div>`,s=this.config.battery_entity?this.hass.states[this.config.battery_entity]:null,a=s?this._num(s.state):null;if(null!=a){const e=Math.min(1,Math.max(0,a/100)),t=this._batteryColor(e);return I`
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
    `}_fmtObj(e){return this.hass.formatEntityState?.(e)??e.state}_vacuumStateText(e){const t=Di[String(e.state).toLowerCase()];return t?$e(t,this.hass):this._fmtObj(e)}_vacuum(){const e=this._stateObj,t="cleaning"===e.state,i=this.config.status_entity?this.hass.states[this.config.status_entity]:null,s=this._vacuumStateText(i??e),a=this.config.room_entity?this.hass.states[this.config.room_entity]:null,n=t&&a?this._fmtObj(a):"",o=this.config.battery_entity?this.hass.states[this.config.battery_entity]:null,r=o?this._num(o.state):null,l=null!=r?Math.min(1,Math.max(0,r/100)):null,c=null!=l?this._batteryColor(l):null;return I`
      <div class="rect-tile vacuum ${t?"active":""}">
        ${this._header(this._icon("mdi:robot-vacuum"))}
        <div class="vacuum-row">
          <div class="vacuum-main">
            <div class="vacuum-state"><div class="big small-big">${s}</div></div>
            <div class="sub">${n}</div>
          </div>
          ${null!=l?I`<div class="thermo"><i style="height:${Math.max(8,100*l)}%;background:${c}"></i></div>`:""}
        </div>
      </div>
    `}get _histHours(){if("weekbars"===this._variant||"events"===this._variant||"detail"===this._variant){const e=this._num(this.config.days)??("detail"===this._variant?7:3);let t=Math.max(1,Math.min(90,Math.round(e)));return"current_month"===this.config.summary_period&&(t=Math.max(t,(new Date).getDate()+1)),24*t}return Math.max(1,Math.min(2160,Math.round(this._num(this.config.hours)??24)))}get _needsHistory(){return qi.has(this._variant)||!0===this.config?.show_delta}get _histSeries(){return function(e,t,i=Date.now()){const s=e||[],a=t?.state;if(null==a||_i.has(String(a).toLowerCase()))return s;const n=Number(a);if(!Number.isFinite(n))return s;const o=bi({lu:t.last_changed??t.last_updated});if(null==o)return s;const r=Math.min(o,i),l=s[s.length-1];if(l&&l.v===n&&l.t>=r)return s;const c=[...s,{t:r,v:n}];return c.sort((e,t)=>e.t-t.t),c}(this._hist||[],this._stateObj)}connectedCallback(){if(super.connectedCallback(),!this._needsHistory)return;const e=Math.max(1,Math.min(180,Math.round(this._num(this.config?.history_refresh)??5)));this._histTimer=setInterval(()=>this._loadHistory(!0),60*e*1e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._histTimer),this._histTimer=null}_loadHistory(e=!1){if(!this._needsHistory||!this.hass||!this.config?.entity)return;const t=`${this.config.entity}|${this._histHours}`;if(!e&&this._histKey===t)return;this._histKey=t;const i=this._histToken=(this._histToken||0)+1;(async function(e,t,i,s=Date.now()){if(!(e?.connection&&t&&i>0))return[];const a=new Date(s-3600*i*1e3).toISOString();try{const i=await e.connection.sendMessagePromise({type:"history/history_during_period",start_time:a,end_time:new Date(s).toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0}),n=i?.[t]||[],o=[];for(const e of n){const t=bi(e);null!=t&&o.push({t:t,v:vi(e)})}return o.sort((e,t)=>e.t-t.t),o}catch(e){return[]}})(this.hass,this.config.entity,this._histHours).then(e=>{i===this._histToken&&(this._hist=e)})}_fmtSigned(e){return(e>=0?"+":"")+this._fmtNum(e)}_deltaPill(e){if(!1===this.config.show_delta)return V;const t=wi(e);if(!t)return V;const i=this._unit,s={delta:this._fmtSigned(t.abs)+(i?` ${i}`:""),delta_pct:null==t.pct?"":`${this._fmtSigned(t.pct)}%`,from:this._fmtNum(t.from),to:this._fmtNum(t.to),unit:i,hours:String(this._histHours),days:String(Math.round(this._histHours/24))},a=this.config.delta_label,n=null!=a&&""!==a?this._interpolate(this._isTemplate(a)?this._resolvedDeltaLabel:a,null,s):s.delta;if(null==n||""===n)return V;const o=t.abs>0?"m3o:trending-up":t.abs<0?"m3o:trending-down":"m3o:trending-flat";return I`<div class="delta-pill">
      <ha-icon icon=${o}></ha-icon><span>${n}</span>
    </div>`}_sparkPaths(e,t,i,s){const a=e.filter(e=>null!=e.v).map(e=>e.v);if(!a.length)return[];const n=Math.min(...a),o=Math.max(...a)-n,r=i-2*s,l=e.length,c=e=>l>1?e/(l-1)*t:t/2,d=e=>0===o?s+r/2:s+(1-(e-n)/o)*r,h=[];for(const t of function(e){const t=[];let i=[];for(const s of e||[])null==s.v?(i.length&&t.push(i),i=[]):i.push(s);return i.length&&t.push(i),t}(e)){const s=t.map(t=>e.indexOf(t));let a="";t.forEach((e,t)=>{a+=`${0===t?"M":" L"}${c(s[t]).toFixed(2)} ${d(e.v).toFixed(2)}`}),1===t.length&&(a+=` L${(c(s[0])+.01).toFixed(2)} ${d(t[0].v).toFixed(2)}`);const n=c(s[0]),o=c(s[s.length-1]);h.push({line:a,area:`${a} L${o.toFixed(2)} ${i} L${n.toFixed(2)} ${i} Z`})}return h}_spark(e){const t=this._num(this._stateObj.state);if(null==t)return this._plain();const i=this._gauge(),s=i?i.accent:this._gaugeAccent(1),a=this._histSeries,n=function(e,t,i,s=Date.now()){const a=Math.max(2,Math.min(400,Math.round(t)));if(!(e?.length&&i>0))return[];const n=s-3600*i*1e3,o=(s-n)/a,r=[];let l=0,c=null;for(let t=0;t<a;t++){const i=n+o*(t+.5);for(;l<e.length&&e[l].t<=i;)c=e[l].v,l++;r.push({t:i,v:0===l?null:c})}return r}(a,this._num(this.config.points)??48,this._histHours),o=e.area?340:120,r=e.area?60:26,l=this._sparkPaths(n,o,r,e.area?6:3),c=this._fmtNum(t),d=this.config.caption?this._interpolate(this._isTemplate(this.config.caption)?this._resolvedCaption??"":this.config.caption,i,{hours:String(this._histHours),days:String(Math.round(this._histHours/24))}):this._label??"",h=l.length?I`<svg
          class=${e.area?"spark spark-area":"spark spark-line"}
          viewBox="0 0 ${o} ${r}"
          preserveAspectRatio="none"
          style="--g-accent:${s}"
        >
          ${e.area?l.map(e=>H`<path class="spark-fill" d=${e.area}></path>`):V}
          ${l.map(e=>H`<path class="spark-stroke" d=${e.line}></path>`)}
        </svg>`:V;return I`
      <div
        class="rect-tile left gauge spark-tile ${e.area?"spark-bleed":""} ${l.length?"has-spark":""}"
      >
        <!-- The bled chart goes FIRST so the text paints over it in DOM order,
             rather than needing a z-index to undo a later sibling. -->
        ${e.area?h:V}
        <div class="spark-head">
          ${this._header("m3o:show-chart")}
          ${e.area?this._deltaPill(a):V}
        </div>
        ${this._valueRow({display:c,unit:this._unit})}
        ${e.area?V:h}
        ${d?I`<div class="gauge-caption">${d}</div>`:V}
      </div>
    `}_detailMetric(e,t){const i=e?.entity?this.hass?.states?.[e.entity]:null,s=this._num(i?.state),a=e?.unit??i?.attributes?.unit_of_measurement??"",n={value:null==s?i?.state??"":this._fmtNum(s),unit:a,state:i?this.hass.formatEntityState?.(i)??i.state:"",...this._detailHistoryVars},o=e?.label??i?.attributes?.friendly_name??"",r=e?.value,l=this._isTemplate(o)?this._tplResults?.[`metric_label_${t}`]??"":o;let c;if(null!=r&&""!==r){const e=this._isTemplate(r)?this._tplResults?.[`metric_value_${t}`]??"":r;c=this._interpolate(e,null,n)}else c=n.state;return{label:l,value:c}}get _detailHistoryVars(){const e=function(e){if(!e?.length)return null;let t=null;for(let i=e.length-1;i>=0;i--)if(null!=e[i]?.v){t=e[i].v;break}if(null==t)return null;let i=null;for(let s=e.length-1;s>=0;s--){const a=e[s];if(a&&null!=a.v){if(a.v!==t)break;i=a.t}}return i}(this._histSeries);if(null==e)return{history_changed:"",history_date:"",history_time:""};const t=new Date(e),i=this.hass?.locale?.language||globalThis.navigator?.language||"en";return{history_changed:new Intl.DateTimeFormat(i,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(t),history_date:new Intl.DateTimeFormat(i,{day:"2-digit",month:"2-digit"}).format(t),history_time:new Intl.DateTimeFormat(i,{hour:"2-digit",minute:"2-digit"}).format(t)}}_configuredMetrics(){return Array.isArray(this.config.metrics)?this.config.metrics:[1,2,3].map(e=>({entity:this.config[`metric_${e}_entity`],label:this.config[`metric_${e}_label`],value:this.config[`metric_${e}_value`],unit:this.config[`metric_${e}_unit`]})).filter(e=>e.entity||e.label||e.value)}_detail(){const e=this._num(this._stateObj.state);if(null==e)return this._plain();const t=this._num(this.config.days)??7,i=xi(this._histSeries,{days:t,aggregate:this.config.aggregate||"delta"}),s=Math.max(...i.map(e=>Math.max(0,e.v)),0),a=this.config.accent||this._gaugeAccent(1),n=this._configuredMetrics().slice(0,3);return I`
      <div class="detail-card">
        <div class="detail-top">
          <div class="detail-primary">
            ${this._header("m3o:analytics")}
            ${this._gaugeValueLine({display:this._fmtNum(e),unit:this._unit})}
          </div>
          ${i.length?I`<div class="detail-bars" style="--g-accent:${a}">
                ${i.map((e,t)=>{const a=Math.max(0,e.v),n=a<=0||s<=0?8:Math.max(8,a/s*52);return I`<i class=${t===i.length-1?"current":""} style="height:${n.toFixed(1)}px"></i>`})}
              </div>`:V}
        </div>
        ${n.length?I`<div class="detail-metrics">
              ${n.map((e,t)=>{const i=this._detailMetric(e,t);return I`<div class="detail-metric"><span>${i.label}</span><strong>${i.value}</strong></div>`})}
            </div>`:V}
      </div>
    `}_progressSummary(){const e=this._gauge();if(!e)return this._plain();const t=this.config.headline,i=t?this._interpolate(this._isTemplate(t)?this._resolvedHeadline??"":t,e):this._fmtState(),s=this.config.caption,a=s?this._interpolate(this._isTemplate(s)?this._resolvedCaption??"":s,e):"",n=this.config.footer,o=n?this._interpolate(this._isTemplate(n)?this._resolvedFooter??"":n,e):"",r=100*e.frac;return I`
      <div class="progress-summary">
        <div class="progress-summary-main">
          <svg class="ring progress-ring" viewBox="0 0 44 44" style="--g-accent:${e.accent}">
            <circle class="ring-track" cx="22" cy="22" r="19"></circle>
            ${r>.5?H`<circle class="ring-arc" cx="22" cy="22" r="19" pathLength="100"
                  stroke-dasharray=${`${r.toFixed(3)} 100`}></circle>`:V}
          </svg>
          <div class="progress-summary-copy">
            ${this._header("m3o:build")}
            <div class="progress-headline">${i}</div>
            ${a?I`<div class="progress-caption">${a}</div>`:V}
          </div>
        </div>
        ${o?I`<div class="progress-footer"><ha-icon icon=${this.config.footer_icon||"m3o:trending-up"}></ha-icon>${o}</div>`:V}
      </div>
    `}_bucketBars(e){const t=this._histSeries,i=this._num(this.config.days)??3,s=xi(t,{days:i,aggregate:this.config.aggregate||"delta"}),a=this._gauge(),n=a?a.accent:this._gaugeAccent(1),o=Math.max(...s.map(e=>Math.max(0,e.v)),0),r=e.events?32:34,l=s.length?I`<div class=${e.events?"ticks":"weekbars"} style="--g-accent:${n}">
          ${s.map((t,i)=>{const a=Math.max(0,t.v),n=a<=0,l=n||o<=0?6:Math.max(6,a/o*r),c=e.events?n?"stub":"on":i===s.length-1?"current":"past";return I`<i class=${c} style="height:${l.toFixed(1)}px"></i>`})}
        </div>`:V,c={value:this._fmtNum(this._num(this._stateObj.state)),unit:this._unit,hours:String(this._histHours),days:String(Math.round(i)),buckets:String(s.length)};if("current_month"===this.config.summary_period){const e=new Date;e.setDate(1),e.setHours(0,0,0,0);const i=[...t].reverse().find(t=>null!=t.v&&t.t<e.getTime()),s=t.filter(t=>null!=t.v&&t.t>=e.getTime()),a=wi(i?[i,...s]:s);c.summary_delta=a?this._fmtNum(Math.abs(a.abs)):"",c.summary_delta_signed=a?this._fmtSigned(a.abs):"",c.summary_delta_pct=null==a?.pct?"":`${this._fmtSigned(a.pct)}%`,c.summary_period="current_month"}const d=this.config.caption?this._interpolate(this._isTemplate(this.config.caption)?this._resolvedCaption??"":this.config.caption,a,c):this._label??"";if(e.events)return I`
        <div class="event-row">
          <div class="event-title">${this._name}</div>
          ${l}
          ${d?I`<div class="gauge-caption">${d}</div>`:V}
        </div>
      `;const h=this._num(this._stateObj.state);return I`
      <div class="rect-tile left gauge">
        ${this._header("m3o:bar-chart")}
        <div class="gauge-main">
          ${null!=h?this._gaugeValueLine({display:this._fmtNum(h),unit:this._unit}):V}
          ${l}
          ${d?I`<div class="gauge-caption">${d}</div>`:V}
        </div>
      </div>
    `}getGridOptions(){return["status","events","detail","progress_summary"].includes(this._variant)?{columns:12,rows:"auto",min_columns:6}:"spark"===this._variant?{columns:12,rows:"auto",min_columns:4}:{columns:4,rows:"auto",min_columns:3}}getCardSize(){return 3}}customElements.define("materia-glance-tile",Ni),window.customCards=window.customCards||[],window.customCards.push({type:"materia-glance-tile",name:"Materia Glance Tile",description:"Expressive view-only sensor tile — percent fill, thermometer, power bars, spinning pump star, and a graceful fallback.",preview:!0});const Pi=ht(90,90,86),Ri=function(e,t,i,s=0){return pt(e,t,i,s,[{x:.457,y:.296,r:.007},{x:.5,y:-.051,r:.007}],15)}(90,90,88),Li={rest:{bg:"var(--md-sys-color-secondary-container)",fg:"var(--md-sys-color-on-secondary-container)"},active:{bg:"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",fg:"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))"},sidekick:{bg:"var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06))",fg:"var(--md-sys-color-on-surface)"}},Ui=[Ee,ze,Ae,ge,n`
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

    /* ---- THE SIDEKICK TIER ------------------------------------------------
       One hero per surface — that is what makes it a hero. So every card in
       this family can also render as its own quiet companion: identical
       anatomy, one rung down on every scale, on the page's neutral surface
       instead of an accent. A page then reads as one statement plus its
       supporting cast rather than three cards shouting equally loudly.

       The asymmetric silhouette is the HERO's mark, so the sidekick gives it
       up for the uniform radius the level rows already use, which is what
       makes it read as their peer. */
    :host([variant="sidekick"]) .hero {
      border-radius: 26px;
      padding: clamp(14px, 4cqi, 18px);
    }

    :host([variant="sidekick"]) .hero.attached {
      border-radius: 26px 26px 8px 8px;
    }

    :host([variant="sidekick"]) .alert {
      border-radius: 8px 8px 26px 26px;
      padding: 10px clamp(14px, 4cqi, 18px);
    }

    :host([variant="sidekick"]) .title {
      font-size: clamp(18px, 5.5cqi, 22px);
      margin-top: 4px;
    }

    :host([variant="sidekick"]) .value {
      font-size: clamp(30px, 12cqi, 44px);
    }

    :host([variant="sidekick"]) .unit {
      font-size: clamp(12px, 3.6cqi, 15px);
      padding-bottom: clamp(4px, 2cqi, 7px);
    }

    :host([variant="sidekick"]) .caption {
      padding-bottom: clamp(5px, 2.4cqi, 9px);
    }

    :host([variant="sidekick"]) .secondary {
      margin-top: 4px;
    }

    /* NO decoration on the sidekick. The burst is the hero's statement mark,
       and a sidekick's entire job is to not make statements — shrunk versions
       still read as a second flourish on a page that already has one. */
    :host([variant="sidekick"]) .burst {
      display: none;
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
      /* Static at rest. Motion means the machine is doing something, so an
         idle device gets a still shape — nothing moving for no reason. */
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
  `],ji=e=>class extends e{willUpdate(e){super.willUpdate?.(e);const t="sidekick"===this.config?.variant?"sidekick":null;t?this.setAttribute("variant",t):this.removeAttribute("variant")}get _sidekick(){return"sidekick"===this.config?.variant}_shellPair(e){return this._sidekick?Li.sidekick:e?Li.active:Li.rest}_alertList(){return Array.isArray(this.config.alerts)?this.config.alerts:this.config.alert?[this.config.alert]:[]}_idle(e){return["off","idle","unknown","unavailable","false","0","none","","ok","docked"].includes(String(e??"").toLowerCase())}_alertText(e,t){if(null==t.text)return"";const i=this._isTemplate(t.text)?this._tplResults?.[`alertText${e}`]:t.text;return null==i?"":String(i).trim()}get _activeAlert(){const e=this._alertList();for(let t=0;t<e.length;t++){const i=e[t],s=this._alertText(t,i);if(i.entity){const e=this.hass?.states[i.entity];if(!e)continue;const t=String(e.state);if(null!=i.state){if(!(Array.isArray(i.state)?i.state.map(String):[String(i.state)]).includes(t))continue}else if(this._idle(t))continue;return{...i,text:s||(this.hass.formatEntityState?.(e)??t)}}if(s)return{...i,text:s}}return null}_resolveAlertTemplates(){this.config&&this._alertList().forEach((e,t)=>{null!=e.text&&this._resolveTemplateValue(`alertText${t}`,e.text)})}_renderBurst({alarm:e=!1,working:t=!1}={}){return!1===this.config.burst?V:I`
        <svg
          class="burst ${e?"alarm":t?"working":""}"
          viewBox="0 0 180 180"
          aria-hidden="true"
        >
          ${e?H`<g class="loom"><path d=${Ri} /></g>`:H`<g class="drift"><path d=${Pi} /></g>`}
        </svg>
      `}_renderAlertStrip(e,t){return e?I`
        <div
          class="alert"
          role="status"
          @click=${()=>this._handleAction(e.tap_action||{action:"more-info",entity:e.entity||t})}
        >
          <ha-icon .icon=${e.icon??"mdi:alert-circle-outline"}></ha-icon>
          <span>${e.text}</span>
        </div>
      `:V}},Bi=new Set,Ii=new Map,Hi={publish(e,t,i,s=1e4){e&&(Ii.set(e,{state:String(t),baseline:String(i??""),until:Date.now()+s}),Bi.forEach(t=>t(e)))},peek(e,t){const i=Ii.get(e);return i?Date.now()>i.until||String(t)!==i.baseline?(Ii.delete(e),null):i.state:null},subscribe:e=>(Bi.add(e),()=>Bi.delete(e))};function Wi(e,t,i="locked"){return"unlocking"===e&&t&&"locked"!==t?"unlocked":"locking"===e&&t&&"unlocked"!==t?i:e}function Vi(e){return"locking"===e||"unlocking"===e||"opening"===e||"jammed"===e}customElements.define("materia-hero-editor",class extends We{_formData(){return{burst:!0,variant:"hero",alert_tints_hero:!0,...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"Eyebrow text",selector:{text:{}}},{name:"icon",label:"Eyebrow icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"title",label:"Big title (defaults to the state)",template:!0,selector:{text:{}}},{name:"value",label:"Headline number (defaults to the state)",template:!0,selector:{text:{}}},{name:"unit",label:"Unit after the number",selector:{text:{}}},{name:"caption",label:"Caption beside the number",template:!0,selector:{text:{}}},{name:"secondary",label:"Sub-line",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"Emphasis",helper:"Hero owns the panel; sidekick is its quiet companion — same anatomy one rung down, for pages that already have a hero.",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"Hero — filled, owns the panel"},{value:"sidekick",label:"Sidekick — quiet peer of the rows"}]}}},{name:"active_state",label:"State(s) that count as active",selector:{text:{}}},..."sidekick"===this._config?.variant?[]:[{name:"burst",label:"Show the turning burst",selector:{boolean:{}}}],{name:"active_color",label:"Background while active",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"Text while active",color:!0,template:!0,selector:{text:{}}},{name:"color",label:"Background at rest",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text at rest",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const Gi={vacuum:"cleaning",light:"on",switch:"on",fan:"on",input_boolean:"on",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing",binary_sensor:"on"};class Xi extends(ji(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedTitle:{state:!0},_resolvedValue:{state:!0},_resolvedCaption:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedActiveColor:{state:!0},_resolvedActiveColorOn:{state:!0}};static styles=Ui;static getConfigElement(){return document.createElement("materia-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("sensor."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Hero: entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("title","_resolvedTitle"),this._resolveField("value","_resolvedValue"),this._resolveField("caption","_resolvedCaption"),this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("active_color","_resolvedActiveColor"),this._resolveField("active_color_on","_resolvedActiveColorOn"),this._resolveAlertTemplates(),this._trackLockFamily())}_trackLockFamily(){const e=this._stateObj;if(!e||"lock"!==this.config.entity?.split(".")[0])return;const t=this.config.locked_state??"locked",i=Wi(e.state,this._lastFamily,t);Vi(i)||(this._lastFamily=i===t?"locked":"unlocked")}_effectiveLockState(e){return e&&"lock"===this.config.entity?.split(".")[0]?Wi(e.state,this._lastFamily,this.config.locked_state??"locked"):e?.state}_field(e,t){const i=this.config[e];if(null==i)return null;const s=this._isTemplate(i)?this[t]:i;return null==s||""===s?null:s}get _stateObj(){return this.hass?.states[this.config.entity]}_isActive(e){if(!e)return!1;const t=e.entity_id.split(".")[0],i=this.config.active_state??Gi[t]??"on";return(Array.isArray(i)?i:[i]).some(t=>String(t)===e.state)}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}connectedCallback(){super.connectedCallback(),this._busUnsub=Hi.subscribe(e=>{e===this.config?.entity&&this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this._busUnsub?.(),this._busUnsub=null}_predictedLabel(e){const t={locking:"state_locking",unlocking:"state_unlocking"}[e];return t?$e(t,this.hass):e.charAt(0).toUpperCase()+e.slice(1)}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._isUnavailable(e),i=e&&this.config.entity?Hi.peek(this.config.entity,e.state):null,s=this._effectiveLockState(e),a=e&&s!==e.state?{...e,state:s}:e,n=!t&&(i?this._isActive({...a,state:i}):this._isActive(a)),o=this.config.name??e?.attributes?.friendly_name??this.config.entity,r=this.config.icon??e?.attributes?.icon,l=i?this._predictedLabel(i):this._field("title","_resolvedTitle")??(a?this.hass.formatEntityState?.(a)??a.state:"—");let c=this._field("value","_resolvedValue");if(null==c&&e){const t=this._num(e.state);null!=t&&(c=String(Math.round(t)))}const d=this.config.unit??(null!=c?e?.attributes?.unit_of_measurement:null),h=this._field("caption","_resolvedCaption"),p=this._field("secondary","_resolvedSecondary"),u=this._activeAlert,m=u?.color||"var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))",g=u?.color_on||"var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))",f=u&&!1!==this.config.alert_tints_hero,_=this._shellPair(n),b=n?this._field("active_color","_resolvedActiveColor"):this._field("color","_resolvedColor"),v=n?this._field("active_color_on","_resolvedActiveColorOn"):this._field("color_on","_resolvedColorOn"),y=f?m:b??_.bg,x=f?g:v??_.fg;return I`
      <ha-card style="--mh-bg:${y};--mh-fg:${x};--mh-alert-bg:${m};--mh-alert-fg:${g};">
        <div class="stack">
        <div
          class="hero ${t?"unavailable":""} ${u?"attached":""}"
          @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
        >
          ${this._renderBurst({alarm:!!u,working:n})}
          <div class="content">
            <div class="eyebrow">
              ${r?I`<ha-icon .icon=${r}></ha-icon>`:V}
              <span>${o}</span>
            </div>
            <div class="title">${t?$e("unavailable",this.hass):l}</div>
            ${null!=c?I`<div class="figure">
                  <span class="value">${c}</span>
                  ${d?I`<span class="unit">${d}</span>`:V}
                  ${h?I`<span class="caption">${h}</span>`:V}
                </div>`:V}
            ${p?I`<div class="secondary">${p}</div>`:V}
          </div>
        </div>
        ${this._renderAlertStrip(u,this.config.entity)}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}customElements.define("materia-hero",Xi),window.customCards=window.customCards||[],window.customCards.push({type:"materia-hero",name:"Materia Hero",description:"Expressive headline block — big state title, one enormous numeral, and an accent swap while active.",preview:!0});const Yi={status:["_status","_work_mode","_state","_activity"],progress:["_cleaning_progress","_progress"],battery:["_battery","_batterij","_batterie"],room:["_current_room","_room","_active_map"],cleaning_time:["_cleaning_time","_cleaning_duration"],cleaning_area:["_cleaning_area","_area_cleaned"],error:["_vacuum_error","_error"],dock_error:["_dock_error"],water_shortage:["_water_shortage"],clean_water:["_dock_clean_water_box","_clean_water"],dirty_water:["_dock_dirty_water_box","_dirty_water"],mop_drying:["_mop_drying","_drying"],last_clean:["_last_clean_end","_last_job","_last_clean"]},Ki=["_time_left","_lifespan","_consumable"],Zi=["docked","charging","charging_complete","fully_charged","idle","sleeping","paused","standby","off","unavailable","unknown","error","device_offline","charger_disconnected","locked","shutting_down","updating","air_drying_stopping"],Ji={roborock:{idle_states:Zi},ecovacs:{idle_states:[...Zi,"cleaning_paused","returning"]},generic:{idle_states:Zi}};const Qi=[{match:["sensor_time_left","sensor_lifespan"],en:"Clean the sensors",nl:"Maak de sensoren schoon"},{match:["main_brush"],en:"Replace the main brush",nl:"Vervang de hoofdborstel"},{match:["side_brush"],en:"Replace the side brush",nl:"Vervang de zijborstel"},{match:["filter"],en:"Replace the filter",nl:"Vervang het filter"},{match:["strainer"],en:"Clean the dock strainer",nl:"Reinig de dockzeef"},{match:["maintenance_brush"],en:"Clean the dock brush",nl:"Maak de dockborstel schoon"},{match:["mop_life","mop_time"],en:"Replace the mop pad",nl:"Vervang de dweil"}],es=[{match:["dustbin_full","bin_full","dust_bin_full"],en:"Empty the dustbin",nl:"Leeg de stofbak"},{match:["water_box_empty","low_water","no_water"],en:"Refill the water tank",nl:"Vul het waterreservoir bij"},{match:["waste_water_tank_full","dirty_water_full"],en:"Empty the dirty water tank",nl:"Leeg het vuilwaterreservoir"},{match:["main_brush_stuck","main_brush_jammed"],en:"Free the main brush",nl:"Maak de hoofdborstel vrij"},{match:["side_brush_stuck","side_brush_jammed"],en:"Free the side brush",nl:"Maak de zijborstel vrij"},{match:["wheel_stuck","wheels_stuck","stuck"],en:"The wheels are stuck - move it clear",nl:"De wielen zitten vast — haal het obstakel weg"},{match:["cliff_sensor","cliff"],en:"Clean the cliff sensors",nl:"Maak de valsensoren schoon"},{match:["filter_blocked","filter_dirty"],en:"Clean or replace the filter",nl:"Reinig of vervang het filter"},{match:["bumper_stuck","bumper"],en:"Free the bumper",nl:"Maak de bumper vrij"},{match:["dock","charger"],en:"Check the dock connection",nl:"Controleer de verbinding met het dock"},{match:["low_battery","battery_low"],en:"Battery too low - let it charge",nl:"Accu te laag - laat hem opladen"},{match:["trapped","cannot_move","stuck_in_place"],en:"It is trapped - move it clear",nl:"De robot zit vast — haal hem los"},{match:["mop_missing","no_mop"],en:"Attach the mop pad",nl:"Bevestig de dweil"},{match:["full","container_full"],en:"Empty the container",nl:"Leeg het reservoir"}];function ts(e,t,i){const s=String(t||"").toLowerCase();if(!s)return null;const a=e.find(e=>e.match.some(e=>s.includes(e)));return a?ke(a,i):null}customElements.define("materia-vacuum-hero-editor",class extends We{_formData(){return{brand:"roborock",burst:!0,alert_tints_hero:!0,variant:"hero",...this._config}}_sectionsSignature(){return`${this._config?.brand||""}|${this._config?.variant||""}`}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}},{name:"brand",label:"Brand profile",selector:{select:{mode:"dropdown",options:[{value:"roborock",label:"Roborock"},{value:"ecovacs",label:"Ecovacs"},{value:"generic",label:"Generic / other"}]}}},{name:"name",label:"Name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{title:"Entity overrides",icon:"mdi:link-variant",fields:[{name:"status_entity",label:"Status / work mode",selector:{entity:{}}},{name:"progress_entity",label:"Cleaning progress (%)",selector:{entity:{}}},{name:"battery_entity",label:"Battery",selector:{entity:{}}},{name:"room_entity",label:"Current room",selector:{entity:{}}},{name:"cleaning_time_entity",label:"Elapsed cleaning time",selector:{entity:{}}},{name:"error_entity",label:"Vacuum error",selector:{entity:{}}},{name:"dock_error_entity",label:"Dock error",selector:{entity:{}}},{name:"mop_drying_entity",label:"Mop drying",selector:{entity:{}}},{name:"last_clean_entity",label:"Last clean finished",selector:{entity:{}}}]},{title:"Behaviour",icon:"mdi:cog-outline",fields:[{name:"consumable_hours",label:"Warn when a consumable has this many hours left (default 1)",selector:{number:{min:0,max:200,mode:"box"}}},{name:"consumable_percent",label:"Warn when a % lifespan drops to (default 5)",selector:{number:{min:0,max:100,mode:"box"}}},{name:"docked_label",label:'Label at a full battery (default "Docked")',selector:{text:{}}},{name:"drying_label",label:'Drying sub-line (default "Drying the mop")',selector:{text:{}}},{name:"alert_tints_hero",label:"An ERROR colours the whole hero (warnings never do)",selector:{boolean:{}}},..."sidekick"===this._config?.variant?[]:[{name:"burst",label:"Show the decorative shape",selector:{boolean:{}}}]]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"Emphasis",helper:"Hero owns the panel; sidekick is its quiet companion — same anatomy one rung down, and it keeps the resting surface even while the robot runs.",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"Hero — filled, owns the panel"},{value:"sidekick",label:"Sidekick — quiet peer of the rows"}]}}},{name:"working_color",label:"Background while working",color:!0,selector:{text:{}}},{name:"working_color_on",label:"Text while working",color:!0,selector:{text:{}}},{name:"color",label:"Background at rest",color:!0,selector:{text:{}}},{name:"color_on",label:"Text at rest",color:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});const is=ht(90,90,86),ss=function(e,t,i,s=0){return pt(e,t,i,s,[{x:.248,y:.317,r:.053},{x:.176,y:.055,r:.053}],10)}(90,90,86);class as extends(ji(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0}};static styles=[Ui,n`
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
    `];static getConfigElement(){return document.createElement("materia-vacuum-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("vacuum."))||"";return{entity:t,brand:"roborock"}}setConfig(e){if(!e.entity)throw new Error("Materia Vacuum Hero: entity is required");this.config={brand:"roborock",...e},this._discovered=null}updated(e){e.has("config")&&(this._discovered=null),e.has("hass")&&this.hass&&(this.config.alerts||[]).forEach((e,t)=>{null!=e.text&&this._resolveTemplateValue("alertText"+t,e.text)})}get _profile(){return e=this.config.brand,Ji[e]||Ji.generic;var e}get _stateObj(){return this.hass?.states[this.config.entity]}_siblings(){const e=this.hass?.entities?.[this.config.entity];if(!e)return[];const t=e.device_id,i=this.config.entity.split(".")[1]+"_";return Object.values(this.hass.entities).filter(e=>!e.disabled_by&&!e.hidden_by&&(t&&e.device_id===t||e.entity_id.split(".")[1].startsWith(i))).map(e=>e.entity_id)}get _caps(){if(this._discovered)return this._discovered;const e=this._siblings(),t=e.length>0,i=(t,i)=>{for(const s of t){const t=e.find(e=>!(i&&!i.includes(e.split(".")[0]))&&(e.split(".")[1].endsWith(s)||e.split(".")[1].includes(s)));if(t)return t}return null},s={};for(const[e,t]of Object.entries(Yi))s[e]=this.config[`${e}_entity`]??i(t,["sensor","binary_sensor"]);return s.consumables=this.config.consumable_entities??e.filter(e=>e.startsWith("sensor.")&&Ki.some(t=>e.includes(t))),t&&(this._discovered=s),s}_num(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}_stateOf(e){if(!e)return null;const t=this.hass?.states[e];return t&&!this._isUnavailable(t)?t.state:null}_numOf(e){return this._num(this._stateOf(e))}get _idleStates(){return(this.config.idle_states??this._profile.idle_states).map(e=>String(e).toLowerCase())}get _working(){const e=this._stateObj;if(!e||this._isUnavailable(e))return!1;const t=String(this._stateOf(this._caps.status)??e.state).toLowerCase();return!this._idleStates.includes(t)}get _drying(){return"on"===this._stateOf(this._caps.mop_drying)}get _hasProgress(){const e=String(this._stateOf(this._caps.status)??this._stateObj?.state??"").toLowerCase();return!(this.config.no_progress_states??["return","empty","wash","dry","charg","dock","locat","seek","idle"]).some(t=>e.includes(t))}get _minutesLeft(){const e=this._numOf(this._caps.progress);if(null==e||e<=0||e>=100)return null;const t=this._caps.cleaning_time,i=this._numOf(t);if(null==i||i<=0)return null;const s=i*({s:1/60,sec:1/60,secs:1/60,seconds:1/60,min:1,mins:1,minutes:1,h:60,hr:60,hours:60}[String(this.hass?.states[t]?.attributes?.unit_of_measurement??"").toLowerCase()]??1/60),a=Math.round(s*(100-e)/e);return e<(this.config.eta_min_progress??5)?null:Math.max(1,a)}_pretty(e){if(null==e)return null;const t=String(e).replace(/[_-]+/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}_resetButtonFor(e){const t=["main_brush","side_brush","maintenance_brush","strainer","filter","sensor","mop"].find(t=>e.includes(t));return t?this._siblings().find(e=>e.startsWith("button.")&&e.includes("reset")&&e.includes(t))??null:null}_lowConsumables(){const e=this.config.consumable_hours??1,t=this.config.consumable_percent??5,i={s:1/3600,sec:1/3600,seconds:1/3600,min:1/60,minutes:1/60,h:1,hours:1,d:24};return(this._caps.consumables||[]).filter(s=>{const a=this._numOf(s);if(null==a)return!1;const n=String(this.hass.states[s]?.attributes?.unit_of_measurement??"").toLowerCase();if("%"===n)return a<=t;return a*(i[n]??1)<=e})}get _alerts(){const e=this._caps,t=(e,t,i)=>{const s=this._stateOf(e);if(null==s||["none","ok","off","no_error","0"].includes(String(s).toLowerCase()))return null;const a=(n=s,o=this.hass.locale?.language,ts(es,n,o));var n,o;return{icon:t,text:a?`${i}: ${a}`:`${i}: ${this._pretty(s)}`,severity:"error",entity:e}},i=(e,t,i,s)=>"on"===this._stateOf(e)?{icon:t,text:i,severity:s,entity:e}:null,s=[t(e.error,"mdi:robot-vacuum-alert",this.config.error_label??"Vacuum error"),t(e.dock_error,"mdi:home-alert-outline",this.config.dock_error_label??"Dock error"),i(e.water_shortage,"mdi:water-alert-outline","Water shortage - cannot mop","error"),i(e.clean_water,"mdi:water-outline","Clean water tank needs refilling","warning"),i(e.dirty_water,"mdi:water-off-outline","Dirty water tank needs emptying","warning"),...this._lowConsumables().map(e=>{return{icon:"mdi:wrench-outline",text:(t=e,i=this.hass.locale?.language,ts(Qi,t,i)??`${this.hass.states[e]?.attributes?.friendly_name??e} needs attention`),severity:"warning",entity:e,reset:this._resetButtonFor(e)};var t,i}),...(this.config.alerts||[]).map((e,t)=>{const i=null!=e.text&&this._isTemplate(e.text)?this._tplResults?.["alertText"+t]:e.text,s=null==i?"":String(i).trim();return null!=e.text&&0===s.length?null:{...e,text:s}})].filter(Boolean);return s}_severityPair(e){return"warning"===e?["var(--md-sys-cust-color-warning-container)","var(--md-sys-cust-color-on-warning-container)"]:["var(--md-sys-cust-color-error, var(--md-sys-color-error))","var(--md-sys-cust-color-on-error, var(--md-sys-color-on-error))"]}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e){if(this._lastGood){const e=this._lastGood;return I`
          <ha-card class="unavailable" style="--mh-bg:${e.bg};--mh-fg:${e.fg};">
            <div class="stack"><div class="hero">
              <div class="content">
                <div class="eyebrow"><ha-icon .icon=${e.icon}></ha-icon><span>${e.name}</span></div>
                <div class="title">${e.title}</div>
                ${null!=e.value?I`<div class="figure">
                      <span class="value">${e.value}</span><span class="unit">%</span>
                      <span class="caption">${e.caption}</span>
                    </div>`:V}
                ${e.secondary?I`<div class="secondary">${e.secondary}</div>`:V}
              </div>
            </div></div>
          </ha-card>`}return I`<ha-card><div class="stack"><div class="hero">
        <div class="content"><div class="title">Entity not found</div></div>
      </div></div></ha-card>`}const t=this._isUnavailable(e),i=this._caps,s=this._working,a=this._alerts[0]||null,n=this._numOf(i.battery),o=this._numOf(i.progress),r=this._stateOf(i.status)??e.state;let l=this._pretty(r);const c=String(r??"").toLowerCase(),d=c.includes("charg")||c.includes("dock");!s&&d&&null!=n&&n>=100&&(l=this.config.docked_label??$e("vh_docked",this.hass)),t&&(l=$e("unavailable",this.hass));const h=s&&null!=o&&this._hasProgress,p=h?Math.round(o):n,u=h?this.config.progress_caption??"done":this.config.battery_caption??$e("vh_battery_caption",this.hass);let m=null;if(s){const e=this._stateOf(i.room),t=this._minutesLeft,s=[];e&&!["unknown","unavailable"].includes(e)&&s.push(this._pretty(e)),null!=t&&s.push($e("vh_min_left",this.hass,{mins:t})),m=s.join(" - ")||null}else if(this._drying)m=this.config.drying_label??$e("vh_drying",this.hass);else{const e=this._stateOf(i.last_clean);if(e){const t=new Date(e);if(!Number.isNaN(t.getTime())){const e=Math.round((Date.now()-t.getTime())/6e4),i=e<60?$e("unit_min",this.hass,{n:Math.max(1,e)}):e<1440?$e("unit_hours",this.hass,{n:Math.round(e/60)}):$e("unit_days",this.hass,{n:Math.round(e/1440)});m=$e("vh_last_cleaned",this.hass,{rel:i})}}}const g=this._shellPair(s);let f=(s?this.config.working_color:this.config.color)??g.bg,_=(s?this.config.working_color_on:this.config.color_on)??g.fg;const b=null!=a&&(null==a.severity||"error"===a.severity);let v=null,y=null;if(a){const[e,t]="info"===a.severity?[f,_]:this._severityPair(a.severity);v=a.color??e,y=a.color_on??t,b&&!1!==this.config.alert_tints_hero&&(f=v,_=y)}const x=this.config.name??e.attributes?.friendly_name??this.config.entity,w=this.config.icon??"mdi:robot-vacuum";return this._lastGood={title:l,value:p,caption:u,secondary:m,name:x,icon:w,bg:f,fg:_},I`
      <ha-card style="--mh-bg:${f};--mh-fg:${_};--mh-alert-bg:${v??f};--mh-alert-fg:${y??_};--mh-calm-d:path('${is}');--mh-live-d:path('${ss}');">
        <div class="stack">
          <div
            class="hero ${t?"unavailable":""} ${a?"attached":""}"
            @click=${()=>this._handleAction(this.config.tap_action||{action:"more-info",entity:this.config.entity})}
          >
            ${this._renderBurst({alarm:b,working:s})}
            <div class="content">
              <div class="eyebrow">
                <ha-icon .icon=${w}></ha-icon><span>${x}</span>
              </div>
              <div class="title">${l}</div>
              ${null!=p?I`<div class="figure">
                    <span class="value">${p}</span><span class="unit">%</span>
                    <span class="caption">${u}</span>
                  </div>`:V}
              ${m?I`<div class="secondary">${m}</div>`:V}
            </div>
          </div>
          ${a?I`<div
                class="alert"
                role="status"
                @click=${()=>this._handleAction(a.tap_action||{action:"more-info",entity:a.entity||this.config.entity})}
              >
                <ha-icon .icon=${a.icon??"mdi:alert-circle-outline"}></ha-icon>
                <span>${a.text}</span>
                ${a.reset?I`<button
                      class="alert-action"
                      title="Reset"
                      @click=${e=>{e.stopPropagation(),this._fireHaptic?.("light"),this._callService("button","press",{},{entity_id:a.reset})}}
                    >
                      <ha-icon icon="mdi:restart"></ha-icon>
                    </button>`:V}
              </div>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 4}}customElements.define("materia-vacuum-hero",as),window.customCards=window.customCards||[],window.customCards.push({type:"materia-vacuum-hero",name:"Materia Vacuum Hero",description:"Robot-vacuum headline — derived ETA, negated working states, and mop/consumable warnings. Roborock and Ecovacs.",preview:!0});const ns=[Ee,ze,ge,n`
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
  `];customElements.define("materia-chips-editor",class extends We{_formData(){return{show_check:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"Entity holding the selection",selector:{entity:{}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"multi_select",label:"Multi-select (state is a comma-separated list)",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_check",label:"Show the check on selected chips",selector:{boolean:{}}},{name:"color",label:"Selected chip color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Selected chip text",color:!0,template:!0,selector:{text:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}});class os extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=[ns,pi];static getConfigElement(){return document.createElement("materia-chips-editor")}static getStubConfig(){return{chips:[{label:"Chip 1",value:"one"},{label:"Chip 2",value:"two"}]}}setConfig(e){if(!e.chips?.length)throw new Error("Materia Chips: at least one chip is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"))}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){const e=this._stateObj;return e?this.config.attribute?e.attributes?.[this.config.attribute]:e.state:null}get _selected(){const e=this._current;return null==e||"unknown"===e||"unavailable"===e?[]:Array.isArray(e)?e.map(e=>String(e).trim()):this.config.multi_select?String(e).split(",").map(e=>e.trim()).filter(Boolean):[String(e)]}_chips(){return(this.config.chips||[]).map(e=>"string"==typeof e?{label:e,value:e}:e)}_tap(e){if(this._fireHaptic?.("selection"),e.tap_action)return void this._handleAction(e.tap_action);const t=this._stateObj,i=t?.entity_id?.split(".")[0],s=e.value??e.label;"select"!==i&&"input_select"!==i||null==s||this._callService(i,"select_option",{entity_id:t.entity_id,option:String(s)})}render(){if(!this.hass||!this.config)return I``;const e=this._selected,t=(this._isTemplate(this.config.color)?this._resolvedColor:this.config.color)||"var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))",i=(this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on)||"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))",s=!1!==this.config.show_check;return I`
      <ha-card style="--mc-bg:${t};--mc-fg:${i};">
        <div class="chips">
          ${this._chips().map(t=>{const i=t.value??t.label,a=e.some(e=>e===String(i));return I`
              <button class="chip ${a?"on":""}" @click=${()=>this._tap(t)} aria-pressed=${a?"true":"false"}>
                ${s?I`<ha-icon class="check" icon="m3of:check"></ha-icon>`:t.icon?I`<ha-icon class="lead" .icon=${t.icon}></ha-icon>`:V}
                <span class="text">${t.label??i}</span>
              </button>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-chips",os),window.customCards=window.customCards||[],window.customCards.push({type:"materia-chips",name:"Materia Chips",description:"M3 filter chips — wrapping, single or multi-select, with a check that slides in when chosen.",preview:!0});const rs=e=>class extends e{static properties={_optimisticValue:{state:!0}};_optimisticSet(e){this._optimisticBaseline=this._optimisticActual(),this._optimisticValue=String(e),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}get _optimistic(){return this._optimisticValue??this._optimisticActual()}_optimisticReconcile(){if(null==this._optimisticValue)return;const e=this._optimisticActual();if(null==e)return;const t=String(e).toLowerCase()===this._optimisticValue.toLowerCase(),i=null!=this._optimisticBaseline&&String(e)!==String(this._optimisticBaseline);(t||i)&&(this._optimisticValue=null,this._optimisticBaseline=null,clearTimeout(this._optimisticTimer))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer)}},ls=[Ee,ze,Ae,ge,n`
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
      /* The meta column is fixed-width; on small screens a long option name
         ("Balanced") overflowed it into the off button. Ellipsis over
         collision — the bars' own titles still carry the full names. */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
  `];customElements.define("materia-bar-select-editor",class extends We{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"label",label:"Label",selector:{text:{}}},{name:"attribute",label:"Attribute (e.g. fan_speed) instead of the state",selector:{text:{}}},{name:"off_option",label:'Option shown as its own round button (e.g. "off")',selector:{text:{}}},{name:"off_icon",label:"Icon for that button",selector:{icon:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"Lit bar color",color:!0,template:!0,selector:{text:{}}},{name:"accent_on",label:"Glyph color on the accent fill",color:!0,template:!0,selector:{text:{}}}]},{title:"Advanced",icon:"mdi:tune",fields:[{name:"service",label:"Override service (domain.service)",selector:{text:{}}},{name:"service_key",label:"Override service data key",selector:{text:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}});class cs extends(rs(hi(Te(ce)))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedAccent:{state:!0},_resolvedAccentOn:{state:!0}};static styles=[ls,pi];static getConfigElement(){return document.createElement("materia-bar-select-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("select."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Bar Select: entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("accent","_resolvedAccent"),this._resolveField("accent_on","_resolvedAccentOn"),this._optimisticReconcile());const t=this._index;null!=this._prevIndex&&t!==this._prevIndex&&this._choreograph(this._prevIndex,t),this._prevIndex=t}get _stateObj(){return this.hass?.states[this.config.entity]}get _rungs(){const e=null!=this.config.off_option?String(this.config.off_option):null;return this._options.filter(t=>null==e||t!==e)}get _index(){return this._rungs.indexOf(String(this._current))}_optimisticActual(){const e=this._stateObj;if(!e)return null;const t=this.config.attribute?e.attributes?.[this.config.attribute]:e.state;return null==t?null:String(t)}get _current(){return this._optimistic}get _options(){if(this.config.options?.length)return this.config.options.map(String);const e=this._stateObj;if(!e)return[];if(this.config.attribute){const t=e.attributes?.[`${this.config.attribute}_list`];return Array.isArray(t)?t.map(String):[]}const t=e.attributes?.options;return Array.isArray(t)?t.map(String):[]}_fmt(e){const t=this._stateObj;if(!this.config.attribute&&t&&String(t.state)===String(e)){const e=this.hass.formatEntityState?.(t);if(e)return e}const i=String(e).replace(/[_-]+/g," ");return i.charAt(0).toUpperCase()+i.slice(1)}_set(e){const t=this._stateObj;if(!t)return;const i=t.entity_id.split(".")[0];if(this._fireHaptic?.("selection"),this._optimisticSet(e),this.config.service){const[i,s]=String(this.config.service).split("."),a=this.config.service_key||this.config.attribute||"option";return void this._callService(i,s,{entity_id:t.entity_id,[a]:e})}if(this.config.attribute){const s=this.config.attribute;return void this._callService(i,`set_${s}`,{entity_id:t.entity_id,[s]:e})}"select"!==i&&"input_select"!==i||this._callService(i,"select_option",{entity_id:t.entity_id,option:e})}_choreograph(e,t){if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=Array.from(this.shadowRoot?.querySelectorAll(".bar")||[]);if(!i.length)return;const s=t>e,a=[];for(let s=Math.min(e,t)+1;s<=Math.max(e,t);s++)i[s]&&a.push(i[s]);const n=s?a:a.reverse(),o=s?[{transform:"scaleY(0.94)"},{transform:"scaleY(1.07)",offset:.5},{transform:"scaleY(1)"}]:[{transform:"scaleY(1)"},{transform:"scaleY(0.84)",offset:.5},{transform:"scaleY(0.94)"}];n.forEach((e,t)=>{e.animate(o,{duration:300,delay:45*t,easing:s?"cubic-bezier(.2,1.5,.3,1)":"cubic-bezier(.3,0,.2,1)",fill:"none"})})}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(!e||this._isUnavailable(e))return I`<ha-card><div class="tile unavailable">
        <div class="meta"><span class="label">${this.config.label??this.config.entity}</span>
        <span class="value">—</span></div>
      </div></ha-card>`;const t=(this._isTemplate(this.config.accent)?this._resolvedAccent:this.config.accent)||"var(--md-sys-cust-color-device, var(--md-sys-color-primary))",i=(this._isTemplate(this.config.accent_on)?this._resolvedAccentOn:this.config.accent_on)||"var(--md-sys-color-on-primary, #fff)",s=this._current,a=null!=this.config.off_option?String(this.config.off_option):null,n=null!=a&&s===a,o=this._rungs,r=this._index,l=o.length,c=null==this._prevIndex?r:this._prevIndex,d=r>c?1:r<c?-1:0,h=this.config.label??e.attributes?.friendly_name??this.config.entity;return I`
      <ha-card style="--bs-accent:${t};--bs-accent-on:${i};">
        <div class="tile">
          <div class="meta">
            <span class="label">${h}</span>
            <span class="value">${null==s?"—":this._fmt(s)}</span>
          </div>

          ${null!=a?I`<button
                class="off ${n?"on":""}"
                @click=${()=>this._set(a)}
                aria-pressed=${n?"true":"false"}
                title=${this._fmt(a)}
              >
                <ha-icon .icon=${this.config.off_icon??"mdi:water-off"}></ha-icon>
              </button>`:V}

          <div class="bars">
            ${o.map((e,t)=>I`<button
                class="bar ${r>=t?"lit":""}"
                style="height:${l>1?34+66*t/(l-1):100}%;transition-delay:${(e=>d>0?e>c&&e<=r?45*(e-c-1):0:d<0&&e>r&&e<=c?45*(c-e):0)(t)}ms"
                @click=${()=>this._set(e)}
                aria-pressed=${r===t?"true":"false"}
                title=${this._fmt(e)}
              ></button>`)}
          </div>
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-bar-select",cs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-bar-select",name:"Materia Bar Select",description:"Tap-a-bar level picker — climbing bars for fan speeds, mop levels, any ordered select.",preview:!0});const ds=[Ee,ze,ge,n`
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
      /* NO bleed. The old negative-margin overhang (tiles scrolling out under
         the page padding) widened the rail beyond its grid cell, and in a
         multi-column sections view that meant painting over the neighbouring
         section. The rail is its own scroll container, so kept to its box it
         clips its content for free. */
      padding: 5px 0;
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

    /* wrap: the same tiles as full rows — no rail, no bleed, no grab.
       Centred, so a short last row doesn't hang off the left edge. */
    :host([wrap]) .rail {
      flex-wrap: wrap;
      overflow: visible;
      padding: 5px 0;
      margin-right: 0;
      cursor: default;
      justify-content: center;
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

    /* A tap leaves the button focused — the browser's blue ring is not our
       affordance. Keyboard focus keeps a proper visible ring. */
    .tile:focus {
      outline: none;
    }

    .tile:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
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

    /* disabled: conditions — DELIBERATELY not the shared host treatment.
       Killing pointer events on the host would kill scrolling too, and the
       standing decision is that a running vacuum dims the rooms but the list
       still scrolls. Tiles alone go inert; touches over an inert tile fall
       through to the rail, which is exactly what makes the scroll survive. */
    :host([card-disabled]) .tile {
      opacity: 0.38;
      pointer-events: none;
    }

    :host([card-disabled]) .tile,
    :host([card-disabled]) .check {
      transition: opacity 0.2s ease;
    }
  `];class hs extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{...this._config}}get _sections(){const e=!!this._config?.sort_by_history,t=(this._config?.items||[]).some(e=>e.entity);return[{title:"Content",icon:"mdi:card-text-outline",fields:[...t?[]:[{name:"entity",label:"Entity holding the selection (optional)",helper:"Only needed when items don't carry their own entity — a room queue's text, an input_select.",selector:{entity:{}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"multi_select",label:"Multi-select (state is a comma-separated list)",selector:{boolean:{}}}],{name:"carousel",label:"Carousel (horizontal scroll instead of a wrapped grid)",selector:{boolean:{}}}]},{title:"Auto-sort",icon:"mdi:sort-variant",fields:[{name:"sort_by_history",label:"Sort by pick frequency on load",helper:"Reads the tracked entity's recent history once when the card loads and puts the most-often-picked values first — the tiles you actually use float to the front instead of always sitting in configured order.",selector:{boolean:{}}},...e?[{name:"sort_history_days",label:"History window, in days (default 30)",selector:{number:{min:1,max:365,mode:"box"}}}]:[]]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Selected tile color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Selected tile text",color:!0,template:!0,selector:{text:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}get _itemSchema(){return[{name:"label",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}}},{name:"secondary",label:"Secondary line (optional)",selector:{text:{}}},{name:"entity",label:"Entity (optional — this tile's own state)",helper:"A room's own input_boolean, say — drives the tile's highlight independent of the card's tracked entity.",selector:{entity:{}}},{name:"value",label:"Value (when there's no per-item entity)",selector:{text:{}}},{name:"tap_action",label:"Action (overrides the default toggle/select)",selector:{ui_action:{default_action:"none"}}}]}_renderExtra(){const e=this._config?.items||[];return I`
      <div class="options-header">
        <span>Items</span>
        <ha-icon-button @click=${this._addItem}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveItem(e,t),e.map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||`Item ${t+1}`}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeItem(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._itemSchema}
                        .computeLabel=${De}
                        @value-changed=${e=>this._updateItem(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addItem(){const e=[...this._config.items||[],{label:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,items:e})}_removeItem(e){const t=[...this._config.items||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,items:t})}_moveItem(e,t){const i=[...this._config.items||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,items:i})}_updateItem(e,t){const i=[...this._config.items||[]];i[e]={...i[e],...t},this._commit({...this._config,items:i})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-carousel-editor",hs);class ps extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_historyRank:{state:!0}};static styles=ds;static getConfigElement(){return document.createElement("materia-carousel-editor")}static getStubConfig(){return{items:[{label:"Item 1",value:"one"},{label:"Item 2",value:"two"}]}}setConfig(e){if(!e.items?.length)throw new Error("Materia Cards: at least one item is required");this.config={...e};const t=null!=e.carousel?!!e.carousel:null!=e.wrap?!e.wrap:"materia-carousel"===this.localName;this.toggleAttribute("wrap",!t),this._histKey=void 0}async _loadHistoryRank(){if(!this.config?.sort_by_history||!this.hass)return;const e=this._items().map(e=>e.entity).filter(Boolean),t=this.config.entity,i=t||e.join(",");if(!i||this._histKey===i)return;this._histKey=i;const s=this.config.sort_history_days??30,a=new Date(Date.now()-24*s*3600*1e3).toISOString(),n=t?[t]:e;if(n.length)try{const i=await this.hass.connection.sendMessagePromise({type:"history/history_during_period",start_time:a,entity_ids:n,minimal_response:!0,no_attributes:!0}),s=new Map;if(t)for(const e of i?.[t]||[]){const t=e.s??e.state;if(null==t||""===t||"unknown"===t||"unavailable"===t)continue;const i=this.config.multi_select?String(t).split(",").map(e=>e.trim()).filter(Boolean):[String(t).trim()];for(const e of i)s.set(e,(s.get(e)||0)+1)}else for(const t of e){let e=0;for(const s of i?.[t]||[]){const t=String(s.s??s.state??"").toLowerCase();["on","true","open","unlocked","cleaning","home"].includes(t)&&e++}s.set(t,e)}this._historyRank=s}catch(e){this._historyRank=null}}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){const e=this._stateObj;return e?this.config.attribute?e.attributes?.[this.config.attribute]:e.state:null}get _selected(){const e=this._current;return null==e||"unknown"===e||"unavailable"===e?[]:Array.isArray(e)?e.map(e=>String(e).trim()):this.config.multi_select?String(e).split(",").map(e=>e.trim()).filter(Boolean):[String(e)]}_items(){const e=(this.config.items||[]).map(e=>"string"==typeof e?{label:e,value:e}:e);if(!this.config.sort_by_history||!this._historyRank)return e;const t=e=>this._historyRank.get(this.config.entity?String(e.value??e.label):e.entity)||0;return[...e].sort((e,i)=>t(i)-t(e))}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._loadHistoryRank());const t=this._selected,i=new Set(this._items().filter(e=>e.entity?this._itemEntityActive(e):t.some(t=>t===String(e.value??e.label))).map(e=>String(e.value??e.label)));if(this._prevSel){const e=[...new Set([...i,...this._prevSel])].filter(e=>i.has(e)!==this._prevSel.has(e));e.length&&this._ripple(e,i)}this._prevSel=i}_ripple(e,t){if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=Array.from(this.shadowRoot?.querySelectorAll(".tile")||[]);if(!i.length)return;const s=this._items(),a=e.map(e=>s.findIndex(t=>String(t.value??t.label)===e)).filter(e=>e>=0);a.length&&i.forEach((e,t)=>{const i=Math.min(...a.map(e=>Math.abs(e-t)));if(i>2)return;const s=0===i?1.04:1===i?.985:.995,n=ue;e.animate([{transform:"scale(1)"},{transform:`scale(${s})`},{transform:"scale(1)"}],{duration:n.ms,delay:30*i,easing:n.easing,fill:"none"})})}_onPointerDown(e){this._stopMomentum(),"mouse"===e.pointerType&&(this._dragStartX=e.clientX,this._dragStartScroll=e.currentTarget.scrollLeft,this._captured=!1,this._didDrag=!1,this._dragPointerId=e.pointerId,this._lastX=e.clientX,this._lastT=performance.now(),this._velocity=0)}_onPointerMove(e){if(null==this._dragStartX)return;const t=e.clientX-this._dragStartX;if(!this._captured&&Math.abs(t)>4&&(this._captured=!0,this._didDrag=!0,e.currentTarget.setPointerCapture(this._dragPointerId)),!this._captured)return;e.currentTarget.scrollLeft=this._dragStartScroll-t;const i=performance.now(),s=i-this._lastT;if(s>0){const t=(this._lastX-e.clientX)/s;this._velocity=.7*this._velocity+.3*t,this._lastX=e.clientX,this._lastT=i}}_onPointerUp(e){if(null==this._dragStartX)return;const t=e.currentTarget;t.releasePointerCapture?.(e.pointerId),this._dragStartX=null,this._captured=!1,Math.abs(this._velocity)>.05&&this._startMomentum(t)}_startMomentum(e){let t=this._velocity,i=performance.now();const s=()=>{const a=performance.now(),n=Math.min(32,a-i);i=a;const o=e.scrollLeft;e.scrollLeft+=t*n,e.scrollLeft!==o?(t*=Math.pow(.95,n/16),this._raf=Math.abs(t)>.02?requestAnimationFrame(s):null):this._raf=null};this._raf=requestAnimationFrame(s)}_stopMomentum(){this._raf&&(cancelAnimationFrame(this._raf),this._raf=null)}disconnectedCallback(){super.disconnectedCallback(),this._stopMomentum()}_itemEntityActive(e){const t=this.hass?.states[e.entity]?.state;return null!=e.match&&""!==e.match?String(t??"").toLowerCase()===String(e.match).toLowerCase():["on","true","home","open","active","unlocked","cleaning"].includes(String(t??"").toLowerCase())}_tap(e){if(this._didDrag)return void(this._didDrag=!1);if(this._fireHaptic?.("selection"),e.tap_action)return void this._handleAction(e.tap_action);if(e.entity&&!e.tap_action)return void this._callService("homeassistant","toggle",{entity_id:e.entity});const t=this._stateObj,i=t?.entity_id?.split(".")[0],s=e.value??e.label;"select"!==i&&"input_select"!==i||null==s||this._callService(i,"select_option",{entity_id:t.entity_id,option:String(s)})}render(){if(!this.hass||!this.config)return I``;const e=this._selected,t=(this._isTemplate(this.config.color)?this._resolvedColor:this.config.color)||"var(--md-sys-color-secondary-container)",i=(this._isTemplate(this.config.color_on)?this._resolvedColorOn:this.config.color_on)||"var(--md-sys-color-on-secondary-container)";return I`
      <ha-card style="--mcar-bg:${t};--mcar-fg:${i};">
        <div
          class="rail"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${this._items().map(t=>{const i=t.value??t.label,s=t.entity?this._itemEntityActive(t):e.some(e=>e===String(i));return I`
              <button class="tile ${s?"on":""}" @click=${()=>this._tap(t)} aria-pressed=${s?"true":"false"}>
                <div class="top">
                  ${t.icon?I`<ha-icon class="glyph" .icon=${t.icon}></ha-icon>`:I`<span></span>`}
                  <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
                </div>
                <div class="bottom">
                  <span class="name">${t.label??i}</span>
                  ${t.secondary?I`<span class="sub">${t.secondary}</span>`:V}
                </div>
              </button>
            `})}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-cards",ps),customElements.define("materia-carousel",class extends ps{}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-cards",name:"Materia Cards",description:"Grid of selectable tile cards — the richer alternative to a chip row. carousel: true scrolls instead.",preview:!0}),window.customCards.push({type:"materia-carousel",name:"Materia Carousel (deprecated — use Materia Cards)",description:"Legacy alias of Materia Cards; defaults to the scrolling rail.",preview:!1});const us=[Ee,ze,Ae,ge,n`
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
  `],ms="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:var(--md-sys-color-secondary-container, rgba(120,120,128,.14));color:var(--md-sys-color-on-secondary-container, inherit);margin-bottom:6px;cursor:pointer;",gs="border:none;background:transparent;color:inherit;cursor:pointer;padding:4px;display:grid;place-items:center;border-radius:50%;--mdc-icon-size:18px;",fs="border:1.5px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.2));background:transparent;color:inherit;font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;";customElements.define("materia-climate-panel-editor",class extends We{static properties={_secIdx:{state:!0},_cardIdx:{state:!0},_huiReady:{state:!0}};connectedCallback(){super.connectedCallback(),this._loadHui()}async _loadHui(){if(customElements.get("hui-card-picker")&&customElements.get("hui-card-element-editor"))this._huiReady=!0;else{try{const e=await pe(),t=await e.createCardElement({type:"vertical-stack",cards:[]});await(t?.constructor?.getConfigElement?.())}catch{}this._huiReady=!!customElements.get("hui-card-picker")}}_formData(){return{steppers:"side",wave:"auto",...this._config}}get _secs(){return this._config?.sections||[]}_setSecs(e){const t={...this._config};e.length?t.sections=e:delete t.sections,this._commit(t)}_patchSec(e,t){const i=[...this._secs],s={...i[e],...t};for(const e of Object.keys(t))void 0!==t[e]&&""!==t[e]&&null!==t[e]||delete s[e];i[e]=s,this._setSecs(i)}_moveSec(e,t){const i=[...this._secs],s=e+t;s<0||s>=i.length||([i[e],i[s]]=[i[s],i[e]],this._setSecs(i))}_addSec(){const e=this._secs.length;this._setSecs([...this._secs,{title:"New section",style:"section",cards:[]}]),this._secIdx=e}_patchCards(e,t){this._patchSec(e,{cards:t})}render(){return this.hass&&this._config?null!=this._secIdx&&null!=this._cardIdx?this._renderCardView():null!=this._secIdx?this._renderSectionView():super.render():I``}_back(e,t){return I`
      <div style="display:flex;align-items:center;gap:8px;margin:4px 0 14px;">
        <button style=${gs} @click=${t}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
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
            <div style=${ms} @click=${()=>{this._secIdx=t}}>
              <span style="opacity:.6;font-weight:600;">${t+1}</span>
              <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${e.title||("menu"===e.style?"Menu":"Section")}
              </span>
              <span style="opacity:.6;font-size:12px;">${"menu"===e.style?"menu":`${(e.cards||[]).length} cards`}</span>
              <button style=${gs} title="Move up" @click=${e=>{e.stopPropagation(),this._moveSec(t,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button style=${gs} title="Move down" @click=${e=>{e.stopPropagation(),this._moveSec(t,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button style=${gs} title="Edit" @click=${e=>{e.stopPropagation(),this._secIdx=t}}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button style=${gs} title="Delete" @click=${e=>{e.stopPropagation(),this._setSecs(this._secs.filter((e,i)=>i!==t))}}><ha-icon icon="mdi:delete"></ha-icon></button>
            </div>
          `)}
          <button style=${fs} @click=${()=>this._addSec()}>
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
    `}_renderMenuFields(e,t){const i=t.options||[],s=(t,s)=>{const a=i.map((e,i)=>i===t?{...e,...s}:e);for(const e of Object.keys(s))""!==s[e]&&null!=s[e]||delete a[t][e];this._patchSec(e,{options:a})};return I`
      ${this._sel("Entity (select / input_select / water_heater)",{entity:{}},t.entity,t=>this._patchSec(e,{entity:t}))}
      ${this._sel("Substate (secondary line — supports templates)",{template:{}},t.substate,t=>this._patchSec(e,{substate:t}))}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Manual options (override the entity's)</div>
      ${i.map((t,a)=>I`
        <div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:8px;">
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(a,{label:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.label} .label=${"Label"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(a,{value:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.value} .label=${"Value"}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(a,{icon:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${t.icon} .label=${"Icon"}></ha-selector>
          </div>
          <button style="${gs}margin-top:12px;" title="Remove option"
            @click=${()=>this._patchSec(e,{options:i.filter((e,t)=>t!==a)})}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>
      `)}
      <button style=${fs} @click=${()=>this._patchSec(e,{options:[...i,{label:"",value:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add option
      </button>
    `}_renderActions(e,t){const i=t.actions||[],s=(t,s)=>{const a=i.map((e,i)=>i===t?{...e,...s}:e);for(const e of Object.keys(s))""!==s[e]&&null!=s[e]||delete a[t][e];this._patchSec(e,{actions:a})};return I`
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Bar actions (chips in the open bar)</div>
      ${i.map((t,a)=>I`
        <div style="border:1px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.15));border-radius:12px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:flex-start;">
            <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(a,{label:e.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.label} .label=${"Label"}></ha-selector>
            </div>
            <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),s(a,{icon:e.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${t.icon} .label=${"Icon"}></ha-selector>
            </div>
            <button style="${gs}margin-top:12px;" title="Remove action"
              @click=${()=>this._patchSec(e,{actions:i.filter((e,t)=>t!==a)})}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </button>
          </div>
          <div style="margin-top:8px;" @value-changed=${e=>{e.stopPropagation(),s(a,{tap_action:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{ui_action:{}}} .value=${t.tap_action} .label=${"Action"}></ha-selector>
          </div>
        </div>
      `)}
      <button style="${fs}margin-bottom:12px;" @click=${()=>this._patchSec(e,{actions:[...i,{label:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>Add action
      </button>
    `}_renderSectionCards(e,t){const i=t.cards||[],s=(t,s)=>{const a=t+s;if(a<0||a>=i.length)return;const n=[...i];[n[t],n[a]]=[n[a],n[t]],this._patchCards(e,n)};return I`
      ${this._sel("Info (closed-bar text — supports templates)",{template:{}},t.info,t=>this._patchSec(e,{info:t}))}
      ${this._sel("…or info from an entity's state",{entity:{}},t.info_entity,t=>this._patchSec(e,{info_entity:t}))}
      ${this._renderActions(e,t)}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">Cards</div>
      ${i.map((t,a)=>I`
        <div style=${ms} @click=${()=>{this._cardIdx=a}}>
          <span style="opacity:.6;font-weight:600;">${a+1}</span>
          <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t.type||"card"}</span>
          <button style=${gs} title="Move up" @click=${e=>{e.stopPropagation(),s(a,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button style=${gs} title="Move down" @click=${e=>{e.stopPropagation(),s(a,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
          <button style=${gs} title="Edit" @click=${e=>{e.stopPropagation(),this._cardIdx=a}}><ha-icon icon="mdi:pencil"></ha-icon></button>
          <button style=${gs} title="Delete" @click=${t=>{t.stopPropagation(),this._patchCards(e,i.filter((e,t)=>t!==a))}}><ha-icon icon="mdi:delete"></ha-icon></button>
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
          ></hui-card-element-editor>`:V}
    `:(this._cardIdx=null,I``)}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"reserve_height",label:"Keep the height of the tallest section (no reflow when cycling)",selector:{boolean:{}}}]},{title:"Dial",icon:"mdi:thermostat",fields:[{name:"temperature_entity",label:"Current-temp sensor (marker on the dial)",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"step",label:"Step",helper:"Default: the entity's target_temp_step, else 0.5.",selector:{number:{min:.1,max:2,step:.1,mode:"box"}}},{name:"min_temp",label:"Dial min (default: entity)",selector:{number:{min:-30,max:40,step:.5,mode:"box"}}},{name:"max_temp",label:"Dial max (default: entity)",selector:{number:{min:0,max:60,step:.5,mode:"box"}}},{name:"steppers",label:"Stepper placement",selector:{select:{mode:"dropdown",options:[{value:"side",label:"Vertical, beside the dial"},{value:"below",label:"Below the dial"}]}}},{name:"wave",label:"Wave animation",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (hvac_action, or inferred from temps)"},{value:"always",label:"Always (whenever the mode is on)"},{value:"never",label:"Never"}]}}}]}]}});const _s=[Ee,ze,Ae,ge,n`
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
      stroke: var(--md-sys-color-secondary-container, var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.08)));
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
  `],bs=-135,vs=270,ys="var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))",xs="var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))",ws={auto:{icon:"mdi:thermostat-auto",color:ys,on:xs,container:xs,onContainer:ys},heat_cool:{icon:"mdi:thermostat-auto",color:ys,on:xs,container:xs,onContainer:ys},heat:{icon:"m3o:mode-heat",color:"var(--md-sys-cust-color-climate-heat-accent, #a14614)",on:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",container:"var(--md-sys-cust-color-climate-heat-container, #ffeee9)",onContainer:"var(--md-sys-cust-color-climate-heat-accent, #a14614)"},cool:{icon:"mdi:snowflake",color:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)",on:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",container:"var(--md-sys-cust-color-climate-cool-container, #eaf3ff)",onContainer:"var(--md-sys-cust-color-climate-cool-accent, #327ea7)"},dry:{icon:"mdi:water-percent",color:ys,on:xs,container:xs,onContainer:ys},fan_only:{icon:"mdi:fan",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"},off:{icon:"m3o:power-settings-new",color:"var(--md-sys-color-secondary)",on:"var(--md-sys-color-on-secondary)",container:"var(--md-sys-color-secondary-container)",onContainer:"var(--md-sys-color-on-secondary-container)"}};class ks extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_optimisticTemp:{state:!0},_adjusting:{state:!0}};static styles=_s;setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={...e}}connectedCallback(){super.connectedCallback(),this._phase=0,this._amp=0,this._startLoop()}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),clearTimeout(this._optimisticTimer),clearTimeout(this._sendTimer)}get _entity(){return this.hass?.states[this.config.entity]}get _action(){return this._entity?.attributes?.hvac_action??""}get _waveAction(){const e=this._mode;if("off"===e||"never"===this.config.wave)return"";if("always"===this.config.wave)return"cool"===e?"cooling":"heating";const t="auto"===e||"heat_cool"===e,i=t?"holding":"",s=this._action;if("heating"===s||"cooling"===s)return s;if(s&&"idle"!==s)return"";const a=this._current,n=this._target;return null==n||"idle"===s?i:null==a?"cool"===e?"cooling":"heat"===e?"heating":i:("heat"===e||t)&&a<n-.2?"heating":("cool"===e||t)&&a>n+.2?"cooling":i}get _mode(){return this._entity?.state??"off"}get _target(){return null!=this._optimisticTemp?this._optimisticTemp:this._numRaw(this._entity?.attributes?.temperature)}get _current(){if(this.config.temperature_entity){const e=this.hass?.states[this.config.temperature_entity];if(e)return this._numRaw(e.state)}return this._numRaw(this._entity?.attributes?.current_temperature)}_numRaw(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}get _step(){return this.config.step??this._numRaw(this._entity?.attributes?.target_temp_step)??.5}get _scale(){return{min:this.config.min_temp??this._numRaw(this._entity?.attributes?.min_temp)??7,max:this.config.max_temp??this._numRaw(this._entity?.attributes?.max_temp)??35}}_startLoop(){if(this._raf)return;const e=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,t=()=>{const i=this._waveAction,s="heating"===i||"cooling"===i,a=e?0:s?1:"holding"===i?.35:0,n=this._amp+.06*(a-this._amp),o=Math.abs(n-a)<.01;if(this._amp=o?a:n,this._amp>.005||a>0){this._phase+="cooling"===i?.012:s?-.012:-.008;const e=this._waveGeom;if(e){const t=this.renderRoot?.querySelector("path.wave-seg");t&&t.setAttribute("d",this._wavePath(e.start,e.end,e.r))}this._raf=requestAnimationFrame(t)}else this._raf=null};this._raf=requestAnimationFrame(t)}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}updated(e){if(this._waveAction&&!this._raf&&this._startLoop(),e.has("hass")&&null!=this._optimisticTemp){const e=this._numRaw(this._entity?.attributes?.temperature);null!=e&&Math.abs(e-this._optimisticTemp)<1e-6&&(this._optimisticTemp=null,clearTimeout(this._optimisticTimer))}}_modeGroupConfig(e,t,i){const s=`${this.config.entity}|${e.join()}|${t}|${i}|${this.config.mode_size??"m"}`;return this._mgKey!==s&&(this._mgKey=s,this._mgConfig={entity:this.config.entity,size:this.config.mode_size??"m",variant:"tonal",active_shape:"square",color_active:t,color_on_active:i,options:e.map(e=>({icon:ws[e].icon,value:e,tap_action:{action:"perform-action",perform_action:"climate.set_hvac_mode",data:{hvac_mode:e},target:{entity_id:this.config.entity}}}))}),this._mgConfig}_angleFor(e,t,i){const s=Math.min(1,Math.max(0,(e-t)/(i-t)));return bs+vs*s}_pointAt(e,t,i=0){const s=(e-90)*Math.PI/180,a=t+i;return[50+a*Math.cos(s),50+a*Math.sin(s)]}_wavePath(e,t,i){const s=t-e,a=1+.55*Math.max(0,Math.min(1,(90-s)/70)),n=Math.min(20,Math.max(6,s/3)),o=3.2*a*this._amp,r=[];for(let s=e;s<=t;s+=2){const a=s-e,l=o*Math.min(1,a/n)*Math.min(1,(t-s)/n)*Math.sin(a/7+this._phase);r.push(this._pointAt(s,i,l))}return r.push(this._pointAt(t,i,0)),"M"+r.map(([e,t])=>`${e.toFixed(2)} ${t.toFixed(2)}`).join(" L")}_arcPath(e,t,i){const[s,a]=this._pointAt(e,i),[n,o]=this._pointAt(t,i),r=t-e>180?1:0;return`M${s.toFixed(2)} ${a.toFixed(2)} A${i} ${i} 0 ${r} 1 ${n.toFixed(2)} ${o.toFixed(2)}`}_setTarget(e){const{min:t,max:i}=this._scale,s=this._step,a=Math.round(100*Math.min(i,Math.max(t,Math.round(e/s)*s)))/100;this._optimisticTemp=a,this._adjusting=!0,clearTimeout(this._adjustTimer),this._adjustTimer=setTimeout(()=>{this._adjusting=!1},650),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTemp=null},1e4),clearTimeout(this._sendTimer),this._sendTimer=setTimeout(()=>{this._callService("climate","set_temperature",{entity_id:this.config.entity,temperature:a})},350)}_nudge(e){const t=this._target;null!=t&&this._setTarget(t+e)}_dialPointer(e){if(!this._dialDragging&&"pointerdown"!==e.type)return;const t=this.renderRoot.querySelector(".dial").getBoundingClientRect(),i=(e.clientX-t.left)/t.width*100-50,s=(e.clientY-t.top)/t.height*100-50;let a=180*Math.atan2(s,i)/Math.PI+90;if(a>180&&(a-=360),a<-143||a>143)return;const n=Math.min(1,Math.max(0,(a-bs)/vs)),{min:o,max:r}=this._scale;"pointerdown"===e.type&&(this._dialDragging=!0,e.currentTarget.setPointerCapture(e.pointerId)),this._setTarget(o+n*(r-o))}_endDialDrag(e){this._dialDragging=!1,e.currentTarget.releasePointerCapture?.(e.pointerId)}render(){if(!this.hass||!this.config)return I``;const e=this._entity;if(!e)return I``;const t=this._isUnavailable(e),{min:i,max:s}=this._scale,a=this._target,n=this._current,o=this._mode,r=this._waveAction,l=ws[o]||ws.off,c="off"!==o&&null!=a,d=42,h=c?this._angleFor(a,i,s):bs,p=null!=a?this._angleFor(a,i,s):null,[u,m]=this._pointAt(c?h:p??h,d),g=null!=n?this._angleFor(n,i,s):null;let f=null,_=null,b=null;c&&"holding"===r?(_=bs,b=null!=g?Math.max(g,h):h):c&&null!=g?(f=Math.min(g,h),_=f,b=Math.max(g,h)):c&&(_=bs,b=h);const v="heating"===r?ws.heat:"cooling"===r?ws.cool:l,y=v.color,x=v.on,w=this.hass.formatEntityState?.(e)??o,k=this.hass.config?.unit_system?.temperature??"°C",$=(this.config.hvac_modes??e.attributes.hvac_modes??[]).filter(e=>ws[e]);return this._waveGeom=c&&null!=b&&b>_+.5?{start:_,end:b,r:d}:null,I`
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
              d=${this._arcPath(bs,135,d)}
              class="hit-ring"
              @pointerdown=${this._dialPointer}
              @pointermove=${this._dialPointer}
              @pointerup=${this._endDialDrag}
              @pointercancel=${this._endDialDrag}
            />
            ${(()=>{const e=c?Math.max(h,g??h):bs,t=c?Math.min(e+8,135):bs;return t<134.5?H`<path d=${this._arcPath(t,135,d)} class="track" />`:""})()}
            ${c||null==g?"":H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="1.6" class="current-dot" />`}
            ${c&&null!=f&&f>-134.5?H`<path d=${this._arcPath(bs,f,d)} class="sweep" style="stroke:${y}" />`:""}
            ${c&&null!=b&&b>_+.5?H`<path d=${this._wavePath(_,b,d)} class="sweep wave-seg" style="stroke:${y}" />`:""}
            ${c&&null!=g?H`<circle
                  cx=${this._pointAt(g,d)[0]} cy=${this._pointAt(g,d)[1]}
                  r="3.4" class="current-knob" style="fill:${y}" />`:""}
            ${c?H`<g>
                  <circle cx=${u} cy=${m} r="5.5" class="thumb" style="fill:${y}" />
                  <path d=${rt(u,m,3.7,12)} class="thumb-cookie" />
                </g>`:null!=p?H`<g>
                    <circle cx=${u} cy=${m} r="5.5" class="thumb muted" />
                    <path d=${rt(u,m,3.7,12)} class="thumb-cookie" />
                  </g>`:""}
          </svg>
          <div class="center" @click=${()=>this._fireMoreInfo(this.config.entity)}>
            <div class="mode-label">${w}</div>
            <div class="target ${this._adjusting?"adjusting":""}">
              ${null!=a?Math.round(10*a)/10:null!=n?Math.round(10*n)/10:"—"}<span class="deg">${k}</span>
            </div>
            ${null!=n&&!1!==this.config.show_current?I`<div class="current-label">${this.config.current_label??$e("cp_currently",this.hass)} ${Math.round(10*n)/10}°</div>`:""}
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
    `}getGridOptions(){return{columns:6,rows:"auto",min_columns:4}}getCardSize(){return 5}}customElements.define("materia-climate-dial",ks),window.customCards=window.customCards||[];const $s={heat:["var(--md-sys-cust-color-climate-heat-accent, #a14614)","var(--md-sys-cust-color-climate-heat-container, #ffeee9)"],cool:["var(--md-sys-cust-color-climate-cool-accent, #327ea7)","var(--md-sys-cust-color-climate-cool-container, #eaf3ff)"],auto:["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))","var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],heat_cool:["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))","var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],off:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"]};class Cs extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_openSection:{state:!0}};static styles=us;static getConfigElement(){return document.createElement("materia-climate-panel-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("climate."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Climate Panel: entity is required");this.config={...e},this._extraEls=null,this.isConnected&&this._createExtraCards()}firstUpdated(){this._createExtraCards()}updated(e){if(e.has("hass")&&this._extraEls){const e=this._openSection??0;this._extraEls[e]?.forEach(e=>{e.hass=this.hass})}this._reserveHeight()}get _entity(){return this.hass?.states[this.config.entity]}_modeGroup(){const e=(this._entity?.attributes?.hvac_modes||[]).filter(e=>["heat","auto","off","cool","heat_cool"].includes(e));if(!e.length)return V;const[t,i]=$s[this._entity?.state]??$s.off;return I`
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
        `:null;return{style:e.style,menuConfig:"menu"===e.style?this._menuCardConfig(e):null,title:e.title??$e("cp_section_default",this.hass,{n:t+1}),icon:e.icon,info:i,actions:s,body:this._extraEls?.[t]?.length?I`<div class="acc-cards">${this._extraEls[t]}</div>`:V}})}_openAcc(e){this._openSection!==e&&(this._openSection=e,this._fireHaptic("light"),this._extraEls?.[e]?.forEach(e=>{e.hass=this.hass}))}_reserveHeight(){const e=this.renderRoot?.querySelector(".stack");e&&(this.config.reserve_height?requestAnimationFrame(()=>{const t=[...e.querySelectorAll(".acc-inner")];if(!t.length)return;const i=e.querySelector(".acc-sec.open .acc-inner");e.style.minHeight="";const s=e.offsetHeight-(i?.offsetHeight||0),a=Math.max(...t.map(e=>e.scrollHeight));e.style.minHeight=`${s+a}px`}):e.style.minHeight="")}render(){if(!this.hass||!this.config)return I``;if(!this._entity)return I`<ha-card class="panel">Unknown entity: ${this.config.entity}</ha-card>`;const e=this._accordionSections(),t=e.findIndex(e=>"menu"!==e.style),i=this._openSection??t,s=this._entity.state,a="off"!==s&&$s[s],[n,o]=$s[s]??$s.off;return I`
      <ha-card class="panel" style=${a?`--ms-track:${n};--ms-thumb:${o};`:""}>
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
                  ${i===t?e.actions??V:I`<span class="acc-info">${e.info}</span><ha-icon class="acc-chev" icon="mdi:chevron-down"></ha-icon>`}
                </div>
                <div class="acc-body"><div class="acc-inner">${e.body}</div></div>
              </div>`)}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 6}}customElements.define("materia-climate-panel",Cs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-climate-panel",name:"Materia Climate Panel",description:"Climate panel: thermostat dial hero, mode group, and wallet sections you compose with any cards or menus.",preview:!0});const Ss={primary:{active:"var(--md-sys-color-primary)",onActive:"var(--md-sys-color-on-primary)"},secondary:{active:"var(--md-sys-color-secondary)",onActive:"var(--md-sys-color-on-secondary)"},tertiary:{active:"var(--md-sys-color-tertiary)",onActive:"var(--md-sys-color-on-tertiary)"},"climate-heat":{active:"var(--md-sys-cust-color-climate-heat-container)",onActive:"var(--md-sys-cust-color-on-climate-heat)"},"climate-cool":{active:"var(--md-sys-cust-color-climate-cool-container)",onActive:"var(--md-sys-cust-color-on-climate-cool)"},"climate-auto":{active:"var(--md-sys-cust-color-climate-auto-container)",onActive:"var(--md-sys-cust-color-on-climate-auto)"},light:{active:"var(--md-sys-cust-color-light)",onActive:"var(--md-sys-cust-color-on-light)"},device:{active:"var(--md-sys-cust-color-device)",onActive:"var(--md-sys-cust-color-on-device)"}},Ts={xs:{height:32,innerCorner:4},s:{height:40,innerCorner:8},m:{height:56,innerCorner:8},l:{height:96,innerCorner:16},xl:{height:136,innerCorner:20}},zs=[Ee,ze,ge,n`
    .group {
      display: flex;
      gap: 2px;
      width: 100%;
      /* NO container radius/clip: every button computes its own corners
         (outer stadium ends, inner seams, and the M3E active-square morph).
         A 999px clip here silently erased the morph on outer corners — a
         single-option group could never show it at all. */
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

    /* M3 toggle buttons share one pressed shape regardless of whether their
       resting shape is round or square. The release then visibly morphs to the
       newly selected resting shape through the spatial spring above. */
    .group.multi button:active {
      border-radius: var(--pressed-radius) !important;
    }

    /* Unselected toggle pair per FilledButtonTokens: SurfaceContainer /
       OnSurfaceVariant. This half of the pair had drifted to HA theme vars
       while the selected half was already correct. */
    button.inactive.filled {
      background: var(--md-sys-color-surface-container, var(--ha-card-background, var(--card-background-color)));
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
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

    /* Connected groups do not size-morph. Material's connected-group style
       explicitly clears buttonSizeChange; selection is expressed by shape
       and colour, both using the fast spatial/effects motion tokens above. */

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `],As=[Ee,n`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* "wide" buttons grow to fill the row (and stretch when standalone) */
    :host([wide]) {
      flex: 1;
      /* min-width:auto would refuse to shrink, so a long label overflows
         instead of ellipsizing. Every flex ancestor of .label needs this. */
      min-width: 0;
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
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects),
        box-shadow var(--md-sys-motion-fast-effects);
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

    /* Truncates rather than growing. M3 buttons ellipsize a long label; nowrap
       on its own cannot shrink below its content, so one long label (a
       translated string is routinely half again the English) forced the whole
       button row wider than a phone. The .sub rule below already did this —
       .label was simply missed. */
    .label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
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
    .size-xs { --mb-h: 32px;  --mb-icon: 20px; --mb-font: 14px; --mb-px: 16px; --mb-rsq: 12px; --mb-gap: 8px; }
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

    /* M3 Expressive: round and square buttons converge on the same pressed
       shape for their size. The selected resting shape is handled separately
       in index.js, so releasing returns to the correct inverse shape. */
    .btn:active {
      border-radius: var(--mb-rsq, 16px);
    }

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
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
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
      transition: opacity var(--md-sys-motion-fast-effects);
    }
    .btn:hover::before { opacity: 0.08; }
    .btn:active::before { opacity: 0.1; }

    /* ---- the confirm gesture ----
       The button's OWN surface is the track: a fill sweeps from the leading
       edge and nothing about the geometry moves. Sits under the content
       (z-index 0 against the content's own stacking) and inside the button's
       overflow, so it takes whatever corner the shape ladder gave it — round,
       square or connected — for free.

       currentColor at 22%, which is a deliberate choice over a second colour
       token: every variant already guarantees its content is legible on its
       own surface, so a wash of that same ink is legible on every variant
       without one new decision per variant. An opaque fill would need an
       on-colour per variant and would break the moment someone set a role.

       No transition while ARMED — the fill is following a finger, and easing a
       directly-manipulated element makes it feel like it lags the touch. Easing
       comes back only when the gesture is released and the fill travels home on
       its own, and it is the standard spring rather than the expressive one:
       this fill stops at a hard edge inside a clipped box, where an overshoot
       has nowhere to go. Same reasoning materia-drag-confirm documents. */
    .btn .commit-fill {
      position: absolute;
      inset: 0;
      transform-origin: left center;
      transform: scaleX(var(--mb-p, 0));
      background: currentColor;
      opacity: 0.22;
      pointer-events: none;
    }

    .btn.settling .commit-fill {
      transition: transform var(--md-sys-motion-standard-fast-spatial);
    }

    /* The content has to sit above the fill. The button is already
       position:relative with overflow:hidden, so this is the only lift needed. */
    .btn.confirming > ha-icon,
    .btn.confirming > .text {
      position: relative;
    }

    /* A confirm button is never fired by a tap, so it must not advertise one:
       the press state layer would promise something the control does not do. */
    .btn.confirming:active::before {
      opacity: 0.08;
    }

    @media (prefers-reduced-motion: reduce) {
      .btn.settling .commit-fill {
        transition: none;
      }
    }

    .btn.disabled,
    .btn.unavailable {
      opacity: 0.38;
      pointer-events: none;
    }
  `];class Es extends We{static properties={_expanded:{state:!0},_actionRows:{state:!0}};static styles=[We.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null,this._actionRows??=Object.entries(e.tap_action_map||{}).map(([e,t])=>({state:e,tap_action:t}))}_formData(){return{variant:"filled",size:"m",shape:"round",...this._config}}get _sections(){return[{title:"Button",icon:"mdi:gesture-tap-button",fields:[{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"label",template:!0,selector:{text:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"elevated",label:"Elevated"},{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"outlined",label:"Outlined"},{value:"text",label:"Text"}]}}},{name:"role",label:"Color role",helper:"Unset = each variant's spec default (filled → primary, tonal → secondary).",selector:{select:{mode:"dropdown",options:[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32)"},{value:"s",label:"S (40)"},{value:"m",label:"M (56)"},{value:"l",label:"L (96)"},{value:"xl",label:"XL (136)"}]}}},{name:"shape",selector:{select:{mode:"dropdown",options:[{value:"round",label:"Round (pill)"},{value:"square",label:"Square"}]}}},{name:"wide",selector:{boolean:{}}},{name:"entity",selector:{entity:{}}},He]},{title:"Behavior",icon:"mdi:tune",fields:[{name:"active_state",label:"Active state",helper:"State(s) considered active (defaults by domain)",selector:{text:{}}},{name:"morph_on_active",label:"Morph shape when active",selector:{boolean:{}}},{name:"active_variant",label:"Variant when active",selector:{select:{mode:"dropdown",options:["filled","tonal","outlined","elevated","text"]}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Default action",selector:{ui_action:{}}}]}]}_renderExtra(){const e=this._actionRows||[];return I`
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
                      .computeLabel=${De}
                      @value-changed=${e=>this._updateMapping(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}get _mappingSchema(){return[{name:"state",required:!0,helper:"Use 'default' for the fallback",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_addMapping(){this._actionRows=[...this._actionRows||[],{state:""}],this._expanded=this._actionRows.length-1}_updateMapping(e,t){this._actionRows=(this._actionRows||[]).map((i,s)=>s===e?{...i,...t}:i),this._commitActionRows()}_removeMapping(e){this._actionRows=(this._actionRows||[]).filter((t,i)=>i!==e),this._expanded===e&&(this._expanded=null),this._commitActionRows()}_commitActionRows(){const e={};for(const t of this._actionRows||[])t.state&&t.tap_action&&(e[t.state]=t.tap_action);const{tap_action_map:t,...i}=this._config;this._commit(Object.keys(e).length?{...i,tap_action_map:e}:i)}}customElements.define("materia-button-editor",Es);const Ms={"filled-tonal":"tonal",standard:"text"},Os={light:"on",switch:"on",fan:"on",input_boolean:"on",vacuum:"cleaning",lock:["locked","locking"],cover:"open",climate:"heat",media_player:"playing"};class Fs extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedIcon:{state:!0},_resolvedLabel:{state:!0},_resolvedSubtitle:{state:!0},_resolvedDisabled:{state:!0}};static styles=As;static getConfigElement(){return document.createElement("materia-button-editor")}static getStubConfig(){return{icon:"mdi:play",variant:"filled",size:"m",shape:"round"}}setConfig(e){if(!e.icon&&!e.label)throw new Error("icon or label is required");this.config={variant:"filled",size:"m",shape:"round",...e},this.toggleAttribute("wide",!!e.wide)}get _disabled(){const e=this.config?.disabled_when??this.config?.disabled;if(null==e)return!1;if("boolean"==typeof e)return e;if(Array.isArray(e))return li(e,this.hass);if(this._isTemplate(e)){const e=this._resolvedDisabled;return"True"===e||"true"===e||"1"===e}return"true"===e||"True"===e}updated(e){if(e.has("config")&&(this.toggleAttribute("wide",!!this.config?.wide),null!=this.config?.flex&&(this.style.flex=String(this.config.flex))),e.has("hass")&&this.hass){this._resolveField("icon","_resolvedIcon"),this._resolveField("label","_resolvedLabel"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField(null!=this.config?.disabled_when?"disabled_when":"disabled","_resolvedDisabled");const e=this.config?.entity?this.hass.states?.[this.config.entity]:void 0,t=this._isActive(e);void 0!==this.__lastActive&&t!==this.__lastActive&&this._animateStateMorph(this.__lastActive,t),this.__lastActive=t}}_animateStateMorph(e,t){if(!this.config?.morph_on_active||window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)return;const i=this.shadowRoot?.querySelector(".btn");if(!i?.animate)return;const s=getComputedStyle(i),a=(i.getBoundingClientRect().height||parseFloat(s.height)||56)/2,n=parseFloat(s.getPropertyValue("--mb-rsq"))||16,o="square"!==this.config.shape,r=e=>(this.config.morph_on_active&&e?!o:o)?a:n,l=r(e),c=r(t),d=c-l,h=e=>Math.max(0,Math.min(a,e));this.__morphAnimation?.cancel(),this.__morphAnimation=i.animate([{borderRadius:`${l}px`,transform:"scale(1)"},{borderRadius:`${h(c+.16*d)}px`,transform:"scale(0.97)",offset:.58},{borderRadius:`${h(c-.07*d)}px`,transform:"scale(1.015)",offset:.82},{borderRadius:`${c}px`,transform:"scale(1)"}],{duration:533,easing:"cubic-bezier(0.2, 0, 0, 1)"})}_isActive(e){if(!e)return!1;const t=e.entity_id.split(".")[0],i=this.config.active_state??Os[t]??"on";return Array.isArray(i)?i.includes(e.state):e.state===String(i)}_defaultTapAction(){return this.config.entity?{action:"toggle"}:{action:"none"}}_resolveTapAction(){if(this.config.tap_action_map&&this.config.entity){const e=this.hass?.states[this.config.entity]?.state,t=this.config.tap_action_map[e]??this.config.tap_action_map.default;if(t)return t}return this.config.tap_action||this._defaultTapAction()}_handleTap(e){if(this.__suppressNextClick)return this.__suppressNextClick=!1,clearTimeout(this.__suppressClickTimer),e?.preventDefault?.(),void e?.stopImmediatePropagation?.();this._disabled||this._confirmMode||this._handleAction(this._resolveTapAction())}get _confirmMode(){const e=this.config?.confirm,t="hold"===e||!0===e?"hold":"slide"===e?"slide":null;if(!t)return null;if("both"===this.config?.confirm_direction)return t;const i=this.config?.entity?this.hass?.states?.[this.config.entity]:void 0;return i&&this._isActive(i)?null:t}get _gesture(){return this.__gesture??=new _e({host:this,surface:()=>this.shadowRoot?.querySelector(".btn"),onChange:()=>this.requestUpdate()}),this.__gesture.travel="full",this.__gesture}_syncGesture(){const e=this._gesture;return e.gesture=this._confirmMode??"hold",e.threshold=Number(this.config?.confirm_threshold??.55),e.holdMs=Number(this.config?.confirm_hold_ms??800),e.disabled=this._disabled,e}_onConfirmDown(e){this._confirmMode&&this._syncGesture().pointerDown(e)}_onConfirmKey(e){this._confirmMode&&this._syncGesture().keyDown(e)}_onConfirmed(){this.__suppressNextClick=!0,clearTimeout(this.__suppressClickTimer),this.__suppressClickTimer=setTimeout(()=>{this.__suppressNextClick=!1},3e3),this._handleAction(this._resolveTapAction()),cancelAnimationFrame(this.__confirmResetRaf),this.__confirmResetRaf=requestAnimationFrame(()=>{this.__gesture?.setProgress(0,!0)})}connectedCallback(){super.connectedCallback(),this.__onConfirm??=()=>this._onConfirmed(),this.addEventListener("confirm",this.__onConfirm)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("confirm",this.__onConfirm),clearTimeout(this.__suppressClickTimer),cancelAnimationFrame(this.__confirmResetRaf),this.__morphAnimation?.cancel(),this.__gesture?.destroy()}render(){if(!this.config)return I``;const e=this.config.entity?this.hass?.states?.[this.config.entity]:void 0,t=!!this.config.entity&&this._isUnavailable(e),i=this._disabled,s=Ms[this.config.variant]||this.config.variant||"filled",a=["primary","secondary","tertiary","error"].includes(this.config.role)?this.config.role:"",n=this.config.size??"m";let o="",r="";if("number"==typeof n||/^\d+$/.test(String(n))){const e=Number(n);r=`--mb-h:${e}px;--mb-icon:${Math.round(.43*e)}px;--mb-font:16px;--mb-px:${Math.round(.42*e)}px;--mb-rsq:${Math.round(.28*e)}px;--mb-gap:8px;`}else o=`size-${n}`;const l="square"===this.config.shape?"square":"round",c=this._isActive(e),d=this.config.active_variant,h=c&&d?Ms[d]||d:s,p=this.config.morph_on_active&&c?"round"===l?"square":"round":l,u=this._isTemplate(this.config.icon)?this._resolvedIcon||"":this.config.icon,m=this._isTemplate(this.config.label)?this._resolvedLabel||"":this.config.label,g=this._isTemplate(this.config.subtitle)?this._resolvedSubtitle||"":this.config.subtitle,f="stacked"===this.config.layout,_=!m&&!g,b=this._confirmMode,v=b?this._syncGesture():null;return I`
      <button
        class="btn variant-${h} ${a?`role-${a}`:""} ${o} shape-${p} ${c?"active":"inactive"} ${this.config.connected?`connected-${this.config.connected}`:""} ${_?"icon-only":""} ${f?"stacked":""} ${i?"disabled":""} ${t?"unavailable":""} ${b?"confirming":""} ${v?.armed?"armed":""} ${v&&v.settling&&!v.armed?"settling":""}"
        style=${r}${b?`--mb-p:${v.p};`:""}
        @click=${this._handleTap}
        @pointerdown=${b?this._onConfirmDown:void 0}
        @keydown=${b?this._onConfirmKey:void 0}
      >
        ${b?I`<span class="commit-fill" aria-hidden="true"></span>`:V}
        ${u?I`<ha-icon .icon=${u}></ha-icon>`:V}
        ${m||g?I`<span class="text">
              ${m?I`<span class="label">${m}</span>`:V}
              ${g?I`<span class="sub">${g}</span>`:V}
            </span>`:V}
      </button>
    `}getCardSize(){return 1}}customElements.define("materia-button",Fs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button",name:"Materia Button",description:"M3 button — icon and/or label, variants, sizes, shapes, and shape-morph on state.",preview:!0});const Ds=[Ee,n`
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
      /* A flex item defaults to min-width:auto, which refuses to shrink below
         its content — so the label's ellipsis never engaged and a long label
         pushed the whole row past the viewport on a phone. */
      min-width: 0;
    }
    :host([wide]) .wrap,
    :host([wide]) .split {
      width: 100%;
    }

    .wrap {
      position: relative;
      display: inline-flex;
      min-width: 0;
    }

    .split {
      display: inline-flex;
      align-items: stretch;
      min-width: 0;
      gap: 2px; /* M3: the inner space is always 2dp */
      height: var(--sb-h, 40px);
    }

    /* The leading materia-button colors and sizes itself from its own config. */
    .leading {
      display: flex;
      /* takes the slack and gives it back: the trailing chevron keeps its
         fixed icon width while this half absorbs and truncates. */
      flex: 1;
      min-width: 0;
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
  `];class qs extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{variant:"tonal",size:"s",menu_position:"bottom-right",...this._config}}get _sections(){return[{title:"Leading button",icon:"mdi:card-text-outline",fields:[{name:"icon",template:!0,selector:{icon:{}}},{name:"label",template:!0,selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"more-info"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"},{value:"elevated",label:"Elevated"},{value:"outlined",label:"Outlined"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"Extra small"},{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"},{value:"xl",label:"Extra large"}]}}},{name:"menu_position",label:"Menu alignment",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"Below · right-aligned"},{value:"bottom-left",label:"Below · left-aligned"},{value:"top-right",label:"Above · right-aligned"},{value:"top-left",label:"Above · left-aligned"}]}}},{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}_optionSchema(e){return[Ue(e?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.options)?this._config.options:[];return I`
      <div class="opt-header">
        <span>Menu options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveOption(e,t),e.map((e,t)=>I`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||(e.icon&&!Ue(e.icon)?e.icon:`Option ${t+1}`)}</span>
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
                        .computeLabel=${De}
                        @value-changed=${e=>this._optionChanged(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_optionChanged(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}_toggleOption(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-split-button-editor",qs);const Ns={xs:32,s:40,m:56,l:96,xl:136,default:48,large:56},Ps={xs:12,s:12,m:16,l:28,xl:28,default:14,large:16},Rs={xs:20,s:20,m:24,l:32,xl:40,default:24,large:24};class Ls extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0}};static styles=[Ds,pi];static getConfigElement(){return document.createElement("materia-split-button-editor")}static getStubConfig(){return{label:"Action",icon:"mdi:play",variant:"tonal",size:"s",options:[{label:"Option 1",icon:"mdi:numeric-1-circle-outline"},{label:"Option 2",icon:"mdi:numeric-2-circle-outline"}]}}setConfig(e){this.config={variant:"tonal",size:"s",...e},this._open=!1,this.toggleAttribute("wide",!!e.wide)}updated(e){e.has("config")&&(this.toggleAttribute("wide",!!this.config?.wide),null!=this.config?.flex&&(this.style.flex=String(this.config.flex))),e.has("_open")&&this._open&&requestAnimationFrame(()=>this._clampMenu())}_clampMenu(){const e=this.shadowRoot?.querySelector(".menu");if(!e||!this._open)return;e.classList.remove("clamp-left","clamp-right");const t=e.getBoundingClientRect();t.left<8?e.classList.add("clamp-left"):t.right>window.innerWidth-8&&e.classList.add("clamp-right")}connectedCallback(){super.connectedCallback(),this._outsideClick=e=>{this._open&&((e.composedPath?.()||[]).includes(this)||(this._open=!1))},document.addEventListener("click",this._outsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClick)}_toggle(e){e.stopPropagation(),this._open=!this._open}_selectOption(e,t){t.stopPropagation(),this._open=!1,e.tap_action&&this._handleAction(e.tap_action)}_isSelected(e){if(null!=e.selected)return!!e.selected;const t=this.config.preset_entity||this.config.entity;if(null==e.value||!t)return!1;const i=this.hass?.states?.[t];if(!i)return!1;const s=this.config.preset_attribute||(this.config.preset_entity?null:this.config.attribute),a=s?i.attributes?.[s]:i.state;return(Array.isArray(e.value)?e.value:[e.value]).some(e=>String(e)===String(a))}render(){if(!this.config)return I``;const e=this.config.variant||"tonal",t=this.config.size||"s",i="number"==typeof t||/^\d+$/.test(String(t)),s=i?Number(t):Ns[t]||40,a=i?Math.round(.28*s):Ps[t]??12,n=i?Math.round(.32*s):Rs[t]??20,o=this.config.options||[],{options:r,type:l,...c}=this.config,d={...c,connected:"leading"},h=`--sb-h:${s}px;--sb-inner:${a}px;--sb-ticon:${n}px;`+(this.config.color?`--sb-bg:${this.config.color};`:"")+(this.config.color_on?`--sb-fg:${this.config.color_on};`:"");return I`
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
          ${o.map(e=>{const t=this._isSelected(e);return I`
              <div class="menu-item ${t?"selected":""}" role="menuitem" aria-checked=${t?"true":"false"} @click=${t=>this._selectOption(e,t)}>
                ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}
                <span class="item-text">${e.label||""}</span>
                ${t?I`<ha-icon class="item-check" icon="m3of:check"></ha-icon>`:""}
              </div>
            `})}
        </div>
      </div>
    `}getCardSize(){return 1}}customElements.define("materia-split-button",Ls),window.customCards=window.customCards||[],window.customCards.push({type:"materia-split-button",name:"Materia Split Button",description:"M3 Expressive split button — a main action plus a menu of related actions.",preview:!0});class Us extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
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
      .option-header .glyph-note {
        flex: none;
        font-size: 11px;
        opacity: 0.6;
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{group:"connected",size:"m",variant:"tonal",...this._config}}_sectionsSignature(){return`${this._config?.group||""}|${this._config?.preset||""}|${this._config?.multi_select?1:0}`}get _sections(){const e="standard"===this._config?.group,t=[...Object.keys(Ss).map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1).replace(/-/g," ")})),{value:"custom",label:"Custom"}],i=[{title:"Setup",icon:"mdi:tune",fields:[{name:"group",label:"Configuration",selector:{select:{mode:"dropdown",options:[{value:"connected",label:"Connected (segmented, entity-driven)"},{value:"standard",label:"Standard (spaced row of buttons)"}]}}},...e?[]:[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",label:"Color preset",selector:{select:{mode:"dropdown",options:t}}}],{name:"size",label:"Size (applies to the whole group)",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (40dp)"},{value:"m",label:"M (56dp)"},{value:"l",label:"L (96dp)"},{value:"xl",label:"XL (136dp)"}]}}},{name:"variant",label:"Style",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"}]}}},...e?[]:[{name:"multi_select",label:"Multi-select",selector:{boolean:{}}}],...!e&&this._config?.multi_select?[{name:"columns",label:"Max columns",selector:{number:{min:1,max:8,mode:"box"}}}]:[]]}];return i.push({title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}),"custom"===this._config?.preset&&i.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color_active",label:"Active color",color:!0,template:!0,selector:{text:{}}},{name:"color_on_active",label:"Active text color",color:!0,template:!0,selector:{text:{}}}]}),i}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"entity",label:"Entity (optional — this button's own state)",selector:{entity:{}}},{name:"value",label:"Value (state that = active; blank = on/truthy)",selector:{text:{}}},{name:"active",label:"Active template (overrides everything, e.g. attribute logic)",template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}get _buttonSchema(){return[{name:"label",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}}},{name:"entity",label:"Entity (optional — drives active state)",selector:{entity:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled"},{value:"tonal",label:"Tonal"}]}}},{name:"wide",label:"Wide (stretch to share the row)",selector:{boolean:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{default_action:"call-service"}}}]}get _listKey(){return"standard"===this._config?.group?"buttons":"options"}_renderExtra(){const e=this._listKey,t="buttons"===e,i=this._config[e]||[],s=t?this._buttonSchema:this._optionSchema;return I`
      <div class="options-header">
        <span>${t?"Buttons":"Options"}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveOption(e,t),i.map((e,i)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||`${t?"Button":"Option"} ${i+1}`}</span>
                ${"split"===e.type||e.options?I`<span class="glyph-note">split · menu in YAML</span>`:""}
                ${e.tap_action_map?I`<span class="glyph-note">state-mapped action (YAML)</span>`:""}
                <ha-icon-button @click=${()=>this._toggleExpand(i)}>
                  <ha-icon icon=${this._expanded===i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(i)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===i?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s}
                        .computeLabel=${De}
                        @value-changed=${e=>this._updateOptionForm(i,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=this._listKey,t=[...this._config[e]||[],"buttons"===e?{icon:"",variant:"tonal"}:{label:"",value:"",icon:""}];this._expanded=t.length-1,this._commit({...this._config,[e]:t})}_removeOption(e){const t=this._listKey,i=[...this._config[t]||[]];i.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,[t]:i})}_moveOption(e,t){const i=this._listKey,s=[...this._config[i]||[]],[a]=s.splice(e,1);s.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commit({...this._config,[i]:s})}_updateOptionForm(e,t){const i=this._listKey,s=[...this._config[i]||[]];s[e]={...s[e],...t},this._commit({...this._config,[i]:s})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-button-group-editor",Us);const js=new Set(["split","split-button","materia-split-button"]);class Bs extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},value:{type:String},_localValue:{state:!0},_optimisticValue:{state:!0},_optimisticEntities:{state:!0},_resolvedColorActive:{state:!0},_resolvedColorOnActive:{state:!0}};static getConfigElement(){return document.createElement("materia-button-group-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("input_select.")||e.startsWith("select."))||"";return{entity:t,size:"m",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}]}}static styles=[Ae,zs,pi];setConfig(e){this.config={size:"m",...e}}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const e=this.hass?.states[this.config.entity],t=this.config.entity?.split(".")[0];return"input_select"!==t&&"select"!==t||!e?.attributes?.options?[]:e.attributes.options.map(e=>({label:this._capitalize(e),value:e,tap_action:{action:"perform-action",perform_action:`${t}.select_option`,data:{option:e},target:{entity_id:this.config.entity}}}))}get _activeValue(){if(!this.config?.entity)return this._localValue??String(this.value??"");if(null!=this._optimisticValue)return this._optimisticValue;const e=this.hass?.states[this.config.entity];return this.config.attribute?String(e?.attributes?.[this.config.attribute]??""):e?.state??""}_truthy(e){const t=String(e??"").toLowerCase();return""!==t&&!["off","closed","idle","standby","unavailable","unknown","not_home","false","0","none","auto_off"].includes(t)}_entityOptionActive(e){const t=e.entity,i=this._optimisticEntities?.[t],s=this.hass?.states[t]?.state;if(null!=e.value&&""!==e.value){const t=String(e.value).toLowerCase();return i&&null!=i.value?i.value===t:String(s??"").toLowerCase()===t}return i&&null!=i.active?i.active:this._truthy(s)}_tplTruthy(e){if("boolean"==typeof e)return e;const t=String(e??"").trim().toLowerCase();return["true","on","yes","1","open","home","active"].includes(t)}_isOptionActive(e,t){if(null!=e.active)return this._isTemplate(e.active)?this._tplTruthy(this._tplResults?.[`optActive${t}`]):this._tplTruthy(e.active);if(e.entity)return this._entityOptionActive(e);if(this.config.multi_select){const t=this._activeValue.split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);return t.includes(String(e.value).toLowerCase())}return String(e.value)===this._activeValue}_getActiveColors(){const e=this._resolvedColorActive||this.config.color_active,t=this._resolvedColorOnActive||this.config.color_on_active;return e&&t?{active:e,onActive:t}:this.config.preset&&Ss[this.config.preset]?Ss[this.config.preset]:Ss.secondary}_renderStandard(){const e=this.config.gap??8,t=this.config.padding??4,i=this.config.size||"m";return I`
      <ha-card>
        <div class="row" style="gap: ${e}px; padding: ${t}px 0;">
          ${(this.config.buttons||[]).map(e=>{const t=js.has(e.type)||Array.isArray(e.options)&&e.options.length>0,{size:s,type:a,...n}=e,o={variant:"filled",...n,size:i};return t?I`<materia-split-button .hass=${this.hass} .config=${o}></materia-split-button>`:I`<materia-button .hass=${this.hass} .config=${o}></materia-button>`})}
        </div>
      </ha-card>
    `}render(){if(!this.hass||!this.config)return I``;if("standard"===this.config.group)return this._renderStandard();const e=this.config.entity?this.hass.states[this.config.entity]:void 0,t=!!e&&this._isUnavailable(e),i=this.config.size||"m",{height:s,innerCorner:a}=Ts[i]||Ts.m,n=s/2;this._activeValue;const o=this._getActiveColors(),r=this._resolvedOptions,l=this.config.variant||"tonal";if(!r.length)return I``;const c=this.config.multi_select,d=this.config.columns||0;return I`
      <ha-card>
        <div class="group ${t?"unavailable":""} ${c?"multi":""}"
          style="${c?`--btn-height: ${s}px;`:`height: ${s}px;`} ${d?`--btn-columns: ${d};`:""}">
          ${r.map((e,t)=>{const i=this._isOptionActive(e,t),s=0===t,d=t===r.length-1,h="square"===this.config.active_shape,p=h?a:n;let u;if(c)u=`${i?p:n}px`;else{const e=i?`${p}px`:`${a}px`,t=i&&h?`${p}px`:`${n}px`;u=1===r.length?t:s?`${t} ${e} ${e} ${t}`:d?`${e} ${t} ${t} ${e}`:e}const m=i?o.active:void 0,g=i?o.onActive:void 0;return I`
              <button
                class="${i?"active":"inactive"} ${l}"
                style="--rest-radius: ${u}; --pressed-radius: ${a}px; border-radius: var(--rest-radius);${i?` background: ${m}; color: ${g};`:""}"
                @click=${()=>this._handleOptionTap(e)}
              >
                ${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}
                ${e.label?I`<span>${e.label}</span>`:""}
              </button>
            `})}
        </div>
      </ha-card>
    `}_handleOptionTap(e){if(!this.config.entity&&!e.entity&&!e.tap_action){const t=String(e.value);if(this.config.multi_select){const e=this._activeValue.split(",").map(e=>e.trim()).filter(Boolean),i=e.findIndex(e=>e.toLowerCase()===t.toLowerCase());i>=0?e.splice(i,1):e.push(t),this._localValue=e.join(",")}else this._localValue=t;return this._fireHaptic("selection"),void this.dispatchEvent(new CustomEvent("option-selected",{detail:{value:this._localValue,option:e},bubbles:!0,composed:!0}))}if(this._fireHaptic("selection"),e.entity){const t=e.entity,i=String(this.hass?.states[t]?.state??""),s=null!=e.value&&""!==e.value?{baseline:i,value:String(e.value).toLowerCase()}:{baseline:i,active:!this._truthy(i)};this._optimisticEntities={...this._optimisticEntities,[t]:s},this._optEntityTimers=this._optEntityTimers||{},clearTimeout(this._optEntityTimers[t]),this._optEntityTimers[t]=setTimeout(()=>{const{[t]:e,...i}=this._optimisticEntities||{};this._optimisticEntities=i},1e4)}else if(!this.config.multi_select){const t=this.hass?.states[this.config.entity];this._optimisticBaseline=this.config.attribute?String(t?.attributes?.[this.config.attribute]??""):String(t?.state??""),this._optimisticValue=String(e.value),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}e.tap_action?this._handleAction(e.entity?{entity:e.entity,...e.tap_action}:e.tap_action):e.entity?this._fireMoreInfo(e.entity):this.config.entity&&this._fireMoreInfo(this.config.entity)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._optimisticTimer);for(const e of Object.values(this._optEntityTimers||{}))clearTimeout(e)}updated(e){if(e.has("hass")&&this.hass&&(this._resolveField("color_active","_resolvedColorActive"),this._resolveField("color_on_active","_resolvedColorOnActive"),this._resolvedOptions.forEach((e,t)=>{null!=e.active&&this._resolveTemplateValue(`optActive${t}`,e.active)})),e.has("hass")&&null!=this._optimisticValue){const e=this.hass?.states[this.config.entity],t=this.config.attribute?String(e?.attributes?.[this.config.attribute]??""):String(e?.state??"");(t.toLowerCase()===this._optimisticValue.toLowerCase()||null!=this._optimisticBaseline&&t!==this._optimisticBaseline)&&(this._optimisticValue=null,this._optimisticBaseline=null,clearTimeout(this._optimisticTimer))}if(e.has("hass")&&this._optimisticEntities){let e=!1;const t={...this._optimisticEntities};for(const[i,s]of Object.entries(t)){const a=String(this.hass?.states[i]?.state??"");(null!=s.baseline&&a!==s.baseline||(null!=s.value?a.toLowerCase()===s.value:this._truthy(a)===s.active))&&(delete t[i],clearTimeout(this._optEntityTimers?.[i]),e=!0)}e&&(this._optimisticEntities=t)}}getCardSize(){return 1}}customElements.define("materia-button-group",Bs),window.customCards=window.customCards||[],window.customCards.push({type:"materia-button-group",name:"Materia Button Group",description:"M3 button group — connected (segmented, entity-driven) or standard (a spaced row of buttons).",preview:!0});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is={},Hs=2,Ws=e=>(...t)=>({_$litDirective$:e,values:t});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Vs=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gs=(e,t)=>{const i=e._$AN;if(void 0===i)return!1;for(const e of i)e._$AO?.(t,!1),Gs(e,t);return!0},Xs=e=>{let t,i;do{if(void 0===(t=e._$AM))break;i=t._$AN,i.delete(e),e=t}while(0===i?.size)},Ys=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),Js(t)}};function Ks(e){void 0!==this._$AN?(Xs(this),this._$AM=e,Ys(this)):this._$AM=e}function Zs(e,t=!1,i=0){const s=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(t)if(Array.isArray(s))for(let e=i;e<s.length;e++)Gs(s[e],!1),Xs(s[e]);else null!=s&&(Gs(s,!1),Xs(s));else Gs(this,e)}const Js=e=>{e.type==Hs&&(e._$AP??=Zs,e._$AQ??=Ks)};class Qs extends Vs{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),Ys(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Gs(this,e),Xs(this))}setValue(e){if((e=>void 0===e.strings)(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const ea=new WeakMap,ta=Ws(class extends Qs{render(e){return V}update(e,[t]){const i=t!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),V}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let i=ea.get(t);void 0===i&&(i=new WeakMap,ea.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?ea.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class ia extends We{static properties={_expandedButton:{state:!0},_expandedOption:{state:!0}};static styles=[We.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expandedButton??=null}_formData(){return{gap:8,padding:4,...this._config}}get _sections(){return[{title:"Layout",icon:"mdi:tune",fields:[]}]}_renderExtra(){const e=this._config.buttons||[];return I`
      <div class="section-header">
        <span>Buttons</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveButton(e,t),e.map((e,t)=>I`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(t)}>
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${e.icon&&!Ue(e.icon)?e.icon:`Button ${t+1}`}${e.options?.length?" · split":""}</span>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._toggleButton(t)}}>
                <ha-icon icon=${this._expandedButton===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._removeButton(t)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===t?I`
                  <div class="button-body">
                    <materia-button-editor
                      .hass=${this.hass}
                      ${ta(i=>{i&&i.__materiaIdx!==t&&(i.__materiaIdx=t,i.setConfig(e))})}
                      @config-changed=${e=>{e.stopPropagation(),this._buttonChanged(t,e.detail.config)}}
                    ></materia-button-editor>

                    <div class="opt-header">
                      <span>Menu options <span class="hint">(adding one makes a split button)</span></span>
                      <ha-icon-button @click=${e=>{e.stopPropagation(),this._addOption(t)}}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                      </ha-icon-button>
                    </div>
                    ${e.options?.length?I`<ha-form
                          .hass=${this.hass}
                          .data=${{menu_position:e.menu_position||"bottom-right"}}
                          .schema=${[{name:"menu_position",label:"Menu alignment",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"Below · right-aligned"},{value:"bottom-left",label:"Below · left-aligned"},{value:"top-right",label:"Above · right-aligned"},{value:"top-left",label:"Above · left-aligned"}]}}}]}
                          .computeLabel=${De}
                          @value-changed=${i=>this._buttonChanged(t,{...e,menu_position:i.detail.value.menu_position})}
                        ></ha-form>`:""}
                    ${qe((e,i)=>this._moveOption(t,e,i),(e.options||[]).map((e,i)=>I`
                          <div class="opt-card">
                            <div class="opt-row">
                              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                              <span>${e.label||(e.icon&&!Ue(e.icon)?e.icon:`Option ${i+1}`)}</span>
                              <ha-icon-button @click=${()=>this._toggleOption(i)}>
                                <ha-icon icon=${this._expandedOption===i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                              </ha-icon-button>
                              <ha-icon-button @click=${()=>this._removeOption(t,i)}>
                                <ha-icon icon="mdi:delete"></ha-icon>
                              </ha-icon-button>
                            </div>
                            ${this._expandedOption===i?I`
                                  <div class="opt-body">
                                    <ha-form
                                      .hass=${this.hass}
                                      .data=${e}
                                      .schema=${this._optionSchema(e)}
                                      .computeLabel=${De}
                                      @value-changed=${e=>this._optionChanged(t,i,e.detail.value)}
                                    ></ha-form>
                                  </div>
                                `:""}
                          </div>
                        `))}
                  </div>
                `:""}
          </div>
        `))}
    `}_moveButton(e,t){const i=[...this._config.buttons||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expandedButton=null,this._commit({...this._config,buttons:i})}_toggleButton(e){this._expandedButton=this._expandedButton===e?null:e}_addButton(){const e=[...this._config.buttons||[],{icon:"mdi:star",variant:"filled",size:"default"}];this._expandedButton=e.length-1,this._commit({...this._config,buttons:e})}_removeButton(e){const t=[...this._config.buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null),this._commit({...this._config,buttons:t})}_buttonChanged(e,t){const i=[...this._config.buttons||[]],s=i[e]?.options;i[e]=s&&!t.options?{...t,options:s}:t,this._commit({...this._config,buttons:i})}_optionSchema(e){return[Ue(e?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"Action",selector:{ui_action:{}}}]}_withButtonOptions(e,t){const i=[...this._config.buttons||[]],s={...i[e]},a=[...s.options||[]];t(a),a.length?s.options=a:delete s.options,i[e]=s,this._commit({...this._config,buttons:i})}_addOption(e){this._withButtonOptions(e,e=>{e.push({icon:"mdi:circle-outline"}),this._expandedOption=e.length-1})}_removeOption(e,t){this._expandedOption===t&&(this._expandedOption=null),this._withButtonOptions(e,e=>e.splice(t,1))}_moveOption(e,t,i){this._withButtonOptions(e,e=>{const[s]=e.splice(t,1);e.splice(i,0,s)}),this._expandedOption===t&&(this._expandedOption=i)}_optionChanged(e,t,i){this._withButtonOptions(e,e=>{e[t]={...e[t],...i}})}_toggleOption(e){this._expandedOption=this._expandedOption===e?null:e}}customElements.define("materia-icon-row-editor",ia);customElements.define("materia-icon-row",class extends Bs{static getConfigElement(){return document.createElement("materia-icon-row-editor")}setConfig(e){super.setConfig({...e,group:"standard"})}});const sa=[Ee,ze,Ae,ge,n`
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

    /* The OPEN button's tap receipt — a quick single turn of the SHAPE
       only, never the glyph, exactly like the continuous in-flight spin
       already never touches it. Animates the standalone rotate property,
       not transform, so it composes with whatever the pose is doing
       rather than fighting it. Always exactly one turn: no easing toward
       an aligned stop, since nothing ongoing is being tracked here.

       Vector shapes (cookie9, the default) already keep the icon as a
       SIBLING of the silhouette, not a child of it — spinning only
       .silhouette leaves the icon untouched for free, same guarantee the
       continuous spin relies on. The CSS-box squircle has no separate
       silhouette layer: the icon lives INSIDE the box that's turning, so
       it needs an equal, opposite spin of its own to cancel the box's
       rotation and stay upright. */
    .shape.vector.spin-once .silhouette {
      animation: ml-open-spin 0.6s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    .shape:not(.vector).spin-once {
      animation: ml-open-spin 0.6s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    .shape:not(.vector).spin-once ha-icon {
      animation: ml-open-spin-counter 0.6s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    @keyframes ml-open-spin {
      from {
        rotate: 0deg;
      }
      to {
        rotate: 360deg;
      }
    }

    @keyframes ml-open-spin-counter {
      from {
        rotate: 0deg;
      }
      to {
        rotate: -360deg;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .shape.spin-once,
      .shape.spin-once .silhouette,
      .shape.spin-once ha-icon {
        animation: none;
      }
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
       speed-up right as the bolt lands. The pose change is applied INSTANTLY
       here and simultaneously cancelled out of the spin variable by
       _compensatePoseTurn() in index.js — rotations of the same shape compose
       additively, so the total stays continuous and the state lands inside one
       unbroken deceleration. (The earlier claim that a bare 20-degree snap is
       imperceptible on a spinning shape was wrong: 20 degrees is HALF the
       cookie's symmetry period, the most visible jump it can make.) The
       transition comes back when the wind-down ends, so ordinary instant
       toggles keep their turn. */
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

    /* JAMMED: a fault, not a resting position — a short shake reads as
       "the mechanism tried and failed", distinct from working's steady
       breathe. Runs once (not looping): a jam that lingers on screen for
       minutes doesn't need to keep shaking at you. */
    .shape.jammed {
      animation: ml-jam-shake 0.5s ease-in-out 1;
    }

    @keyframes ml-jam-shake {
      0%, 100% { transform: rotate(0deg) translateX(0); }
      20% { transform: rotate(-4deg) translateX(-3px); }
      40% { transform: rotate(3deg) translateX(3px); }
      60% { transform: rotate(-2deg) translateX(-2px); }
      80% { transform: rotate(1deg) translateX(1px); }
    }

    @media (prefers-reduced-motion: reduce) {
      .shape.jammed {
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

    /* ---- the open button ---- */

    /* M3 Outlined Button, full width, square-ish shape (16px — noticeably
       LESS round than the gesture's own stadium track above it, so the two
       don't compete for the same "this is the primary control" reading).
       Disabled per M3's flat 38%-opacity convention while locked — opening
       only makes sense once the gesture has already unlocked the door. */
    .open-btn {
      width: 100%;
      height: 56px;
      border-radius: 16px;
      border: 1px solid color-mix(in srgb, var(--ml-fg) 40%, transparent);
      background: transparent;
      color: var(--ml-fg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.01em;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: opacity var(--md-sys-motion-fast-effects),
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .open-btn:disabled {
      opacity: 0.38;
      pointer-events: none;
      cursor: default;
    }

    .open-btn:hover:not(:disabled) {
      background: color-mix(in srgb, var(--ml-fg) 8%, transparent);
    }

    .open-btn:active:not(:disabled) {
      background: color-mix(in srgb, var(--ml-fg) 12%, transparent);
    }

    .open-btn ha-icon {
      --mdc-icon-size: 20px;
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
  `];class aa extends We{static styles=[We.styles,n`
      .remap-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
      }
      .remap-row ha-textfield {
        flex: 1;
        min-width: 0;
      }
      .remap-arrow {
        flex: none;
        opacity: 0.5;
        --mdc-icon-size: 18px;
      }
      .remap-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
      }
    `];_formData(){return{gesture:"slide",shape:!0,shape_style:"cookie9",initial_locked:!0,unlock_service:"unlock",...this._config}}_sectionsSignature(){return`${this._config?.gesture||"slide"}|${this._config?.entity?.split(".")[0]||""}|${this._config?.open_action?"o":""}`}get _sections(){const e="hold"===this._config?.gesture,t=!!this._config?.entity,i=!!this._config?.entity?.startsWith("lock."),s=!!this._config?.open_action;return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",label:"Lock (optional)",helper:"Leave empty to run self-contained — the card keeps its own state, with nothing to control.",selector:{entity:{domain:["lock","switch","input_boolean"]}}},...i?[{name:"unlock_service",label:"Unlatch service",helper:'Open is for strikes/relays that don\'t stay meaningfully "unlocked" — the door swings rather than sitting unlatched (lock.open instead of lock.unlock). Locking always uses lock.lock.',selector:{select:{mode:"dropdown",options:[{value:"unlock",label:"Unlock (lock.unlock)"},{value:"open",label:"Open (lock.open)"}]}}}]:[],{name:"gesture",label:"Commit gesture",selector:{select:{mode:"dropdown",options:[{value:"slide",label:"Slide the handle across"},{value:"hold",label:"Press and hold"}]}}},{name:"shape",label:"Show the morphing lock shape",selector:{boolean:{}}}]},{title:"Open button",icon:"mdi:door-open",expanded:s,fields:[{name:"open_action",label:"Open action",helper:"A separate, extra action available ONLY once unlocked (a relay pulse, a multi-step let-them-in sequence) — never a substitute for the gesture above, and disabled entirely while locked. Leave empty to hide the button.",selector:{ui_action:{default_action:"none"}}},...s?[{name:"open_button_icon",label:'Icon (default "door-open")',selector:{icon:{}}},{name:"open_button_label",label:'Label (default "Open")',selector:{text:{}}}]:[]]},{title:"Behaviour",icon:"mdi:cog-outline",fields:[...e?[{name:"hold_ms",label:"Hold for (ms, default 800)",helper:"Keep this above 500ms — the platform long-press timeout — or an ordinary long-press commits by accident.",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}}]:[],...t?[{name:"locked_state",label:"State that means locked",helper:'Defaults to "locked" for a lock and "off" for a switch — a relay strike is energised to release the door.',selector:{text:{}}},{name:"pending_timeout_ms",label:"Give up waiting for the lock after (ms, default 10000)",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}}]:[{name:"initial_locked",label:"Start out locked",selector:{boolean:{}}}]]},{title:"Labels",icon:"mdi:text-short",fields:[...e?[{name:"unlock_hold_hint",label:'While locked (default "Hold to unlock")',selector:{text:{}}},{name:"lock_hold_hint",label:'While unlocked (default "Hold to lock")',selector:{text:{}}}]:[{name:"unlock_hint",label:'While locked (default "Slide to unlock")',selector:{text:{}}},{name:"lock_hint",label:'While unlocked (default "Slide to lock")',selector:{text:{}}}],...t?[{name:"locking_label",label:'While locking (default "Locking…")',selector:{text:{}}},{name:"unlocking_label",label:'While unlocking (default "Unlocking…")',selector:{text:{}}},{name:"jammed_label",label:'When jammed (default "Jammed — check the door")',selector:{text:{}}}]:[{name:"demo_label",label:'Self-contained note (default "Demo · no entity")',selector:{text:{}}}]]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"unlocked_color",label:"Background while unlocked",color:!0,selector:{text:{}}},{name:"unlocked_color_on",label:"Text while unlocked",color:!0,selector:{text:{}}},{name:"locked_color",label:"Background while locked",color:!0,selector:{text:{}}},{name:"locked_color_on",label:"Text while locked",color:!0,selector:{text:{}}},{name:"accent",label:"Accent (locked glyph and handle)",color:!0,selector:{text:{}}},{name:"accent_on",label:"Ink on the accent",color:!0,selector:{text:{}}},{name:"locked_icon",label:"Icon while locked",selector:{icon:{}}},{name:"unlocked_icon",label:"Icon while unlocked",selector:{icon:{}}},...t?[{name:"open_icon",label:'Icon while literally open (default "door-open")',helper:"Rides on top of the unlocked colour, never its own — only the glyph changes.",selector:{icon:{}}},{name:"jammed_color",label:"Background while jammed (default error container)",color:!0,selector:{text:{}}},{name:"jammed_color_on",label:"Text while jammed",color:!0,selector:{text:{}}},{name:"jammed_icon",label:'Icon while jammed (default "warning")',selector:{icon:{}}}]:[]]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Tapping the shape",selector:{ui_action:{default_action:"more-info"}}}]}]}get _showRemapList(){return!!this._config?.entity}_remapEntries(){const e=this._config?.state_remap||{};return Object.entries(e).map(([e,t])=>({from:e,to:t}))}_commitRemap(e){const t={};for(const i of e)i.from&&(t[i.from]=i.to??"");this._commit({...this._config,state_remap:t})}_addRemap(){this._commitRemap([...this._remapEntries(),{from:"",to:""}])}_removeRemap(e){const t=[...this._remapEntries()];t.splice(e,1),this._commitRemap(t)}_updateRemapFrom(e,t){const i=[...this._remapEntries()];i[e]={...i[e],from:t},this._commitRemap(i)}_updateRemapTo(e,t){const i=[...this._remapEntries()];i[e]={...i[e],to:t},this._commitRemap(i)}_renderExtra(){if(!this._showRemapList)return"";const e=this._remapEntries();return I`
      <div class="options-header" style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-weight:600;font-size:14px;">
        <span>State skips</span>
        <ha-icon-button @click=${this._addRemap}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="remap-note">
        Treat one reported entity state as another, before anything else
        reads it — for hardware that reports a real but misleading
        transition (e.g. a relatch settling reported as "unlocking" seconds
        after a door that was never locked). Example: from "unlocking" to
        "unlocked".
      </div>
      ${e.map((e,t)=>I`
          <div class="remap-row">
            <ha-textfield
              label="From (raw state)"
              .value=${e.from}
              @change=${e=>this._updateRemapFrom(t,e.target.value)}
            ></ha-textfield>
            <ha-icon class="remap-arrow" icon="mdi:arrow-right"></ha-icon>
            <ha-textfield
              label="To"
              .value=${e.to}
              @change=${e=>this._updateRemapTo(t,e.target.value)}
            ></ha-textfield>
            <ha-icon-button @click=${()=>this._removeRemap(t)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `)}
    `}}customElements.define("materia-lock-editor",aa);const na={squircle:{vector:!1,rot:45},cookie9:{vector:!0,rot:20,path:()=>rt(90,90,86,9)},pill:{vector:!0,rot:45,path:()=>function(e,t,i,s=0){return ut(e,t,i,{points:[{x:.961,y:.039,r:.426},{x:1.001,y:.428,r:0},{x:1,y:.609,r:1}],reps:2,mirroring:!0,rotate:s})}(90,90,172)},gem:{vector:!0,rot:90,path:()=>function(e,t,i,s=0){return ut(e,t,i,{points:[{x:.499,y:1.023,r:.241},{x:-.005,y:.792,r:.208},{x:.073,y:.258,r:.228},{x:.433,y:-0,r:.491}],reps:1,mirroring:!0,rotate:s})}(90,90,172)}};class oa extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_pending:{state:!0},_local:{state:!0},_spinning:{state:!0},_openSpin:{state:!0},_openPending:{state:!0}};static styles=sa;static getConfigElement(){return document.createElement("materia-lock-editor")}static getStubConfig(){return{gesture:"slide"}}setConfig(e){this.config={gesture:"slide",...e}}constructor(){super(),this._pending=null,this._local=null,this._openSpin=!1,this._openPending=!1}get _stateObj(){return this.config?.entity?this.hass?.states[this.config.entity]:null}get _selfContained(){return!this.config?.entity}get _rawState(){const e=String(this._stateObj?.state??""),t=this.config?.state_remap||{};return Object.prototype.hasOwnProperty.call(t,e)?t[e]:e}get _effectiveState(){return Wi(this._rawState,this._lastFamily,this._lockedState)}get _lockedState(){if(this.config.locked_state)return String(this.config.locked_state);const e=this.config.entity?.split(".")[0];return"switch"===e||"input_boolean"===e?"off":"locked"}get _entityLocked(){const e=this._stateObj;return!e||this._isUnavailable(e)?null:this._effectiveState===this._lockedState}get _locked(){if(this._selfContained)return this._local??!1!==this.config.initial_locked;const e=this._stateObj;return!e||this._isUnavailable(e)?this._local??!0:"unlocking"===this._effectiveState||this._effectiveState===this._lockedState}get _transitioning(){if(this._selfContained)return null;const e=this._effectiveState;return"locking"===e||"unlocking"===e||"jammed"===e?e:null!=this._pending?this._pending?"locking":"unlocking":null}updated(e){if(e.has("hass")&&(null!=this._pending&&this._entityLocked===this._pending&&(this._pending=null,clearTimeout(this._pendingTimer)),!this._selfContained)){const e=this._effectiveState;Vi(e)||(this._lastFamily=e===this._lockedState?"locked":"unlocked"),!this._openPending||"open"!==e&&"opening"!==e||(this._openPending=!1,clearTimeout(this._openPendingTimer))}this._compensatePoseTurn(),this._syncSpin()}_compensatePoseTurn(){const e=!this._locked,t=this._lastPose;if(this._lastPose=e,void 0===t||t===e)return;if(!this._spinning||!this._spins)return;const i=this._shapeStyle.rot;if(this._spinDeg=(this._spinDeg??0)+(e?-i:i),this._applySpin(),"stop"===this._spinMode){const e=Math.min(1,(performance.now()-this._stopT0)/this._stopDur),t=2*(this._stopTo-this._stopFrom)*(1-e)/(this._stopDur/1e3);this._planStop(this._spinDeg,Math.max(t,8))}}get _shapeStyle(){return na[this.config.shape_style]??na.cookie9}get _spins(){const e=this._shapeStyle;return e.vector&&2*e.rot<=45&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches}get _inFlight(){const e=this._transitioning;return"locking"===e||"unlocking"===e}_syncSpin(){this._inFlight&&this._spins?this._spinUp():this._spinDown()}_spinUp(){if("ramp"===this._spinMode||"cruise"===this._spinMode)return;const e="stop"===this._spinMode;if(this._spinMode="ramp",this._spinning=!0,this._spinDeg=this._spinDeg??0,this._spinVel=e?0:this._spinVel??0,this._spinRaf)return;let t=performance.now();const i=e=>{const s=Math.min(.05,(e-t)/1e3);if(t=e,"ramp"===this._spinMode)this._spinVel=Math.min(40,this._spinVel+80*s),this._spinVel>=40&&(this._spinMode="cruise"),this._spinDeg+=this._spinVel*s;else if("cruise"===this._spinMode)this._spinDeg+=40*s;else{if("stop"!==this._spinMode)return void(this._spinRaf=null);{const t=Math.min(1,(e-this._stopT0)/this._stopDur),i=1-(1-t)*(1-t);if(this._spinDeg=this._stopFrom+(this._stopTo-this._stopFrom)*i,t>=1)return this._spinDeg=this._stopTo%360,this._applySpin(),this._spinMode=null,this._spinVel=0,this._spinning=!1,void(this._spinRaf=null)}}this._applySpin(),this._spinRaf=requestAnimationFrame(i)};this._spinRaf=requestAnimationFrame(i)}_spinDown(){"ramp"!==this._spinMode&&"cruise"!==this._spinMode||this._planStop(this._spinDeg??0,Math.max(this._spinVel??40,8))}_planStop(e,t){const i=2*this._shapeStyle.rot,s=.55*t/2;let a=Math.ceil((e+s)/i)*i;2*(a-e)/t>2.6&&(a=e+s),this._stopFrom=e,this._stopTo=a,this._stopDur=2*(a-e)/t*1e3,this._stopT0=performance.now(),this._spinMode="stop"}_applySpin(){const e=this.shadowRoot?.querySelector(".shape");e?.style.setProperty("--ml-spin",(this._spinDeg%360).toFixed(2)+"deg")}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._pendingTimer),clearTimeout(this._openSpinTimer),clearTimeout(this._openPendingTimer),this._spinRaf&&cancelAnimationFrame(this._spinRaf),this._spinRaf=null,this._spinMode=null}_spinOpenShape(){clearTimeout(this._openSpinTimer),this._openSpin=!1,requestAnimationFrame(()=>{this._openSpin=!0,this._openSpinTimer=setTimeout(()=>{this._openSpin=!1},650)})}_confirm(){const e=!this._locked;if(this._selfContained)return void(this._local=e);this._pending=e,clearTimeout(this._pendingTimer),this._pendingTimer=setTimeout(()=>{this._pending=null},this.config.pending_timeout_ms??1e4);const t=this.config.entity,i=t.split(".")[0];if("lock"===i){Hi.publish(t,e?"locking":"unlocking",this._stateObj?.state);const i="open"===this.config.unlock_service?"open":"unlock";this._callService("lock",e?"lock":i,{entity_id:t})}else{const s="off"===this._lockedState,a=e?!s:s;this._callService(i,a?"turn_on":"turn_off",{entity_id:t})}}_openTap(){!this._locked&&this.config.open_action&&(this._spinOpenShape(),this._selfContained||(this._openPending=!0,clearTimeout(this._openPendingTimer),this._openPendingTimer=setTimeout(()=>{this._openPending=!1},this.config.pending_timeout_ms??1e4),Hi.publish(this.config.entity,"open",this._stateObj?.state)),this._handleAction(this.config.open_action))}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(this.config.entity&&!e)return I`<ha-card><div class="body">
        <div class="pending">${$e("entity_not_found_with_id",this.hass,{entity:this.config.entity})}</div>
      </div></ha-card>`;const t=!!e&&this._isUnavailable(e),i=this._locked,s=this._transitioning,a="locking"===s||"unlocking"===s,n="jammed"===s,o=n?this.config.jammed_color??"var(--md-sys-color-error-container)":i?this.config.locked_color??"var(--md-sys-color-surface-container-low, var(--card-background-color))":this.config.unlocked_color??"var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))",r=n?this.config.jammed_color_on??"var(--md-sys-color-on-error-container)":i?this.config.locked_color_on??"var(--md-sys-color-on-surface)":this.config.unlocked_color_on??"var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))",l=this.config.accent??"var(--md-sys-color-primary)",c=this.config.accent_on??"var(--md-sys-color-on-primary)",d=n?o:i?`color-mix(in srgb, ${r} 12%, transparent)`:r,h=n?r:i?l:o,p=n?r:i?l:r,u=n?o:i?c:o,m=!this._selfContained&&(this._openPending||"open"===this._effectiveState||"opening"===this._effectiveState),g=n?this.config.jammed_icon??"m3o:warning":m?this.config.open_icon??"m3o:door-open":i?this.config.locked_icon??"m3o:lock":this.config.unlocked_icon??"m3o:lock-open-right",f=this._shapeStyle,_=i?this.config.unlock_hint??$e("lock_slide_to_unlock",this.hass):this.config.lock_hint??$e("lock_slide_to_lock",this.hass),b=i?this.config.unlock_hold_hint??$e("lock_hold_to_unlock",this.hass):this.config.lock_hold_hint??$e("lock_hold_to_lock",this.hass),v="hold"===this.config.gesture;return I`
      <ha-card
        class=${t?"unavailable":""}
        style="--ml-bg:${o};--ml-fg:${r};--ml-shape-bg:${d};--ml-shape-fg:${h};--ml-handle-bg:${p};--ml-handle-fg:${u};"
      >
        <div class="body">
          ${!1===this.config.shape?V:I`<div
                class="shape-wrap"
                @click=${()=>this._handleAction(this.config.tap_action||(this.config.entity?{action:"more-info",entity:this.config.entity}:{action:"none"}))}
              >
                <div
                  class="shape ${i?"":"unlocked"} ${n?"jammed":""} ${f.vector?"vector":""} ${a&&!this._spins?"working":""} ${this._spinning?"spinning":""} ${this._openSpin?"spin-once":""}"
                  style="--ml-rot:${f.rot}deg"
                >
                  ${f.vector?I`<svg class="silhouette" viewBox="0 0 180 180" aria-hidden="true">
                        ${H`<path d=${f.path()} />`}
                      </svg>`:V}
                  <ha-icon .icon=${g}></ha-icon>
                </div>
              </div>`}

          <materia-drag-confirm
            .gesture=${v?"hold":"slide"}
            .label=${a?"locking"===s?this.config.locking_label??$e("lock_locking",this.hass):this.config.unlocking_label??$e("lock_unlocking",this.hass):v?b:_}
            .pending=${a}
            .direction=${i?"forward":"backward"}
            .threshold=${this.config.threshold??.55}
            .holdMs=${this.config.hold_ms??800}
            ?disabled=${t}
            @confirm=${this._confirm}
          ></materia-drag-confirm>

          ${this.config.open_action?I`
                <button
                  class="open-btn"
                  ?disabled=${i||t}
                  @click=${this._openTap}
                >
                  <ha-icon .icon=${this.config.open_button_icon??"m3o:door-open"}></ha-icon>
                  <span>${this.config.open_button_label??$e("lock_open_button",this.hass)}</span>
                </button>
              `:V}

          ${n?I`<div class="pending">
                ${this.config.jammed_label??$e("lock_jammed_hint",this.hass)}
              </div>`:this._selfContained?I`<div class="demo-note">
                ${this.config.demo_label??$e("lock_demo_note",this.hass)}
              </div>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 5}}customElements.define("materia-lock",oa),window.customCards=window.customCards||[],window.customCards.push({type:"materia-lock",name:"Materia Lock",description:"Lock shape that morphs square→circle, with a drag-to-confirm or hold-to-confirm gesture. Works with no entity.",preview:!0});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ra=Ws(class extends Vs{constructor(){super(...arguments),this.key=V}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(((e,t=Is)=>{e._$AH=t})(e),this.key=t),i}}),la=[Ee,ze,Ae,ge,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .sheet {
      border-radius: 32px 32px 14px 32px;
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--md-sys-color-on-surface);
      padding: clamp(14px, 4cqi, 20px);
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3.6cqi, 18px);
      overflow: hidden;
    }

    /* Browser Mod already supplies the dialog surface, padding and title.
       A second card-coloured slab inside it creates a conspicuous seam in dark
       mode and repeats the dialog heading. Popup presentation therefore keeps
       only the picker's controls; inline/manager cards retain their own skin. */
    .sheet.manager-editor {
      padding: 0 clamp(16px, 4cqi, 24px) clamp(16px, 4cqi, 24px);
      border-radius: 0;
      background: transparent;
    }

    .manager-editor .eyebrow {
      display: none;
    }

    /* ---- multi-schedule manager ----------------------------------- */

    .manager {
      gap: 14px;
    }

    .manager-head {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .manager-head > div,
    .schedule-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .manager-title {
      font-family: var(--materia-font-display, inherit);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .manager-sub,
    .schedule-sub {
      font-size: 13px;
      color: var(--md-sys-color-on-surface-variant, currentColor);
      opacity: 0.76;
    }

    .manager-add {
      min-width: 48px;
      height: 48px;
      padding: 0 18px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      font-weight: 700;
    }

    .manager-add ha-icon {
      --mdc-icon-size: 20px;
      flex: 0 0 20px;
    }

    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .schedule-row {
      min-height: 72px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px 6px 16px;
      border-radius: 24px;
      background: var(--md-sys-color-surface-container, rgba(0, 0, 0, 0.05));
    }

    .schedule-main {
      flex: 1;
      min-width: 0;
      min-height: 56px;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
      background: transparent;
    }

    .schedule-main > ha-icon:last-child {
      --mdc-icon-size: 20px;
      opacity: 0.62;
    }

    .schedule-name {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .schedule-toggle {
      position: relative;
      width: 52px;
      height: 32px;
      flex: none;
      box-sizing: border-box;
      border-radius: 16px;
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
    }

    .schedule-toggle i {
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
        height var(--md-sys-motion-expressive-fast-spatial);
    }

    .schedule-toggle.on {
      border-color: transparent;
      background: var(--md-sys-color-primary);
    }

    .schedule-toggle.on i {
      left: 24px;
      width: 24px;
      height: 24px;
      background: var(--md-sys-color-on-primary);
    }

    .manager-empty {
      min-height: 88px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-align: left;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container, rgba(0, 0, 0, 0.05));
    }

    .manager-empty > span {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .manager-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .manager-fields label,
    .manager-field {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .manager-fields label > span,
    .manager-field > span {
      padding-left: 4px;
      font-size: 12px;
      font-weight: 700;
      color: var(--md-sys-color-on-surface-variant, currentColor);
    }

    .target-field {
      min-height: 56px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
      border-radius: 20px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
      border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 28%, transparent);
      color: var(--md-sys-color-on-surface);
      font-size: 14px;
      text-align: left;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .target-field.open {
      border-radius: 20px 20px 8px 8px;
    }

    .target-field span {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .target-field ha-icon,
    .target-options ha-icon {
      --mdc-icon-size: 20px;
      flex: 0 0 auto;
    }

    .target-field .expand {
      transition: transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .target-field.open .expand { transform: rotate(180deg); }

    .target-options {
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 8px 8px 20px 20px;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.12));
      box-shadow: var(--md-sys-elevation-level2, 0 2px 6px rgba(0, 0, 0, 0.18));
    }

    .target-options button {
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
      border-radius: 14px;
      text-align: left;
      color: var(--md-sys-color-on-surface);
    }

    .target-options button span {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .target-options button.selected {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .target-check {
      width: 24px;
      height: 24px;
      display: grid;
      place-items: center;
      flex: 0 0 24px;
    }

    .manager-fields ha-selector {
      display: block;
      padding: 2px 10px;
      border-radius: 20px;
      overflow: hidden;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
      border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 28%, transparent);
    }

    @container (max-width: 420px) {
      .manager-fields {
        grid-template-columns: 1fr;
      }

      .manager-add span {
        display: none;
      }

      .manager-add {
        padding: 0;
        width: 48px;
      }
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


    /* The quick chips fold away while the calendar is open — the picker takes
       real space, and offering both at once made the sheet enormous. 0fr/1fr
       animates height without measuring; the inert attribute on the wrapper (set in the
       template) takes the hidden buttons out of tab order. Effects curve:
       a fold is occlusion, not movement, so nothing should overshoot. */
    .chips-wrap {
      display: grid;
      grid-template-rows: 1fr;
      transition: grid-template-rows var(--md-sys-motion-default-effects),
        opacity var(--md-sys-motion-fast-effects);
    }

    .chips-wrap.folded {
      grid-template-rows: 0fr;
      opacity: 0;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-height: 0;
      overflow: hidden;
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

    /* ---- window (start-stop), for a recurring on/off range ---- */

    .window {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Same shell as .custom — same rounded surface a fold unfolds inside of —
       just once per edge (start, stop) instead of once for the whole picker. */
    .win-edge {
      position: relative;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 24%, transparent);
      overflow: hidden;
    }

    .win-head {
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

    .win-head .lbl {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }

    .win-head .val,
    .native-time-input {
      font-family: var(--materia-font-display, inherit);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--md-sys-color-primary);
    }

    .win-head .chev {
      width: 24px;
      height: 24px;
      flex: none;
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .native-time-input {
      margin: 0;
      padding: 0;
      border: 0;
      width: 6.5em;
      min-width: 0;
      text-align: right;
      background: transparent;
      outline: none;
      cursor: pointer;
      color-scheme: light dark;
      accent-color: var(--md-sys-color-primary);
      -webkit-appearance: none;
      appearance: none;
    }

    .native-time-input::selection,
    .native-datetime-input::selection {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .native-time-input::-webkit-calendar-picker-indicator,
    .native-datetime-input::-webkit-calendar-picker-indicator,
    .native-time-input::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
    }

    .native-datetime-input {
      min-width: 0;
      max-width: min(48cqi, 18em);
      border: 0;
      padding: 8px 0;
      background: transparent;
      outline: none;
      color: var(--md-sys-color-primary);
      accent-color: var(--md-sys-color-primary);
      color-scheme: light dark;
      cursor: pointer;
      font: 700 16px/20px var(--materia-font-display, inherit);
      font-variant-numeric: tabular-nums;
      text-align: right;
      -webkit-appearance: none;
      appearance: none;
    }

    /* Non-normative affordance: a window whose stop <= start crosses midnight
       and round-trips exactly as entered — this badge only exists so that
       doesn't read as a mistake. Container pair, not an accent at partial
       alpha, per the rest of the library's filled-surface rule. */
    .overnight-badge {
      flex: none;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 10px;
      background: var(--md-sys-color-tertiary-container);
      color: var(--md-sys-color-on-tertiary-container);
    }

    .win-days {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 6px 0;
    }

    .win-days-label {
      font-size: 12px;
      font-weight: 600;
      opacity: 0.66;
    }

    /* A second timeslot on schedule_entity is refused rather than silently
       dropped on save — see _windowBlocked in index.js. Error container, the
       one place in this card an outcome is actually a stop, not a choice. */
    .window-blocked {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      border-radius: 24px;
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
    }

    .window-blocked ha-icon {
      --mdc-icon-size: 24px;
      flex: none;
    }

    .window-blocked .text {
      display: flex;
      flex-direction: column;
    }

    .window-blocked .n {
      font-size: 15px;
      font-weight: 700;
    }

    .window-blocked .s {
      font-size: 12px;
      opacity: 0.8;
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

    .remove {
      flex: 1;
      border-radius: 34px 12px 12px 34px;
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      font-size: 14px;
      font-weight: 700;
    }

    .remove + .cancel {
      border-radius: 12px;
    }

    .remove.armed {
      background: var(--md-sys-color-error);
      color: var(--md-sys-color-on-error);
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
  `];customElements.define("materia-schedule-editor",class extends We{_formData(){return{presentation:"inline",...this._config}}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"name",label:"Eyebrow above the chosen moment",helper:'What is being scheduled — e.g. "Start cleaning".',selector:{text:{}}},{name:"presentation",label:"Presentation",helper:"Sheet drops the collapsed strip and renders the picker directly — for putting the card inside a browser_mod popup.",selector:{select:{mode:"dropdown",options:[{value:"inline",label:"Inline — collapsed strip that expands"},{value:"sheet",label:"Sheet — always open, for a modal"},{value:"manager",label:"Manager — list, add and edit several schedules"}]}}},{name:"empty_label",label:"Strip title when nothing is set",selector:{text:{}}},{name:"empty_sub",label:"Strip sub-line when nothing is set",selector:{text:{}}}]},{title:"Wiring",icon:"mdi:transit-connection-variant",fields:[{name:"confirm_action",label:"On confirm",helper:"Use $datetime, $date, $time, $duration, $weekdays, $repeat, $trigger, $label in the data.",selector:{ui_action:{default_action:"none"}}},{name:"trigger_action",label:"On confirm, trigger tab",helper:"Falls back to the confirm action when unset.",selector:{ui_action:{default_action:"none"}}},{name:"close_action",label:"How to dismiss the modal",helper:"Sheet presentation only. Defaults to browser_mod.close_popup.",selector:{ui_action:{default_action:"none"}}}]},{title:"Shortcuts",icon:"mdi:clock-fast",fields:[{name:"presets",label:'The "At a time" shortcuts',helper:'List of { label, offset: 90m|2h|1d } or { label, at: "09:00", days: 1 } or { label, at, weekday: 6 }. Each may carry its own tap_action. Empty for the built-in six.',selector:{object:{}}},{name:"minutes",label:"Minute options (default 0, 15, 30, 45)",selector:{object:{}}}]},{title:"Window (start-stop)",icon:"mdi:clock-start",fields:[{name:"manage_schedules",label:"Manage multiple schedules",helper:"Shows a parent-friendly list and lets people add or edit Scheduler entries without exposing entity IDs or service names.",selector:{boolean:{}}},{name:"editor_presentation",label:"Open schedule editor",helper:"Popup keeps the dashboard compact. Requires Browser Mod; inline remains available as a dependency-free fallback.",selector:{select:{mode:"dropdown",options:[{value:"popup",label:"Popup"},{value:"inline",label:"Expand inline"}]}}},{name:"targets",label:"Devices and friendly actions",helper:"List of {entity, name, icon, actions:[{service,label,icon}]}. People may combine devices that share an action; matching schedules are discovered automatically.",selector:{object:{}}},{name:"schedule_entities",label:"Additional schedule entities",helper:"Optional explicit switch.schedule_* list, for schedules that cannot be discovered through their target device.",selector:{entity:{domain:"switch",multiple:!0}}},{name:"schedule_entity",label:"Scheduler entity",helper:"A switch.schedule_* entity (HACS Scheduler integration). Reads its current window/weekdays on open, writes back with scheduler.edit. Implies a start+stop window.",selector:{entity:{domain:"switch"}}},{name:"show_stop",label:"Start+stop window without a scheduler entity",helper:"For driving a custom confirm_action with $start/$stop/$weekdays/$actions instead of binding to Scheduler.",selector:{boolean:{}}},{name:"actions",label:"Timeslot actions",helper:'What the window turns on/off, e.g. [{service: "switch.turn_on", target: {entity_id: "switch.pool_pump"}}]. Only needed when schedule_entity has no existing timeslot to read the actions from, or to override it.',selector:{object:{}}}]},{title:"Triggers",icon:"mdi:sensors",fields:[{name:"show_triggers",label:'Show the "When…" tab',helper:"Disable this for a straightforward clock-only scheduler.",selector:{boolean:{}}},{name:"triggers",label:"Non-clock triggers",helper:"List of { key, name, sub, icon }. Leave empty for the built-in four.",selector:{object:{}}}]}]}});class ca extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_armed:{state:!0},_mode:{state:!0},_pick:{state:!0},_event:{state:!0},_viewY:{state:!0},_viewM:{state:!0},_date:{state:!0},_hour:{state:!0},_minute:{state:!0},_repeating:{state:!0},_days:{state:!0},_stopHour:{state:!0},_stopMinute:{state:!0},_multipleSlots:{state:!0},_resolvedPending:{state:!0},_resolvedNextLabel:{state:!0},_resolvedNextSub:{state:!0},_activeScheduleEntity:{state:!0},_targetEntity:{state:!0},_targetEntities:{state:!0},_targetAction:{state:!0},_removeArmed:{state:!0},_targetPickerOpen:{state:!0}};static styles=la;static getConfigElement(){return document.createElement("materia-schedule-editor")}static getStubConfig(){return{name:"Start cleaning"}}setConfig(e){this.config={presentation:"inline",default_mode:"clock",...e},this._modeTouched||(this._mode=this._modes[0]),this._isManagerEditor?(this._open=!0,this._activeScheduleEntity=e.schedule_entity||null,this._activeScheduleEntity?this._dirty=!1:this._targetEntities.length||(this._selectTarget(this._managerTargets[0]?.entity),this._days=[!0,!0,!0,!0,!0,!0,!0])):this._isManager&&!this._targetEntities.length&&this._selectTarget(this._managerTargets[0]?.entity)}get _isSheet(){return"sheet"===this.config.presentation||this._isManagerEditor}get _isManagerEditor(){return"manager-editor"===this.config.presentation}get _isSummary(){return"summary"===this.config.presentation}get _isManager(){return"manager"===this.config.presentation||!0===this.config.manage_schedules||Array.isArray(this.config.targets)}get _managerTargets(){return(this.config.targets||[]).map(e=>"string"==typeof e?{entity:e}:e).filter(e=>e?.entity)}get _scheduleEntity(){return this._activeScheduleEntity||this.config.schedule_entity||""}get _managedSchedules(){const e=new Set(this.config.schedule_entities||[]),t=new Set(this._managerTargets.map(e=>e.entity));return Object.values(this.hass?.states||{}).filter(e=>e.entity_id.startsWith("switch.schedule_")).filter(i=>e.has(i.entity_id)||(i.attributes.entities||[]).some(e=>t.has(e))).sort((e,t)=>String(e.attributes.next_trigger||"9999").localeCompare(String(t.attributes.next_trigger||"9999")))}_targetConfig(e=this._targetEntity){return this._managerTargets.find(t=>t.entity===e)||null}_targetName(e=this._targetEntity){return this._targetConfig(e)?.name||this.hass?.states?.[e]?.attributes?.friendly_name||e||$e("sched_choose_device",this.hass)}_targetActions(e=this._targetEntity){const t=this._targetConfig(e)?.actions;if(t?.length)return t.map(e=>"string"==typeof e?{service:e}:e);const i=String(e||"switch.unknown").split(".")[0];return[{service:`${i}.turn_on`,label:$e("state_on",this.hass),icon:"m3o:power-settings-new"},{service:`${i}.turn_off`,label:$e("state_off",this.hass),icon:"m3o:power-off"}]}get _selectedTargets(){return this._targetEntities?.length?this._targetEntities:this._targetEntity?[this._targetEntity]:[]}_commonTargetActions(e=this._selectedTargets){if(!e.length)return[];return this._targetActions(e[0]).filter(t=>e.every(e=>this._targetActions(e).some(e=>e.service===t.service)))}_targetSelectionName(e=this._selectedTargets){return e.length?e.map(e=>this._targetName(e)).join(" + "):$e("sched_choose_device",this.hass)}_actionName(e=this._targetAction,t=this._targetEntity){const i=this._targetActions(t).find(t=>t.service===e);return i?.label||(String(e).endsWith("turn_off")?$e("state_off",this.hass):$e("state_on",this.hass))}_selectTarget(e){this._selectTargets(e?[e]:[])}_selectTargets(e){const t=Array.isArray(e)?e:e?[e]:[],i=new Set(this._managerTargets.map(e=>e.entity)),s=[...new Set(t)].filter(e=>i.has(e));this._targetEntities=s,this._targetEntity=s[0]||null;const a=this._commonTargetActions(s);a.some(e=>e.service===this._targetAction)||(this._targetAction=a[0]?.service||null),this._dirty=!0}_tpl(e,t){const i=this.config[e];if(null==i)return null;const s=this._isTemplate(i)?this[t]:i,a=null==s?"":String(s).trim();return a.length?a:null}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("pending","_resolvedPending"),this._resolveField("next_label","_resolvedNextLabel"),this._resolveField("next_sub","_resolvedNextSub"),(this.config.schedules||[]).forEach((e,t)=>{null!=e.label&&this._resolveTemplateValue(`schedLabel${t}`,e.label)}),this._scheduleEntity&&!this._dirty&&this._seedFromEntity()),this.toggleAttribute("sheet",this._isSheet)}constructor(){super();const e=new Date;this._open=!1,this._armed=null,this._mode="clock",this._pick=null,this._event=null,this._viewY=e.getFullYear(),this._viewM=e.getMonth(),this._date=e.getDate(),this._hour=9,this._minute=0,this._repeating=!1,this._days=[!0,!0,!0,!0,!0,!1,!1],this._stopHour=10,this._stopMinute=0,this._multipleSlots=!1,this._activeScheduleEntity=null,this._targetEntity=null,this._targetEntities=[],this._targetAction=null,this._removeArmed=!1,this._entityActions=null,this._dirty=!1}get _pickKey(){return this._pick}get _hasSelection(){return this._isWindow?!this._windowBlocked&&this._days.some(Boolean)&&(!this._isManager||this._selectedTargets.length>0&&!!this._targetAction):"event"===this._mode?null!=this._event:null!=this._pick}get _isWindow(){return"clock"===this._mode&&(this._isManager||!0===this.config.show_stop||!!this._scheduleEntity)}get _windowBlocked(){return this._isWindow&&this._multipleSlots}get _windowOvernight(){return 60*this._stopHour+this._stopMinute<=60*this._hour+this._minute}get _windowLabel(){return`${this._pad(this._hour)}:${this._pad(this._minute)} → ${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}`}get _windowDaysSummary(){if(this._days.every(Boolean))return $e("sched_window_daily",this.hass);if(!this._days.some(Boolean))return $e("sched_window_pick_days",this.hass);const e=new Intl.DateTimeFormat(this._lang,{weekday:"short"});return this._days.map((t,i)=>t?e.format(new Date(2024,0,1+i)):null).filter(Boolean).join(", ")}get _windowSub(){return this._windowOvernight?`${this._windowDaysSummary} · ${$e("sched_window_overnight",this.hass)}`:this._windowDaysSummary}_seedFromEntity(){const e=this._scheduleEntity;if(!e)return;const t=this.hass?.states[e];if(!t)return;const i=t.attributes.timeslots||[];if(this._multipleSlots=i.length>1,this._entityActions=t.attributes.actions??null,this._isManager){const e=new Set(this._managerTargets.map(e=>e.entity)),i=[...new Set(t.attributes.entities||[])].filter(t=>e.has(t));this._targetEntities=i,this._targetEntity=i[0]||null;const s=(t.attributes.actions||[]).map(e=>e?.service).filter(Boolean),a=s.length&&s.every(e=>e===s[0])?s[0]:null,n=this._commonTargetActions(i);this._targetAction=n.some(e=>e.service===a)?a:n[0]?.service||null}const s=i[0],a=s&&/^(\d{1,2}):(\d{2})(?::\d{2})?\s*-\s*(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(String(s).trim());a&&(this._hour=Number(a[1]),this._minute=Number(a[2]),this._stopHour=Number(a[3]),this._stopMinute=Number(a[4]));const n=(t.attributes.weekdays||[]).map(e=>String(e).toLowerCase());if(n.includes("daily"))this._days=[!0,!0,!0,!0,!0,!0,!0];else if(n.length){const e=["mon","tue","wed","thu","fri","sat","sun"];this._days=e.map(e=>n.includes(e))}}get _isWired(){return!!(this.config.confirm_action||this.config.trigger_action||this._scheduleEntity||this._isManager||(this.config.presets??[]).some(e=>e.tap_action)||(this.config.triggers??[]).some(e=>e.tap_action))}get _pending(){const e=this.config.pending;if(!e)return null;const t=this._isTemplate(e)?this._resolvedPending:e,i=null==t?"":String(t).trim();return i.length?i:null}get _modes(){if(this._isManager)return["clock"];const e=[];return!1!==this.config.show_time&&e.push("clock"),!1!==this.config.show_triggers&&e.push("event"),e.length||e.push("clock"),"event"===this.config.default_mode&&e.includes("event")?["event",...e.filter(e=>"event"!==e)]:e}get _lang(){return this.hass?.locale?.language||void 0}_pad(e){return String(e).padStart(2,"0")}_hhmm(e){return`${this._pad(e.getHours())}:${this._pad(e.getMinutes())}`}_localDateTimeValue(e){return`${e.getFullYear()}-${this._pad(e.getMonth()+1)}-${this._pad(e.getDate())}T${this._hhmm(e)}`}get _nativeDateTimeValue(){return"custom"===this._pick?this._localDateTimeValue(new Date(this._viewY,this._viewM,this._date,this._hour,this._minute)):this._localDateTimeValue(this._quick.find(e=>e.key===this._pickKey)?.when??new Date(Date.now()+36e5))}_setNativeDateTime(e){const t=String(e.currentTarget.value||""),i=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(t);i&&(this._viewY=Number(i[1]),this._viewM=Number(i[2])-1,this._date=Number(i[3]),this._hour=Number(i[4]),this._minute=Number(i[5]),this._pick="custom")}_dayTime(e){return`${new Intl.DateTimeFormat(this._lang,{weekday:"short"}).format(e)} ${this._hhmm(e)}`}get _defaultPresets(){return[{label:$e("sched_preset_1h",this.hass),offset:"1h"},{label:$e("sched_preset_4h",this.hass),offset:"4h"},{label:$e("sched_preset_tonight",this.hass),at:"23:00"},{label:$e("sched_preset_tomorrow",this.hass),at:"09:00",days:1,grow:1.4},{label:$e("sched_preset_noon",this.hass),at:"12:00"},{label:$e("sched_preset_saturday",this.hass),at:"10:00",weekday:6,grow:1.4}]}_resolvePreset(e,t){if(e.offset){const i=/^(\d+(?:\.\d+)?)\s*(m|h|d)$/i.exec(String(e.offset).trim());if(!i)return null;const s={m:6e4,h:36e5,d:864e5}[i[2].toLowerCase()];return new Date(t.getTime()+parseFloat(i[1])*s)}const i=/^(\d{1,2}):(\d{2})$/.exec(String(e.at??"").trim());if(!i)return null;const[s,a]=[Number(i[1]),Number(i[2])],n=new Date(t);if(n.setSeconds(0,0),n.setHours(s,a),null!=e.weekday){let i=(Number(e.weekday)%7-t.getDay()+7)%7;return 0===i&&n<=t&&(i=7),n.setDate(n.getDate()+i),n}return null!=e.days?(n.setDate(n.getDate()+Number(e.days)),n):(n<=t&&n.setDate(n.getDate()+1),n)}get _quick(){const e=new Date;return(this.config.presets??this._defaultPresets).map((t,i)=>{const s=this._resolvePreset(t,e);if(!s)return null;const a=s.toDateString()===e.toDateString();return{key:t.key??`p${i}`,name:t.label??"—",at:a?this._hhmm(s):this._dayTime(s),grow:t.grow??1,when:s,tap_action:t.tap_action}}).filter(Boolean)}get _defaultTriggers(){return[{key:"leave",label:$e("sched_trigger_leave",this.hass),secondary:$e("sched_trigger_leave_sub",this.hass),icon:"m3o:directions-walk"},{key:"empty",label:$e("sched_trigger_empty",this.hass),secondary:$e("sched_trigger_empty_sub",this.hass),icon:"m3o:person-off"},{key:"night",label:$e("sched_trigger_night",this.hass),secondary:$e("sched_trigger_night_sub",this.hass),icon:"m3o:bedtime"},{key:"sunset",label:$e("sched_trigger_sunset",this.hass),secondary:$e("sched_trigger_sunset_sub",this.hass),icon:"m3o:wb-twilight"}]}get _events(){return(this.config.triggers??this._defaultTriggers).map((e,t)=>({key:e.key??`t${t}`,name:e.label??e.name??"—",sub:e.secondary??e.sub??"",icon:e.icon??"m3o:sensors",tap_action:e.tap_action}))}get _describe(){if("event"===this._mode){const e=this._events.find(e=>e.key===this._event);return e?{head:e.name,sub:`${e.sub} · trigger`}:{head:$e("sched_pick_trigger",this.hass),sub:$e("sched_runs_whenever",this.hass)}}if(this._isWindow)return this._windowBlocked?{head:$e("sched_multi_slots_head",this.hass),sub:$e("sched_multi_slots_sub",this.hass)}:{head:this._windowLabel,sub:this._windowSub};if("custom"===this._pick){const e=new Intl.DateTimeFormat(this._lang,{day:"numeric",month:"long"}).format(new Date(this._viewY,this._viewM,this._date));return{head:`${this._pad(this._hour)}:${this._pad(this._minute)}`,sub:e}}const e=this._quick.find(e=>e.key===this._pickKey);return e?{head:e.at,sub:e.name}:{head:$e("sched_when_question",this.hass),sub:$e("sched_pick_moment",this.hass)}}get _dayNames(){const e=new Intl.DateTimeFormat(this._lang,{weekday:"narrow"});return Array.from({length:7},(t,i)=>e.format(new Date(2024,0,1+i)))}get _tabConfig(){const e={clock:{label:this.config.time_tab_label??$e("sched_at_a_time",this.hass),value:"clock",icon:"m3o:schedule"},event:{label:this.config.trigger_tab_label??$e("sched_when_ellipsis",this.hass),value:"event",icon:"m3o:sensors"}};return{size:"m",preset:"primary",options:this._modes.map(t=>e[t])}}get _weekdayConfig(){return{size:"s",preset:"primary",multi_select:!0,active_shape:"square",options:this._dayNames.map((e,t)=>({label:e,value:String(t)}))}}get _resolvedWhen(){return"event"===this._mode?null:"custom"===this._pickKey?new Date(this._viewY,this._viewM,this._date,this._hour,this._minute,0,0):this._quick.find(e=>e.key===this._pickKey)?.when??null}_actionContext(){const e=this._resolvedWhen,t=e=>String(e).padStart(2,"0");let i="",s="",a="",n="";if(e){s=`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`,a=`${t(e.getHours())}:${t(e.getMinutes())}`,i=`${s} ${a}:00`;const o=Math.max(0,Math.round((e.getTime()-Date.now())/1e3));n=`${t(Math.floor(o/3600))}:${t(Math.floor(o%3600/60))}:${t(o%60)}`}return{datetime:i,date:s,time:a,duration:n,weekdays:this._repeating?["mon","tue","wed","thu","fri","sat","sun"].filter((e,t)=>this._days[t]):[],repeat:!!this._repeating,trigger:this._event??"",label:this._describe.head}}_fill(e,t){if("string"==typeof e){const i=/^\$(\w+)$/.exec(e.trim());return i&&i[1]in t?t[i[1]]:e.replace(/\$(\w+)/g,(e,i)=>i in t?String(t[i]):e)}return Array.isArray(e)?e.map(e=>this._fill(e,t)):e&&"object"==typeof e?Object.fromEntries(Object.entries(e).map(([e,i])=>[e,this._fill(i,t)])):e}_dismiss(){if(this._open=!1,this._dirty=!1,!this._isSheet)return;const e=this.config.close_action??{action:"fire-dom-event",browser_mod:{service:"browser_mod.close_popup",data:{}}};this._handleAction(e)}_commit(){if(!this._hasSelection)return;if(this._isWindow)return this._commitWindow();this._armed={...this._describe,repeating:this._repeating,mode:this._mode},this._open=!1;const e="event"===this._mode?this._events.find(e=>e.key===this._event):this._quick.find(e=>e.key===this._pickKey),t=e?.tap_action??("event"===this._mode?this.config.trigger_action:null)??this.config.confirm_action;t?this._handleAction(this._fill(t,this._actionContext())):this._fireHaptic("success"),this._isSheet&&this._dismiss()}_windowActionContext(){const e=`${this._pad(this._hour)}:${this._pad(this._minute)}`,t=`${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}`,i=this._days.every(Boolean)?["daily"]:["mon","tue","wed","thu","fri","sat","sun"].filter((e,t)=>this._days[t]);return{start:e,stop:t,weekdays:i,actions:this._isManager?this._selectedTargets.map(e=>({service:this._targetAction,entity_id:e})):this.config.actions??this._entityActions??[],entity:this._scheduleEntity,name:`${this._targetSelectionName()} · ${this._windowLabel}`,label:this._windowLabel}}_defaultWindowAction(){if(!this._scheduleEntity&&!this._isManager)return null;const e=!!this._scheduleEntity;return{action:"perform-action",perform_action:e?"scheduler.edit":"scheduler.add",data:{...e?{entity_id:"$entity"}:{},weekdays:"$weekdays",repeat_type:"repeat",...e?{}:{name:"$name"},timeslots:[{start:"$start",stop:"$stop",actions:"$actions"}]}}}_commitWindow(){if(this._windowBlocked)return;this._armed={head:this._windowLabel,sub:this._windowDaysSummary,repeating:!0,mode:"window"},this._open=!1,this._dirty=!1;const e=this.config.confirm_action??this._defaultWindowAction();e?this._handleAction(this._fill(e,this._windowActionContext())):this._fireHaptic("success"),this._isManager&&(this._activeScheduleEntity=null),this._isSheet&&this._dismiss()}_renderStrip(){const e=this._armed,t=e?e.head:this.config.empty_label??$e("sched_not_scheduled",this.hass),i=e?e.sub:this.config.empty_sub??$e("sched_tap_to_pick",this.hass),s=e?"event"===e.mode?"m3o:sensors":"m3o:alarm":"m3o:add";return I`
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
            >${this.config.clear_label??$e("sched_clear",this.hass)}</button>`:V}
      </div>
    `}_openNewSchedule(){"popup"!==this.config.editor_presentation?(this._activeScheduleEntity=null,this._selectTarget(this._managerTargets[0]?.entity),this._hour=9,this._minute=0,this._stopHour=10,this._stopMinute=0,this._days=[!0,!0,!0,!0,!0,!0,!0],this._multipleSlots=!1,this._removeArmed=!1,this._dirty=!0,this._open=!0):this._openManagerPopup()}_openSchedule(e){"popup"!==this.config.editor_presentation?(this._activeScheduleEntity=e.entity_id,this._dirty=!1,this._removeArmed=!1,this._seedFromEntity(),this._open=!0):this._openManagerPopup(e.entity_id)}_openManagerPopup(e=null){const t={...this.config,type:"custom:materia-schedule",presentation:"manager-editor",editor_presentation:"inline"};delete t.grid_options,delete t.visibility,e?t.schedule_entity=e:delete t.schedule_entity,this._handleAction({action:"fire-dom-event",browser_mod:{service:"browser_mod.popup",data:{title:$e(e?"sched_edit":"sched_new",this.hass),dismissable:!0,size:"normal",content:t,popup_styles:[{style:"all",styles:"ha-dialog { --mdc-dialog-max-width: 640px; --mdc-dialog-min-width: min(92vw, 420px); --mdc-dialog-max-height: 88vh; } .content .container { padding: 0 !important; overflow: auto !important; }"}]}}})}_formatNext(e){const t=e.attributes.next_trigger;if(!t)return"on"===e.state?$e("sched_enabled",this.hass):$e("sched_disabled",this.hass);const i=new Date(t);return Number.isNaN(i.getTime())?String(t):new Intl.DateTimeFormat(this._lang,{weekday:"short",hour:"2-digit",minute:"2-digit"}).format(i)}_renderManager(){const e=this._managedSchedules;return I`<ha-card><div class="sheet manager">
      <div class="manager-head">
        <div>
          <span class="manager-title">${this.config.name??$e("sched_name_default",this.hass)}</span>
          <span class="manager-sub">${$e("sched_manager_sub",this.hass)}</span>
        </div>
        <button class="manager-add" @click=${this._openNewSchedule}>
          <ha-icon icon="mdi:plus"></ha-icon><span>${$e("sched_add_short",this.hass)}</span>
        </button>
      </div>
      <div class="schedule-list">
        ${e.length?e.map(e=>{const t=e.attributes.entities||[],i=t[0],s=(e.attributes.actions||[])[0]?.service,a=(e.attributes.timeslots||[])[0]||"";return I`<div class="schedule-row">
            <button class="schedule-main" @click=${()=>this._openSchedule(e)}>
              <ha-icon icon=${t.length>1?"m3o:devices":this._targetConfig(i)?.icon??"m3o:schedule"}></ha-icon>
              <span class="schedule-text">
                <span class="schedule-name">${this._targetSelectionName(t)} · ${this._actionName(s,i)}</span>
                <span class="schedule-sub">${a} · ${this._formatNext(e)}</span>
              </span>
              <ha-icon icon="m3o:edit"></ha-icon>
            </button>
            <button
              class="schedule-toggle ${"on"===e.state?"on":""}"
              role="switch"
              aria-checked=${"on"===e.state?"true":"false"}
              aria-label=${"on"===e.state?$e("sched_disable",this.hass):$e("sched_enable",this.hass)}
              @click=${()=>this.hass.callService("switch","on"===e.state?"turn_off":"turn_on",{},{entity_id:e.entity_id})}
            ><i></i></button>
          </div>`}):I`<button class="manager-empty" @click=${this._openNewSchedule}>
          <ha-icon icon="m3o:add-alarm"></ha-icon>
          <span><b>${$e("sched_empty_head",this.hass)}</b>${$e("sched_empty_sub",this.hass)}</span>
        </button>`}
      </div>
    </div></ha-card>`}_renderManagerFields(){const e=this._commonTargetActions().map(e=>({value:e.service,label:e.label||this._actionName(e.service)})),t=this._selectedTargets,i=t.length?this._targetSelectionName(t):$e("sched_choose_device",this.hass);return I`<div class="manager-fields">
      <div class="manager-field"><span>${$e("sched_devices",this.hass)}</span>
        <button
          class="target-field ${this._targetPickerOpen?"open":""}"
          aria-haspopup="listbox"
          aria-expanded=${this._targetPickerOpen?"true":"false"}
          @click=${()=>{this._targetPickerOpen=!this._targetPickerOpen}}
        >
          <ha-icon icon=${1===t.length?this._targetConfig(t[0])?.icon||"m3o:toggle-on":"m3o:devices"}></ha-icon>
          <span>${i}</span>
          <ha-icon class="expand" icon="m3o:expand-more"></ha-icon>
        </button>
        ${this._targetPickerOpen?I`<div class="target-options" role="listbox" aria-multiselectable="true">
          ${this._managerTargets.map(e=>{const i=t.includes(e.entity);return I`<button
              class=${i?"selected":""}
              role="option"
              aria-selected=${i?"true":"false"}
              @click=${()=>this._selectTargets(i?t.filter(t=>t!==e.entity):[...t,e.entity])}
            >
              <ha-icon icon=${e.icon||"m3o:toggle-on"}></ha-icon>
              <span>${this._targetName(e.entity)}</span>
              <i class="target-check">${i?I`<ha-icon icon="m3o:check"></ha-icon>`:V}</i>
            </button>`})}
        </div>`:V}
      </div>
      <label><span>${$e("sched_action",this.hass)}</span>
        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{mode:"dropdown",options:e}}}
          .value=${this._targetAction||""}
          @value-changed=${e=>{this._targetAction=e.detail.value,this._dirty=!0}}
        ></ha-selector>
      </label>
    </div>`}_removeSchedule(){if(this._scheduleEntity){if(!this._removeArmed)return this._removeArmed=!0,void this._fireHaptic("warning");this.hass.callService("scheduler","remove",{entity_id:this._scheduleEntity}),this._activeScheduleEntity=null,this._removeArmed=!1,this._open=!1,this._isManagerEditor&&this._dismiss()}}render(){if(!this.config)return I``;if(this._isManager&&!this._open&&!this._isManagerEditor)return this._renderManager();if(this._isSummary)return this._renderSummary();if(!this._open&&!this._isSheet)return I`<ha-card><div class="sheet">${this._renderStrip()}</div></ha-card>`;const e=this._pending,t=this._describe,i="clock"===this._mode;return I`
      <ha-card>
        <div class="sheet ${this._isManagerEditor?"manager-editor":""}">
          <div class="echo">
            <span class="eyebrow">${this._isManager?this._scheduleEntity?$e("sched_edit",this.hass):$e("sched_new",this.hass):this.config.name??$e("sched_name_default",this.hass)}</span>
            ${(()=>{const i=this._hasSelection?t.head:e??t.head,s=this._hasSelection?t.sub:e?this.config.pending_sub??$e("sched_pending_sub",this.hass):t.sub;return I`
                ${ra(i,I`<span class="headline swap">${i}</span>`)}
                ${ra(s,I`<span class="subline swap">${s}</span>`)}
              `})()}
          </div>

          ${this._isManager?this._renderManagerFields():V}

          ${this._modes.length>1?I`<materia-button-group
                .hass=${this.hass}
                .value=${this._mode}
                .config=${this._tabConfig}
                @option-selected=${e=>{this._modeTouched=!0,this._mode=e.detail.value}}
              ></materia-button-group>`:V}

          ${e?I`<div class="strip pending-strip">
                <div class="glyph"><ha-icon icon="m3o:alarm"></ha-icon></div>
                <div class="text">
                  <span class="head">${this.config.pending_label??$e("sched_scheduled",this.hass)}</span>
                  <span class="sub">
                    ${this.config.pending_sub??$e("sched_pending_sub",this.hass)}
                  </span>
                </div>
                <button
                  class="strip-cancel"
                  @click=${()=>{const e=this.config.clear_action;e?this._handleAction(e):this._fireHaptic("success"),this._dismiss()}}
                >${this.config.clear_label??$e("sched_clear",this.hass)}</button>
              </div>`:V}

          ${i?this._isWindow?this._renderWindow():this._renderClock():this._renderTriggers()}

          <!-- A window is always recurring — it carries its own weekday chips
               inside _renderWindow() — so the generic once/weekly switch below
               is for the classic single-moment picker and the trigger tab only. -->
          ${this._isWindow?V:I`
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
                    <span class="n">${this.config.repeat_label??$e("sched_repeat_weekly",this.hass)}</span>
                    <!-- The off line says what HAPPENS, not what does not: "back to
                         normal" named a state that does not exist, so it explained
                         nothing. The on line points at the weekday chips that appear
                         directly below rather than describing them in the abstract,
                         which would just restate what is already on screen. -->
                    <span class="s">${this._repeating?this.config.repeat_sub_on??$e("sched_repeat_sub_on",this.hass):this.config.repeat_sub_off??$e("sched_repeat_sub_off",this.hass)}</span>
                  </div>
                </div>

                ${this._repeating?I`<materia-button-group
                      class="days rise"
                      .hass=${this.hass}
                      .value=${this._days.map((e,t)=>e?String(t):null).filter(Boolean).join(",")}
                      .config=${this._weekdayConfig}
                      @option-selected=${e=>{const t=new Set(String(e.detail.value).split(",").filter(e=>""!==e));this._days=this._days.map((e,i)=>t.has(String(i)))}}
                    ></materia-button-group>`:V}
              `}

          <div class="actions">
            ${this._isManager&&this._scheduleEntity?I`<button class="remove ${this._removeArmed?"armed":""}" @click=${this._removeSchedule}>
                  ${this._removeArmed?$e("sched_delete_confirm",this.hass):$e("sched_delete",this.hass)}
                </button>`:V}
            <button class="cancel" @click=${this._dismiss}>
              ${this.config.close_label??$e("sched_close",this.hass)}
            </button>
            <button
              class="confirm"
              ?disabled=${!this._hasSelection}
              @click=${this._commit}
            >
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._isWindow||this._repeating?$e("sched_save_schedule",this.hass):$e("sched_set_timer",this.hass)}</span>
            </button>
          </div>

          ${this._isWired?V:I`<div class="mock">${$e("sched_mocked_note",this.hass)}</div>`}
        </div>
      </ha-card>
    `}_renderSummary(){const e=this._tpl("next_label","_resolvedNextLabel"),t=this._tpl("next_sub","_resolvedNextSub"),i=(this.config.schedules||[]).filter((e,t)=>{if(null==e.label)return!0;const i=this._isTemplate(e.label)?this._tplResults?.[`schedLabel${t}`]:e.label;return String(i??"").trim().length>0});return I`
      <ha-card>
        <div class="summary">
          ${e?I`<div class="strip armed">
                <div class="glyph"><ha-icon icon=${this.config.next_icon??"m3o:alarm"}></ha-icon></div>
                <div class="text">
                  <span class="head">${e}</span>
                  ${t?I`<span class="sub">${t}</span>`:V}
                </div>
                ${this.config.skip_action?I`<button
                      class="strip-cancel"
                      @click=${()=>this._handleAction(this.config.skip_action)}
                    >${this.config.skip_label??$e("sched_skip",this.hass)}</button>`:V}
              </div>`:V}

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
                      aria-label=${this.config.add_label??$e("sched_add",this.hass)}
                      @click=${()=>this._handleAction(this.config.add_action)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor"
                          stroke-width="2.2" stroke-linecap="round" />
                      </svg>
                    </button>`:V}
              </div>`:V}
        </div>
      </ha-card>
    `}_renderClock(){return I`
      <div class="chips-wrap">
      <div class="chips">
        ${this._quick.map((e,t)=>I`<button
            class="quick ${this._pick===e.key?"on":""}"
            style="flex-grow:${e.grow}"
            @click=${()=>{this._pick=e.key}}
          >
            <span class="n">${e.name}</span><span class="t">${e.at}</span>
          </button>`)}
      </div>
      </div>

      <div class="custom native-datetime">
        <div class="custom-head" @click=${this._showNativeTimePicker}>
          <ha-icon icon="m3o:event"></ha-icon>
          <span class="lbl">${$e("sched_pick_date_time",this.hass)}</span>
          <input
            class="native-datetime-input"
            type="datetime-local"
            required
            step="60"
            aria-label=${$e("sched_pick_date_time",this.hass)}
            min=${this._localDateTimeValue(new Date)}
            .value=${this._nativeDateTimeValue}
            @input=${this._setNativeDateTime}
          />
        </div>
      </div>
    `}_showNativeTimePicker(e){const t=e.currentTarget.querySelector("input[type='time'], input[type='datetime-local']");if(t&&!e.composedPath().includes(t)){t.focus();try{t.showPicker?.()}catch(e){}}}_renderWindow(){return this._windowBlocked?I`
        <div class="window-blocked">
          <ha-icon icon="m3o:calendar-view-day"></ha-icon>
          <div class="text">
            <span class="n">${$e("sched_multi_slots_head",this.hass)}</span>
            <span class="s">${$e("sched_multi_slots_sub",this.hass)}</span>
          </div>
        </div>
      `:I`
      <div class="window">
        <div class="win-edge native-time">
          <div class="win-head" @click=${this._showNativeTimePicker}>
            <span class="lbl">${$e("sched_window_start",this.hass)}</span>
            <input
              class="native-time-input"
              type="time"
              required
              step="60"
              aria-label=${$e("sched_window_start",this.hass)}
              .value=${`${this._pad(this._hour)}:${this._pad(this._minute)}`}
              @input=${e=>{const[t,i]=String(e.currentTarget.value||"").split(":").map(Number);Number.isFinite(t)&&Number.isFinite(i)&&(this._hour=t,this._minute=i,this._dirty=!0)}}
            />
          </div>
        </div>

        <div class="win-edge native-time">
          <div class="win-head" @click=${this._showNativeTimePicker}>
            <span class="lbl">${$e("sched_window_stop",this.hass)}</span>
            <!-- Non-normative: crossing midnight round-trips exactly as entered,
                 this is only here so the reversed order doesn't read as a mistake. -->
            ${this._windowOvernight?I`<span class="overnight-badge">${$e("sched_window_overnight",this.hass)}</span>`:V}
            <input
              class="native-time-input"
              type="time"
              required
              step="60"
              aria-label=${$e("sched_window_stop",this.hass)}
              .value=${`${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}`}
              @input=${e=>{const[t,i]=String(e.currentTarget.value||"").split(":").map(Number);Number.isFinite(t)&&Number.isFinite(i)&&(this._stopHour=t,this._stopMinute=i,this._dirty=!0)}}
            />
          </div>
        </div>

        <div class="win-days">
          <span class="win-days-label">${$e("sched_window_days",this.hass)}</span>
          <materia-button-group
            class="days"
            .hass=${this.hass}
            .value=${this._days.map((e,t)=>e?String(t):null).filter(Boolean).join(",")}
            .config=${this._weekdayConfig}
            @option-selected=${e=>{const t=new Set(String(e.detail.value).split(",").filter(e=>""!==e));this._days=this._days.map((e,i)=>t.has(String(i))),this._dirty=!0}}
          ></materia-button-group>
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
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return this._open||this._isSheet?10:2}}customElements.define("materia-schedule",ca),window.customCards=window.customCards||[],window.customCards.push({type:"materia-schedule",name:"Materia Schedule",description:"Shortcuts-first schedule picker — quick chips, non-clock triggers, and a calendar that stays folded until asked for. Mocked, no backend.",preview:!0});const da=[Ui,n`
    /* The head row: the glyph and the decision, side by side. */
    .head {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    /* The route glyph: a per-option stroke path on the design's 48x34 grid,
       drawn in currentColor so it always sits on the block legibly.
       pathLength normalises EVERY route to 100 user units, which is what lets
       one draw-on duration read the same whether the glyph is a single line
       (Fast) or eight crossing strokes (Ultra) — see _drawRoute in index.js. */
    .route {
      width: clamp(52px, 16cqi, 68px);
      height: clamp(36px, 11cqi, 48px);
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .route path {
      stroke-dasharray: 100;
    }

    .gicon {
      --mdc-icon-size: clamp(32px, 10cqi, 44px);
      flex: none;
    }

    :host([variant="sidekick"]) .route {
      width: clamp(38px, 11cqi, 46px);
      height: clamp(26px, 8cqi, 32px);
    }

    :host([variant="sidekick"]) .gicon {
      --mdc-icon-size: clamp(26px, 8cqi, 32px);
    }

    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* The shell's .title carries a top margin for the eyebrow above it; here
       the eyebrow sits in the head row, so the title starts flush. */
    .head .title {
      margin-top: 0;
      font-size: clamp(22px, 6.8cqi, 28px);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    :host([variant="sidekick"]) .head .title {
      font-size: clamp(18px, 5.5cqi, 22px);
    }

    /* One line of consequence — what picking this option actually does.
       Two lines are RESERVED even when the text needs one: options have
       different sentence lengths, and without the reservation every tap
       resized the card and shoved the rest of the page up or down. */
    .blurb {
      font-size: clamp(12px, 3.6cqi, 13px);
      line-height: 1.45;
      opacity: 0.72;
      text-wrap: pretty;
      min-height: 2.9em;
    }

    /* The option pills live INSIDE the block: choosing is part of the same
       object as the explanation. */
    .pills {
      display: flex;
      gap: 3px;
      /* Real separation from the text above. The blurb reserves two lines, and
         on wide screens its unused second line LOOKED like a gap — on narrow
         screens the sentence wraps into both lines and the text sat flush
         against the pills. Spacing must not depend on leftover reservation. */
      margin-top: clamp(10px, 3.2cqi, 14px);
      /* Never squeezed below their own labels: a select with six or seven
         options scrolls rather than shrinking to unreadable slivers. */
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .pills::-webkit-scrollbar {
      display: none;
    }

    .pill {
      flex: 1 1 auto;
      min-width: max-content;
      height: 52px;
      padding: 0 14px;
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
      white-space: nowrap;
      -webkit-tap-highlight-color: transparent;
      /* CONNECTED-GROUP physics: selection is not just a recolour — the chosen
         segment EARNS WIDTH and its neighbours yield, animated on the same
         expressive spatial beat as the radius morph. This is M3E's connected
         button group interaction, and it is what makes the row read as one
         object reacting rather than four buttons taking turns. */
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    :host([variant="sidekick"]) .pill {
      /* The 40px small-button rung — 44 was on no scale (see chips). */
      height: 40px;
    }

    /* Selected inverts against the hero's coloured container — the pair can
       never disagree with the theme, because both come from the block. */
    .pill.on {
      background: var(--mh-fg);
      color: var(--mh-bg);
      /* CornerMedium (12dp), the small rung's square shape. */
      border-radius: 12px;
      flex-grow: 1.6;
    }

    /* On the SIDEKICK's neutral surface an ink-inverse fill would be a content
       role used as a container (a black blob in light mode). These pills are a
       single-select toggle set, so TonalButtonTokens' toggle pair applies:
       selected = SOLID secondary, unselected = secondary-container. Selection
       must be the emphatic step of the family — stopping at the container tone
       for both made the chosen option read as the faded one. */
    :host([variant="sidekick"]) .pill {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    :host([variant="sidekick"]) .pill.on {
      background: var(--md-sys-color-secondary);
      color: var(--md-sys-color-on-secondary);
    }

    .pill:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `];class ha extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
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
      .option-header .glyph-note {
        flex: none;
        font-size: 11px;
        opacity: 0.6;
      }
      .option-body {
        padding: 12px;
      }
      .drag-handle {
        cursor: grab;
        --mdc-icon-size: 18px;
        opacity: 0.5;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{variant:"hero",burst:!0,alert_tints_hero:!0,...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:["select","input_select"]}}},{name:"name",label:"Eyebrow above the option name",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"Emphasis",helper:"Hero is the filled statement block; sidekick is its quiet companion for pages that already have a hero.",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"Hero — filled, owns the panel"},{value:"sidekick",label:"Sidekick — quiet peer of the bars"}]}}},..."sidekick"===this._config?.variant?[]:[{name:"burst",label:"Show the decorative shape",selector:{boolean:{}}}],{name:"color",label:"Block background",color:!0,selector:{text:{}}},{name:"color_on",label:"Block text",color:!0,selector:{text:{}}}]},{title:"Alerts",icon:"mdi:alert-circle-outline",expanded:!1,fields:[{name:"alerts",label:"Alert strip",helper:"List of { entity?, state?, text (template), icon?, color?, tap_action? }. First match wins. A template that renders empty means no alert.",selector:{object:{}}},{name:"alert_tints_hero",label:"An alert recolours the whole block",selector:{boolean:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}get _optionSchema(){return[{name:"label",label:"Name (the big title when chosen)",selector:{text:{}}},{name:"short",label:"Pill label (defaults to the name)",selector:{text:{}}},{name:"value",label:"Select option value",selector:{text:{}}},{name:"secondary",label:"One line of consequence",selector:{text:{}}},{name:"icon",label:"Icon (shown when there is no route glyph)",selector:{icon:{}}},{name:"tap_action",label:"Action (overrides selecting the option)",selector:{ui_action:{}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveOption(e,t),(this._config.options||[]).map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||`Option ${t+1}`}</span>
                ${e.glyph?I`<span class="glyph-note">route glyph (YAML)</span>`:""}
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
                        .computeLabel=${De}
                        @value-changed=${e=>this._updateOptionForm(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_addOption(){const e=[...this._config.options||[],{label:"",value:""}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_updateOptionForm(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}}customElements.define("materia-select-hero-editor",ha);class pa extends(rs(hi(ji(Te(ce))))){static properties={hass:{attribute:!1},config:{state:!0}};static styles=[da,pi];static getConfigElement(){return document.createElement("materia-select-hero-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("select.")||e.startsWith("input_select."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("Materia Select Hero: entity is required");this.config={...e}}get _stateObj(){return this.hass?.states[this.config.entity]}_optimisticActual(){const e=this._stateObj;return e?String(e.state):null}get _current(){return String(this._optimistic??"")}get _options(){if(this.config.options?.length)return this.config.options;const e=this._stateObj;return(e?.attributes?.options||[]).map(e=>({value:e,label:this._capitalize(String(e).replace(/_/g," "))}))}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveAlertTemplates(),this._optimisticReconcile());const t=this._current;t!==this._drawnFor&&(this._drawnFor=t,this._drawRoute())}_drawRoute(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=this.shadowRoot?.querySelector(".route path");e?.animate?.([{strokeDashoffset:100},{strokeDashoffset:0}],{duration:620,easing:"cubic-bezier(0.2, 0, 0, 1)"})}_select(e){if(this._fireHaptic("selection"),null!=e.value&&this._optimisticSet(e.value),e.tap_action)return void this._handleAction(e.tap_action);const t=this.config.entity.split(".")[0];"select"!==t&&"input_select"!==t||this._callService(t,"select_option",{entity_id:this.config.entity,option:String(e.value)})}_onKeydown(e){if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(e.key))return;const t=this._options;if(!t.length)return;e.preventDefault();const i=this._current,s=t.length;let a=t.findIndex(e=>String(e.value)===i);a<0&&(a=0);const n="Home"===e.key?0:"End"===e.key?s-1:"ArrowRight"===e.key||"ArrowDown"===e.key?(a+1)%s:(a-1+s)%s;this._select(t[n]),this.shadowRoot?.querySelectorAll(".pill")[n]?.focus()}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._isUnavailable(e),i=this._current,s=this._options,a=s.find(e=>String(e.value)===i)||null,n=this._activeAlert,o=this._shellPair(!1),r=n?.color||"var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))",l=n?.color_on||"var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))",c=n&&!1!==this.config.alert_tints_hero,d=c?r:this.config.color??o.bg,h=c?l:this.config.color_on??o.fg,p=a?.label??(e?this.hass.formatEntityState?.(e)??this._capitalize(i):"—");return I`
      <ha-card
        class=${t?"unavailable":""}
        style="--mh-bg:${d};--mh-fg:${h};--mh-alert-bg:${r};--mh-alert-fg:${l};"
      >
        <div class="stack">
          <div class="hero ${n?"attached":""}">
            ${this._renderBurst({alarm:!!n})}
            <div class="content">
              ${this.config.name?I`<div class="eyebrow"><span>${this.config.name}</span></div>`:V}
              <div class="head">
                ${a?.glyph?I`<svg class="route" viewBox="0 0 48 34" aria-hidden="true">
                      ${H`<path d=${a.glyph} pathLength="100" />`}
                    </svg>`:a?.icon?I`<ha-icon class="gicon" .icon=${a.icon}></ha-icon>`:V}
                <div class="text">
                  <div class="title">${t?$e("unavailable",this.hass):p}</div>
                  ${a?.secondary?I`<div class="blurb">${a.secondary}</div>`:V}
                </div>
              </div>
              <div
                class="pills"
                role="radiogroup"
                aria-label=${this.config.name??this.config.entity}
                @keydown=${this._onKeydown}
              >
                ${s.map(e=>{const t=String(e.value)===i;return I`<button
                    class="pill ${t?"on":""}"
                    role="radio"
                    aria-checked=${t?"true":"false"}
                    tabindex=${t?"0":"-1"}
                    @click=${()=>this._select(e)}
                  >${e.short??e.label}</button>`})}
              </div>
            </div>
          </div>
          ${this._renderAlertStrip(n,this.config.entity)}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-select-hero",pa),window.customCards=window.customCards||[],window.customCards.push({type:"materia-select-hero",name:"Materia Select Hero",description:"A select whose current option owns the panel — glyph, name, one line of consequence, and the option pills in one block. A variant of Materia Hero.",preview:!0});const ua=[Ee,ze,n`
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

    /* The display voice, bold with tight tracking — at a FIXED size. This
       used to scale with the card's container width (cqi), which made the
       same "Rooms" heading render smaller in a narrow column than a wide one.
       A section title is a landmark: it must hold rank everywhere on the
       page, so it holds one size — M3's title-large, 22px. */
    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .row.subtitle .title {
      font-size: 16px;
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
      font-size: 14px;
      font-weight: 500;
      opacity: 0.62;
      white-space: nowrap;
    }
  `];customElements.define("materia-heading-editor",class extends We{_formData(){return{heading_style:"title",...this._config}}get _sections(){return[{title:"Heading",icon:"mdi:format-title",fields:[{name:"heading",required:!0,selector:{text:{}}},{name:"heading_style",label:"Style",selector:{select:{mode:"dropdown",options:[{value:"title",label:"Title"},{value:"subtitle",label:"Subtitle"}]}}},{name:"icon",selector:{icon:{}}},{name:"secondary",label:"Right-aligned meta line",template:!0,selector:{text:{}}},{name:"tap_action",selector:{ui_action:{default_action:"none"}}}]}]}});class ma extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedSecondary:{state:!0}};static styles=ua;static getConfigElement(){return document.createElement("materia-heading-editor")}static getStubConfig(){return{heading:"Section"}}setConfig(e){this.config={...e}}updated(e){e.has("hass")&&this.hass&&this._resolveField("secondary","_resolvedSecondary")}get _secondary(){const e=this.config.secondary;if(null==e)return null;const t=this._isTemplate(e)?this._resolvedSecondary:e,i=null==t?"":String(t).trim();return i.length?i:null}render(){if(!this.config)return I``;const e="subtitle"===this.config.heading_style,t=this._secondary,i=!!this.config.tap_action;return I`
      <ha-card>
        <div
          class="row ${e?"subtitle":""} ${i?"tappable":""}"
          @click=${i?()=>this._handleAction(this.config.tap_action):void 0}
        >
          ${this.config.icon?I`<ha-icon .icon=${this.config.icon}></ha-icon>`:V}
          <span class="title">${this.config.heading??""}</span>
          <span class="spacer"></span>
          ${t?I`<span class="secondary">${t}</span>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-heading",ma),window.customCards=window.customCards||[],window.customCards.push({type:"materia-heading",name:"Materia Heading",description:"Section heading in the family's display voice, with a templatable right-aligned meta line.",preview:!0});const ga=[Ee,ze,Ae,ge,n`
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

    /* The bar's colour settles with the phase — urgent while the ring is
       live, container-soft once it's been answered, outline-quiet when it
       lapsed. System tokens only; the design's palette is illustrative. */
    .countbar.buzzed .fill,
    .countbar.opened .fill {
      background: var(--md-sys-color-primary-container);
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

    /* One lobe passes about every 1.1s — a slow churn, not a spinner. At 5s
       per turn the 9-lobe silhouette read as frantic. */
    .busy .cookie path {
      animation: mdb-spin 10s linear infinite;
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

    /* Global doors status — the header's right column outside the ringing
       countdown: which doors are open / were opened for this visit. */
    .doors {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      flex: none;
    }

    .door {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(13px, 2.8cqi, 14px);
      font-weight: 600;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.65;
      transition: color var(--md-sys-motion-default-effects),
        opacity var(--md-sys-motion-default-effects);
    }

    .door ha-icon {
      --mdc-icon-size: 18px;
    }

    .door.yes {
      color: var(--md-sys-color-primary);
      opacity: 1;
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
  `];customElements.define("materia-doorbell-editor",class extends We{_formData(){return{...this._config}}get _sections(){return[{title:"Doorbell",icon:"mdi:doorbell",fields:[{name:"entity",label:"Doorbell entity",helper:"on = ringing. The countdown runs from its last change.",selector:{entity:{domain:["input_boolean","binary_sensor","switch"]}}},{name:"timeout",label:"Popup timeout (seconds)",helper:"Match the popup timeout so the top bar and the dialog agree.",selector:{number:{min:5,max:300,mode:"box"}}},{name:"ring_seconds",label:"Ring length (seconds)",helper:"How long the chime actually sounds — the ring lapses when it ends. Empty = same as the popup timeout.",selector:{number:{min:1,max:300,mode:"box"}}},{name:"name",label:"Eyebrow while ringing (default: Doorbell)",selector:{text:{}}},{name:"place",label:"Where the ring is from (default: Front door)",selector:{text:{}}},{name:"demo",label:"Preview a phase (demo)",helper:"Forces the card's face — the live phases only show during a real ring. Clear it for real use.",selector:{select:{mode:"dropdown",options:[{value:"ringing",label:"Ringing"},{value:"buzzing",label:"Buzzing"},{value:"buzzed",label:"Buzzed"},{value:"opened",label:"Opened"},{value:"lapsed",label:"Lapsed"}]}}}]},{title:"Buzz panel",icon:"mdi:bullhorn",fields:[{name:"buzz_action",label:"Tap-to-buzz action",helper:"The street-door buzzer. Leave empty to hide the panel.",selector:{ui_action:{default_action:"none"}}},{name:"buzz_entity",label:"Buzzing indicator",helper:"on = buzzing (usually the buzzer script itself).",selector:{entity:{}}},{name:"buzz_title",label:"Panel title (default: Buzz in)",selector:{text:{}}},{name:"buzz_sub",label:"Panel sub-line",helper:'Default: "Street door only", translated with the dashboard.',selector:{text:{}}}]},{title:"Open panel",icon:"mdi:lock-open-variant-outline",fields:[{name:"lock",label:"Lock",helper:"The gesture unlocks this. Leave empty to hide the panel.",selector:{entity:{domain:"lock"}}},{name:"open_gesture",label:"Open gesture",selector:{select:{mode:"dropdown",options:[{value:"slide",label:"Slide"},{value:"hold",label:"Hold"}]}}},{name:"open_action",label:"Open action (replaces the plain unlock)",helper:"For a let-them-in sequence that clears more than this one lock. Re-locking always drives the lock itself.",selector:{ui_action:{default_action:"none"}}},{name:"open_title",label:"Panel title (default: Open the front door)",selector:{text:{}}},{name:"open_sub",label:"Panel sub-line",helper:'Default: "Unlocks the front door for your visitor.", translated with the dashboard.',selector:{text:{}}}]},{title:"Bottom row",icon:"mdi:dots-horizontal",fields:[{name:"ignore_action",label:"Ignore",helper:"Empty hides the button. The whole row hides when nothing in it is configured.",selector:{ui_action:{default_action:"none"}}},{name:"replay_action",label:"Replay ring",helper:"Empty hides the button.",selector:{ui_action:{default_action:"none"}}},{name:"mute_entity",label:"Mute toggle entity",helper:"input_boolean silencing the chime. Empty hides the button.",selector:{entity:{domain:"input_boolean"}}}]}]}});const fa=rt(90,90,86,9),_a=6e3;class ba extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_now:{state:!0},_buzzedUntil:{state:!0}};static styles=ga;static getConfigElement(){return document.createElement("materia-doorbell-editor")}static getStubConfig(){return{entity:"",timeout:30}}setConfig(e){if(!e.entity)throw new Error("entity is required (on = ringing)");this.config={timeout:30,...e}}connectedCallback(){super.connectedCallback(),this._syncTicker()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tick),this._tick=null,clearTimeout(this._lingerTimer)}_on(e){const t=e?this.hass?.states[e]:void 0;return!!t&&["on","true","open","opening","unlocked","unlocking","running","active","home"].includes(String(t.state).toLowerCase())}get _ringSeconds(){return this.config.ring_seconds??this.config.timeout}get _ringing(){return null!=this._ringT0&&(Date.now()-this._ringT0)/1e3<this._ringSeconds}get _buzzing(){return this._on(this.config.buzz_entity)}get _buzzedRecently(){const e=this.config.timeout||0;if(this._buzzing)return!0;if(this._buzzedVia&&(Date.now()-this._buzzedVia)/1e3<=e)return!0;const t=this.config.buzz_entity?this.hass?.states[this.config.buzz_entity]:null;if(!t)return!1;const i=Date.parse(t.last_changed);return!Number.isNaN(i)&&(Date.now()-i)/1e3<=e}get _lockState(){const e=this.config.lock;return e?String(this.hass?.states[e]?.state??""):""}get _unlockedNow(){return["unlocked","unlocking"].includes(this._lockState)}get _openedViaCard(){return null!=this._openedVia&&(Date.now()-this._openedVia)/1e3<=(this.config.timeout||0)}get _opened(){if(this._buzzedRecently)return!0;if(!this._unlockedNow)return!1;const e=this.hass?.states[this.config.lock],t=e?Date.parse(e.last_changed):NaN;return!Number.isNaN(t)&&(Date.now()-t)/1e3<=(this.config.timeout||0)}get _unlocking(){return["unlocking","locking"].includes(this._lockState)}get _left(){return this._ringT0?Math.max(0,Math.ceil(this._ringSeconds-(Date.now()-this._ringT0)/1e3)):0}get _phase(){return this.config.demo?this.config.demo:this._opened?"opened":this._buzzing?"buzzing":this._buzzedUntil&&Date.now()<this._buzzedUntil?"buzzed":this._ringing?"ringing":"lapsed"}willUpdate(e){if(e.has("hass")||e.has("config")){if("ringing"===this.config?.demo)return void((!this._ringT0||(Date.now()-this._ringT0)/1e3>(this.config.timeout||0))&&(this._ringT0=Date.now()));if(!this._ringT0){const e=this.hass?.states[this.config?.entity],t=e?Date.parse(e.last_changed):NaN;!Number.isNaN(t)&&(Date.now()-t)/1e3<=(this.config.timeout||0)&&(this._ringT0=t)}this._ringT0&&(Date.now()-this._ringT0)/1e3>(this.config.timeout||0)&&(this._ringT0=null)}}updated(e){if(e.has("hass")){const e=this._buzzing;this._wasBuzzing&&!e&&(this._buzzedUntil=Date.now()+_a,clearTimeout(this._lingerTimer),this._lingerTimer=setTimeout(()=>this.requestUpdate(),6050)),this._wasBuzzing=e,this._syncTicker()}}get _windowLeft(){return this._ringT0?Math.max(0,Math.ceil((this.config.timeout||0)-(Date.now()-this._ringT0)/1e3)):0}_syncTicker(){const e=this._ringing||this._windowLeft>0;e&&!this._tick?this._tick=setInterval(()=>{this._now=Date.now()},1e3):!e&&this._tick&&(clearInterval(this._tick),this._tick=null)}_buzz(){this.config.buzz_action&&(this._buzzedVia=Date.now(),this._handleAction(this.config.buzz_action),this.config.buzz_entity||(this._buzzedUntil=Date.now()+_a,clearTimeout(this._lingerTimer),this._lingerTimer=setTimeout(()=>this.requestUpdate(),6050)))}_slide(){if(!this.config.lock)return;if(this.config.open_action)return this._openedVia=Date.now(),this._handleAction(this.config.open_action),void this.requestUpdate();const e="unlocked"===this._lockState?"lock":"unlock";this._callService("lock",e,{entity_id:this.config.lock})}_ignore(){this.config.ignore_action&&this._handleAction(this.config.ignore_action)}_replay(){this.config.replay_action&&this._handleAction(this.config.replay_action)}_toggleMute(){this.config.mute_entity&&this._callService("homeassistant","toggle",{entity_id:this.config.mute_entity})}_copy(e){const t=this.hass,i=this.config.place??$e("db_eyebrow_front",t),s=this._left;return{ringing:{eyebrow:this.config.name??$e("db_eyebrow",t),accent:!0,title:$e("db_title_ringing",t),sub:$e("db_sub_ringing",t,{place:i}),num:`${s}s`,numAccent:!0,cap:$e("db_count_before_lapse",t),icon:"m3of:notifications-active",chip:"live ringing"},buzzing:{eyebrow:$e("db_eyebrow_street",t),accent:!0,title:$e("db_title_buzzing",t),sub:$e("db_sub_buzzing",t),num:null,numAccent:!1,cap:null,icon:"m3o:door-open",chip:"live"},buzzed:{eyebrow:$e("db_eyebrow_street",t),accent:!1,title:$e("db_title_buzzed",t),sub:$e("db_sub_buzzed",t),num:null,numAccent:!1,cap:null,icon:"m3o:door-open",chip:"soft"},opened:{eyebrow:$e("db_eyebrow_front",t),accent:!1,title:$e("db_title_opened",t),titleAccent:!0,sub:this._unlockedNow?$e("db_sub_opened",t):$e("db_sub_buzzed",t),num:null,numAccent:!1,cap:null,icon:"m3o:lock-open-right",chip:"live"},lapsed:{eyebrow:this.config.name??$e("db_eyebrow",t),accent:!1,title:$e("db_title_lapsed",t),sub:$e("db_sub_lapsed",t),num:null,numAccent:!1,cap:null,icon:"m3o:notifications-off",chip:""}}[e]}render(){if(!this.config||!this.hass)return I``;const e=this._phase,t=this._copy(e),i=this._buzzing||"buzzing"===e,s=this.config.open_action?this._openedViaCard:this._unlockedNow,a=this.config.timeout>0&&this._ringT0?Math.round(this._windowLeft/this.config.timeout*100):100,n="buzzed"===e||this._buzzedRecently,o=$e(i?"db_buzz_busy":n?"db_buzz_done":"db_buzz_cta",this.hass),r=i?"m3o:door-open":n?"m3o:check-circle":"m3o:bolt",l=this._on(this.config.mute_entity);return I`
      <ha-card>
        <div class="countbar ${e}">
          <div class="fill" style="width:${a}%"></div>
        </div>
        <div class="body">
          <div class="head">
            <div class="chip ${t.chip}"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="headline">
              <span class="eyebrow ${t.accent?"accent":""}">${t.eyebrow}</span>
              <span class="title ${t.titleAccent?"accent":""}">${t.title}</span>
              <span class="subtitle">${t.sub}</span>
            </div>
            ${null!=t.num?I`
                  <div class="count">
                    <span class="num ${t.numAccent?"accent":""}">${t.num}</span>
                    <span class="cap">${t.cap}</span>
                  </div>
                `:this.config.buzz_action||this.config.lock?I`
                  <div class="doors">
                    ${this.config.buzz_action?I`
                          <div class="door ${n?"yes":""}">
                            <ha-icon .icon=${n?"m3o:check-circle":"m3o:bolt"}></ha-icon>
                            <span>${$e("db_eyebrow_street",this.hass)}</span>
                          </div>
                        `:V}
                    ${this.config.lock?I`
                          <div class="door ${this._unlockedNow?"yes":""}">
                            <ha-icon .icon=${this._unlockedNow?"m3o:lock-open-right":"m3o:door-front"}></ha-icon>
                            <span>${$e("db_eyebrow_front",this.hass)}</span>
                          </div>
                        `:V}
                  </div>
                `:V}
          </div>

          <div class="panels">
            ${this.config.buzz_action?I`
                  <div class="panel buzz ${i?"busy":""}" @click=${this._buzz}>
                    <div class="cookie-stage">
                      <svg class="wave one" viewBox="0 0 180 180"><path d=${fa}></path></svg>
                      <svg class="wave two" viewBox="0 0 180 180"><path d=${fa}></path></svg>
                      <svg class="cookie" viewBox="0 0 180 180"><path d=${fa}></path></svg>
                      <div class="cookie-face">
                        <ha-icon .icon=${r}></ha-icon>
                        <span class="word">${o}</span>
                      </div>
                    </div>
                    <div class="buzz-caption">
                      <span class="big">${this.config.buzz_title??$e("db_buzz_title",this.hass)}</span>
                      <span class="small">${this.config.buzz_sub??$e("db_buzz_sub",this.hass)}</span>
                    </div>
                  </div>
                `:V}
            ${this.config.lock?I`
                  <div class="panel open ${s?"done":""}">
                    <div class="open-head">
                      <div class="open-glyph">
                        <ha-icon .icon=${s?"m3o:lock-open-right":"m3o:door-front"}></ha-icon>
                      </div>
                      <div class="open-copy">
                        <span class="big">${this.config.open_title??$e("db_open_title",this.hass)}</span>
                        <span class="small">${this.config.open_sub??$e("db_open_sub",this.hass)}</span>
                      </div>
                    </div>
                    <div class="open-spacer"></div>
                    <materia-drag-confirm
                      gesture=${"hold"===this.config.open_gesture?"hold":"slide"}
                      .label=${"unlocking"===this._lockState?$e("lock_unlocking",this.hass):"locking"===this._lockState?$e("lock_locking",this.hass):s&&!this.config.open_action?"hold"===this.config.open_gesture?$e("lock_hold_to_lock",this.hass):$e("lock_slide_to_lock",this.hass):"hold"===this.config.open_gesture?$e("db_hold_hint",this.hass):$e("db_slide_hint",this.hass)}
                      .pending=${this._unlocking}
                      .direction=${s&&!this.config.open_action?"backward":"forward"}
                      @confirm=${this._slide}
                    ></materia-drag-confirm>
                  </div>
                `:V}
          </div>

          ${this.config.ignore_action||this.config.replay_action||this.config.mute_entity?I`
                <div class="row">
                  ${this.config.ignore_action?I`<button class="lead" @click=${this._ignore}>${$e("db_ignore",this.hass)}</button>`:V}
                  ${this.config.mute_entity?I`
                        <button class=${l?"muted":""} @click=${this._toggleMute}>
                          <ha-icon .icon=${l?"m3o:volume-off":"m3o:volume-up"}></ha-icon>
                          ${$e(l?"db_muted":"db_mute",this.hass)}
                        </button>
                      `:V}
                  <span class="gap"></span>
                  ${this.config.replay_action?I`<button class="trail" @click=${this._replay}>${$e("db_replay",this.hass)}</button>`:V}
                </div>
              `:V}
        </div>
      </ha-card>
    `}getCardSize(){return 5}}customElements.define("materia-doorbell",ba),window.customCards=window.customCards||[],window.customCards.push({type:"materia-doorbell",name:"Materia Doorbell",description:"Doorbell alert — countdown ring, tap-to-buzz, slide-to-unlock. Built for a browser_mod popup.",preview:!0});const va=[Ee,ze,ge,n`
    /* The rail must be able to stretch to whatever slot it sits beside —
       a layout-card grid row, a section cell — so the whole chain is 100%. */
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      height: 100%;
    }

    /* Connected button group, not Tabs — see index.js for why. One joined
       well; each segment computes its own corner radius in JS (button-
       group's own formula), so there is no container clip or divider here
       to fight it. */
    .rail {
      display: flex;
      flex-direction: column;
      gap: 2px;
      height: 100%;
    }

    .tab {
      position: relative;
      flex: 1 0 auto;
      border: none;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      /* Quiet filled well when unselected — the carousel-tile treatment,
         so an unselected tab never reads as disabled. */
      background: var(--md-sys-color-surface-container, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      color: var(--md-sys-color-on-surface-variant);
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* The selected segment grows AND opens its seam corner to a full pill —
       the shape+size morph button-group already established, not a new one. */
    .tab.on {
      flex-grow: 1.4;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .glyph {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.01em;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 state layer */
    .tab::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .tab:hover::before {
      opacity: 0.08;
    }

    .tab:active::before {
      opacity: 0.12;
    }

    /* Embedded pages: content left, rail right, one seam. */
    .wrap {
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--mtabs-rail-width, 148px);
      gap: 8px;
      height: 100%;
    }

    /* Every pane occupies the SAME cell; hidden ones keep their box so the
       stage holds the tallest pane's height — no reflow on switch, and
       pane-internal state (a map's zoom) survives. */
    .stage {
      display: grid;
      min-width: 0;
    }

    .pane {
      grid-area: 1 / 1;
      min-width: 0;
      /* Heavy panes (a live map) must not tax the rest of the page. */
      contain: layout style;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* visibility alone is NOT enough: a child may set visibility:visible
       under a hidden ancestor — the map card's zoom overlay does exactly
       that and punched through the rooms grid. Opacity can't be overridden
       from below. Both stay applied: visibility skips paint for honest
       children, opacity guarantees the rest. */
    .pane:not(.on) {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }

    .pane-card > * {
      display: block;
    }

    /* ---- horizontal bar (vertical: false) ---- */

    :host([horizontal]) .rail {
      flex-direction: row;
      height: auto;
    }

    :host([horizontal]) .tab {
      min-width: 0;
    }

    /* Bar above, pages below — markup stays stage-then-rail. */
    :host([horizontal]) .wrap {
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      height: auto;
    }

    @media (prefers-reduced-motion: reduce) {
      .tab,
      .tab::before {
        transition: none;
      }
    }
  `];class ya extends We{static properties={_expanded:{state:!0},_editingCard:{state:!0}};static styles=[We.styles,n`
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
      .cards-head {
        font-size: 13px;
        font-weight: 600;
        margin-top: 4px;
      }
      .card-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 4px 2px 12px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
      }
      .card-row span {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      hui-card-picker {
        display: block;
      }
      .edit-head {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null,this._editingCard??=null}connectedCallback(){super.connectedCallback(),this._loadHuiElements()}async _loadHuiElements(){if(customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker"))return;const e=await pe(),t=await e.createCardElement({type:"vertical-stack",cards:[]});await t.constructor.getConfigElement(),this.requestUpdate()}_formData(){return{vertical:!0,...this._config}}get _sections(){return[{title:"Tabs",icon:"mdi:tab",fields:[{name:"entity",label:"Entity holding the selected tab (optional)",helper:"Leave empty for per-device tabs (each screen keeps its own). Set an input_select only when the selection must be shared or drive conditional cards elsewhere.",selector:{entity:{domain:["input_select","select","input_text"]}}},{name:"attribute",label:"Attribute (instead of the state)",selector:{text:{}}},{name:"vertical",label:"Vertical rail (off = horizontal tab bar)",selector:{boolean:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}get _itemSchema(){return[{name:"label",selector:{text:{}}},{name:"value",label:"Value (the entity state this tab means)",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"Action (overrides selecting the tab)",selector:{ui_action:{default_action:"none"}}}]}_itemCards(e){return Array.isArray(e?.cards)?e.cards:e?.card?[e.card]:[]}_renderExtra(){if(this._editingCard)return this._renderCardEditor();const e=this._config.items||[];return I`
      <div class="options-header">
        <span>Tabs</span>
        <ha-icon-button @click=${this._addItem}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveItem(e,t),e.map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||`Tab ${t+1}`}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeItem(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?this._renderItemBody(e,t):""}
            </div>
          `))}
    `}_renderItemBody(e,t){const i=this._itemCards(e);return I`
      <div class="option-body">
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${this._itemSchema}
          .computeLabel=${De}
          @value-changed=${e=>this._updateItem(t,e.detail.value)}
        ></ha-form>

        <div class="cards-head">This tab's cards</div>
        ${i.map((e,i)=>I`
            <div class="card-row">
              <span>${e?.type||"card"}</span>
              <ha-icon-button @click=${()=>this._editingCard={item:t,card:i}}>
                <ha-icon icon="mdi:pencil"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeCard(t,i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
          `)}
        ${customElements.get("hui-card-picker")?I`
              <hui-card-picker
                .hass=${this.hass}
                @config-changed=${e=>{e.stopPropagation(),this._addCard(t,e.detail.config)}}
              ></hui-card-picker>
            `:I`<div style="font-size:12px;opacity:.6;">Loading card picker…</div>`}
      </div>
    `}_renderCardEditor(){const{item:e,card:t}=this._editingCard,i=this._itemCards(this._config.items?.[e])[t];return i?I`
      <div class="edit-head">
        <ha-icon-button @click=${()=>this._editingCard=null}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </ha-icon-button>
        <span>${this._config.items[e]?.label||`Tab ${e+1}`} · card ${t+1}</span>
      </div>
      ${customElements.get("hui-card-element-editor")?I`
            <hui-card-element-editor
              .hass=${this.hass}
              .value=${i}
              @config-changed=${i=>{i.stopPropagation(),this._updateCard(e,t,i.detail.config)}}
            ></hui-card-element-editor>
          `:I`<div style="font-size:12px;opacity:.6;">Loading card editor…</div>`}
    `:(this._editingCard=null,I``)}_writeCards(e,t){const i=[...this._config.items||[]],s={...i[e],cards:t};delete s.card,i[e]=s,this._commit({...this._config,items:i})}_addCard(e,t){this._writeCards(e,[...this._itemCards(this._config.items?.[e]),t])}_removeCard(e,t){const i=[...this._itemCards(this._config.items?.[e])];i.splice(t,1),this._editingCard?.item===e&&this._editingCard?.card===t&&(this._editingCard=null),this._writeCards(e,i)}_updateCard(e,t,i){const s=[...this._itemCards(this._config.items?.[e])];s[t]=i,this._writeCards(e,s)}_addItem(){const e=[...this._config.items||[],{label:"",value:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,items:e})}_removeItem(e){const t=[...this._config.items||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._editingCard=null,this._commit({...this._config,items:t})}_moveItem(e,t){const i=[...this._config.items||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,items:i})}_updateItem(e,t){const i=[...this._config.items||[]];i[e]={...i[e],...t},this._commit({...this._config,items:i})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-tabs-editor",ya);const xa=24;class wa extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_sel:{state:!0},_panes:{state:!0}};static styles=va;static getConfigElement(){return document.createElement("materia-tabs-editor")}static getStubConfig(){return{items:[{label:"Rooms",value:"rooms",icon:"m3o:grid-view"},{label:"Map",value:"map",icon:"m3o:map"}]}}setConfig(e){if(!e.items?.length)throw new Error("Materia Tabs: at least one item is required");this.config={...e},this.toggleAttribute("horizontal",!1===e.vertical),this._panes=null,this._buildPanes()}_items(){return(this.config.items||[]).map(e=>"string"==typeof e?{label:e,value:e}:e)}_paneConfigs(e){return Array.isArray(e.cards)&&e.cards.length?e.cards:e.card?[e.card]:null}async _buildPanes(){const e=this._items();if(!e.some(e=>this._paneConfigs(e)))return;const t=await pe();this._panes=await Promise.all(e.map(async e=>{const i=this._paneConfigs(e);return i?Promise.all(i.map(async e=>{const i=await t.createCardElement(e);return this.hass&&(i.hass=this.hass),i})):null}))}updated(e){if(super.updated?.(e),e.has("hass")&&this._panes)for(const e of this._panes)if(e)for(const t of e)t.hass=this.hass}get _stateObj(){return this.config.entity?this.hass?.states[this.config.entity]:null}get _current(){if(this.config.entity){const e=this._stateObj;if(!e)return null;const t=this.config.attribute?e.attributes?.[this.config.attribute]:e.state;return null==t?null:String(t)}const e=this._items()[0];return this._sel??String(e?.value??e?.label??"")}_tap(e){if(this._fireHaptic?.("selection"),e.tap_action)return void this._handleAction(e.tap_action);const t=String(e.value??e.label);if(!this.config.entity)return void(this._sel=t);const i=this._stateObj,s=i?.entity_id?.split(".")[0];"select"===s||"input_select"===s?this._callService(s,"select_option",{entity_id:i.entity_id,option:t}):"input_text"===s&&this._callService(s,"set_value",{entity_id:i.entity_id,value:t})}_segmentRadius(e,t,i,s){const a=i?xa:8;if(1===t)return"24px";const n=0===e,o=e===t-1;return s?n?`24px 24px ${a}px ${a}px`:o?`${a}px ${a}px 24px 24px`:`${a}px`:n?`24px ${a}px ${a}px 24px`:o?`${a}px 24px 24px ${a}px`:`${a}px`}render(){if(!this.hass||!this.config)return I``;const e=this._items(),t=this._current,i=!1!==this.config.vertical,s=I`
      <div class="rail" role="tablist" aria-orientation=${i?"vertical":"horizontal"} style="height:${i?"auto":"48px"};">
        ${e.map((s,a)=>{const n=String(s.value??s.label),o=t===n,r=this._segmentRadius(a,e.length,o,i);return I`
            <button
              class="tab ${o?"on":""}"
              role="tab"
              aria-selected=${o?"true":"false"}
              style="border-radius:${r};${i?"min-height:48px;":"height:48px;"}"
              @click=${()=>this._tap(s)}
            >
              ${s.icon?I`<ha-icon class="glyph" .icon=${s.icon}></ha-icon>`:V}
              <span class="label">${s.label??n}</span>
            </button>
          `})}
      </div>
    `;return this._panes?I`
      <ha-card>
        <div class="wrap">
          <div class="stage">
            ${e.map((e,i)=>{const s=String(e.value??e.label);return this._panes[i]?I`<div class="pane ${t===s?"on":""}" role="tabpanel">
                    ${this._panes[i].map(e=>I`<div class="pane-card">${e}</div>`)}
                  </div>`:V})}
          </div>
          ${s}
        </div>
      </ha-card>
    `:I`<ha-card>${s}</ha-card>`}getGridOptions(){return this._panes?{columns:12,rows:"auto"}:{columns:2,rows:"auto"}}getCardSize(){return this._panes?6:3}}customElements.define("materia-tabs",wa),window.customCards=window.customCards||[],window.customCards.push({type:"materia-tabs",name:"Materia Tabs",description:"Vertical tab rail — the selected tab grows into the nav-rail indicator. Embed cards per tab, or pair with conditional cards.",preview:!0});const ka=[...ui,n`
    /* The row becomes a column: header on top, disclosed body underneath. The
       header keeps the padding the row used to own. */
    ha-card.row.exp {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 0;
      cursor: default;
    }

    .head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* M3 expressive shape morph: opening relaxes the corner a notch and drops
       the dimming, the same gesture the .colored escalation already uses. */
    ha-card.row.exp.open {
      border-radius: 20px;
      opacity: 1;
    }

    .chev {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
      opacity: 0.55;
      transition: transform var(--md-sys-motion-expressive-fast-spatial);
    }

    ha-card.row.exp.open .chev {
      transform: rotate(180deg);
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 12px 12px;
    }

    /* Hairline drawn from currentColor so it survives a templated row color
       instead of assuming a dark theme. */
    .sep {
      height: 1px;
      flex: none;
      background: color-mix(in srgb, currentColor 12%, transparent);
      margin: 0 2px 6px;
    }

    /* A disclosed child is nested content, not a card on a card. */
    .body > * {
      --ha-card-box-shadow: none;
    }

    /* Re-scope the inherited pressed-thumb state. materia-switch keys it on
       the whole row being active, which is right when the row IS the switch —
       here the row is also the disclosure, so pressing the header to open it
       made the thumb swell as though you had grabbed the toggle. Undo the
       inherited rule and hang it off the switch itself. */
    ha-card.row.exp:active .m3-switch i {
      width: 13px;
      height: 13px;
    }
    ha-card.row.exp:active .m3-switch:not(.on) i {
      left: 4px;
    }
    ha-card.row.exp:active .m3-switch.on i {
      left: 19px;
      width: 20px;
      height: 20px;
    }

    .m3-switch:active i {
      width: 22px;
      height: 22px;
    }
    .m3-switch:not(.on):active i {
      left: 2px;
    }
    .m3-switch.on:active i {
      left: 16px;
    }
  `];class $a extends We{static properties={_editingCard:{state:!0}};static styles=[We.styles,n`
      .cards-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .cards-hint {
        font-size: 12px;
        opacity: 0.6;
        margin-bottom: 4px;
      }
      .card-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 4px 2px 12px;
        margin-top: 6px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
      }
      .card-row span {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      hui-card-picker {
        display: block;
        margin-top: 8px;
      }
      .edit-head {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
    `];setConfig(e){super.setConfig(e),this._editingCard??=null}connectedCallback(){super.connectedCallback(),this._loadHuiElements()}async _loadHuiElements(){if(customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker"))return;const e=await pe(),t=await e.createCardElement({type:"vertical-stack",cards:[]});await t.constructor.getConfigElement(),this.requestUpdate()}_formData(){return{expanded:!1,show_switch:!0,flat:!1,...this._config}}_sectionsSignature(){return this._config?.entity?"entity":"no-entity"}get _sections(){const e=!!this._config?.entity;return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"Entity (optional)",helper:"With an entity the header wears an M3 switch and its state tones the row. Leave empty for a plain drawer.",selector:{entity:{}}},{name:"name",label:e?"Name / template (defaults to the friendly name)":"Name / template",required:!e,template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"secondary",label:"Secondary text / template",template:!0,selector:{text:{}}}]},{title:"Behaviour",icon:"mdi:arrow-expand-vertical",fields:[{name:"expanded",label:"Open by default",selector:{boolean:{}}},{name:"show_switch",label:"Show the switch in the header",helper:"Only applies when an entity is set.",selector:{boolean:{}}},{name:"flat",label:"Flat (no card chrome — for nesting)",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Row color (e.g. escalate from state)",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color",label:"Switch track color when on",color:!0,template:!0,selector:{text:{}}},{name:"switch_color_on",label:"Switch thumb color when on",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Switch action (overrides toggling the entity)",selector:{ui_action:{default_action:"toggle"}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}_cards(){return Array.isArray(this._config?.cards)?this._config.cards:[]}_renderExtra(){if(null!=this._editingCard)return this._renderCardEditor();const e=this._cards();return I`
      <div class="cards-header"><span>Behind the chevron</span></div>
      <div class="cards-hint">
        These cards appear when the row is opened. The chevron only shows once there is at least one.
      </div>

      ${qe((e,t)=>this._moveCard(e,t),e.map((e,t)=>I`
            <div class="card-row">
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${e?.type||"card"}</span>
              <ha-icon-button @click=${()=>this._editingCard=t}>
                <ha-icon icon="mdi:pencil"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeCard(t)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
          `))}

      ${customElements.get("hui-card-picker")?I`
            <hui-card-picker
              .hass=${this.hass}
              @config-changed=${e=>{e.stopPropagation(),this._addCard(e.detail.config)}}
            ></hui-card-picker>
          `:I`<div style="font-size:12px;opacity:.6;">Loading card picker…</div>`}
    `}_renderCardEditor(){const e=this._editingCard,t=this._cards()[e];return t?I`
      <div class="edit-head">
        <ha-icon-button @click=${()=>this._editingCard=null}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </ha-icon-button>
        <span>Card ${e+1} · ${t.type||"card"}</span>
      </div>
      ${customElements.get("hui-card-element-editor")?I`
            <hui-card-element-editor
              .hass=${this.hass}
              .value=${t}
              @config-changed=${t=>{t.stopPropagation(),this._updateCard(e,t.detail.config)}}
            ></hui-card-element-editor>
          `:I`<div style="font-size:12px;opacity:.6;">Loading card editor…</div>`}
    `:(this._editingCard=null,I``)}_writeCards(e){this._commit({...this._config,cards:e})}_addCard(e){this._writeCards([...this._cards(),e])}_removeCard(e){const t=[...this._cards()];t.splice(e,1),this._editingCard===e&&(this._editingCard=null),this._writeCards(t)}_updateCard(e,t){const i=[...this._cards()];i[e]=t,this._writeCards(i)}_moveCard(e,t){const i=[...this._cards()],[s]=i.splice(e,1);i.splice(t,0,s),this._editingCard===e&&(this._editingCard=t),this._writeCards(i)}}customElements.define("materia-expander-editor",$a);class Ca extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_cards:{state:!0},_resolvedName:{state:!0},_resolvedSecondary:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedSwitchColor:{state:!0},_resolvedSwitchColorOn:{state:!0}};static styles=[ka,pi];static getConfigElement(){return document.createElement("materia-expander-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("automation.")||e.startsWith("switch.")||e.startsWith("input_boolean."))||"";return t?{entity:t,cards:[]}:{name:"Details",cards:[]}}setConfig(e){if(!e.entity&&!e.name)throw new Error("Materia Expander: name is required when there is no entity");this.config=e,this._open??=!0===e.expanded;const t=JSON.stringify(e.cards||[]);this.__cardsSig!==t&&(this.__cardsSig=t,this._cards=null,this._buildCards())}_cardConfigs(){return Array.isArray(this.config?.cards)?this.config.cards:[]}async _buildCards(){const e=this._cardConfigs();if(!e.length)return;const t=this.__cardsSig,i=await pe(),s=await Promise.all(e.map(async e=>{const t=await i.createCardElement(e);return this.hass&&(t.hass=this.hass),t}));this.__cardsSig===t&&(this._cards=s)}updated(e){if(super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("name","_resolvedName"),this._resolveField("secondary","_resolvedSecondary"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("switch_color","_resolvedSwitchColor"),this._resolveField("switch_color_on","_resolvedSwitchColorOn"),this._cards))for(const e of this._cards)e.hass=this.hass}get _stateObj(){return this.config?.entity?this.hass?.states[this.config.entity]:null}get _on(){return"on"===this._stateObj?.state}_toggleOpen(){this._cardConfigs().length&&(this._open=!this._open,this._fireHaptic("light"))}_toggleEntity(e){e.stopPropagation(),this._handleAction(this.config.tap_action||{action:"toggle",entity:this.config.entity}),this._fireHaptic("light")}render(){if(!this.hass||!this.config)return I``;const e=!!this.config.entity,t=this._stateObj;if(e&&!t)return I`<ha-card class="row exp off">
        <div class="head">
          <div class="r-text">
            <span class="r-name">${$e("entity_not_found_with_id",this.hass,{entity:this.config.entity})}</span>
          </div>
        </div>
      </ha-card>`;const i=e&&this._on,s=e?i?"on":"off":"on",a=e&&this._isUnavailable(t),n=(this._isTemplate(this.config.name)?this._resolvedName:this.config.name)||t?.attributes.friendly_name||this.config.entity,o=this.config.icon||t?.attributes.icon||(e?i?"mdi:toggle-switch":"mdi:toggle-switch-off-outline":"m3o:tune"),r=this.config.secondary?this._isTemplate(this.config.secondary)?this._resolvedSecondary:this.config.secondary:t?this.hass.formatEntityState?.(t)??t.state:"",l=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,c=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on,d=this._isTemplate(this.config.switch_color)?(this._resolvedSwitchColor||"").trim():this.config.switch_color,h=this._isTemplate(this.config.switch_color_on)?(this._resolvedSwitchColorOn||"").trim():this.config.switch_color_on,p=e&&!1!==this.config.show_switch,u=this._cardConfigs().length>0,m=u&&this._open;return I`
      <ha-card
        class="row exp ${s} ${m?"open":""} ${l?"colored":""} ${this.config.flat?"flat":""} ${a?"unavailable":""}"
        style="${l?`background:${l};`:""}${c?`color:${c};`:""}"
      >
        <div
          class="head"
          role=${u?"button":V}
          aria-expanded=${u?m?"true":"false":V}
          aria-label=${u?$e(m?"expander_collapse":"expander_expand",this.hass):V}
          @click=${this._toggleOpen}
        >
          <ha-icon class="r-icon" .icon=${o}></ha-icon>
          <div class="r-text">
            <span class="r-name">${n}</span>
            ${r?I`<span class="r-sub">${r}</span>`:""}
          </div>
          ${u?I`<ha-icon class="chev" .icon=${"m3o:expand-more"}></ha-icon>`:V}
          ${p?I`<div
                class="m3-switch ${i?"on":""}"
                style="${d?`--ms-track:${d};`:""}${h?`--ms-thumb:${h};`:""}"
                @click=${this._toggleEntity}
              ><i></i></div>`:V}
        </div>
        ${m&&this._cards?I`<div class="body">
              <div class="sep"></div>
              ${this._cards}
            </div>`:V}
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return this._open&&this._cards?1+this._cards.length:1}}customElements.define("materia-expander",Ca),window.customCards=window.customCards||[],window.customCards.push({type:"materia-expander",name:"Materia Expander",description:"Switch row that opens — the one control that matters stays inline, everything else lives behind the chevron.",preview:!0});const Sa=[Ee,ze,Ae,ge,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .tile {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      /* Symmetric, and the same 14/16 materia-bar-select uses — NOT trimmed
         to let the 44dp handle's own overhang double as bottom padding. That
         trim is what put the handle 2.5px from this tile's 24px corner arc:
         still inside it, but close enough to read as escaping the card. At
         14dp the same corner clears by 11dp. The handle is 2.75x the track's
         height, so it, not the track, is what the padding has to clear. */
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 0;
      box-sizing: border-box;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .level-row.with-control {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 56px;
      align-items: center;
      gap: 12px;
    }

    .control {
      width: 56px;
      height: 56px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--md-sys-color-on-secondary-container);
      background: var(--md-sys-color-secondary-container);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .control.on {
      border-radius: 18px;
      color: var(--md-sys-color-on-primary);
      background: var(--md-sys-color-primary);
    }

    .control ha-icon {
      --mdc-icon-size: 24px;
    }

    /* Flat is for composed mixer/control surfaces where the parent supplies
       the card surface. It keeps the level row's typography and touch target
       without nesting another rounded container inside it. */
    .tile.flat {
      background: transparent;
      border-radius: 0;
      padding: 4px 0;
    }

    .head {
      display: flex;
      align-items: baseline;
      gap: 10px;
      min-width: 0;
    }

    .head ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
      color: var(--ml-accent);
      /* Baseline alignment would hang a glyph off the text baseline. */
      align-self: center;
      opacity: 0.9;
    }

    /* The head row is a NAME and a READING side by side, so both sit on the
       M3 type scale one step apart rather than three. The 11px uppercase
       eyebrow over a 20px/700 numeral that shipped first came from
       materia-bar-select, where the two are stacked in a narrow column and
       the size jump is what separates them; laid out horizontally and
       baseline-aligned the same pair reads as a mismatch. title-small against
       title-medium keeps the reading dominant without shouting. */

    /* M3 title-small: 14sp / 500 / 20sp line / +0.1px tracking. */
    .label {
      flex: 1;
      min-width: 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.85;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 title-medium: 16sp / 500 / 24sp line / +0.15px tracking. Accent
       coloured so the number and the track it belongs to read as one thing. */
    .value {
      flex: none;
      font-family: var(--materia-font-display, inherit);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: var(--ml-accent);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    /* M3 label-medium: 12sp / 500 / 16sp line / +0.5px tracking. */
    .unit {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.5px;
      opacity: 0.7;
      margin-left: 0.15em;
    }

    materia-slider {
      display: block;
      width: 100%;
    }
  `];customElements.define("materia-level-editor",class extends We{_formData(){return{...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"label",label:"Label",template:!0,selector:{text:{}}},{name:"attribute",label:"Attribute holding the level",helper:"Defaults per domain: volume_level, brightness, percentage, current_position. Leave empty for number helpers.",selector:{text:{}}},{name:"icon",label:"Leading icon",template:!0,selector:{icon:{}}},{name:"control_entity",label:"Trailing control entity",helper:"Adds an aligned circular toggle beside the slider, for example a media-player zone power control.",selector:{entity:{}}},{name:"control_icon",label:"Trailing control icon",selector:{icon:{}}},{name:"control_label",label:"Trailing control accessible label",selector:{text:{}}},{name:"control_action",label:"Trailing control action",selector:{ui_action:{default_action:"toggle"}}}]},{title:"Range",icon:"mdi:ruler",secondary:"Left empty, these come from the entity",fields:[{name:"min",label:"Minimum (entity units)",selector:{number:{mode:"box",step:"any"}}},{name:"max",label:"Maximum (entity units)",selector:{number:{mode:"box",step:"any"}}},{name:"max_entity",label:"Maximum from helper",helper:"Optional number/input_number whose live state caps the slider.",selector:{entity:{domain:["number","input_number","sensor"]}}},{name:"max_entity_factor",label:"Maximum helper scale factor",helper:"For example 0.01 converts a percentage helper (60) to media volume (0.60).",selector:{number:{mode:"box",step:"any"}}},{name:"step",label:"Step (entity units)",selector:{number:{mode:"box",step:"any"}}},{name:"unit",label:"Unit shown after the value",helper:"Defaults to the entity's unit, or % for volume and brightness.",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"Container",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"Filled card"},{value:"flat",label:"Flat / no background"}]}}},{name:"slider_size",label:"Slider size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS · 16 dp"},{value:"s",label:"S · 24 dp"},{value:"m",label:"M · 40 dp"}]}}},{name:"color",label:"Tile background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Content color on it",color:!0,template:!0,selector:{text:{}}},{name:"slider_color",label:"Active track & handle",color:!0,template:!0,selector:{text:{}}},{name:"slider_track_color",label:"Inactive track",color:!0,template:!0,selector:{text:{}}},{name:"hide_stops",label:"Hide the stop indicators",helper:"The small M3 dots at each end of the track. Shown by default.",selector:{boolean:{}}}]},{title:"Advanced",icon:"mdi:tune",fields:[{name:"service",label:"Override service (domain.service)",selector:{text:{}}},{name:"service_key",label:"Override service data key",selector:{text:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}});const Ta={volume_level:{min:0,max:1,step:.01,factor:100,unit:"%"},brightness:{min:0,max:255,step:1,factor:100/255,unit:"%"},percentage:{min:0,max:100,step:1,factor:1,unit:"%"},current_position:{min:0,max:100,step:1,factor:1,unit:"%"}},za={media_player:"volume_level",light:"brightness",fan:"percentage",cover:"current_position"},Aa={media_player:["media_player.volume_set","volume_level"],light:["light.turn_on","brightness"],number:["number.set_value","value"],input_number:["input_number.set_value","value"],fan:["fan.set_percentage","percentage"],cover:["cover.set_cover_position","position"]},Ea=(e,t)=>{const i=Number(e);return Number.isFinite(i)?i:t},Ma=e=>{const t=String(e),i=t.indexOf(".");return i<0?0:Math.min(6,t.length-i-1)};class Oa extends(rs(hi(Te(ce)))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedLabel:{state:!0},_resolvedIcon:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedSliderColor:{state:!0},_resolvedSliderTrackColor:{state:!0},_dragging:{state:!0}};static styles=[Sa,pi];static getConfigElement(){return document.createElement("materia-level-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}),i=t.find(e=>e.startsWith("media_player."))||t.find(e=>e.startsWith("input_number."))||t.find(e=>e.startsWith("number."))||t.find(e=>e.startsWith("light."))||"";return{entity:i}}setConfig(e){if(!e.entity)throw new Error("Materia Level: entity is required");this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("label","_resolvedLabel"),this._resolveField("icon","_resolvedIcon"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("slider_color","_resolvedSliderColor"),this._resolveField("slider_track_color","_resolvedSliderTrackColor"),this._optimisticReconcile())}get _stateObj(){return this.hass?.states[this.config.entity]}get _domain(){return String(this.config.entity||"").split(".")[0]}get _attribute(){return this.config.attribute??za[this._domain]??null}get _scale(){const e=this._stateObj?.attributes||{},t=this.config.max_entity?Number(this.hass?.states?.[this.config.max_entity]?.state):NaN,i=Number.isFinite(t)?t*Ea(this.config.max_entity_factor,1):void 0,s=Ta[this._attribute]||{min:Ea(e.min,0),max:Ea(e.max,100),step:Ea(e.step,1),factor:1,unit:e.unit_of_measurement??""},a="percentage"===this._attribute?Ea(e.percentage_step,s.step):s.step;return{min:Ea(this.config.min,s.min),max:Ea(this.config.max??i,s.max),step:Ea(this.config.step,a),factor:s.factor,unit:this.config.unit??s.unit}}_optimisticActual(){const e=this._stateObj;if(!e)return null;const t=this._attribute?e.attributes?.[this._attribute]:e.state,i=Number(t);return Number.isFinite(i)?String(i):"light"===this._domain&&"off"===e.state?"0":null}get _current(){if(null!=this._dragging)return this._dragging;const e=Number(this._optimistic);return Number.isFinite(e)?e:null}_quantize(e,t){const{min:i,max:s,step:a}=t,n=a>0?Math.round((e-i)/a)*a+i:e,o=Math.min(s,Math.max(i,n));return Number(o.toFixed(Ma(a)))}_display(e,t){if(null==e)return"—";const i=e*t.factor,s=1===t.factor?Ma(t.step):0;return Number(i.toFixed(s)).toLocaleString(this.hass?.locale?.language||"en",{minimumFractionDigits:s,maximumFractionDigits:s})}_onDragging(e){e.stopPropagation();const t=Number(e.detail?.value);this._dragging=Number.isFinite(t)?t:null}_onCommit(e){e.stopPropagation();const t=Number(e.detail?.value);if(this._dragging=null,!Number.isFinite(t))return;const i=this._quantize(t,this._scale),s=this._stateObj;if(!s)return;const[a,n]=this._writeTarget();if(!a)return;if(this._fireHaptic("selection"),this._optimisticSet(i),!this.config.service&&"light"===this._domain&&i<=0)return void this._callService("light","turn_off",{entity_id:s.entity_id});const[o,r]=a.split(".");this._callService(o,r,{entity_id:s.entity_id,[n]:i})}_writeTarget(){if(this.config.service){const e=this.config.service_key||this._attribute||"value";return[String(this.config.service),e]}const e=Aa[this._domain];return e?[e[0],this.config.service_key||e[1]]:this._attribute?[`${this._domain}.set_${this._attribute}`,this.config.service_key||this._attribute]:[null,null]}_field(e,t){const i=this.config[e],s=this._isTemplate(i)?this[t]:i;return"string"==typeof s?s.trim():s}_controlTap(){if(this.config.control_action)return void this._handleAction(this.config.control_action);const e=this.config.control_entity;e&&this._callService("homeassistant","toggle",{entity_id:e})}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._scale,i=this._current,s=!e||this._isUnavailable(e)||"unknown"===e.state||null==i,a=this._field("label","_resolvedLabel")||e?.attributes?.friendly_name||this.config.entity,n=this._field("icon","_resolvedIcon"),o=this._field("color","_resolvedColor"),r=this._field("color_on","_resolvedColorOn"),l=this._field("slider_color","_resolvedSliderColor")||r||"var(--md-sys-color-primary, var(--primary-color))",c=this._field("slider_track_color","_resolvedSliderTrackColor")||"",d=this._display(i,t),h=t.unit,p=this.config.control_entity?this.hass.states[this.config.control_entity]:null,u=p&&!["off","unavailable","unknown"].includes(p.state),m=this.config.control_icon||"m3o:power-settings-new";return I`
      <ha-card class=${s?"unavailable":""} style="--ml-accent:${l};">
        <div class="level-row ${p?"with-control":""}">
          <div class="tile ${"flat"===this.config.variant?"flat":""}" style="${o?`background:${o};`:""}${r?`color:${r};`:""}">
            <div class="head">
              ${n?I`<ha-icon .icon=${n}></ha-icon>`:V}
              <span class="label">${a}</span>
              <span class="value"
                >${d}${h&&!s?I`<span class="unit">${h}</span>`:V}</span
              >
            </div>

            <!-- No show-label: the M3 value indicator would float a second copy
                 of the readout that already sits in the head row. -->
            <materia-slider
              .min=${t.min}
              .max=${t.max}
              .step=${t.step}
              .value=${i??t.min}
              .color=${l}
              .trackColor=${c}
              .label=${a}
              .size=${this.config.slider_size||"xs"}
              .stops=${!this.config.hide_stops}
              ?disabled=${s}
              @value-dragging=${this._onDragging}
              @value-changed=${this._onCommit}
            ></materia-slider>
          </div>
          ${p?I`<button
            class="control ${u?"on":""}"
            aria-label=${this.config.control_label||p.attributes?.friendly_name||a}
            aria-pressed=${u?"true":"false"}
            @click=${this._controlTap}
          ><ha-icon .icon=${m}></ha-icon></button>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 2}}customElements.define("materia-level",Oa),window.customCards=window.customCards||[],window.customCards.push({type:"materia-level",name:"Materia Level",description:"Entity-bound level row with an M3 Expressive slider — volumes, dimmers, number helpers, fan speeds.",preview:!0});const Fa=[Ee,ze,Ae,pi,ge,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      /* Everything scales off the card width, so one card works at 4 columns
         and at 12 without a breakpoint. Same approach as materia-lock. */
      container-type: inline-size;
    }

    /* Same asymmetric expressive silhouette as materia-hero and materia-lock,
       so an alarm stacked under either reads as the same family. */
    .body {
      position: relative;
      overflow: hidden;
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--ma-bg);
      color: var(--ma-fg);
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 5cqi, 26px);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* The siren overlay is an ::after, so every real child has to be lifted
       above it. Cheaper and safer than z-indexing the overlay negative, which
       would slip behind the card background. */
    .hero,
    .modes,
    .foot,
    .zones {
      position: relative;
      z-index: 1;
    }

    /* ---- TRIGGERED -------------------------------------------------------
       The one state that must be unmistakable across the room. The card
       floods the error pair (not a tint of it) and a slow siren wash breathes
       over the top. Deliberately the only looping animation on the card:
       everything else here is a one-shot or a gesture. */
    .body.triggered::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--md-sys-color-error);
      opacity: 0;
      pointer-events: none;
      animation: ma-siren 1.2s ease-in-out infinite alternate;
    }

    @keyframes ma-siren {
      to {
        opacity: 0.22;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .body.triggered::after {
        animation: none;
        opacity: 0.14;
      }
    }

    /* ---- hero ------------------------------------------------------------ */

    /* THE GAP HAS TO CLEAR A ROTATED SQUARE, which is what the earlier
       headroom sum missed: it counted the breathe and forgot the pose.
       transform does not affect layout, so the shape's box stays put while its
       CONTENT turns 45 degrees and its corners swing outside that box.

       For a rounded square of side s with a 30% corner, the farthest point is
       the corner arc: its centre sits sqrt(2) * (0.5s - 0.3s) = 0.283s from the
       middle, plus the 0.3s radius, so 0.583s against an unrotated half-width
       of 0.5s. The corners therefore overhang the box by 0.083s per side, and
       the breathe adds another 0.035s. Call it 0.118s of overhang: 20px at the
       168px ceiling, 17px at the 144px a phone actually renders, 13px at the
       112px floor.

       clamp(16px, 5cqi, 26px) covers all three — 16 against 13, 20 against 17,
       26 against 20 — and it is not a new number: it is the gap .body already
       uses, so the hero now breathes on the same rhythm as the card. */
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(16px, 5cqi, 26px);
      text-align: center;
    }

    /* The concept drew a 150px shape in a 412px frame, which is 36cqi. The
       clamp ends are held so it stays a recognisable shape in a narrow column
       and never dwarfs a wide one. */
    .shape {
      width: clamp(112px, 36cqi, 168px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      background: var(--ma-hero-bg);
      color: var(--ma-hero-fg);
      /* The sweep layer is clipped to the silhouette, so the fill takes the
         shape's own corner as it grows rather than showing a square edge. */
      position: relative;
      overflow: hidden;
      /* DISARMED is the circle and ARMED is the squared shape, so the corner
         itself carries the state. Expressed as a percentage, not px: a px
         radius at or above half the box renders identically to any larger
         value, so a px morph would sit visually still for most of its
         duration and then snap. */
      border-radius: 50%;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* THE TURN IS THE OTHER HALF OF THE MORPH, and it was missing.
         materia-lock's finding, in its own words: a circle rotating is
         invisible, a cornered shape rotating is unmistakable, so the corner
         change and the rotation reveal each other. This hero morphed its
         corner and never turned, which left the morph under-read at exactly
         the moment it matters most. 45deg is not a magic number: it is HALF
         this silhouette's rotational-symmetry period (a rounded square is
         4-fold, so the period is 90), which is the largest turn that still
         reads as movement before the shape maps back onto itself. Identical
         derivation and identical value to lock's SHAPE_STYLES.squircle.rot.

         Arming turns one way and disarming retraces the same arc backwards,
         so the shape ends every commit resting where the next one starts —
         the same mirroring lock gives its gesture.

         On the expressive spring, deliberately. The sweep on the mode buttons
         does NOT use it, because that fill travels to a hard stop inside a
         clipping box where a 15% overshoot has nowhere to go; this shape is
         free-standing with room to bounce, which is what the spring is for. */
      transform: rotate(0deg);
      transition: border-radius var(--md-sys-motion-expressive-default-spatial),
        transform var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .shape.armed {
      border-radius: 30%;
      transform: rotate(var(--ma-rot, 45deg));
    }

    .shape ha-icon {
      /* The .size-l 32px icon scaled to this shape: 72px on a 168px shape is
         the same glyph-to-box ratio materia-lock uses (96 on 236). */
      --mdc-icon-size: clamp(48px, 16cqi, 72px);
      /* THE GLYPH NEVER TURNS. This is a CSS box, not a vector silhouette with
         the icon as a sibling, so the icon lives inside the box that rotates
         and needs an equal and opposite turn to stay upright — exactly the
         distinction lock draws between its vector and squircle shapes. */
      transform: rotate(0deg);
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .shape.armed ha-icon {
      transform: rotate(calc(-1 * var(--ma-rot, 45deg)));
    }

    @media (prefers-reduced-motion: reduce) {
      .shape,
      .shape ha-icon {
        transition: background-color var(--md-sys-motion-default-effects),
          color var(--md-sys-motion-default-effects);
      }
    }

    /* THE ARMING SWEEP. Same two-face reveal the mode buttons use for the hold
       gesture, and the same --ma-p property driving it — one idea, one variable,
       one place to reason about it. The duplicate glyph is what keeps the icon
       legible from 0% to 100%: a single glyph over a fill that crosses it would
       go unreadable halfway. clip-path rather than width for the same reason it
       is clip-path there — the face inside must keep its full layout width, or
       the glyph would slide sideways as the fill passed it.

       No transition: the JS owns every frame, including its own coarsening
       under reduced motion. Easing this would make it lag the clock it is
       reporting. */
    .shape-fill {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background: var(--ma-sweep-bg);
      color: var(--ma-sweep-fg);
      pointer-events: none;
      clip-path: inset(0 calc(100% - var(--ma-p, 0) * 100%) 0 0);
    }

    /* THREE ANIMATIONS, ONE PROPERTY. The animation shorthand is a single
       property, so two rules setting it on .shape would silently cancel one
       another. Rather than lean on specificity, the precedence is written out:
       the fault mark outranks the receipt, which outranks the steady breathe.
       In time they barely overlap anyway — the receipt fires as busy ENDS —
       but the arbitration is explicit so it cannot rot.

       Each one also drives a DIFFERENT geometric channel, which is what lets
       them compose instead of fight: the pose owns transform, the receipt owns
       the standalone rotate property, the shake owns translate, and the
       breathe owns scale. That is why the shake below does not reuse lock's
       ml-jam-shake keyframes verbatim — those animate transform with a rotate
       and a translateX together, which on this shape would clobber the pose
       turn mid-shake. Same gesture, different channel. */

    /* BUSY AND INDETERMINATE — the fallback, for a wait nobody has told us the
       length of. It is deliberately NOT shown while the sweep runs: a
       determinate indicator and an indeterminate one saying the same thing at
       once is two answers to one question.

       BOTH NUMBERS CHANGED, and neither is taste. The period was 2s per
       half-cycle, which is off the M3 duration scale entirely — the longest
       token is extra-long-4 at 1000ms — so it is now exactly that token, which
       also doubles the pace and is most of what "too subtle" was about. The
       amplitude was 1.035 with nothing behind it; 7% of the hero's 168px
       ceiling is about 12px of travel against the roughly 6px that could not be
       read, and it still fits inside the 10-14px gap below the shape, so
       nothing collides at any card width. Geometry and a real token, rather
       than a number that looked nicer. */
    .shape.busy:not(.turn):not(.shake):not(.sweeping) {
      animation: ma-breathe 1000ms ease-in-out infinite alternate;
    }

    @keyframes ma-breathe {
      to {
        scale: 1.07;
      }
    }

    /* THE ARRIVAL RECEIPT. One turn of the SHAPE, never the glyph, when the
       panel finishes what the card was already optimistically claiming. Same
       duration and easing curve as lock's own tap receipt (ml-open-spin), and
       the same standalone-rotate trick so it composes with the pose rather
       than replacing it. Signed, so finishing a disarm unwinds and finishing
       an arm winds on. */
    .shape.turn:not(.shake) {
      animation: ma-turn 0.65s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    .shape.turn:not(.shake) ha-icon {
      animation: ma-turn-counter 0.65s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    @keyframes ma-turn {
      from {
        rotate: 0deg;
      }
      to {
        rotate: calc(var(--ma-turn-dir, 1) * 360deg);
      }
    }

    @keyframes ma-turn-counter {
      from {
        rotate: 0deg;
      }
      to {
        rotate: calc(var(--ma-turn-dir, 1) * -360deg);
      }
    }

    /* THE REFUSAL. A pin expired unanswered: the card asked, promised, and has
       just had to take the promise back. Lock's reading of its jam shake
       applies unchanged — "the mechanism tried and failed" — and it runs once,
       because a fault that lingers on screen for minutes does not need to keep
       shaking at you. Deliberately NOT used for the triggered state, which already
       floods the card and pulses a siren wash; a third mark there would be
       noise on the one state that is already impossible to miss. */
    .shape.shake {
      animation: ma-shape-shake 0.5s ease-in-out 1;
    }

    @keyframes ma-shape-shake {
      0%,
      100% {
        translate: 0;
      }
      20% {
        translate: -6px;
      }
      40% {
        translate: 5px;
      }
      60% {
        translate: -3px;
      }
      80% {
        translate: 2px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .shape.busy:not(.turn):not(.shake):not(.sweeping),
      .shape.turn:not(.shake),
      .shape.turn:not(.shake) ha-icon,
      .shape.shake {
        animation: none;
      }
    }

    /* headline-small to headline-large, interpolated. */
    .title {
      font-size: clamp(24px, 8cqi, 32px);
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }

    /* body-small to body-medium. Quieter, per the concept. */
    .sub {
      font-size: clamp(12px, 3.6cqi, 14px);
      line-height: 20px;
      font-weight: 500;
      opacity: 0.72;
    }

    .sub.warn {
      color: var(--md-sys-cust-color-warning, var(--md-sys-color-error));
      opacity: 1;
    }

    /* ---- mode row -------------------------------------------------------- */

    /* The 2px gutter and the no-clip container are the connected-group rules:
       every button computes its own corners, so a container radius here would
       silently erase the active button morph. */
    .modes {
      display: flex;
      gap: 2px;
      width: 100%;
      box-sizing: border-box;
    }

    button.mode {
      /* Content-sized, then grows to share leftover width, never shrinks —
         the connected-group flex rule. */
      flex: 1 0 auto;
      min-width: 0;
      height: 96px;
      position: relative;
      overflow: hidden;
      border: none;
      padding: 0;
      background: var(--ma-btn-bg);
      color: var(--ma-btn-fg);
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Touch scrolling is handled by the gesture state machine in index.js,
         which only locks the page once it has decided the press is a hold and
         not a scroll. */
      touch-action: pan-y;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        opacity var(--md-sys-motion-default-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* The expressive emphasis cue: the button you are standing in grows and
       its neighbours compress. 1.4 is the connected-group value. */
    button.mode.active {
      flex-grow: 1.4;
    }

    /* INERT: armed, and this is not the mode you are in. It cannot be
       actuated, so it takes M3 disabled content treatment (38%) rather than
       the concept illustration 50% — but it deliberately keeps pointer events,
       because pressing it has to explain itself instead of doing nothing. */
    button.mode.inert {
      opacity: 0.38;
    }

    button.mode:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* The refusal, visibly. Reuses the one-shot shake grammar materia-lock
       gives a jam: a mechanism that tried and did not move. */
    button.mode.refused {
      animation: ma-refuse 0.4s ease-in-out 1;
    }

    @keyframes ma-refuse {
      0%, 100% { translate: 0; }
      25% { translate: -4px; }
      50% { translate: 3px; }
      75% { translate: -2px; }
    }

    @media (prefers-reduced-motion: reduce) {
      button.mode.refused {
        animation: none;
      }
    }

    /* State layer, at the M3 values. */
    button.mode .layer {
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    button.mode:hover .layer {
      opacity: 0.08;
    }

    button.mode:active .layer {
      opacity: 0.1;
    }

    /* Two identical faces, one over the sweep and one under it. The sweep clip
       reveals the second face in the ink that reads against the swept fill, so
       label and hint stay legible from 0% to 100% without ever moving — a
       single face over a solid fill would go unreadable halfway across. */
    .face {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 0 8px;
      box-sizing: border-box;
      pointer-events: none;
    }

    .face ha-icon {
      /* .size-l icon rung. */
      --mdc-icon-size: 32px;
      flex-shrink: 0;
    }

    /* label-large. */
    .face .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* label-small, and quieter — it is instruction, not identity. */
    .face .hint {
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      opacity: 0.75;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* THE SWEEP. A left-anchored reveal of the committed face. clip-path
       rather than a scaled or width-driven box, because the face inside must
       keep its full layout width: scaling would squash the text and a width
       animation would re-centre it, so the label would crawl sideways as the
       fill passed. */
    .sweep {
      position: absolute;
      inset: 0;
      background: var(--ma-sweep);
      color: var(--ma-sweep-ink);
      pointer-events: none;
      clip-path: inset(0 calc(100% - var(--ma-p, 0) * 100%) 0 0);
    }

    /* Released short of the commit: the fill springs home on its own, so it
       gets easing. While the finger is down there is no transition at all —
       easing something that is following a finger reads as lag. */
    .sweep.settling {
      transition: clip-path var(--md-sys-motion-standard-fast-spatial);
    }

    /* ---- footnote -------------------------------------------------------- */

    /* body-small. Explains the gesture the row is offering right now. */
    .foot {
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      text-align: center;
      opacity: 0.72;
      padding: 0 8px;
    }

    .foot.warn {
      color: var(--md-sys-cust-color-warning, var(--md-sys-color-error));
      opacity: 1;
    }

    .foot.alert {
      color: var(--md-sys-color-error);
      opacity: 1;
      font-weight: 700;
    }

    /* ---- zones ----------------------------------------------------------- */

    .zones {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .zgroup {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* title-small. */
    .zgroup-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      opacity: 0.72;
      padding: 4px 4px 0;
    }

    /* M3 one-line list item: 56dp tall, 16dp side padding. Large corner (16)
       from the shape scale, so the rows sit in the same shape family as the
       card without competing with the mode row above. */
    .zrow {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 56px;
      padding: 8px 16px;
      box-sizing: border-box;
      border-radius: 16px;
      background: color-mix(in srgb, var(--ma-fg) 6%, transparent);
    }

    /* Not ready is the warning role, straight from the repo custom roles —
       the same amber the sweep turns, so the row and the gesture agree. */
    .zrow.notready {
      background: var(--md-sys-cust-color-warning-container, color-mix(in srgb, var(--ma-fg) 10%, transparent));
      color: var(--md-sys-cust-color-on-warning-container, var(--ma-fg));
    }

    .zrow ha-icon {
      --mdc-icon-size: 24px;
      flex-shrink: 0;
    }

    .zrow.notready > ha-icon {
      color: var(--md-sys-cust-color-warning, currentColor);
    }

    .ztext {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* body-large. */
    .zname {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* body-small. */
    .zstate {
      font-size: 12px;
      line-height: 16px;
      opacity: 0.7;
    }

    /* M3 assist chip geometry: 32dp tall, 8dp corner, label-large, 18dp
       leading icon. Used for both the bypass action and the bypassed chips, so
       the thing you press to bypass and the thing you press to undo it are
       visibly the same object in two states. */
    .chip {
      height: 32px;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      border: 1px solid var(--md-sys-color-outline-variant, var(--md-sys-color-outline));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .chip ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    .chip:hover {
      background: color-mix(in srgb, currentColor 8%, transparent);
    }

    .chip:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .chip:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* The way back. Solid outline and the primary role, against the dashed
       outline a bypassed zone wears — this chip RESTORES protection, so it
       should not look like the same kind of act as removing it. */
    .chip.undo {
      border-style: solid;
      border-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-primary);
    }

    /* The collapsed summary. A real button because it is a real control. */
    button.summary {
      width: 100%;
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }

    button.summary .chev {
      --mdc-icon-size: 20px;
      opacity: 0.6;
      transition: rotate var(--md-sys-motion-expressive-fast-spatial);
    }

    button.summary.open .chev {
      rotate: 180deg;
    }

    .zrow.ok > ha-icon {
      color: var(--md-sys-color-primary);
    }

    /* SENSING: a transient zone, currently detecting, holding its row.
       Tertiary, which is exactly the role M3 defines for a contrasting accent
       used to balance primary and secondary — a real third state that is
       neither the all-clear nor a warning. Deliberately NOT the warning role:
       amber means "this is blocking the arm", and a PIR watching you walk to
       the panel is not that. Only the ink changes, never the geometry, so a
       zone flapping every two seconds cannot move anything at all. */
    .zrow.sensing > ha-icon,
    .zrow.sensing .zstate {
      color: var(--md-sys-color-tertiary, var(--ma-fg));
    }

    .zrow.sensing > ha-icon {
      opacity: 1;
    }

    /* THE 24-HOUR GROUP. A detector in fault is a FAULT, not a decision — you
       cannot go and close a smoke detector — so it takes the error role rather
       than the amber that means "not ready, and you can act on it". All clear
       takes the same primary check the ready summary uses, because a fault
       category is one where confirming nothing is wrong is information the
       reader wants rather than absence they should infer.

       Only the ink changes between the two states. The row's geometry is
       identical either way, which is what keeps the group height-stable. */
    .zrow.safety-fault > ha-icon,
    .zrow.safety-fault .zname {
      color: var(--md-sys-color-error);
    }

    .zrow.safety-ok > ha-icon {
      color: var(--md-sys-color-primary);
    }

    /* A BYPASSED ZONE IS A HOLE IN THE PERIMETER, and it used to be the
       quietest thing on the card: a small dashed chip in a group sitting below
       the "everything is fine" summary. That is the dangerous direction — a
       skipped zone read as indistinguishable from a covered one.

       It is now a full row like a not-ready zone, in a group placed second from
       the top, with its count in the heading. The dashed outline stays, and is
       now the only thing carrying "deliberate exception" rather than "fault";
       everything else about the row says read me.

       Deliberately NOT the amber container. Amber is what the arming sweep
       turns for a zone blocking the arm, and a bypassed zone does not block it
       — it is excluded from it, which is a different fact. Tertiary is the role
       for a genuine third state that is neither all-clear nor warning, and a
       knowingly excluded zone is exactly that. */
    .zrow.bypassed {
      background: color-mix(in srgb, var(--md-sys-color-tertiary, var(--ma-fg)) 12%, transparent);
      /* Inside the box, so the row does not grow 2px against its neighbours. */
      border: 1px dashed var(--md-sys-color-tertiary, var(--md-sys-color-outline));
      box-sizing: border-box;
    }

    .zrow.bypassed > ha-icon,
    .zrow.bypassed .zname {
      color: var(--md-sys-color-tertiary, var(--ma-fg));
    }

    /* A heading that states a hole rather than labelling a list. */
    .zgroup-title.warn {
      color: var(--md-sys-color-tertiary, var(--ma-fg));
      opacity: 1;
      font-weight: 600;
    }

    /* UNAVAILABLE is deliberately NOT the warning role. A zone the panel
       cannot see is an unknown, not an open door, and spending the amber here
       would leave nothing louder to say "this one is actually open" — the
       seven permanently unavailable zones on this install would have owned the
       warning colour forever. Outline-variant ink on the plain row: present,
       readable, and visibly not a verdict. */
    .zrow.unavail {
      background: color-mix(in srgb, var(--ma-fg) 6%, transparent);
    }

    .zrow.unavail > ha-icon,
    .zrow.unavail .zname {
      color: var(--md-sys-color-on-surface-variant, var(--ma-fg));
      opacity: 0.85;
    }

    .note {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.7;
      text-align: center;
    }
  `],Da=[{value:"home",label:"Home"},{value:"away",label:"Away"},{value:"night",label:"Night"},{value:"vacation",label:"Vacation"},{value:"custom",label:"Custom bypass"}];class qa extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .options-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{hero:!0,footnote:!0,direct_switch:!1,zones_start_expanded:!1,show_unavailable:!0,hold_ms:800,hint_ms:2e3,pending_timeout_ms:2e4,zone_settle_ms:8e3,zone_flap_detect:!0,zone_flap_count:6,zone_flap_window_ms:6e4,allow_safety_bypass:!1,bypass_from_can_bypass:!0,bypass_from_can_bypass_when_not_ready:!1,...this._config}}_sectionsSignature(){const e=this.hass?.states[this._config?.entity];return[this._config?.entity||"",e?.attributes?.code_arm_required?"c":"",(this._config?.zones||[]).length,(this._config?.modes||[]).join(","),this._config?.zone_filter?"f":"",this._config?.bypass_action?"b":"",!1===this._config?.zone_flap_detect?"nf":"",this._config?.arming_duration_ms?"ad":""].join("|")}get _sections(){const e=this.hass?.states[this._config?.entity];return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",label:"Alarm panel",selector:{entity:{domain:["alarm_control_panel"]}},required:!0},{name:"modes",label:"Modes to offer (optional)",helper:"Leave empty to offer exactly what the panel reports it supports. Set this only to narrow the row or to change its order.",selector:{select:{multiple:!0,mode:"list",options:Da}}},...!!e?.attributes?.code_arm_required||!!e?.attributes?.code_format?[{name:"code",label:"Code",helper:"This panel asks for a code. Without one the hold is refused rather than firing a call the panel will reject. Note it is stored in plain text in the dashboard config.",selector:{text:{type:"password"}}}]:[]]},{title:"Gesture",icon:"mdi:gesture-tap-hold",fields:[{name:"hold_ms",label:"Hold for (ms, default 800)",helper:"Keep this above 500ms — the platform long-press timeout — or an ordinary long-press on the dashboard commits by accident.",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}},{name:"direct_switch",label:"Allow switching between armed modes",helper:"Off by default: while armed, the other modes are inert and must be disarmed through first. Leaving a house armed in the wrong shape is the mistake that gating prevents.",selector:{boolean:{}}},{name:"arming_duration_ms",label:"Exit delay (ms)",helper:"How long this panel takes to arm. Set it and the shape fills across the delay, showing how far through you are. Leave EMPTY and it breathes instead — the honest answer for a wait of unknown length, and better than a progress bar that finishes at the wrong moment. This is not the timeout below: that one is about silence, this one is about how the panel is programmed.",selector:{number:{min:1e3,max:6e5,step:1e3,mode:"box"}}},{name:"pending_duration_ms",label:"Entry delay (ms)",helper:"Same, for the countdown after someone comes in. Leave empty to breathe.",selector:{number:{min:1e3,max:6e5,step:1e3,mode:"box"}}},{name:"pending_timeout_ms",label:"Give up waiting for the panel after (ms, default 20000)",helper:"How long the card keeps showing the state you asked for before admitting the panel never answered. Counts SILENCE only — every arming or entry-delay read restarts it, so a long exit delay does not need a long timeout here.",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}},{name:"hint_ms",label:"How long a refusal hint stays up (ms, default 2000)",selector:{number:{min:500,max:8e3,step:100,mode:"box"}}}]},{title:"Zones",icon:"mdi:door-closed-lock",expanded:!1,fields:[{name:"zone_filter",label:"Find zones automatically",helper:"An entity_id prefix (sensor.ultrasync_zone) or a regex. Leave empty and add zones by hand below instead. A hand-written list always wins over this.",selector:{text:{}}},{name:"zone_pattern",label:"Zone number pattern (default zone(\\d+)state$)",helper:"How to read the panel's zone NUMBER out of an entity_id — the bypass services take a number, not an entity. A zone this does not match offers no Bypass button rather than firing a call with no zone.",selector:{text:{}}},{name:"zone_settle_ms",label:"Settle before a zone counts as ready again (ms, default 8000)",helper:"Going NOT ready is always immediate — that is the warning, and it must never be late. This only delays a zone leaving the not-ready list, so a door being closed does not make the card jump while a contact bounces.",selector:{number:{min:0,max:6e4,step:500,mode:"box"}}},{name:"zone_flap_detect",label:"Treat zones that flap as movement detectors",helper:"Last-resort fallback, for zones with nothing else to go on. A zone that changes repeatedly is behaving like a PIR, not a door: it keeps its place in the list and just recolours, instead of joining the not-ready group and turning the arm gesture amber. Zones are classified from device_class first, then from the integration's own icon, and a per-zone override always wins. Smoke, heat, gas and water zones are never reached by this.",selector:{boolean:{}}},{name:"zone_flap_count",label:"Changes before a zone counts as flapping (default 6)",selector:{number:{min:2,max:50,step:1,mode:"box"}}},{name:"zone_flap_window_ms",label:"Window those changes are counted over (ms, default 60000)",selector:{number:{min:1e3,max:6e5,step:1e3,mode:"box"}}},{name:"bypass_from_can_bypass",label:"Read can_bypass as the bypass indicator",helper:"On by default. Some panels never mark a zone's state as bypassed and instead stop allowing further bypass on it, so a can_bypass of false on an otherwise-ready zone means it is already skipped. Turn this off if your panel uses can_bypass to mean a zone can never be bypassed at all, or every such zone will be reported as skipped.",selector:{boolean:{}}},{name:"bypass_from_can_bypass_when_not_ready",label:"Trust can_bypass even when not ready",helper:"Off by default. Enable only when your panel uses can_bypass: false as the authoritative already-bypassed signal even while the zone state says Not Ready.",selector:{boolean:{}}},{name:"allow_safety_bypass",label:"Allow bypassing smoke and heat detectors",helper:"Off by default. The panel permits it, but skipping a 24-hour zone arms the house with fire detection deliberately excluded, and it does not fix the fault it hides. Turn this on only if you mean it.",selector:{boolean:{}}},{name:"bypass_action",label:"Bypass action",helper:"Fired by the Bypass button. Write {zone} anywhere in the data and the zone number is substituted in — e.g. ultrasync.bypass with data zone: {zone}. Leave empty to hide the button everywhere.",selector:{ui_action:{default_action:"none"}}},{name:"unbypass_action",label:"Un-bypass action",helper:"Fired by tapping a bypassed chip. Same {zone} substitution.",selector:{ui_action:{default_action:"none"}}}]},{title:"Layout",icon:"mdi:view-agenda-outline",fields:[{name:"hero",label:"Show the shape, state and sub-line",selector:{boolean:{}}},{name:"footnote",label:"Show the explanation line under the buttons",selector:{boolean:{}}},{name:"zones_start_expanded",label:"Start with the ready zones expanded",selector:{boolean:{}}},{name:"show_unavailable",label:"List zones the panel cannot see",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"armed_color",label:"Accent while armed (default primary)",helper:"Worn by the shape and by the active mode button, so the two read as one object.",color:!0,selector:{text:{}}},{name:"armed_color_on",label:"Ink on that accent",color:!0,selector:{text:{}}},{name:"background",label:"Card background",color:!0,selector:{text:{}}},{name:"background_on",label:"Card text",color:!0,selector:{text:{}}},{name:"disarmed_icon",label:'Shape glyph while disarmed (default "shield")',selector:{icon:{}}},{name:"triggered_icon",label:'Shape glyph while triggered (default "crisis-alert")',selector:{icon:{}}}]},{title:"Mode labels and icons",icon:"mdi:text-short",expanded:!1,fields:Da.flatMap(e=>[{name:`label_${e.value}`,label:`${e.label} — label`,selector:{text:{}}},{name:`icon_${e.value}`,label:`${e.label} — icon`,selector:{icon:{}}}])},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"Tapping the shape",selector:{ui_action:{default_action:"more-info"}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}get _zoneSchema(){return[{name:"entity",label:"Zone sensor",helper:'A door, window or contact. Not ready means on / open / unlocked, or the panel\'s own "Not Ready"; a state starting with "Bypass" counts as bypassed. Whether a Bypass button appears is the panel\'s call, via its can_bypass attribute.',selector:{entity:{domain:["binary_sensor","sensor","lock","cover","input_boolean","switch"]}}},{name:"name",label:"Name (optional — defaults to the entity name)",selector:{text:{}}},{name:"icon",label:"Icon (optional)",selector:{icon:{}}},{name:"safety",label:"24-hour zone (smoke, heat, gas, water)",helper:"Normally detected from device_class or the integration's icon, and remembered if the zone goes offline. Pin it here for a zone that is already unavailable when the dashboard loads, since there is nothing to read then. A 24-hour zone always blocks arming, never counts as a movement detector, and is not offered a Bypass button.",selector:{boolean:{}}},{name:"transient",label:"Movement detector",helper:"Overrides the automatic guess. On: this zone never blocks arming and never turns the gesture amber — it keeps its row and recolours. Off: it always blocks. Leave unset to classify from device_class, falling back to whether it flaps.",selector:{boolean:{}}}]}_zones(){return Array.isArray(this._config?.zones)?this._config.zones:[]}_commitZones(e){const t={...this._config};e.length?t.zones=e:delete t.zones,this._commit(t)}_addZone(){const e=[...this._zones(),{entity:""}];this._expanded=e.length-1,this._commitZones(e)}_removeZone(e){const t=[...this._zones()];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commitZones(t)}_moveZone(e,t){const i=[...this._zones()],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commitZones(i)}_updateZone(e,t){const i=[...this._zones()];i[e]={...i[e],...t},this._commitZones(i)}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_zoneTitle(e,t){if(e.name)return e.name;const i=e.entity?this.hass?.states[e.entity]:null;return i?.attributes?.friendly_name||e.entity||`Zone ${t+1}`}_renderExtra(){const e=this._zones();return I`
      <div class="options-header">
        <span>Zones</span>
        <ha-icon-button @click=${this._addZone}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">
        Only needed when you are NOT using "Find zones automatically" above, or
        when you want a curated subset. The card sorts these itself — whatever
        needs a decision floats to the top, unavailable zones next, and
        anything bypassed drops to the bottom — so this order only matters as a
        tie-break inside a group.
      </div>

      ${qe((e,t)=>this._moveZone(e,t),e.map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${this._zoneTitle(e,t)}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeZone(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._zoneSchema}
                        .computeLabel=${De}
                        @value-changed=${e=>this._updateZone(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}}customElements.define("materia-alarm-editor",qa);const Na=[{key:"home",feature:1,state:"armed_home",service:"alarm_arm_home",icon:"m3o:home",hero:"m3o:shield-person"},{key:"away",feature:2,state:"armed_away",service:"alarm_arm_away",icon:"m3o:directions-walk",hero:"m3o:shield-lock"},{key:"night",feature:4,state:"armed_night",service:"alarm_arm_night",icon:"m3o:bedtime",hero:"m3o:shield-moon"},{key:"vacation",feature:32,state:"armed_vacation",service:"alarm_arm_vacation",icon:"m3o:beach-access",hero:"m3o:shield-lock"},{key:"custom",feature:16,state:"armed_custom_bypass",service:"alarm_arm_custom_bypass",icon:"m3o:tune",hero:"m3o:shield-lock"}],Pa=new Set(Na.map(e=>e.state)),Ra=new Set(["arming","pending"]),La=new Set(["on","true","open","opening","unlocked","unlocking","detected","running","active","home"]),Ua=new Set(["motion","occupancy","presence","vibration","sound","moving","running","light"]),ja=new Set(["door","window","opening","garage_door","lock","tamper"]),Ba=new Set(["smoke","gas","heat","moisture","co","safety","problem"]),Ia=["fire","smoke","heat","gas","water","flood"],Ha=["motion","walk","presence","occupancy","radar"],Wa=["door","window","garage","gate","lock","shield","bell","wardrobe","cupboard","curtain","shutter","blind"],Va=me.ms;class Ga extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_pending:{state:!0},_holdKey:{state:!0},_settling:{state:!0},_hint:{state:!0},_refused:{state:!0},_zonesOpen:{state:!0},_unavailOpen:{state:!0},_safetyOpen:{state:!0},_turn:{state:!0},_shake:{state:!0},_sweeping:{state:!0}};static styles=Fa;static getConfigElement(){return document.createElement("materia-alarm-editor")}static getStubConfig(e){const t=e?Object.keys(e.states):[],i=t.find(e=>e.startsWith("alarm_control_panel.")),s=i?{entity:i}:{},a=t.find(e=>/^sensor\..*zone\d+state$/i.test(e));if(a){const t=a.split(".")[1].replace(/_?zone\d+state$/i,"");s.zone_filter="sensor."+t+"_zone";const i=e?.services?.[t];i?.bypass&&i?.unbypass&&(s.bypass_action={action:"perform-action",perform_action:t+".bypass",data:{zone:"{zone}"}},s.unbypass_action={action:"perform-action",perform_action:t+".unbypass",data:{zone:"{zone}"}})}return s}setConfig(e){this.config={...e}}constructor(){super(),this._pending=null,this._holdKey=null,this._p=0,this._settling=!1,this._hint=null,this._refused=null,this._zonesOpen=void 0,this._unavailOpen=!1,this._safetyOpen=!1,this._turn=!1,this._shake=!1,this._sweeping=!1,this._turnDir=1}connectedCallback(){super.connectedCallback(),this._unsub=Hi.subscribe(e=>{e===this.config?.entity&&this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=null,clearTimeout(this._pinTimer),clearTimeout(this._hintTimer),clearTimeout(this._refuseTimer),clearTimeout(this._turnTimer),clearTimeout(this._shakeTimer),clearTimeout(this._latchTimer),this._stopSweep(),this._cleanupGesture()}get _stateObj(){return this.hass?.states[this.config?.entity]}get _rawState(){return String(this._stateObj?.state??"")}get _state(){if(this._pending)return this._pending;const e=this._rawState;return Hi.peek(this.config.entity,e)||e}get _busy(){const e=this._rawState;return!!Ra.has(e)||!!this._pending&&e!==this._pending}get _triggered(){return"triggered"===this._state}get _disarming(){return"disarmed"===this._pending}get _armedish(){const e=this._state;return Pa.has(e)||Ra.has(e)||"triggered"===e}get _pose(){return this._armedish}get _reduceMotion(){return!!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches}get _features(){return Number(this._stateObj?.attributes?.supported_features??0)}get _modes(){const e=this._features;let t=Na.filter(t=>0!==(e&t.feature));t.length||this.config.modes||(t=Na.filter(e=>"home"===e.key||"away"===e.key));const i=this.config.modes;return Array.isArray(i)&&i.length&&(t=i.map(e=>{const t=String(e).replace(/^armed_/,"").replace("custom_bypass","custom");return Na.find(e=>e.key===t)}).filter(Boolean)),t}get _activeMode(){const e=this._modes,t=this._state,i=e.find(e=>e.state===t);return i||(("triggered"===t||"pending"===t||"arming"===t)&&(e.find(e=>e.state===this._lastArmed)||e[0])||null)}updated(e){const t=this._lastPose;if(this._lastPose=this._pose,t!==this._lastPose&&(this._poseAt=performance.now()),!e.has("hass"))return;const i=this._rawState;Pa.has(i)&&(this._lastArmed=i),this._pending&&(i===this._pending?this._clearPin():Ra.has(i)||i===this._pinFrom||this._clearPin()),this._punctuate(i)}_punctuate(e){const t=""!==e&&!Ra.has(e)&&"unavailable"!==e&&"unknown"!==e,i=this._lastSettled;t&&(this._lastSettled=e),t&&void 0!==i&&i!==e&&(performance.now()-(this._poseAt??-1/0)<Va||this._playTurn("disarmed"===e?-1:1))}get _armDurationMs(){const e="pending"===this._rawState||"pending"===this._state?"pending_duration_ms":"arming_duration_ms",t=Number(this.config?.[e]);return Number.isFinite(t)&&t>0?t:null}get _armAnchor(){const e=Ra.has(this._rawState)?Date.parse(this._stateObj?.last_changed??""):NaN,t=null!=this._pending?this._pinAt:void 0;return null!=t&&Number.isFinite(e)?Math.min(t,e):null!=t?t:Number.isFinite(e)?e:null}get _canSweep(){return this._busy&&null!=this._armDurationMs&&null!=this._armAnchor}_syncSweep(){this._canSweep?this._startSweep():this._stopSweep()}_startSweep(){if(this._sweepRaf)return;this._sweeping=!0;const e=()=>{if(!this._canSweep)return void this._stopSweep();const t=this._armDurationMs,i=Math.min(1,Math.max(0,(Date.now()-this._armAnchor)/t)),s=this._reduceMotion?1/Math.max(1,t/1e3):0,a=s?Math.floor(i/s)*s:i;this._applyArmP(Math.min(1,a)),this._sweepRaf=requestAnimationFrame(e)};this._sweepRaf=requestAnimationFrame(e)}_stopSweep(){this._sweepRaf&&(cancelAnimationFrame(this._sweepRaf),this._sweepRaf=null),this.shadowRoot?.querySelector(".shape")?.style.removeProperty("--ma-p"),this._sweeping=!1}_applyArmP(e){this.shadowRoot?.querySelector(".shape")?.style.setProperty("--ma-p",String(e))}_playTurn(e){this._reduceMotion||(clearTimeout(this._turnTimer),this._turnDir=e,this._turn=!1,requestAnimationFrame(()=>{this._turn=!0,this._turnTimer=setTimeout(()=>{this._turn=!1},650)}))}_playShake(){this._reduceMotion||(clearTimeout(this._shakeTimer),this._shake=!1,requestAnimationFrame(()=>{this._shake=!0,this._shakeTimer=setTimeout(()=>{this._shake=!1},500)}))}_clearPin(){this._pending=null,clearTimeout(this._pinTimer)}_zoneWord(e){const t=String(e?.state??"").trim();return t&&"unknown"!==t?t:String(e?.attributes?.status??e?.attributes?.state??t).trim()}_zoneUnavailable(e){if(!e)return!0;const t=this._zoneWord(e).toLowerCase();return""===t||"unavailable"===t||"unknown"===t||"none"===t}_zoneBypassed(e){return/^bypass/i.test(this._zoneWord(e))}_inferBypassed(e,t){if(this._zoneBypassed(e))return!0;if(t)return!1;if(!1===this.config?.bypass_from_can_bypass)return!1;if(!this.config?.unbypass_action)return!1;const i=e?.attributes?.can_bypass;return!(!1!==i&&"false"!==String(i).toLowerCase())&&(!0===this.config?.bypass_from_can_bypass_when_not_ready?!this._zoneUnavailable(e):!this._zoneUnavailable(e)&&!this._zoneNotReady(e))}_zoneNotReady(e){const t=this._zoneWord(e).toLowerCase();return"not ready"===t||"notready"===t||La.has(t)}get _zonePattern(){return this.config.zone_pattern??"zone(\\d+)state$"}_zoneNumber(e){const t=this._zonePattern;if(this.__zoneReSrc!==t){this.__zoneReSrc=t;try{this.__zoneRe=new RegExp(t,"i")}catch(e){this.__zoneRe=null}}if(!this.__zoneRe)return null;const i=this.__zoneRe.exec(String(e??""));if(!i||void 0===i[1])return null;const s=Number(i[1]);return Number.isFinite(s)?s:null}get _settleMs(){return Math.max(0,Number(this.config.zone_settle_ms??8e3))}_book(e){this._zoneBook??=new Map;let t=this._zoneBook.get(e);return t||(t={word:null,flips:[],latched:!1,readyAt:null},this._zoneBook.set(e,t)),t}_flapping(e,t){const i=Math.max(1e3,Number(this.config.zone_flap_window_ms??6e4)),s=Math.max(2,Number(this.config.zone_flap_count??6));for(;e.flips.length&&t-e.flips[0]>i;)e.flips.shift();return e.flips.length>=s}_classify(e,t,i,s){if("boolean"==typeof e?.safety)return{transient:!1,safety:e.safety,by:"config"};if("boolean"==typeof e?.transient)return{transient:e.transient,safety:!1,by:"config"};const a=t?.attributes;if(!!(!a||!a.device_class&&!a.icon)&&i.known)return{...i.known};const n=a?.device_class;if(n){if(Ba.has(n))return this._remember(i,{transient:!1,safety:!0,by:"device_class"});if(Ua.has(n))return this._remember(i,{transient:!0,safety:!1,by:"device_class"});if(ja.has(n))return this._remember(i,{transient:!1,safety:!1,by:"device_class"})}const o=String(a?.icon??"").toLowerCase();if(o){const e=e=>e.some(e=>o.includes(e));if(e(Ia))return this._remember(i,{transient:!1,safety:!0,by:"icon"});if(e(Ha))return this._remember(i,{transient:!0,safety:!1,by:"icon"});if(e(Wa))return this._remember(i,{transient:!1,safety:!1,by:"icon"})}if(!1===this.config.zone_flap_detect)return{transient:!1,safety:!1,by:"default"};const r=this._flapping(i,s);return{transient:r,safety:!1,by:r?"flapping":"default"}}_remember(e,t){return e.known=t,t}willUpdate(e){super.willUpdate?.(e),this._surveyZones(),this._syncSweep()}_surveyZones(){if(!this.hass||!this.config)return;const e=Date.now(),t=this._settleMs;let i=1/0;for(const s of this._zoneConfigs()){const a=this.hass.states[s.entity],n=this._book(s.entity),o=this._zoneWord(a);n.word!==o&&(null!==n.word&&n.flips.push(e),n.word=o);const r=this._classify(s,a,n,e),l=r.transient;n.transient=l,n.safety=r.safety,n.classifiedBy=r.by;const c=this._zoneUnavailable(a),d=!c&&this._inferBypassed(a,r.safety);!l&&!c&&!d&&this._zoneNotReady(a)?(n.latched=!0,n.readyAt=null):n.latched&&(null==n.readyAt&&(n.readyAt=e),e-n.readyAt>=t?(n.latched=!1,n.readyAt=null):i=Math.min(i,n.readyAt+t)),(c||d||l)&&n.latched&&(n.latched=!1,n.readyAt=null)}clearTimeout(this._latchTimer),i!==1/0&&(this._latchTimer=setTimeout(()=>this.requestUpdate(),Math.max(16,i-e)))}_zoneConfigs(){const e=Array.isArray(this.config.zones)?this.config.zones:null;return(e&&e.length?e:this._discoverZones()).filter(e=>e&&e.entity)}_discoverZones(){const e=this.config.zone_filter;if(!e||!this.hass?.states)return[];const t=String(e);let i;if(/[\\^$.*+?()[\]{}|]/.test(t))try{const e=new RegExp(t,"i");i=t=>e.test(t)}catch(e){i=e=>e.startsWith(t)}else i=e=>e.startsWith(t);return Object.keys(this.hass.states).filter(i).map(e=>({entity:e}))}_canSkip(e){if(e.unavailable)return!1;if(e.safety&&!0!==this.config.allow_safety_bypass)return!1;if(!this.config.bypass_action||null==e.zone)return!1;const t=e.st?.attributes?.can_bypass;return null==t||(!0===t||1===t||/^(true|yes|1)$/i.test(String(t)))}_canUnskip(e){return!!this.config.unbypass_action&&null!=e.zone}get _selfBypassed(){return this.__selfBypassed??=new Set,this.__selfBypassed}_canUndo(e){return!!this._canUnskip(e)&&(e.bypassed||this._selfBypassed.has(e.entity))}get _zones(){const e=this._zoneConfigs().map(e=>{const t=this.hass?.states[e.entity],i=this._zoneBook?.get(e.entity),s=i?.transient??!1,a=i?.safety??!1,n=this._zoneUnavailable(t),o=!n&&this._inferBypassed(t,a),r=!n&&!o&&this._zoneNotReady(t),l={...e,st:t,zone:this._zoneNumber(e.entity),unavailable:n,bypassed:o,transient:s,safety:a,classifiedBy:i?.classifiedBy??"default",sensing:s&&r,open:i?!s&&i.latched:!s&&r,name:e.name||t?.attributes?.friendly_name||t?.attributes?.name||e.entity,icon:e.icon||t?.attributes?.icon||"m3o:sensors"};return l.skippable=this._canSkip(l),l.unskippable=this._canUnskip(l),l.undoable=this._canUndo(l),l}).filter(e=>!1!==this.config.show_unavailable||!e.unavailable),t=e=>e.bypassed?3:e.open?0:e.unavailable?1:2;return e.sort((e,i)=>{const s=t(e)-t(i);return s||(null!=e.zone&&null!=i.zone?e.zone-i.zone:String(e.name).localeCompare(String(i.name)))})}_notReady(e){return e.filter(e=>e.open)}_withZone(e,t){if("string"==typeof e)return"{zone}"===e.trim()?t:e.includes("{zone}")?e.split("{zone}").join(String(t)):e;if(Array.isArray(e))return e.map(e=>this._withZone(e,t));if(e&&"object"==typeof e){const i={};for(const[s,a]of Object.entries(e))i[s]=this._withZone(a,t);return i}return e}_fireZoneAction(e,t){const i="bypass"===t?this.config.bypass_action:this.config.unbypass_action;i&&null!=e.zone&&("bypass"!==t||e.skippable)&&("bypass"===t?this._selfBypassed.add(e.entity):this._selfBypassed.delete(e.entity),this._handleAction(this._withZone(i,e.zone)),this.requestUpdate())}get _holdMs(){return Math.max(300,Number(this.config.hold_ms??800))}_isInert(e){if(this.config.direct_switch)return!1;const t=this._activeMode;return!!t&&t.key!==e.key}_showHint(e,t,i="warning"){clearTimeout(this._hintTimer),clearTimeout(this._refuseTimer),this._hint={key:e,text:t},this._refused=e,this._fireHaptic(i),this._hintTimer=setTimeout(()=>{this._hint=null},Number(this.config.hint_ms??2e3)),this._refuseTimer=setTimeout(()=>{this._refused=null},450)}_refusalFor(e){if(this._isInert(e))return $e("al_hint_disarm_first",this.hass);return this._activeMode?.key===e.key||!this._stateObj?.attributes?.code_arm_required||this.config.code?null:$e("al_hint_code_required",this.hass)}_onPointerDown(e,t){if(this._isUnavailable(this._stateObj))return;if(e.button&&0!==e.button)return;if(!e.isPrimary)return;if("touch"===e.pointerType&&e.clientX<=30)return;const i=this._refusalFor(t);i?this._showHint(t.key,i):(this._startX=e.clientX,this._startY=e.clientY,this._pointerId=e.pointerId,this._scrollIntent=!1,this._holdEl=e.currentTarget,this._target=e.currentTarget,this._onUpRef=this._onPointerUp.bind(this),window.addEventListener("pointerup",this._onUpRef),window.addEventListener("pointercancel",this._onUpRef),this._onEarlyMoveRef=this._onEarlyMove.bind(this),window.addEventListener("pointermove",this._onEarlyMoveRef),this._engage(t))}_onEarlyMove(e){if(this._scrollIntent)return;const t=Math.abs(e.clientX-this._startX),i=Math.abs(e.clientY-this._startY);i>10&&i>t+4&&(this._scrollIntent=!0,this._release(!1))}_engage(e){if(!this._holdKey){this._holdKey=e.key,this._settling=!1,this._p=0,this._engagedAt=Date.now(),this._holdMode=e;try{this._target?.setPointerCapture?.(this._pointerId)}catch(e){}this._target&&(document.documentElement.style.setProperty("touch-action","none"),document.documentElement.style.setProperty("overscroll-behavior","contain"),this._target.addEventListener("touchmove",this._preventTouch,{passive:!1})),this._onVisibilityRef=()=>{document.hidden&&this._release(!1)},document.addEventListener("visibilitychange",this._onVisibilityRef),this._tick=this._tick.bind(this),this._raf=requestAnimationFrame(this._tick)}}_applyP(){this._holdEl?.style.setProperty("--ma-p",String(this._p))}_preventTouch(e){e.preventDefault()}_tick(){if(!this._holdKey)return;const e=Math.min(1,(Date.now()-this._engagedAt)/this._holdMs);this._p=e,e>=1?this._commit():(this._applyP(),this._raf=requestAnimationFrame(this._tick))}_onPointerUp(e){if("pointercancel"===e.type&&this._engagedAt&&Date.now()-this._engagedAt<150)return clearTimeout(this._graceTimer),void(this._graceTimer=setTimeout(()=>this._release(!1),400));clearTimeout(this._graceTimer),this._release(!1)}_release(e){(this._holdKey||null!=this._startX)&&(e?this._commit():(this._settling=!0,this._p=0,this._cleanupGesture()))}_commit(){const e=this._holdMode;if(this._cleanupGesture(),!e)return;const t=this._activeMode?.key===e.key,i=t?"disarmed":e.state,s=t?"alarm_disarm":e.service;this._settling=!1,this._p=0,this._pinFrom=this._rawState,this._pinAt=Date.now(),this._pending=i,clearTimeout(this._pinTimer),this._armPinExpiry(),Hi.publish(this.config.entity,i,this._pinFrom);const a={entity_id:this.config.entity};this.config.code&&(a.code=String(this.config.code)),this._fireHaptic("success"),this._callService("alarm_control_panel",s,a)}_armPinExpiry(){clearTimeout(this._pinTimer),this._pinTimer=setTimeout(()=>{this._pending&&(Ra.has(this._rawState)?this._armPinExpiry():(this._pending=null,this._fireHaptic("warning"),this._playShake()))},Number(this.config.pending_timeout_ms??2e4))}_cleanupGesture(){if(this._holdEl?.style.removeProperty("--ma-p"),this._holdKey=null,this._holdMode=null,this._holdEl=null,this._startX=null,this._engagedAt=null,this._scrollIntent=!1,clearTimeout(this._graceTimer),this._raf&&(cancelAnimationFrame(this._raf),this._raf=null),document.documentElement.style.removeProperty("touch-action"),document.documentElement.style.removeProperty("overscroll-behavior"),this._target){this._target.removeEventListener("touchmove",this._preventTouch);try{this._target.releasePointerCapture?.(this._pointerId)}catch(e){}this._target=null}this._onVisibilityRef&&(document.removeEventListener("visibilitychange",this._onVisibilityRef),this._onVisibilityRef=null),this._onEarlyMoveRef&&(window.removeEventListener("pointermove",this._onEarlyMoveRef),this._onEarlyMoveRef=null),this._onUpRef&&(window.removeEventListener("pointerup",this._onUpRef),window.removeEventListener("pointercancel",this._onUpRef),this._onUpRef=null)}_isHoldKey(e){return"Enter"===e.key||" "===e.key||"Spacebar"===e.key}_onKeyDown(e,t){if(!this._isHoldKey(e))return;if(e.preventDefault(),e.repeat)return;if(this._isUnavailable(this._stateObj))return;const i=this._refusalFor(t);i?this._showHint(t.key,i):(this._target=null,this._holdEl=e.currentTarget,this._engage(t))}_onKeyUp(e){this._isHoldKey(e)&&this._release(!1)}_time(e){if(!e)return"";const t=this.hass?.locale?.language||"en";return new Date(e).toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}_modeLabel(e){return this.config[`label_${e.key}`]??$e(`al_mode_${e.key}`,this.hass)}_title(){const e=this._state;if(this._isUnavailable(this._stateObj))return $e("unavailable",this.hass);if("triggered"===e)return $e("al_state_triggered",this.hass);if("arming"===e)return $e("al_state_arming",this.hass);if("pending"===e)return $e("al_state_pending",this.hass);if("disarmed"===e)return $e("al_state_disarmed",this.hass);const t=Na.find(t=>t.state===e);return $e(t?`al_state_armed_${t.key}`:"al_state_unknown",this.hass)}_sub(e){const t=this._state,i=this._stateObj;if(this._isUnavailable(i))return{text:$e("al_sub_unavailable",this.hass),warn:!0};if("triggered"===t)return{text:$e("al_sub_triggered",this.hass,{time:this._time(i?.last_changed)}),warn:!0};if("pending"===t)return null==this._pending?{text:"",warn:!1}:{text:$e("al_sub_pending",this.hass),warn:!0};if(this._busy)return null==this._pending?{text:"",warn:!1}:{text:$e(this._disarming?"al_sub_disarming":"al_sub_arming",this.hass),warn:!1};if("disarmed"===t){if(!e.length)return{text:$e("al_sub_ready",this.hass),warn:!1};return{text:$e(1===e.length?"al_sub_not_ready_one":"al_sub_not_ready",this.hass,{n:e.length}),warn:!0}}return Pa.has(t)?{text:$e("al_sub_armed_since",this.hass,{time:this._time(i?.last_changed)}),warn:!1}:{text:"",warn:!1}}_buttonHint(e){return this._hint?.key===e.key?this._hint.text:this._holdKey===e.key?$e("al_hint_holding",this.hass):this._busy&&this._disarming?$e("al_hint_disarming",this.hass):this._isInert(e)?$e("al_hint_disarm_first",this.hass):this._activeMode?.key===e.key?"pending"===this._rawState?$e("al_hint_hold_to_disarm",this.hass):this._busy?$e(this._disarming?"al_hint_disarming":"al_hint_arming",this.hass):$e("al_hint_hold_to_disarm",this.hass):$e("al_hint_hold_to_arm",this.hass)}_footnote(e){if(this._hint)return{text:this._hint.text,tone:"warn"};const t=this._state,i=this._activeMode;if(this._isUnavailable(this._stateObj))return{text:$e("al_sub_unavailable",this.hass),tone:"warn"};if("triggered"===t)return{text:$e("al_foot_triggered",this.hass,{mode:i?this._modeLabel(i):""}),tone:"alert"};if("pending"===t)return{text:$e("al_foot_pending",this.hass),tone:"alert"};if(this._busy)return this._disarming?{text:"",tone:""}:{text:$e("al_hint_hold_to_disarm",this.hass),tone:""};if(i){return{text:$e("al_foot_armed",this.hass,{mode:this._modeLabel(i)})+(this.config.direct_switch||this._modes.length<2?"":` ${$e("al_foot_locked_modes",this.hass)}`),tone:""}}return{text:$e("al_foot_disarmed",this.hass),tone:""}}_radius(e,t,i){if(i)return"28px";const s="48px",a="16px";return 1===t?s:0===e?`${s} ${a} ${a} ${s}`:e===t-1?`${a} ${s} ${s} ${a}`:a}render(){if(!this.hass||!this.config)return I``;const e="--ma-bg:var(--md-sys-color-surface-container-low, var(--card-background-color));--ma-fg:var(--md-sys-color-on-surface);";if(!this.config.entity)return I`<ha-card style=${e}><div class="body">
        <div class="note">${$e("al_needs_entity",this.hass)}</div>
      </div></ha-card>`;const t=this._stateObj;if(!t)return I`<ha-card style=${e}><div class="body">
        <div class="note">${$e("entity_not_found_with_id",this.hass,{entity:this.config.entity})}</div>
      </div></ha-card>`;const i=this._isUnavailable(t),s=this._zones,a=this._notReady(s),n=this._triggered,o=this._armedish,r=this._modes,l=this._activeMode,c=n?"var(--md-sys-color-error-container)":this.config.background??"var(--md-sys-color-surface-container-low, var(--card-background-color))",d=n?"var(--md-sys-color-on-error-container)":this.config.background_on??"var(--md-sys-color-on-surface)",h=this.config.armed_color??"var(--md-sys-color-primary)",p=this.config.armed_color_on??"var(--md-sys-color-on-primary)",u=this._canSweep&&!n,m=n?"var(--md-sys-color-error)":o?u?`color-mix(in srgb, ${h} 30%, transparent)`:h:`color-mix(in srgb, ${d} 12%, transparent)`,g=n?"var(--md-sys-color-on-error)":o?u?h:p:h,f=n?this.config.triggered_icon??"m3o:crisis-alert":l&&Pa.has(this._state)?this.config[`icon_${l.key}`]??l.hero:this.config.disarmed_icon??"m3o:shield",_=this._sub(a),b=this._footnote(a),v=this.config.tap_action||{action:"more-info",entity:this.config.entity},y="none"!==v.action;return I`
      <ha-card class=${i?"unavailable":""} style="--ma-bg:${c};--ma-fg:${d};">
        <div class="body ${n?"triggered":""}">
          ${!1===this.config.hero?V:I`
                <div class="hero">
                  <div
                    class="shape ${o?"armed":""} ${this._busy?"busy":""} ${u?"sweeping":""} ${this._turn?"turn":""} ${this._shake?"shake":""}"
                    style="--ma-hero-bg:${m};--ma-hero-fg:${g};--ma-sweep-bg:${h};--ma-sweep-fg:${p};--ma-turn-dir:${this._turnDir};${y?"":"cursor:default;"}"
                    role=${y?"button":"img"}
                    tabindex=${y?0:-1}
                    aria-label=${this._title()}
                    @click=${()=>y&&this._handleAction(v)}
                    @keydown=${e=>{y&&("Enter"!==e.key&&" "!==e.key&&"Spacebar"!==e.key||(e.preventDefault(),this._handleAction(v)))}}
                  >
                    <ha-icon .icon=${f}></ha-icon>
                    ${u?I`<div class="shape-fill" aria-hidden="true">
                          <ha-icon .icon=${f}></ha-icon>
                        </div>`:V}
                  </div>
                  <div>
                    <div class="title">${this._title()}</div>
                    ${_.text?I`<div class="sub ${_.warn?"warn":""}">${_.text}</div>`:V}
                  </div>
                </div>
              `}

          ${r.length?I`
                <div class="modes" role="group" aria-label=${$e("al_aria_modes",this.hass)}>
                  ${r.map((e,t)=>this._renderMode(e,t,r.length,{active:l,notReady:a,triggered:n,accent:h,accentOn:p,idleBg:"var(--md-sys-color-secondary-container)",idleFg:"var(--md-sys-color-on-secondary-container)",unavailable:i}))}
                </div>
              `:I`<div class="note">${$e("al_no_modes",this.hass)}</div>`}

          ${!1!==this.config.footnote&&b.text?I`<div class="foot ${b.tone}" aria-live="polite">${b.text}</div>`:V}

          ${s.length?this._renderZones(s):V}
        </div>
      </ha-card>
    `}_renderMode(e,t,i,s){const a=s.active?.key===e.key,n=this._isInert(e),o=this._holdKey===e.key,r=this._modeLabel(e),l=n?"m3o:lock":this.config[`icon_${e.key}`]??e.icon,c=a?s.triggered?"var(--md-sys-color-error)":s.accent:s.idleBg,d=a?s.triggered?"var(--md-sys-color-on-error)":s.accentOn:s.idleFg,h=!a&&s.notReady.length>0,p=h?"var(--md-sys-cust-color-warning, var(--md-sys-color-error))":a?s.idleBg:s.accent,u=h?"var(--md-sys-cust-color-on-warning, var(--md-sys-color-on-error))":a?s.idleFg:s.accentOn,m=n?$e("al_aria_inert",this.hass,{mode:r}):a?$e("al_aria_hold_disarm",this.hass):$e("al_aria_hold_arm",this.hass,{mode:r}),g=this._buttonHint(e),f=I`
      <ha-icon .icon=${l}></ha-icon>
      <span class="label">${r}</span>
      <span class="hint">${g}</span>
    `;return I`
      <button
        class="mode ${a?"active":""} ${n?"inert":""} ${this._refused===e.key?"refused":""}"
        style="border-radius:${this._radius(t,i,a)};--ma-btn-bg:${c};--ma-btn-fg:${d};--ma-sweep:${p};--ma-sweep-ink:${u};--ma-p:${o?this._p:0};"
        aria-label=${m}
        aria-pressed=${a?"true":"false"}
        ?disabled=${s.unavailable}
        @pointerdown=${t=>this._onPointerDown(t,e)}
        @keydown=${t=>this._onKeyDown(t,e)}
        @keyup=${e=>this._onKeyUp(e)}
        @blur=${()=>this._release(!1)}
        @contextmenu=${e=>e.preventDefault()}
      >
        <div class="face">${f}</div>
        <div class="sweep ${this._settling&&!o?"settling":""}">
          <div class="face">${f}</div>
        </div>
        <div class="layer"></div>
      </button>
    `}get _zonesExpanded(){return this._zonesOpen??!!this.config.zones_start_expanded}get _unavailExpanded(){return!!this._unavailOpen}get _safetyExpanded(){return!!this._safetyOpen}_zoneRow(e,t=""){const i=e.sensing?$e("al_zone_sensing",this.hass):this.hass.formatEntityState?.(e.st)??this._zoneWord(e.st);return I`
      <div class="zrow ${t} ${e.sensing?"sensing":""}">
        <ha-icon .icon=${e.icon}></ha-icon>
        <div class="ztext">
          <span class="zname">${e.name}</span>
          <span class="zstate">${i}</span>
        </div>
        ${e.undoable?I`
              <button
                class="chip undo"
                aria-label=${$e("al_aria_unbypass",this.hass,{name:e.name})}
                @click=${()=>this._fireZoneAction(e,"unbypass")}
              >
                <ha-icon icon="m3o:visibility"></ha-icon>
                <span>${$e("al_zone_unbypass",this.hass)}</span>
              </button>
            `:e.skippable?I`
              <button
                class="chip"
                aria-label=${$e("al_aria_bypass",this.hass,{name:e.name})}
                @click=${()=>this._fireZoneAction(e,"bypass")}
              >
                <ha-icon icon="m3o:visibility-off"></ha-icon>
                <span>${$e("al_zone_bypass",this.hass)}</span>
              </button>
            `:V}
      </div>
    `}_zoneSummary({icon:e,cls:t,label:i,aria:s,open:a,toggle:n,rows:o}){return I`
      <div class="zgroup">
        <button
          class="zrow summary ${t} ${a?"open":""}"
          aria-expanded=${a?"true":"false"}
          aria-label=${s||i}
          @click=${n}
        >
          <ha-icon .icon=${e}></ha-icon>
          <div class="ztext"><span class="zname">${i}</span></div>
          <ha-icon class="chev" icon="m3of:arrow-drop-down"></ha-icon>
        </button>
        ${a?o.map(e=>this._zoneRow(e)):V}
      </div>
    `}_renderZones(e){const t=e.filter(e=>e.safety),i=t.filter(e=>e.open||e.unavailable),s=e.filter(e=>e.open&&!e.safety),a=e.filter(e=>e.unavailable&&!e.safety),n=e.filter(e=>e.bypassed&&!e.safety),o=e.filter(e=>!(e.open||e.bypassed||e.unavailable||e.safety)),r=o.filter(e=>e.sensing).length,l=[...t].sort((e,t)=>{const i=e.open||e.unavailable?0:1,s=t.open||t.unavailable?0:1;return i!==s?i-s:null!=e.zone&&null!=t.zone?e.zone-t.zone:String(e.name).localeCompare(String(t.name))});return I`
      <div class="zones">
        ${s.length?I`
              <div class="zgroup">
                <div class="zgroup-title">${$e("al_zones_not_ready",this.hass)}</div>
                ${s.map(e=>this._zoneRow(e,"notready"))}
              </div>
            `:V}

        ${n.length?I`
              <div class="zgroup">
                <div class="zgroup-title warn">
                  ${$e(1===n.length?"al_zones_bypassed_one":"al_zones_bypassed_count",this.hass,{n:n.length})}
                </div>
                ${n.map(e=>this._zoneRow(e,"bypassed"))}
              </div>
            `:V}

        ${t.length?this._zoneSummary({icon:i.length?"m3o:warning":"m3of:check-circle",cls:i.length?"safety-fault":"safety-ok",label:i.length?$e(1===i.length?"al_zones_safety_fault_one":"al_zones_safety_fault",this.hass,{n:i.length}):$e(1===t.length?"al_zones_safety_ok_one":"al_zones_safety_ok",this.hass,{n:t.length}),aria:$e("al_aria_safety_toggle",this.hass),open:this._safetyExpanded,toggle:()=>{this._safetyOpen=!this._safetyExpanded},rows:l}):V}

        ${a.length?this._zoneSummary({icon:"m3o:sensors-off",cls:"unavail",label:$e(1===a.length?"al_zones_unavailable_one":"al_zones_unavailable",this.hass,{n:a.length}),aria:$e("al_aria_unavail_toggle",this.hass),open:this._unavailExpanded,toggle:()=>{this._unavailOpen=!this._unavailExpanded},rows:a}):V}

        ${o.length?this._zoneSummary({icon:"m3of:check-circle",cls:"ok",label:r?$e("al_zones_ready_sensing",this.hass,{n:o.length-r,m:r}):$e(1===o.length?"al_zones_ready_one":"al_zones_ready_count",this.hass,{n:o.length}),aria:$e("al_aria_zones_toggle",this.hass),open:this._zonesExpanded,toggle:()=>{this._zonesOpen=!this._zonesExpanded},rows:o}):V}

      </div>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 6+(!!this.config?.zone_filter||Array.isArray(this.config?.zones)&&this.config.zones.length>0?2:0)}}customElements.define("materia-alarm",Ga),window.customCards=window.customCards||[],window.customCards.push({type:"materia-alarm",name:"Materia Alarm",description:"Alarm panel where arming IS the gesture: press and hold the mode you want. Zone list with bypass, and the not-ready warning lives inside the hold.",preview:!0});const Xa=[Ee,ze,Ae,pi,ge,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: clamp(8px, 2.5cqi, 12px);
      /* No background of its own: this card is a control, not a panel, so it
         sits on whatever it is placed on. The track and the active face carry
         all the colour. */
      background: transparent;
    }

    /* label-medium, uppercase — the quiet line that says what this control is
       for, above a track whose own label is an instruction. */
    .eyebrow {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 0.65;
      padding: 0 4px;
    }

    materia-drag-confirm {
      width: 100%;
      --mdc-track: var(--mc-track);
      --mdc-ink: var(--mc-ink);
      --mdc-handle: var(--mc-handle);
      --mdc-handle-ink: var(--mc-handle-ink);
    }

    /* THE ACTIVE FACE. Same 96px rung and same 28px corner as the track it
       replaces, so flipping between them never moves anything else on the
       dashboard by a pixel. */
    button.active-face {
      width: 100%;
      height: 96px;
      box-sizing: border-box;
      border: none;
      border-radius: 28px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      background: var(--mc-active-bg);
      color: var(--mc-active-fg);
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    button.active-face:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    button.active-face .layer {
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    button.active-face:hover .layer {
      opacity: 0.08;
    }

    button.active-face:active .layer {
      opacity: 0.1;
    }

    button.active-face ha-icon {
      --mdc-icon-size: 32px;
      flex-shrink: 0;
    }

    .face-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      flex: 1;
    }

    /* M3 title-medium. */
    .face-label {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 label-medium — the "tap to stop" half of the active face. */
    .face-hint {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* THE WARNING, and the reason this card can replace a modal at all.
       M3 body-medium. A confirmation dialog shows its warning only after you
       have already committed to acting, and only once; this line is on screen
       BEFORE the gesture is touched and stays there while it is held. That is
       strictly more informative than the dialog it replaces, which is what
       makes dropping the dialog defensible rather than a shortcut. */
    .caption {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.25px;
      opacity: 0.78;
      padding: 0 4px;
    }

    .caption.warn {
      color: var(--md-sys-cust-color-warning, var(--md-sys-color-error));
      opacity: 1;
    }

    .note {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.7;
      text-align: center;
      padding: 8px 4px;
    }

    @media (prefers-reduced-motion: reduce) {
      button.active-face,
      button.active-face .layer {
        transition: none;
      }
    }
  `];customElements.define("materia-confirm-editor",class extends We{_formData(){return{gesture:"hold",require_gesture:"activate",hold_ms:800,threshold:.55,pending_timeout_ms:1e4,caption_warn:!0,...this._config}}_sectionsSignature(){return[this._config?.entity?"e":"",this._config?.gesture||"hold",this._config?.require_gesture||"activate",this._config?.action?"a":""].join("|")}get _sections(){const e="slide"!==(this._config?.gesture??"hold"),t=!!this._config?.entity;return[{title:"Setup",icon:"mdi:tune",fields:[{name:"entity",label:"Entity to reflect and drive (optional)",helper:"With an entity and no actions below, the gesture turns it on and the active face turns it off — nothing else to configure. Leave empty to fire an action only.",selector:{entity:{}}},...t?[{name:"active_state",label:"State that counts as active",helper:'Defaults to the usual on/open/unlocked family. Set this for a control whose "on" is spelled something else.',selector:{text:{}}}]:[],{name:"action",label:"Action when committing",helper:"Fired when the gesture completes. Overrides the default turn-on.",selector:{ui_action:{default_action:"none"}}},{name:"deactivate_action",label:"Action when switching off",helper:"Fired by the active face. Overrides the default turn-off.",selector:{ui_action:{default_action:"none"}}}]},{title:"Gesture",icon:"mdi:gesture-tap-hold",fields:[{name:"gesture",label:"Commit gesture",selector:{select:{mode:"dropdown",options:[{value:"hold",label:"Press and hold"},{value:"slide",label:"Slide across"}]}}},{name:"require_gesture",label:"Which direction needs the gesture",helper:"Turning ON only, by default: switching an override off returns things to normal and costs nothing, and making the cheap direction ceremonial teaches people the gesture is a formality. Choose both where OFF is the dangerous direction — a control that disables a protection rather than enabling a cost.",selector:{select:{mode:"dropdown",options:[{value:"activate",label:"Only turning on"},{value:"both",label:"Both directions"}]}}},...e?[{name:"hold_ms",label:"Hold for (ms, default 800)",helper:"Keep this above 500ms — the platform long-press timeout — or an ordinary long-press commits by accident.",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}}]:[{name:"threshold",label:"Fraction of the track to cross (default 0.55)",selector:{number:{min:.2,max:1,step:.05,mode:"box"}}}],...t?[{name:"pending_timeout_ms",label:"Give up waiting for the entity after (ms, default 10000)",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}}]:[]]},{title:"Words",icon:"mdi:text-short",fields:[{name:"eyebrow",label:"Eyebrow (optional)",template:!0,selector:{text:{}}},{name:"label",label:"Gesture label",helper:"The instruction across the track. Keep it short — it sits on one line.",template:!0,selector:{text:{}}},{name:"caption",label:"Warning / consequence line",helper:"THE POINT OF THIS CARD. Shown before the gesture is touched and while it is held, which is strictly more informative than a dialog that appears after the decision and gets dismissed by reflex. Put the cost or the consequence here.",template:!0,selector:{text:{}}},{name:"caption_warn",label:"Colour the warning line",selector:{boolean:{}}},{name:"active_label",label:"Label while active",template:!0,selector:{text:{}}},{name:"active_caption",label:"Caption while active",helper:"Falls back to the warning line above when empty.",template:!0,selector:{text:{}}},..."both"===this._config?.require_gesture?[]:[{name:"deactivate_hint",label:'Active face hint (default "Tap to stop")',selector:{text:{}}}],...t?[{name:"busy_label",label:'While waiting (default "Working…")',selector:{text:{}}}]:[]]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"active_color",label:"Background while active",color:!0,selector:{text:{}}},{name:"active_color_on",label:"Text while active",color:!0,selector:{text:{}}},{name:"track_color",label:"Gesture track",color:!0,selector:{text:{}}},{name:"track_color_on",label:"Text on the track",color:!0,selector:{text:{}}},...e?[]:[{name:"handle_color",label:"Slide handle",color:!0,selector:{text:{}}},{name:"handle_color_on",label:"Handle glyph",color:!0,selector:{text:{}}}],{name:"active_icon",label:'Icon while active (default "check-circle")',selector:{icon:{}}},{name:"gesture_icon",label:"Icon on the gesture handle (optional)",selector:{icon:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}});const Ya=new Set(["on","true","open","opening","unlocked","unlocking","home","active"]);class Ka extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_pending:{state:!0},_resolvedLabel:{state:!0},_resolvedActiveLabel:{state:!0},_resolvedCaption:{state:!0},_resolvedActiveCaption:{state:!0},_resolvedEyebrow:{state:!0}};static styles=Xa;static getConfigElement(){return document.createElement("materia-confirm-editor")}static getStubConfig(){return{gesture:"hold"}}setConfig(e){this.config={gesture:"hold",...e}}constructor(){super(),this._pending=null}connectedCallback(){super.connectedCallback(),this._unsub=Hi.subscribe(e=>{e===this.config?.entity&&this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=null,clearTimeout(this._pinTimer)}updated(e){e.has("hass")&&this.hass&&(this._resolveField("label","_resolvedLabel"),this._resolveField("active_label","_resolvedActiveLabel"),this._resolveField("caption","_resolvedCaption"),this._resolveField("active_caption","_resolvedActiveCaption"),this._resolveField("eyebrow","_resolvedEyebrow"),null!=this._pending&&this._entityActive===this._pending&&(this._pending=null,clearTimeout(this._pinTimer)))}_field(e,t){const i=this.config?.[e],s=this._isTemplate(i)?this[t]:i;return"string"==typeof s?s.trim():s}get _stateObj(){return this.config?.entity?this.hass?.states[this.config.entity]:null}get _entityActive(){const e=this._stateObj;if(!e||this._isUnavailable(e))return null;const t=String(e.state).toLowerCase();return this.config.active_state?t===String(this.config.active_state).toLowerCase():Ya.has(t)}get _active(){return null!=this._pending?this._pending:!0===this._entityActive}get _busy(){return null!=this._pending&&this._entityActive!==this._pending}get _gestureBoth(){return"both"===this.config.require_gesture}get _showGesture(){return!this._active||this._gestureBoth}_commit(){const e=!this._active,t=this.config.entity;t&&(this._pending=e,clearTimeout(this._pinTimer),this._pinTimer=setTimeout(()=>{this._pending=null},Number(this.config.pending_timeout_ms??1e4)),Hi.publish(t,e?"on":"off",this._stateObj?.state));const i=e?this.config.action:this.config.deactivate_action;i?this._handleAction(i):t&&(this._fireHaptic("success"),this._callService("homeassistant",e?"turn_on":"turn_off",{entity_id:t}))}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj;if(this.config.entity&&!e)return I`<ha-card><div class="body">
        <div class="note">${$e("entity_not_found_with_id",this.hass,{entity:this.config.entity})}</div>
      </div></ha-card>`;const t=!!e&&this._isUnavailable(e),i=this._active,s=this._showGesture,a=this.config.active_color??"var(--md-sys-color-tertiary-container)",n=this.config.active_color_on??"var(--md-sys-color-on-tertiary-container)",o=this.config.handle_color??"var(--md-sys-color-primary)",r=this.config.handle_color_on??"var(--md-sys-color-on-primary)",l=this._field("eyebrow","_resolvedEyebrow"),c=i?this._field("active_caption","_resolvedActiveCaption")??this._field("caption","_resolvedCaption"):this._field("caption","_resolvedCaption"),d=this._field("label","_resolvedLabel")??$e("cf_hold_to_confirm",this.hass),h=this._field("active_label","_resolvedActiveLabel")??d??$e("cf_active",this.hass);return I`
      <ha-card class=${t?"unavailable":""}>
        <div
          class="body"
          style="--mc-track:${this.config.track_color??"var(--md-sys-color-surface-container-high)"};--mc-ink:${this.config.track_color_on??"var(--md-sys-color-on-surface)"};--mc-handle:${o};--mc-handle-ink:${r};--mc-active-bg:${a};--mc-active-fg:${n};"
        >
          ${l?I`<div class="eyebrow">${l}</div>`:V}

          ${s?I`
                <materia-drag-confirm
                  .gesture=${"slide"===this.config.gesture?"slide":"hold"}
                  .label=${this._busy?this.config.busy_label??$e("cf_working",this.hass):i?h:d}
                  .icon=${this.config.gesture_icon??""}
                  .pending=${this._busy}
                  .direction=${i?"backward":"forward"}
                  .threshold=${Number(this.config.threshold??.55)}
                  .holdMs=${Number(this.config.hold_ms??800)}
                  ?disabled=${t}
                  @confirm=${this._commit}
                ></materia-drag-confirm>
              `:I`
                <button
                  class="active-face"
                  aria-label=${this.config.deactivate_aria??$e("cf_tap_to_stop_aria",this.hass,{what:h})}
                  ?disabled=${t}
                  @click=${this._commit}
                >
                  <ha-icon .icon=${this.config.active_icon??"m3o:check-circle"}></ha-icon>
                  <div class="face-text">
                    <span class="face-label">${h}</span>
                    <span class="face-hint">
                      ${this._busy?this.config.busy_label??$e("cf_working",this.hass):this.config.deactivate_hint??$e("cf_tap_to_stop",this.hass)}
                    </span>
                  </div>
                  <div class="layer"></div>
                </button>
              `}

          ${c?I`<div class="caption ${!1===this.config.caption_warn||i?"":"warn"}">${c}</div>`:V}
        </div>
      </ha-card>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){return 3}}customElements.define("materia-confirm",Ka),window.customCards=window.customCards||[],window.customCards.push({type:"materia-confirm",name:"Materia Confirm",description:"Press-and-hold to commit a consequential action, with the warning in plain view instead of in a dialog. No tap path.",preview:!0});const Za=[Ee,ze,Ae,pi,ge,n`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      /* Every measurement below scales off the card's own width, so one card
         reads correctly at 12 columns and at 4 without a breakpoint — and no
         row assumes it owns a full dashboard row. */
      container-type: inline-size;
    }

    .body {
      border-radius: 28px;
      padding: clamp(14px, 4cqi, 20px);
      background: var(--mb-bg);
      color: var(--mb-fg);
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 3cqi, 14px);
      box-sizing: border-box;
    }

    /* THE HEADER ROW: what this block is, left; how fresh it is, right. Both
       halves optional, so the row itself disappears when neither is set rather
       than leaving an empty band. Baseline-aligned, because the two are read
       as one line and not as a stack. */
    .header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    /* M3 label-large, uppercased with wide tracking — the eyebrow voice this
       library already uses for a block label. The concept's 13px/700/.08em is
       the same intent expressed in raw numbers; 14/500 with 0.1px tracking plus
       uppercase is the token that means it. */
    .eyebrow {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      text-transform: uppercase;
      opacity: 0.72;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 label-medium. Quieter than the eyebrow it sits beside: a freshness
       note is a qualifier, never the headline. */
    .meta {
      flex: none;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.55;
      white-space: nowrap;
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: clamp(8px, 2.4cqi, 12px);
    }

    /* THE ROW. Label, bar, reading — and the label and reading columns are a
       FIXED width while only the track flexes.

       That is the whole reason the bars are comparable, and it was wrong here
       first: sizing the label to its content (max-width 40%) meant every row
       started its track at a different x, so three bars on a shared scale
       still could not be read against each other by eye. A shared scale with
       unshared origins is not a comparison. The widths are expressed in cqi so
       they adapt to the card, which is safe precisely because every row in one
       card resolves them identically. */
    .row {
      display: flex;
      align-items: center;
      gap: clamp(8px, 2.4cqi, 12px);
    }

    /* M3 title-small. */
    .label {
      flex: none;
      width: clamp(56px, 22cqi, 92px);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.85;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* The track is ALWAYS full width and always present, so a row's height can
       never depend on its value and no reading can make the card reflow. Only
       the indicator's width changes. This is the same discipline the alarm
       card's zone list needed: geometry that responds to data is geometry that
       thrashes when the data does. */
    .track {
      flex: 1 1 auto;
      min-width: 48px;
      height: 14px;
      border-radius: 7px;
      background: var(--md-sys-color-surface-container-highest, color-mix(in srgb, var(--mb-fg) 12%, transparent));
      overflow: hidden;
      position: relative;
    }

    .indicator {
      position: absolute;
      inset: 0 auto 0 0;
      width: var(--mb-p, 0%);
      border-radius: 7px;
      background: var(--mb-row-color, var(--md-sys-color-primary));
      transition: width var(--md-sys-motion-default-effects),
        background-color var(--md-sys-motion-default-effects);
    }

    /* UNKNOWN IS NOT ZERO, and this is the whole reason the card exists.
       A missing measurement rendered as an empty bar is a claim — it says the
       value is nought — and on this dashboard that is precisely the lie being
       corrected: "no reading yet" and "no surplus" are different facts and the
       page was conflating them. So an unknown row gets a hatched track and an
       em dash instead of a number, and NOT a zero-length fill.

       Neutral on purpose: outline-variant, never the warning role. A reading
       we do not have is not bad news, it is absent news, and spending the
       warning colour on it would leave nothing louder for an actual problem. */
    .track.unknown {
      background: repeating-linear-gradient(
        -45deg,
        var(--md-sys-color-surface-container-highest, transparent) 0 5px,
        color-mix(in srgb, var(--md-sys-color-outline-variant, var(--mb-fg)) 55%, transparent) 5px 10px
      );
    }

    .track.unknown .indicator {
      display: none;
    }

    /* A MEASURED ZERO DRAWS NOTHING, and that is load-bearing. The concept
       draws its zero row as a 2% stub with a muted fill, which makes a real
       zero look like a small non-zero — exactly the misreading this card
       exists to remove, so it is deliberately not reproduced. The track alone
       carries the meaning at zero. min-width is pinned at 0 so no later
       "give the fill a visible minimum" tweak can quietly reintroduce the
       stub. */
    .indicator {
      min-width: 0;
    }

    .reading {
      flex: none;
      width: clamp(48px, 17cqi, 72px);
      display: flex;
      align-items: baseline;
      gap: 0.15em;
      justify-content: flex-end;
      overflow: hidden;
    }

    /* M3 title-medium, tabular so the column of numbers does not jitter as
       digits change width. */
    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .value.unknown {
      opacity: 0.55;
    }

    /* M3 label-medium. */
    .unit {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.7;
      white-space: nowrap;
    }

    /* M3 uses a 1dp outline-variant divider. */
    .divider {
      height: 1px;
      background: var(--md-sys-color-outline-variant, color-mix(in srgb, var(--mb-fg) 18%, transparent));
      border: none;
      margin: clamp(2px, 1cqi, 4px) 0;
    }

    /* The status line: the sentence the page is actually opened to read. Icon
       and text baseline-aligned, M3 body-medium, and never truncated — it
       wraps, because a clipped explanation is worse than a taller card. */
    .status {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.25px;
    }

    .status ha-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
      /* Optical alignment: nudge the glyph onto the first line's centre
         (20px line box, 20px glyph) rather than its top. */
      margin-top: 0;
      color: var(--mb-status-color, inherit);
    }

    .status .text {
      min-width: 0;
    }

    /* M3 body-small — the confidence note. Quieter than the status it
       qualifies, which is the entire point of it being separate. */
    .footnote {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      opacity: 0.66;
    }

    .note {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      opacity: 0.7;
      text-align: center;
    }

    /* NARROW CARDS. Below roughly a phone half-width the three-part row cannot
       hold a comparable bar and a readable label on one line, so the label and
       reading move onto their own line above a full-width track. The track
       keeps its height either way, so the card grows by a fixed amount rather
       than by an amount that depends on the data. */
    @container (max-width: 260px) {
      .row {
        flex-wrap: wrap;
        gap: 2px 8px;
      }

      /* Stacked, the alignment argument no longer applies — the track is on
         its own line and already shares one origin with every other row — so
         the label is free to take the width it needs. */
      .label {
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
        order: 1;
      }

      .reading {
        width: auto;
        flex: none;
        order: 2;
      }

      .track {
        order: 3;
        flex: 1 1 100%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .indicator {
        transition: none;
      }
    }
  `];class Ja extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .options-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{...this._config}}_sectionsSignature(){return[(this._config?.rows||[]).length,this._config?.status?"s":"",null!=this._config?.max?"m":"",this._config?.footnote?"f":""].join("|")}get _sections(){return[{title:"Scale",icon:"mdi:ruler",fields:[{name:"max",label:"Full-scale value (optional)",helper:"All bars share one scale, or they cannot be compared. Set this when the domain has a real ceiling — an inverter's kW rating, say — so the bars stop rescaling every time the largest reading moves. Leave empty to scale to the largest current value.",selector:{number:{min:0,step:"any",mode:"box"}}},{name:"precision",label:"Decimal places (optional)",helper:"Leave empty to choose per value: whole numbers above 100, one decimal below.",selector:{number:{min:0,max:4,step:1,mode:"box"}}}]},{title:"Words",icon:"mdi:text-long",fields:[{name:"eyebrow",label:"Block label (optional)",helper:"Sits top-left, uppercased — what this block is. Rendered as a quiet eyebrow, not a headline.",template:!0,selector:{text:{}}},{name:"meta",label:"Freshness note (optional)",helper:'Top-right, quieter still — how current the readings are ("bijgewerkt 1 min"). Templatable, so it can be a relative time.',template:!0,selector:{text:{}}},{name:"status",label:"Status line",helper:"The sentence the page is opened to read. Templatable, so the install supplies its own wording in its own language — this card ships no prose.",template:!0,selector:{text:{}}},{name:"status_icon",label:"Status icon",template:!0,selector:{icon:{}}},{name:"status_color",label:"Status icon colour",color:!0,template:!0,selector:{text:{}}},{name:"footnote",label:"Footnote (optional)",helper:"Quieter than the status it qualifies — a confidence note, a caveat, when the reading was taken.",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"background",label:"Card background",color:!0,selector:{text:{}}},{name:"background_on",label:"Card text",color:!0,selector:{text:{}}}]},{title:"Disabled",icon:"mdi:cancel",expanded:!1,fields:[He]}]}get _rowSchema(){return[{name:"entity",label:"Entity",selector:{entity:{}}},{name:"attribute",label:"Attribute (optional)",helper:"Read an attribute instead of the state — for a sensor that carries several numbers at once.",selector:{attribute:{}},context:{filter_entity:"entity"}},{name:"label",label:"Label (optional — defaults to the entity name)",template:!0,selector:{text:{}}},{name:"unit",label:"Unit (optional — defaults to the entity's own)",selector:{text:{}}},{name:"color",label:"Bar colour",color:!0,selector:{text:{}}}]}_rows(){return Array.isArray(this._config?.rows)?this._config.rows:[]}_commitRows(e){const t={...this._config};e.length?t.rows=e:delete t.rows,this._commit(t)}_addRow(){const e=[...this._rows(),{entity:""}];this._expanded=e.length-1,this._commitRows(e)}_removeRow(e){const t=[...this._rows()];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commitRows(t)}_moveRow(e,t){const i=[...this._rows()],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commitRows(i)}_updateRow(e,t){const i=[...this._rows()];i[e]={...i[e],...t},this._commitRows(i)}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_rowTitle(e,t){if(e.label&&!String(e.label).includes("{{"))return e.label;const i=e.entity?this.hass?.states[e.entity]:null;return i?.attributes?.friendly_name||e.entity||`Row ${t+1}`}_renderExtra(){const e=this._rows();return I`
      <div class="options-header">
        <span>Bars</span>
        <ha-icon-button @click=${this._addRow}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">
        Rows are drawn in this order, top to bottom — the card does not reorder
        them, so put the one that answers the question first. A row whose value
        is missing draws as unknown rather than as zero.
      </div>

      ${qe((e,t)=>this._moveRow(e,t),e.map((e,t)=>I`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${this._rowTitle(e,t)}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeRow(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?I`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${this._rowSchema}
                        .computeLabel=${De}
                        @value-changed=${e=>this._updateRow(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}}customElements.define("materia-bars-editor",Ja);const Qa=["var(--md-sys-color-primary)","var(--md-sys-color-tertiary)","var(--md-sys-color-secondary)","var(--md-sys-cust-color-scale-purple, #8A4DA3)","var(--md-sys-cust-color-scale-orange, #D9713C)","var(--md-sys-cust-color-scale-green, #5E9E50)","var(--md-sys-cust-color-scale-maroon, #7A4040)","var(--md-sys-cust-color-scale-yellow, #C7A128)"],en=new Set(["","none","null","unknown","unavailable","nan","undefined","-"]);class tn extends(hi(Te(ce))){static properties={hass:{attribute:!1},config:{state:!0},_resolvedEyebrow:{state:!0},_resolvedMeta:{state:!0},_resolvedStatus:{state:!0},_resolvedStatusIcon:{state:!0},_resolvedFootnote:{state:!0},_resolvedStatusColor:{state:!0}};static styles=Za;static getConfigElement(){return document.createElement("materia-bars-editor")}static getStubConfig(e){return{rows:(e?Object.keys(e.states):[]).filter(t=>t.startsWith("sensor.")&&Number.isFinite(Number(e.states[t]?.state))).slice(0,2).map(e=>({entity:e}))}}setConfig(e){this.config={...e}}updated(e){e.has("hass")&&this.hass&&(this._resolveField("eyebrow","_resolvedEyebrow"),this._resolveField("meta","_resolvedMeta"),this._resolveField("status","_resolvedStatus"),this._resolveField("status_icon","_resolvedStatusIcon"),this._resolveField("status_color","_resolvedStatusColor"),this._resolveField("footnote","_resolvedFootnote"),(this.config.rows||[]).forEach((e,t)=>{e?.label&&this._resolveTemplateValue(`row_label_${t}`,e.label)}))}_field(e,t){const i=this.config?.[e],s=this._isTemplate(i)?this[t]:i;return"string"==typeof s?s.trim():s}_rowLabel(e,t){const i=e?.label;if(!this._isTemplate(i))return i;const s=this._tplResults?.[`row_label_${t}`];return"string"==typeof s?s.trim():s}_raw(e){const t=e?.entity?this.hass?.states[e.entity]:void 0;if(t)return e.attribute?t.attributes?.[e.attribute]:t.state}_value(e){const t=this._raw(e);if(null==t)return null;if("boolean"==typeof t)return t?1:0;const i=String(t).trim();if(en.has(i.toLowerCase()))return null;const s=Number(i);return Number.isFinite(s)?s:null}get _rows(){return(this.config.rows||[]).filter(e=>e&&e.entity).map((e,t)=>{const i=this.hass?.states[e.entity],s=this._value(e);return{...e,st:i,value:s,unknown:null===s,label:this._rowLabel(e,t)||i?.attributes?.friendly_name||e.entity,unit:e.unit??(e.attribute?"":i?.attributes?.unit_of_measurement??""),color:e.color||Qa[t%Qa.length]}})}_scale(e){const t=Number(this.config.max);if(Number.isFinite(t)&&t>0)return t;const i=e.filter(e=>!e.unknown).map(e=>Math.abs(e.value)),s=i.length?Math.max(...i):0;return s>0?s:null}_pct(e,t){if(e.unknown||!t)return"0%";return`${(100*Math.min(1,Math.abs(e.value)/t)).toFixed(2)}%`}_format(e){if(e.unknown)return null;const t=Number(this.config.precision),i=Number.isFinite(t)?t:this._autoPrecision(e.value),s=this.hass?.locale?.language||"en";return e.value.toLocaleString(s,{minimumFractionDigits:i,maximumFractionDigits:i})}_autoPrecision(e){const t=Math.abs(e);return t>=100?0:t>=10?1:t===Math.trunc(t)?0:1}render(){if(!this.hass||!this.config)return I``;const e=this._rows,t=this._scale(e),i=this._field("eyebrow","_resolvedEyebrow"),s=this._field("meta","_resolvedMeta"),a=this._field("status","_resolvedStatus"),n=this._field("status_icon","_resolvedStatusIcon"),o=this._field("status_color","_resolvedStatusColor"),r=this._field("footnote","_resolvedFootnote"),l=this.config.background??"var(--ha-card-background, var(--md-sys-color-surface-container-low, var(--card-background-color)))",c=this.config.background_on??"var(--md-sys-color-on-surface)";return I`
      <ha-card>
        <div class="body" style="--mb-bg:${l};--mb-fg:${c};">
          ${i||s?I`
                <div class="header">
                  ${i?I`<span class="eyebrow">${i}</span>`:V}
                  ${s?I`<span class="meta">${s}</span>`:V}
                </div>
              `:V}

          ${e.length?I`<div class="rows">${e.map(e=>this._renderRow(e,t))}</div>`:I`<div class="note">${$e("bars_no_rows",this.hass)}</div>`}

          ${a||r?I`
                <hr class="divider" />
                ${a?I`
                      <div class="status" style="--mb-status-color:${o||"var(--md-sys-color-tertiary)"}">
                        ${n?I`<ha-icon .icon=${n}></ha-icon>`:V}
                        <span class="text">${a}</span>
                      </div>
                    `:V}
                ${r?I`<div class="footnote">${r}</div>`:V}
              `:V}
        </div>
      </ha-card>
    `}_renderRow(e,t){const i=this._format(e),s=e.unknown?$e("bars_aria_unknown",this.hass,{label:e.label}):`${e.label}: ${i}${e.unit?" "+e.unit:""}`;return I`
      <div class="row" role="group" aria-label=${s}>
        <span class="label">${e.label}</span>
        <div class="track ${e.unknown?"unknown":""}" aria-hidden="true">
          <div class="indicator" style="--mb-p:${this._pct(e,t)};--mb-row-color:${e.color};"></div>
        </div>
        <span class="reading">
          ${e.unknown?I`<span class="value unknown" title=${$e("bars_unknown_title",this.hass)}>—</span>`:I`
                <span class="value">${i}</span>
                ${e.unit?I`<span class="unit">${e.unit}</span>`:V}
              `}
        </span>
      </div>
    `}getGridOptions(){return{columns:12,rows:"auto"}}getCardSize(){const e=(this.config?.rows||[]).length;return(this.config?.eyebrow||this.config?.meta?1:0)+Math.ceil(e/2)+(this.config?.status?1:0)+(this.config?.footnote?1:0)||1}}customElements.define("materia-bars",tn),window.customCards=window.customCards||[],window.customCards.push({type:"materia-bars",name:"Materia Bars",description:"Labelled readings as comparable bars on one shared scale, with a status sentence. A missing reading draws as unknown, never as zero.",preview:!0});const sn={primary:["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],secondary:["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],tertiary:["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],error:["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],device:["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-container":["var(--md-sys-color-primary-container)","var(--md-sys-color-on-primary-container)"],"secondary-container":["var(--md-sys-color-secondary-container)","var(--md-sys-color-on-secondary-container)"],"tertiary-container":["var(--md-sys-color-tertiary-container)","var(--md-sys-color-on-tertiary-container)"],"error-container":["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"],"device-container":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"],"primary-state":["var(--md-sys-color-primary)","var(--md-sys-color-on-primary)"],"secondary-state":["var(--md-sys-color-secondary)","var(--md-sys-color-on-secondary)"],"tertiary-state":["var(--md-sys-color-tertiary)","var(--md-sys-color-on-tertiary)"],"error-state":["var(--md-sys-color-error)","var(--md-sys-color-on-error)"],"device-state":["var(--md-sys-cust-color-device-container)","var(--md-sys-cust-color-on-device)"]},an=[Ee,ge,n`
    :host {
      display: inline-block;
    }

    .badge {
      box-sizing: border-box;
      position: relative;
      /* The doc's 100x132 floor, scaled to sit WITH the page's rows rather
         than over them — still a generous touch target, never a dot. */
      height: 84px;
      min-width: 116px;
      max-width: 116px;
      padding: 10px 16px;
      /* Blend with the page: the corner comes from the theme, like every
         other Materia surface. 28px is the 18c fallback. */
      border-radius: var(--ha-card-border-radius, 28px);
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* Declared HERE, not inherited: the badge lives in HA's header (not
         inside a Materia card), where outer rules can override :host — the
         one place the library's voice could silently fall back to Roboto. */
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
      -webkit-tap-highlight-color: transparent;
      /* A hold must not start a text selection on desktop. */
      -webkit-user-select: none;
      user-select: none;
      transition:
        max-width var(--md-sys-motion-expressive-default-spatial),
        border-radius var(--md-sys-motion-expressive-slow-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
      /* The slow expressive spring makes the corner morph a MIGRATION —
         the radii travel, overshoot, and settle back, rather than swap. */
    }

    .badge.open {
      max-width: 172px;
    }

    /* Alarm outgrows everything and squares off — the shape says danger
       before the colour does. */
    .badge.alarm {
      max-width: 196px;
      border-radius: 18px;
    }

    .row-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .icon-cell {
      display: flex;
      flex: none;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 22px;
      width: 22px;
      height: 22px;
    }

    /* The typed value — "3 on", "21°", a ticking 0:14. Always in the DOM so
       it can fade; the quiet tile is simply too narrow to show it.
       Type metrics come from the LIBRARY's row scale (rowCardStyles), not
       the design doc — one voice across the whole dashboard. */
    .value {
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      transition: opacity var(--md-sys-motion-default-effects) 100ms;
    }

    .badge.open .value {
      opacity: 1;
    }

    /* Same metrics as rowCardStyles' name/subtitle — the badge row must
       read in the exact voice of the rows below it. */
    .text {
      display: flex;
      flex-direction: column;
      line-height: 18px;
    }

    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }

    .sub {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
    }

    /* Hold progress — a fill sweeps across the badge over the arm window so
       the gesture visibly charges. Rendered only while arming; mounting the
       element starts the animation, unmounting resets it. Duration comes
       inline from HOLD_MS so the sweep completes exactly when the hold
       fires. currentColor at low alpha = the design's ink-tint fill. */
    .hold-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: currentColor;
      opacity: 0.14;
      pointer-events: none;
      animation: hold-fill linear forwards;
    }

    @keyframes hold-fill {
      from { width: 0; }
      to { width: 100%; }
    }

    /* ---- action layout: the button badge (design 20a) -----------------
       The silhouette is the role: navigation is a squircle, a verb wears
       M3's asymmetric shape-morph corners — nothing else may. Reads
       horizontally: icon | name + sub | value; the value is the live
       consequence (a ticking countdown, "Open") and fades with the open
       state exactly like the navigate badge's payload. leaf rises to the
       right, leaf-flip mirrors it — a facing pair. */
    .badge.action {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      min-width: 116px;
      max-width: none;
      padding: 0 22px 0 18px;
      border-radius: 42px 16px 42px 16px;
    }

    .badge.action.open {
      max-width: none;
    }

    /* Going active mirrors the asymmetry — the corner morph IS the state
       change, riding the same expressive spring as the rest of the shape.
       .fired is the same morph as a receipt: entity-less verbs (scenes)
       have no lasting state, so firing flashes the flip for a moment. */
    .badge.action.active,
    .badge.action.fired {
      border-radius: 16px 42px 16px 42px;
    }

    .badge.action.leaf-flip {
      border-radius: 16px 42px 16px 42px;
    }

    .badge.action.leaf-flip.active,
    .badge.action.leaf-flip.fired {
      border-radius: 42px 16px 42px 16px;
    }

    /* The value's column animates 0fr -> 1fr, so the badge visibly GROWS to
       admit the state info — real animated width, whatever the text length. */
    .badge.action .value-wrap {
      display: grid;
      grid-template-columns: 0fr;
      transition: grid-template-columns var(--md-sys-motion-expressive-default-spatial);
    }

    .badge.action.open .value-wrap {
      grid-template-columns: 1fr;
    }

    .badge.action .value-wrap .value {
      overflow: hidden;
      min-width: 0;
    }

    .badge.action .icon-cell ha-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
    }

    .badge.action .text {
      line-height: 1.2;
    }

    /* Rising fill while a timer runs — the badge IS the countdown. The 1s
       linear transition matches the tick, so the climb reads continuous. */
    .run-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: currentColor;
      opacity: 0.12;
      pointer-events: none;
      transition: height 1s linear;
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
  `],nn=[{value:"primary",label:"Primary"},{value:"secondary",label:"Secondary"},{value:"tertiary",label:"Tertiary"},{value:"error",label:"Error"},{value:"device",label:"Device"},{value:"primary-container",label:"Primary Container"},{value:"secondary-container",label:"Secondary Container"},{value:"tertiary-container",label:"Tertiary Container"},{value:"error-container",label:"Error Container"},{value:"device-container",label:"Device Container"},{value:"primary-state",label:"Primary State"},{value:"secondary-state",label:"Secondary State"},{value:"tertiary-state",label:"Tertiary State"},{value:"error-state",label:"Error State"},{value:"device-state",label:"Device State"},{value:"battery",label:"Battery"}];customElements.define("materia-badge-editor",class extends We{get _actionRole(){const e=["toggle","perform-action","call-service"],t=this._config?.tap_action?.action;if(t&&"none"!==t)return e.includes(t);const i=this._config?.hold_action?.action;return!!i&&"none"!==i&&e.includes(i)}_formData(){return{show_state:!1,variant:"secondary",...this._actionRole?{shape:"leaf"}:{},...this._config}}_sectionsSignature(){return`${this._config?.entity?"entity":"none"}|${this._actionRole?"verb":"nav"}`}get _sections(){const e=!!this._config?.entity,t=[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,template:!0,selector:{text:{}}},{name:"icon",required:!0,template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},...this._actionRole?[{name:"shape",helper:"The asymmetric corners rise to the right; the mirrored one makes a facing pair.",selector:{select:{mode:"dropdown",options:[{value:"leaf",label:"Asymmetric corners"},{value:"leaf-flip",label:"Asymmetric corners — mirrored"}]}}}]:[],{name:"variant",selector:{select:{mode:"dropdown",options:nn}}},{name:"secondary",label:"Secondary line",template:!0,helper:"One quiet line under the name. Left empty, a quiet badge shows its state word here instead.",selector:{text:{}}}]}];return e&&t.push({title:"State",icon:"mdi:state-machine",fields:[{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",template:!0,selector:{text:{}}},{name:"busy_entity",label:"Also active while (optional)",helper:"A script/automation/timer whose 'on' also counts as active — for when the badge's own entity only reflects part of a longer sequence (e.g. a relay that pulses inside a multi-step unlock script).",selector:{entity:{domain:["script","automation","timer","input_boolean","binary_sensor"]}}}]}),t.push({title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",helper:"A hold is deliberate by construction — the right slot for actions a stray tap must never fire.",selector:{ui_action:{default_action:"none"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}),t}});const on={cover:"open",lock:["locked","locking"],vacuum:"cleaning",media_player:"playing",climate:"heat",alarm_control_panel:"armed_away",timer:"active"},rn=new Set(["toggle","perform-action","call-service"]);class ln extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedStateDisplay:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSecondary:{state:!0}};static getConfigElement(){return document.createElement("materia-badge-editor")}static getStubConfig(e){const t=(e?Object.keys(e.states):[]).find(e=>e.startsWith("light.")||e.startsWith("switch."))||"";return{name:"Badge",icon:"mdi:power-plug",variant:"primary",show_state:!1,entity:t}}static styles=[Ae,an];setConfig(e){if(!e.icon)throw new Error("icon is required");if(!e.name)throw new Error("name is required");this.config={show_state:!1,variant:"secondary",...e}}updated(e){super.updated?.(e),e.has("hass")&&this.hass&&(this._resolveField("state_display","_resolvedStateDisplay"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("secondary","_resolvedSecondary"),this._syncTimerTick())}_syncTimerTick(){const e=(this.config.show_state||this._isActionRole)&&this.config.entity?.startsWith("timer.")&&"active"===this.hass.states[this.config.entity]?.state;e&&!this._timerTick?this._timerTick=setInterval(()=>this.requestUpdate(),1e3):!e&&this._timerTick&&(clearInterval(this._timerTick),this._timerTick=null)}_timerRemaining(e){const t=Date.parse(e.attributes?.finishes_at);if(Number.isNaN(t))return null;const i=Math.max(0,Math.ceil((t-Date.now())/1e3));return`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`}_timerProgress(e){const t=Date.parse(e?.attributes?.finishes_at),i=String(e?.attributes?.duration||"").split(":").reduce((e,t)=>60*e+Number(t),0);if(Number.isNaN(t)||!i)return null;const s=Math.max(0,(t-Date.now())/1e3);return Math.min(1,Math.max(0,1-s/i))}_isActive(e){if(!e)return!1;const t=e.state,i=this.config.active_state;if(null!=i)return Array.isArray(i)?i.includes(t):t===String(i);const s=e.entity_id.split(".")[0],a=on[s]||"on";return Array.isArray(a)?a.includes(t):t===a}get _isBusy(){const e=this.config.busy_entity;return!!e&&"on"===this.hass?.states[e]?.state}get _isActionRole(){const e=this.config.tap_action?.action;if(e&&"none"!==e)return rn.has(e);const t=this.config.hold_action?.action;return!(!t||"none"===t)&&rn.has(t)}_getBatteryColors(e){const t=parseFloat(e?.state);return Number.isNaN(t)?["var(--ha-card-background)","var(--primary-text-color)"]:t<10?["var(--md-sys-color-error-container)","var(--md-sys-color-on-error-container)"]:t<20?["var(--md-sys-cust-color-warning-container, #ffecb3)","var(--md-sys-cust-color-on-warning-container, #6d4c00)"]:["var(--ha-card-background)","var(--primary-text-color)"]}get _templatesReady(){const e=this.config;return(!this._isTemplate(e.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(e.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(e.state_display)||void 0!==this._resolvedStateDisplay)&&((!this._isTemplate(e.icon)||void 0!==this._resolvedIcon)&&((!this._isTemplate(e.name)||void 0!==this._resolvedName)&&(!this._isTemplate(e.secondary)||void 0!==this._resolvedSecondary)))))}render(){if(!this.hass||!this.config)return I``;const e=this.config.entity,t=e?this.hass.states[e]:void 0,i=!!e&&this._isUnavailable(t),s=!i&&(this._isActive(t)||this._isBusy),a=this.config.variant||"secondary",n=this.config.show_state,o=this._isActionRole;let r=this._isTemplate(this.config.color)?(this._resolvedColor||"").trim():this.config.color,l=this._isTemplate(this.config.color_on)?(this._resolvedColorOn||"").trim():this.config.color_on;const c=["primary","tertiary","error","primary-container","secondary-container","error-container","device-container"];let d=!!r;if(!r)if("battery"===a){const[e,i]=this._getBatteryColors(t);r=e,l=i,d="var(--ha-card-background)"!==e}else if(c.includes(a)||s&&e){const t="error"===a||"error-state"===a||a.endsWith("-container")?a:`${a.replace(/-state$/,"")}-container`,i=sn[t]||sn[a]||sn.secondary;r=i[0],l=l||i[1],d=!(!s||!e)}else r="var(--ha-card-background)",l=l||"var(--secondary-text-color)";l=l||"var(--primary-text-color)";const h=d&&("error"===a||"error-state"===a)&&(!e||s),p=s?"active":"inactive";let u="";if(n&&i)u=$e("unavailable",this.hass);else if(n&&t){const i=this.config.state_display&&(this.config.state_display.includes("{{")||this.config.state_display.includes("{%"));if(this._resolvedStateDisplay&&i)u=this._resolvedStateDisplay;else if(this.config.state_display&&!i)u=this.config.state_display;else if(e?.startsWith("timer.")&&"active"===t.state&&this._timerRemaining(t))u=this._timerRemaining(t);else{const e=t.state,i=Number(e);if(""===e||null==e||Number.isNaN(i))u=this.hass.formatEntityState?.(t)??e;else{const e=t.attributes?.unit_of_measurement,s=Math.round(100*i)/100;u=e?"%"===e?`${s}%`:`${s} ${e}`:`${s}`}}u=this._capitalize(u)}const m=this._isTemplate(this.config.secondary)?this._resolvedSecondary||"":this.config.secondary,g=o?"leaf-flip"===this.config.shape?"leaf-flip":"leaf":"",f=I`<ha-icon .icon=${this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon} style="color: ${l};"></ha-icon>`,_=this._isTemplate(this.config.name)?this._resolvedName:this.config.name,b=this._holdHint?$e("badge_hold_hint",this.hass):m||(!d&&n?u:""),v=o&&e?.startsWith("timer.")&&"active"===t?.state?this._timerProgress(t):null,y=`badge ${o?`action ${g}`:""} ${p} ${this._firedFlash?"fired":""} ${d?"open":""} ${h?"alarm":""} ${i?"unavailable":""}`;return I`
      <div
        class=${y}
        style="background-color: ${r}; color: ${l};"
        @click=${this._handleTap}
        @dblclick=${this._handleDoubleTap}
        @pointerdown=${this._holdDown}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdUp}
        @pointercancel=${this._holdUp}
        @contextmenu=${e=>{this.config.hold_action?.action&&"none"!==this.config.hold_action.action&&e.preventDefault()}}
      >
        ${this._haArming?I`<div class="hold-fill" style="animation-duration: ${500}ms;"></div>`:""}
        ${o?I`
              ${null!=v?I`<div class="run-fill" style="height: ${Math.round(100*v)}%;"></div>`:""}
              <div class="icon-cell">${f}</div>
              <div class="text">
                <div class="name">${_}</div>
                ${b?I`<div class="sub">${b}</div>`:""}
              </div>
              ${n?I`<div class="value-wrap"><span class="value">${u}</span></div>`:""}
            `:I`
              <div class="row-top">
                <div class="icon-cell">${f}</div>
                ${n?I`<span class="value">${u}</span>`:""}
              </div>
              <div class="text">
                <div class="name">${_}</div>
                ${b?I`<div class="sub">${b}</div>`:""}
              </div>
            `}
      </div>
    `}_handleTap(){if(this._consumeHold())return;const e=this.config.tap_action,t=this.config.hold_action;if((!e?.action||"none"===e.action)&&t?.action&&"none"!==t.action)return this._holdHint=!0,this.requestUpdate(),clearTimeout(this._hintTimer),void(this._hintTimer=setTimeout(()=>{this._holdHint=!1,this.requestUpdate()},1400));if(this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action){if(this._dblClickTimer)return;this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this.config.tap_action||{action:"toggle"})},250)}else this._handleAction(this.config.tap_action||{action:"toggle"})}_handleDoubleTap(){this.config.double_tap_action?.action&&"none"!==this.config.double_tap_action.action&&(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,this._handleAction(this.config.double_tap_action))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._dblClickTimer),this._dblClickTimer=null,clearTimeout(this._hintTimer),this._holdHint=!1,clearTimeout(this._firedTimer),this._firedFlash=!1,clearInterval(this._timerTick),this._timerTick=null}getCardSize(){return 2}_flashFired(){this._firedFlash=!0,this.requestUpdate(),clearTimeout(this._firedTimer),this._firedTimer=setTimeout(()=>{this._firedFlash=!1,this.requestUpdate()},1600)}_handleAction(e){this._isActionRole&&e?.action&&rn.has(e.action)&&this._flashFired(),super._handleAction(e)}}customElements.define("materia-badge",ln),window.customBadges=window.customBadges||[],window.customBadges.push({type:"materia-badge",name:"Materia Badge",description:"Value-typed header badge — navigate squircle or action corners.",preview:!0});const cn=[Ee,n`
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
  `];customElements.define("materia-checkbox-editor",class extends We{get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"tap_action_checked",label:"Action (checked)",selector:{ui_action:{}}},{name:"tap_action_unchecked",label:"Action (unchecked)",selector:{ui_action:{}}}]}]}});class dn extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0}};static getConfigElement(){return document.createElement("materia-checkbox-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("input_boolean."))||"";return{entity:t,name:"Checkbox"}}static styles=[Ae,cn];setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={tap_action:{action:"toggle"},...e}}_isChecked(e){if(this.config.checked_entity){const e=this.hass?.states[this.config.checked_entity];if(!e)return!1;const t=String(e.state??"").split(",").map(e=>e.trim()).filter(Boolean);return this.config.checked_values?this.config.checked_values.every(e=>t.includes(e)):!!this.config.checked_value&&t.includes(this.config.checked_value)}if(!e)return!1;const t=String(e.state??"").toLowerCase(),i=Number(t);return"on"===t||"true"===t||"home"===t||!Number.isNaN(i)&&i>0}updated(e){e.has("hass")&&this.hass&&this._resolveField("name","_resolvedName")}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=!t&&this._isChecked(e),s=this._isTemplate(this.config.name)?this._resolvedName:this.config.name??e?.attributes?.friendly_name??this.config.entity,a=i?"mdi:checkbox-marked":"mdi:checkbox-blank-outline";return I`
      <ha-card class="${t?"unavailable":""}" @click=${this._handleTap}>
        <div class="name">${s}</div>
        <div class="icon-cell">
          <ha-icon .icon=${a}></ha-icon>
        </div>
      </ha-card>
    `}_handleTap(){const e=this.hass?.states[this.config.entity],t=this._isChecked(e);let i;i=t&&this.config.tap_action_checked?this.config.tap_action_checked:!t&&this.config.tap_action_unchecked?this.config.tap_action_unchecked:this.config.tap_action||{action:"toggle"},this._handleAction(i)}getCardSize(){return 1}}customElements.define("materia-checkbox",dn),window.customCards=window.customCards||[],window.customCards.push({type:"materia-checkbox",name:"Materia Checkbox",description:"Checkbox with custom checked state logic.",preview:!0});const hn=[Ee,ze,n`
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
  `];customElements.define("materia-pill-editor",class extends We{_formData(){return{background:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"state_display",template:!0,selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"background",selector:{boolean:{}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{}}}]}]}});class pn extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedStateDisplay:{state:!0}};static getConfigElement(){return document.createElement("materia-pill-editor")}static getStubConfig(e){const t=(e?Object.keys(e.states):[]).find(e=>e.startsWith("sensor."))||"";return{entity:t,name:"",icon:"mdi:information-outline"}}static styles=[Ae,hn];setConfig(e){if(!e.entity)throw new Error("entity is required");this.config={icon:"mdi:information-outline",...e}}_classify(e){const t=this.config.ranges||[];if(!t.length)return{label:"",color:""};const i=parseFloat(e);if(Number.isNaN(i))return{label:"",color:""};for(const e of t)if(null==e.max||i<=e.max)return{label:e.label,color:e.color};return{label:"",color:""}}get _templatesReady(){const e=this.config;return(!this._isTemplate(e?.color)||void 0!==this._resolvedColor)&&((!this._isTemplate(e?.color_on)||void 0!==this._resolvedColorOn)&&((!this._isTemplate(e?.icon)||void 0!==this._resolvedIcon)&&(!this._isTemplate(e?.name)||void 0!==this._resolvedName)))}updated(e){e.has("hass")&&this.hass&&(this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn"),this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("state_display","_resolvedStateDisplay"))}render(){if(!this.hass||!this.config)return I``;if(!this._templatesReady)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||e?.attributes?.friendly_name||this.config.entity,s=this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon||e?.attributes?.icon||"",a=e?.attributes?.unit_of_measurement||"",n=e?.state??"",o=this.config.ranges||[],r=this._classify(n);let l;l=t?"Unavailable":this.config.state_display?this._isTemplate(this.config.state_display)?this._resolvedStateDisplay??"":this.config.state_display:o.length?a?`${n} · ${r.label||i}`:n:a?`${this._capitalize(n)} ${a}`:this._capitalize(n);const c=o.length?t?i:a||(r.label||i):"",d=this._resolvedColor||this.config.color||"var(--ha-card-background, var(--card-background-color))",h=this._resolvedColorOn||this.config.color_on||"var(--primary-text-color)",p=!1===this.config.background||"none"===this.config.background;return I`
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
            <div class="name">${o.length?l:i}</div>
            <div class="state">${o.length?c:l}</div>
          </div>
          ${this._hasNavigateAction?I`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`:""}
        </div>
      </ha-card>
    `}_handleTap(){this._handleAction(this.config.tap_action||{action:"more-info"})}getGridOptions(){return{columns:6,rows:"auto"}}getCardSize(){return 1}}customElements.define("materia-pill",pn),window.customCards=window.customCards||[],window.customCards.push({type:"materia-pill",name:"Materia Pill",description:"Compact info pill for sensors, weather, and status indicators.",preview:!0});const un=[Ee,ze,Ae,n`
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

  @media (prefers-reduced-motion: reduce) {
    .portal-panel,
    .portal-panel.closing {
      animation: none;
    }
  }
`];class mn extends We{static properties={_expanded:{state:!0}};static styles=[We.styles,n`
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
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{position:"auto",menu_variant:"surface",...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"position",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (flips to fit the viewport)"},{value:"below",label:"Below"},{value:"above",label:"Above"}]}}}]},{title:"Substate",icon:"mdi:format-text-variant-outline",fields:[{name:"substate",label:"Substate text / template",template:!0,selector:{text:{}}},{name:"substate_entity",label:"…or from entity",selector:{entity:{}}},{name:"substate_attribute",label:"Entity attribute (optional)",selector:{text:{}}},{name:"substate_separator",label:"Separator",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"•",label:"Dot •"},{value:"–",label:"Dash –"},{value:"/",label:"Slash /"}]}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"Text / icon",color:!0,template:!0,selector:{text:{}}},{name:"menu_variant",label:"Menu style",selector:{select:{mode:"dropdown",options:[{value:"surface",label:"Surface (classic)"},{value:"expressive",label:"Expressive (container tone, trailing icons)"}]}}},{name:"menu_color",label:"Menu panel color (expressive)",color:!0,selector:{text:{}}},{name:"menu_color_on",label:"Menu text color (expressive)",color:!0,selector:{text:{}}}]}]}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}_renderExtra(){return I`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${qe((e,t)=>this._moveOption(e,t),(this._config.options||[]).map((e,t)=>I`
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
                        .computeLabel=${De}
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
    `}_stateLabel(e){return Array.isArray(e)?e.join(", "):e||""}_parseStateInput(e){const t=(e||"").trim();return t.includes(",")?t.split(",").map(e=>e.trim()).filter(Boolean):t}_addStateColor(){const e=[...this._config.state_colors||[],{}];this._commit({...this._config,state_colors:e})}_removeStateColor(e){const t=[...this._config.state_colors||[]];t.splice(e,1);const i={...this._config};t.length?i.state_colors=t:delete i.state_colors,this._commit(i)}_updateStateColor(e,t,i){const s=(this._config.state_colors||[]).map(e=>({...e}));s[e]&&(""===i||null==i?delete s[e][t]:s[e][t]=i,this._commit({...this._config,state_colors:s}))}_addOption(){const e=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const i=[...this._config.options||[]],[s]=i.splice(e,1);i.splice(t,0,s),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:i})}_updateOptionForm(e,t){const i=[...this._config.options||[]];i[e]={...i[e],...t},this._commit({...this._config,options:i})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-menu-editor",mn);class gn extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_open:{state:!0},_optimisticValue:{state:!0},_resolvedIcon:{state:!0},_resolvedName:{state:!0},_resolvedSubstate:{state:!0},_resolvedColor:{state:!0},_resolvedColorOn:{state:!0}};static styles=un;static getConfigElement(){return document.createElement("materia-menu-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("input_select.")||e.startsWith("select."))||"";return{entity:t}}setConfig(e){this.config={position:"auto",...e},this._open=!1}get _resolvedOptions(){if(this.config.options?.length)return this.config.options;const e=this.hass?.states[this.config.entity],t=this.config.entity?.split(".")[0];if(("input_select"===t||"select"===t)&&e?.attributes?.options)return e.attributes.options.map(e=>({label:this._capitalize(e),value:e}));if("water_heater"===t&&e?.attributes?.operation_list){const t={eco:"mdi:leaf",performance:"mdi:speedometer",electric:"mdi:lightning-bolt",gas:"mdi:fire",heat_pump:"mdi:heat-pump-outline",high_demand:"mdi:water-plus",off:"mdi:power"};return e.attributes.operation_list.map(e=>({label:this._capitalize(e),value:e,icon:t[e]}))}return[]}get _pos(){return"above"===this.config.position||"below"===this.config.position?this.config.position:this._effPos??"below"}_computeEffPos(){const e=this.shadowRoot?.querySelector(".trigger");if(!e)return"below";const t=e.getBoundingClientRect(),i=Math.min(56*this._resolvedOptions.length+20,Math.min(600,.7*window.innerHeight)),s=window.innerHeight-t.bottom;return s>=i+8||s>=t.top?"below":"above"}get _currentValue(){return null!=this._optimisticValue?this._optimisticValue:this.hass?.states[this.config.entity]?.state??""}get _substate(){const e=this.config;if(null!=e.substate&&""!==e.substate)return this._isTemplate(e.substate)?this._resolvedSubstate??"":e.substate;if(e.substate_entity){const t=this.hass?.states[e.substate_entity];if(!t)return"";const i=e.substate_attribute?t.attributes?.[e.substate_attribute]:t.state;return null==i?"":String(i)}return""}_toggle(){this._open||(this._effPos=this._computeEffPos()),this._open=!this._open}_selectOption(e){const t=e.value;this._optimisticValue=t,this._open=!1;const i=this.config.entity?.split(".")[0];"input_select"===i||"select"===i?this._callService(i,"select_option",{entity_id:this.config.entity,option:t}):"water_heater"===i&&this._callService("water_heater","set_operation_mode",{entity_id:this.config.entity,operation_mode:t}),clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticValue=null},1e4)}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=e=>{if(!this._open)return;const t=e.composedPath?.()||[];t.includes(this)||this._portal&&t.includes(this._portal)||(this._open=!1)},document.addEventListener("click",this._outsideClickHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler),clearTimeout(this._optimisticTimer),clearTimeout(this._portalTimer),this._detachReposition(),this._removePortal()}updated(e){if(e.has("hass")&&this.hass&&(this._resolveField("icon","_resolvedIcon"),this._resolveField("name","_resolvedName"),this._resolveField("substate","_resolvedSubstate"),this._resolveField("color","_resolvedColor"),this._resolveField("color_on","_resolvedColorOn")),e.has("hass")&&null!=this._optimisticValue){const e=this.hass?.states[this.config.entity]?.state;e===this._optimisticValue&&(this._optimisticValue=null,clearTimeout(this._optimisticTimer))}e.has("_open")?this._open?this._openPortal():this._closePortal():this._open&&this._portalRoot&&!this._closing&&(this._renderPortal(),this._positionPortal())}_matchStateColor(e){const t=this.config.state_colors,i=Array.isArray(t)?t:Object.entries(t).map(([e,t])=>"string"==typeof t?{state:e,color:t}:{state:e,...t});return i.find(t=>Array.isArray(t.state)?t.state.map(String).includes(String(e)):String(t.state)===String(e))}_colors(){const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=this._currentValue;let s=this._resolvedColor||this.config.color,a=this._resolvedColorOn||this.config.color_on;const n=this.config.state_colors?this._matchStateColor(i):null;n&&(n.color&&(s=n.color),n.color_on&&(a=n.color_on));const o=!t&&(s||a),r=o?`${s?`background-color:${s};`:""}${a?`color:${a};`:""}`:"";return{stateObj:e,unavailable:t,currentValue:i,colored:o,triggerStyle:r,panelStyle:""+(s?`--_surf:${s};`:"")+(o&&a?`${r}--menu-selected-bg:color-mix(in srgb, ${a} 22%, transparent);--menu-selected-fg:${a};`:r)}}_ensurePortal(){if(this._portal)return;const e=document.createElement("div");e.className="materia-menu-portal",e.style.cssText="position:fixed; z-index:1000; pointer-events:auto;";const t=e.attachShadow({mode:"open"}),i=Array.isArray(un)?un:[un];if("adoptedStyleSheets"in t&&i.every(e=>e.styleSheet))t.adoptedStyleSheets=i.map(e=>e.styleSheet);else{const e=document.createElement("style");e.textContent=i.map(e=>e.cssText).join("\n"),t.appendChild(e)}document.body.appendChild(e),this._portal=e,this._portalRoot=t}_removePortal(){this._portal&&(this._portal.remove(),this._portal=null,this._portalRoot=null)}static PORTAL_VARS=["--card-background-color","--divider-color","--ha-card-background","--md-sys-color-on-secondary","--md-sys-color-on-tertiary","--md-sys-color-on-tertiary-container","--md-sys-color-outline-variant","--md-sys-color-secondary","--md-sys-color-surface-container-high","--md-sys-color-tertiary","--md-sys-color-tertiary-container","--primary-text-color"];_syncThemeVars(){if(!this._portal)return;const e=getComputedStyle(this);for(const t of gn.PORTAL_VARS){const i=e.getPropertyValue(t);i?this._portal.style.setProperty(t,i):this._portal.style.removeProperty(t)}}_positionPortal(){if(!this._portal)return;const e=this.shadowRoot?.querySelector(".trigger");if(!e)return;const t=e.getBoundingClientRect(),i=this._portal;"expressive"===this.config.menu_variant?(i.style.left="auto",i.style.right=`${Math.max(8,window.innerWidth-t.right)}px`,i.style.width="auto",i.style.maxWidth="min(320px, calc(100vw - 24px))"):(i.style.right="auto",i.style.maxWidth="",i.style.left=`${t.left}px`,i.style.width=`${t.width}px`),"above"===this._pos?(i.style.top="auto",i.style.bottom=window.innerHeight-t.top+2+"px"):(i.style.bottom="auto",i.style.top=`${t.bottom+2}px`)}_attachReposition(){this._repositionRef||(this._repositionRef=()=>this._positionPortal(),window.addEventListener("scroll",this._repositionRef,!0),window.addEventListener("resize",this._repositionRef))}_detachReposition(){this._repositionRef&&(window.removeEventListener("scroll",this._repositionRef,!0),window.removeEventListener("resize",this._repositionRef),this._repositionRef=null)}_openPortal(){this._closing=!1,clearTimeout(this._portalTimer),this._ensurePortal(),this._portal.style.display="",this._syncThemeVars(),this._positionPortal(),this._renderPortal(),this._attachReposition()}_closePortal(){this._portalRoot&&(this._closing=!0,this._renderPortal(),this._detachReposition(),clearTimeout(this._portalTimer),this._portalTimer=setTimeout(()=>{this._portal&&(this._portal.style.display="none"),this._closing=!1},170))}_renderPortal(){this._portalRoot&&re(this._dropdownTemplate(),this._portalRoot)}_dropdownTemplate(){if(!this.hass||!this.config)return I``;const{panelStyle:e,currentValue:t}=this._colors(),i=this._resolvedOptions,s=this._pos,a="expressive"===this.config.menu_variant,n=a?`${this.config.menu_color?`--_surf:${this.config.menu_color};`:""}${this.config.menu_color_on?`color:${this.config.menu_color_on};`:""}`:"";return I`
      <div class="portal-panel ${s} ${a?"exp":""} ${this._closing?"closing":""}">
        <div class="dropdown ${a?"expressive":""}" style=${e+n}>
          ${i.map(e=>I`
            <div
              class="menu-item ${e.value===t?"selected":""}"
              @click=${t=>{t.stopPropagation(),this._selectOption(e)}}
            >
              ${a?I`<span class="item-text">${e.label||e.value}</span>${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}`:I`${e.icon?I`<ha-icon .icon=${e.icon}></ha-icon>`:""}<span class="item-text">${e.label||e.value}</span>`}
            </div>
          `)}
        </div>
      </div>
    `}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),i=this._currentValue,s=this._resolvedOptions,a=s.find(e=>e.value===i)?.label||this._capitalize(i),n=this._substate,o=this._isTemplate(this.config.name)?this._resolvedName:this.config.name||e?.attributes?.friendly_name||"",{triggerStyle:r}=this._colors();return I`
      <ha-card>
        <div class="trigger ${t?"unavailable":""} ${this._open?"above"===this._pos?"open-above":"open-below":""}" style=${r} @click=${this._toggle}>
          ${(()=>{const t=(this._isTemplate(this.config.icon)?this._resolvedIcon:this.config.icon)||e?.attributes?.icon||{water_heater:"mdi:water-boiler",input_select:"mdi:format-list-bulleted",select:"mdi:format-list-bulleted"}[this.config.entity?.split(".")[0]];return t?I`
              <div class="icon-container">
                <ha-icon .icon=${t}></ha-icon>
              </div>
            `:""})()}
          <div class="text-container">
            ${o?I`<div class="label">${o}</div>`:""}
            <div class="value">
              <span class="value-main">${a}</span>
              ${n?I`<span class="value-sep">${this.config.substate_separator||"•"}</span><span class="value-sub">${n}</span>`:""}
            </div>
          </div>
          <div class="chevron-btn" @click=${e=>{e.stopPropagation(),this._toggle()}}>
            <ha-icon class="chevron" icon=${this._open?"m3of:arrow-drop-up":"m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-menu",gn),window.customCards=window.customCards||[],window.customCards.push({type:"materia-menu",name:"Materia Menu",description:"M3 vertical dropdown menu for select entities.",preview:!0});const fn=n`
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
    stroke: var(--md-sys-color-secondary-container, var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.3)));
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

  @media (prefers-reduced-motion: reduce) {
    .wave {
      animation: none;
    }
  }
`;customElements.define("materia-media-progress-editor",class extends We{_formData(){return{show_times:!0,seekable:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"show_times",selector:{boolean:{}}},{name:"seekable",selector:{boolean:{}}},{name:"live",label:"Live stream",helper:"Keep the track full and show ∞ for a live stream, even when the player reports idle.",selector:{boolean:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"Wave color",color:!0,template:!0,selector:{text:{}}}]}]}});let _n=0;class bn extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_w:{state:!0},_resolvedColor:{state:!0}};static styles=fn;static getConfigElement(){return document.createElement("materia-media-progress-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("media_player."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config=e,this._cid??="mp-clip-"+ ++_n}_position(){const e=this.hass?.states[this.config.entity];if(!e)return{pos:0,dur:0,playing:!1,live:!1};const t=Number(e.attributes.media_duration)||0;let i=Number(e.attributes.media_position)||0;const s="playing"===e.state,a=e.attributes.media_position_updated_at,n=`${this.config.entity}|${e.attributes.media_content_id??e.attributes.media_title??""}`;if(n!==this._latchKey&&(this._trackAnchorAt=Date.now()),s&&a){const e=Math.max(new Date(a).getTime(),this._trackAnchorAt??0);i+=Math.max(0,Date.now()-e)/1e3}n!==this._latchKey&&(this._latchKey=n,this._live=!1),s?t>0&&i>=t-.25&&(this._live=!0):this._live=!1;const o=!0===this.config.live||s&&this._live;return t&&(i=Math.min(i,t)),{pos:Math.max(0,i),dur:t,playing:s,live:o}}_fmt(e){e=Math.max(0,Math.round(e));const t=Math.floor(e/3600),i=Math.floor(e%3600/60),s=e%60,a=e=>String(e).padStart(2,"0");return t>0?`${t}:${a(i)}:${a(s)}`:`${i}:${a(s)}`}_wavePath(e,t){let i="";for(let s=e;s<=t;s+=2){const e=14-2*Math.sin(2*Math.PI*s/32);i+=`${i?" L":"M"} ${s.toFixed(1)} ${e.toFixed(1)}`}return i||"M 0 14"}firstUpdated(){const e=this.shadowRoot?.querySelector(".bar");e&&(this._w=e.clientWidth,this._ro=new ResizeObserver(e=>{this._w=e[0].contentRect.width}),this._ro.observe(e))}updated(){const e=this.shadowRoot;this._clipRect=e?.querySelector("clipPath rect"),this._thumbEl=e?.querySelector(".thumb"),this._trackEl=e?.querySelector(".track"),this._posEl=e?.querySelector(".time");const{playing:t,live:i}=this._position();t&&!i?this._startLoop():this._stopLoop(),this.hass&&this._resolveField("color","_resolvedColor")}_startLoop(){if(this._raf)return;const e=()=>{this._raf=requestAnimationFrame(e),this._tickDom()};this._raf=requestAnimationFrame(e)}_tickDom(){const{pos:e,dur:t,live:i}=this._position(),s=this._w||300,a=(i?1:t>0?Math.min(1,e/t):0)*s;this._clipRect&&this._clipRect.setAttribute("width",Math.max(0,a)),this._thumbEl&&this._thumbEl.setAttribute("x",a-2),this._trackEl&&this._trackEl.setAttribute("x1",a),this._posEl&&(this._posEl.textContent=this._fmt(e)),i&&this._stopLoop()}_stopLoop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_fullWave(e){return this._waveW!==e&&(this._waveW=e,this._wavePathCache=this._wavePath(-32,e+32)),this._wavePathCache}disconnectedCallback(){super.disconnectedCallback(),this._stopLoop(),this._ro?.disconnect()}_seek(e){if(!1===this.config.seekable)return;const{dur:t}=this._position();if(!t)return;const i=e.currentTarget.getBoundingClientRect(),s=Math.max(0,Math.min(1,(e.clientX-i.left)/i.width));this._callService("media_player","media_seek",{entity_id:this.config.entity,seek_position:s*t})}render(){if(!this.hass||!this.config)return I``;const e=this.hass.states[this.config.entity],t=this._isUnavailable(e),{pos:i,dur:s,playing:a,live:n}=this._position(),o=this._w||300,r=(n?1:s>0?Math.min(1,i/s):0)*o,l=!1!==this.config.show_times,c=this._resolvedColor||this.config.color;return I`
      <ha-card>
        <div class="wrap ${t?"unavailable":""}" style=${c?`--mp-color:${c};`:""}>
          <div class="bar" @pointerdown=${this._seek}>
            <svg width="100%" height=${28}>
              <defs>
                <clipPath id=${this._cid}>
                  <rect x="0" y="0" width=${Math.max(0,r)} height=${28}></rect>
                </clipPath>
              </defs>
              <line class="track" x1=${r} y1=${14} x2=${o} y2=${14}></line>
              <g clip-path="url(#${this._cid})">
                <path class="wave ${a||n?"playing":""}" d=${this._fullWave(o)}></path>
              </g>
              <rect class="thumb" x=${r-2} y=${4} width="4" height="20" rx="2"></rect>
            </svg>
          </div>
          ${l?I`
                <div class="times">
                  <span class="time">${this._fmt(i)}</span>
                  <span class="time">${n?"∞":this._fmt(s)}</span>
                </div>
              `:V}
        </div>
      </ha-card>
    `}getCardSize(){return 1}}customElements.define("materia-media-progress",bn),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media-progress",name:"Materia Media Progress",description:"Wavy (M3 expressive) media seek bar with elapsed/duration and tap-to-seek.",preview:!0});const vn=n`
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
    background-color: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.2)));
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
`;customElements.define("materia-media-editor",class extends We{_formData(){return{show_art:!0,...this._config}}get _sections(){return[{title:"Content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"name",label:"Title",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"image",helper:"Defaults to the entity's album art",template:!0,selector:{text:{}}},{name:"fallback_image",helper:"Shown when there's no art",selector:{text:{}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"show_art",selector:{boolean:{}}},{name:"art_size",label:"Art size (px)",selector:{number:{min:80,max:480,mode:"box"}}}]},{title:"Actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});class yn extends(Te(ce)){static properties={hass:{attribute:!1},config:{state:!0},_resolvedName:{state:!0},_resolvedSubtitle:{state:!0},_resolvedImage:{state:!0}};static styles=vn;static getConfigElement(){return document.createElement("materia-media-editor")}static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("media_player."))||"";return{entity:t}}setConfig(e){if(!e.entity)throw new Error("entity is required");this.config=e}updated(e){if(e.has("hass")&&this.hass){this._resolveField("name","_resolvedName"),this._resolveField("subtitle","_resolvedSubtitle"),this._resolveField("image","_resolvedImage");const e=this._stateObj?.attributes?.media_title;e&&this._lastTrack&&e!==this._lastTrack&&(this._beat=!0,this.requestUpdate(),clearTimeout(this._beatTimer),this._beatTimer=setTimeout(()=>{this._beat=!1,this.requestUpdate()},900)),this._lastTrack=e}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._beatTimer)}get _stateObj(){return this.hass?.states[this.config.entity]}get _title(){if(this.config.name)return this._isTemplate(this.config.name)?this._resolvedName:this.config.name;const e=this._stateObj?.attributes;return e?.media_title||e?.friendly_name||""}get _subtitle(){if(this.config.subtitle)return this._isTemplate(this.config.subtitle)?this._resolvedSubtitle:this.config.subtitle;const e=this._stateObj?.attributes;return e?.media_artist||e?.media_album_name||""}get _image(){if(this.config.image){const e=this._isTemplate(this.config.image)?this._resolvedImage:this.config.image;if(e)return e}return this._stateObj?.attributes?.entity_picture||this.config.fallback_image||""}_tap(){this._handleAction(this.config.tap_action||{action:"more-info"})}render(){if(!this.hass||!this.config)return I``;const e=this._stateObj,t=this._isUnavailable(e),i=this._image,s=this._title,a=this._subtitle,n=this.config.fallback_image,o=[i,n&&n!==i?n:null].filter(Boolean).map(e=>`url('${e}')`).join(", "),r=`${this.config.art_size?`--mm-art:${this.config.art_size}px;`:""}${o?`background-image:${o};`:""}`,l=!t&&!!e?.attributes?.media_title&&!["off","idle","standby"].includes(e.state),c=l&&"paused"===e.state;return I`
      <ha-card>
        <div class="wrap ${t?"unavailable":""} ${l?"editorial":""} ${this._beat?"beat":""} ${c?"paused":""}" @click=${this._tap}>
          ${!1===this.config.show_art?V:I`<div class="art" style=${r}></div>`}
          ${s?I`<div class="title">${s}</div>`:V}
          ${a?I`<div class="subtitle">${a}</div>`:V}
        </div>
      </ha-card>
    `}getCardSize(){return 4}}customElements.define("materia-media",yn),window.customCards=window.customCards||[],window.customCards.push({type:"materia-media",name:"Materia Media",description:"Now-playing card — album art, title and subtitle (all templatable).",preview:!0});const xn=n`
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

  .date {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    /* Was the system's one Fraunces-italic accent moment; retired — it read
       as a different product wedged into the clock face. */
    font-family: var(--materia-font-display, inherit);
    font-weight: 600;
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
`;customElements.define("materia-clock-editor",class extends We{_formData(){return{hand_width:5,size:10,show_seconds:!0,numbers:"cardinal",...this._config}}get _sections(){return[{title:"Clock",icon:"mdi:clock-outline",fields:[{name:"numbers",selector:{select:{mode:"dropdown",options:[{value:"cardinal",label:"Cardinal (12 · 3 · 6 · 9)"},{value:"all",label:"All (1–12)"},{value:"dots",label:"Hour dots"},{value:"none",label:"None"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"second_dot",label:"Second hand as rim dot",selector:{boolean:{}}},{name:"smooth",label:"Smooth second hand",selector:{boolean:{}}},{name:"cookie",label:"Cookie face (12-sided)",selector:{boolean:{}}},{name:"digital",label:"Digital readout (HH/MM behind hands)",selector:{boolean:{}}},{name:"date",label:"Show date",selector:{boolean:{}}},{name:"hand_width",label:"Hand thickness",selector:{number:{min:1,max:12,step:.5,mode:"slider"}}},{name:"size",label:"Size (10 = fill)",selector:{number:{min:1,max:10,step:1,mode:"slider"}}}]},{title:"Appearance",icon:"mdi:palette-outline",fields:[{name:"face_color",label:"Face",color:!0,template:!0,selector:{text:{}}},{name:"number_color",label:"Numbers",color:!0,template:!0,selector:{text:{}}},{name:"hand_color",label:"Hands",color:!0,template:!0,selector:{text:{}}},{name:"second_color",label:"Second hand",color:!0,template:!0,selector:{text:{}}}]}]}});customElements.define("materia-clock",class extends ce{static properties={hass:{attribute:!1},config:{state:!0},_t:{state:!0}};static styles=xn;static getConfigElement(){return document.createElement("materia-clock-editor")}static getStubConfig(){return{numbers:"cardinal",show_seconds:!0}}setConfig(e){this.config=e||{}}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._stop()}updated(e){e.has("config")&&(this._facePath=null,this._stop(),this._start())}_scallop(){let e="";for(let t=0;t<=240;t++){const i=t/240*Math.PI*2,s=48+1*Math.cos(12*i);e+=`${0===t?"M":"L"}${(50+s*Math.cos(i)).toFixed(2)} ${(50+s*Math.sin(i)).toFixed(2)} `}return e+"Z"}_start(){if(!this._raf&&!this._tick)if(this.config?.smooth){const e=()=>{this._raf=requestAnimationFrame(e),this._t=performance.now()};this._raf=requestAnimationFrame(e)}else this._tick=setInterval(()=>this._t=Date.now(),1e3)}_stop(){this._raf&&cancelAnimationFrame(this._raf),this._tick&&clearInterval(this._tick),this._raf=null,this._tick=null}render(){if(!this.config)return I``;const e=new Date,t=!!this.config.smooth,i=e.getSeconds()+(t?e.getMilliseconds()/1e3:0),s=e.getMinutes()+i/60,a=30*(e.getHours()%12+s/60),n=6*s,o=6*i,r=!1!==this.config.show_seconds,l=!!(this.config.cookie??this.config.squiggle);l&&(this._facePath??=this._scallop());const c=this.config.numbers||"cardinal",d="all"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:"cardinal"===c?[12,3,6,9]:[],h="all"===c?40:34,p="all"===c?9:18,u="dots"===c?[1,2,3,4,5,6,7,8,9,10,11,12]:[],m=!!this.config.digital,g=String(e.getHours()%12||12).padStart(2,"0"),f=String(e.getMinutes()).padStart(2,"0"),_=!!this.config.date,b=`${e.toLocaleDateString(void 0,{weekday:"short"})} ${e.getDate()}`,v=(a%360+360)%360,y=(n%360+360)%360,x=Math.min(v,y),w=Math.max(v,y),k=w-x;let $=k>=360-k?x+k/2:w+(360-k)/2;$=30*Math.round(($-15)/30)+15,$=($%360+360)%360;const C=$*Math.PI/180,S=u.length?41:d.length?h:40,T=(50+S*Math.sin(C)).toFixed(2),z=(50-S*Math.cos(C)).toFixed(2);let A=$;A>90&&A<270&&(A-=180);const E=4.4*b.length/2/S*(180/Math.PI)+(u.length?4:8),M=e=>{if(!_)return!1;const t=(e%12*30%360+360)%360;let i=Math.abs(t-$)%360;return i>180&&(i=360-i),i<E},O=d.filter(e=>!M(e)),F=u.filter(e=>!M(e)),D=!!this.config.second_dot,q=o*Math.PI/180,N=(50+44*Math.sin(q)).toFixed(2),P=(50-44*Math.cos(q)).toFixed(2),R=this.config.hand_width,L=`--clock-size:${["98px","136px","174px","212px","250px","300px","360px","440px","560px","100%"][Math.min(10,Math.max(1,this.config.size??10))-1]};`+(this.config.face_color?`--clock-face:${this.config.face_color};`:"")+(this.config.number_color?`--clock-number:${this.config.number_color};`:"")+(this.config.hand_color?`--clock-hand:${this.config.hand_color};`:"")+(this.config.second_color?`--clock-second:${this.config.second_color};`:"")+(R?`--clock-hour-w:${R};--clock-minute-w:${(.7*R).toFixed(2)};--clock-second-w:${(.3*R).toFixed(2)};`:"");return I`
      <ha-card style=${L}>
        <svg viewBox="0 0 100 100">
          ${l?H`<path class="face" d=${this._facePath}></path>`:H`<circle class="face" cx="50" cy="50" r="49"></circle>`}
          ${O.map(e=>{const t=e%12*30*Math.PI/180,i=50+h*Math.sin(t),s=50-h*Math.cos(t);return H`<text class="num" x=${i.toFixed(1)} y=${s.toFixed(1)} font-size=${p} text-anchor="middle" dominant-baseline="central">${e}</text>`})}
          ${F.map(e=>{const t=e%12*30*Math.PI/180,i=50+41*Math.sin(t),s=50-41*Math.cos(t);return H`<circle class="dot" cx=${i.toFixed(1)} cy=${s.toFixed(1)} r="1.3"></circle>`})}
          ${m?(()=>{const t=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,i=(e.getSeconds()+(e.getMilliseconds?.()??0)/1e3)/60,s=t?800:Math.round(780+20*(1-Math.cos(2*Math.PI*i)));return H`
                <text class="digital" style="font-weight:${s}" x="50" y="40" font-size="30" text-anchor="middle" dominant-baseline="central">${g}</text>
                <text class="digital" style="font-weight:${s}" x="50" y="64" font-size="30" text-anchor="middle" dominant-baseline="central">${f}</text>
              `})():""}
          ${_?H`<text class="date" x=${T} y=${z} font-size="8" text-anchor="middle" dominant-baseline="central" transform="rotate(${A.toFixed(1)} ${T} ${z})">${b}</text>`:""}
          <line class="hand hour" x1="50" y1="50" x2="50" y2="28" transform="rotate(${a.toFixed(2)} 50 50)"></line>
          <line class="hand minute" x1="50" y1="50" x2="50" y2="16" transform="rotate(${n.toFixed(2)} 50 50)"></line>
          ${r?D?H`<circle class="second-dot" cx=${N} cy=${P} r="3.2"></circle>`:H`<line class="hand second" x1="50" y1="56" x2="50" y2="13" transform="rotate(${o.toFixed(2)} 50 50)"></line>`:""}
          <circle class="pin" cx="50" cy="50" r="2.4"></circle>
        </svg>
      </ha-card>
    `}getCardSize(){return 4}}),window.customCards=window.customCards||[],window.customCards.push({type:"materia-clock",name:"Materia Clock",description:"Material You analog clock — cardinal numbers, sweeping hands.",preview:!0}),function(){if(document.querySelector("#materia-fonts"))return;const e=document.createElement("style");e.id="materia-fonts",e.textContent="\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: italic;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Figtree';\n      font-style: normal;\n      font-weight: 300 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* Display voice: Outfit VARIABLE (true wght 100-900 axis) — hero\n       numerals & titles via --materia-font-display; the weight axis\n       interpolates smoothly, which flavor C's morphs animate. */\n    @font-face {\n      font-family: 'Outfit';\n      font-style: normal;\n      font-weight: 100 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJuktqUYLkn8BJ.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    @font-face {\n      font-family: 'Outfit';\n      font-style: normal;\n      font-weight: 100 900;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtqUYLknw.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n    /* Accent voice: Fraunces italic — ONE personality moment (clock date). */\n    @font-face {\n      font-family: 'Fraunces';\n      font-style: italic;\n      font-weight: 500;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7frU9kMz3lR27gVA.woff2) format('woff2');\n      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n    }\n    @font-face {\n      font-family: 'Fraunces';\n      font-style: italic;\n      font-weight: 500;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7RrU9kMz3lR24.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  ",document.head.appendChild(e)}();console.info("%c MATERIA %c v0.66.2 ","color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");
