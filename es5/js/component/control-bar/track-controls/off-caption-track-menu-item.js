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

var _videoJs = require('video.js');

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
    this.selected(true);
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