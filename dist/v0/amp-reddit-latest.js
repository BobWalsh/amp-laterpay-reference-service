(self.AMP = self.AMP || []).push({n:"amp-reddit", f:(function(AMP) {function h(a,d){function c(){}c.prototype=d.prototype;a.prototype=new c;a.prototype.constructor=a;for(var b in d)if(Object.defineProperties){var f=Object.getOwnPropertyDescriptor(d,b);f&&Object.defineProperty(a,b,f)}else a[b]=d[b]}var m="";
function p(){var a=void 0,d=a||self,c;if(d.AMP_MODE)c=d.AMP_MODE;else{c=d;if(c.context&&c.context.mode)c=c.context.mode;else{var b=t(c.location.originalHash||c.location.hash),f=t(c.location.search);m||(m=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011481124767089");c={localDev:!1,development:!("1"!=b.development&&!c.AMP_DEV_MODE),filter:b.filter,minified:!0,lite:void 0!=f.amp_lite,test:!1,log:b.log,version:"1481124767089",rtvVersion:m}}c=d.AMP_MODE=c}return c}
function t(a){var d=Object.create(null);if(!a)return d;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);for(var c=a.split("&"),b=0;b<c.length;b++){var f=c[b],e=f.indexOf("="),g,l;-1!=e?(g=decodeURIComponent(f.substring(0,e)).trim(),l=decodeURIComponent(f.substring(e+1)).trim()):(g=decodeURIComponent(f).trim(),l="");g&&(d[g]=l)}return d};Date.now();self.log=self.log||{user:null,dev:null};var u=self.log;function v(){if(u.user)return u.user;throw Error("failed to call initLogConstructor");};function A(a,d){var c=a;if(c.nodeType){var b=(c.ownerDocument||c).defaultView,f=b=b.__AMP_TOP||b,e=b.services;e||(e=b.services={});b=e;(e=b.ampdoc)||(e=b.ampdoc={obj:null,promise:null,resolve:null});e.obj||(e.obj=(void 0)(f),e.resolve&&e.resolve(e.obj));c=e.obj.getAmpDoc(c)}var g=c.isSingleDoc()?c.win:c;return g&&g.services&&g.services[d]&&g.services[d].obj};function B(a){return a.replace(/-([a-z])/g,function(a,c){return c.toUpperCase()})};var C=self.AMP_CONFIG||{},E=C.thirdPartyUrl||"https://3p.ampproject.net",F=C.thirdPartyFrameHost||"ampproject.net";var G,H;
function I(a){var d;G||(G=self.document.createElement("a"),H=self.UrlCache||(self.UrlCache=Object.create(null)));var c=H[a];if(c)return c;G.href=a;G.protocol||(G.href=G.href);var b={href:G.href,protocol:G.protocol,host:G.host,hostname:G.hostname,port:"0"==G.port?"":G.port,pathname:G.pathname,search:G.search,hash:G.hash,origin:null};"/"!==b.pathname[0]&&(b.pathname="/"+b.pathname);if("http:"==b.protocol&&80==b.port||"https:"==b.protocol&&443==b.port)b.port="",b.host=b.hostname;b.origin=G.origin&&"null"!=
G.origin?G.origin:"data:"!=b.protocol&&b.host?b.protocol+"//"+b.host:b.href;var f=b;return d?f:H[a]=f}function J(a){"string"==typeof a&&(a=I(a));var d;(d="https:"==a.protocol||"localhost"==a.hostname)||(a=a.hostname,d=a.length-10,d=0<=d&&a.indexOf(".localhost",d)==d);return d};function M(a){for(var d=a.nodeName,c=0,b=0,f=a.previousElementSibling;f&&25>b&&100>c;)f.nodeName==d&&b++,c++,f=f.previousElementSibling;return 25>b&&100>c?"."+b:""};var O,P="Webkit webkit Moz moz ms O o".split(" ");function Q(a){var d,c=a.style;O||(O=Object.create(null));var b=O.border;if(!b){b="border";if(void 0===c.border){var f="B"+"border".slice(1);a:{for(var e=0;e<P.length;e++){var g=P[e]+f;if(void 0!==c[g]){f=g;break a}}f=""}void 0!==c[f]&&(b=f)}O.border=b}(c=b)&&(a.style[c]=d?"none"+d:"none")};function R(a){a=parseFloat(a);return"number"===typeof a&&isFinite(a)?a:void 0};var S={};
function T(a,d){var c=Date.now(),b=d.getAttribute("width"),f=d.getAttribute("height");v().assert("reddit","Attribute type required for <amp-ad>: %s",d);for(var e={},g=0;g<d.attributes.length;g++){var l=d.attributes[g];0==l.name.indexOf("data-")&&(e[B(l.name.substr(5))]=l.value)}if(g=d.getAttribute("json")){var n;a:{try{n=JSON.parse(g);break a}catch(ba){}n=void 0}if(void 0===n)throw v().createError("Error parsing JSON in json attribute in element %s",d);for(var w in n)e[w]=n[w]}e.width=R(b);e.height=
R(f);e.type="reddit";var K=A(d,"documentInfo").get(),L=A(d,"viewer"),D=a.location.href;"about:srcdoc"==D&&(D=a.parent.location.href);b=L.getUnconfirmedReferrerUrl();f=K.canonicalUrl;w=K.pageViewId;n={href:D};for(var g=d.tagName,l={localDev:!1,development:p().development,filter:p().filter,minified:!0,lite:p().lite,test:!1,log:p().log,version:p().version,rtvVersion:p().rtvVersion},X=!(!a.AMP_CONFIG||!a.AMP_CONFIG.canary),Y=!L.isVisible(),x=a,y=0,k=x;k&&k!=k.parent;k=k.parent)y++;for(var x=String(y)+
"-"+U(x),y=d.getIntersectionChangeEntry(),k=d,z=[],q=0;k&&1==k.nodeType&&25>q;){var r="";k.id&&(r="/"+k.id);var Z=k.nodeName.toLowerCase();z.push(""+Z+r+M(k));q++;k=k.parentElement}k=z.join();z=k.length;q=5381;for(r=0;r<z;r++)q=33*q^k.charCodeAt(r);e._context={referrer:b,canonicalUrl:f,pageViewId:w,location:n,tagName:g,mode:l,canary:X,hidden:Y,amp3pSentinel:x,initialIntersection:y,domFingerprint:String(q>>>0),startTime:c};Object.assign(e._context,void 0);var N=d.getAttribute("src");N&&(e.src=N);return e}
function aa(a,d){var c=T(a,d),b=a.document.createElement("iframe");S[c.type]||(S[c.type]=0);a=V(a);var f=I(a).hostname;a=a+"#"+JSON.stringify(c);var e=f+"_"+c.type+"_"+S[c.type]++;b.src=a;b.name=e;b.ampLocation=I(a);b.width=c.width;b.height=c.height;b.setAttribute("scrolling","no");Q(b);b.onload=function(){this.readyState="complete"};b.setAttribute("data-amp-3p-sentinel",c._context.amp3pSentinel);return b}
function V(a){var d,c=a.bootstrapBaseUrl;if(c)a=c;else{var b;b=d;var f=a.document.querySelector('meta[name="amp-3p-iframe-src"]');if(f){var e=f.getAttribute("content"),g;g=void 0===g?"source":g;v().assert(null!=e,"%s %s must be available",f,g);v().assert(J(e)||/^(\/\/)/.test(e),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',f,g,e);v().assert(-1==e.indexOf("?"),"3p iframe url must not include query string %s in element %s.",
e,f);g=I(e);v().assert("localhost"==g.hostname&&!b||g.origin!=I(a.location.href).origin,"3p iframe url must not be on the same origin as the current document %s (%s) in element %s. See https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md for details.",e,g.origin,f);b=e+"?1481124767089"}else b=null;a=a.bootstrapBaseUrl=b||"https://d-"+U(a)+("."+F+"/1481124767089/frame.html")}return a}
function U(a){var d;if(a.crypto&&a.crypto.getRandomValues){var c=new Uint32Array(2);a.crypto.getRandomValues(c);d=String(c[0])+c[1]}else d=String(a.Math.random()).substr(2)+"0";return d};function W(a){AMP.BaseElement.apply(this,arguments)}h(W,AMP.BaseElement);
W.prototype.preconnectCallback=function(a){"comment"===this.element.getAttribute("data-embedtype")?(this.preconnect.url("https://www.redditmedia.com",a),this.preconnect.url("https://www.redditstatic.com",a),this.preconnect.preload("https://www.redditstatic.com/comment-embed.js","script")):(this.preconnect.url("https://www.reddit.com",a),this.preconnect.url("https://cdn.embedly.com",a),this.preconnect.preload("https://embed.redditmedia.com/widgets/platform.js","script"));var d=this.preconnect,c=V(this.win);
d.preload(c,"document");d.preload(E+"/1481124767089/f.js","script")};W.prototype.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a};
W.prototype.layoutCallback=function(){v().assert(this.element.getAttribute("data-src"),"The data-src attribute is required for <amp-reddit> %s",this.element);v().assert(this.element.getAttribute("data-embedtype"),"The data-embedtype attribute is required for <amp-reddit> %s",this.element);var a=aa(this.win,this.element);this.applyFillContent(a);this.element.appendChild(a);return this.loadPromise(a)};AMP.registerElement("amp-reddit",W);
})});
//# sourceMappingURL=amp-reddit-0.1.js.map

