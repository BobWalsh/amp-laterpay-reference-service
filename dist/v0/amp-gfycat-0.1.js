(self.AMP = self.AMP || []).push({n:"amp-gfycat", f:(function(AMP) {function d(a,c){function e(){}e.prototype=c.prototype;a.prototype=new e;a.prototype.constructor=a;for(var b in c)if(Object.defineProperties){var f=Object.getOwnPropertyDescriptor(c,b);f&&Object.defineProperty(a,b,f)}else a[b]=c[b]};Date.now();self.log=self.log||{user:null,dev:null};var g=self.log;function h(a){AMP.BaseElement.call(this,a);this.a=null}d(h,AMP.BaseElement);h.prototype.preconnectCallback=function(a){this.preconnect.url("https://gfycat.com",a);this.preconnect.url("https://giant.gfycat.com",a);this.preconnect.url("https://thumbs.gfycat.com",a)};h.prototype.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a};
h.prototype.layoutCallback=function(){var a;if(g.user)a=g.user;else throw Error("failed to call initLogConstructor");var c=a.assert(this.element.getAttribute("data-gfyid"),"The data-gfyid attribute is required for <amp-gfycat> %s",this.element),e=this.element.hasAttribute("noautoplay"),b=this.element.ownerDocument.createElement("iframe");b.setAttribute("frameborder","0");a="https://gfycat.com/ifr/"+encodeURIComponent(c);e&&(a+="?autoplay=0");b.src=a;this.applyFillContent(b);this.element.appendChild(b);
this.a=b;return this.loadPromise(b)};h.prototype.pauseCallback=function(){this.a&&this.a.contentWindow&&this.a.contentWindow.postMessage("pause","*")};AMP.registerElement("amp-gfycat",h);
})});
//# sourceMappingURL=amp-gfycat-0.1.js.map

