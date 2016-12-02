(self.AMP = self.AMP || []).push({n:"amp-ad", f:(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig = require('../extensions/amp-ad-network-adsense-impl/0.1/adsense-a4a-config');

var _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig = require('../extensions/amp-ad-network-doubleclick-impl/0.1/doubleclick-a4a-config');

var _extensionsAmpAdNetworkFakeImpl01FakeA4aConfig = require('../extensions/amp-ad-network-fake-impl/0.1/fake-a4a-config');

var _srcMode = require('../src/mode');

var _srcTypes = require('../src/types');

/**
 * Registry for A4A (AMP Ads for AMPHTML pages) "is supported" predicates.
 * If an ad network, {@code ${NETWORK}}, is registered in this object, then the
 * {@code <amp-ad type="${NETWORK}">} implementation will look up its predicate
 * here. If there is a predicate and it and returns {@code true}, then
 * {@code amp-ad} will attempt to render the ad via the A4A pathway (fetch
 * ad creative via early XHR CORS request; verify that it is validated AMP;
 * and then render directly in the host page by splicing into the host DOM).
 * Otherwise, it will attempt to render the ad via the existing "3p iframe"
 * pathway (delay load into a cross-domain iframe).
 *
 * @type {!Object<!string, !function(!Window, !Element): boolean>}
 */
var a4aRegistry = _srcTypes.map({
  'adsense': _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig.adsenseIsA4AEnabled,
  'doubleclick': _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig.doubleclickIsA4AEnabled
});

exports.a4aRegistry = a4aRegistry;
// Note: the 'fake' ad network implementation is only for local testing.
// Normally, ad networks should add their *IsA4AEnabled callback directly
// to the a4aRegistry, above.  Ad network implementations should NOT use
// getMode() in this file.  If they need to check getMode() state, they
// should do so inside their *IsA4AEnabled callback.
// TODO: Add new ad network implementation "is enabled" functions here.  Note:
// if you add a function here that requires a new "import", above, you'll
// probably also need to add a whitelist exception to
// build-system/dep-check-config.js in the "filesMatching: 'ads/**/*.js' rule.
if (_srcMode.getMode().localDev || _srcMode.getMode().test) {
  a4aRegistry['fake'] = _extensionsAmpAdNetworkFakeImpl01FakeA4aConfig.fakeIsA4AEnabled;
}

/**
 * An object mapping signing server names to their corresponding URLs.
 * @type {!Object<string, string>}
 */
var signingServerURLs = {
  'google': 'https://cdn.ampproject.org/amp-ad-verifying-keyset.json',
  'google-dev': 'https://cdn.ampproject.org/amp-ad-verifying-keyset-dev.json'
};
exports.signingServerURLs = signingServerURLs;

},{"../extensions/amp-ad-network-adsense-impl/0.1/adsense-a4a-config":13,"../extensions/amp-ad-network-doubleclick-impl/0.1/doubleclick-a4a-config":14,"../extensions/amp-ad-network-fake-impl/0.1/fake-a4a-config":15,"../src/mode":53,"../src/types":73}],2:[function(require,module,exports){
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
 * The config of each ad network.
 * Please keep the list alphabetic order.
 *
 * yourNetworkName: {  // This is the "type" attribute of <amp-ad>
 *
 *   // List of URLs for prefetch
 *   prefetch: string|array
 *
 *   // List of hosts for preconnect
 *   preconnect: string|array
 *
 *   // The externalCidScope used to provide CIDs to ads
 *   clientIdScope: string
 *
 *   // Whether render-start API has been implemented
 *   // We highly recommend all networks to implement the API,
 *   // see details in the README.md
 *   renderStartImplemented: boolean
 * }
 */
var adConfig = {
  _ping_: {
    renderStartImplemented: true
  },

  a9: {
    prefetch: 'https://c.amazon-adsystem.com/aax2/assoc.js'
  },

  accesstrade: {
    prefetch: 'https://h.accesstrade.net/js/amp/amp.js'
  },

  adblade: {
    prefetch: 'https://web.adblade.com/js/ads/async/show.js',
    preconnect: ['https://staticd.cdn.adblade.com', 'https://static.adblade.com'],
    renderStartImplemented: true
  },

  adbutler: {
    prefetch: 'https://servedbyadbutler.com/app.js'
  },

  adform: {},

  adgeneration: {
    prefetch: 'https://i.socdm.com/sdk/js/adg-script-loader.js'
  },

  adition: {},

  adman: {},

  adreactor: {},

  adsense: {
    prefetch: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    preconnect: 'https://googleads.g.doubleclick.net',
    clientIdScope: 'AMP_ECID_GOOGLE'
  },

  adsnative: {
    prefetch: 'https://static.adsnative.com/static/js/render.v1.js',
    preconnect: 'https://api.adsnative.com'
  },

  adspirit: {},

  adstir: {
    prefetch: 'https://js.ad-stir.com/js/adstir_async.js',
    preconnect: 'https://ad.ad-stir.com'
  },

  adtech: {
    prefetch: 'https://s.aolcdn.com/os/ads/adsWrapper3.js',
    preconnect: ['https://mads.at.atwola.com', 'https://aka-cdn.adtechus.com']
  },

  aduptech: {
    prefetch: 'https://s.d.adup-tech.com/jsapi'
  },

  adverline: {
    prefetch: 'https://ads.adverline.com/richmedias/amp.js',
    preconnect: ['https://adnext.fr'],
    renderStartImplemented: true
  },

  advertserve: {
    renderStartImplemented: true
  },

  affiliateb: {
    prefetch: 'https://track.affiliate-b.com/amp/a.js',
    renderStartImplemented: true
  },

  amoad: {
    prefetch: ['https://j.amoad.com/js/a.js', 'https://j.amoad.com/js/n.js'],
    preconnect: ['https://d.amoad.com', 'https://i.amoad.com', 'https://m.amoad.com', 'https://v.amoad.com']
  },

  appnexus: {
    prefetch: 'https://acdn.adnxs.com/ast/ast.js',
    preconnect: 'https://ib.adnxs.com'
  },

  atomx: {
    prefetch: 'https://s.ato.mx/p.js'
  },

  caprofitx: {
    prefetch: ['https://cdn.caprofitx.com/pfx.min.js', 'https://cdn.caprofitx.com/tags/amp/profitx_amp.js'],
    preconnect: 'https://ad.caprofitx.adtdp.com'
  },

  chargeads: {},

  colombia: {
    prefetch: 'https://static.clmbtech.com/ad/commons/js/colombia-amp.js'
  },

  contentad: {},

  criteo: {
    prefetch: 'https://static.criteo.net/js/ld/publishertag.js',
    preconnect: 'https://cas.criteo.com'
  },

  dotandads: {
    prefetch: 'https://amp.ad.dotandad.com/dotandadsAmp.js',
    preconnect: 'https://bal.ad.dotandad.com'
  },

  doubleclick: {
    prefetch: ['https://www.googletagservices.com/tag/js/gpt.js', 'https://securepubads.g.doubleclick.net/static/glade.js'],
    preconnect: ['https://partner.googleadservices.com', 'https://tpc.googlesyndication.com'],
    clientIdScope: 'AMP_ECID_GOOGLE',
    renderStartImplemented: true
  },

  eplanning: {
    prefetch: 'https://us.img.e-planning.net/layers/epl-amp.js'
  },

  ezoic: {
    prefetch: ['https://www.googletagservices.com/tag/js/gpt.js', 'https://g.ezoic.net/ezoic/ampad.js']
  },

  f1e: {
    prefetch: 'https://img.ak.impact-ad.jp/util/f1e_amp.min.js'
  },

  fake: {},

  felmat: {
    prefetch: 'https://t.felmat.net/js/fmamp.js',
    renderStartImplemented: true
  },

  flite: {},

  genieessp: {
    prefetch: 'https://js.gsspcln.jp/l/amp.js'
  },

  gmossp: {
    prefetch: 'https://cdn.gmossp-sp.jp/ads/amp.js'
  },

  holder: {
    prefetch: 'https://i.holder.com.ua/js2/holder/ajax/ampv1.js',
    preconnect: 'https://h.holder.com.ua',
    renderStartImplemented: true
  },

  ibillboard: {},

  imobile: {
    prefetch: 'https://spamp.i-mobile.co.jp/script/amp.js',
    preconnect: 'https://spad.i-mobile.co.jp'
  },

  improvedigital: {},

  industrybrains: {
    prefetch: 'https://web.industrybrains.com/js/ads/async/show.js',
    preconnect: ['https://staticd.cdn.industrybrains.com', 'https://static.industrybrains.com'],
    renderStartImplemented: true
  },

  inmobi: {
    prefetch: 'https://cf.cdn.inmobi.com/ad/inmobi.secure.js',
    renderStartImplemented: true
  },

  ix: {
    prefetch: 'https://js-sec.indexww.com/indexJTag.js',
    preconnect: 'https://as-sec.casalemedia.com'
  },

  kargo: {},

  kixer: {
    prefetch: 'https://cdn.kixer.com/ad/load.js',
    renderStartImplemented: true
  },

  ligatus: {},

  loka: {
    prefetch: 'https://loka-cdn.akamaized.net/scene/amp.js',
    preconnect: ['https://scene-front.lokaplatform.com', 'https://loka-materials.akamaized.net'],
    renderStartImplemented: true
  },

  mads: {
    prefetch: 'https://eu2.madsone.com/js/tags.js'
  },

  'mantis-display': {
    prefetch: 'https://assets.mantisadnetwork.com/mantodea.min.js',
    preconnect: ['https://mantodea.mantisadnetwork.com', 'https://res.cloudinary.com', 'https://resize.mantisadnetwork.com']
  },

  'mantis-recommend': {
    prefetch: 'https://assets.mantisadnetwork.com/recommend.min.js',
    preconnect: ['https://mantodea.mantisadnetwork.com', 'https://resize.mantisadnetwork.com']
  },

  mediaimpact: {
    prefetch: 'https://ec-ns.sascdn.com/diff/251/pages/amp_default.js',
    preconnect: ['https://ww251.smartadserver.com', 'https://static.sascdn.com/'],
    renderStartImplemented: true
  },

  medianet: {
    preconnect: 'https://contextual.media.net',
    renderStartImplemented: true
  },

  mediavine: {
    prefetch: 'https://www.googletagservices.com/tag/js/gpt.js',
    preconnect: ['https://partner.googleadservices.com', 'https://securepubads.g.doubleclick.net', 'https://tpc.googlesyndication.com'],
    renderStartImplemented: true
  },

  meg: {
    renderStartImplemented: true
  },

  microad: {
    prefetch: 'https://j.microad.net/js/camp.js',
    preconnect: ['https://s-rtb.send.microad.jp', 'https://s-rtb.send.microadinc.com', 'https://cache.send.microad.jp', 'https://cache.send.microadinc.com', 'https://deb.send.microad.jp']
  },

  mixpo: {
    prefetch: 'https://cdn.mixpo.com/js/loader.js',
    preconnect: ['https://player1.mixpo.com', 'https://player2.mixpo.com']
  },

  nativo: {
    prefetch: 'https://s.ntv.io/serve/load.js'
  },

  nend: {
    prefetch: 'https://js1.nend.net/js/amp.js',
    preconnect: ['https://output.nend.net', 'https://img1.nend.net']
  },

  nokta: {
    prefetch: 'https://static.virgul.com/theme/mockups/noktaamp/ampjs.js',
    renderStartImplemented: true
  },

  openadstream: {},

  openx: {
    prefetch: 'https://www.googletagservices.com/tag/js/gpt.js',
    preconnect: ['https://partner.googleadservices.com', 'https://securepubads.g.doubleclick.net', 'https://tpc.googlesyndication.com']
  },

  plista: {},

  pubmatic: {
    prefetch: 'https://ads.pubmatic.com/AdServer/js/amp.js'
  },

  pubmine: {
    prefetch: ['https://s.pubmine.com/head.js', 'https://s.pubmine.com/showad.js'],
    preconnect: 'https://delivery.g.switchadhub.com',
    renderStartImplemented: true
  },

  pulsepoint: {
    prefetch: 'https://ads.contextweb.com/TagPublish/getjs.static.js',
    preconnect: 'https://tag.contextweb.com'
  },

  purch: {
    prefetch: 'https://ramp.purch.com/serve/creative_amp.js',
    renderStartImplemented: true
  },

  revcontent: {
    prefetch: 'https://labs-cdn.revcontent.com/build/amphtml/revcontent.amp.min.js',
    preconnect: ['https://trends.revcontent.com', 'https://cdn.revcontent.com', 'https://img.revcontent.com']
  },

  rubicon: {},

  sharethrough: {
    renderStartImplemented: true
  },

  smartadserver: {
    prefetch: 'https://ec-ns.sascdn.com/diff/js/amp.v0.js',
    preconnect: 'https://static.sascdn.com',
    renderStartImplemented: true
  },

  smartclip: {
    prefetch: 'https://cdn.smartclip.net/amp/amp.v0.js',
    preconnect: 'https://des.smartclip.net',
    renderStartImplemented: true
  },

  sortable: {
    prefetch: 'https://www.googletagservices.com/tag/js/gpt.js',
    preconnect: ['https://tags-cdn.deployads.com', 'https://partner.googleadservices.com', 'https://securepubads.g.doubleclick.net', 'https://tpc.googlesyndication.com']
  },

  sovrn: {
    prefetch: 'https://ap.lijit.com/www/sovrn_amp/sovrn_ads.js'
  },

  taboola: {},

  teads: {
    prefetch: 'https://cdn.teads.tv/media/format/v3/teads-format.min.js',
    preconnect: ['https://cdn2.teads.tv', 'https://a.teads.tv', 'https://t.teads.tv']
  },

  triplelift: {},

  webediads: {
    prefetch: 'https://eu1.wbdds.com/amp.min.js',
    preconnect: ['https://goutee.top', 'https://mediaathay.org.uk'],
    renderStartImplemented: true
  },

  'weborama-display': {
    prefetch: ['https://cstatic.weborama.fr/js/advertiserv2/adperf_launch_1.0.0_scrambled.js', 'https://cstatic.weborama.fr/js/advertiserv2/adperf_core_1.0.0_scrambled.js']
  },

  widespace: {},

  xlift: {
    prefetch: 'https://cdn.x-lift.jp/resources/common/xlift_amp.js',
    renderStartImplemented: true
  },

  yahoo: {
    prefetch: 'https://s.yimg.com/os/ampad/display.js',
    preconnect: 'https://us.adserver.yahoo.com'
  },

  yahoojp: {
    prefetch: ['https://s.yimg.jp/images/listing/tool/yads/ydn/amp/amp.js', 'https://yads.c.yimg.jp/js/yads.js'],
    preconnect: 'https://yads.yahoo.co.jp'
  },

  yieldbot: {
    prefetch: ['https://cdn.yldbt.com/js/yieldbot.intent.amp.js', 'https://msg.yldbt.com/js/ybmsg.html'],
    preconnect: 'https://i.yldbt.com'
  },

  yieldmo: {
    prefetch: 'https://static.yieldmo.com/ym.amp1.js',
    preconnect: ['https://s.yieldmo.com', 'https://ads.yieldmo.com'],
    renderStartImplemented: true
  },

  yieldone: {
    prefetch: 'https://img.ak.impact-ad.jp/ic/pone/commonjs/yone-amp.js'
  },

  zedo: {
    prefetch: 'https://ss3.zedo.com/gecko/tag/Gecko.amp.min.js',
    renderStartImplemented: true
  },

  zergnet: {},

  zucks: {
    preconnect: ['https://j.zucks.net.zimg.jp', 'https://sh.zucks.net', 'https://k.zucks.net', 'https://static.zucks.net.zimg.jp']
  }
};
exports.adConfig = adConfig;

},{}],3:[function(require,module,exports){
exports.__esModule = true;
exports.installAlpClickHandler = installAlpClickHandler;
exports.handleClick = handleClick;
exports.warmupStatic = warmupStatic;
exports.warmupDynamic = warmupDynamic;
exports.getA2AAncestor = getA2AAncestor;
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

var _srcUrl = require('../../src/url');

var _srcDom = require('../../src/dom');

var _srcLog = require('../../src/log');

var _srcConfig = require('../../src/config');

var _srcString = require('../../src/string');

/**
 * Install a click listener that transforms navigation to the AMP cache
 * to a form that directly navigates to the doc and transmits the original
 * URL as a click logging info passed via a fragment param.
 * Expects to find a URL starting with "https://cdn.ampproject.org/c/"
 * to be available via a param call "adurl" (or defined by the
 * `data-url-param-name` attribute on the a tag.
 * @param {!Window} win
 */

function installAlpClickHandler(win) {
  win.document.documentElement.addEventListener('click', handleClick);
  // Start loading destination doc when finger is down.
  // Needs experiment whether this is a good idea.
  win.document.documentElement.addEventListener('touchstart', warmupDynamic);
}

/**
 * Filter click event and then transform URL for direct AMP navigation
 * with impression logging.
 * @param {!Event} e
 * @param {function(string)=} opt_viewerNavigate
 * @visibleForTesting
 */

function handleClick(e, opt_viewerNavigate) {
  if (e.defaultPrevented) {
    return;
  }
  // Only handle simple clicks with the left mouse button/touch and without
  // modifier keys.
  if (e.buttons != 0 && e.buttons != 1) {
    return;
  }
  if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
    return;
  }

  var link = getLinkInfo(e);
  if (!link || !link.eventualUrl) {
    return;
  }
  if (e.isTrusted === false) {
    return;
  }

  // Tag the original href with &amp=1 and make it a fragment param with
  // name click.
  var fragment = 'click=' + encodeURIComponent(_srcUrl.addParamToUrl(link.a.href, 'amp', '1', /* opt_addToFront */true));
  var destination = link.eventualUrl;
  if (link.eventualUrl.indexOf('#') == -1) {
    destination += '#' + fragment;
  } else {
    destination += '&' + fragment;
  }
  var win = link.a.ownerDocument.defaultView;
  var ancestors = win.location.ancestorOrigins;
  if (ancestors && ancestors[ancestors.length - 1] == 'http://localhost:8000') {
    destination = destination.replace(_srcUrl.parseUrl(link.eventualUrl).host + '/c/', 'http://localhost:8000/max/');
  }
  e.preventDefault();
  if (opt_viewerNavigate) {
    // TODO: viewer navigate only support navigating top level window to
    // destination. should we try to open a new window here with target=_blank
    // here instead of using viewer navigation.
    opt_viewerNavigate(destination);
  } else {
    navigateTo(win, link.a, destination);
  }
}

/**
 * For an event, see if there is an anchor tag in the target
 * ancestor chain and if yes, check whether we can figure
 * out an AMP target URL.
 * @param {!Event} e
 * @return {{
 *   eventualUrl: (string|undefined),
 *   a: !Element
 * }|undefined} A URL on the AMP Cache.
 */
function getLinkInfo(e) {
  var a = _srcDom.closest(_srcLog.dev().assertElement(e.target), function (element) {
    return element.tagName == 'A' && element.href;
  });
  if (!a) {
    return;
  }
  return {
    eventualUrl: getEventualUrl(a),
    a: a
  };
}

/**
 * Given an anchor tag, figure out whether this goes to an AMP destination
 * via a redirect.
 * @param {!Element} a An anchor tag.
 * @return {string|undefined} A URL on the AMP Cache.
 */
function getEventualUrl(a) {
  var urlParamName = a.getAttribute('data-url-param-name') || 'adurl';
  var eventualUrl = _srcUrl.parseQueryString(a.search)[urlParamName];
  if (!eventualUrl) {
    return;
  }
  if (!_srcUrl.isProxyOrigin(eventualUrl) || !_srcString.startsWith(_srcUrl.parseUrl(eventualUrl).pathname, '/c/')) {
    return;
  }
  return eventualUrl;
}

/**
 * Navigate to the given URL. Infers the target from the given anchor
 * tag.
 * @param {!Window} win
 * @param {!Element} a Anchor element
 * @param {string} url
 */
function navigateTo(win, a, url) {
  var target = (a.target || '_top').toLowerCase();
  var a2aAncestor = getA2AAncestor(win);
  if (a2aAncestor) {
    a2aAncestor.win. /*OK*/postMessage('a2a;' + JSON.stringify({
      url: url
    }), a2aAncestor.origin);
    return;
  }
  _srcDom.openWindowDialog(win, url, target);
}

/**
 * Establishes a connection to the AMP Cache and makes sure
 * the AMP JS is cached.
 * @param {!Window} win
 */

function warmupStatic(win) {
  // Preconnect using an image, because that works on all browsers.
  // The image has a 1 minute cache time to avoid duplicate
  // preconnects.
  new win.Image().src = _srcConfig.urls.cdn + '/preconnect.gif';
  // Preload the primary AMP JS that is render blocking.
  var linkRel = /*OK*/document.createElement('link');
  linkRel.rel = 'preload';
  linkRel.setAttribute('as', 'script');
  linkRel.href = _srcConfig.urls.cdn + '/v0.js';
  getHeadOrFallback(win.document).appendChild(linkRel);
}

/**
 * For events (such as touch events) that point to an eligible URL, preload
 * that URL.
 * @param {!Event} e
 * @visibleForTesting
 */

function warmupDynamic(e) {
  var link = getLinkInfo(e);
  if (!link || !link.eventualUrl) {
    return;
  }
  var linkRel = /*OK*/document.createElement('link');
  linkRel.rel = 'preload';
  linkRel.setAttribute('as', 'document');
  linkRel.href = link.eventualUrl;
  getHeadOrFallback(e.target.ownerDocument).appendChild(linkRel);
}

/**
 * Return <head> if present or just the document element.
 * @param {!Document} doc
 * @return {!Element}
 */
function getHeadOrFallback(doc) {
  return doc.head || doc.documentElement;
}

/**
 * Returns info about an ancestor that can perform A2A navigations
 * or null if none is present.
 * @param {!Window} win
 * @return {?{
 *   win: !Window,
 *   origin: string,
 * }}
 */

function getA2AAncestor(win) {
  if (!win.location.ancestorOrigins) {
    return null;
  }
  var origins = win.location.ancestorOrigins;
  // We expect top, amp cache, ad (can be nested).
  if (origins.length < 2) {
    return null;
  }
  var top = origins[origins.length - 1];
  // Not a security property. We just check whether the
  // viewer might support A2A. More domains can be added to whitelist
  // as needed.
  if (top.indexOf('.google.') == -1) {
    return null;
  }
  var amp = origins[origins.length - 2];
  if (!_srcUrl.isProxyOrigin(amp) && !_srcUrl.isLocalhostOrigin(amp)) {
    return null;
  }
  return {
    win: getNthParentWindow(win, origins.length - 1),
    origin: amp
  };
}

/**
 * Returns the Nth parent of the given window.
 * @param {!Window} win
 * @param {number} distance frames above us.
 */
function getNthParentWindow(win, distance) {
  var parent = win;
  for (var i = 0; i < distance; i++) {
    parent = parent.parent;
  }
  return parent;
}

},{"../../src/config":31,"../../src/dom":37,"../../src/log":51,"../../src/string":68,"../../src/url":75}],4:[function(require,module,exports){
exports.__esModule = true;
exports.getLifecycleReporter = getLifecycleReporter;
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

var _trafficExperiments = require('./traffic-experiments');

var _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig = require('../../../extensions/amp-ad-network-adsense-impl/0.1/adsense-a4a-config');

var _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig = require('../../../extensions/amp-ad-network-doubleclick-impl/0.1/doubleclick-a4a-config');

// eslint-disable-line max-len

var _extensionsAmpA4a01AmpA4a = require('../../../extensions/amp-a4a/0.1/amp-a4a');

var _srcExperiments = require('../../../src/experiments');

var _srcLog = require('../../../src/log');

var _srcMode = require('../../../src/mode');

var _utils = require('./utils');

/**
 * This module provides a fairly crude form of performance monitoring (or
 * profiling) for A4A code.  It generates individual pings back to Google
 * servers at key points in the A4A lifecycle and at a few points in the 3p
 * amp-ad lifecycle, for baseline.
 *
 * This is intended to be a short-term solution, for a rough-and-ready form
 * of profiling.  In particular, it doesn't use high-resolution timers (when
 * they're available) and it doesn't queue pings for network efficiency.  A
 * better long-term solution is to integrate `src/performance.js` with
 * `amp-analytics`.  However, we need a short-term solution quickly.  This
 * module should go away once we have verified that A4A is performing as
 * desired.
 */

var PROFILING_RATE = {
  a4aProfilingRate: { on: 1 }
};

exports.PROFILING_RATE = PROFILING_RATE;
/**
 * Check whether the element is in an experiment branch that is eligible for
 * monitoring.
 *
 * @param {!AMP.BaseElement} ampElement
 * @param {!string} namespace
 * @returns {boolean}
 */
function isInReportableBranch(ampElement, namespace) {
  var eid = ampElement.element.getAttribute(_trafficExperiments.EXPERIMENT_ATTRIBUTE);
  if (namespace == 'a4a' && (eid == _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig.ADSENSE_A4A_EXTERNAL_EXPERIMENT_BRANCHES.experiment || eid == _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig.ADSENSE_A4A_INTERNAL_EXPERIMENT_BRANCHES.experiment || eid == _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig.DOUBLECLICK_A4A_EXTERNAL_EXPERIMENT_BRANCHES.experiment || eid == _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig.DOUBLECLICK_A4A_INTERNAL_EXPERIMENT_BRANCHES.experiment || _trafficExperiments.isInManualExperiment(ampElement.element))) {
    return true;
  } else if (namespace == 'amp' && (eid == _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig.ADSENSE_A4A_EXTERNAL_EXPERIMENT_BRANCHES.control || eid == _extensionsAmpAdNetworkAdsenseImpl01AdsenseA4aConfig.ADSENSE_A4A_INTERNAL_EXPERIMENT_BRANCHES.control || eid == _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig.DOUBLECLICK_A4A_EXTERNAL_EXPERIMENT_BRANCHES.control || eid == _extensionsAmpAdNetworkDoubleclickImpl01DoubleclickA4aConfig.DOUBLECLICK_A4A_INTERNAL_EXPERIMENT_BRANCHES.control)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {!AMP.BaseElement} ampElement The element on whose lifecycle this
 *    reporter will be reporting.
 * @param {string} namespace
 * @param {number|undefined} corr A unique identifier for the page in which the
 *    given element is embedded.
 * @param {number|string} slotId A unique numeric identifier in the page for
 *    the given element's slot.
 * @return {!GoogleAdLifecycleReporter|!BaseLifecycleReporter}
 */

function getLifecycleReporter(ampElement, namespace, corr, slotId) {
  // Carve-outs: We only want to enable profiling pingbacks when:
  //   - The ad is from one of the Google networks (AdSense or Doubleclick).
  //   - The ad slot is in the A4A-vs-3p amp-ad control branch (either via
  //     internal, client-side selection or via external, Google Search
  //     selection).
  //   - We haven't turned off profiling via the rate controls in
  //     build-system/global-config/{canary,prod}-config.json
  // If any of those fail, we use the `BaseLifecycleReporter`, which is a
  // a no-op (sends no pings).
  var type = ampElement.element.getAttribute('type');
  var win = ampElement.win;
  // In local dev mode, neither the canary nor prod config files is available,
  // so manually set the profiling rate, for testing/dev.
  if (_srcMode.getMode().localDev && (!win.AMP_CONFIG || !win.AMP_CONFIG['a4aProfilingRate'])) {
    win.AMP_CONFIG = win.AMP_CONFIG || {};
    win.AMP_CONFIG['a4aProfilingRate'] = 1.0;
  }
  _trafficExperiments.randomlySelectUnsetPageExperiments(win, PROFILING_RATE);
  if ((type == 'doubleclick' || type == 'adsense') && isInReportableBranch(ampElement, namespace) && _srcExperiments.isExperimentOn(win, 'a4aProfilingRate')) {
    var correlator = undefined;
    if (typeof corr === 'undefined') {
      correlator = _utils.getCorrelator(win);
    } else {
      correlator = corr;
    }
    return new GoogleAdLifecycleReporter(win, ampElement.element, namespace, correlator, Number(slotId));
  } else {
    return new BaseLifecycleReporter();
  }
}

/**
 * A NOOP base class for the LifecycleReporter
 */

var BaseLifecycleReporter = (function () {
  function BaseLifecycleReporter() {
    babelHelpers.classCallCheck(this, BaseLifecycleReporter);
  }

  /**
   * A beacon function that will be called at various stages of the lifecycle.
   *
   * To be overriden by network specific implementations.
   *
   * @param {string} unusedName A descriptive name for the beacon signal.
   */

  BaseLifecycleReporter.prototype.sendPing = function sendPing(unusedName) {};

  /**
   * A function to reset the lifecycle reporter. Will be called immediately
   * after firing the last beacon signal in unlayoutCallback.
   */

  BaseLifecycleReporter.prototype.reset = function reset() {};

  return BaseLifecycleReporter;
})();

exports.BaseLifecycleReporter = BaseLifecycleReporter;

var GoogleAdLifecycleReporter = (function (_BaseLifecycleReporter) {
  babelHelpers.inherits(GoogleAdLifecycleReporter, _BaseLifecycleReporter);

  /**
   * @param {!Window} win  Parent window object.
   * @param {!Element} element  Parent element object.
   * @param {string} namespace  Namespace for page-level info.  (E.g.,
   *   'amp' vs 'a4a'.)
   * @param {number} correlator
   * @param {number} slotId
   */

  function GoogleAdLifecycleReporter(win, element, namespace, correlator, slotId) {
    babelHelpers.classCallCheck(this, GoogleAdLifecycleReporter);

    _BaseLifecycleReporter.call(this);

    this.QQID_HEADER = 'X-QQID';
    this.win_ = win;
    this.element_ = element;
    this.namespace_ = namespace;
    this.slotId_ = slotId;
    this.correlator_ = correlator;
    this.slotName_ = this.namespace_ + '.' + this.slotId_;
    this.qqid_ = null;
    this.initTime_ = Date.now();
    this.pingbackAddress_ = 'https://csi.gstatic.com/csi';
  }

  /**
   * @param {?string} qqid
   */

  GoogleAdLifecycleReporter.prototype.setQqid = function setQqid(qqid) {
    this.qqid_ = qqid;
  };

  /**
   * Sets the address to which pings will be sent, overriding
   * `PINGBACK_ADDRESS`.  Intended for testing.
   * @param {string} address
   * @visibleForTesting
   */

  GoogleAdLifecycleReporter.prototype.setPingAddress = function setPingAddress(address) {
    this.pingbackAddress_ = address;
  };

  /**
   * @param {string} name  Stage name to ping out.  Should be one of the ones
   * from `LIFECYCLE_STAGES`.  If it's an unknown name, it will still be pinged,
   * but the stage ID will be set to `9999`.
   * @override
   */

  GoogleAdLifecycleReporter.prototype.sendPing = function sendPing(name) {
    this.emitPing_(this.buildPingAddress_(name));
  };

  /**
   * @param {string} name  Metric name to send.
   * @returns {string}  URL to send metrics to.
   * @private
   */

  GoogleAdLifecycleReporter.prototype.buildPingAddress_ = function buildPingAddress_(name) {
    var stageId = _extensionsAmpA4a01AmpA4a.LIFECYCLE_STAGES[name] || 9999;
    var delta = Date.now() - this.initTime_;
    // Note: QQid comes from a network header and eid could, potentially, be
    // injected by a publisher.  Treat both of them as unverified user content
    // and encode before inserting them into URI.
    var encodedQqid = this.qqid_ ? encodeURIComponent(this.qqid_) : false;
    var qqidParam = encodedQqid ? '&qqid.' + this.slotId_ + '=' + encodedQqid : '';
    var eid = this.element_.getAttribute(_trafficExperiments.EXPERIMENT_ATTRIBUTE);
    var eidParam = eid ? '&e=' + encodeURIComponent(eid) : '';
    var pingUrl = this.pingbackAddress_ + '?' + ('s=' + this.namespace_) + ('&v=2&it=' + name + '.' + delta + ',' + name + '_' + this.slotId_ + '.' + delta) + ('&rt=stage.' + stageId + ',slotId.' + this.slotId_) + ('&c=' + this.correlator_) + '&rls=1480694828544' + ('' + eidParam + qqidParam) + ('&it.' + this.slotName_ + '=' + name + '.' + delta) + ('&rt.' + this.slotName_ + '=stage.' + stageId) + ('&met.' + this.slotName_ + '=stage_' + stageId + '.' + delta);
    return pingUrl;
  };

  /**
   * Send ping by creating an img element and attaching to the DOM.
   * Separate function so that it can be stubbed out for testing.
   *
   * @param {string} url Address to ping.
   */

  GoogleAdLifecycleReporter.prototype.emitPing_ = function emitPing_(url) {
    var pingElement = this.element_.ownerDocument.createElement('img');
    pingElement.setAttribute('src', url);
    // Styling is copied directly from amp-pixel's CSS.  This is a kludgy way
    // to do this -- much better would be to invoke amp-pixel's styling directly
    // or to add an additional style selector for these ping pixels.
    // However, given that this is a short-term performance system, I'd rather
    // not tamper with AMP-wide CSS just to create styling for this
    // element.
    pingElement.setAttribute('style', 'position:fixed!important;top:0!important;width:1px!important;' + 'height:1px!important;overflow:hidden!important;visibility:hidden');
    pingElement.setAttribute('aria-hidden', 'true');
    this.element_.parentNode.insertBefore(pingElement, this.element_);
    _srcLog.dev().info('PING', url);
  };

  /**
   * Resets values which might cross-contaminate between queries.
   * @override
   */

  GoogleAdLifecycleReporter.prototype.reset = function reset() {
    this.setQqid(null);
  };

  return GoogleAdLifecycleReporter;
})(BaseLifecycleReporter);

exports.GoogleAdLifecycleReporter = GoogleAdLifecycleReporter;

},{"../../../extensions/amp-a4a/0.1/amp-a4a":11,"../../../extensions/amp-ad-network-adsense-impl/0.1/adsense-a4a-config":13,"../../../extensions/amp-ad-network-doubleclick-impl/0.1/doubleclick-a4a-config":14,"../../../src/experiments":41,"../../../src/log":51,"../../../src/mode":53,"./traffic-experiments":5,"./utils":7}],5:[function(require,module,exports){
exports.__esModule = true;
exports.googleAdsIsA4AEnabled = googleAdsIsA4AEnabled;
exports.randomlySelectUnsetPageExperiments = randomlySelectUnsetPageExperiments;
exports.getPageExperimentBranch = getPageExperimentBranch;
exports.forceExperimentBranch = forceExperimentBranch;
exports.parseExperimentIds = parseExperimentIds;
exports.isInExperiment = isInExperiment;
exports.isInManualExperiment = isInManualExperiment;
exports.validateExperimentIds = validateExperimentIds;
exports.mergeExperimentIds = mergeExperimentIds;
exports.addExperimentIdToElement = addExperimentIdToElement;
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
 * Machinery for doing "traffic-level" experiments.  That is, rather than
 * a single user choosing to opt-in to an experimental version of a module,
 * this framework allows you to do randomized, controlled experiments on all
 * AMP page loads to, for example, test relative performance or look for
 * impacts on click-throughs.
 */

var _utils = require('./utils');

var _srcExperiments = require('../../../src/experiments');

var _srcLog = require('../../../src/log');

var _srcMode = require('../../../src/mode');

var _srcViewer = require('../../../src/viewer');

var _srcUrl = require('../../../src/url');

/** @typedef {{control: string, experiment: string}} */
var ExperimentInfo = undefined;

exports.ExperimentInfo = ExperimentInfo;
/** @type {!string} @private */
var MANUAL_EXPERIMENT_ID = '117152632';

/**
 * Check whether Google Ads supports the A4A rendering pathway for a given ad
 * Element on a given Window.  The tests we use are:
 *
 * - The page must have originated in the `cdn.ampproject.org` CDN _or_ we must
 *   be running in local dev mode.
 * - We must be selected in to an A4A traffic experiment and be selected into
 *   the "experiment" branch.
 *
 * If we're selected into the overall traffic experiment, this function will
 * also attach an experiment or control branch ID to the `Element` as
 * a side-effect.
 *
 * @param {!Window} win  Host window for the ad.
 * @param {!Element} element Ad tag Element.
 * @param {string} experimentName Overall name for the experiment.
 * @param {!ExperimentInfo} externalBranches experiment and control branch IDs to use
 *   when experiment is triggered externally (e.g., via Google Search
 *   results page).
 * @param {!ExperimentInfo} internalBranches experiment and control branch IDs to
 *   use when experiment is triggered internally (i.e., via client-side
 *   selection).
 * @return {boolean}  Whether Google Ads should attempt to render via the A4A
 *   pathway.
 */

function googleAdsIsA4AEnabled(win, element, experimentName, externalBranches, internalBranches) {
  if (_utils.isGoogleAdsA4AValidEnvironment(win, element)) {
    maybeSetExperimentFromUrl(win, element, experimentName, externalBranches.control, externalBranches.experiment, MANUAL_EXPERIMENT_ID);
    var experimentInfo = {};
    experimentInfo[experimentName] = internalBranches;
    // Note: Because the same experimentName is being used everywhere here,
    // randomlySelectUnsetPageExperiments won't add new IDs if
    // maybeSetExperimentFromUrl has already set something for this
    // experimentName.
    randomlySelectUnsetPageExperiments(win, experimentInfo);
    if (_srcExperiments.isExperimentOn(win, experimentName)) {
      // Page is selected into the overall traffic experiment.
      var selectedBranch = getPageExperimentBranch(win, experimentName);
      addExperimentIdToElement(selectedBranch, element);
      // Detect whether page is on the "experiment" (i.e., use A4A rendering
      // pathway) branch of the overall traffic experiment or it's on the
      // "control" (i.e., use traditional, 3p iframe rendering pathway).
      return selectedBranch == internalBranches.experiment || selectedBranch == externalBranches.experiment || selectedBranch == MANUAL_EXPERIMENT_ID;
    }
  }
  // Serving location doesn't qualify for A4A treatment or page is not in the
  // traffic experiment.
  return false;
}

/**
 * Set experiment state from URL parameter, if present.  This looks for the
 * presence of a URL parameter of the form
 *   `exp=expt0:val0,expt1:val1,...,a4a:X,...,exptN:valN`
 * and interprets the X as one of the following:
 *   - `-1`: Manually-triggered experiment.  For testing only.  Sets
 *     `adtest=on` on the ad request, so that it will not bill or record
 *     user clicks as ad CTR.  Ad request will be accounted in a special
 *     'testing only' experiment statistic pool so that we can track usage
 *     of this feature.
 *   - `0`: Ad is explicitly opted out of the overall A4A-vs-3p iframe
 *     experiment.  Ad will serve into a 3p iframe, as traditional, but ad
 *     request and clicks will not be accounted in experiment statistics.
 *   - `1`: Ad is on the control branch of the overall A4A-vs-3p iframe
 *     experiment.  Ad will serve into a 3p iframe, and ad requests and
 *     clicks _will_ be accounted in experiment statistics.
 *   - `2`: Ad is on the experimental branch of the overall A4A-vs-3p iframe
 *     experiment.  Ad will render via the A4A path, including early ad
 *     request and (possibly) early rendering in shadow DOM or iframe.
 *
 * @param {!Window} win  Window.
 * @param {!Element} element Ad tag Element.
 * @param {!string} experimentName  Name of the overall experiment.
 * @param {!string} controlBranchId  Experiment ID string for control branch of
 *   the overall experiment.
 * @param {!string} treatmentBranchId  Experiment ID string for the 'treatment'
 *   (i.e., a4a) branch of the overall experiment.
 * @param {!string} manualId  ID of the manual experiment.
 */
function maybeSetExperimentFromUrl(win, element, experimentName, controlBranchId, treatmentBranchId, manualId) {
  var expParam = _srcViewer.viewerForDoc(element).getParam('exp') || _srcUrl.parseQueryString(win.location.search)['exp'];
  if (!expParam) {
    return;
  }
  var match = /(^|,)(a4a:[^,]*)/.exec(expParam);
  var a4aParam = match && match[2];
  if (!a4aParam) {
    return;
  }
  // In the future, we may want to specify multiple experiments in the a4a
  // arg.  For the moment, however, assume that it's just a single flag.
  var arg = a4aParam.split(':', 2)[1];
  var argMapping = {
    '-1': manualId,
    '0': null,
    '1': controlBranchId,
    '2': treatmentBranchId
  };
  if (argMapping.hasOwnProperty(arg)) {
    forceExperimentBranch(win, experimentName, argMapping[arg]);
  } else {
    _srcLog.dev().warn('A4A-CONFIG', 'Unknown a4a URL parameter: ', a4aParam, ' expected one of -1 (manual), 0 (not in experiment), 1 (control ' + 'branch), or 2 (a4a experiment branch)');
  }
}

// TODO(tdrl): New test case: Invoke randomlySelectUnsetPageExperiments twice for different
// experiment lists.

/**
 * In some browser implementations of Math.random(), sequential calls of
 * Math.random() are correlated and can cause a bias.  In particular,
 * if the previous random() call was < 0.001 (as it will be if we select
 * into an experiment), the next value could be less than 0.5 more than
 * 50.7% of the time.  This provides an implementation that roots down into
 * the crypto API, when available, to produce less biased samples.
 *
 * @return {number} Pseudo-random floating-point value on the range [0, 1).
 */
function slowButAccuratePrng() {
  // TODO(tdrl): Implement.
  return Math.random();
}

/**
 * Container for alternate random number generator implementations.  This
 * allows us to set an "accurate" PRNG for branch selection, but to mock it
 * out easily in tests.
 *
 * @visibleForTesting
 * @const {!{accuratePrng: function():number}}
 */
var RANDOM_NUMBER_GENERATORS = {
  accuratePrng: slowButAccuratePrng
};

exports.RANDOM_NUMBER_GENERATORS = RANDOM_NUMBER_GENERATORS;
/**
 * Selects, uniformly at random, a single property name from all
 * properties set on a given object.
 *
 * @param {!Object} obj Object to select from.
 * @return {string} Single property name from obj.
 */
function selectRandomProperty(obj) {
  var allProperties = Object.keys(obj);
  var rn = RANDOM_NUMBER_GENERATORS.accuratePrng();
  return allProperties[Math.floor(rn * allProperties.length)];
}

/**
 * Selects which page-level experiments, if any, a given amp-ad will
 * participate in.  If a given experiment name is already set (including to
 * the null / no branches selected state), this won't alter its state.
 *
 * Check whether a given experiment is set using isExperimentOn(win,
 * experimentName) and, if it is on, look for which branch is selected in
 * win.pageExperimentBranches[experimentName].
 *
 * @param {!Window} win Window context on which to save experiment
 *     selection state.
 * @param {!Object<string,!ExperimentInfo>} experiments  Set of experiments to
 *     configure for this page load.
 * @visibleForTesting
 */

function randomlySelectUnsetPageExperiments(win, experiments) {
  win.pageExperimentBranches = win.pageExperimentBranches || {};
  if (_srcMode.getMode(win).localDev) {
    // In local dev mode, it can be difficult to configure AMP_CONFIG
    // externally.  Default it here if necessary.
    win.AMP_CONFIG = win.AMP_CONFIG || {};
  }
  for (var experimentName in experiments) {
    // Skip experimentName if it is not a key of experiments object or if it
    // has already been populated by some other property.
    if (!experiments.hasOwnProperty(experimentName) || win.pageExperimentBranches.hasOwnProperty(experimentName)) {
      continue;
    }
    if (_srcMode.getMode(win).localDev) {
      win.AMP_CONFIG[experimentName] = win.AMP_CONFIG[experimentName] || 0.0;
    }
    // If we're in the experiment, but we haven't already forced a specific
    // experiment branch (e.g., via a test setup), then randomize the branch
    // choice.
    if (!win.pageExperimentBranches[experimentName] && _srcExperiments.isExperimentOn(win, experimentName)) {
      var branches = experiments[experimentName];
      var branch = selectRandomProperty(branches);
      win.pageExperimentBranches[experimentName] = branches[branch];
    }
  }
}

/**
 * Returns the experiment branch enabled for the given experiment ID.
 * For example, 'control' or 'experiment'.
 *
 * @param {!Window} win Window context to check for experiment state.
 * @param {!string} experimentName Name of the experiment to check.
 * @return {string} Active experiment branch ID for experimentName (possibly
 *     null/false if experimentName has been tested but no branch was enabled).
 */

function getPageExperimentBranch(win, experimentName) {
  return win.pageExperimentBranches[experimentName];
}

/**
 * Force enable (or disable) a specific branch of a given experiment name.
 * Disables the experiment name altogether if branchId is falseish.
 *
 * @param {!Window} win Window context to check for experiment state.
 * @param {!string} experimentName Name of the experiment to check.
 * @param {?string} branchId ID of branch to force or null/false to disable
 *   altogether.
 * @visibleForTesting
 */

function forceExperimentBranch(win, experimentName, branchId) {
  win.pageExperimentBranches = win.pageExperimentBranches || {};
  _srcExperiments.toggleExperiment(win, experimentName, !!branchId, true);
  win.pageExperimentBranches[experimentName] = branchId;
}

/**
 * Sets of experiment IDs can be attached to Elements via attributes.  In
 * that case, we encode them as a string containing a comma-separated list
 * of experiment IDs.  This parses a comma-separated list from a string into
 * a list of ID strings.  If the input string is empty or null, this returns
 * the empty list.  This does no validity checking on the ID formats -- for
 * that, use validateExperimentIds.
 *
 * @param {?string} idString  String to parse.
 * @returns {!Array<!string>}  List of experiment IDs (possibly empty).
 * @see validateExperimentIds
 */

function parseExperimentIds(idString) {
  if (idString) {
    return idString.split(',');
  }
  return [];
}

/**
 * Checks whether the given element is a member of the given experiment branch.
 * I.e., whether the element's data-experiment-id attribute contains the id
 * value (possibly because the host page URL contains a 'exp=a4a:X' parameter
 * and #maybeSetExperimentFromUrl has added the appropriate EID).
 *
 * @param element  {!Element}  Element to check for membership in a specific
 *   experiment.
 * @param id {?string} Experiment ID to check for on `element`.
 * @return {boolean}
 */

function isInExperiment(element, id) {
  return parseExperimentIds(element.getAttribute(EXPERIMENT_ATTRIBUTE)).some(function (x) {
    return x === id;
  });
}

/**
 * Checks whether the given element is a member of the 'manually triggered
 * "experiment" branch'.  I.e., whether the element's data-experiment-id
 * attribute contains the MANUAL_EXPERIMENT_ID value (hopefully because the
 * user has manually specified 'exp=a4a:-1' in the host page URL and
 * #maybeSetExperimentFromUrl has added it).
 *
 * @param {!Element} element  Element to check for manual experiment membership.
 * @returns {boolean}
 */

function isInManualExperiment(element) {
  return isInExperiment(element, MANUAL_EXPERIMENT_ID);
}

/**
 * Checks that all string experiment IDs in a list are syntactically valid
 * (integer base 10).
 *
 * @param {!Array<!string>} idList  List of experiment IDs.  Can be empty.
 * @returns {boolean} Whether all list elements are valid experiment IDs.
 */

function validateExperimentIds(idList) {
  return idList.every(function (id) {
    return !isNaN(parseInt(id, 10));
  });
}

/**
 * Add a new experiment ID to a (possibly empty) existing set of experiment IDs.
 * The {@code currentIdString} may be {@code null} or {@code ''}, but if it is
 * populated, it must contain a comma-separated list of integer experiment IDs
 * (per {@code parseExperimentIds()}).  Returns the new set of IDs, encoded
 * as a comma-separated list.  Does not de-duplicate ID entries.
 *
 * @param {!string} newId  ID to merge in.  Must be a stringified integer
 *   (base 10).
 * @param {?string} currentIdString  If present, a string containing a
 *   comma-separated list of integer experiment IDs.
 * @returns {string}  New experiment list string, including newId iff it is
 *   a valid (integer) experiment ID.
 * @see parseExperimentIds, validateExperimentIds
 */

function mergeExperimentIds(newId, currentIdString) {
  if (newId && !isNaN(parseInt(newId, 10))) {
    return currentIdString ? currentIdString + ',' + newId : newId;
  }
  return currentIdString || '';
}

/**
 * Element attribute that stores experiment IDs.
 *
 * Note: This attribute should be used only for tracking experimental
 * implementations of AMP tags, e.g., by AMPHTML implementors.  It should not be
 * added by a publisher page.
 *
 * @const {!string}
 * @visibleForTesting
 */
var EXPERIMENT_ATTRIBUTE = 'data-experiment-id';

exports.EXPERIMENT_ATTRIBUTE = EXPERIMENT_ATTRIBUTE;
/**
 * Adds a single experimentID to an element iff it's a valid experiment ID.
 *
 * @param {!string} experimentId  ID to add to the element.
 * @param element  Element to add the experiment ID to.
 */

function addExperimentIdToElement(experimentId, element) {
  var currentEids = element.getAttribute(EXPERIMENT_ATTRIBUTE);
  if (currentEids && validateExperimentIds(parseExperimentIds(currentEids))) {
    element.setAttribute(EXPERIMENT_ATTRIBUTE, mergeExperimentIds(experimentId, currentEids));
  } else {
    element.setAttribute(EXPERIMENT_ATTRIBUTE, experimentId);
  }
}

},{"../../../src/experiments":41,"../../../src/log":51,"../../../src/mode":53,"../../../src/url":75,"../../../src/viewer":83,"./utils":7}],6:[function(require,module,exports){
exports.__esModule = true;
exports.buildUrl = buildUrl;
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

/** @typedef {{name: string, value: (string|number|null)}} */
var QueryParameterDef = undefined;

exports.QueryParameterDef = QueryParameterDef;
/**
 * Builds a URL from query parameters, truncating to a maximum length if
 * necessary.
 * @param {string} baseUrl scheme, domain, and path for the URL.
 * @param {!Array<!QueryParameterDef>} queryParams query parameters for the URL.
 * @param {number} maxLength length to truncate the URL to if necessary.
 * @param {?QueryParameterDef=} opt_truncationQueryParam query parameter to
 *     append to the URL iff any query parameters were truncated.
 * @return {string} the fully constructed URL.
 */

function buildUrl(baseUrl, queryParams, maxLength, opt_truncationQueryParam) {
  var encodedParams = [];
  var encodedTruncationParam = opt_truncationQueryParam && !(opt_truncationQueryParam.value == null || opt_truncationQueryParam.value === '') ? encodeURIComponent(opt_truncationQueryParam.name) + '=' + encodeURIComponent(String(opt_truncationQueryParam.value)) : null;
  var capacity = maxLength - baseUrl.length;
  if (encodedTruncationParam) {
    capacity -= encodedTruncationParam.length + 1;
  }
  for (var i = 0; i < queryParams.length; i++) {
    var param = queryParams[i];
    if (param.value == null || param.value === '') {
      continue;
    }
    var encodedNameAndSep = encodeURIComponent(param.name) + '=';
    var encodedValue = encodeURIComponent(String(param.value));
    var fullLength = encodedNameAndSep.length + encodedValue.length + 1;
    if (fullLength > capacity) {
      var truncatedValue = encodedValue.substr(0, capacity - encodedNameAndSep.length - 1)
      // Don't end with a partially truncated escape sequence
      .replace(/%\w?$/, '');
      if (truncatedValue) {
        encodedParams.push(encodedNameAndSep + truncatedValue);
      }
      if (encodedTruncationParam) {
        encodedParams.push(encodedTruncationParam);
      }
      break;
    }
    encodedParams.push(encodedNameAndSep + encodedValue);
    capacity -= fullLength;
  }
  if (!encodedParams.length) {
    return baseUrl;
  }
  return baseUrl + '?' + encodedParams.join('&');
}

},{}],7:[function(require,module,exports){
exports.__esModule = true;
exports.isGoogleAdsA4AValidEnvironment = isGoogleAdsA4AValidEnvironment;
exports.googleAdUrl = googleAdUrl;
exports.extractGoogleAdCreativeAndSignature = extractGoogleAdCreativeAndSignature;
exports.getGoogleAdSlotCounter = getGoogleAdSlotCounter;
exports.getCorrelator = getCorrelator;
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

var _urlBuilder = require('./url-builder');

var _correlator = require('../correlator');

var _srcAdCid = require('../../../src/ad-cid');

var _srcDocumentInfo = require('../../../src/document-info');

var _srcLog = require('../../../src/log');

var _srcMode = require('../../../src/mode');

var _srcUrl = require('../../../src/url');

var _srcViewer = require('../../../src/viewer');

var _srcUtilsBase64 = require('../../../src/utils/base64');

var _srcUtilsDomFingerprint = require('../../../src/utils/dom-fingerprint');

/** @const {string} */
var AMP_SIGNATURE_HEADER = 'X-AmpAdSignature';

/** @const {number} */
var MAX_URL_LENGTH = 4096;

/** @enum {string} */
var AmpAdImplementation = {
  AMP_AD_XHR_TO_IFRAME: '2',
  AMP_AD_XHR_TO_IFRAME_OR_AMP: '3'
};

/**
 * Check whether Google Ads supports the A4A rendering pathway is valid for the
 * environment by ensuring native crypto support and page originated in the
 * the {@code cdn.ampproject.org} CDN <em>or</em> we must be running in local
 * dev mode.
 *
 * @param {!Window} win  Host window for the ad.
 * @param {!Element} element The AMP tag element.
 * @returns {boolean}  Whether Google Ads should attempt to render via the A4A
 *   pathway.
 */

function isGoogleAdsA4AValidEnvironment(win, element) {
  var supportsNativeCrypto = win.crypto && (win.crypto.subtle || win.crypto.webkitSubtle);
  var multiSizeRequest = element.dataset && element.dataset.multiSize;
  // Note: Theoretically, isProxyOrigin is the right way to do this, b/c it
  // will be kept up to date with known proxies.  However, it doesn't seem to
  // be compatible with loading the example files from localhost.  To hack
  // around that, just say that we're A4A eligible if we're in local dev
  // mode, regardless of origin path.
  return supportsNativeCrypto && !multiSizeRequest && (_srcUrl.isProxyOrigin(win.location) || _srcMode.getMode().localDev || _srcMode.getMode().test);
}

/**
 * @param {!../../../extensions/amp-a4a/0.1/amp-a4a.AmpA4A} a4a
 * @param {string} baseUrl
 * @param {number} startTime
 * @param {number} slotNumber
 * @param {!Array<!./url-builder.QueryParameterDef>} queryParams
 * @param {!Array<!./url-builder.QueryParameterDef>} unboundedQueryParams
 * @return {!Promise<string>}
 */

function googleAdUrl(a4a, baseUrl, startTime, slotNumber, queryParams, unboundedQueryParams) {
  /** @const {!Promise<string>} */
  var referrerPromise = _srcViewer.viewerForDoc(a4a.getAmpDoc()).getReferrerUrl();
  return _srcAdCid.getAdCid(a4a).then(function (clientId) {
    return referrerPromise.then(function (referrer) {
      return buildAdUrl(a4a, baseUrl, startTime, slotNumber, queryParams, unboundedQueryParams, clientId, referrer);
    });
  });
}

/**
 * @param {!ArrayBuffer} creative
 * @param {!Headers} responseHeaders
 * @return {!Promise<!../../../extensions/amp-a4a/0.1/amp-a4a.AdResponseDef>}
 */

function extractGoogleAdCreativeAndSignature(creative, responseHeaders) {
  var signature = null;
  try {
    if (responseHeaders.has(AMP_SIGNATURE_HEADER)) {
      signature = _srcUtilsBase64.base64UrlDecodeToBytes(_srcLog.dev().assertString(responseHeaders.get(AMP_SIGNATURE_HEADER)));
    }
  } finally {
    return Promise.resolve( /** @type {
                            !../../../extensions/amp-a4a/0.1/amp-a4a.AdResponseDef} */{ creative: creative, signature: signature });
  }
}

/**
 * @param {!../../../extensions/amp-a4a/0.1/amp-a4a.AmpA4A} a4a
 * @param {string} baseUrl
 * @param {number} startTime
 * @param {number} slotNumber
 * @param {!Array<!./url-builder.QueryParameterDef>} queryParams
 * @param {!Array<!./url-builder.QueryParameterDef>} unboundedQueryParams
 * @param {(string|undefined)} clientId
 * @param {string} referrer
 * @return {string}
 */
function buildAdUrl(a4a, baseUrl, startTime, slotNumber, queryParams, unboundedQueryParams, clientId, referrer) {
  var global = a4a.win;
  var documentInfo = _srcDocumentInfo.documentInfoForDoc(a4a.element);
  if (!global.gaGlobal) {
    // Read by GPT for GA/GPT integration.
    global.gaGlobal = {
      vid: clientId,
      hid: documentInfo.pageViewId
    };
  }
  var slotRect = a4a.getIntersectionElementLayoutBox();
  var viewportRect = a4a.getViewport().getRect();
  var iframeDepth = iframeNestingDepth(global);
  var dtdParam = { name: 'dtd' };
  var adElement = a4a.element;
  var allQueryParams = queryParams.concat([{
    name: 'is_amp',
    value: AmpAdImplementation.AMP_AD_XHR_TO_IFRAME_OR_AMP
  }, { name: 'amp_v', value: '1480694828544' }, { name: 'd_imp', value: '1' }, { name: 'dt', value: startTime }, { name: 'adf', value: _srcUtilsDomFingerprint.domFingerprint(adElement) }, { name: 'c', value: _correlator.makeCorrelator(clientId, documentInfo.pageViewId) }, { name: 'output', value: 'html' }, { name: 'nhd', value: iframeDepth }, { name: 'eid', value: adElement.getAttribute('data-experiment-id') }, { name: 'biw', value: viewportRect.width }, { name: 'bih', value: viewportRect.height }, { name: 'adx', value: slotRect.left }, { name: 'ady', value: slotRect.top }, { name: 'u_hist', value: getHistoryLength(global) }, dtdParam], unboundedQueryParams, [{ name: 'url', value: documentInfo.canonicalUrl }, { name: 'top', value: iframeDepth ? topWindowUrlOrDomain(global) : null }, {
    name: 'loc',
    value: global.location.href == documentInfo.canonicalUrl ? null : global.location.href
  }, { name: 'ref', value: referrer }]);
  dtdParam.value = elapsedTimeWithCeiling(Date.now(), startTime);
  return _urlBuilder.buildUrl(baseUrl, allQueryParams, MAX_URL_LENGTH, { name: 'trunc', value: '1' });
}

/**
 * @param {!Window} win
 * @return {!GoogleAdSlotCounter}
 */

function getGoogleAdSlotCounter(win) {
  if (!win.AMP_GOOGLE_AD_SLOT_COUNTER) {
    win.AMP_GOOGLE_AD_SLOT_COUNTER = new GoogleAdSlotCounter();
  }
  return win.AMP_GOOGLE_AD_SLOT_COUNTER;
}

var GoogleAdSlotCounter = (function () {
  function GoogleAdSlotCounter() {
    babelHelpers.classCallCheck(this, GoogleAdSlotCounter);

    /** @private {number} */
    this.nextSlotNumber_ = 0;
  }

  /**
   * @param {!Window} global
   * @return {number}
   */

  /**
   * @return {number}
   */

  GoogleAdSlotCounter.prototype.nextSlotNumber = function nextSlotNumber() {
    return ++this.nextSlotNumber_;
  };

  return GoogleAdSlotCounter;
})();

function iframeNestingDepth(global) {
  var win = global;
  var depth = 0;
  while (win != win.parent) {
    win = win.parent;
    depth++;
  }
  _srcLog.dev().assert(win == global.top);
  return depth;
}

/**
 * @param {!Window} global
 * @return {number}
 */
function getHistoryLength(global) {
  // We have seen cases where accessing history length causes errors.
  try {
    return global.history.length;
  } catch (e) {
    return 0;
  }
}

/**
 * @param {!Window} global
 * @return {?string}
 */
function topWindowUrlOrDomain(global) {
  var ancestorOrigins = global.location.ancestorOrigins;
  if (ancestorOrigins) {
    var origin = global.location.origin;
    var topOrigin = ancestorOrigins[ancestorOrigins.length - 1];
    if (origin == topOrigin) {
      return global.top.location.href;
    }
    var secondFromTop = secondWindowFromTop(global);
    if (secondFromTop == global || origin == ancestorOrigins[ancestorOrigins.length - 2]) {
      return secondFromTop. /*REVIEW*/document.referrer;
    }
    return topOrigin;
  } else {
    try {
      return global.top.location.href;
    } catch (e) {}
    var secondFromTop = secondWindowFromTop(global);
    try {
      return secondFromTop. /*REVIEW*/document.referrer;
    } catch (e) {}
    return null;
  }
}

/**
 * @param {!Window} global
 * @return {!Window}
 */
function secondWindowFromTop(global) {
  var secondFromTop = global;
  while (secondFromTop.parent != secondFromTop.parent.parent) {
    secondFromTop = secondFromTop.parent;
  }
  _srcLog.dev().assert(secondFromTop.parent == global.top);
  return secondFromTop;
}

/**
 * @param {number} time
 * @param {number} start
 * @return {(number|string)}
 */
function elapsedTimeWithCeiling(time, start) {
  var duration = time - start;
  if (duration >= 1e6) {
    return 'M';
  } else if (duration >= 0) {
    return duration;
  }
  return '-M';
}

/**
 * @param {!Window} win
 * @param {string=} opt_cid
 * @return {number} The correlator.
 */

function getCorrelator(win, opt_cid) {
  if (!win.ampAdPageCorrelator) {
    win.ampAdPageCorrelator = _correlator.makeCorrelator(opt_cid, _srcDocumentInfo.documentInfoForDoc(win.document).pageViewId);
  }
  return win.ampAdPageCorrelator;
}

},{"../../../src/ad-cid":28,"../../../src/document-info":34,"../../../src/log":51,"../../../src/mode":53,"../../../src/url":75,"../../../src/utils/base64":78,"../../../src/utils/dom-fingerprint":80,"../../../src/viewer":83,"../correlator":8,"./url-builder":6}],8:[function(require,module,exports){
exports.__esModule = true;
exports.makeCorrelator = makeCorrelator;
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
 * @param {(string|undefined)} clientId
 * @param {string} pageViewId
 * @return {number}
 */

function makeCorrelator(clientId, pageViewId) {
  var pageViewIdNumeric = Number(pageViewId || 0);
  if (clientId) {
    return pageViewIdNumeric + clientId.replace(/\D/g, '') % 1e6 * 1e6;
  } else {
    // In this case, pageViewIdNumeric is only 4 digits => too low entropy
    // to be useful as a page correlator.  So synthesize one from scratch.
    // 4503599627370496 == 2^52.  The guaranteed range of JS Number is at least
    // 2^53 - 1.
    return Math.floor(4503599627370496 * Math.random());
  }
}

},{}],9:[function(require,module,exports){
exports.__esModule = true;
var CSS = "amp-ad iframe{border:0!important;margin:0!important;padding:0!important}.amp-ad-default-fallback{background-color:#d3d3d3}\n/*# sourceURL=/extensions/amp-ad/0.1/amp-ad.css*/";
exports.CSS = CSS;

},{}],10:[function(require,module,exports){
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

var _srcUrlReplacements = require('../../../src/url-replacements');

var _srcServiceVariableSource = require('../../../src/service/variable-source');

var _srcLog = require('../../../src/log');

var WHITELISTED_VARIABLES = ['RANDOM', 'COUNTER', 'CANONICAL_URL', 'CANONICAL_HOST', 'CANONICAL_HOSTNAME', 'CANONICAL_PATH', 'DOCUMENT_REFERRER', 'TITLE', 'AMPDOC_URL', 'AMPDOC_HOST', 'AMPDOC_HOSTNAME', 'SOURCE_URL', 'SOURCE_HOST', 'SOURCE_HOSTNAME', 'SOURCE_PATH', 'PAGE_VIEW_ID', 'CLIENT_ID', 'VARIANT', 'VARIANTS', 'SHARE_TRACKING_INCOMING', 'SHARE_TRACKING_OUTGOING', 'TIMESTAMP', 'TIMEZONE', 'SCROLL_TOP', 'SCROLL_LEFT', 'SCROLL_HEIGHT', 'SCROLL_WIDTH', 'VIEWPORT_HEIGHT', 'VIEWPORT_WIDTH', 'SCREEN_WIDTH', 'SCREEN_HEIGHT', 'AVAILABLE_SCREEN_HEIGHT', 'AVAILABLE_SCREEN_WIDTH', 'SCREEN_COLOR_DEPTH', 'DOCUMENT_CHARSET', 'BROWSER_LANGUAGE', 'VIEWER', 'TOTAL_ENGAGED_TIME', 'AMP_VERSION'];

/** Provides A4A specific variable substitution. */

var A4AVariableSource = (function (_VariableSource) {
  babelHelpers.inherits(A4AVariableSource, _VariableSource);

  /**
   * @param  {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc
   * @param  {!Window} embedWin
   */

  function A4AVariableSource(ampdoc, embedWin) {
    babelHelpers.classCallCheck(this, A4AVariableSource);

    _VariableSource.call(this);
    /** @private {VariableSource} global variable source for fallback. */
    this.globalVariableSource_ = _srcUrlReplacements.urlReplacementsForDoc(ampdoc).getVariableSource();

    /** @private {!Window} */
    this.win_ = embedWin;
  }

  /** @override */

  A4AVariableSource.prototype.initialize = function initialize() {
    var _this = this;

    this.set('AD_NAV_TIMING', function (startAttribute, endAttribute) {
      _srcLog.user().assert(startAttribute, 'The first argument to AD_NAV_TIMING, the' + ' start attribute name, is required');
      return _srcServiceVariableSource.getTimingDataSync(_this.win_,
      /**@type {string}*/startAttribute,
      /**@type {string}*/endAttribute);
    }).setAsync('AD_NAV_TIMING', function (startAttribute, endAttribute) {
      _srcLog.user().assert(startAttribute, 'The first argument to AD_NAV_TIMING, the' + ' start attribute name, is required');
      return _srcServiceVariableSource.getTimingDataAsync(_this.win_,
      /**@type {string}*/startAttribute,
      /**@type {string}*/endAttribute);
    });

    this.set('AD_NAV_TYPE', function () {
      return _srcServiceVariableSource.getNavigationData(_this.win_, 'type');
    });

    this.set('AD_NAV_REDIRECT_COUNT', function () {
      return _srcServiceVariableSource.getNavigationData(_this.win_, 'redirectCount');
    });

    for (var v = 0; v < WHITELISTED_VARIABLES.length; v++) {
      var varName = WHITELISTED_VARIABLES[v];
      var resolvers = this.globalVariableSource_.get(varName);
      this.set(varName, resolvers.sync).setAsync(varName, resolvers.async);
    }
  };

  return A4AVariableSource;
})(_srcServiceVariableSource.VariableSource);

exports.A4AVariableSource = A4AVariableSource;

},{"../../../src/log":51,"../../../src/service/variable-source":66,"../../../src/url-replacements":74}],11:[function(require,module,exports){
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

var _ampAd01ConcurrentLoad = require('../../amp-ad/0.1/concurrent-load');

var _ads_config = require('../../../ads/_config');

var _ads_a4aConfig = require('../../../ads/_a4a-config');

var _srcDom = require('../../../src/dom');

var _srcError = require('../../../src/error');

var _srcFriendlyIframeEmbed = require('../../../src/friendly-iframe-embed');

var _srcLayout = require('../../../src/layout');

var _srcAdHelper = require('../../../src/ad-helper');

var _srcLog = require('../../../src/log');

var _srcMode = require('../../../src/mode');

var _srcTypes = require('../../../src/types');

var _srcUrlReplacements = require('../../../src/url-replacements');

var _srcUtilsPromise = require('../../../src/utils/promise');

var _srcUtilsBytes = require('../../../src/utils/bytes');

var _srcViewer = require('../../../src/viewer');

var _srcXhr = require('../../../src/xhr');

var _srcString = require('../../../src/string');

var _srcPlatform = require('../../../src/platform');

var _cryptoVerifier = require('./crypto-verifier');

var _srcExperiments = require('../../../src/experiments');

var _srcStyle = require('../../../src/style');

var _adsAlpHandler = require('../../../ads/alp/handler');

var _extensionsAmpAd01AmpAdUi = require('../../../extensions/amp-ad/0.1/amp-ad-ui');

var _srcServiceUrlReplacementsImpl = require('../../../src/service/url-replacements-impl');

var _a4aVariableSource = require('./a4a-variable-source');

/** @private @const {string} */
var ORIGINAL_HREF_ATTRIBUTE = 'data-a4a-orig-href';

/**
 * @param {*} ary
 * @return {boolean} whether input is array of 2 numeric elements.
 * @private
 */
function isValidOffsetArray(ary) {
  return _srcTypes.isArray(ary) && ary.length == 2 && typeof ary[0] === 'number' && typeof ary[1] === 'number';
}

/** @type {string} */
var METADATA_STRING = '<script type="application/json" amp-ad-metadata>';

// TODO(tdrl): Temporary, while we're verifying whether SafeFrame is an
// acceptable solution to the 'Safari on iOS doesn't fetch iframe src from
// cache' issue.  See https://github.com/ampproject/amphtml/issues/5614
/** @type {string} */
var SAFEFRAME_VERSION = '1-0-4';
/** @type {string} */
var SAFEFRAME_IMPL_PATH = 'https://tpc.googlesyndication.com/safeframe/' + SAFEFRAME_VERSION + '/html/container.html';
/** @type {string} @visibleForTesting */
var RENDERING_TYPE_HEADER = 'X-AmpAdRender';
exports.RENDERING_TYPE_HEADER = RENDERING_TYPE_HEADER;
/** @type {!Object} @private */
var SHARED_IFRAME_PROPERTIES = {
  frameborder: '0',
  allowfullscreen: '',
  allowtransparency: '',
  scrolling: 'no',
  marginwidth: '0',
  marginheight: '0'
};

/** @typedef {{creative: ArrayBuffer, signature: ?Uint8Array}} */
var AdResponseDef = undefined;

exports.AdResponseDef = AdResponseDef;
/** @typedef {{
      minifiedCreative: string,
      customElementExtensions: Array<string>,
      customStylesheets: Array<string>
    }} */
var CreativeMetaDataDef = undefined;

/** @private */
var LIFECYCLE_STAGES = {
  // Note: Use strings as values here, rather than numbers, so that "0" does
  // not test as `false` later.
  adSlotBuilt: '0',
  urlBuilt: '1',
  adRequestStart: '2',
  adRequestEnd: '3',
  extractCreativeAndSignature: '4',
  adResponseValidateStart: '5',
  renderFriendlyStart: '6',
  renderCrossDomainStart: '7',
  renderFriendlyEnd: '8',
  renderCrossDomainEnd: '9',
  preAdThrottle: '10',
  renderSafeFrameStart: '11',
  adSlotCleared: '20'
};

exports.LIFECYCLE_STAGES = LIFECYCLE_STAGES;

var AmpA4A = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpA4A, _AMP$BaseElement);

  // TODO: Add more error handling throughout code.
  // TODO: Handle creatives that do not fill.

  /**
   * @param {!Element} element
   */

  function AmpA4A(element) {
    babelHelpers.classCallCheck(this, AmpA4A);

    _AMP$BaseElement.call(this, element);
    _srcLog.dev().assert(AMP.AmpAdUIHandler);
    _srcLog.dev().assert(AMP.AmpAdXOriginIframeHandler);

    /** @private {?Promise<!boolean>} */
    this.adPromise_ = null;

    /**
     * @private {number} unique ID of the currently executing promise to allow
     * for cancellation.
     */
    this.promiseId_ = 0;

    /** {?Object} */
    this.config = null;

    /** @private {?string} */
    this.adUrl_ = null;

    /** {?AMP.AmpAdUIHandler} */
    this.uiHandler = null;

    /** @private {?AMP.AmpAdXOriginIframeHandler} */
    this.xOriginIframeHandler_ = null;

    /** @private {boolean} */
    this.rendered_ = false;

    /** @private {boolean} whether layoutMeasure has been executed. */
    this.layoutMeasureExecuted_ = false;

    /** @const @private {!../../../src/service/vsync-impl.Vsync} */
    this.vsync_ = this.getVsync();

    if (!this.win.ampA4aValidationKeys) {
      /** @private {!Array<!Promise<!Array<!Promise<?PublicKeyInfoDef>>>>} */
      this.win.ampA4aValidationKeys = this.getKeyInfoSets_();
    }

    // TODO(tdrl): Temporary, while we're verifying whether this is an
    // acceptable solution to the 'Safari on iOS doesn't fetch iframe src
    // from cache' issue.  See https://github.com/ampproject/amphtml/issues/5614
    /** @private {?ArrayBuffer} */
    this.creativeBody_ = null;
    /**
     * Note(keithwrightbos) - ensure the default here is null so that ios
     * uses safeframe when response header is not specified.
     * @private {?string}
     */
    this.experimentalNonAmpCreativeRenderMethod_ = _srcPlatform.platformFor(this.win).isIos() ? 'safeframe' : null;

    this.emitLifecycleEvent('adSlotBuilt');
  }

  /** @override */

  AmpA4A.prototype.getPriority = function getPriority() {
    // Priority used for scheduling preload and layout callback.  Because
    // AMP creatives will be injected as part of the promise chain created
    // within onLayoutMeasure, this is only relevant to non-AMP creatives
    // therefore we want this to match the 3p priority.
    return 2;
  };

  /** @override */

  AmpA4A.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /** @override */

  AmpA4A.prototype.buildCallback = function buildCallback() {
    var adType = this.element.getAttribute('type');
    this.config = _ads_config.adConfig[adType] || {};
    this.uiHandler = new AMP.AmpAdUIHandler(this);
    this.uiHandler.init();
  };

  /** @override */

  AmpA4A.prototype.renderOutsideViewport = function renderOutsideViewport() {
    // Only relevant if non-AMP as AMP creative will be injected within
    // buildCallback promise chain.
    // If another ad is currently loading we only load ads that are currently
    // in viewport.
    var allowRender = _ampAd01ConcurrentLoad.allowRenderOutsideViewport(this.element, this.win);
    if (allowRender !== true) {
      return allowRender;
    }
    // Otherwise the ad is good to go.
    return _AMP$BaseElement.prototype.renderOutsideViewport.call(this);
  };

  /**
   * To be overridden by network specific implementation indicating if element
   * (and environment generally) are valid for sending XHR queries.
   * @return {boolean} whether element is valid and ad request should be
   *    sent.  If false, no ad request is sent and slot will be collapsed if
   *    possible.
   */

  AmpA4A.prototype.isValidElement = function isValidElement() {
    return true;
  };

  /**
   * Returns true if this element was loaded from an amp-ad element.  For use by
   * network-specific implementations that don't want to allow themselves to be
   * embedded directly into a page.
   * @return {boolean}
   */

  AmpA4A.prototype.isAmpAdElement = function isAmpAdElement() {
    return this.element.tagName == 'AMP-AD' || this.element.tagName == 'AMP-EMBED';
  };

  /**
   * Prefetches and preconnects URLs related to the ad using adPreconnect
   * registration which assumes ad request domain used for 3p is applicable.
   * @param {boolean=} unusedOnLayout
   * @override
   */

  AmpA4A.prototype.preconnectCallback = function preconnectCallback(unusedOnLayout) {
    var _this = this;

    // TODO(tdrl): Temporary, while we're verifying whether SafeFrame is an
    // acceptable solution to the 'Safari on iOS doesn't fetch iframe src from
    // cache' issue.  See https://github.com/ampproject/amphtml/issues/5614
    this.preconnect.url(SAFEFRAME_IMPL_PATH);
    if (!this.config) {
      return;
    }
    var preconnect = this.config.preconnect;
    // NOTE(keithwrightbos): using onLayout to indicate if preconnect should be
    // given preferential treatment.  Currently this would be false when
    // relevant (i.e. want to preconnect on or before onLayoutMeasure) which
    // causes preconnect to delay for 1 sec (see custom-element#preconnect)
    // therefore hard coding to true.
    // NOTE(keithwrightbos): Does not take isValidElement into account so could
    // preconnect unnecessarily, however it is assumed that isValidElement
    // matches amp-ad loader predicate such that A4A impl does not load.
    if (typeof preconnect == 'string') {
      this.preconnect.url(preconnect, true);
    } else if (preconnect) {
      preconnect.forEach(function (p) {
        _this.preconnect.url(p, true);
      });
    }
  };

  /** @override */

  AmpA4A.prototype.onLayoutMeasure = function onLayoutMeasure() {
    var _this2 = this;

    if (this.xOriginIframeHandler_) {
      this.xOriginIframeHandler_.onLayoutMeasure();
    }
    if (this.layoutMeasureExecuted_ || !_cryptoVerifier.isCryptoAvailable()) {
      // onLayoutMeasure gets called multiple times.
      return;
    }
    this.layoutMeasureExecuted_ = true;
    _srcLog.user().assert(_srcAdHelper.isAdPositionAllowed(this.element, this.win), '<%s> is not allowed to be placed in elements with ' + 'position:fixed: %s', this.element.tagName, this.element);
    // OnLayoutMeasure can be called when page is in prerender so delay until
    // visible.  Assume that it is ok to call isValidElement as it should
    // only being looking at window, immutable properties (i.e. location) and
    // its element ancestry.
    if (!this.isValidElement()) {
      // TODO(kjwright): collapse?
      _srcLog.user().warn('AMP-A4A', 'Amp ad element ignored as invalid', this.element);
      return;
    }

    // Increment unique promise ID so that if its value changes within the
    // promise chain due to cancel from unlayout, the promise will be rejected.
    this.promiseId_++;
    var promiseId = this.promiseId_;
    // Shorthand for: reject promise if current promise chain is out of date.
    var checkStillCurrent = function (promiseId) {
      if (promiseId != _this2.promiseId_) {
        throw _srcError.cancellation();
      }
    };

    // Return value from this chain: True iff rendering was "successful"
    // (i.e., shouldn't try to render later via iframe); false iff should
    // try to render later in iframe.
    // Cases to handle in this chain:
    //   - Everything ok  => Render; return true
    //   - Empty network response returned => Don't render; return true
    //   - Can't parse creative out of response => Don't render; return false
    //   - Can parse, but creative is empty => Don't render; return true
    //   - Validation fails => return false
    //   - Rendering fails => return false
    //   - Chain cancelled => don't return; drop error
    //   - Uncaught error otherwise => don't return; percolate error up
    this.adPromise_ = _srcViewer.viewerForDoc(this.getAmpDoc()).whenFirstVisible()
    // This block returns the ad URL, if one is available.
    /** @return {!Promise<?string>} */
    .then(function () {
      checkStillCurrent(promiseId);
      return (/** @type {!Promise<?string>} */_this2.getAdUrl()
      );
    })
    // This block returns the (possibly empty) response to the XHR request.
    /** @return {!Promise<?Response>} */
    .then(function (adUrl) {
      checkStillCurrent(promiseId);
      _this2.adUrl_ = adUrl;
      _this2.emitLifecycleEvent('urlBuilt', adUrl);
      return adUrl && _this2.sendXhrRequest_(adUrl);
    })
    // The following block returns either the response (as a {bytes, headers}
    // object), or null if no response is available / response is empty.
    /** @return {?Promise<?{bytes: !ArrayBuffer, headers: !Headers}>} */
    .then(function (fetchResponse) {
      checkStillCurrent(promiseId);
      if (!fetchResponse || !fetchResponse.arrayBuffer) {
        return null;
      }
      _this2.emitLifecycleEvent('adRequestEnd', fetchResponse);
      // TODO(tdrl): Temporary, while we're verifying whether SafeFrame is
      // an acceptable solution to the 'Safari on iOS doesn't fetch
      // iframe src from cache' issue.  See
      // https://github.com/ampproject/amphtml/issues/5614
      _this2.experimentalNonAmpCreativeRenderMethod_ = fetchResponse.headers.get(RENDERING_TYPE_HEADER) || _this2.experimentalNonAmpCreativeRenderMethod_;
      // Note: Resolving a .then inside a .then because we need to capture
      // two fields of fetchResponse, one of which is, itself, a promise,
      // and one of which isn't.  If we just return
      // fetchResponse.arrayBuffer(), the next step in the chain will
      // resolve it to a concrete value, but we'll lose track of
      // fetchResponse.headers.
      return fetchResponse.arrayBuffer().then(function (bytes) {
        return {
          bytes: bytes,
          headers: fetchResponse.headers
        };
      });
    })
    // This block returns the ad creative and signature, if available; null
    // otherwise.
    /**
     * @return {!Promise<?{creative: !ArrayBuffer, signature: !ArrayBuffer}>}
     */
    .then(function (responseParts) {
      checkStillCurrent(promiseId);
      if (responseParts) {
        _this2.emitLifecycleEvent('extractCreativeAndSignature', responseParts);
      }
      return responseParts && _this2.extractCreativeAndSignature(responseParts.bytes, responseParts.headers);
    })
    // This block returns the ad creative if it exists and validates as AMP;
    // null otherwise.
    /** @return {!Promise<?string>} */
    .then(function (creativeParts) {
      checkStillCurrent(promiseId);
      // Keep a handle to the creative body so that we can render into
      // SafeFrame later, if necessary.  TODO(tdrl): Temporary, while we
      // assess whether this is the right solution to the Safari+iOS iframe
      // src cache issue.  If we decide to keep a SafeFrame-like solution,
      // we should restructure the promise chain to pass this info along
      // more cleanly, without use of an object variable outside the chain.
      if (_this2.experimentalNonAmpCreativeRenderMethod_ == 'safeframe' && creativeParts && creativeParts.creative) {
        _this2.creativeBody_ = creativeParts.creative;
      }
      if (!creativeParts || !creativeParts.signature) {
        return (/** @type {!Promise<?string>} */Promise.resolve(null)
        );
      }
      _this2.emitLifecycleEvent('adResponseValidateStart', creativeParts);
      return _this2.verifyCreativeSignature_(creativeParts.creative, creativeParts.signature).then(function (creative) {
        if (creative) {
          return creative;
        }
        // Attempt to re-fetch the keys in case our locally cached
        // batch has expired.
        _this2.win.ampA4aValidationKeys = _this2.getKeyInfoSets_();
        return _this2.verifyCreativeSignature_(creativeParts.creative, creativeParts.signature);
      });
    })
    // This block returns true iff the creative was rendered in the shadow
    // DOM.
    /** @return {!Promise<!boolean>} */
    .then(function (creative) {
      checkStillCurrent(promiseId);
      // Note: It's critical that #maybeRenderAmpAd_ be called
      // on precisely the same creative that was validated
      // via #validateAdResponse_.  See GitHub issue
      // https://github.com/ampproject/amphtml/issues/4187

      // TODO(levitzky) If creative comes back null, we should consider re-
      // fetching the signing server public keys and try the verification
      // step again.
      return creative && _this2.maybeRenderAmpAd_(creative);
    })['catch'](function (error) {
      return _this2.promiseErrorHandler_(error);
    });
  };

  /**
   * Attempts to validate the creative signature against every key currently in
   * our possession. This should never be called before at least one key fetch
   * attempt is made.
   *
   * @param {!ArrayBuffer} creative
   * @param {!Uint8Array} signature
   * @return {!Promise<!ArrayBuffer>} The creative.
   */

  AmpA4A.prototype.verifyCreativeSignature_ = function verifyCreativeSignature_(creative, signature) {
    var _this3 = this;

    // For each signing service, we have exactly one Promise,
    // keyInfoSetPromise, that holds an Array of Promises of signing keys.
    // So long as any one of these signing services can verify the
    // signature, then the creative is valid AMP.
    var keyInfoSetPromises = this.win.ampA4aValidationKeys;
    return _srcUtilsPromise.some(keyInfoSetPromises.map(function (keyInfoSetPromise) {
      // Resolve Promise into Array of Promises of signing keys.
      return keyInfoSetPromise.then(function (keyInfoSet) {
        // As long as any one individual key of a particular signing
        // service, keyInfoPromise, can verify the signature, then the
        // creative is valid AMP.
        return _srcUtilsPromise.some(keyInfoSet.map(function (keyInfoPromise) {
          // Resolve Promise into signing key.
          return keyInfoPromise.then(function (keyInfo) {
            if (!keyInfo) {
              return Promise.reject('Promise resolved to null key.');
            }
            // If the key exists, try verifying with it.
            return _cryptoVerifier.verifySignature(new Uint8Array(creative), signature, keyInfo).then(function (isValid) {
              if (isValid) {
                return creative;
              }
              return Promise.reject('Key failed to validate creative\'s signature.');
            }, function (err) {
              _srcLog.user().error('AMP-A4A', err, _this3.element);
            });
          });
        }))
        // some() returns an array of which we only need a single value.
        .then(function (returnedArray) {
          return returnedArray[0];
        });
      });
    })).then(function (returnedArray) {
      return returnedArray[0];
    });
  };

  /**
   * Handles uncaught errors within promise flow.
   * @param {*} error
   * @return {*}
   * @private
   */

  AmpA4A.prototype.promiseErrorHandler_ = function promiseErrorHandler_(error) {
    if (error && error.message) {
      if (error.message.indexOf('amp-a4a: ') == 0) {
        // caught previous call to promiseErrorHandler?  Infinite loop?
        return error;
      }
      if (error.message == _srcError.cancellation().message) {
        // Rethrow if cancellation
        throw error;
      }
    }
    // Returning promise reject should trigger unhandledrejection which will
    // trigger reporting via src/error.js
    var adQueryIdx = this.adUrl_ ? this.adUrl_.indexOf('?') : -1;
    var state = {
      'm': error instanceof Error ? error.message : error,
      'tag': this.element.tagName,
      'type': this.element.getAttribute('type'),
      'au': adQueryIdx < 0 ? '' : this.adUrl_.substring(adQueryIdx + 1, adQueryIdx + 251)
    };
    return new Error('amp-a4a: ' + JSON.stringify(state));
  };

  /** @override */

  AmpA4A.prototype.layoutCallback = function layoutCallback() {
    var _this4 = this;

    // Promise may be null if element was determined to be invalid for A4A.
    if (!this.adPromise_ || this.rendered_) {
      return Promise.resolve();
    }
    // Layoutcallback only executes if ad is within viewport or render
    // outside viewport returned true.  This is only relevant for non-AMP
    // creatives which rendered via the buildCallback promise chain.  Ensure
    // slot counts towards 3p loading count until we know that the creative is
    // valid AMP.
    return this.adPromise_.then(function (rendered) {
      if (rendered instanceof Error || !rendered) {
        _this4.emitLifecycleEvent('preAdThrottle');
        _ampAd01ConcurrentLoad.incrementLoadingAds(_this4.win);
        // Haven't rendered yet, so try rendering via one of our
        // cross-domain iframe solutions.
        if (_this4.experimentalNonAmpCreativeRenderMethod_ == 'safeframe' && _this4.creativeBody_) {
          var renderPromise = _this4.renderViaSafeFrame_(_this4.creativeBody_);
          _this4.creativeBody_ = null; // Free resources.
          return renderPromise;
        } else if (_this4.adUrl_) {
          return _this4.renderViaCachedContentIframe_(_this4.adUrl_);
        } else {
          throw new Error('No creative or URL available -- A4A can\'t render' + ' any ad');
        }
      }
      if (rendered instanceof Error) {
        throw rendered;
      }
    })['catch'](function (error) {
      return Promise.reject(_this4.promiseErrorHandler_(error));
    });
  };

  /** @override  */

  AmpA4A.prototype.unlayoutCallback = function unlayoutCallback() {
    var _this5 = this;

    this.emitLifecycleEvent('adSlotCleared');
    this.uiHandler.setDisplayState(_extensionsAmpAd01AmpAdUi.AdDisplayState.NOT_LAID_OUT);
    // Remove creative and reset to allow for creation of new ad.
    if (!this.layoutMeasureExecuted_) {
      return true;
    }
    // TODO(keithwrightbos): is mutate necessary?  Could this lead to a race
    // condition where unlayoutCallback fires and during/after subsequent
    // layoutCallback execution, the mutate operation executes causing our
    // state to be destroyed?
    this.vsync_.mutate(function () {
      _srcDom.removeChildren(_this5.element);

      _this5.adPromise_ = null;
      _this5.adUrl_ = null;
      _this5.creativeBody_ = null;
      _this5.experimentalNonAmpCreativeRenderMethod_ = _srcPlatform.platformFor(_this5.win).isIos() ? 'safeframe' : null;
      _this5.rendered_ = false;
      if (_this5.xOriginIframeHandler_) {
        _this5.xOriginIframeHandler_.freeXOriginIframe();
        _this5.xOriginIframeHandler_ = null;
      }
      _this5.layoutMeasureExecuted_ = false;
    });
    // Increment promiseId to cause any pending promise to cancel.
    this.promiseId_++;
    return true;
  };

  /** @override  */

  AmpA4A.prototype.viewportCallback = function viewportCallback(inViewport) {
    if (this.xOriginIframeHandler_) {
      this.xOriginIframeHandler_.viewportCallback(inViewport);
    }
  };

  /**
   * Gets the Ad URL to send an XHR Request to.  To be implemented
   * by network.
   * @return {!Promise<string>|string}
   */

  AmpA4A.prototype.getAdUrl = function getAdUrl() {
    throw new Error('getAdUrl not implemented!');
  };

  /**
   * Extracts creative and verification signature (if present) from
   * XHR response body and header.  To be implemented by network.
   *
   * In the returned value, the `creative` field should be an `ArrayBuffer`
   * containing the utf-8 encoded bytes of the creative itself, while the
   * `signature` field should be a `Uint8Array` containing the raw signature
   * bytes.  The `signature` field may be null if no signature was available
   * for this creative / the creative is not valid AMP.
   *
   * @param {!ArrayBuffer} unusedResponseArrayBuffer content as array buffer
   * @param {!Headers} unusedResponseHeaders Fetch API Headers object (or polyfill
   *     for it) containing the response headers.
   * @return {!Promise<!AdResponseDef>}
   */

  AmpA4A.prototype.extractCreativeAndSignature = function extractCreativeAndSignature(unusedResponseArrayBuffer, unusedResponseHeaders) {
    throw new Error('extractCreativeAndSignature not implemented!');
  };

  /**
   * Callback executed when AMP creative has successfully rendered within the
   * publisher page.  To be overridden by network implementations as needed.
   */

  AmpA4A.prototype.onAmpCreativeRender = function onAmpCreativeRender() {
    this.emitLifecycleEvent('renderFriendlyEnd');
  };

  /**
   * @param {!Element} iframe that was just created.  To be overridden for
   * testing.
   * @visibleForTesting
   */

  AmpA4A.prototype.onCrossDomainIframeCreated = function onCrossDomainIframeCreated(iframe) {
    _srcLog.dev().info('A4A', 'onCrossDomainIframeCreated ' + iframe);
  };

  /**
   * Send ad request, extract the creative and signature from the response.
   * @param {string} adUrl Request URL to send XHR to.
   * @return {!Promise<?../../../src/service/xhr-impl.FetchResponse>}
   * @private
   */

  AmpA4A.prototype.sendXhrRequest_ = function sendXhrRequest_(adUrl) {
    this.emitLifecycleEvent('adRequestStart');
    var xhrInit = {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
      requireAmpResponseSourceOrigin: true
    };
    return _srcXhr.xhrFor(this.win).fetch(adUrl, xhrInit)['catch'](function (unusedReason) {
      // If an error occurs, let the ad be rendered via iframe after delay.
      // TODO(taymonbeal): Figure out a more sophisticated test for deciding
      // whether to retry with an iframe after an ad request failure or just
      // give up and render the fallback content (or collapse the ad slot).
      return null;
    });
  };

  /**
   * To be overridden by network specific implementation indicating which
   * signing service(s) is to be used.
   * @return {!Array<string>} A list of signing services.
   */

  AmpA4A.prototype.getSigningServiceNames = function getSigningServiceNames() {
    return _srcMode.getMode().localDev ? ['google', 'google-dev'] : ['google'];
  };

  /**
   * Retrieves all public keys, as specified in _a4a-config.js.
   * None of the (inner or outer) promises returned by this function can reject.
   *
   * @return {!Array<!Promise<!Array<!Promise<?PublicKeyInfoDef>>>>}
   * @private
   */

  AmpA4A.prototype.getKeyInfoSets_ = function getKeyInfoSets_() {
    var _this6 = this;

    if (!_cryptoVerifier.isCryptoAvailable()) {
      return [];
    }
    var jwkSetPromises = this.getSigningServiceNames().map(function (serviceName) {
      _srcLog.dev().assert(_srcMode.getMode().localDev || !_srcString.endsWith(serviceName, '-dev'));
      var url = _ads_a4aConfig.signingServerURLs[serviceName];
      if (url) {
        return _srcXhr.xhrFor(_this6.win).fetchJson(url, { mode: 'cors', method: 'GET' }).then(function (jwkSetObj) {
          if (_srcTypes.isObject(jwkSetObj) && Array.isArray(jwkSetObj.keys) && jwkSetObj.keys.every(_srcTypes.isObject)) {
            return jwkSetObj.keys;
          } else {
            _srcLog.user().error('AMP-A4A', 'Invalid response from signing server.', _this6.element);
            return [];
          }
        })['catch'](function (err) {
          _srcLog.user().error('AMP-A4A', err, _this6.element);
          return [];
        });
      } else {
        // The given serviceName does not have a corresponding URL in
        // _a4a-config.js.
        var reason = 'Signing service \'' + serviceName + '\' does not exist.';
        _srcLog.user().error('AMP-A4A', reason, _this6.element);
        return [];
      }
    });
    return jwkSetPromises.map(function (jwkSetPromise) {
      return jwkSetPromise.then(function (jwkSet) {
        return jwkSet.map(function (jwk) {
          return _cryptoVerifier.importPublicKey(jwk)['catch'](function (err) {
            _srcLog.user().error('AMP-A4A', err, _this6.element);
            return null;
          });
        });
      });
    });
  };

  /**
   * Render a validated AMP creative directly in the parent page.
   * @param {!ArrayBuffer} bytes The creative, as raw bytes.
   * @return {Promise<boolean>} Whether the creative was successfully
   *     rendered.
   * @private
   */

  AmpA4A.prototype.maybeRenderAmpAd_ = function maybeRenderAmpAd_(bytes) {
    var _this7 = this;

    this.emitLifecycleEvent('renderFriendlyStart', bytes);
    // AMP documents are required to be UTF-8
    return _srcUtilsBytes.utf8Decode(bytes).then(function (creative) {
      // Find the json blob located at the end of the body and parse it.
      var creativeMetaData = _this7.getAmpAdMetadata_(creative);
      if (!creativeMetaData) {
        // Could not find appropriate markers within the creative therefore
        // load within cross domain iframe. Iframe is created immediately
        // (as opposed to waiting for layoutCallback) as the the creative has
        // been verified as AMP and will run efficiently.  Render inside a
        // vsync block so that AMP can coordinate visual impact.
        _this7.vsync_.mutate(function () {
          _srcLog.dev().assert(_this7.adUrl_, 'Ad URL missing in A4A creative rendering');
          _this7.renderViaCachedContentIframe_(_this7.adUrl_);
        });
        return true;
      } else {
        try {
          var _ret = (function () {
            // Create and setup friendly iframe.
            _srcLog.dev().assert(!!_this7.element.ownerDocument);
            var iframe = /** @type {!HTMLIFrameElement} */_srcDom.createElementWithAttributes(
            /** @type {!Document} */_this7.element.ownerDocument, 'iframe', {
              'frameborder': '0', 'allowfullscreen': '',
              'allowtransparency': '', 'scrolling': 'no' });
            _this7.applyFillContent(iframe);
            var fontsArray = [];
            if (creativeMetaData.customStylesheets) {
              creativeMetaData.customStylesheets.forEach(function (s) {
                var href = s['href'];
                if (href) {
                  fontsArray.push(href);
                }
              });
            }
            return {
              v: _srcFriendlyIframeEmbed.installFriendlyIframeEmbed(iframe, _this7.element, {
                url: _this7.adUrl_,
                html: creativeMetaData.minifiedCreative,
                extensionIds: creativeMetaData.customElementExtensions || [],
                fonts: fontsArray
              }, function (embedWin) {
                _srcServiceUrlReplacementsImpl.installUrlReplacementsForEmbed(_this7.getAmpDoc(), embedWin, new _a4aVariableSource.A4AVariableSource(_this7.getAmpDoc(), embedWin));
              }).then(function (friendlyIframeEmbed) {
                // Ensure visibility hidden has been removed (set by boilerplate).
                var frameDoc = friendlyIframeEmbed.iframe.contentDocument || friendlyIframeEmbed.win.document;
                _srcStyle.setStyle(frameDoc.body, 'visibility', 'visible');
                // Capture phase click handlers on the ad.
                _this7.registerExpandUrlParams_(friendlyIframeEmbed.win);
                // Bubble phase click handlers on the ad.
                _this7.registerAlpHandler_(friendlyIframeEmbed.win);
                _this7.rendered_ = true;
                _this7.onAmpCreativeRender();
                return true;
              })
            };
          })();

          if (typeof _ret === 'object') return _ret.v;
        } catch (e) {
          _srcLog.dev().error('AMP-A4A', 'Error injecting creative in friendly frame', e);
          // If we fail on any of the steps of Shadow DOM construction, just
          // render in iframe.
          // TODO: report!
          return false;
        }
      }
    });
  };

  /**
   * Shared functionality for cross-domain iframe-based rendering methods.
   * @param {!Element} iframe Iframe to render.  Should be fully configured
   * (all attributes set), but not yet attached to DOM.
   * @return {!Promise} awaiting load event for ad frame
   * @private
   */

  AmpA4A.prototype.iframeRenderHelper_ = function iframeRenderHelper_(iframe) {
    // TODO(keithwrightbos): noContentCallback?
    this.xOriginIframeHandler_ = new AMP.AmpAdXOriginIframeHandler(this);
    this.rendered_ = true;
    return this.xOriginIframeHandler_.init(iframe, /* opt_isA4A */true);
  };

  /**
   * Creates iframe whose src matches that of the ad URL.  The response should
   * have been cached causing the browser to render without callout.  However,
   * it is possible for cache miss to occur which can be detected server-side
   * by missing ORIGIN header.
   *
   * Note: As of 2016-10-18, the fill-from-cache assumption appears to fail on
   * Safari-on-iOS, which issues a fresh network request, even though the
   * content is already in cache.
   *
   * @param {string} adUrl  Ad request URL, as sent to #sendXhrRequest_ (i.e.,
   *    before any modifications that XHR module does to it.)
   * @return {!Promise} awaiting load event for ad frame
   * @private
   */

  AmpA4A.prototype.renderViaCachedContentIframe_ = function renderViaCachedContentIframe_(adUrl) {
    this.emitLifecycleEvent('renderCrossDomainStart');
    /** @const {!Element} */
    var iframe = _srcDom.createElementWithAttributes(
    /** @type {!Document} */this.element.ownerDocument, 'iframe', Object.assign({
      'height': this.element.getAttribute('height'),
      'width': this.element.getAttribute('width'),
      // XHR request modifies URL by adding origin as parameter.  Need to
      // append ad URL, otherwise cache will miss.
      // TODO: remove call to getCorsUrl and instead have fetch API return
      // modified url.
      'src': _srcXhr.xhrFor(this.win).getCorsUrl(this.win, adUrl)
    }, SHARED_IFRAME_PROPERTIES));
    return this.iframeRenderHelper_(iframe);
  };

  /**
   * Render creative via SafeFrame.
   * @param {!ArrayBuffer} creativeBody  The creative, as raw bytes.
   * @return {!Promise} awaiting load event for ad frame
   * @private
   */

  AmpA4A.prototype.renderViaSafeFrame_ = function renderViaSafeFrame_(creativeBody) {
    var _this8 = this;

    this.emitLifecycleEvent('renderSafeFrameStart');
    return _srcUtilsBytes.utf8Decode(creativeBody).then(function (creative) {
      /** @const {!Element} */
      var iframe = _srcDom.createElementWithAttributes(
      /** @type {!Document} */_this8.element.ownerDocument, 'iframe', Object.assign({
        'height': _this8.element.getAttribute('height'),
        'width': _this8.element.getAttribute('width'),
        'src': SAFEFRAME_IMPL_PATH + '?n=0',
        'name': SAFEFRAME_VERSION + ';' + creative.length + ';' + creative
      }, SHARED_IFRAME_PROPERTIES));
      return _this8.iframeRenderHelper_(iframe);
    });
  };

  /**
   *
   * Throws {@code SyntaxError} if the metadata block delimiters are missing
   * or corrupted or if the metadata content doesn't parse as JSON.
   * @param {string} creative from which CSS is extracted
   * @return {?CreativeMetaDataDef} Object result of parsing JSON data blob inside
   *     the metadata markers on the ad text, or null if no metadata markers are
   *     found.
   * @private
   * TODO(keithwrightbos@): report error cases
   */

  AmpA4A.prototype.getAmpAdMetadata_ = function getAmpAdMetadata_(creative) {
    var metadataStart = creative.lastIndexOf(METADATA_STRING);
    if (metadataStart < 0) {
      // Couldn't find a metadata blob.
      _srcLog.dev().warn('A4A', 'Could not locate start index for amp meta data in: %s', creative);
      return null;
    }
    var metadataEnd = creative.lastIndexOf('</script>');
    if (metadataEnd < 0) {
      // Couldn't find a metadata blob.
      _srcLog.dev().warn('A4A', 'Could not locate closing script tag for amp meta data in: %s', creative);
      return null;
    }
    try {
      var metaDataObj = JSON.parse(creative.slice(metadataStart + METADATA_STRING.length, metadataEnd));
      var ampRuntimeUtf16CharOffsets = metaDataObj['ampRuntimeUtf16CharOffsets'];
      if (!isValidOffsetArray(ampRuntimeUtf16CharOffsets)) {
        throw new Error('Invalid runtime offsets');
      }
      var metaData = {};
      if (metaDataObj['customElementExtensions']) {
        metaData.customElementExtensions = metaDataObj['customElementExtensions'];
        if (!_srcTypes.isArray(metaData.customElementExtensions)) {
          throw new Error('Invalid extensions');
        }
      }
      if (metaDataObj['customStylesheets']) {
        (function () {
          // Expect array of objects with at least one key being 'href' whose value
          // is URL.
          metaData.customStylesheets = metaDataObj['customStylesheets'];
          var errorMsg = 'Invalid custom stylesheets';
          if (!_srcTypes.isArray(metaData.customStylesheets)) {
            throw new Error(errorMsg);
          }
          metaData.customStylesheets.forEach(function (stylesheet) {
            if (!_srcTypes.isObject(stylesheet) || !stylesheet['href'] || typeof stylesheet['href'] !== 'string' || !/^https:\/\//i.test(stylesheet['href'])) {
              throw new Error(errorMsg);
            }
          });
        })();
      }
      // TODO(keithwrightbos): OK to assume ampRuntimeUtf16CharOffsets is before
      // metadata as its in the head?
      metaData.minifiedCreative = creative.slice(0, ampRuntimeUtf16CharOffsets[0]) + creative.slice(ampRuntimeUtf16CharOffsets[1], metadataStart) + creative.slice(metadataEnd + '</script>'.length);
      return metaData;
    } catch (err) {
      _srcLog.dev().warn('A4A', 'Invalid amp metadata: %s', creative.slice(metadataStart + METADATA_STRING.length, metadataEnd));
      return null;
    }
  };

  /**
   * Registers a click handler for "A2A" (AMP-to-AMP navigation where the AMP
   * viewer navigates to an AMP destination on our behalf.
   * @param {!Window} iframeWin
   */

  AmpA4A.prototype.registerAlpHandler_ = function registerAlpHandler_(iframeWin) {
    var _this9 = this;

    if (!_srcExperiments.isExperimentOn(this.win, 'alp-for-a4a')) {
      return;
    }
    iframeWin.document.documentElement.addEventListener('click', function (event) {
      _adsAlpHandler.handleClick(event, function (url) {
        _srcViewer.viewerForDoc(_this9.getAmpDoc()).navigateTo(url, 'a4a');
      });
    });
  };

  /**
   * Registers a handler that performs URL replacement on the href
   * of an ad click.
   * @param {!Window} iframeWin
   */

  AmpA4A.prototype.registerExpandUrlParams_ = function registerExpandUrlParams_(iframeWin) {
    iframeWin.document.documentElement.addEventListener('click', this.maybeExpandUrlParams_.bind(this), /* capture */true);
  };

  /**
   * Handle click on links and replace variables in the click URL.
   * The function changes the actual href value and stores the
   * template in the ORIGINAL_HREF_ATTRIBUTE attribute
   * @param {!Event} e
   */

  AmpA4A.prototype.maybeExpandUrlParams_ = function maybeExpandUrlParams_(e) {
    var target = _srcDom.closestByTag(_srcLog.dev().assertElement(e.target), 'A');
    if (!target || !target.href) {
      // Not a click on a link.
      return;
    }
    var hrefToExpand = target.getAttribute(ORIGINAL_HREF_ATTRIBUTE) || target.getAttribute('href');
    if (!hrefToExpand) {
      return;
    }
    var vars = {
      'CLICK_X': function () {
        return e.pageX;
      },
      'CLICK_Y': function () {
        return e.pageY;
      }
    };
    var newHref = _srcUrlReplacements.urlReplacementsForDoc(this.getAmpDoc()).expandSync(hrefToExpand, vars, undefined, /* opt_whitelist */{
      // For now we only allow to replace the click location vars
      // and nothing else.
      // NOTE: Addition to this whitelist requires additional review.
      'CLICK_X': true,
      'CLICK_Y': true
    });
    if (newHref != hrefToExpand) {
      // Store original value so that later clicks can be processed with
      // freshest values.
      if (!target.getAttribute(ORIGINAL_HREF_ATTRIBUTE)) {
        target.setAttribute(ORIGINAL_HREF_ATTRIBUTE, hrefToExpand);
      }
      target.setAttribute('href', newHref);
    }
  };

  /**
   * To be overriden by network specific implementation.
   * This function will be called for each lifecycle event as specified in the
   * LIFECYCLE_STAGES enum declaration. For certain events, an optional
   * associated piece of data will be passed.
   *
   * @param {string} eventName
   * @param {!Object=} opt_associatedEventData
   */

  AmpA4A.prototype.emitLifecycleEvent = function emitLifecycleEvent(eventName, opt_associatedEventData) {};

  return AmpA4A;
})(AMP.BaseElement);

exports.AmpA4A = AmpA4A;

},{"../../../ads/_a4a-config":1,"../../../ads/_config":2,"../../../ads/alp/handler":3,"../../../extensions/amp-ad/0.1/amp-ad-ui":19,"../../../src/ad-helper":29,"../../../src/dom":37,"../../../src/error":39,"../../../src/experiments":41,"../../../src/friendly-iframe-embed":44,"../../../src/layout":50,"../../../src/log":51,"../../../src/mode":53,"../../../src/platform":56,"../../../src/service/url-replacements-impl":65,"../../../src/string":68,"../../../src/style":70,"../../../src/types":73,"../../../src/url-replacements":74,"../../../src/utils/bytes":79,"../../../src/utils/promise":81,"../../../src/viewer":83,"../../../src/xhr":85,"../../amp-ad/0.1/concurrent-load":22,"./a4a-variable-source":10,"./crypto-verifier":12}],12:[function(require,module,exports){
exports.__esModule = true;
exports.importPublicKey = importPublicKey;
exports.verifySignature = verifySignature;
exports.isCryptoAvailable = isCryptoAvailable;
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

var _srcUtilsBase64 = require('../../../src/utils/base64');

var _srcUtilsBytes = require('../../../src/utils/bytes');

/** @const {boolean} */
var isWebkit = window.crypto && 'webkitSubtle' in window.crypto;

/** @const {!webCrypto.SubtleCrypto} */
var crossCrypto = isWebkit ? window.crypto['webkitSubtle'] : window.crypto.subtle;

/** @const {number} */
var VERSION = 0x00;

/**
 * An object holding the public key and its hash.
 *
 * @typedef {{
 *   publicKey: !Object,
 *   hash: Uint8Array,
 *   cryptoKey: !webCrypto.CryptoKey
 * }}
 */
var PublicKeyInfoDef = undefined;

exports.PublicKeyInfoDef = PublicKeyInfoDef;
/**
 * Convert a JSON Web Key object to a browser-native cryptographic key and
 * compute a hash for it.  The caller must verify that Web Cryptography is
 * available using isCryptoAvailable before calling this function.
 *
 * @param {!Object} jwk An object which is hopefully an RSA JSON Web Key.  The
 *     caller should verify that it is an object before calling this function.
 * @return {!Promise<!PublicKeyInfoDef>}
 */

function importPublicKey(jwk) {
  // WebKit wants this as an ArrayBufferView.
  return (isWebkit ? _srcUtilsBytes.utf8Encode(JSON.stringify(jwk)) : Promise.resolve(jwk)).then(function (encodedJwk) {
    return crossCrypto.importKey('jwk', encodedJwk, { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } }, true, ['verify']);
  }).then(function (cryptoKey) {
    // We do the importKey first to allow the browser to check for
    // an invalid key.  This last check is in case the key is valid
    // but a different kind.
    if (typeof jwk.n != 'string' || typeof jwk.e != 'string') {
      throw new Error('missing fields in JSON Web Key');
    }
    var mod = _srcUtilsBase64.base64UrlDecodeToBytes(jwk.n);
    var pubExp = _srcUtilsBase64.base64UrlDecodeToBytes(jwk.e);
    var lenMod = lenPrefix(mod);
    var lenPubExp = lenPrefix(pubExp);
    var data = new Uint8Array(lenMod.length + lenPubExp.length);
    data.set(lenMod);
    data.set(lenPubExp, lenMod.length);
    // The list of RSA public keys are not under attacker's
    // control, so a collision would not help.
    return crossCrypto.digest({ name: 'SHA-1' }, data).then(function (digest) {
      return {
        cryptoKey: cryptoKey,
        // Hash is the first 4 bytes of the SHA-1 digest.
        hash: new Uint8Array( /** @type {ArrayBuffer} */digest, 0, 4)
      };
    });
  });
}

/**
 * Verifies RSA signature corresponds to the data, given a public key.
 * @param {!Uint8Array} data the data that was signed.
 * @param {!Uint8Array} signature the RSA signature.
 * @param {!PublicKeyInfoDef} publicKeyInfo the RSA public key.
 * @return {!Promise<!boolean>} whether the signature is valid for
 *     the public key.
 */

function verifySignature(data, signature, publicKeyInfo) {
  // The signature has the following format:
  // 1-byte version + 4-byte key hash + raw RSA signature where
  // the raw RSA signature is computed over (data || 1-byte version).
  // If the hash doesn't match, don't bother checking this key.
  if (!(signature.length > 5 && signature[0] == VERSION && hashesEqual(signature, publicKeyInfo.hash))) {
    return Promise.resolve(false);
  }
  // Verify that the data matches the raw RSA signature, using the
  // public key.
  // Append the version number to the data.
  var signedData = new Uint8Array(data.length + 1);
  signedData.set(data);
  signedData[data.length] = VERSION;

  return (/** @type {!Promise<boolean>} */crossCrypto.verify({ name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } }, publicKeyInfo.cryptoKey, signature.subarray(5), signedData)
  );
}

