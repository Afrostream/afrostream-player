'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _dash = require('./dash');

var _dash2 = _interopRequireDefault(_dash);

var _dashjs = require('dashjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file easy-broadcast.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * EASY_BROADCAST P2P Media Controller - Wrapper for DASH Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */

var EasyBroadcast = function (_Dash) {
  _inherits(EasyBroadcast, _Dash);

  function EasyBroadcast(options, ready) {
    _classCallCheck(this, EasyBroadcast);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EasyBroadcast).call(this, options, ready));
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
      var _this2 = this;

      if (!_src) {
        return this.el_.src;
      }

      this.clearTimeout(this.loadEBTimeout);
      if (!EasyBroadcast.ebLoaded) {
        // Set the source when ready
        this.loadEBTimeout = this.setTimeout(function () {
          _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', _this2).call(_this2, _src);
        }, 2000);
        return this.injectJs(_src);
      } else {
        this.mediaPlayer_ = new DashEB.MediaPlayer(this.el_, _src, true);
        _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', this).call(this, _src);
      }
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
        this.metrics_[metricsKey] = _video2.default.mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'onMetricChanged', this).call(this, e);
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.triggerReady();
    }
  }, {
    key: 'injectJs',
    value: function injectJs(src) {
      var url = this.options_.ebLib;
      var t = 'script';
      var d = document;
      var s = d.getElementsByTagName('head')[0] || d.documentElement;
      var js = d.createElement(t);
      var cb = this.src.bind(this);
      js.async = true;
      js.type = 'text/javascript';

      js.onload = js.onreadystatechange = function () {
        var rs = this.readyState;
        if (!EasyBroadcast.ebLoaded && (!rs || /loaded|complete/.test(rs))) {
          EasyBroadcast.ebLoaded = true;
          cb(src);
        }
      };
      js.src = url;
      s.insertBefore(js, s.firstChild);
    }
  }]);

  return EasyBroadcast;
}(_dash2.default);

EasyBroadcast.prototype.options_ = _video2.default.mergeOptions(_dash2.default.prototype.options_, {
  ebLib: '//www.libs.easybroadcast.fr/afrostream/EB.js',
  //override option EB, cause switch lang too long
  trackSwitchMode: 'alwaysReplace'
});

/* EasyBroadcast Support Testing -------------------------------------------------------- */

EasyBroadcast.isSupported = function () {
  return _dash2.default.isSupported() && !!(window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection) && !_video2.default.browser.IS_IOS && !_video2.default.browser.IS_ANDROID;
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
EasyBroadcast.nativeSourceHandler = _dash2.default.nativeSourceHandler;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
EasyBroadcast.supportsNativeTextTracks = _dash2.default.supportsNativeTextTracks;

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeVideoTracks = _dash2.default.supportsNativeVideoTracks;

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeAudioTracks = _dash2.default.supportsNativeAudioTracks;

EasyBroadcast.loadEBTimeout = 0;

EasyBroadcast.ebLoaded = false;

_video2.default.options.easybroadcast = {};

Component.registerComponent('EasyBroadcast', EasyBroadcast);
Tech.registerTech('EasyBroadcast', EasyBroadcast);
exports.default = EasyBroadcast;