'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _dashjs = require('dashjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file dash.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DASH Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Html5 = _video2.default.getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dash = function (_Html) {
  _inherits(Dash, _Html);

  function Dash(options, ready) {
    _classCallCheck(this, Dash);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dash).call(this, options, ready));

    var tTracks = _this.textTracks();

    if (tTracks) {
      (function () {
        var tTracksChangeHandler = _this.handleTracksChange.bind(_this);

        tTracks.addEventListener('change', tTracksChangeHandler);
        _this.on('dispose', function () {
          tTracks.removeEventListener('change', tTracksChangeHandler);
        });
      })();
    }

    var aTracks = _this.audioTracks();

    if (aTracks) {
      (function () {
        var aTracksChangeHandler = _this.handleAudioTracksChange.bind(_this);

        aTracks.addEventListener('change', aTracksChangeHandler);
        _this.on('dispose', function () {
          aTracks.removeEventListener('change', aTracksChangeHandler);
        });
      })();
    }

    var vTracks = _this.videoTracks();

    if (vTracks) {
      (function () {
        var vTracksChangeHandler = _this.handleVideoTracksChange.bind(_this);

        vTracks.addEventListener('change', vTracksChangeHandler);
        _this.on('dispose', function () {
          vTracks.removeEventListener('change', vTracksChangeHandler);
        });
      })();
    }

    return _this;
  }

  _createClass(Dash, [{
    key: 'currentSrc',
    value: function currentSrc() {
      if (this.mediaPlayer_) {
        return this.mediaPlayer_.getSource();
      }

      return _get(Object.getPrototypeOf(Dash.prototype), 'currentSrc', this).call(this);
    }

    /**
     * Detect if source is Live
     * @returns {boolean}
     */

  }, {
    key: 'isDynamic',
    value: function isDynamic(dynamic) {
      if (dynamic !== undefined) {
        return this.isDynamic_ = dynamic;
      }
      return this.isDynamic_;
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
        // this.mediaPlayer_.enableBufferOccupancyABR(false)
        this.mediaPlayer_.setQualityFor('video', 0);
        // this.one('seeked', ()=> {
        //   this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled)
        // })
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
      if (!_src) {
        return this.el_.src;
      }
      this.trigger('loadstart');

      this.featuresNativeTextTracks = Dash.supportsNativeTextTracks();
      this.featuresNativeAudioTracks = Dash.supportsNativeAudioTracks();
      this.featuresNativeVideoTracks = Dash.supportsNativeVideoTracks();
      this.keySystemOptions_ = this.buildDashJSProtData(this.options_.protData);
      // Save the context after the first initialization for subsequent instances
      this.context_ = this.context_ || {};
      // reuse MediaPlayer if it already exists
      if (!this.mediaPlayer_) {
        // But make a fresh MediaPlayer each time the sourceHandler is used
        this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();

        // Must run controller before these two lines or else there is no
        // element to bind to.
        this.mediaPlayer_.initialize();
      }

      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, this.onTextTracksAdded.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, this.onProgress.bind(this));
      // Dash.js autoplays by default
      if (!this.player_.options().autoplay) {
        this.mediaPlayer_.setAutoPlay(false);
      }

      this.mediaPlayer_.setInitialMediaSettingsFor('audio', this.options_.inititalMediaSettings.audio);
      this.mediaPlayer_.setInitialMediaSettingsFor('video', this.options_.inititalMediaSettings.video);
      this.mediaPlayer_.setTrackSwitchModeFor('audio', this.options_.trackSwitchMode); //alwaysReplace
      this.mediaPlayer_.setTrackSwitchModeFor('video', this.options_.trackSwitchMode); //alwaysReplace

      this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
      this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
      this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);

      this.mediaPlayer_.setLiveDelayFragmentCount(this.options_.liveFragmentCount);
      this.mediaPlayer_.setInitialBitrateFor('video', this.options_.initialBitrate);
      // this.mediaPlayer_.setSelectionModeForInitialTrack(this.options_.initialSelectionMode)
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
      //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video})

      this.mediaPlayer_.attachView(this.el_);
      this.mediaPlayer_.setProtectionData(this.keySystemOptions_);
      this.mediaPlayer_.attachSource(_src);
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(_ref, err) {
      var _ref$streamInfo$manif = _ref.streamInfo.manifestInfo.isDynamic;
      var isDynamic = _ref$streamInfo$manif === undefined ? false : _ref$streamInfo$manif;

      if (this.playbackInitialized) {
        return;
      }
      this.playbackInitialized = true;

      if (err) {
        this.player_.error(err);
      }
      // this.streamInfo = streamInfo
      this.isDynamic(isDynamic);
      this.trigger(_dashjs.MediaPlayer.events.STREAM_INITIALIZED);
      //let bitrates = this.mediaPlayer_.getBitrateInfoListFor('video')
      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');
      var videoDashTracks = this.mediaPlayer_.getTracksFor('video');
      var autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();

      var defaultAudio = this.mediaPlayer_.getInitialMediaSettingsFor('audio');
      //let defaultVideo = this.mediaPlayer_.getInitialMediaSettingsFor('video')
      var initialVideoBitrate = this.mediaPlayer_.getInitialBitrateFor('video');

      var i = void 0;

      for (i = 0; i < audioDashTracks.length; i++) {
        var track = audioDashTracks[i];
        track.label = track.label || track.lang;
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === (defaultAudio && defaultAudio.lang.indexOf(this.options_.inititalMediaSettings.audio.lang) && defaultAudio.lang || this.options_.inititalMediaSettings.audio.lang);
      }

      for (i = 0; i < videoDashTracks.length; i++) {
        var _track = videoDashTracks[i];
        var bitrateList = _track.bitrateList;
        for (var j = 0; j < bitrateList.length; j++) {
          var bandwidth = bitrateList[j].bandwidth / 1000;
          var label = Dash.qualityLabels[j] || bandwidth;
          var bitRateTrack = this.addVideoTrack('main', label, bandwidth);
          bitRateTrack.selected = !autoSwitch && bandwidth > initialVideoBitrate - 350 && bandwidth < initialVideoBitrate + 350;
        }
      }
    }
  }, {
    key: 'onProgress',
    value: function onProgress() {
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
        this.metrics_[e.mediaType] = _video2.default.mergeOptions(this.metrics_[e.mediaType], metrics);
        this.trigger(e);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      var metrics = this.mediaPlayer_.getMetricsFor(type),
          dashMetrics = this.mediaPlayer_.getDashMetrics(),
          repSwitch = void 0,
          bufferLevel = void 0,
          httpRequests = void 0,
          droppedFramesMetrics = void 0,
          bitrateIndexValue = void 0,
          bandwidthValue = void 0,
          pendingValue = void 0,
          numBitratesValue = void 0,
          bufferLengthValue = 0,
          movingLatency = {},
          movingDownload = {},
          movingRatio = {},
          droppedFramesValue = 0,
          requestsQueue = void 0,
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

        fillmoving('video', httpRequests);
        fillmoving('audio', httpRequests);

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
          track.defaultTrack = track.lang === this.options_.inititalMediaSettings.text.lang;
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
      var selected = void 0;

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
            try {
              this.mediaPlayer_.setCurrentTrack(audioDashTrack);
            } catch (err) {
              _video2.default.log(err);
            }
          }
        }
      }
    }
  }, {
    key: 'handleVideoTracksChange',
    value: function handleVideoTracksChange() {
      var tracks = this.videoTracks();

      if (!tracks || !this.playbackInitialized /* || !this.options_.autoSwitch*/) {
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
      var _this2 = this;

      // The video element's src is set asynchronously so we have to wait a while
      // before we unhide any errors
      // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
      // in my testing
      this.setTimeout(function () {
        _this2.player_.removeClass('vjs-dashjs-hide-errors');
      }, 250);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.mediaPlayer_) {
        this.mediaPlayer_.reset();
      }
      _get(Object.getPrototypeOf(Dash.prototype), 'dispose', this).call(this, this);
    }
  }]);

  return Dash;
}(Html5);