/**
 * Is this service actually available? For now, we use browser native
 * crypto. So if that is not available, then this service is not available.
 * @return {boolean}
 */

function isCryptoAvailable() {
  return Boolean(crossCrypto);
}

/**
 * Appends 4-byte endian data's length to the data itself.
 * @param {!Uint8Array} data
 * @return {!Uint8Array} the prepended 4-byte endian data's length together with
 *     the data itself.
 */
function lenPrefix(data) {
  var res = new Uint8Array(4 + data.length);
  res[0] = data.length >> 24 & 0xff;
  res[1] = data.length >> 16 & 0xff;
  res[2] = data.length >> 8 & 0xff;
  res[3] = data.length & 0xff;
  res.set(data, 4);
  return res;
}

/**
 * Compare the hash field of the signature to keyHash.
 * Note that signature has a one-byte version, followed by 4-byte hash.
 * @param {?Uint8Array} signature
 * @param {?Uint8Array} keyHash
 * @return {boolean} signature[1..5] == keyHash
 */
function hashesEqual(signature, keyHash) {
  if (!signature || !keyHash) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    if (signature[i + 1] !== keyHash[i]) {
      return false;
    }
  }
  return true;
}

},{"../../../src/utils/base64":78,"../../../src/utils/bytes":79}],13:[function(require,module,exports){
exports.__esModule = true;
exports.adsenseIsA4AEnabled = adsenseIsA4AEnabled;
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

// Because AdSense and DoubleClick are both operated by Google and their A4A
// implementations share some behavior in common, part of the logic for this
// implementation is located in the ads/google/a4a directory rather than here.
// Most other ad networks will want to put their A4A code entirely in the
// extensions/amp-ad-network-${NETWORK_NAME}-impl directory.

var _adsGoogleA4aTrafficExperiments = require('../../../ads/google/a4a/traffic-experiments');

/** @const {!string}  @private */
var ADSENSE_A4A_EXPERIMENT_NAME = 'expAdsenseA4A';

// The following experiment IDs are used by Google-side servers to
// understand what experiment is running and what mode the A4A code is
// running in.  In this experiment phase, we're testing 8 different
// configurations, resulting from the Cartesian product of the following:
//   - Traditional 3p iframe ad rendering (control) vs A4A rendering
//     (experiment)
//   - Experiment triggered by an external page, such as the Google Search
//     page vs. triggered internally in the client code.
//   - Doubleclick vs Adsense
// The following two objects contain experiment IDs for the first two
// categories for Adsense ads.  They are attached to the ad request by
// ads/google/a4a/traffic-experiments.js#googleAdsIsA4AEnabled when it works
// out whether a given ad request is in the overall experiment and, if so,
// which branch it's on.

// We would prefer the following constants to remain private, but we need to
// refer to them directly in amp-ad-3p-impl.js and amp-a4a.js in order to check
// whether we're in the experiment or not, for the purposes of enabling
// debug traffic profiling.  Once we have debugged the a4a implementation and
// can disable profiling again, we can return these constants to being
// private to this file.
/** const {!../../../ads/google/a4a/traffic-experiments.ExperimentInfo}  */
var ADSENSE_A4A_EXTERNAL_EXPERIMENT_BRANCHES = {
  control: '117152650',
  experiment: '117152651'
};

exports.ADSENSE_A4A_EXTERNAL_EXPERIMENT_BRANCHES = ADSENSE_A4A_EXTERNAL_EXPERIMENT_BRANCHES;
/** @const {!../../../ads/google/a4a/traffic-experiments.ExperimentInfo}  */
var ADSENSE_A4A_INTERNAL_EXPERIMENT_BRANCHES = {
  control: '117152670',
  experiment: '117152671'
};

exports.ADSENSE_A4A_INTERNAL_EXPERIMENT_BRANCHES = ADSENSE_A4A_INTERNAL_EXPERIMENT_BRANCHES;
/**
 * @param {!Window} win
 * @param {!Element} element
 * @returns {boolean}
 */

function adsenseIsA4AEnabled(win, element) {
  return _adsGoogleA4aTrafficExperiments.googleAdsIsA4AEnabled(win, element, ADSENSE_A4A_EXPERIMENT_NAME, ADSENSE_A4A_EXTERNAL_EXPERIMENT_BRANCHES, ADSENSE_A4A_INTERNAL_EXPERIMENT_BRANCHES);
}

},{"../../../ads/google/a4a/traffic-experiments":5}],14:[function(require,module,exports){
exports.__esModule = true;
exports.doubleclickIsA4AEnabled = doubleclickIsA4AEnabled;
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

// Because AdSense and DoubleClick are both operated by Google and their A4A
// implementations share some behavior in common, part of the logic for this
// implementation is located in the ads/google/a4a directory rather than here.
// Most other ad networks will want to put their A4A code entirely in the
// extensions/amp-ad-network-${NETWORK_NAME}-impl directory.

var _adsGoogleA4aTrafficExperiments = require('../../../ads/google/a4a/traffic-experiments');

var _srcMode = require('../../../src/mode');

var _srcUrl = require('../../../src/url');

/** @const {string} */
var DOUBLECLICK_A4A_EXPERIMENT_NAME = 'expDoubleclickA4A';

// The following experiment IDs are used by Google-side servers to
// understand what experiment is running and what mode the A4A code is
// running in.  In this experiment phase, we're testing 8 different
// configurations, resulting from the Cartesian product of the following:
//   - Traditional 3p iframe ad rendering (control) vs A4A rendering
//     (experiment)
//   - Experiment triggered by an external page, such as the Google Search
//     page vs. triggered internally in the client code.
//   - Doubleclick vs Adsense
// The following two objects contain experiment IDs for the first two
// categories for Doubleclick ads.  They are attached to the ad request by
// ads/google/a4a/traffic-experiments.js#googleAdsIsA4AEnabled when it works
// out whether a given ad request is in the overall experiment and, if so,
// which branch it's on.

// We would prefer the following constants to remain private, but we need to
// refer to them directly in amp-ad-3p-impl.js and amp-a4a.js in order to check
// whether we're in the experiment or not, for the purposes of enabling
// debug traffic profiling.  Once we have debugged the a4a implementation and
// can disable profiling again, we can return these constants to being
// private to this file.
/** @const {!../../../ads/google/a4a/traffic-experiments.ExperimentInfo} */
var DOUBLECLICK_A4A_EXTERNAL_EXPERIMENT_BRANCHES = {
  control: '117152660',
  experiment: '117152661'
};

exports.DOUBLECLICK_A4A_EXTERNAL_EXPERIMENT_BRANCHES = DOUBLECLICK_A4A_EXTERNAL_EXPERIMENT_BRANCHES;
/** @const {!../../../ads/google/a4a/traffic-experiments.ExperimentInfo} */
var DOUBLECLICK_A4A_INTERNAL_EXPERIMENT_BRANCHES = {
  control: '117152680',
  experiment: '117152681'
};

exports.DOUBLECLICK_A4A_INTERNAL_EXPERIMENT_BRANCHES = DOUBLECLICK_A4A_INTERNAL_EXPERIMENT_BRANCHES;
/** @const {!../../../ads/google/a4a/traffic-experiments.ExperimentInfo} */
var DOUBLECLICK_A4A_BETA_BRANCHES = {
  control: '2077830',
  experiment: '2077831'
};

exports.DOUBLECLICK_A4A_BETA_BRANCHES = DOUBLECLICK_A4A_BETA_BRANCHES;
var BETA_ATTRIBUTE = 'data-use-beta-a4a-implementation';

exports.BETA_ATTRIBUTE = BETA_ATTRIBUTE;
/**
 * @param {!Window} win
 * @param {!Element} element
 * @returns {boolean}
 */

function doubleclickIsA4AEnabled(win, element) {
  if (!!win.document.querySelector('meta[name=amp-3p-iframe-src]')) {
    return false;
  }
  var a4aRequested = element.hasAttribute(BETA_ATTRIBUTE);
  // Note: Under this logic, a4aRequested shortcuts googleAdsIsA4AEnabled and,
  // therefore, carves out of the experiment branches.  Any publisher using this
  // attribute will be excluded from the experiment altogether.
  // TODO(tdrl): The "is this site eligible" logic has gotten scattered around
  // and is now duplicated.  It should be cleaned up and factored into a single,
  // shared location.
  var enableA4A = _adsGoogleA4aTrafficExperiments.googleAdsIsA4AEnabled(win, element, DOUBLECLICK_A4A_EXPERIMENT_NAME, DOUBLECLICK_A4A_EXTERNAL_EXPERIMENT_BRANCHES, DOUBLECLICK_A4A_INTERNAL_EXPERIMENT_BRANCHES) || a4aRequested && (_srcUrl.isProxyOrigin(win.location) || _srcMode.getMode(win).localDev || _srcMode.getMode(win).test);
  if (enableA4A && a4aRequested && !_adsGoogleA4aTrafficExperiments.isInManualExperiment(element)) {
    element.setAttribute(_adsGoogleA4aTrafficExperiments.EXPERIMENT_ATTRIBUTE, DOUBLECLICK_A4A_BETA_BRANCHES.experiment);
  }
  return enableA4A;
}

},{"../../../ads/google/a4a/traffic-experiments":5,"../../../src/mode":53,"../../../src/url":75}],15:[function(require,module,exports){
exports.__esModule = true;
exports.fakeIsA4AEnabled = fakeIsA4AEnabled;
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
 * Check whether the fake ad network wants to use A4A.  Returns true iff the
 * `data-use-a4a` attribute is set on the `amp-ad` element.
 *
 * **Note:** `data-use-a4a` is a special parameter available only for this
 * 'fake' network implementation.  It isn't present / used by A4A or other
 * ad networks in general.
 *
 * @param {!Window} win
 * @param {!Element} element
 * @returns {boolean}
 */

function fakeIsA4AEnabled(win, element) {
  var a4aRequested = element.getAttribute('data-use-a4a');
  return !!a4aRequested;
}

},{}],16:[function(require,module,exports){
exports.__esModule = true;
exports.setupA2AListener = setupA2AListener;
exports.handleMessageEvent = handleMessageEvent;
/* Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _srcDom = require('../../../src/dom');

var _srcExperiments = require('../../../src/experiments');

var _srcLog = require('../../../src/log');

var _srcViewer = require('../../../src/viewer');

var _srcUrl = require('../../../src/url');

/**
 * Sets up a special document wide listener that relays requests
 * from ad iframes to the viewer to perform A2A navigations.
 * Requests are denied if the requests come from iframes that
 * do not currently have focus.
 * @param {!Window} win
 */

function setupA2AListener(win) {
  if (win.a2alistener) {
    return;
  }
  win.a2alistener = true;
  if (!_srcExperiments.isExperimentOn(win, 'alp')) {
    return;
  }
  win.addEventListener('message', handleMessageEvent.bind(null, win));
}

/**
 * Handles a potential a2a message.
 * @param {!Window} win
 * @param {!Event} event
 * @visibleForTesting
 */

function handleMessageEvent(win, event) {
  var data = event.data;
  // Only handle messages starting with the magic string.
  if (typeof data != 'string' || data.indexOf('a2a;') != 0) {
    return;
  }
  var origin = event.origin;
  var nav = JSON.parse(data.substr( /* 'a2a;'.length */4));
  var source = event.source;
  var activeElement = win.document.activeElement;
  // Check that the active element is an iframe.
  _srcLog.user().assert(activeElement.tagName == 'IFRAME', 'A2A request with invalid active element %s %s %s', activeElement, nav.url, origin);
  var found = false;
  var sourceParent = source;
  var activeWindow = activeElement.contentWindow;
  while (sourceParent != win.top) {
    if (sourceParent == activeWindow) {
      found = true;
      break;
    }
    sourceParent = sourceParent.parent;
  }
  // Check that the active iframe contains the iframe that sent us
  // the message.
  _srcLog.user().assert(found, 'A2A request from invalid source win %s %s', nav.url, origin);
  // Check that the iframe is contained in an ad.
  _srcLog.user().assert(_srcDom.closestByTag(activeElement, 'amp-ad'), 'A2A request from non-ad frame %s %s', nav.url, origin);
  // We only allow AMP shaped URLs.
  _srcLog.user().assert(_srcUrl.isProxyOrigin(nav.url), 'Invalid ad A2A URL %s %s', nav.url, origin);
  _srcViewer.viewerForDoc(win.document).navigateTo(nav.url, 'ad-' + origin);
}

},{"../../../src/dom":37,"../../../src/experiments":41,"../../../src/log":51,"../../../src/url":75,"../../../src/viewer":83}],17:[function(require,module,exports){
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

var _ampAdXoriginIframeHandler = require('./amp-ad-xorigin-iframe-handler');

var _concurrentLoad = require('./concurrent-load');

var _srcAdCid = require('../../../src/ad-cid');

var _src3pFrame = require('../../../src/3p-frame');

var _srcLayout = require('../../../src/layout');

var _srcAdHelper = require('../../../src/ad-helper');

var _ads_config = require('../../../ads/_config');

var _adsGoogleA4aPerformance = require('../../../ads/google/a4a/performance');

var _srcLog = require('../../../src/log');

var _a2aListener = require('./a2a-listener');

var _srcLayoutRect = require('../../../src/layout-rect');

var _ampAdUi = require('./amp-ad-ui');

/** @const {!string} Tag name for 3P AD implementation. */
var TAG_3P_IMPL = 'amp-ad-3p-impl';

exports.TAG_3P_IMPL = TAG_3P_IMPL;

var AmpAd3PImpl = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpAd3PImpl, _AMP$BaseElement);

  /**
   * @param {!AmpElement} element
   */

  function AmpAd3PImpl(element) {
    babelHelpers.classCallCheck(this, AmpAd3PImpl);

    _AMP$BaseElement.call(this, element);

    /** @private {?Element} */
    this.iframe_ = null;

    /** {?Object} */
    this.config = null;

    /** {?AmpAdUIHandler} */
    this.uiHandler = null;

    /** @private {?AmpAdXOriginIframeHandler} */
    this.xOriginIframeHandler_ = null;

    /** @private {?Element} */
    this.placeholder_ = null;

    /** @private {?Element} */
    this.fallback_ = null;

    /** @private {boolean} */
    this.isInFixedContainer_ = false;

    /**
     * The (relative) layout box of the ad iframe to the amp-ad tag.
     * @private {?../../../src/layout-rect.LayoutRectDef}
     */
    this.iframeLayoutBox_ = null;

    /**
     * Call to stop listening to viewport changes.
     * @private {?function()}
     */
    this.unlistenViewportChanges_ = null;

    /** @private {IntersectionObserver} */
    this.intersectionObserver_ = null;

    /** @private {?string|undefined} */
    this.container_ = undefined;

    /** @private {?Promise} */
    this.layoutPromise_ = null;

    /** {!../../../ads/google/a4a/performance.BaseLifecycleReporter} */
    this.lifecycleReporter = _adsGoogleA4aPerformance.getLifecycleReporter(this, 'amp', undefined, this.element.getAttribute('data-amp-slot-index'));

    this.lifecycleReporter.sendPing('adSlotBuilt');
  }

  /** @override */

  AmpAd3PImpl.prototype.getPriority = function getPriority() {
    // Loads ads after other content.
    return 2;
  };

  AmpAd3PImpl.prototype.renderOutsideViewport = function renderOutsideViewport() {
    var allowRender = _concurrentLoad.allowRenderOutsideViewport(this.element, this.win);
    if (allowRender !== true) {
      return allowRender;
    }
    // Otherwise the ad is good to go.
    return _AMP$BaseElement.prototype.renderOutsideViewport.call(this);
  };

  /** @override */

  AmpAd3PImpl.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /** @override */

  AmpAd3PImpl.prototype.buildCallback = function buildCallback() {
    this.placeholder_ = this.getPlaceholder();
    this.fallback_ = this.getFallback();

    var adType = this.element.getAttribute('type');
    this.config = _ads_config.adConfig[adType];
    _srcLog.user().assert(this.config, 'Type "' + adType + '" is not supported in amp-ad');

    this.uiHandler = new _ampAdUi.AmpAdUIHandler(this);
    this.uiHandler.init();

    _a2aListener.setupA2AListener(this.win);
  };

  /**
   * Prefetches and preconnects URLs related to the ad.
   * @param {boolean=} opt_onLayout
   * @override
   */

  AmpAd3PImpl.prototype.preconnectCallback = function preconnectCallback(opt_onLayout) {
    var _this = this;

    // We always need the bootstrap.
    _src3pFrame.preloadBootstrap(this.win, this.preconnect);
    if (typeof this.config.prefetch == 'string') {
      this.preconnect.preload(this.config.prefetch, 'script');
    } else if (this.config.prefetch) {
      this.config.prefetch.forEach(function (p) {
        _this.preconnect.preload(p, 'script');
      });
    }
    if (typeof this.config.preconnect == 'string') {
      this.preconnect.url(this.config.preconnect, opt_onLayout);
    } else if (this.config.preconnect) {
      this.config.preconnect.forEach(function (p) {
        _this.preconnect.url(p, opt_onLayout);
      });
    }
    // If fully qualified src for ad script is specified we preconnect to it.
    var src = this.element.getAttribute('src');
    if (src) {
      // We only preconnect to the src because we cannot know whether the URL
      // will have caching headers set.
      this.preconnect.url(src);
    }
  };

  /**
   * @override
   */

  AmpAd3PImpl.prototype.onLayoutMeasure = function onLayoutMeasure() {
    this.isInFixedContainer_ = !_srcAdHelper.isAdPositionAllowed(this.element, this.win);
    /** detect ad containers, add the list to element as a new attribute */
    if (this.container_ === undefined) {
      this.container_ = _srcAdHelper.getAdContainer(this.element);
    }
    // We remeasured this tag, let's also remeasure the iframe. Should be
    // free now and it might have changed.
    this.measureIframeLayoutBox_();
    if (this.xOriginIframeHandler_) {
      this.xOriginIframeHandler_.onLayoutMeasure();
    }
  };

  /**
   * Measure the layout box of the iframe if we rendered it already.
   * @private
   */

  AmpAd3PImpl.prototype.measureIframeLayoutBox_ = function measureIframeLayoutBox_() {
    if (this.xOriginIframeHandler_ && this.xOriginIframeHandler_.iframe) {
      var iframeBox = this.getViewport().getLayoutRect(this.xOriginIframeHandler_.iframe);
      var box = this.getLayoutBox();
      this.iframeLayoutBox_ = _srcLayoutRect.moveLayoutRect(iframeBox, -box.left, -box.top);
    }
  };

  /**
   * @override
   */

  AmpAd3PImpl.prototype.getIntersectionElementLayoutBox = function getIntersectionElementLayoutBox() {
    if (!this.xOriginIframeHandler_ || !this.xOriginIframeHandler_.iframe) {
      return _AMP$BaseElement.prototype.getIntersectionElementLayoutBox.call(this);
    }
    var box = this.getLayoutBox();
    if (!this.iframeLayoutBox_) {
      this.measureIframeLayoutBox_();
    }
    // If the iframe is full size, we avoid an object allocation by moving box.
    return _srcLayoutRect.moveLayoutRect(box, this.iframeLayoutBox_.left, this.iframeLayoutBox_.top);
  };

  /** @override */

  AmpAd3PImpl.prototype.layoutCallback = function layoutCallback() {
    var _this2 = this;

    if (this.layoutPromise_) {
      return this.layoutPromise_;
    }
    this.lifecycleReporter.sendPing('preAdThrottle');
    _srcLog.user().assert(!this.isInFixedContainer_, '<amp-ad> is not allowed to be placed in elements with ' + 'position:fixed: %s', this.element);
    _concurrentLoad.incrementLoadingAds(this.win);
    return this.layoutPromise_ = _srcAdCid.getAdCid(this).then(function (cid) {
      _this2.uiHandler.setDisplayState(_ampAdUi.AdDisplayState.LOADING);
      var opt_context = {
        clientId: cid || null,
        container: _this2.container_
      };

      // In this path, the request and render start events are entangled,
      // because both happen inside a cross-domain iframe.  Separating them
      // here, though, allows us to measure the impact of ad throttling via
      // incrementLoadingAds().
      _this2.lifecycleReporter.sendPing('adRequestStart');
      var iframe = _src3pFrame.getIframe(_this2.element.ownerDocument.defaultView, _this2.element, undefined, opt_context);
      _this2.xOriginIframeHandler_ = new _ampAdXoriginIframeHandler.AmpAdXOriginIframeHandler(_this2);
      return _this2.xOriginIframeHandler_.init(iframe);
    });
  };

  /** @override  */

  AmpAd3PImpl.prototype.viewportCallback = function viewportCallback(inViewport) {
    if (this.xOriginIframeHandler_) {
      this.xOriginIframeHandler_.viewportCallback(inViewport);
    }
  };

  /** @override  */

  AmpAd3PImpl.prototype.unlayoutCallback = function unlayoutCallback() {
    this.layoutPromise_ = null;
    this.uiHandler.setDisplayState(_ampAdUi.AdDisplayState.NOT_LAID_OUT);
    if (this.xOriginIframeHandler_) {
      this.xOriginIframeHandler_.freeXOriginIframe();
      this.xOriginIframeHandler_ = null;
    }
    this.lifecycleReporter.sendPing('adSlotCleared');
    return true;
  };

  return AmpAd3PImpl;
})(AMP.BaseElement);

