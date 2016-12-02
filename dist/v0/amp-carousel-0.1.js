(self.AMP = self.AMP || []).push({n:"amp-carousel", f:(function(AMP) {var f;function k(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};Date.now();self.log=self.log||{user:null,dev:null};var m=self.log;function n(){if(m.dev)return m.dev;throw Error("failed to call initLogConstructor");};function aa(a,b,c){if(b(a))c();else{var d=a.ownerDocument.defaultView;if(d.MutationObserver){var e=new d.MutationObserver(function(){b(a)&&(e.disconnect(),c())});e.observe(a,{childList:!0})}else var g=d.setInterval(function(){b(a)&&(d.clearInterval(g),c())},5)}}function ba(a,b){aa(a.documentElement,function(){return!!a.body},b)}function ca(a){return new Promise(function(b){ba(a,b)})};function p(a,b){a=a.__AMP_TOP||a;var c=a.services&&a.services[b]&&a.services[b].obj;return c}function q(a){var b=r(a);if(b)return b;a=t(a);var c,d=new Promise(function(a){c=a});a["amp-analytics-instrumentation"]={obj:null,promise:d,resolve:c};return d}function r(a){if(a=t(a)["amp-analytics-instrumentation"]){var b=a.promise;if(b)return b;if(a.obj)return a.promise=Promise.resolve(a.obj)}return null}function t(a){var b=a.services;b||(b=a.services={});return b};function da(a){var b=r(a);return b?b:Promise.resolve().then(function(){return a.ampExtendedElements&&a.ampExtendedElements["amp-analytics"]?q(a):ca(a.document).then(function(){return a.ampExtendedElements&&a.ampExtendedElements["amp-analytics"]?q(a):null})})};function u(a){return p(a,"timer")};var v,w="Webkit webkit Moz moz ms O o".split(" ");function x(a,b){var c=void 0;v||(v=Object.create(null));var d=v[b];if(!d||c){d=b;if(void 0===a[b]){var e=b.charAt(0).toUpperCase()+b.slice(1);a:{for(var g=0;g<w.length;g++){var h=w[g]+e;if(void 0!==a[h]){e=h;break a}}e=""}var l=e;void 0!==a[l]&&(d=l)}c||(v[b]=d)}return d}function y(a,b,c){var d;(b=x(a.style,b))&&(a.style[b]=d?c+d:c)}function ea(a){var b=x(a.style,"scrollSnapType");if(b)return a.style[b]}
function fa(a){var b={"white-space":"nowrap","overflow-x":"auto","overflow-y":"hidden","-webkit-overflow-scrolling":"touch"},c;for(c in b)y(a,c,b[c])};function z(a,b,c){da(a).then(function(a){a&&a.triggerEvent(b,c)})};function A(a,b,c,d){var e=new B(0,0,a,b,c,d,1,1);return e.solveYValueFromXValue.bind(e)}function B(a,b,c,d,e,g,h,l){this.x0=a;this.y0=b;this.x1=c;this.y1=d;this.x2=e;this.y2=g;this.x3=h;this.y3=l}f=B.prototype;f.solveYValueFromXValue=function(a){return this.getPointY(this.solvePositionFromXValue(a))};
f.solvePositionFromXValue=function(a){var b=1E-6,c=(a-this.x0)/(this.x3-this.x0);if(0>=c)return 0;if(1<=c)return 1;for(var d=0,e=1,g=0,h=0;8>h;h++){var g=this.getPointX(c),l=(this.getPointX(c+b)-g)/b;if(Math.abs(g-a)<b)return c;if(Math.abs(l)<b)break;else g<a?d=c:e=c,c-=(g-a)/l}for(h=0;Math.abs(g-a)>b&&8>h;h++)g<a?(d=c,c=(c+e)/2):(e=c,c=(c+d)/2),g=this.getPointX(c);return c};
f.getPointX=function(a){if(0==a)return this.x0;if(1==a)return this.x3;var b=this.lerp(this.x0,this.x1,a),c=this.lerp(this.x1,this.x2,a),d=this.lerp(this.x2,this.x3,a),b=this.lerp(b,c,a),c=this.lerp(c,d,a);return this.lerp(b,c,a)};f.getPointY=function(a){if(0==a)return this.y0;if(1==a)return this.y3;var b=this.lerp(this.y0,this.y1,a),c=this.lerp(this.y1,this.y2,a),d=this.lerp(this.y2,this.y3,a),b=this.lerp(b,c,a),c=this.lerp(c,d,a);return this.lerp(b,c,a)};f.lerp=function(a,b,c){return a+c*(b-a)};
var ga=A(.25,.1,.25,1),ha=A(.42,0,1,1),ia=A(0,0,.58,1),ja=A(.42,0,.58,1),ka={linear:function(a){return a},ease:ga,"ease-in":ha,"ease-out":ia,"ease-in-out":ja};function C(a){if(!a)return null;if("string"==typeof a){if(-1!=a.indexOf("cubic-bezier")){var b=a.match(/cubic-bezier\((.+)\)/);if(b){var c=b[1].split(",").map(parseFloat);if(4==c.length){for(var d=0;4>d;d++)if(isNaN(c[d]))return null;return A(c[0],c[1],c[2],c[3])}}return null}return ka[a]}return a};function la(){}function D(a,b){this.w=a;(a=b)||(a=p(self,"vsync"));this.m=a;this.T=null;this.c=[]}function E(a,b,c,d){return(new D(a)).setCurve(d).add(0,b,1).start(c)}D.prototype.setCurve=function(a){a&&(this.T=C(a));return this};D.prototype.add=function(a,b,c,d){this.c.push({delay:a,func:b,duration:c,curve:C(d)});return this};
D.prototype.start=function(a){var b=new F(this.m,this.w,this.c,this.T,a);a=b;a.X=Date.now();a.I=!0;a.m.canAnimate(a.w)?a.Z(a.Y):(n().warn("Animation","cannot animate"),G(a,!1,0));return b};
function F(a,b,c,d,e){var g=this;this.m=a;this.w=b;this.c=[];for(b=0;b<c.length;b++){var h=c[b];this.c.push({delay:h.delay,func:h.func,duration:h.duration,curve:h.curve||d,started:!1,completed:!1})}this.$=e;this.ga=this.fa=this.X=0;this.I=!1;this.Y={};this.W=new Promise(function(a,b){g.ba=a;g.aa=b});this.Z=this.m.createAnimTask(this.w,{mutate:this.ca.bind(this)})}F.prototype.then=function(a,b){return a||b?this.W.then(a,b):this.W};F.prototype.thenAlways=function(a){a=a||la;return this.then(a,a)};
F.prototype.halt=function(a){G(this,!1,a||0)};function G(a,b,c){if(a.I){a.I=!1;if(0!=c){1<a.c.length&&a.c.sort(function(a,b){return a.delay+a.duration-(b.delay+b.duration)});try{if(0<c)for(var d=0;d<a.c.length;d++)a.c[d].func(1,!0);else for(d=a.c.length-1;0<=d;d--)a.c[d].func(0,!1)}catch(e){n().error("Animation","completion failed: "+e,e),b=!1}}b?a.ba():a.aa()}}
F.prototype.ca=function(){if(this.I){for(var a=Date.now(),b=Math.min((a-this.X)/this.$,1),c=0;c<this.c.length;c++){var d=this.c[c];!d.started&&b>=d.delay&&(d.started=!0)}for(c=0;c<this.c.length;c++)if(d=this.c[c],d.started&&!d.completed)a:{var e,g;if(0<d.duration){if(g=e=Math.min((b-d.delay)/d.duration,1),d.curve&&1!=g)try{g=d.curve(e)}catch(h){n().error("Animation","step curve failed: "+h,h);G(this,!1,0);break a}}else g=e=1;1==e&&(d.completed=!0);try{d.func(g,d.completed)}catch(h){n().error("Animation",
"step mutate failed: "+h,h),G(this,!1,0)}}1==b?G(this,!0,0):this.m.canAnimate(this.w)?this.Z(this.Y):(n().warn("Animation","cancel animation"),G(this,!1,0))}};function H(a,b){return function(c){return a+(b-a)*c}};function I(a){AMP.BaseElement.call(this,a);this.j=this.l=null;this.R=!1}k(I,AMP.BaseElement);f=I.prototype;f.buildCallback=function(){(this.R=this.element.hasAttribute("controls"))&&this.element.classList.add("-amp-carousel-has-controls");this.buildCarousel();this.buildButtons();this.setupGestures();this.setControlsState()};f.viewportCallback=function(a){this.onViewportCallback(a);a&&this.hintControls()};f.onViewportCallback=function(){};
f.buildButtons=function(){var a=this;this.l=this.element.ownerDocument.createElement("div");this.l.classList.add("amp-carousel-button");this.l.classList.add("amp-carousel-button-prev");this.l.setAttribute("role","button");this.l.setAttribute("aria-label","previous");this.l.onclick=function(){a.interactionPrev()};this.element.appendChild(this.l);this.j=this.element.ownerDocument.createElement("div");this.j.classList.add("amp-carousel-button");this.j.classList.add("amp-carousel-button-next");this.j.setAttribute("role",
"button");this.j.setAttribute("aria-label","next");this.j.onclick=function(){a.interactionNext()};this.element.appendChild(this.j)};f.prerenderAllowed=function(){return!0};f.isRelayoutNeeded=function(){return!0};f.buildCarousel=function(){};f.setupGestures=function(){};f.go=function(a,b,c){c=void 0===c?!1:c;this.goCallback(a,b,c)};f.goCallback=function(){};
f.setControlsState=function(){this.l.classList.toggle("amp-disabled",!this.hasPrev());this.l.setAttribute("aria-disabled",!this.hasPrev());this.j.classList.toggle("amp-disabled",!this.hasNext());this.j.setAttribute("aria-disabled",!this.hasNext())};
f.hintControls=function(){var a=this;!this.R&&this.isInViewport()&&this.getVsync().mutate(function(){a.element.classList.add("-amp-carousel-button-start-hint");u(a.win).delay(function(){a.deferMutate(function(){return a.element.classList.remove("-amp-carousel-button-start-hint")})},4E3)})};f.unlayoutCallback=function(){return!0};f.hasPrev=function(){};f.hasNext=function(){};f.interactionNext=function(){this.j.classList.contains("amp-disabled")||this.go(1,!0,!1)};
f.interactionPrev=function(){this.l.classList.contains("amp-disabled")||this.go(-1,!0,!1)};function J(a){I.call(this,a);this.F=null;this.U=this.G=!1;this.S=5E3;this.P=this.shouldLoop=!1}k(J,I);f=J.prototype;f.buildCarousel=function(){this.G=this.element.hasAttribute("loop");this.U=this.element.hasAttribute("autoplay");this.buildSlides();this.shouldLoop=this.G&&this.isLoopingEligible();if(this.P=this.U&&this.isLoopingEligible()){var a=Number(this.element.getAttribute("delay"));0<a&&(this.S=Math.max(1E3,a));this.G||(this.element.setAttribute("loop",""),this.shouldLoop=this.G=!0)}};
f.buildSlides=function(){};f.onViewportCallback=function(a){this.updateViewportState(a);a?K(this):this.clearAutoplay()};f.goCallback=function(a,b,c){this.moveSlide(a,b);c?K(this):this.clearAutoplay()};f.moveSlide=function(){};f.updateViewportState=function(){};f.isLoopingEligible=function(){return!1};function K(a){a.P&&(a.clearAutoplay(),a.F=u(a.win).delay(a.go.bind(a,1,!0,!0),a.S))}f.clearAutoplay=function(){null!==this.F&&(u(this.win).cancel(this.F),this.F=null)};function L(a){J.call(this,a);this.m=null;this.s=!1;this.f=[];this.h=0;this.a=null;this.u=[];this.C=!1;this.D=this.B=null;this.L=!1;this.A=0;this.b=null;this.H=this.o=0;this.K=[];var b=p(this.win,"platform");this.V=b.isAndroid()&&b.isFirefox()}k(L,J);f=L.prototype;f.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a};
f.buildSlides=function(){var a=this;this.m=this.getVsync();this.s=void 0!=ea(this.element);this.element.classList.add("-amp-slidescroll");this.f=this.getRealChildren();this.h=this.f.length;this.a=this.win.document.createElement("div");this.a.classList.add("-amp-slides-container");this.a.setAttribute("aria-live","polite");if(this.s){var b=this.win.document.createElement("div");b.classList.add("-amp-carousel-start-marker");this.a.appendChild(b);b=this.win.document.createElement("div");b.classList.add("-amp-carousel-end-marker");
this.a.appendChild(b)}this.f.forEach(function(b,d){a.K.push(b.getAttribute("data-slide-id")||d.toString());a.setAsOwner(b);var c=a.win.document.createElement("div");b.classList.add("amp-carousel-slide");c.appendChild(b);c.classList.add("-amp-slide-item");a.a.appendChild(c);a.u.push(c)});this.element.appendChild(this.a);this.J();this.a.addEventListener("scroll",this.N.bind(this));this.a.addEventListener("touchmove",this.ea.bind(this));this.s&&this.a.addEventListener("touchend",this.da.bind(this))};
f.isLoopingEligible=function(){return 2<this.h};f.ea=function(){this.clearAutoplay();this.s&&(this.L=!0,this.D&&u(this.win).cancel(this.D))};f.da=function(){var a=this;this.L&&(this.B&&u(this.win).cancel(this.B),this.D=u(this.win).delay(function(){var b=a.a.scrollLeft;a.C||(M(a,b),a.D=null)},120));this.L=!1};f.onLayoutMeasure=function(){this.o=this.getLayoutWidth();null!==this.b&&(this.a.scrollLeft=N(this,this.b));this.H=this.a.scrollLeft};f.layoutCallback=function(){null===this.b&&O(this,0);return Promise.resolve()};
f.updateViewportState=function(a){null!==this.b&&this.updateInViewport(this.f[this.b],a)};f.hasPrev=function(){return this.shouldLoop||0<this.b};f.hasNext=function(){return this.shouldLoop||this.b<this.f.length-1};f.moveSlide=function(a,b){if(null!==this.b){var c=this.hasNext(),d=this.hasPrev();if(1==a&&c||-1==a&&d){var e=this.b+a;-1==e?e=this.h-1:e>=this.h&&(e=0);b?P(this,1!=a||d?this.o:0,a):O(this,e)}}};
f.N=function(){var a=this;this.B&&u(this.win).cancel(this.B);var b=this.a.scrollLeft;this.s||ma(this,b);if(!this.D){var c=this.s?35:100;this.B=u(this.win).delay(function(){a.C||(a.s?M(a,b):P(a,b))},c)}this.H=b};function ma(a,b){var c=a.a.scrollWidth;-1==a.A&&b>=a.H?P(a,b).then(function(){a.A=0}):1==a.A&&b<=a.H?P(a,b).then(function(){a.A=0}):a.A=0>b?-1:b+a.o>c?1:0}
function P(a,b,c){a.C=!0;var d,e=Q(a,b)-a.b,g=a.hasPrev();0!=e||1!=c&&-1!=c||(e=c);if(0==e)d=g?a.o:0;else if(1==e||-1!=e&&e==-1*(a.h-1))d=g?2*a.o:a.o;else if(-1==e||e==a.h-1)d=0;return na(a,b,d).then(function(){M(a,d)})}function Q(a,b){var c=Math.round(b/a.o),d=0;b=a.hasPrev();var e=a.hasNext();b&&e?d=c-1:e?d=c:b&&(d=c-1);b=a.b+d;return b=a.shouldLoop?0>b?a.h-1:b>=a.h?0:b:0>b?0:b>=a.h?a.h-1:b}
function M(a,b){a.C=!0;var c=Q(a,b);a.m.mutate(function(){a.V||a.a.classList.add("-amp-no-scroll");O(a,c);a.m.mutate(function(){a.V||a.a.classList.remove("-amp-no-scroll");a.C=!1})})}
function O(a,b){var c=a.h;if(!(0>b||b>=c||a.b==b)){var d=0<=b-1?b-1:a.shouldLoop?c-1:null,e=b+1<c?b+1:a.shouldLoop?0:null,g=[];null!=d&&g.push(d);g.push(b);null!=e&&g.push(e);null!==a.b&&a.updateInViewport(a.f[a.b],!1);a.updateInViewport(a.f[b],!0);g.forEach(function(c,d){a.shouldLoop&&y(a.u[c],"order",d+1);a.u[c].classList.add("-amp-slide-item-show");c==b?(a.scheduleLayout(a.f[c]),a.scheduleResume(a.f[c]),a.f[c].setAttribute("aria-hidden","false")):(a.schedulePreload(a.f[c]),a.f[c].setAttribute("aria-hidden",
"true"))});a.a.scrollLeft=N(a,b);oa(a,b);a.b=b;pa(a,g);a.setControlsState()}}function N(a,b){var c=a.o;a.shouldLoop||0!=b||(c=0);return c}function pa(a,b){for(var c=a.h,d=0;d<c;d++)a.u[d].classList.contains("-amp-slide-item-show")&&(-1==b.indexOf(d)&&(a.shouldLoop&&y(a.u[d],"order",""),a.u[d].classList.remove("-amp-slide-item-show"),a.f[d].removeAttribute("aria-hidden")),a.b!=d&&a.schedulePause(a.f[d]))}
function na(a,b,c){if(b==c)return Promise.resolve();var d=H(b,c);c=A(.4,0,.2,1);var e=a.a;return E(e,function(b){a.a.scrollLeft=d(b)},80,c).thenAlways()}f.J=function(){this.element.addEventListener("touchmove",function(a){a.stopPropagation()})};function oa(a,b){var c=b-a.b;if(0!=c){1!==Math.abs(c)&&(c=0>c?1:-1);var d={fromSlide:a.K[a.b],toSlide:a.K[b]};z(a.win,"amp-carousel-change",d);1==c?z(a.win,"amp-carousel-next",d):z(a.win,"amp-carousel-prev",d)}};function R(a){I.call(this,a);this.M=this.g=0;this.O=this.i=this.v=null}k(R,I);f=R.prototype;f.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a};
f.buildCarousel=function(){var a=this;this.v=this.getRealChildren();this.i=this.element.ownerDocument.createElement("div");this.i.classList.add("-amp-scrollable-carousel-container");fa(this.i);this.element.appendChild(this.i);this.v.forEach(function(b){a.setAsOwner(b);b.classList.add("amp-carousel-slide");y(b,"display","inline-block");b!=a.v[0]&&y(b,"marginLeft","8px");a.i.appendChild(b)});this.J();this.i.addEventListener("scroll",this.N.bind(this))};
f.layoutCallback=function(){S(this,this.g);T(this,this.g,1);this.setControlsState();return Promise.resolve()};f.onViewportCallback=function(){U(this,this.g,this.g)};f.goCallback=function(a,b){var c=this,d=V(this,this.g,a),e=this.g;if(d!=e)if(b){var g=H(e,d);E(this.element,function(a){c.i.scrollLeft=g(a)},200,"ease-in-out").thenAlways(function(){W(c,d)})}else W(this,d),this.i.scrollLeft=d};f.N=function(){var a=this.i.scrollLeft;this.g=a;null===this.O&&X(this,a)};
function X(a,b){a.O=u(a.win).delay(function(){30>Math.abs(b-a.g)?(a.O=null,W(a,a.g)):X(a,a.g)},100)}function W(a,b){U(a,b,a.M);S(a,b);T(a,b,Math.sign(b-a.M));a.M=b;a.g=b;a.setControlsState()}function V(a,b,c){var d=a.element.offsetWidth,e=a.i.scrollWidth;a=b+c*d;return 0>a?0:e>=d&&a>e-d?e-d:a}function Y(a,b,c){for(var d=a.getLayoutWidth(),e=0;e<a.v.length;e++){var g=a.v[e];g.offsetLeft+g.offsetWidth>=b&&g.offsetLeft<=b+d&&c(g)}}function S(a,b){Y(a,b,function(b){a.scheduleLayout(b)})}
function T(a,b,c){var d=V(a,b,c);d!=b&&Y(a,d,function(b){a.schedulePreload(b)})}function U(a,b,c){var d=[];Y(a,b,function(b){d.push(b);a.updateInViewport(b,!0)});c!=b&&Y(a,c,function(b){-1==d.indexOf(b)&&(a.updateInViewport(b,!1),a.schedulePause(b))})}f.hasPrev=function(){return 0!=this.g};f.hasNext=function(){var a=this.getLayoutWidth(),b=Math.max(this.i.scrollWidth-a,0);return this.g!=b};f.J=function(){this.element.addEventListener("touchmove",function(a){a.stopPropagation()})};function Z(a){AMP.BaseElement.apply(this,arguments)}k(Z,AMP.BaseElement);Z.prototype.upgradeCallback=function(){return"slides"==this.element.getAttribute("type")?new L(this.element):new R(this.element)};AMP.registerElement("amp-carousel",Z,'.amp-carousel-slide>.-amp-replaced-content{-o-object-fit:contain;object-fit:contain}.amp-carousel-button{position:absolute;box-sizing:border-box;top:50%;height:34px;width:34px;border-radius:2px;opacity:0;pointer-events:all;background-color:rgba(0,0,0,.5);background-position:50% 50%;background-repeat:no-repeat;-webkit-transform:translateY(-50%);transform:translateY(-50%);visibility:hidden;z-index:10}.amp-mode-mouse .amp-carousel-button,amp-carousel[controls] .amp-carousel-button{opacity:1;visibility:visible}.amp-carousel-button-prev{left:16px;background-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="%23fff" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" /></svg>\');background-size:18px 18px}.amp-carousel-button-next{right:16px;background-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="%23fff" viewBox="0 0 18 18"><path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z" /></svg>\');background-size:18px 18px}:not(.amp-mode-mouse) .-amp-carousel-button-start-hint .amp-carousel-button:not(.amp-disabled){-webkit-animation:-amp-carousel-hint 1s ease-in 3s 1 normal both;animation:-amp-carousel-hint 1s ease-in 3s 1 normal both}@-webkit-keyframes -amp-carousel-hint{0%{opacity:1;visibility:visible}to{opacity:0;visibility:hidden}}@keyframes -amp-carousel-hint{0%{opacity:1;visibility:visible}to{opacity:0;visibility:hidden}}amp-carousel .amp-carousel-button.amp-disabled{-webkit-animation:none;animation:none;opacity:0;visibility:hidden}.-amp-slides-container{display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;height:100%!important;left:0;overflow-x:auto!important;overflow-y:hidden!important;position:absolute!important;top:0;width:100%!important;-webkit-scroll-snap-type:mandatory!important;scroll-snap-type:mandatory!important;padding-bottom:20px!important;box-sizing:content-box!important;-webkit-overflow-scrolling:touch!important}.amp-mode-touch .-amp-slides-container.-amp-no-scroll{overflow-x:hidden!important}.-amp-slide-item{-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important;display:none!important;-webkit-box-flex:0!important;-webkit-flex:0 0 100%!important;-ms-flex:0 0 100%!important;flex:0 0 100%!important;height:100%!important;-webkit-box-pack:center!important;-webkit-justify-content:center!important;-ms-flex-pack:center!important;justify-content:center!important;position:relative!important;-webkit-scroll-snap-coordinate:0 0!important;scroll-snap-coordinate:0 0!important;width:100%!important}.-amp-slide-item>*{height:100%;width:100%}.-amp-slide-item-show{display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important}.-amp-carousel-end-marker,.-amp-carousel-start-marker{background-color:transparent!important;display:block!important;-webkit-box-flex:0!important;-webkit-flex:0 0 1px!important;-ms-flex:0 0 1px!important;flex:0 0 1px!important;height:100%!important;position:relative!important;-webkit-scroll-snap-coordinate:0 0!important;scroll-snap-coordinate:0 0!important;width:1px!important}.-amp-carousel-start-marker{-webkit-box-ordinal-group:0!important;-webkit-order:-1!important;-ms-flex-order:-1!important;order:-1!important;margin-left:-1px!important}.-amp-carousel-end-marker{-webkit-box-ordinal-group:100000001!important;-webkit-order:100000000!important;-ms-flex-order:100000000!important;order:100000000!important;margin-right:-1px!important}\n/*# sourceURL=/extensions/amp-carousel/0.1/amp-carousel.css*/');
})});
//# sourceMappingURL=amp-carousel-0.1.js.map

