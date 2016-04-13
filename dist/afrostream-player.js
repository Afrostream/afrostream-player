(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":29}],2:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ManifestHelper = require('./ManifestHelper');

var _ManifestHelper2 = _interopRequireDefault(_ManifestHelper);

var _MediaMap = require('./MediaMap');

var _MediaMap2 = _interopRequireDefault(_MediaMap);

var _SegmentView = require('./SegmentView');

var _SegmentView2 = _interopRequireDefault(_SegmentView);

var _SRFragmentLoader = require('./SRFragmentLoader');

var _SRFragmentLoader2 = _interopRequireDefault(_SRFragmentLoader);

var _PlayerInterface = require('./PlayerInterface');

var _PlayerInterface2 = _interopRequireDefault(_PlayerInterface);

var DashjsWrapper = (function () {
    function DashjsWrapper(player, videoElement, p2pConfig, liveDelay) {
        _classCallCheck(this, DashjsWrapper);

        this._player = player;
        this._videoElement = videoElement;
        this._p2pConfig = p2pConfig;
        this._liveDelay = liveDelay;

        this._player.setLiveDelay(liveDelay);

        this._player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, this._onManifestLoaded, this);
    }

    _createClass(DashjsWrapper, [{
        key: '_onManifestLoaded',
        value: function _onManifestLoaded(_ref) {
            var data = _ref.data;

            if (!data) {
                return; // event fires twice when manifest is changed, first time the data is null
            }

            //TODO: we don't know if this event may fire on live streams with same manifest url. if it doesn't, we should remove this check
            if (this._manifest && data.url === this._manifest.url) {
                return;
            }

            this._manifest = data;

            if (window.streamrootDownloader) {
                window.streamrootDownloader.dispose();
            }

            var manifestHelper = new _ManifestHelper2['default'](this._player, this._manifest);
            var playerInterface = new _PlayerInterface2['default'](this._player, manifestHelper, this._liveDelay);
            var mediaMap = new _MediaMap2['default'](manifestHelper);

            // TODO: Remove this global definition
            window.streamrootDownloader = new window.Streamroot.Downloader(playerInterface, this._manifest.url, mediaMap, this._p2pConfig, _SegmentView2['default'], this._videoElement);

            this._player.extend("FragmentLoader", _SRFragmentLoader2['default'], true);
        }
    }]);

    return DashjsWrapper;
})();