exports.AmpAd3PImpl = AmpAd3PImpl;

},{"../../../ads/_config":2,"../../../ads/google/a4a/performance":4,"../../../src/3p-frame":25,"../../../src/ad-cid":28,"../../../src/ad-helper":29,"../../../src/layout":50,"../../../src/layout-rect":49,"../../../src/log":51,"./a2a-listener":16,"./amp-ad-ui":19,"./amp-ad-xorigin-iframe-handler":20,"./concurrent-load":22}],18:[function(require,module,exports){
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

var _srcLayout = require('../../../src/layout');

var _srcLog = require('../../../src/log');

var _srcTemplate = require('../../../src/template');

var _srcXhr = require('../../../src/xhr');

var _srcUrl = require('../../../src/url');

var _srcDom = require('../../../src/dom');

var _ampAdUi = require('./amp-ad-ui');

/** @const {!string} Tag name for custom ad implementation. */
var TAG_AD_CUSTOM = 'amp-ad-custom';

exports.TAG_AD_CUSTOM = TAG_AD_CUSTOM;
/** @var {Object} A map of promises for each value of data-url. The promise
 *  will fetch data for the URL for the ad server, and return it as a map of
 *  objects, keyed by slot; each object contains the variables to be
 *   substituted into the mustache template. */
var ampCustomadXhrPromises = {};

/** @var {Object} a map of full urls (i.e. including the ampslots parameter)
 * for each value of data-url */
var ampCustomadFullUrls = null;

var AmpAdCustom = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpAdCustom, _AMP$BaseElement);

  /** @param {!AmpElement} element */

  function AmpAdCustom(element) {
    babelHelpers.classCallCheck(this, AmpAdCustom);

    _AMP$BaseElement.call(this, element);
    /** @private {string} The base URL of the ad server for this ad */
    this.url_ = element.getAttribute('data-url');

    /** @private {string} A string identifying this ad slot: the server's
     *  responses will be keyed by slot */
    this.slot_ = element.getAttribute('data-slot');

    /** {?AmpAdUIHandler} */
    this.uiHandler = null;
  }

  /** @override */

  AmpAdCustom.prototype.getPriority = function getPriority() {
    // Loads ads after other content.
    return 2;
  };

  /** @override **/

  AmpAdCustom.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    /** @TODO Add proper support for more layouts, and figure out which ones
     *  we're permitting */
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  AmpAdCustom.prototype.buildCallback = function buildCallback() {
    // Ensure that there are templates in this ad
    var templates = this.element.querySelectorAll('template');
    _srcLog.user().assert(templates.length > 0, 'Missing template in custom ad');
    // And ensure that the slot value is legal
    _srcLog.user().assert(this.slot_ === null || this.slot_.match(/^[0-9a-z]+$/), 'custom ad slot should be alphanumeric: ' + this.slot_);

    this.uiHandler = new _ampAdUi.AmpAdUIHandler(this);
    this.uiHandler.init();
  };

  /** @override */

  AmpAdCustom.prototype.layoutCallback = function layoutCallback() {
    var _this = this;

    /** @const {string} fullUrl */
    var fullUrl = this.getFullUrl_();
    // If this promise has no URL yet, create one for it.
    if (!(fullUrl in ampCustomadXhrPromises)) {
      // Here is a promise that will return the data for this URL
      ampCustomadXhrPromises[fullUrl] = _srcXhr.xhrFor(this.win).fetchJson(fullUrl);
    }
    return ampCustomadXhrPromises[fullUrl].then(function (data) {
      _this.uiHandler.setDisplayState(_ampAdUi.AdDisplayState.LOADING);
      var element = _this.element;
      // We will get here when the data has been fetched from the server
      var templateData = data;
      if (_this.slot_ !== null) {
        templateData = data.hasOwnProperty(_this.slot_) ? data[_this.slot_] : null;
      }
      // Set UI state
      _this.uiHandler.setDisplayState(templateData !== null && typeof templateData == 'object' ? _ampAdUi.AdDisplayState.LOADED_RENDER_START : _ampAdUi.AdDisplayState.LOADED_NO_CONTENT);
      _srcTemplate.templatesFor(_this.win).findAndRenderTemplate(element, templateData).then(function (renderedElement) {
        // Get here when the template has been rendered
        // Clear out the template and replace it by the rendered version
        _srcDom.removeChildren(element);
        element.appendChild(renderedElement);
        return _this;
      });
    });
  };

  /** @override  */

  AmpAdCustom.prototype.unlayoutCallback = function unlayoutCallback() {
    this.uiHandler.setDisplayState(_ampAdUi.AdDisplayState.NOT_LAID_OUT);
    return true;
  };

  /**
   * @private getFullUrl_ Get a URL which includes a parameter indicating
   * all slots to be fetched from this web server URL
   * @returns {string} The URL with the "ampslots" parameter appended
   */

  AmpAdCustom.prototype.getFullUrl_ = function getFullUrl_() {
    // If this ad doesn't have a slot defined, just return the base URL
    if (this.slot_ === null) {
      return this.url_;
    }
    if (ampCustomadFullUrls === null) {
      // The array of ad urls has not yet been built, do so now.
      ampCustomadFullUrls = {};
      var slots = {};

      // Get the parent body of this amp-ad element. It could be the body of
      // the main document, or it could be an enclosing iframe.
      var body = _srcDom.ancestorElementsByTag(this.element, 'BODY')[0];
      var elements = body.querySelectorAll('amp-ad[type=custom]');
      for (var index = 0; index < elements.length; index++) {
        var elem = elements[index];
        var url = elem.getAttribute('data-url');
        var slotId = elem.getAttribute('data-slot');
        if (slotId !== null) {
          if (!(url in slots)) {
            slots[url] = [];
          }
          slots[url].push(encodeURIComponent(slotId));
        }
      }
      for (var baseUrl in slots) {
        ampCustomadFullUrls[baseUrl] = _srcUrl.addParamToUrl(baseUrl, 'ampslots', slots[baseUrl].join(','));
      }
    }
    return ampCustomadFullUrls[this.url_];
  };

  return AmpAdCustom;
})(AMP.BaseElement);

