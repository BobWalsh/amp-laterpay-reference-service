!function(){function n(n){return n&&(n.ownerDocument||n.document||n).documentElement}function t(n){return n&&(n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView)}function e(n,t){return t>n?-1:n>t?1:n>=t?0:NaN}function r(n){return null===n?NaN:+n}function i(n){return!isNaN(n)}function u(n){return{left:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)<0?r=u+1:i=u}return r},right:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)>0?i=u:r=u+1}return r}}}function o(n){return n.length}function a(n){for(var t=1;n*t%1;)t*=10;return t}function l(n,t){for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}function c(){this._=Object.create(null)}function f(n){return(n+="")===bo||n[0]===_o?_o+n:n}function s(n){return(n+="")[0]===_o?n.slice(1):n}function h(n){return f(n)in this._}function p(n){return(n=f(n))in this._&&delete this._[n]}function g(){var n=[];for(var t in this._)n.push(s(t));return n}function v(){var n=0;for(var t in this._)++n;return n}function d(){for(var n in this._)return!1;return!0}function y(){this._=Object.create(null)}function m(n){return n}function M(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function x(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e=0,r=wo.length;r>e;++e){var i=wo[e]+t;if(i in n)return i}}function b(){}function _(){}function w(n){function t(){for(var t,r=e,i=-1,u=r.length;++i<u;)(t=r[i].on)&&t.apply(this,arguments);return n}var e=[],r=new c;return t.on=function(t,i){var u,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,u=e.indexOf(o)).concat(e.slice(u+1)),r.remove(t)),i&&e.push(r.set(t,{on:i})),n)},t}function S(){ao.event.preventDefault()}function k(){for(var n,t=ao.event;n=t.sourceEvent;)t=n;return t}function N(n){for(var t=new _,e=0,r=arguments.length;++e<r;)t[arguments[e]]=w(t);return t.of=function(e,r){return function(i){try{var u=i.sourceEvent=ao.event;i.target=n,ao.event=i,t[i.type].apply(e,r)}finally{ao.event=u}}},t}function E(n){return ko(n,Co),n}function A(n){return"function"==typeof n?n:function(){return No(n,this)}}function C(n){return"function"==typeof n?n:function(){return Eo(n,this)}}function z(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function i(){this.setAttribute(n,t)}function u(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ao.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?u:i}function L(n){return n.trim().replace(/\s+/g," ")}function q(n){return new RegExp("(?:^|\\s+)"+ao.requote(n)+"(?:\\s+|$)","g")}function T(n){return(n+"").trim().split(/^|\s+/)}function R(n,t){function e(){for(var e=-1;++e<i;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<i;)n[e](this,r)}n=T(n).map(D);var i=n.length;return"function"==typeof t?r:e}function D(n){var t=q(n);return function(e,r){if(i=e.classList)return r?i.add(n):i.remove(n);var i=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(i)||e.setAttribute("class",L(i+" "+n))):e.setAttribute("class",L(i.replace(t," ")))}}function P(n,t,e){function r(){this.style.removeProperty(n)}function i(){this.style.setProperty(n,t,e)}function u(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?u:i}function U(n,t){function e(){delete this[n]}function r(){this[n]=t}function i(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?i:r}function j(n){function t(){var t=this.ownerDocument,e=this.namespaceURI;return e===zo&&t.documentElement.namespaceURI===zo?t.createElement(n):t.createElementNS(e,n)}function e(){return this.ownerDocument.createElementNS(n.space,n.local)}return"function"==typeof n?n:(n=ao.ns.qualify(n)).local?e:t}function F(){var n=this.parentNode;n&&n.removeChild(this)}function H(n){return{__data__:n}}function O(n){return function(){return Ao(this,n)}}function I(n){return arguments.length||(n=e),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function Y(n,t){for(var e=0,r=n.length;r>e;e++)for(var i,u=n[e],o=0,a=u.length;a>o;o++)(i=u[o])&&t(i,o,e);return n}function Z(n){return ko(n,qo),n}function V(n){var t,e;return function(r,i,u){var o,a=n[u].update,l=a.length;for(u!=e&&(e=u,t=0),i>=t&&(t=i+1);!(o=a[t])&&++t<l;);return o}}function X(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function i(){var i=l(t,co(arguments));r.call(this),this.addEventListener(n,this[o]=i,i.$=e),i._=t}function u(){var t,e=new RegExp("^__on([^.]+)"+ao.requote(n)+"$");for(var r in this)if(t=r.match(e)){var i=this[r];this.removeEventListener(t[1],i,i.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),l=$;a>0&&(n=n.slice(0,a));var c=To.get(n);return c&&(n=c,l=B),a?t?i:r:t?b:u}function $(n,t){return function(e){var r=ao.event;ao.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ao.event=r}}}function B(n,t){var e=$(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function W(e){var r=".dragsuppress-"+ ++Do,i="click"+r,u=ao.select(t(e)).on("touchmove"+r,S).on("dragstart"+r,S).on("selectstart"+r,S);if(null==Ro&&(Ro="onselectstart"in e?!1:x(e.style,"userSelect")),Ro){var o=n(e).style,a=o[Ro];o[Ro]="none"}return function(n){if(u.on(r,null),Ro&&(o[Ro]=a),n){var t=function(){u.on(i,null)};u.on(i,function(){S(),t()},!0),setTimeout(t,0)}}}function J(n,e){e.changedTouches&&(e=e.changedTouches[0]);var r=n.ownerSVGElement||n;if(r.createSVGPoint){var i=r.createSVGPoint();if(0>Po){var u=t(n);if(u.scrollX||u.scrollY){r=ao.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var o=r[0][0].getScreenCTM();Po=!(o.f||o.e),r.remove()}}return Po?(i.x=e.pageX,i.y=e.pageY):(i.x=e.clientX,i.y=e.clientY),i=i.matrixTransform(n.getScreenCTM().inverse()),[i.x,i.y]}var a=n.getBoundingClientRect();return[e.clientX-a.left-n.clientLeft,e.clientY-a.top-n.clientTop]}function G(){return ao.event.changedTouches[0].identifier}function K(n){return n>0?1:0>n?-1:0}function Q(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0])}function nn(n){return n>1?0:-1>n?Fo:Math.acos(n)}function tn(n){return n>1?Io:-1>n?-Io:Math.asin(n)}function en(n){return((n=Math.exp(n))-1/n)/2}function rn(n){return((n=Math.exp(n))+1/n)/2}function un(n){return((n=Math.exp(2*n))-1)/(n+1)}function on(n){return(n=Math.sin(n/2))*n}function an(){}function ln(n,t,e){return this instanceof ln?(this.h=+n,this.s=+t,void(this.l=+e)):arguments.length<2?n instanceof ln?new ln(n.h,n.s,n.l):_n(""+n,wn,ln):new ln(n,t,e)}function cn(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?u+(o-u)*n/60:180>n?o:240>n?u+(o-u)*(240-n)/60:u}function i(n){return Math.round(255*r(n))}var u,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,u=2*e-o,new mn(i(n+120),i(n),i(n-120))}function fn(n,t,e){return this instanceof fn?(this.h=+n,this.c=+t,void(this.l=+e)):arguments.length<2?n instanceof fn?new fn(n.h,n.c,n.l):n instanceof hn?gn(n.l,n.a,n.b):gn((n=Sn((n=ao.rgb(n)).r,n.g,n.b)).l,n.a,n.b):new fn(n,t,e)}function sn(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),new hn(e,Math.cos(n*=Yo)*t,Math.sin(n)*t)}function hn(n,t,e){return this instanceof hn?(this.l=+n,this.a=+t,void(this.b=+e)):arguments.length<2?n instanceof hn?new hn(n.l,n.a,n.b):n instanceof fn?sn(n.h,n.c,n.l):Sn((n=mn(n)).r,n.g,n.b):new hn(n,t,e)}function pn(n,t,e){var r=(n+16)/116,i=r+t/500,u=r-e/200;return i=vn(i)*na,r=vn(r)*ta,u=vn(u)*ea,new mn(yn(3.2404542*i-1.5371385*r-.4985314*u),yn(-.969266*i+1.8760108*r+.041556*u),yn(.0556434*i-.2040259*r+1.0572252*u))}function gn(n,t,e){return n>0?new fn(Math.atan2(e,t)*Zo,Math.sqrt(t*t+e*e),n):new fn(NaN,NaN,n)}function vn(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function dn(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function yn(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function mn(n,t,e){return this instanceof mn?(this.r=~~n,this.g=~~t,void(this.b=~~e)):arguments.length<2?n instanceof mn?new mn(n.r,n.g,n.b):_n(""+n,mn,cn):new mn(n,t,e)}function Mn(n){return new mn(n>>16,n>>8&255,255&n)}function xn(n){return Mn(n)+""}function bn(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function _n(n,t,e){var r,i,u,o=0,a=0,l=0;if(r=/([a-z]+)\((.*)\)/.exec(n=n.toLowerCase()))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return t(Nn(i[0]),Nn(i[1]),Nn(i[2]))}return(u=ua.get(n))?t(u.r,u.g,u.b):(null==n||"#"!==n.charAt(0)||isNaN(u=parseInt(n.slice(1),16))||(4===n.length?(o=(3840&u)>>4,o=o>>4|o,a=240&u,a=a>>4|a,l=15&u,l=l<<4|l):7===n.length&&(o=(16711680&u)>>16,a=(65280&u)>>8,l=255&u)),t(o,a,l))}function wn(n,t,e){var r,i,u=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-u,l=(o+u)/2;return a?(i=.5>l?a/(o+u):a/(2-o-u),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=NaN,i=l>0&&1>l?0:r),new ln(r,i,l)}function Sn(n,t,e){n=kn(n),t=kn(t),e=kn(e);var r=dn((.4124564*n+.3575761*t+.1804375*e)/na),i=dn((.2126729*n+.7151522*t+.072175*e)/ta),u=dn((.0193339*n+.119192*t+.9503041*e)/ea);return hn(116*i-16,500*(r-i),200*(i-u))}function kn(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function Nn(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function En(n){return"function"==typeof n?n:function(){return n}}function An(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),Cn(t,e,n,r)}}function Cn(n,t,e,r){function i(){var n,t=l.status;if(!t&&Ln(l)||t>=200&&300>t||304===t){try{n=e.call(u,l)}catch(r){return void o.error.call(u,r)}o.load.call(u,n)}else o.error.call(u,l)}var u={},o=ao.dispatch("beforesend","progress","load","error"),a={},l=new XMLHttpRequest,c=null;return!this.XDomainRequest||"withCredentials"in l||!/^(http(s)?:)?\/\//.test(n)||(l=new XDomainRequest),"onload"in l?l.onload=l.onerror=i:l.onreadystatechange=function(){l.readyState>3&&i()},l.onprogress=function(n){var t=ao.event;ao.event=n;try{o.progress.call(u,l)}finally{ao.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.responseType=function(n){return arguments.length?(c=n,u):c},u.response=function(n){return e=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(co(arguments)))}}),u.send=function(e,r,i){if(2===arguments.length&&"function"==typeof r&&(i=r,r=null),l.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),l.setRequestHeader)for(var f in a)l.setRequestHeader(f,a[f]);return null!=t&&l.overrideMimeType&&l.overrideMimeType(t),null!=c&&(l.responseType=c),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),o.beforesend.call(u,l),l.send(null==r?null:r),u},u.abort=function(){return l.abort(),u},ao.rebind(u,o,"on"),null==r?u:u.get(zn(r))}function zn(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Ln(n){var t=n.responseType;return t&&"text"!==t?n.response:n.responseText}function qn(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var i=e+t,u={c:n,t:i,n:null};return aa?aa.n=u:oa=u,aa=u,la||(ca=clearTimeout(ca),la=1,fa(Tn)),u}function Tn(){var n=Rn(),t=Dn()-n;t>24?(isFinite(t)&&(clearTimeout(ca),ca=setTimeout(Tn,t)),la=0):(la=1,fa(Tn))}function Rn(){for(var n=Date.now(),t=oa;t;)n>=t.t&&t.c(n-t.t)&&(t.c=null),t=t.n;return n}function Dn(){for(var n,t=oa,e=1/0;t;)t.c?(t.t<e&&(e=t.t),t=(n=t).n):t=n?n.n=t.n:oa=t.n;return aa=n,e}function Pn(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Un(n,t){var e=Math.pow(10,3*xo(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function jn(n){var t=n.decimal,e=n.thousands,r=n.grouping,i=n.currency,u=r&&e?function(n,t){for(var i=n.length,u=[],o=0,a=r[0],l=0;i>0&&a>0&&(l+a+1>t&&(a=Math.max(1,t-l)),u.push(n.substring(i-=a,i+a)),!((l+=a+1)>t));)a=r[o=(o+1)%r.length];return u.reverse().join(e)}:m;return function(n){var e=ha.exec(n),r=e[1]||" ",o=e[2]||">",a=e[3]||"-",l=e[4]||"",c=e[5],f=+e[6],s=e[7],h=e[8],p=e[9],g=1,v="",d="",y=!1,m=!0;switch(h&&(h=+h.substring(1)),(c||"0"===r&&"="===o)&&(c=r="0",o="="),p){case"n":s=!0,p="g";break;case"%":g=100,d="%",p="f";break;case"p":g=100,d="%",p="r";break;case"b":case"o":case"x":case"X":"#"===l&&(v="0"+p.toLowerCase());case"c":m=!1;case"d":y=!0,h=0;break;case"s":g=-1,p="r"}"$"===l&&(v=i[0],d=i[1]),"r"!=p||h||(p="g"),null!=h&&("g"==p?h=Math.max(1,Math.min(21,h)):"e"!=p&&"f"!=p||(h=Math.max(0,Math.min(20,h)))),p=pa.get(p)||Fn;var M=c&&s;return function(n){var e=d;if(y&&n%1)return"";var i=0>n||0===n&&0>1/n?(n=-n,"-"):"-"===a?"":a;if(0>g){var l=ao.formatPrefix(n,h);n=l.scale(n),e=l.symbol+d}else n*=g;n=p(n,h);var x,b,_=n.lastIndexOf(".");if(0>_){var w=m?n.lastIndexOf("e"):-1;0>w?(x=n,b=""):(x=n.substring(0,w),b=n.substring(w))}else x=n.substring(0,_),b=t+n.substring(_+1);!c&&s&&(x=u(x,1/0));var S=v.length+x.length+b.length+(M?0:i.length),k=f>S?new Array(S=f-S+1).join(r):"";return M&&(x=u(k+x,k.length?f-b.length:1/0)),i+=v,n=x+b,("<"===o?i+n+k:">"===o?k+i+n:"^"===o?k.substring(0,S>>=1)+i+n+k.substring(S):i+(M?n:k+n))+e}}}function Fn(n){return n+""}function Hn(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function On(n,t,e){function r(t){var e=n(t),r=u(e,1);return r-t>t-e?e:r}function i(e){return t(e=n(new va(e-1)),1),e}function u(n,e){return t(n=new va(+n),e),n}function o(n,r,u){var o=i(n),a=[];if(u>1)for(;r>o;)e(o)%u||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{va=Hn;var r=new Hn;return r._=n,o(r,t,e)}finally{va=Date}}n.floor=n,n.round=r,n.ceil=i,n.offset=u,n.range=o;var l=n.utc=In(n);return l.floor=l,l.round=In(r),l.ceil=In(i),l.offset=In(u),l.range=a,n}function In(n){return function(t,e){try{va=Hn;var r=new Hn;return r._=t,n(r,e)._}finally{va=Date}}}function Yn(n){function t(n){function t(t){for(var e,i,u,o=[],a=-1,l=0;++a<r;)37===n.charCodeAt(a)&&(o.push(n.slice(l,a)),null!=(i=ya[e=n.charAt(++a)])&&(e=n.charAt(++a)),(u=A[e])&&(e=u(t,null==i?"e"===e?" ":"0":i)),o.push(e),l=a+1);return o.push(n.slice(l,a)),o.join("")}var r=n.length;return t.parse=function(t){var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},i=e(r,n,t,0);if(i!=t.length)return null;"p"in r&&(r.H=r.H%12+12*r.p);var u=null!=r.Z&&va!==Hn,o=new(u?Hn:va);return"j"in r?o.setFullYear(r.y,0,r.j):"W"in r||"U"in r?("w"in r||(r.w="W"in r?1:0),o.setFullYear(r.y,0,1),o.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(o.getDay()+5)%7:r.w+7*r.U-(o.getDay()+6)%7)):o.setFullYear(r.y,r.m,r.d),o.setHours(r.H+(r.Z/100|0),r.M+r.Z%100,r.S,r.L),u?o._:o},t.toString=function(){return n},t}function e(n,t,e,r){for(var i,u,o,a=0,l=t.length,c=e.length;l>a;){if(r>=c)return-1;if(i=t.charCodeAt(a++),37===i){if(o=t.charAt(a++),u=C[o in ya?t.charAt(a++):o],!u||(r=u(n,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function r(n,t,e){_.lastIndex=0;var r=_.exec(t.slice(e));return r?(n.w=w.get(r[0].toLowerCase()),e+r[0].length):-1}function i(n,t,e){x.lastIndex=0;var r=x.exec(t.slice(e));return r?(n.w=b.get(r[0].toLowerCase()),e+r[0].length):-1}function u(n,t,e){N.lastIndex=0;var r=N.exec(t.slice(e));return r?(n.m=E.get(r[0].toLowerCase()),e+r[0].length):-1}function o(n,t,e){S.lastIndex=0;var r=S.exec(t.slice(e));return r?(n.m=k.get(r[0].toLowerCase()),e+r[0].length):-1}function a(n,t,r){return e(n,A.c.toString(),t,r)}function l(n,t,r){return e(n,A.x.toString(),t,r)}function c(n,t,r){return e(n,A.X.toString(),t,r)}function f(n,t,e){var r=M.get(t.slice(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}var s=n.dateTime,h=n.date,p=n.time,g=n.periods,v=n.days,d=n.shortDays,y=n.months,m=n.shortMonths;t.utc=function(n){function e(n){try{va=Hn;var t=new va;return t._=n,r(t)}finally{va=Date}}var r=t(n);return e.parse=function(n){try{va=Hn;var t=r.parse(n);return t&&t._}finally{va=Date}},e.toString=r.toString,e},t.multi=t.utc.multi=ct;var M=ao.map(),x=Vn(v),b=Xn(v),_=Vn(d),w=Xn(d),S=Vn(y),k=Xn(y),N=Vn(m),E=Xn(m);g.forEach(function(n,t){M.set(n.toLowerCase(),t)});var A={a:function(n){return d[n.getDay()]},A:function(n){return v[n.getDay()]},b:function(n){return m[n.getMonth()]},B:function(n){return y[n.getMonth()]},c:t(s),d:function(n,t){return Zn(n.getDate(),t,2)},e:function(n,t){return Zn(n.getDate(),t,2)},H:function(n,t){return Zn(n.getHours(),t,2)},I:function(n,t){return Zn(n.getHours()%12||12,t,2)},j:function(n,t){return Zn(1+ga.dayOfYear(n),t,3)},L:function(n,t){return Zn(n.getMilliseconds(),t,3)},m:function(n,t){return Zn(n.getMonth()+1,t,2)},M:function(n,t){return Zn(n.getMinutes(),t,2)},p:function(n){return g[+(n.getHours()>=12)]},S:function(n,t){return Zn(n.getSeconds(),t,2)},U:function(n,t){return Zn(ga.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Zn(ga.mondayOfYear(n),t,2)},x:t(h),X:t(p),y:function(n,t){return Zn(n.getFullYear()%100,t,2)},Y:function(n,t){return Zn(n.getFullYear()%1e4,t,4)},Z:at,"%":function(){return"%"}},C={a:r,A:i,b:u,B:o,c:a,d:tt,e:tt,H:rt,I:rt,j:et,L:ot,m:nt,M:it,p:f,S:ut,U:Bn,w:$n,W:Wn,x:l,X:c,y:Gn,Y:Jn,Z:Kn,"%":lt};return t}function Zn(n,t,e){var r=0>n?"-":"",i=(r?-n:n)+"",u=i.length;return r+(e>u?new Array(e-u+1).join(t)+i:i)}function Vn(n){return new RegExp("^(?:"+n.map(ao.requote).join("|")+")","i")}function Xn(n){for(var t=new c,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function $n(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Bn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.U=+r[0],e+r[0].length):-1}function Wn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.W=+r[0],e+r[0].length):-1}function Jn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Gn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.y=Qn(+r[0]),e+r[0].length):-1}function Kn(n,t,e){return/^[+-]\d{4}$/.test(t=t.slice(e,e+5))?(n.Z=-t,e+5):-1}function Qn(n){return n+(n>68?1900:2e3)}function nt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function tt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function et(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function rt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function it(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function ut(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function ot(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function at(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=xo(t)/60|0,i=xo(t)%60;return e+Zn(r,"0",2)+Zn(i,"0",2)}function lt(n,t,e){Ma.lastIndex=0;var r=Ma.exec(t.slice(e,e+1));return r?e+r[0].length:-1}function ct(n){for(var t=n.length,e=-1;++e<t;)n[e][0]=this(n[e][0]);return function(t){for(var e=0,r=n[e];!r[1](t);)r=n[++e];return r[0](t)}}function ft(){}function st(n,t,e){var r=e.s=n+t,i=r-n,u=r-i;e.t=n-u+(t-i)}function ht(n,t){n&&wa.hasOwnProperty(n.type)&&wa[n.type](n,t)}function pt(n,t,e){var r,i=-1,u=n.length-e;for(t.lineStart();++i<u;)r=n[i],t.point(r[0],r[1],r[2]);t.lineEnd()}function gt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)pt(n[e],t,1);t.polygonEnd()}function vt(){function n(n,t){n*=Yo,t=t*Yo/2+Fo/4;var e=n-r,o=e>=0?1:-1,a=o*e,l=Math.cos(t),c=Math.sin(t),f=u*c,s=i*l+f*Math.cos(a),h=f*o*Math.sin(a);ka.add(Math.atan2(h,s)),r=n,i=l,u=c}var t,e,r,i,u;Na.point=function(o,a){Na.point=n,r=(t=o)*Yo,i=Math.cos(a=(e=a)*Yo/2+Fo/4),u=Math.sin(a)},Na.lineEnd=function(){n(t,e)}}function dt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function yt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function mt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Mt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function xt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function bt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function _t(n){return[Math.atan2(n[1],n[0]),tn(n[2])]}function wt(n,t){return xo(n[0]-t[0])<Uo&&xo(n[1]-t[1])<Uo}function St(n,t){n*=Yo;var e=Math.cos(t*=Yo);kt(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function kt(n,t,e){++Ea,Ca+=(n-Ca)/Ea,za+=(t-za)/Ea,La+=(e-La)/Ea}function Nt(){function n(n,i){n*=Yo;var u=Math.cos(i*=Yo),o=u*Math.cos(n),a=u*Math.sin(n),l=Math.sin(i),c=Math.atan2(Math.sqrt((c=e*l-r*a)*c+(c=r*o-t*l)*c+(c=t*a-e*o)*c),t*o+e*a+r*l);Aa+=c,qa+=c*(t+(t=o)),Ta+=c*(e+(e=a)),Ra+=c*(r+(r=l)),kt(t,e,r)}var t,e,r;ja.point=function(i,u){i*=Yo;var o=Math.cos(u*=Yo);t=o*Math.cos(i),e=o*Math.sin(i),r=Math.sin(u),ja.point=n,kt(t,e,r)}}function Et(){ja.point=St}function At(){function n(n,t){n*=Yo;var e=Math.cos(t*=Yo),o=e*Math.cos(n),a=e*Math.sin(n),l=Math.sin(t),c=i*l-u*a,f=u*o-r*l,s=r*a-i*o,h=Math.sqrt(c*c+f*f+s*s),p=r*o+i*a+u*l,g=h&&-nn(p)/h,v=Math.atan2(h,p);Da+=g*c,Pa+=g*f,Ua+=g*s,Aa+=v,qa+=v*(r+(r=o)),Ta+=v*(i+(i=a)),Ra+=v*(u+(u=l)),kt(r,i,u)}var t,e,r,i,u;ja.point=function(o,a){t=o,e=a,ja.point=n,o*=Yo;var l=Math.cos(a*=Yo);r=l*Math.cos(o),i=l*Math.sin(o),u=Math.sin(a),kt(r,i,u)},ja.lineEnd=function(){n(t,e),ja.lineEnd=Et,ja.point=St}}function Ct(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function zt(){return!0}function Lt(n,t,e,r,i){var u=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(wt(e,r)){i.lineStart();for(var a=0;t>a;++a)i.point((e=n[a])[0],e[1]);return void i.lineEnd()}var l=new Tt(e,n,null,!0),c=new Tt(e,null,l,!1);l.o=c,u.push(l),o.push(c),l=new Tt(r,n,null,!1),c=new Tt(r,null,l,!0),l.o=c,u.push(l),o.push(c)}}),o.sort(t),qt(u),qt(o),u.length){for(var a=0,l=e,c=o.length;c>a;++a)o[a].e=l=!l;for(var f,s,h=u[0];;){for(var p=h,g=!0;p.v;)if((p=p.n)===h)return;f=p.z,i.lineStart();do{if(p.v=p.o.v=!0,p.e){if(g)for(var a=0,c=f.length;c>a;++a)i.point((s=f[a])[0],s[1]);else r(p.x,p.n.x,1,i);p=p.n}else{if(g){f=p.p.z;for(var a=f.length-1;a>=0;--a)i.point((s=f[a])[0],s[1])}else r(p.x,p.p.x,-1,i);p=p.p}p=p.o,f=p.z,g=!g}while(!p.v);i.lineEnd()}}}function qt(n){if(t=n.length){for(var t,e,r=0,i=n[0];++r<t;)i.n=e=n[r],e.p=i,i=e;i.n=e=n[0],e.p=i}}function Tt(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Rt(n,t,e,r){return function(i,u){function o(t,e){var r=i(t,e);n(t=r[0],e=r[1])&&u.point(t,e)}function a(n,t){var e=i(n,t);d.point(e[0],e[1])}function l(){m.point=a,d.lineStart()}function c(){m.point=o,d.lineEnd()}function f(n,t){v.push([n,t]);var e=i(n,t);x.point(e[0],e[1])}function s(){x.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),x.lineEnd();var n,t=x.clean(),e=M.buffer(),r=e.length;if(v.pop(),g.push(v),v=null,r)if(1&t){n=e[0];var i,r=n.length-1,o=-1;if(r>0){for(b||(u.polygonStart(),b=!0),u.lineStart();++o<r;)u.point((i=n[o])[0],i[1]);u.lineEnd()}}else r>1&&2&t&&e.push(e.pop().concat(e.shift())),p.push(e.filter(Dt))}var p,g,v,d=t(u),y=i.invert(r[0],r[1]),m={point:o,lineStart:l,lineEnd:c,polygonStart:function(){m.point=f,m.lineStart=s,m.lineEnd=h,p=[],g=[]},polygonEnd:function(){m.point=o,m.lineStart=l,m.lineEnd=c,p=ao.merge(p);var n=Ot(y,g);p.length?(b||(u.polygonStart(),b=!0),Lt(p,Ut,n,e,u)):n&&(b||(u.polygonStart(),b=!0),u.lineStart(),e(null,null,1,u),u.lineEnd()),b&&(u.polygonEnd(),b=!1),p=g=null},sphere:function(){u.polygonStart(),u.lineStart(),e(null,null,1,u),u.lineEnd(),u.polygonEnd()}},M=Pt(),x=t(M),b=!1;return m}}function Dt(n){return n.length>1}function Pt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:b,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Ut(n,t){return((n=n.x)[0]<0?n[1]-Io-Uo:Io-n[1])-((t=t.x)[0]<0?t[1]-Io-Uo:Io-t[1])}function jt(n){var t,e=NaN,r=NaN,i=NaN;return{lineStart:function(){n.lineStart(),t=1},point:function(u,o){var a=u>0?Fo:-Fo,l=xo(u-e);xo(l-Fo)<Uo?(n.point(e,r=(r+o)/2>0?Io:-Io),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(u,r),t=0):i!==a&&l>=Fo&&(xo(e-i)<Uo&&(e-=i*Uo),xo(u-a)<Uo&&(u-=a*Uo),r=Ft(e,r,u,o),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=u,r=o),i=a},lineEnd:function(){n.lineEnd(),e=r=NaN},clean:function(){return 2-t}}}function Ft(n,t,e,r){var i,u,o=Math.sin(n-e);return xo(o)>Uo?Math.atan((Math.sin(t)*(u=Math.cos(r))*Math.sin(e)-Math.sin(r)*(i=Math.cos(t))*Math.sin(n))/(i*u*o)):(t+r)/2}function Ht(n,t,e,r){var i;if(null==n)i=e*Io,r.point(-Fo,i),r.point(0,i),r.point(Fo,i),r.point(Fo,0),r.point(Fo,-i),r.point(0,-i),r.point(-Fo,-i),r.point(-Fo,0),r.point(-Fo,i);else if(xo(n[0]-t[0])>Uo){var u=n[0]<t[0]?Fo:-Fo;i=e*u/2,r.point(-u,i),r.point(0,i),r.point(u,i)}else r.point(t[0],t[1])}function Ot(n,t){var e=n[0],r=n[1],i=[Math.sin(e),-Math.cos(e),0],u=0,o=0;ka.reset();for(var a=0,l=t.length;l>a;++a){var c=t[a],f=c.length;if(f)for(var s=c[0],h=s[0],p=s[1]/2+Fo/4,g=Math.sin(p),v=Math.cos(p),d=1;;){d===f&&(d=0),n=c[d];var y=n[0],m=n[1]/2+Fo/4,M=Math.sin(m),x=Math.cos(m),b=y-h,_=b>=0?1:-1,w=_*b,S=w>Fo,k=g*M;if(ka.add(Math.atan2(k*_*Math.sin(w),v*x+k*Math.cos(w))),u+=S?b+_*Ho:b,S^h>=e^y>=e){var N=mt(dt(s),dt(n));bt(N);var E=mt(i,N);bt(E);var A=(S^b>=0?-1:1)*tn(E[2]);(r>A||r===A&&(N[0]||N[1]))&&(o+=S^b>=0?1:-1)}if(!d++)break;h=y,g=M,v=x,s=n}}return(-Uo>u||Uo>u&&-Uo>ka)^1&o}function It(n){function t(n,t){return Math.cos(n)*Math.cos(t)>u}function e(n){var e,u,l,c,f;return{lineStart:function(){c=l=!1,f=1},point:function(s,h){var p,g=[s,h],v=t(s,h),d=o?v?0:i(s,h):v?i(s+(0>s?Fo:-Fo),h):0;if(!e&&(c=l=v)&&n.lineStart(),v!==l&&(p=r(e,g),(wt(e,p)||wt(g,p))&&(g[0]+=Uo,g[1]+=Uo,v=t(g[0],g[1]))),v!==l)f=0,v?(n.lineStart(),p=r(g,e),n.point(p[0],p[1])):(p=r(e,g),n.point(p[0],p[1]),n.lineEnd()),e=p;else if(a&&e&&o^v){var y;d&u||!(y=r(g,e,!0))||(f=0,o?(n.lineStart(),n.point(y[0][0],y[0][1]),n.point(y[1][0],y[1][1]),n.lineEnd()):(n.point(y[1][0],y[1][1]),n.lineEnd(),n.lineStart(),n.point(y[0][0],y[0][1])))}!v||e&&wt(e,g)||n.point(g[0],g[1]),e=g,l=v,u=d},lineEnd:function(){l&&n.lineEnd(),e=null},clean:function(){return f|(c&&l)<<1}}}function r(n,t,e){var r=dt(n),i=dt(t),o=[1,0,0],a=mt(r,i),l=yt(a,a),c=a[0],f=l-c*c;if(!f)return!e&&n;var s=u*l/f,h=-u*c/f,p=mt(o,a),g=xt(o,s),v=xt(a,h);Mt(g,v);var d=p,y=yt(g,d),m=yt(d,d),M=y*y-m*(yt(g,g)-1);if(!(0>M)){var x=Math.sqrt(M),b=xt(d,(-y-x)/m);if(Mt(b,g),b=_t(b),!e)return b;var _,w=n[0],S=t[0],k=n[1],N=t[1];w>S&&(_=w,w=S,S=_);var E=S-w,A=xo(E-Fo)<Uo,C=A||Uo>E;if(!A&&k>N&&(_=k,k=N,N=_),C?A?k+N>0^b[1]<(xo(b[0]-w)<Uo?k:N):k<=b[1]&&b[1]<=N:E>Fo^(w<=b[0]&&b[0]<=S)){var z=xt(d,(-y+x)/m);return Mt(z,g),[b,_t(z)]}}}function i(t,e){var r=o?n:Fo-n,i=0;return-r>t?i|=1:t>r&&(i|=2),-r>e?i|=4:e>r&&(i|=8),i}var u=Math.cos(n),o=u>0,a=xo(u)>Uo,l=ve(n,6*Yo);return Rt(t,e,l,o?[0,-n]:[-Fo,n-Fo])}function Yt(n,t,e,r){return function(i){var u,o=i.a,a=i.b,l=o.x,c=o.y,f=a.x,s=a.y,h=0,p=1,g=f-l,v=s-c;if(u=n-l,g||!(u>0)){if(u/=g,0>g){if(h>u)return;p>u&&(p=u)}else if(g>0){if(u>p)return;u>h&&(h=u)}if(u=e-l,g||!(0>u)){if(u/=g,0>g){if(u>p)return;u>h&&(h=u)}else if(g>0){if(h>u)return;p>u&&(p=u)}if(u=t-c,v||!(u>0)){if(u/=v,0>v){if(h>u)return;p>u&&(p=u)}else if(v>0){if(u>p)return;u>h&&(h=u)}if(u=r-c,v||!(0>u)){if(u/=v,0>v){if(u>p)return;u>h&&(h=u)}else if(v>0){if(h>u)return;p>u&&(p=u)}return h>0&&(i.a={x:l+h*g,y:c+h*v}),1>p&&(i.b={x:l+p*g,y:c+p*v}),i}}}}}}function Zt(n,t,e,r){function i(r,i){return xo(r[0]-n)<Uo?i>0?0:3:xo(r[0]-e)<Uo?i>0?2:1:xo(r[1]-t)<Uo?i>0?1:0:i>0?3:2}function u(n,t){return o(n.x,t.x)}function o(n,t){var e=i(n,1),r=i(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function l(n){for(var t=0,e=d.length,r=n[1],i=0;e>i;++i)for(var u,o=1,a=d[i],l=a.length,c=a[0];l>o;++o)u=a[o],c[1]<=r?u[1]>r&&Q(c,u,n)>0&&++t:u[1]<=r&&Q(c,u,n)<0&&--t,c=u;return 0!==t}function c(u,a,l,c){var f=0,s=0;if(null==u||(f=i(u,l))!==(s=i(a,l))||o(u,a)<0^l>0){do c.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+l+4)%4)!==s)}else c.point(a[0],a[1])}function f(i,u){return i>=n&&e>=i&&u>=t&&r>=u}function s(n,t){f(n,t)&&a.point(n,t)}function h(){C.point=g,d&&d.push(y=[]),S=!0,w=!1,b=_=NaN}function p(){v&&(g(m,M),x&&w&&E.rejoin(),v.push(E.buffer())),C.point=s,w&&a.lineEnd()}function g(n,t){n=Math.max(-Ha,Math.min(Ha,n)),t=Math.max(-Ha,Math.min(Ha,t));var e=f(n,t);if(d&&y.push([n,t]),S)m=n,M=t,x=e,S=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&w)a.point(n,t);else{var r={a:{x:b,y:_},b:{x:n,y:t}};A(r)?(w||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),k=!1):e&&(a.lineStart(),a.point(n,t),k=!1)}b=n,_=t,w=e}var v,d,y,m,M,x,b,_,w,S,k,N=a,E=Pt(),A=Yt(n,t,e,r),C={point:s,lineStart:h,lineEnd:p,polygonStart:function(){a=E,v=[],d=[],k=!0},polygonEnd:function(){a=N,v=ao.merge(v);var t=l([n,r]),e=k&&t,i=v.length;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),c(null,null,1,a),a.lineEnd()),i&&Lt(v,u,t,c,a),a.polygonEnd()),v=d=y=null}};return C}}function Vt(n){var t=0,e=Fo/3,r=ae(n),i=r(t,e);return i.parallels=function(n){return arguments.length?r(t=n[0]*Fo/180,e=n[1]*Fo/180):[t/Fo*180,e/Fo*180]},i}function Xt(n,t){function e(n,t){var e=Math.sqrt(u-2*i*Math.sin(t))/i;return[e*Math.sin(n*=i),o-e*Math.cos(n)]}var r=Math.sin(n),i=(r+Math.sin(t))/2,u=1+r*(2*i-r),o=Math.sqrt(u)/i;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/i,tn((u-(n*n+e*e)*i*i)/(2*i))]},e}function $t(){function n(n,t){Ia+=i*n-r*t,r=n,i=t}var t,e,r,i;$a.point=function(u,o){$a.point=n,t=r=u,e=i=o},$a.lineEnd=function(){n(t,e)}}function Bt(n,t){Ya>n&&(Ya=n),n>Va&&(Va=n),Za>t&&(Za=t),t>Xa&&(Xa=t)}function Wt(){function n(n,t){o.push("M",n,",",t,u)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function i(){o.push("Z")}var u=Jt(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return u=Jt(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function Jt(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Gt(n,t){Ca+=n,za+=t,++La}function Kt(){function n(n,r){var i=n-t,u=r-e,o=Math.sqrt(i*i+u*u);qa+=o*(t+n)/2,Ta+=o*(e+r)/2,Ra+=o,Gt(t=n,e=r)}var t,e;Wa.point=function(r,i){Wa.point=n,Gt(t=r,e=i)}}function Qt(){Wa.point=Gt}function ne(){function n(n,t){var e=n-r,u=t-i,o=Math.sqrt(e*e+u*u);qa+=o*(r+n)/2,Ta+=o*(i+t)/2,Ra+=o,o=i*n-r*t,Da+=o*(r+n),Pa+=o*(i+t),Ua+=3*o,Gt(r=n,i=t)}var t,e,r,i;Wa.point=function(u,o){Wa.point=n,Gt(t=r=u,e=i=o)},Wa.lineEnd=function(){n(t,e)}}function te(n){function t(t,e){n.moveTo(t+o,e),n.arc(t,e,o,0,Ho)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function i(){a.point=t}function u(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:i,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=i,a.point=t},pointRadius:function(n){return o=n,a},result:b};return a}function ee(n){function t(n){return(a?r:e)(n)}function e(t){return ue(t,function(e,r){e=n(e,r),t.point(e[0],e[1])})}function r(t){function e(e,r){e=n(e,r),t.point(e[0],e[1])}function r(){M=NaN,S.point=u,t.lineStart()}function u(e,r){var u=dt([e,r]),o=n(e,r);i(M,x,m,b,_,w,M=o[0],x=o[1],m=e,b=u[0],_=u[1],w=u[2],a,t),t.point(M,x)}function o(){S.point=e,t.lineEnd()}function l(){
r(),S.point=c,S.lineEnd=f}function c(n,t){u(s=n,h=t),p=M,g=x,v=b,d=_,y=w,S.point=u}function f(){i(M,x,m,b,_,w,p,g,s,v,d,y,a,t),S.lineEnd=o,o()}var s,h,p,g,v,d,y,m,M,x,b,_,w,S={point:e,lineStart:r,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=l},polygonEnd:function(){t.polygonEnd(),S.lineStart=r}};return S}function i(t,e,r,a,l,c,f,s,h,p,g,v,d,y){var m=f-t,M=s-e,x=m*m+M*M;if(x>4*u&&d--){var b=a+p,_=l+g,w=c+v,S=Math.sqrt(b*b+_*_+w*w),k=Math.asin(w/=S),N=xo(xo(w)-1)<Uo||xo(r-h)<Uo?(r+h)/2:Math.atan2(_,b),E=n(N,k),A=E[0],C=E[1],z=A-t,L=C-e,q=M*z-m*L;(q*q/x>u||xo((m*z+M*L)/x-.5)>.3||o>a*p+l*g+c*v)&&(i(t,e,r,a,l,c,A,C,N,b/=S,_/=S,w,d,y),y.point(A,C),i(A,C,N,b,_,w,f,s,h,p,g,v,d,y))}}var u=.5,o=Math.cos(30*Yo),a=16;return t.precision=function(n){return arguments.length?(a=(u=n*n)>0&&16,t):Math.sqrt(u)},t}function re(n){var t=ee(function(t,e){return n([t*Zo,e*Zo])});return function(n){return le(t(n))}}function ie(n){this.stream=n}function ue(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function oe(n){return ae(function(){return n})()}function ae(n){function t(n){return n=a(n[0]*Yo,n[1]*Yo),[n[0]*h+l,c-n[1]*h]}function e(n){return n=a.invert((n[0]-l)/h,(c-n[1])/h),n&&[n[0]*Zo,n[1]*Zo]}function r(){a=Ct(o=se(y,M,x),u);var n=u(v,d);return l=p-n[0]*h,c=g+n[1]*h,i()}function i(){return f&&(f.valid=!1,f=null),t}var u,o,a,l,c,f,s=ee(function(n,t){return n=u(n,t),[n[0]*h+l,c-n[1]*h]}),h=150,p=480,g=250,v=0,d=0,y=0,M=0,x=0,b=Fa,_=m,w=null,S=null;return t.stream=function(n){return f&&(f.valid=!1),f=le(b(o,s(_(n)))),f.valid=!0,f},t.clipAngle=function(n){return arguments.length?(b=null==n?(w=n,Fa):It((w=+n)*Yo),i()):w},t.clipExtent=function(n){return arguments.length?(S=n,_=n?Zt(n[0][0],n[0][1],n[1][0],n[1][1]):m,i()):S},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(p=+n[0],g=+n[1],r()):[p,g]},t.center=function(n){return arguments.length?(v=n[0]%360*Yo,d=n[1]%360*Yo,r()):[v*Zo,d*Zo]},t.rotate=function(n){return arguments.length?(y=n[0]%360*Yo,M=n[1]%360*Yo,x=n.length>2?n[2]%360*Yo:0,r()):[y*Zo,M*Zo,x*Zo]},ao.rebind(t,s,"precision"),function(){return u=n.apply(this,arguments),t.invert=u.invert&&e,r()}}function le(n){return ue(n,function(t,e){n.point(t*Yo,e*Yo)})}function ce(n,t){return[n,t]}function fe(n,t){return[n>Fo?n-Ho:-Fo>n?n+Ho:n,t]}function se(n,t,e){return n?t||e?Ct(pe(n),ge(t,e)):pe(n):t||e?ge(t,e):fe}function he(n){return function(t,e){return t+=n,[t>Fo?t-Ho:-Fo>t?t+Ho:t,e]}}function pe(n){var t=he(n);return t.invert=he(-n),t}function ge(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*r+a*i;return[Math.atan2(l*u-f*o,a*r-c*i),tn(f*u+l*o)]}var r=Math.cos(n),i=Math.sin(n),u=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*u-l*o;return[Math.atan2(l*u+c*o,a*r+f*i),tn(f*r-a*i)]},e}function ve(n,t){var e=Math.cos(n),r=Math.sin(n);return function(i,u,o,a){var l=o*t;null!=i?(i=de(e,i),u=de(e,u),(o>0?u>i:i>u)&&(i+=o*Ho)):(i=n+o*Ho,u=n-.5*l);for(var c,f=i;o>0?f>u:u>f;f-=l)a.point((c=_t([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function de(n,t){var e=dt(t);e[0]-=n,bt(e);var r=nn(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Uo)%(2*Math.PI)}function ye(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function me(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function Me(n){return n.source}function xe(n){return n.target}function be(n,t,e,r){var i=Math.cos(t),u=Math.sin(t),o=Math.cos(r),a=Math.sin(r),l=i*Math.cos(n),c=i*Math.sin(n),f=o*Math.cos(e),s=o*Math.sin(e),h=2*Math.asin(Math.sqrt(on(r-t)+i*o*on(e-n))),p=1/Math.sin(h),g=h?function(n){var t=Math.sin(n*=h)*p,e=Math.sin(h-n)*p,r=e*l+t*f,i=e*c+t*s,o=e*u+t*a;return[Math.atan2(i,r)*Zo,Math.atan2(o,Math.sqrt(r*r+i*i))*Zo]}:function(){return[n*Zo,t*Zo]};return g.distance=h,g}function _e(){function n(n,i){var u=Math.sin(i*=Yo),o=Math.cos(i),a=xo((n*=Yo)-t),l=Math.cos(a);Ja+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*u-e*o*l)*a),e*u+r*o*l),t=n,e=u,r=o}var t,e,r;Ga.point=function(i,u){t=i*Yo,e=Math.sin(u*=Yo),r=Math.cos(u),Ga.point=n},Ga.lineEnd=function(){Ga.point=Ga.lineEnd=b}}function we(n,t){function e(t,e){var r=Math.cos(t),i=Math.cos(e),u=n(r*i);return[u*i*Math.sin(t),u*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),i=t(r),u=Math.sin(i),o=Math.cos(i);return[Math.atan2(n*u,r*o),Math.asin(r&&e*u/r)]},e}function Se(n,t){function e(n,t){o>0?-Io+Uo>t&&(t=-Io+Uo):t>Io-Uo&&(t=Io-Uo);var e=o/Math.pow(i(t),u);return[e*Math.sin(u*n),o-e*Math.cos(u*n)]}var r=Math.cos(n),i=function(n){return Math.tan(Fo/4+n/2)},u=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(i(t)/i(n)),o=r*Math.pow(i(n),u)/u;return u?(e.invert=function(n,t){var e=o-t,r=K(u)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/u,2*Math.atan(Math.pow(o/r,1/u))-Io]},e):Ne}function ke(n,t){function e(n,t){var e=u-t;return[e*Math.sin(i*n),u-e*Math.cos(i*n)]}var r=Math.cos(n),i=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),u=r/i+n;return xo(i)<Uo?ce:(e.invert=function(n,t){var e=u-t;return[Math.atan2(n,e)/i,u-K(i)*Math.sqrt(n*n+e*e)]},e)}function Ne(n,t){return[n,Math.log(Math.tan(Fo/4+t/2))]}function Ee(n){var t,e=oe(n),r=e.scale,i=e.translate,u=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=i.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=u.apply(e,arguments);if(o===e){if(t=null==n){var a=Fo*r(),l=i();u([[l[0]-a,l[1]-a],[l[0]+a,l[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ae(n,t){return[Math.log(Math.tan(Fo/4+t/2)),-n]}function Ce(n){return n[0]}function ze(n){return n[1]}function Le(n){for(var t=n.length,e=[0,1],r=2,i=2;t>i;i++){for(;r>1&&Q(n[e[r-2]],n[e[r-1]],n[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function qe(n,t){return n[0]-t[0]||n[1]-t[1]}function Te(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function Re(n,t,e,r){var i=n[0],u=e[0],o=t[0]-i,a=r[0]-u,l=n[1],c=e[1],f=t[1]-l,s=r[1]-c,h=(a*(l-c)-s*(i-u))/(s*o-a*f);return[i+h*o,l+h*f]}function De(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function Pe(){rr(this),this.edge=this.site=this.circle=null}function Ue(n){var t=cl.pop()||new Pe;return t.site=n,t}function je(n){Be(n),ol.remove(n),cl.push(n),rr(n)}function Fe(n){var t=n.circle,e=t.x,r=t.cy,i={x:e,y:r},u=n.P,o=n.N,a=[n];je(n);for(var l=u;l.circle&&xo(e-l.circle.x)<Uo&&xo(r-l.circle.cy)<Uo;)u=l.P,a.unshift(l),je(l),l=u;a.unshift(l),Be(l);for(var c=o;c.circle&&xo(e-c.circle.x)<Uo&&xo(r-c.circle.cy)<Uo;)o=c.N,a.push(c),je(c),c=o;a.push(c),Be(c);var f,s=a.length;for(f=1;s>f;++f)c=a[f],l=a[f-1],nr(c.edge,l.site,c.site,i);l=a[0],c=a[s-1],c.edge=Ke(l.site,c.site,null,i),$e(l),$e(c)}function He(n){for(var t,e,r,i,u=n.x,o=n.y,a=ol._;a;)if(r=Oe(a,o)-u,r>Uo)a=a.L;else{if(i=u-Ie(a,o),!(i>Uo)){r>-Uo?(t=a.P,e=a):i>-Uo?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var l=Ue(n);if(ol.insert(t,l),t||e){if(t===e)return Be(t),e=Ue(t.site),ol.insert(l,e),l.edge=e.edge=Ke(t.site,l.site),$e(t),void $e(e);if(!e)return void(l.edge=Ke(t.site,l.site));Be(t),Be(e);var c=t.site,f=c.x,s=c.y,h=n.x-f,p=n.y-s,g=e.site,v=g.x-f,d=g.y-s,y=2*(h*d-p*v),m=h*h+p*p,M=v*v+d*d,x={x:(d*m-p*M)/y+f,y:(h*M-v*m)/y+s};nr(e.edge,c,g,x),l.edge=Ke(c,n,null,x),e.edge=Ke(n,g,null,x),$e(t),$e(e)}}function Oe(n,t){var e=n.site,r=e.x,i=e.y,u=i-t;if(!u)return r;var o=n.P;if(!o)return-(1/0);e=o.site;var a=e.x,l=e.y,c=l-t;if(!c)return a;var f=a-r,s=1/u-1/c,h=f/c;return s?(-h+Math.sqrt(h*h-2*s*(f*f/(-2*c)-l+c/2+i-u/2)))/s+r:(r+a)/2}function Ie(n,t){var e=n.N;if(e)return Oe(e,t);var r=n.site;return r.y===t?r.x:1/0}function Ye(n){this.site=n,this.edges=[]}function Ze(n){for(var t,e,r,i,u,o,a,l,c,f,s=n[0][0],h=n[1][0],p=n[0][1],g=n[1][1],v=ul,d=v.length;d--;)if(u=v[d],u&&u.prepare())for(a=u.edges,l=a.length,o=0;l>o;)f=a[o].end(),r=f.x,i=f.y,c=a[++o%l].start(),t=c.x,e=c.y,(xo(r-t)>Uo||xo(i-e)>Uo)&&(a.splice(o,0,new tr(Qe(u.site,f,xo(r-s)<Uo&&g-i>Uo?{x:s,y:xo(t-s)<Uo?e:g}:xo(i-g)<Uo&&h-r>Uo?{x:xo(e-g)<Uo?t:h,y:g}:xo(r-h)<Uo&&i-p>Uo?{x:h,y:xo(t-h)<Uo?e:p}:xo(i-p)<Uo&&r-s>Uo?{x:xo(e-p)<Uo?t:s,y:p}:null),u.site,null)),++l)}function Ve(n,t){return t.angle-n.angle}function Xe(){rr(this),this.x=this.y=this.arc=this.site=this.cy=null}function $e(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,i=n.site,u=e.site;if(r!==u){var o=i.x,a=i.y,l=r.x-o,c=r.y-a,f=u.x-o,s=u.y-a,h=2*(l*s-c*f);if(!(h>=-jo)){var p=l*l+c*c,g=f*f+s*s,v=(s*p-c*g)/h,d=(l*g-f*p)/h,s=d+a,y=fl.pop()||new Xe;y.arc=n,y.site=i,y.x=v+o,y.y=s+Math.sqrt(v*v+d*d),y.cy=s,n.circle=y;for(var m=null,M=ll._;M;)if(y.y<M.y||y.y===M.y&&y.x<=M.x){if(!M.L){m=M.P;break}M=M.L}else{if(!M.R){m=M;break}M=M.R}ll.insert(m,y),m||(al=y)}}}}function Be(n){var t=n.circle;t&&(t.P||(al=t.N),ll.remove(t),fl.push(t),rr(t),n.circle=null)}function We(n){for(var t,e=il,r=Yt(n[0][0],n[0][1],n[1][0],n[1][1]),i=e.length;i--;)t=e[i],(!Je(t,n)||!r(t)||xo(t.a.x-t.b.x)<Uo&&xo(t.a.y-t.b.y)<Uo)&&(t.a=t.b=null,e.splice(i,1))}function Je(n,t){var e=n.b;if(e)return!0;var r,i,u=n.a,o=t[0][0],a=t[1][0],l=t[0][1],c=t[1][1],f=n.l,s=n.r,h=f.x,p=f.y,g=s.x,v=s.y,d=(h+g)/2,y=(p+v)/2;if(v===p){if(o>d||d>=a)return;if(h>g){if(u){if(u.y>=c)return}else u={x:d,y:l};e={x:d,y:c}}else{if(u){if(u.y<l)return}else u={x:d,y:c};e={x:d,y:l}}}else if(r=(h-g)/(v-p),i=y-r*d,-1>r||r>1)if(h>g){if(u){if(u.y>=c)return}else u={x:(l-i)/r,y:l};e={x:(c-i)/r,y:c}}else{if(u){if(u.y<l)return}else u={x:(c-i)/r,y:c};e={x:(l-i)/r,y:l}}else if(v>p){if(u){if(u.x>=a)return}else u={x:o,y:r*o+i};e={x:a,y:r*a+i}}else{if(u){if(u.x<o)return}else u={x:a,y:r*a+i};e={x:o,y:r*o+i}}return n.a=u,n.b=e,!0}function Ge(n,t){this.l=n,this.r=t,this.a=this.b=null}function Ke(n,t,e,r){var i=new Ge(n,t);return il.push(i),e&&nr(i,n,t,e),r&&nr(i,t,n,r),ul[n.i].edges.push(new tr(i,n,t)),ul[t.i].edges.push(new tr(i,t,n)),i}function Qe(n,t,e){var r=new Ge(n,null);return r.a=t,r.b=e,il.push(r),r}function nr(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function tr(n,t,e){var r=n.a,i=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(i.x-r.x,r.y-i.y):Math.atan2(r.x-i.x,i.y-r.y)}function er(){this._=null}function rr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function ir(n,t){var e=t,r=t.R,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function ur(n,t){var e=t,r=t.L,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function or(n){for(;n.L;)n=n.L;return n}function ar(n,t){var e,r,i,u=n.sort(lr).pop();for(il=[],ul=new Array(n.length),ol=new er,ll=new er;;)if(i=al,u&&(!i||u.y<i.y||u.y===i.y&&u.x<i.x))u.x===e&&u.y===r||(ul[u.i]=new Ye(u),He(u),e=u.x,r=u.y),u=n.pop();else{if(!i)break;Fe(i.arc)}t&&(We(t),Ze(t));var o={cells:ul,edges:il};return ol=ll=il=ul=null,o}function lr(n,t){return t.y-n.y||t.x-n.x}function cr(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function fr(n){return n.x}function sr(n){return n.y}function hr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function pr(n,t,e,r,i,u){if(!n(t,e,r,i,u)){var o=.5*(e+i),a=.5*(r+u),l=t.nodes;l[0]&&pr(n,l[0],e,r,o,a),l[1]&&pr(n,l[1],o,r,i,a),l[2]&&pr(n,l[2],e,a,o,u),l[3]&&pr(n,l[3],o,a,i,u)}}function gr(n,t,e,r,i,u,o){var a,l=1/0;return function c(n,f,s,h,p){if(!(f>u||s>o||r>h||i>p)){if(g=n.point){var g,v=t-n.x,d=e-n.y,y=v*v+d*d;if(l>y){var m=Math.sqrt(l=y);r=t-m,i=e-m,u=t+m,o=e+m,a=g}}for(var M=n.nodes,x=.5*(f+h),b=.5*(s+p),_=t>=x,w=e>=b,S=w<<1|_,k=S+4;k>S;++S)if(n=M[3&S])switch(3&S){case 0:c(n,f,s,x,b);break;case 1:c(n,x,s,h,b);break;case 2:c(n,f,b,x,p);break;case 3:c(n,x,b,h,p)}}}(n,r,i,u,o),a}function vr(n,t){n=ao.rgb(n),t=ao.rgb(t);var e=n.r,r=n.g,i=n.b,u=t.r-e,o=t.g-r,a=t.b-i;return function(n){return"#"+bn(Math.round(e+u*n))+bn(Math.round(r+o*n))+bn(Math.round(i+a*n))}}function dr(n,t){var e,r={},i={};for(e in n)e in t?r[e]=Mr(n[e],t[e]):i[e]=n[e];for(e in t)e in n||(i[e]=t[e]);return function(n){for(e in r)i[e]=r[e](n);return i}}function yr(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function mr(n,t){var e,r,i,u=hl.lastIndex=pl.lastIndex=0,o=-1,a=[],l=[];for(n+="",t+="";(e=hl.exec(n))&&(r=pl.exec(t));)(i=r.index)>u&&(i=t.slice(u,i),a[o]?a[o]+=i:a[++o]=i),(e=e[0])===(r=r[0])?a[o]?a[o]+=r:a[++o]=r:(a[++o]=null,l.push({i:o,x:yr(e,r)})),u=pl.lastIndex;return u<t.length&&(i=t.slice(u),a[o]?a[o]+=i:a[++o]=i),a.length<2?l[0]?(t=l[0].x,function(n){return t(n)+""}):function(){return t}:(t=l.length,function(n){for(var e,r=0;t>r;++r)a[(e=l[r]).i]=e.x(n);return a.join("")})}function Mr(n,t){for(var e,r=ao.interpolators.length;--r>=0&&!(e=ao.interpolators[r](n,t)););return e}function xr(n,t){var e,r=[],i=[],u=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Mr(n[e],t[e]));for(;u>e;++e)i[e]=n[e];for(;o>e;++e)i[e]=t[e];return function(n){for(e=0;a>e;++e)i[e]=r[e](n);return i}}function br(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function _r(n){return function(t){return 1-n(1-t)}}function wr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Sr(n){return n*n}function kr(n){return n*n*n}function Nr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Er(n){return function(t){return Math.pow(t,n)}}function Ar(n){return 1-Math.cos(n*Io)}function Cr(n){return Math.pow(2,10*(n-1))}function zr(n){return 1-Math.sqrt(1-n*n)}function Lr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/Ho*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*Ho/t)}}function qr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Tr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Rr(n,t){n=ao.hcl(n),t=ao.hcl(t);var e=n.h,r=n.c,i=n.l,u=t.h-e,o=t.c-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return sn(e+u*n,r+o*n,i+a*n)+""}}function Dr(n,t){n=ao.hsl(n),t=ao.hsl(t);var e=n.h,r=n.s,i=n.l,u=t.h-e,o=t.s-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return cn(e+u*n,r+o*n,i+a*n)+""}}function Pr(n,t){n=ao.lab(n),t=ao.lab(t);var e=n.l,r=n.a,i=n.b,u=t.l-e,o=t.a-r,a=t.b-i;return function(n){return pn(e+u*n,r+o*n,i+a*n)+""}}function Ur(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function jr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Hr(t),i=Fr(t,e),u=Hr(Or(e,t,-i))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Zo,this.translate=[n.e,n.f],this.scale=[r,u],this.skew=u?Math.atan2(i,u)*Zo:0}function Fr(n,t){return n[0]*t[0]+n[1]*t[1]}function Hr(n){var t=Math.sqrt(Fr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function Or(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Ir(n){return n.length?n.pop()+",":""}function Yr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push("translate(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else(t[0]||t[1])&&e.push("translate("+t+")")}function Zr(n,t,e,r){n!==t?(n-t>180?t+=360:t-n>180&&(n+=360),r.push({i:e.push(Ir(e)+"rotate(",null,")")-2,x:yr(n,t)})):t&&e.push(Ir(e)+"rotate("+t+")")}function Vr(n,t,e,r){n!==t?r.push({i:e.push(Ir(e)+"skewX(",null,")")-2,x:yr(n,t)}):t&&e.push(Ir(e)+"skewX("+t+")")}function Xr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push(Ir(e)+"scale(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else 1===t[0]&&1===t[1]||e.push(Ir(e)+"scale("+t+")")}function $r(n,t){var e=[],r=[];return n=ao.transform(n),t=ao.transform(t),Yr(n.translate,t.translate,e,r),Zr(n.rotate,t.rotate,e,r),Vr(n.skew,t.skew,e,r),Xr(n.scale,t.scale,e,r),n=t=null,function(n){for(var t,i=-1,u=r.length;++i<u;)e[(t=r[i]).i]=t.x(n);return e.join("")}}function Br(n,t){return t=(t-=n=+n)||1/t,function(e){return(e-n)/t}}function Wr(n,t){return t=(t-=n=+n)||1/t,function(e){return Math.max(0,Math.min(1,(e-n)/t))}}function Jr(n){for(var t=n.source,e=n.target,r=Kr(t,e),i=[t];t!==r;)t=t.parent,i.push(t);for(var u=i.length;e!==r;)i.splice(u,0,e),e=e.parent;return i}function Gr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Kr(n,t){if(n===t)return n;for(var e=Gr(n),r=Gr(t),i=e.pop(),u=r.pop(),o=null;i===u;)o=i,i=e.pop(),u=r.pop();return o}function Qr(n){n.fixed|=2}function ni(n){n.fixed&=-7}function ti(n){n.fixed|=4,n.px=n.x,n.py=n.y}function ei(n){n.fixed&=-5}function ri(n,t,e){var r=0,i=0;if(n.charge=0,!n.leaf)for(var u,o=n.nodes,a=o.length,l=-1;++l<a;)u=o[l],null!=u&&(ri(u,t,e),n.charge+=u.charge,r+=u.charge*u.cx,i+=u.charge*u.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var c=t*e[n.point.index];n.charge+=n.pointCharge=c,r+=c*n.point.x,i+=c*n.point.y}n.cx=r/n.charge,n.cy=i/n.charge}function ii(n,t){return ao.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=fi,n}function ui(n,t){for(var e=[n];null!=(n=e.pop());)if(t(n),(i=n.children)&&(r=i.length))for(var r,i;--r>=0;)e.push(i[r])}function oi(n,t){for(var e=[n],r=[];null!=(n=e.pop());)if(r.push(n),(u=n.children)&&(i=u.length))for(var i,u,o=-1;++o<i;)e.push(u[o]);for(;null!=(n=r.pop());)t(n)}function ai(n){return n.children}function li(n){return n.value}function ci(n,t){return t.value-n.value}function fi(n){return ao.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function si(n){return n.x}function hi(n){return n.y}function pi(n,t,e){n.y0=t,n.y=e}function gi(n){return ao.range(n.length)}function vi(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function di(n){for(var t,e=1,r=0,i=n[0][1],u=n.length;u>e;++e)(t=n[e][1])>i&&(r=e,i=t);return r}function yi(n){return n.reduce(mi,0)}function mi(n,t){return n+t[1]}function Mi(n,t){return xi(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function xi(n,t){for(var e=-1,r=+n[0],i=(n[1]-r)/t,u=[];++e<=t;)u[e]=i*e+r;return u}function bi(n){return[ao.min(n),ao.max(n)]}function _i(n,t){return n.value-t.value}function wi(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Si(n,t){n._pack_next=t,t._pack_prev=n}function ki(n,t){var e=t.x-n.x,r=t.y-n.y,i=n.r+t.r;return.999*i*i>e*e+r*r}function Ni(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),p=Math.max(n.y+n.r,p)}if((e=n.children)&&(c=e.length)){var e,r,i,u,o,a,l,c,f=1/0,s=-(1/0),h=1/0,p=-(1/0);if(e.forEach(Ei),r=e[0],r.x=-r.r,r.y=0,t(r),c>1&&(i=e[1],i.x=i.r,i.y=0,t(i),c>2))for(u=e[2],zi(r,i,u),t(u),wi(r,u),r._pack_prev=u,wi(u,i),i=r._pack_next,o=3;c>o;o++){zi(r,i,u=e[o]);var g=0,v=1,d=1;for(a=i._pack_next;a!==i;a=a._pack_next,v++)if(ki(a,u)){g=1;break}if(1==g)for(l=r._pack_prev;l!==a._pack_prev&&!ki(l,u);l=l._pack_prev,d++);g?(d>v||v==d&&i.r<r.r?Si(r,i=a):Si(r=l,i),o--):(wi(r,u),i=u,t(u))}var y=(f+s)/2,m=(h+p)/2,M=0;for(o=0;c>o;o++)u=e[o],u.x-=y,u.y-=m,M=Math.max(M,u.r+Math.sqrt(u.x*u.x+u.y*u.y));n.r=M,e.forEach(Ai)}}function Ei(n){n._pack_next=n._pack_prev=n}function Ai(n){delete n._pack_next,delete n._pack_prev}function Ci(n,t,e,r){var i=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,i)for(var u=-1,o=i.length;++u<o;)Ci(i[u],t,e,r)}function zi(n,t,e){var r=n.r+e.r,i=t.x-n.x,u=t.y-n.y;if(r&&(i||u)){var o=t.r+e.r,a=i*i+u*u;o*=o,r*=r;var l=.5+(r-o)/(2*a),c=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+l*i+c*u,e.y=n.y+l*u-c*i}else e.x=n.x+r,e.y=n.y}function Li(n,t){return n.parent==t.parent?1:2}function qi(n){var t=n.children;return t.length?t[0]:n.t}function Ti(n){var t,e=n.children;return(t=e.length)?e[t-1]:n.t}function Ri(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function Di(n){for(var t,e=0,r=0,i=n.children,u=i.length;--u>=0;)t=i[u],t.z+=e,t.m+=e,e+=t.s+(r+=t.c)}function Pi(n,t,e){return n.a.parent===t.parent?n.a:e}function Ui(n){return 1+ao.max(n,function(n){return n.y})}function ji(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Fi(n){var t=n.children;return t&&t.length?Fi(t[0]):n}function Hi(n){var t,e=n.children;return e&&(t=e.length)?Hi(e[t-1]):n}function Oi(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Ii(n,t){var e=n.x+t[3],r=n.y+t[0],i=n.dx-t[1]-t[3],u=n.dy-t[0]-t[2];return 0>i&&(e+=i/2,i=0),0>u&&(r+=u/2,u=0),{x:e,y:r,dx:i,dy:u}}function Yi(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Zi(n){return n.rangeExtent?n.rangeExtent():Yi(n.range())}function Vi(n,t,e,r){var i=e(n[0],n[1]),u=r(t[0],t[1]);return function(n){return u(i(n))}}function Xi(n,t){var e,r=0,i=n.length-1,u=n[r],o=n[i];return u>o&&(e=r,r=i,i=e,e=u,u=o,o=e),n[r]=t.floor(u),n[i]=t.ceil(o),n}function $i(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:Sl}function Bi(n,t,e,r){var i=[],u=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)i.push(e(n[o-1],n[o])),u.push(r(t[o-1],t[o]));return function(t){var e=ao.bisect(n,t,1,a)-1;return u[e](i[e](t))}}function Wi(n,t,e,r){function i(){var i=Math.min(n.length,t.length)>2?Bi:Vi,l=r?Wr:Br;return o=i(n,t,l,e),a=i(t,n,l,Mr),u}function u(n){return o(n)}var o,a;return u.invert=function(n){return a(n)},u.domain=function(t){return arguments.length?(n=t.map(Number),i()):n},u.range=function(n){return arguments.length?(t=n,i()):t},u.rangeRound=function(n){return u.range(n).interpolate(Ur)},u.clamp=function(n){return arguments.length?(r=n,i()):r},u.interpolate=function(n){return arguments.length?(e=n,i()):e},u.ticks=function(t){return Qi(n,t)},u.tickFormat=function(t,e){return nu(n,t,e)},u.nice=function(t){return Gi(n,t),i()},u.copy=function(){return Wi(n,t,e,r)},i()}function Ji(n,t){return ao.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Gi(n,t){return Xi(n,$i(Ki(n,t)[2])),Xi(n,$i(Ki(n,t)[2])),n}function Ki(n,t){null==t&&(t=10);var e=Yi(n),r=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),u=t/r*i;return.15>=u?i*=10:.35>=u?i*=5:.75>=u&&(i*=2),e[0]=Math.ceil(e[0]/i)*i,e[1]=Math.floor(e[1]/i)*i+.5*i,e[2]=i,e}function Qi(n,t){return ao.range.apply(ao,Ki(n,t))}function nu(n,t,e){var r=Ki(n,t);if(e){var i=ha.exec(e);if(i.shift(),"s"===i[8]){var u=ao.formatPrefix(Math.max(xo(r[0]),xo(r[1])));return i[7]||(i[7]="."+tu(u.scale(r[2]))),i[8]="f",e=ao.format(i.join("")),function(n){return e(u.scale(n))+u.symbol}}i[7]||(i[7]="."+eu(i[8],r)),e=i.join("")}else e=",."+tu(r[2])+"f";return ao.format(e)}function tu(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function eu(n,t){var e=tu(t[2]);return n in kl?Math.abs(e-tu(Math.max(xo(t[0]),xo(t[1]))))+ +("e"!==n):e-2*("%"===n)}function ru(n,t,e,r){function i(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function u(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(i(t))}return o.invert=function(t){return u(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(i)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(i)),o):t},o.nice=function(){var t=Xi(r.map(i),e?Math:El);return n.domain(t),r=t.map(u),o},o.ticks=function(){var n=Yi(r),o=[],a=n[0],l=n[1],c=Math.floor(i(a)),f=Math.ceil(i(l)),s=t%1?2:t;if(isFinite(f-c)){if(e){for(;f>c;c++)for(var h=1;s>h;h++)o.push(u(c)*h);o.push(u(c))}else for(o.push(u(c));c++<f;)for(var h=s-1;h>0;h--)o.push(u(c)*h);for(c=0;o[c]<a;c++);for(f=o.length;o[f-1]>l;f--);o=o.slice(c,f)}return o},o.tickFormat=function(n,e){if(!arguments.length)return Nl;arguments.length<2?e=Nl:"function"!=typeof e&&(e=ao.format(e));var r=Math.max(1,t*n/o.ticks().length);return function(n){var o=n/u(Math.round(i(n)));return t-.5>o*t&&(o*=t),r>=o?e(n):""}},o.copy=function(){return ru(n.copy(),t,e,r)},Ji(o,n)}function iu(n,t,e){function r(t){return n(i(t))}var i=uu(t),u=uu(1/t);return r.invert=function(t){return u(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(i)),r):e},r.ticks=function(n){return Qi(e,n)},r.tickFormat=function(n,t){return nu(e,n,t)},r.nice=function(n){return r.domain(Gi(e,n))},r.exponent=function(o){return arguments.length?(i=uu(t=o),u=uu(1/t),n.domain(e.map(i)),r):t},r.copy=function(){return iu(n.copy(),t,e)},Ji(r,n)}function uu(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ou(n,t){function e(e){return u[((i.get(e)||("range"===t.t?i.set(e,n.push(e)):NaN))-1)%u.length]}function r(t,e){return ao.range(n.length).map(function(n){return t+e*n})}var i,u,o;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new c;for(var u,o=-1,a=r.length;++o<a;)i.has(u=r[o])||i.set(u,n.push(u));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(u=n,o=0,t={t:"range",a:arguments},e):u},e.rangePoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=(l+c)/2,0):(c-l)/(n.length-1+a);return u=r(l+f*a/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeRoundPoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=c=Math.round((l+c)/2),0):(c-l)/(n.length-1+a)|0;return u=r(l+Math.round(f*a/2+(c-l-(n.length-1+a)*f)/2),f),o=0,t={t:"rangeRoundPoints",a:arguments},e},e.rangeBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=(s-f)/(n.length-a+2*l);return u=r(f+h*l,h),c&&u.reverse(),o=h*(1-a),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=Math.floor((s-f)/(n.length-a+2*l));return u=r(f+Math.round((s-f-(n.length-a)*h)/2),h),c&&u.reverse(),o=Math.round(h*(1-a)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Yi(t.a[0])},e.copy=function(){return ou(n,t)},e.domain(n)}function au(n,t){function u(){var e=0,r=t.length;for(a=[];++e<r;)a[e-1]=ao.quantile(n,e/r);return o}function o(n){return isNaN(n=+n)?void 0:t[ao.bisect(a,n)]}var a;return o.domain=function(t){return arguments.length?(n=t.map(r).filter(i).sort(e),u()):n},o.range=function(n){return arguments.length?(t=n,u()):t},o.quantiles=function(){return a},o.invertExtent=function(e){return e=t.indexOf(e),0>e?[NaN,NaN]:[e>0?a[e-1]:n[0],e<a.length?a[e]:n[n.length-1]]},o.copy=function(){return au(n,t)},u()}function lu(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(u*(t-n))))]}function i(){return u=e.length/(t-n),o=e.length-1,r}var u,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],i()):[n,t]},r.range=function(n){return arguments.length?(e=n,i()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?NaN:t/u+n,[t,t+1/u]},r.copy=function(){return lu(n,t,e)},i()}function cu(n,t){function e(e){return e>=e?t[ao.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return cu(n,t)},e}function fu(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Qi(n,t)},t.tickFormat=function(t,e){return nu(n,t,e)},t.copy=function(){return fu(n)},t}function su(){return 0}function hu(n){return n.innerRadius}function pu(n){return n.outerRadius}function gu(n){return n.startAngle}function vu(n){return n.endAngle}function du(n){return n&&n.padAngle}function yu(n,t,e,r){return(n-e)*t-(t-r)*n>0?0:1}function mu(n,t,e,r,i){var u=n[0]-t[0],o=n[1]-t[1],a=(i?r:-r)/Math.sqrt(u*u+o*o),l=a*o,c=-a*u,f=n[0]+l,s=n[1]+c,h=t[0]+l,p=t[1]+c,g=(f+h)/2,v=(s+p)/2,d=h-f,y=p-s,m=d*d+y*y,M=e-r,x=f*p-h*s,b=(0>y?-1:1)*Math.sqrt(Math.max(0,M*M*m-x*x)),_=(x*y-d*b)/m,w=(-x*d-y*b)/m,S=(x*y+d*b)/m,k=(-x*d+y*b)/m,N=_-g,E=w-v,A=S-g,C=k-v;return N*N+E*E>A*A+C*C&&(_=S,w=k),[[_-l,w-c],[_*e/M,w*e/M]]}function Mu(n){function t(t){function o(){c.push("M",u(n(f),a))}for(var l,c=[],f=[],s=-1,h=t.length,p=En(e),g=En(r);++s<h;)i.call(this,l=t[s],s)?f.push([+p.call(this,l,s),+g.call(this,l,s)]):f.length&&(o(),f=[]);return f.length&&o(),c.length?c.join(""):null}var e=Ce,r=ze,i=zt,u=xu,o=u.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(i=n,t):i},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?u=n:(u=Tl.get(n)||xu).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function xu(n){return n.length>1?n.join("L"):n+"Z"}function bu(n){return n.join("L")+"Z"}function _u(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&i.push("H",r[0]),i.join("")}function wu(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("V",(r=n[t])[1],"H",r[0]);return i.join("")}function Su(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r=n[t])[0],"V",r[1]);return i.join("")}function ku(n,t){return n.length<4?xu(n):n[1]+Au(n.slice(1,-1),Cu(n,t))}function Nu(n,t){return n.length<3?bu(n):n[0]+Au((n.push(n[0]),n),Cu([n[n.length-2]].concat(n,[n[1]]),t))}function Eu(n,t){return n.length<3?xu(n):n[0]+Au(n,Cu(n,t))}function Au(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return xu(n);var e=n.length!=t.length,r="",i=n[0],u=n[1],o=t[0],a=o,l=1;if(e&&(r+="Q"+(u[0]-2*o[0]/3)+","+(u[1]-2*o[1]/3)+","+u[0]+","+u[1],i=n[1],l=2),t.length>1){a=t[1],u=n[l],l++,r+="C"+(i[0]+o[0])+","+(i[1]+o[1])+","+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1];for(var c=2;c<t.length;c++,l++)u=n[l],a=t[c],r+="S"+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1]}if(e){var f=n[l];r+="Q"+(u[0]+2*a[0]/3)+","+(u[1]+2*a[1]/3)+","+f[0]+","+f[1]}return r}function Cu(n,t){for(var e,r=[],i=(1-t)/2,u=n[0],o=n[1],a=1,l=n.length;++a<l;)e=u,u=o,o=n[a],r.push([i*(o[0]-e[0]),i*(o[1]-e[1])]);return r}function zu(n){if(n.length<3)return xu(n);var t=1,e=n.length,r=n[0],i=r[0],u=r[1],o=[i,i,i,(r=n[1])[0]],a=[u,u,u,r[1]],l=[i,",",u,"L",Ru(Pl,o),",",Ru(Pl,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),Du(l,o,a);return n.pop(),l.push("L",r),l.join("")}function Lu(n){if(n.length<4)return xu(n);for(var t,e=[],r=-1,i=n.length,u=[0],o=[0];++r<3;)t=n[r],u.push(t[0]),o.push(t[1]);for(e.push(Ru(Pl,u)+","+Ru(Pl,o)),--r;++r<i;)t=n[r],u.shift(),u.push(t[0]),o.shift(),o.push(t[1]),Du(e,u,o);return e.join("")}function qu(n){for(var t,e,r=-1,i=n.length,u=i+4,o=[],a=[];++r<4;)e=n[r%i],o.push(e[0]),a.push(e[1]);for(t=[Ru(Pl,o),",",Ru(Pl,a)],--r;++r<u;)e=n[r%i],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),Du(t,o,a);return t.join("")}function Tu(n,t){var e=n.length-1;if(e)for(var r,i,u=n[0][0],o=n[0][1],a=n[e][0]-u,l=n[e][1]-o,c=-1;++c<=e;)r=n[c],i=c/e,r[0]=t*r[0]+(1-t)*(u+i*a),r[1]=t*r[1]+(1-t)*(o+i*l);return zu(n)}function Ru(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Du(n,t,e){n.push("C",Ru(Rl,t),",",Ru(Rl,e),",",Ru(Dl,t),",",Ru(Dl,e),",",Ru(Pl,t),",",Ru(Pl,e))}function Pu(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Uu(n){for(var t=0,e=n.length-1,r=[],i=n[0],u=n[1],o=r[0]=Pu(i,u);++t<e;)r[t]=(o+(o=Pu(i=u,u=n[t+1])))/2;return r[t]=o,r}function ju(n){for(var t,e,r,i,u=[],o=Uu(n),a=-1,l=n.length-1;++a<l;)t=Pu(n[a],n[a+1]),xo(t)<Uo?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,i=e*e+r*r,i>9&&(i=3*t/Math.sqrt(i),o[a]=i*e,o[a+1]=i*r));for(a=-1;++a<=l;)i=(n[Math.min(l,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),u.push([i||0,o[a]*i||0]);return u}function Fu(n){return n.length<3?xu(n):n[0]+Au(n,ju(n))}function Hu(n){for(var t,e,r,i=-1,u=n.length;++i<u;)t=n[i],e=t[0],r=t[1]-Io,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Ou(n){function t(t){function l(){v.push("M",a(n(y),s),f,c(n(d.reverse()),s),"Z")}for(var h,p,g,v=[],d=[],y=[],m=-1,M=t.length,x=En(e),b=En(i),_=e===r?function(){
return p}:En(r),w=i===u?function(){return g}:En(u);++m<M;)o.call(this,h=t[m],m)?(d.push([p=+x.call(this,h,m),g=+b.call(this,h,m)]),y.push([+_.call(this,h,m),+w.call(this,h,m)])):d.length&&(l(),d=[],y=[]);return d.length&&l(),v.length?v.join(""):null}var e=Ce,r=Ce,i=0,u=ze,o=zt,a=xu,l=a.key,c=a,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(i=u=n,t):u},t.y0=function(n){return arguments.length?(i=n,t):i},t.y1=function(n){return arguments.length?(u=n,t):u},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(l="function"==typeof n?a=n:(a=Tl.get(n)||xu).key,c=a.reverse||a,f=a.closed?"M":"L",t):l},t.tension=function(n){return arguments.length?(s=n,t):s},t}function Iu(n){return n.radius}function Yu(n){return[n.x,n.y]}function Zu(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]-Io;return[e*Math.cos(r),e*Math.sin(r)]}}function Vu(){return 64}function Xu(){return"circle"}function $u(n){var t=Math.sqrt(n/Fo);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Bu(n){return function(){var t,e,r;(t=this[n])&&(r=t[e=t.active])&&(r.timer.c=null,r.timer.t=NaN,--t.count?delete t[e]:delete this[n],t.active+=.5,r.event&&r.event.interrupt.call(this,this.__data__,r.index))}}function Wu(n,t,e){return ko(n,Yl),n.namespace=t,n.id=e,n}function Ju(n,t,e,r){var i=n.id,u=n.namespace;return Y(n,"function"==typeof e?function(n,o,a){n[u][i].tween.set(t,r(e.call(n,n.__data__,o,a)))}:(e=r(e),function(n){n[u][i].tween.set(t,e)}))}function Gu(n){return null==n&&(n=""),function(){this.textContent=n}}function Ku(n){return null==n?"__transition__":"__transition_"+n+"__"}function Qu(n,t,e,r,i){function u(n){var t=v.delay;return f.t=t+l,n>=t?o(n-t):void(f.c=o)}function o(e){var i=g.active,u=g[i];u&&(u.timer.c=null,u.timer.t=NaN,--g.count,delete g[i],u.event&&u.event.interrupt.call(n,n.__data__,u.index));for(var o in g)if(r>+o){var c=g[o];c.timer.c=null,c.timer.t=NaN,--g.count,delete g[o]}f.c=a,qn(function(){return f.c&&a(e||1)&&(f.c=null,f.t=NaN),1},0,l),g.active=r,v.event&&v.event.start.call(n,n.__data__,t),p=[],v.tween.forEach(function(e,r){(r=r.call(n,n.__data__,t))&&p.push(r)}),h=v.ease,s=v.duration}function a(i){for(var u=i/s,o=h(u),a=p.length;a>0;)p[--a].call(n,o);return u>=1?(v.event&&v.event.end.call(n,n.__data__,t),--g.count?delete g[r]:delete n[e],1):void 0}var l,f,s,h,p,g=n[e]||(n[e]={active:0,count:0}),v=g[r];v||(l=i.time,f=qn(u,0,l),v=g[r]={tween:new c,time:l,timer:f,delay:i.delay,duration:i.duration,ease:i.ease,index:t},i=null,++g.count)}function no(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate("+(isFinite(r)?r:e(n))+",0)"})}function to(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate(0,"+(isFinite(r)?r:e(n))+")"})}function eo(n){return n.toISOString()}function ro(n,t,e){function r(t){return n(t)}function i(n,e){var r=n[1]-n[0],i=r/e,u=ao.bisect(Kl,i);return u==Kl.length?[t.year,Ki(n.map(function(n){return n/31536e6}),e)[2]]:u?t[i/Kl[u-1]<Kl[u]/i?u-1:u]:[tc,Ki(n,e)[2]]}return r.invert=function(t){return io(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(io)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,io(+e+1),t).length}var u=r.domain(),o=Yi(u),a=null==n?i(o,10):"number"==typeof n&&i(o,n);return a&&(n=a[0],t=a[1]),r.domain(Xi(u,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=io(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=io(+t+1);return t}}:n))},r.ticks=function(n,t){var e=Yi(r.domain()),u=null==n?i(e,10):"number"==typeof n?i(e,n):!n.range&&[{range:n},t];return u&&(n=u[0],t=u[1]),n.range(e[0],io(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return ro(n.copy(),t,e)},Ji(r,n)}function io(n){return new Date(n)}function uo(n){return JSON.parse(n.responseText)}function oo(n){var t=fo.createRange();return t.selectNode(fo.body),t.createContextualFragment(n.responseText)}var ao={version:"3.5.17"},lo=[].slice,co=function(n){return lo.call(n)},fo=this.document;if(fo)try{co(fo.documentElement.childNodes)[0].nodeType}catch(so){co=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}if(Date.now||(Date.now=function(){return+new Date}),fo)try{fo.createElement("DIV").style.setProperty("opacity",0,"")}catch(ho){var po=this.Element.prototype,go=po.setAttribute,vo=po.setAttributeNS,yo=this.CSSStyleDeclaration.prototype,mo=yo.setProperty;po.setAttribute=function(n,t){go.call(this,n,t+"")},po.setAttributeNS=function(n,t,e){vo.call(this,n,t,e+"")},yo.setProperty=function(n,t,e){mo.call(this,n,t+"",e)}}ao.ascending=e,ao.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:NaN},ao.min=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&e>r&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&e>r&&(e=r)}return e},ao.max=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&r>e&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&r>e&&(e=r)}return e},ao.extent=function(n,t){var e,r,i,u=-1,o=n.length;if(1===arguments.length){for(;++u<o;)if(null!=(r=n[u])&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=n[u])&&(e>r&&(e=r),r>i&&(i=r))}else{for(;++u<o;)if(null!=(r=t.call(n,n[u],u))&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=t.call(n,n[u],u))&&(e>r&&(e=r),r>i&&(i=r))}return[e,i]},ao.sum=function(n,t){var e,r=0,u=n.length,o=-1;if(1===arguments.length)for(;++o<u;)i(e=+n[o])&&(r+=e);else for(;++o<u;)i(e=+t.call(n,n[o],o))&&(r+=e);return r},ao.mean=function(n,t){var e,u=0,o=n.length,a=-1,l=o;if(1===arguments.length)for(;++a<o;)i(e=r(n[a]))?u+=e:--l;else for(;++a<o;)i(e=r(t.call(n,n[a],a)))?u+=e:--l;return l?u/l:void 0},ao.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),i=+n[r-1],u=e-r;return u?i+u*(n[r]-i):i},ao.median=function(n,t){var u,o=[],a=n.length,l=-1;if(1===arguments.length)for(;++l<a;)i(u=r(n[l]))&&o.push(u);else for(;++l<a;)i(u=r(t.call(n,n[l],l)))&&o.push(u);return o.length?ao.quantile(o.sort(e),.5):void 0},ao.variance=function(n,t){var e,u,o=n.length,a=0,l=0,c=-1,f=0;if(1===arguments.length)for(;++c<o;)i(e=r(n[c]))&&(u=e-a,a+=u/++f,l+=u*(e-a));else for(;++c<o;)i(e=r(t.call(n,n[c],c)))&&(u=e-a,a+=u/++f,l+=u*(e-a));return f>1?l/(f-1):void 0},ao.deviation=function(){var n=ao.variance.apply(this,arguments);return n?Math.sqrt(n):n};var Mo=u(e);ao.bisectLeft=Mo.left,ao.bisect=ao.bisectRight=Mo.right,ao.bisector=function(n){return u(1===n.length?function(t,r){return e(n(t),r)}:n)},ao.shuffle=function(n,t,e){(u=arguments.length)<3&&(e=n.length,2>u&&(t=0));for(var r,i,u=e-t;u;)i=Math.random()*u--|0,r=n[u+t],n[u+t]=n[i+t],n[i+t]=r;return n},ao.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},ao.pairs=function(n){for(var t,e=0,r=n.length-1,i=n[0],u=new Array(0>r?0:r);r>e;)u[e]=[t=i,i=n[++e]];return u},ao.transpose=function(n){if(!(i=n.length))return[];for(var t=-1,e=ao.min(n,o),r=new Array(e);++t<e;)for(var i,u=-1,a=r[t]=new Array(i);++u<i;)a[u]=n[u][t];return r},ao.zip=function(){return ao.transpose(arguments)},ao.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ao.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ao.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ao.merge=function(n){for(var t,e,r,i=n.length,u=-1,o=0;++u<i;)o+=n[u].length;for(e=new Array(o);--i>=0;)for(r=n[i],t=r.length;--t>=0;)e[--o]=r[t];return e};var xo=Math.abs;ao.range=function(n,t,e){if(arguments.length<3&&(e=1,arguments.length<2&&(t=n,n=0)),(t-n)/e===1/0)throw new Error("infinite range");var r,i=[],u=a(xo(e)),o=-1;if(n*=u,t*=u,e*=u,0>e)for(;(r=n+e*++o)>t;)i.push(r/u);else for(;(r=n+e*++o)<t;)i.push(r/u);return i},ao.map=function(n,t){var e=new c;if(n instanceof c)n.forEach(function(n,t){e.set(n,t)});else if(Array.isArray(n)){var r,i=-1,u=n.length;if(1===arguments.length)for(;++i<u;)e.set(i,n[i]);else for(;++i<u;)e.set(t.call(n,r=n[i],i),r)}else for(var o in n)e.set(o,n[o]);return e};var bo="__proto__",_o="\x00";l(c,{has:h,get:function(n){return this._[f(n)]},set:function(n,t){return this._[f(n)]=t},remove:p,keys:g,values:function(){var n=[];for(var t in this._)n.push(this._[t]);return n},entries:function(){var n=[];for(var t in this._)n.push({key:s(t),value:this._[t]});return n},size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t),this._[t])}}),ao.nest=function(){function n(t,o,a){if(a>=u.length)return r?r.call(i,o):e?o.sort(e):o;for(var l,f,s,h,p=-1,g=o.length,v=u[a++],d=new c;++p<g;)(h=d.get(l=v(f=o[p])))?h.push(f):d.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,a))}):(f={},s=function(e,r){f[e]=n(t,r,a)}),d.forEach(s),f}function t(n,e){if(e>=u.length)return n;var r=[],i=o[e++];return n.forEach(function(n,i){r.push({key:n,values:t(i,e)})}),i?r.sort(function(n,t){return i(n.key,t.key)}):r}var e,r,i={},u=[],o=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(ao.map,e,0),0)},i.key=function(n){return u.push(n),i},i.sortKeys=function(n){return o[u.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},ao.set=function(n){var t=new y;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},l(y,{has:h,add:function(n){return this._[f(n+="")]=!0,n},remove:p,values:g,size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t))}}),ao.behavior={},ao.rebind=function(n,t){for(var e,r=1,i=arguments.length;++r<i;)n[e=arguments[r]]=M(n,t,t[e]);return n};var wo=["webkit","ms","moz","Moz","o","O"];ao.dispatch=function(){for(var n=new _,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=w(n);return n},_.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.slice(e+1),n=n.slice(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ao.event=null,ao.requote=function(n){return n.replace(So,"\\$&")};var So=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ko={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},No=function(n,t){return t.querySelector(n)},Eo=function(n,t){return t.querySelectorAll(n)},Ao=function(n,t){var e=n.matches||n[x(n,"matchesSelector")];return(Ao=function(n,t){return e.call(n,t)})(n,t)};"function"==typeof Sizzle&&(No=function(n,t){return Sizzle(n,t)[0]||null},Eo=Sizzle,Ao=Sizzle.matchesSelector),ao.selection=function(){return ao.select(fo.documentElement)};var Co=ao.selection.prototype=[];Co.select=function(n){var t,e,r,i,u=[];n=A(n);for(var o=-1,a=this.length;++o<a;){u.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var l=-1,c=r.length;++l<c;)(i=r[l])?(t.push(e=n.call(i,i.__data__,l,o)),e&&"__data__"in i&&(e.__data__=i.__data__)):t.push(null)}return E(u)},Co.selectAll=function(n){var t,e,r=[];n=C(n);for(var i=-1,u=this.length;++i<u;)for(var o=this[i],a=-1,l=o.length;++a<l;)(e=o[a])&&(r.push(t=co(n.call(e,e.__data__,a,i))),t.parentNode=e);return E(r)};var zo="http://www.w3.org/1999/xhtml",Lo={svg:"http://www.w3.org/2000/svg",xhtml:zo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ao.ns={prefix:Lo,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&"xmlns"!==(e=n.slice(0,t))&&(n=n.slice(t+1)),Lo.hasOwnProperty(e)?{space:Lo[e],local:n}:n}},Co.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ao.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(z(t,n[t]));return this}return this.each(z(n,t))},Co.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=T(n)).length,i=-1;if(t=e.classList){for(;++i<r;)if(!t.contains(n[i]))return!1}else for(t=e.getAttribute("class");++i<r;)if(!q(n[i]).test(t))return!1;return!0}for(t in n)this.each(R(t,n[t]));return this}return this.each(R(n,t))},Co.style=function(n,e,r){var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(e="");for(r in n)this.each(P(r,n[r],e));return this}if(2>i){var u=this.node();return t(u).getComputedStyle(u,null).getPropertyValue(n)}r=""}return this.each(P(n,e,r))},Co.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(U(t,n[t]));return this}return this.each(U(n,t))},Co.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},Co.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},Co.append=function(n){return n=j(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},Co.insert=function(n,t){return n=j(n),t=A(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},Co.remove=function(){return this.each(F)},Co.data=function(n,t){function e(n,e){var r,i,u,o=n.length,s=e.length,h=Math.min(o,s),p=new Array(s),g=new Array(s),v=new Array(o);if(t){var d,y=new c,m=new Array(o);for(r=-1;++r<o;)(i=n[r])&&(y.has(d=t.call(i,i.__data__,r))?v[r]=i:y.set(d,i),m[r]=d);for(r=-1;++r<s;)(i=y.get(d=t.call(e,u=e[r],r)))?i!==!0&&(p[r]=i,i.__data__=u):g[r]=H(u),y.set(d,!0);for(r=-1;++r<o;)r in m&&y.get(m[r])!==!0&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],u=e[r],i?(i.__data__=u,p[r]=i):g[r]=H(u);for(;s>r;++r)g[r]=H(e[r]);for(;o>r;++r)v[r]=n[r]}g.update=p,g.parentNode=p.parentNode=v.parentNode=n.parentNode,a.push(g),l.push(p),f.push(v)}var r,i,u=-1,o=this.length;if(!arguments.length){for(n=new Array(o=(r=this[0]).length);++u<o;)(i=r[u])&&(n[u]=i.__data__);return n}var a=Z([]),l=E([]),f=E([]);if("function"==typeof n)for(;++u<o;)e(r=this[u],n.call(r,r.parentNode.__data__,u));else for(;++u<o;)e(r=this[u],n);return l.enter=function(){return a},l.exit=function(){return f},l},Co.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},Co.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]),t.parentNode=(e=this[u]).parentNode;for(var a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return E(i)},Co.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],i=r.length-1,u=r[i];--i>=0;)(e=r[i])&&(u&&u!==e.nextSibling&&u.parentNode.insertBefore(e,u),u=e);return this},Co.sort=function(n){n=I.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},Co.each=function(n){return Y(this,function(t,e,r){n.call(t,t.__data__,e,r)})},Co.call=function(n){var t=co(arguments);return n.apply(t[0]=this,t),this},Co.empty=function(){return!this.node()},Co.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,i=e.length;i>r;r++){var u=e[r];if(u)return u}return null},Co.size=function(){var n=0;return Y(this,function(){++n}),n};var qo=[];ao.selection.enter=Z,ao.selection.enter.prototype=qo,qo.append=Co.append,qo.empty=Co.empty,qo.node=Co.node,qo.call=Co.call,qo.size=Co.size,qo.select=function(n){for(var t,e,r,i,u,o=[],a=-1,l=this.length;++a<l;){r=(i=this[a]).update,o.push(t=[]),t.parentNode=i.parentNode;for(var c=-1,f=i.length;++c<f;)(u=i[c])?(t.push(r[c]=e=n.call(i.parentNode,u.__data__,c,a)),e.__data__=u.__data__):t.push(null)}return E(o)},qo.insert=function(n,t){return arguments.length<2&&(t=V(this)),Co.insert.call(this,n,t)},ao.select=function(t){var e;return"string"==typeof t?(e=[No(t,fo)],e.parentNode=fo.documentElement):(e=[t],e.parentNode=n(t)),E([e])},ao.selectAll=function(n){var t;return"string"==typeof n?(t=co(Eo(n,fo)),t.parentNode=fo.documentElement):(t=co(n),t.parentNode=null),E([t])},Co.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(X(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(X(n,t,e))};var To=ao.map({mouseenter:"mouseover",mouseleave:"mouseout"});fo&&To.forEach(function(n){"on"+n in fo&&To.remove(n)});var Ro,Do=0;ao.mouse=function(n){return J(n,k())};var Po=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1:0;ao.touch=function(n,t,e){if(arguments.length<3&&(e=t,t=k().changedTouches),t)for(var r,i=0,u=t.length;u>i;++i)if((r=t[i]).identifier===e)return J(n,r)},ao.behavior.drag=function(){function n(){this.on("mousedown.drag",u).on("touchstart.drag",o)}function e(n,t,e,u,o){return function(){function a(){var n,e,r=t(h,v);r&&(n=r[0]-M[0],e=r[1]-M[1],g|=n|e,M=r,p({type:"drag",x:r[0]+c[0],y:r[1]+c[1],dx:n,dy:e}))}function l(){t(h,v)&&(y.on(u+d,null).on(o+d,null),m(g),p({type:"dragend"}))}var c,f=this,s=ao.event.target.correspondingElement||ao.event.target,h=f.parentNode,p=r.of(f,arguments),g=0,v=n(),d=".drag"+(null==v?"":"-"+v),y=ao.select(e(s)).on(u+d,a).on(o+d,l),m=W(s),M=t(h,v);i?(c=i.apply(f,arguments),c=[c.x-M[0],c.y-M[1]]):c=[0,0],p({type:"dragstart"})}}var r=N(n,"drag","dragstart","dragend"),i=null,u=e(b,ao.mouse,t,"mousemove","mouseup"),o=e(G,ao.touch,m,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},ao.rebind(n,r,"on")},ao.touches=function(n,t){return arguments.length<2&&(t=k().touches),t?co(t).map(function(t){var e=J(n,t);return e.identifier=t.identifier,e}):[]};var Uo=1e-6,jo=Uo*Uo,Fo=Math.PI,Ho=2*Fo,Oo=Ho-Uo,Io=Fo/2,Yo=Fo/180,Zo=180/Fo,Vo=Math.SQRT2,Xo=2,$o=4;ao.interpolateZoom=function(n,t){var e,r,i=n[0],u=n[1],o=n[2],a=t[0],l=t[1],c=t[2],f=a-i,s=l-u,h=f*f+s*s;if(jo>h)r=Math.log(c/o)/Vo,e=function(n){return[i+n*f,u+n*s,o*Math.exp(Vo*n*r)]};else{var p=Math.sqrt(h),g=(c*c-o*o+$o*h)/(2*o*Xo*p),v=(c*c-o*o-$o*h)/(2*c*Xo*p),d=Math.log(Math.sqrt(g*g+1)-g),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-d)/Vo,e=function(n){var t=n*r,e=rn(d),a=o/(Xo*p)*(e*un(Vo*t+d)-en(d));return[i+a*f,u+a*s,o*e/rn(Vo*t+d)]}}return e.duration=1e3*r,e},ao.behavior.zoom=function(){function n(n){n.on(L,s).on(Wo+".zoom",p).on("dblclick.zoom",g).on(R,h)}function e(n){return[(n[0]-k.x)/k.k,(n[1]-k.y)/k.k]}function r(n){return[n[0]*k.k+k.x,n[1]*k.k+k.y]}function i(n){k.k=Math.max(A[0],Math.min(A[1],n))}function u(n,t){t=r(t),k.x+=n[0]-t[0],k.y+=n[1]-t[1]}function o(t,e,r,o){t.__chart__={x:k.x,y:k.y,k:k.k},i(Math.pow(2,o)),u(d=e,r),t=ao.select(t),C>0&&(t=t.transition().duration(C)),t.call(n.event)}function a(){b&&b.domain(x.range().map(function(n){return(n-k.x)/k.k}).map(x.invert)),w&&w.domain(_.range().map(function(n){return(n-k.y)/k.k}).map(_.invert))}function l(n){z++||n({type:"zoomstart"})}function c(n){a(),n({type:"zoom",scale:k.k,translate:[k.x,k.y]})}function f(n){--z||(n({type:"zoomend"}),d=null)}function s(){function n(){a=1,u(ao.mouse(i),h),c(o)}function r(){s.on(q,null).on(T,null),p(a),f(o)}var i=this,o=D.of(i,arguments),a=0,s=ao.select(t(i)).on(q,n).on(T,r),h=e(ao.mouse(i)),p=W(i);Il.call(i),l(o)}function h(){function n(){var n=ao.touches(g);return p=k.k,n.forEach(function(n){n.identifier in d&&(d[n.identifier]=e(n))}),n}function t(){var t=ao.event.target;ao.select(t).on(x,r).on(b,a),_.push(t);for(var e=ao.event.changedTouches,i=0,u=e.length;u>i;++i)d[e[i].identifier]=null;var l=n(),c=Date.now();if(1===l.length){if(500>c-M){var f=l[0];o(g,f,d[f.identifier],Math.floor(Math.log(k.k)/Math.LN2)+1),S()}M=c}else if(l.length>1){var f=l[0],s=l[1],h=f[0]-s[0],p=f[1]-s[1];y=h*h+p*p}}function r(){var n,t,e,r,o=ao.touches(g);Il.call(g);for(var a=0,l=o.length;l>a;++a,r=null)if(e=o[a],r=d[e.identifier]){if(t)break;n=e,t=r}if(r){var f=(f=e[0]-n[0])*f+(f=e[1]-n[1])*f,s=y&&Math.sqrt(f/y);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+r[0])/2,(t[1]+r[1])/2],i(s*p)}M=null,u(n,t),c(v)}function a(){if(ao.event.touches.length){for(var t=ao.event.changedTouches,e=0,r=t.length;r>e;++e)delete d[t[e].identifier];for(var i in d)return void n()}ao.selectAll(_).on(m,null),w.on(L,s).on(R,h),N(),f(v)}var p,g=this,v=D.of(g,arguments),d={},y=0,m=".zoom-"+ao.event.changedTouches[0].identifier,x="touchmove"+m,b="touchend"+m,_=[],w=ao.select(g),N=W(g);t(),l(v),w.on(L,null).on(R,t)}function p(){var n=D.of(this,arguments);m?clearTimeout(m):(Il.call(this),v=e(d=y||ao.mouse(this)),l(n)),m=setTimeout(function(){m=null,f(n)},50),S(),i(Math.pow(2,.002*Bo())*k.k),u(d,v),c(n)}function g(){var n=ao.mouse(this),t=Math.log(k.k)/Math.LN2;o(this,n,e(n),ao.event.shiftKey?Math.ceil(t)-1:Math.floor(t)+1)}var v,d,y,m,M,x,b,_,w,k={x:0,y:0,k:1},E=[960,500],A=Jo,C=250,z=0,L="mousedown.zoom",q="mousemove.zoom",T="mouseup.zoom",R="touchstart.zoom",D=N(n,"zoomstart","zoom","zoomend");return Wo||(Wo="onwheel"in fo?(Bo=function(){return-ao.event.deltaY*(ao.event.deltaMode?120:1)},"wheel"):"onmousewheel"in fo?(Bo=function(){return ao.event.wheelDelta},"mousewheel"):(Bo=function(){return-ao.event.detail},"MozMousePixelScroll")),n.event=function(n){n.each(function(){var n=D.of(this,arguments),t=k;Hl?ao.select(this).transition().each("start.zoom",function(){k=this.__chart__||{x:0,y:0,k:1},l(n)}).tween("zoom:zoom",function(){var e=E[0],r=E[1],i=d?d[0]:e/2,u=d?d[1]:r/2,o=ao.interpolateZoom([(i-k.x)/k.k,(u-k.y)/k.k,e/k.k],[(i-t.x)/t.k,(u-t.y)/t.k,e/t.k]);return function(t){var r=o(t),a=e/r[2];this.__chart__=k={x:i-r[0]*a,y:u-r[1]*a,k:a},c(n)}}).each("interrupt.zoom",function(){f(n)}).each("end.zoom",function(){f(n)}):(this.__chart__=k,l(n),c(n),f(n))})},n.translate=function(t){return arguments.length?(k={x:+t[0],y:+t[1],k:k.k},a(),n):[k.x,k.y]},n.scale=function(t){return arguments.length?(k={x:k.x,y:k.y,k:null},i(+t),a(),n):k.k},n.scaleExtent=function(t){return arguments.length?(A=null==t?Jo:[+t[0],+t[1]],n):A},n.center=function(t){return arguments.length?(y=t&&[+t[0],+t[1]],n):y},n.size=function(t){return arguments.length?(E=t&&[+t[0],+t[1]],n):E},n.duration=function(t){return arguments.length?(C=+t,n):C},n.x=function(t){return arguments.length?(b=t,x=t.copy(),k={x:0,y:0,k:1},n):b},n.y=function(t){return arguments.length?(w=t,_=t.copy(),k={x:0,y:0,k:1},n):w},ao.rebind(n,D,"on")};var Bo,Wo,Jo=[0,1/0];ao.color=an,an.prototype.toString=function(){return this.rgb()+""},ao.hsl=ln;var Go=ln.prototype=new an;Go.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,this.l/n)},Go.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,n*this.l)},Go.rgb=function(){return cn(this.h,this.s,this.l)},ao.hcl=fn;var Ko=fn.prototype=new an;Ko.brighter=function(n){return new fn(this.h,this.c,Math.min(100,this.l+Qo*(arguments.length?n:1)))},Ko.darker=function(n){return new fn(this.h,this.c,Math.max(0,this.l-Qo*(arguments.length?n:1)))},Ko.rgb=function(){return sn(this.h,this.c,this.l).rgb()},ao.lab=hn;var Qo=18,na=.95047,ta=1,ea=1.08883,ra=hn.prototype=new an;ra.brighter=function(n){return new hn(Math.min(100,this.l+Qo*(arguments.length?n:1)),this.a,this.b)},ra.darker=function(n){return new hn(Math.max(0,this.l-Qo*(arguments.length?n:1)),this.a,this.b)},ra.rgb=function(){return pn(this.l,this.a,this.b)},ao.rgb=mn;var ia=mn.prototype=new an;ia.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,i=30;return t||e||r?(t&&i>t&&(t=i),e&&i>e&&(e=i),r&&i>r&&(r=i),new mn(Math.min(255,t/n),Math.min(255,e/n),Math.min(255,r/n))):new mn(i,i,i)},ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new mn(n*this.r,n*this.g,n*this.b)},ia.hsl=function(){return wn(this.r,this.g,this.b)},ia.toString=function(){return"#"+bn(this.r)+bn(this.g)+bn(this.b)};var ua=ao.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});ua.forEach(function(n,t){ua.set(n,Mn(t))}),ao.functor=En,ao.xhr=An(m),ao.dsv=function(n,t){function e(n,e,u){arguments.length<3&&(u=e,e=null);var o=Cn(n,t,null==e?r:i(e),u);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:i(n)):e},o}function r(n){return e.parse(n.responseText)}function i(n){return function(t){return e.parse(t.responseText,n)}}function u(t){return t.map(o).join(n)}function o(n){return a.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var a=new RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var i=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(i(n),e)}:i})},e.parseRows=function(n,t){function e(){if(f>=c)return o;if(i)return i=!1,u;var t=f;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(i=!0,10===n.charCodeAt(e+2)&&++f):10===r&&(i=!0),n.slice(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),a=1;if(10===r)i=!0;else if(13===r)i=!0,10===n.charCodeAt(f)&&(++f,++a);else if(r!==l)continue;return n.slice(t,f-a)}return n.slice(t)}for(var r,i,u={},o={},a=[],c=n.length,f=0,s=0;(r=e())!==o;){for(var h=[];r!==u&&r!==o;)h.push(r),r=e();t&&null==(h=t(h,s++))||a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new y,i=[];return t.forEach(function(n){for(var t in n)r.has(t)||i.push(r.add(t))}),[i.map(o).join(n)].concat(t.map(function(t){return i.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(u).join("\n")},e},ao.csv=ao.dsv(",","text/csv"),ao.tsv=ao.dsv("	","text/tab-separated-values");var oa,aa,la,ca,fa=this[x(this,"requestAnimationFrame")]||function(n){setTimeout(n,17)};ao.timer=function(){qn.apply(this,arguments)},ao.timer.flush=function(){Rn(),Dn()},ao.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)};var sa=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(Un);ao.formatPrefix=function(n,t){var e=0;return(n=+n)&&(0>n&&(n*=-1),t&&(n=ao.round(n,Pn(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((e-1)/3)))),sa[8+e/3]};var ha=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,pa=ao.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ao.round(n,Pn(n,t))).toFixed(Math.max(0,Math.min(20,Pn(n*(1+1e-15),t))))}}),ga=ao.time={},va=Date;Hn.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){da.setUTCDate.apply(this._,arguments)},setDay:function(){da.setUTCDay.apply(this._,arguments)},setFullYear:function(){da.setUTCFullYear.apply(this._,arguments)},setHours:function(){da.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){da.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){da.setUTCMinutes.apply(this._,arguments)},setMonth:function(){da.setUTCMonth.apply(this._,arguments)},setSeconds:function(){da.setUTCSeconds.apply(this._,arguments)},setTime:function(){da.setTime.apply(this._,arguments)}};var da=Date.prototype;ga.year=On(function(n){return n=ga.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ga.years=ga.year.range,ga.years.utc=ga.year.utc.range,ga.day=On(function(n){var t=new va(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ga.days=ga.day.range,ga.days.utc=ga.day.utc.range,ga.dayOfYear=function(n){var t=ga.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(n,t){t=7-t;var e=ga[n]=On(function(n){return(n=ga.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ga[n+"s"]=e.range,ga[n+"s"].utc=e.utc.range,ga[n+"OfYear"]=function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)}}),ga.week=ga.sunday,ga.weeks=ga.sunday.range,ga.weeks.utc=ga.sunday.utc.range,ga.weekOfYear=ga.sundayOfYear;var ya={"-":"",_:" ",0:"0"},ma=/^\s*\d+/,Ma=/^%/;ao.locale=function(n){return{numberFormat:jn(n),timeFormat:Yn(n)}};var xa=ao.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});ao.format=xa.numberFormat,ao.geo={},ft.prototype={s:0,t:0,add:function(n){st(n,this.t,ba),st(ba.s,this.s,this),this.s?this.t+=ba.t:this.s=ba.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var ba=new ft;ao.geo.stream=function(n,t){n&&_a.hasOwnProperty(n.type)?_a[n.type](n,t):ht(n,t)};var _a={Feature:function(n,t){ht(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,i=e.length;++r<i;)ht(e[r].geometry,t)}},wa={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){pt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)pt(e[r],t,0)},Polygon:function(n,t){gt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)gt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,i=e.length;++r<i;)ht(e[r],t)}};ao.geo.area=function(n){return Sa=0,ao.geo.stream(n,Na),Sa};var Sa,ka=new ft,Na={sphere:function(){Sa+=4*Fo},point:b,lineStart:b,lineEnd:b,polygonStart:function(){ka.reset(),Na.lineStart=vt},polygonEnd:function(){var n=2*ka;Sa+=0>n?4*Fo+n:n,Na.lineStart=Na.lineEnd=Na.point=b}};ao.geo.bounds=function(){function n(n,t){M.push(x=[f=n,h=n]),s>t&&(s=t),t>p&&(p=t)}function t(t,e){var r=dt([t*Yo,e*Yo]);if(y){var i=mt(y,r),u=[i[1],-i[0],0],o=mt(u,i);bt(o),o=_t(o);var l=t-g,c=l>0?1:-1,v=o[0]*Zo*c,d=xo(l)>180;if(d^(v>c*g&&c*t>v)){var m=o[1]*Zo;m>p&&(p=m)}else if(v=(v+360)%360-180,d^(v>c*g&&c*t>v)){var m=-o[1]*Zo;s>m&&(s=m)}else s>e&&(s=e),e>p&&(p=e);d?g>t?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t):h>=f?(f>t&&(f=t),t>h&&(h=t)):t>g?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t)}else n(t,e);y=r,g=t}function e(){b.point=t}function r(){x[0]=f,x[1]=h,b.point=n,y=null}function i(n,e){if(y){var r=n-g;m+=xo(r)>180?r+(r>0?360:-360):r}else v=n,d=e;Na.point(n,e),t(n,e)}function u(){Na.lineStart()}function o(){i(v,d),Na.lineEnd(),xo(m)>Uo&&(f=-(h=180)),x[0]=f,x[1]=h,y=null}function a(n,t){return(t-=n)<0?t+360:t}function l(n,t){return n[0]-t[0]}function c(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var f,s,h,p,g,v,d,y,m,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=i,b.lineStart=u,b.lineEnd=o,m=0,Na.polygonStart()},polygonEnd:function(){Na.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>ka?(f=-(h=180),s=-(p=90)):m>Uo?p=90:-Uo>m&&(s=-90),x[0]=f,x[1]=h}};return function(n){p=h=-(f=s=1/0),M=[],ao.geo.stream(n,b);var t=M.length;if(t){M.sort(l);for(var e,r=1,i=M[0],u=[i];t>r;++r)e=M[r],c(e[0],i)||c(e[1],i)?(a(i[0],e[1])>a(i[0],i[1])&&(i[1]=e[1]),a(e[0],i[1])>a(i[0],i[1])&&(i[0]=e[0])):u.push(i=e);for(var o,e,g=-(1/0),t=u.length-1,r=0,i=u[t];t>=r;i=e,++r)e=u[r],(o=a(i[1],e[0]))>g&&(g=o,f=e[0],h=i[1])}return M=x=null,f===1/0||s===1/0?[[NaN,NaN],[NaN,NaN]]:[[f,s],[h,p]]}}(),ao.geo.centroid=function(n){Ea=Aa=Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,ja);var t=Da,e=Pa,r=Ua,i=t*t+e*e+r*r;return jo>i&&(t=qa,e=Ta,r=Ra,Uo>Aa&&(t=Ca,e=za,r=La),i=t*t+e*e+r*r,jo>i)?[NaN,NaN]:[Math.atan2(e,t)*Zo,tn(r/Math.sqrt(i))*Zo]};var Ea,Aa,Ca,za,La,qa,Ta,Ra,Da,Pa,Ua,ja={sphere:b,point:St,lineStart:Nt,lineEnd:Et,polygonStart:function(){ja.lineStart=At},polygonEnd:function(){ja.lineStart=Nt}},Fa=Rt(zt,jt,Ht,[-Fo,-Fo/2]),Ha=1e9;ao.geo.clipExtent=function(){var n,t,e,r,i,u,o={stream:function(n){return i&&(i.valid=!1),i=u(n),i.valid=!0,i},extent:function(a){return arguments.length?(u=Zt(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),i&&(i.valid=!1,i=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(ao.geo.conicEqualArea=function(){return Vt(Xt)}).raw=Xt,ao.geo.albers=function(){return ao.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},ao.geo.albersUsa=function(){function n(n){var u=n[0],o=n[1];return t=null,e(u,o),t||(r(u,o),t)||i(u,o),t}var t,e,r,i,u=ao.geo.albers(),o=ao.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=ao.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=u.scale(),e=u.translate(),r=(n[0]-e[0])/t,i=(n[1]-e[1])/t;return(i>=.12&&.234>i&&r>=-.425&&-.214>r?o:i>=.166&&.234>i&&r>=-.214&&-.115>r?a:u).invert(n)},n.stream=function(n){var t=u.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,i){t.point(n,i),e.point(n,i),r.point(n,i)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(u.precision(t),o.precision(t),a.precision(t),n):u.precision()},n.scale=function(t){return arguments.length?(u.scale(t),o.scale(.35*t),a.scale(t),n.translate(u.translate())):u.scale()},n.translate=function(t){if(!arguments.length)return u.translate();var c=u.scale(),f=+t[0],s=+t[1];return e=u.translate(t).clipExtent([[f-.455*c,s-.238*c],[f+.455*c,s+.238*c]]).stream(l).point,r=o.translate([f-.307*c,s+.201*c]).clipExtent([[f-.425*c+Uo,s+.12*c+Uo],[f-.214*c-Uo,s+.234*c-Uo]]).stream(l).point,i=a.translate([f-.205*c,s+.212*c]).clipExtent([[f-.214*c+Uo,s+.166*c+Uo],[f-.115*c-Uo,s+.234*c-Uo]]).stream(l).point,n},n.scale(1070)};var Oa,Ia,Ya,Za,Va,Xa,$a={point:b,lineStart:b,lineEnd:b,polygonStart:function(){Ia=0,$a.lineStart=$t},polygonEnd:function(){$a.lineStart=$a.lineEnd=$a.point=b,Oa+=xo(Ia/2)}},Ba={point:Bt,lineStart:b,lineEnd:b,polygonStart:b,polygonEnd:b},Wa={point:Gt,lineStart:Kt,lineEnd:Qt,polygonStart:function(){Wa.lineStart=ne},polygonEnd:function(){Wa.point=Gt,Wa.lineStart=Kt,Wa.lineEnd=Qt}};ao.geo.path=function(){function n(n){return n&&("function"==typeof a&&u.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=i(u)),ao.geo.stream(n,o)),u.result()}function t(){return o=null,n}var e,r,i,u,o,a=4.5;return n.area=function(n){return Oa=0,ao.geo.stream(n,i($a)),Oa},n.centroid=function(n){return Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,i(Wa)),Ua?[Da/Ua,Pa/Ua]:Ra?[qa/Ra,Ta/Ra]:La?[Ca/La,za/La]:[NaN,NaN]},n.bounds=function(n){return Va=Xa=-(Ya=Za=1/0),ao.geo.stream(n,i(Ba)),[[Ya,Za],[Va,Xa]]},n.projection=function(n){return arguments.length?(i=(e=n)?n.stream||re(n):m,t()):e},n.context=function(n){return arguments.length?(u=null==(r=n)?new Wt:new te(n),"function"!=typeof a&&u.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(u.pointRadius(+t),+t),n):a},n.projection(ao.geo.albersUsa()).context(null)},ao.geo.transform=function(n){return{stream:function(t){var e=new ie(t);for(var r in n)e[r]=n[r];return e}}},ie.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},ao.geo.projection=oe,ao.geo.projectionMutator=ae,(ao.geo.equirectangular=function(){return oe(ce)}).raw=ce.invert=ce,ao.geo.rotation=function(n){function t(t){return t=n(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t}return n=se(n[0]%360*Yo,n[1]*Yo,n.length>2?n[2]*Yo:0),t.invert=function(t){return t=n.invert(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t},t},fe.invert=ce,ao.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=se(-n[0]*Yo,-n[1]*Yo,0).invert,i=[];return e(null,null,1,{point:function(n,e){i.push(n=t(n,e)),n[0]*=Zo,n[1]*=Zo}}),{type:"Polygon",coordinates:[i]}}var t,e,r=[0,0],i=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=ve((t=+r)*Yo,i*Yo),n):t},n.precision=function(r){return arguments.length?(e=ve(t*Yo,(i=+r)*Yo),n):i},n.angle(90)},ao.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Yo,i=n[1]*Yo,u=t[1]*Yo,o=Math.sin(r),a=Math.cos(r),l=Math.sin(i),c=Math.cos(i),f=Math.sin(u),s=Math.cos(u);return Math.atan2(Math.sqrt((e=s*o)*e+(e=c*f-l*s*a)*e),l*f+c*s*a)},ao.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ao.range(Math.ceil(u/d)*d,i,d).map(h).concat(ao.range(Math.ceil(c/y)*y,l,y).map(p)).concat(ao.range(Math.ceil(r/g)*g,e,g).filter(function(n){return xo(n%d)>Uo}).map(f)).concat(ao.range(Math.ceil(a/v)*v,o,v).filter(function(n){return xo(n%y)>Uo}).map(s))}var e,r,i,u,o,a,l,c,f,s,h,p,g=10,v=g,d=90,y=360,m=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(u).concat(p(l).slice(1),h(i).reverse().slice(1),p(c).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(u=+t[0][0],i=+t[1][0],c=+t[0][1],l=+t[1][1],u>i&&(t=u,u=i,i=t),c>l&&(t=c,c=l,l=t),n.precision(m)):[[u,c],[i,l]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(m)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],y=+t[1],n):[d,y]},n.minorStep=function(t){return arguments.length?(g=+t[0],v=+t[1],n):[g,v]},n.precision=function(t){return arguments.length?(m=+t,f=ye(a,o,90),s=me(r,e,m),h=ye(c,l,90),p=me(u,i,m),n):m},n.majorExtent([[-180,-90+Uo],[180,90-Uo]]).minorExtent([[-180,-80-Uo],[180,80+Uo]])},ao.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||i.apply(this,arguments)]}}var t,e,r=Me,i=xe;return n.distance=function(){return ao.geo.distance(t||r.apply(this,arguments),e||i.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(i=t,e="function"==typeof t?null:t,n):i},n.precision=function(){return arguments.length?n:0},n},ao.geo.interpolate=function(n,t){return be(n[0]*Yo,n[1]*Yo,t[0]*Yo,t[1]*Yo)},ao.geo.length=function(n){return Ja=0,ao.geo.stream(n,Ga),Ja};var Ja,Ga={sphere:b,point:b,lineStart:_e,lineEnd:b,polygonStart:b,polygonEnd:b},Ka=we(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ao.geo.azimuthalEqualArea=function(){return oe(Ka)}).raw=Ka;var Qa=we(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},m);(ao.geo.azimuthalEquidistant=function(){return oe(Qa)}).raw=Qa,(ao.geo.conicConformal=function(){return Vt(Se)}).raw=Se,(ao.geo.conicEquidistant=function(){return Vt(ke)}).raw=ke;var nl=we(function(n){return 1/n},Math.atan);(ao.geo.gnomonic=function(){return oe(nl)}).raw=nl,Ne.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Io]},(ao.geo.mercator=function(){return Ee(Ne)}).raw=Ne;var tl=we(function(){return 1},Math.asin);(ao.geo.orthographic=function(){return oe(tl)}).raw=tl;var el=we(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ao.geo.stereographic=function(){return oe(el)}).raw=el,Ae.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Io]},(ao.geo.transverseMercator=function(){var n=Ee(Ae),t=n.center,e=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[n[1],-n[0]])},n.rotate=function(n){return n?e([n[0],n[1],n.length>2?n[2]+90:90]):(n=e(),[n[0],n[1],n[2]-90])},e([0,0,90])}).raw=Ae,ao.geom={},ao.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,i=En(e),u=En(r),o=n.length,a=[],l=[];for(t=0;o>t;t++)a.push([+i.call(this,n[t],t),+u.call(this,n[t],t),t]);for(a.sort(qe),t=0;o>t;t++)l.push([a[t][0],-a[t][1]]);var c=Le(a),f=Le(l),s=f[0]===c[0],h=f[f.length-1]===c[c.length-1],p=[];for(t=c.length-1;t>=0;--t)p.push(n[a[c[t]][2]]);for(t=+s;t<f.length-h;++t)p.push(n[a[f[t]][2]]);return p}var e=Ce,r=ze;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ao.geom.polygon=function(n){return ko(n,rl),n};var rl=ao.geom.polygon.prototype=[];rl.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],i=0;++t<e;)n=r,r=this[t],i+=n[1]*r[0]-n[0]*r[1];return.5*i},rl.centroid=function(n){var t,e,r=-1,i=this.length,u=0,o=0,a=this[i-1];for(arguments.length||(n=-1/(6*this.area()));++r<i;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],u+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[u*n,o*n]},rl.clip=function(n){for(var t,e,r,i,u,o,a=De(n),l=-1,c=this.length-De(this),f=this[c-1];++l<c;){for(t=n.slice(),n.length=0,i=this[l],u=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Te(o,f,i)?(Te(u,f,i)||n.push(Re(u,o,f,i)),n.push(o)):Te(u,f,i)&&n.push(Re(u,o,f,i)),u=o;a&&n.push(n[0]),f=i}return n};var il,ul,ol,al,ll,cl=[],fl=[];Ye.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(Ve),t.length},tr.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},er.prototype={insert:function(n,t){var e,r,i;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=or(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.R&&(ir(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ur(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.L&&(ur(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ir(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,i=n.U,u=n.L,o=n.R;if(e=u?o?or(o):u:o,i?i.L===n?i.L=e:i.R=e:this._=e,u&&o?(r=e.C,e.C=n.C,e.L=u,u.U=e,e!==o?(i=e.U,e.U=n.U,n=e.R,i.L=n,e.R=o,o.U=e):(e.U=i,i=e,n=e.R)):(r=n.C,n=e),n&&(n.U=i),!r){if(n&&n.C)return void(n.C=!1);do{if(n===this._)break;if(n===i.L){if(t=i.R,t.C&&(t.C=!1,i.C=!0,ir(this,i),t=i.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,ur(this,t),t=i.R),t.C=i.C,i.C=t.R.C=!1,ir(this,i),n=this._;break}}else if(t=i.L,t.C&&(t.C=!1,i.C=!0,ur(this,i),t=i.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,ir(this,t),t=i.L),t.C=i.C,i.C=t.L.C=!1,ur(this,i),n=this._;break}t.C=!0,n=i,i=i.U}while(!n.C);n&&(n.C=!1)}}},ao.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],i=a[0][1],u=a[1][0],o=a[1][1];return ar(e(n),a).cells.forEach(function(e,a){var l=e.edges,c=e.site,f=t[a]=l.length?l.map(function(n){var t=n.start();return[t.x,t.y]}):c.x>=r&&c.x<=u&&c.y>=i&&c.y<=o?[[r,o],[u,o],[u,i],[r,i]]:[];f.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(u(n,t)/Uo)*Uo,y:Math.round(o(n,t)/Uo)*Uo,i:t}})}var r=Ce,i=ze,u=r,o=i,a=sl;return n?t(n):(t.links=function(n){return ar(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return ar(e(n)).cells.forEach(function(e,r){for(var i,u,o=e.site,a=e.edges.sort(Ve),l=-1,c=a.length,f=a[c-1].edge,s=f.l===o?f.r:f.l;++l<c;)i=f,u=s,f=a[l].edge,s=f.l===o?f.r:f.l,r<u.i&&r<s.i&&cr(o,u,s)<0&&t.push([n[r],n[u.i],n[s.i]])}),t},t.x=function(n){return arguments.length?(u=En(r=n),t):r},t.y=function(n){return arguments.length?(o=En(i=n),t):i},t.clipExtent=function(n){return arguments.length?(a=null==n?sl:n,t):a===sl?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===sl?null:a&&a[1]},t)};var sl=[[-1e6,-1e6],[1e6,1e6]];ao.geom.delaunay=function(n){return ao.geom.voronoi().triangles(n)},ao.geom.quadtree=function(n,t,e,r,i){function u(n){function u(n,t,e,r,i,u,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var l=n.x,f=n.y;if(null!=l)if(xo(l-e)+xo(f-r)<.01)c(n,t,e,r,i,u,o,a);else{var s=n.point;n.x=n.y=n.point=null,c(n,s,l,f,i,u,o,a),c(n,t,e,r,i,u,o,a)}else n.x=e,n.y=r,n.point=t}else c(n,t,e,r,i,u,o,a)}function c(n,t,e,r,i,o,a,l){var c=.5*(i+a),f=.5*(o+l),s=e>=c,h=r>=f,p=h<<1|s;n.leaf=!1,n=n.nodes[p]||(n.nodes[p]=hr()),s?i=c:a=c,h?o=f:l=f,u(n,t,e,r,i,o,a,l)}var f,s,h,p,g,v,d,y,m,M=En(a),x=En(l);if(null!=t)v=t,d=e,y=r,m=i;else if(y=m=-(v=d=1/0),s=[],h=[],g=n.length,o)for(p=0;g>p;++p)f=n[p],f.x<v&&(v=f.x),f.y<d&&(d=f.y),f.x>y&&(y=f.x),f.y>m&&(m=f.y),s.push(f.x),h.push(f.y);else for(p=0;g>p;++p){var b=+M(f=n[p],p),_=+x(f,p);v>b&&(v=b),d>_&&(d=_),b>y&&(y=b),_>m&&(m=_),s.push(b),h.push(_)}var w=y-v,S=m-d;w>S?m=d+w:y=v+S;var k=hr();if(k.add=function(n){u(k,n,+M(n,++p),+x(n,p),v,d,y,m)},k.visit=function(n){pr(n,k,v,d,y,m)},k.find=function(n){return gr(k,n[0],n[1],v,d,y,m)},p=-1,null==t){for(;++p<g;)u(k,n[p],s[p],h[p],v,d,y,m);--p}else n.forEach(k.add);return s=h=n=f=null,k}var o,a=Ce,l=ze;return(o=arguments.length)?(a=fr,l=sr,3===o&&(i=e,r=t,e=t=0),u(n)):(u.x=function(n){return arguments.length?(a=n,u):a},u.y=function(n){return arguments.length?(l=n,u):l},u.extent=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],i=+n[1][1]),u):null==t?null:[[t,e],[r,i]]},u.size=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=e=0,r=+n[0],i=+n[1]),u):null==t?null:[r-t,i-e]},u)},ao.interpolateRgb=vr,ao.interpolateObject=dr,ao.interpolateNumber=yr,ao.interpolateString=mr;var hl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pl=new RegExp(hl.source,"g");ao.interpolate=Mr,ao.interpolators=[function(n,t){var e=typeof t;return("string"===e?ua.has(t.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(t)?vr:mr:t instanceof an?vr:Array.isArray(t)?xr:"object"===e&&isNaN(t)?dr:yr)(n,t)}],ao.interpolateArray=xr;var gl=function(){return m},vl=ao.map({linear:gl,poly:Er,quad:function(){return Sr},cubic:function(){return kr},sin:function(){return Ar},exp:function(){return Cr},circle:function(){return zr},elastic:Lr,back:qr,bounce:function(){return Tr}}),dl=ao.map({"in":m,out:_r,"in-out":wr,"out-in":function(n){return wr(_r(n))}});ao.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.slice(0,t):n,r=t>=0?n.slice(t+1):"in";return e=vl.get(e)||gl,r=dl.get(r)||m,br(r(e.apply(null,lo.call(arguments,1))))},ao.interpolateHcl=Rr,ao.interpolateHsl=Dr,ao.interpolateLab=Pr,ao.interpolateRound=Ur,ao.transform=function(n){var t=fo.createElementNS(ao.ns.prefix.svg,"g");return(ao.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new jr(e?e.matrix:yl)})(n)},jr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var yl={a:1,b:0,c:0,d:1,e:0,f:0};ao.interpolateTransform=$r,ao.layout={},ao.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Jr(n[e]));return t}},ao.layout.chord=function(){function n(){var n,c,s,h,p,g={},v=[],d=ao.range(u),y=[];for(e=[],r=[],n=0,h=-1;++h<u;){for(c=0,p=-1;++p<u;)c+=i[h][p];v.push(c),y.push(ao.range(u)),n+=c}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&y.forEach(function(n,t){n.sort(function(n,e){return a(i[t][n],i[t][e])})}),n=(Ho-f*u)/n,c=0,h=-1;++h<u;){for(s=c,p=-1;++p<u;){var m=d[h],M=y[m][p],x=i[m][M],b=c,_=c+=x*n;g[m+"-"+M]={index:m,subindex:M,startAngle:b,endAngle:_,value:x}}r[m]={index:m,startAngle:s,endAngle:c,value:v[m]},c+=f}for(h=-1;++h<u;)for(p=h-1;++p<u;){var w=g[h+"-"+p],S=g[p+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}l&&t()}function t(){e.sort(function(n,t){return l((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,i,u,o,a,l,c={},f=0;return c.matrix=function(n){return arguments.length?(u=(i=n)&&i.length,e=r=null,c):i},c.padding=function(n){return arguments.length?(f=n,e=r=null,c):f},c.sortGroups=function(n){return arguments.length?(o=n,e=r=null,c):o},c.sortSubgroups=function(n){return arguments.length?(a=n,e=null,c):a},c.sortChords=function(n){return arguments.length?(l=n,e&&t(),c):l},c.chords=function(){return e||n(),e},c.groups=function(){return r||n(),r},c},ao.layout.force=function(){function n(n){return function(t,e,r,i){if(t.point!==n){var u=t.cx-n.x,o=t.cy-n.y,a=i-e,l=u*u+o*o;if(l>a*a/y){if(v>l){var c=t.charge/l;n.px-=u*c,n.py-=o*c}return!0}if(t.point&&l&&v>l){var c=t.pointCharge/l;n.px-=u*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=ao.event.x,n.py=ao.event.y,l.resume()}var e,r,i,u,o,a,l={},c=ao.dispatch("start","tick","end"),f=[1,1],s=.9,h=ml,p=Ml,g=-30,v=xl,d=.1,y=.64,M=[],x=[];return l.tick=function(){if((i*=.99)<.005)return e=null,c.end({type:"end",alpha:i=0}),!0;var t,r,l,h,p,v,y,m,b,_=M.length,w=x.length;for(r=0;w>r;++r)l=x[r],h=l.source,p=l.target,m=p.x-h.x,b=p.y-h.y,(v=m*m+b*b)&&(v=i*o[r]*((v=Math.sqrt(v))-u[r])/v,m*=v,b*=v,p.x-=m*(y=h.weight+p.weight?h.weight/(h.weight+p.weight):.5),p.y-=b*y,h.x+=m*(y=1-y),h.y+=b*y);if((y=i*d)&&(m=f[0]/2,b=f[1]/2,r=-1,y))for(;++r<_;)l=M[r],l.x+=(m-l.x)*y,l.y+=(b-l.y)*y;if(g)for(ri(t=ao.geom.quadtree(M),i,a),r=-1;++r<_;)(l=M[r]).fixed||t.visit(n(l));for(r=-1;++r<_;)l=M[r],l.fixed?(l.x=l.px,l.y=l.py):(l.x-=(l.px-(l.px=l.x))*s,l.y-=(l.py-(l.py=l.y))*s);c.tick({type:"tick",alpha:i})},l.nodes=function(n){return arguments.length?(M=n,l):M},l.links=function(n){return arguments.length?(x=n,l):x},l.size=function(n){return arguments.length?(f=n,l):f},l.linkDistance=function(n){return arguments.length?(h="function"==typeof n?n:+n,l):h},l.distance=l.linkDistance,l.linkStrength=function(n){return arguments.length?(p="function"==typeof n?n:+n,l):p},l.friction=function(n){return arguments.length?(s=+n,l):s},l.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,l):g},l.chargeDistance=function(n){return arguments.length?(v=n*n,l):Math.sqrt(v)},l.gravity=function(n){return arguments.length?(d=+n,l):d},l.theta=function(n){return arguments.length?(y=n*n,l):Math.sqrt(y)},l.alpha=function(n){return arguments.length?(n=+n,i?n>0?i=n:(e.c=null,e.t=NaN,e=null,c.end({type:"end",alpha:i=0})):n>0&&(c.start({type:"start",alpha:i=n}),e=qn(l.tick)),l):i},l.start=function(){function n(n,r){if(!e){for(e=new Array(i),l=0;i>l;++l)e[l]=[];for(l=0;c>l;++l){var u=x[l];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var o,a=e[t],l=-1,f=a.length;++l<f;)if(!isNaN(o=a[l][n]))return o;return Math.random()*r}var t,e,r,i=M.length,c=x.length,s=f[0],v=f[1];for(t=0;i>t;++t)(r=M[t]).index=t,r.weight=0;for(t=0;c>t;++t)r=x[t],"number"==typeof r.source&&(r.source=M[r.source]),"number"==typeof r.target&&(r.target=M[r.target]),++r.source.weight,++r.target.weight;for(t=0;i>t;++t)r=M[t],isNaN(r.x)&&(r.x=n("x",s)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof h)for(t=0;c>t;++t)u[t]=+h.call(this,x[t],t);else for(t=0;c>t;++t)u[t]=h;if(o=[],"function"==typeof p)for(t=0;c>t;++t)o[t]=+p.call(this,x[t],t);else for(t=0;c>t;++t)o[t]=p;if(a=[],"function"==typeof g)for(t=0;i>t;++t)a[t]=+g.call(this,M[t],t);else for(t=0;i>t;++t)a[t]=g;return l.resume()},l.resume=function(){return l.alpha(.1)},l.stop=function(){return l.alpha(0)},l.drag=function(){return r||(r=ao.behavior.drag().origin(m).on("dragstart.force",Qr).on("drag.force",t).on("dragend.force",ni)),arguments.length?void this.on("mouseover.force",ti).on("mouseout.force",ei).call(r):r},ao.rebind(l,c,"on")};var ml=20,Ml=1,xl=1/0;ao.layout.hierarchy=function(){function n(i){var u,o=[i],a=[];for(i.depth=0;null!=(u=o.pop());)if(a.push(u),(c=e.call(n,u,u.depth))&&(l=c.length)){for(var l,c,f;--l>=0;)o.push(f=c[l]),f.parent=u,f.depth=u.depth+1;r&&(u.value=0),u.children=c}else r&&(u.value=+r.call(n,u,u.depth)||0),delete u.children;return oi(i,function(n){var e,i;t&&(e=n.children)&&e.sort(t),r&&(i=n.parent)&&(i.value+=n.value)}),a}var t=ci,e=ai,r=li;return n.sort=function(e){return arguments.length?(t=e,n):t},n.children=function(t){return arguments.length?(e=t,n):e},n.value=function(t){return arguments.length?(r=t,n):r},n.revalue=function(t){return r&&(ui(t,function(n){n.children&&(n.value=0)}),oi(t,function(t){var e;t.children||(t.value=+r.call(n,t,t.depth)||0),(e=t.parent)&&(e.value+=t.value)})),t},n},ao.layout.partition=function(){function n(t,e,r,i){var u=t.children;if(t.x=e,t.y=t.depth*i,t.dx=r,t.dy=i,u&&(o=u.length)){var o,a,l,c=-1;for(r=t.value?r/t.value:0;++c<o;)n(a=u[c],e,l=a.value*r,i),e+=l}}function t(n){var e=n.children,r=0;if(e&&(i=e.length))for(var i,u=-1;++u<i;)r=Math.max(r,t(e[u]));return 1+r}function e(e,u){var o=r.call(this,e,u);return n(o[0],0,i[0],i[1]/t(o[0])),o}var r=ao.layout.hierarchy(),i=[1,1];return e.size=function(n){return arguments.length?(i=n,e):i},ii(e,r)},ao.layout.pie=function(){function n(o){var a,l=o.length,c=o.map(function(e,r){return+t.call(n,e,r)}),f=+("function"==typeof r?r.apply(this,arguments):r),s=("function"==typeof i?i.apply(this,arguments):i)-f,h=Math.min(Math.abs(s)/l,+("function"==typeof u?u.apply(this,arguments):u)),p=h*(0>s?-1:1),g=ao.sum(c),v=g?(s-l*p)/g:0,d=ao.range(l),y=[];return null!=e&&d.sort(e===bl?function(n,t){return c[t]-c[n]}:function(n,t){return e(o[n],o[t])}),d.forEach(function(n){y[n]={data:o[n],value:a=c[n],startAngle:f,endAngle:f+=a*v+p,padAngle:h}}),y}var t=Number,e=bl,r=0,i=Ho,u=0;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(i=t,n):i},n.padAngle=function(t){return arguments.length?(u=t,n):u},n};var bl={};ao.layout.stack=function(){function n(a,l){if(!(h=a.length))return a;var c=a.map(function(e,r){return t.call(n,e,r)}),f=c.map(function(t){return t.map(function(t,e){return[u.call(n,t,e),o.call(n,t,e)]})}),s=e.call(n,f,l);c=ao.permute(c,s),f=ao.permute(f,s);var h,p,g,v,d=r.call(n,f,l),y=c[0].length;for(g=0;y>g;++g)for(i.call(n,c[0][g],v=d[g],f[0][g][1]),p=1;h>p;++p)i.call(n,c[p][g],v+=f[p-1][g][1],f[p][g][1]);return a}var t=m,e=gi,r=vi,i=pi,u=si,o=hi;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:_l.get(t)||gi,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:wl.get(t)||vi,n):r},n.x=function(t){return arguments.length?(u=t,n):u},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(i=t,n):i},n};var _l=ao.map({"inside-out":function(n){var t,e,r=n.length,i=n.map(di),u=n.map(yi),o=ao.range(r).sort(function(n,t){return i[n]-i[t]}),a=0,l=0,c=[],f=[];for(t=0;r>t;++t)e=o[t],l>a?(a+=u[e],c.push(e)):(l+=u[e],f.push(e));return f.reverse().concat(c)},reverse:function(n){return ao.range(n.length).reverse()},"default":gi}),wl=ao.map({silhouette:function(n){var t,e,r,i=n.length,u=n[0].length,o=[],a=0,l=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;u>e;++e)l[e]=(a-o[e])/2;return l},wiggle:function(n){var t,e,r,i,u,o,a,l,c,f=n.length,s=n[0],h=s.length,p=[];for(p[0]=l=c=0,e=1;h>e;++e){for(t=0,i=0;f>t;++t)i+=n[t][e][1];for(t=0,u=0,a=s[e][0]-s[e-1][0];f>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;u+=o*n[t][e][1]}p[e]=l-=i?u/i*a:0,c>l&&(c=l)}for(e=0;h>e;++e)p[e]-=c;return p},expand:function(n){var t,e,r,i=n.length,u=n[0].length,o=1/i,a=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];if(r)for(t=0;i>t;t++)n[t][e][1]/=r;else for(t=0;i>t;t++)n[t][e][1]=o}for(e=0;u>e;++e)a[e]=0;return a},zero:vi});ao.layout.histogram=function(){function n(n,u){for(var o,a,l=[],c=n.map(e,this),f=r.call(this,c,u),s=i.call(this,f,c,u),u=-1,h=c.length,p=s.length-1,g=t?1:1/h;++u<p;)o=l[u]=[],o.dx=s[u+1]-(o.x=s[u]),o.y=0;if(p>0)for(u=-1;++u<h;)a=c[u],a>=f[0]&&a<=f[1]&&(o=l[ao.bisect(s,a,1,p)-1],o.y+=g,o.push(n[u]));return l}var t=!0,e=Number,r=bi,i=Mi;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=En(t),n):r},n.bins=function(t){return arguments.length?(i="number"==typeof t?function(n){return xi(n,t)}:En(t),n):i},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ao.layout.pack=function(){function n(n,u){var o=e.call(this,n,u),a=o[0],l=i[0],c=i[1],f=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,oi(a,function(n){n.r=+f(n.value)}),oi(a,Ni),r){var s=r*(t?1:Math.max(2*a.r/l,2*a.r/c))/2;oi(a,function(n){n.r+=s}),oi(a,Ni),oi(a,function(n){n.r-=s})}return Ci(a,l/2,c/2,t?1:1/Math.max(2*a.r/l,2*a.r/c)),o}var t,e=ao.layout.hierarchy().sort(_i),r=0,i=[1,1];return n.size=function(t){return arguments.length?(i=t,n):i},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},ii(n,e)},ao.layout.tree=function(){function n(n,i){var f=o.call(this,n,i),s=f[0],h=t(s);if(oi(h,e),h.parent.m=-h.z,ui(h,r),c)ui(s,u);else{var p=s,g=s,v=s;ui(s,function(n){n.x<p.x&&(p=n),n.x>g.x&&(g=n),n.depth>v.depth&&(v=n)});var d=a(p,g)/2-p.x,y=l[0]/(g.x+a(g,p)/2+d),m=l[1]/(v.depth||1);ui(s,function(n){n.x=(n.x+d)*y,n.y=n.depth*m})}return f}function t(n){for(var t,e={A:null,children:[n]},r=[e];null!=(t=r.pop());)for(var i,u=t.children,o=0,a=u.length;a>o;++o)r.push((u[o]=i={_:u[o],parent:t,children:(i=u[o].children)&&i.slice()||[],A:null,a:null,z:0,m:0,c:0,s:0,t:null,i:o}).a=i);return e.children[0]}function e(n){var t=n.children,e=n.parent.children,r=n.i?e[n.i-1]:null;if(t.length){Di(n);var u=(t[0].z+t[t.length-1].z)/2;r?(n.z=r.z+a(n._,r._),n.m=n.z-u):n.z=u}else r&&(n.z=r.z+a(n._,r._));n.parent.A=i(n,r,n.parent.A||e[0])}function r(n){n._.x=n.z+n.parent.m,n.m+=n.parent.m}function i(n,t,e){if(t){for(var r,i=n,u=n,o=t,l=i.parent.children[0],c=i.m,f=u.m,s=o.m,h=l.m;o=Ti(o),i=qi(i),o&&i;)l=qi(l),u=Ti(u),u.a=n,r=o.z+s-i.z-c+a(o._,i._),r>0&&(Ri(Pi(o,n,e),n,r),c+=r,f+=r),s+=o.m,c+=i.m,h+=l.m,f+=u.m;o&&!Ti(u)&&(u.t=o,u.m+=s-f),i&&!qi(l)&&(l.t=i,l.m+=c-h,e=n)}return e}function u(n){n.x*=l[0],n.y=n.depth*l[1]}var o=ao.layout.hierarchy().sort(null).value(null),a=Li,l=[1,1],c=null;return n.separation=function(t){return arguments.length?(a=t,n):a},n.size=function(t){return arguments.length?(c=null==(l=t)?u:null,n):c?null:l},n.nodeSize=function(t){return arguments.length?(c=null==(l=t)?null:u,n):c?l:null},ii(n,o)},ao.layout.cluster=function(){function n(n,u){var o,a=t.call(this,n,u),l=a[0],c=0;oi(l,function(n){var t=n.children;t&&t.length?(n.x=ji(t),n.y=Ui(t)):(n.x=o?c+=e(n,o):0,n.y=0,o=n)});var f=Fi(l),s=Hi(l),h=f.x-e(f,s)/2,p=s.x+e(s,f)/2;return oi(l,i?function(n){n.x=(n.x-l.x)*r[0],n.y=(l.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(p-h)*r[0],n.y=(1-(l.y?n.y/l.y:1))*r[1]}),a}var t=ao.layout.hierarchy().sort(null).value(null),e=Li,r=[1,1],i=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(i=null==(r=t),n):i?null:r},n.nodeSize=function(t){return arguments.length?(i=null!=(r=t),n):i?r:null},ii(n,t)},ao.layout.treemap=function(){function n(n,t){for(var e,r,i=-1,u=n.length;++i<u;)r=(e=n[i]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var u=e.children;if(u&&u.length){var o,a,l,c=s(e),f=[],h=u.slice(),g=1/0,v="slice"===p?c.dx:"dice"===p?c.dy:"slice-dice"===p?1&e.depth?c.dy:c.dx:Math.min(c.dx,c.dy);for(n(h,c.dx*c.dy/e.value),f.area=0;(l=h.length)>0;)f.push(o=h[l-1]),f.area+=o.area,"squarify"!==p||(a=r(f,v))<=g?(h.pop(),g=a):(f.area-=f.pop().area,i(f,v,c,!1),v=Math.min(c.dx,c.dy),f.length=f.area=0,g=1/0);f.length&&(i(f,v,c,!0),f.length=f.area=0),u.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var u,o=s(t),a=r.slice(),l=[];for(n(a,o.dx*o.dy/t.value),l.area=0;u=a.pop();)l.push(u),l.area+=u.area,null!=u.z&&(i(l,u.z?o.dx:o.dy,o,!a.length),l.length=l.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,i=0,u=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(u>e&&(u=e),e>i&&(i=e));return r*=r,t*=t,r?Math.max(t*i*g/r,r/(t*u*g)):1/0}function i(n,t,e,r){var i,u=-1,o=n.length,a=e.x,c=e.y,f=t?l(n.area/t):0;
if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++u<o;)i=n[u],i.x=a,i.y=c,i.dy=f,a+=i.dx=Math.min(e.x+e.dx-a,f?l(i.area/f):0);i.z=!0,i.dx+=e.x+e.dx-a,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++u<o;)i=n[u],i.x=a,i.y=c,i.dx=f,c+=i.dy=Math.min(e.y+e.dy-c,f?l(i.area/f):0);i.z=!1,i.dy+=e.y+e.dy-c,e.x+=f,e.dx-=f}}function u(r){var i=o||a(r),u=i[0];return u.x=u.y=0,u.value?(u.dx=c[0],u.dy=c[1]):u.dx=u.dy=0,o&&a.revalue(u),n([u],u.dx*u.dy/u.value),(o?e:t)(u),h&&(o=i),i}var o,a=ao.layout.hierarchy(),l=Math.round,c=[1,1],f=null,s=Oi,h=!1,p="squarify",g=.5*(1+Math.sqrt(5));return u.size=function(n){return arguments.length?(c=n,u):c},u.padding=function(n){function t(t){var e=n.call(u,t,t.depth);return null==e?Oi(t):Ii(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Ii(t,n)}if(!arguments.length)return f;var r;return s=null==(f=n)?Oi:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,u},u.round=function(n){return arguments.length?(l=n?Math.round:Number,u):l!=Number},u.sticky=function(n){return arguments.length?(h=n,o=null,u):h},u.ratio=function(n){return arguments.length?(g=n,u):g},u.mode=function(n){return arguments.length?(p=n+"",u):p},ii(u,a)},ao.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,i;do e=2*Math.random()-1,r=2*Math.random()-1,i=e*e+r*r;while(!i||i>1);return n+t*e*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var n=ao.random.normal.apply(ao,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=ao.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t}}},ao.scale={};var Sl={floor:m,ceil:m};ao.scale.linear=function(){return Wi([0,1],[0,1],Mr,!1)};var kl={s:1,g:1,p:1,r:1,e:1};ao.scale.log=function(){return ru(ao.scale.linear().domain([0,1]),10,!0,[1,10])};var Nl=ao.format(".0e"),El={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};ao.scale.pow=function(){return iu(ao.scale.linear(),1,[0,1])},ao.scale.sqrt=function(){return ao.scale.pow().exponent(.5)},ao.scale.ordinal=function(){return ou([],{t:"range",a:[[]]})},ao.scale.category10=function(){return ao.scale.ordinal().range(Al)},ao.scale.category20=function(){return ao.scale.ordinal().range(Cl)},ao.scale.category20b=function(){return ao.scale.ordinal().range(zl)},ao.scale.category20c=function(){return ao.scale.ordinal().range(Ll)};var Al=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(xn),Cl=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(xn),zl=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(xn),Ll=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(xn);ao.scale.quantile=function(){return au([],[])},ao.scale.quantize=function(){return lu(0,1,[0,1])},ao.scale.threshold=function(){return cu([.5],[0,1])},ao.scale.identity=function(){return fu([0,1])},ao.svg={},ao.svg.arc=function(){function n(){var n=Math.max(0,+e.apply(this,arguments)),c=Math.max(0,+r.apply(this,arguments)),f=o.apply(this,arguments)-Io,s=a.apply(this,arguments)-Io,h=Math.abs(s-f),p=f>s?0:1;if(n>c&&(g=c,c=n,n=g),h>=Oo)return t(c,p)+(n?t(n,1-p):"")+"Z";var g,v,d,y,m,M,x,b,_,w,S,k,N=0,E=0,A=[];if((y=(+l.apply(this,arguments)||0)/2)&&(d=u===ql?Math.sqrt(n*n+c*c):+u.apply(this,arguments),p||(E*=-1),c&&(E=tn(d/c*Math.sin(y))),n&&(N=tn(d/n*Math.sin(y)))),c){m=c*Math.cos(f+E),M=c*Math.sin(f+E),x=c*Math.cos(s-E),b=c*Math.sin(s-E);var C=Math.abs(s-f-2*E)<=Fo?0:1;if(E&&yu(m,M,x,b)===p^C){var z=(f+s)/2;m=c*Math.cos(z),M=c*Math.sin(z),x=b=null}}else m=M=0;if(n){_=n*Math.cos(s-N),w=n*Math.sin(s-N),S=n*Math.cos(f+N),k=n*Math.sin(f+N);var L=Math.abs(f-s+2*N)<=Fo?0:1;if(N&&yu(_,w,S,k)===1-p^L){var q=(f+s)/2;_=n*Math.cos(q),w=n*Math.sin(q),S=k=null}}else _=w=0;if(h>Uo&&(g=Math.min(Math.abs(c-n)/2,+i.apply(this,arguments)))>.001){v=c>n^p?0:1;var T=g,R=g;if(Fo>h){var D=null==S?[_,w]:null==x?[m,M]:Re([m,M],[S,k],[x,b],[_,w]),P=m-D[0],U=M-D[1],j=x-D[0],F=b-D[1],H=1/Math.sin(Math.acos((P*j+U*F)/(Math.sqrt(P*P+U*U)*Math.sqrt(j*j+F*F)))/2),O=Math.sqrt(D[0]*D[0]+D[1]*D[1]);R=Math.min(g,(n-O)/(H-1)),T=Math.min(g,(c-O)/(H+1))}if(null!=x){var I=mu(null==S?[_,w]:[S,k],[m,M],c,T,p),Y=mu([x,b],[_,w],c,T,p);g===T?A.push("M",I[0],"A",T,",",T," 0 0,",v," ",I[1],"A",c,",",c," 0 ",1-p^yu(I[1][0],I[1][1],Y[1][0],Y[1][1]),",",p," ",Y[1],"A",T,",",T," 0 0,",v," ",Y[0]):A.push("M",I[0],"A",T,",",T," 0 1,",v," ",Y[0])}else A.push("M",m,",",M);if(null!=S){var Z=mu([m,M],[S,k],n,-R,p),V=mu([_,w],null==x?[m,M]:[x,b],n,-R,p);g===R?A.push("L",V[0],"A",R,",",R," 0 0,",v," ",V[1],"A",n,",",n," 0 ",p^yu(V[1][0],V[1][1],Z[1][0],Z[1][1]),",",1-p," ",Z[1],"A",R,",",R," 0 0,",v," ",Z[0]):A.push("L",V[0],"A",R,",",R," 0 0,",v," ",Z[0])}else A.push("L",_,",",w)}else A.push("M",m,",",M),null!=x&&A.push("A",c,",",c," 0 ",C,",",p," ",x,",",b),A.push("L",_,",",w),null!=S&&A.push("A",n,",",n," 0 ",L,",",1-p," ",S,",",k);return A.push("Z"),A.join("")}function t(n,t){return"M0,"+n+"A"+n+","+n+" 0 1,"+t+" 0,"+-n+"A"+n+","+n+" 0 1,"+t+" 0,"+n}var e=hu,r=pu,i=su,u=ql,o=gu,a=vu,l=du;return n.innerRadius=function(t){return arguments.length?(e=En(t),n):e},n.outerRadius=function(t){return arguments.length?(r=En(t),n):r},n.cornerRadius=function(t){return arguments.length?(i=En(t),n):i},n.padRadius=function(t){return arguments.length?(u=t==ql?ql:En(t),n):u},n.startAngle=function(t){return arguments.length?(o=En(t),n):o},n.endAngle=function(t){return arguments.length?(a=En(t),n):a},n.padAngle=function(t){return arguments.length?(l=En(t),n):l},n.centroid=function(){var n=(+e.apply(this,arguments)+ +r.apply(this,arguments))/2,t=(+o.apply(this,arguments)+ +a.apply(this,arguments))/2-Io;return[Math.cos(t)*n,Math.sin(t)*n]},n};var ql="auto";ao.svg.line=function(){return Mu(m)};var Tl=ao.map({linear:xu,"linear-closed":bu,step:_u,"step-before":wu,"step-after":Su,basis:zu,"basis-open":Lu,"basis-closed":qu,bundle:Tu,cardinal:Eu,"cardinal-open":ku,"cardinal-closed":Nu,monotone:Fu});Tl.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Rl=[0,2/3,1/3,0],Dl=[0,1/3,2/3,0],Pl=[0,1/6,2/3,1/6];ao.svg.line.radial=function(){var n=Mu(Hu);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},wu.reverse=Su,Su.reverse=wu,ao.svg.area=function(){return Ou(m)},ao.svg.area.radial=function(){var n=Ou(Hu);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ao.svg.chord=function(){function n(n,a){var l=t(this,u,n,a),c=t(this,o,n,a);return"M"+l.p0+r(l.r,l.p1,l.a1-l.a0)+(e(l,c)?i(l.r,l.p1,l.r,l.p0):i(l.r,l.p1,c.r,c.p0)+r(c.r,c.p1,c.a1-c.a0)+i(c.r,c.p1,l.r,l.p0))+"Z"}function t(n,t,e,r){var i=t.call(n,e,r),u=a.call(n,i,r),o=l.call(n,i,r)-Io,f=c.call(n,i,r)-Io;return{r:u,a0:o,a1:f,p0:[u*Math.cos(o),u*Math.sin(o)],p1:[u*Math.cos(f),u*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Fo)+",1 "+t}function i(n,t,e,r){return"Q 0,0 "+r}var u=Me,o=xe,a=Iu,l=gu,c=vu;return n.radius=function(t){return arguments.length?(a=En(t),n):a},n.source=function(t){return arguments.length?(u=En(t),n):u},n.target=function(t){return arguments.length?(o=En(t),n):o},n.startAngle=function(t){return arguments.length?(l=En(t),n):l},n.endAngle=function(t){return arguments.length?(c=En(t),n):c},n},ao.svg.diagonal=function(){function n(n,i){var u=t.call(this,n,i),o=e.call(this,n,i),a=(u.y+o.y)/2,l=[u,{x:u.x,y:a},{x:o.x,y:a},o];return l=l.map(r),"M"+l[0]+"C"+l[1]+" "+l[2]+" "+l[3]}var t=Me,e=xe,r=Yu;return n.source=function(e){return arguments.length?(t=En(e),n):t},n.target=function(t){return arguments.length?(e=En(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ao.svg.diagonal.radial=function(){var n=ao.svg.diagonal(),t=Yu,e=n.projection;return n.projection=function(n){return arguments.length?e(Zu(t=n)):t},n},ao.svg.symbol=function(){function n(n,r){return(Ul.get(t.call(this,n,r))||$u)(e.call(this,n,r))}var t=Xu,e=Vu;return n.type=function(e){return arguments.length?(t=En(e),n):t},n.size=function(t){return arguments.length?(e=En(t),n):e},n};var Ul=ao.map({circle:$u,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Fl)),e=t*Fl;return"M0,"+-t+"L"+e+",0 0,"+t+" "+-e+",0Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ao.svg.symbolTypes=Ul.keys();var jl=Math.sqrt(3),Fl=Math.tan(30*Yo);Co.transition=function(n){for(var t,e,r=Hl||++Zl,i=Ku(n),u=[],o=Ol||{time:Date.now(),ease:Nr,delay:0,duration:250},a=-1,l=this.length;++a<l;){u.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(e=c[f])&&Qu(e,f,i,r,o),t.push(e)}return Wu(u,i,r)},Co.interrupt=function(n){return this.each(null==n?Il:Bu(Ku(n)))};var Hl,Ol,Il=Bu(Ku()),Yl=[],Zl=0;Yl.call=Co.call,Yl.empty=Co.empty,Yl.node=Co.node,Yl.size=Co.size,ao.transition=function(n,t){return n&&n.transition?Hl?n.transition(t):n:ao.selection().transition(n)},ao.transition.prototype=Yl,Yl.select=function(n){var t,e,r,i=this.id,u=this.namespace,o=[];n=A(n);for(var a=-1,l=this.length;++a<l;){o.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(r=c[f])&&(e=n.call(r,r.__data__,f,a))?("__data__"in r&&(e.__data__=r.__data__),Qu(e,f,u,i,r[u][i]),t.push(e)):t.push(null)}return Wu(o,u,i)},Yl.selectAll=function(n){var t,e,r,i,u,o=this.id,a=this.namespace,l=[];n=C(n);for(var c=-1,f=this.length;++c<f;)for(var s=this[c],h=-1,p=s.length;++h<p;)if(r=s[h]){u=r[a][o],e=n.call(r,r.__data__,h,c),l.push(t=[]);for(var g=-1,v=e.length;++g<v;)(i=e[g])&&Qu(i,g,a,o,u),t.push(i)}return Wu(l,a,o)},Yl.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]);for(var e=this[u],a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return Wu(i,this.namespace,this.id)},Yl.tween=function(n,t){var e=this.id,r=this.namespace;return arguments.length<2?this.node()[r][e].tween.get(n):Y(this,null==t?function(t){t[r][e].tween.remove(n)}:function(i){i[r][e].tween.set(n,t)})},Yl.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function i(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function u(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?$r:Mr,a=ao.ns.qualify(n);return Ju(this,"attr."+n,t,a.local?u:i)},Yl.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(i));return r&&function(n){this.setAttribute(i,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(i.space,i.local));return r&&function(n){this.setAttributeNS(i.space,i.local,r(n))}}var i=ao.ns.qualify(n);return this.tween("attr."+n,i.local?r:e)},Yl.style=function(n,e,r){function i(){this.style.removeProperty(n)}function u(e){return null==e?i:(e+="",function(){var i,u=t(this).getComputedStyle(this,null).getPropertyValue(n);return u!==e&&(i=Mr(u,e),function(t){this.style.setProperty(n,i(t),r)})})}var o=arguments.length;if(3>o){if("string"!=typeof n){2>o&&(e="");for(r in n)this.style(r,n[r],e);return this}r=""}return Ju(this,"style."+n,e,u)},Yl.styleTween=function(n,e,r){function i(i,u){var o=e.call(this,i,u,t(this).getComputedStyle(this,null).getPropertyValue(n));return o&&function(t){this.style.setProperty(n,o(t),r)}}return arguments.length<3&&(r=""),this.tween("style."+n,i)},Yl.text=function(n){return Ju(this,"text",n,Gu)},Yl.remove=function(){var n=this.namespace;return this.each("end.transition",function(){var t;this[n].count<2&&(t=this.parentNode)&&t.removeChild(this)})},Yl.ease=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].ease:("function"!=typeof n&&(n=ao.ease.apply(ao,arguments)),Y(this,function(r){r[e][t].ease=n}))},Yl.delay=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].delay:Y(this,"function"==typeof n?function(r,i,u){r[e][t].delay=+n.call(r,r.__data__,i,u)}:(n=+n,function(r){r[e][t].delay=n}))},Yl.duration=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].duration:Y(this,"function"==typeof n?function(r,i,u){r[e][t].duration=Math.max(1,n.call(r,r.__data__,i,u))}:(n=Math.max(1,n),function(r){r[e][t].duration=n}))},Yl.each=function(n,t){var e=this.id,r=this.namespace;if(arguments.length<2){var i=Ol,u=Hl;try{Hl=e,Y(this,function(t,i,u){Ol=t[r][e],n.call(t,t.__data__,i,u)})}finally{Ol=i,Hl=u}}else Y(this,function(i){var u=i[r][e];(u.event||(u.event=ao.dispatch("start","end","interrupt"))).on(n,t)});return this},Yl.transition=function(){for(var n,t,e,r,i=this.id,u=++Zl,o=this.namespace,a=[],l=0,c=this.length;c>l;l++){a.push(n=[]);for(var t=this[l],f=0,s=t.length;s>f;f++)(e=t[f])&&(r=e[o][i],Qu(e,f,o,u,{time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),n.push(e)}return Wu(a,o,u)},ao.svg.axis=function(){function n(n){n.each(function(){var n,c=ao.select(this),f=this.__chart__||e,s=this.__chart__=e.copy(),h=null==l?s.ticks?s.ticks.apply(s,a):s.domain():l,p=null==t?s.tickFormat?s.tickFormat.apply(s,a):m:t,g=c.selectAll(".tick").data(h,s),v=g.enter().insert("g",".domain").attr("class","tick").style("opacity",Uo),d=ao.transition(g.exit()).style("opacity",Uo).remove(),y=ao.transition(g.order()).style("opacity",1),M=Math.max(i,0)+o,x=Zi(s),b=c.selectAll(".domain").data([0]),_=(b.enter().append("path").attr("class","domain"),ao.transition(b));v.append("line"),v.append("text");var w,S,k,N,E=v.select("line"),A=y.select("line"),C=g.select("text").text(p),z=v.select("text"),L=y.select("text"),q="top"===r||"left"===r?-1:1;if("bottom"===r||"top"===r?(n=no,w="x",k="y",S="x2",N="y2",C.attr("dy",0>q?"0em":".71em").style("text-anchor","middle"),_.attr("d","M"+x[0]+","+q*u+"V0H"+x[1]+"V"+q*u)):(n=to,w="y",k="x",S="y2",N="x2",C.attr("dy",".32em").style("text-anchor",0>q?"end":"start"),_.attr("d","M"+q*u+","+x[0]+"H0V"+x[1]+"H"+q*u)),E.attr(N,q*i),z.attr(k,q*M),A.attr(S,0).attr(N,q*i),L.attr(w,0).attr(k,q*M),s.rangeBand){var T=s,R=T.rangeBand()/2;f=s=function(n){return T(n)+R}}else f.rangeBand?f=s:d.call(n,s,f);v.call(n,f,s),y.call(n,s,s)})}var t,e=ao.scale.linear(),r=Vl,i=6,u=6,o=3,a=[10],l=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in Xl?t+"":Vl,n):r},n.ticks=function(){return arguments.length?(a=co(arguments),n):a},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(i=+t,u=+arguments[e-1],n):i},n.innerTickSize=function(t){return arguments.length?(i=+t,n):i},n.outerTickSize=function(t){return arguments.length?(u=+t,n):u},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Vl="bottom",Xl={top:1,right:1,bottom:1,left:1};ao.svg.brush=function(){function n(t){t.each(function(){var t=ao.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=t.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),t.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=t.selectAll(".resize").data(v,m);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return $l[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,s=ao.transition(t),h=ao.transition(o);c&&(l=Zi(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),r(s)),f&&(l=Zi(f),h.attr("y",l[0]).attr("height",l[1]-l[0]),i(s)),e(s)})}function e(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function r(n){n.select(".extent").attr("x",s[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1]-s[0])}function i(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==ao.event.keyCode&&(C||(M=null,L[0]-=s[1],L[1]-=h[1],C=2),S())}function v(){32==ao.event.keyCode&&2==C&&(L[0]+=s[1],L[1]+=h[1],C=0,S())}function d(){var n=ao.mouse(b),t=!1;x&&(n[0]+=x[0],n[1]+=x[1]),C||(ao.event.altKey?(M||(M=[(s[0]+s[1])/2,(h[0]+h[1])/2]),L[0]=s[+(n[0]<M[0])],L[1]=h[+(n[1]<M[1])]):M=null),E&&y(n,c,0)&&(r(k),t=!0),A&&y(n,f,1)&&(i(k),t=!0),t&&(e(k),w({type:"brush",mode:C?"move":"resize"}))}function y(n,t,e){var r,i,u=Zi(t),l=u[0],c=u[1],f=L[e],v=e?h:s,d=v[1]-v[0];return C&&(l-=f,c-=d+f),r=(e?g:p)?Math.max(l,Math.min(c,n[e])):n[e],C?i=(r+=f)+d:(M&&(f=Math.max(l,Math.min(c,2*M[e]-r))),r>f?(i=r,r=f):i=f),v[0]!=r||v[1]!=i?(e?a=null:o=null,v[0]=r,v[1]=i,!0):void 0}function m(){d(),k.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ao.select("body").style("cursor",null),q.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),z(),w({type:"brushend"})}var M,x,b=this,_=ao.select(ao.event.target),w=l.of(b,arguments),k=ao.select(b),N=_.datum(),E=!/^(n|s)$/.test(N)&&c,A=!/^(e|w)$/.test(N)&&f,C=_.classed("extent"),z=W(b),L=ao.mouse(b),q=ao.select(t(b)).on("keydown.brush",u).on("keyup.brush",v);if(ao.event.changedTouches?q.on("touchmove.brush",d).on("touchend.brush",m):q.on("mousemove.brush",d).on("mouseup.brush",m),k.interrupt().selectAll("*").interrupt(),C)L[0]=s[0]-L[0],L[1]=h[0]-L[1];else if(N){var T=+/w$/.test(N),R=+/^n/.test(N);x=[s[1-T]-L[0],h[1-R]-L[1]],L[0]=s[T],L[1]=h[R]}else ao.event.altKey&&(M=L.slice());k.style("pointer-events","none").selectAll(".resize").style("display",null),ao.select("body").style("cursor",_.style("cursor")),w({type:"brushstart"}),d()}var o,a,l=N(n,"brushstart","brush","brushend"),c=null,f=null,s=[0,0],h=[0,0],p=!0,g=!0,v=Bl[0];return n.event=function(n){n.each(function(){var n=l.of(this,arguments),t={x:s,y:h,i:o,j:a},e=this.__chart__||t;this.__chart__=t,Hl?ao.select(this).transition().each("start.brush",function(){o=e.i,a=e.j,s=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=xr(s,t.x),r=xr(h,t.y);return o=a=null,function(i){s=t.x=e(i),h=t.y=r(i),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){o=t.i,a=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,v=Bl[!c<<1|!f],n):c},n.y=function(t){return arguments.length?(f=t,v=Bl[!c<<1|!f],n):f},n.clamp=function(t){return arguments.length?(c&&f?(p=!!t[0],g=!!t[1]):c?p=!!t:f&&(g=!!t),n):c&&f?[p,g]:c?p:f?g:null},n.extent=function(t){var e,r,i,u,l;return arguments.length?(c&&(e=t[0],r=t[1],f&&(e=e[0],r=r[0]),o=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(l=e,e=r,r=l),e==s[0]&&r==s[1]||(s=[e,r])),f&&(i=t[0],u=t[1],c&&(i=i[1],u=u[1]),a=[i,u],f.invert&&(i=f(i),u=f(u)),i>u&&(l=i,i=u,u=l),i==h[0]&&u==h[1]||(h=[i,u])),n):(c&&(o?(e=o[0],r=o[1]):(e=s[0],r=s[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(l=e,e=r,r=l))),f&&(a?(i=a[0],u=a[1]):(i=h[0],u=h[1],f.invert&&(i=f.invert(i),u=f.invert(u)),i>u&&(l=i,i=u,u=l))),c&&f?[[e,i],[r,u]]:c?[e,r]:f&&[i,u])},n.clear=function(){return n.empty()||(s=[0,0],h=[0,0],o=a=null),n},n.empty=function(){return!!c&&s[0]==s[1]||!!f&&h[0]==h[1]},ao.rebind(n,l,"on")};var $l={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Bl=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Wl=ga.format=xa.timeFormat,Jl=Wl.utc,Gl=Jl("%Y-%m-%dT%H:%M:%S.%LZ");Wl.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?eo:Gl,eo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},eo.toString=Gl.toString,ga.second=On(function(n){return new va(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),ga.seconds=ga.second.range,ga.seconds.utc=ga.second.utc.range,ga.minute=On(function(n){return new va(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),ga.minutes=ga.minute.range,ga.minutes.utc=ga.minute.utc.range,ga.hour=On(function(n){var t=n.getTimezoneOffset()/60;return new va(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),ga.hours=ga.hour.range,ga.hours.utc=ga.hour.utc.range,ga.month=On(function(n){return n=ga.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ga.months=ga.month.range,ga.months.utc=ga.month.utc.range;var Kl=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Ql=[[ga.second,1],[ga.second,5],[ga.second,15],[ga.second,30],[ga.minute,1],[ga.minute,5],[ga.minute,15],[ga.minute,30],[ga.hour,1],[ga.hour,3],[ga.hour,6],[ga.hour,12],[ga.day,1],[ga.day,2],[ga.week,1],[ga.month,1],[ga.month,3],[ga.year,1]],nc=Wl.multi([[".%L",function(n){return n.getMilliseconds()}],[":%S",function(n){return n.getSeconds()}],["%I:%M",function(n){return n.getMinutes()}],["%I %p",function(n){return n.getHours()}],["%a %d",function(n){return n.getDay()&&1!=n.getDate()}],["%b %d",function(n){return 1!=n.getDate()}],["%B",function(n){return n.getMonth()}],["%Y",zt]]),tc={range:function(n,t,e){return ao.range(Math.ceil(n/e)*e,+t,e).map(io)},floor:m,ceil:m};Ql.year=ga.year,ga.scale=function(){return ro(ao.scale.linear(),Ql,nc)};var ec=Ql.map(function(n){return[n[0].utc,n[1]]}),rc=Jl.multi([[".%L",function(n){return n.getUTCMilliseconds()}],[":%S",function(n){return n.getUTCSeconds()}],["%I:%M",function(n){return n.getUTCMinutes()}],["%I %p",function(n){return n.getUTCHours()}],["%a %d",function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],["%b %d",function(n){return 1!=n.getUTCDate()}],["%B",function(n){return n.getUTCMonth()}],["%Y",zt]]);ec.year=ga.year.utc,ga.scale.utc=function(){return ro(ao.scale.linear(),ec,rc)},ao.text=An(function(n){return n.responseText}),ao.json=function(n,t){return Cn(n,"application/json",uo,t)},ao.html=function(n,t){return Cn(n,"text/html",oo,t)},ao.xml=An(function(n){return n.responseXML}),"function"==typeof define&&define.amd?(this.d3=ao,define(ao)):"object"==typeof module&&module.exports?module.exports=ao:this.d3=ao}();;!function(){function t(t,a){return{type:"Feature",id:t.id,properties:t.properties,geometry:n(t.geometry,a)}}function n(t,a){if(!t)return null;if("GeometryCollection"===t.type)return{type:"GeometryCollection",geometries:object.geometries.map(function(t){return n(t,a)})};if(!ga.hasOwnProperty(t.type))return null;var r=ga[t.type];return d3.geo.stream(t,a(r)),r.result()}function a(){}function r(t){if((n=t.length)<4)return!1;for(var n,a=0,r=t[n-1][1]*t[0][0]-t[n-1][0]*t[0][1];++a<n;)r+=t[a-1][1]*t[a][0]-t[a-1][0]*t[a][1];return 0>=r}function e(t,n){for(var a=n[0],r=n[1],e=!1,o=0,i=t.length,h=i-1;i>o;h=o++){var u=t[o],M=u[0],s=u[1],c=t[h],f=c[0],v=c[1];s>r^v>r&&(f-M)*(r-s)/(v-s)+M>a&&(e=!e)}return e}function o(t){return t?t/Math.sin(t):1}function i(t){return t>0?1:0>t?-1:0}function h(t){return t>1?wa:-1>t?-wa:Math.asin(t)}function u(t){return t>1?0:-1>t?pa:Math.acos(t)}function M(t){return t>0?Math.sqrt(t):0}function s(t){function n(t,n){var a=Math.cos(t),e=Math.cos(n),o=Math.sin(n),i=e*a,h=-((1-i?Math.log(.5*(1+i))/(1-i):-.5)+r/(1+i));return[h*e*Math.sin(t),h*o]}var a=Math.tan(.5*t),r=2*Math.log(Math.cos(.5*t))/(a*a);return n.invert=function(n,a){var e,o=Math.sqrt(n*n+a*a),i=t*-.5,u=50;if(!o)return[0,0];do{var M=.5*i,s=Math.cos(M),c=Math.sin(M),f=Math.tan(M),v=Math.log(1/s);i-=e=(2/f*v-r*f-o)/(-v/(c*c)+1-r/(2*s*s))}while(Math.abs(e)>da&&--u>0);var l=Math.sin(i);return[Math.atan2(n*l,o*Math.cos(i)),h(a*l/o)]},n}function c(){var t=wa,n=Qa(s),a=n(t);return a.radius=function(a){return arguments.length?n(t=a*pa/180):180*(t/pa)},a}function f(t,n){var a=Math.cos(n),r=o(u(a*Math.cos(t/=2)));return[2*a*Math.sin(t)*r,Math.sin(n)*r]}function v(t){function n(t,n){var h=Math.cos(n),u=Math.cos(t/=2);return[(1+h)*Math.sin(t),(e*n>-Math.atan2(u,o)-.001?0:10*-e)+i+Math.sin(n)*r-(1+h)*a*u]}var a=Math.sin(t),r=Math.cos(t),e=t>0?1:-1,o=Math.tan(e*t),i=(1+a-r)/2;return n.invert=function(t,n){var h=0,u=0,M=50;do{var s=Math.cos(h),c=Math.sin(h),f=Math.cos(u),v=Math.sin(u),l=1+f,g=l*c-t,d=i+v*r-l*a*s-n,b=.5*l*s,p=-c*v,w=.5*a*l*c,q=r*f+a*s*v,m=p*w-q*b,y=.5*(d*p-g*q)/m,S=(g*w-d*b)/m;h-=y,u-=S}while((Math.abs(y)>da||Math.abs(S)>da)&&--M>0);return e*u>-Math.atan2(Math.cos(h),o)-.001?[2*h,u]:null},n}function l(){var t=pa/9,n=t>0?1:-1,a=Math.tan(n*t),r=Qa(v),e=r(t),o=e.stream;return e.parallel=function(e){return arguments.length?(a=Math.tan((n=(t=e*pa/180)>0?1:-1)*t),r(t)):180*(t/pa)},e.stream=function(r){var i=e.rotate(),h=o(r),u=(e.rotate([0,0]),o(r));return e.rotate(i),h.sphere=function(){u.polygonStart(),u.lineStart();for(var r=-180*n;180>n*r;r+=90*n)u.point(r,90*n);for(;n*(r-=t)>=-180;)u.point(r,n*-Math.atan2(Math.cos(r*ma/2),a)*ya);u.lineEnd(),u.polygonEnd()},h},e}function g(t){return t=Math.exp(2*t),(t-1)/(t+1)}function d(t){return.5*(Math.exp(t)-Math.exp(-t))}function b(t){return.5*(Math.exp(t)+Math.exp(-t))}function p(t){return Math.log(t+M(t*t+1))}function w(t){return Math.log(t+M(t*t-1))}function q(t,n){var a=Math.tan(n/2),r=M(1-a*a),e=1+r*Math.cos(t/=2),o=Math.sin(t)*r/e,i=a/e,h=o*o,u=i*i;return[4/3*o*(3+h-3*u),4/3*i*(3+3*h-u)]}function m(t,n){var a=Math.abs(n);return pa/4>a?[t,Math.log(Math.tan(pa/4+n/2))]:[t*Math.cos(a)*(2*Math.SQRT2-1/Math.sin(a)),i(n)*(2*Math.SQRT2*(a-pa/4)-Math.log(Math.tan(a/2)))]}function y(t){function n(t,n){var r=Ta(t,n);if(Math.abs(t)>wa){var e=Math.atan2(r[1],r[0]),o=Math.sqrt(r[0]*r[0]+r[1]*r[1]),i=a*Math.round((e-wa)/a)+wa,u=Math.atan2(Math.sin(e-=i),2-Math.cos(e));e=i+h(pa/o*Math.sin(u))-u,r[0]=o*Math.cos(e),r[1]=o*Math.sin(e)}return r}var a=2*pa/t;return n.invert=function(t,n){var r=Math.sqrt(t*t+n*n);if(r>wa){var e=Math.atan2(n,t),o=a*Math.round((e-wa)/a)+wa,i=e>o?-1:1,h=r*Math.cos(o-e),u=1/Math.tan(i*Math.acos((h-pa)/Math.sqrt(pa*(pa-2*h)+r*r)));e=o+2*Math.atan((u+i*Math.sqrt(u*u-3))/3),t=r*Math.cos(e),n=r*Math.sin(e)}return Ta.invert(t,n)},n}function S(){var t=5,n=Qa(y),a=n(t),r=a.stream,e=.01,o=-Math.cos(e*ma),i=Math.sin(e*ma);return a.lobes=function(a){return arguments.length?n(t=+a):t},a.stream=function(n){var u=a.rotate(),M=r(n),s=(a.rotate([0,0]),r(n));return a.rotate(u),M.sphere=function(){s.polygonStart(),s.lineStart();for(var n=0,a=360/t,r=2*pa/t,u=90-180/t,M=wa;t>n;++n,u-=a,M-=r)s.point(Math.atan2(i*Math.cos(M),o)*ya,h(i*Math.sin(M))*ya),-90>u?(s.point(-90,-180-u-e),s.point(-90,-180-u+e)):(s.point(90,u+e),s.point(90,u-e));s.lineEnd(),s.polygonEnd()},M},a}function Q(t){return function(n){var a,r=t*Math.sin(n),e=30;do n-=a=(n+Math.sin(n)-r)/(1+Math.cos(n));while(Math.abs(a)>da&&--e>0);return n/2}}function R(t,n,a){function r(a,r){return[t*a*Math.cos(r=e(r)),n*Math.sin(r)]}var e=Q(a);return r.invert=function(r,e){var o=h(e/n);return[r/(t*Math.cos(o)),h((2*o+Math.sin(2*o))/a)]},r}function T(t,n){var a=2.00276,r=xa(n);return[a*t/(1/Math.cos(n)+1.11072/Math.cos(r)),(n+Math.SQRT2*Math.sin(r))/a]}function x(t){var n=0,a=Qa(t),r=a(n);return r.parallel=function(t){return arguments.length?a(n=t*pa/180):180*(n/pa)},r}function E(t,n){return[t*Math.cos(n),n]}function k(t){function n(n,r){var e=a+t-r,o=e?n*Math.cos(r)/e:e;return[e*Math.sin(o),a-e*Math.cos(o)]}if(!t)return E;var a=1/Math.tan(t);return n.invert=function(n,r){var e=Math.sqrt(n*n+(r=a-r)*r),o=a+t-e;return[e/Math.cos(o)*Math.atan2(n,r),o]},n}function P(t){function n(t,n){var r=wa-n,e=r?t*a*Math.sin(r)/r:r;return[r*Math.sin(e)/a,wa-r*Math.cos(e)]}var a=Math.sin(t);return n.invert=function(t,n){var r=t*a,e=wa-n,o=Math.sqrt(r*r+e*e),i=Math.atan2(r,e);return[(o?o/Math.sin(o):1)*i/a,wa-o]},n}function _(t){function n(n,a){for(var r=Math.sin(a),e=Math.cos(a),o=new Array(3),M=0;3>M;++M){var s=t[M];if(o[M]=B(a-s[1],s[3],s[2],e,r,n-s[0]),!o[M][0])return s.point;o[M][1]=j(o[M][1]-s.v[1])}for(var c=u.slice(),M=0;3>M;++M){var f=2==M?0:M+1,v=F(t[M].v[0],o[M][0],o[f][0]);o[M][1]<0&&(v=-v),M?1==M?(v=i-v,c[0]-=o[M][0]*Math.cos(v),c[1]-=o[M][0]*Math.sin(v)):(v=h-v,c[0]+=o[M][0]*Math.cos(v),c[1]+=o[M][0]*Math.sin(v)):(c[0]+=o[M][0]*Math.cos(v),c[1]-=o[M][0]*Math.sin(v))}return c[0]/=3,c[1]/=3,c}t=t.map(function(t){return[t[0],t[1],Math.sin(t[1]),Math.cos(t[1])]});for(var a,r=t[2],e=0;3>e;++e,r=a)a=t[e],r.v=B(a[1]-r[1],r[3],r[2],a[3],a[2],a[0]-r[0]),r.point=[0,0];var o=F(t[0].v[0],t[2].v[0],t[1].v[0]),i=F(t[0].v[0],t[1].v[0],t[2].v[0]),h=pa-o;t[2].point[1]=0,t[0].point[0]=-(t[1].point[0]=.5*t[0].v[0]);var u=[t[2].point[0]=t[0].point[0]+t[2].v[0]*Math.cos(o),2*(t[0].point[1]=t[1].point[1]=t[2].v[0]*Math.sin(o))];return n}function z(){var t=[[0,0],[0,0],[0,0]],n=Qa(_),a=n(t),r=a.rotate;return delete a.rotate,a.points=function(e){if(!arguments.length)return t;t=e;var o=d3.geo.centroid({type:"MultiPoint",coordinates:t}),i=[-o[0],-o[1]];return r.call(a,i),n(t.map(d3.geo.rotation(i)).map(A))},a.points([[-150,55],[-35,55],[-92.5,10]])}function B(t,n,a,r,e,o){var i,M=Math.cos(o);if(Math.abs(t)>1||Math.abs(o)>1)i=u(a*e+n*r*M);else{var s=Math.sin(.5*t),c=Math.sin(.5*o);i=2*h(Math.sqrt(s*s+n*r*c*c))}return Math.abs(i)>da?[i,Math.atan2(r*Math.sin(o),n*e-a*r*M)]:[0,0]}function F(t,n,a){return u(.5*(t*t+n*n-a*a)/(t*n))}function j(t){return t-2*pa*Math.floor((t+pa)/(2*pa))}function A(t){return[t[0]*ma,t[1]*ma]}function G(t,n){var a=M(1-Math.sin(n));return[2/qa*t*a,qa*(1-a)]}function C(t){function n(t,n){return[t,(t?t/Math.sin(t):1)*(Math.sin(n)*Math.cos(t)-a*Math.cos(n))]}var a=Math.tan(t);return n.invert=a?function(t,n){t&&(n*=Math.sin(t)/t);var r=Math.cos(t);return[t,2*Math.atan2(Math.sqrt(r*r+a*a-n*n)-r,a-n)]}:function(t,n){return[t,h(t?n*Math.tan(t)/t:n)]},n}function D(t,n){var a=Math.sqrt(3);return[a*t*(2*Math.cos(2*n/3)-1)/qa,a*qa*Math.sin(n/3)]}function L(t){function n(t,n){return[t*a,Math.sin(n)/a]}var a=Math.cos(t);return n.invert=function(t,n){return[t/a,h(n*a)]},n}function O(t){function n(t,n){return[t*a,(1+a)*Math.tan(.5*n)]}var a=Math.cos(t);return n.invert=function(t,n){return[t/a,2*Math.atan(n/(1+a))]},n}function H(t,n){var a=Math.sqrt(8/(3*pa));return[a*t*(1-Math.abs(n)/pa),a*n]}function I(t,n){var a=Math.sqrt(4-3*Math.sin(Math.abs(n)));return[2/Math.sqrt(6*pa)*t*a,i(n)*Math.sqrt(2*pa/3)*(2-a)]}function J(t,n){var a=Math.sqrt(pa*(4+pa));return[2/a*t*(1+Math.sqrt(1-4*n*n/(pa*pa))),4/a*n]}function K(t,n){var a=(2+wa)*Math.sin(n);n/=2;for(var r=0,e=1/0;10>r&&Math.abs(e)>da;r++){var o=Math.cos(n);n-=e=(n+Math.sin(n)*(o+2)-a)/(2*o*(1+o))}return[2/Math.sqrt(pa*(4+pa))*t*(1+Math.cos(n)),2*Math.sqrt(pa/(4+pa))*Math.sin(n)]}function N(t,n){return[t*(1+Math.cos(n))/Math.sqrt(2+pa),2*n/Math.sqrt(2+pa)]}function U(t,n){for(var a=(1+wa)*Math.sin(n),r=0,e=1/0;10>r&&Math.abs(e)>da;r++)n-=e=(n+Math.sin(n)-a)/(1+Math.cos(n));return a=Math.sqrt(2+pa),[t*(1+Math.cos(n))/a,2*n/a]}function V(t,n){var a=Math.sin(t/=2),r=Math.cos(t),e=Math.sqrt(Math.cos(n)),o=Math.cos(n/=2),i=Math.sin(n)/(o+Math.SQRT2*r*e),h=Math.sqrt(2/(1+i*i)),u=Math.sqrt((Math.SQRT2*o+(r+a)*e)/(Math.SQRT2*o+(r-a)*e));return[Pa*(h*(u-1/u)-2*Math.log(u)),Pa*(h*i*(u+1/u)-2*Math.atan(i))]}function W(t,n){var a=Math.tan(n/2);return[t*_a*M(1-a*a),(1+_a)*a]}function X(t,n){var a=n/2,r=Math.cos(a);return[2*t/qa*Math.cos(n)*r*r,qa*Math.tan(a)]}function Y(t,n){function a(n,a){var o=za(n,a),i=o[0],h=o[1],u=i*i+h*h;if(u>e){var M=Math.sqrt(u),s=Math.atan2(h,i),c=r*Math.round(s/r),f=s-c,v=t*Math.cos(f),l=(t*Math.sin(f)-f*Math.sin(v))/(wa-v),g=Z(f,l),d=(pa-t)/tn(g,v,pa);i=M;var b,p=50;do i-=b=(t+tn(g,v,i)*d-M)/(g(i)*d);while(Math.abs(b)>da&&--p>0);h=f*Math.sin(i),wa>i&&(h-=l*(i-wa));var w=Math.sin(c),q=Math.cos(c);o[0]=i*q-h*w,o[1]=i*w+h*q}return o}var r=2*pa/n,e=t*t;return a.invert=function(n,a){var o=n*n+a*a;if(o>e){var i=Math.sqrt(o),h=Math.atan2(a,n),u=r*Math.round(h/r),M=h-u,n=i*Math.cos(M);a=i*Math.sin(M);for(var s=n-wa,c=Math.sin(n),f=a/c,v=wa>n?1/0:0,l=10;;){var g=t*Math.sin(f),d=t*Math.cos(f),b=Math.sin(d),p=wa-d,w=(g-f*b)/p,q=Z(f,w);if(Math.abs(v)<ba||!--l)break;f-=v=(f*c-w*s-a)/(c-2*s*(p*(d+f*g*Math.cos(d)-b)-g*(g-f*b))/(p*p))}i=t+tn(q,d,n)*(pa-t)/tn(q,d,pa),h=u+f,n=i*Math.cos(h),a=i*Math.sin(h)}return za.invert(n,a)},a}function Z(t,n){return function(a){var r=t*Math.cos(a);return wa>a&&(r-=n),Math.sqrt(1+r*r)}}function $(){var t=6,n=30*ma,a=Math.cos(n),r=Math.sin(n),e=Qa(Y),o=e(n,t),i=o.stream,h=.01,u=-Math.cos(h*ma),M=Math.sin(h*ma);return o.radius=function(o){return arguments.length?(a=Math.cos(n=o*ma),r=Math.sin(n),e(n,t)):n*ya},o.lobes=function(a){return arguments.length?e(n,t=+a):t},o.stream=function(n){var e=o.rotate(),h=i(n),s=(o.rotate([0,0]),i(n));return o.rotate(e),h.sphere=function(){s.polygonStart(),s.lineStart();for(var n=0,e=2*pa/t,o=0;t>n;++n,o-=e)s.point(Math.atan2(M*Math.cos(o),u)*ya,Math.asin(M*Math.sin(o))*ya),s.point(Math.atan2(r*Math.cos(o-e/2),a)*ya,Math.asin(r*Math.sin(o-e/2))*ya);s.lineEnd(),s.polygonEnd()},h},o}function tn(t,n,a){for(var r=50,e=(a-n)/r,o=t(n)+t(a),i=1,h=n;r>i;++i)o+=2*t(h+=e);return.5*o*e}function nn(t,n,a,r,e,o,i,h){function u(u,M){if(!M)return[t*u/pa,0];var s=M*M,c=t+s*(n+s*(a+s*r)),f=M*(e-1+s*(o-h+s*i)),v=(c*c+f*f)/(2*f),l=u*Math.asin(c/v)/pa;return[v*Math.sin(l),M*(1+s*h)+v*(1-Math.cos(l))]}return arguments.length<8&&(h=0),u.invert=function(u,s){var c,f,v=pa*u/t,l=s,g=50;do{var d=l*l,b=t+d*(n+d*(a+d*r)),p=l*(e-1+d*(o-h+d*i)),w=b*b+p*p,q=2*p,m=w/q,y=m*m,S=Math.asin(b/m)/pa,Q=v*S;if(xB2=b*b,dxBdφ=(2*n+d*(4*a+6*d*r))*l,dyBdφ=e+d*(3*o+5*d*i),dpdφ=2*(b*dxBdφ+p*(dyBdφ-1)),dqdφ=2*(dyBdφ-1),dmdφ=(dpdφ*q-w*dqdφ)/(q*q),cosα=Math.cos(Q),sinα=Math.sin(Q),mcosα=m*cosα,msinα=m*sinα,dαdφ=v/pa*(1/M(1-xB2/y))*(dxBdφ*m-b*dmdφ)/y,fx=msinα-u,fy=l*(1+d*h)+m-mcosα-s,δxδφ=dmdφ*sinα+mcosα*dαdφ,δxδλ=mcosα*S,δyδφ=1+dmdφ-(dmdφ*cosα-msinα*dαdφ),δyδλ=msinα*S,denominator=δxδφ*δyδλ-δyδφ*δxδλ,!denominator)break;v-=c=(fy*δxδφ-fx*δyδφ)/denominator,l-=f=(fx*δyδλ-fy*δxδλ)/denominator}while((Math.abs(c)>da||Math.abs(f)>da)&&--g>0);return[v,l]},u}function an(t,n){var a=t*t,r=n*n;return[t*(1-.162388*r)*(.87-952426e-9*a*a),n*(1+r/12)]}function rn(t){function n(){var t=!1,n=Qa(a),r=n(t);return r.quincuncial=function(a){return arguments.length?n(t=!!a):t},r}function a(n){var a=n?function(n,a){var e=Math.abs(n)<wa,o=t(e?n:n>0?n-pa:n+pa,a),h=(o[0]-o[1])*Math.SQRT1_2,u=(o[0]+o[1])*Math.SQRT1_2;if(e)return[h,u];var M=r*Math.SQRT1_2,s=h>0^u>0?-1:1;return[s*h-i(u)*M,s*u-i(h)*M]}:function(n,a){var e=n>0?-.5:.5,o=t(n+e*pa,a);return o[0]-=e*r,o};return t.invert&&(a.invert=n?function(n,a){var e=(n+a)*Math.SQRT1_2,o=(a-n)*Math.SQRT1_2,i=Math.abs(e)<.5*r&&Math.abs(o)<.5*r;if(!i){var h=r*Math.SQRT1_2,u=e>0^o>0?-1:1,M=-u*(n+(o>0?1:-1)*h),s=-u*(a+(e>0?1:-1)*h);e=(-M-s)*Math.SQRT1_2,o=(M-s)*Math.SQRT1_2}var c=t.invert(e,o);return i||(c[0]+=e>0?pa:-pa),c}:function(n,a){var e=n>0?-.5:.5,o=t.invert(n+e*r,a),i=o[0]-e*pa;return-pa>i?i+=2*pa:i>pa&&(i-=2*pa),o[0]=i,o}),a}var r=t(wa,0)[0]-t(-wa,0)[0];return n.raw=a,n}function en(t,n){var a=i(t),r=i(n),e=Math.cos(n),o=Math.cos(t)*e,u=Math.sin(t)*e,M=Math.sin(r*n);t=Math.abs(Math.atan2(u,M)),n=h(o),Math.abs(t-wa)>da&&(t%=wa);var s=on(t>pa/4?wa-t:t,n);return t>pa/4&&(M=s[0],s[0]=-s[1],s[1]=-M),s[0]*=a,s[1]*=-r,s}function on(t,n){if(n===wa)return[0,0];var a=Math.sin(n),r=a*a,e=r*r,o=1+e,i=1+3*e,u=1-e,s=h(1/Math.sqrt(o)),c=u+r*o*s,f=(1-a)/c,v=Math.sqrt(f),l=f*o,g=Math.sqrt(l),d=v*u;if(0===t)return[0,-(d+r*g)];var b=Math.cos(n),p=1/b,w=2*a*b,q=(-3*r+s*i)*w,m=(-c*b-(1-a)*q)/(c*c),y=.5*m/v,S=u*y-2*r*v*w,Q=r*o*m+f*i*w,R=-p*w,T=-p*Q,x=-2*p*S,E=4*t/pa;if(t>.222*pa||pa/4>n&&t>.175*pa){var k=(d+r*M(l*(1+e)-d*d))/(1+e);if(t>pa/4)return[k,k];var P=k,_=.5*k,z=50;k=.5*(_+P);do{var B=Math.sqrt(l-k*k),F=k*(x+R*B)+T*h(k/g)-E;if(!F)break;0>F?_=k:P=k,k=.5*(_+P)}while(Math.abs(P-_)>da&&--z>0)}else{var j,k=da,z=25;do{var A=k*k,B=M(l-A),G=x+R*B,F=k*G+T*h(k/g)-E,C=G+(T-R*A)/B;k-=j=B?F/C:0}while(Math.abs(j)>da&&--z>0)}return[k,-d-r*M(l-k*k)]}function hn(t,n){for(var a=0,r=1,e=.5,o=50;;){var i=e*e,h=Math.sqrt(e),u=Math.asin(1/Math.sqrt(1+i)),M=1-i+e*(1+i)*u,s=(1-h)/M,c=Math.sqrt(s),f=s*(1+i),v=c*(1-i),l=f-t*t,g=Math.sqrt(l),d=n+v+e*g;if(Math.abs(r-a)<ba||0===--o||0===d)break;d>0?a=e:r=e,e=.5*(a+r)}if(!o)return null;var b=Math.asin(h),p=Math.cos(b),w=1/p,q=2*h*p,m=(-3*e+u*(1+3*i))*q,y=(-M*p-(1-h)*m)/(M*M),S=.5*y/c,Q=(1-i)*S-2*e*c*q,R=-2*w*Q,T=-w*q,x=-w*(e*(1+i)*y+s*(1+3*i)*q);return[pa/4*(t*(R+T*g)+x*Math.asin(t/Math.sqrt(f))),b]}function un(t,n,a){if(!t){var r=Mn(n,1-a);return[[0,r[0]/r[1]],[1/r[1],0],[r[2]/r[1],0]]}var e=Mn(t,a);if(!n)return[[e[0],0],[e[1],0],[e[2],0]];var r=Mn(n,1-a),o=r[1]*r[1]+a*e[0]*e[0]*r[0]*r[0];return[[e[0]*r[2]/o,e[1]*e[2]*r[0]*r[1]/o],[e[1]*r[1]/o,-e[0]*e[2]*r[0]*r[2]/o],[e[2]*r[1]*r[2]/o,-a*e[0]*e[1]*r[0]/o]]}function Mn(t,n){var a,r,e,o,i;if(da>n)return o=Math.sin(t),r=Math.cos(t),a=.25*n*(t-o*r),[o-a*r,r+a*o,1-.5*n*o*o,t-a];if(n>=1-da)return a=.25*(1-n),r=b(t),o=g(t),e=1/r,i=r*d(t),[o+a*(i-t)/(r*r),e-a*o*e*(i-t),e+a*o*e*(i+t),2*Math.atan(Math.exp(t))-wa+a*(i-t)/r];var u=[1,0,0,0,0,0,0,0,0],s=[Math.sqrt(n),0,0,0,0,0,0,0,0],c=0;for(r=Math.sqrt(1-n),i=1;Math.abs(s[c]/u[c])>da&&8>c;)a=u[c++],s[c]=.5*(a-r),u[c]=.5*(a+r),r=M(a*r),i*=2;e=i*u[c]*t;do o=s[c]*Math.sin(r=e)/u[c],e=.5*(h(o)+e);while(--c);return[Math.sin(e),o=Math.cos(e),o/Math.cos(e-r),e]}function sn(t,n,a){var r=Math.abs(t),e=Math.abs(n),o=d(e);if(r){var h=1/Math.sin(r),u=1/(Math.tan(r)*Math.tan(r)),s=-(u+a*o*o*h*h-1+a),c=(a-1)*u,f=.5*(-s+Math.sqrt(s*s-4*c));return[cn(Math.atan(1/Math.sqrt(f)),a)*i(t),cn(Math.atan(M((f/u-1)/a)),1-a)*i(n)]}return[0,cn(Math.atan(o),1-a)*i(n)]}function cn(t,n){if(!n)return t;if(1===n)return Math.log(Math.tan(t/2+pa/4));for(var a=1,r=Math.sqrt(1-n),e=Math.sqrt(n),o=0;Math.abs(e)>da;o++){if(t%pa){var i=Math.atan(r*Math.tan(t)/a);0>i&&(i+=pa),t+=i+~~(t/pa)*pa}else t+=t;e=(a+r)/2,r=Math.sqrt(a*r),e=((a=e)-r)/2}return t/(Math.pow(2,o)*a)}function fn(t,n){var a=(Math.SQRT2-1)/(Math.SQRT2+1),r=Math.sqrt(1-a*a),e=cn(wa,r*r),o=-1,i=Math.log(Math.tan(pa/4+Math.abs(n)/2)),h=Math.exp(o*i)/Math.sqrt(a),u=vn(h*Math.cos(o*t),h*Math.sin(o*t)),M=sn(u[0],u[1],r*r);return[-M[1],(n>=0?1:-1)*(.5*e-M[0])]}function vn(t,n){var a=t*t,r=n+1,e=1-a-n*n;return[.5*((t>=0?wa:-wa)-Math.atan2(e,2*t)),-.25*Math.log(e*e+4*a)+.5*Math.log(r*r+a)]}function ln(t,n){var a=n[0]*n[0]+n[1]*n[1];return[(t[0]*n[0]+t[1]*n[1])/a,(t[1]*n[0]-t[0]*n[1])/a]}function gn(t){function n(t,n){var o=e(t,n);t=o[0],n=o[1];var i=Math.sin(n),h=Math.cos(n),M=Math.cos(t),s=u(a*i+r*h*M),c=Math.sin(s),f=Math.abs(c)>da?s/c:1;return[f*r*Math.sin(t),(Math.abs(t)>wa?f:-f)*(a*h-r*i*M)]}var a=Math.sin(t),r=Math.cos(t),e=dn(t);return e.invert=dn(-t),n.invert=function(t,n){var r=Math.sqrt(t*t+n*n),o=-Math.sin(r),i=Math.cos(r),h=r*i,u=-n*o,s=r*a,c=M(h*h+u*u-s*s),f=Math.atan2(h*s+u*c,u*s-h*c),v=(r>wa?-1:1)*Math.atan2(t*o,r*Math.cos(f)*i+n*Math.sin(f)*o);return e.invert(v,f)},n}function dn(t){var n=Math.sin(t),a=Math.cos(t);return function(t,r){var e=Math.cos(r),o=Math.cos(t)*e,i=Math.sin(t)*e,u=Math.sin(r);return[Math.atan2(i,o*a-u*n),h(u*a+o*n)]}}function bn(){var t=0,n=Qa(gn),a=n(t),r=a.rotate,e=a.stream,o=d3.geo.circle();return a.parallel=function(r){if(!arguments.length)return 180*(t/pa);var e=a.rotate();return n(t=r*pa/180).rotate(e)},a.rotate=function(n){return arguments.length?(r.call(a,[n[0],n[1]-180*(t/pa)]),o.origin([-n[0],-n[1]]),a):(n=r.call(a),n[1]+=180*(t/pa),n)},a.stream=function(t){return t=e(t),t.sphere=function(){t.polygonStart();var n,a=.01,r=o.angle(90-a)().coordinates[0],e=r.length-1,i=-1;for(t.lineStart();++i<e;)t.point((n=r[i])[0],n[1]);for(t.lineEnd(),r=o.angle(90+a)().coordinates[0],e=r.length-1,t.lineStart();--i>=0;)t.point((n=r[i])[0],n[1]);t.lineEnd(),t.polygonEnd()},t},a}function pn(t,n){function a(a,r){var e=Ga(a/n,r);return e[0]*=t,e}return arguments.length<2&&(n=t),1===n?Ga:1/0===n?qn:(a.invert=function(a,r){var e=Ga.invert(a/t,r);return e[0]*=n,e},a)}function wn(){var t=2,n=Qa(pn),a=n(t);return a.coefficient=function(a){return arguments.length?n(t=+a):t},a}function qn(t,n){return[t*Math.cos(n)/Math.cos(n/=2),2*Math.sin(n)]}function mn(t,n){for(var a,r=Math.sin(n)*(0>n?2.43763:2.67595),e=0;20>e&&(n-=a=(n+Math.sin(n)-r)/(1+Math.cos(n)),!(Math.abs(a)<da));e++);return[.85*t*Math.cos(n*=.5),Math.sin(n)*(0>n?1.93052:1.75859)]}function yn(t){function n(n,s){var c,f=Math.abs(s);if(f>r){var v=Math.min(t-1,Math.max(0,Math.floor((n+pa)/M)));n+=pa*(t-1)/t-v*M,c=d3.geo.collignon.raw(n,f),c[0]=c[0]*e/o-e*(t-1)/(2*t)+v*e/t,c[1]=i+4*(c[1]-h)*u/e,0>s&&(c[1]=-c[1])}else c=a(n,s);return c[0]/=2,c}var a=d3.geo.cylindricalEqualArea.raw(0),r=Ca*pa/180,e=2*pa,o=d3.geo.collignon.raw(pa,r)[0]-d3.geo.collignon.raw(-pa,r)[0],i=a(0,r)[1],h=d3.geo.collignon.raw(0,r)[1],u=d3.geo.collignon.raw(0,wa)[1]-h,M=2*pa/t;return n.invert=function(n,r){n*=2;var s=Math.abs(r);if(s>i){var c=Math.min(t-1,Math.max(0,Math.floor((n+pa)/M)));n=(n+pa*(t-1)/t-c*M)*o/e;var f=d3.geo.collignon.raw.invert(n,.25*(s-i)*e/u+h);return f[0]-=pa*(t-1)/t-c*M,0>r&&(f[1]=-f[1]),f}return a.invert(n,r)},n}function Sn(){function t(){var t=180/n;return{type:"Polygon",coordinates:[d3.range(-180,180+t/2,t).map(function(t,n){return[t,1&n?90-1e-6:Ca]}).concat(d3.range(180,-180-t/2,-t).map(function(t,n){return[t,1&n?-90+1e-6:-Ca]}))]}}var n=2,a=Qa(yn),r=a(n),e=r.stream;return r.lobes=function(t){return arguments.length?a(n=+t):n},r.stream=function(n){var a=r.rotate(),o=e(n),i=(r.rotate([0,0]),e(n));return r.rotate(a),o.sphere=function(){d3.geo.stream(t(),i)},o},r}function Qn(t){function n(n,e){var h,u,f=1-Math.sin(e);if(f&&2>f){var v,l=wa-e,g=25;do{var d=Math.sin(l),b=Math.cos(l),p=o+Math.atan2(d,r-b),w=1+c-2*r*b;l-=v=(l-s*o-r*d+w*p-.5*f*a)/(2*r*d*p)}while(Math.abs(v)>ba&&--g>0);h=i*Math.sqrt(w),u=n*p/pa}else h=i*(t+f),u=n*o/pa;return[h*Math.sin(u),M-h*Math.cos(u)]}var a,r=1+t,e=Math.sin(1/r),o=h(e),i=2*Math.sqrt(pa/(a=pa+4*o*r)),M=.5*i*(r+Math.sqrt(t*(2+t))),s=t*t,c=r*r;return n.invert=function(t,n){var e=t*t+(n-=M)*n,f=(1+c-e/(i*i))/(2*r),v=u(f),l=Math.sin(v),g=o+Math.atan2(l,r-f);return[h(t/Math.sqrt(e))*pa/g,h(1-2*(v-s*o-r*l+(1+c-2*r*f)*g)/a)]},n}function Rn(){var t=1,n=Qa(Qn),a=n(t);return a.ratio=function(a){return arguments.length?n(t=+a):t},a}function Tn(t,n){return n>-Da?(t=Ea(t,n),t[1]+=La,t):E(t,n)}function xn(t,n){return Math.abs(n)>Da?(t=Ea(t,n),t[1]-=n>0?La:-La,t):E(t,n)}function En(t,n){return[3*t/(2*pa)*Math.sqrt(pa*pa/3-n*n),n]}function kn(t){function n(n,a){if(Math.abs(Math.abs(a)-wa)<da)return[0,0>a?-2:2];var r=Math.sin(a),e=Math.pow((1+r)/(1-r),t/2),o=.5*(e+1/e)+Math.cos(n*=t);return[2*Math.sin(n)/o,(e-1/e)/o]}return n.invert=function(n,a){var r=Math.abs(a);if(Math.abs(r-2)<da)return n?null:[0,i(a)*wa];if(r>2)return null;n/=2,a/=2;var e=n*n,o=a*a,u=2*a/(1+e+o);return u=Math.pow((1+u)/(1-u),1/t),[Math.atan2(2*n,1-e-o)/t,h((u-1)/(u+1))]},n}function Pn(){var t=.5,n=Qa(kn),a=n(t);return a.spacing=function(a){return arguments.length?n(t=+a):t},a}function _n(t,n){return[t*(1+Math.sqrt(Math.cos(n)))/2,n/(Math.cos(n/2)*Math.cos(t/6))]}function zn(t,n){var a=t*t,r=n*n;return[t*(.975534+r*(-.119161+a*-.0143059+r*-.0547009)),n*(1.00384+a*(.0802894+r*-.02855+199025e-9*a)+r*(.0998909+r*-.0491032))]}function Bn(t,n){return[Math.sin(t)/Math.cos(n),Math.tan(n)*Math.cos(t)]}function Fn(t){function n(n,e){var o=e-t,i=Math.abs(o)<da?n*a:Math.abs(i=pa/4+e/2)<da||Math.abs(Math.abs(i)-wa)<da?0:n*o/Math.log(Math.tan(i)/r);return[i,o]}var a=Math.cos(t),r=Math.tan(pa/4+t/2);return n.invert=function(n,e){var o,i=e+t;return[Math.abs(e)<da?n/a:Math.abs(o=pa/4+i/2)<da||Math.abs(Math.abs(o)-wa)<da?0:n*Math.log(Math.tan(o)/r)/e,i]},n}function jn(t,n){return[t,1.25*Math.log(Math.tan(pa/4+.4*n))]}function An(t){function n(n,r){for(var e,o=Math.cos(r),i=2/(1+o*Math.cos(n)),h=i*o*Math.sin(n),u=i*Math.sin(r),M=a,s=t[M],c=s[0],f=s[1];--M>=0;)s=t[M],c=s[0]+h*(e=c)-u*f,f=s[1]+h*f+u*e;return c=h*(e=c)-u*f,f=h*f+u*e,[c,f]}var a=t.length-1;return n.invert=function(n,r){var e=20,o=n,i=r;do{for(var u,M=a,s=t[M],c=s[0],f=s[1],v=0,l=0;--M>=0;)s=t[M],v=c+o*(u=v)-i*l,l=f+o*l+i*u,c=s[0]+o*(u=c)-i*f,f=s[1]+o*f+i*u;v=c+o*(u=v)-i*l,l=f+o*l+i*u,c=o*(u=c)-i*f-n,f=o*f+i*u-r;var g,d,b=v*v+l*l;o-=g=(c*v+f*l)/b,i-=d=(f*v-c*l)/b}while(Math.abs(g)+Math.abs(d)>da*da&&--e>0);if(e){var p=Math.sqrt(o*o+i*i),w=2*Math.atan(.5*p),q=Math.sin(w);return[Math.atan2(o*q,p*Math.cos(w)),p?h(i*q/p):0]}},n}function Gn(){var t=Oa.miller,n=Qa(An),a=n(t);return a.coefficients=function(a){return arguments.length?n(t="string"==typeof a?Oa[a]:a):t},a}function Cn(t,n){var a=Math.sqrt(6),r=Math.sqrt(7),e=Math.asin(7*Math.sin(n)/(3*a));return[a*t*(2*Math.cos(2*e/3)-1)/r,9*Math.sin(e/3)/r]}function Dn(t,n){for(var a,r=(1+Math.SQRT1_2)*Math.sin(n),e=n,o=0;25>o&&(e-=a=(Math.sin(e/2)+Math.sin(e)-r)/(.5*Math.cos(e/2)+Math.cos(e)),!(Math.abs(a)<da));o++);return[t*(1+2*Math.cos(e)/Math.cos(e/2))/(3*Math.SQRT2),2*Math.sqrt(3)*Math.sin(e/2)/Math.sqrt(2+Math.SQRT2)]}function Ln(t,n){for(var a,r=Math.sqrt(6/(4+pa)),e=(1+pa/4)*Math.sin(n),o=n/2,i=0;25>i&&(o-=a=(o/2+Math.sin(o)-e)/(.5+Math.cos(o)),!(Math.abs(a)<da));i++);return[r*(.5+Math.cos(o))*t/1.5,r*o]}function On(t,n){var a=n*n,r=a*a;return[t*(.8707-.131979*a+r*(-.013791+r*(.003971*a-.001529*r))),n*(1.007226+a*(.015085+r*(-.044475+.028874*a-.005916*r)))]}function Hn(t,n){return[t*(1+Math.cos(n))/2,2*(n-Math.tan(n/2))]}function In(t,n){var a=n*n;return[t,n*(Ha+a*a*(Ia+a*(Ja+Ka*a)))]}function Jn(t,n){if(Math.abs(n)<da)return[t,0];var a=Math.tan(n),r=t*Math.sin(n);return[Math.sin(r)/a,n+(1-Math.cos(r))/a]}function Kn(t){function n(n,r){var e=a?Math.tan(n*a/2)/a:n/2;if(!r)return[2*e,-t];var o=2*Math.atan(e*Math.sin(r)),i=1/Math.tan(r);return[Math.sin(o)*i,r+(1-Math.cos(o))*i-t]}var a=Math.sin(t);return n.invert=function(n,r){if(Math.abs(r+=t)<da)return[a?2*Math.atan(a*n/2)/a:n,0];var e,o=n*n+r*r,i=0,M=10;do{var s=Math.tan(i),c=1/Math.cos(i),f=o-2*r*i+i*i;i-=e=(s*f+2*(i-r))/(2+f*c*c+2*(i-r)*s)}while(Math.abs(e)>da&&--M>0);var v=n*(s=Math.tan(i)),l=Math.tan(Math.abs(r)<Math.abs(i+1/s)?.5*h(v):.5*u(v)+pa/4)/Math.sin(i);return[a?2*Math.atan(a*l)/a:2*l,i]},n}function Nn(t,n){var a,r=Math.min(18,36*Math.abs(n)/pa),e=Math.floor(r),o=r-e,i=(a=Za[e])[0],h=a[1],u=(a=Za[++e])[0],M=a[1],s=(a=Za[Math.min(19,++e)])[0],c=a[1];return[t*(u+o*(s-i)/2+o*o*(s-2*u+i)/2),(n>0?wa:-wa)*(M+o*(c-h)/2+o*o*(c-2*M+h)/2)]}function Un(t){function n(n,a){var r=Math.cos(a),e=(t-1)/(t-r*Math.cos(n));return[e*r*Math.sin(n),e*Math.sin(a)]}return n.invert=function(n,a){var r=n*n+a*a,e=Math.sqrt(r),o=(t-Math.sqrt(1-r*(t+1)/(t-1)))/((t-1)/e+e/(t-1));return[Math.atan2(n*o,e*Math.sqrt(1-o*o)),e?h(a*o/e):0]},n}function Vn(t,n){function a(n,a){var i=r(n,a),h=i[1],u=h*o/(t-1)+e;return[i[0]*e/u,h/u]}var r=Un(t);if(!n)return r;var e=Math.cos(n),o=Math.sin(n);return a.invert=function(n,a){var i=(t-1)/(t-1-a*o);return r.invert(i*n,i*a*e)},a}function Wn(){var t=1.4,n=0,a=Qa(Vn),r=a(t,n);return r.distance=function(r){return arguments.length?a(t=+r,n):t},r.tilt=function(r){return arguments.length?a(t,n=r*pa/180):180*n/pa},r}function Xn(t,n){var a=Math.tan(n/2),r=Math.sin(pa/4*a);return[t*(.74482-.34588*r*r),1.70711*a]}function Yn(t){function n(n,o){var i=u(Math.cos(o)*Math.cos(n-a)),h=u(Math.cos(o)*Math.cos(n-r)),s=0>o?-1:1;return i*=i,h*=h,[(i-h)/(2*t),s*M(4*e*h-(e-i+h)*(e-i+h))/(2*t)]}if(!t)return d3.geo.azimuthalEquidistant.raw;var a=-t/2,r=-a,e=t*t,o=Math.tan(r),i=.5/Math.sin(r);return n.invert=function(t,n){var e,h,M=n*n,s=Math.cos(Math.sqrt(M+(e=t+a)*e)),c=Math.cos(Math.sqrt(M+(e=t+r)*e));return[Math.atan2(h=s-c,e=(s+c)*o),(0>n?-1:1)*u(Math.sqrt(e*e+h*h)*i)]},n}function Zn(){var t=[[0,0],[0,0]],n=Qa(Yn),a=n(0),r=a.rotate;return delete a.rotate,a.points=function(a){if(!arguments.length)return t;t=a;var e=d3.geo.interpolate(a[0],a[1]),o=e(.5),i=d3.geo.rotation([-o[0],-o[1]])(a[0]),u=.5*e.distance,M=-h(Math.sin(i[1]*ma)/Math.sin(u));return i[0]>0&&(M=pa-M),r.call(i,[-o[0],-o[1],-M*ya]),n(2*u)},a}function $n(t){function n(t,n){var r=d3.geo.gnomonic.raw(t,n);return r[0]*=a,r}var a=Math.cos(t);return n.invert=function(t,n){return d3.geo.gnomonic.raw.invert(t/a,n)},n}function ta(){var t=[[0,0],[0,0]],n=Qa($n),a=n(0),r=a.rotate;return delete a.rotate,a.points=function(a){if(!arguments.length)return t;t=a;var e=d3.geo.interpolate(a[0],a[1]),o=e(.5),i=d3.geo.rotation([-o[0],-o[1]])(a[0]),u=.5*e.distance,M=-h(Math.sin(i[1]*ma)/Math.sin(u));return i[0]>0&&(M=pa-M),r.call(i,[-o[0],-o[1],-M*ya]),n(u)},a}function na(t,n){if(Math.abs(n)<da)return[t,0];var a=Math.abs(n/wa),r=h(a);if(Math.abs(t)<da||Math.abs(Math.abs(n)-wa)<da)return[0,i(n)*pa*Math.tan(r/2)];var e=Math.cos(r),o=Math.abs(pa/t-t/pa)/2,u=o*o,M=e/(a+e-1),s=M*(2/a-1),c=s*s,f=c+u,v=M-c,l=u+M;return[i(t)*pa*(o*v+Math.sqrt(u*v*v-f*(M*M-c)))/f,i(n)*pa*(s*l-o*Math.sqrt((u+1)*f-l*l))/f]}function aa(t,n){if(Math.abs(n)<da)return[t,0];var a=Math.abs(n/wa),r=h(a);if(Math.abs(t)<da||Math.abs(Math.abs(n)-wa)<da)return[0,i(n)*pa*Math.tan(r/2)];var e=Math.cos(r),o=Math.abs(pa/t-t/pa)/2,u=o*o,s=e*(Math.sqrt(1+u)-o*e)/(1+u*a*a);return[i(t)*pa*s,i(n)*pa*M(1-s*(2*o+s))]}function ra(t,n){if(Math.abs(n)<da)return[t,0];var a=n/wa,r=h(a);if(Math.abs(t)<da||Math.abs(Math.abs(n)-wa)<da)return[0,pa*Math.tan(r/2)];var e=(pa/t-t/pa)/2,o=a/(1+Math.cos(r));return[pa*(i(t)*M(e*e+1-o*o)-e),pa*o]}function ea(t,n){if(!n)return[t,0];var a=Math.abs(n);if(!t||a===wa)return[0,n];var r=a/wa,e=r*r,o=(8*r-e*(e+2)-5)/(2*e*(r-1)),h=o*o,u=r*o,s=e+h+2*u,c=r+3*o,f=t/wa,v=f+1/f,l=i(Math.abs(t)-wa)*Math.sqrt(v*v-4),g=l*l,d=s*(e+h*g-1)+(1-e)*(e*(c*c+4*h)+12*u*h+4*h*h),b=(l*(s+h-1)+2*M(d))/(4*s+g);return[i(t)*wa*b,i(n)*wa*M(1+l*Math.abs(b)-b*b)]}function oa(t,n){return[t*Math.sqrt(1-3*n*n/(pa*pa)),n]}function ia(t,n){var a=.90631*Math.sin(n),r=Math.sqrt(1-a*a),e=Math.sqrt(2/(1+r*Math.cos(t/=3)));return[2.66723*r*e*Math.sin(t),1.24104*a*e]}function ha(t,n){var a=Math.cos(n),r=Math.cos(t)*a,e=1-r,o=Math.cos(t=Math.atan2(Math.sin(t)*a,-Math.sin(n))),i=Math.sin(t);return a=M(1-r*r),[i*a-o*e,-o*a-i*e]}function ua(t,n){var a=f(t,n);return[(a[0]+t/wa)/2,(a[1]+n)/2]}d3.geo.project=function(t,a){var r=a.stream;if(!r)throw new Error("not yet supported");return(t&&Ma.hasOwnProperty(t.type)?Ma[t.type]:n)(t,r)};var Ma={Feature:t,FeatureCollection:function(n,a){return{type:"FeatureCollection",features:n.features.map(function(n){return t(n,a)})}}},sa=[],ca=[],fa={point:function(t,n){sa.push([t,n])},result:function(){var t=sa.length?sa.length<2?{type:"Point",coordinates:sa[0]}:{type:"MultiPoint",coordinates:sa}:null;return sa=[],t}},va={lineStart:a,point:function(t,n){sa.push([t,n])},lineEnd:function(){sa.length&&(ca.push(sa),sa=[])},result:function(){var t=ca.length?ca.length<2?{type:"LineString",coordinates:ca[0]}:{type:"MultiLineString",coordinates:ca}:null;return ca=[],t}},la={polygonStart:a,lineStart:a,point:function(t,n){sa.push([t,n])},lineEnd:function(){var t=sa.length;if(t){do sa.push(sa[0].slice());while(++t<4);ca.push(sa),sa=[]}},polygonEnd:a,result:function(){if(!ca.length)return null;var t=[],n=[];return ca.forEach(function(a){r(a)?t.push([a]):n.push(a)}),n.forEach(function(n){var a=n[0];t.some(function(t){return e(t[0],a)?(t.push(n),!0):void 0})||t.push([n])}),ca=[],t.length?t.length>1?{type:"MultiPolygon",coordinates:t}:{type:"Polygon",coordinates:t[0]}:null}},ga={Point:fa,MultiPoint:fa,LineString:va,MultiLineString:va,Polygon:la,MultiPolygon:la,Sphere:la},da=1e-6,ba=da*da,pa=Math.PI,wa=pa/2,qa=Math.sqrt(pa),ma=pa/180,ya=180/pa,Sa=d3.geo.projection,Qa=d3.geo.projectionMutator;d3.geo.interrupt=function(t){function n(n,a){for(var r=0>a?-1:1,e=h[+(0>a)],o=0,i=e.length-1;i>o&&n>e[o][2][0];++o);var u=t(n-e[o][1][0],a);return u[0]+=t(e[o][1][0],r*a>r*e[o][0][1]?e[o][0][1]:a)[0],u}function a(){i=h.map(function(n){return n.map(function(n){var a,r=t(n[0][0],n[0][1])[0],e=t(n[2][0],n[2][1])[0],o=t(n[1][0],n[0][1])[1],i=t(n[1][0],n[1][1])[1];return o>i&&(a=o,o=i,i=a),[[r,o],[e,i]]})})}function r(){for(var t=1e-6,n=[],a=0,r=h[0].length;r>a;++a){var o=h[0][a],i=180*o[0][0]/pa,u=180*o[0][1]/pa,M=180*o[1][1]/pa,s=180*o[2][0]/pa,c=180*o[2][1]/pa;n.push(e([[i+t,u+t],[i+t,M-t],[s-t,M-t],[s-t,c+t]],30))}for(var a=h[1].length-1;a>=0;--a){var o=h[1][a],i=180*o[0][0]/pa,u=180*o[0][1]/pa,M=180*o[1][1]/pa,s=180*o[2][0]/pa,c=180*o[2][1]/pa;n.push(e([[s-t,c-t],[s-t,M+t],[i+t,M+t],[i+t,u-t]],30))}return{type:"Polygon",coordinates:[d3.merge(n)]}}function e(t,n){for(var a,r,e,o=-1,i=t.length,h=t[0],u=[];++o<i;){a=t[o],r=(a[0]-h[0])/n,e=(a[1]-h[1])/n;for(var M=0;n>M;++M)u.push([h[0]+M*r,h[1]+M*e]);h=a}return u.push(a),u}function o(t,n){return Math.abs(t[0]-n[0])<da&&Math.abs(t[1]-n[1])<da}var i,h=[[[[-pa,0],[0,wa],[pa,0]]],[[[-pa,0],[0,-wa],[pa,0]]]];t.invert&&(n.invert=function(a,r){for(var e=i[+(0>r)],u=h[+(0>r)],M=0,s=e.length;s>M;++M){var c=e[M];if(c[0][0]<=a&&a<c[1][0]&&c[0][1]<=r&&r<c[1][1]){var f=t.invert(a-t(u[M][1][0],0)[0],r);return f[0]+=u[M][1][0],o(n(f[0],f[1]),[a,r])?f:null}}});var u=d3.geo.projection(n),M=u.stream;return u.stream=function(t){var n=u.rotate(),a=M(t),e=(u.rotate([0,0]),M(t));return u.rotate(n),a.sphere=function(){d3.geo.stream(r(),e)},a},u.lobes=function(t){return arguments.length?(h=t.map(function(t){return t.map(function(t){return[[t[0][0]*pa/180,t[0][1]*pa/180],[t[1][0]*pa/180,t[1][1]*pa/180],[t[2][0]*pa/180,t[2][1]*pa/180]]})}),a(),u):h.map(function(t){return t.map(function(t){return[[180*t[0][0]/pa,180*t[0][1]/pa],[180*t[1][0]/pa,180*t[1][1]/pa],[180*t[2][0]/pa,180*t[2][1]/pa]]})})},u},(d3.geo.airy=c).raw=s,f.invert=function(t,n){if(!(t*t+4*n*n>pa*pa+da)){var a=t,r=n,e=25;do{var o,i=Math.sin(a),h=Math.sin(a/2),M=Math.cos(a/2),s=Math.sin(r),c=Math.cos(r),f=Math.sin(2*r),v=s*s,l=c*c,g=h*h,d=1-l*M*M,b=d?u(c*M)*Math.sqrt(o=1/d):o=0,p=2*b*c*h-t,w=b*s-n,q=o*(l*g+b*c*M*v),m=o*(.5*i*f-2*b*s*h),y=.25*o*(f*h-b*s*l*i),S=o*(v*M+b*g*c),Q=m*y-S*q;if(!Q)break;var R=(w*m-p*S)/Q,T=(p*y-w*q)/Q;a-=R,r-=T}while((Math.abs(R)>da||Math.abs(T)>da)&&--e>0);return[a,r]}},(d3.geo.aitoff=function(){return Sa(f)}).raw=f,(d3.geo.armadillo=l).raw=v,q.invert=function(t,n){if(t*=3/8,n*=3/8,!t&&Math.abs(n)>1)return null;var a=t*t,r=n*n,e=1+a+r,o=Math.sqrt(.5*(e-Math.sqrt(e*e-4*n*n))),u=h(o)/3,M=o?w(Math.abs(n/o))/3:p(Math.abs(t))/3,s=Math.cos(u),c=b(M),f=c*c-s*s;return[2*i(t)*Math.atan2(d(M)*s,.25-f),2*i(n)*Math.atan2(c*Math.sin(u),.25+f)]},(d3.geo.august=function(){return Sa(q)}).raw=q;var Ra=Math.log(1+Math.SQRT2);m.invert=function(t,n){if((r=Math.abs(n))<Ra)return[t,2*Math.atan(Math.exp(n))-wa];
var a,r,e=Math.sqrt(8),o=pa/4,h=25;do{var u=Math.cos(o/2),M=Math.tan(o/2);o-=a=(e*(o-pa/4)-Math.log(M)-r)/(e-.5*u*u/M)}while(Math.abs(a)>ba&&--h>0);return[t/(Math.cos(o)*(e-1/Math.sin(o))),i(n)*o]},(d3.geo.baker=function(){return Sa(m)}).raw=m;var Ta=d3.geo.azimuthalEquidistant.raw;(d3.geo.berghaus=S).raw=y;var xa=Q(pa),Ea=R(Math.SQRT2/wa,Math.SQRT2,pa);(d3.geo.mollweide=function(){return Sa(Ea)}).raw=Ea,T.invert=function(t,n){var a,r,e=2.00276,o=e*n,i=0>n?-pa/4:pa/4,h=25;do r=o-Math.SQRT2*Math.sin(i),i-=a=(Math.sin(2*i)+2*i-pa*Math.sin(r))/(2*Math.cos(2*i)+2+pa*Math.cos(r)*Math.SQRT2*Math.cos(i));while(Math.abs(a)>da&&--h>0);return r=o-Math.SQRT2*Math.sin(i),[t*(1/Math.cos(r)+1.11072/Math.cos(i))/e,r]},(d3.geo.boggs=function(){return Sa(T)}).raw=T,E.invert=function(t,n){return[t/Math.cos(n),n]},(d3.geo.sinusoidal=function(){return Sa(E)}).raw=E,(d3.geo.bonne=function(){return x(k).parallel(45)}).raw=k,(d3.geo.bottomley=function(){var t=pa/6,n=d3.geo.projectionMutator(P),a=n(t);return a.variant=function(a){return arguments.length?n(t=+a):t},a}).raw=P;var ka=R(1,4/pa,pa);(d3.geo.bromley=function(){return Sa(ka)}).raw=ka,(d3.geo.chamberlin=z).raw=_,G.invert=function(t,n){var a=(a=n/qa-1)*a;return[a>0?t*Math.sqrt(pa/a)/2:0,h(1-a)]},(d3.geo.collignon=function(){return Sa(G)}).raw=G,(d3.geo.craig=function(){return x(C)}).raw=C,D.invert=function(t,n){var a=Math.sqrt(3),r=3*h(n/(a*qa));return[qa*t/(a*(2*Math.cos(2*r/3)-1)),r]},(d3.geo.craster=function(){return Sa(D)}).raw=D,(d3.geo.cylindricalEqualArea=function(){return x(L)}).raw=L,(d3.geo.cylindricalStereographic=function(){return x(O)}).raw=O,H.invert=function(t,n){var a=Math.sqrt(8/(3*pa)),r=n/a;return[t/(a*(1-Math.abs(r)/pa)),r]},(d3.geo.eckert1=function(){return Sa(H)}).raw=H,I.invert=function(t,n){var a=2-Math.abs(n)/Math.sqrt(2*pa/3);return[t*Math.sqrt(6*pa)/(2*a),i(n)*h((4-a*a)/3)]},(d3.geo.eckert2=function(){return Sa(I)}).raw=I,J.invert=function(t,n){var a=Math.sqrt(pa*(4+pa))/2;return[t*a/(1+M(1-n*n*(4+pa)/(4*pa))),n*a/2]},(d3.geo.eckert3=function(){return Sa(J)}).raw=J,K.invert=function(t,n){var a=.5*n*Math.sqrt((4+pa)/pa),r=h(a),e=Math.cos(r);return[t/(2/Math.sqrt(pa*(4+pa))*(1+e)),h((r+a*(e+2))/(2+wa))]},(d3.geo.eckert4=function(){return Sa(K)}).raw=K,N.invert=function(t,n){var a=Math.sqrt(2+pa),r=n*a/2;return[a*t/(1+Math.cos(r)),r]},(d3.geo.eckert5=function(){return Sa(N)}).raw=N,U.invert=function(t,n){var a=1+wa,r=Math.sqrt(a/2);return[2*t*r/(1+Math.cos(n*=r)),h((n+Math.sin(n))/a)]},(d3.geo.eckert6=function(){return Sa(U)}).raw=U,V.invert=function(t,n){var a=d3.geo.august.raw.invert(t/1.2,1.065*n);if(!a)return null;var r=a[0],e=a[1],o=20;t/=Pa,n/=Pa;do{var i=r/2,h=e/2,u=Math.sin(i),M=Math.cos(i),s=Math.sin(h),c=Math.cos(h),f=Math.cos(e),v=Math.sqrt(f),l=s/(c+Math.SQRT2*M*v),g=l*l,d=Math.sqrt(2/(1+g)),b=Math.SQRT2*c+(M+u)*v,p=Math.SQRT2*c+(M-u)*v,w=b/p,q=Math.sqrt(w),m=q-1/q,y=q+1/q,S=d*m-2*Math.log(q)-t,Q=d*l*y-2*Math.atan(l)-n,R=s&&Math.SQRT1_2*v*u*g/s,T=(Math.SQRT2*M*c+v)/(2*(c+Math.SQRT2*M*v)*(c+Math.SQRT2*M*v)*v),x=-.5*l*d*d*d,E=x*R,k=x*T,P=(P=2*c+Math.SQRT2*v*(M-u))*P*q,_=(Math.SQRT2*M*c*v+f)/P,z=-(Math.SQRT2*u*s)/(v*P),B=m*E-2*_/q+d*(_+_/w),F=m*k-2*z/q+d*(z+z/w),j=l*y*E-2*R/(1+g)+d*y*R+d*l*(_-_/w),A=l*y*k-2*T/(1+g)+d*y*T+d*l*(z-z/w),G=F*j-A*B;if(!G)break;var C=(Q*F-S*A)/G,D=(S*j-Q*B)/G;r-=C,e=Math.max(-wa,Math.min(wa,e-D))}while((Math.abs(C)>da||Math.abs(D)>da)&&--o>0);return Math.abs(Math.abs(e)-wa)<da?[0,e]:o&&[r,e]};var Pa=3+2*Math.SQRT2;(d3.geo.eisenlohr=function(){return Sa(V)}).raw=V,W.invert=function(t,n){var a=n/(1+_a);return[t?t/(_a*M(1-a*a)):0,2*Math.atan(a)]};var _a=Math.cos(35*ma);(d3.geo.fahey=function(){return Sa(W)}).raw=W,X.invert=function(t,n){var a=Math.atan(n/qa),r=Math.cos(a),e=2*a;return[.5*t*qa/(Math.cos(e)*r*r),e]},(d3.geo.foucaut=function(){return Sa(X)}).raw=X,d3.geo.gilbert=function(t){function n(n){return t([.5*n[0],h(Math.tan(.5*n[1]*ma))*ya])}var a=d3.geo.equirectangular().scale(ya).translate([0,0]);return t.invert&&(n.invert=function(n){return n=t.invert(n),n[0]*=2,n[1]=2*Math.atan(Math.sin(n[1]*ma))*ya,n}),n.stream=function(n){n=t.stream(n);var r=a.stream({point:function(t,a){n.point(.5*t,h(Math.tan(.5*-a*ma))*ya)},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}});return r.sphere=function(){n.sphere()},r.valid=!1,r},n};var za=d3.geo.azimuthalEquidistant.raw;(d3.geo.gingery=$).raw=Y;var Ba=nn(2.8284,-1.6988,.75432,-.18071,1.76003,-.38914,.042555);(d3.geo.ginzburg4=function(){return Sa(Ba)}).raw=Ba;var Fa=nn(2.583819,-.835827,.170354,-.038094,1.543313,-.411435,.082742);(d3.geo.ginzburg5=function(){return Sa(Fa)}).raw=Fa;var ja=nn(5/6*pa,-.62636,-.0344,0,1.3493,-.05524,0,.045);(d3.geo.ginzburg6=function(){return Sa(ja)}).raw=ja,an.invert=function(t,n){var a,r=t,e=n,o=50;do{var i=e*e;e-=a=(e*(1+i/12)-n)/(1+i/4)}while(Math.abs(a)>da&&--o>0);o=50,t/=1-.162388*i;do{var h=(h=r*r)*h;r-=a=(r*(.87-952426e-9*h)-t)/(.87-.00476213*h)}while(Math.abs(a)>da&&--o>0);return[r,e]},(d3.geo.ginzburg8=function(){return Sa(an)}).raw=an;var Aa=nn(2.6516,-.76534,.19123,-.047094,1.36289,-.13965,.031762);(d3.geo.ginzburg9=function(){return Sa(Aa)}).raw=Aa,en.invert=function(t,n){var a=i(t),r=i(n),e=-a*t,o=-r*n,u=1>o/e,M=hn(u?o:e,u?e:o),s=M[0],c=M[1];u&&(s=-wa-s);var f=Math.cos(c),t=Math.cos(s)*f,n=Math.sin(s)*f,v=Math.sin(c);return[a*(Math.atan2(n,-v)+pa),r*h(t)]},d3.geo.gringorten=rn(en),fn.invert=function(t,n){var a=(Math.SQRT2-1)/(Math.SQRT2+1),r=Math.sqrt(1-a*a),e=cn(wa,r*r),o=-1,i=un(.5*e-n,-t,r*r),h=ln(i[0],i[1]),u=Math.atan2(h[1],h[0])/o;return[u,2*Math.atan(Math.exp(.5/o*Math.log(a*h[0]*h[0]+a*h[1]*h[1])))-wa]},d3.geo.guyou=rn(fn),(d3.geo.hammerRetroazimuthal=bn).raw=gn;var Ga=d3.geo.azimuthalEqualArea.raw;qn.invert=function(t,n){var a=2*h(n/2);return[t*Math.cos(a/2)/Math.cos(a),a]},(d3.geo.hammer=wn).raw=pn,mn.invert=function(t,n){var a=Math.abs(a=n*(0>n?.5179951515653813:.5686373742600607))>1-da?a>0?wa:-wa:h(a);return[1.1764705882352942*t/Math.cos(a),Math.abs(a=((a+=a)+Math.sin(a))*(0>n?.4102345310814193:.3736990601468637))>1-da?a>0?wa:-wa:h(a)]},(d3.geo.hatano=function(){return Sa(mn)}).raw=mn;var Ca=41+48/36+37/3600;(d3.geo.healpix=Sn).raw=yn,(d3.geo.hill=Rn).raw=Qn;var Da=.7109889596207567,La=.0528035274542;Tn.invert=function(t,n){return n>-Da?Ea.invert(t,n-La):E.invert(t,n)},(d3.geo.sinuMollweide=function(){return Sa(Tn).rotate([-20,-55])}).raw=Tn,xn.invert=function(t,n){return Math.abs(n)>Da?Ea.invert(t,n+(n>0?La:-La)):E.invert(t,n)},(d3.geo.homolosine=function(){return Sa(xn)}).raw=xn,En.invert=function(t,n){return[2/3*pa*t/Math.sqrt(pa*pa/3-n*n),n]},(d3.geo.kavrayskiy7=function(){return Sa(En)}).raw=En,(d3.geo.lagrange=Pn).raw=kn,_n.invert=function(t,n){var a=Math.abs(t),r=Math.abs(n),e=pa/Math.SQRT2,o=da,i=wa;e>r?i*=r/e:o+=6*u(e/r);for(var h=0;25>h;h++){var s=Math.sin(i),c=M(Math.cos(i)),f=Math.sin(i/2),v=Math.cos(i/2),l=Math.sin(o/6),g=Math.cos(o/6),d=.5*o*(1+c)-a,b=i/(v*g)-r,p=c?-.25*o*s/c:0,w=.5*(1+c),q=(1+.5*i*f/v)/(v*g),m=i/v*(l/6)/(g*g),y=p*m-q*w,S=(d*m-b*w)/y,Q=(b*p-d*q)/y;if(i-=S,o-=Q,Math.abs(S)<da&&Math.abs(Q)<da)break}return[0>t?-o:o,0>n?-i:i]},(d3.geo.larrivee=function(){return Sa(_n)}).raw=_n,zn.invert=function(t,n){var a=i(t)*pa,r=n/2,e=50;do{var o=a*a,h=r*r,u=a*r,M=a*(.975534+h*(-.119161+o*-.0143059+h*-.0547009))-t,s=r*(1.00384+o*(.0802894+h*-.02855+199025e-9*o)+h*(.0998909+h*-.0491032))-n,c=.975534-h*(.119161+.0143059*3*o+.0547009*h),f=-u*(.238322+.2188036*h+.0286118*o),v=u*(.1605788+7961e-7*o+-0.0571*h),l=1.00384+o*(.0802894+199025e-9*o)+h*(3*(.0998909-.02855*o)-.245516*h),g=f*v-l*c,d=(s*f-M*l)/g,b=(M*v-s*c)/g;a-=d,r-=b}while((Math.abs(d)>da||Math.abs(b)>da)&&--e>0);return e&&[a,r]},(d3.geo.laskowski=function(){return Sa(zn)}).raw=zn,Bn.invert=function(t,n){var a=t*t,r=n*n,e=r+1,o=t?Math.SQRT1_2*Math.sqrt((e-Math.sqrt(a*a+2*a*(r-1)+e*e))/a+1):1/Math.sqrt(e);return[h(t*o),i(n)*u(o)]},(d3.geo.littrow=function(){return Sa(Bn)}).raw=Bn,(d3.geo.loximuthal=function(){return x(Fn).parallel(40)}).raw=Fn,jn.invert=function(t,n){return[t,2.5*Math.atan(Math.exp(.8*n))-.625*pa]},(d3.geo.miller=function(){return Sa(jn)}).raw=jn;var Oa={alaska:[[.9972523,0],[.0052513,-.0041175],[.0074606,.0048125],[-.0153783,-.1968253],[.0636871,-.1408027],[.3660976,-.2937382]],gs48:[[.98879,0],[0,0],[-.050909,0],[0,0],[.075528,0]],gs50:[[.984299,0],[.0211642,.0037608],[-.1036018,-.0575102],[-.0329095,-.0320119],[.0499471,.1223335],[.026046,.0899805],[7388e-7,-.1435792],[.0075848,-.1334108],[-.0216473,.0776645],[-.0225161,.0853673]],miller:[[.9245,0],[0,0],[.01943,0]],lee:[[.721316,0],[0,0],[-.00881625,-.00617325]]};(d3.geo.modifiedStereographic=Gn).raw=An,Cn.invert=function(t,n){var a=Math.sqrt(6),r=Math.sqrt(7),e=3*h(n*r/9);return[t*r/(a*(2*Math.cos(2*e/3)-1)),h(3*Math.sin(e)*a/7)]},(d3.geo.mtFlatPolarParabolic=function(){return Sa(Cn)}).raw=Cn,Dn.invert=function(t,n){var a=n*Math.sqrt(2+Math.SQRT2)/(2*Math.sqrt(3)),r=2*h(a);return[3*Math.SQRT2*t/(1+2*Math.cos(r)/Math.cos(r/2)),h((a+Math.sin(r))/(1+Math.SQRT1_2))]},(d3.geo.mtFlatPolarQuartic=function(){return Sa(Dn)}).raw=Dn,Ln.invert=function(t,n){var a=Math.sqrt(6/(4+pa)),r=n/a;return Math.abs(Math.abs(r)-wa)<da&&(r=0>r?-wa:wa),[1.5*t/(a*(.5+Math.cos(r))),h((r/2+Math.sin(r))/(1+pa/4))]},(d3.geo.mtFlatPolarSinusoidal=function(){return Sa(Ln)}).raw=Ln,On.invert=function(t,n){var a,r=n,e=25;do{var o=r*r,i=o*o;r-=a=(r*(1.007226+o*(.015085+i*(-.044475+.028874*o-.005916*i)))-n)/(1.007226+o*(.045255+i*(-0.311325+.259866*o-.005916*11*i)))}while(Math.abs(a)>da&&--e>0);return[t/(.8707+(o=r*r)*(-.131979+o*(-.013791+o*o*o*(.003971-.001529*o)))),r]},(d3.geo.naturalEarth=function(){return Sa(On)}).raw=On,Hn.invert=function(t,n){for(var a=n/2,r=0,e=1/0;10>r&&Math.abs(e)>da;r++){var o=Math.cos(n/2);n-=e=(n-Math.tan(n/2)-a)/(1-.5/(o*o))}return[2*t/(1+Math.cos(n)),n]},(d3.geo.nellHammer=function(){return Sa(Hn)}).raw=Hn;var Ha=1.0148,Ia=.23185,Ja=-.14499,Ka=.02406,Na=Ha,Ua=5*Ia,Va=7*Ja,Wa=9*Ka,Xa=1.790857183;In.invert=function(t,n){n>Xa?n=Xa:-Xa>n&&(n=-Xa);var a,r=n;do{var e=r*r;r-=a=(r*(Ha+e*e*(Ia+e*(Ja+Ka*e)))-n)/(Na+e*e*(Ua+e*(Va+Wa*e)))}while(Math.abs(a)>da);return[t,r]},(d3.geo.patterson=function(){return Sa(In)}).raw=In;var Ya=rn(fn);(d3.geo.peirceQuincuncial=function(){return Ya().quincuncial(!0).rotate([-90,-90,45]).clipAngle(180-1e-6)}).raw=Ya.raw,Jn.invert=function(t,n){if(Math.abs(n)<da)return[t,0];var a,r=t*t+n*n,e=.5*n,o=10;do{var M=Math.tan(e),s=1/Math.cos(e),c=r-2*n*e+e*e;e-=a=(M*c+2*(e-n))/(2+c*s*s+2*(e-n)*M)}while(Math.abs(a)>da&&--o>0);return M=Math.tan(e),[(Math.abs(n)<Math.abs(e+1/M)?h(t*M):i(t)*(u(Math.abs(t*M))+wa))/Math.sin(e),e]},(d3.geo.polyconic=function(){return Sa(Jn)}).raw=Jn,(d3.geo.rectangularPolyconic=function(){return x(Kn)}).raw=Kn;var Za=[[.9986,-.062],[1,0],[.9986,.062],[.9954,.124],[.99,.186],[.9822,.248],[.973,.31],[.96,.372],[.9427,.434],[.9216,.4958],[.8962,.5571],[.8679,.6176],[.835,.6769],[.7986,.7346],[.7597,.7903],[.7186,.8435],[.6732,.8936],[.6213,.9394],[.5722,.9761],[.5322,1]];Za.forEach(function(t){t[1]*=1.0144}),Nn.invert=function(t,n){var a=n/wa,r=90*a,e=Math.min(18,Math.abs(r/5)),o=Math.max(0,Math.floor(e));do{var i=Za[o][1],h=Za[o+1][1],u=Za[Math.min(19,o+2)][1],M=u-i,s=u-2*h+i,c=2*(Math.abs(a)-h)/M,f=s/M,v=c*(1-f*c*(1-2*f*c));if(v>=0||1===o){r=(n>=0?5:-5)*(v+e);var l,g=50;do e=Math.min(18,Math.abs(r)/5),o=Math.floor(e),v=e-o,i=Za[o][1],h=Za[o+1][1],u=Za[Math.min(19,o+2)][1],r-=(l=(n>=0?wa:-wa)*(h+v*(u-i)/2+v*v*(u-2*h+i)/2)-n)*ya;while(Math.abs(l)>ba&&--g>0);break}}while(--o>=0);var d=Za[o][0],b=Za[o+1][0],p=Za[Math.min(19,o+2)][0];return[t/(b+v*(p-d)/2+v*v*(p-2*b+d)/2),r*ma]},(d3.geo.robinson=function(){return Sa(Nn)}).raw=Nn,(d3.geo.satellite=Wn).raw=Vn,Xn.invert=function(t,n){var a=n/1.70711,r=Math.sin(pa/4*a);return[t/(.74482-.34588*r*r),2*Math.atan(a)]},(d3.geo.times=function(){return Sa(Xn)}).raw=Xn,(d3.geo.twoPointEquidistant=Zn).raw=Yn,(d3.geo.twoPointAzimuthal=ta).raw=$n,na.invert=function(t,n){if(Math.abs(n)<da)return[t,0];if(Math.abs(t)<da)return[0,wa*Math.sin(2*Math.atan(n/pa))];var a=(t/=pa)*t,r=(n/=pa)*n,e=a+r,o=e*e,h=-Math.abs(n)*(1+e),M=h-2*r+a,s=-2*h+1+2*r+o,c=r/s+(2*M*M*M/(s*s*s)-9*h*M/(s*s))/27,f=(h-M*M/(3*s))/s,v=2*Math.sqrt(-f/3),l=u(3*c/(f*v))/3;return[pa*(e-1+Math.sqrt(1+2*(a-r)+o))/(2*t),i(n)*pa*(-v*Math.cos(l+pa/3)-M/(3*s))]},(d3.geo.vanDerGrinten=function(){return Sa(na)}).raw=na,aa.invert=function(t,n){if(!t)return[0,wa*Math.sin(2*Math.atan(n/pa))];var a=Math.abs(t/pa),r=(1-a*a-(n/=pa)*n)/(2*a),e=r*r,o=Math.sqrt(e+1);return[i(t)*pa*(o-r),i(n)*wa*Math.sin(2*Math.atan2(Math.sqrt((1-2*r*a)*(r+o)-a),Math.sqrt(o+r+a)))]},(d3.geo.vanDerGrinten2=function(){return Sa(aa)}).raw=aa,ra.invert=function(t,n){if(!n)return[t,0];var a=n/pa,r=(pa*pa*(1-a*a)-t*t)/(2*pa*t);return[t?pa*(i(t)*Math.sqrt(r*r+1)-r):0,wa*Math.sin(2*Math.atan(a))]},(d3.geo.vanDerGrinten3=function(){return Sa(ra)}).raw=ra,ea.invert=function(t,n){if(!t||!n)return[t,n];n/=pa;var a=i(t)*t/wa,r=(a*a-1+4*n*n)/Math.abs(a),e=r*r,o=2*n,h=50;do{var u=o*o,M=(8*o-u*(u+2)-5)/(2*u*(o-1)),s=(3*o-u*o-10)/(2*u*o),c=M*M,f=o*M,v=o+M,l=v*v,g=o+3*M,d=l*(u+c*e-1)+(1-u)*(u*(g*g+4*c)+c*(12*f+4*c)),b=-2*v*(4*f*c+(1-4*u+3*u*u)*(1+s)+c*(-6+14*u-e+(-8+8*u-2*e)*s)+f*(-8+12*u+(-10+10*u-e)*s)),p=Math.sqrt(d),w=r*(l+c-1)+2*p-a*(4*l+e),q=r*(2*M*s+2*v*(1+s))+b/p-8*v*(r*(-1+c+l)+2*p)*(1+s)/(e+4*l);o-=δ=w/q}while(δ>da&&--h>0);return[i(t)*(Math.sqrt(r*r+4)+r)*pa/4,wa*o]},(d3.geo.vanDerGrinten4=function(){return Sa(ea)}).raw=ea;var $a=function(){var t=4*pa+3*Math.sqrt(3),n=2*Math.sqrt(2*pa*Math.sqrt(3)/t);return R(n*Math.sqrt(3)/pa,n,t/6)}();(d3.geo.wagner4=function(){return Sa($a)}).raw=$a,oa.invert=function(t,n){return[t/Math.sqrt(1-3*n*n/(pa*pa)),n]},(d3.geo.wagner6=function(){return Sa(oa)}).raw=oa,ia.invert=function(t,n){var a=t/2.66723,r=n/1.24104,e=Math.sqrt(a*a+r*r),o=2*h(e/2);return[3*Math.atan2(t*Math.tan(o),2.66723*e),e&&h(n*Math.sin(o)/(1.24104*.90631*e))]},(d3.geo.wagner7=function(){return Sa(ia)}).raw=ia,ha.invert=function(t,n){var a=-.5*(t*t+n*n),r=Math.sqrt(-a*(2+a)),e=n*a+t*r,o=t*a-n*r,i=Math.sqrt(o*o+e*e);return[Math.atan2(r*e,i*(1+a)),i?-h(r*o/i):0]},(d3.geo.wiechel=function(){return Sa(ha)}).raw=ha,ua.invert=function(t,n){var a=t,r=n,e=25;do{var o,i=Math.cos(r),h=Math.sin(r),M=Math.sin(2*r),s=h*h,c=i*i,f=Math.sin(a),v=Math.cos(a/2),l=Math.sin(a/2),g=l*l,d=1-c*v*v,b=d?u(i*v)*Math.sqrt(o=1/d):o=0,p=.5*(2*b*i*l+a/wa)-t,w=.5*(b*h+r)-n,q=.5*o*(c*g+b*i*v*s)+.5/wa,m=o*(f*M/4-b*h*l),y=.125*o*(M*l-b*h*c*f),S=.5*o*(s*v+b*g*i)+.5,Q=m*y-S*q,R=(w*m-p*S)/Q,T=(p*y-w*q)/Q;a-=R,r-=T}while((Math.abs(R)>da||Math.abs(T)>da)&&--e>0);return[a,r]},(d3.geo.winkel3=function(){return Sa(ua)}).raw=ua}();;!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.vg=t()}}(function(){var t;return function t(e,n,r){function i(o,s){if(!n[o]){if(!e[o]){var u="function"==typeof require&&require;if(!s&&u)return u(o,!0);if(a)return a(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[o]={exports:{}};e[o][0].call(c.exports,function(t){var n=e[o][1][t];return i(n?n:t)},c,c.exports,t,e,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(t,e,n){e.exports={version:"2.6.1",dataflow:t("vega-dataflow"),parse:t("./src/parse/"),scene:{Bounder:t("./src/scene/Bounder"),Builder:t("./src/scene/Builder"),Encoder:t("./src/scene/Encoder"),GroupBuilder:t("./src/scene/GroupBuilder"),visit:t("./src/scene/visit")},transforms:t("./src/transforms"),Transform:t("./src/transforms/Transform"),BatchTransform:t("./src/transforms/BatchTransform"),Parameter:t("./src/transforms/Parameter"),schema:t("./src/core/schema"),config:t("./src/core/config"),util:t("./src/util"),logging:t("vega-logging"),debug:t("vega-logging").debug}},{"./src/core/config":91,"./src/core/schema":92,"./src/parse/":97,"./src/scene/Bounder":109,"./src/scene/Builder":110,"./src/scene/Encoder":111,"./src/scene/GroupBuilder":112,"./src/scene/visit":117,"./src/transforms":145,"./src/transforms/BatchTransform":119,"./src/transforms/Parameter":135,"./src/transforms/Transform":140,"./src/util":148,"vega-dataflow":41,"vega-logging":48}],2:[function(t,e,n){},{}],3:[function(e,n,r){!function(e,i){"object"==typeof r&&"undefined"!=typeof n?i(r):"function"==typeof t&&t.amd?t(["exports"],i):i(e.d3_dsv={})}(this,function(t){"use strict";function e(t){return new a(t)}function n(t){return new Function("d","return {"+t.map(function(t,e){return JSON.stringify(t)+": d["+e+"]"}).join(",")+"}")}function r(t,e){var r=n(t);return function(n,i){return e(r(n),i,t)}}function i(t){var e=Object.create(null),n=[];return t.forEach(function(t){for(var r in t)r in e||n.push(e[r]=r)}),n}function a(t){function e(e){return e.map(a).join(t)}function a(t){return o.test(t)?'"'+t.replace(/\"/g,'""')+'"':t}var o=new RegExp('["'+t+"\n]"),s=t.charCodeAt(0);this.parse=function(t,e){var i,a,o=this.parseRows(t,function(t,o){return i?i(t,o-1):(a=t,void(i=e?r(t,e):n(t)))});return o.columns=a,o},this.parseRows=function(t,e){function n(){if(c>=l)return o;if(i)return i=!1,a;var e,n=c;if(34===t.charCodeAt(n)){for(var r=n;r++<l;)if(34===t.charCodeAt(r)){if(34!==t.charCodeAt(r+1))break;++r}return c=r+2,e=t.charCodeAt(r+1),13===e?(i=!0,10===t.charCodeAt(r+2)&&++c):10===e&&(i=!0),t.slice(n+1,r).replace(/""/g,'"')}for(;c<l;){var u=1;if(e=t.charCodeAt(c++),10===e)i=!0;else if(13===e)i=!0,10===t.charCodeAt(c)&&(++c,++u);else if(e!==s)continue;return t.slice(n,c-u)}return t.slice(n)}for(var r,i,a={},o={},u=[],l=t.length,c=0,d=0;(r=n())!==o;){for(var f=[];r!==a&&r!==o;)f.push(r),r=n();e&&null==(f=e(f,d++))||u.push(f)}return u},this.format=function(e,n){return null==n&&(n=i(e)),[n.map(a).join(t)].concat(e.map(function(e){return n.map(function(t){return a(e[t])}).join(t)})).join("\n")},this.formatRows=function(t){return t.map(e).join("\n")}}e.prototype=a.prototype;var o=e(","),s=e("\t"),u="0.1.14";t.version=u,t.dsv=e,t.csv=o,t.tsv=s})},{}],4:[function(e,n,r){!function(e,i){"object"==typeof r&&"undefined"!=typeof n?i(r):"function"==typeof t&&t.amd?t("d3-format",["exports"],i):i(e.d3_format={})}(this,function(t){"use strict";function e(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,r=t.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]}function n(t){return t=e(Math.abs(t)),t?t[1]:NaN}function r(t,e){return function(n,r){for(var i=n.length,a=[],o=0,s=t[0],u=0;i>0&&s>0&&(u+s+1>r&&(s=Math.max(1,r-u)),a.push(n.substring(i-=s,i+s)),!((u+=s+1)>r));)s=t[o=(o+1)%t.length];return a.reverse().join(e)}}function i(t,n){var r=e(t,n);if(!r)return t+"";var i=r[0],a=r[1],o=a-(p=3*Math.max(-8,Math.min(8,Math.floor(a/3))))+1,s=i.length;return o===s?i:o>s?i+new Array(o-s+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+e(t,Math.max(0,n+o-1))[0]}function a(t,n){var r=e(t,n);if(!r)return t+"";var i=r[0],a=r[1];return a<0?"0."+new Array((-a)).join("0")+i:i.length>a+1?i.slice(0,a+1)+"."+i.slice(a+1):i+new Array(a-i.length+2).join("0")}function o(t,e){t=t.toPrecision(e);t:for(var n,r=t.length,i=1,a=-1;i<r;++i)switch(t[i]){case".":a=n=i;break;case"0":0===a&&(a=i),n=i;break;case"e":break t;default:a>0&&(a=0)}return a>0?t.slice(0,a)+t.slice(n+1):t}function s(t){return new u(t)}function u(t){if(!(e=m.exec(t)))throw new Error("invalid format: "+t);var e,n=e[1]||" ",r=e[2]||">",i=e[3]||"-",a=e[4]||"",o=!!e[5],s=e[6]&&+e[6],u=!!e[7],l=e[8]&&+e[8].slice(1),c=e[9]||"";"n"===c?(u=!0,c="g"):g[c]||(c=""),(o||"0"===n&&"="===r)&&(o=!0,n="0",r="="),this.fill=n,this.align=r,this.sign=i,this.symbol=a,this.zero=o,this.width=s,this.comma=u,this.precision=l,this.type=c}function l(t){return t}function c(t){function e(t){t=s(t);var e=t.fill,n=t.align,r=t.sign,i=t.symbol,l=t.zero,c=t.width,d=t.comma,f=t.precision,h=t.type,m="$"===i?o[0]:"#"===i&&/[boxX]/.test(h)?"0"+h.toLowerCase():"",y="$"===i?o[1]:/[%p]/.test(h)?"%":"",_=g[h],b=!h||/[defgprs%]/.test(h);return f=null==f?h?6:12:/[gprs]/.test(h)?Math.max(1,Math.min(21,f)):Math.max(0,Math.min(20,f)),function(t){var i=m,o=y;if("c"===h)o=_(t)+o,t="";else{t=+t;var s=(t<0||1/t<0)&&(t*=-1,!0);if(t=_(t,f),s){var g,x=-1,w=t.length;for(s=!1;++x<w;)if(g=t.charCodeAt(x),48<g&&g<58||"x"===h&&96<g&&g<103||"X"===h&&64<g&&g<71){s=!0;break}}if(i=(s?"("===r?r:"-":"-"===r||"("===r?"":r)+i,o=o+("s"===h?v[8+p/3]:"")+(s&&"("===r?")":""),b)for(var g,x=-1,w=t.length;++x<w;)if(g=t.charCodeAt(x),48>g||g>57){o=(46===g?u+t.slice(x+1):t.slice(x))+o,t=t.slice(0,x);break}}d&&!l&&(t=a(t,1/0));var k=i.length+t.length+o.length,M=k<c?new Array(c-k+1).join(e):"";switch(d&&l&&(t=a(M+t,M.length?c-o.length:1/0),M=""),n){case"<":return i+t+o+M;case"=":return i+M+t+o;case"^":return M.slice(0,k=M.length>>1)+i+t+o+M.slice(k)}return M+i+t+o}}function i(t,r){var i=e((t=s(t),t.type="f",t)),a=3*Math.max(-8,Math.min(8,Math.floor(n(r)/3))),o=Math.pow(10,-a),u=v[8+a/3];return function(t){return i(o*t)+u}}var a=t.grouping&&t.thousands?r(t.grouping,t.thousands):l,o=t.currency,u=t.decimal;return{format:e,formatPrefix:i}}function d(t){return Math.max(0,-n(Math.abs(t)))}function f(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(n(e)/3)))-n(Math.abs(t)))}function h(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,n(e)-n(t))+1}var p,g={"":o,"%":function(t,e){return(100*t).toFixed(e)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,e){return t.toExponential(e)},f:function(t,e){return t.toFixed(e)},g:function(t,e){return t.toPrecision(e)},o:function(t){return Math.round(t).toString(8)},p:function(t,e){return a(100*t,e)},r:a,s:i,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},m=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;u.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var v=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"],y=c({decimal:".",thousands:",",grouping:[3],currency:["$",""]}),_=c({decimal:",",thousands:".",grouping:[3],currency:[""," €"]}),b=c({decimal:",",thousands:" ",grouping:[3],currency:[""," Kč"]}),x=c({decimal:",",thousands:"'",grouping:[3],currency:[""," CHF"]}),w=c({decimal:",",thousands:".",grouping:[3],currency:[""," €"]}),k=c({decimal:".",thousands:",",grouping:[3],currency:["$",""]}),M=c({decimal:".",thousands:",",grouping:[3],currency:["£",""]}),S=c({decimal:",",thousands:".",grouping:[3],currency:[""," €"]}),T=c({decimal:",",thousands:" ",grouping:[3],currency:[""," €"]}),E=c({decimal:",",thousands:" ",grouping:[3],currency:["","$"]}),A=c({decimal:",",thousands:".",grouping:[3],currency:[""," €"]}),L=c({decimal:".",thousands:",",grouping:[3],currency:["₪",""]}),C=c({decimal:",",thousands:" ",grouping:[3],currency:[""," Ft"]}),D=c({decimal:",",thousands:".",grouping:[3],currency:["€",""]}),P=c({decimal:".",thousands:",",grouping:[3],currency:["","円"]}),I=c({decimal:".",thousands:",",grouping:[3],currency:["₩",""]}),N=c({decimal:",",thousands:".",grouping:[3],currency:[""," ден."]}),O=c({decimal:",",thousands:".",grouping:[3],currency:["€ ",""]}),z=c({decimal:",",thousands:".",grouping:[3],currency:["","zł"]}),j=c({decimal:",",thousands:".",grouping:[3],currency:["R$",""]}),F=c({decimal:",",thousands:" ",grouping:[3],currency:[""," руб."]}),U=c({decimal:",",thousands:" ",grouping:[3],currency:["","SEK"]}),R=c({decimal:".",thousands:",",grouping:[3],currency:["¥",""]}),q=y.format,B=y.formatPrefix,G="0.4.2";t.version=G,t.format=q,t.formatPrefix=B,t.locale=c,t.localeCaEs=_,t.localeCsCz=b,t.localeDeCh=x,t.localeDeDe=w,t.localeEnCa=k,t.localeEnGb=M,t.localeEnUs=y,t.localeEsEs=S,t.localeFiFi=T,t.localeFrCa=E,t.localeFrFr=A,t.localeHeIl=L,t.localeHuHu=C,t.localeItIt=D,t.localeJaJp=P,t.localeKoKr=I,t.localeMkMk=N,t.localeNlNl=O,t.localePlPl=z,t.localePtBr=j,t.localeRuRu=F,t.localeSvSe=U,t.localeZhCn=R,t.formatSpecifier=s,t.precisionFixed=d,t.precisionPrefix=f,t.precisionRound=h})},{}],5:[function(e,n,r){!function(i,a){"object"==typeof r&&"undefined"!=typeof n?a(r,e("d3-time")):"function"==typeof t&&t.amd?t("d3-time-format",["exports","d3-time"],a):a(i.d3_time_format={},i.d3_time)}(this,function(t,e){"use strict";function n(t){if(0<=t.y&&t.y<100){var e=new Date((-1),t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function r(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function i(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function a(t){function e(t,e){return function(n){var r,i,a,o=[],s=-1,u=0,l=t.length;for(n instanceof Date||(n=new Date((+n)));++s<l;)37===t.charCodeAt(s)&&(o.push(t.slice(u,s)),null!=(i=tt[r=t.charAt(++s)])?r=t.charAt(++s):i="e"===r?" ":"0",(a=e[r])&&(r=a(n,i)),o.push(r),u=s+1);return o.push(t.slice(u,s)),o.join("")}}function a(t,e){return function(n){var a=i(1900),s=o(a,t,n+="",0);if(s!=n.length)return null;if("p"in a&&(a.H=a.H%12+12*a.p),"W"in a||"U"in a){"w"in a||(a.w="W"in a?1:0);var u="Z"in a?r(i(a.y)).getUTCDay():e(i(a.y)).getDay();a.m=0,a.d="W"in a?(a.w+6)%7+7*a.W-(u+5)%7:a.w+7*a.U-(u+6)%7}return"Z"in a?(a.H+=a.Z/100|0,a.M+=a.Z%100,r(a)):e(a)}}function o(t,e,n,r){for(var i,a,o=0,s=e.length,u=n.length;o<s;){if(r>=u)return-1;if(i=e.charCodeAt(o++),37===i){if(i=e.charAt(o++),a=jt[i in tt?e.charAt(o++):i],!a||(r=a(t,n,r))<0)return-1}else if(i!=n.charCodeAt(r++))return-1}return r}function s(t,e,n){var r=St.exec(e.slice(n));return r?(t.p=Tt[r[0].toLowerCase()],n+r[0].length):-1}function Q(t,e,n){var r=Lt.exec(e.slice(n));return r?(t.w=Ct[r[0].toLowerCase()],n+r[0].length):-1}function et(t,e,n){var r=Et.exec(e.slice(n));return r?(t.w=At[r[0].toLowerCase()],n+r[0].length):-1}function nt(t,e,n){var r=It.exec(e.slice(n));return r?(t.m=Nt[r[0].toLowerCase()],n+r[0].length):-1}function rt(t,e,n){var r=Dt.exec(e.slice(n));return r?(t.m=Pt[r[0].toLowerCase()],n+r[0].length):-1}function it(t,e,n){return o(t,vt,e,n)}function at(t,e,n){return o(t,yt,e,n)}function ot(t,e,n){return o(t,_t,e,n)}function st(t){return wt[t.getDay()]}function ut(t){return xt[t.getDay()]}function lt(t){return Mt[t.getMonth()]}function ct(t){return kt[t.getMonth()]}function dt(t){return bt[+(t.getHours()>=12)]}function ft(t){return wt[t.getUTCDay()]}function ht(t){return xt[t.getUTCDay()]}function pt(t){return Mt[t.getUTCMonth()]}function gt(t){return kt[t.getUTCMonth()]}function mt(t){return bt[+(t.getUTCHours()>=12)]}var vt=t.dateTime,yt=t.date,_t=t.time,bt=t.periods,xt=t.days,wt=t.shortDays,kt=t.months,Mt=t.shortMonths,St=u(bt),Tt=l(bt),Et=u(xt),At=l(xt),Lt=u(wt),Ct=l(wt),Dt=u(kt),Pt=l(kt),It=u(Mt),Nt=l(Mt),Ot={a:st,A:ut,b:lt,B:ct,c:null,d:M,e:M,H:S,I:T,j:E,L:A,m:L,M:C,p:dt,S:D,U:P,w:I,W:N,x:null,X:null,y:O,Y:z,Z:j,"%":Z},zt={a:ft,A:ht,b:pt,B:gt,c:null,d:F,e:F,H:U,I:R,j:q,L:B,m:G,M:$,p:mt,S:H,U:Y,w:V,W:W,x:null,X:null,y:X,Y:J,Z:K,"%":Z},jt={a:Q,A:et,b:nt,B:rt,c:it,d:v,e:v,H:_,I:_,j:y,L:w,m:m,M:b,p:s,S:x,U:d,w:c,W:f,x:at,X:ot,y:p,Y:h,Z:g,"%":k};return Ot.x=e(yt,Ot),Ot.X=e(_t,Ot),Ot.c=e(vt,Ot),zt.x=e(yt,zt),zt.X=e(_t,zt),zt.c=e(vt,zt),{format:function(t){var r=e(t+="",Ot);return r.parse=a(t,n),r.toString=function(){return t},r},utcFormat:function(t){var n=e(t+="",zt);return n.parse=a(t,r),n.toString=function(){return t},n}}}function o(t,e,n){var r=t<0?"-":"",i=(r?-t:t)+"",a=i.length;return r+(a<n?new Array(n-a+1).join(e)+i:i)}function s(t){return t.replace(rt,"\\$&")}function u(t){return new RegExp("^(?:"+t.map(s).join("|")+")","i")}function l(t){for(var e={},n=-1,r=t.length;++n<r;)e[t[n].toLowerCase()]=n;return e}function c(t,e,n){var r=et.exec(e.slice(n,n+1));return r?(t.w=+r[0],n+r[0].length):-1}function d(t,e,n){var r=et.exec(e.slice(n));return r?(t.U=+r[0],n+r[0].length):-1}function f(t,e,n){var r=et.exec(e.slice(n));return r?(t.W=+r[0],n+r[0].length):-1}function h(t,e,n){var r=et.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}function p(t,e,n){var r=et.exec(e.slice(n,n+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function g(t,e,n){var r=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(e.slice(n,n+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function m(t,e,n){var r=et.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function v(t,e,n){var r=et.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1}function y(t,e,n){var r=et.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}function _(t,e,n){var r=et.exec(e.slice(n,n+2));return r?(t.H=+r[0],n+r[0].length):-1}function b(t,e,n){var r=et.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}function x(t,e,n){var r=et.exec(e.slice(n,n+2));return r?(t.S=+r[0],n+r[0].length):-1}function w(t,e,n){var r=et.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}function k(t,e,n){var r=nt.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function M(t,e){return o(t.getDate(),e,2)}function S(t,e){return o(t.getHours(),e,2)}function T(t,e){return o(t.getHours()%12||12,e,2)}function E(t,n){return o(1+e.day.count(e.year(t),t),n,3)}function A(t,e){return o(t.getMilliseconds(),e,3)}function L(t,e){return o(t.getMonth()+1,e,2)}function C(t,e){return o(t.getMinutes(),e,2)}function D(t,e){return o(t.getSeconds(),e,2)}function P(t,n){return o(e.sunday.count(e.year(t),t),n,2)}function I(t){return t.getDay()}function N(t,n){return o(e.monday.count(e.year(t),t),n,2)}function O(t,e){return o(t.getFullYear()%100,e,2)}function z(t,e){return o(t.getFullYear()%1e4,e,4)}function j(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+o(e/60|0,"0",2)+o(e%60,"0",2)}function F(t,e){return o(t.getUTCDate(),e,2)}function U(t,e){return o(t.getUTCHours(),e,2)}function R(t,e){return o(t.getUTCHours()%12||12,e,2)}function q(t,n){return o(1+e.utcDay.count(e.utcYear(t),t),n,3)}function B(t,e){return o(t.getUTCMilliseconds(),e,3)}function G(t,e){return o(t.getUTCMonth()+1,e,2)}function $(t,e){return o(t.getUTCMinutes(),e,2)}function H(t,e){return o(t.getUTCSeconds(),e,2)}function Y(t,n){return o(e.utcSunday.count(e.utcYear(t),t),n,2)}function V(t){return t.getUTCDay()}function W(t,n){return o(e.utcMonday.count(e.utcYear(t),t),n,2)}function X(t,e){return o(t.getUTCFullYear()%100,e,2)}function J(t,e){return o(t.getUTCFullYear()%1e4,e,4)}function K(){return"+0000"}function Z(){return"%"}function Q(t){return t.toISOString()}var tt={"-":"",_:" ",0:"0"},et=/^\s*\d+/,nt=/^%/,rt=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,it=a({dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),at=a({dateTime:"%A, %e de %B de %Y, %X",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],shortDays:["dg.","dl.","dt.","dc.","dj.","dv.","ds."],months:["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],shortMonths:["gen.","febr.","març","abr.","maig","juny","jul.","ag.","set.","oct.","nov.","des."]}),ot=a({dateTime:"%A, der %e. %B %Y, %X",date:"%d.%m.%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],shortDays:["So","Mo","Di","Mi","Do","Fr","Sa"],months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],shortMonths:["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]}),st=a({dateTime:"%A, der %e. %B %Y, %X",date:"%d.%m.%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],shortDays:["So","Mo","Di","Mi","Do","Fr","Sa"],months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],shortMonths:["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]}),ut=a({dateTime:"%a %b %e %X %Y",date:"%Y-%m-%d",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),lt=a({dateTime:"%a %e %b %X %Y",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),ct=a({dateTime:"%A, %e de %B de %Y, %X",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],shortDays:["dom","lun","mar","mié","jue","vie","sáb"],months:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],shortMonths:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]}),dt=a({dateTime:"%A, %-d. %Bta %Y klo %X",date:"%-d.%-m.%Y",time:"%H:%M:%S",periods:["a.m.","p.m."],days:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],shortDays:["Su","Ma","Ti","Ke","To","Pe","La"],months:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],shortMonths:["Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"]}),ft=a({dateTime:"%a %e %b %Y %X",date:"%Y-%m-%d",time:"%H:%M:%S",periods:["",""],days:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],shortDays:["dim","lun","mar","mer","jeu","ven","sam"],months:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],shortMonths:["jan","fév","mar","avr","mai","jui","jul","aoû","sep","oct","nov","déc"]}),ht=a({dateTime:"%A, le %e %B %Y, %X",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],shortDays:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],months:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],shortMonths:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]}),pt=a({dateTime:"%A, %e ב%B %Y %X",date:"%d.%m.%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],shortDays:["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],shortMonths:["ינו׳","פבר׳","מרץ","אפר׳","מאי","יוני","יולי","אוג׳","ספט׳","אוק׳","נוב׳","דצמ׳"]}),gt=a({dateTime:"%Y. %B %-e., %A %X",date:"%Y. %m. %d.",time:"%H:%M:%S",periods:["de.","du."],days:["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],shortDays:["V","H","K","Sze","Cs","P","Szo"],months:["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],shortMonths:["jan.","feb.","már.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec."]}),mt=a({dateTime:"%A %e %B %Y, %X",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],shortDays:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],shortMonths:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"]}),vt=a({dateTime:"%Y %b %e %a %X",date:"%Y/%m/%d",time:"%H:%M:%S",periods:["AM","PM"],days:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],shortDays:["日","月","火","水","木","金","土"],months:["睦月","如月","弥生","卯月","皐月","水無月","文月","葉月","長月","神無月","霜月","師走"],shortMonths:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}),yt=a({dateTime:"%Y/%m/%d %a %X",date:"%Y/%m/%d",time:"%H:%M:%S",periods:["오전","오후"],days:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],shortDays:["일","월","화","수","목","금","토"],months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],shortMonths:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]}),_t=a({dateTime:"%A, %e %B %Y г. %X",date:"%d.%m.%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["недела","понеделник","вторник","среда","четврток","петок","сабота"],shortDays:["нед","пон","вто","сре","чет","пет","саб"],months:["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],shortMonths:["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек"]}),bt=a({dateTime:"%a %e %B %Y %T",date:"%d-%m-%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],shortDays:["zo","ma","di","wo","do","vr","za"],months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],shortMonths:["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"]}),xt=a({dateTime:"%A, %e %B %Y, %X",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],shortDays:["Niedz.","Pon.","Wt.","Śr.","Czw.","Pt.","Sob."],months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],shortMonths:["Stycz.","Luty","Marz.","Kwie.","Maj","Czerw.","Lipc.","Sierp.","Wrz.","Paźdz.","Listop.","Grudz."]}),wt=a({dateTime:"%A, %e de %B de %Y. %X",date:"%d/%m/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],shortDays:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],shortMonths:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]}),kt=a({dateTime:"%A, %e %B %Y г. %X",date:"%d.%m.%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],shortDays:["вс","пн","вт","ср","чт","пт","сб"],months:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],shortMonths:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]}),Mt=a({dateTime:"%A den %d %B %Y %X",date:"%Y-%m-%d",time:"%H:%M:%S",periods:["fm","em"],days:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],shortDays:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],shortMonths:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]}),St=a({dateTime:"%a %b %e %X %Y",date:"%Y/%-m/%-d",time:"%H:%M:%S",periods:["上午","下午"],days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],shortDays:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],shortMonths:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}),Tt="%Y-%m-%dT%H:%M:%S.%LZ";Q.parse=function(t){var e=new Date(t);return isNaN(e)?null:e},Q.toString=function(){return Tt};var Et=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Q:it.utcFormat(Tt),At=it.format,Lt=it.utcFormat,Ct="0.2.1";t.version=Ct,t.format=At,t.utcFormat=Lt,t.locale=a,t.localeCaEs=at,t.localeDeCh=ot,t.localeDeDe=st,t.localeEnCa=ut,t.localeEnGb=lt,t.localeEnUs=it,t.localeEsEs=ct,t.localeFiFi=dt,t.localeFrCa=ft,t.localeFrFr=ht,t.localeHeIl=pt,t.localeHuHu=gt,t.localeItIt=mt,t.localeJaJp=vt,t.localeKoKr=yt,t.localeMkMk=_t,t.localeNlNl=bt,t.localePlPl=xt,t.localePtBr=wt,t.localeRuRu=kt,t.localeSvSe=Mt,t.localeZhCn=St,t.isoFormat=Et})},{"d3-time":6}],6:[function(e,n,r){!function(e,i){"object"==typeof r&&"undefined"!=typeof n?i(r):"function"==typeof t&&t.amd?t("d3-time",["exports"],i):i(e.d3_time={})}(this,function(t){"use strict";function e(t,n,r,o){function s(e){return t(e=new Date((+e))),e}return s.floor=s,s.round=function(e){var r=new Date((+e)),i=new Date(e-1);return t(r),t(i),n(i,1),e-r<i-e?r:i},s.ceil=function(e){return t(e=new Date(e-1)),n(e,1),e},s.offset=function(t,e){return n(t=new Date((+t)),null==e?1:Math.floor(e)),t},s.range=function(e,r,i){var a=[];if(e=new Date(e-1),r=new Date((+r)),i=null==i?1:Math.floor(i),!(e<r&&i>0))return a;for(n(e,1),t(e),e<r&&a.push(new Date((+e)));n(e,i),t(e),e<r;)a.push(new Date((+e)));return a},s.filter=function(r){return e(function(e){for(;t(e),!r(e);)e.setTime(e-1)},function(t,e){for(;--e>=0;)for(;n(t,1),!r(t););})},r&&(s.count=function(e,n){return i.setTime(+e),a.setTime(+n),t(i),t(a),Math.floor(r(i,a))},s.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?s.filter(o?function(e){return o(e)%t===0}:function(e){return s.count(0,e)%t===0}):s:null}),s}function n(t){return e(function(e){e.setHours(0,0,0,0),e.setDate(e.getDate()-(e.getDay()+7-t)%7)},function(t,e){t.setDate(t.getDate()+7*e)},function(t,e){return(e-t-6e4*(e.getTimezoneOffset()-t.getTimezoneOffset()))/6048e5})}function r(t){return e(function(e){e.setUTCHours(0,0,0,0),e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7)},function(t,e){t.setUTCDate(t.getUTCDate()+7*e)},function(t,e){return(e-t)/6048e5})}var i=new Date,a=new Date,o=e(function(){},function(t,e){t.setTime(+t+e)},function(t,e){return e-t});o.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?e(function(e){e.setTime(Math.floor(e/t)*t)},function(e,n){e.setTime(+e+n*t)},function(e,n){return(n-e)/t}):o:null};var s=e(function(t){t.setMilliseconds(0)},function(t,e){t.setTime(+t+1e3*e)},function(t,e){return(e-t)/1e3},function(t){return t.getSeconds()}),u=e(function(t){t.setSeconds(0,0)},function(t,e){t.setTime(+t+6e4*e)},function(t,e){return(e-t)/6e4},function(t){return t.getMinutes()}),l=e(function(t){t.setMinutes(0,0,0)},function(t,e){t.setTime(+t+36e5*e)},function(t,e){return(e-t)/36e5},function(t){return t.getHours()}),c=e(function(t){t.setHours(0,0,0,0)},function(t,e){t.setDate(t.getDate()+e)},function(t,e){return(e-t-6e4*(e.getTimezoneOffset()-t.getTimezoneOffset()))/864e5},function(t){return t.getDate()-1}),d=n(0),f=n(1),h=n(2),p=n(3),g=n(4),m=n(5),v=n(6),y=e(function(t){t.setHours(0,0,0,0),t.setDate(1)},function(t,e){t.setMonth(t.getMonth()+e)},function(t,e){return e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),_=e(function(t){t.setHours(0,0,0,0),t.setMonth(0,1)},function(t,e){t.setFullYear(t.getFullYear()+e)},function(t,e){return e.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()}),b=e(function(t){t.setUTCMilliseconds(0)},function(t,e){t.setTime(+t+1e3*e)},function(t,e){return(e-t)/1e3},function(t){return t.getUTCSeconds()}),x=e(function(t){t.setUTCSeconds(0,0)},function(t,e){t.setTime(+t+6e4*e)},function(t,e){return(e-t)/6e4},function(t){return t.getUTCMinutes()}),w=e(function(t){t.setUTCMinutes(0,0,0)},function(t,e){t.setTime(+t+36e5*e)},function(t,e){return(e-t)/36e5},function(t){return t.getUTCHours()}),k=e(function(t){t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCDate(t.getUTCDate()+e)},function(t,e){return(e-t)/864e5},function(t){return t.getUTCDate()-1}),M=r(0),S=r(1),T=r(2),E=r(3),A=r(4),L=r(5),C=r(6),D=e(function(t){t.setUTCHours(0,0,0,0),t.setUTCDate(1)},function(t,e){t.setUTCMonth(t.getUTCMonth()+e)},function(t,e){return e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),P=e(function(t){t.setUTCHours(0,0,0,0),t.setUTCMonth(0,1)},function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e)},function(t,e){return e.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()}),I=o.range,N=s.range,O=u.range,z=l.range,j=c.range,F=d.range,U=f.range,R=h.range,q=p.range,B=g.range,G=m.range,$=v.range,H=d.range,Y=y.range,V=_.range,W=o,X=I,J=b.range,K=x.range,Z=w.range,Q=k.range,tt=M.range,et=S.range,nt=T.range,rt=E.range,it=A.range,at=L.range,ot=C.range,st=M.range,ut=D.range,lt=P.range,ct="0.1.1";t.version=ct,t.milliseconds=I,t.seconds=N,t.minutes=O,t.hours=z,t.days=j,t.sundays=F,t.mondays=U,t.tuesdays=R,t.wednesdays=q,t.thursdays=B,t.fridays=G,t.saturdays=$,t.weeks=H,t.months=Y,t.years=V,t.utcMillisecond=W,t.utcMilliseconds=X,t.utcSeconds=J,t.utcMinutes=K,t.utcHours=Z,t.utcDays=Q,t.utcSundays=tt,t.utcMondays=et,t.utcTuesdays=nt,t.utcWednesdays=rt,t.utcThursdays=it,t.utcFridays=at,t.utcSaturdays=ot,t.utcWeeks=st,t.utcMonths=ut,t.utcYears=lt,t.millisecond=o,t.second=s,t.minute=u,t.hour=l,t.day=c,t.sunday=d,t.monday=f,t.tuesday=h,t.wednesday=p,t.thursday=g,t.friday=m,t.saturday=v,t.week=d,t.month=y,t.year=_,t.utcSecond=b,t.utcMinute=x,t.utcHour=w,t.utcDay=k,t.utcSunday=M,t.utcMonday=S,t.utcTuesday=T,t.utcWednesday=E,t.utcThursday=A,t.utcFriday=L,t.utcSaturday=C,t.utcWeek=M,t.utcMonth=D,t.utcYear=P,t.interval=e})},{}],7:[function(t,e,n){var r=t("./util"),i=t("./time"),a=i.utc,o=e.exports;o.$year=r.$func("year",i.year.unit),o.$month=r.$func("month",i.months.unit),o.$date=r.$func("date",i.dates.unit),o.$day=r.$func("day",i.weekdays.unit),o.$hour=r.$func("hour",i.hours.unit),o.$minute=r.$func("minute",i.minutes.unit),o.$second=r.$func("second",i.seconds.unit),o.$utcYear=r.$func("utcYear",a.year.unit),o.$utcMonth=r.$func("utcMonth",a.months.unit),o.$utcDate=r.$func("utcDate",a.dates.unit),o.$utcDay=r.$func("utcDay",a.weekdays.unit),o.$utcHour=r.$func("utcHour",a.hours.unit),o.$utcMinute=r.$func("utcMinute",a.minutes.unit),o.$utcSecond=r.$func("utcSecond",a.seconds.unit)},{"./time":29,"./util":30}],8:[function(t,e,n){function r(){this._cells={},this._aggr=[],this._stream=!1}function i(t){if(a.isArray(t))return t;if(null==t)return[];var e,n,r=[];for(e in t)n=a.array(t[e]),r.push({name:e,ops:n});return r}var a=t("../util"),o=t("./measures"),s=t("./collector"),u=r.Flags={
ADD_CELL:1,MOD_CELL:2},l=r.prototype;l.stream=function(t){return null==t?this._stream:(this._stream=!!t,this._aggr=[],this)},l.key=function(t){return null==t?this._key:(this._key=a.$(t),this)},l.groupby=function(t){return this._dims=a.array(t).map(function(t,e){if(t=a.isString(t)?{name:t,get:a.$(t)}:a.isFunction(t)?{name:a.name(t)||t.name||"_"+e,get:t}:t.name&&a.isFunction(t.get)?t:null,null==t)throw"Invalid groupby argument: "+t;return t}),this.clear()},l.summarize=function(t){t=i(t),this._count=!0;var e,n,r,s,u,l,c,d=this._aggr=[];for(r=0;r<t.length;++r){for(s=0,e=[],n=t[r];s<n.ops.length;++s)u=n.ops[s],"count"!==u&&(this._count=!1),l=n.as&&n.as[s]||u+("*"===n.name?"":"_"+n.name),e.push(o[u](l));c=n.get&&a.$(n.get)||("*"===n.name?a.identity:a.$(n.name)),d.push({name:n.name,measures:o.create(e,this._stream,c,this._assign)})}return this.clear()},l.count=function(){return this.summarize({"*":"count"})},l._assign=function(t,e,n){t[e]=n},l.clear=function(){return this._cells={},this},l._cellkey=function(t){var e,n=this._dims,r=n.length,i=String(n[0].get(t));for(e=1;e<r;++e)i+="|"+n[e].get(t);return i},l._cell=function(t){var e=this._dims.length?this._cellkey(t):"";return this._cells[e]||(this._cells[e]=this._newcell(t,e))},l._newcell=function(t,e){var n,r={num:0,tuple:this._newtuple(t,e),flag:u.ADD_CELL,aggs:{}},i=this._aggr;for(n=0;n<i.length;++n)r.aggs[i[n].name]=new i[n].measures(r,r.tuple);return r.collect&&(r.data=new s(this._key)),r},l._newtuple=function(t){var e,n,r=this._dims,i={};for(e=0,n=r.length;e<n;++e)i[r[e].name]=r[e].get(t);return this._ingest(i)},l._ingest=a.identity,l._add=function(t){var e,n=this._cell(t),r=this._aggr;if(n.num+=1,!this._count)for(n.collect&&n.data.add(t),e=0;e<r.length;++e)n.aggs[r[e].name].add(t);n.flag|=u.MOD_CELL,this._on_add&&this._on_add(t,n)},l._rem=function(t){var e,n=this._cell(t),r=this._aggr;if(n.num-=1,!this._count)for(n.collect&&n.data.rem(t),e=0;e<r.length;++e)n.aggs[r[e].name].rem(t);n.flag|=u.MOD_CELL,this._on_rem&&this._on_rem(t,n)},l._mod=function(t,e){var n,r=this._cell(e),i=this._cell(t),o=this._aggr;for(r!==i?(r.num-=1,i.num+=1,r.collect&&r.data.rem(e),i.collect&&i.data.add(t)):r.collect&&!a.isObject(t)&&(r.data.rem(e),r.data.add(t)),n=0;n<o.length;++n)r.aggs[o[n].name].rem(e),i.aggs[o[n].name].add(t);r.flag|=u.MOD_CELL,i.flag|=u.MOD_CELL,this._on_mod&&this._on_mod(t,e,r,i)},l._markMod=function(t){var e=this._cell(t);e.flag|=u.MOD_CELL},l.result=function(){var t,e,n,r=[],i=this._aggr;for(n in this._cells){if(t=this._cells[n],t.num>0){for(t.collect&&t.data.values(),e=0;e<i.length;++e)t.aggs[i[e].name].set();r.push(t.tuple)}else delete this._cells[n];t.flag=0}return this._rems=!1,r},l.changes=function(t){var e,n,r,i,a=t||{add:[],rem:[],mod:[]},o=this._aggr;for(i in this._cells){for(e=this._cells[i],n=e.flag,e.collect&&e.data.values(),r=0;r<o.length;++r)e.aggs[o[r].name].set();e.num<=0?(a.rem.push(e.tuple),delete this._cells[i],this._on_drop&&this._on_drop(e)):(this._on_keep&&this._on_keep(e),n&u.ADD_CELL?a.add.push(e.tuple):n&u.MOD_CELL&&a.mod.push(e.tuple)),e.flag=0}return this._rems=!1,a},l.execute=function(t){return this.clear().insert(t).result()},l.insert=function(t){this._consolidate();for(var e=0;e<t.length;++e)this._add(t[e]);return this},l.remove=function(t){if(!this._stream)throw"Aggregator not configured for streaming removes. Call stream(true) prior to calling summarize.";for(var e=0;e<t.length;++e)this._rem(t[e]);return this._rems=!0,this},l._consolidate=function(){if(this._rems){for(var t in this._cells)this._cells[t].collect&&this._cells[t].data.values();this._rems=!1}},e.exports=r},{"../util":30,"./collector":9,"./measures":11}],9:[function(t,e,n){function r(t){this._add=[],this._rem=[],this._key=t||null,this._last=null}var i=t("../util"),a=t("../stats"),o="__dl_rem__",s=r.prototype;s.add=function(t){this._add.push(t)},s.rem=function(t){this._rem.push(t)},s.values=function(){if(this._get=null,0===this._rem.length)return this._add;var t,e,n,r,s=this._add,u=this._rem,l=this._key,c=Array(s.length-u.length);if(i.isObject(u[0]))if(l)for(r=i.toMap(u,l),t=0,e=0,n=s.length;t<n;++t)r.hasOwnProperty(l(s[t]))||(c[e++]=s[t]);else{for(t=0,n=u.length;t<n;++t)u[t][o]=1;for(t=0,e=0,n=s.length;t<n;++t)s[t][o]||(c[e++]=s[t]);for(t=0,n=u.length;t<n;++t)delete u[t][o]}else for(r=a.count.map(u),t=0,e=0,n=s.length;t<n;++t)r[s[t]]>0?r[s[t]]-=1:c[e++]=s[t];return this._rem=[],this._add=c},s.extent=function(t){if(this._get!==t||!this._ext){var e=this.values(),n=a.extent.index(e,t);this._ext=[e[n[0]],e[n[1]]],this._get=t}return this._ext},s.argmin=function(t){return this.extent(t)[0]},s.argmax=function(t){return this.extent(t)[1]},s.min=function(t){var e=this.extent(t)[0];return null!=e?t(e):+(1/0)},s.max=function(t){var e=this.extent(t)[1];return null!=e?t(e):-(1/0)},s.quartile=function(t){return this._get===t&&this._q||(this._q=a.quartile(this.values(),t),this._get=t),this._q},s.q1=function(t){return this.quartile(t)[0]},s.q2=function(t){return this.quartile(t)[1]},s.q3=function(t){return this.quartile(t)[2]},e.exports=r},{"../stats":27,"../util":30}],10:[function(t,e,n){var r=t("../util"),i=t("./aggregator");e.exports=function(){var t=[].reduce.call(arguments,function(t,e){return t.concat(r.array(e))},[]);return(new i).groupby(t).summarize({"*":"values"})}},{"../util":30,"./aggregator":8}],11:[function(t,e,n){function r(t){return function(e){var n=o.extend({init:"",add:"",rem:"",idx:0},t);return n.out=e||t.name,n}}function i(t,e){function n(t,r){function i(e){t[e]||n(t,t[e]=s[e]())}return r.req&&r.req.forEach(i),e&&r.str&&r.str.forEach(i),t}var r=t.reduce(n,t.reduce(function(t,e){return t[e.name]=e,t},{}));return o.vals(r).sort(function(t,e){return t.idx-e.idx})}function a(e,n,r,a){var s=i(e,n),u="this.cell = cell; this.tuple = t; this.valid = 0; this.missing = 0;",l="if (v==null) this.missing++; if (!this.isValid(v)) return; ++this.valid;",c="if (v==null) this.missing--; if (!this.isValid(v)) return; --this.valid;",d="var t = this.tuple; var cell = this.cell;";return s.forEach(function(t){t.idx<0?(u=t.init+u,l=t.add+l,c=t.rem+c):(u+=t.init,l+=t.add,c+=t.rem)}),e.slice().sort(function(t,e){return t.idx-e.idx}).forEach(function(t){d+="this.assign(t,'"+t.out+"',"+t.set+");"}),d+="return t;",u=Function("cell","t",u),u.prototype.assign=a,u.prototype.add=Function("t","var v = this.get(t);"+l),u.prototype.rem=Function("t","var v = this.get(t);"+c),u.prototype.set=Function(d),u.prototype.get=r,u.prototype.distinct=t("../stats").count.distinct,u.prototype.isValid=o.isValid,u.fields=e.map(o.$("out")),u}var o=t("../util"),s={values:r({name:"values",init:"cell.collect = true;",set:"cell.data.values()",idx:-1}),count:r({name:"count",set:"cell.num"}),missing:r({name:"missing",set:"this.missing"}),valid:r({name:"valid",set:"this.valid"}),sum:r({name:"sum",init:"this.sum = 0;",add:"this.sum += v;",rem:"this.sum -= v;",set:"this.sum"}),mean:r({name:"mean",init:"this.mean = 0;",add:"var d = v - this.mean; this.mean += d / this.valid;",rem:"var d = v - this.mean; this.mean -= this.valid ? d / this.valid : this.mean;",set:"this.mean"}),average:r({name:"average",set:"this.mean",req:["mean"],idx:1}),variance:r({name:"variance",init:"this.dev = 0;",add:"this.dev += d * (v - this.mean);",rem:"this.dev -= d * (v - this.mean);",set:"this.valid > 1 ? this.dev / (this.valid-1) : 0",req:["mean"],idx:1}),variancep:r({name:"variancep",set:"this.valid > 1 ? this.dev / this.valid : 0",req:["variance"],idx:2}),stdev:r({name:"stdev",set:"this.valid > 1 ? Math.sqrt(this.dev / (this.valid-1)) : 0",req:["variance"],idx:2}),stdevp:r({name:"stdevp",set:"this.valid > 1 ? Math.sqrt(this.dev / this.valid) : 0",req:["variance"],idx:2}),stderr:r({name:"stderr",set:"this.valid > 1 ? Math.sqrt(this.dev / (this.valid * (this.valid-1))) : 0",req:["variance"],idx:2}),median:r({name:"median",set:"cell.data.q2(this.get)",req:["values"],idx:3}),q1:r({name:"q1",set:"cell.data.q1(this.get)",req:["values"],idx:3}),q3:r({name:"q3",set:"cell.data.q3(this.get)",req:["values"],idx:3}),distinct:r({name:"distinct",set:"this.distinct(cell.data.values(), this.get)",req:["values"],idx:3}),argmin:r({name:"argmin",add:"if (v < this.min) this.argmin = t;",rem:"if (v <= this.min) this.argmin = null;",set:"this.argmin = this.argmin || cell.data.argmin(this.get)",req:["min"],str:["values"],idx:3}),argmax:r({name:"argmax",add:"if (v > this.max) this.argmax = t;",rem:"if (v >= this.max) this.argmax = null;",set:"this.argmax = this.argmax || cell.data.argmax(this.get)",req:["max"],str:["values"],idx:3}),min:r({name:"min",init:"this.min = +Infinity;",add:"if (v < this.min) this.min = v;",rem:"if (v <= this.min) this.min = NaN;",set:"this.min = (isNaN(this.min) ? cell.data.min(this.get) : this.min)",str:["values"],idx:4}),max:r({name:"max",init:"this.max = -Infinity;",add:"if (v > this.max) this.max = v;",rem:"if (v >= this.max) this.max = NaN;",set:"this.max = (isNaN(this.max) ? cell.data.max(this.get) : this.max)",str:["values"],idx:4}),modeskew:r({name:"modeskew",set:"this.dev===0 ? 0 : (this.mean - cell.data.q2(this.get)) / Math.sqrt(this.dev/(this.valid-1))",req:["mean","variance","median"],idx:5})};s.create=a,e.exports=s},{"../stats":27,"../util":30}],12:[function(t,e,n){function r(t){if(!t)throw Error("Missing binning options.");var e,n,r,s,u,l,c,d=t.maxbins||15,f=t.base||10,h=Math.log(f),p=t.div||[5,2],g=t.min,m=t.max,v=m-g;if(t.step)e=t.step;else if(t.steps)e=t.steps[Math.min(t.steps.length-1,i(t.steps,v/d,0,t.steps.length))];else{for(n=Math.ceil(Math.log(d)/h),r=t.minstep||0,e=Math.max(r,Math.pow(f,Math.round(Math.log(v)/h)-n));Math.ceil(v/e)>d;)e*=f;for(l=0;l<p.length;++l)u=e/p[l],u>=r&&v/u<=d&&(e=u)}return u=Math.log(e),s=u>=0?0:~~(-u/h)+1,c=Math.pow(f,-s-1),g=Math.min(g,Math.floor(g/e+c)*e),m=Math.ceil(m/e)*e,{start:g,stop:m,step:e,unit:{precision:s},value:a,index:o}}function i(t,e,n,r){for(;n<r;){var i=n+r>>>1;l.cmp(t[i],e)<0?n=i+1:r=i}return n}function a(t){return this.step*Math.floor(t/this.step+d)}function o(t){return Math.floor((t-this.start)/this.step+d)}function s(t){return this.unit.date(a.call(this,t))}function u(t){return o.call(this,this.unit.unit(t))}var l=t("../util"),c=t("../time"),d=1e-15;r.date=function(t){if(!t)throw Error("Missing date binning options.");var e=t.utc?c.utc:c,n=t.min,i=t.max,a=t.maxbins||20,o=t.minbins||4,l=+i-+n,d=t.unit?e[t.unit]:e.find(l,o,a),f=r({min:null!=d.min?d.min:d.unit(n),max:null!=d.max?d.max:d.unit(i),maxbins:a,minstep:d.minstep,steps:d.step});return f.unit=d,f.index=u,t.raw||(f.value=s),f},e.exports=r},{"../time":29,"../util":30}],13:[function(t,e,n){function r(t,e,n){n=o(t,e,n);var r=a(n);return r?f.$func("bin",r.unit.unit?function(t){return r.value(r.unit.unit(t))}:function(t){return r.value(t)})(n.accessor):n.accessor||f.identity}function i(t,e,n){n=o(t,e,n);var r=a(n);return r?s(t,n.accessor,r):u(t,n.accessor,n&&n.sort)}function a(t){var e=t.type,n=null;return(null==e||p[e])&&("integer"===e&&null==t.minstep&&(t.minstep=1),n="date"===e?l.date(t):l(t)),n}function o(){var t=arguments,e=0,n=f.isArray(t[e])?t[e++]:null,r=f.isFunction(t[e])||f.isString(t[e])?f.$(t[e++]):null,i=f.extend({},t[e]);if(n&&(i.type=i.type||d(n,r),p[i.type])){var a=h.extent(n,r);i=f.extend({min:a[0],max:a[1]},i)}return r&&(i.accessor=r),i}function s(t,e,n){for(var r,i,a=c.range(n.start,n.stop+n.step/2,n.step).map(function(t){return{value:n.value(t),count:0}}),o=0;o<t.length;++o)if(r=e?e(t[o]):t[o],f.isValid(r)){if(i=n.index(r),i<0||i>=a.length||!isFinite(i))continue;a[i].count+=1}return a.bins=n,a}function u(t,e,n){var r=h.unique(t,e),i=h.count.map(t,e);return r.map(function(t){return{value:t,count:i[t]}}).sort(f.comparator(n?"-count":"+value"))}var l=t("./bins"),c=t("../generate"),d=t("../import/type"),f=t("../util"),h=t("../stats"),p={integer:1,number:1,date:1};e.exports={$bin:r,histogram:i}},{"../generate":16,"../import/type":25,"../stats":27,"../util":30,"./bins":12}],14:[function(t,e,n){function r(t,e){e=s.extend({separator:" ",minwidth:8,maxwidth:15},e);var n=e.fields||s.keys(t[0]),r=u.all(t);if(e.start||e.limit){var i=e.start||0,a=e.limit?i+e.limit:t.length;t=t.slice(i,a)}var o=n.map(function(n){var i=d[r[n]]||"",a=c("{{"+n+i+"}}"),o=l.max(t,function(t){return a(t).length});return o=Math.max(Math.min(n.length,e.minwidth),o),e.maxwidth>0?Math.min(o,e.maxwidth):o}),h=n.map(function(t,e){return s.truncate(s.pad(t,o[e],"center"),o[e])}).join(e.separator),p=c(n.map(function(t,e){return"{{"+t+(d[r[t]]||"")+("|pad:"+o[e]+","+(f[r[t]]||"right"))+("|truncate:"+o[e])+"}}"}).join(e.separator));return h+"\n"+t.map(p).join("\n")}function i(t){t=t?t.__summary__?t:l.summary(t):this;var e,n,r=[];for(e=0,n=t.length;e<n;++e)r.push("-- "+t[e].field+" --"),"string"===t[e].type||t[e].distinct<10?r.push(o(t[e])):r.push(a(t[e])),r.push("");return r.join("\n")}function a(t){return["valid:    "+t.valid,"missing:  "+t.missing,"distinct: "+t.distinct,"min:      "+t.min,"max:      "+t.max,"median:   "+t.median,"mean:     "+t.mean,"stdev:    "+t.stdev,"modeskew: "+t.modeskew].join("\n")}function o(t){var e=["valid:    "+t.valid,"missing:  "+t.missing,"distinct: "+t.distinct,"top values: "],n=t.unique,r=s.keys(n).sort(function(t,e){return n[e]-n[t]}).slice(0,6).map(function(t){return" '"+t+"' ("+n[t]+")"});return e.concat(r).join("\n")}var s=t("./util"),u=t("./import/type"),l=t("./stats"),c=t("./template");e.exports={table:r,summary:i};var d={date:'|time:"%m/%d/%Y %H:%M:%S"',number:'|number:".4f"',integer:'|number:"d"'},f={number:"left",integer:"left"}},{"./import/type":25,"./stats":27,"./template":28,"./util":30}],15:[function(t,e,n){function r(t){return t.length>4&&"locale"+(t[0].toUpperCase()+t[1].toLowerCase()+t[3].toUpperCase()+t[4].toLowerCase())}function i(t){var e=x.isString(t)?M[r(t)]:M.locale(t);if(null==e)throw Error("Unrecognized locale: "+t);S=e}function a(t){var e=x.isString(t)?k[r(t)]:k.locale(t);if(null==e)throw Error("Unrecognized locale: "+t);T=e,v=y=_=b=null}function o(t,e){t.length||(t=[0]),null==e&&(e=10);var n=t[0],r=t[t.length-1];r<n&&(o=r,r=n,n=o);var i=r-n||(e=1,n||r||1),a=Math.pow(10,Math.floor(Math.log(i/e)/Math.LN10)),o=i/e/a;return o>=A?a*=10:o>=L?a*=5:o>=C&&(a*=2),[Math.ceil(n/a)*a,Math.floor(r/a)*a+a/2,a]}function s(t,e){return function(n){var r=t(n),i=r.indexOf(e);if(i<0)return r;for(var a=u(r,i),o=a<r.length?r.slice(a):"";--a>i;)if("0"!==r[a]){++a;break}return r.slice(0,a)+o}}function u(t,e){var n,r=t.lastIndexOf("e");if(r>0)return r;for(r=t.length;--r>e;)if(n=t.charCodeAt(r),n>=48&&n<=57)return r+1}function l(t){var e=S.format(".1f")(1)[1];switch(null==t&&(t=","),t=M.formatSpecifier(t),null==t.precision&&(t.precision=12),t.type){case"%":t.precision-=2;break;case"e":t.precision-=1}return s(S.format(t),e)}function c(t,e,n){var r=o(t,e);switch(null==n&&(n=",f"),n=M.formatSpecifier(n),n.type){case"s":var i=Math.max(Math.abs(r[0]),Math.abs(r[1]));return null==n.precision&&(n.precision=M.precisionPrefix(r[2],i)),S.formatPrefix(n,i);case"":case"e":case"g":case"p":case"r":null==n.precision&&(n.precision=M.precisionRound(r[2],Math.max(Math.abs(r[0]),Math.abs(r[1])))-("e"===n.type));break;case"f":case"%":null==n.precision&&(n.precision=M.precisionFixed(r[2])-2*("%"===n.type))}return S.format(n)}function d(){var t=T.format,e=t(".%L"),n=t(":%S"),r=t("%I:%M"),i=t("%I %p"),a=t("%a %d"),o=t("%b %d"),s=t("%B"),u=t("%Y");return function(t){var l=+t;return(w.second(t)<l?e:w.minute(t)<l?n:w.hour(t)<l?r:w.day(t)<l?i:w.month(t)<l?w.week(t)<l?a:o:w.year(t)<l?s:u)(t)}}function f(){var t=T.utcFormat,e=t(".%L"),n=t(":%S"),r=t("%I:%M"),i=t("%I %p"),a=t("%a %d"),o=t("%b %d"),s=t("%B"),u=t("%Y");return function(t){var l=+t;return(w.utcSecond(t)<l?e:w.utcMinute(t)<l?n:w.utcHour(t)<l?r:w.utcDay(t)<l?i:w.utcMonth(t)<l?w.utcWeek(t)<l?a:o:w.utcYear(t)<l?s:u)(t)}}function h(t,e){var n=e?y||(y=T.format("%b")):v||(v=T.format("%B"));return E.setMonth(t),n(E)}function p(t,e){var n=e?b||(b=T.format("%a")):_||(_=T.format("%A"));return E.setMonth(0),E.setDate(2+t),n(E)}function g(t){return Math.floor(t.getMonth()/3)+1}function m(t){return Math.floor(t.getUTCMonth()/3)+1}var v,y,_,b,x=t("./util"),w=t("d3-time"),k=t("d3-time-format"),M=t("d3-format"),S=M,T=k,E=new Date(2e3,0,1);e.exports={numberLocale:i,number:function(t){return S.format(t)},numberPrefix:function(t,e){return S.formatPrefix(t,e)},timeLocale:a,time:function(t){return T.format(t)},utc:function(t){return T.utcFormat(t)},locale:function(t){i(t),a(t)},auto:{number:l,linear:c,time:function(){return d()},utc:function(){return f()}},month:h,day:p,quarter:g,utcQuarter:m};var A=Math.sqrt(50),L=Math.sqrt(10),C=Math.sqrt(2)},{"./util":30,"d3-format":4,"d3-time":6,"d3-time-format":5}],16:[function(t,e,n){var r=t("./util"),i=e.exports;i.repeat=function(t,e){var n,r=Array(e);for(n=0;n<e;++n)r[n]=t;return r},i.zeros=function(t){return i.repeat(0,t)},i.range=function(t,e,n){if(arguments.length<3&&(n=1,arguments.length<2&&(e=t,t=0)),(e-t)/n==1/0)throw new Error("Infinite range");var r,i=[],a=-1;if(n<0)for(;(r=t+n*++a)>e;)i.push(r);else for(;(r=t+n*++a)<e;)i.push(r);return i},i.random={},i.random.uniform=function(t,e){void 0===e&&(e=void 0===t?1:t,t=0);var n=e-t,r=function(){return t+n*Math.random()};return r.samples=function(t){return i.zeros(t).map(r)},r.pdf=function(r){return r>=t&&r<=e?1/n:0},r.cdf=function(r){return r<t?0:r>e?1:(r-t)/n},r.icdf=function(e){return e>=0&&e<=1?t+e*n:NaN},r},i.random.integer=function(t,e){void 0===e&&(e=t,t=0);var n=e-t,r=function(){return t+Math.floor(n*Math.random())};return r.samples=function(t){return i.zeros(t).map(r)},r.pdf=function(r){return r===Math.floor(r)&&r>=t&&r<e?1/n:0},r.cdf=function(r){var i=Math.floor(r);return i<t?0:i>=e?1:(i-t+1)/n},r.icdf=function(e){return e>=0&&e<=1?t-1+Math.floor(e*n):NaN},r},i.random.normal=function(t,e){t=t||0,e=e||1;var n,r=function(){var r,i,a=0,o=0;if(void 0!==n)return a=n,n=void 0,a;do a=2*Math.random()-1,o=2*Math.random()-1,r=a*a+o*o;while(0===r||r>1);return i=Math.sqrt(-2*Math.log(r)/r),n=t+o*i*e,t+a*i*e};return r.samples=function(t){return i.zeros(t).map(r)},r.pdf=function(n){var r=Math.exp(Math.pow(n-t,2)/(-2*Math.pow(e,2)));return 1/(e*Math.sqrt(2*Math.PI))*r},r.cdf=function(n){var r,i=(n-t)/e,a=Math.abs(i);if(a>37)r=0;else{var o,s=Math.exp(-a*a/2);a<7.07106781186547?(o=.0352624965998911*a+.700383064443688,o=o*a+6.37396220353165,o=o*a+33.912866078383,o=o*a+112.079291497871,o=o*a+221.213596169931,o=o*a+220.206867912376,r=s*o,o=.0883883476483184*a+1.75566716318264,o=o*a+16.064177579207,o=o*a+86.7807322029461,o=o*a+296.564248779674,o=o*a+637.333633378831,o=o*a+793.826512519948,o=o*a+440.413735824752,r/=o):(o=a+.65,o=a+4/o,o=a+3/o,o=a+2/o,o=a+1/o,r=s/o/2.506628274631)}return i>0?1-r:r},r.icdf=function(n){if(n<=0||n>=1)return NaN;var r=2*n-1,i=8*(Math.PI-3)/(3*Math.PI*(4-Math.PI)),a=2/(Math.PI*i)+Math.log(1-Math.pow(r,2))/2,o=Math.log(1-r*r)/i,s=(r>0?1:-1)*Math.sqrt(Math.sqrt(a*a-o)-a);return t+e*Math.SQRT2*s},r},i.random.bootstrap=function(t,e){var n=t.filter(r.isValid),a=n.length,o=e?i.random.normal(0,e):null,s=function(){return n[~~(Math.random()*a)]+(o?o():0)};return s.samples=function(t){return i.zeros(t).map(s)},s}},{"./util":30}],17:[function(t,e,n){function r(t,e){if(t){var n=e.header;t=(n?n.join(e.delimiter)+"\n":"")+t}return a.dsv(e.delimiter).parse(t)}var i=t("../../util"),a=t("d3-dsv");r.delimiter=function(t){var e={delimiter:t};return function(t,n){return r(t,n?i.extend(n,e):e)}},e.exports=r},{"../../util":30,"d3-dsv":3}],18:[function(t,e,n){var r=t("./dsv");e.exports={json:t("./json"),topojson:t("./topojson"),treejson:t("./treejson"),dsv:r,csv:r.delimiter(","),tsv:r.delimiter("\t")}},{"./dsv":17,"./json":19,"./topojson":20,"./treejson":21}],19:[function(t,e,n){var r=t("../../util");e.exports=function(t,e){var n=r.isObject(t)&&!r.isBuffer(t)?t:JSON.parse(t);return e&&e.property&&(n=r.accessor(e.property)(n)),n}},{"../../util":30}],20:[function(t,e,n){var r=t("./json"),i=function(t,e){var n=i.topojson;if(null==n)throw Error("TopoJSON library not loaded.");var a,o=r(t,e);if(e&&e.feature){if(a=o.objects[e.feature])return n.feature(o,a).features;throw Error("Invalid TopoJSON object: "+e.feature)}if(e&&e.mesh){if(a=o.objects[e.mesh])return[n.mesh(o,o.objects[e.mesh])];throw Error("Invalid TopoJSON object: "+e.mesh)}throw Error("Missing TopoJSON feature or mesh parameter.")};i.topojson=t("topojson"),e.exports=i},{"./json":19,topojson:31}],21:[function(t,e,n){function r(t,e){function n(t,e){t[i]=e,a.push(t);var o=t[r];if(o)for(var s=0;s<o.length;++s)n(o[s],t)}var r=e&&e.children||"children",i=e&&e.parent||"parent",a=[];return n(t,null),a.root=t,a}var i=t("./json");e.exports=function(t,e){return r(i(t,e),e)}},{"./json":19}],22:[function(t,e,n){function r(e){var n=e.url;if(!n&&e.file)return h+e.file;if(e.baseURL&&!f.test(n)&&(c(n,"/")||"/"===e.baseURL[e.baseURL.length-1]||(n="/"+n),n=e.baseURL+n),!i.useXHR&&c(n,"//")&&(n=(e.defaultProtocol||"http")+":"+n),e.domainWhiteList){var r,a;if(i.useXHR){var o=document.createElement("a");o.href=n,""===o.host&&(o.href=o.href),r=o.hostname.toLowerCase(),a=window.location.hostname}else{var s=t("url").parse(n);r=s.hostname,a=null}if(a!==r){var u=e.domainWhiteList.some(function(t){var e=r.length-t.length;return t===r||e>1&&"."===r[e-1]&&r.lastIndexOf(t)===e});if(!u)throw"URL is not whitelisted: "+n}}return n}function i(t,e){return i.loader(t,e)}function a(t,e){var n,r=e||function(t){throw t};try{n=i.sanitizeUrl(t)}catch(t){return void r(t)}return n?i.useXHR?i.xhr(n,t,e):c(n,h)?i.file(n.slice(h.length),t,e):n.indexOf("://")<0?i.file(n,t,e):i.http(n,t,e):void r("Invalid URL: "+t.url)}function o(t){var e=t.responseType;return e&&"text"!==e?t.response:t.responseText}function s(t,e,n){function r(){var t=s.status;!t&&o(s)||t>=200&&t<300||304===t?n(null,s.responseText):n(s,null)}var a=!!n,s=new XMLHttpRequest;if("undefined"==typeof XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(t)||(s=new XDomainRequest),a&&("onload"in s?s.onload=s.onerror=r:s.onreadystatechange=function(){s.readyState>3&&r()}),s.open("GET",t,a),s.setRequestHeader){var u=d.extend({},i.headers,e.headers);for(var l in u)s.setRequestHeader(l,u[l])}if(s.send(),!a&&o(s))return s.responseText}function u(e,n,r){var i=t("fs");return r?void i.readFile(e,r):i.readFileSync(e,"utf8")}function l(e,n,r){var a=d.extend({},i.headers,n.headers),o={url:e,encoding:null,gzip:!0,headers:a};return r?void t("request")(o,function(t,e,n){t||200!==e.statusCode?(t=t||"Load failed with response code "+e.statusCode+".",r(t,null)):r(null,n)}):t("sync-request")("GET",e,o).getBody()}function c(t,e){return null!=t&&0===t.lastIndexOf(e,0)}var d=t("../util"),f=/^([A-Za-z]+:)?\/\//,h="file://";i.loader=a,i.sanitizeUrl=r,i.xhr=s,i.file=u,i.http=l,i.useXHR="undefined"!=typeof XMLHttpRequest,i.headers={},e.exports=i},{"../util":30,fs:2,request:2,"sync-request":2,url:2}],23:[function(t,e,n){function r(t,e){var n=e&&e.type||"json";return t=s[n](t,e),e&&e.parse&&i(t,e.parse),t}function i(t,e){var n,r,i,s,l,c,d=t.length;for(e="auto"===e?o.inferAll(t):a.duplicate(e),n=a.keys(e),r=n.map(function(t){var n=e[t];if(n&&0===n.indexOf("date:")){var r=n.split(/:(.+)?/,2),i=r[1];if(!("'"===i[0]&&"'"===i[i.length-1]||'"'===i[0]&&'"'===i[i.length-1]))throw Error("Format pattern must be quoted: "+i);return i=i.slice(1,-1),i=u(i),function(t){return i.parse(t)}}if(!o.parsers[n])throw Error("Illegal format pattern: "+t+":"+n);return o.parsers[n]}),s=0,c=n.length;s<d;++s)for(i=t[s],l=0;l<c;++l)i[n[l]]=r[l](i[n[l]]);o.annotation(t,e)}var a=t("../util"),o=t("./type"),s=t("./formats"),u=t("../format").time;r.formats=s,e.exports=r},{"../format":15,"../util":30,"./formats":18,"./type":25}],24:[function(t,e,n){var r=t("../util"),i=t("./load"),a=t("./read");e.exports=r.keys(a.formats).reduce(function(t,e){return t[e]=function(t,n,o){r.isString(t)&&(t={url:t}),2===arguments.length&&r.isFunction(n)&&(o=n,n=void 0),n=r.extend({parse:"auto"},n),n.type=e;var s=i(t,o?function(t,e){if(t)return void o(t,null);try{e=a(e,n),o(null,e)}catch(t){o(t,null)}}:void 0);if(!o)return a(s,n)},t},{})},{"../util":30,"./load":22,"./read":23}],25:[function(t,e,n){function r(t,e){return e?void(t[l]=e):t&&t[l]||null}function i(t,e){t=u.array(t),e=u.$(e);var n,r,i;if(t[l]&&(n=e(t[l]),u.isString(n)))return n;for(r=0,i=t.length;!u.isValid(n)&&r<i;++r)n=e?e(t[r]):t[r];return u.isDate(n)?"date":u.isNumber(n)?"number":u.isBoolean(n)?"boolean":u.isString(n)?"string":null}function a(t,e){if(t.length)return e=e||u.keys(t[0]),e.reduce(function(e,n){return e[n]=i(t,n),e},{})}function o(t,e){t=u.array(t),e=u.$(e);var n,r,i,a=["boolean","integer","number","date"];for(n=0;n<t.length;++n){for(i=e?e(t[n]):t[n],r=0;r<a.length;++r)u.isValid(i)&&!d[a[r]](i)&&(a.splice(r,1),r-=1);if(0===a.length)return"string"}return a[0]}function s(t,e){return e=e||u.keys(t[0]),e.reduce(function(e,n){return e[n]=o(t,n),e},{})}var u=t("../util"),l="__types__",c={boolean:u.boolean,integer:u.number,number:u.number,date:u.date,string:function(t){return null==t||""===t?null:t+""}},d={boolean:function(t){return"true"===t||"false"===t||u.isBoolean(t)},integer:function(t){return d.number(t)&&(t=+t)===~~t},number:function(t){return!isNaN(+t)&&!u.isDate(t)},date:function(t){return!isNaN(Date.parse(t))}};i.annotation=r,i.all=a,i.infer=o,i.inferAll=s,i.parsers=c,e.exports=i},{"../util":30}],26:[function(t,e,n){var r=t("./util"),i={version:"1.7.2",load:t("./import/load"),read:t("./import/read"),type:t("./import/type"),Aggregator:t("./aggregate/aggregator"),groupby:t("./aggregate/groupby"),bins:t("./bins/bins"),$bin:t("./bins/histogram").$bin,histogram:t("./bins/histogram").histogram,format:t("./format"),template:t("./template"),time:t("./time")};r.extend(i,r),r.extend(i,t("./accessor")),r.extend(i,t("./generate")),r.extend(i,t("./stats")),r.extend(i,t("./import/readers")),r.extend(i.format,t("./format-tables")),i.print={table:i.format.table,summary:i.format.summary},e.exports=i},{"./accessor":7,"./aggregate/aggregator":8,"./aggregate/groupby":10,"./bins/bins":12,"./bins/histogram":13,"./format":15,"./format-tables":14,"./generate":16,"./import/load":22,"./import/read":23,"./import/readers":24,"./import/type":25,"./stats":27,"./template":28,"./time":29,"./util":30}],27:[function(t,e,n){function r(t,e,n){var r=t&&t.nullh||0,i=u.random.normal(0,1),a=l.mean(e,n),o=l.stdev(e,n)/Math.sqrt(l.count.valid(e,n));if(0===o)return a-r===0?1:0;var s=(a-r)/o;return 2*i.cdf(-Math.abs(s))}function i(t,e,n,r){var i,a=r?e.map(o.$(n)):e,s=r?e.map(o.$(r)):n,u=l.count(a),c=l.count(s),d=Array();if(u!==c)throw Error("Array lengths must match.");for(i=0;i<u;++i)o.isValid(a[i])&&o.isValid(s[i])&&d.push(a[i]-s[i]);return l.z.test(d,t&&t.nullh||0)}function a(t,e,n,r){var i=r?e.map(o.$(n)):e,a=r?e.map(o.$(r)):n,s=l.count.valid(i),c=l.count.valid(a),d=u.random.normal(0,1),f=l.mean(i)-l.mean(a)-(t&&t.nullh||0),h=Math.sqrt(l.variance(i)/s+l.variance(a)/c);if(0===h)return 0===f?1:0;var p=f/h;return 2*d.cdf(-Math.abs(p))}var o=t("./util"),s=t("./import/type"),u=t("./generate"),l=e.exports;l.unique=function(t,e,n){e=o.$(e),n=n||[];var r,i,a,s={};for(i=0,a=t.length;i<a;++i)r=e?e(t[i]):t[i],r in s||(s[r]=1,n.push(r));return n},l.count=function(t){return t&&t.length||0},l.count.valid=function(t,e){e=o.$(e);var n,r,i,a=0;for(r=0,i=t.length;r<i;++r)n=e?e(t[r]):t[r],o.isValid(n)&&(a+=1);return a},l.count.missing=function(t,e){e=o.$(e);var n,r,i,a=0;for(r=0,i=t.length;r<i;++r)n=e?e(t[r]):t[r],null==n&&(a+=1);return a},l.count.distinct=function(t,e){e=o.$(e);var n,r,i,a={},s=0;for(r=0,i=t.length;r<i;++r)n=e?e(t[r]):t[r],n in a||(a[n]=1,s+=1);return s},l.count.map=function(t,e){e=o.$(e);var n,r,i,a={};for(r=0,i=t.length;r<i;++r)n=e?e(t[r]):t[r],a[n]=n in a?a[n]+1:1;return a},l.median=function(t,e){return e&&(t=t.map(o.$(e))),t=t.filter(o.isValid).sort(o.cmp),l.quantile(t,.5)},l.quartile=function(t,e){e&&(t=t.map(o.$(e))),t=t.filter(o.isValid).sort(o.cmp);var n=l.quantile;return[n(t,.25),n(t,.5),n(t,.75)]},l.quantile=function(t,e,n){void 0===n&&(n=e,e=o.identity),e=o.$(e);var r=(t.length-1)*n+1,i=Math.floor(r),a=+e(t[i-1]),s=r-i;return s?a+s*(e(t[i])-a):a},l.sum=function(t,e){e=o.$(e);for(var n,r=0,i=0,a=t.length;i<a;++i)n=e?e(t[i]):t[i],o.isValid(n)&&(r+=n);return r},l.mean=function(t,e){e=o.$(e);var n,r,i,a,s,u=0;for(r=0,a=0,i=t.length;r<i;++r)s=e?e(t[r]):t[r],o.isValid(s)&&(n=s-u,u+=n/++a);return u},l.mean.geometric=function(t,e){e=o.$(e);var n,r,i,a,s=1;for(a=0,n=0,r=t.length;a<r;++a)if(i=e?e(t[a]):t[a],o.isValid(i)){if(i<=0)throw Error("Geometric mean only defined for positive values.");s*=i,++n}return s=n>0?Math.pow(s,1/n):0},l.mean.harmonic=function(t,e){e=o.$(e);var n,r,i,a,s=0;for(a=0,n=0,r=t.length;a<r;++a)i=e?e(t[a]):t[a],o.isValid(i)&&(s+=1/i,++n);return n/s},l.variance=function(t,e){if(e=o.$(e),!o.isArray(t)||t.length<2)return 0;var n,r,i,a,s=0,u=0;for(r=0,i=0;r<t.length;++r)a=e?e(t[r]):t[r],o.isValid(a)&&(n=a-s,s+=n/++i,u+=n*(a-s));return u/=i-1},l.stdev=function(t,e){return Math.sqrt(l.variance(t,e))},l.modeskew=function(t,e){var n=l.mean(t,e),r=l.median(t,e),i=l.stdev(t,e);return 0===i?0:(n-r)/i},l.min=function(t,e){return l.extent(t,e)[0]},l.max=function(t,e){return l.extent(t,e)[1]},l.extent=function(t,e){e=o.$(e);var n,r,i,a,s=t.length;for(a=0;a<s;++a)if(i=e?e(t[a]):t[a],o.isValid(i)){n=r=i;break}for(;a<s;++a)i=e?e(t[a]):t[a],o.isValid(i)&&(i<n&&(n=i),i>r&&(r=i));return[n,r]},l.extent.index=function(t,e){e=o.$(e);var n,r,i,a,s=-1,u=-1,l=t.length;for(a=0;a<l;++a)if(i=e?e(t[a]):t[a],o.isValid(i)){n=r=i,s=u=a;break}for(;a<l;++a)i=e?e(t[a]):t[a],o.isValid(i)&&(i<n&&(n=i,s=a),i>r&&(r=i,u=a));return[s,u]},l.dot=function(t,e,n){var r,i,a=0;if(n)for(e=o.$(e),n=o.$(n),r=0;r<t.length;++r)i=e(t[r])*n(t[r]),i===i&&(a+=i);else{if(t.length!==e.length)throw Error("Array lengths must match.");for(r=0;r<t.length;++r)i=t[r]*e[r],i===i&&(a+=i)}return a},l.dist=function(t,e,n,r){var i,a,s=o.isFunction(n)||o.isString(n),u=t,l=s?t:e,c=s?r:n,d=2===c||null==c,f=t.length,h=0;for(s&&(e=o.$(e),n=o.$(n)),a=0;a<f;++a)i=s?e(u[a])-n(l[a]):u[a]-l[a],h+=d?i*i:Math.pow(Math.abs(i),c);return d?Math.sqrt(h):Math.pow(h,1/c)},l.cohensd=function(t,e,n){var r=n?t.map(o.$(e)):t,i=n?t.map(o.$(n)):e,a=l.mean(r),s=l.mean(i),u=l.count.valid(r),c=l.count.valid(i);if(u+c-2<=0)return 0;var d=l.variance(r),f=l.variance(i),h=Math.sqrt(((u-1)*d+(c-1)*f)/(u+c-2));return 0===h?0:(a-s)/h},l.covariance=function(t,e,n){var r,i,a,s,u,c=n?t.map(o.$(e)):t,d=n?t.map(o.$(n)):e,f=c.length,h=l.mean(c),p=l.mean(d),g=0,m=0;if(f!==d.length)throw Error("Input lengths must match.");for(r=0;r<f;++r)if(i=c[r],s=o.isValid(i),a=d[r],u=o.isValid(a),s&&u)g+=(i-h)*(a-p),++m;else if(s||u)throw Error("Valid values must align.");return g/(m-1)},l.rank=function(t,e){e=o.$(e)||o.identity;var n,r,i,a=t.map(function(t,n){return{idx:n,val:e(t)}}).sort(o.comparator("val")),s=t.length,u=Array(s),l=-1,c={};for(n=0;n<s;++n){if(r=a[n].val,l<0&&c===r)l=n-1;else if(l>-1&&c!==r){for(i=1+(n-1+l)/2;l<n;++l)u[a[l].idx]=i;l=-1}u[a[n].idx]=n+1,c=r}if(l>-1)for(i=1+(s-1+l)/2;l<s;++l)u[a[l].idx]=i;return u},l.cor=function(t,e,n){var r=n;n=r?t.map(o.$(n)):e,e=r?t.map(o.$(e)):t;var i=l.dot(e,n),a=l.mean(e),s=l.mean(n),u=l.stdev(e),c=l.stdev(n),d=t.length;return(i-d*a*s)/((d-1)*u*c)},l.cor.rank=function(t,e,n){var r,i,a,o=n?l.rank(t,e):l.rank(t),s=n?l.rank(t,n):l.rank(e),u=t.length;for(r=0,i=0;r<u;++r)a=o[r]-s[r],i+=a*a;return 1-6*i/(u*(u*u-1))},l.cor.dist=function(t,e,n){var r,i,a,s,u=n?t.map(o.$(e)):t,c=n?t.map(o.$(n)):e,d=l.dist.mat(u),f=l.dist.mat(c),h=d.length;for(r=0,i=0,a=0,s=0;r<h;++r)i+=d[r]*d[r],a+=f[r]*f[r],s+=d[r]*f[r];return Math.sqrt(s/Math.sqrt(i*a))},l.linearRegression=function(t,e,n){var r,i,a=n?t.map(o.$(e)):t,s=n?t.map(o.$(n)):e,u=a.length,c=l.covariance(a,s),d=l.stdev(a),f=l.stdev(s),h=c/(d*d),p=l.mean(s)-h*l.mean(a),g={slope:h,intercept:p,R:c/(d*f),rss:0};for(i=0;i<u;++i)o.isValid(a[i])&&o.isValid(s[i])&&(r=h*a[i]+p-s[i],g.rss+=r*r);return g},l.bootstrap={},l.bootstrap.ci=function(t,e,n,r,i){var a,s,c,d,f,h,p;for(o.isFunction(e)||o.isString(e)?(a=t.map(o.$(e)),s=n,c=r,d=i):(a=t,s=e,c=n,d=r),s=s?+s:1e3,c=c||.05,
f=u.random.bootstrap(a,d),p=0,h=Array(s);p<s;++p)h[p]=l.mean(f.samples(a.length));return h.sort(o.numcmp),[l.quantile(h,c/2),l.quantile(h,1-c/2)]},l.z={},l.z.ci=function(t,e,n){var r=t,i=e;(o.isFunction(e)||o.isString(e))&&(r=t.map(o.$(e)),i=n),i=i||.05;var a=.05===i?1.96:u.random.normal(0,1).icdf(1-i/2),s=l.mean(r),c=l.stdev(r)/Math.sqrt(l.count.valid(r));return[s-a*c,s+a*c]},l.z.test=function(t,e,n,s){return o.isFunction(n)||o.isString(n)?(s&&s.paired?i:a)(s,t,e,n):o.isArray(e)?(n&&n.paired?i:a)(n,t,e):o.isFunction(e)||o.isString(e)?r(n,t,e):r(e,t)},l.dist.mat=function(t){var e,n,r,i=t.length,a=i*i,o=Array(a),s=u.zeros(i),l=0;for(n=0;n<i;++n)for(o[n*i+n]=0,r=n+1;r<i;++r)o[n*i+r]=e=Math.abs(t[n]-t[r]),o[r*i+n]=e,s[n]+=e,s[r]+=e;for(n=0;n<i;++n)l+=s[n],s[n]/=i;for(l/=a,n=0;n<i;++n)for(r=n;r<i;++r)o[n*i+r]+=l-s[n]-s[r],o[r*i+n]=o[n*i+r];return o},l.entropy=function(t,e){e=o.$(e);var n,r,i=0,a=0,s=t.length;for(n=0;n<s;++n)i+=e?e(t[n]):t[n];if(0===i)return 0;for(n=0;n<s;++n)r=(e?e(t[n]):t[n])/i,r&&(a+=r*Math.log(r));return-a/Math.LN2},l.mutual=function(t,e,n,r){var i,a,s,u=r?t.map(o.$(e)):t,l=r?t.map(o.$(n)):e,c=r?t.map(o.$(r)):n,d={},f={},h=c.length,p=0,g=0,m=0;for(s=0;s<h;++s)d[u[s]]=0,f[l[s]]=0;for(s=0;s<h;++s)d[u[s]]+=c[s],f[l[s]]+=c[s],p+=c[s];for(a=1/(p*Math.LN2),s=0;s<h;++s)0!==c[s]&&(i=p*c[s]/(d[u[s]]*f[l[s]]),g+=c[s]*a*Math.log(i),m+=c[s]*a*Math.log(c[s]/p));return[g,1+g/m]},l.mutual.info=function(t,e,n,r){return l.mutual(t,e,n,r)[0]},l.mutual.dist=function(t,e,n,r){return l.mutual(t,e,n,r)[1]},l.profile=function(t,e){var n,r,i,a,u,c=0,d=0,f=0,h=0,p=null,g=null,m=0,v=[],y={};for(i=0;i<t.length;++i)a=e?e(t[i]):t[i],y[a]=a in y?y[a]+1:(h+=1,1),null==a?++f:o.isValid(a)&&(u="string"==typeof a?a.length:a,(null===p||u<p)&&(p=u),(null===g||u>g)&&(g=u),n=u-c,c+=n/++d,m+=n*(u-c),v.push(u));return m/=d-1,r=Math.sqrt(m),v.sort(o.cmp),{type:s(t,e),unique:y,count:t.length,valid:d,missing:f,distinct:h,min:p,max:g,mean:c,stdev:r,median:a=l.quantile(v,.5),q1:l.quantile(v,.25),q3:l.quantile(v,.75),modeskew:0===r?0:(c-a)/r}},l.summary=function(t,e){e=e||o.keys(t[0]);var n=e.map(function(e){var n=l.profile(t,o.$(e));return n.field=e,n});return n.__summary__=!0,n}},{"./generate":16,"./import/type":25,"./util":30}],28:[function(t,e,n){function r(t){var e=i(t,"d");return e="var __t; return "+e+";",new Function("d",e).bind(d)}function i(t,e,n){e=e||"obj";var r=0,i="'",s=f;return t.replace(s,function(s,u,l){return i+=t.slice(r,l).replace(m,o),r=l+s.length,u&&(i+="'\n+((__t=("+a(u,e,n)+"))==null?'':__t)+\n'"),s}),i+"'"}function a(t,e,n){function i(t){return t=t||"",d?(d=!1,f="String("+f+")"+t):f+=t,f}function a(){return"(typeof "+f+'==="number"?new Date('+f+"):"+f+")"}function o(t){var e=b[0];if(!("'"===e[0]&&"'"===e[e.length-1]||'"'===e[0]&&'"'===e[e.length-1]))throw Error("Format pattern must be quoted: "+e);e=e.slice(1,-1),v=s(e,t),d=!1;var n="number"===t?f:a();f="this.formats["+v+"]("+n+")"}var u=t.match(h),c=u.shift().trim(),d=!0;n&&(n[c]=1);for(var f=r.property(e,c),g=0;g<u.length;++g){var m,v,y,_=u[g],b=null;switch((m=_.indexOf(":"))>0&&(_=_.slice(0,m),b=u[g].slice(m+1).match(p).map(function(t){return t.trim()})),_=_.trim()){case"length":i(".length");break;case"lower":i(".toLowerCase()");break;case"upper":i(".toUpperCase()");break;case"lower-locale":i(".toLocaleLowerCase()");break;case"upper-locale":i(".toLocaleUpperCase()");break;case"trim":i(".trim()");break;case"left":v=l.number(b[0]),i(".slice(0,"+v+")");break;case"right":v=l.number(b[0]),i(".slice(-"+v+")");break;case"mid":v=l.number(b[0]),y=v+l.number(b[1]),i(".slice(+"+v+","+y+")");break;case"slice":v=l.number(b[0]),i(".slice("+v+(b.length>1?","+l.number(b[1]):"")+")");break;case"truncate":v=l.number(b[0]),y=b[1],y="left"!==y&&"middle"!==y&&"center"!==y?"right":y,f="this.truncate("+i()+","+v+",'"+y+"')";break;case"pad":v=l.number(b[0]),y=b[1],y="left"!==y&&"middle"!==y&&"center"!==y?"right":y,f="this.pad("+i()+","+v+",'"+y+"')";break;case"number":o("number");break;case"time":o("time");break;case"time-utc":o("utc");break;case"month":f="this.month("+f+")";break;case"month-abbrev":f="this.month("+f+",true)";break;case"day":f="this.day("+f+")";break;case"day-abbrev":f="this.day("+f+",true)";break;case"quarter":f="this.quarter("+f+")";break;case"quarter-utc":f="this.utcQuarter("+f+")";break;default:throw Error("Unrecognized template filter: "+_)}}return f}function o(t){return"\\"+g[t]}function s(t,e){var n=e+":"+t;if(null==d.format_map[n]){var r=c[e](t),i=d.formats.length;return d.formats.push(r),d.format_map[n]=i,i}return d.format_map[n]}function u(t,e){return d.formats[s(t,e)]}var l=t("./util"),c=t("./format"),d={formats:[],format_map:{},truncate:l.truncate,pad:l.pad,day:c.day,month:c.month,quarter:c.quarter,utcQuarter:c.utcQuarter};r.source=i,r.context=d,r.format=u,e.exports=r,r.clearFormatCache=function(){d.formats=[],d.format_map={}},r.property=function(t,e){var n=l.field(e).map(l.str).join("][");return t+"["+n+"]"};var f=/\{\{(.+?)\}\}|$/g,h=/(?:"[^"]*"|\'[^\']*\'|[^\|"]+|[^\|\']+)+/g,p=/(?:"[^"]*"|\'[^\']*\'|[^,"]+|[^,\']+)+/g,g={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},m=/\\|'|\r|\n|\u2028|\u2029/g},{"./format":15,"./util":30}],29:[function(t,e,n){function r(t){return l.setTime(+t),l}function i(t,e,n,r,i,a){var o={type:t,date:e,unit:n};return r?o.step=r:o.minstep=1,null!=i&&(o.min=i),null!=a&&(o.max=a),o}function a(t,e,n,r,a,o){return i(t,function(t){return e.offset(n,t)},function(t){return e.count(n,t)},r,a,o)}function o(t,e,n,r){var i,a,o,s=p[0];for(i=1,a=p.length;i<a;++i)if(s=p[i],e>s[0]){if(o=e/s[0],o>r)return t[p[i-1][1]];if(o>=n)return t[s[1]]}return t[p[a-1][1]]}function s(t){var e,n,r={};for(e=0,n=t.length;e<n;++e)r[t[e].type]=t[e];return r.find=function(e,n,r){return o(t,e,n,r)},r}var u=t("d3-time"),l=new Date,c=new Date(0,0,1).setFullYear(0),d=new Date(Date.UTC(0,0,1)).setUTCFullYear(0),f=[a("second",u.second,c),a("minute",u.minute,c),a("hour",u.hour,c),a("day",u.day,c,[1,7]),a("month",u.month,c,[1,3,6]),a("year",u.year,c),i("seconds",function(t){return new Date(1970,0,1,0,0,t)},function(t){return r(t).getSeconds()},null,0,59),i("minutes",function(t){return new Date(1970,0,1,0,t)},function(t){return r(t).getMinutes()},null,0,59),i("hours",function(t){return new Date(1970,0,1,t)},function(t){return r(t).getHours()},null,0,23),i("weekdays",function(t){return new Date(1970,0,4+t)},function(t){return r(t).getDay()},[1],0,6),i("dates",function(t){return new Date(1970,0,t)},function(t){return r(t).getDate()},[1],1,31),i("months",function(t){return new Date(1970,t%12,1)},function(t){return r(t).getMonth()},[1],0,11)],h=[a("second",u.utcSecond,d),a("minute",u.utcMinute,d),a("hour",u.utcHour,d),a("day",u.utcDay,d,[1,7]),a("month",u.utcMonth,d,[1,3,6]),a("year",u.utcYear,d),i("seconds",function(t){return new Date(Date.UTC(1970,0,1,0,0,t))},function(t){return r(t).getUTCSeconds()},null,0,59),i("minutes",function(t){return new Date(Date.UTC(1970,0,1,0,t))},function(t){return r(t).getUTCMinutes()},null,0,59),i("hours",function(t){return new Date(Date.UTC(1970,0,1,t))},function(t){return r(t).getUTCHours()},null,0,23),i("weekdays",function(t){return new Date(Date.UTC(1970,0,4+t))},function(t){return r(t).getUTCDay()},[1],0,6),i("dates",function(t){return new Date(Date.UTC(1970,0,t))},function(t){return r(t).getUTCDate()},[1],1,31),i("months",function(t){return new Date(Date.UTC(1970,t%12,1))},function(t){return r(t).getUTCMonth()},[1],0,11)],p=[[31536e6,5],[7776e6,4],[2592e6,4],[12096e5,3],[6048e5,3],[1728e5,3],[864e5,3],[432e5,2],[216e5,2],[108e5,2],[36e5,2],[18e5,1],[9e5,1],[3e5,1],[6e4,1],[3e4,0],[15e3,0],[5e3,0],[1e3,0]];e.exports=s(f),e.exports.utc=s(h)},{"d3-time":6}],30:[function(t,e,n){(function(t){function n(t,e){var n,r="";for(n=0;n<t;++n)r+=e;return r}function r(t,e,n){var r=0,i=t.split(u);return t=n?(i=i.reverse()).filter(function(t){return r+=t.length,r<=e}).reverse():i.filter(function(t){return r+=t.length,r<=e}),t.length?t.join("").trim():i[0].slice(0,e)}var i=e.exports,a="__name__";i.namedfunc=function(t,e){return e[a]=t,e},i.name=function(t){return null==t?null:t[a]},i.identity=function(t){return t},i.true=i.namedfunc("true",function(){return!0}),i.false=i.namedfunc("false",function(){return!1}),i.duplicate=function(t){return JSON.parse(JSON.stringify(t))},i.equal=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},i.extend=function(t){for(var e,n,r=1,i=arguments.length;r<i;++r){e=arguments[r];for(n in e)t[n]=e[n]}return t},i.length=function(t){return null!=t&&null!=t.length?t.length:null},i.keys=function(t){var e,n=[];for(e in t)n.push(e);return n},i.vals=function(t){var e,n=[];for(e in t)n.push(t[e]);return n},i.toMap=function(t,e){return(e=i.$(e))?t.reduce(function(t,n){return t[e(n)]=1,t},{}):t.reduce(function(t,e){return t[e]=1,t},{})},i.keystr=function(t){var e=t.length;if(!e)return"";for(var n=String(t[0]),r=1;r<e;++r)n+="|"+String(t[r]);return n};var o=Object.prototype.toString;i.isObject=function(t){return t===Object(t)},i.isFunction=function(t){return"[object Function]"===o.call(t)},i.isString=function(t){return"string"==typeof value||"[object String]"===o.call(t)},i.isArray=Array.isArray||function(t){return"[object Array]"===o.call(t)},i.isNumber=function(t){return"number"==typeof t||"[object Number]"===o.call(t)},i.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"==o.call(t)},i.isDate=function(t){return"[object Date]"===o.call(t)},i.isValid=function(t){return null!=t&&t===t},i.isBuffer="function"==typeof t&&t.isBuffer||i.false,i.number=function(t){return null==t||""===t?null:+t},i.boolean=function(t){return null==t||""===t?null:"false"!==t&&!!t},i.date=function(t,e){var n=e?e:Date;return null==t||""===t?null:n.parse(t)},i.array=function(t){return null!=t?i.isArray(t)?t:[t]:[]},i.str=function(t){return i.isArray(t)?"["+t.map(i.str)+"]":i.isObject(t)||i.isString(t)?JSON.stringify(t).replace("\u2028","\\u2028").replace("\u2029","\\u2029"):t};var s=/\[(.*?)\]|[^.\[]+/g;i.field=function(t){return String(t).match(s).map(function(t){return"["!==t[0]?t:"'"!==t[1]&&'"'!==t[1]?t.slice(1,-1):t.slice(2,-2).replace(/\\(["'])/g,"$1")})},i.accessor=function(t){return null==t||i.isFunction(t)?t:i.namedfunc(t,Function("x","return x["+i.field(t).map(i.str).join("][")+"];"))},i.$=i.accessor,i.mutator=function(t){var e;return i.isString(t)&&(e=i.field(t)).length>1?function(t,n){for(var r=0;r<e.length-1;++r)t=t[e[r]];t[e[r]]=n}:function(e,n){e[t]=n}},i.$func=function(t,e){return function(n){n=i.$(n)||i.identity;var r=t+(i.name(n)?"_"+i.name(n):"");return i.namedfunc(r,function(t){return e(n(t))})}},i.$valid=i.$func("valid",i.isValid),i.$length=i.$func("length",i.length),i.$in=function(t,e){t=i.$(t);var n=i.isArray(e)?i.toMap(e):e;return function(e){return!!n[t(e)]}},i.comparator=function(t){var e=[];return void 0===t&&(t=[]),t=i.array(t).map(function(t){var n=1;return"-"===t[0]?(n=-1,t=t.slice(1)):"+"===t[0]&&(n=1,t=t.slice(1)),e.push(n),i.accessor(t)}),function(n,r){var a,o,s,u;for(a=0,o=t.length;a<o;++a)if(s=t[a],u=i.cmp(s(n),s(r)))return u*e[a];return 0}},i.cmp=function(t,e){return(t<e||null==t)&&null!=e?-1:(t>e||null==e)&&null!=t?1:(e=e instanceof Date?+e:e,(t=t instanceof Date?+t:t)!==t&&e===e?-1:e!==e&&t===t?1:0)},i.numcmp=function(t,e){return t-e},i.stablesort=function(t,e,n){var r=t.reduce(function(t,e,r){return t[n(e)]=r,t},{});return t.sort(function(t,i){var a=e(t),o=e(i);return a<o?-1:a>o?1:r[n(t)]-r[n(i)]}),t},i.permute=function(t){for(var e,n,r=t.length;r;)n=Math.floor(Math.random()*r--),e=t[r],t[r]=t[n],t[n]=e},i.pad=function(t,e,r,i){i=i||" ";var a=e-t.length;if(a<=0)return t;switch(r){case"left":return n(a,i)+t;case"middle":case"center":return n(Math.floor(a/2),i)+t+n(Math.ceil(a/2),i);default:return t+n(a,i)}},i.truncate=function(t,e,n,i,a){var o=t.length;if(o<=e)return t;a=void 0!==a?String(a):"…";var s=Math.max(0,e-a.length);switch(n){case"left":return a+(i?r(t,s,1):t.slice(o-s));case"middle":case"center":var u=Math.ceil(s/2),l=Math.floor(s/2);return(i?r(t,u):t.slice(0,u))+a+(i?r(t,l,1):t.slice(o-l));default:return(i?r(t,s):t.slice(0,s))+a}};var u=/([\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF])/}).call(this,t("buffer").Buffer)},{buffer:2}],31:[function(e,n,r){!function(e,i){"object"==typeof r&&"undefined"!=typeof n?i(r):"function"==typeof t&&t.amd?t(["exports"],i):i(e.topojson=e.topojson||{})}(this,function(t){"use strict";function e(){}function n(t){if(!t)return e;var n,r,i=t.scale[0],a=t.scale[1],o=t.translate[0],s=t.translate[1];return function(t,e){e||(n=r=0),t[0]=(n+=t[0])*i+o,t[1]=(r+=t[1])*a+s}}function r(t){if(!t)return e;var n,r,i=t.scale[0],a=t.scale[1],o=t.translate[0],s=t.translate[1];return function(t,e){e||(n=r=0);var u=Math.round((t[0]-o)/i),l=Math.round((t[1]-s)/a);t[0]=u-n,t[1]=l-r,n=u,r=l}}function i(t,e){for(var n,r=t.length,i=r-e;i<--r;)n=t[i],t[i++]=t[r],t[r]=n}function a(t,e){for(var n=0,r=t.length;n<r;){var i=n+r>>>1;t[i]<e?n=i+1:r=i}return n}function o(t,e){return"GeometryCollection"===e.type?{type:"FeatureCollection",features:e.geometries.map(function(e){return s(t,e)})}:s(t,e)}function s(t,e){var n={type:"Feature",id:e.id,properties:e.properties||{},geometry:u(t,e)};return null==e.id&&delete n.id,n}function u(t,e){function r(t,e){e.length&&e.pop();for(var n,r=d[t<0?~t:t],a=0,o=r.length;a<o;++a)e.push(n=r[a].slice()),c(n,a);t<0&&i(e,o)}function a(t){return t=t.slice(),c(t,0),t}function o(t){for(var e=[],n=0,i=t.length;n<i;++n)r(t[n],e);return e.length<2&&e.push(e[0].slice()),e}function s(t){for(var e=o(t);e.length<4;)e.push(e[0].slice());return e}function u(t){return t.map(s)}function l(t){var e=t.type;return"GeometryCollection"===e?{type:e,geometries:t.geometries.map(l)}:e in f?{type:e,coordinates:f[e](t)}:null}var c=n(t.transform),d=t.arcs,f={Point:function(t){return a(t.coordinates)},MultiPoint:function(t){return t.coordinates.map(a)},LineString:function(t){return o(t.arcs)},MultiLineString:function(t){return t.arcs.map(o)},Polygon:function(t){return u(t.arcs)},MultiPolygon:function(t){return t.arcs.map(u)}};return l(e)}function l(t,e){function n(e){var n,r=t.arcs[e<0?~e:e],i=r[0];return t.transform?(n=[0,0],r.forEach(function(t){n[0]+=t[0],n[1]+=t[1]})):n=r[r.length-1],e<0?[n,i]:[i,n]}function r(t,e){for(var n in t){var r=t[n];delete e[r.start],delete r.start,delete r.end,r.forEach(function(t){i[t<0?~t:t]=1}),s.push(r)}}var i={},a={},o={},s=[],u=-1;return e.forEach(function(n,r){var i,a=t.arcs[n<0?~n:n];a.length<3&&!a[1][0]&&!a[1][1]&&(i=e[++u],e[u]=n,e[r]=i)}),e.forEach(function(t){var e,r,i=n(t),s=i[0],u=i[1];if(e=o[s])if(delete o[e.end],e.push(t),e.end=u,r=a[u]){delete a[r.start];var l=r===e?e:e.concat(r);a[l.start=e.start]=o[l.end=r.end]=l}else a[e.start]=o[e.end]=e;else if(e=a[u])if(delete a[e.start],e.unshift(t),e.start=s,r=o[s]){delete o[r.end];var c=r===e?e:r.concat(e);a[c.start=r.start]=o[c.end=e.end]=c}else a[e.start]=o[e.end]=e;else e=[t],a[e.start=s]=o[e.end=u]=e}),r(o,a),r(a,o),e.forEach(function(t){i[t<0?~t:t]||s.push([t])}),s}function c(t){return u(t,d.apply(this,arguments))}function d(t,e,n){function r(t){var e=t<0?~t:t;(c[e]||(c[e]=[])).push({i:t,g:u})}function i(t){t.forEach(r)}function a(t){t.forEach(i)}function o(t){"GeometryCollection"===t.type?t.geometries.forEach(o):t.type in d&&(u=t,d[t.type](t.arcs))}var s=[];if(arguments.length>1){var u,c=[],d={LineString:i,MultiLineString:a,Polygon:a,MultiPolygon:function(t){t.forEach(a)}};o(e),c.forEach(arguments.length<3?function(t){s.push(t[0].i)}:function(t){n(t[0].g,t[t.length-1].g)&&s.push(t[0].i)})}else for(var f=0,h=t.arcs.length;f<h;++f)s.push(f);return{type:"MultiLineString",arcs:l(t,s)}}function f(t){var e=t[0],n=t[1],r=t[2];return Math.abs((e[0]-r[0])*(n[1]-e[1])-(e[0]-n[0])*(r[1]-e[1]))}function h(t){for(var e,n=-1,r=t.length,i=t[r-1],a=0;++n<r;)e=i,i=t[n],a+=e[0]*i[1]-e[1]*i[0];return a/2}function p(t){return u(t,g.apply(this,arguments))}function g(t,e){function n(t){t.forEach(function(e){e.forEach(function(e){(i[e=e<0?~e:e]||(i[e]=[])).push(t)})}),a.push(t)}function r(e){return Math.abs(h(u(t,{type:"Polygon",arcs:[e]}).coordinates[0]))}var i={},a=[],o=[];return e.forEach(function(t){"Polygon"===t.type?n(t.arcs):"MultiPolygon"===t.type&&t.arcs.forEach(n)}),a.forEach(function(t){if(!t._){var e=[],n=[t];for(t._=1,o.push(e);t=n.pop();)e.push(t),t.forEach(function(t){t.forEach(function(t){i[t<0?~t:t].forEach(function(t){t._||(t._=1,n.push(t))})})})}}),a.forEach(function(t){delete t._}),{type:"MultiPolygon",arcs:o.map(function(e){var n,a=[];if(e.forEach(function(t){t.forEach(function(t){t.forEach(function(t){i[t<0?~t:t].length<2&&a.push(t)})})}),a=l(t,a),(n=a.length)>1)for(var o,s,u=1,c=r(a[0]);u<n;++u)(o=r(a[u]))>c&&(s=a[0],a[0]=a[u],a[u]=s,c=o);return a})}}function m(t){function e(t,e){t.forEach(function(t){t<0&&(t=~t);var n=i[t];n?n.push(e):i[t]=[e]})}function n(t,n){t.forEach(function(t){e(t,n)})}function r(t,e){"GeometryCollection"===t.type?t.geometries.forEach(function(t){r(t,e)}):t.type in s&&s[t.type](t.arcs,e)}var i={},o=t.map(function(){return[]}),s={LineString:e,MultiLineString:n,Polygon:n,MultiPolygon:function(t,e){t.forEach(function(t){n(t,e)})}};t.forEach(r);for(var u in i)for(var l=i[u],c=l.length,d=0;d<c;++d)for(var f=d+1;f<c;++f){var h,p=l[d],g=l[f];(h=o[p])[u=a(h,g)]!==g&&h.splice(u,0,g),(h=o[g])[u=a(h,p)]!==p&&h.splice(u,0,p)}return o}function v(t,e){return t[1][2]-e[1][2]}function y(){function t(t,e){for(;e>0;){var n=(e+1>>1)-1,i=r[n];if(v(t,i)>=0)break;r[i._=e]=i,r[t._=e=n]=t}}function e(t,e){for(;;){var n=e+1<<1,a=n-1,o=e,s=r[o];if(a<i&&v(r[a],s)<0&&(s=r[o=a]),n<i&&v(r[n],s)<0&&(s=r[o=n]),o===e)break;r[s._=e]=s,r[t._=e=o]=t}}var n={},r=[],i=0;return n.push=function(e){return t(r[e._=i]=e,i++),i},n.pop=function(){if(!(i<=0)){var t,n=r[0];return--i>0&&(t=r[i],e(r[t._=0]=t,0)),n}},n.remove=function(n){var a,o=n._;if(r[o]===n)return o!==--i&&(a=r[i],(v(a,n)<0?t:e)(r[a._=o]=a,o)),o},n}function _(t,e){function i(t){s.remove(t),t[1][2]=e(t),s.push(t)}var a=n(t.transform),o=r(t.transform),s=y();return e||(e=f),t.arcs.forEach(function(t){var n,r,u,l,c=[],d=0;for(r=0,u=t.length;r<u;++r)l=t[r],a(t[r]=[l[0],l[1],1/0],r);for(r=1,u=t.length-1;r<u;++r)n=t.slice(r-1,r+2),n[1][2]=e(n),c.push(n),s.push(n);for(r=0,u=c.length;r<u;++r)n=c[r],n.previous=c[r-1],n.next=c[r+1];for(;n=s.pop();){var f=n.previous,h=n.next;n[1][2]<d?n[1][2]=d:d=n[1][2],f&&(f.next=h,f[2]=n[2],i(f)),h&&(h.previous=f,h[0]=n[0],i(h))}t.forEach(o)}),t}var b="1.6.26";t.version=b,t.mesh=c,t.meshArcs=d,t.merge=p,t.mergeArcs=g,t.feature=o,t.neighbors=m,t.presimplify=_})},{}],32:[function(t,e,n){function r(t,e){var n={};return i(t,n),n.add=[],n.mod=[],n.rem=[],n.reflow=e,n}function i(t,e){e.stamp=t?t.stamp:0,e.sort=t?t.sort:null,e.facet=t?t.facet:null,e.trans=t?t.trans:null,e.dirty=t?t.dirty:[],e.request=t?t.request:null;for(var n,r=0,i=a.length;r<i;++r)e[n=a[r]]=t?t[n]:{}}var a=t("./Dependencies").ALL;e.exports={create:r,copy:i}},{"./Dependencies":35}],33:[function(t,e,n){function r(t){o.init.call(this,t),this._data=[],this.router(!0).collector(!0)}var i=t("vega-logging"),a=t("./Tuple"),o=t("./Node").prototype,s=t("./ChangeSet"),u=r.prototype=Object.create(o);u.constructor=r,u.data=function(){return this._data},u.evaluate=function(t){i.debug(t,["collecting"]);var e=s.create(t);return t.rem.length&&(this._data=a.idFilter(this._data,t.rem),e.rem=t.rem.slice(0)),t.add.length&&(this._data=this._data.concat(t.add),e.add=t.add.slice(0)),t.mod.length&&(e.mod=t.mod.slice(0)),t.sort&&this._data.sort(t.sort),t.reflow&&(e.mod=e.mod.concat(a.idFilter(this._data,e.add,e.mod,e.rem)),e.reflow=!1),e},e.exports=r},{"./ChangeSet":32,"./Node":38,"./Tuple":40,"vega-logging":48}],34:[function(t,e,n){function r(t,e,n){this._graph=t,this._name=e,this._data=[],this._source=null,this._facet=n,this._input=l.create(),this._output=null,this._indexes={},this._indexFields=[],this._inputNode=null,this._outputNode=null,this._pipeline=null,this._collector=null,this._mutates=!1}function i(t){var e=new f(t._graph).router(!0).collector(!0);return e.data=function(){return t._data},e.evaluate=function(e){u.debug(e,["input",t._name]);var n,r=t._input,i=l.create(e);for(n in r.fields)i.fields[n]=1;return r.rem.length&&(t._data=d.idFilter(t._data,r.rem)),r.add.length&&(t._data=t._data.concat(r.add)),r.sort&&t._data.sort(r.sort),e.reflow&&(r.mod=r.mod.concat(d.idFilter(t._data,r.add,r.mod,r.rem))),t._input=l.create(),i.add=r.add,i.mod=r.mod,i.rem=r.rem,i.facet=t._facet,i},e}function a(t){function e(e){var n,r,i,a,o,u,l=t._indexFields;for(n=0;n<l.length;++n){for(a=l[n],o=t._indexes[a],i=s.$(a),r=0;r<e.add.length;++r)u=i(e.add[r]),d.prev_init(e.add[r]),o[u]=(o[u]||0)+1;for(r=0;r<e.rem.length;++r)u=i(e.rem[r]),o[u]=(o[u]||0)-1;for(r=0;r<e.mod.length;++r)u=i(e.mod[r]._prev),o[u]=(o[u]||0)-1,u=i(e.mod[r]),o[u]=(o[u]||0)+1}}var n=new f(t._graph).router(!0).reflows(!0).collector(!0);return n.data=function(){return t._collector?t._collector.data():t._data},n.evaluate=function(n){u.debug(n,["output",t._name]),e(n);var r=l.create(n,!0);return t._facet&&(t._facet.values=t.values(),n.facet=null),t._output=n,r.data[t._name]=1,r},n}function o(t){var e=new f(t._graph).router(!0);return e.evaluate=function(e){if(t.mutates()){var n=t._srcMap||(t._srcMap={}),r=l.create(e);return r.add=e.add.map(function(t){return n[t._id]=d.derive(t)}),r.mod=e.mod.map(function(t){return d.rederive(t,n[t._id])}),r.rem=e.rem.map(function(t){var e=n[t._id];return n[t._id]=null,e}),t._input=r}return t._input=e},e}var s=t("datalib"),u=t("vega-logging"),l=t("./ChangeSet"),c=t("./Collector"),d=t("./Tuple"),f=t("./Node"),h=r.prototype;h.name=function(t){return arguments.length?(this._name=t,this):this._name},h.source=function(t){return arguments.length?this._source=this._graph.data(t):this._source},h.insert=function(t){return this._input.add=this._input.add.concat(t.map(d.ingest)),this},h.remove=function(t){var e=this._data.filter(t);return this._input.rem=this._input.rem.concat(e),this},h.update=function(t,e,n){var r=this._input.mod,i=d.idMap(r);return this._input.fields[e]=1,this._data.filter(t).forEach(function(t){var a=t[e],o=n(t);a!==o&&(d.set(t,e,o),1!==i[t._id]&&(r.push(t),i[t._id]=1))}),this},h.values=function(t){return arguments.length?(this._input.rem=this._data.slice(),t&&this.insert(t),this):this._collector.data()},h.mutates=function(t){return arguments.length?(this._mutates=this._mutates||t,this):this._mutates},h.last=function(){return this._output},h.fire=function(t){return t&&(this._input=t),this._graph.propagate(this._input,this._pipeline[0]),this},h.pipeline=function(t){if(!arguments.length)return this._pipeline;var e,n=this._graph;return t.unshift(this._inputNode=i(this)),e=n.preprocess(t),e.router&&t.push(e.collector=new c(n)),t.push(this._outputNode=a(this)),this._collector=e.collector,this._mutates=!!e.mutates,n.connect(this._pipeline=t),this},h.synchronize=function(){return this._graph.synchronize(this._pipeline),this},h.getIndex=function(t){var e,n,r,i,a=this.values(),o=this._indexes,u=this._indexFields,l=s.$(t);if(!o[t])for(o[t]=e={},u.push(t),n=0,r=a.length;n<r;++n)i=l(a[n]),e[i]=(e[i]||0)+1,d.prev_init(a[n]);return o[t]},h.listener=function(){return o(this).addListener(this._inputNode)},h.addListener=function(t){return t instanceof r?this._collector.addListener(t.listener()):this._outputNode.addListener(t),this},h.removeListener=function(t){this._outputNode.removeListener(t)},h.listeners=function(t){return(t?this._collector:this._outputNode).listeners()},e.exports=r},{"./ChangeSet":32,"./Collector":33,"./Node":38,"./Tuple":40,datalib:26,"vega-logging":48}],35:[function(t,e,n){var r=e.exports={ALL:["data","fields","scales","signals"]};r.ALL.forEach(function(t){r[t.toUpperCase()]=t})},{}],36:[function(t,e,n){function r(){}var i=t("datalib"),a=t("vega-logging"),o=t("./Heap"),s=t("./ChangeSet"),u=t("./DataSource"),l=t("./Collector"),c=t("./Tuple"),d=t("./Signal"),f=t("./Dependencies"),h=r.prototype;h.init=function(){this._stamp=0,this._rank=0,this._data={},this._signals={},this._requestedIndexes={},this.doNotPropagate={}},h.rank=function(){return++this._rank},h.values=function(t,e,n){var r,a,o=t===f.SIGNALS?this._signals:this._data,s=void 0!==e?e:i.keys(o);if(Array.isArray(s)){for(r=n||{},a=0;a<s.length;++a)r[s[a]]=o[s[a]].values();return r}return o[s].values()},h.dataValues=function(t){return this.values(f.DATA,t)},h.signalValues=function(t){return this.values(f.SIGNALS,t)},h.data=function(t,e,n){var r=this._data;if(arguments.length)return 1===arguments.length?r[t]:r[t]=new u(this,t,n).pipeline(e);var i,a=[];for(i in r)a.push(r[i]);return a},h.signal=function(t,e){if(1===arguments.length){var n=this;return Array.isArray(t)?t.map(function(t){return n._signals[t]}):this._signals[t]}return this._signals[t]=new d(this,t,e)},h.signalRef=function(t){Array.isArray(t)||(t=i.field(t));var e=this.signal(t[0]).value();if(t.length>1)for(var n=1,r=t.length;n<r;++n)e=e[t[n]];return e},h.requestIndex=function(t,e){var n=this._requestedIndexes,r=n[t]||(n[t]={});return r[e]=!0,this},h.buildIndexes=function(){var t,e,n,r,a,o,s,u,l=this._requestedIndexes,c=i.keys(l);for(t=0,e=c.length;t<e;++t){if(o=this.data(a=c[t]),!o)throw Error("Data source "+i.str(a)+" does not exist.");for(s=i.keys(l[a]),n=0,r=s.length;n<r;++n)null!==(u=s[n])&&(o.getIndex(u),l[a][u]=null)}return this},h.propagate=function(t,e,n,r){var i,a,u,l,c,f,h,p,g={},m=new o(function(t,e){return t._qrank-e._qrank});if(t.stamp)throw Error("Pulse already has a non-zero stamp.");for(t.stamp=n||++this._stamp,g[e._id]=t,m.push(e.qrank(!0));m.size()>0;)if(e=m.peek(),p=e instanceof d,t=g[e._id],e.rank()!==e.qrank())m.replace(e.qrank(!0));else if(m.pop(),g[e._id]=null,i=e._listeners,(!p||p&&!r)&&(t=this.evaluate(t,e)),t!==this.doNotPropagate)for(!t.reflow&&e.reflows()&&(t=s.create(t,!0)),f=0,h=i.length;f<h;++f)if(a=i[f],void 0!==(u=g[a._id])){if(null===u)throw Error("Already propagated to node.");if(u===t)continue;if(l=t.add.length||t.mod.length||t.rem.length,c=u.add.length||u.mod.length||u.rem.length,l&&c)throw Error("Multiple changeset pulses to same node");g[a._id]=l?t:u,g[a._id].reflow=t.reflow||u.reflow}else m.push(a.qrank(!0)),g[a._id]=t;return this.done(t)},h.done=function(t){a.debug(t,["bookkeeping"]);for(var e in t.data)this.data(e).synchronize();return this},h.preprocess=function(t){for(var e,n,r,i,a=this,o=0,s=0;s<t.length;++s)e=t[s],e.batch()&&!e._collector&&(n||!r?(e=new l(a),t.splice(s,0,e),n=!1):e._collector=r),(i=e.collector())&&(r=e),n=n||e.router()&&!i,o=o||e.mutates(),e.produces()&&(t.splice(s+1,0,new l(a)),n=!1);return{router:n,collector:r,mutates:o}},h.connect=function(t){var e,n,r,a,o,s,u,l,c,d;for(o=0,s=t.length;o<s;++o){for(n=t[o],n.collector()&&(e=n),r=n.dependency(f.DATA),u=0,l=r.length;u<l;++u){if(!(c=this.data(d=r[u])))throw new Error("Unknown data source "+i.str(d));c.addListener(e)}for(a=n.dependency(f.SIGNALS),u=0,l=a.length;u<l;++u){if(!(c=this.signal(d=a[u])))throw new Error("Unknown signal "+i.str(d));c.addListener(e)}o>0&&t[o-1].addListener(n)}return t},h.disconnect=function(t){var e,n,r,i,a,o,s,u;for(a=0,o=t.length;a<o;++a){for(n=t[a],n.collector()&&(e=n),r=n.dependency(f.DATA),s=0,u=r.length;s<u;++s)this.data(r[s]).removeListener(e);for(i=n.dependency(f.SIGNALS),s=0,u=i.length;s<u;++s)this.signal(i[s]).removeListener(e);n.disconnect()}return t},h.synchronize=function(t){var e,n,r,i,a,o,s,u,l={};for(r=0,i=t.length;r<i;++r)if(e=t[r],e.collector())for(a=0,n=e.data(),o=n.length;a<o;++a)u=(s=n[a])._id,l[u]||(c.prev_update(s),l[u]=1);return this},h.reevaluate=function(t,e){var n=t.reflow&&e.last()>=t.stamp,r=e.router()||t.add.length||t.rem.length;return r||!n||e.reevaluate(t)},h.evaluate=function(t,e){return this.reevaluate(t,e)?(t=e.evaluate(t),e.last(t.stamp),t):t},e.exports=r},{"./ChangeSet":32,"./Collector":33,"./DataSource":34,"./Dependencies":35,"./Heap":37,"./Signal":39,"./Tuple":40,datalib:26,"vega-logging":48}],37:[function(t,e,n){function r(t){this.cmp=t,this.nodes=[]}function i(t,e,n,r){var i,a,o;for(i=t[n];n>e&&(o=n-1>>1,a=t[o],r(i,a)<0);)t[n]=a,n=o;return t[n]=i}function a(t,e,n){for(var r,a=e,o=t.length,s=t[e],u=2*e+1;u<o;)r=u+1,r<o&&n(t[u],t[r])>=0&&(u=r),t[e]=t[u],e=u,u=2*e+1;return t[e]=s,i(t,a,e,n)}var o=r.prototype;o.size=function(){return this.nodes.length},o.clear=function(){return this.nodes=[],this},o.peek=function(){return this.nodes[0]},o.push=function(t){var e=this.nodes;return e.push(t),i(e,0,e.length-1,this.cmp)},o.pop=function(){var t,e=this.nodes,n=e.pop();return e.length?(t=e[0],e[0]=n,a(e,0,this.cmp)):t=n,t},o.replace=function(t){var e=this.nodes,n=e[0];return e[0]=t,a(e,0,this.cmp),n},o.pushpop=function(t){var e=this.nodes,n=e[0];return e.length&&this.cmp(n,t)<0&&(e[0]=t,t=n,a(e,0,this.cmp)),t},e.exports=r},{}],38:[function(t,e,n){function r(t){t&&this.init(t)}var i=t("./Dependencies").ALL,a=0,o=r.Flags={Router:1,Collector:2,Produces:4,Mutates:8,Reflows:16,Batch:32},s=r.prototype;s.init=function(t){this._id=++a,this._graph=t,this._rank=t.rank(),this._qrank=null,this._stamp=0,this._listeners=[],this._listeners._ids={},this._deps={};for(var e=0,n=i.length;e<n;++e)this._deps[i[e]]=[];return this._flags=0,this},s.rank=function(){return this._rank},s.rerank=function(){for(var t,e=this._graph,n=[this];n.length;)t=n.shift(),t._rank=e.rank(),n.unshift.apply(n,t.listeners());return this},s.qrank=function(){return arguments.length?(this._qrank=this._rank,this):this._qrank},s.last=function(t){return arguments.length?(this._stamp=t,this):this._stamp},s._setf=function(t,e){return e?this._flags|=t:this._flags&=~t,this},s.router=function(t){return arguments.length?this._setf(o.Router,t):this._flags&o.Router},s.collector=function(t){return arguments.length?this._setf(o.Collector,t):this._flags&o.Collector},s.produces=function(t){return arguments.length?this._setf(o.Produces,t):this._flags&o.Produces},s.mutates=function(t){return arguments.length?this._setf(o.Mutates,t):this._flags&o.Mutates},s.reflows=function(t){return arguments.length?this._setf(o.Reflows,t):this._flags&o.Reflows},s.batch=function(t){return arguments.length?this._setf(o.Batch,t):this._flags&o.Batch},s.dependency=function(t,e){var n=this._deps[t],r=n._names||(n._names={});if(1===arguments.length)return n;if(null===e)n.splice(0,n.length),n._names={};else if(Array.isArray(e))for(var i,a=0,o=e.length;a<o;++a)i=e[a],r[i]||(n.push(i),r[i]=1);else{if(r[e])return this;n.push(e),r[e]=1}return this},s.listeners=function(){return this._listeners},s.addListener=function(t){if(!(t instanceof r))throw Error("Listener is not a Node");return this._listeners._ids[t._id]?this:(this._listeners.push(t),this._listeners._ids[t._id]=1,this._rank>t._rank&&t.rerank(),this)},s.removeListener=function(t){if(!this._listeners._ids[t._id])return!1;var e=this._listeners.indexOf(t),n=e>=0;return n&&(this._listeners.splice(e,1),this._listeners._ids[t._id]=null),n},s.disconnect=function(){this._listeners=[],this._listeners._ids={}},s.evaluate=function(t){return t},s.reevaluate=function(t){var e,n,r,a,o,s;for(r=0,a=i.length;r<a;++r)for(e=i[r],n=this._deps[e],o=0,s=n.length;o<s;++o)if(t[e][n[o]])return!0;return!1},r.reset=function(){a=0},e.exports=r},{"./Dependencies":35}],39:[function(t,e,n){function r(t,e,n){return o.init.call(this,t),this._name=e,this._value=n,this._verbose=!1,this._handlers=[],this}var i=t("./ChangeSet"),a=t("./Node"),o=a.prototype,s=r.prototype=Object.create(o);s.constructor=r,s.name=function(){return this._name},s.value=function(t){return arguments.length?(this._value=t,this):this._value},s.values=s.value,s.verbose=function(t){return arguments.length?(this._verbose=!!t,this):this._verbose},s.evaluate=function(t){return t.signals[this._name]?t:this._graph.doNotPropagate},s.fire=function(t){t||(t=i.create(null,!0)),t.signals[this._name]=1,this._graph.propagate(t,this)},s.on=function(t){var e=this,n=new a(this._graph);return n.evaluate=function(n){return t(e.name(),e.value()),n},this._handlers.push({handler:t,
node:n}),this.addListener(n)},s.off=function(t){var e,n,r=this._handlers;for(e=r.length;--e>=0;)t&&r[e].handler!==t||(n=r.splice(e,1)[0],this.removeListener(n.node));return this},e.exports=r},{"./ChangeSet":32,"./Node":38}],40:[function(t,e,n){function r(t){return t=t===Object(t)?t:{data:t},t._id=++o,t._prev&&(t._prev=null),t}function i(t,e){e=e||{};for(var n=0,r=t.length;n<r;++n)e[t[n]._id]=1;return e}function a(t,e){e=e||{};for(var n in t)"_prev"!==n&&"_id"!==n&&(e[n]=t[n]);return e}var o=0;e.exports={ingest:r,idMap:i,derive:function(t){return r(a(t))},rederive:function(t,e){return a(t,e)},set:function(t,e,n){return t[e]===n?0:(t[e]=n,1)},prev:function(t){return t._prev||t},prev_init:function(t){t._prev||(t._prev={_id:t._id})},prev_update:function(t){var e,n,r=t._prev;if(r)for(e in t)"_prev"!==e&&"_id"!==e&&(r[e]=(n=t[e])instanceof Object&&n._prev?n._prev:n)},reset:function(){o=0},idFilter:function(t){for(var e={},n=arguments.length;--n>0;)i(arguments[n],e);return t.filter(function(t){return!e[t._id]})}}},{}],41:[function(t,e,n){e.exports={ChangeSet:t("./ChangeSet"),Collector:t("./Collector"),DataSource:t("./DataSource"),Dependencies:t("./Dependencies"),Graph:t("./Graph"),Node:t("./Node"),Signal:t("./Signal"),Tuple:t("./Tuple"),debug:t("vega-logging").debug}},{"./ChangeSet":32,"./Collector":33,"./DataSource":34,"./Dependencies":35,"./Graph":36,"./Node":38,"./Signal":39,"./Tuple":40,"vega-logging":48}],42:[function(t,e,n){e.exports=function(){"use strict";function t(t,e){function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n}function e(t,n,r,i){this.message=t,this.expected=n,this.found=r,this.location=i,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,e)}function n(t){function n(e){var n,r,i=pe[e];if(i)return i;for(n=e-1;!pe[n];)n--;for(i=pe[n],i={line:i.line,column:i.column,seenCR:i.seenCR};n<e;)r=t.charAt(n),"\n"===r?(i.seenCR||i.line++,i.column=1,i.seenCR=!1):"\r"===r||"\u2028"===r||"\u2029"===r?(i.line++,i.column=1,i.seenCR=!0):(i.column++,i.seenCR=!1),n++;return pe[e]=i,i}function r(t,e){var r=n(t),i=n(e);return{start:{offset:t,line:r.line,column:r.column},end:{offset:e,line:i.line,column:i.column}}}function i(t){fe<ge||(fe>ge&&(ge=fe,me=[]),me.push(t))}function a(t,n,r,i){function a(t){var e=1;for(t.sort(function(t,e){return t.description<e.description?-1:t.description>e.description?1:0});e<t.length;)t[e-1]===t[e]?t.splice(e,1):e++}function o(t,e){function n(t){function e(t){return t.charCodeAt(0).toString(16).toUpperCase()}return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(t){return"\\x0"+e(t)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(t){return"\\x"+e(t)}).replace(/[\u0100-\u0FFF]/g,function(t){return"\\u0"+e(t)}).replace(/[\u1000-\uFFFF]/g,function(t){return"\\u"+e(t)})}var r,i,a,o=new Array(t.length);for(a=0;a<t.length;a++)o[a]=t[a].description;return r=t.length>1?o.slice(0,-1).join(", ")+" or "+o[t.length-1]:o[0],i=e?'"'+n(e)+'"':"end of input","Expected "+r+" but "+i+" found."}return null!==n&&a(n),new e(null!==t?t:o(n,r),n,r,i)}function o(){var t;return t=s()}function s(){var e,n,r,a,o,l;return e=fe,n=u(),n!==b?(r=v(),r!==b?(44===t.charCodeAt(fe)?(a=k,fe++):(a=b,0===ve&&i(M)),a!==b?(o=v(),o!==b?(l=s(),l!==b?(he=e,n=S(n,l),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e===b&&(e=fe,n=u(),n!==b&&(he=e,n=T(n)),e=n),e}function u(){var e,n,r,a,o,s,c,d,f,h,p,g,m,y;return e=fe,91===t.charCodeAt(fe)?(n=E,fe++):(n=b,0===ve&&i(A)),n!==b?(r=v(),r!==b?(a=l(),a!==b?(o=v(),o!==b?(44===t.charCodeAt(fe)?(s=k,fe++):(s=b,0===ve&&i(M)),s!==b?(c=v(),c!==b?(d=l(),d!==b?(f=v(),f!==b?(93===t.charCodeAt(fe)?(h=L,fe++):(h=b,0===ve&&i(C)),h!==b?(p=v(),p!==b?(62===t.charCodeAt(fe)?(g=D,fe++):(g=b,0===ve&&i(P)),g!==b?(m=v(),m!==b?(y=u(),y!==b?(he=e,n=I(a,d,y),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e===b&&(e=l()),e}function l(){var t,e,n,r;if(t=fe,e=c(),e!==b){if(n=[],r=h(),r!==b)for(;r!==b;)n.push(r),r=h();else n=b;n!==b?(he=t,e=N(e,n),t=e):(fe=t,t=b)}else fe=t,t=b;return t===b&&(t=fe,e=c(),e!==b&&(he=t,e=O(e)),t=e),t}function c(){var e,n,r,a,o;return e=fe,40===t.charCodeAt(fe)?(n=z,fe++):(n=b,0===ve&&i(j)),n!==b?(r=s(),r!==b?(41===t.charCodeAt(fe)?(a=F,fe++):(a=b,0===ve&&i(U)),a!==b?(he=e,n=R(r),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e===b&&(e=fe,64===t.charCodeAt(fe)?(n=q,fe++):(n=b,0===ve&&i(B)),n!==b?(r=p(),r!==b?(58===t.charCodeAt(fe)?(a=G,fe++):(a=b,0===ve&&i($)),a!==b?(o=f(),o!==b?(he=e,n=H(r,o),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e===b&&(e=fe,n=d(),n!==b?(58===t.charCodeAt(fe)?(r=G,fe++):(r=b,0===ve&&i($)),r!==b?(a=f(),a!==b?(he=e,n=Y(n,a),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e===b&&(e=fe,n=g(),n!==b?(58===t.charCodeAt(fe)?(r=G,fe++):(r=b,0===ve&&i($)),r!==b?(a=f(),a!==b?(he=e,n=V(n,a),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e===b&&(e=fe,n=f(),n!==b&&(he=e,n=W(n)),e=n,e===b&&(e=fe,n=p(),n!==b&&(he=e,n=X(n)),e=n))))),e}function d(){var e;return t.substr(fe,4)===J?(e=J,fe+=4):(e=b,0===ve&&i(K)),e===b&&(t.substr(fe,6)===Z?(e=Z,fe+=6):(e=b,0===ve&&i(Q)),e===b&&(t.substr(fe,4)===tt?(e=tt,fe+=4):(e=b,0===ve&&i(et)),e===b&&(t.substr(fe,3)===nt?(e=nt,fe+=3):(e=b,0===ve&&i(rt)),e===b&&(t.substr(fe,4)===it?(e=it,fe+=4):(e=b,0===ve&&i(at)),e===b&&(t.substr(fe,4)===ot?(e=ot,fe+=4):(e=b,0===ve&&i(st)),e===b&&(t.substr(fe,4)===ut?(e=ut,fe+=4):(e=b,0===ve&&i(lt)),e===b&&(t.substr(fe,5)===ct?(e=ct,fe+=5):(e=b,0===ve&&i(dt)),e===b&&(t.substr(fe,4)===ft?(e=ft,fe+=4):(e=b,0===ve&&i(ht)),e===b&&(t.substr(fe,5)===pt?(e=pt,fe+=5):(e=b,0===ve&&i(gt))))))))))),e}function f(){var e;return t.substr(fe,9)===mt?(e=mt,fe+=9):(e=b,0===ve&&i(vt)),e===b&&(t.substr(fe,7)===yt?(e=yt,fe+=7):(e=b,0===ve&&i(_t)),e===b&&(t.substr(fe,5)===bt?(e=bt,fe+=5):(e=b,0===ve&&i(xt)),e===b&&(t.substr(fe,8)===wt?(e=wt,fe+=8):(e=b,0===ve&&i(kt)),e===b&&(t.substr(fe,5)===Mt?(e=Mt,fe+=5):(e=b,0===ve&&i(St)),e===b&&(t.substr(fe,7)===Tt?(e=Tt,fe+=7):(e=b,0===ve&&i(Et)),e===b&&(t.substr(fe,8)===At?(e=At,fe+=8):(e=b,0===ve&&i(Lt)),e===b&&(t.substr(fe,5)===Ct?(e=Ct,fe+=5):(e=b,0===ve&&i(Dt)),e===b&&(t.substr(fe,10)===Pt?(e=Pt,fe+=10):(e=b,0===ve&&i(It)),e===b&&(t.substr(fe,9)===Nt?(e=Nt,fe+=9):(e=b,0===ve&&i(Ot)),e===b&&(t.substr(fe,8)===zt?(e=zt,fe+=8):(e=b,0===ve&&i(jt)),e===b&&(t.substr(fe,9)===Ft?(e=Ft,fe+=9):(e=b,0===ve&&i(Ut)),e===b&&(t.substr(fe,10)===Rt?(e=Rt,fe+=10):(e=b,0===ve&&i(qt)),e===b&&(t.substr(fe,10)===Bt?(e=Bt,fe+=10):(e=b,0===ve&&i(Gt)),e===b&&(t.substr(fe,9)===$t?(e=$t,fe+=9):(e=b,0===ve&&i(Ht)),e===b&&(t.substr(fe,8)===Yt?(e=Yt,fe+=8):(e=b,0===ve&&i(Vt)),e===b&&(t.substr(fe,9)===Wt?(e=Wt,fe+=9):(e=b,0===ve&&i(Xt)),e===b&&(t.substr(fe,8)===Jt?(e=Jt,fe+=8):(e=b,0===ve&&i(Kt)),e===b&&(t.substr(fe,9)===Zt?(e=Zt,fe+=9):(e=b,0===ve&&i(Qt)))))))))))))))))))),e}function h(){var e,n,r,a;return e=fe,91===t.charCodeAt(fe)?(n=E,fe++):(n=b,0===ve&&i(A)),n!==b?(r=m(),r!==b?(93===t.charCodeAt(fe)?(a=L,fe++):(a=b,0===ve&&i(C)),a!==b?(he=e,n=te(r),e=n):(fe=e,e=b)):(fe=e,e=b)):(fe=e,e=b),e}function p(){var e,n,r;if(e=fe,n=[],ee.test(t.charAt(fe))?(r=t.charAt(fe),fe++):(r=b,0===ve&&i(ne)),r!==b)for(;r!==b;)n.push(r),ee.test(t.charAt(fe))?(r=t.charAt(fe),fe++):(r=b,0===ve&&i(ne));else n=b;return n!==b&&(he=e,n=re(n)),e=n}function g(){var e,n,r;if(e=fe,n=[],ie.test(t.charAt(fe))?(r=t.charAt(fe),fe++):(r=b,0===ve&&i(ae)),r!==b)for(;r!==b;)n.push(r),ie.test(t.charAt(fe))?(r=t.charAt(fe),fe++):(r=b,0===ve&&i(ae));else n=b;return n!==b&&(he=e,n=oe(n)),e=n}function m(){var e,n,r;if(e=fe,n=[],se.test(t.charAt(fe))?(r=t.charAt(fe),fe++):(r=b,0===ve&&i(ue)),r!==b)for(;r!==b;)n.push(r),se.test(t.charAt(fe))?(r=t.charAt(fe),fe++):(r=b,0===ve&&i(ue));else n=b;return n!==b&&(he=e,n=le(n)),e=n}function v(){var e,n;for(e=[],ce.test(t.charAt(fe))?(n=t.charAt(fe),fe++):(n=b,0===ve&&i(de));n!==b;)e.push(n),ce.test(t.charAt(fe))?(n=t.charAt(fe),fe++):(n=b,0===ve&&i(de));return e}var y,_=arguments.length>1?arguments[1]:{},b={},x={start:o},w=o,k=",",M={type:"literal",value:",",description:'","'},S=function(t,e){return[t].concat(e)},T=function(t){return[t]},E="[",A={type:"literal",value:"[",description:'"["'},L="]",C={type:"literal",value:"]",description:'"]"'},D=">",P={type:"literal",value:">",description:'">"'},I=function(t,e,n){return{start:t,middle:n,end:e,str:"["+t.str+", "+e.str+"] > "+n.str}},N=function(t,e){return t.filters=e,t.str+=e.map(function(t){return"["+t+"]"}).join(""),t},O=function(t){return t},z="(",j={type:"literal",value:"(",description:'"("'},F=")",U={type:"literal",value:")",description:'")"'},R=function(t){return{stream:t,str:"("+t.map(function(t){return t.str}).join(", ")+")"}},q="@",B={type:"literal",value:"@",description:'"@"'},G=":",$={type:"literal",value:":",description:'":"'},H=function(t,e){return{event:e,name:t,str:"@"+t+":"+e}},Y=function(t,e){return{event:e,mark:t,str:t+":"+e}},V=function(t,e){return{event:e,target:t,str:t+":"+e}},W=function(t){return{event:t,str:t}},X=function(t){return{signal:t,str:t}},J="rect",K={type:"literal",value:"rect",description:'"rect"'},Z="symbol",Q={type:"literal",value:"symbol",description:'"symbol"'},tt="path",et={type:"literal",value:"path",description:'"path"'},nt="arc",rt={type:"literal",value:"arc",description:'"arc"'},it="area",at={type:"literal",value:"area",description:'"area"'},ot="line",st={type:"literal",value:"line",description:'"line"'},ut="rule",lt={type:"literal",value:"rule",description:'"rule"'},ct="image",dt={type:"literal",value:"image",description:'"image"'},ft="text",ht={type:"literal",value:"text",description:'"text"'},pt="group",gt={type:"literal",value:"group",description:'"group"'},mt="mousedown",vt={type:"literal",value:"mousedown",description:'"mousedown"'},yt="mouseup",_t={type:"literal",value:"mouseup",description:'"mouseup"'},bt="click",xt={type:"literal",value:"click",description:'"click"'},wt="dblclick",kt={type:"literal",value:"dblclick",description:'"dblclick"'},Mt="wheel",St={type:"literal",value:"wheel",description:'"wheel"'},Tt="keydown",Et={type:"literal",value:"keydown",description:'"keydown"'},At="keypress",Lt={type:"literal",value:"keypress",description:'"keypress"'},Ct="keyup",Dt={type:"literal",value:"keyup",description:'"keyup"'},Pt="mousewheel",It={type:"literal",value:"mousewheel",description:'"mousewheel"'},Nt="mousemove",Ot={type:"literal",value:"mousemove",description:'"mousemove"'},zt="mouseout",jt={type:"literal",value:"mouseout",description:'"mouseout"'},Ft="mouseover",Ut={type:"literal",value:"mouseover",description:'"mouseover"'},Rt="mouseenter",qt={type:"literal",value:"mouseenter",description:'"mouseenter"'},Bt="touchstart",Gt={type:"literal",value:"touchstart",description:'"touchstart"'},$t="touchmove",Ht={type:"literal",value:"touchmove",description:'"touchmove"'},Yt="touchend",Vt={type:"literal",value:"touchend",description:'"touchend"'},Wt="dragenter",Xt={type:"literal",value:"dragenter",description:'"dragenter"'},Jt="dragover",Kt={type:"literal",value:"dragover",description:'"dragover"'},Zt="dragleave",Qt={type:"literal",value:"dragleave",description:'"dragleave"'},te=function(t){return t},ee=/^[a-zA-Z0-9_\-]/,ne={type:"class",value:"[a-zA-Z0-9_-]",description:"[a-zA-Z0-9_-]"},re=function(t){return t.join("")},ie=/^[a-zA-Z0-9\-_  #.>+~[\]=|\^$*]/,ae={type:"class",value:"[a-zA-Z0-9-_  #\\.\\>\\+~\\[\\]=|\\^\\$\\*]",description:"[a-zA-Z0-9-_  #\\.\\>\\+~\\[\\]=|\\^\\$\\*]"},oe=function(t){return t.join("")},se=/^['"a-zA-Z0-9_().><=! \t-&|~]/,ue={type:"class",value:"['\"a-zA-Z0-9_\\(\\)\\.\\>\\<\\=\\! \\t-&|~]",description:"['\"a-zA-Z0-9_\\(\\)\\.\\>\\<\\=\\! \\t-&|~]"},le=function(t){return t.join("")},ce=/^[ \t\r\n]/,de={type:"class",value:"[ \\t\\r\\n]",description:"[ \\t\\r\\n]"},fe=0,he=0,pe=[{line:1,column:1,seenCR:!1}],ge=0,me=[],ve=0;if("startRule"in _){if(!(_.startRule in x))throw new Error("Can't start parsing from rule \""+_.startRule+'".');w=x[_.startRule]}if(y=w(),y!==b&&fe===t.length)return y;throw y!==b&&fe<t.length&&i({type:"end",description:"end of input"}),a(null,me,ge<t.length?t.charAt(ge):null,ge<t.length?r(ge,ge+1):r(ge,ge))}return t(e,Error),{SyntaxError:e,parse:n}}()},{}],43:[function(t,e,n){function r(t){var e,n,r={};for(e=0,n=t.length;e<n;++e)r[t[e]]=1;return r}function i(t){var e,n=[];for(e in t)n.push(e);return n}e.exports=function(e){function n(t){var e={code:a(t),globals:i(p),fields:i(g),dataSources:i(m),defs:u};return p={},g={},m={},e}function a(t){if("string"==typeof t)return t;var e=y[t.type];if(null==e)throw new Error("Unsupported type: "+t.type);return e(t)}e=e||{};var o=e.constants||t("./constants"),s=(e.functions||t("./functions"))(a),u=e.functionDefs?e.functionDefs(a):{},l=e.idWhiteList?r(e.idWhiteList):null,c=e.idBlackList?r(e.idBlackList):null,d=0,f=e.fieldVar||"datum",h=e.globalVar||"signals",p={},g={},m={},v="function"==typeof h?h:function(t){return h+'["'+t+'"]'},y={Literal:function(t){return t.raw},Identifier:function(t){var e=t.name;if(d>0)return e;if(o.hasOwnProperty(e))return o[e];if(l)return l.hasOwnProperty(e)?e:(p[e]=1,v(e));if(c&&c.hasOwnProperty(e))throw new Error("Illegal identifier: "+e);return e},Program:function(t){return t.body.map(a).join("\n")},MemberExpression:function(t){var e=!t.computed,n=a(t.object);e&&(d+=1);var r=a(t.property);return n===f&&(g[r]=1),e&&(d-=1),n+(e?"."+r:"["+r+"]")},CallExpression:function(t){if("Identifier"!==t.callee.type)throw new Error("Illegal callee type: "+t.callee.type);var e=t.callee.name,n=t.arguments,r=s.hasOwnProperty(e)&&s[e];if(!r)throw new Error("Unrecognized function: "+e);return r instanceof Function?r(n,p,g,m):r+"("+n.map(a).join(",")+")"},ArrayExpression:function(t){return"["+t.elements.map(a).join(",")+"]"},BinaryExpression:function(t){return"("+a(t.left)+t.operator+a(t.right)+")"},UnaryExpression:function(t){return"("+t.operator+a(t.argument)+")"},ConditionalExpression:function(t){return"("+a(t.test)+"?"+a(t.consequent)+":"+a(t.alternate)+")"},LogicalExpression:function(t){return"("+a(t.left)+t.operator+a(t.right)+")"},ObjectExpression:function(t){return"{"+t.properties.map(a).join(",")+"}"},Property:function(t){d+=1;var e=a(t.key);return d-=1,e+":"+a(t.value)},ExpressionStatement:function(t){return a(t.expression)}};return n.functions=s,n.functionDefs=u,n.constants=o,n}},{"./constants":44,"./functions":45}],44:[function(t,e,n){e.exports={NaN:"NaN",E:"Math.E",LN2:"Math.LN2",LN10:"Math.LN10",LOG2E:"Math.LOG2E",LOG10E:"Math.LOG10E",PI:"Math.PI",SQRT1_2:"Math.SQRT1_2",SQRT2:"Math.SQRT2"}},{}],45:[function(t,e,n){e.exports=function(t){function e(e,n,r,i){var a=t(n[0]);return r&&(a=r+"("+a+")",0===r.lastIndexOf("new ",0)&&(a="("+a+")")),a+"."+e+(i<0?"":0===i?"()":"("+n.slice(1).map(t).join(",")+")")}function n(t,n,r){return function(i){return e(t,i,n,r)}}var r="new Date",i="String",a="RegExp";return{isNaN:"isNaN",isFinite:"isFinite",abs:"Math.abs",acos:"Math.acos",asin:"Math.asin",atan:"Math.atan",atan2:"Math.atan2",ceil:"Math.ceil",cos:"Math.cos",exp:"Math.exp",floor:"Math.floor",log:"Math.log",max:"Math.max",min:"Math.min",pow:"Math.pow",random:"Math.random",round:"Math.round",sin:"Math.sin",sqrt:"Math.sqrt",tan:"Math.tan",clamp:function(e){if(e.length<3)throw new Error("Missing arguments to clamp function.");if(e.length>3)throw new Error("Too many arguments to clamp function.");var n=e.map(t);return"Math.max("+n[1]+", Math.min("+n[2]+","+n[0]+"))"},now:"Date.now",utc:"Date.UTC",datetime:r,date:n("getDate",r,0),day:n("getDay",r,0),year:n("getFullYear",r,0),month:n("getMonth",r,0),hours:n("getHours",r,0),minutes:n("getMinutes",r,0),seconds:n("getSeconds",r,0),milliseconds:n("getMilliseconds",r,0),time:n("getTime",r,0),timezoneoffset:n("getTimezoneOffset",r,0),utcdate:n("getUTCDate",r,0),utcday:n("getUTCDay",r,0),utcyear:n("getUTCFullYear",r,0),utcmonth:n("getUTCMonth",r,0),utchours:n("getUTCHours",r,0),utcminutes:n("getUTCMinutes",r,0),utcseconds:n("getUTCSeconds",r,0),utcmilliseconds:n("getUTCMilliseconds",r,0),length:n("length",null,-1),indexof:n("indexOf",null),lastindexof:n("lastIndexOf",null),parseFloat:"parseFloat",parseInt:"parseInt",upper:n("toUpperCase",i,0),lower:n("toLowerCase",i,0),slice:n("slice",i),substring:n("substring",i),replace:n("replace",i),regexp:a,test:n("test",a),if:function(e){if(e.length<3)throw new Error("Missing arguments to if function.");if(e.length>3)throw new Error("Too many arguments to if function.");var n=e.map(t);return n[0]+"?"+n[1]+":"+n[2]}}}},{}],46:[function(t,e,n){var r=t("./parser"),i=t("./codegen"),a=e.exports={parse:function(t,e){return r.parse("("+t+")",e)},code:function(t){return i(t)},compiler:function(t,e){t=t.slice();var n=i(e),r=t.length,o=function(e){var i=n(a.parse(e));t[r]='"use strict"; return ('+i.code+");";var o=Function.apply(null,t);return i.fn=t.length>8?function(){return o.apply(i,arguments)}:function(t,e,n,r,a,s,u){return o.call(i,t,e,n,r,a,s,u)},i};return o.codegen=n,o},functions:t("./functions"),constants:t("./constants")}},{"./codegen":43,"./constants":44,"./functions":45,"./parser":47}],47:[function(t,e,n){e.exports=function(){"use strict";function t(t,e){if(!t)throw new Error("ASSERT: "+e)}function e(t){return t>=48&&t<=57}function n(t){return"0123456789abcdefABCDEF".indexOf(t)>=0}function r(t){return"01234567".indexOf(t)>=0}function i(t){return 32===t||9===t||11===t||12===t||160===t||t>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(t)>=0}function a(t){return 10===t||13===t||8232===t||8233===t}function o(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||92===t||t>=128&&Mt.NonAsciiIdentifierStart.test(String.fromCharCode(t))}function s(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||t>=48&&t<=57||92===t||t>=128&&Mt.NonAsciiIdentifierPart.test(String.fromCharCode(t))}function u(t){switch(t){case"class":case"enum":case"export":case"extends":case"import":case"super":return!0;default:return!1}}function l(t){switch(t){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0;default:return!1}}function c(t){if(Tt&&l(t))return!0;switch(t.length){case 2:return"if"===t||"in"===t||"do"===t;case 3:return"var"===t||"for"===t||"new"===t||"try"===t||"let"===t;case 4:return"this"===t||"else"===t||"case"===t||"void"===t||"with"===t||"enum"===t;case 5:return"while"===t||"break"===t||"catch"===t||"throw"===t||"const"===t||"yield"===t||"class"===t||"super"===t;case 6:return"return"===t||"typeof"===t||"delete"===t||"switch"===t||"export"===t||"import"===t;case 7:return"default"===t||"finally"===t||"extends"===t;case 8:return"function"===t||"continue"===t||"debugger"===t;case 10:return"instanceof"===t;default:return!1}}function d(){var t,e;for(e=0===Et;Et<Ct;)if(t=St.charCodeAt(Et),i(t))++Et;else{if(!a(t))break;++Et,13===t&&10===St.charCodeAt(Et)&&++Et,++At,Lt=Et,e=!0}}function f(t){var e,r,i,a=0;for(r="u"===t?4:2,e=0;e<r;++e){if(!(Et<Ct&&n(St[Et])))return"";i=St[Et++],a=16*a+"0123456789abcdef".indexOf(i.toLowerCase())}return String.fromCharCode(a)}function h(){var t,e,r,i;for(t=St[Et],e=0,"}"===t&&U({},kt.UnexpectedToken,"ILLEGAL");Et<Ct&&(t=St[Et++],n(t));)e=16*e+"0123456789abcdef".indexOf(t.toLowerCase());return(e>1114111||"}"!==t)&&U({},kt.UnexpectedToken,"ILLEGAL"),e<=65535?String.fromCharCode(e):(r=(e-65536>>10)+55296,i=(e-65536&1023)+56320,String.fromCharCode(r,i))}function p(){var t,e;for(t=St.charCodeAt(Et++),e=String.fromCharCode(t),92===t&&(117!==St.charCodeAt(Et)&&U({},kt.UnexpectedToken,"ILLEGAL"),++Et,t=f("u"),t&&"\\"!==t&&o(t.charCodeAt(0))||U({},kt.UnexpectedToken,"ILLEGAL"),e=t);Et<Ct&&(t=St.charCodeAt(Et),s(t));)++Et,e+=String.fromCharCode(t),92===t&&(e=e.substr(0,e.length-1),117!==St.charCodeAt(Et)&&U({},kt.UnexpectedToken,"ILLEGAL"),++Et,t=f("u"),t&&"\\"!==t&&s(t.charCodeAt(0))||U({},kt.UnexpectedToken,"ILLEGAL"),e+=t);return e}function g(){var t,e;for(t=Et++;Et<Ct;){if(e=St.charCodeAt(Et),92===e)return Et=t,p();if(!s(e))break;++Et}return St.slice(t,Et)}function m(){var t,e,n;return t=Et,e=92===St.charCodeAt(Et)?p():g(),n=1===e.length?_t.Identifier:c(e)?_t.Keyword:"null"===e?_t.NullLiteral:"true"===e||"false"===e?_t.BooleanLiteral:_t.Identifier,{type:n,value:e,lineNumber:At,lineStart:Lt,start:t,end:Et}}function v(){var t,e,n,r,i=Et,a=St.charCodeAt(Et),o=St[Et];switch(a){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++Et,It.tokenize&&(40===a?It.openParenToken=It.tokens.length:123===a&&(It.openCurlyToken=It.tokens.length)),{type:_t.Punctuator,value:String.fromCharCode(a),lineNumber:At,lineStart:Lt,start:i,end:Et};default:if(t=St.charCodeAt(Et+1),61===t)switch(a){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return Et+=2,{type:_t.Punctuator,value:String.fromCharCode(a)+String.fromCharCode(t),lineNumber:At,lineStart:Lt,start:i,end:Et};case 33:case 61:return Et+=2,61===St.charCodeAt(Et)&&++Et,{type:_t.Punctuator,value:St.slice(i,Et),lineNumber:At,lineStart:Lt,start:i,end:Et}}}return r=St.substr(Et,4),">>>="===r?(Et+=4,{type:_t.Punctuator,value:r,lineNumber:At,lineStart:Lt,start:i,end:Et}):(n=r.substr(0,3),">>>"===n||"<<="===n||">>="===n?(Et+=3,{type:_t.Punctuator,value:n,lineNumber:At,lineStart:Lt,start:i,end:Et}):(e=n.substr(0,2),o===e[1]&&"+-<>&|".indexOf(o)>=0||"=>"===e?(Et+=2,{type:_t.Punctuator,value:e,lineNumber:At,lineStart:Lt,start:i,end:Et}):"<>=!+-*%&|^/".indexOf(o)>=0?(++Et,{type:_t.Punctuator,value:o,lineNumber:At,lineStart:Lt,start:i,end:Et}):void U({},kt.UnexpectedToken,"ILLEGAL")))}function y(t){for(var e="";Et<Ct&&n(St[Et]);)e+=St[Et++];return 0===e.length&&U({},kt.UnexpectedToken,"ILLEGAL"),o(St.charCodeAt(Et))&&U({},kt.UnexpectedToken,"ILLEGAL"),{type:_t.NumericLiteral,value:parseInt("0x"+e,16),lineNumber:At,lineStart:Lt,start:t,end:Et}}function _(t){for(var n="0"+St[Et++];Et<Ct&&r(St[Et]);)n+=St[Et++];return(o(St.charCodeAt(Et))||e(St.charCodeAt(Et)))&&U({},kt.UnexpectedToken,"ILLEGAL"),{type:_t.NumericLiteral,value:parseInt(n,8),octal:!0,lineNumber:At,lineStart:Lt,start:t,end:Et}}function b(){var n,i,a;if(a=St[Et],t(e(a.charCodeAt(0))||"."===a,"Numeric literal must start with a decimal digit or a decimal point"),i=Et,n="","."!==a){if(n=St[Et++],a=St[Et],"0"===n){if("x"===a||"X"===a)return++Et,y(i);if(r(a))return _(i);a&&e(a.charCodeAt(0))&&U({},kt.UnexpectedToken,"ILLEGAL")}for(;e(St.charCodeAt(Et));)n+=St[Et++];a=St[Et]}if("."===a){for(n+=St[Et++];e(St.charCodeAt(Et));)n+=St[Et++];a=St[Et]}if("e"===a||"E"===a)if(n+=St[Et++],a=St[Et],"+"!==a&&"-"!==a||(n+=St[Et++]),e(St.charCodeAt(Et)))for(;e(St.charCodeAt(Et));)n+=St[Et++];else U({},kt.UnexpectedToken,"ILLEGAL");return o(St.charCodeAt(Et))&&U({},kt.UnexpectedToken,"ILLEGAL"),{type:_t.NumericLiteral,value:parseFloat(n),lineNumber:At,lineStart:Lt,start:i,end:Et}}function x(){var e,n,i,o,s,u,l,c,d="",p=!1;for(l=At,c=Lt,e=St[Et],t("'"===e||'"'===e,"String literal must starts with a quote"),n=Et,++Et;Et<Ct;){if(i=St[Et++],i===e){e="";break}if("\\"===i)if(i=St[Et++],i&&a(i.charCodeAt(0)))++At,"\r"===i&&"\n"===St[Et]&&++Et,Lt=Et;else switch(i){case"u":case"x":"{"===St[Et]?(++Et,d+=h()):(u=Et,s=f(i),s?d+=s:(Et=u,d+=i));break;case"n":d+="\n";break;case"r":d+="\r";break;case"t":d+="\t";break;case"b":d+="\b";break;case"f":d+="\f";break;case"v":d+="\v";break;default:r(i)?(o="01234567".indexOf(i),0!==o&&(p=!0),Et<Ct&&r(St[Et])&&(p=!0,o=8*o+"01234567".indexOf(St[Et++]),"0123".indexOf(i)>=0&&Et<Ct&&r(St[Et])&&(o=8*o+"01234567".indexOf(St[Et++]))),d+=String.fromCharCode(o)):d+=i}else{if(a(i.charCodeAt(0)))break;d+=i}}return""!==e&&U({},kt.UnexpectedToken,"ILLEGAL"),{type:_t.StringLiteral,value:d,octal:p,startLineNumber:l,startLineStart:c,lineNumber:At,lineStart:Lt,start:n,end:Et}}function w(t,e){var n,r=t;e.indexOf("u")>=0&&(r=r.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(t,e){return parseInt(e,16)<=1114111?"x":void U({},kt.InvalidRegExp)}).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"));try{n=new RegExp(r)}catch(t){U({},kt.InvalidRegExp)}try{return new RegExp(t,e)}catch(t){return null}}function k(){var e,n,r,i,o;for(e=St[Et],t("/"===e,"Regular expression literal must start with a slash"),n=St[Et++],r=!1,i=!1;Et<Ct;)if(e=St[Et++],n+=e,"\\"===e)e=St[Et++],a(e.charCodeAt(0))&&U({},kt.UnterminatedRegExp),n+=e;else if(a(e.charCodeAt(0)))U({},kt.UnterminatedRegExp);else if(r)"]"===e&&(r=!1);else{if("/"===e){i=!0;break}"["===e&&(r=!0)}return i||U({},kt.UnterminatedRegExp),o=n.substr(1,n.length-2),{value:o,literal:n}}function M(){var t,e,n,r;for(e="",n="";Et<Ct&&(t=St[Et],s(t.charCodeAt(0)));)if(++Et,"\\"===t&&Et<Ct)if(t=St[Et],"u"===t){if(++Et,r=Et,t=f("u"))for(n+=t,e+="\\u";r<Et;++r)e+=St[r];else Et=r,n+="u",e+="\\u";R({},kt.UnexpectedToken,"ILLEGAL")}else e+="\\",R({},kt.UnexpectedToken,"ILLEGAL");else n+=t,e+=t;return{value:n,literal:e}}function S(){var t,e,n,r;return Dt=null,d(),t=Et,e=k(),n=M(),r=w(e.value,n.value),It.tokenize?{type:_t.RegularExpression,value:r,regex:{pattern:e.value,flags:n.value},lineNumber:At,lineStart:Lt,start:t,end:Et}:{literal:e.literal+n.literal,value:r,regex:{pattern:e.value,flags:n.value},start:t,end:Et}}function T(){var t,e,n,r;return d(),t=Et,e={start:{line:At,column:Et-Lt}},n=S(),e.end={line:At,column:Et-Lt},It.tokenize||(It.tokens.length>0&&(r=It.tokens[It.tokens.length-1],r.range[0]===t&&"Punctuator"===r.type&&("/"!==r.value&&"/="!==r.value||It.tokens.pop())),It.tokens.push({type:"RegularExpression",value:n.literal,regex:n.regex,range:[t,Et],loc:e})),n}function E(t){return t.type===_t.Identifier||t.type===_t.Keyword||t.type===_t.BooleanLiteral||t.type===_t.NullLiteral}function A(){var t,e;if(t=It.tokens[It.tokens.length-1],!t)return T();if("Punctuator"===t.type){if("]"===t.value)return v();if(")"===t.value)return e=It.tokens[It.openParenToken-1],!e||"Keyword"!==e.type||"if"!==e.value&&"while"!==e.value&&"for"!==e.value&&"with"!==e.value?v():T();if("}"===t.value){if(It.tokens[It.openCurlyToken-3]&&"Keyword"===It.tokens[It.openCurlyToken-3].type){if(e=It.tokens[It.openCurlyToken-4],!e)return v()}else{if(!It.tokens[It.openCurlyToken-4]||"Keyword"!==It.tokens[It.openCurlyToken-4].type)return v();if(e=It.tokens[It.openCurlyToken-5],!e)return T()}return v()}return T()}return"Keyword"===t.type&&"this"!==t.value?T():v()}function L(){var t;return d(),Et>=Ct?{type:_t.EOF,lineNumber:At,lineStart:Lt,start:Et,end:Et}:(t=St.charCodeAt(Et),o(t)?m():40===t||41===t||59===t?v():39===t||34===t?x():46===t?e(St.charCodeAt(Et+1))?b():v():e(t)?b():It.tokenize&&47===t?A():v())}function C(){var t,e,n,r;return d(),t={start:{line:At,column:Et-Lt}},e=L(),t.end={line:At,column:Et-Lt},e.type!==_t.EOF&&(n=St.slice(e.start,e.end),r={type:bt[e.type],value:n,range:[e.start,e.end],loc:t},e.regex&&(r.regex={pattern:e.regex.pattern,flags:e.regex.flags}),It.tokens.push(r)),e}function D(){var t;return t=Dt,Et=t.end,At=t.lineNumber,Lt=t.lineStart,Dt="undefined"!=typeof It.tokens?C():L(),Et=t.end,At=t.lineNumber,Lt=t.lineStart,t}function P(){var t,e,n;t=Et,e=At,n=Lt,Dt="undefined"!=typeof It.tokens?C():L(),Et=t,At=e,Lt=n}function I(){this.line=At,this.column=Et-Lt}function N(){this.start=new I,this.end=null}function O(t){t.type===_t.StringLiteral?this.start={line:t.startLineNumber,column:t.start-t.startLineStart}:this.start={line:t.lineNumber,column:t.start-t.lineStart},this.end=null}function z(){Et=Dt.start,Dt.type===_t.StringLiteral?(At=Dt.startLineNumber,Lt=Dt.startLineStart):(At=Dt.lineNumber,Lt=Dt.lineStart),It.range&&(this.range=[Et,0]),It.loc&&(this.loc=new N)}function j(t){It.range&&(this.range=[t.start,0]),It.loc&&(this.loc=new O(t))}function F(){var t,e,n,r;return t=Et,e=At,n=Lt,d(),r=At!==e,Et=t,At=e,Lt=n,r}function U(e,n){var r,i=Array.prototype.slice.call(arguments,2),a=n.replace(/%(\d)/g,function(e,n){return t(n<i.length,"Message reference must be in range"),i[n]});throw"number"==typeof e.lineNumber?(r=new Error("Line "+e.lineNumber+": "+a),r.index=e.start,r.lineNumber=e.lineNumber,r.column=e.start-Lt+1):(r=new Error("Line "+At+": "+a),r.index=Et,r.lineNumber=At,r.column=Et-Lt+1),r.description=a,r}function R(){try{U.apply(null,arguments)}catch(t){if(!It.errors)throw t;It.errors.push(t)}}function q(t){if(t.type===_t.EOF&&U(t,kt.UnexpectedEOS),t.type===_t.NumericLiteral&&U(t,kt.UnexpectedNumber),t.type===_t.StringLiteral&&U(t,kt.UnexpectedString),t.type===_t.Identifier&&U(t,kt.UnexpectedIdentifier),t.type===_t.Keyword){if(u(t.value))U(t,kt.UnexpectedReserved);else if(Tt&&l(t.value))return void R(t,kt.StrictReservedWord);U(t,kt.UnexpectedToken,t.value)}U(t,kt.UnexpectedToken,t.value)}function B(t){var e=D();e.type===_t.Punctuator&&e.value===t||q(e)}function G(t){if(It.errors){var e=Dt;e.type!==_t.Punctuator&&e.value!==t?R(e,kt.UnexpectedToken,e.value):D()}else B(t)}function $(t){return Dt.type===_t.Punctuator&&Dt.value===t}function H(t){return Dt.type===_t.Keyword&&Dt.value===t}function Y(){var t;return 59===St.charCodeAt(Et)||$(";")?void D():(t=At,d(),void(At===t&&(Dt.type===_t.EOF||$("}")||q(Dt))))}function V(){var t=[],e=new z;for(B("[");!$("]");)$(",")?(D(),t.push(null)):(t.push(lt()),$("]")||B(","));return D(),e.finishArrayExpression(t)}function W(){var t,e=new z;return t=D(),t.type===_t.StringLiteral||t.type===_t.NumericLiteral?(Tt&&t.octal&&R(t,kt.StrictOctalLiteral),e.finishLiteral(t)):e.finishIdentifier(t.value)}function X(){var t,e,n,r,i=new z;return t=Dt,t.type===_t.Identifier?(n=W(),B(":"),r=lt(),i.finishProperty("init",n,r)):t.type!==_t.EOF&&t.type!==_t.Punctuator?(e=W(),B(":"),r=lt(),i.finishProperty("init",e,r)):void q(t)}function J(){var t,e,n,r,i=[],a={},o=String,s=new z;for(B("{");!$("}");)t=X(),e=t.key.type===xt.Identifier?t.key.name:o(t.key.value),r="init"===t.kind?wt.Data:"get"===t.kind?wt.Get:wt.Set,n="$"+e,Object.prototype.hasOwnProperty.call(a,n)?(a[n]===wt.Data?Tt&&r===wt.Data?R({},kt.StrictDuplicateProperty):r!==wt.Data&&R({},kt.AccessorDataProperty):r===wt.Data?R({},kt.AccessorDataProperty):a[n]&r&&R({},kt.AccessorGetSet),a[n]|=r):a[n]=r,i.push(t),$("}")||G(",");return B("}"),s.finishObjectExpression(i)}function K(){var t;return B("("),++Pt.parenthesisCount,t=ct(),B(")"),t}function Z(){var t,e,n,r;if($("("))return K();if($("["))return V();if($("{"))return J();if(t=Dt.type,r=new z,t===_t.Identifier||Nt[Dt.value])n=r.finishIdentifier(D().value);else if(t===_t.StringLiteral||t===_t.NumericLiteral)Tt&&Dt.octal&&R(Dt,kt.StrictOctalLiteral),n=r.finishLiteral(D());else{if(t===_t.Keyword)throw new Error("Disabled.");t===_t.BooleanLiteral?(e=D(),e.value="true"===e.value,n=r.finishLiteral(e)):t===_t.NullLiteral?(e=D(),e.value=null,n=r.finishLiteral(e)):$("/")||$("/=")?(n="undefined"!=typeof It.tokens?r.finishLiteral(T()):r.finishLiteral(S()),P()):q(D())}return n}function Q(){var t=[];if(B("("),!$(")"))for(;Et<Ct&&(t.push(lt()),!$(")"));)G(",");return B(")"),t}function tt(){var t,e=new z;return t=D(),E(t)||q(t),e.finishIdentifier(t.value)}function et(){return B("."),tt()}function nt(){var t;return B("["),t=ct(),B("]"),t}function rt(){var t,e,n,r,i=Pt.allowIn;for(r=Dt,Pt.allowIn=!0,t=Z();;)if($("."))n=et(),t=new j(r).finishMemberExpression(".",t,n);else if($("("))e=Q(),t=new j(r).finishCallExpression(t,e);else{if(!$("["))break;n=nt(),t=new j(r).finishMemberExpression("[",t,n)}return Pt.allowIn=i,t}function it(){var t=rt();if(Dt.type===_t.Punctuator&&($("++")||$("--"))&&!F())throw new Error("Disabled.");return t}function at(){var t,e,n;if(Dt.type!==_t.Punctuator&&Dt.type!==_t.Keyword)e=it();else{if($("++")||$("--"))throw new Error("Disabled.");if($("+")||$("-")||$("~")||$("!"))n=Dt,t=D(),e=at(),e=new j(n).finishUnaryExpression(t.value,e);else{if(H("delete")||H("void")||H("typeof"))throw new Error("Disabled.");e=it()}}return e}function ot(t,e){var n=0;if(t.type!==_t.Punctuator&&t.type!==_t.Keyword)return 0;switch(t.value){case"||":n=1;break;case"&&":n=2;break;case"|":n=3;break;case"^":n=4;break;case"&":n=5;break;case"==":
case"!=":case"===":case"!==":n=6;break;case"<":case">":case"<=":case">=":case"instanceof":n=7;break;case"in":n=e?7:0;break;case"<<":case">>":case">>>":n=8;break;case"+":case"-":n=9;break;case"*":case"/":case"%":n=11}return n}function st(){var t,e,n,r,i,a,o,s,u,l;if(t=Dt,u=at(),r=Dt,i=ot(r,Pt.allowIn),0===i)return u;for(r.prec=i,D(),e=[t,Dt],o=at(),a=[u,r,o];(i=ot(Dt,Pt.allowIn))>0;){for(;a.length>2&&i<=a[a.length-2].prec;)o=a.pop(),s=a.pop().value,u=a.pop(),e.pop(),n=new j(e[e.length-1]).finishBinaryExpression(s,u,o),a.push(n);r=D(),r.prec=i,a.push(r),e.push(Dt),n=at(),a.push(n)}for(l=a.length-1,n=a[l],e.pop();l>1;)n=new j(e.pop()).finishBinaryExpression(a[l-1].value,a[l-2],n),l-=2;return n}function ut(){var t,e,n,r,i;return i=Dt,t=st(),$("?")&&(D(),e=Pt.allowIn,Pt.allowIn=!0,n=lt(),Pt.allowIn=e,B(":"),r=lt(),t=new j(i).finishConditionalExpression(t,n,r)),t}function lt(){var t,e,n,r;return t=Pt.parenthesisCount,r=Dt,e=Dt,n=ut()}function ct(){var t=lt();if($(","))throw new Error("Disabled.");return t}function dt(t){var e=ct();return Y(),t.finishExpressionStatement(e)}function ft(){var t,e,n=Dt.type;if(n===_t.EOF&&q(Dt),n===_t.Punctuator&&"{"===Dt.value)throw new Error("Disabled.");if(e=new z,n===_t.Punctuator)switch(Dt.value){case";":throw new Error("Disabled.");case"(":return dt(e)}else if(n===_t.Keyword)throw new Error("Disabled.");return t=ct(),Y(),e.finishExpressionStatement(t)}function ht(){if(Dt.type===_t.Keyword)switch(Dt.value){case"const":case"let":throw new Error("Disabled.");case"function":throw new Error("Disabled.");default:return ft()}if(Dt.type!==_t.EOF)return ft()}function pt(){for(var t,e,n,r,i=[];Et<Ct&&(e=Dt,e.type===_t.StringLiteral)&&(t=ht(),i.push(t),t.expression.type===xt.Literal);)n=St.slice(e.start+1,e.end-1),"use strict"===n?(Tt=!0,r&&R(r,kt.StrictOctalLiteral)):!r&&e.octal&&(r=e);for(;Et<Ct&&(t=ht(),"undefined"!=typeof t);)i.push(t);return i}function gt(){var t,e;return d(),P(),e=new z,Tt=!0,t=pt(),e.finishProgram(t)}function mt(){var t,e,n,r=[];for(t=0;t<It.tokens.length;++t)e=It.tokens[t],n={type:e.type,value:e.value},e.regex&&(n.regex={pattern:e.regex.pattern,flags:e.regex.flags}),It.range&&(n.range=e.range),It.loc&&(n.loc=e.loc),r.push(n);It.tokens=r}function vt(t,e){var n,r;n=String,"string"==typeof t||t instanceof String||(t=n(t)),St=t,Et=0,At=St.length>0?1:0,Lt=0,Ct=St.length,Dt=null,Pt={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},It={},e=e||{},e.tokens=!0,It.tokens=[],It.tokenize=!0,It.openParenToken=-1,It.openCurlyToken=-1,It.range="boolean"==typeof e.range&&e.range,It.loc="boolean"==typeof e.loc&&e.loc,"boolean"==typeof e.tolerant&&e.tolerant&&(It.errors=[]);try{if(P(),Dt.type===_t.EOF)return It.tokens;for(D();Dt.type!==_t.EOF;)try{D()}catch(t){if(It.errors){It.errors.push(t);break}throw t}mt(),r=It.tokens,"undefined"!=typeof It.errors&&(r.errors=It.errors)}catch(t){throw t}finally{It={}}return r}function yt(t,e){var n,r;r=String,"string"==typeof t||t instanceof String||(t=r(t)),St=t,Et=0,At=St.length>0?1:0,Lt=0,Ct=St.length,Dt=null,Pt={allowIn:!0,labelSet:{},parenthesisCount:0,inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},It={},"undefined"!=typeof e&&(It.range="boolean"==typeof e.range&&e.range,It.loc="boolean"==typeof e.loc&&e.loc,It.loc&&null!==e.source&&void 0!==e.source&&(It.source=r(e.source)),"boolean"==typeof e.tokens&&e.tokens&&(It.tokens=[]),"boolean"==typeof e.tolerant&&e.tolerant&&(It.errors=[]));try{n=gt(),"undefined"!=typeof It.tokens&&(mt(),n.tokens=It.tokens),"undefined"!=typeof It.errors&&(n.errors=It.errors)}catch(t){throw t}finally{It={}}return n}var _t,bt,xt,wt,kt,Mt,St,Tt,Et,At,Lt,Ct,Dt,Pt,It;_t={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9},bt={},bt[_t.BooleanLiteral]="Boolean",bt[_t.EOF]="<end>",bt[_t.Identifier]="Identifier",bt[_t.Keyword]="Keyword",bt[_t.NullLiteral]="Null",bt[_t.NumericLiteral]="Numeric",bt[_t.Punctuator]="Punctuator",bt[_t.StringLiteral]="String",bt[_t.RegularExpression]="RegularExpression",xt={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",BinaryExpression:"BinaryExpression",CallExpression:"CallExpression",ConditionalExpression:"ConditionalExpression",ExpressionStatement:"ExpressionStatement",Identifier:"Identifier",Literal:"Literal",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",UnaryExpression:"UnaryExpression"},wt={Data:1,Get:2,Set:4},kt={UnexpectedToken:"Unexpected token %0",UnexpectedNumber:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression",UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictDuplicateProperty:"Duplicate data property in object literal not allowed in strict mode",AccessorDataProperty:"Object literal may not have data and accessor property with the same name",AccessorGetSet:"Object literal may not have multiple get/set accessors with the same name",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictReservedWord:"Use of future reserved word in strict mode"},Mt={NonAsciiIdentifierStart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),NonAsciiIdentifierPart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԯԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠ-ࢲࣤ-ॣ०-९ॱ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಁ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟ෦-෯ෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧ᪰-᪽ᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶ᳸᳹ᴀ-᷵᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚝꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꧠ-ꧾꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︭︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")},j.prototype=z.prototype={finish:function(){It.range&&(this.range[1]=Et),It.loc&&(this.loc.end=new I,It.source&&(this.loc.source=It.source))},finishArrayExpression:function(t){return this.type=xt.ArrayExpression,this.elements=t,this.finish(),this},finishAssignmentExpression:function(t,e,n){return this.type=xt.AssignmentExpression,this.operator=t,this.left=e,this.right=n,this.finish(),this},finishBinaryExpression:function(t,e,n){return this.type="||"===t||"&&"===t?xt.LogicalExpression:xt.BinaryExpression,this.operator=t,this.left=e,this.right=n,this.finish(),this},finishCallExpression:function(t,e){return this.type=xt.CallExpression,this.callee=t,this.arguments=e,this.finish(),this},finishConditionalExpression:function(t,e,n){return this.type=xt.ConditionalExpression,this.test=t,this.consequent=e,this.alternate=n,this.finish(),this},finishExpressionStatement:function(t){return this.type=xt.ExpressionStatement,this.expression=t,this.finish(),this},finishIdentifier:function(t){return this.type=xt.Identifier,this.name=t,this.finish(),this},finishLiteral:function(t){return this.type=xt.Literal,this.value=t.value,this.raw=St.slice(t.start,t.end),t.regex&&("//"==this.raw&&(this.raw="/(?:)/"),this.regex=t.regex),this.finish(),this},finishMemberExpression:function(t,e,n){return this.type=xt.MemberExpression,this.computed="["===t,this.object=e,this.property=n,this.finish(),this},finishObjectExpression:function(t){return this.type=xt.ObjectExpression,this.properties=t,this.finish(),this},finishProgram:function(t){return this.type=xt.Program,this.body=t,this.finish(),this},finishProperty:function(t,e,n){return this.type=xt.Property,this.key=e,this.value=n,this.kind=t,this.finish(),this},finishUnaryExpression:function(t,e){return this.type=xt.UnaryExpression,this.operator=t,this.argument=e,this.prefix=!0,this.finish(),this}};var Nt={if:1,this:1};return{tokenize:vt,parse:yt}}()},{}],48:[function(t,e,n){function r(t){console.log("[Vega Log]",t)}function i(t){console.error("[Vega Err]",t)}function a(t,e){if(a.enable){var n=Function.prototype.bind.call(console.log,console),r={prevTime:Date.now()-o,stamp:t.stamp};t.add&&(r.add=t.add.length,r.mod=t.mod.length,r.rem=t.rem.length,r.reflow=!!t.reflow),n.apply(console,(e.push(JSON.stringify(r)),e)),o=Date.now()}}var o=Date.now();e.exports={log:r,error:i,debug:(a.enable=!1,a)}},{}],49:[function(t,e,n){e.exports={path:t("./path"),render:t("./render"),Item:t("./util/Item"),bound:t("./util/bound"),Bounds:t("./util/Bounds"),canvas:t("./util/canvas"),Gradient:t("./util/Gradient"),toJSON:t("./util/scene").toJSON,fromJSON:t("./util/scene").fromJSON}},{"./path":51,"./render":71,"./util/Bounds":77,"./util/Gradient":79,"./util/Item":81,"./util/bound":82,"./util/canvas":83,"./util/scene":85}],50:[function(t,e,n){function r(t,e,n,r,i,o,u,l,c){var d=s.call(arguments);if(a[d])return a[d];var f=u*(Math.PI/180),h=Math.sin(f),p=Math.cos(f);n=Math.abs(n),r=Math.abs(r);var g=p*(l-t)*.5+h*(c-e)*.5,m=p*(c-e)*.5-h*(l-t)*.5,v=g*g/(n*n)+m*m/(r*r);v>1&&(v=Math.sqrt(v),n*=v,r*=v);var y=p/n,_=h/n,b=-h/r,x=p/r,w=y*l+_*c,k=b*l+x*c,M=y*t+_*e,S=b*t+x*e,T=(M-w)*(M-w)+(S-k)*(S-k),E=1/T-.25;E<0&&(E=0);var A=Math.sqrt(E);o==i&&(A=-A);var L=.5*(w+M)-A*(S-k),C=.5*(k+S)+A*(M-w),D=Math.atan2(k-C,w-L),P=Math.atan2(S-C,M-L),I=P-D;I<0&&1===o?I+=2*Math.PI:I>0&&0===o&&(I-=2*Math.PI);for(var N=Math.ceil(Math.abs(I/(.5*Math.PI+.001))),O=[],z=0;z<N;++z){var j=D+z*I/N,F=D+(z+1)*I/N;O[z]=[L,C,j,F,n,r,h,p]}return a[d]=O}function i(t){var e=s.call(t);if(o[e])return o[e];var n=t[0],r=t[1],i=t[2],a=t[3],u=t[4],l=t[5],c=t[6],d=t[7],f=d*u,h=-c*l,p=c*u,g=d*l,m=Math.cos(i),v=Math.sin(i),y=Math.cos(a),_=Math.sin(a),b=.5*(a-i),x=Math.sin(.5*b),w=8/3*x*x/Math.sin(b),k=n+m-w*v,M=r+v+w*m,S=n+y,T=r+_,E=S+w*_,A=T-w*y;return o[e]=[f*k+h*M,p*k+g*M,f*E+h*A,p*E+g*A,f*S+h*T,p*S+g*T]}var a={},o={},s=[].join;e.exports={segments:r,bezier:i,cache:{segments:a,bezier:o}}},{}],51:[function(t,e,n){e.exports={parse:t("./parse"),render:t("./render")}},{"./parse":52,"./render":53}],52:[function(t,e,n){var r={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},i=[/([MLHVCSQTAZmlhvcsqtaz])/g,/###/,/(\d)([-+])/g,/\s|,|###/];e.exports=function(t){var e,n,a,o,s,u,l,c,d,f,h,p=[];for(e=t.slice().replace(i[0],"###$1").split(i[1]).slice(1),c=0,f=e.length;c<f;++c){for(n=e[c],a=n.slice(1).trim().replace(i[2],"$1###$2").split(i[3]),u=n.charAt(0),o=[u],d=0,h=a.length;d<h;++d)(s=+a[d])===s&&o.push(s);if(l=r[u.toLowerCase()],o.length-1>l)for(d=1,h=o.length;d<h;d+=l)p.push([u].concat(o.slice(d,d+l)));else p.push(o)}return p}},{}],53:[function(t,e,n){function r(t,e,n,r){for(var a=i.segments(r[5],r[6],r[0],r[1],r[3],r[4],r[2],e,n),o=0;o<a.length;++o){var s=i.bezier(a[o]);t.bezierCurveTo.apply(t,s)}}var i=t("./arc");e.exports=function(t,e,n,i){var a,o,s,u,l,c=null,d=0,f=0,h=0,p=0;null==n&&(n=0),null==i&&(i=0),t.beginPath();for(var g=0,m=e.length;g<m;++g){switch(a=e[g],a[0]){case"l":d+=a[1],f+=a[2],t.lineTo(d+n,f+i);break;case"L":d=a[1],f=a[2],t.lineTo(d+n,f+i);break;case"h":d+=a[1],t.lineTo(d+n,f+i);break;case"H":d=a[1],t.lineTo(d+n,f+i);break;case"v":f+=a[1],t.lineTo(d+n,f+i);break;case"V":f=a[1],t.lineTo(d+n,f+i);break;case"m":d+=a[1],f+=a[2],t.moveTo(d+n,f+i);break;case"M":d=a[1],f=a[2],t.moveTo(d+n,f+i);break;case"c":o=d+a[5],s=f+a[6],h=d+a[3],p=f+a[4],t.bezierCurveTo(d+a[1]+n,f+a[2]+i,h+n,p+i,o+n,s+i),d=o,f=s;break;case"C":d=a[5],f=a[6],h=a[3],p=a[4],t.bezierCurveTo(a[1]+n,a[2]+i,h+n,p+i,d+n,f+i);break;case"s":o=d+a[3],s=f+a[4],h=2*d-h,p=2*f-p,t.bezierCurveTo(h+n,p+i,d+a[1]+n,f+a[2]+i,o+n,s+i),h=d+a[1],p=f+a[2],d=o,f=s;break;case"S":o=a[3],s=a[4],h=2*d-h,p=2*f-p,t.bezierCurveTo(h+n,p+i,a[1]+n,a[2]+i,o+n,s+i),d=o,f=s,h=a[1],p=a[2];break;case"q":o=d+a[3],s=f+a[4],h=d+a[1],p=f+a[2],t.quadraticCurveTo(h+n,p+i,o+n,s+i),d=o,f=s;break;case"Q":o=a[3],s=a[4],t.quadraticCurveTo(a[1]+n,a[2]+i,o+n,s+i),d=o,f=s,h=a[1],p=a[2];break;case"t":o=d+a[1],s=f+a[2],null===c[0].match(/[QqTt]/)?(h=d,p=f):"t"===c[0]?(h=2*d-u,p=2*f-l):"q"===c[0]&&(h=2*d-h,p=2*f-p),u=h,l=p,t.quadraticCurveTo(h+n,p+i,o+n,s+i),d=o,f=s,h=d+a[1],p=f+a[2];break;case"T":o=a[1],s=a[2],h=2*d-h,p=2*f-p,t.quadraticCurveTo(h+n,p+i,o+n,s+i),d=o,f=s;break;case"a":r(t,d+n,f+i,[a[1],a[2],a[3],a[4],a[5],a[6]+d+n,a[7]+f+i]),d+=a[6],f+=a[7];break;case"A":r(t,d+n,f+i,[a[1],a[2],a[3],a[4],a[5],a[6]+n,a[7]+i]),d=a[6],f=a[7];break;case"z":case"Z":t.closePath()}c=a}}},{"./arc":50}],54:[function(t,e,n){function r(){this._active=null,this._handlers={}}var i=r.prototype;i.initialize=function(t,e,n){return this._el=t,this._obj=n||null,this.padding(e)},i.element=function(){return this._el},i.padding=function(t){return this._padding=t||{top:0,left:0,bottom:0,right:0},this},i.scene=function(t){return arguments.length?(this._scene=t,this):this._scene},i.on=function(){},i.off=function(){},i.handlers=function(){var t,e=this._handlers,n=[];for(t in e)n.push.apply(n,e[t]);return n},i.eventName=function(t){var e=t.indexOf(".");return e<0?t:t.slice(0,e)},e.exports=r},{}],55:[function(t,e,n){function r(){this._el=null,this._bgcolor=null}var i=r.prototype;i.initialize=function(t,e,n,r){return this._el=t,this.resize(e,n,r)},i.element=function(){return this._el},i.scene=function(){return this._el&&this._el.firstChild},i.background=function(t){return 0===arguments.length?this._bgcolor:(this._bgcolor=t,this)},i.resize=function(t,e,n){return this._width=t,this._height=e,this._padding=n||{top:0,left:0,bottom:0,right:0},this},i.render=function(){return this},e.exports=r},{}],56:[function(t,e,n){function r(){s.call(this),this._down=null,this._touch=null,this._first=!0}function i(t,e,n){return function(r){var i=this._active,a=this.pickEvent(r);a===i?this.fire(t,r):(this.fire(n,r),this._active=a,this.fire(e,r),this.fire(t,r))}}function a(t){return function(e){this.fire(t,e),this._active=null}}var o=t("../../util/dom"),s=t("../Handler"),u=t("./marks"),l=s.prototype,c=r.prototype=Object.create(l);c.constructor=r,c.initialize=function(t,e,n){var r=this._canvas=o.find(t,"canvas");if(r){var i=this;this.events.forEach(function(t){r.addEventListener(t,function(e){c[t]?c[t].call(i,e):i.fire(t,e)})})}return l.initialize.call(this,t,e,n)},c.canvas=function(){return this._canvas},c.context=function(){return this._canvas.getContext("2d")},c.events=["keydown","keypress","keyup","dragenter","dragleave","dragover","mousedown","mouseup","mousemove","mouseout","mouseover","click","dblclick","wheel","mousewheel","touchstart","touchmove","touchend"],c.DOMMouseScroll=function(t){this.fire("mousewheel",t)},c.mousemove=i("mousemove","mouseover","mouseout"),c.dragover=i("dragover","dragenter","dragleave"),c.mouseout=a("mouseout"),c.dragleave=a("dragleave"),c.mousedown=function(t){this._down=this._active,this.fire("mousedown",t)},c.click=function(t){this._down===this._active&&(this.fire("click",t),this._down=null)},c.touchstart=function(t){this._touch=this.pickEvent(t.changedTouches[0]),this._first&&(this._active=this._touch,this._first=!1),this.fire("touchstart",t,!0)},c.touchmove=function(t){this.fire("touchmove",t,!0)},c.touchend=function(t){this.fire("touchend",t,!0),this._touch=null},c.fire=function(t,e,n){var r,i,a=n?this._touch:this._active,o=this._handlers[t];if(o)for(e.vegaType=t,r=0,i=o.length;r<i;++r)o[r].handler.call(this._obj,e,a)},c.on=function(t,e){var n=this.eventName(t),r=this._handlers;return(r[n]||(r[n]=[])).push({type:t,handler:e}),this},c.off=function(t,e){var n,r=this.eventName(t),i=this._handlers[r];if(i){for(n=i.length;--n>=0;)i[n].type===t&&(e&&i[n].handler!==e||i.splice(n,1));return this}},c.pickEvent=function(t){var e,n,r=this._canvas.getBoundingClientRect(),i=this._padding;return this.pick(this._scene,e=t.clientX-r.left,n=t.clientY-r.top,e-i.left,n-i.top)},c.pick=function(t,e,n,r,i){var a=this.context(),o=u[t.marktype];return o.pick.call(this,a,t,e,n,r,i)},e.exports=r},{"../../util/dom":84,"../Handler":54,"./marks":63}],57:[function(t,e,n){function r(t){c.call(this),this._loader=new u(t)}function i(t,e){if(!e)return null;var n,r,i,o,u,l=new s;for(n=0,r=e.length;n<r;++n)i=e[n],o=i.mark,u=o.group,i=d[o.marktype].nested?o:i,l.union(a(i.bounds,u)),i["bounds:prev"]&&l.union(a(i["bounds:prev"],u));return l.round(),t.beginPath(),t.rect(l.x1,l.y1,l.width(),l.height()),t.clip(),l}function a(t,e){if(null==e)return t;for(var n=t.clone();null!=e;e=e.mark.group)n.translate(e.x||0,e.y||0);return n}var o=t("../../util/dom"),s=t("../../util/Bounds"),u=t("../../util/ImageLoader"),l=t("../../util/canvas"),c=t("../Renderer"),d=t("./marks");r.RETINA=!0;var f=c.prototype,h=r.prototype=Object.create(f);h.constructor=r,h.initialize=function(t,e,n,r){return this._canvas=l.instance(e,n),t&&(o.clear(t,0).appendChild(this._canvas),this._canvas.setAttribute("class","marks")),f.initialize.call(this,t,e,n,r)},h.resize=function(t,e,n){return f.resize.call(this,t,e,n),l.resize(this._canvas,this._width,this._height,this._padding,r.RETINA),this},h.canvas=function(){return this._canvas},h.context=function(){return this._canvas?this._canvas.getContext("2d"):null},h.pendingImages=function(){return this._loader.pending()},h.render=function(t,e){var n,r=this.context(),a=this._padding,o=this._width+a.left+a.right,s=this._height+a.top+a.bottom;return this._scene=t,r.save(),n=i(r,e),this.clear(-a.left,-a.top,o,s),this.draw(r,t,n),r.restore(),this._scene=null,this},h.draw=function(t,e,n){var r=d[e.marktype];r.draw.call(this,t,e,n)},h.clear=function(t,e,n,r){var i=this.context();i.clearRect(t,e,n,r),null!=this._bgcolor&&(i.fillStyle=this._bgcolor,i.fillRect(t,e,n,r))},h.loadImage=function(t){var e=this,n=this._scene;return this._loader.loadImage(t,function(){e.renderAsync(n)})},h.renderAsync=function(t){var e=this;e._async_id&&clearTimeout(e._async_id),e._async_id=setTimeout(function(){e.render(t),delete e._async_id},10)},e.exports=r},{"../../util/Bounds":77,"../../util/ImageLoader":80,"../../util/canvas":83,"../../util/dom":84,"../Renderer":55,"./marks":63}],58:[function(t,e,n){e.exports={Handler:t("./CanvasHandler"),Renderer:t("./CanvasRenderer")}},{"./CanvasHandler":56,"./CanvasRenderer":57}],59:[function(t,e,n){function r(t,e){var n=e.x||0,r=e.y||0,i=e.innerRadius||0,o=e.outerRadius||0,s=(e.startAngle||0)-a,u=(e.endAngle||0)-a;t.beginPath(),0===i?t.moveTo(n,r):t.arc(n,r,i,s,u,0),t.arc(n,r,o,u,s,1),t.closePath()}var i=t("./util"),a=Math.PI/2;e.exports={draw:i.drawAll(r),pick:i.pickPath(r)}},{"./util":70}],60:[function(t,e,n){function r(t,e){var n=e[0],r=n.pathCache||(n.pathCache=o(u(e)));s(t,r)}function i(t,e,n,r,i,a){var o=e.items,s=e.bounds;return!o||!o.length||s&&!s.contains(i,a)?null:(null!=t.pixelratio&&1!==t.pixelratio&&(n*=t.pixelratio,r*=t.pixelratio),l(t,o,n,r)?o[0]:null)}var a=t("./util"),o=t("../../../path/parse"),s=t("../../../path/render"),u=t("../../../util/svg").path.area,l=a.testPath(r);e.exports={draw:a.drawOne(r),pick:i,nested:!0}},{"../../../path/parse":52,"../../../path/render":53,"../../../util/svg":86,"./util":70}],61:[function(t,e,n){function r(t,e,n){if(e.items&&e.items.length){var r,i,s,u,l,c,d,f,h,p,g,m,v,y=e.items,_=this;for(p=0,g=y.length;p<g;++p){for(r=y[p],s=r.axisItems||o,i=r.items||o,u=r.legendItems||o,l=r.x||0,c=r.y||0,d=r.width||0,f=r.height||0,(r.stroke||r.fill)&&(h=null==r.opacity?1:r.opacity,h>0&&(r.fill&&a.fill(t,r,h)&&t.fillRect(l,c,d,f),r.stroke&&a.stroke(t,r,h)&&t.strokeRect(l,c,d,f))),t.save(),t.translate(l,c),r.clip&&(t.beginPath(),t.rect(0,0,d,f),t.clip()),n&&n.translate(-l,-c),m=0,v=s.length;m<v;++m)"back"===s[m].layer&&_.draw(t,s[m],n);for(m=0,v=i.length;m<v;++m)_.draw(t,i[m],n);for(m=0,v=s.length;m<v;++m)"back"!==s[m].layer&&_.draw(t,s[m],n);for(m=0,v=u.length;m<v;++m)_.draw(t,u[m],n);n&&n.translate(l,c),t.restore()}}}function i(t,e,n,r,i,a){if(e.bounds&&!e.bounds.contains(i,a))return null;var s,u,l,c,d,f,h,p,g,m,v,y=e.items||o;for(g=y.length;--g>=0;)if(u=y[g],v=u.bounds,!v||v.contains(i,a)){for(l=u.axisItems||o,c=u.items||o,d=u.legendItems||o,h=u.x||0,p=u.y||0,t.save(),t.translate(h,p),h=i-h,p=a-p,m=d.length;--m>=0;)if(s=d[m],s.interactive!==!1&&(f=this.pick(s,n,r,h,p)))return t.restore(),f;for(m=l.length;--m>=0;)if(s=l[m],s.interactive!==!1&&"back"!==s.layer&&(f=this.pick(s,n,r,h,p)))return t.restore(),f;for(m=c.length;--m>=0;)if(s=c[m],s.interactive!==!1&&(f=this.pick(s,n,r,h,p)))return t.restore(),f;for(m=l.length;--m>=0;)if(s=l[m],s.interative!==!1&&"back"===s.layer&&(f=this.pick(s,n,r,h,p)))return t.restore(),f;if(t.restore(),e.interactive!==!1&&(u.fill||u.stroke)&&h>=0&&h<=u.width&&p>=0&&p<=u.height)return u}return null}var a=t("./util"),o=[];e.exports={draw:r,pick:i}},{"./util":70}],62:[function(t,e,n){function r(t,e,n){if(e.items&&e.items.length)for(var r,i=this,a=e.items,o=0,s=a.length;o<s;++o)if(r=a[o],!n||n.intersects(r.bounds)){r.image&&r.image.url===r.url||(r.image=i.loadImage(r.url),r.image.url=r.url);var u,l=r.x||0,c=r.y||0,d=r.width||r.image&&r.image.width||0,f=r.height||r.image&&r.image.height||0;l-="center"===r.align?d/2:"right"===r.align?d:0,c-="middle"===r.baseline?f/2:"bottom"===r.baseline?f:0,r.image.loaded&&(t.globalAlpha=null!=(u=r.opacity)?u:1,t.drawImage(r.image,l,c,d,f))}}var i=t("./util");e.exports={draw:r,pick:i.pick()}},{"./util":70}],63:[function(t,e,n){e.exports={arc:t("./arc"),area:t("./area"),group:t("./group"),image:t("./image"),line:t("./line"),path:t("./path"),rect:t("./rect"),rule:t("./rule"),symbol:t("./symbol"),text:t("./text")}},{"./arc":59,"./area":60,"./group":61,"./image":62,"./line":64,"./path":65,"./rect":66,"./rule":67,"./symbol":68,"./text":69}],64:[function(t,e,n){function r(t,e){var n=e[0],r=n.pathCache||(n.pathCache=o(u(e)));s(t,r)}function i(t,e,n,r,i,a){var o=e.items,s=e.bounds;return!o||!o.length||s&&!s.contains(i,a)?null:(null!=t.pixelratio&&1!==t.pixelratio&&(n*=t.pixelratio,r*=t.pixelratio),l(t,o,n,r)?o[0]:null)}var a=t("./util"),o=t("../../../path/parse"),s=t("../../../path/render"),u=t("../../../util/svg").path.line,l=a.testPath(r,!1);e.exports={draw:a.drawOne(r),pick:i,nested:!0}},{"../../../path/parse":52,"../../../path/render":53,"../../../util/svg":86,"./util":70}],65:[function(t,e,n){function r(t,e){if(null==e.path)return!0;var n=e.pathCache||(e.pathCache=a(e.path));o(t,n,e.x,e.y)}var i=t("./util"),a=t("../../../path/parse"),o=t("../../../path/render");e.exports={draw:i.drawAll(r),pick:i.pickPath(r)}},{"../../../path/parse":52,"../../../path/render":53,"./util":70}],66:[function(t,e,n){function r(t,e,n){if(e.items&&e.items.length)for(var r,a,o,s,u,l,c=e.items,d=0,f=c.length;d<f;++d)r=c[d],n&&!n.intersects(r.bounds)||(a=null==r.opacity?1:r.opacity,0!==a&&(o=r.x||0,s=r.y||0,u=r.width||0,l=r.height||0,r.fill&&i.fill(t,r,a)&&t.fillRect(o,s,u,l),r.stroke&&i.stroke(t,r,a)&&t.strokeRect(o,s,u,l)))}var i=t("./util");e.exports={draw:r,pick:i.pick()}},{"./util":70}],67:[function(t,e,n){function r(t,e,n){if(e.items&&e.items.length)for(var r,i,a,s,u,l,c=e.items,d=0,f=c.length;d<f;++d)r=c[d],n&&!n.intersects(r.bounds)||(i=null==r.opacity?1:r.opacity,0!==i&&(a=r.x||0,s=r.y||0,u=null!=r.x2?r.x2:a,l=null!=r.y2?r.y2:s,r.stroke&&o.stroke(t,r,i)&&(t.beginPath(),t.moveTo(a,s),t.lineTo(u,l),t.stroke())))}function i(t,e){var n=e.x||0,r=e.y||0,i=null!=e.x2?e.x2:n,a=null!=e.y2?e.y2:r,o=e.strokeWidth,s=e.strokeCap;t.lineWidth=null!=o?o:1,t.lineCap=null!=s?s:"butt",t.beginPath(),t.moveTo(n,r),t.lineTo(i,a)}function a(t,e,n,r){return!!t.isPointInStroke&&(i(t,e),t.isPointInStroke(n,r))}var o=t("./util");e.exports={draw:r,pick:o.pick(a)}},{"./util":70}],68:[function(t,e,n){function r(t,e){var n,r,a,c,d=null!=e.size?e.size:100,f=e.x,h=e.y;if(t.beginPath(),null==e.shape||"circle"===e.shape)return n=Math.sqrt(d/Math.PI),t.arc(f,h,n,0,2*Math.PI,0),void t.closePath();switch(e.shape){case"cross":n=Math.sqrt(d/5)/2,r=3*n,t.moveTo(f-r,h-n),t.lineTo(f-n,h-n),t.lineTo(f-n,h-r),t.lineTo(f+n,h-r),t.lineTo(f+n,h-n),t.lineTo(f+r,h-n),t.lineTo(f+r,h+n),t.lineTo(f+n,h+n),t.lineTo(f+n,h+r),t.lineTo(f-n,h+r),t.lineTo(f-n,h+n),t.lineTo(f-r,h+n);break;case"diamond":c=Math.sqrt(d/(2*l)),a=c*l,t.moveTo(f,h-c),t.lineTo(f+a,h),t.lineTo(f,h+c),t.lineTo(f-a,h);break;case"square":r=Math.sqrt(d),n=r/2,t.rect(f-n,h-n,r,r);break;case"triangle-down":a=Math.sqrt(d/u),c=a*u/2,t.moveTo(f,h+c),t.lineTo(f+a,h-c),t.lineTo(f-a,h-c);break;case"triangle-up":a=Math.sqrt(d/u),c=a*u/2,t.moveTo(f,h-c),t.lineTo(f+a,h+c),t.lineTo(f-a,h+c);break;default:var p=i(o(e.shape),d);s(t,p,f,h)}t.closePath()}function i(t,e){var n,r,i,a,o,s=Math.sqrt(e);for(n=0,r=t.length;n<r;++n)for(o=t[n],i=1,a=o.length;i<a;++i)o[i]*=s;return t}var a=t("./util"),o=t("../../../path/parse"),s=t("../../../path/render"),u=Math.sqrt(3),l=Math.tan(30*Math.PI/180);e.exports={draw:a.drawAll(r),pick:a.pickPath(r)}},{"../../../path/parse":52,"../../../path/render":53,"./util":70}],69:[function(t,e,n){function r(t,e,n){if(e.items&&e.items.length)for(var r,i,a,o,l,c,d,f=e.items,h=0,p=f.length;h<p;++h)r=f[h],n&&!n.intersects(r.bounds)||(d=s.value(r.text),d&&(i=null==r.opacity?1:r.opacity,0!==i&&(t.font=s.font(r),t.textAlign=r.align||"left",a=r.x||0,o=r.y||0,(l=r.radius)&&(c=(r.theta||0)-Math.PI/2,a+=l*Math.cos(c),o+=l*Math.sin(c)),r.angle&&(t.save(),t.translate(a,o),t.rotate(r.angle*Math.PI/180),a=o=0),a+=r.dx||0,o+=(r.dy||0)+s.offset(r),r.fill&&u.fill(t,r,i)&&t.fillText(d,a,o),r.stroke&&u.stroke(t,r,i)&&t.strokeText(d,a,o),r.angle&&t.restore())))}function i(t,e,n,r,i,a){if(e.fontSize<=0)return!1;if(!e.angle)return!0;var s=o(e,l,!0),u=-e.angle*Math.PI/180,c=Math.cos(u),d=Math.sin(u),f=e.x,h=e.y,p=c*i-d*a+(f-f*c+h*d),g=d*i+c*a+(h-f*d-h*c);return s.contains(p,g)}var a=t("../../../util/Bounds"),o=t("../../../util/bound").text,s=t("../../../util/text"),u=t("./util"),l=new a;e.exports={draw:r,pick:u.pick(i)}},{"../../../util/Bounds":77,"../../../util/bound":82,"../../../util/text":87,"./util":70}],70:[function(t,e,n){function r(t,e,n,r){if(!t(e,r)){var i=null==n.opacity?1:n.opacity;0!==i&&(n.fill&&c(e,n,i)&&e.fill(),n.stroke&&d(e,n,i)&&e.stroke())}}function i(t,e,n,i){var a,o,s;for(a=0,o=n.items.length;a<o;++a)s=n.items[a],i&&!i.intersects(s.bounds)||r(t,e,s,s)}function a(t){return function(e,n,r){i(t,e,n,r)}}function o(t){return function(e,n,i){n.items.length&&(i&&!i.intersects(n.bounds)||r(t,e,n.items[0],n.items))}}function s(t){return t||(t=p),function(e,n,r,i,a,o){if(!n.items.length)return null;var s,u,l;for(null!=e.pixelratio&&1!==e.pixelratio&&(r*=e.pixelratio,i*=e.pixelratio),l=n.items.length;--l>=0;)if(s=n.items[l],u=s.bounds,(!u||u.contains(a,o))&&u&&t(e,s,r,i,a,o))return s;return null}}function u(t,e){return function(n,r,i,a){var o,s,u=Array.isArray(r)?r[0]:r,l=null==e?u.fill:e,c=u.stroke&&n.isPointInStroke;return c&&(o=u.strokeWidth,s=u.strokeCap,n.lineWidth=null!=o?o:1,n.lineCap=null!=s?s:"butt"),!t(n,r)&&(l&&n.isPointInPath(i,a)||c&&n.isPointInStroke(i,a))}}function l(t){return s(u(t))}function c(t,e,n){return n*=null==e.fillOpacity?1:e.fillOpacity,n>0&&(t.globalAlpha=n,t.fillStyle=f(t,e,e.fill),!0)}function d(t,e,n){var r,i=null!=(i=e.strokeWidth)?i:1;return!(i<=0)&&(n*=null==e.strokeOpacity?1:e.strokeOpacity,n>0&&(t.globalAlpha=n,t.strokeStyle=f(t,e,e.stroke),t.lineWidth=i,t.lineCap=null!=(r=e.strokeCap)?r:"butt",t.vgLineDash(e.strokeDash||null),t.vgLineDashOffset(e.strokeDashOffset||0),!0))}function f(t,e,n){return n.id?h(t,n,e.bounds):n}function h(t,e,n){var r,i,a=n.width(),o=n.height(),s=n.x1+e.x1*a,u=n.y1+e.y1*o,l=n.x1+e.x2*a,c=n.y1+e.y2*o,d=t.createLinearGradient(s,u,l,c),f=e.stops;for(r=0,i=f.length;r<i;++r)d.addColorStop(f[r].offset,f[r].color);return d}var p=function(){return!0};e.exports={drawOne:o,drawAll:a,pick:s,pickPath:l,testPath:u,stroke:d,fill:c,color:f,gradient:h}},{}],71:[function(t,e,n){e.exports={canvas:t("./canvas"),svg:t("./svg")}},{"./canvas":58,"./svg":75}],72:[function(t,e,n){function r(){a.call(this)}var i=t("../../util/dom"),a=t("../Handler"),o=a.prototype,s=r.prototype=Object.create(o);s.constructor=r,s.initialize=function(t,e,n){return this._svg=i.find(t,"svg"),o.initialize.call(this,t,e,n)},s.svg=function(){return this._svg},s.listener=function(t){var e=this;return function(n){var r=n.target,i=r.__data__;n.vegaType=n.type,i=Array.isArray(i)?i[0]:i,t.call(e._obj,n,i)}},s.on=function(t,e){var n=this.eventName(t),r=this._svg,i=this._handlers,a={type:t,handler:e,listener:this.listener(e)};return(i[n]||(i[n]=[])).push(a),r.addEventListener(n,a.listener),this},s.off=function(t,e){var n,r=this.eventName(t),i=this._svg,a=this._handlers[r];if(a){for(n=a.length;--n>=0;)(a[n].type===t&&!e||a[n].handler===e)&&(i.removeEventListener(r,a[n].listener),a.splice(n,1));return this}},e.exports=r},{"../../util/dom":84,"../Handler":54}],73:[function(t,e,n){function r(t){d.call(this),this._loader=new c(t),this._dirtyID=0}function i(t,e,n){var r,i,a;for(t=h.child(t,n,"linearGradient",g),t.setAttribute("id",e.id),t.setAttribute("x1",e.x1),t.setAttribute("x2",e.x2),t.setAttribute("y1",e.y1),t.setAttribute("y2",e.y2),r=0,i=e.stops.length;r<i;++r)a=h.child(t,r,"stop",g),a.setAttribute("offset",e.stops[r].offset),a.setAttribute("stop-color",e.stops[r].color);h.clear(t,r)}function a(t,e,n){var r;t=h.child(t,n,"clipPath",g),t.setAttribute("id",e.id),r=h.child(t,0,"rect",g),r.setAttribute("x",0),r.setAttribute("y",0),r.setAttribute("width",e.width),r.setAttribute("height",e.height)}function o(t,e){for(;t&&t.dirty!==e;t=t.mark.group){if(t.dirty=e,!t.mark||t.mark.dirty===e)return;
t.mark.dirty=e}}function s(t,e,n,r,i){var a=h.child(t,r,e.tag,g,null,i);if(a.__data__=n,a.__values__={fill:"default"},"g"===e.tag){var o=h.child(a,0,"rect",g,"background");o.__data__=n}return n._svg=a}function u(t,e,n){e!==b[t]&&(null!=e?n?_.setAttributeNS(n,t,e):_.setAttribute(t,e):n?_.removeAttributeNS(n,t):_.removeAttribute(t),b[t]=e)}function l(){return"undefined"!=typeof window?window.location.href:""}var c=t("../../util/ImageLoader"),d=t("../Renderer"),f=t("../../util/text"),h=t("../../util/dom"),p=t("../../util/svg"),g=p.metadata.xmlns,m=t("./marks"),v=d.prototype,y=r.prototype=Object.create(v);y.constructor=r,y.initialize=function(t,e,n,r){return t&&(this._svg=h.child(t,0,"svg",g,"marks"),h.clear(t,1),this._root=h.child(this._svg,0,"g",g),h.clear(this._svg,1)),this._defs={clip_id:1,gradient:{},clipping:{}},this.background(this._bgcolor),v.initialize.call(this,t,e,n,r)},y.background=function(t){return arguments.length&&this._svg&&this._svg.style.setProperty("background-color",t),v.background.apply(this,arguments)},y.resize=function(t,e,n){if(v.resize.call(this,t,e,n),this._svg){var r=this._width,i=this._height,a=this._padding;this._svg.setAttribute("width",r+a.left+a.right),this._svg.setAttribute("height",i+a.top+a.bottom),this._root.setAttribute("transform","translate("+a.left+","+a.top+")")}return this},y.svg=function(){if(!this._svg)return null;var t={class:"marks",width:this._width+this._padding.left+this._padding.right,height:this._height+this._padding.top+this._padding.bottom};for(var e in p.metadata)t[e]=p.metadata[e];return h.openTag("svg",t)+this._svg.innerHTML+h.closeTag("svg")},y.imageURL=function(t){return this._loader.imageURL(t)},y.render=function(t,e){return this._dirtyCheck(e)&&(this._dirtyAll&&this._resetDefs(),this.draw(this._root,t,-1),h.clear(this._root,1)),this.updateDefs(),this},y.draw=function(t,e,n){this.drawMark(t,e,n,m[e.marktype])},y.updateDefs=function(){var t,e=this._svg,n=this._defs,r=n.el,o=0;for(t in n.gradient)r||(r=n.el=h.child(e,0,"defs",g)),i(r,n.gradient[t],o++);for(t in n.clipping)r||(r=n.el=h.child(e,0,"defs",g)),a(r,n.clipping[t],o++);r&&(0===o?(e.removeChild(r),n.el=null):h.clear(r,o))},y._resetDefs=function(){var t=this._defs;t.clip_id=1,t.gradient={},t.clipping={}},y.isDirty=function(t){return this._dirtyAll||t.dirty===this._dirtyID},y._dirtyCheck=function(t){if(this._dirtyAll=!0,!t)return!0;var e,n,r,i,a,s,u,l=++this._dirtyID;for(a=0,s=t.length;a<s;++a)e=t[a],n=e.mark,n.marktype!==r&&(r=n.marktype,i=m[r]),"exit"!==e.status?(e=i.nest?n.items[0]:e,e._update!==l&&(e._svg?this._update(i,e._svg,e):(this._dirtyAll=!1,o(e,l)),e._update=l)):e._svg&&(i.nest&&e.mark.items.length?(this._update(i,e._svg,e.mark.items[0]),u=e.mark.items[0],u._svg=e._svg,u._update=l):h.remove(e._svg),e._svg=null);return!this._dirtyAll},y.drawMark=function(t,e,n,r){if(this.isDirty(e)){var i,a,o,u,l,c,d=r.nest?e.items&&e.items.length?[e.items[0]]:[]:e.items||[],f=e.interactive===!1?"none":null,p="g"===r.tag,m=h.cssClass(e);for(i=h.child(t,n+1,"g",g,m),i.setAttribute("class",m),e._svg=i,!p&&f&&i.style.setProperty("pointer-events",f),a=0,o=d.length;a<o;++a)this.isDirty(l=d[a])&&(c=!(this._dirtyAll||l._svg),u=s(i,r,l,a,c),this._update(r,u,l),p&&(c&&(this._dirtyAll=!0),this._recurse(u,l),c&&(this._dirtyAll=!1)));return h.clear(i,a),i}},y._recurse=function(t,e){var n,r,i=e.items||[],a=e.legendItems||[],o=e.axisItems||[],s=0;for(n=0,r=o.length;n<r;++n)"back"===o[n].layer&&this.drawMark(t,o[n],s++,m.group);for(n=0,r=i.length;n<r;++n)this.draw(t,i[n],s++);for(n=0,r=o.length;n<r;++n)"back"!==o[n].layer&&this.drawMark(t,o[n],s++,m.group);for(n=0,r=a.length;n<r;++n)this.drawMark(t,a[n],s++,m.group);h.clear(t,1+s)};var _=null,b=null,x={group:function(t,e,n){_=e.childNodes[0],b=e.__values__,t.background(u,n,this);var r=n.mark.interactive===!1?"none":null;r!==b.events&&(_.style.setProperty("pointer-events",r),b.events=r)},text:function(t,e,n){var r=f.value(n.text);r!==b.text&&(e.textContent=r,b.text=r),r=f.font(n),r!==b.font&&(e.style.setProperty("font",r),b.font=r)}};y._update=function(t,e,n){_=e,b=e.__values__,t.attr(u,n,this);var r=x[t.type];r&&r(t,e,n),this.style(_,n)},y.style=function(t,e){if(null!=e){var n,r,i,a,o;for(n=0,r=p.styleProperties.length;n<r;++n)i=p.styleProperties[n],o=e[i],o!==b[i]&&(a=p.styles[i],null==o?"fill"===a?t.style.setProperty(a,"none"):t.style.removeProperty(a):(o.id&&(this._defs.gradient[o.id]=o,o="url("+l()+"#"+o.id+")"),t.style.setProperty(a,o+"")),b[i]=o)}},e.exports=r},{"../../util/ImageLoader":80,"../../util/dom":84,"../../util/svg":86,"../../util/text":87,"../Renderer":55,"./marks":76}],74:[function(t,e,n){function r(t){s.call(this),this._loader=new u(t),this._text={head:"",root:"",foot:"",defs:"",body:""},this._defs={clip_id:1,gradient:{},clipping:{}}}function i(t,e,n,r){v[r||t]=e}function a(t,e,n,r){if(null==t)return"";var i,a,o,s,u,d="";for("bgrect"===n&&e.interactive===!1&&(d+="pointer-events: none;"),"text"===n&&(d+="font: "+c.font(t)+";"),i=0,a=l.styleProperties.length;i<a;++i)o=l.styleProperties[i],s=l.styles[o],u=t[o],null==u?"fill"===s&&(d+=(d.length?" ":"")+"fill: none;"):(u.id&&(r.gradient[u.id]=u,u="url(#"+u.id+")"),d+=(d.length?" ":"")+s+": "+u+";");return d?'style="'+d+'"':null}function o(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var s=t("../Renderer"),u=t("../../util/ImageLoader"),l=t("../../util/svg"),c=t("../../util/text"),d=t("../../util/dom"),f=d.openTag,h=d.closeTag,p=t("./marks"),g=s.prototype,m=r.prototype=Object.create(g);m.constructor=r,m.resize=function(t,e,n){g.resize.call(this,t,e,n);var r=this._padding,i=this._text,a={class:"marks",width:this._width+r.left+r.right,height:this._height+r.top+r.bottom};for(var o in l.metadata)a[o]=l.metadata[o];return i.head=f("svg",a),i.root=f("g",{transform:"translate("+r.left+","+r.top+")"}),i.foot=h("g")+h("svg"),this},m.svg=function(){var t=this._text;return t.head+t.defs+t.root+t.body+t.foot},m.render=function(t){return this._text.body=this.mark(t),this._text.defs=this.buildDefs(),this},m.reset=function(){return this._defs.clip_id=0,this},m.buildDefs=function(){var t,e,n,r,i=this._defs,a="";for(e in i.gradient){for(n=i.gradient[e],r=n.stops,a+=f("linearGradient",{id:e,x1:n.x1,x2:n.x2,y1:n.y1,y2:n.y2}),t=0;t<r.length;++t)a+=f("stop",{offset:r[t].offset,"stop-color":r[t].color})+h("stop");a+=h("linearGradient")}for(e in i.clipping)n=i.clipping[e],a+=f("clipPath",{id:e}),a+=f("rect",{x:0,y:0,width:n.width,height:n.height})+h("rect"),a+=h("clipPath");return a.length>0?f("defs")+a+h("defs"):""},m.imageURL=function(t){return this._loader.imageURL(t)};var v;m.attributes=function(t,e){return v={},t(i,e,this),v},m.mark=function(t){var e,n,r,i=p[t.marktype],s=i.tag,u=i.attr,l=i.nest||!1,g=l?t.items&&t.items.length?[t.items[0]]:[]:t.items||[],m=this._defs,v="";for("g"!==s&&t.interactive===!1&&(e='style="pointer-events: none;"'),v+=f("g",{class:d.cssClass(t)},e),n=0;n<g.length;++n)r=g[n],e="g"!==s?a(r,t,s,m):null,v+=f(s,this.attributes(u,r),e),"text"===s?v+=o(c.value(r.text)):"g"===s&&(v+=f("rect",this.attributes(i.background,r),a(r,t,"bgrect",m))+h("rect"),v+=this.markGroup(r)),v+=h(s);return v+h("g")},m.markGroup=function(t){var e,n,r="",i=t.axisItems||[],a=t.items||[],o=t.legendItems||[];for(e=0,n=i.length;e<n;++e)"back"===i[e].layer&&(r+=this.mark(i[e]));for(e=0,n=a.length;e<n;++e)r+=this.mark(a[e]);for(e=0,n=i.length;e<n;++e)"back"!==i[e].layer&&(r+=this.mark(i[e]));for(e=0,n=o.length;e<n;++e)r+=this.mark(o[e]);return r},e.exports=r},{"../../util/ImageLoader":80,"../../util/dom":84,"../../util/svg":86,"../../util/text":87,"../Renderer":55,"./marks":76}],75:[function(t,e,n){e.exports={Handler:t("./SVGHandler"),Renderer:t("./SVGRenderer"),string:{Renderer:t("./SVGStringRenderer")}}},{"./SVGHandler":72,"./SVGRenderer":73,"./SVGStringRenderer":74}],76:[function(t,e,n){function r(t){return i(t.x||0,t.y||0)}function i(t,e){return"translate("+t+","+e+")"}var a=t("../../util/text"),o=t("../../util/svg"),s=o.symbolTypes,u=o.textAlign,l=o.path;e.exports={arc:{tag:"path",type:"arc",attr:function(t,e){t("transform",r(e)),t("d",l.arc(e))}},area:{tag:"path",type:"area",nest:!0,attr:function(t,e){var n=e.mark.items;n.length&&t("d",l.area(n))}},group:{tag:"g",type:"group",attr:function(t,e,n){var i,a,o=null;t("transform",r(e)),e.clip&&(i=n._defs,o=e.clip_id||(e.clip_id="clip"+i.clip_id++),a=i.clipping[o]||(i.clipping[o]={id:o}),a.width=e.width||0,a.height=e.height||0),t("clip-path",o?"url(#"+o+")":null)},background:function(t,e){t("class","background"),t("width",e.width||0),t("height",e.height||0)}},image:{tag:"image",type:"image",attr:function(t,e,n){var r=e.x||0,a=e.y||0,o=e.width||0,s=e.height||0,u=n.imageURL(e.url);r-="center"===e.align?o/2:"right"===e.align?o:0,a-="middle"===e.baseline?s/2:"bottom"===e.baseline?s:0,t("href",u,"http://www.w3.org/1999/xlink","xlink:href"),t("transform",i(r,a)),t("width",o),t("height",s)}},line:{tag:"path",type:"line",nest:!0,attr:function(t,e){var n=e.mark.items;n.length&&t("d",l.line(n))}},path:{tag:"path",type:"path",attr:function(t,e){t("transform",r(e)),t("d",e.path)}},rect:{tag:"rect",type:"rect",nest:!1,attr:function(t,e){t("transform",r(e)),t("width",e.width||0),t("height",e.height||0)}},rule:{tag:"line",type:"rule",attr:function(t,e){t("transform",r(e)),t("x2",null!=e.x2?e.x2-(e.x||0):0),t("y2",null!=e.y2?e.y2-(e.y||0):0)}},symbol:{tag:"path",type:"symbol",attr:function(t,e){var n=!e.shape||s[e.shape]?l.symbol(e):l.resize(e.shape,e.size);t("transform",r(e)),t("d",n)}},text:{tag:"text",type:"text",nest:!1,attr:function(t,e){var n,r=e.dx||0,o=(e.dy||0)+a.offset(e),s=e.x||0,l=e.y||0,c=e.angle||0,d=e.radius||0;d&&(n=(e.theta||0)-Math.PI/2,s+=d*Math.cos(n),l+=d*Math.sin(n)),t("text-anchor",u[e.align]||"start"),c?(n=i(s,l)+" rotate("+c+")",(r||o)&&(n+=" "+i(r,o))):n=i(s+r,l+o),t("transform",n)}}}},{"../../util/svg":86,"../../util/text":87}],77:[function(t,e,n){function r(t){this.clear(),t&&this.union(t)}var i=r.prototype;i.clone=function(){return new r(this)},i.clear=function(){return this.x1=+Number.MAX_VALUE,this.y1=+Number.MAX_VALUE,this.x2=-Number.MAX_VALUE,this.y2=-Number.MAX_VALUE,this},i.set=function(t,e,n,r){return this.x1=t,this.y1=e,this.x2=n,this.y2=r,this},i.add=function(t,e){return t<this.x1&&(this.x1=t),e<this.y1&&(this.y1=e),t>this.x2&&(this.x2=t),e>this.y2&&(this.y2=e),this},i.expand=function(t){return this.x1-=t,this.y1-=t,this.x2+=t,this.y2+=t,this},i.round=function(){return this.x1=Math.floor(this.x1),this.y1=Math.floor(this.y1),this.x2=Math.ceil(this.x2),this.y2=Math.ceil(this.y2),this},i.translate=function(t,e){return this.x1+=t,this.x2+=t,this.y1+=e,this.y2+=e,this},i.rotate=function(t,e,n){var r=Math.cos(t),i=Math.sin(t),a=e-e*r+n*i,o=n-e*i-n*r,s=this.x1,u=this.x2,l=this.y1,c=this.y2;return this.clear().add(r*s-i*l+a,i*s+r*l+o).add(r*s-i*c+a,i*s+r*c+o).add(r*u-i*l+a,i*u+r*l+o).add(r*u-i*c+a,i*u+r*c+o)},i.union=function(t){return t.x1<this.x1&&(this.x1=t.x1),t.y1<this.y1&&(this.y1=t.y1),t.x2>this.x2&&(this.x2=t.x2),t.y2>this.y2&&(this.y2=t.y2),this},i.encloses=function(t){return t&&this.x1<=t.x1&&this.x2>=t.x2&&this.y1<=t.y1&&this.y2>=t.y2},i.alignsWith=function(t){return t&&(this.x1==t.x1||this.x2==t.x2||this.y1==t.y1||this.y2==t.y2)},i.intersects=function(t){return t&&!(this.x2<t.x1||this.x1>t.x2||this.y2<t.y1||this.y1>t.y2)},i.contains=function(t,e){return!(t<this.x1||t>this.x2||e<this.y1||e>this.y2)},i.width=function(){return this.x2-this.x1},i.height=function(){return this.y2-this.y1},e.exports=r},{}],78:[function(t,e,n){e.exports=function(t){function e(){}function n(e,n){t.add(e,n)}return{bounds:function(e){return arguments.length?(t=e,this):t},beginPath:e,closePath:e,moveTo:n,lineTo:n,quadraticCurveTo:function(e,n,r,i){t.add(e,n),t.add(r,i)},bezierCurveTo:function(e,n,r,i,a,o){t.add(e,n),t.add(r,i),t.add(a,o)}}}},{}],79:[function(t,e,n){function r(t){this.id="gradient_"+i++,this.type=t||"linear",this.stops=[],this.x1=0,this.x2=1,this.y1=0,this.y2=0}var i=0,a=r.prototype;a.stop=function(t,e){return this.stops.push({offset:t,color:e}),this},e.exports=r},{}],80:[function(t,e,n){(function(n){function r(t){this._pending=0,this._config=t||r.Config}function i(t,e){var n=o.sanitizeUrl(this.params(t));if(!n)return e&&e(t,null),null;var r=this,i=new Image;return r._pending+=1,i.onload=function(){r._pending-=1,i.loaded=!0,e&&e(null,i)},i.src=n,i}function a(t,e){var r=this,i=new("undefined"!=typeof window?window.canvas:"undefined"!=typeof n?n.canvas:null).Image;return r._pending+=1,o(this.params(t),function(t,n){return r._pending-=1,t?(e&&e(t,null),null):(i.src=n,i.loaded=!0,void(e&&e(null,i)))}),i}var o=t("datalib/src/import/load");r.Config=null;var s=r.prototype;s.pending=function(){return this._pending},s.params=function(t){var e,n={url:t};for(e in this._config)n[e]=this._config[e];return n},s.imageURL=function(t){return o.sanitizeUrl(this.params(t))},s.loadImage=function(t,e){return o.useXHR?i.call(this,t,e):a.call(this,t,e)},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"datalib/src/import/load":22}],81:[function(t,e,n){function r(t){this.mark=t}var i=r.prototype;i.hasPropertySet=function(t){var e=this.mark.def.properties;return e&&null!=e[t]},i.cousin=function(t,e){if(0===t)return this;t=t||-1;var n=this.mark,r=n.group,i=null==e?n.items.indexOf(this):e,a=r.items.indexOf(n)+t;return r.items[a].items[i]},i.sibling=function(t){if(0===t)return this;t=t||-1;var e=this.mark,n=e.items.indexOf(this)+t;return e.items[n]},i.remove=function(){var t=this,e=t.mark.items,n=e.indexOf(t);return n>=0&&(n===e.length-1?e.pop():e.splice(n,1)),t},i.touch=function(){this.pathCache&&(this.pathCache=null)},e.exports=r},{}],82:[function(t,e,n){function r(){return D||(D=b.instance(1,1).getContext("2d"))}function i(t,e){return t.stroke&&0!==t.opacity&&0!==t.stokeOpacity&&e.expand(null!=t.strokeWidth?t.strokeWidth:1),e}function a(t,e,n,r,a){return null==e?n.set(0,0,0,0):(S(P.bounds(n),e,r,a),i(t,n)),n}function o(t,e){var n=t.path?t.pathCache||(t.pathCache=M(t.path)):null;return a(t,n,e,t.x,t.y)}function s(t,e){if(0===t.items.length)return e;var n=t.items,r=n[0],i=r.pathCache||(r.pathCache=M(T(n)));return a(r,i,e)}function u(t,e){if(0===t.items.length)return e;var n=t.items,r=n[0],i=r.pathCache||(r.pathCache=M(E(n)));return a(r,i,e)}function l(t,e){var n,r;return i(t,e.set(n=t.x||0,r=t.y||0,n+t.width||0,r+t.height||0))}function c(t,e){var n=t.x||0,r=t.y||0,i=t.width||0,a=t.height||0;return n-="center"===t.align?i/2:"right"===t.align?i:0,r-="middle"===t.baseline?a/2:"bottom"===t.baseline?a:0,e.set(n,r,n+i,r+a)}function d(t,e){var n,r;return i(t,e.set(n=t.x||0,r=t.y||0,null!=t.x2?t.x2:n,null!=t.y2?t.y2:r))}function f(t,e){var n,r,a,o,s,u,l,c,d,f=t.x||0,h=t.y||0,p=t.innerRadius||0,g=t.outerRadius||0,m=(t.startAngle||0)-A,v=(t.endAngle||0)-A,y=1/0,_=-(1/0),b=1/0,x=-(1/0),w=[m,v],k=m-m%A;for(r=0;r<4&&k<v;++r,k+=A)w.push(k);for(r=0,a=w.length;r<a;++r)n=w[r],o=Math.cos(n),u=p*o,c=g*o,s=Math.sin(n),l=p*s,d=g*s,y=Math.min(y,u,c),_=Math.max(_,u,c),b=Math.min(b,l,d),x=Math.max(x,l,d);return i(t,e.set(f+y,h+b,f+_,h+x))}function h(t,e){var n,r,a,o,s=null!=t.size?t.size:100,u=t.x||0,l=t.y||0;switch(t.shape){case"cross":r=3*Math.sqrt(s/5)/2,e.set(u-r,l-r,u+r,l+r);break;case"diamond":o=Math.sqrt(s/(2*C)),a=o*C,e.set(u-a,l-o,u+a,l+o);break;case"square":r=Math.sqrt(s),n=r/2,e.set(u-n,l-n,u+n,l+n);break;case"triangle-down":a=Math.sqrt(s/L),o=a*L/2,e.set(u-a,l-o,u+a,l+o);break;case"triangle-up":a=Math.sqrt(s/L),o=a*L/2,e.set(u-a,l-o,u+a,l+o);break;default:n=Math.sqrt(s/Math.PI),e.set(u-n,l-n,u+n,l+n)}return i(t,e)}function p(t,e,n){var i,a,o=r(),s=w.size(t),u=t.align,l=t.radius||0,c=t.x||0,d=t.y||0,f=t.dx||0,h=(t.dy||0)+w.offset(t)-Math.round(.8*s);return l&&(a=(t.theta||0)-Math.PI/2,c+=l*Math.cos(a),d+=l*Math.sin(a)),o.font=w.font(t),i=o.measureText(w.value(t.text)).width,"center"===u?f-=i/2:"right"===u&&(f-=i),e.set(f+=c,h+=d,f+i,h+s),t.angle&&!n&&e.rotate(t.angle*Math.PI/180,c,d),e.expand(n?0:1)}function g(t,e,n){var r,a,o=t.axisItems||[],s=t.items||[],u=t.legendItems||[];if(!t.clip){for(r=0,a=o.length;r<a;++r)e.union(o[r].bounds);for(r=0,a=s.length;r<a;++r)s[r].bounds&&e.union(s[r].bounds);if(n)for(r=0,a=u.length;r<a;++r)e.union(u[r].bounds)}return(t.clip||t.width||t.height)&&i(t,e.add(0,0).add(t.width||0,t.height||0)),e.translate(t.x||0,t.y||0)}function m(t,e,n){var r=t.mark.marktype;e=e||I[r],e.nest&&(t=t.mark);var i=t.bounds,a=t["bounds:prev"]||(t["bounds:prev"]=new _);return i?(a.clear().union(i),i.clear()):t.bounds=new _,e(t,t.bounds,n),i||a.clear().union(t.bounds),t.bounds}function v(t,e,n){var r,i,a,o,s=t.marktype,u=I[s],l=t.items,c=l&&l.length;if(u.nest)return a=c?l[0]:(N.mark=t,N),o=m(a,u,n),e=e&&e.union(o)||o;if(e=e||t.bounds&&t.bounds.clear()||new _,c)for(r=0,i=l.length;r<i;++r)e.union(m(l[r],u,n));return t.bounds=e}var y=t("./BoundsContext"),_=t("./Bounds"),b=t("./canvas"),x=t("./svg"),w=t("./text"),k=t("../path"),M=k.parse,S=k.render,T=x.path.area,E=x.path.line,A=Math.PI/2,L=Math.sqrt(3),C=Math.tan(30*Math.PI/180),D=null,P=y(),I={group:g,symbol:h,image:c,rect:l,rule:d,arc:f,text:p,path:o,area:s,line:u};I.area.nest=!0,I.line.nest=!0;var N={mark:null};e.exports={mark:v,item:m,text:p,group:g}},{"../path":51,"./Bounds":77,"./BoundsContext":78,"./canvas":83,"./svg":86,"./text":87}],83:[function(t,e,n){(function(t){function n(e,n){e=e||1,n=n||1;var r;if("undefined"!=typeof document&&document.createElement)r=document.createElement("canvas"),r.width=e,r.height=n;else{var i="undefined"!=typeof window?window.canvas:"undefined"!=typeof t?t.canvas:null;if(!i.prototype)return null;r=new i(e,n)}return a(r)}function r(t,e,n,r,a){var o=this._ctx=t.getContext("2d"),s=1;return t.width=e+r.left+r.right,t.height=n+r.top+r.bottom,a&&"undefined"!=typeof HTMLElement&&t instanceof HTMLElement&&(o.pixelratio=s=i(t)||1),o.setTransform(s,0,0,s,s*r.left,s*r.top),t}function i(t){var e=t.getContext("2d"),n=window&&window.devicePixelRatio||1,r=e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1,i=n/r;if(n!==r){var a=t.width,o=t.height;t.width=a*i,t.height=o*i,t.style.width=a+"px",t.style.height=o+"px"}return i}function a(t){var e=t.getContext("2d");if(!e.vgLineDash){var n=function(){},r=[];return e.setLineDash?(e.vgLineDash=function(t){this.setLineDash(t||r)},e.vgLineDashOffset=function(t){this.lineDashOffset=t}):void 0!==e.webkitLineDash?(e.vgLineDash=function(t){this.webkitLineDash=t||r},e.vgLineDashOffset=function(t){this.webkitLineDashOffset=t}):void 0!==e.mozDash?(e.vgLineDash=function(t){this.mozDash=t},e.vgLineDashOffset=n):(e.vgLineDash=n,e.vgLineDashOffset=n),t}}e.exports={instance:n,resize:r,lineDash:a}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],84:[function(t,e,n){function r(t,e,n){return n?t.createElementNS(n,e):t.createElement(e)}function i(t){if(t){var e=t.parentNode;e&&(e.removeChild(t),e.childNodes&&e.childNodes.length||i(e))}}e.exports={find:function(t,e){e=e.toLowerCase();for(var n=0,r=t.childNodes.length;n<r;++n)if(t.childNodes[n].tagName.toLowerCase()===e)return t.childNodes[n]},child:function(t,e,n,i,a,o){var s,u;return s=u=t.childNodes[e],(!s||o||s.tagName.toLowerCase()!==n.toLowerCase()||a&&s.getAttribute("class")!=a)&&(s=r(t.ownerDocument,n,i),t.insertBefore(s,u||null),a&&s.setAttribute("class",a)),s},clear:function(t,e){for(var n=t.childNodes.length;n>e;)t.removeChild(t.childNodes[--n]);return t},remove:i,cssClass:function(t){return"mark-"+t.marktype+(t.name?" "+t.name:"")},openTag:function(t,e,n){var r,i,a="<"+t;if(e)for(r in e)i=e[r],null!=i&&(a+=" "+r+'="'+i+'"');return n&&(a+=" "+n),a+">"},closeTag:function(t){return"</"+t+">"}}},{}],85:[function(t,e,n){function r(t,e){return JSON.stringify(t,u,e)}function i(t){var e="string"==typeof t?JSON.parse(t):t;return a(e)}function a(t){var e,n,r,i,u,l=t.marktype;for(r=0,i=s.length;r<i;++r)if(u=t[s[r]])for(e=0,n=u.length;e<n;++e)u[e][l?"mark":"group"]=t,l&&"group"!==l||a(u[e]);return l&&o.mark(t),t}var o=t("../util/bound"),s=["items","axisItems","legendItems"],u=["marktype","name","interactive","clip","items","axisItems","legendItems","layer","x","y","width","height","align","baseline","fill","fillOpacity","opacity","stroke","strokeOpacity","strokeWidth","strokeCap","strokeDash","strokeDashOffset","startAngle","endAngle","innerRadius","outerRadius","interpolate","tension","orient","url","path","x2","y2","size","shape","text","angle","theta","radius","dx","dy","font","fontSize","fontWeight","fontStyle","fontVariant"];e.exports={toJSON:r,fromJSON:i}},{"../util/bound":82}],86:[function(t,e,n){(function(n){function r(t){return t.x||0}function i(t){return t.y||0}function a(t){return(t.x||0)+(t.width||0)}function o(t){return(t.y||0)+(t.height||0)}function s(t){return null==t.size?100:t.size}function u(t){return t.shape||"circle"}var l=t("datalib"),c=("undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null).svg,d=t("../path/parse"),f=c.area().x(r).y1(i).y0(o),h=c.area().y(i).x1(r).x0(a),p=c.line().x(r).y(i);e.exports={metadata:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},path:{arc:c.arc(),symbol:c.symbol().type(u).size(s),area:function(t){var e=t[0];return("horizontal"===e.orient?h:f).interpolate(e.interpolate||"linear").tension(e.tension||.7)(t)},line:function(t){var e=t[0];return p.interpolate(e.interpolate||"linear").tension(e.tension||.7)(t)},resize:function(t,e){var n,r,i,a,o,s,u,l=d(t),c="";for(e=Math.sqrt(e),a=0,o=l.length;a<o;++a)for(n=l[a],s=0,u=n.length;s<u&&"Z"!==n[s];++s)(r=+n[s])===r&&(i=t.indexOf(r),c+=t.substring(0,i)+r*e,t=t.substring(i+(r+"").length));return c+"Z"}},symbolTypes:l.toMap(c.symbolTypes),textAlign:{left:"start",center:"middle",right:"end"},textBaseline:{top:"before-edge",bottom:"after-edge",middle:"central"},styles:{fill:"fill",fillOpacity:"fill-opacity",stroke:"stroke",strokeWidth:"stroke-width",strokeOpacity:"stroke-opacity",strokeCap:"stroke-linecap",strokeDash:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",opacity:"opacity"},styleProperties:["fill","fillOpacity","stroke","strokeWidth","strokeOpacity","strokeCap","strokeDash","strokeDashOffset","opacity"]}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../path/parse":52,datalib:26}],87:[function(t,e,n){function r(t){return null!=t.fontSize?t.fontSize:11}e.exports={size:r,value:function(t){return null!=t?String(t):""},font:function(t,e){var n=t.font;return e&&n&&(n=String(n).replace(/\"/g,"'")),""+(t.fontStyle?t.fontStyle+" ":"")+(t.fontVariant?t.fontVariant+" ":"")+(t.fontWeight?t.fontWeight+" ":"")+r(t)+"px "+(n||"sans-serif")},offset:function(t){var e=t.baseline,n=r(t);return Math.round("top"===e?.93*n:"middle"===e?.3*n:"bottom"===e?-.21*n:0)}}},{}],88:[function(t,e,n){function r(t,e,n){s.call(this,t,e,n),this._type="canvas",this._renderers={canvas:a,svg:o}}var i=t("vega-scenegraph").render,a=i.canvas,o=i.svg.string,s=t("./View"),u=r.prototype=new s;u.renderer=function(t){return t&&(this._type=t),s.prototype.renderer.apply(this,arguments)},u.canvas=function(){return"canvas"===this._type?this._renderer.canvas():null},u.canvasAsync=function(t){function e(){0===n.pendingImages()?(r.render(),t(r.canvas())):setTimeout(e,10)}var n=this._renderer,r=this;return"canvas"!==this._type?null:void(n.pendingImages()>0?e():t(this.canvas()))},u.svg=function(){return"svg"===this._type?this._renderer.svg():null},u.initialize=function(){var t=this._width,e=this._height,n=this._bgcolor,r=this._padding,i=this.model().config();return this._viewport&&(t=this._viewport[0]-(r?r.left+r.right:0),e=this._viewport[1]-(r?r.top+r.bottom:0)),this._renderer=(this._renderer||new this._io.Renderer(i.load)).initialize(null,t,e,r).background(n),this},e.exports=r},{"./View":90,"vega-scenegraph":49}],89:[function(t,e,n){function r(t){this._defs={},this._predicates={},this._scene=null,this._groups=null,this._node=null,this._builder=null,this._reset={axes:!1,legends:!1},this.config(t),this.expr=f(this),u.init.call(this)}function i(t){var e=this,n={};return a.isArray(t)?(t.forEach(function(t){n[t]=e._predicates[t]}),n):this._predicates[t]}var a=t("datalib"),o=t("vega-dataflow"),s=o.ChangeSet,u=o.Graph.prototype,l=o.Node,c=t("../scene/GroupBuilder"),d=t("../scene/visit"),f=t("../parse/expr"),h=t("./config"),p=r.prototype=Object.create(u);p.constructor=r,p.defs=function(t){return arguments.length?(this._defs=t,this):this._defs},p.config=function(t){if(!arguments.length)return this._config;this._config=Object.create(h);for(var e in t){var n=t[e],r=this._config[e];a.isObject(n)&&a.isObject(r)?this._config[e]=a.extend({},r,n):this._config[e]=n}return this},p.width=function(t){return this._defs&&(this._defs.width=t),this._defs&&this._defs.marks&&(this._defs.marks.width=t),this._scene&&(this._scene.items[0].width=t,this._scene.items[0]._dirty=!0),this._reset.axes=!0,this},p.height=function(t){return this._defs&&(this._defs.height=t),this._defs&&this._defs.marks&&(this._defs.marks.height=t),this._scene&&(this._scene.items[0].height=t,this._scene.items[0]._dirty=!0),this._reset.axes=!0,this},p.node=function(){return this._node||(this._node=new l(this))},p.data=function(){var t=u.data.apply(this,arguments);return arguments.length>1&&this.node().addListener(t.pipeline()[0]),t},p.predicate=function(t,e){return 1===arguments.length?i.call(this,t):this._predicates[t]=e},p.predicates=function(){return this._predicates},p.scene=function(t){if(!arguments.length)return this._scene;this._builder&&(this.node().removeListener(this._builder),this._builder._groupBuilder.disconnect());var e=this,n=this._builder=new l(this);return n.evaluate=function(r){if(n._groupBuilder)return r;var i=n._groupBuilder=new c(e,e._defs.marks,e._scene={}),a=i.pipeline();return e._groups={},this.addListener(i.connect()),a[a.length-1].addListener(t),r},this.addListener(n),this},p.group=function(t,e){var n=this._groups;return 1===arguments.length?n[t]:(n[t]=e,this)},p.reset=function(){return this._scene&&this._reset.axes&&(d(this._scene,function(t){t.axes&&t.axes.forEach(function(t){t.reset()})}),this._reset.axes=!1),this._scene&&this._reset.legends&&(d(this._scene,function(t){t.legends&&t.legends.forEach(function(t){t.reset()})}),this._reset.legends=!1),this},p.addListener=function(t){this.node().addListener(t)},p.removeListener=function(t){this.node().removeListener(t)},p.fire=function(t){t||(t=s.create()),this.propagate(t,this.node())},e.exports=r},{"../parse/expr":96,"../scene/GroupBuilder":112,"../scene/visit":117,"./config":91,datalib:26,"vega-dataflow":41}],90:[function(t,e,n){(function(n){function r(t,e,n){this._el=null,this._model=null,this._width=this.__width=e||500,this._height=this.__height=n||300,this._bgcolor=null,this._cursor=!0,this._autopad=1,this._padding={top:0,left:0,bottom:0,right:0},this._viewport=null,this._renderer=null,this._handler=null,this._streamer=null,this._skipSignals=!1,this._changeset=null,this._repaint=!0,this._renderers=c,this._io=null,this._api={}}function i(t){var e=this,n=this._model.data(t);if(!n)return d.error('Data source "'+t+'" is not defined.');var r=n.pipeline()[0],i=this._streamer,a={};return this._api[t]?this._api[t]:(a.insert=function(o){return n.insert(u.duplicate(o)),i.addListener(r),e._changeset.data[t]=1,a},a.update=function(){return i.addListener(r),e._changeset.data[t]=1,n.update.apply(n,arguments),a},a.remove=function(){return i.addListener(r),e._changeset.data[t]=1,n.remove.apply(n,arguments),a},a.values=function(){return n.values()},this._api[t]=a)}function a(t,e){var n=this._changeset,r=this._model.signal(t);return r?(this._streamer.addListener(r.value(e)),n.signals[t]=1,void(n.reflow=!0)):d.error('Signal "'+t+'" is not defined.')}function o(){var t=this;return t._renderNode=new l.Node(t._model).router(!0),t._renderNode.evaluate=function(e){d.debug(e,["rendering"]);var n=t._model.scene(),r=t._handler;return r&&r.scene&&r.scene(n),e.trans?e.trans.start(function(e){t._renderer.render(n,e)}):t._repaint?t._renderer.render(n):e.dirty.length&&t._renderer.render(n,e.dirty),e.dirty.length&&(e.dirty.forEach(function(t){t._dirty=!1}),n.items[0]._dirty=!1),t._repaint=t._skipSignals=!1,e},t._model.scene(t._renderNode),!0}var s="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,u=t("datalib"),l=t("vega-dataflow"),c=t("vega-scenegraph").render,d=t("vega-logging"),f=l.Dependencies,h=t("../parse/streams"),p=t("../scene/Encoder"),g=t("../scene/Transition"),m=r.prototype;m.model=function(t){return arguments.length?(this._model!==t&&(this._model=t,this._streamer=new l.Node(t),this._streamer._rank=-1,this._changeset=l.ChangeSet.create(),this._handler&&this._handler.model(t)),this):this._model},m.data=function(t){var e=this;return arguments.length?u.isString(t)?i.call(e,t):(u.isObject(t)&&u.keys(t).forEach(function(n){var r=i.call(e,n);t[n](r)}),this):e._model.values()};var v=u.toMap(["width","height","padding"]);m.signal=function(t,e,n){var r,i,o=this._model;if(!arguments.length)return o.values(f.SIGNALS);if(1===arguments.length&&u.isString(t))return o.values(f.SIGNALS,t);u.isObject(t)?(i=t,n=e):(i={},i[t]=e);for(r in i)v[r]?this[r](i[r]):a.call(this,r,i[r]);return this._skipSignals=n,this},m.width=function(t){return arguments.length?(this.__width!==t&&(this._width=this.__width=t,this.model().width(t),this.initialize(),this._strict&&(this._autopad=1),a.call(this,"width",t)),this):this.__width},m.height=function(t){return arguments.length?(this.__height!==t&&(this._height=this.__height=t,this.model().height(t),this.initialize(),this._strict&&(this._autopad=1),a.call(this,"height",t)),this):this.__height},m.background=function(t){return arguments.length?(this._bgcolor!==t&&(this._bgcolor=t,this.initialize()),this):this._bgcolor},m.padding=function(t){return arguments.length?(this._padding!==t&&(u.isString(t)?(this._autopad=1,this._padding={top:0,left:0,bottom:0,right:0},this._strict="strict"===t):(this._autopad=0,this._padding=t,this._strict=!1),this._renderer&&this._renderer.resize(this._width,this._height,this._padding),this._handler&&this._handler.padding(this._padding),a.call(this,"padding",this._padding)),this._repaint=!0,this):this._padding},m.autopad=function(t){if(this._autopad<1)return this;this._autopad=0;var e=this.model().scene().bounds,n=this._padding,r=this.model().config(),i=r.autopadInset,o=e.x1<0?Math.ceil(-e.x1)+i:0,s=e.y1<0?Math.ceil(-e.y1)+i:0,u=e.x2>this._width?Math.ceil(+e.x2-this._width)+i:0;return e=e.y2>this._height?Math.ceil(+e.y2-this._height)+i:0,n={left:o,top:s,right:u,bottom:e},this._strict?(this._autopad=0,this._padding=n,this._width=Math.max(0,this.__width-(o+u)),this._height=Math.max(0,this.__height-(s+e)),this._model.width(this._width).height(this._height).reset(),a.call(this,"width",this._width),a.call(this,"height",this._height),a.call(this,"padding",n),this.initialize().update({props:"enter"}).update({props:"update"})):this.padding(n).update(t),this},m.viewport=function(t){return arguments.length?(this._viewport!==t&&(this._viewport=t,this.initialize()),this):this._viewport},m.renderer=function(t){if(!arguments.length)return this._renderer;if(this._renderers[t])t=this._renderers[t];else{if(u.isString(t))throw new Error("Unknown renderer: "+t);if(!t)throw new Error("No renderer specified")}return this._io!==t&&(this._io=t,this._renderer=null,this.initialize(),this._build&&this.render()),this},m.initialize=function(t){var e,n=this,r=n._width,i=n._height,a=n._padding,o=n._bgcolor,u=this.model().config();return arguments.length&&null!==t||(t=this._el?this._el.parentNode:null)?(s.select(t).select("div.vega").remove(),this._el=t=s.select(t).append("div").attr("class","vega").style("position","relative").node(),n._viewport&&s.select(t).style("width",(n._viewport[0]||r)+"px").style("height",(n._viewport[1]||i)+"px").style("overflow","auto"),
c.canvas.Renderer.RETINA=u.render.retina,n._renderer=(n._renderer||new this._io.Renderer(u.load)).initialize(t,r,i,a).background(o),e=n._handler,n._handler=(new this._io.Handler).initialize(t,a,n),e?e.handlers().forEach(function(t){n._handler.on(t.type,t.handler)}):n._detach=h(this),this._repaint=!0,this):this},m.destroy=function(){this._detach&&this._detach()},m.update=function(t){t=t||{};var e=this,n=this._model,r=this._streamer,i=this._changeset,a=t.duration?new g(t.duration,t.ease):null;if(a&&(i.trans=a),void 0!==t.props){if(u.keys(i.data).length>0)throw Error("New data values are not reflected in the visualization. Please call view.update() before updating a specified property set.");i.reflow=!0,i.request=t.props}var s=e._build;return e._build=e._build||o.call(this),t.items&&s?(p.update(n,t.trans,t.props,t.items,i.dirty),e._renderNode.evaluate(i)):r.listeners().length&&s?(this._repaint&&r.addListener(n.node()),n.propagate(i,r,null,this._skipSignals),r.disconnect()):n.fire(i),e._changeset=l.ChangeSet.create(),e.autopad(t)},m.toImageURL=function(t){var e,n=this;switch(t||"png"){case"canvas":case"png":e=c.canvas.Renderer;break;case"svg":e=c.svg.string.Renderer;break;default:throw Error("Unrecognized renderer type: "+t)}var r=c.canvas.Renderer.RETINA;c.canvas.Renderer.RETINA=!1;var i=new e(n._model.config.load).initialize(null,n._width,n._height,n._padding).background(n._bgcolor).render(n._model.scene());if(c.canvas.Renderer.RETINA=r,"svg"===t){var a=new Blob([i.svg()],{type:"image/svg+xml"});return window.URL.createObjectURL(a)}return i.canvas().toDataURL("image/png")},m.render=function(t){return this._renderer.render(this._model.scene(),t),this},m.on=function(){return this._handler.on.apply(this._handler,arguments),this},m.onSignal=function(t,e){var n=this._model.signal(t);return n?n.on(e):d.error('Signal "'+t+'" is not defined.'),this},m.off=function(){return this._handler.off.apply(this._handler,arguments),this},m.offSignal=function(t,e){var n=this._model.signal(t);return n?n.off(e):d.error('Signal "'+t+'" is not defined.'),this},r.factory=function(e){var n=t("./HeadlessView");return function(t){t=t||{};var i=e.defs(),a=(t.el?new r:new n).model(e).renderer(t.renderer||"canvas").width(i.width).height(i.height).background(i.background).padding(i.padding).viewport(i.viewport).initialize(t.el);return t.data&&a.data(t.data),t.el&&(t.hover!==!1&&a.on("mouseover",function(t,e){e&&e.hasPropertySet("hover")&&this.update({props:"hover",items:e})}).on("mouseout",function(t,e){e&&e.hasPropertySet("hover")&&this.update({props:"update",items:e})}),t.cursor!==!1&&a.onSignal("cursor",function(t,e){var n=s.select("body");u.isString(e)?(a._cursor="default"===e,n.style("cursor",e)):u.isObject(e)&&a._cursor&&n.style("cursor",e.default)})),a}},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../parse/streams":107,"../scene/Encoder":111,"../scene/Transition":114,"./HeadlessView":88,datalib:26,"vega-dataflow":41,"vega-logging":48,"vega-scenegraph":49}],91:[function(t,e,n){(function(t){var n="undefined"!=typeof window?window.d3:"undefined"!=typeof t?t.d3:null,r={};r.load={baseURL:"",domainWhiteList:!1},r.autopadInset=5,r.scale={time:n.time.scale,utc:n.time.scale.utc},r.render={retina:!0},r.scene={fill:void 0,fillOpacity:void 0,stroke:void 0,strokeOpacity:void 0,strokeWidth:void 0,strokeDash:void 0,strokeDashOffset:void 0},r.axis={layer:"back",ticks:10,padding:3,axisColor:"#000",axisWidth:1,gridColor:"#000",gridOpacity:.15,tickColor:"#000",tickLabelColor:"#000",tickWidth:1,tickSize:6,tickLabelFontSize:11,tickLabelFont:"sans-serif",titleColor:"#000",titleFont:"sans-serif",titleFontSize:11,titleFontWeight:"bold",titleOffset:"auto",titleOffsetAutoMin:30,titleOffsetAutoMax:1e4,titleOffsetAutoMargin:4},r.legend={orient:"right",offset:20,padding:3,margin:2,gradientStrokeColor:"#888",gradientStrokeWidth:1,gradientHeight:16,gradientWidth:100,labelColor:"#000",labelFontSize:10,labelFont:"sans-serif",labelAlign:"left",labelBaseline:"middle",labelOffset:8,symbolShape:"circle",symbolSize:50,symbolColor:"#888",symbolStrokeWidth:1,titleColor:"#000",titleFont:"sans-serif",titleFontSize:11,titleFontWeight:"bold"},r.color={rgb:[128,128,128],lab:[50,0,0],hcl:[0,0,50],hsl:[0,0,.5]},r.range={category10:n.scale.category10().range(),category20:n.scale.category20().range(),category20b:n.scale.category20b().range(),category20c:n.scale.category20c().range(),shapes:["circle","cross","diamond","square","triangle-down","triangle-up"]},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],92:[function(t,e,n){function r(t,e,n){var r=t.schema;r&&(r.refs&&i.extend(n.refs,r.refs),r.defs&&i.extend(n.defs,r.defs))}var i=t("datalib"),a=t("../parse"),o=t("../scene/Scale"),s=t("./config");e.exports=function(t){var e=null;return t=t||{},t.url?e=i.json(i.extend({url:t.url},s.load)):(e={$schema:"http://json-schema.org/draft-04/schema#",title:"Vega Visualization Specification Language",defs:{},refs:{},$ref:"#/defs/spec"},i.keys(a).forEach(function(n){r(a[n],t,e)}),r(o,t,e)),t.properties&&i.keys(t.properties).forEach(function(n){e.defs.propset.properties[n]={$ref:"#/refs/"+t.properties[n]+"Value"}}),t.propertySets&&i.keys(t.propertySets).forEach(function(t){e.defs.mark.properties.properties.properties[t]={$ref:"#/defs/propset"}}),e}},{"../parse":97,"../scene/Scale":113,"./config":91,datalib:26}],93:[function(t,e,n){function r(t,e,n,r){var o=a(t);(e||[]).forEach(function(e,a){n[a]=n[a]||s(t,o[e.type]),i(o[e.type],e,a,n[a],r)})}function i(t,e,n,r,i){var a;void 0!==e.scale&&r.scale(a=i.scale(e.scale));var s=t.grid;o.isObject(s)&&(t.grid=void 0!==s[a.type]?s[a.type]:s.default),r.orient(u(e,t,"orient",l[e.type])),r.offset(u(e,t,"offset",0)),r.layer(u(e,t,"layer","front")),r.grid(u(e,t,"grid",!1)),r.title(e.title||null),r.titleOffset(u(e,t,"titleOffset")),r.tickValues(e.values||null),r.tickFormat(e.format||null),r.tickFormatType(e.formatType||null),r.tickSubdivide(e.subdivide||0),r.tickPadding(u(e,t,"tickPadding",t.padding));var c=u(e,t,"tickSize"),d=[c,c,c];d[0]=u(e,t,"tickSizeMajor",d[0]),d[1]=u(e,t,"tickSizeMinor",d[1]),d[2]=u(e,t,"tickSizeEnd",d[2]),d.length&&r.tickSize.apply(r,d),r.tickCount(u(e,t,"ticks"));var f=e.properties;f&&f.ticks?(r.majorTickProperties(f.majorTicks?o.extend({},f.ticks,f.majorTicks):f.ticks),r.minorTickProperties(f.minorTicks?o.extend({},f.ticks,f.minorTicks):f.ticks)):(r.majorTickProperties(f&&f.majorTicks||{}),r.minorTickProperties(f&&f.minorTicks||{})),r.tickLabelProperties(f&&f.labels||{}),r.titleProperties(f&&f.title||{}),r.gridLineProperties(f&&f.grid||{}),r.domainProperties(f&&f.axis||{})}function a(t){var e=t.config(),n=e.axis;return{x:o.extend(o.duplicate(n),e.axis_x),y:o.extend(o.duplicate(n),e.axis_y)}}var o=t("datalib"),s=t("../scene/axis"),u=t("../util/theme-val"),l={x:"bottom",y:"left",top:"top",bottom:"bottom",left:"left",right:"right"};e.exports=r},{"../scene/axis":115,"../util/theme-val":149,datalib:26}],94:[function(t,e,n){(function(t){function n(t){return null==t?null:r.rgb(t)+""}var r="undefined"!=typeof window?window.d3:"undefined"!=typeof t?t.d3:null;e.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],95:[function(t,e,n){function r(t,e,n){function o(t,e){a.error("PARSE DATA FAILED: "+e.name+" "+t),l=-1,n(t)}function s(e){return function(r,a){if(r)o(r,e);else if(l>0)try{t.data(e.name).values(i.read(a,e.format)),0===--l&&n()}catch(t){o(t,e)}}}var u=t.config(),l=0;return(e||[]).forEach(function(e){e.url&&(l+=1,i.load(i.extend({url:e.url},u.load),s(e)));try{r.datasource(t,e)}catch(t){o(t,e)}}),0===l&&setTimeout(n,1),e}var i=t("datalib"),a=t("vega-logging"),o=t("./transforms"),s=t("./modify");r.datasource=function(t,e){var n=(e.transform||[]).map(function(e){return o(t,e)}),r=(e.modify||[]).map(function(n){return s(t,n,e)}),a=t.data(e.name,r.concat(n));return e.values?a.values(i.read(e.values,e.format)):e.source&&(a.source(e.source).addListener(a),t.removeListener(a.pipeline()[0])),a},e.exports=r},{"./modify":101,"./transforms":108,datalib:26,"vega-logging":48}],96:[function(t,e,n){function r(t){return function(e){e=e.map(t);var n=e.length;if(n<1||n>2)throw Error("open takes exactly 1 or 2 arguments.");return"this.defs.open(this.model, "+e[0]+(n>1?","+e[1]:"")+")"}}function i(t,e,n){if("undefined"==typeof window||!window||!window.open)throw Error("Open function can only be invoked in a browser.");var r=p.extend({type:"open",url:e,name:n},t.config().load),i=p.load.sanitizeUrl(r);if(!i)throw Error("Invalid URL: "+r.url);window.open(i,n)}function a(t,e){return function(n){n=n.map(t);var r=n.length;if(r<2||r>3)throw Error("scale takes exactly 2 or 3 arguments.");return"this.defs.scale(this.model, "+e+", "+n[0]+","+n[1]+(r>2?","+n[2]:"")+")"}}function o(t,e,n,r,i){if(i&&i.scale||(i=i&&i.mark?i.mark.group:t.scene().items[0]),t.group(i._id)!==i)throw Error('Scope for scale "'+n+'" is not a valid group item.');var a=i.scale(n);return a?e?a.invert(r):a(r):r}function s(t,e,n,r){var i=e,a=n;return e>n&&(i=n,a=e),r?i<t&&a>t:i<=t&&a>=t}function u(t){return function(e,n,r,i){var a;if(3!==e.length)throw Error("indata takes 3 arguments.");if("Literal"!==e[0].type)throw Error("Data source name must be a literal for indata.");return a=e[0].value,i[a]=1,"Literal"===e[2].type&&u.model.requestIndex(a,e[2].value),e=e.map(t),"this.defs.indata(this.model,"+e[0]+","+e[1]+","+e[2]+")"}}function l(t,e,n,r){var i=t.data(e),a=i.getIndex(r);return a[n]>0}function c(t,e){return g.format(t,"number")(e)}function d(t,e){return g.format(t,"time")(e)}function f(t,e){return g.format(t,"utc")(e)}function h(t){return function(e){u.model=t;var n=y(e);return n.model=t,n.sig=t?t._signals:{},n}}var p=t("datalib"),g=p.template,m=t("vega-expression"),v=["datum","parent","event","signals"],y=m.compiler(v,{idWhiteList:v,fieldVar:v[0],globalVar:function(t){return"this.sig["+p.str(t)+"]._value"},functions:function(t){var e=m.functions(t);return e.eventItem="event.vg.getItem",e.eventGroup="event.vg.getGroup",e.eventX="event.vg.getX",e.eventY="event.vg.getY",e.open=r(t),e.scale=a(t,!1),e.iscale=a(t,!0),e.inrange="this.defs.inrange",e.indata=u(t),e.format="this.defs.format",e.timeFormat="this.defs.timeFormat",e.utcFormat="this.defs.utcFormat",e},functionDefs:function(){return{scale:o,inrange:s,indata:l,format:c,timeFormat:d,utcFormat:f,open:i}}});h.scale=o,h.codegen=y.codegen,e.exports=h},{datalib:26,"vega-expression":46}],97:[function(t,e,n){e.exports={axes:t("./axes"),background:t("./background"),data:t("./data"),events:t("vega-event-selector"),expr:t("./expr"),legends:t("./legends"),mark:t("./mark"),marks:t("./marks"),modify:t("./modify"),padding:t("./padding"),predicates:t("./predicates"),properties:t("./properties"),signals:t("./signals"),spec:t("./spec"),streams:t("./streams"),transforms:t("./transforms")}},{"./axes":93,"./background":94,"./data":95,"./expr":96,"./legends":98,"./mark":99,"./marks":100,"./modify":101,"./padding":102,"./predicates":103,"./properties":104,"./signals":105,"./spec":106,"./streams":107,"./transforms":108,"vega-event-selector":42}],98:[function(t,e,n){function r(t,e,n,r){(e||[]).forEach(function(e,o){n[o]=n[o]||a(t),i(e,o,n[o],r)})}function i(t,e,n,r){n.size(t.size?r.scale(t.size):null),n.shape(t.shape?r.scale(t.shape):null),n.fill(t.fill?r.scale(t.fill):null),n.stroke(t.stroke?r.scale(t.stroke):null),n.opacity(t.opacity?r.scale(t.opacity):null),t.orient&&n.orient(t.orient),null!=t.offset&&n.offset(t.offset),n.title(t.title||null),n.values(t.values||null),n.format(void 0!==t.format?t.format:null),n.formatType(t.formatType||null);var i=t.properties;n.titleProperties(i&&i.title||{}),n.labelProperties(i&&i.labels||{}),n.legendProperties(i&&i.legend||{}),n.symbolProperties(i&&i.symbols||{}),n.gradientProperties(i&&i.gradient||{})}var a=t("../scene/legend");e.exports=r},{"../scene/legend":116}],99:[function(t,e,n){function r(t,e,n){var o=e.properties||n&&(e.properties={}),s=o.enter||n&&(o.enter={}),u=e.marks,l=t.config().marks||{};if(n){"symbol"===e.type&&!s.size&&l.symbolSize&&(s.size={value:l.symbolSize});var c={arc:"fill",area:"fill",rect:"fill",symbol:"fill",text:"fill",line:"stroke",path:"stroke",rule:"stroke"},d=c[e.type];!s[d]&&l.color&&(s[d]={value:l.color})}return i.keys(o).forEach(function(n){o[n]=a(t,e.type,o[n])}),e.delay&&(e.delay=a(t,e.type,{delay:e.delay})),u&&(e.marks=u.map(function(e){return r(t,e,!0)})),e}var i=t("datalib"),a=t("./properties");e.exports=r},{"./properties":104,datalib:26}],100:[function(t,e,n){function r(t,e,n,r){return{type:"group",width:n,height:r,properties:i(e.scene||{},t),scales:e.scales||[],axes:e.axes||[],legends:e.legends||[],marks:(e.marks||[]).map(function(e){return a(t,e,!0)})}}function i(t,e){var n,r,i,a,u,l=e.config().scene,c={};for(n=0,r=i=s.length;n<r;++n)a=s[n],void 0!==(u=t[a])?c[a]=u.signal?u:{value:u}:l[a]?c[a]={value:l[a]}:--i;return i?{update:o(e,"group",c)}:{}}var a=t("./mark"),o=t("./properties"),s=["fill","fillOpacity","stroke","strokeOpacity","strokeWidth","strokeDash","strokeDashOffset"];e.exports=r},{"./mark":99,"./properties":104}],101:[function(t,e,n){function r(t,e,n,r){var i,a,o,s,u=!0,l=t.length;for(i=n.length-1;i>=0;--i){for(a=0;a<l;++a)if(o=t[a],s=e&&o(e)||e,o(n[i])!==s){u=!1;break}u&&r.push.apply(r,n.splice(i,1)),u=!0}}function i(t,e,n){var r=c.ingest(e);t.add.push(r),n._data.push(r)}function a(t,e,n){var a=e.signal?o.field(e.signal):null,u=a?a[0]:null,p=e.predicate?t.predicate(e.predicate.name||e.predicate):null,g=e.test?t.expr(e.test):null,m=null===p&&null===g,v=e.type===f.CLEAR,y=o.array(e.field||"data"),_=y.map(o.accessor),b=y.map(o.mutator),x=new l(t).router(v);return x.evaluate=function(l){var x,w;if(null!==p&&(x=t.values(d.DATA,p.data||h),w=t.values(d.SIGNALS,p.signals||h),m=p.call(p,{},x,w,t._predicates)),null!==g&&(w=t.values(d.SIGNALS,g.globals||h),m=g.fn()),s.debug(l,[e.type+"ing",m]),!m||!v&&!l.signals[u])return l;var k,M=a?t.signalRef(e.signal):null,S=t.data(n.name),T=null,E=[],A=[],L=0;return o.isObject(M)?(k=M,e.field||(y=o.keys(k),_=y.map(o.accessor),b=y.map(o.mutator))):(k={},b.forEach(function(t){t(k,M)})),e.type===f.INSERT?i(l,k,S):e.type===f.REMOVE?(r(_,M,l.mod,l.rem),r(_,M,l.add,A),r(_,M,S._data,A)):e.type===f.UPSERT?(l.mod.forEach(function(t){var e=_.every(function(e){return e(t)===e(k)});e&&(o.extend(t,k),L+=1)}),0===L&&i(l,k,S)):e.type===f.TOGGLE?(r(_,M,l.mod,A),l.rem.push.apply(l.rem,A),r(_,M,l.add,E),E.length||A.length?S._data=S._data.filter(function(t){return A.indexOf(t)<0&&E.indexOf(t)<0}):(l.add.push(T=c.ingest(k)),S._data.push(T))):e.type===f.CLEAR&&(l.rem.push.apply(l.rem,l.mod.splice(0)),l.add.splice(0),S._data.splice(0)),y.forEach(function(t){l.fields[t]=1}),l},u&&x.dependency(d.SIGNALS,u),p&&(x.dependency(d.DATA,p.data),x.dependency(d.SIGNALS,p.signals)),g&&(x.dependency(d.SIGNALS,g.globals),x.dependency(d.DATA,g.dataSources)),x}var o=t("datalib"),s=t("vega-logging"),u=t("vega-dataflow"),l=u.Node,c=u.Tuple,d=u.Dependencies,f={INSERT:"insert",REMOVE:"remove",UPSERT:"upsert",TOGGLE:"toggle",CLEAR:"clear"},h=[];e.exports=a},{datalib:26,"vega-dataflow":41,"vega-logging":48}],102:[function(t,e,n){function r(t){return null==t?"auto":i.isObject(t)?t:i.isNumber(t)?{top:t,left:t,right:t,bottom:t}:"strict"===t?t:"auto"}var i=t("datalib");e.exports=r},{datalib:26}],103:[function(t,e,n){function r(t,e){return(e||[]).forEach(function(e){var n=d[e.type](t,e),r=Function("args","db","signals","predicates",n.code);r.root=function(){return t.scene().items[0]},r.nullScale=f,r.isFunction=c.isFunction,r.signals=n.signals,r.data=n.data,t.predicate(e.name,r)}),e}function i(t,e){var n=c.field(t),r="signals["+n.map(c.str).join("][")+"]";return e[n[0]]=1,r}function a(t,e){function n(t){s[t]=1}function r(t){u[t]=1}var a=[],o=[],s={},u={};return c.array(e).forEach(function(e,u){var l="o"+u,d="";if(void 0!==e.value)d=c.str(e.value);else if(e.arg)d="args["+c.str(e.arg)+"]";else if(e.signal)d=i(e.signal,s);else if(e.predicate){var f=e.predicate,h=f&&(f.name||f),p=t.predicate(h),g="predicates["+c.str(h)+"]";p.signals.forEach(n),p.data.forEach(r),c.isObject(f)&&c.keys(f).forEach(function(t){if("name"!==t){var e=f[t];d+="args["+c.str(t)+"] = ",e.signal?d+=i(e.signal,s):e.arg&&(d+="args["+c.str(e.arg)+"]"),d+=", "}}),d+=g+".call("+g+", args, db, signals, predicates)"}a.push(l),o.push(l+"=("+d+")")}),{code:"var "+a.join(", ")+";\n"+o.join(";\n")+";\n",signals:c.keys(s),data:c.keys(u)}}function o(t,e){var n=a(t,e.operands);return"="===e.type&&(e.type="=="),n.code+="o0 = o0 instanceof Date ? o0.getTime() : o0;\no1 = o1 instanceof Date ? o1.getTime() : o1;\n",{code:n.code+"return "+["o0","o1"].join(e.type)+";",signals:n.signals,data:n.data}}function s(t,e){for(var n=a(t,e.operands),r=[],i=0,o=e.operands.length;r.push("o"+i++)<o;);return"and"===e.type?e.type="&&":"or"===e.type&&(e.type="||"),{code:n.code+"return "+r.join(e.type)+";",signals:n.signals,data:n.data}}function u(t,e){var n=[e.item],r="";e.range&&n.push.apply(n,e.range),e.scale&&(r=l(e.scale,n));var i=a(t,n);if(r=i.code+r+"\n  var ordSet = null;\n",e.data){var o=c.field(e.field).map(c.str);r+="var where = function(d) { return d["+o.join("][")+"] == o0 };\n",r+="return db["+c.str(e.data)+"].filter(where).length > 0;"}else e.range&&(e.scale&&(r+="if (scale.length == 2) {\n  ordSet = scale(o1, o2);\n} else {\n  o1 = scale(o1);\no2 = scale(o2);\n}"),r+="return ordSet !== null ? ordSet.indexOf(o0) !== -1 :\n  o1 < o2 ? o1 <= o0 && o0 <= o2 : o2 <= o0 && o0 <= o1;");return{code:r,signals:i.signals,data:i.data.concat(e.data?[e.data]:[])}}function l(t,e){var n="var scale = ",r=e.length;return c.isString(t)?(e.push({value:t}),n+="this.root().scale(o"+r+")"):t.arg?(e.push(t),n+="o"+r):t.name&&(e.push(c.isString(t.name)?{value:t.name}:t.name),n+="(this.isFunction(o"+r+") ? o"+r+" : ",t.scope?(e.push(t.scope),n+="((o"+(r+1)+".scale || this.root().scale)(o"+r+") || this.nullScale)"):n+="this.root().scale(o"+r+")",n+=")"),t.invert===!0&&(n+=".invert"),n+";\n"}var c=t("datalib"),d={"=":o,"==":o,"!=":o,">":o,">=":o,"<":o,"<=":o,and:s,"&&":s,or:s,"||":s,in:u},f=function(){return 0};f.invert=f,e.exports=r},{datalib:26}],104:[function(t,e,n){(function(n){function r(t,e,n){function r(t){if(null!=v[t]){var e,n,r=h.array(v[t]);for(e=0,n=r.length;e<n;++e)k[t][r[e]]=1}}function i(t){var e=(t.parent?"parent_":"group_")+t.level;k._nRefs[e]=t}var l,c,d,v,y=t.config(),_="",b=h.keys(n),x=[],w={},k={signals:{},scales:{},data:{},fields:{},nested:[],_nRefs:{},reflow:!1};for(_+="var o = trans ? {} : item, d=0, exprs=this.exprs, set=this.tpl.set, tmpl=signals||{}, t;\ntmpl.datum  = item.datum;\ntmpl.group  = group;\ntmpl.parent = group.datum;\n",o(t,y,n),l=0,c=b.length;l<c;++l)v=n[d=b[l]],_+=l>0?"\n  ":"  ",v.rule?(v=s(t,d,v.rule,x),_+="\n  "+v.code):h.isArray(v)?(v=s(t,d,v,x),_+="\n  "+v.code):(v=u(y,d,v),_+="d += set(o, "+h.str(d)+", "+v.val+");"),w[d]=!0,m.forEach(r),k.reflow=k.reflow||v.reflow,v.nested.length&&v.nested.forEach(i);h.keys(k._nRefs).forEach(function(t){k.nested.push(k._nRefs[t])}),k.nested.sort(function(t,e){return t=t.level,e=e.level,t<e?-1:t>e?1:t>=e?0:NaN}),w.x2&&(w.x?(_+="\n  if (o.x > o.x2) { \n    t = o.x;\n    d += set(o, 'x', o.x2);\n    d += set(o, 'x2', t); \n  };",_+="\n  d += set(o, 'width', (o.x2 - o.x));"):_+=w.width?"\n  d += set(o, 'x', (o.x2 - o.width));":"\n  d += set(o, 'x', o.x2);"),w.xc&&(_+=w.width?"\n  d += set(o, 'x', (o.xc - o.width/2));":"\n  d += set(o, 'x', o.xc);"),w.y2&&(w.y?(_+="\n  if (o.y > o.y2) { \n    t = o.y;\n    d += set(o, 'y', o.y2);\n    d += set(o, 'y2', t);\n  };",_+="\n  d += set(o, 'height', (o.y2 - o.y));"):_+=w.height?"\n  d += set(o, 'y', (o.y2 - o.height));":"\n  d += set(o, 'y', o.y2);"),w.yc&&(_+=w.height?"\n  d += set(o, 'y', (o.yc - o.height/2));":"\n  d += set(o, 'y', o.yc);"),a(e,w)&&(_+="\n  d += (item.touch(), 1);"),_+="\n  if (trans) trans.interpolate(item, o);",_+="\n  return d > 0;";try{var M=Function("item","group","trans","db","signals","predicates",_);return M.tpl=g,M.exprs=x,M.util=h,M.d3=f,h.extend(M,h.template.context),{encode:M,signals:h.keys(k.signals),scales:h.keys(k.scales),data:h.keys(k.data),fields:h.keys(k.fields),nested:k.nested,reflow:k.reflow}}catch(t){p.error(t),p.log(_)}}function i(t,e){return h.isObject(t)||(t={reflow:!1,nested:[]},m.forEach(function(e){t[e]=[]})),h.isObject(e)&&(t.reflow=t.reflow||e.reflow,t.nested.push.apply(t.nested,e.nested),m.forEach(function(n){t[n].push.apply(t[n],e[n])})),t}function a(t,e){return e.path||("area"===t||"line"===t)&&(e.x||e.x2||e.width||e.y||e.y2||e.height||e.tension||e.interpolate)}function o(t,e,n){var r,i,a=n.shape,o=0;if(a&&(r=a.value)){for(e.shape&&e.shape[r]&&(r=e.shape[r]),a="";null!==(i=v.exec(r));)a+=r.substring(o,i.index),a+=t.expr(i[1]).fn(),o=v.lastIndex;n.shape.value=a+r.substring(o)}}function s(t,e,n,r){var a=t.config(),o=i(),s=[],l="";return(n||[]).forEach(function(c,d){var f=u(a,e,c);if(i(o,f),c.test){var p=t.expr(c.test);o.signals.push.apply(o.signals,p.globals),o.data.push.apply(o.data,p.dataSources),l+="if (exprs["+r.length+"](item.datum, item.mark.group.datum, null)) {\n    d += set(o, "+h.str(e)+", "+f.val+");",l+=n[d+1]?"\n  } else ":"  }",r.push(p.fn)}else{var g=c.predicate,m=g&&(g.name||g),v=t.predicate(m),y="predicates["+h.str(m)+"]",_=[],b=e+"_arg"+d;h.isObject(g)&&h.keys(g).forEach(function(t){if("name"!==t){var e=u(a,d,g[t],!0);_.push(h.str(t)+": "+e.val),i(o,e)}}),m?(o.signals.push.apply(o.signals,v.signals),o.data.push.apply(o.data,v.data),s.push(b+" = {\n    "+_.join(",\n    ")+"\n  }"),l+="if ("+y+".call("+y+","+b+", db, signals, predicates)) {\n    d += set(o, "+h.str(e)+", "+f.val+");",l+=n[d+1]?"\n  } else ":"  }"):l+="{\n    d += set(o, "+h.str(e)+", "+f.val+");\n  }\n"}}),s.length&&(l="var "+s.join(",\n      ")+";\n  "+l),o.code=l,o}function u(t,e,n,r){if(null==n)return null;if("fill"===e||"stroke"===e){if(n.c)return l(t,"hcl",n.h,n.c,n.l);if(n.h||n.s)return l(t,"hsl",n.h,n.s,n.l);if(n.l||n.a)return l(t,"lab",n.l,n.a,n.b);if(n.r||n.g||n.b)return l(t,"rgb",n.r,n.g,n.b)}var a=null,o=null,s=i(),u=null,f=null,p=null,g={};return void 0!==n.template&&(a=h.template.source(n.template,"tmpl",g),h.keys(g).forEach(function(t){var e=h.field(t),n=e.shift();"parent"===n||"group"===n?s.nested.push({parent:"parent"===n,group:"group"===n,level:1}):"datum"===n?s.fields.push(e[0]):s.signals.push(n)})),void 0!==n.value&&(a=h.str(n.value)),void 0!==n.signal&&(u=h.field(n.signal),a="signals["+u.map(h.str).join("][")+"]",s.signals.push(u.shift())),void 0!==n.field&&(n.field=h.isString(n.field)?{datum:n.field}:n.field,f=c(n.field),a=f.val,i(s,f)),void 0!==n.scale&&(p=d(n.scale),o=p.val,i(s,p),s.scales.push(n.scale.name||n.scale),null!==a||n.band||n.mult||n.offset||!r?a=o+(n.band?".rangeBand()":"("+(null!==a?a:"item.datum.data")+")"):r&&(a=o)),a="("+(n.mult?h.number(n.mult)+" * ":"")+a+")"+(n.offset?" + "+h.number(n.offset):""),s.val=a,s}function l(t,e,n,r,a){var o=n?u(t,"",n):t.color[e][0],s=r?u(t,"",r):t.color[e][1],l=a?u(t,"",a):t.color[e][2],c=i();[o,s,l].forEach(function(t){h.isArray||i(c,t)});var d="(this.d3."+e+"("+[o.val,s.val,l.val].join(",")+') + "")';return c.val=d,c}function c(t){if(h.isString(t))return{val:h.field(t).map(h.str).join("][")};var e=t.level||1,n=(t.group||t.parent)&&e,r=n?Array(e).join("group.mark."):"",a=c(t.datum||t.group||t.parent||t.signal),o=a.val,s=i(null,a);return t.datum?(o="item.datum["+o+"]",s.fields.push(t.datum)):t.group?(o=r+"group["+o+"]",s.nested.push({level:e,group:!0})):t.parent?(o=r+"group.datum["+o+"]",s.nested.push({level:e,parent:!0})):t.signal&&(o="signals["+o+"]",s.signals.push(h.field(t.signal)[0]),s.reflow=!0),s.val=o,s}function d(t){var e=null,n=null,r=i();return e=h.isString(t)?h.str(t):t.name?h.isString(t.name)?h.str(t.name):(n=c(t.name)).val:(n=c(t)).val,e="(item.mark._scaleRefs["+e+"] = 1, group.scale("+e+"))",t.invert&&(e+=".invert"),n&&n.nested.forEach(function(t){t.scale=!0}),n?(n.val=e,n):(r.val=e,r)}var f="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,h=t("datalib"),p=t("vega-logging"),g=t("vega-dataflow").Tuple,m=["signals","scales","data","fields"],v=/{{(.*?)}}/g;e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{datalib:26,"vega-dataflow":41,"vega-logging":48}],105:[function(t,e,n){function r(t,e){return(e||[]).forEach(function(e){if(u.indexOf(e.name)!==-1)throw Error('Signal name "'+e.name+'" is a reserved keyword ('+u.join(", ")+").");var n=t.signal(e.name,e.init).verbose(e.verbose);e.init&&e.init.expr&&(e.init.expr=t.expr(e.init.expr),n.value(i(t,e.init))),e.expr&&(e.expr=t.expr(e.expr),n.evaluate=function(r){var a=i(t,e),o=r.signals;return(a!==n.value()||n.verbose())&&(n.value(a),o[e.name]=1),o[e.name]?r:t.doNotPropagate},n.dependency(s,e.expr.globals),e.expr.globals.forEach(function(e){t.signal(e).addListener(n)}))}),e}function i(t,e){var n=e.expr,i=n.fn();return e.scale?r.scale(t,e,i):i}var a=t("datalib"),o=t("./expr"),s=t("vega-dataflow").Dependencies.SIGNALS,u=["datum","event","signals","width","height","padding"].concat(a.keys(o.codegen.functions));r.scale=function(t,e,n,r,i){var s,u=e.scale,l=u.name||u.signal||u,c=u.scope;return c&&(c.signal?c=t.signalRef(c.signal):a.isString(c)&&(s=u._expr=u._expr||t.expr(c),c=s.fn(r,i))),o.scale(t,u.invert,l,n,c)},e.exports=r},{"./expr":96,datalib:26,"vega-dataflow":41}],106:[function(t,e,n){function r(e){function n(e){try{e=i.duplicate(e);var n=t("./"),a=o(e,c,"width",500),s=o(e,c,"height",500),u=n.padding(o(e,c,"padding")),d=o(e,c,"background");p.signal("width",a),p.signal("height",s),p.signal("padding",u),r(e),p.defs({width:a,height:s,padding:u,viewport:e.viewport||null,background:n.background(d),signals:n.signals(p,e.signals),predicates:n.predicates(p,e.predicates),marks:n.marks(p,e,a,s),data:n.data(p,e.data,l)})}catch(t){l(t)}}function r(t){var e,n=t.signals||(t.signals=[]);n.some(function(t){return"cursor"===t.name&&(e=t,!0)}),e||n.push(e={name:"cursor",streams:[]}),e.init=e.init||{},e.streams.unshift({type:"mousemove",expr:"eventItem().cursor === cursor.default ? cursor : {default: eventItem().cursor}"})}function l(t){var e;t?a.error(t):e=g(p.buildIndexes()),h&&(h.length>1?h(t,e):t||h(e),h=null)}var c,d=arguments.length,f=2,h=arguments[d-1],p=new s,g=u.factory;if(d>f&&i.isFunction(arguments[d-f])&&(g=arguments[d-f],++f),d>f&&i.isObject(arguments[d-f])&&p.config(arguments[d-f]),c=p.config(),i.isObject(e))n(e);else if(i.isString(e)){var m=i.extend({url:e},c.load);i.json(m,function(t,e){t?l("SPECIFICATION LOAD FAILED: "+t):n(e)})}else l("INVALID SPECIFICATION: Must be a valid JSON object or URL.")}var i=t("datalib"),a=t("vega-logging"),o=t("../util/theme-val"),s=t("../core/Model"),u=t("../core/View");e.exports=r},{"../core/Model":89,"../core/View":90,"../util/theme-val":149,"./":97,datalib:26,"vega-logging":48}],107:[function(t,e,n){(function(n){function r(t){function e(e,n){var r,a,o,s=i.mouse((i.event=e,t.renderer().scene())),u=t.padding(),l={};if(n)for(r=n.mark,a="group"===r.marktype?n:r.group,o=n;null!=o;o=o.mark.group)o.mark.def.name&&(l[o.mark.def.name]=o);l.root=t.model().scene().items[0],e.vg=Object.create(d),e.vg.group=a,e.vg.item=n||{},e.vg.name=l,e.vg.x=s[0]-u.left,e.vg.y=s[1]-u.top}function n(t,e,n,r,i){function a(t){return!t.fn(n,r,i)}var s,l,c,d,f=t.handlers[e],h=t.nodes[e],p=o.ChangeSet.create(null,!0),m=!1;for(l=0,c=f.length;l<c;++l)d=f[l],m=d.filters.some(a),m||(s=d.exp.fn(n,r,i),d.spec.scale&&(s=u.scale(g,d.spec,s,n,i)),(s!==d.signal.value()||d.signal.verbose())&&(d.signal.value(s),p.signals[d.signal.name()]=1));g.propagate(p,h)}function r(t,e,n,i){e.forEach(function(e){e.event?f(t,e,n,i):e.signal?h(t,e,n,i):e.start?p(t,e,n,i):e.stream&&(e.filters&&e.stream.forEach(function(t){t.filters=a.array(t.filters).concat(e.filters)}),r(t,e.stream,n,i))})}function f(t,e,n,r){var i=e.event,s=e.name,u=e.mark,l=e.target,c=a.array(e.filters),d=l?x:b,f=l?l+":"+i:i,h=d.nodes[f]||(d.nodes[f]=new o.Node(g)),p=d.handlers[f]||(d.handlers[f]=[]);s?c.push('!!event.vg.name["'+s+'"]'):u&&c.push("event.vg.item.mark && event.vg.item.mark.marktype==="+a.str(u)),p.push({signal:t,exp:n,spec:r,filters:c.map(function(t){return g.expr(t)})}),h.addListener(t)}function h(t,e,n,r){var i=t.name(),a=g.signal(i+c,null);a.evaluate=function(a){if(!a.signals[e.signal])return g.doNotPropagate;var o=n.fn();return r.scale&&(o=u.scale(g,r,o)),(o!==t.value()||t.verbose())&&(t.value(o),a.signals[i]=1,a.reflow=!0),a},a.dependency(o.Dependencies.SIGNALS,e.signal),a.addListener(t),g.signal(e.signal).addListener(a)}function p(t,e,n,i){var a=t.name(),o=a+l,s=e.middle,u=s.filters||(s.filters=[]),c=g.signal(o)||g.signal(o,!1);r(c,[e.start],m,{}),r(c,[e.end],v,{}),u.push(c.name()),r(t,[e.middle],n,i)}var g=t.model(),m=g.expr("true"),v=g.expr("false"),y=g.defs().signals,_={handlers:{},nodes:{}},b=a.duplicate(_),x=a.duplicate(_);return a.array(y).forEach(function(t){var e=g.signal(t.name);t.expr||a.array(t.streams).forEach(function(t){var n=s.parse(t.type),i=g.expr(t.expr);r(e,n,i,t)})}),a.keys(b.handlers).forEach(function(r){t.on(r,function(t,i){t.preventDefault(),e(t,i),n(b,r,i&&i.datum||{},i&&i.mark&&i.mark.group&&i.mark.group.datum||{},t)})}),a.keys(x.handlers).forEach(function(t){function r(r){e(r),n(x,t,i.select(this).datum(),this.parentNode&&i.select(this.parentNode).datum(),r)}if("undefined"!=typeof window){for(var a=x.handlers[t],o=t.split(":"),s="window"===o[0]?[window]:window.document.querySelectorAll(o[0]),u=0;u<s.length;++u)s[u].addEventListener(o[1],r);a.elements=s,a.listener=r}}),x.detach=function(){a.keys(x.handlers).forEach(function(t){for(var e=x.handlers[t],n=t.split(":"),r=a.array(e.elements),i=0;i<r.length;++i)r[i].removeEventListener(n[1],e.listener)})},x.detach}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("datalib"),o=t("vega-dataflow"),s=t("vega-event-selector"),u=t("./signals"),l="_vgGATEKEEPER",c="_vgEVALUATOR",d={getItem:function(){return this.item},getGroup:function(t){var e=t?this.name[t]:this.group,n=e&&e.mark,r=n&&(n.interactive||void 0===n.interactive);return r?e:{}},getXY:function(t){var e={x:this.x,y:this.y};for("string"==typeof t&&(t=this.name[t]);t;t=t.mark&&t.mark.group)e.x-=t.x||0,e.y-=t.y||0;return e},getX:function(t){return this.getXY(t).x},getY:function(t){return this.getXY(t).y}};e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./signals":105,datalib:26,"vega-dataflow":41,"vega-event-selector":42}],108:[function(t,e,n){function r(t,e){var n,r=a[e.type];if(!r)throw new Error('"'+e.type+'" is not a valid transformation');return n=new r(t),e.output&&n.output(e.output),i.keys(e).forEach(function(t){"type"!==t&&"output"!==t&&n.param(t,e[t])}),n}var i=t("datalib"),a=t("../transforms/index");e.exports=r},{"../transforms/index":145,datalib:26}],109:[function(t,e,n){function r(t,e){return this._mark=e,s.prototype.init.call(this,t).router(!0).reflows(!0).mutates(!0)}var i=t("datalib"),a=t("vega-dataflow"),o=t("vega-scenegraph"),s=a.Node,u=t("vega-logging"),l=o.bound,c=o.Bounds,d=t("./Encoder"),f=r.prototype=new s;f.evaluate=function(t){u.debug(t,["bounds",this._mark.marktype]);var e,n,r,o,s,f,h=this._mark,p=h.marktype,g="group"===p,m=h.items,v=i.array(h.def.legends).length>0,y=h.bounds,_=!y||t.rem.length;if("line"===p||"area"===p)l.mark(h,null,g&&!v);else if(t.add.forEach(function(t){l.item(t),_=_||y&&!y.encloses(t.bounds)}),t.mod.forEach(function(t){_=_||y&&y.alignsWith(t.bounds),l.item(t)}),_)for(y=h.bounds&&h.bounds.clear()||(h.bounds=new c),e=0,n=m.length;e<n;++e)y.union(m[e].bounds);if(g&&v){for(e=0,n=m.length;e<n;++e)for(s=m[e],s._legendPositions=null,r=0,o=s.legendItems.length;r<o;++r)f=s.legendItems[r],d.update(this._graph,t.trans,"legendPosition",f.items,t.dirty),l.mark(f,null,!1);l.mark(h,null,!0)}return a.ChangeSet.create(t,!0)},e.exports=r;
},{"./Encoder":111,datalib:26,"vega-dataflow":41,"vega-logging":48,"vega-scenegraph":49}],110:[function(t,e,n){function r(){return arguments.length?this.init.apply(this,arguments):this}function i(){var t,e,n,r,i,a,o,s=this._def.from,u=s.mark;if(u)r=this.sibling(u),t=r._isSuper?r:r._bounder,e=["vg",this._parent_id,u,t.listeners(!0).length].join("_"),n={name:e,transform:s.transform,modify:s.modify};else{if(t=this._graph.data(this._from),!t)throw Error('Data source "'+this._from+'" is not defined.');e=["vg",this._from,this._def.type,t.listeners(!0).length].join("_"),n={name:e,source:this._from,transform:s.transform,modify:s.modify}}this._from=e,this._ds=_.datasource(this._graph,n),u?(o=new f(this._graph).addListener(this._ds.listener()),o.evaluate=function(t){var e=g.create(t),n=r._output;return e.add=n.add,e.mod=n.mod,e.rem=n.rem,e},t.addListener(o)):(i=this._ds.source().last(),a=g.create(i),a.add=i.add,a.mod=i.mod,a.rem=i.rem,a.stamp=null,this._graph.propagate(a,this._ds.listener(),i.stamp))}function a(){var t=p.ingest(new c(this._mark));return this._def.width&&p.set(t,"width",this._def.width),this._def.height&&p.set(t,"height",this._def.height),t}function o(t,e,n,r,i){var o,u,l,c,d,f,h,g=s(this._def.key||(r?"_id":null)),m=this._mark.items||[],v=r?t.rem:m,y=p.idMap(!r||i?n:t.mod),_=[];for(o=0,l=v.length;o<l;++o)c=v[o]===m[o]?m[o]:g?this._map[g(v[o])]:v[o],c.status=b.EXIT;for(o=0,l=n.length;o<l;++o)d=n[o],c=g?this._map[u=g(d)]:m[o],f=!c&&(c=a.call(this),!0),c.status=f?b.ENTER:b.UPDATE,h=!f&&c.datum!==d,c.datum=d,g&&(p.set(c,"key",u),this._map[u]=c),f?e.add.push(c):(h||y[d._id])&&e.mod.push(c),_.push(c);for(o=0,l=v.length;o<l;++o)c=v[o]===m[o]?m[o]:g?this._map[u=g(v[o])]:v[o],c.status===b.EXIT&&(c._dirty=!0,t.dirty.push(c),_.push(c),e.rem.push(c),g&&(this._map[u]=null));return this._mark.items=_,e}function s(t){if(null==t)return null;var e=u.array(t).map(u.accessor);return function(t){for(var n="",r=0,i=e.length;r<i;++r)r>0&&(n+="|"),n+=String(e[r](t));return n}}var u=t("datalib"),l=t("vega-logging"),c=t("vega-scenegraph").Item,d=t("vega-dataflow"),f=d.Node,h=d.Dependencies,p=d.Tuple,g=d.ChangeSet,m={},v=t("./Encoder"),y=t("./Bounder"),_=t("../parse/data"),b=r.STATUS={ENTER:"enter",UPDATE:"update",EXIT:"exit"},x=1,w=2,k=r.prototype=new f;k.init=function(t,e,n,r,a,o){return f.prototype.init.call(this,t).router(!0).collector(!0),this._def=e,this._mark=n,this._from=(e.from?e.from.data:null)||o,this._ds=u.isString(this._from)?t.data(this._from):null,this._map={},this._status=null,n.def=e,n.marktype=e.type,n.interactive=e.interactive!==!1,n.items=[],u.isValid(e.name)&&(n.name=e.name),this._parent=r,this._parent_id=a,e.from&&(e.from.mark||e.from.transform||e.from.modify)&&i.call(this),this._isSuper="group"!==this._def.type,this._encoder=new v(this._graph,this._mark,this),this._bounder=new y(this._graph,this._mark),this._output=null,this._ds&&this._encoder.dependency(h.DATA,this._from),this.dependency(h.DATA,this._encoder.dependency(h.DATA)),this.dependency(h.SCALES,this._encoder.dependency(h.SCALES)),this.dependency(h.SIGNALS,this._encoder.dependency(h.SIGNALS)),this},k.ds=function(){return this._ds},k.parent=function(){return this._parent},k.encoder=function(){return this._encoder},k.pipeline=function(){return[this]},k.connect=function(){var t=this;return this._graph.connect(this.pipeline()),this._encoder._scales.forEach(function(e){(e=t._parent.scale(e))&&e.addListener(t)}),this._parent&&(this._isSuper?this.addListener(this._parent._collector):this._bounder.addListener(this._parent._collector)),this._status=x,this},k.disconnect=function(){function t(t){for(var n,r=0,i=t.length;r<i;++r)(n=e._parent.scale(t[r]))&&n.removeListener(e)}var e=this;return this._listeners.length?(f.prototype.disconnect.call(this),this._graph.disconnect(this.pipeline()),t(this._encoder._scales),t(u.keys(this._mark._scaleRefs)),this._status=w,this):this},k.sibling=function(t){return this._parent.child(t,this._parent_id)},k.evaluate=function(t){l.debug(t,["building",this._from||this._def.from,this._def.type]);var e,n,r,i,a=this,s=this._mark.def,c=s.properties||{},d=c.update||{},f=g.create(t);if(this._ds){if(r=f.data[i=this._ds.name()],f.data[i]=null,e=this._encoder.reevaluate(f),f.data[i]=r,n=this._ds.last(),!n)throw Error("Builder evaluated before backing DataSource.");n.stamp>this._stamp?o.call(this,n,f,this._ds.values(),!0,e):e&&(f.mod=this._mark.items.slice())}else r=u.isFunction(this._def.from)?this._def.from():[m],o.call(this,t,f,r);return this._output=f=this._graph.evaluate(f,this._encoder),d.nested&&d.nested.length&&this._status===x&&u.keys(this._mark._scaleRefs).forEach(function(t){var e=a._parent.scale(t);e&&(e.addListener(a),a.dependency(h.SCALES,t),a._encoder.dependency(h.SCALES,t))}),this._isSuper&&(f.mod=f.mod.filter(function(t){return t._dirty}),f=this._graph.evaluate(f,this._bounder)),f},e.exports=r},{"../parse/data":95,"./Bounder":109,"./Encoder":111,datalib:26,"vega-dataflow":41,"vega-logging":48,"vega-scenegraph":49}],111:[function(t,e,n){function r(t,e,n){var r=e.def.properties||{},i=r.enter,a=r.update,o=r.exit;c.prototype.init.call(this,t),this._mark=e,this._builder=n;var s=this._scales=[];return i&&s.push.apply(s,i.scales),a&&(this.dependency(d.DATA,a.data),this.dependency(d.SIGNALS,a.signals),this.dependency(d.FIELDS,a.fields),this.dependency(d.SCALES,a.scales),s.push.apply(s,a.scales)),o&&s.push.apply(s,o.scales),this.mutates(!0)}function i(t,e,n,r){var i,a,o,s=n.add.length;return(i=r.enter)&&(a=i[t]).length&&s&&(o=e.values(t,a,o=o||{})),(i=r.exit)&&(a=i[t]).length&&n.rem.length&&(o=e.values(t,a,o=o||{})),(i=r.update)&&(a=i[t]).length&&(s||n.mod.length)&&(o=e.values(t,a,o=o||{})),o||h}function a(t,e,n,r,i,a,o){var s=t.encode,u=e._dirty,l=s.call(s,e,e.mark.group||e,n,r,i,a);e._dirty=l||u,l&&!u&&o.push(e)}function o(){for(var t,e,n,r=this._mark.def.properties.update.nested,i=this._builder,a=0,o=0,s=r.length;o<s;++o)if(t=r[o],!t.scale){for(;a<t.level;++a)i=i.parent(),e=i.ds();if(n=(t.group?i.encoder():e.last())._stamp,n>this._stamp)return!0}return!1}var s=t("datalib"),u=t("vega-logging"),l=t("vega-dataflow"),c=l.Node,d=l.Dependencies,f=t("vega-scenegraph").bound,h={},p=r.prototype=new c;p.evaluate=function(e){u.debug(e,["encoding",this._mark.def.type]);var n,r,o,s,l=this._graph,c=this._mark.def.properties||{},f=this._mark.items,p=c.enter,g=c.update,m=c.exit,v=e.dirty,y=l.predicates(),_=e.request,b=this._mark.group,x=b&&(b.mark.axis||b.mark.legend),w=h,k=h;if(_&&!x){if((s=c[_])&&e.mod.length)for(w=s.data?l.values(d.DATA,s.data):null,k=s.signals?l.values(d.SIGNALS,s.signals):null,n=0,r=e.mod.length;n<r;++n)o=e.mod[n],a.call(this,s,o,e.trans,w,k,y,v);return e}for(w=i(d.DATA,l,e,c),k=i(d.SIGNALS,l,e,c),n=0,r=e.rem.length;n<r;++n)o=e.rem[n],m&&a.call(this,m,o,e.trans,w,k,y,v),e.trans&&!m?e.trans.interpolate(o,h):e.trans||f.pop();var M=t("./Builder").STATUS.UPDATE;for(n=0,r=e.add.length;n<r;++n)o=e.add[n],p&&a.call(this,p,o,e.trans,w,k,y,v),g&&a.call(this,g,o,e.trans,w,k,y,v),o.status=M;if(g)for(n=0,r=e.mod.length;n<r;++n)o=e.mod[n],a.call(this,g,o,e.trans,w,k,y,v);return e},p.reevaluate=function(t){var e=this._mark.def,n=e.properties||{},r=s.isFunction(e.from)||e.orient||t.request||c.prototype.reevaluate.call(this,t);return r||!!n.update&&o.call(this)},r.update=function(t,e,n,r,i){r=s.array(r);var o,u,l,c,h,p=t.predicates(),g=t.values(d.DATA),m=t.values(d.SIGNALS);for(o=0,u=r.length;o<u;++o)l=r[o],c=l.mark.def.properties,h=c&&c[n],h&&(a.call(null,h,l,e,g,m,p,i),f.item(l))},e.exports=r},{"./Builder":110,datalib:26,"vega-dataflow":41,"vega-logging":48,"vega-scenegraph":49}],112:[function(t,e,n){function r(){return this._children={},this._scaler=null,this._recursor=null,this._scales={},this.scale=a.bind(this),arguments.length?this.init.apply(this,arguments):this}function i(t){function e(t){t.type!=x.MARK||t.inline||void 0===m._graph.data(t.from)||m._recursor.removeListener(t.builder)}function n(e){var n=e.scale();t.scales[n.scaleName]&&e.reset().def()}function r(e){var n=e.size()||e.shape()||e.fill()||e.stroke()||e.opacity();t.scales[n.scaleName]&&e.reset().def()}function i(t){m._recursor.removeListener(t.builder),t.builder.disconnect()}var a,o,d,f,h,p,g,m=this,v=c.array(this._def.marks).length>0,y=c.array(this._def.axes).length>0,_=c.array(this._def.legends).length>0,b=!1;for(a=0,f=t.add.length;a<f;++a)h=t.add[a],v&&s.call(this,t,h),y&&u.call(this,t,h),_&&l.call(this,t,h);for(a=t.add.length-1;a>=0;--a)for(h=t.add[a],o=this._children[h._id].length-1;o>=0;--o)d=this._children[h._id][o],d.builder.connect(),p=d.builder.pipeline(),g=d.builder._def,b=g.type!==x.GROUP,b=b&&void 0!==this._graph.data(d.from),b=b&&1===p[p.length-1].listeners().length,b=b&&g.from&&!g.from.mark,d.inline=b,b?this._graph.evaluate(t,d.builder):this._recursor.addListener(d.builder);for(a=0,f=t.mod.length;a<f;++a)h=t.mod[a],v&&m._children[h._id].forEach(e),y&&h.axes.forEach(n),_&&h.legends.forEach(r);for(a=0,f=t.rem.length;a<f;++a)h=t.rem[a],m._children[h._id].forEach(i),delete m._children[h._id];return t}function a(t,e){var n=this,r=null;if(2===arguments.length)return n._scales[t]=e,e;for(;null==r&&(r=n._scales[t],n=n.mark?n.mark.group:n._parent););return r}function o(t,e){m.debug(t,["building group",e._id]),e._scales=e._scales||{},e.scale=a.bind(e),e.items=e.items||[],this._children[e._id]=this._children[e._id]||[],e.axes=e.axes||[],e.axisItems=e.axisItems||[],e.legends=e.legends||[],e.legendItems=e.legendItems||[],this._graph.group(e._id,e)}function s(t,e){m.debug(t,["building children marks #"+e._id]);var n,i,a,o,s,u,l=this._def.marks;for(o=0,s=l.length;o<s;++o)n=l[o],i=n.from||{},a=e.datum._facetID,e.items[o]={group:e,_scaleRefs:{}},u=n.type===x.GROUP?new r:new v,u.init(this._graph,n,e.items[o],this,e._id,a),this._children[e._id].push({builder:u,from:i.data||(i.mark?"vg_"+e._id+"_"+i.mark:a),type:x.MARK})}function u(t,e){var n=e.axes,i=e.axisItems,a=this;_(this._graph,this._def.axes,n,e),n.forEach(function(t,n){var o=a._def.axes[n].scale,s=t.def(),u=null;i[n]={group:e,axis:t,layer:s.layer},u=s.type===x.GROUP?new r:new v,u.init(a._graph,s,i[n],a).dependency(h.SCALES,o),a._children[e._id].push({builder:u,type:x.AXIS,scale:o})})}function l(t,e){var n=e.legends,i=e.legendItems,a=this;b(this._graph,this._def.legends,n,e),n.forEach(function(t,n){var o=t.size()||t.shape()||t.fill()||t.stroke()||t.opacity(),s=t.def(),u=null;i[n]={group:e,legend:t},u=s.type===x.GROUP?new r:new v,u.init(a._graph,s,i[n],a).dependency(h.SCALES,o),a._children[e._id].push({builder:u,type:x.LEGEND,scale:o})})}var c=t("datalib"),d=t("vega-dataflow"),f=d.Node,h=d.Dependencies,p=d.Tuple,g=d.Collector,m=t("vega-logging"),v=t("./Builder"),y=t("./Scale"),_=t("../parse/axes"),b=t("../parse/legends"),x=r.TYPES={GROUP:"group",MARK:"mark",AXIS:"axis",LEGEND:"legend"},w=r.prototype=new v;w.init=function(t,e){var n,r=this;this._scaler=new f(t),(e.scales||[]).forEach(function(e){e=r.scale(n=e.name,new y(t,e,r)),r.scale(n+":prev",e),r._scaler.addListener(e)}),this._recursor=new f(t),this._recursor.evaluate=i.bind(this);var a=(e.axes||[]).reduce(function(t,e){return t[e.scale]=1,t},{});return a=(e.legends||[]).reduce(function(t,e){return t[e.size||e.shape||e.fill||e.stroke||e.opacity]=1,t},a),this._recursor.dependency(h.SCALES,c.keys(a)),this._collector=new g(t),v.prototype.init.apply(this,arguments)},w.evaluate=function(){var t=v.prototype.evaluate.apply(this,arguments),e=this._graph,n=this,r=this._scales,i=this._mark.items;if(t.mod.length<i.length){var a=c.keys(r).some(function(e){return r[e].reevaluate(t)});!a&&this._def.axes&&(a=this._def.axes.reduce(function(e,n){return e||t.scales[n.scale]},!1)),!a&&this._def.legends&&(a=this._def.legends.reduce(function(e,n){return e||t.scales[n.size||n.shape||n.fill||n.stroke]},!1)),a&&(t.mod=t.mod.concat(p.idFilter(i,t.mod,t.add,t.rem)))}return t.add.forEach(function(e){o.call(n,t,e)}),t.rem.forEach(function(t){e.group(t._id,null)}),t},w.pipeline=function(){return[this,this._scaler,this._recursor,this._collector,this._bounder]},w.disconnect=function(){var t=this;return c.keys(t._children).forEach(function(e){t._children[e].forEach(function(e){t._recursor.removeListener(e.builder),e.builder.disconnect()})}),t._children={},v.prototype.disconnect.call(this)},w.child=function(t,e){for(var n,r=this._children[e],i=0,a=r.length;i<a&&(n=r[i],n.type!=x.MARK||n.builder._def.name!=t);++i);return n.builder},e.exports=r},{"../parse/axes":93,"../parse/legends":98,"./Builder":110,"./Scale":113,datalib:26,"vega-dataflow":41,"vega-logging":48}],113:[function(t,e,n){(function(n){function r(t,e,n){return this._def=e,this._parent=n,this._updated=!1,k.prototype.init.call(this,t).reflows(!0)}function i(t){var e=this._def.name,n=e+":prev",r=a.call(this,t.scale(e)),i=r.type===E.ORDINAL?o:u,s=y.call(this,t);return i.call(this,r,s,t),t.scale(e,r),t.scale(n,t.scale(n)||r),r}function a(t){var e=this._graph.config(),n=this._def.type||E.LINEAR;if(!t||n!==t.type){var r=e.scale[n]||_.scale[n];if(!r)throw Error("Unrecognized scale type: "+n);(t=r()).type=t.type||n,t.scaleName=this._def.name,t._prev={}}return t}function o(t,e,n){var r,i,a=this._def,o=t._prev,u=!1,l=m.call(this,a.padding)||0,c=null==a.outerPadding?l:m.call(this,a.outerPadding),d=a.points&&m.call(this,a.points),f=m.call(this,a.round)||null==a.round,h=!0;if(b.isObject(a.range)&&!b.isArray(a.range)&&(u=!0,e=g.call(this,A.RANGE,a.range,t,n)),r=g.call(this,A.DOMAIN,a.domain,t,n),r&&!b.equal(o.domain,r)&&(t.domain(r),o.domain=r,this._updated=!0),!b.equal(o.range,e)){if(a.bandSize){var p,v=m.call(this,a.bandSize),y=r.length,_=a.points?l*v:l*v*(y-1)+2*c;e[0]>e[1]?(p=e[1]||0,e=[p+(v*y+_),p]):(p=e[0]||0,e=[p,p+(v*y+_)]),a.reverse&&(e=e.reverse())}i="string"==typeof e[0],i||e.length>2||1===e.length||u?(t.range(e),h=!1):d&&f?t.rangeRoundPoints(e,l):d?t.rangePoints(e,l):f?t.rangeRoundBands(e,l,c):t.rangeBands(e,l,c),o.range=e,this._updated=!0}!t.invert&&h&&s(t)}function s(t){t.invert=function(e,n){var r=t.range(),i=r[0]<r[1],a=i?D:P;if(1===arguments.length){if(!b.isNumber(e))throw Error("Ordinal scale inversion is only supported for numeric input ("+e+").");return t.domain()[a(r,e)]}if(2===arguments.length){if(!b.isNumber(e)||!b.isNumber(n))throw Error("Extents to ordinal invert are not numbers ("+e+", "+n+").");var o,s=t.domain(),u=a(r,e),l=a(r,n),c=r.length-1;return l<u&&(o=u,u=l,l=u),u<0&&(u=0),l>c&&(l=c),(i?b.range(u,l+1):b.range(l,u-1,-1)).map(function(t){return s[t]})}}}function u(t,e,n){var r,i,a=this._def,o=t._prev,s=m.call(this,a.round),u=m.call(this,a.exponent),l=m.call(this,a.clamp),c=m.call(this,a.nice);r=a.type===E.QUANTILE?g.call(this,A.DOMAIN,a.domain,t,n):v.call(this,t,n),r&&!b.equal(o.domain,r)&&(t.domain(r),o.domain=r,this._updated=!0),"height"===m.call(this,a.range)&&(e=e.reverse()),e&&!b.equal(o.range,e)&&(t[s&&t.rangeRound?"rangeRound":"range"](e),o.range=e,this._updated=!0),u&&a.type===E.POWER&&t.exponent(u),l&&t.clamp(!0),c&&(a.type===E.TIME?(i=_.time[c],i||w.error("Unrecognized interval: "+i),t.nice(i)):t.nice())}function l(t){return t.type===E.ORDINAL||t.type===E.QUANTILE}function c(t){return t.fields||b.array(t)}function d(t){return t.some(function(t){return!t.data||t.data&&b.array(t.field).some(function(t){return t.parent})})}function f(t,e){return b.array(t.field).map(function(t){return t.parent?b.accessor(t.parent)(e.datum):t})}function h(t,e){var n=c(t);return 1==n.length&&1==b.array(n[0].field).length?S.TYPES.TUPLE:l(e)&&b.isObject(t.sort)?S.TYPES.MULTI:S.TYPES.VALUE}function p(t,e,n,r){var i=c(e),a=d(i),o=h(e,n),s=l(n),u=e.sort,p="_"+t,g=f(i[0],r);if(n[p]||this[p])return n[p]||this[p];var m,v,y=new S(this._graph).type(o);return a?n[p]=y:this[p]=y,s?o===S.TYPES.VALUE?(m=[{name:A.GROUPBY,get:b.identity}],v={"*":A.COUNT}):o===S.TYPES.TUPLE?(m=[{name:A.GROUPBY,get:b.$(g[0])}],v=b.isObject(u)?[{field:A.VALUE,get:b.$(u.field),ops:[u.op]}]:{"*":A.COUNT}):(m=A.GROUPBY,v=[{field:A.VALUE,ops:[u.op]}]):(m=[],v=[{field:A.VALUE,get:o==S.TYPES.TUPLE?b.$(g[0]):b.identity,ops:[A.MIN,A.MAX],as:[A.MIN,A.MAX]}]),y.param("groupby",m).param("summarize",v),y._lastUpdate=-1,y}function g(t,e,n,r){function i(t){k.dependency(M.SIGNALS,t)}if(null==e)return[];if(b.isArray(e))return e.map(m.bind(this));var a,o,s,u,g,v,y,_,x,w,k=this,T=this._graph,E=c(e),L=d(E),C=h(e,n),D=p.apply(this,arguments),P=e.sort,I=l(n);if(L||!L&&D._lastUpdate<this._stamp){for(a=0,o=E.length;a<o;++a)if(g=E[a],x=g.data||r.datum._facetID,_=T.data(x).last(),!(_.stamp<=this._stamp)){for(v=f(g,r),s=0,u=v.length;s<u;++s)y=v[s],C===S.TYPES.VALUE?D.accessors(null,y):C===S.TYPES.MULTI&&D.accessors(y,g.sort||P.field),D.evaluate(_);this.dependency(M.DATA,x),D.dependency(M.SIGNALS).forEach(i)}D._lastUpdate=this._stamp,_=D.aggr().result(),I?(b.isObject(P)?(w=P.op+"_"+A.VALUE,w=b.comparator(w)):P===!0&&(w=b.comparator(A.GROUPBY)),w&&(_=_.sort(w)),D._values=_.map(function(t){return t[A.GROUPBY]})):(_=_[0],D._values=b.isValid(_)?[_[A.MIN],_[A.MAX]]:[])}return D._values}function m(t){if(!t||!t.signal)return t;var e,n=t.signal;return this.dependency(M.SIGNALS,(e=b.field(n))[0]),this._graph.signalRef(e)}function v(t,e){var n,r,i=this._def,a=[null,null];return void 0!==i.domain&&(a=b.isObject(i.domain)?g.call(this,A.DOMAIN,i.domain,t,e):a),r=a.length-1,void 0!==i.domainMin&&(b.isObject(i.domainMin)?i.domainMin.signal?a[0]=b.isValid(n=m.call(this,i.domainMin))?n:a[0]:a[0]=g.call(this,A.DOMAIN+A.MIN,i.domainMin,t,e)[0]:a[0]=i.domainMin),void 0!==i.domainMax&&(b.isObject(i.domainMax)?i.domainMax.signal?a[r]=b.isValid(n=m.call(this,i.domainMax))?n:a[r]:a[r]=g.call(this,A.DOMAIN+A.MAX,i.domainMax,t,e)[1]:a[r]=i.domainMax),i.type===E.LOG||i.type===E.TIME||!i.zero&&void 0!==i.zero||(a[0]=Math.min(0,a[0]),a[r]=Math.max(0,a[r])),a}function y(t){var e=this._def,n=this._graph.config(),r=m.call(this,e.range),i=[null,null];if(void 0!==r)if("string"==typeof r)if(T[r])i=[0,t[r]];else{if(!n.range[r])return w.error("Unrecogized range: "+r),i;i=n.range[r]}else if(b.isArray(r))i=b.duplicate(r).map(m.bind(this));else{if(b.isObject(r))return null;i=[0,r]}if(void 0!==e.rangeMin&&(i[0]=e.rangeMin.signal?m.call(this,e.rangeMin):e.rangeMin),void 0!==e.rangeMax&&(i[i.length-1]=e.rangeMax.signal?m.call(this,e.rangeMax):e.rangeMax),void 0!==e.reverse){var a=m.call(this,e.reverse);b.isObject(a)&&(a=b.accessor(a.field)(t.datum)),a&&(i=i.reverse())}return i}var _="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,b=t("datalib"),x=t("vega-dataflow"),w=t("vega-logging"),k=x.Node,M=x.Dependencies,S=t("../transforms/Aggregate"),T={width:1,height:1},E={LINEAR:"linear",ORDINAL:"ordinal",LOG:"log",POWER:"pow",SQRT:"sqrt",TIME:"time",TIME_UTC:"utc",QUANTILE:"quantile",QUANTIZE:"quantize",THRESHOLD:"threshold"},A={DOMAIN:"domain",RANGE:"range",COUNT:"count",GROUPBY:"groupby",MIN:"min",MAX:"max",VALUE:"value",ASC:"asc",DESC:"desc"},L=r.prototype=new k;L.evaluate=function(t){var e=this,n=function(t){i.call(e,t)};return this._updated=!1,t.add.forEach(n),t.mod.forEach(n),this._updated&&(t.scales[this._def.name]=1,w.debug(t,["scale",this._def.name])),x.ChangeSet.create(t,!0)},L.dependency=function(t,e){if(2==arguments.length){var n=t===M.DATA?"data":"signal";e=b.array(e);for(var r=0,i=e.length;r<i;++r)this._graph[n](e[r]).addListener(this._parent)}return k.prototype.dependency.call(this,t,e)};var C=_.bisector(b.numcmp).right,D=function(t,e){return C(t,e)-1},P=_.bisector(function(t,e){return-1*b.numcmp(t,e)}).left;e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../transforms/Aggregate":118,datalib:26,"vega-dataflow":41,"vega-logging":48}],114:[function(t,e,n){(function(n){function r(t,e){this.duration=t||500,this.ease=e&&a.ease(e)||a.ease("cubic-in-out"),this.updates={next:null}}function i(t){for(var e,n,r,i,a,s,l=this.updates,c=l,d=c.next,f=this.duration,h=!0;null!=d;c=d,d=c.next)if(e=d.item,n=e.delay||0,r=(t-n)/f,r<0)h=!1;else{for(r>1&&(r=1),i=d.ease(r),a=0,s=d.length;a<s;++a)e[d[a].property]=d[a](i);e.touch(),o.item(e),1===r?(d.remove&&(e.status=u.EXIT,e.remove()),c.next=d.next,d=c):h=!1}return this.callback(),h}var a="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,o=t("vega-scenegraph").bound,s=t("vega-dataflow").Tuple,u=t("./Builder").STATUS,l=r.prototype,c={text:1,url:1};l.interpolate=function(t,e){var n,r,i,o,l=null;for(n in e)r=t[n],i=e[n],r!==i&&(c[n]||void 0===r?s.set(t,n,i):"number"!=typeof r||isFinite(r)?(o=a.interpolate(r,i),o.property=n,(l||(l=[])).push(o)):s.set(t,n,i));return null===l&&t.status===u.EXIT&&(l=[]),null!=l&&(l.item=t,l.ease=t.mark.ease||this.ease,l.next=this.updates.next,this.updates.next=l),this},l.start=function(t){for(var e=this,n=e.updates,r=n.next;null!=r;n=r,r=n.next)r.item.status===u.EXIT&&(r.item.status=u.UPDATE,r.remove=!0);e.callback=t,a.timer(function(t){return i.call(e,t)})},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Builder":110,"vega-dataflow":41,"vega-scenegraph":49}],115:[function(t,e,n){function r(t,e){function n(){L.type=null}function r(t){return{data:t}}function a(t){var e=j||(S.ticks?S.ticks(q):S.domain()),n=i(S,e,R).map(r);return e=e.map(function(e){return e=r(e),e.label=t(e.data),e}),[e,n]}function k(t){var n=t.orient,r=t.marks[5].properties.update,i=r.encode,a=e.titleOffsetAutoMin,o=e.titleOffsetAutoMax,s=e.titleOffsetAutoMargin;r.encode=function(t,e,r,u,l,c){var d=i.call(i,t,e,r,u,l,c),f="bottom"===n||"top"===n?"y":"x";if(null!=Y[f])return d;b.clear().union(e.items[3].bounds).union(e.items[4].bounds);var h=r?{}:t,p="left"===n||"right"===n?"width":"height",g="top"===n||"left"===n?-1:1,m=~~(b[p]()+t.fontSize/2+s);return v.set(h,f,g*Math.min(Math.max(a,m),o)),r&&r.interpolate(t,h),!0}}function M(n){var r,i,a;n.type===x?(r={scale:n.scaleName,offset:.5+n.rangeBand()/2},i=r):(r={scale:n.scaleName,offset:.5},i={scale:n.scaleName+":prev",offset:.5}),a=o(n),m.extend(W.gridLines,f(e)),m.extend(W.majorTicks,f(e)),m.extend(W.minorTicks,f(e)),m.extend(W.tickLabels,h(e)),m.extend(W.domain,g(e)),m.extend(W.title,p(e)),W.gridLines.properties.enter.stroke={value:e.gridColor},W.gridLines.properties.enter.strokeOpacity={value:e.gridOpacity},W.gridLines.properties.enter.strokeWidth={value:e.gridWidth},W.gridLines.properties.enter.strokeDash={value:e.gridDash},u(T,W.gridLines,i,r,1/0,n,e,E),u(T,W.majorTicks,i,r,I,n,e),u(T,W.minorTicks,i,r,N,n,e),s(T,W.tickLabels,i,r,I,z),c(T,W.domain,a,O),l(T,W.title,a,+A||-1),m.extend(W.gridLines.properties.update,B),m.extend(W.majorTicks.properties.update,$),m.extend(W.minorTicks.properties.update,H),m.extend(W.tickLabels.properties.update,G),m.extend(W.domain.properties.update,V),m.extend(W.title.properties.update,Y);var v=[W.gridLines,W.majorTicks,W.minorTicks,W.tickLabels,W.domain,W.title];m.extend(L,{type:"group",interactive:!1,properties:{enter:{encode:d,scales:[n.scaleName],signals:[],data:[]},update:{encode:d,scales:[n.scaleName],signals:[],data:[]}}}),L.marks=v.map(function(e){return y(t,e)})}var S,T=e.orient,E=0,A=e.titleOffset,L={},C="front",D=!1,P=null,I=e.tickSize,N=e.tickSize,O=e.tickSize,z=e.tickPadding||e.padding,j=null,F=null,U=null,R=0,q=e.ticks,B={},G={},$={},H={},Y={},V={},W={gridLines:{},majorTicks:{},minorTicks:{},tickLabels:{},domain:{},title:{}},X={};return X.def=function(){L.type||M(S);var t=_.getTickFormat(S,q,U,F),e=a(t),n=P?[P].map(r):[];return L.marks[0].from=function(){return D?e[0]:[]},L.marks[1].from=function(){return e[0]},L.marks[2].from=function(){return e[1]},L.marks[3].from=L.marks[1].from,L.marks[4].from=function(){return[1]},L.marks[5].from=function(){return n},L.offset=E,L.orient=T,L.layer=C,"auto"===A&&k(L),L},X.scale=function(t){return arguments.length?(S!==t&&(S=t,n()),X):S},X.orient=function(t){return arguments.length?(T!==t&&(T=t in w?t+"":e.orient,n()),X):T},X.title=function(t){return arguments.length?(P!==t&&(P=t,n()),X):P},X.tickCount=function(t){return arguments.length?(q=t,X):q},X.tickValues=function(t){return arguments.length?(j=t,X):j},X.tickFormat=function(t){return arguments.length?(F!==t&&(F=t,n()),X):F},X.tickFormatType=function(t){return arguments.length?(U!==t&&(U=t,n()),X):U},X.tickSize=function(t,e){if(!arguments.length)return I;var r=arguments.length-1,i=+t,a=r>1?+e:I,o=r>0?+arguments[r]:I;return I===i&&N===a&&O===o||n(),I=i,N=a,O=o,X},X.tickSubdivide=function(t){return arguments.length?(R=+t,X):R},X.offset=function(t){return arguments.length?(E=m.isObject(t)?t:+t,X):E},X.tickPadding=function(t){return arguments.length?(z!==+t&&(z=+t,n()),X):z},X.titleOffset=function(t){return arguments.length?(A!==t&&(A=t,n()),X):A},X.layer=function(t){return arguments.length?(C!==t&&(C=t,n()),X):C},X.grid=function(t){return arguments.length?(D!==t&&(D=t,n()),X):D},X.gridLineProperties=function(t){return arguments.length?(B!==t&&(B=t),X):B},X.majorTickProperties=function(t){return arguments.length?($!==t&&($=t),X):$},X.minorTickProperties=function(t){return arguments.length?(H!==t&&(H=t),X):H},X.tickLabelProperties=function(t){return arguments.length?(G!==t&&(G=t),X):G},X.titleProperties=function(t){return arguments.length?(Y!==t&&(Y=t),X):Y},X.domainProperties=function(t){return arguments.length?(V!==t&&(V=t),X):V},X.reset=function(){return n(),X},X}function i(t,e,n){var r=[];if(n&&e.length>1){for(var i,o,s=a(t.domain()),u=-1,l=e.length,c=(e[1]-e[0])/++n;++u<l;)for(i=n;--i>0;)(o=+e[u]-i*c)>=s[0]&&r.push(o);for(--u,i=0;++i<n&&(o=+e[u]+i*c)<s[1];)r.push(o)}return r}function a(t){var e=t[0],n=t[t.length-1];return e<n?[e,n]:[n,e]}function o(t){return t.rangeExtent?t.rangeExtent():a(t.range())}function s(t,e,n,r,i,a){i=Math.max(i,0)+a,"left"!==t&&"top"!==t||(i*=-1),"top"===t||"bottom"===t?(m.extend(e.properties.enter,{x:n,y:{value:i}}),m.extend(e.properties.update,{x:r,y:{value:i},align:{value:"center"},baseline:{value:M[t]}})):(m.extend(e.properties.enter,{x:{value:i},y:n}),m.extend(e.properties.update,{x:{value:i},y:r,align:{value:k[t]},baseline:{value:"middle"}}))}function u(t,e,n,r,i,a,o,s){var u="left"===t||"top"===t?-1:1;if(i=i===1/0?"top"===t||"bottom"===t?{field:{group:"height",level:2},mult:-u,offset:s*-u}:{field:{group:"width",level:2},mult:-u,offset:s*-u}:{value:u*i,offset:s},"between"===o.tickPlacement&&a.type===x){var l=a.range(),c=.5+(a.rangeBand()||(l[1]-l[0])/2);r=n=m.duplicate(r),r.offset=n.offset=c}"top"===t||"bottom"===t?(m.extend(e.properties.enter,{x:n,y:{value:0},y2:i}),m.extend(e.properties.update,{x:r,y:{value:0},y2:i}),m.extend(e.properties.exit,{x:r})):(m.extend(e.properties.enter,{x:{value:0},x2:i,y:n}),m.extend(e.properties.update,{x:{value:0},x2:i,y:r}),m.extend(e.properties.exit,{y:r}))}function l(t,e,n,r){var i=e.properties.update,a=~~((n[0]+n[1])/2),o="top"===t||"left"===t?-1:1;"bottom"===t||"top"===t?(i.x={value:a},i.angle={value:0},r>=0&&(i.y={value:o*r})):(i.y={value:a},i.angle={value:"left"===t?-90:90},r>=0&&(i.x={value:o*r}))}function c(t,e,n,r){var i;"top"!==t&&"left"!==t||(r=-1*r),i="bottom"===t||"top"===t?"M"+n[0]+","+r+"V0H"+n[1]+"V"+r:"M"+r+","+n[0]+"H0V"+n[1]+"H"+r,e.properties.update.path={value:i}}function d(t,e,n){var r=n?{}:t,i=t.mark.def.offset,a=t.mark.def.orient,o=e.width,s=e.height;if(m.isArray(i)){var u=i[0],l=i[1];switch(a){case"left":v.set(r,"x",-u),v.set(r,"y",l);break;case"right":v.set(r,"x",o+u),v.set(r,"y",l);break;case"bottom":v.set(r,"x",u),v.set(r,"y",s+l);break;case"top":v.set(r,"x",u),v.set(r,"y",-l);break;default:v.set(r,"x",u),v.set(r,"y",l)}}else switch(m.isObject(i)&&(i=-e.scale(i.scale)(i.value)),a){case"left":v.set(r,"x",-i),v.set(r,"y",0);break;case"right":v.set(r,"x",o+i),v.set(r,"y",0);break;case"bottom":v.set(r,"x",0),v.set(r,"y",s+i);break;case"top":v.set(r,"x",0),v.set(r,"y",-i);break;default:v.set(r,"x",0),v.set(r,"y",0)}return n&&n.interpolate(t,r),!0}function f(t){return{type:"rule",interactive:!1,key:"data",properties:{enter:{stroke:{value:t.tickColor},strokeWidth:{value:t.tickWidth},opacity:{value:1e-6}},exit:{opacity:{value:1e-6}},update:{opacity:{value:1}}}}}function h(t){return{type:"text",interactive:!0,key:"data",properties:{enter:{fill:{value:t.tickLabelColor},font:{value:t.tickLabelFont},fontSize:{value:t.tickLabelFontSize},opacity:{value:1e-6},text:{field:"label"}},exit:{opacity:{value:1e-6}},update:{opacity:{value:1}}}}}function p(t){return{type:"text",interactive:!0,properties:{enter:{font:{value:t.titleFont},fontSize:{value:t.titleFontSize},fontWeight:{value:t.titleFontWeight},fill:{value:t.titleColor},align:{value:"center"},baseline:{value:"middle"},text:{field:"data"}},update:{}}}}function g(t){return{type:"path",interactive:!1,properties:{enter:{x:{value:.5},y:{value:.5},stroke:{value:t.axisColor},strokeWidth:{value:t.axisWidth}},update:{}}}}var m=t("datalib"),v=t("vega-dataflow").Tuple,y=t("../parse/mark"),_=t("../util"),b=new(t("vega-scenegraph").Bounds),x="ordinal",w={top:1,right:1,bottom:1,left:1},k={bottom:"center",top:"center",left:"right",right:"left"},M={bottom:"top",top:"bottom",left:"middle",right:"middle"};e.exports=r},{"../parse/mark":99,"../util":148,datalib:26,"vega-dataflow":41,"vega-scenegraph":49}],116:[function(t,e,n){(function(n){function r(t){function e(){$.type=null}function n(t,e){return{data:t,index:e}}function r(t){return"ordinal"===t||"quantize"===t||"quantile"===t||"threshold"===t}function y(t){var e,r,i,a=_(w,k,M,S,T),o=(null==A?t.ticks?t.ticks.apply(t,z):t.domain():A).map(n),s=m.getTickFormat(t,o.length,C,L),u=5,l=d.range(o.length);w?(r=o.map(function(t){return Math.sqrt(w(t.data))}),i=d.max(r),r=r.reduce(function(t,e,n,r){return n>0&&(t[n]=t[n-1]+r[n-1]/2+u),t[n]+=e/2,t},[0]).map(Math.round)):(i=Math.round(Math.sqrt(P.symbolSize)),r=E||(e=q.fontSize)&&e.value+u||P.labelFontSize+u,r=l.map(function(t,e){return Math.round(i/2+e*r)}));var c,h=O;D&&(c=R.fontSize,h+=5+(c&&c.value||P.titleFontSize));for(var p=0,g=r.length;p<g;++p)r[p]+=h;a.scales=a.scales||[{}],f.extend(a.scales[0],{name:"legend",type:"ordinal",points:!0,domain:l,range:r});var v=(D?[D]:[]).map(n);return o.forEach(function(t){t.label=s(t.data),t.offset=i}),a.marks[0].from=function(){return v},a.marks[1].from=function(){return o},a.marks[2].from=a.marks[1].from,a}function _(e,n,r,l,c){var d=f.extend(B.titles,o(P)),h=f.extend(B.symbols,s(P)),m=f.extend(B.labels,u(P));return a(h,e,n,r,l,c),f.extend(d.properties.update,R),f.extend(h.properties.update,F),f.extend(m.properties.update,q),d.properties.enter.x.value+=O,d.properties.enter.y.value+=O,m.properties.enter.x.offset+=O+1,h.properties.enter.x.offset=O+1,m.properties.update.x.offset+=O+1,h.properties.update.x.offset=O+1,f.extend($,{type:"group",interactive:!1,properties:{enter:p(t,"group",j),legendPosition:{encode:i.bind(null,P),signals:[],scales:[],data:[],fields:[]}}}),$.marks=[d,h,m].map(function(e){return g(t,e)}),$}function b(t){var e=x(t),r=t.domain(),i=(null==A?r:A).map(n),a=U.width&&U.width.value||P.gradientWidth,o=m.getTickFormat(t,i.length,C,L);e.scales=e.scales||[{}];var s=f.extend(e.scales[0],{name:"legend",type:t.type,round:!0,zero:!1,domain:[r[0],r[r.length-1]],range:[O,a+O]});"pow"===t.type&&(s.exponent=t.exponent());var u=(D?[D]:[]).map(n);return i.forEach(function(t,e){t.label=o(t.data),t.align=e==i.length-1?"right":0===e?"left":"center"}),e.marks[0].from=function(){return u},e.marks[1].from=function(){return[1]},e.marks[2].from=function(){return i},e}function x(e){var n=f.extend(B.titles,o(P)),r=f.extend(B.gradient,l(P)),a=f.extend(B.labels,c(P)),s=new h,u=e.domain(),d=u[0],m=u[u.length-1],v=e.copy().domain([d,m]).range([0,1]),y="linear"!==e.type&&e.ticks?e.ticks.call(e,15):u;d!==y[0]&&y.unshift(d),m!==y[y.length-1]&&y.push(m);for(var _=0,b=y.length;_<b;++_)s.stop(v(y[_]),e(y[_]));r.properties.enter.fill={value:s},f.extend(n.properties.update,R),f.extend(r.properties.update,U),f.extend(a.properties.update,q);var x=r.properties,w=U.height,k=w&&w.value||x.enter.height.value;if(a.properties.enter.y.value=k,a.properties.update.y.value=k,D){var M=n.properties,S=R.fontSize,T=4+(S&&S.value||M.enter.fontSize.value);r.properties.enter.y.value+=T,a.properties.enter.y.value+=T,
r.properties.update.y.value+=T,a.properties.update.y.value+=T}return n.properties.enter.x.value+=O,n.properties.enter.y.value+=O,r.properties.enter.x.value+=O,r.properties.enter.y.value+=O,a.properties.enter.y.value+=O,r.properties.update.x.value+=O,r.properties.update.y.value+=O,a.properties.update.y.value+=O,f.extend($,{type:"group",interactive:!1,properties:{enter:p(t,"group",j),legendPosition:{encode:i.bind(null,P),signals:[],scales:[],data:[],fields:[]}}}),$.marks=[n,r,a].map(function(e){return g(t,e)}),$}var w=null,k=null,M=null,S=null,T=null,E=null,A=null,L=null,C=null,D=null,P=t.config().legend,I=P.orient,N=P.offset,O=P.padding,z=[5],j={},F={},U={},R={},q={},B={titles:{},symbols:{},labels:{},gradient:{}},G={},$={};return G.def=function(){var t=w||k||M||S||T;return $.type||($=t!==M&&t!==S||r(t.type)?y(t):b(t)),$.orient=I,$.offset=N,$.padding=O,$.margin=P.margin,$},G.size=function(t){return arguments.length?(w!==t&&(w=t,e()),G):w},G.shape=function(t){return arguments.length?(k!==t&&(k=t,e()),G):k},G.fill=function(t){return arguments.length?(M!==t&&(M=t,e()),G):M},G.stroke=function(t){return arguments.length?(S!==t&&(S=t,e()),G):S},G.opacity=function(t){return arguments.length?(T!==t&&(T=t,e()),G):T},G.title=function(t){return arguments.length?(D!==t&&(D=t,e()),G):D},G.format=function(t){return arguments.length?(L!==t&&(L=t,e()),G):L},G.formatType=function(t){return arguments.length?(C!==t&&(C=t,e()),G):C},G.spacing=function(t){return arguments.length?(E!==+t&&(E=+t,e()),G):E},G.orient=function(t){return arguments.length?(I=t in v?t+"":P.orient,G):I},G.offset=function(t){return arguments.length?(N=+t,G):N},G.values=function(t){return arguments.length?(A=t,G):A},G.legendProperties=function(t){return arguments.length?(j=t,G):j},G.symbolProperties=function(t){return arguments.length?(F=t,G):F},G.gradientProperties=function(t){return arguments.length?(U=t,G):U},G.labelProperties=function(t){return arguments.length?(q=t,G):q},G.titleProperties=function(t){return arguments.length?(R=t,G):R},G.reset=function(){return e(),G},G}function i(t,e,n,r,i,a,o){var s,u=r?{}:e,l=e.mark.def,c=l.offset,d=l.orient,f=2*l.padding,h="left"===d?0:n.width,p=~~e.bounds.width()+(e.width?0:f),g=~~e.bounds.height()+(e.height?0:f),m=n._legendPositions||(n._legendPositions={right:.5,left:.5});if(u.x=.5,u.y=.5,u.width=p,u.height=g,"left"===d||"right"===d){u.y=m[d],m[d]+=g+l.margin;var y=n.axes,_=n.axisItems,b=v[d];for(s=0;s<y.length;++s)y[s].orient()===d&&(h=Math.max(h,Math.abs(_[s].bounds[b])))}switch(d){case"left":u.x-=h+c+p;break;case"right":u.x+=h+c;break;case"top-left":u.x+=c,u.y+=c;break;case"top-right":u.x+=n.width-p-c,u.y+=c;break;case"bottom-left":u.x+=c,u.y+=n.height-g-c;break;case"bottom-right":u.x+=n.width-p-c,u.y+=n.height-g-c}var x=t.baseline,w=0;for(s=0;s<n.legendItems.length;s++){var k=n.legendItems[s];w+=k.bounds.height()+(e.height?0:f)}"middle"===x?u.y+=c+n.height/2-w/2:"bottom"===x&&(u.y+=c+n.height-w),r&&r.interpolate(e,u);var M=e.mark.def.properties.enter.encode;return M.call(M,e,n,r,i,a,o),!0}function a(t,e,n,r,i,a){var o=t.properties.enter,s=t.properties.update;e&&(o.size=s.size={scale:e.scaleName,field:"data"}),n&&(o.shape=s.shape={scale:n.scaleName,field:"data"}),r&&(o.fill=s.fill={scale:r.scaleName,field:"data"}),i&&(o.stroke=s.stroke={scale:i.scaleName,field:"data"}),a&&(s.opacity={scale:a.scaleName,field:"data"})}function o(t){return{type:"text",interactive:!1,key:"data",properties:{enter:{x:{value:0},y:{value:0},fill:{value:t.titleColor},font:{value:t.titleFont},fontSize:{value:t.titleFontSize},fontWeight:{value:t.titleFontWeight},baseline:{value:"top"},text:{field:"data"},opacity:{value:1e-6}},exit:{opacity:{value:1e-6}},update:{opacity:{value:1}}}}}function s(t){return{type:"symbol",interactive:!1,key:"data",properties:{enter:{x:{field:"offset",mult:.5},y:{scale:"legend",field:"index"},shape:{value:t.symbolShape},size:{value:t.symbolSize},stroke:{value:t.symbolColor},strokeWidth:{value:t.symbolStrokeWidth},opacity:{value:1e-6}},exit:{opacity:{value:1e-6}},update:{x:{field:"offset",mult:.5},y:{scale:"legend",field:"index"},opacity:{value:1}}}}}function u(t){return{type:"text",interactive:!1,key:"data",properties:{enter:{x:{field:"offset",offset:5},y:{scale:"legend",field:"index"},fill:{value:t.labelColor},font:{value:t.labelFont},fontSize:{value:t.labelFontSize},align:{value:t.labelAlign},baseline:{value:t.labelBaseline},text:{field:"label"},opacity:{value:1e-6}},exit:{opacity:{value:1e-6}},update:{opacity:{value:1},x:{field:"offset",offset:5},y:{scale:"legend",field:"index"}}}}}function l(t){return{type:"rect",interactive:!1,properties:{enter:{x:{value:0},y:{value:0},width:{value:t.gradientWidth},height:{value:t.gradientHeight},stroke:{value:t.gradientStrokeColor},strokeWidth:{value:t.gradientStrokeWidth},opacity:{value:1e-6}},exit:{opacity:{value:1e-6}},update:{x:{value:0},y:{value:0},opacity:{value:1}}}}}function c(t){return{type:"text",interactive:!1,key:"data",properties:{enter:{x:{scale:"legend",field:"data"},y:{value:20},dy:{value:2},fill:{value:t.labelColor},font:{value:t.labelFont},fontSize:{value:t.labelFontSize},align:{field:"align"},baseline:{value:"top"},text:{field:"label"},opacity:{value:1e-6}},exit:{opacity:{value:1e-6}},update:{x:{scale:"legend",field:"data"},y:{value:20},opacity:{value:1}}}}}var d="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,f=t("datalib"),h=t("vega-scenegraph").Gradient,p=t("../parse/properties"),g=t("../parse/mark"),m=t("../util"),v={left:"x1",right:"x2","top-left":"x1","top-right":"x2","bottom-left":"x1","bottom-right":"x2"};e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../parse/mark":99,"../parse/properties":104,"../util":148,datalib:26,"vega-scenegraph":49}],117:[function(t,e,n){e.exports=function t(e,n){var r,i,a,o,s;if(n(e))return!0;var u=["items","axisItems","legendItems"];for(a=0,o=u.length;a<o;++a)if(s=e[u[a]])for(r=0,i=s.length;r<i;++r)if(t(s[r],n))return!0}},{}],118:[function(t,e,n){function r(t){return d.prototype.init.call(this,t),d.addParameters(this,{groupby:{type:"array<field>"},summarize:{type:"custom",set:function(t){function e(t){t.signal&&(l[t.signal]=1)}var n,r,i,o,s,u,l={},d=this._transform;if(!a.isArray(o=t)){o=[];for(s in t)u=a.array(t[s]),o.push({field:s,ops:u})}for(n=0,r=o.length;n<r;++n)i=o[n],i.field.signal&&(l[i.field.signal]=1),a.array(i.ops).forEach(e),a.array(i.as).forEach(e);return d._fields=o,d._aggr=null,d.dependency(c.SIGNALS,a.keys(l)),d}}}),this._aggr=null,this._input=null,this._args=null,this._fields=[],this._out=[],this._type=p.TUPLE,this._acc={groupby:a.true,value:a.true},this.router(!0).produces(!0)}function i(t){var e,n,r,i,a,o,s,u=[];for(a=t._dims,e=0,n=a.length;e<n;++e)u.push(a[e].name);for(o=t._aggr,e=0,n=o.length;e<n;++e)for(s=o[e].measures.fields,r=0,i=s.length;r<i;++r)u.push(s[r]);return u}var a=t("datalib"),o=t("vega-dataflow"),s=t("vega-logging"),u=o.ChangeSet,l=o.Tuple,c=o.Dependencies,d=t("./Transform"),f=t("./Facetor"),h=r.prototype=Object.create(d.prototype);h.constructor=r;var p=r.TYPES={VALUE:1,TUPLE:2,MULTI:3};r.VALID_OPS=["values","count","valid","missing","distinct","sum","mean","average","variance","variancep","stdev","stdevp","median","q1","q3","modeskew","min","max","argmin","argmax"],h.type=function(t){return this._type=t,this},h.accessors=function(t,e){var n=this._acc;n.groupby=a.$(t)||a.true,n.value=a.$(e)||a.true},h.aggr=function(){if(this._aggr)return this._aggr;var t=this._graph,e=!1,n=[],r=this.param("groupby").field,o=function(e){return e.signal?t.signalRef(e.signal):e},s=this._fields.map(function(t){var r={name:o(t.field),as:a.array(t.as),ops:a.array(o(t.ops)).map(o),get:t.get};return e=e||null!=r.get,n.push(r.name),r});r.forEach(function(t){t.get&&(e=!0),n.push(t.name||t)}),this._args=e||!s.length?null:n,s.length||(s={"*":"values"});var u=this._aggr=(new f).groupby(r).stream(!0).summarize(s);return this._out=i(u),this._type!==p.VALUE&&u.key("_id"),u},h.transform=function(t,e){s.debug(t,["aggregate"]);var n,r,i,a,o,c=u.create(t),d=this.aggr(),f=this._out,h=this._args,g=!0,m=l.prev;if(e&&(c.rem.push.apply(c.rem,d.result()),d.clear(),this._aggr=null,d=this.aggr()),this._type===p.TUPLE)n=function(t){d._add(t),l.prev_init(t)},r=function(t){d._rem(m(t))},i=function(t){d._mod(t,m(t))},a=function(t){d._markMod(t,m(t))};else{var v=this._acc.groupby,y=this._acc.value,_=this._type===p.VALUE?y:function(t){return{_id:t._id,groupby:v(t),value:y(t)}};n=function(t){d._add(_(t)),l.prev_init(t)},r=function(t){d._rem(_(m(t)))},i=function(t){d._mod(_(t),_(m(t)))},a=function(t){d._mark(_(t),_(m(t)))}}if(t.add.forEach(n),e)t.mod.forEach(n);else{if(t.rem.forEach(r),h)for(o=0,g=!1;o<h.length;++o)if(t.fields[h[o]]){g=!0;break}t.mod.forEach(g?i:a)}for(o=0;o<f.length;++o)c.fields[f[o]]=1;return d._input=t,d.changes(c)},e.exports=r},{"./Facetor":124,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],119:[function(t,e,n){function r(){this._collector=null}var i=t("./Transform").prototype,a=r.prototype=Object.create(i);a.constructor=r,a.init=function(t){return i.init.call(this,t),this.batch(!0)},a.transform=function(t,e){return this.batchTransform(t,this._collector.data(),e)},a.batchTransform=function(){},e.exports=r},{"./Transform":140}],120:[function(t,e,n){function r(t){return u.prototype.init.call(this,t),s.addParameters(this,{field:{type:"field"},min:{type:"value"},max:{type:"value"},base:{type:"value",default:10},maxbins:{type:"value",default:20},step:{type:"value"},steps:{type:"value"},minstep:{type:"value"},div:{type:"array<value>",default:[5,2]}}),this._output={start:"bin_start",end:"bin_end",mid:"bin_mid"},this.mutates(!0)}var i=t("datalib"),a=t("vega-dataflow").Tuple,o=t("vega-logging"),s=t("./Transform"),u=t("./BatchTransform"),l=r.prototype=Object.create(u.prototype);l.constructor=r,l.extent=function(t){var e,n=[this.param("min"),this.param("max")];return null!=n[0]&&null!=n[1]||(e=i.extent(t,this.param("field").accessor),null==n[0]&&(n[0]=e[0]),null==n[1]&&(n[1]=e[1])),n},l.batchTransform=function(t,e){function n(t){var e=d(t);e=null==e?null:h.start+p*~~((e-h.start)/p),a.set(t,s.start,e),a.set(t,s.end,e+p),a.set(t,s.mid,e+p/2)}o.debug(t,["binning"]);var r=this.extent(e),s=this._output,u=this.param("step"),l=this.param("steps"),c=this.param("minstep"),d=this.param("field").accessor,f={min:r[0],max:r[1],base:this.param("base"),maxbins:this.param("maxbins"),div:this.param("div")};u&&(f.step=u),l&&(f.steps=l),c&&(f.minstep=c);var h=i.bins(f),p=h.step;return t.add.forEach(n),t.mod.forEach(n),t.rem.forEach(n),t.fields[s.start]=1,t.fields[s.end]=1,t.fields[s.mid]=1,t},e.exports=r},{"./BatchTransform":119,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],121:[function(t,e,n){function r(t){return s.prototype.init.call(this,t),s.addParameters(this,{field:{type:"field",default:"data"},pattern:{type:"value",default:"[\\w']+"},case:{type:"value",default:"lower"},stopwords:{type:"value",default:""}}),this._output={text:"text",count:"count"},this.router(!0).produces(!0)}var i=t("vega-dataflow"),a=i.Tuple,o=t("vega-logging"),s=t("./Transform"),u=r.prototype=Object.create(s.prototype);u.constructor=r,u.transform=function(t,e){function n(t){return a.prev_init(t),i(t)}function r(t){return i(a.prev(t))}o.debug(t,["countpattern"]);var i=this.param("field").accessor,s=this.param("pattern"),u=this.param("stopwords"),l=!1;return this._stop!==u&&(this._stop=u,this._stop_re=new RegExp("^"+u+"$","i"),e=!0),this._pattern!==s&&(this._pattern=s,this._match=new RegExp(this._pattern,"g"),e=!0),e&&(this._counts={}),this._add(t.add,n),e||this._rem(t.rem,r),(e||(l=t.fields[i.field]))&&(l&&this._rem(t.mod,r),this._add(t.mod,n)),this._changeset(t)},u._changeset=function(t){var e,n,r,o=this._counts,s=this._tuples||(this._tuples={}),u=i.ChangeSet.create(t),l=this._output;for(e in o)n=s[e],r=o[e]||0,!n&&r?(s[e]=n=a.ingest({}),n[l.text]=e,n[l.count]=r,u.add.push(n)):0===r?(n&&u.rem.push(n),delete o[e],delete s[e]):n[l.count]!==r&&(a.set(n,l.count,r),u.mod.push(n));return u},u._tokenize=function(t){switch(this.param("case")){case"upper":t=t.toUpperCase();break;case"lower":t=t.toLowerCase()}return t.match(this._match)},u._add=function(t,e){var n,r,i,a,o=this._counts,s=this._stop_re;for(i=0;i<t.length;++i)for(n=this._tokenize(e(t[i])),r=0;r<n.length;++r)s.test(a=n[r])||(o[a]=1+(o[a]||0))},u._rem=function(t,e){var n,r,i,a,o=this._counts,s=this._stop_re;for(i=0;i<t.length;++i)for(n=this._tokenize(e(t[i])),r=0;r<n.length;++r)s.test(a=n[r])||(o[a]-=1)},e.exports=r},{"./Transform":140,"vega-dataflow":41,"vega-logging":48}],122:[function(t,e,n){function r(t){return m.prototype.init.call(this,t),g.addParameters(this,{with:{type:"data"},diagonal:{type:"value",default:"true"},filter:{type:"expr"}}),this._output={left:"a",right:"b"},this._lastWith=null,this._cids={},this._cache={},this.router(!0).produces(!0)}function i(t,e){var n=this._cache,r=n[t._id]||(n[t._id]={c:[],f:!1});r.c.push(e)}function a(t,e,n){return t?e._id+"_"+n._id:n._id+"_"+e._id}function o(t,e,n,r,o,s,u){for(var l,c,d=this._output,f=this._cache,p=this._cids,g=t.add,m=!1,v=0,y=n.length,_={};v<y;++v)l=n[v],c=a(e,u,l),p[c]||(u._id!==l._id||r)&&(h.set(_,d.left,e?u:l),h.set(_,d.right,e?l:u),!o||o(_)?(g.push(_=h.ingest(_)),i.call(this,u,_),u._id!==l._id&&i.call(this,l,_),s[_._id]=1,p[c]=!0,_={}):(f[l._id]&&(f[l._id].f=!0),m=!0));f[u._id]&&(f[u._id].f=m)}function s(t,e,n,r,i,s,u,l){var c,d,f,h,p,g=this._output,m=this._cache,v=this._cids,y=m[l._id],_=y&&y.c,b=!y||y.f,x=t.mod,w=t.rem;if(_)for(c=_.length-1;c>=0;--c)if(d=_[c],h=l===d[g.left],f=h?d[g.right]:d[g.left],p=a(h,l,f),m[f._id])if(!i||i(d)){if(s[d._id])continue;x.push(d),s[d._id]=1}else u[d._id]||w.push.apply(w,_.splice(c,1)),u[d._id]=1,v[p]=!1,y.f=!0;else v[p]=!1,_.splice(c,1);i&&b&&o.call(this,t,e,n,r,i,s,l)}function u(t,e,n,r){var i,o,s,u,l,c=this._output,d=this._cache[r._id],f=this._cids,h=t.rem;if(d){for(i=0,o=d.c.length;i<o;++i)s=d.c[i],l=r===s[c.left],u=l?s[c.right]:s[c.left],f[a(l,r,u)]=!1,n[s._id]||(h.push(s),n[s._id]=1);this._cache[r._id]=null}}function l(t,e){var n,r,i,a,o,s,u=this._cache,l=c.keys(u),d=t.rem;for(n=0,r=l.length;n<r;++n)for(o=u[l[n]],i=0,a=o.c.length;i<a;++i)s=o.c[i],e[s._id]||(d.push(s),e[s._id]=1);this._cache={},this._cids={},this._lastWith=null}var c=t("datalib"),d=t("vega-dataflow"),f=d.ChangeSet,h=d.Tuple,p=t("vega-logging"),g=t("./Transform"),m=t("./BatchTransform"),v=r.prototype=Object.create(m.prototype);v.constructor=r,v.batchTransform=function(t,e,n){p.debug(t,["crossing"]);var r=this.param("with"),i=this.param("diagonal"),a=this._output,c=this.param("filter")||null,d=!r.name,h=d?t:r.source.last(),g=d?e:r.source.values(),m=f.create(t),v={},y={};return n?(l.call(this,m,y),e.forEach(o.bind(this,m,!0,g,i,c,v)),this._lastWith=h.stamp):(t.rem.forEach(u.bind(this,m,!0,y)),t.add.forEach(o.bind(this,m,!0,g,i,c,v)),h.stamp>this._lastWith&&(h.rem.forEach(u.bind(this,m,!1,y)),h.add.forEach(o.bind(this,m,!1,e,i,c,v)),h.mod.forEach(s.bind(this,m,!1,e,i,c,v,y)),this._lastWith=h.stamp),t.mod.forEach(s.bind(this,m,!0,g,i,c,v,y))),m.fields[a.left]=1,m.fields[a.right]=1,m},e.exports=r},{"./BatchTransform":119,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],123:[function(t,e,n){function r(e){return i.addParameters(this,{transform:{type:"custom",set:function(t){return this._transform._pipeline=t,this._transform},get:function(){var e=t("../parse/transforms"),n=this._transform;return n._pipeline.map(function(t){return e(n._graph,t)})}}}),this._pipeline=[],a.call(this,e)}var i=t("./Transform"),a=t("./Aggregate"),o=r.prototype=Object.create(a.prototype);o.constructor=r,o.aggr=function(){return a.prototype.aggr.call(this).facet(this)},o.transform=function(t,e){var n=a.prototype.transform.call(this,t,e);return t.add.length&&this.listeners()[0].rerank(),n},e.exports=r},{"../parse/transforms":108,"./Aggregate":118,"./Transform":140}],124:[function(t,e,n){function r(){o.call(this),this._facet=null,this._facetID=++d}function i(t){c.debug({},["disconnecting cell",this.tuple._id]);var e=this.ds.pipeline();t.removeListener(e[0]),t._graph.removeListener(e[0]),t._graph.disconnect(e)}var a=t("datalib"),o=a.Aggregator,s=o.prototype,u=t("vega-dataflow"),l=u.Tuple,c=t("vega-logging"),d=0,f=r.prototype=Object.create(s);f.constructor=r,f.facet=function(t){return arguments.length?(this._facet=t,this):this._facet},f._ingest=function(t){return l.ingest(t,null)},f._assign=l.set,f._newcell=function(t,e){var n=s._newcell.call(this,t,e),r=this._facet;if(r){var a=r._graph,o=n.tuple,u=r.param("transform");n.ds=a.data(o._facetID,u,o),n.disconnect=i,r.addListener(u[0])}return n},f._newtuple=function(t,e){var n=s._newtuple.call(this,t);return this._facet&&(l.set(n,"key",e),l.set(n,"_facetID",this._facetID+"_"+e)),n},f.clear=function(){if(this._facet)for(var t in this._cells)this._cells[t].disconnect(this._facet);return s.clear.call(this)},f._on_add=function(t,e){this._facet&&e.ds._input.add.push(t)},f._on_rem=function(t,e){this._facet&&e.ds._input.rem.push(t)},f._on_mod=function(t,e,n,r){this._facet&&(n===r?n.ds._input.mod.push(t):(n.ds._input.rem.push(t),r.ds._input.add.push(t)))},f._on_drop=function(t){this._facet&&t.disconnect(this._facet)},f._on_keep=function(t){this._facet&&u.ChangeSet.copy(this._input,t.ds._input)},e.exports=r},{datalib:26,"vega-dataflow":41,"vega-logging":48}],125:[function(t,e,n){function r(t){return o.prototype.init.call(this,t),o.addParameters(this,{test:{type:"expr"}}),this._skip={},this.router(!0)}var i=t("vega-dataflow"),a=t("vega-logging"),o=t("./Transform"),s=r.prototype=Object.create(o.prototype);s.constructor=r,s.transform=function(t){a.debug(t,["filtering"]);var e=i.ChangeSet.create(t),n=this._skip,r=this.param("test");return t.rem.forEach(function(t){1!==n[t._id]?e.rem.push(t):n[t._id]=0}),t.add.forEach(function(t){r(t)?e.add.push(t):n[t._id]=1}),t.mod.forEach(function(t){var i=r(t),a=1===n[t._id];i&&a?(n[t._id]=0,e.add.push(t)):i&&!a?e.mod.push(t):!i&&a||(e.rem.push(t),n[t._id]=1)}),e},e.exports=r},{"./Transform":140,"vega-dataflow":41,"vega-logging":48}],126:[function(t,e,n){function r(t){return s.prototype.init.call(this,t),s.addParameters(this,{fields:{type:"array<field>"}}),this._output={key:"key",value:"value"},this._cache={},this.router(!0).produces(!0)}var i=t("vega-dataflow"),a=i.Tuple,o=t("vega-logging"),s=t("./Transform"),u=r.prototype=Object.create(s.prototype);u.constructor=r,u._reset=function(t,e){for(var n in this._cache)e.rem.push.apply(e.rem,this._cache[n]);this._cache={}},u._tuple=function(t,e,n){var r=this._cache[t._id]||(this._cache[t._id]=Array(n));return r[e]?a.rederive(t,r[e]):r[e]=a.derive(t)},u._fn=function(t,e,n){var r,i,o,s,u,l;for(r=0,o=t.length;r<o;++r)for(u=t[r],i=0,s=e.field.length;i<s;++i)l=this._tuple(u,i,s),a.set(l,this._output.key,e.field[i]),a.set(l,this._output.value,e.accessor[i](u)),n.push(l)},u.transform=function(t,e){o.debug(t,["folding"]);var n=this,r=this.param("fields"),a=i.ChangeSet.create(t);return e&&this._reset(t,a),this._fn(t.add,r,a.add),this._fn(t.mod,r,e?a.add:a.mod),t.rem.forEach(function(t){a.rem.push.apply(a.rem,n._cache[t._id]),n._cache[t._id]=null}),(t.add.length||t.rem.length||r.field.some(function(e){return!!t.fields[e]}))&&(a.fields[this._output.key]=1,a.fields[this._output.value]=1),a},e.exports=r},{"./Transform":140,"vega-dataflow":41,"vega-logging":48}],127:[function(t,e,n){(function(n){function r(e){return l.prototype.init.call(this,e),this._prev=null,this._interactive=!1,this._setup=!0,this._nodes=[],this._links=[],this._layout=i.layout.force(),l.addParameters(this,{size:{type:"array<value>",default:t("./screen").size},bound:{type:"value",default:!0},links:{type:"data"},linkStrength:{type:"value",default:1},linkDistance:{type:"value",default:20},charge:{type:"value",default:-30},chargeDistance:{type:"value",default:1/0},friction:{type:"value",default:.9},theta:{type:"value",default:.8},gravity:{type:"value",default:.1},alpha:{type:"value",default:.1},iterations:{type:"value",default:500},interactive:{type:"value",default:this._interactive},active:{type:"value",default:this._prev},fixed:{type:"data"}}),this._output={x:"layout_x",y:"layout_y"},this.mutates(!0)}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("vega-dataflow"),o=a.Tuple,s=a.ChangeSet,u=t("vega-logging"),l=t("./Transform"),c=r.prototype=Object.create(l.prototype);c.constructor=r,c.transform=function(t,e){u.debug(t,["force"]),e-=t.signals.active?1:0;var n=this.param("interactive"),r=this.param("links").source,i=r.last(),a=this.param("active"),s=this._output,l=this._layout,c=this._nodes,d=this._links;if(i.stamp<t.stamp&&(i=null),this.configure(t,i,n,e),!n){for(var f=this.param("iterations"),h=0;h<f;++h)l.tick();l.stop()}return this.update(a),(e||a!==this._prev&&a&&a.update)&&l.alpha(this.param("alpha")),a!==this._prev&&(this._prev=a),t.rem.length&&l.nodes(this._nodes=o.idFilter(c,t.rem)),i&&i.rem.length&&l.links(this._links=o.idFilter(d,i.rem)),t.fields[s.x]=1,t.fields[s.y]=1,t},c.configure=function(t,e,n,r){var i=this._layout,a=this._setup||t.add.length||e&&e.add.length||n!==this._interactive||this.param("charge")!==i.charge()||this.param("linkStrength")!==i.linkStrength()||this.param("linkDistance")!==i.linkDistance();if((a||r)&&i.size(this.param("size")).chargeDistance(this.param("chargeDistance")).theta(this.param("theta")).gravity(this.param("gravity")).friction(this.param("friction")),a){this._setup=!1,this._interactive=n;var o,u,l=this,c=this._graph,d=this._nodes,f=this._links;for(o=t.add,u=0;u<o.length;++u)d.push({tuple:o[u]});if(e)for(o=e.add,u=0;u<o.length;++u)f.push({tuple:o[u],source:d[o[u].source],target:d[o[u].target]});var h=n?function(){c.propagate(s.create(null,!0),l)}:null;i.linkStrength(this.param("linkStrength")).linkDistance(this.param("linkDistance")).charge(this.param("charge")).nodes(d).links(f).on("tick",h).start().alpha(this.param("alpha"))}},c.update=function(t){var e,n,r,i,a,s,u=this._output,l=this.param("bound"),c=this.param("fixed"),d=this.param("size"),f=this._nodes,h={};if(c&&c.source)for(c=c.source.values(),n=0,r=c.length;n<r;++n)h[c[n].id]=1;for(n=0;n<f.length;++n)r=f[n],i=r.tuple,e=i._id,t&&t.id===e?(r.fixed=1,t.update&&(r.x=r.px=t.x,r.y=r.py=t.y)):r.fixed=h[e]||0,a=l?Math.max(0,Math.min(r.x,d[0])):r.x,s=l?Math.max(0,Math.min(r.y,d[1])):r.y,o.set(i,u.x,a),o.set(i,u.y,s)},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Transform":140,"./screen":146,"vega-dataflow":41,"vega-logging":48}],128:[function(t,e,n){function r(t){return s.prototype.init.call(this,t),s.addParameters(this,{field:{type:"value"},expr:{type:"expr"}}),this.mutates(!0)}var i=t("vega-dataflow"),a=i.Tuple,o=t("vega-logging"),s=t("./Transform"),u=r.prototype=Object.create(s.prototype);u.constructor=r,u.transform=function(t){function e(t){a.set(t,n,r(t)),i=!0}o.debug(t,["formulating"]);var n=this.param("field"),r=this.param("expr"),i=!1;return t.add.forEach(e),this.reevaluate(t)&&t.mod.forEach(e),i&&(t.fields[n]=1),t},e.exports=r},{"./Transform":140,"vega-dataflow":41,"vega-logging":48}],129:[function(t,e,n){(function(n){function r(t){return u.prototype.init.call(this,t),u.addParameters(this,r.Parameters),u.addParameters(this,{lon:{type:"field"},lat:{type:"field"}}),this._output={x:"layout_x",y:"layout_y"},this.mutates(!0)}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("datalib"),o=t("vega-dataflow").Tuple,s=t("vega-logging"),u=t("./Transform");r.Parameters={projection:{type:"value",default:"mercator"},center:{type:"array<value>"},translate:{type:"array<value>",default:t("./screen").center},rotate:{type:"array<value>"},scale:{type:"value"},precision:{type:"value"},clipAngle:{type:"value"},clipExtent:{type:"value"}},r.d3Projection=function(){var t,e,n,o=this.param("projection"),s=r.Parameters;o!==this._mode&&(this._mode=o,this._projection=i.geo[o]()),t=this._projection;for(e in s)"projection"!==e&&t[e]&&(n=this.param(e),void 0===n||a.isArray(n)&&0===n.length||n!==t[e]()&&t[e](n));return t};var l=r.prototype=Object.create(u.prototype);l.constructor=r,l.transform=function(t){function e(t){var e=[i(t),a(t)],r=u(e)||[null,null];o.set(t,n.x,r[0]),o.set(t,n.y,r[1])}s.debug(t,["geo"]);var n=this._output,i=this.param("lon").accessor,a=this.param("lat").accessor,u=r.d3Projection.call(this);return t.add.forEach(e),this.reevaluate(t)&&(t.mod.forEach(e),t.rem.forEach(e)),t.fields[n.x]=1,t.fields[n.y]=1,t},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Transform":140,"./screen":146,datalib:26,"vega-dataflow":41,"vega-logging":48}],130:[function(t,e,n){(function(n){function r(t){return l.prototype.init.call(this,t),l.addParameters(this,u.Parameters),l.addParameters(this,{field:{type:"field",default:null}}),this._output={path:"layout_path"},this.mutates(!0)}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("datalib"),o=t("vega-dataflow").Tuple,s=t("vega-logging"),u=t("./Geo"),l=t("./Transform"),c=r.prototype=Object.create(l.prototype);c.constructor=r,c.transform=function(t){function e(t){o.set(t,n.path,c(r(t)))}s.debug(t,["geopath"]);var n=this._output,r=this.param("field").accessor||a.identity,l=u.d3Projection.call(this),c=i.geo.path().projection(l);return t.add.forEach(e),this.reevaluate(t)&&(t.mod.forEach(e),t.rem.forEach(e)),t.fields[n.path]=1,t},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Geo":129,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],131:[function(t,e,n){(function(n){function r(e){return l.prototype.init.call(this,e),u.addParameters(this,{sort:{type:"array<field>",default:null},children:{type:"field",default:"children"},parent:{type:"field",default:"parent"},field:{type:"value",default:null},mode:{type:"value",default:"tidy"},size:{type:"array<value>",default:t("./screen").size},nodesize:{type:"array<value>",default:null},orient:{type:"value",default:"cartesian"}}),this._mode=null,this._output={x:"layout_x",y:"layout_y",width:"layout_width",height:"layout_height",depth:"layout_depth"},this.mutates(!0)}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("datalib"),o=t("vega-dataflow").Tuple,s=t("vega-logging"),u=t("./Transform"),l=t("./BatchTransform"),c="partition",d={cartesian:function(t,e){return t.parent===e.parent?1:2},radial:function(t,e){return(t.parent===e.parent?1:2)/t.depth}},f=r.prototype=Object.create(l.prototype);f.constructor=r,f.batchTransform=function(t,e){s.debug(t,["hierarchy layout"]);var n=this._layout,r=this._output,u=this.param("mode"),l=this.param("sort"),f=this.param("nodesize"),h=this.param("parent").accessor,p=e.filter(function(t){return null===h(t)})[0];return u!==this._mode&&(this._mode=u,"tidy"===u&&(u="tree"),n=this._layout=i.layout[u]()),t.fields[r.x]=1,t.fields[r.y]=1,t.fields[r.depth]=1,u===c?(t.fields[r.width]=1,t.fields[r.height]=1,n.value(this.param("field").accessor)):n.separation(d[this.param("orient")]),f.length&&u!==c?n.nodeSize(f):n.size(this.param("size")),n.sort(l.field.length?a.comparator(l.field):null).children(this.param("children").accessor).nodes(p),e.forEach(function(t){o.set(t,r.x,t.x),o.set(t,r.y,t.y),o.set(t,r.depth,t.depth),u===c&&(o.set(t,r.width,t.dx),o.set(t,r.height,t.dy))}),t},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./BatchTransform":119,"./Transform":140,"./screen":146,datalib:26,"vega-dataflow":41,"vega-logging":48}],132:[function(t,e,n){function r(t){return c.prototype.init.call(this,t),l.addParameters(this,{groupby:{type:"array<field>"},orderby:{type:"array<field>"},field:{type:"field"},method:{type:"value",default:"value"},value:{type:"value",default:0}}),this.router(!0).produces(!0)}function i(t,e,n,r){var i,a={_imputed:!0};for(i=0;i<e.length;++i)a[t[i]]=e[i];for(i=0;i<r.length;++i)a[n[i]]=r[i];return u.ingest(a)}function a(t,e,n){var r,i,a,s,u,l,c,d,f=[],h=function(t){return t(a)},p=function(t){return a=t,n.map(h)};for(l=f.domain=o.unique(t,p),d=l.length,c=l.reduce(function(t,e,n){return t[e]={value:e,index:n},t},{}),r={},i=0;i<t.length;++i)a=t[i],s=null==e?[]:e.map(h),u=r[s]||(f.push(r[s]=Array(d)),r[s].values=s,r[s]),u[c[p(a)].index]=a;return f}var o=t("datalib"),s=t("vega-logging"),u=t("vega-dataflow").Tuple,l=t("./Transform"),c=t("./BatchTransform"),d=r.prototype=Object.create(c.prototype);d.constructor=r,d.batchTransform=function(t,e){function n(t){return null==t?null:y(t)}s.debug(t,["imputing"]);var r,u,l,c,d,f,h=this.param("groupby"),p=this.param("orderby"),g=this.param("method"),m=this.param("value"),v=this.param("field"),y=v.accessor,_=v.field,b=this._imputed||[],x=[],w=a(e,h.accessor,p.accessor),k=w.domain;for(l=0,d=w.length;l<d;++l)for(r=w[l],"value"!==g&&(m=o[g](r,n)),u=0,c=r.length;u<c;++u)null==r[u]&&(f=i(h.field,r.values,p.field,k[u]),f[_]=m,x.push(f));for(u=0,c=x.length;u<c;++u)t.add.push(x[u]);for(u=0,c=b.length;u<c;++u)t.rem.push(b[u]);return this._imputed=x,t},e.exports=r},{"./BatchTransform":119,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],133:[function(t,e,n){function r(t){return p.prototype.init.call(this,t),p.addParameters(this,{sourceX:{type:"field",default:"_source.layout_x"},sourceY:{type:"field",default:"_source.layout_y"},targetX:{type:"field",default:"_target.layout_x"},targetY:{type:"field",default:"_target.layout_y"},tension:{type:"value",default:.2},shape:{type:"value",default:"line"}}),this._output={path:"layout_path"},this.mutates(!0)}function i(t,e,n,r){return"M"+t+","+e+"L"+n+","+r}function a(t,e,n,r,i){var a=n-t,o=r-e,s=i*(a+o),u=i*(o-a);return"M"+t+","+e+"C"+(t+s)+","+(e+u)+" "+(n+u)+","+(r-s)+" "+n+","+r}function o(t,e,n,r){return"M"+t+","+e+"V"+r+"H"+n}function s(t,e,n,r){return"M"+t+","+e+"H"+n+"V"+r}function u(t,e,n,r){var i=Math.cos(t),a=Math.sin(t),o=Math.cos(n),s=Math.sin(n),u=Math.abs(n-t)>Math.PI?n<=t:n>t;return"M"+e*i+","+e*a+"A"+e+","+e+" 0 0,"+(u?1:0)+" "+e*o+","+e*s+"L"+r*o+","+r*s}function l(t,e,n,r){var i=(t+n)/2;return"M"+t+","+e+"C"+i+","+e+" "+i+","+r+" "+n+","+r}function c(t,e,n,r){var i=(e+r)/2;return"M"+t+","+e+"C"+t+","+i+" "+n+","+i+" "+n+","+r}function d(t,e,n,r){var i=Math.cos(t),a=Math.sin(t),o=Math.cos(n),s=Math.sin(n),u=(e+r)/2;return"M"+e*i+","+e*a+"C"+u*i+","+u*a+" "+u*o+","+u*s+" "+r*o+","+r*s}var f=t("vega-dataflow").Tuple,h=t("vega-logging"),p=t("./Transform"),g=r.prototype=Object.create(p.prototype);g.constructor=r;var m={line:i,curve:a,cornerX:o,cornerY:s,cornerR:u,diagonalX:l,diagonalY:c,diagonalR:d};g.transform=function(t){function e(t){var e=r(i(t),a(t),o(t),s(t),u);f.set(t,n.path,e)}h.debug(t,["linkpath"]);var n=this._output,r=m[this.param("shape")]||m.line,i=this.param("sourceX").accessor,a=this.param("sourceY").accessor,o=this.param("targetX").accessor,s=this.param("targetY").accessor,u=this.param("tension");return t.add.forEach(e),this.reevaluate(t)&&(t.mod.forEach(e),t.rem.forEach(e)),t.fields[n.path]=1,t},e.exports=r},{"./Transform":140,"vega-dataflow":41,"vega-logging":48}],134:[function(t,e,n){function r(t){return o.prototype.init.call(this,t),o.addParameters(this,{on:{type:"data"},onKey:{type:"field",default:null},as:{type:"array<value>"},keys:{type:"array<field>",default:["data"]},default:{type:"value"}}),this.mutates(!0)}var i=t("vega-dataflow").Tuple,a=t("vega-logging"),o=t("./Transform"),s=r.prototype=Object.create(o.prototype);s.constructor=r,s.transform=function(t,e){function n(t){for(var e=0;e<h.length;++e){var n=m[h[e](t)]||g;i.set(t,p[e],n)}}a.debug(t,["lookup"]);var r,o,s=this.param("on"),u=s.source.last(),l=s.source.values(),c=this.param("onKey"),d=c.field,f=this.param("keys"),h=f.accessor,p=this.param("as"),g=this.param("default"),m=this._lut;if(null==m||this._on!==d||d&&u.fields[d]||u.add.length||u.rem.length){
if(d)for(c=c.accessor,m={},r=0;r<l.length;++r)m[c(o=l[r])]=o;else m=l;this._lut=m,this._on=d,e=!0}t.add.forEach(n);var v=f.field.some(function(e){return t.fields[e]});return(v||e)&&(t.mod.forEach(n),t.rem.forEach(n)),p.forEach(function(e){t.fields[e]=1}),t},e.exports=r},{"./Transform":140,"vega-dataflow":41,"vega-logging":48}],135:[function(t,e,n){function r(t,e,n){this._name=t,this._type=e,this._transform=n,this._value=[],this._accessors=[],this._resolution=!1,this._signals=[]}function i(){var t=s.test(this._type),e=u.test(this._type),n=l.test(this._type),r=t?this._value:this._value[0],i=t?this._accessors:this._accessors[0];return!a.isValid(i)&&d.test(this._type)?r:e?{name:r,source:i}:n?{field:r,accessor:i}:r}var a=t("datalib"),o=t("vega-dataflow").Dependencies,s=/array/i,u=/data/i,l=/field/i,c=/expr/i,d=/value/i,f=r.prototype;f.get=function(){var t,e,n,r,o,s=this._transform._graph,c=u.test(this._type),d=l.test(this._type);if(!this._resolution)return i.call(this);if(c)return this._accessors=this._value.map(function(t){return s.data(t)}),i.call(this);for(t=0,e=this._signals.length;t<e;++t)n=this._signals[t],r=n.index,o=n.value(s),d&&(this._accessors[r]=this._value[r]!=o?a.accessor(o):this._accessors[r]),this._value[r]=o;return i.call(this)},f.set=function(t){var e=this,n=e._transform._graph,r=c.test(this._type),i=u.test(this._type),s=l.test(this._type);return e._signals=[],this._value=a.array(t).map(function(t,u){var l;return a.isString(t)?r?(l=n.expr(t),e._transform.dependency(o.FIELDS,l.fields),e._transform.dependency(o.SIGNALS,l.globals),e._transform.dependency(o.DATA,l.dataSources),l.fn):(s?(e._accessors[u]=a.accessor(t),e._transform.dependency(o.FIELDS,a.field(t))):i&&(e._resolution=!0,e._transform.dependency(o.DATA,t)),t):void 0!==t.value?t.value:void 0!==t.field?(e._accessors[u]=a.accessor(t.field),e._transform.dependency(o.FIELDS,a.field(t.field)),t.field):void 0!==t.signal?(e._resolution=!0,e._transform.dependency(o.SIGNALS,a.field(t.signal)[0]),e._signals.push({index:u,value:function(e){return e.signalRef(t.signal)}}),t.signal):void 0!==t.expr?(e._resolution=!0,l=n.expr(t.expr),e._transform.dependency(o.SIGNALS,l.globals),e._signals.push({index:u,value:function(){return l.fn()}}),t.expr):t}),e._transform},e.exports=r},{datalib:26,"vega-dataflow":41}],136:[function(t,e,n){function r(t){return l.prototype.init.call(this,t),u.addParameters(this,{field:{type:"field",default:null},startAngle:{type:"value",default:0},endAngle:{type:"value",default:2*Math.PI},sort:{type:"value",default:!1}}),this._output={start:"layout_start",end:"layout_end",mid:"layout_mid"},this.mutates(!0)}function i(){return 1}var a=t("datalib"),o=t("vega-dataflow").Tuple,s=t("vega-logging"),u=t("./Transform"),l=t("./BatchTransform"),c=r.prototype=Object.create(l.prototype);c.constructor=r,c.batchTransform=function(t,e){s.debug(t,["pie"]);var n,r,u,l=this._output,c=this.param("field").accessor||i,d=this.param("startAngle"),f=this.param("endAngle"),h=this.param("sort"),p=e.map(c),g=d,m=(f-d)/a.sum(p),v=a.range(e.length);for(h&&v.sort(function(t,e){return p[t]-p[e]}),n=0;n<v.length;++n)r=e[v[n]],u=p[v[n]],o.set(r,l.start,g),o.set(r,l.mid,g+.5*u*m),o.set(r,l.end,g+=u*m);return t.fields[l.start]=1,t.fields[l.end]=1,t.fields[l.mid]=1,t},e.exports=r},{"./BatchTransform":119,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],137:[function(t,e,n){function r(t){return s.prototype.init.call(this,t),o.addParameters(this,{field:{type:"field",default:null},normalize:{type:"value",default:!1}}),this._output={rank:"rank"},this.mutates(!0)}var i=t("vega-dataflow").Tuple,a=t("vega-logging"),o=t("./Transform"),s=t("./BatchTransform"),u=r.prototype=Object.create(s.prototype);u.constructor=r,u.batchTransform=function(t,e){a.debug(t,["rank"]);var n,r,o,s,u=this._output.rank,l=this.param("normalize"),c=this.param("field").accessor,d={},f=e.length;if(c)for(n=0,r=0;n<f;++n)o=e[n],d[s=c(o)]=d[s]||(d[s]=++r);for(n=0;n<f&&(o=e[n]);++n)c&&(s=c(o))?i.set(o,u,l?d[s]/r:d[s]):i.set(o,u,l?(n+1)/f:n+1);return t.fields[u]=1,t},e.exports=r},{"./BatchTransform":119,"./Transform":140,"vega-dataflow":41,"vega-logging":48}],138:[function(t,e,n){function r(t){o.prototype.init.call(this,t),o.addParameters(this,{by:{type:"array<field>"}}),this.router(!0)}var i=t("datalib"),a=t("vega-logging"),o=t("./Transform"),s=r.prototype=Object.create(o.prototype);s.constructor=r,s.transform=function(t){return a.debug(t,["sorting"]),(t.add.length||t.mod.length||t.rem.length)&&(t.sort=i.comparator(this.param("by").field)),t},e.exports=r},{"./Transform":140,datalib:26,"vega-logging":48}],139:[function(t,e,n){function r(t){return l.prototype.init.call(this,t),u.addParameters(this,{groupby:{type:"array<field>"},sortby:{type:"array<field>"},field:{type:"field"},offset:{type:"value",default:"zero"}}),this._output={start:"layout_start",end:"layout_end",mid:"layout_mid"},this.mutates(!0)}function i(t,e,n,r){var i,a,o,s,u,l,c,d=[],f=function(t){return t(o)};if(null==e)d.push(t.slice());else for(i={},a=0;a<t.length;++a)o=t[a],s=e.map(f),u=i[s]||(d.push(i[s]=[]),i[s]),u.push(o);for(s=0,c=0;s<d.length;++s){for(u=d[s],a=0,l=0;a<u.length;++a)l+=r(u[a]);u.sum=l,l>c&&(c=l),null!=n&&u.sort(n)}return d.max=c,d}var a=t("datalib"),o=t("vega-dataflow").Tuple,s=t("vega-logging"),u=t("./Transform"),l=t("./BatchTransform"),c=r.prototype=Object.create(l.prototype);c.constructor=r,c.batchTransform=function(t,e){s.debug(t,["stacking"]);for(var n=this.param("groupby").accessor,r=a.comparator(this.param("sortby").field),u=this.param("field").accessor,l=this.param("offset"),c=this._output,d=i(e,n,r,u),f=0,h=d.max;f<d.length;++f){var p,g,m,v=d[f],y=v.sum,_="center"===l?(h-y)/2:0,b="normalize"===l?1/y:1,x=_,w=0;for(p=0;p<v.length;++p)g=v[p],m=x,w+=u(g),x=b*w+_,o.set(g,c.start,m),o.set(g,c.end,x),o.set(g,c.mid,.5*(m+x))}return t.fields[c.start]=1,t.fields[c.end]=1,t.fields[c.mid]=1,t},e.exports=r},{"./BatchTransform":119,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],140:[function(t,e,n){function r(t){t&&a.init.call(this,t)}var i=t("vega-dataflow"),a=i.Node.prototype,o=i.Dependencies,s=t("./Parameter");r.addParameters=function(t,e){t._parameters=t._parameters||{};for(var n in e){var r=e[n],i=new s(n,r.type,t);t._parameters[n]=i,"custom"===r.type&&(r.set&&(i.set=r.set.bind(i)),r.get&&(i.get=r.get.bind(i))),r.hasOwnProperty("default")&&i.set(r.default)}};var u=r.prototype=Object.create(a);u.constructor=r,u.param=function(t,e){var n=this._parameters[t];return void 0===n?this:1===arguments.length?n.get():n.set(e)},u.transform=function(t){return t},u.evaluate=function(t){var e=this._stamp<t.stamp&&this.dependency(o.SIGNALS).reduce(function(e,n){return e+=t.signals[n]?1:0},0);return this.transform(t,e)},u.output=function(t){for(var e in this._output)void 0!==t[e]&&(this._output[e]=t[e]);return this},e.exports=r},{"./Parameter":135,"vega-dataflow":41}],141:[function(t,e,n){function r(t){return u.prototype.init.call(this,t),s.addParameters(this,{groupby:{type:"array<field>"}}),this._output={children:"children",parent:"parent"},this.router(!0).produces(!0)}var i=t("datalib"),a=t("vega-dataflow").Tuple,o=t("vega-logging"),s=t("./Transform"),u=t("./BatchTransform"),l=r.prototype=Object.create(u.prototype);l.constructor=r,l.batchTransform=function(t,e){function n(t,e,r){var i=f[t].execute(r);e[l]=i,i.forEach(function(r){r[c]=e,p.push(a.ingest(r)),t+1<u.length?n(t+1,r,r[l]):r[l].forEach(function(t){t[c]=r})})}o.debug(t,["treeifying"]);var r,s,u=this.param("groupby").field,l=this._output.children,c=this._output.parent,d=[{name:"*",ops:["values"],as:[l]}],f=u.map(function(t){return i.groupby(t).summarize(d)}),h=this._internal||[],p=[],g=a.ingest({});for(g[c]=null,p.push(g),n(0,g,e),r=0,s=p.length;r<s;++r)t.add.push(p[r]);for(r=0,s=h.length;r<s;++r)t.rem.push(h[r]);return this._internal=p,t},e.exports=r},{"./BatchTransform":119,"./Transform":140,datalib:26,"vega-dataflow":41,"vega-logging":48}],142:[function(t,e,n){(function(n){function r(e){return l.prototype.init.call(this,e),u.addParameters(this,{sort:{type:"array<field>",default:["-value"]},children:{type:"field",default:"children"},parent:{type:"field",default:"parent"},field:{type:"field",default:"value"},size:{type:"array<value>",default:t("./screen").size},round:{type:"value",default:!0},sticky:{type:"value",default:!1},ratio:{type:"value",default:c},padding:{type:"value",default:null},mode:{type:"value",default:"squarify"}}),this._layout=i.layout.treemap(),this._output={x:"layout_x",y:"layout_y",width:"layout_width",height:"layout_height",depth:"layout_depth"},this.mutates(!0)}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("datalib"),o=t("vega-dataflow").Tuple,s=t("vega-logging"),u=t("./Transform"),l=t("./BatchTransform"),c=.5*(1+Math.sqrt(5)),d=r.prototype=Object.create(l.prototype);d.constructor=r,d.batchTransform=function(t,e){s.debug(t,["treemap"]);var n=this._layout,r=this._output,i=this.param("sticky"),u=this.param("parent").accessor,l=e.filter(function(t){return null===u(t)})[0];return n.sticky()!==i&&n.sticky(i),n.sort(a.comparator(this.param("sort").field)).children(this.param("children").accessor).value(this.param("field").accessor).size(this.param("size")).round(this.param("round")).ratio(this.param("ratio")).padding(this.param("padding")).mode(this.param("mode")).nodes(l),e.forEach(function(t){o.set(t,r.x,t.x),o.set(t,r.y,t.y),o.set(t,r.width,t.dx),o.set(t,r.height,t.dy),o.set(t,r.depth,t.depth)}),t.fields[r.x]=1,t.fields[r.y]=1,t.fields[r.width]=1,t.fields[r.height]=1,t.fields[r.depth]=1,t},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./BatchTransform":119,"./Transform":140,"./screen":146,datalib:26,"vega-dataflow":41,"vega-logging":48}],143:[function(t,e,n){(function(n){function r(e){return u.prototype.init.call(this,e),s.addParameters(this,{clipExtent:{type:"array<value>",default:t("./screen").extent},x:{type:"field",default:"layout_x"},y:{type:"field",default:"layout_y"}}),this._layout=i.geom.voronoi(),this._output={path:"layout_path"},this.mutates(!0)}var i="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,a=t("vega-dataflow/src/Tuple"),o=t("vega-logging"),s=t("./Transform"),u=t("./BatchTransform"),l=r.prototype=Object.create(u.prototype);l.constructor=r,l.batchTransform=function(t,e){o.debug(t,["voronoi"]);for(var n=this._output.path,r=this._layout.clipExtent(this.param("clipExtent")).x(this.param("x").accessor).y(this.param("y").accessor)(e),i=0;i<e.length;++i)r[i]&&a.set(e[i],n,"M"+r[i].join("L")+"Z");return t.fields[n]=1,t},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./BatchTransform":119,"./Transform":140,"./screen":146,"vega-dataflow/src/Tuple":40,"vega-logging":48}],144:[function(t,e,n){(function(n){function r(e){return h.prototype.init.call(this,e),f.addParameters(this,{size:{type:"array<value>",default:t("./screen").size},text:{type:"field",default:"data"},rotate:{type:"field|value",default:0},font:{type:"field|value",default:{value:"sans-serif"}},fontSize:{type:"field|value",default:14},fontStyle:{type:"field|value",default:{value:"normal"}},fontWeight:{type:"field|value",default:{value:"normal"}},fontScale:{type:"array<value>",default:[10,50]},padding:{type:"value",default:1},spiral:{type:"value",default:"archimedean"}}),this._layout=u().canvas(l.instance),this._output={x:"layout_x",y:"layout_y",font:"layout_font",fontSize:"layout_fontSize",fontStyle:"layout_fontStyle",fontWeight:"layout_fontWeight",rotate:"layout_rotate"},this.mutates(!0)}function i(t){return t&&t.accessor||t}function a(t){var e=Object.create(t);return e._tuple=t,e}var o=t("datalib"),s="undefined"!=typeof window?window.d3:"undefined"!=typeof n?n.d3:null,u="undefined"!=typeof window?window.d3.layout.cloud:"undefined"!=typeof n?n.d3.layout.cloud:null,l=t("vega-scenegraph").canvas,c=t("vega-dataflow/src/Tuple"),d=t("vega-logging"),f=t("./Transform"),h=t("./BatchTransform"),p=r.prototype=Object.create(h.prototype);p.constructor=r,p.batchTransform=function(t,e){d.debug(t,["wordcloud"]);var n,r,u=this._layout,l=this._output,f=this.param("fontSize"),h=f.accessor&&this.param("fontScale");f=f.accessor||s.functor(f),h.length&&(r=s.scale.sqrt().domain(o.extent(e,n=f)).range(h),f=function(t){return r(n(t))}),u.size(this.param("size")).text(i(this.param("text"))).padding(this.param("padding")).spiral(this.param("spiral")).rotate(i(this.param("rotate"))).font(i(this.param("font"))).fontStyle(i(this.param("fontStyle"))).fontWeight(i(this.param("fontWeight"))).fontSize(f).words(e.map(a)).on("end",function(t){var e,n,r,i,a=u.size(),o=a[0]>>1,s=a[1]>>1;for(r=0,i=t.length;r<i;++r)e=t[r],n=e._tuple,c.set(n,l.x,e.x+o),c.set(n,l.y,e.y+s),c.set(n,l.font,e.font),c.set(n,l.fontSize,e.size),c.set(n,l.fontStyle,e.style),c.set(n,l.fontWeight,e.weight),c.set(n,l.rotate,e.rotate)}).start();for(var p in l)t.fields[l[p]]=1;return t},e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./BatchTransform":119,"./Transform":140,"./screen":146,datalib:26,"vega-dataflow/src/Tuple":40,"vega-logging":48,"vega-scenegraph":49}],145:[function(t,e,n){e.exports={aggregate:t("./Aggregate"),bin:t("./Bin"),cross:t("./Cross"),countpattern:t("./CountPattern"),linkpath:t("./LinkPath"),facet:t("./Facet"),filter:t("./Filter"),fold:t("./Fold"),force:t("./Force"),formula:t("./Formula"),geo:t("./Geo"),geopath:t("./GeoPath"),hierarchy:t("./Hierarchy"),impute:t("./Impute"),lookup:t("./Lookup"),pie:t("./Pie"),rank:t("./Rank"),sort:t("./Sort"),stack:t("./Stack"),treeify:t("./Treeify"),treemap:t("./Treemap"),voronoi:t("./Voronoi"),wordcloud:t("./Wordcloud")}},{"./Aggregate":118,"./Bin":120,"./CountPattern":121,"./Cross":122,"./Facet":123,"./Filter":125,"./Fold":126,"./Force":127,"./Formula":128,"./Geo":129,"./GeoPath":130,"./Hierarchy":131,"./Impute":132,"./LinkPath":133,"./Lookup":134,"./Pie":136,"./Rank":137,"./Sort":138,"./Stack":139,"./Treeify":141,"./Treemap":142,"./Voronoi":143,"./Wordcloud":144}],146:[function(t,e,n){e.exports={size:[{signal:"width"},{signal:"height"}],mid:[{expr:"width/2"},{expr:"height/2"}],extent:[{expr:"[-padding.left, -padding.top]"},{expr:"[width+padding.right, height+padding.bottom]"}]}},{}],147:[function(t,e,n){function r(t,e,n,r){var a=n||i(t);return o(t,e,a,r)}function i(t){switch(t.type){case u:return u;case l:return l;case d:return c;default:return f}}function a(t,e,n,r){function i(t){return(e[0]<0?-Math.log(t>0?0:-t):Math.log(t<0?0:t))/Math.log(s)}function a(t){return e[0]<0?-Math.pow(s,-t):Math.pow(s,t)}if(null==n)return r;var o,s=t.base(),u=Math.min(s,t.ticks().length/n),l=e[0]>0?(o=1e-12,Math.ceil):(o=-1e-12,Math.floor);return function(t){return a(l(i(t)+o))/t>=u?r(t):""}}function o(t,e,n,r){var i,o=s.format,c="log"===t.type;switch(n){case f:return i=t.domain(),c?a(t,i,e,o.auto.number(r||null)):o.auto.linear(i,e,r||null);case u:return(r?o:o.auto).time(r);case l:return(r?o:o.auto).utc(r);default:return String}}var s=t("datalib"),u="time",l="utc",c="string",d="ordinal",f="number";e.exports={getTickFormat:r}},{datalib:26}],148:[function(t,e,n){var r=t("datalib"),i={};r.extend(i,t("./format")),e.exports=r.extend(i,r)},{"./format":147,datalib:26}],149:[function(t,e,n){e.exports=function(t,e,n,r){return void 0!==t[n]?t[n]:void 0!==e&&void 0!==e[n]?e[n]:void 0!==r?r:void 0}},{}]},{},[1])(1)});
;(self.AMP = self.AMP || []).push({n:"amp-viz-vega", f:(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
var CSS = "amp-viz-vega canvas{display:block}\n/*# sourceURL=/extensions/amp-viz-vega/0.1/amp-viz-vega.css*/";
exports.CSS = CSS;

},{}],2:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _buildAmpVizVega01Css = require('../../../build/amp-viz-vega-0.1.css');

var _srcDom = require('../../../src/dom');

var dom = babelHelpers.interopRequireWildcard(_srcDom);

var _srcExperiments = require('../../../src/experiments');

var _srcJson = require('../../../src/json');

var _srcLayout = require('../../../src/layout');

var _srcLog = require('../../../src/log');

var _srcTypes = require('../../../src/types');

var _srcUrl = require('../../../src/url');

var _srcVsync = require('../../../src/vsync');

var _srcXhr = require('../../../src/xhr');

/** @const */
var EXPERIMENT = 'amp-viz-vega';

var AmpVizVega = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpVizVega, _AMP$BaseElement);

  /** @param {!AmpElement} element */

  function AmpVizVega(element) {
    babelHelpers.classCallCheck(this, AmpVizVega);

    _AMP$BaseElement.call(this, element);

    /** @private {?JSONType} */
    this.data_ = null;

    /** @private {?string} */
    this.inlineData_ = null;

    /** @private {?string} */
    this.src_ = null;

    /** @private {boolean} */
    this.useDataWidth_ = false;

    /** @private {boolean} */
    this.useDataHeight_ = false;

    /** @private {number} */
    this.measuredWidth_ = 0;

    /** @private {number} */
    this.measuredHeight_ = 0;

    /** @private {?VegaObject} */
    this.vega_ = null;

    /** @private {?Element} */
    this.container_ = null;

    /**
     * @private {Object}
     * Instance of Vega chart object. https://goo.gl/laszHL
     */
    this.chart_ = null;
  }

  /** @override */

  AmpVizVega.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /** @override */

  AmpVizVega.prototype.buildCallback = function buildCallback() {
    _srcLog.user().assert(_srcExperiments.isExperimentOn(this.win, EXPERIMENT), 'Experiment ' + EXPERIMENT + ' disabled');

    /**
     * Global vg (and implicitly d3) are required and they are created by
     * appending vega and d3 minified files during the build process.
     */
    this.vega_ = this.win.vg;
    this.inlineData_ = this.getInlineData_();
    this.src_ = this.element.getAttribute('src');
    this.useDataWidth_ = this.element.hasAttribute('use-data-width');
    this.useDataHeight_ = this.element.hasAttribute('use-data-height');

    _srcLog.user().assert(this.inlineData_ || this.src_, '%s: neither `src` attribute nor a ' + 'valid <script type="application/json"> child was found for Vega data.', this.getName_());

    _srcLog.user().assert(!(this.inlineData_ && this.src_), '%s: both `src` attribute and a valid ' + '<script type="application/json"> child were found for Vega data. ' + 'Only one way of specifying the data is allowed.', this.getName_());

    if (this.src_) {
      _srcUrl.assertHttpsUrl(this.src_, this.element, this.getName_());
    }
  };

  /** @override */

  AmpVizVega.prototype.layoutCallback = function layoutCallback() {
    var _this = this;

    this.initialize_();
    return this.loadData_().then(function () {
      return _this.renderGraph_();
    });
  };

  /** @override */

  AmpVizVega.prototype.onLayoutMeasure = function onLayoutMeasure() {
    var box = this.getLayoutBox();
    if (this.measuredWidth_ == box.width && this.measuredHeight_ == box.height) {
      return;
    }
    this.measuredWidth_ = box.width;
    this.measuredHeight_ = box.height;
    if (this.chart_) {
      this.renderGraph_();
    }
  };

  /**
   * Create the vega container.
   * Called lazily in the first `#layoutCallback`.
   */

  AmpVizVega.prototype.initialize_ = function initialize_() {
    this.container_ = this.element.ownerDocument.createElement('div');

    this.applyFillContent(this.container_, true);
    this.element.appendChild(this.container_);
  };

  /**
   * @return {!Promise}
   * @private
   */

  AmpVizVega.prototype.loadData_ = function loadData_() {
    var _this2 = this;

    // Validation in buildCallback should ensure one and only one of
    // src_/inlineData_ is ever set.
    _srcLog.dev().assert(!this.src_ != !this.inlineData_);

    if (this.inlineData_) {
      this.data_ = _srcJson.tryParseJson(this.inlineData_, function (err) {
        _srcLog.user().assert(!err, 'data could not be ' + 'parsed. Is it in a valid JSON format?: %s', err);
      });
      return Promise.resolve();
    } else {
      // TODO(aghassemi): We may need to expose credentials and set
      // requireAmpResponseSourceOrigin to true as well. But for now Vega
      // runtime also does XHR to load subresources (e.g. Vega spec can
      // point to other Vega specs) an they don't include credentials on those
      // calls. We may want to intercept all "urls" in spec and do the loading
      // and parsing ourselves.

      return _srcXhr.xhrFor(this.win).fetchJson(_srcLog.dev().assertString(this.src_)).then(function (data) {
        _this2.data_ = data;
      });
    }
  };

  /**
   * @return {?string|undefined}
   * @private
   */

  AmpVizVega.prototype.getInlineData_ = function getInlineData_() {
    var scripts = dom.childElementsByTag(this.element, 'SCRIPT');
    if (scripts.length == 0) {
      return;
    }

    _srcLog.user().assert(scripts.length == 1, '%s: more than one ' + '<script> tags found. Only one allowed.', this.getName_());

    var child = scripts[0];
    _srcLog.user().assert(dom.isJsonScriptTag(child), '%s: data should ' + 'be put in a <script type="application/json"> tag.', this.getName_());

    return child.textContent;
  };

  /**
   * @return {!Promise}
   * @private
   */

  AmpVizVega.prototype.renderGraph_ = function renderGraph_() {
    var _this3 = this;

    var parsePromise = new Promise(function (resolve, reject) {
      _this3.vega_.parse.spec(_this3.data_, function (error, chartFactory) {
        if (error) {
          reject(error);
        }
        resolve(chartFactory);
      });
    });

    return parsePromise.then(function (chartFactory) {
      return _srcVsync.vsyncFor(_this3.win).mutatePromise(function () {
        dom.removeChildren(_srcLog.dev().assertElement(_this3.container_));
        _this3.chart_ = chartFactory({ el: _this3.container_ });
        if (!_this3.useDataWidth_) {
          var w = _this3.measuredWidth_ - _this3.getDataPadding_('width');
          _this3.chart_.width(w);
        }
        if (!_this3.useDataHeight_) {
          var h = _this3.measuredHeight_ - _this3.getDataPadding_('height');
          _this3.chart_.height(h);
        }

        _this3.chart_.viewport([_this3.measuredWidth_, _this3.measuredHeight_]);
        _this3.chart_.update();
      });
    });
  };

  /**
   * Gets the padding defined in the Vega data for either width or height.
   * @param {!string} widthOrHeight One of 'width' or 'height' string values.
   * @return {!number}
   * @private
   */

  AmpVizVega.prototype.getDataPadding_ = function getDataPadding_(widthOrHeight) {
    var p = this.data_.padding;
    if (!p) {
      return 0;
    }
    if (_srcTypes.isFiniteNumber(p)) {
      return p;
    }
    if (_srcTypes.isObject(p)) {
      if (widthOrHeight == 'width') {
        return (p.left || 0) + (p.right || 0);
      } else if (widthOrHeight == 'height') {
        return (p.top || 0) + (p.bottom || 0);
      }
    }
    return 0;
  };

  /**
   * @return {string} Returns a string to identify this tag. May not be unique
   * if the element id is not unique.
   * @private
   */

  AmpVizVega.prototype.getName_ = function getName_() {
    return 'amp-viz-vega ' + (this.element.getAttribute('id') || '<unknown id>');
  };

  return AmpVizVega;
})(AMP.BaseElement);

exports.AmpVizVega = AmpVizVega;

AMP.registerElement('amp-viz-vega', AmpVizVega, _buildAmpVizVega01Css.CSS);

},{"../../../build/amp-viz-vega-0.1.css":1,"../../../src/dom":7,"../../../src/experiments":8,"../../../src/json":9,"../../../src/layout":10,"../../../src/log":11,"../../../src/types":22,"../../../src/url":23,"../../../src/vsync":24,"../../../src/xhr":25}],3:[function(require,module,exports){
(function (global){
/*!

Copyright (C) 2014-2016 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
function installCustomElements(window) {'use strict';

  // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
  // THIS FILE IS JUST WRAPPED UP RESULTING IN
  // build/document-register-element.node.js

  var
    document = window.document,
    Object = window.Object
  ;

  var htmlClass = (function (info) {
    // (C) Andrea Giammarchi - @WebReflection - MIT Style
    var
      catchClass = /^[A-Z]+[a-z]/,
      filterBy = function (re) {
        var arr = [], tag;
        for (tag in register) {
          if (re.test(tag)) arr.push(tag);
        }
        return arr;
      },
      add = function (Class, tag) {
        tag = tag.toLowerCase();
        if (!(tag in register)) {
          register[Class] = (register[Class] || []).concat(tag);
          register[tag] = (register[tag.toUpperCase()] = Class);
        }
      },
      register = (Object.create || Object)(null),
      htmlClass = {},
      i, section, tags, Class
    ;
    for (section in info) {
      for (Class in info[section]) {
        tags = info[section][Class];
        register[Class] = tags;
        for (i = 0; i < tags.length; i++) {
          register[tags[i].toLowerCase()] =
          register[tags[i].toUpperCase()] = Class;
        }
      }
    }
    htmlClass.get = function get(tagOrClass) {
      return typeof tagOrClass === 'string' ?
        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
        filterBy(tagOrClass);
    };
    htmlClass.set = function set(tag, Class) {
      return (catchClass.test(tag) ?
        add(tag, Class) :
        add(Class, tag)
      ), htmlClass;
    };
    return htmlClass;
  }({
    "collections": {
      "HTMLAllCollection": [
        "all"
      ],
      "HTMLCollection": [
        "forms"
      ],
      "HTMLFormControlsCollection": [
        "elements"
      ],
      "HTMLOptionsCollection": [
        "options"
      ]
    },
    "elements": {
      "Element": [
        "element"
      ],
      "HTMLAnchorElement": [
        "a"
      ],
      "HTMLAppletElement": [
        "applet"
      ],
      "HTMLAreaElement": [
        "area"
      ],
      "HTMLAttachmentElement": [
        "attachment"
      ],
      "HTMLAudioElement": [
        "audio"
      ],
      "HTMLBRElement": [
        "br"
      ],
      "HTMLBaseElement": [
        "base"
      ],
      "HTMLBodyElement": [
        "body"
      ],
      "HTMLButtonElement": [
        "button"
      ],
      "HTMLCanvasElement": [
        "canvas"
      ],
      "HTMLContentElement": [
        "content"
      ],
      "HTMLDListElement": [
        "dl"
      ],
      "HTMLDataElement": [
        "data"
      ],
      "HTMLDataListElement": [
        "datalist"
      ],
      "HTMLDetailsElement": [
        "details"
      ],
      "HTMLDialogElement": [
        "dialog"
      ],
      "HTMLDirectoryElement": [
        "dir"
      ],
      "HTMLDivElement": [
        "div"
      ],
      "HTMLDocument": [
        "document"
      ],
      "HTMLElement": [
        "element",
        "abbr",
        "address",
        "article",
        "aside",
        "b",
        "bdi",
        "bdo",
        "cite",
        "code",
        "command",
        "dd",
        "dfn",
        "dt",
        "em",
        "figcaption",
        "figure",
        "footer",
        "header",
        "i",
        "kbd",
        "mark",
        "nav",
        "noscript",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "section",
        "small",
        "strong",
        "sub",
        "summary",
        "sup",
        "u",
        "var",
        "wbr"
      ],
      "HTMLEmbedElement": [
        "embed"
      ],
      "HTMLFieldSetElement": [
        "fieldset"
      ],
      "HTMLFontElement": [
        "font"
      ],
      "HTMLFormElement": [
        "form"
      ],
      "HTMLFrameElement": [
        "frame"
      ],
      "HTMLFrameSetElement": [
        "frameset"
      ],
      "HTMLHRElement": [
        "hr"
      ],
      "HTMLHeadElement": [
        "head"
      ],
      "HTMLHeadingElement": [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6"
      ],
      "HTMLHtmlElement": [
        "html"
      ],
      "HTMLIFrameElement": [
        "iframe"
      ],
      "HTMLImageElement": [
        "img"
      ],
      "HTMLInputElement": [
        "input"
      ],
      "HTMLKeygenElement": [
        "keygen"
      ],
      "HTMLLIElement": [
        "li"
      ],
      "HTMLLabelElement": [
        "label"
      ],
      "HTMLLegendElement": [
        "legend"
      ],
      "HTMLLinkElement": [
        "link"
      ],
      "HTMLMapElement": [
        "map"
      ],
      "HTMLMarqueeElement": [
        "marquee"
      ],
      "HTMLMediaElement": [
        "media"
      ],
      "HTMLMenuElement": [
        "menu"
      ],
      "HTMLMenuItemElement": [
        "menuitem"
      ],
      "HTMLMetaElement": [
        "meta"
      ],
      "HTMLMeterElement": [
        "meter"
      ],
      "HTMLModElement": [
        "del",
        "ins"
      ],
      "HTMLOListElement": [
        "ol"
      ],
      "HTMLObjectElement": [
        "object"
      ],
      "HTMLOptGroupElement": [
        "optgroup"
      ],
      "HTMLOptionElement": [
        "option"
      ],
      "HTMLOutputElement": [
        "output"
      ],
      "HTMLParagraphElement": [
        "p"
      ],
      "HTMLParamElement": [
        "param"
      ],
      "HTMLPictureElement": [
        "picture"
      ],
      "HTMLPreElement": [
        "pre"
      ],
      "HTMLProgressElement": [
        "progress"
      ],
      "HTMLQuoteElement": [
        "blockquote",
        "q",
        "quote"
      ],
      "HTMLScriptElement": [
        "script"
      ],
      "HTMLSelectElement": [
        "select"
      ],
      "HTMLShadowElement": [
        "shadow"
      ],
      "HTMLSlotElement": [
        "slot"
      ],
      "HTMLSourceElement": [
        "source"
      ],
      "HTMLSpanElement": [
        "span"
      ],
      "HTMLStyleElement": [
        "style"
      ],
      "HTMLTableCaptionElement": [
        "caption"
      ],
      "HTMLTableCellElement": [
        "td",
        "th"
      ],
      "HTMLTableColElement": [
        "col",
        "colgroup"
      ],
      "HTMLTableElement": [
        "table"
      ],
      "HTMLTableRowElement": [
        "tr"
      ],
      "HTMLTableSectionElement": [
        "thead",
        "tbody",
        "tfoot"
      ],
      "HTMLTemplateElement": [
        "template"
      ],
      "HTMLTextAreaElement": [
        "textarea"
      ],
      "HTMLTimeElement": [
        "time"
      ],
      "HTMLTitleElement": [
        "title"
      ],
      "HTMLTrackElement": [
        "track"
      ],
      "HTMLUListElement": [
        "ul"
      ],
      "HTMLUnknownElement": [
        "unknown",
        "vhgroupv",
        "vkeygen"
      ],
      "HTMLVideoElement": [
        "video"
      ]
    },
    "nodes": {
      "Attr": [
        "node"
      ],
      "Audio": [
        "audio"
      ],
      "CDATASection": [
        "node"
      ],
      "CharacterData": [
        "node"
      ],
      "Comment": [
        "#comment"
      ],
      "Document": [
        "#document"
      ],
      "DocumentFragment": [
        "#document-fragment"
      ],
      "DocumentType": [
        "node"
      ],
      "HTMLDocument": [
        "#document"
      ],
      "Image": [
        "img"
      ],
      "Option": [
        "option"
      ],
      "ProcessingInstruction": [
        "node"
      ],
      "ShadowRoot": [
        "#shadow-root"
      ],
      "Text": [
        "#text"
      ],
      "XMLDocument": [
        "xml"
      ]
    }
  }));
  
  
    var
    // V0 polyfill entry
    REGISTER_ELEMENT = 'registerElement',
  
    // IE < 11 only + old WebKit for attributes + feature detection
    EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),
  
    // shortcuts and costants
    ADD_EVENT_LISTENER = 'addEventListener',
    ATTACHED = 'attached',
    CALLBACK = 'Callback',
    DETACHED = 'detached',
    EXTENDS = 'extends',
  
    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
    CONNECTED_CALLBACK = 'connected' + CALLBACK,
    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
    CREATED_CALLBACK = 'created' + CALLBACK,
    DETACHED_CALLBACK = DETACHED + CALLBACK,
  
    ADDITION = 'ADDITION',
    MODIFICATION = 'MODIFICATION',
    REMOVAL = 'REMOVAL',
  
    DOM_ATTR_MODIFIED = 'DOMAttrModified',
    DOM_CONTENT_LOADED = 'DOMContentLoaded',
    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
  
    PREFIX_TAG = '<',
    PREFIX_IS = '=',
  
    // valid and invalid node names
    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
    invalidNames = [
      'ANNOTATION-XML',
      'COLOR-PROFILE',
      'FONT-FACE',
      'FONT-FACE-SRC',
      'FONT-FACE-URI',
      'FONT-FACE-FORMAT',
      'FONT-FACE-NAME',
      'MISSING-GLYPH'
    ],
  
    // registered types and their prototypes
    types = [],
    protos = [],
  
    // to query subnodes
    query = '',
  
    // html shortcut used to feature detect
    documentElement = document.documentElement,
  
    // ES5 inline helpers || basic patches
    indexOf = types.indexOf || function (v) {
      for(var i = this.length; i-- && this[i] !== v;){}
      return i;
    },
  
    // other helpers / shortcuts
    OP = Object.prototype,
    hOP = OP.hasOwnProperty,
    iPO = OP.isPrototypeOf,
  
    defineProperty = Object.defineProperty,
    empty = [],
    gOPD = Object.getOwnPropertyDescriptor,
    gOPN = Object.getOwnPropertyNames,
    gPO = Object.getPrototypeOf,
    sPO = Object.setPrototypeOf,
  
    // jshint proto: true
    hasProto = !!Object.__proto__,
  
    // V1 helpers
    fixGetClass = false,
    DRECEV1 = '__dreCEv1',
    customElements = window.customElements,
    usableCustomElements = !!(
      customElements &&
      customElements.define &&
      customElements.get &&
      customElements.whenDefined
    ),
    Dict = Object.create || Object,
    Map = window.Map || function Map() {
      var K = [], V = [], i;
      return {
        get: function (k) {
          return V[indexOf.call(K, k)];
        },
        set: function (k, v) {
          i = indexOf.call(K, k);
          if (i < 0) V[K.push(k) - 1] = v;
          else V[i] = v;
        }
      };
    },
    Promise = window.Promise || function (fn) {
      var
        notify = [],
        done = false,
        p = {
          'catch': function () {
            return p;
          },
          'then': function (cb) {
            notify.push(cb);
            if (done) setTimeout(resolve, 1);
            return p;
          }
        }
      ;
      function resolve(value) {
        done = true;
        while (notify.length) notify.shift()(value);
      }
      fn(resolve);
      return p;
    },
    justCreated = false,
    constructors = Dict(null),
    waitingList = Dict(null),
    nodeNames = new Map(),
    secondArgument = String,
  
    // used to create unique instances
    create = Object.create || function Bridge(proto) {
      // silly broken polyfill probably ever used but short enough to work
      return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
    },
  
    // will set the prototype if possible
    // or copy over all properties
    setPrototype = sPO || (
      hasProto ?
        function (o, p) {
          o.__proto__ = p;
          return o;
        } : (
      (gOPN && gOPD) ?
        (function(){
          function setProperties(o, p) {
            for (var
              key,
              names = gOPN(p),
              i = 0, length = names.length;
              i < length; i++
            ) {
              key = names[i];
              if (!hOP.call(o, key)) {
                defineProperty(o, key, gOPD(p, key));
              }
            }
          }
          return function (o, p) {
            do {
              setProperties(o, p);
            } while ((p = gPO(p)) && !iPO.call(p, o));
            return o;
          };
        }()) :
        function (o, p) {
          for (var key in p) {
            o[key] = p[key];
          }
          return o;
        }
    )),
  
    // DOM shortcuts and helpers, if any
  
    MutationObserver = window.MutationObserver ||
                       window.WebKitMutationObserver,
  
    HTMLElementPrototype = (
      window.HTMLElement ||
      window.Element ||
      window.Node
    ).prototype,
  
    IE8 = !iPO.call(HTMLElementPrototype, documentElement),
  
    safeProperty = IE8 ? function (o, k, d) {
      o[k] = d.value;
      return o;
    } : defineProperty,
  
    isValidNode = IE8 ?
      function (node) {
        return node.nodeType === 1;
      } :
      function (node) {
        return iPO.call(HTMLElementPrototype, node);
      },
  
    targets = IE8 && [],
  
    cloneNode = HTMLElementPrototype.cloneNode,
    dispatchEvent = HTMLElementPrototype.dispatchEvent,
    getAttribute = HTMLElementPrototype.getAttribute,
    hasAttribute = HTMLElementPrototype.hasAttribute,
    removeAttribute = HTMLElementPrototype.removeAttribute,
    setAttribute = HTMLElementPrototype.setAttribute,
  
    // replaced later on
    createElement = document.createElement,
    patchedCreateElement = createElement,
  
    // shared observer for all attributes
    attributesObserver = MutationObserver && {
      attributes: true,
      characterData: true,
      attributeOldValue: true
    },
  
    // useful to detect only if there's no MutationObserver
    DOMAttrModified = MutationObserver || function(e) {
      doesNotSupportDOMAttrModified = false;
      documentElement.removeEventListener(
        DOM_ATTR_MODIFIED,
        DOMAttrModified
      );
    },
  
    // will both be used to make DOMNodeInserted asynchronous
    asapQueue,
    asapTimer = 0,
  
    // internal flags
    setListener = false,
    doesNotSupportDOMAttrModified = true,
    dropDomContentLoaded = true,
  
    // needed for the innerHTML helper
    notFromInnerHTMLHelper = true,
  
    // optionally defined later on
    onSubtreeModified,
    callDOMAttrModified,
    getAttributesMirror,
    observer,
  
    // based on setting prototype capability
    // will check proto or the expando attribute
    // in order to setup the node once
    patchIfNotAlready,
    patch
  ;
  
  // only if needed
  if (!(REGISTER_ELEMENT in document)) {
  
    if (sPO || hasProto) {
        patchIfNotAlready = function (node, proto) {
          if (!iPO.call(proto, node)) {
            setupNode(node, proto);
          }
        };
        patch = setupNode;
    } else {
        patchIfNotAlready = function (node, proto) {
          if (!node[EXPANDO_UID]) {
            node[EXPANDO_UID] = Object(true);
            setupNode(node, proto);
          }
        };
        patch = patchIfNotAlready;
    }
  
    if (IE8) {
      doesNotSupportDOMAttrModified = false;
      (function (){
        var
          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
          addEventListener = descriptor.value,
          patchedRemoveAttribute = function (name) {
            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
            e.attrName = name;
            e.prevValue = getAttribute.call(this, name);
            e.newValue = null;
            e[REMOVAL] = e.attrChange = 2;
            removeAttribute.call(this, name);
            dispatchEvent.call(this, e);
          },
          patchedSetAttribute = function (name, value) {
            var
              had = hasAttribute.call(this, name),
              old = had && getAttribute.call(this, name),
              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
            ;
            setAttribute.call(this, name, value);
            e.attrName = name;
            e.prevValue = had ? old : null;
            e.newValue = value;
            if (had) {
              e[MODIFICATION] = e.attrChange = 1;
            } else {
              e[ADDITION] = e.attrChange = 0;
            }
            dispatchEvent.call(this, e);
          },
          onPropertyChange = function (e) {
            // jshint eqnull:true
            var
              node = e.currentTarget,
              superSecret = node[EXPANDO_UID],
              propertyName = e.propertyName,
              event
            ;
            if (superSecret.hasOwnProperty(propertyName)) {
              superSecret = superSecret[propertyName];
              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
              event.attrName = superSecret.name;
              event.prevValue = superSecret.value || null;
              event.newValue = (superSecret.value = node[propertyName] || null);
              if (event.prevValue == null) {
                event[ADDITION] = event.attrChange = 0;
              } else {
                event[MODIFICATION] = event.attrChange = 1;
              }
              dispatchEvent.call(node, event);
            }
          }
        ;
        descriptor.value = function (type, handler, capture) {
          if (
            type === DOM_ATTR_MODIFIED &&
            this[ATTRIBUTE_CHANGED_CALLBACK] &&
            this.setAttribute !== patchedSetAttribute
          ) {
            this[EXPANDO_UID] = {
              className: {
                name: 'class',
                value: this.className
              }
            };
            this.setAttribute = patchedSetAttribute;
            this.removeAttribute = patchedRemoveAttribute;
            addEventListener.call(this, 'propertychange', onPropertyChange);
          }
          addEventListener.call(this, type, handler, capture);
        };
        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
      }());
    } else if (!MutationObserver) {
      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
      documentElement.setAttribute(EXPANDO_UID, 1);
      documentElement.removeAttribute(EXPANDO_UID);
      if (doesNotSupportDOMAttrModified) {
        onSubtreeModified = function (e) {
          var
            node = this,
            oldAttributes,
            newAttributes,
            key
          ;
          if (node === e.target) {
            oldAttributes = node[EXPANDO_UID];
            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
            for (key in newAttributes) {
              if (!(key in oldAttributes)) {
                // attribute was added
                return callDOMAttrModified(
                  0,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  ADDITION
                );
              } else if (newAttributes[key] !== oldAttributes[key]) {
                // attribute was changed
                return callDOMAttrModified(
                  1,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  MODIFICATION
                );
              }
            }
            // checking if it has been removed
            for (key in oldAttributes) {
              if (!(key in newAttributes)) {
                // attribute removed
                return callDOMAttrModified(
                  2,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  REMOVAL
                );
              }
            }
          }
        };
        callDOMAttrModified = function (
          attrChange,
          currentTarget,
          attrName,
          prevValue,
          newValue,
          action
        ) {
          var e = {
            attrChange: attrChange,
            currentTarget: currentTarget,
            attrName: attrName,
            prevValue: prevValue,
            newValue: newValue
          };
          e[action] = attrChange;
          onDOMAttrModified(e);
        };
        getAttributesMirror = function (node) {
          for (var
            attr, name,
            result = {},
            attributes = node.attributes,
            i = 0, length = attributes.length;
            i < length; i++
          ) {
            attr = attributes[i];
            name = attr.name;
            if (name !== 'setAttribute') {
              result[name] = attr.value;
            }
          }
          return result;
        };
      }
    }
  
    // set as enumerable, writable and configurable
    document[REGISTER_ELEMENT] = function registerElement(type, options) {
      upperType = type.toUpperCase();
      if (!setListener) {
        // only first time document.registerElement is used
        // we need to set this listener
        // setting it by default might slow down for no reason
        setListener = true;
        if (MutationObserver) {
          observer = (function(attached, detached){
            function checkEmAll(list, callback) {
              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
            }
            return new MutationObserver(function (records) {
              for (var
                current, node, newValue,
                i = 0, length = records.length; i < length; i++
              ) {
                current = records[i];
                if (current.type === 'childList') {
                  checkEmAll(current.addedNodes, attached);
                  checkEmAll(current.removedNodes, detached);
                } else {
                  node = current.target;
                  if (notFromInnerHTMLHelper &&
                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
                      current.attributeName !== 'style') {
                    newValue = getAttribute.call(node, current.attributeName);
                    if (newValue !== current.oldValue) {
                      node[ATTRIBUTE_CHANGED_CALLBACK](
                        current.attributeName,
                        current.oldValue,
                        newValue
                      );
                    }
                  }
                }
              }
            });
          }(executeAction(ATTACHED), executeAction(DETACHED)));
          observer.observe(
            document,
            {
              childList: true,
              subtree: true
            }
          );
        } else {
          asapQueue = [];
          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
        }
  
        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);
  
        HTMLElementPrototype.cloneNode = function (deep) {
          var
            node = cloneNode.call(this, !!deep),
            i = getTypeIndex(node)
          ;
          if (-1 < i) patch(node, protos[i]);
          if (deep) loopAndSetup(node.querySelectorAll(query));
          return node;
        };
      }
  
      if (-2 < (
        indexOf.call(types, PREFIX_IS + upperType) +
        indexOf.call(types, PREFIX_TAG + upperType)
      )) {
        throwTypeError(type);
      }
  
      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
        throw new Error('The type ' + type + ' is invalid');
      }
  
      var
        constructor = function () {
          return extending ?
            document.createElement(nodeName, upperType) :
            document.createElement(nodeName);
        },
        opt = options || OP,
        extending = hOP.call(opt, EXTENDS),
        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
        upperType,
        i
      ;
  
      if (extending && -1 < (
        indexOf.call(types, PREFIX_TAG + nodeName)
      )) {
        throwTypeError(nodeName);
      }
  
      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
  
      query = query.concat(
        query.length ? ',' : '',
        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
      );
  
      constructor.prototype = (
        protos[i] = hOP.call(opt, 'prototype') ?
          opt.prototype :
          create(HTMLElementPrototype)
      );
  
      loopAndVerify(
        document.querySelectorAll(query),
        ATTACHED
      );
  
      return constructor;
    };
  
    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
      var
        is = getIs(typeExtension),
        node = is ?
          createElement.call(document, localName, secondArgument(is)) :
          createElement.call(document, localName),
        name = '' + localName,
        i = indexOf.call(
          types,
          (is ? PREFIX_IS : PREFIX_TAG) +
          (is || name).toUpperCase()
        ),
        setup = -1 < i
      ;
      if (is) {
        node.setAttribute('is', is = is.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), is);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    });
  
  }
  
  function ASAP() {
    var queue = asapQueue.splice(0, asapQueue.length);
    asapTimer = 0;
    while (queue.length) {
      queue.shift().call(
        null, queue.shift()
      );
    }
  }
  
  function loopAndVerify(list, action) {
    for (var i = 0, length = list.length; i < length; i++) {
      verifyAndSetupAndAction(list[i], action);
    }
  }
  
  function loopAndSetup(list) {
    for (var i = 0, length = list.length, node; i < length; i++) {
      node = list[i];
      patch(node, protos[getTypeIndex(node)]);
    }
  }
  
  function executeAction(action) {
    return function (node) {
      if (isValidNode(node)) {
        verifyAndSetupAndAction(node, action);
        loopAndVerify(
          node.querySelectorAll(query),
          action
        );
      }
    };
  }
  
  function getTypeIndex(target) {
    var
      is = getAttribute.call(target, 'is'),
      nodeName = target.nodeName.toUpperCase(),
      i = indexOf.call(
        types,
        is ?
            PREFIX_IS + is.toUpperCase() :
            PREFIX_TAG + nodeName
      )
    ;
    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
  }
  
  function isInQSA(name, type) {
    return -1 < query.indexOf(name + '[is="' + type + '"]');
  }
  
  function onDOMAttrModified(e) {
    var
      node = e.currentTarget,
      attrChange = e.attrChange,
      attrName = e.attrName,
      target = e.target,
      addition = e[ADDITION] || 2,
      removal = e[REMOVAL] || 3
    ;
    if (notFromInnerHTMLHelper &&
        (!target || target === node) &&
        node[ATTRIBUTE_CHANGED_CALLBACK] &&
        attrName !== 'style' && (
          e.prevValue !== e.newValue ||
          // IE9, IE10, and Opera 12 gotcha
          e.newValue === '' && (
            attrChange === addition ||
            attrChange === removal
          )
    )) {
      node[ATTRIBUTE_CHANGED_CALLBACK](
        attrName,
        attrChange === addition ? null : e.prevValue,
        attrChange === removal ? null : e.newValue
      );
    }
  }
  
  function onDOMNode(action) {
    var executor = executeAction(action);
    return function (e) {
      asapQueue.push(executor, e.target);
      if (asapTimer) clearTimeout(asapTimer);
      asapTimer = setTimeout(ASAP, 1);
    };
  }
  
  function onReadyStateChange(e) {
    if (dropDomContentLoaded) {
      dropDomContentLoaded = false;
      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    }
    loopAndVerify(
      (e.target || document).querySelectorAll(query),
      e.detail === DETACHED ? DETACHED : ATTACHED
    );
    if (IE8) purge();
  }
  
  function patchedSetAttribute(name, value) {
    // jshint validthis:true
    var self = this;
    setAttribute.call(self, name, value);
    onSubtreeModified.call(self, {target: self});
  }
  
  function setupNode(node, proto) {
    setPrototype(node, proto);
    if (observer) {
      observer.observe(node, attributesObserver);
    } else {
      if (doesNotSupportDOMAttrModified) {
        node.setAttribute = patchedSetAttribute;
        node[EXPANDO_UID] = getAttributesMirror(node);
        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
      }
      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
    }
    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
      node.created = true;
      node[CREATED_CALLBACK]();
      node.created = false;
    }
  }
  
  function purge() {
    for (var
      node,
      i = 0,
      length = targets.length;
      i < length; i++
    ) {
      node = targets[i];
      if (!documentElement.contains(node)) {
        length--;
        targets.splice(i--, 1);
        verifyAndSetupAndAction(node, DETACHED);
      }
    }
  }
  
  function throwTypeError(type) {
    throw new Error('A ' + type + ' type is already registered');
  }
  
  function verifyAndSetupAndAction(node, action) {
    var
      fn,
      i = getTypeIndex(node)
    ;
    if (-1 < i) {
      patchIfNotAlready(node, protos[i]);
      i = 0;
      if (action === ATTACHED && !node[ATTACHED]) {
        node[DETACHED] = false;
        node[ATTACHED] = true;
        i = 1;
        if (IE8 && indexOf.call(targets, node) < 0) {
          targets.push(node);
        }
      } else if (action === DETACHED && !node[DETACHED]) {
        node[ATTACHED] = false;
        node[DETACHED] = true;
        i = 1;
      }
      if (i && (fn = node[action + CALLBACK])) fn.call(node);
    }
  }
  
  
  
  // V1 in da House!
  function CustomElementRegistry() {}
  
  CustomElementRegistry.prototype = {
    constructor: CustomElementRegistry,
    // a workaround for the stubborn WebKit
    define: usableCustomElements ?
      function (name, Class, options) {
        if (options) {
          CERDefine(name, Class, options);
        } else {
          var NAME = name.toUpperCase();
          constructors[NAME] = {
            constructor: Class,
            create: [NAME]
          };
          nodeNames.set(Class, NAME);
          customElements.define(name, Class);
        }
      } :
      CERDefine,
    get: usableCustomElements ?
      function (name) {
        return customElements.get(name) || get(name);
      } :
      get,
    whenDefined: usableCustomElements ?
      function (name) {
        return Promise.race([
          customElements.whenDefined(name),
          whenDefined(name)
        ]);
      } :
      whenDefined
  };
  
  function CERDefine(name, Class, options) {
    var
      is = options && options[EXTENDS] || '',
      CProto = Class.prototype,
      proto = create(CProto),
      attributes = Class.observedAttributes || empty,
      definition = {prototype: proto}
    ;
    // TODO: is this needed at all since it's inherited?
    // defineProperty(proto, 'constructor', {value: Class});
    safeProperty(proto, CREATED_CALLBACK, {
        value: function () {
          if (justCreated) justCreated = false;
          else if (!this[DRECEV1]) {
            this[DRECEV1] = true;
            new Class(this);
            if (CProto[CREATED_CALLBACK])
              CProto[CREATED_CALLBACK].call(this);
            var info = constructors[nodeNames.get(Class)];
            if (!usableCustomElements || info.create.length > 1) {
              notifyAttributes(this);
            }
          }
      }
    });
    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
      value: function (name) {
        if (-1 < indexOf.call(attributes, name))
          CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
      }
    });
    if (CProto[CONNECTED_CALLBACK]) {
      safeProperty(proto, ATTACHED_CALLBACK, {
        value: CProto[CONNECTED_CALLBACK]
      });
    }
    if (CProto[DISCONNECTED_CALLBACK]) {
      safeProperty(proto, DETACHED_CALLBACK, {
        value: CProto[DISCONNECTED_CALLBACK]
      });
    }
    if (is) definition[EXTENDS] = is;
    name = name.toUpperCase();
    constructors[name] = {
      constructor: Class,
      create: is ? [is, secondArgument(name)] : [name]
    };
    nodeNames.set(Class, name);
    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
    whenDefined(name);
    waitingList[name].r();
  }
  
  function get(name) {
    var info = constructors[name.toUpperCase()];
    return info && info.constructor;
  }
  
  function getIs(options) {
    return typeof options === 'string' ?
        options : (options && options.is || '');
  }
  
  function notifyAttributes(self) {
    var
      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
      attributes = callback ? self.attributes : empty,
      i = attributes.length,
      attribute
    ;
    while (i--) {
      attribute =  attributes[i]; // || attributes.item(i);
      callback.call(
        self,
        attribute.name || attribute.nodeName,
        null,
        attribute.value || attribute.nodeValue
      );
    }
  }
  
  function whenDefined(name) {
    name = name.toUpperCase();
    if (!(name in waitingList)) {
      waitingList[name] = {};
      waitingList[name].p = new Promise(function (resolve) {
        waitingList[name].r = resolve;
      });
    }
    return waitingList[name].p;
  }
  
  function polyfillV1() {
    if (customElements) delete window.customElements;
    defineProperty(window, 'customElements', {
      configurable: true,
      value: new CustomElementRegistry()
    });
    defineProperty(window, 'CustomElementRegistry', {
      configurable: true,
      value: CustomElementRegistry
    });
    for (var
      patchClass = function (name) {
        var Class = window[name];
        if (Class) {
          window[name] = function CustomElementsV1(self) {
            var info, isNative;
            if (!self) self = this;
            if (!self[DRECEV1]) {
              justCreated = true;
              info = constructors[nodeNames.get(self.constructor)];
              isNative = usableCustomElements && info.create.length === 1;
              self = isNative ?
                Reflect.construct(Class, empty, info.constructor) :
                document.createElement.apply(document, info.create);
              self[DRECEV1] = true;
              justCreated = false;
              if (!isNative) notifyAttributes(self);
            }
            return self;
          };
          window[name].prototype = Class.prototype;
          try {
            Class.prototype.constructor = window[name];
          } catch(WebKit) {
            fixGetClass = true;
            defineProperty(Class, DRECEV1, {value: window[name]});
          }
        }
      },
      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
      i = Classes.length;
      i--;
      patchClass(Classes[i])
    ) {}
    (document.createElement = function (name, options) {
      var is = getIs(options);
      return is ?
        patchedCreateElement.call(this, name, secondArgument(is)) :
        patchedCreateElement.call(this, name);
    });
  }
  
  // if customElements is not there at all
  if (!customElements) polyfillV1();
  else {
    // if available test extends work as expected
    try {
      (function (DRE, options, name) {
        options[EXTENDS] = 'a';
        DRE.prototype = create(HTMLAnchorElement.prototype);
        DRE.prototype.constructor = DRE;
        window.customElements.define(name, DRE, options);
        if (
          getAttribute.call(document.createElement('a', {is: name}), 'is') !== name ||
          (usableCustomElements && getAttribute.call(new DRE(), 'is') !== name)
        ) {
          throw options;
        }
      }(
        function DRE() {
          return Reflect.construct(HTMLAnchorElement, [], DRE);
        },
        {},
        'document-register-element-a'
      ));
    } catch(o_O) {
      // or force the polyfill if not
      // and keep internal original reference
      polyfillV1();
    }
  }
  
  try {
    createElement.call(document, 'a', 'a');
  } catch(FireFox) {
    secondArgument = function (is) {
      return {is: is};
    };
  }
  
}

installCustomElements(global);

module.exports = installCustomElements;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Constructs a ES6/Promises A+ Promise instance.
 *
 * @constructor
 * @param {function(function(*=), function (*=))} resolver
 */
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Constructor Promise requires `new`');
  }
  if (!isFunction(resolver)) {
    throw new TypeError('Must pass resolver function');
  }

  /**
   * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
   * @private
   */
  this._state = PendingPromise;

  /**
   * @type {*}
   * @private
   */
  this._value = [];

  /**
   * @type {boolean}
   * @private
   */
  this._isChainEnd = true;

  doResolve(
    this,
    adopter(this, FulfilledPromise),
    adopter(this, RejectedPromise),
    { then: resolver }
  );
}

/****************************
  Public Instance Methods
 ****************************/

/**
 * Creates a new promise instance that will receive the result of this promise
 * as inputs to the onFulfilled or onRejected callbacks.
 *
 * @param {function(*)} onFulfilled
 * @param {function(*)} onRejected
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : void 0;
  onRejected = isFunction(onRejected) ? onRejected : void 0;

  if (onFulfilled || onRejected) {
    this._isChainEnd = false;
  }

  return this._state(
    this._value,
    onFulfilled,
    onRejected
  );
};

/**
 * Creates a new promise that will handle the rejected state of this promise.
 *
 * @param {function(*)} onRejected
 * @returns {!Promise}
 */
Promise.prototype.catch = function(onRejected) {
  return this.then(void 0, onRejected);
};

/****************************
  Public Static Methods
 ****************************/

/**
 * Creates a fulfilled Promise of value. If value is itself a then-able,
 * resolves with the then-able's value.
 *
 * @this {!Promise}
 * @param {*=} value
 * @returns {!Promise}
 */
Promise.resolve = function(value) {
  var Constructor = this;
  var promise;

  if (isObject(value) && value instanceof this) {
    promise = value;
  } else {
    promise = new Constructor(function(resolve) {
      resolve(value);
    });
  }

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a rejected Promise of reason.
 *
 * @this {!Promise}
 * @param {*=} reason
 * @returns {!Promise}
 */
Promise.reject = function(reason) {
  var Constructor = this;
  var promise = new Constructor(function(_, reject) {
    reject(reason);
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve with an array of the values of the
 * passed in promises. If any promise rejects, the returned promise will
 * reject.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.all = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    var length = promises.length;
    var values = new Array(length);

    if (length === 0) {
      return resolve(values);
    }

    each(promises, function(promise, index) {
      Constructor.resolve(promise).then(function(value) {
        values[index] = value;
        if (--length === 0) {
          resolve(values);
        }
      }, reject);
    });
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve or reject based on the first
 * resolved or rejected promise.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.race = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    for (var i = 0, l = promises.length; i < l; i++) {
      Constructor.resolve(promises[i]).then(resolve, reject);
    }
  });

  return /** @type {!Promise} */(promise);
};

/**
 * An internal use static function.
 */
Promise._overrideUnhandledExceptionHandler = function(handler) {
  onPossiblyUnhandledRejection = handler;
};

/****************************
  Private functions
 ****************************/

/**
 * The Fulfilled Promise state. Calls onFulfilled with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onFulfilled, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} value The current promise's resolved value.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} unused
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Fulfilled state from the
 *     Pending state.
 * @returns {!Promise}
 */
function FulfilledPromise(value, onFulfilled, unused, deferred) {
  if (!onFulfilled) { return this; }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onFulfilled, value));
  return deferred.promise;
}

/**
 * The Rejected Promise state. Calls onRejected with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onRejected, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} reason The current promise's rejection reason.
 * @param {function(*=)=} unused
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Rejected state from the
 *     Pending state.
 * @returns {!Promise}
 */
function RejectedPromise(reason, unused, onRejected, deferred) {
  if (!onRejected) { return this; }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onRejected, reason));
  return deferred.promise;
}

/**
 * The Pending Promise state. Eventually calls onFulfilled once the promise has
 * resolved, or onRejected once the promise rejects.
 *
 * If there is no onFulfilled and no onRejected, returns the current promise to
 * avoid an promise instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} queue The current promise's pending promises queue.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Pending state from the
 *     Pending state of another promise.
 * @returns {!Promise}
 */
function PendingPromise(queue, onFulfilled, onRejected, deferred) {
  if (!onFulfilled && !onRejected) { return this; }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  queue.push({
    deferred: deferred,
    onFulfilled: onFulfilled || deferred.resolve,
    onRejected: onRejected || deferred.reject
  });
  return deferred.promise;
}

/**
 * Constructs a deferred instance that holds a promise and its resolve and
 * reject functions.
 *
 * @constructor
 */
function Deferred(Promise) {
  var deferred = this;
  /** @type {!Promise} */
  this.promise = new Promise(function(resolve, reject) {
    /** @type {function(*=)} */
    deferred.resolve = resolve;

    /** @type {function(*=)} */
    deferred.reject = reject;
  });
  return deferred;
}

/**
 * Transitions the state of promise to another state. This is only ever called
 * on with a promise that is currently in the Pending state.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function adopt(promise, state, value) {
  var queue = promise._value;
  promise._state = state;
  promise._value = value;

  for (var i = 0; i < queue.length; i++) {
    var next = queue[i];
    promise._state(
      value,
      next.onFulfilled,
      next.onRejected,
      next.deferred
    );
  }

  // Determine if this rejected promise will be "handled".
  if (state === RejectedPromise && promise._isChainEnd) {
    setTimeout(function() {
      if (promise._isChainEnd) {
        onPossiblyUnhandledRejection(value, promise);
      }
    }, 0);
  }
}
/**
 * A partial application of adopt.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @returns {function(*=)}
 */
function adopter(promise, state) {
  return function(value) {
    adopt(promise, state, value);
  };
}

/**
 * A no-op function to prevent double resolving.
 */
function noop() {}

/**
 * Tests if fn is a Function
 *
 * @param {*} fn
 * @returns {boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Tests if fn is an Object
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
  return obj === Object(obj);
}

var onPossiblyUnhandledRejection = function(reason, promise) {
  throw reason;
}

/**
 * Iterates over each element of an array, calling the iterator with the
 * element and its index.
 *
 * @param {!Array} collection
 * @param {function(*=,number)} iterator
 */
function each(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i);
  }
}

/**
 * Creates a function that will attempt to resolve the deferred with the return
 * of fn. If any error is raised, rejects instead.
 *
 * @param {!Deferred} deferred
 * @param {function(*=)} fn
 * @param {*} arg
 * @returns {function()}
 */
function tryCatchDeferred(deferred, fn, arg) {
  var promise = deferred.promise;
  var resolve = deferred.resolve;
  var reject = deferred.reject;
  return function() {
    try {
      var result = fn(arg);
      if (resolve === fn || reject === fn) {
        return;
      }
      doResolve(promise, resolve, reject, result, result);
    } catch (e) {
      reject(e);
    }
  };
}

/**
 * Queues and executes multiple deferred functions on another run loop.
 */
var defer = (function() {
  /**
   * Defers fn to another run loop.
   */
  var scheduleFlush;
  if (typeof window !== 'undefined' && window.postMessage) {
    window.addEventListener('message', flush);
    scheduleFlush = function() {
      window.postMessage('macro-task', '*');
    };
  } else {
    scheduleFlush = function() {
      setTimeout(flush, 0);
    };
  }

  var queue = new Array(16);
  var length = 0;

  function flush() {
    for (var i = 0; i < length; i++) {
      var fn = queue[i];
      queue[i] = null;
      fn();
    }
    length = 0;
  }

  /**
   * @param {function()} fn
   */
  function defer(fn) {
    if (length === 0) { scheduleFlush(); }
    queue[length++] = fn;
  };

  return defer;
})();

/**
 * The Promise resolution procedure.
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param {!Promise} promise
 * @param {function(*=)} resolve
 * @param {function(*=)} reject
 * @param {*} value
 * @param {*=} context
 */
function doResolve(promise, resolve, reject, value, context) {
  var _reject = reject;
  var then;
  var _resolve;
  try {
    if (value === promise) {
      throw new TypeError('Cannot fulfill promise with itself');
    }
    var isObj = isObject(value);
    if (isObj && value instanceof promise.constructor) {
      adopt(promise, value._state, value._value);
    } else if (isObj && (then = value.then) && isFunction(then)) {
      _resolve = function(value) {
        _resolve = _reject = noop;
        doResolve(promise, resolve, reject, value, value);
      };
      _reject = function(reason) {
        _resolve = _reject = noop;
        reject(reason);
      };
      then.call(
        context,
        function(value) { _resolve(value); },
        function(reason) { _reject(reason); }
      );
    } else {
      resolve(value);
    }
  } catch (e) {
    _reject(e);
  }
}

module.exports = Promise;

},{}],5:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Allows for runtime configuration. Internally, the runtime should
 * use the src/config.js module for various constants. We can use the
 * AMP_CONFIG global to translate user-defined configurations to this
 * module.
 * @type {!Object<string, string>}
 */
var env = self.AMP_CONFIG || {};

var thirdPartyFrameRegex = typeof env['thirdPartyFrameRegex'] == 'string' ? new RegExp(env['thirdPartyFrameRegex']) : env['thirdPartyFrameRegex'];

/** @type {!Object<string, string|boolean|RegExp>} */
var urls = {
  thirdParty: env['thirdPartyUrl'] || 'https://3p.ampproject.net',
  thirdPartyFrameHost: env['thirdPartyFrameHost'] || 'ampproject.net',
  thirdPartyFrameRegex: thirdPartyFrameRegex || /^d-\d+\.ampproject\.net$/,
  cdn: env['cdnUrl'] || 'https://cdn.ampproject.org',
  cdnProxyRegex: /^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org/,
  localhostRegex: /^https?:\/\/localhost(:\d+)?$/,
  errorReporting: env['errorReportingUrl'] || 'https://amp-error-reporting.appspot.com/r',
  localDev: env['localDev'] || false
};
exports.urls = urls;

},{}],6:[function(require,module,exports){
exports.__esModule = true;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * Returns the cookie's value or `null`.
 *
 * @param {!Window} win
 * @param {string} name
 * @return {?string}
 */

function getCookie(win, name) {
  var cookieString = tryGetDocumentCookieNoInline(win);
  if (!cookieString) {
    return null;
  }
  var cookies = cookieString.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var eq = cookie.indexOf('=');
    if (eq == -1) {
      continue;
    }
    if (decodeURIComponent(cookie.substring(0, eq).trim()) == name) {
      return decodeURIComponent(cookie.substring(eq + 1).trim());
    }
  }
  return null;
}

/**
 * This method should not be inlined to prevent TryCatch deoptimization.
 * NoInline keyword at the end of function name also prevents Closure compiler
 * from inlining the function.
 * @private
 */
function tryGetDocumentCookieNoInline(win) {
  try {
    return win.document.cookie;
  } catch (e) {
    // Act as if no cookie is available. Exceptions can be thrown when
    // AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
  }
}

/**
 * Sets the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {{highestAvailableDomain:boolean}=} opt_options
 *     - highestAvailableDomain: If true, set the cookie at the widest domain
 *       scope allowed by the browser. E.g. on example.com if we are currently
 *       on www.example.com.
 */

function setCookie(win, name, value, expirationTime, opt_options) {
  if (opt_options && opt_options.highestAvailableDomain) {
    var parts = win.location.hostname.split('.');
    var domain = parts[parts.length - 1];
    for (var i = parts.length - 2; i >= 0; i--) {
      domain = parts[i] + '.' + domain;
      trySetCookie(win, name, value, expirationTime, domain);
      if (getCookie(win, name) == value) {
        return;
      }
    }
  }
  trySetCookie(win, name, value, expirationTime, undefined);
}

/**
 * Attempt to set a cookie with the given params.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {string|undefined} domain
 */
function trySetCookie(win, name, value, expirationTime, domain) {
  // We do not allow setting cookies on the domain that contains both
  // the cdn. and www. hosts.
  if (domain == 'ampproject.org') {
    // Actively delete them.
    value = 'delete';
    expirationTime = 0;
  }
  var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/' + (domain ? '; domain=' + domain : '') + '; expires=' + new Date(expirationTime).toUTCString();
  try {
    win.document.cookie = cookie;
  } catch (ignore) {
    // Do not throw if setting the cookie failed Exceptions can be thrown
    // when AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
  };
}

},{}],7:[function(require,module,exports){
exports.__esModule = true;
exports.waitForChild = waitForChild;
exports.waitForChildPromise = waitForChildPromise;
exports.waitForBody = waitForBody;
exports.waitForBodyPromise = waitForBodyPromise;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.copyChildren = copyChildren;
exports.createElementWithAttributes = createElementWithAttributes;
exports.closest = closest;
exports.closestNode = closestNode;
exports.closestByTag = closestByTag;
exports.closestBySelector = closestBySelector;
exports.matches = matches;
exports.elementByTag = elementByTag;
exports.childElement = childElement;
exports.childElements = childElements;
exports.lastChildElement = lastChildElement;
exports.childNodes = childNodes;
exports.setScopeSelectorSupportedForTesting = setScopeSelectorSupportedForTesting;
exports.childElementByAttr = childElementByAttr;
exports.lastChildElementByAttr = lastChildElementByAttr;
exports.childElementsByAttr = childElementsByAttr;
exports.childElementByTag = childElementByTag;
exports.childElementsByTag = childElementsByTag;
exports.getDataParamsFromAttributes = getDataParamsFromAttributes;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
exports.ancestorElements = ancestorElements;
exports.ancestorElementsByTag = ancestorElementsByTag;
exports.openWindowDialog = openWindowDialog;
exports.isJsonScriptTag = isJsonScriptTag;
exports.escapeCssSelectorIdent = escapeCssSelectorIdent;
exports.escapeHtml = escapeHtml;
exports.tryFocus = tryFocus;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _log = require('./log');

var _third_partyCssEscapeCssEscape = require('../third_party/css-escape/css-escape');

var _types = require('./types');

var HTML_ESCAPE_CHARS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
var HTML_ESCAPE_REGEX = /(&|<|>|"|'|`)/g;

/**
 * Waits until the child element is constructed. Once the child is found, the
 * callback is executed.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @param {function()} callback
 */

function waitForChild(parent, checkFunc, callback) {
  if (checkFunc(parent)) {
    callback();
    return;
  }
  /** @const {!Window} */
  var win = parent.ownerDocument.defaultView;
  if (win.MutationObserver) {
    (function () {
      /** @const {MutationObserver} */
      var observer = new win.MutationObserver(function () {
        if (checkFunc(parent)) {
          observer.disconnect();
          callback();
        }
      });
      observer.observe(parent, { childList: true });
    })();
  } else {
    (function () {
      /** @const {number} */
      var interval = win.setInterval(function () {
        if (checkFunc(parent)) {
          win.clearInterval(interval);
          callback();
        }
      }, /* milliseconds */5);
    })();
  }
}

/**
 * Waits until the child element is constructed. Once the child is found, the
 * promise is resolved.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @return {!Promise}
 */

function waitForChildPromise(parent, checkFunc) {
  return new Promise(function (resolve) {
    waitForChild(parent, checkFunc, resolve);
  });
}

/**
 * Waits for document's body to be available.
 * Will be deprecated soon; use {@link AmpDoc#whenBodyAvailable} or
 * @{link DocumentState#onBodyAvailable} instead.
 * @param {!Document} doc
 * @param {function()} callback
 */

function waitForBody(doc, callback) {
  waitForChild(doc.documentElement, function () {
    return !!doc.body;
  }, callback);
}

/**
 * Waits for document's body to be available.
 * @param {!Document} doc
 * @return {!Promise}
 */

function waitForBodyPromise(doc) {
  return new Promise(function (resolve) {
    waitForBody(doc, resolve);
  });
}

/**
 * Removes the element.
 * @param {!Element} element
 */

function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}

/**
 * Removes all child nodes of the specified element.
 * @param {!Element} parent
 */

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Copies all children nodes of element "from" to element "to". Child nodes
 * are deeply cloned. Notice, that this method should be used with care and
 * preferably on smaller subtrees.
 * @param {!Element} from
 * @param {!Element} to
 */

function copyChildren(from, to) {
  var frag = to.ownerDocument.createDocumentFragment();
  for (var n = from.firstChild; n; n = n.nextSibling) {
    frag.appendChild(n.cloneNode(true));
  }
  to.appendChild(frag);
}

/**
 * Create a new element on document with specified tagName and attributes.
 * @param {!Document} doc
 * @param {string} tagName
 * @param {!Object<string, string>} attributes
 * @return {!Element} created element
 */

function createElementWithAttributes(doc, tagName, attributes) {
  var element = doc.createElement(tagName);
  for (var attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

/**
 * Finds the closest element that satisfies the callback from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {function(!Element):boolean} callback
 * @param {Element=} opt_stopAt optional elemnt to stop the search at.
 * @return {?Element}
 */

function closest(element, callback, opt_stopAt) {
  for (var el = element; el && el !== opt_stopAt; el = el.parentElement) {
    if (callback(el)) {
      return el;
    }
  }
  return null;
}

/**
 * Finds the closest node that satisfies the callback from this node
 * up the DOM subtree.
 * @param {!Node} node
 * @param {function(!Node):boolean} callback
 * @return {?Node}
 */

function closestNode(node, callback) {
  for (var n = node; n; n = n.parentNode) {
    if (callback(n)) {
      return n;
    }
  }
  return null;
}

/**
 * Finds the closest element with the specified name from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */

function closestByTag(element, tagName) {
  if (element.closest) {
    return element.closest(tagName);
  }
  tagName = tagName.toUpperCase();
  return closest(element, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Finds the closest element with the specified selector from this element
 * @param {!Element} element
 * @param {string} selector
 * @return {?Element} closest ancestor if found.
 */

function closestBySelector(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  return closest(element, function (el) {
    return matches(el, selector);
  });
}

/**
 * Checks if the given element matches the selector
 * @param  {!Element} el The element to verify
 * @param  {!string} selector The selector to check against
y * @return {boolean} True if the element matched the selector. False otherwise
 */

function matches(el, selector) {
  var matcher = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
  if (matcher) {
    return matcher.call(el, selector);
  }
  return false; // IE8 always returns false.
}

/**
 * Finds the first descendant element with the specified name.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */

function elementByTag(element, tagName) {
  var elements = element.getElementsByTagName(tagName);
  return elements[0] || null;
}

/**
 * Finds the first child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function childElement(parent, callback) {
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      return child;
    }
  }
  return null;
}

/**
 * Finds all child elements that satisfy the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {!Array<!Element>}
 */

function childElements(parent, callback) {
  var children = [];
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Finds the last child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */

function lastChildElement(parent, callback) {
  for (var child = parent.lastElementChild; child; child = child.previousElementSibling) {
    if (callback(child)) {
      return child;
    }
  }
  return null;
}

/**
 * Finds all child nodes that satisfy the callback.
 * These nodes can include Text, Comment and other child nodes.
 * @param {!Node} parent
 * @param {function(!Node):boolean} callback
 * @return {!Array<!Node>}
 */

function childNodes(parent, callback) {
  var nodes = [];
  for (var child = parent.firstChild; child; child = child.nextSibling) {
    if (callback(child)) {
      nodes.push(child);
    }
  }
  return nodes;
}

/**
 * @type {boolean|undefined}
 * @visibleForTesting
 */
var scopeSelectorSupported = undefined;

/**
 * @param {boolean|undefined} val
 * @visibleForTesting
 */

function setScopeSelectorSupportedForTesting(val) {
  scopeSelectorSupported = val;
}

/**
 * @param {!Element} parent
 * @return {boolean}
 */
function isScopeSelectorSupported(parent) {
  try {
    parent.ownerDocument.querySelector(':scope');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Finds the first child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */

function childElementByAttr(parent, attr) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return parent.querySelector(':scope > [' + attr + ']');
  }
  return childElement(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds the last child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */

function lastChildElementByAttr(parent, attr) {
  return lastChildElement(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds all child elements that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {!Array<!Element>}
 */

function childElementsByAttr(parent, attr) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return _types.toArray(parent.querySelectorAll(':scope > [' + attr + ']'));
  }
  return childElements(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds the first child element that has the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {?Element}
 */

function childElementByTag(parent, tagName) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return parent.querySelector(':scope > ' + tagName);
  }
  tagName = tagName.toUpperCase();
  return childElement(parent, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Finds all child elements with the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {!Array<!Element>}
 */

function childElementsByTag(parent, tagName) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(parent);
  }
  if (scopeSelectorSupported) {
    return _types.toArray(parent.querySelectorAll(':scope > ' + tagName));
  }
  tagName = tagName.toUpperCase();
  return childElements(parent, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Returns element data-param- attributes as url parameters key-value pairs.
 * e.g. data-param-some-attr=value -> {someAttr: value}.
 * @param {!Element} element
 * @param {function(string):string=} opt_computeParamNameFunc to compute the parameter
 *    name, get passed the camel-case parameter name.
 * @param {!RegExp=} opt_paramPattern Regex pattern to match data attributes.
 * @return {!Object<string, string>}
 */

function getDataParamsFromAttributes(element, opt_computeParamNameFunc, opt_paramPattern) {
  var computeParamNameFunc = opt_computeParamNameFunc || function (key) {
    return key;
  };
  var dataset = element.dataset;
  var params = Object.create(null);
  var paramPattern = opt_paramPattern ? opt_paramPattern : /^param(.+)/;
  for (var key in dataset) {
    var _matches = key.match(paramPattern);
    if (_matches) {
      var param = _matches[1][0].toLowerCase() + _matches[1].substr(1);
      params[computeParamNameFunc(param)] = dataset[key];
    }
  }
  return params;
}

/**
 * Whether the element have a next node in the document order.
 * This means either:
 *  a. The element itself has a nextSibling.
 *  b. Any of the element ancestors has a nextSibling.
 * @param {!Element} element
 * @return {boolean}
 */

function hasNextNodeInDocumentOrder(element) {
  var currentElement = element;
  do {
    if (currentElement.nextSibling) {
      return true;
    }
  } while (currentElement = currentElement.parentNode);
  return false;
}

/**
 * Finds all ancestor elements that satisfy predicate.
 * @param {!Element} child
 * @param {function(!Element):boolean} predicate
 * @return {!Array<!Element>}
 */

function ancestorElements(child, predicate) {
  var ancestors = [];
  for (var ancestor = child.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (predicate(ancestor)) {
      ancestors.push(ancestor);
    }
  }
  return ancestors;
}

/**
 * Finds all ancestor elements that has the specified tag name.
 * @param {!Element} child
 * @param {string} tagName
 * @return {!Array<!Element>}
 */

function ancestorElementsByTag(child, tagName) {
  tagName = tagName.toUpperCase();
  return ancestorElements(child, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * This method wraps around window's open method. It first tries to execute
 * `open` call with the provided target and if it fails, it retries the call
 * with the `_top` target. This is necessary given that in some embedding
 * scenarios, such as iOS' WKWebView, navigation to `_blank` and other targets
 * is blocked by default.
 *
 * @param {!Window} win
 * @param {string} url
 * @param {string} target
 * @param {string=} opt_features
 * @return {?Window}
 */

function openWindowDialog(win, url, target, opt_features) {
  // Try first with the specified target. If we're inside the WKWebView or
  // a similar environments, this method is expected to fail by default for
  // all targets except `_top`.
  var res = undefined;
  try {
    res = win.open(url, target, opt_features);
  } catch (e) {
    _log.dev().error('DOM', 'Failed to open url on target: ', target, e);
  }

  // Then try with `_top` target.
  if (!res && target != '_top') {
    res = win.open(url, '_top');
  }
  return res;
}

/**
 * Whether the element is a script tag with application/json type.
 * @param {!Element} element
 * @return {boolean}
 */

function isJsonScriptTag(element) {
  return element.tagName == 'SCRIPT' && element.getAttribute('type').toUpperCase() == 'APPLICATION/JSON';
}

/**
 * Escapes an ident (ID or a class name) to be used as a CSS selector.
 *
 * See https://drafts.csswg.org/cssom/#serialize-an-identifier.
 *
 * @param {!Window} win
 * @param {string} ident
 * @return {string}
 */

function escapeCssSelectorIdent(win, ident) {
  if (win.CSS && win.CSS.escape) {
    return win.CSS.escape(ident);
  }
  // Polyfill.
  return _third_partyCssEscapeCssEscape.cssEscape(ident);
}

/**
 * Escapes `<`, `>` and other HTML charcaters with their escaped forms.
 * @param {string} text
 * @return {string}
 */

function escapeHtml(text) {
  if (!text) {
    return text;
  }
  return text.replace(HTML_ESCAPE_REGEX, escapeHtmlChar);
}

/**
 * @param {string} c
 * @return string
 */
function escapeHtmlChar(c) {
  return HTML_ESCAPE_CHARS[c];
}

/**
 * Tries to focus on the given element; fails silently if browser throws an
 * exception.
 * @param {!Element} element
 */

function tryFocus(element) {
  try {
    element. /*OK*/focus();
  } catch (e) {
    // IE <= 7 may throw exceptions when focusing on hidden items.
  }
}

},{"../third_party/css-escape/css-escape":26,"./log":11,"./types":22}],8:[function(require,module,exports){
exports.__esModule = true;
exports.isDevChannel = isDevChannel;
exports.isDevChannelVersionDoNotUse_ = isDevChannelVersionDoNotUse_;
exports.isExperimentOn = isExperimentOn;
exports.isExperimentOnAllowUrlOverride = isExperimentOnAllowUrlOverride;
exports.toggleExperiment = toggleExperiment;
exports.resetExperimentToggles_ = resetExperimentToggles_;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Experiments system allows a developer to opt-in to test
 * features that are not yet fully tested.
 *
 * Experiments page: https://cdn.ampproject.org/experiments.html *
 */

var _cookies = require('./cookies');

var _url = require('./url');

/** @const {string} */
var COOKIE_NAME = 'AMP_EXP';

/** @const {number} */
var COOKIE_MAX_AGE_DAYS = 180; // 6 month

/** @const {time} */
var COOKIE_EXPIRATION_INTERVAL = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/** @const {string} */
var CANARY_EXPERIMENT_ID = 'dev-channel';

/** @type {Object<string, boolean>|undefined} */
var toggles_ = undefined;

/**
 * A wrapper to avoid a static side-effect.
 * @return {!Object<string, boolean>}
 */
function experimentToggles() {
  return toggles_ || (toggles_ = Object.create(null));
}

/**
 * Whether the scripts come from a dev channel.
 * @param {!Window} win
 * @return {boolean}
 */

function isDevChannel(win) {
  if (isExperimentOn(win, CANARY_EXPERIMENT_ID)) {
    return true;
  }
  if (isDevChannelVersionDoNotUse_(win)) {
    return true;
  }
  return false;
}

/**
 * Whether the version corresponds to the dev-channel binary.
 * @param {!Window} win
 * @return {boolean}
 * @private Visible for testing only!
 */

function isDevChannelVersionDoNotUse_(win) {
  return !!win.AMP_CONFIG && win.AMP_CONFIG.canary;
}

/**
 * Whether the specified experiment is on or off.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */

function isExperimentOn(win, experimentId) {
  var toggles = experimentToggles();
  if (experimentId in toggles) {
    return toggles[experimentId];
  }
  return toggles[experimentId] = calcExperimentOn(win, experimentId);
}

/**
 * Check whether an experiment is on while allowing viewers to force
 * the experiment state via a viewer URL param of the form:
 * `e-$experimentId=1` (on) or `e-$experimentId=0` (off).
 * NOTE: This should only be used if it is needed and if turning the
 * experiment on or off does not have security implications.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */

function isExperimentOnAllowUrlOverride(win, experimentId) {
  var hash = win.location.originalHash || win.location.hash;
  if (hash) {
    // Note: If this is used a lot, this should be optimized to only
    // parse once per page load.
    var param = _url.parseQueryString(hash)['e-' + experimentId];
    if (param == '1') {
      return true;
    }
    if (param == '0') {
      return false;
    }
  }
  return isExperimentOn(win, experimentId);
}

/**
 * Calculate whether the specified experiment is on or off based off of the
 * cookieFlag or the global config frequency given.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */
function calcExperimentOn(win, experimentId) {
  var cookieFlag = getExperimentIds(win).indexOf(experimentId) != -1;
  if (cookieFlag) {
    return true;
  }

  if (win.AMP_CONFIG && win.AMP_CONFIG.hasOwnProperty(experimentId)) {
    var frequency = win.AMP_CONFIG[experimentId];
    return Math.random() < frequency;
  }
  return false;
}

/**
 * Toggles the experiment on or off. Returns the actual value of the experiment
 * after toggling is done.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean=} opt_on
 * @param {boolean=} opt_transientExperiment  Whether to toggle the
 *     experiment state "transiently" (i.e., for this page load only) or
 *     durably (by saving the experiment IDs to the cookie after toggling).
 *     Default: false (save durably).
 * @return {boolean} New state for experimentId.
 */

function toggleExperiment(win, experimentId, opt_on, opt_transientExperiment) {
  var toggles = experimentToggles();
  var experimentIds = getExperimentIds(win);
  var currentlyOn = experimentIds.indexOf(experimentId) != -1 || experimentId in toggles && toggles[experimentId];
  var on = opt_on !== undefined ? opt_on : !currentlyOn;
  if (on != currentlyOn) {
    if (on) {
      experimentIds.push(experimentId);
      toggles[experimentId] = true;
    } else {
      experimentIds.splice(experimentIds.indexOf(experimentId), 1);
      toggles[experimentId] = false;
    }
    if (!opt_transientExperiment) {
      saveExperimentIds(win, experimentIds);
    }
  }
  return on;
}

/**
 * Returns a set of experiment IDs currently on.
 * @param {!Window} win
 * @return {!Array<string>}
 */
function getExperimentIds(win) {
  if (win._experimentCookie) {
    return win._experimentCookie;
  }
  var experimentCookie = _cookies.getCookie(win, COOKIE_NAME);
  return win._experimentCookie = experimentCookie ? experimentCookie.split(/\s*,\s*/g) : [];
}

/**
 * Saves a set of experiment IDs currently on.
 * @param {!Window} win
 * @param {!Array<string>} experimentIds
 */
function saveExperimentIds(win, experimentIds) {
  win._experimentCookie = null;
  _cookies.setCookie(win, COOKIE_NAME, experimentIds.join(','), Date.now() + COOKIE_EXPIRATION_INTERVAL);
}

/**
 * Resets the experimentsToggle cache for testing purposes.
 * @visibleForTesting
 */

function resetExperimentToggles_() {
  toggles_ = undefined;
}

},{"./cookies":6,"./url":23}],9:[function(require,module,exports){
exports.__esModule = true;
exports.recreateNonProtoObject = recreateNonProtoObject;
exports.getValueForExpr = getValueForExpr;
exports.tryParseJson = tryParseJson;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This module declares JSON types as defined in the
 * {@link http://json.org/}.
 */

var _types = require('./types');

// NOTE Type are changed to {*} because of
// https://github.com/google/closure-compiler/issues/1999

/**
 * JSON scalar. It's either string, number or boolean.
 * @typedef {*} should be string|number|boolean
 */
var JSONScalarDef = undefined;

/**
 * JSON object. It's a map with string keys and JSON values.
 * @typedef {*} should be !Object<string, ?JSONValueDef>
 */
var JSONObjectDef = undefined;

/**
 * JSON array. It's an array with JSON values.
 * @typedef {*} should be !Array<?JSONValueDef>
 */
var JSONArrayDef = undefined;

/**
 * JSON value. It's either a scalar, an object or an array.
 * @typedef {*} should be !JSONScalarDef|!JSONObjectDef|!JSONArrayDef
 */
var JSONValueDef = undefined;

/**
 * Recreates objects with prototype-less copies.
 * @param {!JSONObjectDef} obj
 * @return {!JSONObjectDef}
 */

function recreateNonProtoObject(obj) {
  var copy = Object.create(null);
  for (var k in obj) {
    if (!obj.hasOwnProperty(k)) {
      continue;
    }
    var v = obj[k];
    copy[k] = _types.isObject(v) ? recreateNonProtoObject(v) : v;
  }
  return copy;
}

/**
 * Returns a value from an object for a field-based expression. The expression
 * is a simple nested dot-notation of fields, such as `field1.field2`. If any
 * field in a chain does not exist or is not an object, the returned value will
 * be `undefined`.
 *
 * @param {!JSONObjectDef} obj
 * @param {string} expr
 * @return {?JSONValueDef|undefined}
 */

function getValueForExpr(obj, expr) {
  var parts = expr.split('.');
  var value = obj;
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (!part) {
      value = undefined;
      break;
    }
    if (!_types.isObject(value) || value[part] === undefined || value.hasOwnProperty && !value.hasOwnProperty(part)) {
      value = undefined;
      break;
    }
    value = value[part];
  }
  return value;
}

/**
 * Parses the given `json` string without throwing an exception if not valid.
 * Returns `undefined` if parsing fails.
 * Returns the `Object` corresponding to the JSON string when parsing succeeds.
 * @param {*} json JSON string to parse
 * @param {function(!Error)=} opt_onFailed Optional function that will be called with
 *     the error if parsing fails.
 * @return {?JSONValueDef|undefined}
 */

function tryParseJson(json, opt_onFailed) {
  try {
    return JSON.parse( /** @type {string} */json);
  } catch (e) {
    if (opt_onFailed) {
      opt_onFailed(e);
    }
    return undefined;
  }
}

},{"./types":22}],10:[function(require,module,exports){
exports.__esModule = true;
exports.parseLayout = parseLayout;
exports.getLayoutClass = getLayoutClass;
exports.isLayoutSizeDefined = isLayoutSizeDefined;
exports.isInternalElement = isInternalElement;
exports.parseLength = parseLength;
exports.assertLength = assertLength;
exports.assertLengthOrPercent = assertLengthOrPercent;
exports.getLengthUnits = getLengthUnits;
exports.getLengthNumeral = getLengthNumeral;
exports.hasNaturalDimensions = hasNaturalDimensions;
exports.getNaturalDimensions = getNaturalDimensions;
exports.isLoadingAllowed = isLoadingAllowed;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Implements element layout. See https://goo.gl/9avXuT for
 * details.
 */

var _log = require('./log');

var _types = require('./types');

var _style = require('./style');

var _experiments = require('./experiments');

/** @const {string} */
var UX_EXPERIMENT = 'amp-ad-loading-ux';

exports.UX_EXPERIMENT = UX_EXPERIMENT;
/**
 * @enum {string}
 */
var Layout = {
  NODISPLAY: 'nodisplay',
  FIXED: 'fixed',
  FIXED_HEIGHT: 'fixed-height',
  RESPONSIVE: 'responsive',
  CONTAINER: 'container',
  FILL: 'fill',
  FLEX_ITEM: 'flex-item'
};

exports.Layout = Layout;
/**
 * CSS Length type. E.g. "1px" or "20vh".
 * @typedef {string}
 */
var LengthDef = undefined;

exports.LengthDef = LengthDef;
/**
 * @typedef {{
 *   width: string,
 *   height: string
 * }}
 */
var DimensionsDef = undefined;

/**
 * The set of elements with natural dimensions, that is, elements
 * which have a known dimension either based on their value specified here,
 * or, if the value is null, a dimension specific to the browser.
 * `hasNaturalDimensions` checks for membership in this set.
 * `getNaturalDimensions` determines the dimensions for an element in the
 *    set and caches it.
 * @type {!Object<string, ?DimensionsDef>}
 * @private  Visible for testing only!
 */
var naturalDimensions_ = {
  'AMP-PIXEL': { width: '1px', height: '1px' },
  'AMP-ANALYTICS': { width: '1px', height: '1px' },
  // TODO(dvoytenko): audio should have width:auto.
  'AMP-AUDIO': null,
  'AMP-SOCIAL-SHARE': { width: '60px', height: '44px' }
};

exports.naturalDimensions_ = naturalDimensions_;
/**
 * Elements that the progess can be shown for. This set has to be externalized
 * since the element's implementation may not be downloaded yet.
 * @enum {boolean}
 * @private  Visible for testing only!
 */
var LOADING_ELEMENTS_ = {
  'AMP-ANIM': true,
  'AMP-BRIGHTCOVE': true,
  'AMP-EMBED': true,
  'AMP-IFRAME': true,
  'AMP-IMG': true,
  'AMP-INSTAGRAM': true,
  'AMP-LIST': true,
  'AMP-PINTEREST': true,
  'AMP-VIDEO': true,
  'AMP-YOUTUBE': true
};

exports.LOADING_ELEMENTS_ = LOADING_ELEMENTS_;
/**
 * @param {string} s
 * @return {Layout|undefined} Returns undefined in case of failure to parse
 *   the layout string.
 */

function parseLayout(s) {
  for (var k in Layout) {
    if (Layout[k] == s) {
      return Layout[k];
    }
  }
  return undefined;
}

/**
 * @param {!Layout} layout
 * @return {string}
 */

function getLayoutClass(layout) {
  return '-amp-layout-' + layout;
}

/**
 * Whether an element with this layout inherently defines the size.
 * @param {!Layout} layout
 * @return {boolean}
 */

function isLayoutSizeDefined(layout) {
  return layout == Layout.FIXED || layout == Layout.FIXED_HEIGHT || layout == Layout.RESPONSIVE || layout == Layout.FILL || layout == Layout.FLEX_ITEM;
}

/**
 * Whether the tag is an internal (service) AMP tag.
 * @param {!Node|string} tag
 * @return {boolean}
 */

function isInternalElement(tag) {
  var tagName = typeof tag == 'string' ? tag : tag.tagName;
  return tagName && tagName.toLowerCase().indexOf('i-') == 0;
}

/**
 * Parses the CSS length value. If no units specified, the assumed value is
 * "px". Returns undefined in case of parsing error.
 * @param {string|undefined} s
 * @return {!LengthDef|undefined}
 */

function parseLength(s) {
  if (typeof s == 'number') {
    return s + 'px';
  }
  if (!s) {
    return undefined;
  }
  if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(s)) {
    return undefined;
  }
  if (/^\d+(\.\d+)?$/.test(s)) {
    return s + 'px';
  }
  return s;
}

/**
 * Asserts that the supplied value is a non-percent CSS Length value.
 * @param {!LengthDef|string|null|undefined} length
 * @return {!LengthDef}
 */

function assertLength(length) {
  _log.user().assert(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)$/.test(length), 'Invalid length value: %s', length);
  return (/** @type {!LengthDef} */length
  );
}

/**
 * Asserts that the supplied value is a CSS Length value
 * (including percent unit).
 * @param {!LengthDef|string} length
 * @return {!LengthDef}
 */

function assertLengthOrPercent(length) {
  _log.user().assert(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|%)$/.test(length), 'Invalid length or percent value: %s', length);
  return length;
}

/**
 * Returns units from the CSS length value.
 * @param {!LengthDef|string|null|undefined} length
 * @return {string}
 */

function getLengthUnits(length) {
  assertLength(length);
  _log.dev().assertString(length);
  var m = _log.user().assert(length.match(/[a-z]+/i), 'Failed to read units from %s', length);
  return m[0];
}

/**
 * Returns the numeric value of a CSS length value.
 * @param {!LengthDef|string|null|undefined} length
 * @return {number|undefined}
 */

function getLengthNumeral(length) {
  var res = parseFloat(length);
  return !_types.isFiniteNumber(res) ? undefined : res;
}

/**
 * Determines whether the tagName is a known element that has natural dimensions
 * in our runtime or the browser.
 * @param {string} tagName The element tag name.
 * @return {boolean}
 */

function hasNaturalDimensions(tagName) {
  tagName = tagName.toUpperCase();
  return naturalDimensions_[tagName] !== undefined;
}

/**
 * Determines the default dimensions for an element which could vary across
 * different browser implementations, like <audio> for instance.
 * This operation can only be completed for an element whitelisted by
 * `hasNaturalDimensions`.
 * @param {!Element} element
 * @return {DimensionsDef}
 */

function getNaturalDimensions(element) {
  var tagName = element.tagName.toUpperCase();
  _log.dev().assert(naturalDimensions_[tagName] !== undefined);
  if (!naturalDimensions_[tagName]) {
    var doc = element.ownerDocument;
    var naturalTagName = tagName.replace(/^AMP\-/, '');
    var temp = doc.createElement(naturalTagName);
    // For audio, should no-op elsewhere.
    temp.controls = true;
    _style.setStyles(temp, {
      position: 'absolute',
      visibility: 'hidden'
    });
    doc.body.appendChild(temp);
    naturalDimensions_[tagName] = {
      width: (temp. /*OK*/offsetWidth || 1) + 'px',
      height: (temp. /*OK*/offsetHeight || 1) + 'px'
    };
    doc.body.removeChild(temp);
  }
  return (/** @type {DimensionsDef} */naturalDimensions_[tagName]
  );
}

/**
 * Whether the loading can be shown for the specified elemeent. This set has
 * to be externalized since the element's implementation may not be
 * downloaded yet.
 * @param {!Element} element.
 * @return {boolean}
 */

function isLoadingAllowed(element) {
  var tagName = element.tagName.toUpperCase();
  if (tagName == 'AMP-AD' || tagName == 'AMP-EMBED') {
    var win = element.ownerDocument.defaultView;
    if (_experiments.isExperimentOn(win, UX_EXPERIMENT)) {
      return true;
    }
  }
  return LOADING_ELEMENTS_[tagName] || false;
}

},{"./experiments":8,"./log":11,"./style":21,"./types":22}],11:[function(require,module,exports){
exports.__esModule = true;
exports.isUserErrorMessage = isUserErrorMessage;
exports.rethrowAsync = rethrowAsync;
exports.initLogConstructor = initLogConstructor;
exports.resetLogConstructorForTesting = resetLogConstructorForTesting;
exports.user = user;
exports.dev = dev;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _mode = require('./mode');

var _modeObject = require('./mode-object');

/** @const Time when this JS loaded.  */
var start = Date.now();

/**
 * Triple zero width space.
 *
 * This is added to user error messages, so that we can later identify
 * them, when the only thing that we have is the message. This is the
 * case in many browsers when the global exception handler is invoked.
 *
 * @const {string}
 */
var USER_ERROR_SENTINEL = '\u200B\u200B\u200B';

exports.USER_ERROR_SENTINEL = USER_ERROR_SENTINEL;
/**
 * @return {boolean} Whether this message was a user error.
 */

function isUserErrorMessage(message) {
  return message.indexOf(USER_ERROR_SENTINEL) >= 0;
}

/**
 * @enum {number}
 * @private Visible for testing only.
 */
var LogLevel = {
  OFF: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  FINE: 4
};

exports.LogLevel = LogLevel;
/**
 * Logging class.
 * @final
 * @private Visible for testing only.
 */

var Log = (function () {
  /**
   * @param {!Window} win
   * @param {function(!./mode.ModeDef):!LogLevel} levelFunc
   * @param {string=} opt_suffix
   */

  function Log(win, levelFunc, opt_suffix) {
    babelHelpers.classCallCheck(this, Log);

    /**
     * In tests we use the main test window instead of the iframe where
     * the tests runs because only the former is relayed to the console.
     * @const {!Window}
     */
    this.win = _mode.getMode().test && win.AMP_TEST_IFRAME ? win.parent : win;

    /** @private @const {function(!./mode.ModeDef):!LogLevel} */
    this.levelFunc_ = levelFunc;

    /** @private @const {!LogLevel} */
    this.level_ = this.calcLevel_();

    /** @private @const {string} */
    this.suffix_ = opt_suffix || '';
  }

  /**
   * @param {string|!Element} val
   * @return {string}
   */

  /**
   * @return {!LogLevel}
   * @private
   */

  Log.prototype.calcLevel_ = function calcLevel_() {
    // No console - can't enable logging.
    if (!this.win.console || !this.win.console.log) {
      return LogLevel.OFF;
    }

    // Logging has been explicitly disabled.
    if (_mode.getMode().log == '0') {
      return LogLevel.OFF;
    }

    // Logging is enabled for tests directly.
    if (_mode.getMode().test && this.win.ENABLE_LOG) {
      return LogLevel.FINE;
    }

    // LocalDev by default allows INFO level, unless overriden by `#log`.
    if (_mode.getMode().localDev && !_mode.getMode().log) {
      return LogLevel.INFO;
    }

    // Delegate to the specific resolver.
    return this.levelFunc_(_modeObject.getModeObject());
  };

  /**
   * @param {string} tag
   * @param {string} level
   * @param {!Array} messages
   */

  Log.prototype.msg_ = function msg_(tag, level, messages) {
    if (this.level_ != LogLevel.OFF) {
      var fn = this.win.console.log;
      if (level == 'ERROR') {
        fn = this.win.console.error || fn;
      } else if (level == 'INFO') {
        fn = this.win.console.info || fn;
      } else if (level == 'WARN') {
        fn = this.win.console.warn || fn;
      }
      messages.unshift(Date.now() - start, '[' + tag + ']');
      fn.apply(this.win.console, messages);
    }
  };

  /**
   * Whether the logging is enabled.
   * @return {boolean}
   */

  Log.prototype.isEnabled = function isEnabled() {
    return this.level_ != LogLevel.OFF;
  };

  /**
   * Reports a fine-grained message.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.fine = function fine(tag, var_args) {
    if (this.level_ >= LogLevel.FINE) {
      this.msg_(tag, 'FINE', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports a informational message.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.info = function info(tag, var_args) {
    if (this.level_ >= LogLevel.INFO) {
      this.msg_(tag, 'INFO', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports a warning message.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.warn = function warn(tag, var_args) {
    if (this.level_ >= LogLevel.WARN) {
      this.msg_(tag, 'WARN', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports an error message. If the logging is disabled, the error is rethrown
   * asynchronously.
   * @param {string} tag
   * @param {...*} var_args
   */

  Log.prototype.error = function error(tag, var_args) {
    var _arguments = arguments,
        _this = this;

    if (this.level_ >= LogLevel.ERROR) {
      this.msg_(tag, 'ERROR', Array.prototype.slice.call(arguments, 1));
    } else {
      (function () {
        var error = createErrorVargs.apply(null, Array.prototype.slice.call(_arguments, 1));
        _this.prepareError_(error);
        _this.win.setTimeout(function () {
          throw error;
        });
      })();
    }
  };

  /**
   * Creates an error object.
   * @param {...*} var_args
   * @return {!Error}
   */

  Log.prototype.createError = function createError(var_args) {
    var error = createErrorVargs.apply(null, arguments);
    this.prepareError_(error);
    return error;
  };

  /**
   * Throws an error if the first argument isn't trueish.
   *
   * Supports argument substitution into the message via %s placeholders.
   *
   * Throws an error object that has two extra properties:
   * - associatedElement: This is the first element provided in the var args.
   *   It can be used for improved display of error messages.
   * - messageArray: The elements of the substituted message as non-stringified
   *   elements in an array. When e.g. passed to console.error this yields
   *   native displays of things like HTML elements.
   *
   * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
   *     not evaluate to true.
   * @param {string=} opt_message The assertion message
   * @param {...*} var_args Arguments substituted into %s in the message.
   * @return {T} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 0*/

  Log.prototype.assert = function assert(shouldBeTrueish, opt_message, var_args) {
    var firstElement = undefined;
    if (!shouldBeTrueish) {
      var message = opt_message || 'Assertion failed';
      var splitMessage = message.split('%s');
      var first = splitMessage.shift();
      var formatted = first;
      var messageArray = [];
      pushIfNonEmpty(messageArray, first);
      for (var i = 2; i < arguments.length; i++) {
        var val = arguments[i];
        if (val && val.tagName) {
          firstElement = val;
        }
        var nextConstant = splitMessage.shift();
        messageArray.push(val);
        pushIfNonEmpty(messageArray, nextConstant.trim());
        formatted += toString(val) + nextConstant;
      }
      var e = new Error(formatted);
      e.fromAssert = true;
      e.associatedElement = firstElement;
      e.messageArray = messageArray;
      this.prepareError_(e);
      throw e;
    }
    return shouldBeTrueish;
  };

  /**
   * Throws an error if the first argument isn't an Element
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeElement
   * @param {string=} opt_message The assertion message
   * @return {!Element} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/

  Log.prototype.assertElement = function assertElement(shouldBeElement, opt_message) {
    var shouldBeTrueish = shouldBeElement && shouldBeElement.nodeType == 1;
    this.assert(shouldBeTrueish, (opt_message || 'Element expected') + ': %s', shouldBeElement);
    return (/** @type {!Element} */shouldBeElement
    );
  };

  /**
   * Throws an error if the first argument isn't a string.
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeString
   * @param {string=} opt_message The assertion message
   * @return {string} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/

  Log.prototype.assertString = function assertString(shouldBeString, opt_message) {
    this.assert(typeof shouldBeString == 'string', (opt_message || 'String expected') + ': %s', shouldBeString);
    return (/** @type {string} */shouldBeString
    );
  };

  /**
   * Throws an error if the first argument isn't a number.
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeNumber
   * @param {string=} opt_message The assertion message
   * @return {number} The value of shouldBeTrueish.
   */

  Log.prototype.assertNumber = function assertNumber(shouldBeNumber, opt_message) {
    this.assert(typeof shouldBeNumber == 'number', (opt_message || 'Number expected') + ': %s', shouldBeNumber);
    return (/** @type {number} */shouldBeNumber
    );
  };

  /**
   * Asserts and returns the enum value. If the enum doesn't contain such a value,
   * the error is thrown.
   *
   * @param {!Object<T>} enumObj
   * @param {string} s
   * @param {string=} opt_enumName
   * @return T
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/

  Log.prototype.assertEnumValue = function assertEnumValue(enumObj, s, opt_enumName) {
    for (var k in enumObj) {
      if (enumObj[k] == s) {
        return enumObj[k];
      }
    }
    this.assert(false, 'Unknown %s value: "%s"', opt_enumName || 'enum', s);
  };

  /**
   * @param {!Error} error
   * @private
   */

  Log.prototype.prepareError_ = function prepareError_(error) {
    if (this.suffix_) {
      if (!error.message) {
        error.message = this.suffix_;
      } else if (error.message.indexOf(this.suffix_) == -1) {
        error.message += this.suffix_;
      }
    }
  };

  return Log;
})();

exports.Log = Log;
function toString(val) {
  if (val instanceof Element) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }
  return val;
}

/**
 * @param {!Array} array
 * @param {*} val
 */
function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}

/**
 * @param {...*} var_args
 * @return {!Error}
 * @private
 */
function createErrorVargs(var_args) {
  var error = null;
  var message = '';
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (arg instanceof Error && !error) {
      error = arg;
    } else {
      if (message) {
        message += ' ';
      }
      message += arg;
    }
  }
  if (!error) {
    error = new Error(message);
  } else if (message) {
    error.message = message + ': ' + error.message;
  }
  return error;
}

/**
 * Rethrows the error without terminating the current context. This preserves
 * whether the original error designation is a user error or a dev error.
 * @param {...*} var_args
 */

function rethrowAsync(var_args) {
  var error = createErrorVargs.apply(null, arguments);
  setTimeout(function () {
    throw error;
  });
}

/**
 * Cache for logs. We do not use a Service since the service module depends
 * on Log and closure literally can't even.
 * @type {{user: ?Log, dev: ?Log}}
 */
self.log = self.log || {
  user: null,
  dev: null
};

var logs = self.log;

/**
 * Eventually holds a constructor for Log objects. Lazily initialized, so we
 * can avoid ever referencing the real constructor except in JS binaries
 * that actually want to include the implementation.
 * @type {?Function}
 */
var logConstructor = null;

function initLogConstructor() {
  logConstructor = Log;
  // Initialize instances for use. If a binary (an extension for example) that
  // does not call `initLogConstructor` invokes `dev()` or `user()` earlier
  // than the binary that does call `initLogConstructor` (amp.js), the extension
  // will throw an error as that extension will never be able to initialize
  // the log instances and we also don't want it to call `initLogConstructor`
  // either (since that will cause the Log implementation to be bundled into that
  // binary). So we must initialize the instances eagerly so that they are
  // ready for use (stored globally) after the main binary calls
  // `initLogConstructor`.
  dev();
  user();
}

function resetLogConstructorForTesting() {
  logConstructor = null;
}

/**
 * Publisher level log.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Development mode is enabled via `#development=1` or logging is explicitly
 *     enabled via `#log=D` where D >= 1.
 *
 * @return {!Log}
 */

function user() {
  if (logs.user) {
    return logs.user;
  }
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }
  return logs.user = new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);
    if (mode.development || logNum >= 1) {
      return LogLevel.FINE;
    }
    return LogLevel.OFF;
  }, USER_ERROR_SENTINEL);
}

/**
 * AMP development log. Calls to `devLog().assert` and `dev.fine` are stripped in
 * the PROD binary. However, `devLog().assert` result is preserved in either case.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Logging is explicitly enabled via `#log=D`, where D >= 2.
 *
 * @return {!Log}
 */

function dev() {
  if (logs.dev) {
    return logs.dev;
  }
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }
  return logs.dev = new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);
    if (logNum >= 3) {
      return LogLevel.FINE;
    }
    if (logNum >= 2) {
      return LogLevel.INFO;
    }
    return LogLevel.OFF;
  });
}

},{"./mode":13,"./mode-object":12}],12:[function(require,module,exports){
exports.__esModule = true;
exports.getModeObject = getModeObject;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _mode = require('./mode');

/**
 * Provides info about the current app. This return value may be cached and
 * passed around as it will always be DCE'd.
 * @param {?Window=} opt_win
 * @return {!./mode.ModeDef}
 */

function getModeObject(opt_win) {
  return {
    localDev: _mode.getMode(opt_win).localDev,
    development: _mode.getMode(opt_win).development,
    filter: _mode.getMode(opt_win).filter,
    minified: _mode.getMode(opt_win).minified,
    lite: _mode.getMode(opt_win).lite,
    test: _mode.getMode(opt_win).test,
    log: _mode.getMode(opt_win).log,
    version: _mode.getMode(opt_win).version,
    rtvVersion: _mode.getMode(opt_win).rtvVersion
  };
}

},{"./mode":13}],13:[function(require,module,exports){
exports.__esModule = true;
exports.getMode = getMode;
exports.getRtvVersionForTesting = getRtvVersionForTesting;
exports.resetRtvVersionForTesting = resetRtvVersionForTesting;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   localDev: boolean,
 *   development: boolean,
 *   filter: (string|undefined),
 *   minified: boolean,
 *   lite: boolean,
 *   test: boolean,
 *   log: (string|undefined),
 *   version: string,
 *   rtvVersion: string,
 * }}
 */
var ModeDef = undefined;

exports.ModeDef = ModeDef;
/** @type {string} */
var version = '1481020541424';

/**
 * `rtvVersion` is the prefixed version we serve off of the cdn.
 * The prefix denotes canary(00) or prod(01) or an experiment version ( > 01).
 * @type {string}
 */
var rtvVersion = '';

/**
 * A #querySelector query to see if we have any scripts with development paths.
 * @type {string}
 */
var developmentScriptQuery = 'script[src*="/dist/"],script[src*="/base/"]';

/**
 * Provides info about the current app.
 * @param {?Window=} opt_win
 * @return {!ModeDef}
 */

function getMode(opt_win) {
  var win = opt_win || self;
  if (win.AMP_MODE) {
    return win.AMP_MODE;
  }
  return win.AMP_MODE = getMode_(win);
}

/**
 * Provides info about the current app.
 * @param {!Window} win
 * @return {!ModeDef}
 */
function getMode_(win) {
  // For 3p integration code
  if (win.context && win.context.mode) {
    return win.context.mode;
  }

  // Magic constants that are replaced by closure compiler.
  // IS_MINIFIED is always replaced with true when closure compiler is used
  // while IS_DEV is only replaced when the --fortesting flag is NOT used.
  var IS_DEV = true;
  var IS_MINIFIED = false;
  var FORCE_LOCALDEV = !!(self.AMP_CONFIG && self.AMP_CONFIG.localDev);
  var AMP_CONFIG_3P_FRAME_HOST = self.AMP_CONFIG && self.AMP_CONFIG.thirdPartyFrameHost;

  var isLocalDev = IS_DEV && !!(win.location.hostname == 'localhost' || FORCE_LOCALDEV && win.location.hostname == AMP_CONFIG_3P_FRAME_HOST || win.location.ancestorOrigins && win.location.ancestorOrigins[0] && win.location.ancestorOrigins[0].indexOf('http://localhost:') == 0) && (
  // Filter out localhost running against a prod script.
  // Because all allowed scripts are ours, we know that these can only
  // occur during local dev.
  !win.document || !!win.document.querySelector(developmentScriptQuery));

  var hashQuery = parseQueryString_(
  // location.originalHash is set by the viewer when it removes the fragment
  // from the URL.
  win.location.originalHash || win.location.hash);

  var searchQuery = parseQueryString_(win.location.search);

  if (!rtvVersion) {
    rtvVersion = getRtvVersion(win, isLocalDev);
  }

  // The `minified`, `test` and `localDev` properties are replaced
  // as boolean literals when we run `gulp dist` without the `--fortesting`
  // flags. This improved DCE on the production file we deploy as the code
  // paths for localhost/testing/development are eliminated.
  return {
    localDev: isLocalDev,
    // Triggers validation
    development: !!(hashQuery['development'] == '1' || win.AMP_DEV_MODE),
    // Allows filtering validation errors by error category. For the
    // available categories, see ErrorCategory in validator/validator.proto.
    filter: hashQuery['filter'],
    minified: IS_MINIFIED,
    // Whether document is in an amp-lite viewer. It signal that the user
    // would prefer to use less bandwidth.
    lite: searchQuery['amp_lite'] != undefined,
    test: IS_DEV && !!(win.AMP_TEST || win.__karma__),
    log: hashQuery['log'],
    version: version,
    rtvVersion: rtvVersion
  };
}

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 * @param {string} queryString
 * @return {!Object<string, string>}
 * TODO(dvoytenko): dedupe with `url.js:parseQueryString`. This is currently
 * necessary here because `url.js` itself inderectly depends on `mode.js`.
 */
function parseQueryString_(queryString) {
  var params = Object.create(null);
  if (!queryString) {
    return params;
  }
  if (queryString.indexOf('?') == 0 || queryString.indexOf('#') == 0) {
    queryString = queryString.substr(1);
  }
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eqIndex = pair.indexOf('=');
    var _name = undefined;
    var value = undefined;
    if (eqIndex != -1) {
      _name = decodeURIComponent(pair.substring(0, eqIndex)).trim();
      value = decodeURIComponent(pair.substring(eqIndex + 1)).trim();
    } else {
      _name = decodeURIComponent(pair).trim();
      value = '';
    }
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Retrieve the `rtvVersion` which will have a numeric prefix
 * denoting canary/prod/experiment.
 *
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 */
function getRtvVersion(win, isLocalDev) {
  // If it's local dev then we won't actually have a full version so
  // just use the version.
  if (isLocalDev) {
    return version;
  }

  if (win.AMP_CONFIG && win.AMP_CONFIG.v) {
    return win.AMP_CONFIG.v;
  }

  // Currently `1481020541424` and thus `mode.version` contain only
  // major version. The full version however must also carry the minor version.
  // We will default to production default `01` minor version for now.
  // TODO(erwinmombay): decide whether 1481020541424 should contain
  // minor version.
  return '01' + version;
}

/**
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 * @visibleForTesting
 */

function getRtvVersionForTesting(win, isLocalDev) {
  return getRtvVersion(win, isLocalDev);
}

/** @visibleForTesting */

function resetRtvVersionForTesting() {
  rtvVersion = '';
}

},{}],14:[function(require,module,exports){
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Importing the document-register-element module has the side effect
// of installing the custom elements polyfill if necessary.

var _documentRegisterElementBuildDocumentRegisterElementNode = require('document-register-element/build/document-register-element.node');

var _documentRegisterElementBuildDocumentRegisterElementNode2 = babelHelpers.interopRequireDefault(_documentRegisterElementBuildDocumentRegisterElementNode);

var _polyfillsDocumentContains = require('./polyfills/document-contains');

var _polyfillsMathSign = require('./polyfills/math-sign');

var _polyfillsObjectAssign = require('./polyfills/object-assign');

var _polyfillsPromise = require('./polyfills/promise');

var _mode = require('./mode');

/**
  Only install in closure binary and not in babel/browserify binary, since in
  the closure binary we strip out the `document-register-element` install side
  effect so we can tree shake the dependency correctly and we have to make
  sure to not `install` it during dev since the `install` is done as a side
  effect in importing the module.
*/
if (!_mode.getMode().localDev) {
  _documentRegisterElementBuildDocumentRegisterElementNode2['default'](self);
}
_polyfillsMathSign.install(self);
_polyfillsObjectAssign.install(self);
_polyfillsPromise.install(self);
_polyfillsDocumentContains.install(self);

},{"./mode":13,"./polyfills/document-contains":15,"./polyfills/math-sign":16,"./polyfills/object-assign":17,"./polyfills/promise":18,"document-register-element/build/document-register-element.node":3}],15:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `document.contains()` method. Notice that according to spec
 * `document.contains` is inclusionary.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {?Node} node
 * @return {boolean}
 * @this {Node}
 */
function documentContainsPolyfill(node) {
  // Per spec, "contains" method is inclusionary
  // i.e. `node.contains(node) == true`. However, we still need to test
  // equality to the document itself.
  return node == this || this.documentElement.contains(node);
}

/**
 * Polyfills `HTMLDocument.contains` API.
 * @param {!Window} win
 */

function install(win) {
  if (!win.HTMLDocument.prototype.contains) {
    win.HTMLDocument.prototype.contains = documentContainsPolyfill;
  }
}

},{}],16:[function(require,module,exports){
exports.__esModule = true;
exports.sign = sign;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Parses the number x and returns its sign. For positive x returns 1, for
 * negative, -1. For 0 and -0, returns 0 and -0 respectively. For any number
 * that parses to NaN, returns NaN.
 *
 * @param {number} x
 * @returns {number}
 */

function sign(x) {
  x = Number(x);

  // If x is 0, -0, or NaN, return it.
  if (!x) {
    return x;
  }

  return x > 0 ? 1 : -1;
}

;

/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Math.sign) {
    win.Math.sign = sign;
  }
}

},{}],17:[function(require,module,exports){
exports.__esModule = true;
exports.assign = assign;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copies values of all enumerable own properties from one or more source
 * objects (provided as extended arguments to the function) to a target object.
 *
 * @param {!Object} target
 * @returns {!Object}
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

function assign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          output[key] = source[key];
        }
      }
    }
  }
  return output;
}

/**
 * Sets the Object.assign polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Object.assign) {
    win.Object.assign = assign;
  }
}

},{}],18:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _promisePjsPromise = require('promise-pjs/promise');

var Promise = babelHelpers.interopRequireWildcard(_promisePjsPromise);

/**
 * Sets the Promise polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Promise) {
    win.Promise = /** @type {?} */Promise;
    // In babel the * export is an Object with a default property.
    // In closure compiler it is the Promise function itself.
    if (Promise['default']) {
      win.Promise = Promise['default'];
    }
    // We copy the individual static methods, because closure
    // compiler flattens the polyfill namespace.
    win.Promise.resolve = Promise.resolve;
    win.Promise.reject = Promise.reject;
    win.Promise.all = Promise.all;
    win.Promise.race = Promise.race;
  }
}

},{"promise-pjs/promise":4}],19:[function(require,module,exports){
exports.__esModule = true;
exports.getExistingServiceForWindow = getExistingServiceForWindow;
exports.getExistingServiceForWindowInEmbedScope = getExistingServiceForWindowInEmbedScope;
exports.getExistingServiceForDoc = getExistingServiceForDoc;
exports.getExistingServiceForDocInEmbedScope = getExistingServiceForDocInEmbedScope;
exports.installServiceInEmbedScope = installServiceInEmbedScope;
exports.getService = getService;
exports.fromClass = fromClass;
exports.getServicePromise = getServicePromise;
exports.getServicePromiseOrNull = getServicePromiseOrNull;
exports.getServiceForDoc = getServiceForDoc;
exports.fromClassForDoc = fromClassForDoc;
exports.getServicePromiseForDoc = getServicePromiseForDoc;
exports.getServicePromiseOrNullForDoc = getServicePromiseOrNullForDoc;
exports.setParentWindow = setParentWindow;
exports.getParentWindow = getParentWindow;
exports.getTopWindow = getTopWindow;
exports.getParentWindowFrameElement = getParentWindowFrameElement;
exports.getAmpdoc = getAmpdoc;
exports.isDisposable = isDisposable;
exports.assertDisposable = assertDisposable;
exports.disposeServicesForDoc = disposeServicesForDoc;
exports.disposeServicesForEmbed = disposeServicesForEmbed;
exports.resetServiceForTesting = resetServiceForTesting;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Requires polyfills in immediate side effect.

require('./polyfills');

var _log = require('./log');

/**
 * Holds info about a service.
 * - obj: Actual service implementation when available.
 * - promise: Promise for the obj.
 * - resolve: Function to resolve the promise with the object.
 * @typedef {{
 *   obj: (?Object),
 *   promise: (?Promise|undefined),
 *   resolve: (?function(!Object)|undefined),
 * }}
 */
var ServiceHolderDef = undefined;

/**
 * This interface provides a `dispose` method that will be called by
 * runtime when a service needs to be disposed of.
 * @interface
 */

var Disposable = (function () {
  function Disposable() {
    babelHelpers.classCallCheck(this, Disposable);
  }

  /**
   * Returns a service with the given id. Assumes that it has been constructed
   * already.
   * @param {!Window} win
   * @param {string} id
   * @return {!Object} The service.
   */

  /**
   * Instructs the service to release any resources it might be holding. Can
   * be called only once in the lifecycle of a service.
   */

  Disposable.prototype.dispose = function dispose() {};

  return Disposable;
})();

exports.Disposable = Disposable;

function getExistingServiceForWindow(win, id) {
  win = getTopWindow(win);
  var exists = win.services && win.services[id] && win.services[id].obj;
  return _log.dev().assert(exists, id + ' service not found. Make sure it is ' + 'installed.');
}

/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 * @param {!Window} win
 * @param {string} id
 * @return {!Object} The service.
 */

function getExistingServiceForWindowInEmbedScope(win, id) {
  // First, try to resolve via local (embed) window.
  var local = getLocalExistingServiceForEmbedWinOrNull(win, id);
  if (local) {
    return local;
  }
  // Fallback to top-level window.
  return getExistingServiceForWindow(win, id);
}

/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id
 * @return {!Object} The service.
 */

function getExistingServiceForDoc(nodeOrDoc, id) {
  var serviceHolder = getAmpdocServiceHolder(nodeOrDoc);
  var exists = serviceHolder && serviceHolder.services && serviceHolder.services[id] && serviceHolder.services[id].obj;
  return _log.dev().assert(exists, id + ' doc service not found. Make sure it is ' + 'installed.');
}

/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id
 * @return {!Object} The service.
 */

function getExistingServiceForDocInEmbedScope(nodeOrDoc, id) {
  // First, try to resolve via local (embed) window.
  if (nodeOrDoc.nodeType) {
    // If a node is passed, try to resolve via this node.
    var win = /** @type {!Document} */(nodeOrDoc.ownerDocument || nodeOrDoc).defaultView;
    var local = getLocalExistingServiceForEmbedWinOrNull(win, id);
    if (local) {
      return local;
    }
  }
  // Fallback to ampdoc.
  return getExistingServiceForDoc(nodeOrDoc, id);
}

/**
 * Installs a service override on amp-doc level.
 * @param {!Window} embedWin
 * @param {string} id
 * @param {!Object} service The service.
 */

function installServiceInEmbedScope(embedWin, id, service) {
  var topWin = getTopWindow(embedWin);
  _log.dev().assert(embedWin != topWin, 'Service override can only be installed in embed window: %s', id);
  _log.dev().assert(!getLocalExistingServiceForEmbedWinOrNull(embedWin, id), 'Service override has already been installed: %s', id);
  getServiceInternal(embedWin, embedWin, id, function () {
    return service;
  });
}

/**
 * @param {!Window} embedWin
 * @param {string} id
 * @return {?Object}
 */
function getLocalExistingServiceForEmbedWinOrNull(embedWin, id) {
  // Note that this method currently only resolves against the given window.
  // It does not try to go all the way up the parent window chain. We can change
  // this in the future, but for now this gives us a better performance.
  var topWin = getTopWindow(embedWin);
  if (embedWin != topWin && embedWin.services && embedWin.services[id] && embedWin.services[id].obj) {
    return embedWin.services[id].obj;
  }
  return null;
}

/**
 * Returns a service for the given id and window (a per-window singleton).
 * If the service is not yet available the factory function is invoked and
 * expected to return the service.
 * Users should typically wrap this as a special purpose function (e.g.
 * `vsyncFor(win)`) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(!Window):T=} opt_factory Should create the service
 *     if it does not exist yet. If the factory is not given, it is an error
 *     if the service does not exist yet.
 * @template T
 * @return {T}
 */

function getService(win, id, opt_factory) {
  win = getTopWindow(win);
  return getServiceInternal(win, win, id, opt_factory ? opt_factory : undefined);
}

/**
 * Returns a service and registers it given a class to be used as
 * implementation.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(new:T, !Window)} constructor
 * @return {T}
 * @template T
 */

function fromClass(win, id, constructor) {
  win = getTopWindow(win);
  return getServiceInternal(win, win, id, undefined, constructor);
}

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * `vsyncFor(win)`) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */

function getServicePromise(win, id) {
  return getServicePromiseInternal(win, id);
}

/**
 * Like getServicePromise but returns null if the service was never registered.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */

function getServicePromiseOrNull(win, id) {
  return getServicePromiseOrNullInternal(win, id);
}

/**
 * Returns a service for the given id and ampdoc (a per-ampdoc singleton).
 * If the service is not yet available the factory function is invoked and
 * expected to return the service.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {function(!./service/ampdoc-impl.AmpDoc):T=} opt_factory
 *     Should create the service if it does not exist yet. If the factory is
 *     not given, it is an error if the service does not exist yet.
 * @return {T}
 * @template T
 */

function getServiceForDoc(nodeOrDoc, id, opt_factory) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return getServiceInternal(getAmpdocServiceHolder(ampdoc), ampdoc, id, opt_factory);
}

/**
 * Returns a service and registers it given a class to be used as
 * implementation.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {function(new:T, !./service/ampdoc-impl.AmpDoc)} constructor
 * @return {T}
 * @template T
 */

function fromClassForDoc(nodeOrDoc, id, constructor) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return getServiceInternal(getAmpdocServiceHolder(ampdoc), ampdoc, id, undefined, constructor);
}

/**
 * Returns a promise for a service for the given id and ampdoc. Also expects
 * a service that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */

function getServicePromiseForDoc(nodeOrDoc, id) {
  return getServicePromiseInternal(getAmpdocServiceHolder(nodeOrDoc), id);
}

/**
 * Like getServicePromiseForDoc but returns null if the service was never
 * registered for this ampdoc.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */

function getServicePromiseOrNullForDoc(nodeOrDoc, id) {
  return getServicePromiseOrNullInternal(getAmpdocServiceHolder(nodeOrDoc), id);
}

/**
 * Set the parent and top windows on a child window (friendly iframe).
 * @param {!Window} win
 * @param {!Window} parentWin
 */

function setParentWindow(win, parentWin) {
  win.__AMP_PARENT = parentWin;
  win.__AMP_TOP = getTopWindow(parentWin);
}

/**
 * Returns the parent window for a child window (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */

function getParentWindow(win) {
  return win.__AMP_PARENT || win;
}

/**
 * Returns the top window where AMP Runtime is installed for a child window
 * (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */

function getTopWindow(win) {
  return win.__AMP_TOP || win;
}

/**
 * Returns the parent "friendly" iframe if the node belongs to a child window.
 * @param {!Node} node
 * @param {!Window} topWin
 * @return {?HTMLIFrameElement}
 */

function getParentWindowFrameElement(node, topWin) {
  var childWin = (node.ownerDocument || node).defaultView;
  if (childWin && childWin != topWin && getTopWindow(childWin) == topWin) {
    try {
      return (/** @type {?HTMLIFrameElement} */childWin.frameElement
      );
    } catch (e) {
      // Ignore the error.
    }
  }
  return null;
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc}
 */

function getAmpdoc(nodeOrDoc) {
  if (nodeOrDoc.nodeType) {
    var win = /** @type {!Document} */(nodeOrDoc.ownerDocument || nodeOrDoc).defaultView;
    return getAmpdocService(win).getAmpDoc( /** @type {!Node} */nodeOrDoc);
  }
  return (/** @type {!./service/ampdoc-impl.AmpDoc} */nodeOrDoc
  );
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc|!Window}
 */
function getAmpdocServiceHolder(nodeOrDoc) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return ampdoc.isSingleDoc() ? ampdoc.win : ampdoc;
}

/**
 * This is essentially a duplicate of `ampdoc.js`, but necessary to avoid
 * circular dependencies.
 * @param {!Window} win
 * @return {!./service/ampdoc-impl.AmpDocService}
 */
function getAmpdocService(win) {
  return (/** @type {!./service/ampdoc-impl.AmpDocService} */getService(win, 'ampdoc')
  );
}

/**
 * @param {!Object} holder Object holding the service instance.
 * @param {!Window|!./service/ampdoc-impl.AmpDoc} context Win or AmpDoc.
 * @param {string} id of the service.
 * @param {function(?):T=} opt_factory
 *     Should create the service if it does not exist yet. If the factory
 *     is not given, it is an error if the service does not exist yet.
 *     Called with context.
 * @param {function(new:T, ?)=} opt_constructor
 *     Constructor function to new the service. Called with context.
 * @return {*}
 * @template T
 */
function getServiceInternal(holder, context, id, opt_factory, opt_constructor) {
  var services = getServices(holder);
  var s = services[id];
  if (!s) {
    s = services[id] = {
      obj: null,
      promise: null,
      resolve: null
    };
  }

  if (!s.obj) {
    _log.dev().assert(opt_factory || opt_constructor, 'Factory or class not given and service missing %s', id);
    s.obj = opt_constructor ? new opt_constructor(context) : opt_factory(context);
    // The service may have been requested already, in which case we have a
    // pending promise we need to fulfill.
    if (s.resolve) {
      s.resolve(s.obj);
    }
  }
  return s.obj;
}

/**
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */
function getServicePromiseInternal(holder, id) {
  var cached = getServicePromiseOrNullInternal(holder, id);
  if (cached) {
    return cached;
  }
  var services = getServices(holder);

  // TODO(@cramforce): Add a check that if the element is eventually registered
  // that the service is actually provided and this promise resolves.
  var resolve = undefined;
  var p = new Promise(function (r) {
    resolve = r;
  });
  services[id] = {
    obj: null,
    promise: p,
    resolve: resolve
  };

  return p;
}

/**
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */
function getServicePromiseOrNullInternal(holder, id) {
  var services = getServices(holder);
  var s = services[id];
  if (s) {
    var p = s.promise;
    if (p) {
      return p;
    }
    if (s.obj) {
      return s.promise = Promise.resolve(s.obj);
    }
    _log.dev().assert(false, 'Expected object or promise to be present');
  }
  return null;
}

/**
 * Returns the object that holds the services registered in a holder.
 * @param {!Object} holder
 * @return {!Object<string,!ServiceHolderDef>}
 */
function getServices(holder) {
  var services = holder.services;
  if (!services) {
    services = holder.services = {};
  }
  return services;
}

/**
 * Whether the specified service implements `Disposable` interface.
 * @param {!Object} service
 * @return {boolean}
 */

function isDisposable(service) {
  return typeof service.dispose == 'function';
}

/**
 * Asserts that the specified service implements `Disposable` interface and
 * typecasts the instance to `Disposable`.
 * @param {!Object} service
 * @return {!Disposable}
 */

function assertDisposable(service) {
  _log.dev().assert(isDisposable(service), 'required to implement Disposable');
  return (/** @type {!Disposable} */service
  );
}

/**
 * Disposes all disposable (implements `Disposable` interface) services in
 * ampdoc scope.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 */

function disposeServicesForDoc(ampdoc) {
  disposeServicesInternal(ampdoc);
}

/**
 * Disposes all disposable (implements `Disposable` interface) services in
 * embed scope.
 * @param {!Window} embedWin
 */

function disposeServicesForEmbed(embedWin) {
  disposeServicesInternal(embedWin);
}

/**
 * @param {!Object} holder Object holding the service instances.
 */
function disposeServicesInternal(holder) {
  // TODO(dvoytenko): Consider marking holder as destroyed for later-arriving
  // service to be canceled automatically.
  var services = getServices(holder);

  var _loop = function (id) {
    if (!Object.prototype.hasOwnProperty.call(services, id)) {
      return 'continue';
    }
    var serviceHolder = services[id];
    if (serviceHolder.obj) {
      disposeServiceInternal(id, serviceHolder.obj);
    } else if (serviceHolder.promise) {
      serviceHolder.promise.then(function (instance) {
        return disposeServiceInternal(id, instance);
      });
    }
  };

  for (var id in services) {
    var _ret = _loop(id);

    if (_ret === 'continue') continue;
  }
}

/**
 * @param {string} id
 * @param {!Object} service
 */
function disposeServiceInternal(id, service) {
  if (!isDisposable(service)) {
    return;
  }
  try {
    assertDisposable(service).dispose();
  } catch (e) {
    // Ensure that a failure to dispose a service does not disrupt other
    // services.
    _log.dev().error('SERVICE', 'failed to dispose service', id, e);
  }
}

/**
 * Resets a single service, so it gets recreated on next getService invocation.
 * @param {!Object} holder
 * @param {string} id of the service.
 */

function resetServiceForTesting(holder, id) {
  if (holder.services) {
    holder.services[id] = null;
  }
}

},{"./log":11,"./polyfills":14}],20:[function(require,module,exports){
exports.__esModule = true;
exports.dashToCamelCase = dashToCamelCase;
exports.endsWith = endsWith;
exports.startsWith = startsWith;
exports.expandTemplate = expandTemplate;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes removed and character after to upper case.
 * visibleForTesting
 */

function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, function (_all, character) {
    return character.toUpperCase();
  });
}

/**
 * Polyfill for String.prototype. endsWith.
 * @param {string} string
 * @param {string} suffix
 * @return {boolean}
 */

function endsWith(string, suffix) {
  var index = string.length - suffix.length;
  return index >= 0 && string.indexOf(suffix, index) == index;
}

/**
 * Polyfill for String.prototype. startsWith.
 * @param {string} string
 * @param {string} prefix
 * @return {boolean}
 */

function startsWith(string, prefix) {
  if (prefix.length > string.length) {
    return false;
  }
  return string.lastIndexOf(prefix, 0) == 0;
}

/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {!function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=} opt_maxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */

function expandTemplate(template, getter, opt_maxIterations) {
  var maxIterations = opt_maxIterations || 1;

  var _loop = function (i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });
    if (!matches) {
      return "break";
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }
  return template;
}

},{}],21:[function(require,module,exports){
exports.__esModule = true;
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.setStyle = setStyle;
exports.getStyle = getStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
exports.removeAlphaFromColor = removeAlphaFromColor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: loaded by 3p system. Cannot rely on babel polyfills.

/** @type {Object<string, string>} */
var propertyNameCache = undefined;

/** @const {!Array<string>} */
var vendorPrefixes = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];

/**
 * @export
 * @param {string} camelCase camel cased string
 * @return {string} title cased string
 */

function camelCaseToTitleCase(camelCase) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Checks the style if a prefixed version of a property exists and returns
 * it or returns an empty string.
 * @private
 * @param {!CSSStyleDeclaration|!HTMLDocument} style
 * @param {string} titleCase the title case version of a css property name
 * @return {string} the prefixed property name or null.
 */
function getVendorJsPropertyName_(style, titleCase) {
  for (var i = 0; i < vendorPrefixes.length; i++) {
    var propertyName = vendorPrefixes[i] + titleCase;
    if (style[propertyName] !== undefined) {
      return propertyName;
    }
  }
  return '';
}

/**
 * Returns the possibly prefixed JavaScript property name of a style property
 * (ex. WebkitTransitionDuration) given a camelCase'd version of the property
 * (ex. transitionDuration).
 * @export
 * @param {!CSSStyleDeclaration|!HTMLDocument} style
 * @param {string} camelCase the camel cased version of a css property name
 * @param {boolean=} opt_bypassCache bypass the memoized cache of property
 *   mapping
 * @return {string}
 */

function getVendorJsPropertyName(style, camelCase, opt_bypassCache) {
  if (!propertyNameCache) {
    propertyNameCache = Object.create(null);
  }
  var propertyName = propertyNameCache[camelCase];
  if (!propertyName || opt_bypassCache) {
    propertyName = camelCase;
    if (style[camelCase] === undefined) {
      var titleCase = camelCaseToTitleCase(camelCase);
      var prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);

      if (style[prefixedPropertyName] !== undefined) {
        propertyName = prefixedPropertyName;
      }
    }
    if (!opt_bypassCache) {
      propertyNameCache[camelCase] = propertyName;
    }
  }
  return propertyName;
}

/**
 * Sets the CSS style of the specified element with optional units, e.g. "px".
 * @param {Element} element
 * @param {string} property
 * @param {*} value
 * @param {string=} opt_units
 * @param {boolean=} opt_bypassCache
 */

function setStyle(element, property, value, opt_units, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (propertyName) {
    element.style[propertyName] = opt_units ? value + opt_units : value;
  }
}

/**
 * Returns the value of the CSS style of the specified element.
 * @param {!Element} element
 * @param {string} property
 * @param {boolean=} opt_bypassCache
 * @return {*}
 */

function getStyle(element, property, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (!propertyName) {
    return undefined;
  }
  return element.style[propertyName];
}

/**
 * Sets the CSS styles of the specified element. The styles
 * a specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, *>} styles
 */

function setStyles(element, styles) {
  for (var k in styles) {
    setStyle(element, k, styles[k]);
  }
}

/**
 * Shows or hides the specified element.
 * @param {!Element} element
 * @param {boolean=} opt_display
 */

function toggle(element, opt_display) {
  if (opt_display === undefined) {
    opt_display = getStyle(element, 'display') == 'none';
  }
  setStyle(element, 'display', opt_display ? '' : 'none');
}

/**
 * Returns a pixel value.
 * @param {number} value
 * @return {string}
 */

function px(value) {
  return value + 'px';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function translateX(value) {
  if (typeof value == 'string') {
    return 'translateX(' + value + ')';
  }
  return 'translateX(' + px(value) + ')';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} x
 * @param {(number|string)=} opt_y
 * @return {string}
 */

function translate(x, opt_y) {
  if (typeof x == 'number') {
    x = px(x);
  }
  if (opt_y === undefined) {
    return 'translate(' + x + ')';
  }
  if (typeof opt_y == 'number') {
    opt_y = px(opt_y);
  }
  return 'translate(' + x + ',' + opt_y + ')';
}

/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function scale(value) {
  return 'scale(' + value + ')';
}

/**
 * Remove alpha value from a rgba color value.
 * Return the new color property with alpha equals if has the alpha value.
 * Caller needs to make sure the input color value is a valid rgba/rgb value
 * @param {string} rgbaColor
 * @return {string}
 */

function removeAlphaFromColor(rgbaColor) {
  return rgbaColor.replace(/\(([^,]+),([^,]+),([^,)]+),[^)]+\)/g, '($1,$2,$3, 1)');
}

},{}],22:[function(require,module,exports){
exports.__esModule = true;
exports.isArray = isArray;
exports.toArray = toArray;
exports.map = map;
exports.isObject = isObject;
exports.isFiniteNumber = isFiniteNumber;
exports.isFormData = isFormData;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @const */
var toString_ = Object.prototype.toString;

/**
 * Returns the ECMA [[Class]] of a value
 * @param {*} value
 * @return {string}
 */
function toString(value) {
  return toString_.call(value);
}

/**
 * Determines if value is actually an Array.
 * @param {*} value
 * @return {boolean}
 */

function isArray(value) {
  return Array.isArray(value);
}

/**
 * Converts an array-like object to an array.
 * @param {?IArrayLike<T>|string} arrayLike
 * @return {!Array<T>}
 * @template T
 */

function toArray(arrayLike) {
  if (!arrayLike) {
    return [];
  }
  var array = new Array(arrayLike.length);
  for (var i = 0; i < arrayLike.length; i++) {
    array[i] = arrayLike[i];
  }
  return array;
}

/**
 * Returns a map-like object.
 * If opt_initial is provided, copies its own properties into the
 * newly created object.
 * @param {T=} opt_initial This should typically be an object literal.
 * @return {T}
 * @template T
 */

function map(opt_initial) {
  var obj = Object.create(null);
  if (opt_initial) {
    Object.assign(obj, opt_initial);
  }
  return obj;
}

/**
 * Determines if value is actually an Object.
 * @param {*} value
 * @return {boolean}
 */

function isObject(value) {
  return toString(value) === '[object Object]';
}

/**
 * Determines if value is of number type and finite.
 * NaN and Infinity are not considered a finite number.
 * String numbers are not considered numbers.
 * @param {*} value
 * @return {boolean}
 */

function isFiniteNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Determines if value is of FormData type.
 * @param {*} value
 * @return {boolean}
 */

function isFormData(value) {
  return toString(value) === '[object FormData]';
}

},{}],23:[function(require,module,exports){
exports.__esModule = true;
exports.parseUrl = parseUrl;
exports.appendEncodedParamStringToUrl = appendEncodedParamStringToUrl;
exports.addParamToUrl = addParamToUrl;
exports.addParamsToUrl = addParamsToUrl;
exports.serializeQueryString = serializeQueryString;
exports.isSecureUrl = isSecureUrl;
exports.assertHttpsUrl = assertHttpsUrl;
exports.assertAbsoluteHttpOrHttpsUrl = assertAbsoluteHttpOrHttpsUrl;
exports.parseQueryString = parseQueryString;
exports.removeFragment = removeFragment;
exports.isProxyOrigin = isProxyOrigin;
exports.isLocalhostOrigin = isLocalhostOrigin;
exports.getSourceUrl = getSourceUrl;
exports.getSourceOrigin = getSourceOrigin;
exports.resolveRelativeUrl = resolveRelativeUrl;
exports.resolveRelativeUrlFallback_ = resolveRelativeUrlFallback_;
exports.getCorsUrl = getCorsUrl;
exports.checkCorsUrl = checkCorsUrl;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _string = require('./string');

var _log = require('./log');

var _mode = require('./mode');

var _config = require('./config');

var _types = require('./types');

/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */
var a = undefined;

/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {Object<string, !Location>}
 */
var cache = undefined;

/** @private @const Matches amp_js_* paramters in query string. */
var AMP_JS_PARAMS_REGEX = /[?&]amp_js[^&]*/;

/** @const {string} */
var SOURCE_ORIGIN_PARAM = '__amp_source_origin';

exports.SOURCE_ORIGIN_PARAM = SOURCE_ORIGIN_PARAM;
/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {string} url
 * @param {boolean=} opt_nocache
 * @return {!Location}
 */

function parseUrl(url, opt_nocache) {
  if (!a) {
    a = /** @type {!HTMLAnchorElement} */self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = Object.create(null));
  }

  var fromCache = cache[url];
  if (fromCache) {
    return fromCache;
  }
  a.href = url;
  // IE11 doesn't provide full URL components when parsing relative URLs.
  // Assigning to itself again does the trick.
  // TODO(lannka, #3449): Remove all the polyfills once we don't support IE11
  // and it passes tests in all browsers.
  if (!a.protocol) {
    a.href = a.href;
  }

  var info = /** @type {!Location} */{
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: null };

  // Some IE11 specific polyfills.
  // 1) IE11 strips out the leading '/' in the pathname.
  // Set below.
  if (info.pathname[0] !== '/') {
    info.pathname = '/' + info.pathname;
  }

  // 2) For URLs with implicit ports, IE11 parses to default ports while
  // other browsers leave the port field empty.
  if (info.protocol == 'http:' && info.port == 80 || info.protocol == 'https:' && info.port == 443) {
    info.port = '';
    info.host = info.hostname;
  }

  // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.
  if (a.origin && a.origin != 'null') {
    info.origin = a.origin;
  } else if (info.protocol == 'data:' || !info.host) {
    info.origin = info.href;
  } else {
    info.origin = info.protocol + '//' + info.host;
  }
  // Freeze during testing to avoid accidental mutation.
  var frozen = _mode.getMode().test && Object.freeze ? Object.freeze(info) : info;

  if (opt_nocache) {
    return frozen;
  }
  return cache[url] = frozen;
}

/**
 * Appends the string just before the fragment part (or optionally
 * to the front of the query string) of the URL.
 * @param {string} url
 * @param {string} paramString
 * @param {boolean=} opt_addToFront
 * @return {string}
 */

function appendEncodedParamStringToUrl(url, paramString, opt_addToFront) {
  if (!paramString) {
    return url;
  }
  var mainAndFragment = url.split('#', 2);
  var mainAndQuery = mainAndFragment[0].split('?', 2);

  var newUrl = mainAndQuery[0] + (mainAndQuery[1] ? opt_addToFront ? '?' + paramString + '&' + mainAndQuery[1] : '?' + mainAndQuery[1] + '&' + paramString : '?' + paramString);
  newUrl += mainAndFragment[1] ? '#' + mainAndFragment[1] : '';
  return newUrl;
}

/**
 * Appends a query string field and value to a url. `key` and `value`
 * will be ran through `encodeURIComponent` before appending.
 * @param {string} url
 * @param {string} key
 * @param {string} value
 * @param {boolean=} opt_addToFront
 * @return {string}
 */

function addParamToUrl(url, key, value, opt_addToFront) {
  var field = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  return appendEncodedParamStringToUrl(url, field, opt_addToFront);
}

/**
 * Appends query string fields and values to a url. The `params` objects'
 * `key`s and `value`s will be transformed into query string keys/values.
 * @param {string} url
 * @param {!Object<string, string|!Array<string>>} params
 * @return {string}
 */

function addParamsToUrl(url, params) {
  return appendEncodedParamStringToUrl(url, serializeQueryString(params));
}

/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!Object<string, string|!Array<string>>} params
 * @return {string}
 */

function serializeQueryString(params) {
  var s = [];
  for (var k in params) {
    var v = params[k];
    if (v == null) {
      continue;
    } else if (_types.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        var sv = /** @type {string} */v[i];
        s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
      }
    } else {
      var sv = /** @type {string} */v;
      s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
    }
  }
  return s.join('&');
}

/**
 * Returns `true` if the URL is secure: either HTTPS or localhost (for testing).
 * @param {string|!Location} url
 * @return {boolean}
 */

function isSecureUrl(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return url.protocol == 'https:' || url.hostname == 'localhost' || _string.endsWith(url.hostname, '.localhost');
}

/**
 * Asserts that a given url is HTTPS or protocol relative. It's a user-level
 * assert.
 *
 * Provides an exception for localhost.
 *
 * @param {?string|undefined} urlString
 * @param {!Element|string} elementContext Element where the url was found.
 * @param {string=} sourceName Used for error messages.
 * @return {string}
 */

function assertHttpsUrl(urlString, elementContext) {
  var sourceName = arguments.length <= 2 || arguments[2] === undefined ? 'source' : arguments[2];

  _log.user().assert(urlString != null, '%s %s must be available', elementContext, sourceName);
  // (erwinm, #4560): type cast necessary until #4560 is fixed.
  var theUrlString = /** @type {string} */urlString;
  _log.user().assert(isSecureUrl(theUrlString) || /^(\/\/)/.test(theUrlString), '%s %s must start with ' + '"https://" or "//" or be relative and served from ' + 'either https or from localhost. Invalid value: %s', elementContext, sourceName, theUrlString);
  return theUrlString;
}

/**
 * Asserts that a given url is an absolute HTTP or HTTPS URL.
 * @param {string} urlString
 * @return {string}
 */

function assertAbsoluteHttpOrHttpsUrl(urlString) {
  _log.user().assert(/^https?\:/i.test(urlString), 'URL must start with "http://" or "https://". Invalid value: %s', urlString);
  return parseUrl(urlString).href;
}

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 * @param {string} queryString
 * @return {!Object<string>}
 */

function parseQueryString(queryString) {
  var params = Object.create(null);
  if (!queryString) {
    return params;
  }
  if (queryString.indexOf('?') == 0 || queryString.indexOf('#') == 0) {
    queryString = queryString.substr(1);
  }
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eqIndex = pair.indexOf('=');
    var _name = undefined;
    var value = undefined;
    if (eqIndex != -1) {
      _name = decodeURIComponent(pair.substring(0, eqIndex)).trim();
      value = decodeURIComponent(pair.substring(eqIndex + 1)).trim();
    } else {
      _name = decodeURIComponent(pair).trim();
      value = '';
    }
    if (_name) {
      params[_name] = value;
    }
  }
  return params;
}

/**
 * Returns the URL without fragment. If URL doesn't contain fragment, the same
 * string is returned.
 * @param {string} url
 * @return {string}
 */

function removeFragment(url) {
  var index = url.indexOf('#');
  if (index == -1) {
    return url;
  }
  return url.substring(0, index);
}

/**
 * Returns whether the URL has the origin of a proxy.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */

function isProxyOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return _config.urls.cdnProxyRegex.test(url.origin);
}

/**
 * Returns whether the URL origin is localhost.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */

function isLocalhostOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return _config.urls.localhostRegex.test(url.origin);
}

/**
 * Removes parameters that start with amp js parameter pattern and returns the new
 * search string.
 * @param {string} urlSearch
 * @return {string}
 */
function removeAmpJsParams(urlSearch) {
  if (!urlSearch || urlSearch == '?') {
    return '';
  }
  var search = urlSearch.replace(AMP_JS_PARAMS_REGEX, '').replace(/^[?&]/, ''); // Removes first ? or &.
  return search ? '?' + search : '';
}

/**
 * Returns the source URL of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string}
 */

function getSourceUrl(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }

  // Not a proxy URL - return the URL itself.
  if (!isProxyOrigin(url)) {
    return url.href;
  }

  // A proxy URL.
  // Example path that is being matched here.
  // https://cdn.ampproject.org/c/s/www.origin.com/foo/
  // The /s/ is optional and signals a secure origin.
  var path = url.pathname.split('/');
  var prefix = path[1];
  _log.user().assert(prefix == 'c' || prefix == 'v', 'Unknown path prefix in url %s', url.href);
  var domainOrHttpsSignal = path[2];
  var origin = domainOrHttpsSignal == 's' ? 'https://' + decodeURIComponent(path[3]) : 'http://' + decodeURIComponent(domainOrHttpsSignal);
  // Sanity test that what we found looks like a domain.
  _log.user().assert(origin.indexOf('.') > 0, 'Expected a . in origin %s', origin);
  path.splice(1, domainOrHttpsSignal == 's' ? 3 : 2);
  return origin + path.join('/') + removeAmpJsParams(url.search) + (url.hash || '');
}

/**
 * Returns the source origin of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string} The source origin of the URL.
 */

function getSourceOrigin(url) {
  return parseUrl(getSourceUrl(url)).origin;
}

/**
 * Returns absolute URL resolved based on the relative URL and the base.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 */

function resolveRelativeUrl(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrl(baseUrl);
  }
  if (typeof URL == 'function') {
    return new URL(relativeUrlString, baseUrl.href).toString();
  }
  return resolveRelativeUrlFallback_(relativeUrlString, baseUrl);
}

/**
 * Fallback for URL resolver when URL class is not available.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 * @private Visible for testing.
 */

function resolveRelativeUrlFallback_(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrl(baseUrl);
  }
  relativeUrlString = relativeUrlString.replace(/\\/g, '/');
  var relativeUrl = parseUrl(relativeUrlString);

  // Absolute URL.
  if (relativeUrlString.toLowerCase().indexOf(relativeUrl.protocol) == 0) {
    return relativeUrl.href;
  }

  // Protocol-relative URL.
  if (relativeUrlString.indexOf('//') == 0) {
    return baseUrl.protocol + relativeUrlString;
  }

  // Absolute path.
  if (relativeUrlString.indexOf('/') == 0) {
    return baseUrl.origin + relativeUrlString;
  }

  // Relative path.
  var basePath = baseUrl.pathname.split('/');
  return baseUrl.origin + (basePath.length > 1 ? basePath.slice(0, basePath.length - 1).join('/') : '') + '/' + relativeUrlString;
}

/**
 * Add "__amp_source_origin" query parameter to the URL.
 * @param {!Window} win
 * @param {string} url
 * @return {string}
 */

function getCorsUrl(win, url) {
  checkCorsUrl(url);
  var sourceOrigin = getSourceOrigin(win.location.href);
  return addParamToUrl(url, SOURCE_ORIGIN_PARAM, sourceOrigin);
}

/**
 * Checks if the url have __amp_source_origin and throws if it does.
 * @param {string} url
 */

function checkCorsUrl(url) {
  var parsedUrl = parseUrl(url);
  var query = parseQueryString(parsedUrl.search);
  _log.user().assert(!(SOURCE_ORIGIN_PARAM in query), 'Source origin is not allowed in %s', url);
}

},{"./config":5,"./log":11,"./mode":13,"./string":20,"./types":22}],24:[function(require,module,exports){
exports.__esModule = true;
exports.vsyncFor = vsyncFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/vsync-impl.Vsync}
 */

function vsyncFor(window) {
  return (/** @type {!./service/vsync-impl.Vsync} */_service.getExistingServiceForWindow(window, 'vsync')
  );
}

;

},{"./service":19}],25:[function(require,module,exports){
exports.__esModule = true;
exports.xhrFor = xhrFor;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/xhr-impl.Xhr}
 */

function xhrFor(window) {
  return (/** @type {!./service/xhr-impl.Xhr} */_service.getExistingServiceForWindow(window, 'xhr')
  );
}

;

},{"./service":19}],26:[function(require,module,exports){
exports.__esModule = true;
exports.cssEscape = cssEscape;
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */

/**
 * https://drafts.csswg.org/cssom/#serialize-an-identifier
 * @param {string} value
 * @return {string}
 */

function cssEscape(value) {
	if (arguments.length == 0) {
		throw new TypeError('`CSS.escape` requires an argument.');
	}
	var string = String(value);
	var length = string.length;
	var index = -1;
	var codeUnit;
	var result = '';
	var firstCodeUnit = string.charCodeAt(0);
	while (++index < length) {
		codeUnit = string.charCodeAt(index);
		// Note: there’s no need to special-case astral symbols, surrogate
		// pairs, or lone surrogates.

		// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
		// (U+FFFD).
		if (codeUnit == 0x0000) {
			result += '\uFFFD';
			continue;
		}

		if (
		// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
		// U+007F, […]
		codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F ||
		// If the character is the first character and is in the range [0-9]
		// (U+0030 to U+0039), […]
		index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
		// If the character is the second character and is in the range [0-9]
		// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
		index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D) {
			// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
			result += '\\' + codeUnit.toString(16) + ' ';
			continue;
		}

		if (
		// If the character is the first character and is a `-` (U+002D), and
		// there is no second character, […]
		index == 0 && length == 1 && codeUnit == 0x002D) {
			result += '\\' + string.charAt(index);
			continue;
		}

		// If the character is not handled by one of the above rules and is
		// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
		// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
		// U+005A), or [a-z] (U+0061 to U+007A), […]
		if (codeUnit >= 0x0080 || codeUnit == 0x002D || codeUnit == 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
			// the character itself
			result += string.charAt(index);
			continue;
		}

		// Otherwise, the escaped character.
		// https://drafts.csswg.org/cssom/#escape-a-character
		result += '\\' + string.charAt(index);
	}
	return result;
}

},{}]},{},[2])


})});
//# sourceMappingURL=amp-viz-vega-0.1.max.js.map