(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
exports.__esModule = true;
exports.rtvVersion = rtvVersion;
exports.urlWithVersion = urlWithVersion;
exports.isCdnJsFile = isCdnJsFile;
exports.isBlacklisted = isBlacklisted;
exports.fetchAndCache = fetchAndCache;
exports.getCachedVersion = getCachedVersion;
exports.handleFetch = handleFetch;
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

require('../../third_party/babel/custom-babel-helpers');

var _config = require('../config');

/**
 * An AMP Release version, not to be confused with an RTV version
 * @typedef {string}
 */
var AmpVersion = undefined;

exports.AmpVersion = AmpVersion;
/**
 * An RTV version, not to be confused with an AMP Release version.
 * @typedef {string}
 */
var RtvVersion = undefined;

exports.RtvVersion = RtvVersion;
/** @const */
var TAG = 'cache-service-worker';

/**
 * A list of blacklisted AMP versions that must never be served from
 * cache. Versions may be blacklisted if they contain a significant
 * implementation bug.
 * @type {!Array<AmpVersion>}
 */
var BLACKLIST = self.AMP_CONFIG[TAG + '-blacklist'] || [];

/**
 * The SW's current version.
 * @const
 * @type {RtvVersion}
 */
var BASE_RTV_VERSION = self.AMP_CONFIG.v;

/**
 * A regex that matches every CDN JS URL we care to cache.
 * The "experiments" JS is explicitly disallowed.
 *
 * The RTV will be the first capture group, if it is present.
 * The pathname will be the second capture group.
 *
 * Matched URLS include:
 *  - https://cdn.ampproject.org/v0.js
 *  - https://cdn.ampproject.org/v0/amp-comp.js
 *  - https://cdn.ampproject.org/rtv/123456789012345/v0.js
 *  - https://cdn.ampproject.org/rtv/123456789012345/v0/amp-comp.js
 *
 * Unmatched URLS include:
 *  - https://cdn.ampproject.org/v0/experiments.js
 */
var CDN_JS_REGEX = new RegExp(
// Require the CDN URL origin at the beginning.
'^' + _config.urls.cdn.replace(/\./g, '\\.') +
// Allow, but don't require, RTV.
'(?:/rtv/(\\d{2}\\d{13,}))?' +
// Require text "/v0"
'(/v0' +
// Allow, but don't require, an extension under the v0 directory.
// We explicitly forbid the `experiments` "extension".
'(?:/(?!experiments).+)?' +
// Require text ".js" at the end.
'\\.js)$');

/**
 * Returns the version of a given versioned JS file.
 *
 * @param {string} url
 * @return {RtvVersion}
 * @visibleForTesting
 */

function rtvVersion(url) {
  // RTVs are 2 digit prefixes followed by the timestamp of the release.
  var match = CDN_JS_REGEX.exec(url);
  return match && match[1] || '';
}

/**
 * Returns the pathname of a url, used to key a url (since
 * our JS filenames are unique).
 *
 * @param {string} url
 * @return {string}
 */
function pathname(url) {
  var match = CDN_JS_REGEX.exec(url);
  return match ? match[2] : '';
}

/**
 * Returns the url with the requested version changed to `version`.
 *
 * @param {string} url
 * @param {RtvVersion} version
 * @return {string}
 * @visibleForTesting
 */

function urlWithVersion(url, version) {
  var currentVersion = rtvVersion(url);
  if (currentVersion) {
    return url.replace(currentVersion, version);
  }
  var location = new URL(url);
  location.pathname = '/rtv/' + version + location.pathname;
  return location.href;
}

/**
 * Normalizes the request to a new RTV version. This handles changing the
 * request from one version to another, or rewriting an unversioned request to
 * a versioned.
 *
 * @param {!Request} request
 * @param {RtvVersion} version
 * @return {!Request}
 */
function normalizedRequest(request, version) {
  var url = request.url;
  if (rtvVersion(url) === version) {
    return request;
  }

  return new Request(urlWithVersion(url, version), request);
}

/**
 * Determines if a url is a request to a CDN JS file.
 * @param {string} url
 * @return {boolean}
 * @visibleForTesting
 */

function isCdnJsFile(url) {
  return CDN_JS_REGEX.test(url);
}

/**
 * Determines if a AMP version is blacklisted.
 * @param {RtvVersion} version
 * @return {boolean}
 * @visibleForTesting
 */

function isBlacklisted(version) {
  /**
   * Trim the RTV perfix.
   * @type {AmpVersion}
   */
  var ampVersion = version.substr(2);
  return BLACKLIST.indexOf(ampVersion) > -1;
}

/**
 * A mapping from a Client's (unique per tab _and_ refresh) ID to the AMP
 * release version we are serving it.
 *
 * @type {!Object<string, RtvVersion>}
 */
var clientsMap = Object.create(null);

/**
 * Our cache of CDN JS files.
 *
 * @type {!Cache}
 */
var cache = undefined;

/**
 * A promise to open up our CDN JS cache, which will be resolved before any
 * requests are intercepted by the SW.
 *
 * @type {!Promise}
 */
var cachePromise = self.caches.open('cdn-js').then(function (result) {
  exports.cache = exports.cache = cache = result;
});

/**
 * Fetches the request, and stores it in the cache. Since we only store one
 * version of each file, we'll prune all older versions after we cache this.
 *
 * @param {!Cache} cache
 * @param {!Request} request
 * @param {string} requestPath the pathname of the request
 * @param {RtvVersion} requestVersion the version of the request
 * @return {!Promise<!Response>}
 * @visibleForTesting
 */

function fetchAndCache(cache, request, requestPath, requestVersion) {
  // TODO(jridgewell): we should also fetch this requestVersion for all files
  // we know about.
  return fetch(request).then(function (response) {
    // Did we receive a valid response (200 <= status < 300)?
    if (response && response.ok) {
      // You must clone to prevent double reading the body.
      cache.put(request, response.clone());

      // Prune old versions of this file from the cache.
      // This intentionally does not block the request resolution to speed
      // things up. This is likely fine since you don't have multiple
      // `<script>`s with the same `src` on a page.
      cache.keys().then(function (requests) {
        for (var i = 0; i < requests.length; i++) {
          var _request = requests[i];
          var url = _request.url;
          if (requestPath !== pathname(url)) {
            continue;
          }
          if (requestVersion === rtvVersion(url)) {
            continue;
          }

          cache['delete'](_request);
        }
      });
    }

    return response;
  });
}

/**
 * Gets the version we have cached for this file. It's either:
 *  - The requestVersion, meaning we have this explicit version cached.
 *  - Some older version
 *  - An empty string, meaning we have nothing cached for this file.
 *
 * @param {!Cache} cache
 * @param {string} requestPath
 * @return {!Promise<RtvVersion>}
 * @visibleForTesting
 */

function getCachedVersion(cache, requestPath) {
  // TODO(jridgewell): We should make this a bit smarter, so that it selects
  // the version that has a lot of matches, not just this request file.
  return cache.keys().then(function (requests) {
    for (var i = 0; i < requests.length; i++) {
      var url = requests[i].url;
      if (requestPath === pathname(url)) {
        return rtvVersion(url);
      }
    }

    return '';
  });
}

/**
 * Handles fetching the request from Cache, or fetching and caching from the
 * Cache CDN, if we care about the request.
 * My assumptions:
 *   - Doc requests one uniform AMP release version for all files, anything
 *     else is malarkey.
 *   - The requested version is always the newest AMP version.
 *
 * @param {!Request} request
 * @param {string|undefined} maybeClientId
 * @return {?Promise<!Response>}
 * @visibleForTesting
 */

function handleFetch(request, maybeClientId) {
  var url = request.url;

  // We only cache CDN JS files, and we need a clientId to do our magic.
  if (!maybeClientId || !isCdnJsFile(url)) {
    return null;
  }

  // Closure Compiler!
  var clientId = /** @type {string} */maybeClientId;

  var requestPath = pathname(url);
  var requestVersion = rtvVersion(url) || BASE_RTV_VERSION;
  // Rewrite unversioned requests to the versioned RTV URL. This is a noop if
  // it's already versioned.
  request = normalizedRequest(request, requestVersion);

  // Wait for the cachePromise to resolve. This is necessary
  // since the SW thread may be killed and restarted at any time.
  return cachePromise.then(function () {
    // If we already registered this client, we must always use the same
    // version.
    if (clientsMap[clientId]) {
      return clientsMap[clientId];
    }

    // If not, do we have this version cached?
    return getCachedVersion(cache, requestPath).then(function (version) {
      // We have a cached version! Serve it up!
      if (version && !isBlacklisted(version)) {
        return version;
      }

      // Tears! We have nothing cached, so we'll have to make a request.
      return requestVersion;
    }).then(function (version) {
      // Determining the version to serve is racey, since there are parallel
      // requests coming in for all the CDN JS files. If one of them "won"
      // the race, respect the winner.
      if (clientsMap[clientId]) {
        return clientsMap[clientId];
      }

      clientsMap[clientId] = version;
      return version;
    });
  }).then(function (version) {
    var versionedRequest = normalizedRequest(request, version);

    return cache.match(versionedRequest).then(function (response) {
      // Cache hit!
      if (response) {
        // Now, was it because we served an old cached version or because
        // they requested this exact version; If we served an old version,
        // let's get the new one.
        if (version !== requestVersion && requestVersion == BASE_RTV_VERSION) {
          fetchAndCache(cache, request, requestPath, requestVersion);
        }

        return response;
      }

      // If not, let's fetch and cache the request.
      return fetchAndCache(cache, versionedRequest, requestPath, version);
    });
  });
}

self.addEventListener('install', function (install) {
  install.waitUntil(cachePromise);
  // Registers the SW for Foreign Fetch events, if they are supported.
  if (install.registerForeignFetch) {
    install.registerForeignFetch({
      scopes: [/** @type {!ServiceWorkerGlobalScope} */self.registration.scope],
      origins: ['*']
    });
  }
});

// Setup the Fetch listener, for when the client is on the CDN origin.
self.addEventListener('fetch', function (event) {
  var response = handleFetch(event.request, event.clientId);

  // We only get a response promise back if it's a request we care to cache.
  if (!response) {
    return;
  }

  event.respondWith(response);
});

// Setup the Foreign Fetch listener, for when the client is on a Publisher
// origin.
self.addEventListener('foreignfetch', function (event) {
  var response = handleFetch(event.request, event.clientId);

  // We only get a response promise back if it's a request we care to cache.
  if (!response) {
    return;
  }

  event.respondWith(response.then(function (resp) {
    // Foreign Fetch requires a { response: !Response } object.
    return {
      response: resp,
      // This allows CORS requests, if one were to come in.
      origin: event.origin
    };
  }));
});

},{"../../third_party/babel/custom-babel-helpers":3,"../config":1}],3:[function(require,module,exports){
(function (global){
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  };

  babelHelpers.get = function get(_x, _x2, _x3) {
    var _again = true;

    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;

      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    obj[key] = value;
  };
})(typeof global === "undefined" ? self : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[2])

//# sourceMappingURL=cache-service-worker-0.1.max.js.map