(self.AMP = self.AMP || []).push({n:"amp-springboard-player", f:(function(AMP) {function b(a,c){function e(){}e.prototype=c.prototype;a.prototype=new e;a.prototype.constructor=a;for(var d in c)if(Object.defineProperties){var g=Object.getOwnPropertyDescriptor(c,d);g&&Object.defineProperty(a,d,g)}else a[d]=c[d]};Date.now();self.log=self.log||{user:null,dev:null};var f=self.log;function h(){if(f.user)return f.user;throw Error("failed to call initLogConstructor");};function k(a){AMP.BaseElement.call(this,a);this.c=this.a=this.f="";this.b=null}b(k,AMP.BaseElement);k.prototype.preconnectCallback=function(a){this.preconnect.url("https://cms.springboardplatform.com",a);this.preconnect.url("https://www.springboardplatform.com",a)};k.prototype.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a};
k.prototype.buildCallback=function(){this.f=h().assert(this.element.getAttribute("data-mode"),"The data-mode attribute is required for <amp-springboard-player> %s",this.element);this.a=h().assert(this.element.getAttribute("data-content-id"),"The data-content-id attribute is required for<amp-springboard-player> %s",this.element);this.c=h().assert(this.element.getAttribute("data-domain"),"The data-domain attribute is required for <amp-springboard-player> %s",this.element)};
k.prototype.layoutCallback=function(){var a=this.element.ownerDocument.createElement("iframe"),c=h().assert(this.element.getAttribute("data-site-id"),"The data-site-id attribute is required for<amp-springboard-player> %s",this.element),e=h().assert(this.element.getAttribute("data-player-id"),"The data-player-id attribute is required for<amp-springboard-player> %s",this.element),d=this.element.getAttribute("data-items")||"10";a.setAttribute("frameborder","0");a.setAttribute("allowfullscreen","true");
a.id=e+"_"+this.a;a.src="https://cms.springboardplatform.com/embed_iframe/"+encodeURIComponent(c)+"/"+encodeURIComponent(this.f)+"/"+encodeURIComponent(this.a)+"/"+encodeURIComponent(e)+"/"+encodeURIComponent(this.c)+"/"+encodeURIComponent(d);this.applyFillContent(a);this.b=a;this.element.appendChild(a);return this.loadPromise(a)};k.prototype.pauseCallback=function(){this.b&&this.b.contentWindow&&this.b.contentWindow.postMessage("ampPause","*")};
k.prototype.createPlaceholderCallback=function(){var a=this.win.document.createElement("amp-img");a.setAttribute("src","https://www.springboardplatform.com/storage/"+encodeURIComponent(this.c)+"/snapshots/"+encodeURIComponent(this.a)+".jpg");"playlist"==this.f&&a.setAttribute("src","https://www.springboardplatform.com/storage/default/snapshots/default_snapshot.png");a.setAttribute("placeholder","");a.setAttribute("referrerpolicy","origin");a.setAttribute("layout","fill");return a};
AMP.registerElement("amp-springboard-player",k);
})});
//# sourceMappingURL=amp-springboard-player-0.1.js.map