exports['default'] = DashjsWrapper;
module.exports = exports['default'];

},{"./ManifestHelper":4,"./MediaMap":5,"./PlayerInterface":6,"./SRFragmentLoader":7,"./SegmentView":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _TrackView = require('./TrackView');

var _TrackView2 = _interopRequireDefault(_TrackView);

var _node_modulesDashjsSrcDashUtilsSegmentsGetter = require('../node_modules/dashjs/src/dash/utils/SegmentsGetter');

var _node_modulesDashjsSrcDashUtilsSegmentsGetter2 = _interopRequireDefault(_node_modulesDashjsSrcDashUtilsSegmentsGetter);

var _SegmentsCache = require('./SegmentsCache');

var _SegmentsCache2 = _interopRequireDefault(_SegmentsCache);

var ManifestHelper = (function () {
    function ManifestHelper(player, manifest) {
        _classCallCheck(this, ManifestHelper);

        this._player = player;
        this._manifest = manifest;
        this._segmentsCache = new _SegmentsCache2['default'](player);

        var getConfig = undefined,
            getContext = undefined,
            getDashManifestModel = undefined,
            getTimelineConverter = undefined;

        function StreamSR(config) {

            var factory = this.factory,
                context = this.context;

            getConfig = function () {
                return config;
            };

            getContext = function () {
                return context;
            };

            getDashManifestModel = function () {
                return factory.getSingletonInstance(context, "DashManifestModel");
            };

            getTimelineConverter = function () {
                return config.timelineConverter;
            };
        }

        player.extend("Stream", StreamSR, true);

        this._getDashManifestModel = function () {
            return getDashManifestModel ? getDashManifestModel() : undefined;
        };

        this._getTimelineConverter = function () {
            return getTimelineConverter ? getTimelineConverter() : undefined;
        };

        this._getConfig = function () {
            return getConfig();
        };

        this._getContext = function () {
            return getContext();
        };

        this._getSegmentsGetter = function () {
            if (!this._segmentsGetter) {
                var context = this._getContext();
                var config = this._getConfig();

                this._segmentsGetter = (0, _node_modulesDashjsSrcDashUtilsSegmentsGetter2['default'])(context).create(config, this.isLive());
            }

            return this._segmentsGetter;
        };
    }

    _createClass(ManifestHelper, [{
        key: 'getSegmentList',
        value: function getSegmentList(trackView) {

            if (this._segmentsCache.hasSegments(trackView)) {
                return this._segmentsCache.getSegments(trackView);
            }

            var dashManifestModel = this._getDashManifestModel(),
                timelineConverter = this._getTimelineConverter();

            if (!dashManifestModel || !timelineConverter) throw new Error("Tried to get representation before we could have access to dash.js manifest internals");

            var mpd = dashManifestModel.getMpd(this._manifest);
            var period = dashManifestModel.getRegularPeriods(this._manifest, mpd)[trackView.periodId];
            var adaptation = dashManifestModel.getAdaptationsForPeriod(this._manifest, period)[trackView.adaptationSetId];
            var representation = dashManifestModel.getRepresentationsForAdaptation(this._manifest, adaptation)[trackView.representationId];
            var isDynamic = this.isLive();

            representation.segmentAvailabilityRange = timelineConverter.calcSegmentAvailabilityRange(representation, isDynamic);
            var segments = this._getSegmentsGetter().getSegments(representation, 0, 0, undefined, 1000000);

            return segments;
        }
    }, {
        key: 'isLive',
        value: function isLive() {
            var dashManifestModel = this._getDashManifestModel();

            if (!dashManifestModel) throw new Error("Tried to get representation before we could have access to dash.js manifest internals");

            return dashManifestModel.getIsDynamic(this._manifest);
        }
    }, {
        key: 'getCurrentTracks',
        value: function getCurrentTracks() {
            var tracks = {};
            var _arr = ["audio", "video"];
            for (var _i = 0; _i < _arr.length; _i++) {
                var type = _arr[_i];
                var tracksForType = this._player.getTracksFor(type);
                if (tracksForType && tracksForType.length > 0) {
                    var currentTrack = this._player.getCurrentTrackFor(type);
                    var quality = this._player.getQualityFor(type);
                    tracks[type] = new _TrackView2['default']({
                        periodId: currentTrack.streamInfo.index,
                        adaptationSetId: currentTrack.index,
                        representationId: quality
                    });
                }
            }
            return tracks;
        }
    }, {
        key: 'getAllTracks',
        value: function getAllTracks() {
            var tracks = {};

            var periods = this._player.getStreamsFromManifest(this._manifest);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = periods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var period = _step.value;
                    var _arr2 = ["audio", "video"];

                    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
                        var type = _arr2[_i2];

                        tracks[type] = [];

                        var adaptationSets = this._player.getTracksForTypeFromManifest(type, this._manifest, period);
                        if (!adaptationSets) {
                            continue;
                        }

                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = adaptationSets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var adaptationSet = _step2.value;

                                for (var i = 0; i < adaptationSet.representationCount; i++) {
                                    tracks[type].push(new _TrackView2['default']({
                                        periodId: period.index,
                                        adaptationSetId: adaptationSet.index,
                                        representationId: i
                                    }));
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return tracks;
        }
    }]);

    return ManifestHelper;
})();

exports['default'] = ManifestHelper;
module.exports = exports['default'];

},{"../node_modules/dashjs/src/dash/utils/SegmentsGetter":17,"./SegmentsCache":9,"./TrackView":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _SegmentView = require('./SegmentView');

var _SegmentView2 = _interopRequireDefault(_SegmentView);

var _TrackView = require('./TrackView');

var _TrackView2 = _interopRequireDefault(_TrackView);

var MediaMap = (function () {
    function MediaMap(manifestHelper) {
        _classCallCheck(this, MediaMap);

        this._manifestHelper = manifestHelper;
    }

    /**
     *
     * @returns boolean
     */

    _createClass(MediaMap, [{
        key: 'isLive',
        value: function isLive() {
            return this._manifestHelper.isLive();
        }

        /**
        * @param segmentView {SegmentView}
        * @returns number   (:warning: time must be in second if we want the debug tool (buffer display) to work properly)
        */
    }, {
        key: 'getSegmentTime',
        value: function getSegmentTime(segmentView) {
            return segmentView.segmentId / 10; //TODO: should not it be a static method of SegmentView?
        }

        /**
        * @param trackView {TrackView}
        * @param beginTime {number}
        * @param duration {number}
        * @returns [SegmentView]
        */

    }, {
        key: 'getSegmentList',
        value: function getSegmentList(trackView, beginTime, duration) {

            var dashjsSegmentList = this._manifestHelper.getSegmentList(trackView);

            var segmentList = [],
                segmentView = undefined;

            if (dashjsSegmentList === undefined) {
                return segmentList;
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = dashjsSegmentList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var segment = _step.value;

                    var startTime = segment.mediaStartTime || segment.startTime;
                    if (segment.timescale) {
                        startTime = startTime / segment.timescale;
                    }

                    if (beginTime <= startTime && startTime <= beginTime + duration) {
                        segmentView = new _SegmentView2['default']({
                            trackView: trackView,
                            segmentId: Math.round(startTime * 10) //TODO: make this static method of SegmentView
                        });
                        segmentList.push(segmentView);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return segmentList;
        }
    }, {
        key: 'getNextSegmentView',
        value: function getNextSegmentView(segmentView) {
            var beginTime = this.getSegmentTime(segmentView) + 0.2;
            // +0.2 will give us a beginTime just after the beginning of the segmentView, so we know it won't be included in the following getSegmentList (condition includes beginTime <= segment.mediaStartTime)

            var segmentList = this.getSegmentList(segmentView.trackView, beginTime, 30);
            return segmentList.length ? segmentList[0] : null;
        }
    }, {
        key: 'getTracksList',
        value: function getTracksList() {
            var tracks = this._manifestHelper.getAllTracks(),
                trackArray = [];

            // Kind of sucks that we don't expect the same format than in onTrackChange
            var _arr = ["audio", "video"];
            for (var _i = 0; _i < _arr.length; _i++) {
                var type = _arr[_i];
                if (tracks[type]) {
                    trackArray.push.apply(trackArray, _toConsumableArray(tracks[type]));
                }
            }

            return trackArray;
        }
    }]);

    return MediaMap;
})();

exports['default'] = MediaMap;
module.exports = exports['default'];

},{"./SegmentView":8,"./TrackView":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _TrackView = require('./TrackView');

var _TrackView2 = _interopRequireDefault(_TrackView);

var PlayerInterface = (function () {
    function PlayerInterface(player, manifestHelper, liveDelay) {
        _classCallCheck(this, PlayerInterface);

        this._player = player;
        this._manifestHelper = manifestHelper;
        this._liveDelay = liveDelay;

        this.MIN_BUFFER_LEVEL = 10;

        this._listeners = new Map();

        this._onStreamInitialized = this._dispatchInitialOnTrackChange.bind(this);
        this._player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, this._onStreamInitialized);
    }

    _createClass(PlayerInterface, [{
        key: "isLive",
        value: function isLive() {
            return this._manifestHelper.isLive();
        }
    }, {
        key: "getBufferLevelMax",
        value: function getBufferLevelMax() {
            return Math.max(0, this._liveDelay - this.MIN_BUFFER_LEVEL);
        }
    }, {
        key: "setBufferMarginLive",
        value: function setBufferMarginLive(bufferLevel) {
            this._player.setStableBufferTime(this.MIN_BUFFER_LEVEL + bufferLevel);
            this._player.setBufferTimeAtTopQuality(this.MIN_BUFFER_LEVEL + bufferLevel);
            this._player.setBufferTimeAtTopQualityLongForm(this.MIN_BUFFER_LEVEL + bufferLevel); // TODO: can live be "long form" ?
        }
    }, {
        key: "addEventListener",
        value: function addEventListener(eventName, observer) {
            if (eventName !== "onTrackChange") {
                console.error("Tried to listen to an event that wasn't onTrackChange");
                return; // IMPORTANT: we need to return to avoid errors in _dispatchInitialOnTrackChange
            }

            var onTrackChangeListener = this._createOnTrackChangeListener(observer);
            this._listeners.set(observer, onTrackChangeListener);

            this._player.on('qualityChanged', onTrackChangeListener); //TODO: hardcoded event name. Get it from enum
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(eventName, observer) {
            if (eventName !== "onTrackChange") {
                console.error("Tried to remove listener for an event that wasn't onTrackChange");
                return;
            }

            var onTrackChangeListener = this._listeners.get(observer);

            this._player.off('qualityChanged', onTrackChangeListener); //TODO: hardcoded event name. Get it from enum

            this._listeners["delete"](observer);
        }
    }, {
        key: "_createOnTrackChangeListener",
        value: function _createOnTrackChangeListener(observer) {
            var player = this._player;

            return function (_ref) {
                var mediaType = _ref.mediaType;
                var streamInfo = _ref.streamInfo;
                var oldQuality = _ref.oldQuality;
                var newQuality = _ref.newQuality;

                var tracks = {};
                tracks[mediaType] = new _TrackView2["default"]({
                    periodId: streamInfo.index,
                    adaptationSetId: player.getCurrentTrackFor(mediaType).index,
                    representationId: Number(newQuality)
                });

                observer(tracks);
            };
        }
    }, {
        key: "_dispatchInitialOnTrackChange",
        value: function _dispatchInitialOnTrackChange() {
            var tracks = this._manifestHelper.getCurrentTracks();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _toArray(_step.value);

                    var observer = _step$value[0];

                    var rest = _step$value.slice(1);

                    observer(tracks);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return PlayerInterface;
})();

exports["default"] = PlayerInterface;
module.exports = exports["default"];

},{"./TrackView":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _node_modulesDashjsSrcCoreEventBusJs = require('../node_modules/dashjs/src/core/EventBus.js');

var _node_modulesDashjsSrcCoreEventBusJs2 = _interopRequireDefault(_node_modulesDashjsSrcCoreEventBusJs);

var _node_modulesDashjsSrcCoreEventsEventsJs = require('../node_modules/dashjs/src/core/events/Events.js');

var _node_modulesDashjsSrcCoreEventsEventsJs2 = _interopRequireDefault(_node_modulesDashjsSrcCoreEventsEventsJs);

var _SegmentView = require('./SegmentView');

var _SegmentView2 = _interopRequireDefault(_SegmentView);

var _TrackView = require('./TrackView');

var _TrackView2 = _interopRequireDefault(_TrackView);

var FRAGMENT_LOADER_ERROR_LOADING_FAILURE = 1;
var FRAGMENT_LOADER_ERROR_NULL_REQUEST = 2;
var FRAGMENT_LOADER_MESSAGE_NULL_REQUEST = 'request is null';

function SRFragmentLoader(config) {
    var context = this.context;
    var factory = this.factory;
    var parent = this.parent;
    var eventBus = factory.getSingletonInstance(context, "EventBus");

    var requestModifier = config.requestModifier;
    var metricsModel = config.metricsModel;

    var instance = undefined,
        srLoader = undefined,
        _abort = undefined;

    function setup() {
        if (!window.streamrootDownloader) {
            throw new Error("streamrootDownloader is not defined");
        }

        srLoader = window.streamrootDownloader;
    }

    function _getSegmentViewForRequest(request) {
        if (request.type !== "InitializationSegment") {
            var trackView = new _TrackView2['default']({
                periodId: request.mediaInfo.streamInfo.index,
                adaptationSetId: request.mediaInfo.index,
                representationId: request.quality
            });

            return new _SegmentView2['default']({
                trackView: trackView,
                segmentId: Math.round(request.startTime * 10) //TODO: extract this to SegmentView static method
            });
        }

        return null;
    }

    function _getHeadersForRequest(request) {
        var headers = [];
        if (request.range) {
            headers.push(["Range", 'bytes=' + request.range]);
        }

        return headers;
    }

    function _getSRRequest(request, headers) {
        return {
            url: requestModifier.modifyRequestURL(request.url),
            headers: headers
        };
    }

    function load(request) {

        if (!request) {
            eventBus.trigger(_node_modulesDashjsSrcCoreEventsEventsJs2['default'].LOADING_COMPLETED, {
                request: undefined,
                error: new Error(FRAGMENT_LOADER_ERROR_NULL_REQUEST, FRAGMENT_LOADER_MESSAGE_NULL_REQUEST)
            });

            return;
        }

        var headers = _getHeadersForRequest(request);
        var segmentView = _getSegmentViewForRequest(request);
        var srRequest = _getSRRequest(request, headers);

        var requestStartDate = new Date();
        var lastTraceDate = requestStartDate;
        var isFirstProgress = true;
        var traces = [];
        var lastTraceReceivedCount = 0;

        var sendHttpRequestMetric = function sendHttpRequestMetric(isSuccess, responseCode) {

            request.requestStartDate = requestStartDate;
            request.firstByteDate = request.firstByteDate || requestStartDate;
            request.requestEndDate = new Date();

            metricsModel.addHttpRequest(request.mediaType, //mediaType
            null, //tcpId
            request.type, //type
            request.url, //url
            null, //actualUrl
            request.serviceLocation || null, //serviceLocation
            request.range || null, //range
            request.requestStartDate, //tRequest
            request.firstByteDate, //tResponce
            request.requestEndDate, //tFinish
            responseCode, //responseCode
            request.duration, //mediaDuration
            null, //responseHeaders
            isSuccess ? traces : null //traces
            );
        };

        var onSuccess = function onSuccess(segmentData, stats) {

            sendHttpRequestMetric(true, 200);

            eventBus.trigger(_node_modulesDashjsSrcCoreEventsEventsJs2['default'].LOADING_COMPLETED, {
                request: request,
                response: segmentData,
                sender: parent
            });
        };

        var onProgress = function onProgress(stats) {

            var currentDate = new Date();

            if (isFirstProgress) {
                isFirstProgress = false;
                request.firstByteDate = currentDate;
            }

            var bytesReceived = 0;
            if (stats.cdnDownloaded) {
                bytesReceived += stats.cdnDownloaded;
            }
            if (stats.p2pDownloaded) {
                bytesReceived += stats.p2pDownloaded;
            }

            traces.push({
                s: lastTraceDate,
                d: currentDate.getTime() - lastTraceDate.getTime(),
                b: [bytesReceived ? bytesReceived - lastTraceReceivedCount : 0]
            });

            lastTraceDate = currentDate;
            lastTraceReceivedCount = bytesReceived;

            eventBus.trigger(_node_modulesDashjsSrcCoreEventsEventsJs2['default'].LOADING_PROGRESS, {
                request: request
            });
        };

        var onError = function onError(xhrEvent) {

            sendHttpRequestMetric(false, xhrEvent.target.status);

            eventBus.trigger(_node_modulesDashjsSrcCoreEventsEventsJs2['default'].LOADING_COMPLETED, {
                request: undefined,
                error: new Error(FRAGMENT_LOADER_ERROR_LOADING_FAILURE, "failed loading fragment")
            });
        };

        _abort = srLoader.getSegment(srRequest, {
            onSuccess: onSuccess,
            onProgress: onProgress,
            onError: onError
        }, segmentView);
    }

    function abort() {
        if (_abort) {
            _abort();
        }
    }

    function reset() {
        abort();
    }

    instance = {
        load: load,
        abort: abort,
        reset: reset
    };

    setup();

    return instance;
}

exports['default'] = SRFragmentLoader;
module.exports = exports['default'];

},{"../node_modules/dashjs/src/core/EventBus.js":11,"../node_modules/dashjs/src/core/events/Events.js":14,"./SegmentView":8,"./TrackView":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _TrackView = require('./TrackView');

var _TrackView2 = _interopRequireDefault(_TrackView);

var SegmentView = (function () {
  _createClass(SegmentView, null, [{
    key: 'fromArrayBuffer',

    /**
    * @param arrayBuffer {ArrayBuffer}
    * @returns {SegmentView}
    */
    value: function fromArrayBuffer(arrayBuffer) {
      var u32Data = new Uint32Array(arrayBuffer);

      var _u32Data = _slicedToArray(u32Data, 4);

      var periodId = _u32Data[0];
      var adaptationSetId = _u32Data[1];
      var representationId = _u32Data[2];
      var segmentId = _u32Data[3];

      return new SegmentView({
        trackView: new _TrackView2['default']({ periodId: periodId, adaptationSetId: adaptationSetId, representationId: representationId }),
        segmentId: segmentId
      });
    }

    /**
      * @param {Object} object
      */
  }]);

  function SegmentView(obj) {
    _classCallCheck(this, SegmentView);

    this.segmentId = obj.segmentId;
    this.trackView = new _TrackView2['default'](obj.trackView);
  }

  /**
    * Determines if a segment represent the same media chunk than another segment
    * @param segmentView {SegmentView}
    * @returns {boolean}
    */

  _createClass(SegmentView, [{
    key: 'isEqual',
    value: function isEqual(segmentView) {
      if (!segmentView) {
        return false;
      }
      var segmentId = segmentView.segmentId;
      var trackView = segmentView.trackView;

      return this.segmentId === segmentId && this.trackView.isEqual(trackView);
    }

    /**
      * @param trackView {TrackView}
      * @returns {boolean}
      */
  }, {
    key: 'isInTrack',
    value: function isInTrack(trackView) {
      return this.trackView.isEqual(trackView);
    }

    /**
      * @returns {String}
      */
  }, {
    key: 'viewToString',
    value: function viewToString() {
      return this.trackView.viewToString() + 'S' + this.segmentId;
    }

    /**
      * @returns {ArrayBuffer}
      */
  }, {
    key: 'toArrayBuffer',
    value: function toArrayBuffer() {
      return new Uint32Array([this.trackView.periodId, this.trackView.adaptationSetId, this.trackView.representationId, this.segmentId]).buffer;
    }
  }]);

  return SegmentView;
})();

exports['default'] = SegmentView;
module.exports = exports['default'];

},{"./TrackView":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _TrackView = require('./TrackView');

var _TrackView2 = _interopRequireDefault(_TrackView);

var SegmentsCache = (function () {
    function SegmentsCache(player) {
        _classCallCheck(this, SegmentsCache);

        this._player = player;
        this._player.on('segmentsLoaded', this._onSegmentsLoaded, this);

        //TODO: check if cache should be flushed on player's 'representationUpdated' event
        this._cache = {};
    }

    _createClass(SegmentsCache, [{
        key: '_onSegmentsLoaded',
        value: function _onSegmentsLoaded(event) {
            var segments = event.segments;
            var trackViewId = _TrackView2['default'].makeIDString(event.representation.adaptation.period.index, event.representation.adaptation.index, event.representation.index);

            this._cache[trackViewId] = segments;
        }
    }, {
        key: 'hasSegments',
        value: function hasSegments(trackView) {
            return this._cache[trackView.viewToString()] !== undefined;
        }
    }, {
        key: 'getSegments',
        value: function getSegments(trackView) {
            return this._cache[trackView.viewToString()];
        }
    }]);

    return SegmentsCache;
})();

exports['default'] = SegmentsCache;
module.exports = exports['default'];

},{"./TrackView":10}],10:[function(require,module,exports){
//jshint -W098
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackView = (function () {
  function TrackView(obj) {
    _classCallCheck(this, TrackView);

    this.periodId = obj.periodId;
    this.adaptationSetId = obj.adaptationSetId;
    this.representationId = obj.representationId;
  }

  _createClass(TrackView, [{
    key: "viewToString",

    /**
      * @returns {String}
      */
    value: function viewToString() {
      return TrackView.makeIDString(this.periodId, this.adaptationSetId, this.representationId);
    }

    /**
      * @param trackView {TrackView}
      * @returns {boolean}
      */
  }, {
    key: "isEqual",
    value: function isEqual(trackView) {
      return !!trackView && this.periodId === trackView.periodId && this.adaptationSetId === trackView.adaptationSetId && this.representationId === trackView.representationId;
    }
  }], [{
    key: "makeIDString",
    value: function makeIDString(periodId, adaptationSetId, representationId) {
      return "P" + periodId + "A" + adaptationSetId + "R" + representationId;
    }
  }]);

  return TrackView;
})();

exports["default"] = TrackView;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _FactoryMakerJs = require('./FactoryMaker.js');

var _FactoryMakerJs2 = _interopRequireDefault(_FactoryMakerJs);

function EventBus() {

    var instance = undefined;
    var handlers = {};

    function on(type, listener, scope) {
        if (!type) {
            throw new Error('event type cannot be null or undefined');
        }

        if (!listener || typeof listener !== 'function') {
            throw new Error('listener must be a function: ' + listener);
        }

        if (getHandlerIdx(type, listener, scope) >= 0) return;

        var handler = {
            callback: listener,
            scope: scope
        };

        handlers[type] = handlers[type] || [];
        handlers[type].push(handler);
    }

    function off(type, listener, scope) {
        if (!type || !listener || !handlers[type]) return;

        var idx = getHandlerIdx(type, listener, scope);

        if (idx < 0) return;

        handlers[type].splice(idx, 1);
    }

    function trigger(type, args) {
        if (!type || !handlers[type]) return;

        args = args || {};

        if (args.hasOwnProperty('type')) {
            throw new Error('\'type\' is a reserved word for event dispatching');
        }

        args.type = type;

        handlers[type].forEach(function (handler) {
            handler.callback.call(handler.scope, args);
        });
    }

    function reset() {
        handlers = {};
    }

    function getHandlerIdx(type, listener, scope) {
        var handlersForType = handlers[type];
        var result = -1;

        if (!handlersForType || handlersForType.length === 0) return result;

        for (var i = 0; i < handlersForType.length; i++) {
            if (handlersForType[i].callback === listener && (!scope || scope === handlersForType[i].scope)) return i;
        }

        return result;
    }

    instance = {
        on: on,
        off: off,
        trigger: trigger,
        reset: reset
    };

    return instance;
}

EventBus.__dashjs_factory_name = 'EventBus';
exports['default'] = _FactoryMakerJs2['default'].getSingletonFactory(EventBus);
module.exports = exports['default'];

},{"./FactoryMaker.js":12}],12:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @Module FactoryMaker
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FactoryMaker = (function () {

    var instance = undefined;
    var extensions = [];
    var singletonContexts = [];

    function extend(name, childInstance, override, context) {
        var extensionContext = getExtensionContext(context);
        if (!extensionContext[name] && childInstance) {
            extensionContext[name] = { instance: childInstance, override: override };
        }
    }

    /**
     * Use this method from your extended object.  this.factory is injected into your object.
     * this.factory.getSingletonInstance(this.context, 'VideoModel')
     * will return the video model for use in the extended object.
     *
     * @param context {Object} injected into extended object as this.context
     * @param className {String} string name found in all dash.js objects
     * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
     * @returns {*} Context aware instance of specified singleton name.
     * @memberof module:FactoryMaker
     * @instance
     */
    function getSingletonInstance(context, className) {
        for (var i in singletonContexts) {
            var obj = singletonContexts[i];
            if (obj.context === context && obj.name === className) {
                return obj.instance;
            }
        }
        return null;
    }

    /**
     * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
     *
     * @param context
     * @param className
     * @param instance
     * @memberof module:FactoryMaker
     * @instance
     */
    function setSingletonInstance(context, className, instance) {
        for (var i in singletonContexts) {
            var obj = singletonContexts[i];
            if (obj.context === context && obj.name === className) {
                singletonContexts[i].instance = instance;
                return;
            }
        }
        singletonContexts.push({ name: className, context: context, instance: instance });
    }

    function getClassFactory(classConstructor) {
        return function (context) {
            if (context === undefined) {
                context = {};
            }
            return {
                create: function create() {
                    return merge(classConstructor.__dashjs_factory_name, classConstructor.apply({ context: context }, arguments), context, arguments);
                }
            };
        };
    }

    function getSingletonFactory(classConstructor) {
        return function (context) {
            var instance = undefined;
            if (context === undefined) {
                context = {};
            }
            return {
                getInstance: function getInstance() {
                    // If we don't have an instance yet check for one on the context
                    if (!instance) {
                        instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
                    }
                    // If there's no instance on the context then create one
                    if (!instance) {
                        instance = merge(classConstructor.__dashjs_factory_name, classConstructor.apply({ context: context }, arguments), context, arguments);
                        singletonContexts.push({ name: classConstructor.__dashjs_factory_name, context: context, instance: instance });
                    }
                    return instance;
                }
            };
        };
    }

    function merge(name, classConstructor, context, args) {
        var extensionContext = getExtensionContext(context);
        var extensionObject = extensionContext[name];
        if (extensionObject) {
            var extension = extensionObject.instance;
            if (extensionObject.override) {
                //Override public methods in parent but keep parent.
                extension = extension.apply({ context: context, factory: instance, parent: classConstructor }, args);
                for (var prop in extension) {
                    if (classConstructor.hasOwnProperty(prop)) {
                        classConstructor[prop] = extension[prop];
                    }
                }
            } else {
                //replace parent object completely with new object. Same as dijon.
                return extension.apply({ context: context, factory: instance }, args);
            }
        }
        return classConstructor;
    }

    function getExtensionContext(context) {
        var extensionContext = undefined;
        extensions.forEach(function (obj) {
            if (obj === context) {
                extensionContext = obj;
            }
        });
        if (!extensionContext) {
            extensionContext = extensions.push(context);
        }
        return extensionContext;
    }

    instance = {
        extend: extend,
        getSingletonInstance: getSingletonInstance,
        setSingletonInstance: setSingletonInstance,
        getSingletonFactory: getSingletonFactory,
        getClassFactory: getClassFactory
    };

    return instance;
})();

exports["default"] = FactoryMaker;
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EventsBaseJs = require('./EventsBase.js');

var _EventsBaseJs2 = _interopRequireDefault(_EventsBaseJs);

/**
 * @class
 * @ignore
 */

var CoreEvents = (function (_EventsBase) {
    _inherits(CoreEvents, _EventsBase);

    function CoreEvents() {
        _classCallCheck(this, CoreEvents);

        _get(Object.getPrototypeOf(CoreEvents.prototype), 'constructor', this).call(this);
        this.AST_IN_FUTURE = 'astinfuture';
        this.BUFFERING_COMPLETED = 'bufferingCompleted';
        this.BUFFER_CLEARED = 'bufferCleared';
        this.BUFFER_LEVEL_UPDATED = 'bufferLevelUpdated';
        this.BYTES_APPENDED = 'bytesAppended';
        this.CHECK_FOR_EXISTENCE_COMPLETED = 'checkForExistenceCompleted';
        this.CHUNK_APPENDED = 'chunkAppended';
        this.CURRENT_TRACK_CHANGED = 'currenttrackchanged';
        this.DATA_UPDATE_COMPLETED = 'dataUpdateCompleted';
        this.DATA_UPDATE_STARTED = 'dataUpdateStarted';
        this.FRAGMENT_LOADING_COMPLETED = 'fragmentLoadingCompleted';
        this.FRAGMENT_LOADING_STARTED = 'fragmentLoadingStarted';
        this.INITIALIZATION_LOADED = 'initializationLoaded';
        this.INIT_FRAGMENT_LOADED = 'initFragmentLoaded';
        this.INIT_REQUESTED = 'initRequested';
        this.INTERNAL_MANIFEST_LOADED = 'internalManifestLoaded';
        this.LIVE_EDGE_SEARCH_COMPLETED = 'liveEdgeSearchCompleted';
        this.LOADING_COMPLETED = 'loadingCompleted';
        this.LOADING_PROGRESS = 'loadingProgress';
        this.MANIFEST_UPDATED = 'manifestUpdated';
        this.MEDIA_FRAGMENT_LOADED = 'mediaFragmentLoaded';
        this.QUALITY_CHANGED = 'qualityChanged';
        this.QUOTA_EXCEEDED = 'quotaExceeded';
        this.REPRESENTATION_UPDATED = 'representationUpdated';
        this.SEGMENTS_LOADED = 'segmentsLoaded';
        this.SERVICE_LOCATION_BLACKLIST_CHANGED = 'serviceLocationBlacklistChanged';
        this.SOURCEBUFFER_APPEND_COMPLETED = 'sourceBufferAppendCompleted';
        this.SOURCEBUFFER_REMOVE_COMPLETED = 'sourceBufferRemoveCompleted';
        this.STREAMS_COMPOSED = 'streamsComposed';
        this.STREAM_BUFFERING_COMPLETED = 'streamBufferingCompleted';
        this.STREAM_COMPLETED = 'streamCompleted';
        this.STREAM_INITIALIZED = 'streaminitialized';
        this.STREAM_TEARDOWN_COMPLETE = 'streamTeardownComplete';
        this.TIMED_TEXT_REQUESTED = 'timedTextRequested';
        this.TIME_SYNCHRONIZATION_COMPLETED = 'timeSynchronizationComplete';
        this.URL_RESOLUTION_FAILED = 'urlResolutionFailed';
        this.WALLCLOCK_TIME_UPDATED = 'wallclockTimeUpdated';
        this.XLINK_ALL_ELEMENTS_LOADED = 'xlinkAllElementsLoaded';
        this.XLINK_ELEMENT_LOADED = 'xlinkElementLoaded';
        this.XLINK_READY = 'xlinkReady';
    }

    return CoreEvents;
})(_EventsBaseJs2['default']);

exports['default'] = CoreEvents;
module.exports = exports['default'];

},{"./EventsBase.js":15}],14:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _CoreEventsJs = require('./CoreEvents.js');

var _CoreEventsJs2 = _interopRequireDefault(_CoreEventsJs);

var Events = (function (_CoreEvents) {
  _inherits(Events, _CoreEvents);

  function Events() {
    _classCallCheck(this, Events);

    _get(Object.getPrototypeOf(Events.prototype), 'constructor', this).apply(this, arguments);
  }

  return Events;
})(_CoreEventsJs2['default']);

var events = new Events();
exports['default'] = events;
module.exports = exports['default'];

},{"./CoreEvents.js":13}],15:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventsBase = (function () {
    function EventsBase() {
        _classCallCheck(this, EventsBase);
    }

    _createClass(EventsBase, [{
        key: 'extend',
        value: function extend(events, config) {
            if (!events) return;

            var override = config ? config.override : false;
            var publicOnly = config ? config.publicOnly : false;

            for (var evt in events) {
                if (!events.hasOwnProperty(evt) || this[evt] && !override) continue;
                if (publicOnly && events[evt].indexOf('public_') === -1) continue;
                this[evt] = events[evt];
            }
        }
    }]);

    return EventsBase;
})();

exports['default'] = EventsBase;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreFactoryMakerJs = require('../../core/FactoryMaker.js');

var _coreFactoryMakerJs2 = _interopRequireDefault(_coreFactoryMakerJs);

var _SegmentsUtilsJs = require('./SegmentsUtils.js');

function ListSegmentsGetter(config, isDynamic) {

    var timelineConverter = config.timelineConverter;

    var instance = undefined;

    function getSegmentsFromList(representation, requestedTime, index, availabilityUpperLimit) {
        var list = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentList;
        var baseURL = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].BaseURL;
        var len = list.SegmentURL_asArray.length;

        var segments = [];

        var periodSegIdx, seg, s, range, startIdx, endIdx, start;

        start = representation.startNumber;

        range = (0, _SegmentsUtilsJs.decideSegmentListRangeForTemplate)(timelineConverter, isDynamic, representation, requestedTime, index, availabilityUpperLimit);
        startIdx = Math.max(range.start, 0);
        endIdx = Math.min(range.end, list.SegmentURL_asArray.length - 1);

        for (periodSegIdx = startIdx; periodSegIdx <= endIdx; periodSegIdx++) {
            s = list.SegmentURL_asArray[periodSegIdx];

            seg = (0, _SegmentsUtilsJs.getIndexBasedSegment)(timelineConverter, isDynamic, representation, periodSegIdx);
            seg.replacementTime = (start + periodSegIdx - 1) * representation.segmentDuration;
            seg.media = s.media ? s.media : baseURL;
            seg.mediaRange = s.mediaRange;
            seg.index = s.index;
            seg.indexRange = s.indexRange;

            segments.push(seg);
            seg = null;
        }

        representation.availableSegmentsNumber = len;

        return segments;
    }

    instance = {
        getSegments: getSegmentsFromList
    };

    return instance;
}

ListSegmentsGetter.__dashjs_factory_name = 'ListSegmentsGetter';
var factory = _coreFactoryMakerJs2['default'].getClassFactory(ListSegmentsGetter);
exports['default'] = factory;
module.exports = exports['default'];

},{"../../core/FactoryMaker.js":12,"./SegmentsUtils.js":18}],17:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreFactoryMakerJs = require('../../core/FactoryMaker.js');

var _coreFactoryMakerJs2 = _interopRequireDefault(_coreFactoryMakerJs);

var _TimelineSegmentsGetterJs = require('./TimelineSegmentsGetter.js');

var _TimelineSegmentsGetterJs2 = _interopRequireDefault(_TimelineSegmentsGetterJs);

var _TemplateSegmentsGetterJs = require('./TemplateSegmentsGetter.js');

var _TemplateSegmentsGetterJs2 = _interopRequireDefault(_TemplateSegmentsGetterJs);

var _ListSegmentsGetterJs = require('./ListSegmentsGetter.js');

var _ListSegmentsGetterJs2 = _interopRequireDefault(_ListSegmentsGetterJs);

