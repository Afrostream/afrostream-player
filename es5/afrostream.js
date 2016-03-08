/**
 * ! afrostrream-player - v2.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-metrics.js
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

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var _techDash = require('./tech/dash');

var _techDash2 = _interopRequireDefault(_techDash);

var _techMedia = require('./tech/media');

var _techMedia2 = _interopRequireDefault(_techMedia);

var _corePlayer = require('./core/player');

var _corePlayer2 = _interopRequireDefault(_corePlayer);

var _componentControlBarTextTrackControlsCaptionTrackButton = require('./component/control-bar/text-track-controls/caption-track-button');

var _componentControlBarTextTrackControlsCaptionTrackButton2 = _interopRequireDefault(_componentControlBarTextTrackControlsCaptionTrackButton);

var Component = _videoJs2['default'].getComponent('Component');
/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Afrostream = (function (_Component) {
  _inherits(Afrostream, _Component);

  function Afrostream(options, ready) {
    _classCallCheck(this, Afrostream);

    _get(Object.getPrototypeOf(Afrostream.prototype), 'constructor', this).call(this, options, ready);
    this.player().one('loadstart', _videoJs2['default'].bind(this, this.onLoadStart));
  }

  _createClass(Afrostream, [{
    key: 'onLoadStart',
    value: function onLoadStart() {
      this.addMediaPlayerHandlers();
    }
  }, {
    key: 'addMediaPlayerHandlers',
    value: function addMediaPlayerHandlers() {
      this.player().on(MediaPlayer.events.STREAM_INITIALIZED, _videoJs2['default'].bind(this, this.onInitialized));
      this.player().on(MediaPlayer.events.METRIC_CHANGED, _videoJs2['default'].bind(this, this.onMetricChanged));
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.data.stream !== 'video' && e.data.stream !== 'audio' && e.data.stream !== 'p2pweb') {
        return;
      }
      var metrics = this.player().getCribbedMetricsFor(e.data.stream);
      if (metrics) {
        switch (e.data.stream) {
          case 'video':
            /*jshint sub:true*/
            if (metrics.bandwidth !== this.oldBandwidth) {
              this.tech_['featuresBitrate'] = metrics;
              this.player().trigger(metrics.bandwidth > this.oldBandwidth ? 'bandwidthIncrease' : 'bandwidthDecrease');
              this.oldBandwidth = metrics.bandwidth;
            }
            break;
          case 'p2pweb':
            /*jshint sub:true*/
            if (metrics.chunksFromP2P !== this.oldChunksFromP2P) {
              this.tech_['featuresBitrate'] = metrics;
              this.player().trigger('chunksFromP2P');
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
        this.player().error(err);
      }
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
_videoJs2['default'].options.children.afrostream = {};

Component.registerComponent('Afrostream', Afrostream);
exports['default'] = Afrostream;
module.exports = exports['default'];