exports.AmpAdCustom = AmpAdCustom;

},{"../../../src/dom":37,"../../../src/layout":50,"../../../src/log":51,"../../../src/template":71,"../../../src/url":75,"../../../src/xhr":85,"./amp-ad-ui":19}],19:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use baseInstance file except in compliance with the License.
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

var _srcLog = require('../../../src/log');

var _srcDom = require('../../../src/dom');

var _srcExperiments = require('../../../src/experiments');

var _srcLayout = require('../../../src/layout');

var TAG = 'AmpAdUIHandler';

/**
 * Ad display state.
 * @enum {number}
 */
var AdDisplayState = {
  /**
   * The ad has not been laid out, or the ad has already be unlaid out
   */
  NOT_LAID_OUT: 0,

  /**
   * The ad has been laid out, but runtime haven't received any response from
   * the ad server.
   */
  LOADING: 1,

  /**
   * The ad has been laid out, and runtime has received render-start msg from
   * ad server.
   * Not used now.
   */
  LOADED_RENDER_START: 2,

  /**
   * The ad has been laid out, and runtime has received no-content msg from
   * ad server.
   */
  LOADED_NO_CONTENT: 3
};

exports.AdDisplayState = AdDisplayState;

var AmpAdUIHandler = (function () {

  /**
   * @param {!AMP.BaseElement} baseInstance
   */

  function AmpAdUIHandler(baseInstance) {
    babelHelpers.classCallCheck(this, AmpAdUIHandler);

    /** @private {!AMP.BaseElement} */
    this.baseInstance_ = baseInstance;

    /** {number} */
    this.state = AdDisplayState.NOT_LAID_OUT;;

    /** {!boolean} */
    this.hasPageProvidedFallback_ = !!baseInstance.getFallback();
  }

  // Make the class available to other late loaded amp-ad implementations
  // without them having to depend on it directly.

  /**
   * TODO(@zhouyx): Add ad tag to the ad.
   */

  AmpAdUIHandler.prototype.init = function init() {
    if (!_srcExperiments.isExperimentOn(this.baseInstance_.win, _srcLayout.UX_EXPERIMENT)) {
      return;
    }

    if (this.hasPageProvidedFallback_) {
      return;
    }

    // Apply default fallback div when there's no default one
    var holder = _srcDom.createElementWithAttributes(document, 'div', {
      'fallback': ''
    });
    holder.classList.add('amp-ad-default-fallback');
    this.baseInstance_.element.appendChild(holder);
  };

  /**
   * Exposed function to ad that enable them to set UI to correct display state
   * @param {number} state
   */

  AmpAdUIHandler.prototype.setDisplayState = function setDisplayState(state) {
    if (this.state == AdDisplayState.NOT_LAID_OUT) {
      // Once unlayout UI applied, only another layout will change the UI again
      if (state != AdDisplayState.LOADING) {
        return;
      }
    }
    switch (state) {
      case AdDisplayState.LOADING:
        this.displayLoadingUI_();
        break;
      case AdDisplayState.LOADED_RENDER_START:
        this.displayRenderStartUI_();
        break;
      case AdDisplayState.LOADED_NO_CONTENT:
        this.displayNoContentUI_();
        break;
      case AdDisplayState.NOT_LAID_OUT:
        this.displayUnlayoutUI_();
        break;
      default:
        _srcLog.dev().error(TAG, 'state is not supported');
    }
  };

  /**
   * TODO(@zhouyx): apply placeholder, add ad loading indicator
   * @private
   */

  AmpAdUIHandler.prototype.displayLoadingUI_ = function displayLoadingUI_() {
    this.state = AdDisplayState.LOADING;
    this.baseInstance_.togglePlaceholder(true);
  };

  /**
   * TODO(@zhouyx): remove ad loading indicator
   * @private
   */

  AmpAdUIHandler.prototype.displayRenderStartUI_ = function displayRenderStartUI_() {
    this.state = AdDisplayState.LOADED_RENDER_START;
    this.baseInstance_.togglePlaceholder(false);
  };

  /**
   * Apply UI for laid out ad with no-content
   * If fallback exist try to display provided fallback
   * Else try to collapse the ad (Note: may not succeed)
   * TODO(@zhouyx): apply fallback, remove ad loading indicator
   * @private
   */

  AmpAdUIHandler.prototype.displayNoContentUI_ = function displayNoContentUI_() {
    var _this = this;

    // The order here is user provided fallback > collapse > default fallback
    if (this.hasPageProvidedFallback_) {
      this.baseInstance_.deferMutate(function () {
        if (_this.state == AdDisplayState.NOT_LAID_OUT) {
          // If already unlaid out, do not replace current placeholder then.
          return;
        }
        _this.baseInstance_.togglePlaceholder(false);
        _this.baseInstance_.toggleFallback(true);
        _this.state = AdDisplayState.LOADED_NO_CONTENT;
      });
    } else {
      this.baseInstance_.attemptChangeHeight(0).then(function () {
        _this.baseInstance_. /*OK*/collapse();
        _this.state = AdDisplayState.LOADED_NO_CONTENT;
      }, function () {
        // Apply default fallback when resize fail.
        _this.baseInstance_.togglePlaceholder(false);
        _this.baseInstance_.toggleFallback(true);
        _this.state = AdDisplayState.LOADED_NO_CONTENT;
      });
    }
  };

  /**
   * Apply UI for unlaid out ad
   * Hide fallback and show placeholder if exists
   * Once unlayout UI applied, only another layout will change the UI again
   * TODO(@zhouyx): remove ad loading indicator
   * @private
   */

  AmpAdUIHandler.prototype.displayUnlayoutUI_ = function displayUnlayoutUI_() {
    var _this2 = this;

    this.state = AdDisplayState.NOT_LAID_OUT;
    this.baseInstance_.deferMutate(function () {
      if (_this2.state != AdDisplayState.NOT_LAID_OUT) {
        return;
      }
      _this2.baseInstance_.togglePlaceholder(true);
      _this2.baseInstance_.toggleFallback(false);
    });
  };

  return AmpAdUIHandler;
})();

exports.AmpAdUIHandler = AmpAdUIHandler;
AMP.AmpAdUIHandler = AmpAdUIHandler;

},{"../../../src/dom":37,"../../../src/experiments":41,"../../../src/layout":50,"../../../src/log":51}],20:[function(require,module,exports){
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

var _srcDom = require('../../../src/dom');

var _srcIframeHelper = require('../../../src/iframe-helper');

var _srcIntersectionObserverPolyfill = require('../../../src/intersection-observer-polyfill');

var _srcViewer = require('../../../src/viewer');

var _srcLog = require('../../../src/log');

var _srcTimer = require('../../../src/timer');

var _srcStyle = require('../../../src/style');

var _ampAdUi = require('./amp-ad-ui');

var TIMEOUT_VALUE = 10000;

var AmpAdXOriginIframeHandler = (function () {

  /**
   * @param {!./amp-ad-3p-impl.AmpAd3PImpl|!../../amp-a4a/0.1/amp-a4a.AmpA4A} baseInstance
   */

  function AmpAdXOriginIframeHandler(baseInstance) {
    babelHelpers.classCallCheck(this, AmpAdXOriginIframeHandler);

    /** @private */
    this.baseInstance_ = baseInstance;

    /** @private {!Element} */
    this.element_ = baseInstance.element;

    /** @private {?AMP.AmpAdUIHandler} */
    this.uiHandler_ = baseInstance.uiHandler;

    /** {?Element} iframe instance */
    this.iframe = null;

    /** @private {?IntersectionObserverApi} */
    this.intersectionObserverApi_ = null;

    /** @private {SubscriptionApi} */
    this.embedStateApi_ = null;

    /** @private {!Array<!Function>} functions to unregister listeners */
    this.unlisteners_ = [];

    /** @private @const {!../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = _srcViewer.viewerForDoc(this.baseInstance_.getAmpDoc());

    /** @private {?Promise} */
    this.adResponsePromise_ = null;
  }

  // Make the class available to other late loaded amp-ad implementations
  // without them having to depend on it directly.

  /**
   * Sets up listeners and iframe state for iframe containing ad creative.
   * @param {!Element} iframe
   * @param {boolean=} opt_isA4A when true do not listen to ad response
   * @return {!Promise} awaiting render complete promise
   * @suppress {checkTypes}  // TODO(tdrl): Temporary, for lifecycleReporter.
   */

  AmpAdXOriginIframeHandler.prototype.init = function init(iframe, opt_isA4A) {
    var _this = this;

    _srcLog.dev().assert(!this.iframe, 'multiple invocations of init without destroy!');
    this.iframe = iframe;
    this.iframe.setAttribute('scrolling', 'no');
    this.baseInstance_.applyFillContent(this.iframe);

    // Init IntersectionObserver service.
    this.intersectionObserverApi_ = new _srcIntersectionObserverPolyfill.IntersectionObserverApi(this.baseInstance_, this.iframe, true);

    this.embedStateApi_ = new _srcIframeHelper.SubscriptionApi(this.iframe, 'send-embed-state', true, function () {
      return _this.sendEmbedInfo_(_this.baseInstance_.isInViewport());
    });
    // Triggered by context.reportRenderedEntityIdentifier(…) inside the ad
    // iframe.
    _srcIframeHelper.listenForOncePromise(this.iframe, 'entity-id', true).then(function (info) {
      _this.element_.creativeId = info.data.id;
    });

    // Install iframe resize API.
    this.unlisteners_.push(_srcIframeHelper.listenFor(this.iframe, 'embed-size', function (data, source, origin) {
      _this.updateSize_(data.height, data.width, source, origin);
    }, true, true));

    this.unlisteners_.push(this.viewer_.onVisibilityChanged(function () {
      _this.sendEmbedInfo_(_this.baseInstance_.isInViewport());
    }));

    if (opt_isA4A) {
      // A4A writes creative frame directly to page therefore does not expect
      // post message to unset visibility hidden
      this.element_.appendChild(this.iframe);
      return Promise.resolve();
    }

    // Install API that listen to ad response
    if (this.baseInstance_.config && this.baseInstance_.config.renderStartImplemented) {
      // If support render-start, create a race between render-start no-content
      this.adResponsePromise_ = _srcIframeHelper.listenForOncePromise(this.iframe, ['render-start', 'no-content'], true).then(function (info) {
        var data = info.data;
        if (data.type == 'render-start') {
          _this.renderStart_(info);
        } else {
          _this.noContent_();
        }
      });
    } else {
      // If NOT support render-start, listen to bootstrap-loaded no-content
      // respectively
      this.adResponsePromise_ = _srcIframeHelper.listenForOncePromise(this.iframe, 'bootstrap-loaded', true);
      _srcIframeHelper.listenForOncePromise(this.iframe, 'no-content', true).then(function () {
        return _this.noContent_();
      });
    }

    // Set iframe initially hidden which will be removed on load event +
    // post message.
    _srcStyle.setStyle(this.iframe, 'visibility', 'hidden');

    this.element_.appendChild(this.iframe);
    return _srcTimer.timerFor(this.baseInstance_.win).timeoutPromise(TIMEOUT_VALUE, this.adResponsePromise_, 'timeout waiting for ad response')['catch'](function (e) {
      _this.noContent_();
      _srcLog.user().warn('AMP-AD', e);
    }).then(function () {
      if (_this.iframe) {
        _srcStyle.setStyle(_this.iframe, 'visibility', '');
      }
    });
  };

  /**
   * callback functon on receiving render-start
   * @param {!Object} info
   * @private
   */

  AmpAdXOriginIframeHandler.prototype.renderStart_ = function renderStart_(info) {
    var data = info.data;
    this.uiHandler_.setDisplayState(_ampAdUi.AdDisplayState.LOADED_RENDER_START);
    this.updateSize_(data.height, data.width, info.source, info.origin);
    if (this.baseInstance_.lifecycleReporter) {
      this.baseInstance_.lifecycleReporter.sendPing('renderCrossDomainStart');
    }
  };

  /**
   * Cleans up the listeners on the cross domain ad iframe.
   * And free the iframe resource
   * @param {boolean=} opt_keep
   */

  AmpAdXOriginIframeHandler.prototype.freeXOriginIframe = function freeXOriginIframe(opt_keep) {
    this.cleanup_();
    // If ask to keep the iframe.
    // Use in the case of no-content and iframe is a master iframe.
    if (opt_keep) {
      return;
    }
    if (this.iframe) {
      _srcDom.removeElement(this.iframe);
      this.iframe = null;
    }
  };

  /**
   * Cleans up listeners on the ad, and apply the default UI for ad.
   * @private
   */

  AmpAdXOriginIframeHandler.prototype.noContent_ = function noContent_() {
    if (!this.iframe) {
      // unlayout already called
      return;
    }
    this.freeXOriginIframe(this.iframe.name.indexOf('_master') >= 0);
    this.uiHandler_.setDisplayState(_ampAdUi.AdDisplayState.LOADED_NO_CONTENT);
  };

  /**
   * Cleans up listeners on the ad iframe.
   * @private
   */

  AmpAdXOriginIframeHandler.prototype.cleanup_ = function cleanup_() {
    this.unlisteners_.forEach(function (unlistener) {
      return unlistener();
    });
    this.unlisteners_.length = 0;
    if (this.embedStateApi_) {
      this.embedStateApi_.destroy();
      this.embedStateApi_ = null;
    }
    if (this.intersectionObserverApi_) {
      this.intersectionObserverApi_.destroy();
      this.intersectionObserverApi_ = null;
    }
  };

  /**
   * Updates the element's dimensions to accommodate the iframe's
   * requested dimensions. Notifies the window that request the resize
   * of success or failure.
   * @param {number|string|undefined} height
   * @param {number|string|undefined} width
   * @param {!Window} source
   * @param {string} origin
   * @private
   */

  AmpAdXOriginIframeHandler.prototype.updateSize_ = function updateSize_(height, width, source, origin) {
    var _this2 = this;

    // Calculate new width and height of the container to include the padding.
    // If padding is negative, just use the requested width and height directly.
    var newHeight = undefined,
        newWidth = undefined;
    height = parseInt(height, 10);
    if (!isNaN(height)) {
      newHeight = Math.max(this.element_. /*OK*/offsetHeight + height - this.iframe. /*OK*/offsetHeight, height);
    }
    width = parseInt(width, 10);
    if (!isNaN(width)) {
      newWidth = Math.max(this.element_. /*OK*/offsetWidth + width - this.iframe. /*OK*/offsetWidth, width);
    }
    if (newHeight !== undefined || newWidth !== undefined) {
      this.baseInstance_.attemptChangeSize(newHeight, newWidth).then(function () {
        _this2.sendEmbedSizeResponse_(true, /* success */newWidth, newHeight, source, origin);
      }, function () {
        return _this2.sendEmbedSizeResponse_(false, /* success */newWidth, newHeight, source, origin);
      });
    }
  };

  /**
   * Sends a response to the window which requested a resize.
   * @param {boolean} success
   * @param {number} requestedWidth
   * @param {number} requestedHeight
   * @param {!Window} source
   * @param {string} origin
   * @private
   */

  AmpAdXOriginIframeHandler.prototype.sendEmbedSizeResponse_ = function sendEmbedSizeResponse_(success, requestedWidth, requestedHeight, source, origin) {
    // The iframe may have been removed by the time we resize.
    if (!this.iframe) {
      return;
    }
    _srcIframeHelper.postMessageToWindows(this.iframe, [{ win: source, origin: origin }], success ? 'embed-size-changed' : 'embed-size-denied', { requestedWidth: requestedWidth, requestedHeight: requestedHeight }, true);
  };

  /**
   * @param {boolean} inViewport
   * @private
   */

  AmpAdXOriginIframeHandler.prototype.sendEmbedInfo_ = function sendEmbedInfo_(inViewport) {
    if (!this.embedStateApi_) {
      return;
    }
    this.embedStateApi_.send('embed-state', {
      inViewport: inViewport,
      pageHidden: !this.viewer_.isVisible()
    });
  };

  /**
   * See BaseElement method.
   * @param {boolean} inViewport
   */

  AmpAdXOriginIframeHandler.prototype.viewportCallback = function viewportCallback(inViewport) {
    if (this.intersectionObserverApi_) {
      this.intersectionObserverApi_.onViewportCallback(inViewport);
    }
    this.sendEmbedInfo_(inViewport);
  };

  /**
   * See BaseElement method.
   */

  AmpAdXOriginIframeHandler.prototype.onLayoutMeasure = function onLayoutMeasure() {
    // When the framework has the need to remeasure us, our position might
    // have changed. Send an intersection record if needed.
    if (this.intersectionObserverApi_) {
      this.intersectionObserverApi_.fire();
    }
  };

  return AmpAdXOriginIframeHandler;
})();

exports.AmpAdXOriginIframeHandler = AmpAdXOriginIframeHandler;
AMP.AmpAdXOriginIframeHandler = AmpAdXOriginIframeHandler;

},{"../../../src/dom":37,"../../../src/iframe-helper":45,"../../../src/intersection-observer-polyfill":47,"../../../src/log":51,"../../../src/style":70,"../../../src/timer":72,"../../../src/viewer":83,"./amp-ad-ui":19}],21:[function(require,module,exports){
exports.__esModule = true;
/* Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _buildAmpAd01Css = require('../../../build/amp-ad-0.1.css');

var _srcLayout = require('../../../src/layout');

var _ampAd3pImpl = require('./amp-ad-3p-impl');

var _ampAdCustom = require('./amp-ad-custom');

var _ads_a4aConfig = require('../../../ads/_a4a-config');

var _srcLog = require('../../../src/log');

var _srcExtensions = require('../../../src/extensions');

var _srcUserNotification = require('../../../src/user-notification');

var _srcExperiments = require('../../../src/experiments');

/**
 * Construct ad network type-specific tag and script name.  Note that this
 * omits the version number and '.js' suffix for the extension script, which
 * will be handled by the extension loader.
 *
 * @param {!string} type
 * @return !string
 * @private
 */
function networkImplementationTag(type) {
  return 'amp-ad-network-' + type + '-impl';
}

var AmpAd = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpAd, _AMP$BaseElement);

  function AmpAd() {
    babelHelpers.classCallCheck(this, AmpAd);

    _AMP$BaseElement.apply(this, arguments);
  }

  /** @override */

  AmpAd.prototype.upgradeCallback = function upgradeCallback() {
    var _this = this;

    // Block whole ad load if a consent is needed.
    /** @const {string} */
    var consentId = this.element.getAttribute('data-consent-notification-id');
    var consent = consentId ? _srcUserNotification.userNotificationManagerFor(this.win).then(function (service) {
      return service.get(consentId);
    }) : Promise.resolve();

    return consent.then(function () {
      var type = _this.element.getAttribute('type');
      if (!type) {
        // Unspecified or empty type.  Nothing to do here except bail out.
        return null;
      }
      // Check for the custom ad type (no ad network, self-service)
      if (type === 'custom' && _srcExperiments.isExperimentOn(_this.win, 'ad-type-custom')) {
        return new _ampAdCustom.AmpAdCustom(_this.element);
      }
      window.ampAdSlotIdCounter = window.ampAdSlotIdCounter || 0;
      var slotId = window.ampAdSlotIdCounter++;
      _this.element.setAttribute('data-amp-slot-index', slotId);
      // TODO(tdrl): Check amp-ad registry to see if they have this already.
      if (!_ads_a4aConfig.a4aRegistry[type] || !_ads_a4aConfig.a4aRegistry[type](_this.win, _this.element)) {
        // Network either has not provided any A4A implementation or the
        // implementation exists, but has explicitly chosen not to handle this
        // tag as A4A.  Fall back to the 3p implementation.
        return new _ampAd3pImpl.AmpAd3PImpl(_this.element);
      }
      var extensionTagName = networkImplementationTag(type);
      _this.element.setAttribute('data-a4a-upgrade-type', extensionTagName);
      return _srcExtensions.extensionsFor(_this.win).loadElementClass(extensionTagName).then(function (ctor) {
        return new ctor(_this.element);
      })['catch'](function (error) {
        // Work around presubmit restrictions.
        var TAG = _this.element.tagName;
        // Report error and fallback to 3p
        _srcLog.user().error(TAG, 'Unable to load ad implementation for type ', type, ', falling back to 3p, error: ', error);
        return new _ampAd3pImpl.AmpAd3PImpl(_this.element);
      });
    });
  };

  /** @override */

  AmpAd.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  /** @override */

  AmpAd.prototype.buildCallback = function buildCallback() {
    // This is only called when no type was set on the element and thus
    // upgrade element fell through.
    _srcLog.dev().assert(this.element.getAttribute('type'), 'Required attribute type');
  };

  return AmpAd;
})(AMP.BaseElement);