function SegmentsGetter(config, isDynamic) {

    var context = this.context;

    var instance = undefined,
        timelineSegmentsGetter = undefined,
        templateSegmentsGetter = undefined,
        listSegmentsGetter = undefined;

    function setup() {
        timelineSegmentsGetter = (0, _TimelineSegmentsGetterJs2['default'])(context).create(config, isDynamic);
        templateSegmentsGetter = (0, _TemplateSegmentsGetterJs2['default'])(context).create(config, isDynamic);
        listSegmentsGetter = (0, _ListSegmentsGetterJs2['default'])(context).create(config, isDynamic);
    }

    function getSegments(representation, requestedTime, index, onSegmentListUpdatedCallback, availabilityUpperLimit) {
        var segments;
        var type = representation.segmentInfoType;

        // Already figure out the segments.
        if (type === 'SegmentBase' || type === 'BaseURL' || !isSegmentListUpdateRequired(representation, index)) {
            segments = representation.segments;
        } else {
            if (type === 'SegmentTimeline') {
                segments = timelineSegmentsGetter.getSegments(representation, requestedTime, index, availabilityUpperLimit);
            } else if (type === 'SegmentTemplate') {
                segments = templateSegmentsGetter.getSegments(representation, requestedTime, index, availabilityUpperLimit);
            } else if (type === 'SegmentList') {
                segments = listSegmentsGetter.getSegments(representation, requestedTime, index, availabilityUpperLimit);
            }

            if (onSegmentListUpdatedCallback) {
                onSegmentListUpdatedCallback(representation, segments);
            }
        }

        return segments;
    }

    function isSegmentListUpdateRequired(representation, index) {
        var segments = representation.segments;
        var updateRequired = false;

        var upperIdx, lowerIdx;

        if (!segments || segments.length === 0) {
            updateRequired = true;
        } else {
            lowerIdx = segments[0].availabilityIdx;
            upperIdx = segments[segments.length - 1].availabilityIdx;
            updateRequired = index < lowerIdx || index > upperIdx;
        }

        return updateRequired;
    }

    instance = {
        getSegments: getSegments
    };

    setup();

    return instance;
}

SegmentsGetter.__dashjs_factory_name = 'SegmentsGetter';
var factory = _coreFactoryMakerJs2['default'].getClassFactory(SegmentsGetter);
exports['default'] = factory;
module.exports = exports['default'];

},{"../../core/FactoryMaker.js":12,"./ListSegmentsGetter.js":16,"./TemplateSegmentsGetter.js":19,"./TimelineSegmentsGetter.js":20}],18:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.replaceTokenForTemplate = replaceTokenForTemplate;
exports.getIndexBasedSegment = getIndexBasedSegment;
exports.getTimeBasedSegment = getTimeBasedSegment;
exports.getSegmentByIndex = getSegmentByIndex;
exports.decideSegmentListRangeForTimeline = decideSegmentListRangeForTimeline;
exports.decideSegmentListRangeForTemplate = decideSegmentListRangeForTemplate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _voSegmentJs = require('./../vo/Segment.js');

var _voSegmentJs2 = _interopRequireDefault(_voSegmentJs);

function zeroPadToLength(numStr, minStrLength) {
    while (numStr.length < minStrLength) {
        numStr = '0' + numStr;
    }
    return numStr;
}

function getNumberForSegment(segment, segmentIndex) {
    return segment.representation.startNumber + segmentIndex;
}

function replaceTokenForTemplate(url, token, value) {
    var formatTag = '%0';

    var startPos, endPos, formatTagPos, specifier, width, paddedValue;

    var tokenLen = token.length;
    var formatTagLen = formatTag.length;

    // keep looping round until all instances of <token> have been
    // replaced. once that has happened, startPos below will be -1
    // and the completed url will be returned.
    while (true) {

        // check if there is a valid $<token>...$ identifier
        // if not, return the url as is.
        startPos = url.indexOf('$' + token);
        if (startPos < 0) {
            return url;
        }

        // the next '$' must be the end of the identifier
        // if there isn't one, return the url as is.
        endPos = url.indexOf('$', startPos + tokenLen);
        if (endPos < 0) {
            return url;
        }

        // now see if there is an additional format tag suffixed to
        // the identifier within the enclosing '$' characters
        formatTagPos = url.indexOf(formatTag, startPos + tokenLen);
        if (formatTagPos > startPos && formatTagPos < endPos) {

            specifier = url.charAt(endPos - 1);
            width = parseInt(url.substring(formatTagPos + formatTagLen, endPos - 1), 10);

            // support the minimum specifiers required by IEEE 1003.1
            // (d, i , o, u, x, and X) for completeness
            switch (specifier) {
                // treat all int types as uint,
                // hence deliberate fallthrough
                case 'd':
                case 'i':
                case 'u':
                    paddedValue = zeroPadToLength(value.toString(), width);
                    break;
                case 'x':
                    paddedValue = zeroPadToLength(value.toString(16), width);
                    break;
                case 'X':
                    paddedValue = zeroPadToLength(value.toString(16), width).toUpperCase();
                    break;
                case 'o':
                    paddedValue = zeroPadToLength(value.toString(8), width);
                    break;
                default:
                    //TODO: commented out logging to supress jshint warning -- `log` is undefined here
                    //log('Unsupported/invalid IEEE 1003.1 format identifier string in URL');
                    return url;
            }
        } else {
            paddedValue = value;
        }

        url = url.substring(0, startPos) + paddedValue + url.substring(endPos + 1);
    }
}

function getIndexBasedSegment(timelineConverter, isDynamic, representation, index) {
    var seg, duration, presentationStartTime, presentationEndTime;

    duration = representation.segmentDuration;

    /*
     * From spec - If neither @duration attribute nor SegmentTimeline element is present, then the Representation
     * shall contain exactly one Media Segment. The MPD start time is 0 and the MPD duration is obtained
     * in the same way as for the last Media Segment in the Representation.
     */
    if (isNaN(duration)) {
        duration = representation.adaptation.period.duration;
    }

    presentationStartTime = representation.adaptation.period.start + index * duration;
    presentationEndTime = presentationStartTime + duration;

    seg = new _voSegmentJs2['default']();

    seg.representation = representation;
    seg.duration = duration;
    seg.presentationStartTime = presentationStartTime;

    seg.mediaStartTime = timelineConverter.calcMediaTimeFromPresentationTime(seg.presentationStartTime, representation);

    seg.availabilityStartTime = timelineConverter.calcAvailabilityStartTimeFromPresentationTime(seg.presentationStartTime, representation.adaptation.period.mpd, isDynamic);
    seg.availabilityEndTime = timelineConverter.calcAvailabilityEndTimeFromPresentationTime(presentationEndTime, representation.adaptation.period.mpd, isDynamic);

    // at this wall clock time, the video element currentTime should be seg.presentationStartTime
    seg.wallStartTime = timelineConverter.calcWallTimeForSegment(seg, isDynamic);

    seg.replacementNumber = getNumberForSegment(seg, index);
    seg.availabilityIdx = index;

    return seg;
}

function getTimeBasedSegment(timelineConverter, isDynamic, representation, time, duration, fTimescale, url, range, index) {
    var scaledTime = time / fTimescale;
    var scaledDuration = Math.min(duration / fTimescale, representation.adaptation.period.mpd.maxSegmentDuration);

    var presentationStartTime, presentationEndTime, seg;

    presentationStartTime = timelineConverter.calcPresentationTimeFromMediaTime(scaledTime, representation);
    presentationEndTime = presentationStartTime + scaledDuration;

    seg = new _voSegmentJs2['default']();

    seg.representation = representation;
    seg.duration = scaledDuration;
    seg.mediaStartTime = scaledTime;

    seg.presentationStartTime = presentationStartTime;

    // For SegmentTimeline every segment is available at loadedTime
    seg.availabilityStartTime = representation.adaptation.period.mpd.manifest.loadedTime;
    seg.availabilityEndTime = timelineConverter.calcAvailabilityEndTimeFromPresentationTime(presentationEndTime, representation.adaptation.period.mpd, isDynamic);

    // at this wall clock time, the video element currentTime should be seg.presentationStartTime
    seg.wallStartTime = timelineConverter.calcWallTimeForSegment(seg, isDynamic);

    seg.replacementTime = time;

    seg.replacementNumber = getNumberForSegment(seg, index);

    url = replaceTokenForTemplate(url, 'Number', seg.replacementNumber);
    url = replaceTokenForTemplate(url, 'Time', seg.replacementTime);
    seg.media = url;
    seg.mediaRange = range;
    seg.availabilityIdx = index;

    return seg;
}

function getSegmentByIndex(index, representation) {
    if (!representation || !representation.segments) return null;

    var ln = representation.segments.length;
    var seg, i;

    if (index < ln) {
        seg = representation.segments[index];
        if (seg && seg.availabilityIdx === index) {
            return seg;
        }
    }

    for (i = 0; i < ln; i++) {
        seg = representation.segments[i];

        if (seg && seg.availabilityIdx === index) {
            return seg;
        }
    }

    return null;
}

function decideSegmentListRangeForTimeline(timelineConverter, isDynamic, requestedTime, index, givenAvailabilityUpperLimit) {
    var availabilityLowerLimit = 2;
    var availabilityUpperLimit = givenAvailabilityUpperLimit || 10;
    var firstIdx = 0;
    var lastIdx = Number.POSITIVE_INFINITY;

    var start, end, range;

    if (isDynamic && !timelineConverter.isTimeSyncCompleted()) {
        range = { start: firstIdx, end: lastIdx };
        return range;
    }

    if (!isDynamic && requestedTime || index < 0) return null;

    // segment list should not be out of the availability window range
    start = Math.max(index - availabilityLowerLimit, firstIdx);
    end = Math.min(index + availabilityUpperLimit, lastIdx);

    range = { start: start, end: end };

    return range;
}

function decideSegmentListRangeForTemplate(timelineConverter, isDynamic, representation, requestedTime, index, givenAvailabilityUpperLimit) {
    var duration = representation.segmentDuration;
    var minBufferTime = representation.adaptation.period.mpd.manifest.minBufferTime;
    var availabilityWindow = representation.segmentAvailabilityRange;
    var periodRelativeRange = {
        start: timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, availabilityWindow.start),
        end: timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, availabilityWindow.end)
    };
    var currentSegmentList = representation.segments;
    var availabilityLowerLimit = 2 * duration;
    var availabilityUpperLimit = givenAvailabilityUpperLimit || Math.max(2 * minBufferTime, 10 * duration);

    var originAvailabilityTime = NaN;
    var originSegment = null;

    var start, end, range;

    periodRelativeRange.start = Math.max(periodRelativeRange.start, 0);

    if (isDynamic && !timelineConverter.isTimeSyncCompleted()) {
        start = Math.floor(periodRelativeRange.start / duration);
        end = Math.floor(periodRelativeRange.end / duration);
        range = { start: start, end: end };
        return range;
    }

    // if segments exist we should try to find the latest buffered time, which is the presentation time of the
    // segment for the current index
    if (currentSegmentList && currentSegmentList.length > 0) {
        originSegment = getSegmentByIndex(index, representation);
        if (originSegment) {
            originAvailabilityTime = timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, originSegment.presentationStartTime);
        } else {
            originAvailabilityTime = index > 0 ? index * duration : timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, requestedTime);
        }
    } else {
        // If no segments exist, but index > 0, it means that we switch to the other representation, so
        // we should proceed from this time.
        // Otherwise we should start from the beginning for static mpds or from the end (live edge) for dynamic mpds
        originAvailabilityTime = index > 0 ? index * duration : isDynamic ? periodRelativeRange.end : periodRelativeRange.start;
    }

    // segment list should not be out of the availability window range
    start = Math.floor(Math.max(originAvailabilityTime - availabilityLowerLimit, periodRelativeRange.start) / duration);
    end = Math.floor(Math.min(start + availabilityUpperLimit / duration, periodRelativeRange.end / duration));

    range = { start: start, end: end };

    return range;
}

},{"./../vo/Segment.js":21}],19:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreFactoryMakerJs = require('../../core/FactoryMaker.js');

var _coreFactoryMakerJs2 = _interopRequireDefault(_coreFactoryMakerJs);

var _SegmentsUtilsJs = require('./SegmentsUtils.js');

function TemplateSegmentsGetter(config, isDynamic) {

    var timelineConverter = config.timelineConverter;

    var instance = undefined;

    function getSegmentsFromTemplate(representation, requestedTime, index, availabilityUpperLimit) {
        var template = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentTemplate;
        var duration = representation.segmentDuration;
        var availabilityWindow = representation.segmentAvailabilityRange;

        var segments = [];
        var url = null;
        var seg = null;

        var segmentRange, periodSegIdx, startIdx, endIdx, start;

        start = representation.startNumber;

        if (isNaN(duration) && !isDynamic) {
            segmentRange = { start: start, end: start };
        } else {
            segmentRange = (0, _SegmentsUtilsJs.decideSegmentListRangeForTemplate)(timelineConverter, isDynamic, representation, requestedTime, index, availabilityUpperLimit);
        }

        startIdx = segmentRange.start;
        endIdx = segmentRange.end;

        for (periodSegIdx = startIdx; periodSegIdx <= endIdx; periodSegIdx++) {

            seg = (0, _SegmentsUtilsJs.getIndexBasedSegment)(timelineConverter, isDynamic, representation, periodSegIdx);
            seg.replacementTime = (start + periodSegIdx - 1) * representation.segmentDuration;
            url = template.media;
            url = (0, _SegmentsUtilsJs.replaceTokenForTemplate)(url, 'Number', seg.replacementNumber);
            url = (0, _SegmentsUtilsJs.replaceTokenForTemplate)(url, 'Time', seg.replacementTime);
            seg.media = url;

            segments.push(seg);
            seg = null;
        }

        if (isNaN(duration)) {
            representation.availableSegmentsNumber = 1;
        } else {
            representation.availableSegmentsNumber = Math.ceil((availabilityWindow.end - availabilityWindow.start) / duration);
        }

        return segments;
    }

    instance = {
        getSegments: getSegmentsFromTemplate
    };

    return instance;
}

TemplateSegmentsGetter.__dashjs_factory_name = 'TemplateSegmentsGetter';
var factory = _coreFactoryMakerJs2['default'].getClassFactory(TemplateSegmentsGetter);
exports['default'] = factory;
module.exports = exports['default'];

},{"../../core/FactoryMaker.js":12,"./SegmentsUtils.js":18}],20:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreFactoryMakerJs = require('../../core/FactoryMaker.js');

var _coreFactoryMakerJs2 = _interopRequireDefault(_coreFactoryMakerJs);

var _SegmentsUtilsJs = require('./SegmentsUtils.js');

function TimelineSegmentsGetter(config, isDynamic) {

    var timelineConverter = config.timelineConverter;

    var instance = undefined;

    function getSegmentsFromTimeline(representation, requestedTime, index, availabilityUpperLimit) {
        var template = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentTemplate;
        var timeline = template.SegmentTimeline;
        var isAvailableSegmentNumberCalculated = representation.availableSegmentsNumber > 0;

        var maxSegmentsAhead = 10;
        var time = 0;
        var scaledTime = 0;
        var availabilityIdx = -1;
        var segments = [];
        var isStartSegmentForRequestedTimeFound = false;

        var fragments, frag, i, len, j, repeat, repeatEndTime, nextFrag, calculatedRange, hasEnoughSegments, requiredMediaTime, startIdx, endIdx, fTimescale;

        var createSegment = function createSegment(s) {
            return (0, _SegmentsUtilsJs.getTimeBasedSegment)(timelineConverter, isDynamic, representation, time, s.d, fTimescale, template.media, s.mediaRange, availabilityIdx);
        };

        fTimescale = representation.timescale;

        fragments = timeline.S_asArray;

        calculatedRange = (0, _SegmentsUtilsJs.decideSegmentListRangeForTimeline)(timelineConverter, isDynamic, requestedTime, index, availabilityUpperLimit);

        // if calculatedRange exists we should generate segments that belong to this range.
        // Otherwise generate maxSegmentsAhead segments ahead of the requested time
        if (calculatedRange) {
            startIdx = calculatedRange.start;
            endIdx = calculatedRange.end;
        } else {
            requiredMediaTime = timelineConverter.calcMediaTimeFromPresentationTime(requestedTime || 0, representation);
        }

        for (i = 0, len = fragments.length; i < len; i++) {
            frag = fragments[i];
            repeat = 0;
            if (frag.hasOwnProperty('r')) {
                repeat = frag.r;
            }

            //For a repeated S element, t belongs only to the first segment
            if (frag.hasOwnProperty('t')) {
                time = frag.t;
                scaledTime = time / fTimescale;
            }

            //This is a special case: "A negative value of the @r attribute of the S element indicates that the duration indicated in @d attribute repeats until the start of the next S element, the end of the Period or until the
            // next MPD update."
            if (repeat < 0) {
                nextFrag = fragments[i + 1];

                if (nextFrag && nextFrag.hasOwnProperty('t')) {
                    repeatEndTime = nextFrag.t / fTimescale;
                } else {
                    var availabilityEnd = representation.segmentAvailabilityRange ? representation.segmentAvailabilityRange.end : timelineConverter.calcSegmentAvailabilityRange(representation, isDynamic).end;
                    repeatEndTime = timelineConverter.calcMediaTimeFromPresentationTime(availabilityEnd, representation);
                    representation.segmentDuration = frag.d / fTimescale;
                }

                repeat = Math.ceil((repeatEndTime - scaledTime) / (frag.d / fTimescale)) - 1;
            }

            // if we have enough segments in the list, but we have not calculated the total number of the segments yet we
            // should continue the loop and calc the number. Once it is calculated, we can break the loop.
            if (hasEnoughSegments) {
                if (isAvailableSegmentNumberCalculated) break;
                availabilityIdx += repeat + 1;
                continue;
            }

            for (j = 0; j <= repeat; j++) {
                availabilityIdx++;

                if (calculatedRange) {
                    if (availabilityIdx > endIdx) {
                        hasEnoughSegments = true;
                        if (isAvailableSegmentNumberCalculated) break;
                        continue;
                    }

                    if (availabilityIdx >= startIdx) {
                        segments.push(createSegment(frag));
                    }
                } else {
                    if (segments.length > maxSegmentsAhead) {
                        hasEnoughSegments = true;
                        if (isAvailableSegmentNumberCalculated) break;
                        continue;
                    }

                    // In some cases when requiredMediaTime = actual end time of the last segment
                    // it is possible that this time a bit exceeds the declared end time of the last segment.
                    // in this case we still need to include the last segment in the segment list. to do this we
                    // use a correction factor = 1.5. This number is used because the largest possible deviation is
                    // is 50% of segment duration.
                    if (isStartSegmentForRequestedTimeFound) {
                        segments.push(createSegment(frag));
                    } else if (scaledTime >= requiredMediaTime - frag.d / fTimescale * 1.5) {
                        isStartSegmentForRequestedTimeFound = true;
                        segments.push(createSegment(frag));
                    }
                }

                time += frag.d;
                scaledTime = time / fTimescale;
            }
        }

        if (!isAvailableSegmentNumberCalculated) {
            representation.availableSegmentsNumber = availabilityIdx + 1;
        }

        return segments;
    }

    instance = {
        getSegments: getSegmentsFromTimeline
    };

    return instance;
}

