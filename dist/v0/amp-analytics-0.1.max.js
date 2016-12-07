(self.AMP = self.AMP || []).push({n:"amp-analytics", f:(function(AMP) {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.__esModule = true;
exports.installActivityService = installActivityService;
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
 * @fileoverview Provides an ability to collect data about activities the user
 * has performed on the page.
 */

var _srcService = require('../../../src/service');

var _srcViewer = require('../../../src/viewer');

var _srcViewport = require('../../../src/viewport');

var _srcEventHelper = require('../../../src/event-helper');

/**
 * The amount of time after an activity the user is considered engaged.
 * @private @const {number}
 */
var DEFAULT_ENGAGED_SECONDS = 5;

/**
 * @enum {string}
 */
var ActivityEventType = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

/**
 * @typedef {{
 *   type: string,
 *   time: number
 * }}
 */
var ActivityEventDef = undefined;

/**
 * Find the engaged time between the event and the time (exclusive of the time)
 * @param {ActivityEventDef} activityEvent
 * @param {number} time
 * @return {number}
 * @private
 */
function findEngagedTimeBetween(activityEvent, time) {
  var engagementBonus = 0;

  if (activityEvent.type === ActivityEventType.ACTIVE) {
    engagementBonus = DEFAULT_ENGAGED_SECONDS;
  }

  return Math.min(time - activityEvent.time, engagementBonus);
}

var ActivityHistory = (function () {
  function ActivityHistory() {
    babelHelpers.classCallCheck(this, ActivityHistory);

    /** @private {number} */
    this.totalEngagedTime_ = 0;

    /**
     * prevActivityEvent_ remains undefined until the first valid push call.
     * @private {ActivityEventDef|undefined}
     */
    this.prevActivityEvent_ = undefined;
  }

  /**
   * Array of event types which will be listened for on the document to indicate
   * activity. Other activities are also observed on the Viewer and Viewport
   * objects. See {@link setUpActivityListeners_} for listener implementation.
   * @private @const {Array<string>}
   */

  /**
   * Indicate that an activity took place at the given time.
   * @param {ActivityEventDef} activityEvent
   */

  ActivityHistory.prototype.push = function push(activityEvent) {
    if (!this.prevActivityEvent_) {
      this.prevActivityEvent_ = activityEvent;
    }

    if (this.prevActivityEvent_.time < activityEvent.time) {
      this.totalEngagedTime_ += findEngagedTimeBetween(this.prevActivityEvent_, activityEvent.time);
      this.prevActivityEvent_ = activityEvent;
    }
  };

  /**
   * Get the total engaged time up to the given time recorded in
   * ActivityHistory.
   * @param {number} time
   * @return {number}
   */

  ActivityHistory.prototype.getTotalEngagedTime = function getTotalEngagedTime(time) {
    var totalEngagedTime = 0;
    if (this.prevActivityEvent_ !== undefined) {
      totalEngagedTime = this.totalEngagedTime_ + findEngagedTimeBetween(this.prevActivityEvent_, time);
    }
    return totalEngagedTime;
  };

  return ActivityHistory;
})();

var ACTIVE_EVENT_TYPES = ['mousedown', 'mouseup', 'mousemove', 'keydown', 'keyup'];

var Activity = (function () {

  /**
   * Activity tracks basic user activity on the page.
   *  - Listeners are not registered on the activity event types until the
   *    Viewer's `whenFirstVisible` is resolved.
   *  - When the `whenFirstVisible` of Viewer is resolved, a first activity
   *    is recorded.
   *  - The first activity in any second causes all other activities to be
   *    ignored. This is similar to debounce functionality since some events
   *    (e.g. scroll) could occur in rapid succession.
   *  - In any one second period, active events or inactive events can override
   *    each other. Whichever type occured last has precedence.
   *  - Active events give a 5 second "bonus" to engaged time.
   *  - Inactive events cause an immediate stop to the engaged time bonus of
   *    any previous activity event.
   *  - At any point after instantiation, `getTotalEngagedTime` can be used
   *    to get the engage time up to the time the function is called. If
   *    `whenFirstVisible` has not yet resolved, engaged time is 0.
   * @param {!Window} win
   */

  function Activity(win) {
    babelHelpers.classCallCheck(this, Activity);

    /** @private @const */
    this.win_ = win;

    /** @private @const {function()} */
    this.boundStopIgnore_ = this.stopIgnore_.bind(this);

    /** @private @const {function()} */
    this.boundHandleActivity_ = this.handleActivity_.bind(this);

    /** @private @const {function()} */
    this.boundHandleInactive_ = this.handleInactive_.bind(this);

    /** @private @const {function()} */
    this.boundHandleVisibilityChange_ = this.handleVisibilityChange_.bind(this);

    /** @private {Array<!UnlistenDef>} */
    this.unlistenFuncs_ = [];

    /** @private {boolean} */
    this.ignoreActivity_ = false;

    /** @private {boolean} */
    this.ignoreInactive_ = false;

    /** @private @const {!ActivityHistory} */
    this.activityHistory_ = new ActivityHistory();

    /** @private @const {!../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = _srcViewer.viewerForDoc(this.win_.document);

    /** @private @const {!../../../src/service/viewport-impl.Viewport} */
    this.viewport_ = _srcViewport.viewportForDoc(this.win_.document);

    this.viewer_.whenFirstVisible().then(this.start_.bind(this));
  }

  /** @private */

  Activity.prototype.start_ = function start_() {
    /** @private @const {number} */
    this.startTime_ = Date.now();
    // record an activity since this is when the page became visible
    this.handleActivity_();
    this.setUpActivityListeners_();
  };

  /** @private */

  Activity.prototype.getTimeSinceStart_ = function getTimeSinceStart_() {
    var timeSinceStart = Date.now() - this.startTime_;
    // Ensure that a negative time is never returned. This may cause loss of
    // data if there is a time change during the session but it will decrease
    // the likelyhood of errors in that situation.
    return timeSinceStart > 0 ? timeSinceStart : 0;
  };

  /**
   * Return to a state where neither activities or inactivity events are
   * ignored when that event type is fired.
   * @private
   */

  Activity.prototype.stopIgnore_ = function stopIgnore_() {
    this.ignoreActivity_ = false;
    this.ignoreInactive_ = false;
  };

  /** @private */

  Activity.prototype.setUpActivityListeners_ = function setUpActivityListeners_() {
    for (var i = 0; i < ACTIVE_EVENT_TYPES.length; i++) {
      this.unlistenFuncs_.push(_srcEventHelper.listen(this.win_.document, ACTIVE_EVENT_TYPES[i], this.boundHandleActivity_));
    }

    this.unlistenFuncs_.push(this.viewer_.onVisibilityChanged(this.boundHandleVisibilityChange_));

    // Viewport.onScroll does not return an unlisten function.
    // TODO(britice): If Viewport is updated to return an unlisten function,
    // update this to capture the unlisten function.
    this.viewport_.onScroll(this.boundHandleActivity_);
  };

  /** @private */

  Activity.prototype.handleActivity_ = function handleActivity_() {
    if (this.ignoreActivity_) {
      return;
    }
    this.ignoreActivity_ = true;
    this.ignoreInactive_ = false;

    this.handleActivityEvent_(ActivityEventType.ACTIVE);
  };

  /** @private */

  Activity.prototype.handleInactive_ = function handleInactive_() {
    if (this.ignoreInactive_) {
      return;
    }
    this.ignoreInactive_ = true;
    this.ignoreActivity_ = false;

    this.handleActivityEvent_(ActivityEventType.INACTIVE);
  };

  /**
   * @param {ActivityEventType} type
   * @private
   */

  Activity.prototype.handleActivityEvent_ = function handleActivityEvent_(type) {
    var timeSinceStart = this.getTimeSinceStart_();
    var secondKey = Math.floor(timeSinceStart / 1000);
    var timeToWait = 1000 - timeSinceStart % 1000;

    // stop ignoring activity at the start of the next activity bucket
    setTimeout(this.boundStopIgnore_, timeToWait);

    this.activityHistory_.push({
      type: type,
      time: secondKey
    });
  };

  /** @private */

  Activity.prototype.handleVisibilityChange_ = function handleVisibilityChange_() {
    if (this.viewer_.isVisible()) {
      this.handleActivity_();
    } else {
      this.handleInactive_();
    }
  };

  /**
   * Remove all listeners associated with this Activity instance.
   * @private
   */

  Activity.prototype.unlisten_ = function unlisten_() {
    for (var i = 0; i < this.unlistenFuncs_.length; i++) {
      var unlistenFunc = this.unlistenFuncs_[i];
      // TODO(britice): Due to eslint typechecking, this check may not be
      // necessary.
      if (typeof unlistenFunc === 'function') {
        unlistenFunc();
      }
    }
    this.unlistenFuncs_ = [];
  };

  /** @private */

  Activity.prototype.cleanup_ = function cleanup_() {
    this.unlisten_();
  };

  /**
   * Get total engaged time since the page became visible.
   * @return {number}
   */

  Activity.prototype.getTotalEngagedTime = function getTotalEngagedTime() {
    var secondsSinceStart = Math.floor(this.getTimeSinceStart_() / 1000);
    return this.activityHistory_.getTotalEngagedTime(secondsSinceStart);
  };

  return Activity;
})();

exports.Activity = Activity;
;

/**
 * @param  {!Window} win
 * @return {!Activity}
 */

function installActivityService(win) {
  return _srcService.fromClass(win, 'activity', Activity);
}

;

},{"../../../src/event-helper":17,"../../../src/service":29,"../../../src/viewer":38,"../../../src/viewport":39}],2:[function(require,module,exports){
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

var _vendors = require('./vendors');

var _instrumentation = require('./instrumentation');

var _srcDom = require('../../../src/dom');

var _srcUrl = require('../../../src/url');

var _srcLog = require('../../../src/log');

var _srcString = require('../../../src/string');

var _cidImpl = require('./cid-impl');

var _cryptoImpl = require('./crypto-impl');

var _activityImpl = require('./activity-impl');

var _srcTypes = require('../../../src/types');

var _transport = require('./transport');

var _srcUrlReplacements = require('../../../src/url-replacements');

var _srcUserNotification = require('../../../src/user-notification');

var _srcCrypto = require('../../../src/crypto');

var _srcXhr = require('../../../src/xhr');

var _srcStyle = require('../../../src/style');

// Register doc-service factory.
AMP.registerServiceForDoc('amp-analytics-instrumentation', _instrumentation.InstrumentationService);

_activityImpl.installActivityService(AMP.win);
_cidImpl.installCidService(AMP.win);
_cryptoImpl.installCryptoService(AMP.win);

var MAX_REPLACES = 16; // The maximum number of entries in a extraUrlParamsReplaceMap

var AmpAnalytics = (function (_AMP$BaseElement) {
  babelHelpers.inherits(AmpAnalytics, _AMP$BaseElement);

  /** @param {!AmpElement} element */

  function AmpAnalytics(element) {
    babelHelpers.classCallCheck(this, AmpAnalytics);

    _AMP$BaseElement.call(this, element);

    /**
     * @const {!JSONType} Copied here for tests.
     * @private
     */
    this.predefinedConfig_ = _vendors.ANALYTICS_CONFIG;

    /** @private {!Promise} */
    this.consentPromise_ = Promise.resolve();

    /**
     * The html id of the `amp-user-notification` element.
     * @private {?string}
     */
    this.consentNotificationId_ = null;

    /**
     * @private {?string} Predefined type associated with the tag. If specified,
     * the config from the predefined type is merged with the inline config
     */
    this.type_ = null;

    /**
     * @private {Object<string, string>} A map of request names to the request
     * format string used by the tag to send data
     */
    this.requests_ = {};

    /**
     * @private {JSONType}
     */
    this.config_ = /** @type {JSONType} */{};

    /**
     * @private {JSONType}
     */
    this.remoteConfig_ = /** @type {JSONType} */{};

    /** @private {?./instrumentation.InstrumentationService} */
    this.instrumentation_ = null;
  }

  /** @override */

  AmpAnalytics.prototype.getPriority = function getPriority() {
    // Loads after other content.
    return 1;
  };

  /** @override */

  AmpAnalytics.prototype.isAlwaysFixed = function isAlwaysFixed() {
    return true;
  };

  /** @override */

  AmpAnalytics.prototype.isLayoutSupported = function isLayoutSupported(unusedLayout) {
    return true;
  };

  /** @override */

  AmpAnalytics.prototype.buildCallback = function buildCallback() {
    var _this = this;

    this.element.setAttribute('aria-hidden', 'true');

    this.consentNotificationId_ = this.element.getAttribute('data-consent-notification-id');

    this.instrumentation_ = _instrumentation.instrumentationServiceForDoc(this.getAmpDoc());

    if (this.consentNotificationId_ != null) {
      this.consentPromise_ = _srcUserNotification.userNotificationManagerFor(this.win).then(function (service) {
        return service.get(_this.consentNotificationId_);
      });
    }
  };

  /** @override */

  AmpAnalytics.prototype.layoutCallback = function layoutCallback() {
    // Now that we are rendered, stop rendering the element to reduce
    // resource consumption.
    _srcStyle.toggle(this.element, false);

    return this.consentPromise_.then(this.fetchRemoteConfig_.bind(this)).then(this.onFetchRemoteConfigSuccess_.bind(this));
  };

  /**
   * Handle successful fetching of (possibly) remote config.
   * @return {!Promise|undefined}
   * @private
   */

  AmpAnalytics.prototype.onFetchRemoteConfigSuccess_ = function onFetchRemoteConfigSuccess_() {
    var _this2 = this;

    this.config_ = this.mergeConfigs_();

    if (this.hasOptedOut_()) {
      // Nothing to do when the user has opted out.
      var TAG = this.getName_();
      _srcLog.user().fine(TAG, 'User has opted out. No hits will be sent.');
      return Promise.resolve();
    }

    this.generateRequests_();

    if (!this.config_['triggers']) {
      var TAG = this.getName_();
      _srcLog.user().error(TAG, 'No triggers were found in the ' + 'config. No analytics data will be sent.');
      return Promise.resolve();
    }

    this.processExtraUrlParams_(this.config_['extraUrlParams'], this.config_['extraUrlParamsReplaceMap']);

    var promises = [];
    // Trigger callback can be synchronous. Do the registration at the end.
    for (var k in this.config_['triggers']) {
      if (this.config_['triggers'].hasOwnProperty(k)) {
        var _ret = (function () {
          var trigger = null;
          trigger = _this2.config_['triggers'][k];
          var TAG = _this2.getName_();
          if (!trigger) {
            _srcLog.user().error(TAG, 'Trigger should be an object: ', k);
            return 'continue';
          }
          if (!trigger['on'] || !trigger['request']) {
            _srcLog.user().error(TAG, '"on" and "request" ' + 'attributes are required for data to be collected.');
            return 'continue';
          }
          _this2.processExtraUrlParams_(trigger['extraUrlParams'], _this2.config_['extraUrlParamsReplaceMap']);
          promises.push(_this2.isSampledIn_(trigger).then(function (result) {
            if (!result) {
              return;
            }

            if (trigger['selector']) {
              // Expand the selector using variable expansion.
              trigger['selector'] = _this2.expandTemplate_(trigger['selector'], trigger, /* arg*/undefined, /* arg */undefined,
              /* arg*/false);
              _this2.instrumentation_.addListener(trigger, _this2.handleEvent_.bind(_this2, trigger), _this2.element);
            } else {
              _this2.instrumentation_.addListener(trigger, _this2.handleEvent_.bind(_this2, trigger), _this2.element);
            }
          }));
        })();

        if (_ret === 'continue') continue;
      }
    }
    return Promise.all(promises);
  };

  /**
   * Replace the names of keys in params object with the values in replace map.
   *
   * @param {!Object<string, string>} params The params that need to be renamed.
   * @param {!Object<string, string>} replaceMap A map of pattern and replacement
   *    value.
   * @private
   */

  AmpAnalytics.prototype.processExtraUrlParams_ = function processExtraUrlParams_(params, replaceMap) {
    if (params && replaceMap) {
      // If the config includes a extraUrlParamsReplaceMap, apply it as a set
      // of params to String.replace to allow aliasing of the keys in
      // extraUrlParams.
      var count = 0;
      for (var replaceMapKey in replaceMap) {
        if (++count > MAX_REPLACES) {
          var TAG = this.getName_();
          _srcLog.user().error(TAG, 'More than ' + MAX_REPLACES + ' extraUrlParamsReplaceMap rules ' + 'aren\'t allowed; Skipping the rest');
          break;
        }

        for (var extraUrlParamsKey in params) {
          var newkey = extraUrlParamsKey.replace(replaceMapKey, replaceMap[replaceMapKey]);
          if (extraUrlParamsKey != newkey) {
            var value = params[extraUrlParamsKey];
            delete params[extraUrlParamsKey];
            params[newkey] = value;
          }
        }
      }
    }
  };

  /**
   * Returns a promise that resolves when remote config is ready (or
   * immediately if no remote config is specified.)
   * @private
   * @return {!Promise<undefined>}
   */

  AmpAnalytics.prototype.fetchRemoteConfig_ = function fetchRemoteConfig_() {
    var _this3 = this;

    var remoteConfigUrl = this.element.getAttribute('config');
    if (!remoteConfigUrl) {
      return Promise.resolve();
    }
    _srcUrl.assertHttpsUrl(remoteConfigUrl, this.element);
    var TAG = this.getName_();
    _srcLog.dev().fine(TAG, 'Fetching remote config', remoteConfigUrl);
    var fetchConfig = {
      requireAmpResponseSourceOrigin: true
    };
    if (this.element.hasAttribute('data-credentials')) {
      fetchConfig.credentials = this.element.getAttribute('data-credentials');
    }
    /** @const {!Window} */
    var win = this.win;
    return _srcUrlReplacements.urlReplacementsForDoc(win.document).expandAsync(remoteConfigUrl).then(function (expandedUrl) {
      remoteConfigUrl = expandedUrl;
      return _srcXhr.xhrFor(win).fetchJson(remoteConfigUrl, fetchConfig);
    }).then(function (jsonValue) {
      _this3.remoteConfig_ = jsonValue;
      _srcLog.dev().fine(TAG, 'Remote config loaded', remoteConfigUrl);
    }, function (err) {
      _srcLog.user().error(TAG, 'Error loading remote config: ', remoteConfigUrl, err);
    });
  };

  /**
   * Merges various sources of configs and stores them in a member variable.
   *
   * Order of precedence for configs from highest to lowest:
   * - Remote config: specified through an attribute of the tag.
   * - Inline config: specified insize the tag.
   * - Predefined config: Defined as part of the platform.
   * - Default config: Built-in config shared by all amp-analytics tags.
   *
   * @private
   * @return {!JSONType}
   */

  AmpAnalytics.prototype.mergeConfigs_ = function mergeConfigs_() {
    var inlineConfig = this.getInlineConfigNoInline();
    // Initialize config with analytics related vars.
    var config = /** @type {!JSONType} */{
      'vars': {
        'requestCount': 0
      }
    };
    var defaultConfig = this.predefinedConfig_['default'] || {};
    var typeConfig = this.predefinedConfig_[this.element.getAttribute('type')] || {};

    this.mergeObjects_(defaultConfig, config);
    this.mergeObjects_(typeConfig, config, /* predefined */true);
    this.mergeObjects_(inlineConfig, config);
    this.mergeObjects_(this.remoteConfig_, config);
    return config;
  };

  /** @private */

  AmpAnalytics.prototype.getInlineConfigNoInline = function getInlineConfigNoInline() {
    var inlineConfig = {};
    var TAG = this.getName_();
    try {
      var children = this.element.children;
      if (children.length == 1) {
        var child = children[0];
        if (_srcDom.isJsonScriptTag(child)) {
          inlineConfig = JSON.parse(children[0].textContent);
        } else {
          _srcLog.user().error(TAG, 'The analytics config should ' + 'be put in a <script> tag with type="application/json"');
        }
      } else if (children.length > 1) {
        _srcLog.user().error(TAG, 'The tag should contain only one' + ' <script> child.');
      }
    } catch (er) {
      _srcLog.user().error(TAG, 'Analytics config could not be ' + 'parsed. Is it in a valid JSON format?', er);
    }
    return inlineConfig;
  };

  /**
   * @return {boolean} true if the user has opted out.
   */

  AmpAnalytics.prototype.hasOptedOut_ = function hasOptedOut_() {
    if (!this.config_['optout']) {
      return false;
    }

    var props = this.config_['optout'].split('.');
    var k = this.win;
    for (var i = 0; i < props.length; i++) {
      if (!k) {
        return false;
      }
      k = k[props[i]];
    }
    return k();
  };

  /**
   * Goes through all the requests in predefined vendor config and tag's config
   * and creates a map of request name to request template. These requests can
   * then be used while sending a request to a server.
   *
   * @private
   */

  AmpAnalytics.prototype.generateRequests_ = function generateRequests_() {
    var _this4 = this;

    var requests = {};
    if (!this.config_ || !this.config_['requests']) {
      var TAG = this.getName_();
      _srcLog.user().error(TAG, 'No request strings defined. Analytics ' + 'data will not be sent from this page.');
      return;
    }
    for (var k in this.config_['requests']) {
      if (this.config_['requests'].hasOwnProperty(k)) {
        requests[k] = this.config_['requests'][k];
      }
    }
    this.requests_ = requests;

    // Expand any placeholders. For requests, we expand each string up to 5
    // times to support nested requests. Leave any unresolved placeholders.
    for (var k in this.requests_) {
      this.requests_[k] = _srcString.expandTemplate(this.requests_[k], function (key) {
        return _this4.requests_[key] || '${' + key + '}';
      }, 5);
    }
  };

  /**
   * Callback for events that are registered by the config's triggers. This
   * method generates requests and sends them out.
   *
   * @param {!JSONType} trigger JSON config block that resulted in this event.
   * @param {!Object} event Object with details about the event.
   * @return {!Promise} The request that was sent out.
   * @private
   */

  AmpAnalytics.prototype.handleEvent_ = function handleEvent_(trigger, event) {
    var requests = _srcTypes.isArray(trigger['request']) ? trigger['request'] : [trigger['request']];

    var resultPromises = [];
    for (var r = 0; r < requests.length; r++) {
      var request = this.requests_[requests[r]];
      resultPromises.push(this.handleRequestForEvent_(request, trigger, event));
    }
    return Promise.all(resultPromises);
  };

  /**
   * Processes a request for an event callback and sends it out.
   *
   * @param {string} request The request to process.
   * @param {!JSONType} trigger JSON config block that resulted in this event.
   * @param {!Object} event Object with details about the event.
   * @return {!Promise<string|undefined>} The request that was sent out.
   * @private
   */

  AmpAnalytics.prototype.handleRequestForEvent_ = function handleRequestForEvent_(request, trigger, event) {
    var _this5 = this;

    if (!request) {
      var TAG = this.getName_();
      _srcLog.user().error(TAG, 'Ignoring event. Request string ' + 'not found: ', trigger['request']);
      return Promise.resolve();
    }

    // Add any given extraUrlParams as query string param
    if (this.config_['extraUrlParams'] || trigger['extraUrlParams']) {
      var params = Object.create(null);
      Object.assign(params, this.config_['extraUrlParams'], trigger['extraUrlParams']);
      for (var k in params) {
        if (typeof params[k] == 'string') {
          params[k] = this.expandTemplate_(params[k], trigger, event);
        }
      }
      request = this.addParamsToUrl_(request, params);
    }

    this.config_['vars']['requestCount']++;
    request = this.expandTemplate_(request, trigger, event);

    // For consistency with amp-pixel we also expand any url replacements.
    return _srcUrlReplacements.urlReplacementsForDoc(this.win.document).expandAsync(request).then(function (request) {
      _this5.sendRequest_(request, trigger);
      return request;
    });
  };

  /**
   * @param {!JSONType} trigger The config to use to determine sampling.
   * @return {!Promise<boolean>} Whether the request should be sampled in or
   * not based on sampleSpec.
   * @private
   */

  AmpAnalytics.prototype.isSampledIn_ = function isSampledIn_(trigger) {
    /** @const {!JSONType} */
    var spec = trigger['sampleSpec'];
    var resolve = Promise.resolve(true);
    var TAG = this.getName_();
    if (!spec) {
      return resolve;
    }
    if (!spec['sampleOn']) {
      _srcLog.user().error(TAG, 'Invalid sampleOn value.');
      return resolve;
    }
    var threshold = parseFloat(spec['threshold']); // Threshold can be NaN.
    if (threshold >= 0 && threshold <= 100) {
      var key = this.expandTemplate_(spec['sampleOn'], trigger);
      var keyPromise = _srcUrlReplacements.urlReplacementsForDoc(this.win.document).expandAsync(key);
      var cryptoPromise = _srcCrypto.cryptoFor(this.win);
      return Promise.all([keyPromise, cryptoPromise]).then(function (results) {
        return results[1].uniform(results[0]);
      }).then(function (digest) {
        return digest * 100 < spec['threshold'];
      });
    }
    _srcLog.user(). /*OK*/error(TAG, 'Invalid threshold for sampling.');
    return resolve;
  };

  /**
   * @param {string} template The template to expand.
   * @param {!JSONType} trigger The object to use for variable value lookups.
   * @param {!Object=} opt_event Object with details about the event.
   * @param {number=} opt_iterations Number of recursive expansions to perform.
   *    Defaults to 2 substitutions.
   * @param {boolean=} opt_encode Used to determine if the vars should be
   *    encoded or not. Defaults to true.
   * @return {string} The expanded string.
   * @private
   */

  AmpAnalytics.prototype.expandTemplate_ = function expandTemplate_(template, trigger, opt_event, opt_iterations, opt_encode) {
    var _this6 = this;

    opt_iterations = opt_iterations === undefined ? 2 : opt_iterations;
    opt_encode = opt_encode === undefined ? true : opt_encode;
    if (opt_iterations < 0) {
      _srcLog.user().error('AMP-ANALYTICS', 'Maximum depth reached while expanding ' + 'variables. Please ensure that the variables are not recursive.');
      return template;
    }

    // Replace placeholders with URI encoded values.
    // Precedence is opt_event.vars > trigger.vars > config.vars.
    // Nested expansion not supported.
    return _srcString.expandTemplate(template, function (key) {
      var _getNameArgs_ = _this6.getNameArgs_(key);

      var name = _getNameArgs_.name;
      var argList = _getNameArgs_.argList;

      var raw = opt_event && opt_event['vars'] && opt_event['vars'][name] || trigger['vars'] && trigger['vars'][name] || _this6.config_['vars'] && _this6.config_['vars'][name] || '';

      // Values can also be arrays and objects. Don't expand them.
      if (typeof raw == 'string') {
        raw = _this6.expandTemplate_(raw, trigger, opt_event, opt_iterations - 1);
      }
      var val = opt_encode ? _this6.encodeVars_(raw, name) : raw;
      return val ? val + argList : val;
    });
  };

  /**
   * Returns an array containing two values: name and args parsed from the key.
   *
   * @param {string} key The key to be parsed.
   * @return {!Object<string>}
   * @private
   */

  AmpAnalytics.prototype.getNameArgs_ = function getNameArgs_(key) {
    if (!key) {
      return { name: '', argList: '' };
    }
    var match = key.match(/([^(]*)(\([^)]*\))?/);
    if (!match) {
      var TAG = this.getName_();
      _srcLog.user().error(TAG, 'Variable with invalid format found: ' + key);
    }
    return { name: match[1], argList: match[2] || '' };
  };

  /**
   * @param {string|!Array<string>} raw The values to URI encode.
   * @param {string} unusedName Name of the variable.
   * @return {string} The encoded value.
   * @private
   */

  AmpAnalytics.prototype.encodeVars_ = function encodeVars_(raw, unusedName) {
    if (!raw) {
      return '';
    }

    if (_srcTypes.isArray(raw)) {
      return raw.map(encodeURIComponent).join(',');
    }
    // Separate out names and arguments from the value and encode the value.

    var _getNameArgs_2 = this.getNameArgs_(String(raw));

    var name = _getNameArgs_2.name;
    var argList = _getNameArgs_2.argList;

    return encodeURIComponent(name) + argList;
  };

  /**
   * Adds parameters to URL. Similar to the function defined in url.js but with
   * a different encoding method.
   * @param {string} request
   * @param {!Object<string, string>} params
   * @return {string}
   * @private
   */

  AmpAnalytics.prototype.addParamsToUrl_ = function addParamsToUrl_(request, params) {
    var s = [];
    for (var k in params) {
      var v = params[k];
      if (v == null) {
        continue;
      } else {
        var sv = this.encodeVars_(v, k);
        s.push(encodeURIComponent(k) + '=' + sv);
      }
    }

    var paramString = s.join('&');
    if (request.indexOf('${extraUrlParams}') >= 0) {
      return request.replace('${extraUrlParams}', paramString);
    } else {
      return _srcUrl.appendEncodedParamStringToUrl(request, paramString);
    }
  };

  /**
   * @param {string} request The full request string to send.
   * @param {!JSONType} trigger
   * @private
   */

  AmpAnalytics.prototype.sendRequest_ = function sendRequest_(request, trigger) {
    if (!request) {
      var TAG = this.getName_();
      _srcLog.user().error(TAG, 'Request not sent. Contents empty.');
      return;
    }
    if (trigger['iframePing']) {
      _srcLog.user().assert(trigger['on'] == 'visible', 'iframePing is only available on page view requests.');
      _transport.sendRequestUsingIframe(this.win, request);
    } else {
      _transport.sendRequest(this.win, request, this.config_['transport'] || {});
    }
  };

  /**
   * @return {string} Returns a string to identify this tag. May not be unique
   * if the element id is not unique.
   * @private
   */

  AmpAnalytics.prototype.getName_ = function getName_() {
    return 'AmpAnalytics ' + (this.element.getAttribute('id') || '<unknown id>');
  };

  /**
   * Merges two objects. If the value is array or plain object, the values are
   * merged otherwise the value is overwritten.
   *
   * @param {Object|Array} from Object or array to merge from
   * @param {Object|Array} to Object or Array to merge into
   * @param {boolean=} opt_predefinedConfig
   * @private
   */

  AmpAnalytics.prototype.mergeObjects_ = function mergeObjects_(from, to, opt_predefinedConfig) {
    if (to === null || to === undefined) {
      to = {};
    }

    for (var property in from) {
      _srcLog.user().assert(opt_predefinedConfig || property != 'iframePing', 'iframePing config is only available to vendor config.');
      // Only deal with own properties.
      if (from.hasOwnProperty(property)) {
        if (_srcTypes.isArray(from[property])) {
          if (!_srcTypes.isArray(to[property])) {
            to[property] = [];
          }
          to[property] = this.mergeObjects_(from[property], to[property], opt_predefinedConfig);
        } else if (_srcTypes.isObject(from[property])) {
          if (!_srcTypes.isObject(to[property])) {
            to[property] = {};
          }
          to[property] = this.mergeObjects_(from[property], to[property], opt_predefinedConfig);
        } else {
          to[property] = from[property];
        }
      }
    }
    return to;
  };

  return AmpAnalytics;
})(AMP.BaseElement);

exports.AmpAnalytics = AmpAnalytics;

AMP.registerElement('amp-analytics', AmpAnalytics);

},{"../../../src/crypto":14,"../../../src/dom":15,"../../../src/log":19,"../../../src/string":30,"../../../src/style":31,"../../../src/types":33,"../../../src/url":35,"../../../src/url-replacements":34,"../../../src/user-notification":36,"../../../src/xhr":41,"./activity-impl":1,"./cid-impl":3,"./crypto-impl":4,"./instrumentation":5,"./transport":6,"./vendors":7}],3:[function(require,module,exports){
exports.__esModule = true;
exports.getProxySourceOrigin = getProxySourceOrigin;
exports.installCidService = installCidService;
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
 * @fileoverview Provides per AMP document source origin and use case
 * persistent client identifiers for use in analytics and similar use
 * cases.
 *
 * For details, see https://goo.gl/Mwaacs
 */

var _srcCookies = require('../../../src/cookies');

var _srcService = require('../../../src/service');

var _srcUrl = require('../../../src/url');

var _srcUtilsBytes = require('../../../src/utils/bytes');

var _srcViewer = require('../../../src/viewer');

var _srcCrypto = require('../../../src/crypto');

var _srcLog = require('../../../src/log');

var ONE_DAY_MILLIS = 24 * 3600 * 1000;

/**
 * We ignore base cids that are older than (roughly) one year.
 */
var BASE_CID_MAX_AGE_MILLIS = 365 * ONE_DAY_MILLIS;

/**
 * A base cid string value and the time it was last read / stored.
 * @typedef {{time: time, cid: string}}
 */
var BaseCidInfoDef = undefined;

/**
 * The "get CID" parameters.
 * - createCookieIfNotPresent: Whether CID is allowed to create a cookie when.
 *   Default value is `false`.
 * @typedef {{
 *   scope: string,
 *   createCookieIfNotPresent: (boolean|undefined),
 * }}
 */
var GetCidDef = undefined;

var Cid = (function () {
  /** @param {!Window} win */

  function Cid(win) {
    babelHelpers.classCallCheck(this, Cid);

    /** @const */
    this.win = win;

    /**
     * Cached base cid once read from storage to avoid repeated
     * reads.
     * @private {?Promise<string>}
     */
    this.baseCid_ = null;

    /**
     * Cache to store external cids. Scope is used as the key and cookie value
     * is the value.
     * @private {!Object<string, !Promise<string>>}
     */
    this.externalCidCache_ = Object.create(null);
  }

  /**
   * Returns the "external cid". This is a cid for a specific purpose
   * (Say Analytics provider X). It is unique per user, that purpose
   * and the AMP origin site.
   * @param {!Cid} cid
   * @param {!GetCidDef} getCidStruct
   * @param {!Promise} persistenceConsent
   * @return {!Promise<?string>}
   */

  /**
   * @param {string|!GetCidDef} externalCidScope Name of the fallback cookie
   *     for the case where this doc is not served by an AMP proxy. GetCidDef
   *     structure can also instruct CID to create a cookie if one doesn't yet
   *     exist in a non-proxy case.
   * @param {!Promise} consent Promise for when the user has given consent
   *     (if deemed necessary by the publisher) for use of the client
   *     identifier.
   * @param {!Promise=} opt_persistenceConsent Dedicated promise for when
   *     it is OK to persist a new tracking identifier. This could be
   *     supplied ONLY by the code that supplies the actual consent
   *     cookie.
   *     If this is given, the consent param should be a resolved promise
   *     because this call should be only made in order to get consent.
   *     The consent promise passed to other calls should then itself
   *     depend on the opt_persistenceConsent promise (and the actual
   *     consent, of course).
   * @return {!Promise<?string>} A client identifier that should be used
   *      within the current source origin and externalCidScope. Might be
   *      null if no identifier was found or could be made.
   *      This promise may take a long time to resolve if consent isn't
   *      given.
   */

  Cid.prototype.get = function get(externalCidScope, consent, opt_persistenceConsent) {
    var _this = this;

    /** @type {!GetCidDef} */
    var getCidStruct = undefined;
    if (typeof externalCidScope == 'string') {
      getCidStruct = { scope: externalCidScope };
    } else {
      getCidStruct = /** @type {!GetCidDef} */externalCidScope;
    }
    _srcLog.user().assert(/^[a-zA-Z0-9-_.]+$/.test(getCidStruct.scope), 'The client id name must only use the characters ' + '[a-zA-Z0-9-_.]+\nInstead found: %s', getCidStruct.scope);
    return consent.then(function () {
      return _srcViewer.viewerForDoc(_this.win.document).whenFirstVisible();
    }).then(function () {
      return getExternalCid(_this, getCidStruct, opt_persistenceConsent || consent);
    });
  };

  return Cid;
})();

function getExternalCid(cid, getCidStruct, persistenceConsent) {
  /** @const {!Location} */
  var url = _srcUrl.parseUrl(cid.win.location.href);
  if (!_srcUrl.isProxyOrigin(url)) {
    return getOrCreateCookie(cid, getCidStruct, persistenceConsent);
  }
  return Promise.all([getBaseCid(cid, persistenceConsent), _srcCrypto.cryptoFor(cid.win)]).then(function (results) {
    var baseCid = results[0];
    var crypto = results[1];
    return crypto.sha384Base64(baseCid + getProxySourceOrigin(url) + getCidStruct.scope);
  });
}

/**
 * Sets a new CID cookie for expire 1 year from now.
 * @param {!Window} win
 * @param {string} scope
 * @param {string} cookie
 */
function setCidCookie(win, scope, cookie) {
  var expiration = Date.now() + BASE_CID_MAX_AGE_MILLIS;
  _srcCookies.setCookie(win, scope, cookie, expiration, {
    highestAvailableDomain: true
  });
}

/**
 * If cookie exists it's returned immediately. Otherwise, if instructed, the
 * new cookie is created.
 *
 * @param {!Cid} cid
 * @param {!GetCidDef} getCidStruct
 * @param {!Promise} persistenceConsent
 * @return {!Promise<?string>}
 */
function getOrCreateCookie(cid, getCidStruct, persistenceConsent) {
  var win = cid.win;
  var scope = getCidStruct.scope;
  var existingCookie = _srcCookies.getCookie(win, scope);

  if (!existingCookie && !getCidStruct.createCookieIfNotPresent) {
    return (/** @type {!Promise<?string>} */Promise.resolve(null)
    );
  }

  if (cid.externalCidCache_[scope]) {
    return (/** @type {!Promise<?string>} */cid.externalCidCache_[scope]
    );
  }

  if (existingCookie) {
    // If we created the cookie, update it's expiration time.
    if (/^amp-/.test(existingCookie)) {
      setCidCookie(win, scope, existingCookie);
    }
    return (/** @type {!Promise<?string>} */Promise.resolve(existingCookie)
    );
  }

  var newCookiePromise = _srcCrypto.cryptoFor(win).then(function (crypto) {
    return crypto.sha384Base64(getEntropy(win));
  })
  // Create new cookie, always prefixed with "amp-", so that we can see from
  // the value whether we created it.
  .then(function (randomStr) {
    return 'amp-' + randomStr;
  });

  // Store it as a cookie based on the persistence consent.
  Promise.all([newCookiePromise, persistenceConsent]).then(function (results) {
    // The initial CID generation is inherently racy. First one that gets
    // consent wins.
    var newCookie = results[0];
    var relookup = _srcCookies.getCookie(win, scope);
    if (!relookup) {
      setCidCookie(win, scope, newCookie);
    }
  });
  return cid.externalCidCache_[scope] = newCookiePromise;
}

/**
 * Returns the source origin of an AMP document for documents served
 * on a proxy origin. Throws an error if the doc is not on a proxy origin.
 * @param {!Location} url URL of an AMP document.
 * @return {string} The source origin of the URL.
 * @visibleForTesting BUT if this is needed elsewhere it could be
 *     factored into its own package.
 */

function getProxySourceOrigin(url) {
  _srcLog.user().assert(_srcUrl.isProxyOrigin(url), 'Expected proxy origin %s', url.origin);
  return _srcUrl.getSourceOrigin(url);
}

/**
 * Returns the base cid for the current user(). This string must not
 * be exposed to users without hashing with the current source origin
 * and the externalCidScope.
 * On a proxy this value is the same for a user across all source
 * origins.
 * @param {!Cid} cid
 * @param {!Promise} persistenceConsent
 * @return {!Promise<string>}
 */
function getBaseCid(cid, persistenceConsent) {
  if (cid.baseCid_) {
    return cid.baseCid_;
  }
  var win = cid.win;

  return cid.baseCid_ = read(win).then(function (stored) {
    var needsToStore = false;
    var baseCid = undefined;

    // See if we have a stored base cid and whether it is still valid
    // in terms of expiration.
    if (stored && !isExpired(stored)) {
      baseCid = Promise.resolve(stored.cid);
      if (shouldUpdateStoredTime(stored)) {
        needsToStore = true;
      }
    } else {
      // We need to make a new one.
      baseCid = _srcCrypto.cryptoFor(win).then(function (crypto) {
        return crypto.sha384Base64(getEntropy(win));
      });
      needsToStore = true;
    }

    if (needsToStore) {
      baseCid.then(function (baseCid) {
        store(win, persistenceConsent, baseCid);
      });
    }

    return baseCid;
  });
}

/**
 * Stores a new cidString in localStorage. Adds the current time to the
 * stored value.
 * @param {!Window} win
 * @param {!Promise} persistenceConsent
 * @param {string} cidString Actual cid string to store.
 */
function store(win, persistenceConsent, cidString) {
  var viewer = _srcViewer.viewerForDoc(win.document);
  // TODO(lannka, #4457): ideally, we should check if viewer has the capability
  // of CID storage, rather than if it is iframed.
  if (viewer.isIframed()) {
    // If we are being embedded, try to save the base cid to the viewer.
    viewer.baseCid(createCidData(cidString));
  } else {
    // To use local storage, we need user's consent.
    persistenceConsent.then(function () {
      try {
        win.localStorage.setItem('amp-cid', createCidData(cidString));
      } catch (ignore) {
        // Setting localStorage may fail. In practice we don't expect that to
        // happen a lot (since we don't go anywhere near the quota, but
        // in particular in Safari private browsing mode it always fails.
        // In that case we just don't store anything, which is just fine.
      }
    });
  }
}

/**
 * Creates a JSON object that contains the given CID and the current time as
 * a timestamp.
 * @param {string} cidString
 * @return {string}
 */
function createCidData(cidString) {
  return JSON.stringify({
    time: Date.now(),
    cid: cidString
  });
}

/**
 * Gets the persisted CID data as a promise. It tries to read from
 * localStorage first then from viewer if it is in embedded mode.
 * Returns null if none was found.
 * @param {!Window} win
 * @return {!Promise<?BaseCidInfoDef>}
 */
function read(win) {
  var data = undefined;
  try {
    data = win.localStorage.getItem('amp-cid');
  } catch (ignore) {
    // If reading from localStorage fails, we assume it is empty.
  }
  var viewer = _srcViewer.viewerForDoc(win.document);
  var dataPromise = Promise.resolve(data);
  if (!data && viewer.isIframed()) {
    // If we are being embedded, try to get the base cid from the viewer.
    dataPromise = viewer.baseCid();
  }
  return dataPromise.then(function (data) {
    if (!data) {
      return null;
    }
    var item = JSON.parse(data);
    return {
      time: item['time'],
      cid: item['cid']
    };
  });
}

/**
 * Whether the retrieved cid object is expired and should be ignored.
 * @param {!BaseCidInfoDef} storedCidInfo
 * @return {boolean}
 */
function isExpired(storedCidInfo) {
  var createdTime = storedCidInfo.time;
  var now = Date.now();
  return createdTime + BASE_CID_MAX_AGE_MILLIS < now;
}

/**
 * Whether we should write a new timestamp to the stored cid value.
 * We say yes if it is older than 1 day, so we only do this max once
 * per day to avoid writing to localStorage all the time.
 * @param {!BaseCidInfoDef} storedCidInfo
 * @return {boolean}
 */
function shouldUpdateStoredTime(storedCidInfo) {
  var createdTime = storedCidInfo.time;
  var now = Date.now();
  return createdTime + ONE_DAY_MILLIS < now;
}

/**
 * Returns an array with a total of 128 of random values based on the
 * `win.crypto.getRandomValues` API. If that is not available concatenates
 * a string of other values that might be hard to guess including
 * `Math.random` and the current time.
 * @param {!Window} win
 * @return {!Uint8Array|string} Entropy.
 */
function getEntropy(win) {
  // Use win.crypto.getRandomValues to get 128 bits of random value
  var uint8array = _srcUtilsBytes.getCryptoRandomBytesArray(win, 16); // 128 bit
  if (uint8array) {
    return uint8array;
  }

  // Support for legacy browsers.
  return String(win.location.href + Date.now() + win.Math.random() + win.screen.width + win.screen.height);
}

/**
 * @param {!Window} window
 * @return {!Cid}
 */

function installCidService(window) {
  return _srcService.fromClass(window, 'cid', Cid);
}

},{"../../../src/cookies":13,"../../../src/crypto":14,"../../../src/log":19,"../../../src/service":29,"../../../src/url":35,"../../../src/utils/bytes":37,"../../../src/viewer":38}],4:[function(require,module,exports){
exports.__esModule = true;
exports.installCryptoService = installCryptoService;
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

var _third_partyClosureLibrarySha384Generated = require('../../../third_party/closure-library/sha384-generated');

var lib = babelHelpers.interopRequireWildcard(_third_partyClosureLibrarySha384Generated);

var _srcService = require('../../../src/service');

var _srcLog = require('../../../src/log');

var _srcUtilsBytes = require('../../../src/utils/bytes');

/** @const {string} */
var TAG = 'Crypto';
var FALLBACK_MSG = 'SubtleCrypto failed, fallback to closure lib.';

var Crypto = (function () {
  function Crypto(win) {
    babelHelpers.classCallCheck(this, Crypto);

    /** @private @const {?webCrypto.SubtleCrypto} */
    this.subtle_ = getSubtle(win);
  }

  /**
   * Returns the SHA-384 hash of the input string in a number array.
   * Input string cannot contain chars out of range [0,255].
   * @param {string|!Uint8Array} input
   * @returns {!Promise<!Array<number>>}
   * @throws {!Error} when input string contains chars out of range [0,255]
   */

  Crypto.prototype.sha384 = function sha384(input) {
    if (this.subtle_) {
      try {
        return this.subtle_.digest({ name: 'SHA-384' }, input instanceof Uint8Array ? input : _srcUtilsBytes.stringToBytes(input))
        // [].slice.call(Unit8Array) is a shim for Array.from(Unit8Array)
        /** @param {?} buffer */
        .then(function (buffer) {
          return [].slice.call(new Uint8Array(buffer));
        }, function (e) {
          // Chrome doesn't allow the usage of Crypto API under
          // non-secure origin: https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
          if (e.message && e.message.indexOf('secure origin') < 0) {
            // Log unexpected fallback.
            _srcLog.dev().error(TAG, FALLBACK_MSG, e);
          }
          return lib.sha384(input);
        });
      } catch (e) {
        _srcLog.dev().error(TAG, FALLBACK_MSG, e);
      }
    }
    return Promise.resolve(lib.sha384(input));
  };

  /**
   * Returns the SHA-384 hash of the input string in the format of web safe
   * base64 (using -_. instead of +/=).
   * Input string cannot contain chars out of range [0,255].
   * @param {string|!Uint8Array} input
   * @returns {!Promise<string>}
   * @throws {!Error} when input string contains chars out of range [0,255]
   */

  Crypto.prototype.sha384Base64 = function sha384Base64(input) {
    return this.sha384(input).then(function (buffer) {
      return lib.base64(buffer);
    });
  };

  /**
   * Returns a uniform hash of the input string as a float number in the range
   * of [0, 1).
   * Input string cannot contain chars out of range [0,255].
   * @param {string|!Uint8Array} input
   * @returns {!Promise<number>}
   */

  Crypto.prototype.uniform = function uniform(input) {
    return this.sha384(input).then(function (buffer) {
      // Consider the Uint8 array as a base256 fraction number,
      // then convert it to the decimal form.
      var result = 0;
      for (var i = 2; i >= 0; i--) {
        // 3 base256 digits give enough precision
        result = (result + buffer[i]) / 256;
      }
      return result;
    });
  };

  return Crypto;
})();

exports.Crypto = Crypto;

function getSubtle(win) {
  if (!win.crypto) {
    return null;
  }
  return win.crypto.subtle || win.crypto.webkitSubtle || null;
}

function installCryptoService(win) {
  return _srcService.fromClass(win, 'crypto', Crypto);
}

},{"../../../src/log":19,"../../../src/service":29,"../../../src/utils/bytes":37,"../../../third_party/closure-library/sha384-generated":42}],5:[function(require,module,exports){
exports.__esModule = true;
exports.instrumentationServiceForDoc = instrumentationServiceForDoc;
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

var _srcLog = require('../../../src/log');

var _visibilityImpl = require('./visibility-impl');

var _srcObservable = require('../../../src/observable');

var _srcService = require('../../../src/service');

var _srcTimer = require('../../../src/timer');

var _srcViewer = require('../../../src/viewer');

var _srcViewport = require('../../../src/viewport');

var _srcDom = require('../../../src/dom');

var _visibilityV2 = require('./visibility-v2');

var _srcExperiments = require('../../../src/experiments');

var MIN_TIMER_INTERVAL_SECONDS_ = 0.5;
var DEFAULT_MAX_TIMER_LENGTH_SECONDS_ = 7200;
var SCROLL_PRECISION_PERCENT = 5;
var VAR_H_SCROLL_BOUNDARY = 'horizontalScrollBoundary';
var VAR_V_SCROLL_BOUNDARY = 'verticalScrollBoundary';
var VARIABLE_DATA_ATTRIBUTE_KEY = /^vars(.+)/;

/**
 * Type to define a callback that is called when an instrumented event fires.
 * @typedef {function(!AnalyticsEvent)}
 */
var AnalyticsEventListenerDef = undefined;

/**
 * Events that can result in analytics data to be sent.
 * @const
 * @enum {string}
 */
var AnalyticsEventType = {
  VISIBLE: 'visible',
  CLICK: 'click',
  TIMER: 'timer',
  SCROLL: 'scroll',
  HIDDEN: 'hidden'
};

exports.AnalyticsEventType = AnalyticsEventType;
/** @const {string} */
var TAG = 'Analytics.Instrumentation';

/**
 * Events that can result in analytics data to be sent.
 * @const {Array<AnalyticsEventType>}
 */
var ALLOWED_IN_EMBED = [AnalyticsEventType.VISIBLE, AnalyticsEventType.CLICK, AnalyticsEventType.TIMER, AnalyticsEventType.HIDDEN];

/**
 * Ignore Most of this class as it has not been thought through yet. It will
 * change completely.
 */

var AnalyticsEvent =

/**
 * @param {!AnalyticsEventType|string} type The type of event.
 * @param {!Object<string, string>=} opt_vars A map of vars and their values.
 */
function AnalyticsEvent(type, opt_vars) {
  babelHelpers.classCallCheck(this, AnalyticsEvent);

  /** @const  */
  this.type = type;
  /** @const  */
  this.vars = opt_vars || Object.create(null);
}

/** @private Visible for testing. */
;

var InstrumentationService = (function () {
  /**
   * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc
   */

  function InstrumentationService(ampdoc) {
    var _this = this;

    babelHelpers.classCallCheck(this, InstrumentationService);

    /** @const {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc */
    this.ampdoc = ampdoc;

    /** @const @private {(!./visibility-impl.Visibility|!./visibility-v2.VisibilityV2)} */
    this.visibility_ = _srcExperiments.isExperimentOn(this.ampdoc.win, 'visibility-v2') ? new _visibilityV2.VisibilityV2(this.ampdoc) : new _visibilityImpl.Visibility(this.ampdoc);

    /** @const {!../../../src/service/timer-impl.Timer} */
    this.timer_ = _srcTimer.timerFor(this.ampdoc.win);

    /** @private @const {!../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = _srcViewer.viewerForDoc(this.ampdoc);

    /** @const {!../../../src/service/viewport-impl.Viewport} */
    this.viewport_ = _srcViewport.viewportForDoc(this.ampdoc);

    /** @private {!Observable<!Event>} */
    this.clickObservable_ = new _srcObservable.Observable();

    /** @private {boolean} */
    this.scrollHandlerRegistered_ = false;

    /** @private {!Observable<
        !../../../src/service/viewport-impl.ViewportChangedEventDef>} */
    this.scrollObservable_ = new _srcObservable.Observable();

    /** @private {!Object<string, !Observable<!AnalyticsEvent>>} */
    this.customEventObservers_ = {};

    /**
     * Early events have to be buffered because there's no way to predict
     * how fast all `amp-analytics` elements will be instrumented.
     * @private {!Object<string, !Array<!AnalyticsEvent>>|undefined}
     */
    this.customEventBuffer_ = {};

    /** @private {boolean} */
    this.clickHandlerRegistered_ = false;

    // Stop buffering of custom events after 10 seconds. Assumption is that all
    // `amp-analytics` elements will have been instrumented by this time.
    this.timer_.delay(function () {
      _this.customEventBuffer_ = undefined;
    }, 10000);
  }

  /**
   * @param {!Node|!../../../src/service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!InstrumentationService}
   */

  /**
   * @param {!JSONType} config Configuration for instrumentation.
   * @param {!AnalyticsEventListenerDef} listener The callback to call when the event
   *  occurs.
   * @param {!Element} analyticsElement The element associated with the
   *  config.
   */

  InstrumentationService.prototype.addListener = function addListener(config, listener, analyticsElement) {
    var _this2 = this;

    var eventType = config['on'];
    if (!this.isTriggerAllowed_(eventType, analyticsElement)) {
      _srcLog.user().error(TAG, 'Trigger type "' + eventType + '" is not ' + 'allowed in the embed.');
      return;
    }
    if (eventType === AnalyticsEventType.VISIBLE) {
      this.createVisibilityListener_(listener, config, AnalyticsEventType.VISIBLE, analyticsElement);
    } else if (eventType === AnalyticsEventType.CLICK) {
      if (!config['selector']) {
        _srcLog.user().error(TAG, 'Missing required selector on click trigger');
        return;
      }

      this.ensureClickListener_();
      this.clickObservable_.add(this.createSelectiveListener_(listener, config['selector']));
    } else if (eventType === AnalyticsEventType.SCROLL) {
      if (!config['scrollSpec']) {
        _srcLog.user().error(TAG, 'Missing scrollSpec on scroll trigger.');
        return;
      }
      this.registerScrollTrigger_(config['scrollSpec'], listener);

      // Trigger an event to fire events that might have already happened.
      var size = this.viewport_.getSize();
      this.onScroll_({
        top: this.viewport_.getScrollTop(),
        left: this.viewport_.getScrollLeft(),
        width: size.width,
        height: size.height,
        relayoutAll: false,
        velocity: 0 });
    } else // Hack for typing.
      if (eventType === AnalyticsEventType.TIMER) {
        if (this.isTimerSpecValid_(config['timerSpec'])) {
          this.createTimerListener_(listener, config['timerSpec']);
        }
      } else if (eventType === AnalyticsEventType.HIDDEN) {
        this.createVisibilityListener_(listener, config, AnalyticsEventType.HIDDEN, analyticsElement);
      } else {
        var observers = this.customEventObservers_[eventType];
        if (!observers) {
          observers = new _srcObservable.Observable();
          this.customEventObservers_[eventType] = observers;
        }
        observers.add(listener);

        // Push recent events if any.
        if (this.customEventBuffer_) {
          (function () {
            /** @const {!Array<!AnalyticsEvent>} */
            var buffer = _this2.customEventBuffer_[eventType];
            if (buffer) {
              _this2.timer_.delay(function () {
                buffer.forEach(function (event) {
                  listener(event);
                });
              }, 1);
            }
          })();
        }
      }
  };

  /**
   * Triggers the analytics event with the specified type.
   * @param {string} eventType
   * @param {!Object<string, string>=} opt_vars A map of vars and their values.
   */

  InstrumentationService.prototype.triggerEvent = function triggerEvent(eventType, opt_vars) {
    var event = new AnalyticsEvent(eventType, opt_vars);

    // Enqueue.
    if (this.customEventBuffer_) {
      var buffer = this.customEventBuffer_[event.type];
      if (!buffer) {
        buffer = [];
        this.customEventBuffer_[event.type] = buffer;
      }
      buffer.push(event);
    }

    // If listeners already present - trigger right away.
    var observers = this.customEventObservers_[eventType];
    if (observers) {
      observers.fire(event);
    }
  };

  /**
   * Creates listeners for visibility conditions or calls the callback if all
   * the conditions are met.
   * @param {!AnalyticsEventListenerDef} callback The callback to call when the
   *   event occurs.
   * @param {!JSONType} config Configuration for instrumentation.
   * @param {AnalyticsEventType} eventType Event type for which the callback is triggered.
   * @param {!Element} analyticsElement The element assoicated with the
   *   config.
   * @private
   */

  InstrumentationService.prototype.createVisibilityListener_ = function createVisibilityListener_(callback, config, eventType, analyticsElement) {
    var _this3 = this;

    _srcLog.dev().assert(eventType == AnalyticsEventType.VISIBLE || eventType == AnalyticsEventType.HIDDEN, 'createVisibilityListener should be called with visible or hidden ' + 'eventType');
    var shouldBeVisible = eventType == AnalyticsEventType.VISIBLE;
    /** @const {!JSONType} */
    var spec = config['visibilitySpec'];
    if (spec) {
      if (!_visibilityImpl.isVisibilitySpecValid(config)) {
        return;
      }

      this.visibility_.listenOnce(spec, function (vars) {
        var el = _visibilityImpl.getElement(_this3.ampdoc, spec['selector'], analyticsElement, spec['selectionMethod']);
        if (el) {
          var attr = _srcDom.getDataParamsFromAttributes(el, undefined, VARIABLE_DATA_ATTRIBUTE_KEY);
          for (var key in attr) {
            vars[key] = attr[key];
          }
        }
        callback(new AnalyticsEvent(eventType, vars));
      }, shouldBeVisible, analyticsElement);
    } else {
      if (this.viewer_.isVisible() == shouldBeVisible) {
        callback(new AnalyticsEvent(eventType));
        config['called'] = true;
      } else {
        this.viewer_.onVisibilityChanged(function () {
          if (!config['called'] && _this3.viewer_.isVisible() == shouldBeVisible) {
            callback(new AnalyticsEvent(eventType));
            config['called'] = true;
          }
        });
      }
    }
  };

  /**
   * Ensure we have a click listener registered on the document that contains
   * the given analytics element.
   * @private
   */

  InstrumentationService.prototype.ensureClickListener_ = function ensureClickListener_() {
    if (!this.clickHandlerRegistered_) {
      this.clickHandlerRegistered_ = true;
      this.ampdoc.getRootNode().addEventListener('click', this.onClick_.bind(this));
    }
  };

  /**
   * @param {!Event} e
   * @private
   */

  InstrumentationService.prototype.onClick_ = function onClick_(e) {
    this.clickObservable_.fire(e);
  };

  /**
   * @param {!../../../src/service/viewport-impl.ViewportChangedEventDef} e
   * @private
   */

  InstrumentationService.prototype.onScroll_ = function onScroll_(e) {
    this.scrollObservable_.fire(e);
  };

  /**
   * @param {!Function} listener
   * @param {string} selector
   * @private
   */

  InstrumentationService.prototype.createSelectiveListener_ = function createSelectiveListener_(listener, selector) {
    return function (e) {
      try {
        var el = e.target;
        // First do the cheap lookups.
        if (selector === '*' || _srcDom.matches(el, selector)) {
          listener(new AnalyticsEvent(AnalyticsEventType.CLICK, _srcDom.getDataParamsFromAttributes(el, undefined, VARIABLE_DATA_ATTRIBUTE_KEY)));
        } else {
          // More expensive search.
          while (el.parentElement != null && el.parentElement.tagName != 'BODY') {
            el = el.parentElement;
            if (_srcDom.matches(el, selector)) {
              listener(new AnalyticsEvent(AnalyticsEventType.CLICK, _srcDom.getDataParamsFromAttributes(el, undefined, VARIABLE_DATA_ATTRIBUTE_KEY)));
              // Don't fire the event multiple times even if the more than one
              // ancestor matches the selector.
              return;
            }
          }
        }
      } catch (selectorError) {
        _srcLog.user().error(TAG, 'Bad query selector.', selector, selectorError);
      }
    };
  };

  /**
   * Register for a listener to be called when the boundaries specified in
   * config are reached.
   * @param {!JSONType} config the config that specifies the boundaries.
   * @param {Function} listener
   * @private
   */

  InstrumentationService.prototype.registerScrollTrigger_ = function registerScrollTrigger_(config, listener) {
    var _this4 = this;

    if (!Array.isArray(config['verticalBoundaries']) && !Array.isArray(config['horizontalBoundaries'])) {
      _srcLog.user().error(TAG, 'Boundaries are required for the scroll ' + 'trigger to work.');
      return;
    }

    // Ensure that the scroll events are being listened to.
    if (!this.scrollHandlerRegistered_) {
      this.scrollHandlerRegistered_ = true;
      this.viewport_.onChanged(this.onScroll_.bind(this));
    }

    /**
     * @param {!Object<number, boolean>} bounds.
     * @param {number} scrollPos Number representing the current scroll
     * @param {string} varName variable name to assign to the bound that
     * triggers the event
     * position.
     */
    var triggerScrollEvents = function (bounds, scrollPos, varName) {
      if (!scrollPos) {
        return;
      }
      // Goes through each of the boundaries and fires an event if it has not
      // been fired so far and it should be.
      for (var b in bounds) {
        if (!bounds.hasOwnProperty(b) || b > scrollPos || bounds[b]) {
          continue;
        }
        bounds[b] = true;
        var vars = Object.create(null);
        vars[varName] = b;
        listener(new AnalyticsEvent(AnalyticsEventType.SCROLL, vars));
      }
    };

    var boundsV = this.normalizeBoundaries_(config['verticalBoundaries']);
    var boundsH = this.normalizeBoundaries_(config['horizontalBoundaries']);
    this.scrollObservable_.add(function (e) {
      // Calculates percentage scrolled by adding screen height/width to
      // top/left and dividing by the total scroll height/width.
      triggerScrollEvents(boundsV, (e.top + e.height) * 100 / _this4.viewport_.getScrollHeight(), VAR_V_SCROLL_BOUNDARY);
      triggerScrollEvents(boundsH, (e.left + e.width) * 100 / _this4.viewport_.getScrollWidth(), VAR_H_SCROLL_BOUNDARY);
    });
  };

  /**
   * Rounds the boundaries for scroll trigger to nearest
   * SCROLL_PRECISION_PERCENT and returns an object with normalized boundaries
   * as keys and false as values.
   *
   * @param {!Array<number>} bounds array of bounds.
   * @return {!Object<number,boolean>} Object with normalized bounds as keys
   * and false as value.
   * @private
   */

  InstrumentationService.prototype.normalizeBoundaries_ = function normalizeBoundaries_(bounds) {
    var result = {};
    if (!bounds || !Array.isArray(bounds)) {
      return result;
    }

    for (var b = 0; b < bounds.length; b++) {
      var bound = bounds[b];
      if (typeof bound !== 'number' || !isFinite(bound)) {
        _srcLog.user().error(TAG, 'Scroll trigger boundaries must be finite.');
        return result;
      }

      bound = Math.min(Math.round(bound / SCROLL_PRECISION_PERCENT) * SCROLL_PRECISION_PERCENT, 100);
      result[bound] = false;
    }
    return result;
  };

  /**
   * @param {JSONType} timerSpec
   * @private
   */

  InstrumentationService.prototype.isTimerSpecValid_ = function isTimerSpecValid_(timerSpec) {
    if (!timerSpec) {
      _srcLog.user().error(TAG, 'Bad timer specification');
      return false;
    } else if (!timerSpec.hasOwnProperty('interval')) {
      _srcLog.user().error(TAG, 'Timer interval specification required');
      return false;
    } else if (typeof timerSpec['interval'] !== 'number' || timerSpec['interval'] < MIN_TIMER_INTERVAL_SECONDS_) {
      _srcLog.user().error(TAG, 'Bad timer interval specification');
      return false;
    } else if (timerSpec.hasOwnProperty('maxTimerLength') && (typeof timerSpec['maxTimerLength'] !== 'number' || timerSpec['maxTimerLength'] <= 0)) {
      _srcLog.user().error(TAG, 'Bad maxTimerLength specification');
      return false;
    } else {
      return true;
    }
  };

  /**
   * @param {!Function} listener
   * @param {JSONType} timerSpec
   * @private
   */

  InstrumentationService.prototype.createTimerListener_ = function createTimerListener_(listener, timerSpec) {
    var hasImmediate = timerSpec.hasOwnProperty('immediate');
    var callImmediate = hasImmediate ? Boolean(timerSpec['immediate']) : true;
    var intervalId = this.ampdoc.win.setInterval(listener.bind(null, new AnalyticsEvent(AnalyticsEventType.TIMER)), timerSpec['interval'] * 1000);

    if (callImmediate) {
      listener(new AnalyticsEvent(AnalyticsEventType.TIMER));
    }

    var maxTimerLength = timerSpec['maxTimerLength'] || DEFAULT_MAX_TIMER_LENGTH_SECONDS_;
    this.ampdoc.win.setTimeout(this.ampdoc.win.clearInterval.bind(this.ampdoc.win, intervalId), maxTimerLength * 1000);
  };

  /**
   * Checks to confirm that a given trigger type is allowed for the element.
   * Specifically, it confirms that if the element is in the embed, only a
   * subset of the trigger types are allowed.
   * @param  {!AnalyticsEventType} triggerType
   * @param  {!Element} element
   * @return {boolean} True if the trigger is allowed. False otherwise.
   */

  InstrumentationService.prototype.isTriggerAllowed_ = function isTriggerAllowed_(triggerType, element) {
    if (element.ownerDocument.defaultView != this.ampdoc.win) {
      return ALLOWED_IN_EMBED.indexOf(triggerType) > -1;
    }
    return true;
  };

  return InstrumentationService;
})();

exports.InstrumentationService = InstrumentationService;

function instrumentationServiceForDoc(nodeOrDoc) {
  return (/** @type {!InstrumentationService} */_srcService.getExistingServiceForDoc(nodeOrDoc, 'amp-analytics-instrumentation')
  );
}

},{"../../../src/dom":15,"../../../src/experiments":18,"../../../src/log":19,"../../../src/observable":22,"../../../src/service":29,"../../../src/timer":32,"../../../src/viewer":38,"../../../src/viewport":39,"./visibility-impl":8,"./visibility-v2":9}],6:[function(require,module,exports){
exports.__esModule = true;
exports.sendRequest = sendRequest;
exports.sendRequestUsingIframe = sendRequestUsingIframe;
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

var _srcUrl = require('../../../src/url');

var _srcLog = require('../../../src/log');

var _srcEventHelper = require('../../../src/event-helper');

var _srcTimer = require('../../../src/timer');

var _srcDom = require('../../../src/dom');

var _srcStyle = require('../../../src/style');

/** @const {string} */
var TAG_ = 'amp-analytics.Transport';

/**
 * @param {!Window} win
 * @param {string} request
 * @param {!Object<string, string>} transportOptions
 */

function sendRequest(win, request, transportOptions) {
  _srcUrl.assertHttpsUrl(request, 'amp-analytics request');
  _srcUrl.checkCorsUrl(request);
  if (transportOptions['beacon'] && Transport.sendRequestUsingBeacon(win, request)) {
    return;
  }
  if (transportOptions['xhrpost'] && Transport.sendRequestUsingXhr(win, request)) {
    return;
  }
  if (transportOptions['image']) {
    Transport.sendRequestUsingImage(win, request);
    return;
  }
  _srcLog.user().warn(TAG_, 'Failed to send request', request, transportOptions);
}

/**
 * @visibleForTesting
 */

var Transport = (function () {
  function Transport() {
    babelHelpers.classCallCheck(this, Transport);
  }

  /**
   * Sends a ping request using an iframe, that is removed 5 seconds after
   * it is loaded.
   * This is not available as a standard transport, but rather used for
   * specific, whitelisted requests.
   * @param {!Window} win
   * @param {string} request The request URL.
   */

  /**
   * @param {!Window} unusedWin
   * @param {string} request
   */

  Transport.sendRequestUsingImage = function sendRequestUsingImage(unusedWin, request) {
    var image = new Image();
    image.src = request;
    image.width = 1;
    image.height = 1;
    _srcEventHelper.loadPromise(image).then(function () {
      _srcLog.dev().fine(TAG_, 'Sent image request', request);
    })['catch'](function () {
      _srcLog.user().warn(TAG_, 'Response unparseable or failed to send image ' + 'request', request);
    });
  };

  /**
   * @param {!Window} win
   * @param {string} request
   * @return {boolean} True if this browser supports navigator.sendBeacon.
   */

  Transport.sendRequestUsingBeacon = function sendRequestUsingBeacon(win, request) {
    if (!win.navigator.sendBeacon) {
      return false;
    }
    var result = win.navigator.sendBeacon(request, '');
    if (result) {
      _srcLog.dev().fine(TAG_, 'Sent beacon request', request);
    }
    return result;
  };

  /**
   * @param {!Window} win
   * @param {string} request
   * @return {boolean} True if this browser supports cross-domain XHR.
   */

  Transport.sendRequestUsingXhr = function sendRequestUsingXhr(win, request) {
    if (!win.XMLHttpRequest) {
      return false;
    }
    /** @const {XMLHttpRequest} */
    var xhr = new win.XMLHttpRequest();
    if (!('withCredentials' in xhr)) {
      return false; // Looks like XHR level 1 - CORS is not supported.
    }
    xhr.open('POST', request, true);
    xhr.withCredentials = true;

    // Prevent pre-flight HEAD request.
    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        _srcLog.dev().fine(TAG_, 'Sent XHR request', request);
      }
    };

    xhr.send('');
    return true;
  };

  return Transport;
})();

exports.Transport = Transport;

function sendRequestUsingIframe(win, request) {
  _srcUrl.assertHttpsUrl(request, 'amp-analytics request');
  /** @const {!Element} */
  var iframe = win.document.createElement('iframe');
  _srcStyle.setStyle(iframe, 'display', 'none');
  iframe.onload = iframe.onerror = function () {
    _srcTimer.timerFor(win).delay(function () {
      _srcDom.removeElement(iframe);
    }, 5000);
  };
  _srcLog.user().assert(_srcUrl.parseUrl(request).origin != _srcUrl.parseUrl(win.location.href).origin, 'Origin of iframe request must not be equal to the doc' + 'ument origin. See https://github.com/ampproject/' + 'amphtml/blob/master/spec/amp-iframe-origin-policy.md for details.');
  iframe.setAttribute('amp-analytics', '');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  iframe.src = request;
  win.document.body.appendChild(iframe);
  return iframe;
}

},{"../../../src/dom":15,"../../../src/event-helper":17,"../../../src/log":19,"../../../src/style":31,"../../../src/timer":32,"../../../src/url":35}],7:[function(require,module,exports){
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
 * @const {!JSONType}
 */
var ANALYTICS_CONFIG = /** @type {!JSONType} */{

  // Default parent configuration applied to all amp-analytics tags.
  'default': {
    'transport': { 'beacon': true, 'xhrpost': true, 'image': true },
    'vars': {
      'accessReaderId': 'ACCESS_READER_ID',
      'adNavTiming': 'AD_NAV_TIMING', // only available in A4A embeds
      'adNavType': 'AD_NAV_TYPE', // only available in A4A embeds
      'adRedirectCount': 'AD_NAV_REDIRECT_COUNT', // only available in A4A
      'ampdocHost': 'AMPDOC_HOST',
      'ampdocHostname': 'AMPDOC_HOSTNAME',
      'ampdocUrl': 'AMPDOC_URL',
      'ampVersion': 'AMP_VERSION',
      'authdata': 'AUTHDATA',
      'availableScreenHeight': 'AVAILABLE_SCREEN_HEIGHT',
      'availableScreenWidth': 'AVAILABLE_SCREEN_WIDTH',
      'backgroundState': 'BACKGROUND_STATE',
      'browserLanguage': 'BROWSER_LANGUAGE',
      'canonicalHost': 'CANONICAL_HOST',
      'canonicalHostname': 'CANONICAL_HOSTNAME',
      'canonicalPath': 'CANONICAL_PATH',
      'canonicalUrl': 'CANONICAL_URL',
      'clientId': 'CLIENT_ID',
      'contentLoadTime': 'CONTENT_LOAD_TIME',
      'counter': 'COUNTER',
      'documentCharset': 'DOCUMENT_CHARSET',
      'documentReferrer': 'DOCUMENT_REFERRER',
      'domainLookupTime': 'DOMAIN_LOOKUP_TIME',
      'domInteractiveTime': 'DOM_INTERACTIVE_TIME',
      'navRedirectCount': 'NAV_REDIRECT_COUNT',
      'navTiming': 'NAV_TIMING',
      'navType': 'NAV_TYPE',
      'pageDownloadTime': 'PAGE_DOWNLOAD_TIME',
      'pageLoadTime': 'PAGE_LOAD_TIME',
      'pageViewId': 'PAGE_VIEW_ID',
      'queryParam': 'QUERY_PARAM',
      'random': 'RANDOM',
      'redirectTime': 'REDIRECT_TIME',
      'screenColorDepth': 'SCREEN_COLOR_DEPTH',
      'screenHeight': 'SCREEN_HEIGHT',
      'screenWidth': 'SCREEN_WIDTH',
      'scrollHeight': 'SCROLL_HEIGHT',
      'scrollLeft': 'SCROLL_LEFT',
      'scrollTop': 'SCROLL_TOP',
      'scrollWidth': 'SCROLL_WIDTH',
      'serverResponseTime': 'SERVER_RESPONSE_TIME',
      'sourceUrl': 'SOURCE_URL',
      'sourceHost': 'SOURCE_HOST',
      'sourceHostname': 'SOURCE_HOSTNAME',
      'sourcePath': 'SOURCE_PATH',
      'tcpConnectTime': 'TCP_CONNECT_TIME',
      'timestamp': 'TIMESTAMP',
      'timezone': 'TIMEZONE',
      'title': 'TITLE',
      'totalEngagedTime': 'TOTAL_ENGAGED_TIME',
      'viewer': 'VIEWER',
      'viewportHeight': 'VIEWPORT_HEIGHT',
      'viewportWidth': 'VIEWPORT_WIDTH'
    }
  },

  'afsanalytics': {
    'vars': {
      'server': 'www',
      'websiteid': 'xxxxxxxx',
      'event': 'click',
      'clicklabel': 'clicked from AMP page'
    },
    'transport': { 'beacon': false, 'xhrpost': false, 'image': true },
    'requests': {
      'host': '//${server}.afsanalytics.com',
      'base': '${host}/cgi_bin/',
      'pageview': '${base}connect.cgi?usr=${websiteid}Pauto' + '&js=1' + '&amp=1' + '&title=${title}' + '&url=${canonicalUrl}' + '&refer=${documentReferrer}' + '&resolution=${screenWidth}x${screenHeight}' + '&color=${screenColorDepth}' + '&Tips=${random}',
      'click': '${base}click.cgi?usr=${websiteid}' + '&event=${event}' + '&exit=${clicklabel}'
    },
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    }
  },

  'atinternet': {
    'transport': { 'beacon': false, 'xhrpost': false, 'image': true },
    'requests': {
      'base': 'https://${log}${domain}/hit.xiti?s=${site}&ts=${timestamp}&r=${screenWidth}x${screenHeight}x${screenColorDepth}&re=${availableScreenWidth}x${availableScreenHeight}',
      'suffix': '&medium=amp&${extraUrlParams}&ref=${documentReferrer}',
      'pageview': '${base}&' + 'p=${title}&' + 's2=${level2}${suffix}',
      'click': '${base}&' + 'pclick=${title}&' + 's2click=${level2}&' + 'p=${label}&' + 's2=${level2Click}&' + 'type=click&click=${type}${suffix}'
    }
  },

  'burt': {
    'vars': {
      'trackingKey': 'ignore',
      'category': '',
      'subCategory': ''
    },
    'requests': {
      'host': '//${trackingKey}.c.richmetrics.com/',
      'base': '${host}imglog?' + 'e=${trackingKey}&' + 'pi=${trackingKey}' + '|${pageViewId}' + '|${canonicalPath}' + '|${clientId(burt-amp-user-id)}&' + 'ui=${clientId(burt-amp-user-id)}&' + 'v=amp&' + 'ts=${timestamp}&' + 'sn=${requestCount}&',
      'pageview': '${base}' + 'type=page&' + 'ca=${category}&' + 'sc=${subCategory}&' + 'ln=${browserLanguage}&' + 'lr=${documentReferrer}&' + 'eu=${sourceUrl}&' + 'tz=${timezone}&' + 'pd=${scrollWidth}x${scrollHeight}&' + 'sd=${screenWidth}x${screenHeight}&' + 'wd=${availableScreenWidth}x${availableScreenHeight}&' + 'ws=${scrollLeft}x${scrollTop}',
      'pageping': '${base}' + 'type=pageping'
    },
    'triggers': {
      'pageview': {
        'on': 'visible',
        'request': 'pageview'
      },
      'pageping': {
        'on': 'timer',
        'timerSpec': {
          'interval': 15,
          'maxTimerLength': 1200
        },
        'request': 'pageping'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'chartbeat': {
    'requests': {
      'host': 'https://ping.chartbeat.net',
      'basePrefix': '/ping?h=${domain}&' + 'p=${canonicalPath}&' + 'u=${clientId(_cb)}&' + 'd=${canonicalHost}&' + 'g=${uid}&' + 'g0=${sections}&' + 'g1=${authors}&' + 'g2=${zone}&' + 'g3=${sponsorName}&' + 'g4=${contentType}&' + 'c=120&' + 'x=${scrollTop}&' + 'y=${scrollHeight}&' + 'j=${decayTime}&' + 'R=1&' + 'W=0&' + 'I=0&' + 'E=${totalEngagedTime}&' + 'r=${documentReferrer}&' + 't=${pageViewId}${clientId(_cb)}&' + 'b=${pageLoadTime}&' + 'i=${title}&' + 'T=${timestamp}&' + 'tz=${timezone}&' + 'C=2',
      'baseSuffix': '&_',
      'interval': '${host}${basePrefix}${baseSuffix}',
      'anchorClick': '${host}${basePrefix}${baseSuffix}'
    },
    'triggers': {
      'trackInterval': {
        'on': 'timer',
        'timerSpec': {
          'interval': 15,
          'maxTimerLength': 7200
        },
        'request': 'interval',
        'vars': {
          'decayTime': 30
        }
      },
      'trackAnchorClick': {
        'on': 'click',
        'selector': 'a',
        'request': 'anchorClick',
        'vars': {
          'decayTime': 30
        }
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'clicky': {
    'vars': {
      'site_id': ''
    },
    'requests': {
      'base': 'https://in.getclicky.com/in.php?' + 'site_id=${site_id}',
      'baseSuffix': '&mime=${contentType}&' + 'x=${random}',
      'pageview': '${base}&' + 'res=${screenWidth}x${screenHeight}&' + 'lang=${browserLanguage}&' + 'secure=1&' + 'type=pageview&' + 'href=${canonicalPath}&' + 'title=${title}' + '${baseSuffix}',
      'interval': '${base}&' + 'type=ping' + '${baseSuffix}'
    },
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      },
      'interval': {
        'on': 'timer',
        'timerSpec': {
          'interval': 60,
          'maxTimerLength': 600
        },
        'request': 'interval'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'colanalytics': {
    'requests': {
      'host': 'https://ase.clmbtech.com',
      'base': '${host}/message',
      'pageview': '${base}?cid=${id}' + '&val_101=${id}' + '&val_101=${canonicalPath}' + '&ch=${canonicalHost}' + '&uuid=${uid}' + '&au=${authors}' + '&zo=${zone}' + '&sn=${sponsorName}' + '&ct=${contentType}' + '&st=${scrollTop}' + '&sh=${scrollHeight}' + '&dct=${decayTime}' + '&tet=${totalEngagedTime}' + '&dr=${documentReferrer}' + '&plt=${pageLoadTime}' + '&val_108=${title}' + '&val_120=3'
    },
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'comscore': {
    'vars': {
      'c2': '1000001'
    },
    'requests': {
      'host': 'https://sb.scorecardresearch.com',
      'base': '${host}/b?',
      'pageview': '${base}c1=2&c2=${c2}&rn=${random}&c8=${title}' + '&c7=${canonicalUrl}&c9=${documentReferrer}&cs_c7amp=${ampdocUrl}'
    },
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'cxense': {
    'requests': {
      'host': 'https://scomcluster.cxense.com',
      'base': '${host}/Repo/rep.gif',
      'pageview': '${base}?ver=1&typ=pgv&sid=${siteId}&ckp=${clientId(cX_P)}&' + 'loc=${sourceUrl}&rnd=${random}&ref=${documentReferrer}&' + 'ltm=${timestamp}&wsz=${screenWidth}x${screenHeight}&' + 'bln=${browserLanguage}&chs=${documentCharset}&' + 'col=${screenColorDepth}&tzo=${timezone}&cp_cx_channel=amp'
    },
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'googleanalytics': {
    'vars': {
      'eventValue': '0',
      'documentLocation': 'SOURCE_URL',
      'clientId': 'CLIENT_ID(AMP_ECID_GOOGLE)',
      'dataSource': 'AMP'
    },
    'requests': {
      'host': 'https://www.google-analytics.com',
      'basePrefix': 'v=1&' + '_v=a1&' + 'ds=${dataSource}&' + 'aip=true&' + '_s=${requestCount}&' + 'dt=${title}&' + 'sr=${screenWidth}x${screenHeight}&' + '_utmht=${timestamp}&' + 'cid=${clientId}&' + 'tid=${account}&' + 'dl=${documentLocation}&' + 'dr=${documentReferrer}&' + 'sd=${screenColorDepth}&' + 'ul=${browserLanguage}&' + 'de=${documentCharset}',
      'baseSuffix': '&a=${pageViewId}&' + 'z=${random}',
      'pageview': '${host}/r/collect?${basePrefix}&' + 't=pageview&' + 'jid=${random}&' + '_r=1' + '${baseSuffix}',
      'event': '${host}/collect?${basePrefix}&' + 't=event&' + 'jid=&' + 'ec=${eventCategory}&' + 'ea=${eventAction}&' + 'el=${eventLabel}&' + 'ev=${eventValue}' + '${baseSuffix}',
      'social': '${host}/collect?${basePrefix}&' + 't=social&' + 'jid=&' + 'sa=${socialAction}&' + 'sn=${socialNetwork}&' + 'st=${socialTarget}' + '${baseSuffix}',
      'timing': '${host}/collect?${basePrefix}&' + 't=timing&' + 'jid=&' + 'plt=${pageLoadTime}&' + 'dns=${domainLookupTime}&' + 'tcp=${tcpConnectTime}&' + 'rrt=${redirectTime}&' + 'srt=${serverResponseTime}&' + 'pdt=${pageDownloadTime}&' + 'clt=${contentLoadTime}&' + 'dit=${domInteractiveTime}' + '${baseSuffix}'
    },
    'triggers': {
      'performanceTiming': {
        'on': 'visible',
        'request': 'timing',
        'sampleSpec': {
          'sampleOn': '${clientId}',
          'threshold': 1
        }
      }
    },
    'extraUrlParamsReplaceMap': {
      'dimension': 'cd',
      'metric': 'cm'
    },
    'optout': '_gaUserPrefs.ioo'
  },

  'googleconversion': {
    'requests': {
      'conversion': 'https://www.googleadservices.com/pagead/conversion/' + '${google_conversion_id}/?' + 'cv=amp1&' + // Increment when making changes.
      'value=${google_conversion_value}&' + 'currency_code=${google_conversion_currency}&' + 'label=${google_conversion_label}&' + 'random=${random}&' + 'url=${sourceUrl}&' + 'fst=${pageViewId}&' + 'num=${counter(googleconversion)}&' + 'fmt=3&' + 'async=3&' + 'bg=${google_conversion_color}&' + 'u_h=${screenHeight}&u_w=${screenWidth}&' + 'u_ah=${viewportHeight}&u_aw=${viewportWidth}&' + 'u_cd=${screenColorDepth}&' + 'u_tz=${timezone}&' + 'tiba=${title}&' + 'guid=ON&script=0'
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'krux': {
    'requests': {
      'beaconHost': 'https://beacon.krxd.net',
      'timing': 't_navigation_type=0&' + 't_dns=${domainLookupTime}&' + 't_tcp=${tcpConnectTime}&' + 't_http_request=${serverResponseTime}&' + 't_http_response=${pageDownloadTime}&' + 't_content_ready=${contentLoadTime}&' + 't_window_load=${pageLoadTime}&' + 't_redirect=${redirectTime}',
      'common': 'source=amp&' + 'confid=${confid}&' + '_kpid=${pubid}&' + '_kcp_s=${site}&' + '_kcp_sc=${section}&' + '_kcp_ssc=${subsection}&' + '_kcp_d=${canonicalHost}&' + '_kpref_=${documentReferrer}&' + '_kua_kx_amp_client_id=${clientId(_kuid_)}&' + '_kua_kx_lang=${browserLanguage}&' + '_kua_kx_tech_browser_language=${browserLanguage}&' + '_kua_kx_tz=${timezone}',
      'pageview': '${beaconHost}/pixel.gif?${common}&${timing}',
      'event': '${beaconHost}/event.gif?${common}&${timing}&pageview=false'
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    },
    'extraUrlParamsReplaceMap': {
      'user.': '_kua_',
      'page.': '_kpa_'
    }
  },

  'lotame': {
    'requests': {
      'pageview': 'https://bcp.crwdcntrl.net/amp?c=${account}&pv=y'
    },
    'triggers': {
      'track pageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'mediametrie': {
    'requests': {
      'host': 'https://prof.estat.com/m/web',
      'pageview': '${host}/${serial}?' + 'c=${level1}' + '&dom=${ampdocUrl}' + '&enc=${documentCharset}' + '&l3=${level3}' + '&l4=${level4}' + '&n=${random}' + '&p=${level2}' + '&r=${documentReferrer}' + '&sch=${screenHeight}' + '&scw=${screenWidth}' + '&tn=amp' + '&v=1' + '&vh=${availableScreenHeight}' + '&vw=${availableScreenWidth}'
    },
    'triggers': {
      'trackPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'metrika': {
    'transport': { 'beacon': true, 'xhrpost': true, 'image': false },
    'requests': {
      'pageview': '${_watch}?browser-info=${_brInfo}&${_siteInfo}&${_suffix}',
      'notBounce': '${_watch}?browser-info=ar%3A1%3Anb%3A1%3A${_brInfo}' + '&${_suffix}',
      'externalLink': '${_watch}?browser-info=ln%3A1%3A${_brInfo}&${_suffix}',
      'reachGoal': '${_watch}?browser-info=ar%3A1%3A${_brInfo}&${_siteInfo}' + '&${_goalSuffix}',
      '_domain': 'https://mc.yandex.ru',
      '_watch': '${_domain}/watch/${counterId}',
      '_suffix': 'page-url=${sourceUrl}&page-ref=${documentReferrer}',
      '_goalSuffix': 'page-url=goal%3A%2F%2F${sourceHost}%2F${goalId}' + '&page-ref=${sourceUrl}',
      '_techInfo': ['amp%3A1%3Az%3A${timezone}%3Ai%3A${timestamp}%3Arn%3A${random}', 'la%3A${browserLanguage}%3Aen%3A${documentCharset}', 'rqn%3A${requestCount}', 's%3A${screenWidth}x${screenHeight}x${screenColorDepth}', 'w%3A${availableScreenWidth}x${availableScreenHeight}', 'ds%3A${_timings}%3Auid%3A${clientId(_ym_uid)}%3Apvid%3A${pageViewId}'].join('%3A'),
      '_timings': ['${domainLookupTime}%2C${tcpConnectTime}', '${serverResponseTime}%2C${pageDownloadTime}', '${redirectTime}%2C${navTiming(redirectStart,redirectEnd)}', '${navRedirectCount}%2C${navTiming(domLoading,domInteractive)}', '${navTiming(domContentLoadedEventStart,domContentLoadedEventEnd)}', '${navTiming(navigationStart,domComplete)}', '${pageLoadTime}%2C${navTiming(loadEventStart,loadEventEnd)}', '${contentLoadTime}'].join('%2C'),
      '_brInfo': '${_techInfo}%3A${_title}',
      '_title': 't%3A${title}',
      '_siteInfo': 'site-info=${yaParams}'
    },
    'triggers': {
      'pageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    }
  },

  'mparticle': {
    'vars': {
      'eventType': 'Unknown',
      'debug': false,
      'amp_clientId': 'CLIENT_ID(mparticle_amp_id)'
    },
    'requests': {
      'host': 'https://pixels.mparticle.com',
      'endpointPath': '/v1/${apiKey}/Pixel',
      'baseParams': 'et=${eventType}&' + 'amp_id=${amp_clientId}&' + 'attrs_k=${eventAttributes_Keys}&' + 'attrs_v=${eventAttributes_Values}&' + 'ua_k=${userAttributes_Keys}&' + 'ua_v=${userAttributes_Values}&' + 'ui_t=${userIdentities_Types}&' + 'ui_v=${userIdentities_Values}&' + 'flags_k=${customFlags_Keys}&' + 'flags_v=${customFlags_Values}&' + 'ct=${timestamp}&' + 'dbg=${debug}&' + 'lc=${location}&' + 'av=${appVersion}',
      'pageview': '${host}${endpointPath}?' + 'dt=ScreenView&' + 'n=${canonicalPath}&' + 'hn=${ampdocUrl}&' + 'ttl=${title}&' + '${baseParams}',
      'event': '${host}${endpointPath}?' + 'dt=AppEvent&' + 'n=${eventName}&' + '${baseParams}'
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'oewadirect': {
    'transport': { 'beacon': false, 'xhrpost': false, 'image': true },
    'requests': {
      'pageview': 'https://${s}.oewabox.at/j0=,,,r=${canonicalUrl};+,amp=1+cp=${cp}+ssl=1+hn=${canonicalHost};;;?lt=${pageViewId}&x=${screenWidth}x${screenHeight}x24&c=CLIENT_ID(oewa)'
    },
    'triggers': {
      'pageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    }
  },

  'oewa': {
    'transport': { 'beacon': false, 'xhrpost': false, 'image': true },
    'requests': {
      'pageview': '${url}?s=${s}' + '&amp=1' + '&cp=${cp}' + '&host=${canonicalHost}' + '&path=${canonicalPath}'
    },
    'triggers': {
      'pageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    }
  },
  'parsely': {
    'requests': {
      'host': 'https://srv.pixel.parsely.com',
      'basePrefix': '${host}/plogger/?' + 'rand=${timestamp}&' + 'idsite=${apikey}&' + 'url=${ampdocUrl}&' + 'urlref=${documentReferrer}&' + 'screen=${screenWidth}x${screenHeight}%7C' + '${availableScreenWidth}x${availableScreenHeight}%7C' + '${screenColorDepth}&' + 'title=${title}&' + 'date=${timestamp}&' + 'ampid=${clientId(_parsely_visitor)}',
      'pageview': '${basePrefix}&action=pageview'
    },
    // TODO(#1612): client-side session support
    // TODO(#1296): active engaged time support
    // 'heartbeat': '${basePrefix}&action=heartbeat&inc=${engagedTime}'
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'piano': {
    'requests': {
      'host': 'https://api-v3.tinypass.com',
      'basePrefix': '/api/v3',
      'baseSuffix': '&pageview_id=${pageViewId}&rand=${random}&' + 'amp_client_id=${clientId}&aid=${aid}',
      'pageview': '${host}${basePrefix}/page/track?url=${canonicalUrl}&' + 'referer=${documentReferrer}&content_created=${contentCreated}&' + 'content_author=${contentAuthor}&content_section=${contentSection}&' + 'timezone_offset=${timezone}&tags=${tags}&amp_url=${ampdocUrl}&' + 'screen=${screenWidth}x${screenHeight}${baseSuffix}'
    }
  },

  'quantcast': {
    'vars': {
      'labels': ''
    },
    'requests': {
      'host': 'https://pixel.quantserve.com/pixel',
      'pageview': '${host};r=${random};a=${pcode};labels=${labels};' + 'fpan=;fpa=${clientId(__qca)};ns=0;ce=1;cm=;je=0;' + 'sr=${screenWidth}x${screenHeight}x${screenColorDepth};' + 'enc=n;et=${timestamp};ref=${documentReferrer};url=${canonicalUrl}'
    },
    'triggers': {
      'defaultPageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'adobeanalytics': {
    'transport': { 'xhrpost': false, 'beacon': false, 'image': true },
    'vars': {
      'pageName': 'TITLE',
      'host': '',
      'reportSuites': '',
      'linkType': 'o',
      'linkUrl': '',
      'linkName': ''
    },
    'requests': {
      'requestPath': '/b/ss/${reportSuites}/0/amp-1.0/s${random}',
      // vid starts with z to work around #2198
      'basePrefix': 'vid=z${clientId(adobe_amp_id)}' + '&ndh=0' + '&ce=${documentCharset}' + '&pageName=${pageName}' + '&g=${ampdocUrl}' + '&r=${documentReferrer}' + '&bh=${availableScreenHeight}' + '&bw=${availableScreenWidth}' + '&c=${screenColorDepth}' + '&j=amp' + '&s=${screenWidth}x${screenHeight}',
      'pageview': 'https://${host}${requestPath}?${basePrefix}',
      'click': 'https://${host}${requestPath}?${basePrefix}&pe=lnk_${linkType}&pev1=${linkUrl}&pev2=${linkName}'
    }
  },

  'adobeanalytics_nativeConfig': {
    'triggers': {
      'pageLoad': {
        'on': 'visible',
        'request': 'iframeMessage'
      }
    }
  },

  'infonline': {
    'vars': {
      'sv': 'ke',
      'ap': '1'
    },
    'transport': { 'beacon': false, 'xhrpost': false, 'image': true },
    'requests': {
      'pageview': '${url}?st=${st}' + '&sv=${sv}' + '&ap=${ap}' + '&co=${co}' + '&cp=${cp}' + '&host=${canonicalHost}' + '&path=${canonicalPath}'
    },
    'triggers': {
      'pageview': {
        'on': 'visible',
        'request': 'pageview'
      }
    }
  },
  'simplereach': {
    'vars': {
      'pid': '',
      'published_at': '',
      'authors': [],
      'channels': [],
      'tags': []
    },
    'requests': {
      'host': 'https://edge.simplereach.com',
      'baseParams': 'amp=true' + '&pid=${pid}' + '&title=${title}' + '&url=${canonicalUrl}' + '&date=${published_at}' + '&authors=${authors}' + '&channels=${categories}' + '&tags=${tags}' + '&referrer=${documentReferrer}' + '&page_url=${sourceUrl}' + '&user_id=${clientId(sr_amp_id)}' + '&domain=${canonicalHost}',
      'visible': '${host}/n?${baseParams}',
      'timer': '${host}/t?${baseParams}' + '&t=5000' + '&e=5000'
    },
    'triggers': {
      'visible': {
        'on': 'visible',
        'request': 'visible'
      },
      'timer': {
        'on': 'timer',
        'timerSpec': {
          'interval': 5,
          'maxTimerLength': 1200
        },
        'request': 'timer'
      }
    }
  },

  'segment': {
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    },
    'vars': {
      'anonymousId': 'CLIENT_ID(segment_amp_id)'
    },
    'requests': {
      'host': 'https://api.segment.io/v1/pixel',
      'base': '?writeKey=${writeKey}' + '&context.library.name=amp' + '&anonymousId=${anonymousId}' + '&context.locale=${browserLanguage}' + '&context.page.path=${canonicalPath}' + '&context.page.url=${canonicalUrl}' + '&context.page.referrer=${documentReferrer}' + '&context.page.title=${title}' + '&context.screen.width=${screenWidth}' + '&context.screen.height=${screenHeight}',
      'page': '${host}/page${base}&name=${name}',
      'track': '${host}/track${base}&event=${event}'
    },
    'triggers': {
      'page': {
        'on': 'visible',
        'request': 'page'
      }
    }
  },

  'snowplow': {
    'requests': {
      'aaVersion': 'amp-0.1',
      'basePrefix': 'https://${collectorHost}/i?url=${canonicalUrl}&page=${title}&' + 'res=${screenWidth}x${screenHeight}&stm=${timestamp}&' + 'tz=${timezone}&aid=${appId}&p=web&tv=${aaVersion}',
      'pageView': '${basePrefix}&e=pv',
      'structEvent': '${basePrefix}&e=se&' + 'se_ca=${structEventCategory}&se_ac=${structEventAction}&' + 'se_la=${structEventLabel}&se_pr=${structEventProperty}&' + 'se_va=${structEventValue}'
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'webtrekk': {
    'requests': {
      'trackURL': 'https://${trackDomain}/${trackId}/wt',
      'parameterPrefix': '?p=432,${contentId},1,' + '${screenWidth}x${screenHeight},${screenColorDepth},1,' + '${timestamp},${documentReferrer},${viewportWidth}x' + '${viewportHeight},0&tz=${timezone}' + '&eid=${clientId(amp-wt3-eid)}&la=${browserLanguage}',
      'parameterSuffix': '&pu=${canonicalUrl}',
      'pageParameter': '&cp1=${pageParameter1}' + '&cp2=${pageParameter2}&cp3=${pageParameter3}' + '&cp4=${pageParameter4}&cp5=${pageParameter5}' + '&cp6=${pageParameter6}&cp7=${pageParameter7}' + '&cp8=${pageParameter8}&cp9=${pageParameter9}' + '&cp10=${pageParameter10}',
      'pageCategories': '&cg1=${pageCategory1}' + '&cg2=${pageCategory2}&cg3=${pageCategory3}' + '&cg4=${pageCategory4}&cg5=${pageCategory5}' + '&cg6=${pageCategory6}&cg7=${pageCategory7}' + '&cg8=${pageCategory8}&cg9=${pageCategory9}' + '&cg10=${pageCategory10}',
      'pageview': '${trackURL}${parameterPrefix}${pageParameter}' + '${pageCategories}${parameterSuffix}',
      'actionParameter': '&ck1=${actionParameter1}' + '&ck2=${actionParameter2}&ck3=${actionParameter3}' + '&ck4=${actionParameter4}&ck5=${actionParameter5}',
      'event': '${trackURL}${parameterPrefix}&ct=${actionName}' + '${actionParameter}${parameterSuffix}'
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  },

  'mpulse': {
    'requests': {
      'onvisible': 'https://${beacon_url}?' + 'h.d=${h.d}' + '&h.key=${h.key}' + '&h.t=${h.t}' + '&h.cr=${h.cr}' + '&rt.start=navigation' + '&rt.si=${clientId(amp_mpulse)}' + '&rt.ss=${timestamp}' + '&rt.end=${timestamp}' + '&t_resp=${navTiming(navigationStart,responseStart)}' + '&t_page=${navTiming(responseStart,loadEventStart)}' + '&t_done=${navTiming(navigationStart,loadEventStart)}' + '&nt_nav_type=${navType}' + '&nt_red_cnt=${navRedirectCount}' + '&nt_nav_st=${navTiming(navigationStart)}' + '&nt_red_st=${navTiming(redirectStart)}' + '&nt_red_end=${navTiming(redirectEnd)}' + '&nt_fet_st=${navTiming(fetchStart)}' + '&nt_dns_st=${navTiming(domainLookupStart)}' + '&nt_dns_end=${navTiming(domainLookupEnd)}' + '&nt_con_st=${navTiming(connectStart)}' + '&nt_ssl_st=${navTiming(secureConnectionStart)}' + '&nt_con_end=${navTiming(connectEnd)}' + '&nt_req_st=${navTiming(requestStart)}' + '&nt_res_st=${navTiming(responseStart)}' + '&nt_unload_st=${navTiming(unloadEventStart)}' + '&nt_unload_end=${navTiming(unloadEventEnd)}' + '&nt_domloading=${navTiming(domLoading)}' + '&nt_res_end=${navTiming(responseEnd)}' + '&nt_domint=${navTiming(domInteractive)}' + '&nt_domcontloaded_st=${navTiming(domContentLoadedEventStart)}' + '&nt_domcontloaded_end=${navTiming(domContentLoadedEventEnd)}' + '&nt_domcomp=${navTiming(domComplete)}' + '&nt_load_st=${navTiming(loadEventStart)}' + '&nt_load_end=${navTiming(loadEventEnd)}' + '&v=1' + '&http.initiator=amp' + '&u=${sourceUrl}' + '&amp.u=${ampdocUrl}' + '&r2=${documentReferrer}' + '&scr.xy=${screenWidth}x${screenHeight}'
    },

    'triggers': {
      'onvisible': {
        'on': 'visible',
        'request': 'onvisible'
      }
    },

    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    },

    'extraUrlParamsReplaceMap': {
      'ab_test': 'h.ab',
      'page_group': 'h.pg',
      'custom_dimension.': 'cdim.',
      'custom_metric.': 'cmet.'
    }
  },

  'linkpulse': {
    'vars': {
      'id': '',
      'pageUrl': 'CANONICAL_URL',
      'title': 'TITLE',
      'section': '',
      'channel': 'amp',
      'type': '',
      'host': 'pp.lp4.io',
      'empty': ''
    },
    'requests': {
      'base': 'https://${host}',
      'pageview': '${base}/p?i=${id}' + '&r=${documentReferrer}' + '&p=${pageUrl}' + '&s=${section}' + '&t=${type}' + '&c=${channel}' + '&mt=${title}' + '&_t=amp' + '&_r=${random}',
      'pageload': '${base}/pl?i=${id}' + '&ct=${domInteractiveTime}' + '&rt=${pageDownloadTime}' + '&pt=${pageLoadTime}' + '&p=${pageUrl}' + '&c=${channel}' + '&t=${type}' + '&s=${section}' + '&_t=amp' + '&_r=${random}',
      'ping': '${base}/u?i=${id}' + '&u=${clientId(_lp4_u)}' + '&p=${pageUrl}' + '&uActive=true' + '&isPing=yes' + '&c=${channel}' + '&t=${type}' + '&s=${section}' + '&_t=amp' + '&_r=${random}'
    },
    'triggers': {
      'pageview': {
        'on': 'visible',
        'request': 'pageview'
      },
      'pageload': {
        'on': 'visible',
        'request': 'pageload'
      },
      'ping': {
        'on': 'timer',
        'timerSpec': {
          'interval': 30,
          'maxTimerLength': 7200
        },
        'request': 'ping'

      }
    },
    'transport': {
      'beacon': false,
      'xhrpost': false,
      'image': true
    }
  }
};
exports.ANALYTICS_CONFIG = ANALYTICS_CONFIG;
ANALYTICS_CONFIG['infonline']['triggers']['pageview']['iframe' +
/* TEMPORARY EXCEPTION */'Ping'] = true;

ANALYTICS_CONFIG['adobeanalytics_nativeConfig']['triggers']['pageLoad']['iframe' +
/* TEMPORARY EXCEPTION */'Ping'] = true;

ANALYTICS_CONFIG['oewa']['triggers']['pageview']['iframe' +
/* TEMPORARY EXCEPTION */'Ping'] = true;

},{}],8:[function(require,module,exports){
exports.__esModule = true;
exports.isPositiveNumber_ = isPositiveNumber_;
exports.isValidPercentage_ = isValidPercentage_;
exports.isVisibilitySpecValid = isVisibilitySpecValid;
exports.getElement = getElement;
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

var _srcDom = require('../../../src/dom');

var _srcLog = require('../../../src/log');

var _srcResources = require('../../../src/resources');

var _srcTimer = require('../../../src/timer');

var _srcTypes = require('../../../src/types');

var _srcViewport = require('../../../src/viewport');

var _srcViewer = require('../../../src/viewer');

var _srcVisibilityState = require('../../../src/visibility-state');

var _srcString = require('../../../src/string');

/** @const {number} */
var LISTENER_INITIAL_RUN_DELAY_ = 20;

// Variables that are passed to the callback.
var MAX_CONTINUOUS_TIME = 'maxContinuousVisibleTime';
var TOTAL_VISIBLE_TIME = 'totalVisibleTime';
var FIRST_SEEN_TIME = 'firstSeenTime';
var LAST_SEEN_TIME = 'lastSeenTime';
var FIRST_VISIBLE_TIME = 'fistVisibleTime';
var LAST_VISIBLE_TIME = 'lastVisibleTime';
var MIN_VISIBLE = 'minVisiblePercentage';
var MAX_VISIBLE = 'maxVisiblePercentage';
var ELEMENT_X = 'elementX';
var ELEMENT_Y = 'elementY';
var ELEMENT_WIDTH = 'elementWidth';
var ELEMENT_HEIGHT = 'elementHeight';
var TOTAL_TIME = 'totalTime';
var LOAD_TIME_VISIBILITY = 'loadTimeVisibility';
var BACKGROUNDED = 'backgrounded';
var BACKGROUNDED_AT_START = 'backgroundedAtStart';

// Variables that are not exposed outside this class.
var CONTINUOUS_TIME = 'cT';
var LAST_UPDATE = 'lU';
var IN_VIEWPORT = 'iV';
var TIME_LOADED = 'tL';

// Keys used in VisibilitySpec
var CONTINUOUS_TIME_MAX = 'continuousTimeMax';
var CONTINUOUS_TIME_MIN = 'continuousTimeMin';
var TOTAL_TIME_MAX = 'totalTimeMax';
var TOTAL_TIME_MIN = 'totalTimeMin';
var VISIBLE_PERCENTAGE_MIN = 'visiblePercentageMin';
var VISIBLE_PERCENTAGE_MAX = 'visiblePercentageMax';

var TAG_ = 'Analytics.Visibility';
/**
 * Checks if the value is undefined or positive number like.
 * "", 1, 0, undefined, 100, 101 are positive. -1, NaN are not.
 *
 * Visible for testing.
 *
 * @param {number} num The number to verify.
 * @return {boolean}
 * @private
 */

function isPositiveNumber_(num) {
  return num === undefined || typeof num == 'number' && Math.sign(num) >= 0;
}

/**
 * Checks if the value is undefined or a number between 0 and 100.
 * "", 1, 0, undefined, 100 return true. -1, NaN and 101 return false.
 *
 * Visible for testing.
 *
 * @param {number} num The number to verify.
 * @return {boolean}
 */

function isValidPercentage_(num) {
  return num === undefined || typeof num == 'number' && Math.sign(num) >= 0 && num <= 100;
}

/**
 * Checks and outputs information about visibilitySpecValidation.
 * @param {!JSONType} config Configuration for instrumentation.
 * @return {boolean} True if the spec is valid.
 * @private
 */

function isVisibilitySpecValid(config) {
  if (!config['visibilitySpec']) {
    return true;
  }

  var spec = config['visibilitySpec'];
  var selector = spec['selector'];
  if (!selector || !_srcString.startsWith(selector, '#') && !_srcString.startsWith(selector, 'amp-') && selector != ':root' && selector != ':host') {
    _srcLog.user().error(TAG_, 'Visibility spec requires an id selector, a tag ' + 'name starting with "amp-" or ":root"');
    return false;
  }

  var ctMax = spec[CONTINUOUS_TIME_MAX];
  var ctMin = spec[CONTINUOUS_TIME_MIN];
  var ttMax = spec[TOTAL_TIME_MAX];
  var ttMin = spec[TOTAL_TIME_MIN];

  if (!isPositiveNumber_(ctMin) || !isPositiveNumber_(ctMax) || !isPositiveNumber_(ttMin) || !isPositiveNumber_(ttMax)) {
    _srcLog.user().error(TAG_, 'Timing conditions should be positive integers when specified.');
    return false;
  }

  if (ctMax < ctMin || ttMax < ttMin) {
    _srcLog.user().warn('AMP-ANALYTICS', 'Max value in timing conditions should be ' + 'more than the min value.');
    return false;
  }

  if (!isValidPercentage_(spec[VISIBLE_PERCENTAGE_MAX]) || !isValidPercentage_(spec[VISIBLE_PERCENTAGE_MIN])) {
    _srcLog.user().error(TAG_, 'visiblePercentage conditions should be between 0 and 100.');
    return false;
  }

  if (spec[VISIBLE_PERCENTAGE_MAX] < spec[VISIBLE_PERCENTAGE_MIN]) {
    _srcLog.user().error(TAG_, 'visiblePercentageMax should be greater than ' + 'visiblePercentageMin');
    return false;
  }
  return true;
}

/**
 * Returns the element that matches the selector. If the selector is an
 * id, the element with that id is returned. If the selector is a tag name, an
 * ancestor of the analytics element with that tag name is returned.
 *
 * @param {string} selector The selector for the element to track.
 * @param {!Element} el Element whose ancestors to search.
 * @param {!String} selectionMethod The method to use to find the element..
 * @return {?Element} Element corresponding to the selector if found.
 */

function getElement(ampdoc, selector, el, selectionMethod) {
  if (!el) {
    return null;
  }

  // Special case for root selector.
  if (selector == ':host' || selector == ':root') {
    var elWin = ampdoc.win;
    var parentEl = elWin.frameElement && elWin.frameElement.parentElement;
    if (parentEl) {
      return _srcDom.closestBySelector(parentEl, '.-amp-element');
    }
  }

  if (selectionMethod == 'closest') {
    // Only tag names are supported currently.
    var closestEl = _srcDom.closestByTag(el, selector);
    // Restrict result to be contained by ampdoc.
    if (closestEl && ampdoc.contains(closestEl)) {
      return closestEl;
    }
    return null;
  } else if (selectionMethod == 'scope') {
    return el.parentElement.querySelector(selector);
  } else if (selector[0] == '#') {
    return ampdoc.getElementById(selector.slice(1));
  }
  return null;
}

/**
 * This type signifies a callback that gets called when visibility conditions
 * are met.
 * @typedef {function(!JSONType)}
 */
var VisibilityListenerCallbackDef = undefined;

/**
 * @typedef {Object<string, JSONType|VisibilityListenerCallbackDef|Object>}
 */
var VisibilityListenerDef = undefined;

/**
 * Allows tracking of AMP elements in the viewport.
 *
 * This class allows a caller to specify conditions to evaluate when an element
 * is in viewport and for how long. If the conditions are satisfied, a provided
 * callback is called.
 */

var Visibility = (function () {

  /** @param {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc */

  function Visibility(ampdoc) {
    babelHelpers.classCallCheck(this, Visibility);

    /** @const {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc */
    this.ampdoc = ampdoc;

    /**
     * key: resource id.
     * value: [{ config: <config>, callback: <callback>, state: <state>}]
     * @type {!Object<!Array<VisibilityListenerDef>>}
     * @private
     */
    this.listeners_ = Object.create(null);

    /** @const {!../../../src/service/timer-impl.Timer} */
    this.timer_ = _srcTimer.timerFor(this.ampdoc.win);

    /** @private {Array<!../../../src/service/resource.Resource>} */
    this.resources_ = [];

    /** @private @const {function()} */
    this.boundScrollListener_ = this.scrollListener_.bind(this);

    /** @private @const {function()} */
    this.boundVisibilityListener_ = this.visibilityListener_.bind(this);

    /** @private {boolean} */
    this.scrollListenerRegistered_ = false;

    /** @private {boolean} */
    this.visibilityListenerRegistered_ = false;

    /** @private {!../../../src/service/resources-impl.Resources} */
    this.resourcesService_ = _srcResources.resourcesForDoc(this.ampdoc);

    /** @private {number|string|null} */
    this.scheduledRunId_ = null;

    /** @private {number} Amount of time to wait for next calculation. */
    this.timeToWait_ = Infinity;

    /** @private {boolean} */
    this.scheduledLoadedPromises_ = false;

    /** @private @const {!../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = _srcViewer.viewerForDoc(this.ampdoc);

    /** @private {boolean} */
    this.backgroundedAtStart_ = !this.viewer_.isVisible();

    /** @private {boolean} */
    this.backgrounded_ = this.backgroundedAtStart_;
  }

  /** @private */

  Visibility.prototype.registerForVisibilityEvents_ = function registerForVisibilityEvents_() {
    if (!this.visibilityListenerRegistered_) {
      this.viewer_.onVisibilityChanged(this.boundVisibilityListener_);
      this.visibilityListenerRegistered_ = true;
      this.visibilityListener_();
    }
  };

  /** @private */

  Visibility.prototype.registerForViewportEvents_ = function registerForViewportEvents_() {
    if (!this.scrollListenerRegistered_) {
      var viewport = _srcViewport.viewportForDoc(this.ampdoc);

      // Currently unlistens are not being used. In the event that no resources
      // are actively being monitored, the scrollListener should be very cheap.
      viewport.onScroll(this.boundScrollListener_);
      viewport.onChanged(this.boundScrollListener_);
      this.scrollListenerRegistered_ = true;
    }
  };

  /**
   * @param {!JSONType} config
   * @param {!VisibilityListenerCallbackDef} callback
   * @param {boolean} shouldBeVisible True if the element should be visible
   *  when callback is called. False otherwise.
   * @param {!Element} analyticsElement The amp-analytics element that the
   *  config is associated with.
   */

  Visibility.prototype.listenOnce = function listenOnce(config, callback, shouldBeVisible, analyticsElement) {
    var _this = this;

    var selector = config['selector'];
    var element = getElement(this.ampdoc, selector, _srcLog.dev().assertElement(analyticsElement), config['selectionMethod']);
    _srcLog.user().assert(element, 'Element not found for visibilitySpec: ' + selector);
    var res = null;
    try {
      res = this.resourcesService_.getResourceForElement(_srcLog.user().assertElement(element));
    } catch (e) {
      _srcLog.user().assert(res, 'Visibility tracking not supported on element: ', element);
    }

    var resId = res.getId();

    this.registerForViewportEvents_();
    this.registerForVisibilityEvents_();

    this.listeners_[resId] = this.listeners_[resId] || [];
    var state = {};
    state[TIME_LOADED] = Date.now();
    this.listeners_[resId].push({ config: config, callback: callback, state: state, shouldBeVisible: shouldBeVisible });
    this.resources_.push(res);

    if (this.scheduledRunId_ === null) {
      this.scheduledRunId_ = this.timer_.delay(function () {
        _this.scrollListener_();
      }, LISTENER_INITIAL_RUN_DELAY_);
    }
  };

  /** @private */

  Visibility.prototype.visibilityListener_ = function visibilityListener_() {
    var state = this.viewer_.getVisibilityState();
    if (state == _srcVisibilityState.VisibilityState.HIDDEN || state == _srcVisibilityState.VisibilityState.PAUSED || state == _srcVisibilityState.VisibilityState.INACTIVE) {
      this.backgrounded_ = true;
    }
    this.scrollListener_();
  };

  /** @private */

  Visibility.prototype.scrollListener_ = function scrollListener_() {
    var _this2 = this;

    if (this.scheduledRunId_ != null) {
      this.timer_.cancel(this.scheduledRunId_);
      this.scheduledRunId_ = null;
    }

    var loadedPromises = [];

    for (var r = this.resources_.length - 1; r >= 0; r--) {
      var res = this.resources_[r];
      if (!res.hasLoadedOnce()) {
        loadedPromises.push(res.loadedOnce());
        continue;
      }

      var change = res.element.getIntersectionChangeEntry();
      var br = change.boundingClientRect;
      var visible = !_srcTypes.isFiniteNumber(change.intersectionRatio) ? 0 : change.intersectionRatio * 100;

      var listeners = this.listeners_[res.getId()];
      for (var c = listeners.length - 1; c >= 0; c--) {
        var shouldBeVisible = !!listeners[c]['shouldBeVisible'];
        if (this.updateCounters_(visible, listeners[c], shouldBeVisible) && this.viewer_.isVisible() == shouldBeVisible) {
          this.prepareStateForCallback_(listeners[c]['state'], br);
          listeners[c].callback(listeners[c]['state']);
          listeners.splice(c, 1);
        }
      }

      // Remove resources that have no listeners.
      if (listeners.length == 0) {
        this.resources_.splice(r, 1);
      }
    }

    // Schedule a calculation for the time when one of the conditions is
    // expected to be satisfied.
    if (this.scheduledRunId_ === null && this.timeToWait_ < Infinity && this.timeToWait_ > 0) {
      this.scheduledRunId_ = this.timer_.delay(function () {
        _this2.scrollListener_();
      }, this.timeToWait_);
    }

    // Schedule a calculation for when a resource gets loaded.
    if (loadedPromises.length > 0 && !this.scheduledLoadedPromises_) {
      Promise.race(loadedPromises).then(function () {
        _this2.scheduledLoadedPromises_ = false;
        _this2.scrollListener_();
      });
      this.scheduledLoadedPromises_ = true;
    }
  };

  /**
   * Updates counters for a given listener.
   * @param {number} visible Percentage of element visible in viewport.
   * @param {Object<string,Object>} listener The listener whose counters need
   *  updating.
   * @param {boolean} triggerType True if element should be visible.
   *  False otherwise.
   * @return {boolean} true if all visibility conditions are satisfied
   * @private
   */

  Visibility.prototype.updateCounters_ = function updateCounters_(visible, listener, triggerType) {
    var config = listener['config'];
    var state = listener['state'] || {};

    if (visible > 0) {
      var timeElapsed = Date.now() - state[TIME_LOADED];
      state[FIRST_SEEN_TIME] = state[FIRST_SEEN_TIME] || timeElapsed;
      state[LAST_SEEN_TIME] = Date.now() - state[TIME_LOADED];
      // Consider it as load time visibility if this happens within 300ms of
      // page load.
      if (state[LOAD_TIME_VISIBILITY] == undefined && timeElapsed < 300) {
        state[LOAD_TIME_VISIBILITY] = visible;
      }
    }

    var wasInViewport = state[IN_VIEWPORT];
    var timeSinceLastUpdate = Date.now() - state[LAST_UPDATE];
    state[IN_VIEWPORT] = this.isInViewport_(visible, config[VISIBLE_PERCENTAGE_MIN], config[VISIBLE_PERCENTAGE_MAX]);

    if (state[IN_VIEWPORT] && wasInViewport) {
      // Keep counting.
      this.setState_(state, visible, timeSinceLastUpdate);
    } else if (!state[IN_VIEWPORT] && wasInViewport) {
      // The resource went out of view. Do final calculations and reset state.
      _srcLog.dev().assert(state[LAST_UPDATE] > 0, 'lastUpdated time in weird state.');

      state[MAX_CONTINUOUS_TIME] = Math.max(state[MAX_CONTINUOUS_TIME], state[CONTINUOUS_TIME] + timeSinceLastUpdate);

      state[LAST_UPDATE] = -1;
      state[TOTAL_VISIBLE_TIME] += timeSinceLastUpdate;
      state[CONTINUOUS_TIME] = 0; // Clear only after max is calculated above.
      state[LAST_VISIBLE_TIME] = Date.now() - state[TIME_LOADED];
    } else if (state[IN_VIEWPORT] && !wasInViewport) {
      // The resource came into view. start counting.
      _srcLog.dev().assert(state[LAST_UPDATE] == undefined || state[LAST_UPDATE] == -1, 'lastUpdated time in weird state.');
      state[FIRST_VISIBLE_TIME] = state[FIRST_VISIBLE_TIME] || Date.now() - state[TIME_LOADED];
      this.setState_(state, visible, 0);
    }

    var waitForContinuousTime = config[CONTINUOUS_TIME_MIN] ? config[CONTINUOUS_TIME_MIN] - state[CONTINUOUS_TIME] : Infinity;
    var waitForTotalTime = config[TOTAL_TIME_MIN] ? config[TOTAL_TIME_MIN] - state[TOTAL_VISIBLE_TIME] : Infinity;

    // Wait for minimum of (previous timeToWait, positive values of
    // waitForContinuousTime and waitForTotalTime).
    this.timeToWait_ = Math.min(this.timeToWait_, waitForContinuousTime > 0 ? waitForContinuousTime : Infinity, waitForTotalTime > 0 ? waitForTotalTime : Infinity);
    listener['state'] = state;

    return (triggerType && state[IN_VIEWPORT] || !triggerType) && (config[TOTAL_TIME_MIN] === undefined || state[TOTAL_VISIBLE_TIME] >= config[TOTAL_TIME_MIN]) && (config[TOTAL_TIME_MAX] === undefined || state[TOTAL_VISIBLE_TIME] <= config[TOTAL_TIME_MAX]) && (config[CONTINUOUS_TIME_MIN] === undefined || state[CONTINUOUS_TIME] >= config[CONTINUOUS_TIME_MIN]) && (config[CONTINUOUS_TIME_MAX] === undefined || state[CONTINUOUS_TIME] <= config[CONTINUOUS_TIME_MAX]);
  };

  /**
   * For the purposes of these calculations, a resource is in viewport if the
   * visbility conditions are satisfied or they are not defined.
   * @param {!number} visible Percentage of element visible
   * @param {number} min Lower bound of visibility condition. Not inclusive
   * @param {number} max Upper bound of visibility condition. Inclusive.
   * @return {boolean} true if the conditions are satisfied.
   * @private
   */

  Visibility.prototype.isInViewport_ = function isInViewport_(visible, min, max) {
    if (min === undefined && max === undefined) {
      return true;
    }

    if (visible > (min || 0) && visible <= (max || 100)) {
      // (Min, Max]
      return true;
    }
    return false;
  };

  /** @private */

  Visibility.prototype.setState_ = function setState_(s, visible, sinceLast) {
    s[LAST_UPDATE] = Date.now();
    s[TOTAL_VISIBLE_TIME] = s[TOTAL_VISIBLE_TIME] !== undefined ? s[TOTAL_VISIBLE_TIME] + sinceLast : 0;
    s[CONTINUOUS_TIME] = s[CONTINUOUS_TIME] !== undefined ? s[CONTINUOUS_TIME] + sinceLast : 0;
    s[MAX_CONTINUOUS_TIME] = s[MAX_CONTINUOUS_TIME] !== undefined ? Math.max(s[MAX_CONTINUOUS_TIME], s[CONTINUOUS_TIME]) : 0;
    s[MIN_VISIBLE] = s[MIN_VISIBLE] ? Math.min(s[MIN_VISIBLE], visible) : visible;
    s[MAX_VISIBLE] = s[MAX_VISIBLE] ? Math.max(s[MAX_VISIBLE], visible) : visible;
    s[LAST_VISIBLE_TIME] = Date.now() - s[TIME_LOADED];
  };

  /**
   * Sets variable values for callback. Cleans up existing values.
   * @param {Object<string, *>} state The state object to populate
   * @param {!../../../src/layout-rect.LayoutRectDef} br The bounding rectangle
   *     for the element
   * @private
   */

  Visibility.prototype.prepareStateForCallback_ = function prepareStateForCallback_(state, br) {
    var perf = this.ampdoc.win.performance;
    var viewport = _srcViewport.viewportForDoc(this.ampdoc);

    state[ELEMENT_X] = viewport.getScrollLeft() + br.left;
    state[ELEMENT_Y] = viewport.getScrollTop() + br.top;
    state[ELEMENT_WIDTH] = br.width;
    state[ELEMENT_HEIGHT] = br.height;
    state[TOTAL_TIME] = perf && perf.timing && perf.timing.domInteractive ? Date.now() - perf.timing.domInteractive : '';

    state[LOAD_TIME_VISIBILITY] = state[LOAD_TIME_VISIBILITY] || 0;
    if (state[MIN_VISIBLE] !== undefined) {
      state[MIN_VISIBLE] = Math.round(_srcLog.dev().assertNumber(state[MIN_VISIBLE]) * 100) / 100;
    }
    if (state[MAX_VISIBLE] !== undefined) {
      state[MAX_VISIBLE] = Math.round(_srcLog.dev().assertNumber(state[MAX_VISIBLE]) * 100) / 100;
    }
    state[BACKGROUNDED] = this.backgrounded_ ? '1' : '0';
    state[BACKGROUNDED_AT_START] = this.backgroundedAtStart_ ? '1' : '0';

    // Remove the state that need not be public and call callback.
    delete state[CONTINUOUS_TIME];
    delete state[LAST_UPDATE];
    delete state[IN_VIEWPORT];
    delete state[TIME_LOADED];

    for (var k in state) {
      if (state.hasOwnProperty(k)) {
        state[k] = String(state[k]);
      }
    }
  };

  return Visibility;
})();

exports.Visibility = Visibility;

},{"../../../src/dom":15,"../../../src/log":19,"../../../src/resources":28,"../../../src/string":30,"../../../src/timer":32,"../../../src/types":33,"../../../src/viewer":38,"../../../src/viewport":39,"../../../src/visibility-state":40}],9:[function(require,module,exports){
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
 * Allows tracking of AMP elements in the viewport.
 *
 * This class allows a caller to specify conditions to evaluate when an element
 * is in viewport and for how long. If the conditions are satisfied, a provided
 * callback is called. IntersectionObserver is used.
 */

var VisibilityV2 = (function () {
  /** @param {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc */

  function VisibilityV2(ampdoc) {
    babelHelpers.classCallCheck(this, VisibilityV2);

    /** @const {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc */
    this.ampdoc = ampdoc;
  }

  /**
   * @param {!JSONType} config
   * @param {function(!JSONType)} callback
   * @param {boolean} shouldBeVisible True if the element should be visible
   *  when callback is called. False otherwise.
   * @param {!Element} analyticsElement The amp-analytics element that the
   *  config is associated with.
   */

  VisibilityV2.prototype.listenOnce = function listenOnce(config, callback, shouldBeVisible,
  /*eslint  no-unused-vars: 0*/analyticsElement) {
    // TODO: make this happen!
  };

  return VisibilityV2;
})();

exports.VisibilityV2 = VisibilityV2;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./element-service":16}],15:[function(require,module,exports){
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

},{"../third_party/css-escape/css-escape":43,"./log":19,"./types":33}],16:[function(require,module,exports){
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

},{"./dom":15,"./log":19,"./service":29}],17:[function(require,module,exports){
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

},{"./log":19,"./timer":32}],18:[function(require,module,exports){
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

},{"./cookies":13,"./url":35}],19:[function(require,module,exports){
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

},{"./mode":21,"./mode-object":20}],20:[function(require,module,exports){
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

},{"./mode":21}],21:[function(require,module,exports){
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
var version = '1481124636330';

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

  // Currently `1481124636330` and thus `mode.version` contain only
  // major version. The full version however must also carry the minor version.
  // We will default to production default `01` minor version for now.
  // TODO(erwinmombay): decide whether 1481124636330 should contain
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./mode":21,"./polyfills/document-contains":24,"./polyfills/math-sign":25,"./polyfills/object-assign":26,"./polyfills/promise":27,"document-register-element/build/document-register-element.node":10}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"promise-pjs/promise":11}],28:[function(require,module,exports){
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

},{"./service":29}],29:[function(require,module,exports){
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

},{"./log":19,"./polyfills":23}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"./service":29}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./service":29}],35:[function(require,module,exports){
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

},{"./config":12,"./log":19,"./mode":21,"./string":30,"./types":33}],36:[function(require,module,exports){
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

},{"./element-service":16}],37:[function(require,module,exports){
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

},{"../log":19}],38:[function(require,module,exports){
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

},{"./service":29}],39:[function(require,module,exports){
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

},{"./service":29}],40:[function(require,module,exports){
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
 * Visibility state of the AMP document.
 * @enum {string}
 */
var VisibilityState = {
  /**
   * The AMP document is being pre-rendered before being shown.
   */
  PRERENDER: 'prerender',

  /**
   * The AMP document is currently active and visible.
   */
  VISIBLE: 'visible',

  /**
   * The AMP document is active but the browser tab or AMP app is not.
   */
  HIDDEN: 'hidden',

  /**
   * The AMP document is visible, but the user has started swiping away from
   * it. The runtime may stop active playback.
   */
  PAUSED: 'paused',

  /**
   * The AMP document is no longer active because the user swiped away or
   * closed the viewer. The document may become visible again later.
   */
  INACTIVE: 'inactive'
};
exports.VisibilityState = VisibilityState;

},{}],41:[function(require,module,exports){
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

},{"./service":29}],42:[function(require,module,exports){
exports.__esModule = true;
exports.base64 = base64;
exports.sha384 = sha384;
/* Generated from closure library commit c6c579a445d2a6415120753314f701eb0ae989bc */var k = this;function l(a, b) {
  a = a.split(".");var c = window || k;a[0] in c || !c.execScript || c.execScript("var " + a[0]);for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
}
function aa(a) {
  var b = typeof a;if ("object" == b) if (a) {
    if (a instanceof Array) return "array";if (a instanceof Object) return b;var c = Object.prototype.toString.call(a);if ("[object Window]" == c) return "object";if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function";
  } else return "null";else if ("function" == b && "undefined" == typeof a.call) return "object";return b;
}function m(a, b) {
  function c() {}c.prototype = b.prototype;a.v = b.prototype;a.prototype = new c();a.prototype.constructor = a;a.u = function (a, c, f) {
    for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];return b.prototype[c].apply(a, g);
  };
};function ba() {
  this.g = -1;
};function r(a, b, c) {
  return Object.prototype.hasOwnProperty.call(a, b) ? a[b] : a[b] = c(b);
};function u(a, b) {
  this.b = a | 0;this.a = b | 0;
}var ca = {},
    w = {};function x(a) {
  return -128 <= a && 128 > a ? r(ca, a, function (a) {
    return new u(a | 0, 0 > a ? -1 : 0);
  }) : new u(a | 0, 0 > a ? -1 : 0);
}function y(a) {
  return isNaN(a) ? z() : a <= -A ? B() : a + 1 >= A ? da() : 0 > a ? C(y(-a)) : new u(a % D | 0, a / D | 0);
}var D = 4294967296,
    A = D * D / 2;function z() {
  return r(w, ea, function () {
    return x(0);
  });
}function F() {
  return r(w, fa, function () {
    return x(1);
  });
}function G() {
  return r(w, ga, function () {
    return x(-1);
  });
}function da() {
  return r(w, ha, function () {
    return new u(-1, 2147483647);
  });
}
function B() {
  return r(w, ia, function () {
    return new u(0, -2147483648);
  });
}function H() {
  return r(w, ja, function () {
    return x(16777216);
  });
}
u.prototype.toString = function (a) {
  a = a || 10;if (2 > a || 36 < a) throw Error("radix out of range: " + a);if (I(this)) return "0";if (0 > this.a) {
    if (J(this, B())) {
      var b = y(a),
          c = K(this, b),
          b = L(M(c, b), C(this));return c.toString(a) + b.b.toString(a);
    }return "-" + C(this).toString(a);
  }for (var c = y(Math.pow(a, 6)), b = this, d = "";;) {
    var e = K(b, c),
        f = (L(b, C(M(e, c))).b >>> 0).toString(a),
        b = e;if (I(b)) return f + d;for (; 6 > f.length;) f = "0" + f;d = "" + f + d;
  }
};function N(a) {
  return 0 <= a.b ? a.b : D + a.b;
}function I(a) {
  return 0 == a.a && 0 == a.b;
}
function J(a, b) {
  return a.a == b.a && a.b == b.b;
}function O(a, b) {
  if (J(a, b)) return 0;var c = 0 > a.a,
      d = 0 > b.a;return c && !d ? -1 : !c && d ? 1 : 0 > L(a, C(b)).a ? -1 : 1;
}function C(a) {
  return J(a, B()) ? B() : L(new u(~a.b, ~a.a), F());
}function L(a, b) {
  var c = a.a >>> 16,
      d = a.a & 65535,
      e = a.b >>> 16,
      f = b.a >>> 16,
      g = b.a & 65535,
      h = b.b >>> 16;a = 0 + ((a.b & 65535) + (b.b & 65535));h = 0 + (a >>> 16) + (e + h);e = 0 + (h >>> 16);e += d + g;c = 0 + (e >>> 16) + (c + f) & 65535;return new u((h & 65535) << 16 | a & 65535, c << 16 | e & 65535);
}
function M(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var a = _x,
        b = _x2;
    _again = false;
    if (I(a) || I(b)) return z();if (J(a, B())) return 1 == (b.b & 1) ? B() : z();if (J(b, B())) return 1 == (a.b & 1) ? B() : z();if (0 > a.a) {
      if (0 > b.a) {
        _x = C(a);
        _x2 = C(b);
        _again = true;
        continue _function;
      } else {
        return C(M(C(a), b));
      }
    }if (0 > b.a) return C(M(a, C(b)));if (0 > O(a, H()) && 0 > O(b, H())) return y((a.a * D + N(a)) * (b.a * D + N(b)));var c = a.a >>> 16,
        d = a.a & 65535,
        e = a.b >>> 16;a = a.b & 65535;var f = b.a >>> 16,
        g = b.a & 65535,
        h = b.b >>> 16;b = b.b & 65535;var p, n, v, t;t = 0 + a * b;v = 0 + (t >>> 16) + e * b;n = 0 + (v >>> 16);v = (v & 65535) + a * h;n += v >>> 16;n += d * b;p = 0 + (n >>> 16);n = (n & 65535) + e * h;p += n >>> 16;n = (n & 65535) + a * g;p = p + (n >>> 16) + (c * b + d * h + e * g + a * f) & 65535;return new u((v & 65535) << 16 | t & 65535, p << 16 | n & 65535);
  }
}
function K(_x3, _x4) {
  var _again2 = true;

  _function2: while (_again2) {
    var a = _x3,
        b = _x4;
    _again2 = false;
    if (I(b)) throw Error("division by zero");if (I(a)) return z();if (J(a, B())) {
      if (J(b, F()) || J(b, G())) return B();if (J(b, B())) return F();var c;c = 1;if (0 == c) c = a;else {
        var d = a.a;c = 32 > c ? new u(a.b >>> c | d << 32 - c, d >> c) : new u(d >> c - 32, 0 <= d ? 0 : -1);
      }c = K(c, b);d = 1;if (0 != d) {
        var e = c.b;c = 32 > d ? new u(e << d, c.a << d | e >>> 32 - d) : new u(0, e << d - 32);
      }if (J(c, z())) return 0 > b.a ? F() : G();a = L(a, C(M(b, c)));return L(c, K(a, b));
    }if (J(b, B())) return z();if (0 > a.a) {
      if (0 > b.a) {
        _x3 = C(a);
        _x4 = C(b);
        _again2 = true;
        c = d = e = undefined;
        continue _function2;
      } else {
        return C(K(C(a), b));
      }
    }if (0 > b.a) return C(K(a, C(b)));for (d = z(); 0 <= O(a, b);) {
      c = Math.max(1, Math.floor((a.a * D + N(a)) / (b.a * D + N(b))));for (var e = Math.ceil(Math.log(c) / Math.LN2), e = 48 >= e ? 1 : Math.pow(2, e - 48), f = y(c), g = M(f, b); 0 > g.a || 0 < O(g, a);) c -= e, f = y(c), g = M(f, b);I(f) && (f = F());d = L(d, f);a = L(a, C(g));
    }return d;
  }
}var ha = 1,
    ia = 2,
    ea = 3,
    fa = 4,
    ga = 5,
    ja = 6;function P(a, b) {
  this.g = 128;this.h = void 0 !== k.Uint8Array ? new Uint8Array(128) : Array(128);this.j = this.f = 0;this.c = [];this.l = a;this.s = [];this.o = Q(b);this.i = !1;this.j = this.f = 0;a = this.o;b = a.length;if (0 < b) {
    for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];a = c;
  } else a = [];this.c = a;this.i = !1;
}m(P, ba);for (var R = [], S = 0; 127 > S; S++) R[S] = 0;var T = (function (a) {
  return Array.prototype.concat.apply(Array.prototype, arguments);
})([128], R);
function U(a, b, c) {
  c = void 0 !== c ? c : b.length;if (a.i) throw Error("this hasher needs to be reset");var d = a.f;if ("string" == typeof b) for (var e = 0; e < c; e++) {
    var f = b.charCodeAt(e);if (255 < f) throw Error("Characters must be in range [0,255]");a.h[d++] = f;d == a.g && (V(a), d = 0);
  } else if ((e = aa(b), "array" == e || "object" == e && "number" == typeof b.length)) for (e = 0; e < c; e++) {
    f = b[e];if ("number" != typeof f || 0 > f || 255 < f || f != (f | 0)) throw Error("message must be a byte array");a.h[d++] = f;d == a.g && (V(a), d = 0);
  } else throw Error("message must be string or array");
  a.f = d;a.j += c;
}
function V(a) {
  for (var b = a.h, c = a.s, d = 0; 16 > d; d++) {
    var e = 8 * d;c[d] = new u(b[e + 4] << 24 | b[e + 5] << 16 | b[e + 6] << 8 | b[e + 7], b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3]);
  }for (d = 16; 80 > d; d++) {
    var e = c[d - 15],
        b = e.b,
        e = e.a,
        f = c[d - 2],
        g = f.b,
        f = f.a;c[d] = a.m(c[d - 16], c[d - 7], new u(b >>> 1 ^ e << 31 ^ b >>> 8 ^ e << 24 ^ b >>> 7 ^ e << 25, e >>> 1 ^ b << 31 ^ e >>> 8 ^ b << 24 ^ e >>> 7), new u(g >>> 19 ^ f << 13 ^ f >>> 29 ^ g << 3 ^ g >>> 6 ^ f << 26, f >>> 19 ^ g << 13 ^ g >>> 29 ^ f << 3 ^ f >>> 6));
  }for (var b = a.c[0], e = a.c[1], g = a.c[2], f = a.c[3], h = a.c[4], p = a.c[5], n = a.c[6], v = a.c[7], d = 0; 80 > d; d++) var t = b.b, q = b.a, t = L(new u(t >>> 28 ^ q << 4 ^ q >>> 2 ^ t << 30 ^ q >>> 7 ^ t << 25, q >>> 28 ^ t << 4 ^ t >>> 2 ^ q << 30 ^ t >>> 7 ^ q << 25), new u(b.b & e.b | e.b & g.b | b.b & g.b, b.a & e.a | e.a & g.a | b.a & g.a)), q = h.b, E = h.a, Y = h.b, Z = h.a, q = a.m(v, new u(q >>> 14 ^ E << 18 ^ q >>> 18 ^ E << 14 ^ E >>> 9 ^ q << 23, E >>> 14 ^ q << 18 ^ E >>> 18 ^ q << 14 ^ q >>> 9 ^ E << 23), new u(Y & p.b | ~Y & n.b, Z & p.a | ~Z & n.a), ka[d], c[d]), v = n, n = p, p = h, h = L(f, q), f = g, g = e, e = b, b = L(q, t);a.c[0] = L(a.c[0], b);a.c[1] = L(a.c[1], e);a.c[2] = L(a.c[2], g);a.c[3] = L(a.c[3], f);a.c[4] = L(a.c[4], h);a.c[5] = L(a.c[5], p);a.c[6] = L(a.c[6], n);a.c[7] = L(a.c[7], v);
}
P.prototype.m = function (a, b, c) {
  for (var d = (a.b ^ 2147483648) + (b.b ^ 2147483648), e = a.a + b.a, f = arguments.length - 1; 2 <= f; --f) d += arguments[f].b ^ 2147483648, e += arguments[f].a;arguments.length & 1 && (d += 2147483648);e += arguments.length >> 1;e += Math.floor(d / 4294967296);return new u(d, e);
};function Q(a) {
  for (var b = [], c = 0; c < a.length; c += 2) b.push(new u(a[c + 1], a[c]));return b;
}
var ka = Q([1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591]);function la() {
  P.call(this, 6, ma);
}m(la, P);var ma = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];var W = null,
    X = null;l("ampBase64", function (a) {
  if (!W) {
    W = {};X = {};for (var b = 0; 65 > b; b++) W[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b), X[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(b);
  }for (var b = X, c = [], d = 0; d < a.length; d += 3) {
    var e = a[d],
        f = d + 1 < a.length,
        g = f ? a[d + 1] : 0,
        h = d + 2 < a.length,
        p = h ? a[d + 2] : 0,
        n = e >> 2,
        e = (e & 3) << 4 | g >> 4,
        g = (g & 15) << 2 | p >> 6,
        p = p & 63;h || (p = 64, f || (g = 64));c.push(b[n], b[e], b[g], b[p]);
  }return c.join("");
});
l("ampSha384Digest", function (a) {
  var b = new la();U(b, a);if (b.i) throw Error("this hasher needs to be reset");var c = 8 * b.j;112 > b.f ? U(b, T, 112 - b.f) : U(b, T, b.g - b.f + 112);for (a = 127; 112 <= a; a--) b.h[a] = c & 255, c /= 256;V(b);var c = 0,
      d = Array(8 * b.l);for (a = 0; a < b.l; a++) {
    for (var e = b.c[a], f = e.a, e = e.b, g = 24; 0 <= g; g -= 8) d[c++] = f >> g & 255;for (g = 24; 0 <= g; g -= 8) d[c++] = e >> g & 255;
  }b.i = !0;return d;
});;
function base64(input) {
  return ampBase64(input);
}

;
function sha384(input) {
  return ampSha384Digest(input);
}

;

},{}],43:[function(require,module,exports){
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
//# sourceMappingURL=amp-analytics-0.1.max.js.map