exports.AmpAd = AmpAd;

AMP.registerElement('amp-ad', AmpAd, _buildAmpAd01Css.CSS);
AMP.registerElement('amp-embed', AmpAd, _buildAmpAd01Css.CSS);

},{"../../../ads/_a4a-config":1,"../../../build/amp-ad-0.1.css":9,"../../../src/experiments":41,"../../../src/extensions":43,"../../../src/layout":50,"../../../src/log":51,"../../../src/user-notification":76,"./amp-ad-3p-impl":17,"./amp-ad-custom":18}],22:[function(require,module,exports){
exports.__esModule = true;
exports.allowRenderOutsideViewport = allowRenderOutsideViewport;
exports.decrementLoadingAds = decrementLoadingAds;
exports.incrementLoadingAds = incrementLoadingAds;
/* Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var _srcTimer = require('../../../src/timer');

/**
 * Store loading ads info within window to ensure it can be properly stored
 * across separately compiled binaries that share load throttling.
 * @const ID of window variable used to track 3p ads waiting to load.
 */
var LOADING_ADS_WIN_ID_ = '3pla';

/**
 * @param {!Element} element
 * @param {!Window} win
 * @return {number|boolean}
 */

function allowRenderOutsideViewport(element, win) {
  // Store in window Object that serves as a set of timers associated with
  // waiting elements.
  var loadingAds = win[LOADING_ADS_WIN_ID_] || {};
  // If another ad is currently loading we only load ads that are currently
  // in viewport.
  for (var key in loadingAds) {
    if (Object.prototype.hasOwnProperty.call(loadingAds, key)) {
      return false;
    }
  }

  // Ad opts into lazier loading strategy where we only load ads that are
  // at closer than 1.25 viewports away.
  if (element.getAttribute('data-loading-strategy') == 'prefer-viewability-over-views') {
    return 1.25;
  }
  return true;
}

/**
 * Decrements loading ads count used for throttling.
 * @param {number|string} timerId of timer returned from incrementLoadingAds
 * @param {!Window} win
 */

function decrementLoadingAds(timerId, win) {
  _srcTimer.timerFor(win).cancel(timerId);
  var loadingAds = win[LOADING_ADS_WIN_ID_];
  if (loadingAds) {
    delete loadingAds[timerId];
  }
}

/**
 * Increments loading ads count for throttling.
 * @param {!Window} win
 * @return {number|string} timer ID for testing
 */

function incrementLoadingAds(win) {
  var loadingAds = win[LOADING_ADS_WIN_ID_];
  if (!loadingAds) {
    loadingAds = {};
    win[LOADING_ADS_WIN_ID_] = loadingAds;
  }

  /** @const {number|string} */
  var timerId = _srcTimer.timerFor(win).delay(function () {
    // Unfortunately we don't really have a good way to measure how long it
    // takes to load an ad, so we'll just pretend it takes 1 second for
    // now.
    decrementLoadingAds(timerId, win);
  }, 1000);
  loadingAds[timerId] = 1;
  return timerId;
}

},{"../../../src/timer":72}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
exports.__esModule = true;
exports.getIframe = getIframe;
exports.addDataAndJsonAttributes_ = addDataAndJsonAttributes_;
exports.preloadBootstrap = preloadBootstrap;
exports.getBootstrapBaseUrl = getBootstrapBaseUrl;
exports.setDefaultBootstrapBaseUrlForTesting = setDefaultBootstrapBaseUrlForTesting;
exports.resetBootstrapBaseUrlForTesting = resetBootstrapBaseUrlForTesting;
exports.getSubDomain = getSubDomain;
exports.generateSentinel = generateSentinel;
exports.resetCountForTesting = resetCountForTesting;
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

var _documentInfo = require('./document-info');

var _srcLayout = require('../src/layout');

var _json = require('./json');

var _mode = require('./mode');

var _modeObject = require('./mode-object');

var _string = require('./string');

var _url = require('./url');

var _viewer = require('./viewer');

var _config = require('./config');

var _style = require('./style');

var _utilsDomFingerprint = require('./utils/dom-fingerprint');

/** @type {!Object<string,number>} Number of 3p frames on the for that type. */
var count = {};

/** @type {string} */
var overrideBootstrapBaseUrl = undefined;

/**
 * Produces the attributes for the ad template.
 * @param {!Window} parentWindow
 * @param {!Element} element
 * @param {string=} opt_type
 * @param {Object=} opt_context
 * @return {!Object} Contains
 *     - type, width, height, src attributes of <amp-ad> tag. These have
 *       precedence over the data- attributes.
 *     - data-* attributes of the <amp-ad> tag with the "data-" removed.
 *     - A _context object for internal use.
 */
function getFrameAttributes(parentWindow, element, opt_type, opt_context) {
  var startTime = Date.now();
  var width = element.getAttribute('width');
  var height = element.getAttribute('height');
  var type = opt_type || element.getAttribute('type');
  _log.user().assert(type, 'Attribute type required for <amp-ad>: %s', element);
  var attributes = {};
  // Do these first, as the other attributes have precedence.
  addDataAndJsonAttributes_(element, attributes);
  attributes.width = _srcLayout.getLengthNumeral(width);
  attributes.height = _srcLayout.getLengthNumeral(height);
  attributes.type = type;
  var docInfo = _documentInfo.documentInfoForDoc(element);
  var viewer = _viewer.viewerForDoc(element);
  var locationHref = parentWindow.location.href;
  // This is really only needed for tests, but whatever. Children
  // see us as the logical origin, so telling them we are about:srcdoc
  // will fail ancestor checks.
  if (locationHref == 'about:srcdoc') {
    locationHref = parentWindow.parent.location.href;
  }
  attributes._context = {
    referrer: viewer.getUnconfirmedReferrerUrl(),
    canonicalUrl: docInfo.canonicalUrl,
    pageViewId: docInfo.pageViewId,
    location: {
      href: locationHref
    },
    tagName: element.tagName,
    mode: _modeObject.getModeObject(),
    canary: !!(parentWindow.AMP_CONFIG && parentWindow.AMP_CONFIG.canary),
    hidden: !viewer.isVisible(),
    amp3pSentinel: generateSentinel(parentWindow),
    initialIntersection: element.getIntersectionChangeEntry(),
    domFingerprint: _utilsDomFingerprint.domFingerprint(element),
    startTime: startTime
  };
  Object.assign(attributes._context, opt_context);
  var adSrc = element.getAttribute('src');
  if (adSrc) {
    attributes.src = adSrc;
  }
  return attributes;
}

/**
 * Creates the iframe for the embed. Applies correct size and passes the embed
 * attributes to the frame via JSON inside the fragment.
 * @param {!Window} parentWindow
 * @param {!Element} parentElement
 * @param {string=} opt_type
 * @param {Object=} opt_context
 * @return {!Element} The iframe.
 */

function getIframe(parentWindow, parentElement, opt_type, opt_context) {
  // Check that the parentElement is already in DOM. This code uses a new and
  // fast `isConnected` API and thus only used when it's available.
  _log.dev().assert(parentElement['isConnected'] === undefined || parentElement['isConnected'] === true, 'Parent element must be in DOM');
  var attributes = getFrameAttributes(parentWindow, parentElement, opt_type, opt_context);
  var iframe = parentWindow.document.createElement('iframe');
  if (!count[attributes.type]) {
    count[attributes.type] = 0;
  }

  var baseUrl = getBootstrapBaseUrl(parentWindow);
  var host = _url.parseUrl(baseUrl).hostname;
  // Pass ad attributes to iframe via the fragment.
  var src = baseUrl + '#' + JSON.stringify(attributes);
  var name = host + '_' + attributes.type + '_' + count[attributes.type]++;

  iframe.src = src;
  iframe.name = name;
  iframe.ampLocation = _url.parseUrl(src);
  iframe.width = attributes.width;
  iframe.height = attributes.height;
  iframe.setAttribute('scrolling', 'no');
  _style.setStyle(iframe, 'border', 'none');
  /** @this {!Element} */
  iframe.onload = function () {
    // Chrome does not reflect the iframe readystate.
    this.readyState = 'complete';
  };
  iframe.setAttribute('data-amp-3p-sentinel', attributes._context.amp3pSentinel);
  return iframe;
}

/**
 * Copies data- attributes from the element into the attributes object.
 * Removes the data- from the name and capitalizes after -. If there
 * is an attribute called json, parses the JSON and adds it to the
 * attributes.
 * @param {!Element} element
 * @param {!Object} attributes The destination.
 * visibleForTesting
 */

function addDataAndJsonAttributes_(element, attributes) {
  for (var i = 0; i < element.attributes.length; i++) {
    var attr = element.attributes[i];
    if (attr.name.indexOf('data-') != 0) {
      continue;
    }
    attributes[_string.dashToCamelCase(attr.name.substr(5))] = attr.value;
  }
  var json = element.getAttribute('json');
  if (json) {
    var obj = _json.tryParseJson(json);
    if (obj === undefined) {
      throw _log.user().createError('Error parsing JSON in json attribute in element %s', element);
    }
    for (var key in obj) {
      attributes[key] = obj[key];
    }
  }
}

/**
 * Preloads URLs related to the bootstrap iframe.
 * @param {!Window} window
 * @param {!./preconnect.Preconnect} preconnect
 */

function preloadBootstrap(window, preconnect) {
  var url = getBootstrapBaseUrl(window);
  preconnect.preload(url, 'document');

  // While the URL may point to a custom domain, this URL will always be
  // fetched by it.
  var scriptUrl = _mode.getMode().localDev ? getAdsLocalhost(window) + '/dist.3p/current/integration.js' : _config.urls.thirdParty + '/1480694828544/f.js';
  preconnect.preload(scriptUrl, 'script');
}

/**
 * Returns the base URL for 3p bootstrap iframes.
 * @param {!Window} parentWindow
 * @param {boolean=} opt_strictForUnitTest
 * @return {string}
 * @visibleForTesting
 */

function getBootstrapBaseUrl(parentWindow, opt_strictForUnitTest) {
  // The value is cached in a global variable called `bootstrapBaseUrl`;
  var bootstrapBaseUrl = parentWindow.bootstrapBaseUrl;
  if (bootstrapBaseUrl) {
    return bootstrapBaseUrl;
  }
  return parentWindow.bootstrapBaseUrl = getCustomBootstrapBaseUrl(parentWindow, opt_strictForUnitTest) || getDefaultBootstrapBaseUrl(parentWindow);
}

function setDefaultBootstrapBaseUrlForTesting(url) {
  overrideBootstrapBaseUrl = url;
}

function resetBootstrapBaseUrlForTesting(win) {
  win.bootstrapBaseUrl = undefined;
}

/**
 * Returns the default base URL for 3p bootstrap iframes.
 * @param {!Window} parentWindow
 * @return {string}
 */
function getDefaultBootstrapBaseUrl(parentWindow) {
  if (_mode.getMode().localDev || _mode.getMode().test) {
    if (overrideBootstrapBaseUrl) {
      return overrideBootstrapBaseUrl;
    }
    return getAdsLocalhost(parentWindow) + '/dist.3p/' + (_mode.getMode().minified ? '1480694828544/frame' : 'current/frame.max') + '.html';
  }
  return 'https://' + getSubDomain(parentWindow) + ('.' + _config.urls.thirdPartyFrameHost + '/1480694828544/frame.html');
}

function getAdsLocalhost(win) {
  if (_config.urls.localDev) {
    return '//' + _config.urls.thirdPartyFrameHost;
  }
  return 'http://ads.localhost:' + (win.location.port || win.parent.location.port);
}

/**
 * Sub domain on which the 3p iframe will be hosted.
 * Because we only calculate the URL once per page, this function is only
 * called once and hence all frames on a page use the same URL.
 * @return {string}
 * @visibleForTesting
 */

function getSubDomain(win) {
  return 'd-' + getRandom(win);
}

/**
 * Generates a random non-negative integer.
 * @param {!Window} win
 * @return {string}
 */
function getRandom(win) {
  var rand = undefined;
  if (win.crypto && win.crypto.getRandomValues) {
    // By default use 2 32 bit integers.
    var uint32array = new Uint32Array(2);
    win.crypto.getRandomValues(uint32array);
    rand = String(uint32array[0]) + uint32array[1];
  } else {
    // Fall back to Math.random.
    rand = String(win.Math.random()).substr(2) + '0';
  }
  return rand;
}

/**
 * Returns the custom base URL for 3p bootstrap iframes if it exists.
 * Otherwise null.
 * @param {!Window} parentWindow
 * @param {boolean=} opt_strictForUnitTest
 * @return {?string}
 */
function getCustomBootstrapBaseUrl(parentWindow, opt_strictForUnitTest) {
  var meta = parentWindow.document.querySelector('meta[name="amp-3p-iframe-src"]');
  if (!meta) {
    return null;
  }
  var url = _url.assertHttpsUrl(meta.getAttribute('content'), meta);
  _log.user().assert(url.indexOf('?') == -1, '3p iframe url must not include query string %s in element %s.', url, meta);
  // This is not a security primitive, we just don't want this to happen in
  // practice. People could still redirect to the same origin, but they cannot
  // redirect to the proxy origin which is the important one.
  var parsed = _url.parseUrl(url);
  _log.user().assert(parsed.hostname == 'localhost' && !opt_strictForUnitTest || parsed.origin != _url.parseUrl(parentWindow.location.href).origin, '3p iframe url must not be on the same origin as the current doc' + 'ument %s (%s) in element %s. See https://github.com/ampproject/amphtml' + '/blob/master/spec/amp-iframe-origin-policy.md for details.', url, parsed.origin, meta);
  return url + '?1480694828544';
}

/**
 * Returns a randomized sentinel value for 3p iframes.
 * The format is "%d-%d" with the first value being the depth of current
 * window in the window hierarchy and the second a random integer.
 * @param {!Window} parentWindow
 * @return {string}
 * @visibleForTesting
 */

function generateSentinel(parentWindow) {
  var windowDepth = 0;
  for (var win = parentWindow; win && win != win.parent; win = win.parent) {
    windowDepth++;
  }
  return String(windowDepth) + '-' + getRandom(parentWindow);
}

/**
 * Resets the count of each 3p frame type
 * @visibleForTesting
 */

function resetCountForTesting() {
  count = {};
}

},{"../src/layout":50,"./config":31,"./document-info":34,"./json":48,"./log":51,"./mode":53,"./mode-object":52,"./string":68,"./style":70,"./url":75,"./utils/dom-fingerprint":80,"./viewer":83}],26:[function(require,module,exports){
exports.__esModule = true;
exports.accessServiceFor = accessServiceFor;
exports.accessServiceForOrNull = accessServiceForOrNull;
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

var _elementService = require('./element-service');

/**
 * Returns a promise for the Access service.
 * @param {!Window} win
 * @return {!Promise<!AccessService>}
 */

function accessServiceFor(win) {
  return (/** @type {!Promise<!AccessService>} */_elementService.getElementService(win, 'access', 'amp-access')
  );
}

/**
 * Returns a promise for the Access service or a promise for null if the service
 * is not available on the current page.
 * @param {!Window} win
 * @return {!Promise<?AccessService>}
 */

function accessServiceForOrNull(win) {
  return (/** @type {!Promise<?AccessService>} */_elementService.getElementServiceIfAvailable(win, 'access', 'amp-access')
  );
}

},{"./element-service":38}],27:[function(require,module,exports){
exports.__esModule = true;
exports.activityFor = activityFor;
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

var _elementService = require('./element-service');

/**
 * @param {!Window} win
 * @return {!Promise<!Activity>}
 */

function activityFor(win) {
  return (/** @type {!Promise<!Activity>} */_elementService.getElementService(win, 'activity', 'amp-analytics')
  );
}

;

},{"./element-service":38}],28:[function(require,module,exports){
exports.__esModule = true;
exports.getAdCid = getAdCid;
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

var _cid = require('./cid');

var _ads_config = require('../ads/_config');

var _srcLog = require('../src/log');

var _srcTimer = require('../src/timer');

/**
 * @param {AMP.BaseElement} adElement
 * @return {!Promise<string|undefined>} A promise for a CID or undefined if
 *     - the ad network does not request one or
 *     - `amp-analytics` which provides the CID service was not installed.
 */

function getAdCid(adElement) {
  var config = _ads_config.adConfig[adElement.element.getAttribute('type')];
  /** @const {?string} */
  var scope = config ? config.clientIdScope : null;

  if (!scope) {
    return Promise.resolve();
  }
  var cidPromise = _cid.cidForOrNull(adElement.win).then(function (cidService) {
    if (!cidService) {
      return;
    }
    return cidService.get(_srcLog.dev().assertString(scope), Promise.resolve())['catch'](function (error) {
      // Not getting a CID is not fatal.
      _srcLog.dev().error('AD-CID', error);
      return undefined;
    });
  });
  // The CID should never be crucial for an ad. If it does not come within
  // 1 second, assume it will never arrive.
  return _srcTimer.timerFor(adElement.win).timeoutPromise(1000, cidPromise, 'cid timeout')['catch'](function (error) {
    // Timeout is not fatal.
    _srcLog.dev().warn('AD-CID', error);
    return undefined;
  });
}

},{"../ads/_config":2,"../src/log":51,"../src/timer":72,"./cid":30}],29:[function(require,module,exports){
exports.__esModule = true;
exports.isAdPositionAllowed = isAdPositionAllowed;
exports.getAdContainer = getAdContainer;
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

var _log = require('./log');

/**
 * Tags that are allowed to have fixed positioning
 * @const {!Object<string, boolean>}
 */
var CONTAINERS = {
  'AMP-FX-FLYING-CARPET': true,
  'AMP-LIGHTBOX': true,
  'AMP-STICKY-AD': true
};

/**
 * Determines if an element is fixed-positioned.
 * OK to use, because it's only called from onLayoutMeasure
 * @param {!Element} el
 * @param {!Window} win
 * @return {boolean}
 */
function isPositionFixed(el, win) {
  return win. /*OK*/getComputedStyle(el).position == 'fixed';
}

/**
 * @param {!Element} element
 * @param {!Window} win
 * @return {boolean} whether the element position is allowed. If the element
 * belongs to CONTAINERS, it is allowed to be position fixed.
 * If the element has a position fixed ancestor, it is not allowed.
 * This should only be called when a layout on the page was just forced
 * anyway.
 */

function isAdPositionAllowed(element, win) {
  var hasFixedAncestor = false;
  var containers = 0;
  var el = element;
  do {
    if (CONTAINERS[el.tagName]) {
      // The containers must not themselves be contained in a fixed-position
      // element. Continue the search.
      containers++;
      hasFixedAncestor = false;
    } else if (isPositionFixed(_log.dev().assertElement(el), win)) {
      // Because certain blessed elements may contain a position fixed
      // container (which contain an ad), we continue to search the
      // ancestry tree.
      hasFixedAncestor = true;
    }
    el = el.parentElement;
  } while (el && el.tagName != 'BODY');
  return !hasFixedAncestor && containers <= 1;
}

/**
 * Returns the blessed container element tagName if the ad is contained by one.
 * This is called during layout measure.
 * @param {!Element} element
 * @return {?string}
 */

function getAdContainer(element) {
  var el = element;
  do {
    el = el.parentElement;
    if (CONTAINERS[el.tagName]) {
      return el.tagName;
    }
  } while (el && el.tagName != 'BODY');
  return null;
}

},{"./log":51}],30:[function(require,module,exports){
exports.__esModule = true;
exports.cidFor = cidFor;
exports.cidForOrNull = cidForOrNull;
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
 * @fileoverview Factory for ./service/cid-impl.js
 */

var _elementService = require('./element-service');

/**
 * @param {!Window} window
 * @return {!Promise<!Cid>}
 */

function cidFor(window) {
  return (/** @type {!Promise<!Cid>} */_elementService.getElementService(window, 'cid', 'amp-analytics')
  );
}

;

/**
 * Returns a promise for the CID service or a promise for null if the service
 * is not available on the current page.
 * @param {!Window} window
 * @return {!Promise<?Cid>}
 */

function cidForOrNull(window) {
  return (/** @type {!Promise<?Cid>} */_elementService.getElementServiceIfAvailable(window, 'cid', 'amp-analytics')
  );
}

;

},{"./element-service":38}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
exports.__esModule = true;
exports.cryptoFor = cryptoFor;
exports.stringHash32 = stringHash32;
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

var _elementService = require('./element-service');

/**
 * @param {!Window} window
 * @return {!Promise<!../extensions/amp-analytics/0.1/crypto-impl.Crypto>}
 */

function cryptoFor(window) {
  return (/** @type {!Promise<
         !../extensions/amp-analytics/0.1/crypto-impl.Crypto>} */_elementService.getElementService(window, 'crypto', 'amp-analytics')
  );
}

/**
 * Hash function djb2a
 * This is intended to be a simple, fast hashing function using minimal code.
 * It does *not* have good cryptographic properties.
 * @param {string} str
 * @return {string} 32-bit unsigned hash of the string
 */

function stringHash32(str) {
  var length = str.length;
  var hash = 5381;
  for (var i = 0; i < length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  }
  // Convert from 32-bit signed to unsigned.
  return String(hash >>> 0);
}

;

},{"./element-service":38}],34:[function(require,module,exports){
exports.__esModule = true;
exports.documentInfoForDoc = documentInfoForDoc;
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
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/document-info-impl.DocumentInfoDef} Info about the doc
 */

function documentInfoForDoc(nodeOrDoc) {
  return (/** @type {!./service/document-info-impl.DocInfo} */_service.getExistingServiceForDoc(nodeOrDoc, 'documentInfo').get()
  );
}

},{"./service":64}],35:[function(require,module,exports){
exports.__esModule = true;
exports.isDocumentReady = isDocumentReady;
exports.onDocumentReady = onDocumentReady;
exports.whenDocumentReady = whenDocumentReady;
exports.whenDocumentComplete = whenDocumentComplete;
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
 * Whether the document is ready.
 * @param {!Document} doc
 * @return {boolean}
 */

function isDocumentReady(doc) {
  return doc.readyState != 'loading' && doc.readyState != 'uninitialized';
}

/**
 * Whether the document has loaded all the css and sub-resources.
 * @param {!Document} doc
 * @return {boolean}
 */
function isDocumentComplete(doc) {
  return doc.readyState == 'complete';
}

/**
 * Calls the callback when document is ready.
 * @param {!Document} doc
 * @param {function(!Document)} callback
 */

function onDocumentReady(doc, callback) {
  onDocumentState(doc, isDocumentReady, callback);
}

/**
 * Calls the callback when document's state satisfies the stateFn.
 * @param {!Document} doc
 * @param {function(!Document):boolean} stateFn
 * @param {function(!Document)} callback
 */
function onDocumentState(doc, stateFn, callback) {
  var ready = stateFn(doc);
  if (ready) {
    callback(doc);
  } else {
    (function () {
      var readyListener = function () {
        if (stateFn(doc)) {
          if (!ready) {
            ready = true;
            callback(doc);
          }
          doc.removeEventListener('readystatechange', readyListener);
        }
      };
      doc.addEventListener('readystatechange', readyListener);
    })();
  }
}

/**
 * Returns a promise that is resolved when document is ready.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */

function whenDocumentReady(doc) {
  return new Promise(function (resolve) {
    onDocumentReady(doc, resolve);
  });
}

/**
 * Returns a promise that is resolved when document is complete.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */

function whenDocumentComplete(doc) {
  return new Promise(function (resolve) {
    onDocumentState(doc, isDocumentComplete, resolve);
  });
}

},{}],36:[function(require,module,exports){
exports.__esModule = true;
exports.documentStateFor = documentStateFor;
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

var _observable = require('./observable');

var _service = require('./service');

var _style = require('./style');

var _dom = require('./dom');

/**
 */

var DocumentState = (function () {
  /**
   * @param {!Window} win
   */

  function DocumentState(win) {
    babelHelpers.classCallCheck(this, DocumentState);

    /** @const {!Window} */
    this.win = win;

    /** @private @const {!Document} */
    this.document_ = win.document;

    /** @private {string|null} */
    this.hiddenProp_ = _style.getVendorJsPropertyName(this.document_, 'hidden', true);
    if (this.document_[this.hiddenProp_] === undefined) {
      this.hiddenProp_ = null;
    }

    /** @private {string|null} */
    this.visibilityStateProp_ = _style.getVendorJsPropertyName(this.document_, 'visibilityState', true);
    if (this.document_[this.visibilityStateProp_] === undefined) {
      this.visibilityStateProp_ = null;
    }

    /** @private @const {!Observable} */
    this.visibilityObservable_ = new _observable.Observable();

    /** @private {string|null} */
    this.visibilityChangeEvent_ = null;
    if (this.hiddenProp_) {
      this.visibilityChangeEvent_ = 'visibilitychange';
      var vendorStop = this.hiddenProp_.indexOf('Hidden');
      if (vendorStop != -1) {
        this.visibilityChangeEvent_ = this.hiddenProp_.substring(0, vendorStop) + 'Visibilitychange';
      }
    }

    /** @private @const {!Function} */
    this.boundOnVisibilityChanged_ = this.onVisibilityChanged_.bind(this);
    if (this.visibilityChangeEvent_) {
      this.document_.addEventListener(this.visibilityChangeEvent_, this.boundOnVisibilityChanged_);
    }

    /** @private {?Observable} */
    this.bodyAvailableObservable_ = null;
  }

  /**
   * @param {!Window} window
   * @return {!DocumentState}
   */

  /** @private */

  DocumentState.prototype.cleanup_ = function cleanup_() {
    if (this.visibilityChangeEvent_) {
      this.document_.removeEventListener(this.visibilityChangeEvent_, this.boundOnVisibilityChanged_);
    }
  };

  /**
   * Returns the value of "document.hidden" property. The reasons why it may
   * not be visible include document in a non-active tab or when the document
   * is being pre-rendered via link with rel="prerender".
   * @return {boolean}
   */

  DocumentState.prototype.isHidden = function isHidden() {
    if (!this.hiddenProp_) {
      return false;
    }
    return this.document_[this.hiddenProp_];
  };

  /**
   * Returns the value of "document.visibilityState" property. Possible values
   * are: 'hidden', 'visible', 'prerender', and 'unloaded'.
   * @return {string}
   */

  DocumentState.prototype.getVisibilityState = function getVisibilityState() {
    if (!this.visibilityStateProp_) {
      return this.isHidden() ? 'hidden' : 'visible';
    }
    return this.document_[this.visibilityStateProp_];
  };

  /**
   * @param {function()} handler
   * @return {!UnlistenDef}
   */

  DocumentState.prototype.onVisibilityChanged = function onVisibilityChanged(handler) {
    return this.visibilityObservable_.add(handler);
  };

  /** @private */

  DocumentState.prototype.onVisibilityChanged_ = function onVisibilityChanged_() {
    this.visibilityObservable_.fire();
  };

  /**
   * If body is already available, callback is called synchronously and null
   * is returned.
   * @param {function()} handler
   * @return {?UnlistenDef}
   */

  DocumentState.prototype.onBodyAvailable = function onBodyAvailable(handler) {
    var doc = this.document_;
    if (doc.body) {
      handler();
      return null;
    }
    if (!this.bodyAvailableObservable_) {
      this.bodyAvailableObservable_ = new _observable.Observable();
      _dom.waitForChild(doc.documentElement, function () {
        return !!doc.body;
      }, this.onBodyAvailable_.bind(this));
    }
    return this.bodyAvailableObservable_.add(handler);
  };

  /** @private */

  DocumentState.prototype.onBodyAvailable_ = function onBodyAvailable_() {
    this.bodyAvailableObservable_.fire();
    this.bodyAvailableObservable_.removeAll();
    this.bodyAvailableObservable_ = null;
  };

  return DocumentState;
})();

exports.DocumentState = DocumentState;

function documentStateFor(window) {
  return _service.fromClass(window, 'documentState', DocumentState);
}

},{"./dom":37,"./observable":54,"./service":64,"./style":70}],37:[function(require,module,exports){
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

},{"../third_party/css-escape/css-escape":86,"./log":51,"./types":73}],38:[function(require,module,exports){
exports.__esModule = true;
exports.getElementService = getElementService;
exports.getElementServiceIfAvailable = getElementServiceIfAvailable;
exports.getElementServiceForDoc = getElementServiceForDoc;
exports.getElementServiceIfAvailableForDoc = getElementServiceIfAvailableForDoc;
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

var _service = require('./service');

var _log = require('./log');

var _dom = require('./dom');

var dom = babelHelpers.interopRequireWildcard(_dom);

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * viewportForDoc(...)) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} providedByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<*>}
 */

function getElementService(win, id, providedByElement) {
  return getElementServiceIfAvailable(win, id, providedByElement).then(function (service) {
    return _log.user().assert(service, 'Service %s was requested to be provided through %s, ' + 'but %s is not loaded in the current page. To fix this ' + 'problem load the JavaScript file for %s in this page.', id, providedByElement, providedByElement, providedByElement);
  });
}

/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} providedByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<?Object>}
 */

function getElementServiceIfAvailable(win, id, providedByElement) {
  var s = _service.getServicePromiseOrNull(win, id);
  if (s) {
    return (/** @type {!Promise<?Object>} */s
    );
  }
  // Microtask is necessary to ensure that window.ampExtendedElements has been
  // initialized.
  return Promise.resolve().then(function () {
    if (isElementScheduled(win, providedByElement)) {
      return _service.getServicePromise(win, id);
    }
    // Wait for HEAD to fully form before denying access to the service.
    return dom.waitForBodyPromise(win.document).then(function () {
      if (isElementScheduled(win, providedByElement)) {
        return _service.getServicePromise(win, id);
      }
      return null;
    });
  });
}

/**
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @return {boolean} Whether this element is scheduled to be loaded.
 */
function isElementScheduled(win, elementName) {
  // Set in custom-element.js
  // TODO(@dvoytenko, #5454): Why hasn't this been created yet.
  if (!win.ampExtendedElements) {
    return false;
  }
  return !!win.ampExtendedElements[elementName];
}

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * viewportForDoc(...)) for type safety and because the factory should not be
 * passed around.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {string} providedByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<*>}
 */

function getElementServiceForDoc(nodeOrDoc, id, providedByElement) {
  return getElementServiceIfAvailableForDoc(nodeOrDoc, id, providedByElement).then(function (service) {
    return _log.user().assert(service, 'Service %s was requested to be provided through %s, ' + 'but %s is not loaded in the current page. To fix this ' + 'problem load the JavaScript file for %s in this page.', id, providedByElement, providedByElement, providedByElement);
  });
}

/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {string} providedByElement Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<?Object>}
 */

