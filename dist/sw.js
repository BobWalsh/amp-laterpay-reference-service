(function(){(function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global?global:b})(this);var c="";function g(b){var a=Object.create(null);if(!b)return a;if(0==b.indexOf("?")||0==b.indexOf("#"))b=b.substr(1);for(var d=b.split("&"),h=0;h<d.length;h++){var e=d[h],k=e.indexOf("="),f,l;-1!=k?(f=decodeURIComponent(e.substring(0,k)).trim(),l=decodeURIComponent(e.substring(k+1)).trim()):(f=decodeURIComponent(e).trim(),l="");f&&(a[f]=l)}return a};Date.now();self.log=self.log||{user:null,dev:null};var m=(self.AMP_CONFIG||{}).cdnUrl||"https://cdn.ampproject.org";self.AMPErrors=self.AMPErrors||[];Date.now();var n=function(b,a,d){a&&((a=d)||(a=b.pathname,a=0<=a.indexOf(".max")||"/max/"==a.substr(0,5)),a||(a=b.pathname,a=0<=a.indexOf(".min")||"/min/"==a.substr(0,5)));return a?b.protocol+"//"+b.host+"/dist":m}(self.location,void 0,void 0),p=self,q;
if(p.AMP_MODE)q=p.AMP_MODE;else{var r;if(p.context&&p.context.mode)r=p.context.mode;else{var t=g(p.location.originalHash||p.location.hash),u=g(p.location.search);c||(c=p.AMP_CONFIG&&p.AMP_CONFIG.v?p.AMP_CONFIG.v:"011481124767089");r={localDev:!1,development:!("1"!=t.development&&!p.AMP_DEV_MODE),filter:t.filter,minified:!0,lite:void 0!=u.amp_lite,test:!1,log:t.log,version:"1481124767089",rtvVersion:c}}q=p.AMP_MODE=r}importScripts(n+"/rtv/"+q.rtvVersion+"/v0/cache-service-worker-0.1.js");})();
//# sourceMappingURL=sw.js.map

