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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file streamroot.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * STREAMROOT P2P Media Controller - Wrapper for DASH Media API
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

var Streamroot = function (_Dash) {
  _inherits(Streamroot, _Dash);

  function Streamroot(options, ready) {
    _classCallCheck(this, Streamroot);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Streamroot).call(this, options, ready));
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */


  _createClass(Streamroot, [{
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.el_.src;
      }

      if (!this.libLoaded) {
        _get(Object.getPrototypeOf(Streamroot.prototype), 'src', this).call(this, _src);
      } else {
        // But make a fresh MediaPlayer each time the sourceHandler is used
        this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();
        this.initYoubora();
        this.dashjsWrapper_ = new DashjsWrapper(this.mediaPlayer_, this.options_.p2pConfig, 30);
        // Apply any options that are set
        this.mediaPlayer_.initialize();
        this.mediaPlayer_.setLimitBitrateByPortal(this.options_.limitBitrateByPortal);
        _get(Object.getPrototypeOf(Streamroot.prototype), 'src', this).call(this, _src);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      if (type !== 'p2p') {
        return _get(Object.getPrototypeOf(Streamroot.prototype), 'getCribbedMetricsFor', this).call(this, type);
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
      var metricsKey = 'p2p';
      var metrics = this.getCribbedMetricsFor(metricsKey);
      if (metrics) {
        this.metrics_[metricsKey] = _video2.default.mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(Streamroot.prototype), 'onMetricChanged', this).call(this, e);
    }
  }]);

  return Streamroot;
}(_dash2.default);

Streamroot.prototype.options_ = Object.assign(_dash2.default.prototype.options_, {
  lib: '//cdn.streamroot.io/dashjs-p2p-wrapper/stable/dashjs-p2p-wrapper.js ',
  p2pConfig: {
    streamrootKey: 'none',
    debug: true
  },
  limitBitrateByPortal: false
});

/* Streamroot Support Testing -------------------------------------------------------- */

Streamroot.isSupported = function () {
  return _dash2.default.isSupported() && !!(window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection) && !_video2.default.browser.IS_IOS && !_video2.default.browser.IS_ANDROID;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Streamroot);

_video2.default.options.streamroot = {};

Component.registerComponent('Streamroot', Streamroot);
Tech.registerTech('Streamroot', Streamroot);
exports.default = Streamroot;