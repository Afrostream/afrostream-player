/**
 * afrostream-player
 * @version 2.0.0
 * @copyright 2016 Afrostream, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.afrostreamPlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _trackControlsCaptionTrackButton = require('./track-controls/caption-track-button');

var _trackControlsCaptionTrackButton2 = _interopRequireDefault(_trackControlsCaptionTrackButton);

var _trackControlsAudioTrackButton = require('./track-controls/audio-track-button');

var _trackControlsAudioTrackButton2 = _interopRequireDefault(_trackControlsAudioTrackButton);

var _trackControlsVideoTrackButton = require('./track-controls/video-track-button');

var _trackControlsVideoTrackButton2 = _interopRequireDefault(_trackControlsVideoTrackButton);

var _nextNextVideoButton = require('./next/next-video-button');

var _nextNextVideoButton2 = _interopRequireDefault(_nextNextVideoButton);

var _progressControlLoadProgressSpinner = require('./progress-control/load-progress-spinner');

var _progressControlLoadProgressSpinner2 = _interopRequireDefault(_progressControlLoadProgressSpinner);

var _progressControlMouseThumbnailDisplay = require('./progress-control/mouse-thumbnail-display');

var _progressControlMouseThumbnailDisplay2 = _interopRequireDefault(_progressControlMouseThumbnailDisplay);
},{"./next/next-video-button":2,"./progress-control/load-progress-spinner":4,"./progress-control/mouse-thumbnail-display":5,"./track-controls/audio-track-button":6,"./track-controls/caption-track-button":8,"./track-controls/video-track-button":13}],2:[function(require,module,exports){
(function (global){
/**
 * @file next-video-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _nextVideoItem = require('./next-video-item');

var _nextVideoItem2 = _interopRequireDefault(_nextVideoItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class NextVideoButton
 */

