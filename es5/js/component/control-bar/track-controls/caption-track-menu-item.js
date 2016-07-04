'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var CaptionTrackMenuItem = function (_MenuItem) {
  _inherits(CaptionTrackMenuItem, _MenuItem);

  function CaptionTrackMenuItem(player, options) {
    _classCallCheck(this, CaptionTrackMenuItem);

    var track = options['track'];
    var tracks = player.textTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['mode'] === 'showing';

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CaptionTrackMenuItem).call(this, player, options));

    _this.track = track;

    if (tracks) {
      tracks.addEventListener('change', _this.handleTracksChange.bind(_this));
      _this.on('dispose', function () {
        tracks.removeEventListener('change', this.handleTracksChange.bind(this));
      });
    }

    // iOS7 doesn't dispatch change events to TextTrackLists when an
    // associated track's mode changes. Without something like
    // Object.observe() (also not present on iOS7), it's not
    // possible to detect changes to the mode attribute and polyfill
    // the change event. As a poor substitute, we manually dispatch
    // change events whenever the controls modify the mode.
    if (tracks && tracks.onchange === undefined) {
      (function () {
        var event = void 0;

        _this.on(['tap', 'click'], function () {
          if (_typeof(window.Event) !== 'object') {
            // Android 2.3 throws an Illegal Constructor error for window.Event
            try {
              event = new window.Event('change');
            } catch (err) {}
          }

          if (!event) {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
          }

          tracks.dispatchEvent(event);
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


  _createClass(CaptionTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
      var tracks = this.player_.textTracks();

      _get(Object.getPrototypeOf(CaptionTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        if (track['kind'] !== kind) {
          continue;
        }

        if (track === this.track) {
          track['mode'] = 'showing';
        } else {
          track['mode'] = 'hidden';
        }
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
      this.selected(this.track['mode'] === 'showing');
    }
  }]);

  return CaptionTrackMenuItem;
}(MenuItem);

Component.registerComponent('CaptionTrackMenuItem', CaptionTrackMenuItem);
exports.default = CaptionTrackMenuItem;