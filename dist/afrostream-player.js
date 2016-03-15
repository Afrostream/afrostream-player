/**
 * afrostream-player
 * @version 2.0.0
 * @copyright 2016 Afrostream, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.afrostreamPlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * @file audio-track-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _audioTrackMenuItem = require('./audio-track-menu-item');

var _audioTrackMenuItem2 = _interopRequireDefault(_audioTrackMenuItem);

var _offAudioTrackMenuItem = require('./off-audio-track-menu-item');

var _offAudioTrackMenuItem2 = _interopRequireDefault(_offAudioTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');

/**
 * The base class for buttons that toggle specific audio track types (e.g. description)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class AudioTrackButton
 */

var AudioTrackButton = (function (_MenuButton) {
  _inherits(AudioTrackButton, _MenuButton);

  function AudioTrackButton(player, options) {
    _classCallCheck(this, AudioTrackButton);

    _get(Object.getPrototypeOf(AudioTrackButton.prototype), 'constructor', this).call(this, player, options);

    var tracks = this.player_.audioTracks();

    if (this.items.length <= 1) {
      this.hide();
    }

    if (!tracks) {
      return;
    }

    var updateHandler = this.update.bind(this);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
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
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      // Add an OFF menu item to turn all tracks off
      items.push(new _offAudioTrackMenuItem2['default'](this.player_, {
        'kind': this.kind_
      }));

      var tracks = this.player_.audioTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new _audioTrackMenuItem2['default'](this.player_, {
            // MenuItem is selectable
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }
  }]);

  return AudioTrackButton;
})(MenuButton);

AudioTrackButton.prototype.kind_ = 'audio';
AudioTrackButton.prototype.controlText_ = 'Audio Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'audioTrackButton');

