(self.AMP = self.AMP || []).push({n:"amp-install-serviceworker", f:(function(AMP) {function g(a,b){function d(){}d.prototype=b.prototype;a.prototype=new d;a.prototype.constructor=a;for(var c in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c]}var k="";
function l(a){var b=Object.create(null);if(!a)return b;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);for(var d=a.split("&"),c=0;c<d.length;c++){var e=d[c],f=e.indexOf("="),h,r;-1!=f?(h=decodeURIComponent(e.substring(0,f)).trim(),r=decodeURIComponent(e.substring(f+1)).trim()):(h=decodeURIComponent(e).trim(),r="");h&&(b[h]=r)}return b};Date.now();self.log=self.log||{user:null,dev:null};var m=self.log;function n(){if(m.user)return m.user;throw Error("failed to call initLogConstructor");};function p(a,b){for(var d,c=a;c&&c!==d;c=c.parentElement)if(b(c))return c;return null}function q(a){var b="A";if(a.closest)return a.closest(b);b=b.toUpperCase();return p(a,function(a){return a.tagName==b})};function t(a){a=a.__AMP_TOP||a;var b=a.services&&a.services.timer&&a.services.timer.obj;return b}function u(a,b){var d=a;if(d.nodeType){var c=(d.ownerDocument||d).defaultView,e=c=c.__AMP_TOP||c,f=c.services;f||(f=c.services={});c=f;(f=c.ampdoc)||(f=c.ampdoc={obj:null,promise:null,resolve:null});f.obj||(f.obj=(void 0)(e),f.resolve&&f.resolve(f.obj));d=f.obj.getAmpDoc(d)}var h=d.isSingleDoc()?d.win:d;return h&&h.services&&h.services[b]&&h.services[b].obj};var v=/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org/;var w,x,y=/[?&]amp_js[^&]*/;
function z(a){var b;w||(w=self.document.createElement("a"),x=self.UrlCache||(self.UrlCache=Object.create(null)));var d=x[a];if(d)return d;w.href=a;w.protocol||(w.href=w.href);var c={href:w.href,protocol:w.protocol,host:w.host,hostname:w.hostname,port:"0"==w.port?"":w.port,pathname:w.pathname,search:w.search,hash:w.hash,origin:null};"/"!==c.pathname[0]&&(c.pathname="/"+c.pathname);if("http:"==c.protocol&&80==c.port||"https:"==c.protocol&&443==c.port)c.port="",c.host=c.hostname;c.origin=w.origin&&"null"!=
w.origin?w.origin:"data:"!=c.protocol&&c.host?c.protocol+"//"+c.host:c.href;var e=c;return b?e:x[a]=e}function A(a){"string"==typeof a&&(a=z(a));var b;(b="https:"==a.protocol||"localhost"==a.hostname)||(a=a.hostname,b=a.length-10,b=0<=b&&a.indexOf(".localhost",b)==b);return b}
function B(a,b){var d;d=void 0===d?"source":d;n().assert(null!=a,"%s %s must be available",b,d);var c=a;n().assert(A(c)||/^(\/\/)/.test(c),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',b,d,c)}function C(a){var b=a.indexOf("#");return-1==b?a:a.substring(0,b)}function D(a){"string"==typeof a&&(a=z(a));return v.test(a.origin)}
function E(a){"string"==typeof a&&(a=z(a));if(!D(a))return a.href;var b=a.pathname.split("/"),d=b[1];n().assert("c"==d||"v"==d,"Unknown path prefix in url %s",a.href);var c=b[2],e="s"==c?"https://"+decodeURIComponent(b[3]):"http://"+decodeURIComponent(c);n().assert(0<e.indexOf("."),"Expected a . in origin %s",e);b.splice(1,"s"==c?3:2);b=e+b.join("/");d=(d=a.search)&&"?"!=d?(d=d.replace(y,"").replace(/^[?&]/,""))?"?"+d:"":"";return b+d+(a.hash||"")};var F,G="Webkit webkit Moz moz ms O o".split(" ");function H(a){var b=void 0;F||(F=Object.create(null));var d=F.display;if(!d||b){d="display";if(void 0===a.display){var c="D"+"display".slice(1);a:{for(var e=0;e<G.length;e++){var f=G[e]+c;if(void 0!==a[f]){c=f;break a}}c=""}var h=c;void 0!==a[h]&&(d=h)}b||(F.display=d)}return d}function I(a,b){var d,c=H(a.style);c&&(a.style[c]=d?b+d:b)}function J(a){var b=!1;if(void 0===b){var d;d=(d=H(a.style))?a.style[d]:void 0;b="none"==d}I(a,b?"":"none")};function K(a){AMP.BaseElement.call(this,a);this.i=this.a=null}g(K,AMP.BaseElement);
K.prototype.buildCallback=function(){var a=this,b=this.win;if("serviceWorker"in b.navigator){var d=this.element.getAttribute("src");B(d,this.element);if(D(d)||D(b.location.href)){var c=this.element.getAttribute("data-iframe-src");if(c){B(c,this.element);var b=z(c).origin,e=u(this.element,"documentInfo").get(),f=z(e.sourceUrl),h=z(e.canonicalUrl);n().assert(b==f.origin||b==h.origin,"data-iframe-src (%s) should be a URL on the same origin as the source (%s) or canonical URL (%s) of the AMP-document.",b,
f.origin,h.origin);this.a=c;L(this)}}else z(b.location.href).origin==z(d).origin?this.loadPromise(this.win).then(function(){return M(a.win,d)}):n().error("amp-install-serviceworker","Did not install ServiceWorker because it does not match the current origin: "+d)}else N(this)};function L(a){u(a.getAmpDoc(),"viewer").whenFirstVisible().then(function(){t(a.win).delay(function(){a.deferMutate(a.f.bind(a))},2E4)})}
K.prototype.f=function(){if(u(this.getAmpDoc(),"viewer").isVisible()){I(this.element,"none");var a=this.win.document.createElement("iframe");a.setAttribute("sandbox","allow-same-origin allow-scripts");a.src=this.a;this.element.appendChild(a)}};
function N(a){if(a.getAmpDoc().isSingleDoc()){var b=a.getAmpDoc(),d=z(a.win.location.href),c=a.element.getAttribute("data-no-service-worker-fallback-url-match"),e=a.element.getAttribute("data-no-service-worker-fallback-shell-url");if(c||e){n().assert(c&&e,'Both, "%s" and "%s" must be specified for url-rewrite',"data-no-service-worker-fallback-url-match","data-no-service-worker-fallback-shell-url");var e=C(e),f;try{f=new RegExp(c)}catch(h){throw n().createError('Invalid "data-no-service-worker-fallback-url-match" expression',
h);}n().assert(z(E(d)).origin==z(e).origin,'Shell source origin "%s" must be the same as source origin "%s"',e,d.href);a.i=new O(b,f,e);A(e)&&P(a,e)}}}function P(a,b){var d=a.loadPromise(a.win),c=u(a.getAmpDoc(),"viewer").whenFirstVisible();Promise.all([d,c]).then(function(){a.deferMutate(function(){return Q(a,b)})})}
function Q(a,b){var d=a.win.document.createElement("iframe");d.id="i-amp-shell-preload";d.setAttribute("src",b+"#preload");J(d);d.setAttribute("sandbox","allow-scripts allow-same-origin");var c=a.loadPromise(d);c.then(function(){d.parentElement&&d.parentElement.removeChild(d)});a.element.appendChild(d)}function O(a,b,d){this.win=a.win;this.h=b;this.g=d;this.b=z(d);a=a.getRootNode();b=this.c.bind(this);a.addEventListener("click",b,!1)}
O.prototype.c=function(a){if(!a.defaultPrevented&&(a=q(a.target))&&a.href){var b=z(a.href);if(b.origin==this.b.origin&&b.pathname!=this.b.pathname&&this.h.test(b.href)&&!a.getAttribute("i-amp-orig-href")){var d=this.win;C(b.href)!=C(d.location.href)&&(a.setAttribute("i-amp-orig-href",a.href),a.href=this.g+"#href="+encodeURIComponent(""+b.pathname+b.search+b.hash))}}};
function M(a,b){return a.navigator.serviceWorker.register(b).then(function(a){var c=self;if(c.AMP_MODE)c=c.AMP_MODE;else{var b;if(c.context&&c.context.mode)b=c.context.mode;else{b=l(c.location.originalHash||c.location.hash);var d=l(c.location.search);k||(k=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011481126804163");b={localDev:!1,development:!("1"!=b.development&&!c.AMP_DEV_MODE),filter:b.filter,minified:!0,lite:void 0!=d.amp_lite,test:!1,log:b.log,version:"1481126804163",
rtvVersion:k}}c=c.AMP_MODE=b}c.development&&n().info("amp-install-serviceworker","ServiceWorker registration successful with scope: ",a.scope);return a},function(a){n().error("amp-install-serviceworker","ServiceWorker registration failed:",a)})}AMP.registerElement("amp-install-serviceworker",K);
})});
//# sourceMappingURL=amp-install-serviceworker-0.1.js.map