TimelineSegmentsGetter.__dashjs_factory_name = 'TimelineSegmentsGetter';
var factory = _coreFactoryMakerJs2['default'].getClassFactory(TimelineSegmentsGetter);
exports['default'] = factory;
module.exports = exports['default'];

},{"../../core/FactoryMaker.js":12,"./SegmentsUtils.js":18}],21:[function(require,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Segment = function Segment() {
  _classCallCheck(this, Segment);

  this.indexRange = null;
  this.index = null;
  this.mediaRange = null;
  this.media = null;
  this.duration = NaN;
  // this is the time that should be inserted into the media url
  this.replacementTime = null;
  // this is the number that should be inserted into the media url
  this.replacementNumber = NaN;
  // This is supposed to match the time encoded in the media Segment
  this.mediaStartTime = NaN;
  // When the source buffer timeOffset is set to MSETimeOffset this is the
  // time that will match the seekTarget and video.currentTime
  this.presentationStartTime = NaN;
  // Do not schedule this segment until
  this.availabilityStartTime = NaN;
  // Ignore and  discard this segment after
  this.availabilityEndTime = NaN;
  // The index of the segment inside the availability window
  this.availabilityIdx = NaN;
  // For dynamic mpd's, this is the wall clock time that the video
  // element currentTime should be presentationStartTime
  this.wallStartTime = NaN;
  this.representation = null;
};

exports["default"] = Segment;
module.exports = exports["default"];

},{}],22:[function(require,module,exports){
(function (global){
/**
 * @file chromecast-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var Button = _videoJs2['default'].getComponent('Button');

/**
 * The base class for buttons that toggle chromecast video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class ChromeCastButton
 */

var ChromeCastButton = (function (_Button) {
    _inherits(ChromeCastButton, _Button);

    function ChromeCastButton(player, options) {
        _classCallCheck(this, ChromeCastButton);

        _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'constructor', this).call(this, player, options);
        this.hide();
        this.initializeApi();
        player.chromecast = this;
    }

    /**
     * Init chromecast sdk api
     *
     * @method initializeApi
     */

    _createClass(ChromeCastButton, [{
        key: 'initializeApi',
        value: function initializeApi() {
            var apiConfig = undefined;
            var appId = undefined;
            var sessionRequest = undefined;

            if (!_videoJs2['default'].browser.IS_CHROME || _videoJs2['default'].browser.IS_EDGE) {
                return;
            }
            if (!chrome.cast || !chrome.cast.isAvailable) {
                _videoJs2['default'].log('Cast APIs not available');
                if (this.tryingReconnect < 10) {
                    this.setTimeout(this.initializeApi, 1000);
                    ++this.tryingReconnect;
                }
                _videoJs2['default'].log('Cast APIs not available. Max reconnect attempt');
                return;
            }

            _videoJs2['default'].log('Cast APIs are available');
            appId = this.options_.appId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
            sessionRequest = new chrome.cast.SessionRequest(appId);
            apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionJoinedListener.bind(this), this.receiverListener.bind(this));
            return chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.castError.bind(this));
        }
    }, {
        key: 'castError',
        value: function castError(_castError) {

            var error = {
                code: _castError.code,
                message: _castError.description
            };

            switch (_castError.code) {
                case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
                case chrome.cast.ErrorCode.EXTENSION_MISSING:
                case chrome.cast.ErrorCode.EXTENSION_NOT_COMPATIBLE:
                case chrome.cast.ErrorCode.INVALID_PARAMETER:
                case chrome.cast.ErrorCode.LOAD_MEDIA_FAILED:
                case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
                case chrome.cast.ErrorCode.SESSION_ERROR:
                case chrome.cast.ErrorCode.CHANNEL_ERROR:
                case chrome.cast.ErrorCode.TIMEOUT:
                    this.addClass('error');
                    break;
                case chrome.cast.ErrorCode.CANCEL:
                    break;
                default:
                    this.player_.error(error);
                    break;
            }
            return _videoJs2['default'].log('Cast Error: ' + JSON.stringify(_castError));
        }
    }, {
        key: 'onInitSuccess',
        value: function onInitSuccess() {
            return this.apiInitialized = true;
        }
    }, {
        key: 'sessionJoinedListener',
        value: function sessionJoinedListener(session) {
            if (session.media.length) {
                this.apiSession = session;
                this.onMediaDiscovered(session.media[0]);
            }
            return console.log('Session joined');
        }
    }, {
        key: 'receiverListener',
        value: function receiverListener(availability) {
            if (availability === 'available') {
                return this.show();
            }
        }
    }, {
        key: 'doLaunch',
        value: function doLaunch() {
            _videoJs2['default'].log('Cast video: ' + this.player_.cache_.src);
            if (this.apiInitialized) {
                return chrome.cast.requestSession(this.onSessionSuccess.bind(this), this.castError.bind(this));
            } else {
                return _videoJs2['default'].log('Session not initialized');
            }
        }
    }, {
        key: 'onSessionSuccess',
        value: function onSessionSuccess(session) {
            var image = undefined;
            var key = undefined;
            var loadRequest = undefined;
            var mediaInfo = undefined;
            var ref = undefined;
            var value = undefined;

            this.apiSession = session;
            var source = this.player_.cache_.src;
            var type = this.player_.currentType();

            _videoJs2['default'].log('Session initialized: ' + session.sessionId + ' source : ' + source + ' type : ' + type);

            mediaInfo = new chrome.cast.media.MediaInfo(source, type);
            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            if (this.options_.metadata) {
                ref = this.options_.metadata;
                for (key in ref) {
                    value = ref[key];
                    mediaInfo.metadata[key] = value;
                }
            }
            //Add poster image on player
            var poster = this.player().poster();
            if (poster) {
                image = new chrome.cast.Image(poster);
                mediaInfo.metadata.images = [image];
            }

            // Load/Add caption tracks
            var plTracks = this.player().textTracks();
            var remotePlTracks = this.player().remoteTextTrackEls();
            var tracks = [];
            var i = 0;
            var remotePlTrack = undefined;
            var plTrack = undefined;
            var trackId = 0;
            var track = undefined;
            if (plTracks) {
                for (i = 0; i < plTracks.length; i++) {
                    plTrack = plTracks.tracks_[i];
                    remotePlTrack = remotePlTracks && remotePlTracks.trackElements_ && remotePlTracks.trackElements_[i];
                    trackId++;
                    track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.TEXT);
                    track.trackContentId = remotePlTrack ? remotePlTrack.src : 'caption_' + plTrack.language;
                    track.subtype = chrome.cast.media.TextTrackType.CAPTIONS;
                    track.name = plTrack.label;
                    track.language = plTrack.language;
                    track.customData = null;
                    tracks.push(track);
                }
                mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
                mediaInfo.textTrackStyle.foregroundColor = '#FFFFFF';
                mediaInfo.textTrackStyle.backgroundColor = '#00000060';
                mediaInfo.textTrackStyle.edgeType = chrome.cast.media.TextTrackEdgeType.DROP_SHADOW;
                mediaInfo.textTrackStyle.windowType = chrome.cast.media.TextTrackWindowType.ROUNDED_CORNERS;
            }
            // Load/Add audio tracks

            try {
                plTracks = this.player().audioTracks();
                if (plTracks) {
                    for (i = 0; i < plTracks.length; i++) {
                        plTrack = plTracks.tracks_[i];
                        trackId++;
                        track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.AUDIO);
                        track.subtype = null;
                        track.name = plTrack.label;
                        track.language = plTrack.language;
                        track.customData = null;
                        tracks.push(track);
                    }
                }
            } catch (e) {
                _videoJs2['default'].log('get player audioTracks fail' + e);
            }

            if (tracks.length) {
                mediaInfo.tracks = tracks;
            }

            // Request load media source
            loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);

            loadRequest.autoplay = true;
            loadRequest.currentTime = this.player_.currentTime();

            this.apiSession.loadMedia(loadRequest, this.onMediaDiscovered.bind(this), this.castError.bind(this));
            this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
        }
    }, {
        key: 'onMediaDiscovered',
        value: function onMediaDiscovered(media) {
            this.player_.loadTech_('Chromecast', {
                type: 'cast',
                apiMedia: media,
                apiSession: this.apiSession
            });

            this.casting = true;
            this.inactivityTimeout = this.player_.options_.inactivityTimeout;
            this.player_.options_.inactivityTimeout = 0;
            this.player_.userActive(true);
            this.addClass('connected');
            this.removeClass('error');
        }
    }, {
        key: 'onSessionUpdate',
        value: function onSessionUpdate(isAlive) {
            if (!this.player_.apiMedia) {
                return;
            }
            if (!isAlive) {
                return this.onStopAppSuccess();
            }
        }
    }, {
        key: 'stopCasting',
        value: function stopCasting() {
            return this.apiSession.stop(this.onStopAppSuccess.bind(this), this.castError.bind(this));
        }
    }, {
        key: 'onStopAppSuccess',
        value: function onStopAppSuccess() {
            this.casting = false;
            var time = this.player_.currentTime();
            this.removeClass('connected');
            this.player_.src(this.player_.options_['sources']);
            if (!this.player_.paused()) {
                this.player_.one('seeked', function () {
                    return this.player_.play();
                });
            }
            this.player_.currentTime(time);
            this.player_.options_.inactivityTimeout = this.inactivityTimeout;
            return this.apiSession = null;
        }

        /**
         * Allow sub components to stack CSS class names
         *
         * @return {String} The constructed class name
         * @method buildCSSClass
         */
    }, {
        key: 'buildCSSClass',
        value: function buildCSSClass() {
            return 'vjs-chromecast-button ' + _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'buildCSSClass', this).call(this);
        }

        /**
         * Handle click on mute
         * @method handleClick
         */
    }, {
        key: 'handleClick',
        value: function handleClick() {
            _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'handleClick', this).call(this);
            if (this.casting) {
                return this.stopCasting();
            } else {
                return this.doLaunch();
            }
        }
    }]);

    return ChromeCastButton;
})(Button);

ChromeCastButton.prototype.tryingReconnect = 0;

ChromeCastButton.prototype.inactivityTimeout = 2000;

ChromeCastButton.prototype.controlText_ = 'Chromecast';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 1, 0, 'chromeCastButton');

Component.registerComponent('ChromeCastButton', ChromeCastButton);
exports['default'] = ChromeCastButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],23:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videojsChromecast = require('./videojs-chromecast');

var _videojsChromecast2 = _interopRequireDefault(_videojsChromecast);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _videojsChromecast2['default'])(this, options);
};