Component.registerComponent('AudioTrackButton', AudioTrackButton);
exports['default'] = AudioTrackButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-track-menu-item":2,"./off-audio-track-menu-item":5}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var AudioTrackMenuItem = (function (_MenuItem) {
  _inherits(AudioTrackMenuItem, _MenuItem);

  function AudioTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, AudioTrackMenuItem);

    var track = options['track'];
    var tracks = player.audioTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['enabled'] === true;

    _get(Object.getPrototypeOf(AudioTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */

  _createClass(AudioTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
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
})(MenuItem);

Component.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
exports['default'] = AudioTrackMenuItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

var _offCaptionTrackMenuItem = require('./off-caption-track-menu-item');

var _offCaptionTrackMenuItem2 = _interopRequireDefault(_offCaptionTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var CaptionsButton = _videoJs2['default'].getComponent('CaptionsButton');

var CaptionTrackButton = (function (_CaptionsButton) {
  _inherits(CaptionTrackButton, _CaptionsButton);

  function CaptionTrackButton(options, ready) {
    _classCallCheck(this, CaptionTrackButton);

    _get(Object.getPrototypeOf(CaptionTrackButton.prototype), 'constructor', this).call(this, options, ready);
  }

  // Create a menu item for each text track

  _createClass(CaptionTrackButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      // Add an OFF menu item to turn all tracks off
      items.push(new _offCaptionTrackMenuItem2['default'](this.player_, { 'kind': this.kind_, 'mode': 'hidden' }));

      var tracks = this.player_.textTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === this.kind_) {
          items.push(new _captionTrackMenuItem2['default'](this.player_, {
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }
  }]);

  return CaptionTrackButton;
})(CaptionsButton);

CaptionTrackButton.prototype.kind_ = 'captions';
CaptionTrackButton.prototype.controlText_ = 'Captions';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 1, 'captionTrackButton');

Component.registerComponent('CaptionTrackButton', CaptionTrackButton);
exports['default'] = CaptionTrackButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":4,"./off-caption-track-menu-item":6}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var CaptionTrackMenuItem = (function (_MenuItem) {
  _inherits(CaptionTrackMenuItem, _MenuItem);

  function CaptionTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, CaptionTrackMenuItem);

    var track = options['track'];
    var tracks = player.textTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['mode'] === 'showing';
    _get(Object.getPrototypeOf(CaptionTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      tracks.addEventListener('change', this.handleTracksChange.bind(this));
      this.on('dispose', function () {
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
        var event = undefined;

        _this.on(['tap', 'click'], function () {
          if (typeof window.Event !== 'object') {
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
          track['mode'] = this.player_.techName_ === 'Dash' ? 'hidden' : 'disabled';
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
})(MenuItem);

Component.registerComponent('CaptionTrackMenuItem', CaptionTrackMenuItem);
exports['default'] = CaptionTrackMenuItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
/**
 * @file off-audio-track-menu-item.js
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

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _audioTrackMenuItem = require('./audio-track-menu-item');

var _audioTrackMenuItem2 = _interopRequireDefault(_audioTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
//const AudioTrackMenuItem = videojs.getComponent('AudioTrackMenuItem');

/**
 * A special menu item for turning of a specific type of audio track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends AudioTrackMenuItem
 * @class OffAudioTrackMenuItem
 */

var OffAudioTrackMenuItem = (function (_AudioTrackMenuItem) {
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

    _get(Object.getPrototypeOf(OffAudioTrackMenuItem.prototype), 'constructor', this).call(this, player, options);
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
})(_audioTrackMenuItem2['default']);

Component.registerComponent('OffAudioTrackMenuItem', OffAudioTrackMenuItem);
exports['default'] = OffAudioTrackMenuItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-track-menu-item":2}],6:[function(require,module,exports){
(function (global){
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

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":4}],7:[function(require,module,exports){
(function (global){
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

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./video-track-menu-item":9}],8:[function(require,module,exports){
(function (global){
/**
 * @file video-track-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

var _offVideoTrackMenuItem = require('./off-video-track-menu-item');

var _offVideoTrackMenuItem2 = _interopRequireDefault(_offVideoTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');

/**
 * The base class for buttons that toggle specific video track types (e.g. commentary)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class VideoTrackButton
 */

var VideoTrackButton = (function (_MenuButton) {
  _inherits(VideoTrackButton, _MenuButton);

  function VideoTrackButton(player, options) {
    _classCallCheck(this, VideoTrackButton);

    _get(Object.getPrototypeOf(VideoTrackButton.prototype), 'constructor', this).call(this, player, options);

    var tracks = this.player_.videoTracks();

    if (this.items.length <= 1) {
      this.hide();
    }

    if (!tracks) {
      return;
    }

    var updateHandler = this.update.bind(this);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
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
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      // Add an OFF menu item to turn all tracks off
      items.push(new _offVideoTrackMenuItem2['default'](this.player_, {
        'kind': 'ABR'
      }));

      var tracks = this.player_.videoTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new _videoTrackMenuItem2['default'](this.player_, {
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
})(MenuButton);

VideoTrackButton.prototype.kind_ = 'video';
VideoTrackButton.prototype.controlText_ = 'Video Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'videoTrackButton');

Component.registerComponent('VideoTrackButton', VideoTrackButton);
exports['default'] = VideoTrackButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./off-video-track-menu-item":7,"./video-track-menu-item":9}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var VideoTrackMenuItem = (function (_MenuItem) {
  _inherits(VideoTrackMenuItem, _MenuItem);

  function VideoTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, VideoTrackMenuItem);

    var track = options['track'];
    var tracks = player.videoTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['selected'] === true;

    _get(Object.getPrototypeOf(VideoTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */

  _createClass(VideoTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
      var tracks = this.player_.videoTracks();

      _get(Object.getPrototypeOf(VideoTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track['selected'] = track === this.track;
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
      this.selected(this.track['selected']);
    }
  }]);

  return VideoTrackMenuItem;
})(MenuItem);

Component.registerComponent('VideoTrackMenuItem', VideoTrackMenuItem);
exports['default'] = VideoTrackMenuItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
/**
 * @file dash.js
 * DASH Media Controller - Wrapper for HTML5 Media API
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

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');
var Html5 = _videoJs2['default'].getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dash = (function (_Html5) {
  _inherits(Dash, _Html5);

  function Dash(options, ready) {
    var _this = this;

    _classCallCheck(this, Dash);

    _get(Object.getPrototypeOf(Dash.prototype), 'constructor', this).call(this, options, ready);

    var tracks = undefined;
    tracks = this.audioTracks();
    if (tracks) {
      (function () {
        var changeHandler = _this.handleAudioTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
    tracks = this.videoTracks();
    if (tracks) {
      (function () {
        var changeHandler = _this.handleVideoTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */

  _createClass(Dash, [{
    key: 'src',
    value: function src(_src) {
      var _this2 = this;

      if (_src === undefined) {
        return this.el_.src;
      } else {
        this.keySystemOptions_ = this.buildDashJSProtData(this.options_.protData);

        // Save the context after the first initialization for subsequent instances
        this.context_ = this.context_ || {};
        // But make a fresh MediaPlayer each time the sourceHandler is used
        this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();

        // Must run controller before these two lines or else there is no
        // element to bind to.
        this.mediaPlayer_.initialize();
        this.mediaPlayer_.attachView(this.el());
        this.mediaPlayer_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
        this.mediaPlayer_.on(_dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, this.onTextTracksAdded.bind(this));
        this.mediaPlayer_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
        // Dash.js autoplays by default
        if (!this.player_.options().autoplay) {
          this.mediaPlayer_.setAutoPlay(false);
        }

        this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
        this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
        this.mediaPlayer_.setInitialMediaSettingsFor('audio', { lang: this.options_.lang });
        this.mediaPlayer_.setInitialMediaSettingsFor('video', { lang: this.options_.lang });
        this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);
        //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video});
        this.player_.on('texttrackchange', this.textTracksChange.bind(this));

        this.player_.trigger('loadstart');
        // Fetches and parses the manifest - WARNING the callback is non-standard "error-last" style
        this.ready(function () {
          _this2.mediaPlayer_.retrieveManifest(_src, _this2.initializeDashJS.bind(_this2));
        });
      }
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(manifest, err) {
      this.trigger(_dashjs.MediaPlayer.events.STREAM_INITIALIZED);
      if (err) {
        this.player_.error(err);
      }

      var bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');
      var videoDashTracks = this.mediaPlayer_.getTracksFor('video');
      var autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();

      var defaultAudio = this.mediaPlayer_.getInitialMediaSettingsFor('audio');
      var defaultVideo = this.mediaPlayer_.getInitialMediaSettingsFor('video');
      var initialVideoBitrate = this.mediaPlayer_.getInitialBitrateFor('video');

      var i = undefined;

      for (i = 0; i < audioDashTracks.length; i++) {
        var track = audioDashTracks[i];
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === defaultAudio.lang;
      }

      for (i = 0; i < videoDashTracks.length; i++) {
        var track = videoDashTracks[i];
        var bitrateList = track.bitrateList;
        for (var j = 0; j < bitrateList.length; j++) {
          var bitRateInfo = bitrateList[j] / 1000;
          var bitRateTrack = this.addVideoTrack('main', bitRateInfo, bitRateInfo);
          bitRateTrack.selected = !autoSwitch && initialVideoBitrate === bitRateInfo;
        }
      }
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
        return;
      }
      var metrics = this.getCribbedMetricsFor(e.mediaType);
      if (metrics) {
        this.metrics_[e.mediaType] = _videoJs2['default'].mergeOptions(this.metrics_[e.mediaType], metrics);
        //this.trigger(videojs.obj.copy(e));
        var metricsChangeEvent = {
          type: _dashjs.MediaPlayer.events.METRIC_CHANGED,
          data: e.data
        };
        this.trigger(metricsChangeEvent);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      var metrics = this.mediaPlayer_.getMetricsFor(type),
          dashMetrics = this.mediaPlayer_.getDashMetrics(),
          repSwitch = undefined,
          bufferLevel = undefined,
          httpRequests = undefined,
          droppedFramesMetrics = undefined,
          bitrateIndexValue = undefined,
          bandwidthValue = undefined,
          pendingValue = undefined,
          numBitratesValue = undefined,
          bufferLengthValue = 0,
          point = undefined,
          movingLatency = {},
          movingDownload = {},
          movingRatio = {},
          droppedFramesValue = 0,
          requestsQueue = undefined,
          fillmoving = function fillmoving(type, Requests) {
        var requestWindow, downloadTimes, latencyTimes, durationTimes;

        requestWindow = Requests.slice(-20).filter(function (req) {
          return req.responsecode >= 200 && req.responsecode < 300 && !!req._mediaduration && req.type === "MediaSegment" && req._stream === type;
        }).slice(-4);
        if (requestWindow.length > 0) {

          latencyTimes = requestWindow.map(function (req) {
            return Math.abs(req.tresponse.getTime() - req.trequest.getTime()) / 1000;
          });

          movingLatency[type] = {
            average: latencyTimes.reduce(function (l, r) {
              return l + r;
            }) / latencyTimes.length,
            high: latencyTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: latencyTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: latencyTimes.length
          };

          downloadTimes = requestWindow.map(function (req) {
            return Math.abs(req._tfinish.getTime() - req.tresponse.getTime()) / 1000;
          });

          movingDownload[type] = {
            average: downloadTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length,
            high: downloadTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: downloadTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: downloadTimes.length
          };

          durationTimes = requestWindow.map(function (req) {
            return req._mediaduration;
          });

          movingRatio[type] = {
            average: durationTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length / movingDownload[type].average,
            high: durationTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }) / movingDownload[type].low,
            low: durationTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }) / movingDownload[type].high,
            count: durationTimes.length
          };
        }
      };

      if (metrics && dashMetrics) {
        repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
        bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);
        httpRequests = dashMetrics.getHttpRequests(metrics);
        droppedFramesMetrics = dashMetrics.getCurrentDroppedFrames(metrics);
        requestsQueue = dashMetrics.getRequestsQueue(metrics);

        fillmoving("video", httpRequests);
        fillmoving("audio", httpRequests);

        var streamIdx = this.streamInfo ? this.streamInfo.index : 0;

        if (repSwitch !== null) {
          bitrateIndexValue = dashMetrics.getIndexForRepresentation(repSwitch.to, streamIdx);
          bandwidthValue = dashMetrics.getBandwidthForRepresentation(repSwitch.to, streamIdx);
          bandwidthValue = bandwidthValue / 1000;
          bandwidthValue = Math.round(bandwidthValue);
        }

        numBitratesValue = dashMetrics.getMaxIndexForBufferType(type, streamIdx);

        if (bufferLevel !== null) {
          bufferLengthValue = bufferLevel.toPrecision(5);
        }

        if (droppedFramesMetrics !== null) {
          droppedFramesValue = droppedFramesMetrics.droppedFrames;
        }

        if (isNaN(bandwidthValue) || bandwidthValue === undefined) {
          bandwidthValue = 0;
        }

        if (isNaN(bitrateIndexValue) || bitrateIndexValue === undefined) {
          bitrateIndexValue = 0;
        }

        if (isNaN(numBitratesValue) || numBitratesValue === undefined) {
          numBitratesValue = 0;
        }

        if (isNaN(bufferLengthValue) || bufferLengthValue === undefined) {
          bufferLengthValue = 0;
        }

        pendingValue = this.mediaPlayer_.getQualityFor(type);

        return {
          bandwidthValue: bandwidthValue,
          bitrateIndexValue: bitrateIndexValue + 1,
          pendingIndex: pendingValue !== bitrateIndexValue ? "(-> " + (pendingValue + 1) + ")" : "",
          numBitratesValue: numBitratesValue,
          bufferLengthValue: bufferLengthValue,
          droppedFramesValue: droppedFramesValue,
          movingLatency: movingLatency,
          movingDownload: movingDownload,
          movingRatio: movingRatio,
          requestsQueue: requestsQueue
        };
      } else {
        return null;
      }
    }
  }, {
    key: 'buildDashJSProtData',
    value: function buildDashJSProtData(keySystemOptions) {
      var output = {};

      if (!keySystemOptions) {
        return output;
      }

      Object.keys(keySystemOptions).forEach(function (key, data) {
        if (data.licenseUrl) {
          data.laURL = data.licenseUrl;
          delete data.licenseUrl;
        }
      });

      return keySystemOptions;
    }
  }, {
    key: 'initializeDashJS',
    value: function initializeDashJS(manifest, err) {
      var _this3 = this;

      var manifestProtectionData = {};

      if (err) {
        this.showErrors();
        this.triggerReady();
        this.dispose();
        return;
      }

      // If we haven't received protection data from the outside world try to get it from the manifest
      // We merge the two allowing the manifest to override any keySystemOptions provided via src()
      if (this.getWidevineProtectionData) {
        manifestProtectionData = this.getWidevineProtectionData(manifest);
        this.keySystemOptions_ = _videoJs2['default'].mergeOptions(this.keySystemOptions_, manifestProtectionData);
      }

      // We have to reset any mediaKeys before the attachSource call below
      this.resetSrc_(function () {
        _this3.afterMediaKeysReset(manifest);
      });
    }
  }, {
    key: 'onTextTracksAdded',
    value: function onTextTracksAdded(e) {
      var tracks = e.tracks;
      if (tracks) {
        var l = tracks.length,
            track;
        for (var i = 0; i < l; i++) {
          track = tracks[i];

          if (track.kind !== 'captions') {
            break;
          }
          if (track.lang === 'fra') {
            track.defaultTrack = true;
            this.mediaPlayer_.setTextTrack(i);
          }
        }
      }
    }

    /**
     * Update display texttracks
     *
     * @method updateDisplay
     */
  }, {
    key: 'textTracksChange',
    value: function textTracksChange() {
      var tracks = this.textTracks();

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['mode'] === 'showing') {
          this.mediaPlayer_.setTextTrack(i);
        }
      }
    }
  }, {
    key: 'handleAudioTracksChange',
    value: function handleAudioTracksChange() {
      var tracks = this.audioTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }

      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['enabled']) {
          this.mediaPlayer_.setCurrentTrack(audioDashTracks[i]);
        }
      }
    }
  }, {
    key: 'handleVideoTracksChange',
    value: function handleVideoTracksChange() {
      var tracks = this.videoTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }
      var isInt = tracks.selectedIndex !== null && !isNaN(tracks.selectedIndex) && tracks.selectedIndex % 1 === 0;

      this.mediaPlayer_.setAutoSwitchQuality(!isInt);
      if (isInt) {
        this.mediaPlayer_.setQualityFor('video', tracks.selectedIndex);
      }
    }
  }, {
    key: 'afterMediaKeysReset',
    value: function afterMediaKeysReset(manifest) {
      this.showErrors();

      // Attach the source with any protection data
      this.mediaPlayer_.attachSource(manifest, null, this.keySystemOptions_, 'fr');

      this.triggerReady();
    }
  }, {
    key: 'showErrors',
    value: function showErrors() {
      var _this4 = this;

      // The video element's src is set asynchronously so we have to wait a while
      // before we unhide any errors
      // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
      // in my testing
      this.setTimeout(function () {
        _this4.player_.removeClass('vjs-dashjs-hide-errors');
      }, 250);
    }
  }, {
    key: 'resetSrc_',
    value: function resetSrc_(callback) {
      // In Chrome, MediaKeys can NOT be changed when a src is loaded in the video element
      // Dash.js has a bug where it doesn't correctly reset the data so we do it manually
      // The order of these two lines is important. The video element's src must be reset
      // to allow `mediaKeys` to changed otherwise a DOMException is thrown.
      if (this.el()) {
        this.el().src = '';
        if (this.el().setMediaKeys) {
          this.el().setMediaKeys(null).then(callback, callback);
        } else {
          callback();
        }
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.mediaPlayer_) {
        this.mediaPlayer_.reset();
      }
      this.resetSrc_(Function.prototype);
      _get(Object.getPrototypeOf(Dash.prototype), 'dispose', this).call(this, this);
    }
  }]);

  return Dash;
})(Html5);

