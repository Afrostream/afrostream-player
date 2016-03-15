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

var _videoJs = require('video.js');

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
      'label': options['kind'] + ' off',
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