(self.AMP = self.AMP || []).push({n:"amp-iframe", f:(function(AMP) {var h;function k(a,b){function d(){}d.prototype=b.prototype;a.prototype=new d;a.prototype.constructor=a;for(var c in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c]};Date.now();self.log=self.log||{user:null,dev:null};var p=self.log;function u(){if(p.user)return p.user;throw Error("failed to call initLogConstructor");};function w(a){a=a.__AMP_TOP||a;var b=a.services&&a.services.timer&&a.services.timer.obj;return b};function x(a,b){var d=a.length-b.length;return 0<=d&&a.indexOf(b,d)==d};var y=(self.AMP_CONFIG||{}).thirdPartyFrameHost||"ampproject.net";var z,A;
function B(a){var b;z||(z=self.document.createElement("a"),A=self.UrlCache||(self.UrlCache=Object.create(null)));var d=A[a];if(d)return d;z.href=a;z.protocol||(z.href=z.href);var c={href:z.href,protocol:z.protocol,host:z.host,hostname:z.hostname,port:"0"==z.port?"":z.port,pathname:z.pathname,search:z.search,hash:z.hash,origin:null};"/"!==c.pathname[0]&&(c.pathname="/"+c.pathname);if("http:"==c.protocol&&80==c.port||"https:"==c.protocol&&443==c.port)c.port="",c.host=c.hostname;c.origin=z.origin&&"null"!=
z.origin?z.origin:"data:"!=c.protocol&&c.host?c.protocol+"//"+c.host:c.href;var e=c;return b?e:A[a]=e};var C,D="Webkit webkit Moz moz ms O o".split(" ");function E(a,b){var d,c=a.style;C||(C=Object.create(null));var e=C.zIndex;if(!e){e="zIndex";if(void 0===c.zIndex){var f="Z"+"zIndex".slice(1);a:{for(var g=0;g<D.length;g++){var l=D[g]+f;if(void 0!==c[l]){f=l;break a}}f=""}void 0!==c[f]&&(e=f)}C.zIndex=e}(c=e)&&(a.style[c]=d?b+d:b)};var F={"AMP-FX-FLYING-CARPET":!0,"AMP-LIGHTBOX":!0,"AMP-STICKY-AD":!0};function G(a,b){for(var d=[],c=0;c<a.length;c++){var e=a[c];b(e,c,a)||(d.push(e),a.splice(c,1),c--)}};function H(a,b,d){var c=a.listeningFors;!c&&d&&(c=a.listeningFors=Object.create(null));a=c||null;if(!a)return a;var e=a[b];!e&&d&&(e=a[b]=[]);return e||null}function I(a,b,d){var c=B(b.src).origin,e=d?b.getAttribute("data-amp-3p-sentinel"):"amp";a=H(a,e,!0);for(var f,e=0;e<a.length;e++){var g=a[e];if(g.frame===b){f=g;break}}f||(f={frame:b,origin:c,events:Object.create(null)},a.push(f));return f.events}
function J(a){for(var b={sentinel:"unlisten"},d=a.length-1;0<=d;d--){var c=a[d];if(!c.frame.contentWindow){a.splice(d,1);var e=c.events,f;for(f in e)e[f].splice(0,Infinity).forEach(function(a){a(b)})}}}
function K(a){if(!a.listeningFors){var b=function(b){if(b.data){var c=b.data;if("string"===typeof c&&"{"===c.charAt(0))try{c=JSON.parse(c)}catch(X){var d;if(p.dev)d=p.dev;else throw Error("failed to call initLogConstructor");d.warn("IFRAME-HELPER","Postmessage could not be parsed. Is it in a valid JSON format?",X)}if(c.sentinel){var f;d=c.sentinel;var g=b.origin,l=b.source,m=H(a,d);if(m){for(var t=0;t<m.length;t++){var r=m[t],q=r.frame.contentWindow;if(q)if("amp"===d){if(r.origin===g&&q==l){f=r;break}}else{var n;
if(!(n=l==q))b:{for(n=l;n&&n!=n.parent;n=n.parent)if(n==q){n=!0;break b}n=!1}if(n){f=r;break}}else setTimeout(J,0,m)}f=f?f.events:null}else f=m;var N=f;if(N){var v=N[c.type];if(v)for(v=v.slice(),f=0;f<v.length;f++)(0,v[f])(c,b.source,b.origin)}}}};a.addEventListener("message",b)}}
function L(a,b,d,c,e){function f(b,c,f){if(e||c==a.contentWindow)"unlisten"==b.sentinel?m():d(b,c,f)}var g=a.ownerDocument.defaultView;K(g);c=I(g,a,c);var l=c[b]||(c[b]=[]),m;l.push(f);return m=function(){if(f){var a=l.indexOf(f);-1<a&&l.splice(a,1);d=l=f=null}}}function M(a,b,d,c,e){if(a.contentWindow){c.type=d;c.sentinel=e?a.getAttribute("data-amp-3p-sentinel"):"amp";var f=c;e&&(f="amp-"+JSON.stringify(c));for(a=0;a<b.length;a++)d=b[a],d.win.postMessage(f,d.origin)}}
function O(a,b,d,c){var e=this;this.a=a;this.o=d;this.c=[];this.L=L(this.a,b,function(a,b,d){e.c.some(function(a){return a.win==b})||e.c.push({win:b,origin:d});c(a,b,d)},this.o,this.o)}O.prototype.send=function(a,b){G(this.c,function(a){return!!a.win.parent});M(this.a,this.c,a,b,this.o)};O.prototype.destroy=function(){this.L();this.c.length=0};function P(a,b,d,c){return{left:a,top:b,width:d,height:c,bottom:b+c,right:a+d}}function Q(a){for(var b=-Infinity,d=Infinity,c=-Infinity,e=Infinity,f=0;f<arguments.length;f++){var g=arguments[f];if(g&&(b=Math.max(b,g.left),d=Math.min(d,g.left+g.width),c=Math.max(c,g.top),e=Math.min(e,g.top+g.height),d<b||e<c))return null}return Infinity==d?null:P(b,c,d-b,e-c)}function R(a,b,d){return 0==b&&0==d||0==a.width&&0==a.height?a:P(a.left+b,a.top+d,a.width,a.height)};var aa=[0,.05,.1,.15,.2,.25,.3,.35,.4,.45,.5,.55,.6,.65,.7,.75,.8,.85,.9,.95,1],ba=Date.now();function S(a,b,d){var c=this;this.j=a;this.h=null;this.v=this.D=!1;this.i=null;this.G=a.getViewport();this.F=new O(b,"send-intersections",d||!1,function(){ca(c)});this.h=new T(function(a){c.F.send("intersection",{changes:[a]})},{threshold:aa});this.fire=function(){c.D&&c.v&&c.h.tick(c.G.getRect())}}
function ca(a){a.D=!0;a.h.observe(a.j.element);a.j.getVsync().measure(function(){a.v=a.j.isInViewport();a.fire()});var b=a.G.onScroll(a.fire),d=a.G.onChanged(a.fire);a.i=function(){b();d()}}S.prototype.onViewportCallback=function(a){this.v=a};S.prototype.destroy=function(){this.D=!1;this.h=null;this.i&&(this.i(),this.i=null);this.F.destroy();this.F=null};function T(a,b){this.J=a;var d=b&&b.threshold||[0];this.K=d.sort();this.m=null;this.B=0}
T.prototype.observe=function(a){a.isBuilt&&a.isBuilt();this.B=0;this.m=a};
T.prototype.tick=function(a,b){b&&(a=R(a,-b.left,-b.top),b=R(b,-b.left,-b.top));var d,c=null;d=this.m.getLayoutBox();var e=this.m.getOwner(),c=e&&e.getLayoutBox();var e=d,f=a,g=b,l=Q(e,c,f,g)||P(0,0,0,0);a=l.width*l.height/(e.width*e.height);var m;m=this.K;var t=0,r=m.length;if(0==a)m=0;else{for(var q=(t+r)/2|0;t<q;)a<m[q]?r=q:t=q,q=(t+r)/2|0;m=r}if(m==this.B)a=null;else{this.B=m;if(g=f=g?null:f)l=R(l,-f.left,-f.top),e=R(e,-f.left,-f.top),g=R(g,-f.left,-f.top);a={time:"undefined"!==typeof performance&&
performance.now?performance.now():Date.now()-ba,rootBounds:g&&U(g),boundingClientRect:U(e),intersectionRect:U(l),intersectionRatio:a}}var n=a;n&&this.J(n)};function U(a){return{left:a.left,top:a.top,width:a.width,height:a.height,bottom:a.bottom,right:a.right,x:a.left,y:a.top}};var da=0,V=0;function W(a){AMP.BaseElement.apply(this,arguments)}k(W,AMP.BaseElement);h=W.prototype;h.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a};
h.assertSource=function(a,b,d){var c=B(a);u().assert("https:"==c.protocol||"data:"==c.protocol||0==c.origin.indexOf("http://iframe.localhost:"),"Invalid <amp-iframe> src. Must start with https://. Found %s",this.element);var e=B(b);u().assert(!(" "+d+" ").match(/\s+allow-same-origin\s+/i)||c.origin!=e.origin&&"data:"!=c.protocol,"Origin of <amp-iframe> must not be equal to container %sif allow-same-origin is set. See https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md for details.",
this.element);u().assert(!(x(c.hostname,"."+y)||x(c.hostname,".ampproject.org")),"amp-iframe does not allow embedding of frames from ampproject.*: %s",a);return a};
h.assertPosition=function(){var a=this.element.getLayoutBox(),b=Math.min(600,.75*this.getViewport().getSize().height);u().assert(a.top>=b,"<amp-iframe> elements must be positioned outside the first 75% of the viewport or 600px from the top (whichever is smaller): %s  Current position %s. Min: %sPositioning rules don't apply for iframes that use `placeholder`.See https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/amp-iframe.md#iframe-with-placeholder for details.",this.element,
a.top,b)};h.transformSrcDoc=function(a,b){if(a){u().assert(!(" "+b+" ").match(/\s+allow-same-origin\s+/i),"allow-same-origin is not allowed with the srcdoc attribute %s.",this.element);b=a;if("undefined"!==typeof TextEncoder)b=(new TextEncoder("utf-8")).encode(b);else{b=unescape(encodeURIComponent(b));for(var d=new Uint8Array(b.length),c=0;c<b.length;c++){var e=b.charCodeAt(c);d[c]=e}b=d}return"data:text/html;charset=utf-8;base64,"+btoa(String.fromCharCode.apply(String,b))}};
h.firstAttachedCallback=function(){this.C=this.element.getAttribute("sandbox");var a=this.element.getAttribute("src")||this.transformSrcDoc(this.element.getAttribute("srcdoc"),this.C);this.iframeSrc=this.assertSource(a,window.location.href,this.C);var b;b=this.element;if("no"!=b.getAttribute("scrolling")){var d=b.ownerDocument.createElement("i-amp-scroll-container");b.appendChild(d);b=d}this.l=b};h.preconnectCallback=function(a){this.iframeSrc&&this.preconnect.url(this.iframeSrc,a)};
h.buildCallback=function(){this.A=this.getPlaceholder();this.u=!!this.A;this.I=this.f=this.s=!1;this.a=this.g=this.M=null;(this.w=this.element.hasAttribute("resizable"))&&this.element.setAttribute("scrolling","no");this.b=null;this.element.hasAttribute("frameborder")||this.element.setAttribute("frameborder","0")};
h.onLayoutMeasure=function(){Y(this);var a;a:{var b=this.getIntersectionElementLayoutBox();a=b.height;for(var b=b.width,d=0;d<Z.length;d++){var c=Z[d][0],e=Z[d][1];if(!(e>a||c>b)&&20>=a-e&&20>=b-c){a=!0;break a}}a=!1}this.s=a;a=this.element.getLayoutBox();this.f=10<a.width&&10<a.height?!1:!0;if(a=this.s){a=this.win;b=!1;d=0;c=this.element;do F[c.tagName]?(d++,b=!1):"fixed"==a.getComputedStyle(c).position&&(b=!0),c=c.parentElement;while(c&&"BODY"!=c.tagName);a=!(!b&&1>=d)}this.I=a;this.b&&this.b.fire()};
function Y(a){if(a.a){var b=a.getViewport().getLayoutRect(a.a),d=a.getLayoutBox();a.g=R(b,-d.left,-d.top)}}h.getIntersectionElementLayoutBox=function(){if(!this.a)return AMP.BaseElement.prototype.getIntersectionElementLayoutBox.call(this);var a=this.getLayoutBox();this.g||Y(this);return R(a,this.g.left,this.g.top)};
h.layoutCallback=function(){var a=this;u().assert(!this.I,"amp-iframe is not used for displaying fixed ad. Please use amp-sticky-ad and amp-ad instead.");this.u||this.assertPosition();this.w&&u().assert(this.getOverflowElement(),"Overflow element must be defined for resizable frames: %s",this.element);if(!this.iframeSrc)return Promise.resolve();if(this.f&&(V++,1<V))return console.error("Only 1 analytics/tracking iframe allowed per page. Please use amp-analytics instead or file a GitHub issue for your use case: https://github.com/ampproject/amphtml/issues/new"),
Promise.resolve();var b=this.element.ownerDocument.createElement("iframe");this.a=b;this.applyFillContent(b);b.name="amp_iframe"+da++;this.u&&E(b,-1);this.propagateAttributes(["frameborder","allowfullscreen","allowtransparency","scrolling","referrerpolicy"],b);ea(b,this.C);b.src=this.iframeSrc;this.f||(this.b=new S(this,b));b.onload=function(){b.readyState="complete";a.H();a.f&&(a.iframeSrc=null,w(a.win).promise(5E3).then(function(){b.parentElement&&b.parentElement.removeChild(b);a.element.setAttribute("amp-removed",
"");a.a=null}))};L(b,"embed-size",function(b){fa(a,b.height,b.width)});this.u&&L(b,"embed-ready",this.H.bind(this));this.l.appendChild(b);return this.loadPromise(b).then(function(){a.l!=a.element&&w(a.win).delay(function(){a.deferMutate(function(){a.l.classList.add("amp-active")})},1E3)})};h.unlayoutOnPause=function(){return!0};
h.unlayoutCallback=function(){if(this.a){var a=this.a;a.parentElement&&a.parentElement.removeChild(a);this.A&&this.togglePlaceholder(!0);this.a=null;this.b&&(this.b.destroy(),this.b=null)}return!0};h.viewportCallback=function(a){if(this.b)this.b.onViewportCallback(a)};h.getPriority=function(){return this.s?2:this.f?1:AMP.BaseElement.prototype.getPriority.call(this)};h.H=function(){var a=this;this.A&&this.getVsync().mutate(function(){a.a&&(E(a.a,0),a.togglePlaceholder(!1))})};
h.firstLayoutCompleted=function(){};
function fa(a,b,d){if(a.w)if(100>b)u().error("amp-iframe","Ignoring embed-size request because the resize height is less than 100px. If you are using amp-iframe to display ads, consider using amp-ad instead.",a.element);else{var c,e;b=parseInt(b,10);isNaN(b)||(c=Math.max(b+(a.element.offsetHeight-a.a.offsetHeight),b));d=parseInt(d,10);isNaN(d)||(e=Math.max(d+(a.element.offsetWidth-a.a.offsetWidth),d));void 0!==c||void 0!==e?a.attemptChangeSize(c,e).then(function(){void 0!==c&&a.element.setAttribute("height",
c);void 0!==e&&a.element.setAttribute("width",e)},function(){}):u().error("amp-iframe","Ignoring embed-size request becauseno width or height value is provided",a.element)}else u().error("amp-iframe","Ignoring embed-size request because this iframe is not resizable",a.element)}function ea(a,b){var d=b||"";a.setAttribute("sandbox",d)}var Z=[[300,250],[320,50],[300,50],[320,100]];AMP.registerElement("amp-iframe",W);
})});
//# sourceMappingURL=amp-iframe-0.1.js.map

