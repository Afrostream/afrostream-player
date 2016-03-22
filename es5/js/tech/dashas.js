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

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var _dashjs = require('dashjs');

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

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
    _globalWindow2['default'].videojs = _globalWindow2['default'].videojs || {};
    _globalWindow2['default'].videojs.Dashas = _globalWindow2['default'].videojs.Dashas || {};
    _globalWindow2['default'].videojs.Dashas.onReady = Flash.onReady;
    _globalWindow2['default'].videojs.Dashas.onEvent = Flash.onEvent;
    _globalWindow2['default'].videojs.Dashas.onError = Flash.onError;

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
          data: metricsChangeType
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