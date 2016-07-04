'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var MenuItem = _video2.default.getComponent('MenuItem');

var AudioTrackMenuItem = function (_MenuItem) {
  _inherits(AudioTrackMenuItem, _MenuItem);

  function AudioTrackMenuItem(player, options) {
    _classCallCheck(this, AudioTrackMenuItem);

    var track = options['track'];
    var tracks = player.audioTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['enabled'] === true;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioTrackMenuItem).call(this, player, options));

    _this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
    return _this;
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */


  _createClass(AudioTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var tracks = this.player_.audioTracks();

      _get(Object.getPrototypeOf(AudioTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track['enabled'] = track === this.track;
      }
    }

    /**
     * Handle text track change
     *
     * @method handleTracksChange
     */

  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      this.selected(this.track['enabled']);
    }
  }]);

  return AudioTrackMenuItem;
}(MenuItem);

Component.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
exports.default = AudioTrackMenuItem;