function getElementServiceIfAvailableForDoc(nodeOrDoc, id, providedByElement) {
  var ampdoc = _service.getAmpdoc(nodeOrDoc);
  var s = _service.getServicePromiseOrNullForDoc(nodeOrDoc, id);
  if (s) {
    return (/** @type {!Promise<?Object>} */s
    );
  }
  // Microtask is necessary to ensure that window.ampExtendedElements has been
  // initialized.
  return Promise.resolve().then(function () {
    if (isElementScheduled(ampdoc.win, providedByElement)) {
      return _service.getServicePromiseForDoc(nodeOrDoc, id);
    }
    // Wait for HEAD to fully form before denying access to the service.
    return ampdoc.whenBodyAvailable().then(function () {
      if (isElementScheduled(ampdoc.win, providedByElement)) {
        return _service.getServicePromiseForDoc(nodeOrDoc, id);
      }
      return null;
    });
  });
}

},{"./dom":37,"./log":51,"./service":64}],39:[function(require,module,exports){
exports.__esModule = true;
exports.reportError = reportError;
exports.cancellation = cancellation;
exports.installErrorReporting = installErrorReporting;
exports.getErrorReportUrl = getErrorReportUrl;
exports.detectNonAmpJs = detectNonAmpJs;
exports.resetAccumulatedErrorMessagesForTesting = resetAccumulatedErrorMessagesForTesting;
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

var _exponentialBackoff = require('./exponential-backoff');

var _eventHelper = require('./event-helper');

var _log = require('./log');

var _styleInstaller = require('./style-installer');

var _config = require('./config');

var _url = require('./url');

var CANCELLED = 'CANCELLED';

/**
 * Collects error messages, so they can be included in subsequent reports.
 * That allows identifying errors that might be caused by previous errors.
 */
var accumulatedErrorMessages = self.AMPErrors || [];
// Use a true global, to avoid multi-module inclusion issues.
self.AMPErrors = accumulatedErrorMessages;

/**
 * A wrapper around our exponentialBackoff, to lazy initialize it to avoid an
 * un-DCE'able side-effect.
 * @param {function()} work the function to execute after backoff
 * @return {number} the setTimeout id
 */
var globalExponentialBackoff = function (work) {
  // Set globalExponentialBackoff as the lazy-created function. JS Vooodoooo.
  globalExponentialBackoff = _exponentialBackoff.exponentialBackoff(1.5);
  return globalExponentialBackoff(work);
};

/**
 * Reports an error. If the error has an "associatedElement" property
 * the element is marked with the -amp-element-error and displays
 * the message itself. The message is always send to the console.
 * If the error has a "messageArray" property, that array is logged.
 * This way one gets the native fidelity of the console for things like
 * elements instead of stringification.
 * @param {*} error
 * @param {!Element=} opt_associatedElement
 */

function reportError(error, opt_associatedElement) {
  if (!self.console) {
    return;
  }
  if (!error) {
    error = new Error('no error supplied');
  }
  if (error.reported) {
    return;
  }
  error.reported = true;
  var element = opt_associatedElement || error.associatedElement;
  if (element && element.classList) {
    element.classList.add('-amp-error');
    if (_mode.getMode().development) {
      element.classList.add('-amp-element-error');
      element.setAttribute('error-message', error.message);
    }
  }
  if (error.messageArray) {
    (console.error || console.log).apply(console, error.messageArray);
  } else {
    if (element) {
      (console.error || console.log).call(console, element.tagName + '#' + element.id, error.message);
    } else if (!_mode.getMode().minified) {
      (console.error || console.log).call(console, error.stack);
    } else {
      (console.error || console.log).call(console, error.message);
    }
  }
  if (element && element.dispatchCustomEventForTesting) {
    element.dispatchCustomEventForTesting('amp:error', error.message);
  }
  // 'call' to make linter happy. And .call to make compiler happy
  // that expects some @this.
  reportErrorToServer['call'](undefined, undefined, undefined, undefined, undefined, error);
}

/**
 * Returns an error for a cancellation of a promise.
 * @return {!Error}
 */

function cancellation() {
  return new Error(CANCELLED);
}

/**
 * Install handling of global unhandled exceptions.
 * @param {!Window} win
 */

function installErrorReporting(win) {
  win.onerror = /** @type {!Function} */reportErrorToServer;
  win.addEventListener('unhandledrejection', function (event) {
    reportError(event.reason || new Error('rejected promise ' + event));
  });
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {*|undefined} error
 * @this {!Window|undefined}
 */
function reportErrorToServer(message, filename, line, col, error) {
  // Make an attempt to unhide the body.
  if (this && this.document) {
    _styleInstaller.makeBodyVisible(this.document);
  }
  if (_mode.getMode().localDev || _mode.getMode().development || _mode.getMode().test) {
    return;
  }
  var hasNonAmpJs = false;
  try {
    hasNonAmpJs = detectNonAmpJs(self);
  } catch (ignore) {
    // Ignore errors during error report generation.
  }
  if (hasNonAmpJs && Math.random() > 0.01) {
    // Only report 1% of errors on pages with non-AMP JS.
    // These errors can almost never be acted upon, but spikes such as
    // due to buggy browser extensions may be helpful to notify authors.
    return;
  }
  var url = getErrorReportUrl(message, filename, line, col, error, hasNonAmpJs);
  globalExponentialBackoff(function () {
    if (url) {
      new Image().src = url;
    }
  });
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {*|undefined} error
 * @param {boolean} hasNonAmpJs
 * @return {string|undefined} The URL
 * visibleForTesting
 */

function getErrorReportUrl(message, filename, line, col, error, hasNonAmpJs) {
  message = error && error.message ? error.message : message;
  if (/_reported_/.test(message)) {
    return;
  }
  if (message == CANCELLED) {
    return;
  }
  if (!message) {
    message = 'Unknown error';
  }
  if (_eventHelper.isLoadErrorMessage(message)) {
    return;
  }

  // This is the App Engine app in
  // ../tools/errortracker
  // It stores error reports via https://cloud.google.com/error-reporting/
  // for analyzing production issues.
  var url = _config.urls.errorReporting + '?v=' + encodeURIComponent('1480694828544') + '&noAmp=' + (hasNonAmpJs ? 1 : 0) + '&m=' + encodeURIComponent(message.replace(_log.USER_ERROR_SENTINEL, '')) + '&a=' + (_log.isUserErrorMessage(message) ? 1 : 0);
  if (self.context && self.context.location) {
    url += '&3p=1';
  }
  if (self.AMP_CONFIG && self.AMP_CONFIG.canary) {
    url += '&ca=1';
  }
  if (self.location.ancestorOrigins && self.location.ancestorOrigins[0]) {
    url += '&or=' + encodeURIComponent(self.location.ancestorOrigins[0]);
  }
  if (self.viewerState) {
    url += '&vs=' + encodeURIComponent(self.viewerState);
  }
  // Is embedded?
  if (self.parent && self.parent != self) {
    url += '&iem=1';
  }

  if (self.AMP.viewer) {
    var resolvedViewerUrl = self.AMP.viewer.getResolvedViewerUrl();
    var messagingOrigin = self.AMP.viewer.maybeGetMessagingOrigin();
    if (resolvedViewerUrl) {
      url += '&rvu=' + encodeURIComponent(resolvedViewerUrl);
    }
    if (messagingOrigin) {
      url += '&mso=' + encodeURIComponent(messagingOrigin);
    }
  }

  if (error) {
    var tagName = error && error.associatedElement ? error.associatedElement.tagName : 'u'; // Unknown
    url += '&el=' + encodeURIComponent(tagName) + '&s=' + encodeURIComponent(error.stack || '');
    error.message += ' _reported_';
  } else {
    url += '&f=' + encodeURIComponent(filename || '') + '&l=' + encodeURIComponent(line || '') + '&c=' + encodeURIComponent(col || '');
  }
  url += '&r=' + encodeURIComponent(self.document.referrer);
  url += '&ae=' + encodeURIComponent(accumulatedErrorMessages.join(','));
  accumulatedErrorMessages.push(message);
  url += '&fr=' + encodeURIComponent(self.location.originalHash || self.location.hash);

  return url;
}

/**
 * Returns true if it appears like there is non-AMP JS on the
 * current page.
 * @param {!Window} win
 * @visibleForTesting
 */

function detectNonAmpJs(win) {
  var scripts = win.document.querySelectorAll('script[src]');
  for (var i = 0; i < scripts.length; i++) {
    if (!_url.isProxyOrigin(scripts[i].src.toLowerCase())) {
      return true;
    }
  }
  return false;
}

function resetAccumulatedErrorMessagesForTesting() {
  accumulatedErrorMessages = [];
}

},{"./config":31,"./event-helper":40,"./exponential-backoff":42,"./log":51,"./mode":53,"./style-installer":69,"./url":75}],40:[function(require,module,exports){
exports.__esModule = true;
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.listenOncePromise = listenOncePromise;
exports.isLoaded = isLoaded;
exports.loadPromise = loadPromise;
exports.isLoadErrorMessage = isLoadErrorMessage;
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

var _timer = require('./timer');

var _log = require('./log');

/** @const {string}  */
var LOAD_FAILURE_PREFIX = 'Failed to load:';

/**
 * Listens for the specified event on the element.
 * @param {?EventTarget} element
 * @param {string} eventType
 * @param {?function(Event)} listener
 * @param {boolean=} opt_capture
 * @return {!UnlistenDef}
 */

function listen(element, eventType, listener, opt_capture) {
  var capture = opt_capture || false;
  element.addEventListener(eventType, listener, capture);
  return function () {
    if (element) {
      element.removeEventListener(eventType, listener, capture);
    }
    listener = null;
    element = null;
  };
}

/**
 * Listens for the specified event on the element and removes the listener
 * as soon as event has been received.
 * @param {?EventTarget} element
 * @param {string} eventType
 * @param {?function(Event)} listener
 * @param {boolean=} opt_capture
 * @return {!UnlistenDef}
 */

function listenOnce(element, eventType, listener, opt_capture) {
  var capture = opt_capture || false;
  var unlisten = undefined;
  var proxy = function (event) {
    listener(event);
    unlisten();
  };
  unlisten = function () {
    if (element) {
      element.removeEventListener(eventType, proxy, capture);
    }
    element = null;
    proxy = null;
    listener = null;
  };
  element.addEventListener(eventType, proxy, capture);
  return unlisten;
}

/**
 * Returns  a promise that will resolve as soon as the specified event has
 * fired on the element. Optionally, opt_timeout can be specified that will
 * reject the promise if the event has not fired by then.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {boolean=} opt_capture
 * @param {number=} opt_timeout
 * @return {!Promise<!Event>}
 */

function listenOncePromise(element, eventType, opt_capture, opt_timeout) {
  var unlisten = undefined;
  var eventPromise = new Promise(function (resolve, unusedReject) {
    unlisten = listenOnce(element, eventType, resolve, opt_capture);
  });
  return racePromise_(eventPromise, unlisten, undefined, opt_timeout);
}

/**
 * Whether the specified element/window has been loaded already.
 * @param {!Element|!Window} eleOrWindow
 * @return {boolean}
 */

function isLoaded(eleOrWindow) {
  return !!(eleOrWindow.complete || eleOrWindow.readyState == 'complete'
  // If the passed in thing is a Window, infer loaded state from
  //
   || eleOrWindow.document && eleOrWindow.document.readyState == 'complete');
}

/**
 * Returns a promise that will resolve or fail based on the eleOrWindow's 'load'
 * and 'error' events. Optionally this method takes a timeout, which will reject
 * the promise if the resource has not loaded by then.
 * @param {T} eleOrWindow Supports both Elements and as a special case Windows.
 * @param {number=} opt_timeout
 * @return {!Promise<T>}
 * @template T
 */

function loadPromise(eleOrWindow, opt_timeout) {
  var unlistenLoad = undefined;
  var unlistenError = undefined;
  if (isLoaded(eleOrWindow)) {
    return Promise.resolve(eleOrWindow);
  }
  var loadingPromise = new Promise(function (resolve, reject) {
    // Listen once since IE 5/6/7 fire the onload event continuously for
    // animated GIFs.
    var tagName = eleOrWindow.tagName;
    if (tagName === 'AUDIO' || tagName === 'VIDEO') {
      unlistenLoad = listenOnce(eleOrWindow, 'loadstart', resolve);
    } else {
      unlistenLoad = listenOnce(eleOrWindow, 'load', resolve);
    }
    // For elements, unlisten on error (don't for Windows).
    if (tagName) {
      unlistenError = listenOnce(eleOrWindow, 'error', reject);
    }
  });
  loadingPromise = loadingPromise.then(function () {
    return eleOrWindow;
  }, failedToLoad);
  return racePromise_(loadingPromise, unlistenLoad, unlistenError, opt_timeout);
}

/**
 * Emit error on load failure.
 * @param {*} event
 */
function failedToLoad(event) {
  // Report failed loads as user errors so that they automatically go
  // into the "document error" bucket.
  var target = event.target;
  if (target && target.src) {
    target = target.src;
  }
  throw _log.user().createError(LOAD_FAILURE_PREFIX, target);
}

/**
 * Returns true if this error message is was created for a load error.
 * @param {string} message An error message
 * @return {boolean}
 */

function isLoadErrorMessage(message) {
  return message.indexOf(LOAD_FAILURE_PREFIX) != -1;
}

/**
 * @param {!Promise<TYPE>} promise
 * @param {UnlistenDef|undefined} unlisten1
 * @param {UnlistenDef|undefined} unlisten2
 * @param {number|undefined} timeout
 * @return {!Promise<TYPE>}
 * @template TYPE
 */
function racePromise_(promise, unlisten1, unlisten2, timeout) {
  var racePromise = undefined;
  if (timeout === undefined) {
    // Timeout is not specified: return promise.
    racePromise = promise;
  } else {
    // Timeout has been specified: add a timeout condition.
    racePromise = _timer.timerFor(self).timeoutPromise(timeout || 0, promise);
  }
  if (unlisten1) {
    racePromise.then(unlisten1, unlisten1);
  }
  if (unlisten2) {
    racePromise.then(unlisten2, unlisten2);
  }
  return racePromise;
}

},{"./log":51,"./timer":72}],41:[function(require,module,exports){
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

},{"./cookies":32,"./url":75}],42:[function(require,module,exports){
exports.__esModule = true;
exports.exponentialBackoff = exponentialBackoff;
exports.exponentialBackoffClock = exponentialBackoffClock;
exports.getJitter = getJitter;
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
 * @param {number=} opt_base Exponential base. Defaults to 2.
 * @return {function(function()): number} Function that when invoked will
 *     call the passed in function. On every invocation the next
 *     invocation of the passed in function will be exponentially
 *     later. Returned function returns timeout id.
 */

function exponentialBackoff(opt_base) {
  var getTimeout = exponentialBackoffClock(opt_base);
  return function (work) {
    return setTimeout(work, getTimeout());
  };
}

/**
 * @param {number=} opt_base Exponential base. Defaults to 2.
 * @return {function(): number} Function that when invoked will return
 *    a number that exponentially grows per invocation.
 */

function exponentialBackoffClock(opt_base) {
  var base = opt_base || 2;
  var count = 0;
  return function () {
    var wait = Math.pow(base, count++);
    wait += getJitter(wait);
    return wait * 1000;
  };
}

/**
 * Add jitter to avoid the thundering herd. This can e.g. happen when
 * we poll a backend and it fails for everyone at the same time.
 * We add up to 30% (default) longer or shorter than the given time.
 *
 * @param {number} wait the amount if base milliseconds
 * @param {number=} opt_perc the min/max percentage to add or sutract
 * @return {number}
 */

function getJitter(wait, opt_perc) {
  opt_perc = opt_perc || .3;
  var jitter = wait * opt_perc * Math.random();
  if (Math.random() > .5) {
    jitter *= -1;
  }
  return jitter;
}

},{}],43:[function(require,module,exports){
exports.__esModule = true;
exports.extensionsFor = extensionsFor;
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

var _service = require('./service');

/**
 * @param {!Window} window
 * @return {!./service/extensions-impl.Extensions}
 */

function extensionsFor(window) {
  return (/** @type {!./service/extensions-impl.Extensions} */_service.getExistingServiceForWindow(window, 'extensions')
  );
}

;

},{"./service":64}],44:[function(require,module,exports){
exports.__esModule = true;
exports.setSrcdocSupportedForTesting = setSrcdocSupportedForTesting;
exports.installFriendlyIframeEmbed = installFriendlyIframeEmbed;
exports.mergeHtmlForTesting = mergeHtmlForTesting;
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

var _log = require('./log');

var _service = require('./service');

var _dom = require('./dom');

var _extensions = require('./extensions');

var _documentReady = require('./document-ready');

var _eventHelper = require('./event-helper');

var _resources = require('./resources');

var _style = require('./style');

/**
 * Parameters used to create the new "friendly iframe" embed.
 * - html: The complete content of an AMP embed, which is itself an AMP
 *   document. Can include whatever is normally allowed in an AMP document,
 *   except for AMP `<script>` declarations. Those should be passed as an
 *   array of `extensionIds`.
 * - extensionsIds: An optional array of AMP extension IDs used in this embed.
 * - fonts: An optional array of fonts used in this embed.
 *
 * @typedef {{
 *   url: string,
 *   html: string,
 *   extensionIds: (?Array<string>|undefined),
 *   fonts: (?Array<string>|undefined),
 * }}
 */
var FriendlyIframeSpec = undefined;

exports.FriendlyIframeSpec = FriendlyIframeSpec;
/**
 * @type {boolean|undefined}
 * @visiblefortesting
 */
var srcdocSupported = undefined;

/**
 * @param {boolean|undefined} val
 * @visiblefortesting
 */

function setSrcdocSupportedForTesting(val) {
  srcdocSupported = val;
}

/**
 * Returns `true` if the Friendly Iframes are supported.
 * @return {boolean}
 */
function isSrcdocSupported() {
  if (srcdocSupported === undefined) {
    srcdocSupported = 'srcdoc' in HTMLIFrameElement.prototype;
  }
  return srcdocSupported;
}

/**
 * Creates the requested "friendly iframe" embed. Returns the promise that
 * will be resolved as soon as the embed is available. The actual
 * initialization of the embed will start as soon as the `iframe` is added
 * to the DOM.
 * @param {!HTMLIFrameElement} iframe
 * @param {!Element} container
 * @param {!FriendlyIframeSpec} spec
 * @param {function(!Window)=} opt_preinstallCallback
 * @return {!Promise<FriendlyIframeEmbed>}
 */

function installFriendlyIframeEmbed(iframe, container, spec, opt_preinstallCallback) {
  /** @const {!Window} */
  var win = _service.getTopWindow(iframe.ownerDocument.defaultView);
  /** @const {!./service/extensions-impl.Extensions} */
  var extensions = _extensions.extensionsFor(win);

  _style.setStyle(iframe, 'visibility', 'hidden');
  iframe.setAttribute('referrerpolicy', 'unsafe-url');

  // Pre-load extensions.
  if (spec.extensionIds) {
    spec.extensionIds.forEach(function (extensionId) {
      return extensions.loadExtension(extensionId);
    });
  }

  var html = mergeHtml(spec);

  // Receive the signal when iframe is ready: it's document is formed.
  iframe.onload = function () {
    // Chrome does not reflect the iframe readystate.
    iframe.readyState = 'complete';
  };
  var loadedPromise = undefined;
  if (isSrcdocSupported()) {
    iframe.srcdoc = html;
    loadedPromise = _eventHelper.loadPromise(iframe);
    container.appendChild(iframe);
  } else {
    iframe.src = 'about:blank';
    container.appendChild(iframe);
    var childDoc = iframe.contentWindow.document;
    childDoc.open();
    childDoc.write(html);
    // With document.write, `iframe.onload` arrives almost immediately, thus
    // we need to wait for child's `window.onload`.
    loadedPromise = _eventHelper.loadPromise(iframe.contentWindow);
    childDoc.close();
  }

  // Wait for document ready signal.
  // This is complicated due to crbug.com/649201 on Chrome and a similar issue
  // on Safari where newly created document's `readyState` immediately equals
  // `complete`, even though the document itself is not yet available. There's
  // no other reliable signal for `readyState` in a child window and thus
  // we have to fallback to polling.
  var readyPromise = undefined;
  if (isIframeReady(iframe)) {
    readyPromise = Promise.resolve();
  } else {
    readyPromise = new Promise(function (resolve) {
      /** @const {number} */
      var interval = win.setInterval(function () {
        if (isIframeReady(iframe)) {
          resolve();
          win.clearInterval(interval);
        }
      }, /* milliseconds */5);

      // For safety, make sure we definitely stop polling when child doc is
      // loaded.
      loadedPromise['catch'](function (error) {
        _log.rethrowAsync(error);
      }).then(function () {
        resolve();
        win.clearInterval(interval);
      });
    });
  }

  return readyPromise.then(function () {
    var childWin = /** @type {!Window} */iframe.contentWindow;
    // Add extensions.
    extensions.installExtensionsInChildWindow(childWin, spec.extensionIds || [], opt_preinstallCallback);
    // Ready to be shown.
    _style.setStyle(iframe, 'visibility', '');
    if (childWin.document && childWin.document.body) {
      _style.setStyles(_log.dev().assertElement(childWin.document.body), {
        opacity: 1,
        visibility: 'visible',
        animation: 'none'
      });
    }
    return new FriendlyIframeEmbed(iframe, spec, loadedPromise);
  });
}

/**
 * Returns `true` when iframe is ready.
 * @param {!HTMLIFrameElement} iframe
 * @return {boolean}
 */
function isIframeReady(iframe) {
  // This is complicated due to crbug.com/649201 on Chrome and a similar issue
  // on Safari where newly created document's `readyState` immediately equals
  // `complete`, even though the document itself is not yet available. There's
  // no other reliable signal for `readyState` in a child window and thus
  // the best way to check is to see the contents of the body.
  var childDoc = iframe.contentWindow && iframe.contentWindow.document;
  return !!(childDoc && _documentReady.isDocumentReady(childDoc) && childDoc.body && childDoc.body.firstChild);
}

/**
 * Merges base and fonts into html document.
 * @param {!FriendlyIframeSpec} spec
 */
function mergeHtml(spec) {
  var originalHtml = spec.html;
  var originalHtmlUp = originalHtml.toUpperCase();

  // Find the insertion point.
  var ip = originalHtmlUp.indexOf('<HEAD');
  if (ip != -1) {
    ip = originalHtmlUp.indexOf('>', ip + 1) + 1;
  }
  if (ip == -1) {
    ip = originalHtmlUp.indexOf('<BODY');
  }
  if (ip == -1) {
    ip = originalHtmlUp.indexOf('<HTML');
    if (ip != -1) {
      ip = originalHtmlUp.indexOf('>', ip + 1) + 1;
    }
  }

  var result = [];

  // Preambule.
  if (ip > 0) {
    result.push(originalHtml.substring(0, ip));
  }

  // Add <BASE> tag.
  result.push('<base href="' + _dom.escapeHtml(spec.url) + '">');

  // Load fonts.
  if (spec.fonts) {
    spec.fonts.forEach(function (font) {
      result.push('<link href="' + _dom.escapeHtml(font) + '" rel="stylesheet" type="text/css">');
    });
  }

  // Postambule.
  if (ip > 0) {
    result.push(originalHtml.substring(ip));
  } else {
    result.push(originalHtml);
  }

  return result.join('');
}

/**
 * Exposes `mergeHtml` for testing purposes.
 * @param {!FriendlyIframeSpec} spec
 * @visibleForTesting
 */

function mergeHtmlForTesting(spec) {
  return mergeHtml(spec);
}

/**
 * A "friendly iframe" embed. This is the iframe that's fully accessible to
 * the AMP runtime. It's similar to Shadow DOM in many respects, but it also
 * provides iframe/viewport measurements and enables the use of `vh`, `vw` and
 * `@media` CSS.
 *
 * The friendly iframe is managed by the top-level AMP Runtime. When it's
 * destroyed, the `destroy` method must be called to free up the shared
 * resources.
 */

var FriendlyIframeEmbed = (function () {

  /**
   * @param {!HTMLIFrameElement} iframe
   * @param {!FriendlyIframeSpec} spec
   * @param {!Promise} loadedPromise
   */

  function FriendlyIframeEmbed(iframe, spec, loadedPromise) {
    babelHelpers.classCallCheck(this, FriendlyIframeEmbed);

    /** @const {!HTMLIFrameElement} */
    this.iframe = iframe;

    /** @const {!Window} */
    this.win = /** @type{!Window} */iframe.contentWindow;

    /** @const {!FriendlyIframeSpec} */
    this.spec = spec;

    /** @private @const {!Promise} */
    this.loadedPromise_ = loadedPromise;
  }

  /**
   * Returns promise that will resolve when the child window has fully been
   * loaded.
   * @return {!Promise}
   */

  FriendlyIframeEmbed.prototype.whenLoaded = function whenLoaded() {
    return this.loadedPromise_;
  };

  /**
   * Ensures that all resources from this iframe have been released.
   */

  FriendlyIframeEmbed.prototype.destroy = function destroy() {
    _resources.resourcesForDoc(this.iframe).removeForChildWindow(this.win);
    _service.disposeServicesForEmbed(this.win);
  };

  return FriendlyIframeEmbed;
})();

exports.FriendlyIframeEmbed = FriendlyIframeEmbed;

},{"./document-ready":35,"./dom":37,"./event-helper":40,"./extensions":43,"./log":51,"./resources":63,"./service":64,"./style":70}],45:[function(require,module,exports){
exports.__esModule = true;
exports.listenFor = listenFor;
exports.listenForOncePromise = listenForOncePromise;
exports.postMessage = postMessage;
exports.postMessageToWindows = postMessageToWindows;
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

var _url = require('./url');

var _utilsArray = require('./utils/array');

/**
 * Sentinel used to force unlistening after a iframe is detached.
 * @type {string}
 */
var UNLISTEN_SENTINEL = 'unlisten';

/**
 * @typedef {{
 *   frame: !Element,
 *   events: !Object<string, !Array<function(!Object)>>
 * }}
 */
var WindowEventsDef = undefined;

/**
 * Returns a mapping from a URL's origin to an array of windows and their listenFor listeners.
 * @param {!Window} parentWin the window that created the iframe
 * @param {boolean=} opt_create create the mapping if it does not exist
 * @return {?Object<string, !Array<!WindowEventsDef>>}
 */
function getListenFors(parentWin, opt_create) {
  var listeningFors = parentWin.listeningFors;

  if (!listeningFors && opt_create) {
    listeningFors = parentWin.listeningFors = Object.create(null);
  }
  return listeningFors || null;
}

/**
 * Returns an array of WindowEventsDef that have had any listenFor listeners registered for this sentinel.
 * @param {!Window} parentWin the window that created the iframe
 * @param {string} sentinel the sentinel of the message
 * @param {boolean=} opt_create create the array if it does not exist
 * @return {?Array<!WindowEventsDef>}
 */
function getListenForSentinel(parentWin, sentinel, opt_create) {
  var listeningFors = getListenFors(parentWin, opt_create);
  if (!listeningFors) {
    return listeningFors;
  }

  var listenSentinel = listeningFors[sentinel];
  if (!listenSentinel && opt_create) {
    listenSentinel = listeningFors[sentinel] = [];
  }
  return listenSentinel || null;
}

/**
 * Returns an mapping of event names to listenFor listeners.
 * @param {!Window} parentWin the window that created the iframe
 * @param {!Element} iframe the iframe element who's context will trigger the
 *     event
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 * @return {?Object<string, !Array<function(!Object, !Window, string)>>}
 */
function getOrCreateListenForEvents(parentWin, iframe, opt_is3P) {
  var origin = _url.parseUrl(iframe.src).origin;
  var sentinel = getSentinel_(iframe, opt_is3P);
  var listenSentinel = getListenForSentinel(parentWin, sentinel, true);

  var windowEvents = undefined;
  for (var i = 0; i < listenSentinel.length; i++) {
    var we = listenSentinel[i];
    if (we.frame === iframe) {
      windowEvents = we;
      break;
    }
  }

  if (!windowEvents) {
    windowEvents = {
      frame: iframe,
      origin: origin,
      events: Object.create(null)
    };
    listenSentinel.push(windowEvents);
  }

  return windowEvents.events;
}

/**
 * Returns an mapping of event names to listenFor listeners.
 * @param {!Window} parentWin the window that created the iframe
 * @param {string} sentinel the sentinel of the message
 * @param {string} origin the source window's origin
 * @param {!Window} triggerWin the window that triggered the event
 * @return {?Object<string, !Array<function(!Object, !Window, string)>>}
 */
function getListenForEvents(parentWin, sentinel, origin, triggerWin) {
  var listenSentinel = getListenForSentinel(parentWin, sentinel);

  if (!listenSentinel) {
    return listenSentinel;
  }

  // Find the entry for the frame.
  // TODO(@nekodo): Add a WeakMap<Window, WindowEventsDef> cache to
  //     speed up this process.
  var windowEvents = undefined;
  for (var i = 0; i < listenSentinel.length; i++) {
    var we = listenSentinel[i];
    var contentWindow = we.frame.contentWindow;
    if (!contentWindow) {
      setTimeout(dropListenSentinel, 0, listenSentinel);
    } else if (sentinel === 'amp') {
      // A non-3P code path, origin must match.
      if (we.origin === origin && contentWindow == triggerWin) {
        windowEvents = we;
        break;
      }
    } else if (triggerWin == contentWindow || isDescendantWindow(contentWindow, triggerWin)) {
      // 3P code path, we may accept messages from nested frames.
      windowEvents = we;
      break;
    }
  }

  return windowEvents ? windowEvents.events : null;
}

/**
 * Checks whether one window is a descendant of another by climbing
 * the parent chain.
 * @param {!Window} ancestor potential ancestor window
 * @param {!Window} descendant potential descendant window
 * @return {boolean}
 */
function isDescendantWindow(ancestor, descendant) {
  for (var win = descendant; win && win != win.parent; win = win.parent) {
    if (win == ancestor) {
      return true;
    }
  }
  return false;
}

/**
 * Removes any listenFors registed on listenSentinel that do not have
 * a contentWindow (the frame was removed from the DOM tree).
 * @param {!Array<!WindowEventsDef>} listenSentinel
 */
function dropListenSentinel(listenSentinel) {
  var noopData = { sentinel: UNLISTEN_SENTINEL };

  for (var i = listenSentinel.length - 1; i >= 0; i--) {
    var windowEvents = listenSentinel[i];

    if (!windowEvents.frame.contentWindow) {
      listenSentinel.splice(i, 1);

      var events = windowEvents.events;
      for (var _name in events) {
        // Splice here, so that each unlisten does not shift the array
        events[_name].splice(0, Infinity).forEach(function (event) {
          event(noopData);
        });
      }
    }
  }
}

/**
 * Registers the global listenFor event listener if it has yet to be.
 * @param {!Window} parentWin
 */
function registerGlobalListenerIfNeeded(parentWin) {
  if (parentWin.listeningFors) {
    return;
  }
  var listenForListener = function (event) {
    if (!event.data) {
      return;
    }
    var data = parseIfNeeded(event.data);
    if (!data.sentinel) {
      return;
    }

    var listenForEvents = getListenForEvents(parentWin, data.sentinel, event.origin, event.source);
    if (!listenForEvents) {
      return;
    }

    var listeners = listenForEvents[data.type];
    if (!listeners) {
      return;
    }

    // We slice to avoid issues with adding another listener or unlistening
    // during iteration. We could move to a Doubly Linked List with
    // backtracking, but that's overly complicated.
    listeners = listeners.slice();
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener(data, event.source, event.origin);
    }
  };

  parentWin.addEventListener('message', listenForListener);
}

/**
 * Allows listening for message from the iframe. Returns an unlisten
 * function to remove the listener.
 *
 * @param {!Element} iframe.
 * @param {string} typeOfMessage.
 * @param {?function(!Object, !Window, string)} callback Called when a message of
 *     this type arrives for this iframe.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 * @param {boolean=} opt_includingNestedWindows set to true if a messages from
 *     nested frames should also be accepted.
 * @return {!UnlistenDef}
 */

function listenFor(iframe, typeOfMessage, callback, opt_is3P, opt_includingNestedWindows) {
  _log.dev().assert(iframe.src, 'only iframes with src supported');
  _log.dev().assert(!iframe.parentNode, 'cannot register events on an attached ' + 'iframe. It will cause hair-pulling bugs like #2942');
  _log.dev().assert(callback);
  var parentWin = iframe.ownerDocument.defaultView;

  registerGlobalListenerIfNeeded(parentWin);

  var listenForEvents = getOrCreateListenForEvents(parentWin, iframe, opt_is3P);

  var events = listenForEvents[typeOfMessage] || (listenForEvents[typeOfMessage] = []);

  var unlisten = undefined;
  var listener = function (data, source, origin) {
    // Exclude nested frames if necessary.
    // Note that the source was already verified to be either the contentWindow
    // of the iframe itself or a descendant window within it.
    if (!opt_includingNestedWindows && source != iframe.contentWindow) {
      return;
    }

    if (data.sentinel == UNLISTEN_SENTINEL) {
      unlisten();
      return;
    }
    callback(data, source, origin);
  };

  events.push(listener);

  return unlisten = function () {
    if (listener) {
      var index = events.indexOf(listener);
      if (index > -1) {
        events.splice(index, 1);
      }
      // Make sure references to the unlisten function do not keep
      // alive too much.
      listener = null;
      events = null;
      callback = null;
    }
  };
}

/**
 * Returns a promise that resolves when one of given messages has been observed
 * for the first time. And remove listener for all other messages.
 * @param {!Element} iframe
 * @param {string|!Array<string>} typeOfMessages
 * @param {boolean=} opt_is3P
 * @return {!Promise<!{data, source, origin}>}
 */

function listenForOncePromise(iframe, typeOfMessages, opt_is3P) {
  var unlistenList = [];
  if (typeof typeOfMessages == 'string') {
    typeOfMessages = [typeOfMessages];
  }
  return new Promise(function (resolve) {
    for (var i = 0; i < typeOfMessages.length; i++) {
      var message = typeOfMessages[i];
      var unlisten = listenFor(iframe, message, function (data, source, origin) {
        for (var _i = 0; _i < unlistenList.length; _i++) {
          unlistenList[_i]();
        }
        resolve({ data: data, source: source, origin: origin });
      }, opt_is3P);
      unlistenList.push(unlisten);
    }
  });
}

/**
 * Posts a message to the iframe.
 * @param {!Element} iframe The iframe.
 * @param {string} type Type of the message.
 * @param {!Object} object Message payload.
 * @param {string} targetOrigin origin of the target.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 */

function postMessage(iframe, type, object, targetOrigin, opt_is3P) {
  postMessageToWindows(iframe, [{ win: iframe.contentWindow, origin: targetOrigin }], type, object, opt_is3P);
}

/**
 * Posts an identical message to multiple target windows with the same
 * sentinel.
 * The message is serialized only once.
 * @param {!Element} iframe The iframe.
 * @param {!Array<{win: !Window, origin: string}>} targets to send the message
 *     to, pairs of window and its origin.
 * @param {string} type Type of the message.
 * @param {!Object} object Message payload.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 */

function postMessageToWindows(iframe, targets, type, object, opt_is3P) {
  if (!iframe.contentWindow) {
    return;
  }
  object.type = type;
  object.sentinel = getSentinel_(iframe, opt_is3P);
  var payload = object;
  if (opt_is3P) {
    // Serialize ourselves because that is much faster in Chrome.
    payload = 'amp-' + JSON.stringify(object);
  }
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    target.win. /*OK*/postMessage(payload, target.origin);
  }
}

/**
 * Gets the sentinel string.
 * @param {!Element} iframe The iframe.
 * @param {boolean=} opt_is3P set to true if the iframe is 3p.
 * @returns {string} Sentinel string.
 * @private
 */
function getSentinel_(iframe, opt_is3P) {
  return opt_is3P ? iframe.getAttribute('data-amp-3p-sentinel') : 'amp';
}

/**
 * Json parses event.data if it needs to be
 * @returns {!Object} object message
 * @private
 */
function parseIfNeeded(data) {
  var shouldBeParsed = typeof data === 'string' && data.charAt(0) === '{';
  if (shouldBeParsed) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      _log.dev().warn('IFRAME-HELPER', 'Postmessage could not be parsed. ' + 'Is it in a valid JSON format?', e);
    }
  }
  return (/** @type {!Object} */data
  );
}

/**
 * Manages a postMessage API for an iframe with a subscription message and
 * a way to broadcast messages to all subscribed windows, which
 * in turn must all be descendants of the contentWindow of the iframe.
 */

var SubscriptionApi = (function () {
  /**
   * @param {!Element} iframe The iframe.
   * @param {string} type Type of the subscription message.
   * @param {boolean} is3p set to true if the iframe is 3p.
   * @param {function(!Object, !Window, string)} requestCallback Callback
   *     invoked whenever a new window subscribes.
   */

  function SubscriptionApi(iframe, type, is3p, requestCallback) {
    var _this = this;

    babelHelpers.classCallCheck(this, SubscriptionApi);

    /** @private @const {!Element} */
    this.iframe_ = iframe;
    /** @private @const {boolean} */
    this.is3p_ = is3p;
    /** @private @const {!Array<{win: !Window, origin: string}>} */
    this.clientWindows_ = [];

    /** @private @const {!UnlistenDef} */
    this.unlisten_ = listenFor(this.iframe_, type, function (data, source, origin) {
      // This message might be from any window within the iframe, we need
      // to keep track of which windows want to be sent updates.
      if (!_this.clientWindows_.some(function (entry) {
        return entry.win == source;
      })) {
        _this.clientWindows_.push({ win: source, origin: origin });
      }
      requestCallback(data, source, origin);
    }, this.is3p_,
    // For 3P frames we also allow nested frames within them to subscribe..
    this.is3p_ /* opt_includingNestedWindows */);
  }

  /**
   * Sends a message to all subscribed windows.
   * @param {string} type Type of the message.
   * @param {!Object} data Message payload.
   */

  SubscriptionApi.prototype.send = function send(type, data) {
    // Remove clients that have been removed from the DOM.
    _utilsArray.filterSplice(this.clientWindows_, function (client) {
      return !!client.win.parent;
    });
    postMessageToWindows(this.iframe_, this.clientWindows_, type, data, this.is3p_);
  };

  SubscriptionApi.prototype.destroy = function destroy() {
    this.unlisten_();
    this.clientWindows_.length = 0;
  };

  return SubscriptionApi;
})();

