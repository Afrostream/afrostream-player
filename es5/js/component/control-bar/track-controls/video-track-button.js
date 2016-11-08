'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

var _offVideoTrackMenuItem = require('./off-video-track-menu-item');

var _offVideoTrackMenuItem2 = _interopRequireDefault(_offVideoTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file video-track-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var MenuButton = _video2.default.getComponent('MenuButton');
var MenuItem = _video2.default.getComponent('MenuItem');

/**
 * The base class for buttons that toggle specific video track types (e.g. commentary)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class VideoTrackButton
 */

var VideoTrackButton = function (_MenuButton) {
  _inherits(VideoTrackButton, _MenuButton);

  function VideoTrackButton(player, options) {
    _classCallCheck(this, VideoTrackButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoTrackButton).call(this, player, options));

    var tracks = _this.player_.videoTracks();

    if (!tracks) {
      return _possibleConstructorReturn(_this);
    }

    var updateHandler = _this.update.bind(_this);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    _this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
    return _this;
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */


  _createClass(VideoTrackButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-video-button ' + _get(Object.getPrototypeOf(VideoTrackButton.prototype), 'buildCSSClass', this).call(this);
    }

    // Create a menu item for each text track

  }, {
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new MenuItem(this.player_, {
        'label': 'Quality',
        selectable: false
      }));
      // Add an OFF menu item to turn all tracks off
      items.push(new _offVideoTrackMenuItem2.default(this.player_, {
        'kind': 'Auto'
      }));

      var tracks = this.player_.videoTracks();

      if (!tracks) {
        return items;
      }

      if (tracks.length < 2) {
        return [];
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new _videoTrackMenuItem2.default(this.player_, {
            // MenuItem is selectable
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }
  }]);

  return VideoTrackButton;
}(MenuButton);

VideoTrackButton.prototype.kind_ = 'video';
VideoTrackButton.prototype.controlText_ = 'Quality Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'videoTrackButton');

Component.registerComponent('VideoTrackButton', VideoTrackButton);
exports.default = VideoTrackButton;