var NextVideoButton = (function (_MenuButton) {
  _inherits(NextVideoButton, _MenuButton);

  function NextVideoButton(player) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, NextVideoButton);

    _get(Object.getPrototypeOf(NextVideoButton.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Create the list of menu items. Specific to each subclass.
   *
   * @method createItems
   */

  _createClass(NextVideoButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      if (!this.options_.poster) {
        this.hide();
        return items;
      }
      items.push(new _nextVideoItem2['default'](this.player_, {
        label: 'Next',
        selectable: false,
        poster: this.options_.poster
      }));
      return items;
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-next-video-button ' + _get(Object.getPrototypeOf(NextVideoButton.prototype), 'buildCSSClass', this).call(this);
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoButton.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoButton;
})(MenuButton);

NextVideoButton.prototype.controlText_ = 'Next video';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 2, 0, 'nextVideoButton');

Component.registerComponent('NextVideoButton', NextVideoButton);
exports['default'] = NextVideoButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./next-video-item":3}],3:[function(require,module,exports){
(function (global){
/**
 * @file next-video-item.js
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

var Component = _videoJs2['default'].getComponent('Component');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuItem
 * @class NextVideoItem
 */

var NextVideoItem = (function (_MenuItem) {
  _inherits(NextVideoItem, _MenuItem);

  function NextVideoItem(player, options) {
    _classCallCheck(this, NextVideoItem);

    _get(Object.getPrototypeOf(NextVideoItem.prototype), 'constructor', this).call(this, player, options);
    this.setSrc(options.poster);
  }

  /**
   * Create the component's DOM element
   *
   * @param {String=} type Desc
   * @param {Object=} props Desc
   * @return {Element}
   * @method createEl
   */

  _createClass(NextVideoItem, [{
    key: 'createEl',
    value: function createEl(type, props, attrs) {
      var el = _get(Object.getPrototypeOf(NextVideoItem.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-menu-item',
        tabIndex: -1
      }, attrs);

      this.fallbackImg_ = _videoJs2['default'].createEl(_videoJs2['default'].browser.BACKGROUND_SIZE_SUPPORTED ? 'div' : 'img', {
        className: 'thumb-tile_thumb'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(url) {
      var backgroundImage = undefined;

      if (!_videoJs2['default'].browser.BACKGROUND_SIZE_SUPPORTED) {
        this.fallbackImg_.src = url;
      } else {
        backgroundImage = '';
        if (url) {
          backgroundImage = 'url("' + url + '")';
        }

        this.fallbackImg_.style.backgroundImage = backgroundImage;
      }
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoItem.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoItem;
})(MenuItem);

Component.registerComponent('NextVideoItem', NextVideoItem);
exports['default'] = NextVideoItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
/**
 * @file load-progress-spinner.js
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

var Component = _videoJs2['default'].getComponent('Component');
var LoadProgressBar = _videoJs2['default'].getComponent('LoadProgressBar');

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LoadProgressSpinner
 */

var LoadProgressSpinner = (function (_LoadProgressBar) {
  _inherits(LoadProgressSpinner, _LoadProgressBar);

  function LoadProgressSpinner(player, options) {
    _classCallCheck(this, LoadProgressSpinner);

    _get(Object.getPrototypeOf(LoadProgressSpinner.prototype), 'constructor', this).call(this, player, options);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */

  _createClass(LoadProgressSpinner, [{
    key: 'createEl',
    value: function createEl() {
      var el = _videoJs2['default'].createEl('div', {
        className: 'vjs-load-progress-spinner',
        innerHTML: '<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg>'
      });

      this.circle = _videoJs2['default'].createEl('svg', {
        className: 'circular',
        innerHTML: '<circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/>'
      }, {
        viewBox: '25 25 50 50'
      });

      //el.appendChild(this.circle);
      return el;
    }

    /**
     * Update progress bar
     *
     * @method update
     */
  }, {
    key: 'update',
    value: function update() {
      var buffered = this.player_.buffered();
      var duration = this.player_.duration();
      var bufferedEnd = this.player_.bufferedEnd();
      var children = this.el_.children;
      var rayon = this.options_.rayon;

      // get the percent width of a time compared to the total end
      //let percentify = function (time, end) {
      //  let percent = (time / end) || 0; // no NaN
      //  percent = ((percent >= 1 ? 1 : percent) * 100);
      //
      //  let c = Math.PI * (rayon * 2);
      //  let pct = ((100 - percent) / 200) * c;
      //  return pct;
      //};

      // get the percent width of a time compared to the total end
      var percentify = function percentify(time, end) {
        var percent = time / end || 0; // no NaN
        return (percent >= 1 ? 1 : percent) * 125;
      };

      // update the width of the progress bar
      var svg = this.getFirstChild(this.el_);
      if (svg) {
        var i = buffered.length - 1;
        var start = buffered.start(i);
        var end = buffered.end(i);
        var percent = percentify(end - start, 30);
        var firstSvgChild = this.getFirstChild(svg);
        if (firstSvgChild) {
          var stroke = this.getFirstChild(firstSvgChild);
          if (stroke) {
            stroke.style.strokeDasharray = [percent, 125];
          }
        }
      }

      //for (let i = 0; i < buffered.length; i++) {
      //  let start = buffered.start(i);
      //  let end = buffered.end(i);
      //
      //  // set the percent based on the width of the progress bar (bufferedEnd)
      //  part.style.left = percentify(start, bufferedEnd);
      //  part.style.width = percentify(end - start, bufferedEnd);
      //}
      //
      //// remove unused buffered range elements
      //for (let i = children.length; i > buffered.length; i--) {
      //  this.el_.removeChild(children[i - 1]);
      //}
    }
  }, {
    key: 'getFirstChild',
    value: function getFirstChild(el) {
      var firstChild = el.firstChild;
      while (firstChild != null && firstChild.nodeType == 3) {
        // skip TextNodes
        firstChild = firstChild.nextSibling;
      }
      return firstChild;
    }
  }]);

  return LoadProgressSpinner;
})(LoadProgressBar);

LoadProgressSpinner.prototype.options_ = {
  rayon: 20
};

Component.registerComponent('LoadProgressSpinner', LoadProgressSpinner);

//Replace videojs CaptionButton child with this one
_videoJs2['default'].options.children.splice(3, 1, 'loadProgressSpinner');

exports['default'] = LoadProgressSpinner;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
/**
 * @file mouse-thumbnail-display.js
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

var Component = _videoJs2['default'].getComponent('Component');
var MouseTimeDisplay = _videoJs2['default'].getComponent('MouseTimeDisplay');
var SeekBar = _videoJs2['default'].getComponent('SeekBar');

/**
 * The Mouse Time Display component shows the time you will seek to
 * when hovering over the progress bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MouseThumbnailDisplay
 */

var MouseThumbnailDisplay = (function (_MouseTimeDisplay) {
  _inherits(MouseThumbnailDisplay, _MouseTimeDisplay);

  function MouseThumbnailDisplay(player, options) {
    _classCallCheck(this, MouseThumbnailDisplay);

    _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'constructor', this).call(this, player, options);
  }

  _createClass(MouseThumbnailDisplay, [{
    key: 'createLoader',
    value: function createLoader(src) {
      this.destroyLoader();

      this.img = new Image();
      this.img.onload = this.handleComplete.bind(this);
      this.img.onerror = this.handleError.bind(this);
      this.img.src = src;
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      var url = this.destroyLoader();
      if (_videoJs2['default'].hasClass(this.fallbackImg_, 'vjs-hidden')) {
        _videoJs2['default'].removeClass(this.fallbackImg_, 'vjs-hidden');
      }
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      var url = this.destroyLoader();
      _videoJs2['default'].log('thumbnails : next error ' + url);
      if (this.itemIndex = 1) {
        this.dispose();
      }
    }
  }, {
    key: 'destroyLoader',
    value: function destroyLoader() {
      var imgSrouce = '';
      if (this.img) {
        imgSrouce = this.img.src;
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
      return imgSrouce;
    }
  }, {
    key: 'extractAssetUri',
    value: function extractAssetUri() {
      var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var currentSrc = this.player_.currentSrc();
      var urlInfo = _videoJs2['default'].parseUrl(currentSrc);
      var pathname = urlInfo.pathname.replace(/\/([a-z0-9\/\._-]{16}\.[is]sml?)+\/([a-z0-9\/\._-]*\.(mpd|m3u8)?)$/gi, '');
      var fullPah = urlInfo.protocol + '//' + urlInfo.host + pathname + '/frames/map-{index}.jpg';
      var current = fullPah.replace('{index}', this.itemIndex);
      var next = fullPah.replace('{index}', this.itemIndex + 1);
      if (this.itemIndex < max) {
        this.createLoader(next);
      }

      return current;
    }

    /**
     * Create the component's DOM element
     *
     * @return {Element}
     * @method createEl
     */
  }, {
    key: 'createEl',
    value: function createEl() {
      var el = _videoJs2['default'].createEl('div', {
        className: 'vjs-thumbnail-display'
      });

      this.fallbackImg_ = _videoJs2['default'].createEl('div', {
        className: 'vjs-thumbnail-display_thumb vjs-hidden'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'update',
    value: function update(newTime, position) {
      _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'update', this).call(this, newTime, position);
      var timeInterval = 60;
      var spriteSize = {
        w: 600,
        h: 330
      };
      var spritesPerRow = 5;
      var spritesPerCol = 5;

      var sheetWidth = spriteSize.w / spritesPerRow;
      var sheetHeight = spriteSize.h / spritesPerCol;

      if (this.player_.isFullscreen()) {
        sheetWidth = 200;
        sheetHeight = 112;
      }

      var spritesPerSheet = spritesPerRow * spritesPerCol;
      var secondsPerSheet = timeInterval * spritesPerSheet;

      var index = Math.max(1, Math.ceil(newTime / secondsPerSheet));
      var duration = this.player_.duration();
      var maxItem = 1;
      if (duration) {
        maxItem = Math.ceil(this.player_.duration() / secondsPerSheet);
      }
      var stripedTime = newTime - (index - 1) * secondsPerSheet;
      var sheetIndex = Math.floor(stripedTime / timeInterval);
      var x = Math.floor(sheetIndex % 5 * sheetWidth);
      var y = Math.floor(sheetIndex / spritesPerCol) * sheetHeight;
      if (this.itemIndex !== index) {
        this.itemIndex = index;
        var url = this.extractAssetUri(maxItem);
        var backgroundImage = 'url("' + url + '")';
        this.fallbackImg_.style.backgroundImage = backgroundImage;
      }

      this.fallbackImg_.style.backgroundPositionX = -x + 'px';
      this.fallbackImg_.style.backgroundPositionY = -y + 'px';
    }
  }]);

  return MouseThumbnailDisplay;
})(MouseTimeDisplay);

MouseThumbnailDisplay.prototype.itemIndex = 1;
//Push videojs SeekBar child with this one
SeekBar.prototype.options_.children.splice(1, 1, 'mouseThumbnailDisplay');
Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
exports['default'] = MouseThumbnailDisplay;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
/**
 * @file audio-track-button.js
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

var _offAudioTrackMenuItem = require('./off-audio-track-menu-item');

var _offAudioTrackMenuItem2 = _interopRequireDefault(_offAudioTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

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
      var items = [];
      items.push(new MenuItem(this.player_, {
        label: this.controlText_,
        selectable: false
      }));

      var tracks = this.player_.audioTracks();

      if (!tracks) {
        return items;
      }

      if (tracks.length < 2) {
        this.hide();
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
},{"./audio-track-menu-item":7,"./off-audio-track-menu-item":10}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

var _offCaptionTrackMenuItem = require('./off-caption-track-menu-item');

var _offCaptionTrackMenuItem2 = _interopRequireDefault(_offCaptionTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var CaptionsButton = _videoJs2['default'].getComponent('CaptionsButton');
var TextTrackMenuItem = _videoJs2['default'].getComponent('TextTrackMenuItem');

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
      var items = [];
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

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-captions-extended-button ' + _get(Object.getPrototypeOf(CaptionTrackButton.prototype), 'buildCSSClass', this).call(this);
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
},{"./caption-track-menu-item":9,"./off-caption-track-menu-item":11}],9:[function(require,module,exports){
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
})(MenuItem);

Component.registerComponent('CaptionTrackMenuItem', CaptionTrackMenuItem);
exports['default'] = CaptionTrackMenuItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
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
},{"./audio-track-menu-item":7}],11:[function(require,module,exports){
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
},{"./caption-track-menu-item":9}],12:[function(require,module,exports){
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
      'label': options['kind'],
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
},{"./video-track-menu-item":14}],13:[function(require,module,exports){
(function (global){
/**
 * @file video-track-button.js
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

var _offVideoTrackMenuItem = require('./off-video-track-menu-item');

var _offVideoTrackMenuItem2 = _interopRequireDefault(_offVideoTrackMenuItem);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var MenuButton = _videoJs2['default'].getComponent('MenuButton');
var MenuItem = _videoJs2['default'].getComponent('MenuItem');

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
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new MenuItem(this.player_, {
        'label': 'Quality',
        selectable: false
      }));
      // Add an OFF menu item to turn all tracks off
      items.push(new _offVideoTrackMenuItem2['default'](this.player_, {
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
VideoTrackButton.prototype.controlText_ = 'Quality Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'videoTrackButton');

Component.registerComponent('VideoTrackButton', VideoTrackButton);
exports['default'] = VideoTrackButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./off-video-track-menu-item":12,"./video-track-menu-item":14}],14:[function(require,module,exports){
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

  /**
   * LABELS
   *
   * @static
   */

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
},{}],15:[function(require,module,exports){
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

    tracks = this.textTracks();

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }

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
   * Detect if source is Live
   * TODO detect with other method based on duration Infinity
   * @returns {boolean}
   */

  _createClass(Dash, [{
    key: 'isDynamic',
    value: function isDynamic() {
      var isDynamic = false;
      if (!this.playbackInitialized) {
        return isDynamic;
      }
      try {
        isDynamic = this.mediaPlayer_.time();
      } catch (e) {
        _videoJs2['default'].log(e);
      }
      return isDynamic;
    }
  }, {
    key: 'duration',
    value: function duration() {
      var duration = _get(Object.getPrototypeOf(Dash.prototype), 'duration', this).call(this);
      //FIXME WTF for detect live we should get duration to Infinity
      return this.isDynamic() ? Infinity : duration;
    }

    //play() {
    //  let isDynamic = this.isDynamic();
    //  if (isDynamic) {
    //    this.mediaPlayer_.retrieveManifest(this.options_.source.src, ::this.initializeDashJS);
    //  }
    //  super.play();
    //}

    /**
     * Set video
     *
     * @param {Object=} src Source object
     * @method setSrc
     */
  }, {
    key: 'src',
    value: function src(_src) {
      var _this2 = this;

      if (_src === undefined) {
        return this.el_.src;
      } else {

        this.isReady_ = false;
        this.featuresNativeTextTracks = Html5.supportsNativeTracks('text');
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
        this.mediaPlayer_.on(_dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, this.onProgress.bind(this));
        // Dash.js autoplays by default
        if (!this.player_.options().autoplay) {
          this.mediaPlayer_.setAutoPlay(false);
        }

        this.mediaPlayer_.setInitialMediaSettingsFor('audio', this.options_.inititalMediaSettings);
        this.mediaPlayer_.setInitialMediaSettingsFor('video', this.options_.inititalMediaSettings);
        this.mediaPlayer_.setTrackSwitchModeFor('audio', 'neverReplace'); //alwaysReplace
        this.mediaPlayer_.setTrackSwitchModeFor('video', 'neverReplace'); //alwaysReplace

        this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
        this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
        this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);

        this.mediaPlayer_.setLiveDelayFragmentCount(this.options_.liveFragmentCount);
        this.mediaPlayer_.setInitialBitrateFor('video', this.options_.initialBitrate);
        this.mediaPlayer_.setBufferToKeep(this.options_.buffer.minBufferTime);
        this.mediaPlayer_.setBufferPruningInterval(this.options_.buffer.bufferPruningInterval);
        this.mediaPlayer_.setStableBufferTime(this.options_.buffer.minBufferTime);
        this.mediaPlayer_.setBufferTimeAtTopQuality(this.options_.buffer.bufferTimeAtTopQuality);
        this.mediaPlayer_.setBufferTimeAtTopQualityLongForm(this.options_.buffer.bufferTimeAtTopQualityLongForm);
        this.mediaPlayer_.setLongFormContentDurationThreshold(this.options_.buffer.longFormContentDurationThreshold);
        this.mediaPlayer_.setRichBufferThreshold(this.options_.buffer.longFormContentDurationThreshold);
        this.mediaPlayer_.setBandwidthSafetyFactor(this.options_.buffer.bandwidthSafetyFactor);
        this.mediaPlayer_.setAbandonLoadTimeout(this.options_.buffer.abandonLoadTimeout);
        this.mediaPlayer_.setFragmentLoaderRetryAttempts(this.options_.buffer.fragmentLoaderRetryAttempts);
        this.mediaPlayer_.setFragmentLoaderRetryInterval(this.options_.buffer.fragmentLoaderRetryInterval);
        // ReplaceMediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
        // ReplaceMediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
        //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video});

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
      if (this.playbackInitialized) {
        return;
      }
      this.playbackInitialized = true;

      if (err) {
        this.player_.error(err);
      }

      this.trigger(_dashjs.MediaPlayer.events.STREAM_INITIALIZED);

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
          var label = Dash.qualityLabels[j] || bitRateInfo;
          var bitRateTrack = this.addVideoTrack('main', label, bitRateInfo);
          bitRateTrack.selected = !autoSwitch && initialVideoBitrate === bitRateInfo;
        }
      }
    }
  }, {
    key: 'onProgress',
    value: function onProgress(e) {
      this.trigger('progress');
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
          bandwidth: bandwidthValue,
          bitrateIndex: bitrateIndexValue + 1,
          pendingIndex: pendingValue !== bitrateIndexValue ? "(-> " + (pendingValue + 1) + ")" : "",
          numBitrates: numBitratesValue,
          bufferLength: bufferLengthValue,
          droppedFrames: droppedFramesValue,
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
        var plTracks = this.textTracks();
        var l = tracks.length,
            track,
            plTrack;
        for (var i = 0; i < l; i++) {
          track = tracks[i];
          track.label = track.label || Dash.captionsLangLabels[track.lang];
          plTrack = plTracks[i];
          if (track.defaultTrack) {
            this.mediaPlayer_.setTextTrack(i);
            if (plTrack) {
              plTrack.mode = 'showing';
            }
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
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      var tracks = this.textTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }
      var selected = undefined;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['mode'] === 'showing') {
          selected = true;
          this.mediaPlayer_.setTextTrack(i);
        }
      }
      if (!selected) {
        this.mediaPlayer_.setTextTrack(-1);
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
          var audioDashTrack = audioDashTracks[i];
          if (track['language'] == audioDashTrack['lang']) {
            audioDashTracks['enabled'] = true;
            try {
              this.mediaPlayer_.setCurrentTrack(audioDashTracks[i]);
            } catch (err) {
              _videoJs2['default'].log(err);
            }
          }
        }
      }
    }
  }, {
    key: 'handleVideoTracksChange',
    value: function handleVideoTracksChange() {
      var tracks = this.videoTracks();

      if (!tracks || !this.playbackInitialized || !this.options_.autoSwitch) {
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
      this.mediaPlayer_.setProtectionData(this.keySystemOptions_);
      this.mediaPlayer_.attachSource(manifest);

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
  inititalMediaSettings: {
    lang: 'fr'
  },
  //Set to false to switch off adaptive bitrate switching.
  autoSwitch: true,
  //Enabling buffer-occupancy ABR will switch to the *experimental* implementation of BOLA
  bolaEnabled: true,
  //Set to true if you would like dash.js to keep downloading fragments in the background
  scheduleWhilePaused: false,
  //A value of the initial bitrate, kbps
  initialBitrate: 400,
  //Represents how many segment durations to delay the live stream.
  liveFragmentCount: 4,
  //This value influences the buffer pruning logic.
  //https://github.com/Dash-Industry-Forum/dash.js/blob/master/src/streaming/MediaPlayer.js
  buffer: {
    //Allows you to modify the buffer that is kept in source buffer in seconds.
    bufferToKeep: 30,
    //When the time is set higher than the default you will have to wait longer
    minBufferTime: 12,
    //Allows you to modify the interval of pruning buffer in seconds.
    bufferPruningInterval: 30,
    //A percentage between 0.0 and 1 to reduce the measured throughput calculations
    bandwidthSafetyFactor: 0.9,
    //The time that the internal buffer target will be set to once playing the top quality.
    bufferTimeAtTopQuality: 30,
    //The time that the internal buffer target will be set to once playing the top quality for long form content.
    bufferTimeAtTopQualityLongForm: 60,
    //This will directly affect the buffer targets when playing back at the top quality.
    longFormContentDurationThreshold: 600,
    //A threshold, in seconds, of when dashjs abr becomes less conservative since we have a larger "rich" buffer
    richBufferThreshold: 20,
    //A timeout value in seconds, which during the ABRController will block switch-up events.
    abandonLoadTimeout: 10,
    //Total number of retry attempts that will occur on a fragment load before it fails.
    fragmentLoaderRetryAttempts: 3,
    //Time in milliseconds of which to reload a failed fragment load attempt.
    fragmentLoaderRetryInterval: 1000
  },
  protData: {}
};

/* Dash Support Testing -------------------------------------------------------- */

Dash.isSupported = function () {
  return Html5.isSupported() && !!window.MediaSource;
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

Dash.prototype['featuresNativeTextTracks'] = false;
/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Dash.prototype['featuresNativeAudioTracks'] = false;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Dash.prototype['featuresNativeVideoTracks'] = false;

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (type) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(type)) {
    return 'probably';
  } else if (dashExtRE.test(type)) {
    return 'maybe';
  } else {
    return '';
  }

  return '';
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

Dash.captionsLangLabels = {
  fra: 'Français',
  eng: 'Anglais'
};

Dash.qualityLabels = ['bas', 'moyen', 'normal', 'HD'];

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
},{}],16:[function(require,module,exports){
(function (global){
/**
 * @file dashas.js
 * DASH Media Controller - Wrapper for Flash Media API
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

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');
var Flash = _videoJs2['default'].getComponent('Flash');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dashas = (function (_Flash) {
  _inherits(Dashas, _Flash);

  function Dashas(options, ready) {
    _classCallCheck(this, Dashas);

    _get(Object.getPrototypeOf(Dashas.prototype), 'constructor', this).call(this, options, ready);
    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons
    window.videojs = window.videojs || {};
    window.videojs.Dashas = window.videojs.Dashas || {};
    window.videojs.Dashas.onReady = Flash.onReady;
    window.videojs.Dashas.onEvent = Flash.onEvent;
    window.videojs.Dashas.onError = Flash.onError;

    this.metricsInterval = this.setInterval(this.detectBandwithChange, 5000);
    this.one('loadedmetadata', this.onInitialized.bind(this));

    var tracks = this.audioTracks();

    var changeHandler = this.handleAudioTracksChange.bind(this);

    tracks.addEventListener('change', changeHandler);
    this.on('dispose', function () {
      tracks.removeEventListener('change', changeHandler);
    });
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */

  _createClass(Dashas, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options_;
      var serverUrl = Dashas.buildMetadataUrl(options);
      var customData = Dashas.buildOptData(options);
      // Merge default flashvars with ones passed in to init
      options.flashVars = _videoJs2['default'].mergeOptions({
        'metadataUrl': encodeURIComponent(serverUrl),
        'authenticationToken': encodeURIComponent(customData),
        'language': 'fr',
        'spinner': !1,
        'watermark': !1,
        'muted': this.player_.options_.muted,
        'debug': true,
        'quality': 'autolow',
        'maxBufferLength': 8
      }, options.flashVars || {});

      return _get(Object.getPrototypeOf(Dashas.prototype), 'createEl', this).call(this);
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized() {
      var metrics = this.getPlaybackStatistics();
      if (!metrics) {
        return;
      }
      this.metrics_ = _videoJs2['default'].mergeOptions(this.metrics_, metrics);

      this.addAudioTracks();
    }
  }, {
    key: 'handleAudioTracksChange',
    value: function handleAudioTracksChange() {
      var tracks = this.audioTracks();

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['enabled']) {
          try {
            this.el_.vjs_setProperty('forcedAudioLang', i);
          } catch (err) {
            _videoJs2['default'].log(err);
          }
        }
      }
    }
  }, {
    key: 'addAudioTracks',
    value: function addAudioTracks() {
      var tracks = this.el_.vjs_getProperty('audioTracks');

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (typeof track === 'string') {
          track = {
            label: track,
            lang: track
          };
        }
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === 'fra' || plTrack['language'] === 'fr';
      }
    }
  }, {
    key: 'detectBandwithChange',
    value: function detectBandwithChange() {
      var metrics = this.getPlaybackStatistics();
      var metricsChangeType = undefined;
      if (!metrics) {
        return;
      }
      switch (true) {
        case metrics.video.bandwidth !== this.metrics_.video.bandwidth:
          this.metrics_.video.bandwidth = metrics.video.bandwidth;
          metricsChangeType = 'video';
          break;
        case metrics.audio.bandwidth !== this.metrics_.audio.bandwidth:
          this.metrics_.audio.bandwidth = metrics.audio.bandwidth;
          metricsChangeType = 'audio';
          break;
        default:
          break;
      }
      if (metricsChangeType) {
        var metricsChangeEvent = {
          type: _dashjs.MediaPlayer.events.METRIC_CHANGED,
          data: metricsChangeType
        };

        this.trigger(metricsChangeEvent);
      }
    }
  }, {
    key: 'subtitleTracks',
    value: function subtitleTracks() {
      return this.textTracks();
    }
  }, {
    key: 'setSubsTrack',
    value: function setSubsTrack(track) {
      this.setTextTrack(track);
    }
  }, {
    key: 'getDroppedFrames',
    value: function getDroppedFrames() {
      return this.el_.vjs_getProperty('droppedFrames');
    }
  }, {
    key: 'getBuffered',
    value: function getBuffered() {
      return this.el_.vjs_getProperty('buffered');
    }
  }, {
    key: 'getBufferLevel',
    value: function getBufferLevel() {
      return this.el_.vjs_getProperty('bufferLevel');
    }
  }, {
    key: 'getCurrentAudioBandwidth',
    value: function getCurrentAudioBandwidth() {
      return this.el_.vjs_getProperty('currentAudioBandwidth');
    }
  }, {
    key: 'getCurrentVideoBandwidth',
    value: function getCurrentVideoBandwidth() {
      return this.el_.vjs_getProperty('currentVideoBandwidth');
    }
  }, {
    key: 'audioTracks',
    value: function audioTracks() {
      return Tech.prototype.audioTracks.call(this);
    }
  }, {
    key: 'poster',
    value: function poster() {
      return '';
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      var z = this.getBuffered();
      var W = (this.getBufferLevel(), this.getDroppedFrames());
      var Z = this.getCurrentVideoBandwidth();
      var K = this.getCurrentAudioBandwidth();
      var R = {
        bandwidth: Z / 1000,
        bufferLength: z,
        droppedFrames: W
      };
      var N = {
        bandwidth: K / 1000,
        bufferLength: z
      };
      return _videoJs2['default'].mergeOptions(this.metrics_, { video: R, audio: N });
    }
  }, {
    key: 'src',
    value: function src(_src) {
      var options = this.options_;
      var autoPlay = this.player_.autoplay();
      var serverUrl = Dashas.buildMetadataUrl(options);
      var customData = Dashas.buildOptData(options);
      this.el_.vjs_source(_src, autoPlay, serverUrl, customData);
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.el_.vjs_getProperty('currentTime');
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      return this.el_.vjs_getProperty('buffered');
    }
  }]);

  return Dashas;
})(Flash);

Dashas.extractAssetId = function (source) {
  var reg = /^(.*\/)?(?:$|(.+?)(?:(\.[^.]*$)|$))/;
  var filePath = source.match(reg);

  var assetId = filePath[2];
  return assetId;
};

Dashas.getDRMData = function (options) {
  var drmData = options.protData['com.adobe.flashaccess'];
  var assetId = options.source ? Dashas.extractAssetId(options.source.src) : '';
  var customData = drmData['httpRequestHeaders'] ? drmData['httpRequestHeaders'].customData || {} : {};
  var serverUrl = drmData['serverURL'] ? drmData['serverURL'] || '' : '';

  if (options.source && !options.source.drm) {
    serverUrl = customData = assetId = '';
  }

  return {
    customData: customData,
    serverUrl: serverUrl,
    assetId: assetId,
    variantId: '' //on utilise pas cette key
  };
};

Dashas.buildMetadataUrl = function (options) {
  var data = Dashas.getDRMData(options);
  var metadataUrl = data.serverUrl;
  if (data.customData) {
    metadataUrl += '?optData=' + data.customData;
  }
  if (data.assetId) {
    metadataUrl += '&assetId=' + data.assetId;
  }
  if (data.variantId) {
    metadataUrl += '&variantId=' + data.variantId;
  }
  return metadataUrl;
};

Dashas.buildOptData = function (options) {
  return Dashas.getDRMData(options).customData;
};

Dashas.prototype.options_ = {
  customData: {},
  protData: {
    "com.widevine.alpha": {},
    "com.microsoft.playready": {},
    "com.adobe.flashaccess": {},
    "org.w3.clearkey": {}
  }
};

/* Dash Support Testing -------------------------------------------------------- */

Dashas.isSupported = function () {
  return Flash.isSupported() && Flash.version()[0] >= 14;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dashas);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dashas.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canPlayType = function (source) {

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
Dashas.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dashas.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dashas.nativeSourceHandler.canPlayType(source.src);
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
Dashas.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dashas.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dashas.registerSourceHandler(Dashas.nativeSourceHandler);

_videoJs2['default'].options.dashas = {};

Component.registerComponent('Dashas', Dashas);
Tech.registerTech('Dashas', Dashas);

/**
 * @fileoverview Externs for video-js.swf. Externs are functions
 * that the compiler shouldn't obfuscate.
 */

/**
 * @param {string} name
 */
HTMLObjectElement.prototype.vjs_getProperty = function (name) {};

/**
 * @param {string} name
 * @param {string|number} value
 */
HTMLObjectElement.prototype.vjs_setProperty = function (name, value) {};

/**
 * Control methods
 */
HTMLObjectElement.prototype.vjs_play = function () {};
HTMLObjectElement.prototype.vjs_pause = function () {};
HTMLObjectElement.prototype.vjs_load = function () {};

/**
 * @param {string} src
 */
HTMLObjectElement.prototype.vjs_src = function (src) {};

exports['default'] = Dashas;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":18}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
(function (global){
/**
 * @file chromecast-button.js
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

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var Button = _videoJs2['default'].getComponent('Button');

/**
 * The base class for buttons that toggle chromecast video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class ChromeCastButton
 */

var ChromeCastButton = (function (_Button) {
  _inherits(ChromeCastButton, _Button);

  function ChromeCastButton(player, options) {
    _classCallCheck(this, ChromeCastButton);

    _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'constructor', this).call(this, player, options);
    this.hide();
    this.initializeApi();
    player.chromecast = this;
  }

  /**
   * Init chromecast sdk api
   *
   * @method initializeApi
   */

  _createClass(ChromeCastButton, [{
    key: 'initializeApi',
    value: function initializeApi() {
      var apiConfig = undefined;
      var appId = undefined;
      var sessionRequest = undefined;

      if (!_videoJs2['default'].browser.IS_CHROME || _videoJs2['default'].browser.IS_EDGE) {
        return;
      }
      if (!chrome.cast || !chrome.cast.isAvailable) {
        _videoJs2['default'].log('Cast APIs not available');
        if (this.tryingReconnect < 10) {
          this.setTimeout(this.initializeApi, 1000);
          ++this.tryingReconnect;
        }
        _videoJs2['default'].log('Cast APIs not available. Max reconnect attempt');
        return;
      }
      this.show();
      _videoJs2['default'].log('Cast APIs are available');
      appId = this.options_.appId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
      sessionRequest = new chrome.cast.SessionRequest(appId);
      apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionJoinedListener.bind(this), this.receiverListener.bind(this));
      return chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.castError.bind(this));
    }
  }, {
    key: 'castError',
    value: function castError(_castError) {

      var error = {
        code: _castError.code,
        message: _castError.description
      };

      switch (_castError.code) {
        case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
        case chrome.cast.ErrorCode.EXTENSION_MISSING:
        case chrome.cast.ErrorCode.EXTENSION_NOT_COMPATIBLE:
        case chrome.cast.ErrorCode.INVALID_PARAMETER:
        case chrome.cast.ErrorCode.LOAD_MEDIA_FAILED:
        case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
        case chrome.cast.ErrorCode.SESSION_ERROR:
        case chrome.cast.ErrorCode.CHANNEL_ERROR:
        case chrome.cast.ErrorCode.TIMEOUT:
          this.addClass('error');
          break;
        case chrome.cast.ErrorCode.CANCEL:
          break;
        default:
          this.player_.error(error);
          break;
      }
      return _videoJs2['default'].log('Cast Error: ' + JSON.stringify(_castError));
    }
  }, {
    key: 'onInitSuccess',
    value: function onInitSuccess() {
      return this.apiInitialized = true;
    }
  }, {
    key: 'sessionJoinedListener',
    value: function sessionJoinedListener(session) {
      if (session.media.length) {
        this.apiSession = session;
        this.onMediaDiscovered(session.media[0]);
      }
      return console.log('Session joined');
    }
  }, {
    key: 'receiverListener',
    value: function receiverListener(availability) {
      if (availability === 'available') {
        return this.show();
      }
    }
  }, {
    key: 'doLaunch',
    value: function doLaunch() {
      _videoJs2['default'].log('Cast video: ' + this.player_.currentSrc());
      if (this.apiInitialized) {
        return chrome.cast.requestSession(this.onSessionSuccess.bind(this), this.castError.bind(this));
      } else {
        return _videoJs2['default'].log('Session not initialized');
      }
    }
  }, {
    key: 'onSessionSuccess',
    value: function onSessionSuccess(session) {
      var image = undefined;
      var key = undefined;
      var loadRequest = undefined;
      var mediaInfo = undefined;
      var ref = undefined;
      var value = undefined;

      _videoJs2['default'].log('Session initialized: ' + session.sessionId);

      this.apiSession = session;
      var source = this.player_.currentSrc();
      var type = this.player_.currentType();

      mediaInfo = new chrome.cast.media.MediaInfo(source, type);
      mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
      if (this.options_.metadata) {
        ref = this.options_.metadata;
        for (key in ref) {
          value = ref[key];
          mediaInfo.metadata[key] = value;
        }
      }
      //Add poster image on player
      var poster = this.player().poster();
      if (poster) {
        image = new chrome.cast.Image(poster);
        mediaInfo.metadata.images = [image];
      }

      // Load/Add caption tracks
      var plTracks = this.player().textTracks();
      var remotePlTracks = this.player().remoteTextTrackEls();
      if (plTracks) {
        var tracks = [];
        for (var i = 0; i < plTracks.length; i++) {
          var plTrack = plTracks.tracks_[i];
          var remotePlTrack = remotePlTracks.trackElements_[i];
          var id = i + 1;
          var track = new chrome.cast.media.Track(id, chrome.cast.media.TrackType.TEXT);
          track.trackContentId = plTrack.id || (remotePlTrack ? remotePlTrack.src : id);
          track.trackContentType = plTrack.type;
          track.subtype = chrome.cast.media.TextTrackType.CAPTIONS;
          track.name = plTrack.label;
          track.language = plTrack.language;
          track.customData = null;
          tracks.push(track);
        }
        mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
        mediaInfo.textTrackStyle.foregroundColor = '#FFFFFF';
        mediaInfo.textTrackStyle.backgroundColor = '#00000060';
        mediaInfo.textTrackStyle.edgeType = chrome.cast.media.TextTrackEdgeType.DROP_SHADOW;
        mediaInfo.textTrackStyle.windowType = chrome.cast.media.TextTrackWindowType.ROUNDED_CORNERS;
        mediaInfo.tracks = tracks;
      }

      // Request load media source
      loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);

      loadRequest.autoplay = true;
      loadRequest.currentTime = this.player_.currentTime();

      this.apiSession.loadMedia(loadRequest, this.onMediaDiscovered.bind(this), this.castError.bind(this));
      this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
    }
  }, {
    key: 'onMediaDiscovered',
    value: function onMediaDiscovered(media) {
      this.player_.loadTech_('Chromecast', {
        type: 'cast',
        src: this.player_.currentSrc(),
        apiMedia: media,
        apiSession: this.apiSession
      });

      this.casting = true;
      this.inactivityTimeout = this.player_.options_.inactivityTimeout;
      this.player_.options_.inactivityTimeout = 0;
      this.player_.userActive(true);
      this.addClass('connected');
      this.removeClass('error');
    }
  }, {
    key: 'onSessionUpdate',
    value: function onSessionUpdate(isAlive) {
      if (!this.player_.apiMedia) {
        return;
      }
      if (!isAlive) {
        return this.onStopAppSuccess();
      }
    }
  }, {
    key: 'stopCasting',
    value: function stopCasting() {
      return this.apiSession.stop(this.onStopAppSuccess.bind(this), this.castError.bind(this));
    }
  }, {
    key: 'onStopAppSuccess',
    value: function onStopAppSuccess() {
      this.casting = false;
      var time = this.player_.currentTime();
      this.removeClass('connected');
      this.player_.src(this.player_.options_['sources']);
      if (!this.player_.paused()) {
        this.player_.one('seeked', function () {
          return this.player_.play();
        });
      }
      this.player_.currentTime(time);
      this.player_.options_.inactivityTimeout = this.inactivityTimeout;
      return this.apiSession = null;
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-chromecast-button ' + _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'buildCSSClass', this).call(this);
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'handleClick', this).call(this);
      if (this.casting) {
        return this.stopCasting();
      } else {
        return this.doLaunch();
      }
    }
  }]);

  return ChromeCastButton;
})(Button);

ChromeCastButton.prototype.tryingReconnect = 0;

ChromeCastButton.prototype.inactivityTimeout = 2000;

ChromeCastButton.prototype.controlText_ = 'Chromecast';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 1, 0, 'chromeCastButton');

Component.registerComponent('ChromeCastButton', ChromeCastButton);
exports['default'] = ChromeCastButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],22:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videojsChromecast = require('./videojs-chromecast');

var _videojsChromecast2 = _interopRequireDefault(_videojsChromecast);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _videojsChromecast2['default'])(this, options);
};

_videoJs2['default'].plugin('chromecast', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./videojs-chromecast":24}],23:[function(require,module,exports){
(function (global){
/**
 * @file chromecast.js
 * Chromecast Media Controller - Wrapper for HTML5 Media API
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

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');

/**
 * Chromecast Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Chromecast
 */

var Chromecast = (function (_Tech) {
  _inherits(Chromecast, _Tech);

  function Chromecast(options, ready) {
    var _this = this;

    _classCallCheck(this, Chromecast);

    _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, options, ready);
    this.apiMedia = this.options_.source.apiMedia;
    this.apiSession = this.options_.source.apiSession;
    this.receiver = this.apiSession.receiver.friendlyName;

    this.apiMedia.addUpdateListener(this.onMediaStatusUpdate.bind(this));
    this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
    var tracks = this.textTracks();
    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });

        _this.handleTracksChange();
      })();
    }

    this.update();
    this.triggerReady();

    this.trigger('loadstart');
    this.trigger('loadedmetadata');
    this.trigger('loadeddata');
    this.trigger('canplay');
    this.trigger('canplaythrough');
    this.trigger('durationchange');
  }

  _createClass(Chromecast, [{
    key: 'createEl',
    value: function createEl() {
      var el = _videoJs2['default'].createEl('div', {
        id: this.options_.techId,
        className: 'vjs-tech vjs-tech-chromecast'
      });
      return el;
    }
  }, {
    key: 'update',
    value: function update() {
      this.el_.innerHTML = '<div class="casting-image" style="background-image: url(\'' + this.options_.poster + '\')"></div><div class="casting-overlay"><div class="casting-information"><div class="casting-icon"></div><div class="casting-description"><small>' + this.localize('CASTING TO') + '</small><br>' + this.receiver + '</div></div></div>';
    }
  }, {
    key: 'onSessionUpdate',
    value: function onSessionUpdate(isAlive) {
      if (!this.apiMedia) {
        return;
      }
      if (!isAlive) {
        return this.onStopAppSuccess();
      }
    }
  }, {
    key: 'onStopAppSuccess',
    value: function onStopAppSuccess() {
      this.stopTrackingCurrentTime();
      this.apiMedia = null;
    }
  }, {
    key: 'onMediaStatusUpdate',
    value: function onMediaStatusUpdate() {
      if (!this.apiMedia) {
        return;
      }
      switch (this.apiMedia.playerState) {
        case chrome.cast.media.PlayerState.BUFFERING:
          this.trigger('waiting');
          break;
        case chrome.cast.media.PlayerState.IDLE:
          this.trigger('timeupdate');
          break;
        case chrome.cast.media.PlayerState.PAUSED:
          this.trigger('pause');
          this.paused_ = true;
          break;
        case chrome.cast.media.PlayerState.PLAYING:
          this.trigger('playing');
          this.trigger('play');
          this.paused_ = false;
          break;
      }
    }

    /**
     * Set video
     *
     * @param {Object=} src Source object
     * @method setSrc
     */
  }, {
    key: 'src',
    value: function src(_src) {
      //do nothing
    }
  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      var trackInfo = [];
      var tracks = this.textTracks();

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['mode'] === 'showing') {
          trackInfo.push(i + 1);
        }
      }

      if (this.apiMedia) {
        this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
        return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
      }
    }
  }, {
    key: 'onTrackSuccess',
    value: function onTrackSuccess(e) {
      return _videoJs2['default'].log('track added');
    }
  }, {
    key: 'onTrackError',
    value: function onTrackError(e) {
      return _videoJs2['default'].log('Cast track Error: ' + JSON.stringify(e));
    }
  }, {
    key: 'castError',
    value: function castError(e) {
      return _videoJs2['default'].log('Cast Error: ' + JSON.stringify(e));
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.apiMedia) {
        return;
      }
      if (this.paused_) {
        this.apiMedia.play(null, this.mediaCommandSuccessCallback.bind(this, 'Playing: ' + this.apiMedia.sessionId), this.castError.bind(this));
      }
      return this.paused_ = false;
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.apiMedia) {
        return;
      }
      if (!this.paused_) {
        this.apiMedia.pause(null, this.mediaCommandSuccessCallback.bind(this, 'Paused: ' + this.apiMedia.sessionId), this.castError.bind(this));
        return this.paused_ = true;
      }
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.paused_;
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      if (!this.apiMedia) {
        return 0;
      }
      return this.apiMedia.currentTime;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(position) {

      if (!this.apiMedia) {
        return 0;
      }
      var request = undefined;
      request = new chrome.cast.media.SeekRequest();
      request.currentTime = position;
      //if (this.player_.controlBar.progressControl.seekBar.videoWasPlaying) {
      //  request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
      //}
      return this.apiMedia.seek(request, this.onSeekSuccess.bind(this, position), this.castError.bind(this));
    }
  }, {
    key: 'onSeekSuccess',
    value: function onSeekSuccess(position) {
      _videoJs2['default'].log('seek success' + position);
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.volume_;
    }
  }, {
    key: 'duration',
    value: function duration() {
      if (!this.apiMedia) {
        return 0;
      }
      return this.apiMedia.media.duration;
    }
  }, {
    key: 'controls',
    value: function controls() {
      return false;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(level) {
      var mute = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var request = undefined;
      var volume = undefined;
      if (!this.apiMedia) {
        return;
      }
      volume = new chrome.cast.Volume();
      volume.level = level;
      volume.muted = mute;
      this.volume_ = volume.level;
      this.muted_ = mute;
      request = new chrome.cast.media.VolumeRequest();
      request.volume = volume;
      this.apiMedia.setVolume(request, this.mediaCommandSuccessCallback.bind(this, 'Volume changed'), this.castError.bind(this));
      return this.trigger('volumechange');
    }
  }, {
    key: 'mediaCommandSuccessCallback',
    value: function mediaCommandSuccessCallback(information) {
      _videoJs2['default'].log(information);
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.muted_;
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      return this.setVolume(this.volume_, muted);
    }
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      return false;
    }
  }, {
    key: 'resetSrc_',
    value: function resetSrc_(callback) {
      callback();
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.resetSrc_(Function.prototype);
      _get(Object.getPrototypeOf(Chromecast.prototype), 'dispose', this).call(this, this);
    }
  }]);

  return Chromecast;
})(Tech);

