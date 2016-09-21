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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file dashas.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DASH Media Controller - Wrapper for Flash Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Flash = _video2.default.getComponent('Flash');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dashas = function (_Flash) {
  _inherits(Dashas, _Flash);

  function Dashas(options, ready) {
    _classCallCheck(this, Dashas);

    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashas).call(this, options, ready));

    window.videojs = window.videojs || {};
    window.videojs.Dashas = window.videojs.Dashas || {};
    window.videojs.Dashas.onReady = Flash.onReady;
    window.videojs.Dashas.onEvent = Flash.onEvent;
    window.videojs.Dashas.onError = Flash.onError;

    _this.metricsInterval = _this.setInterval(_this.detectBandwithChange, 5000);
    _this.one('loadedmetadata', _this.onInitialized.bind(_this));

    var tracks = _this.audioTracks();

    var changeHandler = _this.handleAudioTracksChange.bind(_this);

    tracks.addEventListener('change', changeHandler);
    _this.on('dispose', function () {
      tracks.removeEventListener('change', changeHandler);
    });

    return _this;
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
      options.flashVars = _video2.default.mergeOptions({
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
      this.metrics_ = _video2.default.mergeOptions(this.metrics_, metrics);

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
            _video2.default.log(err);
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
      var metricsChangeType = void 0;
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
      return _video2.default.mergeOptions(this.metrics_, { video: R, audio: N });
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
}(Flash);

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

_video2.default.options.dashas = {};

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

exports.default = Dashas;