_videoJs2['default'].plugin('chromecast', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./videojs-chromecast":25}],24:[function(require,module,exports){
(function (global){
/**
 * @file chromecast.js
 * Chromecast Media Controller - Wrapper for HTML5 Media API
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');

/**
 * Chromecast Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Chromecast
 */

var Chromecast = (function (_Tech) {
    _inherits(Chromecast, _Tech);

    function Chromecast(options, ready) {
        var _this = this;

        _classCallCheck(this, Chromecast);

        _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, options, ready);
        this.apiMedia = this.options_.source.apiMedia;
        this.apiSession = this.options_.source.apiSession;
        this.receiver = this.apiSession.receiver.friendlyName;

        this.apiMedia.addUpdateListener(this.onMediaStatusUpdate.bind(this));
        this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
        var tracks = this.textTracks();
        if (tracks) {
            (function () {
                var changeHandler = _this.handleTextTracksChange.bind(_this);

                tracks.addEventListener('change', changeHandler);
                _this.on('dispose', function () {
                    tracks.removeEventListener('change', changeHandler);
                });

                _this.handleTextTracksChange();
            })();
        }

        try {
            tracks = this.audioTracks();
            if (tracks) {
                (function () {
                    var changeHandler = _this.handleAudioTracksChange.bind(_this);

                    tracks.addEventListener('change', changeHandler);
                    _this.on('dispose', function () {
                        tracks.removeEventListener('change', changeHandler);
                    });
                })();
            }
        } catch (e) {
            _videoJs2['default'].log('get player audioTracks fail' + e);
        }

        try {
            tracks = this.videoTracks();
            if (tracks) {
                (function () {
                    var changeHandler = _this.handleVideoTracksChange.bind(_this);

                    tracks.addEventListener('change', changeHandler);
                    _this.on('dispose', function () {
                        tracks.removeEventListener('change', changeHandler);
                    });
                })();
            }
        } catch (e) {
            _videoJs2['default'].log('get player videoTracks fail' + e);
        }

        this.update();
        this.triggerReady();
    }

    _createClass(Chromecast, [{
        key: 'createEl',
        value: function createEl() {
            var el = _videoJs2['default'].createEl('div', {
                id: this.options_.techId,
                className: 'vjs-tech vjs-tech-chromecast'
            });
            return el;
        }
    }, {
        key: 'update',
        value: function update() {
            this.el_.innerHTML = '<div class="casting-image" style="background-image: url(\'' + this.options_.poster + '\')"></div><div class="casting-overlay"><div class="casting-information"><div class="casting-icon"></div><div class="casting-description"><small>' + this.localize('CASTING TO') + '</small><br>' + this.receiver + '</div></div></div>';
        }
    }, {
        key: 'onSessionUpdate',
        value: function onSessionUpdate(isAlive) {
            if (!this.apiMedia) {
                return;
            }
            if (!isAlive) {
                return this.onStopAppSuccess();
            }
        }
    }, {
        key: 'onStopAppSuccess',
        value: function onStopAppSuccess() {
            this.stopTrackingCurrentTime();
            this.apiMedia = null;
        }
    }, {
        key: 'onMediaStatusUpdate',
        value: function onMediaStatusUpdate() {
            if (!this.apiMedia) {
                return;
            }
            switch (this.apiMedia.playerState) {
                case chrome.cast.media.PlayerState.BUFFERING:
                    this.trigger('waiting');
                    break;
                case chrome.cast.media.PlayerState.IDLE:
                    this.trigger('timeupdate');
                    break;
                case chrome.cast.media.PlayerState.PAUSED:
                    this.trigger('pause');
                    this.paused_ = true;
                    break;
                case chrome.cast.media.PlayerState.PLAYING:
                    this.trigger('playing');
                    this.trigger('play');
                    this.paused_ = false;
                    break;
            }
        }

        /**
         * Set video
         *
         * @param {Object=} src Source object
         * @method setSrc
         */
    }, {
        key: 'src',
        value: function src(_src) {
            //do nothing
        }
    }, {
        key: 'currentSrc',
        value: function currentSrc() {
            if (!this.apiMedia) {
                return;
            }
            return this.apiMedia.media.contentId;
        }
    }, {
        key: 'handleAudioTracksChange',
        value: function handleAudioTracksChange() {
            var trackInfo = [];
            var tTracks = this.textTracks();
            var tracks = this.audioTracks();

            if (!tracks) {
                return;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (track['enabled']) {
                    //set id of cuurentTrack audio
                    trackInfo.push(i + 1 + tTracks.length);
                }
            }

            if (this.apiMedia && trackInfo.length) {
                this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
                return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
            }
        }
    }, {
        key: 'handleVideoTracksChange',
        value: function handleVideoTracksChange() {}
    }, {
        key: 'handleTextTracksChange',
        value: function handleTextTracksChange() {
            var trackInfo = [];
            var tracks = this.textTracks();

            if (!tracks) {
                return;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (track['mode'] === 'showing') {
                    trackInfo.push(i + 1);
                }
            }

            if (this.apiMedia && trackInfo.length) {
                this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
                return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
            }
        }
    }, {
        key: 'onTrackSuccess',
        value: function onTrackSuccess() {
            return _videoJs2['default'].log('track added');
        }
    }, {
        key: 'onTrackError',
        value: function onTrackError(e) {
            return _videoJs2['default'].log('Cast track Error: ' + JSON.stringify(e));
        }
    }, {
        key: 'castError',
        value: function castError(e) {
            return _videoJs2['default'].log('Cast Error: ' + JSON.stringify(e));
        }
    }, {
        key: 'play',
        value: function play() {
            if (!this.apiMedia) {
                return;
            }
            if (this.paused_) {
                this.apiMedia.play(null, this.mediaCommandSuccessCallback.bind(this, 'Playing: ' + this.apiMedia.sessionId), this.castError.bind(this));
            }
            return this.paused_ = false;
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this.apiMedia) {
                return;
            }
            if (!this.paused_) {
                this.apiMedia.pause(null, this.mediaCommandSuccessCallback.bind(this, 'Paused: ' + this.apiMedia.sessionId), this.castError.bind(this));
                return this.paused_ = true;
            }
        }
    }, {
        key: 'paused',
        value: function paused() {
            return this.paused_;
        }
    }, {
        key: 'currentTime',
        value: function currentTime() {
            if (!this.apiMedia) {
                return 0;
            }
            return this.apiMedia.getEstimatedTime();
        }
    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(position) {

            if (!this.apiMedia) {
                return 0;
            }
            var request = undefined;
            request = new chrome.cast.media.SeekRequest();
            request.currentTime = position;
            //if (this.player_.controlBar.progressControl.seekBar.videoWasPlaying) {
            //  request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
            //}
            return this.apiMedia.seek(request, this.onSeekSuccess.bind(this, position), this.castError.bind(this));
        }
    }, {
        key: 'onSeekSuccess',
        value: function onSeekSuccess(position) {
            _videoJs2['default'].log('seek success' + position);
        }
    }, {
        key: 'volume',
        value: function volume() {
            return this.volume_;
        }
    }, {
        key: 'duration',
        value: function duration() {
            if (!this.apiMedia) {
                return 0;
            }
            return this.apiMedia.media.duration || Infinity;
        }
    }, {
        key: 'controls',
        value: function controls() {
            return false;
        }
    }, {
        key: 'setVolume',
        value: function setVolume(level) {
            var mute = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var request = undefined;
            var volume = undefined;
            if (!this.apiMedia) {
                return;
            }
            volume = new chrome.cast.Volume();
            volume.level = level;
            volume.muted = mute;
            this.volume_ = volume.level;
            this.muted_ = mute;
            request = new chrome.cast.media.VolumeRequest();
            request.volume = volume;
            this.apiMedia.setVolume(request, this.mediaCommandSuccessCallback.bind(this, 'Volume changed'), this.castError.bind(this));
            return this.trigger('volumechange');
        }
    }, {
        key: 'mediaCommandSuccessCallback',
        value: function mediaCommandSuccessCallback(information) {
            _videoJs2['default'].log(information);
        }
    }, {
        key: 'muted',
        value: function muted() {
            return this.muted_;
        }
    }, {
        key: 'setMuted',
        value: function setMuted(muted) {
            return this.setVolume(this.volume_, muted);
        }
    }, {
        key: 'supportsFullScreen',
        value: function supportsFullScreen() {
            return false;
        }
    }, {
        key: 'resetSrc_',
        value: function resetSrc_(callback) {
            callback();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.resetSrc_(Function.prototype);
            _get(Object.getPrototypeOf(Chromecast.prototype), 'dispose', this).call(this, this);
        }
    }]);

    return Chromecast;
})(Tech);

Chromecast.prototype.paused_ = false;

Chromecast.prototype.options_ = {};

Chromecast.prototype.timerStep = 1000;

/* Chromecast Support Testing -------------------------------------------------------- */

Chromecast.isSupported = function () {
    return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Chromecast);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Chromecast.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Chromecast.nativeSourceHandler.canPlayType = function (source) {

    var dashTypeRE = /^application\/(?:dash\+xml|(x-|vnd\.apple\.)mpegurl)/i;
    var dashExtRE = /^video\/(mpd|mp4|webm|m3u8)/i;

    if (dashTypeRE.test(source)) {
        return 'probably';
    } else if (dashExtRE.test(source)) {
        return 'maybe';
    } else {
        return '';
    }
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Chromecast.nativeSourceHandler.canHandleSource = function (source) {

    // If a type was provided we should rely on that
    if (source.type) {
        return Chromecast.nativeSourceHandler.canPlayType(source.type);
    } else if (source.src) {
        return Chromecast.nativeSourceHandler.canPlayType(source.src);
    }

    return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Chromecast.nativeSourceHandler.handleSource = function (source, tech) {
    tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Chromecast.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Chromecast.registerSourceHandler(Chromecast.nativeSourceHandler);

/*
 * Set the tech's volume control support status
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresVolumeControl'] = true;

/*
 * Set the tech's playbackRate support status
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresPlaybackRate'] = false;

/*
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 *
 * @type {Boolean}
 */
Chromecast.prototype['movingMediaElementInDOM'] = false;

/*
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Chromecast.prototype['featuresFullscreenResize'] = false;

/*
 * Set the tech's timeupdate event support status
 * (this disables the manual timeupdate events of the Tech)
 */
Chromecast.prototype['featuresTimeupdateEvents'] = false;

/*
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Chromecast.prototype['featuresProgressEvents'] = false;

/*
 * Sets the tech's status on native text track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeTextTracks'] = true;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeAudioTracks'] = true;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeVideoTracks'] = false;

_videoJs2['default'].options.chromecast = {};

Component.registerComponent('Chromecast', Chromecast);
Tech.registerTech('Chromecast', Chromecast);
exports['default'] = Chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],25:[function(require,module,exports){
(function (global){
/**
 * ! videojs-chromecast - v1.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-chromecast.js
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _componentControlBarChromecastButton = require('./component/control-bar/chromecast-button');

var _componentControlBarChromecastButton2 = _interopRequireDefault(_componentControlBarChromecastButton);

var _techChromecast = require('./tech/chromecast');

var _techChromecast2 = _interopRequireDefault(_techChromecast);

var Component = _videoJs2['default'].getComponent('Component');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Chromecast = (function (_Component) {
  _inherits(Chromecast, _Component);

  function Chromecast(player, options) {
    _classCallCheck(this, Chromecast);

    _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, player, options);
  }

  return Chromecast;
})(Component);

Chromecast.prototype.options_ = {};

// register the plugin
_videoJs2['default'].options.children.chromecast = {};

_videoJs2['default'].addLanguage('en', {
  'CASTING TO': 'WIEDERGABE AUF'
});

_videoJs2['default'].addLanguage('de', {
  'CASTING TO': 'WIEDERGABE AUF'
});

_videoJs2['default'].addLanguage('it', {
  'CASTING TO': 'PLAYBACK SU'
});

_videoJs2['default'].addLanguage('fr', {
  'CASTING TO': 'CAST EN COURS SUR'
});

var USER_AGENT = window.navigator.userAgent;

_videoJs2['default'].browser.IS_EDGE = /Edge/i.test(USER_AGENT);

Component.registerComponent('Chromecast', Chromecast);
exports['default'] = Chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/chromecast-button":22,"./tech/chromecast":24}],26:[function(require,module,exports){
(function (global){
/**
 * ! videojs-metrics - v0.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-metrics.js
 **/
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _utilsJs = require('./utils.js');

var browser = _interopRequireWildcard(_utilsJs);

var Component = _videoJs2['default'].getComponent('Component');
var Flash = _videoJs2['default'].getComponent('Flash');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Metrics = (function (_Component) {
	_inherits(Metrics, _Component);

	function Metrics(player, options) {
		_classCallCheck(this, Metrics);

		_get(Object.getPrototypeOf(Metrics.prototype), 'constructor', this).call(this, player, options);
		var source = this.player().manifestUrl || this.player().currentSrc();

		this.browserInfo = browser.getBrowser();
		this.pathUrl = source.match(Metrics.URL_MATCH) || ['undefined', 'undefined'];
		this.setupTriggers();
	}

	_createClass(Metrics, [{
		key: 'dispose',
		value: function dispose() {
			this.clearInterval(this.intervalPing);
			this.setupTriggers('off');
		}
	}, {
		key: 'eventHandler',
		value: function eventHandler(evt) {
			var data = {
				type: evt.type
			};

			var skipped = false;

			switch (data.type) {
				case 'error':
					var error = this.player().error();

					error = error || {
						code: -1,
						message: 'cant get error message'
					};
					data.number = error.code;
					data.message = error.message;
					break;
				case 'dispose':
				case 'ended':
					if (data.type === this.oldType) {
						skipped = true;
					}
					data.type = 'stop';
					break;
				case 'loadstart':
					skipped = true;
					break;
				case 'firstplay':
					data.type = 'start';
					this.intervalPing = this.setInterval(this.onPing, Metrics.INTERVAL_PING);
					break;
				case 'waiting':
					data.type = 'buffering';
					break;
				case 'bandwidthIncrease':
				case 'bandwidthDecrease':
					break;
				default:
					break;
			}

			this.oldType = data.type;

			if (skipped) {
				return;
			}

			this.notify(data);
		}
	}, {
		key: 'onPing',
		value: function onPing() {
			this.player().trigger('ping');
		}
	}, {
		key: 'setupTriggers',
		value: function setupTriggers(off) {
			var addOrRemove = off || 'on';

			var events = this.options_.trackEvents;

			var player = this.player();

			var i = events.length - 1;

			for (i; i >= 0; i--) {
				// just call event start only one time
				var firstCall = addOrRemove;

				if (events[i] === 'firstplay' && addOrRemove === 'on') {
					firstCall = 'one';
				}
				player[firstCall](events[i], _videoJs2['default'].bind(this, this.eventHandler));
			}
		}
	}, {
		key: 'pick',
		value: function pick(obj, list, context) {
			var result = {};

			if (typeof list === 'string') {
				list = [list];
			}

			Object.keys(obj).forEach(function (key) {
				if (list.indexOf(key) > -1) {
					result[key] = obj[key];
				}
			}, context);

			return result;
		}
	}, {
		key: 'getRequiredKeys',
		value: function getRequiredKeys(type) {
			return Metrics.BASE_KEYS.concat(Metrics.REQUIRED_KEY[type] || []);
		}
	}, {
		key: 'notify',
		value: function notify(evt) {
			var player = this.player();

			var width = _globalWindow2['default'].innerWidth || _globalDocument2['default'].documentElement.clientWidth || _globalDocument2['default'].body.clientWidth;

			var height = _globalWindow2['default'].innerHeight || _globalDocument2['default'].documentElement.clientHeight || _globalDocument2['default'].body.clientHeight;

			// Merge with default options
			evt['user_id'] = this.options_.user_id;
			evt['fqdn'] = this.pathUrl[1];
			evt['os'] = this.browserInfo.os;
			evt['os_version'] = this.browserInfo.osVersion.toString();
			evt['web_browser'] = this.browserInfo.browser.toString();
			evt['web_browser_version'] = this.browserInfo.version ? this.browserInfo.version.toString() : '';
			evt['resolution_size'] = width + 'x' + height;
			evt['flash_version'] = Flash.version().join(',');
			evt['html5_video'] = player.techName_ ? player.techName_ !== 'FLash' || player.techName_ !== 'DashAs' : 'undefined';
			evt['relative_url'] = this.pathUrl[2];
			evt['timeout'] = false;
			evt['frames_dropped'] = 0;
			try {
				var metrics = player.techGet_('getPlaybackStatistics');

				this.metrics_ = _videoJs2['default'].mergeOptions(this.metrics_, metrics);
				evt['video_bitrate'] = this.metrics_.video.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.video.bandwidth)) : -1;
				evt['audio_bitrate'] = this.metrics_.audio.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.audio.bandwidth)) : -1;
				evt['chunks_from_cdn'] = this.metrics_.p2pweb.chunksFromCDN;
				evt['chunks_from_p2p'] = this.metrics_.p2pweb.chunksFromP2P;
				evt['startup_time'] = this.metrics_.p2pweb.startupTime;

				var pickedData = this.pick(evt, this.getRequiredKeys(evt.type));

				var data = {
					json: pickedData,
					uri: this.options_.url,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				};

				Metrics.xhr(data, function (err) {
					if (err) {
						throw new Error(err.message);
					}
				});
			} catch (e) {
				_videoJs2['default'].log(e);
			}
		}
	}]);

	return Metrics;
})(Component);

Metrics.REQUIRED_KEY = {
	'bandwidthIncrease': ['video_bitrate', 'audio_bitrate'],
	'bandwidthDecrease': ['video_bitrate', 'audio_bitrate'],
	'ping': ['chunks_from_cdn', 'chunks_from_p2p'],
	'buffering': [],
	'error': ['number', 'message'],
	'start': ['video_bitrate', 'audio_bitrate', 'os', 'os_version', 'web_browser', 'web_browser_version', 'resolution_size', 'flash_version', 'html5_video', 'relative_url'],
	'stop': ['timeout', 'frames_dropped']
};

Metrics.URL_MATCH = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/;

Metrics.prototype.pathUrl = '';
Metrics.prototype.oldType = null;
Metrics.prototype.intervalPing = 0;
Metrics.prototype.browserInfo = {};

Metrics.prototype.options_ = {
	'option': true,
	'user_id': 666,
	'method': 'POST',
	'responseType': 'json',
	'timeout': 1000,
	'url': '//stats.afrostream.tv/api/v1/events',
	'trackEvents': ['loadstart', 'ping', 'firstplay', 'ended', 'dispose', 'waiting', 'error', 'bandwidthIncrease', 'bandwidthDecrease']
};

Metrics.INTERVAL_PING = 60000;

Metrics.BASE_KEYS = ['user_id', 'type', 'fqdn'];

Metrics.METRICS_DATA = {
	bandwidth: -1,
	bitrateIndex: 0,
	pendingIndex: '',
	numBitrates: 0,
	bufferLength: 0,
	droppedFrames: 0,
	movingLatency: 0,
	movingDownload: 0,
	movingRatio: 0,
	requestsQueue: 0
};

Metrics.prototype.metrics_ = {
	video: _videoJs2['default'].mergeOptions({}, Metrics.METRICS_DATA),
	audio: _videoJs2['default'].mergeOptions({}, Metrics.METRICS_DATA)
};

Metrics.xhr = _xhr2['default'];

Component.registerComponent('Metrics', Metrics);

// register the plugin
_videoJs2['default'].options.children.metrics = {};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils.js":28,"global/document":1,"global/window":2,"xhr":30}],27:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _metrics = require('./metrics');

var _metrics2 = _interopRequireDefault(_metrics);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _metrics2['default'])(this, options);
};