Chromecast.prototype.paused_ = false;

Chromecast.prototype.options_ = {};

Chromecast.prototype.timerStep = 1000;

/* Chromecast Support Testing -------------------------------------------------------- */

Chromecast.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Chromecast);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Chromecast.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Chromecast.nativeSourceHandler.canPlayType = function (source) {

  var dashTypeRE = /^application\/(?:dash\+xml|(x-|vnd\.apple\.)mpegurl)/i;
  var dashExtRE = /^video\/(mpd|mp4|webm|m3u8)/i;

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
Chromecast.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Chromecast.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Chromecast.nativeSourceHandler.canPlayType(source.src);
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
Chromecast.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Chromecast.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Chromecast.registerSourceHandler(Chromecast.nativeSourceHandler);

/*
 * Set the tech's volume control support status
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresVolumeControl'] = true;

/*
 * Set the tech's playbackRate support status
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresPlaybackRate'] = false;

/*
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 *
 * @type {Boolean}
 */
Chromecast.prototype['movingMediaElementInDOM'] = false;

/*
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Chromecast.prototype['featuresFullscreenResize'] = false;

/*
 * Set the tech's timeupdate event support status
 * (this disables the manual timeupdate events of the Tech)
 */
Chromecast.prototype['featuresTimeupdateEvents'] = false;

/*
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Chromecast.prototype['featuresProgressEvents'] = false;

/*
 * Sets the tech's status on native text track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeTextTracks'] = true;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeAudioTracks'] = true;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeVideoTracks'] = false;

_videoJs2['default'].options.chromecast = {};

Component.registerComponent('Chromecast', Chromecast);
Tech.registerTech('Chromecast', Chromecast);
exports['default'] = Chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],24:[function(require,module,exports){
(function (global){
/**
 * ! videojs-chromecast - v1.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-chromecast.js
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _componentControlBarChromecastButton = require('./component/control-bar/chromecast-button');

var _componentControlBarChromecastButton2 = _interopRequireDefault(_componentControlBarChromecastButton);

var _techChromecast = require('./tech/chromecast');

var _techChromecast2 = _interopRequireDefault(_techChromecast);

var Component = _videoJs2['default'].getComponent('Component');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Chromecast = (function (_Component) {
  _inherits(Chromecast, _Component);

  function Chromecast(player, options) {
    _classCallCheck(this, Chromecast);

    _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, player, options);
  }

  return Chromecast;
})(Component);

Chromecast.prototype.options_ = {};

// register the plugin
_videoJs2['default'].options.children.chromecast = {};

_videoJs2['default'].addLanguage('en', {
  'CASTING TO': 'WIEDERGABE AUF'
});

_videoJs2['default'].addLanguage('de', {
  'CASTING TO': 'WIEDERGABE AUF'
});

_videoJs2['default'].addLanguage('it', {
  'CASTING TO': 'PLAYBACK SU'
});

_videoJs2['default'].addLanguage('fr', {
  'CASTING TO': 'CAST EN COURS SUR'
});

var USER_AGENT = window.navigator.userAgent;

_videoJs2['default'].browser.IS_EDGE = /Edge/i.test(USER_AGENT);

Component.registerComponent('Chromecast', Chromecast);
exports['default'] = Chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/chromecast-button":21,"./tech/chromecast":23}],25:[function(require,module,exports){
(function (global){
/**
 * ! videojs-metrics - v0.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-metrics.js
 **/
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _utilsJs = require('./utils.js');

var browser = _interopRequireWildcard(_utilsJs);

var Component = _videoJs2['default'].getComponent('Component');
var Flash = _videoJs2['default'].getComponent('Flash');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Metrics = (function (_Component) {
	_inherits(Metrics, _Component);

	function Metrics(player, options) {
		_classCallCheck(this, Metrics);

		_get(Object.getPrototypeOf(Metrics.prototype), 'constructor', this).call(this, player, options);
		var source = this.player().manifestUrl || this.player().currentSrc();

		this.browserInfo = browser.getBrowser();
		this.pathUrl = source.match(Metrics.URL_MATCH) || ['undefined', 'undefined'];
		this.setupTriggers();
	}

	_createClass(Metrics, [{
		key: 'dispose',
		value: function dispose() {
			this.clearInterval(this.intervalPing);
			this.setupTriggers('off');
		}
	}, {
		key: 'eventHandler',
		value: function eventHandler(evt) {
			var data = {
				type: evt.type
			};

			var skipped = false;

			switch (data.type) {
				case 'error':
					var error = this.player().error();

					error = error || {
						code: -1,
						message: 'cant get error message'
					};
					data.number = error.code;
					data.message = error.message;
					break;
				case 'dispose':
				case 'ended':
					if (data.type === this.oldType) {
						skipped = true;
					}
					data.type = 'stop';
					break;
				case 'loadstart':
					skipped = true;
					break;
				case 'firstplay':
					data.type = 'start';
					this.intervalPing = this.setInterval(this.onPing, Metrics.INTERVAL_PING);
					break;
				case 'waiting':
					data.type = 'buffering';
					break;
				case 'bandwidthIncrease':
				case 'bandwidthDecrease':
					break;
				default:
					break;
			}

			this.oldType = data.type;

			if (skipped) {
				return;
			}

			this.notify(data);
		}
	}, {
		key: 'onPing',
		value: function onPing() {
			this.player().trigger('ping');
		}
	}, {
		key: 'setupTriggers',
		value: function setupTriggers(off) {
			var addOrRemove = off || 'on';

			var events = this.options_.trackEvents;

			var player = this.player();

			var i = events.length - 1;

			for (i; i >= 0; i--) {
				// just call event start only one time
				var firstCall = addOrRemove;

				if (events[i] === 'firstplay' && addOrRemove === 'on') {
					firstCall = 'one';
				}
				player[firstCall](events[i], _videoJs2['default'].bind(this, this.eventHandler));
			}
		}
	}, {
		key: 'pick',
		value: function pick(obj, list, context) {
			var result = {};

			if (typeof list === 'string') {
				list = [list];
			}

			Object.keys(obj).forEach(function (key) {
				if (list.indexOf(key) > -1) {
					result[key] = obj[key];
				}
			}, context);

			return result;
		}
	}, {
		key: 'getRequiredKeys',
		value: function getRequiredKeys(type) {
			return Metrics.BASE_KEYS.concat(Metrics.REQUIRED_KEY[type] || []);
		}
	}, {
		key: 'notify',
		value: function notify(evt) {
			var player = this.player();

			var width = _globalWindow2['default'].innerWidth || _globalDocument2['default'].documentElement.clientWidth || _globalDocument2['default'].body.clientWidth;

			var height = _globalWindow2['default'].innerHeight || _globalDocument2['default'].documentElement.clientHeight || _globalDocument2['default'].body.clientHeight;

			// Merge with default options
			evt['user_id'] = this.options_.user_id;
			evt['fqdn'] = this.pathUrl[1];
			evt['os'] = this.browserInfo.os;
			evt['os_version'] = this.browserInfo.osVersion.toString();
			evt['web_browser'] = this.browserInfo.browser.toString();
			evt['web_browser_version'] = this.browserInfo.version ? this.browserInfo.version.toString() : '';
			evt['resolution_size'] = width + 'x' + height;
			evt['flash_version'] = Flash.version().join(',');
			evt['html5_video'] = player.techName_ ? player.techName_ !== 'FLash' || player.techName_ !== 'DashAs' : 'undefined';
			evt['relative_url'] = this.pathUrl[2];
			evt['timeout'] = false;
			evt['frames_dropped'] = 0;
			try {
				var metrics = player.techGet_('getPlaybackStatistics');

				this.metrics_ = _videoJs2['default'].mergeOptions(this.metrics_, metrics);
				evt['video_bitrate'] = this.metrics_.video.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.video.bandwidth / 1000)) : -1;
				evt['audio_bitrate'] = this.metrics_.audio.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.audio.bandwidth / 1000)) : -1;
				evt['chunks_from_cdn'] = this.metrics_.p2pweb.chunksFromCDN;
				evt['chunks_from_p2p'] = this.metrics_.p2pweb.chunksFromP2P;
				evt['startup_time'] = this.metrics_.p2pweb.startupTime;

				var pickedData = this.pick(evt, this.getRequiredKeys(evt.type));

				var data = {
					json: pickedData,
					uri: this.options_.url,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				};

				Metrics.xhr(data, function (err) {
					if (err) {
						throw new Error(err.message);
					}
				});
			} catch (e) {
				_videoJs2['default'].log(e);
			}
		}
	}]);

	return Metrics;
})(Component);