exports.SubscriptionApi = SubscriptionApi;

},{"./log":51,"./url":75,"./utils/array":77}],46:[function(require,module,exports){
exports.__esModule = true;
exports.getTrackImpressionPromise = getTrackImpressionPromise;
exports.resetTrackImpressionPromiseForTesting = resetTrackImpressionPromiseForTesting;
exports.maybeTrackImpression = maybeTrackImpression;
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

var _log = require('./log');

var _experiments = require('./experiments');

var _viewer = require('./viewer');

var _xhr = require('./xhr');

var _url = require('./url');

var _timer = require('./timer');

var _mode = require('./mode');

var TIMEOUT_VALUE = 8000;

var trackImpressionPromise = null;

/**
 * A function to get the trackImpressionPromise;
 * @return {!Promise}
 */

function getTrackImpressionPromise() {
  return _log.dev().assert(trackImpressionPromise);
}

/**
 * Function that reset the trackImpressionPromise only for testing
 * @visibleForTesting
 */

function resetTrackImpressionPromiseForTesting() {
  trackImpressionPromise = null;
}

/**
 * Emit a HTTP request to a destination defined on the incoming URL.
 * Protected by experiment.
 * @param {!Window} win
 */

function maybeTrackImpression(win) {
  var resolveImpression = undefined;

  trackImpressionPromise = new Promise(function (resolve) {
    resolveImpression = resolve;
  });

  if (!_experiments.isExperimentOn(win, 'alp')) {
    resolveImpression();
    return;
  }

  var viewer = _viewer.viewerForDoc(win.document);
  /** @const {string|undefined} */
  var clickUrl = viewer.getParam('click');

  if (!clickUrl) {
    resolveImpression();
    return;
  }
  if (clickUrl.indexOf('https://') != 0) {
    _log.user().warn('IMPRESSION', 'click fragment param should start with https://. Found ', clickUrl);
    resolveImpression();
    return;
  }
  if (win.location.hash) {
    // This is typically done using replaceState inside the viewer.
    // If for some reason it failed, get rid of the fragment here to
    // avoid duplicate tracking.
    win.location.hash = '';
  }

  viewer.whenFirstVisible().then(function () {
    // TODO(@zhouyx) need test with a real response.
    var promise = invoke(win, _log.dev().assertString(clickUrl)).then(function (response) {
      applyResponse(win, viewer, response);
    });

    // Timeout invoke promise after 8s and resolve trackImpressionPromise.
    resolveImpression(_timer.timerFor(win).timeoutPromise(TIMEOUT_VALUE, promise, 'timeout waiting for ad server response')['catch'](function () {}));
  });
}

/**
 * Send the url to ad server and wait for its response
 * @param {!Window} win
 * @param {string} clickUrl
 * @return {!Promise<!JSONType>}
 */
function invoke(win, clickUrl) {
  if (_mode.getMode().localDev && !_mode.getMode().test) {
    clickUrl = 'http://localhost:8000/impression-proxy?url=' + clickUrl;
  }
  return _xhr.xhrFor(win).fetchJson(clickUrl, {
    credentials: 'include',
    requireAmpResponseSourceOrigin: true
  });
}

/**
 * parse the response back from ad server
 * Set for analytics purposes
 * @param {!Window} win
 * @param {!Object} response
 */
function applyResponse(win, viewer, response) {
  var adLocation = response['location'];
  var adTracking = response['tracking_url'];

  // If there is a tracking_url, need to track it
  // Otherwise track the location
  var trackUrl = adTracking || adLocation;

  if (trackUrl && !_url.isProxyOrigin(trackUrl)) {
    // To request the provided trackUrl for tracking purposes.
    new Image().src = trackUrl;
  }

  // Replace the location href params with new location params we get.
  if (adLocation) {
    if (!win.history.replaceState) {
      return;
    }
    var currentHref = win.location.href;
    var url = _url.parseUrl(adLocation);
    var params = _url.parseQueryString(url.search);
    var newHref = _url.addParamsToUrl(currentHref, params);
    win.history.replaceState(null, '', newHref);
  }
}

},{"./experiments":41,"./log":51,"./mode":53,"./timer":72,"./url":75,"./viewer":83,"./xhr":85}],47:[function(require,module,exports){
exports.__esModule = true;
exports.getIntersectionChangeEntry = getIntersectionChangeEntry;
exports.getThresholdSlot = getThresholdSlot;
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

var _log = require('./log');

var _layoutRect = require('./layout-rect');

var _iframeHelper = require('./iframe-helper');

/**
 * The structure that defines the rectangle used in intersection observers.
 *
 * @typedef {{
 *   top: number,
 *   bottom: number,
 *   left: number,
 *   right: number,
 *   width: number,
 *   height: number,
 *   x: number,
 *   y: number,
 * }}
 */
var DOMRect = undefined;

exports.DOMRect = DOMRect;
var DEFAULT_THRESHOLD = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];

exports.DEFAULT_THRESHOLD = DEFAULT_THRESHOLD;
var INIT_TIME = Date.now();

/**
 * A function to get the element's current IntersectionObserverEntry
 * regardless of the intersetion ratio. Only available when element is not
 * nested in a container iframe.
 * TODO: support opt_iframe if there's valid use cases.
 * @param {!./layout-rect.LayoutRectDef} element element's rect
 * @param {?./layout-rect.LayoutRectDef} owner element's owner rect
 * @param {!./layout-rect.LayoutRectDef} hostViewport hostViewport's rect
 * @return {!IntersectionObserverEntry} A change entry.
 */

function getIntersectionChangeEntry(element, owner, hostViewport) {
  var intersection = _layoutRect.rectIntersection(element, owner, hostViewport) || _layoutRect.layoutRectLtwh(0, 0, 0, 0);
  var ratio = intersectionRatio(intersection, element);
  return calculateChangeEntry(element, hostViewport, intersection, ratio);
}

/**
 * A class to help amp-iframe and amp-ad nested iframe listen to intersection
 * change.
 */

var IntersectionObserverApi = (function () {
  /**
   * @param {!AMP.BaseElement} baseElement
   * @param {!Element} iframe
   * @param {boolean=} opt_is3p
   */

  function IntersectionObserverApi(baseElement, iframe, opt_is3p) {
    var _this = this;

    babelHelpers.classCallCheck(this, IntersectionObserverApi);

    /** @private @const {!AMP.BaseElement} */
    this.baseElement_ = baseElement;

    /** @private {?IntersectionObserverPolyfill} */
    this.intersectionObserver_ = null;

    /** @private {!boolean} */
    this.shouldObserve_ = false;

    /** @private {!boolean} */
    this.isInViewport_ = false;

    /** @private {?function()} */
    this.unlistenOnDestroy_ = null;

    /** @private @const {!./service/viewport-impl.Viewport} */
    this.viewport_ = baseElement.getViewport();

    /** @private {?SubscriptionApi} */
    this.subscriptionApi_ = new _iframeHelper.SubscriptionApi(iframe, 'send-intersections', opt_is3p || false, function () {
      _this.startSendingIntersection_();
    });

    this.intersectionObserver_ = new IntersectionObserverPolyfill(function (change) {
      _this.subscriptionApi_.send('intersection', { changes: [change] });
    }, { threshold: DEFAULT_THRESHOLD });

    /** @const {function()} */
    this.fire = function () {
      if (!_this.shouldObserve_ || !_this.isInViewport_) {
        return;
      }
      _this.intersectionObserver_.tick(_this.viewport_.getRect());
    };
  }

  /**
   * The IntersectionObserverPolyfill class lets any element receive its
   * intersection data with the viewport. It acts like native browser supported
   * IntersectionObserver.
   * The IntersectionObserver receives a callback function and an optional option
   * as params. Whenever the element intersection ratio cross a threshold value,
   * IntersectionObserverPolyfill will call the provided callback function with
   * the change entry.
   * @visibleForTesting
   */

  /**
   * Function to start listening to viewport event. and observer intersection
   * change on the element.
   */

  IntersectionObserverApi.prototype.startSendingIntersection_ = function startSendingIntersection_() {
    var _this2 = this;

    this.shouldObserve_ = true;
    this.intersectionObserver_.observe(this.baseElement_.element);
    this.baseElement_.getVsync().measure(function () {
      _this2.isInViewport_ = _this2.baseElement_.isInViewport();
      _this2.fire();
    });

    var unlistenViewportScroll = this.viewport_.onScroll(this.fire);
    var unlistenViewportChange = this.viewport_.onChanged(this.fire);
    this.unlistenOnDestroy_ = function () {
      unlistenViewportScroll();
      unlistenViewportChange();
    };
  };

  /**
   * Enable to the PositionObserver to listen to viewport events
   * @param {!boolean} inViewport
   */

  IntersectionObserverApi.prototype.onViewportCallback = function onViewportCallback(inViewport) {
    this.isInViewport_ = inViewport;
  };

  /**
   * Clean all listenrs
   */

  IntersectionObserverApi.prototype.destroy = function destroy() {
    this.shouldObserve_ = false;
    this.intersectionObserver_ = null;
    if (this.unlistenOnDestroy_) {
      this.unlistenOnDestroy_();
      this.unlistenOnDestroy_ = null;
    }
    this.subscriptionApi_.destroy();
    this.subscriptionApi_ = null;
  };

  return IntersectionObserverApi;
})();

exports.IntersectionObserverApi = IntersectionObserverApi;

var IntersectionObserverPolyfill = (function () {
  /**
   * @param {!function(?IntersectionObserverEntry)} callback.
   * @param {Object=} opt_option
   */

  function IntersectionObserverPolyfill(callback, opt_option) {
    babelHelpers.classCallCheck(this, IntersectionObserverPolyfill);

    /** @private @const {function(?IntersectionObserverEntry)} */
    this.callback_ = callback;

    /**
     * A list of threshold, sorted in increasing numeric order
     * @private @const {!Array}
     */
    var threshold = opt_option && opt_option.threshold || [0];
    this.threshold_ = threshold.sort();
    _log.dev().assert(this.threshold_[0] >= 0 && this.threshold_[this.threshold_.length - 1] <= 1, 'Threshold should be in the range from "[0, 1]"');

    /** @private {?Element} */
    this.element_ = null;

    /**
     * The prev threshold slot which the previous ratio fills
     * Range [0, this.threshold_.length]
     * TODO: Do we always want to call callback at the first tick?
     * @private {number}
     */
    this.prevThresholdSlot_ = 0;

    // TODO: create the PositionObserver class, or create listener for position
    // info if inside an iframe

    // TODO: Add the postMessageApi logic outside IntersectionObserverPolyfill.
  }

  /**
   * Transforms a LayoutRect into a DOMRect for use in intersection observers.
   * @param {!./layout-rect.LayoutRectDef} rect
   * @return {!DOMRect}
   */

  /**
   * Provide a way to observer the intersection change for a specific element
   * Please note that the IntersectionObserverPolyfill only allow to observe one
   * element at a time.
   * TODO: Support observing multiple elements.
   * TODO: Support non AMP element
   * @param {!Element} element
   */

  IntersectionObserverPolyfill.prototype.observe = function observe(element) {
    // Check the element is an AMP element
    _log.dev().assert(element.isBuilt && element.isBuilt());
    // Reset cached value for a new element

    this.prevThresholdSlot_ = 0;
    this.element_ = element;
  };

  // TODO: Support unobserve() function

  /**
   * Tick function that update the DOMRect of the root of observed element.
   * Caller needs to make sure to pass in the correct container.
   * Note: the opt_iframe param is the iframe position relative to the host doc,
   * The iframe must be a non-scrollable iframe.
   * @param {!./layout-rect.LayoutRectDef} hostViewport.
   * @param {./layout-rect.LayoutRectDef=} opt_iframe
   */

  IntersectionObserverPolyfill.prototype.tick = function tick(hostViewport, opt_iframe) {
    if (opt_iframe) {
      // If element inside an iframe. Adjust origin to the iframe.left/top.
      hostViewport = _layoutRect.moveLayoutRect(hostViewport, -opt_iframe.left, -opt_iframe.top);
      opt_iframe = _layoutRect.moveLayoutRect(opt_iframe, -opt_iframe.left, -opt_iframe.top);
    }

    // Normalize container LayoutRect to be relative to page
    var elementRect = undefined;
    var ownerRect = null;

    // If opt_iframe is provided, all LayoutRect has position relative to
    // the iframe.
    // If opt_iframe is not provided, all LayoutRect has position relative to
    // the host document.
    elementRect = this.element_.getLayoutBox();
    var owner = this.element_.getOwner();
    ownerRect = owner && owner.getLayoutBox();

    var changeEntry = this.getValidIntersectionChangeEntry_(elementRect, ownerRect, hostViewport, opt_iframe);
    if (changeEntry) {
      this.callback_(changeEntry);
    }
  };

  /**
   * Return a change entry for that should be compatible with
   * IntersectionObserverEntry if it's valid with current config.
   * When the new intersection ratio doesn't cross one of a threshold value,
   * the function will return null.
   *
   * Mutates passed in rootBounds to have x and y according to spec.
   *
   * @param {!./layout-rect.LayoutRectDef} element element's rect
   * @param {?./layout-rect.LayoutRectDef} owner element's owner rect
   * @param {!./layout-rect.LayoutRectDef} hostViewport hostViewport's rect
   * @param {./layout-rect.LayoutRectDef=} opt_iframe. iframe container rect
   * @return {?IntersectionObserverEntry} A valid change entry or null if ratio
   * does not fill in a new threshold bucket.
   * @private
   */

  IntersectionObserverPolyfill.prototype.getValidIntersectionChangeEntry_ = function getValidIntersectionChangeEntry_(element, owner, hostViewport, opt_iframe) {
    // calculate intersectionRect. that the element intersects with hostViewport
    // and intersects with owner element and container iframe if exists.
    var intersectionRect = _layoutRect.rectIntersection(element, owner, hostViewport, opt_iframe) || _layoutRect.layoutRectLtwh(0, 0, 0, 0);

    // calculate ratio, call callback based on new ratio value.
    var ratio = intersectionRatio(intersectionRect, element);
    var newThresholdSlot = getThresholdSlot(this.threshold_, ratio);
    if (newThresholdSlot == this.prevThresholdSlot_) {
      return null;
    }
    this.prevThresholdSlot_ = newThresholdSlot;

    // To get same behavior as native IntersectionObserver set hostViewport null
    // if inside an iframe
    return calculateChangeEntry(element, opt_iframe ? null : hostViewport, intersectionRect, ratio);
  };

  return IntersectionObserverPolyfill;
})();

exports.IntersectionObserverPolyfill = IntersectionObserverPolyfill;
function DomRectFromLayoutRect(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom,
    right: rect.right,
    x: rect.left,
    y: rect.top
  };
}

/**
 * Returns the ratio of the smaller box's area to the larger box's area.
 * @param {!./layout-rect.LayoutRectDef} smaller
 * @param {!./layout-rect.LayoutRectDef} larger
 * @return {number}
 */
function intersectionRatio(smaller, larger) {
  return smaller.width * smaller.height / (larger.width * larger.height);
}

/**
 * Returns the slot number that the current ratio fills in.
 * @param {!Array} sortedThreshold valid sorted IoB threshold
 * @param {number} ratio Range from [0, 1]
 * @return {number} Range from [0, threshold.length]
 * @visibleForTesting
 */

function getThresholdSlot(sortedThreshold, ratio) {
  var startIdx = 0;
  var endIdx = sortedThreshold.length;
  // 0 is a special case that does not fit into [small, large) range
  if (ratio == 0) {
    return 0;
  }
  var mid = (startIdx + endIdx) / 2 | 0;
  while (startIdx < mid) {
    var midValue = sortedThreshold[mid];
    // In the range of [small, large)
    if (ratio < midValue) {
      endIdx = mid;
    } else {
      startIdx = mid;
    }
    mid = (startIdx + endIdx) / 2 | 0;
  }
  return endIdx;
}

/**
 * Helper function to calculate the IntersectionObserver change entry.
 * @param {!./layout-rect.LayoutRectDef} element element's rect
 * @param {?./layout-rect.LayoutRectDef} hostViewport hostViewport's rect
 * @param {!./layout-rect.LayoutRectDef} intersection
 * @param {number} ratio
 * @return {!IntersectionObserverEntry}}
 */