Dash.prototype.options_ = {
  lang: 'fr',
  autoSwitch: true,
  bolaEnabled: true,
  scheduleWhilePaused: false,
  buffer: {
    minBufferTime: 12,
    lowBufferThreshold: 4,
    bufferTimeAtTopQuality: 30,
    bufferTimeAtTopQualityLongForm: 300,
    longFormContentDurationThreshold: 600,
    richBufferThreshold: 20,
    bufferToKeep: 30,
    bufferPruningInterval: 30
  },
  protData: {}
};

/* Dash Support Testing -------------------------------------------------------- */

Dash.isSupported = function () {
  return Html5.isSupported() && !!_globalWindow2['default'].MediaSource;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dash);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dash.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (source) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(source)) {
    return 'probably';
  } else if (dashExtRE.test(source)) {
    return 'maybe';
  } else {
    return '';
  }
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dash.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dash.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dash.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dash.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dash.registerSourceHandler(Dash.nativeSourceHandler);

_videoJs2['default'].options.dash = {};

Component.registerComponent('Dash', Dash);
Tech.registerTech('Dash', Dash);
exports['default'] = Dash;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":12}],11:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var MediaTechController = _videoJs2['default'].getComponent('MediaTechController');

MediaTechController.METRICS_DATA = {
  bandwidth: -1,
  bitrateIndex: 0,
  pendingIndex: '',
  numBitrates: 0,
  bufferLength: 0,
  droppedFrames: 0,
  movingLatency: 0,
  movingDownload: 0,
  movingRatio: 0,
  requestsQueue: 0
};

