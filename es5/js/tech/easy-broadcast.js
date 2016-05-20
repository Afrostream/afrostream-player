/**
 * @file easy-broadcast.js
 * EASY_BROADCAST P2P Media Controller - Wrapper for DASH Media API
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

var _dash = require('./dash');

var _dash2 = _interopRequireDefault(_dash);

var _dashjs = require('dashjs');

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');
var Html5 = _videoJs2['default'].getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */

var EasyBroadcast = (function (_Dash) {
  _inherits(EasyBroadcast, _Dash);

  function EasyBroadcast(options, ready) {
    _classCallCheck(this, EasyBroadcast);

    _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'constructor', this).call(this, options, ready);
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */

  _createClass(EasyBroadcast, [{
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.el_.src;
      }

      this.mediaPlayer_ = new DashEB.MediaPlayer(this.el_, _src, true);

      _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', this).call(this, _src);
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      if (type !== 'p2pweb') {
        return _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'getCribbedMetricsFor', this).call(this, type);
      }
      var metrics = this.mediaPlayer_.getMetricsFor(type);
      if (metrics) {
        return metrics.metricsP2PWeb;
      } else {
        return null;
      }
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      if (e.mediaType !== 'video' && e.mediaType !== 'audio') {
        return;
      }
      var metricsKey = 'p2pweb';
      var metrics = this.getCribbedMetricsFor(metricsKey);
      if (metrics) {
        this.metrics_[metricsKey] = _videoJs2['default'].mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'onMetricChanged', this).call(this, e);
    }
  }, {
    key: 'afterMediaKeysReset',
    value: function afterMediaKeysReset(manifest) {
      _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'afterMediaKeysReset', this).call(this, manifest);
    }
  }]);

  return EasyBroadcast;
})(_dash2['default']);

EasyBroadcast.prototype.options_ = _videoJs2['default'].mergeOptions(_dash2['default'].prototype.options_, {
  //override option EB, cause switch lang too long
  trackSwitchMode: 'alwaysReplace'
});

/* EasyBroadcast Support Testing -------------------------------------------------------- */

EasyBroadcast.isSupported = function () {
  return _dash2['default'].isSupported() && !_videoJs2['default'].browser.IS_ANDROID;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(EasyBroadcast);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
EasyBroadcast.nativeSourceHandler = _dash2['default'].nativeSourceHandler;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
EasyBroadcast.supportsNativeTextTracks = _dash2['default'].supportsNativeTextTracks;

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeVideoTracks = _dash2['default'].supportsNativeVideoTracks;

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeAudioTracks = _dash2['default'].supportsNativeAudioTracks;

_videoJs2['default'].options.easybroadcast = {};

Component.registerComponent('EasyBroadcast', EasyBroadcast);
Tech.registerTech('EasyBroadcast', EasyBroadcast);
exports['default'] = EasyBroadcast;
module.exports = exports['default'];