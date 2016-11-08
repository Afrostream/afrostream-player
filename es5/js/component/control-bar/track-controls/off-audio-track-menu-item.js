'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _audioTrackMenuItem = require('./audio-track-menu-item');

var _audioTrackMenuItem2 = _interopRequireDefault(_audioTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file off-audio-track-menu-item.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
//const AudioTrackMenuItem = videojs.getComponent('AudioTrackMenuItem');

/**
 * A special menu item for turning of a specific type of audio track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends AudioTrackMenuItem
 * @class OffAudioTrackMenuItem
 */

var OffAudioTrackMenuItem = function (_AudioTrackMenuItem) {
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OffAudioTrackMenuItem).call(this, player, options));
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
}(_audioTrackMenuItem2.default);

Component.registerComponent('OffAudioTrackMenuItem', OffAudioTrackMenuItem);
exports.default = OffAudioTrackMenuItem;