MediaTechController.prototype.metrics_ = {
  video: _videoJs2['default'].mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/-1
  }, MediaTechController.METRICS_DATA),
  audio: _videoJs2['default'].mergeOptions({
    bandwidth: /*this.el().webkitAudioDecodedByteCount || */-1
  }, MediaTechController.METRICS_DATA),
  p2pweb: {
    chunksFromCDN: 0,
    chunksFromP2P: 0,
    chunksSent: 0,
    bufferLength: -1,
    swarmSize: -1,
    p2pRatio: -1,
    startupTime: -1
  }
};

MediaTechController.prototype.mediaPlayer = null;

MediaTechController.prototype.mediaPlayer = function () {
  return this.mediaPlayer_;
};

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
MediaTechController.prototype.getPlaybackStatistics = function () {
  return this.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
MediaTechController.prototype.getCribbedMetricsFor = function (type) {
  return this.metrics_[type];
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
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

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

//import Player from './core/player';

var _techMedia = require('./tech/media');

var _techMedia2 = _interopRequireDefault(_techMedia);

var _techDash = require('./tech/dash');

var _techDash2 = _interopRequireDefault(_techDash);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

var _componentControlBarTrackControlsCaptionTrackButton = require('./component/control-bar/track-controls/caption-track-button');

var _componentControlBarTrackControlsCaptionTrackButton2 = _interopRequireDefault(_componentControlBarTrackControlsCaptionTrackButton);

var _componentControlBarTrackControlsAudioTrackButton = require('./component/control-bar/track-controls/audio-track-button');

var _componentControlBarTrackControlsAudioTrackButton2 = _interopRequireDefault(_componentControlBarTrackControlsAudioTrackButton);

var _componentControlBarTrackControlsVideoTrackButton = require('./component/control-bar/track-controls/video-track-button');

var _componentControlBarTrackControlsVideoTrackButton2 = _interopRequireDefault(_componentControlBarTrackControlsVideoTrackButton);

var Component = _videoJs2['default'].getComponent('Component');
/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Afrostream = (function (_Component) {
  _inherits(Afrostream, _Component);

  function Afrostream(player, options, ready) {
    _classCallCheck(this, Afrostream);

    _get(Object.getPrototypeOf(Afrostream.prototype), 'constructor', this).call(this, player, options, ready);

    player.one('loadstart', _videoJs2['default'].bind(this, this.onLoadStart));

    //player.audioTracks = ::this.audioTracks;
    //player.setAudioTrack = ::this.setAudioTrack;
    //player.videoTracks = ::this.videoTracks;
    //player.setVideoTrack = ::this.setVideoTrack;
    //player.getPlaybackStatistics = ::this.getPlaybackStatistics;
    //player.getCribbedMetricsFor = ::this.getCribbedMetricsFor;
  }

  _createClass(Afrostream, [{
    key: 'onLoadStart',
    value: function onLoadStart() {
      this.addMediaPlayerHandlers();
    }
  }, {
    key: 'addMediaPlayerHandlers',
    value: function addMediaPlayerHandlers() {
      this.player().on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.player().on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.stream !== 'video' && e.stream !== 'audio' && e.stream !== 'p2pweb') {
        return;
      }
      var metrics = this.player().getCribbedMetricsFor(e.stream);
      if (metrics) {
        switch (e.stream) {
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
  }, {
    key: 'audioTracks',
    value: function audioTracks() {
      return this.player().tech_ && this.player().techGet_('audioTracks');
    }
  }, {
    key: 'setAudioTrack',
    value: function setAudioTrack(track) {
      return this.player().tech_ && this.player().techCall_('setAudioTrack', track);
    }
  }, {
    key: 'videoTracks',
    value: function videoTracks() {
      return this.player().tech_ && this.player().techGet_('videoTracks');
    }
  }, {
    key: 'setVideoTrack',
    value: function setVideoTrack(track) {
      return this.player().tech_ && this.player().tech_.setVideoTrack(track);
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      return this.player().tech_ && this.player().tech_.getPlaybackStatistics();
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      return this.player().tech_ && this.player().tech_.getCribbedMetricsFor(type);
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
_videoJs2['default'].options.children.push('afrostream');

Component.registerComponent('Afrostream', Afrostream);
exports['default'] = Afrostream;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/track-controls/audio-track-button":1,"./component/control-bar/track-controls/caption-track-button":3,"./component/control-bar/track-controls/video-track-button":8,"./tech/dash":10,"./tech/media":11}]},{},[13])(13)
});