Metrics.REQUIRED_KEY = {
	'bandwidthIncrease': ['video_bitrate', 'audio_bitrate'],
	'bandwidthDecrease': ['video_bitrate', 'audio_bitrate'],
	'ping': ['chunks_from_cdn', 'chunks_from_p2p'],
	'buffering': [],
	'error': ['number', 'message'],
	'start': ['video_bitrate', 'audio_bitrate', 'os', 'os_version', 'web_browser', 'web_browser_version', 'resolution_size', 'flash_version', 'html5_video', 'relative_url'],
	'stop': ['timeout', 'frames_dropped']
};

Metrics.URL_MATCH = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/;

Metrics.prototype.pathUrl = '';
Metrics.prototype.oldType = null;
Metrics.prototype.intervalPing = 0;
Metrics.prototype.browserInfo = {};

Metrics.prototype.options_ = {
	'option': true,
	'user_id': 666,
	'method': 'POST',
	'responseType': 'json',
	'timeout': 1000,
	'url': '//stats.afrostream.tv/api/v1/events',
	'trackEvents': ['loadstart', 'ping', 'firstplay', 'ended', 'dispose', 'waiting', 'error', 'bandwidthIncrease', 'bandwidthDecrease']
};

Metrics.INTERVAL_PING = 60000;