Dash.prototype.isDynamic_ = false;

Dash.prototype.options_ = {
  inititalMediaSettings: {
    text: {
      lang: 'fra'
    },
    audio: {
      lang: 'fra'
    },
    video: {
      lang: 'fra'
    }
  },
  //Set to false to switch off adaptive bitrate switching.
  autoSwitch: true,
  /*This method sets the current track switch mode. Available options are:
   * MediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
   * (used to forbid clearing the buffered data (prior to current playback position) after track switch. Default for video)
   * MediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
   * (used to clear the buffered data (prior to current playback position) after track switch. Default for audio)*/
  trackSwitchMode: 'neverReplace', //alwaysReplace
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

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Dash.supportsNativeTextTracks = function () {
  var supportsTextTracks;
  supportsTextTracks = !!Html5.TEST_VID.textTracks;
  if (supportsTextTracks && Html5.TEST_VID.textTracks.length > 0) {
    supportsTextTracks = typeof Html5.TEST_VID.textTracks[0]['mode'] !== 'number';
  }
  if (supportsTextTracks && !('onremovetrack' in Html5.TEST_VID.textTracks)) {
    supportsTextTracks = false;
  }
  return supportsTextTracks;
};

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Dash.supportsNativeVideoTracks = function () {
  var supportsVideoTracks = !!Html5.TEST_VID.videoTracks && !_video2.default.browser.IS_SAFARI;
  return supportsVideoTracks;
};

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Dash.supportsNativeAudioTracks = function () {
  var supportsAudioTracks = !!Html5.TEST_VID.audioTracks && !_video2.default.browser.IS_SAFARI;
  return supportsAudioTracks;
};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (type) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;
  var canPlay = '';
  if (dashTypeRE.test(type)) {
    canPlay = 'probably';
  } else if (dashExtRE.test(type)) {
    canPlay = 'maybe';
  } else {
    canPlay = '';
  }

  return canPlay;
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

_video2.default.options.dash = {};

Component.registerComponent('Dash', Dash);
Tech.registerTech('Dash', Dash);
exports.default = Dash;