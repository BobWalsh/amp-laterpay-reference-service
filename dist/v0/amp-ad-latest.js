(self.AMP = self.AMP || []).push({n:"amp-ad", f:(function(AMP) {var n;function r(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}var t="";
function y(){var a=void 0,b=a||self,c;if(b.AMP_MODE)c=b.AMP_MODE;else{c=b;if(c.context&&c.context.mode)c=c.context.mode;else{var d=aa(c.location.originalHash||c.location.hash),e=aa(c.location.search);t||(t=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011481021884470");c={localDev:!1,development:!("1"!=d.development&&!c.AMP_DEV_MODE),filter:d.filter,minified:!0,lite:void 0!=e.amp_lite,test:!1,log:d.log,version:"1481021884470",rtvVersion:t}}c=b.AMP_MODE=c}return c}
function aa(a){var b=Object.create(null);if(!a)return b;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d],f=e.indexOf("="),g,k;-1!=f?(g=decodeURIComponent(e.substring(0,f)).trim(),k=decodeURIComponent(e.substring(f+1)).trim()):(g=decodeURIComponent(e).trim(),k="");g&&(b[g]=k)}return b};Date.now();self.log=self.log||{user:null,dev:null};var z=self.log;function A(){if(z.user)return z.user;throw Error("failed to call initLogConstructor");}function B(){if(z.dev)return z.dev;throw Error("failed to call initLogConstructor");};function ba(a,b,c){if(b(a))c();else{var d=a.ownerDocument.defaultView;if(d.MutationObserver){var e=new d.MutationObserver(function(){b(a)&&(e.disconnect(),c())});e.observe(a,{childList:!0})}else var f=d.setInterval(function(){b(a)&&(d.clearInterval(f),c())},5)}}function ca(a,b){ba(a.documentElement,function(){return!!a.body},b)}function da(a){return new Promise(function(b){ca(a,b)})}function ea(a,b){for(var c,d=a;d&&d!==c;d=d.parentElement)if(b(d))return d;return null}
function fa(a){var b="amp-ad";if(a.closest)return a.closest(b);b=b.toUpperCase();return ea(a,function(a){return a.tagName==b})}function ga(a,b){for(var c=[],d=a.parentElement;d;d=d.parentElement)b(d)&&c.push(d);return c}function ha(a){var b="BODY",b=b.toUpperCase();return ga(a,function(a){return a.tagName==b})};function C(a,b){a=a.__AMP_TOP||a;var c=a.services&&a.services[b]&&a.services[b].obj;return c}function D(a,b){var c=a;if(c.nodeType){var d=(c.ownerDocument||c).defaultView,e=d=d.__AMP_TOP||d,d=E(d),f=d.ampdoc;f||(f=d.ampdoc={obj:null,promise:null,resolve:null});f.obj||(f.obj=(void 0)(e),f.resolve&&f.resolve(f.obj));c=f.obj.getAmpDoc(c)}var g=c.isSingleDoc()?c.win:c;return g&&g.services&&g.services[b]&&g.services[b].obj}
function ia(a,b){var c=ja(a,b);if(c)return c;a=E(a);var d,e=new Promise(function(a){d=a});a[b]={obj:null,promise:e,resolve:d};return e}function ja(a,b){if(a=E(a)[b]){if(b=a.promise)return b;if(a.obj)return a.promise=Promise.resolve(a.obj)}return null}function E(a){var b=a.services;b||(b=a.services={});return b};function ka(a){var b="amp-user-notification";return la(a,"userNotificationManager",b).then(function(a){return A().assert(a,"Service %s was requested to be provided through %s, but %s is not loaded in the current page. To fix this problem load the JavaScript file for %s in this page.","userNotificationManager",b,b,b)})}
function la(a,b,c){var d=ja(a,b);return d?d:Promise.resolve().then(function(){return a.ampExtendedElements&&a.ampExtendedElements[c]?ia(a,b):da(a.document).then(function(){return a.ampExtendedElements&&a.ampExtendedElements[c]?ia(a,b):null})})};var ma={_ping_:{renderStartImplemented:!0},a9:{prefetch:"https://c.amazon-adsystem.com/aax2/assoc.js"},accesstrade:{prefetch:"https://h.accesstrade.net/js/amp/amp.js"},adblade:{prefetch:"https://web.adblade.com/js/ads/async/show.js",preconnect:["https://staticd.cdn.adblade.com","https://static.adblade.com"],renderStartImplemented:!0},adbutler:{prefetch:"https://servedbyadbutler.com/app.js"},adform:{},adgeneration:{prefetch:"https://i.socdm.com/sdk/js/adg-script-loader.js"},adition:{},adman:{},adreactor:{},
adsense:{prefetch:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",preconnect:"https://googleads.g.doubleclick.net",clientIdScope:"AMP_ECID_GOOGLE"},adsnative:{prefetch:"https://static.adsnative.com/static/js/render.v1.js",preconnect:"https://api.adsnative.com"},adspirit:{},adstir:{prefetch:"https://js.ad-stir.com/js/adstir_async.js",preconnect:"https://ad.ad-stir.com"},adtech:{prefetch:"https://s.aolcdn.com/os/ads/adsWrapper3.js",preconnect:["https://mads.at.atwola.com","https://aka-cdn.adtechus.com"]},
aduptech:{prefetch:"https://s.d.adup-tech.com/jsapi"},adverline:{prefetch:"https://ads.adverline.com/richmedias/amp.js",preconnect:["https://adnext.fr"],renderStartImplemented:!0},advertserve:{renderStartImplemented:!0},affiliateb:{prefetch:"https://track.affiliate-b.com/amp/a.js",renderStartImplemented:!0},amoad:{prefetch:["https://j.amoad.com/js/a.js","https://j.amoad.com/js/n.js"],preconnect:["https://d.amoad.com","https://i.amoad.com","https://m.amoad.com","https://v.amoad.com"]},appnexus:{prefetch:"https://acdn.adnxs.com/ast/ast.js",
preconnect:"https://ib.adnxs.com"},atomx:{prefetch:"https://s.ato.mx/p.js"},caprofitx:{prefetch:["https://cdn.caprofitx.com/pfx.min.js","https://cdn.caprofitx.com/tags/amp/profitx_amp.js"],preconnect:"https://ad.caprofitx.adtdp.com"},chargeads:{},colombia:{prefetch:"https://static.clmbtech.com/ad/commons/js/colombia-amp.js"},contentad:{},criteo:{prefetch:"https://static.criteo.net/js/ld/publishertag.js",preconnect:"https://cas.criteo.com"},dotandads:{prefetch:"https://amp.ad.dotandad.com/dotandadsAmp.js",
preconnect:"https://bal.ad.dotandad.com"},doubleclick:{prefetch:["https://www.googletagservices.com/tag/js/gpt.js","https://securepubads.g.doubleclick.net/static/glade.js"],preconnect:["https://partner.googleadservices.com","https://tpc.googlesyndication.com"],clientIdScope:"AMP_ECID_GOOGLE",renderStartImplemented:!0},eplanning:{prefetch:"https://us.img.e-planning.net/layers/epl-amp.js"},ezoic:{prefetch:["https://www.googletagservices.com/tag/js/gpt.js","https://g.ezoic.net/ezoic/ampad.js"]},f1e:{prefetch:"https://img.ak.impact-ad.jp/util/f1e_amp.min.js"},
fake:{},felmat:{prefetch:"https://t.felmat.net/js/fmamp.js",renderStartImplemented:!0},flite:{},genieessp:{prefetch:"https://js.gsspcln.jp/l/amp.js"},gmossp:{prefetch:"https://cdn.gmossp-sp.jp/ads/amp.js"},holder:{prefetch:"https://i.holder.com.ua/js2/holder/ajax/ampv1.js",preconnect:"https://h.holder.com.ua",renderStartImplemented:!0},ibillboard:{},imobile:{prefetch:"https://spamp.i-mobile.co.jp/script/amp.js",preconnect:"https://spad.i-mobile.co.jp"},improvedigital:{},industrybrains:{prefetch:"https://web.industrybrains.com/js/ads/async/show.js",
preconnect:["https://staticd.cdn.industrybrains.com","https://static.industrybrains.com"],renderStartImplemented:!0},inmobi:{prefetch:"https://cf.cdn.inmobi.com/ad/inmobi.secure.js",renderStartImplemented:!0},ix:{prefetch:"https://js-sec.indexww.com/indexJTag.js",preconnect:"https://as-sec.casalemedia.com"},kargo:{},kixer:{prefetch:"https://cdn.kixer.com/ad/load.js",renderStartImplemented:!0},ligatus:{},loka:{prefetch:"https://loka-cdn.akamaized.net/scene/amp.js",preconnect:["https://scene-front.lokaplatform.com",
"https://loka-materials.akamaized.net"],renderStartImplemented:!0},mads:{prefetch:"https://eu2.madsone.com/js/tags.js"},"mantis-display":{prefetch:"https://assets.mantisadnetwork.com/mantodea.min.js",preconnect:["https://mantodea.mantisadnetwork.com","https://res.cloudinary.com","https://resize.mantisadnetwork.com"]},"mantis-recommend":{prefetch:"https://assets.mantisadnetwork.com/recommend.min.js",preconnect:["https://mantodea.mantisadnetwork.com","https://resize.mantisadnetwork.com"]},mediaimpact:{prefetch:"https://ec-ns.sascdn.com/diff/251/pages/amp_default.js",
preconnect:["https://ww251.smartadserver.com","https://static.sascdn.com/"],renderStartImplemented:!0},medianet:{preconnect:"https://contextual.media.net",renderStartImplemented:!0},mediavine:{prefetch:"https://www.googletagservices.com/tag/js/gpt.js",preconnect:["https://partner.googleadservices.com","https://securepubads.g.doubleclick.net","https://tpc.googlesyndication.com"],renderStartImplemented:!0},meg:{renderStartImplemented:!0},microad:{prefetch:"https://j.microad.net/js/camp.js",preconnect:["https://s-rtb.send.microad.jp",
"https://s-rtb.send.microadinc.com","https://cache.send.microad.jp","https://cache.send.microadinc.com","https://deb.send.microad.jp"]},mixpo:{prefetch:"https://cdn.mixpo.com/js/loader.js",preconnect:["https://player1.mixpo.com","https://player2.mixpo.com"]},nativo:{prefetch:"https://s.ntv.io/serve/load.js"},nend:{prefetch:"https://js1.nend.net/js/amp.js",preconnect:["https://output.nend.net","https://img1.nend.net"]},nokta:{prefetch:"https://static.virgul.com/theme/mockups/noktaamp/ampjs.js",renderStartImplemented:!0},
openadstream:{},openx:{prefetch:"https://www.googletagservices.com/tag/js/gpt.js",preconnect:["https://partner.googleadservices.com","https://securepubads.g.doubleclick.net","https://tpc.googlesyndication.com"]},plista:{},pubmatic:{prefetch:"https://ads.pubmatic.com/AdServer/js/amp.js"},pubmine:{prefetch:["https://s.pubmine.com/head.js","https://s.pubmine.com/showad.js"],preconnect:"https://delivery.g.switchadhub.com",renderStartImplemented:!0},pulsepoint:{prefetch:"https://ads.contextweb.com/TagPublish/getjs.static.js",
preconnect:"https://tag.contextweb.com"},purch:{prefetch:"https://ramp.purch.com/serve/creative_amp.js",renderStartImplemented:!0},revcontent:{prefetch:"https://labs-cdn.revcontent.com/build/amphtml/revcontent.amp.min.js",preconnect:["https://trends.revcontent.com","https://cdn.revcontent.com","https://img.revcontent.com"]},rubicon:{},sharethrough:{renderStartImplemented:!0},smartadserver:{prefetch:"https://ec-ns.sascdn.com/diff/js/amp.v0.js",preconnect:"https://static.sascdn.com",renderStartImplemented:!0},
smartclip:{prefetch:"https://cdn.smartclip.net/amp/amp.v0.js",preconnect:"https://des.smartclip.net",renderStartImplemented:!0},sortable:{prefetch:"https://www.googletagservices.com/tag/js/gpt.js",preconnect:["https://tags-cdn.deployads.com","https://partner.googleadservices.com","https://securepubads.g.doubleclick.net","https://tpc.googlesyndication.com"]},sovrn:{prefetch:"https://ap.lijit.com/www/sovrn_amp/sovrn_ads.js"},taboola:{},teads:{prefetch:"https://cdn.teads.tv/media/format/v3/teads-format.min.js",
preconnect:["https://cdn2.teads.tv","https://a.teads.tv","https://t.teads.tv"]},triplelift:{},webediads:{prefetch:"https://eu1.wbdds.com/amp.min.js",preconnect:["https://goutee.top","https://mediaathay.org.uk"],renderStartImplemented:!0},"weborama-display":{prefetch:["https://cstatic.weborama.fr/js/advertiserv2/adperf_launch_1.0.0_scrambled.js","https://cstatic.weborama.fr/js/advertiserv2/adperf_core_1.0.0_scrambled.js"]},widespace:{},xlift:{prefetch:"https://cdn.x-lift.jp/resources/common/xlift_amp.js",
renderStartImplemented:!0},yahoo:{prefetch:"https://s.yimg.com/os/ampad/display.js",preconnect:"https://us.adserver.yahoo.com"},yahoojp:{prefetch:["https://s.yimg.jp/images/listing/tool/yads/ydn/amp/amp.js","https://yads.c.yimg.jp/js/yads.js"],preconnect:"https://yads.yahoo.co.jp"},yieldbot:{prefetch:["https://cdn.yldbt.com/js/yieldbot.intent.amp.js","https://msg.yldbt.com/js/ybmsg.html"],preconnect:"https://i.yldbt.com"},yieldmo:{prefetch:"https://static.yieldmo.com/ym.amp1.js",preconnect:["https://s.yieldmo.com",
"https://ads.yieldmo.com"],renderStartImplemented:!0},yieldone:{prefetch:"https://img.ak.impact-ad.jp/ic/pone/commonjs/yone-amp.js"},zedo:{prefetch:"https://ss3.zedo.com/gecko/tag/Gecko.amp.min.js",renderStartImplemented:!0},zergnet:{},zucks:{preconnect:["https://j.zucks.net.zimg.jp","https://sh.zucks.net","https://k.zucks.net","https://static.zucks.net.zimg.jp"]}};function na(a){var b=ma[a.element.getAttribute("type")],c=b?b.clientIdScope:null;if(!c)return Promise.resolve();var d=la(a.win,"cid","amp-analytics").then(function(a){if(a)return a.get(c,Promise.resolve()).catch(function(a){B().error("AD-CID",a)})});return C(a.win,"timer").timeoutPromise(1E3,d,"cid timeout").catch(function(a){B().warn("AD-CID",a)})};function oa(a){return a.replace(/-([a-z])/g,function(a,c){return c.toUpperCase()})};var pa=self.AMP_CONFIG||{},qa=pa.thirdPartyUrl||"https://3p.ampproject.net",ra=pa.thirdPartyFrameHost||"ampproject.net",sa=/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org/;var F,I;
function J(a){var b;F||(F=self.document.createElement("a"),I=self.UrlCache||(self.UrlCache=Object.create(null)));var c=I[a];if(c)return c;F.href=a;F.protocol||(F.href=F.href);var d={href:F.href,protocol:F.protocol,host:F.host,hostname:F.hostname,port:"0"==F.port?"":F.port,pathname:F.pathname,search:F.search,hash:F.hash,origin:null};"/"!==d.pathname[0]&&(d.pathname="/"+d.pathname);if("http:"==d.protocol&&80==d.port||"https:"==d.protocol&&443==d.port)d.port="",d.host=d.hostname;d.origin=F.origin&&"null"!=
F.origin?F.origin:"data:"!=d.protocol&&d.host?d.protocol+"//"+d.host:d.href;var e=d;return b?e:I[a]=e}function ta(a){"string"==typeof a&&(a=J(a));var b;(b="https:"==a.protocol||"localhost"==a.hostname)||(a=a.hostname,b=a.length-10,b=0<=b&&a.indexOf(".localhost",b)==b);return b}function K(a){"string"==typeof a&&(a=J(a));return sa.test(a.origin)};function ua(a){for(var b=a.nodeName,c=0,d=0,e=a.previousElementSibling;e&&25>d&&100>c;)e.nodeName==b&&d++,c++,e=e.previousElementSibling;return 25>d&&100>c?"."+d:""};var L;function M(a,b){var c=L||(L=Object.create(null));if(b in c)a=c[b];else{var d=b;a=-1!=va(a).indexOf(d)?!0:a.AMP_CONFIG&&a.AMP_CONFIG.hasOwnProperty(d)?Math.random()<a.AMP_CONFIG[d]:!1;a=c[b]=a}return a}
function va(a){if(a._experimentCookie)return a._experimentCookie;var b;a:{b:{try{b=a.document.cookie;break b}catch(g){}b=void 0}if(b){b=b.split(";");for(var c=0;c<b.length;c++){var d=b[c].trim(),e=d.indexOf("=");if(-1!=e&&"AMP_EXP"==decodeURIComponent(d.substring(0,e).trim())){b=decodeURIComponent(d.substring(e+1).trim());break a}}}b=null}var f=b;return a._experimentCookie=f?f.split(/\s*,\s*/g):[]};function wa(a,b,c,d,e){var f=b.dataset&&b.dataset.multiSize;if(a.crypto&&(a.crypto.subtle||a.crypto.webkitSubtle)&&!f&&K(a.location)){var f=c,g=d.control,k=d.experiment,h;if(!(h=D(b,"viewer").getParam("exp"))){var l=a.location.search;h=Object.create(null);if(l){if(0==l.indexOf("?")||0==l.indexOf("#"))l=l.substr(1);for(var l=l.split("&"),m=0;m<l.length;m++){var p=l[m],q=p.indexOf("="),w;-1!=q?(w=decodeURIComponent(p.substring(0,q)).trim(),p=decodeURIComponent(p.substring(q+1)).trim()):(w=decodeURIComponent(p).trim(),
p="");w&&(h[w]=p)}}h=h.exp}h&&(h=(h=/(^|,)(a4a:[^,]*)/.exec(h))&&h[2])&&(l=h.split(":",2)[1],g={"-1":"117152632",0:null,1:g,2:k},g.hasOwnProperty(l)?(g=g[l],a.pageExperimentBranches=a.pageExperimentBranches||{},m=!!g,k=L||(L=Object.create(null)),h=va(a),l=-1!=h.indexOf(f)||f in k&&k[f],m=void 0!==m?m:!l,m!=l&&(m?(h.push(f),k[f]=!0):(h.splice(h.indexOf(f),1),k[f]=!1)),a.pageExperimentBranches[f]=g):B().warn("A4A-CONFIG","Unknown a4a URL parameter: ",h," expected one of -1 (manual), 0 (not in experiment), 1 (control branch), or 2 (a4a experiment branch)"));
var v={};v[c]=e;xa(a,v);if(M(a,c)){var x=a.pageExperimentBranches[c];a=x;(f=b.getAttribute("data-experiment-id"))&&ya(za(f))?b.setAttribute("data-experiment-id",Aa(a,f)):b.setAttribute("data-experiment-id",a);return x==e.experiment||x==d.experiment||"117152632"==x}}return!1}
function xa(a,b){a.pageExperimentBranches=a.pageExperimentBranches||{};for(var c in b)if(b.hasOwnProperty(c)&&!a.pageExperimentBranches.hasOwnProperty(c)&&!a.pageExperimentBranches[c]&&M(a,c)){var d=b[c],e=Object.keys(d),f=e[Math.floor(Math.random()*e.length)];a.pageExperimentBranches[c]=d[f]}}function za(a){return a?a.split(","):[]}function Ba(a){return za(a.getAttribute("data-experiment-id")).some(function(a){return"117152632"===a})}
function ya(a){return a.every(function(a){return!isNaN(parseInt(a,10))})}function Aa(a,b){return a&&!isNaN(parseInt(a,10))?b?b+","+a:a:b||""};var Ca={control:"117152650",experiment:"117152651"},Da={control:"117152670",experiment:"117152671"};var Ea={control:"117152660",experiment:"117152661"},Fa={control:"117152680",experiment:"117152681"};var Ga=function(a){var b=Object.create(null);a&&Object.assign(b,a);return b}({adsense:function(a,b){return wa(a,b,"expAdsenseA4A",Ca,Da)},doubleclick:function(a,b){if(a.document.querySelector("meta[name=amp-3p-iframe-src]"))return!1;var c=b.hasAttribute("data-use-beta-a4a-implementation"),d=wa(a,b,"expDoubleclickA4A",Ea,Fa)||c&&(K(a.location)||!1||!1);d&&c&&!Ba(b)&&b.setAttribute("data-experiment-id","2077831");return d}});var N,Ha="Webkit webkit Moz moz ms O o".split(" ");function O(a,b,c){var d,e=a.style;N||(N=Object.create(null));var f=N[b];if(!f){f=b;if(void 0===e[b]){var g=b.charAt(0).toUpperCase()+b.slice(1);a:{for(var k=0;k<Ha.length;k++){var h=Ha[k]+g;if(void 0!==e[h]){g=h;break a}}g=""}void 0!==e[g]&&(f=g)}N[b]=f}(b=f)&&(a.style[b]=d?c+d:c)};self.AMPErrors=self.AMPErrors||[];function P(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a}function Ja(a){a=parseFloat(a);return"number"===typeof a&&isFinite(a)?a:void 0};var Ka={"AMP-FX-FLYING-CARPET":!0,"AMP-LIGHTBOX":!0,"AMP-STICKY-AD":!0};function Q(a){this.a=a;this.state=0;this.M=!!a.getFallback()}Q.prototype.init=function(){if(M(this.a.win,"amp-ad-loading-ux")&&!this.M){var a={fallback:""},b=document.createElement("div"),c;for(c in a)b.setAttribute(c,a[c]);b.classList.add("amp-ad-default-fallback");this.a.element.appendChild(b)}};
Q.prototype.setDisplayState=function(a){if(0!=this.state||1==a)switch(a){case 1:this.state=1;this.a.togglePlaceholder(!0);break;case 2:this.state=2;this.a.togglePlaceholder(!1);break;case 3:La(this);break;case 0:Ma(this);break;default:B().error("AmpAdUIHandler","state is not supported")}};
function La(a){a.M?a.a.deferMutate(function(){0!=a.state&&(a.a.togglePlaceholder(!1),a.a.toggleFallback(!0),a.state=3)}):a.a.attemptChangeHeight(0).then(function(){a.a.collapse();a.state=3},function(){a.a.togglePlaceholder(!1);a.a.toggleFallback(!0);a.state=3})}function Ma(a){a.state=0;a.a.deferMutate(function(){0==a.state&&(a.a.togglePlaceholder(!0),a.a.toggleFallback(!1))})}AMP.AmpAdUIHandler=Q;function Na(a){var b=a["3pla"];b||(b={},a["3pla"]=b);var c=C(a,"timer").delay(function(){C(a,"timer").cancel(c);var b=a["3pla"];b&&delete b[c]},1E3);b[c]=1};var Oa={adSlotBuilt:"0",urlBuilt:"1",adRequestStart:"2",adRequestEnd:"3",extractCreativeAndSignature:"4",adResponseValidateStart:"5",renderFriendlyStart:"6",renderCrossDomainStart:"7",renderFriendlyEnd:"8",renderCrossDomainEnd:"9",preAdThrottle:"10",renderSafeFrameStart:"11",adSlotCleared:"20"};var Pa={a4aProfilingRate:{on:1}};function S(){}S.prototype.sendPing=function(){};S.prototype.reset=function(){};function T(a,b,c,d,e){this.QQID_HEADER="X-QQID";this.ca=a;this.b=b;this.O=c;this.o=e;this.W=d;this.J=this.O+"."+this.o;this.H=null;this.Y=Date.now();this.P="https://csi.gstatic.com/csi"}r(T,S);T.prototype.setQqid=function(a){this.H=a};T.prototype.setPingAddress=function(a){this.P=a};
T.prototype.sendPing=function(a){var b=Oa[a]||9999,c=Date.now()-this.Y,d=this.H?encodeURIComponent(this.H):!1,d=d?"&qqid."+this.o+"="+d:"",e=this.b.getAttribute("data-experiment-id"),e=e?"&e="+encodeURIComponent(e):"";a=this.P+"?"+("s="+this.O)+("&v=2&it="+a+"."+c+","+a+"_"+this.o+"."+c)+("&rt=stage."+b+",slotId."+this.o)+("&c="+this.W)+"&rls=1481021884470"+(""+e+d)+("&it."+this.J+"="+a+"."+c)+("&rt."+this.J+"=stage."+b)+("&met."+this.J+"=stage_"+b+"."+c);b=this.b.ownerDocument.createElement("img");
b.setAttribute("src",a);b.setAttribute("style","position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden");b.setAttribute("aria-hidden","true");this.b.parentNode.insertBefore(b,this.b);B().info("PING",a)};T.prototype.reset=function(){this.setQqid(null)};function Qa(a,b){var c=b.data;if("string"==typeof c&&0==c.indexOf("a2a;")){var d=b.origin,c=JSON.parse(c.substr(4));b=b.source;var e=a.document.activeElement;A().assert("IFRAME"==e.tagName,"A2A request with invalid active element %s %s %s",e,c.url,d);for(var f=!1,g=b,k=e.contentWindow;g!=a.top;){if(g==k){f=!0;break}g=g.parent}A().assert(f,"A2A request from invalid source win %s %s",c.url,d);A().assert(fa(e),"A2A request from non-ad frame %s %s",c.url,d);A().assert(K(c.url),"Invalid ad A2A URL %s %s",
c.url,d);D(a.document,"viewer").navigateTo(c.url,"ad-"+d)}};function Ra(a,b){for(var c=[],d=0;d<a.length;d++){var e=a[d];b(e,d,a)||(c.push(e),a.splice(d,1),d--)}};function Sa(a,b,c){var d=a.listeningFors;!d&&c&&(d=a.listeningFors=Object.create(null));a=d||null;if(!a)return a;var e=a[b];!e&&c&&(e=a[b]=[]);return e||null}function Ta(a,b,c){var d=J(b.src).origin,e=c?b.getAttribute("data-amp-3p-sentinel"):"amp";a=Sa(a,e,!0);for(var f,e=0;e<a.length;e++){var g=a[e];if(g.frame===b){f=g;break}}f||(f={frame:b,origin:d,events:Object.create(null)},a.push(f));return f.events}
function Ua(a){for(var b={sentinel:"unlisten"},c=a.length-1;0<=c;c--){var d=a[c];if(!d.frame.contentWindow){a.splice(c,1);var e=d.events,f;for(f in e)e[f].splice(0,Infinity).forEach(function(a){a(b)})}}}
function Va(a){if(!a.listeningFors){var b=function(b){if(b.data){var c=b.data;if("string"===typeof c&&"{"===c.charAt(0))try{c=JSON.parse(c)}catch(x){B().warn("IFRAME-HELPER","Postmessage could not be parsed. Is it in a valid JSON format?",x)}if(c.sentinel){var e;var f=c.sentinel,g=b.origin,k=b.source,h=Sa(a,f);if(h){for(var l=0;l<h.length;l++){var m=h[l],p=m.frame.contentWindow;if(p)if("amp"===f){if(m.origin===g&&p==k){e=m;break}}else{var q;if(!(q=k==p))b:{for(q=k;q&&q!=q.parent;q=q.parent)if(q==
p){q=!0;break b}q=!1}if(q){e=m;break}}else setTimeout(Ua,0,h)}e=e?e.events:null}else e=h;var w=e;if(w){var v=w[c.type];if(v)for(v=v.slice(),e=0;e<v.length;e++)(0,v[e])(c,b.source,b.origin)}}}};a.addEventListener("message",b)}}function Wa(a,b,c,d,e){function f(b,d,f){if(e||d==a.contentWindow)"unlisten"==b.sentinel?h():c(b,d,f)}var g=a.ownerDocument.defaultView;Va(g);d=Ta(g,a,d);var k=d[b]||(d[b]=[]),h;k.push(f);return h=function(){if(f){var a=k.indexOf(f);-1<a&&k.splice(a,1);c=k=f=null}}}
function U(a,b){var c=[];"string"==typeof b&&(b=[b]);return new Promise(function(d){for(var e=0;e<b.length;e++){var f=Wa(a,b[e],function(a,b,e){for(var f=0;f<c.length;f++)c[f]();d({data:a,source:b,origin:e})},!0);c.push(f)}})}function Xa(a,b,c,d,e){if(a.contentWindow){d.type=c;d.sentinel=e?a.getAttribute("data-amp-3p-sentinel"):"amp";var f=d;e&&(f="amp-"+JSON.stringify(d));for(a=0;a<b.length;a++)c=b[a],c.win.postMessage(f,c.origin)}}
function V(a,b,c,d){var e=this;this.C=a;this.D=c;this.i=[];this.aa=Wa(this.C,b,function(a,b,c){e.i.some(function(a){return a.win==b})||e.i.push({win:b,origin:c});d(a,b,c)},this.D,this.D)}V.prototype.send=function(a,b){Ra(this.i,function(a){return!!a.win.parent});Xa(this.C,this.i,a,b,this.D)};V.prototype.destroy=function(){this.aa();this.i.length=0};function Ya(a,b,c,d){return{left:a,top:b,width:c,height:d,bottom:b+d,right:a+c}}function Za(a){for(var b=-Infinity,c=Infinity,d=-Infinity,e=Infinity,f=0;f<arguments.length;f++){var g=arguments[f];if(g&&(b=Math.max(b,g.left),c=Math.min(c,g.left+g.width),d=Math.max(d,g.top),e=Math.min(e,g.top+g.height),c<b||e<d))return null}return Infinity==c?null:Ya(b,d,c-b,e-d)}function W(a,b,c){return 0==b&&0==c||0==a.width&&0==a.height?a:Ya(a.left+b,a.top+c,a.width,a.height)};var $a=[0,.05,.1,.15,.2,.25,.3,.35,.4,.45,.5,.55,.6,.65,.7,.75,.8,.85,.9,.95,1],ab=Date.now();function bb(a,b,c){var d=this;this.A=a;this.j=null;this.F=this.I=!1;this.s=null;this.L=a.getViewport();this.K=new V(b,"send-intersections",c||!1,function(){cb(d)});this.j=new db(function(a){d.K.send("intersection",{changes:[a]})},{threshold:$a});this.fire=function(){d.I&&d.F&&d.j.tick(d.L.getRect())}}
function cb(a){a.I=!0;a.j.observe(a.A.element);a.A.getVsync().measure(function(){a.F=a.A.isInViewport();a.fire()});var b=a.L.onScroll(a.fire),c=a.L.onChanged(a.fire);a.s=function(){b();c()}}bb.prototype.onViewportCallback=function(a){this.F=a};bb.prototype.destroy=function(){this.I=!1;this.j=null;this.s&&(this.s(),this.s=null);this.K.destroy();this.K=null};function db(a,b){this.U=a;var c=b&&b.threshold||[0];this.$=c.sort();this.b=null;this.G=0}
db.prototype.observe=function(a){a.isBuilt&&a.isBuilt();this.G=0;this.b=a};
db.prototype.tick=function(a,b){b&&(a=W(a,-b.left,-b.top),b=W(b,-b.left,-b.top));var c,d=null;c=this.b.getLayoutBox();var e=this.b.getOwner(),d=e&&e.getLayoutBox();var e=c,f=a,g=b,k=Za(e,d,f,g)||Ya(0,0,0,0);a=k.width*k.height/(e.width*e.height);var h;h=this.$;var l=0,m=h.length;if(0==a)h=0;else{for(var p=(l+m)/2|0;l<p;)a<h[p]?m=p:l=p,p=(l+m)/2|0;h=m}if(h==this.G)a=null;else{this.G=h;if(g=f=g?null:f)k=W(k,-f.left,-f.top),e=W(e,-f.left,-f.top),g=W(g,-f.left,-f.top);a={time:"undefined"!==typeof performance&&
performance.now?performance.now():Date.now()-ab,rootBounds:g&&eb(g),boundingClientRect:eb(e),intersectionRect:eb(k),intersectionRatio:a}}var q=a;q&&this.U(q)};function eb(a){return{left:a.left,top:a.top,width:a.width,height:a.height,bottom:a.bottom,right:a.right,x:a.left,y:a.top}};function fb(a){this.a=a;this.b=a.element;this.R=a.uiHandler;this.h=this.f=this.iframe=null;this.u=[];this.T=D(this.a.getAmpDoc(),"viewer");this.w=null}n=fb.prototype;
n.init=function(a,b){var c=this;this.iframe=a;this.iframe.setAttribute("scrolling","no");this.a.applyFillContent(this.iframe);this.f=new bb(this.a,this.iframe,!0);this.h=new V(this.iframe,"send-embed-state",!0,function(){return gb(c,c.a.isInViewport())});U(this.iframe,"entity-id").then(function(a){c.b.creativeId=a.data.id});this.u.push(Wa(this.iframe,"embed-size",function(a,b,f){hb(c,a.height,a.width,b,f)},!0,!0));this.u.push(this.T.onVisibilityChanged(function(){gb(c,c.a.isInViewport())}));if(b)return this.b.appendChild(this.iframe),
Promise.resolve();this.a.config&&this.a.config.renderStartImplemented?this.w=U(this.iframe,["render-start","no-content"]).then(function(a){if("render-start"==a.data.type){var b=a.data;c.R.setDisplayState(2);hb(c,b.height,b.width,a.source,a.origin);c.a.lifecycleReporter&&c.a.lifecycleReporter.sendPing("renderCrossDomainStart")}else ib(c)}):(this.w=U(this.iframe,"bootstrap-loaded"),U(this.iframe,"no-content").then(function(){return ib(c)}));O(this.iframe,"visibility","hidden");this.b.appendChild(this.iframe);
return C(this.a.win,"timer").timeoutPromise(1E4,this.w,"timeout waiting for ad response").catch(function(a){ib(c);A().warn("AMP-AD",a)}).then(function(){c.iframe&&O(c.iframe,"visibility","")})};n.freeXOriginIframe=function(a){this.V();if(!a&&this.iframe){var b=this.iframe;b.parentElement&&b.parentElement.removeChild(b);this.iframe=null}};function ib(a){a.iframe&&(a.freeXOriginIframe(0<=a.iframe.name.indexOf("_master")),a.R.setDisplayState(3))}
n.V=function(){this.u.forEach(function(a){return a()});this.u.length=0;this.h&&(this.h.destroy(),this.h=null);this.f&&(this.f.destroy(),this.f=null)};function hb(a,b,c,d,e){var f,g;b=parseInt(b,10);isNaN(b)||(f=Math.max(a.b.offsetHeight+b-a.iframe.offsetHeight,b));c=parseInt(c,10);isNaN(c)||(g=Math.max(a.b.offsetWidth+c-a.iframe.offsetWidth,c));void 0===f&&void 0===g||a.a.attemptChangeSize(f,g).then(function(){jb(a,!0,g,f,d,e)},function(){return jb(a,!1,g,f,d,e)})}
function jb(a,b,c,d,e,f){a.iframe&&Xa(a.iframe,[{win:e,origin:f}],b?"embed-size-changed":"embed-size-denied",{requestedWidth:c,requestedHeight:d},!0)}function gb(a,b){a.h&&a.h.send("embed-state",{inViewport:b,pageHidden:!a.T.isVisible()})}n.viewportCallback=function(a){if(this.f)this.f.onViewportCallback(a);gb(this,a)};n.onLayoutMeasure=function(){this.f&&this.f.fire()};AMP.AmpAdXOriginIframeHandler=fb;var kb={};
function lb(a,b,c){var d=Date.now(),e=b.getAttribute("width"),f=b.getAttribute("height"),g=b.getAttribute("type");A().assert(g,"Attribute type required for <amp-ad>: %s",b);for(var k={},h=0;h<b.attributes.length;h++){var l=b.attributes[h];0==l.name.indexOf("data-")&&(k[oa(l.name.substr(5))]=l.value)}if(h=b.getAttribute("json")){var m;a:{try{m=JSON.parse(h);break a}catch(vb){}m=void 0}if(void 0===m)throw A().createError("Error parsing JSON in json attribute in element %s",b);for(var p in m)k[p]=m[p]}k.width=
Ja(e);k.height=Ja(f);k.type=g;var g=D(b,"documentInfo").get(),q=D(b,"viewer"),w=a.location.href;"about:srcdoc"==w&&(w=a.parent.location.href);e=q.getUnconfirmedReferrerUrl();f=g.canonicalUrl;g=g.pageViewId;p={href:w};m=b.tagName;for(var h={localDev:!1,development:y().development,filter:y().filter,minified:!0,lite:y().lite,test:!1,log:y().log,version:y().version,rtvVersion:y().rtvVersion},l=!(!a.AMP_CONFIG||!a.AMP_CONFIG.canary),q=!q.isVisible(),v=a,x=0,u=v;u&&u!=u.parent;u=u.parent)x++;for(var v=
String(x)+"-"+mb(v),x=b.getIntersectionChangeEntry(),u=b,R=[],G=0;u&&1==u.nodeType&&25>G;){var H="";u.id&&(H="/"+u.id);var rb=u.nodeName.toLowerCase();R.push(""+rb+H+ua(u));G++;u=u.parentElement}u=R.join();R=u.length;G=5381;for(H=0;H<R;H++)G=33*G^u.charCodeAt(H);k._context={referrer:e,canonicalUrl:f,pageViewId:g,location:p,tagName:m,mode:h,canary:l,hidden:q,amp3pSentinel:v,initialIntersection:x,domFingerprint:String(G>>>0),startTime:d};Object.assign(k._context,c);var Ia=b.getAttribute("src");Ia&&
(k.src=Ia);return k}function nb(a,b,c){c=lb(a,b,c);var d=a.document.createElement("iframe");kb[c.type]||(kb[c.type]=0);a=ob(a);var e=J(a).hostname;a=a+"#"+JSON.stringify(c);var f=e+"_"+c.type+"_"+kb[c.type]++;d.src=a;d.name=f;d.ampLocation=J(a);d.width=c.width;d.height=c.height;d.setAttribute("scrolling","no");O(d,"border","none");d.onload=function(){this.readyState="complete"};d.setAttribute("data-amp-3p-sentinel",c._context.amp3pSentinel);return d}
function pb(a,b){a=ob(a);b.preload(a,"document");var c=qa+"/1481021884470/f.js";b.preload(c,"script")}
function ob(a){var b,c=a.bootstrapBaseUrl;if(c)a=c;else{var d;d=b;var e=a.document.querySelector('meta[name="amp-3p-iframe-src"]');if(e){var f=e.getAttribute("content"),g;g=void 0===g?"source":g;A().assert(null!=f,"%s %s must be available",e,g);A().assert(ta(f)||/^(\/\/)/.test(f),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',e,g,f);A().assert(-1==f.indexOf("?"),"3p iframe url must not include query string %s in element %s.",
f,e);g=J(f);A().assert("localhost"==g.hostname&&!d||g.origin!=J(a.location.href).origin,"3p iframe url must not be on the same origin as the current document %s (%s) in element %s. See https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md for details.",f,g.origin,e);d=f+"?1481021884470"}else d=null;a=a.bootstrapBaseUrl=d||"https://d-"+mb(a)+("."+ra+"/1481021884470/frame.html")}return a}
function mb(a){var b;if(a.crypto&&a.crypto.getRandomValues){var c=new Uint32Array(2);a.crypto.getRandomValues(c);b=String(c[0])+c[1]}else b=String(a.Math.random()).substr(2)+"0";return b};function X(a){AMP.BaseElement.call(this,a);this.X=this.Z=this.c=this.uiHandler=this.config=this.C=null;this.N=!1;this.j=this.ba=this.l=null;this.B=void 0;this.m=null;a=this.element.getAttribute("data-amp-slot-index");var b=this.element.getAttribute("type"),c=this.win;xa(c,Pa);if(b="doubleclick"==b||"adsense"==b)b=this.element.getAttribute("data-experiment-id"),b=b!=Ca.control&&b!=Da.control&&b!=Ea.control&&b!=Fa.control?!1:!0;b&&M(c,"a4aProfilingRate")?(c.ampAdPageCorrelator||(D(c.document,"documentInfo").get(),
c.ampAdPageCorrelator=Math.floor(4503599627370496*Math.random())),a=new T(c,this.element,"amp",c.ampAdPageCorrelator,Number(a))):a=new S;this.lifecycleReporter=a;this.lifecycleReporter.sendPing("adSlotBuilt")}r(X,AMP.BaseElement);n=X.prototype;n.getPriority=function(){return 2};
n.renderOutsideViewport=function(){var a;a:{a=this.element;var b=this.win["3pla"]||{},c;for(c in b)if(Object.prototype.hasOwnProperty.call(b,c)){a=!1;break a}a="prefer-viewability-over-views"==a.getAttribute("data-loading-strategy")?1.25:!0}return!0!==a?a:AMP.BaseElement.prototype.renderOutsideViewport.call(this)};n.isLayoutSupported=function(a){return P(a)};
n.buildCallback=function(){this.Z=this.getPlaceholder();this.X=this.getFallback();var a=this.element.getAttribute("type");this.config=ma[a];A().assert(this.config,'Type "'+a+'" is not supported in amp-ad');this.uiHandler=new Q(this);this.uiHandler.init();a=this.win;a.a2alistener||(a.a2alistener=!0,M(a,"alp")&&a.addEventListener("message",Qa.bind(null,a)))};
n.preconnectCallback=function(a){var b=this;pb(this.win,this.preconnect);"string"==typeof this.config.prefetch?this.preconnect.preload(this.config.prefetch,"script"):this.config.prefetch&&this.config.prefetch.forEach(function(a){b.preconnect.preload(a,"script")});"string"==typeof this.config.preconnect?this.preconnect.url(this.config.preconnect,a):this.config.preconnect&&this.config.preconnect.forEach(function(c){b.preconnect.url(c,a)});var c=this.element.getAttribute("src");c&&this.preconnect.url(c)};
n.onLayoutMeasure=function(){var a=this.win,b=!1,c=0,d=this.element;do Ka[d.tagName]?(c++,b=!1):"fixed"==a.getComputedStyle(d).position&&(b=!0),d=d.parentElement;while(d&&"BODY"!=d.tagName);this.N=!(!b&&1>=c);if(void 0===this.B){a:{a=this.element;do if(a=a.parentElement,Ka[a.tagName]){a=a.tagName;break a}while(a&&"BODY"!=a.tagName);a=null}this.B=a}qb(this);if(this.c)this.c.onLayoutMeasure()};
function qb(a){if(a.c&&a.c.iframe){var b=a.getViewport().getLayoutRect(a.c.iframe),c=a.getLayoutBox();a.l=W(b,-c.left,-c.top)}}n.getIntersectionElementLayoutBox=function(){if(!this.c||!this.c.iframe)return AMP.BaseElement.prototype.getIntersectionElementLayoutBox.call(this);var a=this.getLayoutBox();this.l||qb(this);return W(a,this.l.left,this.l.top)};
n.layoutCallback=function(){var a=this;if(this.m)return this.m;this.lifecycleReporter.sendPing("preAdThrottle");A().assert(!this.N,"<amp-ad> is not allowed to be placed in elements with position:fixed: %s",this.element);Na(this.win);return this.m=na(this).then(function(b){a.uiHandler.setDisplayState(1);b={clientId:b||null,container:a.B};a.lifecycleReporter.sendPing("adRequestStart");b=nb(a.element.ownerDocument.defaultView,a.element,b);a.c=new fb(a);return a.c.init(b)})};
n.viewportCallback=function(a){this.c&&this.c.viewportCallback(a)};n.unlayoutCallback=function(){this.m=null;this.uiHandler.setDisplayState(0);this.c&&(this.c.freeXOriginIframe(),this.c=null);this.lifecycleReporter.sendPing("adSlotCleared");return!0};var sb={},Y=null;function tb(a){AMP.BaseElement.call(this,a);this.S=a.getAttribute("data-url");this.g=a.getAttribute("data-slot");this.uiHandler=null}r(tb,AMP.BaseElement);n=tb.prototype;n.getPriority=function(){return 2};n.isLayoutSupported=function(a){return P(a)};
n.buildCallback=function(){var a=this.element.querySelectorAll("template");A().assert(0<a.length,"Missing template in custom ad");A().assert(null===this.g||this.g.match(/^[0-9a-z]+$/),"custom ad slot should be alphanumeric: "+this.g);this.uiHandler=new Q(this);this.uiHandler.init()};
n.layoutCallback=function(){var a=this,b=ub(this);b in sb||(sb[b]=C(this.win,"xhr").fetchJson(b));return sb[b].then(function(b){a.uiHandler.setDisplayState(1);var c=a.element,e=b;null!==a.g&&(e=b.hasOwnProperty(a.g)?b[a.g]:null);a.uiHandler.setDisplayState(null!==e&&"object"==typeof e?2:3);C(a.win,"templates").findAndRenderTemplate(c,e).then(function(b){for(;c.firstChild;)c.removeChild(c.firstChild);c.appendChild(b);return a})})};n.unlayoutCallback=function(){this.uiHandler.setDisplayState(0);return!0};
function ub(a){if(null===a.g)return a.S;if(null===Y){Y={};for(var b={},c=ha(a.element)[0].querySelectorAll("amp-ad[type=custom]"),d=0;d<c.length;d++){var e=c[d],f=e.getAttribute("data-url"),e=e.getAttribute("data-slot");null!==e&&(f in b||(b[f]=[]),b[f].push(encodeURIComponent(e)))}for(var g in b)c=Y,f=g,d=b[g].join(","),(d=encodeURIComponent("ampslots")+"="+encodeURIComponent(d))?(f=f.split("#",2),e=f[0].split("?",2),d=e[0]+(e[1]?"?"+e[1]+"&"+d:"?"+d),d+=f[1]?"#"+f[1]:""):d=f,c[g]=d}return Y[a.S]}
;function Z(a){AMP.BaseElement.apply(this,arguments)}r(Z,AMP.BaseElement);
Z.prototype.upgradeCallback=function(){var a=this,b=this.element.getAttribute("data-consent-notification-id");return(b?ka(this.win).then(function(a){return a.get(b)}):Promise.resolve()).then(function(){var b=a.element.getAttribute("type");if(!b)return null;if("custom"===b&&M(a.win,"ad-type-custom"))return new tb(a.element);window.ampAdSlotIdCounter=window.ampAdSlotIdCounter||0;var d=window.ampAdSlotIdCounter++;a.element.setAttribute("data-amp-slot-index",d);if(!Ga[b]||!Ga[b](a.win,a.element))return new X(a.element);
var e="amp-ad-network-"+b+"-impl";a.element.setAttribute("data-a4a-upgrade-type",e);return C(a.win,"extensions").loadElementClass(e).then(function(b){return new b(a.element)}).catch(function(c){var d=a.element.tagName;A().error(d,"Unable to load ad implementation for type ",b,", falling back to 3p, error: ",c);return new X(a.element)})})};Z.prototype.isLayoutSupported=function(a){return P(a)};Z.prototype.buildCallback=function(){this.element.getAttribute("type")};AMP.registerElement("amp-ad",Z,"amp-ad iframe{border:0!important;margin:0!important;padding:0!important}.amp-ad-default-fallback{background-color:#d3d3d3}\n/*# sourceURL=/extensions/amp-ad/0.1/amp-ad.css*/");
AMP.registerElement("amp-embed",Z,"amp-ad iframe{border:0!important;margin:0!important;padding:0!important}.amp-ad-default-fallback{background-color:#d3d3d3}\n/*# sourceURL=/extensions/amp-ad/0.1/amp-ad.css*/");
})});
//# sourceMappingURL=amp-ad-0.1.js.map

