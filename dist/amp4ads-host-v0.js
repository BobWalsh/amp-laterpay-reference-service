var g,m="";function p(a){var b=a||self,c;if(b.AMP_MODE)c=b.AMP_MODE;else{c=b;if(c.context&&c.context.mode)c=c.context.mode;else{var d=q(c.location.originalHash||c.location.hash),e=q(c.location.search);m||(m=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011481125594905");c={localDev:!1,development:!("1"!=d.development&&!c.AMP_DEV_MODE),filter:d.filter,minified:!0,lite:void 0!=e.amp_lite,test:!1,log:d.log,version:"1481125594905",rtvVersion:m}}c=b.AMP_MODE=c}return c}
function q(a){var b=Object.create(null);if(!a)return b;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d],f=e.indexOf("="),h,k;-1!=f?(h=decodeURIComponent(e.substring(0,f)).trim(),k=decodeURIComponent(e.substring(f+1)).trim()):(h=decodeURIComponent(e).trim(),k="");h&&(b[h]=k)}return b};var r=Date.now();function u(a,b,c){this.win=a;this.c=b;this.a=this.win.console&&this.win.console.log&&"0"!=p().log?this.c({localDev:!1,development:p(void 0).development,filter:p(void 0).filter,minified:!0,lite:p(void 0).lite,test:!1,log:p(void 0).log,version:p(void 0).version,rtvVersion:p(void 0).rtvVersion}):0;this.b=c||""}
function v(a,b,c,d){if(0!=a.a){var e=a.win.console.log;"ERROR"==c?e=a.win.console.error||e:"INFO"==c?e=a.win.console.info||e:"WARN"==c&&(e=a.win.console.warn||e);d.unshift(Date.now()-r,"["+b+"]");e.apply(a.win.console,d)}}g=u.prototype;g.isEnabled=function(){return 0!=this.a};g.fine=function(a,b){4<=this.a&&v(this,a,"FINE",Array.prototype.slice.call(arguments,1))};g.info=function(a,b){3<=this.a&&v(this,a,"INFO",Array.prototype.slice.call(arguments,1))};
g.warn=function(a,b){2<=this.a&&v(this,a,"WARN",Array.prototype.slice.call(arguments,1))};g.error=function(a,b){if(1<=this.a)v(this,a,"ERROR",Array.prototype.slice.call(arguments,1));else{var c=w.apply(null,Array.prototype.slice.call(arguments,1));x(this,c);this.win.setTimeout(function(){throw c;})}};g.createError=function(a){var b=w.apply(null,arguments);x(this,b);return b};
g.assert=function(a,b,c){var d;if(!a){var e=(b||"Assertion failed").split("%s"),f=e.shift(),h=f,k=[];""!=f&&k.push(f);for(f=2;f<arguments.length;f++){var n=arguments[f];n&&n.tagName&&(d=n);var z=e.shift();k.push(n);var t=z.trim();""!=t&&k.push(t);var t=h,l;l=n;l=l instanceof Element?l.tagName.toLowerCase()+(l.id?"#"+l.id:""):l;h=t+(l+z)}f=Error(h);f.fromAssert=!0;f.associatedElement=d;f.messageArray=k;x(this,f);throw f;}return a};
g.assertElement=function(a,b){this.assert(a&&1==a.nodeType,(b||"Element expected")+": %s",a);return a};g.assertString=function(a,b){this.assert("string"==typeof a,(b||"String expected")+": %s",a);return a};g.assertNumber=function(a,b){this.assert("number"==typeof a,(b||"Number expected")+": %s",a);return a};g.assertEnumValue=function(a,b,c){for(var d in a)if(a[d]==b)return a[d];this.assert(!1,'Unknown %s value: "%s"',c||"enum",b)};
function x(a,b){a.b&&(b.message?-1==b.message.indexOf(a.b)&&(b.message+=a.b):b.message=a.b)}function w(a){for(var b=null,c="",d=0;d<arguments.length;d++){var e=arguments[d];e instanceof Error&&!b?b=e:(c&&(c+=" "),c+=e)}b?c&&(b.message=c+": "+b.message):b=Error(c);return b}self.log=self.log||{user:null,dev:null};var y=self.log,A=null;
function B(){if(!y.user){if(!A)throw Error("failed to call initLogConstructor");y.user=new A(self,function(a){var b=parseInt(a.log,10);return a.development||1<=b?4:0},"\u200b\u200b\u200b")}}function C(){if(y.dev)return y.dev;if(!A)throw Error("failed to call initLogConstructor");return y.dev=new A(self,function(a){a=parseInt(a.log,10);return 3<=a?4:2<=a?3:0})};(function(){A=u;C();B()})();D();function D(){var a=self;a.ampInaboxPendingMessages.forEach(function(b){E(a,b)});a.addEventListener("message",E.bind(null,a))}function E(a,b){var c=b.data;if("string"===typeof c&&0==c.indexOf("amp-inabox:")){a:{for(var c=a.ampInaboxIframes,d=b.source;d.parent!==a&&d!==a.top;)d=d.parent;for(a=0;a<c.length;a++)if(c[a].contentWindow===d){a=c[a];break a}a=void 0}var e=a;C().info("inabox-host","["+e.id+"] "+b.data)}};
//# sourceMappingURL=amp4ads-host-v0.js.map

