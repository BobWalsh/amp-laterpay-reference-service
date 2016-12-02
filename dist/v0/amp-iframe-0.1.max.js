(self.AMP = self.AMP || []).push({n:"amp-iframe", f:(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
exports.isAdLike = isAdLike;
exports.setTrackingIframeTimeoutForTesting = setTrackingIframeTimeoutForTesting;
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

var _srcUtilsBase64Js = require('../../../src/utils/base64.js');

var _srcIntersectionObserverPolyfill = require('../../../src/intersection-observer-polyfill');

var _srcAdHelper = require('../../../src/ad-helper');

var _srcLayout = require('../../../src/layout');

var _srcString = require('../../../src/string');

var _srcIframeHelper = require('../../../src/iframe-helper');

var _srcUrl = require('../../../src/url');

var _srcDom = require('../../../src/dom');

var _srcTimer = require('../../../src/timer');

var _srcLog = require('../../../src/log');

var _srcUtilsBytesJs = require('../../../src/utils/bytes.js');

var _srcConfig = require('../../../src/config');

var _srcLayoutRect = require('../../../src/layout-rect');

var _srcStyle = require('../../../src/style');

/** @const {string} */
var TAG_ = 'amp-iframe';

/** @type {number}  */
var count = 0;

/** @type {number}  */
var trackingIframeCount = 0;

/** @type {number}  */
var trackingIframeTimeout = 5000;

var AmpIframe = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpIframe, _AMP$BaseElement);

  function AmpIframe() {
    babelHelpers.classCallCheck(this, AmpIframe);

    _AMP$BaseElement.apply(this, arguments);
  }

  /** @override */

  AmpIframe.prototype.isLayoutSupported = function isLayoutSupported(layout) {
    return _srcLayout.isLayoutSizeDefined(layout);
  };

  AmpIframe.prototype.assertSource = function assertSource(src, containerSrc, sandbox) {
    var url = _srcUrl.parseUrl(src);
    // Some of these can be easily circumvented with redirects.
    // Checks are mostly there to prevent people easily do something
    // they did not mean to.
    _srcLog.user().assert(url.protocol == 'https:' || url.protocol == 'data:' || url.origin.indexOf('http://iframe.localhost:') == 0, 'Invalid <amp-iframe> src. Must start with https://. Found %s', this.element);
    var containerUrl = _srcUrl.parseUrl(containerSrc);
    _srcLog.user().assert(!(' ' + sandbox + ' ').match(/\s+allow-same-origin\s+/i) || url.origin != containerUrl.origin && url.protocol != 'data:', 'Origin of <amp-iframe> must not be equal to container %s' + 'if allow-same-origin is set. See https://github.com/ampproject/' + 'amphtml/blob/master/spec/amp-iframe-origin-policy.md for details.', this.element);
    _srcLog.user().assert(!(_srcString.endsWith(url.hostname, '.' + _srcConfig.urls.thirdPartyFrameHost) || _srcString.endsWith(url.hostname, '.ampproject.org')), 'amp-iframe does not allow embedding of frames from ' + 'ampproject.*: %s', src);
    return src;
  };

  AmpIframe.prototype.assertPosition = function assertPosition() {
    var pos = this.element.getLayoutBox();
    var minTop = Math.min(600, this.getViewport().getSize().height * .75);
    _srcLog.user().assert(pos.top >= minTop, '<amp-iframe> elements must be positioned outside the first 75% ' + 'of the viewport or 600px from the top (whichever is smaller): %s ' + ' Current position %s. Min: %s' + 'Positioning rules don\'t apply for iframes that use `placeholder`.' + 'See https://github.com/ampproject/amphtml/blob/master/extensions/' + 'amp-iframe/amp-iframe.md#iframe-with-placeholder for details.', this.element, pos.top, minTop);
  };

  /**
   * Transforms the srcdoc attribute if present to an equivalent data URI.
   *
   * It may be OK to change this later to leave the `srcdoc` in place and
   * instead ensure that `allow-same-origin` is not present, but this
   * implementation has the right security behavior which is that the document
   * may under no circumstances be able to run JS on the parent.
   * @param {string} srcdoc
   * @param {string} sandbox
   * @return {string} Data URI for the srcdoc
   */

  AmpIframe.prototype.transformSrcDoc = function transformSrcDoc(srcdoc, sandbox) {
    if (!srcdoc) {
      return;
    }
    _srcLog.user().assert(!(' ' + sandbox + ' ').match(/\s+allow-same-origin\s+/i), 'allow-same-origin is not allowed with the srcdoc attribute %s.', this.element);

    return 'data:text/html;charset=utf-8;base64,' + _srcUtilsBase64Js.base64EncodeFromBytes(_srcUtilsBytesJs.utf8EncodeSync(srcdoc));
  };

  /** @override */

  AmpIframe.prototype.firstAttachedCallback = function firstAttachedCallback() {
    /** @private @const {string} */
    this.sandbox_ = this.element.getAttribute('sandbox');

    var iframeSrc = this.element.getAttribute('src') || this.transformSrcDoc(this.element.getAttribute('srcdoc'), this.sandbox_);
    /**
     * The source of the iframe. May later be set to null for tracking iframes
     * to prevent them from being recreated.
     * @type {?string}
     **/
    this.iframeSrc = this.assertSource(iframeSrc, window.location.href, this.sandbox_);

    /**
     * The element which will contain the iframe. This may be the amp-iframe
     * itself if the iframe is non-scrolling, or a wrapper element if it is.
     * @type {!Element}
     */
    this.container_ = makeIOsScrollable(this.element);
  };

  /** @override */

  AmpIframe.prototype.preconnectCallback = function preconnectCallback(onLayout) {
    if (this.iframeSrc) {
      this.preconnect.url(this.iframeSrc, onLayout);
    }
  };

  /** @override */

  AmpIframe.prototype.buildCallback = function buildCallback() {
    /** @private @const {!Element} */
    this.placeholder_ = this.getPlaceholder();

    /** @private @const {boolean} */
    this.isClickToPlay_ = !!this.placeholder_;

    /** @private {boolean} */
    this.isAdLike_ = false;

    /** @private {boolean} */
    this.isTrackingFrame_ = false;

    /** @private {boolean} */
    this.isDisallowedAsAd_ = false;

    /**
     * Call to stop listening to viewport changes.
     * @private {?function()}
     */
    this.unlistenViewportChanges_ = null;

    /**
     * The (relative) layout box of the ad iframe to the amp-ad tag.
     * @private {?../../../src/layout-rect.LayoutRectDef}
     */
    this.iframeLayoutBox_ = null;

    /** @private  {?HTMLIFrameElement} */
    this.iframe_ = null;

    /** @private @const {boolean} */
    this.isResizable_ = this.element.hasAttribute('resizable');
    if (this.isResizable_) {
      this.element.setAttribute('scrolling', 'no');
    }

    /** @private {?IntersectionObserverApi} */
    this.intersectionObserverApi_ = null;

    if (!this.element.hasAttribute('frameborder')) {
      this.element.setAttribute('frameborder', '0');
    }
  };

  /**
   * @override
   */

  AmpIframe.prototype.onLayoutMeasure = function onLayoutMeasure() {
    // We remeasured this tag, lets also remeasure the iframe. Should be
    // free now and it might have changed.
    this.measureIframeLayoutBox_();

    this.isAdLike_ = isAdLike(this);
    this.isTrackingFrame_ = this.looksLikeTrackingIframe_();
    this.isDisallowedAsAd_ = this.isAdLike_ && !_srcAdHelper.isAdPositionAllowed(this.element, this.win);

    // When the framework has the need to remeasure us, our position might
    // have changed. Send an intersection record if needed. This can be done by
    // intersectionObserverApi onlayoutMeasure function.
    if (this.intersectionObserverApi_) {
      this.intersectionObserverApi_.fire();
    }
  };

  /**
   * Measure the layout box of the iframe if we rendered it already.
   * @private
   */

  AmpIframe.prototype.measureIframeLayoutBox_ = function measureIframeLayoutBox_() {
    if (this.iframe_) {
      var iframeBox = this.getViewport().getLayoutRect(this.iframe_);
      var box = this.getLayoutBox();
      this.iframeLayoutBox_ = _srcLayoutRect.moveLayoutRect(iframeBox, -box.left, -box.top);
    }
  };

  /**
   * @override
   */

  AmpIframe.prototype.getIntersectionElementLayoutBox = function getIntersectionElementLayoutBox() {
    if (!this.iframe_) {
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

  AmpIframe.prototype.layoutCallback = function layoutCallback() {
    var _this = this;

    _srcLog.user().assert(!this.isDisallowedAsAd_, 'amp-iframe is not used for ' + 'displaying fixed ad. Please use amp-sticky-ad and amp-ad instead.');

    if (!this.isClickToPlay_) {
      this.assertPosition();
    }

    if (this.isResizable_) {
      _srcLog.user().assert(this.getOverflowElement(), 'Overflow element must be defined for resizable frames: %s', this.element);
    }

    if (!this.iframeSrc) {
      // This failed already, lets not signal another error.
      return Promise.resolve();
    }

    if (this.isTrackingFrame_) {
      trackingIframeCount++;
      if (trackingIframeCount > 1) {
        console /*OK*/.error('Only 1 analytics/tracking iframe allowed per ' + 'page. Please use amp-analytics instead or file a GitHub issue ' + 'for your use case: ' + 'https://github.com/ampproject/amphtml/issues/new');
        return Promise.resolve();
      }
    }

    var iframe = this.element.ownerDocument.createElement('iframe');

    this.iframe_ = iframe;

    this.applyFillContent(iframe);
    iframe.name = 'amp_iframe' + count++;

    if (this.isClickToPlay_) {
      _srcStyle.setStyle(iframe, 'zIndex', -1);
    }

    this.propagateAttributes(['frameborder', 'allowfullscreen', 'allowtransparency', 'scrolling', 'referrerpolicy'], iframe);
    setSandbox(this.element, iframe, this.sandbox_);
    iframe.src = this.iframeSrc;

    if (!this.isTrackingFrame_) {
      this.intersectionObserverApi_ = new _srcIntersectionObserverPolyfill.IntersectionObserverApi(this, iframe);
    }

    iframe.onload = function () {
      // Chrome does not reflect the iframe readystate.
      iframe.readyState = 'complete';

      _this.activateIframe_();

      if (_this.isTrackingFrame_) {
        // Prevent this iframe from ever being recreated.
        _this.iframeSrc = null;

        _srcTimer.timerFor(_this.win).promise(trackingIframeTimeout).then(function () {
          _srcDom.removeElement(iframe);
          _this.element.setAttribute('amp-removed', '');
          _this.iframe_ = null;
        });
      }
    };

    _srcIframeHelper.listenFor(iframe, 'embed-size', function (data) {
      _this.updateSize_(data.height, data.width);
    });

    if (this.isClickToPlay_) {
      _srcIframeHelper.listenFor(iframe, 'embed-ready', this.activateIframe_.bind(this));
    }

    this.container_.appendChild(iframe);

    return this.loadPromise(iframe).then(function () {
      // On iOS the iframe at times fails to render inside the `overflow:auto`
      // container. To avoid this problem, we set the `overflow:auto` property
      // 1s later via `amp-active` class.
      if (_this.container_ != _this.element) {
        _srcTimer.timerFor(_this.win).delay(function () {
          _this.deferMutate(function () {
            _this.container_.classList.add('amp-active');
          });
        }, 1000);
      }
    });
  };

  /** @override */

  AmpIframe.prototype.unlayoutOnPause = function unlayoutOnPause() {
    return true;
  };

  /**
   * Removes this iframe from the page, freeing its resources. This is needed
   * to stop the bad eggs who continue to play videos even after the user has
   * swiped away from the doc.
   * @override
   **/

  AmpIframe.prototype.unlayoutCallback = function unlayoutCallback() {
    if (this.iframe_) {
      _srcDom.removeElement(this.iframe_);
      if (this.placeholder_) {
        this.togglePlaceholder(true);
      }

      this.iframe_ = null;
      // Needs to clean up intersectionObserverApi_
      if (this.intersectionObserverApi_) {
        this.intersectionObserverApi_.destroy();
        this.intersectionObserverApi_ = null;
      }
    }
    return true;
  };

  /** @override  */

  AmpIframe.prototype.viewportCallback = function viewportCallback(inViewport) {
    if (this.intersectionObserverApi_) {
      this.intersectionObserverApi_.onViewportCallback(inViewport);
    }
  };

  /** @override  */

  AmpIframe.prototype.getPriority = function getPriority() {
    if (this.isAdLike_) {
      return 2; // See AmpAd3PImpl.
    }
    if (this.isTrackingFrame_) {
      return 1;
    }
    return _AMP$BaseElement.prototype.getPriority.call(this);
  };

  /**
   * Makes the iframe visible.
   * @private
   */

  AmpIframe.prototype.activateIframe_ = function activateIframe_() {
    var _this2 = this;

    if (this.placeholder_) {
      this.getVsync().mutate(function () {
        if (_this2.iframe_) {
          _srcStyle.setStyle(_this2.iframe_, 'zIndex', 0);
          _this2.togglePlaceholder(false);
        }
      });
    }
  };

  /**
   * No need for the default behavior, we'll call togglePlaceholder ourselves.
   * @override
   */

  AmpIframe.prototype.firstLayoutCompleted = function firstLayoutCompleted() {};

  /**
   * Updates the element's dimensions to accommodate the iframe's
   *    requested dimensions.
   * @param {number|undefined} height
   * @param {number|undefined} width
   * @private
   */

  AmpIframe.prototype.updateSize_ = function updateSize_(height, width) {
    var _this3 = this;

    if (!this.isResizable_) {
      _srcLog.user().error(TAG_, 'Ignoring embed-size request because this iframe is not resizable', this.element);
      return;
    }

    if (height < 100) {
      _srcLog.user().error(TAG_, 'Ignoring embed-size request because the resize height is less ' + 'than 100px. If you are using amp-iframe to display ads, consider ' + 'using amp-ad instead.', this.element);
      return;
    }

    // Calculate new width and height of the container to include the padding.
    // If padding is negative, just use the requested width and height directly.
    var newHeight = undefined,
        newWidth = undefined;
    height = parseInt(height, 10);
    if (!isNaN(height)) {
      newHeight = Math.max(height + (this.element. /*OK*/offsetHeight - this.iframe_. /*OK*/offsetHeight), height);
    }
    width = parseInt(width, 10);
    if (!isNaN(width)) {
      newWidth = Math.max(width + (this.element. /*OK*/offsetWidth - this.iframe_. /*OK*/offsetWidth), width);
    }

    if (newHeight !== undefined || newWidth !== undefined) {
      this.attemptChangeSize(newHeight, newWidth).then(function () {
        if (newHeight !== undefined) {
          _this3.element.setAttribute('height', newHeight);
        }
        if (newWidth !== undefined) {
          _this3.element.setAttribute('width', newWidth);
        }
      }, function () {});
    } else {
      _srcLog.user().error(TAG_, 'Ignoring embed-size request because' + 'no width or height value is provided', this.element);
    }
  };

  /**
   * Whether this is iframe may have tracking as its primary use case.
   * @return {boolean}
   */

  AmpIframe.prototype.looksLikeTrackingIframe_ = function looksLikeTrackingIframe_() {
    var box = this.element.getLayoutBox();
    // This heuristic is subject to change.
    if (box.width > 10 && box.height > 10) {
      return false;
    }
    return true;
  };

  return AmpIframe;
})(AMP.BaseElement);

exports.AmpIframe = AmpIframe;
;

/**
 * We always set a sandbox. Default is that none of the things that need
 * to be opted in are allowed.
 * @param {!Element} element
 * @param {!Element} iframe
 * @param {string} sandbox
 */
function setSandbox(element, iframe, sandbox) {
  var allows = sandbox || '';
  iframe.setAttribute('sandbox', allows);
}

/**
 * If scrolling is allowed for the iframe, wraps the element into a container
 * that is scrollable because iOS auto expands iframes to their size.
 * @param {!Element} element
 * @return {!Element} The container or the iframe.
 */
function makeIOsScrollable(element) {
  if (element.getAttribute('scrolling') != 'no') {
    var wrapper = element.ownerDocument.createElement('i-amp-scroll-container');
    element.appendChild(wrapper);
    return wrapper;
  }
  return element;
}

// Most common ad sizes
// Array of [width, height] pairs.
var adSizes = [[300, 250], [320, 50], [300, 50], [320, 100]];

/**
 * Guess whether this element might be an ad.
 * @param {!BaseElement} ampElement An amp-iframe element.
 * @return {boolean}
 * @visibleForTesting
 */

function isAdLike(ampElement) {
  var box = ampElement.getIntersectionElementLayoutBox();
  var height = box.height;
  var width = box.width;
  for (var i = 0; i < adSizes.length; i++) {
    var refWidth = adSizes[i][0];
    var refHeight = adSizes[i][1];
    if (refHeight > height) {
      continue;
    }
    if (refWidth > width) {
      continue;
    }
    // Fuzzy matching to account for padding.
    if (height - refHeight <= 20 && width - refWidth <= 20) {
      return true;
    }
  }
  return false;
}

/**
 * @param {number} ms
 */

function setTrackingIframeTimeoutForTesting(ms) {
  trackingIframeTimeout = ms;
}

AMP.registerElement('amp-iframe', AmpIframe);

},{"../../../src/ad-helper":4,"../../../src/config":5,"../../../src/dom":7,"../../../src/iframe-helper":9,"../../../src/intersection-observer-polyfill":10,"../../../src/layout":12,"../../../src/layout-rect":11,"../../../src/log":13,"../../../src/string":22,"../../../src/style":23,"../../../src/timer":24,"../../../src/url":26,"../../../src/utils/base64.js":28,"../../../src/utils/bytes.js":29}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./log":13}],5:[function(require,module,exports){
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

},{"../third_party/css-escape/css-escape":30,"./log":13,"./types":25}],8:[function(require,module,exports){
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

},{"./cookies":6,"./url":26}],9:[function(require,module,exports){
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

},{"./log":13,"./url":26,"./utils/array":27}],10:[function(require,module,exports){
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

},{"./iframe-helper":9,"./layout-rect":11,"./log":13}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./experiments":8,"./log":13,"./style":23,"./types":25}],13:[function(require,module,exports){
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

},{"./mode":15,"./mode-object":14}],14:[function(require,module,exports){
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

},{"./mode":15}],15:[function(require,module,exports){
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
var version = '1481021772855';

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

  // Currently `1481021772855` and thus `mode.version` contain only
  // major version. The full version however must also carry the minor version.
  // We will default to production default `01` minor version for now.
  // TODO(erwinmombay): decide whether 1481021772855 should contain
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

},{}],16:[function(require,module,exports){
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

},{"./mode":15,"./polyfills/document-contains":17,"./polyfills/math-sign":18,"./polyfills/object-assign":19,"./polyfills/promise":20,"document-register-element/build/document-register-element.node":2}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"promise-pjs/promise":3}],21:[function(require,module,exports){
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

},{"./log":13,"./polyfills":16}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./service":21}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"./config":5,"./log":13,"./mode":15,"./string":22,"./types":25}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"./bytes":29}],29:[function(require,module,exports){
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

},{"../log":13}],30:[function(require,module,exports){
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

},{}]},{},[1])


})});
//# sourceMappingURL=amp-iframe-0.1.max.js.map