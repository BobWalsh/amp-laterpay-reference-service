(self.AMP = self.AMP || []).push({n:"amp-sticky-ad", f:(function(AMP) {var f;function g(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};Date.now();self.log=self.log||{user:null,dev:null};var k=self.log;function l(){if(k.user)return k.user;throw Error("failed to call initLogConstructor");};function m(a,b,c){function d(a){c(a);e()}var e;e=function(){a&&a.removeEventListener(b,d,!1);c=d=a=null};a.addEventListener(b,d,!1)};var n,p="Webkit webkit Moz moz ms O o".split(" ");function q(a,b){var c=void 0;n||(n=Object.create(null));var d=n[b];if(!d||c){d=b;if(void 0===a[b]){var e=b.charAt(0).toUpperCase()+b.slice(1);a:{for(var h=0;h<p.length;h++){var u=p[h]+e;if(void 0!==a[u]){e=u;break a}}e=""}var v=e;void 0!==a[v]&&(d=v)}c||(n[b]=d)}return d}function r(a,b,c){var d;(b=q(a.style,b))&&(a.style[b]=d?c+d:c)}
function t(a,b){if(void 0===b){var c;c=(c=q(a.style,"display"))?a.style[c]:void 0;b="none"==c}r(a,"display",b?"":"none")};function w(a){AMP.BaseElement.call(this,a);this.g=this.getVsync();this.a=this.b=null;this.f=!1;this.c=null}g(w,AMP.BaseElement);f=w.prototype;f.isLayoutSupported=function(a){return"nodisplay"==a};
f.buildCallback=function(){var a=this;this.a=this.getViewport();t(this.element,!0);this.element.classList.add("-amp-sticky-ad-layout");var b=this.getRealChildren();l().assert(1==b.length&&"AMP-AD"==b[0].tagName,"amp-sticky-ad must have a single amp-ad child");this.b=b[0];this.setAsOwner(this.b);var c=this.win.document.createElement("amp-sticky-ad-top-padding");this.element.insertBefore(c,this.b);this.c=this.a.onScroll(function(){return x(a)})};
f.layoutCallback=function(){if(this.f){t(this.element,!0);var a=this.element.offsetHeight;this.a.updatePaddingBottom(a);this.updateInViewport(this.b,!0);this.scheduleLayout(this.b)}return Promise.resolve()};f.unlayoutCallback=function(){this.a.updatePaddingBottom(0);return!0};f.detachedCallback=function(){y(this)};f.collapsedCallback=function(){var a=this;t(this.element,!1);this.g.mutate(function(){a.a.updatePaddingBottom(0)})};function y(a){a.c&&(a.c(),a.c=null)}
function x(a){var b=a.a.getScrollTop(),c=a.a.getSize().height,d=a.a.getScrollHeight();d<2*c?y(a):b>c&&(y(a),a.deferMutate(function(){a.f=!0;a.a.addToFixedLayer(a.element);a.a.updatePaddingBottom(a.element.offsetHeight);var b=a.win.document.createElement("button");b.classList.add("amp-sticky-ad-close-button");b.setAttribute("aria-label",a.element.getAttribute("data-close-button-aria-label")||"Close this ad");var c=a.h.bind(a);b.addEventListener("click",c);a.element.appendChild(b);z(a)}))}
function z(a){a.b.isBuilt()?A(a):m(a.b,"amp:built",function(){A(a)})}function A(a){a.updateInViewport(a.b,!0);a.scheduleLayout(a.b);m(a.b,"amp:load:end",function(){a.g.mutate(function(){a.element.setAttribute("visible","");var b=a.win.getComputedStyle(a.element).getPropertyValue("background-color"),c=b.replace(/\(([^,]+),([^,]+),([^,)]+),[^)]+\)/g,"($1,$2,$3, 1)");b!=c&&(l().warn("AMP-STICKY-AD","Do not allow container to be semitransparent"),r(a.element,"background-color",c))})})}
f.h=function(){var a=this;this.g.mutate(function(){a.f=!1;a.scheduleUnlayout(a.b);a.a.removeFromFixedLayer(a.element);var b=a.element;b.parentElement&&b.parentElement.removeChild(b);a.a.updatePaddingBottom(0)})};(function(a){a.registerElement("amp-sticky-ad",w,"amp-sticky-ad{position:fixed!important;text-align:center;bottom:0!important;left:0;width:100%!important;z-index:11!important;max-height:100px!important;box-sizing:border-box;opacity:1!important;background-image:none!important;background-color:#fff;box-shadow:0 0 5px 0 rgba(0,0,0,.2)!important}amp-sticky-ad-top-padding{display:block;width:100%!important;background:#fff;height:4px;max-height:5px!important;z-index:12!important}.-amp-sticky-ad-layout{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;visibility:hidden!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;overflow:visible!important;-webkit-transform:translateZ(0)!important;transform:translateZ(0)!important}amp-sticky-ad[visible]{visibility:visible!important}.-amp-sticky-ad-layout>amp-ad{display:block}.amp-sticky-ad-close-button{position:absolute;visibility:hidden;width:28px;height:28px;top:-28px;right:0;background-image:url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2213px%22%20height%3D%2213px%22%20viewBox%3D%22341%208%2013%2013%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cg%20id%3D%22ic_close_black_24dp%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20transform%3D%22translate%28341.000000%2C%208.000000%29%22%3E%3Cpolygon%20id%3D%22Shape%22%20fill%3D%22%234F4F4F%22%20points%3D%2213%201.30928571%2011.6907143%200%206.5%205.19071429%201.30928571%200%200%201.30928571%205.19071429%206.5%200%2011.6907143%201.30928571%2013%206.5%207.80928571%2011.6907143%2013%2013%2011.6907143%207.80928571%206.5%22%3E%3C/polygon%3E%3C/g%3E%3C/svg%3E');background-size:13px 13px;background-position:9px center;background-color:#fff;background-repeat:no-repeat;box-shadow:0 0 5px 0 rgba(0,0,0,.2);border:none;border-top-left-radius:12px}amp-sticky-ad[visible]>.amp-sticky-ad-close-button{visibility:visible}.amp-sticky-ad-close-button:before{position:absolute;content:'';top:-20px;right:0;left:-20px;bottom:0}[dir=rtl] .amp-sticky-ad-close-button{right:auto;left:0;border-top-left-radius:0;border-top-right-radius:12px;background-position:6px center}[dir=rtl] .amp-sticky-ad-close-button:before{right:-20px;left:0}\n/*# sourceURL=/extensions/amp-sticky-ad/1.0/amp-sticky-ad.css*/")})(self.AMP);
})});
//# sourceMappingURL=amp-sticky-ad-1.0.js.map

