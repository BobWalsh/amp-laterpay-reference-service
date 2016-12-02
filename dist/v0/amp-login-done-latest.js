(function(){var p,ea="";function r(a){var b=a||self,c;if(b.AMP_MODE)c=b.AMP_MODE;else{c=b;if(c.context&&c.context.mode)c=c.context.mode;else{var d=fa(c.location.originalHash||c.location.hash),e=fa(c.location.search);ea||(ea=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011480695002348");c={localDev:!1,development:!("1"!=d.development&&!c.AMP_DEV_MODE),filter:d.filter,minified:!0,lite:void 0!=e.amp_lite,test:!1,log:d.log,version:"1480695002348",rtvVersion:ea}}c=b.AMP_MODE=c}return c}
function fa(a){var b=Object.create(null);if(!a)return b;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d],f=e.indexOf("="),k,h;-1!=f?(k=decodeURIComponent(e.substring(0,f)).trim(),h=decodeURIComponent(e.substring(f+1)).trim()):(k=decodeURIComponent(e).trim(),h="");k&&(b[k]=h)}return b};var wa=Date.now();function xa(a,b,c){this.win=a;this.f=b;this.a=this.win.console&&this.win.console.log&&"0"!=r().log?this.f({localDev:!1,development:r(void 0).development,filter:r(void 0).filter,minified:!0,lite:r(void 0).lite,test:!1,log:r(void 0).log,version:r(void 0).version,rtvVersion:r(void 0).rtvVersion}):0;this.b=c||""}
function ya(a,b,c,d){if(0!=a.a){var e=a.win.console.log;"ERROR"==c?e=a.win.console.error||e:"INFO"==c?e=a.win.console.info||e:"WARN"==c&&(e=a.win.console.warn||e);d.unshift(Date.now()-wa,"["+b+"]");e.apply(a.win.console,d)}}p=xa.prototype;p.isEnabled=function(){return 0!=this.a};p.fine=function(a,b){4<=this.a&&ya(this,a,"FINE",Array.prototype.slice.call(arguments,1))};p.info=function(a,b){3<=this.a&&ya(this,a,"INFO",Array.prototype.slice.call(arguments,1))};
p.warn=function(a,b){2<=this.a&&ya(this,a,"WARN",Array.prototype.slice.call(arguments,1))};p.error=function(a,b){if(1<=this.a)ya(this,a,"ERROR",Array.prototype.slice.call(arguments,1));else{var c=za.apply(null,Array.prototype.slice.call(arguments,1));Aa(this,c);this.win.setTimeout(function(){throw c;})}};p.createError=function(a){var b=za.apply(null,arguments);Aa(this,b);return b};
p.assert=function(a,b,c){var d;if(!a){var e=(b||"Assertion failed").split("%s"),f=e.shift(),k=f,h=[];""!=f&&h.push(f);for(f=2;f<arguments.length;f++){var n=arguments[f];n&&n.tagName&&(d=n);var C=e.shift();h.push(n);var J=C.trim();""!=J&&h.push(J);var J=k,t;t=n;t=t instanceof Element?t.tagName.toLowerCase()+(t.id?"#"+t.id:""):t;k=J+(t+C)}f=Error(k);f.fromAssert=!0;f.associatedElement=d;f.messageArray=h;Aa(this,f);throw f;}return a};
p.assertElement=function(a,b){this.assert(a&&1==a.nodeType,(b||"Element expected")+": %s",a);return a};p.assertString=function(a,b){this.assert("string"==typeof a,(b||"String expected")+": %s",a);return a};p.assertNumber=function(a,b){this.assert("number"==typeof a,(b||"Number expected")+": %s",a);return a};p.assertEnumValue=function(a,b,c){for(var d in a)if(a[d]==b)return a[d];this.assert(!1,'Unknown %s value: "%s"',c||"enum",b)};
function Aa(a,b){a.b&&(b.message?-1==b.message.indexOf(a.b)&&(b.message+=a.b):b.message=a.b)}function za(a){for(var b=null,c="",d=0;d<arguments.length;d++){var e=arguments[d];e instanceof Error&&!b?b=e:(c&&(c+=" "),c+=e)}b?c&&(b.message=c+": "+b.message):b=Error(c);return b}self.log=self.log||{user:null,dev:null};var F=self.log,K=null;
function Qa(){if(F.user)return F.user;if(!K)throw Error("failed to call initLogConstructor");return F.user=new K(self,function(a){var b=parseInt(a.log,10);return a.development||1<=b?4:0},"\u200b\u200b\u200b")}function Ra(){if(!F.dev){if(!K)throw Error("failed to call initLogConstructor");F.dev=new K(self,function(a){a=parseInt(a.log,10);return 3<=a?4:2<=a?3:0})}};function Sa(a){return a==this||this.documentElement.contains(a)};function Ta(a){return(a=Number(a))?0<a?1:-1:a};var Ua=Object.prototype.hasOwnProperty;function Va(a){if(null==a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var d=arguments[c];if(null!=d)for(var e in d)Ua.call(d,e)&&(b[e]=d[e])}return b};function S(a){if(!(this instanceof S))throw new TypeError("Constructor Promise requires `new`");if(!Wa(a))throw new TypeError("Must pass resolver function");this._state=Xa;this._value=[];this._isChainEnd=!0;Ya(this,Za(this,$a),Za(this,sb),{then:a})}S.prototype.then=function(a,b){a=Wa(a)?a:void 0;b=Wa(b)?b:void 0;if(a||b)this._isChainEnd=!1;return this._state(this._value,a,b)};S.prototype.catch=function(a){return this.then(void 0,a)};
function tb(a){var b=this,c;return c=a===Object(a)&&a instanceof this?a:new b(function(b){b(a)})}function ub(a){return new this(function(b,c){c(a)})}function vb(a){var b=this;return new b(function(c,d){var e=a.length,f=Array(e);if(0===e)return c(f);wb(a,function(a,h){b.resolve(a).then(function(a){f[h]=a;0===--e&&c(f)},d)})})}function xb(a){var b=this;return new b(function(c,d){for(var e=0,f=a.length;e<f;e++)b.resolve(a[e]).then(c,d)})}
function $a(a,b,c,d){if(!b)return this;d||(d=new yb(this.constructor));zb(Ab(d,b,a));return d.promise}function sb(a,b,c,d){if(!c)return this;d||(d=new yb(this.constructor));zb(Ab(d,c,a));return d.promise}function Xa(a,b,c,d){if(!b&&!c)return this;d||(d=new yb(this.constructor));a.push({deferred:d,onFulfilled:b||d.resolve,onRejected:c||d.reject});return d.promise}function yb(a){var b=this;this.promise=new a(function(a,d){b.resolve=a;b.reject=d});return b}
function Bb(a,b,c){var d=a._value;a._state=b;a._value=c;for(var e=0;e<d.length;e++){var f=d[e];a._state(c,f.onFulfilled,f.onRejected,f.deferred)}b===sb&&a._isChainEnd&&setTimeout(function(){if(a._isChainEnd)throw c;},0)}function Za(a,b){return function(c){Bb(a,b,c)}}function Cb(){}function Wa(a){return"function"===typeof a}function wb(a,b){for(var c=0;c<a.length;c++)b(a[c],c)}
function Ab(a,b,c){var d=a.promise,e=a.resolve,f=a.reject;return function(){try{var a=b(c);e!==b&&f!==b&&Ya(d,e,f,a,a)}catch(h){f(h)}}}var zb=function(){function a(){for(var a=0;a<e;a++){var b=d[a];d[a]=null;b()}e=0}function b(a){0===e&&c();d[e++]=a}var c;"undefined"!==typeof window&&window.postMessage?(window.addEventListener("message",a),c=function(){window.postMessage("macro-task","*")}):c=function(){setTimeout(a,0)};var d=Array(16),e=0;return b}();
function Ya(a,b,c,d,e){var f=c,k,h;try{if(d===a)throw new TypeError("Cannot fulfill promise with itself");var n=d===Object(d);n&&d instanceof a.constructor?Bb(a,d._state,d._value):n&&(k=d.then)&&Wa(k)?(h=function(d){h=f=Cb;Ya(a,b,c,d,d)},f=function(a){h=f=Cb;c(a)},k.call(e,function(a){h(a)},function(a){f(a)})):b(d)}catch(C){f(C)}};(function(a){function b(){var a=ga.splice(0,ga.length);for(ha=0;a.length;)a.shift().call(null,a.shift())}function c(a,b){for(var v=0,L=a.length;v<L;v++)Ba(a[v],b)}function d(a){for(var b=0,L=a.length,c;b<L;b++)c=a[b],V(c,W[f(c)])}function e(a){return function(b){Gb(b)&&(Ba(b,a),c(b.querySelectorAll(D),a))}}function f(a){var b=M.call(a,"is"),c=a.nodeName.toUpperCase();a=w.call(G,b?ia+b.toUpperCase():X+c);return b&&-1<a&&!k(c,b)?-1:a}function k(a,b){return-1<D.indexOf(a+'[is="'+b+'"]')}function h(a){var b=
a.currentTarget,c=a.attrChange,d=a.attrName,g=a.target,L=a[ja]||2,e=a[Ca]||3;if(ka&&(!g||g===b)&&b[E]&&"style"!==d&&(a.prevValue!==a.newValue||""===a.newValue&&(c===L||c===e)))b[E](d,c===L?null:a.prevValue,c===e?null:a.newValue)}function n(a){var c=e(a);return function(a){ga.push(c,a.target);ha&&clearTimeout(ha);ha=setTimeout(b,1)}}function C(a){ab&&(ab=!1,a.currentTarget.removeEventListener(bb,C));c((a.target||l).querySelectorAll(D),a.detail===x?x:y);N&&Ib()}function J(a,b){cb.call(this,a,b);Da.call(this,
{target:this})}function t(a,b){Jb(a,b);la?la.observe(a,Kb):(ma&&(a.setAttribute=J,a[z]=Ea(a),a[A](Lb,Da)),a[A](H,h));a[Y]&&ka&&(a.created=!0,a[Y](),a.created=!1)}function Ib(){for(var a,b=0,c=Z.length;b<c;b++)a=Z[b],O.contains(a)||(c--,Z.splice(b--,1),Ba(a,x))}function db(a){throw Error("A "+a+" type is already registered");}function Ba(a,b){var c,d=f(a);-1<d&&(Fa(a,W[d]),d=0,b!==y||a[y]?b!==x||a[x]||(a[y]=!1,a[x]=!0,d=1):(a[x]=!1,a[y]=!0,d=1,N&&0>w.call(Z,a)&&Z.push(a)),d&&(c=a[b+I])&&c.call(a))}
function na(){}function eb(a,b,c){c=c&&c[aa]||"";var d=b.prototype,g=Ga(d),v=b.observedAttributes||Ha,U={prototype:g};oa(g,Y,{value:function(){if(pa)pa=!1;else if(!this[ba]){this[ba]=!0;new b(this);d[Y]&&d[Y].call(this);var a=ca[qa.get(b)];(!P||1<a.create.length)&&fb(this)}}});oa(g,E,{value:function(a){-1<w.call(v,a)&&d[E].apply(this,arguments)}});d[gb]&&oa(g,Mb,{value:d[gb]});d[hb]&&oa(g,Nb,{value:d[hb]});c&&(U[aa]=c);a=a.toUpperCase();ca[a]={constructor:b,create:c?[c,ra(a)]:[a]};qa.set(b,a);l[sa](a.toLowerCase(),
U);Ja(a);Q[a].r()}function ib(a){return(a=ca[a.toUpperCase()])&&a.constructor}function jb(a){return"string"===typeof a?a:a&&a.is||""}function fb(a){for(var b=a[E],c=b?a.attributes:Ha,d=c.length,g;d--;)g=c[d],b.call(a,g.name||g.nodeName,null,g.value||g.nodeValue)}function Ja(a){a=a.toUpperCase();a in Q||(Q[a]={},Q[a].p=new kb(function(b){Q[a].r=b}));return Q[a].p}function lb(){function b(b){var c=a[b];if(c){a[b]=function Hb(a){var b;a||(a=this);a[ba]||(pa=!0,a=ca[qa.get(a.constructor)],a=(b=P&&1===
a.create.length)?Reflect.construct(c,Ha,a.constructor):l.createElement.apply(l,a.create),a[ba]=!0,pa=!1,b||fb(a));return a};a[b].prototype=c.prototype;try{c.prototype.constructor=a[b]}catch(Hb){Ob=!0,R(c,ba,{value:a[b]})}}}B&&delete a.customElements;R(a,"customElements",{configurable:!0,value:new na});R(a,"CustomElementRegistry",{configurable:!0,value:na});for(var c=Pb.get(/^HTML[A-Z]*[a-z]/),d=c.length;d--;b(c[d]));l.createElement=function(a,b){return(b=jb(b))?Ka.call(this,a,ra(b)):Ka.call(this,
a)}}var l=a.document,m=a.Object,Pb=function(a){function b(a,b){b=b.toLowerCase();b in g||(g[a]=(g[a]||[]).concat(b),g[b]=g[b.toUpperCase()]=a)}function c(a){var b=[],c;for(c in g)a.test(c)&&b.push(c);return b}var d=/^[A-Z]+[a-z]/,g=(m.create||m)(null),e={},f,Ia,h,q;for(Ia in a)for(q in a[Ia])for(h=a[Ia][q],g[q]=h,f=0;f<h.length;f++)g[h[f].toLowerCase()]=g[h[f].toUpperCase()]=q;e.get=function(a){return"string"===typeof a?g[a]||(d.test(a)?[]:""):c(a)};e.set=function ac(a,c){return d.test(a)?b(a,c):
b(c,a),e};return e}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],
HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:"element abbr address article aside b bdi bdo cite code command dd dfn dt em figcaption figure footer header i kbd mark nav noscript rp rt ruby s samp section small strong sub summary sup u var wbr".split(" "),HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],
HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:"h1 h2 h3 h4 h5 h6".split(" "),HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],
HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],
HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],
HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}}),sa="registerElement",z="__"+sa+(1E5*a.Math.random()>>0),A="addEventListener",
y="attached",I="Callback",x="detached",aa="extends",E="attributeChanged"+I,Mb=y+I,gb="connected"+I,hb="disconnected"+I,Y="created"+I,Nb=x+I,ja="ADDITION",La="MODIFICATION",Ca="REMOVAL",H="DOMAttrModified",bb="DOMContentLoaded",Lb="DOMSubtreeModified",X="<",ia="=",Qb=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,Rb="ANNOTATION-XML COLOR-PROFILE FONT-FACE FONT-FACE-SRC FONT-FACE-URI FONT-FACE-FORMAT FONT-FACE-NAME MISSING-GLYPH".split(" "),G=[],W=[],D="",O=l.documentElement,w=G.indexOf||function(a){for(var b=this.length;b--&&
this[b]!==a;);return b},Ma=m.prototype,Na=Ma.hasOwnProperty,ta=Ma.isPrototypeOf,R=m.defineProperty,Ha=[],Oa=m.getOwnPropertyDescriptor,mb=m.getOwnPropertyNames,Sb=m.getPrototypeOf,nb=m.setPrototypeOf,ob=!!m.__proto__,Ob=!1,ba="__dreCEv1",B=a.customElements,P=!!(B&&B.define&&B.get&&B.whenDefined),pb=m.create||m,Tb=a.Map||function(){var a=[],b=[],c;return{get:function(c){return b[w.call(a,c)]},set:function(d,g){c=w.call(a,d);0>c?b[a.push(d)-1]=g:b[c]=g}}},kb=a.Promise||function(a){function b(a){for(d=
!0;c.length;)c.shift()(a)}var c=[],d=!1,g={"catch":function(){return g},then:function(a){c.push(a);d&&setTimeout(b,1);return g}};a(b);return g},pa=!1,ca=pb(null),Q=pb(null),qa=new Tb,ra=String,Ga=m.create||function v(a){return a?(v.prototype=a,new v):this},Jb=nb||(ob?function(a,b){a.__proto__=b;return a}:mb&&Oa?function(){function a(a,b){for(var c,d=mb(b),e=0,f=d.length;e<f;e++)c=d[e],Na.call(a,c)||R(a,c,Oa(b,c))}return function(b,c){do a(b,c);while((c=Sb(c))&&!ta.call(c,b));return b}}():function(a,
b){for(var c in b)a[c]=b[c];return a}),da=a.MutationObserver||a.WebKitMutationObserver,u=(a.HTMLElement||a.Element||a.Node).prototype,N=!ta.call(u,O),oa=N?function(a,b,c){a[b]=c.value;return a}:R,Gb=N?function(a){return 1===a.nodeType}:function(a){return ta.call(u,a)},Z=N&&[],Ub=u.cloneNode,Pa=u.dispatchEvent,M=u.getAttribute,Vb=u.hasAttribute,Wb=u.removeAttribute,cb=u.setAttribute,ua=l.createElement,Ka=ua,Kb=da&&{attributes:!0,characterData:!0,attributeOldValue:!0},qb=da||function(){ma=!1;O.removeEventListener(H,
qb)},ga,ha=0,rb=!1,ma=!0,ab=!0,ka=!0,Da,va,Ea,la,Fa,V;sa in l||(nb||ob?(Fa=function(a,b){ta.call(b,a)||t(a,b)},V=t):V=Fa=function(a,b){a[z]||(a[z]=m(!0),t(a,b))},N?(ma=!1,function(){function a(a){var b=a.currentTarget,c=b[z];a=a.propertyName;var d;c.hasOwnProperty(a)&&(c=c[a],d=new CustomEvent(H,{bubbles:!0}),d.attrName=c.name,d.prevValue=c.value||null,d.newValue=c.value=b[a]||null,null==d.prevValue?d[ja]=d.attrChange=0:d[La]=d.attrChange=1,Pa.call(b,d))}function b(a,b){var c=Vb.call(this,a),d=c&&
M.call(this,a),e=new CustomEvent(H,{bubbles:!0});cb.call(this,a,b);e.attrName=a;e.prevValue=c?d:null;e.newValue=b;c?e[La]=e.attrChange=1:e[ja]=e.attrChange=0;Pa.call(this,e)}function c(a){var b=new CustomEvent(H,{bubbles:!0});b.attrName=a;b.prevValue=M.call(this,a);b.newValue=null;b[Ca]=b.attrChange=2;Wb.call(this,a);Pa.call(this,b)}var d=Oa(u,A),e=d.value;d.value=function(d,g,f){d===H&&this[E]&&this.setAttribute!==b&&(this[z]={className:{name:"class",value:this.className}},this.setAttribute=b,this.removeAttribute=
c,e.call(this,"propertychange",a));e.call(this,d,g,f)};R(u,A,d)}()):da||(O[A](H,qb),O.setAttribute(z,1),O.removeAttribute(z),ma&&(Da=function(a){var b,c,d;if(this===a.target){b=this[z];this[z]=c=Ea(this);for(d in c){if(!(d in b))return va(0,this,d,b[d],c[d],ja);if(c[d]!==b[d])return va(1,this,d,b[d],c[d],La)}for(d in b)if(!(d in c))return va(2,this,d,b[d],c[d],Ca)}},va=function(a,b,c,d,e,f){c={attrChange:a,currentTarget:b,attrName:c,prevValue:d,newValue:e};c[f]=a;h(c)},Ea=function(a){for(var b,c=
{},d=a.attributes,e=0,f=d.length;e<f;e++)b=d[e],a=b.name,"setAttribute"!==a&&(c[a]=b.value);return c})),l[sa]=function U(a,b){function g(){return k?l.createElement(m,q):l.createElement(m)}q=a.toUpperCase();rb||(rb=!0,da?(la=function(a,b){function c(a,b){for(var c=0,d=a.length;c<d;b(a[c++]));}return new da(function(d){for(var e,f,g,h=0,k=d.length;h<k;h++)if(e=d[h],"childList"===e.type)c(e.addedNodes,a),c(e.removedNodes,b);else if(f=e.target,ka&&f[E]&&"style"!==e.attributeName&&(g=M.call(f,e.attributeName),
g!==e.oldValue))f[E](e.attributeName,e.oldValue,g)})}(e(y),e(x)),la.observe(l,{childList:!0,subtree:!0})):(ga=[],l[A]("DOMNodeInserted",n(y)),l[A]("DOMNodeRemoved",n(x))),l[A](bb,C),l[A]("readystatechange",C),u.cloneNode=function(a){var b=Ub.call(this,!!a),c=f(b);-1<c&&V(b,W[c]);a&&d(b.querySelectorAll(D));return b});-2<w.call(G,ia+q)+w.call(G,X+q)&&db(a);if(!Qb.test(q)||-1<w.call(Rb,q))throw Error("The type "+a+" is invalid");var h=b||Ma,k=Na.call(h,aa),m=k?b[aa].toUpperCase():q,q;k&&-1<w.call(G,
X+m)&&db(m);b=G.push((k?ia:X)+q)-1;D=D.concat(D.length?",":"",k?m+'[is="'+a.toLowerCase()+'"]':m);g.prototype=W[b]=Na.call(h,"prototype")?h.prototype:Ga(u);c(l.querySelectorAll(D),y);return g},l.createElement=Ka=function(a,b){var c=jb(b),d=c?ua.call(l,a,ra(c)):ua.call(l,a);a=""+a;var e=w.call(G,(c?ia:X)+(c||a).toUpperCase()),f=-1<e;c&&(d.setAttribute("is",c=c.toLowerCase()),f&&(f=k(a.toUpperCase(),c)));ka=!l.createElement.innerHTMLHelper;f&&V(d,W[e]);return d});na.prototype={constructor:na,define:P?
function(a,b,c){if(c)eb(a,b,c);else{var d=a.toUpperCase();ca[d]={constructor:b,create:[d]};qa.set(b,d);B.define(a,b)}}:eb,get:P?function(a){return B.get(a)||ib(a)}:ib,whenDefined:P?function(a){return kb.race([B.whenDefined(a),Ja(a)])}:Ja};if(B)try{(function(b,c,d){c[aa]="a";b.prototype=Ga(HTMLAnchorElement.prototype);b.prototype.constructor=b;a.customElements.define(d,b,c);if(M.call(l.createElement("a",{is:d}),"is")!==d||P&&M.call(new b,"is")!==d)throw c;})(function U(){return Reflect.construct(HTMLAnchorElement,
[],U)},{},"document-register-element-a")}catch(v){lb()}else lb();try{ua.call(l,"a","a")}catch(v){ra=function(a){return{is:a}}}})(self);(function(a){a.Math.sign||(a.Math.sign=Ta)})(self);(function(a){a.Object.assign||(a.Object.assign=Va)})(self);(function(a){a.Promise||(a.Promise=S,S.default&&(a.Promise=S.default),a.Promise.resolve=tb,a.Promise.reject=ub,a.Promise.all=vb,a.Promise.race=xb)})(self);(function(a){a.HTMLDocument.prototype.contains||(a.HTMLDocument.prototype.contains=Sa)})(self);var T,Db;
function Eb(a){Qa().assert(/^https?\:/i.test(a),'URL must start with "http://" or "https://". Invalid value: %s',a);T||(T=self.document.createElement("a"),Db=self.UrlCache||(self.UrlCache=Object.create(null)));var b=Db[a];if(b)a=b;else{T.href=a;T.protocol||(T.href=T.href);b={href:T.href,protocol:T.protocol,host:T.host,hostname:T.hostname,port:"0"==T.port?"":T.port,pathname:T.pathname,search:T.search,hash:T.hash,origin:null};"/"!==b.pathname[0]&&(b.pathname="/"+b.pathname);if("http:"==b.protocol&&80==
b.port||"https:"==b.protocol&&443==b.port)b.port="",b.host=b.hostname;b.origin=T.origin&&"null"!=T.origin?T.origin:"data:"!=b.protocol&&b.host?b.protocol+"//"+b.host:b.href;a=Db[a]=b}return a.href}
function Fb(a){var b=Object.create(null);if(!a)return b;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c],e=d.indexOf("="),f;-1!=e?(f=decodeURIComponent(d.substring(0,e)).trim(),d=decodeURIComponent(d.substring(e+1)).trim()):(f=decodeURIComponent(d).trim(),d="");f&&(b[f]=d)}return b};function Xb(a,b){var c,d=c||!1;a.addEventListener("message",b,d);return function(){a&&a.removeEventListener("message",b,d);a=b=null}};function Yb(a){return"loading"!=a.readyState&&"uninitialized"!=a.readyState};function Zb(a){this.win=a}
Zb.prototype.start=function(){var a=this.win.document,b=a.createElement("style"),c;a:{var d=Fb(this.win.location.search);c=this.win.document;for(var e=this.win.navigator,d=[d.hl,e.language,e.userLanguage,"en-US"],e=0;e<d.length;e++){var f=d[e];if(f){if(f){for(var f=f.split("-"),k="",h="",n=0;n<f.length;n++)0<n&&(k+=", ",h+="-"),h+=0==n?f[n].toLowerCase():f[n].toUpperCase(),h=h.replace(/[^a-zA-Z\-]/g,""),k+='[lang="'+h+'"]';f=k}else f=null;if(f&&c.querySelector(f)){c=f+" {display: block}";break a}}}c=
""}b.textContent=c;a.head.appendChild(b);a=Fb(this.win.location.search);this.win.opener&&this.win.opener!=this.win?$b(this).then(this.g.bind(this),this.c.bind(this)):a.url?(this.win.location.replace(Eb(a.url)),Promise.resolve()):(a=Error("No opener or return location available"),this.c(a),Promise.reject(a))};
function $b(a){function b(){}var c=a.win.location.hash;return(new Promise(function(d,e){var f=a.win.opener;f?(b=Xb(a.win,function(a){a.data&&"amp"==a.data.sentinel&&"result-ack"==a.data.type&&d()}),f.postMessage({sentinel:"amp",type:"result",result:c},"*"),a.win.setTimeout(function(){e(Error("Timed out"))},5E3)):e(Error("Opener not available"))})).then(function(){b()},function(a){b();throw a;})}
Zb.prototype.g=function(){var a=this;try{this.win.close()}catch(b){}this.win.setTimeout(function(){a.c(Error("Failed to close the dialog"))},3E3)};
Zb.prototype.c=function(a){var b=this;this.win.console&&this.win.console.log&&(this.win.console.error||this.win.console.log).call(this.win.console,"Postback failed: ",a);var c=this.win.document;c.documentElement.classList.toggle("amp-error",!0);c.documentElement.setAttribute("data-error","postback");c.getElementById("closeButton").onclick=function(){try{b.win.close()}catch(d){}b.win.setTimeout(function(){b.win.closed||c.documentElement.setAttribute("data-error","close")},1E3)}};(function(){K=xa;Ra();Qa()})();(function(a,b){var c=Yb,d=c(a);if(d)b(a);else{var e=function(){c(a)&&(d||(d=!0,b(a)),a.removeEventListener("readystatechange",e))};a.addEventListener("readystatechange",e)}})(document,function(){(new Zb(window)).start()});})();
//# sourceMappingURL=amp-login-done-0.1.js.map