Metrics.BASE_KEYS = ['user_id', 'type', 'fqdn'];

Metrics.METRICS_DATA = {
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

Metrics.prototype.metrics_ = {
	video: _videoJs2['default'].mergeOptions({}, Metrics.METRICS_DATA),
	audio: _videoJs2['default'].mergeOptions({}, Metrics.METRICS_DATA)
};

Metrics.xhr = _xhr2['default'];

Component.registerComponent('Metrics', Metrics);

// register the plugin
_videoJs2['default'].options.children.metrics = {};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils.js":27,"global/document":19,"global/window":20,"xhr":28}],26:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _metrics = require('./metrics');

var _metrics2 = _interopRequireDefault(_metrics);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _metrics2['default'])(this, options);
};

_videoJs2['default'].plugin('metrics', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./metrics":25}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getBrowser = getBrowser;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

function getBrowser() {
	var data = {};

	var browser = '';

	var version = '';

	var os = '';

	var osVersion = '';

	var parseUserAgent = undefined;

	var prepareData = undefined;

	var renameOsx = undefined;

	var cutSafariVersion = undefined;

	parseUserAgent = function () {
		var userAgent = navigator.userAgent.toLowerCase();

		var browserParts = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

		var osParts = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent);

		if (!userAgent.match(/trident\/7\./)) {
			browser = 'ie';
			version = 11;
		} else if (browserParts && browserParts.length > 2) {
			browser = browserParts[1];
			version = browserParts[2];
		}

		if (osParts && osParts.length > 1) {
			os = osParts[1];
		}

		osVersion = navigator.oscpu || navigator.appName;
	};

	prepareData = function () {
		data.browser = browser;
		data.version = parseInt(version, 10) || '';
		data.os = os;
		data.osVersion = osVersion;
	};

	renameOsx = function () {
		if (os === 'mac') {
			os = 'osx';
		}
	};

	cutSafariVersion = function () {
		if (os === 'safari') {
			version = version.substring(0, 1);
		}
	};

	parseUserAgent();

	// exception rules
	renameOsx();
	cutSafariVersion();

	prepareData();

	return data;
}
},{"global/document":19,"global/window":20}],28:[function(require,module,exports){
"use strict";
var window = require("global/window")
var once = require("once")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    var callback = options.callback
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }
    callback = once(callback)

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)

    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function noop() {}

},{"global/window":20,"is-function":29,"once":30,"parse-headers":33,"xtend":34}],29:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],30:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],31:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":29}],32:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],33:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":31,"trim":32}],34:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],35:[function(require,module,exports){
(function (global){
/**
 * ! afrostrream-player - v2.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file afrostream.js
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

var _techMedia = require('./tech/media');

var _techMedia2 = _interopRequireDefault(_techMedia);

var _techDash = require('./tech/dash');

var _techDash2 = _interopRequireDefault(_techDash);

var _techDashas = require('./tech/dashas');

var _techDashas2 = _interopRequireDefault(_techDashas);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

var _componentControlBar = require('./component/control-bar/');

var _componentControlBar2 = _interopRequireDefault(_componentControlBar);

var _videojsMetrics = require('videojs-metrics');

var _videojsMetrics2 = _interopRequireDefault(_videojsMetrics);

var _videojsChromecast = require('videojs-chromecast');

var _videojsChromecast2 = _interopRequireDefault(_videojsChromecast);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');

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
    player.getPlaybackStatistics = this.getPlaybackStatistics.bind(this);
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

ControlBar.prototype.options_.children.splice(11, 0, ControlBar.prototype.options_.children.splice(1, 1)[0]);

Component.registerComponent('Afrostream', Afrostream);
exports['default'] = Afrostream;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/":1,"./tech/dash":15,"./tech/dashas":16,"./tech/media":17,"videojs-chromecast":22,"videojs-metrics":26}]},{},[35])(35)
});