'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

require('./off-audio-track-menu-item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file audio-track-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import AudioTrackMenuItem from './audio-track-menu-item';


var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var TrackButton = _video2.default.getComponent('TrackButton');
var AudioTrackMenuItem = _video2.default.getComponent('AudioTrackMenuItem');

/**
 * The base class for buttons that toggle specific audio track types (e.g. description)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class AudioTrackButton
 */

var AudioTrackButton = function (_TrackButton) {
  _inherits(AudioTrackButton, _TrackButton);

  function AudioTrackButton(player, options) {
    _classCallCheck(this, AudioTrackButton);

    options.tracks = player.audioTracks();
    return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioTrackButton).call(this, player, options));
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */


  _createClass(AudioTrackButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-audio-button ' + _get(Object.getPrototypeOf(AudioTrackButton.prototype), 'buildCSSClass', this).call(this);
    }

    // Create a menu item for each text track

  }, {
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // if there's only one audio track, there no point in showing it
      this.hideThreshold_ = 1;

      var tracks = this.player_.audioTracks();

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        items.push(new AudioTrackMenuItem(this.player_, {
          track: track,
          // MenuItem is selectable
          selectable: true
        }));
      }

      return items;

      /*let items = []
      items.push(new AudioTrackMenuItem(this.player_, {
        label: this.controlText_,
        selectable: false
      }))
       let tracks = this.player_.audioTracks()
       if (!tracks) {
        return items
      }
       if (tracks.length < 2) {
        this.hide()
        return items
      }
       for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i]
         // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new AudioTrackMenuItem(this.player_, {
            // MenuItem is selectable
            'selectable': true,
            'track': track
          }))
        }
      }
       return items*/
    }
  }]);

  return AudioTrackButton;
}(TrackButton);

AudioTrackButton.prototype.kind_ = 'audio';
AudioTrackButton.prototype.controlText_ = 'Audio Selection';

//Replace videojs CaptionButton child with this one
//ControlBar.prototype.options_.children.splice(12, 0, 'audioTrackButton')

Component.registerComponent('AudioTrackButton', AudioTrackButton);
exports.default = AudioTrackButton;