_videoJs2['default'].plugin('metrics', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./metrics":26}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getBrowser = getBrowser;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

function getBrowser() {
	var data = {};

	var browser = '';

	var version = '';

	var os = '';

	var osVersion = '';

	var parseUserAgent = undefined;

	var prepareData = undefined;

	var renameOsx = undefined;

	var cutSafariVersion = undefined;

	parseUserAgent = function () {
		var userAgent = navigator.userAgent.toLowerCase();

		var browserParts = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

		var osParts = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent);

		if (!userAgent.match(/trident\/7\./)) {
			browser = 'ie';
			version = 11;
		} else if (browserParts && browserParts.length > 2) {
			browser = browserParts[1];
			version = browserParts[2];
		}

		if (osParts && osParts.length > 1) {
			os = osParts[1];
		}

		osVersion = navigator.oscpu || navigator.appName;
	};

	prepareData = function () {
		data.browser = browser;
		data.version = parseInt(version, 10) || '';
		data.os = os;
		data.osVersion = osVersion;
	};

	renameOsx = function () {
		if (os === 'mac') {
			os = 'osx';
		}
	};

	cutSafariVersion = function () {
		if (os === 'safari') {
			version = version.substring(0, 1);
		}
	};

	parseUserAgent();

	// exception rules
	renameOsx();
	cutSafariVersion();

	prepareData();

	return data;
}
},{"global/document":1,"global/window":2}],29:[function(require,module,exports){

},{}],30:[function(require,module,exports){
"use strict";
var window = require("global/window")
var once = require("once")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    var callback = options.callback
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }
    callback = once(callback)

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)

    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function noop() {}

},{"global/window":2,"is-function":31,"once":32,"parse-headers":35,"xtend":36}],31:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],32:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],33:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":31}],34:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],35:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":33,"trim":34}],36:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],37:[function(require,module,exports){
(function (global){
/**
 * ! afrostrream-player - v2.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file afrostream.js
 **/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _techMedia = require('./tech/media');

var _techMedia2 = _interopRequireDefault(_techMedia);

var _techDash = require('./tech/dash');

var _techDash2 = _interopRequireDefault(_techDash);

var _techDashas = require('./tech/dashas');

var _techDashas2 = _interopRequireDefault(_techDashas);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

var _componentControlBar = require('./component/control-bar/');

var _componentControlBar2 = _interopRequireDefault(_componentControlBar);

var _videojsMetrics = require('videojs-metrics');

var _videojsMetrics2 = _interopRequireDefault(_videojsMetrics);

var _videojsChromecast = require('videojs-chromecast');

var _videojsChromecast2 = _interopRequireDefault(_videojsChromecast);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Afrostream = (function (_Component) {
  _inherits(Afrostream, _Component);

  function Afrostream(player, options, ready) {
    _classCallCheck(this, Afrostream);

    _get(Object.getPrototypeOf(Afrostream.prototype), 'constructor', this).call(this, player, options, ready);
    player.one('loadstart', this.onLoadStart.bind(this));
    player.getPlaybackStatistics = this.getPlaybackStatistics.bind(this);
    player.one('fullscreenchange', this.onFullScreenChange.bind(this));
  }

  _createClass(Afrostream, [{
    key: 'getPrefix',
    value: function getPrefix() {
      return (screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation) && 'orientation' in screen;
    }
  }, {
    key: 'onFullScreenChange',
    value: function onFullScreenChange() {
      var prefix = this.getPrefix();

      if (!prefix) {
        return;
      }
      try {

        if (this.player_.isFullscreen()) {
          screen.orientation.lock('landscape');
        } else {
          screen.orientation.unlock();
        }
      } catch (e) {
        _videoJs2['default'].log(e);
      }
    }
  }, {
    key: 'onLoadStart',
    value: function onLoadStart() {
      this.addMediaPlayerHandlers();
    }
  }, {
    key: 'addMediaPlayerHandlers',
    value: function addMediaPlayerHandlers() {
      this.player_.tech_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.player_.tech_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
        return;
      }
      var metrics = this.getCribbedMetricsFor(e.mediaType);
      if (metrics) {
        switch (e.mediaType) {
          case 'video':
            /*jshint sub:true*/
            if (metrics.bandwidth !== this.oldBandwidth) {
              this.player_.trigger(metrics.bandwidth > this.oldBandwidth ? 'bandwidthIncrease' : 'bandwidthDecrease');
              this.oldBandwidth = metrics.bandwidth;
            }
            break;
          case 'p2pweb':
            /*jshint sub:true*/
            if (metrics.chunksFromP2P !== this.oldChunksFromP2P) {
              this.player_.trigger('chunksfromp2p');
              this.oldChunksFromP2P = metrics.chunksFromP2P;
            }
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(manifest, err) {
      if (err) {
        this.player_.error(err);
      }
    }
  }, {
    key: 'audioTracks',
    value: function audioTracks() {
      return this.player_.tech_ && this.player_.techGet_('audioTracks');
    }
  }, {
    key: 'setAudioTrack',
    value: function setAudioTrack(track) {
      return this.player_.tech_ && this.player_.techCall_('setAudioTrack', track);
    }
  }, {
    key: 'videoTracks',
    value: function videoTracks() {
      return this.player_.tech_ && this.player_.techGet_('videoTracks');
    }
  }, {
    key: 'setVideoTrack',
    value: function setVideoTrack(track) {
      return this.player_.tech_ && this.player_.tech_.setVideoTrack(track);
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      return this.player_.tech_ && this.player_.tech_.getPlaybackStatistics();
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      return this.player_.tech_ && this.player_.tech_.getCribbedMetricsFor(type);
    }
  }]);

  return Afrostream;
})(Component);

Afrostream.prototype.options_ = {};

Afrostream.prototype.oldBandwidth = 0;

Afrostream.prototype.oldChunksFromP2P = 0;

Afrostream.prototype.streamInfo = null;

Afrostream.prototype.tech_ = null;

/**
 * add afrostream to videojs childs
 * @type {{}}
 */
_videoJs2['default'].options.children.push('afrostream');

ControlBar.prototype.options_.children.splice(11, 0, ControlBar.prototype.options_.children.splice(1, 1)[0]);

Component.registerComponent('Afrostream', Afrostream);
exports['default'] = Afrostream;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/":38,"./tech/dash":53,"./tech/dashas":54,"./tech/media":55,"videojs-chromecast":23,"videojs-metrics":27}],38:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _trackControlsCaptionTrackButton = require('./track-controls/caption-track-button');

var _trackControlsCaptionTrackButton2 = _interopRequireDefault(_trackControlsCaptionTrackButton);

var _trackControlsAudioTrackButton = require('./track-controls/audio-track-button');

var _trackControlsAudioTrackButton2 = _interopRequireDefault(_trackControlsAudioTrackButton);

var _trackControlsVideoTrackButton = require('./track-controls/video-track-button');

var _trackControlsVideoTrackButton2 = _interopRequireDefault(_trackControlsVideoTrackButton);

var _nextNextVideoButton = require('./next/next-video-button');

var _nextNextVideoButton2 = _interopRequireDefault(_nextNextVideoButton);

var _progressControlLoadProgressSpinner = require('./progress-control/load-progress-spinner');

var _progressControlLoadProgressSpinner2 = _interopRequireDefault(_progressControlLoadProgressSpinner);

var _progressControlMouseThumbnailDisplay = require('./progress-control/mouse-thumbnail-display');

var _progressControlMouseThumbnailDisplay2 = _interopRequireDefault(_progressControlMouseThumbnailDisplay);

},{"./next/next-video-button":40,"./progress-control/load-progress-spinner":42,"./progress-control/mouse-thumbnail-display":43,"./track-controls/audio-track-button":44,"./track-controls/caption-track-button":46,"./track-controls/video-track-button":51}],39:[function(require,module,exports){
(function (global){
/**
 * @file next-video-big-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var ClickableComponent = _videoJs2['default'].getComponent('ClickableComponent');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends NextVideoItem
 * @class NextVideoBigButton
 */

var NextVideoBigButton = (function (_ClickableComponent) {
  _inherits(NextVideoBigButton, _ClickableComponent);

  function NextVideoBigButton(player, options) {
    _classCallCheck(this, NextVideoBigButton);

    options = _videoJs2['default'].mergeOptions(options, player.options_.controlBar.nextVideoButton || {});
    _get(Object.getPrototypeOf(NextVideoBigButton.prototype), 'constructor', this).call(this, player, options);
    if (!options.poster) {
      this.hide();
    }
  }

  /**
   * Create the component's DOM element
   *
   * @param {String=} type Desc
   * @param {Object=} props Desc
   * @return {Element}
   * @method createEl
   */

  _createClass(NextVideoBigButton, [{
    key: 'createEl',
    value: function createEl(type, props, attrs) {
      var el = _get(Object.getPrototypeOf(NextVideoBigButton.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-next-video-big-button',
        tabIndex: -1
      }, attrs);

      return el;
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoBigButton.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoBigButton;
})(ClickableComponent);

NextVideoBigButton.prototype.options_ = {
  selectable: false
};

NextVideoBigButton.prototype.controlText_ = 'Next';

Component.registerComponent('NextVideoBigButton', NextVideoBigButton);

/**
 * Inject Next button in core player
 * @type {{}}
 */
_videoJs2['default'].options.children.push('nextVideoBigButton');

exports['default'] = NextVideoBigButton;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],40:[function(require,module,exports){
(function (global){
/**
 * @file next-video-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _nextVideoItem = require('./next-video-item');

var _nextVideoItem2 = _interopRequireDefault(_nextVideoItem);

var _nextVideoBigButton = require('./next-video-big-button');

var _nextVideoBigButton2 = _interopRequireDefault(_nextVideoBigButton);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');
/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class NextVideoButton
 */

var NextVideoButton = (function (_MenuButton) {
  _inherits(NextVideoButton, _MenuButton);

  function NextVideoButton(player) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, NextVideoButton);

    _get(Object.getPrototypeOf(NextVideoButton.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Create the list of menu items. Specific to each subclass.
   *
   * @method createItems
   */

  _createClass(NextVideoButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      if (!this.options_.poster) {
        this.hide();
        return items;
      }

      var item = new _nextVideoItem2['default'](this.player_, {
        label: 'Next',
        selectable: false,
        poster: this.options_.poster
      });
      items.push(item);

      return items;
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-next-video-button ' + _get(Object.getPrototypeOf(NextVideoButton.prototype), 'buildCSSClass', this).call(this);
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoButton.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoButton;
})(MenuButton);

NextVideoButton.prototype.controlText_ = 'Next video';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 1, 0, 'nextVideoButton');

Component.registerComponent('NextVideoButton', NextVideoButton);
exports['default'] = NextVideoButton;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./next-video-big-button":39,"./next-video-item":41}],41:[function(require,module,exports){
(function (global){
/**
 * @file next-video-item.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuItem
 * @class NextVideoItem
 */

var NextVideoItem = (function (_MenuItem) {
  _inherits(NextVideoItem, _MenuItem);

  function NextVideoItem(player, options) {
    _classCallCheck(this, NextVideoItem);

    _get(Object.getPrototypeOf(NextVideoItem.prototype), 'constructor', this).call(this, player, options);
    this.setSrc(options.poster);
  }

  /**
   * Create the component's DOM element
   *
   * @param {String=} type Desc
   * @param {Object=} props Desc
   * @return {Element}
   * @method createEl
   */

  _createClass(NextVideoItem, [{
    key: 'createEl',
    value: function createEl(type, props, attrs) {
      var el = _get(Object.getPrototypeOf(NextVideoItem.prototype), 'createEl', this).call(this, type, props, attrs);

      this.fallbackImg_ = _videoJs2['default'].createEl(_videoJs2['default'].browser.BACKGROUND_SIZE_SUPPORTED ? 'div' : 'img', {
        className: 'thumb-tile_thumb'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(url) {
      var backgroundImage = undefined;

      if (!_videoJs2['default'].browser.BACKGROUND_SIZE_SUPPORTED) {
        this.fallbackImg_.src = url;
      } else {
        backgroundImage = '';
        if (url) {
          backgroundImage = 'url("' + url + '")';
        }

        this.fallbackImg_.style.backgroundImage = backgroundImage;
      }
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoItem.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoItem;
})(MenuItem);

Component.registerComponent('NextVideoItem', NextVideoItem);
exports['default'] = NextVideoItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(require,module,exports){
(function (global){
/**
 * @file load-progress-spinner.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var LoadProgressBar = _videoJs2['default'].getComponent('LoadProgressBar');

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LoadProgressSpinner
 */

var LoadProgressSpinner = (function (_LoadProgressBar) {
  _inherits(LoadProgressSpinner, _LoadProgressBar);

  function LoadProgressSpinner(player, options) {
    _classCallCheck(this, LoadProgressSpinner);

    _get(Object.getPrototypeOf(LoadProgressSpinner.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */

  _createClass(LoadProgressSpinner, [{
    key: 'createEl',
    value: function createEl() {
      var el = _videoJs2['default'].createEl('div', {
        className: 'vjs-load-progress-spinner',
        innerHTML: '<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg>'
      });

      this.circle = _videoJs2['default'].createEl('svg', {
        className: 'circular',
        innerHTML: '<circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/>'
      }, {
        viewBox: '25 25 50 50'
      });

      //el.appendChild(this.circle);
      return el;
    }

    /**
     * Update progress bar
     *
     * @method update
     */
  }, {
    key: 'update',
    value: function update() {
      var buffered = this.player_.buffered();
      var duration = this.player_.duration();
      var bufferedEnd = this.player_.bufferedEnd();
      var children = this.el_.children;
      var rayon = this.options_.rayon;

      // get the percent width of a time compared to the total end
      //let percentify = function (time, end) {
      //  let percent = (time / end) || 0; // no NaN
      //  percent = ((percent >= 1 ? 1 : percent) * 100);
      //
      //  let c = Math.PI * (rayon * 2);
      //  let pct = ((100 - percent) / 200) * c;
      //  return pct;
      //};

      // get the percent width of a time compared to the total end
      var percentify = function percentify(time, end) {
        var percent = time / end || 0; // no NaN
        return (percent >= 1 ? 1 : percent) * 125;
      };

      // update the width of the progress bar
      var svg = this.getFirstChild(this.el_);
      if (svg) {
        var i = buffered.length - 1;
        var start = buffered.start(i);
        var end = buffered.end(i);
        var percent = percentify(end - start, 30);
        var firstSvgChild = this.getFirstChild(svg);
        if (firstSvgChild) {
          var stroke = this.getFirstChild(firstSvgChild);
          if (stroke) {
            stroke.style.strokeDasharray = [percent, 125];
          }
        }
      }

      //for (let i = 0; i < buffered.length; i++) {
      //  let start = buffered.start(i);
      //  let end = buffered.end(i);
      //
      //  // set the percent based on the width of the progress bar (bufferedEnd)
      //  part.style.left = percentify(start, bufferedEnd);
      //  part.style.width = percentify(end - start, bufferedEnd);
      //}
      //
      //// remove unused buffered range elements
      //for (let i = children.length; i > buffered.length; i--) {
      //  this.el_.removeChild(children[i - 1]);
      //}
    }
  }, {
    key: 'getFirstChild',
    value: function getFirstChild(el) {
      var firstChild = el.firstChild;
      while (firstChild != null && firstChild.nodeType == 3) {
        // skip TextNodes
        firstChild = firstChild.nextSibling;
      }
      return firstChild;
    }
  }]);

  return LoadProgressSpinner;
})(LoadProgressBar);

LoadProgressSpinner.prototype.options_ = {
  rayon: 20
};

Component.registerComponent('LoadProgressSpinner', LoadProgressSpinner);

//Replace videojs CaptionButton child with this one
_videoJs2['default'].options.children.splice(3, 1, 'loadProgressSpinner');

exports['default'] = LoadProgressSpinner;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
(function (global){
/**
 * @file mouse-thumbnail-display.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MouseTimeDisplay = _videoJs2['default'].getComponent('MouseTimeDisplay');
var SeekBar = _videoJs2['default'].getComponent('SeekBar');

/**
 * The Mouse Time Display component shows the time you will seek to
 * when hovering over the progress bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MouseThumbnailDisplay
 */

var MouseThumbnailDisplay = (function (_MouseTimeDisplay) {
  _inherits(MouseThumbnailDisplay, _MouseTimeDisplay);

  function MouseThumbnailDisplay(player, options) {
    _classCallCheck(this, MouseThumbnailDisplay);

    _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'constructor', this).call(this, player, options);
  }

  _createClass(MouseThumbnailDisplay, [{
    key: 'createLoader',
    value: function createLoader(src) {
      this.destroyLoader();

      this.img = new Image();
      this.img.onload = this.handleComplete.bind(this);
      this.img.onerror = this.handleError.bind(this);
      this.img.src = src;
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      var url = this.destroyLoader();
      if (_videoJs2['default'].hasClass(this.fallbackImg_, 'vjs-hidden')) {
        _videoJs2['default'].removeClass(this.fallbackImg_, 'vjs-hidden');
      }
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      var url = this.destroyLoader();
      _videoJs2['default'].log('thumbnails : next error ' + url);
      if (this.itemIndex = 1) {
        this.dispose();
      }
    }
  }, {
    key: 'destroyLoader',
    value: function destroyLoader() {
      var imgSrouce = '';
      if (this.img) {
        imgSrouce = this.img.src;
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
      return imgSrouce;
    }
  }, {
    key: 'extractAssetUri',
    value: function extractAssetUri() {
      var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var currentSrc = this.player_.currentSrc();
      var urlInfo = _videoJs2['default'].parseUrl(currentSrc);
      var pathname = urlInfo.pathname.replace(/\/([a-z0-9\/\._-]{16}\.[is]sml?)+\/([a-z0-9\/\._-]*\.(mpd|m3u8)?)$/gi, '');
      var host = this.options_.host || urlInfo.host;
      var fullPah = urlInfo.protocol + '//' + host + pathname + '/frames/map-{index}.jpg';
      var current = fullPah.replace('{index}', this.itemIndex);
      var next = fullPah.replace('{index}', this.itemIndex + 1);
      if (this.itemIndex === 1) {
        this.createLoader(current);
      }
      if (this.itemIndex < max) {
        this.createLoader(next);
      }

      return current;
    }

    /**
     * Create the component's DOM element
     *
     * @return {Element}
     * @method createEl
     */
  }, {
    key: 'createEl',
    value: function createEl() {
      var el = _videoJs2['default'].createEl('div', {
        className: 'vjs-thumbnail-display'
      });

      this.fallbackImg_ = _videoJs2['default'].createEl('div', {
        className: 'vjs-thumbnail-display_thumb vjs-hidden'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'update',
    value: function update(newTime, position) {
      _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'update', this).call(this, newTime, position);
      var timeInterval = 60;
      var spriteSize = {
        w: 600,
        h: 330
      };
      var spritesPerRow = 5;
      var spritesPerCol = 5;

      var sheetWidth = spriteSize.w / spritesPerRow;
      var sheetHeight = spriteSize.h / spritesPerCol;

      if (this.player_.isFullscreen()) {
        sheetWidth = 200;
        sheetHeight = 112;
      }

      var spritesPerSheet = spritesPerRow * spritesPerCol;
      var secondsPerSheet = timeInterval * spritesPerSheet;

      var index = Math.max(1, Math.ceil(newTime / secondsPerSheet));
      var duration = this.player_.duration();
      var maxItem = 1;
      if (duration) {
        maxItem = Math.ceil(duration / secondsPerSheet);
      }
      var stripedTime = newTime - (index - 1) * secondsPerSheet;
      var sheetIndex = Math.floor(stripedTime / timeInterval);
      var x = Math.floor(sheetIndex % 5 * sheetWidth);
      var y = Math.floor(sheetIndex / spritesPerCol) * sheetHeight;
      if (this.itemIndex !== index) {
        this.itemIndex = index;
        var url = this.extractAssetUri(maxItem);
        var backgroundImage = 'url("' + url + '")';
        this.fallbackImg_.style.backgroundImage = backgroundImage;
      }

      this.fallbackImg_.style.backgroundPositionX = -x + 'px';
      this.fallbackImg_.style.backgroundPositionY = -y + 'px';
    }
  }]);

  return MouseThumbnailDisplay;
})(MouseTimeDisplay);

MouseThumbnailDisplay.prototype.itemIndex = 0;
MouseThumbnailDisplay.prototype.options_ = {
  host: null
};
//Push videojs SeekBar child with this one
SeekBar.prototype.options_.children.splice(1, 1, 'mouseThumbnailDisplay');
Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
exports['default'] = MouseThumbnailDisplay;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
(function (global){
/**
 * @file audio-track-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _audioTrackMenuItem = require('./audio-track-menu-item');

var _audioTrackMenuItem2 = _interopRequireDefault(_audioTrackMenuItem);

var _offAudioTrackMenuItem = require('./off-audio-track-menu-item');

var _offAudioTrackMenuItem2 = _interopRequireDefault(_offAudioTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

/**
 * The base class for buttons that toggle specific audio track types (e.g. description)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class AudioTrackButton
 */

var AudioTrackButton = (function (_MenuButton) {
  _inherits(AudioTrackButton, _MenuButton);

  function AudioTrackButton(player, options) {
    _classCallCheck(this, AudioTrackButton);

    _get(Object.getPrototypeOf(AudioTrackButton.prototype), 'constructor', this).call(this, player, options);

    var tracks = this.player_.audioTracks();

    if (!tracks) {
      return;
    }

    var updateHandler = this.update.bind(this);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */

  _createClass(AudioTrackButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-audio-button ' + _get(Object.getPrototypeOf(AudioTrackButton.prototype), 'buildCSSClass', this).call(this);
    }

    // Create a menu item for each text track
  }, {
    key: 'createItems',
    value: function createItems() {
      var items = [];
      items.push(new MenuItem(this.player_, {
        label: this.controlText_,
        selectable: false
      }));

      var tracks = this.player_.audioTracks();

      if (!tracks) {
        return items;
      }

      if (tracks.length < 2) {
        this.hide();
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new _audioTrackMenuItem2['default'](this.player_, {
            // MenuItem is selectable
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }
  }]);

  return AudioTrackButton;
})(MenuButton);

AudioTrackButton.prototype.kind_ = 'audio';
AudioTrackButton.prototype.controlText_ = 'Audio Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'audioTrackButton');

Component.registerComponent('AudioTrackButton', AudioTrackButton);
exports['default'] = AudioTrackButton;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-track-menu-item":45,"./off-audio-track-menu-item":48}],45:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var AudioTrackMenuItem = (function (_MenuItem) {
  _inherits(AudioTrackMenuItem, _MenuItem);

  function AudioTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, AudioTrackMenuItem);

    var track = options['track'];
    var tracks = player.audioTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['enabled'] === true;

    _get(Object.getPrototypeOf(AudioTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */

  _createClass(AudioTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
      var tracks = this.player_.audioTracks();

      _get(Object.getPrototypeOf(AudioTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track['enabled'] = track === this.track;
      }
    }

    /**
     * Handle text track change
     *
     * @method handleTracksChange
     */
  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      this.selected(this.track['enabled']);
    }
  }]);

  return AudioTrackMenuItem;
})(MenuItem);

Component.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
exports['default'] = AudioTrackMenuItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],46:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

var _offCaptionTrackMenuItem = require('./off-caption-track-menu-item');

var _offCaptionTrackMenuItem2 = _interopRequireDefault(_offCaptionTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var CaptionsButton = _videoJs2['default'].getComponent('CaptionsButton');
var TextTrackMenuItem = _videoJs2['default'].getComponent('TextTrackMenuItem');

var CaptionTrackButton = (function (_CaptionsButton) {
  _inherits(CaptionTrackButton, _CaptionsButton);

  function CaptionTrackButton(options, ready) {
    _classCallCheck(this, CaptionTrackButton);

    _get(Object.getPrototypeOf(CaptionTrackButton.prototype), 'constructor', this).call(this, options, ready);
  }

  // Create a menu item for each text track

  _createClass(CaptionTrackButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new _offCaptionTrackMenuItem2['default'](this.player_, { 'kind': this.kind_, 'mode': 'hidden' }));

      var tracks = this.player_.textTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === this.kind_) {
          items.push(new _captionTrackMenuItem2['default'](this.player_, {
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-captions-extended-button ' + _get(Object.getPrototypeOf(CaptionTrackButton.prototype), 'buildCSSClass', this).call(this);
    }
  }]);

  return CaptionTrackButton;
})(CaptionsButton);

CaptionTrackButton.prototype.kind_ = 'captions';
CaptionTrackButton.prototype.controlText_ = 'Captions';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 1, 'captionTrackButton');

Component.registerComponent('CaptionTrackButton', CaptionTrackButton);
exports['default'] = CaptionTrackButton;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":47,"./off-caption-track-menu-item":49}],47:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var CaptionTrackMenuItem = (function (_MenuItem) {
  _inherits(CaptionTrackMenuItem, _MenuItem);

  function CaptionTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, CaptionTrackMenuItem);

    var track = options['track'];
    var tracks = player.textTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['mode'] === 'showing';
    _get(Object.getPrototypeOf(CaptionTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      tracks.addEventListener('change', this.handleTracksChange.bind(this));
      this.on('dispose', function () {
        tracks.removeEventListener('change', this.handleTracksChange.bind(this));
      });
    }

    // iOS7 doesn't dispatch change events to TextTrackLists when an
    // associated track's mode changes. Without something like
    // Object.observe() (also not present on iOS7), it's not
    // possible to detect changes to the mode attribute and polyfill
    // the change event. As a poor substitute, we manually dispatch
    // change events whenever the controls modify the mode.
    if (tracks && tracks.onchange === undefined) {
      (function () {
        var event = undefined;

        _this.on(['tap', 'click'], function () {
          if (typeof window.Event !== 'object') {
            // Android 2.3 throws an Illegal Constructor error for window.Event
            try {
              event = new window.Event('change');
            } catch (err) {}
          }

          if (!event) {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
          }

          tracks.dispatchEvent(event);
        });
      })();
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */

  _createClass(CaptionTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
      var tracks = this.player_.textTracks();

      _get(Object.getPrototypeOf(CaptionTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        if (track['kind'] !== kind) {
          continue;
        }

        if (track === this.track) {
          track['mode'] = 'showing';
        } else {
          track['mode'] = 'hidden';
        }
      }
    }

    /**
     * Handle text track change
     *
     * @method handleTracksChange
     */
  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      this.selected(this.track['mode'] === 'showing');
    }
  }]);

  return CaptionTrackMenuItem;
})(MenuItem);

Component.registerComponent('CaptionTrackMenuItem', CaptionTrackMenuItem);
exports['default'] = CaptionTrackMenuItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],48:[function(require,module,exports){
(function (global){
/**
 * @file off-audio-track-menu-item.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _audioTrackMenuItem = require('./audio-track-menu-item');

var _audioTrackMenuItem2 = _interopRequireDefault(_audioTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
//const AudioTrackMenuItem = videojs.getComponent('AudioTrackMenuItem');

/**
 * A special menu item for turning of a specific type of audio track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends AudioTrackMenuItem
 * @class OffAudioTrackMenuItem
 */

var OffAudioTrackMenuItem = (function (_AudioTrackMenuItem) {
  _inherits(OffAudioTrackMenuItem, _AudioTrackMenuItem);

  function OffAudioTrackMenuItem(player, options) {
    _classCallCheck(this, OffAudioTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'] + ' off',
      'default': false,
      'enabled': false
    };

    // MenuItem is selectable
    options['selectable'] = true;

    _get(Object.getPrototypeOf(OffAudioTrackMenuItem.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Handle text track change
   *
   * @param {Object} event Event object
   * @method handleTracksChange
   */

  _createClass(OffAudioTrackMenuItem, [{
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      var tracks = this.player().audioTracks();
      var selected = true;

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track['kind'] === 'main' && track['enabled']) {
          selected = false;
          break;
        }
      }
      this.selected(selected);
    }
  }]);

  return OffAudioTrackMenuItem;
})(_audioTrackMenuItem2['default']);

Component.registerComponent('OffAudioTrackMenuItem', OffAudioTrackMenuItem);
exports['default'] = OffAudioTrackMenuItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-track-menu-item":45}],49:[function(require,module,exports){
(function (global){
/**
 * @file caption-track-button-off.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
/**
 * A special menu item for turning of a specific type of text track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends TextTrackMenuItem
 * @class OffTextTrackMenuItem
 */

var OffCaptionTrackMenuItem = (function (_CaptionTrackMenuItem) {
  _inherits(OffCaptionTrackMenuItem, _CaptionTrackMenuItem);

  function OffCaptionTrackMenuItem(player, options) {
    _classCallCheck(this, OffCaptionTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'] + ' off',
      'default': false,
      'mode': 'hidden'
    };

    // MenuItem is selectable
    options['selectable'] = true;

    _get(Object.getPrototypeOf(OffCaptionTrackMenuItem.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Handle text track change
   *
   * @param {Object} event Event object
   * @method handleTracksChange
   */

  _createClass(OffCaptionTrackMenuItem, [{
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      var tracks = this.player().textTracks();
      var selected = true;

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track['kind'] === this.track['kind'] && track['mode'] === 'showing') {
          selected = false;
          break;
        }
      }

      this.selected(selected);
    }
  }]);

  return OffCaptionTrackMenuItem;
})(_captionTrackMenuItem2['default']);

Component.registerComponent('OffCaptionTrackMenuItem', OffCaptionTrackMenuItem);
exports['default'] = OffCaptionTrackMenuItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":47}],50:[function(require,module,exports){
(function (global){
/**
 * @file off-video-track-menu-item.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');

/**
 * A special menu item for turning of a specific type of video track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends VideoTrackMenuItem
 * @class OffVideoTrackMenuItem
 */

var OffVideoTrackMenuItem = (function (_VideoTrackMenuItem) {
  _inherits(OffVideoTrackMenuItem, _VideoTrackMenuItem);

  function OffVideoTrackMenuItem(player, options) {
    _classCallCheck(this, OffVideoTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'],
      'default': false,
      'selected': false
    };

    // MenuItem is selectable
    options['selectable'] = true;

    _get(Object.getPrototypeOf(OffVideoTrackMenuItem.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Handle text track change
   *
   * @param {Object} event Event object
   * @method handleTracksChange
   */

  _createClass(OffVideoTrackMenuItem, [{
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      var tracks = this.player().videoTracks();
      var selected = true;

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track['kind'] === 'main' && track['selected']) {
          selected = false;
          break;
        }
      }
      this.selected(selected);
    }
  }]);

  return OffVideoTrackMenuItem;
})(_videoTrackMenuItem2['default']);

Component.registerComponent('OffVideoTrackMenuItem', OffVideoTrackMenuItem);
exports['default'] = OffVideoTrackMenuItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./video-track-menu-item":52}],51:[function(require,module,exports){
(function (global){
/**
 * @file video-track-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

var _offVideoTrackMenuItem = require('./off-video-track-menu-item');

var _offVideoTrackMenuItem2 = _interopRequireDefault(_offVideoTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

/**
 * The base class for buttons that toggle specific video track types (e.g. commentary)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class VideoTrackButton
 */

var VideoTrackButton = (function (_MenuButton) {
  _inherits(VideoTrackButton, _MenuButton);

  function VideoTrackButton(player, options) {
    _classCallCheck(this, VideoTrackButton);

    _get(Object.getPrototypeOf(VideoTrackButton.prototype), 'constructor', this).call(this, player, options);

    var tracks = this.player_.videoTracks();

    if (!tracks) {
      return;
    }

    var updateHandler = this.update.bind(this);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */

  _createClass(VideoTrackButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-video-button ' + _get(Object.getPrototypeOf(VideoTrackButton.prototype), 'buildCSSClass', this).call(this);
    }

    // Create a menu item for each text track
  }, {
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new MenuItem(this.player_, {
        'label': 'Quality',
        selectable: false
      }));
      // Add an OFF menu item to turn all tracks off
      items.push(new _offVideoTrackMenuItem2['default'](this.player_, {
        'kind': 'Auto'
      }));

      var tracks = this.player_.videoTracks();

      if (!tracks) {
        return items;
      }

      if (tracks.length < 2) {
        return [];
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new _videoTrackMenuItem2['default'](this.player_, {
            // MenuItem is selectable
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }
  }]);

  return VideoTrackButton;
})(MenuButton);

VideoTrackButton.prototype.kind_ = 'video';
VideoTrackButton.prototype.controlText_ = 'Quality Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'videoTrackButton');

Component.registerComponent('VideoTrackButton', VideoTrackButton);
exports['default'] = VideoTrackButton;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./off-video-track-menu-item":50,"./video-track-menu-item":52}],52:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var VideoTrackMenuItem = (function (_MenuItem) {
  _inherits(VideoTrackMenuItem, _MenuItem);

  /**
   * LABELS
   *
   * @static
   */

  function VideoTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, VideoTrackMenuItem);

    var track = options['track'];
    var tracks = player.videoTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['selected'] === true;

    _get(Object.getPrototypeOf(VideoTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */

  _createClass(VideoTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
      var tracks = this.player_.videoTracks();

      _get(Object.getPrototypeOf(VideoTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track['selected'] = track === this.track;
      }
    }

    /**
     * Handle text track change
     *
     * @method handleTracksChange
     */
  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      this.selected(this.track['selected']);
    }
  }]);

  return VideoTrackMenuItem;
})(MenuItem);

Component.registerComponent('VideoTrackMenuItem', VideoTrackMenuItem);
exports['default'] = VideoTrackMenuItem;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],53:[function(require,module,exports){
(function (global){
/**
 * @file dash.js
 * DASH Media Controller - Wrapper for HTML5 Media API
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

var _streamrootDash = require('streamroot-dash');

var _streamrootDash2 = _interopRequireDefault(_streamrootDash);

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');
var Html5 = _videoJs2['default'].getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dash = (function (_Html5) {
  _inherits(Dash, _Html5);

  function Dash(options, ready) {
    var _this = this;

    _classCallCheck(this, Dash);

    _get(Object.getPrototypeOf(Dash.prototype), 'constructor', this).call(this, options, ready);

    var tTracks = this.textTracks();

    if (tTracks) {
      (function () {
        var tTracksChangeHandler = _this.handleTracksChange.bind(_this);

        tTracks.addEventListener('change', tTracksChangeHandler);
        _this.on('dispose', function () {
          tTracks.removeEventListener('change', tTracksChangeHandler);
        });
      })();
    }

    var aTracks = this.audioTracks();

    if (aTracks) {
      (function () {
        var aTracksChangeHandler = _this.handleAudioTracksChange.bind(_this);

        aTracks.addEventListener('change', aTracksChangeHandler);
        _this.on('dispose', function () {
          aTracks.removeEventListener('change', aTracksChangeHandler);
        });
      })();
    }

    var vTracks = this.videoTracks();

    if (vTracks) {
      (function () {
        var vTracksChangeHandler = _this.handleVideoTracksChange.bind(_this);

        vTracks.addEventListener('change', vTracksChangeHandler);
        _this.on('dispose', function () {
          vTracks.removeEventListener('change', vTracksChangeHandler);
        });
      })();
    }
  }

  /**
   * Detect if source is Live
   * TODO detect with other method based on duration Infinity
   * @returns {boolean}
   */

  _createClass(Dash, [{
    key: 'isDynamic',
    value: function isDynamic() {
      var isDynamic = false;
      if (!this.playbackInitialized) {
        return isDynamic;
      }
      try {
        isDynamic = this.mediaPlayer_.time();
      } catch (e) {
        _videoJs2['default'].log(e);
      }
      return isDynamic;
    }
  }, {
    key: 'duration',
    value: function duration() {
      var duration = _get(Object.getPrototypeOf(Dash.prototype), 'duration', this).call(this);
      //FIXME WTF for detect live we should get duration to Infinity
      return this.isDynamic() ? Infinity : duration;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      if (this.playbackInitialized && this.mediaPlayer_) {
        // this.mediaPlayer_.enableBufferOccupancyABR(false);
        this.mediaPlayer_.setQualityFor('video', 0);
        // this.one('seeked', ()=> {
        //   this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);
        // });
      }
      _get(Object.getPrototypeOf(Dash.prototype), 'setCurrentTime', this).call(this, seconds);
    }

    /**
     * Set video
     *
     * @param {Object=} src Source object
     * @method setSrc
     */
  }, {
    key: 'src',
    value: function src(_src) {
      var _this2 = this;

      if (!_src) {
        return this.el_.src;
      }

      this.isReady_ = false;
      this.featuresNativeTextTracks = Html5.supportsNativeTracks('text');
      this.featuresNativeAudioTracks = Html5.supportsNativeTracks('audio');
      this.featuresNativeVideoTracks = Html5.supportsNativeTracks('video');
      this.keySystemOptions_ = this.buildDashJSProtData(this.options_.protData);
      // Save the context after the first initialization for subsequent instances
      this.context_ = this.context_ || {};
      // But make a fresh MediaPlayer each time the sourceHandler is used
      this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();

      // initializing streamroot-dash wrapper here
      // p2p configuration object must be passed to it
      if (this.options_.streamroot && this.options_.streamroot.p2pConfig) {
        this.dashjsWrapper = new _streamrootDash2['default'](this.mediaPlayer_, this._el, this.options_.streamroot.p2pConfig, this.options_.streamroot.liveDelay || 30);
      }

      // Must run controller before these two lines or else there is no
      // element to bind to.
      this.mediaPlayer_.initialize();
      this.mediaPlayer_.attachView(this.el());

      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, this.onTextTracksAdded.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, this.onProgress.bind(this));
      // Dash.js autoplays by default
      if (!this.player_.options().autoplay) {
        this.mediaPlayer_.setAutoPlay(false);
      }

      this.mediaPlayer_.setInitialMediaSettingsFor('audio', this.options_.inititalMediaSettings);
      this.mediaPlayer_.setInitialMediaSettingsFor('video', this.options_.inititalMediaSettings);
      this.mediaPlayer_.setTrackSwitchModeFor('audio', 'neverReplace'); //alwaysReplace
      this.mediaPlayer_.setTrackSwitchModeFor('video', 'neverReplace'); //alwaysReplace

      this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
      this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
      this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);

      this.mediaPlayer_.setLiveDelayFragmentCount(this.options_.liveFragmentCount);
      this.mediaPlayer_.setInitialBitrateFor('video', this.options_.initialBitrate);
      // this.mediaPlayer_.setSelectionModeForInitialTrack(this.options_.initialSelectionMode);
      this.mediaPlayer_.setBufferToKeep(this.options_.buffer.bufferToKeep);
      this.mediaPlayer_.setBufferPruningInterval(this.options_.buffer.bufferPruningInterval);
      this.mediaPlayer_.setStableBufferTime(this.options_.buffer.minBufferTime);
      this.mediaPlayer_.setBufferTimeAtTopQuality(this.options_.buffer.bufferTimeAtTopQuality);
      this.mediaPlayer_.setBufferTimeAtTopQualityLongForm(this.options_.buffer.bufferTimeAtTopQualityLongForm);
      this.mediaPlayer_.setLongFormContentDurationThreshold(this.options_.buffer.longFormContentDurationThreshold);
      this.mediaPlayer_.setRichBufferThreshold(this.options_.buffer.longFormContentDurationThreshold);
      this.mediaPlayer_.setBandwidthSafetyFactor(this.options_.buffer.bandwidthSafetyFactor);
      this.mediaPlayer_.setAbandonLoadTimeout(this.options_.buffer.abandonLoadTimeout);
      this.mediaPlayer_.setFragmentLoaderRetryAttempts(this.options_.buffer.fragmentLoaderRetryAttempts);
      this.mediaPlayer_.setFragmentLoaderRetryInterval(this.options_.buffer.fragmentLoaderRetryInterval);
      // ReplaceMediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
      // ReplaceMediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
      //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video});

      this.player_.trigger('loadstart');
      // Fetches and parses the manifest - WARNING the callback is non-standard "error-last" style
      this.ready(function () {
        _this2.mediaPlayer_.retrieveManifest(_src, _this2.initializeDashJS.bind(_this2));
      });
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(manifest, err) {
      if (this.playbackInitialized) {
        return;
      }
      this.playbackInitialized = true;

      if (err) {
        this.player_.error(err);
      }

      this.trigger(_dashjs.MediaPlayer.events.STREAM_INITIALIZED);

      var bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');
      var videoDashTracks = this.mediaPlayer_.getTracksFor('video');
      var autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();

      var defaultAudio = this.mediaPlayer_.getInitialMediaSettingsFor('audio');
      var defaultVideo = this.mediaPlayer_.getInitialMediaSettingsFor('video');
      var initialVideoBitrate = this.mediaPlayer_.getInitialBitrateFor('video');

      var i = undefined;

      for (i = 0; i < audioDashTracks.length; i++) {
        var track = audioDashTracks[i];
        track.label = track.label || track.lang;
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === (defaultAudio && this.options_.inititalMediaSettings.lang === defaultAudio.lang && defaultAudio.lang || this.options_.inititalMediaSettings.lang);
      }

      for (i = 0; i < videoDashTracks.length; i++) {
        var track = videoDashTracks[i];
        var bitrateList = track.bitrateList;
        for (var j = 0; j < bitrateList.length; j++) {
          var bitRateInfo = bitrateList[j] / 1000;
          var label = Dash.qualityLabels[j] || bitRateInfo;
          var bitRateTrack = this.addVideoTrack('main', label, bitRateInfo);
          bitRateTrack.selected = !autoSwitch && initialVideoBitrate === bitRateInfo;
        }
      }
    }
  }, {
    key: 'onProgress',
    value: function onProgress(e) {
      this.trigger('progress');
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
        return;
      }
      var metrics = this.getCribbedMetricsFor(e.mediaType);
      if (metrics) {
        this.metrics_[e.mediaType] = _videoJs2['default'].mergeOptions(this.metrics_[e.mediaType], metrics);
        //this.trigger(videojs.obj.copy(e));
        var metricsChangeEvent = {
          type: _dashjs.MediaPlayer.events.METRIC_CHANGED,
          mediaType: e.mediaType
        };
        this.trigger(e);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      var metrics = this.mediaPlayer_.getMetricsFor(type),
          dashMetrics = this.mediaPlayer_.getDashMetrics(),
          repSwitch = undefined,
          bufferLevel = undefined,
          httpRequests = undefined,
          droppedFramesMetrics = undefined,
          bitrateIndexValue = undefined,
          bandwidthValue = undefined,
          pendingValue = undefined,
          numBitratesValue = undefined,
          bufferLengthValue = 0,
          point = undefined,
          movingLatency = {},
          movingDownload = {},
          movingRatio = {},
          droppedFramesValue = 0,
          requestsQueue = undefined,
          fillmoving = function fillmoving(type, Requests) {
        var requestWindow, downloadTimes, latencyTimes, durationTimes;

        requestWindow = Requests.slice(-20).filter(function (req) {
          return req.responsecode >= 200 && req.responsecode < 300 && !!req._mediaduration && req.type === "MediaSegment" && req._stream === type;
        }).slice(-4);
        if (requestWindow.length > 0) {

          latencyTimes = requestWindow.map(function (req) {
            return Math.abs(req.tresponse.getTime() - req.trequest.getTime()) / 1000;
          });

          movingLatency[type] = {
            average: latencyTimes.reduce(function (l, r) {
              return l + r;
            }) / latencyTimes.length,
            high: latencyTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: latencyTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: latencyTimes.length
          };

          downloadTimes = requestWindow.map(function (req) {
            return Math.abs(req._tfinish.getTime() - req.tresponse.getTime()) / 1000;
          });

          movingDownload[type] = {
            average: downloadTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length,
            high: downloadTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: downloadTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: downloadTimes.length
          };

          durationTimes = requestWindow.map(function (req) {
            return req._mediaduration;
          });

          movingRatio[type] = {
            average: durationTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length / movingDownload[type].average,
            high: durationTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }) / movingDownload[type].low,
            low: durationTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }) / movingDownload[type].high,
            count: durationTimes.length
          };
        }
      };

      if (metrics && dashMetrics) {
        repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
        bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);
        httpRequests = dashMetrics.getHttpRequests(metrics);
        droppedFramesMetrics = dashMetrics.getCurrentDroppedFrames(metrics);
        requestsQueue = dashMetrics.getRequestsQueue(metrics);

        fillmoving("video", httpRequests);
        fillmoving("audio", httpRequests);

        var streamIdx = this.streamInfo ? this.streamInfo.index : 0;

        if (repSwitch !== null) {
          bitrateIndexValue = dashMetrics.getIndexForRepresentation(repSwitch.to, streamIdx);
          bandwidthValue = dashMetrics.getBandwidthForRepresentation(repSwitch.to, streamIdx);
          bandwidthValue = bandwidthValue / 1000;
          bandwidthValue = Math.round(bandwidthValue);
        }

        numBitratesValue = dashMetrics.getMaxIndexForBufferType(type, streamIdx);

        if (bufferLevel !== null) {
          bufferLengthValue = bufferLevel.toPrecision(5);
        }

        if (droppedFramesMetrics !== null) {
          droppedFramesValue = droppedFramesMetrics.droppedFrames;
        }

        if (isNaN(bandwidthValue) || bandwidthValue === undefined) {
          bandwidthValue = 0;
        }

        if (isNaN(bitrateIndexValue) || bitrateIndexValue === undefined) {
          bitrateIndexValue = 0;
        }

        if (isNaN(numBitratesValue) || numBitratesValue === undefined) {
          numBitratesValue = 0;
        }

        if (isNaN(bufferLengthValue) || bufferLengthValue === undefined) {
          bufferLengthValue = 0;
        }

        pendingValue = this.mediaPlayer_.getQualityFor(type);

        return {
          bandwidth: bandwidthValue,
          bitrateIndex: bitrateIndexValue + 1,
          pendingIndex: pendingValue !== bitrateIndexValue ? "(-> " + (pendingValue + 1) + ")" : "",
          numBitrates: numBitratesValue,
          bufferLength: bufferLengthValue,
          droppedFrames: droppedFramesValue,
          movingLatency: movingLatency,
          movingDownload: movingDownload,
          movingRatio: movingRatio,
          requestsQueue: requestsQueue
        };
      } else {
        return null;
      }
    }
  }, {
    key: 'buildDashJSProtData',
    value: function buildDashJSProtData(keySystemOptions) {
      var output = {};

      if (!keySystemOptions) {
        return output;
      }

      Object.keys(keySystemOptions).forEach(function (key, data) {
        if (data.licenseUrl) {
          data.laURL = data.licenseUrl;
          delete data.licenseUrl;
        }
      });

      return keySystemOptions;
    }
  }, {
    key: 'initializeDashJS',
    value: function initializeDashJS(manifest, err) {
      var _this3 = this;

      var manifestProtectionData = {};

      if (err) {
        this.showErrors();
        this.triggerReady();
        this.dispose();
        return;
      }

      // If we haven't received protection data from the outside world try to get it from the manifest
      // We merge the two allowing the manifest to override any keySystemOptions provided via src()
      if (this.getWidevineProtectionData) {
        manifestProtectionData = this.getWidevineProtectionData(manifest);
        this.keySystemOptions_ = _videoJs2['default'].mergeOptions(this.keySystemOptions_, manifestProtectionData);
      }

      // We have to reset any mediaKeys before the attachSource call below
      this.resetSrc_(function () {
        _this3.afterMediaKeysReset(manifest);
      });
    }
  }, {
    key: 'onTextTracksAdded',
    value: function onTextTracksAdded(e) {
      var tracks = e.tracks;

      if (tracks) {
        var plTracks = this.textTracks();
        var l = tracks.length,
            track,
            plTrack;
        for (var i = 0; i < l; i++) {
          track = tracks[i];
          track.label = track.label || track.lang;
          plTrack = plTracks[i];
          track.defaultTrack = track.lang === 'fra' || track.lang === 'fr';
          if (track.defaultTrack) {
            this.mediaPlayer_.setTextTrack(i);
            if (plTrack) {
              plTrack.mode = 'showing';
            }
          }
        }
      }
    }

    /**
     * Update display texttracks
     *
     * @method updateDisplay
     */
  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      var tracks = this.textTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }
      var selected = undefined;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['mode'] === 'showing') {
          selected = true;
          this.mediaPlayer_.setTextTrack(i);
        }
      }
      if (!selected) {
        this.mediaPlayer_.setTextTrack(-1);
      }
    }
  }, {
    key: 'handleAudioTracksChange',
    value: function handleAudioTracksChange() {
      var tracks = this.audioTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }

      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['enabled']) {
          var audioDashTrack = audioDashTracks[i];
          if (track['language'] == audioDashTrack['lang']) {
            audioDashTracks['enabled'] = true;
            try {
              this.mediaPlayer_.setCurrentTrack(audioDashTracks[i]);
            } catch (err) {
              _videoJs2['default'].log(err);
            }
          }
        }
      }
    }
  }, {
    key: 'handleVideoTracksChange',
    value: function handleVideoTracksChange() {
      var tracks = this.videoTracks();

      if (!tracks || !this.playbackInitialized || !this.options_.autoSwitch) {
        return;
      }
      var isInt = tracks.selectedIndex !== null && !isNaN(tracks.selectedIndex) && tracks.selectedIndex % 1 === 0;
      this.mediaPlayer_.setAutoSwitchQuality(!isInt);
      if (isInt) {
        this.mediaPlayer_.setQualityFor('video', tracks.selectedIndex);
      }
    }
  }, {
    key: 'afterMediaKeysReset',
    value: function afterMediaKeysReset(manifest) {
      this.showErrors();

      // Attach the source with any protection data
      this.mediaPlayer_.setProtectionData(this.keySystemOptions_);
      this.mediaPlayer_.attachSource(manifest);

      this.triggerReady();
    }
  }, {
    key: 'showErrors',
    value: function showErrors() {
      var _this4 = this;

      // The video element's src is set asynchronously so we have to wait a while
      // before we unhide any errors
      // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
      // in my testing
      this.setTimeout(function () {
        _this4.player_.removeClass('vjs-dashjs-hide-errors');
      }, 250);
    }
  }, {
    key: 'resetSrc_',
    value: function resetSrc_(callback) {
      // In Chrome, MediaKeys can NOT be changed when a src is loaded in the video element
      // Dash.js has a bug where it doesn't correctly reset the data so we do it manually
      // The order of these two lines is important. The video element's src must be reset
      // to allow `mediaKeys` to changed otherwise a DOMException is thrown.
      if (this.el()) {
        this.el().src = '';
        if (this.el().setMediaKeys) {
          this.el().setMediaKeys(null).then(callback, callback);
        } else {
          callback();
        }
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.mediaPlayer_) {
        this.mediaPlayer_.reset();
      }
      this.resetSrc_(Function.prototype);
      _get(Object.getPrototypeOf(Dash.prototype), 'dispose', this).call(this, this);
    }
  }]);

  return Dash;
})(Html5);

Dash.prototype.options_ = {
  inititalMediaSettings: {
    lang: 'fr'
  },
  //Set to false to switch off adaptive bitrate switching.
  autoSwitch: true,
  //Enabling buffer-occupancy ABR will switch to the *experimental* implementation of BOLA
  bolaEnabled: true,
  //Set to true if you would like dash.js to keep downloading fragments in the background
  scheduleWhilePaused: false,
  //A value of the initial bitrate, kbps
  initialBitrate: 400,
  //This method sets the selection mode for the initial track. This mode defines how the initial track will be selected
  // initialSelectionMode: 'highestBitrate',//widestRange,highestBitrate
  //Represents how many segment durations to delay the live stream.
  liveFragmentCount: 4,
  //This value influences the buffer pruning logic.
  //https://github.com/Dash-Industry-Forum/dash.js/blob/master/src/streaming/MediaPlayer.js
  buffer: {
    //Allows you to modify the buffer that is kept in source buffer in seconds.
    bufferToKeep: 30,
    //When the time is set higher than the default you will have to wait longer
    minBufferTime: 12,
    //Allows you to modify the interval of pruning buffer in seconds.
    bufferPruningInterval: 30,
    //A percentage between 0.0 and 1 to reduce the measured throughput calculations
    bandwidthSafetyFactor: 0.9,
    //The time that the internal buffer target will be set to once playing the top quality.
    bufferTimeAtTopQuality: 30,
    //The time that the internal buffer target will be set to once playing the top quality for long form content.
    bufferTimeAtTopQualityLongForm: 60,
    //This will directly affect the buffer targets when playing back at the top quality.
    longFormContentDurationThreshold: 600,
    //A threshold, in seconds, of when dashjs abr becomes less conservative since we have a larger "rich" buffer
    richBufferThreshold: 20,
    //A timeout value in seconds, which during the ABRController will block switch-up events.
    abandonLoadTimeout: 10,
    //Total number of retry attempts that will occur on a fragment load before it fails.
    fragmentLoaderRetryAttempts: 3,
    //Time in milliseconds of which to reload a failed fragment load attempt.
    fragmentLoaderRetryInterval: 1000
  },
  protData: {}
};

/* Dash Support Testing -------------------------------------------------------- */

Dash.isSupported = function () {
  return Html5.isSupported() && !!window.MediaSource;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dash);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dash.nativeSourceHandler = {};

Dash.prototype['featuresNativeTextTracks'] = false;
/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Dash.prototype['featuresNativeAudioTracks'] = false;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Dash.prototype['featuresNativeVideoTracks'] = false;

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (type) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(type)) {
    return 'probably';
  } else if (dashExtRE.test(type)) {
    return 'maybe';
  } else {
    return '';
  }

  return '';
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dash.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dash.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

Dash.qualityLabels = ['bas', 'moyen', 'normal', 'HD'];

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dash.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dash.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dash.registerSourceHandler(Dash.nativeSourceHandler);

_videoJs2['default'].options.dash = {};

Component.registerComponent('Dash', Dash);
Tech.registerTech('Dash', Dash);
exports['default'] = Dash;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"streamroot-dash":3}],54:[function(require,module,exports){
(function (global){
/**
 * @file dashas.js
 * DASH Media Controller - Wrapper for Flash Media API
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');
var Flash = _videoJs2['default'].getComponent('Flash');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dashas = (function (_Flash) {
  _inherits(Dashas, _Flash);

  function Dashas(options, ready) {
    _classCallCheck(this, Dashas);

    _get(Object.getPrototypeOf(Dashas.prototype), 'constructor', this).call(this, options, ready);
    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons
    window.videojs = window.videojs || {};
    window.videojs.Dashas = window.videojs.Dashas || {};
    window.videojs.Dashas.onReady = Flash.onReady;
    window.videojs.Dashas.onEvent = Flash.onEvent;
    window.videojs.Dashas.onError = Flash.onError;

    this.metricsInterval = this.setInterval(this.detectBandwithChange, 5000);
    this.one('loadedmetadata', this.onInitialized.bind(this));

    var tracks = this.audioTracks();

    var changeHandler = this.handleAudioTracksChange.bind(this);

    tracks.addEventListener('change', changeHandler);
    this.on('dispose', function () {
      tracks.removeEventListener('change', changeHandler);
    });
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */

  _createClass(Dashas, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options_;
      var serverUrl = Dashas.buildMetadataUrl(options);
      var customData = Dashas.buildOptData(options);
      // Merge default flashvars with ones passed in to init
      options.flashVars = _videoJs2['default'].mergeOptions({
        'metadataUrl': encodeURIComponent(serverUrl),
        'authenticationToken': encodeURIComponent(customData),
        'language': 'fr',
        'spinner': !1,
        'watermark': !1,
        'muted': this.player_.options_.muted,
        'debug': true,
        'quality': 'autolow',
        'maxBufferLength': 8
      }, options.flashVars || {});

      return _get(Object.getPrototypeOf(Dashas.prototype), 'createEl', this).call(this);
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized() {
      var metrics = this.getPlaybackStatistics();
      if (!metrics) {
        return;
      }
      this.metrics_ = _videoJs2['default'].mergeOptions(this.metrics_, metrics);

      this.addAudioTracks();
    }
  }, {
    key: 'handleAudioTracksChange',
    value: function handleAudioTracksChange() {
      var tracks = this.audioTracks();

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['enabled']) {
          try {
            this.el_.vjs_setProperty('forcedAudioLang', i);
          } catch (err) {
            _videoJs2['default'].log(err);
          }
        }
      }
    }
  }, {
    key: 'addAudioTracks',
    value: function addAudioTracks() {
      var tracks = this.el_.vjs_getProperty('audioTracks');

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (typeof track === 'string') {
          track = {
            label: track,
            lang: track
          };
        }
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === 'fra' || plTrack['language'] === 'fr';
      }
    }
  }, {
    key: 'detectBandwithChange',
    value: function detectBandwithChange() {
      var metrics = this.getPlaybackStatistics();
      var metricsChangeType = undefined;
      if (!metrics) {
        return;
      }
      switch (true) {
        case metrics.video.bandwidth !== this.metrics_.video.bandwidth:
          this.metrics_.video.bandwidth = metrics.video.bandwidth;
          metricsChangeType = 'video';
          break;
        case metrics.audio.bandwidth !== this.metrics_.audio.bandwidth:
          this.metrics_.audio.bandwidth = metrics.audio.bandwidth;
          metricsChangeType = 'audio';
          break;
        default:
          break;
      }
      if (metricsChangeType) {
        var metricsChangeEvent = {
          type: _dashjs.MediaPlayer.events.METRIC_CHANGED,
          mediaType: metricsChangeType
        };

        this.trigger(metricsChangeEvent);
      }
    }
  }, {
    key: 'subtitleTracks',
    value: function subtitleTracks() {
      return this.textTracks();
    }
  }, {
    key: 'setSubsTrack',
    value: function setSubsTrack(track) {
      this.setTextTrack(track);
    }
  }, {
    key: 'getDroppedFrames',
    value: function getDroppedFrames() {
      return this.el_.vjs_getProperty('droppedFrames');
    }
  }, {
    key: 'getBuffered',
    value: function getBuffered() {
      return this.el_.vjs_getProperty('buffered');
    }
  }, {
    key: 'getBufferLevel',
    value: function getBufferLevel() {
      return this.el_.vjs_getProperty('bufferLevel');
    }
  }, {
    key: 'getCurrentAudioBandwidth',
    value: function getCurrentAudioBandwidth() {
      return this.el_.vjs_getProperty('currentAudioBandwidth');
    }
  }, {
    key: 'getCurrentVideoBandwidth',
    value: function getCurrentVideoBandwidth() {
      return this.el_.vjs_getProperty('currentVideoBandwidth');
    }
  }, {
    key: 'audioTracks',
    value: function audioTracks() {
      return Tech.prototype.audioTracks.call(this);
    }
  }, {
    key: 'poster',
    value: function poster() {
      return '';
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      var z = this.getBuffered();
      var W = (this.getBufferLevel(), this.getDroppedFrames());
      var Z = this.getCurrentVideoBandwidth();
      var K = this.getCurrentAudioBandwidth();
      var R = {
        bandwidth: Z / 1000,
        bufferLength: z,
        droppedFrames: W
      };
      var N = {
        bandwidth: K / 1000,
        bufferLength: z
      };
      return _videoJs2['default'].mergeOptions(this.metrics_, { video: R, audio: N });
    }
  }, {
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.currentSrc();
      }
      var options = this.options_;
      var autoPlay = this.player_.autoplay();
      var serverUrl = Dashas.buildMetadataUrl(options);
      var customData = Dashas.buildOptData(options);
      this.el_.vjs_source(_src, autoPlay, serverUrl, customData);
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.el_.vjs_getProperty('currentTime');
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      return this.el_.vjs_getProperty('buffered');
    }
  }]);

  return Dashas;
})(Flash);

Dashas.extractAssetId = function (source) {
  var reg = /^(.*\/)?(?:$|(.+?)(?:(\.[^.]*$)|$))/;
  var filePath = source.match(reg);

  var assetId = filePath[2];
  return assetId;
};

Dashas.getDRMData = function (options) {
  var drmData = options.protData['com.adobe.flashaccess'];
  var assetId = options.source ? Dashas.extractAssetId(options.source.src) : '';
  var customData = drmData['httpRequestHeaders'] ? drmData['httpRequestHeaders'].customData || {} : {};
  var serverUrl = drmData['serverURL'] ? drmData['serverURL'] || '' : '';

  if (options.source && !options.source.drm) {
    serverUrl = customData = assetId = '';
  }

  return {
    customData: customData,
    serverUrl: serverUrl,
    assetId: assetId,
    variantId: '' //on utilise pas cette key
  };
};

Dashas.buildMetadataUrl = function (options) {
  var data = Dashas.getDRMData(options);
  var metadataUrl = data.serverUrl;
  if (data.customData) {
    metadataUrl += '?optData=' + data.customData;
  }
  if (data.assetId) {
    metadataUrl += '&assetId=' + data.assetId;
  }
  if (data.variantId) {
    metadataUrl += '&variantId=' + data.variantId;
  }
  return metadataUrl;
};

Dashas.buildOptData = function (options) {
  return Dashas.getDRMData(options).customData;
};

Dashas.prototype.options_ = {
  customData: {},
  protData: {
    "com.widevine.alpha": {},
    "com.microsoft.playready": {},
    "com.adobe.flashaccess": {},
    "org.w3.clearkey": {}
  }
};

/* Dash Support Testing -------------------------------------------------------- */

Dashas.isSupported = function () {
  return Flash.isSupported() && Flash.version()[0] >= 14;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dashas);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dashas.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canPlayType = function (source) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(source)) {
    return 'probably';
  } else if (dashExtRE.test(source)) {
    return 'maybe';
  } else {
    return '';
  }
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dashas.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dashas.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dashas.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dashas.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dashas.registerSourceHandler(Dashas.nativeSourceHandler);

_videoJs2['default'].options.dashas = {};

Component.registerComponent('Dashas', Dashas);
Tech.registerTech('Dashas', Dashas);

/**
 * @fileoverview Externs for video-js.swf. Externs are functions
 * that the compiler shouldn't obfuscate.
 */

/**
 * @param {string} name
 */
HTMLObjectElement.prototype.vjs_getProperty = function (name) {};

/**
 * @param {string} name
 * @param {string|number} value
 */
HTMLObjectElement.prototype.vjs_setProperty = function (name, value) {};

/**
 * Control methods
 */
HTMLObjectElement.prototype.vjs_play = function () {};
HTMLObjectElement.prototype.vjs_pause = function () {};
HTMLObjectElement.prototype.vjs_load = function () {};

/**
 * @param {string} src
 */
HTMLObjectElement.prototype.vjs_src = function (src) {};

exports['default'] = Dashas;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],55:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var MediaTechController = _videoJs2['default'].getComponent('MediaTechController');

MediaTechController.METRICS_DATA = {
  bandwidth: -1,
  bitrateIndex: 0,
  pendingIndex: '',
  numBitrates: 0,
  bufferLength: 0,
  droppedFrames: 0,
  movingLatency: 0,
  movingDownload: 0,
  movingRatio: 0,
  requestsQueue: 0
};

MediaTechController.prototype.metrics_ = {
  video: _videoJs2['default'].mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/-1
  }, MediaTechController.METRICS_DATA),
  audio: _videoJs2['default'].mergeOptions({
    bandwidth: /*this.el().webkitAudioDecodedByteCount || */-1
  }, MediaTechController.METRICS_DATA),
  p2pweb: {
    chunksFromCDN: 0,
    chunksFromP2P: 0,
    chunksSent: 0,
    bufferLength: -1,
    swarmSize: -1,
    p2pRatio: -1,
    startupTime: -1
  }
};

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
MediaTechController.prototype.getPlaybackStatistics = function () {
  return this.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
MediaTechController.prototype.getCribbedMetricsFor = function (type) {
  return this.metrics_[type];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[37]);