function calculateChangeEntry(element, hostViewport, intersection, ratio) {
  // If element not in an iframe.
  // adjust all LayoutRect to hostViewport Origin.
  var boundingClientRect = element;
  var rootBounds = hostViewport;
  // If no hostViewport is provided, element is inside an non-scrollable iframe.
  // Every Layoutrect has already adjust their origin according to iframe
  // rect origin. LayoutRect position is relative to iframe origin,
  // thus relative to iframe's viewport origin because the viewport is at the
  // iframe origin. No need to adjust position here.

  if (hostViewport) {
    // If element not in an iframe.
    // adjust all LayoutRect to hostViewport Origin.
    rootBounds = /** @type {!./layout-rect.LayoutRectDef} */rootBounds;
    intersection = _layoutRect.moveLayoutRect(intersection, -hostViewport.left, -hostViewport.top);
    // The element is relative to (0, 0), while the viewport moves. So, we must
    // adjust.
    boundingClientRect = _layoutRect.moveLayoutRect(boundingClientRect, -hostViewport.left, -hostViewport.top);
    // Now, move the viewport to (0, 0)
    rootBounds = _layoutRect.moveLayoutRect(rootBounds, -hostViewport.left, -hostViewport.top);
  }

  return (/** @type {!IntersectionObserverEntry} */{
      time: typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now() - INIT_TIME,
      rootBounds: rootBounds && DomRectFromLayoutRect(rootBounds),
      boundingClientRect: DomRectFromLayoutRect(boundingClientRect),
      intersectionRect: DomRectFromLayoutRect(intersection),
      intersectionRatio: ratio
    }
  );
}

},{"./iframe-helper":45,"./layout-rect":49,"./log":51}],48:[function(require,module,exports){
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

},{"./types":73}],49:[function(require,module,exports){
exports.__esModule = true;
exports.layoutRectLtwh = layoutRectLtwh;
exports.layoutRectFromDomRect = layoutRectFromDomRect;
exports.layoutRectsOverlap = layoutRectsOverlap;
exports.rectIntersection = rectIntersection;
exports.expandLayoutRect = expandLayoutRect;
exports.moveLayoutRect = moveLayoutRect;
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
 * The structure that combines position and size for an element. The exact
 * interpretation of position and size depends on the use case.
 *
 * @typedef {{
 *   top: number,
 *   bottom: number,
 *   left: number,
 *   right: number,
 *   width: number,
 *   height: number
 * }}
 */
var LayoutRectDef = undefined;

exports.LayoutRectDef = LayoutRectDef;
/**
 * Creates a layout rect based on the left, top, width and height parameters
 * in that order.
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @return {!LayoutRectDef}
 */

function layoutRectLtwh(left, top, width, height) {
  return {
    left: left,
    top: top,
    width: width,
    height: height,
    bottom: top + height,
    right: left + width
  };
}

/**
 * Creates a layout rect based on the DOMRect, e.g. obtained from calling
 * getBoundingClientRect.
 * @param {!ClientRect} rect
 * @return {!LayoutRectDef}
 */

function layoutRectFromDomRect(rect) {
  return layoutRectLtwh(Number(rect.left), Number(rect.top), Number(rect.width), Number(rect.height));
}

/**
 * Returns true if the specified two rects overlap by a single pixel.
 * @param {!LayoutRectDef} r1
 * @param {!LayoutRectDef} r2
 * @return {boolean}
 */

function layoutRectsOverlap(r1, r2) {
  return r1.top <= r2.bottom && r2.top <= r1.bottom && r1.left <= r2.right && r2.left <= r1.right;
}

/**
 * Returns the intersection between a, b or null if there is none.
 * @param {...?LayoutRectDef|undefined} var_args
 * @return {?LayoutRectDef}
 */

function rectIntersection(var_args) {
  var x0 = -Infinity;
  var x1 = Infinity;
  var y0 = -Infinity;
  var y1 = Infinity;
  for (var i = 0; i < arguments.length; i++) {
    var current = arguments[i];
    if (!current) {
      continue;
    }
    x0 = Math.max(x0, current.left);
    x1 = Math.min(x1, current.left + current.width);
    y0 = Math.max(y0, current.top);
    y1 = Math.min(y1, current.top + current.height);
    if (x1 < x0 || y1 < y0) {
      return null;
    }
  }
  if (x1 == Infinity) {
    return null;
  }
  return layoutRectLtwh(x0, y0, x1 - x0, y1 - y0);
}

/**
 * Expand the layout rect using multiples of width and height.
 * @param {!LayoutRectDef} rect Original rect.
 * @param {number} dw Expansion in width, specified as a multiple of width.
 * @param {number} dh Expansion in height, specified as a multiple of height.
 * @return {!LayoutRectDef}
 */

function expandLayoutRect(rect, dw, dh) {
  return {
    top: rect.top - rect.height * dh,
    bottom: rect.bottom + rect.height * dh,
    left: rect.left - rect.width * dw,
    right: rect.right + rect.width * dw,
    width: rect.width * (1 + dw * 2),
    height: rect.height * (1 + dh * 2)
  };
}

/**
 * Moves the layout rect using dx and dy.
 * @param {!LayoutRectDef} rect Original rect.
 * @param {number} dx Move horizontally with this value.
 * @param {number} dy Move vertically with this value.
 * @return {!LayoutRectDef}
 */

function moveLayoutRect(rect, dx, dy) {
  if (dx == 0 && dy == 0 || rect.width == 0 && rect.height == 0) {
    return rect;
  }
  return layoutRectLtwh(rect.left + dx, rect.top + dy, rect.width, rect.height);
}

},{}],50:[function(require,module,exports){
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

},{"./experiments":41,"./log":51,"./style":70,"./types":73}],51:[function(require,module,exports){
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

},{"./mode":53,"./mode-object":52}],52:[function(require,module,exports){
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

},{"./mode":53}],53:[function(require,module,exports){
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
var version = '1480694828544';

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

  // Currently `1480694828544` and thus `mode.version` contain only
  // major version. The full version however must also carry the minor version.
  // We will default to production default `01` minor version for now.
  // TODO(erwinmombay): decide whether 1480694828544 should contain
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

},{}],54:[function(require,module,exports){
exports.__esModule = true;
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
 * This class helps to manage observers. Observers can be added, removed or
 * fired through and instance of this class.
 * @template TYPE
 */

var Observable = (function () {
  function Observable() {
    babelHelpers.classCallCheck(this, Observable);

    /** @const {!Array<function(TYPE)>} */
    this.handlers_ = [];
  }

  /**
   * Adds the observer to this instance.
   * @param {function(TYPE)} handler Observer's handler.
   * @return {!UnlistenDef}
   */

  Observable.prototype.add = function add(handler) {
    var _this = this;

    this.handlers_.push(handler);
    return function () {
      _this.remove(handler);
    };
  };

  /**
   * Removes the observer from this instance.
   * @param {function(TYPE)} handler Observer's instance.
   */

  Observable.prototype.remove = function remove(handler) {
    var index = this.handlers_.indexOf(handler);
    if (index > -1) {
      this.handlers_.splice(index, 1);
    }
  };

  /**
   * Removes all observers.
   */

  Observable.prototype.removeAll = function removeAll() {
    this.handlers_.length = 0;
  };

  /**
   * Fires an event. All observers are called.
   * @param {TYPE=} opt_event
   */

  Observable.prototype.fire = function fire(opt_event) {
    var handlers = this.handlers_;
    for (var i = 0; i < handlers.length; i++) {
      var handler = handlers[i];
      handler(opt_event);
    }
  };

  /**
   * Returns number of handlers. Mostly needed for tests.
   * @return {number}
   */

  Observable.prototype.getHandlerCount = function getHandlerCount() {
    return this.handlers_.length;
  };

  return Observable;
})();

exports.Observable = Observable;

},{}],55:[function(require,module,exports){
exports.__esModule = true;
exports.performanceFor = performanceFor;
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
 * @return {!./service/performance-impl.Performance}
 */

function performanceFor(window) {
  return (/** @type {!./service/performance-impl.Performance}*/_service.getExistingServiceForWindow(window, 'performance')
  );
}

;

},{"./service":64}],56:[function(require,module,exports){
exports.__esModule = true;
exports.platformFor = platformFor;
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
 * @return {!./service/platform-impl.Platform}
 */

function platformFor(window) {
  return (/** @type {!./service/platform-impl.Platform} */_service.getExistingServiceForWindow(window, 'platform')
  );
}

;

},{"./service":64}],57:[function(require,module,exports){
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

},{"./mode":53,"./polyfills/document-contains":58,"./polyfills/math-sign":59,"./polyfills/object-assign":60,"./polyfills/promise":61,"document-register-element/build/document-register-element.node":23}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"promise-pjs/promise":24}],62:[function(require,module,exports){
exports.__esModule = true;
exports.waitForServices = waitForServices;
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

var _log = require('./log');

var _service = require('./service');

var _timer = require('./timer');

/**
 * A map of services that delay rendering. The key is the name of the service
 * and the value is a DOM query which is used to check if the service is needed
 * in the current document.
 * Do not add a service unless absolutely necessary.
 * @const {!Object<string, string>}
 */
var SERVICES = {
  'amp-accordion': '[custom-element=amp-accordion]',
  'amp-dynamic-css-classes': '[custom-element=amp-dynamic-css-classes]',
  'variant': 'amp-experiment'
};

/**
 * Maximum milliseconds to wait for all extensions to load before erroring.
 * @const
 */
var LOAD_TIMEOUT = 3000;

/**
 * Detects any render delaying services that are required on the page,
 * and returns a promise with a timeout.
 * @param {!Window} win
 * @return {!Promise<!Array<*>>} resolves to an Array that has the same length as
 *     the detected render delaying services
 */

function waitForServices(win) {
  var promises = includedServices(win).map(function (service) {
    return _timer.timerFor(win).timeoutPromise(LOAD_TIMEOUT, _service.getServicePromise(win, service), 'Render timeout waiting for service ' + service + ' to be ready.');
  });
  return Promise.all(promises);
}

/**
 * Detects which, if any, render-delaying extensions are included on the page.
 * @param {!Window} win
 * @return {!Array<string>}
 * @private
 */
function includedServices(win) {
  /** @const {!Document} */
  var doc = win.document;
  _log.dev().assert(doc.body);

  return Object.keys(SERVICES).filter(function (service) {
    return doc.querySelector(SERVICES[service]);
  });
}

},{"./log":51,"./service":64,"./timer":72}],63:[function(require,module,exports){
exports.__esModule = true;
exports.resourcesForDoc = resourcesForDoc;
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
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/resources-impl.Resources}
 */

function resourcesForDoc(nodeOrDoc) {
  return (/** @type {!./service/resources-impl.Resources} */_service.getExistingServiceForDoc(nodeOrDoc, 'resources')
  );
}

;

},{"./service":64}],64:[function(require,module,exports){
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

},{"./log":51,"./polyfills":57}],65:[function(require,module,exports){
exports.__esModule = true;
exports.installUrlReplacementsServiceForDoc = installUrlReplacementsServiceForDoc;
exports.installUrlReplacementsForEmbed = installUrlReplacementsForEmbed;
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

var _accessService = require('../access-service');

var _cid = require('../cid');

var _variantService = require('../variant-service');

var _shareTrackingService = require('../share-tracking-service');

var _log = require('../log');

var _documentInfo = require('../document-info');

var _service = require('../service');

var _url = require('../url');

var _viewer = require('../viewer');

var _viewport = require('../viewport');

var _userNotification = require('../user-notification');

var _activity = require('../activity');

var _experiments = require('../experiments');

var _impressionJs = require('../impression.js');

var _variableSource = require('./variable-source');

/** @private @const {string} */
var TAG = 'UrlReplacements';
var EXPERIMENT_DELIMITER = '!';
var VARIANT_DELIMITER = '.';
var ORIGINAL_HREF_PROPERTY = 'amp-original-href';

/**
 * Returns a encoded URI Component, or an empty string if the value is nullish.
 * @param {*} val
 * @return {string}
 */
function encodeValue(val) {
  if (val == null) {
    return '';
  }
  return encodeURIComponent( /** @type {string} */val);
};

/**
 * Class to provide variables that pertain to top level AMP window.
 */

var GlobalVariableSource = (function (_VariableSource) {
  babelHelpers.inherits(GlobalVariableSource, _VariableSource);

  function GlobalVariableSource(ampdoc) {
    babelHelpers.classCallCheck(this, GlobalVariableSource);

    _VariableSource.call(this);

    /** @const {!./ampdoc-impl.AmpDoc} */
    this.ampdoc = ampdoc;

    /** @private @const {function(!Window):!Promise<?AccessService>} */
    this.getAccessService_ = _accessService.accessServiceForOrNull;

    /** @private @const {!Promise<?Object<string, string>>} */
    this.variants_ = _variantService.variantForOrNull(this.ampdoc.win);

    /**
     * @private @const {
     *   !Promise<(?{incomingFragment: string, outgoingFragment: string})>}
     */
    this.shareTrackingFragments_ = _shareTrackingService.shareTrackingForOrNull(this.ampdoc.win);
  }

  /**
   * This class replaces substitution variables with their values.
   * Document new values in ../spec/amp-var-substitutions.md
   * @package For export
   */

  /**
   * Utility function for setting resolver for timing data that supports
   * sync and async.
   * @param {string} varName
   * @param {string} startEvent
   * @param {string=} endEvent
   * @return {!VariableSource}
   * @private
   */

  GlobalVariableSource.prototype.setTimingResolver_ = function setTimingResolver_(varName, startEvent, endEvent) {
    var _this = this;

    return this.setBoth(varName, function () {
      return _variableSource.getTimingDataSync(_this.ampdoc.win, startEvent, endEvent);
    }, function () {
      return _variableSource.getTimingDataAsync(_this.ampdoc.win, startEvent, endEvent);
    });
  };

  /** @override */

  GlobalVariableSource.prototype.initialize = function initialize() {
    var _this2 = this;

    /** @const {!./viewport-impl.Viewport} */
    var viewport = _viewport.viewportForDoc(this.ampdoc);

    // Returns a random value for cache busters.
    this.set('RANDOM', function () {
      return Math.random();
    });

    // Provides a counter starting at 1 per given scope.
    var counterStore = null;
    this.set('COUNTER', function (scope) {
      if (!counterStore) {
        counterStore = Object.create(null);
      }
      if (!counterStore[scope]) {
        counterStore[scope] = 0;
      }
      return ++counterStore[scope];
    });

    // Returns the canonical URL for this AMP document.
    this.set('CANONICAL_URL', this.getDocInfoValue_.bind(this, function (info) {
      return info.canonicalUrl;
    }));

    // Returns the host of the canonical URL for this AMP document.
    this.set('CANONICAL_HOST', this.getDocInfoValue_.bind(this, function (info) {
      var url = _url.parseUrl(info.canonicalUrl);
      return url && url.host;
    }));

    // Returns the hostname of the canonical URL for this AMP document.
    this.set('CANONICAL_HOSTNAME', this.getDocInfoValue_.bind(this, function (info) {
      var url = _url.parseUrl(info.canonicalUrl);
      return url && url.hostname;
    }));

    // Returns the path of the canonical URL for this AMP document.
    this.set('CANONICAL_PATH', this.getDocInfoValue_.bind(this, function (info) {
      var url = _url.parseUrl(info.canonicalUrl);
      return url && url.pathname;
    }));

    // Returns the referrer URL.
    this.setAsync('DOCUMENT_REFERRER', /** @type {AsyncResolverDef} */function () {
      return _viewer.viewerForDoc(_this2.ampdoc).getReferrerUrl();
    });

    // Returns the title of this AMP document.
    this.set('TITLE', function () {
      return _this2.ampdoc.win.document.title;
    });

    // Returns the URL for this AMP document.
    this.set('AMPDOC_URL', function () {
      return _url.removeFragment(_this2.ampdoc.win.location.href);
    });

    // Returns the host of the URL for this AMP document.
    this.set('AMPDOC_HOST', function () {
      var url = _url.parseUrl(_this2.ampdoc.win.location.href);
      return url && url.host;
    });

    // Returns the hostname of the URL for this AMP document.
    this.set('AMPDOC_HOSTNAME', function () {
      var url = _url.parseUrl(_this2.ampdoc.win.location.href);
      return url && url.hostname;
    });

    // Returns the Source URL for this AMP document.
    this.setBoth('SOURCE_URL', this.getDocInfoValue_.bind(this, function (info) {
      return _url.removeFragment(info.sourceUrl);
    }), function () {
      return _impressionJs.getTrackImpressionPromise().then(function () {
        return _this2.getDocInfoValue_(function (info) {
          return _url.removeFragment(info.sourceUrl);
        });
      });
    });

    // Returns the host of the Source URL for this AMP document.
    this.set('SOURCE_HOST', this.getDocInfoValue_.bind(this, function (info) {
      return _url.parseUrl(info.sourceUrl).host;
    }));

    // Returns the hostname of the Source URL for this AMP document.
    this.set('SOURCE_HOSTNAME', this.getDocInfoValue_.bind(this, function (info) {
      return _url.parseUrl(info.sourceUrl).hostname;
    }));

    // Returns the path of the Source URL for this AMP document.
    this.set('SOURCE_PATH', this.getDocInfoValue_.bind(this, function (info) {
      return _url.parseUrl(info.sourceUrl).pathname;
    }));

    // Returns a random string that will be the constant for the duration of
    // single page view. It should have sufficient entropy to be unique for
    // all the page views a single user is making at a time.
    this.set('PAGE_VIEW_ID', this.getDocInfoValue_.bind(this, function (info) {
      return info.pageViewId;
    }));

    this.setBoth('QUERY_PARAM', function (param) {
      var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      return _this2.getQueryParamData_(param, defaultValue);
    }, function (param) {
      var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      return _impressionJs.getTrackImpressionPromise().then(function () {
        return _this2.getQueryParamData_(param, defaultValue);
      });
    });

    /**
     * Stores client ids that were generated during this page view
     * indexed by scope.
     * @type {?Object<string, string>}
     */
    var clientIds = null;
    // Synchronous alternative. Only works for scopes that were previously
    // requested using the async method.
    this.setBoth('CLIENT_ID', function (scope) {
      if (!clientIds) {
        return null;
      }
      return clientIds[_log.dev().assertString(scope)];
    }, function (scope, opt_userNotificationId) {
      _log.user().assertString(scope, 'The first argument to CLIENT_ID, the fallback c' +
      /*OK*/'ookie name, is required');
      var consent = Promise.resolve();

      // If no `opt_userNotificationId` argument is provided then
      // assume consent is given by default.
      if (opt_userNotificationId) {
        consent = _userNotification.userNotificationManagerFor(_this2.ampdoc.win).then(function (service) {
          return service.get(opt_userNotificationId);
        });
      }
      return _cid.cidFor(_this2.ampdoc.win).then(function (cid) {
        return cid.get({
          scope: _log.dev().assertString(scope),
          createCookieIfNotPresent: true
        }, consent);
      }).then(function (cid) {
        if (!clientIds) {
          clientIds = Object.create(null);
        }
        clientIds[scope] = cid;
        return cid;
      });
    });

    // Returns assigned variant name for the given experiment.
    this.setAsync('VARIANT', function (experiment) {
      return _this2.variants_.then(function (variants) {
        _log.user().assert(variants, 'To use variable VARIANT, amp-experiment should be configured');
        var variant = variants[/** @type {string} */experiment];
        _log.user().assert(variant !== undefined, 'The value passed to VARIANT() is not a valid experiment name:' + experiment);
        // When no variant assigned, use reserved keyword 'none'.
        return variant === null ? 'none' : /** @type {string} */variant;
      });
    });

    // Returns all assigned experiment variants in a serialized form.
    this.setAsync('VARIANTS', function () {
      return _this2.variants_.then(function (variants) {
        _log.user().assert(variants, 'To use variable VARIANTS, amp-experiment should be configured');

        var experiments = [];
        for (var experiment in variants) {
          var variant = variants[experiment];
          experiments.push(experiment + VARIANT_DELIMITER + (variant || 'none'));
        }

        return experiments.join(EXPERIMENT_DELIMITER);
      });
    });

    // Returns incoming share tracking fragment.
    this.setAsync('SHARE_TRACKING_INCOMING', function () {
      return _this2.shareTrackingFragments_.then(function (fragments) {
        _log.user().assert(fragments, 'To use variable SHARE_TRACKING_INCOMING, ' + 'amp-share-tracking should be configured');
        return fragments.incomingFragment;
      });
    });

    // Returns outgoing share tracking fragment.
    this.setAsync('SHARE_TRACKING_OUTGOING', function () {
      return _this2.shareTrackingFragments_.then(function (fragments) {
        _log.user().assert(fragments, 'To use variable SHARE_TRACKING_OUTGOING, ' + 'amp-share-tracking should be configured');
        return fragments.outgoingFragment;
      });
    });

    // Returns the number of milliseconds since 1 Jan 1970 00:00:00 UTC.
    this.set('TIMESTAMP', function () {
      return Date.now();
    });

    // Returns the user's time-zone offset from UTC, in minutes.
    this.set('TIMEZONE', function () {
      return new Date().getTimezoneOffset();
    });

    // Returns a promise resolving to viewport.getScrollTop.
    this.set('SCROLL_TOP', function () {
      return viewport.getScrollTop();
    });

    // Returns a promise resolving to viewport.getScrollLeft.
    this.set('SCROLL_LEFT', function () {
      return viewport.getScrollLeft();
    });

    // Returns a promise resolving to viewport.getScrollHeight.
    this.set('SCROLL_HEIGHT', function () {
      return viewport.getScrollHeight();
    });

    // Returns a promise resolving to viewport.getScrollWidth.
    this.set('SCROLL_WIDTH', function () {
      return viewport.getScrollWidth();
    });

    // Returns the viewport height.
    this.set('VIEWPORT_HEIGHT', function () {
      return viewport.getSize().height;
    });

    // Returns the viewport width.
    this.set('VIEWPORT_WIDTH', function () {
      return viewport.getSize().width;
    });

    // Returns screen.width.
    this.set('SCREEN_WIDTH', function () {
      return _this2.ampdoc.win.screen.width;
    });

    // Returns screen.height.
    this.set('SCREEN_HEIGHT', function () {
      return _this2.ampdoc.win.screen.height;
    });

    // Returns screen.availHeight.
    this.set('AVAILABLE_SCREEN_HEIGHT', function () {
      return _this2.ampdoc.win.screen.availHeight;
    });

    // Returns screen.availWidth.
    this.set('AVAILABLE_SCREEN_WIDTH', function () {
      return _this2.ampdoc.win.screen.availWidth;
    });

    // Returns screen.ColorDepth.
    this.set('SCREEN_COLOR_DEPTH', function () {
      return _this2.ampdoc.win.screen.colorDepth;
    });

    // Returns document characterset.
    this.set('DOCUMENT_CHARSET', function () {
      var doc = _this2.ampdoc.win.document;
      return doc.characterSet || doc.charset;
    });

    // Returns the browser language.
    this.set('BROWSER_LANGUAGE', function () {
      var nav = _this2.ampdoc.win.navigator;
      return (nav.language || nav.userLanguage || nav.browserLanguage || '').toLowerCase();
    });

    // Returns the time it took to load the whole page. (excludes amp-* elements
    // that are not rendered by the system yet.)
    this.setTimingResolver_('PAGE_LOAD_TIME', 'navigationStart', 'loadEventStart');

    // Returns the time it took to perform DNS lookup for the domain.
    this.setTimingResolver_('DOMAIN_LOOKUP_TIME', 'domainLookupStart', 'domainLookupEnd');

    // Returns the time it took to connect to the server.
    this.setTimingResolver_('TCP_CONNECT_TIME', 'connectStart', 'connectEnd');

    // Returns the time it took for server to start sending a response to the
    // request.
    this.setTimingResolver_('SERVER_RESPONSE_TIME', 'requestStart', 'responseStart');

    // Returns the time it took to download the page.
    this.setTimingResolver_('PAGE_DOWNLOAD_TIME', 'responseStart', 'responseEnd');

    // Returns the time it took for redirects to complete.
    this.setTimingResolver_('REDIRECT_TIME', 'navigationStart', 'fetchStart');

    // Returns the time it took for DOM to become interactive.
    this.setTimingResolver_('DOM_INTERACTIVE_TIME', 'navigationStart', 'domInteractive');

    // Returns the time it took for content to load.
    this.setTimingResolver_('CONTENT_LOAD_TIME', 'navigationStart', 'domContentLoadedEventStart');

    // Access: Reader ID.
    this.setAsync('ACCESS_READER_ID', /** @type {AsyncResolverDef} */function () {
      return _this2.getAccessValue_(function (accessService) {
        return accessService.getAccessReaderId();
      }, 'ACCESS_READER_ID');
    });

    // Access: data from the authorization response.
    this.setAsync('AUTHDATA', /** @type {AsyncResolverDef} */function (field) {
      _log.user().assert(field, 'The first argument to AUTHDATA, the field, is required');
      return _this2.getAccessValue_(function (accessService) {
        return accessService.getAuthdataField(field);
      }, 'AUTHDATA');
    });

    // Returns an identifier for the viewer.
    this.setAsync('VIEWER', function () {
      return _viewer.viewerForDoc(_this2.ampdoc).getViewerOrigin().then(function (viewer) {
        return viewer == undefined ? '' : viewer;
      });
    });

    // Returns the total engaged time since the content became viewable.
    this.setAsync('TOTAL_ENGAGED_TIME', function () {
      return _activity.activityFor(_this2.ampdoc.win).then(function (activity) {
        return activity.getTotalEngagedTime();
      });
    });

    this.set('NAV_TIMING', function (startAttribute, endAttribute) {
      _log.user().assert(startAttribute, 'The first argument to NAV_TIMING, the ' + 'start attribute name, is required');
      return _variableSource.getTimingDataSync(_this2.ampdoc.win,
      /**@type {string}*/startAttribute,
      /**@type {string}*/endAttribute);
    });
    this.setAsync('NAV_TIMING', function (startAttribute, endAttribute) {
      _log.user().assert(startAttribute, 'The first argument to NAV_TIMING, the ' + 'start attribute name, is required');
      return _variableSource.getTimingDataAsync(_this2.ampdoc.win,
      /**@type {string}*/startAttribute,
      /**@type {string}*/endAttribute);
    });

    this.set('NAV_TYPE', function () {
      return _variableSource.getNavigationData(_this2.ampdoc.win, 'type');
    });

    this.set('NAV_REDIRECT_COUNT', function () {
      return _variableSource.getNavigationData(_this2.ampdoc.win, 'redirectCount');
    });

    // returns the AMP version number
    this.set('AMP_VERSION', function () {
      return '1480694828544';
    });

    this.set('BACKGROUND_STATE', function () {
      return _viewer.viewerForDoc(_this2.ampdoc.win.document).isVisible() ? '0' : '1';
    });
  };

  /**
   * Resolves the value via document info.
   * @param {function(!./document-info-impl.DocumentInfoDef):T} getter
   * @return {T}
   * @template T
   */

  GlobalVariableSource.prototype.getDocInfoValue_ = function getDocInfoValue_(getter) {
    return getter(_documentInfo.documentInfoForDoc(this.ampdoc));
  };

  /**
   * Resolves the value via access service. If access service is not configured,
   * the resulting value is `null`.
   * @param {function(!AccessService):(T|!Promise<T>)} getter
   * @param {string} expr
   * @return {T|null}
   * @template T
   */

  GlobalVariableSource.prototype.getAccessValue_ = function getAccessValue_(getter, expr) {
    return this.getAccessService_(this.ampdoc.win).then(function (accessService) {
      if (!accessService) {
        // Access service is not installed.
        _log.user().error(TAG, 'Access service is not installed to access: ', expr);
        return null;
      }
      return getter(accessService);
    });
  };

  /**
   * Return the QUERY_PARAM from the current location href
   * @param {*} param
   * @param {string} defaultValue
   * @return {string}
   */

  GlobalVariableSource.prototype.getQueryParamData_ = function getQueryParamData_(param, defaultValue) {
    _log.user().assert(param, 'The first argument to QUERY_PARAM, the query string ' + 'param is required');
    _log.user().assert(typeof param == 'string', 'param should be a string');
    var url = _url.parseUrl(this.ampdoc.win.location.href);
    var params = _url.parseQueryString(url.search);
    return typeof params[param] !== 'undefined' ? params[param] : defaultValue;
  };

  return GlobalVariableSource;
})(_variableSource.VariableSource);

exports.GlobalVariableSource = GlobalVariableSource;

var UrlReplacements = (function () {
  /** @param {!./ampdoc-impl.AmpDoc} ampdoc */

  function UrlReplacements(ampdoc, variableSource) {
    babelHelpers.classCallCheck(this, UrlReplacements);

    /** @const {!./ampdoc-impl.AmpDoc} */
    this.ampdoc = ampdoc;

    /** @type {VariableSource} */
    this.variableSource_ = variableSource;
  }

  /**
   * @param {!./ampdoc-impl.AmpDoc} ampdoc
   * @return {!UrlReplacements}
   */

  /**
   * Synchronously expands the provided URL by replacing all known variables with
   * their resolved values. Optional `opt_bindings` can be used to add new
   * variables or override existing ones.  Any async bindings are ignored.
   *
   * TODO(mkhatib, #6322): Deprecate and please use expandUrlSync or expandStringSync.
   * @param {string} url
   * @param {!Object<string, (ResolverReturnDef|!SyncResolverDef)>=} opt_bindings
   * @param {!Object<string, ResolverReturnDef>=} opt_collectVars
   * @param {!Object<string, boolean>=} opt_whiteList Optional white list of names
   *     that can be substituted.
   * @return {string}
   */

  UrlReplacements.prototype.expandSync = function expandSync(url, opt_bindings, opt_collectVars, opt_whiteList) {
    return this.expandUrlSync(url, opt_bindings, opt_collectVars, opt_whiteList);
  };

  /**
   * Expands the provided URL by replacing all known variables with their
   * resolved values. Optional `opt_bindings` can be used to add new variables
   * or override existing ones.
   *
   * TODO(mkhatib, #6322): Deprecate and please use expandUrlAsync or expandStringAsync.
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<string>}
   */

  UrlReplacements.prototype.expandAsync = function expandAsync(url, opt_bindings) {
    return this.expandUrlAsync(url, opt_bindings);
  };

  /**
   * Synchronously expands the provided source by replacing all known variables with
   * their resolved values. Optional `opt_bindings` can be used to add new
   * variables or override existing ones.  Any async bindings are ignored.
   * @param {string} source
   * @param {!Object<string, (ResolverReturnDef|!SyncResolverDef)>=} opt_bindings
   * @param {!Object<string, ResolverReturnDef>=} opt_collectVars
   * @param {!Object<string, boolean>=} opt_whiteList Optional white list of names
   *     that can be substituted.
   * @return {string}
   */

  UrlReplacements.prototype.expandStringSync = function expandStringSync(source, opt_bindings, opt_collectVars, opt_whiteList) {
    return (/** @type {string} */this.expand_(source, opt_bindings, opt_collectVars, /* opt_sync */true, opt_whiteList)
    );
  };

  /**
   * Expands the provided source by replacing all known variables with their
   * resolved values. Optional `opt_bindings` can be used to add new variables
   * or override existing ones.
   * @param {string} source
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<string>}
   */

  UrlReplacements.prototype.expandStringAsync = function expandStringAsync(source, opt_bindings) {
    return (/** @type {!Promise<string>} */this.expand_(source, opt_bindings)
    );
  };

  /**
   * Synchronously expands the provided URL by replacing all known variables with
   * their resolved values. Optional `opt_bindings` can be used to add new
   * variables or override existing ones.  Any async bindings are ignored.
   * @param {string} url
   * @param {!Object<string, (ResolverReturnDef|!SyncResolverDef)>=} opt_bindings
   * @param {!Object<string, ResolverReturnDef>=} opt_collectVars
   * @param {!Object<string, boolean>=} opt_whiteList Optional white list of names
   *     that can be substituted.
   * @return {string}
   */

  UrlReplacements.prototype.expandUrlSync = function expandUrlSync(url, opt_bindings, opt_collectVars, opt_whiteList) {
    return this.ensureProtocolMatches_(url, /** @type {string} */this.expand_(url, opt_bindings, opt_collectVars, /* opt_sync */true, opt_whiteList));
  };

  /**
   * Expands the provided URL by replacing all known variables with their
   * resolved values. Optional `opt_bindings` can be used to add new variables
   * or override existing ones.
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<string>}
   */

  UrlReplacements.prototype.expandUrlAsync = function expandUrlAsync(url, opt_bindings) {
    var _this3 = this;

    return (/** @type {!Promise<string>} */this.expand_(url, opt_bindings).then(function (replacement) {
        return _this3.ensureProtocolMatches_(url, replacement);
      })
    );
  };

  /**
   * Replaces values in the link of an anchor tag if
   * - the link opts into it (via data-amp-replace argument)
   * - the destination is the source or canonical origin of this doc.
   * @param {!Element} element An anchor element.
   * @return {string|undefined} Replaced string for testing
   */

  UrlReplacements.prototype.maybeExpandLink = function maybeExpandLink(element) {
    if (!_experiments.isExperimentOn(this.ampdoc.win, 'link-url-replace')) {
      return;
    }
    _log.dev().assert(element.tagName == 'A');
    var whitelist = element.getAttribute('data-amp-replace');
    if (!whitelist) {
      return;
    }
    var docInfo = _documentInfo.documentInfoForDoc(this.ampdoc);
    // ORIGINAL_HREF_PROPERTY has the value of the href "pre-replacement".
    // We set this to the original value before doing any work and use it
    // on subsequent replacements, so that each run gets a fresh value.
    var href = _log.dev().assertString(element[ORIGINAL_HREF_PROPERTY] || element.getAttribute('href'));
    var url = _url.parseUrl(href);
    if (url.origin != _url.parseUrl(docInfo.canonicalUrl).origin && url.origin != _url.parseUrl(docInfo.sourceUrl).origin) {
      _log.user().warn('URL', 'Ignoring link replacement', href, ' because the link does not go to the document\'s' + ' source or canonical origin.');
      return;
    }
    if (element[ORIGINAL_HREF_PROPERTY] == null) {
      element[ORIGINAL_HREF_PROPERTY] = href;
    }
    var supportedReplacements = {
      'CLIENT_ID': true,
      'QUERY_PARAM': true
    };
    var requestedReplacements = {};
    whitelist.trim().split(/\s*,\s*/).forEach(function (replacement) {
      if (supportedReplacements.hasOwnProperty(replacement)) {
        requestedReplacements[replacement] = true;
      } else {
        _log.user().warn('URL', 'Ignoring unsupported link replacement', replacement);
      }
    });
    return element.href = this.expandSync(href,
    /* opt_bindings */undefined,
    /* opt_collectVars */undefined, requestedReplacements);
  };

  /**
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @param {!Object<string, *>=} opt_collectVars
   * @param {boolean=} opt_sync
   * @param {!Object<string, boolean>=} opt_whiteList Optional white list of names
   *     that can be substituted.
   * @return {!Promise<string>|string}
   * @private
   */

  UrlReplacements.prototype.expand_ = function expand_(url, opt_bindings, opt_collectVars, opt_sync, opt_whiteList) {
    var _this4 = this;

    var expr = this.variableSource_.getExpr(opt_bindings);
    var replacementPromise = undefined;
    var replacement = url.replace(expr, function (match, name, opt_strargs) {
      var args = [];
      if (typeof opt_strargs == 'string') {
        args = opt_strargs.split(',');
      }
      if (opt_whiteList && !opt_whiteList[name]) {
        // Do not perform substitution and just return back the original
        // match, so that the string doesn't change.
        return match;
      }
      var binding = undefined;
      if (opt_bindings && name in opt_bindings) {
        binding = opt_bindings[name];
      } else if (binding = _this4.variableSource_.get(name)) {
        if (opt_sync) {
          binding = binding.sync;
          if (!binding) {
            _log.user().error(TAG, 'ignoring async replacement key: ', name);
            return '';
          }
        } else {
          binding = binding.async || binding.sync;
        }
      }
      var val = undefined;
      try {
        val = typeof binding == 'function' ? binding.apply(null, args) : binding;
      } catch (e) {
        // Report error, but do not disrupt URL replacement. This will
        // interpolate as the empty string.
        if (opt_sync) {
          val = '';
        }
        _log.rethrowAsync(e);
      }
      // In case the produced value is a promise, we don't actually
      // replace anything here, but do it again when the promise resolves.
      if (val && val.then) {
        var _ret = (function () {
          if (opt_sync) {
            _log.user().error(TAG, 'ignoring promise value for key: ', name);
            return {
              v: ''
            };
          }
          /** @const {Promise<string>} */
          var p = val['catch'](function (err) {
            // Report error, but do not disrupt URL replacement. This will
            // interpolate as the empty string.
            _log.rethrowAsync(err);
          }).then(function (v) {
            replacement = replacement.replace(match, encodeValue(v));
            if (opt_collectVars) {
              opt_collectVars[match] = v;
            }
          });
          if (replacementPromise) {
            replacementPromise = replacementPromise.then(function () {
              return p;
            });
          } else {
            replacementPromise = p;
          }
          return {
            v: match
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
      if (opt_collectVars) {
        opt_collectVars[match] = val;
      }
      return encodeValue(val);
    });

    if (replacementPromise) {
      replacementPromise = replacementPromise.then(function () {
        return replacement;
      });
    }

    if (opt_sync) {
      return replacement;
    }
    return replacementPromise || Promise.resolve(replacement);
  };

  /**
   * Collects all substitutions in the provided URL and expands them to the
   * values for known variables. Optional `opt_bindings` can be used to add
   * new variables or override existing ones.
   * @param {string} url
   * @param {!Object<string, *>=} opt_bindings
   * @return {!Promise<!Object<string, *>>}
   */

  UrlReplacements.prototype.collectVars = function collectVars(url, opt_bindings) {
    var vars = Object.create(null);
    return this.expand_(url, opt_bindings, vars).then(function () {
      return vars;
    });
  };

  /**
   * Ensures that the protocol of the original url matches the protocol of the
   * replacement url. Returns the replacement if they do, the original if they
   * do not.
   * @param {string} url
   * @param {string} replacement
   * @return {string}
   */

  UrlReplacements.prototype.ensureProtocolMatches_ = function ensureProtocolMatches_(url, replacement) {
    var newProtocol = _url.parseUrl(replacement, /* opt_nocache */true).protocol;
    var oldProtocol = _url.parseUrl(url, /* opt_nocache */true).protocol;
    if (newProtocol != oldProtocol) {
      _log.user().error(TAG, 'Illegal replacement of the protocol: ', url);
      return url;
    }
    _log.user().assert(newProtocol !== 'javascript:', 'Illegal javascript link ' + 'protocol: %s', url);

    return replacement;
  };

  /**
   * @return {VariableSource}
   */

  UrlReplacements.prototype.getVariableSource = function getVariableSource() {
    return this.variableSource_;
  };

  return UrlReplacements;
})();

exports.UrlReplacements = UrlReplacements;

function installUrlReplacementsServiceForDoc(ampdoc) {
  return _service.getServiceForDoc(ampdoc, 'url-replace', function (doc) {
    return new UrlReplacements(doc, new GlobalVariableSource(doc));
  });
}

/**
 * @param {!./ampdoc-impl.AmpDoc} ampdoc
 * @param {!Window} embedWin
 * @param {*} varSource
 */

function installUrlReplacementsForEmbed(ampdoc, embedWin, varSource) {
  _service.installServiceInEmbedScope(embedWin, 'url-replace', new UrlReplacements(ampdoc, varSource));
}

},{"../access-service":26,"../activity":27,"../cid":30,"../document-info":34,"../experiments":41,"../impression.js":46,"../log":51,"../service":64,"../share-tracking-service":67,"../url":75,"../user-notification":76,"../variant-service":82,"../viewer":83,"../viewport":84,"./variable-source":66}],66:[function(require,module,exports){
exports.__esModule = true;
exports.getTimingDataAsync = getTimingDataAsync;
exports.getTimingDataSync = getTimingDataSync;
exports.getNavigationData = getNavigationData;
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

var _log = require('../log');

var _documentReady = require('../document-ready');

var _types = require('../types');

/** @typedef {string|number|boolean|undefined|null} */
var ResolverReturnDef = undefined;

/** @typedef {function(...*):ResolverReturnDef} */
var SyncResolverDef = undefined;

/** @typedef {function(...*):!Promise<ResolverReturnDef>} */
var AsyncResolverDef = undefined;

/** @typedef {{sync: SyncResolverDef, async: AsyncResolverDef}} */
var ReplacementDef = undefined;

/**
 * Returns navigation timing information based on the start and end events.
 * The data for the timing events is retrieved from performance.timing API.
 * If start and end events are both given, the result is the difference between
 * the two. If only start event is given, the result is the timing value at
 * start event.
 * @param {!Window} win
 * @param {string} startEvent
 * @param {string=} endEvent
 * @return {!Promise<ResolverReturnDef>}
 */

function getTimingDataAsync(win, startEvent, endEvent) {
  var metric = getTimingDataSync(win, startEvent, endEvent);
  if (metric === '') {
    // Metric is not yet available. Retry after a delay.
    return _documentReady.whenDocumentComplete(win.document).then(function () {
      return getTimingDataSync(win, startEvent, endEvent);
    });
  }
  return Promise.resolve(metric);
}

/**
 * Returns navigation timing information based on the start and end events.
 * The data for the timing events is retrieved from performance.timing API.
 * If start and end events are both given, the result is the difference between
 * the two. If only start event is given, the result is the timing value at
 * start event. Enforces synchronous evaluation.
 * @param {!Window} win
 * @param {string} startEvent
 * @param {string=} endEvent
 * @return {ResolverReturnDef} undefined if API is not available, empty string
 *    if it is not yet available, or value as string
 */

function getTimingDataSync(win, startEvent, endEvent) {
  var timingInfo = win['performance'] && win['performance']['timing'];
  if (!timingInfo || timingInfo['navigationStart'] == 0) {
    // Navigation timing API is not supported.
    return;
  }

  var metric = endEvent === undefined ? timingInfo[startEvent] : timingInfo[endEvent] - timingInfo[startEvent];

  if (!_types.isFiniteNumber(metric)) {
    // The metric is not supported.
    return;
  } else if (metric < 0) {
    ;
    return '';
  } else {
    return metric;
  }
}

/**
 * Returns navigation information from the current browsing context.
 * @param {!Window} win
 * @param {string} attribute
 * @return {ResolverReturnDef}
 * @private
 */

function getNavigationData(win, attribute) {
  var navigationInfo = win['performance'] && win['performance']['navigation'];
  if (!navigationInfo || navigationInfo[attribute] === undefined) {
    // PerformanceNavigation interface is not supported or attribute is not
    // implemented.
    return;
  }
  return navigationInfo[attribute];
}

/**
 * A class to provide variable substitution related features. Extend this class
 * and override initialize() to add more supported variables.
 */

var VariableSource = (function () {
  function VariableSource() {
    babelHelpers.classCallCheck(this, VariableSource);

    /** @private {!RegExp|undefined} */
    this.replacementExpr_ = undefined;

    /** @private @const {!Object<string, !ReplacementDef>} */
    this.replacements_ = Object.create(null);

    /** @private {boolean} */
    this.initialized_ = false;
  }

  /**
   * Lazily initialize the default replacements.
   * @private
   */

  VariableSource.prototype.initialize_ = function initialize_() {
    this.initialize();
    this.initialized_ = true;
  };

  /**
   * Override this method to set all the variables supported by derived class.
   */

  VariableSource.prototype.initialize = function initialize() {}
  // Needs to be implemented by derived classes.

  /**
   * Method exists to assist stubbing in tests.
   * @param {string} name
   * @return {!ReplacementDef}
   */
  ;

  VariableSource.prototype.get = function get(name) {
    if (!this.initialized_) {
      this.initialize_();
    }

    return this.replacements_[name];
  };

  /**
   * Sets a synchronous value resolver for the variable with the specified name.
   * The value resolver may optionally take an extra parameter.
   * Can be called in conjunction with setAsync to allow for additional
   * asynchronous resolver where expand will use async and expandSync the sync
   * version.
   * @param {string} varName
   * @param {!SyncResolverDef} syncResolver
   * @return {!VariableSource}
   */

  VariableSource.prototype.set = function set(varName, syncResolver) {
    _log.dev().assert(varName.indexOf('RETURN') == -1);
    this.replacements_[varName] = this.replacements_[varName] || { sync: undefined, async: undefined };
    this.replacements_[varName].sync = syncResolver;
    this.replacementExpr_ = undefined;
    return this;
  };

  /**
   * Sets an async value resolver for the variable with the specified name.
   * The value resolver may optionally take an extra parameter.
   * Can be called in conjuction with setAsync to allow for additional
   * asynchronous resolver where expand will use async and expandSync the sync
   * version.
   * @param {string} varName
   * @param {!AsyncResolverDef} asyncResolver
   * @return {!VariableSource}
   */

  VariableSource.prototype.setAsync = function setAsync(varName, asyncResolver) {
    _log.dev().assert(varName.indexOf('RETURN') == -1);
    this.replacements_[varName] = this.replacements_[varName] || { sync: undefined, async: undefined };
    this.replacements_[varName].async = asyncResolver;
    this.replacementExpr_ = undefined;
    return this;
  };

  /**
   * Helper method to set both sync and async resolvers.
   * @param {string} varName
   * @param {!SyncResolverDef} syncResolver
   * @param {!AsyncResolverDef} asyncResolver
   * @return {!VariableSource}
   */

  VariableSource.prototype.setBoth = function setBoth(varName, syncResolver, asyncResolver) {
    return this.set(varName, syncResolver).setAsync(varName, asyncResolver);
  };

  /**
   * Returns a Regular expression that can be used to detect all the variables
   * in a template.
   * @param {!Object<string, *>=} opt_bindings
   * @return {!RegExp}
   */

  VariableSource.prototype.getExpr = function getExpr(opt_bindings) {
    var _this = this;

    if (!this.initialized_) {
      this.initialize_();
    }

    var additionalKeys = opt_bindings ? Object.keys(opt_bindings) : null;
    if (additionalKeys && additionalKeys.length > 0) {
      var _ret = (function () {
        var allKeys = Object.keys(_this.replacements_);
        additionalKeys.forEach(function (key) {
          if (_this.replacements_[key] === undefined) {
            allKeys.push(key);
          }
        });
        return {
          v: _this.buildExpr_(allKeys)
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
    if (!this.replacementExpr_) {
      this.replacementExpr_ = this.buildExpr_(Object.keys(this.replacements_));
    }
    return this.replacementExpr_;
  };

  /**
   * @param {!Array<string>} keys
   * @return {!RegExp}
   * @private
   */

  VariableSource.prototype.buildExpr_ = function buildExpr_(keys) {
    // The keys must be sorted to ensure that the longest keys are considered
    // first. This avoids a problem where a RANDOM conflicts with RANDOM_ONE.
    keys.sort(function (s1, s2) {
      return s2.length - s1.length;
    });
    var all = keys.join('|');
    // Match the given replacement patterns, as well as optionally
    // arguments to the replacement behind it in parantheses.
    // Example string that match
    // FOO_BAR
    // FOO_BAR(arg1)
    // FOO_BAR(arg1,arg2)
    return new RegExp('\\$?(' + all + ')(?:\\(([0-9a-zA-Z-_.,]+)\\))?', 'g');
  };

  return VariableSource;
})();

exports.VariableSource = VariableSource;

},{"../document-ready":35,"../log":51,"../types":73}],67:[function(require,module,exports){
exports.__esModule = true;
exports.shareTrackingForOrNull = shareTrackingForOrNull;
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

var _elementService = require('./element-service');

/**
 * Returns a promise for the share tracking fragments or a promise for null
 * if it is not available on the current page.
 * @param {!Window} win
 * @return {!Promise<?{incomingFragment: string, outgoingFragment: string}>}
 */

function shareTrackingForOrNull(win) {
  return (/** @type {
         !Promise<?{incomingFragment: string, outgoingFragment: string}>} */_elementService.getElementServiceIfAvailable(win, 'share-tracking', 'amp-share-tracking')
  );
}

},{"./element-service":38}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
exports.__esModule = true;
exports.installStyles = installStyles;
exports.insertStyleElement = insertStyleElement;
exports.makeBodyVisible = makeBodyVisible;
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

var _documentState = require('./document-state');

var _performance = require('./performance');

var _style = require('./style');

var _renderDelayingServices = require('./render-delaying-services');

var _resources = require('./resources');

var bodyVisibleSentinel = '__AMP_BODY_VISIBLE';

/**
 * Adds the given css text to the given document.
 *
 * The style tags will be at the beginning of the head before all author
 * styles. One element can be the main runtime CSS. This is guaranteed
 * to always be the first stylesheet in the doc.
 *
 * @param {!Document} doc The document that should get the new styles.
 * @param {string} cssText
 * @param {function()} cb Called when the new styles are available.
 *     Not using a promise, because this is synchronous when possible.
 *     for better performance.
 * @param {boolean=} opt_isRuntimeCss If true, this style tag will be inserted
 *     as the first element in head and all style elements will be positioned
 *     after.
 * @param {string=} opt_ext
 * @return {!Element}
 */

function installStyles(doc, cssText, cb, opt_isRuntimeCss, opt_ext) {
  var style = insertStyleElement(doc, _log.dev().assertElement(doc.head), cssText, opt_isRuntimeCss || false, opt_ext || null);

  // Styles aren't always available synchronously. E.g. if there is a
  // pending style download, it will have to finish before the new
  // style is visible.
  // For this reason we poll until the style becomes available.
  // Sync case.
  if (styleLoaded(doc, style)) {
    cb();
    return style;
  }
  // Poll until styles are available.
  var interval = setInterval(function () {
    if (styleLoaded(doc, style)) {
      clearInterval(interval);
      cb();
    }
  }, 4);
  return style;
}

/**
 * Creates the properly configured style element.
 * @param {?Document} doc
 * @param {!Element|!ShadowRoot} cssRoot
 * @param {string} cssText
 * @param {boolean} isRuntimeCss
 * @param {?string} ext
 * @return {!Element}
 */

function insertStyleElement(doc, cssRoot, cssText, isRuntimeCss, ext) {
  var style = doc.createElement('style');
  style. /*OK*/textContent = cssText;
  var afterElement = null;
  // Make sure that we place style tags after the main runtime CSS. Otherwise
  // the order is random.
  if (isRuntimeCss) {
    style.setAttribute('amp-runtime', '');
    cssRoot.runtimeStyleElement = style;
  } else if (ext == 'amp-custom') {
    style.setAttribute('amp-custom', '');
    afterElement = cssRoot.lastChild;
  } else {
    style.setAttribute('amp-extension', ext || '');
    afterElement = cssRoot.runtimeStyleElement;
  }
  insertAfterOrAtStart(cssRoot, style, afterElement);
  return style;
}

/**
 * Sets the document's body opacity to 1.
 * If the body is not yet available (because our script was loaded
 * synchronously), polls until it is.
 * @param {!Document} doc The document who's body we should make visible.
 * @param {boolean=} opt_waitForServices Whether the body visibility should
 *     be blocked on key services being loaded.
 */

function makeBodyVisible(doc, opt_waitForServices) {
  var set = function () {
    _style.setStyles(_log.dev().assertElement(doc.body), {
      opacity: 1,
      visibility: 'visible',
      animation: 'none'
    });
  };
  try {
    (function () {
      /** @const {!Window} */
      var win = doc.defaultView;
      _documentState.documentStateFor(win).onBodyAvailable(function () {
        if (win[bodyVisibleSentinel]) {
          return;
        }
        win[bodyVisibleSentinel] = true;
        if (opt_waitForServices) {
          _renderDelayingServices.waitForServices(win)['catch'](function (reason) {
            _log.rethrowAsync(reason);
            return [];
          }).then(function (services) {
            set();
            if (services.length > 0) {
              _resources.resourcesForDoc(doc). /*OK*/schedulePass(1, /* relayoutAll */true);
            }
            try {
              var perf = _performance.performanceFor(win);
              perf.tick('mbv');
              perf.flush();
            } catch (e) {}
          });
        } else {
          set();
        }
      });
    })();
  } catch (e) {
    // If there was an error during the logic above (such as service not
    // yet installed, definitely try to make the body visible.
    set();
    // Avoid errors in the function to break execution flow as this is
    // often called as a last resort.
    _log.rethrowAsync(e);
  }
}

/**
 * Checks whether a style element was registered in the DOM.
 * @param {!Document} doc
 * @param {!Element} style
 * @return {boolean}
 */
function styleLoaded(doc, style) {
  var sheets = doc.styleSheets;
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.ownerNode == style) {
      return true;
    }
  }
  return false;
};

/**
 * Insert the element in the root after the element named after or
 * if that is null at the beginning.
 * @param {!Element|!ShadowRoot} root
 * @param {!Element} element
 * @param {?Element} after
 */
function insertAfterOrAtStart(root, element, after) {
  if (after) {
    if (after.nextSibling) {
      root.insertBefore(element, after.nextSibling);
    } else {
      root.appendChild(element);
    }
  } else {
    // Add at the start.
    root.insertBefore(element, root.firstChild);
  }
}

},{"./document-state":36,"./log":51,"./performance":55,"./render-delaying-services":62,"./resources":63,"./style":70}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
exports.__esModule = true;
exports.templatesFor = templatesFor;
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
 * @return {!./service/template-impl.Templates}
 */

function templatesFor(window) {
  return (/** @type {!./service/template-impl.Templates} */_service.getExistingServiceForWindow(window, 'templates')
  );
}

;

},{"./service":64}],72:[function(require,module,exports){
exports.__esModule = true;
exports.timerFor = timerFor;
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
 * @return {!./service/timer-impl.Timer}
 */

function timerFor(window) {
  return (/** @type {!./service/timer-impl.Timer} */_service.getExistingServiceForWindow(window, 'timer')
  );
}

;

},{"./service":64}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
exports.__esModule = true;
exports.urlReplacementsForDoc = urlReplacementsForDoc;
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
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/url-replacements-impl.UrlReplacements}
 */

function urlReplacementsForDoc(nodeOrDoc) {
  return (/** @type {!./service/url-replacements-impl.UrlReplacements} */_service.getExistingServiceForDocInEmbedScope(nodeOrDoc, 'url-replace')
  );
}

},{"./service":64}],75:[function(require,module,exports){
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

},{"./config":31,"./log":51,"./mode":53,"./string":68,"./types":73}],76:[function(require,module,exports){
exports.__esModule = true;
exports.userNotificationManagerFor = userNotificationManagerFor;
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
 * @fileoverview Factory for amp-user-notification
 */

var _elementService = require('./element-service');

/**
 * @param {!Window} window
 * @return {!Promise<!UserNotificationManager>}
 */

function userNotificationManagerFor(window) {
  return (/** @type {!Promise<!UserNotificationManager>} */_elementService.getElementService(window, 'userNotificationManager', 'amp-user-notification')
  );
}

},{"./element-service":38}],77:[function(require,module,exports){
exports.__esModule = true;
exports.filterSplice = filterSplice;
exports.findIndex = findIndex;
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
 * A bit like Array#filter, but removes elements that filter false from the
 * array. Returns the filtered items.
 *
 * @param {!Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} filter
 * @return {!Array<T>}
 * @template T
 */

function filterSplice(array, filter) {
  var splice = [];
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (!filter(item, i, array)) {
      splice.push(item);
      array.splice(i, 1);
      i--;
    }
  }
  return splice;
}

/**
 * Returns the index of the first element matching the predicate.
 * Like Array#findIndex.
 *
 * @param {!Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} predicate
 * @return {number}
 * @template T
 */

function findIndex(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

},{}],78:[function(require,module,exports){
exports.__esModule = true;
exports.base64UrlDecodeToBytes = base64UrlDecodeToBytes;
exports.base64DecodeToBytes = base64DecodeToBytes;
exports.base64UrlEncodeFromBytes = base64UrlEncodeFromBytes;
exports.base64EncodeFromBytes = base64EncodeFromBytes;
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

var _bytes = require('./bytes');

/**
 * Character mapping from base64url to base64.
 * @const {!Object<string, string>}
 */
var base64UrlDecodeSubs = { '-': '+', '_': '/', '.': '=' };

/**
 * Character mapping from base64 to base64url.
 * @const {!Object<string, string>}
 */
var base64UrlEncodeSubs = { '+': '-', '/': '_', '=': '.' };

/**
 * Converts a string which is in base64url encoding into a Uint8Array
 * containing the decoded value.
 * @param {string} str
 * @return {!Uint8Array}
 */

function base64UrlDecodeToBytes(str) {
  var encoded = atob(str.replace(/[-_.]/g, function (ch) {
    return base64UrlDecodeSubs[ch];
  }));
  return _bytes.stringToBytes(encoded);
}

/**
 * Converts a string which is in base64 encoding into a Uint8Array
 * containing the decoded value.
 * @param {string} str
 * @return {!Uint8Array}
 */

function base64DecodeToBytes(str) {
  return _bytes.stringToBytes(atob(str));
}

/**
 * Converts a bytes array into base64url encoded string.
 * base64url is defined in RFC 4648. It is sometimes referred to as "web safe".
 * @param {!Uint8Array} bytes
 * @return {string}
 */

function base64UrlEncodeFromBytes(bytes) {
  var str = _bytes.bytesToString(bytes);
  return btoa(str).replace(/[+/=]/g, function (ch) {
    return base64UrlEncodeSubs[ch];
  });
}

/**
 * Converts a bytes array into base64 encoded string.
 * @param {!Uint8Array} bytes
 * @return {string}
 */

function base64EncodeFromBytes(bytes) {
  return btoa(_bytes.bytesToString(bytes));
}

},{"./bytes":79}],79:[function(require,module,exports){
exports.__esModule = true;
exports.utf8Decode = utf8Decode;
exports.utf8DecodeSync = utf8DecodeSync;
exports.utf8Encode = utf8Encode;
exports.utf8EncodeSync = utf8EncodeSync;
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
exports.getCryptoRandomBytesArray = getCryptoRandomBytesArray;
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

var _log = require('../log');

/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!BufferSource} bytes
 * @return {!Promise<string>}
 */

function utf8Decode(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return Promise.resolve(new TextDecoder('utf-8').decode(bytes));
  }
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = function () {
      reject(reader.error);
    };
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsText(new Blob([bytes]));
  });
}

// TODO(aghassemi, #6139): Remove the async version of utf8 encoding and rename
// the sync versions to the canonical utf8Decode/utf8Encode.
/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!BufferSource} bytes
 * @return {!string}
 */

function utf8DecodeSync(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8').decode(bytes);
  }
  var asciiString = bytesToString(new Uint8Array(bytes.buffer || bytes));
  return decodeURIComponent(escape(asciiString));
}

/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Promise<!Uint8Array>}
 */

function utf8Encode(string) {
  if (typeof TextEncoder !== 'undefined') {
    return Promise.resolve(new TextEncoder('utf-8').encode(string));
  }
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = function () {
      reject(reader.error);
    };
    reader.onloadend = function () {
      // Because we used readAsArrayBuffer, we know the result must be an
      // ArrayBuffer.
      resolve(new Uint8Array( /** @type {ArrayBuffer} */reader.result));
    };
    reader.readAsArrayBuffer(new Blob([string]));
  });
}

/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Uint8Array}
 */

function utf8EncodeSync(string) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder('utf-8').encode(string);
  }
  return stringToBytes(unescape(encodeURIComponent(string)));
}

/**
 * Converts a string which holds 8-bit code points, such as the result of atob,
 * into a Uint8Array with the corresponding bytes.
 * If you have a string of characters, you probably want to be using utf8Encode.
 * @param {string} str
 * @return {!Uint8Array}
 */

function stringToBytes(str) {
  var bytes = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    _log.dev().assert(charCode <= 255, 'Characters must be in range [0,255]');
    bytes[i] = charCode;
  }
  return bytes;
}

;

/**
 * Converts a 8-bit bytes array into a string
 * @param {!Uint8Array} bytes
 * @return {string}
 */

function bytesToString(bytes) {
  return String.fromCharCode.apply(String, bytes);
}

;

/**
 * Generate a random bytes array with specific length using
 * win.crypto.getRandomValues. Return null if it is not available.
 * @param {!number} length
 * @return {?Uint8Array}
 */

function getCryptoRandomBytesArray(win, length) {
  if (!win.crypto || !win.crypto.getRandomValues) {
    return null;
  }

  // Widely available in browsers we support:
  // http://caniuse.com/#search=getRandomValues
  var uint8array = new Uint8Array(length);
  win.crypto.getRandomValues(uint8array);
  return uint8array;
}

},{"../log":51}],80:[function(require,module,exports){
exports.__esModule = true;
exports.domFingerprintPlain = domFingerprintPlain;
exports.domFingerprint = domFingerprint;
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

var _crypto = require('../crypto');

/**
 * Gets a string of concatenated element names and relative positions
 * of the DOM element and its parentElement's (up to 25).  Relative position
 * is the index of nodes with this tag within the parent's children.
 * The order is from the inner to outer nodes in DOM hierarchy.
 *
 * If a DOM hierarchy is the following:
 *
 * <div id='id1' ...>
 *   <div id='id2' ...>
 *     <table ...>       // table:0
 *       <tr>            // tr:0
 *         <td>...</td>  // td:0
 *         <td>          // td:1
 *           <amp-ad ...></amp-ad>
 *         </td>
 *       </tr>
 *       <tr>...</tr>    // tr:1
 *     </table>
 *   </div>
 * </div>
 *
 * With the amp-ad element passed in:
 * 'amp-ad.0,td.1,tr.0,table.0,div/id2.0,div/id1.0'
 *
 * Note: 25 is chosen arbitrarily.
 *
 * @param {?Element} element DOM node from which to get fingerprint.
 * @return {string} Concatenated element ids.
 */

function domFingerprintPlain(element) {
  var ids = [];
  var level = 0;
  while (element && element.nodeType == /* element */1 && level < 25) {
    var id = '';
    if (element.id) {
      id = '/' + element.id;
    }
    var nodeName = element.nodeName.toLowerCase();
    ids.push('' + nodeName + id + indexWithinParent(element));
    level++;
    element = element.parentElement;
  }
  return ids.join();
}

;

/**
 * Calculates ad slot DOM fingerprint.  This key is intended to
 * identify "same" ad unit across many page views. This is
 * based on where the ad appears within the page's DOM structure.
 *
 * @param {?Element} element The DOM element from which to collect
 *     the DOM chain element IDs.  If null, DOM chain element IDs are not
 *     included in the hash.
 * @return {string} The ad unit hash key string.
 */

function domFingerprint(element) {
  return _crypto.stringHash32(domFingerprintPlain(element));
}

;

/**
 * Gets a string showing the index of an element within
 * the children of its parent, counting only nodes with the same tag.
 * Stop at 25, just to have a limit.
 * @param {!Element} element DOM node to get index of.
 * @return {string} '.<index>' or ''.
 */
function indexWithinParent(element) {
  var nodeName = element.nodeName;
  // Find my index within my parent's children
  var i = 0;
  var count = 0;
  var sibling = element.previousElementSibling;
  // Different browsers have different children.
  // So count only nodes with the same tag.
  // Use a limit for the tags, so that different browsers get the same
  // count. So 25 and higher all return no index.
  while (sibling && count < 25 && i < 100) {
    if (sibling.nodeName == nodeName) {
      count++;
    }
    i++;
    sibling = sibling.previousElementSibling;
  }
  // If we got to the end, then the count is accurate; otherwise skip count.
  return count < 25 && i < 100 ? '.' + count : '';
};

},{"../crypto":33}],81:[function(require,module,exports){
exports.__esModule = true;
exports.some = some;
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
 * Returns a promise which resolves if a threshold amount of the given promises
 * resolve, and rejects otherwise.
 * @param {!Array<!Promise>} promises The array of promises to test.
 * @param {number} count The number of promises that must resolve for the
 *     returned promise to resolve.
 * @return {!Promise} A promise that resolves if any of the given promises
 *     resolve, and which rejects otherwise.
 */

function some(promises) {
  var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

  return new Promise(function (resolve, reject) {
    count = Math.max(count, 0);
    var extra = promises.length - count;
    if (extra < 0) {
      reject(new Error('not enough promises to resolve'));
    }
    if (promises.length == 0) {
      resolve([]);
    }
    var values = [];
    var reasons = [];

    var onFulfilled = function (value) {
      if (values.length < count) {
        values.push(value);
      }
      if (values.length == count) {
        resolve(values);
      }
    };
    var onRejected = function (reason) {
      if (reasons.length <= extra) {
        reasons.push(reason);
      }
      if (reasons.length > extra) {
        reject(reasons);
      }
    };
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(onFulfilled, onRejected);
    }
  });
}

},{}],82:[function(require,module,exports){
exports.__esModule = true;
exports.variantForOrNull = variantForOrNull;
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

var _elementService = require('./element-service');

/**
 * Returns a promise for the experiment variants or a promise for null if it is
 * not available on the current page.
 * @param {!Window} win
 * @return {!Promise<?Object<string>>}
 */

function variantForOrNull(win) {
  return (/** @type {!Promise<?Object<string>>} */_elementService.getElementServiceIfAvailable(win, 'variant', 'amp-experiment')
  );
}

},{"./element-service":38}],83:[function(require,module,exports){
exports.__esModule = true;
exports.viewerForDoc = viewerForDoc;
exports.viewerPromiseForDoc = viewerPromiseForDoc;
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
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/viewer-impl.Viewer}
 */

function viewerForDoc(nodeOrDoc) {
  return (/** @type {!./service/viewer-impl.Viewer} */_service.getExistingServiceForDoc(nodeOrDoc, 'viewer')
  );
}

/**
 * Returns promise for the viewer. This is an unusual case and necessary only
 * for services that need reference to the viewer before it has been
 * initialized. Most of the code, however, just should use `viewerForDoc`.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!Promise<!./service/viewer-impl.Viewer>}
 */

function viewerPromiseForDoc(nodeOrDoc) {
  return (/** @type {!Promise<!./service/viewer-impl.Viewer>} */_service.getServicePromiseForDoc(nodeOrDoc, 'viewer')
  );
}

},{"./service":64}],84:[function(require,module,exports){
exports.__esModule = true;
exports.viewportForDoc = viewportForDoc;
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
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/viewport-impl.Viewport}
 */

function viewportForDoc(nodeOrDoc) {
  return (/** @type {!./service/viewport-impl.Viewport} */_service.getExistingServiceForDoc(nodeOrDoc, 'viewport')
  );
}

},{"./service":64}],85:[function(require,module,exports){
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

},{"./service":64}],86:[function(require,module,exports){
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

},{}]},{},[21])


})});
//# sourceMappingURL=amp-ad-0.1.max.js.map